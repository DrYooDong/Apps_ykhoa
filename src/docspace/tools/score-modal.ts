/**
 * DocSpace — Reusable Native Score & Calculator Modal
 * Cho phép tra cứu, tính toán và chèn thang điểm trực tiếp vào SOAP / Case Logger
 */

import { toolRegistry } from './registry';
import { BaseCalculator, CalculatorResult } from './types';
import { SoapPatientRecord } from '../types';
import { escapeHtml } from '../docspace-view';

export interface ScoreModalOptions {
  patient?: SoapPatientRecord;
  targetFieldId?: string;
  onInsert?: (resultText: string) => void;
}

let scoreModalEl: HTMLElement | null = null;

export function openScorePickerModal(options?: ScoreModalOptions): void {
  if (!scoreModalEl) {
    scoreModalEl = document.createElement('div');
    scoreModalEl.id = 'modalScorePickerRoot';
    document.body.appendChild(scoreModalEl);
  }

  const calculators = toolRegistry.getAll();
  const specialties = toolRegistry.getSpecialties();

  scoreModalEl.style.display = 'flex';
  scoreModalEl.style.position = 'fixed';
  scoreModalEl.style.inset = '0';
  scoreModalEl.style.zIndex = '1060';
  scoreModalEl.style.background = 'rgba(0,0,0,0.65)';
  scoreModalEl.style.alignItems = 'center';
  scoreModalEl.style.justifyContent = 'center';
  scoreModalEl.style.padding = '1rem';
  scoreModalEl.style.backdropFilter = 'blur(4px)';

  scoreModalEl.innerHTML = `
    <div class="dsp-modal-dialog" style="background:var(--color-surface); width:100%; max-width:780px; max-height:90vh; border-radius:14px; display:flex; flex-direction:column; overflow:hidden; box-shadow:0 25px 50px -12px rgba(0,0,0,0.35); border:1px solid var(--color-border);">
      
      <!-- Modal Header -->
      <div style="padding:1rem 1.25rem; border-bottom:1px solid var(--color-border); display:flex; justify-content:space-between; align-items:center; background:var(--color-bg);">
        <div style="display:flex; align-items:center; gap:10px;">
          <div style="width:34px; height:34px; border-radius:8px; background:rgba(14,165,233,0.15); color:var(--dsp-sky); display:flex; align-items:center; justify-content:center; font-size:1.1rem;">
            <i class="fa-solid fa-calculator"></i>
          </div>
          <div>
            <h3 style="margin:0; font-size:16px; font-weight:800; color:var(--color-text);">Kho Thang Điểm Lâm Sàng (Native Calculators)</h3>
            <p style="margin:2px 0 0 0; font-size:12px; color:var(--color-text-muted);">Tính toán phân tầng nguy cơ &amp; Chèn kết quả vào bệnh án</p>
          </div>
        </div>
        <button type="button" class="dsp-btn dsp-btn-ghost dsp-btn-sm" id="btnCloseScorePickerModal" style="padding:4px 8px; border-radius:6px;">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>

      <!-- Search & Filters -->
      <div style="padding:10px 1.25rem; background:var(--color-surface); border-bottom:1px solid var(--color-border); display:flex; flex-direction:column; gap:8px;">
        <div style="position:relative;">
          <i class="fa-solid fa-magnifying-glass" style="position:absolute; left:12px; top:50%; transform:translateY(-50%); color:var(--color-text-muted); font-size:13px;"></i>
          <input type="text" id="scorePickerSearchInput" class="dsp-input" placeholder="Tìm thang điểm (CURB-65, eGFR, NIHSS, Wells, Child-Pugh, GCS, qSOFA, ABG)..." style="padding-left:34px; font-size:13px;" />
        </div>

        <div style="display:flex; gap:6px; overflow-x:auto; padding-bottom:2px; scrollbar-width:thin;" id="scorePickerSpecialtyChips">
          <button type="button" class="dsp-btn dsp-btn-sm score-spec-chip active" data-spec="all" style="font-size:11px; font-weight:700; border-radius:14px; padding:2px 10px; background:var(--color-primary); color:#fff; border-color:var(--color-primary);">
            Tất cả (${calculators.length})
          </button>
          ${specialties.map(s => `
            <button type="button" class="dsp-btn dsp-btn-sm dsp-btn-outline score-spec-chip" data-spec="${s.id}" style="font-size:11px; font-weight:600; border-radius:14px; padding:2px 10px; white-space:nowrap;">
              <i class="fa-solid ${s.icon}"></i> ${s.label}
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Body: Calculator List & Active Form Pane -->
      <div style="display:flex; flex:1; overflow:hidden; min-height:360px;">
        
        <!-- Left: List -->
        <div id="scorePickerList" style="width:40%; border-right:1px solid var(--color-border); overflow-y:auto; padding:10px; display:flex; flex-direction:column; gap:6px; background:var(--color-bg);">
          ${calculators.map(c => `
            <div class="score-picker-item" data-id="${c.id}" data-spec="${c.specialty}" data-name="${c.name.toLowerCase()}" data-short="${c.shortName.toLowerCase()}" style="padding:10px 12px; background:var(--color-surface); border:1px solid var(--color-border); border-radius:8px; cursor:pointer; transition:all 0.15s ease;">
              <div style="font-weight:700; font-size:13px; color:var(--color-text); margin-bottom:2px;">${escapeHtml(c.shortName)}</div>
              <div style="font-size:11px; color:var(--color-text-muted); line-height:1.3; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${escapeHtml(c.description)}</div>
              <span style="display:inline-block; font-size:10px; padding:1px 6px; border-radius:4px; margin-top:4px; background:rgba(14,165,233,0.1); color:var(--dsp-sky); font-weight:600;">${c.specialtyLabel}</span>
            </div>
          `).join('')}
        </div>

        <!-- Right: Active Calculation Form -->
        <div id="scorePickerActiveForm" style="width:60%; overflow-y:auto; padding:1.25rem; background:var(--color-surface);">
          <div style="text-align:center; padding:50px 20px; color:var(--color-text-muted);">
            <i class="fa-solid fa-calculator" style="font-size:36px; margin-bottom:12px; color:var(--color-border);"></i>
            <div style="font-weight:600; font-size:14px;">Chọn một thang điểm bên trái để tính toán</div>
          </div>
        </div>

      </div>

    </div>
  `;

  const close = () => {
    if (scoreModalEl) scoreModalEl.style.display = 'none';
  };

  scoreModalEl.addEventListener('click', (e) => {
    if (e.target === scoreModalEl) close();
  });

  document.getElementById('btnCloseScorePickerModal')?.addEventListener('click', close);

  // Search & Filter
  const searchInp = document.getElementById('scorePickerSearchInput') as HTMLInputElement;
  const items = scoreModalEl.querySelectorAll<HTMLElement>('.score-picker-item');
  const specChips = scoreModalEl.querySelectorAll<HTMLElement>('.score-spec-chip');

  let currentSpec = 'all';

  const filterItems = () => {
    const q = (searchInp?.value || '').toLowerCase().trim();
    items.forEach(it => {
      const name = it.getAttribute('data-name') || '';
      const short = it.getAttribute('data-short') || '';
      const spec = it.getAttribute('data-spec') || '';

      const matchText = !q || name.includes(q) || short.includes(q);
      const matchSpec = currentSpec === 'all' || spec === currentSpec;

      it.style.display = matchText && matchSpec ? 'block' : 'none';
    });
  };

  searchInp?.addEventListener('input', filterItems);

  specChips.forEach(chip => {
    chip.addEventListener('click', () => {
      specChips.forEach(c => {
        c.classList.remove('active');
        c.style.background = 'var(--color-surface)';
        c.style.color = 'var(--color-text)';
        c.style.borderColor = 'var(--color-border)';
      });

      chip.classList.add('active');
      chip.style.background = 'var(--color-primary)';
      chip.style.color = '#fff';
      chip.style.borderColor = 'var(--color-primary)';

      currentSpec = chip.getAttribute('data-spec') || 'all';
      filterItems();
    });
  });

  // Select Calculator & Mount Form
  items.forEach(it => {
    it.addEventListener('click', () => {
      items.forEach(i => {
        i.style.borderColor = 'var(--color-border)';
        i.style.background = 'var(--color-surface)';
      });

      it.style.borderColor = 'var(--color-primary)';
      it.style.background = 'rgba(2,132,199,0.06)';

      const calcId = it.getAttribute('data-id');
      if (calcId) mountActiveCalcForm(calcId, options, close);
    });
  });

  // Tự động mở calculator đầu tiên
  if (items[0]) {
    items[0].click();
  }
}

function mountActiveCalcForm(calcId: string, options?: ScoreModalOptions, onClose?: () => void): void {
  const calc = toolRegistry.get(calcId);
  const container = document.getElementById('scorePickerActiveForm');
  if (!calc || !container) return;

  // Autofill nếu có thông tin patient
  const autofillValues = options?.patient && calc.autofillFromPatient ? calc.autofillFromPatient(options.patient) : {};

  container.innerHTML = `
    <div style="margin-bottom:1rem;">
      <h4 style="margin:0 0 4px 0; font-size:15px; font-weight:800; color:var(--color-text);">${escapeHtml(calc.name)}</h4>
      <div style="font-size:12px; color:var(--color-text-muted);">${escapeHtml(calc.description)}</div>
    </div>

    <form id="scoreActivePickerForm" class="dsp-form" novalidate>
      <div style="display:flex; flex-direction:column; gap:10px;">
        ${calc.fields.map(f => {
          const val = autofillValues[f.id] !== undefined ? autofillValues[f.id] : f.defaultValue;
          if (f.type === 'boolean') {
            return `
              <div class="dsp-form-group" style="margin:0;">
                <label class="dsp-label" style="display:flex; align-items:center; gap:8px; cursor:pointer; font-size:12px;">
                  <input type="checkbox" name="${f.id}" value="true" ${val ? 'checked' : ''} style="width:16px; height:16px; cursor:pointer;" />
                  <span>${escapeHtml(f.label)}</span>
                </label>
              </div>
            `;
          }
          if (f.type === 'select') {
            return `
              <div class="dsp-form-group" style="margin:0;">
                <label class="dsp-label" for="sp_${f.id}" style="font-size:12px;">${escapeHtml(f.label)}</label>
                <select class="dsp-input" id="sp_${f.id}" name="${f.id}" style="font-size:12px; min-height:36px; padding:4px 8px;">
                  ${(f.options || []).map(opt => `
                    <option value="${opt.value}" ${opt.value === val ? 'selected' : ''}>${escapeHtml(opt.label)}</option>
                  `).join('')}
                </select>
              </div>
            `;
          }
          return `
            <div class="dsp-form-group" style="margin:0;">
              <label class="dsp-label" for="sp_${f.id}" style="font-size:12px;">
                <span>${escapeHtml(f.label)}</span>
                ${f.unit ? `<span style="font-size:11px; color:var(--color-text-muted);">(${f.unit})</span>` : ''}
              </label>
              <input class="dsp-input" type="number" id="sp_${f.id}" name="${f.id}" value="${val !== undefined ? val : ''}" placeholder="${f.placeholder || ''}" min="${f.min !== undefined ? f.min : ''}" max="${f.max !== undefined ? f.max : ''}" step="${f.step || 'any'}" style="font-size:12px; min-height:36px; padding:4px 8px;" />
            </div>
          `;
        }).join('')}
      </div>

      <div style="margin-top:1rem; display:flex; justify-content:flex-end;">
        <button type="submit" class="dsp-btn dsp-btn-primary dsp-btn-sm" style="font-weight:700;">
          <i class="fa-solid fa-calculator"></i> Tính kết quả
        </button>
      </div>
    </form>

    <div id="scorePickerResultBox" style="margin-top:1rem;"></div>
  `;

  const form = document.getElementById('scoreActivePickerForm') as HTMLFormElement;
  const resultBox = document.getElementById('scorePickerResultBox');

  const runCalculation = () => {
    const formData = new FormData(form);
    const inputs: Record<string, any> = {};

    calc.fields.forEach(f => {
      if (f.type === 'boolean') {
        const val = formData.get(f.id);
        inputs[f.id] = val === 'true' || val === 'on' || val === '1';
      } else {
        inputs[f.id] = formData.get(f.id);
      }
    });

    const res = calc.calculate(inputs);

    if (resultBox) {
      const sevColors: Record<string, { bg: string; text: string; border: string }> = {
        low: { bg: 'rgba(34, 197, 94, 0.1)', text: '#16a34a', border: 'rgba(34, 197, 94, 0.3)' },
        moderate: { bg: 'rgba(245, 158, 11, 0.1)', text: '#d97706', border: 'rgba(245, 158, 11, 0.3)' },
        high: { bg: 'rgba(239, 68, 68, 0.1)', text: '#dc2626', border: 'rgba(239, 68, 68, 0.3)' },
        critical: { bg: 'rgba(153, 27, 27, 0.15)', text: '#991b1b', border: 'rgba(153, 27, 27, 0.4)' },
        info: { bg: 'rgba(14, 165, 233, 0.1)', text: '#0284c7', border: 'rgba(14, 165, 233, 0.3)' }
      };

      const c = sevColors[res.severity] || sevColors.info;

      resultBox.innerHTML = `
        <div style="background:${c.bg}; border:1.5px solid ${c.border}; border-radius:10px; padding:1rem;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:6px;">
            <div style="font-size:14px; font-weight:800; color:${c.text};">
              ${escapeHtml(res.label)}
            </div>
            <button type="button" class="dsp-btn dsp-btn-primary dsp-btn-sm" id="btnInsertScoreToSoap" style="font-size:11px; padding:4px 10px; font-weight:700;">
              <i class="fa-solid fa-arrow-down-to-line"></i> Chèn vào bệnh án
            </button>
          </div>

          <div style="font-size:12px; color:var(--color-text); line-height:1.4; margin-bottom:6px;">
            <strong>Khuyến cáo:</strong> ${escapeHtml(res.recommendation)}
          </div>

          ${res.details.length > 0 ? `
            <div style="font-size:11px; color:var(--color-text-muted); border-top:1px dashed ${c.border}; padding-top:4px; line-height:1.4;">
              ${res.details.map(d => `<div>• ${escapeHtml(d)}</div>`).join('')}
            </div>
          ` : ''}
        </div>
      `;

      document.getElementById('btnInsertScoreToSoap')?.addEventListener('click', () => {
        if (options?.onInsert) {
          options.onInsert(res.textForInsert);
          if (onClose) onClose();
          return;
        }

        const targetEl = (options?.targetFieldId ? document.getElementById(options.targetFieldId) : null) as HTMLTextAreaElement | null
          || (document.getElementById('esAAssessment') as HTMLTextAreaElement | null)
          || (document.getElementById('dspCaseDiagnosis') as HTMLTextAreaElement | null);

        if (targetEl) {
          const current = targetEl.value.trim();
          const prefix = current ? '\n\n' : '';
          targetEl.value = current + prefix + res.textForInsert;
          targetEl.focus();
          alert('✅ Đã chèn kết quả thang điểm vào bệnh án thành công!');
          if (onClose) onClose();
        } else {
          navigator.clipboard.writeText(res.textForInsert).then(() => {
            alert('✅ Đã sao chép kết quả vào Clipboard!');
            if (onClose) onClose();
          });
        }
      });
    }
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    runCalculation();
  });

  form.addEventListener('input', runCalculation);
  form.addEventListener('change', runCalculation);

  // Chạy ngay lần đầu
  runCalculation();
}
