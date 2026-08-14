/**
 * CliniPortal — Tiếp Cận Sinh Hóa Gan & R Factor Calculator (TypeScript Module)
 */

declare function switchPane(paneId: string): void;

export interface RFactorResult {
  r: number;
  pattern: 'hepatocellular' | 'cholestatic' | 'mixed';
  label: string;
  icon: string;
  pane: string;
  info: string;
  bg: string;
  border: string;
}

export function calculateRFactor(
  alt: number,
  altUln: number,
  alp: number,
  alpUln: number
): RFactorResult {
  const r = (alt / altUln) / (alp / alpUln);

  if (r > 5) {
    return {
      r,
      pattern: 'hepatocellular',
      label: 'TỔN THƯƠNG HỦY TẾ BÀO GAN (Hepatocellular)',
      icon: '🔴',
      pane: 'hepa',
      info: 'Chuyển sang <strong>Sơ đồ 1</strong> – AST/ALT',
      bg: '#fef2f2',
      border: '#dc2626'
    };
  } else if (r < 2) {
    return {
      r,
      pattern: 'cholestatic',
      label: 'TỔN THƯƠNG Ứ MẬT (Cholestatic)',
      icon: '🟡',
      pane: 'chole',
      info: 'Chuyển sang <strong>Sơ đồ 2</strong> – ALP/GGT',
      bg: '#fffbeb',
      border: '#d97706'
    };
  } else {
    return {
      r,
      pattern: 'mixed',
      label: 'KIỂU HỖN HỢP (Mixed Pattern) – 2 ≤ R ≤ 5',
      icon: '🔵',
      pane: 'hepa',
      info: 'Đánh giá <strong>cả 2 nhánh</strong>. Ưu tiên soi Transaminase trước.',
      bg: '#f0f9ff',
      border: '#0284c7'
    };
  }
}

export function calcR(): void {
  const altInput = document.getElementById('alt-val') as HTMLInputElement | null;
  const altUlnInput = document.getElementById('alt-uln') as HTMLInputElement | null;
  const alpInput = document.getElementById('alp-val') as HTMLInputElement | null;
  const alpUlnInput = document.getElementById('alp-uln') as HTMLInputElement | null;
  const box = document.getElementById('r-result');

  if (!altInput || !altUlnInput || !alpInput || !alpUlnInput || !box) return;

  const alt = parseFloat(altInput.value);
  const altUln = parseFloat(altUlnInput.value);
  const alp = parseFloat(alpInput.value);
  const alpUln = parseFloat(alpUlnInput.value);

  if (isNaN(alt) || isNaN(alp) || isNaN(altUln) || isNaN(alpUln) || altUln <= 0 || alpUln <= 0) {
    box.style.display = 'block';
    box.style.background = '#fef2f2';
    box.style.borderLeftColor = '#dc2626';
    box.innerHTML = '<strong>⚠️ Vui lòng nhập đủ 4 chỉ số hợp lệ.</strong>';
    return;
  }

  const res = calculateRFactor(alt, altUln, alp, alpUln);

  box.style.display = 'block';
  box.style.background = res.bg;
  box.style.borderLeftColor = res.border;
  box.innerHTML = `
    <div class="r-value-big" style="color:${res.border}">${res.icon} R = ${res.r.toFixed(2)}</div>
    <div style="font-weight:700; color:${res.border}; margin-bottom:6px;">${res.label}</div>
    <div style="font-size:13px; color:#475569; margin-bottom:10px;">${res.info}</div>
    <button class="r-goto-btn" id="r-goto-btn-action" style="background:${res.border}">
      Mở sơ đồ tương ứng ➔
    </button>
  `;

  const actionBtn = document.getElementById('r-goto-btn-action');
  if (actionBtn) {
    actionBtn.addEventListener('click', () => {
      if (typeof switchPane === 'function') {
        switchPane(res.pane);
      }
      box.scrollIntoView({ behavior: 'smooth', block: 'end' });
    });
  }

  box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

export function resetR(): void {
  const altInput = document.getElementById('alt-val') as HTMLInputElement | null;
  const alpInput = document.getElementById('alp-val') as HTMLInputElement | null;
  const box = document.getElementById('r-result');

  if (altInput) altInput.value = '';
  if (alpInput) alpInput.value = '';
  if (box) {
    box.style.display = 'none';
    box.innerHTML = '';
  }
}

// Bind to window for legacy onclick handlers if any
if (typeof window !== 'undefined') {
  (window as any).calcR = calcR;
  (window as any).resetR = resetR;
}

export function initSinhHoaGan(): void {
  const calcBtn = document.getElementById('btn-calc-r');
  const resetBtn = document.getElementById('btn-reset-r');

  if (calcBtn) calcBtn.addEventListener('click', calcR);
  if (resetBtn) resetBtn.addEventListener('click', resetR);
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSinhHoaGan);
  } else {
    initSinhHoaGan();
  }
}
