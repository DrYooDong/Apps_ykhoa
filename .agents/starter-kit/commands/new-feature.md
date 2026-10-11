---
description: Quy trình 5 bước phát triển tính năng mới an toàn, chuẩn kiến trúc, tự kiểm định và đồng bộ tài liệu
---

# Lệnh Phát Triển Tính Năng: /new-feature

Khi nhận lệnh `/new-feature [mô tả tính năng hoặc module]`, AI Agent tuân thủ nghiêm ngặt quy trình 5 bước sau:

---

## 🧭 Bước 1: Rà Soát Tiền Trạm & Socratic Gate
1. Đọc và tôn trọng các quy tắc trong `.agents/AGENTS.md` và `.agents/rules/`.
2. Xác định phạm vi tệp bị ảnh hưởng:
   - Module HTML/JS độc lập hay Astro MDX?
   - Tính toán đường dẫn tương đối chính xác (`./`, `../`, `../../`, `../../../`).
3. **Cấm phá vỡ**: Không xóa/di chuyển tệp HTML/CSS/JS đang hoạt động. Nếu yêu cầu có điểm mơ hồ hoặc rủi ro cao, đặt câu hỏi làm rõ trước khi sửa đổi.

---

## 📐 Bước 2: Thiết Kế & Lập Kế Hoạch Tối Giản
1. Phân rã công việc thành các bước nhỏ có thể kiểm chứng.
2. Xác định Design Tokens chuẩn (`var(--color-...)`), không dùng hardcode hex/rgb màu.
3. Bảo đảm hỗ trợ Dark Mode (`[data-theme="dark"]`) và Responsive Mobile-First ($\le 375\text{px}$).

---

## 🛠️ Bước 3: Triển Khai Mã Nguồn (Clean & Minimal)
1. Viết code sạch, đúng chuẩn Vanilla JS/CSS hoặc Astro component tương ứng.
2. Không thêm dependency ngoài nếu chưa được chỉ định.
3. Áp dụng CSS Variables chuẩn hóa, semantic HTML và touch target $\ge 44\text{px}$.

---

## 🧪 Bước 4: Tự Kiểm Thử Tức Thì (Self-Audit Gate)
1. Kiểm tra toàn vẹn thẻ HTML:
   - Nếu là file HTML: chạy `node tools/scratch/check_tags.js <path>` hoặc kiểm tra cú pháp đóng/mở thẻ.
2. Kiểm tra tính năng Dark Mode & Responsive không bị vỡ layout hoặc z-index.
3. Không để lại cú pháp JSX/HTML lỗi nếu là MDX (`class` -> `class` trong HTML, `className` trong React/JSX).

---

## 📚 Bước 5: Cập Nhật Tài Liệu, Đồng Bộ Registry & Tự Cải Thiện
1. Đăng ký tệp mới vào `.agents/docs/FILE_MAP.md` (nếu tạo tệp mới).
2. Cập nhật registry dữ liệu liên quan (vd: `cdss-registry.ts`, `vault-catalog.json` hoặc mảng dữ liệu mục lục).
3. Chạy `/retro` nếu tính năng trải qua nhiều vòng điều chỉnh để lưu kinh nghiệm cho các tính năng tiếp theo.
4. Báo cáo ngắn gọn cho User: các tệp đã tạo/sửa, kết quả kiểm thử, và hướng dẫn trải nghiệm.
