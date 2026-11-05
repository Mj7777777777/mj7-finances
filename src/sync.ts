// Synchronisation facultative via Supabase (dernier écrit gagne, par enregistrement).
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Rec } from './db';

const CFG = 'mj7d.sync.cfg', LAST = 'mj7d.sync.last';
let client: SupabaseClient | null = null;

export interface SyncCfg { url: string; key: string }
export function getCfg(): SyncCfg | null { try { return JSON.parse(localStorage.getItem(CFG) || 'null'); } catch { return null; } }
export function setCfg(c: SyncCfg | null) {
  try { c ? localStorage.setItem(CFG, JSON.stringify(c)) : localStorage.removeItem(CFG); localStorage.removeItem(LAST); } catch { }
  client = null;
}
function sb(): SupabaseClient | null {
  if (client) return client;
  const c = getCfg(); if (!c) return null;
  client = createClient(c.url, c.key, { auth: { persistSession: true, autoRefreshToken: true, storageKey: 'mj7d.auth' } });
  return client;
}

export async function currentEmail(): Promise<string | null> {
  const c = sb(); if (!c) return null;
  const { data } = await c.auth.getSession(); return data.session?.user?.email ?? null;
}
export async function sendCode(email: string) {
  const c = sb(); if (!c) throw new Error('Synchronisation non configurée');
  const { error } = await c.auth.signInWithOtp({ email, options: { shouldCreateUser: true } });
  if (error) throw error;
}
export async function verifyCode(email: string, token: string) {
  const c = sb(); if (!c) throw new Error('Synchronisation non configurée');
  const { error } = await c.auth.verifyOtp({ email, token: token.trim(), type: 'email' });
  if (error) throw error;
}
export async function signOut() { const c = sb(); if (c) await c.auth.signOut(); try { localStorage.removeItem(LAST); } catch { } }

/** Tire puis pousse. Renvoie les enregistrements distants plus récents à appliquer localement et ceux poussés. */
export async function syncNow(local: Rec[]): Promise<{ incoming: Rec[]; pushedIds: string[] }> {
  const c = sb(); if (!c) throw new Error('Synchronisation non configurée');
  const { data: s } = await c.auth.getSession(); if (!s.session) throw new Error('Non connecté');
  let since = 0; try { since = Number(localStorage.getItem(LAST) || 0); } catch { }
  const incoming: Rec[] = []; let maxSeen = since;
  let from = 0; const page = 500;
  for (;;) {
    const { data, error } = await c.from('mj7_items').select('id,kind,data,updated_at,deleted')
      .gt('updated_at', Math.max(0, since - 300000)).order('updated_at').range(from, from + page - 1);
    if (error) throw error;
    for (const r of data || []) {
      maxSeen = Math.max(maxSeen, Number(r.updated_at));
      const l = local.find(x => x.id === r.id);
      if (!l || l.updatedAt < Number(r.updated_at)) incoming.push({ id: r.id, kind: r.kind, data: r.data, updatedAt: Number(r.updated_at), deleted: r.deleted, dirty: false });
    }
    if (!data || data.length < page) break; from += page;
  }
  const inIds = new Set(incoming.map(r => r.id));
  const toPush = local.filter(r => r.dirty && !inIds.has(r.id));
  for (let i = 0; i < toPush.length; i += 200) {
    const rows = toPush.slice(i, i + 200).map(r => ({ user_id: s.session!.user.id, id: r.id, kind: r.kind, data: r.data, updated_at: r.updatedAt, deleted: !!r.deleted }));
    const { error } = await c.from('mj7_items').upsert(rows, { onConflict: 'user_id,id' });
    if (error) throw error;
    rows.forEach(r => { maxSeen = Math.max(maxSeen, r.updated_at); });
  }
  try { localStorage.setItem(LAST, String(maxSeen)); } catch { }
  return { incoming, pushedIds: toPush.map(r => r.id) };
}

export const SQL = `create table if not exists public.mj7_items (
  id text not null,
  user_id uuid not null default auth.uid() references auth.users on delete cascade,
  kind text not null,
  data jsonb not null,
  updated_at bigint not null,
  deleted boolean not null default false,
  primary key (user_id, id)
);
alter table public.mj7_items enable row level security;
create policy "Mes données seulement" on public.mj7_items
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);`;
