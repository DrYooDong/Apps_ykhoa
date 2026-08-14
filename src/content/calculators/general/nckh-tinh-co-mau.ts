/**
 * CliniPortal — Sample Size & Power Calculation Engine for Medical Research (TypeScript Module)
 * WHO / CONSORT / STROBE compliant sample size estimation (Cross-sectional, Case-control, RCT)
 */

export type StudyDesignType = 'cs' | 'cc' | 'rct';
export type CalculationMethodType = 'cs-prop' | 'cs-mean' | 'cc-prop' | 'cc-mean' | 'rct-prop' | 'rct-mean';

export interface SampleSizeResult {
  n0: number;
  isComparison?: boolean;
  isRCT?: boolean;
  r?: number;
  params: Record<string, any>;
  formula: string;
}

export interface StateConfig {
  study: StudyDesignType;
  method: CalculationMethodType;
}

const state: StateConfig = {
  study: 'cs',
  method: 'cs-prop'
};

const $ = (id: string) => document.getElementById(id);
const qsa = (sel: string) => Array.from(document.querySelectorAll(sel)) as HTMLElement[];

export function getZalpha(): number {
  return parseFloat((document.getElementById('stat-alpha') as HTMLSelectElement)?.value || '1.96');
}

export function getZbeta(): number {
  return parseFloat((document.getElementById('stat-power') as HTMLSelectElement)?.value || '0.842');
}

export function getDropout(): number {
  return parseFloat((document.getElementById('stat-dropout') as HTMLSelectElement)?.value || '0') || 0;
}

export function getPopSize(): number | null {
  const v = parseInt((document.getElementById('stat-popsize') as HTMLInputElement)?.value || '', 10);
  return isNaN(v) || v <= 0 ? null : v;
}

export function applyFPC(n0: number): number {
  const N = getPopSize();
  if (!N || N <= 0) return n0;
  return n0 / (1 + (n0 - 1) / N);
}

export function applyDropout(n: number): number {
  const d = getDropout() / 100;
  if (d <= 0) return n;
  return n / (1 - d);
}

export function calc_cs_prop(): SampleSizeResult | null {
  const z = getZalpha();
  const p = parseFloat((document.getElementById('cs-p') as HTMLInputElement)?.value) / 100;
  const d = parseFloat((document.getElementById('cs-d') as HTMLInputElement)?.value) / 100;
  if (isNaN(p) || isNaN(d) || p <= 0 || p >= 1 || d <= 0) return null;
  const n0 = (z * z * p * (1 - p)) / (d * d);
  return { n0, params: { z, p, d }, formula: `n = Z² × p(1–p) / d²` };
}

export function calc_cs_mean(): SampleSizeResult | null {
  const z = getZalpha();
  const sigma = parseFloat((document.getElementById('cs-sigma') as HTMLInputElement)?.value);
  const d = parseFloat((document.getElementById('cs-dm') as HTMLInputElement)?.value);
  if (isNaN(sigma) || isNaN(d) || sigma <= 0 || d <= 0) return null;
  const n0 = (z * z * sigma * sigma) / (d * d);
  return { n0, params: { z, sigma, d }, formula: `n = Z² × σ² / d²` };
}

export function calc_cc_prop(): SampleSizeResult | null {
  const za = getZalpha();
  const zb = getZbeta();
  const p1 = parseFloat((document.getElementById('cc-p1') as HTMLInputElement)?.value) / 100;
  const p2 = parseFloat((document.getElementById('cc-p2') as HTMLInputElement)?.value) / 100;
  const r = parseFloat((document.getElementById('cc-r') as HTMLSelectElement)?.value);
  if (isNaN(p1) || isNaN(p2) || p1 <= 0 || p1 >= 1 || p2 <= 0 || p2 >= 1 || p1 === p2) return null;
  const pStar = (p1 + r * p2) / (1 + r);
  const num = ((r + 1) / r) * pStar * (1 - pStar) * Math.pow(zb + za, 2);
  const den = Math.pow(p1 - p2, 2);
  const n0 = num / den;
  const or = (p1 * (1 - p2)) / (p2 * (1 - p1));
  const orEl = document.getElementById('cc-or-val');
  if (orEl) orEl.textContent = isNaN(or) ? '–' : or.toFixed(2);
  return { n0, isComparison: true, r, params: { za, zb, p1, p2, r, pStar, or }, formula: `n = (r+1)/r · p*(1–p*)·(Zβ+Zα/2)² / (p₁–p₂)²` };
}

