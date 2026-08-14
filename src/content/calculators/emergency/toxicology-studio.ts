/**
 * CliniPortal — Clinical Toxicology & Antidote Studio (TypeScript Module)
 * Toxidromes recognition, Antidote formulation, PSS Severity grading (WHO/IPCS), Decontamination & Dialysis STUMBLE criteria, Interactive Clinical Simulation
 */

export interface ToxidromeDefinition {
  name: string;
  color: string;
  traits: string[];
  drugs: string;
  mnemonics: string;
}

export const TOXIDROMES: Record<string, ToxidromeDefinition> = {
  anticholinergic: {
    name: 'Anticholinergic Toxidrome',
    color: '#8b5cf6',
    traits: ['tachycardia', 'mydriasis', 'drySkin', 'agitation', 'hyperthermia'],
    drugs: 'Atropine, Antihistamines, TCA, Phenothiazines.',
    mnemonics: 'Blind as a bat, Mad as a hatter, Red as a beet, Hot as a hare, Dry as a bone.'
  },
  cholinergic: {
    name: 'Cholinergic Toxidrome (SLUDGE)',
    color: '#dc2626',
    traits: ['bradycardia', 'miosis', 'diaphoresis', 'salivation', 'respDepression', 'fasciculations'],
    drugs: 'Thuốc trừ sâu Phospho hữu cơ, Carbamate.',
    mnemonics: 'SLUDGE: Salivation, Lacrimation, Urination, Defecation, GI distress, Emesis.'
  },
  opioid: {
    name: 'Opioid Toxidrome',
    color: '#0284c7',
    traits: ['bradycardia', 'hypotension', 'miosis', 'sedation', 'respDepression'],
    drugs: 'Morphine, Heroin, Fentanyl, Methadone.',
    mnemonics: 'Tam chứng ngộ độc: Co đồng tử + Suy hô hấp + Ức chế thần kinh trung ương.'
  },
  sympathomimetic: {
    name: 'Sympathomimetic Toxidrome',
    color: '#d97706',
    traits: ['tachycardia', 'hypertension', 'mydriasis', 'diaphoresis', 'agitation', 'hyperthermia'],
    drugs: 'Amphetamine, Cocaine, Ecstasy.',
    mnemonics: 'Mạch nhanh + HA cao + Vã mồ hôi + Giãn đồng tử.'
  }
};

let currentScenario: string | null = null;

export function setScenario(sc: string): void {
  currentScenario = sc;

  document.querySelectorAll('.fluid-sc-btn').forEach(btn => btn.classList.remove('active'));
  const scMap: Record<string, string> = {
    TOXIDROME: 'sc-toxidrome',
    ANTIDOTE: 'sc-antidote',
    SEVERITY: 'sc-severity',
    DECON: 'sc-decon',
    SIMULATOR: 'sc-simulator'
  };

  const btnEl = scMap[sc] ? document.getElementById(scMap[sc]) : null;
  if (btnEl) btnEl.classList.add('active');

  const emptyInp = document.getElementById('group-empty-input');
  const toxGrp = document.getElementById('group-toxidrome');
  const antiGrp = document.getElementById('group-antidote');
  const sevGrp = document.getElementById('group-severity');
  const decGrp = document.getElementById('group-decon');
  const simGrp = document.getElementById('group-simulator');

  if (emptyInp) emptyInp.style.display = 'none';
  if (toxGrp) toxGrp.style.display = sc === 'TOXIDROME' ? 'block' : 'none';
  if (antiGrp) antiGrp.style.display = sc === 'ANTIDOTE' ? 'block' : 'none';
  if (sevGrp) sevGrp.style.display = sc === 'SEVERITY' ? 'block' : 'none';
  if (decGrp) decGrp.style.display = sc === 'DECON' ? 'block' : 'none';
  if (simGrp) simGrp.style.display = sc === 'SIMULATOR' ? 'block' : 'none';

  const resEmpty = document.getElementById('result-empty');
  const resContent = document.getElementById('result-content');
  if (resEmpty) resEmpty.style.display = 'none';
  if (resContent) resContent.style.display = 'block';

  calculate();
}

