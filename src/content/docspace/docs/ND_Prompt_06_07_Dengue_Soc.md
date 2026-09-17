Prompt 06

### ==============================================================================
### PHẦN 1: CA LÂM SÀNG MẪU THỰC TẾ (Nạp vào: `sample-clinical-cases.json`)
### ==============================================================================

```json
{
  "ten": "Sốt xuất huyết Dengue nặng có sốc ngày thứ 5 (Dengue Shock Syndrome - DSS N5, HA kẹp 85/65, Mạch nhanh nhỏ, Hct 52%, Tràn dịch màng phổi)",
  "sel": [
    "tc_sot_cao_dot_ngot_duoi_7_ngay",
    "tc_xuat_huyet_da_niem_lacet_duong_tinh",
    "tc_dau_hieu_canh_bao_dau_bung_gan_non_oi",
    "tc_soc_mach_nhanh_ha_kep_hoac_tut",
    "tc_co_dac_mau_hct_tang_tren_20_phan_tram",
    "tc_giam_tieu_cau_duoi_100_g_l",
    "tc_xet_nghiem_ns1_hoac_pcr_duong_tinh",
    "chi_lanh_crt_keo_dai",
    "tran_dich_mang_phoi_mang_bung"
  ],
  "vitals": {
    "vNhiet": "37.2",
    "vMach": "124",
    "vHATT": "85",
    "vHATTr": "65",
    "vTho": "28",
    "vSpo2": "94"
  },
  "labs": {
    "lBC": "2.4",
    "lTC": "18",
    "lHct": "52",
    "lGlu": "4.6",
    "lTrop": "12"
  },
  "selected": [
    "tc_sot_cao_dot_ngot_duoi_7_ngay",
    "tc_xuat_huyet_da_niem_lacet_duong_tinh",
    "tc_dau_hieu_canh_bao_dau_bung_gan_non_oi",
    "tc_soc_mach_nhanh_ha_kep_hoac_tut",
    "tc_co_dac_mau_hct_tang_tren_20_phan_tram",
    "tc_giam_tieu_cau_duoi_100_g_l",
    "tc_xet_nghiem_ns1_hoac_pcr_duong_tinh",
    "chi_lanh_crt_keo_dai",
    "tran_dich_mang_phoi_mang_bung"
  ],
  "negated": [
    "tc_ho_co_dom_hoac_viem_am_i_keo_dai",
    "hon_me_roi_loan_tri_giac"
  ],
  "epiContext": {
    "endemicArea": "Việt Nam là vùng lưu hành dịch tễ sốt xuất huyết Dengue quanh năm, lưu hành cả 4 tuýp vi rút DENV",
    "outbreakAlert": "Địa phương đang bùng phát ổ dịch Sốt xuất huyết Dengue với nhiều ca có dấu hiệu cảnh báo và sốc nhập viện",
    "vectorExposure": "Môi trường sống nhiều muỗi vằn Aedes aegypti, thói quen sinh hoạt không ngủ màn ban ngày, bị muỗi đốt nhiều lần",
    "seasonalContext": "Mùa mưa nhiệt đới độ ẩm cao, thuận lợi cho muỗi vằn sinh sản mạnh tại các ổ chứa nước đọng"
  },
  "form": {
    "gioiTinh": "nam",
    "tuoi": "22",
    "ngheNghiep": "Sinh viên đại học",
    "lyDo": "Sốt ngày thứ 5, nhiệt độ giảm nhưng mệt lả, bứt rứt, tay chân lạnh ẩm, vã mồ hôi và tụt huyết áp",
    "text": {
      "cn": "Bệnh nhân nam 22 tuổi, khởi phát bệnh 5 ngày trước với sốt cao liên tục 39.5 - 40°C, kèm đau đầu dữ dội, đau nhức hốc mắt và đau cơ toàn thân. Tự dùng Paracetamol nhưng hạ sốt chậm. Ngày bệnh thứ 4, xuất hiện đau tức liên tục vùng hạ sườn phải, nôn 3 lần ra dịch trong và rỉ máu chân răng tự nhiên. Sáng ngày thứ 5, nhiệt độ giảm xuống 37.2°C nhưng bệnh nhân cảm thấy mệt lả cực độ, bứt rứt, hoa mắt chóng mặt khi ngồi dậy, tay chân lạnh toát và vã mồ hôi nhiều.",
      "tt": "Bệnh nhân tỉnh nhưng lừ đừ, bứt rứt, tiếp xúc chậm chạp. Thân nhiệt 37.2°C, da niêm mạc xung huyết, nhiều chấm xuất huyết rải rác ở hai cẳng tay và cẳng chân. Chi lạnh, thời gian đổ đầy mao mạch (CRT) kéo dài 4 giây. Mạch quay nhanh, nhỏ, khó bắt, tần số 124 lần/phút. Huyết áp đo được 85/65 mmHg (huyết áp tụt kẹp, hiệu số 20 mmHg). Nhịp thở 28 lần/phút, SpO2 94% (khí phòng). Tim đều nhanh, không âm thổi. Phổi thông khí giảm nhẹ ở đáy phổi phải, không rale. Bụng chướng nhẹ, gan to 3 cm dưới bờ sườn, ấn đau tức rõ, gõ đục vùng thấp hai bên mạn sườn.",
      "tc": "Tiền sử bản thân khỏe mạnh, chưa từng mắc sốt xuất huyết trước đây, không có bệnh lý tim mạch, hen phế quản hay suy thận mạn. Nơi ở: Khu nhà trọ sinh viên gần kênh rạch nhiều muỗi vằn, có 3 bạn cùng khu trọ đang điều trị sốt xuất huyết.",
      "cls": "Công thức máu: Bạch cầu (WBC) 2.4 G/L (giảm), Tiểu cầu (PLT) 18 G/L (giảm sâu nghiêm trọng), Hematocrit (Hct) 52% (cô đặc máu rất nặng so với chuẩn nền 40-42%). Xét nghiệm vi sinh: Test nhanh Dengue NS1Ag dương tính mạnh (+), Kháng thể Dengue IgM dương tính (+). Hóa sinh máu: Men gan AST 260 U/L, ALT 185 U/L, Creatinine 95 µmol/L, Glucose máu 4.6 mmol/L, Điện giải đồ Na+ 132 mmol/L, K+ 3.8 mmol/L, Lactate máu 3.4 mmol/L (phản ánh giảm tưới máu mô). Siêu âm ổ bụng tại giường: Dày thành túi mật 6 mm do phù nề thanh mạc, dịch tự do màng bụng lượng vừa, tràn dịch khoang màng phổi phải lượng trung bình (bề dày lớp dịch 22 mm). X-quang ngực thẳng: Góc sườn hoành phải tù, mờ màng phổi lượng vừa bên phải."
    }
  }
}
```

