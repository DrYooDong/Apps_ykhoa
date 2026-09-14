Prompt 06

### ==============================================================================

### PHẦN 1: CA LÂM SÀNG MẪU THỰC TẾ (Nạp vào: `sample-clinical-cases.json`)

### ==============================================================================

```json
{
  "ten": "Sốt rét thể thông thường do P. falciparum chưa biến chứng (KSTSR P.f +++, Sốt cơn chu kỳ ngày 3, trở về từ vùng lưu hành)",
  "sel": [
    "sot_con_ret_run_va_mo_hoi",
    "yeu_to_dich_te_sot_ret",
    "kstsr_lam_giemsa_pos",
    "rdt_malaria_pos",
    "lach_to_lam_sang",
    "thieu_mau_da_xanh_niem_nhot",
    "giam_tieu_cau_sot_ret",
    "dau_dau_dau_moi_co"
  ],
  "vitals": {
    "vNhiet": "39.2",
    "vMach": "104",
    "vHATT": "110",
    "vHATTr": "70",
    "vTho": "20",
    "vSpo2": "98"
  },
  "labs": {
    "lBC": "5.8",
    "lTC": "96",
    "lHct": "34",
    "lGlu": "5.4",
    "lTrop": "4"
  },
  "selected": [
    "sot_con_ret_run_va_mo_hoi",
    "yeu_to_dich_te_sot_ret",
    "kstsr_lam_giemsa_pos",
    "rdt_malaria_pos",
    "lach_to_lam_sang",
    "thieu_mau_da_xanh_niem_nhot",
    "giam_tieu_cau_sot_ret",
    "dau_dau_dau_moi_co"
  ],
  "negated": [
    "hon_me_roi_loan_tri_giac",
    "suy_ho_hap_spo2_giam",
    "tieu_nuoc_tieu_den_huyet_cau_to",
    "suy_than_vo_nieu",
    "ha_duong_huyet"
  ],
  "epiContext": {
    "endemicArea": "Bệnh nhân vừa trở về từ vùng sốt rét lưu hành (huyện Bù Gia Mập, tỉnh Bình Phước) trong vòng 10 ngày qua",
    "outbreakAlert": "Khu vực rừng rẫy biên giới có muỗi Anopheles hoạt động mạnh, có các ca bệnh sốt rét rải rác lưu hành trong cộng đồng dân cư đi rừng",
    "vectorExposure": "Tiền sử ngủ rẫy trong rừng không mắc màn tẩm hóa chất, bị muỗi rừng Anopheles dirus / Anopheles minimus đốt nhiều lần vào ban đêm",
    "seasonalContext": "Mùa mưa, thời tiết ẩm ướt vùng rừng núi thuận lợi cho muỗi Anopheles sinh sản và truyền bệnh sốt rét"
  },
  "form": {
    "gioiTinh": "nam",
    "tuoi": "32",
    "ngheNghiep": "Công nhân cạo mủ cao su / Đi rừng rẫy",
    "lyDo": "Sốt cao từng cơn kèm rét run lập cập và vã mồ hôi 3 ngày nay sau khi đi rừng về",
    "text": {
      "cn": "Bệnh nhân nam 32 tuổi, khởi phát bệnh 3 ngày trước với các cơn sốt diễn tiến theo chu kỳ 3 giai đoạn điển hình: Bắt đầu bằng cảm giác gai rét rồi rét run toàn thân dữ dội kéo dài khoảng 45 phút, phải đắp 3 chăn bông; sau đó sốt cao nóng bừng 39.5°C, nhức đầu dữ dội, khát nước, buồn nôn; tiếp theo vã mồ hôi đầm đìa rồi hạ sốt, người mệt lả. Cơn sốt xuất hiện cách nhật. Không ho, không khó thở, nước tiểu vàng sẫm.",
      "tt": "Bệnh nhân tỉnh táo hoàn toàn, Glasgow 15 điểm, da niêm mạc hơi nhợt nhẹ, không vàng mắt da, không nốt xuất huyết. Tim đều tần số 104 lần/phút, phổi trong không rale. Bụng mềm, gan mấp mé bờ sườn, lách to độ I (chạm dưới bờ sườn trái 1.5 cm khi hít sâu, mật độ mềm, tức nhẹ). Không có dấu hiệu thần kinh khu trú, gáy mềm.",
      "tc": "Tiền sử đi làm rẫy ở khu vực rừng núi biên giới Bù Gia Mập (Bình Phước) cách đây 2 tuần, ngủ lán trại không mắc màn tẩm hóa chất. Chưa từng mắc sốt rét trước đây. Không có bệnh nền mạn tính.",
      "cls": "Soi lam máu nhuộm Giemsa: Phát hiện thể tư dưỡng (trophozoite dạng nhẫn) của Plasmodium falciparum mật độ +++ (khoảng 42.000 KST/µL máu), không thấy giao bào. Test nhanh RDTs (Pf/Pan): Kháng nguyên HRP-2 dương tính (+). Hoạt độ men G6PD: 9.8 U/g Hb (bình thường > 70%). Công thức máu: WBC 5.8 G/L, Hb 11.2 g/dL, PLT 96 G/L (giảm nhẹ). Men gan AST 42 U/L, ALT 38 U/L, Creatinine 82 µmol/L, Glucose máu 5.4 mmol/L, Bilirubin toàn phần 18.4 µmol/L. Tổng phân tích nước tiểu: Bình thường, không có huyết cầu tố niệu."
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
    "id": "sot_con_ret_run_va_mo_hoi",
    "ten": "Cơn sốt rét điển hình 3 giai đoạn (Rét run -> Sốt cao -> Vã mồ hôi)",
    "nhom": "Toàn thân",
    "loai": ["cn"],
    "tuKhoa": ["sot ret", "ret run", "va mo hoi", "sot con chu ky", "con sot ret"],
    "map": null
  },
  {
    "id": "yeu_to_dich_te_sot_ret",
    "ten": "Yếu tố dịch tễ sốt rét (Sống, đến hoặc trở về từ vùng sốt rét lưu hành trong 14 ngày)",
    "nhom": "Dịch tễ",
    "loai": ["cn"],
    "tuKhoa": ["dich te sot ret", "vung sot ret", "di rung", "ngu ray", "anopheles"],
    "map": null
  },
  {
    "id": "kstsr_lam_giemsa_pos",
    "ten": "Ký sinh trùng sốt rét (Plasmodium) dương tính trên lam máu nhuộm Giemsa",
    "nhom": "Cận lâm sàng",
    "loai": ["cls"],
    "tuKhoa": ["lam mau giemsa", "ky sinh trung sot ret", "plasmodium", "the nhan", "kstsr duong tinh"],
    "map": null
  },
  {
    "id": "rdt_malaria_pos",
    "ten": "Test chẩn đoán nhanh kháng nguyên sốt rét (RDTs / HRP-2 hoặc pLDH) dương tính",
    "nhom": "Cận lâm sàng",
    "loai": ["cls"],
    "tuKhoa": ["test nhanh sot ret", "rdt sot ret", "hrp2", "pldh", "rdt malaria"],
    "map": null
  },
  {
    "id": "lach_to_lam_sang",
    "ten": "Khám thực thể lách to dưới bờ sườn (Độ I - IV)",
    "nhom": "Tiêu hóa",
    "loai": ["tt"],
    "tuKhoa": ["lach to", "so thay lach", "lach to do 1", "splenomegaly"],
    "map": null
  },
  {
    "id": "thieu_mau_da_xanh_niem_nhot",
    "ten": "Thiếu máu tán huyết (da xanh xao, niêm mạc nhợt)",
    "nhom": "Huyết học",
    "loai": ["tt"],
    "tuKhoa": ["thieu mau", "da xanh niem nhot", "tan huyet", "hb giam"],
    "map": null
  },
  {
    "id": "giam_tieu_cau_sot_ret",
    "ten": "Giảm tiểu cầu máu ngoại vi (PLT < 150 G/L)",
    "nhom": "Cận lâm sàng",
    "loai": ["cls"],
    "tuKhoa": ["giam tieu cau", "plt giam", "tieu cau ha"],
    "map": null
  },
  {
    "id": "dau_dau_dau_moi_co",
    "ten": "Đau nhức đầu dữ dội, đau mỏi cơ khớp toàn thân",
    "nhom": "Toàn thân",
    "loai": ["cn"],
    "tuKhoa": ["dau dau", "dau moi co", "nhuc dau", "moi co"],
    "map": null
  },
  {
    "id": "dau_hieu_canh_bao_ac_tinh_sot_ret",
    "ten": "Dấu hiệu cảnh báo sốt rét ác tính (Li bì, nôn liên tục, KSTSR mật độ cao)",
    "nhom": "Cảnh báo nguy hiểm",
    "loai": ["tt"],
    "tuKhoa": ["canh bao ac tinh", "sot ret ac tinh", "li bi", "non nhieu", "kst cao"],
    "map": null
  },
  {
    "id": "hon_me_roi_loan_tri_giac",
    "ten": "Hôn mê, rối loạn tri giác (Sốt rét ác tính thể não / Glasgow < 11)",
    "nhom": "Thần kinh",
    "loai": ["tt"],
    "tuKhoa": ["hon me", "roi loan tri giac", "sot ret the nao", "glasgow giam"],
    "map": null
  },
  {
    "id": "tieu_nuoc_tieu_den_huyet_cau_to",
    "ten": "Đái huyết cầu tố (Nước tiểu màu đen hoặc màu nước vối sẫm)",
    "nhom": "Tiết niệu",
    "loai": ["tt"],
    "tuKhoa": ["nuoc tieu den", "dai huyet cau to", "nuoc voi", "tan mau o at"],
    "map": null
  },
  {
    "id": "suy_ho_hap_spo2_giam",
    "ten": "Suy hô hấp cấp (SpO2 < 92%, thở nhanh > 30 l/p, phù phổi cấp / ARDS)",
    "nhom": "Hô hấp",
    "loai": ["tt"],
    "tuKhoa": ["suy ho hap", "spo2 giam", "tho nhanh", "phu phoi cap", "ards"],
    "map": null
  },
  {
    "id": "suy_than_vo_nieu",
    "ten": "Suy thận cấp (Creatinine > 265 µmol/L, thiểu niệu hoặc vô niệu)",
    "nhom": "Tiết niệu",
    "loai": ["cls", "tt"],
    "tuKhoa": ["suy than cap", "creatinine tang", "thieu nieu", "vo nieu"],
    "map": null
  },
  {
    "id": "ha_duong_huyet",
    "ten": "Hạ đường huyết (Glucose máu < 2.2 mmol/L)",
    "nhom": "Cận lâm sàng",
    "loai": ["cls"],
    "tuKhoa": ["ha duong huyet", "glucose giam", "hypoglycemia"],
    "map": null
  }
]
```

