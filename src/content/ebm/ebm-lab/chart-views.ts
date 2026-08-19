/**
 * CliniPortal — EBM Statistical Charts SPA Views (TypeScript)
 * Path: src/content/ebm/ebm-lab/chart-views.ts
 * 
 * Fully responsive & Dark Mode compliant visualizers for EBM Practice Lab
 */

export function renderForestPlotView(): string {
  return `
    <div class="forest-plot-container animate-fade-in" style="max-width: 1400px; margin: 0 auto; padding: 1.5rem 1rem;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <div style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); margin-bottom: 0.25rem;">
            <a href="#/ebm" style="color: var(--color-primary, #0284c7); text-decoration: none;"><i class="fa-solid fa-chevron-left"></i> EBM</a> / 
            <a href="#/ebm/ebm-lab" style="color: var(--color-primary, #0284c7); text-decoration: none;">EBM Practice Lab</a> / Forest Plot Visualizer
          </div>
          <h1 style="font-size: 1.85rem; font-weight: 800; color: #0284c7; margin: 0; display: flex; align-items: center; gap: 0.75rem;">
            <i class="fa-solid fa-tree"></i> Interactive Forest Plot Studio (Meta-Analysis Engine)
          </h1>
        </div>
        
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <a href="#/ebm/ebm-lab" class="btn btn-outline" style="padding: 0.5rem 1rem; border-radius: 8px; border: 1px solid var(--color-border, #e2e8f0); color: var(--color-text, #334155); text-decoration: none; font-size: 0.875rem; font-weight: 600;">
            <i class="fa-solid fa-arrow-left"></i> EBM Lab Hub
          </a>
        </div>
      </div>

      <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem;">
        <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--color-text, #0f172a); margin-bottom: 0.75rem;">Biểu đồ Forest Plot Trực Quan Hóa Tác Động Gộp (Pooled Effect)</h3>
        <p style="font-size: 0.9rem; color: var(--color-text-muted, #64748b); margin-bottom: 1rem;">
          Biểu thị các nghiên cứu đơn lẻ bằng hình vuông (kích thước tỉ lệ với trọng số weight) và khoảng tin cậy 95% CI (đoạn thẳng ngang). Kết quả gộp tổng thể được biểu diễn bằng hình quả trám (Diamond).
        </p>

        <!-- SVG Container with horizontal touch scrolling on mobile -->
        <div id="forest-plot-svg-box" style="width: 100%; min-height: 400px; background: var(--color-surface-2, #f8fafc); border: 1px solid var(--color-border, #e2e8f0); border-radius: 8px; overflow-x: auto; -webkit-overflow-scrolling: touch; padding: 1rem; display: flex; justify-content: center; align-items: center;">
          <svg viewBox="0 0 900 400" style="width: 100%; min-width: 600px; max-width: 900px; height: auto;">
            <!-- Grid Lines -->
            <line x1="450" y1="40" x2="450" y2="340" stroke="#dc2626" stroke-width="2" stroke-dasharray="4,4" />
            <text x="450" y="30" text-anchor="middle" font-size="12" fill="#dc2626" font-weight="bold">Đường vô hiệu (Null Line = 1.0)</text>

            <!-- Study 1 -->
            <text x="50" y="80" font-size="13" font-weight="600" fill="var(--color-text, #334155)">EMPA-REG OUTCOME (2015)</text>
            <line x1="320" y1="75" x2="460" y2="75" stroke="#0284c7" stroke-width="2" />
            <rect x="380" y="68" width="14" height="14" fill="#0284c7" />
            <text x="750" y="80" font-size="12" fill="var(--color-text-muted, #64748b)">0.86 [0.74, 0.99] (28.4%)</text>

            <!-- Study 2 -->
            <text x="50" y="130" font-size="13" font-weight="600" fill="var(--color-text, #334155)">CANVAS Program (2017)</text>
            <line x1="340" y1="125" x2="470" y2="125" stroke="#0284c7" stroke-width="2" />
            <rect x="395" y="118" width="16" height="16" fill="#0284c7" />
            <text x="750" y="130" font-size="12" fill="var(--color-text-muted, #64748b)">0.86 [0.75, 0.97] (31.2%)</text>

            <!-- Study 3 -->
            <text x="50" y="180" font-size="13" font-weight="600" fill="var(--color-text, #334155)">DECLARE-TIMI 58 (2019)</text>
            <line x1="380" y1="175" x2="495" y2="175" stroke="#0284c7" stroke-width="2" />
            <rect x="425" y="167" width="18" height="18" fill="#0284c7" />
            <text x="750" y="180" font-size="12" fill="var(--color-text-muted, #64748b)">0.93 [0.84, 1.03] (40.4%)</text>

            <!-- Divider -->
            <line x1="50" y1="230" x2="850" y2="230" stroke="var(--color-border, #cbd5e1)" stroke-width="1.5" />

            <!-- Diamond Pooled Result -->
            <text x="50" y="270" font-size="14" font-weight="bold" fill="#059669">Tổng Gộp (Fixed Effects Model)</text>
            <polygon points="405,265 375,275 405,285 435,275" fill="#059669" opacity="0.85" />
            <text x="750" y="275" font-size="13" font-weight="bold" fill="#059669">0.89 [0.83, 0.96] (100.0%)</text>

            <!-- Bottom Labels -->
            <text x="250" y="375" text-anchor="middle" font-size="12" fill="#059669" font-weight="600">← Ưu thế Can Thiệp (Favors Intervention)</text>
            <text x="650" y="375" text-anchor="middle" font-size="12" fill="#dc2626" font-weight="600">Ưu thế Nhóm Chứng (Favors Control) →</text>
          </svg>
        </div>
      </div>
    </div>
  `;
}