***

### ==============================================================================
### PHẦN 2: MA TRẬN TRỌNG SỐ SUY LUẬN CDSS
### ==============================================================================

#### 1. Bổ sung triệu chứng vào file `clinical-rules-symptoms.json`

```json
[
  {
    "id": "chi_lanh_crt_keo_dai",
    "ten": "Đầu chi lạnh, ẩm, thời gian đổ đầy mao mạch (CRT) kéo dài > 2 giây",
    "nhom": "Tim mạch",
    "loai": ["tt"],
    "tuKhoa": ["chi lanh", "crt keo dai", "dau chi lanh", "tay chan lanh", "tuoi mau mo kem"],
    "map": null
  },
  {
    "id": "tran_dich_mang_phoi_mang_bung",
    "ten": "Thoát huyết tương: Tràn dịch màng phổi, tràn dịch màng bụng trên siêu âm/X-quang",
    "nhom": "Cận lâm sàng",
    "loai": ["cls", "tt"],
    "tuKhoa": ["tran dich mang phoi", "tran dich mang bung", "co truong", "thoat huyet tuong", "phu ne thanh tui mat"],
    "map": null
  }
]
```

#### 2. Cập nhật Thực thể Bệnh trong file `diseases/truyen-nhiem.json`

```json
{
  "id": "sot_xuat_huyet_dengue",
  "ten": "Sốt xuất huyết Dengue (Bao gồm Dengue có dấu hiệu cảnh báo & Sốc Dengue)",
  "icd": "A97",
  "nhom": "Truyền nhiễm",
  "baoDong": true,
  "ghiChuBaoDong": "CẢNH BÁO CỜ ĐỎ: Sốc thoát huyết tương, HA kẹp <= 20 mmHg, Mạch nhanh nhỏ, Cô đặc máu Hct tăng > 20%, Giảm tiểu cầu cấp, Xuất huyết tạng nặng!",
  "tomTat": "Bệnh truyền nhiễm cấp tính do vi rút Dengue gây ra, lây truyền qua muỗi Aedes. Diễn tiến qua 3 giai đoạn: Giai đoạn sốt (ngày 1-3), Giai đoạn nguy hiểm (ngày 4-7: thoát huyết tương gây sốc, xuất huyết, suy đa tạng) và Giai đoạn hồi phục. Điều trị cốt lõi là hồi sức dịch tinh thể theo phác đồ bậc thang của Bộ Y Tế.",
  "danSo": {
    "gioiTinh": "any",
    "tuoiMin": 0,
    "tuoiMax": 120
  },
  "dd": [
    [
      "tc_sot_cao_dot_ngot_duoi_7_ngay",
      4.5,
      "dt"
    ],
    [
      "tc_xuat_huyet_da_niem_lacet_duong_tinh",
      4,
      "dt"
    ],
    [
      "tc_co_dac_mau_hct_tang_tren_20_phan_tram",
      4.5,
      "dt"
    ],
    [
      "tc_xet_nghiem_ns1_hoac_pcr_duong_tinh",
      5,
      "dt"
    ],
    [
      "tc_soc_mach_nhanh_ha_kep_hoac_tut",
      5,
      "dt"
    ],
    [
      "tc_giam_tieu_cau_duoi_100_g_l",
      3.5,
      "gy"
    ],
    [
      "tc_dau_hieu_canh_bao_dau_bung_gan_non_oi",
      3.5,
      "gy"
    ],
    [
      "chi_lanh_crt_keo_dai",
      4.5,
      "dt"
    ],
    [
      "tran_dich_mang_phoi_mang_bung",
      4,
      "dt"
    ],
    [
      "tc_ho_co_dom_hoac_viem_am_i_keo_dai",
      -5,
      "loaitru"
    ]
  ],
  "phacDo": {
    "tuyen": [
      "Tuyến trạm y tế / Cơ sở: Nhận diện sớm dấu hiệu cảnh báo (đau bụng vùng gan, nôn nhiều, Hct tăng kèm tiểu cầu giảm nhanh). Chuyển tuyến an toàn bằng dung dịch Ringer Lactate nếu huyết động bất ổn.",
      "Tuyến bệnh viện quận/huyện: Sốt xuất huyết Dengue có dấu hiệu cảnh báo: Truyền dịch Ringer Lactate bậc thang 6-7 ml/kg/h -> 5 ml/kg/h -> 3 ml/kg/h. Theo dõi Hct mỗi 2-4 giờ.",
      "Tuyến chuyên khoa / ICU hồi sức: Sốc SXH Dengue: Thở oxy, bù dịch tinh thể Ringer Lactate 15 ml/kg trong giờ đầu tiên. Nếu thất bại hoặc tái sốc: Sử dụng dung dịch cao phân tử (Dextran 40 hoặc HES 200/0.5) 10-15 ml/kg/h. Đo Hct trước và sau mỗi đợt dịch."
    ],
    "thuoc": [
      [
        "Ringer Lactate (Chai 500ml)",
        "15 ml/kg/giờ đầu tiên (Sốc SXH)",
        "Dung dịch tinh thể đẳng trương đầu tay chống sốc theo QĐ 2760/QĐ-BYT"
      ],
      [
        "Dextran 40 10% trong NaCl 0.9% (Chai 500ml)",
        "10 - 15 ml/kg/h IV",
        "Dung dịch cao phân tử chỉ định khi sốc không đáp ứng điện giải hoặc tái sốc"
      ],
      [
        "Hydroxyethyl Starch (HES 6% 200/0.5)",
        "10 - 15 ml/kg/h IV",
        "Dung dịch keo tổng hợp chống sốc thay thế Dextran"
      ],
      [
        "Khối hồng cầu (KHC)",
        "5 - 10 ml/kg IV",
        "Chỉ định khi sốc kèm xuất huyết nặng hoặc Hct tụt nhanh < 35% mà huyết động không cải thiện"
      ],
      [
        "Paracetamol 500mg",
        "10 - 15 mg/kg/lần (tối đa 60 mg/kg/ngày)",
        "Hạ sốt an toàn khi sốt >= 38.5°C; tuyệt đối không dùng Aspirin hoặc NSAID"
      ]
    ],
    "theoDoi": [
      "Mạch, Huyết áp, Nhịp thở, SpO2 mỗi 15-30 phút trong giai đoạn chống sốc",
      "Hematocrit (Hct) trước khi truyền dịch, sau 1 giờ bù dịch và mỗi 2-4 giờ cho đến khi huyết động ổn định",
      "Nước tiểu qua sonde bàng quang, đảm bảo lượng nước tiểu >= 0.5 - 1 ml/kg/h",
      "Phát hiện sớm dấu hiệu quá tải dịch: Thở nhanh, ran ẩm ở phổi, gan to nhanh, CVP tăng cao"
    ],
    "luuY": [
      "Tuyệt đối không dùng kháng sinh thường quy trong sốt xuất huyết Dengue",
      "Chống chỉ định tuyệt đối Aspirin, Ibuprofen và các thuốc NSAID do nguy cơ gây loét dạ dày và xuất huyết ồ ạt",
      "Ngưng dịch truyền đúng thời điểm khi bệnh nhân bước vào giai đoạn tái hấp thu (thường sau 24-48 giờ từ khi sốc) để tránh phù phổi cấp"
    ],
    "nguon": [
      "Quyết định 2760/QĐ-BYT năm 2023",
      "WHO Dengue Guidelines 2024",
      "Hội Truyền Nhiễm Việt Nam"
    ]
  }
}
```

