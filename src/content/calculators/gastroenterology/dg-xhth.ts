/**
 * CliniPortal — Gastrointestinal Bleeding (GIB) Risk Stratification Engine (TypeScript Module)
 * Upper GIB (Glasgow-Blatchford Score - GBS) & Lower GIB (Oakland Score)
 * Restrictive Red Blood Cell Transfusion Protocol & Endoscopic Triage
 */

export interface GIBCalculationResult {
  mode: string;
  score: number;
  maxScore: number;
  riskCategory: string;
  needTransfusion: boolean;
  diagTitle: string;
  diagDesc: string;
}

export class GIBAssessmentController {
  private activeMode: string = 'ugib';

  public switchLocation(mode: string): void {
    this.activeMode = mode;
    const tabUgib = document.getElementById('tab-ugib');
    const tabLgib = document.getElementById('tab-lgib');
    const panelUgib = document.getElementById('panel-ugib-features');
    const panelLgib = document.getElementById('panel-lgib-features');
    const groupBun = document.getElementById('group-bun');
    const lblScoreName = document.getElementById('lbl-score-name');

    if (tabUgib) tabUgib.classList.toggle('active', mode === 'ugib');
    if (tabLgib) tabLgib.classList.toggle('active', mode === 'lgib');

    if (panelUgib) panelUgib.style.display = mode === 'ugib' ? 'block' : 'none';
    if (panelLgib) panelLgib.style.display = mode === 'lgib' ? 'block' : 'none';
    if (groupBun) groupBun.style.display = mode === 'ugib' ? 'flex' : 'none';

    if (lblScoreName) lblScoreName.innerText = mode === 'ugib' ? 'GBS Score:' : 'Oakland Score:';
    this.calculateGIB();
  }

  public calculateGIB(): void {
    const gender = (document.getElementById('gender') as HTMLSelectElement | null)?.value || 'male';
    const age = parseInt((document.getElementById('age') as HTMLInputElement | null)?.value || '50', 10) || 50;
    const hb = parseFloat((document.getElementById('hb') as HTMLInputElement | null)?.value || '12') || 12;
    const sbp = parseInt((document.getElementById('sbp') as HTMLInputElement | null)?.value || '120', 10) || 120;
    const pulse = parseInt((document.getElementById('pulse') as HTMLInputElement | null)?.value || '80', 10) || 80;
    const bun = parseFloat((document.getElementById('bun') as HTMLInputElement | null)?.value || '5') || 5;
    const hasCAD = (document.getElementById('has-cad') as HTMLInputElement | null)?.checked || false;

    let score = 0;
    let maxScore = 23;

    if (this.activeMode === 'ugib') {
      if (bun >= 25) score += 6;
      else if (bun >= 10) score += 4;
      else if (bun >= 8) score += 3;
      else if (bun >= 6.5) score += 2;

      if (gender === 'male') {
        if (hb < 10) score += 6;
        else if (hb >= 10 && hb < 12) score += 3;
        else if (hb >= 12 && hb < 13) score += 1;
      } else {
        if (hb < 10) score += 6;
        else if (hb >= 10 && hb < 12) score += 1;
      }

      if (sbp < 90) score += 3;
      else if (sbp >= 90 && sbp <= 99) score += 2;
      else if (sbp >= 100 && sbp <= 109) score += 1;

      if (pulse >= 100) score += 1;
      if ((document.getElementById('ugib-melena') as HTMLInputElement | null)?.checked) score += 1;
      if ((document.getElementById('ugib-syncope') as HTMLInputElement | null)?.checked) score += 2;
      if ((document.getElementById('ugib-liver') as HTMLInputElement | null)?.checked) score += 2;
      if ((document.getElementById('ugib-heart') as HTMLInputElement | null)?.checked) score += 2;

      maxScore = 23;
    } else {
      if (age >= 70) score += 9;
      else if (age >= 60) score += 7;
      else if (age >= 50) score += 4;
      else if (age >= 40) score += 2;

      if (gender === 'male') score += 1;
      if ((document.getElementById('lgib-prev-adm') as HTMLInputElement | null)?.checked) score += 1;
      if ((document.getElementById('lgib-dre-blood') as HTMLInputElement | null)?.checked) score += 5;

      if (pulse >= 110) score += 5;
      else if (pulse >= 90) score += 3;
      else if (pulse >= 70) score += 1;

      if (sbp < 90) score += 5;
      else if (sbp < 120) score += 4;
      else if (sbp < 130) score += 2;

      if (hb < 7) score += 22;
      else if (hb < 9) score += 17;
      else if (hb < 11) score += 13;
      else if (hb < 13) score += 8;
      else if (hb < 15) score += 4;

      maxScore = 35;
    }

    const scoreValBadge = document.getElementById('score-val-badge');
    if (scoreValBadge) scoreValBadge.innerText = `${score} / ${maxScore}`;

    const riskBadge = document.getElementById('risk-cat-badge');
    const transBadge = document.getElementById('transfusion-badge');
    const diagTitle = document.getElementById('diag-title');
    const diagDesc = document.getElementById('diag-desc');
    const diagBox = document.getElementById('diag-box');

    const transThreshold = hasCAD ? 8.0 : 7.0;
    const needTransfusion = hb < transThreshold;

    if (transBadge) {
      if (needTransfusion) {
        transBadge.innerText = `CẦN TRUYỀN MÁU`;
        transBadge.className = 'score-badge badge-severe';
      } else {
        transBadge.innerText = `Chưa chỉ định`;
        transBadge.className = 'score-badge badge-normal';
      }
    }

    if (this.activeMode === 'ugib') {
      if (score <= 1) {
        if (riskBadge) {
          riskBadge.innerText = 'Rất Thấp (0-1)';
          riskBadge.className = 'score-badge badge-normal';
        }
        if (diagTitle) diagTitle.innerText = '🟢 Ngoại trú An toàn:';
        if (diagDesc) diagDesc.innerHTML = 'Bệnh nhân có nguy cơ rất thấp. Đủ điều kiện xuất viện an toàn & hẹn soi dạ dày ngoại trú.';
        if (diagBox) diagBox.style.borderLeftColor = 'var(--color-success, #16a34a)';
      } else if (score >= 6) {
        if (riskBadge) {
          riskBadge.innerText = 'CAO (≥ 6)';
          riskBadge.className = 'score-badge badge-severe';
        }
        if (diagTitle) diagTitle.innerText = '🚨 NGUY CƠ CAO - Cấp cứu:';
        if (diagDesc) diagDesc.innerHTML = '• Nội soi cấp cứu 12-24h.<br/>• PPI tĩnh mạch: Bolus 80mg Pantoprazole + duy trì 8mg/h (72h).<br/>• Terlipressin 2mg IV/4h hoặc Octreotide nếu nghi vỡ tĩnh mạch thực quản.';
        if (diagBox) diagBox.style.borderLeftColor = 'var(--color-rose, #e11d48)';
      } else {
        if (riskBadge) {
          riskBadge.innerText = 'Trung bình (2-5)';
          riskBadge.className = 'score-badge badge-warn';
        }
        if (diagTitle) diagTitle.innerText = '🟡 Nhập viện Nội soi:';
        if (diagDesc) diagDesc.innerHTML = 'Nhập viện theo dõi sinh hiệu, thử lại Hb & làm Nội soi tiêu hóa trên trong 24h.';
        if (diagBox) diagBox.style.borderLeftColor = 'var(--color-amber, #d97706)';
      }
    } else {
      if (score <= 8) {
        if (riskBadge) {
          riskBadge.innerText = 'An toàn (≤ 8)';
          riskBadge.className = 'score-badge badge-normal';
        }
        if (diagTitle) diagTitle.innerText = '🟢 Theo dõi Ngoại trú:';
        if (diagDesc) diagDesc.innerHTML = 'Xác suất tự cầm cao (≥ 95%). Đủ điều kiện theo dõi ngoại trú & hẹn soi đại tràng chương trình.';
        if (diagBox) diagBox.style.borderLeftColor = 'var(--color-success, #16a34a)';
      } else {
        if (riskBadge) {
          riskBadge.innerText = 'Nguy cơ Cao (> 8)';
          riskBadge.className = 'score-badge badge-severe';
        }
        if (diagTitle) diagTitle.innerText = '🚨 Cần Nhập viện Can thiệp:';
        if (diagDesc) diagDesc.innerHTML = 'Nguy cơ cao cần truyền máu/nội soi cầm máu. Nhập viện làm sạch ruột soi đại tràng cấp cứu.';
        if (diagBox) diagBox.style.borderLeftColor = 'var(--color-rose, #e11d48)';
      }
    }
  }