export function calc_cc_mean(): SampleSizeResult | null {
  const za = getZalpha();
  const zb = getZbeta();
  const sigma = parseFloat((document.getElementById('cc-sigma') as HTMLInputElement)?.value);
  const delta = parseFloat((document.getElementById('cc-delta') as HTMLInputElement)?.value);
  const r = parseFloat((document.getElementById('cc-r-mean') as HTMLSelectElement)?.value);
  if (isNaN(sigma) || isNaN(delta) || sigma <= 0 || delta <= 0) return null;
  const n0 = ((r + 1) / r) * sigma * sigma * Math.pow(zb + za, 2) / (delta * delta);
  return { n0, isComparison: true, r, params: { za, zb, sigma, delta, r }, formula: `n = (r+1)/r · σ²·(Zβ+Zα/2)² / d²` };
}

export function calc_rct_prop(): SampleSizeResult | null {
  const za = getZalpha();
  const zb = getZbeta();
  const p1 = parseFloat((document.getElementById('rct-p1') as HTMLInputElement)?.value) / 100;
  const p2 = parseFloat((document.getElementById('rct-p2') as HTMLInputElement)?.value) / 100;
  if (isNaN(p1) || isNaN(p2) || p1 <= 0 || p1 >= 1 || p2 <= 0 || p2 >= 1 || p1 === p2) return null;
  const P = (p1 + p2) / 2;
  const n0 = 2 * P * (1 - P) * Math.pow(za + zb, 2) / Math.pow(p1 - p2, 2);
  const effectEl = document.getElementById('rct-prop-effect');
  const pooledEl = document.getElementById('rct-prop-pooled');
  if (effectEl) effectEl.textContent = Math.abs((p1 - p2) * 100).toFixed(1) + '%';
  if (pooledEl) pooledEl.textContent = (P * 100).toFixed(1) + '%';
  return { n0, isComparison: true, isRCT: true, params: { za, zb, p1, p2, P }, formula: `n/nhóm = 2·P̄(1–P̄)·(Zα/2+Zβ)² / (p₁–p₂)²` };
}

export function calc_rct_mean(): SampleSizeResult | null {
  const za = getZalpha();
  const zb = getZbeta();
  const sigma = parseFloat((document.getElementById('rct-sigma') as HTMLInputElement)?.value);
  const delta = parseFloat((document.getElementById('rct-delta') as HTMLInputElement)?.value);
  if (isNaN(sigma) || isNaN(delta) || sigma <= 0 || delta <= 0) return null;
  const n0 = 2 * sigma * sigma * Math.pow(za + zb, 2) / (delta * delta);
  return { n0, isComparison: true, isRCT: true, params: { za, zb, sigma, delta }, formula: `n/nhóm = 2·σ²·(Zα/2+Zβ)² / δ²` };
}

export function setMethod(method: CalculationMethodType): void {
  state.method = method;
  const allInputBlocks = [
    'inputs-cs-prop', 'inputs-cs-mean',
    'inputs-cc-prop', 'inputs-cc-mean',
    'inputs-rct-prop', 'inputs-rct-mean'
  ];
  allInputBlocks.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.toggle('ss-hidden', id !== `inputs-${method}`);
  });

  qsa('.ss-method-btn').forEach(b => {
    if (b.dataset.method === method) b.classList.add('active');
    else b.classList.remove('active');
  });
}

export function updatePowerGroupVisibility(): void {
  const pg = document.getElementById('power-group');
  const isPowerRequired = (state.study === 'cc' || state.study === 'rct');
  if (pg) pg.style.opacity = isPowerRequired ? '1' : '0.45';
}

export function calculate(): void {
  const calculators: Record<CalculationMethodType, () => SampleSizeResult | null> = {
    'cs-prop': calc_cs_prop,
    'cs-mean': calc_cs_mean,
    'cc-prop': calc_cc_prop,
    'cc-mean': calc_cc_mean,
    'rct-prop': calc_rct_prop,
    'rct-mean': calc_rct_mean,
  };

  const result = calculators[state.method]?.() || null;
  renderResults(result);
}