***

Prompt 07

---
title: "Sốc Sốt xuất huyết Dengue ngày thứ 5 (Dengue Shock Syndrome): Cấp cứu sốc thoát huyết tương theo phác đồ Quyết định 2760/QĐ-BYT"
caseId: "soap-dengue-soc-2760-01"
icd10:
  - "A97.2"
specialty: "Truyền nhiễm - Hồi sức cấp cứu"
experienceLevel: "pitfall"
difficultyRating: 4
authorDoctor: "BS. Cấp cứu Truyền nhiễm & Hồi sức tích cực"
tags:
  - "y-khoa/ba"
  - "loai/soap-case"
  - "he-co-quan/truyen-nhiem"
  - "benh/dengue"
demographicContext: "Bệnh nhân nam 22 tuổi, sinh viên, sống tại ổ dịch SXH Dengue, nhập viện ngày thứ 5 của bệnh"
historyPearls: "Nghịch lý lâm sàng sinh tử: HẾT SỐT KHÔNG PHẢI LÀ KHỎI BỆNH! Ngày 4-6 khi nhiệt độ tụt xuống là lúc hiện tượng rò rỉ huyết tương đạt đỉnh điểm dẫn tới sốc giảm thể tích cấp tính. Bệnh nhân lầm tưởng hạ sốt là khỏe nên không đi khám, đến viện trong tình trạng sốc sâu."
objectivePitfalls: "Cạm bẫy huyết áp kẹp: Hiệu số huyết áp tâm thu - tâm trương <= 20 mmHg (như 85/65 mmHg) là dấu hiệu sốc sớm tối khẩn. Không được chờ đến khi huyết áp tụt hẳn về 0 mới chẩn đoán sốc! Đồng thời Hct tăng vọt phản ánh tình trạng mất thể tích lòng mạch do thoát dịch qua mao mạch."
diagnosticPearls: "Chẩn đoán Sốc SXH Dengue (DSS) theo QĐ 2760/QĐ-BYT: (1) Sốt cao cấp tính < 7 ngày, (2) Thoát huyết tương nặng (Hct tăng > 20% và/hoặc tràn dịch màng phổi, màng bụng), (3) Huyết động suy sụp: Mạch nhanh nhỏ, HA kẹp <= 20 mmHg hoặc HA tụt, chi lạnh ẩm, CRT > 2s."
takeawayLessons: "Phác đồ hồi sức dịch truyền QĐ 2760: (1) Lập tức thở oxy qua cannula 3-5 l/p. (2) Ringer Lactate khẩn trương 15 mL/kg trong giờ đầu tiên. (3) Đánh giá lại sinh hiệu và Hct sau 1 giờ: Nếu cải thiện hạ dịch dần 10 -> 7.5 -> 5 -> 3 mL/kg/h. Nếu không cải thiện hoặc tái sốc: Chuyển ngay dung dịch cao phân tử (Dextran 40 hoặc HES 200/0.5 10-15 mL/kg/h). (4) Không dùng kháng sinh thường quy, không dùng NSAID/Corticoid."
updated: "2026-09-17"
---

