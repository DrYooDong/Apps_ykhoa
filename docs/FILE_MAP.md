# CliniPortal — Bản đồ File Hệ thống (FILE MAP)

> Tài liệu này liệt kê **tất cả file chức năng** của CliniPortal, vai trò và các file liên kết. Cập nhật khi có thay đổi cấu trúc.
> 
> *Cập nhật lần cuối: 2026-07-08*

---

## 🏠 Root

| File | Vai trò | JS dùng | CSS dùng |
|------|---------|---------|---------|
| `index.html` | Trang chủ | `homepage-effects.js`, `homepage-widgets.js`, `main.js` | `homepage-effects.css`, `homepage-widgets.css` |
| `icons-collection.html` | Demo thư viện icons SVG | — | — |

---

## 🧩 components/

| File | Vai trò |
|------|---------|
| `header.html` | Template HTML thanh điều hướng toàn cục |
| `header.js` | Fetch + inject header, set active nav item |
| `footer.html` | Template HTML chân trang toàn cục |
| `footer.js` | Fetch + inject footer |

---

## 🎨 css/

| File | Vai trò | Dùng cho |
|------|---------|---------|
| `reset.css` | CSS normalize/reset | Mọi trang |
| `main.css` | Design tokens, layout grid, utilities | Mọi trang |
| `components/header.css` | Styling header nav | Mọi trang |
| `components/sidebar.css` | Styling sidebar accordion | Mọi trang có sidebar |
| `components/footer.css` | Styling footer | Mọi trang |
| `components/flowchart.css` | Styling lưu đồ tương tác | `pages/Tiếp cận/**` |
| `components/approach-symptom.css` | Styling tiếp cận triệu chứng chuẩn 7 bước | `pages/Tiếp cận/2. Triệu chứng/**` |
| `components/approach-hub.css` | Hub tiếp cận tổng hợp | `tiep-can.html` |
| `components/approach-card.css` | Thẻ tiếp cận lâm sàng | `tiep-can.html` |
| `components/approach-detail.css` | Chi tiết tiếp cận | `tiep-can.html` |
| `components/clinical-skill.css` | Tab kỹ năng lâm sàng | `pages/Kỹ năng/**` |
| `components/physio-patho.css` | Hub sinh lý bệnh | `Sinhly-sinhlybenh.html` |
| `components/physio-content.css` | Nội dung bài học sinh lý | `pages/Sinh lý/**` |
| `components/physio-headings.css` | Tiêu đề bài học sinh lý | `pages/Sinh lý/**` |
| `components/toc.css` | Mục lục tự động (TOC) | `pages/Sinh lý/Sinhly/**` |
| `components/pharmacology-symptoms.css` | Dược lý theo triệu chứng | `pages/Dược lý/Triệu chứng/**` |
| `components/abg-calculator.css` | Giao diện máy tính ABG | `DG_ABG.html` |
| `components/insulin-calculator.css` | Giao diện máy tính Insulin | `DG_Insulin-ĐTĐ.html` |
| `components/benh-an.css` | Mẫu bệnh án điện tử | `benh-an-noi-khoa.html` |
| `components/paraclinical.css` | Đọc kết quả cận lâm sàng | `pages/Kỹ năng/Cận lâm sàng/**` |
| `components/homepage-effects.css` | Hiệu ứng trang chủ | `index.html` |
| `components/homepage-widgets.css` | Widgets trang chủ | `index.html` |
| `components/y-hoc-co-truyen.css` | Y học cổ truyền hub | `y-hoc-co-truyen.html` |

---

## ⚙️ js/

