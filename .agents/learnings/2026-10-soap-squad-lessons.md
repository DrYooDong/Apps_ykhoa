# 📚 Bài Học Kinh Nghiệm: Khắc Phục Sự Cố Danh Mục & Giao Diện Mobile Phân Hệ SOAP (DocSpace)

> **Ngày ghi nhận**: 2026-10-07  
> **Phân hệ**: DocSpace MedLens — Sổ tay Kinh nghiệm Thực chiến SOAP (`src/content/docspace/`)  
> **Tác tử ghi nhận**: SOAP Guardian Squad

---

## 🚨 1. Sự Cố 1: Lỗi Danh Sách Chỉ Hiển Thị 01 Bệnh (Catalog Drift)

### Triệu chứng:
- Người dùng nạp 16 ca bệnh thực chiến bằng file Markdown vào thư mục `src/content/docspace/data/ba/`.
- Tuy nhiên, giao diện Sổ tay Kinh nghiệm SOAP trên web chỉ hiển thị đúng 01 ca bệnh duy nhất (`soap-dengue-soc-2760-01`).

### Nguyên nhân gốc rễ:
1. Phân hệ DocSpace load danh mục ca bệnh từ tệp `vault-catalog-thuc-hanh.json` (và fallback `vault-catalog.json`), **không quét trực tiếp filesystem lúc runtime**.
2. Khi người dùng lưu file `.md` mới vào `data/ba/`, script `ingest-notebooklm-case.mjs` chưa được kích hoạt cho thư mục đó, hoặc chạy mà chỉ nạp từng file đơn lẻ mà không sync toàn bộ.
3. Sự phân tách giữa hai catalog: `src/data/vault-catalog-thuc-hanh.json` và `src/data/vault-catalog.json` khiến dữ liệu dễ bị phân mảnh nếu chỉ cập nhật 1 trong 2 file.

### Giải pháp chuẩn hóa:
- **Nguyên tắc**: Bất kỳ ca bệnh mới nào trong `data/ba/` đều phải được đồng bộ song song vào cả hai file catalog: `vault-catalog.json` và `vault-catalog-thuc-hanh.json`.
- Chạy batch script:
  ```bash
  node tools/scripts/ingest-notebooklm-case.mjs src/content/docspace/data/ba
  ```
- Luôn kiểm tra tính tương đương:
  $$\text{Số file .md trong data/ba/} = \text{Số entry khoCode="BA" trong vault-catalog-thuc-hanh.json}$$
- Tạo script giám sát `validate-soap-catalog.mjs` để cảnh báo sớm tình trạng trôi dạt (catalog drift).

---

## 📱 2. Sự Cố 2: Lỗi Vỡ Bố Cục Mobile Header & Toolbar Trên Viewport Nhỏ (< 400px)

### Triệu chứng:
- Tiêu đề ca bệnh bị ép méo dồn sang một bên, các nhãn icon tràn khung hoặc bị che khuất.
- Thanh công cụ thao tác nhanh (Chép prompt, Nghe đọc, Tải xuống, In) chen lấn hàng ngang với khối thông tin tiêu đề.
- Chế độ xem chi tiết trên Mobile (`mobileTab === 'detail'`) thiếu không gian thao tác.

### Nguyên nhân gốc rễ:
1. Container dùng `flex-wrap items-start justify-between` kết hợp `flex-1` và `shrink-0` trên cùng một cấp mà không có breakpoint thích ứng.
2. Trên màn hình điện thoại (375px - 390px), độ rộng không đủ để đặt cả khối tiêu đề dài và thanh 4 nút bấm trên cùng một hàng ngang.
3. Thiếu `break-words` và `min-w-0` dẫn đến thẻ `<h1>` ép các phần tử anh em co lại tối đa.

### Giải pháp chuẩn hóa:
- **Quy tắc Mobile First cho Header:**
  - Áp dụng `flex-col md:flex-row items-start gap-4`.
  - Khối nội dung tiêu đề chiếm trọn `w-full md:flex-1 min-w-0`.
  - Thêm `break-words` vào `<h1>`.
  - Khối thanh công cụ (Toolbar) chuyển thành dải full-width phía dưới tiêu đề trên Mobile:
    `w-full md:w-auto pt-2.5 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800`.
  - Rút gọn nhãn chữ trên Mobile (chỉ hiện icon hoặc chữ ngắn), chỉ bung đầy đủ nhãn trên Desktop (`hidden md:inline`).

---

## 🛡️ 3. Quy Tắc Vàng Phòng Ngừa Tái Diễn (SOAP Golden Rules)

1. **Quy tắc Single Source of Truth**: `caseId` trong Frontmatter `.md` là mã định danh tối thượng, phải trùng khớp với tên file và `id` trong catalog JSON.
2. **Quy tắc Ingest Toàn Thư Mục**: Khi thêm ca mới từ NotebookLM, luôn chạy batch ingest cho cả thư mục `data/ba` để đồng bộ đồng loạt.
3. **Quy tắc Viewport 375px**: Mọi thay đổi trong `components/soap/` phải được kiểm thử giả lập màn hình di động 375px trước khi commit.
