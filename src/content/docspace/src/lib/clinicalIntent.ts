/**
 * CliniPortal DocSpace — Clinical Intent Client Module
 * Re-exports and integrates the Clinical Intent Protocol for DocSpace React SPA.
 */

export const CLINICAL_INTENT_KEY = 'cp_clinical_intent';

export type ClinicalIntentAction =
  | 'create-soap-from-guideline'
  | 'open-guideline-reader'
  | 'open-cdss-studio'
  | 'search-vault'
  | 'apply-drug-protocol';

export type ClinicalIntentSource = 'ebm' | 'docspace' | 'vault' | 'cdss' | 'portal';

export interface ClinicalIntent<T = Record<string, any>> {
  action: ClinicalIntentAction;
  payload: T;
  source: ClinicalIntentSource;
  timestamp: number;
  consumed?: boolean;
}

/**
 * Đóng gói Clinical Intent và lưu vào sessionStorage
 */
export function sendClinicalIntent<T = Record<string, any>>(
  intent: Omit<ClinicalIntent<T>, 'timestamp'>
): void {
  if (typeof window === 'undefined' || !window.sessionStorage) return;

  const envelope: ClinicalIntent<T> = {
    ...intent,
    timestamp: Date.now(),
    consumed: false,
  };

  try {
    window.sessionStorage.setItem(CLINICAL_INTENT_KEY, JSON.stringify(envelope));
  } catch (err) {
    console.warn('[ClinicalIntent] Failed to persist intent to sessionStorage:', err);
  }
}

/**
 * Đọc Clinical Intent từ sessionStorage.
 * Trả về null nếu không có hoặc đã quá hạn (> 60s) hoặc đã consumed.
 * Tự động đánh dấu consumed để tránh kích hoạt lặp.
 */
export function receiveClinicalIntent<T = Record<string, any>>(): ClinicalIntent<T> | null {
  if (typeof window === 'undefined' || !window.sessionStorage) return null;

  try {
    const raw = window.sessionStorage.getItem(CLINICAL_INTENT_KEY);
    if (!raw) return null;

    const envelope: ClinicalIntent<T> = JSON.parse(raw);

    // Bỏ qua intent quá hạn 60 giây
    if (!envelope.timestamp || Date.now() - envelope.timestamp > 60_000) {
      window.sessionStorage.removeItem(CLINICAL_INTENT_KEY);
      return null;
    }

    // Bỏ qua nếu đã consumed
    if (envelope.consumed) {
      window.sessionStorage.removeItem(CLINICAL_INTENT_KEY);
      return null;
    }

    // Đánh dấu đã consumed
    envelope.consumed = true;
    try {
      window.sessionStorage.setItem(CLINICAL_INTENT_KEY, JSON.stringify(envelope));
    } catch {
      // ignore
    }

    return envelope;
  } catch (err) {
    console.warn('[ClinicalIntent] Error parsing intent:', err);
    return null;
  }
}

/**
 * Xóa sạch intent khỏi sessionStorage
 */
export function clearClinicalIntent(): void {
  if (typeof window === 'undefined' || !window.sessionStorage) return;
  try {
    window.sessionStorage.removeItem(CLINICAL_INTENT_KEY);
  } catch {
    // ignore
  }
}

/**
 * Đọc fallback query params từ URL search hoặc hash search
 */
export function parseUrlIntentFallback(): { fromGuideline?: string; studio?: string; vaultSearch?: string } {
  if (typeof window === 'undefined') return {};

  const params = new URLSearchParams(window.location.search);
  
  // Kiểm tra nếu query param nằm trong hash (#/docspace?from_guideline=...)
  if (window.location.hash.includes('?')) {
    const hashQuery = window.location.hash.slice(window.location.hash.indexOf('?') + 1);
    const hashParams = new URLSearchParams(hashQuery);
    hashParams.forEach((val, key) => {
      if (!params.has(key)) params.set(key, val);
    });
  }

  return {
    fromGuideline: params.get('from_guideline') || undefined,
    studio: params.get('studio') || undefined,
    vaultSearch: params.get('vault_search') || params.get('query') || undefined,
  };
}