| File | Vai trò | Dùng cho |
|------|---------|---------|
| `main.js` | Theme switching, sidebar toggle, keyboard shortcuts | Mọi trang |
| `flowchart.js` | switchPane, toggleNode, R-Ratio calculator | `pages/Tiếp cận/**` |
| `approach-symptom.js` | Tự động tạo mục lục & ScrollSpy triệu chứng | `pages/Tiếp cận/2. Triệu chứng/**` |
| `approach-hub.js` | Search + filter lưu đồ | `tiep-can.html` |
| `clinical-skill-tabs.js` | Tab switching kỹ năng lâm sàng | `pages/Kỹ năng/**` |
| `pharmacology-symptoms.js` | Filter dược lý theo triệu chứng | `pages/Dược lý/Triệu chứng/**` |
| `physio-patho.js` | Lightbox ảnh, lazyload | `pages/Sinh lý/**` |
| `toc.js` | Tự động tạo mục lục sticky | `pages/Sinh lý/Sinhly/**` |
| `benh-an.js` | Form validation + print bệnh án | `benh-an-noi-khoa.html` |
| `homepage-effects.js` | Particle effects, animations trang chủ | `index.html` |
| `homepage-widgets.js` | Widget logic trang chủ | `index.html` |
| `calculators/abg-calculator.js` | Logic 6-bước chẩn đoán toan kiềm | `DG_ABG.html` |
| `calculators/insulin-calculator.js` | Logic chỉnh liều insulin | `DG_Insulin-ĐTĐ.html` |

---

## 📄 templates/ (HTML Boilerplate)

| File | Dùng để tạo |
|------|------------|
| `flowchart-template.html` | Trang lưu đồ tiếp cận mới |
| `approach-symptom-template.html` | Trang tiếp cận triệu chứng mới (7 bước) |
| `clinical-skill-template.html` | Trang kỹ năng lâm sàng mới |
| `calculator-template.html` | Trang công cụ tính toán mới |
| `physiology-template.html` | Bài viết sinh lý/sinh lý bệnh mới |

---

## 📂 pages/ — Công cụ

| File | Vai trò | CSS riêng |
|------|---------|-----------|
| `Công cụ/cong-cu.html` | Hub tổng Công cụ | — |
| `Công cụ/Chung/Tracuu_maICD10.html` | Tra cứu mã ICD-10 | — |
| `Công cụ/Chung/Bệnh án/benh-an-noi-khoa.html` | Mẫu bệnh án nội khoa | `benh-an.css` |
| `Công cụ/Chung/NCKH/NCKH_Tinhcomau.html` | Tính cỡ mẫu nghiên cứu | — |
| `Công cụ/Cấp cứu & hồi sức/QL_Budich.html` | Quản lý bù dịch cấp cứu | — |
| `Công cụ/Cấp cứu & hồi sức/QL_Vanmach.html` | Quản lý liều thuốc vận mạch & trợ tim | — |
| `Công cụ/Cấp cứu & hồi sức/QL_Maytho.html` | Quản lý máy thở chuyên sâu | — |
| `Công cụ/Hô hấp & Lao/DG_Viem-phoi.html` | Đánh giá viêm phổi (PSI, CURB) | — |
| `Công cụ/Thận & Điện giải - toan kiềm/DG_ABG.html` | Phân tích khí máu | `abg-calculator.css` |
| `Công cụ/Thận & Điện giải - toan kiềm/DG_Kali-Canxi.html` | Rối loạn Kali/Canxi | — |
| `Công cụ/Thận & Điện giải - toan kiềm/DG_Natri-Dich.html` | Rối loạn Natri/Dịch | — |
| `Công cụ/Thận & Điện giải - toan kiềm/renal-function.html` | Chức năng thận | — |
| `Công cụ/Nội tiết & Chuyển hóa/DG_Insulin-ĐTĐ.html` | Chỉnh liều Insulin | `insulin-calculator.css` |
| `Công cụ/Tim mạch & huyết khối/DG_LDLc.html` | Mục tiêu LDL-c | — |
| `Công cụ/Tim mạch & huyết khối/DG_Suytim.html` | Đánh giá suy tim | — |
| `Công cụ/Tim mạch & huyết khối/ptnctimmach.html` | Phân tầng nguy cơ tim mạch | — |
| `Công cụ/Tiêu hóa & Dinh dưỡng/DG_Dinhduongnoitru.html` | Dinh dưỡng nội trú | — |
| `Công cụ/Tiêu hóa & Dinh dưỡng/DG_Xogan.html` | Xơ gan / Child-Pugh | — |
| `Công cụ/Tiêu hóa & Dinh dưỡng/DG_ptncHCC.html` | Ung thư gan | — |
| `Công cụ/Thần kinh/DG_Dotquy.html` | Đột quỵ (NIHSS, ABCD2) | — |
| `Công cụ/Truyền Nhiễm/Chinhlieu_khangsinh.html` | Chỉnh liều kháng sinh | — |
| `Công cụ/Truyền Nhiễm/QL_Vancomycin.html` | Quản lý Vancomycin | — |
| `Công cụ/Truyền Nhiễm/SL_Nhiem-khuan.html` | Sơ lược nhiễm khuẩn | — |

