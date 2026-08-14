/**
 * CliniPortal — EBM Interactive Practice Lab Module (TypeScript)
 * Powers ebm-lab.html, forest-plot.html, funnel-plot.html, kaplan-meier.html, roc-curve.html
 */
import { EbmTable2x2, EbmCalculationResult, PicoOutcome, ForestPlotStudy } from '../types';

export function calculateEbm2x2(table: EbmTable2x2): EbmCalculationResult {
  const { a, b, c, d } = table;
  const nExp = a + b;
  const nCtrl = c + d;

  const eer = nExp > 0 ? a / nExp : 0;
  const cer = nCtrl > 0 ? c / nCtrl : 0;
  const arr = Math.abs(cer - eer);
  const rrr = cer > 0 ? arr / cer : 0;
  const rr = cer > 0 ? eer / cer : 0;
  const or = (b * c > 0) ? (a * d) / (b * c) : 0;
  const nnt = arr > 0 ? Math.ceil(1 / arr) : Infinity;

  // Diagnostic Test metrics
  const totalDisease = a + c;
  const totalNonDisease = b + d;
  const sens = totalDisease > 0 ? a / totalDisease : 0;
  const spec = totalNonDisease > 0 ? d / totalNonDisease : 0;
  const ppv = (a + b > 0) ? a / (a + b) : 0;
  const npv = (c + d > 0) ? d / (c + d) : 0;
  const lrPos = (1 - spec > 0) ? sens / (1 - spec) : 0;
  const lrNeg = spec > 0 ? (1 - sens) / spec : 0;

  return { eer, cer, arr, rrr, rr, or, nnt, sens, spec, ppv, npv, lrPos, lrNeg };
}

export function initPicoBuilder(): void {
  const pInput = document.getElementById("pico-p") as HTMLInputElement | null;
  const iInput = document.getElementById("pico-i") as HTMLInputElement | null;
  const cInput = document.getElementById("pico-c") as HTMLInputElement | null;
  const outcomeList = document.getElementById("pico-outcome-list");
  const qPreview = document.getElementById("pico-question-preview");
  const searchString = document.getElementById("pico-search-string");

  if (!pInput || !iInput || !cInput) return;

  function updatePicoPreview() {
    const p = pInput?.value.trim() || "...";
    const i = iInput?.value.trim() || "...";
    const c = cInput?.value.trim() || "...";

    if (qPreview) {
      qPreview.innerHTML = `Ở bệnh nhân <strong>${p}</strong>, việc can thiệp bằng <strong>${i}</strong> so với <strong>${c}</strong> có mang lại hiệu quả lâm sàng tốt hơn không?`;
    }

    if (searchString) {
      searchString.textContent = `("${p}") AND ("${i}") AND ("${c}") AND ("Randomized Controlled Trial"[pt] OR "Systematic Review"[pt])`;
    }
  }

  [pInput, iInput, cInput].forEach(inp => inp?.addEventListener("input", updatePicoPreview));
  updatePicoPreview();
}

export function initEbmCalculators(): void {
  const inputA = document.getElementById("calc-a") as HTMLInputElement | null;
  const inputB = document.getElementById("calc-b") as HTMLInputElement | null;
  const inputC = document.getElementById("calc-c") as HTMLInputElement | null;
  const inputD = document.getElementById("calc-d") as HTMLInputElement | null;

  if (!inputA || !inputB || !inputC || !inputD) return;

  function runCalc() {
    const a = parseFloat(inputA?.value || '0');
    const b = parseFloat(inputB?.value || '0');
    const c = parseFloat(inputC?.value || '0');
    const d = parseFloat(inputD?.value || '0');

    const res = calculateEbm2x2({ a, b, c, d });

    const elEer = document.getElementById("res-eer");
    const elCer = document.getElementById("res-cer");
    const elArr = document.getElementById("res-arr");
    const elRrr = document.getElementById("res-rrr");
    const elRr = document.getElementById("res-rr");
    const elNnt = document.getElementById("res-nnt");
    const elOr = document.getElementById("res-or");

    if (elEer) elEer.textContent = `${(res.eer * 100).toFixed(1)}%`;
    if (elCer) elCer.textContent = `${(res.cer * 100).toFixed(1)}%`;
    if (elArr) elArr.textContent = `${(res.arr * 100).toFixed(1)}%`;
    if (elRrr) elRrr.textContent = `${(res.rrr * 100).toFixed(1)}%`;
    if (elRr) elRr.textContent = res.rr.toFixed(2);
    if (elOr) elOr.textContent = res.or.toFixed(2);
    if (elNnt) elNnt.textContent = Number.isFinite(res.nnt) ? res.nnt.toString() : '∞';
  }

  [inputA, inputB, inputC, inputD].forEach(inp => inp?.addEventListener("input", runCalc));
  runCalc();
}

export function initEbmLabTabs(): void {
  const tabBtns = document.querySelectorAll(".lab-tab-btn");
  const panels = document.querySelectorAll(".lab-panel");

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetPanel = btn.getAttribute("data-tab");

      tabBtns.forEach((b) => b.classList.remove("active"));
      panels.forEach((p) => p.classList.remove("active"));

      btn.classList.add("active");
      const targetEl = document.getElementById(`panel-${targetPanel}`);
      if (targetEl) targetEl.classList.add("active");
    });
  });
}

export function initEbmLab(): void {
  initEbmLabTabs();
  initPicoBuilder();
  initEbmCalculators();
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEbmLab);
  } else {
    initEbmLab();
  }
}
