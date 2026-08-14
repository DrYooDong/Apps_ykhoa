/**
 * Bedside EBM Copilot & Ultra-Concise Evidence Snippet Engine
 * Path: src/content/ebm/js/ebm-bedside-copilot.ts
 * Phân hệ Y học chứng cứ (EBM) | CliniPortal
 */

export interface BedsideStudyItem {
  category: string;
  name: string;
  val: number;
  low: number;
  high: number;
  weight: number;
  pmid?: string;
}

export interface BedsideEvidenceItem {
  id: string;
  category: string;
  categoryLabel: string;
  title: string;
  topic: string;
  verdict: 'yes' | 'no' | 'unclear';
  verdictText: string;
  pico: {
    p: string;
    i: string;
    c: string;
    o: string;
  };
  formats: {
    compact: string;
    order: string;
    dx: string;
  };
  studies: BedsideStudyItem[];
  metric: string;
  pooled: {
    val: number;
    low: number;
    high: number;
    i2: string;
  };
}

export const BEDSIDE_EVIDENCE_VAULT: BedsideEvidenceItem[] = [
  {
    id: 'ards-steroid',
    category: 'icu',
    categoryLabel: 'Hồi sức & Cấp cứu',
    title: 'Dexamethasone trong ARDS do COVID-19 / Thở oxy',
    topic: 'Hô hấp & Cấp cứu',
    verdict: 'yes',
    verdictText: 'Có hiệu lực (Yes)',
    pico: {
      p: 'Bệnh nhân ARDS / COVID-19 cần thở oxy hoặc thở máy',
      i: 'Dexamethasone 6mg/ngày x 10 ngày',
      c: 'Điều trị chuẩn (Standard of Care)',
      o: 'Tử vong 28 ngày'
    },
    formats: {
      compact: '[EBM] Dexamethasone 6mg/d x10d (RECOVERY 2021: RR 0.82 [0.72-0.94] | PMID: 32678530)',
      order: '✓ Dexamethasone 6mg tiêm TM 1 lần/ngày x 10 ngày (Mức IA - RECOVERY 2021 | PMID: 32678530)',
      dx: '[EBM-Dx] Berlin ARDS Definition: PaO2/FiO2 ≤ 300 với PEEP ≥ 5 (Mortality RR 0.82 | PMID: 32678530)'
    },
    studies: [
      { category: "primary", name: "RECOVERY Trial (2021)", val: 0.82, low: 0.72, high: 0.94, weight: 45.0, pmid: "32678530" },
      { category: "primary", name: "CoDEX Trial (2020)", val: 0.76, low: 0.58, high: 0.99, weight: 25.0, pmid: "32876973" },
      { category: "primary", name: "CAPE COVID (2020)", val: 0.71, low: 0.49, high: 1.03, weight: 30.0, pmid: "32876974" }
    ],
    metric: "RR",
    pooled: { val: 0.78, low: 0.70, high: 0.87, i2: "0%" }
  },
  {
    id: 'hfpef-sglt2i',
    category: 'cardio',
    categoryLabel: 'Tim mạch',
    title: 'Empagliflozin trong Suy tim phân suất tống máu bảo tồn (HFpEF)',
    topic: 'Tim mạch can thiệp',
    verdict: 'yes',
    verdictText: 'Có hiệu lực (Yes)',
    pico: {
      p: 'Bệnh nhân Suy tim có EF > 40% (HFmrEF / HFpEF)',
      i: 'Empagliflozin 10mg/ngày',
      c: 'Placebo + Điều trị nền',
      o: 'Tử vong Tim mạch hoặc Nhập viện vì Suy tim'
    },
    formats: {
      compact: '[EBM] Empagliflozin 10mg/d (EMPEROR-Preserved 2021: HR 0.79 [0.69-0.90], p<0.001 | PMID: 34449189)',
      order: '✓ Empagliflozin (Jardiance) 10mg uống 1 viên/ngày (Mức IA - EMPEROR-Preserved | PMID: 34449189)',
      dx: '[EBM-Dx] HFpEF HFA-PEFF score ≥ 5 (ESC 2023: Khuyến cáo nhóm I SGLT2i | PMID: 34449189)'
    },
    studies: [
      { category: "primary", name: "EMPEROR-Preserved (2021)", val: 0.79, low: 0.69, high: 0.90, weight: 52.0, pmid: "34449189" },
      { category: "primary", name: "DELIVER Trial (2022)", val: 0.82, low: 0.73, high: 0.92, weight: 48.0, pmid: "36027312" }
    ],
    metric: "HR",
    pooled: { val: 0.80, low: 0.73, high: 0.88, i2: "0%" }
  },
  {
    id: 'afib-doac',
    category: 'cardio',
    categoryLabel: 'Tim mạch',
    title: 'Kháng đông DOACs vs Warfarin trong Rung nhĩ không do bệnh van tim',
    topic: 'Tim mạch & Đột quỵ',
    verdict: 'yes',
    verdictText: 'Có hiệu lực (Yes)',
    pico: {
      p: 'Rung nhĩ không do bệnh van tim có CHA2DS2-VASc ≥ 2 (nam) hoặc ≥ 3 (nữ)',
      i: 'Thuốc kháng đông đường uống thế hệ mới (DOACs: Apixaban, Rivaroxaban, Dabigatran)',
      c: 'Warfarin (Target INR 2.0-3.0)',
      o: 'Đột quỵ / Tắc mạch hệ thống & Xuất huyết nội sọ'
    },
    formats: {
      compact: '[EBM] DOACs vs Warfarin (Meta-analysis Lancet: RR 0.81 [0.73-0.91], Giảm XH não 52% | PMID: 24315148)',
      order: '✓ DOACs (Apixaban 5mg x2/d hoặc Rivaroxaban 20mg/d) ưu tiên hơn Warfarin (Mức IA - ESC/AHA | PMID: 24315148)',
      dx: '[EBM-Dx] CHA2DS2-VASc ≥ 2đ ở nam / ≥ 3đ ở nữ: Chỉ định kháng đông DOAC (Mức IA | PMID: 24315148)'
    },
    studies: [
      { category: "primary", name: "ARISTOTLE (Apixaban)", val: 0.79, low: 0.66, high: 0.95, weight: 30.0, pmid: "21870978" },
      { category: "primary", name: "RE-LY (Dabigatran 150mg)", val: 0.66, low: 0.53, high: 0.82, weight: 28.0, pmid: "19717844" },
      { category: "primary", name: "ROCKET-AF (Rivaroxaban)", val: 0.79, low: 0.66, high: 0.96, weight: 24.0, pmid: "21830957" },
      { category: "primary", name: "ENGAGE AF (Edoxaban 60mg)", val: 0.79, low: 0.63, high: 0.99, weight: 18.0, pmid: "24251361" }
    ],
    metric: "RR",
    pooled: { val: 0.75, low: 0.68, high: 0.83, i2: "8%" }
  }
];

