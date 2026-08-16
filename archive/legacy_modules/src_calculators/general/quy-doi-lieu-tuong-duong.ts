/**
 * CliniPortal — Drug Equivalence & Dose Conversion Studio (TypeScript Module)
 * 6 Major Pharmacology Conversion Classes: Corticosteroids, Opioids (OME/MME), Statins (ACC/AHA), PPIs, DOACs, Benzodiazepines
 */

export interface CorticoidDrug {
  name: string;
  equiv: number;
  anti: number;
  mineralo: number;
  t12: string;
}

export interface OpioidDrug {
  name: string;
  factor: number;
  note: string;
}

export interface StatinDrug {
  name: string;
  equiv: number;
  intensity: string;
}

export interface PPIDrug {
  name: string;
  equiv: number;
  stdDose: string;
  maxDose: string;
}

export interface DOACDrug {
  name: string;
  stdDose: string;
  reducedDose: string;
  note: string;
}

export interface BenzoDrug {
  name: string;
  equiv: number;
  onset: string;
  t12: string;
}

export interface EquivCategory {
  title: string;
  desc: string;
  unit: string;
  badge: string;
  pearl: string;
  drugs: any[];
}

export const EQUIV_DATABASE: Record<string, EquivCategory> = {
  corticoid: {
    title: "1. Corticosteroids (Thuốc Kháng Viêm Steroid)",
    desc: "Quy đổi liều tương đương kháng viêm & giữ muối giữa các Glucocorticoid dạng uống/tiêm truyền.",
    unit: "mg",
    badge: "Glucocorticoids",
    pearl: "💡 **Nguyên tắc**: Hydrocortisone có tác dụng giữ muối (mineralocorticoid) cao nhất, trong khi Dexamethasone & Betamethasone có tác dụng kháng viêm rất mạnh nhưng hầu như không giữ muối. 40mg Methylprednisolone tương đương 50mg Prednisolone hoặc 7.5mg Dexamethasone.",
    drugs: [
      { name: "Hydrocortisone", equiv: 20, anti: 1, mineralo: 2, t12: "8-12h (Ngắn)" },
      { name: "Prednisone", equiv: 5, anti: 4, mineralo: 1, t12: "18-36h (Vừa)" },
      { name: "Prednisolone", equiv: 5, anti: 4, mineralo: 1, t12: "18-36h (Vừa)" },
      { name: "Methylprednisolone", equiv: 4, anti: 5, mineralo: 0.5, t12: "18-36h (Vừa)" },
      { name: "Triamcinolone", equiv: 4, anti: 5, mineralo: 0, t12: "18-36h (Vừa)" },
      { name: "Dexamethasone", equiv: 0.75, anti: 30, mineralo: 0, t12: "36-54h (Dài)" },
      { name: "Betamethasone", equiv: 0.6, anti: 30, mineralo: 0, t12: "36-54h (Dài)" }
    ]
  },

  opioid: {
    title: "2. Opioids Pain Management (Quy Đổi MME / OME)",
    desc: "Quy đổi liều Morphine tương đương đường uống (Oral Morphine Equivalent - OME) trong giảm đau cấp & mạn tính.",
    unit: "mg",
    badge: "OME Calculator",
    pearl: "⚠️ **CẢNH BÁO AN TOÀN (Incomplete Cross-Tolerance)**: Khi chuyển đổi từ Opioid này sang Opioid khác, KHÔNG dùng trực tiếp 100% liều tính toán. **Khuyên dùng: Giảm 25% – 50% liều tính toán** để phòng ngừa quá liều suy hô hấp do dung nạp chéo không hoàn toàn.",
    drugs: [
      { name: "Morphine (Uống / PO)", factor: 1, note: "Liều chuẩn so sánh (Factor 1.0)" },
      { name: "Morphine (Tĩnh mạch / IV)", factor: 3, note: "1mg IV = 3mg PO Morphine" },
      { name: "Oxycodone (Uống / PO)", factor: 1.5, note: "Mạnh hơn Morphine uống 1.5 lần" },
      { name: "Hydromorphone (Uống / PO)", factor: 4, note: "Mạnh hơn Morphine uống 4 lần" },
      { name: "Hydromorphone (Tĩnh mạch / IV)", factor: 20, note: "Mạnh hơn Morphine uống 20 lần" },
      { name: "Fentanyl dán (mcg/h)", factor: 2.4, note: "25 mcg/h miếng dán ≈ 60 mg/ngày Oral Morphine" },
      { name: "Tramadol (Uống / PO)", factor: 0.1, note: "Bằng 1/10 liều Morphine" },
      { name: "Codeine (Uống / PO)", factor: 0.15, note: "Bằng 15% liều Morphine" },
      { name: "Methadone (Uống / PO)", factor: 4, note: "Thay đổi tùy liều dùng (Cần tham vấn chuyên gia)" }
    ]
  },

  statin: {
    title: "3. Statins (Thuốc Hạ Lipid Máu Tương Đương)",
    desc: "Quy đổi liều Statin đạt mức giảm LDL-C tương đương theo khuyến cáo ACC/AHA.",
    unit: "mg",
    badge: "Lipid Lowering",
    pearl: "💡 **Cường độ hạ LDL-C**: Cường độ Cao (Giảm LDL-C ≥ 50%: Atorvastatin 40-80mg, Rosuvastatin 20-40mg); Cường độ Trung bình (Giảm 30-40%: Atorvastatin 10-20mg, Rosuvastatin 5-10mg, Simvastatin 20-40mg); Cường độ Thấp (< 30%: Simvastatin 10mg, Pravastatin 10-20mg).",
    drugs: [
      { name: "Atorvastatin", equiv: 20, intensity: "Trung bình (20mg) / Cao (40-80mg)" },
      { name: "Rosuvastatin", equiv: 10, intensity: "Trung bình (10mg) / Cao (20-40mg)" },
      { name: "Simvastatin", equiv: 40, intensity: "Trung bình (20-40mg)" },
      { name: "Pravastatin", equiv: 40, intensity: "Trung bình (40-80mg)" },
      { name: "Lovastatin", equiv: 40, intensity: "Trung bình (40mg)" },
      { name: "Fluvastatin", equiv: 80, intensity: "Trung bình (80mg)" },
      { name: "Pitavastatin", equiv: 2, intensity: "Trung bình (2-4mg)" }
    ]
  },

  ppi: {
    title: "4. PPIs (Thuốc Ức Chế Bơm Proton Dạ Dày)",
    desc: "Quy đổi liều chuẩn tương đương 20mg Omeprazole trong điều trị GERD, loét dạ dày tá tràng & diệt H.pylori.",
    unit: "mg",
    badge: "Acid Suppression",
    pearl: "💡 **Nguyên tắc kê đơn**: 20mg Omeprazole tương đương 20mg Esomeprazole, 40mg Pantoprazole, 20mg Rabeprazole và 30mg Lansoprazole. Nên uống PPI trước bữa ăn sáng 30-60 phút để đạt hiệu quả ức chế H+ K+-ATPase tối ưu.",
    drugs: [
      { name: "Omeprazole", equiv: 20, stdDose: "20 mg 1 lần/ngày", maxDose: "40 mg 2 lần/ngày" },
      { name: "Esomeprazole", equiv: 20, stdDose: "20 mg 1 lần/ngày", maxDose: "40 mg 2 lần/ngày" },
      { name: "Pantoprazole", equiv: 40, stdDose: "40 mg 1 lần/ngày", maxDose: "40 mg 2 lần/ngày" },
      { name: "Rabeprazole", equiv: 20, stdDose: "20 mg 1 lần/ngày", maxDose: "20 mg 2 lần/ngày" },
      { name: "Lansoprazole", equiv: 30, stdDose: "30 mg 1 lần/ngày", maxDose: "30 mg 2 lần/ngày" },
      { name: "Dexlansoprazole", equiv: 30, stdDose: "30 mg 1 lần/ngày", maxDose: "60 mg 1 lần/ngày" }
    ]
  },

  doac: {
    title: "5. DOACs (Thuốc Chống Đông Đường Uống Thế Hệ Mới)",
    desc: "Tra cứu & quy đổi liều chuẩn vs Liều giảm của DOACs trong Rung nhĩ không do bệnh van tim (NVAF).",
    unit: "mg",
    badge: "Anticoagulation",
    pearl: "⚠️ **Cảnh báo suy thận**: Giảm liều DOACs khi: Apixaban (có ≥ 2 tiêu chí: Tuổi ≥ 80, Cân nặng ≤ 60kg, CrSCr ≥ 1.5 mg/dL -> dùng 2.5mg x 2); Rivaroxaban (CrCl 15-49 ml/min -> dùng 15mg/ngày); Dabigatran (CrCl 30-50 ml/min -> dùng 110mg x 2).",
    drugs: [
      { name: "Apixaban (Eliquis)", stdDose: "5 mg x 2 lần/ngày", reducedDose: "2.5 mg x 2 lần/ngày", note: "Giảm liều nếu thỏa 2/3 tiêu chí: Tuổi≥80, Nặng≤60kg, SCr≥1.5mg/dL" },
      { name: "Rivaroxaban (Xarelto)", stdDose: "20 mg x 1 lần/ngày (cùng ăn)", reducedDose: "15 mg x 1 lần/ngày", note: "Giảm liều khi CrCl 15–49 mL/phút. Chống chỉ định CrCl < 15" },
      { name: "Dabigatran (Pradaxa)", stdDose: "150 mg x 2 lần/ngày", reducedDose: "110 mg x 2 lần/ngày", note: "Giảm liều khi Tuổi≥80 hoặc CrCl 30–50 mL/phút" },
      { name: "Edoxaban (Lixiana)", stdDose: "60 mg x 1 lần/ngày", reducedDose: "30 mg x 1 lần/ngày", note: "Giảm liều khi CrCl 15–50 mL/phút hoặc Nặng ≤ 60kg" }
    ]
  },

  benzo: {
    title: "6. Benzodiazepines (Thuốc An Thần & Kháng Co Giật)",
    desc: "Quy đổi liều an thần tương đương 10mg Diazepam giúp lập kế hoạch giảm liều từ từ (Tapering).",
    unit: "mg",
    badge: "Sedatives",
    pearl: "💡 **Lưu ý giảm liều**: 10mg Diazepam tương đương 0.5mg Alprazolam, 0.5mg Clonazepam và 1mg Lorazepam. Khi cai thuốc Benzo mạn tính, khuyên giảm 10% liều mỗi 1-2 tuần để tránh hội chứng cai nghiện (Withdrawal Syndrome).",
    drugs: [
      { name: "Diazepam (Seduxen)", equiv: 10, onset: "Nhanh (15-30p)", t12: "20-100h (Rất dài)" },
      { name: "Alprazolam (Xanax)", equiv: 0.5, onset: "Nhanh", t12: "11-16h (Trung bình)" },
      { name: "Clonazepam (Rivotril)", equiv: 0.5, onset: "Trung bình", t12: "18-50h (Dài)" },
      { name: "Lorazepam (Ativan)", equiv: 1, onset: "Trung bình", t12: "10-20h (Trung bình)" },
      { name: "Midazolam (Dormicum)", equiv: 7.5, onset: "Rất nhanh", t12: "1.5-3h (Ngắn)" },
      { name: "Oxazepam", equiv: 20, onset: "Chậm", t12: "4-15h (Ngắn)" }
    ]
  }
};

