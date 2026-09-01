# Bài Học & Quy Chuẩn Xử Lý Hình Ảnh Khi Soạn Bài Từ Knowledge Vault Sang MDX

> **Ngày ghi nhận**: 01/09/2026  
> **Phạm vi áp dụng**: Toàn bộ hệ thống CliniPortal (`basic-medical/`, `pathophysiology-cases/`, `physiology/`, `biochemistry/`, `epidemiology/`, `ebm/guidelines/`)

---

## 🎯 Vấn Đề Gốc & Bài Học Kinh Nghiệm (Root Cause & Lessons Learned)

- **Hiện tượng**: Khi chuyển đổi bài từ file nguồn `.md` trong `knowledge-vault/` sang `.mdx`, AI có xu hướng chỉ trích xuất văn bản hoặc tóm tắt sơ đồ mà bỏ quên việc quét tìm các file ảnh đính kèm (`![[Pasted image ...]]` hoặc `![alt](path)`), dẫn đến bài viết thiếu mất các sơ đồ gốc quý giá từ các tài liệu EBM / Guidelines chính thức.
- **Nguyên tắc cốt lõi**: **BẮT BUỘC QUÉT TÌM & NHÚNG 100% HÌNH ẢNH TỪ FILE .MD NGUỒN VÀO FILE .MDX ĐÍCH.**

---

## 🛠️ Quy Trình 3 Bước Xử Lý Hình Ảnh Chuẩn Hóa

### Bước 1: Quét Tìm Tất Cả Cú Pháp Hình Ảnh Trong File Nguồn
- Tìm kiếm mọi cú pháp:
  - Obsidian Wiki-links: `![[Pasted image YYYYMMDDHHMMSS.png]]`
  - Standard Markdown Image: `![Mô tả ảnh](duong-dan.png)`
- Xác định vị trí lưu trữ thực tế trong `knowledge-vault/_resources/attachments/`.

### Bước 2: Sao Chép & Đổi Tên Tệp Chuẩn Kebab-Case
- Sao chép tệp ảnh từ `knowledge-vault/_resources/attachments/` sang thư mục `images/` của phân hệ đích (ví dụ: `src/content/basic-medical/pathophysiology-cases/images/`).
- Đổi tên tệp thành tên có nghĩa lâm sàng ngắn gọn: `<slug>-<feature>.png` hoặc `<slug>-fig<X>.png` (ví dụ: `af-mechanisms-pathways-acc2023.png`, `af-pathophysiological-mechanisms-ehra2024.png`).
- Đồng bộ tệp ảnh sang cả `assets/images/` để đảm bảo tương thích 100% các đường dẫn cũ và mới.

### Bước 3: Nhúng Thẻ Figure Chuẩn Hóa Với Chú Thích EBM & Lightbox
- Bọc ảnh trong thẻ `<figure>` ngữ nghĩa với các thuộc tính responsive và lightbox:

```html
<figure class="physio-figure" style="display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; margin: 2rem auto;">
  <img src="./images/<slug>-<feature>.png" 
       alt="[Mô tả hình ảnh chuẩn]" 
       class="physio-img lightbox-trigger"
       style="display: block; margin: 0 auto; max-width: 95%; height: auto; border-radius: 12px; border: 1px solid var(--color-border, #cbd5e1); box-shadow: 0 4px 18px rgba(0,0,0,0.08);" 
       loading="lazy" />
  <figcaption style="margin-top: 0.85rem; font-size: 0.88rem; color: var(--color-text-muted, #64748b); font-style: italic; text-align: center; max-width: 820px; line-height: 1.55;">
    <strong>Hình X: [Tiêu đề hình ảnh].</strong> [Giải thích chi tiết các nhánh cơ chế phân tử / tế bào / huyết động]. Nguồn: <em>[Tên Guideline / Tác giả / Tạp chí]</em> (Figure X).
  </figcaption>
</figure>
```

---

## 📋 Bảng Kiểm Tra Trước Khi Bàn Giao (Pre-delivery Checklist)

- [ ] Đã quét toàn bộ file `.md` nguồn và liệt kê đầy đủ số lượng ảnh đính kèm.
- [ ] 100% ảnh đính kèm đã được copy vào thư mục `images/` của phân hệ và đổi tên chuẩn.
- [ ] 100% ảnh đã được nhúng vào file `.mdx` với thẻ `<figure>` và `<figcaption>` đầy đủ chú thích.
- [ ] Chạy `npm run build` xác nhận đóng gói thành công và hình ảnh hiển thị mượt mà.