# 🩺 Ca Lâm Sàng: Sốc Sốt Xuất Huyết Dengue Ngày Thứ 5 — Cấp Cứu Theo Quyết Định 2760/QĐ-BYT

> **Bối cảnh thực tế**: Khoa Hồi sức Cấp cứu Truyền Nhiễm.  
> **Phân loại**: Bẫy lâm sàng (Pitfall) · Độ khó: 4/5 sao.

---

## 1. 📝 S — Subjective (Bệnh Sử & Triệu Chứng Cơ Năng)

- **Lý do nhập viện**: Ngày thứ 5 của bệnh, nhiệt độ hạ sốt nhưng mệt lả, bứt rứt, vã mồ hôi lạnh, tay chân lạnh ngắt và choáng váng khi ngồi dậy.
- **Bệnh sử**:
  - *Ngày 1 - Ngày 3 (Pha sốt)*: Bệnh nhân nam 22 tuổi, sốt cao đột ngột liên tục 39.5 - 40°C, kèm nhức đầu vùng trán dữ dội, đau nhức hốc mắt hai bên, đau mỏi cơ khớp toàn thân. Bệnh nhân tự mua Paracetamol 500mg uống ngày 4 viên nhưng sốt ít đáp ứng. Ăn uống kém, buồn nôn, không ho, không đau ngực.
  - *Ngày 4 (Pha bắt đầu nguy hiểm)*: Bệnh nhân bớt sốt dao động 38.5°C nhưng bắt đầu xuất hiện đau tức âm ỉ liên tục vùng hạ sườn phải, nôn 3 lần trong ngày ra dịch thức ăn và nước chua, chảy máu chân răng khi súc miệng. Bệnh nhân mệt nhiều nhưng vẫn cố ở phòng trọ theo dõi.
  - *Ngày 5 (Pha sốc thoát huyết tương)*: Buổi sáng nhiệt độ giảm hẳn còn 37.2°C. Người nhà tưởng đã khỏi sốt nhưng nhận thấy bệnh nhân mệt lả cực độ, bứt rứt, thay đổi tư thế ngồi dậy là tối sầm mắt mày, tay chân lạnh toát, vã mồ hôi đầm đìa, tiểu ít từ sáng. Người nhà lập tức đưa vào khoa cấp cứu.
