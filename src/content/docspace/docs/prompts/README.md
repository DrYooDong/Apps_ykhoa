# 🧭 HƯỚNG DẪN SỬ DỤNG BỘ PROMPT NẠP TRI THỨC DOCSPACE

> **Phân hệ**: CliniPortal DocSpace MedLens  
> **Mục tiêu**: Trích xuất và chuẩn hóa tri thức y khoa từ tài liệu nguồn (Guidelines Bộ Y tế, WHO, KDIGO, GINA, Gold Standards) qua **Google NotebookLM / LLM** để nạp trực tiếp vào Chu trình Lâm sàng 4 Bước và Kho Dữ liệu.

---

## 📑 1. Danh Mục Các Prompt Chuyên Biệt

| STT | File Prompt | Vai Trò Lâm Sàng & Nội Dung Sinh Ra | Định Dạng | Nơi Lưu & Lệnh Nạp Tự Động |
| :---: | :--- | :--- | :---: | :--- |
| **01** | [`01-prompt-phac-do-phan-nhanh.txt`](./01-prompt-phac-do-phan-nhanh.txt) | **Phác đồ Phân nhánh Lâm sàng & Đa Phương án Điều trị**<br>• Phân nhánh 6 trục (`severity`, `phenotype`, `triage_score`, `treatment_step`, `stage`, `comorbidity`)<br>• Bảng 4 cột timeline theo ngày, 6 đầu mục y lệnh<br>• Kháng sinh bậc 1/thay thế/phối hợp, chỉnh liều eGFR, IV-to-PO, DDI | **JSON** | `src/content/docspace/data/enriched/<slug>.json`<br>*(Vận hành Bước 3 & Bước 4)* |
| **02a** | [`02a-prompt-tieu-chuan-chan-doan-cdss.txt`](./02a-prompt-tieu-chuan-chan-doan-cdss.txt) | **Tiêu Chuẩn Chẩn Đoán Xác Định & Ma Trận Trọng Số CDSS**<br>• Tiêu chuẩn vàng (`goldStandard`), luật chẩn đoán (`criteriaRule`)<br>• Tiêu chuẩn định lượng (`criteria[]` theo ngưỡng xét nghiệm/CĐHA)<br>• Ma trận trọng số suy luận (`dt`, `gy`, `ht`, `loaitru`) | **JSON** | `src/content/docspace/data/enriched/<slug>.json` & `data/diseases/<khoa>.json`<br>*(Vận hành Bước 3)* |
| **02b** | [`02b-prompt-ca-lam-sang-mau.txt`](./02b-prompt-ca-lam-sang-mau.txt) | **Ca Bệnh Lâm Sàng Mẫu Bước 1 (Sample Case Simulator)**<br>• Ca bệnh mô phỏng hoàn chỉnh cho thể bệnh điển hình<br>• Sinh hiệu (`vitals`), xét nghiệm ban đầu (`labs`), triệu chứng chọn sẵn (`selected/sel`) và loại trừ (`negated`), bệnh sử 4 phần (`form.text`) | **JSON** | Thêm vào `src/content/knowledge-vault/data/sample-clinical-cases.json`<br>*(Vận hành Bước 1)* |
| **03** | [`03-prompt-ho-so-ca-benh-soap.txt`](./03-prompt-ho-so-ca-benh-soap.txt) | **Hồ Sơ Ca Bệnh Thực Chiến SOAP & Hạt Ngọc Lâm Sàng**<br>• Định dạng SOAP chuẩn EBM quốc tế (`authorDoctor: "BS. YooDong"`)<br>• Bảng Đặt vấn đề 3 tầng (trường phái PGS.TS Hoàng Văn Sĩ)<br>• 4 Hạt ngọc lâm sàng (Pearls & Pitfalls), Plan dùng thuốc chi tiết | **Markdown** | **Web**: Nút *"Nạp ca từ NotebookLM"* trên Header<br>**CLI**: `src/content/docspace/data/ba/soap-<slug>-01.md`<br>Chạy `node tools/scripts/ingest-notebooklm-case.mjs` |
| **04** | [`04-prompt-trich-xuat-trieu-chung-symptoms.txt`](./04-prompt-trich-xuat-trieu-chung-symptoms.txt) | **Từ Điển Triệu Chứng 12 Hệ Cơ Quan & Hội Chứng Đi Kèm**<br>• Trích xuất triệu chứng (cn, tt, cls, tc, dth) kèm quy tắc ánh xạ `map`<br>• Phân bổ vào 12 file hệ cơ quan (`symptoms/*.json`)<br>• Xuất kèm hội chứng lâm sàng đặc trưng của bệnh | **JSON** | Lưu file tạm `.json` rồi nạp:<br>`node tools/scripts/ingest-disease-symptoms.mjs <file.json>` |
| **05** | [`05-prompt-trich-xuat-hoi-chung.txt`](./05-prompt-trich-xuat-hoi-chung.txt) | **Kho Hội Chứng Lâm Sàng Độc Lập (Syndrome Vault)**<br>• Trích xuất hội chứng kinh điển độc lập (VD: HC Thận hư, HC Đông đặc...)<br>• Cơ chế bệnh sinh, tiêu chuẩn chẩn đoán, chẩn đoán phân biệt | **JSON** | `src/content/docspace/data/syndromes/<khoa>/<id>.json`<br>Đồng bộ: `node tools/scripts/build-syndrome-registry.mjs` |

