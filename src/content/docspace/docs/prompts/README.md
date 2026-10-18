# 🧭 CẨM NANG HƯỚNG DẪN BỘ PROMPT NẠP TRI THỨC DOCSPACE

> **Hệ sinh thái**: CliniPortal DocSpace MedLens Pro (Phiên bản v4.0 — Chuẩn EBM 2026)  
> **Mục tiêu**: Chuẩn hóa quy trình trích xuất và biến đổi Y văn (Guidelines Bộ Y tế, WHO, KDIGO, GINA, GOLD, IDSA...) thành **Dữ liệu Lâm sàng Tương tác (Interactive Clinical Intelligence)** vận hành trực tiếp Chu trình Lâm sàng 4 Bước và Kho Tri Thức Y Khoa.

---

## 🗺️ 1. Bản Đồ Lựa Chọn Prompt (Prompt Decision Matrix)

Để đạt hiệu quả cao nhất và tránh lãng phí thời gian, hãy xác định mục tiêu lâm sàng trước khi chọn Prompt:

```text
                                  BẠN MUỐN LÀM GÌ?
                                         │
     ┌───────────────────────────────────┼──────────────────────────────────┐
     ▼                                   ▼                                  ▼
[NẠP NHANH 1 BỆNH ĐƠN TRỤC]     [BỆNH PHỨC TẠP / ĐỒ SỘ]            [BỔ SUNG DỮ LIỆU ĐỘC LẬP]
(Cúm, Viêm amidan, Bàng quang...) (SXH Dengue, Viêm phổi, Sốc...)    (Triệu chứng, Ca bệnh, SOAP...)
     │                                   │                                  │
     ▼                                   ▼                                  ├─► Cần thêm ca SOAP thực chiến:
PROMPT 00: FAST-TRACK           CHUỖI CHUYÊN SÂU 6 BƯỚC:                    │   └─► PROMPT 03 (Markdown)
(1 lần dán ra cả Enriched       1. PROMPT 04 (Triệu chứng 12 hệ)            │
 JSON + Ca mẫu Bước 1)           2. PROMPT 05 (Kho Hội chứng)                ├─► Cần thêm ca mẫu thử nghiệm B1:
                                3. PROMPT 02a (Tiêu chuẩn & CDSS)          │   └─► PROMPT 02b (JSON)
                                4. PROMPT 01 (Phác đồ & Bảng 4 Cột)        │
                                5. PROMPT 02b (Ca lâm sàng mẫu)            ├─► Mở rộng từ điển triệu chứng:
                                6. PROMPT 03 (Hồ sơ ca thực chiến SOAP)    │   └─► PROMPT 04 (JSON)
                                                                            │
                                                                            └─► Bổ sung hội chứng lâm sàng:
                                                                                └─► PROMPT 05 (JSON)
```

---

## 📑 2. Danh Mục Toàn Diện 7 Prompt Chuyên Biệt

