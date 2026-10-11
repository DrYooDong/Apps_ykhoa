# AGENTS.md — Master Workspace Rules

> Quy tắc chỉ dẫn cho mọi AI Agent làm việc trong dự án này.
> **AI phải đọc file này trước khi thực hiện bất kỳ tác vụ nào.**

---

## 🔑 1. Thông Tin Dự Án
- **Tên project**: [Tên Dự Án]
- **Công nghệ**: Pure HTML + CSS + Vanilla JavaScript (ES6+)
- **Môi trường chạy**: Trình duyệt / Offline `file:///` / Web Server nội bộ

---

## 🛑 2. Quy Tắc Bất Di Bất Dịch (Không Được Vi Phạm)
1. **Sửa đổi tối thiểu (Minimal Fix)**: Không viết lại toàn bộ file nếu chỉ cần sửa 1 hàm hay 1 khối mã.
2. **Bảo toàn dữ liệu người dùng**: Không làm gián đoạn cấu trúc lưu trữ (LocalStorage, IndexedDB, state).
3. **Không hardcode đường dẫn cục bộ**: Tuyệt đối không hardcode đường dẫn tuyệt đối máy (`C:\...`). Dùng đường dẫn tương đối.
4. **Kiểm tra Responsive & Dark Mode**: Giao diện phải hoạt động mượt mà cả trên Mobile ($\le 375\text{px}$) và Desktop.
5. **Suy nghĩ trước khi code**: Nếu yêu cầu mơ hồ hoặc có rủi ro phá vỡ mã nguồn, bắt buộc hỏi làm rõ trước.

---

## ⚡ 3. Các Lệnh Workflow Hỗ Trợ Nhanh
- `/new-feature`: Phát triển tính năng mới có kế hoạch và tự kiểm thử.
- `/fix-bug`: Sửa lỗi có phương pháp, cô lập và chống tái phát.
- `/audit`: Kiểm tra toàn diện chất lượng code, thẻ HTML và đường dẫn.
- `/ship`: Chạy bảng kiểm bàn giao trước khi commit/đóng gói.
- `/learn-from-session`: Tự động ghi lại bài học vào `.agents/learnings/`.

---

## 📋 4. Checklist Trước Khi Hoàn Tất Tác Vụ
- [ ] Không có lỗi cú pháp JavaScript hoặc console error.
- [ ] Cấu trúc thẻ HTML cân bằng, không sót thẻ đóng.
- [ ] Tính năng hoạt động đúng trên cả màn hình nhỏ (Mobile).
- [ ] Báo cáo ngắn gọn cho User: file đã sửa và cách kiểm tra.