---

## 🔄 2. Quy Trình Biên Soạn Bệnh Lý Thực Chiến

```text
Tài liệu Y văn / Guidelines (Bộ Y tế, WHO, KDIGO...)
   │
   ├─► [Nếu có Triệu chứng / Hội chứng mới]
   │     └─► Chạy PROMPT 04 (hoặc 05) ──► Nạp từ điển triệu chứng & hội chứng
   │
   ├─► Bước 1: Chạy PROMPT 02 ──────────► Tiêu chuẩn chẩn đoán & Ma trận CDSS
   │
   ├─► Bước 2: Chạy PROMPT 02b ─────────► Ca lâm sàng mẫu Bước 1 (thử nghiệm CDSS)
   │
   ├─► Bước 3: Chạy PROMPT 01 ──────────► Phác đồ phân nhánh 6 trục & Y lệnh thuốc
   │
   ├─► Bước 4: Chạy PROMPT 03 ──────────► Hồ sơ ca bệnh thực chiến SOAP
   │
   └─► Bước 5: Chạy Lệnh Đồng Bộ ───────► node tools/scripts/sync-clinical-db.mjs
```

### Chi tiết các bước thực hiện:

1. **Chuẩn bị nguồn (NotebookLM)**: Tải tài liệu hướng dẫn điều trị chính thức vào NotebookLM.
2. **Rà soát triệu chứng (Prompt 04 / 05)**:
   - Dán Prompt 04 vào NotebookLM để lấy từ điển triệu chứng và hội chứng liên quan.
   - Chạy `node tools/scripts/ingest-disease-symptoms.mjs <file.json>` để tự động lọc trùng và phân loại vào 12 hệ cơ quan.
3. **Tiêu chuẩn chẩn đoán & Ma trận CDSS (Prompt 02)**:
   - Dán Prompt 02 để trích xuất Tiêu chuẩn vàng, quy tắc chẩn đoán định lượng và ma trận trọng số suy luận `dd` (`dt`, `gy`, `ht`, `loaitru`).
4. **Ca lâm sàng mẫu Bước 1 (Prompt 02b)**:
   - Dán Prompt 02b để sinh 01 ca bệnh mẫu hoàn chỉnh (sinh hiệu, xét nghiệm, triệu chứng chọn trước).
   - Thêm vào file `sample-clinical-cases.json` để kiểm thử xem CDSS Bước 3 có gợi ý đúng bệnh hay không.
5. **Xây dựng phác đồ điều trị (Prompt 01)**:
   - Điền thông tin bệnh lý ở đầu Prompt 01.
   - Nhận JSON phác đồ phân nhánh, lưu vào `src/content/docspace/data/enriched/<slug>.json` (ghép với khối tiêu chuẩn từ Prompt 02).
6. **Tạo ca thực chiến SOAP (Prompt 03)**:
   - Dán Prompt 03 để sinh hồ sơ ca SOAP dạng Markdown.
   - Nạp trực tiếp qua nút **"Nạp ca từ NotebookLM"** trên giao diện Web, hoặc lưu vào `data/ba/` rồi chạy script nạp.
7. **Kiểm định & Đồng bộ**:
   ```bash
   node tools/scripts/bundle-clinical-rules.mjs
   node tools/scripts/sync-clinical-db.mjs
   ```

---