#### 2. Thêm thực thể bệnh vào tệp chuyên khoa `src/content/knowledge-vault/data/diseases/truyen-nhiem.json`

```json
{
  "id": "sot_ret",
  "ten": "Sốt Rét (Malaria / P. falciparum, P. vivax, P. knowlesi, P. malariae)",
  "icd": "B50",
  "nhom": "Truyền nhiễm",
  "baoDong": true,
  "ghiChuBaoDong": "Sốt rét do P. falciparum có thể diễn tiến tối cấp thành Sốt rét ác tính gây tổn thương não, phù phổi cấp ARDS, sốc, suy thận cấp và tử vong nhanh chóng nếu không tiêm Artesunat tĩnh mạch khẩn cấp.",
  "tomTat": "Bệnh truyền nhiễm do ký sinh trùng Plasmodium lây qua muỗi Anopheles. Đặc trưng bởi cơn sốt chu kỳ 3 giai đoạn (rét run - sốt cao - vã mồ hôi), lách to và thiếu máu. Điều trị ưu tiên bằng thuốc ACT (Pyramax 3 ngày) phối hợp Primaquin diệt thể ẩn và giao bào theo QĐ 3377/QĐ-BYT.",
  "danSo": {
    "gioiTinh": "any",
    "tuoiMin": 0,
    "tuoiMax": 120
  },
  "dd": [
    ["kstsr_lam_giemsa_pos", 5.0, "dt"],
    ["rdt_malaria_pos", 4.5, "dt"],
    ["sot_con_ret_run_va_mo_hoi", 4.0, "gy"],
    ["yeu_to_dich_te_sot_ret", 3.5, "gy"],
    ["lach_to_lam_sang", 2.0, "ht"],
    ["thieu_mau_da_xanh_niem_nhot", 1.5, "ht"],
    ["giam_tieu_cau_sot_ret", 1.0, "ht"],
    ["dau_dau_dau_moi_co", 1.0, "ht"],
    ["ns1_dengue_pos", -2.0, "loaitru"]
  ],
  "phacDo": {
    "tuyen": [
      "Trạm Y tế xã / Y tế thôn bản: Làm test nhanh RDTs hoặc lấy lam máu gửi soi kính hiển vi. Nếu sốt rét thể thông thường: cấp phát thuốc ACT phối hợp đường uống (Pyramax 3 ngày) KÈM Primaquin ngày 1. Nếu có bất kỳ dấu hiệu cảnh báo ác tính hoặc nôn không uống được: tiêm ngay 1 liều Artesunat 2.4 mg/kg IV hoặc IM rồi chuyển viện khẩn cấp.",
      "Bệnh viện Huyện / Trung tâm Y tế: Soi lam Giemsa xác định loài KSTSR và đếm mật độ KST/µL máu. Định lượng men G6PD trước khi dùng Primaquin dài ngày (cho P. vivax). Điều trị nội trú sốt rét có dấu hiệu cảnh báo bằng Artesunat tiêm tĩnh mạch (H0, H12, H24) cho đến khi tỉnh và chuyển sang đường uống.",
      "Bệnh viện Tỉnh / Trung ương: Hồi sức tích cực sốt rét ác tính tại ICU: Đặt nội khí quản thở máy PEEP nếu có ARDS hoặc phù phổi cấp; Lọc máu liên tục (CRRT) nếu suy thận cấp/toan chuyển hóa nặng; Điều trị hạ đường huyết khẩn cấp bằng Glucose 30%; Truyền khối hồng cầu nếu thiếu máu nặng kèm mật độ KSTSR cao."
    ],
    "thuoc": [
      ["Pyronaridin tetraphosphat - artesunat (Pyramax 180mg/60mg)", "Uống 1 lần/ngày x 3 ngày liên tục (20-<24kg: 1 gói; 24-<45kg: 2 viên; 45-<65kg: 3 viên; >=65kg: 4 viên)", "Thuốc ACT ưu tiên hàng đầu cho P. falciparum, P. vivax, P. malariae, P. knowlesi thể thông thường theo hướng dẫn Bộ Y tế 2023"],
      ["Artesunat lọ 60mg (Tiêm tĩnh mạch / Tiêm bắp)", "2,4 mg/kg IV tại H0, H12, sau đó 2,4 mg/kg/ngày (Trẻ < 20kg: liều 3,0 mg/kg/lần IV)", "Thuốc cấp cứu đầu tay tuyệt đối cho Sốt rét ác tính và Sốt rét có dấu hiệu cảnh báo nguy hiểm"],
      ["Primaquin 7,5mg base (Đường uống sau ăn)", "P. falciparum: 0,25 mg base/kg 1 liều duy nhất ngày 1 để diệt giao bào chống lây lan. P. vivax: 0,25 mg/kg/ngày x 14 ngày (khi G6PD bình thường)", "Chống chỉ định cho trẻ < 6 tháng tuổi, phụ nữ có thai. Phải kiểm tra men G6PD trước khi dùng"],
      ["Quinin dihydrochlorid 500mg/ống", "Truyền tĩnh mạch 20 mg/kg trong 8 giờ đầu, sau đó 10 mg/kg mỗi 8 giờ (pha Glucose 5%)", "Chỉ định cấp cứu cho phụ nữ mang thai 3 tháng đầu bị sốt rét ác tính"],
      ["Glucose 30% & Glucose 10%", "Tiêm tĩnh mạch chậm 20-50 mL Glucose 30% cấp cứu hạ đường huyết (< 2.2 mmol/L), duy trì Glucose 10%", "Bắt buộc theo dõi đường huyết mao mạch thường xuyên ở bệnh nhân sốt rét nặng"]
    ],
    "theoDoi": [
      "Soi lam máu nhuộm Giemsa kiểm tra KSTSR hàng ngày đến khi âm tính 2 ngày liên tiếp.",
      "Theo dõi sát tri giác (Glasgow/Blantyre), SpO2, lượng nước tiểu mỗi 2-4 giờ.",
      "Kiểm tra đường huyết mao mạch mỗi 2-4 giờ (hoặc mỗi 1 giờ nếu dùng Quinin tiêm).",
      "Tái khám và xét nghiệm máu vào các ngày D14, D28 và D42 để đánh giá tái phát."
    ],
    "luuY": [
      "KHÔNG ĐƯỢC CHUYỂN VIỆN bệnh nhân đang sốc, phù phổi cấp hoặc co giật chưa kiểm soát được mà phải hồi sức ổn định tại chỗ.",
      "Tuyệt đối không dùng Primaquin cho phụ nữ mang thai, trẻ em dưới 6 tháng tuổi và người thiếu men G6PD nặng (< 30%).",
      "Nếu người bệnh nôn trong vòng 30 phút sau khi uống thuốc sốt rét, bắt buộc phải uống bù lại 1 liều đầy đủ."
    ],
    "nguon": [
      "Quyết định số 3377/QĐ-BYT ngày 06 tháng 9 năm 2023 của Bộ trưởng Bộ Y tế Việt Nam"
    ]
  }
}
```