let currentCatKey = 'corticoid';

export function setupCategoryUI(): void {
  const cat = EQUIV_DATABASE[currentCatKey];
  if (!cat) return;

  const catTitle = document.getElementById('cat-title');
  const catDesc = document.getElementById('cat-desc');
  const catBadge = document.getElementById('cat-badge');
  const pearlText = document.getElementById('clinical-pearl-text');
  const doseValInput = document.getElementById('input-dose-val') as HTMLInputElement | null;
  const baseDrugSelect = document.getElementById('input-base-drug') as HTMLSelectElement | null;

  if (catTitle) catTitle.textContent = cat.title;
  if (catDesc) catDesc.textContent = cat.desc;
  if (catBadge) catBadge.textContent = cat.badge;
  if (pearlText) pearlText.innerHTML = cat.pearl;

  if (doseValInput) {
    if (currentCatKey === 'corticoid') doseValInput.value = '40';
    if (currentCatKey === 'opioid') doseValInput.value = '30';
    if (currentCatKey === 'statin') doseValInput.value = '20';
    if (currentCatKey === 'ppi') doseValInput.value = '20';
    if (currentCatKey === 'doac') doseValInput.value = '5';
    if (currentCatKey === 'benzo') doseValInput.value = '10';
  }

  if (baseDrugSelect) {
    baseDrugSelect.innerHTML = cat.drugs.map(d => `<option value="${d.name}">${d.name}</option>`).join('');
  }

  calculateAndRender();
}

