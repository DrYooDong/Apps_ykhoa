# ⚙️ Phân hệ Công cụ Lâm sàng (Clinical Calculators & Tools)

Tài liệu này mô tả định hướng phát triển dài hạn, cấu trúc thư mục và quy chuẩn phát triển phần mềm cho phân hệ **Công cụ Lâm sàng** thuộc hệ sinh thái **CliniPortal**. Tài liệu này đóng vai trò làm kim chỉ nam để các tác nhân AI (Agent) và lập trình viên duy trì, mở rộng các công cụ tính toán lâm sàng một cách chính xác và nhất quán.

---

## 🚀 1. Định hướng Phát triển Dài hạn

Phân hệ này tập trung **thuần vào các công cụ hỗ trợ bác sĩ** trong việc thực hành lâm sàng hàng ngày tại giường bệnh (bedside). Các công cụ bao gồm máy tính chỉ số y học (Calculators), thang điểm đánh giá (Medical Scores), sơ đồ phân tầng nguy cơ (Risk Stratifications) và công cụ lập kế hoạch điều trị động (Interactive Treatment Planners).

### 🎯 4 Nguyên lý Thiết kế Cốt lõi của Công cụ:
1.  **Tính toán Động (Reactive Calculations)**: 
    *   Mọi dữ liệu nhập vào (Form Inputs) phải kích hoạt tính toán tự động tức thời ngay khi người dùng thay đổi giá trị (nhập số hoặc tích chọn checkbox/radio). Hạn chế bắt buộc người dùng bấm nút "Tính toán" thủ công.
    *   Tự động validate giá trị nhập (ví dụ: cảnh báo nếu nhập huyết áp tâm thu nhỏ hơn tâm trương, cân nặng âm...).
2.  **Phân tầng Nguy cơ Trực quan (Visual Risk Stratification)**:
    *   Kết quả trả về không chỉ là con số khô khan, mà phải đi kèm phân tầng mức độ rõ ràng (ví dụ: Nguy cơ Thấp - Xanh lục, Nguy cơ Trung bình - Vàng/Hổ phách, Nguy cơ Cao - Đỏ).
    *   Sử dụng màu sắc trực quan dựa trên hệ thống Design Tokens của CliniPortal.
3.  **Khuyến cáo Xử trí Lâm sàng (Actionable Clinical Guidance)**:
    *   Dựa trên kết quả tính toán và phân tầng nguy cơ, hệ thống phải hiển thị các khuyến cáo xử trí tương ứng (ví dụ: liều lượng thuốc, thời điểm cần nhập viện ICU, chỉ định cận lâm sàng tiếp theo...) dựa theo các Guidelines y học chứng cứ uy tín (AHA, ESC, KDIGO, GINA...).
4.  **Bối cảnh Y khoa & Tài liệu Tham khảo (Medical References)**:
    *   Mỗi trang công cụ phải có mục chú giải công thức tính toán chi tiết và trích nguồn tài liệu tham khảo chính thống ở chân trang để đảm bảo tính minh bạch y khoa.

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
│   ├── DG_Natri-Dich.html     # Tính toán bù dịch và tốc độ điều chỉnh Natri máu
│   ├── DG_Kali-Canxi.html     # Lập kế hoạch bù Kali và Canxi an toàn theo kali niệu/máu
│   └── renal-function.html    # Tính toán chức năng thận: eGFR (CKD-EPI), Cockcroft-Gault
├── Tim mạch & huyết khối/     # Thang điểm tim mạch, nguy cơ tắc mạch/chảy máu
│   └── ptnctimmach.html       # Đánh giá ASVCD, CHA2DS2-VASc, HAS-BLED trong rung nhĩ
├── Tiêu hóa & Dinh dưỡng/     # Suy gan, dinh dưỡng lâm sàng
│   ├── DG_Dinhduongnoitru.html # Tính nhu cầu năng lượng và lập thực đơn dinh dưỡng nội trú
│   ├── DG_Xogan.html          # Thang điểm Child-Pugh, MELD đánh giá xơ gan
│   └── DG_ptncHCC.html        # Tính điểm phân tầng nguy cơ ung thư gan (HCC)
├── Truyền Nhiễm/              # Công cụ phân tầng nhiễm trùng/sepsis
│   └── SL_Nhiem-khuan.html    # Tính điểm qSOFA/SOFA và phác đồ Hour-1 Bundle xử trí sepsis
├── Chung/                     # Tài liệu chung về lâm sàng
│   ├── Bệnh án/               # Hướng dẫn làm bệnh án nội khoa chuyên nghiệp (BSCKI Trần Thanh Tuấn...)
│   └── benh-an-noi-khoa.html  # Bản điện tử tương tác hỗ trợ điền bệnh án chuẩn
└── cong-cu.html               # Trang Hub điều hướng trung tâm của phân hệ Công cụ
```

---

## 🛠️ 3. Hướng dẫn Kỹ thuật phát triển Công cụ mới

Khi xây dựng một công cụ hỗ trợ tính toán mới (Calculator), lập trình viên hoặc AI Agent phải tuân thủ cấu trúc chuẩn từ `templates/calculator-template.html`:

1.  **Sử dụng Vanilla JavaScript**:
    *   Toàn bộ logic tính toán và xử lý DOM viết bằng ES6+ thuần.
    *   Tách biệt logic tính toán (pure functions) khỏi logic cập nhật giao diện (UI renderers) để dễ viết kiểm thử (unit test).

2.  **Kế thừa Design Tokens & Responsive Layout**:
    *   Thiết kế form nhập liệu gồm các thẻ `<input>`, `<select>`, `<radio>` sắp xếp theo dạng lưới (Grid layout) thân thiện với cả thiết bị di động (Mobile-first).
    *   Kết quả đầu ra hiển thị trong một khung nổi bật (`.result-panel` hoặc `.result-card`) sử dụng các màu cảnh báo dựa trên Design Tokens trong `../../css/main.css`.

3.  **Tích hợp SEO & Nhãn ID**:
    *   Mỗi input element phải có thẻ `<label>` tương ứng với thuộc tính `for` rõ ràng.
    *   Tất cả các phần tử tương tác (nút bấm, ô nhập) bắt buộc phải có thuộc tính `id` duy nhất và mang tính mô tả để phục vụ việc kiểm thử giao diện tự động.
