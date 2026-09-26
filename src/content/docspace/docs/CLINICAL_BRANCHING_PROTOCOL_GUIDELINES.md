# 🩺 QUY CHUẨN BIÊN SOẠN PHÁC ĐỒ PHÂN NHÁNH LÂM SÀNG
## Dynamic Clinical Branching Protocol Guidelines & Architecture Spec (v3.0)
*Hệ sinh thái CliniPortal DocSpace — Chu trình Lâm sàng Bước 4*

---

## 🧭 I. TỔNG QUAN & TRIẾT LÝ THIẾT KẾ

### 1. Vấn đề của cách tiếp cận cũ (Flat Tabs List)
Khi một bệnh lý có nhiều phân loại hoặc mức độ lâm sàng (ví dụ Sốt xuất huyết Dengue có 3 mức độ, Viêm phổi có 3 mức CURB-65), nếu mỗi phân loại tạo thành 1 bản ghi bệnh độc lập:
* **Bùng nổ số lượng tab**: Khi đạt 100 bệnh lý, số lượng tab phác đồ sẽ lên tới **250 – 350 tab**, làm thanh điều hướng bị quá tải và rối loạn.
* **Trùng lặp nội dung nghiêm trọng**: Các thông tin chung (chống chỉ định, lưu ý thuốc, dặn dò người nhà, mục tiêu chung) bị sao chép lặp đi lặp lại ở từng tab.
* **Đứt gãy liên tục lâm sàng**: Bác sĩ không thể theo dõi diễn tiến chuyển độ của bệnh nhân (khi nào cần leo thang phác đồ từ ngoại trú lên nội trú hoặc ICU).

### 2. Triết lý mới: "Một Bệnh Gốc — Đa Nhánh Lâm Sàng" (Master Root & Dynamic Branches)
Mỗi mặt bệnh lý trong CliniPortal DocSpace được quy hoạch thành **01 Phác đồ Gốc duy nhất (Root Master)**, bên trong phân thành **các nhánh lâm sàng (Branches)** tùy biến linh hoạt theo bản chất y khoa của bệnh:

```text
┌────────────────────────────────────────────────────────────────────────┐
│                      PHÁC ĐỒ BỆNH GỐC (ROOT MASTER)                     │
│  - Mã ICD-10 chính & Phụ (icdCode, icdPrefixes)                        │
│  - Tiêu chuẩn vàng chẩn đoán (goldStandard)                            │
│  - Cảnh báo & Chống chỉ định dùng chung (clinicalCautions)             │
│  - Liên kết 18 Kho Tri Thức CliniPortal (vaultPathways)                │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
           ┌────────────────────────┴────────────────────────┐
           ▼                                                 ▼
   [ĐỘNG CƠ CDSS BƯỚC 3]                             [PHÁC ĐỒ ĐIỀU TRỊ BƯỚC 4]
   Suy luận chẩn đoán phân biệt                      Hệ Thống Phân Nhánh Lâm Sàng
   và gợi ý thang điểm nguy cơ                      (Dynamic Branching System)
                                                             │
                  ┌──────────────────────────────────────────┼──────────────────────────────────────────┐
                  ▼                                          ▼                                          ▼
          🌿 NHÁNH 1 (MỨC 1)                         🌿 NHÁNH 2 (MỨC 2)                         🌿 NHÁNH 3 (MỨC 3)
     - Tiêu chuẩn nhận diện nhánh               - Tiêu chuẩn nhận diện nhánh               - Tiêu chuẩn nhận diện nhánh
     - Tuyến tiếp nhận: Ngoại trú               - Tuyến tiếp nhận: Nội trú                 - Tuyến tiếp nhận: Cấp cứu/ICU
     - Thuốc & Dịch truyền nấc thang            - Thuốc & Dịch truyền nấc thang            - Thuốc & Dịch truyền nấc thang
     - BẢNG 4 CỘT LỘ TRÌNH THEO NGÀY            - BẢNG 4 CỘT LỘ TRÌNH THEO NGÀY            - BẢNG 4 CỘT LỘ TRÌNH THEO NGÀY
     - ⚡ Tiêu chuẩn leo thang lên Nhánh 2       - 🚨 Báo động đỏ leo thang lên Nhánh 3     - ⚠️ Xử trí sốc kéo dài / hồi sức
```