| STT | File Prompt | Mục Đích Lâm Sàng & Phân Hệ Vận Hành | Định Dạng | Nơi Lưu & Lệnh Nạp Tự Động |
| :---: | :--- | :--- | :---: | :--- |
| **00** | [`00-prompt-oneclick-all-in-one.txt`](./00-prompt-oneclick-all-in-one.txt) | **Nạp Nhanh 1-Chạm Toàn Diện (Fast-Track)**<br>• Dành cho bệnh lý vừa & nhỏ (đơn trục `single`)<br>• Xuất đồng thời 2 khối: Enriched JSON (Tiêu chuẩn + Phác đồ 6 Đầu mục + Bảng 4 cột + CDSS) và Ca mẫu Bước 1 | **JSON** | Khối 1: `data/enriched/<slug>.json`<br>Khối 2: Ghép vào `sample-clinical-cases.json` |
| **01** | [`01-prompt-phac-do-phan-nhanh.txt`](./01-prompt-phac-do-phan-nhanh.txt) | **Phác đồ Phân nhánh Lâm sàng & Đa Phương án Điều trị**<br>• Phân nhánh 6 trục (`severity`, `phenotype`, `triage_score`, `treatment_step`, `stage`, `comorbidity`)<br>• **Bảng 4 cột timeline theo ngày** & **6 Đầu Mục y lệnh chuẩn Bộ Y tế**<br>• Nấc thang kháng sinh (First-line, Alternative, Chỉnh liều eGFR, IV-to-PO switch) | **JSON** | `src/content/docspace/data/enriched/<slug>.json`<br>*(Vận hành trực tiếp Bước 4)* |
| **02a** | [`02a-prompt-tieu-chuan-chan-doan-cdss.txt`](./02a-prompt-tieu-chuan-chan-doan-cdss.txt) | **Tiêu Chuẩn Chẩn Đoán 5 Thành Phần & Ma Trận CDSS**<br>• Tiêu chuẩn vàng (`goldStandard`), luật chẩn đoán (`criteriaRule`)<br>• Danh sách tiêu chuẩn định lượng (`criteria[]` ngưỡng CLS/CĐHA)<br>• Hệ thống phân loại & Căn nguyên 5 thành phần<br>• **Ma trận trọng số suy luận CDSS Bước 3** (`dt`, `gy`, `ht`, `loaitru`) | **JSON** | `src/content/docspace/data/enriched/<slug>.json`<br>*(Vận hành trực tiếp Bước 3)* |
| **02b** | [`02b-prompt-ca-lam-sang-mau.txt`](./02b-prompt-ca-lam-sang-mau.txt) | **Ca Bệnh Lâm Sàng Mẫu Bước 1 (Sample Case Simulator)**<br>• Mô phỏng ca bệnh hoàn chỉnh (sinh hiệu `vitals`, xét nghiệm `labs`, triệu chứng chọn trước `selected`, bệnh sử 4 phần `form.text`)<br>• Hỗ trợ cả ca kinh điển (`essential`) và ca cạm bẫy lâm sàng (`pitfall`)<br>• Chẩn đoán đối soát mong đợi 5 thành phần (`expectedDiagnosis`) | **JSON** | Thêm vào `src/content/docspace/data/sample-clinical-cases.json`<br>*(Vận hành trực tiếp Bước 1)* |
| **03** | [`03-prompt-ho-so-ca-benh-soap.txt`](./03-prompt-ho-so-ca-benh-soap.txt) | **Hồ Sơ Ca Bệnh Thực Chiến SOAP v2 (Đa Phác Đồ & Ma Trận Điều Trị)**<br>• Định dạng SOAP Markdown Frontmatter YAML v2 chuẩn EBM quốc tế<br>• **Ma trận Phương án Điều trị Đa Guideline** (Bộ Y Tế, WHO, IDSA, ESCMID, BTS, AHA/ACC...) kèm trích dẫn nguồn `[Tổ chức, Năm]` trên từng dòng<br>• **Bảng thay thế khi cơ sở y tế thiếu thuốc**, Bảng hiệu chỉnh liều theo eGFR & Tiêu chuẩn xuống thang IV-to-PO<br>• **Bảng Đặt vấn đề 3 tầng gom Hội chứng** (PGS.TS Hoàng Văn Sĩ) & **4 Hạt ngọc lâm sàng** | **Markdown** | **Giao diện Web**: Nút *"Nạp ca từ NotebookLM"* trên Header<br>**CLI**: `data/ba/soap-<slug>-01.md`<br>Lệnh: `node tools/scripts/ingest-notebooklm-case.mjs` |
| **04** | [`04-prompt-trich-xuat-trieu-chung-symptoms.txt`](./04-prompt-trich-xuat-trieu-chung-symptoms.txt) | **Từ Điển Triệu Chứng Nguyên Tử (12 Hệ Cơ Quan)**<br>• Bóc tách toàn bộ triệu chứng đơn lẻ (cn, tt, cls, tc, dth, loaitru)<br>• Tự động phân bổ vào 12 file hệ cơ quan (`symptomsByFile`)<br>• Quy tắc tự suy định lượng (`map`) từ DHST & Xét nghiệm máu | **JSON** | Lưu tệp `.json` tạm rồi nạp:<br>`node tools/scripts/ingest-disease-symptoms.mjs <file.json>` |
| **05** | [`05-prompt-trich-xuat-hoi-chung.txt`](./05-prompt-trich-xuat-hoi-chung.txt) | **Kho Hội Chứng Lâm Sàng Chuẩn Hóa (Syndrome Vault)**<br>• Trích xuất tổ hợp hội chứng (`SyndromeDefinition`)<br>• Cơ chế bệnh sinh (`coChe`), triệu chứng thành phần (`trieuChung`), liên kết 2 chiều<br>• Hỗ trợ 2 chế độ: Hội chứng độc lập HOẶC Bộ hội chứng của một bệnh lý | **JSON** | `src/content/docspace/data/syndromes/<khoa>/<id>.json`<br>Đồng bộ: `node tools/scripts/build-syndrome-registry.mjs` |

