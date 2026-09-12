Dưới đây là **TOÀN BỘ CODE DỮ LIỆU CẤU TRÚC 4 KHỐI** chuẩn mực của hệ sinh thái CliniPortal DocSpace dành cho mặt bệnh **Sốt xuất huyết Dengue**, được biên soạn và đồng bộ hóa chặt chẽ theo **Quyết định 2760/QĐ-BYT ngày 04/07/2023 của Bộ Y tế Việt Nam** và **WHO Dengue Guidelines 2024–2025**.

---

### ==============================================================================

### KHỐI 1: ENRICHED CDSS JSON

**Lưu vào:** `src/content/docspace/data/enriched/sot_xuat_huyet_dengue.json`

### ==============================================================================

```json
{
  "icdCode": "A97",
  "icdPrefixes": ["A97.0", "A97.1", "A97.2", "A97.9"],
  "diseaseName": "Sốt xuất huyết Dengue (Dengue Hemorrhagic Fever / Dengue Shock Syndrome - DHF/DSS)",
  "specialty": "Truyền nhiễm",
  "severity": "emergency",
  "summary": "Sốt xuất huyết Dengue là bệnh truyền nhiễm cấp tính do vi rút Dengue (DEN-1, DEN-2, DEN-3, DEN-4) gây ra qua trung gian muỗi Aedes aegypti. Bệnh diễn tiến qua 3 giai đoạn lâm sàng động: Giai đoạn sốt (ngày 1-3), Giai đoạn nguy hiểm (ngày 3-7) đặc trưng bởi tình trạng tăng tính thấm thành mạch gây thoát huyết tương, cô đặc máu, sốc giảm thể tích, xuất huyết nặng và suy đa tạng, và Giai đoạn hồi phục (ngày 7-10). Việc nhận diện sớm các dấu hiệu cảnh báo và truyền dịch hồi sức nấc bậc thang kịp thời là chìa khóa sống còn giúp giảm tỷ lệ tử vong xuống dưới 0.8%.",
  "goldStandard": "Xét nghiệm căn nguyên vi sinh: Kháng nguyên NS1 (ELISA/Test nhanh trong 5 ngày đầu), RT-PCR phát hiện RNA vi rút Dengue, hoặc biến đổi động học kháng thể (IgM/IgG seroconversion hoặc tăng >= 4 lần hiệu giá IgG giữa 2 mẫu máu cấp và hồi phục).",
  "criteriaRule": {
    "mandatoryIds": ["tc_sot_cao_dot_ngot"],
    "minMajorRequired": 2,
    "minMinorRequired": 1,
    "ruleDescription": "Phải có Sốt cao đột ngột liên tục từ 2-7 ngày kèm yếu tố dịch tễ VÀ ít nhất 2 tiêu chuẩn lâm sàng chính (Hội chứng nhiễm siêu vi / Xuất huyết da niêm / Dấu hiệu cảnh báo) VÀ ít nhất 1 tiêu chuẩn Cận lâm sàng (Bạch cầu giảm, Tiểu cầu giảm hoặc Hct tăng)."
  },
  "criteria": [
    {
      "id": "tc_sot_cao_dot_ngot",
      "type": "mandatory",
      "label": "Sốt cao đột ngột, liên tục 2-7 ngày kèm yếu tố dịch tễ",
      "description": "Sốt cao từ 38.5°C đến 40°C, khó hạ sốt bằng thuốc thông thường; sống hoặc đi/đến vùng lưu hành dịch SXH Dengue trong vòng 14 ngày.",
      "sourceGuideline": "Quyết định 2760/QĐ-BYT (2023)"
    },
    {
      "id": "tc_hoi_chung_sot_cap",
      "type": "major",
      "label": "Hội chứng lâm sàng nhiễm siêu vi kinh điển",
      "description": "Nhức đầu nặng, đau sau hố mắt, đau cơ, đau khớp, chán ăn, buồn nôn, da xung huyết hoặc phát ban rải rác.",
      "sourceGuideline": "Quyết định 2760/QĐ-BYT (2023)"
    },
    {
      "id": "tc_xuat_huyet_day_that",
      "type": "major",
      "label": "Biểu hiện xuất huyết da niêm / Nghiệm pháp dây thắt (Lacet) (+)",
      "description": "Chấm xuất huyết dải rác dưới da, bầm tím nơi tiêm chích, chảy máu chân răng, chảy máu mũi hoặc Nghiệm pháp dây thắt (+): xuất hiện >= 20 chấm xuất huyết / 6.25 cm².",
      "sourceGuideline": "Quyết định 2760/QĐ-BYT (2023)"
    },
    {
      "id": "tc_dau_hieu_canh_bao",
      "type": "major",
      "label": "Dấu hiệu cảnh báo nguy hiểm (Warning Signs)",
      "description": "Vật vã, lừ đừ, li bì; Đau bụng nhiều và liên tục vùng gan; Nôn ói nhiều (>=3 lần/1h hoặc >=4 lần/6h); Xuất huyết niêm mạc tiến triển; Gan to > 2cm dưới bờ sườn; Tiểu ít.",
      "sourceGuideline": "Quyết định 2760/QĐ-BYT (2023)"
    },
    {
      "id": "tc_cls_co_dac_mau",
      "type": "lab",
      "label": "Cô đặc máu (Hct tăng > 20%) & Giảm tiểu cầu (< 100 G/L)",
      "description": "Hematocrit tăng > 20% so với giá trị ban đầu hoặc trung bình dân số (Nam >43%, Nữ >38%); Số lượng tiểu cầu giảm nhanh dưới 100.000/mm³ (100 G/L); Bạch cầu máu giảm.",
      "labThreshold": "Hct tăng > 20%, Tiểu cầu < 100 G/L, WBC < 4.0 G/L",
      "sourceGuideline": "Quyết định 2760/QĐ-BYT (2023)"
    },
    {
      "id": "tc_cls_vi_sinh_ns1_pcr",
      "type": "lab",
      "label": "Xét nghiệm căn nguyên vi rút Dengue dương tính",
      "description": "Kháng nguyên NS1 Ag dương tính (ngày 1-5), RT-PCR RNA Dengue (+), hoặc xét nghiệm huyết thanh ELISA IgM (+)/tăng hiệu giá IgG.",
      "labThreshold": "NS1 Ag (+), RT-PCR (+), IgM/IgG ELISA (+)",
      "sourceGuideline": "Quyết định 2760/QĐ-BYT (2023) & WHO 2025"
    },
    {
      "id": "tc_ha_sieu_am_thoat_dich",
      "type": "imaging",
      "label": "Chẩn đoán hình ảnh: Dấu hiệu thoát huyết tương khoảng kẽ",
      "description": "Siêu âm bụng/X-quang ngực phát hiện tràn dịch màng phổi, tràn dịch màng bụng (báng bụng), phù nề dày thành túi mật > 3mm.",
      "labThreshold": "Tràn dịch màng phổi/màng bụng, Dày thành túi mật > 3mm",
      "sourceGuideline": "Quyết định 2760/QĐ-BYT (2023)"
    }
  ],
  "severityGrading": [
    {
      "grade": "Sốt xuất huyết Dengue (Thể nhẹ / Không biến chứng)",
      "severity": "mild",
      "criteria": "Sốt <= 7 ngày kèm 2 triệu chứng lâm sàng nhẹ, không có dấu hiệu cảnh báo, Hct bình thường hoặc tăng nhẹ, tiểu cầu bình thường hoặc giảm nhẹ (> 100 G/L).",
      "triage": "Điều trị ngoại trú / Trạm Y tế / Phòng khám",
      "primaryAction": "Bù dịch sớm đường uống bằng Oresol, nước trái cây; Hạ sốt Paracetamol 10-15 mg/kg; Tái khám và làm xét nghiệm CTM hàng ngày.",
      "targetVitals": "Sinh hiệu ổn định, tiểu nhiều > 0.5 mL/kg/h, không xuất hiện dấu hiệu cảnh báo."
    },
    {
      "grade": "Sốt xuất huyết Dengue có Dấu Hiệu Cảnh Báo",
      "severity": "moderate",
      "criteria": "Có ít nhất 1 dấu hiệu cảnh báo: lừ đừ/vật vã, đau bụng gan, nôn ói nhiều, nôn/tiêu máu, gan to > 2cm, Hct tăng cao kèm tiểu cầu tụt nhanh.",
      "triage": "Nhập viện nội trú 100% / Bệnh viện Huyện / Bệnh viện Tỉnh",
      "primaryAction": "Truyền dịch tĩnh mạch Ringer Lactate/Acetate hoặc NaCl 0.9% tốc độ 6-7 mL/kg/h x 1-3h -> 5 mL/kg/h x 2-4h -> 3 mL/kg/h x 2-4h; Theo dõi Hct & sinh hiệu mỗi 2-4h.",
      "targetVitals": "Mạch chậm lại, HA ổn định, hiệu áp > 20 mmHg, Hct giảm, nước tiểu >= 0.5-1 mL/kg/h."
    },
    {
      "grade": "Sốt xuất huyết Dengue Nặng (Sốc / Xuất huyết nặng / Suy tạng)",
      "severity": "critical",
      "criteria": "Thoát huyết tương nặng dẫn đến Sốc SXH (mạch nhanh nhỏ, HA kẹp <= 20 mmHg, tụt HA, HA=0); Xuất huyết tạng nặng; Suy tạng nặng (AST/ALT >= 1000 U/L, rối loạn tri giác, viêm cơ tim, suy thận).",
      "triage": "Khoa Hồi sức Cấp cứu (ICU) / Bệnh viện Tỉnh / Bệnh viện Chuyên khoa",
      "primaryAction": "Hồi sức sốc khẩn cấp: Thở oxy, truyền Ringer Lactate/NaCl 0.9% 15-20 mL/kg/h x 1h (hoặc bơm trực tiếp 20 mL/kg/15p nếu HA=0); Chuyển Cao phân tử (Dextran/HES 200) khi không đáp ứng điện giải; Truyền hồng cầu lắng/chế phẩm máu khi xuất huyết nặng; Đo CVP & HA động mạch xâm lấn.",
      "targetVitals": "MAP >= 65 mmHg, HATT >= 90 mmHg, SpO2 >= 95%, ScvO2 >= 70%, Lactate < 2 mmol/L, Nước tiểu >= 0.5 mL/kg/h."
    }
  ],
  "protocol": {
    "title": "Phác đồ chẩn đoán và điều trị Sốt xuất huyết Dengue theo Quyết định 2760/QĐ-BYT",
    "guideline": "Quyết định số 2760/QĐ-BYT ngày 04/07/2023 của Bộ trưởng Bộ Y tế Việt Nam",
    "targetGoals": [
      "Mục tiêu huyết động: Duy trì Mạch bình thường theo tuổi, HATT >= 90 mmHg, Hiệu áp > 20 mmHg, MAP >= 65 mmHg.",
      "Mục tiêu tưới máu tạng: Nước tiểu >= 0.5 - 1.0 mL/kg/h, SpO2 >= 95%, Lactate máu < 2.0 mmol/L, ScvO2 >= 70%.",
      "Mục tiêu an toàn: Tốc độ bù dịch vừa đủ để duy trì huyết động, kiểm soát Hct 38-42%, ngưng dịch truyền tĩnh mạch hoàn toàn sau khi ra sốc 24-48 giờ để tránh quá tải dịch/phù phổi."
    ],
    "initialManagement": [
      "Phân tầng tiếp nhận: Thể nhẹ điều trị ngoại trú; Thể cảnh báo nhập viện khoa Nhiễm/Nội; Thể nặng nhập ngay khoa Hồi sức Cấp cứu (ICU).",
      "Can thiệp ban đầu: Bù dịch sớm bằng đường uống (Oresol, nước dừa, nước cam, cháo muối). Hạ sốt Paracetamol đơn chất 10-15 mg/kg/lần (tối đa 60 mg/kg/24h). KHÔNG dùng Aspirin, Ibuprofen, Analgin.",
      "Chỉ định truyền dịch tĩnh mạch ngay khi bệnh nhân nôn ói nhiều, không uống được, Hct tăng cao, có dấu hiệu mất nước hoặc xuất hiện dấu hiệu cảnh báo/sốc."
    ],
    "firstLineDrugs": [
      {
        "drugName": "Paracetamol (Acetaminophen)",
        "class": "Thuốc hạ sốt, giảm đau đơn chất",
        "route": "PO / PR / IV",
        "dosage": "10 - 15 mg/kg/lần (Trẻ em & Người lớn)",
        "frequency": "Cách mỗi 4 - 6 giờ khi sốt >= 38.5°C (tối đa 4 lần/ngày)",
        "instructions": "Uống hoặc đặt hậu môn. Tổng liều tuyệt đối không quá 60 mg/kg/24 giờ ở trẻ em và 4g/24 giờ ở người lớn.",
        "isFirstLine": true,
        "notes": "Tránh dùng quá liều gây độc cho gan. Hạn chế dùng dạng IV nếu bệnh nhân còn uống được.",
        "contraindications": [
          "Suy gan cấp tính nặng",
          "Mẫn cảm với Paracetamol"
        ]
      },
      {
        "drugName": "Ringer Lactate / Ringer Acetate / NaCl 0.9%",
        "class": "Dung dịch điện giải đẳng trương",
        "route": "IV",
        "dosage": "Cảnh báo: 6-7 mL/kg/h x 1-3h -> 5 mL/kg/h -> 3 mL/kg/h; Sốc: 15-20 mL/kg/h x 1h",
        "frequency": "Theo dõi và điều chỉnh tốc độ dịch mỗi 1 - 2 giờ dựa trên Hct và sinh hiệu",
        "instructions": "Ưu tiên dùng Ringer Acetate khi bệnh nhân có tổn thương gan nặng hoặc men gan AST/ALT >= 1000 U/L.",
        "isFirstLine": true,
        "notes": "Sử dụng cân nặng hiệu chỉnh đối với bệnh nhân dư cân hoặc béo phì.",
        "contraindications": [
          "Phù phổi cấp / Suy tim quá tải dịch tiến triển"
        ]
      }
    ],
    "secondLineDrugs": [
      {
        "drugName": "Dextran 40 / Dextran 70 / Hydroxyethyl Starch (HES 6% 200/0.5)",
        "class": "Dung dịch cao phân tử (Colloids)",
        "route": "IV",
        "dosage": "10 - 15 - 20 mL/kg/h trong 1 giờ",
        "frequency": "Điều chỉnh giảm dần liều (10 -> 7.5 -> 5 mL/kg/h) theo phản ứng huyết động",
        "instructions": "Chỉ định khi sốc SXH không đáp ứng dịch điện giải giờ đầu, tái sốc, hoặc Hct còn tăng cao >= 40% kèm huyết động thất bại.",
        "isFirstLine": false,
        "notes": "Thận trọng nguy cơ rối loạn đông máu, tổn thương gan/thận khi tổng liều CPT > 60 mL/kg.",
        "contraindications": [
          "Suy thận cấp vô niệu không có lọc máu hỗ trợ",
          "Xuất huyết nặng chưa được bù máu"
        ]
      },
      {
        "drugName": "Albumin 5% / 10%",
        "class": "Dung dịch keo tự nhiên",
        "route": "IV",
        "dosage": "0.5 - 1.0 g/kg (5 - 20 mL/kg) truyền tĩnh mạch trong 4 - 6 giờ",
        "frequency": "Nhắc lại sau 4-6 giờ dựa trên xét nghiệm Albumin máu lại",
        "instructions": "Chỉ định khi Albumin máu <= 2.5 g/dL KÈM sốc không ổn định sau bù dịch 40-60 mL/kg, tái sốc >= 2 lần, hoặc sốc kéo dài.",
        "isFirstLine": false,
        "notes": "Giúp duy trì áp lực keo huyết tương, giảm liều cao phân tử tổng cộng.",
        "contraindications": [
          "Dư dịch / Quá tải thể tích tuần hoàn nặng"
        ]
      },
      {
        "drugName": "Noradrenaline / Dobutamine / Dopamine",
        "class": "Thuốc vận mạch và tăng co bóp cơ tim",
        "route": "IV",
        "dosage": "Noradrenaline: 0.05-1.0 mcg/kg/phút; Dobutamine: 3-10 mcg/kg/phút; Dopamine: 5-10 mcg/kg/phút",
        "frequency": "Truyền tĩnh mạch liên tục qua bơm tiêm điện",
        "instructions": "Chỉ định khi sốc SXH không đáp ứng bù dịch đầy đủ, CVP > 10-15 cmH2O hoặc có suy chức năng co bóp cơ tim.",
        "isFirstLine": false,
        "notes": "Bắt buộc đo HA động mạch xâm lấn và CVP để chỉnh liều vận mạch.",
        "contraindications": [
          "Giảm thể tích tuần hoàn chưa được bù đủ dịch"
        ]
      }
    ],
    "supportiveCare": [
      "Nghỉ ngơi tuyệt đối tại giường, phòng thoáng mát, tránh chấn thương và tiêm bắp.",
      "Dinh dưỡng: Cho ăn lỏng, mềm, dễ tiêu, nhiều bữa; Tránh thức ăn/nước uống có màu đỏ, nâu, đen (để không nhầm với xuất huyết tiêu hóa).",
      "Theo dõi sát Mạch, Huyết áp, Hiệu áp, Nhịp thở, Nước tiểu, Hct tại giường mỗi 15-30 phút (khi sốc), mỗi 1-2h (khi ra sốc) và mỗi 4-6h (khi cảnh báo)."
    ]
  },
  "complications": [
    {
      "name": "Sốc thoát huyết tương (Dengue Shock Syndrome - DSS)",
      "timeframe": "acute_24h",
      "warningSigns": "Mạch nhanh nhỏ, HA kẹp <= 20 mmHg, tụt HA, chi lạnh ẩm, CRT > 3 giây, lừ đừ, bứt rứt, Hct tăng cao.",
      "preventiveAction": "Thở oxy; Xả nhanh Ringer Lactate 15-20 mL/kg/h x 1h; Chuyển Dung dịch cao phân tử nếu thất bại; Đo CVP và HA động mạch xâm lấn.",
      "onCallAlertText": "🚨 SỐC SXH: Thở oxy gọng kính 3L/p, xả Ringer Lactate 20 mL/kg/h khẩn! Báo bác sĩ trực lập tức!"
    },
    {
      "name": "Xuất huyết nặng (Xuất huyết tiêu hóa / Xuất huyết nội tạng)",
      "timeframe": "acute_24h",
      "warningSigns": "Ói ra máu tươi/đen, tiêu phân đen/máu, Hct tụt nhanh > 20% dù huyết động chưa ổn định, da niêm nhợt.",
      "preventiveAction": "Tạm nhịn ăn uống; Truyền Hồng cầu lắng 5-10 mL/kg hoặc Máu toàn phần; Truyền Huyết tương tươi đông lạnh / Tiểu cầu / Kết tủa lạnh khi có rối loạn đông máu; Dùng PPI tĩnh mạch.",
      "onCallAlertText": "🩸 XUẤT HUYẾT NẶNG: Định nhóm máu & phản ứng chéo, đăng ký Hồng cầu lắng 10 mL/kg, Omeprazole 80mg IV bolus!"
    },
    {
      "name": "Tổn thương gan nặng / Suy gan cấp / Bệnh não gan",
      "timeframe": "subacute_7d",
      "warningSigns": "AST/ALT >= 1000 U/L, vàng da tiến triển, rối loạn tri giác, INR >= 1.5, nồng độ NH3 máu tăng.",
      "preventiveAction": "Chuyển dùng Ringer Acetate thay Ringer Lactate; Truyền tĩnh mạch N-Acetylcystein; Thụt tháo Lactulose; Xem xét Thay huyết tương (TPE) hoặc Lọc máu CVVHDF.",
      "onCallAlertText": "⚠️ SUY GAN CẤP: Đổi Ringer Acetate, pha N-Acetylcystein 150 mg/kg IV truyền 1h, hội chẩn Bác sĩ ICU!"
    },
    {
      "name": "Phù phổi cấp do quá tải dịch truyền",
      "timeframe": "subacute_7d",
      "warningSigns": "Khó thở, thở nhanh, ho khạc bọt hồng, phế trường đầy ran ẩm/nổ ở giai đoạn tái hấp thu (ngày 6-7).",
      "preventiveAction": "NGƯNG TRUYỀN DỊCH NGAY LẬP TỨC; Nằm đầu cao; Thở NCPAP hoặc thở máy; Dùng Furosemide 0.5-1 mg/kg IV; Truyền Dobutamine hỗ trợ tim.",
      "onCallAlertText": "🫁 PHÙ PHỔI CẤP/QUÁ TẢI: NGƯNG DỊCH TRUYỀN NGAY! Cho nằm đầu cao 45 độ, thở NCPAP, tiêm Furosemide 20mg IV!"
    }
  ],
  "monitoringLabs": [
    "Hematocrit (Hct) và Công thức máu (WBC, PLT) tại giường mỗi 1-2h trong sốc và mỗi 4-6h trong thể cảnh báo",
    "Khí máu động mạch, Lactate máu, Điện giải đồ (Na+, K+, Ca++ toàn phần và ion hóa) mỗi 4-6h trong hồi sức sốc",
    "Men gan (AST, ALT), Chức năng thận (Urea, Creatinine), Bilirubin, Đông máu toàn bộ (PT, aPTT, Fibrinogen, D-dimer)",
    "Siêu âm tim tại giường (đánh giá EF, IVC), Siêu âm bụng & màng phổi (đánh giá dịch thoát), X-quang ngực thẳng tại giường"
  ],
  "vaultPathways": [
    {
      "khoCode": "CD",
      "khoName": "Kho Tiêu Chuẩn CĐ",
      "articleTitle": "Tiêu chuẩn chẩn đoán & Phân độ Sốt xuất huyết Dengue (Bộ Y tế 2023)",
      "searchKeyword": "chẩn đoán sốt xuất huyết dengue"
    },
    {
      "khoCode": "PDDT",
      "khoName": "Kho Phác Đồ Điều Trị",
      "articleTitle": "Phác đồ hồi sức chống sốc & Bù dịch nấc bậc thang Sốt xuất huyết Dengue",
      "searchKeyword": "phác đồ truyền dịch sốt xuất huyết"
    },
    {
      "khoCode": "DTH",
      "khoName": "Kho Dịch Tễ & Nguy Cơ",
      "articleTitle": "Dịch tễ học, Vectơ muỗi Aedes & Yếu tố nguy cơ sốc Dengue",
      "searchKeyword": "dịch tễ sốt xuất huyết dengue"
    },
    {
      "khoCode": "BC",
      "khoName": "Kho Biến Chứng",
      "articleTitle": "Nhận diện & Xử trí biến chứng Sốc, Xuất huyết nặng, Suy gan, Phù phổi trong Dengue",
      "searchKeyword": "biến chứng sốt xuất huyết dengue"
    }
  ]
}
```

