Prompt 06

```markdown
### ==============================================================================
### CLINIPORTAL DOCSPACE — PROMPT 06: BỘ DỮ LIỆU LÂM SÀNG & TRỌNG SỐ SUY LUẬN CDSS
### MẶT BỆNH: SỐT XOẮN KHUẨN LEPTOSPIRA (LEPTOSPIROSIS / BỆNH WEIL)
### ==============================================================================

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📌 THÔNG SỐ ĐẦU VÀO ĐÃ CẤU HÌNH CHO BỆNH LEPTOSPIRA:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
*  [TÊN BỆNH LÝ]: Sốt xoắn khuẩn Leptospira (Leptospirosis / Bệnh Weil)
*  [MÃ ICD-10]: A27 (A27.0 - Icterohemorrhagic leptospirosis / Weil's disease, A27.8, A27.9)
*  [CHUYÊN KHOA]: Truyền nhiễm / Cấp cứu - Hồi sức tích cực
*  [HƯỚNG DẪN THAM CHIẾU]:
   1. National Guidelines for Diagnosis, Case Management, Prevention and Control of Leptospirosis - NCDC India (2015)
   2. Clinical Practice Guidelines on Leptospirosis in Children - PPS & PIDSP (2019)
   3. WHO Background Document for Drinking-water Quality: Leptospira (2025)
*  [THỂ BỆNH MẪU CẦN TẠO]: Leptospirosis thể nặng / Bệnh Weil (Icteric Leptospirosis) có suy đa cơ quan: Suy thận cấp thiểu niệu, vàng da đậm, ho ra máu/thâm nhiễm phổi, giảm tiểu cầu.
*  [CƠ ĐỊA BỆNH NHÂN]: Nam 38 tuổi, nông dân, có tiền sử lội ngập lụt làm ruộng, chân có vết xước trầy da tiếp xúc nước bẩn nhiễm nước tiểu gặm nhấm.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 PROMPT CHUẨN ĐÃ ĐIỀN THÔNG SỐ (DÁN TRỰC TIẾP VÀO NOTEBOOKLM):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
"Bạn là Bác sĩ Giảng viên Lâm sàng kiêm Kỹ sư Thiết kế Động cơ CDSS của CliniPortal DocSpace.
Dựa trên các Hướng dẫn Chẩn đoán & Điều trị Leptospirosis (NCDC 2015, PPS-PIDSP 2019, WHO 2025) đã nạp trong Notebook, hãy xây dựng BỘ DỮ LIỆU CODE LÂM SÀNG HOÀN CHỈNH cho mặt bệnh: Sốt xoắn khuẩn Leptospira (Mã ICD-10: A27, Chuyên khoa: Truyền nhiễm) gồm đúng 2 khối code JSON chuẩn xác sau:

PHẦN 1: Ca bệnh mẫu JSON (Nạp vào sample-clinical-cases.json) cho thể bệnh Weil nặng.
PHẦN 2: Ma trận trọng số suy luận CDSS JSON (Nạp vào clinical-rules-symptoms.json & diseases/truyen-nhiem.json)."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚙️ KẾT QUẢ XUẤT CODE JSON HOÀN CHỈNH TỪ THAM CHIẾU Y HỌC EBM:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### ==============================================================================
### PHẦN 1: CA LÂM SÀNG MẪU THỰC TẾ (Nạp vào: sample-clinical-cases.json)
### ==============================================================================

```json
{
  "ten": "Sốt xoắn khuẩn Leptospira thể nặng / Bệnh Weil (Sốt, Vàng da, Suy thận Cr 285 µmol/L, PLT 45 G/L)",
  "sel": [
    "tiep_xuc_nuoc_ban_ngap_lut",
    "sot_cao_co_giat_ret_run",
    "dau_bap_chan_du_doi",
    "sung_huyet_ket_mac_2_ben",
    "vang_da_niem_mac_tang_bilirubin",
    "thieu_nieu_co_la_colored_urine",
    "ho_ra_mau_xuat_huyet_phoi",
    "cls_plt_giam_sau",
    "cls_creatinine_tang_cao",
    "cls_cpk_tang_cao",
    "cls_mat_duong_tinh"
  ],
  "vitals": {
    "vNhiet": "39.4",
    "vMach": "116",
    "vHATT": "90",
    "vHATTr": "60",
    "vTho": "26",
    "vSpo2": "93"
  },
  "labs": {
    "lBC": "14.8",
    "lTC": "45",
    "lHct": "34",
    "lGlu": "6.2",
    "lTrop": "18"
  },
  "selected": [
    "tiep_xuc_nuoc_ban_ngap_lut",
    "sot_cao_co_giat_ret_run",
    "dau_bap_chan_du_doi",
    "sung_huyet_ket_mac_2_ben",
    "vang_da_niem_mac_tang_bilirubin",
    "thieu_nieu_co_la_colored_urine",
    "ho_ra_mau_xuat_huyet_phoi",
    "cls_plt_giam_sau",
    "cls_creatinine_tang_cao",
    "cls_cpk_tang_cao",
    "cls_mat_duong_tinh"
  ],
  "negated": [
    "sot_dengue_ns1_ag_duong_tinh",
    "ky_sinh_truung_sot_ret_duong_tinh"
  ],
  "epiContext": {
    "endemicArea": "Việt Nam và các nước nhiệt đới là vùng dịch tễ lưu hành cao của Leptospira",
    "outbreakAlert": "Đang có đợt ngập lụt bùng phát dịch bệnh truyền nhiễm sau mưa bão tại địa phương",
    "vectorExposure": "Tiếp xúc trực tiếp với nước ngập lụt, bùn đất bẩn bị nhiễm nước tiểu của chuột và gia súc",
    "seasonalContext": "Mùa mưa lũ (tháng 6–11), xuất hiện nhiều ca bệnh sốt sau ngập úng đô thị và nông thôn"
  },
  "form": {
    "gioiTinh": "nam",
    "tuoi": "38",
    "ngheNghiep": "Nông dân",
    "lyDo": "Sốt cao ngày thứ 5 kèm đau bắp chân dữ dội, vàng da mắt, ho hắt ra đờm lẫn máu và tiểu ít nước tiểu màu trà đậm",
    "text": {
      "cn": "Bệnh nhân nam 38 tuổi, khởi phát sốt cao đột ngột 39.5°C kèm rét run, đau đầu dữ dội vùng trán và đặc biệt đau nhức cơ bắp chân, cơ thắt lưng dữ dội khiến bệnh nhân không thể tự đi lại được. Đến ngày thứ 4, bệnh nhân xuất hiện vàng mắt, vàng da tiến triển nhanh, mệt lả, nôn ói, ho hắt đờm vướng vệt máu tươi và lượng nước tiểu giảm dốc đứng (< 300 mL/24h), nước tiểu màu sẫm như nước chè đặc.",
      "tt": "Bệnh nhân tỉnh, tiếp xúc chậm, tri giác lơ mơ nhẹ (E3V4M6). Da niêm mạc vàng đậm, sung huyết kết mạc mắt 2 bên rất rõ (đỏ mắt không có tiết dịch mủ). Xuất huyết dạng chấm rải rác ở cẳng tay, cẳng chân. Khám cơ: ấn chẩn bắp chân 2 bên bệnh nhân đau chói. Tim đều nhịp nhanh 116 lần/phút, T1 T2 rõ. Phổi thông khí 2 bên giảm nhẹ, nghe rải rác rale ẩm ở 2 đáy phổi. Gan to 2.5 cm dưới bờ sườn, ấn tức nhẹ. Ấn điểm niệu quản không đau, cầu bàng quang (-).",
      "tc": "Khỏe mạnh, làm nghề nông. Cách vào viện 10 ngày có đi lội ngập lụt dọn ruộng sau mưa bão, chân có vết xước trầy da. Không có tiền sử bệnh lý gan thận mạn tính trước đây.",
      "cls": "Công thức máu: WBC 14.8 G/L (Neutrophil 86%), RBC 3.8 T/L, Hb 11.2 g/dL, Hct 34%, PLT giảm sâu 45 G/L. Sinh hóa máu: Creatinine 285 µmol/L (tăng cao cấp tính), Urea 21.4 mmol/L, Bilirubin toàn phần 88.5 µmol/L (Bilirubin trực tiếp 62.1 µmol/L), AST 142 U/L, ALT 58 U/L (Tỷ lệ AST/ALT > 2), CPK tăng rất cao 1,250 U/L. Đông máu: PT 16.8 giây (INR 1.42). Tổng phân tích nước tiểu: Protein 2+, RBC 3+, WBC 1+. Test nhanh IgM ICT Leptospira (Leptocheck-WB) (+), Xét nghiệm khẳng định MAT (Microscopic Agglutination Test) danh giá kháng thể Titer 1:400 (+). Test nhanh NS1 Dengue (-), KST Sốt rét (-)."
    }
  }
}
```

### ==============================================================================

### PHẦN 2: MA TRẬN TRỌNG SỐ SUY LUẬN CDSS (Nạp vào CSDL Tri thức)

### ==============================================================================

#### 1. Bổ sung triệu chứng vào tệp `src/content/knowledge-vault/data/clinical-rules-symptoms.json`

```json
[
  {
    "id": "tiep_xuc_nuoc_ban_ngap_lut",
    "ten": "Tiền sử lội nước bẩn, bùn lầy, ngập lụt hoặc tiếp xúc động vật gặm nhấm (chuột/chuồng trại)",
    "nhom": "Dịch tễ",
    "loai": ["cn", "tc"],
    "tuKhoa": ["lội nước", "ngập lụt", "nước bẩn", "chuột", "nước tiểu chuột", "nông dân", "vệ sinh cống rãnh"],
    "map": null
  },
  {
    "id": "dau_bap_chan_du_doi",
    "ten": "Đau nhức cơ bắp chân và cơ thắt lưng dữ dội (ấn đau chói, hạn chế vận động)",
    "nhom": "Toàn thân",
    "loai": ["cn", "tt"],
    "tuKhoa": ["đau bắp chân", "đau cơ", "ấn bắp chân đau", "đau cơ thắt lưng", "calf myalgia"],
    "map": null
  },
  {
    "id": "sung_huyet_ket_mac_2_ben",
    "ten": "Sung huyết kết mạc mắt 2 bên (đỏ mắt không có tiết dịch mủ / Conjunctival suffusion)",
    "nhom": "Mắt",
    "loai": ["tt"],
    "tuKhoa": ["sung huyết kết mạc", "đỏ mắt", "đỏ mắt không mủ", "conjunctival suffusion"],
    "map": null
  },
  {
    "id": "thieu_nieu_co_la_colored_urine",
    "ten": "Thiểu niệu/vô niệu (< 400 mL/24h) kèm nước tiểu sẫm màu như nước chè/màu xá xíu",
    "nhom": "Thận - Tiết niệu",
    "loai": ["cn", "tt"],
    "tuKhoa": ["thiểu niệu", "vô niệu", "tiểu ít", "nước tiểu màu trà", "nước tiểu màu xá xíu", "cola colored urine"],
    "map": null
  },
  {
    "id": "ho_ra_mau_xuat_huyet_phoi",
    "ten": "Ho ra máu, thở nhanh nông, nghe rale ẩm phổi (Hội chứng xuất huyết phổi / ARDS)",
    "nhom": "Hô hấp",
    "loai": ["cn", "tt"],
    "tuKhoa": ["ho ra máu", "haemoptysis", "thâm nhiễm phổi", "xuất huyết phổi", "ARDS"],
    "map": null
  },
  {
    "id": "cls_cpk_tang_cao",
    "ten": "Cận lâm sàng: Creatine Phosphokinase (CPK) tăng cao (> 443 U/L) do tiêu cơ vân/viêm cơ",
    "nhom": "Cận lâm sàng",
    "loai": ["cls"],
    "tuKhoa": ["CPK tăng", "creatine phosphokinase", "tăng cpk"],
    "map": null
  },
  {
    "id": "cls_mat_duong_tinh",
    "ten": "Cận lâm sàng: Xét nghiệm Microscopic Agglutination Test (MAT) dương tính (Titer ≥ 1:100 hoặc tăng 4 lần)",
    "nhom": "Cận lâm sàng",
    "loai": ["cls"],
    "tuKhoa": ["MAT dương tính", "microscopic agglutination test", "xét nghiệm MAT"],
    "map": null
  },
  {
    "id": "cls_plt_giam_sau",
    "ten": "Cận lâm sàng: Tiểu cầu giảm sâu (< 100 G/L)",
    "nhom": "Cận lâm sàng",
    "loai": ["cls"],
    "tuKhoa": ["tiểu cầu giảm", "thrombocytopenia", "plt giảm"],
    "map": {
      "fld": "lTC",
      "op": "<=",
      "val": 100
    }
  },
  {
    "id": "cls_creatinine_tang_cao",
    "ten": "Cận lâm sàng: Creatinine máu tăng cao (> 154 µmol/L hoặc > 1.75 mg/dL)",
    "nhom": "Cận lâm sàng",
    "loai": ["cls"],
    "tuKhoa": ["creatinine tăng", "suy thận cấp", "tăng suy thận"],
    "map": null
  }
]
```

#### 2. Thêm thực thể bệnh vào tệp `src/content/knowledge-vault/data/diseases/truyen-nhiem.json`

```json
{
  "id": "sot-xoan-khuan-leptospira",
  "ten": "Sốt xoắn khuẩn Leptospira (Leptospirosis / Bệnh Weil)",
  "icd": "A27",
  "nhom": "Truyền nhiễm",
  "baoDong": true,
  "ghiChuBaoDong": "CẢNH BÁO BỆNH WEIL / NGUY CƠ TỬ VONG CAO: Bệnh nhân có nguy cơ suy đa cơ quan khẩn cấp (Suy thận cấp thiểu niệu, vàng da tiến triển, ho ra máu/xuất huyết phổi và phản ứng Jarisch-Herxheimer). Cần chuyển ICU và dùng kháng sinh diệt xoắn khuẩn đường tĩnh mạch ngay lập tức!",
  "tomTat": "Bệnh truyền nhiễm cấp tính do xoắn khuẩn Leptospira interrogans lây truyền từ động vật (đặc biệt là chuột, chó, gia súc) sang người qua da/niêm mạc tiếp xúc với nước hoặc đất bẩn nhiễm nước tiểu. Lâm sàng đa dạng từ thể sốt nhẹ anicteric đến thể Weil nặng tử vong cao với tam chứng suy thận, vàng da và xuất huyết.",
  "danSo": {
    "gioiTinh": "any",
    "tuoiMin": 0,
    "tuoiMax": 120
  },
  "dd": [
    ["tiep_xuc_nuoc_ban_ngap_lut", 4.5, "dt"],
    ["cls_mat_duong_tinh", 4.5, "dt"],
    ["dau_bap_chan_du_doi", 4.0, "dt"],
    ["sung_huyet_ket_mac_2_ben", 3.5, "dt"],
    ["thieu_nieu_co_la_colored_urine", 3.5, "gy"],
    ["vang_da_niem_mac_tang_bilirubin", 3.0, "gy"],
    ["ho_ra_mau_xuat_huyet_phoi", 3.0, "gy"],
    ["cls_cpk_tang_cao", 2.5, "ht"],
    ["cls_creatinine_tang_cao", 2.5, "gy"],
    ["cls_plt_giam_sau", 2.0, "ht"],
    ["sot_kem_sot_xuat_huyet_dengue_ns1_duong", -5.0, "loaitru"]
  ],
  "phacDo": {
    "tuyen": [
      "Trạm Y tế / Ngoại trú (Thể nhẹ anicteric không biến chứng): Kháng sinh đường uống Doxycycline 100mg x 2 lần/ngày trong 7 ngày (hoặc Amoxicillin/Ampicillin cho trẻ em < 8 tuổi và phụ nữ mang thai). Bù nước Oresol, Paracetamol hạ sốt.",
      "Bệnh viện Huyện / Nội trú (Thể vừa hoặc có tổn thương tạng): Nhập viện điều trị, chuyển dùng kháng sinh tĩnh mạch Penicillin G hoặc Ceftriaxone. Theo dõi sát lượng nước tiểu, Creatinine, Bilirubin, CPK và X-quang phổi.",
      "Bệnh viện Tỉnh / ICU / Hồi sức cấp cứu (Thể nặng / Bệnh Weil / ARDS): Tiêm tĩnh mạch Benzylpenicillin G 1.5 - 2 triệu IU q6h hoặc Ceftriaxone 1-2g/ngày. Chỉ định lọc máu cấp cứu (Thận nhân tạo/CVVH) khi suy thận vô niệu/u máu cao. Thở máy bảo vệ phổi nếu xuất huyết phổi/ARDS. Cân nhắc Pulse Methylprednisolone."
    ],
    "thuoc": [
      ["Doxycycline", "100 mg x 2 lần/ngày (PO) trong 7 ngày", "Chỉ định cho thể nhẹ/điều trị ngoại trú. Chống chỉ định cho trẻ < 8 tuổi, phụ nữ có thai và cho con bú."],
      ["Ampicillin / Amoxicillin", "Ampicillin/Amoxicillin 500 mg x 4 lần/ngày (PO) x 7 ngày cho phụ nữ có thai/cho con bú; Trẻ em < 8 tuổi: 30–50 mg/kg/ngày chia 3–4 lần (PO) x 7 ngày", "Thành phần thay thế an toàn hàng đầu cho trẻ nhỏ và phụ nữ mang thai."],
      ["Azithromycin", "500 mg/ngày (PO) x 3–5 ngày (người lớn) hoặc 10 mg/kg/ngày (trẻ em)", "Kháng sinh đường uống thay thế hiệu quả cho bệnh nhân dị ứng Penicillin hoặc Tetracycline."],
      ["Benzylpenicillin (Crystalline Penicillin G)", "1.5 – 2.0 triệu IU tiêm tĩnh mạch (IV) mỗi 6 giờ (6 – 8 triệu IU/ngày) x 7 ngày", "Thuốc lựa chọn hàng đầu cho thể nặng/bệnh Weil tại các khoa Hồi sức. Bắt buộc thử phản ứng dị ứng Penicillin trước khi tiêm."],
      ["Ceftriaxone", "1 g – 2 g tiêm tĩnh mạch (IV) x 1 lần/ngày (hoặc 1g IV q6h) x 7 ngày", "Hiệu quả tương đương Penicillin G trong thể nặng, phổ rộng và tiện dụng hơn tại hồi sức."],
      ["Cefotaxime", "1 g tiêm tĩnh mạch (IV) mỗi 6 giờ (hoặc 50–100 mg/kg/ngày ở trẻ em) x 7 ngày", "Giải pháp thay thế nhóm Cephalosporin thế hệ 3 tiêm truyền tĩnh mạch."],
      ["Methylprednisolone (Corticosteroid)", "Liều xung 1000 mg/ngày (IV) trong 3 ngày (hoặc 1-2 mg/kg/ngày)", "Cân nhắc hỗ trợ nhằm giảm tỷ lệ tử vong và ngưng máy thở trong hội chứng xuất huyết phổi nặng (SPHS) / ARDS do Leptospira."]
    ],
    "theoDoi": [
      "Theo dõi mạch, huyết áp, nhịp thở, SpO2 và lượng nước tiểu chính xác mỗi 1–2 giờ (ICU) hoặc mỗi 4 giờ.",
      "Kiểm tra định kỳ hàng ngày: Creatinine, Urea, Điện giải đồ (đặc biệt K+, Mg2+), Bilirubin, AST, ALT, CPK, Công thức máu (Hct, PLT) và X-quang phổi thẳng.",
      "Theo dõi sát dấu hiệu ho ra máu, nhịp thở nông nhanh và tình trạng vàng da niêm mạc."
    ],
    "luuY": [
      "Cảnh giác phản ứng Jarisch-Herxheimer (rét run dữ dội, sốt tăng đột ngột, tụt huyết áp) xuất hiện trong 24 giờ đầu sau khi khởi đầu kháng sinh diệt xoắn khuẩn.",
      "Tránh quá tải dịch truyền ở bệnh nhân suy thận cấp thiểu niệu; tiến hành chạy thận nhân tạo (Hemodialysis) hoặc lọc máu liên tục sớm khi có chỉ định uremia/tăng kali máu.",
      "Dự phòng hóa dược (Chemoprophylaxis): Doxycycline 200 mg/lần/tuần uống trong thời gian ngập lụt cho người làm việc trong môi trường nguy cơ cao."
    ],
    "nguon": [
      "National Guidelines for Prevention and Control of Leptospirosis - NCDC India (2015)",
      "Clinical Practice Guidelines on Leptospirosis in Children - PPS & PIDSP (2019)",
      "WHO Background Document for Drinking-water Quality: Leptospira (2025)",
      "Role of Corticosteroids in Severe Leptospirosis Meta-analysis - J. Clin. Med. (2024)"
    ]
  }
}
```

---

## 📚 TRÍCH DẪN TÀI LIỆU THAM KHẢO CHUẨN EBM

1. National Centre for Disease Control (NCDC). *National Guidelines for Diagnosis, Case Management, Prevention and Control of Leptospirosis*. Directorate General of Health Services, Ministry of Health & Family Welfare, Government of India; 2015.
2. Philippine Pediatric Society (PPS), Pediatric Infectious Disease Society of the Philippines (PIDSP). *Clinical Practice Guidelines on Leptospirosis in Children*. PPS-PIDSP Joint Guideline Writing Panel; 2019.
3. World Health Organization (WHO). *Leptospira: Background document for the WHO Guidelines for drinking-water quality*. Geneva: World Health Organization; 2025.
4. Costa F, Hagan JE, Calcagno J, et al. Global Morbidity and Mortality of Leptospirosis: A Systematic Review. *PLoS Negl Trop Dis*. 2015;9(9):e0003898.
5. Petakh P, Becaye M, Oksenych V, Kamyshnyi O. Treatment options for leptospirosis: current status and future perspectives. *Front Microbiol*. 2024;15:1403765.
6. Petakh P, Isevych V, Oksenych V, Kamyshnyi O. Role of Corticosteroids in Severe Leptospirosis: A Systematic Review and Meta-Analysis. *J Clin Med*. 2024;13(15):4310.
7. Faucher JF, Hoen B, Estavoyer JM. The management of leptospirosis. *Expert Opin Pharmacother*. 2004;5(4):819-827.
8. Tabei K, Win TZ, Kitashoji E, et al. Antibiotic prophylaxis for leptospirosis. *Cochrane Database Syst Rev*. 2024;(2):CD014959.

```

