/**
 * CliniPortal — Anatomy & Physiology Hub SPA View (TypeScript)
 * Path: src/content/pathophysiology/giai-phau-sinh-ly-view.ts
 */

export function renderGiaiPhauSinhLyView(): string {
  const parts = [
    {
      id: 'part1',
      title: 'Phần 1: Sinh Lý Tế Bào & Đại Cương',
      icon: 'fa-dna',
      color: '#7c3aed',
      lessons: [
        { slug: 'part1/sl-tb-daicuong-tb', title: 'Đại Cương Sinh Lý Tế Bào & Cân Bằng Nội Môi' },
        { slug: 'part1/sl-tb-mangtebao', title: 'Màng Tế Bào & Cơ Chế Vận Chuyển Vật Chất' },
        { slug: 'part1/sl-tb-diensinhly', title: 'Điện Sinh Lý Học & Điện Thế Hoạt Động (Action Potential)' }
      ]
    },
    {
      id: 'part2',
      title: 'Phần 2: Sinh Lý Học Thần Kinh & Cơ',
      icon: 'fa-brain',
      color: '#c026d3',
      lessons: [
        { slug: 'part2/sl-synapse', title: 'Dẫn Truyền Synapse & Chất Truyền Đạt Thần Kinh' },
        { slug: 'part2/sl-coxuong', title: 'Sinh Lý Co Cơ Xương & Khớp Thần Kinh Cơ (NMJ)' },
        { slug: 'part2/sl-cotron-cotim', title: 'Sinh Lý Co Cơ Trơn & Cơ Tim' },
        { slug: 'part2/sl-tuygai', title: 'Chức Năng Phản Xạ & Dẫn Truyền Của Tủy Gai' },
        { slug: 'part2/sl-thannao-tieunao-hachnen', title: 'Thân Não, Tiểu Não & Các Hạch Nền Não' },
        { slug: 'part2/sl-thankinh-tuchu', title: 'Hệ Thần Kinh Tự Chủ (Giao Cảm & Đối Giao Cảm)' },
        { slug: 'part2/sl-vonao-chucnangtkcaocap', title: 'Vỏ Não & Chức Năng Thần Kinh Cao Cấp' }
      ]
    },
    {
      id: 'part3',
      title: 'Phần 3: Sinh Lý Hệ Máu & Miễn Dịch',
      icon: 'fa-droplet',
      color: '#dc2626',
      lessons: [
        { slug: 'part3/sl-hemau-huyethoc', title: 'Đại Cương Máu & Thành Phần Huyết Tương' },
        { slug: 'part3/sl-hongcau', title: 'Hồng Cầu, Hemoglobin & Chuyển Hóa Sắt' },
        { slug: 'part3/sl-bachcau-mien-dich', title: 'Bạch Cầu & Cơ Chế Miễn Dịch (Tự Nhiên & Thích Ứng)' },
        { slug: 'part3/sl-tieucaucammau', title: 'Tiểu Cầu & Quá Trình Cầm Máu - Đông Máu' },
        { slug: 'part3/sl-nhommau-truyenmau', title: 'Nhóm Máu Hệ ABO, Rh & Nguyên Tắc Truyền Máu' }
      ]
    },
    {
      id: 'part4',
      title: 'Phần 4: Sinh Lý Tim Mạch & Hô Hấp',
      icon: 'fa-heart-pulse',
      color: '#e11d48',
      lessons: [
        { slug: 'part4/sl-cotim-hoatdongdien', title: 'Hoạt Động Điện Của Cơ Tim & Hệ Thống Dẫn Truyền' },
        { slug: 'part4/sl-cktim-cungluongtim', title: 'Chu Chuyển Tim & Điều Hòa Cung Lượng Tim (CO)' },
        { slug: 'part4/sl-hemach-dieuhoaha', title: 'Sinh Lý Hệ Mạch & Cơ Chế Điều Hòa Huyết Áp' },
        { slug: 'part4/sl-cohohap-thongkhi', title: 'Cơ Học Hô Hấp & Thông Khí Phổi' },
        { slug: 'part4/sl-traodoikhi', title: 'Trao Đổi Khí Tại Phổi & Màng Phế Nang - Mao Mạch' },
        { slug: 'part4/sl-vanchuyen-dieuhoahh', title: 'Vận Chuyển Khí Trong Máu & Điều Hòa Hô Hấp' }
      ]
    },
    {
      id: 'part5',
      title: 'Phần 5: Sinh Lý Tiêu Hóa & Chuyển Hóa Năng Lượng',
      icon: 'fa-utensils',
      color: '#ca8a04',
      lessons: [
        { slug: 'part5/sl-th-mieng-tq', title: 'Tiêu Hóa Ở Miệng & Thực Quản' },
        { slug: 'part5/sl-th-daday', title: 'Tiêu Hóa Ở Dạ Dày & Cơ Chế Tiết Acid HCl' },
        { slug: 'part5/sl-th-gantuy', title: 'Chức Năng Tiêu Hóa & Chuyển Hóa Của Gan - Tụy' },
        { slug: 'part5/sl-th-ruotnon', title: 'Tiêu Hóa & Hấp Thu Các Chất Ở Ruột Non' },
        { slug: 'part5/sl-th-ruotgia', title: 'Chức Năng Ruột Già & Hệ Vi Sinh Vật Đường Ruột' },
        { slug: 'part5/sl-chuyenhoanl-dieuhoanhiet', title: 'Chuyển Hóa Năng Lượng & Cơ Chế Điều Hòa Thân Nhiệt' }
      ]
    },
    {
      id: 'part6',
      title: 'Phần 6: Sinh Lý Thận & Thăng Bằng Toan Kiềm',
      icon: 'fa-filter',
      color: '#0891b2',
      lessons: [
        { slug: 'part6/sl-than-cauthan', title: 'Chức Năng Lọc Của Cầu Thận & Đo Độ Lọc GFR' },
        { slug: 'part6/sl-than-ongthan', title: 'Chức Năng Tái Hấp Thu & Bài Tiết Của Ống Thận' },
        { slug: 'part6/sl-than-phaloang-dieuhoadich', title: 'Cơ Chế Cô Đặc - Pha Loãng Nước Tiểu & Điều Hòa Thể Tích Dịch' },
        { slug: 'part6/sl-than-toankiem', title: 'Vai Trò Của Thận Trong Thăng Bằng Toan Kiềm' }
      ]
    },
    {
      id: 'part7',
      title: 'Phần 7: Sinh Lý Nội Tiết & Sinh Sản',
      icon: 'fa-dna',
      color: '#9333ea',
      lessons: [
        { slug: 'part7/sl-nt-tongquat', title: 'Đại Cương Tuyến Nội Tiết & Cơ Chế Tác Dụng Của Hormone' },
        { slug: 'part7/sl-nt-gh', title: 'Vùng Dưới Đồi & Tuyến Yên (Hormone GH, ACTH, TSH...)' },
        { slug: 'part7/sl-nt-tuyengiap', title: 'Sinh Lý Tuyến Giáp (T3, T4, Calcitonin)' },
        { slug: 'part7/sl-nt-vothuongthan', title: 'Sinh Lý Vỏ & Tủy Thượng Thận (Cortisol, Aldosterone)' },
        { slug: 'part7/sl-nt-tuyentuy', title: 'Sinh Lý Tuyến Tụy Nội Tiết (Insulin & Glucagon)' },
        { slug: 'part7/sl-ss-sinhsan', title: 'Sinh Lý Hệ Sinh Dục Nam, Nữ & Thụ Thai' }
      ]
    },
    {
      id: 'part9',
      title: 'Phần 9: Sinh Lý Học Trẻ Em & Sơ Sinh',
      icon: 'fa-baby',
      color: '#0284c7',
      lessons: [
        { slug: 'part9/sl-nhi-tangtruong-phattrien', title: 'Đặc Điểm Tăng Trưởng & Phát Triển Của Trẻ Em' },
        { slug: 'part9/sl-nhi-tuanhoan-sosinh', title: 'Sinh Lý Tuần Hoàn Thai Nhi & Thích Nghi Sau Sinh' },
        { slug: 'part9/sl-nhi-hohap', title: 'Đặc Điểm Hệ Hô Hấp Ở Trẻ Em & Vai Trò Surfactant' },
        { slug: 'part9/sl-nhi-tieuhoa', title: 'Đặc Điểm Sinh Lý Tiêu Hóa & Dinh Dưỡng Nhi Khoa' },
        { slug: 'part9/sl-nhi-than-tietnieu', title: 'Đặc Điểm Chức Năng Thận & Thăng Bằng Nước Ở Trẻ Em' }
      ]
    }
  ];

  return `
    <div class="gp-sl-container animate-fade-in" style="max-width: 1440px; margin: 0 auto; padding: 1.5rem 1rem;">
      <!-- Breadcrumb & Header -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <div style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); margin-bottom: 0.25rem;">
            <a href="#/pathophysiology" style="color: var(--color-primary, #0284c7); text-decoration: none;"><i class="fa-solid fa-chevron-left"></i> Cơ Sở Y Khoa</a> / Giải Phẫu & Sinh Lý
          </div>
          <h1 style="font-size: 2rem; font-weight: 800; color: #7c3aed; margin: 0; display: flex; align-items: center; gap: 0.75rem;">
            <i class="fa-solid fa-dna"></i> Trung Tâm Giải Phẫu & Sinh Lý Học Lâm Sàng
          </h1>
          <p style="font-size: 0.95rem; color: var(--color-text-muted, #64748b); margin: 0.25rem 0 0 0;">
            Hệ thống 43 bài giảng sinh lý học y khoa từ tế bào, thần kinh, tim mạch đến thận, nội tiết và nhi khoa.
          </p>
        </div>
        
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <a href="#/pathophysiology/co-che-benh-sinh" class="btn btn-outline" style="padding: 0.6rem 1rem; border-radius: 8px; border: 1px solid var(--color-border, #e2e8f0); color: var(--color-text, #334155); text-decoration: none; font-size: 0.875rem; font-weight: 600; display: flex; align-items: center; gap: 0.5rem;">
            <i class="fa-solid fa-microscope" style="color: #059669;"></i> Sinh Lý Bệnh (CCBS)
          </a>
          <a href="#/pathophysiology/formula-vault" class="btn btn-outline" style="padding: 0.6rem 1rem; border-radius: 8px; border: 1px solid var(--color-border, #e2e8f0); color: var(--color-text, #334155); text-decoration: none; font-size: 0.875rem; font-weight: 600; display: flex; align-items: center; gap: 0.5rem;">
            <i class="fa-solid fa-calculator" style="color: #0284c7;"></i> Formula Vault
          </a>
        </div>
      </div>

      <!-- 8 Organ Systems Grid -->
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(380px, 1fr)); gap: 1.5rem;">
        ${parts.map(part => `
          <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.5rem; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
            <div>
              <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; border-bottom: 1px solid var(--color-border, #f1f5f9); padding-bottom: 0.75rem;">
                <div style="width: 40px; height: 40px; border-radius: 8px; background: ${part.color}15; color: ${part.color}; display: flex; align-items: center; justify-content: center; font-size: 1.25rem;">
                  <i class="fa-solid ${part.icon}"></i>
                </div>
                <h3 style="margin: 0; font-size: 1.15rem; font-weight: 700; color: var(--color-text, #0f172a);">${part.title}</h3>
              </div>

              <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.5rem;">
                ${part.lessons.map((lesson, idx) => `
                  <li>
                    <a href="#/pathophysiology/reader/${lesson.slug}" style="display: flex; align-items: center; justify-content: space-between; padding: 0.5rem 0.75rem; border-radius: 6px; background: #f8fafc; text-decoration: none; color: var(--color-text, #334155); font-size: 0.875rem; transition: all 0.2s;" onmouseover="this.style.background='#f1f5f9'" onmouseout="this.style.background='#f8fafc'">
                      <span style="font-weight: 600;">${idx + 1}. ${lesson.title}</span>
                      <i class="fa-solid fa-chevron-right" style="font-size: 0.75rem; color: #94a3b8;"></i>
                    </a>
                  </li>
                `).join('')}
              </ul>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}