Prompt 07
---

title: "Ca lâm sàng Sốt rét thể thông thường do Plasmodium falciparum ở bệnh nhân nam 32 tuổi đi rừng rẫy về"
caseId: "soap-sot_ret-01"
specialty: "Truyền nhiễm"
experienceLevel: "essential"
difficultyRating: 3
authorDoctor: "Hội đồng Khoa học CliniPortal DocSpace"
icd10:

- "B50"
- "B50.9"
tags:
- "Truyền nhiễm"
- "Sốt rét"
- "SOAP"
- "Plasmodium falciparum"
- "Pyramax"
- "Primaquin"
- "G6PD"
- "Anopheles"
demographicContext: "Nam 32 tuổi, công nhân cạo mủ cao su, có tiền sử ngủ rừng rẫy ở vùng lưu hành Tây Nguyên - Bình Phước"
historyPearls: "⚡ BÀI HỌC KHAI THÁC BỆNH SỬ: Bất kỳ bệnh nhân nào sốt cấp tính có tiền sử đi vào rừng, ngủ rẫy hoặc trở về từ vùng sốt rét lưu hành trong vòng 14 ngày qua đều phải nghĩ đến Sốt rét trước tiên và chỉ định xét nghiệm lam máu/RDTs ngay."
objectivePitfalls: "⚠️ BẪY CẬN LÂM SÀNG & KHÁM: Không được dựa vào sốt rét chỉ giảm tiểu cầu mà chẩn đoán nhầm thành Sốt xuất huyết Dengue. Bắt buộc phải soi lam máu nhuộm Giemsa (tiêu chuẩn vàng) và định lượng G6PD trước khi kê đơn Primaquin để tránh cơn tan máu ồ ạt."
diagnosticPearls: "🧠 ĐÚC KẾT BIỆN LUẬN: Cơn sốt rét điển hình diễn tiến 3 giai đoạn (Rét run -> Sốt cao nóng bừng -> Vã mồ hôi hạ nhiệt) có tính chu kỳ kết hợp lách to là triệu chứng kinh điển. Phải rà soát toàn diện 6 cờ đỏ ác tính để kịp thời chuyển tuyến điều trị Artesunat tiêm tĩnh mạch."
takeawayLessons: "🎯 BÀI HỌC KINH NGHIỆM ĐIỀU TRỊ: Điều trị ACT đường uống (Pyramax 3 ngày) sớm giúp cắt sốt và sạch ký sinh trùng nhanh chóng; bắt buộc phối hợp Primaquin ngày đầu để diệt giao bào P. falciparum cắt đứt nguồn lây cho muỗi Anopheles trong cộng đồng."
sourceReference: "Quyết định số 3377/QĐ-BYT ngày 06/09/2023 của Bộ trưởng Bộ Y tế Việt Nam"
clinicalContext: "Phòng khám Đa khoa Khu vực / Bệnh viện Đa khoa Huyện vùng biên giới"
updated: "2026-09-14"