export function calculate(): void {
  if (!currentScenario) return;

  const resContainer = document.getElementById('result-content');
  if (!resContainer) return;
  let html = '';

  if (currentScenario === 'TOXIDROME') {
    const checkBoxes = document.querySelectorAll('.tox-chk') as NodeListOf<HTMLInputElement>;
    const selected: string[] = [];
    checkBoxes.forEach(c => {
      if (c.checked) {
        const sym = c.getAttribute('data-symptom');
        if (sym) selected.push(sym);
      }
    });

    if (selected.length === 0) {
      html = `<div class="tox-alert tox-alert-info">👈 Chọn các triệu chứng lâm sàng ở cột bên trái để hệ thống tự động phân tích Toxidrome.</div>`;
    } else {
      const scores: Array<ToxidromeDefinition & { pct: number }> = [];
      Object.keys(TOXIDROMES).forEach(key => {
        const tox = TOXIDROMES[key];
        let matched = 0;
        tox.traits.forEach(t => {
          if (selected.includes(t)) matched++;
        });
        const pct = Math.round((matched / tox.traits.length) * 100);
        if (pct > 0) scores.push({ ...tox, pct });
      });
      scores.sort((a, b) => b.pct - a.pct);

      if (scores.length === 0) {
        html = `<div class="tox-alert tox-alert-warning">Chưa tìm thấy Toxidrome điển hình.</div>`;
      } else {
        html += `<h3 style="margin-bottom:1rem; font-size:1.1rem; color:var(--color-text); font-weight:700;"><i class="fa-solid fa-bullseye text-primary"></i> Kết Quả Phân Tích</h3>`;
        scores.forEach(item => {
          html += `
            <div style="margin-bottom: 1rem; padding: 1rem; border: 1px solid var(--color-border); border-radius: 8px; background: var(--color-bg);">
              <div style="display:flex; justify-content:space-between; margin-bottom: 8px;">
                <strong style="color:${item.color}">${item.name}</strong>
                <span style="font-weight:700; color:${item.color}">${item.pct}% Khớp</span>
              </div>
              <div style="width:100%; height:8px; background:var(--color-surface); border-radius:4px; margin-bottom:8px;">
                <div style="width:${item.pct}%; height:100%; background:${item.color}; border-radius:4px;"></div>
              </div>
              <div style="font-size:0.85rem; color:var(--color-text-muted);">
                <strong>💊 Độc chất:</strong> ${item.drugs}<br>
                <strong>💡 Lưu ý:</strong> ${item.mnemonics}
              </div>
            </div>`;
        });
      }
    }
  } else if (currentScenario === 'ANTIDOTE') {
    const typeSelect = document.getElementById('antidote-select') as HTMLSelectElement | null;
    const weightInput = document.getElementById('pt-weight') as HTMLInputElement | null;
    const type = typeSelect?.value || 'nac';
    const w = parseFloat(weightInput?.value || '60') || 60;

    html += `<h3 style="margin-bottom:1rem; font-size:1.1rem; color:var(--color-text); font-weight:700;"><i class="fa-solid fa-file-medical text-primary"></i> Y Lệnh & Hướng Dẫn Pha Thuốc</h3>`;

    let rxContent = '';
    if (type === 'nac') {
      rxContent = `
        <strong>🧪 PHÁC ĐỒ N-ACETYLCYSTEINE (NAC) 21 GIỜ:</strong><br><br>
        🔴 <strong>TÚI 1 (150 mg/kg):</strong> ${Math.round(150 * w)} mg pha 200mL D5W ➔ Truyền 1 GIỜ.<br>
        🟡 <strong>TÚI 2 (50 mg/kg):</strong> ${Math.round(50 * w)} mg pha 500mL D5W ➔ Truyền 4 GIỜ.<br>
        🟢 <strong>TÚI 3 (100 mg/kg):</strong> ${Math.round(100 * w)} mg pha 1000mL D5W ➔ Truyền 16 GIỜ.`;
    } else if (type === 'atropine_pam') {
      rxContent = `
        <strong>🧪 ATROPINE & PAM (PHOSPHO HỮU CƠ):</strong><br><br>
        • <strong>Atropine:</strong> 2-5 mg IV mỗi 5-10 phút đến khi Atropin hóa.<br>
        • <strong>PAM:</strong> Liều nạp ${Math.min(2000, Math.round(30 * w))} mg IV trong 30 phút. Duy trì ${Math.round(8 * w)} mg/h.`;
    } else if (type === 'naloxone') {
      rxContent = `<strong>🧪 NALOXONE (OPIOID):</strong><br>• Liều: 0.4 - 2.0 mg IV/IM. Lặp lại mỗi 2-3 phút đến khi nhịp thở > 12 lần/phút.`;
    } else if (type === 'flumazenil') {
      rxContent = `<strong>🧪 FLUMAZENIL (BENZODIAZEPINE):</strong><br>• Liều khởi đầu: 0.2 mg IV. Lặp lại 0.3 - 0.5 mg nếu cần.<br>⚠️ Chống chỉ định nếu kèm ngộ độc TCA (nguy cơ co giật).`;
    } else if (type === 'digifab') {
      rxContent = `<strong>🧪 DIGIFAB (DIGOXIN):</strong><br>• Không rõ nồng độ (ngộ độc cấp): 10 - 20 lọ IV.<br>• Ngộ độc mạn: 3 - 6 lọ IV.`;
    } else if (type === 'methylene_blue') {
      rxContent = `<strong>🧪 METHYLENE BLUE 1% (METHEMOGLOBIN):</strong><br>• Liều 1-2 mg/kg ➔ <strong>${(1.5 * w).toFixed(1)} mL</strong> tiêm chậm tĩnh mạch.`;
    } else if (type === 'lipid_ile') {
      rxContent = `<strong>🧪 LIPID 20% (LAST):</strong><br>• Bolus: 1.5 mL/kg ➔ <strong>${(1.5 * w).toFixed(0)} mL</strong> IV.<br>• Duy trì: 0.25 mL/kg/min ➔ ${(0.25 * w).toFixed(1)} mL/phút.`;
    } else if (type === 'nahco3') {
      rxContent = `<strong>🧪 NaHCO3 8.4% (TCA/KIỀM HÓA):</strong><br>• Liều Bolus: 1-2 mEq/kg ➔ <strong>${Math.round(1.5 * w)} mL</strong> tĩnh mạch chậm.`;
    }

    html += `<div class="tox-alert tox-alert-success" style="font-size:0.95rem;">${rxContent}</div>`;
  } else if (currentScenario === 'SEVERITY') {
    const fields = document.querySelectorAll('.pss-field') as NodeListOf<HTMLSelectElement>;
    let maxGrade = 0;
    fields.forEach(f => {
      const v = parseInt(f.value, 10);
      if (v > maxGrade) maxGrade = v;
    });

    const mapping = [
      { t: 'Grade 0 (Bình thường)', c: 'var(--tx-success, #16a34a)', b: 'tox-alert-success', txt: 'Theo dõi sinh hiệu 6-12 giờ tại Cấp cứu.' },
      { t: 'Grade 1 (Ngộ độc nhẹ)', c: 'var(--tx-info, #0284c7)', b: 'tox-alert-info', txt: 'Theo dõi sát sinh hiệu. Điều trị triệu chứng.' },
      { t: 'Grade 2 (Ngộ độc vừa)', c: 'var(--tx-warning, #d97706)', b: 'tox-alert-warning', txt: 'Cần theo dõi sát. Dùng thuốc giải độc đặc hiệu nếu có chỉ định.' },
      { t: 'Grade 3 (Đe dọa tử vong)', c: 'var(--tx-danger, #dc2626)', b: 'tox-alert-danger', txt: '🔴 CHỈ ĐỊNH NHẬP ICU KHẨN CẤP. Hồi sức tuần hoàn, hô hấp tích cực.' }
    ];

    const res = mapping[maxGrade] || mapping[0];
    html = `
      <h3 style="margin-bottom:1rem; font-size:1.1rem; color:var(--color-text); font-weight:700;"><i class="fa-solid fa-stethoscope text-primary"></i> Kết quả phân tầng (WHO/IPCS)</h3>
      <div style="font-size:1.25rem; font-weight:800; color:${res.c}; margin-bottom:1rem;">${res.t}</div>
      <div class="tox-alert ${res.b}">${res.txt}</div>
    `;
  } else if (currentScenario === 'DECON') {
    html = `
      <h3 style="margin-bottom:1rem; font-size:1.1rem; color:var(--color-text); font-weight:700;"><i class="fa-solid fa-filter text-primary"></i> Khử độc & Tăng thải</h3>
      <div class="tox-alert tox-alert-warning">
        <strong>1. Than Hoạt Tính (Activated Charcoal):</strong><br>
        • Liều: 1 g/kg (tối đa 50g) pha 200mL nước uống hoặc qua Sonde dạ dày.<br>
        • Chỉ định tốt nhất: &lt; 1-2 giờ sau uống độc chất.<br>
        • Chống chỉ định: Hóa chất ăn mòn, kim loại nặng, rượu, hôn mê không bảo vệ đường thở.
      </div>
      <div class="tox-alert tox-alert-info">
        <strong>2. Rửa Dạ Dày (Gastric Lavage):</strong><br>
        • Chỉ nên thực hiện trong vòng 1 GIỜ đầu với lượng độc chất đe dọa tính mạng.<br>
        • Đặt nghiêng trái đầu thấp, dùng NS ấm.
      </div>
      <div class="tox-alert tox-alert-danger">
        <strong>3. Lọc Máu (HD):</strong><br>
        • STUMBLE: Salicylates, Theophylline, Uremia, Methanol, Barbiturates, Lithium, Ethylene glycol.<br>
        • KHÔNG lọc máu: TCA, Digoxin, Benzodiazepine (do Vd lớn / gắn protein cao).
      </div>
    `;
  } else if (currentScenario === 'SIMULATOR') {
    html = `
      <h3 style="margin-bottom:1rem; font-size:1.1rem; color:var(--color-text); font-weight:700;"><i class="fa-solid fa-user-doctor text-primary"></i> Ca Lâm Sàng 1</h3>
      <p style="font-size:0.9rem; line-height:1.5; margin-bottom:1rem;">
        <strong>Bệnh sử:</strong> Nam 22 tuổi hôn mê, bên cạnh có vỏ thuốc. GCS 8 điểm. Mạch 52 lần/phút, HA 90/60, Thở 8 lần/phút. Đồng tử co nhỏ (1.5mm).
      </p>
      <div style="font-weight:600; margin-bottom:0.75rem;">❓ Toxidrome nghi ngờ & Thuốc giải độc?</div>
      <div id="sim-options">
        <button class="case-option-btn" id="btn-opt-a">A. Anticholinergic — Physostigmine</button>
        <button class="case-option-btn" id="btn-opt-b">B. Opioid Toxidrome — Naloxone 0.4 - 2 mg IV</button>
        <button class="case-option-btn" id="btn-opt-c">C. Cholinergic — Atropine</button>
      </div>
      <div id="sim-feedback" style="display:none; margin-top:1rem;"></div>
    `;
  }

  resContainer.innerHTML = html;

  if (currentScenario === 'SIMULATOR') {
    const btnA = document.getElementById('btn-opt-a');
    const btnB = document.getElementById('btn-opt-b');
    const btnC = document.getElementById('btn-opt-c');
    if (btnA) btnA.addEventListener('click', () => checkSim(false, btnA));
    if (btnB) btnB.addEventListener('click', () => checkSim(true, btnB));
    if (btnC) btnC.addEventListener('click', () => checkSim(false, btnC));
  }
}

