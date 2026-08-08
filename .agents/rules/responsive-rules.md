# Quy Tắc Responsive Mobile-First

## 📱 Tiêu chuẩn Giao diện Di động

1. **Thiết kế Mobile-First**: Ưu tiên viết CSS cho giao diện di động trước, sau đó dùng `@media (min-width: 768px)` để mở rộng layout cho Desktop/Tablet.
2. **Hỗ trợ Màn hình Nhỏ**: Đảm bảo hiển thị không bị vỡ layout hay xé ngang trên màn hình di động nhỏ ($\le 375\text{px}$).
3. **Vùng Tương tác Cảm ứng (Touch Targets)**:
   - Các nút bấm, icon bấm được, ô chọn input phải có kích thước vùng tương tác tối thiểu **44x44px** để bác sĩ thao tác dễ dàng trên di động/máy tính bảng.
