import { AmbiguousTerm, SystematicEnquiryItem, ChallengingScenario } from '../types/clinical';

export interface HistoryStepGuide {
  id: string;
  stepNumber: number;
  title: string;
  englishTitle: string;
  summary: string;
  coreConcepts: string[];
  keyQuestions: string[];
  clinicalPearls: string[];
}

export const HISTORY_STEPS: HistoryStepGuide[] = [
  {
    id: 'step-1-initiation',
    stepNumber: 1,
    title: 'Khởi Đầu Cuộc Tiếp Xúc & Thiết Lập Mối Quan Hệ',
    englishTitle: 'Managing Clinical Encounters & Opening (Macleod Ch.1)',
    summary: 'Cách bố trí môi trường khám, thiết lập lòng tin, thấu cảm và tuân thủ các quy tắc ứng xử chuyên nghiệp trong y khoa.',
    coreConcepts: [
      'Bố trí bàn khám thân thiện (Seating arrangement): Ngồi chếch góc 90 độ với người bệnh, tránh đặt bàn làm việc to hoặc màn hình máy tính làm rào cản ngăn cách trực diện (Bates & Macleod Fig. 1.1).',
      'Quy tắc ABCD của thái độ bác sĩ: A (Attitude - Tự đặt mình vào vị trí người bệnh), B (Behaviour - Lịch sự, ân cần, tôn trọng), C (Compassion - Thấu hiểu nỗi đau đằng sau bệnh cảnh), D (Dialogue - Lắng nghe chủ động và đối thoại bình đẳng).',
      'Lời chào khởi đầu: Tự giới thiệu tên và vai trò rõ ràng: "Chào bác, cháu là bác sĩ...". Đeo thẻ tên rõ ràng, y phục chỉnh tề, xắn tay áo trên khuỷu tay và vệ sinh tay trước mắt người bệnh.',
      'Bảo mật thông tin & Xử trí người thứ ba: Luôn hỏi ý kiến bệnh nhân trước khi cho người nhà vào cùng; nếu người nhà tiếp cận riêng, lắng nghe nhưng không tiết lộ thông tin bệnh án khi chưa có sự đồng ý của bệnh nhân.'
    ],
    keyQuestions: [
      '"Chào bác, hôm nay bác thấy trong người thế nào? Điều gì khiến bác lo lắng nhất cần cháu giúp đỡ hôm nay?" (Câu hỏi mở không định kiến)',
      '"Bác muốn cháu xưng hô với bác như thế nào cho thuận tiện nhất?"'
    ],
    clinicalPearls: [
      'Đa số người bệnh quyết định đi khám không phải vì bản thân triệu chứng xuất hiện, mà do triệu chứng đó vượt quá ngưỡng chịu đựng hoặc bị thúc đẩy bởi một khủng hoảng cá nhân/lo sợ bệnh ác tính (Triggers to consultation).',
      'Bắt tay người bệnh: Cung cấp manh mối chẩn đoán ngay tích tắc đầu tiên (Bàn tay lạnh ẩm -> lo âu; nóng ẩm -> cường giáp; bàn tay thô to ẩm -> to đầu chi acromegaly; không buông được tay nắm -> loạn dưỡng cơ tăng trương lực myotonic dystrophy).'
    ]
  },
  {
    id: 'step-2-presenting-complaint',
    stepNumber: 2,
    title: 'Lý Do Đến Khám & Khai Thác Bệnh Sử (HPC)',
    englishTitle: 'Presenting Complaints & History of Present Illness (Macleod Ch.2)',
    summary: 'Nắm bắt câu chuyện của người bệnh bằng câu hỏi mở, làm rõ triệu chứng và áp dụng mô hình ICE (Ideas, Concerns, Expectations).',
    coreConcepts: [
      'Kỹ thuật hình phễu (Funneling technique): Bắt đầu bằng câu hỏi Mở (Open-ended) để bệnh nhân kể tự do trong 1-2 phút không ngắt lời -> Chuyển sang câu hỏi Đóng (Closed) để làm rõ chi tiết -> Dùng kỹ thuật Phản hồi (Reflection) và Tóm tắt (Summarisation).',
      'Lắng nghe chủ động (Active listening): Sử dụng các từ đệm khuyến khích ("Dạ vâng", "Bác cứ nói tiếp đi ạ", "Cháu đang nghe"), quan sát ngôn ngữ cơ thể.',
      'Mô hình ICE khai thác góc nhìn của người bệnh (Patient’s perspective):',
      ' - I (Ideas): Bác nghĩ mình đang bị bệnh gì?',
      ' - C (Concerns): Điều gì làm bác lo lắng hoặc sợ hãi nhất?',
      ' - E (Expectations): Bác mong đợi bác sĩ sẽ làm gì cho bác trong đợt khám này?'
    ],
    keyQuestions: [
      '"Bác hãy kể lại từ lúc bắt đầu cảm thấy mệt/khó chịu cho đến lúc phải vào viện?" (Câu hỏi mở)',
      '"Khi bác nói là bị đau ngực, bác có thể chỉ chính xác vị trí và mô tả cảm giác đau đó như thế nào không?" (Làm rõ chi tiết)',
      '"Vậy là bác bị cơn đau tức ngực sau xương ức từ sáng nay kéo dài 1 tiếng, lan lên cổ và kèm vã mồ hôi đúng không ạ?" (Kỹ thuật phản hồi / Reflection)'
    ],
    clinicalPearls: [
      'Bác sĩ thường có xu hướng ngắt lời bệnh nhân sau chỉ 18-20 giây đầu tiên. Hãy kiềm chế và để bệnh nhân nói trọn vẹn câu chuyện ban đầu.',
      'Phân biệt rõ ràng giữa Disease (Bệnh tật - nhìn từ góc độ sinh học bệnh lý của bác sĩ) và Illness (Trải nghiệm đau ốm - cảm xúc, lo âu và ảnh hưởng đến cuộc sống của người bệnh).'
    ]
  },
  {
    id: 'step-3-socrates-pathology',
    stepNumber: 3,
    title: 'Phân Tích Triệu Chứng Theo SOCRATES & Mô Hình Bệnh Học',
    englishTitle: 'Symptom Characterisation (SOCRATES) & Disease Causation Patterns',
    summary: 'Mã hóa chi tiết triệu chứng đau và nhận diện quy luật thời gian của 8 nhóm bệnh học kinh điển theo Macleod.',
    coreConcepts: [
      'Phân tích triệu chứng đau theo 8 chữ cái SOCRATES:',
      ' - S (Site): Vị trí chính xác (đau tạng thường mơ hồ đường giữa; đau thành khu trú rõ).',
      ' - O (Onset): Tốc độ khởi phát (đột ngột tức thì vs tăng dần).',
      ' - C (Character): Tính chất (bóp nghẹt, nhói buốt, quặn thắt từng cơn, bỏng rát, âm ỉ).',
      ' - R (Radiation): Hướng lan (lan lên vai/hàm, xuyên sau lưng, lan xuống bẹn).',
      ' - A (Associated symptoms): Triệu chứng kèm theo (sốt, nôn, vã mồ hôi, khó thở, tê bì).',
      ' - T (Timing): Thời gian kéo dài, cơn hay liên tục, thay đổi ngày/đêm.',
      ' - E (Exacerbating / Relieving factors): Yếu tố tăng/giảm (vận động, nghỉ ngơi, thức ăn, tư thế, thuốc).',
      ' - S (Severity): Thang điểm đau từ 1 đến 10, ảnh hưởng sinh hoạt.'
    ],
    keyQuestions: [
      '"Cơn đau có lan đi đâu không bác? Lan lên hàm hay ra sau lưng?"',
      '"Mỗi cơn kéo dài bao lâu? Cúi người ra trước có đỡ đau hơn không?"',
      '"Từ lúc đau đến giờ, sức khỏe bác giảm sút như thế nào, có đi bộ hay tự vệ sinh cá nhân được không?"'
    ],
    clinicalPearls: [
      'Mô hình 8 nhóm bệnh học kinh điển Macleod (Disease Causation):',
      ' • Nhiễm trùng (Infection): Khởi phát nhanh trong vài giờ-ngày, sốt, rét run, dấu hiệu khu trú.',
      ' • Viêm (Inflammation): Tái phát từng đợt kéo dài vài tuần-tháng, sưng nóng đau khu trú.',
      ' • Chuyển hóa (Metabolic): Biến thiên từ vài giờ đến vài tháng, tiến triển liên tục không thuyên giảm.',
      ' • Ác tính (Malignant): Khởi phát âm thầm, tiến triển xấu dần liên tục qua vài tuần-tháng, sụt cân, mệt mỏi.',
      ' • Độc chất (Toxic): Đột ngột dữ dội, nôn mửa, suy đa tạng.',
      ' • Chấn thương (Trauma): Đột ngột sau tác động cơ học.',
      ' • Mạch máu (Vascular): Đột ngột trong tích tắc, tiến triển bậc thang từng đợt cấp.',
      ' • Thoái hóa (Degenerative): Âm ỉ mạn tính qua nhiều tháng-năm, tăng khi vận động.'
    ]
  },
  {
    id: 'step-4-pmh-drugs',
    stepNumber: 4,
    title: 'Tiền Sử Bệnh Tật & Thuốc (PMH & Drug History)',
    englishTitle: 'Past Medical History & Detailed Drug History (Macleod Ch.2)',
    summary: 'Thu thập bệnh nền, phân biệt dị ứng thuốc thực sự với tác dụng phụ, và đánh giá mức độ tuân thủ điều trị.',
    coreConcepts: [
      'Khai thác bệnh nền có hệ thống: Bệnh nội khoa mạn tính (THA, ĐTĐ, hen, suy thận, bệnh tim), tiền sử phẫu thuật (loại mổ, năm mổ, chỉ định), tiền sử nằm viện.',
      'Đối chiếu đơn thuốc thực tế (Medication Reconciliation): Tên thuốc gốc (generic name), hàm lượng, liều dùng, đường dùng, thời gian dùng. Không bỏ sót: Thuốc xịt hít, thuốc nhỏ mắt, thuốc đặt âm đạo, thuốc bôi ngoài da, thực phẩm chức năng và thảo dược.',
      'Phân biệt Dị ứng thuốc thật sự (Allergy) vs Không dung nạp (Intolerance):',
      ' - Dị ứng thực sự (miễn dịch IgE/phức hợp miễn dịch): Nổi mày đay cấp, phù mạch quanh mắt môi (angioedema), co thắt phế quản, sốc phản vệ.',
      ' - Không dung nạp thuốc (Tác dụng phụ thông thường): Buồn nôn, cồn cào ruột, đau đầu nhẹ, tiêu chảy nhẹ.',
      'Đánh giá sự tuân thủ (Concordance & Adherence): Khoảng 50% bệnh nhân không uống thuốc theo đúng chỉ định bác sĩ. Hãy dùng câu hỏi mang tính thông cảm: "Uống nhiều loại thuốc như vậy chắc là rất khó nhớ, có hôm nào bác quên uống không ạ?"'
    ],
    keyQuestions: [
      '"Trước đây bác đã từng đi khám hoặc nằm viện vì bệnh gì chưa? Đã từng phẫu thuật lần nào chưa?"',
      '"Hiện tại ở nhà bác đang uống những loại thuốc gì mỗi ngày? Bác có mang theo đơn thuốc hoặc vỏ thuốc đi không?"',
      '"Bác đã từng bị dị ứng với loại thuốc hay thức ăn nào chưa? Khi bị dị ứng thì cơ thể bác nổi mẩn hay khó thở như thế nào?"'
    ],
    clinicalPearls: [
      'Ghi chép dị ứng: Luôn ghi rõ tên thuốc và triệu chứng phản ứng dị ứng cụ thể vào trang bìa bệnh án. Chỉ khoảng 1 trong 7 bệnh nhân tự khai "dị ứng Penicillin" là có test da dương tính thật sự.',
      'Thuốc kháng đông và ức chế miễn dịch: Luôn kiểm tra kỹ liều lượng và thời điểm uống gần nhất của Warfarin, NOAC, Corticoid, Methotrexate.'
    ]
  },
  {
    id: 'step-5-family-history',
    stepNumber: 5,
    title: 'Tiền Sử Gia Đình & Cây Phả Hệ (Family History)',
    englishTitle: 'Family History & Pedigree Charting (Macleod Ch.2)',
    summary: 'Nhận diện các bệnh lý di truyền đơn gen, đa gen và các yếu tố nguy cơ tim mạch sớm trong gia đình.',
    coreConcepts: [
      'Đối tượng cần khảo sát: Quan hệ bậc một (First-degree relatives): Cha mẹ, anh chị em ruột, con cái.',
      'Bệnh tim mạch sớm trong gia đình: Nam < 55 tuổi hoặc Nữ < 60 tuổi bị nhồi máu cơ tim, đột quỵ hoặc đột tử.',
      'Quy ước vẽ cây phả hệ chuẩn y khoa (Pedigree chart):',
      ' - Hình vuông: Nam; Hình tròn: Nữ;',
      ' - Gạch chéo: Đã mất (ghi kèm tuổi và nguyên nhân tử vong);',
      ' - Mũi tên (Propositus): Bệnh nhân hiện tại đang khám;',
      ' - Tô đen: Người mắc bệnh; Đường đôi: Hôn nhân cận huyết.'
    ],
    keyQuestions: [
      '"Trong gia đình có ai bị bệnh tim mạch, cao huyết áp, tiểu đường, hen suyễn hay ung thư không?"',
      '"Bố mẹ hoặc anh chị em có ai bị mất đột ngột khi còn trẻ tuổi không?"',
      '"Gia đình có quan hệ họ hàng gần với nhau không?"'
    ],
    clinicalPearls: [
      'Lưu ý bệnh di truyền lặn trên NST thường (Autosomal recessive như Tan máu bẩm sinh Thalassemia, Xơ nang Cystic fibrosis): Thường cha mẹ hoàn toàn khỏe mạnh (người lành mang gen lặn) nhưng con cái lại biểu hiện bệnh.'
    ]
  },
  {
    id: 'step-6-social-lifestyle',
    stepNumber: 6,
    title: 'Tiền Sử Xã Hội, Lối Sống & Môi Trường (Social History)',
    englishTitle: 'Social History, Lifestyle & Occupational Exposures (Macleod Ch.2)',
    summary: 'Khai thác chính xác chỉ số gói-năm thuốc lá, đơn vị cồn, nghề nghiệp độc hại, hoàn cảnh sống và tiền sử tình dục.',
    coreConcepts: [
      'Công thức tính chỉ số Gói-Năm hút thuốc (Pack-Years):',
      ' • Chỉ số Gói-Năm = (Số điếu thuốc hút mỗi ngày / 20) × Số năm hút thuốc.',
      ' • Ví dụ: Hút 15 điếu/ngày trong 40 năm = (15 / 20) × 40 = 30 gói-năm.',
      'Định nghĩa Đơn vị cồn (Alcohol Units): 1 đơn vị = 10 mL (8g) cồn nguyên chất = 1/2 panh bia (250ml) = 1 ly rượu vang nhỏ (125ml) = 1 chén rượu mạnh 25ml. Khuyến cáo tối đa 14 đơn vị cồn/tuần và có ít nhất 2 ngày không uống rượu.',
      'Tầm soát lạm dụng rượu: Bảng câu hỏi CAGE (Cut down, Annoyed, Guilty, Eye-opener). Điểm >= 2 gợi ý nghiện rượu mạn tính.',
      'Tiền sử nghề nghiệp & Bệnh bụi phổi (Bảng 2.9 Macleod):',
      ' - Bụi Amiăng (Asbestos): Công nhân đóng tàu, thợ phá dỡ công trình, thợ sửa ống nước -> Mảng màng phổi, bụi phổi asbestosis, U trung biểu mô ác tính (Mesothelioma).',
      ' - Bụi Đá (Silica): Thợ đẽo đá, công nhân mỏ đá -> Bệnh bụi phổi silic (Silicosis).',
      ' - Nấm mốc rơm rạ: Nông dân -> Phổi nông dân (Farmer’s lung / Hypersensitivity pneumonitis).',
      ' - Thợ lặn: Nổi lên quá nhanh -> Bệnh giảm áp (Decompression sickness).'
    ],
    keyQuestions: [
      '"Bác bắt đầu hút thuốc từ năm bao nhiêu tuổi? Trung bình mỗi ngày hút bao nhiêu điếu? Có hút thuốc lào hay thuốc lá điện tử không?"',
      '"Bác có thường uống rượu bia không? Có bao giờ bác cảm thấy mình cần phải giảm bớt lượng rượu uống không (CAGE)?"',
      '"Công việc trước đây và hiện tại của bác cụ thể là làm gì? Có thường xuyên tiếp xúc với bụi đá, hóa chất, sơn hay khói bụi độc hại không?"'
    ],
    clinicalPearls: [
      'Hỏi bệnh sử tình dục (5Ps + Plus): Bạn tình (Partners), Hành vi quan hệ (Practices), Phòng tránh bệnh lây truyền qua đường tình dục (Protection from STIs), Tiền sử mắc STI (Past STIs), Kế hoạch mang thai (Pregnancy plans) + Đánh giá bạo lực gia đình (Plus). Luôn giữ thái độ khách quan, không phán xét.'
    ]
  },
  {
    id: 'step-7-review-of-systems',
    stepNumber: 7,
    title: 'Lược Qua Các Cơ Quan (Systematic Enquiry / ROS)',
    englishTitle: 'Systematic Enquiry: Cardinal Symptoms (Macleod Ch.2)',
    summary: 'Rà soát toàn diện theo từng hệ cơ quan để không bỏ sót các triệu chứng tiềm ẩn mà người bệnh quên khai.',
    coreConcepts: [
      'Là tấm lưới an toàn (safety net) cuối cùng của buổi hỏi bệnh nhằm rà soát các triệu chứng then chốt (Cardinal symptoms).',
      'Triệu chứng toàn thân (General health): Cân nặng, sốt, sụt cân, mệt mỏi suy nhược, giấc ngủ.',
      'Tim mạch (CVS): Đau thắt ngực khi gắng sức, hồi hộp đánh trống ngực, khó thở khi nằm phẳng, khó thở kịch phát về đêm, phù mắt cá chân.',
      'Hô hấp (Resp): Ho, khạc đờm (màu sắc, lượng), ho ra máu, khò khè, đau ngực khi hít thở.',
      'Tiêu hóa (GI): Nuốt khó/nuốt đau, ợ nóng, buồn nôn, đau bụng, nôn máu/đi cầu phân đen, thay đổi thói quen đại tiện.',
      'Tiết niệu - Sinh dục (GU): Tiểu buốt, tiểu rắt, tiểu đêm, tiểu máu, són tiểu, kinh nguyệt (nữ), chức năng cương dương (nam).',
      'Thần kinh (Neuro): Đau đầu, chóng mặt, ngất xỉu, co giật, yếu liệt, tê bì kiến bò, nhìn đôi.',
      'Cơ xương khớp (MSK): Đau cứng khớp, sưng khớp, hạn chế đi lại.',
      'Nội tiết (Endocrine): Sợ nóng/sợ lạnh, khát nhiều uống nhiều tiểu nhiều (tam chứng đái tháo đường).'
    ],
    keyQuestions: [
      '"Ngoài những vấn đề bác vừa kể, gần đây bác có thấy sút cân, sốt nhẹ về chiều hay ra mồ hôi đêm không?"',
      '"Bác đi tiểu tiện và đại tiện có bình thường không? Có thấy vệt máu hay đổi màu phân không?"'
    ],
    clinicalPearls: [
      'Khi lược qua các cơ quan, nếu phát hiện một triệu chứng dương tính có ý nghĩa quan trọng (ví dụ bệnh nhân khai có ho ra máu vệt), hãy chuyển ngay triệu chứng đó vào Bệnh sử hiện tại (HPC) để phân tích chi tiết!'
    ]
  }
];

