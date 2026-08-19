/**
 * CliniPortal — EBM Practice Lab Pro SPA View (TypeScript)
 * Path: src/content/ebm/ebm-lab/ebm-lab-view.ts
 * Nâng cấp toàn diện: NNT/NNH/ARR/RRR/OR/95% CI + PICO Search Generator + RoB 2 Traffic-Light Matrix
 */

export type EbmLabTab = 'nnt' | 'pico' | 'appraisal' | 'charts';

export function renderEbmLabView(activeTab: EbmLabTab = 'nnt'): string {
  return `
    <div class="ebm-lab-container animate-fade-in" style="max-width: 1440px; margin: 0 auto; padding: 1.25rem 1rem;">
      
      <!-- BREADCRUMB -->
      <div style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); margin-bottom: 1.25rem;">
        <a href="#/" style="color: inherit; text-decoration: none;">🏠 Trang chủ</a> &nbsp;/&nbsp; 
        <a href="#/ebm" style="color: inherit; text-decoration: none;">Y Học Chứng Cứ</a> &nbsp;/&nbsp; 
        <span style="color: #059669; font-weight: 700;">EBM Practice Lab Pro</span>
      </div>

      <!-- HERO BANNER -->
      <section style="background: linear-gradient(135deg, #064e3b 0%, #047857 50%, #059669 100%); color: #fff; padding: 2rem 1.5rem; border-radius: 20px; margin-bottom: 1.5rem; box-shadow: 0 10px 25px rgba(5,150,105,0.2);">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:1rem;">
          <div>
            <div style="display:inline-flex; align-items:center; gap:6px; padding:3px 10px; background:rgba(255,255,255,0.18); border-radius:20px; font-size:11px; font-weight:700; color:#a7f3d0; margin-bottom:0.75rem;">
              <i class="fa-solid fa-flask-vial"></i> EBM EVIDENCE LABORATORY • STATISTICAL WORKSUITE
            </div>
            <h1 style="font-size:clamp(1.5rem, 2.5vw, 2.2rem); font-weight:800; margin:0 0 0.5rem 0; line-height:1.25;">
              EBM Practice Lab Pro — Thực Hành Y Học Chứng Cứ
            </h1>
            <p style="margin:0; font-size:0.92rem; opacity:0.95; max-width:800px; line-height:1.55;">
              Bộ công cụ tương tác cao cấp: Tính toán NNT/NNH/ARR/RRR kèm khoảng tin cậy 95%, máy tạo câu hỏi PICO &amp; lệnh tìm kiếm PubMed tự động, cùng bảng kiểm thẩm định chất lượng nghiên cứu Cochrane RoB 2.
            </p>
          </div>
          <div style="display:flex; gap:0.5rem;">
            <a href="#/ebm" class="btn" style="background:rgba(255,255,255,0.2); color:#fff; padding:0.5rem 1rem; border-radius:8px; text-decoration:none; font-size:12.5px; font-weight:700; display:inline-flex; align-items:center; gap:6px; border:1px solid rgba(255,255,255,0.3);">
              <i class="fa-solid fa-arrow-left"></i> EBM Hub
            </a>
          </div>
        </div>
      </section>

      <!-- RESPONSIVE HORIZONTAL TAB BAR -->
      <div style="display:flex; gap:8px; border-bottom:2px solid var(--color-border); margin-bottom:1.5rem; overflow-x:auto; scrollbar-width:none; -webkit-overflow-scrolling:touch; padding-bottom:6px;">
        <button class="ebm-lab-nav-tab ${activeTab === 'nnt' ? 'is-active' : ''}" data-tab="nnt" style="padding:0.6rem 1.1rem; border:none; background:${activeTab === 'nnt' ? '#059669' : 'transparent'}; color:${activeTab === 'nnt' ? '#fff' : 'var(--color-text)'}; border-radius:10px; font-weight:700; font-size:12.5px; cursor:pointer; display:inline-flex; align-items:center; gap:6px; white-space:nowrap; flex-shrink:0;">
          <i class="fa-solid fa-calculator"></i> 1. Máy Tính NNT / NNH / ARR / RRR
        </button>
        <button class="ebm-lab-nav-tab ${activeTab === 'pico' ? 'is-active' : ''}" data-tab="pico" style="padding:0.6rem 1.1rem; border:none; background:${activeTab === 'pico' ? '#059669' : 'transparent'}; color:${activeTab === 'pico' ? '#fff' : 'var(--color-text)'}; border-radius:10px; font-weight:700; font-size:12.5px; cursor:pointer; display:inline-flex; align-items:center; gap:6px; white-space:nowrap; flex-shrink:0;">
          <i class="fa-solid fa-crosshairs"></i> 2. PICO &amp; PubMed Search Builder
        </button>
        <button class="ebm-lab-nav-tab ${activeTab === 'appraisal' ? 'is-active' : ''}" data-tab="appraisal" style="padding:0.6rem 1.1rem; border:none; background:${activeTab === 'appraisal' ? '#059669' : 'transparent'}; color:${activeTab === 'appraisal' ? '#fff' : 'var(--color-text)'}; border-radius:10px; font-weight:700; font-size:12.5px; cursor:pointer; display:inline-flex; align-items:center; gap:6px; white-space:nowrap; flex-shrink:0;">
          <i class="fa-solid fa-clipboard-check"></i> 3. Thẩm Định Nghiên Cứu (Cochrane RoB 2)
        </button>
        <button class="ebm-lab-nav-tab ${activeTab === 'charts' ? 'is-active' : ''}" data-tab="charts" style="padding:0.6rem 1.1rem; border:none; background:${activeTab === 'charts' ? '#059669' : 'transparent'}; color:${activeTab === 'charts' ? '#fff' : 'var(--color-text)'}; border-radius:10px; font-weight:700; font-size:12.5px; cursor:pointer; display:inline-flex; align-items:center; gap:6px; white-space:nowrap; flex-shrink:0;">
          <i class="fa-solid fa-chart-line"></i> 4. Kho Biểu Đồ &amp; Meta-Analysis
        </button>
      </div>

      <!-- TAB CONTENT CONTAINER -->
      <div id="ebmLabContentArea">
        ${renderActiveLabTab(activeTab)}
      </div>

    </div>
  `;
}

