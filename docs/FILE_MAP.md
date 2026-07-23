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
| `components/pharmacology-tools.css` | Ma trận tương tác, máy tính hiệu chỉnh liều | `pages/Dược lý/**` |
| `components/pharmacology-global.css` | Styling Drug Passport, Emergency FAB & Modal, Flashcard 3D, Cross-links | `pages/Dược lý/**` |
| `components/pharmacology-heatmap.css` | Styling 2D Heatmap Grid, Autocomplete Search, Spectrum 2.0 & Timeline | `pages/Dược lý/**` |
| `components/moa-theater.css` | Styling MOA Theater SVG Animations, Scenario Simulator & PK Canvas | `pages/Dược lý/**` |
| `components/abg-calculator.css` | Giao diện máy tính ABG legacy | `DG_ABG.html` |
| `components/abg-studio.css` | Giao diện Blood Gas Pro Studio, Davenport Nomogram, Vitals, Checklist 7 bước | `pages/Công cụ/Thận & Điện giải - toan kiềm/DG_ABG.html` |
| `components/electrolyte-studio.css` | Giao diện Electrolyte Pro Studio (Na, K, Ca, Mg), Canvas Balance Plot, Directives | `pages/Công cụ/Thận & Điện giải - toan kiềm/Electrolyte_Studio.html` |
| `components/cxr-studio.css` | Giao diện Chest X-Ray Pro Studio, SVG Radiograph Engine, CTR Ruler, ABCDE Checklist | `pages/Công cụ/Hô hấp & Lao/CXR_Studio.html` |
| `components/micro-studio.css` | Giao diện Microbiology Pro Studio, SVG Microscopy Viewer, Culture Plate, Antibiogram | `pages/Công cụ/Truyền Nhiễm/Microbiology_Studio.html` |
| `components/insulin-calculator.css` | Giao diện máy tính Insulin | `DG_Insulin-ĐTĐ.html` |
| `components/benh-an.css` | Mẫu bệnh án điện tử | `benh-an-noi-khoa.html` |
| `components/paraclinical.css` | Đọc kết quả cận lâm sàng | `pages/Kỹ năng/Cận lâm sàng/**` |
| `components/ecg-studio.css` | Giao diện ECG Pro Studio 12 chuyển đạo, Calipers, Checklist 10 bước | `pages/Công cụ/Cấp cứu & hồi sức/ECG_Studio.html` |
| `components/homepage-effects.css` | Hiệu ứng trang chủ | `index.html` |
| `components/homepage-widgets.css` | Widgets trang chủ | `index.html` |
| `components/y-hoc-co-truyen.css` | Y học cổ truyền hub | `y-hoc-co-truyen.html` |
| `components/ma-tran-trieu-chung.css` | Giao diện Ma Trận Triệu Chứng | `ma-tran-trieu-chung.html` |
| `components/pulse.css` | Styling CliniPortal Pulse Command Center Dashboard | `index.html` |
| `components/evidence-bridge.css` | Styling nhãn bằng chứng chứng cứ & Modal Tooltip | Xuyên phân hệ |

---

## ⚙️ js/

