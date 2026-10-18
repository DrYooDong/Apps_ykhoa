import { ClinicalCaseQuiz } from '../types';
import { CLINICAL_CASES_PART2 } from './clinicalCasesPart2';

const BASE_CLINICAL_CASES: ClinicalCaseQuiz[] = [
  {
    id: 'case_ch14',
    chapterNumber: 14,
    chapterTitle: 'Staphylococci (Chương 14: Tụ cầu khuẩn)',
    type: 'case_in_point',
    caseScenario: {
      vi: 'Nữ sinh 15 tuổi chấn thương gối khi chạy vượt rào, được phẫu thuật tái tạo dây chằng chéo trước (ACL) có bắt vít cố định. Tuần thứ 2 sau mổ, khớp gối sưng đau tăng dần, rỉ dịch trong suốt từ vết mổ. Dẫn lưu dịch vết mổ: Nhuộm Gram thấy nhiều cầu khuẩn Gram dương xếp đôi và tụ thành cụm, ít bạch cầu PMN. Nuôi cấy sau 18h mọc vi khuẩn dồi dào, thử nghiệm coagulase ống nghiệm dương tính (+). Tuy nhiên, máy MALDI-TOF và phân tích kháng sinh đồ không xác định được S. aureus. Khai thác bệnh sử: Bệnh nhân cùng chị gái thường xuyên làm tình nguyện viên chăm sóc chó mèo tại trạm cứu hộ động vật địa phương.',
      en: 'A 15-year-old female student tore her ACL and underwent graft surgery with screws. In recovery week 2, increased knee pain and clear exudate occurred. Gram stain revealed many Gram-positive cocci in pairs and clusters. Heavy growth of tube coagulase-positive Staphylococcus grew at 18h. MALDI-TOF did not identify S. aureus. Patient history revealed frequent volunteering at an animal shelter.'
    },
    question: {
      vi: 'Tác nhân vi khuẩn tụ cầu nào phù hợp nhất với ca lâm sàng lây truyền từ động vật này?',
      en: 'Which staphylococcal species is the most likely causative agent in this zoonotic clinical case?'
    },
    options: [
      {
        id: 'a',
        text: {
          vi: 'Staphylococcus epidermidis',
          en: 'Staphylococcus epidermidis'
        }
      },
      {
        id: 'b',
        text: {
          vi: 'Staphylococcus pseudintermedius',
          en: 'Staphylococcus pseudintermedius'
        }
      },
      {
        id: 'c',
        text: {
          vi: 'Staphylococcus saprophyticus',
          en: 'Staphylococcus saprophyticus'
        }
      },
      {
        id: 'd',
        text: {
          vi: 'Micrococcus luteus',
          en: 'Micrococcus luteus'
        }
      }
    ],
    correctOptionId: 'b',
    explanation: {
      vi: 'Staphylococcus pseudintermedius là vi khuẩn gây bệnh cơ hội thường gặp ở chó và mèo (viêm da mủ, viêm tai, nhiễm trùng vết mổ). Vi khuẩn này dương tính với thử nghiệm đông huyết tương ống nghiệm (tube coagulase positive) nên rất dễ bị nhầm lẫn với S. aureus; tuy nhiên nó âm tính với clumping factor (slide coagulase) và âm tính trên các test ngưng kết latex thương mại. Thường mang yếu tố SCCmec II/III gây kháng oxacillin.',
      en: 'S. pseudintermedius is an opportunistic pathogen of dogs and cats. It produces a positive tube coagulase test (causing confusion with S. aureus) but is clumping factor negative and negative in latex agglutination tests. It frequently harbors SCCmec conferring oxacillin resistance.'
    },
    clinicalTakeaway: {
      vi: 'Ở bệnh nhân nhiễm trùng vết mổ có tiếp xúc động vật, phân lập được tụ cầu coagulase (+), cần chú ý phân biệt S. pseudintermedius với S. aureus bằng MALDI-TOF hoặc sinh hóa mở rộng.',
      en: 'When a coagulase-positive staphylococcus is isolated from a surgical wound in an animal-exposed patient, rule out S. pseudintermedius.'
    },
    relatedPathogenId: 's_aureus'
  },
  {
    id: 'case_ch15',
    chapterNumber: 15,
    chapterTitle: 'Streptococcaceae (Chương 15: Liên cầu khuẩn)',
    type: 'case_in_point',
    caseScenario: {
      vi: 'Bé trai 9 tuổi sốt cao, đau họng 3 ngày. Khám họng thấy niêm mạc họng đỏ rực, hai amidan sưng to ứ mủ, hạch cổ sưng to đau rõ rệt. Quệt họng cấy lên đĩa thạch máu cừu (SBA), sau 24 giờ ủ thấy khuẩn lạc nhỏ, trong suốt, sáng bóng, bao quanh bởi một quầng tan máu beta (β) rộng và trong hoàn toàn.',
      en: 'A 9-year-old boy presented with fever, severe sore throat for 3 days. Exam revealed erythematous pharynx, swollen exudative tonsils, and cervical lymphadenopathy. Throat swab on SBA yielded small, shiny, translucent colonies with a wide zone of complete beta-hemolysis.'
    },
    question: {
      vi: 'Bộ thử nghiệm nào sau đây cho phép khẳng định nhanh và chính xác nhất tác nhân gây bệnh?',
      en: 'Which combination of tests allows the most accurate presumptive identification of the isolate?'
    },
    options: [
      {
        id: 'a',
        text: {
          vi: 'Nhạy cảm Optochin (≥14mm) và tan trong mật (Bile solubility +)',
          en: 'Optochin susceptible (≥14mm) and bile soluble'
        }
      },
      {
        id: 'b',
        text: {
          vi: 'Nhạy cảm Bacitracin (0.04 đơn vị) và thủy phân PYR dương tính (+)',
          en: 'Bacitracin (0.04 U) susceptible and PYR positive'
        }
      },
      {
        id: 'c',
        text: {
          vi: 'Thử nghiệm CAMP dương tính hình mũi tên và thủy phân Hippurate (+)',
          en: 'CAMP test positive (arrowhead) and Hippurate positive'
        }
      },
      {
        id: 'd',
        text: {
          vi: 'Mọc trong 6.5% NaCl và thủy phân Bile Esculin (+)',
          en: 'Growth in 6.5% NaCl and Bile Esculin positive'
        }
      }
    ],
    correctOptionId: 'b',
    explanation: {
      vi: 'Viêm họng mủ amidan ở trẻ 9 tuổi do liên cầu tan máu beta nhóm A (Streptococcus pyogenes - GAS). S. pyogenes có đặc điểm sinh hóa kinh điển: nhạy cảm với đĩa Bacitracin 0.04U và dương tính với thử nghiệm PYR (khác với liên cầu nhóm B, C, G thường kháng Bacitracin hoặc PYR âm tính). Yếu tố độc lực chủ yếu là Protein M (gen emm) và Streptolysin O.',
      en: 'Streptococcus pyogenes (Group A Strep) is the classic cause of pediatric pharyngitis. It is presumptively identified by susceptibility to bacitracin (0.04 U) and positive PYR hydrolysis. Its major virulence factor is the antiphagocytic M protein.'
    },
    clinicalTakeaway: {
      vi: 'Cần điều trị đầy đủ Penicillin cho viêm họng GAS để ngăn ngừa biến chứng thấp tim (Rheumatic fever) do phản ứng chéo kháng thể kháng Protein M với mô tim.',
      en: 'Adequate antimicrobial treatment of GAS pharyngitis prevents post-streptococcal acute rheumatic fever.'
    },
    relatedPathogenId: 's_pyogenes'
  },
  {
    chapterNumber: 16,
    id: 'case_ch16',
    chapterTitle: 'Aerobic Gram-Positive Bacilli (Chương 16: Trực khuẩn Gram dương hiếu khí)',
    type: 'case_in_point',
    caseScenario: {
      vi: 'Cụ bà 76 tuổi đang điều trị corticosteroid liều cao do u ác tính, nhập viện vì sốt và đau đầu tăng dần 7 ngày. Chọc dò tủy sống: 250 BC/mL, Glucose DNT 30 mg/dL (đường máu 105 mg/dL), Protein 180 mg/dL. Nhuộm Gram cặn dịch não tủy không thấy vi khuẩn. Cấy thạch máu SBA sau 48 giờ mọc khuẩn lạc nhỏ, tròn, tan máu beta nhẹ. Soi vi khuẩn: trực khuẩn Gram dương đa hình thái, không sinh bào tử. Sinh hóa: Catalase (+), Thủy phân Esculin (+), Thủy phân Hippurate (+), Di động nhào lộn (tumbling) ở nhiệt độ phòng (22-25°C) nhưng bất động ở 35°C, CAMP dương tính tạo hình khối vuông (block shape).',
      en: 'A 76-year-old woman on corticosteroid therapy for a malignant tumor presented with fever and worsening headache. CSF showed 250 WBC/mL, glucose 30 mg/dL, protein 180 mg/dL. SBA yielded small beta-hemolytic colonies: Gram-positive non-spore-forming coccobacilli, catalase+, esculin+, hippurate+, motile at 22°C (tumbling) but not at 35°C, block-shaped CAMP+.'
    },
    question: {
      vi: 'Chẩn đoán căn nguyên vi sinh nào là chính xác nhất?',
      en: 'What is the most accurate microbiologic identification of this isolate?'
    },
    options: [
      {
        id: 'a',
        text: {
          vi: 'Streptococcus agalactiae (GBS)',
          en: 'Streptococcus agalactiae (GBS)'
        }
      },
      {
        id: 'b',
        text: {
          vi: 'Listeria monocytogenes',
          en: 'Listeria monocytogenes'
        }
      },
      {
        id: 'c',
        text: {
          vi: 'Corynebacterium urealyticum',
          en: 'Corynebacterium urealyticum'
        }
      },
      {
        id: 'd',
        text: {
          vi: 'Erysipelothrix rhusiopathiae',
          en: 'Erysipelothrix rhusiopathiae'
        }
      }
    ],
    correctOptionId: 'b',
    explanation: {
      vi: 'Listeria monocytogenes là trực khuẩn Gram dương gây viêm màng não và nhiễm khuẩn huyết ở người già suy giảm miễn dịch, phụ nữ mang thai và trẻ sơ sinh. Dễ nhầm với liên cầu GBS do tan máu beta nhẹ và Hippurate (+), nhưng Listeria là trực khuẩn Gram dương, Catalase (+), Esculin (+), di động hình dù xòe / nhào lộn ở 22-25°C và cho thử nghiệm CAMP hình khối vuông (block) với S. aureus.',
      en: 'Listeria monocytogenes is a catalase-positive, esculin-positive Gram-positive rod exhibiting characteristic tumbling motility at 22-25°C and block-shaped CAMP reaction. It causes meningitis in elderly/immunocompromised hosts.'
    },
    clinicalTakeaway: {
      vi: 'Listeria kháng tự nhiên với tất cả Cephalosporin (kể cả thế hệ 3 như Ceftriaxone dùng điều trị viêm màng não thông thường). Phải phối hợp thêm Ampicillin vào phác đồ kinh nghiệm viêm màng não ở người già/suy giảm miễn dịch.',
      en: 'Listeria is intrinsically resistant to cephalosporins; ampicillin must be included in empiric meningitis regimens for neonates and elderly patients.'
    },
    relatedPathogenId: 'listeria_monocytogenes'
  },
  {
    chapterNumber: 17,
    id: 'case_ch17',
    chapterTitle: 'Neisseria & Moraxella (Chương 17: Song cầu khuẩn Gram âm)',
    type: 'case_in_point',
    caseScenario: {
      vi: 'Nữ sinh viên 18 tuổi, vận động viên thể dục dụng cụ, nhập viện vì sưng đau đỏ hai khớp cổ tay và khuỷu tay trái. Tiền sử có quan hệ tình dục không an toàn với nhiều bạn tình trong 4 tháng qua. Bệnh nhân không có tiết dịch âm đạo hay đau bụng, nhưng có ban xuất huyết nhỏ ở hai cẳng tay. Hút dịch khớp cổ tay: Bạch cầu đa nhân PMN nhiều, thấy rải rác song cầu Gram âm hình hạt cà phê nằm trong và ngoài tế bào bạch cầu. Sau 24h, cấy mọc nhiều khuẩn lạc nhỏ màu nâu nhạt trên thạch Chocolate (CHOC), nhưng hoàn toàn KHÔNG MỌC trên thạch máu cừu (SBA) và thạch MacConkey.',
      en: 'An 18-year-old female gymnast presented with migratory wrist and elbow arthritis and arm rash. Direct Gram stain of joint aspirate showed many PMNs with intracellular and extracellular Gram-negative diplococci. At 24h, growth occurred on CHOC agar but no growth on SBA or MacConkey.'
    },
    question: {
      vi: 'Vi khuẩn này có đặc điểm chuyển hóa carbohydrate (đường CTA) nào sau đây?',
      en: 'What carbohydrate utilization pattern (CTA sugars) defines this pathogen?'
    },
    options: [
      {
        id: 'a',
        text: {
          vi: 'Glucose (+), Maltose (-), Lactose (-), Sucrose (-)',
          en: 'Glucose (+), Maltose (-), Lactose (-), Sucrose (-)'
        }
      },
      {
        id: 'b',
        text: {
          vi: 'Glucose (+), Maltose (+), Lactose (-), Sucrose (-)',
          en: 'Glucose (+), Maltose (+), Lactose (-), Sucrose (-)'
        }
      },
      {
        id: 'c',
        text: {
          vi: 'Glucose (+), Maltose (+), Lactose (+), Sucrose (-)',
          en: 'Glucose (+), Maltose (+), Lactose (+), Sucrose (-)'
        }
      },
      {
        id: 'd',
        text: {
          vi: 'Asaccharolytic: Glucose (-), Maltose (-), DNase (+)',
          en: 'Asaccharolytic: Glucose (-), Maltose (-), DNase (+)'
        }
      }
    ],
    correctOptionId: 'a',
    explanation: {
      vi: 'Bệnh nhân bị viêm khớp nhiễm trùng lan tỏa do lậu cầu (Disseminated Gonococcal Infection - DGI do Neisseria gonorrhoeae). N. gonorrhoeae là vi khuẩn khó mọc, không mọc trên SBA thông thường, mọc trên CHOC và MTM, oxidase (+), phản ứng Superoxol (H2O2 30%) cực mạnh và chỉ lên men duy nhất đường Glucose (Maltose âm tính, phân biệt với N. meningitidis lên men cả Glucose và Maltose).',
      en: 'Neisseria gonorrhoeae causes disseminated gonococcal septic arthritis. It grows on CHOC/MTM but not on SBA, and utilizes glucose only (maltose negative, differentiating it from N. meningitidis).'
    },
    clinicalTakeaway: {
      vi: 'Khoảng 50% phụ nữ nhiễm lậu cầu đường sinh dục hoàn toàn không có triệu chứng tại chỗ, tạo ổ chứa vi khuẩn lây truyền và dẫn tới biến chứng nhiễm lậu lan tỏa (viêm khớp mủ) hoặc viêm tiểu khung vô sinh.',
      en: 'Up to 50% of females with genital gonorrhea are asymptomatic, predisposing to disseminated arthritis or pelvic inflammatory disease.'
    },
    relatedPathogenId: 'neisseria_gonorrhoeae'
  },
  {
    chapterNumber: 18,
    id: 'case_ch18_1',
    chapterTitle: 'Haemophilus & Fastidious GNB (Chương 18: Trực khuẩn Gram âm khó mọc)',
    type: 'case_in_point',
    caseScenario: {
      vi: 'Cụ bà 59 tuổi sau tai biến mạch máu não đang tạm trú tại viện dưỡng lão. Ngày thứ 3 sau vào viện, cụ sốt cao, đau đầu dữ dội, cổ gượng cứng rõ rệt. Dịch não tủy (CSF) đục, bạch cầu 420/mL (92% PMN), protein tăng cao, glucose giảm. Nhuộm Gram DNT: rất nhiều cầu trực khuẩn Gram âm nhỏ xíu (pleomorphic coccobacilli), một số có quầng sáng trong suốt (vỏ nang) bao quanh. Cấy DNT và máu sau 24h mọc dồi dào trên thạch Chocolate (CHOC) nhưng KHÔNG MỌC trên thạch máu cừu (SBA) và MacConkey.',
      en: 'A 59-year-old female in a nursing home developed fever, stiff neck, and headache. CSF showed 420 WBCs/mL (92% PMN), elevated protein, decreased glucose, and pleomorphic Gram-negative coccobacilli with clear halos. Heavy growth occurred on CHOC agar but no growth on SBA or MAC.'
    },
    question: {
      vi: 'Để xác định loài Haemophilus này, thử nghiệm nhu cầu yếu tố sinh trưởng X và V sẽ cho kết quả thế nào?',
      en: 'To identify this Haemophilus species, what are its requirements for growth factors X and V?'
    },
    options: [
      {
        id: 'a',
        text: {
          vi: 'Chỉ cần yếu tố V (V factor only), Porphyrin (+)',
          en: 'Requires V factor only, Porphyrin positive'
        }
      },
      {
        id: 'b',
        text: {
          vi: 'Cần cả yếu tố X và V (requires both X and V factors), Porphyrin (-)',
          en: 'Requires both X and V factors, Porphyrin negative'
        }
      },
      {
        id: 'c',
        text: {
          vi: 'Chỉ cần yếu tố X (X factor only), không cần V',
          en: 'Requires X factor only, no V factor'
        }
      },
      {
        id: 'd',
        text: {
          vi: 'Không cần cả X và V, mọc được trên môi trường dinh dưỡng thường',
          en: 'Requires neither X nor V factor'
        }
      }
    ],
    correctOptionId: 'b',
    explanation: {
      vi: 'Haemophilus influenzae đòi hỏi cả yếu tố X (hemin) và yếu tố V (NAD) để sinh trưởng trên thạch dinh dưỡng. Không mọc được trên đĩa thạch máu cừu (SBA) do enzyme NADase trong hồng cầu cừu phân hủy yếu tố V, nhưng mọc vệ tinh (satellitism) quanh khuẩn lạc S. aureus tiết yếu tố V. Thử nghiệm Porphyrin (ALA) âm tính vì vi khuẩn không tự tổng hợp được nhân heme.',
      en: 'Haemophilus influenzae requires both X factor (hemin) and V factor (NAD) for growth. It is porphyrin test negative because it cannot synthesize heme precursors.'
    },
    clinicalTakeaway: {
      vi: 'Từ khi có vacxin Hib (H. influenzae type b), các ca nhiễm trùng xâm lấn nặng ở người lớn và người già chủ yếu do các chủng không định type (Nontypable H. influenzae - NTHi).',
      en: 'Following universal Hib vaccination, most invasive adult H. influenzae infections are caused by nontypable strains (NTHi).'
    },
    relatedPathogenId: 'h_influenzae'
  },
  {
    chapterNumber: 18,
    id: 'case_ch18_2',
    chapterTitle: 'Legionella (Chương 18: Bệnh Legionnaires)',
    type: 'case_in_point',
    caseScenario: {
      vi: 'Đoàn 24 du khách cao tuổi hút thuốc lá tham gia chuyến du lịch du thuyền vùng biển Caribbean 2 tuần. Ngày thứ 5, nhiều người bắt đầu ho khan, sốt cao rét run, đau đầu và tiêu chảy phân lỏng. Sau đó 10 hành khách viêm phổi thùy lan tỏa nặng phải trực thăng chuyển vào bệnh viện đất liền cấp cứu. Khám: Rales nổ, lú lẫn, hạ natri máu. Đờm khạc nhuộm Gram thấy nhiều bạch cầu nhưng bắt màu vi khuẩn Gram âm cực kỳ mờ nhạt (faintly staining).',
      en: 'A group of elderly smokers on a 2-week cruise developed fever, nonproductive cough, headache, diarrhea, and patchy lobar pneumonia. Gram stain showed neutrophils but faint Gram-negative rods.'
    },
    question: {
      vi: 'Phương pháp cận lâm sàng nhanh, nhạy nhất để xác định sớm căn nguyên viêm phổi này là gì?',
      en: 'What is the fastest and most sensitive non-invasive test for early detection of this pneumonia agent?'
    },
    options: [
      {
        id: 'a',
        text: {
          vi: 'Cấy đờm lên thạch máu cừu thường quy',
          en: 'Routine sputum culture on sheep blood agar'
        }
      },
      {
        id: 'b',
        text: {
          vi: 'Thử nghiệm phát hiện kháng nguyên hòa tan trong nước tiểu (Urine Antigen Test serogroup 1)',
          en: 'Urine antigen detection test for L. pneumophila serogroup 1'
        }
      },
      {
        id: 'c',
        text: {
          vi: 'Tìm kháng thể ngưng kết lạnh trong huyết thanh',
          en: 'Cold agglutinin antibody titer'
        }
      },
      {
        id: 'd',
        text: {
          vi: 'Soi kính hiển vi nền đen tìm thể xoắn lò xo',
          en: 'Darkfield microscopy for spirochetes'
        }
      }
    ],
    correctOptionId: 'b',
    explanation: {
      vi: 'Bệnh nhân mắc bệnh Legionnaires do Legionella pneumophila serogroup 1 (chiếm 95% các ca bệnh viêm phổi liên quan du thuyền, khách sạn có hệ thống phun sương/nước nóng). Xét nghiệm tìm kháng nguyên hòa tan Legionella trong nước tiểu (BinaxNOW) có độ nhạy 97% và độ đặc hiệu ~100%, dương tính từ ngày thứ 3 của bệnh. Nuôi cấy bắt buộc phải dùng môi trường chuyên biệt BCYE có bổ sung L-cysteine.',
      en: 'Legionnaires’ disease is best rapidly diagnosed using the urine antigen test for L. pneumophila serogroup 1 (sensitivity ~97%, specificity ~100%). BCYE agar with L-cysteine is mandatory for culture.'
    },
    clinicalTakeaway: {
      vi: 'Legionella sống nội bào trong đại thực bào phế nang và amip tự do, kháng tự nhiên với beta-lactam. Thuốc điều trị lựa chọn là Macrolide (Azithromycin) hoặc Fluoroquinolone (Levofloxacin).',
      en: 'Legionella is an intracellular pathogen resistant to beta-lactams; macrolides or fluoroquinolones are the treatments of choice.'
    },
    relatedPathogenId: 'legionella_pneumophila'
  },
  {
    chapterNumber: 19,
    id: 'case_ch19',
    chapterTitle: 'Enterobacteriaceae (Chương 19: Vi khuẩn đường ruột)',
    type: 'case_in_point',
    caseScenario: {
      vi: 'Cụ ông 71 tuổi đái tháo đường nhập viện vì hôn mê nhiễm toan ceton (DKA). Sau khi ổn định đường huyết, cụ than đau hông lưng và tiểu buốt rát. Cấy nước tiểu sau 18h mọc vi khuẩn trực khuẩn Gram âm lên men lactose (khuẩn lạc hồng) trên thạch MacConkey. Thử nghiệm sinh hóa: Oxidase (-), H2S (-), bộ IMViC (+ + - +: Indole +, Methyl Red +, VP -, Citrate Simmons +), Urease (+), có enzyme Arginine dihydrolase và Ornithine decarboxylase, sử dụng malonate (+), vi khuẩn di động.',
      en: 'A 71-year-old diabetic man in DKA developed flank pain and dysuria. Urine culture yielded lactose-fermenting GNB on MAC: Oxidase-, H2S-, IMViC (++-+), Urease+, Arginine+, Ornithine+, Malonate+, and motile.'
    },
    question: {
      vi: 'Định danh vi khuẩn đường ruột gây nhiễm trùng tiết niệu này là gì?',
      en: 'What is the definitive identification of this enteric urinary pathogen?'
    },
    options: [
      {
        id: 'a',
        text: {
          vi: 'Escherichia coli (thường là Citrate âm tính)',
          en: 'Escherichia coli'
        }
      },
      {
        id: 'b',
        text: {
          vi: 'Citrobacter koseri (trước đây gọi là C. diversus)',
          en: 'Citrobacter koseri (formerly C. diversus)'
        }
      },
      {
        id: 'c',
        text: {
          vi: 'Klebsiella pneumoniae (bất động, Indole âm tính)',
          en: 'Klebsiella pneumoniae'
        }
      },
      {
        id: 'd',
        text: {
          vi: 'Proteus mirabilis (PAD dương tính, không lên men lactose)',
          en: 'Proteus mirabilis'
        }
      }
    ],
    correctOptionId: 'b',
    explanation: {
      vi: 'Citrobacter koseri (C. diversus) có bộ phản ứng IMViC đặc trưng: Indole (+), Methyl Red (+), VP (-), Citrate (+) (++-+), Urease (+), Malonate (+), ODC (+). Khác với C. freundii là C. freundii sinh H2S (+) và Indole (-). C. koseri là tác nhân nổi tiếng gây bùng phát viêm màng não mủ và áp-xe não ở trẻ sơ sinh, đồng thời gây nhiễm trùng niệu phức tạp ở người già đái tháo đường.',
      en: 'Citrobacter koseri is characterized by IMViC ++-+, urease+, malonate+, and H2S negative (unlike C. freundii which is H2S+ and indole-). C. koseri is documented to cause neonatal brain abscesses and adult UTIs.'
    },
    clinicalTakeaway: {
      vi: 'Phân biệt Citrobacter freundii và Salmonella trên đĩa phân: C. freundii sinh H2S có thể nhầm với Salmonella, nhưng C. freundii thủy phân Ure (+), Lysine (-); còn Salmonella Ure (-), Lysine (+).',
      en: 'Differentiating Citrobacter freundii from Salmonella: C. freundii is urease positive and lysine negative; Salmonella is urease negative and lysine positive.'
    },
    relatedPathogenId: 'citrobacter_freundii'
  },
  {
    chapterNumber: 20,
    id: 'case_ch20',
    chapterTitle: 'Vibrio & Halophilic Bacilli (Chương 20: Phẩy khuẩn)',
    type: 'case_in_point',
    caseScenario: {
      vi: 'Người đàn ông 65 tuổi có tiền sử xơ gan sau viêm gan B, nhập viện trong tình trạng sốc nhiễm khuẩn nặng, bàn tay trái sưng tấy đau dữ dội. Bệnh nhân kể 24 giờ trước khi đi chợ cá có bị gai vỏ tôm đâm vào ngón trỏ trái. Khám bàn tay sưng nề lan tỏa, xuất hiện nhiều bóng nước hoại tử màu tím đen (bullous lesions with gangrene). Cấy máu và dịch vết mổ mọc trực khuẩn Gram âm, oxidase (+), lên men lactose trên thạch MacConkey, mọc khuẩn lạc màu XANH LỤC trên thạch TCBS, và bắt buộc cần nồng độ muối 3-6% NaCl để sinh trưởng.',
      en: 'A 65-year-old man with cirrhosis pricked his finger selecting raw shrimp. Within 24h, marked swelling, bullous gangrenous lesions, and septic shock developed. Cultures grew an oxidase-positive GNB forming green colonies on TCBS and requiring 3-6% NaCl.'
    },
    question: {
      vi: 'Tác nhân phẩy khuẩn gây sốc nhiễm trùng nguy kịch này là gì?',
      en: 'What is the causative halophilic Vibrio species?'
    },
    options: [
      {
        id: 'a',
        text: {
          vi: 'Vibrio cholerae (khuẩn lạc vàng trên TCBS, mọc được trong 0% NaCl)',
          en: 'Vibrio cholerae'
        }
      },
      {
        id: 'b',
        text: {
          vi: 'Vibrio vulnificus (ưa mặn, không lên men sucrose trên TCBS, gây hoại tử da/sốc ở bệnh nhân xơ gan)',
          en: 'Vibrio vulnificus'
        }
      },
      {
        id: 'c',
        text: {
          vi: 'Aeromonas hydrophila (kháng O/129, mọc trong 0% NaCl)',
          en: 'Aeromonas hydrophila'
        }
      },
      {
        id: 'd',
        text: {
          vi: 'Plesiomonas shigelloides (lên men Inositol, mọc trong 0% NaCl)',
          en: 'Plesiomonas shigelloides'
        }
      }
    ],
    correctOptionId: 'b',
    explanation: {
      vi: 'Vibrio vulnificus là phẩy khuẩn ưa mặn (halophilic, cần 1-8% NaCl, không mọc trong 0% NaCl), không lên men sucrose trên TCBS tạo khuẩn lạc màu XANH LỤC. Bệnh nhân có bệnh gan mạn tính/ứ sắt có nguy cơ tử vong lên đến 50-60% khi vi khuẩn xâm nhập gây viêm cân mạc hoại tử và nhiễm khuẩn huyết tối cấp sau khi ăn hải sản sống hoặc vết thương tiếp xúc nước biển.',
      en: 'Vibrio vulnificus is a halophilic Vibrio forming green colonies on TCBS (sucrose negative). In patients with cirrhosis or iron overload, it causes fulminant septicemia with hemorrhagic bullae and 50% mortality.'
    },
    clinicalTakeaway: {
      vi: 'V. vulnificus là một cấp cứu nội ngoại khoa: Bắt đầu ngay kháng sinh phối hợp Ciprofloxacin + Ceftriaxone (hoặc Doxycycline + Cefotaxime) và rạch giải áp mô hoại tử khẩn cấp.',
      en: 'V. vulnificus wound infection requires urgent surgical debridement and dual therapy with ciprofloxacin and ceftriaxone.'
    },
    relatedPathogenId: 'vibrio_vulnificus'
  },
  {
    chapterNumber: 21,
    id: 'case_ch21',
    chapterTitle: 'Nonfermenters (Chương 21: Trực khuẩn không lên men)',
    type: 'case_in_point',
    caseScenario: {
      vi: 'Nữ bệnh nhân 25 tuổi ghép tủy điều trị suy tủy xương, sốt cao rét run ngày thứ 2. Cấy máu 2 bộ (4 chai) đều báo dương tính sau 12-16 giờ mọc trực khuẩn Gram âm. Phòng xét nghiệm thông báo vi khuẩn Oxidase (+), không lên men đường (TSI K/K, không sinh acid đáy ống). Trên thạch máu cừu mọc khuẩn lạc phẳng lan rộng, tan máu beta mạnh, ánh xà cừ kim loại (metallic sheen) và tỏa ra mùi thơm ngọt như mùi kẹo nho. Trên thạch Mueller-Hinton và MacConkey tiết sắc tố xanh lam khuếch tán vào môi trường (pyocyanin). Mọc mạnh ở 42°C.',
      en: 'A 25-year-old bone marrow transplant recipient had 4 positive blood culture bottles growing an oxidase-positive, nonfermenting GNB. On SBA, flat spreading beta-hemolytic colonies with metallic sheen and grape-like odor appeared. Blue-green pyocyanin pigment diffused on Mueller-Hinton and MAC. Grew at 42°C.'
    },
    question: {
      vi: 'Định danh vi khuẩn và cơ chế kháng thuốc tự nhiên cần lưu ý nhất?',
      en: 'Identify the organism and its characteristic antimicrobial resistance feature:'
    },
    options: [
      {
        id: 'a',
        text: {
          vi: 'Pseudomonas aeruginosa; kháng tự nhiên với Ampicillin, Cefazolin, Ceftriaxone, Ertapenem, Bactrim',
          en: 'Pseudomonas aeruginosa; intrinsically resistant to ampicillin, cefazolin, ceftriaxone, ertapenem, SXT'
        }
      },
      {
        id: 'b',
        text: {
          vi: 'Acinetobacter baumannii; bất động, oxidase âm tính',
          en: 'Acinetobacter baumannii; nonmotile, oxidase negative'
        }
      },
      {
        id: 'c',
        text: {
          vi: 'Stenotrophomonas maltophilia; kháng tự nhiên toàn bộ Carbapenem',
          en: 'Stenotrophomonas maltophilia; intrinsically resistant to all carbapenems'
        }
      },
      {
        id: 'd',
        text: {
          vi: 'Burkholderia cepacia; oxidase yếu, thạch OFPBL màu vàng',
          en: 'Burkholderia cepacia; weak oxidase, yellow on OFPBL'
        }
      }
    ],
    correctOptionId: 'a',
    explanation: {
      vi: 'Pseudomonas aeruginosa (Trực khuẩn mủ xanh) là trực khuẩn Gram âm không lên men phổ biến nhất, sản xuất sắc tố xanh pyocyanin độc nhất vô nhị kết hợp pyoverdin, có mùi hoa quả ngọt do 2-aminoacetophenone, mọc ở 42°C. P. aeruginosa kháng tự nhiên với hầu hết kháng sinh thông thường (Ampicillin, Cephalosporin thế hệ 1, 2, Ceftriaxone, Ertapenem, Bactrim). Cần dùng thuốc có hoạt tính chống trực khuẩn mủ xanh: Ceftazidime, Cefepime, Piperacillin-tazobactam, Meropenem, Amikacin.',
      en: 'Pseudomonas aeruginosa uniquely produces pyocyanin, emits 2-aminoacetophenone grape odor, and grows at 42°C. It is intrinsically resistant to ampicillin, 1st/2nd/3rd-gen cephalosporins (except ceftazidime), and ertapenem.'
    },
    clinicalTakeaway: {
      vi: 'Ở bệnh nhân giảm bạch cầu hạt sốt cao cấy máu mọc P. aeruginosa, phải điều trị kháng sinh diệt khuẩn liều tối đa kết hợp 2 nhóm thuốc nhạy cảm (Beta-lactam chống mủ xanh + Aminoglycoside) để giảm tỷ lệ tử vong.',
      en: 'In neutropenic patients with P. aeruginosa bacteremia, combination bactericidal therapy improves survival.'
    },
    relatedPathogenId: 'p_aeruginosa'
  },
  {
    chapterNumber: 22,
    id: 'case_ch22',
    chapterTitle: 'Anaerobic Bacteriology (Chương 22: Vi khuẩn kỵ khí)',
    type: 'case_in_point',
    caseScenario: {
      vi: 'Bác nông dân 45 tuổi bị máy cày chèn dập nát cẳng chân trái dính nhiều đất cát. Sau 24h, cẳng chân sưng phù tím tái dữ dội, đau nhức vượt mức, sờ thấy tiếng lạo xạo hơi dưới da (crepitus). X-quang thấy các bóng khí len lỏi trong bó cơ. Bạch cầu máu 33,000/mL (tăng vọt bạch cầu đoạn trung tính). Nhuộm Gram mủ vết thương: Trực khuẩn Gram dương lớn, hình chữ nhật đầu vuông (boxcar-shaped), không thấy bào tử trên phết trực tiếp, rất ít bạch cầu (do bị độc tố ly giải). Cấy kỵ khí sau 24h trên thạch máu mọc khuẩn lạc có tan máu beta 2 vòng kép (double zone of hemolysis).',
      en: 'A 45-year-old farmer suffered a traumatic soil-contaminated leg injury. Pain, gas pockets (crepitus), and edema developed. Gram stain showed large rectangular boxcar Gram-positive bacilli with no spores and few WBCs. Anaerobic blood agar yielded colonies with a double zone of beta-hemolysis.'
    },
    question: {
      vi: 'Thử nghiệm nào trên thạch lòng đỏ trứng (Egg Yolk Agar - EYA) xác nhận độc lực chính của vi khuẩn này?',
      en: 'Which reaction on Egg Yolk Agar (EYA) confirms the principal virulence factor of this organism?'
    },
    options: [
      {
        id: 'a',
        text: {
          vi: 'Lipase dương tính (váng óng ánh nhiều màu như dầu xăng trên mặt khuẩn lạc)',
          en: 'Lipase positive (iridescent sheen on colony surface)'
        }
      },
      {
        id: 'b',
        text: {
          vi: 'Lecithinase dương tính (quầng đục trắng ngấm sâu trong lòng thạch bao quanh khuẩn lạc do alpha-toxin)',
          en: 'Lecithinase positive (opaque white zone within the agar around colony due to alpha-toxin)'
        }
      },
      {
        id: 'c',
        text: {
          vi: 'Urease dương tính nhanh trong 15 phút',
          en: 'Rapid urease positive in 15 minutes'
        }
      },
      {
        id: 'd',
        text: {
          vi: 'Nhạy cảm với đĩa Sodium Polyanethol Sulfonate (SPS)',
          en: 'Susceptible to SPS disk'
        }
      }
    ],
    correctOptionId: 'b',
    explanation: {
      vi: 'Bệnh hoại thư sinh hơi (Gas gangrene / Myonecrosis) do Clostridium perfringens. Vi khuẩn có hình dạng trực khuẩn Gram dương to hình toa tàu (boxcar), tan máu beta 2 vòng kép (vòng trong do theta-toxin hoàn toàn, vòng ngoài do alpha-toxin bán phần). Trên thạch EYA, alpha-toxin (lecithinase / phospholipase C) thủy phân lecithin tạo quầng trắng đục không tan trong thạch. Phản ứng CAMP ngược (reverse CAMP) dương tính.',
      en: 'Clostridium perfringens causes gas gangrene. It forms large boxcar GPB, double-zone hemolysis on SBA, and is lecithinase positive on egg yolk agar (EYA) due to alpha-toxin (phospholipase C).'
    },
    clinicalTakeaway: {
      vi: 'Hoại thư sinh hơi là cấp cứu phẫu thuật tối khẩn: Cần phẫu thuật cắt lọc triệt để mở rộng loại bỏ mô hoại tử giải phóng bọng khí, kết hợp kháng sinh liều cao (Penicillin G + Clindamycin để ức chế tổng hợp độc tố).',
      en: 'Gas gangrene mandates immediate aggressive surgical debridement combined with high-dose penicillin and clindamycin (antitoxin effect).'
    },
    relatedPathogenId: 'clostridium_perfringens'
  },
  {
    chapterNumber: 23,
    id: 'case_ch23',
    chapterTitle: 'The Spirochetes (Chương 23: Xoắn khuẩn)',
    type: 'case_in_point',
    caseScenario: {
      vi: 'Nam vận động viên 29 tuổi sau khi tham gia giải đua thể thao mạo hiểm Eco-Challenge tại rừng nhiệt đới đảo Borneo (Malaysia) trở về 2 ngày thì sốt cao, rét run, đau cơ dữ dội (đặc biệt cơ bắp chân), đau đầu dữ dội, mắt đỏ ngầu (kết mạc sung huyết không rỉ mủ). Trong giải đấu anh bị nhiều vết trầy xước và từng bị lật thuyền kayak nuốt phải nhiều ngụm nước sông Segama. Hai người đồng đội cùng đoàn có uống Doxycycline dự phòng sốt rét trước và trong suốt giải đấu thì hoàn toàn khỏe mạnh không mắc bệnh.',
      en: 'A 29-year-old Eco-Challenge athlete returned from Borneo with fever, rigors, severe myalgia (calves), headache, and bilateral conjunctival suffusion. He had abrasions and swallowed river water after capsizing. Two teammates who took doxycycline prophylaxis did not become ill.'
    },
    question: {
      vi: 'Căn nguyên xoắn khuẩn nào giải thích bệnh cảnh này và hình thái vi thể đặc trưng của nó?',
      en: 'What is the spirochetal agent and its characteristic microscopic morphology?'
    },
    options: [
      {
        id: 'a',
        text: {
          vi: 'Treponema pallidum; xoắn ốc đều đặn 4-14 vòng',
          en: 'Treponema pallidum; regular spirals with 4-14 coils'
        }
      },
      {
        id: 'b',
        text: {
          vi: 'Borrelia recurrentis; xoắn lỏng 3-10 vòng, bắt màu Giemsa trên phết máu',
          en: 'Borrelia recurrentis; loose waves, visible on blood Giemsa'
        }
      },
      {
        id: 'c',
        text: {
          vi: 'Leptospira interrogans; xoắn cực kỳ dày khít với hai đầu uốn cong hình móc câu',
          en: 'Leptospira interrogans; tightly coiled with hooked ends'
        }
      },
      {
        id: 'd',
        text: {
          vi: 'Spirillum minus; trực khuẩn xoắn ngắn có tiên mao',
          en: 'Spirillum minus'
        }
      }
    ],
    correctOptionId: 'c',
    explanation: {
      vi: 'Bệnh nhân mắc bệnh Leptospirosis do Leptospira interrogans. Vi khuẩn đào thải qua nước tiểu động vật (chuột, thú rừng) vào nguồn nước sông suối, xâm nhập qua da trầy xước hoặc niêm mạc miệng. Triệu chứng kinh điển: sốt đột ngột, đau cơ bắp chân dữ dội, sung huyết kết mạc mắt (conjunctival suffusion). Hình thái vi thể: xoắn khuẩn cực mảnh, cuộn sát nhau như chuỗi hạt và hai đầu cong gập hình móc câu. Doxycycline có hiệu quả phòng ngừa và điều trị sớm.',
      en: 'Leptospirosis is caused by Leptospira interrogans, shed in animal urine into water. Hallmarks include abrupt fever, severe calf myalgia, and conjunctival suffusion. Microscopically it shows tight coils and hooked ends.'
    },
    clinicalTakeaway: {
      vi: 'Uống Doxycycline 200mg mỗi tuần là biện pháp dự phòng hiệu quả cho người có nguy cơ phơi nhiễm cao (bơi lội nước lũ, tập trận dã ngoại, thám hiểm rừng rậm).',
      en: 'Weekly doxycycline prophylaxis effectively protects against leptospirosis in high-risk occupational and recreational exposures.'
    },
    relatedPathogenId: 'leptospira_interrogans'
  },
  {
    chapterNumber: 24,
    id: 'case_ch24',
    chapterTitle: 'Chlamydia & Rickettsia (Chương 24: Ký sinh nội bào)',
    type: 'case_in_point',
    caseScenario: {
      vi: 'Bé gái 7 ngày tuổi được bà ngoại đưa đến cấp cứu vì sốt 39°C, bỏ bú, quấy khóc nhiều và mắt phải chảy mủ vàng liên tục. Mẹ bé là thiếu nữ 17 tuổi nghiện ma túy không khám thai định kỳ, sinh thường tại bãi đậu xe bệnh viện. Cấy vi khuẩn thường quy âm tính (bệnh nhi đã được nhỏ bạc nitrat lúc sinh). Tuy nhiên, xét nghiệm khuếch đại acid nucleic (NAAT) từ dịch phết kết mạc dương tính xác định tác nhân.',
      en: 'A 7-day-old newborn of an untreated teenage drug abuser presented with fever, irritability, and profuse yellow right eye discharge. Routine bacterial cultures were negative; NAAT was diagnostic.'
    },
    question: {
      vi: 'Bệnh nhi có nguy cơ cao nhất phát triển biến chứng hô hấp nào sau 2-6 tuần tuổi do cùng tác nhân này?',
      en: 'What respiratory complication is this infant at highest risk of developing at 2-6 weeks of age?'
    },
    options: [
      {
        id: 'a',
        text: {
          vi: 'Viêm phổi thùy hoại tử do S. pneumoniae',
          en: 'Necrotizing lobar pneumonia'
        }
      },
      {
        id: 'b',
        text: {
          vi: 'Viêm phổi không sốt ho ngắt quãng (afebrile pneumonia with staccato cough) do C. trachomatis',
          en: 'Afebrile infantile pneumonia with staccato cough caused by C. trachomatis'
        }
      },
      {
        id: 'c',
        text: {
          vi: 'Hội chứng viêm nắp thanh quản cấp do Hib',
          en: 'Acute epiglottitis'
        }
      },
      {
        id: 'd',
        text: {
          vi: 'Viêm tiểu phế quản do RSV',
          en: 'Bronchiolitis'
        }
      }
    ],
    correctOptionId: 'b',
    explanation: {
      vi: 'Chlamydia trachomatis (serovar D-K) lây từ đường sinh dục mẹ sang con trong cuộc đẻ, gây viêm kết mạc thể vùi sơ sinh (khởi phát 4-14 ngày tuổi) và sau đó từ 20-25% trẻ sẽ phát triển viêm phổi sơ sinh đặc trưng: ho từng cơn ngắt quãng (staccato cough), thở nhanh, không sốt, tăng bạch cầu ái toan máu. Thuốc nhỏ mắt bạc nitrat hay erythromycin lúc sinh chỉ ngừa được lậu mắt chứ không ngừa được viêm phổi do Chlamydia.',
      en: 'Neonatal inclusion conjunctivitis and subsequent afebrile interstitial pneumonia (staccato cough, tachypnea) are caused by Chlamydia trachomatis serovars D-K acquired during birth.'
    },
    clinicalTakeaway: {
      vi: 'Điều trị viêm kết mạc hoặc viêm phổi sơ sinh do C. trachomatis bắt buộc phải dùng kháng sinh đường toàn thân (Erythromycin hoặc Azithromycin uống trong 14 ngày) để diệt mầm bệnh ở đường thở.',
      en: 'Oral systemic erythromycin or azithromycin is required to treat neonatal chlamydial conjunctivitis and eradicate nasopharyngeal carriage.'
    },
    relatedPathogenId: 'chlamydia_trachomatis'
  },
  {
    chapterNumber: 25,
    id: 'case_ch25',
    chapterTitle: 'Mycoplasma & Ureaplasma (Chương 25: Vi khuẩn thiếu vách tế bào)',
    type: 'case_in_point',
    caseScenario: {
      vi: 'Bé trai sinh cực non tại khoa Hồi sức sơ sinh (NICU) có cân nặng lúc sinh chỉ 1.5 lb (khoảng 680 gram). Sau sinh vài ngày, bé có dấu hiệu suy hô hấp, hạ thân nhiệt và nghi ngờ viêm màng não. Chọc dò dịch não tủy (CSF): Bạch cầu không tăng rõ, nhuộm Gram trực tiếp báo cáo "Không thấy vi sinh vật", nuôi cấy vi khuẩn hiếu khí và kỵ khí thông thường sau 3 ngày đều báo "Không mọc". Tuy nhiên bé vẫn tiếp tục thở máy và co giật nhẹ. Bác sĩ truyền nhiễm hội chẩn phòng vi sinh cấy tìm vi khuẩn thuộc lớp Mollicutes.',
      en: 'A premature neonate (1.5 lb) in NICU developed meningitis signs. CSF Gram stain and routine cultures at 3 days showed no growth. Mollicutes specialized cultures were initiated.'
    },
    question: {
      vi: 'Vi khuẩn phân lập được làm kiềm hóa (chuyển đỏ) môi trường canh thang Shepard 10B sau 24h và tạo khuẩn lạc nhỏ có tủa mangan dioxide trên thạch U9B là:',
      en: 'The organism produced an alkaline shift in Shepard 10B broth in 24h and tiny colonies with brown manganese dioxide on U9B agar. Identify:'
    },
    options: [
      {
        id: 'a',
        text: {
          vi: 'Mycoplasma pneumoniae',
          en: 'Mycoplasma pneumoniae'
        }
      },
      {
        id: 'b',
        text: {
          vi: 'Mycoplasma hominis (thủy phân Arginine sau 48-72h)',
          en: 'Mycoplasma hominis'
        }
      },
      {
        id: 'c',
        text: {
          vi: 'Ureaplasma urealyticum (thủy phân Ure nhanh <24h)',
          en: 'Ureaplasma urealyticum'
        }
      },
      {
        id: 'd',
        text: {
          vi: 'Listeria monocytogenes',
          en: 'Listeria monocytogenes'
        }
      }
    ],
    correctOptionId: 'c',
    explanation: {
      vi: 'Ureaplasma urealyticum (trước đây gọi là T-strain mycoplasma) và Mycoplasma hominis là căn nguyên quan trọng gây viêm màng não vô khuẩn, nhiễm khuẩn huyết và bệnh phổi mạn tính ở trẻ sinh non cực nhẹ cân. U. urealyticum đặc trưng bởi khả năng thủy phân Ure nhanh trong môi trường lỏng 10B (pH 6.0) tạo phản ứng kiềm hóa và tạo khuẩn lạc tí hon màu nâu trên thạch U9B chứa mangan.',
      en: 'Ureaplasma urealyticum hydrolyzes urea rapidly, causing an alkaline shift in 10B broth within 24h and dark brown manganese precipitate on U9B agar. It causes CNS and lung disease in preterm infants.'
    },
    clinicalTakeaway: {
      vi: 'Vì Mollicutes không có vách tế bào peptidoglycan, thuốc kháng sinh nhóm Penicillin, Ampicillin, Cephalosporin và Vancomycin hoàn toàn mất tác dụng. Ureaplasma nhạy cảm với Erythromycin.',
      en: 'Because Mollicutes lack a peptidoglycan cell wall, all beta-lactams and vancomycin are ineffective.'
    },
    relatedPathogenId: 'ureaplasma_urealyticum'
  },
  {
    chapterNumber: 26,
    id: 'case_ch26',
    chapterTitle: 'Mycobacterium tuberculosis & NTM (Chương 26: Trực khuẩn lao)',
    type: 'case_in_point',
    caseScenario: {
      vi: 'Người đàn ông 56 tuổi nhập viện vì mệt mỏi sút 4.5 kg trong 12 tháng, ho khạc đờm lẫn máu tái diễn 3 tháng, sốt nhẹ về chiều và đổ mồ hôi đêm. Tiền sử gia đình có người mắc lao phổi. Test lẩy da tuberculin (PPD Mantoux) đọc sau 48h có cục chai cứng đường kính 10x7 mm (dương tính). X-quang ngực và CT ngực: Đám mờ thâm nhiễm nốt rải rác tạo hang ở thùy trên phổi phải. Ba mẫu đờm buổi sáng làm phết nhuộm AFB trực tiếp âm tính. Tuy nhiên sau 12-14 ngày, chai cấy lỏng BACTEC báo dương tính; nhuộm Kinyoun thấy trực khuẩn kháng toan xếp thành dải bện xoắn (cording factor).',
      en: 'A 56-year-old man presented with weight loss, fever, night sweats, and hemoptysis. Chest CT showed right upper lobe cavitary lesions. PPD skin test was positive (10x7 mm). Smears were negative, but BACTEC broth turned positive at 12-14 days showing acid-fast cording bacilli.'
    },
    question: {
      vi: 'Bộ phản ứng sinh hóa nào sau đây khẳng định chắc chắn Mycobacterium tuberculosis (phân biệt với M. bovis và NTM)?',
      en: 'Which biochemical profile confirms Mycobacterium tuberculosis and differentiates it from M. bovis and NTM?'
    },
    options: [
      {
        id: 'a',
        text: {
          vi: 'Niacin (+), Khử Nitrate (+), Catalase ở 68°C (-)',
          en: 'Niacin accumulation positive, Nitrate reduction positive, 68°C heat-stable catalase negative'
        }
      },
      {
        id: 'b',
        text: {
          vi: 'Niacin (-), Khử Nitrate (-), Nhạy cảm với T2H',
          en: 'Niacin negative, Nitrate negative, Susceptible to T2H'
        }
      },
      {
        id: 'c',
        text: {
          vi: 'Arylsulfatase 3 ngày (+), mọc nhanh trong 3 ngày',
          en: '3-day Arylsulfatase positive, rapid growth'
        }
      },
      {
        id: 'd',
        text: {
          vi: 'Khử Tellurite đen sau 3 ngày, Catalase ở 68°C (+)',
          en: 'Tellurite reduction positive, 68°C catalase positive'
        }
      }
    ],
    correctOptionId: 'a',
    explanation: {
      vi: 'Mycobacterium tuberculosis đặc trưng bởi khả năng tích tụ Niacin (+), khử Nitrate thành Nitrite (+), Catalase bị bất hoạt ở 68°C (-) và tạo yếu tố xoắn dải thừng (cord factor). Ngược lại, M. bovis Niacin (-), Nitrate (-) và bị ức chế bởi T2H. Vi khuẩn lao nhạy cảm được điều trị chuẩn bằng phác đồ 4 thuốc kết hợp (RHEZ: Rifampin, Isoniazid, Pyrazinamide, Ethambutol).',
      en: 'M. tuberculosis is characterized by niacin accumulation, strong nitrate reduction, negative heat-stable (68°C) catalase, and cord factor. M. bovis is niacin and nitrate negative, and inhibited by T2H.'
    },
    clinicalTakeaway: {
      vi: 'Lao đa kháng (MDR-TB) được định nghĩa là kháng đồng thời tối thiểu hai thuốc chống lao hàng đầu là Isoniazid và Rifampin. Lao siêu kháng (XDR-TB) là MDR-TB kháng thêm ít nhất một thuốc Fluoroquinolone và một thuốc tiêm hàng hai (Amikacin, Kanamycin hoặc Capreomycin).',
      en: 'MDR-TB is resistant to at least isoniazid and rifampin. XDR-TB is MDR-TB plus resistance to any fluoroquinolone and at least one second-line injectable agent.'
    },
    relatedPathogenId: 'm_tuberculosis'
  }
];

export const CLINICAL_CASES: ClinicalCaseQuiz[] = [...BASE_CLINICAL_CASES, ...CLINICAL_CASES_PART2];

