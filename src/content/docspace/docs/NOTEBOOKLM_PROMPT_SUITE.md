# 📘 CẨM NANG HƯỚNG DẪN BIÊN SOẠN & NẠP DỮ LIỆU KNOWLEDGE VAULT TỪ NOTEBOOKLM

> **Dành cho Bác sĩ & Chuyên gia biên soạn nội dung CliniPortal**  
> *Áp dụng ưu tiên cho 4 Kho Tri thức Cốt lõi: Chẩn đoán (`CD`), Phác đồ điều trị (`PDDT`), Dịch tễ học (`DTH`) và Yếu tố nguy cơ (`YTNC`).*

---

## 🎯 1. TỔNG QUAN QUY TRÌNH NẠP TRI THỨC

Hệ sinh thái **CliniPortal** và trung tâm phân tích ca bệnh lâm sàng **DocSpace** vận hành dựa trên cơ sở dữ liệu tri thức chuẩn hóa tại thư mục `knowledge-vault/`. Để dữ liệu đạt độ chính xác lâm sàng cao nhất, chuẩn Y học chứng cứ (EBM) và có thể tự động liên kết với ca bệnh, quy trình biên soạn được chuẩn hóa qua **Google NotebookLM** kết hợp bộ prompt có cấu trúc:

```
[TÀI LIỆU NGUỒN UY TÍN]
(Guidelines BYT, ESC, AHA, KDIGO, GBD, UpToDate, Sách giáo khoa)
        │
        ▼
[GOOGLE NOTEBOOKLM PROJECT]
(Cài đặt Master System Instruction + Tải lên file PDF nguồn)
        │
        ▼
[CHỌN PROMPT CHUYÊN BIỆT THEO KHO]
(01-CD, 02-PDDT, 03-DTH, hoặc 04-YTNC)
        │
        ▼
[XUẤT BẢN FILE MARKDOWN (.md)]
(Lưu vào đúng thư mục chuyên khoa trong knowledge-vault/)
        │
        ▼
[ĐỒNG BỘ 1-CLICK VÀO HỆ THỐNG]
(node tools/scripts/build-vault-catalog.js)
```

---

## 📂 2. BẢNG TRA CỨU ĐÍCH ĐẾN & QUY TẮC ĐẶT TÊN FILE

Mỗi kho tri thức có tiền tố (Prefix) định danh riêng và cấu trúc thư mục con theo chuyên khoa:

