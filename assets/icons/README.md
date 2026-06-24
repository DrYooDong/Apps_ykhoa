# CliniPortal Medical Icon Repository

Thư mục này chứa bộ sưu tập các icon SVG chuyên biệt cho các phân hệ y khoa của CliniPortal.

## 📁 Cấu trúc thư mục

```
icons/
├── ic-cong-cu.svg        # Icon Công cụ lâm sàng
├── ic-duoc-ly.svg        # Icon Dược lý
├── ic-nhiem-khuan.svg    # Icon Nhiễm khuẩn
├── ic-noi-tiet.svg       # Icon Nội tiết
├── ic-phac-do.svg        # Icon Phác đồ điều trị
├── ic-than-kinh.svg      # Icon Thần kinh
├── ic-than.svg           # Icon Thận - Tiết niệu
├── ic-tiep-can.svg       # Icon Tiếp cận lâm sàng
├── ic-tieu-hoa.svg       # Icon Tiêu hóa
├── ic-tim-mach.svg       # Icon Tim mạch
├── ic-trang-chu.svg      # Icon Trang chủ
├── ic-y-hoc.svg          # Icon Y học chứng cứ
├── README.md             # Tài liệu này
└── demo-icons.html       # Bản xem trước trực quan các icon
```

## 🎨 Hướng dẫn sử dụng & Tùy biến

Tất cả các icon SVG đều sử dụng thuộc tính `fill="currentColor"` hoặc `stroke="currentColor"` để dễ dàng đổi màu bằng CSS.

### Sử dụng trực tiếp trong HTML:

```html
<svg class="medical-icon">
  <use xlink:href="/assets/icons/ic-tim-mach.svg#icon-root"></use>
</svg>
```

### Đổi màu động qua CSS:

```css
.medical-icon {
  width: 24px;
  height: 24px;
  color: var(--color-primary); /* Đổi màu tự động */
}
```