function animateBump(el: HTMLElement | null, newText: string): void {
  if (!el) return;
  if (el.textContent !== newText) {
    el.textContent = newText;
    el.classList.remove('bump');
    void el.offsetWidth;
    el.classList.add('bump');
  }
}

export function renderResults(result: SampleSizeResult | null): void {
  const outN = document.getElementById('out-n');
  const outN0 = document.getElementById('out-n0');
  const outNfpc = document.getElementById('out-nfpc');
  const outTotal = document.getElementById('out-ntotal');
  const outDropoutPct = document.getElementById('out-dropout-pct');

  if (!result) {
    if (outN) outN.textContent = '–';
    if (outN0) outN0.textContent = '–';
    if (outTotal) outTotal.textContent = '–';
    const aList = document.getElementById('analysis-list');
    if (aList) aList.innerHTML = '<li>Vui lòng nhập đầy đủ các tham số hợp lệ (> 0).</li>';
    const setDisp = (id: string, v: string) => {
      const el = document.getElementById(id);
      if (el) el.style.display = v;
    };
    setDisp('row-fpc', 'none');
    setDisp('row-rct-total', 'none');
    setDisp('row-cc-total', 'none');
    setDisp('power-display', 'none');
    updateParamSummary(null);
    return;
  }

  const { n0, isComparison, isRCT, r, params } = result;
  const N = getPopSize();
  const dropout = getDropout();

  const nFPC = N ? applyFPC(n0) : n0;
  const nCeil = Math.ceil(nFPC);
  const nTotal = Math.ceil(applyDropout(nFPC));

  animateBump(outN, nCeil.toLocaleString('vi-VN'));
  if (outN0) outN0.textContent = Math.ceil(n0).toLocaleString('vi-VN');

  const rowFpc = document.getElementById('row-fpc');
  if (N && N > 0) {
    if (rowFpc) rowFpc.style.display = 'flex';
    if (outNfpc) outNfpc.textContent = nCeil.toLocaleString('vi-VN') + ' (FPC)';
  } else {
    if (rowFpc) rowFpc.style.display = 'none';
  }

  if (outTotal) outTotal.textContent = nTotal.toLocaleString('vi-VN');
  if (outDropoutPct) outDropoutPct.textContent = dropout > 0 ? `+${dropout}%` : 'Không áp dụng';
  const outNUnit = document.getElementById('out-n-unit');
  if (outNUnit) outNUnit.textContent = isRCT ? 'đối tượng / nhóm' : 'đối tượng';

  const fpcInd = document.getElementById('fpc-indicator');
  const fpcEmp = document.getElementById('fpc-empty');
  const fpcVal = document.getElementById('fpc-val');
  if (N && N > 0) {
    if (fpcInd) fpcInd.style.display = 'block';
    if (fpcEmp) fpcEmp.style.display = 'none';
    if (fpcVal) fpcVal.textContent = (nFPC / n0).toFixed(3);
  } else {
    if (fpcInd) fpcInd.style.display = 'none';
    if (fpcEmp) fpcEmp.style.display = 'block';
  }

  const pDisp = document.getElementById('power-display');
  if (isComparison) {
    if (pDisp) pDisp.style.display = 'block';
    const pVal = getZbeta();
    const powerPct = Math.round(pVal === 0.842 ? 80 : (pVal === 1.282 ? 90 : 95));
    const pValLbl = document.getElementById('power-val-lbl');
    const pBarFill = document.getElementById('power-bar-fill');
    if (pValLbl) pValLbl.textContent = powerPct + '%';
    if (pBarFill) pBarFill.style.width = powerPct + '%';
  } else {
    if (pDisp) pDisp.style.display = 'none';
  }

  const rowRct = document.getElementById('row-rct-total');
  const rowCc = document.getElementById('row-cc-total');
  if (isRCT) {
    if (rowRct) rowRct.style.display = 'block';
    if (rowCc) rowCc.style.display = 'none';
    const grp1 = document.getElementById('out-rct-grp1');
    const grp2 = document.getElementById('out-rct-grp2');
    const rctSum = document.getElementById('out-rct-sum');
    if (grp1) grp1.textContent = nTotal.toLocaleString('vi-VN');
    if (grp2) grp2.textContent = nTotal.toLocaleString('vi-VN');
    if (rctSum) rctSum.textContent = (nTotal * 2).toLocaleString('vi-VN');
  } else if (isComparison && !isRCT && r) {
    if (rowCc) rowCc.style.display = 'block';
    if (rowRct) rowRct.style.display = 'none';
    const cases = nTotal;
    const controls = Math.ceil(nTotal * r);
    const total = cases + controls;
    const outCases = document.getElementById('out-cc-cases');
    const outControls = document.getElementById('out-cc-controls');
    const outCcSum = document.getElementById('out-cc-sum');
    if (outCases) outCases.textContent = cases.toLocaleString('vi-VN');
    if (outControls) outControls.textContent = controls.toLocaleString('vi-VN');
    if (outCcSum) outCcSum.textContent = total.toLocaleString('vi-VN');
  } else {
    if (rowRct) rowRct.style.display = 'none';
    if (rowCc) rowCc.style.display = 'none';
  }

  renderAnalysis(result, nCeil, nTotal);
  updateParamSummary(result);
}

