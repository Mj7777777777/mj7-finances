import './styles.css';
import * as DB from './db';
import { Rec, uid } from './db';
import { Tx, Cat, Act, Budget, Recurring, Space, TType, PAYS, PAY_COLORS, defaults, fcfa, num, monthLabel, today, curMonth, shiftMonth, dueRecurring, demoData, MONTHS, MSHORT,
  Source, Plan, Alloc, allocAmount, PRESETS, migrations, lastDay } from './model';
import { createScene, webglOK, Scene3D, Bar } from './scene3d';
import * as Sync from './sync';

// =====================================================================
//  État
// =====================================================================
const S = {
  recs: new Map<string, Rec>(),
  view: 'board' as 'board' | 'ops' | 'plan' | 'settings',
  month: curMonth(),
  scope: 'all' as 'all' | Space,
  actFilter: '' as string,
  ops: { q: '', space: '', act: '', cat: '', pay: '', period: 'month' as 'month' | 'year' | 'all' },
  budgetSpace: 'perso' as Space,
  pendingMode: {} as Record<string, 'f' | 'p'>,
  setCatSpace: 'perso' as Space, setCatType: 'dep' as TType,
  sync: { state: 'off' as 'off' | 'on' | 'busy' | 'err', email: null as string | null, msg: '' },
};
const LS = {
  get(k: string, d: any = null) { try { const v = localStorage.getItem('mj7d.' + k); return v === null ? d : JSON.parse(v); } catch { return d; } },
  set(k: string, v: any) { try { localStorage.setItem('mj7d.' + k, JSON.stringify(v)); } catch { } },
  del(k: string) { try { localStorage.removeItem('mj7d.' + k); } catch { } },
};
const settings = { theme: LS.get('theme', 'dark') as string, flat: LS.get('flat', false) as boolean };

const list = <T,>(kind: string) => [...S.recs.values()].filter(r => r.kind === kind && !r.deleted) as Rec<T>[];
const txs = () => list<Tx>('tx');
const cats = () => list<Cat>('cat').sort((a, b) => a.data.order - b.data.order);
const acts = () => list<Act>('act').sort((a, b) => a.data.order - b.data.order);
const budgets = () => list<Budget>('budget');
const recurrings = () => list<Recurring>('rec');
const catOf = (id?: string) => (id && S.recs.get(id)?.data as Cat) || { name: 'Sans catégorie', icon: '•', color: '#9aa0a6', space: 'perso', type: 'dep', order: 99 } as Cat;
const actOf = (id?: string) => (id && S.recs.get(id) && !S.recs.get(id)!.deleted ? S.recs.get(id)!.data as Act : null);

async function save(recs: Rec[]) {
  const now = Date.now();
  recs.forEach(r => { r.updatedAt = Math.max(now, (r.updatedAt || 0) + 1); r.dirty = true; S.recs.set(r.id, r); });
  await DB.putMany(recs);
  scheduleSync();
}
async function remove(id: string) {
  const r = S.recs.get(id); if (!r) return;
  await save([{ ...r, deleted: true }]);
}

// =====================================================================
//  Utilitaires
// =====================================================================
const $ = <T extends HTMLElement = HTMLElement>(s: string, root: ParentNode = document) => root.querySelector(s) as T;
const esc = (s: any) => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
let toastT = 0;
function toast(msg: string) {
  document.querySelector('.toast')?.remove();
  const t = document.createElement('div'); t.className = 'toast'; t.textContent = msg; document.body.appendChild(t);
  clearTimeout(toastT); toastT = window.setTimeout(() => t.remove(), 2600);
}
const reduced = () => settings.flat || matchMedia('(prefers-reduced-motion: reduce)').matches;

const IC: Record<string, string> = {
  board: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 20V10m6 10V4m6 16v-7m4 7H2"/></svg>',
  ops: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01"/></svg>',
  plan: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="8.5"/><path d="M12 3.5V12l6 6"/></svg>',
  settings: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>',
  plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
  left: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="m15 18-6-6 6-6"/></svg>',
  right: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="m9 18 6-6-6-6"/></svg>',
  x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>',
  trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M3 6h18M8 6V4h8v2m-9 0 1 14h8l1-14"/></svg>',
  sync: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M20 12a8 8 0 0 1-14 5.3M4 12a8 8 0 0 1 14-5.3M18 3v4h-4M6 21v-4h4"/></svg>',
};
const NAV: [typeof S.view, string][] = [['board', 'Tableau'], ['ops', 'Opérations'], ['plan', 'Répartition'], ['settings', 'Réglages']];

// =====================================================================
//  Calculs
// =====================================================================
function inScope(t: Tx) {
  if (S.scope === 'all') return true;
  if (t.space !== S.scope) return false;
  if (S.scope === 'act' && S.actFilter) return t.actId === S.actFilter;
  return true;
}
function monthTx(m = S.month) { return txs().filter(r => r.data.date.startsWith(m) && inScope(r.data)); }
function sums(list: Rec<Tx>[]) {
  let dep = 0, rev = 0; list.forEach(r => r.data.type === 'dep' ? dep += r.data.amount : rev += r.data.amount);
  return { dep, rev, bal: rev - dep };
}
function spentBy(space: Space, catId: string, m = S.month) {
  return txs().filter(r => r.data.type === 'dep' && r.data.space === space && r.data.catId === catId && r.data.date.startsWith(m)).reduce((a, r) => a + r.data.amount, 0);
}

// =====================================================================
//  Rendu général
// =====================================================================
const root = document.getElementById('app')!;
let scene: Scene3D | null = null;
const stageEl = document.createElement('div'); stageEl.className = 'stage';
const shown: Record<string, number> = {};

function applyTheme() {
  document.documentElement.setAttribute('data-theme', settings.theme);
  const dark = settings.theme === 'dark' || (settings.theme === 'system' && !matchMedia('(prefers-color-scheme: light)').matches);
  $('meta[name=theme-color]')?.setAttribute('content', dark ? '#0b0908' : '#f3f1ee');
  scene?.setTheme(dark);
}

function shell() {
  const navLinks = NAV.map(([v, l]) => `<a href="#${v}" class="${S.view === v ? 'on' : ''}">${IC[v]}<span>${l}</span></a>`);
  const syncBadge = `<span class="sync-dot ${S.sync.state === 'on' ? 'on' : S.sync.state === 'err' ? 'err' : ''}" title="${esc(S.sync.msg)}"><i></i>${S.sync.state === 'off' ? 'Sur cet appareil' : S.sync.state === 'busy' ? 'Synchro…' : S.sync.state === 'err' ? 'Synchro en pause' : 'Synchronisé'}</span>`;
  root.innerHTML = `
  <div class="app">
    <aside class="side">
      <div class="brand"><img src="icons/icon-192.png" alt=""><div>MJ7 Finances<small>Perso · Activités</small></div></div>
      ${navLinks.join('')}
      <button class="fab-wide" data-act="add">${IC.plus.replace('<svg', '<svg width="18" height="18"')}Nouvelle opération</button>
    </aside>
    <main>
      <div class="topbar"><div class="brand"><img src="icons/icon-192.png" alt=""><div>MJ7 Finances<small>Perso · Activités</small></div></div>${syncBadge}</div>
      <div id="view"></div>
    </main>
    <nav class="nav">${navLinks.slice(0, 2).join('')}<button class="fab" data-act="add" aria-label="Nouvelle opération">${IC.plus}</button>${navLinks.slice(2).join('')}</nav>
  </div>`;
}

function render() {
  shell();
  const v = $('#view');
  if (S.view === 'board') v.innerHTML = viewBoard();
  else if (S.view === 'ops') v.innerHTML = viewOps();
  else if (S.view === 'plan') v.innerHTML = viewPlan();
  else v.innerHTML = viewSettings();
  if (S.view === 'board') mountBoard();
  if (S.view === 'ops') { const q = $<HTMLInputElement>('#q'); if (q && document.activeElement !== q && S.ops.q) { } }
  bindTilt();
}

// =====================================================================
//  Tableau de bord
// =====================================================================
function scopeBar() {
  const a = acts();
  return `<div class="scope">
    <div class="seg" role="tablist">${[['all', 'Tout'], ['perso', 'Personnel'], ['act', 'Activités']].map(([k, l]) => `<button class="${S.scope === k ? 'on' : ''}" data-act="scope" data-v="${k}">${l}</button>`).join('')}</div>
    ${S.scope === 'act' && a.length ? `<div class="chips"><button class="chip ${!S.actFilter ? 'on' : ''}" data-act="actf" data-v="">Toutes les activités</button>${a.map(x => `<button class="chip ${S.actFilter === x.id ? 'on' : ''}" data-act="actf" data-v="${x.id}"><i style="background:${x.data.color}"></i>${esc(x.data.name)}</button>`).join('')}</div>` : ''}
  </div>`;
}

function viewBoard() {
  const mt = monthTx(); const s = sums(mt);
  const perso = sums(txs().filter(r => r.data.date.startsWith(S.month) && r.data.space === 'perso'));
  const actv = sums(txs().filter(r => r.data.date.startsWith(S.month) && r.data.space === 'act'));
  const scopeName = S.scope === 'all' ? 'Tout' : S.scope === 'perso' ? 'Personnel' : (S.actFilter ? actOf(S.actFilter)?.name : 'Activités');
  // activités
  const actCards = acts().map(a => {
    const l = txs().filter(r => r.data.space === 'act' && r.data.actId === a.id && r.data.date.startsWith(S.month));
    const x = sums(l);
    const st = !l.length ? ['neutral', 'Rien ce mois'] : x.bal > 0 ? ['good', 'Rentable'] : x.bal < 0 ? ['bad', 'En perte'] : ['warn', 'À l\'équilibre'];
    return `<button class="card act-card tilt" data-act="openAct" data-v="${a.id}" style="text-align:left">
      <div class="name"><i style="background:${a.data.color}"></i>${esc(a.data.name)}</div>
      <div class="res num ${x.bal > 0 ? 'good' : x.bal < 0 ? 'bad' : ''}">${fcfa(x.bal, true)}</div>
      <div class="split"><div class="line"><span class="muted">Revenus</span><span class="num">${fcfa(x.rev)}</span></div><div class="line"><span class="muted">Dépenses</span><span class="num">${fcfa(x.dep)}</span></div></div>
      <div style="margin-top:12px"><span class="pill ${st[0]}">${st[1]}</span></div>
    </button>`;
  }).join('');
  // budgets du mois (top)
  const bl = effBudgets().filter(b => S.scope === 'all' || b.space === S.scope).map(b => {
    const spent = spentBy(b.space, b.catId); return { b, spent, p: spent / b.amount };
  }).sort((a, b) => b.p - a.p).slice(0, 5);
  const budgetHtml = bl.length ? bl.map(({ b, spent, p }) => budgetRow(b, spent, p)).join('') :
    `<div class="muted" style="font-size:13px">Aucune case remplie. <a href="#plan" style="color:var(--accent)">Répartir le salaire</a></div>`;
  return `
  <div class="board-head">
    <div class="month">
      <button class="icon-btn" data-act="month" data-v="-1" aria-label="Mois précédent">${IC.left}</button>
      <h1>${monthLabel(S.month)}</h1>
      <button class="icon-btn" data-act="month" data-v="1" aria-label="Mois suivant">${IC.right}</button>
    </div>
  </div>
  ${scopeBar()}
  <div class="hero">
    <section class="card stage-card" id="stageCard">
      <div class="stage-top"><span class="eyebrow">Où part l'argent · ${esc(scopeName)}</span></div>
      <div id="stageSlot" class="stage"></div>
      <div class="tip" id="tip" hidden></div>
      <div class="legend" id="legend"></div>
      <div class="stage-hint" id="stageHint">Fais tourner la scène · touche une pile pour le détail</div>
    </section>
    <section class="card balance tilt">
      <div><div class="eyebrow">Solde du mois</div><div class="big ${s.bal < 0 ? 'bad' : ''}" data-count="bal" data-val="${s.bal}">${num(s.bal)}<small>FCFA</small></div></div>
      <div class="kpis">
        <div class="kpi"><div class="eyebrow">Revenus</div><div class="v good">${fcfa(s.rev)}</div></div>
        <div class="kpi"><div class="eyebrow">Dépenses</div><div class="v">${fcfa(s.dep)}</div></div>
      </div>
      ${S.scope === 'all' ? `<div class="split">
        <div class="line"><span class="muted">Personnel</span><span class="num ${perso.bal < 0 ? 'bad' : 'good'}">${fcfa(perso.bal, true)}</span></div>
        <div class="line"><span class="muted">Activités</span><span class="num ${actv.bal < 0 ? 'bad' : 'good'}">${fcfa(actv.bal, true)}</span></div>
      </div>` : ''}
      <div><div class="card-h" style="margin-bottom:10px"><span class="eyebrow">Répartition</span><a href="#plan" class="muted" style="font-size:12px">Tout voir</a></div>${boardPlanLine()}<div class="grid" style="gap:12px">${budgetHtml}</div></div>
    </section>
  </div>
  ${acts().length && S.scope !== 'perso' ? `<div class="card-h" style="margin:26px 2px 12px"><h2>Résultat par activité</h2><span class="muted" style="font-size:12px">revenus − dépenses</span></div><div class="acts">${actCards}</div>` : ''}
  <div class="two" style="margin-top:14px">
    <section class="card"><div class="card-h"><span class="eyebrow">6 derniers mois</span><div class="legend-inline"><span><i style="background:var(--gold)"></i>Revenus</span><span><i style="background:var(--accent2)"></i>Dépenses</span></div></div><canvas class="chart" id="evo"></canvas></section>
    <section class="card"><div class="card-h"><span class="eyebrow">Moyens de paiement · dépenses</span></div><div class="grid" style="gap:12px">${payBars(mt)}</div></section>
  </div>`;
}

