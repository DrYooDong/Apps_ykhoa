/**
 * CliniPortal — Venous Thromboembolism (VTE) Diagnostic Engine (TypeScript Module)
 * Wells Criteria for DVT (Deep Vein Thrombosis) & PE (Pulmonary Embolism)
 * Age-adjusted D-Dimer Cutoffs, Compression Ultrasound & CTPA Imaging Protocols
 */

export interface VTEEvaluationResult {
  tab: string;
  score: number;
  probabilityText: string;
  probabilityClass: string;
  diagTitle: string;
  diagDesc: string;
}

export class VTEAssessmentController {
  private activeTab: string = 'dvt';

  public switchTab(tab: string): void {
    this.activeTab = tab;
    const tabDvt = document.getElementById('tab-dvt');
    const tabPe = document.getElementById('tab-pe');
    const panelDvt = document.getElementById('panel-dvt');
    const panelPe = document.getElementById('panel-pe');
    const scoreNameLbl = document.getElementById('score-name-lbl');

    if (tabDvt) tabDvt.classList.toggle('active', tab === 'dvt');
    if (tabPe) tabPe.classList.toggle('active', tab === 'pe');

    if (panelDvt) panelDvt.style.display = tab === 'dvt' ? 'block' : 'none';
    if (panelPe) panelPe.style.display = tab === 'pe' ? 'block' : 'none';

    if (scoreNameLbl) {
      scoreNameLbl.innerText = tab === 'dvt' ? 'Wells DVT Score:' : 'Wells PE Score:';
    }
    this.calculateVTE();
  }

  public calculateVTE(): void {
    let score = 0;

    if (this.activeTab === 'dvt') {
      document.querySelectorAll('.chk-dvt:checked').forEach(cb => {
        score += parseFloat(cb.getAttribute('data-score') || '0');
      });

      const scoreBadge = document.getElementById('vte-score-badge');
      if (scoreBadge) scoreBadge.innerText = `${score} điểm`;

      const probBadge = document.getElementById('vte-prob-badge');
      const diagTitle = document.getElementById('diag-title');
      const diagDesc = document.getElementById('diag-desc');
      const diagBox = document.getElementById('diag-box');

      if (score <= 0) {
        if (probBadge) {
          probBadge.innerText = 'THẤP (≤5%)';
          probBadge.className = 'score-badge badge-normal';
        }
        if (diagTitle) diagTitle.innerText = '🟢 Xác suất Thấp (Low Prob):';
        if (diagDesc) {
          diagDesc.innerHTML =
            'Chỉ định <strong>D-Dimer định lượng</strong>. Nếu D-Dimer âm tính (&lt; 500 ng/mL) → <strong>LOẠI TRỪ DVT</strong> an toàn. Nếu dương tính → Siêu âm Doppler.';
        }
        if (diagBox) diagBox.style.borderLeftColor = 'var(--color-success, #16a34a)';
      } else if (score === 1 || score === 2) {
        if (probBadge) {
          probBadge.innerText = 'TRUNG BÌNH (17%)';
          probBadge.className = 'score-badge badge-warn';
        }
        if (diagTitle) diagTitle.innerText = '🟡 Xác suất Trung bình (Mod Prob):';
        if (diagDesc) {
          diagDesc.innerHTML =
            'Làm <strong>D-Dimer định lượng</strong> hoặc Siêu âm Doppler. D-Dimer âm tính → Loại trừ DVT. D-Dimer dương tính → Siêu âm ngay.';
        }
        if (diagBox) diagBox.style.borderLeftColor = 'var(--color-amber, #d97706)';
      } else {
        if (probBadge) {
          probBadge.innerText = 'CAO (≥53%)';
          probBadge.className = 'score-badge badge-severe';
        }
        if (diagTitle) diagTitle.innerText = '🚨 Xác suất CAO (High Prob):';
        if (diagDesc) {
          diagDesc.innerHTML =
            'Chỉ định <strong>SIÊU ÂM DOPPLER TĨNH MẠCH CẮNG ĐÙI KHẨN</strong>. Nếu siêu âm dương tính: Khởi động kháng đông ngay (LMWH/DOACs).';
        }
        if (diagBox) diagBox.style.borderLeftColor = 'var(--color-rose, #e11d48)';
      }
    } else {
      document.querySelectorAll('.chk-pe:checked').forEach(cb => {
        score += parseFloat(cb.getAttribute('data-score') || '0');
      });

      const scoreBadge = document.getElementById('vte-score-badge');
      if (scoreBadge) scoreBadge.innerText = `${score.toFixed(1)} điểm`;

      const probBadge = document.getElementById('vte-prob-badge');
      const diagTitle = document.getElementById('diag-title');
      const diagDesc = document.getElementById('diag-desc');
      const diagBox = document.getElementById('diag-box');

      if (score <= 4.0) {
        if (probBadge) {
          probBadge.innerText = 'Ít khả năng PE (≤4)';
          probBadge.className = 'score-badge badge-normal';
        }
        if (diagTitle) diagTitle.innerText = '🟢 PE Không khả năng (PE Unlikely):';
        if (diagDesc) {
          diagDesc.innerHTML =
            'Làm <strong>D-Dimer định lượng High-sensitivity</strong>. D-Dimer âm tính (theo tuổi: Tuổi x 10 với tuổi &gt;50) → LOẠI TRỪ PE. Nếu dương tính → Chụp CTPA.';
        }
        if (diagBox) diagBox.style.borderLeftColor = 'var(--color-success, #16a34a)';
      } else {
        if (probBadge) {
          probBadge.innerText = 'Nhiều khả năng PE (>4)';
          probBadge.className = 'score-badge badge-severe';
        }
        if (diagTitle) diagTitle.innerText = '🚨 PE Rất khả năng (PE Likely):';
        if (diagDesc) {
          diagDesc.innerHTML =
            '<strong>CHỤP CT CẮT LỚP VI TÍNH ĐỘNG MẠCH PHỔI (CTPA) KHẨN CẤP</strong>. Cân nhắc tiêm LMWH Enoxaparin 1mg/kg x 2 lần/ngày trong lúc chờ CTPA.';
        }
        if (diagBox) diagBox.style.borderLeftColor = 'var(--color-rose, #e11d48)';
      }
    }
  }

  public resetForm(): void {
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => ((cb as HTMLInputElement).checked = false));
    this.calculateVTE();
  }

  public init(): void {
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
      cb.addEventListener('change', () => this.calculateVTE());
    });

    const btnReset = document.querySelector('.reset-btn');
    if (btnReset) {
      btnReset.addEventListener('click', () => this.resetForm());
    }

    const tabDvt = document.getElementById('tab-dvt');
    const tabPe = document.getElementById('tab-pe');

    if (tabDvt) tabDvt.addEventListener('click', () => this.switchTab('dvt'));
    if (tabPe) tabPe.addEventListener('click', () => this.switchTab('pe'));

    this.calculateVTE();
  }
}

export const vteAssessment = new VTEAssessmentController();

if (typeof window !== 'undefined') {
  const win = window as any;
  win.vteAssessment = vteAssessment;
  win.switchTab = (tab: string) => vteAssessment.switchTab(tab);
  win.calculateVTE = () => vteAssessment.calculateVTE();
  win.resetForm = () => vteAssessment.resetForm();
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => vteAssessment.init());
  } else {
    vteAssessment.init();
  }
}
