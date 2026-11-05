import { Rec, uid } from './db';

export type Space = 'perso' | 'act';
export type TType = 'dep' | 'rev';
export interface Tx { type: TType; amount: number; date: string; space: Space; actId?: string; catId: string; pay: string; note?: string; receipt?: string; recId?: string; demo?: boolean }
export interface Cat { name: string; icon: string; color: string; space: Space; type: TType; order: number }
export interface Act { name: string; color: string; order: number }
export interface Budget { space: Space; catId: string; amount: number }
export interface Recurring { label: string; type: TType; amount: number; space: Space; actId?: string; catId: string; pay: string; day: number; active: boolean; lastMonth: string }

export const PAYS = ['Espèces', 'Wave', 'Orange Money', 'MTN MoMo', 'Moov Money', 'Carte', 'Virement'];
export const PAY_COLORS: Record<string, string> = {
  'Espèces': '#8FA36B', 'Wave': '#3FB6E8', 'Orange Money': '#FF7A1A', 'MTN MoMo': '#F2C230',
  'Moov Money': '#3E6FD8', 'Carte': '#B07CE8', 'Virement': '#9AA0A6'
};

const P: [string, string, string][] = [
  ['Logement', '🏠', '#E8C27E'], ['Nourriture', '🍲', '#FF9A3D'], ['Transport', '🚕', '#F2C230'],
  ['Factures', '💡', '#3FB6E8'], ['Santé', '🩺', '#E8636B'], ['Famille', '👨‍👩‍👧', '#D98AD9'],
  ['Église et dons', '⛪', '#8FD0B0'], ['Loisirs', '🎬', '#7C9CF2'], ['Shopping', '🛍️', '#F28CB1'],
  ['Épargne', '🏦', '#5FC28A'], ['Autre', '•', '#9AA0A6']];
const A: [string, string, string][] = [
  ['Matériel', '🎛️', '#FF9A3D'], ['Logiciels et abonnements', '💻', '#7C9CF2'], ['Location de lieux', '📍', '#E8C27E'],
  ['Transport et déplacements', '🚐', '#F2C230'], ['Équipe et assistants', '🤝', '#5FC28A'], ['Publicité', '📣', '#F28CB1'],
  ['Frais bancaires et Mobile Money', '🏧', '#3FB6E8'], ['Autre', '•', '#9AA0A6']];
const PR: [string, string, string][] = [['Salaire', '💼', '#5FC28A'], ['Cadeau reçu', '🎁', '#F28CB1'], ['Autre revenu', '＋', '#9AA0A6']];
const AR: [string, string, string][] = [['Ventes', '🛒', '#5FC28A'], ['Prestations', '🎥', '#FF9A3D'], ['Autre revenu', '＋', '#9AA0A6']];

export function defaults(): Rec[] {
  const now = 1; const out: Rec[] = []; // date très ancienne : une version synchronisée l'emporte toujours
  const add = (list: [string, string, string][], space: Space, type: TType) => list.forEach(([name, icon, color], i) =>
    out.push({ id: `cat_${space}_${type}_${i}`, kind: 'cat', data: { name, icon, color, space, type, order: i } as Cat, updatedAt: now, dirty: true }));
  add(P, 'perso', 'dep'); add(A, 'act', 'dep'); add(PR, 'perso', 'rev'); add(AR, 'act', 'rev');
  [['MJ7 PLUGINS', '#FF9A3D'], ['Prestations vidéo', '#7C9CF2'], ['Prestations son', '#5FC28A']].forEach(([name, color], i) =>
    out.push({ id: `act_${i}`, kind: 'act', data: { name, color, order: i } as Act, updatedAt: now, dirty: true }));
  return out;
}