function budgetRow(b: Budget, spent: number, p: number) {
  const c = catOf(b.catId);
  const cls = p >= 1 ? 'over' : p >= .8 ? 'warn' : '';
  const pill = p >= 1 ? `<span class="pill bad">Dépassé</span>` : p >= .8 ? `<span class="pill warn">${Math.round(p * 100)} %</span>` : `<span class="muted num" style="font-size:12px">${Math.round(p * 100)} %</span>`;
  return `<div class="grid" style="gap:6px"><div class="row" style="justify-content:space-between;flex-wrap:nowrap"><span style="min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${c.icon} ${esc(c.name)} <span class="muted" style="font-size:12px">· ${b.space === 'perso' ? 'Perso' : 'Activités'}</span></span>${pill}</div>
    <div class="meter ${cls}"><i style="width:${Math.min(100, p * 100)}%"></i></div>
    <div class="muted num" style="font-size:12px">${fcfa(spent)} sur ${fcfa(b.amount)}</div></div>`;
}

function payBars(mt: Rec<Tx>[]) {
  const by: Record<string, number> = {}; mt.filter(r => r.data.type === 'dep').forEach(r => by[r.data.pay] = (by[r.data.pay] || 0) + r.data.amount);
  const tot = Object.values(by).reduce((a, b) => a + b, 0);
  if (!tot) return `<div class="muted" style="font-size:13px">Aucune dépense ce mois-ci.</div>`;
  return Object.entries(by).sort((a, b) => b[1] - a[1]).map(([k, v]) => `<div class="hbar"><span>${esc(k)}</span><span class="num">${fcfa(v)} <span class="muted">· ${Math.round(v / tot * 100)} %</span></span><div class="track"><i style="width:${v / tot * 100}%;background:${PAY_COLORS[k] || 'var(--accent)'}"></i></div></div>`).join('');
}

function bars(): Bar[] {
  const by = new Map<string, number>();
  monthTx().filter(r => r.data.type === 'dep').forEach(r => by.set(r.data.catId, (by.get(r.data.catId) || 0) + r.data.amount));
  return [...by.entries()].map(([id, amount]) => { const c = catOf(id); return { id, name: c.name, icon: c.icon, color: c.color, amount }; }).sort((a, b) => b.amount - a.amount);
}

