// Stockage local (IndexedDB). Chaque enregistrement = { id, kind, data, updatedAt, deleted, dirty }.
// kind : 'tx' | 'cat' | 'act' | 'budget' | 'rec' | 'meta'
export type Kind = 'tx' | 'cat' | 'act' | 'budget' | 'rec' | 'meta';
export interface Rec<T = any> { id: string; kind: Kind; data: T; updatedAt: number; deleted?: boolean; dirty?: boolean }

const DB_NAME = 'mj7-depenses';
let dbp: Promise<IDBDatabase> | null = null;

function open(): Promise<IDBDatabase> {
  if (dbp) return dbp;
  dbp = new Promise((res, rej) => {
    const r = indexedDB.open(DB_NAME, 1);
    r.onupgradeneeded = () => {
      const db = r.result;
      const s = db.createObjectStore('items', { keyPath: 'id' });
      s.createIndex('kind', 'kind');
    };
    r.onsuccess = () => res(r.result);
    r.onerror = () => rej(r.error);
  });
  return dbp;
}

function tx(mode: IDBTransactionMode) {
  return open().then(db => db.transaction('items', mode).objectStore('items'));
}
function wrap<T>(r: IDBRequest<T>): Promise<T> {
  return new Promise((res, rej) => { r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); });
}

export async function all(): Promise<Rec[]> { return wrap((await tx('readonly')).getAll()); }
export async function put(rec: Rec): Promise<void> { await wrap((await tx('readwrite')).put(rec)); }
export async function putMany(recs: Rec[]): Promise<void> {
  const db = await open();
  await new Promise<void>((res, rej) => {
    const t = db.transaction('items', 'readwrite');
    const s = t.objectStore('items');
    recs.forEach(r => s.put(r));
    t.oncomplete = () => res(); t.onerror = () => rej(t.error);
  });
}
export async function clearAll(): Promise<void> { await wrap((await tx('readwrite')).clear()); }

export function uid(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
}
