# ⚙️ Phân hệ Công cụ Lâm sàng (Clinical Calculators & Tools — TypeScript Native SPA)

Tài liệu này mô tả cấu trúc thư mục, kiến trúc và quy chuẩn phát triển phần mềm cho phân hệ **Công cụ Lâm sàng & Studio Workbenches** thuộc hệ sinh thái **CliniPortal**.

---

## 🚀 1. Định hướng Phát triển & Kiến Trúc TypeScript Native

Phân hệ tập trung **thuần vào các công cụ hỗ trợ bác sĩ** trong việc thực hành lâm sàng hàng ngày tại giường bệnh (bedside). Toàn bộ hệ thống chạy trên nền tảng **TypeScript Native SPA** không dùng file HTML phân mảnh:

1. **Reactive Calculations & Real-time Audits**: Mọi thay đổi input kích hoạt tính toán và phân tầng nguy cơ tức thời.
2. **Visual Risk Stratification**: Phân tầng nguy cơ trực quan (Xanh lục / Vàng hổ phách / Đỏ / Tím nguy kịch) tuân thủ Design Tokens của CliniPortal.
3. **Actionable Clinical Guidance**: Hiển thị khuyến cáo xử trí, chỉ định can thiệp thủ thuật và phác đồ thuốc chuẩn EBM (ESC, AHA, KDIGO, GINA, SSC 2026).
4. **Clinical Studio Workbenches**: Bàn làm việc chuyên sâu 4 cột tích hợp mô phỏng Canvas/SVG, đa bơm tiêm điện, phác đồ can thiệp và xuất y lệnh HIS.
5. **Offline-First**: 100% dữ liệu và thuật toán hoạt động không phụ thuộc API bên ngoài.

---

## 📁 2. Cấu trúc Thư mục TypeScript Hiện tại (`src/content/calculators/`)

```text
src/content/calculators/
├── index.ts                      # Module Entry Point & Re-exports
├── types.ts                      # Type definitions chung
├── data.ts                       # Database danh mục 45+ công cụ & lab values
├── renderer.ts                   # Hub UI Controller & Favorites Manager
├── calculators-view.ts           # Master Hub SPA View (Hero Gears, Sticky Sidebar, Bento Grid)
├── studio-models.ts              # Studio Workbenches Type Models
├── studio-registry.ts            # Manifest Catalog 18+ Clinical Studios
├── studio-view.ts                # Studio Hub Bento & 4-Panel Workbench Runner
├── cardiology/                   # Tim Mạch & Huyết Khối
│   ├── cardiology-views.ts       # SPA View (SCORE2, LDL-C, Suy tim, Wells DVT/PE, Arrhythmia)
│   ├── ptnc-tim-mach.ts          # Score2 engine
│   ├── dg-ldl-c.ts               # Mục tiêu LDL-C ESC/VNHA engine
│   ├── dg-suy-tim.ts             # Suy tim engine
│   ├── dg-vte.ts                 # Wells DVT/PE engine
│   └── phan-loai-roi-loan-nhip.ts# Arrhythmia Pro Studio engine
├── emergency/                    # Cấp Cứu, Hồi Sức Tích Cực & Chống Độc
│   ├── emergency-views.ts        # SPA View (An thần, Vận mạch, Bù dịch, Máy thở, ACLS, Stroke...)
│   ├── ql-may-tho.ts             # Giả lập máy thở ICU 3 kênh sóng thở
│   ├── ql-bu-dich.ts             # Bù dịch 7 bệnh cảnh lâm sàng
│   ├── ql-van-mach.ts            # Vận mạch đa bơm tiêm điện & điểm VIS
│   ├── acls-resus.ts             # ACLS CPR Metronome & Protocol
│   ├── toxicology-studio.ts      # Chống độc & Toxidrome
│   ├── polytrauma-mtp.ts         # Đa chấn thương & MTP 1:1:1
│   └── dg-an-than-icu.ts         # RASS / CPOT / CAM-ICU
├── endocrinology/                # Nội Tiết & Chuyển Hóa
│   └── endocrinology-views.ts    # Diabetes & Insulin Pro Studio (Basal-Bolus & Bơm tiêm điện)
├── gastroenterology/             # Tiêu Hóa & Dinh Dưỡng
│   ├── gastro-views.ts           # SPA View (Child-Pugh, MELD, Dinh dưỡng, SAAG, GBS, HCC)
│   ├── dg-dinh-duong.ts          # Dinh dưỡng nội trú
│   ├── dg-ptnc-hcc.ts            # Nguy cơ HCC theo AGA
│   └── dg-xhth.ts                # Glasgow-Blatchford xuất huyết tiêu hóa
├── general/                      # Công Cụ Chung & NCKH
│   ├── general-views.ts          # SPA View (Quy đổi liều, Cỡ mẫu, Công thức sinh lý, ICD-10, Bệnh án)
│   ├── quy-doi-lieu-tuong-duong.ts # Database & quy đổi Corticoid, Opioid, Statin, PPI, DOACs
│   ├── nckh-tinh-co-mau.ts       # Tính cỡ mẫu 5 thiết kế nghiên cứu
│   ├── formula-vault.ts          # Kho công thức sinh lý định lượng
│   └── tracuu-ma-icd10.ts        # Tra cứu 15.844 mã ICD-10 & thẩm định BHYT
├── hematology/                   # Huyết Học & Xét Nghiệm
│   ├── hematology-views.ts       # SPA View (Thiếu máu MCV/RPI & Lab Pro Studio)
│   └── dg-thieu-mau.ts           # Phân tầng thiếu máu
├── infectious/                   # Truyền Nhiễm & Kháng Sinh
│   ├── infectious-views.ts       # SPA View (Sepsis Studio, Chỉnh liều kháng sinh, Vancomycin, Vi sinh)
│   ├── ql-vancomycin.ts          # AUC/MIC 24h & Cmin Vancomycin
│   └── sepsis-studio.ts          # Sepsis-3 1-Hour Bundle & qSOFA/SOFA
├── neurology/                    # Thần Kinh & Đột Quỵ
│   └── neurology-views.ts        # Stroke Pro Studio (rtPA, EVT, ASPECTS, Nicardipine)
└── renal/                        # Thận, Điện Giải & Toan Kiềm
    ├── renal-views.ts            # SPA View (eGFR CKD-EPI, ABG Studio, Điện giải, AKI)
    ├── renal-function.ts         # eGFR CKD-EPI 2021 & Cockcroft-Gault
    ├── dg-nguyen-nhan-aki.ts     # Phân loại nguyên nhân AKI
    └── dg-abg-studio.ts          # Phân tích khí máu 6 bước
```

---

## 🛠️ 3. Quy Chuẩn Kỹ Thuật (TypeScript SPA)

1. **100% TypeScript (`.ts`)**: Mọi logic tính toán, render template chuỗi HTML và tương tác DOM được viết trong module `.ts`.
2. **Router Navigation**: Điều hướng qua hash SPA `#/calculators/...` đăng ký tập trung tại `src/index.ts`.
3. **Window Event Handlers**: Các hàm xử lý tính toán phản ứng (reactive functions) được gắn vào `window` thông qua `declare global { interface Window { ... } }`.
4. **Design Tokens**: Sử dụng biến màu CSS `var(--color-primary)`, `var(--color-surface)`, `var(--color-border)` đồng bộ cho cả Light Mode & Dark Mode.
