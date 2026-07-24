# 🛠️ OPERATIONS.md — Hướng Dẫn Vận Hành Phân Hệ Guidelines

> Tài liệu kỹ thuật nội bộ dành cho việc phát triển, bảo trì và mở rộng phân hệ **Hướng Dẫn & Nghiên Cứu Lâm Sàng** (`Guidelines.html`).
> **Cập nhật lần cuối**: 2026-07-24

---

## 📁 Cấu Trúc File

```
pages/Y học chứng cứ/Guidelines/
├── Guidelines.html        ← Trang giao diện chính (HTML shell, không chứa logic)
├── Guidelines.css         ← Toàn bộ style của phân hệ (~2000 dòng)
├── Guidelines.js          ← Toàn bộ logic nghiệp vụ (~2340 dòng)
├── GuidelinesData.js      ← Config hằng số + dữ liệu mẫu mặc định
├── README.md              ← Hướng dẫn người dùng cuối
├── OPERATIONS.md          ← Tài liệu kỹ thuật này
└── Kho Guidelines/        ← Thư mục các bài viết tóm tắt chi tiết (.html)
    ├── index.html
    ├── ks-cho-bn-nang.html
    └── ...
```

---

## 🔌 Kiến Trúc Vận Hành

### Luồng dữ liệu (Data Flow)

```
GuidelinesData.js          Guidelines.js              LocalStorage / Supabase
  SAMPLE_STUDIES    ──►    initData()          ──►    Lưu trữ dữ liệu
  SPECIALTIES              studies[] (RAM)     ◄──    Đọc dữ liệu
  SOURCE_TYPES             renderTable()       
  DESIGNS                  filterStudies()     
  IMPACTS                  ↓ HTML string       
                           tbody.innerHTML     ──►    DOM (Giao diện)
```

### Scope biến toàn cục (Global State)
Tất cả biến trạng thái được khai báo ở **top-level** của `Guidelines.js` (không IIFE, không module):

| Biến | Kiểu | Mục đích |
|------|------|----------|
| `studies` | `Array<Object>` | Mảng chính chứa toàn bộ nghiên cứu đang hiển thị |
| `selectedIds` | `Set<string>` | ID các nghiên cứu đang được tick chọn |
| `expandedIds` | `Set<string>` | ID các hàng đang xổ ra chi tiết |
| `filters` | `Object` | Trạng thái bộ lọc hiện tại (search, specialty, design...) |
| `viewMode` | `'compact' / 'full'` | Chế độ hiển thị bảng |
| `currentTab` | `'list' / 'saved' / 'compare'` | Tab đang active |
| `supabaseClient` | `Object / null` | SDK client Supabase |
| `columnVisibility` | `Object` | Map cột hiển thị/ẩn |

---

## 📐 Schema Dữ Liệu Nghiên Cứu

Mỗi object trong mảng `studies[]` có cấu trúc:

```js
{
  id: "study_empa_reg",          // ID duy nhất (string, slug)
  title: "EMPA-REG OUTCOME",     // Tên nghiên cứu (BẮT BUỘC)
  drug: "Empagliflozin 10mg QD", // Hoạt chất / can thiệp
  sourceType: "intl-study",      // "intl-study" | "intl-guideline" | "vn-moh" | "vn-doh" | "vn-association"
  specialty: "cardio",           // "cardio" | "pulmo" | "gi" | "endo" | "neuro" | "infect" | "renal" | "rheum" | "hema" | "onco" | "icu"
  design: "rct",                 // "rct" | "meta" | "cohort" | "guideline" | "review" | "other"
  intervention: "...",           // Can thiệp vs đối chứng
  primaryEndpoint: "...",        // Tiêu chí đánh giá chính
  keyResults: "HR 0.86 (95% CI 0.74-0.99, p=0.04)",  // Kết quả chính — xem phần Forest Plot
  impact: "practice-changing",   // "practice-changing" | "informative" | "early-signal" | "negative" | "regulatory"
  year: 2015,                    // Năm công bố
  organization: "NEJM / Boehringer Ingelheim",
  phase: "(N/A)",                // Giai đoạn nghiên cứu
  sampleSize: 7020,              // Cỡ mẫu (số nguyên)
  population: "Bệnh nhân ĐTĐ típ 2...",
  summary: "Kết luận cốt lõi",  // (BẮT BUỘC)
  detailedConclusion: "Chi tiết bổ sung",
  fdaStatus: "FDA Approved 2016",
  sourceUrl: "https://...",      // Link PubMed / nguồn gốc
  file: "Kho Guidelines/empa-reg.html",  // Đường dẫn tương đối tới bài tóm tắt
  asianData: true,               // boolean: có dữ liệu bệnh nhân Châu Á
  bookmarked: false,             // boolean: đã đánh dấu sao
  subgroups: {                   // Object phân tích subgroup — xem phần Subgroup
    "Có Đái tháo đường": "HR 0.64 (95% CI 0.52-0.79, p<0.001)",
    "Không Đái tháo đường": "HR 0.50 (95% CI 0.35-0.72, p<0.001)",
    "Châu Á": "HR 0.60 (95% CI 0.43-0.82, p=0.002)"
  },
  matrixEndpoints: {}            // (tùy chọn) cho bảng so sánh matrix
}
```

---

## 🗃️ Lưu Trữ Dữ Liệu (Storage Layer)

### Chế độ Local (mặc định)
- Dùng **`localStorage`** với key `clinicalGuidelines`
- Serialize/Deserialize bằng `JSON.stringify / JSON.parse`
- Giới hạn ~5MB — đủ cho vài trăm nghiên cứu

### Chế độ Supabase (cloud)
- Kết nối qua SDK `@supabase/supabase-js v2` (CDN)
- Bảng: `clinical_guidelines` (xem SQL schema trong README.md)
- Tự động seed dữ liệu mẫu khi bảng cloud còn trống
- Cấu hình URL/key lưu trong `localStorage` key `supabaseConfig`

### Hàm lưu/đọc chính

| Hàm | Mô tả |
|-----|-------|
| `initData()` | Đọc từ Supabase → fallback localStorage → fallback SAMPLE_STUDIES |
| `saveToLocalStorage()` | Ghi `studies[]` vào localStorage |
| `syncToSupabase()` | Upsert toàn bộ `studies[]` lên Supabase |
| `loadFromSupabase()` | Fetch toàn bộ dữ liệu từ Supabase về |

---

## 🌲 Forest Plot Mini — Cách Hoạt Động

### `parseForestData(keyResults)` — Trích xuất chỉ số

Hàm nhận chuỗi `keyResults` hoặc JSON object, trả về:
```js
{ label: "HR", estimate: 0.86, lower: 0.74, upper: 0.99, pValue: "0.04", isSig: true }
```

**Hỗ trợ 2 định dạng đầu vào:**

1. **JSON Object** (khuyên dùng):
```json
{ "label": "HR", "estimate": 0.86, "lower": 0.74, "upper": 0.99, "p": "0.04" }
```

2. **Chuỗi văn bản** (tự động parse):
```
HR 0.86 (95% CI 0.74-0.99, p=0.04)
OR 0.75 (95% CI 0.65-0.86)
RR 0.91; 95% CI 0.84-0.99
```

**Các chỉ số được hỗ trợ**: `OR`, `RR`, `HR`, `aOR`, `aHR`, `RD`, `ARR`, `NNT`, `NNH`, `RRR`, `SMD`, `MD`, `WMD`, `IRR`, `PR`, `ORR`, `CR`

### `renderForestPlotSVG(fd)` — Render SVG

Vẽ inline SVG với đường trục, vạch 1.0, thanh CI và kim cương estimate. Màu tự động:
- 🟢 Xanh lá: estimate < 1.0 (lợi ích)
- 🔴 Đỏ: estimate > 1.0 (nguy cơ)
- ⚪ Xám: estimate ≈ 1.0 (trung tính)

---

## 🧬 Phân Tích Subgroup — Cách Hoạt Động

### Cấu trúc dữ liệu subgroups

