# 🚀 Cẩm Nang & Mẹo Đẩy Cổng GitHub Siêu Tốc (Nhanh & Chính Xác)

Tài liệu này tổng hợp các kỹ thuật thực chiến giúp lập trình viên và AI Agent đẩy mã nguồn lên GitHub nhanh gấp 3–5 lần, tránh nghẽn mạng trên ổ đĩa đám mây (Google Drive/OneDrive), và bảo đảm không bao giờ đẩy nhầm file hỏng hay vượt quá dung lượng.

---

## ⚡ 1. Tối Ưu Hiệu Năng Git Trên Windows & Ổ Đĩa Đồng Bộ (Chạy 1 lần duy nhất)

Khi làm việc trên Windows và thư mục đồng bộ Google Drive (`Drive của tôi`), Git mặc định quét tệp rất chậm. Chạy ngay 3 cấu hình sau:

```bash
# 1. Bật bộ nhớ đệm filesystem siêu tốc trên Windows
git config core.fscache true

# 2. Đọc index song song trên đa luồng CPU
git config core.preloadindex true

# 3. Tối ưu quét thư mục không đổi
git config core.untrackedcache true

# 4. Tăng bộ đệm HTTP lên 500MB (tránh lỗi RPC failed / curl 56 khi push file lớn)
git config http.postBuffer 524288000
```

---

## 🛡️ 2. Mẹo Chặn File Rác Của Google Drive Trong `.gitignore`

Google Drive thường tự sinh ra các file lock (`desktop.ini`, `*.tmp.drivedownload`, `~$*`) khiến Git bị treo hoặc tạo commit thừa. Luôn bảo đảm `.gitignore` có các dòng:

```gitignore
desktop.ini
Thumbs.db
.DS_Store
Icon
~$*
*.tmp.drivedownload
.gemini/
node_modules/
```

---

## 🎯 3. Đẩy 1-Chạm An Toàn Qua Công Cụ CLI (`tools/dev.mjs push`)

Thay vì gõ thủ công 3-4 lệnh `git status`, `git add`, `git commit`, `git push`, dự án đã có sẵn lệnh 1-chạm tự động kiểm tra an toàn:

```bash
# Đẩy nhanh với thông điệp rõ ràng:
node tools/dev.mjs push "feat: hoàn thiện tính năng lọc bệnh nhân"
```

**Cơ chế bảo vệ tích hợp trong lệnh:**
1. Tự động quét phát hiện nếu có file $> 50\text{MB}$ $\rightarrow$ Lập tức dừng lại cảnh báo để không bị GitHub từ chối repo.
2. Kiểm tra nếu working tree không đổi $\rightarrow$ Thông báo sạch sẽ, không tạo commit rỗng.
3. Tự động đóng gói `git add -A`, tạo commit và push lên remote trong vòng 2–3 giây.

---

## 🧩 4. Mẹo "Gom Scope" Chính Xác Bằng Conventional Commits

Để commit vừa nhanh vừa chuẩn chỉ, áp dụng tiền tố chuẩn quốc tế:
- `feat: ...` : Khi thêm màn hình, tính năng mới
- `fix: ...` : Khi sửa lỗi giao diện, logic, CSS
- `docs: ...` : Khi cập nhật tài liệu, hướng dẫn
- `refactor: ...` : Khi dọn dẹp, tái cấu trúc mã nguồn mà không đổi hành vi
- `chore: ...` : Cập nhật công cụ, cấu hình build, dependency

---

## 🚨 5. Xử Lý Sự Cố Đẩy Lỗi Thường Gặp Trong 3 Giây

| Triệu chứng | Nguyên nhân | Cách xử lý siêu tốc |
|---|---|---|
| `Updates were rejected because the remote contains work...` | Nhánh trên GitHub có commit mới hơn máy cục bộ | Chạy ngay: `git pull --rebase` rồi `git push` lại |
| `RPC failed; curl 56 OpenSSL SSL_read...` | Bộ đệm HTTP nhỏ hoặc mạng chập chờn | `git config http.postBuffer 524288000` |
| `File ... is 120 MB; this exceeds GitHub's file size limit` | Vô tình commit video/dataset quá lớn | Dùng `git reset HEAD~1` hủy commit vừa tạo, thêm file đó vào `.gitignore` rồi commit lại |
| Đang làm dở dang nhưng cần push gấp phần khác | Code chưa xong lẫn lộn với code hoàn chỉnh | Dùng `git stash push -m "tam_dung"` $\rightarrow$ commit & push phần xong $\rightarrow$ `git stash pop` |