---

## 📂 pages/ — Dược lý

| File | Vai trò |
|------|---------|
| `Dược lý/duoc-ly.html` | Hub tổng Dược lý |
| `Dược lý/Triệu chứng/DL_Chongmat.html` | DL theo triệu chứng: Chóng mặt |
| `Dược lý/Triệu chứng/DL_Daubungcap.html` | DL: Đau bụng cấp |
| `Dược lý/Triệu chứng/DL_Daudau.html` | DL: Đau đầu |
| `Dược lý/Triệu chứng/DL_Ho.html` | DL: Ho |
| `Dược lý/Triệu chứng/DL_Nonoi.html` | DL: Nôn nao/buồn nôn |
| `Dược lý/Chuyên khoa/DL_Hohap.html` | DL: Hô hấp |
| `Dược lý/Chuyên khoa/DL_Khangsinh.html` | DL: Kháng sinh (toàn diện) |
| `Dược lý/Chuyên khoa/DL_Timmach.html` | DL: Tim mạch |
| `Dược lý/Chuyên khoa/DL_Tiêuhoá.html` | DL: Tiêu hóa |
| `Dược lý/Chuyên khoa/DL_Ttoan_than.html` | DL: Toan thận |
| `Dược lý/Chuyên khoa/DL_Vanmach.html` | DL: Vận mạch |

---

## 📂 pages/ — Kỹ năng

| File | Vai trò |
|------|---------|
| `Kỹ năng/ky-nang.html` | Hub tổng Kỹ năng |
| `Kỹ năng/Bệnh án/KN_Benhan_Noikhoa.html` | Cách làm bệnh án nội khoa chuẩn |
| `Kỹ năng/Cận lâm sàng/Doc_KQCLS.html` | Đọc kết quả CLS (overview) |
| `Kỹ năng/Cận lâm sàng/doc-dien-giai-do.html` | Đọc điện giải đồ |
| `Kỹ năng/Cận lâm sàng/doc-dong-mau.html` | Đọc đông máu |
| `Kỹ năng/Cận lâm sàng/doc-ecg-co-ban.html` | Đọc ECG cơ bản |
| `Kỹ năng/Cận lâm sàng/doc-ecg-nang-cao.html` | Đọc ECG nâng cao |
| `Kỹ năng/Cận lâm sàng/doc-nhuom-soi.html` | Đọc nhuộm soi |
| `Kỹ năng/Cận lâm sàng/doc-sh-gan.html` | Đọc sinh hóa gan |
| `Kỹ năng/Cận lâm sàng/doc-sh-than.html` | Đọc sinh hóa thận |
| `Kỹ năng/Cận lâm sàng/doc-tpttb-mau.html` | Đọc TPTTB máu |
| `Kỹ năng/Cận lâm sàng/doc-xq-bung.html` | Đọc XQ bụng |
| `Kỹ năng/Cận lâm sàng/doc-xq-nguc.html` | Đọc XQ ngực |
| `Kỹ năng/Hồi sức cấp cứu/KN_Hoisinh_Timphoi.html` | Hồi sinh tim phổi |
| `Kỹ năng/Hồi sức cấp cứu/KN_Hoisuc_Huyetdong.html` | Hồi sức huyết động |
| `Kỹ năng/Hồi sức cấp cứu/KN_Kiemsoat_Duongtho.html` | Kiểm soát đường thở |
| `Kỹ năng/Hồi sức cấp cứu/KN_Sieuam_Capcuu.html` | Siêu âm cấp cứu |
| `Kỹ năng/Hồi sức cấp cứu/KN_Triage.html` | Phân loại bệnh nhân (Triage) |
| `Kỹ năng/Hồi sức cấp cứu/KN_Xutri_Ngodoc.html` | Xử trí ngộ độc |
| `Kỹ năng/Quản lý điều trị/Luachon_Khangsinh.html` | Lựa chọn kháng sinh |
| `Kỹ năng/Quản lý điều trị/Lyluan_DieutriNoikhoa.html` | Phương pháp lý luận điều trị và kê đơn thuốc nội khoa |

