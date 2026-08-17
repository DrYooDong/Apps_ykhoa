# 🧬 Hướng Dẫn Kiến Trúc & Vận Hành Phân Hệ Sinh Lý - Sinh Lý Bệnh

> **Pathophysiology Subsystem Guide**: Tài liệu mô tả kiến trúc mô-đun, hệ thống stylesheet dùng chung, các linh kiện Web Components và quy trình biên soạn bài viết trong phân hệ **Sinh lý & Sinh lý bệnh** của CliniPortal.

---

## 📁 1. Cấu Trúc Thư Mục Phân Hệ

```text
src/content/pathophysiology/
├── biochemistry/                    # Kho 31 bài Hóa sinh y học phân tử theo 7 Khối
│   ├── block1-biomolecules/         # Khối 1: Nền tảng phân tử sinh học
│   ├── block2-catalysis-signaling/  # Khối 2: Xúc tác, Màng & Tín hiệu tế bào
│   ├── block3-bioenergetics/        # Khối 3: Năng lượng sinh học & Chu trình Krebs
│   ├── block4-intermediary-metabolism/ # Khối 4: Chuyển hóa trung gian 4 đại phân tử
│   ├── block5-molecular-genetics/   # Khối 5: Di truyền học phân tử & Kỹ thuật gen
│   ├── block6-organ-metabolism/     # Khối 6: Hóa sinh cơ quan & Tích hợp chuyển hóa
│   ├── block7-clinical-biochemistry/# Khối 7: Hóa sinh lâm sàng & Thăm dò xét nghiệm
│   └── README.md                    # Hướng dẫn chi tiết kho Hóa sinh
│
├── content/                         # Bài viết Sinh lý & Cơ chế bệnh sinh (.md)
│   ├── sinhly/phan1/                # Đại cương tế bào & Điện sinh lý
│   └── slb-ccbs/                    # Sinh lý bệnh Hội chứng vành cấp (ACS)...
│
├── css/                             # Stylesheets chuyên biệt của phân hệ
│   └── physio-shared.css            # Stylesheet dùng chung cho toàn bộ phân hệ
│
├── data/                            # Danh mục dữ liệu JSON
│   └── physio-catalog.json          # Catalog phân loại bài học sinh lý
│
├── js/                              # Controller & Web Components
│   ├── components/                  # Web Components (<physio-alert>, <physio-quiz>...)
│   └── physio-shared.js             # Lazy loading hình ảnh & Lightbox y khoa
│
├── pathophysiology-cases/           # Kho bài viết Sinh lý bệnh lâm sàng (.html)
├── physiology/                      # Các bài học Sinh lý học cơ quan chi tiết
├── simulators/                      # Bộ mô phỏng Nernst, Wiggers, ABG
├── index.json                       # Chỉ mục nạp động qua ContentLoader
├── index.md                         # Cổng thông tin điều hướng chính
└── README.md                        # Tài liệu hướng dẫn này
```

---

## 🧩 2. Hệ Thống Vanilla Web Components Y Khoa

Phân hệ tích hợp các Web Components chuẩn W3C Native Custom Elements:

### 2.1 Hộp Điểm Ngọc & Cảnh Báo Lâm Sàng (`<physio-alert>`)
- **Thuộc tính `type`**: `pearl` (Điểm ngọc lâm sàng), `warning` (Cảnh báo nguy cơ), `danger` (Khẩn cấp), `concept` (Khái niệm then chốt), `info` (Bổ trợ).
```html
<physio-alert type="pearl" title="Clinical Pearl">
  Hạ Magnesi máu kháng trị làm mất ức chế kênh ROMK tại ống lượn xa, dẫn tới tăng đào thải Kali qua nước tiểu.
</physio-alert>
```

### 2.2 Nút Liên Kết Sinh Lý - Bệnh Lý (`<physio-mirror-button>`)
Tạo nút chuyển đổi tức thì từ cơ chế sinh lý bình thường sang cơ chế bệnh học tương ứng:
```html
<physio-mirror-button 
  target="pathophysiology-cases/slb-ccbs-aki.html" 
  title="Cơ chế Bệnh lý: Rối loạn Màng Tế bào & Tổn thương Thận Cấp (AKI)">
</physio-mirror-button>
```

### 2.3 Trắc Nghiệm Tự Đánh Giá Tức Thì (`<physio-quiz>`)
Tích hợp câu hỏi trắc nghiệm kèm giải thích cơ chế phân tử:
```html
<physio-quiz quiz-id="quiz_diensinhly_01">
  <script type="application/json">
  {
    "question": "Pha 0 của điện thế hoạt động cơ thất phát sinh chủ yếu do dòng ion nào?",
    "options": ["Dòng K+ đi ra", "Dòng Na+ nhanh đi vào", "Dòng Ca2+ chậm đi vào", "Dòng Cl- đi vào"],
    "correctIndex": 1,
    "explanation": "Pha 0 khử cực nhanh phát sinh do mở đồng loạt các kênh Na+ phụ thuộc điện thế (INa nhanh)."
  }
  </script>
</physio-quiz>
```

---

## 🎨 3. Quy Chuẩn CSS & Giao Diện Dark Mode

- **Design Tokens**: Luôn sử dụng biến CSS hệ thống (`var(--color-primary)`, `var(--color-surface)`, `var(--color-warning-hl)`...).
- **Table Responsive**: Mọi bảng biểu cận lâm sàng phải được bọc trong thẻ `<div class="table-responsive">` để có thanh cuộn ngang mượt trên điện thoại di động.
- **Micro-Animations**: Các thẻ card có hiệu ứng hover nâng nhẹ (`transform: translateY(-2px)`), viền phát sáng mềm mại theo biến màu chủ đạo.