function mountBoard() {
  const slot = $('#stageSlot'); const b = bars();
  const legend = $('#legend'); legend.innerHTML = b.slice(0, 6).map(x => `<span><i style="background:${x.color}"></i>${esc(x.name)} · <b class="num">${num(x.amount)}</b></span>`).join('');
  if (!b.length) {
    slot.innerHTML = `<div class="empty-stage"><div><b style="display:block;color:var(--fg);font-family:var(--display);font-size:17px;margin-bottom:6px">Aucune dépense en ${MONTHS[+S.month.slice(5) - 1]}</b>Touche « + » pour ajouter ta première dépense,<br>ou active les données d'exemple dans Réglages.</div></div>`;
    $('#stageHint').hidden = true;
  } else if (reduced() || !webglOK()) {
    const max = Math.max(...b.map(x => x.amount));
    slot.innerHTML = `<div class="bars2d">${b.slice(0, 9).map(x => `<div style="height:${Math.max(4, x.amount / max * 100)}%;background:linear-gradient(180deg,${x.color},color-mix(in srgb,${x.color} 40%,var(--bg2)))" title="${esc(x.name)} : ${fcfa(x.amount)}"><span>${x.icon}</span></div>`).join('')}</div>`;
    $('#stageHint').textContent = 'Vue simplifiée (animations réduites)';
  } else {
    slot.appendChild(stageEl);
    if (!scene) {
      scene = createScene(stageEl, {
        onHover(bar, x, y) {
          const tip = $('#tip'); if (!tip) return;
          if (!bar) { tip.hidden = true; return; }
          tip.hidden = false; tip.style.left = x + 'px'; tip.style.top = y + 'px';
          tip.innerHTML = `${bar.icon} ${esc(bar.name)}<b>${fcfa(bar.amount)}</b>`;
        },
        onPick(id) { S.ops = { ...S.ops, cat: id, period: 'month', space: '', act: '', pay: '', q: '' }; location.hash = '#ops'; },
      });
      applyTheme();
    }
    scene.update(b);
  }
  // compteur animé du solde
  document.querySelectorAll<HTMLElement>('[data-count]').forEach(el => {
    const k = el.dataset.count!, to = Number(el.dataset.val); const from = shown[k] ?? 0; shown[k] = to;
    if (reduced() || from === to) return;
    const t0 = performance.now(), d = 900;
    const step = (now: number) => { const p = Math.min(1, (now - t0) / d), e = 1 - Math.pow(1 - p, 4); const v = from + (to - from) * e;
      el.firstChild!.textContent = (v < 0 ? '−' : '') + num(v); if (p < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  });
  drawEvo();
}

function drawEvo() {
  const c = $<HTMLCanvasElement>('#evo'); if (!c) return;
  const dpr = Math.min(2, devicePixelRatio || 1); const w = c.clientWidth, h = c.clientHeight;
  c.width = w * dpr; c.height = h * dpr; const g = c.getContext('2d')!; g.scale(dpr, dpr);
  const cs = getComputedStyle(document.documentElement);
  const col = (n: string) => cs.getPropertyValue(n).trim();
  const ms = Array.from({ length: 6 }, (_, i) => shiftMonth(S.month, i - 5));
  const data = ms.map(m => sums(txs().filter(r => r.data.date.startsWith(m) && inScope(r.data))));
  const max = Math.max(1, ...data.map(d => Math.max(d.dep, d.rev)));
  const padL = 46, padB = 26, padT = 10, cw = (w - padL - 6) / 6, ch = h - padB - padT;
  const nice = niceMax(max);
  g.font = '11px Inter, system-ui'; g.fillStyle = col('--faint'); g.strokeStyle = col('--line'); g.lineWidth = 1;
  for (let i = 0; i <= 3; i++) {
    const y = padT + ch - ch * i / 3; g.beginPath(); g.moveTo(padL, y + .5); g.lineTo(w - 4, y + .5); g.stroke();
    g.textAlign = 'right'; g.fillText(short(nice * i / 3), padL - 8, y + 4);
  }
  data.forEach((d, i) => {
    const x = padL + i * cw + cw * .18, bw = cw * .3;
    const bar = (v: number, xx: number, color: string) => { const bh = ch * v / nice; g.fillStyle = color; roundRect(g, xx, padT + ch - bh, bw, bh, 4); };
    bar(d.rev, x, col('--gold')); bar(d.dep, x + bw + 3, col('--accent2'));
    g.fillStyle = ms[i] === S.month ? col('--fg') : col('--muted'); g.textAlign = 'center';
    g.fillText(MSHORT[+ms[i].slice(5) - 1], padL + i * cw + cw / 2, h - 8);
  });
}
function niceMax(v: number) { const p = Math.pow(10, Math.floor(Math.log10(v))); const n = v / p; return (n <= 1.5 ? 1.5 : n <= 3 ? 3 : n <= 6 ? 6 : 12) * p; }
function short(v: number) { return v >= 1e6 ? (v / 1e6).toFixed(v % 1e6 ? 1 : 0).replace('.', ',') + ' M' : v >= 1e3 ? Math.round(v / 1e3) + ' k' : String(Math.round(v)); }
function roundRect(g: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  if (h <= 0) return; r = Math.min(r, h / 2, w / 2); g.beginPath(); g.moveTo(x, y + h); g.lineTo(x, y + r); g.quadraticCurveTo(x, y, x + r, y);
  g.lineTo(x + w - r, y); g.quadraticCurveTo(x + w, y, x + w, y + r); g.lineTo(x + w, y + h); g.closePath(); g.fill();
}

function bindTilt() {
  if (reduced() || matchMedia('(hover: none)').matches) return;
  document.querySelectorAll<HTMLElement>('.tilt').forEach(el => {
    el.onpointermove = e => { const r = el.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      el.style.transform = `perspective(900px) rotateX(${(.5 - y) * 6}deg) rotateY(${(x - .5) * 8}deg) translateZ(0)`;
      el.style.setProperty('--mx', x * 100 + '%'); el.style.setProperty('--my', y * 100 + '%'); };
    el.onpointerleave = () => { el.style.transform = ''; };
  });
}

// =====================================================================
//  Opérations
// =====================================================================
function filteredOps() {
  const o = S.ops; const q = o.q.trim().toLowerCase();
  return txs().filter(r => {
    const t = r.data;
    if (o.period === 'month' && !t.date.startsWith(S.month)) return false;
    if (o.period === 'year' && !t.date.startsWith(S.month.slice(0, 4))) return false;
    if (o.space && t.space !== o.space) return false;
    if (o.act && t.actId !== o.act) return false;
    if (o.cat && t.catId !== o.cat) return false;
    if (o.pay && t.pay !== o.pay) return false;
    if (q) { const c = catOf(t.catId); const hay = `${t.note || ''} ${c.name} ${t.pay} ${actOf(t.actId)?.name || ''} ${t.amount}`.toLowerCase(); if (!hay.includes(q)) return false; }
    return true;
  }).sort((a, b) => b.data.date.localeCompare(a.data.date) || b.updatedAt - a.updatedAt);
}
function viewOps() {
  const o = S.ops; const l = filteredOps(); const s = sums(l);
  const opt = (v: string, label: string, cur: string) => `<option value="${esc(v)}" ${cur === v ? 'selected' : ''}>${esc(label)}</option>`;
  const byDay = new Map<string, Rec<Tx>[]>(); l.forEach(r => { const d = r.data.date; byDay.set(d, [...(byDay.get(d) || []), r]); });
  const rows = [...byDay.entries()].map(([d, rs]) => {
    const [y, m, dd] = d.split('-').map(Number); const day = new Date(y, m - 1, dd).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
    const tot = sums(rs);
    return `<div class="day"><span>${day}</span><span class="num">${fcfa(tot.bal, true)}</span></div>` + rs.map(r => txRow(r)).join('');
  }).join('');
  return `
  <div class="board-head"><div class="month">
    <button class="icon-btn" data-act="month" data-v="-1" aria-label="Période précédente">${IC.left}</button>
    <h1>${o.period === 'year' ? S.month.slice(0, 4) : o.period === 'all' ? 'Toutes les opérations' : monthLabel(S.month)}</h1>
    <button class="icon-btn" data-act="month" data-v="1" aria-label="Période suivante">${IC.right}</button></div>
    <div class="seg">${[['month', 'Mois'], ['year', 'Année'], ['all', 'Tout']].map(([k, lb]) => `<button class="${o.period === k ? 'on' : ''}" data-act="period" data-v="${k}">${lb}</button>`).join('')}</div>
  </div>
  <div class="filters">
    <input type="search" id="q" placeholder="Rechercher (note, catégorie, montant…)" value="${esc(o.q)}" autocomplete="off">
    <select id="f-space">${opt('', 'Tous les espaces', o.space)}${opt('perso', 'Personnel', o.space)}${opt('act', 'Activités', o.space)}</select>
    <select id="f-act">${opt('', 'Toutes les activités', o.act)}${acts().map(a => opt(a.id, a.data.name, o.act)).join('')}</select>
    <select id="f-cat">${opt('', 'Toutes les catégories', o.cat)}${cats().map(c => opt(c.id, `${c.data.icon} ${c.data.name} (${c.data.space === 'perso' ? 'Perso' : 'Act.'}${c.data.type === 'rev' ? ', revenu' : ''})`, o.cat)).join('')}</select>
    <select id="f-pay">${opt('', 'Tous les paiements', o.pay)}${PAYS.map(p => opt(p, p, o.pay)).join('')}</select>
  </div>
  <div class="row" style="justify-content:space-between;margin-bottom:6px">
    <div class="totals-bar"><span>${l.length} opération${l.length > 1 ? 's' : ''}</span><span>Revenus <b class="good">${fcfa(s.rev)}</b></span><span>Dépenses <b>${fcfa(s.dep)}</b></span><span>Solde <b class="${s.bal < 0 ? 'bad' : ''}">${fcfa(s.bal, true)}</b></span></div>
    <div class="row">${(o.q || o.space || o.act || o.cat || o.pay) ? `<button class="btn ghost" data-act="clearf">Effacer les filtres</button>` : ''}<button class="btn" data-act="csv">Export CSV</button><button class="btn" data-act="pdf">Export PDF</button></div>
  </div>
  ${rows || `<div class="empty"><b>Aucune opération</b>Rien ne correspond à ces filtres pour cette période.</div>`}`;
}
function txRow(r: Rec<Tx>) {
  const t = r.data, c = catOf(t.catId), a = actOf(t.actId);
  const sub = [t.space === 'perso' ? 'Personnel' : (a?.name || 'Activités'), c.name, t.pay].join(' · ');
  return `<button class="tx" data-act="edit" data-v="${r.id}">
    <span class="ic" style="background:color-mix(in srgb, ${c.color} 18%, var(--bg2))">${c.icon}</span>
    <span style="min-width:0"><div class="t">${esc(t.note || c.name)}</div><div class="s">${esc(sub)}${t.recId ? ' · récurrente' : ''}${t.receipt ? ' · reçu' : ''}</div></span>
    <span class="a ${t.type === 'rev' ? 'good' : ''}">${t.type === 'rev' ? '+' : '−'}${num(t.amount)}<small>FCFA</small></span>
  </button>`;
}

// =====================================================================
//  Budgets & récurrentes
// =====================================================================
function recHtml() {
  const recs = recurrings();
  return `<div class="card-h" style="margin:28px 2px 12px"><h2>Opérations récurrentes</h2><button class="btn primary" data-act="addRec">${IC.plus.replace('<svg', '<svg width="16" height="16"')}Ajouter</button></div>
  <p class="muted" style="margin:0 0 12px;font-size:13px">Loyer, abonnements, internet… Elles s'ajoutent toutes seules chaque mois au jour choisi.</p>
  ${recs.length ? recs.map(r => { const c = catOf(r.data.catId); return `<button class="tx" data-act="editRec" data-v="${r.id}"><span class="ic" style="background:color-mix(in srgb, ${c.color} 18%, var(--bg2))">${c.icon}</span>
    <span style="min-width:0"><div class="t">${esc(r.data.label)}</div><div class="s">Le ${r.data.day} de chaque mois · ${r.data.space === 'perso' ? 'Personnel' : (actOf(r.data.actId)?.name || 'Activités')} · ${esc(r.data.pay)}${r.data.active ? '' : ' · en pause'}</div></span>
    <span class="a ${r.data.type === 'rev' ? 'good' : ''}">${r.data.type === 'rev' ? '+' : '−'}${num(r.data.amount)}<small>FCFA / mois</small></span></button>`; }).join('')
    : `<div class="empty"><b>Aucune opération récurrente</b>Ajoute ton loyer ou tes abonnements pour ne plus les saisir.</div>`}`;
}

// =====================================================================
//  Répartition du salaire
// =====================================================================
const sources = () => list<Source>('src').sort((a, b) => a.data.order - b.data.order);
const persoDepCats = () => cats().filter(c => c.data.space === 'perso' && c.data.type === 'dep');

/** Répartition du mois : celle enregistrée, sinon celle du dernier mois rempli, sinon les montants habituels. */
function planFor(m = S.month): { plan: Plan; stored: boolean; from: string | null } {
  const r = S.recs.get('plan_' + m);
  if (r && !r.deleted) return { plan: r.data as Plan, stored: true, from: null };
  const prev = list<Plan>('plan').filter(p => p.data.month < m).sort((a, b) => a.data.month < b.data.month ? 1 : -1)[0];
  if (prev) return { plan: { month: m, inc: { ...prev.data.inc }, got: {}, alloc: JSON.parse(JSON.stringify(prev.data.alloc || {})) }, stored: false, from: prev.data.month };
  const inc: Record<string, number> = {}; sources().forEach(s => { if (s.data.amount) inc[s.id] = s.data.amount; });
  return { plan: { month: m, inc, got: {}, alloc: {} }, stored: false, from: null };
}
const incomeOf = (p: Plan) => sources().reduce((a, s) => a + (p.inc[s.id] || 0), 0);
function planTotals(p: Plan) {
  const income = incomeOf(p);
  const rows = persoDepCats().map(c => ({ c, amount: allocAmount(p.alloc[c.id], income), spent: spentBy('perso', c.id, p.month) }));
  const allocated = rows.reduce((a, r) => a + r.amount, 0);
  const left = rows.reduce((a, r) => a + Math.max(0, r.amount - r.spent), 0);
  const received = sources().reduce((a, s) => a + (p.got[s.id] && S.recs.get(p.got[s.id]) && !S.recs.get(p.got[s.id])!.deleted ? (p.inc[s.id] || 0) : 0), 0);
  return { income, rows, allocated, rest: income - allocated, left, received };
}
/** Budgets du mois : les cases de la répartition (perso) + les budgets des activités. */
function effBudgets(m = S.month): Budget[] {
  const { plan } = planFor(m); const hasPlan = Object.keys(plan.alloc).length > 0; const income = incomeOf(plan);
  const fromPlan: Budget[] = hasPlan ? persoDepCats().map(c => ({ space: 'perso' as Space, catId: c.id, amount: allocAmount(plan.alloc[c.id], income) })) : [];
  const glob = budgets().map(b => b.data).filter(b => b.space === 'act' || !hasPlan);
  return [...fromPlan, ...glob].filter(b => b.amount > 0);
}
function boardPlanLine() {
  const { plan } = planFor(); const t = planTotals(plan);
  if (!t.income || S.scope === 'act') return '';
  return `<div class="muted" style="font-size:12px;margin:-4px 0 10px">Revenu du foyer ${fcfa(t.income)} · ${t.rest === 0 ? '<span class="good">tout est réparti</span>' : t.rest > 0 ? `reste à répartir <b class="warn">${fcfa(t.rest)}</b>` : `<b class="bad">${fcfa(-t.rest)} de trop répartis</b>`}</div>`;
}
async function savePlan(fn: (p: Plan) => void) {
  const { plan } = planFor(); const p: Plan = JSON.parse(JSON.stringify(plan)); p.month = S.month; fn(p);
  const id = 'plan_' + S.month; const old = S.recs.get(id);
  await save([{ id, kind: 'plan', updatedAt: old?.updatedAt || 0, data: p }]);
}
function salaryCat() {
  const rc = cats().filter(c => c.data.space === 'perso' && c.data.type === 'rev');
  return (rc.find(c => c.data.name === 'Salaire') || rc[0])?.id || '';
}
const pctText = (v: number) => (Math.round(v * 10) / 10).toString().replace('.', ',');
function parseMoney(s: string) { return Number(String(s).replace(/\D/g, '').slice(0, 12)) || 0; }
function parsePct(s: string) { const n = parseFloat(String(s).replace(',', '.').replace(/[^\d.]/g, '')); return isFinite(n) ? Math.min(100, Math.max(0, Math.round(n * 10) / 10)) : 0; }

function viewPlan() {
  const sp = S.budgetSpace;
  const head = `<div class="board-head"><div class="month">
    <button class="icon-btn" data-act="month" data-v="-1" aria-label="Mois précédent">${IC.left}</button><h1>Répartition · ${monthLabel(S.month)}</h1><button class="icon-btn" data-act="month" data-v="1" aria-label="Mois suivant">${IC.right}</button></div>
    <div class="seg">${[['perso', 'Foyer'], ['act', 'Activités']].map(([k, l]) => `<button class="${sp === k ? 'on' : ''}" data-act="bspace" data-v="${k}">${l}</button>`).join('')}</div>
  </div>`;
  if (sp === 'act') return head + actBudgets() + recHtml();

  const { plan, stored, from } = planFor(); const t = planTotals(plan); const srcs = sources();
  const future = S.month > curMonth();
  const note = !stored && from ? `<div class="plan-note">Repris de la répartition de ${monthLabel(from)}. Change un montant pour l'ajuster à ce mois.</div>`
    : !stored && !t.income ? `<div class="plan-note">Commence par saisir ce que vous gagnez ce mois-ci, puis répartis-le dans les cases (en FCFA ou en %). Tu peux aussi partir d'un modèle.</div>` : '';
  const base = Math.max(t.income, t.allocated, 1);
  const slices = t.rows.filter(r => r.amount > 0).map(r => `<i data-seg="${r.c.id}" style="width:${r.amount / base * 100}%;background:${r.c.data.color}" title="${esc(r.c.data.name)} : ${fcfa(r.amount)}"></i>`).join('');
  const restCls = t.rest < 0 ? 'bad' : t.rest === 0 && t.income ? 'good' : 'warn';

  const srcRows = srcs.map(s => {
    const amt = plan.inc[s.id] || 0; const gotId = plan.got[s.id]; const got = !!(gotId && S.recs.get(gotId) && !S.recs.get(gotId)!.deleted);
    return `<div class="src-row">
      <span class="src-ic" style="background:color-mix(in srgb, ${s.data.color} 20%, var(--bg2))">${s.data.icon}</span>
      <input type="text" class="src-name" data-act="srcName" data-v="${s.id}" value="${esc(s.data.name)}" aria-label="Nom de la source">
      <label class="money"><input type="text" inputmode="numeric" class="inc" data-src="${s.id}" value="${amt ? num(amt) : ''}" placeholder="0" aria-label="Montant ${esc(s.data.name)}"><span>FCFA</span></label>
      <button class="got ${got ? 'on' : ''}" data-act="got" data-v="${s.id}" ${future ? 'disabled' : ''} title="${got ? 'Reçu : enregistré dans les opérations' : 'Marquer comme reçu'}">${got ? '✓ Reçu' : 'Reçu ?'}</button>
      <button class="icon-btn src-del" data-act="srcDel" data-v="${s.id}" aria-label="Supprimer ${esc(s.data.name)}">${IC.trash}</button>
    </div>`;
  }).join('');
  const shares = t.income ? `<div class="shares"><div class="slices thin">${srcs.filter(s => plan.inc[s.id]).map(s => `<i data-share="${s.id}" style="width:${(plan.inc[s.id] || 0) / t.income * 100}%;background:${s.data.color}"></i>`).join('')}</div>
    <div class="legend-inline wrap">${srcs.filter(s => plan.inc[s.id]).map(s => `<span><i style="background:${s.data.color}"></i>${esc(s.data.name)} · ${Math.round((plan.inc[s.id] || 0) / t.income * 100)} %</span>`).join('')}</div></div>` : '';

  const envs = t.rows.map(({ c, amount, spent }) => {
    const a = plan.alloc[c.id]; const mode = a?.m || S.pendingMode[c.id] || 'f'; const p = amount ? spent / amount : 0;
    const cls = !amount ? '' : p >= 1 ? 'over' : p >= .8 ? 'warn' : '';
    const pill = !amount ? (spent ? '<span class="pill warn">Hors répartition</span>' : '<span class="pill neutral">Vide</span>')
      : p >= 1 ? '<span class="pill bad">Dépassé</span>' : p >= .8 ? `<span class="pill warn">${Math.round(p * 100)} % utilisé</span>` : `<span class="pill good">${Math.round(p * 100)} % utilisé</span>`;
    const share = t.income && amount ? `<span class="muted" style="font-size:12px">${pctText(amount / t.income * 100)} % du revenu</span>` : '';
    return `<div class="card env ${amount ? 'filled' : ''}" style="--c:${c.data.color}">
      <div class="row" style="justify-content:space-between;flex-wrap:nowrap"><span class="env-name">${c.data.icon} ${esc(c.data.name)}</span>${pill}</div>
      <div class="env-in">
        <div class="seg sm">${[['f', 'FCFA'], ['p', '%']].map(([k, l]) => `<button class="${mode === k ? 'on' : ''}" data-act="amode" data-cat="${c.id}" data-v="${k}">${l}</button>`).join('')}</div>
        <label class="money ${mode === 'p' ? 'pct' : ''}"><input type="text" inputmode="${mode === 'p' ? 'decimal' : 'numeric'}" class="alloc" data-cat="${c.id}" data-mode="${mode}" value="${a ? (mode === 'p' ? pctText(a.v) : num(a.v)) : ''}" placeholder="0" aria-label="Part pour ${esc(c.data.name)}"><span>${mode === 'p' ? '%' : 'FCFA'}</span></label>
      </div>
      <div class="row" style="justify-content:space-between;flex-wrap:nowrap"><b class="num" data-calc="${c.id}">${mode === 'p' ? '= ' + fcfa(amount) : fcfa(amount)}</b>${share}</div>
      <div class="meter ${cls}"><i style="width:${amount ? Math.min(100, p * 100) : 0}%"></i></div>
      <div class="row" style="justify-content:space-between;flex-wrap:nowrap;font-size:12px"><span class="muted num">Dépensé ${fcfa(spent)}</span><span class="num ${amount - spent < 0 ? 'bad' : ''}">${amount ? (amount - spent < 0 ? 'Dépassé de ' + fcfa(spent - amount) : 'Reste ' + fcfa(amount - spent)) : ''}</span></div>
    </div>`;
  }).join('');

  const presets = PRESETS.map(p => `<button class="preset" data-act="preset" data-v="${p.id}"><b>${esc(p.name)}</b><span class="muted">${esc(p.desc)}</span></button>`).join('');

  return head + note + `
  <section class="card plan-hero">
    <div class="plan-kpis">
      <div class="kpi"><div class="eyebrow">Revenu du foyer</div><div class="v gold" id="plIncome">${fcfa(t.income)}</div>${t.income ? `<div class="muted" style="font-size:12px;margin-top:4px">Reçu : ${fcfa(t.received)}</div>` : ''}</div>
      <div class="kpi"><div class="eyebrow">Réparti</div><div class="v" id="plAlloc">${fcfa(t.allocated)}</div></div>
      <div class="kpi"><div class="eyebrow">Reste à répartir</div><div class="v ${restCls}" id="plRest">${fcfa(t.rest)}</div></div>
    </div>
    <div class="slices" id="plSlices" aria-label="Répartition du revenu">${slices}</div>
    <div class="row" style="justify-content:space-between;font-size:13px"><span class="muted">Encore disponible dans les cases</span><b class="num">${fcfa(t.left)}</b></div>
    <div class="save-bar"><span class="save-state ${stored ? 'saved' : 'new'}">${stored ? '✓ Enregistré' : from ? 'Repris du mois dernier' : 'Pas encore enregistré'}</span><button class="btn primary" data-act="planSave">💾 Enregistrer</button></div>
  </section>
  <div class="two" style="margin-top:14px">
    <section class="card grid" style="gap:12px">
      <div class="card-h" style="margin:0"><h2>Revenus du foyer</h2><span class="muted" style="font-size:12px">ce mois-ci</span></div>
      ${srcRows || '<p class="muted" style="margin:0">Aucune source de revenu.</p>'}
      <div class="row" style="flex-wrap:nowrap"><input type="text" id="newSrc" placeholder="Nouvelle source (ex. Prime, Loyer perçu)"><button class="btn" data-act="srcAdd">Ajouter</button></div>
      ${shares}
      <p class="muted" style="margin:0;font-size:12px">« Reçu » enregistre le montant dans tes opérations (revenu, Personnel).</p>
    </section>
    <section class="card grid" style="gap:12px">
      <div class="card-h" style="margin:0"><h2>Répartir en un clic</h2></div>
      <div class="presets">${presets}</div>
      <div class="row"><button class="btn" data-act="restSav" ${t.rest > 0 ? '' : 'disabled'}>🏦 Mettre le reste en Épargne</button>
      ${stored ? '<button class="btn ghost" data-act="planClear">Vider les cases</button>' : ''}</div>
      <div id="presetZone"></div>
    </section>
  </div>
  <div class="card-h" style="margin:26px 2px 12px"><h2>Les cases</h2><span class="muted" style="font-size:12px">en FCFA ou en % du revenu</span></div>
  <div class="acts">${envs}</div>
  <div class="save-bar" style="margin-top:14px"><span class="save-state ${stored ? 'saved' : 'new'}">${stored ? '✓ Enregistré' : 'Pas encore enregistré'}</span><button class="btn primary" data-act="planSave">💾 Enregistrer la répartition</button></div>
  <div class="row" style="flex-wrap:nowrap;margin-top:14px;max-width:520px"><input type="text" id="newCase" placeholder="Nouvelle case (ex. Vacances, Voiture)"><button class="btn" data-act="caseAdd">Ajouter</button></div>
  ${recHtml()}`;
}

function actBudgets() {
  const cs = cats().filter(c => c.data.space === 'act' && c.data.type === 'dep');
  const rows = cs.map(c => {
    const b = budgets().find(x => x.data.space === 'act' && x.data.catId === c.id);
    const spent = spentBy('act', c.id); const amt = b?.data.amount || 0; const p = amt ? spent / amt : 0;
    const cls = !amt ? '' : p >= 1 ? 'over' : p >= .8 ? 'warn' : '';
    return `<div class="card" style="padding:14px"><div class="row" style="justify-content:space-between;flex-wrap:nowrap;margin-bottom:10px">
      <span style="min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-weight:600">${c.data.icon} ${esc(c.data.name)}</span>
      ${!amt ? '<span class="pill neutral">Pas de budget</span>' : p >= 1 ? '<span class="pill bad">Dépassé</span>' : p >= .8 ? '<span class="pill warn">Attention · ' + Math.round(p * 100) + ' %</span>' : '<span class="pill good">' + Math.round(p * 100) + ' %</span>'}</div>
      <div class="meter ${cls}" style="margin-bottom:10px"><i style="width:${amt ? Math.min(100, p * 100) : 0}%"></i></div>
      <div class="row" style="justify-content:space-between;flex-wrap:nowrap"><span class="muted num" style="font-size:13px">${fcfa(spent)} dépensés</span>
      <label class="row" style="gap:6px;flex-wrap:nowrap"><span class="muted" style="font-size:12px">Budget</span><input type="text" inputmode="numeric" class="bud" data-cat="${c.id}" value="${amt ? num(amt) : ''}" placeholder="0" style="width:120px;text-align:right" aria-label="Budget ${esc(c.data.name)}"></label></div></div>`;
  }).join('');
  return `<p class="muted" style="margin:0 0 14px;font-size:13px">Budget mensuel par catégorie pour tes activités. La barre passe en jaune à 80 % et en rouge quand le budget est dépassé.</p>
  <div class="acts">${rows}</div>`;
}

/** Mise à jour en direct pendant la saisie (sans tout redessiner). */
function livePlan() {
  if (S.view !== 'plan' || S.budgetSpace !== 'perso') return;
  let income = 0; document.querySelectorAll<HTMLInputElement>('input.inc').forEach(i => income += parseMoney(i.value));
  let total = 0; const amounts: [string, number][] = [];
  document.querySelectorAll<HTMLInputElement>('input.alloc').forEach(i => {
    const p = i.dataset.mode === 'p'; const v = p ? parsePct(i.value) : parseMoney(i.value);
    const amt = p ? Math.round(income * v / 100) : v; total += amt; amounts.push([i.dataset.cat!, amt]);
    const calc = document.querySelector(`[data-calc="${i.dataset.cat}"]`); if (calc) calc.textContent = (p ? '= ' : '') + fcfa(amt);
  });
  const rest = income - total;
  const set = (id: string, txt: string, cls?: string) => { const el = document.getElementById(id); if (el) { el.textContent = txt; if (cls !== undefined) el.className = 'v ' + cls; } };
  document.querySelectorAll<HTMLButtonElement>('[data-act=restSav]').forEach(x => x.disabled = rest <= 0);
  set('plIncome', fcfa(income)); set('plAlloc', fcfa(total)); set('plRest', fcfa(rest), rest < 0 ? 'bad' : rest === 0 && income ? 'good' : 'warn');
  const base = Math.max(income, total, 1); const box = document.getElementById('plSlices');
  if (box) box.innerHTML = amounts.filter(([, a]) => a > 0).map(([id, a]) => { const c = catOf(id); return `<i style="width:${a / base * 100}%;background:${c.color}" title="${esc(c.name)} : ${fcfa(a)}"></i>`; }).join('');
}

/** Redessine en gardant le curseur dans le champ où l'on était (navigation au clavier, Tab). */
function renderKeep() {
  const a = document.activeElement as HTMLInputElement | null; let sel = '';
  if (a && a.tagName === 'INPUT') {
    if (a.id) sel = '#' + a.id;
    else if (a.dataset.cat) sel = `input.${a.classList[0]}[data-cat="${a.dataset.cat}"]`;
    else if (a.dataset.src) sel = `input.${a.classList[0]}[data-src="${a.dataset.src}"]`;
    else if (a.dataset.v) sel = `input[data-act="${a.dataset.act}"][data-v="${a.dataset.v}"]`;
  } else if (a && a.tagName === 'BUTTON' && a.dataset.act && a.dataset.v) sel = `button[data-act="${a.dataset.act}"][data-v="${a.dataset.v}"]`;
  const y = scrollY; render(); scrollTo({ top: y });
  if (sel) { const n = document.querySelector<HTMLInputElement>(sel); if (n) { n.focus({ preventScroll: true }); if (n.tagName === 'INPUT') try { n.select(); } catch { } } }
}

// ---------- Enregistrement de la répartition ----------
// Chaque frappe est enregistrée automatiquement (après une courte pause), à la sortie d'un champ,
// en changeant de mois ou d'onglet, quand l'app passe en arrière-plan, ou avec le bouton « Enregistrer ».
let planDirty = false, planT = 0;
function setSaveState(st: 'dirty' | 'saving' | 'saved') {
  document.querySelectorAll<HTMLElement>('.save-state').forEach(el => {
    el.className = 'save-state ' + st;
    el.textContent = st === 'dirty' ? 'Modifications en cours…' : st === 'saving' ? 'Enregistrement…' : '✓ Enregistré';
  });
}
function flushPlan(force = false): Promise<void> {
  clearTimeout(planT);
  if ((!planDirty && !force) || S.view !== 'plan' || S.budgetSpace !== 'perso') { planDirty = false; return Promise.resolve(); }
  const d = collectPlan(); planDirty = false;
  if (!d) return Promise.resolve();
  return commitPlan(d);
}
/** Lit tous les champs de la répartition affichée. */
function collectPlan(): { month: string; inc: Record<string, number>; alloc: Record<string, Alloc> } | null {
  const incEls = [...document.querySelectorAll<HTMLInputElement>('input.inc')];
  const allocEls = [...document.querySelectorAll<HTMLInputElement>('input.alloc')];
  if (!incEls.length && !allocEls.length) return null;
  const inc: Record<string, number> = {}; const alloc: Record<string, Alloc> = {};
  incEls.forEach(i => { inc[i.dataset.src!] = parseMoney(i.value); });
  allocEls.forEach(i => { const m: 'f' | 'p' = i.dataset.mode === 'p' ? 'p' : 'f'; alloc[i.dataset.cat!] = { m, v: m === 'p' ? parsePct(i.value) : parseMoney(i.value) }; });
  return { month: S.month, inc, alloc };
}
/** Copie de secours immédiate (synchrone) : rien n'est perdu même si l'app est fermée en pleine saisie. */
function draftPlan() { const d = collectPlan(); if (d) LS.set('planDraft', d); }
function commitPlan(d: { month: string; inc: Record<string, number>; alloc: Record<string, Alloc> }): Promise<void> {
  const { plan } = planFor(d.month); const p: Plan = JSON.parse(JSON.stringify(plan)); p.month = d.month;
  const recs: Rec[] = [];
  Object.entries(d.inc).forEach(([id, amt]) => {
    if (!S.recs.get(id) || S.recs.get(id)!.deleted) return;
    if (amt) p.inc[id] = amt; else delete p.inc[id];
    const src = S.recs.get(id); if (src && amt && (src.data as Source).amount !== amt) recs.push({ ...src, data: { ...src.data, amount: amt } });
    const txId = p.got[id]; const tx = txId ? S.recs.get(txId) : null;
    if (tx && !tx.deleted) {
      if (!amt) { recs.push({ ...tx, deleted: true }); delete p.got[id]; }
      else if ((tx.data as Tx).amount !== amt) recs.push({ ...tx, data: { ...tx.data, amount: amt } });
    }
  });
 Object.entries(d.alloc).forEach(([c, a]) => { if (a.v) p.alloc[c] = a; else delete p.alloc[c]; });
  const id = 'plan_' + d.month; const old = S.recs.get(id);
  recs.push({ id, kind: 'plan', updatedAt: old?.updatedAt || 0, data: p });
  setSaveState('saving');
  return save(recs).then(() => { LS.del('planDraft'); setSaveState('saved'); }, () => { planDirty = true; setSaveState('dirty'); toast('Enregistrement impossible, réessaie.'); });
}
const planEditing = () => planDirty || !!(document.activeElement as HTMLElement | null)?.matches?.('input.inc, input.alloc');
window.addEventListener('pagehide', () => { flushPlan(); });
document.addEventListener('visibilitychange', () => { if (document.hidden) flushPlan(); });

async function setMode(catId: string, mode: 'f' | 'p') {
  const { plan } = planFor(); const a = plan.alloc[catId]; if ((a?.m || 'f') === mode) return;
  const income = incomeOf(plan);
  if (!a) { S.pendingMode[catId] = mode; render(); return; }
  if (mode === 'p' && !income) { toast('Saisis d\'abord les revenus du foyer pour utiliser les %.'); return; }
  const amt = allocAmount(a, income);
  const nv: Alloc = mode === 'p' ? { m: 'p', v: Math.round(amt / income * 1000) / 10 } : { m: 'f', v: amt };
  await savePlan(p => { p.alloc[catId] = nv; }); render();
}
async function toggleGot(srcId: string) {
  const { plan } = planFor(); const txId = plan.got[srcId]; const tx = txId ? S.recs.get(txId) : null;
  if (tx && !tx.deleted) { await save([{ ...tx, deleted: true }]); await savePlan(p => { delete p.got[srcId]; }); render(); toast('Revenu retiré des opérations'); return; }
  const amount = plan.inc[srcId] || 0; if (!amount) { toast('Indique d\'abord le montant reçu.'); return; }
  if (S.month > curMonth()) { toast('Ce mois n\'a pas encore commencé.'); return; }
  const src = S.recs.get(srcId)?.data as Source; const id = 'tx_' + uid();
  await save([{ id, kind: 'tx', updatedAt: 0, data: { type: 'rev', amount, date: S.month === curMonth() ? today() : lastDay(S.month), space: 'perso', catId: salaryCat(), pay: 'Virement', note: src?.name || 'Revenu' } as Tx }]);
  await savePlan(p => { p.got[srcId] = id; }); render(); toast('Revenu enregistré dans les opérations');
}
async function applyPreset(id: string) {
  const pr = PRESETS.find(p => p.id === id); if (!pr) return;
  const { plan } = planFor(); if (!incomeOf(plan)) { toast('Saisis d\'abord les revenus du foyer.'); return; }
  const existing = persoDepCats(); const newCats: Rec[] = []; const alloc: Record<string, Alloc> = {};
  Object.entries(pr.pct).forEach(([name, v], i) => {
    let c = existing.find(x => x.data.name === name)?.id;
    if (!c) { c = 'cat_' + uid(); newCats.push({ id: c, kind: 'cat', updatedAt: 0, data: { name, icon: '•', color: '#e8c27e', space: 'perso', type: 'dep', order: 60 + i } as Cat }); }
    alloc[c] = { m: 'p', v };
  });
  if (newCats.length) await save(newCats);
  await savePlan(p => { p.alloc = alloc; }); render(); toast(`Modèle « ${pr.name} » appliqué`);
}
async function restToSavings() {
  const { plan } = planFor(); const t = planTotals(plan); if (t.rest <= 0) return;
  let sav = persoDepCats().find(c => c.data.name === 'Épargne')?.id;
  if (!sav) { sav = 'cat_' + uid(); await save([{ id: sav, kind: 'cat', updatedAt: 0, data: { name: 'Épargne', icon: '🏦', color: '#5FC28A', space: 'perso', type: 'dep', order: 9 } as Cat }]); }
  const cur = allocAmount(plan.alloc[sav], t.income);
  await savePlan(p => { p.alloc[sav!] = { m: 'f', v: cur + t.rest }; }); render(); toast(`${fcfa(t.rest)} ajoutés à l'Épargne`);
}

// =====================================================================
//  Réglages
// =====================================================================
let deferredInstall: any = null;
window.addEventListener('beforeinstallprompt', (e: any) => { e.preventDefault(); deferredInstall = e; if (S.view === 'settings') render(); });

function viewSettings() {
  const cfg = Sync.getCfg(); const pin = LS.get('pin'); const bio = LS.get('bio');
  const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent); const standalone = matchMedia('(display-mode: standalone)').matches || (navigator as any).standalone;
  const actList = acts().map(a => `<div class="it noic"><input type="color" value="${a.data.color}" data-act="actColor" data-v="${a.id}" aria-label="Couleur"><input type="text" value="${esc(a.data.name)}" data-act="actName" data-v="${a.id}" aria-label="Nom de l'activité"><button class="icon-btn" data-act="actDel" data-v="${a.id}" aria-label="Supprimer">${IC.trash}</button></div>`).join('');
  const cl = cats().filter(c => c.data.space === S.setCatSpace && c.data.type === S.setCatType).map(c => `<div class="it"><input type="color" value="${c.data.color}" data-act="catColor" data-v="${c.id}" aria-label="Couleur"><input type="text" class="emo" value="${esc(c.data.icon)}" data-act="catIcon" data-v="${c.id}" aria-label="Icône" maxlength="4"><input type="text" value="${esc(c.data.name)}" data-act="catName" data-v="${c.id}" aria-label="Nom"><button class="icon-btn" data-act="catDel" data-v="${c.id}" aria-label="Supprimer">${IC.trash}</button></div>`).join('');
  const hasDemo = txs().some(r => r.data.demo);
  return `
  <div class="board-head"><h1>Réglages</h1></div>
  <div class="set">
    <section class="card">
      <h2>Installer l'application</h2>
      ${standalone ? `<p class="muted" style="margin:0">L'application est installée sur cet appareil.</p>` :
      deferredInstall ? `<p class="muted" style="margin:0">Installe MJ7 Finances comme une vraie application, avec son icône.</p><button class="btn primary" data-act="install">Installer sur cet appareil</button>` :
      isIOS ? `<ol class="steps"><li>Ouvre ce lien dans <b>Safari</b>.</li><li>Touche le bouton <b>Partager</b> (carré avec une flèche).</li><li>Choisis <b>Sur l'écran d'accueil</b>, puis <b>Ajouter</b>.</li></ol>` :
      `<ol class="steps"><li>Dans <b>Chrome</b> ou <b>Edge</b>, clique sur l'icône d'installation à droite de la barre d'adresse.</li><li>Sur Android : menu <b>⋮</b> puis <b>Installer l'application</b>.</li><li>Sur Mac avec Safari : menu <b>Fichier</b> puis <b>Ajouter au Dock</b>.</li></ol>`}
    </section>

    <section class="card">
      <h2>Synchronisation ordinateur ↔ téléphone</h2>
      ${!cfg ? `<p class="muted" style="margin:0">Tes données restent sur cet appareil. Pour les retrouver sur ton téléphone et ton ordinateur, connecte un projet Supabase gratuit (le guide est dans le fichier LISEZ-MOI).</p>
        <label class="f">URL du projet Supabase<input type="text" id="sb-url" placeholder="https://xxxx.supabase.co" autocomplete="off"></label>
        <label class="f">Clé publique (anon public)<input type="text" id="sb-key" placeholder="eyJhbGciOi…" autocomplete="off"></label>
        <button class="btn primary" data-act="sbSave">Enregistrer</button>
        <details><summary class="muted" style="cursor:pointer;font-size:13px">Script SQL à coller dans Supabase</summary><pre class="sql">${esc(Sync.SQL)}</pre></details>`
      : !S.sync.email ? `<p class="muted" style="margin:0">Connecte-toi avec l'e-mail et le mot de passe du foyer. <b>Les mêmes sur tous vos appareils</b> (toi et ta femme).</p>
        <label class="f">E-mail du foyer<input type="email" id="sb-mail" placeholder="toi@exemple.com" autocomplete="email" value="${esc(LS.get('mail', ''))}"></label>
        <label class="f">Mot de passe (8 caractères minimum)<input type="password" id="sb-pw" placeholder="••••••••" autocomplete="current-password"></label>
        <div class="row"><button class="btn primary" data-act="sbLogin">Se connecter</button><button class="btn" data-act="sbSignup">Créer le compte (1re fois)</button></div>
        <p class="muted" style="margin:0;font-size:12px">« Créer le compte » une seule fois, sur le premier appareil. Ensuite, sur les autres : « Se connecter » avec le même e-mail et le même mot de passe.</p>
        <details><summary class="muted" style="cursor:pointer;font-size:13px">Ou se connecter avec un code reçu par e-mail</summary>
        <div class="grid" style="gap:10px;margin-top:10px"><button class="btn" data-act="sbSend">Recevoir le code</button>
        <label class="f">Code reçu par e-mail<input type="text" id="sb-code" inputmode="numeric" placeholder="123456" autocomplete="one-time-code"></label>
        <button class="btn" data-act="sbVerify">Valider le code</button></div></details>
        <button class="btn ghost" data-act="sbReset">Changer de projet Supabase</button>`
      : `<p style="margin:0">Connecté : <b>${esc(S.sync.email)}</b></p><p class="muted" style="margin:0;font-size:13px">${esc(S.sync.msg || '')}</p>
        <div class="row"><button class="btn primary" data-act="sbSync">${IC.sync.replace('<svg', '<svg width="16" height="16"')}Synchroniser maintenant</button><button class="btn ghost" data-act="sbOut">Se déconnecter</button></div>`}
    </section>

    <section class="card">
      <h2>Apparence</h2>
      <div class="seg">${[['dark', 'Sombre'], ['light', 'Clair'], ['system', 'Comme l\'appareil']].map(([k, l]) => `<button class="${settings.theme === k ? 'on' : ''}" data-act="theme" data-v="${k}">${l}</button>`).join('')}</div>
      <label class="row" style="justify-content:space-between"><span>Vue simplifiée sans 3D<br><span class="muted" style="font-size:12px">Pour les téléphones lents ou pour économiser la batterie</span></span><input type="checkbox" id="flat" ${settings.flat ? 'checked' : ''} style="width:22px;height:22px"></label>
    </section>

    <section class="card">
      <h2>Verrouillage</h2>
      ${pin ? `<p class="muted" style="margin:0">Un code à 4 chiffres est demandé à l'ouverture.</p>
        <div class="row"><button class="btn" data-act="pinSet">Changer le code</button><button class="btn danger" data-act="pinDel">Retirer le code</button></div>
        ${'PublicKeyCredential' in window ? (bio ? `<div class="row"><span class="pill good">Face ID / empreinte activé</span><button class="btn ghost" data-act="bioDel">Désactiver</button></div>` : `<button class="btn" data-act="bioSet">Activer Face ID / empreinte</button>`) : ''}`
      : `<p class="muted" style="margin:0">Protège l'app par un code à 4 chiffres (et Face ID ou empreinte si ton appareil le permet).</p><button class="btn primary" data-act="pinSet">Choisir un code</button>`}
    </section>

    <section class="card">
      <h2>Activités</h2>
      <div class="list-ed">${actList || '<p class="muted" style="margin:0">Aucune activité.</p>'}</div>
      <div class="row" style="flex-wrap:nowrap"><input type="text" id="newAct" placeholder="Nouvelle activité (ex. Studio)"><button class="btn primary" data-act="actAdd">Ajouter</button></div>
    </section>

    <section class="card">
      <h2>Catégories</h2>
      <div class="row"><div class="seg">${[['perso', 'Personnel'], ['act', 'Activités']].map(([k, l]) => `<button class="${S.setCatSpace === k ? 'on' : ''}" data-act="csp" data-v="${k}">${l}</button>`).join('')}</div>
      <div class="seg">${[['dep', 'Dépenses'], ['rev', 'Revenus']].map(([k, l]) => `<button class="${S.setCatType === k ? 'on' : ''}" data-act="cty" data-v="${k}">${l}</button>`).join('')}</div></div>
      <div class="list-ed">${cl}</div>
      <div class="row" style="flex-wrap:nowrap"><input type="text" id="newCat" placeholder="Nouvelle catégorie"><button class="btn primary" data-act="catAdd">Ajouter</button></div>
    </section>

    <section class="card">
      <h2>Sauvegarde</h2>
      <p class="muted" style="margin:0">Un fichier de secours avec toutes tes données, à garder en lieu sûr.</p>
      <div class="row"><button class="btn" data-act="backup">Télécharger une sauvegarde</button><label class="btn">Restaurer un fichier<input type="file" id="restore" accept="application/json,.json" hidden></label></div>
    </section>

    <section class="card">
      <h2>Données d'exemple</h2>
      <p class="muted" style="margin:0">Remplit l'app avec des opérations fictives sur 4 mois pour la tester. Tu peux les retirer d'un clic.</p>
      ${hasDemo ? `<button class="btn danger" data-act="demoDel">Retirer les données d'exemple</button>` : `<button class="btn" data-act="demoAdd">Ajouter les données d'exemple</button>`}
      <div id="wipeZone"><button class="btn ghost bad" data-act="wipeAsk" style="padding-left:0">Effacer toutes les données de cet appareil</button></div>
    </section>
  </div>`;
}

// =====================================================================
//  Feuille « opération »
// =====================================================================
interface Draft { id?: string; type: TType; amount: string; date: string; space: Space; actId: string; catId: string; pay: string; note: string; receipt?: string }
let draft: Draft | null = null; let confirmDel = false;

function openSheet(id?: string) {
  const last = LS.get('last', { space: 'perso', pay: 'Wave', actId: '' });
  if (id) { const r = S.recs.get(id) as Rec<Tx>; const t = r.data; draft = { id, type: t.type, amount: num(t.amount), date: t.date, space: t.space, actId: t.actId || '', catId: t.catId, pay: t.pay, note: t.note || '', receipt: t.receipt }; }
  else {
    const space: Space = S.scope === 'act' ? 'act' : S.scope === 'perso' ? 'perso' : last.space;
    const d = S.month === curMonth() ? today() : S.month + '-01';
    draft = { type: 'dep', amount: '', date: d, space, actId: S.actFilter || last.actId || acts()[0]?.id || '', catId: '', pay: last.pay, note: '' };
  }
  confirmDel = false; renderSheet(true);
}
function renderSheet(focus = false) {
  if (!draft) return;
  document.querySelector('.scrim')?.remove();
  const d = draft; const cs = cats().filter(c => c.data.space === d.space && c.data.type === d.type);
  if (!cs.find(c => c.id === d.catId)) d.catId = '';
  const el = document.createElement('div'); el.className = 'scrim';
  el.innerHTML = `<form class="sheet" id="sheet" novalidate><div class="grab"></div>
    <div class="sheet-h"><div class="seg">${[['dep', 'Dépense'], ['rev', 'Revenu']].map(([k, l]) => `<button type="button" class="${d.type === k ? 'on' : ''}" data-act="dtype" data-v="${k}">${l}</button>`).join('')}</div>
      <button type="button" class="icon-btn" data-act="close" aria-label="Fermer">${IC.x}</button></div>
    <div class="amount ${d.type}"><input id="amt" type="text" inputmode="numeric" placeholder="0" value="${esc(d.amount)}" aria-label="Montant" autocomplete="off"><span>FCFA</span></div>
    <div class="fgroup"><div class="seg">${[['perso', 'Personnel'], ['act', 'Activités']].map(([k, l]) => `<button type="button" class="${d.space === k ? 'on' : ''}" data-act="dspace" data-v="${k}">${l}</button>`).join('')}</div>
      ${d.space === 'act' ? `<div class="chips">${acts().map(a => `<button type="button" class="chip ${d.actId === a.id ? 'on' : ''}" data-act="dact" data-v="${a.id}"><i style="background:${a.data.color}"></i>${esc(a.data.name)}</button>`).join('') || '<span class="muted">Crée une activité dans Réglages.</span>'}</div>` : ''}</div>
    <div class="fgroup"><span class="eyebrow">Catégorie</span><div class="cats">${cs.map(c => `<button type="button" class="cat ${d.catId === c.id ? 'on' : ''}" data-act="dcat" data-v="${c.id}"><em>${c.data.icon}</em>${esc(c.data.name)}</button>`).join('')}</div></div>
    <div class="fgroup"><span class="eyebrow">Moyen de paiement</span><div class="chips">${PAYS.map(p => `<button type="button" class="chip ${d.pay === p ? 'on' : ''}" data-act="dpay" data-v="${p}"><i style="background:${PAY_COLORS[p]}"></i>${p}</button>`).join('')}</div></div>
    <div class="fgroup" style="grid-template-columns:minmax(0,1fr) minmax(0,1.4fr)"><label class="f">Date<input type="date" id="ddate" value="${d.date}"></label><label class="f">Note<input type="text" id="dnote" value="${esc(d.note)}" placeholder="Facultatif"></label></div>
    <div class="fgroup"><div class="receipt">${d.receipt ? `<img src="${d.receipt}" alt="Reçu"><button type="button" class="btn ghost" data-act="rcptDel">Retirer le reçu</button>` : `<label class="btn">Ajouter une photo du reçu<input type="file" id="rcpt" accept="image/*" capture="environment" hidden></label>`}</div></div>
    <div id="sheetErr" class="bad" style="font-size:13px;margin-bottom:8px" hidden></div>
    ${confirmDel ? `<div class="confirm"><span>Supprimer cette opération ? Cette action est définitive.</span><div class="row"><button type="button" class="btn danger" data-act="delYes">Supprimer</button><button type="button" class="btn ghost" data-act="delNo">Annuler</button></div></div>` :
    `<div class="row" style="justify-content:space-between">${d.id ? `<button type="button" class="btn danger" data-act="delAsk">${IC.trash.replace('<svg', '<svg width="16" height="16"')}Supprimer</button>` : '<span></span>'}<button type="submit" class="btn primary" style="padding:12px 22px">${d.id ? 'Enregistrer' : d.type === 'dep' ? 'Ajouter la dépense' : 'Ajouter le revenu'}</button></div>`}
  </form>`;
  document.body.appendChild(el);
  const amt = $<HTMLInputElement>('#amt', el);
  amt.addEventListener('input', () => { const raw = amt.value.replace(/\D/g, '').slice(0, 12); amt.value = raw ? num(Number(raw)) : ''; d.amount = amt.value; });
  $<HTMLInputElement>('#ddate', el).addEventListener('change', e => d.date = (e.target as HTMLInputElement).value);
  $<HTMLInputElement>('#dnote', el).addEventListener('input', e => d.note = (e.target as HTMLInputElement).value);
  el.addEventListener('click', e => { if (e.target === el) closeSheet(); });
  $('#rcpt', el)?.addEventListener('change', async e => { const f = (e.target as HTMLInputElement).files?.[0]; if (f) { d.receipt = await compress(f); renderSheet(); } });
  $('#sheet', el).addEventListener('submit', e => { e.preventDefault(); submitSheet(); });
  if (focus && !d.id && matchMedia('(hover: hover)').matches) amt.focus();
}
function closeSheet() { draft = null; document.querySelector('.scrim')?.remove(); }
async function submitSheet() {
  const d = draft!; const amount = Number(d.amount.replace(/\D/g, ''));
  const err = (m: string) => { const e = $('#sheetErr'); e.textContent = m; e.hidden = false; };
  if (!amount) return err('Indique un montant.');
  if (!d.catId) return err('Choisis une catégorie.');
  if (d.space === 'act' && !d.actId) return err('Choisis l\'activité concernée.');
  if (!d.date) return err('Indique la date.');
  const old = d.id ? S.recs.get(d.id) as Rec<Tx> : null;
  const rec: Rec<Tx> = { id: d.id || 'tx_' + uid(), kind: 'tx', updatedAt: old?.updatedAt || 0, data: {
    type: d.type, amount, date: d.date, space: d.space, actId: d.space === 'act' ? d.actId : undefined, catId: d.catId, pay: d.pay, note: d.note.trim() || undefined, receipt: d.receipt, recId: old?.data.recId } };
  await save([rec]);
  LS.set('last', { space: d.space, pay: d.pay, actId: d.actId });
  const isNew = !d.id; closeSheet();
  if (S.view === 'board') { S.month = d.date.slice(0, 7); render(); if (isNew && d.type === 'dep') setTimeout(() => scene?.drop(d.catId), 350); } else render();
  toast(isNew ? (d.type === 'dep' ? 'Dépense ajoutée' : 'Revenu ajouté') : 'Opération modifiée');
}
function compress(f: File): Promise<string> {
  return new Promise(res => {
    const img = new Image(); const url = URL.createObjectURL(f);
    img.onload = () => { const k = Math.min(1, 1100 / Math.max(img.width, img.height)); const c = document.createElement('canvas'); c.width = img.width * k; c.height = img.height * k;
      c.getContext('2d')!.drawImage(img, 0, 0, c.width, c.height); URL.revokeObjectURL(url); res(c.toDataURL('image/jpeg', .62)); };
    img.src = url;
  });
}

// ---------- feuille « récurrente » ----------
let rdraft: (Recurring & { id?: string; amountS: string }) | null = null; let rconfirm = false;
function openRec(id?: string) {
  if (id) { const r = S.recs.get(id) as Rec<Recurring>; rdraft = { ...r.data, id, amountS: num(r.data.amount) }; }
  else rdraft = { label: '', type: 'dep', amount: 0, amountS: '', space: 'perso', actId: acts()[0]?.id, catId: '', pay: 'Virement', day: 1, active: true, lastMonth: '' };
  rconfirm = false; renderRec();
}
function renderRec() {
  const d = rdraft!; document.querySelector('.scrim')?.remove();
  const cs = cats().filter(c => c.data.space === d.space && c.data.type === d.type);
  const el = document.createElement('div'); el.className = 'scrim';
  el.innerHTML = `<form class="sheet" id="rsheet" novalidate><div class="grab"></div>
    <div class="sheet-h"><h2>${d.id ? 'Opération récurrente' : 'Nouvelle opération récurrente'}</h2><button type="button" class="icon-btn" data-act="close" aria-label="Fermer">${IC.x}</button></div>
    <div class="fgroup"><label class="f">Libellé<input type="text" id="r-label" value="${esc(d.label)}" placeholder="Loyer, abonnement, internet…"></label></div>
    <div class="fgroup"><div class="row"><div class="seg">${[['dep', 'Dépense'], ['rev', 'Revenu']].map(([k, l]) => `<button type="button" class="${d.type === k ? 'on' : ''}" data-act="rtype" data-v="${k}">${l}</button>`).join('')}</div>
      <div class="seg">${[['perso', 'Personnel'], ['act', 'Activités']].map(([k, l]) => `<button type="button" class="${d.space === k ? 'on' : ''}" data-act="rspace" data-v="${k}">${l}</button>`).join('')}</div></div>
      ${d.space === 'act' ? `<div class="chips">${acts().map(a => `<button type="button" class="chip ${d.actId === a.id ? 'on' : ''}" data-act="ract" data-v="${a.id}"><i style="background:${a.data.color}"></i>${esc(a.data.name)}</button>`).join('')}</div>` : ''}</div>
    <div class="fgroup" style="grid-template-columns:minmax(0,1.4fr) minmax(0,1fr)"><label class="f">Montant (FCFA)<input type="text" inputmode="numeric" id="r-amt" value="${esc(d.amountS)}" placeholder="0"></label><label class="f">Jour du mois<input type="number" id="r-day" min="1" max="31" value="${d.day}"></label></div>
    <div class="fgroup"><span class="eyebrow">Catégorie</span><div class="cats">${cs.map(c => `<button type="button" class="cat ${d.catId === c.id ? 'on' : ''}" data-act="rcat" data-v="${c.id}"><em>${c.data.icon}</em>${esc(c.data.name)}</button>`).join('')}</div></div>
    <div class="fgroup"><span class="eyebrow">Moyen de paiement</span><div class="chips">${PAYS.map(p => `<button type="button" class="chip ${d.pay === p ? 'on' : ''}" data-act="rpay" data-v="${p}"><i style="background:${PAY_COLORS[p]}"></i>${p}</button>`).join('')}</div></div>
    <label class="row fgroup" style="display:flex;justify-content:space-between"><span>Active</span><input type="checkbox" id="r-active" ${d.active ? 'checked' : ''} style="width:22px;height:22px"></label>
    <div id="rErr" class="bad" style="font-size:13px;margin-bottom:8px" hidden></div>
    ${rconfirm ? `<div class="confirm"><span>Supprimer cette opération récurrente ? Les opérations déjà créées restent.</span><div class="row"><button type="button" class="btn danger" data-act="rdelYes">Supprimer</button><button type="button" class="btn ghost" data-act="rdelNo">Annuler</button></div></div>`
    : `<div class="row" style="justify-content:space-between">${d.id ? `<button type="button" class="btn danger" data-act="rdelAsk">Supprimer</button>` : '<span></span>'}<button type="submit" class="btn primary">Enregistrer</button></div>`}
  </form>`;
  document.body.appendChild(el);
  const sync = () => { d.label = $<HTMLInputElement>('#r-label', el).value; d.amountS = $<HTMLInputElement>('#r-amt', el).value; d.day = Math.max(1, Math.min(31, Number($<HTMLInputElement>('#r-day', el).value) || 1)); d.active = $<HTMLInputElement>('#r-active', el).checked; };
  el.addEventListener('input', sync);
  const ra = $<HTMLInputElement>('#r-amt', el); ra.addEventListener('input', () => { const raw = ra.value.replace(/\D/g, '').slice(0, 12); ra.value = raw ? num(Number(raw)) : ''; d.amountS = ra.value; });
  el.addEventListener('click', e => { if (e.target === el) { rdraft = null; el.remove(); } });
  $('#rsheet', el).addEventListener('submit', async e => {
    e.preventDefault(); sync();
    const amount = Number(d.amountS.replace(/\D/g, ''));
    const err = (m: string) => { const x = $('#rErr'); x.textContent = m; x.hidden = false; };
    if (!d.label.trim()) return err('Donne un libellé.'); if (!amount) return err('Indique un montant.'); if (!d.catId) return err('Choisis une catégorie.');
    const old = d.id ? S.recs.get(d.id) as Rec<Recurring> : null;
    const { id, amountS, ...rest } = d;
    const rec: Rec<Recurring> = { id: id || 'rec_' + uid(), kind: 'rec', updatedAt: old?.updatedAt || 0, data: { ...rest, label: d.label.trim(), amount, actId: d.space === 'act' ? d.actId : undefined, lastMonth: old ? old.data.lastMonth : (d.day <= new Date().getDate() ? shiftMonth(curMonth(), -1) : shiftMonth(curMonth(), -1)) } };
    await save([rec]); rdraft = null; el.remove(); await runRecurring(); render(); toast('Opération récurrente enregistrée');
  });
}
async function runRecurring() {
  const { txs: t, updated } = dueRecurring(recurrings());
  if (t.length || updated.length) await save([...t, ...updated]);
  if (t.length) toast(`${t.length} opération${t.length > 1 ? 's' : ''} récurrente${t.length > 1 ? 's' : ''} ajoutée${t.length > 1 ? 's' : ''}`);
}

// =====================================================================
//  Exports
// =====================================================================
function download(name: string, data: BlobPart, type: string) {
  const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([data], { type })); a.download = name;
  document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
}
function periodName() { return S.ops.period === 'year' ? S.month.slice(0, 4) : S.ops.period === 'all' ? 'tout' : S.month; }
function exportCSV() {
  const l = filteredOps().slice().reverse();
  const head = ['Date', 'Type', 'Espace', 'Activité', 'Catégorie', 'Moyen de paiement', 'Montant (FCFA)', 'Note'];
  const q = (v: any) => `"${String(v ?? '').replace(/"/g, '""')}"`;
  const rows = l.map(r => { const t = r.data; return [t.date, t.type === 'dep' ? 'Dépense' : 'Revenu', t.space === 'perso' ? 'Personnel' : 'Activités', actOf(t.actId)?.name || '', catOf(t.catId).name, t.pay, (t.type === 'dep' ? -1 : 1) * t.amount, t.note || ''].map(q).join(';'); });
  download(`MJ7-Finances-${periodName()}.csv`, '﻿' + [head.map(q).join(';'), ...rows].join('\r\n'), 'text/csv;charset=utf-8');
  toast('Export CSV téléchargé');
}
function exportPDF() {
  const l = filteredOps().slice().reverse();
  const part = (space: Space) => {
    const ls = l.filter(r => r.data.space === space); const s = sums(ls);
    if (!ls.length) return `<h2>${space === 'perso' ? 'Personnel' : 'Activités'}</h2><p>Aucune opération.</p>`;
    let extra = '';
    if (space === 'act') extra = `<table><tr><th>Activité</th><th class="r">Revenus</th><th class="r">Dépenses</th><th class="r">Résultat</th></tr>${acts().map(a => { const x = sums(ls.filter(r => r.data.actId === a.id)); return `<tr><td>${esc(a.data.name)}</td><td class="r">${fcfa(x.rev)}</td><td class="r">${fcfa(x.dep)}</td><td class="r">${fcfa(x.bal, true)}</td></tr>`; }).join('')}</table>`;
    return `<h2>${space === 'perso' ? 'Personnel' : 'Activités'}</h2><div class="box"><span>Revenus : <b>${fcfa(s.rev)}</b></span><span>Dépenses : <b>${fcfa(s.dep)}</b></span><span>Solde : <b>${fcfa(s.bal, true)}</b></span></div>${extra}
      <table><tr><th>Date</th><th>Catégorie</th>${space === 'act' ? '<th>Activité</th>' : ''}<th>Paiement</th><th>Note</th><th class="r">Montant</th></tr>${ls.map(r => { const t = r.data; return `<tr><td>${t.date.split('-').reverse().join('/')}</td><td>${esc(catOf(t.catId).name)}</td>${space === 'act' ? `<td>${esc(actOf(t.actId)?.name || '')}</td>` : ''}<td>${esc(t.pay)}</td><td>${esc(t.note || '')}</td><td class="r">${t.type === 'dep' ? '−' : '+'}${fcfa(t.amount)}</td></tr>`; }).join('')}</table>`;
  };
  const title = S.ops.period === 'year' ? `Année ${S.month.slice(0, 4)}` : S.ops.period === 'all' ? 'Toutes les opérations' : monthLabel(S.month);
  let p = document.getElementById('print'); if (!p) { p = document.createElement('div'); p.id = 'print'; document.body.appendChild(p); }
  p.innerHTML = `<h1>MJ7 Finances · ${esc(title)}</h1><p>Édité le ${new Date().toLocaleDateString('fr-FR')}</p>${S.ops.space !== 'act' ? part('perso') : ''}${S.ops.space !== 'perso' ? part('act') : ''}`;
  setTimeout(() => window.print(), 60);
}
async function backup() {
  const data = { app: 'mj7-finances', version: 1, date: new Date().toISOString(), items: [...S.recs.values()] };
  download(`MJ7-Finances-sauvegarde-${today()}.json`, JSON.stringify(data), 'application/json'); toast('Sauvegarde téléchargée');
}
async function restore(f: File) {
  try {
    const j = JSON.parse(await f.text()); if (j.app !== 'mj7-finances' || !Array.isArray(j.items)) throw 0;
    const recs: Rec[] = j.items.filter((r: any) => r && r.id && r.kind);
    const merged = recs.filter(r => { const l = S.recs.get(r.id); return !l || l.updatedAt < r.updatedAt; }).map(r => ({ ...r, dirty: true }));
    merged.forEach(r => S.recs.set(r.id, r)); await DB.putMany(merged); scheduleSync(); render(); toast(`${merged.length} élément${merged.length > 1 ? 's' : ''} restauré${merged.length > 1 ? 's' : ''}`);
  } catch { toast('Ce fichier n\'est pas une sauvegarde MJ7 Finances.'); }
}