---

### 🩺 Ca Lâm Sàng: Sốt Rét Thể Thông Thường Do Plasmodium falciparum

**Bối cảnh**: Bệnh nhân nam 32 tuổi, công nhân cạo mủ cao su, đến khám tại Phòng khám Đa khoa Khu vực vì sốt cao từng cơn kèm rét run dữ dội và vã mồ hôi 3 ngày nay sau khi đi làm rẫy ở rừng về.

---

#### 1. 📝 S — CHỦ QUAN / SUBJECTIVE

* **Lý do đến khám**: Sốt cao từng cơn kèm rét run lập cập và vã mồ hôi đầm đìa 3 ngày nay.
- **Bệnh sử chi tiết**:
  - Cách nhập viện 3 ngày, bệnh nhân đột ngột cảm thấy gai rét dọc sống lưng, sau đó rét run toàn thân dữ dội, hai hàm răng đánh lập cập, phải trùm 3 lớp chăn bông dày dù thời tiết bên ngoài oi bức. Giai đoạn rét run kéo dài khoảng 45 phút.
  - Tiếp theo, bệnh nhân chuyển sang giai đoạn sốt cao nóng bừng, tung chăn, mặt đỏ bừng, nhiệt độ cặp nách lên đến 39.5°C, nhức đầu hai bên thái dương dữ dội như búa bổ, khát nước nhiều, buồn nôn, đau nhức mỏi các khớp xương và cơ bắp toàn thân. Giai đoạn này kéo dài khoảng 3 giờ.
  - Sau đó, mồ hôi toát ra đầm đìa ướt sũng áo quần, nhiệt độ hạ nhanh về mức 37.0°C, bệnh nhân cảm thấy nhẹ nhõm, bớt nhức đầu nhưng người mệt lả và thiếp đi ngủ.
  - Cơn sốt xuất hiện cách nhật (khoảng 48 giờ lặp lại một cơn). Bệnh nhân có tự uống Paracetamol tại nhà nhưng cơn sốt vẫn tái diễn đúng chu kỳ. Không ho, không khó thở, không đau bụng khu trú, nước tiểu vàng sẫm đóng khuôn bình thường.
