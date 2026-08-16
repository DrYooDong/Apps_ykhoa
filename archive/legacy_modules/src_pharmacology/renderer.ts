/**
 * CliniPortal — Clinical Pharmacology Hub TypeScript Renderer & Controller
 */
import { DRUGS_DB_DATA } from './data';

const ANTIDOTE_DATA: Record<string, { title: string; type: string; antidote: string; mechanism: string; dose: string }> = {
  para: {
    title: "Ngộ Độc Paracetamol (Acetaminophen)",
    type: "Tổn thương hoại tử tế bào gan cấp do chất chuyển hóa độc NAPQI cạn kiệt Glutathione",
    antidote: "N-acetylcysteine (NAC / Mucomyst)",
    mechanism: "Phục hồi nguồn dự trữ Glutathione ở gan, kết hợp trực tiếp khử độc NAPQI thành chất không độc",
    dose: "Uống 140 mg/kg liều nạp, sau đó 70 mg/kg mỗi 4 giờ (tổng 17 liều); hoặc Phác đồ IV 3 túi 21 giờ (150 mg/kg trong 1h -> 50 mg/kg trong 4h -> 100 mg/kg trong 16h)"
  },
  opioids: {
    title: "Ngộ Độc Opioids (Morphine, Fentanyl, Heroin)",
    type: "Hội chứng Ức chế Thần kinh & Hô hấp (Tam chứng: Đồng tử co nhỏ như đầu đinh ghim, Thở chậm < 10 l/p, Hôn mê)",
    antidote: "Naloxone (Narcan)",
    mechanism: "Đối vận cạnh tranh thuần túy tại các thụ thể mu, kappa và delta opioid ở hệ thần kinh trung ương",
    dose: "0.04 - 0.4 mg IV/IM/SC/Khí dung, lặp lại mỗi 2-3 phút cho đến khi nhịp thở > 12 l/p; Cân nhắc truyền duy trì (2/3 liều hiệu quả mỗi giờ)"
  },
  benzo: {
    title: "Ngộ Độc Benzodiazepines (Diazepam, Midazolam)",
    type: "Ức chế TKTW, nói ngọng, mất điều hòa, ngủ gà sâu, huyết động và nhịp thở thường ổn định trừ khi phối hợp rượu/opioids",
    antidote: "Flumazenil (Anexate)",
    mechanism: "Đối kháng cạnh tranh đặc hiệu tại vị trí gắn benzodiazepine trên phức hợp thụ thể GABA-A",
    dose: "0.2 mg IV trong 30 giây. Nếu chưa đáp ứng, tiêm tiếp 0.3 mg sau 1 phút, sau đó 0.5 mg mỗi phút (tối đa 3 mg). Thận trọng nguy cơ co giật ở bệnh nhân nghiện BZD mạn"
  },
  beta: {
    title: "Ngộ Độc Thuốc Chẹn Beta (Beta-Blockers)",
    type: "Nhịp chậm xoang, Block nhĩ thất, Tụt huyết áp, Suy tim cấp, Co thắt phế quản, Hạ đường huyết (đặc biệt Propranolol qua HRB gây co giật)",
    antidote: "Glucagon & Liệu pháp Insulin Liều Cao (HIET)",
    mechanism: "Glucagon kích hoạt Adenylate cyclase qua thụ thể riêng không phụ thuộc Beta; Insulin liều cao cải thiện chuyển hóa glucose cơ tim và tăng co bóp",
    dose: "Glucagon 3 - 5 mg IV tiêm chậm 1-2 phút, sau đó truyền 2-5 mg/giờ; HIET: Bolus Regular Insulin 1 UI/kg + Glucose 50% 0.5g/kg, sau đó duy trì 0.5-1 UI/kg/h kèm truyền Glucose"
  },
  phospho: {
    title: "Ngộ Độc Hóa Chất Trừ Sâu Phospho Hữu Cơ & Carbamate",
    type: "Hội chứng cường Cholinergic cấp tính (Hội chứng Muscarinic SLUDGE, Hội chứng Nicotinic co giật cơ, Hội chứng TKTW)",
    antidote: "Atropine & Pralidoxime (PAM / 2-PAM)",
    mechanism: "Atropine ức chế cạnh tranh thụ thể Muscarinic; Pralidoxime tái hoạt hóa enzyme Acetylcholinesterase (AChE) trước khi xảy ra hiện tượng lão hóa (aging)",
    dose: "Atropine 2 - 5 mg IV mỗi 5-10 phút cho đến khi đạt tiêu chuẩn 'Atropin hóa' (phổi hết ran ẩm, đồng tử > 4mm, da khô, HR > 80); PAM 1-2g IV trong 30p, sau đó 500mg/h"
  },
  digoxin: {
    title: "Ngộ Độc Glycoside Tim (Digoxin)",
    type: "Loạn nhịp thất nguy hiểm (ngoại tâm thu thất đa ổ, nhịp nhanh thất hai hướng), Block AV, buồn nôn, rối loạn thị giác (nhìn thấy quầng vàng), Tăng Kali máu",
    antidote: "Kháng Thể Đặc Hiệu Digoxin (DigiFab / Digibind)",
    mechanism: "Phân tử kháng thể Fab gắn kết có ái lực cực cao với Digoxin tự do trong huyết tương, tạo phức hợp bất hoạt đào thải qua thận",
    dose: "Liều tính theo số lọ: N = [Nồng độ Digoxin (ng/mL) x Cân nặng (kg)] / 100; Hoặc dùng theo kinh nghiệm 10-20 lọ IV trong ngừng tim/đe dọa tính mạng"
  },
  co: {
    title: "Ngộ Độc Khí Monoxide Carbon (CO)",
    type: "Thiếu oxy mô tế bào nghiêm trọng, nhức đầu, buồn nôn, chóng mặt, co giật, hôn mê, toan lactic, tổn thương tim mạch (SpO2 thông thường giả tạo bình thường)",
    antidote: "Oxy Liều Cao 100% & Oxy Cao Áp (HBOT)",
    mechanism: "Tăng áp lực riêng phần Oxy hòa tan, rút ngắn thời gian bán thải của Carboxyhemoglobin (COHb) từ 320 phút xuống còn 80 phút (Oxy 100%) hoặc 20 phút (HBOT)",
    dose: "Oxy 100% qua mask có túi dự trữ không thở lại (Non-rebreather) 15 L/phút liên tục; Chỉ định HBOT (2.5 - 3.0 ATA) nếu COHb > 25%, phụ nữ mang thai, hôn mê hoặc tổn thương tim"
  },
  methanol: {
    title: "Ngộ Độc Cồn Công Nghiệp Methanol / Ethylene Glycol",
    type: "Toan chuyển hóa tăng Anion Gap rất nặng, tăng khoảng trống áp suất thẩm thấu, viêm thị thần kinh dẫn đến mù lòa (bão tuyết thị giác)",
    antidote: "Fomepizole (4-MP) hoặc Ethanol & Lọc Máu Khẩn Cấp",
    mechanism: "Ức chế cạnh tranh mạnh mẽ enzyme Alcohol Dehydrogenase (ADH), ngăn chặn chuyển hóa Methanol thành độc chất Axit Formic",
    dose: "Fomepizole: Liều nạp 15 mg/kg IV trong 30p, sau đó 10 mg/kg mỗi 12h; Hoặc Ethanol 20% liều nạp 4 mL/kg qua sonde dạ dày (duy trì nồng độ ethanol máu 100-150 mg/dL)"
  }
};