export const AMBIGUOUS_TERMS: AmbiguousTerm[] = [
  {
    patientTerm: '"Dị ứng" (Allergy)',
    commonUnderlyingProblems: [
      'Dị ứng qua trung gian IgE thật sự (mày đay, phù Quinke, sốc phản vệ)',
      'Tác dụng phụ không dung nạp thuốc (buồn nôn, cồn cào dạ dày, mệt mỏi)',
      'Không dung nạp thức ăn (thiếu men lactase gây tiêu chảy khi uống sữa)'
    ],
    usefulDistinguishingFeatures: [
      'Có ban mày đay sưng phù mí mắt môi cấp tính xuất hiện trong vài phút -> Dị ứng thật',
      'Chỉ có triệu chứng tiêu hóa nôn nao đơn thuần -> Không dung nạp thuốc thông thường'
    ],
    macleodTip: 'Chỉ 1/7 người tự khai "dị ứng Penicillin" có kết quả test da dị ứng thật sự.'
  },
  {
    patientTerm: '"Khó tiêu / Đau bao tử" (Indigestion)',
    commonUnderlyingProblems: [
      'Trào ngược dạ dày thực quản (GORD)',
      'Loét dạ dày tá tràng (Peptic ulcer)',
      'Viêm túi mật / Sỏi mật (Cholecystitis)',
      'Viêm tụy cấp hoặc mạn (Pancreatitis)',
      'Bệnh tim thiếu máu cục bộ (Angina tương đương)'
    ],
    usefulDistinguishingFeatures: [
      'Nóng rát sau ức tăng khi nằm -> GORD',
      'Đau thượng vị đói cồn cào, ăn vào đỡ đau -> Loét tá tràng',
      'Đau hạ sườn phải lan lên vai sau ăn mỡ -> Sỏi túi mật',
      'Đau tức ngực xuất hiện khi đi bộ gắng sức -> Đau thắt ngực'
    ],
    macleodTip: 'Luôn bảo bệnh nhân chỉ chính xác một ngón tay vào vị trí đau (Pointing sign).'
  },
  {
    patientTerm: '"Viêm khớp" (Arthritis)',
    commonUnderlyingProblems: [
      'Đau khớp không viêm (Arthralgia - Thoái hoá khớp)',
      'Viêm khớp thật sự (Arthritis - Sưng nóng đỏ đau)',
      'Đau xơ cơ (Fibromyalgia - đau mô mềm toàn thân)',
      'Viêm gân hoặc bao hoạt dịch quanh khớp'
    ],
    usefulDistinguishingFeatures: [
      'Khớp sưng phồng, nóng đỏ, cứng khớp sáng > 1 giờ -> Viêm khớp thật sự',
      'Đau tăng khi đi lại, cứng khớp < 15 phút, khớp gõ lạo xạo -> Thoái hóa khớp cơ học',
      'Khớp cử động bình thường nhưng ấn đau cơ bắp nhiều điểm -> Đau cơ / Fibromyalgia'
    ],
    macleodTip: 'Phân định rõ sưng đau tại khớp (articular) hay quanh khớp (extra-articular).'
  },
  {
    patientTerm: '"Cảm lạnh / Đờm dãi" (Catarrh)',
    commonUnderlyingProblems: [
      'Viêm phế quản xuất tiết đờm mủ',
      'Chảy dịch mũi sau do viêm mũi xoang (UACS)',
      'Nghẹt mũi do polyp hoặc vẹo vách ngăn'
    ],
    usefulDistinguishingFeatures: [
      'Ho khạc đờm xanh vàng từ ngực -> Nhiễm trùng phế quản',
      'Đờm vướng cổ họng kèm hắt hơi chảy mũi trong -> Chảy mũi sau'
    ],
    macleodTip: 'Xác định đờm xuất phát từ lồng ngực hay chảy xuống từ khoang mũi sau.'
  },
  {
    patientTerm: '"Lên cơn / Co giật" (Fits / Blackouts)',
    commonUnderlyingProblems: [
      'Cơn ngất xỉu do hạ huyết áp / tim mạch (Syncope)',
      'Cơn động kinh co cứng co giật (Epileptic seizure)',
      'Cơn giật tâm lý cơ năng (Dissociative / Non-epileptic attack)'
    ],
    usefulDistinguishingFeatures: [
      'Có tiền triệu chóng mặt, da tái nhợt, ngất < 1 phút, tỉnh nhanh không lú lẫn -> Ngất (Syncope)',
      'Mất ý thức đột ngột, co giật nhịp nhàng 1-2 phút, cắn lưỡi bên rìa, lú lẫn sau cơn -> Động kinh',
      'Mắt nhắm chặt chống cự, giật không đồng bộ, kéo dài nhiều chục phút -> Cơn co giật tâm lý'
    ],
    macleodTip: 'Luôn tìm người chứng kiến cơn giật (witness history) để hỏi chi tiết.'
  },
  {
    patientTerm: '"Chóng mặt" (Dizziness)',
    commonUnderlyingProblems: [
      'Chóng mặt xoay tròn tiền đình (Vertigo)',
      'Choáng váng tiền ngất (Presyncope)',
      'Mất thăng bằng khi đi lại (Dysequilibrium)',
      'Cảm giác lâng lâng lo âu tăng thông khí (Lightheadedness)'
    ],
    usefulDistinguishingFeatures: [
      'Cảm giác nhà cửa quay cuồng, nghiêng ngả -> Tổn thương tiền đình (Vertigo)',
      'Cảm giác tối sầm mặt khi đứng dậy -> Hạ huyết áp tư thế (Presyncope)',
      'Chân tay loạng choạng khi bước đi, nhắm mắt ngã (Romberg +) -> Mất cảm giác sâu'
    ],
    macleodTip: 'Hỏi câu then chốt: "Bác thấy nhà cửa quay quanh bác hay bác thấy hoa mắt tối sầm mặt?"'
  }
];

