# 🧬 Hướng Dẫn Kiến Trúc & Vận Hành Phân Hệ Basic Medical Sciences (Cơ Sở Y Khoa)

> **Basic Medical Sciences Subsystem Guide**: Tài liệu mô tả kiến trúc mô-đun, hệ thống stylesheet dùng chung, các linh kiện Web Components và quy trình biên soạn bài viết trong phân hệ **Basic Medical Sciences** (Giải phẫu, Sinh lý, Cơ chế bệnh sinh, Hóa sinh & Dịch tễ học) của CliniPortal.

---

## 📁 1. Cấu Trúc Thư Mục Phân Hệ

```text
src/content/basic-medical/
├── biochemistry/                    # Kho 31 bài Hóa sinh y học phân tử theo 7 Khối
├── views/                           # SPA Views & Hub Controllers
│   ├── pathophysiology-view.ts      # Master Hub View cho Basic Medical Sciences
│   ├── giai-phau-sinh-ly-view.ts    # SPA View Giải phẫu & Sinh lý 9 Hệ
│   ├── co-che-benh-sinh-view.ts     # SPA View Cơ chế bệnh sinh 16 Chuyên khoa
│   ├── biochemistry-view.ts         # SPA View Hóa sinh Y học (Metabolic Navigator)
│   ├── biochemistry-hub.ts          # Controller cho Hóa sinh Hub
│   ├── epidemiology-view.ts         # SPA View Dịch tễ học (2x2 Matrix Solver, Epicurve)
│   ├── formula-vault-view.ts        # SPA View Kho Công thức Sinh lý
│   ├── patho-hub.ts                 # Controller cho Pathophysiology Hub
│   ├── physio-html-reader-view.ts   # SPA HTML Reader View
│   ├── physio-reader-view.ts        # SPA Markdown Reader View
│   └── renderer.ts                  # DOM Renderer & Tab Switcher
│
├── data/                            # Danh mục dữ liệu TypeScript & JSON
│   ├── data.ts                      # Flashcards & Formulas Data
│   ├── biochemistry-data.ts         # Cơ sở dữ liệu 7 Khối Hóa sinh
│   └── epidemiology-data.ts         # Cơ sở dữ liệu 6 Khối Dịch tễ học & Thống kê
│
├── types/                           # Định nghĩa TypeScript Types
│   ├── types.ts                     # Core Types cho Sinh lý & Bệnh học
│   ├── biochemistry.types.ts        # Types cho Hóa sinh
│   └── epidemiology.types.ts        # Types cho Dịch tễ học & Nghiên cứu
│
├── js/                              # Controllers & Shared Scripts (Image Lightbox, Reading Progress)
│   └── physio-shared.ts             # Module dùng chung (Progress, Lightbox, Smooth Scroll, Pearl Copy)
│
├── quiz/                            # Kho câu hỏi trắc nghiệm & Exam Bank
├── simulators/                      # Bộ mô phỏng Nernst, Wiggers, ABG, Starling
├── content/                         # Bài viết Sinh lý & Cơ chế bệnh sinh (.md)
├── css/                             # Stylesheets chuyên biệt của phân hệ
├── pathophysiology-cases/           # Kho bài viết Sinh lý bệnh lâm sàng (.html)
├── physiology/                      # Các bài học Sinh lý học cơ quan chi tiết (.html)
├── index.ts                         # Main Barrel Entry Point cho basic-medical
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
