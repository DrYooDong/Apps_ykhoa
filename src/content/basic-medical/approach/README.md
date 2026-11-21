# 🩺 Phân Hệ Tiếp Cận Lâm Sàng (Clinical Approach Subsystem)

> **Đường dẫn**: `src/content/basic-medical/approach/`  
> **Hệ sinh thái**: CliniPortal — Cơ Sở Y Khoa (Basic Medical Sciences)  
> **Quy chuẩn Thiết kế MDX**: Xem chi tiết tại [**`APPROACH_MDX_DESIGN_SPEC.md`**](./APPROACH_MDX_DESIGN_SPEC.md)

---

## 🧭 Hướng Dẫn Dành Cho AI & Cộng Tác Viên

Khi cần biên tập, nhập nguồn từ `knowledge-vault/2.1. Kho tiếp cận lâm sàng/` hoặc soạn mới bài học `.mdx` trong phân hệ **Tiếp cận**:

1. **Đọc đặc tả chuẩn**: Mở [**`APPROACH_MDX_DESIGN_SPEC.md`**](./APPROACH_MDX_DESIGN_SPEC.md) để tuân thủ khung **9 mục chuẩn**, Frontmatter YAML, `<ApproachQuickNav />`, `<UrgencyPill />`, lưu đồ Pure Editorial SVG và quy tắc escape JSX/KaTeX.
2. **Quy ước thư mục (`ck01-` → `ck13-`)**: Không dùng tiền tố `module*` (đã dành cho phân hệ Kháng sinh) để tránh xung đột với `physio-html-reader-view.ts`.
3. **Cập nhật Registry**: Khi hoàn thiện một bài học từ `draft` sang `published`, cập nhật trường `status: 'published'` trong [**`data/approach-curriculum-data.ts`**](./data/approach-curriculum-data.ts).
4. **Kiểm chứng bắt buộc**: Chạy `npm run typecheck` và `npm run build` (Exit code 0) trước khi bàn giao.

---

## 📂 Bản Đồ Thư Mục 13 Chuyên Khoa

| Thư mục | Chuyên khoa | Mã bài | Số bài MDX hiện có |
|---|---|---|---|
| `ck01-nguyen-ly/` | Nguyên lý tiếp cận | `TC-NL-xx` | 0 |
| `ck02-cap-cuu-doc-chat/` | Cấp cứu – Hồi sức – Độc chất | `TC-CC-xx` | 0 |
| `ck03-truyen-nhiem-sot/` | Truyền nhiễm – Sốt | `TC-TN-xx` | 3 (`tc-03-sot-cap-tinh-nl.mdx`, `tc-03-sot-keo-dai-nl.mdx`, `tc-03-sot-vang-da.mdx`) |
| `ck04-tim-mach/` | Tim mạch | `TC-TM-xx` | 1 (`tc-04-01-dau-nguc.mdx`) |
| `ck05-ho-hap/` | Hô hấp | `TC-HH-xx` | 0 |
| `ck06-tieu-hoa-gan-mat/` | Tiêu hóa – Gan mật | `TC-TH-xx` | 0 |
| `ck07-than-dien-giai/` | Thận – Tiết niệu & Nước – Điện giải | `TC-TDG-xx` | 1 (`tc-07-09-ha-natri-mau.mdx`) |
| `ck08-than-kinh/` | Thần kinh | `TC-TK-xx` | 0 |
| `ck09-huyet-hoc-mien-dich/` | Huyết học – Miễn dịch | `TC-HM-xx` | 0 |
| `ck10-noi-tiet-dinh-duong/` | Nội tiết – Chuyển hóa – Dinh dưỡng | `TC-NT-xx` | 0 |
| `ck11-co-xuong-khop/` | Cơ xương khớp | `TC-CXK-xx` | 0 |
| `ck12-da-lieu/` | Da liễu | `TC-DL-xx` | 0 |
| `ck13-nhi-khoa/` | Nhi khoa | `TC-NK-xx` | 1 (`tc-13-01-tre-sot.mdx`) |