| File | Vai trò | Dùng cho |
|------|---------|---------|
| `main.js` | Theme switching, sidebar toggle, keyboard shortcuts | Mọi trang |
| `flowchart.js` | switchPane, toggleNode, R-Ratio calculator | `pages/Tiếp cận/**` |
| `approach-symptom.js` | Tự động tạo mục lục & ScrollSpy triệu chứng | `pages/Tiếp cận/2. Triệu chứng/**` |
| `approach-hub.js` | Search + filter lưu đồ | `tiep-can.html` |
| `clinical-skill-tabs.js` | Tab switching kỹ năng lâm sàng | `pages/Kỹ năng/**` |
| `ecg-studio/ecg-modifiers.js` | Thư viện 35+ modifier bất thường ECG | `ECG_Interactive.html` |
| `ecg-studio/ecg-criteria.js` | Dữ liệu tiêu chuẩn chẩn đoán 35+ bất thường ECG | `ECG_Studio.html` |
| `ecg-studio/ecg-scenarios.js` | Tình huống lâm sàng & bệnh nhân ảo ECG | `ECG_Interactive.html` |
| `ecg-studio/ecg-leads.js` | Tổng hợp 12 chuyển đạo theo tam giác Einthoven | `ECG_Interactive.html` |
| `ecg-studio/ecg-engine.js` | Động cơ Canvas sinh sóng ECG toán học Gaussian & Spline | `ECG_Interactive.html` |
| `ecg-studio/ecg-studio.js` | UI Controller tổng hợp Studio, Calipers & Quiz | `ECG_Interactive.html` |
| `abg-studio/abg-criteria.js` | Dữ liệu tiêu chuẩn chẩn đoán, P/F ratio, A-a DO2, Urine Cl- & Cảnh báo an toàn | `DG_ABG.html` |
| `abg-studio/abg-scenarios.js` | Ngân hàng ca bệnh mẫu & bệnh nhân ảo ABG | `DG_ABG.html` |
| `abg-studio/abg-davenport.js` | Động cơ Canvas vẽ biểu đồ Davenport Nomogram tương tác | `DG_ABG.html` |
| `abg-studio/abg-engine.js` | Động cơ phân tích khí máu 7 bước tự động | `DG_ABG.html` |
| `abg-studio/abg-studio.js` | UI Controller tổng hợp Blood Gas Pro Studio, Sliders, Preset, Metrics & Quiz | `DG_ABG.html` |
| `electrolyte-studio/electrolyte-criteria.js` | Quy tắc sinh lý, công thức Adrogué-Madias, TBW, Ca_corr & Y lệnh UKKA | `Electrolyte_Studio.html` |
| `electrolyte-studio/electrolyte-scenarios.js` | Ca cấp cứu bệnh nhân ảo điện giải (Na, K, Ca, Mg) | `Electrolyte_Studio.html` |
| `electrolyte-studio/electrolyte-canvas.js` | Động cơ Canvas vẽ biểu đồ Electrolyte Balance Bar Chart | `Electrolyte_Studio.html` |
| `electrolyte-studio/electrolyte-engine.js` | Động cơ tính toán động học dịch truyền & Y lệnh 3 cấp độ | `Electrolyte_Studio.html` |
| `electrolyte-studio/electrolyte-management.js` | Động cơ xử trí lâm sàng cá nhân hóa & tính liều thuốc theo thể trạng | `Electrolyte_Studio.html` |
| `electrolyte-studio/electrolyte-studio.js` | UI Controller tổng hợp Electrolyte Pro Studio | `Electrolyte_Studio.html` |
| `cxr-studio/cxr-criteria.js` | Quy tắc chẩn đoán, CTR, phân loại ARDS & Bảng kiểm ABCDE | `CXR_Studio.html` |
| `cxr-studio/cxr-scenarios.js` | Ca bệnh lâm sàng & hình ảnh phim X-quang ngực cấp cứu | `CXR_Studio.html` |
| `cxr-studio/cxr-svg-engine.js` | Động cơ SVG Vector dựng giải phẫu lồng ngực & các lớp tổn thương | `CXR_Studio.html` |
| `cxr-studio/cxr-engine.js` | Động cơ phân tích phim X-quang 5 bước ABCDE tự động | `CXR_Studio.html` |
| `cxr-studio/cxr-studio.js` | UI Controller tổng hợp Chest X-Ray Pro Studio, Ruler CTR, Invert & Quiz | `CXR_Studio.html` |
| `micro-studio/micro-criteria.js` | Cây nhận diện vi khuẩn 5 bước, phản ứng sinh hóa & Antibiogram S/I/R | `Microbiology_Studio.html` |
| `micro-studio/micro-scenarios.js` | Ca bệnh lâm sàng vi sinh & nhiễm khuẩn cấp cứu | `Microbiology_Studio.html` |
| `micro-studio/micro-svg-engine.js` | Động cơ SVG Vector dựng kính hiển vi ảo (Gram, AFB, Yeast) & Đĩa cấy thạch | `Microbiology_Studio.html` |
| `micro-studio/micro-engine.js` | Động cơ nhận diện tác nhân vi sinh & Antibiogram matching | `Microbiology_Studio.html` |
| `micro-studio/micro-studio.js` | UI Controller tổng hợp Microbiology Pro Studio & Quiz | `Microbiology_Studio.html` |
| `pharmacology-symptoms.js` | Filter dược lý theo triệu chứng | `pages/Dược lý/Triệu chứng/**` |
| `pharmacology-tools.js` | Logic tương tác đa thuốc, hiệu chỉnh liều gan thận, quy đổi liều tương đương & Antidote | `pages/Dược lý/**` |
| `drug-passport.js` | Quản lý state bệnh nhân cá thể hóa toàn cục (localStorage) | `pages/Dược lý/**` |
| `emergency-dosing.js` | Tra cứu nhanh 20 thuốc cấp cứu khẩn cấp & in pocket card | `pages/Dược lý/**` |
| `cross-links-pharma.js` | Tự động chèn liên kết học thuật xuyên phân hệ | `pages/Dược lý/**` |
| `pharmacology-flashcards.js` | Động cơ lật thẻ 3D ôn tập Dược lý Spaced Repetition | `pages/Dược lý/**` |
| `pharmacology-heatmap.js` | 2D Interaction Heatmap Matrix, Search Autocomplete & History Tracker | `pages/Dược lý/**` |
| `drug-timeline.js` | Biểu đồ mốc thời gian dùng thuốc phác đồ ACS & Suy tim | `pages/Dược lý/**` |
| `moa-theater.js` | Đồ họa SVG Animated mô phỏng cơ chế tác dụng gắn receptor & cascade | `pages/Dược lý/**` |
| `adr-bodymap.js` | Bản đồ cơ thể người SVG tương tác cảnh báo tác dụng phụ theo hệ cơ quan | `pages/Dược lý/**` |
| `scenario-simulator.js` | Động cơ mô phỏng ca bệnh lâm sàng tương tác & chấm điểm tự động | `pages/Dược lý/**` |
| `pulse.js` | Logic Daily EBM Pearl (365 pearls), Progress rings & Streak counter | `index.html` |
| `evidence-bridge.js` | Logic tự động gắn nhãn bằng chứng & Modal Tooltip tương tác | Xuyên phân hệ |
| `smart-recommender.js` | Gợi ý tài liệu cá thể hóa theo chuyên khoa & lịch sử truy cập | `index.html` |

