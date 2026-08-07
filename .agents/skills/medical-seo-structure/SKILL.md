---
name: medical-seo-structure
description: Kỹ năng chuẩn hóa SEO Y khoa, thẻ Meta Semantic, tiêu đề chuẩn mực, dữ liệu có cấu trúc (Schema.org MedicalWebPage) cho CliniPortal.
---

# Medical SEO & Semantic Structure — CliniPortal

Hướng dẫn tối ưu cấu trúc HTML5 và chuẩn SEO y tế giúp bài viết, phác đồ, và công cụ tính toán CliniPortal đạt chỉ số hiển thị và tra cứu tối ưu.

---

## 📌 Quy tắc Chuẩn hóa SEO & HTML Semantic

1. **Title Tag Format**:
   - `[Tên Bài Viết / Phác Đồ / Công Cụ] – CliniPortal`
   - Ví dụ: `Phân Nhóm Sinh Học & Giai Đoạn Ung Thư Trực Tràng – CliniPortal`

2. **Meta Description**:
   - Thẻ `<meta name="description" content="...">` mô tả ngắn tóm tắt nội dung chính (khoảng 140 - 160 ký tự), chứa từ khóa chuyên môn y khoa.

3. **Cấu trúc Thẻ Tiêu đề (Heading Hierarchy)**:
   - Duy nhất **1 thẻ `<h1>`** trên mỗi trang cho tên bài viết/chủ đề chính.
   - Sử dụng thứ tự logic `<h2>` → `<h3>` → `<h4>`, không nhảy cấp (ví dụ không nhảy từ `<h1>` xuống `<h3>`).

4. **Schema.org Structured Data (JSON-LD)**:
   - Chèn dữ liệu có cấu trúc loại `MedicalWebPage` hoặc `MedicalCondition` vào thẻ `<script type="application/ld+json">`.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "name": "Phân Nhóm Sinh Học Ung Thư",
  "description": "Công cụ phân nhóm sinh học và đánh giá giai đoạn TNM trong ung thư.",
  "aspect": "Diagnosis"
}
</script>
```