---

## 🌿 II. 6 TRỤC PHÂN NHÁNH LÂM SÀNG CỐT LÕI (`axisType`)

Tùy theo bản chất của từng bệnh lý, người biên soạn chọn **01 trục phân nhánh chính** phù hợp nhất từ 6 loại dưới đây:

| Mã trục (`axisType`) | Tên trục phân loại | Bản chất y khoa | Ví dụ bệnh lý tiêu biểu | Các nhánh lâm sàng mẫu |
| :--- | :--- | :--- | :--- | :--- |
| **`severity`** | **Theo mức độ nặng** | Phân tầng theo mức độ suy giảm sinh hiệu, thoát dịch hoặc tổn thương tạng | Sốt xuất huyết Dengue, Viêm tụy cấp, Uốn ván, Sốt rét | • Nhẹ / Ngoại trú<br>• Có cảnh báo / Nội trú<br>• Nặng / Sốc / ICU |
| **`triage_score`** | **Theo thang điểm nguy cơ / phân tuyến** | Phân nhánh dựa trên các thang điểm lượng giá nguy cơ chuẩn hóa | Viêm phổi cộng đồng (CURB-65 / PSI), Thuyên tắc phổi (PESI) | • CURB-65 = 0–1 (Ngoại trú)<br>• CURB-65 = 2 (Khoa Nội)<br>• CURB-65 ≥ 3 (ICU) |
| **`phenotype`** | **Theo thể lâm sàng / căn nguyên** | Phân nhánh theo biểu hiện hình thái, vị trí hoặc căn nguyên vi sinh | Nhiễm trùng da & mô mềm (SSTI), Viêm màng não, Viêm khớp | • Thể có mủ (Purulent SSTI)<br>• Thể không mủ (Cellulitis)<br>• Thể hoại tử (Necrotizing) |
| **`treatment_step`** | **Theo bậc điều trị nấc thang** | Phân nhánh theo phác đồ bậc thang kiểm soát bệnh mạn tính | Hen phế quản (GINA Step 1–5), COPD (GOLD A–B–E) | • Bậc 1–2 (Khi cần)<br>• Bậc 3 (Duy trì liều thấp)<br>• Bậc 4–5 (Liều cao + Sinh học) |
| **`stage`** | **Theo giai đoạn bệnh** | Phân nhánh theo mức độ suy chức năng cơ quan tiến triển | Xơ gan (Child-Pugh A/B/C), Suy thận mạn (CKD G1–G5), Suy tim (NYHA) | • Xơ gan còn bù (Child A)<br>• Xơ gan mất bù (Child B–C)<br>• Vỡ giãn TMTQ cấp cứu |
| **`comorbidity`** | **Theo cơ địa / Bệnh đồng mắc** | Phân nhánh theo nguy cơ tim mạch - thận - chuyển hóa | Đái tháo đường type 2, Tăng huyết áp, Rối loạn lipid máu | • Kèm bệnh thận mạn / Suy tim<br>• Kèm bệnh tim mạch xơ vữa<br>• Không có biến chứng tạng |

---

## 📐 III. CẤU TRÚC JSON CHUẨN CỦA MỘT NHÁNH PHÁC ĐỒ

Trong tệp JSON `src/content/docspace/data/enriched/<slug>.json`, khối `branching` được định nghĩa như sau:

