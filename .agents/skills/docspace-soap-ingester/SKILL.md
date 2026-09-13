---
name: docspace-soap-ingester
description: >
  Kỹ năng chuyên sâu tiếp nhận, phân tích cú pháp và tích hợp Hồ sơ Ca bệnh Lâm sàng Thực chiến SOAP Markdown (Prompt 07) vào CliniPortal DocSpace.
  Kích hoạt khi AI cần: nạp ca bệnh SOAP mới từ NotebookLM, bóc tách cấu trúc S-O-A-P, đồng bộ catalog thực hành (vault-catalog-thuc-hanh.json, vault-catalog.json),
  vận hành ingest-notebooklm-case.mjs, và kết nối ca thực chiến vào Mục 9 Bước 4 cũng như Sổ tay Kinh nghiệm SOAP.
---

# DocSpace SOAP Ingester Skill (Prompt 07 Specialist)

Tài liệu này định nghĩa cấu trúc chuẩn mực, cơ chế phân tích cú pháp và quy trình nạp tự động **Hồ sơ ca bệnh lâm sàng thực chiến SOAP Markdown** (Prompt 07) vào hệ thống **CliniPortal DocSpace** và **Kho Bệnh án Knowledge Vault** (`src/content/knowledge-vault/ba/`).

---

## 🏛️ 1. Vai Trò Của Ca Thực Chiến SOAP Trong DocSpace

Khác với ca mẫu ngắn ở Bước 1 (dùng để mô phỏng tính xác suất), **Hồ sơ ca bệnh SOAP Markdown** là tư liệu đối chiếu lâm sàng chuyên sâu, được hiển thị tại 2 phân hệ:
1. **Phân hệ 1 (Chu trình lâm sàng) — Bước 4 Mục 9**:
   - Tự động liên kết hiển thị ca thực chiến có cùng chẩn đoán hoặc cùng chuyên khoa.
   - Cung cấp 4 bài học đúc kết lâm sàng cốt lõi (`historyPearls`, `objectivePitfalls`, `diagnosticPearls`, `takeawayLessons`).
   - Cung cấp **Prompt AI Hội chẩn tại giường bệnh** để bác sĩ sao chép tham vấn nhanh.
2. **Phân hệ 2 (Sổ tay Kinh nghiệm Lâm sàng SOAP)**:
   - Hub riêng biệt hiển thị toàn bộ các ca bệnh lâm sàng đã nạp, có bộ lọc theo mức độ khó, phân chuyên khoa, tìm kiếm triệu chứng và đối soát đa chiều.

---

## 📝 2. Chuẩn Frontmatter YAML Cho File SOAP Markdown

Mỗi ca bệnh lưu tại `src/content/knowledge-vault/ba/soap-<slug>-01.md` phải có phần Frontmatter chuẩn hóa:

```markdown
---
title: "Ca lâm sàng Viêm màng não vi khuẩn cấp do Não mô cầu ở bệnh nhân Nam 23 tuổi"
caseId: "soap-viem_mang_nao_vi_khuan-01"
specialty: "Truyền nhiễm"
experienceLevel: "essential"
difficultyRating: 3
authorDoctor: "Hội đồng Khoa học CliniPortal DocSpace"
icd10:
  - "G00.9"
  - "A39.0"
tags:
  - "Truyền nhiễm"
  - "Viêm màng não"
  - "SOAP"
demographicContext: "Nam 23 tuổi, quân nhân, sinh hoạt tập thể, nhập viện vì sốt cao đột ngột, cứng gáy, lơ mơ và tử ban hoại tử da ngày 2"
historyPearls: "⚡ BÀI HỌC KHAI THÁC BỆNH SỬ: Luôn chủ động tìm kiếm các triệu chứng cảnh báo sớm của nhiễm Não mô cầu như đau rát họng, đau mỏi cơ chân nghiêm trọng, sốt rét run cấp tính và sự xuất hiện ban đầu của các chấm xuất huyết nhỏ màu đỏ tím trước khi chuyển thành tử ban hoại tử bản đồ."
objectivePitfalls: "⚠️ BẪY CẬN LÂM SÀNG & KHÁM: Dấu hiệu cứng gáy, Kernig và Brudzinski có độ nhạy không cao (chỉ khoảng 50-60%), việc không thấy cứng gáy KHÔNG ĐƯỢC dùng để loại trừ viêm màng não. Ngoài ra, việc soi Gram hoặc cấy DNT có thể âm tính giả nếu bệnh nhân đã dùng 1 liều kháng sinh trước đó, khi đó Real-time PCR DNT/máu là công cụ cứu cánh quyết định."
diagnosticPearls: "🧠 ĐÚC KẾT BIỆN LUẬN: Sự kết hợp giữa Tam chứng lâm sàng (Sốt + Cứng gáy + Rối loạn tri giác), Tử ban hoại tử da đặc trưng và DNT đục mủ với biến đổi sinh hóa Neutrophil > 80%, Protein tăng cao, Glucose DNT/máu < 0.2 cho phép khẳng định Viêm màng não vi khuẩn cấp ngay tại giường bệnh trước khi có kết quả vi sinh."
takeawayLessons: "🎯 BÀI HỌC KINH NGHIỆM ĐIỀU TRỊ: 'Thời gian là não' — Bắt buộc phải tiêm kháng sinh tĩnh mạch phổ rộng liều cao (Ceftriaxone + Vancomycin) kết hợp Dexamethasone IV trong vòng 1 giờ vàng đầu tiên. Tuyệt đối không hoãn kháng sinh để chờ chụp CT sọ não hoặc chọc dò tủy sống nếu người bệnh có dấu hiệu tăng áp lực nội sọ nặng hoặc sốc."
---
```

