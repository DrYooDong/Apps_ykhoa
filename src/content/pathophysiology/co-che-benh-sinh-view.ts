/**
 * CliniPortal — Pathophysiology & Disease Mechanisms SPA View (TypeScript)
 * Path: src/content/pathophysiology/co-che-benh-sinh-view.ts
 */

export function renderCoCheBenhSinhView(): string {
  const cases = [
    { slug: 'slb-ccbs-acs', title: 'Hội Chứng Vành Cấp (ACS & STEMI/NSTEMI)', spec: 'cardio', desc: 'Nứt vỡ mảng xơ vữa, hình thành huyết khối tiểu cầu và hoại tử tế bào cơ tim.' },
    { slug: 'slb-ccbs-st', title: 'Suy Tim Phân Suất Tống Máu Giảm (HFrEF)', spec: 'cardio', desc: 'Tái cấu trúc thất trái, hoạt hóa quá mức hệ giao cảm & RAAS và stress oxy hóa.' },
    { slug: 'slb-ccbs-tha', title: 'Tăng Huyết Áp Nguyên Phát (Essential HTN)', spec: 'cardio', desc: 'Tăng sức cản mạch máu ngoại vi, tái hấp thu muối natri và rối loạn nội mô.' },
    { slug: 'slb-ccbs-ccs', title: 'Hội Chứng Mạch Vành Mạn (CCS)', spec: 'cardio', desc: 'Mảng xơ vữa ổn định gây mất cân bằng cung - cầu oxy cơ tim khi gắng sức.' },
    
    { slug: 'slb-ccbs-suy-ho-hap', title: 'Suy Hô Hấp Cấp & ARDS (Berlin 2012)', spec: 'pulmo', desc: 'Tổn thương màng phế nang mao mạch lan tỏa, phù phổi không do tim và shunt nội phổi.' },
    { slug: 'slb-ccbs-copd', title: 'Bệnh Phổi Tắc Nghẽn Mạn Tính (COPD)', spec: 'pulmo', desc: 'Viêm đường thở mạn tính, khí phế thũng phá hủy vách phế nang và bẫy khí.' },
    { slug: 'slb-ccbs-henpq', title: 'Hen Phế Quản (Asthma Type 2 & Non-Type 2)', spec: 'pulmo', desc: 'Tăng phản ứng phế quản, co thắt cơ trơn phế quản qua trung gian IgE và Eosinophils.' },
    { slug: 'slb-ccbs-vp', title: 'Viêm Phổi Mắc Phải Cộng Đồng (CAP)', spec: 'pulmo', desc: 'Xâm nhập phế nang của vi khuẩn, phản ứng viêm đông đặc và suy giảm trao đổi khí.' },
    { slug: 'slb-ccbs-vtpq', title: 'Viêm Tiểu Phế Quản Cấp (RSV)', spec: 'pulmo', desc: 'Hoại tử biểu mô đường thở nhỏ, phù nề tắc nghẽn ở trẻ nhũ nhi.' },

    { slug: 'slb-ccbs-sepsis', title: 'Nhiễm Khuẩn Huyết & Sốc Nhiễm Khuẩn (Sepsis-3)', spec: 'icu', desc: 'Đáp ứng viêm toàn thân mất kiểm soát, rối loạn chức năng nội mô, giãn mạch và suy đa tạng.' },
    { slug: 'slb-ccbs-soc', title: 'Sinh Lý Bệnh Các Thể Sốc (Shock States)', spec: 'icu', desc: 'Giảm tưới máu mô toàn thân, toan lactic và suy sụp chuyển hóa tế bào.' },

    { slug: 'slb-ccbs-aki', title: 'Tổn Thương Thận Cấp (AKI)', spec: 'renal', desc: 'Thiếu máu cục bộ vi mạch thận, hoại tử ống thận cấp (ATN) và tắc nghẽn ống thận.' },
    { slug: 'slb-ccbs-ckd', title: 'Bệnh Thận Mạn (CKD Progression)', spec: 'renal', desc: 'Xơ hóa cầu thận tiến triển, quá tải lọc ở nephron còn lại và hội chứng ure máu cao.' },

    { slug: 'slb-ccbs-dot-quy', title: 'Đột Quỵ Não Thiếu Máu Cục Bộ Cấp', spec: 'neuro', desc: 'Vùng thiếu máu trung tâm, vùng tranh tối tranh sáng (Penumbra) và nhiễm độc kích thích Glutamate.' },

    { slug: 'slb-ccbs-dtd', title: 'Đái Tháo Đường Típ 2 & Đề Kháng Insulin', spec: 'endo', desc: 'Suy giảm chức năng tế bào beta tụy, đề kháng insulin mô đích và biến chứng mạch máu.' },

    { slug: 'slb-ccbs-xhth-tren', title: 'Xuất Huyết Tiêu Hóa Trên (UGIB)', spec: 'gi', desc: 'Vỡ giãn tĩnh mạch thực quản do tăng áp lực tĩnh mạch cửa & Loét dạ dày tá tràng.' },
    { slug: 'slb-ccbs-xhth-duoi', title: 'Xuất Huyết Tiêu Hóa Dưới (LGIB)', spec: 'gi', desc: 'Chảy máu túi thừa đại tràng, loạn sản mạch máu và viêm đại tràng thiếu máu cục bộ.' },
    { slug: 'slb-ccbs-xg', title: 'Xơ Gan & Tăng Áp Lực Tĩnh Mạch Cửa', spec: 'gi', desc: 'Hoạt hóa tế bào hình sao (Stellate Cells), xơ hóa khoảng Disse và tuần hoàn bàng hệ.' },
    { slug: 'slb-ccbs-vtc', title: 'Viêm Tụy Cấp (Acute Pancreatitis)', spec: 'gi', desc: 'Tự tiêu hủy mô tụy do hoạt hóa sớm men Trypsinogen, SIRS và biến chứng hoại tử tụy.' },
    { slug: 'slb-ccbs-gerd', title: 'Trào Ngược Dạ Dày Thực Quản (GERD)', spec: 'gi', desc: 'Giãn thoáng qua cơ thắt thực quản dưới (TLESR) và tổn thương biểu mô do acid/pepsin.' },
    { slug: 'slb-ccbs-ibd', title: 'Bệnh Viêm Ruột Mạn Tính (IBD - Crohn / UC)', spec: 'gi', desc: 'Rối loạn đáp ứng miễn dịch niêm mạc ruột với hệ vi sinh vật trên cơ địa di truyền.' },
    { slug: 'slb-ccbs-ibs', title: 'Hội Chứng Ruột Kích Thích (IBS)', spec: 'gi', desc: 'Rối loạn tương tác trục Não - Ruột (Gut-Brain Axis) và tăng nhạy cảm nội tạng.' },

    { slug: 'slb-ccbs-sxhd', title: 'Sốt Xuất Huyết Dengue (DHF / DSS)', spec: 'infect', desc: 'Thoát huyết tương ồ ạt do tăng tính thấm thành mạch qua trung gian Cytokine và NS1.' },
    { slug: 'slb-ccbs-sot-ret', title: 'Sốt Rét Ác Tính (Severe Malaria)', spec: 'infect', desc: 'Kết dính hồng cầu nhiễm KST sốt rét vào nội mô vi mạch (Cytoadherence) và tắc vi tuần hoàn.' },
    { slug: 'slb-ccbs-lao', title: 'Sinh Lý Bệnh Bệnh Lao (Mycobacterium tuberculosis)', spec: 'infect', desc: 'Hình thành u hạt (Granuloma), hoại tử bã đậu và đáp ứng miễn dịch qua trung gian tế bào.' },
    { slug: 'slb-ccbs-bach-hau', title: 'Bạch Hầu (Diphtheria Toxin Pathology)', spec: 'infect', desc: 'Ngoại độc tố ức chế tổng hợp protein tế bào, hình thành màng giả và biến chứng viêm cơ tim.' },

    { slug: 'slb-ccbs-hemophilia', title: 'Bệnh Ưa Chảy Máu (Hemophilia A/B)', spec: 'hema', desc: 'Thiếu hụt yếu tố đông máu VIII/IX làm suy sụp dòng thác đông máu nội sinh.' },
    { slug: 'slb-ccbs-tsg', title: 'Tiền Sản Giật (Preeclampsia)', spec: 'obgyn', desc: 'Tái tạo động mạch xoắn tử cung khiếm khuyết, giải phóng yếu tố kháng sinh mạch sFlt-1.' }
  ];

  const specNames: Record<string, string> = {
    cardio: 'Tim Mạch',
    pulmo: 'Hô Hấp',
    icu: 'Hồi Sức Cấp Cứu',
    renal: 'Thận Học',
    neuro: 'Thần Kinh',
    endo: 'Nội Tiết',
    gi: 'Tiêu Hóa',
    infect: 'Truyền Nhiễm',
    hema: 'Huyết Học',
    obgyn: 'Sản Phụ Khoa'
  };

  return `
    <div class="ccbs-spa-container animate-fade-in" style="max-width: 1440px; margin: 0 auto; padding: 1.5rem 1rem;">
      <!-- Breadcrumb & Header -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <div style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); margin-bottom: 0.25rem;">
            <a href="#/pathophysiology" style="color: var(--color-primary, #0284c7); text-decoration: none;"><i class="fa-solid fa-chevron-left"></i> Cơ Sở Y Khoa</a> / Cơ Chế Bệnh Sinh (CCBS)
          </div>
          <h1 style="font-size: 2rem; font-weight: 800; color: #059669; margin: 0; display: flex; align-items: center; gap: 0.75rem;">
            <i class="fa-solid fa-microscope"></i> Cơ Chế Bệnh Sinh & Sinh Lý Bệnh Lâm Sàng
          </h1>
          <p style="font-size: 0.95rem; color: var(--color-text-muted, #64748b); margin: 0.25rem 0 0 0;">
            Kho 29 ca phân tích cơ chế bệnh sinh phân tử, chuỗi bệnh lý căn nguyên và các đích can thiệp điều trị đích thực tế.
          </p>
        </div>
        
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <a href="#/pathophysiology/giai-phau-sinh-ly" class="btn btn-outline" style="padding: 0.6rem 1rem; border-radius: 8px; border: 1px solid var(--color-border, #e2e8f0); color: var(--color-text, #334155); text-decoration: none; font-size: 0.875rem; font-weight: 600; display: flex; align-items: center; gap: 0.5rem;">
            <i class="fa-solid fa-dna" style="color: #7c3aed;"></i> Giải Phẫu & Sinh Lý
          </a>
          <a href="#/pathophysiology/formula-vault" class="btn btn-outline" style="padding: 0.6rem 1rem; border-radius: 8px; border: 1px solid var(--color-border, #e2e8f0); color: var(--color-text, #334155); text-decoration: none; font-size: 0.875rem; font-weight: 600; display: flex; align-items: center; gap: 0.5rem;">
            <i class="fa-solid fa-calculator" style="color: #0284c7;"></i> Formula Vault
          </a>
        </div>
      </div>

      <!-- Quick Filter -->
      <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.25rem; margin-bottom: 1.5rem;">
        <div style="display: grid; grid-template-columns: 2fr 1fr auto; gap: 1rem; align-items: center;">
          <div style="position: relative;">
            <i class="fa-solid fa-magnifying-glass" style="position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: #94a3b8;"></i>
            <input type="text" id="ccbs-search-input" placeholder="Tìm kiếm bệnh lý cơ chế bệnh sinh (VD: Suy tim, ARDS, AKI, Sepsis, Đột quỵ...)..." style="width: 100%; padding: 0.75rem 1rem 0.75rem 2.5rem; border: 1px solid var(--color-border, #cbd5e1); border-radius: 8px; font-size: 0.95rem;" oninput="window.filterCcbsList()" />
          </div>

          <div>
            <select id="ccbs-spec-filter" style="width: 100%; padding: 0.75rem 1rem; border: 1px solid var(--color-border, #cbd5e1); border-radius: 8px; font-size: 0.9rem;" onchange="window.filterCcbsList()">
              <option value="all">Tất cả chuyên khoa</option>
              <option value="cardio">Tim Mạch</option>
              <option value="pulmo">Hô Hấp</option>
              <option value="icu">Hồi Sức Cấp Cứu</option>
              <option value="renal">Thận Học</option>
              <option value="neuro">Thần Kinh</option>
              <option value="endo">Nội Tiết</option>
              <option value="gi">Tiêu Hóa</option>
              <option value="infect">Truyền Nhiễm</option>
              <option value="hema">Huyết Học</option>
              <option value="obgyn">Sản Phụ Khoa</option>
            </select>
          </div>

          <div>
            <button onclick="window.resetCcbsFilters()" style="padding: 0.75rem 1.25rem; border-radius: 8px; font-weight: 600; border: none; background: #f1f5f9; color: #475569; cursor: pointer;">
              <i class="fa-solid fa-rotate-left"></i> Đặt lại
            </button>
          </div>
        </div>
      </div>

      <!-- 29 Cases Grid -->
      <div id="ccbs-cards-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 1.25rem;">
        ${cases.map(c => `
          <div class="ccbs-card" data-spec="${c.spec}" style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.25rem; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 1px 3px rgba(0,0,0,0.05); transition: all 0.2s;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                <span style="font-size: 0.75rem; font-weight: 700; color: #059669; background: #ecfdf5; padding: 0.2rem 0.5rem; border-radius: 4px; text-transform: uppercase;">
                  ${specNames[c.spec] || c.spec}
                </span>
                <span style="font-size: 0.75rem; color: #94a3b8;"><i class="fa-solid fa-dna"></i> Cơ chế bệnh sinh</span>
              </div>

              <h3 style="font-size: 1.1rem; font-weight: 700; color: var(--color-text, #0f172a); margin: 0 0 0.5rem 0; line-height: 1.4;">
                ${c.title}
              </h3>

              <p style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); line-height: 1.5; margin: 0 0 1rem 0;">
                ${c.desc}
              </p>
            </div>

            <div style="border-top: 1px solid var(--color-border, #f1f5f9); padding-top: 0.75rem; display: flex; justify-content: space-between; align-items: center;">
              <span style="font-size: 0.75rem; color: #64748b;">Sơ đồ chuỗi & Đích điều trị</span>
              <a href="#/pathophysiology/reader/${c.slug}" style="padding: 0.35rem 0.75rem; background: #059669; color: #fff; border-radius: 6px; text-decoration: none; font-size: 0.8rem; font-weight: 600;">
                Xem chi tiết <i class="fa-solid fa-arrow-right"></i>
              </a>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// Global Window Bindings
declare global {
  interface Window {
    filterCcbsList: () => void;
    resetCcbsFilters: () => void;
  }
}

if (typeof window !== 'undefined') {
  window.filterCcbsList = () => {
    const q = (document.getElementById('ccbs-search-input') as HTMLInputElement)?.value.toLowerCase().trim() || '';
    const spec = (document.getElementById('ccbs-spec-filter') as HTMLSelectElement)?.value || 'all';

    document.querySelectorAll('.ccbs-card').forEach(card => {
      const text = card.textContent?.toLowerCase() || '';
      const cardSpec = (card as HTMLElement).dataset.spec || 'all';

      const matchQ = !q || text.includes(q);
      const matchSpec = (spec === 'all' || cardSpec === spec);

      if (matchQ && matchSpec) {
        (card as HTMLElement).style.display = 'flex';
      } else {
        (card as HTMLElement).style.display = 'none';
      }
    });
  };

  window.resetCcbsFilters = () => {
    const searchInput = document.getElementById('ccbs-search-input') as HTMLInputElement;
    const specFilter = document.getElementById('ccbs-spec-filter') as HTMLSelectElement;

    if (searchInput) searchInput.value = '';
    if (specFilter) specFilter.value = 'all';

    window.filterCcbsList();
  };
}
