/**
 * CliniPortal — Pediatrics Clinical Approaches View (TypeScript)
 * Path: src/content/approaches/specialties/pediatrics/nhi-khoa-view.ts
 */

export function renderPediatricsView(): string {
  return `
    <div class="pediatrics-hub-page-wrapper" style="width: 100%; max-width: 1520px; margin: 0 auto; padding-bottom: 2.5rem;">
      
      <!-- BREADCRUMB -->
      <div class="breadcrumb" style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); margin-bottom: 1rem;">
        <a href="#/" style="color: inherit; text-decoration: none;">🏠 Trang chủ</a> &nbsp;/&nbsp; 
        <a href="#/approaches" style="color: inherit; text-decoration: none;">Tiếp cận Lâm sàng</a> &nbsp;/&nbsp; 
        <span style="color: #0284c7; font-weight: 600;">Chuyên khoa Nhi</span>
      </div>

      <!-- HERO BANNER -->
      <section style="background: linear-gradient(135deg, rgba(2,132,199,0.12) 0%, rgba(245,158,11,0.08) 100%), var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 1rem; padding: 2rem; margin-bottom: 1.75rem;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem;">
          <div>
            <span style="display: inline-flex; align-items: center; gap: 0.4rem; font-size: 0.75rem; font-weight: 700; color: #0284c7; text-transform: uppercase; background: #e0f2fe; padding: 0.2rem 0.6rem; border-radius: 0.35rem; margin-bottom: 0.5rem;">
              👶 TIẾP CẬN CHUYÊN KHOA NHI (PEDIATRIC CDSS PROTOCOLS)
            </span>
            <h1 style="font-size: 2.25rem; font-weight: 800; color: var(--color-text, #0f172a); margin: 0 0 0.5rem 0; line-height: 1.2;">
              Tiếp Cận & Xử Trí Bệnh Lý Nhi Khoa
            </h1>
            <p style="color: var(--color-text-muted, #64748b); max-width: 850px; font-size: 0.95rem; margin: 0; line-height: 1.5;">
              Hệ thống phác đồ tiếp cận 9 hội chứng lâm sàng nhi khoa thường gặp, tính liều thuốc chính xác theo cân nặng (mg/kg), dấu hiệu cờ đỏ nguy hiểm và hướng dẫn dinh dưỡng theo lứa tuổi.
            </p>
          </div>
        </div>
      </section>

      <!-- 9 PEDIATRIC PROTOCOLS GRID -->
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.25rem;">
        
        <a href="#/approaches/tc-tre-sot" class="pediatric-card" style="padding: 1.5rem; background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 0.75rem; text-decoration: none; color: inherit;">
          <div style="font-size: 1.75rem; margin-bottom: 0.5rem;">🤒</div>
          <h3 style="margin: 0 0 0.35rem; font-size: 1.1rem; font-weight: 700; color: var(--color-text, #0f172a);">1. Tiếp Cận Trẻ Sốt</h3>
          <p style="margin: 0 0 0.75rem; font-size: 0.825rem; color: var(--color-text-muted, #64748b);">Phân tầng nguy cơ sốt sơ sinh &lt; 3 tháng, sốt co giật và phát hiện dấu hiệu nhiễm trùng huyết (Sepsis).</p>
          <span style="font-size: 0.8rem; font-weight: 700; color: #0284c7;">Xem phác đồ <i class="fa-solid fa-arrow-right"></i></span>
        </a>

        <a href="#/approaches/tc-tre-ho" class="pediatric-card" style="padding: 1.5rem; background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 0.75rem; text-decoration: none; color: inherit;">
          <div style="font-size: 1.75rem; margin-bottom: 0.5rem;">🗣️</div>
          <h3 style="margin: 0 0 0.35rem; font-size: 1.1rem; font-weight: 700; color: var(--color-text, #0f172a);">2. Tiếp Cận Trẻ Ho</h3>
          <p style="margin: 0 0 0.75rem; font-size: 0.825rem; color: var(--color-text-muted, #64748b);">Ho cấp tính vs mạn tính, Viêm thanh khí phế quản (Croup), Ho gà và Dị vật đường thở bỏ quên.</p>
          <span style="font-size: 0.8rem; font-weight: 700; color: #0284c7;">Xem phác đồ <i class="fa-solid fa-arrow-right"></i></span>
        </a>

        <a href="#/approaches/tc-tre-kho-khe" class="pediatric-card" style="padding: 1.5rem; background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 0.75rem; text-decoration: none; color: inherit;">
          <div style="font-size: 1.75rem; margin-bottom: 0.5rem;">🫁</div>
          <h3 style="margin: 0 0 0.35rem; font-size: 1.1rem; font-weight: 700; color: var(--color-text, #0f172a);">3. Tiếp Cận Trẻ Khò Khè</h3>
          <p style="margin: 0 0 0.75rem; font-size: 0.825rem; color: var(--color-text-muted, #64748b);">Viêm tiểu phế quản (RSV), Cơn hen phế quản trẻ em, Thang điểm Wang và thử đáp ứng giãn phế quản.</p>
          <span style="font-size: 0.8rem; font-weight: 700; color: #0284c7;">Xem phác đồ <i class="fa-solid fa-arrow-right"></i></span>
        </a>

        <a href="#/approaches/tc-tre-dau-bung" class="pediatric-card" style="padding: 1.5rem; background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 0.75rem; text-decoration: none; color: inherit;">
          <div style="font-size: 1.75rem; margin-bottom: 0.5rem;">🤢</div>
          <h3 style="margin: 0 0 0.35rem; font-size: 1.1rem; font-weight: 700; color: var(--color-text, #0f172a);">4. Tiếp Cận Trẻ Đau Bụng</h3>
          <p style="margin: 0 0 0.75rem; font-size: 0.825rem; color: var(--color-text-muted, #64748b);">Lồng ruột cấp (khóc thét từng cơn, đi ngoài phân máu), Viêm ruột thừa và Đau bụng chức năng.</p>
          <span style="font-size: 0.8rem; font-weight: 700; color: #0284c7;">Xem phác đồ <i class="fa-solid fa-arrow-right"></i></span>
        </a>

        <a href="#/approaches/tc-tre-tim" class="pediatric-card" style="padding: 1.5rem; background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 0.75rem; text-decoration: none; color: inherit;">
          <div style="font-size: 1.75rem; margin-bottom: 0.5rem;">💙</div>
          <h3 style="margin: 0 0 0.35rem; font-size: 1.1rem; font-weight: 700; color: var(--color-text, #0f172a);">5. Tiếp Cận Trẻ Tím Tái</h3>
          <p style="margin: 0 0 0.75rem; font-size: 0.825rem; color: var(--color-text-muted, #64748b);">Tím trung ương vs ngoại vi, Nghiệm pháp Hyperoxia test phân biệt bệnh tim bẩm sinh tím vs Phổi.</p>
          <span style="font-size: 0.8rem; font-weight: 700; color: #0284c7;">Xem phác đồ <i class="fa-solid fa-arrow-right"></i></span>
        </a>

        <a href="#/approaches/tc-tim-bam-sinh" class="pediatric-card" style="padding: 1.5rem; background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 0.75rem; text-decoration: none; color: inherit;">
          <div style="font-size: 1.75rem; margin-bottom: 0.5rem;">❤️</div>
          <h3 style="margin: 0 0 0.35rem; font-size: 1.1rem; font-weight: 700; color: var(--color-text, #0f172a);">6. Tim Bẩm Sinh & Cơn Tím Tetralogy</h3>
          <p style="margin: 0 0 0.75rem; font-size: 0.825rem; color: var(--color-text-muted, #64748b);">Xử trí cơn tím ngất Tứ chứng Fallot (Tư thế gối ngực, Morphine, Bicarbonate) và Luồng thông T-P / P-T.</p>
          <span style="font-size: 0.8rem; font-weight: 700; color: #0284c7;">Xem phác đồ <i class="fa-solid fa-arrow-right"></i></span>
        </a>

        <a href="#/approaches/tc-tre-thieu-mau" class="pediatric-card" style="padding: 1.5rem; background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 0.75rem; text-decoration: none; color: inherit;">
          <div style="font-size: 1.75rem; margin-bottom: 0.5rem;">🩸</div>
          <h3 style="margin: 0 0 0.35rem; font-size: 1.1rem; font-weight: 700; color: var(--color-text, #0f172a);">7. Tiếp Cận Thiếu Máu Trẻ Em</h3>
          <p style="margin: 0 0 0.75rem; font-size: 0.825rem; color: var(--color-text-muted, #64748b);">Chỉ số Mentzer (MCV/RBC), Thalassemia, Thiếu máu thiếu sắt và chỉ định truyền máu nhi.</p>
          <span style="font-size: 0.8rem; font-weight: 700; color: #0284c7;">Xem phác đồ <i class="fa-solid fa-arrow-right"></i></span>
        </a>

        <a href="#/approaches/tc-tre-roi-loan-tri-giac" class="pediatric-card" style="padding: 1.5rem; background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 0.75rem; text-decoration: none; color: inherit;">
          <div style="font-size: 1.75rem; margin-bottom: 0.5rem;">🧠</div>
          <h3 style="margin: 0 0 0.35rem; font-size: 1.1rem; font-weight: 700; color: var(--color-text, #0f172a);">8. Rối Loạn Tri Giác & Hôn Mê</h3>
          <p style="margin: 0 0 0.75rem; font-size: 0.825rem; color: var(--color-text-muted, #64748b);">Thang điểm Glasgow nhi khoa (pGCS), Viêm màng não mủ, Ngộ độc thuốc và Hạ đường huyết cấp.</p>
          <span style="font-size: 0.8rem; font-weight: 700; color: #0284c7;">Xem phác đồ <i class="fa-solid fa-arrow-right"></i></span>
        </a>

        <a href="#/approaches/tc-nuoi-duong-tre-em" class="pediatric-card" style="padding: 1.5rem; background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 0.75rem; text-decoration: none; color: inherit;">
          <div style="font-size: 1.75rem; margin-bottom: 0.5rem;">🍼</div>
          <h3 style="margin: 0 0 0.35rem; font-size: 1.1rem; font-weight: 700; color: var(--color-text, #0f172a);">9. Dinh Dưỡng & Nuôi Dưỡng Trẻ Em</h3>
          <p style="margin: 0 0 0.75rem; font-size: 0.825rem; color: var(--color-text-muted, #64748b);">Nhu cầu năng lượng (Kcal/kg), chế độ ăn dặm, nuôi con bằng sữa mẹ và phòng ngừa suy dinh dưỡng.</p>
          <span style="font-size: 0.8rem; font-weight: 700; color: #0284c7;">Xem phác đồ <i class="fa-solid fa-arrow-right"></i></span>
        </a>

      </div>

    </div>
  `;
}
