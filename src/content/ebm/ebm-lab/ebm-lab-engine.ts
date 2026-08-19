/**
 * CliniPortal — EBM Practice Lab Pro Controller Engine (TypeScript)
 * Path: src/content/ebm/ebm-lab/ebm-lab-engine.ts
 */

import { EbmLabTab, renderEbmLabView } from './ebm-lab-view';

export function initEbmLabEngine(initialTab: EbmLabTab = 'nnt'): void {
  // 1. Navigation Tabs
  document.querySelectorAll('.ebm-lab-nav-tab').forEach(tab => {
    tab.addEventListener('click', (e) => {
      const targetTab = (e.currentTarget as HTMLElement).getAttribute('data-tab') as EbmLabTab;
      if (targetTab) {
        const app = document.getElementById('app');
        if (app) {
          app.innerHTML = renderEbmLabView(targetTab);
          initEbmLabEngine(targetTab);
        }
      }
    });
  });

  if (initialTab === 'nnt') {
    initNntModule();
  } else if (initialTab === 'pico') {
    initPicoModule();
  } else if (initialTab === 'appraisal') {
    initRoB2Module();
  }
}

// ─────────────────────────────────────────────────────────────
// 1. NNT MODULE CONTROLLER
// ─────────────────────────────────────────────────────────────
function initNntModule(): void {
  const eventExpInput = document.getElementById('nnt-event-exp') as HTMLInputElement | null;
  const totalExpInput = document.getElementById('nnt-total-exp') as HTMLInputElement | null;
  const eventCtrlInput = document.getElementById('nnt-event-ctrl') as HTMLInputElement | null;
  const totalCtrlInput = document.getElementById('nnt-total-ctrl') as HTMLInputElement | null;

  const calculate = () => {
    const a = parseFloat(eventExpInput?.value || '0');
    const n1 = Math.max(parseFloat(totalExpInput?.value || '1'), 1);
    const c = parseFloat(eventCtrlInput?.value || '0');
    const n2 = Math.max(parseFloat(totalCtrlInput?.value || '1'), 1);

    const eer = a / n1;
    const cer = c / n2;
    const arr = Math.abs(cer - eer);
    const rrr = cer > 0 ? (arr / cer) : 0;
    const rr = cer > 0 ? (eer / cer) : 1;
    
    // Odds Ratio calculation
    const b = n1 - a;
    const d = n2 - c;
    const or = (b > 0 && c > 0) ? (a * d) / (b * c) : 1;

    const isProtective = cer >= eer;
    const nntVal = arr > 0 ? Math.round(1 / arr) : 0;

    // Standard Error for ARR & 95% Confidence Interval
    const seArr = Math.sqrt((eer * (1 - eer) / n1) + (cer * (1 - cer) / n2));
    const arrLow = Math.max(arr - 1.96 * seArr, 0.0001);
    const arrHigh = arr + 1.96 * seArr;
    const ciLow = Math.round(1 / arrHigh);
    const ciHigh = Math.round(1 / arrLow);

    // Update Elements
    const nntResultEl = document.getElementById('nnt-result-val');
    const nntTitleEl = document.getElementById('nnt-title-lbl');
    const nntCiEl = document.getElementById('nnt-ci-val');
    const nntSummaryEl = document.getElementById('nnt-summary-text');
    const nntVerdictBadge = document.getElementById('nnt-verdict-badge');

    const cerEl = document.getElementById('nnt-cer-val');
    const eerEl = document.getElementById('nnt-eer-val');
    const arrEl = document.getElementById('nnt-arr-val');
    const rrEl = document.getElementById('nnt-rr-val');
    const rrrEl = document.getElementById('nnt-rrr-val');
    const orEl = document.getElementById('nnt-or-val');

    if (cerEl) cerEl.textContent = `${(cer * 100).toFixed(2)}%`;
    if (eerEl) eerEl.textContent = `${(eer * 100).toFixed(2)}%`;
    if (arrEl) arrEl.textContent = `${(arr * 100).toFixed(2)}%`;
    if (rrEl) rrEl.textContent = rr.toFixed(2);
    if (rrrEl) rrrEl.textContent = `${(rrr * 100).toFixed(1)}%`;
    if (orEl) orEl.textContent = or.toFixed(2);

    if (nntResultEl) nntResultEl.textContent = nntVal.toString();
    if (nntCiEl) nntCiEl.textContent = `95% CI: [${ciLow} - ${ciHigh}]`;

    if (isProtective) {
      if (nntTitleEl) nntTitleEl.textContent = 'Number Needed to Treat (NNT):';
      if (nntResultEl) nntResultEl.style.color = '#059669';
      if (nntVerdictBadge) {
        nntVerdictBadge.className = 'dsp-badge dsp-badge--success';
        nntVerdictBadge.textContent = 'Bảo vệ lâm sàng';
      }
      if (nntSummaryEl) {
        nntSummaryEl.textContent = `Cần điều trị ${nntVal} bệnh nhân để phòng ngừa 1 biến cố bất lợi.`;
      }
    } else {
      if (nntTitleEl) nntTitleEl.textContent = 'Number Needed to Harm (NNH):';
      if (nntResultEl) nntResultEl.style.color = '#dc2626';
      if (nntVerdictBadge) {
        nntVerdictBadge.className = 'dsp-badge dsp-badge--danger';
        nntVerdictBadge.textContent = 'Tăng nguy cơ (Harm)';
      }
      if (nntSummaryEl) {
        nntSummaryEl.textContent = `Cứ điều trị ${nntVal} bệnh nhân thì có 1 bệnh nhân phát sinh biến cố có hại.`;
      }
    }

    // Render 100-Patient Dot Matrix
    renderCates100Grid(eer, cer);
  };

  [eventExpInput, totalExpInput, eventCtrlInput, totalCtrlInput].forEach(inp => {
    inp?.addEventListener('input', calculate);
  });

  // Presets
  document.querySelectorAll('.js-load-preset-trial').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const trial = (e.currentTarget as HTMLElement).getAttribute('data-trial');
      if (trial === 'dapa-hf' && eventExpInput && totalExpInput && eventCtrlInput && totalCtrlInput) {
        eventExpInput.value = '386';
        totalExpInput.value = '2373';
        eventCtrlInput.value = '502';
        totalCtrlInput.value = '2371';
      } else if (trial === 'sprint' && eventExpInput && totalExpInput && eventCtrlInput && totalCtrlInput) {
        eventExpInput.value = '243';
        totalExpInput.value = '4678';
        eventCtrlInput.value = '319';
        totalCtrlInput.value = '4683';
      } else if (trial === 'paradigm' && eventExpInput && totalExpInput && eventCtrlInput && totalCtrlInput) {
        eventExpInput.value = '914';
        totalExpInput.value = '4187';
        eventCtrlInput.value = '1117';
        totalCtrlInput.value = '4212';
      } else if (trial === 'recovery' && eventExpInput && totalExpInput && eventCtrlInput && totalCtrlInput) {
        eventExpInput.value = '482';
        totalExpInput.value = '2104';
        eventCtrlInput.value = '1110';
        totalCtrlInput.value = '4321';
      }
      calculate();
    });
  });

  calculate();
}

