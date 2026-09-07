/**
 * ABG Picker - DocSpace Feature
 * Tích hợp công cụ Phân Tích Khí Máu Động Mạch trực tiếp vào Case Logger
 */

export class AbgPicker {
  private modalEl: HTMLElement;
  private targetInputId: string = '';

  constructor() {
    this.modalEl = document.createElement('div');
    this.modalEl.id = 'modalAbgPicker';
    this.modalEl.style.display = 'none';
    this.modalEl.style.position = 'fixed';
    this.modalEl.style.inset = '0';
    this.modalEl.style.zIndex = '1000';
    this.modalEl.style.background = 'rgba(0,0,0,0.6)';
    this.modalEl.style.alignItems = 'center';
    this.modalEl.style.justifyContent = 'center';
    this.modalEl.style.padding = '20px';
    document.body.appendChild(this.modalEl);

    this.modalEl.addEventListener('mousedown', (e) => {
      if (e.target === this.modalEl) this.close();
    });
  }

  public open(targetInputId: string, initialText: string = '') {
    this.targetInputId = targetInputId;

    // Parse values from initial text if available
    const parsed = this.parseAbgFromText(initialText);

    this.modalEl.innerHTML = `
      <div style="background:var(--color-surface, #fff); width:100%; max-width:550px; border-radius:12px; display:flex; flex-direction:column; overflow:hidden; box-shadow:0 10px 25px rgba(0,0,0,0.2); border:1px solid var(--color-border);">
        <div style="padding:16px 20px; border-bottom:1px solid var(--color-border); display:flex; justify-content:space-between; align-items:center; background:var(--color-bg);">
          <h3 style="margin:0; font-size:18px; color:var(--color-primary); display:flex; align-items:center; gap:8px;">
            <i class="fa-solid fa-lungs" style="color:var(--color-danger);"></i> ABG Studio Side-Panel
          </h3>
          <button id="btnCloseAbgPicker" style="background:none; border:none; font-size:24px; cursor:pointer; color:var(--color-text-muted);">&times;</button>
        </div>

        <div style="padding:20px; max-height:75vh; overflow-y:auto;">
          <p style="margin-top:0; font-size:0.9rem; color:var(--color-text-muted);">
            Nhập hoặc kiểm tra thông số Khí máu động mạch để phân tích nhanh rối loạn Toan - Kiềm.
          </p>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:16px;">
            <div>
              <label style="font-weight:600; font-size:0.85rem; display:block; margin-bottom:4px;">pH <span style="color:red">*</span></label>
              <input type="number" step="0.01" id="abgPh" class="dsp-input" value="${parsed.ph ?? ''}" placeholder="7.35 - 7.45" />
            </div>
            <div>
              <label style="font-weight:600; font-size:0.85rem; display:block; margin-bottom:4px;">pCO2 (mmHg) <span style="color:red">*</span></label>
              <input type="number" step="0.1" id="abgPco2" class="dsp-input" value="${parsed.pco2 ?? ''}" placeholder="35 - 45" />
            </div>
            <div>
              <label style="font-weight:600; font-size:0.85rem; display:block; margin-bottom:4px;">HCO3- (mEq/L) <span style="color:red">*</span></label>
              <input type="number" step="0.1" id="abgHco3" class="dsp-input" value="${parsed.hco3 ?? ''}" placeholder="22 - 26" />
            </div>
            <div>
              <label style="font-weight:600; font-size:0.85rem; display:block; margin-bottom:4px;">Na+ (mEq/L)</label>
              <input type="number" step="1" id="abgNa" class="dsp-input" value="${parsed.na ?? ''}" placeholder="135 - 145" />
            </div>
            <div>
              <label style="font-weight:600; font-size:0.85rem; display:block; margin-bottom:4px;">Cl- (mEq/L)</label>
              <input type="number" step="1" id="abgCl" class="dsp-input" value="${parsed.cl ?? ''}" placeholder="98 - 106" />
            </div>
            <div>
              <label style="font-weight:600; font-size:0.85rem; display:block; margin-bottom:4px;">PaO2 (mmHg)</label>
              <input type="number" step="1" id="abgPao2" class="dsp-input" value="${parsed.pao2 ?? ''}" placeholder="80 - 100" />
            </div>
          </div>

          <div id="abgResultBox" style="display:none; background:var(--color-surface-offset, #f8fafc); border-left:4px solid var(--color-primary); padding:12px 16px; border-radius:6px; margin-top:16px;">
            <div style="font-weight:700; color:var(--color-primary); margin-bottom:4px;">Chẩn đoán Khí Máu:</div>
            <div id="abgResultText" style="font-size:0.95rem; font-weight:600; color:var(--color-text);"></div>
            <div id="abgDetailText" style="font-size:0.85rem; color:var(--color-text-muted); margin-top:4px;"></div>
          </div>
        </div>

        <div style="padding:12px 20px; border-top:1px solid var(--color-border); background:var(--color-bg); display:flex; justify-content:space-between; align-items:center;">
          <button id="btnAnalyzeAbgAction" class="dsp-btn dsp-btn-outline">
            <i class="fa-solid fa-calculator"></i> Phân tích
          </button>
          <button id="btnInsertAbgResult" class="dsp-btn dsp-btn-primary" disabled>
            <i class="fa-solid fa-download"></i> Chèn vào bệnh án
          </button>
        </div>
      </div>
    `;

    this.modalEl.style.display = 'flex';

    document.getElementById('btnCloseAbgPicker')?.addEventListener('click', () => this.close());
    
    const analyzeBtn = document.getElementById('btnAnalyzeAbgAction');
    const insertBtn = document.getElementById('btnInsertAbgResult') as HTMLButtonElement;

    analyzeBtn?.addEventListener('click', () => {
      const res = this.analyze();
      if (res && insertBtn) {
        insertBtn.disabled = false;
      }
    });

    insertBtn?.addEventListener('click', () => {
      const resultText = document.getElementById('abgResultText')?.innerText || '';
      const detailText = document.getElementById('abgDetailText')?.innerText || '';
      if (!resultText) return;

      const textarea = document.getElementById(this.targetInputId) as HTMLTextAreaElement;
      if (textarea) {
        const textToInsert = `\n[KQ ABG]: ${resultText}${detailText ? ` (${detailText})` : ''}\n`;
        const startPos = textarea.selectionStart;
        const endPos = textarea.selectionEnd;

        textarea.value = textarea.value.substring(0, startPos)
          + textToInsert
          + textarea.value.substring(endPos);

        textarea.focus();
      }

      this.close();
    });

    // Auto calculate if mandatory values exist
    if (parsed.ph && parsed.pco2 && parsed.hco3) {
      this.analyze();
      if (insertBtn) insertBtn.disabled = false;
    }
  }

