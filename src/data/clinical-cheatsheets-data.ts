/**
 * Clinical Cheatsheets & Quick Reference Data Bundle (clinical-cheatsheets-data.ts)
 * Path: src/data/clinical-cheatsheets-data.ts
 */

export interface ClinicalCheatsheetItem {
  id: string;
  title: string;
  category: string;
  badge: string;
  badgeClass: string;
  icon: string;
  summary: string;
  details: {
    firstLine: string;
    dosing: string[];
    secondary: string[];
  };
  tags: string[];
}

export const CLINICAL_CHEATSHEETS_DATA: ClinicalCheatsheetItem[] = [
  {
    id: "anaphylaxis-protocol",
    title: "Phác đồ Cấp cứu Sốc phản vệ",
    category: "Cấp cứu khẩn",
    badge: "EMERGENCY",
    badgeClass: "badge-danger",
    icon: "fa-triangle-exclamation",
    summary: "Xử trí khẩn cấp Phản vệ theo Thông tư 51/2017/TT-BYT. Adrenaline là thuốc thiết yếu hàng đầu.",
    details: {
      firstLine: "Adrenaline 1mg/1ml (1:1000) Tiêm bắp ngay lập tức (Mặt ngoài giữa đùi):",
      dosing: [
        "Người lớn: 1/2 - 1 ống (0.5 - 1ml) IM. Nhắc lại sau 3-5 phút nếu chưa đỡ.",
        "Trẻ em: 0.01 mg/kg (tương đương 1/10 ống/10kg cân nặng).",
        "Tư thế: Nằm đầu bằng, chân cao. (Nằm nghiêng nếu nôn)."
      ],
      secondary: [
        "Thở Ôxy qua mask 6-10 lít/phút.",
        "Xả dịch NaCl 0.9% truyền tĩnh mạch nhanh 1-2 lít (người lớn) / 10-20ml/kg (trẻ em).",
        "Thuốc phối hợp: Diphenhydramin 10-20mg IV/IM + Methylprednisolone 40-80mg IV."
      ]
    },
    tags: ["Cấp cứu", "Sốc", "Adrenaline", "Phản vệ", "BYT"]
  },
  {
    id: "gcs-apgar-score",
    title: "Thang điểm Glasgow (GCS) & APGAR",
    category: "Thang điểm",
    badge: "SCORE",
    badgeClass: "badge-warning",
    icon: "fa-chart-simple",
    summary: "Đánh giá tri giác chấn thương sọ não (GCS 3-15) và sức khỏe sơ sinh (APGAR 0-10).",
    details: {
      firstLine: "GCS (Glasgow Coma Scale): Mắt (E:4) + Lời nói (V:5) + Vận động (M:6)",
      dosing: [
        "E4: Mở tự nhiên | E3: Mở khi gọi | E2: Mở khi đau | E1: Không mở",
        "V5: Chuẩn | V4: Lẫn lộn | V3: Từ không phù hợp | V2: Kêu ầm ừ | V1: Không đáp ứng",
        "M6: Theo lệnh | M5: Định vị đau | M4: Co tay né đau | M3: Gấp cứng mất vỏ | M2: Duỗi cứng mất não | M1: Liệt hoàn toàn"
      ],
      secondary: [
        "GCS ≤ 8 điểm: Hôn mê nặng -> Đặt nội khí quản bảo vệ đường thở khẩn cấp.",
        "APGAR: Appearance, Pulse, Grimace, Activity, Respiration."
      ]
    },
    tags: ["Tri giác", "GCS", "APGAR", "Sơ sinh", "Nội khí quản"]
  }
];

if (typeof window !== 'undefined') {
  (window as any).CLINICAL_CHEATSHEETS_DATA = CLINICAL_CHEATSHEETS_DATA;
}