// =====================================================================
//  Synchronisation
// =====================================================================
let syncTimer = 0, syncing = false;
function scheduleSync() { if (!Sync.getCfg() || !S.sync.email) return; clearTimeout(syncTimer); syncTimer = window.setTimeout(doSync, 2500); }
async function doSync(manual = false) {
  if (syncing || !Sync.getCfg() || !S.sync.email) return; if (!navigator.onLine) { S.sync.state = 'err'; S.sync.msg = 'Hors connexion : tes saisies seront envoyées au retour du réseau.'; refreshBadge(); return; }
  syncing = true; S.sync.state = 'busy'; refreshBadge();
  try {
    const { incoming, pushedIds } = await Sync.syncNow([...S.recs.values()]);
    incoming.forEach(r => S.recs.set(r.id, r));
    const pushed = pushedIds.map(id => ({ ...S.recs.get(id)!, dirty: false }));
    pushed.forEach(r => S.recs.set(r.id, r));
    await DB.putMany([...incoming, ...pushed]);
    S.sync.state = 'on'; S.sync.msg = 'Dernière synchro : ' + new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    if (incoming.length) { await runRecurring(); if (!draft && !rdraft && !planEditing()) render(); else refreshBadge(); } else refreshBadge();
    if (manual) toast(incoming.length ? `${incoming.length} mise${incoming.length > 1 ? 's' : ''} à jour reçue${incoming.length > 1 ? 's' : ''}` : 'Tout est à jour');
  } catch (e: any) { S.sync.state = 'err'; S.sync.msg = 'Synchro impossible : ' + (e?.message || 'erreur'); refreshBadge(); if (manual) toast(S.sync.msg); }
  syncing = false;
}
function refreshBadge() { if (S.view === 'settings' && document.activeElement?.tagName !== 'INPUT') render(); else document.querySelectorAll('.sync-dot').forEach(el => { el.className = 'sync-dot ' + (S.sync.state === 'on' ? 'on' : S.sync.state === 'err' ? 'err' : ''); el.setAttribute('title', S.sync.msg); el.lastChild!.textContent = S.sync.state === 'busy' ? 'Synchro…' : S.sync.state === 'err' ? 'Synchro en pause' : S.sync.state === 'on' ? 'Synchronisé' : 'Sur cet appareil'; }); }
window.addEventListener('online', () => doSync());
document.addEventListener('visibilitychange', () => { if (!document.hidden) doSync(); });

