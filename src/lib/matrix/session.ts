import type { MatrixSession } from './types';

const STORAGE_KEY = 'owncast_matrix_session';

export function saveSession(session: MatrixSession): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  } catch {
    // localStorage may be unavailable (e.g. Firefox private mode)
  }
}

export function loadSession(): MatrixSession | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as MatrixSession;
  } catch {
    return null;
  }
}

export function clearSession(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // noop
  }
}