export function checkSim(isCorrect: boolean, btn: HTMLElement): void {
  const container = document.getElementById('sim-options');
  if (container) {
    container.querySelectorAll('.case-option-btn').forEach(b => {
      b.classList.remove('correct', 'wrong');
    });
  }

  const feedback = document.getElementById('sim-feedback');
  if (feedback) {
    feedback.style.display = 'block';

    if (isCorrect) {
      btn.classList.add('correct');
      feedback.className = 'tox-alert tox-alert-success';
      feedback.innerHTML = '🎉 <strong>CHÍNH XÁC!</strong> Bệnh nhân có tam chứng ngộ độc Opioid: Co đồng tử + Suy hô hấp + Hôn mê. Giải độc bằng Naloxone.';
    } else {
      btn.classList.add('wrong');
      feedback.className = 'tox-alert tox-alert-danger';
      feedback.innerHTML = '❌ <strong>CHƯA ĐÚNG!</strong> Vui lòng xem kỹ dấu hiệu đồng tử co nhỏ và nhịp thở chậm.';
    }
  }
}

export function resetForm(): void {
  document.querySelectorAll('input[type="number"]').forEach(el => {
    const numEl = el as HTMLInputElement;
    numEl.value = numEl.defaultValue || '60';
  });
  document.querySelectorAll('select').forEach(el => {
    (el as HTMLSelectElement).selectedIndex = 0;
  });
  document.querySelectorAll('input[type="checkbox"]').forEach(el => {
    (el as HTMLInputElement).checked = false;
  });

  currentScenario = null;
  document.querySelectorAll('.fluid-sc-btn').forEach(btn => btn.classList.remove('active'));

  const emptyInp = document.getElementById('group-empty-input');
  const toxGrp = document.getElementById('group-toxidrome');
  const antiGrp = document.getElementById('group-antidote');
  const sevGrp = document.getElementById('group-severity');
  const decGrp = document.getElementById('group-decon');
  const simGrp = document.getElementById('group-simulator');

  if (emptyInp) emptyInp.style.display = 'block';
  if (toxGrp) toxGrp.style.display = 'none';
  if (antiGrp) antiGrp.style.display = 'none';
  if (sevGrp) sevGrp.style.display = 'none';
  if (decGrp) decGrp.style.display = 'none';
  if (simGrp) simGrp.style.display = 'none';

  const resEmpty = document.getElementById('result-empty');
  const resContent = document.getElementById('result-content');
  if (resEmpty) resEmpty.style.display = 'flex';
  if (resContent) resContent.style.display = 'none';
}

export function initToxicologyStudio(): void {
  const scButtons = document.querySelectorAll('.fluid-sc-btn');
  scButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const sc = btn.getAttribute('data-sc');
      if (sc) setScenario(sc);
    });
  });

  const inputs = document.querySelectorAll('.tox-chk, #antidote-select, #pt-weight, .pss-field');
  inputs.forEach(inp => {
    inp.addEventListener('input', calculate);
    inp.addEventListener('change', calculate);
  });

  const btnReset = document.getElementById('btn-reset-form');
  if (btnReset) btnReset.addEventListener('click', resetForm);
}

// Global binding
if (typeof window !== 'undefined') {
  const win = window as any;
  win.setScenario = setScenario;
  win.calculateToxicology = calculate;
  win.checkSim = checkSim;
  win.resetToxicologyForm = resetForm;
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initToxicologyStudio);
  } else {
    initToxicologyStudio();
  }
}