- **Tiền căn**:
  - *Yếu tố dịch tễ*: Bệnh nhân là công nhân làm rẫy cao su. Cách đây 2 tuần có đi làm rẫy và ngủ lại trong rừng tại khu vực biên giới huyện Bù Gia Mập (tỉnh Bình Phước) trong 10 ngày, ngủ lán trại không mắc màn tẩm hóa chất, bị muỗi rừng đốt rất nhiều lần vào ban đêm.
  - *Bệnh tật*: Chưa từng mắc sốt rét trước đây. Không có bệnh nền tim mạch, gan, thận hay đái tháo đường.
  - *Gia đình*: Không ai trong gia đình có tiền sử thiếu máu tán huyết bẩm sinh hay thiếu hụt men G6PD.
  - *Dị ứng*: Không có tiền sử dị ứng thuốc hay thức ăn.

---

#### 2. 🔬 O — KHÁCH QUAN / OBJECTIVE

* **Khám Sinh hiệu (Vitals)**:
  - Nhiệt độ: **39.2 °C** (đang ở giai đoạn sốt nóng)
  - Mạch: **104 lần/phút** (đều, rõ, phù hợp với thân nhiệt)
  - Huyết áp: **110/70 mmHg** (MAP = 83 mmHg, tư thế nằm)
  - Nhịp thở: **20 lần/phút** (đều, không co kéo)
  - SpO2: **98%** (thở khí trời)
  - Thể trạng: Chiều cao 168 cm, Cân nặng 58 kg ➔ **BMI = 20.5 kg/m²**
- **Khám Thực thể**:
  - *Toàn thân*: Bệnh nhân tỉnh táo hoàn toàn, tiếp xúc tốt, định hướng không gian thời gian chính xác, **Glasgow 15 điểm**. Da niêm mạc hơi nhợt nhẹ, củng mạc mắt không vàng, không xuất huyết dưới da hay niêm mạc. Không có vết loét hoại tử do mò đốt (eschar (-)). Không phù chân. Tuyến giáp không to, hạch ngoại vi không sờ chạm.
  - *Khám Bụng*: Bụng thon đều, di động theo nhịp thở, không chướng. Gan mấp mé bờ sườn phải (chiều cao gan đường trung đòn phải 10 cm, bờ mềm, ấn không đau). **Lách to độ I** (cực dưới lách sờ chạm dưới bờ sườn trái khoảng 1.5 cm khi hít sâu, mật độ mềm, ấn tức nhẹ). Dấu hiệu sóng vỗ (-), gõ đục vùng thấp (-).
  - *Tim mạch & Hô hấp*: Tim đều, T1 T2 rõ, tần số 104 l/p, không tiếng thổi bệnh lý. Phổi thông khí tốt 2 bên, rì rào phế nang êm dịu, không rale.
  - *Thần kinh & Cơ xương khớp*: Cổ mềm, dấu Kernig (-), dấu Brudzinski (-), không có dấu hiệu thần kinh khu trú. Đồng tử 2 bên 2.5 mm, phản xạ ánh sáng nhạy. Các khớp không sưng nóng đỏ.
