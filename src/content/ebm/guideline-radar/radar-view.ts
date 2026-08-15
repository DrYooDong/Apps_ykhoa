/**
 * CliniPortal — Guideline Radar Diff Viewer SPA View (TypeScript)
 * Path: src/content/ebm/guideline-radar/radar-view.ts
 */

export function renderRadarView(): string {
  return `
    <div class="guideline-radar-container animate-fade-in" style="max-width: 1440px; margin: 0 auto; padding: 1.5rem 1rem;">
      <!-- Breadcrumb & Header -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <div style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); margin-bottom: 0.25rem;">
            <a href="#/ebm" style="color: var(--color-primary, #0284c7); text-decoration: none;"><i class="fa-solid fa-chevron-left"></i> Y Học Chứng Cứ</a> / Guideline Radar
          </div>
          <h1 style="font-size: 1.85rem; font-weight: 800; color: #7c3aed; margin: 0; display: flex; align-items: center; gap: 0.75rem;">
            <i class="fa-solid fa-radar"></i> Guideline Radar Diff Viewer & Practice-Changing Updates
          </h1>
          <p style="font-size: 0.95rem; color: var(--color-text-muted, #64748b); margin: 0.25rem 0 0 0;">
            Theo dõi, so sánh đối đầu trước/sau (Diff Viewer) các thay đổi khuyến cáo có ảnh hưởng bước ngoặt đến thực hành lâm sàng.
          </p>
        </div>
        
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <a href="#/ebm/kho-guidelines" class="btn btn-outline" style="padding: 0.5rem 1rem; border-radius: 8px; border: 1px solid var(--color-border, #e2e8f0); color: var(--color-text, #334155); text-decoration: none; font-size: 0.875rem; font-weight: 600;">
            <i class="fa-solid fa-arrow-left"></i> Kho Guidelines
          </a>
        </div>
      </div>

      <!-- Diff Comparison Card Grid -->
      <div style="display: grid; grid-template-columns: 1fr; gap: 1.5rem;">
        
        <!-- CARD 1: ĐTĐ & SGLT2i/GLP-1 RA -->
        <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.5rem; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span style="background: #ede9fe; color: #7c3aed; font-weight: 700; font-size: 0.8rem; padding: 0.25rem 0.6rem; border-radius: 6px;">Nội Tiết & ĐTĐ</span>
              <h3 style="font-size: 1.2rem; font-weight: 700; color: var(--color-text, #0f172a); margin: 0;">Khởi Trị Thuốc Hạ Đường Huyết (ADA Standards of Care 2026 vs Cũ)</h3>
            </div>
            <span style="font-size: 0.8rem; font-weight: 700; color: #dc2626; background: #fef2f2; padding: 0.25rem 0.6rem; border-radius: 6px;">🔥 Practice-Changing</span>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
            <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 1rem;">
              <div style="font-size: 0.8rem; font-weight: 700; color: #dc2626; margin-bottom: 0.5rem;">❌ Khuyến Cáo Cũ (Trước đây)</div>
              <p style="font-size: 0.875rem; color: #334155; margin: 0; line-height: 1.5;">
                Bắt buộc khởi đầu bằng <strong>Metformin</strong> đơn trị liệu cho mọi bệnh nhân ĐTĐ type 2. Chỉ thêm thuốc thứ hai (SGLT2i/GLP-1 RA/DPP-4i) khi Metformin không đạt mục tiêu HbA1c sau 3 tháng.
              </p>
            </div>

            <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 1rem;">
              <div style="font-size: 0.8rem; font-weight: 700; color: #16a34a; margin-bottom: 0.5rem;">✅ Cập Nhật Mới Nhất (ADA 2026 / KDIGO 2024)</div>
              <p style="font-size: 0.875rem; color: #334155; margin: 0; line-height: 1.5;">
                Khởi trị ngay <strong>SGLT2i hoặc GLP-1 RA</strong> (có thể phối hợp hoặc độc lập với Metformin) ở bệnh nhân có nguy cơ ASCVD cao, Suy tim (HFrEF/HFpEF) hoặc Bệnh thận mạn (CKD) <strong>bất kể mức HbA1c ban đầu</strong>.
              </p>
            </div>
          </div>
        </div>

        <!-- CARD 2: COPD GOLD 2026 -->
        <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.5rem; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span style="background: #eff6ff; color: #2563eb; font-weight: 700; font-size: 0.8rem; padding: 0.25rem 0.6rem; border-radius: 6px;">Hô Hấp</span>
              <h3 style="font-size: 1.2rem; font-weight: 700; color: var(--color-text, #0f172a); margin: 0;">Khởi Trị Thuốc Giãn Phế Quản (GOLD 2026 vs GOLD ABCD cũ)</h3>
            </div>
            <span style="font-size: 0.8rem; font-weight: 700; color: #dc2626; background: #fef2f2; padding: 0.25rem 0.6rem; border-radius: 6px;">🔥 Practice-Changing</span>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
            <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 1rem;">
              <div style="font-size: 0.8rem; font-weight: 700; color: #dc2626; margin-bottom: 0.5rem;">❌ Khuyến Cáo Cũ (Phân loại ABCD)</div>
              <p style="font-size: 0.875rem; color: #334155; margin: 0; line-height: 1.5;">
                Nhóm D khởi trị bằng LAMA hoặc LABA/LAMA hoặc ICS/LABA. Chưa có vai trò quyết định của số lượng bạch cầu ái toan máu (blood eosinophils).
              </p>
            </div>

            <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 1rem;">
              <div style="font-size: 0.8rem; font-weight: 700; color: #16a34a; margin-bottom: 0.5rem;">✅ Cập Nhật Mới Nhất (GOLD 2026 / Bộ Y Tế)</div>
              <p style="font-size: 0.875rem; color: #334155; margin: 0; line-height: 1.5;">
                Hợp nhất nhóm C và D thành <strong>Nhóm E (Exacerbation)</strong>. Khởi trị ưu tiên <strong>LABA + LAMA</strong>. Chỉ thêm ICS (bộ ba LABA+LAMA+ICS) khi bạch cầu ái toan $\ge$ 300 tế bào/$\mu$L hoặc $\ge$ 100 tế bào/$\mu$L kèm $\ge$ 2 đợt cấp trung bình/năm.
              </p>
            </div>
          </div>
        </div>

        <!-- CARD 3: TĂNG HUYẾT ÁP AHA 2025 -->
        <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.5rem; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span style="background: #fee2e2; color: #dc2626; font-weight: 700; font-size: 0.8rem; padding: 0.25rem 0.6rem; border-radius: 6px;">Tim Mạch</span>
              <h3 style="font-size: 1.2rem; font-weight: 700; color: var(--color-text, #0f172a); margin: 0;">Mục Tiêu Huyết Áp & Phối Hợp Thuốc (AHA/ACC 2025 vs JNC-8)</h3>
            </div>
            <span style="font-size: 0.8rem; font-weight: 700; color: #dc2626; background: #fef2f2; padding: 0.25rem 0.6rem; border-radius: 6px;">🔥 Practice-Changing</span>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
            <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 1rem;">
              <div style="font-size: 0.8rem; font-weight: 700; color: #dc2626; margin-bottom: 0.5rem;">❌ Khuyến Cáo Cũ (JNC-8)</div>
              <p style="font-size: 0.875rem; color: #334155; margin: 0; line-height: 1.5;">
                Mục tiêu HA &lt; 140/90 mmHg (hoặc &lt; 150/90 mmHg ở người $\ge$ 60 tuổi). Bắt đầu bằng đơn trị liệu và chỉnh liều từ từ.
              </p>
            </div>

            <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 1rem;">
              <div style="font-size: 0.8rem; font-weight: 700; color: #16a34a; margin-bottom: 0.5rem;">✅ Cập Nhật Mới Nhất (AHA/ACC 2025 / VNHA)</div>
              <p style="font-size: 0.875rem; color: #334155; margin: 0; line-height: 1.5;">
                Mục tiêu HA chung <strong>&lt; 130/80 mmHg</strong> (hoặc tâm thu 120-129 mmHg nếu dung nạp tốt). Khuyến cáo khởi đầu ngay bằng <strong>viên phối hợp liều cố định 2 thuốc (SPC: ACEi/ARB + CCB hoặc Lợi tiểu Thiazide-like)</strong> cho hầu hết bệnh nhân Tăng huyết áp Độ 2.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  `;
}
