const fs = require('fs');
const path = require('path');

const baseDir = 'd:/Apps_ykhoa/knowledge-vault/1.5. Kho yếu tố nguy cơ';

const articles = [
  // 1. Tim mạch
  {
    specialty: 'Tim mạch',
    fileName: 'YTNC_Tăng huyết áp_P1.md',
    title: 'Tăng huyết áp',
    aliases: ['Yếu tố nguy cơ Tăng huyết áp', 'Hypertension Risk Factors', 'Yếu tố nguy cơ THA'],
    keywords: ['yếu tố nguy cơ', 'tăng huyết áp', 'muối natri', 'béo phì', 'kháng insulin', 'score2', 'ckm', 'raas'],
    icd10: ['I10', 'I11', 'I15'],
    tag: 'he-co-quan/tim-mach',
    content: `# BÀI HỌC: PHÂN TÍCH CHUYÊN SÂU CÁC YẾU TỐ NGUY CƠ BỆNH TĂNG HUYẾT ÁP (HYPERTENSION RISK FACTORS)

---

## 1. Tổng Quan & Phân Tầng Nguy Cơ Tim Mạch Toàn Bộ

Tăng huyết áp (THA) là yếu tố nguy cơ tim mạch có thể thay đổi được hàng đầu trên toàn cầu, chịu trách nhiệm cho hơn 10 triệu ca tử vong mỗi năm. Sự hình thành và tiến triển của THA là kết quả của sự tương tác đa yếu tố phức tạp giữa nền tảng di truyền và các tác nhân môi trường - lối sống.

Theo khuyến cáo của ESC 2024 và Hội Tim Mạch Việt Nam (VNHA 2024), việc đánh giá một bệnh nhân THA bắt buộc phải gắn liền với **đánh giá tổng thể các yếu tố nguy cơ tim mạch đồng mắc** và **tổn thương cơ quan đích qua trung gian tăng huyết áp (HMOD)**.

| Tầng nguy cơ tim mạch 10 năm | Tiêu chuẩn lâm sàng & Yếu tố nguy cơ kết hợp | Khuyến cáo can thiệp |
|:---|:---|:---|
| **Rất cao (Very High Risk)** | Đã có bệnh tim mạch lâm sàng (ASCVD), ĐTĐ kèm tổn thương cơ quan đích, BTM nặng (eGFR < 30 mL/phút/1.73m²), hoặc SCORE2/SCORE2-OP ≥ 10% | Khởi trị thuốc hạ áp ngay lập tức + Can thiệp lối sống tích cực. Đích HA < 130/80 mmHg |
| **Cao (High Risk)** | Huyết áp độ 3 (≥ 180/110 mmHg), ĐTĐ không có tổn thương cơ quan đích kéo dài ≥ 10 năm, BTM trung bình (eGFR 30-59), hoặc SCORE2 5% - < 10% | Khởi trị thuốc hạ áp sau vài tuần theo dõi nếu không đạt đích. Can thiệp lối sống bắt buộc |
| **Trung bình (Moderate Risk)** | Huyết áp độ 2 (160-179/100-109 mmHg) có 1-2 YTNC khác; hoặc người trẻ mắc ĐTĐ típ 1 < 35 tuổi | Can thiệp lối sống 3-6 tháng, khởi trị thuốc nếu HA vẫn không kiểm soát |
| **Thấp (Low Risk)** | Huyết áp độ 1 (140-159/90-99 mmHg) đơn độc không kèm YTNC hoặc HMOD; SCORE2 < 2.5% | Can thiệp lối sống đơn thuần 3-6 tháng trước khi xem xét điều trị thuốc |

---

## 2. Các Yếu Tố Nguy Cơ Không Thể Thay Đổi (Non-Modifiable Risk Factors)

1. **Tuổi tác (Ageing):**
   - Tỷ lệ THA tăng tuyến tính theo tuổi: Trên 60% người > 60 tuổi và trên 75% người > 75 tuổi mắc THA.
   - *Cơ chế:* Quá trình lão hóa tự nhiên gây thoái hóa sợi elastin, tăng sinh collagen lớp nội trung mạc, vôi hóa thành mạch làm giảm độ chun giãn động mạch chủ (arterial stiffness), dẫn đến tăng huyết áp tâm thu đơn độc ở người cao tuổi.
2. **Tiền sử gia đình & Di truyền (Genetic Predisposition):**
   - Nguy cơ tăng gấp 2.0 - 2.5 lần nếu có bố hoặc mẹ mắc THA trước 55 tuổi (OR = 2.4; 95% CI: 1.9 - 3.1).
   - Di truyền đa gen (polygenic): Đột biến các biến thể gen điều hòa kênh ion natri (ENaC), thụ thể angiotensin II (AGTR1), men chuyển angiotensin (ACE), và gen tổng hợp aldosterone synthase (CYP11B2).
3. **Giới tính (Sex):**
   - Trước 50 tuổi: Nam giới có tỷ lệ mắc THA cao hơn nữ giới do tác dụng bảo vệ mạch máu của estrogen.
   - Sau mãn kinh: Tỷ lệ THA ở nữ giới tăng vọt và vượt nam giới do sụt giảm estrogen, tăng hoạt tính hệ giao cảm và hệ RAAS nội mô.

---

## 3. Các Yếu Tố Nguy Cơ Có Thể Thay Đổi & Hành Vi Lối Sống (Modifiable Risk Factors)

| Yếu tố nguy cơ | Mức độ nguy cơ (RR / OR) | Cơ chế tác động & Hậu quả sinh lý | Mức hạ HA khi can thiệp tối ưu |
|:---|:---|:---|:---|
| **Chế độ ăn nhiều Muối (Natri > 5g/ngày)** | RR = 1.6 - 2.1 ở người nhạy cảm muối | Tăng thể tích dịch ngoại bào, co thắt tiểu động mạch ngoại vi, ức chế bơm Na+/K+-ATPase | Giảm 5 - 8 mmHg khi ăn nhạt < 2g Natri/ngày (DASH Diet) |
| **Béo phì & Béo bụng (BMI ≥ 25, Vòng eo > 90cm nam / 80cm nữ)** | OR = 2.5 - 3.2 cho mỗi tăng 5 đơn vị BMI | Kháng insulin, cường giao cảm thận, chèn ép nhu mô thận bởi mỡ quanh thận, tăng leptin máu | Giảm 1 mmHg HA tâm thu cho mỗi 1 kg cân nặng giảm được |
| **Lối sống tĩnh tại (Sedentary Lifestyle)** | RR = 1.35 - 1.50 so với người năng động | Rối loạn chức năng nội mô, giảm sản xuất Nitric Oxide (NO), tăng trương lực mạch máu | Giảm 4 - 9 mmHg khi tập aerobic 150 phút/tuần |
| **Hút thuốc lá & Thuốc lào** | RR = 1.4 - 1.8; Tăng tức thời HA 10-20 mmHg | Nicotine kích thích hạch giao cảm giải phóng catecholamine; gốc tự do oxy hóa gây xơ vữa | Giảm nguy cơ tim mạch tổng thể 50% sau 1 năm cai thuốc |
| **Lạm dụng Rượu bia (> 14 đơn vị cồn/tuần)** | RR = 1.7 - 2.4 liều phụ thuộc | Tăng canxi nội bào trong tế bào cơ trơn mạch máu, kích hoạt trục hạ đồi - tuyến yên - thượng thận | Giảm 3 - 5 mmHg khi hạn chế cồn dưới mức chuẩn |
| **Hội chứng Ngưng thở khi ngủ do tắc nghẽn (OSA)** | OR = 2.8 - 4.0 đối với THA kháng trị | Thiếu oxy máu gián đoạn ban đêm kích hoạt hóa thụ thể cảnh gây bão giao cảm ban đêm (Non-dipper) | Hạ 3 - 7 mmHg khi điều trị thở áp lực dương liên tục (CPAP) |

---

## 4. Bệnh Lý Đồng Mắc & Tương Tác Chuyển Hóa Hội Chứng CKM

THA hiếm khi tồn tại đơn độc mà thường liên kết với cụm bệnh lý **Tim mạch - Thận - Chuyển hóa (Cardiovascular-Kidney-Metabolic - CKM Syndrome)**:
- **Đái tháo đường típ 2:** Hơn 70% bệnh nhân ĐTĐ típ 2 có THA đồng mắc. Tình trạng tăng đường huyết mạn thúc đẩy sản sinh các sản phẩm glycat hóa bền vững (AGEs), làm xơ cứng thành mạch và tăng tái hấp thu muối ở ống thận qua kênh SGLT2.
- **Bệnh thận mạn (CKD):** Cả nguyên nhân lẫn hậu quả. Tăng áp lực lọc cầu thận gây xơ chai cầu thận, đồng thời thiếu máu cục bộ nhu mô thận kích hoạt giải phóng renin quá mức tạo vòng xoắn bệnh lý ác tính.
- **Rối loạn lipid máu:** Tăng LDL-C và giảm HDL-C làm lắng đọng mảng xơ vữa, phá hủy lớp glycocalyx nội mạc làm mất phản xạ giãn mạch phụ thuộc dòng chảy.

---

## 5. Thang Điểm & Công Cụ Tính Toán Nguy Cơ Lâm Sàng

- **SCORE2 & SCORE2-OP (ESC 2021/2024):** Dự báo nguy cơ tử vong và biến cố tim mạch không tử vong sau 10 năm dựa trên tuổi, giới tính, huyết áp tâm thu, tình trạng hút thuốc và nồng độ cholesterol không phải HDL (Non-HDL-C).
- **AHA/ACC PREVENT™ Risk Calculator (2023/2025):** Tích hợp thêm các chỉ số chức năng thận (eGFR, UACR) và tình trạng đái tháo đường để dự báo nguy cơ suy tim và biến cố tim mạch sớm từ 30 tuổi.
`
  },
  {
    specialty: 'Tim mạch',
    fileName: 'YTNC_Hội chứng vành cấp_P1.md',
    title: 'Hội chứng vành cấp',
    aliases: ['Yếu tố nguy cơ Hội chứng vành cấp', 'ACS Risk Factors', 'Yếu tố nguy cơ Nhồi máu cơ tim'],
    keywords: ['yếu tố nguy cơ', 'hội chứng vành cấp', 'nhồi máu cơ tim', 'xơ vữa động mạch', 'ldl-c', 'hút thuốc lá', 'thang điểm grace', 'timi'],
    icd10: ['I20.0', 'I21', 'I22'],
    tag: 'he-co-quan/tim-mach',
    content: `# BÀI HỌC: PHÂN TÍCH CÁC YẾU TỐ NGUY CƠ HỘI CHỨNG VÀNH CẤP (ACUTE CORONARY SYNDROME RISK FACTORS)

---

## 1. Bản Chất & Phân Loại Các Yếu Tố Thúc Đẩy Nứt Vỡ Mảng Xơ Vữa

Hội chứng vành cấp (ACS) bao gồm Nhồi máu cơ tim có ST chênh lên (STEMI), Nhồi máu cơ tim không ST chênh lên (NSTEMI) và Đau thắt ngực không ổn định (UA). Biến cố cấp tính này xảy ra khi mảng xơ vữa không ổn định bị nứt vỡ hoặc xói mòn bề mặt, kích hoạt kết tập tiểu cầu và hình thành huyết khối gây tắc nghẽn lòng mạch vành.

Các yếu tố nguy cơ của ACS được chia làm hai nhóm chính:
1. **Yếu tố xơ vữa nền tảng (Atherogenic Drivers):** Thúc đẩy hình thành và làm giàu lõi lipid mảng xơ vữa qua nhiều thập kỷ.
2. **Yếu tố kích hoạt cấp tính (Triggering Factors):** Gây stress cơ học, co thắt mạch hoặc tăng tiêu thụ oxy cơ tim đột ngột làm nứt vỡ vỏ bao xơ mỏng.

---

## 2. Bảng Phân Tích Chi Tiết Các Yếu Tố Nguy Cơ Tim Mạch

| Yếu tố nguy cơ | Tỷ số nguy cơ (RR / OR / HR) | Tác động sinh bệnh học & Điểm cắt can thiệp |
|:---|:---|:---|
| **Tăng LDL-Cholesterol máu** | HR = 1.38 cho mỗi tăng 1 mmol/L LDL-C | LDL-C thấm vào lớp dưới nội mạc, bị oxy hóa (Ox-LDL), bị đại thực bào thực bào tạo tế bào bọt (foam cells). Mục tiêu: LDL-C < 1.4 mmol/L (< 55 mg/dL) ở nhóm nguy cơ rất cao |
| **Hút thuốc lá chủ động/thụ động** | OR = 2.88 (95% CI: 2.5 - 3.3) trong nghiên cứu INTERHEART | Khói thuốc làm giảm NO nội mạc, tăng kết tập tiểu cầu, tăng fibrinogen máu, kích hoạt co thắt mạch vành và làm mỏng vỏ bao sợi collagen |
| **Đái tháo đường & Kháng Insulin** | RR = 2.0 - 4.0 so với người không ĐTĐ | Gây viêm mạn tính, rối loạn chức năng nội mô lan tỏa, mảng xơ vữa giàu lipid và nhiều đại thực bào, giảm cảm giác đau ngực (thiếu máu cơ tim yên lặng) |
| **Tăng huyết áp** | OR = 1.91 (INTERHEART) | Gia tăng ứng suất cắt (shear stress) lên thành mạch, thúc đẩy phì đại cơ tim làm tăng nhu cầu tiêu thụ oxy và đẩy nhanh xơ vữa |
| **Béo phì dạng nam (Vòng eo/Vòng mông tăng)** | OR = 1.62 | Mô mỡ tạng giải phóng các cytokine tiền viêm (IL-6, TNF-alpha) và PAI-1 gây ức chế tiêu sợi huyết nội sinh |
| **Tăng Lipoprotein(a) [Lp(a) > 50 mg/dL]** | HR = 1.4 - 1.9 độc lập | Lp(a) có cấu trúc tương tự plasminogen gây cạnh tranh ức chế tiêu sợi huyết, đồng thời vận chuyển phospholipid oxy hóa gây viêm thành mạch |
| **Tăng hs-CRP (> 3 mg/L)** | HR = 1.6 - 2.0 | Chỉ dấu viêm hệ thống phản ánh tình trạng bất ổn định của mảng xơ vữa |

---

## 3. Các Yếu Tố Kích Hoạt Cấp Tính (Acute Triggers of Plaque Rupture)

- **Gắng sức thể lực đột ngột:** Hoạt hóa giao cảm làm tăng vọt huyết áp, nhịp tim và sức co bóp cơ tim, gây xoắn vặn và nứt vỡ mảng xơ vữa.
- **Stress tâm lý cấp tính (Severe Emotional Distress):** Gây bão catecholamine, co thắt vi tuần hoàn mạch vành hoặc hội chứng Takotsubo.
- **Nhiễm trùng cấp tính (Cúm, Viêm phổi, COVID-19):** Phản ứng viêm hệ thống làm hoạt hóa đại thực bào trong mảng xơ vữa tiết metalloproteinase (MMP) phá hủy khung collagen vỏ bao sợi.
- **Thời tiết lạnh đột ngột:** Gây co mạch ngoại vi, tăng huyết áp hồi lưu và tăng độ nhớt máu.

---

## 4. Thang Điểm Đánh Giá Nguy Cơ Biến Cố & Tử Vong (Clinical Risk Scores)

1. **Thang điểm GRACE 2.0 (Global Registry of Acute Coronary Events):**
   - Đánh giá nguy cơ tử vong nội viện và 6 tháng sau ACS.
   - Gồm 8 biến số: Tuổi, mạch, huyết áp tâm thu, Creatinine máu, phân độ Killip, ngưng tim lúc nhập viện, biến đổi đoạn ST, và tăng men tim.
   - Phân tầng: Nguy cơ cao (> 140 điểm nội viện) ➔ Cần chỉ định chụp mạch vành can thiệp sớm trong 24 giờ.
2. **Thang điểm TIMI Risk Score (Thrombolysis In Myocardial Infarction):**
   - Đánh giá nguy cơ tử vong, NMCT tái phát hoặc thiếu máu cục bộ cần tái tưới máu khẩn trong 14 ngày.
   - Gồm 7 tiêu chí (mỗi tiêu chí 1 điểm): Tuổi ≥ 65, ≥ 3 YTNC mạch vành, hẹp mạch vành ≥ 50% đã biết, ST chênh trên ECG, ≥ 2 cơn đau ngực trong 24h, dùng Aspirin trong 7 ngày qua, men tim tăng.
`
  },
  {
    specialty: 'Tim mạch',
    fileName: 'YTNC_Suy tim_P1.md',
    title: 'Suy tim',
    aliases: ['Yếu tố nguy cơ Suy tim', 'Heart Failure Risk Factors', 'Yếu tố nguy cơ Suy tim cấp và mạn'],
    keywords: ['yếu tố nguy cơ', 'suy tim', 'hfref', 'hfpef', 'tăng huyết áp', 'bệnh mạch vành', 'tiểu đường', 'rượu bia'],
    icd10: ['I50', 'I50.1', 'I50.9'],
    tag: 'he-co-quan/tim-mach',
    content: `# BÀI HỌC: CÁC YẾU TỐ NGUY CƠ GÂY SUY TIM & TIẾN TRIỂN SUY TIM MẤT BÙ (HEART FAILURE RISK FACTORS)

---

## 1. Phân Tầng Giai Đoạn Nguy Cơ Suy Tim (AHA/ACC/HFSA 2022)

Theo hướng dẫn đồng thuận quốc tế, suy tim được phân loại theo chuỗi tiến trình 4 giai đoạn, trong đó việc phát hiện sớm và can thiệp ở **Giai đoạn A (Có nguy cơ suy tim)** là chìa khóa then chốt ngăn ngừa tổn thương cấu trúc tim:

- **Giai đoạn A (At Risk for HF):** Bệnh nhân chưa có triệu chứng và chưa có bất thường cấu trúc hoặc chỉ dấu sinh học tim, nhưng có các yếu tố nguy cơ: Tăng huyết áp, ĐTĐ, bệnh mạch vành, béo phì, tiếp xúc thuốc độc tim.
- **Giai đoạn B (Pre-Heart Failure):** Chưa có triệu chứng nhưng đã có bằng chứng tổn thương cấu trúc tim (phì đại thất trái, dãn buồng tim, giảm EF) hoặc tăng peptide bài niệu (BNP / NT-proBNP) / troponin tim mạn tính.
- **Giai đoạn C (Symptomatic Heart Failure):** Đã hoặc đang có triệu chứng suy tim lâm sàng.
- **Giai đoạn D (Advanced Heart Failure):** Suy tim giai đoạn cuối kháng trị với các biện pháp nội khoa chuẩn.

---

## 2. Bảng Phân Tích Các Yếu Tố Nguy Cơ Bệnh Căn (Etiological Risk Factors)

| Yếu tố nguy cơ / Bệnh lý căn nguyên | Tỷ lệ đóng góp | Kiểu hình suy tim ưu thế | Cơ chế bệnh sinh chính |
|:---|:---|:---|:---|
| **Tăng huyết áp lâu năm không kiểm soát** | 60% - 75% ca suy tim | HFpEF (EF bảo tồn) & HFrEF | Quá tải áp lực ➔ Phì đại thất trái đồng tâm ➔ Rối loạn chức năng tâm trương ➔ Thoái hóa cơ tim xơ hóa |
| **Bệnh động mạch vành & Nhồi máu cơ tim** | 50% - 60% ca HFrEF | HFrEF (EF giảm) | Mất tế bào cơ tim vĩnh viễn do hoại tử thiếu máu ➔ Tái cấu trúc thất trái lệch tâm ➔ Dãn buồng tim |
| **Đái tháo đường típ 2** | Tăng nguy cơ gấp 2.4 lần ở nam, 5.0 lần ở nữ | HFpEF & HFrEF | Độc tính đường máu và lipid gây xơ hóa mô kẽ, lắng đọng mỡ cơ tim, rối loạn vi mạch vành |
| **Béo phì (BMI ≥ 30 kg/m²)** | Tăng 5% nguy cơ ở nam, 7% ở nữ cho mỗi tăng 1 BMI | HFpEF | Quá tải thể tích tuần hoàn, viêm hệ thống mạn tính qua mô mỡ mạc treo, tăng áp lực tĩnh mạch trung tâm |
| **Bệnh van tim (Hẹp/Hở van 2 lá, van ĐMC)** | 10% - 15% | HFrEF & HFpEF | Quá tải thể tích hoặc áp lực kéo dài dẫn đến suy giảm dự trữ co bóp sợi cơ tim |
| **Nhiễm độc tim (Rượu, Cocaine, Hóa trị Ung thư)** | 5% - 10% | HFrEF (Bệnh cơ tim dãn) | Anthracycline (Doxorubicin), Trastuzumab, Rượu phá hủy ty thể và chuỗi hô hấp tế bào cơ tim |
| **Rối loạn nhịp tim mạn tính (Rung nhĩ)** | 30% - 40% bệnh nhân suy tim | Cả hai | Mất nhát bóp tâm nhĩ (giảm 20-30% cung lượng tim), nhịp thất quá nhanh gây bệnh cơ tim do nhịp nhanh |

---

## 3. Các Yếu Tố Thúc Đẩy Đợt Cấp Suy Tim Mất Bù (Precipitating Triggers)

Nhớ nhanh bằng bảng kiểm lâm sàng **HEART FAILURE**:
- **H - Hypertension:** Cơn tăng huyết áp cấp cứu làm tăng hậu gánh đột ngột.
- **E - Embolism:** Thuyên tắc phổi làm tăng gánh thất phải cấp tính.
- **A - Anemia & Arrhythmia:** Thiếu máu nặng hoặc khởi phát rung nhĩ đáp ứng thất nhanh.
- **R - Rheumatic & Ischemia:** Thiếu máu cục bộ cơ tim tiến triển hoặc nhồi máu cơ tim thầm lặng.
- **T - Thyroid:** Cường giáp (tăng cung lượng) hoặc suy giáp.
- **F - Fluid / Salt overload & Non-adherence:** Không tuân thủ chế độ ăn giảm muối hoặc bỏ thuốc (lợi tiểu, chẹn beta, ARNI).
- **A - Alcohol & Toxins:** Uống rượu bia nhiều gây ức chế co bóp cơ tim cấp.
- **I - Infection:** Viêm phổi, nhiễm trùng tiểu làm tăng nhu cầu chuyển hóa và kích hoạt cytokine viêm.
- **L - Lung disease:** Đợt cấp COPD hoặc hen phế quản gây co thắt mạch phổi.
- **U - Uncontrolled Diabetes:** Rối loạn đường huyết cấp tính.
- **R - Renal failure:** Tổn thương thận cấp hoặc suy thận tiến triển làm giảm bài tiết natri.
- **E - Errors in medication:** Sử dụng các thuốc chống chỉ định (NSAIDs gây ứ muối nước, chẹn calci nhóm Non-DHP ở HFrEF).
`
  },
  {
    specialty: 'Tim mạch',
    fileName: 'YTNC_Rung nhĩ_P1.md',
    title: 'Rung nhĩ',
    aliases: ['Yếu tố nguy cơ Rung nhĩ', 'Atrial Fibrillation Risk Factors', 'Yếu tố nguy cơ AF'],
    keywords: ['yếu tố nguy cơ', 'rung nhĩ', 'atrial fibrillation', 'cha2ds2-vasc', 'has-bled', 'osa', 'tăng huyết áp', 'suy tim'],
    icd10: ['I48', 'I48.0', 'I48.9'],
    tag: 'he-co-quan/tim-mach',
    content: `# BÀI HỌC: CÁC YẾU TỐ NGUY CƠ BỆNH RUNG NHĨ & THANG ĐIỂM DỰ BÁO ĐỘT QUỴ (ATRIAL FIBRILLATION RISK FACTORS)

---

## 1. Cơ Chế Bệnh Sinh & Tái Cấu Trúc Nhĩ Dưới Tác Động Của Yếu Tố Nguy Cơ

Rung nhĩ (AF) là rối loạn nhịp tim kéo dài phổ biến nhất, với tần suất hiện mắc tăng gấp đôi sau mỗi thập kỷ đời sống. Sự khởi phát và duy trì rung nhĩ đòi hỏi:
1. **Ổ khởi kích (Trigger):** Thường xuất phát từ các ống cơ tim bao quanh lỗ các tĩnh mạch phổi (Pulmonary Veins).
2. **Cơ chất nhĩ bất thường (Substrate):** Quá trình tái cấu trúc điện học và tái cấu trúc cấu trúc (xơ hóa cơ nhĩ, dãn nhĩ trái, biệt hóa nguyên bào sợi).

---

## 2. Bảng Phân Tích Các Yếu Tố Nguy Cơ Mắc Rung Nhĩ

| Nhóm yếu tố | Tác nhân cụ thể | Tỷ số nguy cơ (HR / OR) | Cơ chế tác động sinh học |
|:---|:---|:---|:---|
| **Nhân khẩu học** | Tuổi cao (≥ 65 tuổi) | HR = 1.5 - 2.0 mỗi 10 năm | Xơ hóa cơ nhĩ thoái hóa, giảm tính dẫn truyền nội nhĩ |
| **Bệnh lý tim mạch** | Tăng huyết áp | HR = 1.5 - 1.8 | Tăng áp lực nhĩ trái, dày thành thất trái gây dãn nhĩ trái |
| | Suy tim (HFrEF & HFpEF) | HR = 3.0 - 5.0 | Tăng áp lực đổ đầy, ứ trệ tuần hoàn và hoạt hóa hệ RAAS |
| | Bệnh van tim (Hẹp 2 lá) | HR = 5.0 - 10.0 | Tăng gánh thể tích và áp lực nhĩ trái cực nặng |
| **Bệnh chuyển hóa** | Béo phì (BMI ≥ 30) | HR = 1.5 cho mỗi tăng 5 BMI | Lắng đọng mỡ thượng tâm mạc tiết cytokine gây viêm và xơ hóa cơ tim lân cận |
| | Đái tháo đường | HR = 1.4 - 1.6 | Tăng stress oxy hóa, bệnh lý cơ tim do tiểu đường |
| **Hô hấp & Giấc ngủ** | Hội chứng ngưng thở khi ngủ (OSA) | HR = 2.0 - 3.0 | Tăng áp lực âm trong lồng ngực khi hít vào chống tắc nghẽn làm căng dãn nhĩ trái đột ngột |
| **Lối sống & Độc chất** | Lạm dụng rượu bia ("Holiday Heart") | HR = 1.3 - 1.5 | Độc tế bào cơ tim trực tiếp, rút ngắn thời gian trơ hiệu quả của cơ nhĩ |
| | Tập thể thao sức bền cường độ cực hạn | OR = 2.0 - 5.0 ở vận động viên marathon | Cường phế vị kết hợp tăng thể tích nhĩ mạn tính |

---

## 3. Thang Điểm Phân Tầng Nguy Cơ Thuyên Tắc Huyết Khối & Xuất Huyết

### 3.1. Thang điểm CHA2DS2-VASc (Dự báo nguy cơ Đột quỵ thiếu máu não)
- **C - Congestive HF:** Suy tim lâm sàng hoặc EF ≤ 40% (+1 điểm)
- **H - Hypertension:** Tăng huyết áp (+1 điểm)
- **A2 - Age ≥ 75:** Tuổi ≥ 75 (+2 điểm)
- **D - Diabetes:** Đái tháo đường (+1 điểm)
- **S2 - Stroke / TIA / Thromboembolism:** Tiền sử đột quỵ hoặc thuyên tắc (+2 điểm)
- **V - Vascular disease:** Bệnh động mạch ngoại biên, NMCT cũ, xơ vữa ĐMC (+1 điểm)
- **A - Age 65-74:** Tuổi từ 65-74 (+1 điểm)
- **Sc - Sex category:** Giới nữ (+1 điểm nếu có ≥ 1 YTNC khác)

*Chỉ định kháng đông đường uống (DOACs):* Bắt buộc khi điểm ≥ 2 ở nam hoặc ≥ 3 ở nữ; Nên xem xét khi điểm = 1 ở nam hoặc = 2 ở nữ.

### 3.2. Thang điểm HAS-BLED (Đánh giá nguy cơ Xuất huyết khi dùng thuốc chống đông)
- H (Tăng HA chưa kiểm soát > 160 mmHg) - 1 điểm
- A (Bất thường chức năng Thận hoặc Gan) - 1 hoặc 2 điểm
- S (Tiền sử Đột quỵ) - 1 điểm
- B (Tiền sử Xuất huyết hoặc cơ địa xuất huyết) - 1 điểm
- L (INR dao động không ổn định khi dùng VKA) - 1 điểm
- E (Tuổi > 65) - 1 điểm
- D (Dùng kèm thuốc chống kết tập tiểu cầu hoặc Rượu) - 1 hoặc 2 điểm

*Lưu ý:* HAS-BLED ≥ 3 điểm là nguy cơ xuất huyết cao, **không phải là chống chỉ định dùng kháng đông** mà là chỉ định cần theo dõi sát và giải quyết các yếu tố nguy cơ có thể đảo ngược được.
`
  },

  // 2. Nội tiết - Chuyển hóa
  {
    specialty: 'Nội tiết - Chuyển hóa',
    fileName: 'YTNC_Đái tháo đường típ 2_P1.md',
    title: 'Đái tháo đường típ 2',
    aliases: ['Yếu tố nguy cơ Đái tháo đường típ 2', 'T2D Risk Factors', 'Yếu tố nguy cơ Tiểu đường'],
    keywords: ['yếu tố nguy cơ', 'đái tháo đường', 'kháng insulin', 'mỡ tạng', 'findrisc', 'béo phì', 'hba1c'],
    icd10: ['E11', 'E11.9'],
    tag: 'he-co-quan/noi-tiet',
    content: `# BÀI HỌC: PHÂN TÍCH CÁC YẾU TỐ NGUY CƠ BỆNH ĐÁI THÁO ĐƯỜNG TÍP 2 (TYPE 2 DIABETES RISK FACTORS)

---

## 1. Cơ Chế Bệnh Sinh & Tương Tác Giữa Kháng Insulin và Suy Giảm Tế Bào Beta

Đái tháo đường típ 2 (T2D) phát triển qua một giai đoạn tiền đái tháo đường âm thầm kéo dài hàng năm. Hai khiếm khuyết sinh lý bệnh cốt lõi gồm:
1. **Tình trạng kháng Insulin (Insulin Resistance):** Giảm nhạy cảm với insulin tại mô mỡ, cơ vân và gan.
2. **Suy giảm chức năng tế bào beta tụy (Beta-cell Dysfunction):** Tế bào beta không thể duy trì tăng tiết insulin bù trừ dẫn đến tăng đường huyết tiến triển.

---

## 2. Bảng Phân Tích Các Yếu Tố Nguy Cơ Mắc ĐTĐ Típ 2 (ADA 2024 / 2026)

| Yếu tố nguy cơ | Mức độ nguy cơ (RR / OR) | Cơ chế tác động & Đặc điểm lâm sàng |
|:---|:---|:---|
| **Thừa cân / Béo phì (BMI ≥ 23 kg/m² ở người Châu Á)** | RR = 3.0 - 5.0 khi BMI > 25; RR > 10 khi BMI > 30 | Tăng giải phóng acid béo tự do (FFA) từ mỡ tạng gây ngộ độc mỡ (lipotoxicity) ở gan và tụy, chèn ép thụ thể insulin |
| **Vòng bụng lớn (Béo bụng: Nam ≥ 90cm, Nữ ≥ 80cm)** | OR = 2.5 - 3.5 độc lập với BMI | Mỡ tạng nội tạng tiết TNF-alpha, IL-6, Resistin và giảm Adiponectin làm trầm trọng kháng insulin |
| **Ít vận động thể lực (< 150 phút/tuần)** | RR = 1.3 - 1.6 | Giảm chuyển dịch kênh vận chuyển glucose GLUT-4 lên màng tế bào cơ vân khi không có co cơ |
| **Tiền sử gia đình (Thế hệ thứ nhất mắc ĐTĐ)** | RR = 2.3 nếu có 1 bố hoặc mẹ; RR = 6.0 nếu cả bố và mẹ mắc | Đa hình di truyền các gen TCF7L2, KCNJ11, PPARG ảnh hưởng đến bài tiết và đáp ứng insulin |
| **Tiền sử ĐTĐ thai kỳ (GDM) hoặc sinh con > 4.0 kg** | HR = 7.4 (95% CI: 4.8 - 11.5) | Bộc lộ tình trạng suy giảm dự trữ tế bào beta tiềm ẩn khi bị thử thách bởi kháng insulin sinh lý thai kỳ |
| **Hội chứng buồng trứng đa nang (PCOS)** | OR = 3.0 - 4.0 | Tình trạng tăng androgen kết hợp kháng insulin nội tại độc lập với cân nặng |
| **Tăng huyết áp (≥ 140/90 mmHg hoặc đang điều trị)** | OR = 1.8 - 2.2 | Rối loạn chức năng nội mô vi mạch làm giảm phân phối insulin và glucose đến mô ngoại vi |
| **Rối loạn lipid máu (HDL-C < 0.9 mmol/L và/hoặc Triglyceride > 2.8 mmol/L)** | OR = 2.0 | Tích tụ mỡ dị chỗ trong tế bào gan và tế bào beta tụy |

---

## 3. Thang Điểm Đánh Giá Nguy Cơ Lâm Sàng FINDRISC (Finnish Diabetes Risk Score)

Thang điểm FINDRISC gồm 8 câu hỏi với tổng điểm tối đa 26 điểm để sàng lọc nguy cơ mắc ĐTĐ típ 2 trong vòng 10 năm:
- **< 7 điểm (Nguy cơ thấp):** 1% mắc bệnh sau 10 năm.
- **7 - 11 điểm (Nguy cơ hơi tăng):** 4% mắc bệnh.
- **12 - 14 điểm (Nguy cơ trung bình):** 17% mắc bệnh.
- **15 - 20 điểm (Nguy cơ cao):** 33% mắc bệnh (Cần xét nghiệm HbA1c và nghiệm pháp OGTT ngay).
- **> 20 điểm (Nguy cơ rất cao):** 50% mắc bệnh.

---

## 4. Chiến Lược Sàng Lọc & Can Thiệp Ngăn Ngừa (Prevention Strategy)

- **Chỉ định tầm soát:** Người trưởng thành có BMI ≥ 23 kg/m² (châu Á) kèm ≥ 1 yếu tố nguy cơ, hoặc tất cả mọi người từ 35 tuổi trở lên bất kể thể trạng. Lặp lại mỗi 3 năm nếu bình thường, mỗi 1 năm nếu có tiền đái tháo đường (HbA1c 5.7 - 6.4%).
- **Chương trình can thiệp lối sống chuyên sâu (DPP):** Giảm ≥ 7% cân nặng ban đầu và duy trì hoạt động thể lực vừa phải ≥ 150 phút/tuần giúp giảm **58%** nguy cơ tiến triển thành ĐTĐ típ 2 (giảm tới 71% ở người > 60 tuổi).
`
  },
  {
    specialty: 'Nội tiết - Chuyển hóa',
    fileName: 'YTNC_Hội chứng chuyển hóa_P1.md',
    title: 'Hội chứng chuyển hóa',
    aliases: ['Yếu tố nguy cơ Hội chứng chuyển hóa', 'Metabolic Syndrome Risk Factors', 'Yếu tố nguy cơ MetS'],
    keywords: ['yếu tố nguy cơ', 'hội chứng chuyển hóa', 'kháng insulin', 'béo bụng', 'triglyceride', 'nội tiết'],
    icd10: ['E88.81'],
    tag: 'he-co-quan/noi-tiet',
    content: `# BÀI HỌC: CÁC YẾU TỐ NGUY CƠ & TIÊU CHUẨN CHẨN ĐOÁN HỘI CHỨNG CHUYỂN HÓA (METABOLIC SYNDROME)

---

## 1. Định Nghĩa & Tiêu Chuẩn Đồng Thuận Quốc Tế (IDF / AHA / NHLBI)

Hội chứng chuyển hóa (Metabolic Syndrome - MetS) là một tập hợp các yếu tố nguy cơ tim mạch và chuyển hóa cùng xuất hiện trên một cá thể, làm tăng gấp **2 lần nguy cơ mắc bệnh tim mạch xơ vữa** và tăng gấp **5 lần nguy cơ mắc đái tháo đường típ 2**.

Chẩn đoán xác định khi có sự hiện diện của **ít nhất 3 trong 5 thành tố** sau:
1. **Tăng vòng eo (Béo bụng):** Nam ≥ 90 cm, Nữ ≥ 80 cm (áp dụng cho người châu Á).
2. **Tăng Triglyceride máu:** ≥ 150 mg/dL (1.7 mmol/L) hoặc đang điều trị thuốc hạ triglyceride.
3. **Giảm HDL-Cholesterol:** Nam < 40 mg/dL (1.0 mmol/L), Nữ < 50 mg/dL (1.3 mmol/L) hoặc đang điều trị.
4. **Tăng Huyết áp:** Huyết áp tâm thu ≥ 130 mmHg và/hoặc huyết áp tâm trương ≥ 85 mmHg, hoặc đang dùng thuốc hạ áp.
5. **Tăng Đường huyết lúc đói:** Glucose máu lúc đói ≥ 100 mg/dL (5.6 mmol/L) hoặc đang dùng thuốc điều trị đái tháo đường.

---

## 2. Bảng Phân Tích Các Yếu Tố Nguy Cơ Thúc Đẩy Hội Chứng Chuyển Hóa

| Nhóm yếu tố | Tác nhân cụ thể | Cơ chế tác động sinh bệnh học |
|:---|:---|:---|
| **Lối sống & Dinh dưỡng** | Chế độ ăn nhiều đường fructose tinh chế và chất béo bão hòa | Thúc đẩy tổng hợp acid béo mới (De novo lipogenesis) tại gan, gây gan thoái hóa mỡ và tăng tiết VLDL |
| | Ít vận động & Lối sống tĩnh tại | Giảm khối lượng cơ vân, giảm tiêu thụ glucose ngoại vi và giảm hoạt tính men Lipoprotein Lipase (LPL) |
| **Rối loạn nội tiết & Hormone** | Rối loạn giấc ngủ & Làm việc ca đêm | Phá vỡ nhịp sinh học ngày đêm, tăng tiết cortisol ban đêm và hormone kích thích thèm ăn ghrelin |
| | Mãn kinh ở nữ giới | Suy giảm estrogen làm chuyển dịch phân bố mỡ từ dưới da đùi/mông sang tích tụ mỡ tạng ổ bụng |
| **Yếu tố di truyền & Dược lý** | Sử dụng thuốc chống loạn thần không điển hình (Olanzapine, Clozapine) | Tăng cảm giác thèm ăn mãnh liệt, tăng cân nhanh và kháng insulin trực tiếp |
| | Sử dụng Glucocorticoid kéo dài | Tăng tân tạo đường tại gan, thoái hóa protein cơ và phân bố lại mỡ dạng Cushing |

---

## 3. Chiến Lược Can Thiệp Toàn Diện

- **Giảm cân có chủ đích:** Giảm 7% - 10% trọng lượng cơ thể giúp đảo ngược tình trạng kháng insulin và cải thiện toàn bộ 5 thành tố của MetS.
- **Chế độ ăn Địa Trung Hải (Mediterranean Diet):** Giàu acid béo không bão hòa đơn (dầu ô liu), cá biển béo, hạt ngũ cốc nguyên cám giúp hạ triglyceride và tăng HDL-C hiệu quả.
`
  },

  // 3. Hô hấp
  {
    specialty: 'Hô hấp',
    fileName: 'YTNC_COPD_P1.md',
    title: 'COPD',
    aliases: ['Yếu tố nguy cơ COPD', 'COPD Risk Factors', 'Yếu tố nguy cơ Bệnh phổi tắc nghẽn mạn tính'],
    keywords: ['yếu tố nguy cơ', 'copd', 'thuốc lá', 'khói bụi', 'gold', 'alpha-1 antitrypsin', 'khí phế thũng'],
    icd10: ['J44', 'J44.9'],
    tag: 'he-co-quan/ho-hap',
    content: `# BÀI HỌC: PHÂN TÍCH CÁC YẾU TỐ NGUY CƠ BỆNH PHỔI TẮC NGHẼN MẠN TÍNH (COPD RISK FACTORS)

---

## 1. Tổng Quan & Cơ Chế Tương Tác Gen - Môi Trường (GOLD 2024 / 2025)

Bệnh phổi tắc nghẽn mạn tính (COPD) là một bệnh lý hô hấp không đồng nhất, đặc trưng bởi các triệu chứng hô hấp mạn tính (khó thở, ho, khạc đờm) do bất thường đường thở (viêm phế quản mạn) và/hoặc phế nang (khí phế thũng) gây tắc nghẽn luồng khí dai dẳng và tiến triển.

COPD hình thành do sự tương tác qua lại suốt đời giữa **các yếu tố phơi nhiễm môi trường độc hại** và **tính nhạy cảm di truyền của cơ thể** làm biến đổi quá trình phát triển và lão hóa của phổi.

---

## 2. Bảng Phân Tích Các Yếu Tố Nguy Cơ Cốt Lõi Của COPD

| Yếu tố nguy cơ | Mức độ nguy cơ (RR / OR) | Cơ chế tác động sinh lý bệnh học |
|:---|:---|:---|
| **Khói thuốc lá (Chủ động & Thụ động)** | Chịu trách nhiệm cho 70% - 80% ca bệnh; RR = 4.0 - 6.0 | Hơn 7.000 hóa chất độc hại gây bất hoạt lông chuyển biểu mô phế quản, kích hoạt đại thực bào tiết men tiêu protein (Elastase, MMP-9, MMP-12), phá hủy vách phế nang |
| **Gánh nặng Hút thuốc (Gói-năm)** | Nguy cơ tăng vọt khi tiền sử ≥ 20 gói-năm | Mối liên hệ liều - đáp ứng rõ rệt giữa số lượng bao-năm và tốc độ sụt giảm FEV1 hàng năm |
| **Khói sinh khối (Biomass Fuel) & Bếp than tổ ong** | OR = 2.4 - 3.2 (Đặc biệt ở phụ nữ nông thôn không hút thuốc) | Bồ hóng, hạt mịn PM2.5, carbon monoxide từ đun nấu bằng củi/than gây viêm xơ hóa tiểu phế quản tận |
| **Bụi và Hóa chất nghề nghiệp** | Chiếm 15% tổng số ca COPD; OR = 1.6 - 2.0 | Bụi than, silica, bông sợi, hơi kim loại gây stress oxy hóa mạn tính đường thở |
| **Thiếu hụt Alpha-1 Antitrypsin (AATD)** | Chiếm 1% - 2% ca bệnh; Đột biến đồng hợp tử Pi*ZZ | Thiếu hụt chất ức chế men elastase của bạch cầu trung tính, dẫn đến phá hủy toàn bộ phế nang vùng đáy phổi gây khí phế thũng toàn tiểu thùy ở người trẻ (30-40 tuổi) |
| **Sự phát triển phổi kém thời thơ ấu** | RR = 2.0 - 3.0 | Đẻ non, nhẹ cân khi sinh, nhiễm trùng hô hấp tái diễn thời thơ ấu (RSV, Adenovirus) làm giảm đỉnh thể tích phổi đạt được ở tuổi trưởng thành |
| **Hen phế quản đồng mắc & Tăng phản ứng đường thở** | HR = 2.5 - 3.0 phát triển COPD cố định | Tình trạng viêm tăng bạch cầu ái toan mạn tính gây tái cấu trúc thành phế quản và xơ hóa dưới biểu mô (Hội chứng chồng lấp ACO) |

---

## 3. Phân Loại Căn Nguyên COPD Theo Hướng Dẫn Mới (GOLD Taxonomy)

- **COPD-P (Genetic / Alpha-1):** Do thiếu hụt AATD.
- **COPD-D (Developmental):** Do bất thường phát triển phổi sớm.
- **COPD-C (Cigarette smoking):** Do khói thuốc lá truyền thống.
- **COPD-P (Pollution):** Do ô nhiễm không khí và khói sinh khối.
- **COPD-I (Infection):** Do di chứng lao phổi hoặc nhiễm trùng nặng thời thơ ấu.
- **COPD-A (Asthma):** Do hen phế quản kéo dài tái cấu trúc.
`
  },
  {
    specialty: 'Hô hấp',
    fileName: 'YTNC_Bệnh lao_P1.md',
    title: 'Bệnh lao',
    aliases: ['Yếu tố nguy cơ Bệnh lao', 'Tuberculosis Risk Factors', 'Yếu tố nguy cơ Nhiễm Lao và Lao hoạt động'],
    keywords: ['yếu tố nguy cơ', 'lao phổi', 'hiv', 'suy giảm miễn dịch', 'tiếp xúc nguồn lây', 'dịch tễ lao'],
    icd10: ['A15', 'A16'],
    tag: 'he-co-quan/ho-hap',
    content: `# BÀI HỌC: CÁC YẾU TỐ NGUY CƠ NHIỄM VÀ TIẾN TRIỂN THÀNH BỆNH LAO HOẠT ĐỘNG (TUBERCULOSIS RISK FACTORS)

---

## 1. Phân Biệt Hai Giai Đoạn Nguy Cơ: Nhiễm Lao vs Lao Hoạt Động

Dưới góc độ dịch tễ học và miễn dịch, các yếu tố nguy cơ của bệnh Lao (*Mycobacterium tuberculosis*) được chia thành 2 nhóm hoàn toàn tách biệt:
1. **Nguy cơ Phơi Nhiễm & Nhiễm Lao Tiềm Ẩn (LTBI):** Phụ thuộc vào mật độ vi khuẩn trong không khí và thời gian tiếp xúc gần nguồn lây.
2. **Nguy cơ Tái Hoạt từ Lao Tiềm Ẩn thành Lao Hoạt Động (Active TB Disease):** Phụ thuộc vào sự suy giảm miễn dịch qua trung gian tế bào (CD4+ T-cell và IFN-gamma).

---

## 2. Bảng Phân Tích Các Yếu Tố Nguy Cơ Tái Hoạt Thành Lao Hoạt Động

| Yếu tố nguy cơ / Tình trạng bệnh nền | Nguy cơ tương đối (RR) hoặc Tỷ lệ tái hoạt hàng năm | Cơ chế suy giảm miễn dịch bảo vệ |
|:---|:---|:---|
| **Đồng nhiễm HIV/AIDS** | Nguy cơ tái hoạt 5% - 10% mỗi năm (so với 5-10% suốt đời ở người bình thường); RR = 20 - 30 | Cạn kiệt lympho bào T CD4+, suy giảm tiết IFN-gamma và TNF-alpha làm vỡ cấu trúc nang củ lao |
| **Sử dụng thuốc Ức chế TNF-alpha (Infliximab, Adalimumab)** | RR = 4.0 - 10.0 | TNF-alpha là cytokine sống còn duy trì vỏ bao xơ bao bọc vi khuẩn lao trong nang củ |
| **Ghép tạng đặc & Dùng thuốc ức chế miễn dịch (Cyclosporine, Tacrolimus)** | RR = 20 - 70 | Ức chế toàn diện hoạt hóa và tăng sinh tế bào T |
| **Bệnh Bụi phổi Silic (Silicosis)** | RR = 30 | Hạt tinh thể silica bị đại thực bào phế nang thực bào gây độc tế bào, phá hủy khả năng tiêu diệt trực khuẩn lao |
| **Sử dụng Corticoid liều cao kéo dài (Prednisone ≥ 15mg/ngày > 1 tháng)** | RR = 2.0 - 4.0 | Ức chế đại thực bào và sản xuất các cytokine tiền viêm |
| **Đái tháo đường không kiểm soát (HbA1c > 8.5%)** | RR = 3.0 | Rối loạn chức năng thực bào và hóa ứng động của bạch cầu đa nhân |
| **Bệnh Thận mạn giai đoạn cuối / Lọc máu chu kỳ** | RR = 10 - 25 | Hội chứng ure huyết cao gây ức chế miễn dịch tế bào mắc phải |
| **Suy dinh dưỡng nặng (BMI < 18.5 kg/m²)** | RR = 2.0 - 3.0 | Teo tuyến ức, giảm sản xuất lympho bào và thiếu hụt vi chất |

---

## 3. Đối Tượng Bắt Buộc Sàng Lọc Lao Tiềm Ẩn & Điều Trị Dự Phòng

- Người nhiễm HIV ở mọi giai đoạn lâm sàng.
- Người tiếp xúc hộ gia đình gần gũi với bệnh nhân lao phổi có AFB đờm (+), đặc biệt là trẻ em < 5 tuổi.
- Bệnh nhân chuẩn bị khởi trị thuốc sinh học (Anti-TNF), thuốc ức chế miễn dịch mạnh hoặc ghép tế bào gốc/tạng đặc.
- Bệnh nhân bụi phổi silic hoặc bệnh nhân lọc máu chu kỳ.
`
  },

  // 4. Tiêu hóa - Gan mật
  {
    specialty: 'Tiêu hóa - Gan mật',
    fileName: 'YTNC_Bệnh gan nhiễm mỡ (MASLD & MASH)_P1.md',
    title: 'Bệnh gan nhiễm mỡ (MASLD & MASH)',
    aliases: ['Yếu tố nguy cơ MASLD', 'Yếu tố nguy cơ MASH', 'NAFLD Risk Factors', 'Yếu tố nguy cơ Gan thoái hóa mỡ'],
    keywords: ['yếu tố nguy cơ', 'masld', 'mash', 'nafld', 'fib-4', 'tiểu đường', 'xơ gan', 'aasld'],
    icd10: ['K76.0', 'K75.8'],
    tag: 'he-co-quan/tieu-hoa',
    content: `# BÀI HỌC: CÁC YẾU TỐ NGUY CƠ BỆNH GAN THOÁI HÓA MỠ LIÊN QUAN CHUYỂN HÓA (MASLD / MASH)

---

## 1. Danh Pháp Mới & Tiêu Chuẩn Phân Loại (AASLD / EASL 2023 - 2026)

Hội Bệnh Gan Hoa Kỳ (AASLD) và Châu Âu (EASL) đã chính thức đồng thuận chuyển đổi danh pháp từ **NAFLD (Non-Alcoholic Fatty Liver Disease)** sang **MASLD (Metabolic Dysfunction-Associated Steatotic Liver Disease)** nhằm nhấn mạnh vai trò trung tâm của rối loạn chuyển hóa tim mạch:

- **MASLD:** Bằng chứng gan thoái hóa mỡ (trên siêu âm, Fibroscan, MRI hoặc sinh thiết) kèm theo **ít nhất 1 trong 5 tiêu chí tim mạch - chuyển hóa** (Thừa cân/béo phì, Tăng đường huyết/ĐTĐ típ 2, Tăng huyết áp, Tăng Triglyceride, hoặc Giảm HDL-C).
- **MASH (Metabolic Dysfunction-Associated Steatohepatitis):** Thể viêm gan thoái hóa mỡ hoạt động có tổn thương tế bào gan (ballooning) và nguy cơ cao tiến triển thành xơ hóa gan, xơ gan và ung thư tế bào gan (HCC).

---

## 2. Bảng Phân Tích Các Yếu Tố Nguy Cơ Tiến Triển Xơ Hóa Gan Nặng Trong MASLD

| Yếu tố nguy cơ | Mức độ nguy cơ (OR / HR) | Tác động lâm sàng & Giá trị dự báo |
|:---|:---|:---|
| **Đái tháo đường típ 2 đồng mắc** | OR = 3.5 - 4.5 cho xơ hóa tiến triển (≥ F3); Tăng gấp đôi nguy cơ tử vong | Yếu tố dự báo độc lập mạnh nhất cho MASH và xơ gan mất bù; tăng tỷ lệ phát sinh HCC ngay cả khi chưa xơ gan |
| **Béo phì độ II/III (BMI ≥ 35 kg/m²)** | OR = 3.0 | Tăng dòng acid béo tự do tràn ngập qua tĩnh mạch cửa vào gan gây độc mỡ tế bào gan |
| **Đa hình di truyền gen PNPLA3 (biến thể I148M)** | OR = 3.2 cho xơ gan; OR = 2.5 cho HCC | Làm suy giảm sự thủy phân giọt mỡ trong tế bào gan, gây tích tụ mỡ mạn tính bất kể lối sống |
| **Đa hình gen TM6SF2 & HSD17B13** | TM6SF2 tăng xơ hóa; HSD17B13 có tính bảo vệ chống xơ hóa | Định hình tính nhạy cảm di truyền đối với viêm gan và xơ hóa mô kẽ |
| **Hội chứng Chuyển hóa toàn diện (≥ 3 tiêu chí)** | HR = 2.8 cho biến cố tim mạch và xơ gan | Tương tác cộng gộp giữa tăng huyết áp, tăng mỡ máu và kháng insulin |
| **Tuổi > 50** | Điểm số trong FIB-4 | Thời gian phơi nhiễm với độc tính chuyển hóa kéo dài tích lũy xơ hóa mô gan |

---

## 3. Thuật Toán Sàng Lọc Đa Tầng Bằng Chỉ Số FIB-4 (AASLD 2023 Guidelines)

Tất cả bệnh nhân ĐTĐ típ 2, tiền đái tháo đường hoặc có ≥ 2 yếu tố nguy cơ chuyển hóa bắt buộc phải được tính điểm **FIB-4** định kỳ:

$$\text{FIB-4} = \frac{\text{Tuổi (năm)} \times \text{AST (U/L)}}{\text{Tiểu cầu } (10^9/\text{L}) \times \sqrt{\text{ALT (U/L)}}}$$

- **FIB-4 < 1.30 (Nguy cơ thấp):** Độ đặc hiệu cao loại trừ xơ hóa tiến triển. Quản lý can thiệp lối sống tại chăm sóc ban đầu, đánh giá lại sau 2 năm.
- **FIB-4 1.30 - 2.67 (Nguy cơ trung bình):** Cần làm tiếp xét nghiệm tầng 2 (Đo độ cứng gan bằng VCTE / FibroScan hoặc ELF test).
- **FIB-4 > 2.67 (Nguy cơ cao):** Nhiều khả năng đã có xơ hóa nặng (≥ F3) hoặc xơ gan. Chuyển khám chuyên khoa Gan Mật ngay để tầm soát giãn tĩnh mạch thực quản và siêu âm tầm soát HCC mỗi 6 tháng.
`
  },
  {
    specialty: 'Tiêu hóa - Gan mật',
    fileName: 'YTNC_Hội chứng Alagille_P1.md',
    title: 'Hội chứng Alagille',
    aliases: ['Yếu tố nguy cơ Hội chứng Alagille', 'Alagille Syndrome Risk Factors', 'ALGS Risk Factors'],
    keywords: ['yếu tố nguy cơ', 'hội chứng alagille', 'jag1', 'notch2', 'teo đường mật', 'ứ mật', 'di truyền trội'],
    icd10: ['Q44.7'],
    tag: 'he-co-quan/tieu-hoa',
    content: `# BÀI HỌC: CÁC YẾU TỐ NGUY CƠ & DI TRUYỀN HỌC PHÂN TỬ HỘI CHỨNG ALAGILLE (ALAGILLE SYNDROME RISK FACTORS)

---

## 1. Yếu Tố Di Truyền & Đột Biến Gen Căn Nguyên

Hội chứng Alagille (ALGS) là một rối loạn di truyền đa hệ thống phức tạp, lây truyền theo tính trạng **trội trên nhiễm sắc thể thường (Autosomal Dominant)** với mức độ biểu hiện kiểu hình rất đa dạng (variable expressivity) và độ thâm nhập không hoàn toàn (incomplete penetrance):

| Gen đột biến | Tần suất xuất hiện | Vị trí nhiễm sắc thể | Cơ chế phân tử |
|:---|:---|:---|:---|
| **Gen JAG1 (ALGS Loại 1)** | 94% - 97% trường hợp | 20p12.2 | Đột biến mất chức năng (loss-of-function), dịch khung, đột biến vô nghĩa gây hiện tượng thiếu hụt đơn liều (haploinsufficiency) của phối tử Jagged-1 |
| **Gen NOTCH2 (ALGS Loại 2)** | 1% - 4% trường hợp | 1p12 | Đột biến sai nghĩa hoặc mất đoạn ở thụ thể xuyên màng Notch-2 |
| **Đột biến mới phát sinh (De novo mutations)** | 50% - 70% tổng số ca bệnh | N/A | Bệnh nhân là người đầu tiên trong gia đình mang đột biến, cha mẹ hoàn toàn bình thường |
| **Thừa hưởng từ cha hoặc mẹ mang gen** | 30% - 50% | N/A | Con cái của người mang gen đột biến có **50% xác suất di truyền** đột biến ở mỗi lần mang thai |

---

## 2. Các Yếu Tố Tiên Lượng & Nguy Cơ Biến Chứng Đe Dọa Tính Mạng

1. **Bệnh lý Mạch máu Hệ thống & Mạch Máu Não (Vasculopathy):**
   - Là yếu tố nguy cơ tử vong hàng đầu ở bệnh nhân ALGS (chiếm 34% tổng số ca tử vong).
   - Nguy cơ phình động mạch não, bệnh lý Moyamoya gây đột quỵ xuất huyết não hoặc thiếu máu não cục bộ sớm ở trẻ em và người trẻ tuổi.
2. **Dị tật Tim mạch Phức tạp:**
   - Tứ chứng Fallot kèm teo tịt van động mạch phổi là yếu tố nguy cơ tử vong sớm chu sinh.
3. **Ứ mật Mạn tính Nặng & Suy Dinh Dưỡng Thể Còm Cọc:**
   - Kém hấp thu mỡ và các vitamin tan trong dầu (A, D, E, K) gây nguy cơ xuất huyết nội sọ do thiếu vitamin K và bệnh lý gãy xương tự phát.
4. **Bẫy Nguy Hiểm: Phẫu Thuật Nối Ruột Kasai Nhầm Lẫn:**
   - Nếu chẩn đoán nhầm ALGS là Teo đường mật bẩm sinh (Biliary Atresia) và tiến hành phẫu thuật Kasai, tỷ lệ tử vong tăng vọt từ 2.8% lên **31.6%** do phá hủy thêm mạng lưới đường mật vốn đã nghèo nàn.
`
  },

  // 5. Thận - Tiết niệu
  {
    specialty: 'Thận - Tiết niệu',
    fileName: 'YTNC_Bệnh thận mạn (CKD)_P1.md',
    title: 'Bệnh thận mạn (CKD)',
    aliases: ['Yếu tố nguy cơ Bệnh thận mạn', 'CKD Risk Factors', 'Yếu tố nguy cơ Suy thận mạn'],
    keywords: ['yếu tố nguy cơ', 'bệnh thận mạn', 'ckd', 'tiểu đường', 'tăng huyết áp', 'protein niệu', 'kdigo'],
    icd10: ['N18', 'N18.3', 'N18.5', 'N18.9'],
    tag: 'he-co-quan/than-tiet-nieu',
    content: `# BÀI HỌC: PHÂN TÍCH CÁC YẾU TỐ NGUY CƠ BỆNH THẬN MẠN & TIẾN TRIỂN SUY THẬN (CKD RISK FACTORS)

---

## 1. Phân Tầng Yếu Tố Nguy Cơ Bệnh Thận Mạn Theo KDIGO 2024

KDIGO phân chia các yếu tố nguy cơ của CKD thành 3 nhóm theo trình tự thời gian:
1. **Yếu tố Khởi phát (Initiating Factors):** Trực tiếp gây tổn thương nhu mô thận ban đầu.
2. **Yếu tố Thúc đẩy Tiến triển (Progression Factors):** Làm tăng tốc độ suy giảm mức lọc cầu thận (eGFR) dẫn đến suy thận giai đoạn cuối (ESKD).
3. **Yếu tố Nhạy cảm Cơ địa (Susceptibility Factors):** Làm tăng tính dễ bị tổn thương của thận.

---

## 2. Bảng Phân Tích Chi Tiết Các Yếu Tố Nguy Cơ

| Nhóm yếu tố | Tác nhân cụ thể | Tỷ lệ / Mức độ nguy cơ | Cơ chế tác động sinh bệnh học |
|:---|:---|:---|:---|
| **Yếu tố Khởi phát hàng đầu** | Đái tháo đường (Típ 1 & 2) | Chiếm 40% - 50% tổng số ca ESKD | Tăng áp lực lọc cầu thận, phì đại cầu thận, dày màng đáy và xơ hóa gian mạch do AGEs |
| | Tăng huyết áp | Chiếm 25% - 30% tổng số ca ESKD | Xơ cứng tiểu động mạch đến và đi, làm mất cơ chế tự điều hòa lưu lượng máu cầu thận |
| | Viêm cầu thận nguyên phát (IgA, Màng, FSGS) | Chiếm 10% - 15% | Lắng đọng phức hợp miễn dịch kích hoạt bổ thể phá hủy màng lọc cầu thận |
| **Yếu tố Thúc đẩy Tiến triển** | Mức độ Albumin niệu (UACR > 300 mg/g) | HR = 3.0 - 5.0 cho suy thận giai đoạn cuối | Protein rò rỉ qua cầu thận bị tế bào ống lượn gần tái hấp thu gây độc tế bào, viêm và xơ hóa mô kẽ thận |
| | Kiểm soát Huyết áp kém (> 140/90 mmHg) | Mất thêm 2 - 5 mL/phút eGFR mỗi năm | Tăng áp lực nội cầu thận liên tục |
| | Thuốc độc thận (NSAIDs, Kháng sinh Aminoglycoside) | Tăng nguy cơ đợt cấp AKI trên nền CKD | Ức chế tổng hợp Prostaglandin gây co tiểu động mạch đến làm giảm tưới máu thận |
| | Thuốc cản quang đường tĩnh mạch (CIN) | Nguy cơ cao khi eGFR < 30 | Gây co mạch tủy thận và hoại tử ống thận cấp |
| | Hút thuốc lá | HR = 1.5 - 2.0 | Gây xơ cứng động mạch thận và tăng stress oxy hóa nội mô |

---

## 3. Ma Trận Phân Tầng Nguy Cơ KDIGO Theo eGFR (G) và Albumin Niệu (A)

Bảng đối chiếu màu sắc phân tầng nguy cơ tử vong và tiến triển ESKD:
- **Nguy cơ Thấp (Xanh lá - G1/G2 kèm A1):** Khám định kỳ hàng năm.
- **Nguy cơ Trung bình (Vàng - G3a-A1 hoặc G1/G2-A2):** Tầm soát mỗi năm 1 lần.
- **Nguy cơ Cao (Cam - G3b-A1, G3a-A2, G1/G2-A3):** Khám chuyên khoa Thận mỗi 6 tháng.
- **Nguy cơ Rất cao (Đỏ - G4/G5 hoặc G3b-A3):** Khám và chuẩn bị điều trị thay thế thận (lọc máu, ghép thận) mỗi 3 tháng.
`
  },

  // 6. Thần kinh
  {
    specialty: 'Thần kinh',
    fileName: 'YTNC_Đột quỵ não_P1.md',
    title: 'Đột quỵ não',
    aliases: ['Yếu tố nguy cơ Đột quỵ não', 'Stroke Risk Factors', 'Yếu tố nguy cơ Tai biến mạch máu não'],
    keywords: ['yếu tố nguy cơ', 'đột quỵ não', 'tai biến mạch máu não', 'rung nhĩ', 'tăng huyết áp', 'hẹp động mạch cảnh', 'abcd2'],
    icd10: ['I63', 'I61', 'I64'],
    tag: 'he-co-quan/than-kinh',
    content: `# BÀI HỌC: PHÂN TÍCH CÁC YẾU TỐ NGUY CƠ ĐỘT QUỴ NÃO (STROKE RISK FACTORS)

---

## 1. Phân Loại Nguy Cơ Đột Quỵ: Nhồi Máu Não vs Xuất Huyết Não

Đột quỵ não là nguyên nhân hàng đầu gây tàn phế vĩnh viễn và nguyên nhân tử vong thứ hai trên toàn cầu. Các yếu tố nguy cơ có sự phân hóa rõ nét giữa hai thể bệnh:
- **Đột quỵ Thiếu máu não cục bộ (Ischemic Stroke - 85%):** Do thuyên tắc từ tim (Cardioembolism), xơ vữa động mạch lớn (Large artery atherosclerosis) hoặc tắc mạch máu nhỏ (Lacunar stroke).
- **Đột quỵ Xuất huyết não (Hemorrhagic Stroke - 15%):** Do vỡ vi phình mạch Charcot-Bouchard do tăng huyết áp, bệnh mạch máu dạng bột (CAA) hoặc dị dạng mạch máu (AVM, phình động mạch não).

---

## 2. Bảng Phân Tích Các Yếu Tố Nguy Cơ Đột Quỵ (AHA/ASA Guidelines)

| Yếu tố nguy cơ | Thể đột quỵ liên quan | Nguy cơ tương đối (RR / OR) | Tác động sinh bệnh học & Mục tiêu can thiệp |
|:---|:---|:---|:---|
| **Tăng huyết áp** | Cả hai thể (Đặc biệt Xuất huyết não) | RR = 3.0 - 4.0; Đóng góp 50% các ca đột quỵ | Yếu tố nguy cơ có thể thay đổi quan trọng nhất. Hạ mỗi 10 mmHg HA tâm thu giúp giảm **30% - 40%** nguy cơ đột quỵ |
| **Rung nhĩ (AF)** | Nhồi máu não thuyên tắc từ tim | Tăng nguy cơ gấp 5.0 lần (Gây 20% ca nhồi máu não) | Cục máu đông hình thành ở tiểu nhĩ trái trôi lên làm tắc các nhánh động mạch não lớn (MCA, ACA). Chỉ định dùng DOACs |
| **Hẹp Động mạch Cảnh trong (> 50% - 70%)** | Nhồi máu não cùng bên | Tăng nguy cơ 2% - 5% mỗi năm nếu có triệu chứng | Mảnh xơ vữa nứt vỡ bắn lên não hoặc tắc nghẽn huyết động. Xem xét bóc tách nội mạc (CEA) hoặc đặt stent (CAS) |
| **Hút thuốc lá** | Cả hai thể | RR = 2.0 (Gấp đôi nguy cơ) | Tăng độ nhớt máu, tăng fibrinogen, thúc đẩy xơ vữa động mạch cảnh và động mạch nội sọ |
| **Đái tháo đường** | Nhồi máu não mạch máu nhỏ | RR = 2.0 - 3.0 | Thoái hóa kính tiểu động mạch xuyên não (Lipohyalinosis) gây nhồi máu não ổ khuyết |
| **Cơn Thiếu máu não Thoáng qua (TIA) tiền sử** | Nhồi máu não | Nguy cơ đột quỵ 10% - 15% trong vòng 90 ngày (50% xảy ra trong 48 giờ đầu) | Cảnh báo khẩn cấp cần nhập viện đánh giá và điều trị kháng kết tập tiểu cầu kép sớm |

---

## 3. Thang Điểm Dự Báo Nguy Cơ Đột Quỵ Sau Cơn TIA (Thang Điểm ABCD2)

- **A - Age:** Tuổi ≥ 60 (+1 điểm)
- **B - Blood pressure:** Huyết áp lúc khám ≥ 140/90 mmHg (+1 điểm)
- **C - Clinical features:** Yếu liệt một bên (+2 điểm) hoặc Rối loạn ngôn ngữ đơn thuần không yếu liệt (+1 điểm)
- **D - Duration of symptoms:** Thời gian kéo dài ≥ 60 phút (+2 điểm) hoặc 10 - 59 phút (+1 điểm)
- **D - Diabetes:** Có đái tháo đường (+1 điểm)

*Phân tầng xử trí:*
- **6 - 7 điểm (Nguy cơ cao):** Tỷ lệ đột quỵ 8.1% sau 2 ngày ➔ Bắt buộc nhập viện theo dõi khẩn cấp.
- **4 - 5 điểm (Nguy cơ trung bình):** Tỷ lệ đột quỵ 4.1% sau 2 ngày.
- **0 - 3 điểm (Nguy cơ thấp):** Tỷ lệ đột quỵ 1.0% sau 2 ngày.
`
  },

  // 7. Truyền nhiễm
  {
    specialty: 'Truyền nhiễm & Vi sinh',
    fileName: 'YTNC_Nhiễm nấm xâm lấn_P1.md',
    title: 'Nhiễm nấm xâm lấn',
    aliases: ['Yếu tố nguy cơ Nhiễm nấm xâm lấn', 'Invasive Fungal Infection Risk Factors', 'Yếu tố nguy cơ Candida và Aspergillus máu'],
    keywords: ['yếu tố nguy cơ', 'nhiễm nấm xâm lấn', 'candida máu', 'aspergillus', 'giảm bạch cầu hạt', 'ghép tạng'],
    icd10: ['B49', 'B44', 'B37.7'],
    tag: 'he-co-quan/truyen-nhiem',
    content: `# BÀI HỌC: CÁC YẾU TỐ NGUY CƠ NHIỄM NẤM XÂM LẤN (INVASIVE FUNGAL INFECTION RISK FACTORS)

---

## 1. Phân Tầng Nhóm Đối Tượng Nguy Cơ Cao (Bộ Y Tế / IDSA Guidelines)

Nhiễm nấm xâm lấn (Invasive Fungal Infections - IFI), bao gồm Nhiễm nấm Candida máu, Nấm Aspergillus phổi xâm lấn (IPA), Nấm Mucorales và Cryptococcus, là nguyên nhân gây tử vong cực kỳ cao (30% - 80%) ở bệnh nhân hồi sức và suy giảm miễn dịch nặng.

---

## 2. Bảng Phân Tích Các Yếu Tố Nguy Cơ Đặc Hiệu Theo Từng Chủng Nấm

| Chủng nấm gây bệnh | Các yếu tố nguy cơ lâm sàng cốt lõi | Cơ chế suy giảm hàng rào phòng vệ |
|:---|:---|:---|
| **Nhiễm Candida máu & Nấm xâm lấn ổ bụng** | • Đặt catheter tĩnh mạch trung tâm (CVC) dài ngày<br>• Phẫu thuật ổ bụng phức tạp hoặc thủng tạng rỗng<br>• Nằm điều trị tại ICU > 7 ngày<br>• Nuôi ăn hoàn toàn qua đường tĩnh mạch (TPN)<br>• Sử dụng kháng sinh phổ rộng kéo dài (> 3 nhóm kháng sinh)<br>• Lọc máu liên tục (CRRT) | Phá hủy hệ vi sinh đường ruột và tổn thương niêm mạc ruột làm nấm Candida chuyển dịch vào máu; màng sinh học (biofilm) bám trên bề mặt ống thông tĩnh mạch |
| **Nhiễm Aspergillus phổi xâm lấn (IPA)** | • Giảm bạch cầu trung tính kéo dài (ANC < 500 tế bào/µL > 10 ngày)<br>• Bệnh lý huyết học ác tính (Bạch cầu cấp dòng tủy - AML)<br>• Ghép tế bào gốc tạo máu dị sinh (Allogeneic HSCT)<br>• Sử dụng Corticoid liều cao kéo dài (Prednisone > 20mg/ngày > 3 tuần)<br>• Cúm nặng hoặc COVID-19 nặng nằm thở máy (CAPA / IAPA) | Mất hàng rào thực bào của bạch cầu trung tính và đại thực bào phế nang để tiêu diệt bào tử nấm Aspergillus hít vào |
| **Nhiễm Nấm đen (Mucormycosis)** | • Nhiễm toan ceton do đái tháo đường (DKA)<br>• Quá tải sắt hoặc đang điều trị bằng thuốc thải sắt Deferoxamine<br>• Suy giảm miễn dịch nặng kèm suy thận | Nồng độ sắt tự do trong huyết thanh tăng cao và môi trường toan máu tạo điều kiện tối hảo cho nấm Mucorales phát triển và xâm lấn mạch máu |

---

## 3. Thang Điểm Dự Báo Nhiễm Candida Xâm Lấn Tại ICU (Candida Score)

Thang điểm của León et al. giúp quyết định chỉ định điều trị thuốc kháng nấm kinh nghiệm (Echinocandin) sớm:
- **Phẫu thuật lúc nhập viện:** +1 điểm
- **Nuôi ăn tĩnh mạch hoàn toàn (TPN):** +1 điểm
- **Nhiễm khuẩn huyết nặng / Sốc nhiễm khuẩn:** +1 điểm
- **Mang nấm đa ổ (Multifocal colonization):** +2 điểm

*Ngưỡng quyết định:* **Candida Score ≥ 3 điểm** có độ nhạy 81% và độ đặc hiệu 74% để dự báo nhiễm Candida xâm lấn ➔ Chỉ định khởi trị Echinocandin (Caspofungin / Micafungin) sớm.
`
  },
  {
    specialty: 'Truyền nhiễm & Vi sinh',
    fileName: 'YTNC_Sốt xuất huyết Dengue nặng_P1.md',
    title: 'Sốt xuất huyết Dengue nặng',
    aliases: ['Yếu tố nguy cơ Sốt xuất huyết Dengue nặng', 'Severe Dengue Risk Factors', 'Yếu tố chuyển nặng Dengue'],
    keywords: ['yếu tố nguy cơ', 'sốt xuất huyết', 'dengue', 'tái nhiễm', 'thoát huyết tương', 'sốc dengue', 'ade'],
    icd10: ['A90', 'A91'],
    tag: 'he-co-quan/truyen-nhiem',
    content: `# BÀI HỌC: CÁC YẾU TỐ NGUY CƠ DIỄN TIẾN NẶNG TRONG SỐT XUẤT HUYẾT DENGUE (SEVERE DENGUE RISK FACTORS)

---

## 1. Cơ Chế Tăng Cường Miễn Dịch Phụ Thuộc Kháng Thể (ADE)

Yếu tố nguy cơ sinh học quan trọng nhất khiến một bệnh nhân sốt xuất huyết Dengue tiến triển thành thể nặng (Sốc Dengue, Xuất huyết nặng, Suy tạng) là hiện tượng **Tái nhiễm với một type huyết thanh virus Dengue khác (Secondary Heterotypic Infection)**:
- Sau lần nhiễm đầu tiên, cơ thể tạo kháng thể trung hòa đặc hiệu bền vững với type đó nhưng chỉ tạo kháng thể phản ứng chéo không hoàn toàn với 3 type còn lại.
- Khi tái nhiễm type thứ hai, các kháng thể không trung hòa này liên kết với virus và gắn vào thụ thể Fc-gamma trên bề mặt tế bào mono/đại thực bào, giúp virus xâm nhập và nhân lên ồ ạt (Antibody-Dependent Enhancement - ADE).
- Tải lượng virus tăng vọt kích hoạt bão cytokine làm tổn thương lớp glycocalyx nội mô mao mạch, gây **thoát huyết tương ồ ạt** vào ngày thứ 3 đến ngày thứ 7 của bệnh.

---

## 2. Bảng Nhận Diện Các Yếu Tố Cơ Địa Nguy Cơ Chuyển Nặng (WHO / BYT 2023)

| Nhóm cơ địa đặc biệt | Nguy cơ lâm sàng nổi bật | Hướng xử trí theo dõi |
|:---|:---|:---|
| **Trẻ nhũ nhi (< 12 tháng tuổi)** | Dễ vào sốc nhanh, khó nhận biết dấu hiệu cảnh báo sớm, tỷ lệ co giật và tổn thương gan cao | Chỉ định nhập viện theo dõi nội trú bắt buộc |
| **Phụ nữ mang thai** | Nguy cơ xuất huyết tử cung nặng khi sinh, sảy thai, sinh non, băng huyết sau sinh | Theo dõi sát tiểu cầu và đông máu, hội chẩn sản khoa |
| **Người béo phì (BMI > 25 - 30 kg/m²)** | Thoát huyết tương nặng, khó lấy ven truyền dịch, nguy cơ quá tải dịch khi bù dịch theo cân nặng thực tế | Bắt buộc tính liều dịch truyền theo **Cân nặng lý tưởng (Ideal Body Weight - IBW)** |
| **Người cao tuổi (≥ 65 tuổi) có bệnh nền** | Đang mắc THA, ĐTĐ, bệnh mạch vành, CKD dễ thúc đẩy suy đa tạng và quá tải tuần hoàn | Theo dõi sát sinh hiệu và lượng nước tiểu mỗi 1-2 giờ |
| **Bệnh nhân có bệnh lý dạ dày hoặc bệnh máu** | Nguy cơ xuất huyết tiêu hóa ồ ạt khi tiểu cầu giảm sâu | Cân nhắc truyền tiểu cầu và thuốc ức chế bơm proton (PPI) khi có chỉ định |

---

## 3. Dấu Hiệu Cảnh Báo (Warning Signs) Bắt Buộc Nhập Viện Theo Dõi Sát

Bắt đầu xuất hiện từ ngày thứ 3 đến ngày thứ 7:
1. Đau bụng nhiều và liên tục hoặc tăng cảm giác đau vùng gan.
2. Nôn ói liên tục (≥ 3 lần/1 giờ hoặc ≥ 4 lần/6 giờ).
3. Xuất huyết niêm mạc (chảy máu cam, chảy máu chân răng, rong kinh, tiểu máu, nôn ra máu).
4. Ứ trệ dịch lâm sàng (tràn dịch màng phổi, tràn dịch màng bụng).
5. Vật vã, lừ đừ, li bì hoặc bứt rứt.
6. Gan to > 2 cm dưới bờ sườn.
7. Xét nghiệm: Hematocrit (HCT) tăng cao kèm theo số lượng tiểu cầu giảm nhanh chóng.
`
  },

  // 8. Sản phụ khoa
  {
    specialty: 'Sản phụ khoa',
    fileName: 'YTNC_Tiền sản giật_P1.md',
    title: 'Tiền sản giật',
    aliases: ['Yếu tố nguy cơ Tiền sản giật', 'Preeclampsia Risk Factors', 'Yếu tố nguy cơ PE thai kỳ'],
    keywords: ['yếu tố nguy cơ', 'tiền sản giật', 'aspirin dự phòng', 'huyết áp thai kỳ', 'protein niệu', 'sflt-1/plgf'],
    icd10: ['O14', 'O14.9'],
    tag: 'he-co-quan/san-phu-khoa',
    content: `# BÀI HỌC: CÁC YẾU TỐ NGUY CƠ TIỀN SẢN GIẬT & CHỈ ĐỊNH DỰ PHÒNG BẰNG ASPIRIN (PREECLAMPSIA RISK FACTORS)

---

## 1. Cơ Chế Tái Tạo Động Mạch Xoắn Kém & Mất Cân Bằng Yếu Tố Tạo Mạch

Tiền sản giật (Preeclampsia - PE) là rối loạn huyết áp đa cơ quan đặc trưng của thai kỳ, khởi phát sau tuần thứ 20. Quá trình bệnh sinh gồm 2 giai đoạn:
- **Giai đoạn 1 (Bánh nhau):** Sự xâm nhập nông của nguyên bào nuôi làm thất bại quá trình tái tạo các động mạch xoắn tử cung, dẫn đến thiếu máu cục bộ bánh nhau.
- **Giai đoạn 2 (Toàn thân người mẹ):** Bánh nhau thiếu máu giải phóng ồ ạt các yếu tố kháng tạo mạch (sFlt-1 và Soluble Endoglin) vào tuần hoàn mẹ, trung hòa VEGF và PlGF gây rối loạn chức năng tế bào nội mô mạch máu toàn thân.

---

## 2. Bảng Phân Tầng Yếu Tố Nguy Cơ Theo ACOG & NICE Guidelines

| Mức độ nguy cơ | Các yếu tố lâm sàng cụ thể | Khuyến cáo can thiệp dự phòng |
|:---|:---|:---|
| **Yếu tố Nguy cơ Cao (High Risk)**<br>*(Chỉ cần có ≥ 1 yếu tố)* | • Tiền sử tiền sản giật ở thai kỳ trước (đặc biệt khởi phát sớm hoặc có biến chứng)<br>• Đa thai (song thai, tam thai)<br>• Tăng huyết áp mạn tính<br>• Đái tháo đường típ 1 hoặc típ 2 trước mang thai<br>• Bệnh thận mạn tính<br>• Bệnh tự miễn (Hội chứng kháng phospholipid, Lupus ban đỏ hệ thống) | **Chỉ định bắt buộc:** Dùng **Aspirin liều thấp (81 - 150 mg/ngày)** uống vào buổi tối, bắt đầu từ tuần thứ 12 - 16 của thai kỳ đến 36 tuần |
| **Yếu tố Nguy cơ Trung bình (Moderate Risk)**<br>*(Cần có ≥ 2 yếu tố)* | • Mang thai con so (Nulliparity)<br>• Béo phì trước mang thai (BMI ≥ 30 kg/m²)<br>• Tiền sử gia đình có mẹ hoặc chị gái bị tiền sản giật<br>• Tuổi mẹ ≥ 35 tuổi<br>• Tiền sử cá nhân nhẹ cân lúc sinh hoặc thai chậm tăng trưởng<br>• Khoảng cách giữa 2 lần mang thai > 10 năm<br>• Thụ tinh trong ống nghiệm (IVF) | Chỉ định dùng Aspirin liều thấp dự phòng nếu có từ 2 yếu tố nguy cơ trung bình trở lên |

---

## 3. Sàng Lọc Sinh Hóa & Siêu Âm Doppler Động Mạch Tử Cung (Quý 1 Thai Kỳ)

Mô hình FMF (Fetal Medicine Foundation) kết hợp:
1. Yếu tố bệnh sử người mẹ.
2. Huyết áp động mạch trung bình (MAP).
3. Chỉ số xung động mạch tử cung (UtA-PI) trên siêu âm Doppler tuần 11 - 13 tuần 6 ngày.
4. Nồng độ PlGF (Placental Growth Factor) huyết thanh mẹ.

*Tỷ lệ sFlt-1 / PlGF ở nửa sau thai kỳ:*
- **Tỷ lệ < 38:** Giá trị dự báo âm tính 99.3% loại trừ tiền sản giật trong vòng 1 tuần tiếp theo.
- **Tỷ lệ > 85 (trước 34 tuần) hoặc > 110 (sau 34 tuần):** Giá trị dự báo dương tính cao cho sự xuất hiện tiền sản giật nặng cần nhập viện theo dõi sát.
`
  }
];

let createdCount = 0;

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
  createdCount++;
});

console.log(`\n=== TẠO THÀNH CÔNG ${createdCount} BÀI VIẾT CHUYÊN SÂU KHO YẾU TỐ NGUY CƠ ===`);
