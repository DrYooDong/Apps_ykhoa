/**
 * CliniPortal 2.0 — Clinical Approaches SPA Hub View
 * Path: src/content/approaches/approaches-view.ts
 */

import '../../../css/components/approach-hub.css';
import '../../../css/components/flowchart.css';
import '../../../css/components/ma-tran-trieu-chung.css';

export function renderApproachesView(): string {
  return `
    <div class="approaches-hub-page-wrapper" style="width: 100%; max-width: 1520px; margin: 0 auto; padding-bottom: 2.5rem;">
      
      <!-- BREADCRUMB -->
      <div class="breadcrumb" style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); margin-bottom: 1rem;">
        <a href="#/" style="color: inherit; text-decoration: none;">🏠 Trang chủ</a> &nbsp;/&nbsp; 
        <span style="color: var(--color-primary, #0284c7); font-weight: 600;">Tiếp cận Lâm sàng & Lưu đồ CDSS</span>
      </div>

      <!-- HERO BANNER -->
      <section style="background: linear-gradient(135deg, rgba(16,185,129,0.12) 0%, rgba(2,132,199,0.08) 100%), var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 1rem; padding: 2rem; margin-bottom: 1.75rem;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem;">
          <div>
            <span style="display: inline-flex; align-items: center; gap: 0.4rem; font-size: 0.75rem; font-weight: 700; color: #059669; text-transform: uppercase; background: #ecfdf5; padding: 0.2rem 0.6rem; border-radius: 0.35rem; margin-bottom: 0.5rem;">
              🌿 LƯU ĐỒ THUẬT TOÁN CHẨN ĐOÁN & XỬ TRÍ CẤP CỨU
            </span>
            <h1 style="font-size: 2.25rem; font-weight: 800; color: var(--color-text, #0f172a); margin: 0 0 0.5rem 0; line-height: 1.2;">
              Tiếp Cận Lâm Sàng & Phác Đồ CDSS
            </h1>
            <p style="color: var(--color-text-muted, #64748b); max-width: 800px; font-size: 0.95rem; margin: 0; line-height: 1.5;">
              Hệ thống sơ đồ phân nhánh ra quyết định lâm sàng (Decision-Support Flowcharts), chẩn đoán phân biệt triệu chứng, phát hiện Red Flags nguy hiểm và phác đồ can thiệp cấp cứu.
            </p>
          </div>
          <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
            <a href="#/approaches/cap-cuu" class="btn btn-primary" style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.65rem 1.2rem; background: #059669; color: #fff; border-radius: 0.5rem; text-decoration: none; font-weight: 700;">
              <i class="fa-solid fa-truck-medical"></i> Xử Trí Cấp Cứu
            </a>
            <a href="#/approaches/trieu-chung" class="btn btn-secondary" style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.65rem 1.2rem; background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); color: var(--color-text, #0f172a); border-radius: 0.5rem; text-decoration: none; font-weight: 700;">
              <i class="fa-solid fa-sitemap"></i> Tiếp Cận Triệu Chứng
            </a>
          </div>
        </div>
      </section>

      <!-- 4 SUB-MODULE GRID -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.25rem; margin-bottom: 2rem;">
        
        <div style="padding: 1.5rem; background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 0.75rem;">
          <div style="font-size: 1.75rem; margin-bottom: 0.5rem;">🚨</div>
          <h3 style="margin: 0 0 0.35rem 0; font-size: 1.1rem; font-weight: 700; color: var(--color-text, #0f172a);">1. Cấp Cứu Ban Đầu</h3>
          <p style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); line-height: 1.4; margin-bottom: 1rem;">
            Sốc mất máu, sốc phản vệ, hôn mê, co giật, suy hô hấp cấp và phù phổi cấp huyết động.
          </p>
          <a href="#/approaches/cap-cuu" style="color: #059669; font-weight: 700; font-size: 0.85rem; text-decoration: none;">Xem phác đồ <i class="fa-solid fa-arrow-right"></i></a>
        </div>

        <div style="padding: 1.5rem; background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 0.75rem;">
          <div style="font-size: 1.75rem; margin-bottom: 0.5rem;">🔍</div>
          <h3 style="margin: 0 0 0.35rem 0; font-size: 1.1rem; font-weight: 700; color: var(--color-text, #0f172a);">2. Tiếp Cận Triệu Chứng</h3>
          <p style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); line-height: 1.4; margin-bottom: 1rem;">
            Đau ngực, khó thở, đau bụng cấp, sốt kéo dài, phù toàn thân, vàng da và sụt cân không rõ nguyên nhân.
          </p>
          <a href="#/approaches/trieu-chung" style="color: #059669; font-weight: 700; font-size: 0.85rem; text-decoration: none;">Xem lưu đồ <i class="fa-solid fa-arrow-right"></i></a>
        </div>

        <div style="padding: 1.5rem; background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 0.75rem;">
          <div style="font-size: 1.75rem; margin-bottom: 0.5rem;">🧪</div>
          <h3 style="margin: 0 0 0.35rem 0; font-size: 1.1rem; font-weight: 700; color: var(--color-text, #0f172a);">3. Tiếp Cận Cận Lâm Sàng</h3>
          <p style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); line-height: 1.4; margin-bottom: 1rem;">
            Toan kiềm khí máu động mạch (ABG), rối loạn Natri/Kali, thiếu máu hồng cầu nhỏ và tổn thương thận cấp.
          </p>
          <a href="#/approaches/can-lam-sang" style="color: #059669; font-weight: 700; font-size: 0.85rem; text-decoration: none;">Xem phân tích <i class="fa-solid fa-arrow-right"></i></a>
        </div>

        <div style="padding: 1.5rem; background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 0.75rem;">
          <div style="font-size: 1.75rem; margin-bottom: 0.5rem;">🏥</div>
          <h3 style="margin: 0 0 0.35rem 0; font-size: 1.1rem; font-weight: 700; color: var(--color-text, #0f172a);">4. Bệnh Lý Chuyên Khoa</h3>
          <p style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); line-height: 1.4; margin-bottom: 1rem;">
            Hội chứng mạch vành cấp, Đột quỵ thiếu máu não cấp, Đợt cấp COPD và Nhiễm khuẩn huyết (Sepsis).
          </p>
          <a href="#/approaches/benh-ly" style="color: #059669; font-weight: 700; font-size: 0.85rem; text-decoration: none;">Xem hướng dẫn <i class="fa-solid fa-arrow-right"></i></a>
        </div>

      </div>

      <!-- SYMPTOM MATRIX INTERACTIVE WIDGET -->
      <section style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 1rem; padding: 1.5rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.25rem;">
          <div>
            <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--color-text, #0f172a); margin: 0 0 0.25rem 0;">
              ⚡ Ma Trận Phân Tích Triệu Chứng & Cảnh Báo Red Flags
            </h2>
            <p style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); margin: 0;">
              Chọn triệu chứng chính để trích xuất ngay cờ đỏ báo động và chẩn đoán phân biệt cần loại trừ:
            </p>
          </div>
          <select id="symptomSelect" style="padding: 0.5rem 1rem; font-size: 0.9rem; font-weight: 600; border: 1px solid var(--color-border, #e2e8f0); border-radius: 0.5rem; background: var(--color-surface-offset, #f8fafc); color: var(--color-text, #0f172a); outline: none;">
            <option value="sot">🤒 Sốt (Fever)</option>
            <option value="daunguc">💔 Đau ngực cấp (Chest Pain)</option>
            <option value="khotho">🫁 Khó thở cấp (Dyspnea)</option>
            <option value="daubung">🤢 Đau bụng cấp (Acute Abdomen)</option>
            <option value="daudau">🧠 Đau đầu dữ dội (Headache)</option>
            <option value="phu">💧 Phù toàn thân (Edema)</option>
          </select>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem;">
          <div style="padding: 1.25rem; background: #fef2f2; border: 1px solid #fee2e2; border-radius: 0.75rem;">
            <h4 style="margin: 0 0 0.75rem 0; color: #dc2626; font-size: 0.95rem; font-weight: 700; display: flex; align-items: center; gap: 0.4rem;">
              <i class="fa-solid fa-triangle-exclamation"></i> Cờ Đỏ Báo Động (Red Flags)
            </h4>
            <ul id="redFlagsList" style="margin: 0; padding-left: 1.25rem; font-size: 0.85rem; color: #991b1b; line-height: 1.5;"></ul>
          </div>

          <div style="padding: 1.25rem; background: var(--color-surface-offset, #f8fafc); border: 1px solid var(--color-border, #e2e8f0); border-radius: 0.75rem;">
            <h4 style="margin: 0 0 0.75rem 0; color: var(--color-primary, #0284c7); font-size: 0.95rem; font-weight: 700; display: flex; align-items: center; gap: 0.4rem;">
              <i class="fa-solid fa-list-check"></i> Chẩn Đoán Phân Biệt Hàng Đầu
            </h4>
            <ul id="diffDiagList" style="margin: 0 0 1rem 0; padding-left: 1.25rem; font-size: 0.85rem; color: var(--color-text, #0f172a); line-height: 1.5;"></ul>
            <div style="padding-top: 0.75rem; border-top: 1px dashed var(--color-border, #e2e8f0); display: flex; justify-content: space-between; align-items: center;">
              <span id="symptomActionText" style="font-size: 0.8rem; font-weight: 600; color: var(--color-text-muted, #64748b);"></span>
              <a id="symptomActionBtn" href="#" class="btn btn-primary btn-sm" style="padding: 0.35rem 0.85rem; font-size: 0.8rem; border-radius: 0.35rem; text-decoration: none; background: #059669; color: #fff; font-weight: 700;">
                Mở Lưu Đồ Chi Tiết <i class="fa-solid fa-chevron-right"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  `;
}
