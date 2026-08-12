Bạn là một Chuyên gia Y học Chứng cứ (EBM) và Kỹ sư Dữ liệu Y khoa cấp cao. Hãy đọc kỹ tài liệu / PDF nguồn đã được tải lên và trích xuất dữ liệu thành MẢNG JSON CHUẨN đặt trong cặp ngoặc vuông [ ].

⚠️ QUY TẮC NGUYÊN TẮC:

- KHÔNG viết thêm bất kỳ lời mở đầu hay giải thích nào bên ngoài khối JSON.
- KHÔNG tự ý thay đổi tên các key (trường dữ liệu).
- Ngôn ngữ trích xuất: Tiếng Việt y khoa chuyên môn, súc tích, chuẩn xác.

--------------------------------------------------
📌 QUY ĐỊNH BẮT BUỘC CHO CÁC TRƯỜNG DỮ LIỆU:

1. "sourceType" (Nguồn ban hành - Chọn 1 trong các giá trị):
   - "intl-guideline"   : Hướng dẫn / Khuyến cáo từ các Hội Y học Quốc tế (AHA, ESC, GINA, KDIGO, ADA...)
   - "intl-study"       : Nghiên cứu RCT / Meta-Analysis quốc tế công bố trên tạp chí (NEJM, Lancet, Circulation...)
   - "vn-moh"           : Hướng dẫn / Quyết định từ Bộ Y tế Việt Nam
   - "vn-association"   : Khuyến cáo từ các Hội Chuyên khoa Việt Nam (VNHA, VSEM, VNRA...)

2. "specialty" (Chuyên khoa chính - Chọn 1 trong các mã sau):
   - "cardio" (Tim mạch) | "pulmo" (Hô hấp) | "gi" (Tiêu hóa) | "endo" (Nội tiết)
   - "renal" (Thận học)  | "neuro" (Thần kinh) | "infect" (Truyền nhiễm) | "rheum" (Cơ xương khớp)
   - "hema" (Huyết học) | "onco" (Ung thư)  | "pedia" (Nhi khoa) | "obgyn" (Sản phụ khoa)
   - "icu" (Hồi sức tích cực) | "derma" (Da liễu) | "ent" (Tai Mũi Họng) | "nutri" (Dinh dưỡng)

3. "design" (Thiết kế nghiên cứu - Chọn 1):
   - "guideline"   : Hướng dẫn / Khuyến cáo lâm sàng
   - "rct"         : Thử nghiệm lâm sàng ngẫu nhiên có đối chứng
   - "meta"        : Tổng quan hệ thống / Phân tích gộp (Systematic Review / Meta-Analysis)
   - "cohort"      : Nghiên cứu thuần tập / Quan sát
   - "review"      : Bài tổng quan y khoa (Narrative Review)
   - "case-report" : Báo cáo ca lâm sàng / Loạt ca

4. "impact" (Mức độ ảnh hưởng lâm sàng - Chọn 1):
   - "practice-changing" : Thay đổi thực hành lâm sàng (Khuyến cáo mạnh Class I, Landmark trial)
   - "informative"       : Cung cấp thông tin / Bằng chứng hỗ trợ
   - "early-signal"      : Tín hiệu nghiên cứu sớm / Tiềm năng
   - "negative"          : Kết quả âm tính / Không có sự khác biệt (Neutral/Negative)
   - "regulatory"        : Phê duyệt quy định pháp lý (FDA, EMA, BYT)

--------------------------------------------------
📊 QUY ĐỊNH TRƯỜNG "keyResults" — BỘ ENGINE ĐỒ HỌA SVG TỰ ĐỘNG:

Trường "keyResults" điều khiển Bộ Engine Đồ Họa SVG — hệ thống sẽ TỰ ĐỘNG vẽ biểu đồ phù hợp dựa vào cú pháp bạn nhập. Chọn ĐÚNG 1 chuẩn phù hợp nhất với loại dữ liệu:

[LOẠI 1] 🌲 Forest Plot — Dùng khi có Tỷ số nguy cơ (HR / OR / RR) và 95% CI:
   Cú pháp: "HR 0.86 (95% CI 0.74-0.99, p=0.04)"
   Ví dụ:   "OR 0.62 (95% CI 0.48-0.79, p<0.001)"
   → Tự động màu XANH nếu HR < 1 (có lợi), ĐỎ nếu HR > 1 (bất lợi)
   → Dùng cho: RCT, Meta-Analysis, Cohort Study

