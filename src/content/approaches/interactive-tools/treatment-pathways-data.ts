/**
 * CliniPortal — Treatment Pathways Interactive Demo Data & Initializer (TypeScript Module)
 */

export interface PathwayNode {
  name: string;
  category?: string;
  dose?: string;
  details?: string;
  value?: number;
  color?: string;
  children?: PathwayNode[];
}

export interface PathwayData {
  title: string;
  subtitle: string;
  root: PathwayNode;
}

// Dữ liệu Phác đồ 1: Đái tháo đường Týp 2 (ADA 2024)
export const DIABETES_PATHWAY_DATA: PathwayData = {
  title: "Hành trình Điều trị Đái tháo đường Týp 2 (ADA 2024)",
  subtitle: "Phân nhánh theo yếu tố nguy cơ tim mạch & mục tiêu kiểm soát glucose",
  root: {
    name: "ĐTĐ Týp 2",
    color: "var(--color-primary, #0284c7)",
    children: [
      {
        name: "Bệnh tim mạch do xơ vữa (ASCVD)",
        category: "Nguy cơ Rất cao",
        value: 40,
        color: "var(--color-danger, #ef4444)",
        children: [
          {
            name: "GLP-1 RA (Liraglutide / Dulaglutide)",
            category: "Thuốc Hàng 1 (1st Line)",
            dose: "Liraglutide khởi đầu 0.6mg/ngày tiêm dưới da, tăng dần lên 1.2 - 1.8mg/ngày",
            details: "Ưu tiên hàng đầu cho bệnh nhân có tiền sử NMCT, Đột quỵ hoặc bệnh mạch máu ngoại biên. Giảm tỷ lệ tử vong do tim mạch.",
            value: 24,
            color: "#f87171"
          },
          {
            name: "SGLT2i (Empagliflozin / Dapagliflozin)",
            category: "Thuốc Hàng 1 (1st Line)",
            dose: "Empagliflozin 10mg/ngày uống sáng",
            details: "Giảm nguy cơ nhập viện do suy tim và làm chậm tiến triển bệnh thận mạn.",
            value: 16,
            color: "#fb923c"
          }
        ]
      },
      {
        name: "Suy tim (HF) / Suy thận mạn (CKD)",
        category: "Tổn thương Cơ quan đích",
        value: 30,
        color: "var(--color-warning, #f59e0b)",
        children: [
          {
            name: "SGLT2i (Dapagliflozin / Empagliflozin)",
            category: "Thuốc Hàng 1 (1st Line)",
            dose: "Dapagliflozin 10mg/ngày",
            details: "Khuyến cáo mức IA cho bệnh nhân ĐTĐ kèm Phân suất tống máu EF giảm hoặc eGFR 20-60 mL/min.",
            value: 30,
            color: "#facc15"
          }
        ]
      },
      {
        name: "Không kèm Nguy cơ Tim mạch cao",
        category: "Đơn trị liệu / Phối hợp ban đầu",
        value: 30,
        color: "var(--color-success, #10b981)",
        children: [
          {
            name: "Metformin + Thay đổi Lối sống",
            category: "Nền tảng",
            dose: "500mg uống sau ăn, tăng dần lên tối đa 2000mg/ngày",
            details: "Chi phí thấp, an toàn, không gây hạ đường huyết đơn trị liệu.",
            value: 20,
            color: "#34d399"
          },
          {
            name: "Phối hợp sớm DPP-4i / Thiazolidinedione",
            category: "Thuốc Hàng 2 (2nd Line)",
            dose: "Sitagliptin 100mg/ngày",
            details: "Thêm vào khi HbA1c > 1.5% so với mục tiêu sau 3 tháng Metformin.",
            value: 10,
            color: "#a7f3d0"
          }
        ]
      }
    ]
  }
};

// Dữ liệu Phác đồ 2: Hen Suyễn Người lớn (GINA 2024 Track 1)
export const ASTHMA_PATHWAY_DATA: PathwayData = {
  title: "Phác đồ Kiểm soát Hen Suyễn Người lớn (GINA 2024 Track 1)",
  subtitle: "Tiếp cận kiểm soát bậc 1 đến bậc 5 với ICS-Formoterol cắt cơn",
  root: {
    name: "Hen Suyễn",
    color: "var(--color-info, #06b6d4)",
    children: [
      {
        name: "Bậc 1 - 2: Triệu chứng thỉnh thoảng",
        category: "Nhẹ",
        value: 35,
        color: "var(--color-success, #10b981)",
        children: [
          {
            name: "ICS-Formoterol liều thấp khi cần",
            category: "Cắt cơn & Ngừa cơn phối hợp",
            dose: "Budesonide/Formoterol 160/4.5mcg x 1 nhát khi có triệu chứng",
            details: "Track 1 ưu tiên: Giảm 60% nguy cơ đợt cấp nặng so với dùng SABA đơn thuần.",
            value: 35,
            color: "#6ee7b7"
          }
        ]
      },
      {
        name: "Bậc 3: Triệu chứng hầu hết các ngày",
        category: "Trung bình",
        value: 35,
        color: "var(--color-warning, #f59e0b)",
        children: [
          {
            name: "ICS-Formoterol liều thấp duy trì & cắt cơn",
            category: "Liệu pháp SMART",
            dose: "Budesonide/Formoterol 160/4.5mcg x 1 nhát x 2 lần/ngày + 1 nhát khi cần",
            details: "Liệu pháp MART giúp kiểm soát duy trì và xử trí cắt cơn tức thì.",
            value: 35,
            color: "#fde047"
          }
        ]
      },
      {
        name: "Bậc 4 - 5: Hen dai dẳng / Khó kiểm soát",
        category: "Nặng",
        value: 30,
        color: "var(--color-danger, #ef4444)",
        children: [
          {
            name: "ICS-Formoterol liều trung bình + LAMA",
            category: "Nâng bậc Tam trị liệu",
            dose: "Thêm Tiotropium Respimat 5mcg/ngày",
            details: "Đánh giá фенотип (T2 high/low), xem xét chỉ định Thuốc sinh học (Anti-IgE, Anti-IL5).",
            value: 30,
            color: "#f87171"
          }
        ]
      }
    ]
  }
};

declare const TreatmentPathwayEngine: any;

export function initTreatmentPathways(): void {
  if (typeof TreatmentPathwayEngine !== 'undefined') {
    if (document.getElementById('pathwayDiabetesContainer')) {
      new TreatmentPathwayEngine("pathwayDiabetesContainer", { data: DIABETES_PATHWAY_DATA });
    }
    if (document.getElementById('pathwayAsthmaContainer')) {
      new TreatmentPathwayEngine("pathwayAsthmaContainer", { data: ASTHMA_PATHWAY_DATA });
    }
  }
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTreatmentPathways);
  } else {
    initTreatmentPathways();
  }
}