| Kho Tri Thức | Mã Định Danh | Thư Mục Đích Trong `knowledge-vault/` | Quy Tắc Đặt Tên File | Prompt Tương Ứng |
|:---|:---:|:---|:---|:---:|
| **Kho Chẩn Đoán**<br>*(Lâm sàng, Cận lâm sàng, Tiêu chuẩn vàng, Tiêu chuẩn xác định, Chẩn đoán phân biệt)* | `CD` | `knowledge-vault/2.3. Kho chẩn đoán/{Chuyên khoa}/` | `CD_{Tên bệnh}_P1.md`<br>*(hoặc P1, P2, P3)* | `01-prompt-cd-chan-doan.txt` |
| **Phác Đồ Điều Trị**<br>*(Phân tầng độ nặng, Bảng kê thuốc & liều lượng, Hồi sức giờ vàng)* | `PDDT` | `knowledge-vault/2.4. Kho phác đồ điều trị/{Chuyên khoa}/` | `PDDT_{Tên bệnh}_P1.md` | `02-prompt-pddt-phac-do.txt` |
| **Dịch Tễ Học Lâm Sàng**<br>*(GBD, Morbidity, CFR, DALYs, Vùng lưu hành VN, Tam giác DTH, Vector)* | `DTH` | `knowledge-vault/1.4. Kho dịch tễ học/{Chuyên khoa}/` | `DTH_{Tên bệnh}_P1.md` | `03-prompt-dth-dich-te.txt` |
| **Yếu Tố Nguy Cơ**<br>*(OR, RR, PAR%, Mô hình SCORE2/ASCVD, Risk Enhancers, Dự phòng)* | `YTNC` | `knowledge-vault/1.5. Kho yếu tố nguy cơ/{Chuyên khoa}/` | `YTNC_{Tên bệnh}_P1.md` | `04-prompt-ytnc-nguy-co.txt` |
| **Dược Thư & Tương Tác Thuốc**<br>*(Dược động học, Bảng liều eGFR/gan, Blackbox warnings, Live DDI)* | `DUOC` | `knowledge-vault/3.2. Kho dược thư & tương tác thuốc/` | `DUOC_{Tên thuốc}_P1.md` | `05-prompt-duoc-duoc-thu.txt` |
| **Biến Chứng Bệnh Học**<br>*(Biến chứng cấp/mạn, Cờ đỏ sinh hiệu, Cấp cứu khẩn, Dự phòng)* | `BC` | `knowledge-vault/2.5. Kho biến chứng/{Chuyên khoa}/` | `BC_{Tên bệnh}_P1.md` | `06-prompt-bc-bien-chung.txt` |
| **Tư Vấn Người Bệnh**<br>*(3 Góc nhìn Bác sĩ Teach-Back - Người bệnh Cờ đỏ - Kế hoạch ra viện)* | `TV` | `knowledge-vault/2.6. Kho tư vấn/{Chuyên khoa}/` | `TV_{Tên bệnh}_P1.md` | `07-prompt-tv-tu-van.txt` |
| **CSDL Chẩn Đoán & CDSS (Tạo Mới)**<br>*(TypeScript Entry chuẩn DiseaseReactionChainDefinition có ngưỡng CLS & phác đồ thuốc)* | `CDSS` | `src/content/docspace/data/` | Thêm vào `diagnostic-criteria-database.ts` hoặc `kho-chan-doan-db.ts` | `08-prompt-db-entry-generator.txt` |
| **Làm Giàu CSDL Chẩn Đoán (Batch Enrich)**<br>*(Xóa bỏ template placeholder Hình 1, nâng cấp lên chuẩn lâm sàng Hình 2)* | `ENRICH` | `src/content/docspace/data/` | Cập nhật entry trong `kho-chan-doan-db.ts` | `09-prompt-db-batch-enricher.txt` |

### 📊 Thống Kê Hiện Trạng 7 Kho Tri Thức Cốt Lõi (Dữ Liệu Disk Hiện Tại)

| Tên Kho | Mã | Tổng Bài | Đã Có Nội Dung (Rich) | Khung File Chờ Nạp (Stubs) | Trọng Tâm Cần Nạp |
|:---|:---:|:---:|:---:|:---:|:---|
| **2.3. Kho chẩn đoán** | `CD` | **480** | 151 bài | **329 bài** | Nạp Lâm sàng, Cận lâm sàng, Tiêu chuẩn chẩn đoán & Phân biệt vào các bài khung |
| **2.4. Kho phác đồ điều trị** | `PDDT` | **275** | 158 bài | **117 bài** | Nạp phác đồ thuốc, chỉnh liều eGFR, phân tầng can thiệp |
| **1.4. Kho dịch tễ học** | `DTH` | **276** | 93 bài | **183 bài** | Nạp số liệu dịch tễ Việt Nam, mùa vụ, véc-tơ và nhóm nguy cơ |
| **1.5. Kho yếu tố nguy cơ** | `YTNC` | **23** | 23 bài | **0 bài** | Đã hoàn tất 100% (Tiếp tục cập nhật mô hình mới khi cần) |
| **3.2. Kho dược thư & tương tác**| `DUOC`| **20** | 20 bài | **0 bài** | Đã hoàn tất 20 thuốc thiết yếu (Bổ sung thuốc mới qua prompt 05) |
| **2.5. Kho biến chứng** | `BC` | **299** | 78 bài | **221 bài** | Nạp cơ chế, dấu hiệu cảnh báo sớm, xử trí cấp cứu vào 221 bài khung |
| **2.6. Kho tư vấn** | `TV` | **86** | 86 bài | **0 bài** | 100% Rich đa góc nhìn (Bổ sung kịch bản bệnh hiếm qua prompt 07) |