// ---------- formatage ----------
export function fcfa(n: number, sign = false): string {
  const s = Math.round(Math.abs(n)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return (n < 0 ? '−' : sign && n > 0 ? '+' : '') + s + ' FCFA';
}
export function num(n: number): string { return Math.round(Math.abs(n)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '); }
export const MONTHS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
export const MSHORT = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];
export function monthLabel(m: string): string { const [y, mo] = m.split('-').map(Number); return `${MONTHS[mo - 1]} ${y}`; }
export function today(): string { const d = new Date(); return iso(d); }
export function iso(d: Date): string { return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; }
export function curMonth(): string { return today().slice(0, 7); }
export function shiftMonth(m: string, k: number): string { const [y, mo] = m.split('-').map(Number); const d = new Date(y, mo - 1 + k, 1); return iso(d).slice(0, 7); }
export function dateLabel(d: string): string { const [y, m, dd] = d.split('-').map(Number); return `${dd} ${MONTHS[m - 1].slice(0, 4).replace(/\.$/, '')}${MONTHS[m - 1].length > 4 ? '.' : ''}`; }

// ---------- dépenses récurrentes : génère les opérations dues jusqu'à aujourd'hui ----------
export function dueRecurring(recs: Rec<Recurring>[]): { txs: Rec<Tx>[]; updated: Rec<Recurring>[] } {
  const txs: Rec<Tx>[] = []; const updated: Rec<Recurring>[] = []; const now = Date.now();
  const cm = curMonth(); const td = new Date().getDate();
  for (const r of recs) {
    if (r.deleted || !r.data.active) continue;
    let m = r.data.lastMonth ? shiftMonth(r.data.lastMonth, 1) : cm;
    let last = r.data.lastMonth; let guard = 0;
    while (m <= cm && guard++ < 24) {
      const [y, mo] = m.split('-').map(Number);
      const dim = new Date(y, mo, 0).getDate(); const day = Math.min(r.data.day, dim);
      if (m === cm && day > td) break;
      txs.push({ id: 'tx_' + uid(), kind: 'tx', updatedAt: now, dirty: true, data: {
        type: r.data.type, amount: r.data.amount, date: `${m}-${String(day).padStart(2, '0')}`, space: r.data.space,
        actId: r.data.actId, catId: r.data.catId, pay: r.data.pay, note: r.data.label, recId: r.id } });
      last = m; m = shiftMonth(m, 1);
    }
    if (last !== r.data.lastMonth) updated.push({ ...r, data: { ...r.data, lastMonth: last }, updatedAt: now, dirty: true });
  }
  return { txs, updated };
}

// ---------- données d'exemple ----------
export function demoData(cats: Rec<Cat>[], acts: Rec<Act>[]): Rec<Tx>[] {
  const out: Rec<Tx>[] = []; const now = Date.now();
  const find = (space: Space, type: TType, name: string) => cats.find(c => !c.deleted && c.data.space === space && c.data.type === type && c.data.name === name)?.id
    || cats.find(c => !c.deleted && c.data.space === space && c.data.type === type)?.id || '';
  const a = (i: number) => acts.filter(x => !x.deleted)[i]?.id;
  const rows: [number, TType, Space, string, number, string, string, number?][] = [
    // [mois relatif, type, espace, catégorie, montant, paiement, note, activité]
    [0, 'dep', 'perso', 'Logement', 150000, 'Virement', 'Loyer'], [0, 'dep', 'perso', 'Nourriture', 42500, 'Wave', 'Courses'],
    [0, 'dep', 'perso', 'Transport', 18000, 'Espèces', 'Yango'], [0, 'dep', 'perso', 'Factures', 25000, 'Orange Money', 'CIE + internet'],
    [0, 'dep', 'perso', 'Église et dons', 20000, 'Espèces', 'Dîme'], [0, 'dep', 'perso', 'Loisirs', 12000, 'Wave', 'Cinéma'],
    [0, 'rev', 'perso', 'Salaire', 450000, 'Virement', 'Salaire'],
    [0, 'dep', 'act', 'Logiciels et abonnements', 16500, 'Carte', 'Abonnement logiciel', 0], [0, 'dep', 'act', 'Publicité', 30000, 'Carte', 'Pub Instagram', 0],
    [0, 'rev', 'act', 'Ventes', 300000, 'Wave', '2 Vocal Pack + 1 Suite', 0], [0, 'dep', 'act', 'Location de lieux', 75000, 'Orange Money', 'Lieu de tournage', 1],
    [0, 'dep', 'act', 'Équipe et assistants', 60000, 'Espèces', 'Assistants', 1], [0, 'rev', 'act', 'Prestations', 400000, 'Virement', 'Clip', 1],
    [0, 'dep', 'act', 'Matériel', 45000, 'Wave', 'Câbles + micro', 2], [0, 'rev', 'act', 'Prestations', 120000, 'Wave', 'Mixage single', 2],
    [-1, 'dep', 'perso', 'Logement', 150000, 'Virement', 'Loyer'], [-1, 'dep', 'perso', 'Nourriture', 55000, 'Wave', 'Courses'],
    [-1, 'dep', 'perso', 'Transport', 22000, 'Espèces', 'Yango'], [-1, 'rev', 'perso', 'Salaire', 450000, 'Virement', 'Salaire'],
    [-1, 'rev', 'act', 'Ventes', 150000, 'Wave', 'Vocal Pack', 0], [-1, 'dep', 'act', 'Publicité', 20000, 'Carte', 'Pub', 0],
    [-1, 'rev', 'act', 'Prestations', 250000, 'Virement', 'Spot', 1], [-1, 'dep', 'act', 'Location de lieux', 50000, 'Wave', 'Lieu', 1],
    [-2, 'dep', 'perso', 'Logement', 150000, 'Virement', 'Loyer'], [-2, 'dep', 'perso', 'Nourriture', 48000, 'Wave', 'Courses'],
    [-2, 'rev', 'perso', 'Salaire', 450000, 'Virement', 'Salaire'], [-2, 'rev', 'act', 'Prestations', 180000, 'Wave', 'Mix', 2],
    [-3, 'dep', 'perso', 'Logement', 150000, 'Virement', 'Loyer'], [-3, 'rev', 'perso', 'Salaire', 450000, 'Virement', 'Salaire'],
    [-3, 'dep', 'perso', 'Santé', 35000, 'Espèces', 'Pharmacie'], [-3, 'rev', 'act', 'Prestations', 300000, 'Virement', 'Captation', 1],
  ];
  const cm = curMonth(); const td = new Date().getDate();
  rows.forEach(([mo, type, space, cn, amount, pay, note, ai], i) => {
    const m = shiftMonth(cm, mo); const day = mo === 0 ? Math.max(1, Math.min(td, 1 + (i * 3) % 27)) : 1 + (i * 5) % 27;
    out.push({ id: 'tx_demo_' + i, kind: 'tx', updatedAt: now, dirty: true, data: {
      type, amount, date: `${m}-${String(day).padStart(2, '0')}`, space, catId: find(space, type, cn), pay, note,
      actId: space === 'act' ? a(ai ?? 0) : undefined, demo: true } });
  });
  return out;
}