[LOẠI 2] 📊 Biểu đồ Cột (Column Chart) — Dùng khi so sánh tỷ lệ % nhiều nhóm:
   Cú pháp: "COL: [Nhóm 1]: [Giá trị]% | [Nhóm 2]: [Giá trị]%"
   Ví dụ:   "COL: Can thiệp: 3.7% | Giả dược: 5.9%"
   Ví dụ:   "COL: Tử vong TM: 3.7% | Suy tim: 2.7% | Đột quỵ: 1.2%"
   → Phân cách nhóm bằng " | " — nhãn và giá trị phân cách bằng ":"

[LOẠI 3] 📉 Biểu đồ Ngang (Horizontal Bar) — Dùng khi có nhiều tiêu chí (≥ 3 items):
   Cú pháp: "HBAR: [Tiêu chí 1]: [Giá trị]% | [Tiêu chí 2]: [Giá trị]%"
   Ví dụ:   "HBAR: Đột quỵ: 1.2% | Suy tim: 2.7% | Tử vong: 3.7% | Nhập viện: 8.5%"

[LOẠI 4] ⚖️ So sánh 2 Nhóm (Comparison Bar) — Dùng khi chỉ so sánh 2 tỷ lệ:
   Cú pháp: "[Nhóm A] [Giá trị]% vs [Nhóm B] [Giá trị]%"
   Ví dụ:   "Can thiệp 3.7% vs Giả dược 5.9%"
   Ví dụ:   "3.7% vs 5.9%" (không cần nhãn)

[LOẠI 5] 🍩 Vòng Donut / Tiến độ — Dùng cho tỷ lệ phần trăm đơn lẻ hoặc phân số:
   Cú pháp: "[Tỷ lệ]% ([Số đạt]/[Tổng])"
   Ví dụ:   "91% (63/69)"
   Ví dụ:   "Tỷ lệ đáp ứng hoàn toàn: 78%"

[LOẠI 6] 📄 NNT / NNH — Dùng khi muốn trình bày chỉ số cần điều trị / gây hại:
   Cú pháp: "NNT = 19" hoặc "NNH = 50 (tác dụng phụ X)"
   → Hiển thị dưới dạng văn bản thuần không có biểu đồ

--------------------------------------------------
🧬 QUY ĐỊNH TRƯỜNG "subgroups" — FOREST PLOT ĐA HÀNG (SUBGROUP ANALYSIS):

Trường "subgroups" là JSON object (key-value). Hệ thống sẽ tự động vẽ Forest Plot đa hàng khi người dùng MỞ RỘNG CHI TIẾT nghiên cứu trong bảng.

QUY TẮC GIÁ TRỊ cho mỗi key trong "subgroups":
   → Dùng cú pháp Forest Plot nếu là HR/OR/RR: "HR 0.82 (95% CI 0.64-1.04)"
   → Dùng cú pháp COL: nếu là dữ liệu cột: "COL: Nhóm A: 72.5% | Nhóm B: 45.1%"
   → Dùng cú pháp HBAR: nếu là dữ liệu ngang: "HBAR: Tiêu chí X: 78% | Tiêu chí Y: 54%"

--------------------------------------------------
📝 QUY ĐỊNH 2 TRƯỜNG KẾT LUẬN:

- "summary": Kết luận ngắn gọn 2-3 câu — Hiển thị trực tiếp trên Bảng và trong Ô Xem Nhanh.
  → Mô tả thông điệp cốt lõi + tác động lâm sàng chính.

- "detailedConclusion": Kết luận chi tiết 3-5 câu — Hiển thị khi nhấn MỞ RỘNG chi tiết nghiên cứu.
  → Bao gồm: liều dùng cụ thể, số liệu các tiêu chí phụ, tác dụng phụ đáng chú ý, khuyến cáo Class I/IIa/III (nếu là Guideline), hạn chế của nghiên cứu.

--------------------------------------------------
📄 MẪU OUTPUT JSON CHUẨN (ĐẦY ĐỦ):

