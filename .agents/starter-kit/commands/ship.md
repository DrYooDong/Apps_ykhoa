---
description: Bảng kiểm tự động trước khi đóng gói / commit / bàn giao sản phẩm hoặc tính năng
---

# Lệnh Bàn Giao & Đóng Gói: /ship

Khi nhận lệnh `/ship`, AI Agent tiến hành kiểm tra cổng bàn giao cuối cùng (Final Release Gate) dựa trên checklist bắt buộc của dự án:

---

## 🚦 Quy Trình Kiểm Định Cổng Bàn Giao (Release Gate)

### 1. Rà Soát File Sửa Đổi
- Liệt kê toàn bộ các file vừa được tạo mới hoặc chỉnh sửa trong phiên làm việc.
- Xác nhận **không có tệp rác, tệp tạm thời hoặc tệp log** bị bỏ quên trong mã nguồn.

### 2. Kiểm Tra 6 Tiêu Chí Bắt Buộc (AGENTS.md Checklist)
- [ ] **Đường dẫn tương đối**: Kiểm tra cấp thư mục (`./`, `../`, `../../`, `../../../`).
- [ ] **Design Tokens**: Không còn màu hardcoded, tuân thủ `rules/dark-mode-rules.md`.
- [ ] **Dark Mode**: Chuyển đổi mượt mà giữa chế độ Sáng và Tối (`data-theme="dark"`).
- [ ] **Mobile Responsive**: Đảm bảo không bị overflow ngang ở màn hình $\le 375\text{px}$.
- [ ] **Toàn vẹn HTML**: Không lỗi thẻ đóng, unescaped character hoặc conflict script.
- [ ] **Đăng ký tài liệu**: File mới đã có mặt trong `.agents/docs/FILE_MAP.md` hoặc Registry liên quan.

### 3. Tự Động Chạy Linter / Test (Nếu Có)
Chạy lệnh kiểm tra nhanh nếu project có sẵn tooling:
```bash
npm run validate:all # hoặc script kiểm thử tương đương
```

---

## 📦 Định Dạng Bàn Giao Cuối Cùng Cho User
Sau khi toàn bộ checklist đều đạt `[x] PASS`, AI Agent xuất bản báo cáo bàn giao:
1. **Tóm tắt Thay đổi (Changelog)**: Mô tả ngắn gọn tính năng/sửa đổi đã thực hiện.
2. **Danh sách Tệp Tác Động**: Đường dẫn link file markdown click được (`[file.ext](file:///...)`).
3. **Hướng dẫn Kiểm tra / Sử dụng**: Các bước đơn giản để User mở trình duyệt hoặc test tính năng.
4. **Vòng lặp cải tiến (/retro)**: Tự động ghi nhận thẻ Retro nếu phiên làm việc có bài học quan trọng để nâng cấp hệ thống.