---

## 🚀 3. Hướng Dẫn Thực Hành 5 Bước Với Google NotebookLM

### Bước 1: Chuẩn bị tài liệu nguồn trong Google NotebookLM
1. Truy cập [notebooklm.google.com](https://notebooklm.google.com).
2. Tạo Notebook mới (đặt tên theo bệnh lý, ví dụ: `[EBM] Sốt Xuất Huyết Dengue 2026`).
3. Tải lên tệp tài liệu chính thống: **Quyết định Hướng dẫn Chẩn đoán & Điều trị của Bộ Y tế** (hoặc Guideline quốc tế tương đương WHO, KDIGO, GINA).

### Bước 2: Tùy biến thông số đầu vào trong Prompt
Mở tệp Prompt cần dùng trong thư mục `src/content/docspace/docs/prompts/`, tìm khối **`[HƯỚNG DẪN ĐIỀN THÔNG SỐ]`** và điền thông tin cụ thể:
- `[TÊN BỆNH LÝ]`: Sốt xuất huyết Dengue
- `[MÃ ICD-10 GỐC]`: A97.1
- `[CHUYÊN KHOA]`: Truyền nhiễm
- `[MỨC ĐỘ KHẨN]`: urgent (hoặc emergency / routine)
- `[HƯỚNG DẪN THAM CHIẾU]`: Quyết định 2760/QĐ-BYT năm 2023 của Bộ Y tế
- `[SLUG FILE]`: sot_xuat_huyet_dengue

### Bước 3: Dán câu lệnh & Kỹ thuật xử lý khi dừng ngang
1. Sao chép toàn bộ khối **`📋 MẪU CÂU LỆNH YÊU CẦU NOTEBOOKLM THỰC HIỆN`** và dán vào ô chat của NotebookLM.
2. **Kỹ thuật xử lý khi AI dừng ngang (Continuation Technique)**:
   > Do giới hạn token của LLM, với các bệnh lớn (như SXH Dengue, Viêm phổi, Sốc), AI có thể dừng giữa chừng khi chưa kịp đóng ngoặc `}`.
   > **Cách xử lý**: Nhắn ngay câu lệnh sau vào ô chat:
   > 💬 *"tiếp tục viết tiếp đoạn mã JSON từ chỗ vừa dừng, không lặp lại đoạn trước, đảm bảo đóng đầy đủ ngoặc nhọn và ngoặc vuông hợp lệ."*
   > Sau đó ghép nối 2 phần lại thành một file JSON hoàn chỉnh.

### Bước 4: Kiểm tra nhanh chất lượng dữ liệu (Medical QA Gate)
Trước khi lưu file, kiểm tra nhanh 5 tiêu chí vàng:
- [ ] **Khử sạch HTML Entities**: Đảm bảo không còn ký tự `&gt;`, `&lt;`, `&quot;`, `&amp;` trong văn bản.
- [ ] **Toán tử & Đơn vị chuẩn**: Dùng `≥`, `≤`, `±`, `×`, `°C`, `µmol/L`, `mL/kg/h`, `G/L`.
- [ ] **Không dính chữ**: Mỗi y lệnh, mỗi chỉ số xét nghiệm phải nằm trên dòng riêng biệt.
- [ ] **Zero-Orphan Symptoms**: Các ID triệu chứng trong `symptomIds` và `dd` phải là tiếng Việt không dấu (snake_case) và đã có trong Từ điển Triệu chứng.
- [ ] **Cấu trúc 6 Đầu Mục & Bảng 4 Cột**: Phác đồ điều trị Bước 4 phải tuân thủ đúng 6 đầu mục lâm sàng, Cột 4 của Bảng 4 Cột là nơi duy nhất quản lý kế hoạch theo dõi LS & CLS theo ngày.

### Bước 5: Nạp dữ liệu vào Hệ sinh thái DocSpace
Có 2 phương thức nạp linh hoạt:
- **Phương thức 1: Nạp 1-Chạm qua Giao diện Web (Dành cho Ca SOAP)**:
  1. Mở DocSpace trên trình duyệt.
  2. Bấm nút **"Nạp ca từ NotebookLM"** trên Header (hoặc vào Sổ tay Kinh nghiệm SOAP).
  3. Dán toàn bộ nội dung Markdown sinh ra từ Prompt 03 -> Hệ thống tự động phân tích và lưu vào cơ sở dữ liệu!
- **Phương thức 2: Nạp bằng Lệnh CLI Tự Động (Dành cho CSDL & Developer)**:
  ```bash
  # Nạp triệu chứng mới vào 12 hệ cơ quan:
  node tools/scripts/ingest-disease-symptoms.mjs <file_trieu_chung.json>

  # Đồng bộ kho hội chứng:
  node tools/scripts/build-syndrome-registry.mjs

  # Nạp và đồng bộ hồ sơ ca SOAP:
  node tools/scripts/ingest-notebooklm-case.mjs src/content/docspace/data/ba/

  # Kiểm định và đồng bộ toàn diện CSDL:
  node tools/scripts/sync-clinical-db.mjs
  ```

---

## ⚡ 4. Chiến Thuật Xử Lý Bệnh Lý Đồ Sộ (SXH Dengue, Sốc Nhiễm Khuẩn...)

Với những mặt bệnh cực lớn có phác đồ dịch truyền nấc thang từng giờ hoặc nhiều phân tầng ICU, hãy áp dụng **Chiến thuật Sinh Từng Nhánh (Branch-by-Branch)** trong Prompt 01:
1. **Lượt 1**: Chat với NotebookLM:
   > *"Chỉ xuất phần Header chung, tiêu chuẩn criteria[] và Nhánh 1 (nhẹ/ngoại trú) + Nhánh 2 (có cảnh báo/nội trú)"*.
2. **Lượt 2**: Chat tiếp trong cùng hội thoại:
   > *"Bây giờ hãy viết tiếp object JSON chi tiết cho Nhánh 3 (Nặng / Sốc / ICU) gồm Bảng 4 Cột và phác đồ dịch truyền nấc thang"*.
3. **Ghép nối**: Dán object của Nhánh 3 vào mảng `branches: [ ... ]` của file JSON.

---

## 📐 5. Quy Chuẩn Viết Tắt & Nhãn Y Khoa Chuẩn Mực

- **Sinh hiệu & Tri giác**: `HA`, `HATT`, `HATTr`, `M`, `NT`, `SpO₂` (chữ O hoa, chỉ số dưới ₂), `CRT`, `GCS`, `BMI`.
- **Huyết học & Đông máu**: `Hct` (chữ H hoa, ct thường), `PLT`, `WBC`, `RBC`, `Hb`, `INR`, `aPTT`, `Fibrinogen`.
- **Hóa sinh & Miễn dịch**: `AST`, `ALT`, `eGFR` (chữ e thường), `Cr`, `CRP`, `PCT`, `Troponin hs`, `KMĐM`.
- **Chẩn đoán hình ảnh**: `XQ`, `SA`, `CT`, `MRI`, `ECG`.
- **Y lệnh & Dược học**: `IV`, `PO`, `SC`, `IM`, `TTM`, `Bolus`, `q1h`, `q2h`, `q4h`, `q6h`, `q8h`, `STAT`.
- **Lược bỏ tiền tố thừa**: Tên tiêu chuẩn phải đi thẳng vào dấu chứng lâm sàng và ngưỡng số. Ví dụ: Dùng `"Hct tăng ≥ 20%"` thay vì `"[Xét nghiệm]: Hct tăng ≥ 20%"`.

---

## 🛠️ 6. Bảng Tra Cứu Lệnh CLI Hỗ Trợ Toàn Hệ Thống

| Lệnh Thực Thi | Mục Đích & Phạm Vi Xử Lý |
| :--- | :--- |
| `node tools/scripts/sync-clinical-db.mjs` | **Kiểm định & Đồng bộ toàn diện**: Rà soát file enriched, cập nhật metadata, liên kết CDSS Bước 3 |
| `node tools/scripts/ingest-disease-symptoms.mjs <file.json>` | Nạp và tự động phân loại triệu chứng vào 12 hệ cơ quan, tự động lọc trùng ID |
| `node tools/scripts/build-syndrome-registry.mjs` | Quét thư mục `data/syndromes/`, tự động tạo registry và danh mục tra cứu 2 chiều |
| `node tools/scripts/ingest-notebooklm-case.mjs [path]` | Phân tích cú pháp file Markdown SOAP và đồng bộ vào Knowledge Vault |
| `node tools/scripts/bundle-clinical-rules.mjs` | Đóng gói từ điển triệu chứng & luật CDSS thành bundle tĩnh phục vụ chạy offline |
| `node tools/qa/docspace-clinical-data-linter.mjs` | Quét lỗi HTML entities, tiền tố giao diện thừa và phát hiện biến thể triệu chứng trùng lặp |
