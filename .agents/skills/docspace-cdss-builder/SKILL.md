---
name: docspace-cdss-builder
description: >
  Kỹ năng chuyên sâu xây dựng Enriched CDSS JSON (Prompt 05) và Ma trận trọng số suy luận lâm sàng (Prompt 06) cho CliniPortal DocSpace.
  Kích hoạt khi AI cần: biên soạn file enriched/<slug>.json, chuẩn hóa cấu trúc severityGrading và Bảng Chiến Lược 3 Cột,
  thiết kế phác đồ 9 phân mục, cấu hình danh mục thuốc kháng sinh/hồi sức, tính toán ma trận trọng số suy luận CDSS (dt, gy, ht, loaitru)
  và bảo toàn từ điển triệu chứng không mồ côi (Zero-Orphan Symptoms).
---

# DocSpace CDSS Builder Skill (Prompt 05 & Prompt 06 Specialist)

Kỹ năng này chuyên sâu về quy chuẩn thiết kế, bóc tách dữ liệu y học chứng cứ (EBM) và kiến trúc dữ liệu cho **Khối 1: Enriched CDSS JSON** (Prompt 05) và **Khối 2 & 3: Ca Mẫu & Ma Trận Trọng Số Suy Luận CDSS** (Prompt 06) trong phân hệ CliniPortal DocSpace.

---

## 🏗️ 1. Cấu Trúc Chuẩn Của Enriched CDSS JSON (`enriched/<slug>.json`)

Mỗi file JSON lưu tại `src/content/docspace/data/enriched/<slug>.json` phải tuân thủ 100% giao diện TypeScript `DiseaseReactionChainDefinition`:

```typescript
export interface DiseaseReactionChainDefinition {
  icdCode: string;                      // Mã ICD-10 chính (ví dụ: "A97", "G00.9")
  icdPrefixes: string[];                // Danh sách mã tiền tố ICD mở rộng
  diseaseName: string;                  // Tên bệnh lý tiếng Việt kèm tiếng Anh
  specialty: string;                    // Chuyên khoa chuẩn đơn lẻ (ví dụ: "Truyền nhiễm")
  severity: 'emergency' | 'severe' | 'standard';
  summary: string;                      // Tóm tắt cơ chế bệnh sinh, diễn tiến giai đoạn (3-4 câu)
  goldStandard: string;                 // Tiêu chuẩn vàng xác chẩn vi sinh/căn nguyên
  criteriaRule: {
    mandatoryIds: string[];             // ID tiêu chuẩn bắt buộc
    minMajorRequired: number;           // Số tiêu chuẩn chính tối thiểu
    minMinorRequired: number;           // Số tiêu chuẩn phụ tối thiểu
    ruleDescription: string;            // Diễn giải quy tắc chẩn đoán xác định
  };
  criteria: Array<{
    id: string;
    type: 'mandatory' | 'major' | 'minor' | 'exclusion' | 'lab';
    label: string;
    description: string;
    sourceGuideline?: string;
    labThreshold?: string;
  }>;
  severityGrading: SeverityGradingItem[]; // BẮT BUỘC: 2-4 phân độ nặng lâm sàng
  protocol: {
    title: string;
    guideline: string;
    targetGoals: string[];
    initialManagement: string[];
    firstLineDrugs: Array<{
      drugName: string;
      class: string;
      route: string;
      dosage: string;
      frequency: string;
      instructions: string;
      isFirstLine: boolean;
    }>;
    secondLineDrugs: Array<{
      drugName: string;
      class: string;
      route: string;
      dosage: string;
      frequency: string;
      instructions: string;
      isFirstLine: boolean;
    }>;
    supportiveCare: string[];
  };
  complications: Array<{
    id?: string;
    name: string;
    timeframe: 'acute_24h' | 'subacute_7d' | 'chronic';
    warningSigns: string;
    preventiveAction: string;
    onCallAlertText: string;            // Y lệnh trực cấp cứu STAT
    orderSet?: Array<{                  // Danh mục thuốc/y lệnh xử trí khẩn cấp
      drug: string;
      dosage: string;
      note: string;
    }>;
  }>;
  monitoringLabs: string[];             // Danh mục xét nghiệm & sinh hiệu cần theo dõi
  vaultPathways: Array<{                // Liên kết 16 Phân kho Knowledge Vault
    khoCode: string;
    khoName: string;
    articleTitle: string;
    searchKeyword: string;
  }>;
}
```