export function calculateAndRender(): void {
  const cat = EQUIV_DATABASE[currentCatKey];
  const doseValInput = document.getElementById('input-dose-val') as HTMLInputElement | null;
  const baseDrugSelect = document.getElementById('input-base-drug') as HTMLSelectElement | null;
  const val = parseFloat(doseValInput?.value || '0') || 0;
  const baseDrugName = baseDrugSelect?.value || '';

  if (currentCatKey === 'corticoid') renderCorticoidTable(cat, val, baseDrugName);
  else if (currentCatKey === 'opioid') renderOpioidTable(cat, val, baseDrugName);
  else if (currentCatKey === 'statin') renderStatinTable(cat, val, baseDrugName);
  else if (currentCatKey === 'ppi') renderPPITable(cat, val, baseDrugName);
  else if (currentCatKey === 'doac') renderDOACTable(cat);
  else if (currentCatKey === 'benzo') renderBenzoTable(cat, val, baseDrugName);
}

export function renderCorticoidTable(cat: EquivCategory, val: number, baseName: string): void {
  const container = document.getElementById('converter-results-container');
  if (!container) return;
  const baseItem = cat.drugs.find(d => d.name === baseName) || cat.drugs[0];
  let html = `
    <table class="conversion-table">
      <thead>
        <tr>
          <th>Tên Corticosteroid</th>
          <th>Liều Quy Đổi Tương Đương</th>
          <th>Tác Dụng Kháng Viêm</th>
          <th>Tác Dụng Giữ Muối</th>
          <th>Thời Gian Tác Dụng (t<sub>1/2</sub>)</th>
        </tr>
      </thead>
      <tbody>
  `;
  cat.drugs.forEach(item => {
    const calcDose = ((val * item.equiv) / baseItem.equiv).toFixed(2);
    const isSelected = item.name === baseName;
    html += `
      <tr class="${isSelected ? 'highlight-row' : ''}">
        <td><strong>${item.name}</strong> ${isSelected ? '(Thuốc gốc chọn)' : ''}</td>
        <td><span style="color:var(--color-primary); font-weight:700; font-size:0.95rem;">${calcDose} mg</span></td>
        <td>${item.anti}x</td>
        <td>${item.mineralo}x</td>
        <td>${item.t12}</td>
      </tr>
    `;
  });
  html += `</tbody></table>`;
  container.innerHTML = html;
}

