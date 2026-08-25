# Thư mục Kịch bản JavaScript (Scripts) - CliniPortal

Thư mục này chứa toàn bộ các kịch bản JavaScript để xử lý logic tương tác động, điều khiển bố cục (layout), các bộ tính toán y khoa và duy trì trạng thái ứng dụng.

---

## 📁 Cấu trúc Thư mục Phân lớp ("Chia Để Trị")

Thư mục `js/` được tổ chức theo kiến trúc phân lớp chuẩn (Layered Architecture & Domain Modules):

```text
js/
├── main.js                  # Controller chính điều khiển toàn ứng dụng (Dark mode, sidebar, routing, sync)
├── toc.js                   # Engine tự động xây dựng & theo dõi mục lục động bám dính (Sticky TOC)
│
├── core/                    # Hạt nhân ứng dụng (CliniPortal Sync, MUI Port, Pulse Ticker, Storage)
│   ├── cliniportal-sync.js  # Đồng bộ trạng thái & localStorage
│   ├── mui-port.js          # Material UI Vanilla JS Utilities
│   └── pulse.js             # Timer & Activity Ticker
│
├── pharmacology/            # Phân hệ Dược lý & Tra cứu Thuốc
│   ├── cross-links-pharma.js# Tra cứu liên kết chéo Dược lý
│   ├── drug-passport.js    # Thẻ Passport Thuốc
│   ├── drug-timeline.js    # Dòng thời gian tác dụng thuốc
│   ├── emergency-dosing.js # Phác đồ liều thuốc cấp cứu
│   ├── moa-theater.js      # Mô phỏng cơ chế tác dụng (MOA)
│   ├── pharmacology-engine.js # Engine tìm kiếm & tra cứu Dược lý
│   ├── pharmacology-flashcards.js # Flashcard ghi nhớ thuốc
│   ├── pharmacology-heatmap.js    # Ma trận phổ kháng sinh Heatmap 2D
│   ├── pharmacology-symptoms.js   # Phân loại thuốc theo triệu chứng
│   ├── pharmacology-tools.js      # Công cụ tra cứu & tính liều thuốc
│   └── adr-bodymap.js             # Sơ đồ tác dụng phụ trên cơ thể
│
├── approach/                # Phân hệ Tiếp cận Lâm sàng & Lưu đồ
│   ├── approach-engine.js  # Engine hiển thị bài tiếp cận
│   ├── approach-hub.js     # Hub lọc & tìm kiếm tiếp cận
│   ├── approach-symptom.js # Quy trình tiếp cận triệu chứng 7 bước
│   ├── flowchart.js        # Flowchart & Interactive Vector Studio Engine
│   ├── ma-tran-trieu-chung-data.js # Dữ liệu ma trận triệu chứng
│   ├── ma-tran-trieu-chung.js      # Giao diện ma trận chẩn đoán phân biệt
│   └── treatment-pathway-engine.js # Engine đồ thị phác đồ điều trị
│
├── skills/                  # Phân hệ Kỹ năng Lâm sàng & OSCE
│   ├── clinical-skill-tabs.js # Chuyển Tab quy trình kỹ năng
│   ├── auscultation-trainer.js# Trợ lý luyện nghe tim/phổi
│   ├── body-map.js         # Sơ đồ tương tác vùng cơ thể
│   ├── ecg-trainer.js      # Bộ luyện đọc điện tâm đồ ECG
│   ├── osce-randomizer.js  # Trình ngẫu nhiên hóa trạm thi OSCE
│   ├── procedure-animator.js # Animation mô phỏng thủ thuật
│   ├── skill-flashcards.js # Card ghi nhớ quy trình kỹ năng
│   └── skill-tracker.js    # Theo dõi tiến độ thực hành kỹ năng
│
├── simulators/              # CDSS Engine, Bệnh án & Simulators
│   ├── benh-an.js          # Mẫu Bệnh án Nội khoa điện tử
│   ├── case-simulator.js   # Giả lập ca bệnh lâm sàng
│   ├── cdss-bayesian-engine.js # Engine hỗ trợ quyết định chẩn đoán Bayesian
│   ├── clinical-reasoning.js   # Bộ luyện tư duy chẩn đoán
│   ├── scenario-simulator.js  # Giả lập kịch bản cấp cứu
│   ├── virtual-patient.js     # Bệnh nhân ảo tương tác
│   └── smart-recommender.js   # Bộ gợi ý cận lâm sàng thông minh
│
├── dashboard/               # Trang chủ & Bento Dashboard
│   ├── homepage-effects.js # Hiệu ứng tương tác trang chủ
│   ├── homepage-widgets.js # Widgets dữ liệu trang chủ
│   └── module-dashboard.js # Dashboard Bento Grid Y khoa
│
├── knowledge/               # Đồ thị Tri thức & EBM Bridges
│   ├── evidence-bridge.js  # Cầu nối Y học chứng cứ (EBM)
│   ├── knowledge-bridge.js # Liên kết thực thể tri thức
│   ├── knowledge-graph.js  # Đồ thị tri thức Y khoa
│   ├── knowledge-map-data.js # Dữ liệu bản đồ tri thức
│   └── knowledge-sync.js   # Đồng bộ chỉ mục tri thức
│
├── calculators/             # Máy tính & Công cụ Lâm sàng Phức tạp
│   ├── abg-calculator.js   # Biện luận khí máu động mạch
│   ├── insulin-calculator.js # Chỉnh liều Insulin động
│   └── chinh-lieu-khang-sinh.js # Hiệu chỉnh liều kháng sinh suy thận
│
├── data/                    # Cơ sở dữ liệu Tĩnh
│   ├── icd10-data.js       # Database Mã hóa ICD-10
│   ├── lab-values.js       # Chỉ số cận lâm sàng chuẩn
│   ├── tools-data.js       # Dữ liệu thang điểm công cụ
│   └── tracuu-icd10.js     # Engine tra cứu ICD-10
│
├── tools/                   # Engine Vẽ & Render Lâm sàng
│   ├── good-day-calculator.js
│   ├── cong-cu-logic.js
│   ├── clinical-infographic-renderer.js
│   └── medical-draw-engine.js
│
├── components/              # Các UI Web Components nâng cao
├── utils/                   # Hàm tiện ích dùng chung (Exporter, Mask, Markdown, VirtualList)
├── workers/                 # Web Workers cho tác vụ tính toán nền
└── [domain]-studio/         # 13 Chuyên khoa Studio (ECG, CXR, ABG, Sepsis, Blood, ...)
```

---

## ⚙️ Nguyên tắc & Bảo tồn Đường dẫn (Backward Compatibility)

1. **Vanilla JS 純粹 (Pure Vanilla ES6+)**: Không sử dụng framework hay bundler bên ngoài.
2. **Backward Compatible Facade Stubs**: Mỗi file di chuyển vào subfolder đều có một stub mỏng đặt tại `js/[filename].js` để đảm bảo không làm hỏng bất kỳ liên kết tương đối legacy nào.
3. **Đường dẫn Tương đối**: Mọi thẻ `<script>` trong file HTML đều đã được cập nhật đường dẫn chính xác tới subfolder tương ứng (`js/pharmacology/...`, `js/approach/...`, v.v.).
