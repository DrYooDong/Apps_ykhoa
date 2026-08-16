/**
 * CliniPortal — Five Elements (Ngũ Hành) Studio SPA View (TypeScript)
 * Path: src/content/tcm/theory-ngu-hanh/ngu-hanh-studio-view.ts
 */

export function renderNguHanhStudioView(): string {
  const elements = [
    { name: 'Mộc (Gỗ)', color: '#16a34a', bg: '#dcfce7', zang: 'Can', fu: 'Đởm', sense: 'Mắt (Thị giác)', tissue: 'Cân (Gân)', season: 'Mùa Xuân', emotion: 'Giận dữ (Nộ)', taste: 'Chua (Toan)' },
    { name: 'Hỏa (Lửa)', color: '#dc2626', bg: '#fee2e2', zang: 'Tâm', fu: 'Tiểu trường', sense: 'Lưỡi (Vị giác)', tissue: 'Mạch (Mạch máu)', season: 'Mùa Hạ', emotion: 'Vui mừng (Hỷ)', taste: 'Đắng (Khổ)' },
    { name: 'Thổ (Đất)', color: '#ca8a04', bg: '#fef9c3', zang: 'Tỳ', fu: 'Vị', sense: 'Miệng/Môi', tissue: 'Cơ nhục (Thịt)', season: 'Trưởng Hạ', emotion: 'Lo nghĩ (Ưu/Tư)', taste: 'Ngọt (Cam)' },
    { name: 'Kim (Kim loại)', color: '#64748b', bg: '#f1f5f9', zang: 'Phế', fu: 'Đại trường', sense: 'Mũi (Khứu giác)', tissue: 'Bì mao (Da lông)', season: 'Mùa Thu', emotion: 'Buồn bã (Bi)', taste: 'Cay (Tân)' },
    { name: 'Thủy (Nước)', color: '#0284c7', bg: '#e0f2fe', zang: 'Thận', fu: 'Bàng quang', sense: 'Tai (Thính giác)', tissue: 'Cốt tủy (Xương)', season: 'Mùa Đông', emotion: 'Sợ hãi (Khủng)', taste: 'Mặn (Hàm)' }
  ];

  return `
    <div class="ngu-hanh-container animate-fade-in" style="max-width: 1400px; margin: 0 auto; padding: 1.5rem 1rem;">
      <!-- Breadcrumb & Header -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <div style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); margin-bottom: 0.25rem;">
            <a href="#/tcm" style="color: var(--color-primary, #0284c7); text-decoration: none;"><i class="fa-solid fa-chevron-left"></i> Y Học Cổ Truyền</a> / Ngũ Hành Studio
          </div>
          <h1 style="font-size: 2rem; font-weight: 800; color: #ea580c; margin: 0; display: flex; align-items: center; gap: 0.75rem;">
            <i class="fa-solid fa-circle-nodes"></i> Studio Ngũ Hành Tương Sinh - Tương Khắc
          </h1>
          <p style="font-size: 0.95rem; color: var(--color-text-muted, #64748b); margin: 0.25rem 0 0 0;">
            Quy luật Tương sinh (Mộc sinh Hỏa, Hỏa sinh Thổ, Thổ sinh Kim, Kim sinh Thủy, Thủy sinh Mộc) & Tương khắc (Mộc khắc Thổ, Thổ khắc Thủy, Thủy khắc Hỏa, Hỏa khắc Kim, Kim khắc Mộc).
          </p>
        </div>
        
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <a href="#/tcm" class="btn btn-outline" style="padding: 0.5rem 1rem; border-radius: 8px; border: 1px solid var(--color-border, #e2e8f0); color: var(--color-text, #334155); text-decoration: none; font-size: 0.875rem; font-weight: 600;">
            <i class="fa-solid fa-arrow-left"></i> TCM Hub
          </a>
        </div>
      </div>

      <!-- Five Elements Cards Grid -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.25rem; margin-bottom: 2rem;">
        ${elements.map(el => `
          <div style="background: var(--color-surface, #fff); border: 2px solid ${el.color}; border-radius: 12px; padding: 1.25rem; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 2px 4px rgba(0,0,0,0.03);">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
                <h3 style="margin: 0; font-size: 1.25rem; font-weight: 800; color: ${el.color};">${el.name}</h3>
                <span style="background: ${el.bg}; color: ${el.color}; font-size: 0.8rem; font-weight: 700; padding: 0.2rem 0.5rem; border-radius: 4px;">
                  ${el.zang} / ${el.fu}
                </span>
              </div>

              <div style="font-size: 0.85rem; color: #334155; line-height: 1.6; display: flex; flex-direction: column; gap: 0.25rem;">
                <div><strong>Tạng Phủ:</strong> Tạng ${el.zang} - Phủ ${el.fu}</div>
                <div><strong>Khai khiếu:</strong> Ra ${el.sense}</div>
                <div><strong>Chủ về:</strong> ${el.tissue}</div>
                <div><strong>Mùa tương ứng:</strong> ${el.season}</div>
                <div><strong>Tình chí:</strong> ${el.emotion}</div>
                <div><strong>Ngũ vị:</strong> Vị ${el.taste}</div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Theory Summary Card -->
      <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.5rem;">
        <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--color-text, #0f172a); margin-bottom: 0.75rem;">
          Ứng Dụng Lâm Sàng Của Học Thuyết Ngũ Hành Trong Y Học Cổ Truyền:
        </h3>
        <ul style="padding-left: 1.25rem; margin: 0; font-size: 0.9rem; color: #475569; line-height: 1.6;">
          <li><strong>Quy luật sinh khắc trong chẩn đoán:</strong> Bệnh của Mẹ truyền sang Con (Mẫu bệnh cập tử, ví dụ Thận thủy hư không dưỡng Can mộc) hoặc Con truyền sang Mẹ (Tử đạo mẫu khí).</li>
          <li><strong>Nguyên tắc trị liệu kinh điển:</strong> "Hư thì bổ Mẹ, Thực thì tả Con" (Hư tắc bổ kỳ mẫu, Thực tắc tả kỳ tử).</li>
          <li><strong>Ngũ vị quy kinh trong ẩm thực & dùng thuốc:</strong> Vị cay vào Phế, vị chua vào Can, vị ngọt vào Tỳ, vị đắng vào Tâm, vị mặn vào Thận.</li>
        </ul>
      </div>
    </div>
  `;
}