- **Tiền căn**:
  - Bản thân: Không tiền sử bệnh tim mạch, hen phế quản hay suy thận mạn. Chưa từng mắc sốt xuất huyết trước đây.
  - Gia đình & Dịch tễ: Sống tại xóm trọ gần bãi đất trũng nhiều muỗi vằn, có 3 người cùng xóm đang điều trị sốt xuất huyết tại bệnh viện quận.

---

## 2. 🔬 O — Objective (Khám Thực Thể & Cận Lâm Sàng)

- **Sinh hiệu tiếp nhận**:
  - Thân nhiệt: **37.2°C** (Hạ sốt nhưng huyết động sụp đổ).
  - Huyết áp: **85/65 mmHg** (Huyết áp kẹp và tụt: Hiệu số huyết áp = 20 mmHg).
  - Mạch: **124 ck/p** (Mạch quay nhanh, nhỏ, rất khó bắt).
  - Nhịp thở: **28 ck/p** (Thở nhanh nông).
  - SpO₂: **94%** (Khí phòng).
  - Chi: Lạnh ẩm từ bàn chân lên cẳng chân, thời gian đổ đầy mao mạch (**CRT = 4 giây**).
- **Khám thực thể toàn thân**:
  - Tri giác: Tỉnh nhưng lừ đừ, bứt rứt, lo âu, Glasgow 14 điểm.
  - Da niêm mạc: Xung huyết, niêm mạc mắt nhạt, có nhiều chấm xuất huyết dạng chấm kim (petechiae) rải rác ở hai cẳng tay và mặt trước hai cẳng chân. Nghiệm pháp dây thắt dương tính mạnh (> 20 nốt/1 inch²).
  - Đầu mặt cổ: Chân răng còn rỉ ít dịch máu đông, họng sạch, tuyến giáp không to, tĩnh mạch cổ xẹp ở tư thế nằm 45°.
  - Lồng ngực - Phổi: Rì rào phế nang giảm rõ ở đáy phổi phải, gõ đục vùng đáy phổi phải. Không nghe rale ẩm rale nổ.
  - Tim mạch: T1, T2 đều nhanh, không âm thổi bệnh lý, không tiếng T3/T4.
  - Bụng: Bụng chướng nhẹ, gõ đục vùng thấp hai bên mạn sườn (nghi ngờ dịch ổ bụng tự do). Gan to dưới bờ sườn phải 3 cm, bờ mềm, bề mặt nhẵn, ấn đau tức rõ rệt (dấu hiệu cảnh báo gan to đau). Lách không sờ chạm.
  - Tiết niệu: Đặt sonde Foley bàng quang ra 30 mL nước tiểu màu vàng sẫm.
