/**
 * CliniPortal — Dose Optimizer Wizard (TypeScript Module)
 */

interface DrugRecommendation {
  name: string;
  calc: (crcl: number, liverGrade?: string) => { status: 'status-normal' | 'status-reduced' | 'status-contraindicated'; text: string; note: string };
}

export const DRUG_RECS: Record<string, DrugRecommendation> = {
  enoxaparin: {
    name: 'Enoxaparin (LMWH)',
    calc: (crcl) => {
      if (crcl < 30) return { status: 'status-reduced', text: 'Giảm 50% liều: 1 mg/kg x 1 lần/ngày (thay vì 2 lần/ngày).', note: 'Thận trọng theo dõi chỉ số Anti-Xa.' };
      return { status: 'status-normal', text: 'Dùng liều chuẩn: 1 mg/kg x 2 lần/ngày.', note: 'Không cần điều chỉnh liều.' };
    }
  },
  metformin: {
    name: 'Metformin',
    calc: (crcl) => {
      if (crcl < 30) return { status: 'status-contraindicated', text: 'CHỐNG CHỈ ĐỊNH TUYỆT ĐỐI (eGFR < 30 ml/min).', note: 'Nguy cơ cao gây Toan Chuyển Hóa Lactic đe dọa tính mạng.' };
      if (crcl < 45) return { status: 'status-reduced', text: 'Giảm liều tối đa 1000 mg/ngày.', note: 'Không khởi trị mới khi eGFR 30-45.' };
      return { status: 'status-normal', text: 'Liều chuẩn 1500–2000 mg/ngày.', note: 'Theo dõi chức năng thận định kỳ.' };
    }
  },
  vancomycin: {
    name: 'Vancomycin',
    calc: (crcl) => {
      if (crcl < 30) return { status: 'status-reduced', text: 'Dùng liều nạp 20–35 mg/kg, sau đó chỉnh liều theo nồng độ đáy (Trough level).', note: 'Mục tiêu nồng độ đáy: 15–20 mcg/ml.' };
      return { status: 'status-normal', text: 'Liều chuẩn 15–20 mg/kg mỗi 8–12h.', note: 'Giám sát độc tính trên thận.' };
    }
  },
  digoxin: {
    name: 'Digoxin',
    calc: (crcl) => {
      if (crcl < 30) return { status: 'status-reduced', text: 'Giảm 50% liều duy trì: 0.0625 mg cách ngày.', note: 'Đo nồng độ Digoxin máu sau 7 ngày.' };
      return { status: 'status-normal', text: 'Liều 0.125–0.25 mg/ngày.', note: 'Duy trì Kali máu > 4.0 mEq/L.' };
    }
  },
  colchicine: {
    name: 'Colchicine',
    calc: (crcl) => {
      if (crcl < 30) return { status: 'status-reduced', text: 'Liều đợt gút cấp: 1.0 mg duy nhất, không lặp lại trong 2 tuần.', note: 'Tránh dùng chung với Verapamil/CYP3A4.' };
      return { status: 'status-normal', text: 'Liều đợt gút: 1.0 mg, sau 1h uống thêm 0.5 mg.', note: 'Không dùng quá 1.5mg/đợt.' };
    }
  },
  rivaroxaban: {
    name: 'Rivaroxaban (Xarelto)',
    calc: (crcl) => {
      if (crcl < 15) return { status: 'status-contraindicated', text: 'Chống chỉ định khi CrCl < 15 ml/min.', note: 'Nguy cơ tích lũy xuất huyết nặng.' };
      if (crcl < 50) return { status: 'status-reduced', text: 'Giảm liều Rung nhĩ xuống 15 mg x 1 lần/ngày.', note: 'Uống cùng bữa ăn tối.' };
      return { status: 'status-normal', text: 'Liều chuẩn Rung nhĩ: 20 mg x 1 lần/ngày.', note: 'Không cần chỉnh liều.' };
    }
  },
  allopurinol: {
    name: 'Allopurinol',
    calc: (crcl) => {
      if (crcl < 30) return { status: 'status-reduced', text: 'Khởi đầu liều thấp 50–100 mg/ngày.', note: 'Tránh hội chứng dị ứng Stevens-Johnson.' };
      return { status: 'status-normal', text: 'Khởi đầu 100 mg/ngày, dò liều đến Acid Uric < 6 mg/dL.', note: 'Uống nhiều nước.' };
    }
  },
  gabapentin: {
    name: 'Gabapentin',
    calc: (crcl) => {
      if (crcl < 30) return { status: 'status-reduced', text: 'Giảm liều: 300 mg x 1 lần/ngày hoặc cách ngày.', note: 'Đào thải 100% qua thận.' };
      return { status: 'status-normal', text: 'Liều 300–900 mg x 3 lần/ngày.', note: 'Chỉnh liều tăng dần.' };
    }
  }
};