---

Prompt 07
### ==============================================================================
### CLINIPORTAL DOCSPACE — PROMPT 07: SOAP CLINICAL CASE INGESTION GENERATOR
### CHUYÊN BIỆT CHO BỆNH NHIỄM LEPTOSPIRA (HỘI CHỨNG WEIL / LEPTOSPIROSIS)
### ==============================================================================

Dưới đây là cấu trúc **Prompt 07** hoàn chỉnh được thiết kế riêng cho mặt bệnh **Nhiễm Leptospira (Leptospirosis / Hội chứng Weil)**. Prompt này được tối ưu hóa để dán trực tiếp vào Gemini Notebook nhằm sinh ra bài viết ca lâm sàng thực chiến theo chuẩn Markdown Frontmatter S-O-A-P, tích hợp vào Bước 4 (Sổ tay kinh nghiệm & Hội chẩn AI) của hệ sinh thái CliniPortal DocSpace.

---

### 📌 PHẦN 1: THÔNG SỐ ĐẦU VÀO TÙY CHỈNH (LEPTOSPIRA)

* **[TÊN BỆNH LÝ]**: Nhiễm Leptospira thể nặng có tổn thương đa cơ quan (Hội chứng Weil / Severe Leptospirosis).
* **[CHUYÊN KHOA]**: Truyền nhiễm / Bệnh Nhiệt đới / Hồi sức Cấp cứu (ICU).
* **[PHÂN LOẠI CA]**: essential
* **[ĐỘ KHÓ]**: 4 / 5
* **[BỐI CẢNH BỆNH NHÂN]**: Nam 38 tuổi, nông dân làm ruộng lúa tại vùng ngập lụt sau mưa bão, tiền sử lội nước bẩn/bùn bẩn chân trần có vết xước da.
* **[KHOA PHÒNG]**: Khoa Bệnh Nhiệt đới / Khoa Hồi sức Cấp cứu (ICU).
* **[TRỌNG TÂM BIỆN LUẬN]**: 
  1. Nhận diện Tam giác chẩn đoán dịch tễ - lâm sàng: Yếu tố tiếp xúc nguồn nước nhiễm nước tiểu động vật/chuột + Sốt cao đột ngột + Sung huyết kết mạc mắt không tiết dịch (Conjunctival suffusion) + Đau cơ bắp chân dữ dội (Calf muscle tenderness).
  2. Phát hiện sớm các cờ đỏ suy đa cơ quan (Hội chứng Weil): Suy thận cấp (thiểu niệu/vô niệu, Creatinine > 154 µmol/L, BUN > 9.3 mmol/L), Vàng da đậm (Bilirubin > 51.3 µmol/L, tỷ lệ AST/ALT > 3), Xuất huyết phổi (ho ra máu, thâm nhiễm X-quang phổi), Giảm tiểu cầu (< 92 G/L) và Tăng CPK.
  3. Biện luận chẩn đoán phân biệt sắc bén với Sốt xuất huyết Dengue (nghi ngờ giai đoạn thoát huyết tương ngày 4–5), Sốt rét nặng, Nhiễm khuẩn huyết và Viêm gan vi-rút cấp.
  4. Phác đồ điều trị kháng sinh tĩnh mạch liều cao (Penicillin G IV hoặc Ceftriaxone IV) kết hợp hồi sức chức năng sống (thông khí bảo vệ phổi, bù dịch và lọc máu ngoài thận).
