export type StorageLike = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;

export type LocalReadResult<T> = {
  value: T;
  recovered: boolean;
};

export function readLocalJson<T>(
  storage: StorageLike,
  key: string,
  fallback: T,
  validate?: (value: unknown) => value is T,
): LocalReadResult<T> {
  try {
    const raw = storage.getItem(key);
    if (raw === null) return { value: fallback, recovered: false };
    const parsed: unknown = JSON.parse(raw);
    if (validate) {
      if (!validate(parsed)) throw new Error('Stored data has an invalid shape.');
      return { value: parsed, recovered: false };
    }
    return { value: parsed as T, recovered: false };
  } catch {
    try { storage.removeItem(key); } catch { /* storage can be unavailable */ }
    return { value: fallback, recovered: true };
  }
}

export function writeLocalJson(storage: StorageLike, key: string, value: unknown): boolean {
  try {
    storage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