- **Cận lâm sàng khẩn cấp tại giường**:
  - **Hematocrit (Hct)**: **52%** (Tăng vọt so với giá trị cơ bản ước tính 40-42% ➔ Tăng hơn 25%, khẳng định cô đặc máu nặng nề do rò rỉ huyết tương qua nội mô mao mạch).
  - **Tiểu cầu (PLT)**: **18 G/L** (Giảm sâu nghiêm trọng < 20 G/L).
  - **Bạch cầu (WBC)**: **2.4 G/L** (Giảm bạch cầu đặc trưng của nhiễm vi rút Dengue).
  - **Lactate máu động mạch**: **3.4 mmol/L** (Tăng phản ánh tình trạng giảm tưới máu mô và chuyển hóa yếm khí).
  - **Khí máu động mạch**: pH 7.34, PaCO2 32 mmHg, PaO2 82 mmHg, HCO3- 17.5 mmol/L, BE -6.2 mmol/L (Toan chuyển hóa bù trừ hô hấp).
  - **Men gan**: AST **260 U/L**, ALT **185 U/L** (Tổn thương gan do sốt xuất huyết).
  - **Chức năng thận**: Creatinine 95 µmol/L, Urea 6.8 mmol/L.
  - **Điện giải đồ**: Na⁺ 132 mmol/L, K⁺ 3.8 mmol/L, Cl⁻ 98 mmol/L.
  - **Huyết thanh chẩn đoán**: Test nhanh Dengue NS1Ag dương tính (+), Dengue IgM dương tính (+).
  - **Siêu âm tại giường (POCUS)**: Dày phù nề thành túi mật 6 mm, dịch tự do khoang màng phổi phải lượng trung bình (lớp dịch 22 mm), dịch tự do khoang Morrison và Douglas lượng vừa. Tĩnh mạch chủ dưới (IVC) xẹp hoàn toàn khi hít vào (đường kính IVC 9 mm, xẹp > 50% khẳng định thiếu thể tích nội mạch nặng).

---

## 3. 🧠 A — Assessment (Chẩn đoán & Biện luận Lâm sàng)