export const SYSTEMATIC_ENQUIRY_DATA: SystematicEnquiryItem[] = [
  {
    system: 'general',
    systemVi: 'Toàn thân (General Health)',
    questions: [
      'Cân nặng gần đây có thay đổi không? Bác có bị sụt cân không mong muốn?',
      'Có sốt, rét run hay vã mồ hôi ướt áo ban đêm không?',
      'Sức khỏe tổng quát, độ tập trung và giấc ngủ có tốt không?'
    ],
    cardinalSymptoms: [
      { symptom: 'Sụt cân không rõ nguyên nhân (> 5% trong 6 tháng)', clinicalClue: 'Ung thư, cường giáp, đái tháo đường, suy mòn nhiễm trùng mạn tính.' },
      { symptom: 'Mồ hôi trộm ban đêm (Night sweats)', clinicalClue: 'Lao phổi, U lympho ác tính (Lymphoma), áp xe ẩn sâu.' }
    ]
  },
  {
    system: 'cardiovascular',
    systemVi: 'Hệ Tim Mạch (Cardiovascular)',
    questions: [
      'Bác có bị đau thắt hay đè nặng ở ngực khi đi lại gắng sức không?',
      'Có hay bị khó thở khi nằm phẳng phải kê cao gối, hoặc thức giấc nửa đêm vì ngạt thở không?',
      'Có cảm giác tim đập thình thịch, đập nhanh bỏ nhịp trong lồng ngực không?',
      'Chân hoặc mắt cá chân có bị sưng phù vào cuối ngày không?'
    ],
    cardinalSymptoms: [
      { symptom: 'Đau thắt ngực gắng sức (Exertional angina)', clinicalClue: 'Bệnh động mạch vành thiếu máu cơ tim.' },
      { symptom: 'Khó thở khi nằm phẳng (Orthopnoea) & Kịch phát về đêm (PND)', clinicalClue: 'Suy tim sung huyết ứ máu phổi.' },
      { symptom: 'Đau cách hồi bắp chân (Intermittent claudication)', clinicalClue: 'Bệnh động mạch ngoại biên (PAD).' }
    ]
  },
  {
    system: 'respiratory',
    systemVi: 'Hệ Hô Hấp (Respiratory)',
    questions: [
      'Bác có ho dai dẳng không? Ho có khạc ra đờm không, đờm màu gì?',
      'Có bao giờ ho khạc ra vệt máu hay đờm lẫn máu tươi không?',
      'Khi thở có nghe tiếng rít cò cử khò khè trong ngực không?'
    ],
    cardinalSymptoms: [
      { symptom: 'Ho ra máu (Haemoptysis)', clinicalClue: 'Lao phổi, ung thư phổi, giãn phế quản, thuyên tắc phổi.' },
      { symptom: 'Khò khè thì thở ra (Expiratory wheeze)', clinicalClue: 'Co thắt đường thở trong hen phế quản hoặc đợt cấp COPD.' }
    ]
  },
  {
    system: 'gastrointestinal',
    systemVi: 'Hệ Tiêu Hóa (Gastrointestinal)',
    questions: [
      'Bác nuốt thức ăn có bị nghẹn, tắc hay nuốt đau ở cổ họng/ngực không?',
      'Có ợ chua, nóng rát dạ dày hay nôn ói không?',
      'Thói quen đi cầu có thay đổi không? Phân có lỏng, có lẫn máu tươi hay phân đen như bã cà phê không?'
    ],
    cardinalSymptoms: [
      { symptom: 'Nuốt nghẹn tiến triển từ đặc sang lỏng (Progressive dysphagia)', clinicalClue: 'Báo động đỏ ung thư thực quản hoặc tâm vị.' },
      { symptom: 'Đi cầu phân đen như hắc ín (Melaena)', clinicalClue: 'Xuất huyết tiêu hóa trên do loét dạ dày tá tràng.' },
      { symptom: 'Mót rặn (Tenesmus) liên tục', clinicalClue: 'Khối u trực tràng hoặc viêm trực tràng trực khuẩn.' }
    ]
  },
  {
    system: 'genitourinary',
    systemVi: 'Hệ Tiết Niệu - Sinh Dục (Genitourinary)',
    questions: [
      'Đi tiểu có bị buốt, rát, ngắt quãng hay tiểu lắt nhắt nhiều lần không?',
      'Nước tiểu có màu đỏ máu không? Có phải thức dậy ban đêm nhiều lần để đi tiểu?',
      'Nam giới: Tia nước tiểu có yếu, phải rặn hoặc rỉ rắt cuối bãi không?',
      'Nữ giới: Kinh nguyệt có đều không? Có ra máu bất thường giữa kỳ hay sau mãn kinh không?'
    ],
    cardinalSymptoms: [
      { symptom: 'Tiểu máu không đau (Painless haematuria)', clinicalClue: 'Ung thư bàng quang hoặc ung thư thận cho đến khi loại trừ.' },
      { symptom: 'Ra máu âm đạo sau mãn kinh (PMB)', clinicalClue: 'Báo động đỏ ung thư nội mạc tử cung.' }
    ]
  },
  {
    system: 'neurological',
    systemVi: 'Hệ Thần Kinh (Nervous System)',
    questions: [
      'Bác có bị đau đầu dữ dội, hoa mắt, nhìn đôi (thấy 2 hình) không?',
      'Có từng bị ngất xỉu, co giật hay mất ý thức tạm thời không?',
      'Tay chân có bị yếu liệt, vụng về khi cầm nắm hoặc tê bì kiến bò không?'
    ],
    cardinalSymptoms: [
      { symptom: 'Đau đầu sét đánh (Thunderclap headache)', clinicalClue: 'Xuất huyết khoang dưới nhện (SAH).' },
      { symptom: 'Yếu liệt hoặc tê bì nửa người đột ngột', clinicalClue: 'Cơn thiếu máu não thoáng qua (TIA) hoặc đột quỵ não cấp.' }
    ]
  }
];