## ⚡ 3. Chiến Thuật Xử Lý Bệnh Lý Đồ Sộ (Tránh Cụt Dữ Liệu)

> [!WARNING]
> NotebookLM đọc được tài liệu dài hàng trăm trang nhưng **output giới hạn ~4.000 - 8.000 tokens** (400 - 600 dòng JSON). Với bệnh lớn (SXH Dengue, Sốc nhiễm khuẩn, Viêm tụy cấp nặng), file JSON hoàn chỉnh có thể vượt 1.000 dòng.

Áp dụng 2 chiến thuật sau để không bị mất dữ liệu:

1. **Chiến thuật Sinh Từng Nhánh (Branch-by-Branch - Khuyên dùng)**:
   - **Lượt 1**: Dán Prompt 01 và yêu cầu: *"Chỉ xuất phần Header chung, tiêu chuẩn criteria[] và Nhánh 1 (nhẹ) + Nhánh 2 (cảnh báo)"*.
   - **Lượt 2**: Chat tiếp: *"Bây giờ hãy viết tiếp object JSON chi tiết cho Nhánh 3 (Nặng / Sốc / ICU) gồm bảng 4 cột và y lệnh dịch truyền"*.
   - **Ghép nối**: Dán object Nhánh 3 vào mảng `branches: [ ... ]` của file JSON.
2. **Lệnh "Tiếp Tục" khi dừng ngang**:
   - Nếu AI ngắt giữa chừng (chưa đóng ngoặc `}`), nhắn ngay:
     > *"Tiếp tục viết tiếp đoạn mã JSON từ chỗ vừa dừng, không lặp lại đoạn trước."*

---

## 📐 4. Quy Chuẩn Dữ Liệu Bắt Buộc

- **Ký hiệu toán học & SI**: Dùng `≥`, `≤`, `±`, `×` (không dùng `>=`, `<=`, `+/-`). Đơn vị: `°C`, `µmol/L`, `mL/kg/h`, `G/L` (thay vì `/mm³`).
- **Khử rò rỉ HTML Entities**: Viết trực tiếp `>`, `<`, `"`, `&` trong JSON/Markdown. Tuyệt đối không để sót `&gt;`, `&lt;`, `&quot;`, `&amp;`.
- **Viết tắt y khoa chuẩn mực**:
  - Sinh hiệu: `HA`, `HATT`, `HATTr`, `M`, `NT`, `SpO₂` (chữ O hoa, chỉ số dưới ₂), `CRT`, `GCS`.
  - Huyết học: `Hct` (H hoa, ct thường), `PLT`, `WBC`, `RBC`, `Hb`, `INR`.
  - Hóa sinh: `AST`, `ALT`, `eGFR` (e thường, GFR hoa), `Cr`, `CRP`, `PCT`.
  - Cận lâm sàng: `XQ`, `SA`, `CT`, `MRI`, `ECG`, `KMĐM`.
  - Đường dùng: `IV`, `PO`, `SC`, `IM`, `TTM`, `q6h`, `q8h`, `STAT`.
- **Nhãn trực diện**: Lược bỏ tiền tố rườm rà như `[Lâm sàng]:`, `[Xét nghiệm]:`. Tên tiêu chuẩn phải đi thẳng vào ngưỡng định lượng (VD: `Hct tăng ≥ 20%`, `Tiểu cầu < 100 G/L`).

---

## 🛠️ 5. Bảng Tra Cứu Lệnh CLI Hỗ Trợ

| Lệnh Thực Thi | Mục Đích |
| :--- | :--- |
| `node tools/scripts/sync-clinical-db.mjs` | **Audit & đồng bộ toàn diện CSDL**: Rà soát file enriched, liên kết CDSS, cập nhật metadata |
| `node tools/scripts/ingest-disease-symptoms.mjs <file.json>` | Nạp và tự động phân loại triệu chứng vào 12 hệ cơ quan, khử trùng lặp |
| `node tools/scripts/build-syndrome-registry.mjs` | Quét thư mục `data/syndromes/`, tự động tạo registry và danh mục tra cứu 2 chiều |
| `node tools/scripts/ingest-notebooklm-case.mjs [path]` | Phân tích cú pháp file Markdown SOAP và đồng bộ vào Knowledge Vault |
| `node tools/scripts/bundle-clinical-rules.mjs` | Đóng gói từ điển triệu chứng & luật CDSS thành bundle tĩnh chạy offline |