// =====================================================================
//  Verrou (code + biométrie)
// =====================================================================
async function hash(s: string) { const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode('mj7d:' + s)); return [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, '0')).join(''); }
const b64 = (u: ArrayBuffer) => btoa(String.fromCharCode(...new Uint8Array(u)));
const unb64 = (s: string) => Uint8Array.from(atob(s), c => c.charCodeAt(0));
function pinPad(title: string, onDone: (pin: string) => Promise<boolean>, opts: { bio?: boolean; cancel?: boolean } = {}): HTMLElement {
  const el = document.createElement('div'); el.className = 'lock'; let v = '';
  el.innerHTML = `<div class="lock-in"><img src="icons/icon-192.png" alt="" width="64" height="64" style="border-radius:18px"><h2>${title}</h2><div class="dots">${'<i></i>'.repeat(4)}</div>
    <div class="pad">${[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => `<button data-n="${n}">${n}</button>`).join('')}<button class="sm" data-n="bio" ${opts.bio ? '' : 'style="visibility:hidden"'}>Face ID</button><button data-n="0">0</button><button class="sm" data-n="del">Effacer</button></div>
    ${opts.cancel ? '<button class="btn ghost" data-n="cancel">Annuler</button>' : ''}</div>`;
  const dots = () => el.querySelectorAll('.dots i').forEach((d, i) => d.classList.toggle('f', i < v.length));
  el.addEventListener('click', async e => {
    const n = (e.target as HTMLElement).closest('button')?.dataset.n; if (!n) return;
    if (n === 'cancel') { el.remove(); return; }
    if (n === 'bio') { if (await bioCheck()) el.remove(); return; }
    if (n === 'del') v = v.slice(0, -1); else if (v.length < 4) v += n;
    dots();
    if (v.length === 4) { const ok = await onDone(v); if (ok) el.remove(); else { const d = $('.dots', el); d.classList.add('shake'); setTimeout(() => { d.classList.remove('shake'); v = ''; dots(); }, 380); } }
  });
  document.body.appendChild(el); return el;
}
async function bioCheck(): Promise<boolean> {
  const bio = LS.get('bio'); if (!bio) return false;
  try { await navigator.credentials.get({ publicKey: { challenge: crypto.getRandomValues(new Uint8Array(32)), allowCredentials: [{ id: unb64(bio), type: 'public-key' }], userVerification: 'required', timeout: 60000 } }); return true; }
  catch { return false; }
}
async function bioSetup() {
  try {
    const c = await navigator.credentials.create({ publicKey: { challenge: crypto.getRandomValues(new Uint8Array(32)), rp: { name: 'MJ7 Finances' },
      user: { id: crypto.getRandomValues(new Uint8Array(16)), name: 'mj7-finances', displayName: 'MJ7 Finances' }, pubKeyCredParams: [{ type: 'public-key', alg: -7 }, { type: 'public-key', alg: -257 }],
      authenticatorSelection: { authenticatorAttachment: 'platform', userVerification: 'required', residentKey: 'discouraged' }, timeout: 60000 } }) as PublicKeyCredential;
    LS.set('bio', b64(c.rawId)); toast('Face ID / empreinte activé'); render();
  } catch { toast('Cet appareil n\'a pas pu activer Face ID / empreinte.'); }
}
async function lockIfNeeded(): Promise<void> {
  const pin = LS.get('pin'); if (!pin) return;
  await new Promise<void>(res => {
    const el = pinPad('Entre ton code', async v => { const ok = (await hash(v)) === pin; if (ok) res(); return ok; }, { bio: !!LS.get('bio') });
    if (LS.get('bio')) bioCheck().then(ok => { if (ok) { el.remove(); res(); } });
    const obs = new MutationObserver(() => { if (!el.isConnected) { obs.disconnect(); res(); } }); obs.observe(document.body, { childList: true });
  });
}

