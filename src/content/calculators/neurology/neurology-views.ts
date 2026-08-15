/**
 * CliniPortal — Neurology Calculators SPA Views (TypeScript)
 * Path: src/content/calculators/neurology/neurology-views.ts
 */

export function renderNeurologyToolsView(): string {
  return `
    <div class="neuro-tools-container animate-fade-in" style="max-width: 1300px; margin: 0 auto; padding: 1.5rem 1rem;">
      <!-- Breadcrumb & Header -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <div style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); margin-bottom: 0.25rem;">
            <a href="#/calculators" style="color: var(--color-primary, #0284c7); text-decoration: none;"><i class="fa-solid fa-chevron-left"></i> Công Cụ & Thang Điểm</a> / Thần Kinh & Đột Quỵ
          </div>
          <h1 style="font-size: 1.75rem; font-weight: 800; color: #7c3aed; margin: 0; display: flex; align-items: center; gap: 0.75rem;">
            <i class="fa-solid fa-brain"></i> Stroke Pro Studio — Cấp Cứu Đột Quỵ Não Cấp (NIHSS & ASPECTS)
          </h1>
        </div>
        
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <a href="#/calculators" class="btn btn-outline" style="padding: 0.5rem 1rem; border-radius: 8px; border: 1px solid var(--color-border, #e2e8f0); color: var(--color-text, #334155); text-decoration: none; font-size: 0.875rem; font-weight: 600;">
            <i class="fa-solid fa-arrow-left"></i> Danh sách công cụ
          </a>
        </div>
      </div>

      <!-- Content -->
      <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.5rem;">
        <h3 style="font-size: 1.25rem; font-weight: 700; color: #7c3aed; margin-bottom: 0.75rem;">
          <i class="fa-solid fa-clock"></i> Cửa Sổ Vàng Tái Thông Mạch Máu Não Cấp
        </h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem; margin-top: 1rem;">
          <div style="background: #f5f3ff; border: 1px solid #ddd6fe; border-radius: 8px; padding: 1rem;">
            <h4 style="font-weight: 700; color: #6d28d9; margin: 0 0 0.5rem 0;">1. Tiêu Sợi Huyết rtPA (≤ 4.5 Giờ)</h4>
            <p style="font-size: 0.85rem; color: #334155; margin: 0;">Liều Alteplase (rtPA): 0.9 mg/kg (tối đa 90mg) — 10% tiêm bolus tĩnh mạch trong 1 phút, 90% còn lại truyền tĩnh mạch liên tục trong 60 phút.</p>
          </div>
          <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 1rem;">
            <h4 style="font-weight: 700; color: #1d4ed8; margin: 0 0 0.5rem 0;">2. Lấy Huyết Khối Cơ Học EVT (≤ 24 Giờ)</h4>
            <p style="font-size: 0.85rem; color: #334155; margin: 0;">Áp dụng cho tắc mạch máu lớn tuần hoàn trước (ICA, MCA M1/M2) theo tiêu chuẩn thử nghiệm lâm sàng DAWN & DEFUSE-3.</p>
          </div>
          <div style="background: #fdf2f8; border: 1px solid #fbcfe8; border-radius: 8px; padding: 1rem;">
            <h4 style="font-weight: 700; color: #be185d; margin: 0 0 0.5rem 0;">3. Kiểm Soát Huyết Áp (Nicardipine)</h4>
            <p style="font-size: 0.85rem; color: #334155; margin: 0;">Duy trì HA &lt; 185/110 mmHg trước khi dùng rtPA và &lt; 180/105 mmHg trong và sau khi dùng rtPA trong 24 giờ đầu.</p>
          </div>
        </div>
      </div>
    </div>
  `;
}
