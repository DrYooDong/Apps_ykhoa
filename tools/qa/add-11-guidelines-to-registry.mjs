/**
 * tools/qa/add-11-guidelines-to-registry.mjs
 * Đăng ký 11 tệp hướng dẫn lâm sàng còn thiếu vào KHO_GUIDELINES_STATIC trong kho-guidelines-registry.ts
 */

import fs from 'fs';
import path from 'path';

const REGISTRY_PATH = path.resolve('src/content/ebm/guidelines/js/kho-guidelines-registry.ts');

const NEW_STUDIES = [
  {
    "id": "2016-jama-sepsis-3-consensus",
    "title": "JAMA 2016: Đồng Thuận Quốc Tế Về Nhiễm Khuẩn Huyết & Sốc Nhiễm Khuẩn (Sepsis-3)",
    "titleEn": "The Third International Consensus Definitions for Sepsis and Septic Shock (Sepsis-3)",
    "drug": "Norepinephrine, Vasopressin, Kháng sinh phổ rộng, Tinh thể đẳng trương (30 mL/kg)",
    "sourceType": "intl-guideline",
    "specialty": "icu",
    "design": "guideline",
    "intervention": "Định nghĩa lại Sepsis dựa trên thang điểm SOFA ≥ 2 phản ánh suy đa tạng do nhiễm trùng; áp dụng qSOFA sàng lọc nhanh tại giường; xác lập tiêu chuẩn chẩn đoán Sốc nhiễm khuẩn (tụt huyết áp cần vận mạch để MAP ≥ 65 mmHg và Lactate > 2 mmol/L dù đã bù đủ dịch); bãi bỏ hoàn toàn khái niệm Severe Sepsis.",
    "primaryEndpoint": "Chuẩn hóa định nghĩa dịch tễ và tiêu chuẩn lâm sàng toàn cầu cho nhiễm khuẩn huyết và sốc nhiễm khuẩn nhằm tăng độ nhạy nhận diện sớm và cải thiện tỷ lệ sống còn ICU.",
    "keyResults": "SOFA ≥ 2 tương ứng tỷ lệ tử vong nội viện > 10% | qSOFA ≥ 2 có độ đặc hiệu cao dự báo tử vong ICU | Tiêu chuẩn sốc nhiễm khuẩn mới dự báo tử vong nội viện > 40%.",
    "impact": "practice-changing",
    "year": 2016,
    "organization": "SCCM / ESICM",
    "journal": "JAMA",
    "phase": "International Consensus Statement",
    "population": "Bệnh nhân người lớn nghi ngờ hoặc xác định có nhiễm trùng tại các khoa lâm sàng, cấp cứu và hồi sức tích cực (ICU).",
    "summary": "Đồng thuận Quốc tế Sepsis-3 bãi bỏ tiêu chuẩn SIRS cũ và đưa ra định nghĩa mới: Nhiễm khuẩn huyết là tình trạng rối loạn chức năng cơ quan đe dọa tính mạng do đáp ứng mất điều hòa của vật chủ với nhiễm khuẩn (được lượng hóa bằng thang điểm SOFA tăng ≥ 2 điểm). Sốc nhiễm khuẩn là phân nhóm có rối loạn tuần hoàn và tế bào sâu sắc dẫn đến tỷ lệ tử vong trên 40%.",
    "detailedConclusion": "Sepsis không còn đơn thuần là hội chứng viêm mà là tổn thương tạng do đáp ứng miễn dịch mất kiểm soát. Bác sĩ lâm sàng sử dụng qSOFA (Nhịp thở ≥ 22, Thay đổi ý thức GCS < 15, Huyết áp tâm thu ≤ 100 mmHg) để nhận diện nhanh nguy cơ xấu tại giường. Khi có chẩn đoán nhiễm khuẩn huyết, cần kích hoạt ngay gói điều trị giờ đầu (Hour-1 Bundle): cấy máu trước kháng sinh, truyền kháng sinh phổ rộng, bù dịch 30 mL/kg nếu tụt áp hoặc Lactate ≥ 4, và dùng Norepinephrine duy trì MAP ≥ 65 mmHg.",
    "file": "2016-jama-sepsis-3-consensus.mdx",
    "conditionKey": "sepsis",
    "icd10": [
      "A41.9",
      "R65.20",
      "R65.21"
    ],
    "asianData": true,
    "bookmarked": false
  },
  {
    "id": "2021-ssc-soc-nhiem-khuan-sepsis3",
    "title": "SSC 2021: Hướng Dẫn Quốc Tế Xử Trí Nhiễm Khuẩn Huyết & Sốc Nhiễm Khuẩn (Sepsis-3)",
    "titleEn": "Surviving Sepsis Campaign: International Guidelines for Management of Sepsis and Septic Shock 2021",
    "drug": "Norepinephrine, Vasopressin, Epinephrine, Hydrocortisone, Ringer Lactate",
    "sourceType": "intl-guideline",
    "specialty": "icu",
    "design": "guideline",
    "intervention": "Hồi sức dịch ban đầu tối thiểu 30 mL/kg dịch tinh thể đẳng trương (ưu tiên dịch cân bằng Ringer Lactate) trong vòng 3 giờ đầu; Norepinephrine là vận mạch lựa chọn đầu tay với đích MAP ≥ 65 mmHg; phối hợp sớm Vasopressin (0.03 đv/phút) khi liều Norepinephrine đạt 0.25–0.5 mcg/kg/phút; kháng sinh tĩnh mạch trong vòng 1 giờ cho sốc nhiễm khuẩn.",
    "primaryEndpoint": "Tối ưu hóa tưới máu mô, thanh thải Lactate máu, ổn định huyết động và giảm tỷ lệ tử vong 28 ngày ở bệnh nhân nhiễm khuẩn huyết và sốc nhiễm khuẩn.",
    "keyResults": "Norepinephrine vượt trội hơn Dopamine về giảm biến cố loạn nhịp và tử vong | Dịch tinh thể cân bằng giảm biến cố thận cấp và tử vong so với NaCl 0.9% | Kháng sinh trong 1 giờ đầu giảm tỷ lệ tử vong tuyến tính theo thời gian.",
    "impact": "practice-changing",
    "year": 2021,
    "organization": "Surviving Sepsis Campaign (SSC)",
    "journal": "Crit Care Med",
    "phase": "Clinical Practice Guideline",
    "population": "Bệnh nhân người lớn nhập viện trong tình trạng nhiễm khuẩn huyết hoặc sốc nhiễm khuẩn tại khoa cấp cứu và hồi sức tích cực.",
    "summary": "Khuyến cáo SSC 2021 cập nhật các chiến lược điều trị cốt lõi: ưu tiên dịch tinh thể cân bằng, định hướng bù dịch dựa trên các thông số huyết động động học (PPV, SVV, PLR), đích Lactate máu bình thường hóa, đặt catheter động mạch sớm và sử dụng Corticoid liều thấp khi sốc phụ thuộc liều vận mạch cao.",
    "detailedConclusion": "Xử trí sốc nhiễm khuẩn là một cuộc chạy đua thời gian. Đích MAP tối thiểu là 65 mmHg bằng Norepinephrine; nếu chức năng co bóp cơ tim giảm hoặc tưới máu mô kém kéo dài dù đủ dịch và MAP, bổ sung Dobutamine hoặc chuyển sang Epinephrine. Không sử dụng Hydroxyethyl starches (HES) hay Gelatin để bù dịch. Theo dõi liên tục biến thiên huyết áp xâm lấn và đánh giá đáp ứng bù dịch trước mỗi lần bolus dịch tiếp theo.",
    "file": "2021-ssc-soc-nhiem-khuan-sepsis3.mdx",
    "conditionKey": "septic-shock",
    "icd10": [
      "R65.21",
      "A41.9"
    ],
    "asianData": true,
    "bookmarked": false
  },
  {
    "id": "2024-byt-taychanmieng",
    "title": "Bộ Y Tế 2024: Hướng Dẫn Chẩn Đoán & Điều Trị Bệnh Tay Chân Miệng (QĐ 292/QĐ-BYT)",
    "titleEn": "Vietnam MOH 2024 Guidelines for Hand, Foot and Mouth Disease (HFMD)",
    "drug": "IVIG (Immunoglobulin truyền tĩnh mạch), Phenobarbital, Milrinone, Dobutamine, Paracetamol",
    "sourceType": "vn-moh",
    "specialty": "pedia",
    "design": "guideline",
    "intervention": "Phân tầng chính xác 4 cấp độ lâm sàng (Độ 1: ngoại trú; Độ 2a/2b: nội trú theo dõi sát; Độ 3: hồi sức suy thần kinh tự chủ; Độ 4: sốc, phù phổi cấp, suy tuần hoàn hô hấp); chỉ định dùng IVIG sớm cho Độ 2b nhóm 2 và Độ 3; chống co giật và an thần với Phenobarbital; hỗ trợ tuần hoàn bằng Milrinone và Dobutamine; chỉ định thở máy bảo vệ phổi, lọc máu CRRT và VA-ECMO khi có chỉ định.",
    "primaryEndpoint": "Phát hiện sớm dấu hiệu chuyển độ nặng (giật mình chới với, sốt cao khó hạ, mạch nhanh > 150), can thiệp kịp thời phòng ngừa suy tim cấp, phù phổi cấp do nhiễm enterovirus và giảm tử vong ở trẻ nhỏ.",
    "keyResults": "IVIG dùng đúng thời điểm giúp chặn đứng cơn bão cytokine và tổn thương thân não | Milrinone cải thiện tưới máu ngoại vi và hạ áp phổi hiệu quả trong Độ 3-4 | CRRT và ECMO cứu sống các ca tổn thương cơ tim kịch phát do EV71.",
    "impact": "practice-changing",
    "year": 2024,
    "organization": "Bộ Y Tế Việt Nam",
    "journal": "Bộ Y Tế (QĐ 292/QĐ-BYT)",
    "phase": "National Clinical Practice Guideline",
    "population": "Trẻ em mắc bệnh tay chân miệng do Enterovirus (đặc biệt EV71 và Coxsackievirus A16/A6) tại các cơ sở khám chữa bệnh trên toàn quốc.",
    "summary": "Hướng dẫn cập nhật toàn diện theo Quyết định 292/QĐ-BYT của Bộ Y tế Việt Nam năm 2024. Tập trung nhận diện sớm các dấu hiệu cảnh báo nguy cơ diễn tiến nặng của EV71, phác đồ dùng thuốc an thần Phenobarbital, chỉ định truyền IVIG chuẩn xác, quy trình vận động mạch và kỹ thuật hồi sức chuyên sâu tại các trung tâm Nhi khoa.",
    "detailedConclusion": "Theo dõi sát dấu hiệu chuyển độ là chìa khóa sống còn trong tay chân miệng: giật mình lúc bắt đầu thiu thiu ngủ (≥ 2 lần/30 phút), sốt cao không hạ trên 39°C, thở nhanh, mạch nhanh không tương xứng thân nhiệt, da nổi vân tím và vã mồ hôi. Khi trẻ ở Độ 2b cần nhập viện phòng cấp cứu hoặc ICU ngay. Độ 3 bắt buộc đo huyết áp liên tục, dùng Milrinone truyền tĩnh mạch, đặt nội khí quản sớm nếu có suy hô hấp hoặc rối loạn tri giác.",
    "file": "2024-byt-taychanmieng.mdx",
    "conditionKey": "hfmd",
    "icd10": [
      "B08.4"
    ],
    "asianData": true,
    "bookmarked": false
  },
  {
    "id": "2024-esc-atrial-fibrillation",
    "title": "ESC 2024: Khuyến Cáo Quản Lý Rung Nhĩ — Lộ Trình AF-CARE & Thang Điểm CHA2DS2-VA",
    "titleEn": "2024 ESC Guidelines for the Management of Atrial Fibrillation (AF-CARE Roadmap)",
    "drug": "DOAC (Apixaban, Rivaroxaban, Edoxaban, Dabigatran), Flecainide, Amiodarone, Beta-blockers",
    "sourceType": "intl-guideline",
    "specialty": "cardio",
    "design": "guideline",
    "intervention": "Áp dụng lộ trình toàn diện AF-CARE: (C) Quản lý bệnh đồng mắc và lối sống; (A) Dự phòng đột quỵ bằng DOAC theo thang điểm mới CHA2DS2-VA (loại bỏ biến giới tính nữ); (R) Kiểm soát triệu chứng bằng kiểm soát nhịp/tần số; (E) Đánh giá định kỳ. Mở rộng chỉ định triệt đốt rung nhĩ (Catheter Ablation) lên Class I cho bệnh nhân rung nhĩ kịch phát có triệu chứng kháng thuốc hoặc lựa chọn đầu tay.",
    "primaryEndpoint": "Giảm biến cố đột quỵ thiếu máu cục bộ, suy tim, nhập viện tim mạch và cải thiện chất lượng cuộc sống lâu dài ở bệnh nhân rung nhĩ.",
    "keyResults": "Thang điểm CHA2DS2-VA đơn giản hóa quyết định dùng thuốc chống đông và loại trừ đánh giá sai lệch nguy cơ ở nữ giới | DOAC giảm 50% xuất huyết nội sọ so với Warfarin | Triệt đốt rung nhĩ sớm giảm tỷ lệ tái phát rung nhĩ và giảm tiến triển suy tim.",
    "impact": "practice-changing",
    "year": 2024,
    "organization": "European Society of Cardiology (ESC)",
    "journal": "Eur Heart J",
    "phase": "Clinical Practice Guideline",
    "population": "Bệnh nhân trưởng thành được chẩn đoán rung nhĩ (kịch phát, dai dẳng hoặc kéo dài) có hoặc không kèm theo bệnh tim cấu trúc.",
    "summary": "Khuyến cáo ESC 2024 tái cấu trúc toàn diện chiến lược điều trị rung nhĩ với nguyên tắc AF-CARE. Điểm nhấn lớn nhất là việc chính thức áp dụng thang điểm CHA2DS2-VA (bỏ yếu tố Sc vì bản thân giới tính nữ không làm tăng đột quỵ nếu không có các yếu tố nguy cơ khác), ưu tiên tuyệt đối DOAC và nâng bậc chỉ định can thiệp triệt đốt điện sinh lý.",
    "detailedConclusion": "Tất cả bệnh nhân rung nhĩ có điểm CHA2DS2-VA ≥ 2 ở nam hoặc nữ đều có chỉ định bắt buộc dùng thuốc chống đông đường uống DOAC (Class I). Với điểm = 1, nên cân nhắc DOAC (Class IIa). Bệnh nhân suy tim phân suất tống máu giảm (HFrEF) có rung nhĩ cần được ưu tiên triệt đốt qua ống thông để cải thiện chức năng thất trái và giảm nhập viện vì suy tim. Kiểm soát nghiêm ngặt huyết áp, cân nặng và hội chứng ngưng thở khi ngủ.",
    "file": "2024-esc-atrial-fibrillation.mdx",
    "conditionKey": "atrial-fibrillation",
    "icd10": [
      "I48.0",
      "I48.1",
      "I48.2",
      "I48.9"
    ],
    "asianData": true,
    "bookmarked": false
  },
  {
    "id": "2025-byt-benh-than-kinh-dai-thao-duong",
    "title": "Bộ Y Tế 2025: Hướng Dẫn Chẩn Đoán & Điều Trị Bệnh Thần Kinh Đái Tháo Đường (QĐ 3510/QĐ-BYT)",
    "titleEn": "Vietnam MOH 2025 Guidelines for Diabetic Neuropathy (Diagnosis & Management)",
    "drug": "Pregabalin, Gabapentin, Duloxetine, Alpha Lipoic Acid (ALA), Benfotiamine, Tramadol",
    "sourceType": "vn-moh",
    "specialty": "endo",
    "design": "guideline",
    "intervention": "Tầm soát định kỳ bệnh đa dây thần kinh ngoại biên đối xứng xa (DSPN) hàng năm bằng dây cước đơn Monofilament 10g và âm thoa 128 Hz; sàng lọc bệnh thần kinh tự chủ (CAN) bằng biến thiên nhịp tim và đo huyết áp tư thế; điều trị căn nguyên chuyển hóa bằng kiểm soát đường huyết nghiêm ngặt kết hợp Alpha Lipoic Acid (ALA 600 mg/ngày) và Benfotiamine; phác đồ giảm đau thần kinh 2 bước (Pregabalin/Gabapentin hoặc Duloxetine đầu tay).",
    "primaryEndpoint": "Phát hiện sớm mất cảm giác bảo vệ ở bàn chân phòng ngừa loét và cắt cụt chi; kiểm soát triệu chứng đau thần kinh mạn tính và cải thiện thang điểm chất lượng cuộc sống.",
    "keyResults": "Monofilament 10g kết hợp âm thoa phát hiện 85% mất cảm giác bảo vệ | Pregabalin 150-300 mg/ngày và Duloxetine 60 mg/ngày giảm ≥ 50% cường độ đau thần kinh | ALA đường uống cải thiện dẫn truyền thần kinh và triệu chứng châm chích.",
    "impact": "practice-changing",
    "year": 2025,
    "organization": "Bộ Y Tế Việt Nam",
    "journal": "Bộ Y Tế (QĐ 3510/QĐ-BYT)",
    "phase": "National Clinical Practice Guideline",
    "population": "Bệnh nhân đái tháo đường type 1 (sau 5 năm mắc bệnh) và đái tháo đường type 2 (ngay tại thời điểm chẩn đoán) tại các tuyến y tế.",
    "summary": "Hướng dẫn thực hành lâm sàng toàn diện của Bộ Y tế Việt Nam năm 2025 về bệnh lý thần kinh do đái tháo đường. Tài liệu hệ thống hóa cơ chế bệnh sinh tích tụ Sorbitol và stress oxy hóa, chuẩn hóa quy trình khám bàn chân tại giường, phân biệt tổn thương sợi nhỏ và sợi lớn, và xây dựng phác đồ dược lý giảm đau cá thể hóa kết hợp bảo tồn chức năng thần kinh.",
    "detailedConclusion": "Mọi bệnh nhân đái tháo đường cần được khám bàn chân toàn diện tối thiểu mỗi năm 1 lần để đánh giá nguy cơ loét chi dưới. Khi có đau thần kinh mạn tính (bỏng rát, tê bì kiểu đi găng đi tất, tăng nhạy cảm đau về đêm), lựa chọn đầu tay là Pregabalin (75–150 mg/ngày tăng dần đến 300 mg) hoặc Duloxetine (30–60 mg/ngày). Phối hợp thuốc chống oxy hóa đặc hiệu ALA 600 mg/ngày để làm chậm tiến trình thoái hóa sợi thần kinh.",
    "file": "2025-byt-benh-than-kinh-dai-thao-duong.mdx",
    "conditionKey": "diabetic-neuropathy",
    "icd10": [
      "E11.4",
      "G63.2"
    ],
    "asianData": true,
    "bookmarked": false
  },
  {
    "id": "2025-byt-cummua",
    "title": "Bộ Y Tế 2025: Hướng Dẫn Chẩn Đoán, Điều Trị & Dự Phòng Cúm Mùa (QĐ 1840/QĐ-BYT)",
    "titleEn": "Vietnam MOH 2025 Guidelines for Seasonal Influenza Management and Prevention",
    "drug": "Oseltamivir, Baloxavir marboxil, Zanamivir, Paracetamol",
    "sourceType": "vn-moh",
    "specialty": "infect",
    "design": "guideline",
    "intervention": "Chẩn đoán phân biệt cúm mùa (A/H1N1, A/H3N2, Cúm B) với các nhiễm trùng hô hấp cấp khác; phân loại cúm thể thông thường và cúm có biến chứng/nguy cơ cao; chỉ định thuốc kháng vi rút ức chế neuraminidase (Oseltamivir 75 mg x 2 lần/ngày x 5 ngày) hoặc chất ức chế endonuclease (Baloxavir liều duy nhất) tốt nhất trong vòng 48 giờ kể từ khi khởi phát triệu chứng; tuyệt đối không dùng Aspirin ở trẻ em để phòng ngừa Hội chứng Reye.",
    "primaryEndpoint": "Rút ngắn thời gian sốt và đào thải vi rút, ngăn ngừa biến chứng viêm phổi nặng/ARDS và giảm tử vong ở các nhóm nguy cơ cao (trẻ < 5 tuổi, người ≥ 65 tuổi, phụ nữ có thai và bệnh nhân mạn tính).",
    "keyResults": "Oseltamivir khởi trị sớm trong 48h giảm 50% nguy cơ viêm phổi và giảm thời gian nằm viện | Baloxavir liều duy nhất cho hiệu quả tương đương Oseltamivir 5 ngày và giảm phát tán vi rút nhanh hơn | Tiêm vắc xin cúm hàng năm bảo vệ 60-70% mắc bệnh.",
    "impact": "practice-changing",
    "year": 2025,
    "organization": "Bộ Y Tế Việt Nam",
    "journal": "Bộ Y Tế (QĐ 1840/QĐ-BYT)",
    "phase": "National Clinical Practice Guideline",
    "population": "Bệnh nhân ở mọi lứa tuổi mắc cúm mùa hoặc nghi ngờ nhiễm cúm tại cộng đồng và cơ sở y tế.",
    "summary": "Hướng dẫn chẩn đoán, điều trị và phòng ngừa cúm mùa ban hành theo Quyết định 1840/QĐ-BYT năm 2025 của Bộ Y tế. Cung cấp tiêu chuẩn xác định ca bệnh lâm sàng và xét nghiệm (RT-PCR, test nhanh kháng nguyên), chỉ định dùng thuốc kháng vi rút đúng đối tượng, hướng dẫn thông khí cơ học bảo vệ phổi trong ARDS do cúm và chiến lược tiêm chủng dự phòng.",
    "detailedConclusion": "Thuốc kháng vi rút Oseltamivir cần được dùng càng sớm càng tốt cho các trường hợp cúm có biến chứng hoặc trên đối tượng có yếu tố nguy cơ cao mà không cần chờ kết quả xét nghiệm RT-PCR. Ở bệnh nhân nặng, nhập viện muộn sau 48 giờ vẫn có chỉ định dùng Oseltamivir. Paracetamol là thuốc hạ sốt được lựa chọn hàng đầu; chống chỉ định tuyệt đối Aspirin do nguy cơ gây Hội chứng Reye dẫn đến suy gan não tối cấp ở trẻ em.",
    "file": "2025-byt-cummua.mdx",
    "conditionKey": "influenza",
    "icd10": [
      "J10",
      "J11"
    ],
    "asianData": true,
    "bookmarked": false
  },
  {
    "id": "2026-aha-acc-ckm-syndrome",
    "title": "2026 AHA/ACC/ADA/ASN: Hướng Dẫn Quản Lý Hội Chứng Tim Mạch - Thận - Chuyển Hóa (CKM)",
    "titleEn": "2026 AHA/ACC/ADA/ASN Guideline for Cardiovascular-Kidney-Metabolic (CKM) Syndrome",
    "drug": "SGLT2i (Empagliflozin, Dapagliflozin), GLP-1 RA (Semaglutide), nsMRA (Finerenone), Statin hoạt lực cao, ACEi/ARB",
    "sourceType": "intl-guideline",
    "specialty": "cardio",
    "design": "guideline",
    "intervention": "Thiết lập hệ thống phân loại 5 giai đoạn CKM (Stage 0 đến 4b); ứng dụng công cụ dự báo nguy cơ tim mạch thế hệ mới PREVENT (kết hợp cả eGFR và UACR); mô hình hợp tác đa chuyên khoa (Tim mạch - Thận học - Nội tiết); chỉ định sớm liệu pháp bảo vệ ba tạng (SGLT2i + GLP-1 RA + nsMRA Finerenone) ngay từ giai đoạn có tổn thương thận hoặc nguy cơ tim mạch cao.",
    "primaryEndpoint": "Làm chậm tiến triển suy tim, bệnh thận mạn giai đoạn cuối (ESKD), nhồi máu cơ tim, đột quỵ và tử vong tim mạch thông qua can thiệp liên hoàn trên trục chuyển hóa - thận - mạch máu.",
    "keyResults": "SGLT2i giảm 30% tử vong tim mạch/nhập viện suy tim và giảm 40% tiến triển thận | nsMRA Finerenone giảm biến cố thận và suy tim độc lập với huyết áp | Phối hợp sớm SGLT2i + nsMRA mang lại lợi ích cộng hưởng hiệp đồng trên UACR.",
    "impact": "practice-changing",
    "year": 2026,
    "organization": "AHA / ACC / ADA / ASN",
    "journal": "Circulation / JACC",
    "phase": "Multi-Society Clinical Practice Guideline",
    "population": "Bệnh nhân có yếu tố nguy cơ hoặc mắc đái tháo đường, béo phì, tăng huyết áp, bệnh thận mạn và bệnh lý tim mạch xơ vữa/suy tim.",
    "summary": "Hướng dẫn liên hội đồng thuận năm 2026 của 4 hội chuyên khoa lớn Hoa Kỳ thiết lập mô hình quản lý đột phá cho Hội chứng CKM. Định nghĩa CKM là một rối loạn hệ thống liên kết mật thiết giữa chuyển hóa, thận và tim mạch. Nhấn mạnh việc chuyển dịch từ điều trị từng cơ quan đơn lẻ sang phác đồ bảo vệ đa tạng sớm và áp dụng thang điểm PREVENT thay thế cho PCE cổ điển.",
    "detailedConclusion": "Phân tầng giai đoạn CKM quyết định mức độ can thiệp dược lý: Stage 1 (thừa cân/tiền ĐTĐ): can thiệp lối sống; Stage 2 (tăng HA, ĐTĐ, CKD G3): khởi trị ngay SGLT2i và/hoặc GLP-1 RA; Stage 3 (bệnh tim cận lâm sàng, CAC cao): tối ưu hóa Statin và Finerenone; Stage 4 (suy tim lâm sàng/ASCVD): phối hợp đầy đủ tứ trụ suy tim và quản lý thận chặt chẽ. Finerenone được khuyến cáo mạnh mẽ khi UACR ≥ 30 mg/g dù đã dùng liều tối đa RASi.",
    "file": "2026-aha-acc-ckm-syndrome.mdx",
    "conditionKey": "ckm-syndrome",
    "icd10": [
      "E88.81",
      "I50.9",
      "N18.9"
    ],
    "asianData": true,
    "bookmarked": false
  },
  {
    "id": "2026-byt-chi-dinh-nhap-vien-cap-cuu",
    "title": "Bộ Y Tế 2026: Tiêu Chuẩn Quốc Gia Về Chỉ Định Nhập Viện Trong Tình Trạng Cấp Cứu (QĐ 79/QĐ-BYT)",
    "titleEn": "Vietnam MOH 2026 National Criteria for Emergency Hospital Admission",
    "drug": "Thuốc cấp cứu thiết yếu, Oxy liệu pháp, Dịch truyền hồi sức, Thuốc vận mạch",
    "sourceType": "vn-moh",
    "specialty": "emergency",
    "design": "guideline",
    "intervention": "Quy chuẩn hóa 4 nguyên tắc pháp lý và chuyên môn trong tiếp nhận bệnh nhân cấp cứu; bộ 33 tiêu chí cấp cứu Nhi khoa chuyên biệt; áp dụng thang điểm chấn thương nhi khoa PTS (Pediatric Trauma Score); đánh giá mức độ đau theo thang điểm chuẩn (Wong-Baker FACES / NRS); hệ thống hóa tiêu chuẩn chỉ định nhập viện theo 18 chuyên khoa cơ quan ở người lớn.",
    "primaryEndpoint": "Chuẩn hóa quy trình phân loại bệnh nhân cấp cứu tại các bệnh viện toàn quốc, đảm bảo an toàn tối đa cho người bệnh, chống quá tải khoa cấp cứu và phòng ngừa từ chối nhập viện sai sót.",
    "keyResults": "100% người bệnh trong tình trạng cấp cứu được tiếp nhận xử trí tức thì không phụ thuộc bảo hiểm y tế | Thang điểm PTS ≤ 8 nhận diện chính xác bệnh nhi cần chuyển viện tuyến chuyên sâu | 18 tiêu chuẩn hệ thống giúp giảm 35% sai sót phân loại tại phòng cấp cứu.",
    "impact": "regulatory",
    "year": 2026,
    "organization": "Bộ Y Tế Việt Nam",
    "journal": "Bộ Y Tế (QĐ 79/QĐ-BYT)",
    "phase": "National Regulatory Clinical Guideline",
    "population": "Tất cả người bệnh ở mọi lứa tuổi đến khám hoặc được chuyển tuyến đến khoa Cấp cứu tại các cơ sở khám bệnh, chữa bệnh trên lãnh thổ Việt Nam.",
    "summary": "Quy định chuyên môn mang tính pháp lý cao theo Quyết định số 79/QĐ-BYT ngày 10/01/2026 của Bộ trưởng Bộ Y tế. Văn bản đặt ra hàng rào an toàn bảo vệ người bệnh, quy định cụ thể quyền được cấp cứu lập tức, các tiêu chí sinh hiệu bất thường đe dọa tính mạng bắt buộc nhập viện và ma trận phân loại ưu tiên cấp cứu.",
    "detailedConclusion": "Không được vì bất kỳ lý do thủ tục hành chính hay tài chính nào mà làm chậm trễ việc cấp cứu người bệnh. Bệnh nhân có ít nhất 1 dấu hiệu đe dọa sinh tồn (mạch < 40 hoặc > 140, huyết áp tâm thu < 90 mmHg, SpO2 < 92%, thở > 30 hoặc < 8 lần/phút, Glasgow < 13) bắt buộc phải được tiếp nhận cấp cứu và nhập viện điều trị tích cực. Các tiêu chuẩn phân khoa rõ ràng giúp bác sĩ cấp cứu ra quyết định nhập viện nhanh chóng, chính xác và có cơ sở pháp lý vững chắc.",
    "file": "2026-byt-chi-dinh-nhap-vien-cap-cuu.mdx",
    "conditionKey": "emergency-admission",
    "icd10": [
      "Z04.9",
      "R68.8"
    ],
    "asianData": true,
    "bookmarked": false
  },
  {
    "id": "2026-esc-heart-failure-p1",
    "title": "ESC 2026: Khuyến Cáo Suy Tim (Phần 1: Định Nghĩa, Kiểu Hình & Phác Đồ Tứ Trụ Nền Tảng)",
    "titleEn": "2026 ESC Guidelines for the Diagnosis and Treatment of Heart Failure (Part 1: Chronic Heart Failure & GDMT)",
    "drug": "ARNI (Sacubitril/Valsartan), Beta-blocker, MRA (Spironolactone/Eplerenone), SGLT2i (Dapagliflozin/Empagliflozin), GLP-1 RA (Semaglutide), Sắt carboxymaltose truyền tĩnh mạch",
    "sourceType": "intl-guideline",
    "specialty": "cardio",
    "design": "guideline",
    "intervention": "Định nghĩa suy tim thống nhất: loại bỏ phân nhóm trung gian HFmrEF, gộp LVEF < 50% vào phổ HFrEF và mở rộng HFpEF (LVEF ≥ 50%); áp dụng chiến lược khởi trị đồng thời Tứ trụ nền tảng (FMT) theo mô hình STRONG-HF trong vòng 6 tuần đầu; chỉ định GLP-1 RA (Semaglutide 2.4 mg) cho HFpEF béo phì; bù sắt tĩnh mạch liều cao khi thiếu sắt (Ferritin < 100 hoặc TSAT < 20%).",
    "primaryEndpoint": "Giảm tử vong tim mạch và tỷ lệ tái nhập viện do suy tim; cải thiện chất lượng cuộc sống (KCCQ) và khả năng gắng sức ở bệnh nhân suy tim mạn tính.",
    "keyResults": "Tứ trụ FMT giảm 62% tử vong tim mạch trong 2 năm | Khởi trị nhanh STRONG-HF giảm 34% tử vong hoặc tái nhập viện ở ngày 180 | SGLT2i giảm 20% biến cố tim mạch ở mọi phân suất tống máu.",
    "impact": "practice-changing",
    "year": 2026,
    "organization": "European Society of Cardiology (ESC)",
    "journal": "Eur Heart J",
    "phase": "Clinical Practice Guideline",
    "population": "Bệnh nhân trưởng thành được chẩn đoán suy tim mạn tính ở các mức phân suất tống máu (HFrEF, HFpEF) từ Giai đoạn A đến C.",
    "summary": "Phần 1 của Khuyến cáo ESC 2026 đánh dấu cuộc cách mạng lớn trong điều trị suy tim. Bãi bỏ khái niệm phân suất tống máu giảm nhẹ HFmrEF nhằm xóa bỏ sự chần chừ điều trị, đưa toàn bộ bệnh nhân LVEF < 50% vào nhóm hưởng lợi từ Tứ trụ nội khoa FMT. Khẳng định vai trò độc lập của SGLT2i trong HFpEF và bổ sung chỉ định Class I cho GLP-1 RA ở nhóm suy tim bảo tồn có béo phì.",
    "detailedConclusion": "Không còn áp dụng bậc thang điều trị tuần tự chậm chạp; bệnh nhân suy tim có LVEF < 50% phải được khởi trị đồng thời cả 4 nhóm thuốc Tứ trụ (ARNI + Beta-blocker + MRA + SGLT2i) ở liều thấp và tăng dần liều tối đa trong 6 tuần dưới sự giám sát chặt chẽ sinh hiệu và điện giải máu. Tầm soát thiếu sắt cho 100% bệnh nhân suy tim và chỉ định bù sắt carboxymaltose tĩnh mạch sớm để cải thiện tiên lượng sống còn.",
    "file": "2026-esc-heart-failure-p1.mdx",
    "conditionKey": "heart-failure",
    "icd10": [
      "I50.9",
      "I50.1",
      "I50.2",
      "I50.4"
    ],
    "asianData": true,
    "bookmarked": false
  },
  {
    "id": "2026-esc-heart-failure-p2",
    "title": "ESC 2026: Khuyến Cáo Suy Tim (Phần 2: Suy Tim Cấp Mất Bù, Thiết Bị ICD/CRT, Bệnh Van Tim & Giai Đoạn D)",
    "titleEn": "2026 ESC Guidelines for the Diagnosis and Treatment of Heart Failure (Part 2: Decompensated HF, Devices & Advanced HF)",
    "drug": "Furosemide, Acetazolamide, Hydrochlorothiazide, Dobutamine, Milrinone, Norepinephrine, Tafamidis",
    "sourceType": "intl-guideline",
    "specialty": "cardio",
    "design": "guideline",
    "intervention": "Xử trí suy tim cấp mất bù (DHF) định hướng Natri niệu sớm (Natriuresis-guided decongestion): đánh giá Natri niệu tại thời điểm 2h và thể tích nước tiểu tại 6h sau liều Furosemide đầu tiên; phối hợp sớm Acetazolamide (500 mg IV) để phong bế kép nephron; mở rộng chỉ định cấy máy khử rung ICD và tái đồng bộ tim CRT; can thiệp sửa van hai lá qua đường ống thông (Mitral TEER) đạt Class I cho hở hai lá thứ phát nặng; điều trị đặc hiệu bệnh cơ tim thoái hóa bột ATTR-CA bằng Tafamidis; thiết lập chỉ định hỗ trợ tuần hoàn cơ học (LVAD) và ghép tim cho Giai đoạn D.",
    "primaryEndpoint": "Giải áp sung huyết hoàn toàn, rút ngắn thời gian nằm viện, phòng ngừa suy thận cấp do thuốc lợi tiểu và kéo dài sống còn ở suy tim tiến triển.",
    "keyResults": "Chiến lược Natriuresis-guided decongestion tăng gấp đôi tỷ lệ giải áp sung huyết thành công trước xuất viện | Phối hợp Acetazolamide (ADVOR trial) cải thiện giải sung huyết 46% | Mitral TEER (COAPT) giảm 47% tử vong và giảm 51% nhập viện suy tim.",
    "impact": "practice-changing",
    "year": 2026,
    "organization": "European Society of Cardiology (ESC)",
    "journal": "Eur Heart J",
    "phase": "Clinical Practice Guideline",
    "population": "Bệnh nhân suy tim cấp mất bù nhập viện, bệnh nhân suy tim nặng có chỉ định thiết bị/can thiệp cấu trúc và bệnh nhân suy tim giai đoạn cuối (Stage D).",
    "summary": "Phần 2 của Khuyến cáo ESC 2026 tập trung vào các tình huống lâm sàng phức tạp và chuyên sâu: phác đồ giải sung huyết đa kênh nephron trong suy tim cấp, tiêu chuẩn chỉ định máy tạo nhịp tái đồng bộ cơ tim CRT, vị trí đỉnh cao của can thiệp kẹp van hai lá TEER, liệu pháp ức chế phân tử TTR trong ATTR-CA, và lộ trình chuyển viện ghép tim / LVAD kết hợp chăm sóc giảm nhẹ.",
    "detailedConclusion": "Giải sung huyết là ưu tiên số 1 trong suy tim cấp: nếu Natri niệu sau 2 giờ < 50–70 mmol/L hoặc lượng nước tiểu sau 6 giờ < 100–150 mL/h, phải tăng gấp đôi liều lợi tiểu quai và phối hợp ngay lợi tiểu ống lượn gần (Acetazolamide) hoặc thiazide. Bệnh nhân hở van hai lá thứ phát nặng trên nền suy tim dù đã tối ưu hóa thuốc nội khoa bắt buộc phải được hội đồng tim mạch Heart Team đánh giá chỉ định Mitral TEER. Nhận diện sớm dấu hiệu suy tim kháng trị theo tiêu chuẩn I-NEED-HELP để kích hoạt đánh giá ghép tim kịp thời.",
    "file": "2026-esc-heart-failure-p2.mdx",
    "conditionKey": "acute-heart-failure",
    "icd10": [
      "I50.1",
      "I50.9"
    ],
    "asianData": true,
    "bookmarked": false
  },
  {
    "id": "2026-icu-khang-sinh-cho-bn-nang",
    "title": "Kháng Sinh Cho Bệnh Nhân Nặng (ICU) — Tối Ưu Hóa PK/PD & Phác Đồ Lâm Sàng 2026",
    "titleEn": "Antimicrobial Optimization in Critically Ill Patients: PK/PD Principles and Regimens (2026)",
    "drug": "Meropenem, Piperacillin/Tazobactam, Cefepime, Vancomycin, Colistin, Ceftazidime/Avibactam, Amikacin",
    "sourceType": "intl-guideline",
    "specialty": "icu",
    "design": "review",
    "intervention": "Tối ưu hóa liều kháng sinh dựa trên các biến đổi sinh lý bệnh ICU: tăng thể tích phân bố (Vd lớn do rò mao mạch, bù dịch), tăng thanh thải thận (ARC - CrCl > 130 mL/phút) hoặc suy thận/CRRT; chiến lược truyền kéo dài (Extended Infusion 3-4 giờ) hoặc truyền liên tục (Continuous Infusion 24h) cho kháng sinh phụ thuộc thời gian Beta-lactam nhằm đạt đích %T > 4-5x MIC = 100%; giám sát nồng độ thuốc trong máu (TDM) cho Vancomycin (AUC/MIC 400-600) và Aminoglycosides; phác đồ kinh nghiệm xuống thang sớm theo kết quả vi sinh.",
    "primaryEndpoint": "Đạt đích dược động học / dược lực học (PK/PD) tối đa, nâng cao tỷ lệ diệt khuẩn lâm sàng, giảm nguy cơ chọn lọc chủng vi khuẩn kháng thuốc và hạ thấp tỷ lệ tử vong sốc nhiễm khuẩn tại ICU.",
    "keyResults": "Truyền liên tục Beta-lactam (MERCY & BLING trials) giảm tỷ lệ tử vong nội viện và cải thiện khỏi bệnh lâm sàng ở bệnh nhân sốc | Bỏ qua liều nạp ban đầu làm chậm đạt nồng độ điều trị đến 48 giờ ở 70% bệnh nhân ICU | TDM Vancomycin dựa trên AUC giảm 50% độc tính trên thận so với theo dõi đáy nồng độ Trough cổ điển.",
    "impact": "practice-changing",
    "year": 2026,
    "organization": "Critical Care Clinics",
    "journal": "Crit Care Clin",
    "phase": "Comprehensive Expert Review / Clinical Guideline",
    "population": "Bệnh nhân hồi sức tích cực (ICU) bị nhiễm trùng nặng, nhiễm khuẩn huyết, sốc nhiễm khuẩn hoặc nhiễm vi khuẩn đa kháng (MDR/XDR).",
    "summary": "Tài liệu tổng quan lâm sàng chuyên sâu trên Critical Care Clinics 2026 cung cấp hướng dẫn toàn diện về tối ưu hóa kháng sinh cho bệnh nhân nặng. Làm rõ các bẫy điều trị thường gặp khi dùng liều chuẩn nhà sản xuất trên bệnh nhân ICU bị thay đổi huyết động sâu sắc, quy chuẩn hóa liều nạp ban đầu (Loading Dose) và quy trình truyền kéo dài cho các kháng sinh kháng trực khuẩn mủ xanh và Carbapenem.",
    "detailedConclusion": "Ở bệnh nhân nặng, liều đầu tiên LUÔN LÀ LIỀU NẠP ĐẦY ĐỦ (Full Loading Dose) không được giảm theo chức năng thận, vì mục tiêu quan trọng nhất là nhanh chóng đạt nồng độ diệt khuẩn trong mô. Đối với Beta-lactam (Meropenem, Piperacillin-Tazobactam), khuyến cáo mạnh mẽ áp dụng phương pháp truyền kéo dài (truyền trong 3-4 giờ mỗi cữ) hoặc truyền liên tục để tối ưu hóa thời gian nồng độ tự do vượt MIC (%fT > MIC). Với Vancomycin, bắt buộc chuyển sang theo dõi AUC24/MIC (đích 400–600 mg.h/L) để vừa đạt hiệu quả diệt khuẩn tụ cầu MRSA vừa hạn chế tối đa suy thận cấp.",
    "file": "2026-icu-khang-sinh-cho-bn-nang.mdx",
    "conditionKey": "icu-antimicrobials",
    "icd10": [
      "Z29.2",
      "A49.9"
    ],
    "asianData": true,
    "bookmarked": false
  }
];

console.log('🚀 Bắt đầu nạp 11 tài liệu mới vào Registry...');
let content = fs.readFileSync(REGISTRY_PATH, 'utf8');

// Tìm vị trí kết thúc của mảng KHO_GUIDELINES_STATIC: dòng có "];" trước đoạn "if (typeof window"
const endArrayMarker = '];\n\n// Đồng bộ sang window';
if (!content.includes(endArrayMarker)) {
  console.error('❌ Không tìm thấy marker kết thúc mảng KHO_GUIDELINES_STATIC!');
  process.exit(1);
}

// Chuyển đổi 11 đối tượng thành chuỗi JSON được format đẹp mắt
const formattedEntries = NEW_STUDIES.map(study => {
  return '  ' + JSON.stringify(study, null, 2).replace(/\n/g, '\n  ');
}).join(',\n');

const replacement = `,\n${formattedEntries}\n${endArrayMarker}`;
content = content.replace(endArrayMarker, replacement);
content = content.replace(/\r\n/g, '\n');

fs.writeFileSync(REGISTRY_PATH, content, 'utf8');
console.log(`🎉 Đã bổ sung thành công 11 tài liệu vào ${REGISTRY_PATH}!`);
