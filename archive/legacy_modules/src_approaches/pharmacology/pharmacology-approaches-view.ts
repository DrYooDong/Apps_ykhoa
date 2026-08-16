/**
 * CliniPortal — Dược Lý Theo Tạng & Lưu Đồ Sử Dụng Thuốc (TypeScript Module)
 * Path: src/content/approaches/pharmacology/pharmacology-approaches-view.ts
 */

export interface OrganPharmItem {
  id: string;
  name: string;
  icon: string;
  category: string;
  summary: string;
  keyClasses: {
    className: string;
    mechanism: string;
    examples: string;
    clinicalPearls: string;
  }[];
  emergencyDoses?: {
    drug: string;
    indication: string;
    dosing: string;
    warning: string;
  }[];
}

export const PHARMACOLOGY_APPROACH_DATA: Record<string, OrganPharmItem> = {
  'van-mach': {
    id: 'van-mach',
    name: 'Vận Mạch & Tăng Co Bóp Cơ Tim (Vasopressors & Inotropes)',
    icon: 'fa-heart-pulse',
    category: 'Cấp Cứu & Hồi Sức',
    summary: 'Phác đồ phân tầng lựa chọn thuốc vận mạch và tăng co bóp cơ tim theo từng thể sốc lâm sàng (Sốc tim, Sốc nhiễm khuẩn, Sốc phản vệ).',
    keyClasses: [
      {
        className: 'Noradrenaline (Norepinephrine)',
        mechanism: 'Chủ vận alpha-1 mạnh (co mạch ngoại biên) + alpha-2, beta-1 yếu.',
        examples: 'Levophed 4mg/4mL',
        clinicalPearls: 'Lựa chọn đầu tay trong Sốc nhiễm khuẩn (Septic Shock) và hầu hết các tình trạng sốc giãn mạch. Mục tiêu duy trì MAP ≥ 65 mmHg.'
      },
      {
        className: 'Adrenaline (Epinephrine)',
        mechanism: 'Chủ vận mạnh toàn bộ alpha-1, beta-1, beta-2.',
        examples: 'Adrenalin 1mg/1mL',
        clinicalPearls: 'Đầu tay trong Sốc phản vệ (IM) và Ngưng tuần hoàn (IV). Lựa chọn thứ hai thêm vào Noradrenaline trong sốc nhiễm trùng kháng trị.'
      },
      {
        className: 'Dobutamine',
        mechanism: 'Chủ vận beta-1 chọn lọc (tăng co bóp cơ tim Inotrope) + beta-2 (giãn mạch nhẹ).',
        examples: 'Dobutrex 250mg/20mL',
        clinicalPearls: 'Đầu tay trong Sốc tim (Cardiogenic Shock) có giảm cung lượng tim (Low CO) nhưng huyết áp tâm thu còn trên 80-90 mmHg.'
      },
      {
        className: 'Vasopressin (ADH)',
        mechanism: 'Kích thích thụ thể V1 trên cơ trơn mạch máu gây co mạch độc lập với catecholamine.',
        examples: 'Pitressin 20 UI/mL',
        clinicalPearls: 'Dùng liều cố định 0.03 UI/phút phối hợp với Noradrenaline để giảm liều Norepinephrine và tránh toan chuyển hóa.'
      }
    ],
    emergencyDoses: [
      {
        drug: 'Noradrenaline IV',
        indication: 'Sốc nhiễm khuẩn / Sốc giãn mạch',
        dosing: 'Khởi đầu 0.05 mcg/kg/phút (pha 4mg trong 48mL Nacl 0.9%), chỉnh liều mỗi 5-10 phút đến MAP ≥ 65 mmHg.',
        warning: 'Phải truyền qua catheter tĩnh mạch trung tâm (CVC) để tránh hoại tử mô nếu thoát mạch.'
      },
      {
        drug: 'Adrenaline IM',
        indication: 'Sốc phản vệ (Độ 2 trở lên)',
        dosing: 'Người lớn: 0.5mg (1/2 ống 1mg) tiêm bắp mặt trước ngoài đùi. Trẻ em: 0.01 mg/kg. Lặp lại mỗi 5-15 phút.',
        warning: 'Tuyệt đối KHÔNG tiêm tĩnh mạch trực tiếp bolus Adrenaline 1mg nguyên chất trong phản vệ có mạch!'
      }
    ]
  },
  'tim-mach': {
    id: 'tim-mach',
    name: 'Dược Lý Tim Mạch (Cardiovascular Pharmacology)',
    icon: 'fa-heart',
    category: 'Nội Tim Mạch',
    summary: 'Thuốc ức chế men chuyển (ACEi), chẹn thụ thể (ARB), chẹn beta (Beta-blockers), kháng thụ thể Mineralocorticoid (MRA) và SGLT2i (Tứ trụ suy tim HFrEF).',
    keyClasses: [
      {
        className: 'ARNI / ACEi / ARB (Hệ RAA)',
        mechanism: 'Ức chế NEP & AT1 receptor (Sacubitril/Valsartan) hoặc ức chế men chuyển Angiotensin.',
        examples: 'Entresto 50/100/200mg, Perindopril, Enalapril, Losartan',
        clinicalPearls: 'Giảm tái cấu trúc thất trái và giảm tử vong trong HFrEF. Cần ngưng ACEi 36 giờ trước khi khởi trị Entresto để tránh phù mạch.'
      },
      {
        className: 'Chẹn Beta giao cảm (Beta-blockers)',
        mechanism: 'Ức chế chọn lọc beta-1 (Bisoprolol, Metoprolol succinate) hoặc chẹn không chọn lọc alpha/beta (Carvedilol).',
        examples: 'Bisoprolol (Concor 2.5/5mg), Carvedilol, Metoprolol succinate',
        clinicalPearls: '3 loại chẹn beta chứng minh giảm tử vong trong HFrEF: Bisoprolol, Carvedilol, Metoprolol CR/XL. Khởi đầu liều thấp khi bệnh nhân hết ứ dịch.'
      },
      {
        className: 'Ức chế SGLT2 (SGLT2 inhibitors)',
        mechanism: 'Ức chế đồng vận chuyển Natri-Glucose 2 tại ống lượn gần, gây thải đường và natri niệu.',
        examples: 'Empagliflozin (Jardiance 10mg), Dapagliflozin (Forxiga 10mg)',
        clinicalPearls: 'Chỉ định cho cả HFrEF, HFmrEF và HFpEF bất kể có đái tháo đường hay không. Giảm nguy cơ suy thận tiến triển.'
      }
    ]
  },
  'khang-sinh': {
    id: 'khang-sinh',
    name: 'Kháng Sinh Lâm Sàng (Antibiotic Stewardship)',
    icon: 'fa-shield-virus',
    category: 'Truyền Nhiễm',
    summary: 'Phân tầng kháng sinh theo cơ chế vi sinh vật, dược động học PK/PD (Time-dependent vs Concentration-dependent) và phác đồ điều trị theo kinh nghiệm.',
    keyClasses: [
      {
        className: 'Beta-lactams (Penicillin, Cephalosporin, Carbapenem)',
        mechanism: 'Ức chế tổng hợp thành tế bào vi khuẩn (Time-dependent: %T > MIC).',
        examples: 'Augmentin, Ceftriaxone, Cefepime, Meropenem',
        clinicalPearls: 'Hiệu quả phụ thuộc thời gian nồng độ trên MIC. Tối ưu bằng cách truyền kéo dài (Extended infusion) 3-4 giờ đối với Meropenem/Pip-Tazo trong ICU.'
      },
      {
        className: 'Aminoglycosides (Amikacin, Gentamicin)',
        mechanism: 'Ức chế tiểu đơn vị 30S ribosome vi khuẩn (Concentration-dependent: Cmax / MIC).',
        examples: 'Amikacin 15-20 mg/kg/ngày, Gentamicin 5-7 mg/kg/ngày',
        clinicalPearls: 'Dùng liều duy nhất 1 lần trong ngày (Once daily dosing) để đạt đỉnh Cmax cao và giảm độc tính trên thận và thính giác.'
      },
      {
        className: 'Glycopeptides & Lipopeptides (Chống MRSA)',
        mechanism: 'Ức chế tổng hợp vách tế bào vi khuẩn Gram dương kháng thuốc.',
        examples: 'Vancomycin (Mục tiêu AUC/MIC 400-600), Linezolid, Daptomycin',
        clinicalPearls: 'Khởi đầu Vancomycin liều nạp 25-30 mg/kg ở bệnh nhân nặng/nhiễm trùng huyết.'
      }
    ]
  },
  'ho-hap': {
    id: 'ho-hap',
    name: 'Dược Lý Hô Hấp (Respiratory Pharmacology)',
    icon: 'fa-lungs',
    category: 'Nội Hô Hấp',
    summary: 'Phác đồ điều trị Hen phế quản theo GINA 2024-2026 và COPD theo GOLD 2024-2026 (SABA, LABA, SAMA, LAMA, ICS).',
    keyClasses: [
      {
        className: 'ICS + Formoterol (Chiến lược SMART / MART)',
        mechanism: 'Corticoid hít giảm viêm + Đồng vận beta-2 tác dụng kéo dài khởi phát nhanh.',
        examples: 'Symbicort (Budesonide/Formoterol 160/4.5mcg)',
        clinicalPearls: 'Lựa chọn ưu tiên theo GINA Track 1 cho cả điều trị duy trì và cắt cơn ở bệnh nhân Hen từ bậc 1 đến bậc 5.'
      },
      {
        className: 'LAMA + LABA (Giãn phế quản kép trong COPD)',
        mechanism: 'Kháng Cholinergic tác dụng kéo dài + Đồng vận Beta-2 tác dụng kéo dài.',
        examples: 'Ultibro (Indacaterol/Glycopyrronium), Spiolto (Tiotropium/Olodaterol)',
        clinicalPearls: 'Đầu tay cho bệnh nhân COPD nhóm B và nhóm E (có đợt cấp) để cải thiện FEV1 và giảm nhập viện.'
      }
    ]
  }
};

