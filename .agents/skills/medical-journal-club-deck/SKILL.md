---
name: medical-journal-club-deck
description: >
  Thiết Kế & Tạo Bài Thuyết Trình Sinh Hoạt Khoa Học / Journal Club Y Khoa Chuẩn Nature (Medical Journal Club Deck Builder).
  Hấp thu tri thức từ nature-skills (nature-paper2ppt, nature-image2ppt): Cốt truyện Luận chứng (Argumentative Spine),
  Giữ nguyên Hình ảnh & Bảng biểu gốc, Ghi chú Báo cáo viên Chuyên sâu (Speaker Notes), Bảng Thuật ngữ Nhất quán,
  và Xuất bản dạng Slide Web Trực quan (Reveal.js v6 / Pure HTML Presentation) hoặc PPTX Học thuật.
---

# 📽️ Medical Journal Club Deck Builder — Nature & Clinical Seminar Standard

> **Kế thừa & Nâng cấp từ**: `nature-paper2ppt` & `nature-image2ppt` (Yuan1z0825/nature-skills)  
> **Tích hợp cùng**: Reveal.js v6 Presentation Engine & Hệ thống Giao diện CliniPortal

---

## 🎯 1. Triết Lý Báo Cáo Sinh Hoạt Y Khoa (Journal Club Philosophy)

Một bài thuyết trình sinh hoạt khoa học (Journal Club / Báo cáo ca bệnh / Hội nghị Y khoa) xuất sắc không phải là việc sao chép từng câu chữ của bài báo lên slide, mà là **một câu chuyện tranh biện học thuật có cấu trúc (Academic Narrative Arc)**:

1. **Cốt Truyện Luận Điểm Làm Xương Sống (Argument-First Spine)**:
   - Mỗi slide chỉ truyền tải **01 thông điệp khoa học duy nhất (One Slide, One Idea)**.
   - Tiêu đề slide là một phát biểu kết luận khẳng định (Claim Statement), không phải một nhãn chung chung (ví dụ: Thay vì ghi "Kết quả", hãy ghi "Empagliflozin làm giảm 38% tử vong tim mạch").
2. **Hình Ảnh & Dữ Liệu Là Trọng Tâm Thị Giác**:
   - Sử dụng trực tiếp hình ảnh gốc từ bài báo (`Figure 1`, `Table 2`) hoặc tái tạo bằng SVG sắc nét.
   - Nhúng nhãn nguồn rõ ràng ở chân slide: `[NEJM 2015; 373:2117-2128, Fig 1B]`.
3. **Ghi Chú Báo Cáo Viên Đầy Đủ (Comprehensive Speaker Notes)**:
   - Mọi slide đều có phần Speaker Notes chi tiết: Bác sĩ cần nói gì trong 60–90 giây của slide đó, giải thích cặn kẽ các chi tiết chuyên môn và cách trả lời câu hỏi phản biện của hội đồng.
4. **Bảng Thuật Ngữ Đồng Nhất (Terminology Ledger)**:
   - Thống nhất tuyệt đối tên thuốc, tên thử nghiệm, tên gen, các chỉ số thống kê xuyên suốt toàn bộ các slide.

---

## 📑 2. Khung Cấu Trúc Slide Chuẩn (The 10-Slide Clinical Arc)

Dành cho bài báo cáo Thử nghiệm Lâm sàng (RCT) hoặc Landmark Study trong thời lượng 15–20 phút:

