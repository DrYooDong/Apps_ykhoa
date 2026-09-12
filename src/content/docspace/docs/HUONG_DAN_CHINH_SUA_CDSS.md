# Cẩm Nang Chuẩn Hóa & Hướng Dẫn Chỉnh Sửa Kiến Thức Có Trọng Số CDSS

### CliniPortal DocSpace — Clinical Decision Support System (CDSS) Mastery Guide

> **Mục tiêu tài liệu:** Hướng dẫn toàn diện cấu trúc, nguyên lý gán trọng số y học chứng cứ (EBM), và quy trình thêm mới / chỉnh sửa kiến thức bệnh lý có trọng số CDSS trong hệ sinh thái CliniPortal.

---

## 1. 🏛️ Kiến Trúc Hệ Thống Tri Thức CDSS

Hệ thống CDSS trong CliniPortal DocSpace được thiết kế theo mô hình **3 Tầng đồng bộ (Tri-Layer Knowledge Architecture)**:

```text
┌────────────────────────────────────────────────────────────────────────┐
│ TẦNG 1: Core Engine (32 Bệnh lý Cốt lõi)                              │
│ File: src/content/knowledge-vault/data/clinical-rules-kb.json           │
│ Nhiệm vụ: Chạy động cơ suy luận thời gian thực (Step 1 & Step 2)       │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
┌──────────────────────────────────▼─────────────────────────────────────┐
│ TẦNG 2: Enriched Knowledge Entities (Làm giàu Module hóa độc lập)     │
│ Thư mục: src/content/docspace/data/enriched/<ten_benh>.json            │
│ Nhiệm vụ: Lưu trữ các bệnh lý chuyên sâu (NotebookLM / AI / Bác sĩ)    │
│ Tự động bundle qua: node tools/scripts/build-enriched-cdss.mjs         │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
┌──────────────────────────────────▼─────────────────────────────────────┐
│ TẦNG 3: Diagnostic Chain Database (165+ Bệnh lý Kho Chẩn Đoán 2.3)     │
│ File: src/content/docspace/data/diagnostic-criteria-database.ts         │
│ Nhiệm vụ: Cung cấp tiêu chuẩn, ngưỡng CLS, phác đồ thuốc phân bậc và  │
│           chuỗi phản ứng biến chứng cho toàn bộ Kho Chẩn Đoán & Vault  │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. ⚖️ Quy Chuẩn Gán Trọng Số Lâm Sàng (Weighting Matrix & Roles)

Mỗi tiêu chuẩn trong CDSS được gán một **Trọng số định lượng** (`trongSo`) và một **Vai trò chẩn đoán** (`role`):

| Vai trò (`role`) | Badge Hiển thị | Màu sắc | Trọng số (`trongSo`) | Định nghĩa & Ý nghĩa Lâm sàng (EBM) | Ví dụ minh họa |
| :--- | :---: | :---: | :---: | :--- | :--- |
| **`dt`** (Đặc trưng) | `đặc trưng` | Xanh dương | **`+4.5` ~ `+5.0`** | **Tiêu chuẩn vàng / Bắt buộc (Mandatory)**. Có giá trị xác chẩn rất cao ($LR^+ > 10$). | X-quang đông đặc phế nang, RT-PCR DENV (+), ST chênh lên trên ECG |
| **`dt`** (Đặc trưng) | `đặc trưng` | Xanh dương | **`+3.5` ~ `+4.0`** | **Dấu hiệu thực thể / Hội chứng kinh điển (Major)**. Thường xuyên xuất hiện trong bệnh cảnh ($LR^+ \approx 5-10$). | Ran nổ khu trú ở phổi, Dấu hiệu ruột thừa MacBurney (+), Cổ trướng |
| **`gy`** (Gợi ý) | `gợi ý` | Vàng cam | **`+2.0` ~ `+3.0`** | **Triệu chứng cơ năng / Định hướng (Minor)**. Độ nhạy cao nhưng độ đặc hiệu vừa phải. | Sốt cao đột ngột, Khó thở khi gắng sức, Đau ngực kiểu màng phổi |
| **`ht`** (Hỗ trợ) | `hỗ trợ` | Xám nhạt | **`+1.5` ~ `+2.5`** | **Cận lâm sàng sàng lọc chung (Supportive)**. Phản ánh tình trạng viêm, rối loạn chuyển hóa. | Bạch cầu tăng, CRP > 20 mg/L, Rối loạn điện giải nhẹ |
| **`loaitru`** (Loại trừ) | `loại trừ` | Đỏ thẫm | **`-5.0`** | **Tiêu chuẩn loại trừ (Exclusion Criteria)**. Khi xuất hiện thì không thể là bệnh này. | D-Dimer bình thường ở bệnh nhân PE nguy cơ thấp (Loại trừ PE) |

---

## 3. 🛠️ Cách 1: Chỉnh Sửa Trong File Cốt Lõi (`clinical-rules-kb.json`)

Dành cho 32 bệnh lý cốt lõi tham gia trực tiếp vào thuật toán suy luận chẩn đoán thời gian thực.

📁 **Đường dẫn file:** `src/content/knowledge-vault/data/clinical-rules-kb.json`

### Bước 1: Khai báo triệu chứng vào danh mục `"trieuChung"` (Nếu là triệu chứng mới)

```json
{
  "id": "crp_tang",
  "ten": "CRP > 20 mg/L hoặc Procalcitonin > 0.25 ng/mL",
  "nhom": "Cận lâm sàng",
  "loai": ["cls"],
  "tuKhoa": ["crp", "procalcitonin", "viêm", "nhiễm trùng"],
  "map": {
    "fld": "lCRP",
    "op": ">=",
    "val": 20
  }
}
```

* **Quy tắc tự suy (`"map"`):** Hệ thống sẽ tự động bật triệu chứng này nếu bác sĩ nhập giá trị xét nghiệm/sinh hiệu thỏa điều kiện:
  * `"fld"`: Tên trường sinh hiệu/xét nghiệm (`vNhiet`, `vMach`, `vHATT`, `vHATTr`, `vTho`, `vSpo2`, `lBC`, `lTC`, `lHct`, `lGlu`, `lTrop`, `lCRP`...).
  * `"op"`: Toán tử so sánh (`">="`, `">"`, `"<="`, `"<"`).
  * `"val"`: Ngưỡng số (có thể dùng `"valNam"`, `"valNu"` cho các chỉ số phân biệt giới tính như Hct, Creatinine).

### Bước 2: Thêm hoặc sửa bệnh lý trong mảng `"benh"`

```json
{
  "id": "viem_phoi",
  "ten": "Viêm phổi mắc phải cộng đồng (CAP)",
  "icd": "J18.9",
  "nhom": "Hô hấp",
  "baoDong": true,
  "ghiChuBaoDong": "Khó thở SpO2 < 92%, suy hô hấp cấp, CURB-65 ≥ 3 điểm cần hồi sức ICU.",
  "tomTat": "Nhiễm trùng cấp tính nhu mô phổi xuất hiện ngoài bệnh viện. Khám ran nổ/ẩm khu trú, X-quang có đám mờ phế nang thâm nhiễm mới.",
  "danSo": {
    "gioiTinh": "any",
    "tuoiMin": 0,
    "tuoiMax": 120
  },
  "dd": [
    ["sot", 2.5, "dt"],
    ["ho_dam", 3.5, "dt"],
    ["kho_tho", 2.5, "gy"],
    ["ran_no", 3.5, "dt"],
    ["xq_phoi_tham_nhiem", 4.5, "dt"],
    ["crp_tang", 2.0, "ht"]
  ],
  "phacDo": {
    "tuyen": [
      "Ngoại trú (CURB-65 0-1): Amoxicillin/Clavulanate 1g x 2 lần/ngày ± Azithromycin",
      "Nội trú (CURB-65 = 2): Ceftriaxone 1-2g IV/ngày + Azithromycin 500mg/ngày",
      "Hồi sức ICU (CURB-65 ≥ 3): Piperacillin/Tazobactam 4.5g q8h IV + Levofloxacin 750mg/ngày"
    ],
    "thuoc": [
      ["Amoxicillin/Clavulanate", "1g (875/125) x 2 lần/ngày (uống)", "Ngoại trú"],
      ["Ceftriaxone", "1g - 2g tiêm TM x 1 lần/ngày", "Nội trú khoa phòng"],
      ["Levofloxacin", "750mg IV x 1 lần/ngày", "Hồi sức tích cực"]
    ],
    "theoDoi": [
      "SpO2, nhịp thở, tri giác mỗi 4-6 giờ",
      "Nhiệt độ sau 48-72 giờ (đáp ứng kháng sinh)"
    ],
    "luuY": [
      "Cấy máu và đờm trước khi dùng liều kháng sinh đầu tiên",
      "Bắt đầu kháng sinh trong vòng 4 giờ đầu từ khi nhập viện"
    ],
    "nguon": ["Bộ Y Tế", "ATS/IDSA"]
  }
}
```

---

## 4. 🚀 Cách 2: Làm Giàu Module Hóa Độc Lập (`enriched/<ten_benh>.json`)

Đây là phương pháp **hiện đại, an toàn và mở rộng tốt nhất**. Bạn không cần sửa file JSON hàng nghìn dòng, mà chỉ cần tạo 1 file riêng cho mỗi bệnh mới.

📁 **Thư mục lưu trữ:** `src/content/docspace/data/enriched/<slug_benh>.json`  
*Ví dụ:* `src/content/docspace/data/enriched/sot_xuat_huyet_dengue.json`

### Template Mẫu Chuẩn Cho File Bệnh Lý Mới

```json
{
  "icdCode": "A97",
  "icdPrefixes": ["A97", "A97.0", "A97.1", "A97.2", "A97.9"],
  "diseaseName": "Sốt xuất huyết Dengue (Dengue Hemorrhagic Fever)",
  "specialty": "Truyền nhiễm",
  "severity": "emergency",
  "summary": "Bệnh truyền nhiễm cấp tính do vi rút Dengue lây truyền qua muỗi Aedes aegypti...",
  "goldStandard": "RT-PCR DENV RNA (+) hoặc ELISA NS1 Ag (+) trong 5 ngày đầu.",
  "criteriaRule": {
    "mandatoryIds": ["dengue_fever_onset"],
    "minMajorRequired": 2,
    "minMinorRequired": 1,
    "ruleDescription": "Chẩn đoán xác định khi có sốt cấp tính ≤ 7 ngày kèm ít nhất 2 dấu hiệu lâm sàng và xét nghiệm vi rút học dương tính."
  },
  "criteria": [
    {
      "id": "dengue_fever_onset",
      "type": "mandatory",
      "label": "Sốt cao đột ngột, liên tục 39–40°C kéo dài 2 đến 7 ngày kèm yếu tố dịch tễ vùng lưu hành",
      "description": "Không đáp ứng tốt với thuốc hạ sốt thông thường trong 48 giờ đầu.",
      "sourceGuideline": "Bộ Y tế 2023 / WHO 2025"
    },
    {
      "id": "tourniquet_test_positive",
      "type": "major",
      "label": "Dấu hiệu dây thắt (Tourniquet test) dương tính xuất hiện ≥ 20 chấm xuất huyết / 6.25 cm²",
      "description": "Thực hiện ở mặt trước cẳng tay sau khi duy trì áp lực băng quấn 5 phút.",
      "sourceGuideline": "Bộ Y tế 2023"
    },
    {
      "id": "hemoconcentration_hct",
      "type": "lab",
      "label": "Cô đặc máu do thoát huyết tương: Hematocrit (Hct) tăng > 20% so với trị số nền",
      "labThreshold": "Hct tăng > 20% (Nam > 43%, Nữ > 38%)",
      "sourceGuideline": "WHO 2025"
    },
    {
      "id": "thrombocytopenia_drop",
      "type": "lab",
      "label": "Tiểu cầu tụt dốc nhanh chóng: Số lượng tiểu cầu giảm < 100.000/µL",
      "labThreshold": "Tiểu cầu < 100.000/µL (100 G/L)",
      "sourceGuideline": "Bộ Y tế 2023"
    },
    {
      "id": "dengue_ns1_pcr_gold",
      "type": "mandatory",
      "label": "Xét nghiệm căn nguyên vi rút: RT-PCR DENV RNA (+) hoặc Test nhanh Kháng nguyên NS1 (+)",
      "labThreshold": "NS1 Ag (+) hoặc RT-PCR (+)",
      "sourceGuideline": "Bộ Y tế / WHO"
    }
  ],
  "severityGrading": [
    {
      "grade": "Độ 1: Sốt xuất huyết Dengue (Không dấu hiệu cảnh báo)",
      "severity": "mild",
      "criteria": "Sốt cao đột ngột 2–7 ngày, có triệu chứng đau đầu/mỏi cơ, Lacet (+/-), không có dấu hiệu cảnh báo.",
      "triage": "Ngoại trú / Trạm y tế cơ sở",
      "primaryAction": "Hạ sốt Paracetamol 10–15 mg/kg, bù nước Oresol uống 2000–3000 mL/ngày, theo dõi ngoại trú.",
      "targetVitals": "Mạch 60–90 l/p, HATT ≥ 100 mmHg, Hct ổn định"
    },
    {
      "grade": "Độ 2: Sốt xuất huyết Dengue CÓ DẤU HIỆU CẢNH BÁO",
      "severity": "moderate",
      "criteria": "Đau bụng vùng gan, nôn ói nhiều, lừ đừ/vật vã, Hct tăng cao kèm tiểu cầu giảm nhanh < 100 G/L.",
      "triage": "Nội trú 100% / Khoa Nội - Nhiễm BV Huyện",
      "primaryAction": "Truyền tĩnh mạch Ringer Lactate 6 mL/kg/h trong 1–2h, rút dịch từng nấc (5 -> 3 -> 1.5 mL/kg/h).",
      "targetVitals": "Nước tiểu ≥ 0,5–1,0 mL/kg/h, Hct giảm dần và ổn định"
    },
    {
      "grade": "Độ 3: Sốt xuất huyết Dengue NẶNG (Sốc Dengue / Xuất huyết nặng / Suy tạng)",
      "severity": "critical",
      "criteria": "Huyết áp kẹp (hiệu áp ≤ 20) hoặc tụt HA, CRT > 2s, chi lạnh ẩm; hoặc xuất huyết tạng, AST/ALT ≥ 1000.",
      "triage": "Cấp cứu khẩn / Hồi sức tích cực (ICU) BV Tỉnh",
      "primaryAction": "Chống sốc Ringer Lactate 15–20 mL/kg/h, chuyển Cao phân tử Dextran 40 nếu thất bại, truyền máu.",
      "targetVitals": "HATT ≥ 90 mmHg, Hiệu áp ≥ 30 mmHg, SpO2 ≥ 95%"
    }
  ],
  "protocol": {
    "title": "Phác đồ Điều trị Sốt xuất huyết Dengue (Bộ Y tế Quyết định 2760/QĐ-BYT & WHO)",
    "guideline": "Hướng dẫn chẩn đoán và điều trị SXHD Bộ Y tế Việt Nam 2023",
    "targetGoals": [
      "Khôi phục và duy trì huyết động ổn định: Mạch rõ 60–100 l/p, HATT ≥ 90 mmHg, Hiệu áp > 20 mmHg",
      "Duy trì lượng nước tiểu ≥ 0.5–1.0 mL/kg/giờ, Hematocrit ổn định",
      "Phát hiện và xử trí kịp thời sốc thoát huyết tương và xuất huyết nặng"
    ],
    "initialManagement": [
      "Phân tầng: Không dấu hiệu cảnh báo (Ngoại trú), Có dấu hiệu cảnh báo (Nhập viện nội trú), Sốc Dengue (Cấp cứu ICU)",
      "Bù dịch sớm đường uống bằng Oresol pha chuẩn 2000–3000 mL/ngày (người lớn)",
      "Chỉ định truyền tĩnh mạch Ringer Lactate khi nôn nhiều, không uống được hoặc Hct tăng cao"
    ],
    "firstLineDrugs": [
      {
        "drugName": "Paracetamol (Acetaminophen)",
        "class": "Hạ sốt, giảm đau",
        "route": "Uống",
        "dosage": "10 - 15 mg/kg/lần, cách 4 - 6 giờ (tối đa 60 mg/kg/ngày hoặc 3g/ngày)",
        "frequency": "Khi sốt ≥ 38.5°C",
        "instructions": "Chỉ dùng Paracetamol đơn chất, tuyệt đối không dùng Aspirin / NSAID",
        "isFirstLine": true
      },
      {
        "drugName": "Dung dịch Ringer Lactate",
        "class": "Dịch tinh thể đẳng trương",
        "route": "Truyền tĩnh mạch",
        "dosage": "6 - 7 mL/kg/giờ trong 1 - 2 giờ đầu, sau đó giảm dần theo đáp ứng Hct",
        "frequency": "Liên tục trong giai đoạn cảnh báo",
        "instructions": "Theo dõi sát Hct và lượng nước tiểu mỗi 2 - 4 giờ",
        "isFirstLine": true
      }
    ],
    "secondLineDrugs": [
      {
        "drugName": "Dung dịch Cao phân tử (HES 200.000 Da hoặc Dextran 40)",
        "class": "Dịch keo cao phân tử chống sốc",
        "route": "Truyền tĩnh mạch",
        "dosage": "10 - 15 mL/kg trong 1 giờ khi sốc trơ với dịch tinh thể",
        "frequency": "Cấp cứu",
        "instructions": "Chỉ định trong sốc sốt xuất huyết nặng tái sốc",
        "isFirstLine": false
      }
    ],
    "supportiveCare": [
      "Tuyệt đối KHÔNG dùng Aspirin, Ibuprofen hoặc NSAID (nguy cơ xuất huyết dạ dày tử vong)",
      "Tránh truyền dịch quá mức trong giai đoạn hồi phục sau ngày thứ 7 (nguy cơ phù phổi cấp)"
    ]
  },
  "complications": [
    {
      "name": "Sốc sốt xuất huyết Dengue (Dengue Shock Syndrome - DSS)",
      "timeframe": "acute_24h",
      "warningSigns": "Huyết áp kẹt (hiệu áp ≤ 20 mmHg), tụt huyết áp, mạch nhanh nhỏ, chi lạnh ẩm, vật vã",
      "preventiveAction": "Truyền dịch khẩn cấp Ringer Lactate 15-20 mL/kg/h và đo Hct trước/sau truyền",
      "onCallAlertText": "BÁO ĐỘNG SỐC DENGUE: Huyết áp tụt kẹt, Hct tăng vọt ➔ Đặt đường truyền lớn và xả dịch khẩn"
    }
  ],
  "monitoringLabs": [
    "Công thức máu (Hct, Tiểu cầu, Bạch cầu) mỗi 12-24 giờ hoặc mỗi 2-4 giờ khi có sốc",
    "Men gan AST, ALT (đánh giá tổn thương gan cấp)",
    "Đông máu toàn bộ và Khí máu động mạch nếu có sốc kéo dài"
  ]
}
```

### Lệnh đóng gói và cập nhật tự động

Sau khi lưu file JSON vào `src/content/docspace/data/enriched/`, mở terminal và chạy lệnh:

```powershell
node tools/scripts/build-enriched-cdss.mjs
```

Hệ thống sẽ tự động đăng ký thực thể bệnh lý vào `DIAGNOSTIC_CHAIN_DATABASE` mà không cần đụng vào bất kỳ dòng code nào khác!

---

## 5. 💻 Cách 3: Nạp & Xuất JSON Tương Tác Trực Tiếp Trên Web

Nếu bạn cần kiểm thử nhanh hoặc cho người dùng không can thiệp code:

1. Vào tab **Kho tri thức y khoa & Suy luận diễn dịch (Evidence Base)** trên thanh điều hướng.
2. Nhấn nút **`[Xuất JSON]`**: Hệ thống tải file `medlens-kb-export-YYYY-MM-DD.json` về máy.
3. Mở file JSON, chỉnh sửa trọng số hoặc thêm bệnh lý theo cấu trúc ở Phần 3.
4. Nhấn nút **`[Nạp JSON]`** và chọn file vừa sửa: Giao diện sẽ tải lại tức thì toàn bộ thẻ tiêu chuẩn và bộ luật CDSS mới.

---

## 6. 🎯 Bản Đồ Ánh Xạ Trực Quan: Từ File JSON Sang Màn Hình "Phác đồ điều trị & Y lệnh lâm sàng"

Dưới đây là đối chiếu chính xác từng phần tử trên giao diện Step 3 (như ảnh chụp của bạn) tương ứng với trường nào trong cấu trúc dữ liệu:

```text
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│ GIAO DIỆN PHÁC ĐỒ ĐIỀU TRỊ & Y LỆNH                              TRƯỜNG DỮ LIỆU TƯƠNG ỨNG TRONG JSON │
├─────────────────────────────────────────────────────────────────────────────────────────────────┤
│ [Dropdown Bệnh lý] (Góc phải trên)                             ◀── `diseaseName` + `icdCode`     │
│ Tiêu đề bệnh: Viêm phổi mắc phải cộng đồng (CAP) [J18.9]       ◀── `diseaseName` + `icdCode`     │
│ Huy hiệu chuyên khoa: [Hô hấp]                                  ◀── `specialty`                   │
│ Huy hiệu đỏ: [CẤP CỨU / NGUY KỊCH]                              ◀── `severity: "emergency"`       │
│ Khung cảnh báo đỏ: ⚑ Cảnh báo đỏ: Khó thở SpO2 < 92%...         ◀── `ghiChuBaoDong` / `alertText` │
│ Tóm tắt lâm sàng: Nhiễm trùng cấp tính nhu mô phổi...          ◀── `summary`                     │
│ Nguồn phác đồ: Bộ Y Tế, ATS/IDSA...                            ◀── `protocol.guideline` / `nguon`│
├─────────────────────────────────────────────────────────────────────────────────────────────────┤
│ 1. Quy trình xử trí cấp cứu & Thứ tự can thiệp ưu tiên         ◀── `protocol.initialManagement`  │
│    - 1. Ngoại trú (CURB-65 0-1): Amoxicillin/Clavulanate...   ◀── (Hoặc `phacDo.tuyen[0]`)      │
│    - 2. Nội trú (CURB-65 = 2): Ceftriaxone 1-2g...            ◀── (Hoặc `phacDo.tuyen[1]`)      │
│    - 3. Hồi sức ICU (CURB-65 ≥ 3): Beta-lactam...             ◀── (Hoặc `phacDo.tuyen[2]`)      │
├─────────────────────────────────────────────────────────────────────────────────────────────────┤
│ 2. Bảng y lệnh thuốc & Dược lâm sàng (Medical Order Sheet - Rx) ◀── `protocol.firstLineDrugs`    │
│    Cột [Tên thuốc / Hoạt chất]                                 ◀── `drug.drugName`               │
│    Cột [Liều lượng & Đường dùng]                               ◀── `drug.dosage` + `drug.route`  │
│    Cột [Điều kiện / Ghi chú]                                   ◀── `drug.instructions` / `notes` │
├─────────────────────────────────────────────────────────────────────────────────────────────────┤
│ 4. Chỉ tiêu theo dõi & Mục tiêu lâm sàng                       ◀── `monitoringLabs` / `theoDoi`  │
│    - Theo dõi SpO2, nhịp thở mỗi 4-6 giờ...                    ◀── `monitoringLabs[0]`           │
├─────────────────────────────────────────────────────────────────────────────────────────────────┤
│ 5. Cảnh báo an toàn, chống chỉ định & Lưu ý đặc biệt            ◀── `protocol.supportiveCare`     │
│    - Cấy máu và đờm trước liều kháng sinh đầu tiên...          ◀── `complications.warningSigns`  │
└─────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 7. ✅ Bảng Kiểm Thẩm Định Chất Lượng CDSS (QA Checklist)