export const CHALLENGING_SCENARIOS: ChallengingScenario[] = [
  {
    scenario: 'Bệnh nhân tức giận hoặc hung hăng (Angry or Hostile Patient)',
    description: 'Người bệnh cảm thấy bức xúc vì chờ đợi lâu, đau đớn không được xử trí kịp thời hoặc mất niềm tin vào hệ thống y tế.',
    suggestedApproaches: [
      'Giữ bình tĩnh tuyệt đối, không phản ứng lại bằng sự giận dữ hay tranh cãi.',
      'Công nhận cảm xúc của người bệnh: "Cháu hiểu là bác đang rất bức xúc và mệt mỏi vì phải chờ đợi lâu."',
      'Tạo không gian an toàn, không thách thức, ngồi ngang tầm mắt và giữ khoảng cách hợp lý.',
      'Nếu bệnh nhân có nguy cơ bạo lực đe dọa an toàn, bình tĩnh lùi lại, gọi sự hỗ trợ của đồng nghiệp và bảo vệ bệnh viện.'
    ],
    macleodPearl: 'Chấp nhận cảm xúc tức giận của bệnh nhân mà không nhất thiết phải đồng tình với lý do của họ.'
  },
  {
    scenario: 'Bệnh nhân nói nhiều, lan man không trọng tâm (Verbose / Talkative Patient)',
    description: 'Bệnh nhân kể chi tiết vụn vặt, lan man sang chuyện gia đình hàng xóm, làm buổi khám kéo dài quá mức.',
    suggestedApproaches: [
      'Lắng nghe chăm chú trong 1-2 phút đầu để nắm bắt tâm lý lo lắng ẩn giấu.',
      'Lịch sự ngắt lời bằng cách tóm tắt lại trọng tâm: "Bác vừa kể rất nhiều thông tin, nhưng để giúp bác tốt nhất, xin phép bác cho cháu tập trung vào triệu chứng đau ngực sáng nay trước nhé."',
      'Đặt câu hỏi đóng hoặc câu hỏi có nhiều lựa chọn để thu hẹp phạm vi trả lời.'
    ],
    macleodPearl: 'Đặt câu hỏi phân độ: "Bác hãy chọn ra 1 trong 3 vấn đề làm bác lo lắng nhất hôm nay để chúng ta giải quyết trước."'
  },
  {
    scenario: 'Bệnh nhân im lặng hoặc suy sụp khóc lóc (Silent or Tearful Patient)',
    description: 'Bệnh nhân trầm cảm, sợ hãi trước chẩn đoán nặng hoặc quá xúc động khi nhắc đến biến cố mất mát.',
    suggestedApproaches: [
      'Tôn trọng khoảng lặng (Silence is therapeutic): Không vội vàng đặt câu hỏi tiếp theo ngay, để bệnh nhân có thời gian lấy lại bình tĩnh.',
      'Thể hiện sự thấu cảm: Đưa khăn giấy, nhẹ nhàng nói: "Bác cứ bình tĩnh, cháu hiểu đây là một giai đoạn rất khó khăn đối với bác."',
      'Tránh trấn an non nớt giả tạo (False reassurance) như "Bác đừng lo, mọi chuyện sẽ ổn thôi" vì sẽ làm bệnh nhân cảm thấy không được lắng nghe.'
    ],
    macleodPearl: 'Khoảng lặng có sức mạnh trị liệu to lớn; hãy học cách chịu đựng khoảng im lặng trong giao tiếp lâm sàng.'
  },
  {
    scenario: 'Bệnh nhân có suy giảm nhận thức hoặc sa sút trí tuệ (Cognitive Impairment)',
    description: 'Bệnh nhân lú lẫn, nhớ trước quên sau, trả lời không nhất quán hoặc che giấu sự sa sút trí nhớ bằng giao tiếp xã hội khéo léo.',
    suggestedApproaches: [
      'Dùng câu ngắn gọn, đơn giản, nói chậm và rõ ràng.',
      'Hỏi ý kiến bệnh nhân để khai thác lời kể từ người nhà hoặc người chăm sóc trực tiếp (Collateral history).',
      'Đánh giá nhanh bậc thang nhận thức (AMT hoặc Mini-Cog test) để xác định mức độ suy giảm.'
    ],
    macleodPearl: 'Không bao giờ xem nhẹ lời kể của bệnh nhân sa sút trí tuệ; luôn đối chiếu chéo với người chăm sóc.'
  }
];