---

## 📂 pages/ — Tiếp cận

| File | Vai trò |
|------|---------|
| `Tiếp cận/tiep-can.html` | Hub tổng Tiếp cận |
| `Tiếp cận/1. .../[Phân nhóm]/TC_*.html` | Lưu đồ tiếp cận cấp cứu |
| `Tiếp cận/2. Triệu chứng/Than phiền Toàn thân/Sốt/TC_Sot.html` | Hub tiếp cận Sốt |
| `Tiếp cận/2. Triệu chứng/Than phiền Toàn thân/Sốt/TC_Sot&Daudau.html` | Tiếp cận Sốt + Đau đầu |
| `Tiếp cận/2. Triệu chứng/Than phiền Toàn thân/Sốt/TC_Sot&DauCo.html` | Tiếp cận Sốt + Đau cơ |
| `Tiếp cận/2. Triệu chứng/Than phiền Toàn thân/Sốt/TC_Sot&DauKhop.html` | Tiếp cận Sốt + Đau khớp |
| `Tiếp cận/2. Triệu chứng/Than phiền Toàn thân/Sốt/TC_Sot&DauNguc.html` | Tiếp cận Sốt + Đau ngực |
| `Tiếp cận/2. Triệu chứng/Than phiền Toàn thân/Sốt/TC_Sot&Ho.html` | Tiếp cận Sốt + Ho |
| `Tiếp cận/2. Triệu chứng/Than phiền Toàn thân/Sốt/TC_Sot&PhatBan.html` | Tiếp cận Sốt + Phát ban |
| `Tiếp cận/2. Triệu chứng/Than phiền Toàn thân/Sốt/TC_Sot&TieuBuotRat.html` | Tiếp cận Sốt + Tiểu buốt hoặc tiểu rắt |
| `Tiếp cận/2. Triệu chứng/Than phiền Toàn thân/Sốt/TC_Sot&VangDa.html` | Tiếp cận Sốt + Vàng da |
| `Tiếp cận/2. Triệu chứng/Than phiền Toàn thân/Sốt/TC_Sot&TieuChay.html` | Tiếp cận Sốt + Nôn / Tiêu chảy |
| `Tiếp cận/2. Triệu chứng/Than phiền Toàn thân/Sốt/TC_Sot&HachTo.html` | Tiếp cận Sốt + Hạch to |
| `Tiếp cận/2. Triệu chứng/Than phiền Toàn thân/Sốt/TC_Sot&RoiLoanTriGiac.html` | Tiếp cận Sốt + Rối loạn tri giác |
| `Tiếp cận/2. Triệu chứng/Than phiền Toàn thân/Sốt/TC_Sot&HCNhiemSieuVi.html` | Tiếp cận Sốt + Hội chứng nhiễm siêu vi |
| `Tiếp cận/2. Triệu chứng/Than phiền Toàn thân/Sốt/TC_Sot&HCNhiemTrung.html` | Tiếp cận Sốt + Hội chứng nhiễm trùng |
| `Tiếp cận/2. Triệu chứng/Than phiền Toàn thân/Sốt/TC_Sot&HCSoc.html` | Tiếp cận Sốt + Hội chứng sốc |
| `Tiếp cận/2. .../Than phiền .../TC_*.html` | Lưu đồ theo các triệu chứng khác |
| `Tiếp cận/5. Dược lý/TC_DL_Timmach.html` | Tiếp cận Dược lý Tim mạch |
| `Tiếp cận/5. Dược lý/TC_DL_Hohap.html` | Tiếp cận Dược lý Hô hấp |
| `Tiếp cận/5. Dược lý/TC_DL_Tieuhoa.html` | Tiếp cận Dược lý Tiêu hóa |
| `Tiếp cận/5. Dược lý/TC_DL_Vanmach.html` | Tiếp cận Dược lý Vận mạch & Trợ tim |
| `Tiếp cận/5. Dược lý/TC_DL_Khangsinh.html` | Tiếp cận Dược lý Kháng sinh |
| `Tiếp cận/5. Dược lý/TC_DL_Ttoan_than.html` | Tiếp cận Dược lý Toan thận |
| `Tiếp cận/5. Dược lý/TC_DL_Noitiet.html` | Tiếp cận Dược lý Nội tiết & ĐTĐ |