export function calculateCockcroftGault(age: number, weight: number, scr: number, isFemale: boolean): number {
  if (scr <= 0) return 100;
  let crcl = ((140 - age) * weight) / (72 * scr);
  if (isFemale) crcl *= 0.85;
  return Math.round(crcl);
}

export function initDoseOptimizerWizard(): void {
  let selectedOptDrugs: string[] = [];

  function updateCrClDisplay(): number {
    const ageEl = document.getElementById('opt-age') as HTMLInputElement | null;
    const genderEl = document.getElementById('opt-gender') as HTMLSelectElement | null;
    const weightEl = document.getElementById('opt-weight') as HTMLInputElement | null;
    const scrEl = document.getElementById('opt-scr') as HTMLInputElement | null;
    const textEl = document.getElementById('calc-crcl-text');

    const age = parseFloat(ageEl?.value || '68');
    const gender = genderEl?.value || 'male';
    const weight = parseFloat(weightEl?.value || '60');
    const scr = parseFloat(scrEl?.value || '1.8');

    const crcl = calculateCockcroftGault(age, weight, scr, gender === 'female');
    if (textEl) textEl.textContent = `${crcl} ml/phút`;
    return crcl;
  }

  document.querySelectorAll('#opt-age, #opt-gender, #opt-weight, #opt-scr').forEach(el => {
    el.addEventListener('input', () => updateCrClDisplay());
    el.addEventListener('change', () => updateCrClDisplay());
  });
  updateCrClDisplay();

  document.querySelectorAll('.opt-drug-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-drug');
      if (!key) return;
      if (selectedOptDrugs.includes(key)) {
        selectedOptDrugs = selectedOptDrugs.filter(k => k !== key);
        btn.classList.remove('selected');
      } else {
        selectedOptDrugs.push(key);
        btn.classList.add('selected');
      }
    });
  });

  const step1 = document.getElementById('wizard-step-1');
  const step2 = document.getElementById('wizard-step-2');
  const step3 = document.getElementById('wizard-step-3');
  const badge = document.getElementById('wizard-step-badge');

  document.getElementById('btn-to-step-2')?.addEventListener('click', () => {
    if (step1 && step2 && badge) {
      step1.style.display = 'none';
      step2.style.display = 'block';
      badge.textContent = 'Bước 2 / 3: Chọn danh mục thuốc';
    }
  });

  document.getElementById('btn-back-to-1')?.addEventListener('click', () => {
    if (step1 && step2 && badge) {
      step2.style.display = 'none';
      step1.style.display = 'block';
      badge.textContent = 'Bước 1 / 3: Nhập thông số bệnh nhân';
    }
  });

  document.getElementById('btn-to-step-3')?.addEventListener('click', () => {
    const crcl = updateCrClDisplay();
    const liver = (document.getElementById('opt-liver') as HTMLSelectElement | null)?.value || 'A';
    const output = document.getElementById('opt-results-output');

    if (selectedOptDrugs.length === 0) {
      alert('Vui lòng chọn ít nhất 1 thuốc cần hiệu chỉnh liều.');
      return;
    }

    if (output) {
      output.innerHTML = selectedOptDrugs.map(drugKey => {
        const item = DRUG_RECS[drugKey];
        if (!item) return '';
        const rec = item.calc(crcl, liver);
        return `
          <div class="dose-result-card ${rec.status}" style="background:var(--color-surface); border:1px solid var(--color-divider); border-radius:8px; padding:1rem; margin-bottom:1rem;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
              <h5 style="margin:0; font-size:1rem; font-weight:700;">${item.name}</h5>
              <span class="status-badge ${rec.status}" style="font-size:0.75rem; font-weight:700; padding:0.2rem 0.5rem; border-radius:4px;">
                ${rec.status === 'status-normal' ? 'Liều Chuẩn' : rec.status === 'status-reduced' ? 'Giảm Liều' : 'Chống Chỉ Định'}
              </span>
            </div>
            <p style="margin:0 0 0.5rem; font-size:0.9rem; font-weight:600; color:var(--color-text);">${rec.text}</p>
            <p style="margin:0; font-size:0.8rem; color:var(--color-text-muted);">💡 <em>${rec.note}</em></p>
          </div>
        `;
      }).join('');
    }

    if (step2 && step3 && badge) {
      step2.style.display = 'none';
      step3.style.display = 'block';
      badge.textContent = 'Bước 3 / 3: Kết quả khuyến cáo liều';
    }
  });

  document.getElementById('btn-restart')?.addEventListener('click', () => {
    if (step1 && step3 && badge) {
      step3.style.display = 'none';
      step1.style.display = 'block';
      badge.textContent = 'Bước 1 / 3: Nhập thông số bệnh nhân';
      selectedOptDrugs = [];
      document.querySelectorAll('.opt-drug-btn').forEach(b => b.classList.remove('selected'));
    }
  });
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDoseOptimizerWizard);
  } else {
    initDoseOptimizerWizard();
  }
}
