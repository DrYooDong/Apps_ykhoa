import { ClinicalSession } from '../types';
import { safeStorageSet, safeStorageGet, safeStorageRemove } from '../storage';

const SESSION_KEY = 'cp_clinical_session';

/**
 * Lưu ClinicalSession vào localStorage và phát CustomEvent
 */
export function publishSession(session: ClinicalSession): void {
  safeStorageSet(SESSION_KEY, JSON.stringify(session));
  
  // Same-tab reactivity
  window.dispatchEvent(new CustomEvent('cp:session-update', { detail: session }));
}

/**
 * Lắng nghe thay đổi của ClinicalSession từ cả storage (khác tab) và CustomEvent (cùng tab)
 */
export function onSessionUpdate(cb: (s: ClinicalSession) => void): () => void {
  const storageHandler = (e: StorageEvent) => {
    if (e.key === SESSION_KEY && e.newValue) {
      try {
        cb(JSON.parse(e.newValue));
      } catch {}
    }
  };
  
  const customHandler = (e: Event) => cb((e as CustomEvent).detail);
  
  window.addEventListener('storage', storageHandler);
  window.addEventListener('cp:session-update', customHandler);
  
  return () => {
    window.removeEventListener('storage', storageHandler);
    window.removeEventListener('cp:session-update', customHandler);
  };
}

/**
 * Khôi phục session đang có trong localStorage
 */
export function getActiveSession(): ClinicalSession | null {
  try {
    const raw = safeStorageGet(SESSION_KEY, '');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/**
 * Xóa session hiện tại
 */
export function clearSession(): void {
  safeStorageRemove(SESSION_KEY);
  window.dispatchEvent(new CustomEvent('cp:session-update', { detail: null }));
}

/**
 * Parse thông tin bệnh nhân thành URL parameters để mở Web con (Deep link)
 */
export function buildDeepLink(toolPath: string, session: ClinicalSession): string {
  const p = session.patient;
  const params = new URLSearchParams();
  
  if (p.age != null) params.set('age', String(p.age));
  if (p.weight != null) params.set('weight', String(p.weight));
  if (p.height != null) params.set('height', String(p.height));
  if (p.egfr != null) params.set('egfr', String(p.egfr));
  if (p.scr != null) params.set('scr', String(p.scr));
  if (p.na != null) params.set('na', String(p.na));
  
  const query = params.toString();
  return query ? `${toolPath}?${query}` : toolPath;
}