export function renderOpioidTable(cat: EquivCategory, val: number, baseName: string): void {
  const container = document.getElementById('converter-results-container');
  if (!container) return;
  const baseItem = cat.drugs.find(d => d.name === baseName) || cat.drugs[0];
  const calculatedOME = val * baseItem.factor;

  let html = `
    <div style="background: rgba(2,132,199,0.08); padding: 0.75rem 1rem; border-radius: 8px; margin-bottom: 1rem; border: 1px solid var(--color-primary-hl);">
      <span style="font-size:0.85rem; color:var(--color-text-muted);">Tổng liều Morphine Uống tương đương (Total OME):</span>
      <span style="font-size:1.25rem; font-weight:800; color:var(--color-primary); margin-left:0.5rem;">${calculatedOME.toFixed(1)} mg/ngày (Oral Morphine)</span>
    </div>
    <table class="conversion-table">
      <thead>
        <tr>
          <th>Tên Opioid / Đường dùng</th>
          <th>Liều Tương Đương Tính Toán (100%)</th>
          <th>Liều Khuyên Dùng Sau Giảm 30% (An toàn)</th>
          <th>Ghi chú Lâm sàng</th>
        </tr>
      </thead>
      <tbody>
  `;

  cat.drugs.forEach(item => {
    const calcDose = (calculatedOME / item.factor).toFixed(1);
    const safeDose = (parseFloat(calcDose) * 0.7).toFixed(1);
    const isSelected = item.name === baseName;

    html += `
      <tr class="${isSelected ? 'highlight-row' : ''}">
        <td><strong>${item.name}</strong> ${isSelected ? '(Đang dùng)' : ''}</td>
        <td><span style="font-weight:700; color:var(--color-text);">${calcDose} mg</span></td>
        <td><span style="font-weight:700; color:var(--color-success);">${safeDose} mg</span></td>
        <td style="font-size:0.8rem; color:var(--color-text-muted);">${item.note}</td>
      </tr>
    `;
  });
  html += `</tbody></table>`;
  container.innerHTML = html;
}