export function openDrugPassport(drugId: string): void {
  const drug = DRUGS_DB_DATA.find(d => d.id === drugId);
  if (!drug) return;

  let modal = document.getElementById('drug-passport-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'drug-passport-modal';
    modal.className = 'pharma-modal';
    document.body.appendChild(modal);
  }

  const indicationsHtml = drug.indications.map(ind => `<li>${ind}</li>`).join('');
  const adverseHtml = drug.adverseEffects.map(adv => `<li>${adv}</li>`).join('');
  const contraHtml = drug.contraindications.map(c => `<li>${c}</li>`).join('');

  modal.innerHTML = `
    <div class="pharma-modal-backdrop" onclick="document.getElementById('drug-passport-modal').classList.remove('active')"></div>
    <div class="pharma-modal-content" style="max-width: 680px; max-height: 85vh; overflow-y: auto;">
      <div class="pharma-modal-header" style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--color-divider); padding-bottom:1rem;">
        <div>
          <span class="badge" style="background:var(--color-primary); color:#fff;">${drug.category}</span>
          <h2 style="margin:0.25rem 0 0; font-size:1.25rem;">${drug.name}</h2>
          <small style="color:var(--color-text-muted);">Biệt dược: ${drug.brandNames.join(', ')} | Thai kỳ: <strong>${drug.pregnancyCategory}</strong></small>
        </div>
        <button class="btn-close" style="border:none; background:none; font-size:1.5rem; cursor:pointer;" onclick="document.getElementById('drug-passport-modal').classList.remove('active')">&times;</button>
      </div>
      <div class="pharma-modal-body" style="padding:1rem 0; font-size:0.9rem; line-height:1.5;">
        ${drug.blackBoxWarning ? `<div style="background:#fee2e2; border-left:4px solid #ef4444; padding:0.75rem; border-radius:4px; margin-bottom:1rem; color:#991b1b;"><strong>⚠️ CẢNH BÁO HỘP ĐEN (BLACK BOX WARNING):</strong> ${drug.blackBoxWarning}</div>` : ''}
        
        <h4 style="margin:0.75rem 0 0.25rem; color:var(--color-primary);">💊 Liều dùng & Cách dùng</h4>
        <p><strong>Người lớn:</strong> ${drug.dosage.standardAdult || 'Theo chỉ định chuyên khoa'}</p>
        ${drug.dosage.renalNote ? `<p style="background:var(--color-surface-2); padding:0.5rem; border-radius:4px;"><strong>Hiệu chỉnh liều thận:</strong> ${drug.dosage.renalNote}</p>` : ''}
        
        <h4 style="margin:0.75rem 0 0.25rem; color:var(--color-primary);">📋 Chỉ định lâm sàng</h4>
        <ul style="padding-left:1.25rem; margin:0;">${indicationsHtml}</ul>
        
        <h4 style="margin:0.75rem 0 0.25rem; color:#dc2626;">🚫 Chống chỉ định</h4>
        <ul style="padding-left:1.25rem; margin:0; color:#b91c1c;">${contraHtml}</ul>
        
        <h4 style="margin:0.75rem 0 0.25rem; color:var(--color-text);">⚠️ Tác dụng không mong muốn (ADR)</h4>
        <ul style="padding-left:1.25rem; margin:0;">${adverseHtml}</ul>
      </div>
    </div>
  `;

  modal.classList.add('active');
}

