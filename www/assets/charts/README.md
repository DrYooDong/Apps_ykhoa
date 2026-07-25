# CliniPortal Pure JavaScript Charting Library

Thư viện vẽ biểu đồ y khoa thuần chất bằng JavaScript (không sử dụng thư viện ngoài), vẽ trực tiếp thông qua các phần tử SVG có hiệu năng cực cao và tương thích responsive.

## 📁 Cấu trúc thư mục

```
charts/
├── pure-charts.js              # Thư viện vẽ biểu đồ chính (Line, Bar, Gauge, Radar)
├── medical-chart-presets.css    # Các lớp màu sắc chuyên dụng cho y tế (nhịp tim, huyết áp)
├── demo-charts.html            # Trang demo tích hợp vẽ biểu đồ sinh lý trực quan
└── README.md                   # Tài liệu này
```

## 📊 Các loại biểu đồ hỗ trợ

1. **Line Chart (Biểu đồ đường)**: Vẽ diễn tiến các dấu hiệu sinh tồn (nhiệt độ, mạch).
2. **Bar Chart (Biểu đồ cột)**: So sánh định lượng xét nghiệm qua các mốc thời gian.
3. **Gauge Chart (Biểu đồ đồng hồ đo)**: Hiển thị mức độ lọc cầu thận GFR hoặc thang điểm tiên lượng nặng.
4. **Radar Chart (Biểu đồ mạng nhện)**: Phân tích đa diện (ví dụ: các tiêu chí chẩn đoán Lupus hoặc Sepsis).