export function renderStatinTable(cat: EquivCategory, val: number, baseName: string): void {
  const container = document.getElementById('converter-results-container');
  if (!container) return;
  const baseItem = cat.drugs.find(d => d.name === baseName) || cat.drugs[0];
  let html = `
    <table class="conversion-table">
      <thead>
        <tr>
          <th>Tên Statin</th>
          <th>Liều Tương Đương Mức Hạ LDL-C</th>
          <th>Phân Nhóm Cường Độ Theo ACC/AHA</th>
        </tr>
      </thead>
      <tbody>
  `;
  cat.drugs.forEach(item => {
    const calcDose = ((val * item.equiv) / baseItem.equiv).toFixed(1);
    const isSelected = item.name === baseName;
    html += `
      <tr class="${isSelected ? 'highlight-row' : ''}">
        <td><strong>${item.name}</strong> ${isSelected ? '(Đang dùng)' : ''}</td>
        <td><span style="color:var(--color-primary); font-weight:700; font-size:0.95rem;">${calcDose} mg/ngày</span></td>
        <td><span class="drug-caution caution-low">${item.intensity}</span></td>
      </tr>
    `;
  });
  html += `</tbody></table>`;
  container.innerHTML = html;
}

export function renderPPITable(cat: EquivCategory, val: number, baseName: string): void {
  const container = document.getElementById('converter-results-container');
  if (!container) return;
  const baseItem = cat.drugs.find(d => d.name === baseName) || cat.drugs[0];
  let html = `
    <table class="conversion-table">
      <thead>
        <tr>
          <th>Tên Thuốc PPI</th>
          <th>Liều Tương Đương Tính Toán</th>
          <th>Liều Khởi Đầu Chuẩn</th>
          <th>Liều Tối Đa Tác Dụng Kép</th>
        </tr>
      </thead>
      <tbody>
  `;
  cat.drugs.forEach(item => {
    const calcDose = Math.round((val * item.equiv) / baseItem.equiv);
    const isSelected = item.name === baseName;
    html += `
      <tr class="${isSelected ? 'highlight-row' : ''}">
        <td><strong>${item.name}</strong> ${isSelected ? '(Đang dùng)' : ''}</td>
        <td><span style="color:var(--color-primary); font-weight:700;">${calcDose} mg/ngày</span></td>
        <td>${item.stdDose}</td>
        <td>${item.maxDose}</td>
      </tr>
    `;
  });
  html += `</tbody></table>`;
  container.innerHTML = html;
}