export function renderFunnelPlotView(): string {
  return `
    <div class="funnel-plot-container animate-fade-in" style="max-width: 1400px; margin: 0 auto; padding: 1.5rem 1rem;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <div style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); margin-bottom: 0.25rem;">
            <a href="#/ebm" style="color: var(--color-primary, #0284c7); text-decoration: none;"><i class="fa-solid fa-chevron-left"></i> EBM</a> / 
            <a href="#/ebm/ebm-lab" style="color: var(--color-primary, #0284c7); text-decoration: none;">EBM Practice Lab</a> / Funnel Plot
          </div>
          <h1 style="font-size: 1.85rem; font-weight: 800; color: #7c3aed; margin: 0; display: flex; align-items: center; gap: 0.75rem;">
            <i class="fa-solid fa-filter"></i> Funnel Plot — Đánh Giá Sai Lệch Xuất Bản (Publication Bias)
          </h1>
        </div>
        
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <a href="#/ebm/ebm-lab" class="btn btn-outline" style="padding: 0.5rem 1rem; border-radius: 8px; border: 1px solid var(--color-border, #e2e8f0); color: var(--color-text, #334155); text-decoration: none; font-size: 0.875rem; font-weight: 600;">
            <i class="fa-solid fa-arrow-left"></i> EBM Lab Hub
          </a>
        </div>
      </div>

      <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.5rem;">
        <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--color-text, #0f172a); margin-bottom: 0.75rem;">Biểu đồ Funnel Plot (Egger / Begg's Test)</h3>
        <p style="font-size: 0.9rem; color: var(--color-text-muted, #64748b); margin-bottom: 1.5rem;">
          Biểu diễn độ chính xác (1/Standard Error) theo độ lớn hiệu ứng. Nếu biểu đồ cân đối hình phễu đối xứng quanh đường trung bình gộp, nguy cơ sai lệch xuất bản (Publication Bias) là thấp.
        </p>

        <div style="width: 100%; min-height: 400px; background: var(--color-surface-2, #f8fafc); border: 1px solid var(--color-border, #e2e8f0); border-radius: 8px; overflow-x: auto; -webkit-overflow-scrolling: touch; display: flex; justify-content: center; align-items: center; padding: 1rem;">
          <svg viewBox="0 0 800 400" style="width: 100%; min-width: 550px; max-width: 800px; height: auto;">
            <!-- Funnel triangle -->
            <polygon points="400,30 150,350 650,350" fill="none" stroke="#7c3aed" stroke-width="2" stroke-dasharray="5,5" opacity="0.6" />
            <!-- Center Line -->
            <line x1="400" y1="30" x2="400" y2="350" stroke="#7c3aed" stroke-width="2" />

            <!-- Points (Studies) -->
            <circle cx="405" cy="80" r="6" fill="#7c3aed" />
            <circle cx="390" cy="120" r="5" fill="#7c3aed" />
            <circle cx="420" cy="150" r="5" fill="#7c3aed" />
            <circle cx="360" cy="220" r="5" fill="#7c3aed" />
            <circle cx="440" cy="230" r="5" fill="#7c3aed" />
            <circle cx="320" cy="300" r="5" fill="#7c3aed" />
            <circle cx="480" cy="310" r="5" fill="#7c3aed" />

            <text x="400" y="380" text-anchor="middle" font-size="12" fill="var(--color-text, #334155)" font-weight="bold">Log Odds Ratio (Hiệu quả điều trị)</text>
            <text x="20" y="200" font-size="12" fill="var(--color-text, #334155)" font-weight="bold" transform="rotate(-90 20,200)">Standard Error (Cỡ mẫu nhỏ → Lớn)</text>
          </svg>
        </div>
      </div>
    </div>
  `;
}

