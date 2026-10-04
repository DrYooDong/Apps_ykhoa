/**
/**
 * CliniPortal — Guideline Radar Diff Viewer Controller (TypeScript)
 * Path: guideline-radar/radar.ts
 */

const RADAR_STORAGE_KEY = 'cliniportal_radar_saved';

export function getSavedRadarCards(): string[] {
  try {
    return JSON.parse(localStorage.getItem(RADAR_STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

export function saveRadarCard(id: string): void {
  const saved = getSavedRadarCards();
  if (!saved.includes(id)) {
    saved.push(id);
    localStorage.setItem(RADAR_STORAGE_KEY, JSON.stringify(saved));
  }
  updateBookmarkUI();
}

export function removeRadarCard(id: string): void {
  let saved = getSavedRadarCards();
  saved = saved.filter(item => item !== id);
  localStorage.setItem(RADAR_STORAGE_KEY, JSON.stringify(saved));
  updateBookmarkUI();
}

export function updateBookmarkUI(): void {
  const saved = getSavedRadarCards();
  const savedCountBadge = document.getElementById('saved-count-badge');
  if (savedCountBadge) savedCountBadge.textContent = saved.length.toString();

  document.querySelectorAll('.bookmark-btn').forEach(btn => {
    const cardId = btn.getAttribute('data-card-id');
    if (!cardId) return;

    if (saved.includes(cardId)) {
      btn.classList.add('saved');
      btn.innerHTML = '<i class="fa-solid fa-bookmark" style="color:#f59e0b;"></i>';
      (btn as HTMLElement).title = 'Đã lưu (Bấm để hủy)';
    } else {
      btn.classList.remove('saved');
      btn.innerHTML = '<i class="fa-regular fa-bookmark"></i>';
      (btn as HTMLElement).title = 'Lưu thông báo này';
    }
  });
}

// ALIGNMENT MATRIX DATA
interface AlignmentRow {
  topic: string;
  intl: string;
  vn: string;
  status: 'full' | 'partial' | 'diff';
  statusText: string;
  notes: string;
}

const ALIGNMENT_DATA: AlignmentRow[] = [
  {
    topic: '🫀 Suy Tim HFrEF (EF ≤ 40%)',
    intl: 'ESC 2026: Khởi đầu sớm BỘ TỨ TRỤ CỘT (ARNI + BB + MRA + SGLT2i) đồng thời trong 4 tuần đầu.',
    vn: 'QĐ 4845/QĐ-BYT: Công nhận bộ tứ trụ cột cho HFrEF; khuyến cáo kết hợp sớm khi huyết động ổn định.',
    status: 'full',
    statusText: 'Đồng thuận hoàn toàn',
    notes: 'SGLT2i (Dapa/Empa) & ARNI đã được phê duyệt thanh toán BHYT nội trú & ngoại trú theo Thông tư 20/2022/TT-BYT.'
  },
  {
    topic: '🫀 Rung Nhĩ & Đột Quỵ (AF)',
    intl: 'ESC 2026: Ưu tiên DOAC đầu tay; chuyển sang thang điểm CARE-AF tích hợp eGFR & Biomarker hs-TnT.',
    vn: 'BYT 2022: Sử dụng CHA2DS2-VASc, ưu tiên DOAC hơn VKA khi không có chống chỉ định van cơ học.',
    status: 'partial',
    statusText: 'Bổ sung biomarker',
    notes: 'DOAC (Rivaroxaban, Dabigatran, Apixaban) được BHYT thanh toán theo tỷ lệ quy định cho rung nhĩ phi van tim.'
  },
  {
    topic: '🫁 Bệnh Phổi Tắc Nghẽn (COPD)',
    intl: 'GOLD 2026: Hợp nhất nhóm C/D thành nhóm E. Đầu tay LABA+LAMA; chỉ dùng ICS khi Eos ≥ 300/µL.',
    vn: 'QĐ 2131/QĐ-BYT (2026): Chuẩn hóa phân loại ABE theo Rome 2022; LABA/LAMA là nền tảng, thắt chặt ICS.',
    status: 'full',
    statusText: 'Đồng thuận hoàn toàn',
    notes: 'Các dạng hít đôi LABA/LAMA (Tiotropium/Olodaterol, Umeclidinium/Vilanterol) nằm trong danh mục BHYT.'
  },
  {
    topic: '💉 Đái Tháo Đường Típ 2 (T2D)',
    intl: 'ADA 2026: Khởi đầu SGLT2i hoặc GLP-1 RA bảo vệ tim-thận độc lập với Metformin bất kể mức HbA1c ban đầu.',
    vn: 'QĐ 5481/QĐ-BYT: Metformin đầu tay; bổ sung SGLT2i/GLP-1 RA khi có ASCVD, CKD hoặc suy tim.',
    status: 'partial',
    statusText: 'Khởi đầu sớm vs Tuần tự',
    notes: 'Metformin đầu tay thanh toán 100%; SGLT2i được bảo hiểm chi trả khi có yếu tố nguy cơ tim mạch hoặc suy thận.'
  },
  {
    topic: '🧠 Đột Quỵ Thiếu Máu Não Cấp',
    intl: 'ESO 2026: Ưu tiên Tenecteplase (TNK-tPA) 0.25 mg/kg thay thế Alteplase; mở rộng cửa sổ EVT lên 24h với CTP/MRI.',
    vn: 'QĐ 3097/QĐ-BYT: Alteplase tiêu chuẩn trong 4.5h; Tenecteplase được triển khai tại trung tâm đột quỵ chuyên sâu.',
    status: 'partial',
    statusText: 'Triển khai chuyên sâu',
    notes: 'Alteplase được thanh toán BHYT đầy đủ trong cấp cứu; Tenecteplase đang được mở rộng thanh toán bảo hiểm.'
  },
  {
    topic: '🩺 Xuất Huyết Do Tăng Áp Cửa',
    intl: 'Baveno VII / ACG 2026: Vasoactive (Terlipressin/Octreotide) + Ceftriaxone 1g NGAY TẠI CẤP CỨU; EBL sớm trong 12h.',
    vn: 'BYT Hướng Dẫn XHTH: Octreotide/Terlipressin + Kháng sinh dự phòng Ceftriaxone + Nội soi thắt vòng trong 12–24h.',
    status: 'full',
    statusText: 'Đồng thuận hoàn toàn',
    notes: 'Octreotide, Terlipressin và Ceftriaxone đều được BHYT chi trả 100% trong tình huống cấp cứu nội trú.'
  }
];

export function renderAlignmentMatrix(): void {
  const tbody = document.getElementById('matrix-table-body');
  if (!tbody) return;

  tbody.innerHTML = ALIGNMENT_DATA.map(row => {
    const badgeClass = row.status === 'full' ? 'align-full' : row.status === 'partial' ? 'align-partial' : 'align-diff';
    const icon = row.status === 'full' ? 'fa-circle-check' : row.status === 'partial' ? 'fa-circle-nodes' : 'fa-triangle-exclamation';

    return `
      <tr>
        <td style="font-weight:700; color:var(--color-text); font-size:0.92rem;">${row.topic}</td>
        <td style="font-size:0.86rem; color:var(--color-text); line-height:1.55;">${row.intl}</td>
        <td style="font-size:0.86rem; color:var(--color-text); line-height:1.55;">${row.vn}</td>
        <td>
          <span class="align-badge ${badgeClass}" style="display:inline-flex; align-items:center; gap:5px; font-weight:700;">
            <i class="fa-solid ${icon}"></i> ${row.statusText}
          </span>
        </td>
        <td style="font-size:0.82rem; color:var(--color-text-muted); line-height:1.5;">${row.notes}</td>
      </tr>
    `;
  }).join('');
}

// ALGORITHM SVG GENERATOR
export function showAlgorithmModal(algoKey: string): void {
  const modal = document.getElementById('algoModalBackdrop');
  const title = document.getElementById('modalTitle');
  const subtitle = document.getElementById('modalSubtitle');
  const svg = document.getElementById('algo-flowchart-svg');
  if (!modal || !svg) return;

  if (algoKey === 'af') {
    if (title) title.innerHTML = '🫀 Rung Nhĩ (AF): CHA2DS2-VASc Cũ vs Thang Điểm CARE-AF 2026';
    if (subtitle) subtitle.textContent = 'So sánh lưu đồ tiếp cận phân tầng nguy cơ đột quỵ và chỉ định kháng đông DOAC';

    svg.innerHTML = `
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b"/>
        </marker>
        <marker id="arrow-green" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#059669"/>
        </marker>
      </defs>

      <!-- OLD PATHWAY (LEFT) -->
      <g transform="translate(40, 20)">
        <rect x="0" y="0" width="400" height="40" rx="8" fill="#fee2e2" stroke="#ef4444" stroke-width="1.5"/>
        <text x="200" y="25" text-anchor="middle" font-weight="bold" fill="#b91c1c" font-size="13">❌ LƯU ĐỒ CŨ (2020) — CHA2DS2-VASc ĐƠN THUẦN</text>

        <rect x="50" y="65" width="300" height="45" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
        <text x="200" y="85" text-anchor="middle" font-weight="600" fill="#334155" font-size="12">Tính điểm CHA2DS2-VASc</text>
        <text x="200" y="100" text-anchor="middle" fill="#64748b" font-size="11">(Tuổi, Giới, THA, ĐTĐ, Tiền sử ĐQ, Suy tim)</text>

        <line x1="200" y1="110" x2="200" y2="145" stroke="#64748b" stroke-width="1.5" marker-end="url(#arrow)"/>

        <rect x="70" y="145" width="260" height="45" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
        <text x="200" y="165" text-anchor="middle" font-weight="600" fill="#334155" font-size="12">Nam ≥ 2 điểm | Nữ ≥ 3 điểm</text>
        <text x="200" y="180" text-anchor="middle" fill="#64748b" font-size="11">Chỉ định kháng đông VKA hoặc DOAC</text>

        <line x1="200" y1="190" x2="200" y2="230" stroke="#64748b" stroke-width="1.5" marker-end="url(#arrow)"/>

        <rect x="30" y="230" width="340" height="75" rx="8" fill="#fff1f2" stroke="#fca5a5"/>
        <text x="200" y="252" text-anchor="middle" font-weight="bold" fill="#991b1b" font-size="12">Hạn chế lâm sàng:</text>
        <text x="200" y="272" text-anchor="middle" fill="#7f1d1d" font-size="11">• Không tính đến suy giảm chức năng thận eGFR</text>
        <text x="200" y="290" text-anchor="middle" fill="#7f1d1d" font-size="11">• Bỏ sót nguy cơ tiềm ẩn ở nhóm điểm 1 (Nam) & 2 (Nữ)</text>
      </g>

      <!-- NEW PATHWAY (RIGHT) -->
      <g transform="translate(500, 20)">
        <rect x="0" y="0" width="420" height="40" rx="8" fill="#dcfce7" stroke="#10b981" stroke-width="1.5"/>
        <text x="210" y="25" text-anchor="middle" font-weight="bold" fill="#065f46" font-size="13">✅ LƯU ĐỒ MỚI (ESC 2026) — CARE-AF TÍCH HỢP</text>

        <rect x="50" y="65" width="320" height="50" rx="8" fill="#eff6ff" stroke="#93c5fd" stroke-width="1.5"/>
        <text x="210" y="85" text-anchor="middle" font-weight="bold" fill="#1e40af" font-size="12">Đánh Giá Thang Điểm CARE-AF Mở Rộng</text>
        <text x="210" y="103" text-anchor="middle" fill="#2563eb" font-size="11">Lâm sàng + eGFR + Biomarker (hs-TnT / NT-proBNP)</text>

        <line x1="210" y1="115" x2="210" y2="145" stroke="#059669" stroke-width="2" marker-end="url(#arrow-green)"/>

        <rect x="30" y="145" width="360" height="55" rx="8" fill="#ecfdf5" stroke="#6ee7b7"/>
        <text x="210" y="167" text-anchor="middle" font-weight="bold" fill="#047857" font-size="12">Phân Tầng Nguy Cơ 3 Cấp Độ (Low / Moderate / High)</text>
        <text x="210" y="185" text-anchor="middle" fill="#065f46" font-size="11">eGFR &lt; 60 hoặc hs-TnT tăng nhẹ được cộng điểm độc lập</text>

        <line x1="210" y1="200" x2="210" y2="230" stroke="#059669" stroke-width="2" marker-end="url(#arrow-green)"/>

        <rect x="10" y="230" width="400" height="85" rx="8" fill="#f0fdf4" stroke="#86efac" stroke-width="2"/>
        <text x="210" y="255" text-anchor="middle" font-weight="bold" fill="#065f46" font-size="12">Khuyến Cáo Điều Trị Class I, LOE A:</text>
        <text x="210" y="275" text-anchor="middle" fill="#047857" font-size="11">• Ưu tiên DOAC (Apixaban, Rivaroxaban, Dabigatran, Edoxaban)</text>
        <text x="210" y="293" text-anchor="middle" fill="#047857" font-size="11">• Hiệu chỉnh liều chuẩn xác theo eGFR &amp; Tuổi</text>
        <text x="210" y="307" text-anchor="middle" font-weight="600" fill="#0284c7" font-size="10.5">Giảm 18% xuất huyết nặng so với CHA2DS2-VASc (CARE-AF Trial)</text>
      </g>
    `;
  } else if (algoKey === 'copd') {
    if (title) title.innerHTML = '🫁 BPTNMT (COPD): Phân Nhóm ABCD Cũ vs Sơ Đồ ABE 2026';
    if (subtitle) subtitle.textContent = 'Hợp nhất nhóm C & D thành nhóm E, cá thể hóa chỉ định LABA/LAMA vs ICS theo Eosinophil';

    svg.innerHTML = `
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b"/>
        </marker>
        <marker id="arrow-green" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#059669"/>
        </marker>
      </defs>

      <!-- OLD (LEFT) -->
      <g transform="translate(40, 20)">
        <rect x="0" y="0" width="400" height="40" rx="8" fill="#fee2e2" stroke="#ef4444" stroke-width="1.5"/>
        <text x="200" y="25" text-anchor="middle" font-weight="bold" fill="#b91c1c" font-size="13">❌ SƠ ĐỒ CŨ (GOLD 2020) — 4 NHÓM ABCD</text>

        <rect x="50" y="65" width="300" height="70" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
        <text x="200" y="87" text-anchor="middle" font-weight="600" fill="#334155" font-size="12">Phân chia thành 4 ô vuông ABCD</text>
        <text x="200" y="105" text-anchor="middle" fill="#64748b" font-size="11">Nhóm C &amp; D: Dùng ICS/LABA rộng rãi</text>
        <text x="200" y="122" text-anchor="middle" fill="#dc2626" font-size="10.5">Tăng nguy cơ Viêm phổi do lạm dụng Corticoid hít</text>

        <line x1="200" y1="135" x2="200" y2="180" stroke="#64748b" stroke-width="1.5" marker-end="url(#arrow)"/>

        <rect x="30" y="180" width="340" height="80" rx="8" fill="#fff1f2" stroke="#fca5a5"/>
        <text x="200" y="205" text-anchor="middle" font-weight="bold" fill="#991b1b" font-size="12">Hạn chế chính:</text>
        <text x="200" y="225" text-anchor="middle" fill="#7f1d1d" font-size="11">• Tiêu chí đợt cấp đánh giá cảm tính</text>
        <text x="200" y="243" text-anchor="middle" fill="#7f1d1d" font-size="11">• Không định lượng bạch cầu ái toan (Eos)</text>
      </g>

      <!-- NEW (RIGHT) -->
      <g transform="translate(500, 20)">
        <rect x="0" y="0" width="420" height="40" rx="8" fill="#dcfce7" stroke="#10b981" stroke-width="1.5"/>
        <text x="210" y="25" text-anchor="middle" font-weight="bold" fill="#065f46" font-size="13">✅ SƠ ĐỒ MỚI (GOLD 2026 / BYT 2131) — ABE</text>

        <rect x="30" y="65" width="360" height="55" rx="8" fill="#eff6ff" stroke="#93c5fd" stroke-width="1.5"/>
        <text x="210" y="87" text-anchor="middle" font-weight="bold" fill="#1e40af" font-size="12">Hợp Nhất C &amp; D Thành Nhóm E (Exacerbation)</text>
        <text x="210" y="105" text-anchor="middle" fill="#2563eb" font-size="11">Tiêu chuẩn Rome 2022: ≥ 2 đợt cấp vừa hoặc ≥ 1 nhập viện</text>

        <line x1="210" y1="120" x2="210" y2="160" stroke="#059669" stroke-width="2" marker-end="url(#arrow-green)"/>

        <rect x="10" y="160" width="400" height="135" rx="8" fill="#f0fdf4" stroke="#86efac" stroke-width="2"/>
        <text x="210" y="185" text-anchor="middle" font-weight="bold" fill="#065f46" font-size="12.5">Quy Tắc Điều Trị Đầu Tay (Class I, LOE A):</text>
        <text x="210" y="208" text-anchor="middle" font-weight="600" fill="#047857" font-size="11.5">• Nhóm B &amp; E: Ưu tiên bộ đôi LABA + LAMA dạng hít</text>
        <text x="210" y="230" text-anchor="middle" font-weight="700" fill="#b45309" font-size="11.5">• Chỉ thêm ICS (Bộ ba LAMA/LABA/ICS) khi Eos máu ≥ 300 tế bào/µL</text>
        <text x="210" y="252" text-anchor="middle" fill="#dc2626" font-size="11">• Eos &lt; 100 tế bào/µL: Chống chỉ định dùng ICS thường quy</text>
        <text x="210" y="278" text-anchor="middle" font-weight="bold" fill="#0284c7" font-size="10.5">ETHOS &amp; IMPACT Trial: Giảm 24% đợt cấp nặng &amp; giảm tỷ lệ tử vong</text>
      </g>
    `;
  }

  modal.classList.add('active');
}

export function closeAlgorithmModal(): void {
  const modal = document.getElementById('algoModalBackdrop');
  if (modal) modal.classList.remove('active');
}

export function showInfographicExport(cardId: string): void {
  const modal = document.getElementById('exportModalBackdrop');
  const container = document.getElementById('infographic-preview-container');
  if (!modal || !container) return;

  const card = document.querySelector(`.radar-card[data-card-id="${cardId}"]`);
  if (!card) return;

  const title = card.querySelector('.radar-card-title')?.textContent || 'Khuyến cáo lâm sàng';
  const org = card.querySelector('.radar-meta span:first-child')?.textContent || 'Hiệp hội Y khoa';
  const date = card.querySelector('.radar-meta span:nth-child(2)')?.textContent || '2026';
  const oldText = card.querySelector('.diff-box.old .diff-text')?.textContent || '';
  const newText = card.querySelector('.diff-box.new .diff-text')?.textContent || '';
  const reason = card.querySelector('.diff-reason-box')?.textContent || '';

  container.innerHTML = `
    <div style="background:var(--surface,#fff); border:2px solid var(--radar-primary,#0284c7); border-radius:14px; padding:1.5rem; color:var(--text,#0f172a); font-family:var(--dsp-font-body,sans-serif);">
      <div style="border-bottom:2px solid #e2e8f0; padding-bottom:0.75rem; margin-bottom:1rem; display:flex; justify-content:space-between; align-items:center;">
        <div>
          <span style="font-size:0.75rem; text-transform:uppercase; font-weight:800; color:#0284c7; letter-spacing:0.05em;">EBM Guidelines Hub · Practice-Changing Update</span>
          <h3 style="font-size:1.15rem; font-weight:800; margin:0.25rem 0 0 0;">${title}</h3>
          <p style="font-size:0.8rem; color:#64748b; margin:0.25rem 0 0 0;">${org} · ${date}</p>
        </div>
        <div style="background:#0284c7; color:#fff; padding:0.4rem 0.8rem; border-radius:8px; font-weight:800; font-size:0.85rem;">
          Class I · LOE A
        </div>
      </div>

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem; margin-bottom:1rem;">
        <div style="background:#fef2f2; border:1px solid #fca5a5; border-radius:10px; padding:0.85rem;">
          <strong style="color:#b91c1c; font-size:0.82rem; display:block; margin-bottom:0.35rem;">❌ THỰC HÀNH CŨ:</strong>
          <p style="font-size:0.82rem; color:#7f1d1d; margin:0; line-height:1.5;">${oldText}</p>
        </div>
        <div style="background:#f0fdf4; border:1px solid #86efac; border-radius:10px; padding:0.85rem;">
          <strong style="color:#15803d; font-size:0.82rem; display:block; margin-bottom:0.35rem;">✅ KHUYẾN CÁO 2026 MỚI NHẤT:</strong>
          <p style="font-size:0.82rem; color:#14532d; margin:0; line-height:1.5;">${newText}</p>
        </div>
      </div>

      <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:0.75rem; font-size:0.8rem; color:#334155; line-height:1.5;">
        ${reason}
      </div>
    </div>
  `;

  modal.classList.add('active');
}

export function closeInfographicExport(): void {
  const modal = document.getElementById('exportModalBackdrop');
  if (modal) modal.classList.remove('active');
}

export function initGuidelineRadar(): void {
  const searchInput = document.getElementById('radar-search-input') as HTMLInputElement | null;
  const filterPills = document.querySelectorAll('.filter-pill');
  const modeBtnDiff = document.getElementById('view-mode-diff');
  const modeBtnTimeline = document.getElementById('view-mode-timeline');
  const modeBtnMatrix = document.getElementById('view-mode-matrix');
  const feedList = document.getElementById('radar-feed-list');
  const timelineList = document.getElementById('radar-timeline-list');
  const matrixFeed = document.getElementById('radar-matrix-feed');

  // Toggle View Modes
  modeBtnDiff?.addEventListener('click', () => {
    [modeBtnDiff, modeBtnTimeline, modeBtnMatrix].forEach(b => b?.classList.remove('active'));
    modeBtnDiff.classList.add('active');
    if (feedList) feedList.style.display = 'flex';
    if (timelineList) timelineList.style.display = 'none';
    if (matrixFeed) matrixFeed.style.display = 'none';
  });

  modeBtnTimeline?.addEventListener('click', () => {
    [modeBtnDiff, modeBtnTimeline, modeBtnMatrix].forEach(b => b?.classList.remove('active'));
    modeBtnTimeline.classList.add('active');
    if (feedList) feedList.style.display = 'none';
    if (timelineList) timelineList.style.display = 'block';
    if (matrixFeed) matrixFeed.style.display = 'none';
  });

  modeBtnMatrix?.addEventListener('click', () => {
    [modeBtnDiff, modeBtnTimeline, modeBtnMatrix].forEach(b => b?.classList.remove('active'));
    modeBtnMatrix.classList.add('active');
    if (feedList) feedList.style.display = 'none';
    if (timelineList) timelineList.style.display = 'none';
    if (matrixFeed) matrixFeed.style.display = 'block';
    renderAlignmentMatrix();
  });

  // Filter Function
  const filterCards = () => {
    const query = searchInput?.value.toLowerCase().trim() || '';
    const activePill = document.querySelector('.filter-pill.active') as HTMLElement | null;
    const filterType = activePill?.getAttribute('data-filter-type') || 'spec';
    const filterVal = activePill?.getAttribute('data-filter-val') || 'all';
    const saved = getSavedRadarCards();

    document.querySelectorAll('.radar-card').forEach(card => {
      const cardEl = card as HTMLElement;
      const text = cardEl.textContent?.toLowerCase() || '';
      const cardSpec = cardEl.getAttribute('data-spec') || '';
      const cardCor = cardEl.getAttribute('data-cor') || '';
      const cardId = cardEl.getAttribute('data-card-id') || '';

      let matchFilter = true;
      if (filterType === 'spec' && filterVal !== 'all') {
        matchFilter = cardSpec.includes(filterVal);
      } else if (filterType === 'cor') {
        matchFilter = cardCor === filterVal;
      } else if (filterType === 'saved') {
        matchFilter = saved.includes(cardId);
      }

      const matchQuery = !query || text.includes(query);
      cardEl.style.display = (matchFilter && matchQuery) ? 'block' : 'none';
    });
  };

  // Filter Pills Events
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      filterCards();
    });
  });

  searchInput?.addEventListener('input', filterCards);

  // Heatmap Click Events
  document.querySelectorAll('.heatmap-cell').forEach(cell => {
    cell.addEventListener('click', () => {
      const cor = cell.getAttribute('data-heatmap-cor');
      const loe = cell.getAttribute('data-heatmap-loe');

      document.querySelectorAll('.radar-card').forEach(card => {
        const cardEl = card as HTMLElement;
        const cardCor = cardEl.getAttribute('data-cor');
        const text = cardEl.textContent || '';

        const match = (!cor || cardCor === cor) && (!loe || text.includes(`LOE ${loe}`));
        cardEl.style.display = match ? 'block' : 'none';
      });

      modeBtnDiff?.click();
    });
  });

  // Deep Dive Toggles
  document.querySelectorAll('.toggle-deepdive-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = (e.currentTarget as HTMLElement).closest('.radar-card');
      const deepdive = card?.querySelector('.deepdive-content') as HTMLElement | null;
      if (deepdive) {
        const isHidden = deepdive.style.display === 'none' || !deepdive.style.display;
        deepdive.style.display = isHidden ? 'block' : 'none';
      }
    });
  });

  // Flowchart Modal Trigger
  document.querySelectorAll('.open-algo-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const algoKey = (e.currentTarget as HTMLElement).getAttribute('data-algo') || 'af';
      showAlgorithmModal(algoKey);
    });
  });

  const modalCloseBtn = document.getElementById('modalCloseBtn');
  modalCloseBtn?.addEventListener('click', closeAlgorithmModal);

  const algoModalBackdrop = document.getElementById('algoModalBackdrop');
  algoModalBackdrop?.addEventListener('click', (e) => {
    if (e.target === algoModalBackdrop) closeAlgorithmModal();
  });

  // Infographic Modal Trigger & Actions
  const exportModalBackdrop = document.getElementById('exportModalBackdrop');
  exportModalBackdrop?.addEventListener('click', (e) => {
    if (e.target === exportModalBackdrop) closeInfographicExport();
  });

  document.getElementById('exportModalCloseBtn')?.addEventListener('click', closeInfographicExport);

  document.getElementById('btn-print-infographic')?.addEventListener('click', () => {
    window.print();
  });

  document.getElementById('btn-copy-exp-md')?.addEventListener('click', () => {
    const preview = document.getElementById('infographic-preview-container');
    if (!preview) return;
    const text = preview.innerText;
    navigator.clipboard.writeText(text).then(() => {
      const toast = document.getElementById('radar-toast');
      if (toast) {
        toast.style.display = 'flex';
        setTimeout(() => { toast.style.display = 'none'; }, 2500);
      }
    });
  });

  // Bookmarking Events
  document.querySelectorAll('.bookmark-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const cardId = (e.currentTarget as HTMLElement).getAttribute('data-card-id');
      if (!cardId) return;

      const saved = getSavedRadarCards();
      if (saved.includes(cardId)) {
        removeRadarCard(cardId);
      } else {
        saveRadarCard(cardId);
      }
    });
  });

  updateBookmarkUI();
  renderAlignmentMatrix();
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGuidelineRadar);
  } else {
    initGuidelineRadar();
  }
}

if (typeof window !== 'undefined') {
  (window as any).showAlgorithmModal = showAlgorithmModal;
  (window as any).closeAlgorithmModal = closeAlgorithmModal;
  (window as any).showInfographicExport = showInfographicExport;
  (window as any).closeInfographicExport = closeInfographicExport;
}
