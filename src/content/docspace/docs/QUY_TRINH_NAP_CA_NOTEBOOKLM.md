# 📘 HƯỚNG DẪN QUY TRÌNH BIÊN SOẠN & NẠP CA LÂM SÀNG MẪU BẰNG NOTEBOOKLM

> **Dự án**: CliniPortal DocSpace MedLens Pro  
> **Kho dữ liệu trung tâm**: `src/content/knowledge-vault` (Single Source of Truth)  
> **Phiên bản**: v2.0 (Kiến trúc thuần tĩnh, không phụ thuộc Supabase hay LocalStorage)

---

## 🌟 1. Tổng Quan Kiến Trúc & Triết Lý

Hệ sinh thái **DocSpace MedLens Pro** vận hành theo triết lý **100% Client-Side & Zero-Latency**:
- **Knowledge Vault (`src/content/knowledge-vault`)** là **Kho dữ liệu trung tâm duy nhất** quản lý:
  - 2.400+ bài viết Y học chứng cứ (EBM).
  - Quy tắc suy luận diễn dịch lâm sàng: `data/clinical-rules-kb.json`.
  - Toàn bộ ca lâm sàng mẫu SOAP: Thư mục `ba/` và chỉ mục tại `data/vault-catalog.json` (với `khoCode: "BA"`).
- **Không sử dụng cơ sở dữ liệu Supabase hay LocalStorage**: Loại bỏ rủi ro mất dữ liệu trình duyệt, lỗi xung đột cloud hoặc phụ thuộc mạng internet tại bệnh viện.
- **Phân tách giao diện rành mạch**:
  1. **🩺 Chu Trình Lâm Sàng (3 Bước Cốt Lõi)**:
     - `Bước 1: Nạp dữ kiện` (Bệnh sử, Sinh hiệu, Cận lâm sàng, Chọn triệu chứng).
     - `Bước 2: Phân tích & Biện luận` (Động cơ suy luận diễn dịch, Sàng lọc cấp cứu, Phân tầng nguy cơ).
     - `Bước 3: Phác đồ điều trị` (Phân tầng theo tuyến y tế, Đơn thuốc cá thể hóa, Bằng chứng EBM Pathway).
  2. **📖 Sổ Tay Kinh Nghiệm SOAP (Hub Riêng Biệt)**:
     - Nơi tra cứu, đối chiếu, học tập các ca bệnh kinh điển, bẫy lâm sàng từ Knowledge Vault.
  3. **🏛️ Kho Tri Thức Vault (Explorer Riêng Biệt)**:
     - Trình duyệt 2.400+ bài EBM từ 18 phân kho chuyên khoa y học cơ sở và điều trị.

---

## 🚀 2. Quy Trình 4 Bước Biên Soạn & Nạp Ca Lâm Sàng Bằng NotebookLM

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│       QUY TRÌNH BIÊN SOẠN CA LÂM SÀNG QUA NOTEBOOKLM & KNOWLEDGE VAULT      │
└──────────────────────────────────────┬───────────────────────────────────────┘
                                       │
  ┌────────────────────────────────────▼────────────────────────────────────┐
  │ BƯỚC 1: TẢI TÀI LIỆU NGUỒN CHUẨN VÀO NOTEBOOKLM                        │
  │ • Nạp văn bản Guideline Bộ Y Tế, ESC, ACC/AHA, GOLD, GINA...           │
  │ • Sách giáo khoa lâm sàng hoặc hồ sơ ca thực tế đã ẩn danh              │
  └────────────────────────────────────┬────────────────────────────────────┘
                                       │
  ┌────────────────────────────────────▼────────────────────────────────────┐
  │ BƯỚC 2: RA LỆNH VỚI PROMPT MASTER Y KHOA                                │
  │ • Sử dụng template tại: docs/prompt-notebooklm-soap.txt                 │
  │ • Điền tên bệnh lý, chuyên khoa, mức độ phức tạp (1-5), bẫy lâm sàng    │
  │ • NotebookLM sinh nội dung Markdown có Frontmatter YAML chuẩn           │
  └────────────────────────────────────┬────────────────────────────────────┘
                                       │
  ┌────────────────────────────────────▼────────────────────────────────────┐
  │ BƯỚC 3: KIỂM ĐỊNH Y HỌC & LƯU FILE MARKDOWN                             │
  │ • Bác sĩ đọc soát số liệu: Sinh hiệu, liều thuốc, phân tầng nguy cơ     │
  │ • Lưu file vào: src/content/knowledge-vault/ba/<caseId>.md              │
  └────────────────────────────────────┬────────────────────────────────────┘
                                       │
  ┌────────────────────────────────────▼────────────────────────────────────┐
  │ BƯỚC 4: CHẠY SCRIPT TỰ ĐỘNG NẠP VÀO KHO                                 │
  │ • Chạy lệnh: node tools/scripts/ingest-notebooklm-case.mjs <file.md>     │
  │ • Tự động parse S-O-A-P, đồng bộ catalog Knowledge Vault & DocSpace     │
  └─────────────────────────────────────────────────────────────────────────┘