| Slide # | Tiêu Đề Cốt Truyện | Nội Dung Trực Quan Trên Slide | Ghi Chú Báo Cáo Viên (Speaker Notes) |
|---|---|---|---|
| **Slide 1** | **Trang Bìa Học Thuật** | Tên nghiên cứu, Tác giả chính, Tạp chí, Năm, DOI & Tên Báo cáo viên | Giới thiệu ngắn gọn lý do chọn bài báo này cho buổi sinh hoạt khoa học. |
| **Slide 2** | **Bối Cảnh & Điểm Nghẽn Lâm Sàng** | 2-3 số liệu thống kê về tỷ lệ tử vong/biến chứng và hạn chế của các phác đồ cũ | Trình bày khoảng trống tri thức: Tại sao nghiên cứu này lại tối cần thiết vào thời điểm đó? |
| **Slide 3** | **Giả Thuyết Nghiên Cứu & Cơ Chế** | Sơ đồ cơ chế tác động phân tử (SVG Schematic) hoặc câu hỏi PICO | Giải thích cơ chế sinh học: Thuốc/can thiệp này kỳ vọng tạo ra điều gì khác biệt? |
| **Slide 4** | **Thiết Kế Thử Nghiệm & Tiêu Chuẩn Chọn Mẫu** | Sơ đồ dòng thời gian (Study Timeline), Cỡ mẫu $N$, Tiêu chuẩn chọn vào/loại trừ | Phân tích tính đại diện của dân số: Bệnh nhân trong nghiên cứu có giống bệnh nhân thực tế của viện ta không? |
| **Slide 5** | **Kết Cục Chính: Hero Panel** | Biểu đồ đường cong Kaplan-Meier kết cục chính (Primary Endpoint) | Điểm nhấn quan trọng nhất của bài báo: Phân tích kỹ HR, p-value, thời điểm đường cong bắt đầu tách rời. |
| **Slide 6** | **Các Kết Cục Phụ Then Chốt** | Bảng đối sánh các biến cố phụ (Tử vong tim mạch, Nhập viện suy tim, Thận) | Nhấn mạnh những bất ngờ lâm sàng và các kết quả mang tính bước ngoặt. |
| **Slide 7** | **Phân Tích Phân Nhóm (Subgroup Analysis)** | Biểu đồ Forest Plot các phân nhóm theo tuổi, giới, mức lọc cầu thận eGFR | Chỉ ra xem hiệu quả có đồng nhất trên mọi đối tượng hay chỉ tập trung ở một nhóm nhất định. |
| **Slide 8** | **Hồ Sơ An Toàn & Tác Dụng Bất Lợi** | Bảng tỷ lệ biến cố ngoại ý nghiêm trọng (SAEs) giữa 2 nhóm | Trực diện đối mặt với rủi ro: Thuốc có gây hại không? Cần theo dõi xét nghiệm gì khi kê đơn? |
| **Slide 9** | **Thẩm Định Phương Pháp Luận & Giới Hạn** | Thẻ đánh giá sai lệch Cochrane RoB 2.0 & các hạn chế tác giả thừa nhận | Thể hiện tư duy phản biện sắc bén: Thử nghiệm có điểm yếu nào? Ai KHÔNG NÊN áp dụng? |
| **Slide 10** | **Phán Quyết Lâm Sàng & Đúc Kết Thực Chiến** | 3 Hạt ngọc lâm sàng (Clinical Pearls) + Khuyến cáo áp dụng vào phác đồ bệnh viện | Chốt lại thông điệp hành động: Thứ Hai tới khi gặp bệnh nhân tương tự, chúng ta sẽ làm gì? |

---

## 💻 3. Mẫu Slide Web Thuần Reveal.js v6 (HTML/CSS Native)

Trong CliniPortal, bài thuyết trình có thể được hiển thị trực tiếp trên trình duyệt (chạy offline `file:///` hoặc qua local server) bằng cấu trúc chuẩn Reveal.js v6:

