/**
 * CliniPortal — Comprehensive Fluid Resuscitation Studio (TypeScript Module)
 * Multi-scenario emergency fluid management: Diarrhea/Cholera, Dengue, Sepsis, DKA/HHS, Burn, Cardiogenic shock
 */

export type FluidScenarioType = 'DIARRHEA' | 'DHF_WARN' | 'DHF_SEVERE' | 'SEPSIS' | 'DKA' | 'BURN' | 'CARDIO';

export let currentScenario: FluidScenarioType | null = null;

const SC_MAP: Record<FluidScenarioType, string> = {
  'DIARRHEA': 'sc-diarrhea',
  'DHF_WARN': 'sc-dhf-warn',
  'DHF_SEVERE': 'sc-dhf-severe',
  'SEPSIS': 'sc-sepsis',
  'DKA': 'sc-dka',
  'BURN': 'sc-burn',
  'CARDIO': 'sc-cardio'
};

const ALL_WRAPPERS = [
  'group-age', 'group-diarrhea-grade', 'group-hct-wrapper', 'group-dhf-type', 
  'group-sepsis-wrapper', 'group-dka-wrapper1', 'group-dka-comorbid', 
  'group-burn-wrapper', 'group-cardio-wrapper'
];

export function resetForm(): void {
  currentScenario = null;
  document.querySelectorAll('.fluid-sc-btn').forEach(b => b.classList.remove('active'));
  const show = (id: string, v: boolean) => { const el = document.getElementById(id); if (el) el.style.display = v ? '' : 'none'; };
  
  ALL_WRAPPERS.forEach(id => show(id, false));
  
  const resEmpty = document.getElementById('result-empty');
  const resContent = document.getElementById('result-content');
  const useRt = document.getElementById('use-realtime') as HTMLInputElement | null;
  
  if (resEmpty) resEmpty.style.display = 'flex';
  if (resContent) resContent.style.display = 'none';
  if (useRt) useRt.checked = false;
  toggleRealtime();
}

export function highlightDoses(text: string): string {
  if (!text) return text;
  const pattern = /(<[^>]+>)|(\b\d+(?:\.\d+)?(?:[–-]\d+(?:\.\d+)?)?\s*(?:mL\/giờ|mL\/kg\/giờ|mL\/kg|mL|ml|giọt\/phút|Lít|lít|mg|mcg|g|ĐV|UI|%|giờ|phút)\b)/gi;
  return text.replace(pattern, (match, p1, p2) => {
    if (p1) return p1;
    return `<span class="dose-highlight">${p2}</span>`;
  });
}

export function setScenario(sc: FluidScenarioType): void {
  currentScenario = sc;
  document.querySelectorAll('.fluid-sc-btn').forEach(b => b.classList.remove('active'));
  const btn = document.getElementById(SC_MAP[sc]);
  if (btn) btn.classList.add('active');

  const show = (id: string, v: boolean) => {
    const el = document.getElementById(id);
    if (el) el.style.display = v ? '' : 'none';
  };
  
  ALL_WRAPPERS.forEach(id => show(id, false));

  if (sc === 'DIARRHEA') { show('group-diarrhea-grade', true); }
  if (sc === 'DHF_WARN') { show('group-hct-wrapper', true); }
  if (sc === 'DHF_SEVERE') { show('group-hct-wrapper', true); show('group-dhf-type', true); }
  if (sc === 'SEPSIS') { show('group-sepsis-wrapper', true); }
  if (sc === 'DKA') { show('group-dka-wrapper1', true); show('group-dka-comorbid', true); }
  if (sc === 'BURN') { show('group-burn-wrapper', true); }
  if (sc === 'CARDIO') { show('group-cardio-wrapper', true); }

  const resEmpty = document.getElementById('result-empty');
  const resContent = document.getElementById('result-content');
  if (resEmpty) resEmpty.style.display = 'none';
  if (resContent) resContent.style.display = 'block';

  calculate();
}

export function toggleRealtime(): void {
  const cb = document.getElementById('use-realtime') as HTMLInputElement | null;
  const grp = document.getElementById('datetime-group');
  if (!cb || !grp) return;
  grp.style.display = cb.checked ? 'flex' : 'none';
  const startInput = document.getElementById('start-datetime') as HTMLInputElement | null;
  if (cb.checked && startInput && !startInput.value) {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    startInput.value = now.toISOString().slice(0, 16);
  }
  calculate();
}

export function getRealtimeStart(): Date | null {
  const cb = document.getElementById('use-realtime') as HTMLInputElement | null;
  if (!cb || !cb.checked) return null;
  const v = (document.getElementById('start-datetime') as HTMLInputElement | null)?.value;
  return v ? new Date(v) : null;
}

export function fmtTime(d: Date): string {
  return d.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', hour12: false });
}

export function fmtDate(d: Date): string {
  return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' });
}

export function fmtDateTime(d: Date): string {
  return fmtTime(d) + ' ' + fmtDate(d);
}

export function addHours(base: Date, h: number): Date {
  return new Date(base.getTime() + h * 3600000);
}