[
  {
    "id": "study_2026_ten_nghien_cuu_slug",
    "title": "[Tên Tiếng Việt đầy đủ của Guideline / Nghiên cứu]",
    "drug": "[Tên hoạt chất / thuốc can thiệp chính, phân cách bằng dấu phẩy]",
    "sourceType": "intl-guideline",
    "specialty": "cardio",
    "design": "guideline",
    "intervention": "[Tóm tắt phác đồ can thiệp / quy trình chẩn đoán chính trong 1-2 câu]",
    "primaryEndpoint": "[Tiêu chí đánh giá chính hoặc mục tiêu lâm sàng hàng đầu]",
    "keyResults": "[Chọn đúng 1 trong 6 cú pháp của Bộ Engine Đồ Họa SVG bên trên]",
    "impact": "practice-changing",
    "year": 2026,
    "organization": "[Tên tổ chức ban hành: AHA / ESC / GINA / KDIGO / BYT / VNHA...]",
    "phase": "Clinical Guideline",
    "sampleSize": null,
    "population": "[Đối tượng bệnh nhân mục tiêu của nghiên cứu / guideline]",
    "summary": "[Kết luận ngắn 2-3 câu — thông điệp cốt lõi + tác động lâm sàng chính]",
    "detailedConclusion": "[Kết luận chi tiết 3-5 câu — liều dùng, tiêu chí phụ, tác dụng phụ, khuyến cáo Class]",
    "file": "kho-guidelines/2026-ten-file.html",
    "asianData": true,
    "bookmarked": false,
    "subgroups": {
      "[Phân nhóm Forest Plot]": "HR 0.82 (95% CI 0.64-1.04)",
      "[Phân nhóm Cột]": "COL: Nhóm A: 72.5% | Nhóm B: 45.1%",
      "[Phân nhóm Ngang]": "HBAR: Tiêu chí X: 78.5% | Tiêu chí Y: 54.0%"
    }
  }
]

--------------------------------------------------
💡 VÍ DỤ THỰC TẾ (Nghiên cứu EMPA-REG OUTCOME):

[
  {
    "id": "study_2015_empa_reg_outcome",
    "title": "EMPA-REG OUTCOME — Empagliflozin, Tim Mạch và Suy Tim ở Bệnh Nhân Đái Tháo Đường Típ 2",
    "drug": "Empagliflozin",
    "sourceType": "intl-study",
    "specialty": "cardio",
    "design": "rct",
    "intervention": "Empagliflozin 10mg hoặc 25mg mỗi ngày so với giả dược, phối hợp điều trị chuẩn trên bệnh nhân ĐTĐ típ 2 có nguy cơ tim mạch cao.",
    "primaryEndpoint": "Tiêu chí gộp MACE 3 điểm: Tử vong do tim mạch + Nhồi máu cơ tim không tử vong + Đột quỵ não không tử vong",
    "keyResults": "HR 0.86 (95% CI 0.74-0.99, p=0.04)",
    "impact": "practice-changing",
    "year": 2015,
    "organization": "NEJM",
    "phase": "Phase III RCT",
    "sampleSize": 7020,
    "population": "Bệnh nhân ĐTĐ típ 2 có bệnh tim mạch đã xác định, HbA1c 7-10%, eGFR ≥ 30 mL/ph",
    "summary": "Empagliflozin giảm có ý nghĩa tiêu chí gộp MACE 3 điểm so với giả dược (HR 0.86, p=0.04), đồng thời giảm mạnh tỷ lệ nhập viện do suy tim 35% và tử vong do mọi nguyên nhân 32%.",
    "detailedConclusion": "Empagliflozin giảm tử vong do tim mạch 38% (3.7% vs 5.9%, p<0.001) và nhập viện do suy tim 35% (2.7% vs 4.1%, p=0.002). Tử vong do mọi nguyên nhân giảm 32% (5.7% vs 8.3%, p<0.001). Không ghi nhận sự khác biệt đáng kể về nhồi máu cơ tim hay đột quỵ. Tác dụng phụ hay gặp nhất là tăng tỷ lệ nhiễm trùng sinh dục (6.4% vs 1.8%, p<0.001). Lợi ích tim mạch xuất hiện sớm ngay từ tuần 12, gợi ý tác dụng huyết động nhiều hơn chuyển hóa.",
    "file": "kho-guidelines/2015-empa-reg-outcome.html",
    "asianData": true,
    "bookmarked": false,
    "subgroups": {
      "Châu Á": "HR 0.82 (95% CI 0.64-1.04)",
      "Suy tim sẵn có": "HR 0.65 (95% CI 0.50-0.85)",
      "Tử vong TM vs Suy tim": "COL: Tử vong TM: 3.7% | Nhập viện ST: 2.7%",
      "Tiêu chí phụ theo tạng": "HBAR: Tim mạch: 3.7% | Thận: 12.7% | Tử vong: 5.7%"
    }
  }
]