---

## 📂 pages/ — Sinh lý - Sinh lý bệnh

| File | Vai trò | Cấp thư mục |
|------|---------|------------|
| `Sinh lý .../Sinhly-sinhlybenh.html` | Hub tổng | Cấp 2 |
| `Sinh lý .../Sinhly/HUONG_DAN_THIET_KE.md` | Design guide sinh lý | — |
| `Sinh lý .../Sinhly/Phan1/SL_*.html` | Bài học sinh lý (Phần 1: TB) | Cấp 4 |
| `Sinh lý .../Sinhly/Phan4/SL_Traodoikhi.html` | Sinh lý Trao đổi & Vận chuyển khí | Cấp 4 |
| `Sinh lý .../Sinhly/css/physio-shared.css` | CSS riêng cho bài viết SL | — |
| `Sinh lý .../Sinhly/js/physio-shared.js` | JS riêng cho bài viết SL | — |
| `Sinh lý .../images/` | Ảnh minh họa sinh lý | — |

---

## 📂 pages/ — Y học chứng cứ

| File | Vai trò |
|------|---------|
| `Y học chứng cứ/yhcc.html` | Hub tổng EBM |
| `Y học chứng cứ/Guidelines/Guidelines.html` | Tra cứu guidelines |
| `Y học chứng cứ/Guidelines/README.md` | Hướng dẫn sử dụng phân hệ Guidelines |
| `Y học chứng cứ/Thống kê y học/Thongkeyhoc.html` | Thống kê y học |
| `Y học chứng cứ/Thống kê y học/danh-gia-cong-cu-chan-doan.html` | Đánh giá công cụ chẩn đoán |
| `Y học chứng cứ/Thống kê y học/phan-tich-rct-meta-analysis.html` | Phân tích RCT & Meta-analysis |
| `Y học chứng cứ/Thống kê y học/thiet-ke-nghien-cuu-khoa-hoc.html` | Thiết kế nghiên cứu |
| `Y học chứng cứ/Thống kê y học/y-nghia-thong-ke-va-lam-sang.html` | Ý nghĩa thống kê lâm sàng |

---

## 📂 pages/ — Y học cổ truyền

| File | Vai trò |
|------|---------|
| `Y học cổ truyền/y-hoc-co-truyen.html` | Hub tổng YHCT |
| `Y học cổ truyền/Xoa bóp & bấm huyệt/ban-do-huyet-vi.html` | Bản đồ huyệt vị |

---

*Cập nhật file này mỗi khi thêm trang mới vào hệ thống.*
