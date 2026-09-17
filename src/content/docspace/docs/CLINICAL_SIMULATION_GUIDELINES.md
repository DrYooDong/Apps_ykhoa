# 🎓 DocSpace MedLens — Clinical Simulation & Medical Education Guidelines

> **Cẩm Nang Quy Chuẩn Thiết Kế Ca Giả Lập Lâm Sàng & Đào Tạo OSCE Thích Ứng**
> *Quy định chuẩn hóa về Chế độ Thử thách Ẩn Đáp án, Ma trận Tham số hóa Đa nhánh (Parametric Causal Branching), Thuật toán Sinh Ngẫu nhiên Đa dạng Câu hỏi OSCE, Kho Hạt Ngọc Lâm Sàng (Clinical Pearls) và Mẫu Bệnh Án Điện Tử (EMR Export).*

---

## 🧭 1. Quy Chuẩn Kịch Bản Mở Khóa Tuần Tự (Progressive Revelation)

Để rèn luyện tư duy biện luận lâm sàng chân thực, người học phải đi qua **4 chặng mở khóa dữ kiện**:

```text
Chặng 1: KHỞI ĐẦU (Chỉ hiển thị Dữ kiện Ban đầu)
├── Hành chính, Tuổi, Giới, Cơ địa
├── Lý do vào viện & Tiền sử bệnh nền
├── Diễn tiến bệnh sử tóm tắt theo mốc thời gian
└── Sinh hiệu & Khám cơ quan tổng quát
       │
       ▼ [Người học chọn danh mục Cận Lâm Sàng cần làm]
Chặng 2: MỞ KHÓA KẾT QUẢ XÉT NGHIỆM
├── Công thức máu, Sinh hóa, Đông máu
├── Điện tâm đồ (ECG), X-quang ngực, Siêu âm
└── Kết quả chuyên sâu (Khí máu động mạch, Troponin, ProBNP...)
       │
       ▼ [Người học nhập Chẩn đoán sơ bộ & Chẩn đoán phân biệt]
Chặng 3: RA Y LỆNH ĐIỀU TRỊ & PHÂN TẦNG
├── Xử trí cấp cứu ban đầu (Oxy, Dịch truyền, Tư thế)
├── Thuốc đặc hiệu (Kháng sinh, Thuốc vận mạch, Chống đông...)
└── Kế hoạch chuyển tuyến hoặc theo dõi sát
       │
       ▼ [Người học bấm "Hoàn tất ca"]
Chặng 4: MỞ TOÀN BỘ ĐÁP ÁN EBM & ĐÁNH GIÁ NĂNG LỰC
├── So sánh chẩn đoán của người học vs Chuyên gia
├── Bảng điểm OSCE chi tiết theo barem nhánh rẽ tương ứng
├── Phân tích các Bẫy lâm sàng (Pitfalls) đã tránh được hoặc mắc phải
└── 3-5 Hạt ngọc lâm sàng (Clinical Pearls) cốt tử
```

---

## 📊 2. Ma Trận Bảng Kiểm Chấm Điểm OSCE 100 Điểm

| Tiêu chí Đánh giá | Trọng số | Chỉ báo Năng lực Cụ thể |
|---|---|---|
| **1. Khai thác Triệu chứng & Khám bệnh** | **25 điểm** | - Nhận diện đúng triệu chứng chính và thời điểm khởi phát (10đ)<br>- Phát hiện đầy đủ cờ đỏ cấp cứu và sinh hiệu báo động (10đ)<br>- Khai thác đúng yếu tố dịch tễ hoặc tiền sử liên quan (5đ) |
| **2. Chỉ định Cận Lâm Sàng Hợp lý** | **25 điểm** | - Chỉ định đúng các xét nghiệm cơ bản bắt buộc (10đ)<br>- Chỉ định đúng các xét nghiệm chuyên sâu quyết định chẩn đoán (10đ)<br>- *Điểm trừ*: Phạt trừ 5đ cho mỗi xét nghiệm đắt tiền không cần thiết (tránh lãng phí) |
| **3. Biện luận & Xác lập Chẩn Đoán** | **25 điểm** | - Chẩn đoán sơ bộ đúng bệnh và thể bệnh/giai đoạn (15đ)<br>- Đưa ra được ít nhất 02 chẩn đoán phân biệt hợp lý (10đ) |
| **4. Xử Trí Điều Trị & An Toàn Người Bệnh** | **25 điểm** | - Xử trí cấp cứu bước đầu chính xác (Tư thế, Oxy, Đường truyền) (10đ)<br>- Kê đơn thuốc đúng chỉ định, đúng liều lượng, đúng đường dùng (10đ)<br>- *Tiêu chuẩn vàng*: Không phạm chống chỉ định tuyệt đối (5đ) *(Vi phạm chống chỉ định ➔ Điểm phần này = 0)* |

