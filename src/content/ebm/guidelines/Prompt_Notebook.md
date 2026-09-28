# 📋 MASTER PROMPT NOTEBOOKLM — TRÍCH XUẤT JSON NẠP VÀO KHO GUIDELINES & EBM CLINIPORTAL

> **Hướng dẫn sử dụng:**
> 1. Tải tài liệu PDF Guideline / Khuyến cáo / Bài báo RCT lên **Google NotebookLM** (hoặc Gemini 1.5/2.0 Pro / Claude 3.5 Sonnet / GPT-4o).
> 2. Sao chép toàn bộ nội dung Prompt bên dưới và dán vào ô Chat của NotebookLM.
> 3. Sao chép khối JSON kết quả và nạp trực tiếp vào CliniPortal qua modal **"📥 Nạp Dữ Liệu JSON"** hoặc lưu vào file [`kho-guidelines-registry.ts`](file:///i:/Drive%20c%E1%BB%A7a%20t%C3%B4i/apps/Apps_ykhoa/src/content/ebm/guidelines/js/kho-guidelines-registry.ts).

---

```text
Bạn là một Chuyên gia Y học Chứng cứ (Evidence-Based Medicine - EBM) và Kỹ sư Cấu trúc Dữ liệu Y khoa cấp cao. Hãy đọc kỹ toàn bộ tài liệu nguồn / PDF y khoa đã được tải lên và trích xuất dữ liệu thành MẢNG JSON CHUẨN đặt trong cặp ngoặc vuông [ ].

⚠️ NGUYÊN TẮC BẤT DI BẤT DỊCH:
1. KHÔNG viết bất kỳ lời mở đầu, giải thích hay nhận xét nào bên ngoài khối JSON.
2. Chỉ trả về DUY NHẤT một khối code JSON hợp lệ: ```json [ { ... } ] ```.
3. KHÔNG tự ý thay đổi hay biến chế tên các trường (keys).
4. Ngôn ngữ trích xuất: Tiếng Việt y khoa chuyên môn, cô đọng, súc tích, chuẩn mực thực hành lâm sàng. Giữ nguyên tên hoạt chất, tên nghiên cứu, tên thang điểm và danh pháp quốc tế.
5. Escape chuẩn xác mọi dấu ngoặc kép bên trong chuỗi (ví dụ: \"...\") để đảm bảo JSON hợp lệ 100%.

══════════════════════════════════════════════════
📌 BẢNG TRA CỨU DANH MỤC CHUẨN (CONTROLLED VOCABULARIES):
══════════════════════════════════════════════════

1. "sourceType" (Nguồn ban hành — Chọn 1 trong 5 giá trị):
   - "intl-guideline"   : Hướng dẫn / Khuyến cáo từ các Hội Y học Quốc tế (EASL, AASLD, ESC, AHA/ACC, KDIGO, GINA, GOLD, ADA, IDSA, ASCO...)
   - "intl-study"       : Nghiên cứu thử nghiệm lâm sàng RCT / Phân tích gộp công bố trên tạp chí quốc tế (NEJM, Lancet, JAMA, BMJ, Circulation...)
   - "vn-moh"           : Hướng dẫn chẩn đoán & điều trị / Quyết định chuyên môn từ Bộ Y tế Việt Nam (QĐ-BYT)
   - "vn-doh"           : Hướng dẫn chuyên môn từ Sở Y tế (SYT TP.HCM, SYT Hà Nội...)
   - "vn-association"   : Khuyến cáo từ các Hội Chuyên khoa Việt Nam (VNHA, VSEM, VNRA, VSH, VFAS...)

2. "specialty" (Chuyên khoa chính — Chọn đúng 1 mã):
   - "cardio"   : Tim mạch
   - "pulmo"    : Hô hấp
   - "gi"       : Tiêu hóa - Gan mật
   - "endo"     : Nội tiết - Chuyển hóa
   - "renal"    : Thận học - Lọc máu
   - "neuro"    : Thần kinh - Đột quỵ
   - "infect"   : Truyền nhiễm - Nhiễm trùng
   - "rheum"    : Cơ xương khớp - Miễn dịch
   - "hema"     : Huyết học - Truyền máu
   - "onco"     : Ung bướu
   - "pedia"    : Nhi khoa
   - "obgyn"    : Sản phụ khoa
   - "icu"      : Hồi sức cấp cứu & Chống độc
   - "derma"    : Da liễu
   - "ent"      : Tai Mũi Họng
   - "nutri"    : Dinh dưỡng lâm sàng
   * Gợi ý: Nếu tài liệu mang tính liên chuyên khoa rõ nét, có thể khai báo thêm "specialty2" bằng 1 mã trên.

3. "design" (Thiết kế nghiên cứu / Loại văn bản — Chọn 1):
   - "guideline"   : Hướng dẫn / Khuyến cáo thực hành lâm sàng (Clinical Practice Guideline / Consensus)
   - "rct"         : Thử nghiệm lâm sàng ngẫu nhiên có đối chứng (Randomized Controlled Trial)
   - "meta"        : Tổng quan hệ thống & Phân tích gộp (Systematic Review / Meta-Analysis)
   - "cohort"      : Nghiên cứu quan sát / Thuần tập (Cohort Study / Registry)
   - "review"      : Bài tổng quan lâm sàng chuyên sâu (State-of-the-Art Narrative Review)
   - "case-report" : Báo cáo ca bệnh đặc biệt / Loạt ca lâm sàng
   - "other"       : Loại hình nghiên cứu khác

4. "impact" (Mức độ ảnh hưởng lâm sàng — Chọn 1):
   - "practice-changing" : Thay đổi thực hành lâm sàng (Khuyến cáo Class I, Landmark Trial bản lề)
   - "informative"       : Cung cấp thông tin / Dữ liệu hỗ trợ thực hành
   - "early-signal"      : Tín hiệu nghiên cứu sớm / Tiềm năng cần theo dõi thêm
   - "negative"          : Kết quả âm tính / Không cải thiện tiêu chí chính (Neutral / Futility / Negative)
   - "regulatory"        : Phê duyệt quy chế quản lý / Cảnh báo an toàn dược (FDA, EMA, BYT)

5. "conditionKey" (Mã tình trạng bệnh lý chuẩn CliniPortal — BẮT BUỘC CHỌN 1 MÃ):
   - Tim mạch: 'heart-failure' (Suy tim), 'hypertension' (Tăng huyết áp), 'af' (Rung nhĩ/Loạn nhịp), 'cad' (Bệnh mạch vành/ACS), 'valvular-heart' (Van tim), 'cardiogenic-shock' (Sốc tim), 'syncope' (Ngất), 'vte-pe' (Huyết khối TM/Thuyên tắc phổi)
   - Hô hấp: 'copd' (COPD), 'asthma' (Hen), 'pneumonia' (Viêm phổi CAP/HAP), 'interstitial-lung' (Bệnh phổi mô kẽ ILD), 'tb' (Lao), 'ards' (Suy hô hấp cấp ARDS)
   - Hồi sức & Thận: 'icu' (Nhiễm trùng huyết/Sepsis), 'aki' (Tổn thương thận cấp), 'ckd' (Bệnh thận mạn), 'nephrotic' (Hội chứng thận hư), 'uti' (Nhiễm khuẩn tiết niệu), 'bph-luts' (Tăng sinh TTL)
   - Tiêu hóa - Gan mật: 'cirrhosis' (Xơ gan & Tăng áp cửa), 'masld-mash' (Gan nhiễm mỡ), 'dili' (Tổn thương gan do thuốc), 'wilson' (Bệnh Wilson), 'autoimmune-hepatitis' (Viêm gan tự miễn AIH), 'gerd-peptic' (Trào ngược GERD & Loét DDTT), 'biliary-tract' (Bệnh mật tụy & Viêm tụy cấp), 'ibd' (Viêm ruột mạn), 'ugib' (Xuất huyết tiêu hóa trên)
   - Nội tiết & Dinh dưỡng: 'diabetes-t2d' (ĐTĐ Típ 2), 'diabetes-t1d' (ĐTĐ Típ 1), 'thyroid' (Tuyến giáp & Bão giáp), 'dyslipidemia' (Rối loạn lipid máu), 'obesity' (Béo phì/HC Chuyển hóa), 'clinical-nutrition' (Dinh dưỡng lâm sàng)
   - Truyền nhiễm: 'hepatitis-b' (Viêm gan B), 'hepatitis-c' (Viêm gan C), 'flu' (Cúm & Vi rút hô hấp), 'covid19' (COVID-19), 'hemorrhagic-fever' (Sốt xuất huyết Dengue), 'measles' (Sởi), 'hfmd' (Tay chân miệng), 'invasive-fungal' (Nấm xâm lấn), 'malaria' (Sốt rét), 'meningitis' (Viêm màng não), 'hiv-aids' (HIV/AIDS), 'antibiotics' (Kháng sinh), 'microbiology' (Vi sinh), 'ams-resistance' (Quản lý kháng sinh & Vi khuẩn đa kháng)
   - Thần kinh: 'stroke' (Đột quỵ não), 'epilepsy' (Động kinh), 'headache-migraine' (Đau đầu & Migraine), 'neuro-emergencies' (Cấp cứu thần kinh/Máu tụ NMG)
   - Cơ xương khớp: 'gout' (Gút & Acid uric), 'ra' (Viêm khớp dạng thấp), 'osteoporosis' (Loãng xương), 'lupus-sle' (Lupus hệ thống)
   - Ung bướu & Phụ sản: 'solid-cancers' (Ung thư tạng), 'hemangioma' (U máu/Dị dạng mạch), 'uterine-fibroids' (U xơ tử cung & Sản khoa)

══════════════════════════════════════════════════
📊 QUY ĐỊNH TRƯỜNG "keyResults":
══════════════════════════════════════════════════

Trường "keyResults" hiển thị trên Bảng điều khiển và kích hoạt Engine Đồ họa SVG tự động. Hãy chọn 1 trong 2 hình thức:

👉 HÌNH THỨC A: ĐỐI VỚI HƯỚNG DẪN / GUIDELINE (Khuyến nghị dùng dạng Hạt ngọc phân cách " | "):
   Cú pháp: "[Khuyến cáo 1] | [Tiêu chuẩn chẩn đoán cốt lõi] | [Ngưỡng số liệu / Phác đồ then chốt] | [Thời gian điều trị / Cảnh báo an toàn]"
   Ví dụ: "Sinh thiết gan là điều kiện tiên quyết | IAIHG 2008 ≥ 7 điểm chẩn đoán chắc chắn | Budesonide đạt lui bệnh không tác dụng phụ 47% vs 18.4% Prednisolone | Thời gian điều trị tối thiểu ≥ 3 năm"

👉 HÌNH THỨC B: ĐỐI VỚI NGHIÊN CỨU RCT / META-ANALYSIS CÓ SỐ LIỆU ĐỐI CHỨNG (Tự động vẽ SVG):
   [1] Forest Plot (Có HR / OR / RR và 95% CI):
       Cú pháp: "HR 0.86 (95% CI 0.74-0.99, p=0.04)" hoặc "OR 0.62 (95% CI 0.48-0.79, p<0.001)"
       → Hệ thống tự vẽ thanh sai số ngang (Xanh lá nếu HR < 1, Đỏ nếu HR > 1).
   [2] Biểu đồ Cột (Column Chart - so sánh % các nhóm):
       Cú pháp: "COL: [Nhóm 1]: [Giá trị]% | [Nhóm 2]: [Giá trị]%"
       Ví dụ:   "COL: Can thiệp: 3.7% | Giả dược: 5.9%"
   [3] Biểu đồ Ngang (Horizontal Bar - so sánh ≥ 3 tiêu chí):
       Cú pháp: "HBAR: [Tiêu chí 1]: [Giá trị]% | [Tiêu chí 2]: [Giá trị]%"
       Ví dụ:   "HBAR: Tử vong TM: 3.7% | Suy tim: 2.7% | Đột quỵ: 1.2%"
   [4] So sánh 2 tỷ lệ (Comparison Bar):
       Cú pháp: "[Nhóm A] [Giá trị]% vs [Nhóm B] [Giá trị]%"
       Ví dụ:   "Can thiệp 3.7% vs Giả dược 5.9%"
   [5] Tỷ lệ phần trăm đơn lẻ / Phân số (Donut):
       Cú pháp: "91% (63/69)" hoặc "Tỷ lệ lui bệnh sinh hóa: 78%"
   [6] Chỉ số NNT / NNH:
       Cú pháp: "NNT = 19" hoặc "NNH = 50"

══════════════════════════════════════════════════
🧬 QUY ĐỊNH TRƯỜNG "subgroups" (PHÂN TÍCH PHÂN NHÓM):
══════════════════════════════════════════════════
Object key-value dùng để vẽ biểu đồ mở rộng chi tiết khi xem nghiên cứu:
- Dùng Forest Plot: "Châu Á": "HR 0.82 (95% CI 0.64-1.04)"
- Dùng Cột: "Theo liều dùng": "COL: Liều 10mg: 72.5% | Liều 25mg: 81.2%"
- Dùng Ngang: "Tiêu chí phụ": "HBAR: Nhập viện: 3.7% | Suy thận tiến triển: 1.5%"

══════════════════════════════════════════════════
📝 QUY ĐỊNH 2 TRƯỜNG KẾT LUẬN:
══════════════════════════════════════════════════

1. "summary" (2-3 câu):
   Hiển thị trực tiếp trên dòng danh sách và ô xem nhanh. Nêu bật: Đối tượng chỉ định + Can thiệp chính + Lợi ích lâm sàng lớn nhất (kèm số liệu then chốt).

2. "detailedConclusion" (4-6 câu):
   Hiển thị khi nhấn Mở Rộng chi tiết. Phải bao gồm:
   - Liều dùng cụ thể (liều khởi đầu, chuẩn độ, liều đích).
   - Phân cấp khuyến cáo chính thức nếu là Guideline: Class I, IIa, IIb, III và Mức chứng cứ Level A, B, C.
   - Tác dụng phụ thường gặp và biến cố nghiêm trọng cần theo dõi.
   - Chống chỉ định tuyệt đối và cạm bẫy lâm sàng thực hành.

══════════════════════════════════════════════════
📄 SCHEMA MẪU ĐẦY ĐỦ CỦA 1 BẢN GHI JSON:
══════════════════════════════════════════════════

[
  {
    "id": "2026-tochuc-ten-benh-slug",
    "title": "[Tên Tiếng Việt đầy đủ của Guideline / Nghiên cứu]",
    "titleEn": "[Tên Tiếng Anh gốc chính thức của Guideline / Paper]",
    "drug": "[Tên hoạt chất / nhóm thuốc can thiệp, phân cách bằng dấu phẩy]",
    "author": "[Tác giả chính / Nhóm biên soạn chính, ví dụ: EASL Governing Board hoặc Smith J et al.]",
    "sourceType": "intl-guideline",
    "specialty": "gi",
    "specialty2": null,
    "design": "guideline",
    "intervention": "[Tóm tắt các bước chẩn đoán, thang điểm phân tầng, phác đồ điều trị hàng 1/2 và quy trình theo dõi trong 2-3 câu]",
    "primaryEndpoint": "[Tiêu chí đánh giá chính hoặc mục tiêu lâm sàng hàng đầu]",
    "keyResults": "[Chọn đúng 1 trong các hình thức Hạt ngọc '|' hoặc Forest Plot / COL / HBAR ở trên]",
    "impact": "practice-changing",
    "year": 2026,
    "organization": "[Tên tổ chức ban hành: EASL / AASLD / ESC / AHA / KDIGO / ADA / BYT...]",
    "journal": "[Tên tạp chí y khoa chính thức, ví dụ: Journal of Hepatology, NEJM, Lancet...]",
    "phase": "[Loại tài liệu: Clinical Practice Guidelines, Guideline Update, Consensus Statement, Phase III RCT...]",
    "sampleSize": null,
    "population": "[Đối tượng bệnh nhân mục tiêu, tiêu chuẩn lựa chọn / loại trừ chính]",
    "summary": "[Kết luận ngắn 2-3 câu — thông điệp cốt lõi + tác động lâm sàng chính]",
    "detailedConclusion": "[Kết luận chi tiết 4-6 câu — liều dùng, khuyến cáo Class/Level, tác dụng phụ, cạm bẫy]",
    "file": "2026-tochuc-ten-benh-slug.mdx",
    "conditionKey": "cirrhosis",
    "icd10": ["K74", "K70.3", "I85"],
    "asianData": true,
    "bookmarked": false,
    "sourceUrl": "[DOI hoặc link bài báo / guideline chính thức nếu có]",
    "fdaStatus": "[Tình trạng phê duyệt FDA / EMA / BYT nếu có]",
    "subgroups": {
      "[Tên phân nhóm 1]": "HR 0.82 (95% CI 0.64-1.04)",
      "[Tên phân nhóm 2]": "COL: Nhóm A: 72.5% | Nhóm B: 45.1%"
    }
  }
]

══════════════════════════════════════════════════
💡 VÍ DỤ 1: HƯỚNG DẪN THỰC HÀNH LÂM SÀNG (GUIDELINE)
══════════════════════════════════════════════════

[
  {
    "id": "2019-easl-dili",
    "title": "EASL 2019: Hướng Dẫn Thực Hành Lâm Sàng Về Tổn Thương Gan Do Thuốc (DILI)",
    "titleEn": "EASL Clinical Practice Guidelines: Drug-induced liver injury",
    "drug": "Acetaminophen, Amoxicillin-clavulanate, Isoniazid, N-acetylcysteine (NAC), L-Carnitine, Cholestyramine, Corticosteroids",
    "author": "EASL Clinical Practice Guidelines Panel",
    "sourceType": "intl-guideline",
    "specialty": "gi",
    "specialty2": null,
    "design": "guideline",
    "intervention": "Phân loại DILI theo cơ chế Trực tiếp vs Bất thường; Ứng dụng chỉ số R phân định Thể Tế bào gan (R ≥ 5), Thể Ứ mật (R ≤ 2) và Thể Hỗn hợp (2 < R < 5); Đánh giá nguy cơ tử vong 10% theo quy tắc Hy's Law; Định lượng quan hệ nhân quả bằng thang điểm RUCAM; Ngừng thuốc nghi ngờ tức thì, can thiệp NAC sớm cho suy gan cấp độ I-II, L-carnitine cho ngộ độc Valproate, Cholestyramine cho Leflunomide; Chống chỉ định tự ý rechallenge.",
    "primaryEndpoint": "Khuyến cáo toàn diện về chẩn đoán, phân loại hình thái tổn thương, phân tầng nguy cơ, đánh giá quy nguyên nhân quả và xử trí điều trị DILI.",
    "keyResults": "Chỉ số R định hướng chính xác 3 thể tổn thương | Tiêu chuẩn Hy's Law dự báo nguy cơ tử vong/ghép gan 10% | NAC truyền tĩnh mạch tăng sống không ghép từ 27% lên 58% trong suy gan cấp độ I-II | L-carnitine là antidote đặc hiệu cho Valproate | Chống chỉ định tuyệt đối tự ý rechallenge.",
    "impact": "practice-changing",
    "year": 2019,
    "organization": "EASL",
    "journal": "Journal of Hepatology",
    "phase": "Clinical Practice Guidelines / EBM",
    "sampleSize": null,
    "population": "Bệnh nhân nghi ngờ hoặc xác định mắc tổn thương gan do thuốc kê đơn, thuốc OTC, hóa trị, liệu pháp miễn dịch ung thư, thảo dược và thực phẩm chức năng.",
    "summary": "Hướng dẫn thực hành lâm sàng cốt lõi của EASL 2019 về DILI: Chuẩn hóa phân loại cơ chế, tính toán chỉ số R, tiên lượng theo quy tắc Hy's Law, ứng dụng thang điểm RUCAM, xử trí viêm gan do thuốc ức chế điểm kiểm soát miễn dịch (ICIs) và phác đồ antidote NAC / L-Carnitine.",
    "detailedConclusion": "DILI là chẩn đoán loại trừ nghiêm ngặt. Bắt buộc tính chỉ số R lúc phát hiện: R ≥ 5 (thể tế bào gan), R ≤ 2 (thể ứ mật). Quy tắc Hy's Law (ALT ≥ 3x ULN kết hợp T.Bilirubin > 2x ULN mà không có ứ mật ban đầu) cảnh báo tỷ lệ tử vong hoặc cần ghép gan lên đến 10%. Can thiệp đầu tay và quyết định sống còn là ngừng ngay lập tức mọi thuốc nghi ngờ. Chỉ định truyền N-acetylcysteine sớm cho ca DILI bất thường có suy gan cấp giai đoạn sớm (hôn mê gan độ I-II). Dùng L-carnitine cho quá liều Valproate; dùng Cholestyramine để cắt chu trình gan ruột của Leflunomide. Corticosteroid chỉ có vai trò trong viêm gan tự miễn do thuốc hoặc tổn thương gan liên quan ICIs ung thư. Chống chỉ định tái sử dụng (rechallenge) thuốc nghi ngờ trừ trường hợp không còn lựa chọn điều trị thay thế.",
    "file": "2019-easl-dili.mdx",
    "conditionKey": "dili",
    "icd10": ["K71", "K71.0", "K71.1", "K71.2", "K71.6", "K72.0"],
    "asianData": true,
    "bookmarked": false,
    "sourceUrl": "https://doi.org/10.1016/j.jhep.2019.02.014",
    "fdaStatus": "Approved Guidelines",
    "subgroups": {
      "Tử vong theo Hy's Law": "COL: Đạt Hy's Law: 10.0% | Không đạt: 1.2%",
      "Sống không ghép gan với NAC": "COL: Có dùng NAC: 58.0% | Giả dược: 27.0%"
    }
  }
]

══════════════════════════════════════════════════
💡 VÍ DỤ 2: NGHIÊN CỨU LÂM SÀNG BẢN LỀ (LANDMARK RCT)
══════════════════════════════════════════════════

[
  {
    "id": "study_2015_empa_reg_outcome",
    "title": "EMPA-REG OUTCOME — Empagliflozin, Biến Cố Tim Mạch và Tử Vong ở Đái Tháo Đường Típ 2",
    "titleEn": "Empagliflozin, Cardiovascular Outcomes, and Mortality in Type 2 Diabetes",
    "drug": "Empagliflozin",
    "author": "Zinman B, Wanner C, Lachin JM, et al. (EMPA-REG OUTCOME Investigators)",
    "sourceType": "intl-study",
    "specialty": "cardio",
    "specialty2": "endo",
    "design": "rct",
    "intervention": "Empagliflozin 10mg hoặc 25mg uống 1 lần mỗi ngày so với giả dược, trên nền phác đồ điều trị nội khoa chuẩn tối ưu ở bệnh nhân đái tháo đường típ 2 có nguy cơ tim mạch rất cao.",
    "primaryEndpoint": "Tiêu chí gộp MACE 3 điểm: Tử vong do nguyên nhân tim mạch, Nhồi máu cơ tim không tử vong, hoặc Đột quỵ không tử vong.",
    "keyResults": "HR 0.86 (95% CI 0.74-0.99, p=0.04)",
    "impact": "practice-changing",
    "year": 2015,
    "organization": "Boehringer Ingelheim / Lilly",
    "journal": "N Engl J Med",
    "phase": "Phase III RCT",
    "sampleSize": 7020,
    "population": "Bệnh nhân đái tháo đường típ 2 đã xác định có bệnh lý tim mạch do xơ vữa, HbA1c 7.0-10.0%, eGFR ≥ 30 mL/ph/1.73m2.",
    "summary": "Empagliflozin làm giảm có ý nghĩa thống kê 14% tiêu chí gộp MACE 3 điểm so với giả dược (HR 0.86, p=0.04), đồng thời tạo bước ngoặt khi giảm 38% tử vong tim mạch và 35% tỷ lệ nhập viện do suy tim.",
    "detailedConclusion": "Thử nghiệm chứng minh Empagliflozin 10mg và 25mg mang lại lợi ích bảo vệ tim mạch vượt trội: Giảm tử vong do tim mạch 38% (3.7% vs 5.9%, HR 0.62, p<0.001), giảm nhập viện vì suy tim 35% (2.7% vs 4.1%, HR 0.65, p=0.002) và giảm tử vong do mọi nguyên nhân 32% (5.7% vs 8.3%, HR 0.68, p<0.001). Không có sự khác biệt có ý nghĩa về nhồi máu cơ tim (4.8% vs 5.4%) hoặc đột quỵ (3.5% vs 3.0%). Tác dụng phụ thường gặp nhất là nhiễm nấm đường sinh dục (6.4% ở nhóm can thiệp vs 1.8% ở giả dược, p<0.001). Lợi ích cải thiện suy tim và sống còn xuất hiện rất sớm ngay từ tuần thứ 12, khẳng định cơ chế tác động huyết động học độc lập với kiểm soát đường huyết.",
    "file": "study_2015_empa_reg_outcome.mdx",
    "conditionKey": "heart-failure",
    "icd10": ["E11", "I50", "I25"],
    "asianData": true,
    "bookmarked": false,
    "sourceUrl": "https://doi.org/10.1056/NEJMoa1504720",
    "fdaStatus": "FDA Approved for CV Risk & Heart Failure",
    "subgroups": {
      "Dân số Châu Á": "HR 0.82 (95% CI 0.64-1.04)",
      "Bệnh nhân có tiền sử suy tim": "HR 0.65 (95% CI 0.50-0.85)",
      "Tiêu chí phụ tử vong vs suy tim": "COL: Tử vong TM: 3.7% | Nhập viện ST: 2.7%",
      "So sánh các biến cố chính": "HBAR: Tử vong TM: 3.7% | Mọi nguyên nhân: 5.7% | Nhập viện ST: 2.7%"
    }
  }
]
```