```jsonc
{
  "diseaseName": "Sốt xuất huyết Dengue",
  "icdCode": "A97",
  "icdPrefixes": ["A97.0", "A97.1", "A97.2", "A97.9"],
  "specialty": "Truyền nhiễm",

  // 🌿 KHỐI PHÂN NHÁNH ĐA DẠNG:
  "branching": {
    "axisName": "Phân loại theo Mức độ Lâm sàng (QĐ 2760/QĐ-BYT)",
    "axisType": "severity",
    "description": "SXH Dengue phân thành 3 nhánh điều trị nấc thang tương ứng với mức độ thoát huyết tương và suy giảm tưới máu mô.",
    
    "branches": [
      {
        "id": "mild",
        "name": "Mức độ 1: SXHD nhẹ (Ngoại trú)",
        "badgeText": "Ngoại trú",
        "color": "emerald", // "emerald" | "amber" | "rose" | "blue" | "indigo" | "purple"
        "criteria": "Sốt cao đột ngột <= 7 ngày, không có dấu hiệu cảnh báo, tự uống nước tốt, Hct bình thường hoặc tăng nhẹ < 10%, tiểu cầu > 100 G/L.",
        "triage": "Ngoại trú / Trạm Y tế / Phòng khám ngoại trú",
        "targetVitals": "Mạch, HA ổn định theo tuổi, SpO2 >= 96%, bài niệu >= 1.0 mL/kg/h",
        
        // ⚡ TIÊU CHUẨN LEO THANG (ESCALATION BRIDGE)
        "escalationCriteria": "Xuất hiện bất kỳ dấu hiệu cảnh báo nào: Đau bụng vùng gan, nôn ói nhiều (>= 3 lần/1h), vật vã li bì, chảy máu niêm mạc, tiểu ít, Hct tăng cao → Chuyển ngay Bệnh viện để chuyển sang Nhánh 2 (Nội trú 100%)!",
        
        // ✅ TIÊU CHUẨN XUẤT VIỆN / HẠ BẬC
        "dischargeCriteria": "Hết sốt >= 48 giờ liên tục không dùng thuốc hạ sốt, tỉnh táo, ăn uống tốt, tiểu tiện bình thường, tiểu cầu hồi phục > 50 G/L.",
        
        // 💊 DANH MỤC THUỐC ĐẶC THÙ CỦA NHÁNH
        "drugs": [
          [
            "Paracetamol",
            "10 - 15 mg/kg/lần (PO) khi sốt >= 38.5°C, cách mỗi 4-6h (tối đa 60 mg/kg/24h hoặc 3g/24h)",
            "Chỉ dùng Paracetamol đơn chất. Tuyệt đối cấm Aspirin/Ibuprofen/NSAIDs."
          ],
          [
            "Dung dịch Oresol (ORS chuẩn WHO)",
            "1500 - 2500 mL/ngày (uống rải rác từng ngụm nhỏ liên tục trong ngày)",
            "Pha đúng chuẩn 1 gói/1L nước chín. Không truyền dịch TM nếu tự uống được."
          ]
        ],

        // 📋 BẢNG 4 CỘT LỘ TRÌNH ĐIỀU TRỊ TỪNG NGÀY CỦA NHÁNH (TIMELINE PHASES)
        "timelinePhases": [
          {
            "id": "p1_mild_fever",
            "dayRange": "N1 - N3",
            "phaseName": "Giai đoạn Sốt cấp tính (Theo dõi ngoại trú)",
            "clinicalGoal": "Hạ sốt an toàn bằng Paracetamol đơn chất, bù nước điện giải đường uống đầy đủ, giáo dục nhận diện dấu hiệu cảnh báo.",
            "problems": [
              {
                "id": "p1_spec",
                "problemName": "Điều trị đặc hiệu",
                "problemType": "specific",
                "isNoSpecificTreatment": true,
                "treatments": [
                  {
                    "category": "ĐT Đặc hiệu",
                    "content": "Chưa có thuốc kháng vi rút Dengue đặc hiệu. Điều trị triệu chứng và bù dịch đường uống là chủ yếu."
                  }
                ],
                "monitoring": []
              },
              {
                "id": "p1_fever",
                "problemName": "Sốt cao & Đau đầu, đau mỏi cơ khớp",
                "problemType": "clinical",
                "treatments": [
                  {
                    "category": "Hạ sốt",
                    "content": "Paracetamol 10-15 mg/kg/lần khi sốt >= 38.5°C (q4-6h, max 60 mg/kg/24h hoặc 3g/24h). Lau mát bằng nước ấm.",
                    "isHighlighted": true
                  },
                  {
                    "category": "Chống chỉ định",
                    "content": "Tuyệt đối CẤM dùng Aspirin, Ibuprofen hoặc NSAIDs khác. CẤM tiêm bắp."
                  }
                ],
                "monitoring": [
                  {
                    "type": "LS",
                    "metric": "Thân nhiệt (T°)",
                    "frequency": "Mỗi 4 giờ",
                    "target": "Hạ sốt an toàn, tránh hạ nhiệt quá nhanh gây vã mồ hôi tụt áp"
                  }
                ]
              }
            ]
          }
          // ... Các phase tiếp theo của Nhánh 1 ...
        ]
      }
      // ... Nhánh 2, Nhánh 3 ...
    ]
  }
}
```