---

## 🧬 3. Blueprint Thiết Kế Ca Bệnh Tham Số Hóa (Parametric Blueprint)

Mỗi ca bệnh gốc không được viết dưới dạng tĩnh bất di bất dịch, mà được cấu trúc hóa theo **6 Module Biến Số**:

```json
{
  "caseBlueprintId": "BP-DENGUE-SHOCK",
  "baseTitle": "Sốt xuất huyết Dengue thể cảnh báo / Sốc",
  "parametricModules": {
    "module1_demographics": {
      "variants": [
        { "id": "young_adult", "age": 22, "gender": "Nam", "weight": 60 },
        { "id": "elderly_female", "age": 72, "gender": "Nữ", "weight": 52 },
        { "id": "child", "age": 8, "gender": "Nam", "weight": 28 }
      ]
    },
    "module2_comorbidities": {
      "variants": [
        { "id": "none", "labels": ["Khỏe mạnh, không tiền sử bệnh"] },
        { "id": "heart_failure", "labels": ["Suy tim NYHA II, EF 36%"], "risk": "fluid_overload" },
        { "id": "ckd_stage3", "labels": ["Bệnh thận mạn giai đoạn 3b, eGFR 38 mL/min"], "risk": "hyperkalemia_acidosis" },
        { "id": "peptic_ulcer", "labels": ["Tiền sử loét dạ dày tá tràng xuất huyết"], "risk": "occult_bleeding" }
      ]
    },
    "module3_timeline_phase": {
      "variants": [
        { "id": "day4_early_critical", "day": 4, "feverTrend": "Bắt đầu giảm sốt, mệt tăng" },
        { "id": "day5_peak_plasma_leak", "day": 5, "feverTrend": "Hết sốt hoàn toàn, tay chân lạnh" },
        { "id": "day7_convalescent", "day": 7, "feverTrend": "Tỉnh táo, bắt đầu thèm ăn, mạch chậm" }
      ]
    },
    "module4_dynamic_vitals": {
      "variants": [
        { "id": "warning_signs", "pulse": 104, "bp": "100/75", "temp": 37.2, "status": "Dấu hiệu cảnh báo" },
        { "id": "compensated_shock", "pulse": 128, "bp": "90/75", "temp": 36.5, "status": "Sốc Dengue (HA kẹp)" },
        { "id": "decompensated_shock", "pulse": 140, "bp": "70/50", "temp": 36.0, "status": "Sốc Dengue nặng tụt huyết áp" }
      ]
    },
    "module5_lab_perturbation": {
      "variants": [
        { "id": "classic_hemoconcentration", "hct": 48, "plt": 32, "ast_alt": "180/145" },
        { "id": "severe_plasma_leak", "hct": 54, "plt": 18, "ast_alt": "420/380" },
        { "id": "occult_internal_bleeding", "hct": 26, "plt": 15, "ast_alt": "210/190", "bleedingFlag": true }
      ]
    },
    "module6_response_branch": {
      "variants": [
        { "id": "good_response", "bpAfter1h": "110/70", "urineOutput": "1.2 ml/kg/h" },
        { "id": "refractory_shock", "bpAfter1h": "85/70", "urineOutput": "0.2 ml/kg/h", "requiresColloid": true },
        { "id": "fluid_overload_sign", "crackleLung": true, "spo2Drop": 91, "overloadSign": true }
      ]
    }
  }
}
```

---

## 🔀 4. Ma Trận Dẫn Truyền Đa Nhánh (Causal Cascading Decision Matrix)

Hệ thống kết hợp các module tham số theo **Logic Dẫn Truyền** để sinh ra các kịch bản OSCE độc nhất:

| Tham số Đầu vào (Input Variables) | Nhánh Dẫn Truyền (Causal Cascading Path) | Câu Hỏi OSCE Thích Ứng | Đáp Án Đúng (Correct Answer) | Phương Án Nhiễu Thích Ứng (Dynamic Distractors) |
|---|---|---|---|---|
| **Nhánh 1: Bệnh nhân Trẻ, Không Bệnh Nền**<br>(Nam 22t, N5, Sốc Dengue: HA 90/75, Hct 48%) | ➔ Thoát huyết tương thuần túy<br>➔ Tim bóp tốt, dung nạp dịch cao<br>➔ Mục tiêu: Bù dịch tinh thể nhanh | *Lựa chọn dịch truyền và tốc độ ban đầu phù hợp nhất?* | **Ringer Lactate hoặc NaCl 0.9% truyền nhanh 15 ml/kg/h trong 1 giờ đầu, sau đó đánh giá lại.** | A. Truyền Dextran 40 ngay lập tức 15 ml/kg/h.<br>B. Truyền chậm 5 ml/kg/h vì sợ phù phổi.<br>C. Tiêm bolus Furosemide 20mg giải áp.<br>D. Truyền khối tiểu cầu cấp cứu vì PLT 32 G/L. |
| **Nhánh 2: Người Cao Tuổi có Tiền Sử Suy Tim**<br>(Nữ 72t, EF 36%, N5, Sốc Dengue: HA 85/65, Hct 46%) | ➔ Giảm thể tích nội mạch KÈM giảm dự trữ tim<br>➔ Nguy cơ phù phổi cấp cực cao nếu bù dịch 15 ml/kg/h<br>➔ Cần bù dịch dè dặt + theo dõi siêu âm tim/CVP | *Chiến lược xử trí hồi sức dịch an toàn nhất cho bệnh nhân này?* | **Bù Ringer Lactate dè dặt 7 - 10 ml/kg/h, đặt CVP hoặc siêu âm tại giường đánh giá VCI, chuẩn bị sẵn Dextran/Albumin nếu kém đáp ứng.** | A. Dồn nhanh Ringer Lactate 20 ml/kg/h như người trẻ.<br>B. Không bù dịch, dùng ngay Noradrenaline liều cao.<br>C. Hạn chế dịch tuyệt đối <2 ml/kg/h và dùng Furosemide.<br>D. Chuyển viện ngay không xử trí ban đầu. |
| **Nhánh 3: Biến Chứng Xuất Huyết Nội Tạng Ẩn**<br>(Nam 30t, Sốc HA 80/60, nhưng Hct tụt sâu từ 46% ➔ 26%, bụng chướng) | ➔ Sốc hỗn hợp: Thoát dịch + Mất máu cấp<br>➔ Dồn dịch tinh thể sẽ làm loãng máu gây tử vong<br>➔ Cần truyền máu toàn phần / Hồng cầu lắng khẩn cấp | *Xử trí ưu tiên hàng đầu tại thời điểm này là gì?* | **Lấy máu thử phản ứng chéo, chỉ định truyền Khối hồng cầu khẩn cấp (5-10 ml/kg) và phối hợp nội soi/siêu âm cầm máu.** | A. Tiếp tục tăng tốc độ Ringer Lactate lên 20 ml/kg/h.<br>B. Truyền dung dịch cao phân tử HES 200 15 ml/kg/h.<br>C. Cho uống thuốc cầm máu cầm chừng.<br>D. Chỉ định chụp CT bụng cản quang ngay lập tức. |

---

## 🚫 5. Bộ Kiểm Soát Giới Hạn Y Khoa (Clinical Sanity Constraint Gate)

Để đảm bảo các biến thể ngẫu nhiên **100% hợp lý về mặt sinh lý bệnh học**, bộ sinh ngẫu nhiên phải tuân thủ 5 quy tắc chặn:

```text
[BỘ CHẶN 1 - GIỚI TÍNH & THAI KỲ]
IF Gender == 'Nam' ➔ CẤM sinh: Có thai, Tiền sản giật, Thai ngoài tử cung.

[BỘ CHẶN 2 - HUYẾT ĐỘNG SỐC]
IF ClinicalState == 'Sốc giảm thể tích' ➔ CẤM sinh: Huyết áp tâm thu > 110 mmHg.

[BỘ CHẶN 3 - THỜI ĐIỂM & ĐỘNG HỌC XÉT NGHIỆM]
IF DiseaseDay <= 2 ➔ CẤM sinh: Kháng thể Dengue IgM (+), Men tim Troponin về bình thường.

[BỘ CHẶN 4 - CHỐNG CHỈ ĐỊNH THUỐC TUYỆT ĐỐI]
IF SuspectedDisease == 'Dengue' ➔ Phương án đúng KHÔNG BAO GIỜ chứa Aspirin / Ibuprofen.
IF History == 'PepticUlcer' ➔ CẤM kê đơn NSAIDs đường uống liều cao.
IF Patient.eGFR < 30 ➔ CẤM kê Metformin, NSAIDs kéo dài hoặc thuốc cản quang không bù dịch.

[BỘ CHẶN 5 - TƯƠNG TÁC THUỐC NGUY HIỂM]
IF CurrentMed == 'Sildenafil' ➔ CẤM kê Nitroglycerin (Nguy cơ tụt HA tử vong).
```

---

## 🧠 6. Nhận Diện & Hóa Giải 5 Thiên Kiến Nhận Thức (Cognitive Biases)

Mỗi kịch bản ca bệnh phải cảnh báo rõ các bẫy tâm lý thường gặp trong môi trường cấp cứu:
1. **Anchoring Bias (Thiên kiến mỏ neo)**: Quá chú ý vào một triệu chứng nổi trội ban đầu mà quên kiểm tra sinh hiệu mạch nhanh, HA kẹp.
2. **Premature Closure (Chốt chẩn đoán quá sớm)**: Vừa thấy sốt cao đau đầu là kết luận ngay viêm họng, bỏ sót viêm màng não.
3. **Availability Bias (Thiên kiến sẵn có)**: Đang mùa dịch sốt xuất huyết thì mọi ca sốt đều gán là sốt xuất huyết, bỏ sót nhiễm trùng huyết.
4. **Framing Effect (Hiệu ứng đóng khung)**: Tin theo ngay chẩn đoán tuyến dưới chuyển lên mà không tự khám lại.
5. **Confirmation Bias (Thiên kiến xác nhận)**: Chỉ chú ý kết quả xét nghiệm ủng hộ giả thuyết ban đầu, phớt lờ các chỉ số bất thường khác.

---

## 💡 7. Tiêu Chuẩn Biên Soạn "Hạt Ngọc Lâm Sàng" (Clinical Pearls)

Một Clinical Pearl đạt chuẩn phải thỏa mãn cấu trúc **3 câu**:
1. **Bối cảnh (Trigger)**: Gặp tình huống nào?
2. **Hành động (Action)**: Phải làm gì ngay hoặc tuyệt đối không được làm gì?
3. **Cơ chế / Hệ quả (Rationale)**: Vì sao?

---

## 🖨️ 8. Quy Chuẩn Xuất Bệnh Án Điện Tử (EMR Format 1-Click)

```text
=== TÓM TẮT BỆNH ÁN LÂM SÀNG (DOCSPACE MEDLENS) ===
1. HÀNH CHÍNH: Bệnh nhân [Nam/Nữ], [Tuổi] tuổi.
2. LÝ DO VÀO VIỆN: [Lý do ngắn gọn].
3. BỆNH SỬ: Khởi bệnh ngày thứ [X] với các triệu chứng chính...
4. KHÁM HIỆN TẠI:
   - Sinh hiệu: Mạch: [ ] l/p, HA: [ ]/[ ] mmHg, NT: [ ] l/p, SpO2: [ ]%, Nhiệt: [ ]°C.
   - Khám cơ quan: [Các bất thường chính].
5. CẬN LÂM SÀNG ĐÃ CÓ:
   - CTM: WBC: [ ] G/L, Hct: [ ] %, PLT: [ ] G/L.
   - Sinh hóa / Khác: [Các chỉ số bất thường].
6. CHẨN ĐOÁN XÁC ĐỊNH: [Tên bệnh] - Giai đoạn/Phân độ: [ ] (ICD-10: [ ]).
   - Chẩn đoán phân biệt: [ ].
7. HƯỚNG XỬ TRÍ:
   - Cấp cứu / Chăm sóc: [ ].
   - Y lệnh thuốc: [Hoạt chất, liều lượng, đường dùng].
   - Kế hoạch theo dõi: [Khoảng cách theo dõi sinh hiệu, XN cần làm lại].
===================================================
```