| `physio-patho.js` | Lightbox ảnh, lazyload | `pages/Sinh lý/**` |
| `physio-quiz-engine.js` | Động cơ Micro-Quiz trắc nghiệm & Đúng/Sai tương tác | `pages/Sinh lý - Sinh lý bệnh/**` |
| `physio-progress.js` | Tracker tiến trình học tập, % hoàn thành, streak & spaced repetition | `pages/Sinh lý - Sinh lý bệnh/**` |
| `physio-mirror.js` | Động cơ Physio-Patho Mirror xem song song Sinh lý ↔ Sinh lý bệnh | `pages/Sinh lý - Sinh lý bệnh/**` |
| `physio-clinical-bridge.js` | Cầu nối tự động liên kết Sinh lý với Dược lý, Công cụ & Kỹ năng | `pages/Sinh lý - Sinh lý bệnh/**` |
| `physio-glossary.js` | Tooltip từ điển thuật ngữ y khoa thông minh | `pages/Sinh lý - Sinh lý bệnh/**` |
| `toc.js` | Tự động tạo mục lục sticky | `pages/Sinh lý/Sinhly/**` |
| `benh-an.js` | Form validation + print bệnh án | `benh-an-noi-khoa.html` |
| `homepage-effects.js` | Particle effects, animations trang chủ | `index.html` |
| `homepage-widgets.js` | Widget logic trang chủ | `index.html` |
| `ma-tran-trieu-chung-data.js` | Dữ liệu triệu chứng, cờ đỏ, chẩn đoán phân biệt | `ma-tran-trieu-chung.html` |
| `ma-tran-trieu-chung.js` | Logic ma trận triệu chứng & render giao diện | `ma-tran-trieu-chung.html` |
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
| `Công cụ/cong-cu.html` | Hub tổng Công cụ | `cong-cu.css` |
| `Công cụ/cong-cu.css` | Styling tùy chỉnh cho Hub Công cụ | — |
| `Công cụ/tools-data.js` | Dữ liệu danh sách 27+ công cụ lâm sàng và partMetadata | — |
| `Công cụ/cong-cu-logic.js` | Logic render động thẻ công cụ, lọc tìm kiếm & ghim yêu thích | — |
| `Công cụ/lab-values.js` | Dữ liệu & Logic Widget Trị số xét nghiệm tham chiếu ở Sidebar | — |
| `Công cụ/Chung/QuyDoi_LieuTuongDuong.html` | Bộ quy đổi liều thuốc tương đương (Corticoids, Opioids OME, Statins, PPIs, DOACs, Benzo) | `pharmacology-tools.css` |
| `Công cụ/Chung/Tracuu_maICD10.html` | Tra cứu mã ICD-10 | — |
| `Công cụ/Chung/Bệnh án/benh-an-noi-khoa.html` | Mẫu bệnh án nội khoa | `benh-an.css` |
| `Công cụ/Chung/NCKH/NCKH_Tinhcomau.html` | Tính cỡ mẫu nghiên cứu | — |

