# ⚙️ Phân hệ Công cụ Lâm sàng (Clinical Calculators & Tools)

Tài liệu này mô tả định hướng phát triển dài hạn, cấu trúc thư mục và quy chuẩn phát triển phần mềm cho phân hệ **Công cụ Lâm sàng** thuộc hệ sinh thái **CliniPortal**. Tài liệu này đóng vai trò làm kim chỉ nam để các tác nhân AI (Agent) và lập trình viên duy trì, mở rộng các công cụ tính toán lâm sàng một cách chính xác và nhất quán.

---

## 🚀 1. Định hướng Phát triển Dài hạn

Phân hệ này tập trung **thuần vào các công cụ hỗ trợ bác sĩ** trong việc thực hành lâm sàng hàng ngày tại giường bệnh (bedside). Các công cụ bao gồm máy tính chỉ số y học (Calculators), thang điểm đánh giá (Medical Scores), sơ đồ phân tầng nguy cơ (Risk Stratifications), công cụ lập kế hoạch điều trị động (Interactive Treatment Planners), và bộ thẩm định mã hóa y tế / quy tắc BHYT.

### 🎯 4 Nguyên lý Thiết kế Cốt lõi của Công cụ:
1.  **Tính toán & Thẩm định Động (Reactive Calculations & Audits)**: 
    *   Mọi dữ liệu nhập vào (Form Inputs, tìm kiếm, hoặc thêm ca bệnh) phải kích hoạt tính toán/thẩm định tự động tức thời ngay khi người dùng thay đổi giá trị. Hạn chế bắt buộc người dùng bấm nút thủ công.
    *   Tự động validate giá trị nhập và cảnh báo xung đột mã hóa BHYT (ví dụ: mã bệnh chính không được thanh toán BHYT, cảnh báo giới tính, hoặc thiếu mã ICD bắt buộc cho cận lâm sàng).
2.  **Phân tầng Nguy cơ & Trạng thái Trực quan (Visual Risk & Status Stratification)**:
    *   Kết quả trả về đi kèm phân tầng mức độ rõ ràng (Nguy cơ Thấp - Xanh lục, Nguy cơ Trung bình - Vàng/Hổ phách, Nguy cơ Cao - Đỏ).
    *   Sử dụng màu sắc trực quan dựa trên hệ thống Design Tokens của CliniPortal.
3.  **Khuyến cáo Xử trí Lâm sàng & BHYT (Actionable Clinical Guidance)**:
    *   Dựa trên kết quả tính toán và phân tầng nguy cơ, hệ thống hiển thị khuyến cáo xử trí tương ứng (liều lượng thuốc, thời điểm cần nhập viện ICU, chỉ định cận lâm sàng tiếp theo...) dựa theo Guidelines y học chứng cứ uy tín (AHA, ESC, KDIGO, GINA, TT06/2026/TT-BYT...).
4.  **Bối cảnh Y khoa & Dữ liệu Chuẩn hóa Offline (Offline Standards)**:
    *   Mỗi trang công cụ tích hợp cơ sở dữ liệu tĩnh offline (dạng `.js` và `.csv` độc lập), đảm bảo phần mềm hoạt động 100% không phụ thuộc API bên ngoài.

---

## 📁 2. Cấu trúc Thư mục & Danh mục Công cụ Hiện tại

