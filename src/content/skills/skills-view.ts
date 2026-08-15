/**
 * CliniPortal 2.0 — Clinical Skills SPA Hub View
 * Path: src/content/skills/skills-view.ts
 */

import '../../../css/components/clinical-skill.css';
import '../../../css/components/skill-tracker.css';
import '../../../css/components/clinical-reasoning.css';
import '../../../css/components/virtual-patient.css';

export function renderSkillsView(): string {
  return `
    <div class="skills-hub-page-wrapper" style="width: 100%; max-width: 1520px; margin: 0 auto; padding-bottom: 2.5rem;">
      
      <!-- BREADCRUMB -->
      <div class="breadcrumb" style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); margin-bottom: 1rem;">
        <a href="#/" style="color: inherit; text-decoration: none;">🏠 Trang chủ</a> &nbsp;/&nbsp; 
        <span style="color: var(--color-primary, #0284c7); font-weight: 600;">Kỹ năng Lâm sàng & OSCE</span>
      </div>

      <!-- HERO BANNER -->
      <section class="skills-vipro-hero" style="background: linear-gradient(135deg, rgba(2,132,199,0.1) 0%, rgba(16,185,129,0.08) 100%), var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 1rem; padding: 2rem; margin-bottom: 1.75rem;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem;">
          <div>
            <span style="display: inline-flex; align-items: center; gap: 0.4rem; font-size: 0.75rem; font-weight: 700; color: var(--color-primary, #0284c7); text-transform: uppercase; background: var(--color-surface-offset, #f1f5f9); padding: 0.2rem 0.6rem; border-radius: 0.35rem; margin-bottom: 0.5rem;">
              🩺 BEDSIDE CLINICAL EXAMINATION & OSCE SIMULATOR
            </span>
            <h1 style="font-size: 2.25rem; font-weight: 800; color: var(--color-text, #0f172a); margin: 0 0 0.5rem 0; line-height: 1.2;">
              Kỹ Năng Lâm Sàng & Khám Bệnh Chuẩn
            </h1>
            <p style="color: var(--color-text-muted, #64748b); max-width: 800px; font-size: 0.95rem; margin: 0; line-height: 1.5;">
              Hệ thống hướng dẫn khám các cơ quan chi tiết, bảng kiểm bedside và triệu chứng học y khoa dựa trên tiêu chuẩn Macleod's Clinical Examination và các quy trình OSCE chuẩn.
            </p>
          </div>
          <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
            <a href="#/skills/benh-nhan-ao" class="btn btn-primary" style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.65rem 1.2rem; background: var(--color-primary, #0284c7); color: #fff; border-radius: 0.5rem; text-decoration: none; font-weight: 700;">
              <i class="fa-solid fa-user-doctor"></i> Bệnh Nhân Ảo
            </a>
            <a href="#/skills/osce-randomizer" class="btn btn-secondary" style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.65rem 1.2rem; background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); color: var(--color-text, #0f172a); border-radius: 0.5rem; text-decoration: none; font-weight: 700;">
              <i class="fa-solid fa-dice"></i> OSCE Randomizer
            </a>
          </div>
        </div>
      </section>

      <!-- 6 PHẦN KỸ NĂNG CHÍNH -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.25rem; margin-bottom: 2rem;">
        
        <div class="skill-category-card" style="padding: 1.5rem; background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 0.75rem;">
          <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem;">
            <div style="width: 44px; height: 44px; border-radius: 0.5rem; background: #e0f2fe; color: #0284c7; display: flex; align-items: center; justify-content: center; font-size: 1.25rem;">
              <i class="fa-solid fa-stethoscope"></i>
            </div>
            <div>
              <h3 style="margin: 0; font-size: 1.1rem; font-weight: 700; color: var(--color-text, #0f172a);">1. Khám Lâm Sàng Hệ Cơ Quan</h3>
              <span style="font-size: 0.75rem; color: var(--color-text-muted, #64748b);">Tim mạch, Hô hấp, Bụng, Thần kinh, Cơ xương khớp</span>
            </div>
          </div>
          <p style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); line-height: 1.5; margin-bottom: 1rem;">
            Quy trình 4 bước kinh điển Nhìn - Sờ - Gõ - Nghe, các nghiệm pháp đặc hiệu và đánh giá triệu chứng học tại giường bệnh.
          </p>
          <a href="#/skills/kham-lam-sang" style="color: var(--color-primary, #0284c7); font-weight: 700; font-size: 0.85rem; text-decoration: none; display: inline-flex; align-items: center; gap: 0.35rem;">
            Xem chi tiết bài khám <i class="fa-solid fa-arrow-right"></i>
          </a>
        </div>

        <div class="skill-category-card" style="padding: 1.5rem; background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 0.75rem;">
          <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem;">
            <div style="width: 44px; height: 44px; border-radius: 0.5rem; background: #fee2e2; color: #dc2626; display: flex; align-items: center; justify-content: center; font-size: 1.25rem;">
              <i class="fa-solid fa-kit-medical"></i>
            </div>
            <div>
              <h3 style="margin: 0; font-size: 1.1rem; font-weight: 700; color: var(--color-text, #0f172a);">2. Hồi Sức Cấp Cứu (ACLS/BLS)</h3>
              <span style="font-size: 0.75rem; color: var(--color-text-muted, #64748b);">Ngừng tuần hoàn, Sốc phản vệ, Khai thông đường thở</span>
            </div>
          </div>
          <p style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); line-height: 1.5; margin-bottom: 1rem;">
            Bảng kiểm ép tim ngoài lồng ngực, đặt nội khí quản khó, sốc điện khử rung và dùng thuốc hồi sinh tim phổi nâng cao.
          </p>
          <a href="#/skills/hoi-suc-cap-cuu" style="color: var(--color-primary, #0284c7); font-weight: 700; font-size: 0.85rem; text-decoration: none; display: inline-flex; align-items: center; gap: 0.35rem;">
            Xem phác đồ hồi sức <i class="fa-solid fa-arrow-right"></i>
          </a>
        </div>

        <div class="skill-category-card" style="padding: 1.5rem; background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 0.75rem;">
          <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem;">
            <div style="width: 44px; height: 44px; border-radius: 0.5rem; background: #fef3c7; color: #d97706; display: flex; align-items: center; justify-content: center; font-size: 1.25rem;">
              <i class="fa-solid fa-syringe"></i>
            </div>
            <div>
              <h3 style="margin: 0; font-size: 1.1rem; font-weight: 700; color: var(--color-text, #0f172a);">3. Thủ Thuật Lâm Sàng</h3>
              <span style="font-size: 0.75rem; color: var(--color-text-muted, #64748b);">Chọc dò tủy sống, màng phổi, màng bụng, catheter TM trung tâm</span>
            </div>
          </div>
          <p style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); line-height: 1.5; margin-bottom: 1rem;">
            Chỉ định, chống chỉ định, chuẩn bị dụng cụ, các mốc giải phẫu an toàn và xử trí tai biến thủ thuật.
          </p>
          <a href="#/skills/thu-thuat" style="color: var(--color-primary, #0284c7); font-weight: 700; font-size: 0.85rem; text-decoration: none; display: inline-flex; align-items: center; gap: 0.35rem;">
            Xem bảng kiểm thủ thuật <i class="fa-solid fa-arrow-right"></i>
          </a>
        </div>

      </div>

      <!-- CRANIAL NERVES INTERACTIVE WIDGET -->
      <section style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 1rem; padding: 1.5rem; margin-bottom: 2rem;">
        <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--color-text, #0f172a); margin: 0 0 0.5rem 0; display: flex; align-items: center; gap: 0.5rem;">
          🧠 Tra Cứu & Khám 12 Đôi Dây Thần Kinh Sọ
        </h2>
        <p style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); margin: 0 0 1.25rem 0;">
          Chọn từng đôi dây thần kinh để xem phân loại chức năng, kỹ thuật khám và dấu hiệu tổn thương bệnh lý.
        </p>

        <!-- Nerve Selector Pills -->
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.25rem;">
          <button type="button" class="nerve-btn active" data-nerve="cn1" style="padding: 0.45rem 0.85rem; border-radius: 0.5rem; border: 1px solid var(--color-border, #e2e8f0); background: var(--color-surface-offset, #f1f5f9); font-weight: 600; font-size: 0.8rem; cursor: pointer;">CN I (Khứu)</button>
          <button type="button" class="nerve-btn" data-nerve="cn2" style="padding: 0.45rem 0.85rem; border-radius: 0.5rem; border: 1px solid var(--color-border, #e2e8f0); background: var(--color-surface-offset, #f1f5f9); font-weight: 600; font-size: 0.8rem; cursor: pointer;">CN II (Thị)</button>
          <button type="button" class="nerve-btn" data-nerve="cn3" style="padding: 0.45rem 0.85rem; border-radius: 0.5rem; border: 1px solid var(--color-border, #e2e8f0); background: var(--color-surface-offset, #f1f5f9); font-weight: 600; font-size: 0.8rem; cursor: pointer;">CN III (Vận nhãn)</button>
          <button type="button" class="nerve-btn" data-nerve="cn4" style="padding: 0.45rem 0.85rem; border-radius: 0.5rem; border: 1px solid var(--color-border, #e2e8f0); background: var(--color-surface-offset, #f1f5f9); font-weight: 600; font-size: 0.8rem; cursor: pointer;">CN IV (Ròng rọc)</button>
          <button type="button" class="nerve-btn" data-nerve="cn5" style="padding: 0.45rem 0.85rem; border-radius: 0.5rem; border: 1px solid var(--color-border, #e2e8f0); background: var(--color-surface-offset, #f1f5f9); font-weight: 600; font-size: 0.8rem; cursor: pointer;">CN V (Tam ba)</button>
          <button type="button" class="nerve-btn" data-nerve="cn6" style="padding: 0.45rem 0.85rem; border-radius: 0.5rem; border: 1px solid var(--color-border, #e2e8f0); background: var(--color-surface-offset, #f1f5f9); font-weight: 600; font-size: 0.8rem; cursor: pointer;">CN VI (Vận nhãn ngoài)</button>
          <button type="button" class="nerve-btn" data-nerve="cn7" style="padding: 0.45rem 0.85rem; border-radius: 0.5rem; border: 1px solid var(--color-border, #e2e8f0); background: var(--color-surface-offset, #f1f5f9); font-weight: 600; font-size: 0.8rem; cursor: pointer;">CN VII (Mặt)</button>
          <button type="button" class="nerve-btn" data-nerve="cn8" style="padding: 0.45rem 0.85rem; border-radius: 0.5rem; border: 1px solid var(--color-border, #e2e8f0); background: var(--color-surface-offset, #f1f5f9); font-weight: 600; font-size: 0.8rem; cursor: pointer;">CN VIII (Tiền đình)</button>
          <button type="button" class="nerve-btn" data-nerve="cn9" style="padding: 0.45rem 0.85rem; border-radius: 0.5rem; border: 1px solid var(--color-border, #e2e8f0); background: var(--color-surface-offset, #f1f5f9); font-weight: 600; font-size: 0.8rem; cursor: pointer;">CN IX (Thiệt hầu)</button>
          <button type="button" class="nerve-btn" data-nerve="cn10" style="padding: 0.45rem 0.85rem; border-radius: 0.5rem; border: 1px solid var(--color-border, #e2e8f0); background: var(--color-surface-offset, #f1f5f9); font-weight: 600; font-size: 0.8rem; cursor: pointer;">CN X (Mê tẩu)</button>
          <button type="button" class="nerve-btn" data-nerve="cn11" style="padding: 0.45rem 0.85rem; border-radius: 0.5rem; border: 1px solid var(--color-border, #e2e8f0); background: var(--color-surface-offset, #f1f5f9); font-weight: 600; font-size: 0.8rem; cursor: pointer;">CN XI (Phụ)</button>
          <button type="button" class="nerve-btn" data-nerve="cn12" style="padding: 0.45rem 0.85rem; border-radius: 0.5rem; border: 1px solid var(--color-border, #e2e8f0); background: var(--color-surface-offset, #f1f5f9); font-weight: 600; font-size: 0.8rem; cursor: pointer;">CN XII (Hạ thiệt)</button>
        </div>

        <!-- Detail Card -->
        <div id="nerveDetailsCard" style="padding: 1.25rem; background: var(--color-surface-offset, #f8fafc); border: 1px solid var(--color-border, #e2e8f0); border-radius: 0.75rem;">
          <!-- Populated by initCranialNervesWidget -->
        </div>
      </section>

    </div>
  `;
}
