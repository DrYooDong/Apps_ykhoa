# Quy chuẩn Thiết kế & Biên soạn Công cụ Lâm sàng (CliniPortal)

Thư mục `pages/Công cụ/` chứa các ứng dụng tính toán lâm sàng, công cụ tra cứu y tế và hướng dẫn phác đồ điều trị động. Để duy trì tính nhất quán về thẩm mỹ và chức năng, các công cụ tiếp theo phải được xây dựng theo một trong ba phong cách giao diện (UI Style) chuẩn dưới đây.

---

## 📁 1. Quy tắc Đường dẫn Tương đối (Relative Paths)

Đường dẫn tài nguyên hệ thống (CSS, JS, Header, Footer) phải lùi đúng số cấp thư mục tương ứng:

- **Cấp thư mục 4** (`pages/Công cụ/[Phân_nhóm]/[Tên_tệp].html`): Lùi **3 cấp** (`../../../`)
  - *Ví dụ:* `../../../css/reset.css`, `../../../css/main.css`, `../../../components/header.js`, `../../../js/main.js`.
- **Cấp thư mục 5** (`pages/Công cụ/[Phân_nhóm]/[Thư_mục_con]/[Tên_tệp].html` - Ví dụ: `pages/Công cụ/Chung/Tra cứu mã ICD10/Tracuu_maICD10.html`): Lùi **4 cấp** (`../../../../`)
  - *Ví dụ:* `../../../../css/reset.css`, `../../../../css/main.css`, `../../../../components/header.js`, `../../../../js/tracuu-icd10.js`.

---

## ⚡ STYLE 1: Công cụ Bù dịch / Hướng dẫn Xử trí Lâm sàng (Treatment Fluid Advisors)

### Đặc điểm
Dành cho các bài toán tính toán liều lượng thuốc, dịch truyền, phân chia các giai đoạn bù dịch phức tạp theo thời gian thực (được tham chiếu từ mẫu `QL_Budich.html`).

### Các thành phần UI cốt lõi
1. **Hero Gradient Card (`.hero-bd`)**: Khung giới thiệu nổi bật với gradient chuyển màu y tế xanh dương-xanh ngọc.
2. **Scenario Grid Button (`.sc-btn`)**: Các nút chọn nhanh bệnh cảnh lâm sàng. Nút được tô màu phân biệt theo chuyên khoa hoặc độ nặng (`.sc-danger`, `.sc-amber`, `.sc-teal`, `.sc-purple`). Khi chọn, nút nhận class `.active`.
3. **Ý lệnh Phác đồ dạng Thẻ (`.fluid-card`)**: Hiển thị kết quả tính toán chi tiết theo từng loại dịch (`.fc-blue`, `.fc-green`, `.fc-red`, `.fc-amber`).
4. **Hiển thị Tốc độ Truyền lớn (`.rate-display`)**: Khối hiển thị kết quả chính với con số cực lớn (`.rate-val`) và đơn vị (`.rate-unit`).
5. **Hộp cảnh báo an toàn (`.ab`)**: Banner cảnh báo nguy cơ với các lớp `.ab-danger`, `.ab-warn`, `.ab-info`, `.ab-ok`.

---

## 🔍 STYLE 2: Thang điểm Sàng lọc Đa chỉ số / Sepsis & Suy tạng (Diagnostic Screening Panels)

### Đặc điểm
Dành cho các công cụ tích hợp nhiều thang điểm đánh giá song song ( tin tưởng như NEWS2, qSOFA, SOFA, SIRS) cùng lúc để sàng lọc mức độ nặng, chẩn đoán nguy cơ và ước tính tỷ lệ tử vong (được tham chiếu từ mẫu `SL_Nhiem-khuan.html`).