```js
study.subgroups = {
  "Tên phân nhóm 1": "HR 0.64 (95% CI 0.52-0.79, p<0.001)",        // dạng chuỗi
  "Tên phân nhóm 2": { "label": "OR", "estimate": 0.88, "lower": 0.72, "upper": 1.07, "p": "0.19" },  // dạng JSON
  "Châu Á": "HR 0.60 (95% CI 0.43-0.82, p=0.002)"   // Key có "Châu Á" → tự gắn badge 🌏
}
```

### Cách thêm dữ liệu Subgroup vào JSON khi import

```json
{
  "id": "study_xxx",
  "title": "Tên nghiên cứu",
  "keyResults": "HR 0.86 (95% CI 0.74-0.99, p=0.04)",
  "subgroups": {
    "Phân nhóm A": "HR 0.72 (95% CI 0.60-0.86, p<0.001)",
    "Phân nhóm B (Châu Á)": "OR 0.61 (95% CI 0.48-0.78, p<0.001)"
  }
}
```

### UI Subgroup

| Element | Vị trí | Hành động |
|---------|--------|-----------|
| Badge `🧬 Subgroup (N)` | Cùng hàng tiêu đề trong bảng | Click → mở modal |
| Nút `🧬 Subgroup (N)` | Trong dòng actions khi xổ chi tiết | Click → mở modal |
| Modal `#subgroup-modal` | Overlay toàn màn hình | Hiển thị Grid Cards |

### Hàm liên quan

| Hàm | Mô tả |
|-----|-------|
| `renderSubgroupPanel(study)` | Tạo HTML Grid Cards từ `study.subgroups` |
| `renderSubgroupForestRow(fd, overall)` | Vẽ SVG Forest Plot mini cho từng card |
| `openSubgroupModal(id, event)` | Mở modal, render nội dung subgroup |
| `closeSubgroupModal()` | Đóng modal (xóa class `active`) |

---

## 🔲 Tính Năng Giao Diện Chính

### Bộ lọc & Tìm kiếm

| Filter | Trường `filters` | Mô tả |
|--------|-----------------|-------|
| Tìm kiếm tự do | `filters.search` | So khớp title, drug, summary, primaryEndpoint, population |
| Chuyên khoa | `filters.specialty` | Dropdown SPECIALTIES |
| Thiết kế | `filters.design` | Dropdown DESIGNS |
| Loại ảnh hưởng | `filters.impact` | Dropdown IMPACTS |
| Khoảng thời gian | `filters.yearFrom / yearTo` | Năm công bố |
| Loại nguồn | `filters.sourceType` | Dropdown SOURCE_TYPES |
| Đã đánh dấu | `filters.bookmarkedOnly` | boolean |
| Có Subgroup | `filters.hasSubgroup` | boolean — từ sidebar nhanh |
| Có bài tóm tắt | `filters.hasSummary` | boolean |
| Dữ liệu Châu Á | `filters.asianOnly` | boolean |

### Luồng render bảng

```
filterStudies() → sort → build HTML string → tbody.innerHTML
```

`renderTable()` được gọi khi: load trang, thay đổi bộ lọc, thêm/sửa/xóa nghiên cứu.

---

## 🧩 Import / Export JSON

### Format JSON chuẩn

```json
[
  {
    "id": "study_unique_id",
    "title": "Tên nghiên cứu (BẮT BUỘC)",
    "summary": "Kết luận ngắn (BẮT BUỘC)",
    "drug": "Hoạt chất",
    "sourceType": "intl-study",
    "specialty": "cardio",
    "design": "rct",
    "year": 2023,
    "organization": "NEJM",
    "keyResults": "HR 0.86 (95% CI 0.74-0.99, p=0.04)",
    "impact": "practice-changing",
    "sampleSize": 7020,
    "subgroups": {
      "Phân nhóm 1": "HR 0.72 (95% CI 0.60-0.86, p<0.001)"
    }
  }
]
```

---

## 🎨 CSS Architecture