  public resetForm(): void {
    const setVal = (id: string, val: string) => {
      const el = document.getElementById(id) as HTMLInputElement | HTMLSelectElement | null;
      if (el) el.value = val;
    };
    const setChk = (id: string, checked: boolean) => {
      const el = document.getElementById(id) as HTMLInputElement | null;
      if (el) el.checked = checked;
    };

    setVal('gender', 'male');
    setVal('age', '55');
    setVal('hb', '9.5');
    setVal('sbp', '105');
    setVal('pulse', '95');
    setVal('bun', '8.5');

    setChk('has-cad', false);
    setChk('ugib-melena', false);
    setChk('ugib-syncope', false);
    setChk('ugib-liver', false);
    setChk('ugib-heart', false);
    setChk('lgib-prev-adm', false);
    setChk('lgib-dre-blood', false);

    this.calculateGIB();
  }

  public init(): void {
    document.querySelectorAll('input, select').forEach(el => {
      el.addEventListener('input', () => this.calculateGIB());
      el.addEventListener('change', () => this.calculateGIB());
    });

    const btnReset = document.querySelector('.reset-btn');
    if (btnReset) {
      btnReset.addEventListener('click', () => this.resetForm());
    }

    const tabUgib = document.getElementById('tab-ugib');
    const tabLgib = document.getElementById('tab-lgib');

    if (tabUgib) tabUgib.addEventListener('click', () => this.switchLocation('ugib'));
    if (tabLgib) tabLgib.addEventListener('click', () => this.switchLocation('lgib'));

    this.calculateGIB();
  }
}

export const gibAssessment = new GIBAssessmentController();

if (typeof window !== 'undefined') {
  const win = window as any;
  win.gibAssessment = gibAssessment;
  win.switchLocation = (mode: string) => gibAssessment.switchLocation(mode);
  win.calculateGIB = () => gibAssessment.calculateGIB();
  win.resetForm = () => gibAssessment.resetForm();
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => gibAssessment.init());
  } else {
    gibAssessment.init();
  }
}