---

## ⚡ IV. NGUYÊN TẮC KẾ THỪA DỮ LIỆU (INHERITANCE RULE)

Để đảm bảo **không bao giờ bị trùng lặp dữ liệu**:
1. **Thông tin dùng chung (Global)**:
   * Chống chỉ định tuyệt đối (Ví dụ: cấm NSAIDs trong SXHD; cấm Macrolide đơn trị trong CAP nặng; cấm ức chế men chuyển khi hẹp ĐM thận 2 bên).
   * Lời dặn dò bệnh nhân chung (ngủ mùng, kiêng thức ăn màu đen/nâu, bù nước).
   * Tiêu chuẩn vàng khẳng định bệnh (NS1, RT-PCR, cấy máu, X-quang...).
   * **Bắt buộc ghi tại cấp Root của bệnh (`protocol.supportiveCare`, `clinicalCautions`)**.
2. **Thông tin đặc thù từng nhánh (Branch-Specific)**:
   * Loại dịch truyền và tốc độ truyền (Ngoại trú không truyền dịch; Nội trú truyền nấc thang `6 -> 3 -> 1.5 mL/kg/h`; ICU xả chống sốc `15-20 mL/kg/h` hoặc Cao phân tử).
   * Lựa chọn kháng sinh theo tuyến (Ngoại trú dùng Amoxicillin PO; Nội trú dùng Ceftriaxone IV; ICU phối hợp Levofloxacin + Vancomycin).
   * Tần suất theo dõi sinh hiệu và cận lâm sàng (Ngoại trú theo dõi q24h; Nội trú theo dõi q2-4h; ICU monitor liên tục q15-30p).
   * **Bắt buộc ghi bên trong từng nhánh tương ứng (`branches[i].drugs`, `branches[i].timelinePhases`)**.

---

## 🚦 V. QUY TRÌNH 4 BƯỚC BIÊN SOẠN BỆNH MỚI CHO 100+ BỆNH LÝ

### Bước 1: Thu thập Y văn & Guideline chính thống
* Thu thập Hướng dẫn chẩn đoán và điều trị của Bộ Y tế Việt Nam mới nhất, hoặc các guideline quốc tế uy tín (WHO, CDC, KDIGO, GINA, GOLD, AHA/ACC, IDSA...).