```
Công cụ/
├── Cấp cứu & hồi sức/         # Công cụ tính dịch truyền, hồi sức cấp cứu
│   └── QL_Budich.html         # Công cụ quản lý và lập kế hoạch bù dịch hồi sức động
├── Hô hấp & Lao/              # Đánh giá mức độ nặng viêm phổi, hen phế quản...
│   └── DG_Viem-phoi.html      # Tính thang điểm PSI và CURB-65 đánh giá viêm phổi
├── Nội tiết & Chuyển hóa/     # Quản lý đường huyết, insulin...
│   └── DG_Insulin-DTD.html    # Hướng dẫn chỉnh liều insulin động trong ĐTĐ nội trú
├── Thần kinh/                 # Đột quỵ và đánh giá tổn thương thần kinh
│   └── DG_Dotquy.html         # Thang điểm NIHSS và tính liều tPA tiêu sợi huyết
├── Thận & Điện giải - toan kiềm/ # Rối loạn toan kiềm, điện giải, suy chức năng thận
│   ├── DG_ABG.html            # Phân tích khí máu động mạch (6 bước chẩn đoán rối loạn)
│   ├── Electrolyte_Studio.html # Electrolyte Pro Studio: Xử trí cấp cứu điện giải (Na, K, Ca, Mg) & Động học dịch truyền
│   └── renal-function.html    # Tính toán chức năng thận: eGFR (CKD-EPI), Cockcroft-Gault
├── Tim mạch & huyết khối/     # Thang điểm tim mạch, nguy cơ tắc mạch/chảy máu
│   └── ptnctimmach.html       # Đánh giá ASVCD, CHA2DS2-VASc, HAS-BLED trong rung nhĩ
├── Tiêu hóa & Dinh dưỡng/     # Suy gan, dinh dưỡng lâm sàng
│   ├── DG_Dinhduongnoitru.html # Tính nhu cầu năng lượng và lập thực đơn dinh dưỡng nội trú
│   ├── DG_Xogan.html          # Thang điểm Child-Pugh, MELD đánh giá xơ gan
│   ├── DG_ptncHCC.html        # Tính điểm phân tầng nguy cơ ung thư gan (HCC)
│   └── thangdiemHCC.md        # Tóm tắt tài liệu các thang điểm nguy cơ ung thư biểu mô tế bào gan
├── Truyền Nhiễm/              # Công cụ phân tầng nhiễm trùng/sepsis, điều trị kháng sinh
│   ├── SL_Nhiem-khuan.html    # Tính điểm qSOFA/SOFA và phác đồ Hour-1 Bundle xử trí sepsis
│   ├── Microbiology_Studio.html # Microbiology Pro Studio: Giả lập vi sinh, kính hiển vi ảo & Antibiogram
│   ├── QL_Vancomycin.html     # Phần mềm tính toán, quản lý liều và theo dõi nồng độ Vancomycin
│   ├── QL Vancomycin.md       # Tài liệu lâm sàng về dược động học và giám sát trị liệu Vancomycin (TDM)
│   ├── Chỉnh liều Vancomycin.md # Hướng dẫn điều chỉnh liều Vancomycin dựa trên AUC/MIC và Cmin
│   ├── Chinhlieu_khangsinh.html # Phần mềm tính toán, chỉnh liều các nhóm kháng sinh chính ở bệnh nhân suy thận
│   ├── Chinhlieu_khangsinh.md # Tài liệu tham khảo hướng dẫn chỉnh liều kháng sinh
│   └── Dược PK_PD.md          # Tài liệu lý thuyết về Dược lực học/Dược động học (PK/PD) kháng sinh
├── Chung/                     # Tài liệu & công cụ chung lâm sàng
│   ├── Bệnh án/               # Hướng dẫn làm bệnh án nội khoa chuyên nghiệp
│   │   └── benh-an-noi-khoa.html # Bản điện tử tương tác hỗ trợ điền bệnh án chuẩn
│   ├── QuyDoi_LieuTuongDuong.html # Bộ quy đổi liều thuốc tương đương (Corticoids, Opioids, Statins, PPIs, DOACs, Benzo)
│   ├── NCKH/                  # Công cụ nghiên cứu khoa học
│   │   └── NCKH_Tinhcomau.html # Tính cỡ mẫu nghiên cứu khoa học
│   └── Tra cứu mã ICD10/       # Phân hệ tra cứu mã bệnh ICD-10 & Thẩm định BHYT
│       └── Tracuu_maICD10.html # Tra cứu 15.844 mã ICD-10, thẩm định BHYT, sao chép chuẩn HIS, nạp ca mẫu Presets
└── cong-cu.html               # Trang Hub điều hướng trung tâm của phân hệ Công cụ
```

---

## 🛠️ 3. Hướng dẫn Kỹ thuật phát triển Công cụ mới

Khi xây dựng một công cụ hỗ trợ tính toán hoặc tra cứu mới, lập trình viên hoặc AI Agent phải tuân thủ quy chuẩn hệ thống:

1.  **Sử dụng Vanilla JavaScript Pure & Core Data Files**:
    *   Toàn bộ logic tính toán và xử lý DOM viết bằng ES6+ thuần.
    *   Tách riêng phần dữ liệu tĩnh (.js / .csv trong `js/data/`) và logic tương tác (`js/[tên-công-cụ].js`).
    *   Tách riêng stylesheet giao diện vào `css/components/[tên-công-cụ].css`.

2.  **Kế thừa Design Tokens & Responsive Layout**:
    *   Thiết kế form nhập liệu gồm các thẻ `<input>`, `<select>`, `<radio>` hoặc thẻ kết quả dạng Grid layout thân thiện với cả thiết bị di động (Mobile-first).
    *   Kết quả đầu ra hiển thị trong khung nổi bật (`.result-panel` hoặc `.sidebar-card`) sử dụng các màu cảnh báo dựa trên Design Tokens trong `../../css/main.css`.

3.  **Tích hợp SEO & Nhãn ID**:
    *   Mỗi input element phải có thẻ `<label>` tương ứng với thuộc tính `for` rõ ràng.
    *   Tất cả các phần tử tương tác (nút bấm, ô nhập) bắt buộc phải có thuộc tính `id` duy nhất và mang tính mô tả để phục vụ kiểm thử giao diện.