export function initEmergencyDosing(): void {
  const weightInput = document.getElementById('em-weight-input') as HTMLInputElement | null;
  const calcBtn = document.getElementById('em-calc-btn');
  const resultDiv = document.getElementById('em-dosing-result');

  if (!weightInput || !calcBtn || !resultDiv) return;

  calcBtn.addEventListener('click', () => {
    const w = parseFloat(weightInput.value);
    if (!w || w <= 0) {
      resultDiv.innerHTML = `<span style="color:#ef4444;">Vui lòng nhập cân nặng hợp lệ (> 0 kg)</span>`;
      return;
    }

    const adrenalineIm = (w >= 50) ? '0.5 mg (1/2 ống 1mg/1ml tiêm bắp sâu)' : `${(w * 0.01).toFixed(2)} mg IM (tương đương ${(w * 0.01).toFixed(2)} ml ống 1mg/ml)`;
    const paracetamol = `${Math.min(1000, Math.round(w * 15))} mg (10-15 mg/kg mỗi 4-6h, tối đa ${Math.min(4000, Math.round(w * 60))} mg/ngày)`;
    const bolusFluids = `${Math.round(w * 20)} - ${Math.round(w * 30)} mL NaCl 0.9% hoặc Ringer Lactate (20-30 ml/kg trong giờ đầu)`;

    resultDiv.innerHTML = `
      <div style="background:var(--color-surface-2); padding:1rem; border-radius:8px; border:1px solid var(--color-divider);">
        <p style="margin:0 0 0.5rem;"><strong>Adrenaline phản vệ (IM):</strong> <span style="color:#dc2626; font-weight:700;">${adrenalineIm}</span></p>
        <p style="margin:0 0 0.5rem;"><strong>Paracetamol hạ sốt/giảm đau:</strong> <span style="color:var(--color-primary); font-weight:700;">${paracetamol}</span></p>
        <p style="margin:0;"><strong>Bù dịch chống sốc ban đầu:</strong> <span style="font-weight:700;">${bolusFluids}</span></p>
      </div>
    `;
  });
}