* **[HƯỚNG DẪN THAM CHIẾU]**: Hướng dẫn Quốc gia về Chẩn đoán, Xử trí & Phòng chống Bệnh Leptospira - NCDC Ấn Độ 2015, CPG Leptospirosis Philippines (PPS-PIDSP 2019) & WHO Guidelines for Drinking-Water Quality: Leptospira (2025).

---

### 📋 PHẦN 2: PROMPT CHUẨN DÁN VÀO NOTEBOOKLM / GEMINI NOTEBOOK

```markdown
"Bạn là một Bác sĩ Giảng viên Lâm sàng kỳ cựu và Chuyên gia Y học Chứng cứ (EBM).
Dựa DUY NHẤT và CHẶT CHẼ trên các tài liệu đã tải lên trong Notebook này (đặc biệt là National Guidelines for Leptospirosis - NCDC 2015, PPS-PIDSP CPG 2019 và các tổng quan hệ thống EBM), hãy xây dựng 01 Ca Bệnh Án Lâm Sàng Điển Hình theo đúng cấu trúc SOAP chuẩn quốc tế và định dạng Markdown bên dưới.

Yêu cầu lâm sàng:
* Mặt bệnh cần xây dựng: Nhiễm Leptospira thể nặng kèm tổn thương đa cơ quan (Hội chứng Weil)
* Chuyên khoa: Truyền nhiễm / Bệnh Nhiệt đới
* Phân loại ca: essential
* Độ khó ca bệnh: 4 / 5
* Bối cảnh bệnh nhân: Nam 38 tuổi, nông dân làm ruộng lúa, nhập viện vì sốt cao, vàng da, thiểu niệu và ho ra máu sau 5 ngày lội nước lũ bẩn.
* Khoa phòng tiếp nhận: Khoa Cấp cứu / Khoa Bệnh Nhiệt đới / Khoa Hồi sức Cấp cứu (ICU)
* Trọng tâm biện luận: Nhận diện sớm cờ đỏ đe dọa tính mạng (Suy thận cấp, Xuất huyết phổi, Suy gan), phân biệt với Sốt xuất huyết Dengue / Sốt rét, và lập phác đồ điều trị kháng sinh IV (Penicillin G / Ceftriaxone) kết hợp hồi sức tích cực.
* Tài liệu nguồn ưu tiên trích dẫn: NCDC India National Guidelines 2015, PPS-PIDSP Clinical Practice Guidelines 2019, Cochrane Database Systematic Review 2024.

Định dạng xuất bản (BẮT BUỘC tuân thủ chính xác 100% cú pháp Markdown Frontmatter dưới đây để hệ thống DocSpace tự động nhận diện và phân tích):

---
title: "Ca lâm sàng Nhiễm Leptospira thể nặng (Hội chứng Weil) ở bệnh nhân nam nông dân sau ngập lụt"
caseId: "soap-leptospirosis_weil_syndrome-01"
specialty: "Truyền nhiễm"
experienceLevel: "essential"
difficultyRating: 4
authorDoctor: "Hội đồng Khoa học CliniPortal DocSpace"
icd10:
  - "A27.0"
  - "A27.8"
tags:
  - "Truyền nhiễm"
  - "Leptospira"
  - "Hội chứng Weil"
  - "SOAP"
demographicContext: "Nam 38 tuổi, nông dân làm ruộng lúa tại vùng ngập lụt dịch lưu hành"
historyPearls: "⚡ BÀI HỌC KHAI THÁC BỆNH SỬ: Khai thác kĩ yếu tố dịch tễ lội nước bẩn/bùn lụt chân trần có vết xước da và dấu hiệu đặc trưng đau cơ bắp chân dữ dội (calf muscle tenderness) kèm sốt cao đột ngột."
objectivePitfalls: "⚠️ BẪY CẬN LÂM SÀNG & KHÁM: Sung huyết kết mạc (conjunctival suffusion) rất dễ bị nhầm với viêm kết mạc nhiễm khuẩn nhưng điểm mấu chốt là KHÔNG CÓ tiết dịch mủ; ngoài ra coi chừng bỏ sót ho ra máu vi thể do hội chứng xuất huyết phổi cấp."
diagnosticPearls: "🧠 ĐÚC KẾT BIỆN LUẬN: Hội chứng Weil định danh bởi bộ ba lâm sàng: Vàng da + Suy thận cấp + Biểu hiện xuất huyết. Phân biệt với SXH Dengue dựa vào số lượng bạch cầu tăng kèm chuyển trái (Dengue bạch cầu tụt) và tăng CPK máu rất cao do hủy cơ."
takeawayLessons: "🎯 BÀI HỌC KINH NGHIỆM ĐIỀU TRỊ: Khởi dùng kháng sinh tĩnh mạch sớm (Penicillin G IV 2-4 triệu UI q6h hoặc Ceftriaxone IV 1-2g/ngày) ngay khi nghi ngờ lâm sàng; lọc máu cấp cứu sớm khi có anuria/creatinine tăng cao; kiểm soát thông khí bảo vệ phổi khi có xuất huyết phổi."
sourceReference: "National Guidelines for Leptospirosis - NCDC India 2015 & PPS-PIDSP CPG 2019"
clinicalContext: "Khoa Bệnh Nhiệt đới / Khoa Hồi sức Cấp cứu (ICU)"
updated: "2026-09-14"
---

### 🩺 Ca Lâm Sàng: Nhiễm Leptospira Thể Nặng (Hội Chứng Weil)
**Bối cảnh**: Bệnh nhân nam 38 tuổi, nông dân, sống tại vùng ngập lụt dịch tễ lưu hành, nhập viện Khoa Cấp cứu / Bệnh Nhiệt đới vì sốt cao, vàng da mắt, đau cơ bắp chân dữ dội, thiểu niệu và ho hắng ra máu tươi vào ngày thứ 5 của bệnh.

#### 1. 📝 S — CHỦ QUAN / SUBJECTIVE
* **Lý do nhập viện / Than phiền chính**: Sốt cao liên tục, vàng mắt vàng da rõ, đau nhức cơ bắp chân không đi lại được, tiểu ít (< 300 ml/24h) và ho khạc đờm lẫn máu tươi.
* **Bệnh sử chi tiết**: 
  - Ngày 1–3: Bệnh nhân khởi phát sốt cao đột ngột 39.5 °C, rét rung, đau đầu dữ dội vùng trán và sau hốc mắt, đau nhức toàn thân đặc biệt là vùng cơ bắp chân và cơ đùi. Tự uống Paracetamol 500mg nhưng hạ sốt kém.
  - Ngày 4–5: Bệnh nhân xuất hiện mắt đỏ rực hai bên, vàng mắt và vàng da tiến triển nhanh, buồn nôn, nôn ói dịch mật, đau tức nhẹ vùng hạ sườn phải. Lượng nước tiểu giảm dần còn khoảng 1 xị/ngày. Sáng ngày nhập viện, bệnh nhân xuất hiện ho hắng khạc đờm vướng máu tươi, mệt lả, vã mồ hôi nên được gia đình đưa đi cấp cứu.
* **Tiền căn**: Nông dân trực tiếp làm ruộng lúa ngập nước, 10 ngày trước có lội nước lũ bẩn chân trần bị gai đâm xước bàn chân phải. Không có tiền sử bệnh gan mạn, không dị ứng thuốc.

#### 2. 🔬 O — KHÁCH QUAN / OBJECTIVE
##### Sinh hiệu:
* Huyết áp: 90/60 mmHg (MAP = 70 mmHg, dấu hiệu doạ sốc)
* Mạch: 112 nhịp/phút, nảy nông
* Thân nhiệt: 38.8 °C
* Nhịp thở: 26 lần/phút, thở nông nhanh
* SpO₂: 92% (thở khí trời)
* BMI: 22.1 kg/m²
##### Khám thực thể trọng tâm:
* **Mắt & Da niêm**: Sung huyết kết mạc 2 bên rất rõ, lan tỏa nhưng không có tiết dịch nhầy mủ (Conjunctival suffusion). Vàng da, vàng kết mạc mắt đậm. Rải rác chấm xuất huyết dưới da vùng cẳng tay và ngực.
* **Cơ xương khớp**: Đau chói khi ấn vào vùng cơ bắp chân 2 bên (Calf muscle tenderness (+)), bệnh nhân nhăn mặt né tránh.
* **Hô hấp**: Phổi nghe rải rác rประ rế, rale ẩm/nổ rải rác 2 đáy phổi, ho khạc đờm vệt máu tươi.
* **Tiêu hóa & Ổ bụng**: Bụng mềm, ấn đau nhẹ vùng hạ sườn phải, gan to 2 cm dưới bờ sườn, ấn tức, lách không chạm.
* **Thận - Tiêu hóa**: Ấn điểm niệu quản không đau, hố thận tức nhẹ. Nước tiểu sẫm màu như nước vối, thể tích bàng quang qua siêu âm ít.
##### Cận lâm sàng & Hình ảnh học:
* **Công thức máu (CTM)**: WBC 16.8 G/L (Neutrophil 88% - lệch trái rõ), RBC 3.8 T/L, Hb 10.5 g/dL, Hct 32%, PLT 48 G/L (Giảm tiểu cầu nặng).
* **Sinh hóa máu**: 
  - Ure: 22.4 mmol/L, Creatinine: 285 µmol/L (Suy thận cấp tiến triển).
  - Bilirubin toàn phần: 112.5 µmol/L (6.58 mg/dL), Bilirubin trực tiếp: 78.2 µmol/L.
  - AST: 185 U/L, ALT: 52 U/L (Tỷ lệ AST/ALT = 3.55 - gợi ý tổn thương nặng/tiên lượng xấu).
  - Creatine Phosphokinase (CPK): 2.450 U/L (Tăng rất cao do hủy hoại cơ cắn/cơ bắp chân).
  - Điện giải đồ: Na⁺ 130 mmol/L, K⁺ 3.2 mmol/L (Hạ kali máu do mất qua ống thận).
* **Đông máu**: PT 16.5 giây (Hoạt tỷ 62%), INR 1.42.
* **Căn nguyên vi sinh**: Rapid IgM ELISA (Gián tiếp) (+); PCR (gen secY / lipL32) máu gửi mẫu chờ kết quả.
* **Chẩn đoán hình ảnh**: 
  - X-quang ngực thẳng: Rải rác mờ phế nang dạng đám nốt 2 bên đáy phổi (hình ảnh thâm nhiễm xuất huyết phế nang).
  - Siêu âm bụng: Gan to nhẹ, cấu trúc thô, túi mật thành không dày, hai thận kích thước lớn nhẹ, tăng âm tủy thận.

#### 3. 🧠 A — ĐÁNH GIÁ / ASSESSMENT
##### Bảng Đặt Vấn Đề (Problem List · 3 Tầng Ưu Tiên Chuẩn Y Khoa):
| Mức độ ưu tiên | Vấn đề lâm sàng (Tổ hợp triệu chứng) | Chiến lược chẩn đoán (CLS đề nghị) | Hướng xử trí ban đầu & Cấp cứu |
| ------ | ------ | ------ | ------ |
| 🔴 **Tầng 1: Đe dọa tính mạng** | 1. Suy thận cấp thiểu niệu (Creatinine 285 µmol/L, Ure 22.4)<br>2. Hội chứng xuất huyết phổi (Ho ra máu, SpO2 92%, X-quang thâm nhiễm phế nang)<br>3. Doạ sốc nhiễm khuẩn / Giảm thể tích (HA 90/60) | Khí máu động mạch, Lactate máu, Điện giải đồ q6h, Theo dõi nước tiểu giờ qua xông Foley | Thiết lập 2 đường truyền lớn, thở Oxy kính 4L/p, bù dịch Ringer Lactate 10-15 mL/kg/h kiểm soát sát, chuẩn bị lọc máu cấp cứu (HD/CRRT) |
| 🟡 **Tầng 2: Cấp tính** | 1. Hội chứng Hoàng đảm - Suy gan cấp (Bilirubin 112.5 µmol/L, AST/ALT > 3)<br>2. Hội chứng Giảm tiểu cầu & Rối loạn đông máu (PLT 48 G/L, PT 16.5s)<br>3. Hội chứng Tiêu cơ vân / Viêm cơ (CPK 2.450 U/L, Đau bắp chân dữ dội) | Đông máu toàn bộ (Fibrinogen, D-Dimer), Kháng nguyên/PCR Leptospira, Siêu âm Doppler ổ bụng | Kháng sinh tĩnh mạch ngay: Penicillin G IV 2-4 triệu UI q6h (hoặc Ceftriaxone 2g IV/ngày), truyền Tiểu cầu / Huyết tương tươi nếu xuất huyết đe dọa |
| 🔵 **Tầng 3: Mạn tính / Tiền căn** | Tiền sử tổn thương da bàn chân do gai đâm khi lội nước lũ bẩn | Chăm sóc vết thương tại chỗ, soi cấy dịch | Vệ sinh sát trùng vết thương sát khuẩn bề mặt |

* **Chẩn đoán xác định**: Nhiễm Leptospira thể nặng biến chứng Hội chứng Weil (Suy thận cấp thiểu niệu, Suy gan cấp, Xuất huyết phổi, Giảm tiểu cầu nặng) - Bệnh ngày thứ 5 / Yếu tố dịch tễ ngập lụt.
* **Mã ICD-10**: A27.0 (Leptospirosis icterohaemorrhagica) / A27.8.
* **Chẩn đoán phân biệt cần loại trừ**:
  * *Sốt xuất huyết Dengue thể nặng (Dengue có dấu hiệu cảnh báo/Sốc Dengue)*: Loại trừ dựa trên CTM có Bạch cầu tăng cao 16.8 G/L kèm Neutrophil 88% (Dengue bạch cầu tụt nặng), CPK tăng rất cao 2.450 U/L và sung huyết kết mạc không tiết dịch.
  * *Sốt rét ác tính (Plasmodium falciparum)*: Kiểm tra Ký sinh trùng sốt rét (Soi giọt đốm/Tép nhanh) âm tính.
  * *Nhiễm khuẩn huyết Gram âm do Aeromonas / Pseudomonas sau lội nước*: Cấy máu bối cảnh nhiễm trùng độc huyết nặng, phản ứng PCR Leptospira dương tính giúp khẳng định.
* **Phân tầng nguy cơ & Thang điểm lượng giá**: 
  - Thang điểm NEWS2 = 8 điểm (Nguy cơ cấp cứu cao - Cần chuyển ICU).
  - Dấu hiệu cờ đỏ tiên lượng tử vong theo CPG NCDC/PIDSP: Có mặt đồng thời Vàng da + Thiểu niệu + Ho ra máu + Thâm nhiễm phổi + AST/ALT > 3.

#### 4. 📋 P — KẾ HOẠCH / PLAN
* **Xử trí cấp cứu & Ban đầu**:
  - Đặt bệnh nhân tư thế đầu cao 30°, thở Oxy qua Cannula 4–5 L/phút duy trì SpO₂ ≥ 95%.
  - Đặt catheter tĩnh mạch trung tâm (CVP) và xông bàng quang theo dõi nước tiểu nghiêm ngặt từng giờ.
  - Bù dịch Ringer Lactate tĩnh mạch tốc độ 10–15 mL/kg/giờ trong 2 giờ đầu, đánh giá đáp ứng CVP và áp lực hạ áp để tránh quá tải dịch gây cấp tính xuất huyết phổi.
##### Y lệnh thuốc điều trị (Định lượng EBM chính xác):
* **Benzylpenicillin (Crystalline Penicillin G)**: 2.000.000 UI – 4.000.000 UI tiêm tĩnh mạch chậm (IV) mỗi 6 giờ (q6h) x 7 ngày. *(Hoặc Ceftriaxone 2.0 g tiêm truyền tĩnh mạch 1 lần/ngày x 7 ngày nếu dị ứng Penicillin)*.
* **Paracetamol (Acetaminophen)**: 500 mg truyền tĩnh mạch (IV) khi sốt ≥ 38.5 °C (tối đa 3g/24h, theo dõi sát chức năng gan).
* **Furosemide**: 40 mg IV (Thử nghiệm đáp ứng lợi tiểu sau khi đã bù đủ dịch CVP 8-12 cmH2O; nếu vô niệu/không đáp ứng -> Chuẩn bị lọc máu ngoài thận).
##### Chỉ tiêu theo dõi & Mục tiêu lâm sàng:
* Theo dõi sinh hiệu (Mạch, HA, Nhịp thở, SpO2) mỗi 1–2 giờ; lượng nước tiểu q1h (Mục tiêu duy trì ≥ 0.5–1.0 mL/kg/h).
* Kiểm tra Công thức máu, Creatinine, Ure, Điện giải đồ và Khí máu động mạch mỗi 12 giờ.
* Chỉ định Lọc máu liên tục (CRRT) hoặc Thẩm phân máu cấp cứu (HD) ngay khi có một trong các tiêu chuẩn: Vô niệu > 12h, Creatinine máu tăng nhanh, K⁺ > 5.5 mmol/L, Toan chuyển hóa nặng (pH < 7.2) hoặc quá tải thể tích gây phù phổi cấp.
```

--