---

## 🧩 3. Bốn Khối Nội Dung Thân Bài (S - O - A - P)

Thân bài Markdown bên dưới Frontmatter phải tuân thủ nghiêm ngặt 4 phân mục kinh điển:

```markdown
# I. SUBJECTIVE (BỆNH SỬ & LÝ DO ĐẾN KHÁM)
## 1. Lý do vào viện
Sốt cao rét run 39.5°C, đau đầu dữ dội không giảm với thuốc hạ sốt, nôn vọt 3 lần, cứng gáy và lơ mơ tiếp xúc chậm.

## 2. Bệnh sử (Diễn tiến theo mốc thời gian)
* **Ngày 1**: Bệnh nhân khởi phát đột ngột với cảm giác đau rát họng...
* **Ngày 2 (Ngày vào viện)**: Sốt cao liên tục 39.5°C...

## 3. Tiền sử
* **Tiền sử bản thân**: Khỏe mạnh, chưa ghi nhận dị ứng thuốc...
* **Dịch tễ**: Sinh hoạt tập thể tại đơn vị quân đội...

---

# II. OBJECTIVE (THĂM KHÁM THỰC THỂ & CẬN LÂM SÀNG)
## 1. Dấu hiệu sinh tồn lúc vào viện
* Mạch: 118 lần/phút
* Huyết áp: 90/60 mmHg
* Thân nhiệt: 39.5 °C
* Nhịp thở: 24 lần/phút
* SpO2: 95 % (khí trời)
* BMI: 21.8 kg/m²

## 2. Khám lâm sàng theo hệ cơ quan
* **Toàn thân**: Bệnh nhân lơ mơ, Glasgow 12 điểm (E3V4M5)...
* **Thần kinh**: Cứng gáy (+), Kernig (+), Brudzinski (+)...

## 3. Kết quả cận lâm sàng
* **Công thức máu**: WBC 22.4 G/L (Neutrophil 89.5%), PLT 55 G/L...
* **Dịch não tủy (CSF)**: DNT đục mủ, Áp lực mở 280 mmH2O...

---

# III. ASSESSMENT (CHẨN ĐOÁN & BIỆN LUẬN LÂM SÀNG)
## 1. Chẩn đoán xác định
Viêm màng não vi khuẩn cấp do Não mô cầu (*Neisseria meningitidis*) biến chứng Tăng áp lực nội sọ & Nhiễm khuẩn huyết / Tiền sốc (Ngày 2 của bệnh).

## 2. Mã bệnh ICD-10
* G00.9: Viêm màng não vi khuẩn, không phân loại nơi khác
* A39.0: Viêm màng não do Não mô cầu

## 3. Chẩn đoán phân biệt & Biện luận loại trừ
* **Sốc nhiễm khuẩn do Não mô cầu thể thuần túy**: Loại trừ vì...
* **Viêm màng não do Phế cầu**: Loại trừ do...

## 4. Phân tầng nguy cơ & Thang điểm cảnh báo sớm
* **NEWS2**: 10 điểm (Thân nhiệt 2đ, HATT 3đ, Mạch 2đ, Thở 2đ, Tri giác 1đ) ➔ Nguy cơ cấp cứu rất cao.

---

# IV. PLAN (KẾ HOẠCH ĐIỀU TRỊ & XỬ TRÍ)
## 1. Xử trí cấp cứu ban đầu
* Đặt bệnh nhân nằm nghiêng an toàn, nâng đầu cao 30 độ...

## 2. Y lệnh thuốc cụ thể
* **Dexamethasone 10 mg**:
  * Liều dùng: 10 mg tiêm tĩnh mạch chậm trước hoặc cùng lúc liều kháng sinh đầu tiên.
* **Ceftriaxone 2 g**:
  * Liều dùng: 2 g tiêm tĩnh mạch mỗi 12 giờ (tổng liều 4g/ngày).
* **Vancomycin 1 g**:
  * Liều dùng: 15-20 mg/kg truyền tĩnh mạch mỗi 8-12 giờ.

## 3. Kế hoạch theo dõi & Mục tiêu điều trị
* Đo sinh hiệu, đánh giá Glasgow và phản xạ đồng tử mỗi 1 giờ...

## 4. Hội chẩn chuyên khoa & Chuyển tuyến
* Báo động đỏ Hồi sức tích cực (ICU) và Bác sĩ Truyền nhiễm...
```