```

---

### Bước 1: Chuẩn bị Nguồn Dữ Liệu trên NotebookLM
1. Truy cập [Google NotebookLM](https://notebooklm.google.com/).
2. Tạo một Notebook mới (ví dụ: *"Hô Hấp - Đợt Cấp COPD & Hen Phế Quản"* hoặc *"Tim Mạch - ACS"*).
3. Tải lên (Upload) các tài liệu nguồn có thẩm quyền y học cao:
   - Các Quyết định, Hướng dẫn chẩn đoán và điều trị của **Bộ Y Tế Việt Nam**.
   - Các Guidelines của Hội Tim mạch Châu Âu (ESC), Hội Hô hấp Châu Âu (ERS), GOLD, ADA...
   - Các bài viết liên quan trong chính phân hệ `knowledge-vault` của CliniPortal.

---

### Bước 2: Sử dụng Prompt Master để Sinh Ca Lâm Sàng
1. Mở file mẫu prompt: `src/content/docspace/docs/prompt-notebooklm-soap.txt`.
2. Sao chép nội dung prompt và dán vào khung chat của NotebookLM.
3. Thay thế các trường thông tin mong muốn trong prompt:
   - `[ĐIỀN TÊN BỆNH]`: Ví dụ *Nhồi máu cơ tim cấp không ST chênh lên*
   - `[ĐIỀN CHUYÊN KHOA]`: Ví dụ *Tim mạch*
   - `[PHÂN LOẠI CA]`: Chọn 1 trong 4 loại:
     - `essential`: Ca lâm sàng kinh điển, điển hình
     - `pitfall`: Bẫy lâm sàng thường gặp (dấu hiệu câm, triệu chứng che giấu)
     - `rare`: Thể bệnh hiếm hoặc khởi phát bất thường
     - `advanced`: Ca chuyên sâu đòi hỏi lập luận đa tầng EBM
   - `[MỨC ĐỘ PHỨC TẠP]`: 1 đến 5 sao.
4. Nhấn Gửi. NotebookLM sẽ tổng hợp từ tài liệu nguồn và trả về ca bệnh theo đúng cấu trúc Markdown Frontmatter.

---

### Bước 3: Kiểm Tra & Lưu File Markdown
1. Bác sĩ hoặc người biên tập đọc kiểm duyệt:
   - Liều lượng thuốc, chống chỉ định và đường dùng.
   - Thang điểm nguy cơ (GRACE, CURB-65, qSOFA...) có tính toán chính xác không.
   - Các câu **Clinical Pearl**, **Bẫy cận lâm sàng** và **Bài học kinh nghiệm** đã sâu sắc chưa.
2. Lưu file với định dạng `.md` vào thư mục:
   ```text
   src/content/knowledge-vault/ba/<caseId>.md
   ```
   *Ví dụ: `src/content/knowledge-vault/ba/soap-copd-exacerbation-01.md`*

---

### Bước 4: Chạy Lệnh Tự Động Nạp Vào Knowledge Vault
Mở terminal tại thư mục gốc của dự án (`d:\Apps_ykhoa\`) và chạy lệnh:

```powershell
# Nạp 1 file cụ thể:
node tools/scripts/ingest-notebooklm-case.mjs src/content/knowledge-vault/ba/soap-copd-exacerbation-01.md

# Hoặc nạp toàn bộ thư mục chứa nhiều file:
node tools/scripts/ingest-notebooklm-case.mjs src/content/knowledge-vault/ba/
```

**Công cụ sẽ tự động thực hiện**:
1. Phân tích Frontmatter YAML và các phần `S`, `O`, `A`, `P`.
2. Tách dữ liệu sinh hiệu, cận lâm sàng, danh mục thuốc, ICD-10 và ngọc lâm sàng.
3. Đóng gói vào đối tượng `VaultArticle` với `khoCode: "BA"`.
4. Cập nhật trực tiếp vào file chỉ mục `src/content/knowledge-vault/data/vault-catalog.json`.
5. Tự động sao chép sang `src/content/docspace/src/data/vault-catalog.json`.

---

## 📊 3. Xem & Trải Nghiệm Trên Giao Diện DocSpace

Ngay sau khi chạy lệnh nạp xong:
1. Mở DocSpace:
   ```powershell
   cd src/content/docspace
   npm run dev
   ```
2. Trên thanh Header của DocSpace, nhấn vào tab **`📖 Kinh Nghiệm SOAP`**:
   - Ca lâm sàng vừa nạp sẽ lập tức hiển thị trên danh sách.
   - Có thể lọc theo chuyên khoa (Tim mạch, Hô hấp, Tiêu hóa...), lọc theo bẫy lâm sàng (`pitfall`) hoặc tìm kiếm theo mã ICD-10.
   - Mở xem chi tiết bảng ma trận 4 cột S - O - A - P.
   - Nhấn **"Sao chép SOAP"** hoặc **"Xuất Markdown"** để đồng bộ vào Obsidian Vault nếu cần.

---

## 🛡️ 4. Bảng Kiểm Tra Chất Lượng (Quality Gate) Trước Khi Nạp Ca

Trước khi đưa ca lâm sàng vào Knowledge Vault chính thức, hãy bảo đảm:
- [ ] Mã ICD-10 là mã chuẩn quốc tế (ví dụ: `I21.4`, `J44.1`, `A90`...).
- [ ] Thuốc chỉ định có hoạt chất rõ ràng, liều lượng và đường dùng cụ thể.
- [ ] Không chứa thông tin định danh cá nhân bệnh nhân thực tế (tuân thủ HIPAA/GDPR y tế).
- [ ] Có tối thiểu 01 Clinical Pearl (bệnh sử) và 01 Objective Pitfall (bẫy cận lâm sàng).
- [ ] Cú pháp Frontmatter YAML không bị lỗi thụt đầu dòng (indentation).