---

## 🎯 2. Quy Chuẩn Thiết Kế "severityGrading" (Cầu Nối Bước 3 ➔ Bước 4)

Trường `severityGrading` là thành phần then chốt nhất kết nối chẩn đoán phân độ ở Bước 3 với định hướng xử trí ở Bước 4. Mỗi phần tử trong mảng đại diện cho 1 phân độ nặng:

```json
{
  "grade": "Mức độ 2: Thể Trung bình / Có Dấu hiệu Cảnh báo",
  "severity": "moderate",
  "criteria": "[Lâm sàng]: Đau bụng nhiều vùng gan, nôn ói liên tục, lừ đừ; [Cận lâm sàng]: Tiểu cầu < 100 G/L, Hct tăng > 20%; [Dấu hiệu cảnh báo]: Xuất huyết niêm mạc, rỉ máu chân răng; [Tiêu chuẩn an toàn]: Chưa có dấu hiệu sốc tụt HA.",
  "triage": "Nội trú / Khoa Truyền nhiễm Bệnh viện Quận-Huyện",
  "primaryAction": "Nhập viện theo dõi sát sinh hiệu, thiết lập đường truyền bù dịch Ringer Lactate 6-7 mL/kg/h trong 2-4 giờ đầu.",
  "targetVitals": "HATT ≥ 90 mmHg, Hiệu áp ≥ 25 mmHg, Nước tiểu ≥ 0.5 mL/kg/h, Hct giảm dần."
}
```

### 🛑 Quy Tắc Bóc Tách Tiêu Chuẩn Tại Bước 3:
1. **Trường `criteria`**: **BẮT BUỘC** chứa các tiền tố `[Lâm sàng]`, `[Cận lâm sàng]`, `[Tiêu chuẩn an toàn]`, `[Dấu hiệu cảnh báo]`.
   - Giao diện Bước 3 (`Step2Analysis.tsx`) sẽ tự động phân tích cú pháp (parse) các tiền tố này thành các thẻ thông tin trực quan có biểu tượng tương ứng.
   - **TUYỆT ĐỐI KHÔNG** để lẫn thuốc điều trị, tuyến tiếp nhận hay mục tiêu sinh hiệu vào trường `criteria`!
2. **Bảng Chiến Lược 3 Cột (Bước 4)**:
   - Cột 1: `triage` (Tuyến tiếp nhận: Ngoại trú / Nội trú / ICU).
   - Cột 2: `primaryAction` (Định hướng chiến lược xử trí tức thời).
   - Cột 3: `targetVitals` (Mục tiêu điều trị & chỉ số sinh hiệu cần đạt).

---

## 💊 3. Thiết Kế Phác Đồ 9 Phân Mục Điều Trị (Bước 4)

Phác đồ điều trị được chia thành 9 phân mục có thể đóng/mở độc lập (Collapsible):