```html
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Journal Club: EMPA-REG OUTCOME — CliniPortal</title>
  <link rel="stylesheet" href="../../assets/vendor/reveal/reveal.css">
  <link rel="stylesheet" href="../../assets/vendor/reveal/theme/dracula.css">
  <style>
    :root {
      --r-main-font: 'Be Vietnam Pro', sans-serif;
      --r-heading-font: 'Space Grotesk', sans-serif;
    }
    .slide-badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 9999px;
      font-size: 0.55em;
      font-weight: 700;
      text-transform: uppercase;
      background: rgba(2, 132, 199, 0.2);
      color: #38bdf8;
      border: 1px solid #0284c7;
      margin-bottom: 12px;
    }
    .hero-stat {
      font-size: 2.4em;
      font-weight: 800;
      color: #10b981;
      line-height: 1;
    }
    .source-tag {
      font-size: 0.45em;
      color: #94a3b8;
      margin-top: 24px;
      border-top: 1px solid #334155;
      padding-top: 8px;
    }
  </style>
</head>
<body>
  <div class="reveal">
    <div class="slides">

      <!-- SLIDE 1: Title -->
      <section>
        <span class="slide-badge">EBM Journal Club</span>
        <h2>EMPA-REG OUTCOME</h2>
        <p style="font-size: 0.8em; color: #94a3b8;">Empagliflozin, Kết Cục Tim Mạch & Tử Vong Ở Đái Tháo Đường Típ 2</p>
        <div style="font-size: 0.6em; margin-top: 30px;">
          <strong>Báo cáo viên:</strong> Ban Nghiên Cứu Khoa Học & Y Học Chứng Cứ CliniPortal<br>
          <span style="color: #64748b;">Nguồn: N Engl J Med 2015; 373:2117-2128</span>
        </div>
        <aside class="notes">
          Kính thưa các thầy cô và anh chị đồng nghiệp, hôm nay tôi xin phép trình bày thử nghiệm mang tính bước ngoặt EMPA-REG OUTCOME, một công trình đã thay đổi vĩnh viễn hướng tiếp cận bệnh nhân đái tháo đường tim mạch.
        </aside>
      </section>

      <!-- SLIDE 2: Primary Result -->
      <section data-auto-animate>
        <span class="slide-badge" style="background: rgba(16,185,129,0.2); color: #34d399; border-color: #10b981;">Kết Cục Chính (Hero Panel)</span>
        <h3 style="font-size: 1.1em;">Giảm 38% Nguy Cơ Tử Vong Do Nguyên Nhân Tim Mạch</h3>
        
        <div style="display: flex; justify-content: space-around; margin: 30px 0;">
          <div style="background: rgba(30,41,59,0.8); padding: 20px; border-radius: 12px; width: 45%;">
            <div class="hero-stat">-38%</div>
            <p style="font-size: 0.65em; margin: 8px 0 0 0;">Tử vong Tim mạch<br><strong>HR 0.62 (95% CI 0.49–0.77)</strong><br><span style="color: #10b981;">p &lt; 0.001</span></p>
          </div>
          <div style="background: rgba(30,41,59,0.8); padding: 20px; border-radius: 12px; width: 45%;">
            <div class="hero-stat" style="color: #38bdf8;">NNT = 39</div>
            <p style="font-size: 0.65em; margin: 8px 0 0 0;">Số BN cần điều trị trong 3 năm<br>để ngăn 1 ca tử vong tim mạch</p>
          </div>
        </div>

        <div class="source-tag">NEJM 2015; 373:2117-2128 — Figure 1B: Cardiovascular Death Kaplan-Meier Curve</div>
        <aside class="notes">
          Nhìn vào con số giảm 38% tử vong tim mạch với p < 0.001, đây là kết quả gây chấn động tại thời điểm công bố. Đường cong tử vong tim mạch bắt đầu tách rời rất sớm, chỉ sau khoảng 3 tháng điều trị, gợi ý cơ chế huyết động và giảm tải nội mạch đóng vai trò then chốt hơn là hiệu quả chống xơ vữa dài hạn.
        </aside>
      </section>

      <!-- SLIDE 3: Clinical Takeaways -->
      <section>
        <span class="slide-badge" style="background: rgba(245,158,11,0.2); color: #fbbf24; border-color: #f59e0b;">Đúc Kết Thực Chiến</span>
        <h3 style="font-size: 1.1em;">3 Hạt Ngọc Lâm Sàng Áp Dụng Ngay Tại Bệnh Viện</h3>
        <ul style="font-size: 0.7em; line-height: 1.8;">
          <li><strong>Chỉ định sớm:</strong> Kê đơn ngay SGLT2i cho BN ĐTĐ típ 2 có tiền sử ASCVD hoặc suy tim, bất kể mức HbA1c nền.</li>
          <li><strong>Kiểm soát chức năng thận:</strong> Chấp nhận mức giảm eGFR sinh lý thoáng qua (&lt; 30%) trong vài tuần đầu; không dừng thuốc nếu eGFR ổn định sau đó.</li>
          <li><strong>Tư vấn phòng ngừa:</strong> Dặn bệnh nhân uống đủ 1.5–2L nước mỗi ngày và hướng dẫn vệ sinh bộ phận sinh dục để ngăn ngừa nhiễm nấm niệu - sinh dục.</li>
        </ul>
        <aside class="notes">
          Xin nhấn mạnh 3 lưu ý thực tế: Thứ nhất, đừng đợi HbA1c tăng mới cho SGLT2i. Thứ hai, hiện tượng "dip eGFR" là sinh lý do co tiểu động mạch đến, không phải suy thận cấp thật sự. Thứ ba, tư vấn vệ sinh là chìa khóa giúp bệnh nhân tuân thủ điều trị lâu dài.
        </aside>
      </section>

    </div>
  </div>
  <script src="../../assets/vendor/reveal/reveal.js"></script>
  <script>
    Reveal.initialize({
      hash: true,
      slideNumber: 'c/t',
      transition: 'slide'
    });
  </script>
</body>
</html>
```

---

## 🛡️ 4. Quy Tắc Kiểm Tra Chất Lượng Slide Thuyết Trình

- [ ] **One Slide, One Idea**: Mỗi slide chỉ có một thông điệp chính, tiêu đề là câu khẳng định.
- [ ] **Đầy đủ Speaker Notes**: Bác sĩ có thể đọc trực tiếp ghi chú để trình bày lưu loát.
- [ ] **Trích dẫn nguồn minh bạch**: Ghi rõ số trang, số hình trong bài báo gốc.
- [ ] **Bảng màu tương phản cao**: Chữ rõ nét, không bị chìm trên nền máy chiếu hội trường.