---

### ==============================================================================

### KHỐI 2: ĐỘNG CƠ SUY LUẬN & TRỌNG SỐ CDSS

**Lưu vào:** `src/content/knowledge-vault/data/clinical-rules-kb.json`

### ==============================================================================

#### 1. Đoạn code nạp vào mảng `"trieuChung"`

```json
[
  {
    "id": "tc_sot_cao_dot_ngot_duoi_7_ngay",
    "ten": "Sốt cao đột ngột liên tục <= 7 ngày",
    "nhom": "Toàn thân",
    "loai": ["cn", "tt"],
    "tuKhoa": ["sot cao", "sot dot ngot", "sot dengue", "sot lien tuc"],
    "map": {
      "fld": "vNhiet",
      "op": ">=",
      "val": 38.5
    }
  },
  {
    "id": "tc_xuat_huyet_da_niem_lacet_duong_tinh",
    "ten": "Xuất huyết da niêm / Dây thắt (Lacet) (+)",
    "nhom": "Da niêm",
    "loai": ["tt"],
    "tuKhoa": ["lacet (+)", "cham xuat huyet", "bam tim", "chay mau cam", "chay mau chan rang"],
    "map": null
  },
  {
    "id": "tc_dau_hieu_canh_bao_dau_bung_gan_non_oi",
    "ten": "Dấu hiệu cảnh báo: Đau bụng gan, Nôn ói nhiều, Lừ đừ",
    "nhom": "Tiêu hóa",
    "loai": ["cn", "tt"],
    "tuKhoa": ["dau bung gan", "non oi nhieu", "lu du", "li bi", "gan to"],
    "map": null
  },
  {
    "id": "tc_co_dac_mau_hct_tang_tren_20_phan_tram",
    "ten": "Cô đặc máu (Hematocrit tăng > 20%)",
    "nhom": "Cận lâm sàng",
    "loai": ["cls"],
    "tuKhoa": ["co dac mau", "hct tang", "hematocrit cao", "hct > 42%"],
    "map": {
      "fld": "lHct",
      "op": ">=",
      "val": 42
    }
  },
  {
    "id": "tc_giam_tieu_cau_duoi_100_g_l",
    "ten": "Tiểu cầu giảm nhanh (< 100 G/L)",
    "nhom": "Cận lâm sàng",
    "loai": ["cls"],
    "tuKhoa": ["tieu cau giam", "giam tieu cau", "plt < 100", "tieu cau tụt"],
    "map": {
      "fld": "lTC",
      "op": "<=",
      "val": 100
    }
  },
  {
    "id": "tc_xet_nghiem_ns1_hoac_pcr_duong_tinh",
    "ten": "Xét nghiệm NS1 Ag / RT-PCR Dengue (+)",
    "nhom": "Cận lâm sàng",
    "loai": ["cls"],
    "tuKhoa": ["ns1 (+)", "pcr dengue (+)", "igm dengue (+)", "test nhanh dengue (+)"],
    "map": null
  },
  {
    "id": "tc_soc_mach_nhanh_ha_kep_hoac_tut",
    "ten": "Sốc: Mạch nhanh nhỏ, HA kẹp <= 20 mmHg hoặc Tụt HA",
    "nhom": "Tim mạch",
    "loai": ["tt"],
    "tuKhoa": ["soc sxh", "mach nhanh nho", "ha kep", "tut ha", "ha = 0", "chi lanh"],
    "map": {
      "fld": "vHATT",
      "op": "<=",
      "val": 90
    }
  },
  {
    "id": "tc_ho_co_dom_hoac_viem_am_i_keo_dai",
    "ten": "Ho có đờm đục / Viêm nhiễm khuẩn hô hấp âm ỉ kéo dài",
    "nhom": "Hô hấp",
    "loai": ["cn"],
    "tuKhoa": ["ho dom duc", "viem phoi vi khuan", "sot keo dai tren 10 ngay"],
    "map": null
  }
]
```