- **Chẩn đoán xác định**: Sốc Sốt xuất huyết Dengue (Dengue Shock Syndrome - DSS) ngày thứ 5, có dấu hiệu thoát huyết tương nặng gây tràn dịch màng phổi - màng bụng và cô đặc máu, giảm tiểu cầu mức độ nặng. Mã ICD-10: **A97.2**.
- **Chẩn đoán phân biệt**:
  - *Sốc nhiễm trùng (Septic shock)* do nhiễm khuẩn đường huyết: Thường có ổ nhiễm trùng nguyên phát, bạch cầu tăng cao, procalcitonin tăng cao, Hct thường giảm hoặc bình thường chứ không cô đặc máu tăng cao như Dengue.
  - *Sốc tim (Cardiogenic shock)* do viêm cơ tim cấp: Thường có tiền triệu sốt, nhưng ECG có biến đổi sóng T hoặc đoạn ST, men tim Troponin tăng vọt, siêu âm tim EF giảm và IVC giãn căng (trong khi ở đây EF tốt, IVC xẹp).
  - *Sốc giảm thể tích do xuất huyết tiêu hóa ẩn*: Bệnh nhân có rỉ máu chân răng, nếu có loét dạ dày kèm theo có thể xuất huyết tiêu hóa. Tuy nhiên, nếu mất máu đơn thuần Hct sẽ tụt nhanh chứ không tăng lên 52%. Cần tiếp tục theo dõi sát phân và dịch dạ dày.
- **Biện luận lâm sàng chuyên sâu**:
  - Bệnh nhân hội tụ đầy đủ tiêu chuẩn chẩn đoán Sốc SXH Dengue theo Hướng dẫn của Bộ Y Tế (QĐ 2760/QĐ-BYT): (1) Bệnh sử sốt cấp tính vùng dịch tễ kèm NS1Ag (+); (2) Thoát huyết tương ồ ạt với Hct 52% (tăng > 25%), tràn dịch màng phổi và màng bụng; (3) Tụt huyết áp kẹp (85/65 mmHg), mạch nhanh nhỏ 124 ck/p, CRT 4 giây, chi lạnh.
  - Đây là giai đoạn tối khẩn cấp. Mất thể tích nội mạch tuần hoàn do rò rỉ dịch qua mao mạch là nguyên nhân chính dẫn đến suy sụp huyết động. Cần khẩn trương thiết lập đường truyền tĩnh mạch kích thước lớn (G18) và truyền dịch tinh thể tốc độ cao để tái lập thể tích lòng mạch trong "giờ vàng" đầu tiên.

---

## 4. 📋 P — Plan (Kế Hoạch Điều Trị & Y Lệnh Cụ Thể)

### 4.1. Hồi sức Huyết động Khẩn cấp (Theo Quyết định 2760/QĐ-BYT)

1. **Tư thế & Hô hấp**:
   - Nằm đầu phẳng, nâng cao hai chân 15-30° để tăng hồi lưu máu tĩnh mạch về tim.
   - Thở oxy qua gọng kính (Cannula) **3 lít/phút**, duy trì SpO₂ >= 95%.
2. **Thiết lập đường truyền**:
   - Thiết lập ngay 2 đường truyền ngoại biên kim lớn (**18G**).
3. **Phác đồ dịch truyền giờ thứ nhất**:
   - **Ringer Lactate**: Truyền tĩnh mạch tốc độ **15 mL/kg/giờ** trong giờ đầu tiên.
   - Trọng lượng bệnh nhân 60 kg ➔ Thể tích truyền: **900 mL Ringer Lactate** xả nhanh trong 60 phút.
4. **Đánh giá lại sau 1 giờ truyền dịch (Giờ thứ 2)**:
   - *Nếu huyết động cải thiện* (Mạch chậm lại < 100 ck/p, HA hết kẹp >= 100/70 mmHg, CRT < 2s, Hct giảm):
     - Hạ tốc độ Ringer Lactate xuống **10 mL/kg/giờ** trong 1-2 giờ tiếp theo.
     - Sau đó tiếp tục giảm dần theo bậc thang: **7.5 mL/kg/h** (trong 2 giờ) ➔ **5 mL/kg/h** (trong 4 giờ) ➔ **3 mL/kg/h** (trong 6-12 giờ).
   - *Nếu huyết động không cải thiện hoặc Hct vẫn giữ mức cao >= 50%*:
     - Chuyển ngay sang dịch truyền **Cao phân tử (Dextran 40 hoặc HES 6% 200/0.5)** với liều **10 - 15 mL/kg/giờ** trong 1 giờ, sau đó đánh giá lại.
   - *Nếu huyết động không cải thiện nhưng Hct tụt nhanh < 35%*:
     - Báo động nghi ngờ có xuất huyết nội tạng ẩn (xuất huyết tiêu hóa, xuất huyết ổ bụng) ➔ Chỉ định truyền cấp **Khối hồng cầu (KHC) 5-10 mL/kg**.