function renderActiveLabTab(tab: EbmLabTab): string {
  switch (tab) {
    case 'nnt':
      return renderNntCalculatorPro();
    case 'pico':
      return renderPicoBuilderPro();
    case 'appraisal':
      return renderCriticalAppraisalRoB2();
    case 'charts':
      return renderChartsDirectory();
    default:
      return renderNntCalculatorPro();
  }
}

// ─────────────────────────────────────────────────────────────
// 1. NNT / NNH / ARR / RRR / OR / 95% CI CALCULATOR PRO
// ─────────────────────────────────────────────────────────────
function renderNntCalculatorPro(): string {
  return `
    <div style="display:flex; flex-direction:column; gap:1.25rem;">
      
      <!-- PRESET TRIALS BAR -->
      <div style="background:var(--color-surface); border:1px solid var(--color-border); border-radius:12px; padding:12px 16px; display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
        <span style="font-size:12px; font-weight:700; color:var(--color-text-muted); display:inline-flex; align-items:center; gap:5px;">
          <i class="fa-solid fa-bolt" style="color:#f59e0b;"></i> Dữ liệu mẫu thử nghiệm Landmark:
        </span>
        <div style="display:flex; gap:6px; flex-wrap:wrap;">
          <button class="dsp-btn dsp-btn-sm dsp-btn-ghost js-load-preset-trial" data-trial="dapa-hf" style="font-size:11.5px; padding:3px 8px;">DAPA-HF (Dapagliflozin)</button>
          <button class="dsp-btn dsp-btn-sm dsp-btn-ghost js-load-preset-trial" data-trial="sprint" style="font-size:11.5px; padding:3px 8px;">SPRINT (Hạ Áp Tích Cực)</button>
          <button class="dsp-btn dsp-btn-sm dsp-btn-ghost js-load-preset-trial" data-trial="paradigm" style="font-size:11.5px; padding:3px 8px;">PARADIGM-HF (ARNI)</button>
          <button class="dsp-btn dsp-btn-sm dsp-btn-ghost js-load-preset-trial" data-trial="recovery" style="font-size:11.5px; padding:3px 8px;">RECOVERY (Dexamethasone)</button>
        </div>
      </div>

      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(min(340px, 100%), 1fr)); gap:1.25rem;">
        
        <!-- INPUT DATA FORM -->
        <div style="background:var(--color-surface); border:1px solid var(--color-border); border-radius:14px; padding:1.25rem;">
          <h3 style="font-size:1.05rem; font-weight:700; color:var(--color-text); margin:0 0 1rem 0; display:flex; align-items:center; gap:6px;">
            <i class="fa-solid fa-table-cells" style="color:#059669;"></i> Nhập Bảng Biến Cố 2x2
          </h3>

          <div style="margin-bottom:1rem; padding:12px; background:rgba(2,132,199,0.05); border:1px solid rgba(2,132,199,0.2); border-radius:10px;">
            <div style="font-size:12px; font-weight:700; color:var(--color-primary); margin-bottom:6px;">1. Nhóm Can Thiệp (Intervention / Experimental):</div>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
              <div>
                <label style="font-size:11px; color:var(--color-text-muted); display:block; margin-bottom:3px;">Số biến cố (Events - a):</label>
                <input type="number" id="nnt-event-exp" value="82" min="0" class="dsp-input dsp-input--sm" style="width:100%; font-weight:700;" />
              </div>
              <div>
                <label style="font-size:11px; color:var(--color-text-muted); display:block; margin-bottom:3px;">Tổng cỡ mẫu (Total - n1):</label>
                <input type="number" id="nnt-total-exp" value="2373" min="1" class="dsp-input dsp-input--sm" style="width:100%;" />
              </div>
            </div>
          </div>

          <div style="padding:12px; background:rgba(100,116,139,0.05); border:1px solid var(--color-border); border-radius:10px;">
            <div style="font-size:12px; font-weight:700; color:var(--color-text); margin-bottom:6px;">2. Nhóm Chứng (Control / Placebo):</div>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
              <div>
                <label style="font-size:11px; color:var(--color-text-muted); display:block; margin-bottom:3px;">Số biến cố (Events - c):</label>
                <input type="number" id="nnt-event-ctrl" value="137" min="0" class="dsp-input dsp-input--sm" style="width:100%; font-weight:700;" />
              </div>
              <div>
                <label style="font-size:11px; color:var(--color-text-muted); display:block; margin-bottom:3px;">Tổng cỡ mẫu (Total - n2):</label>
                <input type="number" id="nnt-total-ctrl" value="2371" min="1" class="dsp-input dsp-input--sm" style="width:100%;" />
              </div>
            </div>
          </div>
        </div>

        <!-- STATISTICAL RESULTS CARD -->
        <div style="background:var(--color-surface); border:1px solid var(--color-border); border-radius:14px; padding:1.25rem; display:flex; flex-direction:column; justify-content:space-between;">
          <div>
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span style="font-size:11px; font-weight:700; text-transform:uppercase; color:#059669; background:rgba(5,150,105,0.1); padding:2px 8px; border-radius:6px;">KẾT QUẢ THỐNG KÊ LÂM SÀNG</span>
              <span id="nnt-verdict-badge" class="dsp-badge dsp-badge--success" style="font-size:11px;">Bảo vệ lâm sàng</span>
            </div>

            <div style="text-align:center; padding:1rem 0 0.5rem;">
              <div style="font-size:12px; color:var(--color-text-muted); font-weight:600;" id="nnt-title-lbl">Number Needed to Treat (NNT):</div>
              <div id="nnt-result-val" style="font-size:3.5rem; font-weight:800; color:#059669; line-height:1.1;">43</div>
              <div id="nnt-ci-val" style="font-size:11.5px; color:var(--color-text-muted); font-weight:700; margin-top:2px;">95% CI: [31 - 72]</div>
              <div id="nnt-summary-text" style="font-size:12.5px; font-weight:600; color:var(--color-text); margin-top:0.4rem; line-height:1.4;">
                Cần điều trị 43 bệnh nhân để phòng ngừa 1 biến cố có hại.
              </div>
            </div>

            <!-- METRIC GRID -->
            <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:8px; text-align:center; margin-top:0.75rem;">
              <div style="background:var(--color-bg); border-radius:8px; padding:8px; border:1px solid var(--color-border);">
                <div style="font-size:10px; color:var(--color-text-muted);">CER (Chứng):</div>
                <div id="nnt-cer-val" style="font-size:1.05rem; font-weight:800; color:var(--color-text);">5.78%</div>
              </div>
              <div style="background:var(--color-bg); border-radius:8px; padding:8px; border:1px solid var(--color-border);">
                <div style="font-size:10px; color:var(--color-text-muted);">EER (Can thiệp):</div>
                <div id="nnt-eer-val" style="font-size:1.05rem; font-weight:800; color:var(--color-primary);">3.46%</div>
              </div>
              <div style="background:var(--color-bg); border-radius:8px; padding:8px; border:1px solid var(--color-border);">
                <div style="font-size:10px; color:var(--color-text-muted);">ARR (Giảm Tuyệt Đối):</div>
                <div id="nnt-arr-val" style="font-size:1.05rem; font-weight:800; color:#059669;">2.32%</div>
              </div>
              <div style="background:var(--color-bg); border-radius:8px; padding:8px; border:1px solid var(--color-border);">
                <div style="font-size:10px; color:var(--color-text-muted);">RR (Nguy Cơ Tương Đối):</div>
                <div id="nnt-rr-val" style="font-size:1.05rem; font-weight:800; color:var(--color-text);">0.60</div>
              </div>
              <div style="background:var(--color-bg); border-radius:8px; padding:8px; border:1px solid var(--color-border);">
                <div style="font-size:10px; color:var(--color-text-muted);">RRR (Giảm Tương Đối):</div>
                <div id="nnt-rrr-val" style="font-size:1.05rem; font-weight:800; color:#059669;">40.1%</div>
              </div>
              <div style="background:var(--color-bg); border-radius:8px; padding:8px; border:1px solid var(--color-border);">
                <div style="font-size:10px; color:var(--color-text-muted);">Odds Ratio (OR):</div>
                <div id="nnt-or-val" style="font-size:1.05rem; font-weight:800; color:var(--color-text);">0.58</div>
              </div>
            </div>
          </div>

          <div style="background:var(--color-bg); border-left:4px solid #059669; padding:8px 12px; border-radius:0 8px 8px 0; font-size:11.5px; color:var(--color-text); margin-top:10px;">
            💡 <strong>Nguyên lý EBM:</strong> NNT phản ánh hiệu quả thực tế lâm sàng. Khi áp dụng lên thực tế cần cân nhắc cả nguy cơ tác dụng phụ (NNH) và chi phí kinh tế.
          </div>
        </div>

      </div>

      <!-- 100-PATIENT CATES ICON ARRAY -->
      <div style="background:var(--color-surface); border:1px solid var(--color-border); border-radius:14px; padding:1.25rem;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem; flex-wrap:wrap; gap:8px;">
          <h4 style="font-size:0.95rem; font-weight:700; color:var(--color-text); margin:0;">
            <i class="fa-solid fa-users" style="color:var(--color-primary);"></i> Trực Quan Hóa Trên 100 Bệnh Nhân (Cates 100-Patient Dot Grid)
          </h4>
          <div style="display:flex; gap:10px; font-size:11.5px; flex-wrap:wrap;">
            <span style="color:#059669; font-weight:700;">🟢 <span id="dot-saved-count">2</span> Người hưởng lợi</span>
            <span style="color:#ef4444; font-weight:700;">🔴 <span id="dot-event-count">3</span> Người vẫn biến cố</span>
            <span style="color:#94a3b8; font-weight:700;">⚪ <span id="dot-safe-count">95</span> Người không ảnh hưởng</span>
          </div>
        </div>
        <div id="cates-dot-matrix" style="display:grid; grid-template-columns:repeat(20, 1fr); gap:4px; padding:8px 0;">
          <!-- Rendered via JS -->
        </div>
      </div>

    </div>
  `;
}