| `Công cụ/Cấp cứu & hồi sức/QL_Budich.html` | Quản lý bù dịch cấp cứu | — |
| `Công cụ/Cấp cứu & hồi sức/QL_Vanmach.html` | Quản lý liều thuốc vận mạch & trợ tim | — |
| `Công cụ/Cấp cứu & hồi sức/QL_Maytho.html` | Quản lý máy thở chuyên sâu | — |
| `Công cụ/Cấp cứu & hồi sức/DG_AnthanICU.html` | An thần, giảm đau & mê sảng ICU (RASS, CPOT, CAM-ICU, Bơm tiêm điện) | — |
| `Công cụ/Hô hấp & Lao/DG_Viem-phoi.html` | Đánh giá viêm phổi (PSI, CURB) | — |
| `Công cụ/Thận & Điện giải - toan kiềm/DG_ABG.html` | Phân tích khí máu | `abg-calculator.css` |
| `Công cụ/Thận & Điện giải - toan kiềm/Electrolyte_Studio.html` | Electrolyte Pro Studio: Rối loạn điện giải (Na, K, Ca, Mg) & Động học dịch truyền | `electrolyte-studio.css` |
| `Công cụ/Thận & Điện giải - toan kiềm/renal-function.html` | Chức năng thận | — |
| `Công cụ/Thận & Điện giải - toan kiềm/DG_nguyennhanAKI.html` | Đánh giá nguyên nhân AKI | — |
| `Công cụ/Nội tiết & Chuyển hóa/DG_Insulin-ĐTĐ.html` | Chỉnh liều Insulin | `insulin-calculator.css` |
| `Công cụ/Tim mạch & huyết khối/DG_LDLc.html` | Mục tiêu LDL-c | — |
| `Công cụ/Tim mạch & huyết khối/DG_Suytim.html` | Đánh giá suy tim | — |
| `Công cụ/Tim mạch & huyết khối/ptnctimmach.html` | Phân tầng nguy cơ tim mạch | — |
| `Công cụ/Tim mạch & huyết khối/DG_VTE.html` | VTE Toolkit: Huyết khối DVT & Thuyên tắc phổi PE (Wells, sPESI) | — |
| `Công cụ/Tiêu hóa & Dinh dưỡng/DG_Dinhduongnoitru.html` | Dinh dưỡng nội trú | — |
| `Công cụ/Tiêu hóa & Dinh dưỡng/DG_Xogan.html` | Xơ gan / Child-Pugh | — |
| `Công cụ/Tiêu hóa & Dinh dưỡng/DG_ptncHCC.html` | Ung thư gan | — |
| `Công cụ/Tiêu hóa & Dinh dưỡng/DG_XHTH.html` | Phân tầng Xuất huyết Tiêu hóa cấp trên & dưới (GBS, Oakland, Truyền máu) | — |
| `Công cụ/Thần kinh/DG_Dotquy.html` | Đột quỵ (NIHSS, ABCD2) | — |
| `Công cụ/Truyền Nhiễm/Chinhlieu_khangsinh.html` | Chỉnh liều kháng sinh | — |
| `Công cụ/Truyền Nhiễm/QL_Vancomycin.html` | Quản lý Vancomycin | — |
| `Công cụ/Truyền Nhiễm/Microbiology_Studio.html` | Microbiology Pro Studio: Kính hiển vi ảo, Đĩa cấy, Nhận diện vi khuẩn & Antibiogram | `micro-studio.css` |
| `Công cụ/Truyền Nhiễm/SL_Nhiem-khuan.html` | Sơ lược nhiễm khuẩn | — |
| `Công cụ/Huyết học/Lab_Studio.html` | Lab Pro Studio: Giả lập & phân tích phiếu xét nghiệm máu tương tác (CBC, Gan, Thận, Lipid, Đông máu) | `lab-studio.css` |
| `Công cụ/Huyết học/DG_Thieumau.html` | Phân tầng Thiếu máu & Thuật toán chẩn đoán (CRI/RPI, MCV/MCH, Iron panel) | — |

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
| `Kỹ năng/ky-nang.html` | Hub tổng Kỹ năng (Tích hợp Anatomy Explorer & Skill Progress Tracker) |
| `Kỹ năng/Bệnh án/KN_Benhan_Noikhoa.html` | Cách làm bệnh án nội khoa chuẩn |
| `Kỹ năng/Bệnh nhân ảo/Benh_Nhan_Ao_Hub.html` | Hub Bệnh nhân ảo (Virtual Patient Hub) chọn ca lâm sàng |
| `Kỹ năng/Bệnh nhân ảo/Case_DauNguc_Cap.html` | Giả lập ca bệnh Đau ngực cấp tương tác đa nhánh |
| `Kỹ năng/Lâm sàng/Nghe_Am_Thanh.html` | Auscultation Trainer (Nghe âm thanh tim & phổi Web Audio API) |
| `Kỹ năng/Cận lâm sàng/ECG_Interactive.html` | ECG Interactive Trainer (Thước Calipers kéo thả & Bazett QTc) |
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
| `Kỹ năng/Quản lý điều trị/Clinical_Reasoning.html` | Clinical Reasoning Engine (Trình bệnh SBAR, SNAPPS, Semantic Qualifier Grid) |
| `Kỹ năng/Quản lý điều trị/Luachon_Khangsinh.html` | Lựa chọn kháng sinh |
| `Kỹ năng/Quản lý điều trị/Lyluan_DieutriNoikhoa.html` | Phương pháp lý luận điều trị và kê đơn thuốc nội khoa |
| `Kỹ năng/Thủ thuật/Dat_NKQ.html` | Procedure Step-by-Step: Đặt Ống Nội Khí Quản |
| `Kỹ năng/Thủ thuật/Choc_Dich_Mang_Phoi.html` | Procedure Step-by-Step: Chọc Dò Dịch Màng Phổi |
| `Kỹ năng/Thủ thuật/Choc_Dich_Tuy_Song.html` | Procedure Step-by-Step: Chọc Dò Dịch Tủy Sống |