// =====================================================================
//  Événements
// =====================================================================
document.addEventListener('click', async e => {
  const b = (e.target as HTMLElement).closest<HTMLElement>('[data-act]'); if (!b) return;
  const a = b.dataset.act!, v = b.dataset.v || '';
  if (b.tagName === 'INPUT') return;
  if (planDirty) await flushPlan();
  switch (a) {
    case 'planSave': await flushPlan(true); render(); toast('Répartition enregistrée'); break;
    case 'add': openSheet(); break;
    case 'month': S.month = S.ops.period === 'year' && S.view === 'ops' ? shiftMonth(S.month, 12 * +v) : shiftMonth(S.month, +v); render(); break;
    case 'scope': S.scope = v as any; S.actFilter = ''; render(); break;
    case 'actf': S.actFilter = v; render(); break;
    case 'openAct': S.scope = 'act'; S.actFilter = v; render(); scrollTo({ top: 0, behavior: 'smooth' }); break;
    case 'period': S.ops.period = v as any; render(); break;
    case 'clearf': S.ops = { ...S.ops, q: '', space: '', act: '', cat: '', pay: '' }; render(); break;
    case 'edit': openSheet(v); break;
    case 'csv': exportCSV(); break;
    case 'pdf': exportPDF(); break;
    case 'bspace': S.budgetSpace = v as Space; render(); break;
    case 'addRec': openRec(); break;
    // répartition
    case 'amode': await setMode(b.dataset.cat!, v as 'f' | 'p'); break;
    case 'got': await toggleGot(v); break;
    case 'preset': {
      if (Object.keys(planFor().plan.alloc).length && b.dataset.sure !== '1') { document.querySelectorAll<HTMLElement>('[data-act=preset]').forEach(x => x.dataset.sure = ''); b.dataset.sure = '1'; b.classList.add('sure'); toast('Touche encore pour remplacer tes cases actuelles par ce modèle.'); return; }
      await applyPreset(v); break; }
    case 'restSav': await restToSavings(); break;
    case 'planClear': if (b.dataset.sure !== '1') { b.dataset.sure = '1'; b.textContent = 'Vider toutes les cases ?'; b.classList.add('danger'); return; }
      await savePlan(p => { p.alloc = {}; }); render(); toast('Cases vidées'); break;
    case 'srcAdd': { const i = $<HTMLInputElement>('#newSrc'); const n = i.value.trim(); if (!n) { i.focus(); return; } const pal = ['#5FC28A', '#7C9CF2', '#3FB6E8', '#D98AD9', '#F2C230'];
      await save([{ id: 'src_' + uid(), kind: 'src', updatedAt: 0, data: { name: n, icon: '💰', color: pal[sources().length % pal.length], amount: 0, order: sources().length + 10 } as Source }]); render(); toast('Source ajoutée'); break; }
    case 'srcDel': { if (b.dataset.sure !== '1') { b.dataset.sure = '1'; b.innerHTML = 'OK ?'; b.style.width = 'auto'; toast('Touche encore pour supprimer cette source.'); return; }
      await remove(v); render(); toast('Source supprimée'); break; }
    case 'caseAdd': { const i = $<HTMLInputElement>('#newCase'); const n = i.value.trim(); if (!n) { i.focus(); return; }
      if (persoDepCats().some(c => c.data.name.toLowerCase() === n.toLowerCase())) { toast('Cette case existe déjà.'); return; }
      const pal = ['#E8C27E', '#7C9CF2', '#5FC28A', '#F28CB1', '#3FB6E8', '#FF9A3D'];
      await save([{ id: 'cat_' + uid(), kind: 'cat', updatedAt: 0, data: { name: n, icon: '•', color: pal[persoDepCats().length % pal.length], space: 'perso', type: 'dep', order: 50 + cats().length } as Cat }]); render(); toast('Case ajoutée'); break; }
    case 'editRec': openRec(v); break;
    // feuille opération
    case 'close': closeSheet(); rdraft = null; document.querySelector('.scrim')?.remove(); break;
    case 'dtype': draft!.type = v as TType; renderSheet(); break;
    case 'dspace': draft!.space = v as Space; renderSheet(); break;
    case 'dact': draft!.actId = v; renderSheet(); break;
    case 'dcat': draft!.catId = v; document.querySelectorAll('.cat').forEach(c => c.classList.toggle('on', (c as HTMLElement).dataset.v === v)); break;
    case 'dpay': draft!.pay = v; document.querySelectorAll('[data-act=dpay]').forEach(c => c.classList.toggle('on', (c as HTMLElement).dataset.v === v)); break;
    case 'rcptDel': draft!.receipt = undefined; renderSheet(); break;
    case 'delAsk': confirmDel = true; renderSheet(); break;
    case 'delNo': confirmDel = false; renderSheet(); break;
    case 'delYes': { const id = draft!.id!; closeSheet(); await remove(id); render(); toast('Opération supprimée'); break; }
    // feuille récurrente
    case 'rtype': rdraft!.type = v as TType; rdraft!.catId = ''; renderRec(); break;
    case 'rspace': rdraft!.space = v as Space; rdraft!.catId = ''; renderRec(); break;
    case 'ract': rdraft!.actId = v; renderRec(); break;
    case 'rcat': rdraft!.catId = v; document.querySelectorAll('[data-act=rcat]').forEach(c => c.classList.toggle('on', (c as HTMLElement).dataset.v === v)); break;
    case 'rpay': rdraft!.pay = v; document.querySelectorAll('[data-act=rpay]').forEach(c => c.classList.toggle('on', (c as HTMLElement).dataset.v === v)); break;
    case 'rdelAsk': rconfirm = true; renderRec(); break;
    case 'rdelNo': rconfirm = false; renderRec(); break;
    case 'rdelYes': { const id = rdraft!.id!; rdraft = null; document.querySelector('.scrim')?.remove(); await remove(id); render(); toast('Opération récurrente supprimée'); break; }
    // réglages
    case 'theme': settings.theme = v; LS.set('theme', v); applyTheme(); render(); break;
    case 'install': deferredInstall?.prompt(); deferredInstall = null; break;
    case 'actAdd': { const i = $<HTMLInputElement>('#newAct'); const n = i.value.trim(); if (!n) return; const pal = ['#ff9a3d', '#7c9cf2', '#5fc28a', '#f28cb1', '#e8c27e', '#3fb6e8'];
      await save([{ id: 'act_' + uid(), kind: 'act', updatedAt: 0, data: { name: n, color: pal[acts().length % pal.length], order: acts().length } }]); render(); toast('Activité ajoutée'); break; }
    case 'actDel': { const r = S.recs.get(v)!; const used = txs().some(t => t.data.actId === v);
      if (b.dataset.sure !== '1') { b.dataset.sure = '1'; b.innerHTML = 'OK ?'; b.style.width = 'auto'; b.title = used ? 'Les opérations liées restent, sans activité.' : ''; toast(used ? 'Touche encore pour confirmer. Les opérations liées resteront dans « Activités ».' : 'Touche encore pour confirmer'); return; }
      await remove(r.id); render(); toast('Activité supprimée'); break; }
    case 'csp': S.setCatSpace = v as Space; render(); break;
    case 'cty': S.setCatType = v as TType; render(); break;
    case 'catAdd': { const i = $<HTMLInputElement>('#newCat'); const n = i.value.trim(); if (!n) return;
      await save([{ id: 'cat_' + uid(), kind: 'cat', updatedAt: 0, data: { name: n, icon: '•', color: '#e8c27e', space: S.setCatSpace, type: S.setCatType, order: 50 + cats().length } }]); render(); toast('Catégorie ajoutée'); break; }
    case 'catDel': { if (b.dataset.sure !== '1') { b.dataset.sure = '1'; b.innerHTML = 'OK ?'; b.style.width = 'auto'; toast('Touche encore pour confirmer. Les opérations gardent leur montant.'); return; }
      await remove(v); render(); toast('Catégorie supprimée'); break; }
    case 'pinSet': pinPad('Choisis un code à 4 chiffres', async p => { const p1 = p; setTimeout(() => pinPad('Confirme ton code', async p2 => { if (p2 !== p1) { toast('Les codes ne correspondent pas.'); return false; } LS.set('pin', await hash(p2)); render(); toast('Code enregistré'); return true; }, { cancel: true }), 50); return true; }, { cancel: true }); break;
    case 'pinDel': LS.del('pin'); LS.del('bio'); render(); toast('Code retiré'); break;
    case 'bioSet': bioSetup(); break;
    case 'bioDel': LS.del('bio'); render(); break;
    case 'backup': backup(); break;
    case 'demoAdd': await save(demoData(list<Cat>('cat'), list<Act>('act'))); S.month = curMonth(); render(); toast('Données d\'exemple ajoutées'); break;
    case 'demoDel': await save(txs().filter(r => r.data.demo).map(r => ({ ...r, deleted: true }))); render(); toast('Données d\'exemple retirées'); break;
    case 'wipeAsk': $('#wipeZone').innerHTML = `<div class="confirm"><span>Effacer toutes les données de cet appareil ? Si la synchro est active, elles restent dans ton compte Supabase.</span><div class="row"><button class="btn danger" data-act="wipeYes">Tout effacer</button><button class="btn ghost" data-act="wipeNo">Annuler</button></div></div>`; break;
    case 'wipeNo': render(); break;
    case 'wipeYes': await DB.clearAll(); S.recs.clear(); try { localStorage.removeItem('mj7d.sync.last'); } catch { } await boot(true); toast('Données effacées'); break;
    case 'sbSave': { const url = $<HTMLInputElement>('#sb-url').value.trim().replace(/\/$/, ''), key = $<HTMLInputElement>('#sb-key').value.trim();
      if (!/^https:\/\/.+\.supabase\.co$/.test(url) || key.length < 20) { toast('Vérifie l\'URL (https://….supabase.co) et la clé.'); return; }
      Sync.setCfg({ url, key }); render(); toast('Projet enregistré : connecte-toi'); break; }
    case 'sbReset': Sync.setCfg(null); S.sync = { state: 'off', email: null, msg: '' }; render(); break;
    case 'sbSend': { const m = $<HTMLInputElement>('#sb-mail').value.trim(); if (!m) { toast('Indique ton e-mail.'); return; } LS.set('mail', m);
      try { await Sync.sendCode(m); toast('Code envoyé : regarde tes e-mails'); } catch (er: any) { toast('Envoi impossible : ' + (er?.message || 'erreur')); } break; }
    case 'sbVerify': { const m = $<HTMLInputElement>('#sb-mail').value.trim(), c = $<HTMLInputElement>('#sb-code').value;
      try { await Sync.verifyCode(m, c); S.sync.email = await Sync.currentEmail(); S.sync.state = 'on'; await markAllDirtyOnce(); render(); doSync(true); } catch (er: any) { toast('Code refusé : ' + (er?.message || 'erreur')); } break; }
    case 'sbLogin': case 'sbSignup': {
      const m = $<HTMLInputElement>('#sb-mail').value.trim(), pw = $<HTMLInputElement>('#sb-pw').value;
      if (!m || pw.length < 8) { toast('Indique l\'e-mail et un mot de passe de 8 caractères minimum.'); return; } LS.set('mail', m);
      try {
        if (a === 'sbSignup') { const ok = await Sync.signUpPassword(m, pw); if (!ok) { toast('Compte créé, mais Supabase demande une confirmation par e-mail : désactive « Confirm email » (voir le guide), puis touche « Se connecter ».'); return; } }
        else await Sync.signInPassword(m, pw);
        S.sync.email = await Sync.currentEmail(); S.sync.state = 'on'; await markAllDirtyOnce(); render(); doSync(true); toast('Connecté');
      } catch (er: any) {
        const msg = String(er?.message || '');
        toast(/invalid login/i.test(msg) ? 'E-mail ou mot de passe incorrect. Première fois ? Touche « Créer le compte ».'
          : /already registered|already exists/i.test(msg) ? 'Ce compte existe déjà : touche « Se connecter ».'
          : /not confirmed/i.test(msg) ? 'E-mail non confirmé : désactive « Confirm email » dans Supabase (voir le guide), puis recrée le compte.'
          : 'Connexion impossible : ' + (msg || 'erreur'));
      } break; }
    case 'sbSync': doSync(true); break;
    case 'sbOut': await Sync.signOut(); S.sync = { state: 'off', email: null, msg: '' }; render(); break;
  }
});
async function markAllDirtyOnce() {
  if (LS.get('pushedAll')) return;
  const all = [...S.recs.values()].map(r => ({ ...r, dirty: true })); all.forEach(r => S.recs.set(r.id, r)); await DB.putMany(all); LS.set('pushedAll', true);
}
document.addEventListener('change', async e => {
  const t = e.target as HTMLInputElement;
  if (t.id === 'restore' && t.files?.[0]) return restore(t.files[0]);
  if (t.id === 'flat') { settings.flat = t.checked; LS.set('flat', t.checked); if (t.checked && scene) { scene.dispose(); scene = null; } render(); return; }
  if (t.id?.startsWith('f-')) { (S.ops as any)[t.id.slice(2)] = t.value; render(); return; }
  if (t.classList.contains('inc') || t.classList.contains('alloc')) {
    planDirty = true; await flushPlan();
    const ae = document.activeElement as HTMLElement | null;
    if (ae === t || !ae?.matches?.('input.inc, input.alloc')) renderKeep();
    return;
  }
  if (t.classList.contains('bud')) {
    const amount = Number(t.value.replace(/\D/g, '')); const id = `bud_${S.budgetSpace}_${t.dataset.cat}`;
    const old = S.recs.get(id); await save([{ id, kind: 'budget', updatedAt: old?.updatedAt || 0, deleted: !amount, data: { space: S.budgetSpace, catId: t.dataset.cat!, amount } }]);
    render(); toast(amount ? 'Budget enregistré' : 'Budget retiré'); return;
  }
  const a = t.dataset.act, v = t.dataset.v; if (!a || !v) return;
  const r = S.recs.get(v); if (!r) return;
  const patch: any = { actColor: { color: t.value }, actName: { name: t.value.trim() }, catColor: { color: t.value }, catName: { name: t.value.trim() }, catIcon: { icon: t.value.trim() || '•' }, srcName: { name: t.value.trim() } }[a];
  if (!patch || (patch.name === '')) return;
  await save([{ ...r, data: { ...r.data, ...patch } }]); toast('Modifié');
});
let qT = 0;
document.addEventListener('input', e => {
  const t = e.target as HTMLInputElement;
  if (t.id === 'q') { S.ops.q = t.value; clearTimeout(qT); qT = window.setTimeout(() => { const pos = t.selectionStart; render(); const q = $<HTMLInputElement>('#q'); q.focus(); q.setSelectionRange(pos, pos); }, 250); }
  if (t.classList.contains('bud') || t.classList.contains('inc') || (t.classList.contains('alloc') && t.dataset.mode !== 'p')) { const raw = t.value.replace(/\D/g, '').slice(0, 12); t.value = raw ? num(Number(raw)) : ''; }
  if (t.classList.contains('alloc') && t.dataset.mode === 'p') { let x = t.value.replace('.', ',').replace(/[^\d,]/g, ''); const k = x.indexOf(','); if (k >= 0) x = x.slice(0, k + 1) + x.slice(k + 1).replace(/,/g, '').slice(0, 1); t.value = x.slice(0, 5); }
  if (t.classList.contains('inc') || t.classList.contains('alloc')) { livePlan(); planDirty = true; draftPlan(); setSaveState('dirty'); clearTimeout(planT); planT = window.setTimeout(() => { flushPlan(); }, 400); }
});
document.addEventListener('keydown', e => { const tg = e.target as HTMLElement; if (e.key === 'Enter' && (tg.id === 'newSrc' || tg.id === 'newCase')) { e.preventDefault(); document.querySelector<HTMLElement>(`[data-act=${tg.id === 'newSrc' ? 'srcAdd' : 'caseAdd'}]`)?.click(); } });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && document.querySelector('.scrim')) { closeSheet(); rdraft = null; document.querySelector('.scrim')?.remove(); } if ((e.key === 'n' || e.key === '+') && !document.querySelector('.scrim, .lock') && !(e.target as HTMLElement).matches('input,textarea,select')) { e.preventDefault(); openSheet(); } });
window.addEventListener('hashchange', route);
window.addEventListener('resize', () => { if (S.view === 'board') drawEvo(); });
matchMedia('(prefers-color-scheme: light)').addEventListener('change', () => { applyTheme(); if (S.view === 'board') drawEvo(); });
function route() {
  flushPlan();
  const h = location.hash.slice(1) as any; const v = h === 'budgets' ? 'plan' : ['board', 'ops', 'plan', 'settings'].includes(h) ? h : 'board';
  if (v !== 'board' && scene) { /* la scène reste en mémoire, elle reprendra sa place */ }
  S.view = v; render(); scrollTo({ top: 0 });
}

// =====================================================================
//  Démarrage
// =====================================================================
async function boot(fresh = false) {
  applyTheme();
  let recs = await DB.all();
  if (!recs.length) { recs = defaults(); await DB.putMany(recs); }
  S.recs = new Map(recs.map(r => [r.id, r]));
  const added = migrations(S.recs); if (added.length) { added.forEach(r => S.recs.set(r.id, r)); await DB.putMany(added); }
  const draft0 = LS.get('planDraft'); if (draft0 && draft0.month && draft0.inc) { try { await commitPlan(draft0); } catch { } }
  if (!fresh) await lockIfNeeded();
  await runRecurring();
  if (Sync.getCfg()) { try { S.sync.email = await Sync.currentEmail(); if (S.sync.email) S.sync.state = 'on'; } catch { } }
  route();
  if (S.sync.email) doSync();
}
boot();

if ('serviceWorker' in navigator && location.protocol === 'https:') {
  window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => { }));
}