function renderCates100Grid(eer: number, cer: number): void {
  const container = document.getElementById('cates-dot-matrix');
  if (!container) return;

  const eventExpCount = Math.round(eer * 100);
  const eventCtrlCount = Math.round(cer * 100);
  const savedCount = Math.max(eventCtrlCount - eventExpCount, 0);

  const dotSavedCountEl = document.getElementById('dot-saved-count');
  const dotEventCountEl = document.getElementById('dot-event-count');
  const dotSafeCountEl = document.getElementById('dot-safe-count');

  if (dotSavedCountEl) dotSavedCountEl.textContent = savedCount.toString();
  if (dotEventCountEl) dotEventCountEl.textContent = eventExpCount.toString();
  if (dotSafeCountEl) dotSafeCountEl.textContent = (100 - eventExpCount - savedCount).toString();

  let html = '';
  for (let i = 1; i <= 100; i++) {
    if (i <= savedCount) {
      // Saved by intervention
      html += `<div style="aspect-ratio:1; border-radius:50%; background:#10b981; display:flex; align-items:center; justify-content:center; color:#fff; font-size:9px;" title="Bệnh nhân được cứu"><i class="fa-solid fa-check"></i></div>`;
    } else if (i <= savedCount + eventExpCount) {
      // Event still happens
      html += `<div style="aspect-ratio:1; border-radius:50%; background:#ef4444; display:flex; align-items:center; justify-content:center; color:#fff; font-size:9px;" title="Vẫn bị biến cố"><i class="fa-solid fa-xmark"></i></div>`;
    } else {
      // Safe
      html += `<div style="aspect-ratio:1; border-radius:50%; background:var(--color-border); opacity:0.6;" title="Không bị biến cố"></div>`;
    }
  }
  container.innerHTML = html;
}