export interface SbarItem {
  key: string;
  letter: string;
  title: string;
  englishTitle: string;
  meaning: string;
  checklist: string[];
  example: string;
}

export const SBAR_GUIDELINE: SbarItem[] = [
  {
    key: 'situation',
    letter: 'S',
    title: 'Tình Huống Hiện Tại',
    englishTitle: 'Situation',
    meaning: 'Xác định ngay người gọi, người nghe, danh tính bệnh nhân và lý do cấp bách cần trao đổi.',
    checklist: [
      'Xưng tên, chức danh và khoa phòng đang công tác.',
      'Nêu họ tên người bệnh, tuổi, mã hồ sơ hoặc số giường/phòng.',
      'Nêu ngắn gọn lý do gọi điện trong 1 câu: "Tôi gọi vì bệnh nhân đột ngột khó thở, tụt huyết áp..."'
    ],
    example: '"Chào bác sĩ Tuấn, tôi là bác sĩ Nam nội trú khoa Hô Hấp. Tôi gọi để hội chẩn khẩn về bệnh nhân Nguyễn Văn A, 68 tuổi, giường 12 phòng 402, vừa đột ngột tụt huyết áp và suy hô hấp cấp."'
  },
  {
    key: 'background',
    letter: 'B',
    title: 'Bối Cảnh & Tiền Sử',
    englishTitle: 'Background',
    meaning: 'Cung cấp bối cảnh lâm sàng trọng yếu đưa đến tình trạng hiện tại.',
    checklist: [
      'Chẩn đoán nhập viện và ngày nhập viện.',
      'Các can thiệp hoặc phẫu thuật vừa thực hiện.',
      'Bệnh nền tim mạch/hô hấp liên quan và các thuốc đang điều trị (đặc biệt kháng đông, vận mạch).'
    ],
    example: '"Bệnh nhân được phẫu thuật thay khớp háng ngày thứ 3, tiền sử tăng huyết áp và đái tháo đường. Đang dùng Enoxaparin dự phòng huyết khối và Paracetamol giảm đau."'
  },
  {
    key: 'assessment',
    letter: 'A',
    title: 'Đánh Giá Lâm Sàng Của Bạn',
    englishTitle: 'Assessment',
    meaning: 'Báo cáo chính xác sinh hiệu, triệu chứng thực thể mới xuất hiện và chẩn đoán nghi ngờ.',
    checklist: [
      'Sinh hiệu hiện tại: Mạch, HA, Nhịp thở, SpO2 (kèm lưu lượng O2), Tri giác (GCS).',
      'Dấu hiệu thực thể: Nghe phổi, tĩnh mạch cổ, tiếng tim.',
      'Chẩn đoán sơ bộ hoặc mối lo ngại lớn nhất của bạn.'
    ],
    example: '"Hiện tại bệnh nhân thở 32 lần/phút, SpO2 86% với oxy mask 10L, HA tụt còn 85/50 mmHg, mạch nhanh 125 ck/phút, JVP nổi rõ, phổi không rale. Tôi nghĩ nhiều đến thuyên tắc động mạch phổi cấp diện rộng."'
  },
  {
    key: 'recommendation',
    letter: 'R',
    title: 'Đề Xuất & Yêu Cầu Can Thiệp',
    englishTitle: 'Recommendation',
    meaning: 'Nêu rõ hành động mong đợi ở bác sĩ cấp cao/chuyên khoa ngay tại thời điểm này.',
    checklist: [
      'Yêu cầu bác sĩ đến giường khám ngay lập tức nếu nguy kịch.',
      'Đề xuất xét nghiệm khẩn (Khí máu động mạch, ECG, CT-scan mạch phổi, Siêu âm tim tại giường).',
      'Xin y lệnh xử trí tạm thời (bắt đầu truyền dịch, vận mạch hay chống đông).'
    ],
    example: '"Tôi đề nghị bác sĩ đến khám trực tiếp ngay bây giờ. Trong lúc này tôi đã cho làm ECG cấp, lấy khí máu động mạch và thiết lập đường truyền tĩnh mạch lớn. Anh có đồng ý cho bắt đầu truyền dịch Noradrenaline duy trì không ạ?"'
  }
];

