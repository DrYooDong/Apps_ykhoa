/**
 * CliniPortal 2.0 — Pathophysiology & Physiology SPA Hub View
 * Path: src/content/pathophysiology/pathophysiology-view.ts
 */

import '../../../css/components/physio-content.css';
import '../../../css/components/formula-vault.css';

export function renderPathophysiologyView(subView: 'all' | 'gp-sl' | 'ccbs-slb' = 'all'): string {
  return `
    <div class="physio-hub-page-wrapper" style="width: 100%; max-width: 1520px; margin: 0 auto; padding-bottom: 2.5rem;">
      
      <!-- BREADCRUMB -->
      <div class="breadcrumb" style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); margin-bottom: 1rem;">
        <a href="#/" style="color: inherit; text-decoration: none;">🏠 Trang chủ</a> &nbsp;/&nbsp; 
        <span style="color: var(--color-primary, #0284c7); font-weight: 600;">Cơ sở Y khoa (Giải phẫu, Sinh lý & Bệnh sinh)</span>
      </div>

      <!-- HERO BANNER -->
      <section style="background: linear-gradient(135deg, rgba(139,92,246,0.12) 0%, rgba(2,132,199,0.08) 100%), var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 1rem; padding: 2rem; margin-bottom: 1.75rem;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem;">
          <div>
            <span style="display: inline-flex; align-items: center; gap: 0.4rem; font-size: 0.75rem; font-weight: 700; color: #7c3aed; text-transform: uppercase; background: #faf5ff; padding: 0.2rem 0.6rem; border-radius: 0.35rem; margin-bottom: 0.5rem;">
              🧬 GIẢI PHẪU • SINH LÝ HỌC • CƠ CHẾ BỆNH SINH
            </span>
            <h1 style="font-size: 2.25rem; font-weight: 800; color: var(--color-text, #0f172a); margin: 0 0 0.5rem 0; line-height: 1.2;">
              Cơ Sở Y Khoa & Cơ Chế Bệnh Sinh
            </h1>
            <p style="color: var(--color-text-muted, #64748b); max-width: 800px; font-size: 0.95rem; margin: 0; line-height: 1.5;">
              Nền tảng sinh lý học hệ thống, điện thế màng tế bào, huyết động học tim mạch, cơ chế bệnh sinh phân tử và kho công thức sinh lý học tương tác (Formula Vault).
            </p>
          </div>
          <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
            <a href="#/pathophysiology/giai-phau-sinh-ly" class="btn btn-primary" style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.65rem 1.2rem; background: #7c3aed; color: #fff; border-radius: 0.5rem; text-decoration: none; font-weight: 700;">
              <i class="fa-solid fa-dna"></i> GP - Sinh Lý Học
            </a>
            <a href="#/pathophysiology/co-che-benh-sinh" class="btn btn-secondary" style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.65rem 1.2rem; background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); color: var(--color-text, #0f172a); border-radius: 0.5rem; text-decoration: none; font-weight: 700;">
              <i class="fa-solid fa-microscope"></i> CCBS - Sinh Lý Bệnh
            </a>
          </div>
        </div>
      </section>

      <!-- 2 MAIN CORE PILLARS -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 2rem;">
        
        <!-- Pillar 1: GP-SL -->
        <div style="padding: 1.5rem; background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 0.75rem;">
          <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem;">
            <div style="width: 44px; height: 44px; border-radius: 0.5rem; background: #faf5ff; color: #7c3aed; display: flex; align-items: center; justify-content: center; font-size: 1.25rem;">
              <i class="fa-solid fa-dna"></i>
            </div>
            <div>
              <h3 style="margin: 0; font-size: 1.15rem; font-weight: 700; color: var(--color-text, #0f172a);">1. Giải Phẫu & Sinh Lý Học</h3>
              <span style="font-size: 0.75rem; color: var(--color-text-muted, #64748b);">Sinh lý tế bào, Tim mạch, Hô hấp, Thận, Nội tiết, Thần kinh</span>
            </div>
          </div>
          <p style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); line-height: 1.5; margin-bottom: 1rem;">
            Điện sinh lý học màng tế bào, chu chuyển tim, cơ chế điều hòa huyết áp, trao đổi khí phế nang - mao mạch, tái hấp thu ống thận và trục nội tiết dưới đồi - tuyến yên.
          </p>
          <a href="#/pathophysiology/giai-phau-sinh-ly" style="color: #7c3aed; font-weight: 700; font-size: 0.85rem; text-decoration: none; display: inline-flex; align-items: center; gap: 0.35rem;">
            Khám phá Giải phẫu & Sinh lý <i class="fa-solid fa-arrow-right"></i>
          </a>
        </div>

        <!-- Pillar 2: CCBS-SLB -->
        <div style="padding: 1.5rem; background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 0.75rem;">
          <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem;">
            <div style="width: 44px; height: 44px; border-radius: 0.5rem; background: #fef2f2; color: #dc2626; display: flex; align-items: center; justify-content: center; font-size: 1.25rem;">
              <i class="fa-solid fa-microscope"></i>
            </div>
            <div>
              <h3 style="margin: 0; font-size: 1.15rem; font-weight: 700; color: var(--color-text, #0f172a);">2. Cơ Chế Bệnh Sinh & SLB</h3>
              <span style="font-size: 0.75rem; color: var(--color-text-muted, #64748b);">Sinh lý bệnh sốt, Viêm, Sốc, Suy tim, Suy hô hấp, Xơ vữa ĐM</span>
            </div>
          </div>
          <p style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); line-height: 1.5; margin-bottom: 1rem;">
            Cơ chế bệnh sinh mảng xơ vữa không ổn định, bệnh sinh sốc nhiễm khuẩn (Sepsis cascade), bão Cytokine, cơ chế phù, toan chuyển hóa và đáp ứng stress.
          </p>
          <a href="#/pathophysiology/co-che-benh-sinh" style="color: #dc2626; font-weight: 700; font-size: 0.85rem; text-decoration: none; display: inline-flex; align-items: center; gap: 0.35rem;">
            Khám phá Cơ chế bệnh sinh <i class="fa-solid fa-arrow-right"></i>
          </a>
        </div>

      </div>

      <!-- FORMULA VAULT QUICK LINK -->
      <section style="padding: 1.5rem; background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 0.75rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
        <div>
          <h3 style="font-size: 1.1rem; font-weight: 700; color: var(--color-text, #0f172a); margin: 0 0 0.25rem 0;">
            📐 Kho Công Thức Sinh Lý Học (Formula Vault)
          </h3>
          <p style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); margin: 0;">
            Tính toán Cung lượng tim (Fick), Phân suất tống máu (EF), Gradient A-a O2, Độ thanh thải Creatinine và Khoảng trống Anion (Anion Gap).
          </p>
        </div>
        <a href="#/pathophysiology/formula-vault" class="btn btn-secondary" style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.6rem 1.1rem; background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); color: var(--color-text, #0f172a); border-radius: 0.5rem; text-decoration: none; font-weight: 700;">
          Mở Kho Công Thức <i class="fa-solid fa-arrow-right"></i>
        </a>
      </section>

    </div>
  `;
}