export function renderDOACTable(cat: EquivCategory): void {
  const container = document.getElementById('converter-results-container');
  if (!container) return;
  let html = `
    <table class="conversion-table">
      <thead>
        <tr>
          <th>Tên Thuốc DOAC</th>
          <th>Liều Chuẩn Rung Nhĩ (NVAF)</th>
          <th>Liều Hiệu Chỉnh / Giảm Liều</th>
          <th>Tiêu Chí Giảm Liều Lâm Sàng</th>
        </tr>
      </thead>
      <tbody>
  `;
  cat.drugs.forEach(item => {
    html += `
      <tr>
        <td><strong>${item.name}</strong></td>
        <td><span style="color:var(--color-primary); font-weight:700;">${item.stdDose}</span></td>
        <td><span style="color:var(--color-warning); font-weight:700;">${item.reducedDose}</span></td>
        <td style="font-size:0.8rem; color:var(--color-text-muted);">${item.note}</td>
      </tr>
    `;
  });
  html += `</tbody></table>`;
  container.innerHTML = html;
}

export function renderBenzoTable(cat: EquivCategory, val: number, baseName: string): void {
  const container = document.getElementById('converter-results-container');
  if (!container) return;
  const baseItem = cat.drugs.find(d => d.name === baseName) || cat.drugs[0];
  let html = `
    <table class="conversion-table">
      <thead>
        <tr>
          <th>Tên Benzodiazepine</th>
          <th>Liều An Thần Tương Đương</th>
          <th>Tốc Độ Khởi Phát (Onset)</th>
          <th>Thời Gian Bán Thải (t<sub>1/2</sub>)</th>
        </tr>
      </thead>
      <tbody>
  `;
  cat.drugs.forEach(item => {
    const calcDose = ((val * item.equiv) / baseItem.equiv).toFixed(2);
    const isSelected = item.name === baseName;
    html += `
      <tr class="${isSelected ? 'highlight-row' : ''}">
        <td><strong>${item.name}</strong> ${isSelected ? '(Đang dùng)' : ''}</td>
        <td><span style="color:var(--color-primary); font-weight:700; font-size:0.95rem;">${calcDose} mg</span></td>
        <td>${item.onset}</td>
        <td>${item.t12}</td>
      </tr>
    `;
  });
  html += `</tbody></table>`;
  container.innerHTML = html;
}

export function initDrugEquivStudio(): void {
  const tabBtns = document.querySelectorAll('.converter-tab-btn');
  const doseValInput = document.getElementById('input-dose-val');
  const baseDrugSelect = document.getElementById('input-base-drug');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', function (this: HTMLElement) {
      tabBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      currentCatKey = this.getAttribute('data-cat') || 'corticoid';
      setupCategoryUI();
    });
  });

  if (doseValInput) doseValInput.addEventListener('input', calculateAndRender);
  if (baseDrugSelect) baseDrugSelect.addEventListener('change', calculateAndRender);

  setupCategoryUI();
}

// Global binding
if (typeof window !== 'undefined') {
  const win = window as any;
  win.setupCategoryUI = setupCategoryUI;
  win.calculateAndRender = calculateAndRender;
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDrugEquivStudio);
  } else {
    initDrugEquivStudio();
  }
}