export interface SpikesStep {
  step: string;
  letter: string;
  name: string;
  englishName: string;
  objective: string;
  dialogueExample: string;
  clinicalTips: string[];
}

export const SPIKES_PROTOCOL: SpikesStep[] = [
  {
    step: '1',
    letter: 'S',
    name: 'Bố Trí Môi Trường',
    englishName: 'Setting up the interview',
    objective: 'Tạo không gian yên tĩnh, riêng tư, không có tiếng ồn hoặc bị ngắt lời.',
    dialogueExample: '"Mời bác và anh chị cùng ngồi. Cháu muốn chúng ta có một khoảng không gian riêng tư để trao đổi kỹ về kết quả sinh thiết vừa có."',
    clinicalTips: [
      'Tắt hoặc để điện thoại ở chế độ rung trước khi bắt đầu.',
      'Ngồi ngang tầm mắt người bệnh, không để bàn làm việc to chắn ngang.',
      'Khuyến khích bệnh nhân có người thân tin cậy đi cùng để hỗ trợ tinh thần.'
    ]
  },
  {
    step: '2',
    letter: 'P',
    name: 'Đánh Giá Nhận Thức Bệnh Nhân',
    englishName: 'Perception of the patient',
    objective: 'Tìm hiểu xem bệnh nhân đã biết gì và nghĩ gì về tình trạng bệnh của mình.',
    dialogueExample: '"Bác có thể cho cháu biết từ hôm nằm viện đến giờ, các bác sĩ đã trao đổi với bác những gì về nguyên nhân gây sụt cân và ho ra máu chưa ạ?"',
    clinicalTips: [
      'Sử dụng câu hỏi mở: "Bác nghĩ tình trạng sức khỏe của mình hiện ra sao?"',
      'Đánh giá xem bệnh nhân có đang phủ nhận (denial) hoặc lo sợ điều gì cụ thể không.'
    ]
  },
  {
    step: '3',
    letter: 'I',
    name: 'Xin Phép Được Chia Sẻ',
    englishName: 'Invitation',
    objective: 'Thăm dò xem người bệnh muốn biết chi tiết ở mức độ nào.',
    dialogueExample: '"Hôm nay đã có kết quả giải phẫu bệnh chính xác. Bác muốn cháu trình bày tường tận từng chi tiết hay bác muốn cháu nói những điểm chính yếu nhất trước?"',
    clinicalTips: [
      'Một số bệnh nhân muốn người nhà nghe trước hoặc không muốn nghe các con số tiên lượng xấu; luôn tôn trọng quyền tự quyết của họ.'
    ]
  },
  {
    step: '4',
    letter: 'K',
    name: 'Truyền Đạt Thông Tin & Tri Thức',
    englishName: 'Knowledge and information',
    objective: 'Báo tin bằng ngôn từ đơn giản, trực diện, không dùng biệt ngữ y khoa, có lời cảnh báo trước (warning shot).',
    dialogueExample: '"Rất tiếc là kết quả không được tốt như tất cả chúng ta cùng hy vọng... Mẫu sinh thiết cho thấy có tế bào ung thư ác tính ở phổi bác ạ."',
    clinicalTips: [
      'Luôn có phát súng cảnh báo (Warning shot) trước câu chẩn đoán chính.',
      'Nói từng câu ngắn, ngắt quãng để bệnh nhân kịp tiếp nhận thông tin.',
      'Tránh nói thô bạo: "Bác bị ung thư giai đoạn cuối sắp chết rồi."'
    ]
  },
  {
    step: '5',
    letter: 'E',
    name: 'Thấu Cảm & Đáp Ứng Cảm Xúc',
    englishName: 'Empathy & addressing emotions',
    objective: 'Công nhận cảm xúc của người bệnh (khóc, sốc, giận dữ) và thể hiện sự đồng hành nâng đỡ.',
    dialogueExample: '"Cháu biết tin này thực sự là một cú sốc rất lớn đối với bác và gia đình... Bác cứ khóc đi ạ, cháu luôn ở đây để đồng hành cùng bác."',
    clinicalTips: [
      'Quy tắc NURSE: N (Naming cảm xúc), U (Understanding), R (Respecting), S (Supporting), E (Exploring).',
      'Tuyệt đối không trấn an non nớt giả tạo: "Bác đừng lo, y học giờ hiện đại lắm không sao đâu."'
    ]
  },
  {
    step: '6',
    letter: 'S',
    name: 'Chiến Lược Điều Trị & Tóm Tắt',
    englishName: 'Strategy and Summary',
    objective: 'Vạch ra kế hoạch hành động cụ thể bước tiếp theo để người bệnh không cảm thấy bị bỏ rơi.',
    dialogueExample: '"Bước tiếp theo, sáng mai cháu sẽ hội chẩn với các bác sĩ chuyên khoa Ung bướu và Phẫu thuật lồng ngực để chọn phác đồ điều trị tốt nhất cho bác. Bác có câu hỏi nào cần cháu giải thích thêm ngay lúc này không?"',
    clinicalTips: [
      'Luôn đưa ra một kế hoạch cụ thể cho 24-48 giờ tới.',
      'Hẹn thời điểm gặp lại để giải đáp thắc mắc sau khi gia đình đã bình tâm hơn.'
    ]
  }
];