- **Cận lâm sàng Định lượng (Labs & Imaging)**:
  - *Ký sinh trùng học (Tiêu chuẩn vàng)*:
    - **Soi lam máu nhuộm Giemsa**:
      - Giọt dày: Phát hiện ký sinh trùng sốt rét thể vô tính (trophozoite dạng nhẫn).
      - Giọt mỏng: Xác định loài **Plasmodium falciparum** (thể nhẫn nhỏ thanh mảnh chiếm 1/5-1/6 đường kính hồng cầu, nhiều hồng cầu có nhiễm kép 2 thể nhẫn, có hình thể dính rìa tế bào Maurer; chưa thấy thể giao bào hình liềm/chuối).
      - Mật độ KSTSR: **+++ (khoảng 42.000 KST/µL máu)** ➔ *Chưa đạt ngưỡng cảnh báo ác tính (>= 100.000 KST/µL)*.
    - **Test chẩn đoán nhanh RDTs (Pf/Pan)**: Vạch kháng nguyên **HRP-2 (P.f) Dương tính (+)**; Vạch Pan-pLDH Dương tính (+).
  - *Huyết học & Men G6PD*:
    - **Định lượng hoạt độ men G6PD**: **9.8 U/g Hb** (Trị số bình thường: 7.0 - 14.0 U/g Hb) ➔ *Hoạt độ G6PD bình thường (> 70%), an toàn tuyệt đối khi sử dụng Primaquin*.
    - Bạch cầu (WBC): 5.8 G/L (Neutrophil 64%, Lymphocyte 26%, Monocyte 8%)
    - Hồng cầu (RBC): 3.82 T/L
    - Huyết sắc tố (Hb): **11.2 g/dL** (Thiếu máu nhẹ do tán huyết)
    - Hematocrit (Hct): **34%**
    - Tiểu cầu (PLT): **96 G/L** (Giảm nhẹ tiểu cầu do bắt giữ tại lách và tiêu thụ miễn dịch)
  - *Sinh hóa chức năng gan, thận, chuyển hóa*:
    - AST (GOT): **42 U/L** (Tăng nhẹ)
    - ALT (GPT): **38 U/L** (Trong giới hạn bình thường)
    - Bilirubin toàn phần: 18.4 µmol/L; Bilirubin trực tiếp: 5.2 µmol/L (Chưa vàng da)
    - Creatinine máu: **82 µmol/L** ➔ **eGFR = 102 mL/phút/1.73m²** (Chức năng thận bảo tồn tốt)
    - Ure máu: 5.4 mmol/L
    - **Đường huyết mao mạch tại giường**: **5.4 mmol/L** (Không hạ đường huyết)
    - Điện giải đồ: Na+ 137 mmol/L, K+ 3.9 mmol/L, Cl- 101 mmol/L
    - Lactate máu: **1.6 mmol/L** (Không có toan chuyển hóa)
  - *Tổng phân tích nước tiểu*:
    - Tỷ trọng 1.020, pH 6.0, Protein (-), Hồng cầu (-), Hemoglobin niệu (-), Urobilinogen bình thường. Nước tiểu vàng trong, thể tích 1.500 mL/24h.
  - *Chẩn đoán hình ảnh*:
    - **Siêu âm bụng tổng quát**: Lách to nhẹ (chiều dài lách 125 mm, bề dày 45 mm, nhu mô đồng nhất). Gan kích thước bình thường. Không có dịch tự do trong ổ bụng.
    - **X-quang ngực thẳng**: Nhu mô phổi sáng đều hai bên, không thâm nhiễm, không có hình ảnh phù phổi cấp hay tổn thương dạng ARDS. Chỉ số tim ngực trong giới hạn bình thường.

---

#### 3. 🧠 A — ĐÁNH GIÁ / ASSESSMENT

##### Bảng Đặt Vấn Đề (Problem List · 3 Tầng Ưu Tiên Chuẩn Y Khoa)

| Mức độ ưu tiên | Vấn đề lâm sàng (Tổ hợp triệu chứng) | Chiến lược chẩn đoán (CLS đề nghị) | Hướng xử trí ban đầu & Cấp cứu |
| :--- | :--- | :--- | :--- |
| 🔴 **Tầng 1: Đe dọa tính mạng** | *Chưa ghi nhận cờ đỏ ác tính* (Glasgow 15 điểm, không co giật, không khó thở SpO2 98%, không sốc, không đái huyết cầu tố) | - Theo dõi sát tri giác & sinh hiệu mỗi 4h <br>- Đo đường huyết mao mạch <br>- Soi lam Giemsa đếm KST/ngày | - Chuẩn bị sẵn Artesunat tiêm 60mg cấp cứu nếu chuyển ác tính <br>- Theo dõi sát nước tiểu |
| 🟡 **Tầng 2: Cấp tính** | **Hội chứng Nhiễm ký sinh trùng Sốt rét do P. falciparum**: <br>- Cơn sốt rét chu kỳ 3 giai đoạn ngày 3 <br>- Giemsa: P. falciparum +++ (42.000 KST/µL) <br>- RDTs HRP-2 (+) <br>- Lách to độ I, PLT giảm 96 G/L | - Soi lam máu nhuộm Giemsa đếm KSTSR <br>- Test nhanh RDTs (Pf/Pan) <br>- Định lượng hoạt độ men G6PD <br>- Công thức máu, Men gan, Creatinine | **Chỉ định phác đồ ACT đường uống**: <br>- Pyramax (Pyronaridin/Artesunat) x 3 ngày <br>- Primaquin ngày 1 diệt giao bào (sau khi G6PD bình thường) <br>- Hạ sốt Paracetamol |
| 🔵 **Tầng 3: Mạn tính / Dịch tễ** | **Yếu tố dịch tễ vùng rừng rẫy lưu hành** (Bình Phước) & Thiếu máu tán huyết nhẹ (Hb 11.2 g/dL) | - Khai thác tiền sử ngủ rừng, muỗi đốt <br>- Siêu âm ổ bụng đánh giá lách to <br>- Phân tích nước tiểu loại trừ đái huyết cầu tố | - Tư vấn phòng chống muỗi Anopheles <br>- Hướng dẫn theo dõi tái phát D14, D28, D42 <br>- Dinh dưỡng nâng đỡ thể trạng |

- **Chẩn đoán xác định**: Sốt rét thể thông thường do Plasmodium falciparum, chưa có biến chứng ác tính, ngày thứ 3.
- **Mã ICD-10**: **B50.9** (Sốt rét do Plasmodium falciparum không biến chứng).
- **Chẩn đoán phân biệt cần loại trừ**:
    1. *Sốt xuất huyết Dengue (ngày 3)*: Cũng biểu hiện sốt cao cấp tính kèm giảm tiểu cầu (PLT 96 G/L), nhưng Dengue thường sốt cao liên tục không thành cơn 3 giai đoạn có rét run lập cập và vã mồ hôi chu kỳ; xét nghiệm NS1Ag âm tính (-), Giemsa phát hiện KSTSR ➔ Loại trừ hoàn toàn.
    2. *Sốt mò (Scrub Typhus)*: Bệnh nhân có tiền sử đi rừng rẫy nhưng không tìm thấy vết loét hoại tử do mò đốt (eschar (-)), không có viêm hạch khu trú hay phát ban dát sẩn ➔ Loại trừ.
    3. *Nhiễm xoắn khuẩn Leptospira (Hội chứng Weil)*: Không có triệu chứng đau cơ bắp chân dữ dội, không sung huyết kết mạc mắt, không có tiền sử lội nước ngập bùn, bilirubin và chức năng thận bình thường ➔ Loại trừ.
    4. *Sốt rét do Plasmodium vivax*: P. vivax gây cơn sốt cách nhật lành tính, nhưng xét nghiệm giọt mỏng xác định rõ đặc điểm hình thái thể nhẫn nhỏ thanh mảnh của P. falciparum kèm test HRP-2 (+) đặc hiệu ➔ Loại trừ đơn nhiễm P. vivax.
