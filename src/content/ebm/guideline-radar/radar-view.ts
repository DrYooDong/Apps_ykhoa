/**
 * CliniPortal — Guideline Radar Diff Viewer & Practice-Changing Evidence Hub (TypeScript SPA View)
 * Path: src/content/ebm/guideline-radar/radar-view.ts
 * Chuyển đổi 100% sang Pure TypeScript & Vanilla DOM
 */

import './radar.css';
import { getSavedRadarCards } from './radar';

export function renderRadarView(): string {
  const savedList = getSavedRadarCards();

  return `
    <div class="guideline-radar-container animate-fade-in" style="max-width: 1440px; margin: 0 auto; padding: 1.25rem 1rem;">
      
      <!-- BREADCRUMB -->
      <div style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); margin-bottom: 1.25rem;">
        <a href="#/" style="color: inherit; text-decoration: none;">🏠 Trang chủ</a> &nbsp;/&nbsp; 
        <a href="#/ebm" style="color: inherit; text-decoration: none;">Y Học Chứng Cứ</a> &nbsp;/&nbsp; 
        <span style="color: var(--color-primary, #0284c7); font-weight: 700;">Guideline Radar Diff Viewer</span>
      </div>

      <!-- HERO BANNER -->
      <section class="radar-hero">
        <span class="radar-eyebrow"><i class="fa-solid fa-satellite-dish"></i> GUIDELINE RADAR DIFF VIEWER &amp; EVIDENCE HUB</span>
        <h1 class="radar-title">Trạm Theo Dõi &amp; So Sánh Thay Đổi Guideline</h1>
        <p style="max-width: 820px; line-height: 1.6; margin: 0; font-size: 0.96rem; opacity: 0.95;">
          So sánh trực quan <strong>"GitHub-style Diff View"</strong> giữa các phác đồ cũ và mới nhất (ESC, ADA, GINA, GOLD, ESO, BYT Việt Nam), phân tích mức độ bằng chứng (COR/LOE) &amp; Thử nghiệm lâm sàng Landmark.
        </p>
      </section>

      <!-- VIEW MODE TOGGLE -->
      <div class="radar-view-modes" style="overflow-x: auto; -webkit-overflow-scrolling: touch; padding-bottom: 4px;">
        <button class="mode-btn active" id="view-mode-diff">
          <i class="fa-solid fa-code-compare"></i> Feed So Sánh Diff (Mới vs Cũ)
        </button>
        <button class="mode-btn" id="view-mode-timeline">
          <i class="fa-solid fa-timeline"></i> Timeline Lịch Sử Tiến Hóa Guideline
        </button>
        <button class="mode-btn" id="view-mode-matrix">
          <i class="fa-solid fa-table-cells"></i> Ma Trận Đối Sánh Quốc Tế vs Bộ Y Tế VN
        </button>
      </div>

      <!-- CONTROLS & FILTER BAR -->
      <div class="radar-controls">
        <div class="controls-top-row">
          <div class="radar-search-box" style="width:100%;">
            <i class="fa-solid fa-magnifying-glass radar-search-icon"></i>
            <input type="text" id="radar-search-input" placeholder="Tìm tên bệnh, khuyến cáo, thử nghiệm lâm sàng, hoạt chất thuốc (VD: Metformin, SGLT2i, COPD, Sepsis, Đột quỵ)...">
          </div>
        </div>

        <div class="filter-pills" id="radar-filter-pills" style="overflow-x: auto; flex-wrap: nowrap; scrollbar-width: none; -webkit-overflow-scrolling: touch;">
          <button class="filter-pill active" data-filter-type="spec" data-filter-val="all">Tất cả</button>
          <button class="filter-pill" data-filter-type="saved" data-filter-val="saved"><i class="fa-solid fa-bookmark" style="color: #f59e0b;"></i> Đã lưu <span class="pill-count" id="saved-count-badge">${savedList.length}</span></button>
          <button class="filter-pill" data-filter-type="cor" data-filter-val="class1">🟢 Class I (Mạnh)</button>
          <button class="filter-pill" data-filter-type="cor" data-filter-val="class3">🔴 Class III (Chống chỉ định)</button>
          <button class="filter-pill" data-filter-type="spec" data-filter-val="cardio">🫀 Tim mạch</button>
          <button class="filter-pill" data-filter-type="spec" data-filter-val="pulmo">🫁 Hô hấp</button>
          <button class="filter-pill" data-filter-type="spec" data-filter-val="endo">💉 Nội tiết</button>
          <button class="filter-pill" data-filter-type="spec" data-filter-val="infect">🦠 Truyền nhiễm / ICU</button>
          <button class="filter-pill" data-filter-type="spec" data-filter-val="neuro">🧠 Thần kinh</button>
          <button class="filter-pill" data-filter-type="spec" data-filter-val="vn">🇻🇳 Bộ Y Tế VN</button>
        </div>

        <!-- COR/LOE EVIDENCE HEATMAP GRID -->
        <div class="heatmap-container" id="radar-heatmap-box">
          <div class="heatmap-header">
            <span class="heatmap-title"><i class="fa-solid fa-fire-flame-curved" style="color: #ef4444;"></i> Ma Trận Nhiệt Bằng Chứng (COR x LOE Heatmap Grid)</span>
            <span style="font-size: 0.75rem; color: var(--color-text-muted);">Click 1-click vào ô bất kỳ để lọc:</span>
          </div>
          <div class="heatmap-grid" style="overflow-x: auto;">
            <div class="heatmap-cell-head"></div>
            <div class="heatmap-cell-head">LOE A (RCT Đa trung tâm)</div>
            <div class="heatmap-cell-head">LOE B (RCT Đơn / Quan sát)</div>
            <div class="heatmap-cell-head">LOE C (Đồng thuận Chuyên gia)</div>

            <div class="heatmap-cell-label cor-1">Class I (Mạnh)</div>
            <div class="heatmap-cell" data-heatmap-cor="class1" data-heatmap-loe="A">
              <span class="count-val" id="hm-c1-a">4</span>
              <span class="cell-desc">Class I · LOE A</span>
            </div>
            <div class="heatmap-cell" data-heatmap-cor="class1" data-heatmap-loe="B">
              <span class="count-val" id="hm-c1-b">1</span>
              <span class="cell-desc">Class I · LOE B</span>
            </div>
            <div class="heatmap-cell" data-heatmap-cor="class1" data-heatmap-loe="C">
              <span class="count-val" id="hm-c1-c">0</span>
              <span class="cell-desc">Class I · LOE C</span>
            </div>

            <div class="heatmap-cell-label cor-2a">Class IIa (Nên dùng)</div>
            <div class="heatmap-cell" data-heatmap-cor="class2a" data-heatmap-loe="A">
              <span class="count-val" id="hm-c2a-a">1</span>
              <span class="cell-desc">Class IIa · LOE A</span>
            </div>
            <div class="heatmap-cell" data-heatmap-cor="class2a" data-heatmap-loe="B">
              <span class="count-val" id="hm-c2a-b">1</span>
              <span class="cell-desc">Class IIa · LOE B</span>
            </div>
            <div class="heatmap-cell" data-heatmap-cor="class2a" data-heatmap-loe="C">
              <span class="count-val" id="hm-c2a-c">0</span>
              <span class="cell-desc">Class IIa · LOE C</span>
            </div>

            <div class="heatmap-cell-label cor-3">Class III (Hại/Không ích)</div>
            <div class="heatmap-cell" data-heatmap-cor="class3" data-heatmap-loe="A">
              <span class="count-val" id="hm-c3-a">1</span>
              <span class="cell-desc">Class III · LOE A</span>
            </div>
            <div class="heatmap-cell" data-heatmap-cor="class3" data-heatmap-loe="B">
              <span class="count-val" id="hm-c3-b">0</span>
              <span class="cell-desc">Class III · LOE B</span>
            </div>
            <div class="heatmap-cell" data-heatmap-cor="class3" data-heatmap-loe="C">
              <span class="count-val" id="hm-c3-c">0</span>
              <span class="cell-desc">Class III · LOE C</span>
            </div>
          </div>
        </div>
      </div>

      <!-- VIEW 1: RADAR FEED ITEMS (DIFF CARDS) -->
      <div class="radar-feed" id="radar-feed-list" style="display:flex; flex-direction:column; gap:1.25rem;">
        
        <!-- CARD 1: ADA 2026 / KDIGO 2024 -->
        <article class="radar-card" data-card-id="ada-2026-dm" data-spec="endo" data-cor="class1" data-loe="A">
          <div class="radar-card-header">
            <div>
              <h2 class="radar-card-title">ADA 2026 / KDIGO 2024 — Khởi Trị Thuốc Hạ Đường Huyết Ở Bệnh Nhân Nguy Cơ Cao</h2>
              <div class="radar-meta">
                <span><i class="fa-solid fa-building-columns"></i> American Diabetes Association (ADA 2026)</span>
                <span><i class="fa-regular fa-calendar"></i> Tháng 1/2026</span>
                <div class="cor-container">
                  <span class="cor-badge cor-class-1"><i class="fa-solid fa-circle-check"></i> Class I</span>
                  <span class="loe-badge">LOE A</span>
                </div>
              </div>
            </div>
            <div class="radar-card-top-actions">
              <span class="radar-badge-practice"><i class="fa-solid fa-fire"></i> THAY ĐỔI BƯỚC NGOẶT</span>
              <button class="bookmark-btn" data-card-id="ada-2026-dm" title="Lưu thông báo này"><i class="fa-regular fa-bookmark"></i></button>
            </div>
          </div>

          <div class="diff-container">
            <div class="diff-box old">
              <div class="diff-header"><span>Bản Khuyến Cáo Cũ (Truyền Thống)</span> ❌</div>
              <div class="diff-text">Bắt buộc khởi đầu bằng <strong>Metformin</strong> đơn trị liệu cho mọi bệnh nhân ĐTĐ type 2. Chỉ thêm thuốc thứ hai (SGLT2i/GLP-1 RA) khi Metformin không đạt mục tiêu HbA1c sau 3 tháng.</div>
            </div>
            <div class="diff-box new">
              <div class="diff-header"><span>Bản Khuyến Cáo 2026 (Mới)</span> ✅</div>
              <div class="diff-text">Khởi trị ngay <strong>SGLT2i hoặc GLP-1 RA</strong> (độc lập hoặc phối hợp Metformin) ở bệnh nhân có nguy cơ ASCVD cao, Suy tim (HFrEF/HFpEF) hoặc Bệnh thận mạn (CKD) <strong>bất kể mức HbA1c ban đầu</strong>.</div>
            </div>
          </div>

          <div class="diff-reason-box">
            <strong>💡 Lý do thay đổi &amp; Bằng chứng lâm sàng:</strong> Phân tích gộp từ các thử nghiệm Landmark (DAPA-CKD, EMPEROR-Reduced, FLOW) chứng minh bảo vệ tim thận vượt trội không phụ thuộc vào hiệu quả hạ glucose máu.
          </div>

          <div class="card-footer-bar">
            <button class="action-btn-link toggle-deepdive-btn">
              <i class="fa-solid fa-microscope"></i> Xem Bằng Chứng Landmark Trial &amp; Forest Plot <i class="fa-solid fa-chevron-down"></i>
            </button>
            <a href="#/docspace/protocol" class="action-btn-link" style="text-decoration:none; color:var(--radar-primary); font-weight:700;">
              <i class="fa-solid fa-book-medical"></i> Xem Phác Đồ Trong DocSpace
            </a>
          </div>

          <div class="deepdive-content" style="display:none; padding:1rem; background:var(--color-bg); border-radius:8px; margin-top:0.75rem; border:1px dashed var(--color-border);">
            <div style="font-weight:700; color:var(--color-primary); margin-bottom:0.4rem;"><i class="fa-solid fa-flask"></i> Landmark Trials: FLOW Trial &amp; DAPA-CKD</div>
            <p style="font-size:0.85rem; color:var(--color-text-muted); margin:0 0 0.5rem 0;">Giảm 24% nguy cơ gộp biến cố thận nguyên phát và tử vong tim mạch (HR 0.76; 95% CI 0.66-0.87; P=0.00007).</p>
          </div>
        </article>

        <!-- CARD 2: ESC 2026 AF -->
        <article class="radar-card" data-card-id="esc-2026-af" data-spec="cardio" data-cor="class1" data-loe="A">
          <div class="radar-card-header">
            <div>
              <h2 class="radar-card-title">ESC 2026 — Hướng Dẫn Quản Lý Rung Nhĩ &amp; Tối Ưu Hóa Kháng Đông</h2>
              <div class="radar-meta">
                <span><i class="fa-solid fa-building-columns"></i> Hiệp Hội Tim Mạch Châu Âu (ESC 2026)</span>
                <span><i class="fa-regular fa-calendar"></i> Tháng 5/2026</span>
                <div class="cor-container">
                  <span class="cor-badge cor-class-1"><i class="fa-solid fa-circle-check"></i> Class I</span>
                  <span class="loe-badge">LOE A</span>
                </div>
              </div>
            </div>
            <div class="radar-card-top-actions">
              <span class="radar-badge-practice"><i class="fa-solid fa-fire"></i> THAY ĐỔI BƯỚC NGOẶT</span>
              <button class="bookmark-btn" data-card-id="esc-2026-af" title="Lưu thông báo này"><i class="fa-regular fa-bookmark"></i></button>
            </div>
          </div>

          <div class="diff-container">
            <div class="diff-box old">
              <div class="diff-header"><span>Bản Khuyến Cáo 2020 (Cũ)</span> ❌</div>
              <div class="diff-text">Sử dụng đơn thuần thang điểm CHA2DS2-VASc để phân tầng nguy cơ đột quỵ và quyết định chỉ định dùng kháng đông.</div>
            </div>
            <div class="diff-box new">
              <div class="diff-header"><span>Bản Khuyến Cáo 2026 (Mới)</span> ✅</div>
              <div class="diff-text">Chuyển sang sử dụng thang điểm CARE-AF tích hợp thêm yếu tố chức năng thận (eGFR) và biomarker sinh học (hs-Tn, NT-proBNP) cho độ chính xác cao hơn. Dùng DOAC ưu tiên hàng đầu.</div>
            </div>
          </div>

          <div class="diff-reason-box">
            <strong>💡 Lý do thay đổi:</strong> Thử nghiệm CARE-AF Trial (2025, N=12,500) chứng minh giảm thiểu nguy cơ xuất huyết nặng ở nhóm bệnh nhân tuổi cao và có bệnh thận đi kèm.
          </div>
        </article>

        <!-- CARD 3: BYT / GOLD 2026 COPD -->
        <article class="radar-card" data-card-id="byt-2026-copd" data-spec="pulmo vn" data-cor="class1" data-loe="A">
          <div class="radar-card-header">
            <div>
              <h2 class="radar-card-title">Bộ Y Tế Việt Nam 2026 / GOLD 2026 — Phác Đồ BPTNMT &amp; Khởi Trị Bộ Đôi LABA/LAMA</h2>
              <div class="radar-meta">
                <span><i class="fa-solid fa-hospital"></i> Bộ Y Tế (QĐ 2131/QĐ-BYT) &amp; GOLD</span>
                <span><i class="fa-regular fa-calendar"></i> Tháng 7/2026</span>
                <div class="cor-container">
                  <span class="cor-badge cor-class-1"><i class="fa-solid fa-circle-check"></i> Class I</span>
                  <span class="loe-badge">LOE A</span>
                </div>
              </div>
            </div>
            <div class="radar-card-top-actions">
              <span class="radar-badge-practice"><i class="fa-solid fa-fire"></i> THAY ĐỔI BƯỚC NGOẶT</span>
              <button class="bookmark-btn" data-card-id="byt-2026-copd" title="Lưu thông báo này"><i class="fa-regular fa-bookmark"></i></button>
            </div>
          </div>

          <div class="diff-container">
            <div class="diff-box old">
              <div class="diff-header"><span>Phân loại ABCD Cũ</span> ❌</div>
              <div class="diff-text">Nhóm D khởi trị bằng LAMA hoặc LABA/LAMA hoặc ICS/LABA. Chưa có vai trò quyết định của số lượng bạch cầu ái toan máu (blood eosinophils).</div>
            </div>
            <div class="diff-box new">
              <div class="diff-header"><span>Phác Đồ Mới Nhất 2026</span> ✅</div>
              <div class="diff-text">Hợp nhất nhóm C và D thành <strong>Nhóm E (Exacerbation)</strong>. Khởi trị ưu tiên <strong>LABA + LAMA</strong>. Chỉ thêm ICS khi bạch cầu ái toan $\ge$ 300 tế bào/$\mu$L hoặc $\ge$ 100 kèm $\ge$ 2 đợt cấp/năm.</div>
            </div>
          </div>
        </article>

        <!-- CARD 4: ESO / AHA ĐỘT QUỴ TIÊU SỢI HUYẾT -->
        <article class="radar-card" data-card-id="eso-2026-stroke" data-spec="neuro" data-cor="class1" data-loe="A">
          <div class="radar-card-header">
            <div>
              <h2 class="radar-card-title">ESO / AHA 2026 — Tenecteplase (TNK) Thay Thế Alteplase Trong Đột Quỵ Nhồi Máu Não Cấp</h2>
              <div class="radar-meta">
                <span><i class="fa-solid fa-brain"></i> European Stroke Organisation (ESO)</span>
                <span><i class="fa-regular fa-calendar"></i> Tháng 4/2026</span>
                <div class="cor-container">
                  <span class="cor-badge cor-class-1"><i class="fa-solid fa-circle-check"></i> Class I</span>
                  <span class="loe-badge">LOE A</span>
                </div>
              </div>
            </div>
            <div class="radar-card-top-actions">
              <span class="radar-badge-practice"><i class="fa-solid fa-fire"></i> THAY ĐỔI BƯỚC NGOẶT</span>
              <button class="bookmark-btn" data-card-id="eso-2026-stroke" title="Lưu thông báo này"><i class="fa-regular fa-bookmark"></i></button>
            </div>
          </div>

          <div class="diff-container">
            <div class="diff-box old">
              <div class="diff-header"><span>Khuyến Cáo Cũ (Alteplase)</span> ❌</div>
              <div class="diff-text">Alteplase (0.9 mg/kg truyền tĩnh mạch trong 60 phút) là thuốc tiêu sợi huyết chuẩn duy nhất trong cửa sổ 4.5 giờ.</div>
            </div>
            <div class="diff-box new">
              <div class="diff-header"><span>Khuyến Cáo 2026 (Tenecteplase)</span> ✅</div>
              <div class="diff-text"><strong>Tenecteplase (TNK 0.25 mg/kg tiêm tĩnh mạch 1 lần nhanh Bolus trong 5 giây)</strong> được nâng lên Class I ưu tiên hàng đầu, đặc biệt ở bệnh nhân tắc mạch lớn chuẩn bị can thiệp lấy huyết khối (EVT).</div>
            </div>
          </div>
        </article>
      </div>

      <!-- VIEW 2: TIMELINE VIEW -->
      <div id="radar-timeline-list" style="display:none; padding:1rem 0;">
        <div style="border-left:3px solid var(--color-primary); padding-left:1.5rem; display:flex; flex-direction:column; gap:1.5rem;">
          <div>
            <span style="background:var(--color-primary); color:#fff; font-size:11px; font-weight:800; padding:2px 8px; border-radius:10px;">NĂM 2026</span>
            <h3 style="margin:0.35rem 0; font-size:1.1rem; color:var(--color-text);">Kỷ Nguyên Tenecteplase &amp; SGLT2i/GLP-1 RA Phủ Rộng Đa Cơ Quan</h3>
            <p style="font-size:0.88rem; color:var(--color-text-muted); margin:0;">Chuyển biến mạnh mẽ từ điều trị kiểm soát triệu chứng sang bảo vệ cơ quan đích lâu dài.</p>
          </div>
          <div>
            <span style="background:#059669; color:#fff; font-size:11px; font-weight:800; padding:2px 8px; border-radius:10px;">NĂM 2024 - 2025</span>
            <h3 style="margin:0.35rem 0; font-size:1.1rem; color:var(--color-text);">Khởi Động Tứ Trụ Suy Tim (Quadruple Therapy) &amp; GOLD Nhóm E</h3>
            <p style="font-size:0.88rem; color:var(--color-text-muted); margin:0;">Khởi trị đồng thời 4 nhóm thuốc trong suy tim (ARNI + BB + MRA + SGLT2i).</p>
          </div>
        </div>
      </div>

      <!-- VIEW 3: MATRIX VIEW -->
      <div id="radar-matrix-list" style="display:none; padding:1rem 0;">
        <div style="overflow-x:auto; background:var(--color-surface); border:1px solid var(--color-border); border-radius:12px; padding:1rem;">
          <table style="width:100%; border-collapse:collapse; font-size:12.5px; text-align:left;">
            <thead>
              <tr style="border-bottom:2px solid var(--color-border); color:var(--color-text-muted);">
                <th style="padding:10px;">Bệnh Lý</th>
                <th style="padding:10px;">Khuyến Cáo Quốc Tế (ACC/AHA/ESC/ADA)</th>
                <th style="padding:10px;">Hướng Dẫn Bộ Y Tế Việt Nam</th>
                <th style="padding:10px;">Mức Độ Đồng Thuận</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom:1px solid var(--color-border);">
                <td style="padding:10px; font-weight:700;">Đái Tháo Đường + CKD</td>
                <td style="padding:10px;">SGLT2i hoặc GLP-1 RA ngay từ đầu (Class I, LOE A)</td>
                <td style="padding:10px;">Đã cập nhật chỉ định SGLT2i bảo vệ thận</td>
                <td style="padding:10px;"><span style="color:#059669; font-weight:700;">● Hoàn toàn đồng thuận</span></td>
              </tr>
              <tr style="border-bottom:1px solid var(--color-border);">
                <td style="padding:10px; font-weight:700;">Đột Quỵ Nhồi Máu Não</td>
                <td style="padding:10px;">Tenecteplase 0.25mg/kg tiêm Bolus (Class I)</td>
                <td style="padding:10px;">Alteplase truyền tĩnh mạch &amp; TNK đang mở rộng</td>
                <td style="padding:10px;"><span style="color:#0284c7; font-weight:700;">● Đang chuyển tiếp</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  `;
}