export function initAntidotesWidget(): void {
  const btns = document.querySelectorAll<HTMLElement>('.antidote-item-btn');
  const detailsCard = document.getElementById('antidoteDetailsCard');
  if (!detailsCard || btns.length === 0) return;

  function showAntidote(key: string) {
    const data = ANTIDOTE_DATA[key];
    if (!data) return;

    btns.forEach(btn => {
      if (btn.getAttribute('data-toxic') === key) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    detailsCard!.innerHTML = `
      <div style="margin-bottom: 0.5rem;">
        <h4 style="color: var(--color-danger, #ef4444); font-weight: 700; margin: 0 0 0.25rem 0; font-size: 0.95rem;">${data.title}</h4>
        <p style="font-size: 0.75rem; color: var(--color-text-muted, #64748b); margin: 0;">${data.type}</p>
      </div>
      <div style="margin-bottom: 0.4rem; padding: 0.5rem; background: rgba(16,185,129,0.1); border-left: 3px solid #10b981; border-radius: 4px;">
        <strong style="color: #059669; font-size: 0.8rem;">🎯 Thuốc giải độc đặc hiệu:</strong>
        <p style="color: var(--color-text, #0f172a); font-weight: 700; margin: 0.1rem 0 0 0; font-size: 0.85rem;">${data.antidote}</p>
      </div>
      <div style="margin-bottom: 0.4rem; font-size: 0.75rem;">
        <strong style="color: var(--color-text, #0f172a);">Cơ chế tác dụng:</strong>
        <p style="color: var(--color-text-muted, #64748b); margin: 0.1rem 0 0 0;">${data.mechanism}</p>
      </div>
      <div style="font-size: 0.75rem; border-top: 1px dashed var(--color-border, #e2e8f0); padding-top: 0.4rem;">
        <strong style="color: var(--color-primary, #0284c7);">Liều dùng & Phác đồ cấp cứu:</strong>
        <p style="color: var(--color-text, #0f172a); font-weight: 500; margin: 0.1rem 0 0 0;">${data.dose}</p>
      </div>
    `;
  }

  showAntidote('para');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const toxicKey = btn.getAttribute('data-toxic');
      if (toxicKey) showAntidote(toxicKey);
    });
  });
}

export function initPharmaControls(): void {
  const searchInput = document.getElementById('lesson-search') as HTMLInputElement | null;
  const clearBtn = document.getElementById('clear-search') as HTMLElement | null;
  const emptyState = document.getElementById('empty-search-state') as HTMLElement | null;
  const viewGridBtn = document.getElementById('view-grid-btn') as HTMLElement | null;
  const viewListBtn = document.getElementById('view-list-btn') as HTMLElement | null;
  const container = document.getElementById('lessons-container') as HTMLElement | null;

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase().trim();
      if (clearBtn) clearBtn.style.display = query ? 'block' : 'none';

      const cards = document.querySelectorAll<HTMLElement>('.specialty-card');
      const sections = document.querySelectorAll<HTMLElement>('.main-section-group');
      let visibleCount = 0;

      cards.forEach(card => {
        const text = card.textContent?.toLowerCase() || '';
        const isMatch = !query || text.includes(query);
        card.style.display = isMatch ? 'flex' : 'none';
        if (isMatch) visibleCount++;
      });

      sections.forEach(sec => {
        const visibleInSec = sec.querySelectorAll('.specialty-card[style*="display: flex"], .specialty-card:not([style*="display: none"])');
        sec.style.display = visibleInSec.length > 0 ? 'block' : 'none';
      });

      if (emptyState) {
        emptyState.style.display = (visibleCount === 0 && query !== '') ? 'block' : 'none';
      }
    });

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        searchInput.dispatchEvent(new Event('input'));
        searchInput.focus();
      });
    }
  }

  if (viewGridBtn && viewListBtn && container) {
    viewGridBtn.addEventListener('click', () => {
      viewGridBtn.classList.add('active');
      viewListBtn.classList.remove('active');
      container.classList.remove('view-list-mode');
    });

    viewListBtn.addEventListener('click', () => {
      viewListBtn.classList.add('active');
      viewGridBtn.classList.remove('active');
      container.classList.add('view-list-mode');
    });
  }

  const navItems = document.querySelectorAll<HTMLElement>('.part-nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = item.getAttribute('data-target');
      if (!targetId) return;
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
      }
    });
  });
}

export function initPharmacologyHub(): void {
  initAntidotesWidget();
  initPharmaControls();
  initEmergencyDosing();

  if (typeof window !== 'undefined') {
    (window as any).openDrugPassport = openDrugPassport;
  }
}
