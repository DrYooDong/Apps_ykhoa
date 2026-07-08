---
name: clinical-tools-module
description: >
  Tạo và chỉnh sửa các công cụ tính toán lâm sàng (Clinical Calculators & Decision Support)
  trong phân hệ Công cụ của CliniPortal. Kích hoạt khi AI cần: tạo máy tính lâm sàng mới,
  thêm phác đồ điều trị động, bộ tính toán chỉ số y khoa, hoặc làm việc với
  pages/Công cụ/.
---

# Clinical Tools Module Skill

## 📁 Cấu trúc Phân hệ

```
pages/Công cụ/
├── cong-cu.html                         # Hub tổng
├── HUONG_DAN_THIET_KE.md               # ⭐ Design guide chi tiết (2 Styles)
├── Chung/
│   ├── Tracuu_maICD10.html              # Tra cứu ICD-10
│   ├── Bệnh án/
│   │   └── benh-an-noi-khoa.html
│   └── NCKH/
│       └── NCKH_Tinhcomau.html
├── Cấp cứu & hồi sức/
│   └── QL_Budich.html                   # ⭐ Mẫu chuẩn STYLE 1
├── Hô hấp & Lao/
├── Nội tiết & Chuyển hóa/
├── Thận & Điện giải - toan kiềm/
│   ├── DG_ABG.html                      # ⭐ Mẫu chuẩn STYLE 2
│   └── renal-function.html
├── Tim mạch & huyết khối/
├── Tiêu hóa & Dinh dưỡng/
├── Thần kinh/
└── Truyền Nhiễm/
```

---

## ⚡ Đường dẫn & CSS/JS (Cấp 3)

File trong `pages/Công cụ/[Phân nhóm]/file.html` — **prefix `../../../`**:

```html
<link rel="stylesheet" href="../../../css/reset.css">
<link rel="stylesheet" href="../../../css/main.css">
<link rel="stylesheet" href="../../../css/components/header.css">
<link rel="stylesheet" href="../../../css/components/sidebar.css">
<link rel="stylesheet" href="../../../css/components/footer.css">
<script src="../../../js/main.js" defer></script>
<script src="../../../components/header.js" defer></script>
<script src="../../../components/footer.js" defer></script>
```

---

## 🎨 STYLE 1 — Treatment Fluid Advisors (Phác đồ / Bù dịch)

**Dùng cho**: Bài toán liều thuốc, bù dịch phức tạp, phác đồ xử trí theo giai đoạn.
**Tham khảo mẫu**: `pages/Công cụ/Cấp cứu & hồi sức/QL_Budich.html`

### Thành phần UI cốt lõi

```html
<!-- 1. Hero Card giới thiệu -->
<div class="hero-bd">
  <h1 class="hero-title">Tên Công cụ</h1>
  <p class="hero-subtitle">Mô tả ngắn gọn</p>
</div>

<!-- 2. Grid chọn bệnh cảnh -->
<div class="scenario-grid">
  <button class="sc-btn sc-danger active" onclick="selectScenario('name')">
    Bệnh cảnh A
  </button>
  <button class="sc-btn sc-amber" onclick="selectScenario('name2')">
    Bệnh cảnh B
  </button>
  <!-- Màu: sc-danger (đỏ), sc-amber (vàng), sc-teal (xanh ngọc), sc-purple (tím) -->
</div>

<!-- 3. Kết quả tính toán dạng thẻ -->
<div class="fluid-cards-grid">
  <div class="fluid-card fc-blue">         <!-- fc-blue, fc-green, fc-red, fc-amber -->
    <div class="fc-header">Loại dịch</div>
    <div class="fc-body">
      <div class="rate-display">
        <span class="rate-val" id="rateValue">125</span>
        <span class="rate-unit">mL/h</span>
      </div>
    </div>
  </div>
</div>

<!-- 4. Hộp cảnh báo an toàn -->
<div class="ab ab-danger">⛔ Cảnh báo nguy cơ cao</div>
<div class="ab ab-warn">⚠️ Thận trọng</div>
<div class="ab ab-info">ℹ️ Thông tin lâm sàng</div>
<div class="ab ab-ok">✅ Phù hợp</div>
```

---

## 🧮 STYLE 2 — Diagnostic Calculators (Máy tính chẩn đoán)

**Dùng cho**: Tính điểm lâm sàng (PSI, CURB-65, NIHSS), phân tích ABG, chỉnh liều.
**Tham khảo mẫu**: `pages/Công cụ/Thận & Điện giải - toan kiềm/DG_ABG.html`

CSS riêng: `css/components/abg-calculator.css` hoặc `insulin-calculator.css`

```html
<!-- Panel nhập liệu -->
<div class="calc-panel">
  <div class="calc-input-group">
    <label class="calc-label" for="ph">pH máu động mạch</label>
    <input type="number" id="ph" class="calc-input" 
           placeholder="7.35 – 7.45" min="6.8" max="7.8" step="0.01">
  </div>
</div>

<!-- Nút tính toán -->
<button class="calc-btn" onclick="calculateResult()">
  <i class="fas fa-calculator"></i> Phân tích
</button>

<!-- Hiển thị kết quả -->
<div class="result-panel" id="resultPanel" style="display:none">
  <div class="result-header">Kết quả Phân tích</div>
  <div class="result-grid">
    <div class="result-item">
      <div class="result-label">Chẩn đoán</div>
      <div class="result-value" id="diagnosis">—</div>
    </div>
  </div>
</div>

<!-- Badge phân loại -->
<span class="badge badge-danger">Toan chuyển hóa</span>
<span class="badge badge-warning">Bù trừ một phần</span>
<span class="badge badge-success">Bình thường</span>
```

---

## 🗂️ Phân loại Công cụ Theo Chuyên khoa

| Chuyên khoa | Thư mục |
|------------|---------|
| Chung (ICD, Bệnh án, NCKH) | `Chung/` |
| Cấp cứu & Hồi sức | `Cấp cứu & hồi sức/` |
| Hô hấp & Lao | `Hô hấp & Lao/` |
| Nội tiết & Chuyển hóa | `Nội tiết & Chuyển hóa/` |
| Thận & Điện giải | `Thận & Điện giải - toan kiềm/` |
| Tim mạch | `Tim mạch & huyết khối/` |
| Tiêu hóa | `Tiêu hóa & Dinh dưỡng/` |
| Thần kinh | `Thần kinh/` |
| Truyền Nhiễm | `Truyền Nhiễm/` |

---

## 📝 Quy trình Tạo Công cụ Mới

1. **Xác định Style** — Phác đồ/Bù dịch → Style 1; Máy tính điểm → Style 2
2. **Chọn thư mục** đúng chuyên khoa
3. **Copy boilerplate** từ `templates/calculator-template.html`
4. **Đọc** `pages/Công cụ/HUONG_DAN_THIET_KE.md` để xem ví dụ đầy đủ của cả 2 Style
5. **JavaScript**: Viết inline trong `<script>` tag hoặc file riêng trong thư mục công cụ
6. **Cập nhật** `docs/FILE_MAP.md` sau khi tạo xong