| Phân mục | Dữ Liệu Tương Ứng Trong JSON | Quy Chuẩn Thiết Kế Y Khoa |
| :---: | :--- | :--- |
| **Mục 1** | `severityGrading` (Phân độ được chọn) | Bảng Chiến Lược 3 Cột luôn mở mặc định |
| **Mục 2** | `complications` (Biến chứng & Cờ đỏ) | Cảnh báo giờ vàng kèm y lệnh trực STAT (`onCallAlertText`) và bộ `orderSet` |
| **Mục 3** | `protocol.initialManagement` & `triage` | Hồi sức ABC, đường truyền tĩnh mạch lớn, thở oxy, bù dịch |
| **Mục 4** | `firstLineDrugs` & `secondLineDrugs` | Thuốc đầu tay, kháng sinh kinh nghiệm liều cao ngấm màng não/mô, liều tính theo mg/kg |
| **Mục 5** | Thang điểm nguy cơ & CDSS | NEWS2, PEWS, qSOFA, ESI phân loại cấp cứu |
| **Mục 6** | `monitoringLabs` & `supportiveCare` | Xét nghiệm kiểm tra sau 24-48h, điện giải đồ, chức năng gan thận |
| **Mục 7** | Tư vấn Teach-Back & Lây nhiễm | Biện pháp phòng ngừa (Chuẩn / Tiếp xúc / Giọt bắn), khai báo TT 54/2015/TT-BYT |
| **Mục 8** | `vaultPathways` & Guidelines | Liên kết các bài chuyên sâu trong Knowledge Vault (CD, PDDT, DTH, BC) |
| **Mục 9** | SOAP Experience & Bedside AI | Ca thực chiến đối chiếu và Prompt AI hội chẩn tại giường |

---

## ⚖️ 4. Quy Chuẩn Ma Trận Trọng Số Suy Luận CDSS (Prompt 06)

Khi nạp bệnh lý vào `clinical-rules-diseases.json` và `clinical-rules-kb.json`, mảng `dd` quy định mức độ đóng góp của từng triệu chứng:

| Ký Hiệu Vai Trò | Tên Vai Trò | Mức Điểm Khuyến Cáo | Ý Nghĩa Lâm Sàng & Ví Dụ |
| :---: | :--- | :---: | :--- |
| **`dt`** | **Đặc trưng (Pathognomonic)** | **+4.0 đến +5.0đ** | Dấu hiệu chỉ điểm then chốt (Cứng gáy, DNT đục mủ, Tử ban hoại tử, NS1 Ag (+)) |
| **`gy`** | **Gợi ý (Suggestive)** | **+3.0 đến +3.5đ** | Triệu chứng định hướng mạnh (Sốt cao đột ngột, Đau đầu dữ dội nôn vọt, Hct tăng > 20%) |
| **`ht`** | **Hỗ trợ (Supportive)** | **+1.0 đến +2.5đ** | Triệu chứng phối hợp thường gặp (Đau rát họng, mệt mỏi, đau cơ, men gan tăng nhẹ) |
| **`loaitru`** | **Loại trừ (Exclusion)** | **Trừ điểm / Loại trừ** | Bằng chứng phủ định chẩn đoán (Không sốt, chấn thương sọ não kín không nhiễm trùng) |

### 🛑 Quy Tắc Đồng Bộ Lockstep 3 File:
Khi nạp Khối 2 & 3:
1. Mở `src/content/knowledge-vault/data/clinical-rules-symptoms.json`: Thêm các triệu chứng mới vào từ điển.
2. Mở `src/content/knowledge-vault/data/clinical-rules-diseases.json`: Bổ sung bệnh lý mới với các cặp `[tc_id, diem, vai_tro]`.
3. Mở `src/content/knowledge-vault/data/sample-clinical-cases.json`: Nạp ca bệnh mẫu tương ứng vào mảng ca thực tế.
4. Mở `src/content/knowledge-vault/data/clinical-rules-kb.json`: Đồng bộ toàn diện master KB.

---

## 🛠️ 5. Lệnh Kiểm Tra & Biên Dịch Tự Động

Sau khi chỉnh sửa xong các file dữ liệu:
```powershell
# 1. Tái tạo bundle TypeScript index cho thư mục enriched/
node tools/scripts/build-enriched-cdss.mjs

# 2. Chạy công cụ kiểm tra tính hợp lệ toàn diện của bệnh lý
node tools/scripts/docspace-disease-audit.mjs <slug_benh>
```