export function renderKaplanMeierView(): string {
  return `
    <div class="km-container animate-fade-in" style="max-width: 1400px; margin: 0 auto; padding: 1.5rem 1rem;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <div style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); margin-bottom: 0.25rem;">
            <a href="#/ebm" style="color: var(--color-primary, #0284c7); text-decoration: none;"><i class="fa-solid fa-chevron-left"></i> EBM</a> / 
            <a href="#/ebm/ebm-lab" style="color: var(--color-primary, #0284c7); text-decoration: none;">EBM Practice Lab</a> / Kaplan-Meier
          </div>
          <h1 style="font-size: 1.85rem; font-weight: 800; color: #ca8a04; margin: 0; display: flex; align-items: center; gap: 0.75rem;">
            <i class="fa-solid fa-chart-area"></i> Kaplan-Meier Survival Curve & Hazard Ratio
          </h1>
        </div>
        
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <a href="#/ebm/ebm-lab" class="btn btn-outline" style="padding: 0.5rem 1rem; border-radius: 8px; border: 1px solid var(--color-border, #e2e8f0); color: var(--color-text, #334155); text-decoration: none; font-size: 0.875rem; font-weight: 600;">
            <i class="fa-solid fa-arrow-left"></i> EBM Lab Hub
          </a>
        </div>
      </div>

      <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.5rem;">
        <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--color-text, #0f172a); margin-bottom: 0.75rem;">Đường Cong Sống Còn Tích Lũy (Cumulative Survival Rate)</h3>
        <p style="font-size: 0.9rem; color: var(--color-text-muted, #64748b); margin-bottom: 1.5rem;">
          Đánh giá thời gian đến khi xảy ra biến cố (Time-to-Event Analysis), kiểm định Log-rank và mô hình hồi quy rủi ro tỷ lệ Cox Proportional Hazards.
        </p>

        <div style="width: 100%; min-height: 400px; background: var(--color-surface-2, #f8fafc); border: 1px solid var(--color-border, #e2e8f0); border-radius: 8px; overflow-x: auto; -webkit-overflow-scrolling: touch; display: flex; justify-content: center; align-items: center; padding: 1rem;">
          <svg viewBox="0 0 800 400" style="width: 100%; min-width: 550px; max-width: 800px; height: auto;">
            <!-- Axes -->
            <line x1="80" y1="340" x2="750" y2="340" stroke="var(--color-border, #94a3b8)" stroke-width="2" />
            <line x1="80" y1="40" x2="80" y2="340" stroke="var(--color-border, #94a3b8)" stroke-width="2" />

            <!-- Intervention Curve (Green) -->
            <path d="M 80,60 L 200,70 L 320,95 L 440,115 L 560,140 L 680,165" fill="none" stroke="#059669" stroke-width="3" />
            <text x="700" y="170" font-size="12" fill="#059669" font-weight="bold">Can thiệp (HR = 0.72)</text>

            <!-- Control Curve (Red) -->
            <path d="M 80,60 L 180,85 L 280,125 L 400,180 L 520,230 L 640,285" fill="none" stroke="#dc2626" stroke-width="3" />
            <text x="660" y="290" font-size="12" fill="#dc2626" font-weight="bold">Chứng / Placebo</text>

            <text x="400" y="380" text-anchor="middle" font-size="12" fill="var(--color-text, #334155)" font-weight="bold">Thời gian theo dõi (Tháng)</text>
            <text x="20" y="190" font-size="12" fill="var(--color-text, #334155)" font-weight="bold" transform="rotate(-90 20,190)">Tỷ lệ sống còn (%)</text>
          </svg>
        </div>
      </div>
    </div>
  `;
}