// ─────────────────────────────────────────────────────────────
// 2. PICO MODULE CONTROLLER
// ─────────────────────────────────────────────────────────────
function initPicoModule(): void {
  const pInp = document.getElementById('pico-p') as HTMLInputElement | null;
  const iInp = document.getElementById('pico-i') as HTMLInputElement | null;
  const cInp = document.getElementById('pico-c') as HTMLInputElement | null;
  const oInp = document.getElementById('pico-o') as HTMLInputElement | null;
  const presetSelect = document.getElementById('pico-preset-select') as HTMLSelectElement | null;
  const questionEl = document.getElementById('pico-structured-question');
  const queryEl = document.getElementById('pico-pubmed-query') as HTMLTextAreaElement | null;
  const openPubmedBtn = document.getElementById('btnOpenPubMedSearch') as HTMLAnchorElement | null;

  const update = () => {
    const p = pInp?.value.trim() || 'Patient/Population';
    const i = iInp?.value.trim() || 'Intervention';
    const c = cInp?.value.trim() || 'Comparison';
    const o = oInp?.value.trim() || 'Outcome';

    if (questionEl) {
      questionEl.textContent = `Ở đối tượng bệnh nhân ${p} (P), việc áp dụng can thiệp ${i} (I) so với ${c} (C) có giúp cải thiện hoặc thay đổi kết cục ${o} (O) hay không?`;
    }

    const pubmedQuery = `(${p.replace(/\s+AND\s+/gi, '") AND ("').replace(/\s+OR\s+/gi, '" OR "')}) AND (${i.replace(/\s+OR\s+/gi, '" OR "')}) AND (${o.replace(/\s+OR\s+/gi, '" OR "')})`;
    if (queryEl) {
      queryEl.value = pubmedQuery;
    }
    if (openPubmedBtn) {
      openPubmedBtn.href = `https://pubmed.ncbi.nlm.nih.gov/?term=${encodeURIComponent(pubmedQuery)}`;
    }
  };

  [pInp, iInp, cInp, oInp].forEach(inp => inp?.addEventListener('input', update));

  presetSelect?.addEventListener('change', () => {
    const val = presetSelect.value;
    if (val === 'sglt2-ckd' && pInp && iInp && cInp && oInp) {
      pInp.value = 'Type 2 Diabetes AND Chronic Kidney Disease';
      iInp.value = 'SGLT2 inhibitors OR Dapagliflozin OR Empagliflozin';
      cInp.value = 'Placebo OR Standard of care';
      oInp.value = 'Kidney disease progression OR Cardiovascular mortality';
    } else if (val === 'tnk-stroke' && pInp && iInp && cInp && oInp) {
      pInp.value = 'Acute Ischemic Stroke within 4.5 hours';
      iInp.value = 'Tenecteplase OR TNK-tPA';
      cInp.value = 'Alteplase';
      oInp.value = 'Functional recovery OR Modified Rankin Scale OR Hemorrhage';
    } else if (val === 'doac-af' && pInp && iInp && cInp && oInp) {
      pInp.value = 'Non-valvular Atrial Fibrillation';
      iInp.value = 'DOAC OR Apixaban OR Rivaroxaban';
      cInp.value = 'Warfarin OR Vitamin K Antagonists';
      oInp.value = 'Ischemic stroke OR Major bleeding';
    }
    update();
  });

  document.querySelectorAll('.js-copy-pubmed-query').forEach(btn => {
    btn.addEventListener('click', () => {
      if (queryEl) {
        navigator.clipboard.writeText(queryEl.value);
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-check"></i> Đã chép!';
        setTimeout(() => { btn.innerHTML = originalText; }, 2000);
      }
    });
  });

  update();
}