#### 2. Đoạn code nạp vào mảng `"benh"`

```json
{
  "id": "sot_xuat_huyet_dengue",
  "ten": "Sốt xuất huyết Dengue",
  "icd": "A97",
  "nhom": "Truyền nhiễm",
  "baoDong": true,
  "ghiChuBaoDong": "CẢNH BÁO CỜ ĐỎ: Sốc thoát huyết tương, HA kẹp <= 20 mmHg, Cô đặc máu Hct tăng > 20%, Giảm tiểu cầu cấp, Xuất huyết tạng nặng!",
  "tomTat": "Bệnh truyền nhiễm cấp tính do vi rút Dengue truyền qua muỗi Aedes. Diễn tiến qua 3 giai đoạn: Sốt, Nguy hiểm (thoát huyết tương, sốc, xuất huyết, suy tạng) và Hồi phục.",
  "danSo": {
    "gioiTinh": "any",
    "tuoiMin": 0,
    "tuoiMax": 120
  },
  "dd": [
    ["tc_sot_cao_dot_ngot_duoi_7_ngay", 4.5, "dt"],
    ["tc_xuat_huyet_da_niem_lacet_duong_tinh", 4.0, "dt"],
    ["tc_co_dac_mau_hct_tang_tren_20_phan_tram", 4.5, "dt"],
    ["tc_xet_nghiem_ns1_hoac_pcr_duong_tinh", 5.0, "dt"],
    ["tc_soc_mach_nhanh_ha_kep_hoac_tut", 5.0, "dt"],
    ["tc_giam_tieu_cau_duoi_100_g_l", 3.5, "gy"],
    ["tc_dau_hieu_canh_bao_dau_bung_gan_non_oi", 3.5, "gy"],
    ["tc_ho_co_dom_hoac_viem_am_i_keo_dai", -5.0, "loaitru"]
  ],
  "phacDo": {
    "tuyen": [
      "Trạm Y tế / Ngoại trú: Bù dịch uống Oresol, Paracetamol 10-15 mg/kg hạ sốt, hẹn tái khám và xét nghiệm CTM hàng ngày cho đến khi hết sốt 2 ngày.",
      "Bệnh viện Huyện / Nội trú: Nhập viện khi có Dấu hiệu cảnh báo. Truyền dịch Ringer Lactate/NaCl 0.9% bậc thang 6-7 mL/kg/h -> 5 mL/kg/h -> 3 mL/kg/h. Theo dõi Hct/2-4h.",
      "Bệnh viện Tỉnh / ICU: Hồi sức Sốc SXH / Sốc nặng. Thở oxy, bù dịch điện giải nhanh 15-20 mL/kg/h; Chuyển Cao phân tử (Dextran/HES 200) khi thất bại điện giải; Bù hồng cầu lắng/chế phẩm máu khi xuất huyết nặng."
    ],
    "thuoc": [
      ["Paracetamol 500mg (Viên/Gói/Chai)", "10 - 15 mg/kg/lần PO/PR", "Hạ sốt khi T >= 38.5°C, cách 4-6h, tổng liều < 60 mg/kg/ngày"],
      ["Oresol (ORS 245 mOsm/L)", "Pha 1 gói/1 lít nước, uống theo nhu cầu", "Bù nước và điện giải đường uống sớm"],
      ["Ringer Lactate (Chai 500ml)", "6-7 mL/kg/h -> 5 mL/kg/h -> 3 mL/kg/h IV", "Dung dịch điện giải đầu tay bù dịch thể cảnh báo & chống sốc"],
      ["Ringer Acetate (Chai 500ml)", "6-7 mL/kg/h -> 5 mL/kg/h -> 3 mL/kg/h IV", "Ưu tiên dùng khi bệnh nhân có tổn thương gan/men gan AST/ALT >= 1000 U/L"],
      ["Natri Chlorua 0.9% (Chai 500ml)", "15-20 mL/kg/h IV trong sốc", "Dung dịch điện giải thay thế khi chống sốc"],
      ["Dextran 40 / 70 (Chai 500ml)", "10-15-20 mL/kg/h IV", "Cao phân tử chỉ định khi sốc không đáp ứng điện giải hoặc tái sốc"],
      ["Hydroxyethyl Starch (HES 6% 200/0.5)", "10-15-20 mL/kg/h IV", "Cao phân tử chống sốc; theo dõi độc tính thận khi tổng liều > 60 mL/kg"],
      ["Albumin 5% / 10% (Chai 100ml)", "0.5 - 1.0 g/kg IV trong 4-6h", "Chỉ định khi Albumin máu <= 2.5 g/dL kèm sốc kéo dài/tái sốc >= 2 lần"],
      ["Hồng cầu lắng (HCL)", "5 - 10 mL/kg IV trong 1-2h", "Chỉ định khi có xuất huyết nặng hoặc Hct tụt < 35% trong sốc"],
      ["Omeprazole 40mg (Lọ tiêm)", "1 mg/kg/ngày (tối đa 80mg) IV bolus", "Ức chế bơm Proton bảo vệ dạ dày khi xuất huyết tiêu hóa"],
      ["Noradrenaline 1mg/1ml", "0.05 - 1.0 mcg/kg/phút IV liên tục", "Vận mạch chỉ định khi sốc kém đáp ứng bù dịch và CVP > 10-15 cmH2O"]
    ],
    "theoDoi": [
      "Theo dõi sinh hiệu Mạch, HA, Hiệu áp, CRT, Nước tiểu tại giường mỗi 15-30 phút trong sốc và mỗi 2-4h trong thể cảnh báo.",
      "Kiểm tra Hematocrit (Hct) và Công thức máu mỗi 1-2h trong sốc và mỗi 4-6h trong thể cảnh báo.",
      "Đo CVP và Huyết áp động mạch xâm lấn khi sốc kéo dài hoặc tái sốc nhiều lần."
    ],
    "luuY": [
      "TUYỆT ĐỐI KHÔNG DÙNG Aspirin, Ibuprofen, Analgin hay NSAIDs vì làm tăng nguy cơ xuất huyết dạ dày và toan máu.",
      "Không tiêm bắp, không đặt sonde mũi ở bệnh nhân giảm tiểu cầu nặng.",
      "Bắt buộc ngưng truyền dịch tĩnh mạch sau khi ra sốc 24-48 giờ để tránh phù phổi cấp do quá tải dịch."
    ],
    "nguon": [
      "Quyết định 2760/QĐ-BYT ngày 04/07/2023 của Bộ Y tế Việt Nam"
    ]
  }
}
```

