const fs = require('fs');
const path = require('path');

const baseDir = 'd:/Apps_ykhoa/knowledge-vault/1.5. Kho yếu tố nguy cơ';

const articles = [
  // Hô hấp
  {
    specialty: 'Hô hấp',
    fileName: 'YTNC_Hen phế quản_P1.md',
    title: 'Hen phế quản',
    aliases: ['Yếu tố nguy cơ Hen phế quản', 'Asthma Risk Factors', 'Yếu tố khởi phát cơn hen'],
    keywords: ['yếu tố nguy cơ', 'hen phế quản', 'atopy', 'dị nguyên', 'gina', 'tái cấu trúc đường thở'],
    icd10: ['J45', 'J45.9'],
    tag: 'he-co-quan/ho-hap',
    content: `# BÀI HỌC: CÁC YẾU TỐ NGUY CƠ & YẾU TỐ KHỞI PHÁT CƠN HEN PHẾ QUẢN (ASTHMA RISK FACTORS)

---

## 1. Phân Biệt Yếu Tố Cơ Địa & Yếu Tố Khởi Kích Kịch Phát (GINA 2024 / 2025)

Hen phế quản là bệnh viêm mạn tính đường thở đặc trưng bởi sự tương tác giữa **cơ địa dị ứng (Host Factors)** và **các dị nguyên kích hoạt từ môi trường (Triggers)**:

| Nhóm yếu tố | Tác nhân cụ thể | Cơ chế & Tác động lâm sàng |
|:---|:---|:---|
| **Cơ địa dị ứng (Atopy)** | Tiền sử cá nhân/gia đình mắc Viêm mũi dị ứng, Chàm da (Eczema) | Tăng sản xuất IgE đặc hiệu qua trung gian tế bào Th2 (IL-4, IL-5, IL-13) |
| **Dị nguyên đường thở** | Mạt bụi nhà (*Dermatophagoides*), lông thú cưng, phấn hoa, nấm mốc | Gắn lên IgE trên bề mặt tế bào Mast gây khử hạt giải phóng Histamin và Leukotriene C4/D4 |
| **Nhiễm virus hô hấp** | Rhinovirus, RSV, Cúm mùa | Phá hủy lớp biểu mô niêm mạc phế quản, làm lộ các đầu mút thần kinh cảm giác phế vị |
| **Ô nhiễm & Thuốc lá** | Khói thuốc lá, khói bếp than, bụi mịn PM2.5 | Tăng tính phản ứng phế quản và gây đề kháng corticosteroid dạng hít (ICS) |
| **Yếu tố nghề nghiệp** | Bột mì, hóa chất isocyanate, men sinh học | Gây hen nghề nghiệp chiếm 15% ca hen người lớn mới khởi phát |
| **Thuốc & Dược phẩm** | Aspirin và các NSAIDs khác (Hội chứng Samter / AERD) | Ức chế COX-1 làm chuyển hướng chuyển hóa acid arachidonic sang con đường 5-lipoxygenase |
`
  },
  {
    specialty: 'Hô hấp',
    fileName: 'YTNC_Thuyên tắc phổi (PE)_P1.md',
    title: 'Thuyên tắc phổi (PE)',
    aliases: ['Yếu tố nguy cơ Thuyên tắc phổi', 'Pulmonary Embolism Risk Factors', 'Yếu tố nguy cơ VTE'],
    keywords: ['yếu tố nguy cơ', 'thuyên tắc phổi', 'pe', 'dvt', 'tam giác virchow', 'thang điểm wells', 'geneva'],
    icd10: ['I26', 'I26.9'],
    tag: 'he-co-quan/ho-hap',
    content: `# BÀI HỌC: CÁC YẾU TỐ NGUY CƠ THUYÊN TẮC PHỔI & THUYÊN TẮC HUYẾT KHỐI TĨNH MẠCH (VTE / PE)

---

## 1. Nền Tảng Sinh Bệnh Học: Tam Giác Virchow (Virchow's Triad)

Huyết khối tĩnh mạch sâu (DVT) và Thuyên tắc phổi (PE) là hai mặt bệnh của cùng một thực thể **Thuyên tắc huyết khối tĩnh mạch (VTE)**, khởi phát từ:
1. **Ứ trệ dòng máu tĩnh mạch (Stasis):** Bất động, liệt, suy van tĩnh mạch.
2. **Tổn thương nội mô mạch máu (Endothelial injury):** Phẫu thuật, chấn thương, đặt catheter tĩnh mạch.
3. **Tình trạng tăng đông (Hypercoagulability):** Ung thư ác tính, đột biến yếu tố V Leiden, hội chứng kháng phospholipid.

---

## 2. Bảng Phân Tầng Yếu Tố Nguy Cơ Theo Mức Độ Mạnh (ESC 2024 Guidelines)

| Mức độ nguy cơ | Yếu tố lâm sàng cụ thể | Tỷ số chênh (OR) |
|:---|:---|:---|
| **Yếu tố Nguy cơ Mạnh**<br>*(OR > 10)* | • Gãy xương chi dưới hoặc phẫu thuật thay khớp háng/gối trong vòng 3 tháng<br>• Nhập viện vì suy tim hoặc rung nhĩ trong 3 tháng qua<br>• Tiền sử thuyên tắc huyết khối tĩnh mạch (VTE) trước đây<br>• Chấn thương tủy sống hoặc liệt chi dưới<br>• Tổn thương đa chấn thương nặng | OR > 10 |
| **Yếu tố Nguy cơ Vừa**<br>*(OR 2 - 9)* | • Phẫu thuật nội soi khớp gối<br>• Đặt ống thông tĩnh mạch trung tâm (CVC)<br>• Hóa trị ung thư đang tiến hành<br>• Bệnh ác tính đang tiến triển<br>• Sử dụng thuốc tránh thai đường uống kết hợp hoặc liệu pháp hormone thay thế (HRT)<br>• Thời kỳ hậu sản (6 tuần sau sinh)<br>• Bệnh tự miễn (Lupus, IBD)<br>• Bệnh lý tăng đông bẩm sinh (Đột biến Prothrombin G20210A, thiếu hụt Protein C/S/Antithrombin III) | OR 2 - 9 |
| **Yếu tố Nguy cơ Yếu**<br>*(OR < 2)* | • Nằm bất động tại giường > 3 ngày do bệnh nội khoa<br>• Tuổi cao (> 65 tuổi)<br>• Béo phì (BMI > 30 kg/m²)<br>• Mang thai<br>• Suy giãn tĩnh mạch chi dưới | OR < 2 |

---

## 3. Thang Điểm Dự Báo Xác Suất Lâm Sàng Wells & Geneva Rút Gọn

- **Thang điểm Wells PE:** Triệu chứng DVT (+3), Không có chẩn đoán nào khác phù hợp hơn (+3), Mạch > 100 lần/phút (+1.5), Bất động/phẫu thuật trong 4 tuần (+1.5), Tiền sử VTE (+1.5), Ho ra máu (+1), Ung thư (+1).
  - *Điểm > 4 (Nghi ngờ cao):* Chỉ định chụp CT-Angiography ngực ngay.
  - *Điểm ≤ 4 (Ít nghi ngờ):* Xét nghiệm D-dimer định lượng để loại trừ.
`
  },

  // Tiêu hóa - Gan mật
  {
    specialty: 'Tiêu hóa - Gan mật',
    fileName: 'YTNC_Xơ gan_P1.md',
    title: 'Xơ gan',
    aliases: ['Yếu tố nguy cơ Xơ gan', 'Cirrhosis Risk Factors', 'Yếu tố thúc đẩy xơ gan mất bù'],
    keywords: ['yếu tố nguy cơ', 'xơ gan', 'rượu bia', 'viêm gan b', 'viêm gan c', 'mash', 'child-pugh', 'meld'],
    icd10: ['K74', 'K74.6'],
    tag: 'he-co-quan/tieu-hoa',
    content: `# BÀI HỌC: CÁC YẾU TỐ NGUY CƠ GÂY XƠ GAN & THÚC ĐẨY ĐỢT MẤT BÙ CẤP (CIRRHOSIS RISK FACTORS)

---

## 1. Căn Nguyên Gây Xơ Hóa Gan Tiến Triển

Xơ gan là giai đoạn cuối của quá trình viêm gan mạn tính kéo dài, đặc trưng bởi sự thay thế nhu mô gan bằng các dải mô xơ bao quanh các nốt tái tạo. Các căn nguyên hàng đầu tại Việt Nam và toàn cầu gồm:

| Căn nguyên chính | Tần suất tại Việt Nam | Yếu tố hiệp đồng tăng tốc độ xơ hóa |
|:---|:---|:---|
| **Viêm gan virus B (HBV) mạn tính** | 60% - 70% ca xơ gan | Tải lượng HBV-DNA cao (> 20.000 IU/mL), đồng nhiễm HDV hoặc HIV, uống rượu bia |
| **Viêm gan virus C (HCV) mạn tính** | 15% - 20% | Tuổi nhiễm > 40, nam giới, uống rượu (> 50g cồn/ngày), kháng insulin |
| **Lạm dụng rượu bia mạn tính** | 15% - 25% | Tiêu thụ cồn > 40-80g/ngày ở nam hoặc > 20-40g/ngày ở nữ liên tục > 10 năm |
| **Viêm gan thoái hóa mỡ (MASH)** | Đang gia tăng nhanh (10-15%) | ĐTĐ típ 2, béo phì, mang đa hình gen PNPLA3 |
| **Ứ mật mạn tính & Tự miễn** | 2% - 5% | Viêm đường mật tiên phát (PBC), Viêm đường mật xơ hóa tiên phát (PSC), Viêm gan tự miễn (AIH) |

---

## 2. Các Yếu Tố Thúc Đẩy Đợt Cấp Xơ Gan Mất Bù (Acute-on-Chronic Liver Failure - ACLF)

Bệnh nhân xơ gan còn bù có thể chuyển sang mất bù cấp tính khi xuất hiện:
1. **Nhiễm trùng vi khuẩn:** Viêm phúc mạc tiên phát do vi khuẩn (SBP), nhiễm trùng tiểu, viêm phổi.
2. **Xuất huyết tiêu hóa do vỡ giãn tĩnh mạch thực quản / phình vị:** Gây giảm thể tích tuần hoàn và tăng hấp thu protein máu vào ruột gây hôn mê gan.
3. **Sử dụng thuốc gây độc gan hoặc suy thận:** NSAIDs (gây hội chứng gan thận), thuốc an thần nhóm Benzodiazepine (thúc đẩy bệnh não gan).
4. **Táo bón hoặc mất nước do lạm dụng thuốc lợi tiểu.**
`
  },
  {
    specialty: 'Tiêu hóa - Gan mật',
    fileName: 'YTNC_Viêm tụy cấp_P1.md',
    title: 'Viêm tụy cấp',
    aliases: ['Yếu tố nguy cơ Viêm tụy cấp', 'Acute Pancreatitis Risk Factors', 'Yếu tố tiên lượng nặng viêm tụy'],
    keywords: ['yếu tố nguy cơ', 'viêm tụy cấp', 'sỏi mật', 'triglyceride', 'rượu bia', 'balthazar', 'ranson', 'bisap'],
    icd10: ['K85', 'K85.9'],
    tag: 'he-co-quan/tieu-hoa',
    content: `# BÀI HỌC: CÁC YẾU TỐ NGUY CƠ & TIÊN LƯỢNG NẶNG VIÊM TỤY CẤP (ACUTE PANCREATITIS RISK FACTORS)

---

## 1. Bảng Phân Tích Các Căn Nguyên Hàng Đầu Gây Viêm Tụy Cấp

| Nguyên nhân / Yếu tố nguy cơ | Tỷ lệ mắc | Cơ chế kích hoạt men tụy sớm |
|:---|:---|:---|
| **Sỏi mật (Gallstones & Microlithiasis)** | 40% - 50% tổng số ca | Sỏi di chuyển kẹt tại bóng Vater gây tắc nghẽn tạm thời ống tụy chính và trào ngược dịch mật |
| **Lạm dụng Rượu bia** | 30% - 35% | Rượu kích thích tế bào nang tụy tiết nhiều enzyme, hình thành nút protein gây tắc ống tụy nhỏ |
| **Tăng Triglyceride máu nặng (> 1000 mg/dL / 11.3 mmol/L)** | 5% - 10% (đặc biệt ở thai phụ hoặc ĐTĐ) | Men lipase tụy thủy phân triglyceride thừa thành các acid béo tự do gây độc và tắc vi mạch tụy |
| **Sau thủ thuật ERCP (Post-ERCP Pancreatitis)** | 3% - 10% sau can thiệp | Chấn thương cơ học cơ vòng Oddi hoặc áp lực bơm thuốc cản quang |
| **Tăng Canxi máu nặng (Cường tuyến cận giáp)** | 1% | Canxi lắng đọng kích hoạt trypsinogen thành trypsin sớm |
| **Thuốc (Azathioprine, Thiazide, Estrogen, Didanosine)** | 1% - 2% | Phản ứng quá mẫn hoặc độc tính tế bào chuyển hóa |

---

## 2. Thang Điểm Sàng Lọc Nguy Cơ Diễn Tiến Nặng BISAP (Nhập viện trong 24h)

- **B - BUN > 25 mg/dL (8.9 mmol/L):** +1 điểm
- **I - Impaired mental status (GCS < 15):** +1 điểm
- **S - SIRS (Hội chứng đáp ứng viêm toàn thân ≥ 2 tiêu chí):** +1 điểm
- **A - Age > 60 tuổi:** +1 điểm
- **P - Pleural effusion (Tràn dịch màng phổi trên X-quang/CT):** +1 điểm

*Đánh giá:* BISAP ≥ 3 điểm liên quan đến tỷ lệ suy tạng kéo dài và tử vong tăng gấp 10 lần (> 15% so với < 1% ở nhóm 0-2 điểm).
`
  },

  // Thần kinh
  {
    specialty: 'Thần kinh',
    fileName: 'YTNC_Đau nửa đầu Migraine_P1.md',
    title: 'Đau nửa đầu Migraine',
    aliases: ['Yếu tố nguy cơ Migraine', 'Migraine Risk Factors', 'Yếu tố khởi phát đau nửa đầu'],
    keywords: ['yếu tố nguy cơ', 'migraine', 'đau nửa đầu', 'cgrp', 'thay đổi hormone', 'căng thẳng', 'chất kích thích'],
    icd10: ['G43', 'G43.9'],
    tag: 'he-co-quan/than-kinh',
    content: `# BÀI HỌC: CÁC YẾU TỐ NGUY CƠ & YẾU TỐ KHỞI PHÁT CƠN ĐAU NỬA ĐẦU MIGRAINE

---

## 1. Yếu Tố Di Truyền & Sinh Học Nền Tảng

Migraine là một rối loạn thần kinh - mạch máu phức tạp có tính di truyền cao:
- **Tỷ lệ di truyền:** Ước tính từ 40% - 60%. Nếu có bố hoặc mẹ mắc Migraine, nguy cơ con mắc bệnh là 50%; nếu cả hai bố mẹ đều mắc, nguy cơ tăng lên **75%**.
- **Gen liên quan:** Đột biến kênh ion trong thể Migraine liệt nửa người có tính gia đình (FHM1 - gen CACNA1A, FHM2 - gen ATP1A2, FHM3 - gen SCN1A).
- **Giới tính & Hormone:** Nữ giới mắc bệnh gấp **3 lần** nam giới. Sự sụt giảm nồng độ estrogen ngay trước chu kỳ kinh nguyệt là yếu tố kích hoạt mạnh mẽ (Migraine liên quan kinh nguyệt).

---

## 2. Các Yếu Tố Khởi Phát Cơn Cấp Tính (Triggers)

- **Stress tâm lý & Căng thẳng:** Yếu tố khởi phát phổ biến nhất (chiếm 70% - 80%).
- **Rối loạn giấc ngủ:** Ngủ quá ít hoặc ngủ quá nhiều (ngủ nướng cuối tuần).
- **Thực phẩm & Đồ uống:** Phô mai lâu năm (chứa tyramine), socola, rượu vang đỏ, mì chính (monosodium glutamate), chất tạo ngọt nhân tạo aspartame.
- **Môi trường & Giác quan:** Ánh sáng chói lóa, đèn huỳnh quang nhấp nháy, âm thanh lớn, mùi nước hoa nồng gắt, thay đổi áp suất khí quyển.
- **Bỏ bữa hoặc mất nước:** Hạ đường huyết nhẹ kích hoạt giải phóng CGRP từ hạch sinh ba.
`
  },

  // Huyết học - Ung thư
  {
    specialty: 'Huyết học - Ung thư',
    fileName: 'YTNC_Huyết khối tĩnh mạch sâu (DVT)_P1.md',
    title: 'Huyết khối tĩnh mạch sâu (DVT)',
    aliases: ['Yếu tố nguy cơ DVT', 'Deep Vein Thrombosis Risk Factors', 'Yếu tố huyết khối tĩnh mạch chi dưới'],
    keywords: ['yếu tố nguy cơ', 'dvt', 'huyết khối tĩnh mạch sâu', 'wells dvt', 'ung thư', 'bất động'],
    icd10: ['I80.2'],
    tag: 'he-co-quan/huyet-hoc-ung-thu',
    content: `# BÀI HỌC: CÁC YẾU TỐ NGUY CƠ HUYẾT KHỐI TĨNH MẠCH SÂU CHI DƯỚI (DVT RISK FACTORS)

---

## 1. Yếu Tố Nguy Cơ Mắc Phải vs Bẩm Sinh

Huyết khối tĩnh mạch sâu (DVT) xảy ra chủ yếu ở hệ tĩnh mạch sâu chi dưới (tĩnh mạch đùi, khoeo, chày). Các yếu tố nguy cơ gồm:
- **Nguy cơ Tạm thời (Transient):** Phẫu thuật lớn chỉnh hình, mang thai, bất động chuyến bay dài (> 6 giờ), dùng thuốc tránh thai.
- **Nguy cơ Kéo dài (Persistent):** Ung thư tạng tiến triển, hội chứng kháng phospholipid (APS), bệnh tự miễn.

---

## 2. Thang Điểm Dự Báo Lâm Sàng Wells DVT

- Ung thư đang tiến triển (+1)
- Liệt, yếu chi hoặc bó bột chi dưới (+1)
- Bất động tại giường > 3 ngày hoặc phẫu thuật lớn trong 12 tuần (+1)
- Đau dọc theo đường đi của hệ tĩnh mạch sâu (+1)
- Sưng toàn bộ một bên chân (+1)
- Bắp chân bên bệnh to hơn bên lành > 3 cm (đo dưới mấu chuyển chày 10cm) (+1)
- Phù lõm ưu thế ở bên chân bệnh (+1)
- Giãn tĩnh mạch bàng hệ nông không do suy van (+1)
- Tiền sử DVT đã được chẩn đoán (+1)
- Có chẩn đoán khác phù hợp hơn (-2)

*Đánh giá:* Điểm ≥ 2 là nguy cơ cao DVT ➔ Chỉ định Siêu âm Doppler mạch máu chi dưới khẩn cấp.
`
  },

  // Nhi khoa
  {
    specialty: 'Nhi khoa',
    fileName: 'YTNC_Co giật do sốt_P1.md',
    title: 'Co giật do sốt',
    aliases: ['Yếu tố nguy cơ Co giật do sốt', 'Febrile Seizures Risk Factors', 'Yếu tố tái phát sốt co giật'],
    keywords: ['yếu tố nguy cơ', 'co giật do sốt', 'sốt cao', 'tái phát co giật', 'nhi khoa', 'động kinh'],
    icd10: ['R56.0'],
    tag: 'he-co-quan/nhi-khoa',
    content: `# BÀI HỌC: CÁC YẾU TỐ NGUY CƠ CO GIẬT DO SỐT & DỰ BÁO TÁI PHÁT Ở TRẺ EM (FEBRILE SEIZURE RISK FACTORS)

---

## 1. Các Yếu Tố Nguy Cơ Mắc Cơn Co Giật Do Sốt Lần Đầu

Co giật do sốt xảy ra ở 2% - 5% trẻ em từ 6 tháng đến 5 tuổi, có đỉnh xuất hiện vào 18 tháng tuổi:
1. **Tiền sử gia đình:** Tăng nguy cơ gấp 2 - 3 lần nếu có anh chị em hoặc bố mẹ từng bị co giật do sốt (di truyền tính nhạy cảm kênh natri/GABA).
2. **Nhiệt độ đỉnh & Tốc độ tăng thân nhiệt:** Sốt cao nhanh (thường ≥ 38.5°C - 39°C) do nhiễm virus (HHV-6 gây ban đào, Cúm, Adenovirus).
3. **Tiêm chủng gần đây:** Tăng nhẹ nguy cơ trong 24h sau tiêm vắc xin DTP hoặc 7-10 ngày sau vắc xin Sởi-Quai bị-Rubella (MMR) do phản ứng sốt tạo miễn dịch.

---

## 2. Các Yếu Tố Dự Báo Nguy Cơ Tái Phát Co Giật Do Sốt (Recurrence Risk Factors)

Tỷ lệ tái phát chung là 30% - 35%. Tuy nhiên, nguy cơ tăng lên **> 70%** nếu có từ 2 yếu tố nguy cơ sau:
- Cơn co giật đầu tiên khởi phát khi trẻ < 12 - 15 tháng tuổi.
- Sốt mức độ nhẹ hoặc thời gian sốt ngắn (< 1 giờ) trước khi co giật xuất hiện.
- Tiền sử gia đình trực hệ thế hệ 1 có người bị co giật do sốt.
- Xuất hiện cơn co giật do sốt phức tạp (kéo dài > 15 phút, co giật cục bộ một bên, hoặc tái diễn > 1 lần trong 24 giờ).
`
  },

  // Da liễu - Cơ xương khớp
  {
    specialty: 'Da liễu - Cơ xương khớp',
    fileName: 'YTNC_Gout_P1.md',
    title: 'Gout',
    aliases: ['Yếu tố nguy cơ Bệnh Gout', 'Gout Risk Factors', 'Yếu tố tăng acid uric máu'],
    keywords: ['yếu tố nguy cơ', 'gout', 'acid uric', 'rượu bia', 'hải sản', 'thuốc lợi tiểu', 'hội chứng chuyển hóa'],
    icd10: ['M10', 'M10.9'],
    tag: 'he-co-quan/co-xuong-khop',
    content: `# BÀI HỌC: CÁC YẾU TỐ NGUY CƠ GÂY BỆNH GOUT & CƠN GOUT CẤP (GOUT RISK FACTORS)

---

## 1. Cơ Chế Tăng Acid Uric Máu & Kết Tinh Muối Monosodium Urate (MSU)

Tăng acid uric máu (Nồng độ > 6.8 mg/dL hay > 400 µmol/L) là điều kiện tiên quyết nhưng không đủ để gây bệnh Gout. Sự hình thành tinh thể MSU và khởi phát cơn viêm khớp cấp chịu chi phối bởi:
- **Giảm bài tiết acid uric qua thận (chiếm 90% ca bệnh):** Khiếm khuyết kênh URAT1 / GLUT9 hoặc suy giảm eGFR.
- **Tăng tổng hợp acid uric quá mức (10%):** Do chế độ ăn hoặc tăng phá hủy tế bào.

---

## 2. Bảng Phân Tích Các Yếu Tố Nguy Cơ Mắc Gout (ACR / EULAR Guidelines)

| Yếu tố nguy cơ | Mức độ nguy cơ (RR / OR) | Cơ chế sinh học |
|:---|:---|:---|
| **Giới tính Nam & Tuổi tác** | Nam giới chiếm > 80% ca bệnh; Tăng sau 40 tuổi | Estrogen ở nữ thúc đẩy bài tiết acid uric qua thận; phụ nữ tăng nguy cơ sau mãn kinh |
| **Tiêu thụ nhiều Rượu bia (Đặc biệt Bia)** | RR = 2.5 đối với bia; RR = 1.6 đối với rượu mạnh | Bia giàu guanosine (purine dễ hấp thu); cồn chuyển hóa thành acid lactic ức chế bài tiết acid uric tại ống thận |
| **Nước ngọt có ga giàu đường Fructose** | RR = 1.8 - 2.0 | Fructose phosphoryl hóa nhanh làm cạn kiệt ATP gan, thúc đẩy thoái giáng AMP thành acid uric |
| **Chế độ ăn nhiều thịt đỏ và hải sản** | RR = 1.4 - 1.5 | Cung cấp hàm lượng purine ngoại sinh cao |
| **Thuốc Lợi tiểu (Thiazide, Furosemide)** | RR = 1.8 - 2.4 | Gây giảm thể tích nhẹ kích hoạt ống thận lượn gần tăng tái hấp thu muối urate |
| **Bệnh Thận mạn tính & Béo phì** | OR = 2.5 - 3.0 | Giảm độ thanh thải urate và tình trạng đề kháng insulin tại ống thận |
`
  }
];

let created = 0;

articles.forEach(art => {
  const targetDir = path.join(baseDir, art.specialty);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const fullPath = path.join(targetDir, art.fileName);

  const frontmatter = `---
title: "${art.title}"
part: "P1"
aliases:
${art.aliases.map(a => `  - "${a}"`).join('\n')}
keywords:
${art.keywords.map(k => `  - "${k}"`).join('\n')}
icd10:
${(art.icd10 || []).map(i => `  - "${i}"`).join('\n')}
specialty: "${art.specialty}"
kho: "1.5. Kho yếu tố nguy cơ"
tags:
  - "${art.tag}"
  - "loai/risk-factors"
  - "y-khoa/ytnc"
updated: "2026-08-22"
---

`;

  fs.writeFileSync(fullPath, frontmatter + art.content, 'utf8');
  console.log(`Đã tạo bài viết: ${art.specialty}/${art.fileName}`);
  created++;
});

console.log(`\n=== TẠO THÊM ${created} BÀI VIẾT BỔ SUNG KHO YẾU TỐ NGUY CƠ ===`);
