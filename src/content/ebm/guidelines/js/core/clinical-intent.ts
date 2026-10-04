/**
 * CliniPortal Clinical Intent Event Bus (Standalone)
 * Path: js/core/clinical-intent.ts
 */
export interface ClinicalIntentPayload {
  action: string;
  source?: string;
  data?: any;
  [key: string]: any;
}

export function sendClinicalIntent(payload: ClinicalIntentPayload): void {
  if (typeof window === 'undefined') return;
  try {
    const event = new CustomEvent('cliniportal:clinical-intent', {
      bubbles: true,
      composed: true,
      detail: payload
    });
    window.dispatchEvent(event);
    console.debug('[ClinicalIntent] Sent:', payload);
  } catch (err) {
    console.warn('[ClinicalIntent] Failed to dispatch intent:', err);
  }
}