- **Phân tầng nguy cơ & Thang điểm lượng giá**:
  - *Thang điểm NEWS2*: **3 điểm** (Nhiệt độ 39.2°C = 2 điểm, Mạch 104 l/p = 1 điểm). Nguy cơ lâm sàng thấp-trung bình, chỉ định nhập viện theo dõi nội trú tại Khoa Truyền nhiễm trong 72 giờ đầu.
  - *Phân độ theo Hướng dẫn Bộ Y tế 2023*: **Độ 1 - Sốt rét thể thông thường (Chưa biến chứng)**. Không có bất kỳ dấu hiệu nào trong 6 cờ đỏ cảnh báo ác tính (tri giác tỉnh táo, tự uống thuốc được, không nôn liên tục, không đau đầu dữ dội, mật độ KST < 100.000/µL, Hb > 7 g/dL).
- **Biện luận lâm sàng chi tiết**:
  - Bệnh nhân hội đủ 3 trụ cột chẩn đoán Sốt rét theo Quyết định 3377/QĐ-BYT năm 2023: (1) Yếu tố dịch tễ đi rừng rẫy tại vùng lưu hành sốt rét (Bình Phước) trong vòng 14 ngày qua; (2) Lâm sàng cơn sốt rét 3 giai đoạn điển hình (rét run -> sốt cao -> vã mồ hôi) lặp lại chu kỳ cách nhật kèm lách to độ I; (3) Tiêu chuẩn vàng soi lam máu Giemsa thấy thể tư dưỡng P. falciparum (+++, 42.000 KST/µL) và test RDTs HRP-2 (+).
  - Khảo sát toàn diện các cơ quan chưa ghi nhận tổn thương đích: Bệnh nhân tỉnh táo hoàn toàn (Glasgow 15), SpO2 98%, huyết áp ổn định 110/70 mmHg, Creatinine 82 µmol/L, Glucose máu 5.4 mmol/L, Lactate 1.6 mmol/L, không có đái huyết cầu tố ➔ Đủ điều kiện điều trị bằng phác đồ thuốc ACT đường uống (Pyramax 3 ngày).
  - Kết quả định lượng men G6PD đạt 9.8 U/g Hb (> 70% mức bình thường) ➔ Cho phép chỉ định an toàn thuốc Primaquin liều duy nhất vào Ngày thứ 1 để diệt giao bào P. falciparum, triệt tiêu nguy cơ lây truyền mầm bệnh cho muỗi Anopheles tại cộng đồng.

---

#### 4. 📋 P — KẾ HOẠCH / PLAN

- **Định hướng quản lý**: Điều trị nội trú tại Khoa Truyền nhiễm - Bệnh viện Đa khoa Huyện trong 3-4 ngày đầu để giám sát chặt chẽ sự dung nạp thuốc, theo dõi tốc độ sạch KSTSR và phòng ngừa tiến triển thành sốt rét ác tính.
- **Mục tiêu điều trị**:
    1. Cắt cơn sốt nhanh chóng trong vòng 24 - 48 giờ sau khi khởi động thuốc ACT.
    2. Làm sạch hoàn toàn ký sinh trùng sốt rét thể vô tính trong máu (Clearance of parasitemia) sau 48 - 72 giờ, xét nghiệm lam máu âm tính vào ngày D3.
    3. Tiêu diệt giao bào P. falciparum bằng Primaquin để ngăn ngừa lây truyền bệnh cho véc-tơ muỗi Anopheles trong cộng đồng.
    4. Giám sát chặt chẽ, ngăn ngừa biến chứng sốt rét ác tính thể não, suy hô hấp ARDS và suy thận cấp.

##### Y lệnh thuốc điều trị (Chuẩn Quyết định 3377/QĐ-BYT ngày 06/09/2023)

1. **Pyronaridin tetraphosphat 180mg / Artesunat 60mg (Pyramax viên nén)**:
    - *Liều dùng*: Uống **3 viên duy nhất một lần trong ngày** (cho người bệnh 58 kg - nhóm cân nặng 45 đến < 65 kg).
    - *Thời gian điều trị*: **3 ngày liên tục** (Ngày 1, Ngày 2, Ngày 3). Tổng cộng 9 viên.
    - *Cách dùng*: Uống vào một thời điểm cố định trong ngày, uống sau bữa ăn cùng một ly nước đầy.
    - *Ghi chú dược lâm sàng*: Thuốc ACT toàn diện thế hệ mới ưu tiên hàng đầu của Bộ Y tế. Nếu bệnh nhân nôn trong vòng 30 phút sau uống, phải uống lại 1 liều khác thay thế; nếu nôn sau 30-60 phút, uống lại nửa liều.

