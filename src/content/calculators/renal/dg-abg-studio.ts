/**
 * CliniPortal — Arterial Blood Gas (ABG) & Davenport Studio (TypeScript Module)
 * 7-Step ABG Interpretation, Davenport Acid-Base Nomogram, A-a Gradient, Delta-Delta & Clinical Bridge Auto-fill
 */

export function initDocspaceAutoFill(): void {
  const raw = localStorage.getItem('cp_clinical_session');
  const urlParams = new URLSearchParams(window.location.hash.split('?')[1] || window.location.search);

  let session: any = null;
  try {
    if (raw) session = JSON.parse(raw);
  } catch (e) {
    console.warn('Failed to parse clinical session', e);
  }

  const na = urlParams.get('na') ?? session?.patient?.na;

  function setInputSafe(id: string, value: any): void {
    const el = document.getElementById(id) as HTMLInputElement | null;
    if (el && value != null) {
      el.value = value;
      el.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }

  if (na) setInputSafe('inputNaNum', na);
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDocspaceAutoFill);
  } else {
    initDocspaceAutoFill();
  }
}