// ─────────────────────────────────────────────────────────────
// 2. PICO CLINICAL QUESTION & PUBMED SEARCH BUILDER PRO
// ─────────────────────────────────────────────────────────────
function renderPicoBuilderPro(): string {
  return `
    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(min(340px, 100%), 1fr)); gap:1.25rem;">
      
      <!-- PICO INPUT FORM -->
      <div style="background:var(--color-surface); border:1px solid var(--color-border); border-radius:14px; padding:1.25rem;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
          <h3 style="font-size:1.05rem; font-weight:700; color:var(--color-text); margin:0;">
            <i class="fa-solid fa-crosshairs" style="color:#0284c7;"></i> Thiết Lập 4 Thành Tố PICO
          </h3>
          <select id="pico-preset-select" class="dsp-select" style="font-size:11.5px; padding:3px 8px;">
            <option value="">⚡ Chọn ca mẫu PICO...</option>
            <option value="sglt2-ckd">SGLT2i trên bệnh thận mạn (CKD)</option>
            <option value="tnk-stroke">Tenecteplase trong đột quỵ cấp</option>
            <option value="doac-af">DOAC phòng ngừa đột quỵ rung nhĩ</option>
          </select>
        </div>

        <div style="display:flex; flex-direction:column; gap:10px;">
          <div>
            <label style="font-size:11.5px; font-weight:700; color:#16a34a; display:block; margin-bottom:3px;">
              P — Patient / Population (Quần thể bệnh nhân):
            </label>
            <input type="text" id="pico-p" class="dsp-input" placeholder="VD: Type 2 Diabetes AND Chronic Kidney Disease" value="Type 2 Diabetes AND Chronic Kidney Disease" />
          </div>

          <div>
            <label style="font-size:11.5px; font-weight:700; color:#2563eb; display:block; margin-bottom:3px;">
              I — Intervention (Biện pháp can thiệp):
            </label>
            <input type="text" id="pico-i" class="dsp-input" placeholder="VD: SGLT2 inhibitors OR Dapagliflozin OR Empagliflozin" value="SGLT2 inhibitors OR Dapagliflozin" />
          </div>

          <div>
            <label style="font-size:11.5px; font-weight:700; color:#d97706; display:block; margin-bottom:3px;">
              C — Comparison (Đối chứng / So sánh):
            </label>
            <input type="text" id="pico-c" class="dsp-input" placeholder="VD: Placebo OR Standard Care" value="Placebo OR Standard of care" />
          </div>

          <div>
            <label style="font-size:11.5px; font-weight:700; color:#7c3aed; display:block; margin-bottom:3px;">
              O — Outcome (Kết cục lâm sàng):
            </label>
            <input type="text" id="pico-o" class="dsp-input" placeholder="VD: Kidney disease progression OR Cardiovascular mortality" value="Kidney disease progression OR Mortality" />
          </div>
        </div>
      </div>

      <!-- GENERATED QUESTION & PUBMED QUERY -->
      <div style="background:var(--color-surface); border:1px solid var(--color-border); border-radius:14px; padding:1.25rem; display:flex; flex-direction:column; justify-content:space-between;">
        <div>
          <h3 style="font-size:1.05rem; font-weight:700; color:var(--color-text); margin:0 0 1rem 0;">
            <i class="fa-solid fa-file-code" style="color:#059669;"></i> Câu Hỏi Lâm Sàng &amp; Chuỗi Tìm Kiếm PubMed
          </h3>

          <div style="background:rgba(2,132,199,0.06); border:1px solid rgba(2,132,199,0.2); border-radius:10px; padding:12px; margin-bottom:1rem;">
            <div style="font-size:11px; font-weight:700; color:var(--color-primary); margin-bottom:4px;">CÂU HỎI LÂM SÀNG CHUẨN:</div>
            <p id="pico-structured-question" style="margin:0; font-size:12.5px; font-weight:600; color:var(--color-text); line-height:1.5;">
              Ở bệnh nhân ĐTĐ type 2 kèm bệnh thận mạn (P), việc sử dụng SGLT2i (I) so với giả dược / chăm sóc tiêu chuẩn (C) có giúp làm giảm tiến triển bệnh thận và tử vong tim mạch (O) hay không?
            </p>
          </div>

          <div style="background:var(--color-bg); border:1px solid var(--color-border); border-radius:10px; padding:12px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
              <span style="font-size:11px; font-weight:700; color:var(--color-text-muted);">PUBMED BOOLEAN QUERY (MeSH READY):</span>
              <button class="dsp-btn dsp-btn-sm dsp-btn-ghost js-copy-pubmed-query" style="font-size:11px; padding:2px 8px;">
                <i class="fa-regular fa-copy"></i> Sao chép lệnh
              </button>
            </div>
            <textarea id="pico-pubmed-query" class="dsp-textarea" rows="3" readonly style="font-family:var(--font-mono, monospace); font-size:11.5px; resize:none;">("Type 2 Diabetes"[Mesh] OR Diabetes) AND ("Chronic Kidney Disease"[Mesh] OR CKD) AND ("SGLT2 inhibitors"[Mesh] OR Dapagliflozin) AND ("Kidney Failure"[Mesh] OR Mortality)</textarea>
          </div>
        </div>

        <div style="margin-top:1rem;">
          <a id="btnOpenPubMedSearch" href="https://pubmed.ncbi.nlm.nih.gov/?term=%28%22Type+2+Diabetes%22%5BMesh%5D+OR+Diabetes%29+AND+%28%22Chronic+Kidney+Disease%22%5BMesh%5D+OR+CKD%29+AND+%28%22SGLT2+inhibitors%22%5BMesh%5D+OR+Dapagliflozin%29" target="_blank" rel="noopener noreferrer" class="dsp-btn dsp-btn-primary" style="width:100%; justify-content:center; padding:10px; font-size:12.5px; font-weight:700;">
            <i class="fa-solid fa-arrow-up-right-from-square"></i> Mở Tìm Kiếm Trực Tiếp Trên PubMed NCBI
          </a>
        </div>
      </div>

    </div>
  `;
}