### Bước 2: Xác định Trục Phân Nhánh
Trả lời câu hỏi lâm sàng cốt lõi: *"Bệnh này bác sĩ ra quyết định điều trị dựa trên tiêu chí nào?"*
* Nếu bệnh nhân phân tuyến Ngoại trú vs Nội trú vs ICU dựa vào thang điểm → Chọn `axisType: "triage_score"`.
* Nếu bệnh nhân phân nấc thang theo mức độ đe dọa sinh mạng → Chọn `axisType: "severity"`.
* Nếu phân theo thể vi sinh / có mủ / không mủ → Chọn `axisType: "phenotype"`.
* Nếu bệnh mạn tính điều chỉnh bậc thuốc theo kiểm soát triệu chứng → Chọn `axisType: "treatment_step"`.

### Bước 3: Soạn Thảo Theo File Template Mẫu
* Mở tệp mẫu: [`tools/templates/protocol-branching-template.json`](file:///i:/Drive%20c%E1%BB%A7a%20t%C3%B4i/apps/Apps_ykhoa/tools/templates/protocol-branching-template.json).
* Điền đầy đủ các nhánh, tiêu chuẩn leo thang (`escalationCriteria`) và bảng 4 cột (`timelinePhases`).
* Lưu tệp JSON vào: `src/content/docspace/data/enriched/<ten_benh_slug>.json`.

### Bước 4: Chạy Lệnh Đồng Bộ & Kiểm Định Tự Động
Mở terminal và chạy lệnh master:
```bash
node tools/scripts/sync-clinical-db.mjs
```
Hệ thống sẽ:
1. Tự động kiểm tra cú pháp JSON.
2. Kiểm tra không có triệu chứng mồ côi (Zero-Orphan Symptoms).
3. Tự động liên kết vào CSDL `ENRICHED_DISEASES` và kiểm định tính hợp lệ trong chưa đầy 1 giây.

---

## 📋 VI. BẢNG KIỂM CHẤT LƯỢNG (QUALITY GATE CHECKLIST — 8/8 TIÊU CHÍ)

Trước khi bàn giao một phác đồ bệnh lý mới, người biên soạn phải kiểm tra:

- [ ] **Tiêu chí 1: Tính Đơn Nhất (Single Master Entity)**: Bệnh lý chỉ có 01 mã định danh chính (`icdCode`), không tạo nhiều file con cho từng phân độ.
- [ ] **Tiêu chí 2: Trục Phân Nhánh Đúng Bản Chất (`axisType`)**: Đã chọn đúng 1 trong 6 loại trục phân nhánh lâm sàng.
- [ ] **Tiêu chí 3: Tiêu Chuẩn Phân Nhánh Rõ Ràng (`criteria`)**: Mỗi nhánh đều có tiêu chuẩn lâm sàng và cận lâm sàng cụ thể để bác sĩ nhận diện bệnh nhân.
- [ ] **Tiêu chí 4: Tiêu Chuẩn Leo Thang (`escalationCriteria`)**: Đầy đủ dấu hiệu báo động đỏ để chuyển lên nhánh nặng hơn khi người bệnh diễn tiến xấu.
- [ ] **Tiêu chí 5: Tiêu Chuẩn Xuất Viện / Hạ Bậc (`dischargeCriteria`)**: Tiêu chuẩn an toàn để hạ bậc thuốc hoặc cho ra viện.
- [ ] **Tiêu chí 6: Bảng 4 Cột Chi Tiết (`timelinePhases`)**: Mỗi nhánh đều có lộ trình ngày điều trị, phân định rõ: Vấn đề LS — Y lệnh điều trị — Chỉ số theo dõi — Mục tiêu đạt được.
- [ ] **Tiêu chí 7: Không Hardcode Màu Sắc**: Dùng các token chuẩn (`emerald`, `amber`, `rose`, `blue`, `indigo`, `purple`).
- [ ] **Tiêu chí 8: Đồng Bộ CSDL Pass 100%**: Lệnh `node tools/scripts/sync-clinical-db.mjs` chạy thành công không báo lỗi.

---

## 💡 VII. KỸ THUẬT KHAI THÁC AI / NOTEBOOKLM CHO BỆNH LÝ ĐỒ SỘ (MASSIVE PROTOCOL INGESTION)

### 1. Thách thức kỹ thuật: Độ dài Output Token Limit
- Các mô hình AI hiện đại như NotebookLM (Gemini 1.5 Pro) có khả năng đọc hiểu (Context Window) lên tới 1 - 2 triệu tokens, dễ dàng hấp thụ toàn bộ văn bản Hướng dẫn dày hàng trăm trang của Bộ Y Tế.
- Tuy nhiên, **giới hạn độ dài xuất bản (Max Output Tokens)** của một câu trả lời trong giao diện chat thường chỉ đạt **4.000 – 8.000 tokens** (tương đương 400 – 600 dòng JSON).
- Với các mặt bệnh đồ sộ như **Sốt xuất huyết Dengue** (gồm 3 phân độ nặng, phác đồ dịch truyền từng giờ $15 \rightarrow 10 \rightarrow 7.5 \rightarrow 5 \rightarrow 3\text{ mL/kg/h}$, chỉ định truyền máu, xử trí xuất huyết tiêu hóa, toan kiềm, quá tải dịch...), tệp JSON hoàn chỉnh có thể vượt quá **1.400 dòng** (~80 KB).
- **Rủi ro khi ép sinh 1 lần**: AI sẽ bị cắt cụt giữa chừng (hỏng cú pháp JSON) hoặc tự ý tóm tắt lướt qua làm mất các chi tiết y lệnh quan trọng.

### 2. Hai Chiến Thuật Giải Quyết Đỉnh Cao:

#### 👉 Chiến Thuật A: Sinh Từng Nhánh (Branch-by-Branch Ingestion) — KHUYÊN DÙNG NHẤT
Nhờ kiến trúc Dynamic Branching đã module hóa các nhánh thành từng object độc lập trong mảng `branches: [ ... ]`, người biên soạn hãy chia quy trình thành 2 lượt chat trong cùng 1 Notebook:
1. **Lượt 1 (Khung Master & Các Nhánh Nhẹ/Vừa)**:
   - Dán [`01-prompt-phac-do-phan-nhanh.txt`](prompts/01-prompt-phac-do-phan-nhanh.txt) và thêm chỉ thị:
     > *"Hãy xuất khối JSON gồm phần thông tin chung Master, Tiêu chuẩn chẩn đoán criteria[] và chi tiết của Nhánh 1 (thể nhẹ/cổ điển) & Nhánh 2 (thể trung bình/có cảnh báo)."*
2. **Lượt 2 (Nhánh Cấp Cứu / ICU / Sốc Nặng)**:
   - Chat tiếp ngay trong Notebook đó:
     > *"Bây giờ hãy viết tiếp object JSON chi tiết cho Nhánh 3 (Sốc / Nặng / ICU) theo đúng cấu trúc branch, bảo đảm đầy đủ 100% y lệnh dịch truyền nấc thang, bảng 4 cột và y lệnh cấp cứu."*
3. **Ghép nối tệp**:
   - Copy object Nhánh 3 dán vào mảng `branches` của file JSON. Cực kỳ nhanh, giữ nguyên 100% chi tiết y khoa mà không lo bị cắt xén!

#### 👉 Chiến Thuật B: Kỹ Thuật Lệnh "Tiếp Tục" (Khi bị dừng ngang)
- Nếu đang chạy mà thấy AI dừng lại giữa chừng (chưa đóng ngoặc nhọn `}`):
- Tuyệt đối không yêu cầu AI viết lại từ đầu. Hãy gõ ngay vào khung chat:
  > *"tiếp tục viết tiếp đoạn mã JSON từ chỗ vừa dừng, không lặp lại đoạn trước"*
- AI sẽ viết tiếp phần đuôi còn lại $\rightarrow$ Bạn chỉ cần copy nối 2 đoạn lại thành file hoàn chỉnh.