export function renderAnalysis(result: SampleSizeResult, n: number, nTotal: number): void {
  const list = document.getElementById('analysis-list');
  const box = document.getElementById('analysis-box');
  const dropout = getDropout();
  const { isRCT, r, isComparison, params } = result;

  const items: string[] = [];
  let boxClass = '';

  if (n < 30) {
    items.push(`⚠️ Cỡ mẫu <strong>${n}</strong> đối tượng – <em>Rất nhỏ</em>. Kiểm tra lại tham số đầu vào hoặc cân nhắc nghiên cứu hoa tiêu (pilot study).`);
    boxClass = 'danger';
  } else if (n < 100) {
    items.push(`✅ Cỡ mẫu tối thiểu: <strong>${n}</strong> đối tượng – Phù hợp nghiên cứu thăm dò hoặc pilot.`);
    boxClass = 'warning';
  } else {
    items.push(`✅ Cỡ mẫu tối thiểu: <strong>${n.toLocaleString('vi-VN')}</strong> đối tượng – Đạt ngưỡng đủ sức mạnh thống kê.`);
    boxClass = 'success';
  }

  if (dropout > 0) {
    items.push(`📋 Sau khi bù <strong>${dropout}%</strong> tỷ lệ rớt mẫu (drop-out/loss to follow-up), cần tuyển tổng cộng <strong>${nTotal.toLocaleString('vi-VN')}</strong> đối tượng.`);
  } else {
    items.push(`💡 Chưa áp dụng bù trừ rớt mẫu. CONSORT khuyến nghị thêm <strong>10–20%</strong> tổng số mẫu.`);
  }

  if (isRCT) {
    items.push(`🔄 Phân bổ ngẫu nhiên <strong>1:1</strong> → Tổng cộng <strong>${(nTotal * 2).toLocaleString('vi-VN')}</strong> bệnh nhân (cả 2 nhóm). Báo cáo theo chuẩn <strong>CONSORT 2010</strong>.`);
    items.push(`📊 Phân tích dữ liệu theo nguyên tắc <strong>Intention-to-Treat (ITT)</strong> và cần báo cáo 95% CI của kết cục chính.`);
    if (params?.p1 && params?.p2) {
      const nnt = Math.ceil(1 / Math.abs(params.p1 - params.p2));
      items.push(`🩺 NNT ước tính = <strong>${nnt}</strong> (Number Needed to Treat). Cần đánh giá thêm NNH khi phân tích an toàn.`);
    }
  } else if (isComparison) {
    const rVal = r || 1;
    if (rVal > 1) {
      items.push(`⚖️ Tỷ lệ Chứng/Bệnh = <strong>1:${rVal}</strong>. Tăng số nhóm chứng giúp tăng power mà không cần thêm ca bệnh (phù hợp bệnh hiếm gặp).`);
    }
    items.push(`📝 Chỉ số đặc trưng là <strong>Odds Ratio (OR)</strong>. Báo cáo OR kèm <strong>95% CI</strong> theo chuẩn <strong>STROBE</strong>.`);
    items.push(`⚠️ Chú ý sai lệch nhớ lại (recall bias) và sai lệch chọn lựa (selection bias) đặc trưng của thiết kế bệnh-chứng.`);
  } else {
    items.push(`📋 Kết quả báo cáo theo chuẩn <strong>STROBE</strong> (nghiên cứu quan sát). Trình bày 95% CI song song với giá trị p.`);
    if (state.method === 'cs-prop') {
      items.push(`🔍 Chỉ số đặc trưng: <strong>Tỷ lệ lưu hành (Prevalence)</strong> kèm 95% CI. Không xác định được quan hệ nhân-quả.`);
    }
  }

  const N = getPopSize();
  if (N && N > 0) {
    items.push(`🏥 Đã áp dụng hiệu chỉnh quần thể hữu hạn (FPC) cho N = <strong>${N.toLocaleString('vi-VN')}</strong> đối tượng.`);
  }

  if (list) list.innerHTML = items.map(i => `<li>${i}</li>`).join('');
  if (box) box.className = `ss-analysis-box ${boxClass}`;
}