// ─────────────────────────────────────────────────────────────
// 3. COCHRANE ROB 2 & CASP CRITICAL APPRAISAL MATRIX
// ─────────────────────────────────────────────────────────────
function renderCriticalAppraisalRoB2(): string {
  const domains = [
    { id: 'd1', title: 'D1. Quá trình Phân ngẫu nhiên (Randomisation Process)', desc: 'Trình tự tạo ngẫu nhiên và giấu phân bổ (Allocation Concealment) có đầy đủ không?' },
    { id: 'd2', title: 'D2. Sai lệch do Can thiệp (Deviations from Intended Interventions)', desc: 'Làm mù (Blinding) bệnh nhân, người chăm sóc & mức độ tuân thủ can thiệp.' },
    { id: 'd3', title: 'D3. Dữ liệu Kết cục bị Mất (Missing Outcome Data)', desc: 'Tỷ lệ mất dấu theo dõi (Loss to follow-up) và phân tích theo ý định điều trị (ITT).' },
    { id: 'd4', title: 'D4. Đo lường Kết cục Lâm sàng (Measurement of the Outcome)', desc: 'Phương pháp đo lường kết cục có khách quan và người đánh giá có được làm mù?' },
    { id: 'd5', title: 'D5. Lựa chọn Báo cáo Kết quả (Selection of Reported Result)', desc: 'Kết quả có được báo cáo đầy đủ theo đề cương (ClinicalTrials.gov) đã đăng ký trước?' }
  ];

  return `
    <div style="background:var(--color-surface); border:1px solid var(--color-border); border-radius:14px; padding:1.25rem;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; flex-wrap:wrap; gap:8px;">
        <div>
          <h3 style="font-size:1.1rem; font-weight:700; color:var(--color-text); margin:0;">
            <i class="fa-solid fa-clipboard-check" style="color:#059669;"></i> Thẩm Định Nguy Cơ Sai Lệch Cochrane RoB 2 (Risk of Bias 2)
          </h3>
          <p style="font-size:11.5px; color:var(--color-text-muted); margin:2px 0 0;">Đánh giá 5 miền chuẩn quốc tế cho các thử nghiệm ngẫu nhiên có đối chứng (RCTs).</p>
        </div>
        <div id="rob2-overall-badge" style="padding:4px 12px; border-radius:20px; font-weight:800; font-size:12px; background:#dcfce7; color:#166534; border:1px solid #86efac;">
          🟢 Tổng thể: Low Risk of Bias
        </div>
      </div>

      <div style="display:flex; flex-direction:column; gap:10px; margin-bottom:1.5rem;">
        ${domains.map(d => `
          <div style="display:flex; justify-content:space-between; align-items:center; background:var(--color-bg); border:1px solid var(--color-border); border-radius:10px; padding:10px 14px; flex-wrap:wrap; gap:10px;">
            <div style="flex:1; min-width:260px;">
              <h4 style="margin:0; font-size:13px; font-weight:700; color:var(--color-text);">${d.title}</h4>
              <p style="margin:2px 0 0; font-size:11.5px; color:var(--color-text-muted);">${d.desc}</p>
            </div>
            <div class="rob2-selector" data-domain="${d.id}" style="display:flex; gap:6px;">
              <button type="button" class="dsp-btn dsp-btn-sm js-rob-choice is-selected" data-val="low" style="background:#dcfce7; color:#166534; font-size:11px; font-weight:700; border:1px solid #86efac; padding:3px 8px;">
                🟢 Low
              </button>
              <button type="button" class="dsp-btn dsp-btn-sm js-rob-choice" data-val="some" style="background:var(--color-surface); color:var(--color-text-muted); font-size:11px; font-weight:700; border:1px solid var(--color-border); padding:3px 8px;">
                🟡 Some Concerns
              </button>
              <button type="button" class="dsp-btn dsp-btn-sm js-rob-choice" data-val="high" style="background:var(--color-surface); color:var(--color-text-muted); font-size:11px; font-weight:700; border:1px solid var(--color-border); padding:3px 8px;">
                🔴 High Risk
              </button>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- TRAFFIC LIGHT PLOT PREVIEW -->
      <div style="background:var(--color-bg); border:1px solid var(--color-border); border-radius:10px; padding:12px;">
        <div style="font-size:11px; font-weight:700; color:var(--color-text-muted); margin-bottom:8px;">ROB 2 TRAFFIC LIGHT PLOT:</div>
        <div style="display:flex; justify-content:space-around; align-items:center; flex-wrap:wrap; gap:10px; font-size:11.5px; font-weight:700;">
          <span id="tl-d1">D1: 🟢 Low</span>
          <span id="tl-d2">D2: 🟢 Low</span>
          <span id="tl-d3">D3: 🟢 Low</span>
          <span id="tl-d4">D4: 🟢 Low</span>
          <span id="tl-d5">D5: 🟢 Low</span>
          <span id="tl-overall" style="color:#059669; font-weight:800; border-left:2px solid var(--color-border); padding-left:10px;">Overall: 🟢 Low</span>
        </div>
      </div>
    </div>
  `;
}

// ─────────────────────────────────────────────────────────────
// 4. CHARTS DIRECTORY & VISUALIZER SUITE
// ─────────────────────────────────────────────────────────────
function renderChartsDirectory(): string {
  return `
    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(min(280px, 100%), 1fr)); gap:1.25rem;">
      <div style="background:var(--color-surface); border:1px solid var(--color-border); border-radius:14px; padding:1.25rem; text-align:center; display:flex; flex-direction:column; justify-content:space-between;">
        <div>
          <i class="fa-solid fa-tree" style="font-size:2.2rem; color:#0284c7; margin-bottom:0.75rem;"></i>
          <h4 style="font-weight:700; font-size:1rem; margin:0 0 0.4rem; color:var(--color-text);">Forest Plot Visualizer</h4>
          <p style="font-size:12px; color:var(--color-text-muted); margin-bottom:1rem; line-height:1.45;">Trực quan hóa gộp kết quả Meta-analysis, Odds Ratio (OR) &amp; Trọng số nghiên cứu.</p>
        </div>
        <a href="#/ebm/forest-plot" class="dsp-btn dsp-btn-primary dsp-btn-sm" style="justify-content:center; width:100%;">Mở Forest Plot Studio</a>
      </div>

      <div style="background:var(--color-surface); border:1px solid var(--color-border); border-radius:14px; padding:1.25rem; text-align:center; display:flex; flex-direction:column; justify-content:space-between;">
        <div>
          <i class="fa-solid fa-filter" style="font-size:2.2rem; color:#7c3aed; margin-bottom:0.75rem;"></i>
          <h4 style="font-weight:700; font-size:1rem; margin:0 0 0.4rem; color:var(--color-text);">Funnel Plot (Publication Bias)</h4>
          <p style="font-size:12px; color:var(--color-text-muted); margin-bottom:1rem; line-height:1.45;">Đánh giá sai lệch xuất bản, hình phễu bất đối xứng &amp; hiệu ứng cỡ mẫu nhỏ.</p>
        </div>
        <a href="#/ebm/funnel-plot" class="dsp-btn dsp-btn-primary dsp-btn-sm" style="justify-content:center; width:100%; background:#7c3aed;">Mở Funnel Plot Studio</a>
      </div>

      <div style="background:var(--color-surface); border:1px solid var(--color-border); border-radius:14px; padding:1.25rem; text-align:center; display:flex; flex-direction:column; justify-content:space-between;">
        <div>
          <i class="fa-solid fa-chart-area" style="font-size:2.2rem; color:#d97706; margin-bottom:0.75rem;"></i>
          <h4 style="font-weight:700; font-size:1rem; margin:0 0 0.4rem; color:var(--color-text);">Kaplan-Meier Survival Curve</h4>
          <p style="font-size:12px; color:var(--color-text-muted); margin-bottom:1rem; line-height:1.45;">Đường cong sống còn tích lũy theo thời gian, Log-rank test &amp; Hazard Ratio (HR).</p>
        </div>
        <a href="#/ebm/kaplan-meier" class="dsp-btn dsp-btn-primary dsp-btn-sm" style="justify-content:center; width:100%; background:#d97706;">Mở Kaplan-Meier Studio</a>
      </div>

      <div style="background:var(--color-surface); border:1px solid var(--color-border); border-radius:14px; padding:1.25rem; text-align:center; display:flex; flex-direction:column; justify-content:space-between;">
        <div>
          <i class="fa-solid fa-chart-line" style="font-size:2.2rem; color:#dc2626; margin-bottom:0.75rem;"></i>
          <h4 style="font-weight:700; font-size:1rem; margin:0 0 0.4rem; color:var(--color-text);">ROC Curve &amp; AUC Analyzer</h4>
          <p style="font-size:12px; color:var(--color-text-muted); margin-bottom:1rem; line-height:1.45;">Độ nhạy (Sensitivity), Độ đặc hiệu (Specificity) &amp; Điểm cắt tối ưu Youden J.</p>
        </div>
        <a href="#/ebm/roc-curve" class="dsp-btn dsp-btn-primary dsp-btn-sm" style="justify-content:center; width:100%; background:#dc2626;">Mở ROC Curve Studio</a>
      </div>
    </div>
  `;
}
