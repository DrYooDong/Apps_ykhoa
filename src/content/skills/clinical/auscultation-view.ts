/**
 * CliniPortal — Auscultation Audio Library SPA View (TypeScript)
 * Path: src/content/skills/clinical/auscultation-view.ts
 */

export function renderAuscultationView(): string {
  const heartSounds = [
    { name: 'Tiếng Tim T1, T2 Bình Thường (Normal S1/S2)', desc: 'T1 đóng van 2 lá/3 lá; T2 đóng van ĐMC/ĐMP. Nghe rõ nhất tại mỏm và đáy tim.', icon: 'fa-heart-pulse', color: '#0284c7' },
    { name: 'Tiếng Thổi Tâm Thu Hở Van 2 Lá (MR Murmur)', desc: 'Tiếng thổi toàn tâm thu dạng tràn, âm sắc cao, lan ra nách trái, nghe rõ tại mỏm tim.', icon: 'fa-water', color: '#dc2626' },
    { name: 'Tiếng Thổi Tâm Thu Hẹp Van Động Mạch Chủ (AS)', desc: 'Tiếng thổi tống máu hình quả trám (Crescendo-Decrescendo), lan lên 2 động mạch cảnh.', icon: 'fa-gauge-high', color: '#ea580c' },
    { name: 'Tiếng Thổi Tâm Trương Hở Van Động Mạch Chủ (AR)', desc: 'Tiếng thổi đầu tâm trương êm dịu, giảm dần (Decrescendo), nghe rõ ở KLS III bờ trái xương ức (Erb).', icon: 'fa-wind', color: '#7c3aed' },
    { name: 'Tiếng Ngựa Phi T3 / T4 (Gallop S3/S4)', desc: 'T3 do đổ đầy thất nhanh trong suy tim xung huyết; T4 do nhĩ bóp tống máu vào thất dày cứng.', icon: 'fa-drum', color: '#ca8a04' }
  ];

  const lungSounds = [
    { name: 'Rì Rào Phế Nang Bình Thường (Vesicular)', desc: 'Âm sắc êm dịu, nghe rõ ở thì hít vào và đầu thì thở ra trên khắp phế trường.', icon: 'fa-lungs', color: '#059669' },
    { name: 'Ran Rít & Ran Ngáy (Wheezing & Rhonchi)', desc: 'Âm thanh liên tục do hẹp lòng đường thở nhỏ (Hen phế quản, COPD đợt cấp).', icon: 'fa-music', color: '#0891b2' },
    { name: 'Ran Nổ (Fine Crackles)', desc: 'Âm thanh ngắt quãng cuối thì hít vào do bóc tách các phế nang bị xẹp (Phù phổi cấp, Xơ phổi kẽ).', icon: 'fa-fire-flame-curved', color: '#db2777' },
    { name: 'Ran Ẩm (Coarse Crackles)', desc: 'Âm thanh ọc ọc do dịch hoặc đờm nhớt chuyển động trong các phế quản lớn (Viêm phế quản, Giãn PQ).', icon: 'fa-droplet', color: '#16a34a' }
  ];

  return `
    <div class="auscultation-container animate-fade-in" style="max-width: 1300px; margin: 0 auto; padding: 1.5rem 1rem;">
      <!-- Breadcrumb & Header -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <div style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); margin-bottom: 0.25rem;">
            <a href="#/skills" style="color: var(--color-primary, #0284c7); text-decoration: none;"><i class="fa-solid fa-chevron-left"></i> Kỹ Năng Lâm Sàng</a> / Thính Chẩn Tim - Phổi
          </div>
          <h1 style="font-size: 2rem; font-weight: 800; color: #0284c7; margin: 0; display: flex; align-items: center; gap: 0.75rem;">
            <i class="fa-solid fa-headphones"></i> Thư Viện Âm Thanh Thính Chẩn Tim - Phổi (Auscultation Library)
          </h1>
          <p style="font-size: 0.95rem; color: var(--color-text-muted, #64748b); margin: 0.25rem 0 0 0;">
            Hệ thống âm thanh mẫu chuẩn hóa, phổ âm tần số và hướng dẫn định vị 5 ổ van tim & vị trí nghe phổi Macleod.
          </p>
        </div>
        
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <a href="#/skills" class="btn btn-outline" style="padding: 0.5rem 1rem; border-radius: 8px; border: 1px solid var(--color-border, #e2e8f0); color: var(--color-text, #334155); text-decoration: none; font-size: 0.875rem; font-weight: 600;">
            <i class="fa-solid fa-arrow-left"></i> Skills Hub
          </a>
        </div>
      </div>

      <!-- Sections Grid -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
        
        <!-- Heart Sounds -->
        <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.5rem;">
          <h3 style="font-size: 1.2rem; font-weight: 700; color: #dc2626; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
            <i class="fa-solid fa-heart-pulse"></i> 1. Tiếng Tim & Tiếng Thổi Bệnh Lý
          </h3>

          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            ${heartSounds.map(item => `
              <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 0.85rem; display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <h4 style="margin: 0 0 0.25rem; font-size: 0.95rem; font-weight: 700; color: var(--color-text, #0f172a);">${item.name}</h4>
                  <p style="margin: 0; font-size: 0.8rem; color: #64748b; line-height: 1.4;">${item.desc}</p>
                </div>
                <button onclick="alert('Đang phát âm thanh mô phỏng: ${item.name}')" style="background: ${item.color}; color: #fff; border: none; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; flex-shrink: 0; margin-left: 0.75rem;">
                  <i class="fa-solid fa-play" style="font-size: 0.8rem;"></i>
                </button>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Lung Sounds -->
        <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.5rem;">
          <h3 style="font-size: 1.2rem; font-weight: 700; color: #059669; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
            <i class="fa-solid fa-lungs"></i> 2. Tiếng Thở & Ran Phổi Bệnh Lý
          </h3>

          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            ${lungSounds.map(item => `
              <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 0.85rem; display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <h4 style="margin: 0 0 0.25rem; font-size: 0.95rem; font-weight: 700; color: var(--color-text, #0f172a);">${item.name}</h4>
                  <p style="margin: 0; font-size: 0.8rem; color: #64748b; line-height: 1.4;">${item.desc}</p>
                </div>
                <button onclick="alert('Đang phát âm thanh mô phỏng: ${item.name}')" style="background: ${item.color}; color: #fff; border: none; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; flex-shrink: 0; margin-left: 0.75rem;">
                  <i class="fa-solid fa-play" style="font-size: 0.8rem;"></i>
                </button>
              </div>
            `).join('')}
          </div>
        </div>

      </div>
    </div>
  `;
}