export function renderRocCurveView(): string {
  return `
    <div class="roc-container animate-fade-in" style="max-width: 1400px; margin: 0 auto; padding: 1.5rem 1rem;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <div style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); margin-bottom: 0.25rem;">
            <a href="#/ebm" style="color: var(--color-primary, #0284c7); text-decoration: none;"><i class="fa-solid fa-chevron-left"></i> EBM</a> / 
            <a href="#/ebm/ebm-lab" style="color: var(--color-primary, #0284c7); text-decoration: none;">EBM Practice Lab</a> / ROC Curve
          </div>
          <h1 style="font-size: 1.85rem; font-weight: 800; color: #dc2626; margin: 0; display: flex; align-items: center; gap: 0.75rem;">
            <i class="fa-solid fa-chart-line"></i> ROC Curve & AUC Diagnostic Performance
          </h1>
        </div>
        
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <a href="#/ebm/ebm-lab" class="btn btn-outline" style="padding: 0.5rem 1rem; border-radius: 8px; border: 1px solid var(--color-border, #e2e8f0); color: var(--color-text, #334155); text-decoration: none; font-size: 0.875rem; font-weight: 600;">
            <i class="fa-solid fa-arrow-left"></i> EBM Lab Hub
          </a>
        </div>
      </div>

      <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.5rem;">
        <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--color-text, #0f172a); margin-bottom: 0.75rem;">Đường Đặc Tính Hoạt Động Của Người Quan Sát (ROC)</h3>
        <p style="font-size: 0.9rem; color: var(--color-text-muted, #64748b); margin-bottom: 1.5rem;">
          Đánh giá giá trị chẩn đoán của xét nghiệm/thang điểm qua diện tích dưới đường cong (Area Under Curve — AUC) và chỉ số Youden Index (J = Sensitivity + Specificity - 1).
        </p>

        <div style="width: 100%; min-height: 400px; background: var(--color-surface-2, #f8fafc); border: 1px solid var(--color-border, #e2e8f0); border-radius: 8px; overflow-x: auto; -webkit-overflow-scrolling: touch; display: flex; justify-content: center; align-items: center; padding: 1rem;">
          <svg viewBox="0 0 800 400" style="width: 100%; min-width: 550px; max-width: 800px; height: auto;">
            <!-- Axes -->
            <line x1="100" y1="340" x2="650" y2="340" stroke="var(--color-border, #94a3b8)" stroke-width="2" />
            <line x1="100" y1="40" x2="100" y2="340" stroke="var(--color-border, #94a3b8)" stroke-width="2" />

            <!-- Diagonal Reference (AUC = 0.5) -->
            <line x1="100" y1="340" x2="650" y2="40" stroke="var(--color-border, #94a3b8)" stroke-width="1.5" stroke-dasharray="4,4" />
            <text x="500" y="200" font-size="12" fill="var(--color-text-muted, #94a3b8)">Đường tham chiếu (AUC = 0.50)</text>

            <!-- ROC Curve (AUC = 0.88) -->
            <path d="M 100,340 C 120,120 220,60 650,40" fill="rgba(220,38,38,0.1)" stroke="#dc2626" stroke-width="3" />
            <text x="250" y="100" font-size="14" fill="#dc2626" font-weight="bold">AUC = 0.88 (Tuyệt vời)</text>

            <text x="375" y="380" text-anchor="middle" font-size="12" fill="var(--color-text, #334155)" font-weight="bold">1 - Specificity (Tỷ lệ Dương Tính Giả)</text>
            <text x="30" y="190" font-size="12" fill="var(--color-text, #334155)" font-weight="bold" transform="rotate(-90 30,190)">Sensitivity (Độ nhạy)</text>
          </svg>
        </div>
      </div>
    </div>
  `;
}