export function renderPharmacologyApproachesView(activeId: string = 'van-mach'): string {
  const current = PHARMACOLOGY_APPROACH_DATA[activeId] || PHARMACOLOGY_APPROACH_DATA['van-mach'];

  return `
    <div class="organ-pharm-container animate-fade-in" style="max-width: 1200px; margin: 0 auto; padding: 1.5rem 1rem;">
      <!-- Breadcrumb & Header -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <div style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); margin-bottom: 0.25rem;">
            <a href="#/approaches" style="color: var(--color-primary, #0284c7); text-decoration: none;"><i class="fa-solid fa-chevron-left"></i> Phân Hệ Tiếp Cận</a> / Dược Lý Theo Tạng
          </div>
          <h1 style="font-size: 1.75rem; font-weight: 800; color: var(--color-primary, #0284c7); margin: 0; display: flex; align-items: center; gap: 0.75rem;">
            <i class="fa-solid fa-pills"></i> Dược Lý Theo Tạng & Phác Đồ Lựa Chọn Thuốc
          </h1>
        </div>
        
        <div style="display: flex; gap: 0.5rem;">
          <a href="#/approaches" class="btn btn-outline" style="padding: 0.5rem 1rem; border-radius: 8px; border: 1px solid var(--color-border, #e2e8f0); color: var(--color-text, #334155); text-decoration: none; font-size: 0.875rem; font-weight: 600;">
            <i class="fa-solid fa-arrow-left"></i> Quay lại
          </a>
        </div>
      </div>

      <!-- Organ Navigation Buttons -->
      <div style="display: flex; gap: 0.5rem; border-bottom: 2px solid var(--color-border, #e2e8f0); margin-bottom: 1.5rem; overflow-x: auto; padding-bottom: 0.5rem;">
        ${Object.values(PHARMACOLOGY_APPROACH_DATA).map(item => `
          <button class="pharm-organ-btn ${item.id === current.id ? 'active' : ''}" onclick="window.switchPharmOrgan('${item.id}')" style="padding: 0.6rem 1.2rem; border: none; background: ${item.id === current.id ? 'var(--color-primary, #0284c7)' : 'transparent'}; color: ${item.id === current.id ? '#fff' : 'var(--color-text, #334155)'}; border-radius: 8px; font-weight: 700; font-size: 0.875rem; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; transition: all 0.2s; white-space: nowrap;">
            <i class="fa-solid ${item.icon}"></i> ${item.name.split('(')[0]}
          </button>
        `).join('')}
      </div>

      <!-- Detail Card Area -->
      <div id="pharmDetailContainer">
        ${renderPharmContent(current)}
      </div>
    </div>
  `;
}

