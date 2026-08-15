/**
 * CliniPortal — TCM Diagnostics (Tongue Atlas & Pulse Simulator) SPA View (TypeScript)
 * Path: src/content/tcm/diagnostics/tcm-diagnostics-view.ts
 */

export function renderTcmDiagnosticsView(): string {
  const tongueTypes = [
    { name: 'Lưỡi Đạm Hồng, Rêu Trắng Mỏng (Bình Thường)', meaning: 'Khí huyết đầy đủ, tạng phủ hòa hợp.', color: '#ec4899', desc: 'Chất lưỡi mềm mại, sắc hồng nhuận, rêu trắng mỏng và ẩm ướt tự nhiên.' },
    { name: 'Lưỡi Đạm Bạch (Nhợt Nhạt), Ít Rêu', meaning: 'Khí Huyết Hư hoặc Dương Hư Hàn.', color: '#fbcfe8', desc: 'Chất lưỡi nhạt màu, bệu to, có dấu hằn răng (xỉ ngân). Chủ chứng Tỳ Thận khí hư.' },
    { name: 'Lưỡi Đỏ / Đỏ Thẫm (Hồng / Giáng), Ít Rêu hoặc Không Rêu', meaning: 'Âm Hư Hỏa Vượng hoặc Nhiệt Nhập Doanh Huyết.', color: '#dc2626', desc: 'Chất lưỡi đỏ tươi hoặc đỏ sẫm, rêu bong tróc (lưỡi bản đồ, lưỡi gương). Chủ chứng can thận âm hư, sốt cao mất tân dịch.' },
    { name: 'Lưỡi Tím Tối / Có Điểm Ứ Huyết', meaning: 'Huyết Ứ, Khí Trệ hoặc Hàn Ngưng.', color: '#7c3aed', desc: 'Chất lưỡi tím tái hoặc có các đốm ứ huyết (ban ứ huyết) ở rìa hoặc đầu lưỡi. Thường gặp trong bệnh mạch vành, di chứng đột quỵ.' }
  ];

  const pulseTypes = [
    { name: 'Mạch Phù (Nổi)', feel: 'Ấn nhẹ thấy rõ, ấn mạnh yếu đi.', meaning: 'Biểu chứng (Cảm mạo phong hàn/phong nhiệt), Hư dương ngoại phù.' },
    { name: 'Mạch Trầm (Chìm)', feel: 'Ấn nhẹ không thấy, ấn sát xương mới thấy.', meaning: 'Lý chứng (Bệnh tại tạng phủ bên trong), Tỳ Thận dương hư.' },
    { name: 'Mạch Trì (Chậm < 60 l/p)', feel: 'Một hơi thở đập dưới 4 nhịp.', meaning: 'Hàn chứng (Nội hàn do dương khí bất túc hoặc ngoại hàn xâm nhập).' },
    { name: 'Mạch Sác (Nhanh > 90 l/p)', feel: 'Một hơi thở đập trên 5 nhịp.', meaning: 'Nhiệt chứng (Thực nhiệt sốt cao hoặc Âm hư nội nhiệt).' },
    { name: 'Mạch Hoạt (Trơn tru)', feel: 'Như hạt châu lăn dưới ngón tay.', meaning: 'Đàm ẩm, Thực tích, hoặc Phụ nữ có thai khỏe mạnh.' },
    { name: 'Mạch Huyền (Căng như dây đàn)', feel: 'Thẳng và dài, ấn vào cảm giác căng cứng.', meaning: 'Can Đởm bệnh (Can khí uất kết, Can hỏa), Đau đớn dữ dội, Đàm ẩm.' }
  ];

  return `
    <div class="tcm-diagnostics-container animate-fade-in" style="max-width: 1400px; margin: 0 auto; padding: 1.5rem 1rem;">
      <!-- Breadcrumb & Header -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <div style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); margin-bottom: 0.25rem;">
            <a href="#/tcm" style="color: var(--color-primary, #0284c7); text-decoration: none;"><i class="fa-solid fa-chevron-left"></i> Y Học Cổ Truyền</a> / Chẩn Đoán Tứ Chẩn
          </div>
          <h1 style="font-size: 2rem; font-weight: 800; color: #7c3aed; margin: 0; display: flex; align-items: center; gap: 0.75rem;">
            <i class="fa-solid fa-eye"></i> Tứ Chẩn YHCT: Atlas Thiệt Chẩn & Giả Lập Mạch Học
          </h1>
          <p style="font-size: 0.95rem; color: var(--color-text-muted, #64748b); margin: 0.25rem 0 0 0;">
            Phương pháp biện chứng Vọng - Văn - Vấn - Thiết, quan sát Thần Sắc - Chất Lưỡi - Rêu Lưỡi và cảm nhận 28 Mạch Tượng kinh điển.
          </p>
        </div>
        
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <a href="#/tcm" class="btn btn-outline" style="padding: 0.5rem 1rem; border-radius: 8px; border: 1px solid var(--color-border, #e2e8f0); color: var(--color-text, #334155); text-decoration: none; font-size: 0.875rem; font-weight: 600;">
            <i class="fa-solid fa-arrow-left"></i> TCM Hub
          </a>
        </div>
      </div>

      <!-- 2 Columns: Tongue Atlas & Pulse Simulator -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
        
        <!-- Tongue Atlas -->
        <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.5rem;">
          <h3 style="font-size: 1.2rem; font-weight: 700; color: #db2777; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
            👅 1. Atlas Thiệt Chẩn (Chất Lưỡi & Rêu Lưỡi)
          </h3>

          <div style="display: flex; flex-direction: column; gap: 0.85rem;">
            ${tongueTypes.map(t => `
              <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 1rem;">
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
                  <span style="width: 12px; height: 12px; border-radius: 50%; background: ${t.color}; display: inline-block;"></span>
                  <h4 style="margin: 0; font-size: 0.95rem; font-weight: 700; color: var(--color-text, #0f172a);">${t.name}</h4>
                </div>
                <div style="font-size: 0.825rem; font-weight: 600; color: #0284c7; margin-bottom: 0.25rem;">
                  Ý nghĩa biện chứng: ${t.meaning}
                </div>
                <p style="margin: 0; font-size: 0.8rem; color: #64748b; line-height: 1.4;">
                  ${t.desc}
                </p>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Pulse Simulator -->
        <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.5rem;">
          <h3 style="font-size: 1.2rem; font-weight: 700; color: #7c3aed; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
            🩺 2. Mạch Học Biện Chứng (28 Mạch Tượng)
          </h3>

          <div style="display: flex; flex-direction: column; gap: 0.85rem;">
            ${pulseTypes.map(p => `
              <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 0.85rem;">
                <h4 style="margin: 0 0 0.25rem; font-size: 0.95rem; font-weight: 700; color: #7c3aed;">
                  ${p.name}
                </h4>
                <div style="font-size: 0.825rem; color: #334155; margin-bottom: 0.25rem;">
                  <strong>Cảm giác tay:</strong> ${p.feel}
                </div>
                <div style="font-size: 0.8rem; color: #64748b;">
                  <strong>Chủ bệnh:</strong> ${p.meaning}
                </div>
              </div>
            `).join('')}
          </div>
        </div>

      </div>
    </div>
  `;
}