  private close() {
    this.modalEl.style.display = 'none';
    this.modalEl.innerHTML = '';
  }

  private parseAbgFromText(text: string) {
    const phMatch = text.match(/pH\s*[:=]?\s*(\d+[\.,]?\d*)/i);
    const pco2Match = text.match(/pCO2\s*[:=]?\s*(\d+[\.,]?\d*)/i);
    const hco3Match = text.match(/HCO3-?\s*[:=]?\s*(\d+[\.,]?\d*)/i);
    const naMatch = text.match(/Na\+?\s*[:=]?\s*(\d+[\.,]?\d*)/i);
    const clMatch = text.match(/Cl-?\s*[:=]?\s*(\d+[\.,]?\d*)/i);
    const pao2Match = text.match(/PaO2\s*[:=]?\s*(\d+[\.,]?\d*)/i);

    return {
      ph: phMatch ? parseFloat(phMatch[1].replace(',', '.')) : null,
      pco2: pco2Match ? parseFloat(pco2Match[1].replace(',', '.')) : null,
      hco3: hco3Match ? parseFloat(hco3Match[1].replace(',', '.')) : null,
      na: naMatch ? parseFloat(naMatch[1].replace(',', '.')) : null,
      cl: clMatch ? parseFloat(clMatch[1].replace(',', '.')) : null,
      pao2: pao2Match ? parseFloat(pao2Match[1].replace(',', '.')) : null,
    };
  }