export interface SpotDiagnosisItem {
  id: string;
  name: string;
  faciesOrBody: string;
  classicSigns: string[];
  underlyingCondition: string;
  macleodNote: string;
}

export const SPOT_DIAGNOSES: SpotDiagnosisItem[] = [
  {
    id: 'parkinson-facies',
    name: 'Bộ Mặt Parkinson (Mask-like Facies)',
    faciesOrBody: 'Khuôn mặt bất động như đeo mặt nạ, ít biểu cảm, chớp mắt thưa thớt (thường < 5-10 lần/phút).',
    classicSigns: [
      'Ánh mắt nhìn chằm chằm không biểu cảm',
      'Miệng hơi hé mở, có thể rỉ nước bọt',
      'Giọng nói nhỏ đều đều không có ngữ điệu (hypophonia)',
      'Run khi nghỉ kiểu "ve viên thuốc" (pill-rolling tremor 4-6 Hz)'
    ],
    underlyingCondition: 'Bệnh Parkinson hoặc Hội chứng Parkinson thứ phát (suy thoái tế bào thần kinh thể đen dopaminergic).',
    macleodNote: 'Bệnh nhân thường đi bước nhỏ dồn dập, thân mình đổ ra trước và giảm vung vẩy tay khi đi.'
  },
  {
    id: 'cushing-syndrome',
    name: 'Hội Chứng Cushing (Cushingoid Facies)',
    faciesOrBody: 'Mặt tròn như mặt trăng (Moon face), ửng đỏ hai gò má (Plethora), rậm lông nhẹ.',
    classicSigns: [
      'Gù trâu mỡ sau gáy (Buffalo hump) và đệm mỡ hố thượng đòn',
      'Béo phì trung tâm nhưng tay chân teo cơ (Central obesity with thin limbs)',
      'Vết rạn da màu tím đỏ rộng > 1cm ở bụng, đùi (Purple striae)',
      'Da mỏng dễ bầm tím, tăng huyết áp'
    ],
    underlyingCondition: 'Cường cortisol máu (do dùng corticoid kéo dài, u tuyến yên tiết ACTH hoặc u vỏ thượng thận).',
    macleodNote: 'Nguyên nhân thường gặp nhất trong thực hành nội trú là lạm dụng corticoid ngoại sinh.'
  },
  {
    id: 'acromegaly',
    name: 'Bệnh To Đầu Chi (Acromegaly Facies)',
    faciesOrBody: 'Khuôn mặt thô to, xương hàm dưới nhô ra trước (prognathism), cung mày gồ cao.',
    classicSigns: [
      'Răng cửa dưới thưa ra do hàm dưới phát triển quá mức',
      'Mũi to bè, môi dày thô, lưỡi to (macroglossia)',
      'Bàn tay to bè như cái xẻng (spade-like hands), bắt tay cảm giác nhão và ẩm ướt',
      'Tăng tiết mồ hôi toàn thân, giọng nói trầm ồm vang'
    ],
    underlyingCondition: 'U tuyến yên tiết quá mức Hormon tăng trưởng (GH) sau khi đã đóng đầu xương.',
    macleodNote: 'Hỏi xem bệnh nhân có phải tăng cỡ nhẫn hoặc cỡ giày dép trong những năm gần đây không.'
  },
  {
    id: 'graves-disease',
    name: 'Bệnh Bướu Cổ Lồi Mắt Graves (Thyrotoxic Facies)',
    faciesOrBody: 'Vẻ mặt hoảng hốt lo âu, mắt lồi trợn ngược (Exophthalmos / Proptosis).',
    classicSigns: [
      'Dấu hiệu co rút cơ mi trên để lộ củng mạc trắng phía trên giác mạc (Stellwag)',
      'Dấu hiệu mất phối hợp mi-cầu khi liếc mắt từ trên xuống dưới (von Graefe)',
      'Bướu giáp lan tỏa, có thể nghe thấy tiếng thổi tâm thu tại cực trên tuyến giáp',
      'Bàn tay nóng ẩm, run nhẹ đầu ngón tay tần số cao 8-12 Hz'
    ],
    underlyingCondition: 'Cường giáp tự miễn (Bệnh Basedow / Graves disease do kháng thể TRAb).',
    macleodNote: 'Lồi mắt thật sự chỉ gặp trong bệnh tự miễn Graves, không gặp ở các nguyên nhân cường giáp khác.'
  },
  {
    id: 'horner-syndrome',
    name: 'Hội Chứng Horner (Horner’s Syndrome)',
    faciesOrBody: 'Tổn thương một bên mặt do gián đoạn đường dẫn truyền thần kinh giao cảm cổ.',
    classicSigns: [
      'Sụp mi nhẹ (Partial Ptosis do liệt cơ Muller mi trên)',
      'Co nhỏ đồng tử (Miosis bên tổn thương, rõ hơn trong bóng tối)',
      'Giảm hoặc mất tiết mồ hôi nửa mặt (Anhidrosis)',
      'Nhãn cầu có vẻ thụt vào trong (Enophthalmos biểu kiến)'
    ],
    underlyingCondition: 'U đỉnh phổi xâm lấn hạch sao giao cảm (U Pancoast), bóc tách động mạch cảnh trong, u trung thất.',
    macleodNote: 'Luôn chỉ định chụp X-quang hoặc CT lồng ngực tìm u đỉnh phổi khi phát hiện hội chứng Horner.'
  },
  {
    id: 'sle-butterfly-rash',
    name: 'Ban Cánh Bướm Lupus Ban Đỏ (Malar Rash)',
    faciesOrBody: 'Ban đỏ nổi gồ hoặc phẳng hình cánh bướm đối xứng qua sống mũi lan sang 2 bên gò má.',
    classicSigns: [
      'Ban đỏ rát đặc trưng KHÔNG lan vào rãnh mũi má (spares nasolabial folds)',
      'Nhạy cảm với ánh sáng mặt trời (Photosensitivity)',
      'Loét miệng họng không đau, rụng tóc từng mảng',
      'Đau sưng các khớp nhỏ bàn tay đối xứng'
    ],
    underlyingCondition: 'Lupus ban đỏ hệ thống (Systemic Lupus Erythematosus - SLE).',
    macleodNote: 'Đặc điểm bảo tồn không tổn thương rãnh mũi má là chìa khóa phân biệt với viêm da dầu (seborrhoeic dermatitis).'
  },
  {
    id: 'systemic-sclerosis',
    name: 'Bộ Mặt Xơ Cứng Bì (Systemic Sclerosis Facies)',
    faciesOrBody: 'Khuôn mặt chim ưng (Bird-beak facies), da mặt căng bóng mất nếp nhăn biểu cảm.',
    classicSigns: [
      'Mũi nhọn mỏng quắp như mỏ chim, tai mỏng dính',
      'Miệng nhỏ hẹp (Microstomia) kèm các nếp nhăn tỏa nan hoa quanh viền môi',
      'Giảm biên độ há miệng, khó khăn khi đánh răng hoặc khám miệng',
      'Dấu hiệu xơ cứng ngón (Sclerodactyly), hoại tử đầu ngón tay do Raynaud nặng'
    ],
    underlyingCondition: 'Xơ cứng bì hệ thống (Systemic Sclerosis / Scleroderma).',
    macleodNote: 'Kiểm tra hiện tượng Raynaud (trắng - tím - đỏ khi gặp lạnh) ở các đầu ngón tay.'
  },
  {
    id: 'bells-palsy',
    name: 'Liệt Dây VII Ngoại Biên (Bell’s Palsy Facies)',
    faciesOrBody: 'Mặt mất đối xứng hoàn toàn một bên, mất nếp nhăn trán và rãnh mũi má bên liệt.',
    classicSigns: [
      'Mắt bên liệt nhắm không kín (Lagophthalmos), nhãn cầu đảo lên trên khi cố nhắm (Bell sign)',
      'Mất nếp nhăn trán bên liệt (Chìa khóa phân biệt với liệt mặt trung ương)',
      'Miệng méo xếch sang bên lành, ăn uống bị đọng thức ăn và rỉ nước bên liệt'
    ],
    underlyingCondition: 'Viêm dây thần kinh số VII ngoại vi cấp tính (thường do tái hoạt virus HSV-1 hoặc VZV).',
    macleodNote: 'Liệt dây VII trung ương (đột quỵ não) BẢO TỒN nếp nhăn trán do trán được chi phối vỏ não hai bên.'
  }
];

