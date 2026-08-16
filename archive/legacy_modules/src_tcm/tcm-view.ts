/**
 * CliniPortal 2.0 — Traditional Chinese Medicine (TCM) SPA Hub View
 * Path: src/content/tcm/tcm-view.ts
 */

import '../../../css/components/y-hoc-co-truyen.css';
import '../../../css/components/dong-tay-y-bridge.css';
import '../../../css/components/duoc-thao-database.css';

export function renderTcmView(): string {
  return `
    <div class="tcm-hub-page-wrapper" style="width: 100%; max-width: 1520px; margin: 0 auto; padding-bottom: 2.5rem;">
      
      <!-- BREADCRUMB -->
      <div class="breadcrumb" style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); margin-bottom: 1rem;">
        <a href="#/" style="color: inherit; text-decoration: none;">🏠 Trang chủ</a> &nbsp;/&nbsp; 
        <span style="color: var(--color-primary, #0284c7); font-weight: 600;">Y học Cổ truyền & Đông Tây Y Kết Hợp</span>
      </div>

      <!-- HERO BANNER -->
      <section style="background: linear-gradient(135deg, rgba(20,184,166,0.12) 0%, rgba(217,119,6,0.08) 100%), var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 1rem; padding: 2rem; margin-bottom: 1.75rem;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem;">
          <div>
            <span style="display: inline-flex; align-items: center; gap: 0.4rem; font-size: 0.75rem; font-weight: 700; color: #0d9488; text-transform: uppercase; background: #ccfbf1; padding: 0.2rem 0.6rem; border-radius: 0.35rem; margin-bottom: 0.5rem;">
              ☯ LÝ LUẬN ĐÔNG Y • KINH LẠC • DƯỢC VỊ & BÁT CƯƠNG
            </span>
            <h1 style="font-size: 2.25rem; font-weight: 800; color: var(--color-text, #0f172a); margin: 0 0 0.5rem 0; line-height: 1.2;">
              Y Học Cổ Truyền & Đông Tây Y Kết Hợp
            </h1>
            <p style="color: var(--color-text-muted, #64748b); max-width: 800px; font-size: 0.95rem; margin: 0; line-height: 1.5;">
              Hệ thống học thuyết Âm Dương - Ngũ Hành, Tạng Tượng, Bát Cương biện chứng, sơ đồ 12 đường Kinh Lạc, Tý Ngọ Lưu Chú và kho Dược liệu Phương thang chuẩn mực.
            </p>
          </div>
          <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
            <a href="#/tcm/duoc-lieu" class="btn btn-primary" style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.65rem 1.2rem; background: #0d9488; color: #fff; border-radius: 0.5rem; text-decoration: none; font-weight: 700;">
              <i class="fa-solid fa-leaf"></i> Tra Cứu Dược Liệu
            </a>
            <a href="#/tcm/dong-tay-y-bridge" class="btn btn-secondary" style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.65rem 1.2rem; background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); color: var(--color-text, #0f172a); border-radius: 0.5rem; text-decoration: none; font-weight: 700;">
              <i class="fa-solid fa-bridge"></i> Cầu Nối Đông - Tây Y
            </a>
          </div>
        </div>
      </section>

      <!-- 2 COLUMN LAYOUT (MERIDIAN CLOCK + HERB SPOTLIGHT) -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 2rem;">
        
        <!-- Meridian Clock Widget -->
        <section style="padding: 1.5rem; background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 0.75rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <h3 style="margin: 0; font-size: 1.1rem; font-weight: 700; color: var(--color-text, #0f172a); display: flex; align-items: center; gap: 0.5rem;">
              ⏰ Đồng Hồ Sinh Học Kinh Lạc (Tý Ngọ Lưu Chú)
            </h3>
            <span id="clockCurrentTime" style="font-size: 0.75rem; color: var(--color-text-muted, #64748b);"></span>
          </div>

          <div style="display: flex; flex-direction: column; align-items: center; gap: 1rem;">
            <div id="meridianWheel" style="position: relative; width: 240px; height: 240px; border-radius: 50%; border: 2px dashed var(--color-border, #e2e8f0); margin: 0 auto; display: flex; align-items: center; justify-content: center;">
              <div id="meridianCenter" style="text-align: center; z-index: 2;">
                <span id="centerStatus" style="font-size: 0.7rem; color: var(--color-text-muted, #64748b); display: block;">Đang chạy</span>
                <strong id="centerMeridianName" style="font-size: 1rem; color: #0d9488;">Đế Vương</strong>
                <span id="centerMeridianTime" style="font-size: 0.75rem; color: var(--color-text-muted, #64748b); display: block;">11h - 13h</span>
              </div>
            </div>

            <div id="meridianDetailsCard" style="width: 100%; padding: 1rem; background: var(--color-surface-offset, #f8fafc); border-radius: 0.5rem; border: 1px solid var(--color-border, #e2e8f0);">
              <!-- Populated by initMeridianClock -->
            </div>
          </div>
        </section>

        <!-- Herb Spotlight -->
        <section style="padding: 1.5rem; background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 0.75rem;">
          <h3 style="margin: 0 0 1rem 0; font-size: 1.1rem; font-weight: 700; color: var(--color-text, #0f172a); display: flex; align-items: center; gap: 0.5rem;">
            🌿 Tiêu Điểm Dược Liệu Quý (Herb Spotlight)
          </h3>

          <div id="herbTabs" style="display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 1rem;">
            <button type="button" class="herb-tab-btn active" data-herb="nhansam" style="padding: 0.35rem 0.75rem; border-radius: 0.35rem; border: 1px solid var(--color-border, #e2e8f0); background: var(--color-surface-offset, #f1f5f9); font-size: 0.8rem; font-weight: 600; cursor: pointer;">Nhân Sâm</button>
            <button type="button" class="herb-tab-btn" data-herb="hoangky" style="padding: 0.35rem 0.75rem; border-radius: 0.35rem; border: 1px solid var(--color-border, #e2e8f0); background: var(--color-surface-offset, #f1f5f9); font-size: 0.8rem; font-weight: 600; cursor: pointer;">Hoàng Kỳ</button>
            <button type="button" class="herb-tab-btn" data-herb="duongquy" style="padding: 0.35rem 0.75rem; border-radius: 0.35rem; border: 1px solid var(--color-border, #e2e8f0); background: var(--color-surface-offset, #f1f5f9); font-size: 0.8rem; font-weight: 600; cursor: pointer;">Đương Quy</button>
            <button type="button" class="herb-tab-btn" data-herb="thucdia" style="padding: 0.35rem 0.75rem; border-radius: 0.35rem; border: 1px solid var(--color-border, #e2e8f0); background: var(--color-surface-offset, #f1f5f9); font-size: 0.8rem; font-weight: 600; cursor: pointer;">Thục Địa</button>
            <button type="button" class="herb-tab-btn" data-herb="bachthuoc" style="padding: 0.35rem 0.75rem; border-radius: 0.35rem; border: 1px solid var(--color-border, #e2e8f0); background: var(--color-surface-offset, #f1f5f9); font-size: 0.8rem; font-weight: 600; cursor: pointer;">Bạch Thược</button>
          </div>

          <div id="herbContentPanel" style="padding: 1.25rem; background: var(--color-surface-offset, #f8fafc); border-radius: 0.5rem; border: 1px solid var(--color-border, #e2e8f0);">
            <!-- Populated by initHerbSpotlight -->
          </div>
        </section>

      </div>

    </div>
  `;
}