// ─────────────────────────────────────────────────────────────
// 3. COCHRANE ROB 2 CONTROLLER
// ─────────────────────────────────────────────────────────────
function initRoB2Module(): void {
  const scores: Record<string, string> = {
    d1: 'low',
    d2: 'low',
    d3: 'low',
    d4: 'low',
    d5: 'low'
  };

  const updateOverall = () => {
    const vals = Object.values(scores);
    const hasHigh = vals.includes('high');
    const someConcernsCount = vals.filter(v => v === 'some').length;

    const overallBadge = document.getElementById('rob2-overall-badge');
    const tlOverall = document.getElementById('tl-overall');

    if (hasHigh || someConcernsCount >= 2) {
      if (overallBadge) {
        overallBadge.style.background = '#fee2e2';
        overallBadge.style.color = '#991b1b';
        overallBadge.style.borderColor = '#fca5a5';
        overallBadge.textContent = '🔴 Tổng thể: High Risk of Bias';
      }
      if (tlOverall) {
        tlOverall.textContent = 'Overall: 🔴 High Risk';
        tlOverall.style.color = '#dc2626';
      }
    } else if (someConcernsCount === 1) {
      if (overallBadge) {
        overallBadge.style.background = '#fef3c7';
        overallBadge.style.color = '#92400e';
        overallBadge.style.borderColor = '#fcd34d';
        overallBadge.textContent = '🟡 Tổng thể: Some Concerns';
      }
      if (tlOverall) {
        tlOverall.textContent = 'Overall: 🟡 Some Concerns';
        tlOverall.style.color = '#d97706';
      }
    } else {
      if (overallBadge) {
        overallBadge.style.background = '#dcfce7';
        overallBadge.style.color = '#166534';
        overallBadge.style.borderColor = '#86efac';
        overallBadge.textContent = '🟢 Tổng thể: Low Risk of Bias';
      }
      if (tlOverall) {
        tlOverall.textContent = 'Overall: 🟢 Low Risk';
        tlOverall.style.color = '#059669';
      }
    }
  };

  document.querySelectorAll('.js-rob-choice').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const target = e.currentTarget as HTMLElement;
      const parent = target.closest('.rob2-selector');
      const domain = parent?.getAttribute('data-domain');
      const val = target.getAttribute('data-val');

      if (!domain || !val) return;

      scores[domain] = val;

      // Update selector buttons styling
      parent?.querySelectorAll('.js-rob-choice').forEach(b => {
        const bEl = b as HTMLElement;
        bEl.classList.remove('is-selected');
        bEl.style.background = 'var(--color-surface)';
        bEl.style.color = 'var(--color-text-muted)';
        bEl.style.borderColor = 'var(--color-border)';
      });

      target.classList.add('is-selected');
      if (val === 'low') {
        target.style.background = '#dcfce7';
        target.style.color = '#166534';
        target.style.borderColor = '#86efac';
      } else if (val === 'some') {
        target.style.background = '#fef3c7';
        target.style.color = '#92400e';
        target.style.borderColor = '#fcd34d';
      } else if (val === 'high') {
        target.style.background = '#fee2e2';
        target.style.color = '#991b1b';
        target.style.borderColor = '#fca5a5';
      }

      // Update traffic light plot
      const tl = document.getElementById(`tl-${domain}`);
      if (tl) {
        const icon = val === 'low' ? '🟢 Low' : val === 'some' ? '🟡 Some' : '🔴 High';
        tl.textContent = `${domain.toUpperCase()}: ${icon}`;
      }

      updateOverall();
    });
  });

  updateOverall();
}