---

## ⚙️ 4. Quy Tắc Phân Tích Cú Pháp Linh Hoạt (Parser Robustness)

Script `tools/scripts/ingest-notebooklm-case.mjs` được trang bị parser nâng cao, có khả năng xử lý linh hoạt:
1. **Cấp độ Tiêu đề**: Chấp nhận mọi cấp độ markdown từ `##` đến `####` cho các tiểu mục (ví dụ: `## 1. Dấu hiệu sinh tồn` hoặc `### 1. Dấu hiệu sinh tồn`).
2. **Ký tự Bullet**: Hỗ trợ đồng thời cả dấu gạch đầu dòng (`-`) lẫn dấu sao hoa thị (`*`).
3. **Bóc tách Y lệnh thuốc đa tầng**: Nhận diện tên thuốc in đậm (`* **Tên thuốc**:`) và trích xuất các dòng liều lượng thụt lề bên dưới.

---

## 🚀 5. Thao Tác Nạp Ca Bằng Script Tự Động

Khi có nội dung ca bệnh SOAP Markdown mới:
1. Lưu file vào: `src/content/knowledge-vault/ba/soap-<slug>-01.md`.
2. Chạy lệnh:
   ```powershell
   node tools/scripts/ingest-notebooklm-case.mjs src/content/knowledge-vault/ba/soap-<slug>-01.md
   ```
3. Script sẽ tự động:
   - Bóc tách toàn bộ 4 khối S-O-A-P và các bài học lâm sàng.
   - Bổ sung/Cập nhật mục vào `src/content/knowledge-vault/data/vault-catalog-thuc-hanh.json`.
   - Cập nhật master catalog `src/content/knowledge-vault/data/vault-catalog.json`.
   - Đồng bộ tự động sang `src/content/docspace/src/data/` để giao diện web hiển thị ngay lập tức mà không cần reload server.

---

## 🔍 6. Kiểm Tra Hiển Thị Trên Giao Diện DocSpace

Sau khi nạp ca thành công, kiểm tra trên web DocSpace:
- **Tại Bước 4 (Phác đồ)**: Chọn đúng bệnh lý tương ứng $\rightarrow$ Cuộn xuống **Mục 9 (Ca thực chiến & Sổ tay SOAP)** $\rightarrow$ Ca bệnh mới nạp phải xuất hiện trong danh sách ca tương tự kèm nút xem chi tiết.
- **Tại Tab Header "SOAP Hub"**: Ca bệnh hiển thị trong danh bạ ca lâm sàng với đầy đủ badge chuyên khoa, độ khó và sinh hiệu.
- **Chạy lệnh kiểm định**:
  ```powershell
  node tools/scripts/docspace-disease-audit.mjs <slug>
  ```
  Tiêu chí số 8 phải trả về **PASS**.