---

## 📂 pages/ — Tiếp cận

| File | Vai trò |
|------|---------|
| `Tiếp cận/tiep-can.html` | Hub tổng Tiếp cận (Stats, Daily Flashcard, Recently Viewed, On-Call mode) |
| `Tiếp cận/ma-tran-trieu-chung.html` | Ma Trận Chẩn Đoán (Weighted Bayesian, SVG Radar Chart, Timeline Progression, URL params, Copy, Save/Load, Gap Analysis) |
| `Tiếp cận/body-map.html` | Bản Đồ Giải Phẫu Tương Tác (SVG anatomy selector theo 5 vùng cơ thể) |
| `Tiếp cận/case-simulator.html` | Mô Phỏng Ca Bệnh Lâm Sàng Tương Tác (Virtual Patient 4-step Reasoning Simulator) |
| `Tiếp cận/knowledge-graph.html` | Đồ Thị Tri Thức Liên Phân Hệ (SVG Cross-Module Network Graph: Triệu chứng ↔ Bệnh ↔ CLS ↔ Thuốc) |
| `Tiếp cận/1. HS-CC/emergency-quick-protocol.html` | Phác đồ Cấp cứu 60s (6 tình huống khẩn, CPR timer 2 phút, liều thuốc) |
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
| `Sinh lý .../SLB_CCBS/SLB_CCBS_THA.html` | Sinh lý bệnh & Cơ chế bệnh sinh Tăng huyết áp | Cấp 3 |
| `Sinh lý .../SLB_CCBS/SLB_CCBS_ST.html` | Sinh lý bệnh & Cơ chế bệnh sinh Suy tim | Cấp 3 |
| `Sinh lý .../SLB_CCBS/SLB_CCBS_AKI.html` | Sinh lý bệnh & Cơ chế bệnh sinh Tổn thương thận cấp | Cấp 3 |
| `Sinh lý .../SLB_CCBS/SLB_CCBS_CKD.html` | Sinh lý bệnh & Cơ chế bệnh sinh Bệnh thận mạn | Cấp 3 |
| `Sinh lý .../SLB_CCBS/SLB_CCBS_ACS.html` | Sinh lý bệnh & Cơ chế bệnh sinh Hội chứng vành cấp | Cấp 3 |
| `Sinh lý .../SLB_CCBS/SLB_CCBS_CCS.html` | Sinh lý bệnh & Cơ chế bệnh sinh Hội chứng vành mạn | Cấp 3 |
| `Sinh lý .../SLB_CCBS/SLB_CCBS_DTD.html` | Sinh lý bệnh & Cơ chế bệnh sinh Đái tháo đường | Cấp 3 |
| `Sinh lý .../SLB_CCBS/SLB_CCBS_GERD.html` | Sinh lý bệnh & Cơ chế bệnh sinh Trào ngược dạ dày thực quản | Cấp 3 |
| `Sinh lý .../SLB_CCBS/SLB_CCBS_COPD.html` | Sinh lý bệnh & Cơ chế bệnh sinh Bệnh phổi tắc nghẽn mạn tính | Cấp 3 |
| `Sinh lý .../SLB_CCBS/SLB_CCBS_SXHD.html` | Sinh lý bệnh & Cơ chế bệnh sinh Sốt xuất huyết Dengue | Cấp 3 |
| `Sinh lý .../SLB_CCBS/SLB_CCBS_TSG.html` | Sinh lý bệnh & Cơ chế bệnh sinh Tiền sản giật | Cấp 3 |
| `Sinh lý .../SLB_CCBS/SLB_CCBS_VTC.html` | Sinh lý bệnh & Cơ chế bệnh sinh Viêm tụy cấp | Cấp 3 |
| `Sinh lý .../SLB_CCBS/SLB_CCBS_XG.html` | Sinh lý bệnh & Cơ chế bệnh sinh Xơ gan | Cấp 3 |
| `Sinh lý .../SLB_CCBS/SLB_CCBS_VP.html` | Sinh lý bệnh & Cơ chế bệnh sinh Viêm phổi | Cấp 3 |
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
| `Y học chứng cứ/EBM Lab/ebm-lab.html` | **[MỚI]** EBM Practice Lab (PICO Builder, CASP Critical Appraisal Checklist 11 câu, NNT/ARR Calculator & 100-Icon Array Visualizer) |
| `Y học chứng cứ/EBM Lab/ebm-lab.css` | Styling riêng cho EBM Practice Lab |
| `Y học chứng cứ/EBM Lab/ebm-lab.js` | Logic tương tác PICO search query generator, CASP Risk of Bias calculation & NNT math |
| `Y học chứng cứ/Guideline Radar/radar.html` | **[NÂNG CẤP]** Guideline Radar Diff Viewer (So sánh GitHub-style Before/After, practice-changing badges, bộ lọc chuyên khoa) |
| `Y học chứng cứ/EBM Lab/forest-plot.html` | **[MỚI]** Interactive Forest Plot Builder (Vẽ biểu đồ Forest Plot SVG tương tác, tính Pooled Diamond & I² heterogeneity) |
| `Y học chứng cứ/EBM Lab/forest-plot.js` | Động cơ SVG Forest Plot renderer, preset datasets (EMPA-REG, DAPA-HF, ESC 2026) & data editor table |
| `Y học chứng cứ/EBM Lab/kaplan-meier.html` | **[MỚI]** Kaplan-Meier Survival Curve Builder (Vẽ biểu đồ sống còn Kaplan-Meier dạng bậc thang SVG, bảng Number at Risk & tính HR) |
| `Y học chứng cứ/EBM Lab/kaplan-meier.js` | Động cơ SVG Kaplan-Meier step curve renderer, tính xác suất sống còn S(t) & preset thử nghiệm lâm sàng |
| `Y học chứng cứ/EBM Lab/roc-curve.html` | **[MỚI]** ROC Curve & AUC Calculator (Vẽ đường cong ROC SVG, tính diện tích AUC & xác định điểm cắt tối ưu Youden Index J) |
| `Y học chứng cứ/EBM Lab/roc-curve.js` | Động cơ SVG ROC Curve & AUC trapezoidal calculator, Youden Index J optimizer & preset xét nghiệm |
| `Y học chứng cứ/EBM Lab/funnel-plot.html` | **[MỚI]** Interactive Funnel Plot Builder (Vẽ biểu đồ phễu SVG, khung 95% Pseudo CI & kiểm định sai số xuất bản Egger's Test) |
| `Y học chứng cứ/EBM Lab/funnel-plot.js` | Động cơ SVG Funnel Plot renderer, tính hiệu quả gộp Pooled Effect & phân tích tính đối xứng phễu |
| `Y học chứng cứ/Guidelines/Guidelines.html` | Tra cứu guidelines |
| `Y học chứng cứ/Guidelines/README.md` | Hướng dẫn sử dụng phân hệ Guidelines |
| `Y học chứng cứ/Guidelines/Kho Guidelines/ks-cho-bn-nang.html` | Kháng sinh cho bệnh nhân nặng — Tổng quan Critical Care Clinics 2026 (Standalone) |
| `Y học chứng cứ/Guidelines/Kho Guidelines/byt-copd-2026.html` | Hướng dẫn chẩn đoán và điều trị bệnh phổi tắc nghẽn mạn tính (COPD) Bộ Y tế 2026 (Standalone) |
| `Y học chứng cứ/Guidelines/Kho Guidelines/empa-reg.html` | EMPA-REG OUTCOME — Empagliflozin tim mạch (Standalone) |
| `Y học chứng cứ/Thống kê y học/Thongkeyhoc.html` | Thống kê y học (Hub chính 8 bài học) |
| `Y học chứng cứ/Thống kê y học/quiz.html` | **[MỚI]** EBM Quiz Engine & Spaced Repetition (Thuật toán SM-2, Flashcard 3D & 16+ câu hỏi lâm sàng) |
| `Y học chứng cứ/Thống kê y học/quiz.js` | Logic Spaced Repetition SM-2 (Interval & Ease Factor), lật thẻ 3D & ngân hàng 16 câu hỏi trắc nghiệm |
| `Y học chứng cứ/Thống kê y học/1_Ynghia_Thongke&Lamsang.html` | Bài 1: Ý nghĩa thống kê & lâm sàng |
| `Y học chứng cứ/Thống kê y học/2_DG_Congcu_Chandoan.html` | Bài 2: Đánh giá công cụ chẩn đoán |
| `Y học chứng cứ/Thống kê y học/3_Thietke_NCKH.html` | Bài 3: Thiết kế nghiên cứu khoa học |
| `Y học chứng cứ/Thống kê y học/4_PhantichNC_rct&meta-analysis.html` | Bài 4: Phân tích RCT & Meta-analysis |
| `Y học chứng cứ/Thống kê y học/5_ANOVA_Phan_tich_Phuong_sai.html` | **[MỚI]** Bài 5: Phân tích phương sai (ANOVA) toàn diện & F-distribution Visualizer |
| `Y học chứng cứ/Thống kê y học/6_Hoi_quy_Logistic_Da_thuc.html` | **[MỚI]** Bài 6: Hồi quy Logistic Đa thức (Multinomial Logistic) & RRR Calculator |
| `Y học chứng cứ/Thống kê y học/7_Hoi_quy_Bayes.html` | **[MỚI]** Bài 7: Hồi quy Tuyến tính Bayes trong Y học & Prior-to-Posterior Animator |
| `Y học chứng cứ/Thống kê y học/8_Phan_bien_Nghien_cuu.html` | **[MỚI]** Bài 8: Phản biện Nghiên cứu, MANOVA / MANCOVA & Reviewer Response Audit Checklist |

---

## 📂 pages/ — Y học cổ truyền

| File | Vai trò |
|------|---------|
| `Y học cổ truyền/y-hoc-co-truyen.html` | Hub tổng YHCT |
| `Y học cổ truyền/Lý luận & Ngũ hành/ngu-hanh-studio.html` | **[MỚI]** Ngũ Hành Tương Tác Studio (SVG 5-elements diagram, Ngũ du huyệt & mô phỏng thể bệnh lý) |
| `Y học cổ truyền/Lý luận & Ngũ hành/data/ngu-hanh-data.js` | Dữ liệu 5 hành, thuộc tính quy loại tạng phủ, ngũ du huyệt & 5 kịch bản thể bệnh |
| `Y học cổ truyền/Lý luận & Ngũ hành/js/ngu-hanh-studio.js` | Động cơ SVG renderer, path animation & controller cho Ngũ Hành Studio |
| `Y học cổ truyền/Chẩn đoán học/thiet-chan-atlas.html` | **[MỚI]** Atlas Thiệt Chẩn Tương Tác (Vọng chẩn qua lưỡi, 4 phân vùng tạng phủ, sắc/rêu/hình thể & Quiz challenge) |
| `Y học cổ truyền/Chẩn đoán học/data/thiet-chan-data.js` | Dữ liệu thiệt chẩn: phân vùng tạng phủ, chất lưỡi, rêu lưỡi, hình thể & 5 câu hỏi Quiz |
| `Y học cổ truyền/Chẩn đoán học/js/thiet-chan-atlas.js` | Động cơ SVG Tongue Renderer, zone selector & Quiz Engine |
| `Y học cổ truyền/Chẩn đoán học/mach-chan-simulator.html` | **[MỚI]** Mạch Chẩn Simulator (Giả lập 28 mạch tượng, sóng SVG real-time, áp lực Thốn-Quan-Xích & đối chiếu Tây y) |
| `Y học cổ truyền/Chẩn đoán học/data/mach-chan-data.js` | Dữ liệu 28 mạch tượng Đông y, vị trí xem mạch tả hữu & thông số sóng toán học |
| `Y học cổ truyền/Chẩn đoán học/js/mach-chan-simulator.js` | Động cơ SVG Pulse Waveform Generator, bộ điều khiển lực ấn 3 cấp độ |
| `Y học cổ truyền/Dược liệu & Cổ phương/phuong-te-studio.html` | **[MỚI]** Phương Tễ Học Studio (Sơ đồ Quân-Thần-Tá-Sứ 25+ bài thuốc cổ phương & giả lập gia giảm bài thuốc) |
| `Y học cổ truyền/Dược liệu & Cổ phương/data/phuong-te-data.js` | Cơ sở dữ liệu 25+ bài thuốc cổ phương kinh điển với cấu trúc Quân-Thần-Tá-Sứ & gia giảm |
| `Y học cổ truyền/Dược liệu & Cổ phương/js/phuong-te-studio.js` | Controller visualizer Quân-Thần-Tá-Sứ & động cơ gia giảm bài thuốc lâm sàng |
| `Y học cổ truyền/Dược liệu & Cổ phương/duoc-thao-database.html` | **[MỚI]** Tra Cứu Dược Thảo YHCT (Atlas 30+ vị thuốc, bộ lọc đa tiêu chí, so sánh side-by-side & tương kỵ Thập bát phản / Thập cửu úy) |
| `Y học cổ truyền/Dược liệu & Cổ phương/data/duoc-thao-data.js` | Cơ sở dữ liệu 30+ vị thuốc Đông y kinh điển với thuộc tính Tính vị, Quy kinh, Công năng & Tương kỵ |
| `Y học cổ truyền/Dược liệu & Cổ phương/js/duoc-thao-engine.js` | Engine tìm kiếm real-time, bộ lọc multi-facet, drawer so sánh đối chiếu & popup modal dược liệu |
| `Y học cổ truyền/Xoa bóp & bấm huyệt/ban-do-huyet-vi.html` | Bản đồ huyệt vị tương tác 14 đường kinh mạch (Tích hợp Cặp Kinh Biểu - Lý) |
| `Y học cổ truyền/Dưỡng sinh & Game/yhct-quiz-arena.html` | **[MỚI]** YHCT Quiz Arena (Đấu trường trắc nghiệm game hóa 4 chế độ, streak combo & highscore) |
| `Y học cổ truyền/Dưỡng sinh & Game/data/yhct-quiz-data.js` | Ngân hàng 40+ câu hỏi game hóa chia 4 chủ đề Thiệt chẩn, Mạch chẩn, Dược thảo & Phương tễ |
| `Y học cổ truyền/Dưỡng sinh & Game/js/yhct-quiz-arena.js` | Controller game loop, sound effects synth, streak multiplier & local storage |
| `Y học cổ truyền/Dưỡng sinh & Game/duong-sinh-dashboard.html` | **[MỚI]** Dưỡng Sinh Dashboard (Lịch 24 Tiết Khí, trắc nghiệm 9 Thể Chất YHCT & bấm huyệt tại nhà) |
| `Y học cổ truyền/Dưỡng sinh & Game/data/duong-sinh-data.js` | Dữ liệu 24 Tiết Khí Dưỡng Sinh, 9 Thể Chất YHCT & 10 câu hỏi trắc nghiệm phân tích |
| `Y học cổ truyền/Dưỡng sinh & Game/js/duong-sinh-dashboard.js` | Controller phân tích thể chất cá nhân hóa & gợi ý thực đơn / huyệt vị theo mùa |
| `Y học cổ truyền/Dong-Tay-Y-Bridge/dong-tay-y-bridge.html` | **[MỚI]** Cầu Nối Đông - Tây Y (Ma trận đối chiếu Bệnh danh YHCT ↔ ICD-10 Tây y & Tương tác thuốc) |
| `Y học cổ truyền/Dong-Tay-Y-Bridge/data/dong-tay-y-data.js` | Dữ liệu đối chiếu Y lý - ICD-10, phác đồ phối hợp an toàn & cảnh báo tương tác thuốc nguy hiểm |
| `Y học cổ truyền/Dong-Tay-Y-Bridge/js/dong-tay-y-bridge.js` | Controller tra cứu ma trận đối chiếu Đông-Tây Y real-time |

---

*Cập nhật file này mỗi khi thêm trang mới vào hệ thống.*