### Các thành phần UI cốt lõi
1. **Lưới Chia Cột Đánh Giá (`.assessment-grid`)**: Sử dụng lưới 2 cột trên Desktop (`2fr 1fr`). Cột trái chứa thông số đầu vào (`.input-column`), Cột phải là bảng điểm tổng hợp bám dính (`.results-sidebar` + `.sticky-card`).
2. **Form nhập liệu thu gọn (`.form-grid-2`, `.form-grid-3`)**: Thiết kế tối ưu hóa diện tích hiển thị.
3. **Danh sách Checkbox bệnh nền (`.checkbox-group`)**: Sử dụng bộ chọn `accent-color` của CliniPortal.
4. **Dòng Điểm số có Huy hiệu màu (`.score-row` + `.score-badge`)**: Hiển thị điểm số với nhãn màu phản ánh mức độ nguy cơ (`.badge-normal`, `.badge-mild`, `.badge-severe`, `.badge-critical`).
5. **Hộp Định Vị Lâm Sàng Động (`.diagnostic-box`)**: Tự động đổi màu nền và màu viền sang trạng thái nguy hiểm (`.alert-active`) khi các chỉ số vượt ngưỡng.

---

## 🩺 STYLE 3: Studio Tra cứu Lâm sàng & Thẩm định BHYT / Mã hóa Y tế (Clinical Audit & Lookup Studios)

### Đặc điểm
Dành cho các công cụ tra cứu mã bệnh y tế, kiểm tra quy tắc thanh toán BHYT, tự động thẩm định hồ sơ bệnh án và hỗ trợ xuất dữ liệu phần mềm HIS (được tham chiếu từ mẫu `Tracuu_maICD10.html`).

### Các thành phần UI cốt lõi
1. **Hero Stats Bar (`.icd-hero` + `.icd-stats-bar`)**: Khung tổng quan hiển thị số lượng dữ liệu offline, chứng nhận tiêu chuẩn và cụm nút thao tác xuất CSV/nhập quy tắc custom.
2. **Thanh Chuyển Mode Tabs (`.mode-tabs` + `.mode-tab`)**: Chuyển đổi linh hoạt giữa chế độ Tra cứu Mã ICD và Tra cứu Lọc Chỉ định BHYT.
3. **Thẻ Dịch Vụ BHYT (`.bhyt-card`)**: Hiển thị điều kiện thanh toán BHYT, phân loại (CLS, Thuốc, Can thiệp) và các huy hiệu mã ICD được bảo hiểm chi trả.
4. **Khung Ca Bệnh Bên Phải (`.icd-sidebar-panel`)**: Bảng điều khiển bám dính quản lý bộ mã bệnh chính/bệnh kèm, tích hợp:
   - **Menu Ca bệnh mẫu (`#presetSelect`)**: Nạp nhanh các bộ mã lâm sàng điển hình theo chuyên khoa.
   - **Cụm Nút Copy HIS (`#hisCopyActions`)**: Sao chép mã theo định dạng chấm phẩy `;` (VNPT-HIS, Viettel-HIS) hoặc dấu phẩy `,` (FPT-HIS) và văn bản chẩn đoán tiếng Việt.
5. **Modal Quản lý Quy tắc Custom (`.icd-modal`)**: Cho phép bác sĩ tự cấu hình điều kiện BHYT và lưu trữ bền vững vào `localStorage`.

---

## 💻 4. Tách biệt Mã nguồn & Tệp Tự túc (Modular Architecture)

Để đảm bảo hiệu năng và khả năng bảo trì cao nhất, mọi công cụ mới thuộc phân hệ Công cụ phải tuân thủ việc tách nhỏ mã nguồn:
- **Tệp HTML**: Chứa khung cấu trúc ngữ nghĩa HTML5, không chèn style CSS inline hay khối JS inline dài.
- **Tệp CSS**: Đặt trong `css/components/[tên-công-cụ].css`.
- **Tệp JS**: Đặt trong `js/[tên-công-cụ].js`.
- **Dữ liệu Tĩnh (nếu có)**: Đặt trong `js/data/[tên-dữ-liệu].js` và hỗ trợ tính năng Xuất CSV để hoạt động độc lập vĩnh viễn.

---

## 🏛️ 5. Kiến trúc Engine Lâm sàng Tách biệt (Clinical Engine Architecture Pattern)

Đối với các công cụ có **thuật toán tính toán đa công thức, nhiều bước xử lý hoặc phân tầng rủi ro phức tạp**, bắt buộc phải áp dụng bộ 3 Design Patterns thông qua thư viện core dùng chung `js/core/clinical-engine.js`:

### 1. Thành phần Cốt lõi (`js/core/clinical-engine.js`)
* **`ClinicalEngine.Strategy`**: Đóng gói các công thức y khoa độc lập (`calculate(context)`). Khi thêm phương pháp tính toán mới, chỉ cần tạo Strategy mới mà không làm ảnh hưởng các công thức hiện tại.
* **`ClinicalEngine.PipelineStep`**: Mỗi mắt xích xử lý 1 nhiệm vụ riêng biệt trong chuỗi (`setNext()`, `process(context)`).
* **`ClinicalEngine.Pipeline`**: Trình điều phối chạy chuỗi Pipeline (`addStep()`, `execute(context)`).
* **`ClinicalEngine.StateManager`**: Quản lý Form nhập liệu linh hoạt theo đối tượng (Nhi khoa vs Người lớn, Đơn vị SI vs Đơn vị Truyền thống).

### 2. Cấu trúc Tệp Chuẩn cho Công cụ Tính toán Mới
```
js/
├── core/
│   └── clinical-engine.js          # Module core dùng chung toàn hệ thống
└── calculators/
    └── [tên-công-cụ]-engine.js     # Engine đóng gói các Strategies & Pipeline Steps
```

### 3. Tích hợp trong HTML (`pages/Công cụ/[Phân nhóm]/file.html`)
```html
<!-- Load core engine và engine công cụ ở phần head với defer -->
<script src="../../../js/core/clinical-engine.js" defer></script>
<script src="../../../js/calculators/[tên-công-cụ]-engine.js" defer></script>

<script>
document.addEventListener('DOMContentLoaded', () => {
    async function calculate() {
        const context = await window.[TenEngine].pipeline.execute({
            // Input data từ UI
        });
        // Render kết quả lên UI từ context
    }
});
</script>
```

### 4. Công cụ Mẫu Chuẩn Tham chiếu
* **File HTML**: `pages/Công cụ/Thận & Điện giải - toan kiềm/renal-function.html`
* **File Engine**: `js/calculators/renal-engine.js`

---

## 🔗 6. Quy chuẩn Liên kết Dữ liệu Lâm sàng giữa các Công cụ (Inter-Tool Clinical Bridge)

Để tránh việc bác sĩ phải nhập lại các thông số nhân khẩu học và xét nghiệm (Tuổi, Giới tính, Cân nặng, Creatinine, eGFR...) khi di chuyển qua lại giữa các công cụ trong hệ sinh thái CliniPortal, các ứng dụng phải tích hợp module **`js/core/clinical-bridge.js`**:

### 1. Đồng bộ Session Bệnh nhân (`ClinicalBridge.updateSession`)
* Khi một công cụ tính toán hoàn tất (ở bước cuối của Pipeline), tự động gọi `ClinicalBridge.updateSession(context)` để lưu thông số bệnh nhân vào `sessionStorage`.
* Dữ liệu được xóa tự động khi đóng trình duyệt, đảm bảo an toàn và bảo mật thông tin.

### 2. Banner Nạp Dữ liệu Thông minh (`ClinicalBridge.renderAutoFillBanner`)
* Trong sự kiện `DOMContentLoaded` của trang công cụ, gọi `ClinicalBridge.renderAutoFillBanner((session) => { ... })`.
* Nếu hệ thống phát hiện có dữ liệu ca bệnh đã tính ở công cụ trước, một Banner thông minh sẽ tự động xuất hiện hỏi bác sĩ có muốn nạp nhanh thông số hay không.

### 3. Nút Điều hướng Chuyển tiếp Nhanh (`ClinicalBridge.renderActionChips`)
* Tại khối Kết quả hoặc Khung Cảnh báo Thuốc của công cụ, gọi `ClinicalBridge.renderActionChips(container, actions)` để sinh ra các nút chip điều hướng truyền sẵn tham số query string (`?age=68&weight=70&crcl=32...`).
* **Ví dụ các liên kết lâm sàng tiêu biểu**:
  * Từ `renal-function.html` $\rightarrow$ Chuyển tiếp sang `Chinhlieu_khangsinh.html`, `QL_Vancomycin.html`, `Electrolyte_Studio.html`.
  * Từ `DG_VTE.html` (Thuyên tắc huyết khối) $\rightarrow$ Chuyển tiếp sang `renal-function.html` (Đánh giá chức năng thận để chọn liều DOACs/Enoxaparin).