*Ghi chú*: Danh sách các thư mục `{Chuyên khoa}` chuẩn:
- `Tim mạch`
- `Hô hấp`
- `Tiêu hóa - Gan mật`
- `Thận - Tiết niệu`
- `Nội tiết - Chuyển hóa`
- `Thần kinh`
- `Huyết học - Ung thư`
- `Truyền nhiễm & Vi sinh`
- `Hồi sức - Cấp cứu`
- `Nhi khoa`
- `Sản phụ khoa`
- `Da liễu - Cơ xương khớp`
- `Mắt - TMH - RHM`
- `Ngoại khoa`

---

## 🛠️ 3. HƯỚNG DẪN CHI TIẾT 4 BƯỚC THỰC HIỆN TRÊN NOTEBOOKLM

### Bước 1: Khởi tạo Notebook & Nạp Tài Liệu Nguồn
1. Truy cập [Google NotebookLM](https://notebooklm.google.com/) và tạo một Notebook mới theo tên chuyên khoa (Ví dụ: `[CliniPortal] Tim Mạch - Bệnh Mạch Vành`).
2. Tải lên các tài liệu PDF gốc có giá trị bằng chứng cao nhất:
   - Khuyến cáo chính thức của Bộ Y Tế Việt Nam.
   - Guidelines quốc tế mới nhất (ESC, ACC/AHA, KDIGO, GOLD, GINA, IDSA, ADA...).
   - Nghiên cứu ngẫu nhiên có đối chứng (RCT Landmark) hoặc báo cáo dịch tễ GBD/WHO.

### Bước 2: Cài Đặt Master System Instruction
1. Mở file [00-master-system-instruction.txt](file:///d:/Apps/Apps_ykhoa/src/content/docspace/docs/prompts/00-master-system-instruction.txt).
2. Sao chép toàn bộ nội dung và dán vào phần **Custom Instructions (Chỉ dẫn hệ thống)** của NotebookLM hoặc dán ở đầu phiên trò chuyện.
3. *Tác dụng*: Thiết lập phong cách chuyên gia y khoa hàn lâm, cấm tuyệt đối sinh lời chào/hỏi thăm ("Chào bạn...", "Trong notebook này..."), bắt buộc dùng định dạng bảng và trích dẫn chuẩn AMA.

### Bước 3: Áp Dụng Prompt Chuyên Biệt Cho Từng Kho

Mở file prompt tương ứng trong thư mục `src/content/docspace/docs/prompts/`:

#### A. Khi Soạn Kho Tiêu Chuẩn Chẩn Đoán (`CD`):
- Mở [01-prompt-cd-chan-doan.txt](file:///d:/Apps/Apps_ykhoa/src/content/docspace/docs/prompts/01-prompt-cd-chan-doan.txt).
- Điền tên bệnh lý, chuyên khoa, nguồn hướng dẫn vào mục `[YÊU CẦU ĐẦU VÀO]`.
- Sao chép đoạn prompt và dán vào thanh chat NotebookLM.
- **Kết quả trả về**: Bài viết có Tiêu chuẩn vàng, Bảng tiêu chuẩn chính/phụ kèm độ nhạy/đặc hiệu, Bảng chẩn đoán phân biệt, Lưu đồ thuật toán chẩn đoán và Trích dẫn EBM.

#### B. Khi Soạn Kho Phác Đồ Điều Trị (`PDDT`):
- Mở [02-prompt-pddt-phac-do.txt](file:///d:/Apps/Apps_ykhoa/src/content/docspace/docs/prompts/02-prompt-pddt-phac-do.txt).
- Điền thông tin vào `[YÊU CẦU ĐẦU VÀO]`.
- **Kết quả trả về**: Bảng phân tầng mức độ nhẹ/vừa/nặng, Bảng kê thuốc chi tiết (Liều nạp, Liều duy trì, Chỉnh liều theo eGFR/suy gan), Phác đồ cấp cứu giờ đầu và Tiêu chuẩn xuất viện/chuyển viện.

#### C. Khi Soạn Kho Dịch Tễ Học (`DTH`):
- Mở [03-prompt-dth-dich-te.txt](file:///d:/Apps/Apps_ykhoa/src/content/docspace/docs/prompts/03-prompt-dth-dich-te.txt).
- Điền thông tin vào `[YÊU CẦU ĐẦU VÀO]`.
- **Kết quả trả về**: Tỷ lệ mắc/tử vong toàn cầu, Số năm sống tàn tật DALYs, Bản đồ dịch tễ các vùng miền tại Việt Nam, Tam giác dịch tễ học, Véc-tơ truyền bệnh, Hệ số $R_0$ và Chiến lược can thiệp cộng đồng.

#### D. Khi Soạn Kho Yếu Tố Nguy Cơ (`YTNC`):
- Mở [04-prompt-ytnc-nguy-co.txt](file:///d:/Apps/Apps_ykhoa/src/content/docspace/docs/prompts/04-prompt-ytnc-nguy-co.txt).
- Điền thông tin vào `[YÊU CẦU ĐẦU VÀO]`.
- **Kết quả trả về**: Bảng ma trận định lượng Odds Ratio (OR), Relative Risk (RR) và Nguy cơ quy trách dân số (PAR%), Mô hình tính điểm tiên lượng chuẩn (SCORE2, ASCVD, Wells...), Các dấu ấn tăng cường (Risk Enhancers), và Mục tiêu dự phòng tiên phát/thứ phát.

### Bước 4: Lưu File Vào Dự Án
1. Nhấn nút Copy phản hồi từ NotebookLM.
2. Tạo file mới theo đúng đường dẫn và tên file quy định (Ví dụ: `knowledge-vault/2.3. Kho chẩn đoán/Tim mạch/CD_Hẹp van hai lá_P1.md`).
3. Dán nội dung vào file và lưu lại (Encoding: UTF-8).

---

## ⚡ 4. ĐỒNG BỘ HỆ THỐNG (1-CLICK SYNC)

Sau khi lưu file vào `knowledge-vault/`, mở Terminal tại thư mục gốc dự án (`d:\Apps_ykhoa`) và thực hiện 2 lệnh sau:

### Lệnh 1: Cập nhật danh mục Catalog cho toàn hệ thống
```bash
node tools/scripts/build-vault-catalog.js
```
*Tác dụng*: Quét toàn bộ kho, trích xuất metadata, tạo chỉ mục tra cứu tự động và đồng bộ trực tiếp vào 2 vị trí:
- `src/content/knowledge-vault/data/vault-catalog.json` (Dùng cho Vault Web Hub)
- `src/content/docspace/src/data/vault-catalog.json` (Dùng cho Trợ lý Ca bệnh DocSpace)

### Lệnh 2: Kiểm tra toàn vẹn tri thức (Health Check)
```bash
node tools/scripts/vault-readiness-check.mjs
```
*Tác dụng*: Kiểm tra 13 hạng mục kiểm định chất lượng: tính nguyên vẹn của Frontmatter, liên kết ca bệnh, không sót lời chào chatbot thừa.

---

## 📑 5. BẢNG KIỂM CHẤT LƯỢNG TRƯỚC KHI LƯU (PRE-FLIGHT CHECKLIST)

- [ ] **Frontmatter đầy đủ**: Đảm bảo có mở đầu `---` và kết thúc `---`, chứa đủ các trường: `title`, `part: "P1"`, `specialty`, `kho`, `type`, `tags`, `updated: "2026-09-11"`, `sources`.
- [ ] **Mã ICD-10**: Khai báo chính xác mã bệnh quốc tế (ví dụ: `I21` cho Nhồi máu cơ tim, `E11` cho ĐTĐ típ 2).
- [ ] **Tuyệt đối không có lời chào hỏi thừa**: Không có các câu như "Chào bạn", "Theo tài liệu trong Notebook", "💡 Gợi ý câu hỏi tiếp theo".
- [ ] **Trích dẫn EBM chuẩn**: Mục tài liệu tham khảo ghi rõ Tên tác giả, Tên nghiên cứu/Guideline, Tạp chí, Năm công bố, DOI hoặc PMID.
