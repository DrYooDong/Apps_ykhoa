/**
 * CliniPortal — Symptom-based Clinical Pharmacology SPA Views (TypeScript)
 * Path: src/content/pharmacology/symptoms/symptom-pharma-views.ts
 */

export type SymptomPharmaKey = 'chong-mat' | 'dau-bung' | 'dau-dau' | 'ho' | 'non-oi' | 'all';

export function renderSymptomPharmaView(symptomKey: SymptomPharmaKey = 'all'): string {
  const symptoms = [
    {
      key: 'chong-mat',
      title: 'Dược Trị Liệu Chóng Mặt & Rối Loạn Tiền Đình',
      icon: 'fa-arrows-spin',
      color: '#7c3aed',
      desc: 'Lựa chọn thuốc chống chóng mặt (Betahistine, Cinnarizine, Flunarizine, Dimenhydrinate, Acetyl-leucine) theo căn nguyên ngoại biên/trung ương.',
      drugs: ['Betahistine 24mg bid', 'Flunarizine 5mg nocte', 'Cinnarizine 25mg tid', 'Tanganil 500mg IV/PO']
    },
    {
      key: 'dau-bung',
      title: 'Dược Trị Liệu Đau Bụng Cấp & Co Thắt Cơ Trơn',
      icon: 'fa-hand-dots',
      color: '#dc2626',
      desc: 'Nguyên tắc kiểm soát đau quặn bụng, đau do co thắt đường mật/tiết niệu/tiêu hóa (Drotaverine, Mebeverine, Hyoscine-N-butylbromide, Alverine).',
      drugs: ['Drotaverine (No-Spa) 40-80mg tid', 'Hyoscine (Buscopan) 10-20mg IV/PO', 'Alverine 60mg tid', 'Mebeverine 200mg bid']
    },
    {
      key: 'dau-dau',
      title: 'Dược Trị Liệu Đau Đầu & Cắt Cơn Migraine',
      icon: 'fa-brain',
      color: '#ea580c',
      desc: 'Phác đồ điều trị cắt cơn đau đầu căng thẳng, Migraine cấp (NSAIDs, Paracetamol, Triptans: Sumatriptan/Zolmitriptan) và phòng ngừa (Beta-blocker, Topiramate).',
      drugs: ['Sumatriptan 50-100mg PO', 'Ibuprofen 400-600mg tid', 'Paracetamol 1000mg q6h', 'Propranolol 40-80mg/ngày (dự phòng)']
    },
    {
      key: 'ho',
      title: 'Dược Trị Liệu Ho Cấp & Ho Mạn Tính',
      icon: 'fa-head-side-cough',
      color: '#0284c7',
      desc: 'Phân loại ho khan vs ho có đờm, chỉ định thuốc ức chế ho khan trung ương (Dextromethorphan), thuốc tiêu nhầy loãng đờm (N-Acetylcysteine, Ambroxol, Bromhexine).',
      drugs: ['N-Acetylcysteine (NAC) 200mg tid / 600mg eff', 'Dextromethorphan 15-30mg tid', 'Ambroxol 30mg tid', 'Guaifenesin 200-400mg q4h']
    },
    {
      key: 'non-oi',
      title: 'Dược Trị Liệu Buồn Nôn & Nôn Ói',
      icon: 'fa-face-dizzy',
      color: '#059669',
      desc: 'Cơ chế tác động lên thụ thể D2, 5-HT3, H1 và NK1: Domperidone, Metoclopramide, Ondansetron, Dimenhydrinate và Aprepitant.',
      drugs: ['Ondansetron 4-8mg IV/PO q8h', 'Metoclopramide 10mg tid/IV', 'Domperidone 10mg tid (uống trước ăn)', 'Dimenhydrinate 50mg PO']
    }
  ];

  return `
    <div class="symptom-pharma-container animate-fade-in" style="max-width: 1440px; margin: 0 auto; padding: 1.5rem 1rem;">
      <!-- Breadcrumb & Header -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <div style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); margin-bottom: 0.25rem;">
            <a href="#/pharmacology" style="color: var(--color-primary, #0284c7); text-decoration: none;"><i class="fa-solid fa-chevron-left"></i> Dược Lý Lâm Sàng</a> / Dược Trị Liệu Theo Triệu Chứng
          </div>
          <h1 style="font-size: 2rem; font-weight: 800; color: var(--color-primary, #0284c7); margin: 0; display: flex; align-items: center; gap: 0.75rem;">
            <i class="fa-solid fa-stethoscope"></i> Dược Trị Liệu Theo Triệu Chứng Lâm Sàng Thường Gặp
          </h1>
          <p style="font-size: 0.95rem; color: var(--color-text-muted, #64748b); margin: 0.25rem 0 0 0;">
            Lựa chọn thuốc bước 1 - bước 2, liều dùng chuẩn, chống chỉ định và dấu hiệu cờ đỏ (Red Flags) chuyển viện cấp cứu.
          </p>
        </div>
        
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <a href="#/pharmacology/tra-cuu-thuoc" class="btn btn-outline" style="padding: 0.6rem 1rem; border-radius: 8px; border: 1px solid var(--color-border, #e2e8f0); color: var(--color-text, #334155); text-decoration: none; font-size: 0.875rem; font-weight: 600; display: flex; align-items: center; gap: 0.5rem;">
            <i class="fa-solid fa-magnifying-glass" style="color: #db2777;"></i> Tra Cứu Dược Thư
          </a>
        </div>
      </div>

      <!-- 5 Symptoms Cards Grid -->
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(380px, 1fr)); gap: 1.5rem;">
        ${symptoms.map(s => `
          <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.5rem; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 2px 4px rgba(0,0,0,0.03);">
            <div>
              <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; border-bottom: 1px solid var(--color-border, #f1f5f9); padding-bottom: 0.75rem;">
                <div style="width: 40px; height: 40px; border-radius: 8px; background: ${s.color}15; color: ${s.color}; display: flex; align-items: center; justify-content: center; font-size: 1.25rem;">
                  <i class="fa-solid ${s.icon}"></i>
                </div>
                <h3 style="margin: 0; font-size: 1.15rem; font-weight: 700; color: var(--color-text, #0f172a);">${s.title}</h3>
              </div>

              <p style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); line-height: 1.5; margin-bottom: 1rem;">
                ${s.desc}
              </p>

              <div style="background: #f8fafc; border-radius: 8px; padding: 0.75rem; margin-bottom: 1rem;">
                <div style="font-size: 0.75rem; font-weight: 700; color: #475569; text-transform: uppercase; margin-bottom: 0.35rem;">Thuốc Thường Dùng & Liều Chuẩn:</div>
                <ul style="list-style: none; padding: 0; margin: 0; font-size: 0.825rem; color: #334155; display: flex; flex-direction: column; gap: 0.25rem;">
                  ${s.drugs.map(d => `<li><i class="fa-solid fa-capsules" style="color:${s.color}; margin-right: 0.4rem;"></i> ${d}</li>`).join('')}
                </ul>
              </div>
            </div>

            <div style="border-top: 1px solid var(--color-border, #f1f5f9); padding-top: 0.75rem; display: flex; justify-content: space-between; align-items: center;">
              <span style="font-size: 0.75rem; color: #94a3b8;"><i class="fa-solid fa-shield-halved"></i> Kèm Red Flags</span>
              <a href="#/pharmacology/tra-cuu-thuoc" style="padding: 0.35rem 0.75rem; background: ${s.color}; color: #fff; border-radius: 6px; text-decoration: none; font-size: 0.8rem; font-weight: 600;">
                Tra cứu phác đồ <i class="fa-solid fa-arrow-right"></i>
              </a>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}