  private analyze() {
    const phVal = (document.getElementById('abgPh') as HTMLInputElement).value;
    const pco2Val = (document.getElementById('abgPco2') as HTMLInputElement).value;
    const hco3Val = (document.getElementById('abgHco3') as HTMLInputElement).value;
    const naVal = (document.getElementById('abgNa') as HTMLInputElement).value;
    const clVal = (document.getElementById('abgCl') as HTMLInputElement).value;
    const pao2Val = (document.getElementById('abgPao2') as HTMLInputElement).value;

    const ph = parseFloat(phVal);
    const pco2 = parseFloat(pco2Val);
    const hco3 = parseFloat(hco3Val);

    if (isNaN(ph) || isNaN(pco2) || isNaN(hco3)) {
      alert('Vui lòng nhập đầy đủ 3 chỉ số bắt buộc: pH, pCO2 và HCO3-');
      return null;
    }

    let disorder = '';
    let details: string[] = [];

    // Primary acid-base status
    if (ph < 7.35) {
      if (pco2 > 45 && hco3 < 22) {
        disorder = 'Toan hỗn hợp (Toan hô hấp + Toan chuyển hóa)';
      } else if (pco2 > 45) {
        disorder = 'Toan hô hấp';
        if (hco3 > 26) details.push('có đáp ứng bù trừ chuyển hóa');
      } else if (hco3 < 22) {
        disorder = 'Toan chuyển hóa';
        if (pco2 < 35) details.push('có đáp ứng bù trừ hô hấp');
      } else {
        disorder = 'Toan máu (chưa rõ nguyên nhân)';
      }
    } else if (ph > 7.45) {
      if (pco2 < 35 && hco3 > 26) {
        disorder = 'Kiềm hỗn hợp (Kiềm hô hấp + Kiềm chuyển hóa)';
      } else if (pco2 < 35) {
        disorder = 'Kiềm hô hấp';
        if (hco3 < 22) details.push('có đáp ứng bù trừ chuyển hóa');
      } else if (hco3 > 26) {
        disorder = 'Kiềm chuyển hóa';
        if (pco2 > 45) details.push('có đáp ứng bù trừ hô hấp');
      } else {
        disorder = 'Kiềm máu (chưa rõ nguyên nhân)';
      }
    } else {
      if (pco2 > 45 && hco3 > 26) {
        disorder = 'Rối loạn thăng bằng toan kiềm kép (Toan hô hấp + Kiềm chuyển hóa)';
      } else if (pco2 < 35 && hco3 < 22) {
        disorder = 'Rối loạn thăng bằng toan kiềm kép (Kiềm hô hấp + Toan chuyển hóa)';
      } else {
        disorder = 'Khí máu trong giới hạn bình thường';
      }
    }

    // Anion Gap calculation
    const na = parseFloat(naVal);
    const cl = parseFloat(clVal);
    if (!isNaN(na) && !isNaN(cl)) {
      const ag = na - (cl + hco3);
      if (ag > 12) {
        details.push(`Anion Gap tăng: ${ag.toFixed(1)} mEq/L`);
      } else {
        details.push(`Anion Gap bình thường: ${ag.toFixed(1)} mEq/L`);
      }
    }

    // Hypoxemia check
    const pao2 = parseFloat(pao2Val);
    if (!isNaN(pao2)) {
      if (pao2 < 60) {
        details.push(`Giảm Oxy máu nặng (PaO2: ${pao2} mmHg)`);
      } else if (pao2 < 80) {
        details.push(`Giảm Oxy máu nhẹ-trung bình (PaO2: ${pao2} mmHg)`);
      }
    }

    const resultBox = document.getElementById('abgResultBox');
    const resultText = document.getElementById('abgResultText');
    const detailText = document.getElementById('abgDetailText');

    if (resultBox && resultText && detailText) {
      resultBox.style.display = 'block';
      resultText.innerText = disorder;
      detailText.innerText = details.join('; ');
    }

    return { disorder, details };
  }
}

export const abgPicker = new AbgPicker();