2. **Primaquin phosphat 13.2mg (tương đương 7.5mg Primaquin base)**:
    - *Liều dùng*: Uống **2 viên** (tương đương 15mg base, liều 0.25 mg base/kg) **một liều duy nhất vào Ngày thứ 1**.
    - *Cách dùng*: Uống sau khi ăn no.
    - *Mục đích*: Diệt giao bào P. falciparum ngăn chặn chu kỳ lây truyền bệnh cho muỗi Anopheles.
    - *Căn cứ an toàn*: Hoạt độ men G6PD bệnh nhân đạt 9.8 U/g Hb (> 70% bình thường), an toàn tuyệt đối.

3. **Paracetamol 500mg**:
    - *Liều dùng*: 1 viên uống khi sốt cao >= 38.5°C, cách nhau tối thiểu 4-6 giờ (không quá 4 viên/24 giờ).
    - *Chống chỉ định*: Không dùng Aspirin hoặc Ibuprofen/NSAIDs do bệnh nhân đang có giảm tiểu cầu cấp (PLT 96 G/L).

4. **Dung dịch Oresol (ORS 245 mOsm/L)**:
    - *Liều dùng*: Pha 1 gói trong đúng 1.000 mL nước đun sôi để nguội, uống rải rác 1.500 - 2.000 mL/ngày để bù nước và điện giải mất qua mồ hôi.

##### Chỉ tiêu theo dõi & Kế hoạch cận lâm sàng

* **Theo dõi tại giường**:
  - Đo sinh hiệu (Mạch, Huyết áp, Nhiệt độ, Nhịp thở, SpO2) mỗi 4 giờ trong 48 giờ đầu.
  - Đánh giá tri giác (thang điểm Glasgow) và lượng nước tiểu 24 giờ mỗi ca trực.
  - Báo cáo bác sĩ ngay lập tức nếu xuất hiện bất kỳ dấu hiệu cảnh báo ác tính nào: Lơ mơ, li bì, nôn liên tục không uống được, khó thở, SpO2 < 95%, hoặc nước tiểu chuyển sang màu nước vối/đen.
  - Kiểm tra đường huyết mao mạch tại giường vào mỗi buổi sáng hoặc khi người bệnh có triệu chứng vã mồ hôi run rẩy bất thường.
- **Xét nghiệm ký sinh trùng học**:
  - **Soi lam máu nhuộm Giemsa kiểm tra KSTSR mỗi 24 giờ** vào các ngày **D1, D2, D3** cho đến khi xét nghiệm âm tính 2 ngày liên tiếp.
  - Kiểm tra lại Công thức máu (CTM), Tiểu cầu và Men gan vào ngày D3 trước khi cho xuất viện.
- **Lịch hẹn tái khám và theo dõi sau xuất viện**:
  - Tái khám và lấy lam máu kiểm tra KSTSR vào các ngày **D14, D28 và D42** (tiêu chuẩn đánh giá hiệu lực điều trị và phát hiện tái phát của WHO/BYT).

##### Tư vấn & Giáo dục sức khỏe người bệnh (Teach-Back)

1. *Tuân thủ uống thuốc*: Giải thích cho người bệnh tầm quan trọng của việc uống đủ 3 ngày thuốc Pyramax, tuyệt đối không được bỏ thuốc khi thấy hết sốt ở ngày thứ 2.
2. *Nhận biết dấu hiệu nguy hiểm*: Hướng dẫn người bệnh và người nhà theo dõi màu sắc nước tiểu; nếu thấy nước tiểu chuyển màu đỏ sẫm hoặc đen như nước vối, hoặc người mệt lả, vàng mắt, phải báo ngay cho nhân viên y tế (nguy cơ cơn tan máu cấp hoặc đái huyết cầu tố).
3. *Biện pháp phòng ngừa sốt rét cá nhân*:
    - Luôn ngủ trong màn (mùng) tẩm hóa chất xua diệt muỗi tồn lưu dài hạn, kể cả khi ngủ ở nhà hay ngủ lại trong lán rẫy.
    - Mặc quần áo dài tay và thoa kem xua muỗi khi phải đi rừng rẫy vào chiều tối và sáng sớm (thời điểm muỗi Anopheles hoạt động mạnh nhất).
    - Phát quang bụi rậm, khơi thông cống rãnh, lật úp các dụng cụ chứa nước quanh nơi ở để triệt phá nơi muỗi sinh sản.
    - Khi có sốt trở lại sau khi đi rừng, phải đến ngay cơ sở y tế gần nhất để xét nghiệm máu tìm KSTSR, không được tự ý mua thuốc hạ sốt điều trị tại nhà.

---

## 📚 TRÍCH DẪN TÀI LIỆU THAM KHẢO CHUẨN EBM

1. **Bộ Y tế Việt Nam**. *Quyết định số 3377/QĐ-BYT ngày 06/09/2023 về việc ban hành Hướng dẫn Chẩn đoán và Điều trị bệnh Sốt rét*. Hà Nội, 2023.
2. **Bộ Y tế Việt Nam**. *Quyết định số 4922/QĐ-BYT ngày 25/10/2021 về việc sửa đổi, bổ sung Hướng dẫn Chẩn đoán và Điều trị bệnh Sốt rét*. Hà Nội, 2021.
3. **World Health Organization (WHO)**. *WHO Guidelines for malaria - 16 October 2024*. Geneva: World Health Organization, 2024. Available from: <https://www.who.int/publications/i/item/guidelines-for-malaria>.
4. **Centers for Disease Control and Prevention (CDC)**. *Treatment of Malaria: Guidelines for Clinicians (United States)*. Updated 2024. Available from: <https://www.cdc.gov/malaria/diagnosis_treatment/treatment.html>.