function renderPharmContent(item: OrganPharmItem): string {
  return `
    <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.75rem; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
      <!-- Title & Summary -->
      <div style="border-bottom: 2px solid var(--color-primary, #0284c7); padding-bottom: 1rem; margin-bottom: 1.5rem;">
        <div style="font-size: 0.85rem; font-weight: 700; color: var(--color-primary, #0284c7); text-transform: uppercase; margin-bottom: 0.25rem;">
          ${item.category}
        </div>
        <h2 style="font-size: 1.5rem; font-weight: 800; color: var(--color-text, #1e293b); margin: 0 0 0.5rem 0; display: flex; align-items: center; gap: 0.5rem;">
          <i class="fa-solid ${item.icon}" style="color: var(--color-primary, #0284c7);"></i> ${item.name}
        </h2>
        <p style="font-size: 0.95rem; color: var(--color-text-muted, #64748b); margin: 0; line-height: 1.5;">
          ${item.summary}
        </p>
      </div>

      <!-- Emergency Doses if available -->
      ${item.emergencyDoses ? `
        <div style="margin-bottom: 2rem;">
          <h3 style="font-size: 1.15rem; font-weight: 700; color: #dc2626; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
            <i class="fa-solid fa-triangle-exclamation"></i> Liều Cấp Cứu STAT & Cảnh Báo Lâm Sàng
          </h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1rem;">
            ${item.emergencyDoses.map(dose => `
              <div style="padding: 1.25rem; background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px;">
                <div style="font-weight: 800; color: #991b1b; font-size: 1rem; margin-bottom: 0.25rem;">
                  💊 ${dose.drug}
                </div>
                <div style="font-size: 0.8rem; color: #b91c1c; font-weight: 600; margin-bottom: 0.5rem;">
                  Chỉ định: ${dose.indication}
                </div>
                <div style="font-size: 0.875rem; color: #7f1d1d; margin-bottom: 0.5rem; background: rgba(255,255,255,0.7); padding: 0.5rem; border-radius: 4px;">
                  <strong>Liều & Cách dùng:</strong> ${dose.dosing}
                </div>
                <div style="font-size: 0.8rem; color: #991b1b;">
                  ⚠️ <strong>Cảnh báo:</strong> ${dose.warning}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <!-- Core Drug Classes Matrix -->
      <div>
        <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--color-text, #1e293b); margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
          <i class="fa-solid fa-layer-group" style="color: var(--color-primary, #0284c7);"></i> Các Nhóm Thuốc Cốt Lõi & Kinh Nghiệm Thực Hành (Clinical Pearls)
        </h3>

        <div style="display: flex; flex-direction: column; gap: 1rem;">
          ${item.keyClasses.map(cls => `
            <div style="border: 1px solid var(--color-border, #e2e8f0); border-radius: 8px; padding: 1.25rem; background: var(--color-surface, #fff);">
              <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 0.5rem; flex-wrap: wrap; gap: 0.5rem;">
                <h4 style="font-weight: 800; font-size: 1.05rem; color: var(--color-primary, #0284c7); margin: 0;">
                  ${cls.className}
                </h4>
                <span style="font-size: 0.8rem; background: var(--color-bg, #f1f5f9); padding: 2px 8px; border-radius: 4px; color: var(--color-text-muted, #64748b);">
                  ${cls.examples}
                </span>
              </div>

              <div style="font-size: 0.875rem; color: var(--color-text, #334155); margin-bottom: 0.5rem;">
                <strong>Cơ chế tác dụng:</strong> ${cls.mechanism}
              </div>

              <div style="padding: 0.6rem 0.85rem; background: rgba(2, 132, 199, 0.05); border-left: 3px solid var(--color-primary, #0284c7); border-radius: 4px; font-size: 0.85rem; color: var(--color-text, #334155);">
                💡 <strong>Clinical Pearl:</strong> ${cls.clinicalPearls}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

// Global Interaction Handler
if (typeof window !== 'undefined') {
  (window as any).switchPharmOrgan = (id: string) => {
    const item = PHARMACOLOGY_APPROACH_DATA[id];
    const container = document.getElementById('pharmDetailContainer');
    if (item && container) {
      container.innerHTML = renderPharmContent(item);
    }
    document.querySelectorAll('.pharm-organ-btn').forEach(b => {
      (b as HTMLElement).style.background = 'transparent';
      (b as HTMLElement).style.color = 'var(--color-text, #334155)';
    });
    const cur = (event?.target as HTMLElement)?.closest('.pharm-organ-btn') as HTMLElement;
    if (cur) {
      cur.style.background = 'var(--color-primary, #0284c7)';
      cur.style.color = '#fff';
    }
  };
}
