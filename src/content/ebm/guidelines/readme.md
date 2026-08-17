# 📖 Hướng Dẫn Sử Dụng & Tài Liệu Phân Hệ Guidelines & EBM

> **EBM Guidelines Hub**: Phân hệ tra cứu, phân tích, đối chiếu hướng dẫn điều trị chuẩn mực (trong nước & quốc tế) và các thử nghiệm lâm sàng dựa trên nguyên tắc **Y học chứng cứ (Evidence-Based Medicine)**.
> **Kiến trúc**: TypeScript Modular + Vanilla CSS3 + Vector SVG Charts, 100% Offline-First.

---

## ✨ 1. Giới Thiệu Phân Hệ

Phân hệ hỗ trợ Bác sĩ lâm sàng, Bác sĩ nội trú và Sinh viên y khoa:
- **Tổng hợp đa nguồn**: Hơn 60+ hướng dẫn điều trị chuẩn mực từ Bộ Y tế Việt Nam, Hội Tim mạch học Việt Nam (VNHA), Hội Hồi sức Cấp cứu (VNACCS) và các hiệp hội quốc tế hàng đầu (ESC, AHA/ACC, ADA, GINA, GOLD, KDIGO, SSC, IDSA).
- **Phân tích Y học chứng cứ (EBM)**: Trích xuất và cấu trúc hóa các tiêu chí can thiệp, tiêu chí đánh giá gộp chính (Primary Endpoint) và các chỉ số thống kê hiệu quả ($HR, RR, OR, ARR, NNT$).
- **Đối chiếu Đa chiều (Multi-Compare Matrix)**: Chọn đồng thời nhiều nghiên cứu để so sánh song song các tiêu chí can thiệp, đối tượng, hiệu quả và độ an toàn.
- **Hỗ trợ Quyết định Lâm sàng (CDSS Dosing Matcher)**: Phân tích ca bệnh cụ thể (tuổi, giới, eGFR, tiền sử bệnh) để tự động đối chiếu khuyến cáo liều dùng và chống chỉ định.
- **Thẩm định Chất lượng Y văn (Journal Quality Analyzer)**: Tích hợp OpenAlex API và thuật toán Journal Trust Score (0-100) để đánh giá độ tin cậy của tạp chí công bố, kèm bộ lọc cảnh báo tạp chí săn mồi (Beall's List).

---

## 📊 2. Cấu Trúc Bảng Dữ Liệu Nghiên Cứu (Data Schema)

Mỗi bản ghi trong `SAMPLE_STUDIES` (`guidelinesdata.ts`) có cấu trúc chuẩn hóa:

| Trường dữ liệu | Kiểu | Mô tả chi tiết | Ví dụ |
| :--- | :--- | :--- | :--- |
| `id` | `string` | Định danh duy nhất (slug gạch nối) | `"study_empa_reg"` |
| `title` | `string` | Tên chính thức của thử nghiệm / Guideline | `"EMPA-REG OUTCOME"` |
| `drug` | `string` | Hoạt chất chính hoặc can thiệp điều trị | `"Empagliflozin 10mg/25mg QD"` |
| `sourceType` | `enum` | Phân loại nguồn (`intl-study`, `intl-guideline`, `vn-moh`, `vn-association`) | `"intl-study"` |
| `specialty` | `enum` | Chuyên khoa y học (`cardio`, `pulmo`, `gi`, `endo`, `icu`, `renal`...) | `"cardio"` |
| `design` | `enum` | Thiết kế nghiên cứu (`rct`, `meta`, `cohort`, `guideline`, `review`) | `"rct"` |
| `intervention` | `string` | Tóm tắt nhóm can thiệp vs đối chứng | `"Empagliflozin vs Placebo + Chuẩn điều trị"` |
| `primaryEndpoint`| `string` | Kết cục gộp chính đo lường hiệu quả | `"3-point MACE (CV Death, Nonfatal MI, Nonfatal Stroke)"` |
| `keyResults` | `string/object` | Tỷ số chênh lệch, khoảng tin cậy 95% CI và p-value | `"HR 0.86 (95% CI 0.74-0.99, p=0.04)"` |
| `impact` | `enum` | Mức độ thay đổi thực hành (`practice-changing`, `informative`, `early-signal`) | `"practice-changing"` |
| `sampleSize` | `number` | Tổng số lượng bệnh nhân tham gia thử nghiệm | `7020` |
| `population` | `string` | Đặc điểm và tiêu chuẩn lựa chọn bệnh nhân | `"Bệnh nhân ĐTĐ típ 2 có tiền sử bệnh tim mạch xơ vữa"` |
| `summary` | `string` | Kết luận cốt lõi ngắn gọn | `"Giảm 14% 3-point MACE, giảm 38% tử vong tim mạch"` |
| `fdaStatus` | `string` | Phê duyệt pháp lý hoặc phân độ khuyến cáo | `"FDA Approved 2016 / Class I Level A"` |
| `sourceUrl` | `string` | Đường dẫn trực tiếp tới PubMed / DOI | `"https://doi.org/10.1056/NEJMoa1504720"` |
| `file` | `string` | Đường dẫn tương đối tới tệp HTML chi tiết | `"kho-guidelines/2015-nejm-empa-reg.html"` |
| `asianData` | `boolean` | Có phân tích riêng trên nhóm bệnh nhân Châu Á | `true` |
| `subgroups` | `object` | Dữ liệu phân tích dưới nhóm (Subgroup Analysis) | `{"Châu Á": "HR 0.60 (95% CI 0.43-0.82)"}` |

---

## 🛠️ 3. Các Tính Năng Giao Diện Nâng Cao

### 3.1. Bento Grid & Visual Analytics Hub
- **Thống kê tổng quan**: Số lượng nghiên cứu, tỷ lệ RCTs chất lượng cao, phân bố theo chuyên khoa.
- **Biểu đồ Vector SVG**: Vẽ trực tiếp trên trình duyệt không dùng thư viện ngoài:
  - **Forest Plot SVG**: Biểu diễn trực quan điểm ước lượng (Point Estimate) và thanh khoảng tin cậy $95\%\text{ CI}$, tự động đổi màu (🟢 Xanh lá: có lợi, 🔴 Đỏ: nguy cơ, ⚪ Xám: không có ý nghĩa thống kê).
  - **Bubble Evidence Map**: Sơ đồ bong bóng phân bố bằng chứng theo cỡ mẫu và mức độ tác động.

### 3.2. Bộ Lọc Đa Chiều Thời Gian Thực (Multi-Filter & Command Palette)
- **Tìm kiếm toàn văn**: Tìm nhanh theo tiêu đề, tên thuốc, tác giả, kết cục, từ khóa lâm sàng.
- **Bộ lọc chuyên khoa & nguồn**: Lọc nhanh theo chuyên khoa, loại thiết kế (RCT, Guideline), nguồn Bộ Y Tế / Quốc tế.
- **Command Palette (`Ctrl + K`)**: Mở thanh tra cứu phím tắt toàn năng để tìm nhanh bài tóm tắt và snippet liều dùng.

### 3.3. Đối Chiếu Nghiên Cứu Đa Chiều (Multi-Compare Matrix)
1. Tích chọn các checkbox ở đầu dòng danh sách nghiên cứu cần so sánh.
2. Thanh công cụ nổi (**Floating Compare Bar**) xuất hiện ở dưới đáy màn hình.
3. Bấm **"So Sánh Nghiên Cứu"** để mở bảng đối sánh ma trận 3D trực quan.

### 3.4. Thẩm Định Y Văn & Phân Tích Tạp Chí (Journal Quality Suite)
- Bấm vào huy hiệu Journal Badge của bất kỳ nghiên cứu nào để mở **Journal Quality Analyzer**.
- Xem trực tiếp điểm uy tín **Journal Trust Score**, chỉ số H-index, Scimago Quartile (Q1 - Q4), và cảnh báo rủi ro gian lận học thuật.

---

## ☁️ 4. Đồng Bộ Dữ Liệu Hai Chiều (LocalStorage & Supabase Cloud)

- **Mặc định**: Hệ thống lưu toàn bộ thay đổi, bookmark và ghi chú tại `localStorage` nội bộ.
- **Đồng bộ Đám mây (Supabase)**: Người dùng có thể cấu hình API URL và Anon Key trong phần Cài đặt để đồng bộ hai chiều dữ liệu giữa máy tính bệnh viện, điện thoại và máy tính cá nhân.
