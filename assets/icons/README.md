# CliniPortal Medical Icon Repository

Thư mục này chứa bộ sưu tập 58 icon SVG chuyên biệt phục vụ cho hệ sinh thái y khoa CliniPortal. Tất cả icon được tối ưu hóa siêu nhẹ, hỗ trợ Dark Mode và tùy biến màu sắc động qua CSS variables.

## 📁 Danh sách Icon Theo Phân Nhóm

### 1. 🌟 Bộ nhận diện cốt lõi (12 Core Icons)
- `ic-trang-chu.svg`: Trang chủ hệ thống
- `ic-cong-cu.svg`: Phân hệ Công cụ lâm sàng
- `ic-duoc-ly.svg`: Phân hệ Dược lý lâm sàng
- `ic-tiep-can.svg`: Phân hệ Tiếp cận triệu chứng
- `ic-phac-do.svg`: Phác đồ xử trí chung
- `ic-y-hoc.svg`: Phân hệ Y học chứng cứ
- `ic-tim-mach.svg`: Chuyên khoa Tim mạch
- `ic-tieu-hoa.svg`: Chuyên khoa Tiêu hóa
- `ic-than-kinh.svg`: Chuyên khoa Thần kinh
- `ic-than.svg`: Chuyên khoa Thận - Tiết niệu
- `ic-noi-tiet.svg`: Chuyên khoa Nội tiết
- `ic-nhiem-khuan.svg`: Chuyên khoa Bệnh nhiễm trùng

### 2. 🧮 Công cụ lâm sàng (Clinical Tools)
- `ic-calculator-hub.svg`: Cổng tính toán lâm sàng
- `ic-ecg-interpreter.svg`: Diễn giải điện tâm đồ
- `ic-abg-gas.svg`: Phân tích khí máu động mạch (ABG)
- `ic-fluid-calculator.svg`: Tính toán dịch truyền
- `ic-score-charts.svg`: Bảng điểm tiên lượng
- `ic-gfr-calculator.svg`: Tính toán eGFR và chức năng thận

### 3. 💊 Dược lý & Kháng sinh (Pharmacology)
- `ic-drug-interaction.svg`: Tương tác thuốc
- `ic-antibiotic-guide.svg`: Hướng dẫn sử dụng kháng sinh
- `ic-dosage-calculator.svg`: Tính toán liều lượng thuốc
- `ic-renal-dosing.svg`: Chỉnh liều thuốc theo chức năng thận
- `ic-pill-box.svg`: Hộp thuốc cá nhân / Tuân thủ điều trị
- `ic-iv-compatibility.svg`: Tính tương hợp dịch truyền/thuốc tiêm

### 4. 🩺 Kỹ năng lâm sàng (Clinical Skills)
- `ic-stethoscope.svg`: Thăm khám lâm sàng (Ống nghe)
- `ic-procedure-steps.svg`: Các bước thủ thuật lâm sàng
- `ic-hand-hygiene.svg`: Quy trình vệ sinh tay dịch tễ
- `ic-suturing.svg`: Kỹ thuật khâu vết thương
- `ic-cpr-training.svg`: Hồi sức tim phổi (CPR/ACLS)
- `ic-physical-exam.svg`: Bảng kiểm thăm khám bedside

### 5. 🤒 Tiếp cận triệu chứng (Clinical Approach)
- `ic-chest-pain-flowchart.svg`: Tiếp cận Đau ngực cấp
- `ic-dyspnea-approach.svg`: Tiếp cận Khó thở cấp
- `ic-abdominal-pain.svg`: Tiếp cận Đau bụng cấp
- `ic-fever-workup.svg`: Biện luận sốt / Sốt kéo dài
- `ic-headache-dx.svg`: Tiếp cận Đau đầu
- `ic-syncope.svg`: Tiếp cận Ngất

### 6. 🧬 Sinh lý - Bệnh học (Physiology)
- `ic-heart-failure-mech.svg`: Cơ chế Suy tim
- `ic-acid-base-balance.svg`: Rối loạn Toan - Kiềm
- `ic-shock-types.svg`: Sinh lý bệnh các loại Sốc
- `ic-diabetes-path.svg`: Sinh lý bệnh Đái tháo đường
- `ic-respiratory-mech.svg`: Cơ học hô hấp
- `ic-coagulation-cascade.svg`: Thác đông máu & Huyết khối

### 7. 📄 Y học chứng cứ (Evidence-based Medicine)
- `ic-guidelines.svg`: Khuyến cáo & Đồng thuận lâm sàng
- `ic-sample-size.svg`: Tính toán cỡ mẫu nghiên cứu
- `ic-journal-club.svg`: Phân tích bài báo khoa học
- `ic-risk-assessment.svg`: Đánh giá nguy cơ (OR, RR, HR)
- `ic-evidence-pyramid.svg`: Tháp bằng chứng khoa học
- `ic-research-protocol.svg`: Đề cương nghiên cứu y học

### 8. 🔘 Điều hướng & Tiện ích chung (Navigation & General)
- `ic-home.svg`: Nút Trang chủ
- `ic-info.svg`: Thông tin chi tiết
- `ic-check.svg`: Hoàn thành / Xác nhận
- `ic-alert.svg`: Cảnh báo lâm sàng
- `ic-menu.svg`: Trình đơn mở rộng
- `ic-search.svg`: Thanh tìm kiếm công cụ
- `ic-favorite.svg`: Đánh dấu yêu thích
- `ic-add.svg`: Thêm mới dữ liệu
- `ic-close.svg`: Đóng cửa sổ / Hủy bỏ
- `ic-next.svg`: Chuyển tiếp bước tiếp theo

---

## 🎨 Hướng dẫn sử dụng & Tùy biến

Tất cả các icon SVG đều sử dụng thuộc tính `fill="currentColor"` (hoặc `stroke="currentColor"` đối với ECG) để dễ dàng đổi màu bằng CSS.

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
  color: var(--color-primary); /* Tự động thay đổi màu theo theme */
}
```
