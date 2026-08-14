/**
 * CliniPortal — Clinical Pharmacology Hub TypeScript Renderer & Controller
 */
import { DRUGS_DB_DATA, DRUG_INTERACTIONS_DATA, ANTIDOTE_PROTOCOLS, PK_DATABASE } from './data';
import { Drug, AntidoteProtocol } from './types';

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

export function initPharmaSearch(): void {
  const searchInput = document.getElementById('lesson-search') as HTMLInputElement | null;
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const query = (e.target as HTMLInputElement).value.toLowerCase().trim();
    const cards = document.querySelectorAll('.specialty-card, .tool-quick-card');

    cards.forEach(card => {
      const text = card.textContent?.toLowerCase() || '';
      if (text.includes(query)) {
        (card as HTMLElement).style.display = 'flex';
      } else {
        (card as HTMLElement).style.display = 'none';
      }
    });
  });
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

export function initPharmacologyHub(): void {
  initPharmaSearch();
  initEmergencyDosing();

  // Expose global modal opener for any inline onclick
  if (typeof window !== 'undefined') {
    (window as any).openDrugPassport = openDrugPassport;
  }
}