Trước khi đưa một bệnh lý mới vào hoạt động lâm sàng:

* [ ] **Mã ICD-10:** Khớp đúng chuẩn quốc tế WHO và Bộ Y tế (ví dụ: `J18.9`, `A97`, `I21.9`).
* [ ] **Tiêu chuẩn vàng (Gold Standard):** Đã được định nghĩa rõ ràng với ngưỡng xét nghiệm / hình ảnh học cụ thể.
* [ ] **Trọng số cân bằng:** Có đủ tiêu chuẩn đặc trưng (`dt` +4.5/+3.5), gợi ý (`gy` +2.5), và hỗ trợ (`ht` +2.0).
* [ ] **Tiêu chuẩn loại trừ (`loaitru`):** Đã thiết lập các dấu hiệu giúp phân biệt với các bệnh cảnh cấp cứu tương tự.
* [ ] **Thuốc & Liều lượng (`firstLineDrugs`):** Đầy đủ tên hoạt chất, liều mg/kg hoặc mg/ngày, đường dùng (Uống / Tiêm TM / Khí dung) và khoảng cách dùng.
* [ ] **Cảnh báo an toàn (`supportiveCare` / `complications`):** Nêu rõ các chống chỉ định tuyệt đối (ví dụ: Không dùng NSAIDs trong SXHD).
* [ ] **Kiểm tra biên dịch:** Chạy `npm --prefix src/content/docspace run build` không báo lỗi.