---

### ==============================================================================

### KHỐI 3: CA LÂM SÀNG MẪU BƯỚC 1

**Lưu vào:** `src/content/knowledge-vault/data/sample-clinical-cases.json`

### ==============================================================================

```json
{
  "ten": "SXH Dengue Có Dấu Hiệu Cảnh Báo Ngày 4 (Bệnh nhân Nam 24 tuổi)",
  "sel": [
    "tc_sot_cao_dot_ngot_duoi_7_ngay",
    "tc_xuat_huyet_da_niem_lacet_duong_tinh",
    "tc_dau_hieu_canh_bao_dau_bung_gan_non_oi",
    "tc_giam_tieu_cau_duoi_100_g_l",
    "tc_co_dac_mau_hct_tang_tren_20_phan_tram"
  ],
  "vitals": {
    "vNhiet": "38.8",
    "vMach": "108",
    "vHATT": "95",
    "vHATTr": "75",
    "vTho": "22",
    "vSpo2": "96"
  },
  "labs": {
    "lBC": "3.2",
    "lTC": "42",
    "lHct": "46",
    "lGlu": "5.4",
    "lTrop": "8"
  },
  "selected": [
    "tc_sot_cao_dot_ngot_duoi_7_ngay",
    "tc_xuat_huyet_da_niem_lacet_duong_tinh",
    "tc_dau_hieu_canh_bao_dau_bung_gan_non_oi",
    "tc_giam_tieu_cau_duoi_100_g_l",
    "tc_co_dac_mau_hct_tang_tren_20_phan_tram"
  ],
  "negated": [
    "tc_ho_co_dom_hoac_viem_am_i_keo_dai"
  ],
  "form": {
    "gioiTinh": "nam",
    "tuoi": "24",
    "ngheNghiep": "Kỹ sư phần mềm",
    "lyDo": "Sốt cao ngày thứ 4 kèm đau bụng liên tục vùng hạ sườn phải, nôn ói nhiều và chảy máu chân răng",
    "text": {
      "cn": "Bệnh nhân nam 24 tuổi, khởi phát sốt cao đột ngột 39.2°C từ 4 ngày trước, kèm nhức đầu nặng, đau sau hố mắt và đau mỏi cơ khớp toàn thân. Bệnh nhân tự uống Paracetamol nhưng sốt ít hạ. Từ sáng ngày bệnh thứ 4, sốt bắt đầu giảm nhẹ (38.5°C) nhưng bệnh nhân xuất hiện đau bụng liên tục vùng hạ sườn phải, nôn ói 4 lần/6 giờ, lừ đừ, mệt lả và rỉ máu chân răng tự nhiên.",
      "tt": "Bệnh nhân lừ đừ, tiếp xúc chậm, da xung huyết, cẳng chân hai bên có nốt xuất huyết dải rác. Nghiệm pháp dây thắt (Lacet) (+): 28 chấm/6.25 cm². Sinh hiệu: Mạch 108 lần/phút, rõ; Huyết áp 95/75 mmHg (Hiệu áp kẹp nhẹ = 20 mmHg); Nhiệt độ 38.8°C; Nhịp thở 22 lần/phút; SpO2 96% khí trời; Chi ấm, CRT 2 giây. Khám bụng: Bụng mềm, ấn đau nhiều vùng hạ sườn phải, gan to 2.5 cm dưới bờ sườn, Rung gan (+). Tim phổi chưa ghi nhận bất thường.",
      "tc": "Sống trong vùng đang có ổ dịch Sốt xuất huyết Dengue bùng phát (Quận Bình Thạnh, TP.HCM). Chưa ghi nhận tiền sử bệnh lý mạn tính gan, thận hay đái tháo đường.",
      "cls": "Công thức máu: Bạch cầu (WBC) 3.2 G/L, Hematocrit (Hct) 46% (tăng > 20% so với Hct nền ước tính 38%), Tiểu cầu (PLT) 42 G/L (giảm nặng). Test nhanh vi sinh: Dengue NS1 Ag (+). Men gan: AST 210 U/L, ALT 145 U/L. Siêu âm bụng tại giường: Dày thành túi mật 4mm, có ít dịch tự do khoang Morrison và màng mạc nối."
    }
  }
}
```