export function timeCol(startH: number, endH: number, baseDate: Date | null): string {
  if (!baseDate) return '';
  const s = addHours(baseDate, startH);
  const e = addHours(baseDate, endH);
  return `<td style="color:var(--bd-blue);font-weight:600;">${fmtDateTime(s)} → ${fmtDateTime(e)}</td>`;
}

export function timeColHeader(baseDate: Date | null): string {
  return baseDate ? '<th>Thời gian thực</th>' : '';
}

export function val(id: string): number {
  return parseFloat((document.getElementById(id) as HTMLInputElement)?.value) || 0;
}

export function sel(id: string): string {
  const e = document.getElementById(id) as HTMLSelectElement | null;
  return e ? e.value : '';
}

export function r(n: number): number {
  return Math.round(n);
}

export function calculate(): void {
  if (!currentScenario) return;
  const weight = val('pt-weight');
  if (!weight) return;
  const rt = getRealtimeStart();
  let title = '', html = '', titleColor = '';

  if (currentScenario === 'DIARRHEA') {
    const grade = sel('diarrhea-grade');
    title = '💧 Y LỆNH BÙ DỊCH – TIÊU CHẢY CẤP / TẢ';
    titleColor = 'var(--bd-blue)';
    let deficit = 0, maintenance = weight * 40;
    
    if (grade === 'mild') {
      deficit = weight * 0.04 * 1000;
      html = `
        <div class="fluid-card fc-green">
            <div class="fluid-card-title" style="color:var(--bd-green);">🟢 Mất nước nhẹ (&lt; 5%) – Bù qua đường uống</div>
            <div class="fluid-card-body">
                <strong>Ước lượng lượng nước thiếu hụt:</strong> ~${r(deficit)} mL<br>
                <strong>Phác đồ:</strong> Bổ sung qua đường uống (PO). KHÔNG cần truyền TM.<br>
                <strong>ORS:</strong> ${r(deficit)}–${r(deficit * 1.5)} mL trong 4 giờ đầu + ${r(maintenance)} mL/24h duy trì
            </div>
        </div>
        <div class="ab ab-ok"><strong>✅ Phác đồ A (WHO):</strong> ORS tự do theo nhu cầu. Theo dõi tại nhà nếu không có dấu hiệu cảnh báo. Tái khám nếu tiêu chảy nhiều hơn hoặc không uống được.</div>
        <div class="ab ab-info"><strong>💡 Điều chỉnh ORS:</strong> Sau mỗi lần đi ngoài: Trẻ &lt; 2 tuổi: 50–100mL | Trẻ 2–10 tuổi: 100–200mL | Người lớn: uống tùy thích.</div>
        <span class="src-badge">📚 WHO Oral Rehydration Therapy Guidelines & QĐ 2919/QĐ-BYT</span>`;
    } else if (grade === 'moderate') {
      deficit = weight * 0.075 * 1000;
      const rlRate = r(deficit / 4);
      const thR = timeColHeader(rt);
      
      html = `
        <div class="fluid-card fc-blue">
            <div class="fluid-card-title" style="color:var(--bd-blue);">🔵 Mất nước vừa (5–10%) – Bù qua đường TM + uống</div>
            <div class="fluid-card-body">
                <strong>Ước lượng thiếu hụt:</strong> ~${r(deficit)} mL<br>
                <strong>Dịch:</strong> Ringer Lactate (RL) – Dịch tinh thể cân bằng ưu tiên hàng đầu
            </div>
        </div>
        <table class="fluid-table">
            <thead><tr><th>Giai đoạn</th><th>Tốc độ</th><th>Hành động</th>${thR}</tr></thead>
            <tbody>
                <tr><td>0–4 giờ (Bù)</td><td><strong>${rlRate} mL/giờ</strong></td><td>RL truyền nhanh</td>${timeCol(0, 4, rt)}</tr>
                <tr><td>Sau 4 giờ (Duy trì)</td><td>${r(maintenance / 20)} mL/giờ</td><td>Chuyển ORS khi uống được</td>${timeCol(4, 24, rt)}</tr>
            </tbody>
        </table>
        <div class="ab ab-warn"><strong>⚠️ Phác đồ B (WHO):</strong> Theo dõi mạch, HA, nước tiểu mỗi 30 phút. Sau 4 giờ đánh giá lại: nếu tốt → chuyển ORS. Nếu xấu hơn → nâng lên Phác đồ C.</div>
        <div class="ab ab-info"><strong>💡 Theo dõi đáp ứng:</strong> Nước tiểu &gt; 0.5 mL/kg/giờ, mạch &lt; 100, hết mắt trũng, lưỡi ẩm.</div>
        <span class="src-badge">📚 WHO, QĐ 2919/QĐ-BYT (Phác đồ B)</span>`;
    } else {
      deficit = weight * 0.10 * 1000;
      const phase1 = r(weight * 30);
      const thR = timeColHeader(rt);
      
      html = `
        <div class="fluid-card fc-red">
            <div class="fluid-card-title" style="color:var(--bd-red);">🔴 Mất nước nặng (&gt; 10%) – Cấp cứu TM khẩn cấp (Phác đồ C)</div>
            <div class="fluid-card-body">
                <strong>Ước lượng thiếu hụt:</strong> ~${r(deficit)} mL<br>
                <strong>Dịch:</strong> Ringer Lactate (RL) – Chạy nhanh nhất có thể
            </div>
        </div>
        <table class="fluid-table">
            <thead><tr><th>Pha</th><th>Thể tích / Tốc độ</th><th>Chi tiết</th>${thR}</tr></thead>
            <tbody>
                <tr><td>Pha 1 – 30 phút đầu</td><td><strong>${phase1} mL</strong> bolus nhanh</td><td>RL chạy tối đa</td>${timeCol(0, 0.5, rt)}</tr>
                <tr><td>Pha 2 – 2.5 giờ tiếp</td><td><strong>${r((deficit * 0.6) / 2.5)} mL/giờ</strong></td><td>Bù phần còn lại</td>${timeCol(0.5, 3, rt)}</tr>
            </tbody>
        </table>
        <div class="ab ab-danger"><strong>🚨 Sốc mất nước:</strong> Nếu mạch không bắt được, tụt HA → Truyền nhanh 100mL/kg trong 3 giờ đầu. Theo dõi liên tục mỗi 15–30 phút.</div>
        <div class="ab ab-warn"><strong>⚠️ Chú ý Tả:</strong> Nếu nghi ngờ dịch tả (phân nước vo gạo ào ạt) – Bù dịch cực kỳ tích cực. Kháng sinh: Azithromycin 1g liều duy nhất (người lớn).</div>
        <span class="src-badge">📚 WHO Phác đồ C, QĐ 2919/QĐ-BYT</span>`;
    }
  }

  else if (currentScenario === 'DHF_WARN') {
    const hct = val('pt-hct');
    const ageGrp = sel('dhf-age-group');
    title = '🟡 Y LỆNH BÙ DỊCH – SXHD CÓ DHCB';
    titleColor = 'var(--bd-amber)';
    const thR = timeColHeader(rt);

    let rows = '';
    if (ageGrp === 'adult') {
      rows = `
        <tr><td>0–2 giờ</td><td><strong>${r(weight * 6)} mL/giờ</strong> (6 mL/kg/h)</td><td>Đánh giá lại lâm sàng</td>${timeCol(0, 2, rt)}</tr>
        <tr><td>2–4 giờ</td><td>${r(weight * 5)} mL/giờ (5 mL/kg/h)</td><td>Kiểm tra HCT</td>${timeCol(2, 4, rt)}</tr>
        <tr><td>4–6 giờ</td><td>${r(weight * 3)} mL/giờ (3 mL/kg/h)</td><td>Nếu cải thiện → duy trì</td>${timeCol(4, 6, rt)}</tr>
        <tr><td>6–24 giờ</td><td>${r(weight * 2.5)} mL/giờ (2.5 mL/kg/h)</td><td>Giảm dần theo lâm sàng</td>${timeCol(6, 24, rt)}</tr>`;
    } else if (ageGrp === 'adolescent') {
      rows = `
        <tr><td>0–1 giờ</td><td><strong>${r(weight * 6)} mL/giờ</strong> (6 mL/kg/h)</td><td>Đánh giá lại lâm sàng</td>${timeCol(0, 1, rt)}</tr>
        <tr><td>1–2 giờ</td><td>${r(weight * 5)} mL/giờ (5 mL/kg/h)</td><td>Kiểm tra HCT</td>${timeCol(1, 2, rt)}</tr>
        <tr><td>2–4 giờ</td><td>${r(weight * 3)} mL/giờ (3 mL/kg/h)</td><td>Thời gian rút gọn 1/2</td>${timeCol(2, 4, rt)}</tr>
        <tr><td>4–12 giờ</td><td>${r(weight * 2.5)} mL/giờ (2.5 mL/kg/h)</td><td>Giảm dần, tránh quá tải</td>${timeCol(4, 12, rt)}</tr>`;
    } else {
      rows = `
        <tr><td>0–2 giờ</td><td><strong>${r(weight * 6)} mL/giờ</strong> (6 mL/kg/h)</td><td>Đánh giá lại lâm sàng</td>${timeCol(0, 2, rt)}</tr>
        <tr><td>2–4 giờ</td><td>${r(weight * 5)} mL/giờ (5 mL/kg/h)</td><td>Kiểm tra HCT</td>${timeCol(2, 4, rt)}</tr>
        <tr><td>4–8 giờ</td><td>${r(weight * 3)} mL/giờ (3 mL/kg/h)</td><td>Nếu cải thiện → duy trì</td>${timeCol(4, 8, rt)}</tr>
        <tr><td>8–24 giờ</td><td>${r(weight * 2.5)} mL/giờ (2.5 mL/kg/h)</td><td>Giảm dần theo lâm sàng</td>${timeCol(8, 24, rt)}</tr>`;
    }

    let hctStatus = '';
    if (hct >= 45) hctStatus = '<span style="color:var(--bd-red);font-weight:700;">(Tăng – Thoát huyết tương)</span>';
    else if (hct < 40) hctStatus = '<span style="color:var(--bd-green);font-weight:700;">(Có thể cải thiện)</span>';
    else hctStatus = '<span style="color:var(--bd-amber);font-weight:700;">(Theo dõi sát)</span>';

    html = `
    <div class="ab ab-warn"><strong>⚠️ Dấu hiệu cảnh báo theo BYT:</strong> Đau bụng nhiều, nôn ói liên tục, xuất huyết niêm mạc, li bì/bứt rứt, gan to > 2cm, HCT tăng cao kèm TC giảm nhanh.</div>
    <div class="fluid-card fc-amber">
        <div class="fluid-card-title" style="color:var(--bd-amber);">Phác đồ Bù dịch SXHD Có DHCB – ${ageGrp === 'adult' ? 'Người lớn' : ageGrp === 'adolescent' ? 'Thiếu niên 13–16 tuổi' : 'Trẻ em'}</div>
        <div class="fluid-card-body">
            <strong>Dịch:</strong> Ringer Lactate (RL) – Lựa chọn ưu tiên. <em>Suy gan → Ringer Acetate</em><br>
            <strong>HCT hiện tại:</strong> ${hct}% ${hctStatus}
        </div>
    </div>
    <div class="rate-display rate-amber">
        <div><div class="rate-label">Tốc độ khởi đầu</div><div class="rate-sub">RL truyền nhỏ giọt tĩnh mạch</div></div>
        <div style="text-align:right;"><span class="rate-val" style="color:var(--bd-amber);">${r(weight * 6)}</span><span class="rate-unit">mL/giờ</span></div>
    </div>
    <table class="fluid-table">
        <thead><tr><th>Thời điểm</th><th>Tốc độ</th><th>Hành động</th>${thR}</tr></thead>
        <tbody>${rows}</tbody>
    </table>
    <div class="ab ab-danger"><strong>🚨 Chỉ định chuyển sốc:</strong> Mạch nhanh nhẹ khó bắt, HA kẹt ≤ 20mmHg, tứ chi lạnh, bứt rứt li bì → Chuyển Phác đồ Sốc Dengue.</div>
    <span class="src-badge">📚 Hướng dẫn chẩn đoán và điều trị SXHD – BYT 2019</span>`;
  }

  else if (currentScenario === 'DHF_SEVERE') {
    const hct = val('pt-hct');
    const type = sel('dhf-type');
    const ageGrp = sel('dhf-age-group');
    title = '🔴 Y LỆNH BÙ DỊCH – SỐC DENGUE';
    titleColor = 'var(--bd-red)';
    const thR = timeColHeader(rt);

    const isChild = (ageGrp === 'child' || ageGrp === 'adolescent');
    const isDecomp = (type === 'decompensated');

    let bolusSection = '';
    let stepdownTable = '';

    if (!isDecomp) {
      if (isChild) {
        const bolus = r(weight * 20);
        bolusSection = `
        <div class="rate-display rate-red">
            <div><div class="rate-label">Bolus – Ringer Lactate (1 giờ)</div><div class="rate-sub">20 mL/kg/giờ trong 1 giờ</div></div>
            <div style="text-align:right;"><span class="rate-val" style="color:var(--bd-red);">${bolus}</span><span class="rate-unit">mL</span></div>
        </div>
        <div class="ab ab-warn"><strong>⚠️ Đánh giá lại sau 1 giờ:</strong><br>
            ✅ Cải thiện → Giảm: 10 mL/kg/h → 7.5 mL/kg/h → 5 mL/kg/h → 3 mL/kg/h<br>
            ❌ Không cải thiện + Hct tăng/≥ 40% → Cao phân tử 10–20 mL/kg/h trong 1h</div>`;
        const factor = ageGrp === 'adolescent' ? 0.5 : 1;
        stepdownTable = `
        <table class="fluid-table">
            <thead><tr><th>Giai đoạn</th><th>Tốc độ</th><th>Thời gian</th>${thR}</tr></thead>
            <tbody>
                <tr><td>Giảm 1</td><td>${r(weight * 10)} mL/giờ (10 mL/kg/h)</td><td>${r(1 * factor)}–${r(2 * factor)} giờ</td>${timeCol(1, 1 + 2 * factor, rt)}</tr>
                <tr><td>Giảm 2</td><td>${r(weight * 7.5)} mL/giờ (7.5 mL/kg/h)</td><td>${r(1 * factor)}–${r(2 * factor)} giờ</td>${timeCol(1 + 2 * factor, 1 + 4 * factor, rt)}</tr>
                <tr><td>Giảm 3</td><td>${r(weight * 5)} mL/giờ (5 mL/kg/h)</td><td>${r(3 * factor)}–${r(4 * factor)} giờ</td>${timeCol(1 + 4 * factor, 1 + 8 * factor, rt)}</tr>
                <tr><td>Duy trì</td><td>${r(weight * 3)} mL/giờ (3 mL/kg/h)</td><td>${r(4 * factor)}–${r(6 * factor)} giờ</td>${timeCol(1 + 8 * factor, 1 + 14 * factor, rt)}</tr>
            </tbody>
        </table>`;
      } else {
        const bolus = r(weight * 15);
        bolusSection = `
        <div class="rate-display rate-red">
            <div><div class="rate-label">Bolus – Ringer Lactate (1 giờ)</div><div class="rate-sub">15 mL/kg/giờ trong 1 giờ</div></div>
            <div style="text-align:right;"><span class="rate-val" style="color:var(--bd-red);">${bolus}</span><span class="rate-unit">mL</span></div>
        </div>
        <div class="ab ab-warn"><strong>⚠️ Đánh giá lại sau 1 giờ:</strong><br>
            ✅ Cải thiện → Giảm dần theo bảng bên dưới<br>
            ❌ Không cải thiện + Hct tăng/không đổi → Cao phân tử 10–15 mL/kg/h trong 1h</div>`;
        stepdownTable = `
        <table class="fluid-table">
            <thead><tr><th>Giai đoạn</th><th>Tốc độ</th><th>Thời gian</th>${thR}</tr></thead>
            <tbody>
                <tr><td>Giảm 1</td><td>${r(weight * 10)} mL/giờ (10 mL/kg/h)</td><td>2 giờ</td>${timeCol(1, 3, rt)}</tr>
                <tr><td>Giảm 2</td><td>${r(weight * 6)} mL/giờ (6 mL/kg/h)</td><td>2 giờ</td>${timeCol(3, 5, rt)}</tr>
                <tr><td>Giảm 3</td><td>${r(weight * 3)} mL/giờ (3 mL/kg/h)</td><td>5–7 giờ</td>${timeCol(5, 12, rt)}</tr>
                <tr><td>Duy trì</td><td>${r(weight * 1.5)} mL/giờ (1.5 mL/kg/h)</td><td>12 giờ</td>${timeCol(12, 24, rt)}</tr>
            </tbody>
        </table>`;
      }
    } else {
      if (isChild) {
        const bolusAmt = r(weight * 20);
        bolusSection = `
        <div class="rate-display rate-red">
            <div><div class="rate-label">BÙ DỊCH HỎA TỐC – 15 PHÚT</div><div class="rate-sub">Bơm tiêm TM trực tiếp RL: 20 mL/kg trong 15 phút</div></div>
            <div style="text-align:right;"><span class="rate-val" style="color:var(--bd-red);">${bolusAmt}</span><span class="rate-unit">mL</span></div>
        </div>
        <div class="ab ab-danger"><strong>🚨 Đánh giá ngay sau 15 phút:</strong><br>
            ✅ Mạch rõ, HA bình thường → Cao phân tử 10 mL/kg/h × 1h, sau đó giảm dần tinh thể<br>
            ❌ Mạch nhanh, HA kẹt/tụt → Cao phân tử 15–20 mL/kg/h. Phối hợp vận mạch</div>`;
      } else {
        const bolusAmt = r(weight * 15);
        bolusSection = `
        <div class="rate-display rate-red">
            <div><div class="rate-label">BÙ DỊCH HỎA TỐC – 15 PHÚT</div><div class="rate-sub">Bơm tiêm TM trực tiếp RL: 15 mL/kg trong 15 phút</div></div>
            <div style="text-align:right;"><span class="rate-val" style="color:var(--bd-red);">${bolusAmt}</span><span class="rate-unit">mL</span></div>
        </div>
        <div class="ab ab-danger"><strong>🚨 Chuyển đổi ngay sau 15 phút:</strong><br>
            → Chuyển sang Cao phân tử <strong>15 mL/kg/h × 1 giờ</strong> (${r(weight * 15)} mL)<br>
            ✅ Cải thiện → RL 15 mL/kg/h × 1h, rồi giảm dần<br>
            ❌ Không cải thiện → Tiếp tục CPT 15 mL/kg/h, tìm xuất huyết ẩn</div>`;
      }
    }

    let hctNote = '';
    if (hct < 35) hctNote = `<div class="ab ab-danger"><strong>🚨 HCT &lt; 35% kèm sốc:</strong> XUẤT HUYẾT NỘI. Truyền HCL ${isChild ? '5 mL/kg' : '5–10 mL/kg'} hoặc máu toàn phần 10 mL/kg.</div>`;

    html = `
    <div class="fluid-card fc-red">
        <div class="fluid-card-title" style="color:var(--bd-red);">Phác đồ Sốc Dengue – ${isDecomp ? 'SỐC MẤT BÙ' : 'SỐC BÙ ĐƯỢC'} – ${isChild ? (ageGrp === 'adolescent' ? 'Thiếu niên 13–16t' : 'Trẻ em') : 'Người lớn ≥ 16t'}</div>
        <div class="fluid-card-body">
            <strong>Dịch ưu tiên:</strong> Ringer Lactate (RL). <em>Suy gan (AST/ALT > 1000) → Ringer Acetate</em><br>
            <strong>HCT:</strong> ${hct}% – Theo dõi mỗi 1–2 giờ trong pha sốc
        </div>
    </div>
    ${bolusSection}
    ${stepdownTable}
    ${hctNote}
    <span class="src-badge">📚 WHO Dengue Guidelines 2012 & BYT SXHD 2019</span>`;
  }

  else if (currentScenario === 'SEPSIS') {
    const map = val('pt-map');
    const lac = val('pt-lactate');
    title = '🦠 Y LỆNH BÙ DỊCH – SỐC NHIỄM KHUẨN';
    titleColor = 'var(--bd-red)';
    const bolus = r(weight * 30);
    const thR = timeColHeader(rt);
    html = `
    <div class="fluid-card fc-red">
        <div class="fluid-card-title" style="color:var(--bd-red);">Phác đồ Bù dịch Sốc Nhiễm khuẩn (SSC 2021)</div>
        <div class="fluid-card-body">
            <strong>Tình trạng:</strong> MAP ${map} mmHg ${map < 65 ? '<span style="color:var(--bd-red);font-weight:700;">(&lt; 65 mmHg)</span>' : ''} | Lactate ${lac} mmol/L ${lac >= 4 ? '<span style="color:var(--bd-red);font-weight:700;">(≥ 4)</span>' : ''}<br>
            <strong>Dịch ưu tiên:</strong> Balanced crystalloids (Ringer Lactate / Plasma-Lyte). Hạn chế NaCl 0.9%.
        </div>
    </div>
    <div class="rate-display rate-red">
        <div><div class="rate-label">Fluid Challenge – Trong 1–3 giờ đầu</div><div class="rate-sub">30mL/kg Ringer Lactate</div></div>
        <div style="text-align:right;"><span class="rate-val" style="color:var(--bd-red);">${bolus}</span><span class="rate-unit">mL</span></div>
    </div>
    <div class="ab ab-warn"><strong>⚠️ Đánh giá đáp ứng dịch bằng:</strong> PLR (Passive Leg Raise) hoặc VTI trên siêu âm tim sau mỗi 250–500mL. Dừng ngay khi KHÔNG đáp ứng.</div>
    <table class="fluid-table">
        <thead><tr><th>Giai đoạn</th><th>Chiến lược</th><th>Hành động</th>${thR}</tr></thead>
        <tbody>
            <tr><td>Giờ 0–3</td><td>Bù dịch tích cực</td><td>30mL/kg RL + Kháng sinh + Cấy máu</td>${timeCol(0, 3, rt)}</tr>
            <tr><td>Giờ 1–6</td><td>Khởi động vận mạch</td><td>Norepinephrine nếu MAP &lt; 65 sau 1L dịch</td>${timeCol(1, 6, rt)}</tr>
            <tr><td>Giờ 6–24</td><td>Kiểm soát dịch</td><td>Tránh dương tính dịch quá mức (&gt; 10% BW)</td>${timeCol(6, 24, rt)}</tr>
        </tbody>
    </table>
    <div class="ab ab-danger"><strong>🚨 Vận mạch:</strong> Khởi động Norepinephrine sớm nếu MAP &lt; 65, KHÔNG chờ bù đủ dịch.</div>
    <span class="src-badge">📚 SSC Guidelines 2021 & ESICM 2025 Fluid Therapy</span>`;
  }

  else if (currentScenario === 'DKA') {
    const dkaType = sel('dka-type');
    const glucose = val('pt-glucose');
    const comorbid = sel('dka-comorbid');
    title = '🩸 Y LỆNH BÙ DỊCH – ' + (dkaType === 'dka' ? 'NHIỄM TOAN CETON (DKA)' : dkaType === 'hhs' ? 'TĂNG ALTT (HHS)' : 'EUGLYCEMIC DKA');
    titleColor = 'var(--bd-purple)';
    const thR = timeColHeader(rt);

    const isFragile = (comorbid === 'heart-renal' || comorbid === 'frail');
    const isEuglycemic = (dkaType === 'euglycemic');
    const isHHS = (dkaType === 'hhs');

    let ratePhase1 = isFragile ? '250 mL bolus × lặp lại' : '500–1000 mL/giờ';
    let glucoseStatus = '';
    if (glucose < 250) glucoseStatus = '<span style="color:var(--bd-amber);font-weight:700;">&lt; 250 mg/dL → CẦN DEXTROSE</span>';
    else glucoseStatus = `${glucose} mg/dL`;

    let dextrose = '';
    if (isEuglycemic || glucose < 250) {
      dextrose = `
      <div class="fluid-card fc-amber">
          <div class="fluid-card-title" style="color:var(--bd-amber);">⚠️ CHỈ ĐỊNH DEXTROSE</div>
          <div class="fluid-card-body">
              <strong>Dịch:</strong> Dextrose 5% hoặc 10% (pha trong RL hoặc NaCl 0.9%)<br>
              <strong>Lý do:</strong> ${isEuglycemic ? 'Euglycemic DKA. Cần truyền Dextrose + Insulin để ức chế sinh ceton.' : 'Đường huyết &lt; 250. Cung cấp glucose phòng hạ ĐH để tiếp tục Insulin truyền.'}
          </div>
      </div>`;
    }

    let hhsWarning = '';
    if (isHHS) {
      hhsWarning = `<div class="ab ab-danger"><strong>🚨 Cảnh báo HHS – Tránh phù não:</strong> Giảm đường huyết &lt; 90–120 mg/dL/giờ. Giảm ALTT &lt; 3–8 mOsm/kg/giờ.</div>`;
    }

    html = `
    <div class="fluid-card fc-purple">
        <div class="fluid-card-title" style="color:var(--bd-purple);">Phác đồ Bù dịch ${dkaType === 'dka' ? 'DKA' : dkaType === 'hhs' ? 'HHS' : 'Euglycemic DKA'}</div>
        <div class="fluid-card-body">
            <strong>Đường huyết:</strong> ${glucoseStatus}<br>
            <strong>Dịch ưu tiên:</strong> Tinh thể cân bằng (RL). NaCl 0.9% chỉ dùng khi không có sẵn.<br>
            ${isFragile ? '<strong style="color:var(--bd-red);">⚠️ Thận trọng:</strong> Suy tim/thận, KHÔNG bù dịch ồ ạt.' : ''}
        </div>
    </div>
    <div class="rate-display rate-purple">
        <div><div class="rate-label">Pha 1 (2–4 giờ đầu)</div><div class="rate-sub">RL / Plasma-Lyte</div></div>
        <div style="text-align:right;"><span class="rate-val" style="color:var(--bd-purple);">${isFragile ? '250' : '500–1000'}</span><span class="rate-unit">${isFragile ? 'mL/lần' : 'mL/giờ'}</span></div>
    </div>
    ${dextrose}
    ${hhsWarning}
    <table class="fluid-table">
        <thead><tr><th>Giai đoạn</th><th>Chiến lược</th><th>Chi tiết</th>${thR}</tr></thead>
        <tbody>
            <tr><td>Giờ 0–4</td><td>Hồi sức thể tích</td><td>${ratePhase1} tinh thể cân bằng</td>${timeCol(0, 4, rt)}</tr>
            <tr><td>Giờ 4–12</td><td>Bù dịch duy trì</td><td>Bù 50% thiếu hụt trong 8–12h đầu</td>${timeCol(4, 12, rt)}</tr>
            <tr><td>Khi ĐH &lt; 250</td><td><strong>Thêm Dextrose 5%</strong></td><td>Duy trì Insulin 0.05 đv/kg/h</td><td></td></tr>
        </tbody>
    </table>
    <span class="src-badge">📚 ADA Consensus 2024</span>`;
  }

  else if (currentScenario === 'BURN') {
    const tbsa = val('pt-tbsa');
    const delay = val('burn-delay');
    title = '🔥 Y LỆNH BÙ DỊCH – SỐC BỎNG';
    titleColor = 'var(--bd-orange)';
    const thR = timeColHeader(rt);

    const totalFluid = 2 * weight * tbsa;
    const half = totalFluid / 2;
    const hoursPhase1 = 8 - delay;
    const ratePhase1 = hoursPhase1 > 0 ? r(half / hoursPhase1) : r(half);
    const ratePhase2 = r(half / 16);
    const uopTarget = r(weight * 0.5);

    html = `
    <div class="fluid-card fc-orange">
        <div class="fluid-card-title" style="color:var(--bd-orange);">Phác đồ Modified Brooke – ABA 2023</div>
        <div class="fluid-card-body">
            <strong>Công thức:</strong> 2 mL × ${weight} kg × ${tbsa}% TBSA = <strong>${r(totalFluid)} mL</strong> dịch trong 24 giờ đầu<br>
            <strong>Thời gian delay:</strong> ${delay} giờ từ lúc bỏng (đã trừ vào 8h đầu)
        </div>
    </div>
    <div class="rate-display" style="background:var(--bd-orange-h);border-color:var(--bd-orange-b);">
        <div><div class="rate-label">8 GIỜ ĐẦU – 1/2 tổng dịch</div><div class="rate-sub">Còn ${hoursPhase1 > 0 ? hoursPhase1 : 0} giờ nữa</div></div>
        <div style="text-align:right;"><span class="rate-val" style="color:var(--bd-orange);">${hoursPhase1 > 0 ? ratePhase1 : '⚠️'}</span><span class="rate-unit">mL/giờ</span></div>
    </div>
    <div class="rate-display">
        <div><div class="rate-label">16 GIỜ TIẾP – 1/2 tổng dịch</div><div class="rate-sub">Tốc độ đều</div></div>
        <div style="text-align:right;"><span class="rate-val" style="color:var(--bd-blue);">${ratePhase2}</span><span class="rate-unit">mL/giờ</span></div>
    </div>
    <div class="fluid-card fc-teal">
        <div class="fluid-card-title" style="color:var(--bd-teal);">📏 CHUẨN ĐỘ THEO UOP MỖI GIỜ</div>
        <div class="fluid-card-body">
            <strong>Mục tiêu:</strong> 0.5 mL/kg/giờ = <strong>${uopTarget} mL/giờ</strong><br>
            UOP &lt; 30 mL/h → <span style="color:var(--bd-red);font-weight:700;">Tăng tốc độ 20%</span> | UOP > 50 mL/h → <span style="color:var(--bd-amber);font-weight:700;">Giảm tốc độ 20%</span>
        </div>
    </div>
    <span class="src-badge">📚 ABA Clinical Practice Guidelines 2023</span>`;
  }

  else if (currentScenario === 'CARDIO') {
    const cMap = val('cardio-map');
    const congestion = sel('cardio-congestion');
    const plr = sel('cardio-plr');
    title = '💔 Y LỆNH BÙ DỊCH – SỐC TIM';
    titleColor = 'var(--bd-teal)';

    if (congestion === 'yes') {
      html = `
      <div class="fluid-card fc-red">
          <div class="fluid-card-title" style="color:var(--bd-red);">🚫 CHỐNG CHỈ ĐỊNH BÙ DỊCH – Có sung huyết</div>
          <div class="fluid-card-body">
              <strong>Tình trạng:</strong> Phù phổi / TM cổ nổi / Tràn dịch màng phổi<br>
              <strong>Hướng xử trí:</strong> Lợi tiểu + Vận mạch/Inotrope. KHÔNG truyền thêm dịch.
          </div>
      </div>
      <div class="fluid-card fc-teal">
          <div class="fluid-card-title" style="color:var(--bd-teal);">Y LỆNH ĐỀ XUẤT</div>
          <div class="fluid-card-body">
              <strong>Vận mạch:</strong> Norepinephrine → MAP ≥ 65 mmHg (hiện: ${cMap} mmHg)<br>
              <strong>Inotrope:</strong> Dobutamine hoặc Milrinone<br>
              <strong>Lợi tiểu:</strong> Furosemide TM nếu sung huyết rõ.
          </div>
      </div>`;
    } else if (plr === 'negative') {
      html = `
      <div class="fluid-card fc-amber">
          <div class="fluid-card-title" style="color:var(--bd-amber);">⚠️ PLR ÂM TÍNH – Không đáp ứng bù dịch</div>
          <div class="fluid-card-body">
              <strong>Nghiệm pháp PLR:</strong> CO tăng &lt; 10% → KHÔNG đáp ứng bù dịch<br>
              <strong>Hướng xử trí:</strong> Chuyển sang chiến lược vận mạch + inotrope.
          </div>
      </div>
      <div class="fluid-card fc-teal">
          <div class="fluid-card-title" style="color:var(--bd-teal);">Y LỆNH ĐỀ XUẤT</div>
          <div class="fluid-card-body">
              <strong>Vận mạch:</strong> Norepinephrine → MAP ≥ 65 mmHg<br>
              <strong>Inotrope:</strong> Dobutamine hoặc Milrinone
          </div>
      </div>`;
    } else {
      html = `
      <div class="fluid-card fc-blue">
          <div class="fluid-card-title" style="color:var(--bd-blue);">Nghiệm pháp truyền dịch (Fluid Challenge)</div>
          <div class="fluid-card-body">
              <strong>Điều kiện:</strong> Không có sung huyết ${plr === 'positive' ? '+ PLR dương tính' : '+ PLR chưa làm (nên làm)'}<br>
              <strong>MAP hiện tại:</strong> ${cMap} mmHg
          </div>
      </div>
      <div class="rate-display rate-teal">
          <div><div class="rate-label">Fluid Bolus – 10–15 phút</div><div class="rate-sub">RL / NaCl 0.9%</div></div>
          <div style="text-align:right;"><span class="rate-val" style="color:var(--bd-teal);">250</span><span class="rate-unit">mL</span></div>
      </div>
      <div class="ab ab-warn"><strong>⚠️ Đánh giá SAU KHI TRUYỀN 250 mL:</strong><br>
          • ✅ CO/SV tăng > 10% → Có đáp ứng, có thể lặp lại<br>
          • ❌ CO/SV tăng &lt; 10% → Ngừng hoàn toàn bù dịch.</div>`;
    }
    html += `<span class="src-badge">📚 ESICM Circulatory Shock 2025</span>`;
  }

  const resTitle = document.getElementById('result-title');
  const resBody = document.getElementById('result-body');
  if (resTitle) {
    resTitle.innerHTML = title;
    resTitle.style.color = titleColor;
    resTitle.style.borderColor = titleColor;
  }
  if (resBody) {
    resBody.innerHTML = highlightDoses(html);
  }
}

// Global binding for DOM inline event listeners
if (typeof window !== 'undefined') {
  const win = window as any;
  win.setScenario = setScenario;
  win.toggleRealtime = toggleRealtime;
  win.calculate = calculate;
  win.resetForm = resetForm;
}

export function initFluidStudio(): void {
  resetForm();
  
  // Attach change listeners to all inputs
  const inputs = ['pt-weight', 'pt-hct', 'pt-map', 'pt-lactate', 'pt-glucose', 'pt-tbsa', 'burn-delay', 'cardio-map', 'start-datetime'];
  inputs.forEach(id => {
    document.getElementById(id)?.addEventListener('input', calculate);
  });
  
  const selects = ['diarrhea-grade', 'dhf-age-group', 'dhf-type', 'dka-type', 'dka-comorbid', 'cardio-congestion', 'cardio-plr'];
  selects.forEach(id => {
    document.getElementById(id)?.addEventListener('change', calculate);
  });
  
  document.getElementById('use-realtime')?.addEventListener('change', toggleRealtime);
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFluidStudio);
  } else {
    initFluidStudio();
  }
}
