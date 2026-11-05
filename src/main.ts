import './styles.css';
import * as DB from './db';
import { Rec, uid } from './db';
import { Tx, Cat, Act, Budget, Recurring, Space, TType, PAYS, PAY_COLORS, defaults, fcfa, num, monthLabel, today, curMonth, shiftMonth, dueRecurring, demoData, MONTHS, MSHORT } from './model';
import { createScene, webglOK, Scene3D, Bar } from './scene3d';
import * as Sync from './sync';

// =====================================================================
//  État
// =====================================================================
const S = {
  recs: new Map<string, Rec>(),
  view: 'board' as 'board' | 'ops' | 'budgets' | 'settings',
  month: curMonth(),
  scope: 'all' as 'all' | Space,
  actFilter: '' as string,
  ops: { q: '', space: '', act: '', cat: '', pay: '', period: 'month' as 'month' | 'year' | 'all' },
  budgetSpace: 'perso' as Space,
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
  budgets: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="8.5"/><path d="M12 3.5V12l6 6"/></svg>',
  settings: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>',
  plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
  left: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="m15 18-6-6 6-6"/></svg>',
  right: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="m9 18 6-6-6-6"/></svg>',
  x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>',
  trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M3 6h18M8 6V4h8v2m-9 0 1 14h8l1-14"/></svg>',
  sync: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M20 12a8 8 0 0 1-14 5.3M4 12a8 8 0 0 1 14-5.3M18 3v4h-4M6 21v-4h4"/></svg>',
};
const NAV: [typeof S.view, string][] = [['board', 'Tableau'], ['ops', 'Opérations'], ['budgets', 'Budgets'], ['settings', 'Réglages']];

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
  else if (S.view === 'budgets') v.innerHTML = viewBudgets();
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
  const bl = budgets().filter(b => b.data.amount > 0 && (S.scope === 'all' || b.data.space === S.scope)).map(b => {
    const spent = spentBy(b.data.space, b.data.catId); return { b, spent, p: spent / b.data.amount };
  }).sort((a, b) => b.p - a.p).slice(0, 5);
  const budgetHtml = bl.length ? bl.map(({ b, spent, p }) => budgetRow(b, spent, p)).join('') :
    `<div class="muted" style="font-size:13px">Aucun budget défini. <a href="#budgets" style="color:var(--accent)">Fixer un budget</a></div>`;
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
      <div><div class="card-h" style="margin-bottom:10px"><span class="eyebrow">Budgets</span><a href="#budgets" class="muted" style="font-size:12px">Tout voir</a></div><div class="grid" style="gap:12px">${budgetHtml}</div></div>
    </section>
  </div>
  ${acts().length && S.scope !== 'perso' ? `<div class="card-h" style="margin:26px 2px 12px"><h2>Résultat par activité</h2><span class="muted" style="font-size:12px">revenus − dépenses</span></div><div class="acts">${actCards}</div>` : ''}
  <div class="two" style="margin-top:14px">
    <section class="card"><div class="card-h"><span class="eyebrow">6 derniers mois</span><div class="legend-inline"><span><i style="background:var(--gold)"></i>Revenus</span><span><i style="background:var(--accent2)"></i>Dépenses</span></div></div><canvas class="chart" id="evo"></canvas></section>
    <section class="card"><div class="card-h"><span class="eyebrow">Moyens de paiement · dépenses</span></div><div class="grid" style="gap:12px">${payBars(mt)}</div></section>
  </div>`;
}

function budgetRow(b: Rec<Budget>, spent: number, p: number) {
  const c = catOf(b.data.catId);
  const cls = p >= 1 ? 'over' : p >= .8 ? 'warn' : '';
  const pill = p >= 1 ? `<span class="pill bad">Dépassé</span>` : p >= .8 ? `<span class="pill warn">${Math.round(p * 100)} %</span>` : `<span class="muted num" style="font-size:12px">${Math.round(p * 100)} %</span>`;
  return `<div class="grid" style="gap:6px"><div class="row" style="justify-content:space-between;flex-wrap:nowrap"><span style="min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${c.icon} ${esc(c.name)} <span class="muted" style="font-size:12px">· ${b.data.space === 'perso' ? 'Perso' : 'Activités'}</span></span>${pill}</div>
    <div class="meter ${cls}"><i style="width:${Math.min(100, p * 100)}%"></i></div>
    <div class="muted num" style="font-size:12px">${fcfa(spent)} sur ${fcfa(b.data.amount)}</div></div>`;
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
function viewBudgets() {
  const sp = S.budgetSpace;
  const cs = cats().filter(c => c.data.space === sp && c.data.type === 'dep');
  const rows = cs.map(c => {
    const b = budgets().find(x => x.data.space === sp && x.data.catId === c.id);
    const spent = spentBy(sp, c.id); const amt = b?.data.amount || 0; const p = amt ? spent / amt : 0;
    const cls = !amt ? '' : p >= 1 ? 'over' : p >= .8 ? 'warn' : '';
    return `<div class="card" style="padding:14px"><div class="row" style="justify-content:space-between;flex-wrap:nowrap;margin-bottom:10px">
      <span style="min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-weight:600">${c.data.icon} ${esc(c.data.name)}</span>
      ${!amt ? '<span class="pill neutral">Pas de budget</span>' : p >= 1 ? '<span class="pill bad">Dépassé</span>' : p >= .8 ? '<span class="pill warn">Attention · ' + Math.round(p * 100) + ' %</span>' : '<span class="pill good">' + Math.round(p * 100) + ' %</span>'}</div>
      <div class="meter ${cls}" style="margin-bottom:10px"><i style="width:${amt ? Math.min(100, p * 100) : 0}%"></i></div>
      <div class="row" style="justify-content:space-between;flex-wrap:nowrap"><span class="muted num" style="font-size:13px">${fcfa(spent)} dépensés</span>
      <label class="row" style="gap:6px;flex-wrap:nowrap"><span class="muted" style="font-size:12px">Budget</span><input type="text" inputmode="numeric" class="bud" data-cat="${c.id}" value="${amt ? num(amt) : ''}" placeholder="0" style="width:120px;text-align:right" aria-label="Budget ${esc(c.data.name)}"></label></div></div>`;
  }).join('');
  const recs = recurrings();
  return `
  <div class="board-head"><div class="month">
    <button class="icon-btn" data-act="month" data-v="-1">${IC.left}</button><h1>Budgets · ${monthLabel(S.month)}</h1><button class="icon-btn" data-act="month" data-v="1">${IC.right}</button></div>
    <div class="seg">${[['perso', 'Personnel'], ['act', 'Activités']].map(([k, l]) => `<button class="${sp === k ? 'on' : ''}" data-act="bspace" data-v="${k}">${l}</button>`).join('')}</div>
  </div>
  <p class="muted" style="margin:0 0 14px;font-size:13px">Budget mensuel par catégorie. La barre passe en jaune à 80 % et en rouge quand le budget est dépassé.</p>
  <div class="acts">${rows}</div>
  <div class="card-h" style="margin:28px 2px 12px"><h2>Opérations récurrentes</h2><button class="btn primary" data-act="addRec">${IC.plus.replace('<svg', '<svg width="16" height="16"')}Ajouter</button></div>
  <p class="muted" style="margin:0 0 12px;font-size:13px">Loyer, abonnements, internet… Elles s'ajoutent toutes seules chaque mois au jour choisi.</p>
  ${recs.length ? recs.map(r => { const c = catOf(r.data.catId); return `<button class="tx" data-act="editRec" data-v="${r.id}"><span class="ic" style="background:color-mix(in srgb, ${c.color} 18%, var(--bg2))">${c.icon}</span>
    <span style="min-width:0"><div class="t">${esc(r.data.label)}</div><div class="s">Le ${r.data.day} de chaque mois · ${r.data.space === 'perso' ? 'Personnel' : (actOf(r.data.actId)?.name || 'Activités')} · ${esc(r.data.pay)}${r.data.active ? '' : ' · en pause'}</div></span>
    <span class="a ${r.data.type === 'rev' ? 'good' : ''}">${r.data.type === 'rev' ? '+' : '−'}${num(r.data.amount)}<small>FCFA / mois</small></span></button>`; }).join('')
    : `<div class="empty"><b>Aucune opération récurrente</b>Ajoute ton loyer ou tes abonnements pour ne plus les saisir.</div>`}`;
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
      : !S.sync.email ? `<p class="muted" style="margin:0">Connecte-toi avec ton e-mail. Utilise le même sur tous tes appareils.</p>
        <label class="f">E-mail<input type="email" id="sb-mail" placeholder="toi@exemple.com" autocomplete="email" value="${esc(LS.get('mail', ''))}"></label>
        <button class="btn" data-act="sbSend">Recevoir le code</button>
        <label class="f">Code reçu par e-mail<input type="text" id="sb-code" inputmode="numeric" placeholder="123456" autocomplete="one-time-code"></label>
        <button class="btn primary" data-act="sbVerify">Se connecter</button>
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
    if (incoming.length) { await runRecurring(); if (!draft && !rdraft) render(); else refreshBadge(); } else refreshBadge();
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
  switch (a) {
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
  if (t.classList.contains('bud')) {
    const amount = Number(t.value.replace(/\D/g, '')); const id = `bud_${S.budgetSpace}_${t.dataset.cat}`;
    const old = S.recs.get(id); await save([{ id, kind: 'budget', updatedAt: old?.updatedAt || 0, deleted: !amount, data: { space: S.budgetSpace, catId: t.dataset.cat!, amount } }]);
    render(); toast(amount ? 'Budget enregistré' : 'Budget retiré'); return;
  }
  const a = t.dataset.act, v = t.dataset.v; if (!a || !v) return;
  const r = S.recs.get(v); if (!r) return;
  const patch: any = { actColor: { color: t.value }, actName: { name: t.value.trim() }, catColor: { color: t.value }, catName: { name: t.value.trim() }, catIcon: { icon: t.value.trim() || '•' } }[a];
  if (!patch || (patch.name === '')) return;
  await save([{ ...r, data: { ...r.data, ...patch } }]); toast('Modifié');
});
let qT = 0;
document.addEventListener('input', e => {
  const t = e.target as HTMLInputElement;
  if (t.id === 'q') { S.ops.q = t.value; clearTimeout(qT); qT = window.setTimeout(() => { const pos = t.selectionStart; render(); const q = $<HTMLInputElement>('#q'); q.focus(); q.setSelectionRange(pos, pos); }, 250); }
  if (t.classList.contains('bud')) { const raw = t.value.replace(/\D/g, '').slice(0, 12); t.value = raw ? num(Number(raw)) : ''; }
});
document.addEventListener('keydown', e => { if (e.key === 'Escape' && document.querySelector('.scrim')) { closeSheet(); rdraft = null; document.querySelector('.scrim')?.remove(); } if ((e.key === 'n' || e.key === '+') && !document.querySelector('.scrim, .lock') && !(e.target as HTMLElement).matches('input,textarea,select')) { e.preventDefault(); openSheet(); } });
window.addEventListener('hashchange', route);
window.addEventListener('resize', () => { if (S.view === 'board') drawEvo(); });
matchMedia('(prefers-color-scheme: light)').addEventListener('change', () => { applyTheme(); if (S.view === 'board') drawEvo(); });
function route() {
  const h = location.hash.slice(1) as any; const v = ['board', 'ops', 'budgets', 'settings'].includes(h) ? h : 'board';
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