---

### ==============================================================================

### KHỐI 4: HỒ SƠ CA BỆNH KINH NGHIỆM SOAP MARKDOWN

**Nạp qua nút "Nạp ca từ NotebookLM" / Quick Ingest Modal**

### ==============================================================================

```markdown
---
title: "Ca SXH Dengue có dấu hiệu cảnh báo ngày thứ 4 ở bệnh nhân nam 24 tuổi"
caseId: "soap-sot_xuat_huyet_dengue-01"
specialty: "Truyền nhiễm"
experienceLevel: "essential"
difficultyRating: 3
authorDoctor: "Hội đồng Khoa học CliniPortal DocSpace"
icd10:
  - "A97.1"
tags:
  - "Truyền nhiễm"
  - "Sốt xuất huyết Dengue"
  - "SOAP"
demographicContext: "Bệnh nhân nam 24 tuổi, Kỹ sư phần mềm, tiền căn khỏe mạnh, sống tại ổ dịch Dengue"
historyPearls: "⚡ BÀI HỌC BỆNH SỬ: Thời điểm hạ sốt (ngày 3-7) chính là khởi đầu của Giai đoạn nguy hiểm; sốt giảm không đồng nghĩa với khỏi bệnh mà là tín hiệu cảnh báo thoát huyết tương vào sốc!"
objectivePitfalls: "⚠️ BẪY LÂM SÀNG: Đừng đợi đến khi Huyết áp tụt mới chẩn đoán Sốc; Hiệu áp kẹp <= 20 mmHg (ví dụ 95/75 mmHg) kèm Hct tăng cao và Tiểu cầu tụt chính là dấu hiệu Sốc sớm dọa suy tuần hoàn!"
diagnosticPearls: "🧠 ĐÚC KẾT BIỆN LUẬN: Sự kết hợp của Hct tăng > 20% (cô đặc máu) + Tiểu cầu < 50 G/L + Đau bụng vùng gan + NS1 Ag (+) là tiêu chuẩn vàng chẩn đoán SXH Dengue Có Dấu Hiệu Cảnh Báo cần chỉ định truyền dịch tĩnh mạch ngay."
takeawayLessons: "🎯 BÀI HỌC ĐIỀU TRỊ: Bù dịch tĩnh mạch Ringer Lactate bậc thang (6-7 mL/kg/h -> 5 mL/kg/h -> 3 mL/kg/h), tuyệt đối KHÔNG dùng Aspirin/NSAIDs và dừng dịch truyền sau 24-48h khi hết sốc để tránh quá tải dịch."
sourceReference: "Quyết định 2760/QĐ-BYT ngày 04/07/2023 của Bộ Y tế Việt Nam"
clinicalContext: "Khoa Bệnh Nhiệt đới / Phòng Cấp cứu Bệnh viện"
updated: "2026-09-12"
---

# 🩺 Ca Lâm Sàng: Sốt Xuất Huyết Dengue Có Dấu Hiệu Cảnh Báo (Ngày 4)

> **Bối cảnh**: Bệnh nhân nam 24 tuổi, nhập viện ngày thứ 4 của bệnh vì hết sốt cao nhưng xuất hiện lừ đừ, đau bụng liên tục vùng gan, nôn ói nhiều và chảy máu chân răng tự nhiên.

---

## 1. 📝 S — CHỦ QUAN / SUBJECTIVE

- **Lý do nhập viện**: Sốt ngày thứ 4, đau bụng hạ sườn phải, nôn ói nhiều và rỉ máu chân răng.
- **Bệnh sử chi tiết**:
  - **Ngày 1 – Ngày 3**: Bệnh nhân đột ngột sốt cao 39.2°C, kèm nhức đầu nặng, đau sau hố mắt, đau mỏi cơ khớp toàn thân. Tự uống Paracetamol 500mg (3-4 viên/ngày) sốt có giảm nhẹ rồi tăng lại.
  - **Ngày 4 (Sáng nhập viện)**: Thân nhiệt giảm còn 38.5°C nhưng bệnh nhân cảm thấy lừ đừ, mệt lả. Xuất hiện đau bụng liên tục vùng hạ sườn phải, nôn ói 4 lần trong vòng 6 giờ (ra dịch thức ăn và dịch mật, không ói máu), kèm rỉ máu chân răng khi đánh răng và xuất hiện nhiều chấm đỏ ở cẳng chân. Người nhà đưa đến Cấp cứu.
- **Tiền căn**:
  - Bản thân: Chưa ghi nhận bệnh lý mạn tính (gan, thận, đái tháo đường). Chưa từng mắc Sốt xuất huyết trước đây.
  - Dịch tễ: Sống tại Quận Bình Thạnh, TP.HCM — nơi đang ghi nhận nhiều ca SXH Dengue bùng phát.

---

## 2. 🔬 O — KHÁCH QUAN / OBJECTIVE

### Sinh hiệu:
- Huyết áp: **95/75 mmHg** (Hiệu áp kẹp nhẹ = 20 mmHg)
- Mạch: **108 lần/phút** (Mạch nhanh, đều, rõ)
- Thân nhiệt: **38.8°C**
- Nhịp thở: **22 lần/phút**
- SpO₂: **96%** (Khí trời)
- Cân nặng: **60 kg** (BMI 21.2 kg/m²)

### Khám thực thể trọng tâm:
- **Toàn thân**: Bệnh nhân lừ đừ, tiếp xúc được nhưng chậm. Da xung huyết, xuất hiện nhiều chấm xuất huyết dải rác ở mặt trước hai cẳng chân. Chi ấm, thời gian đổ đầy mao mạch (CRT) = 2 giây.
- **Nghiệm pháp dây thắt (Lacet)**: **Dương tính (+)** — ghi nhận 28 chấm xuất huyết / 6.25 cm².
- **Niêm mạc**: Rỉ ít máu chân răng, không chảy máu mũi, không khối bầm tím dưới da.
- **Bụng**: Bụng mềm, ấn đau nhiều vùng hạ sườn phải và vùng thượng vị. Gan to 2.5 cm dưới bờ sườn, ấn đau, Rung gan (+). Không có phản ứng ứng phúc mạc.
- **Tim - Phổi**: T1, T2 đều rõ, chưa nghe mầm bệnh; Phế trường thông khí rõ hai bên.

### Cận lâm sàng & Hình ảnh học:
- **Công thức máu (CBC)**:
  - Bạch cầu (WBC): **3.2 G/L** (Giảm)
  - Hematocrit (Hct): **46%** (Tăng 21% so với Hct nền ước tính 38% -> Có cô đặc máu)
  - Tiểu cầu (PLT): **42 G/L** (Giảm nặng < 100 G/L)
- **Xét nghiệm vi sinh**: **Dengue NS1 Ag (+)** (Test nhanh dương tính)
- **Sinh hóa & Đông máu**:
  - Men gan: AST **210 U/L**, ALT **145 U/L** (Tổn thương gan nhẹ-trung bình)
  - Đường huyết: **5.4 mmol/L**; Creatinine: **78 µmol/L**
  - PT: 12.5s, aPTT: 34s, Fibrinogen: 2.8 g/L
- **Siêu âm bụng tại giường**:
  - Dày thành túi mật **4.2 mm** (dấu hiệu thoát dịch thành túi mật).
  - Khảo sát có lớp dịch mỏng tự do ở khoang Morrison và xô chậu.

---

## 3. 🧠 A — ĐÁNH GIÁ / ASSESSMENT

- **Chẩn đoán xác định**: Sốt xuất huyết Dengue có dấu hiệu cảnh báo ngày thứ 4 (Dengue NS1 Ag (+), Hct tăng 21%, Tiểu cầu giảm 42 G/L, đau bụng gan, nôn ói nhiều).
- **Mã ICD-10**: `A97.1` (Sốt xuất huyết Dengue có dấu hiệu cảnh báo)
- **Chẩn đoán phân biệt cần loại trừ**:
  1. *Nhiễm khuẩn huyết / Sốc nhiễm khuẩn*: Bệnh nhân có sốt và bạch cầu giảm, tuy nhiên NS1 Ag (+) rõ ràng, có cô đặc máu Hct 46% và Lacet (+) hướng trọn vẹn về Dengue.
  2. *Sốt phát ban do Virus khác (Chikungunya/Zika)*: Không có dấu hiệu cô đặc máu nặng hay tụt tiểu cầu sâu như Dengue.
  3. *Bệnh lý bụng cấp ngoại khoa (Viêm túi mật cấp / Viêm ruột thừa)*: Siêu âm có dày thành túi mật nhưng trong bối cảnh SXH là do thoát huyết tương; ấn đau gan do gan to sung huyết.
- **Phân tầng nguy cơ & Thang điểm lượng giá**:
  - Mức độ: **Trung bình - Nguy cơ chuyển Sốc** (Bệnh nhân có hiệu áp kẹp 20 mmHg và Hct tăng > 20%).
  - Bắt buộc nhập viện điều trị nội trú và theo dõi sát huyết động mỗi 2 giờ.

---

## 4. 📋 P — KẾ HOẠCH / PLAN

### Xử trí cấp cứu & Ban đầu:
- Nhập viện Khoa Bệnh Nhiệt đới (Phòng theo dõi bệnh nặng).
- Cho bệnh nhân nằm nghỉ ngơi tại giường, hạn chế đi lại.
- Thiết lập đường truyền tĩnh mạch ngoại biên bằng kim luồn 20G.

### Y lệnh thuốc & Truyền dịch tĩnh mạch:
1. **Ringer Lactate (Chai 500ml)**: Truyền tĩnh mạch tốc độ **6 mL/kg/giờ** (= 360 mL/giờ) trong 2 giờ đầu.
   - *Đánh giá lại sau 2 giờ*: Nếu sinh hiệu ổn định, Hct giảm -> Giảm tốc độ xuống **3 mL/kg/giờ** trong 2-4 giờ tiếp theo.
2. **Paracetamol 500mg**: Uống 1 viên khi sốt >= 38.5°C (tối đa 3 viên/ngày).
3. **Oresol (ORS 245 mOsm/L)**: Khuyến khích uống thêm 500-1000 mL/ngày nếu còn uống được.
4. **Omeprazole 40mg**: 1 lọ tiêm tĩnh mạch chậm (bảo vệ niêm mạc dạ dày do có rỉ máu chân răng và đau thượng vị).

### Kế hoạch theo dõi & Tiêu chuẩn chuyển tuyến:
- **Theo dõi tại giường**:
  - Mạch, Huyết áp, Hiệu áp, CRT, Nước tiểu mỗi **2 giờ/lần**.
  - Kiểm tra lại Hematocrit (Hct) sau **2 - 4 giờ** truyền dịch.
- **Dấu hiệu báo động đỏ cần can thiệp Sốc (chuyển ICU)**:
  - Nếu Mạch nhanh > 120 l/p, Huyết áp tụt < 90 mmHg hoặc Hiệu áp kẹp < 20 mmHg, Hct tiếp tục tăng -> Báo Bác sĩ trực tăng tốc độ dịch Ringer Lactate lên **10-20 mL/kg/h** hoặc chuyển chống sốc bằng **Dung dịch cao phân tử (Dextran 40 / HES 6%)**.
```

---

Thầy/cô và anh/chị có thể sao chép trực tiếp từng khối code trên để nạp vào hệ thống **CliniPortal DocSpace**! Thầy/cô có muốn tùy chỉnh thêm thông số ca bệnh mẫu hay nạp thêm phác đồ xử trí cho nhóm đối tượng đặc biệt (như Phụ nữ mang thai hoặc Trẻ em béo phì) không?