export function updateParamSummary(result: SampleSizeResult | null): void {
  const container = document.getElementById('param-summary-list');
  if (!container) return;
  if (!result) {
    container.innerHTML = '<em>Chưa có tham số nào.</em>';
    return;
  }

  const zAlpha = getZalpha();
  const zBeta = getZbeta();
  const dropout = getDropout();
  const N = getPopSize();
  const { isComparison, formula } = result;

  const alphaMap: Record<string, string> = { '1.96': '0.05 (95% CI)', '2.576': '0.01 (99% CI)', '1.645': '0.10 (90% CI)' };
  const powerMap: Record<string, string> = { '0.842': '80%', '1.282': '90%', '1.645': '95%' };

  const rows: [string, string][] = [
    ['Thiết kế NC', { cs: 'Cắt ngang', cc: 'Bệnh–Chứng', rct: 'RCT Superiority' }[state.study] || ''],
    ['Phương thức', state.method.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())],
    ['Công thức', `<code style="font-size:0.7rem">${formula}</code>`],
    ['Mức ý nghĩa α', alphaMap[String(zAlpha)] || `Z = ${zAlpha}`],
  ];

  if (isComparison) {
    rows.push(['Độ mạnh (Power)', powerMap[String(zBeta)] || `Zβ = ${zBeta}`]);
  }
  rows.push(['Tỷ lệ rớt mẫu', dropout > 0 ? `${dropout}%` : 'Không áp dụng']);
  if (N) rows.push(['Hiệu chỉnh FPC', `N = ${N.toLocaleString('vi-VN')}`]);

  container.innerHTML = rows.map(([label, val]) =>
    `<div style="display:flex;justify-content:space-between;padding:0.2rem 0;border-bottom:1px dashed var(--ss-card-border)">
      <span style="color:var(--color-text-muted)">${label}</span>
      <span style="font-weight:600;color:var(--color-text);text-align:right;max-width:55%">${val}</span>
    </div>`
  ).join('');
}

export function copyResult(): void {
  const n = document.getElementById('out-n')?.textContent;
  const n0 = document.getElementById('out-n0')?.textContent;
  const ntot = document.getElementById('out-ntotal')?.textContent;
  const dout = document.getElementById('out-dropout-pct')?.textContent;
  const study = { cs: 'Cắt ngang', cc: 'Bệnh–Chứng', rct: 'RCT Superiority' }[state.study];

  const text = [
    `=== KẾT QUẢ TÍNH CỠ MẪU – CliniPortal NCKH ===`,
    `Thiết kế nghiên cứu : ${study}`,
    `Cỡ mẫu tối thiểu   : ${n} đối tượng`,
    `n₀ lý thuyết        : ${n0}`,
    `Tỷ lệ rớt mẫu       : ${dout}`,
    `N thực tế cần tuyển : ${ntot}`,
    `---`,
    `Công cụ: CliniPortal – Tính toán Cỡ mẫu NCKH`,
  ].join('\n');

  navigator.clipboard.writeText(text).then(() => {
    const btn = document.getElementById('btn-copy');
    if (btn) {
      btn.textContent = '✅ Đã sao chép!';
      btn.classList.add('copied');
      setTimeout(() => {
        btn.textContent = '📋 Sao chép';
        btn.classList.remove('copied');
      }, 2000);
    }
  }).catch(() => {
    alert('Không thể sao chép. Vui lòng sao chép thủ công.');
  });
}