### 4.2. Điều trị Hỗ trợ & Bảo vệ Cơ quan

1. **Bảo vệ niêm mạc dạ dày chống loét stress**:
   - **Esomeprazole 40mg**: 01 lọ tiêm tĩnh mạch chậm.
2. **Hạ sốt (nếu sốt tái phát >= 38.5°C)**:
   - Paracetamol 500mg: 01 viên uống hoặc truyền tĩnh mạch nếu không uống được, cách tối thiểu 4-6 giờ.
   - Tuyệt đối KHÔNG dùng Aspirin, Ibuprofen, Diclofenac.
3. **Cân bằng kiềm toan & điện giải**:
   - Bù dung dịch Natri Bicarbonate 4.2% chỉ khi toan chuyển hóa nặng (pH < 7.20 hoặc HCO3- < 10 mmol/L) sau khi đã bù đủ thể tích dịch tuần hoàn.

### 4.3. Chế độ Theo dõi Tối Khẩn (ICU Monitoring)

- Theo dõi Mạch, Huyết áp, Nhịp thở, SpO₂: **15 - 30 phút/lần** trong 2 giờ đầu; sau đó mỗi **1 giờ/lần** khi huyết động bắt đầu ổn định.
- Xét nghiệm kiểm tra **Hematocrit (Hct)**: Sau mỗi liều truyền dịch (sau 1 giờ, 2 giờ, 4 giờ, 6 giờ).
- Đặt ống thông tiểu lưu (Foley), theo dõi lượng nước tiểu hàng giờ: Mục tiêu đạt **>= 0.5 - 1.0 mL/kg/giờ**.
- Theo dõi sát các dấu hiệu quá tải dịch: Khó thở tăng dần, nhịp thở > 30 l/p, ran ẩm hai đáy phổi, SpO2 tụt, gan to căng tức nhanh.

---

## 5. 💡 Kinh Nghiệm Thực Chiến (Clinical Pearls & Pitfalls)

- 💎 **Nguyên tắc "Vàng" Về Pha Nguy Hiểm**: Sự suy sụp tuần hoàn trong sốt xuất huyết Dengue diễn ra nhanh như chớp ngay tại thời điểm bệnh nhân vừa hạ sốt. Bác sĩ trực không bao giờ được phép chủ quan khi bệnh nhân thông báo "hôm nay em hết sốt rồi".
- ⚠️ **Bẫy Truyền Máu & Tiểu Cầu**: Giảm tiểu cầu đơn thuần (thậm chí < 20 G/L) KHÔNG PHẢI là chỉ định truyền tiểu cầu nếu không có xuất huyết lâm sàng đe dọa tính mạng! Truyền tiểu cầu bừa bãi có thể làm tăng nguy cơ phản vệ, quá tải tuần hoàn và bẫy hội chứng suy hô hấp cấp. Trọng tâm của chống sốc Dengue là **BÙ ĐỦ THỂ TÍCH TUẦN HOÀN BẰNG DỊCH TINH THỂ VÀ CAO PHÂN TỬ**.
- 🛑 **Thời điểm "Khóa Van" Dịch Truyền**: Giai đoạn rò rỉ huyết tương thường tự giới hạn sau 24 - 48 giờ. Khi bệnh nhân bước vào giai đoạn hồi phục (huyết áp ổn định, chi ấm, tiểu nhiều, bắt đầu có ban hồi phục da báo hiệu hồi phục), PHẢI NGƯNG DỊCH TRUYỀN NGAY LẬP TỨC. Tiếp tục truyền dịch trong giai đoạn này sẽ đẩy bệnh nhân vào cơn phù phổi cấp huyết động gây tử vong do quá tải thể tích!