export class CliniBedsideCopilot {
  public static copySnippet(text: string, toastMessage = 'Đã chép Snippet EBM vào Bệnh án!'): void {
    navigator.clipboard?.writeText(text).then(() => {
      let toast = document.getElementById('copilot-toast');
      if (!toast) {
        toast = document.createElement('div');
        toast.id = 'copilot-toast';
        toast.style.cssText = `
          position: fixed;
          bottom: 24px;
          right: 24px;
          background: #0f172a;
          color: #fff;
          padding: 10px 18px;
          border-radius: 8px;
          font-size: 0.85rem;
          font-weight: 600;
          z-index: 10000;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          transition: opacity 0.3s;
        `;
        document.body.appendChild(toast);
      }
      toast.textContent = toastMessage;
      toast.style.display = 'block';
      setTimeout(() => { if (toast) toast.style.display = 'none'; }, 2500);
    });
  }

  public static init(): void {
    document.querySelectorAll('.btn-copy-ebm-snippet').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const text = (btn as HTMLElement).dataset.snippet || '';
        if (text) this.copySnippet(text);
      });
    });
  }
}

if (typeof window !== 'undefined') {
  (window as any).CliniBedsideCopilot = CliniBedsideCopilot;
  (window as any).BEDSIDE_EVIDENCE_VAULT = BEDSIDE_EVIDENCE_VAULT;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => CliniBedsideCopilot.init());
  } else {
    CliniBedsideCopilot.init();
  }
}