### Không hardcode màu hex!
Luôn dùng CSS variables:
```css
/* ✅ ĐÚNG */
color: var(--color-primary);
background: var(--color-surface);

/* ❌ SAI */
color: #0284c7;
```

### Các CSS Block chính

| Class | Dòng (~) | Mô tả |
|-------|----------|-------|
| `.study-table` | 514 | Bảng dữ liệu chính |
| `.badge-summary-inline` | 676 | Badge nút Tóm tắt (xanh lá) |
| `.badge-subgroup-inline` | 693 | Badge nút Subgroup (xanh ngọc) |
| `.modal-overlay` | 884 | Overlay modal popup |
| `.compare-grid` | 842 | Layout so sánh |
| `.forest-plot-inline` | ~1470 | Wrapper Forest Plot |
| `.sg-grid-container` | ~1495 | Grid Cards Subgroup |
| `.sg-card` | ~1510 | Card phân nhóm |

---

## ⚠️ Những Lỗi Thường Gặp

| Lỗi | Nguyên nhân | Cách fix |
|-----|-------------|----------|
| Button không hoạt động | CSS class bị thiếu | Kiểm tra class trong Guidelines.css |
| Modal không mở | Class `active` không được thêm đúng | Kiểm tra `classList.add('active')` |
| Forest Plot không hiển thị | `keyResults` không match regex | Dùng JSON object format |
| Subgroup badge không hiện | `study.subgroups` null hoặc array | Phải là `typeof === 'object'` |
| Dữ liệu mất sau import | `subgroups` bị strip | Kiểm tra `importData()` giữ lại `subgroups` |
| CSS không apply | Cache browser | Hard refresh Ctrl+F5 |

---

## 📋 Các Hàm Quan Trọng — Index Nhanh

| Hàm | Dòng (~) | Mục đích |
|-----|----------|----------|
| `initData()` | 130 | Khởi tạo dữ liệu khi load |
| `filterStudies()` | 460 | Lọc studies[] theo filters |
| `renderTable()` | 680 | Render toàn bộ bảng HTML |
| `toggleExpandRow(id)` | 1038 | Xổ/đóng hàng chi tiết |
| `openEditModal(id)` | 1269 | Mở form sửa nghiên cứu |
| `saveStudy()` | 1190 | Lưu nghiên cứu mới/sửa |
| `importData()` | 1375 | Import JSON |
| `parseForestData(str)` | 1486 | Parse chuỗi chỉ số thành object |
| `renderForestPlotSVG(fd)` | 1570 | Vẽ SVG Forest Plot chính |
| `renderSubgroupPanel(study)` | 2063 | Render Grid Cards subgroup |
| `renderSubgroupForestRow(fd)` | 2141 | Vẽ SVG Forest Plot mini cho card |
| `openSubgroupModal(id)` | 2167 | Mở modal phân tích subgroup |
| `closeSubgroupModal()` | 2182 | Đóng modal subgroup |
| `filterBySubgroupData()` | 2187 | Lọc nghiên cứu có subgroup |
| `updateSubgroupSidebarCount()` | 2208 | Cập nhật số đếm sidebar |

---

## 🔧 Thêm Tính Năng Mới — Checklist

- [ ] **Trường dữ liệu mới**: Thêm vào schema `SAMPLE_STUDIES` (GuidelinesData.js) + form HTML + save/load (Guidelines.js)
- [ ] **Cột mới trong bảng**: Thêm vào `columnVisibility`, header `<th>`, và `renderTable()`
- [ ] **Bộ lọc mới**: Thêm vào `filters` object + UI button/input + `filterStudies()`
- [ ] **Modal mới**: Thêm HTML vào Guidelines.html + `openXxxModal()` / `closeXxxModal()` + Escape key listener
- [ ] **CSS mới**: Thêm vào Guidelines.css, dùng CSS variables
- [ ] **Cập nhật OPERATIONS.md** để phản ánh thay đổi

---

*Cập nhật lần cuối: 2026-07-24 | Phân hệ: Guidelines & Nghiên Cứu Lâm Sàng | CliniPortal v2026*