export function resetAll(): void {
  const setVal = (id: string, val: string) => {
    const el = document.getElementById(id) as HTMLInputElement | HTMLSelectElement | null;
    if (el) el.value = val;
  };

  setVal('cs-p', '50');
  setVal('cs-d', '5');
  setVal('cs-sigma', '10');
  setVal('cs-dm', '2');
  setVal('cc-p1', '40');
  setVal('cc-p2', '20');
  setVal('cc-r', '1');
  setVal('cc-sigma', '15');
  setVal('cc-delta', '5');
  setVal('cc-r-mean', '1');
  setVal('rct-p1', '60');
  setVal('rct-p2', '40');
  setVal('rct-sigma', '15');
  setVal('rct-delta', '10');
  setVal('stat-alpha', '1.96');
  setVal('stat-power', '0.842');
  setVal('stat-dropout', '10');
  setVal('stat-popsize', '');

  state.study = 'cs';
  state.method = 'cs-prop';
  qsa('.ss-tab-btn').forEach(b => b.classList.toggle('active', b.dataset.study === 'cs'));
  ['cs', 'cc', 'rct'].forEach(s => document.getElementById(`panel-${s}`)?.classList.toggle('ss-hidden', s !== 'cs'));
  setMethod('cs-prop');
  qsa('.ss-method-btn').forEach(b => b.classList.toggle('active', b.dataset.method === 'cs-prop'));
  const fpcInd = document.getElementById('fpc-indicator');
  const fpcEmp = document.getElementById('fpc-empty');
  if (fpcInd) fpcInd.style.display = 'none';
  if (fpcEmp) fpcEmp.style.display = 'block';
  updatePowerGroupVisibility();
  calculate();
}

export function initSampleSizeCalculator(): void {
  // Mobile sidebar
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const appSidebar = document.getElementById('appSidebar');
  const overlay = document.getElementById('sidebarOverlay');
  if (mobileMenuBtn && appSidebar && overlay) {
    mobileMenuBtn.addEventListener('click', e => {
      e.stopPropagation();
      appSidebar.classList.toggle('open');
      overlay.classList.toggle('show');
      document.body.style.overflow = appSidebar.classList.contains('open') ? 'hidden' : '';
    });
    overlay.addEventListener('click', () => {
      appSidebar.classList.remove('open');
      overlay.classList.remove('show');
      document.body.style.overflow = '';
    });
  }

  // Study tab switching
  qsa('.ss-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const study = btn.dataset.study as StudyDesignType;
      state.study = study;

      qsa('.ss-tab-btn').forEach(b => {
        b.classList.toggle('active', b === btn);
        b.setAttribute('aria-selected', (b === btn).toString());
      });

      ['cs', 'cc', 'rct'].forEach(s => {
        const panel = document.getElementById(`panel-${s}`);
        panel?.classList.toggle('ss-hidden', s !== study);
      });

      if (study === 'cs') setMethod('cs-prop');
      else if (study === 'cc') setMethod('cc-prop');
      else if (study === 'rct') setMethod('rct-prop');

      updatePowerGroupVisibility();
      calculate();
    });
  });

  // Method tab switching
  document.addEventListener('click', e => {
    const btn = (e.target as HTMLElement).closest('.ss-method-btn') as HTMLElement | null;
    if (!btn) return;
    const method = btn.dataset.method as CalculationMethodType;
    if (!method) return;
    const tabs = btn.closest('.ss-method-tabs');
    tabs?.querySelectorAll('.ss-method-btn').forEach(b =>
      b.classList.toggle('active', b === btn));
    setMethod(method);
    calculate();
  });

  const btnCopy = document.getElementById('btn-copy');
  if (btnCopy) btnCopy.addEventListener('click', copyResult);

  const btnReset = document.getElementById('btn-reset');
  if (btnReset) btnReset.addEventListener('click', resetAll);

  const allInputs = [
    'cs-p', 'cs-d', 'cs-sigma', 'cs-dm',
    'cc-p1', 'cc-p2', 'cc-r', 'cc-sigma', 'cc-delta', 'cc-r-mean',
    'rct-p1', 'rct-p2', 'rct-sigma', 'rct-delta',
    'stat-alpha', 'stat-power', 'stat-dropout', 'stat-popsize'
  ];
  allInputs.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', calculate);
  });

  updatePowerGroupVisibility();
  setMethod('cs-prop');
  calculate();
}

// Global binding
if (typeof window !== 'undefined') {
  const win = window as any;
  win.calculateSampleSize = calculate;
  win.copyResult = copyResult;
  win.resetAllSampleSize = resetAll;
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSampleSizeCalculator);
  } else {
    initSampleSizeCalculator();
  }
}
