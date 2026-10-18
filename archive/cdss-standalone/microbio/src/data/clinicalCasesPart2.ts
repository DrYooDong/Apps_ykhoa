import { ClinicalCaseQuiz } from '../types';

export const CLINICAL_CASES_PART2: ClinicalCaseQuiz[] = [
  // CHAPTER 27: Fusarium Fungemia in Bone Marrow Transplant
  {
    id: 'case_ch27',
    chapterNumber: 27,
    chapterTitle: 'Chương 27: Vi nấm y học (Medically Significant Fungi)',
    type: 'case_in_point',
    relatedPathogenId: 'fusarium_solani',
    caseScenario: {
      vi: 'Bệnh nhân nữ 32 tuổi, ngày thứ 12 sau ghép tủy xương điều trị bệnh bạch cầu, xuất hiện sốt cao 39.2°C. Bệnh nhân đã được điều trị kháng sinh phổ rộng liều tối ưu nhưng sốt không hạ. Đến ngày thứ 17, bệnh nhân xuất hiện các tổn thương dạng sẩn hoại tử rải rác toàn thân và chi dưới. Sinh thiết tổn thương da cho thấy các cấu trúc sợi nấm phân nhánh. Cùng ngày hôm đó, sau 4 ngày ủ, bình cấy máu báo động dương tính và trên đĩa cấy ban đầu mọc các khuẩn lạc nhầy trơn nhẵn giống nấm men. Mặc dù đã được khẩn cấp điều trị thuốc kháng nấm, bệnh nhân diễn tiến suy đa tạng và tử vong vào ngày thứ 22.',
      en: 'A 32-year-old woman developed fever 12 days after bone marrow transplantation. Broad-spectrum antimicrobial therapy was initiated, but fever persisted. On day 17, she developed necrotic skin lesions across her body and lower extremities; skin biopsy revealed hyphal elements. That same day, after 4 days of incubation, blood cultures flagged positive with a yeastlike colony. Despite antifungal therapy, the patient died on day 22.'
    },
    question: {
      vi: 'Căn nguyên vi nấm nào phù hợp nhất với bệnh cảnh cấy máu dương tính với khuẩn lạc thoạt nhìn giống nấm men nhưng sinh thiết mô thấy sợi nấm, thường gây tử vong gần 100% ở bệnh nhân ghép tủy?',
      en: 'Which fungal pathogen is most consistent with positive blood cultures yielding colonies that initially look yeastlike, with hyphae in tissue, causing near 100% mortality in bone marrow transplant recipients?'
    },
    options: [
      {
        id: 'a',
        text: {
          vi: 'Aspergillus fumigatus (Nấm mốc khói)',
          en: 'Aspergillus fumigatus'
        }
      },
      {
        id: 'b',
        text: {
          vi: 'Fusarium spp. (Nấm sợi hình thuyền/chuối gây nhiễm nấm huyết)',
          en: 'Fusarium spp. (Canoe-shaped macroconidia causing fungemia)'
        }
      },
      {
        id: 'c',
        text: {
          vi: 'Cryptococcus neoformans (Nấm men có vỏ nhầy)',
          en: 'Cryptococcus neoformans'
        }
      },
      {
        id: 'd',
        text: {
          vi: 'Rhizopus oryzae (Nấm Mucorales)',
          en: 'Rhizopus oryzae'
        }
      }
    ],
    correctOptionId: 'b',
    explanation: {
      vi: 'Khác với hầu hết các loài nấm mốc khác (như Aspergillus hay Mucorales vốn hầu như không bao giờ mọc trong chai cấy máu chuẩn), Fusarium spp. có khả năng phát triển dồi dào trong hệ thống cấy máu tự động. Khi mới mọc, khuẩn lạc có thể ướt nhầy trông giống nấm men, nhưng sau đó nhanh chóng mọc sợi tơ xù xì và sinh bào tử đính lớn (macroconidia) đa bào hình lưỡi liềm/quả chuối.',
      en: 'Unlike most filamentous molds such as Aspergillus or Mucorales that rarely grow in standard blood culture bottles, Fusarium spp. readily grow in automated blood culture systems. Initial colonies may appear moist and yeastlike, but rapidly develop aerial mycelium and multicellular banana-shaped macroconidia.'
    },
    clinicalTakeaway: {
      vi: 'Fusarium là nấm mốc sợi có đặc tính hiếm hoi là mọc được trong bình cấy máu. Khuẩn lạc cấy phân lập ban đầu giống nấm men nhưng sẽ nhanh chóng phát triển sợi khí sinh và sinh macroconidia đa bào hình quả chuối/thuyền.',
      en: 'Fusarium is one of the few filamentous molds that readily grows in routine blood cultures. Initial colonies may appear yeastlike before developing woolly hyphae and multicelled banana-shaped macroconidia.'
    }
  },

  // CHAPTER 28: Diagnostic Parasitology - Hookworm
  {
    id: 'case_ch28',
    chapterNumber: 28,
    chapterTitle: 'Chương 28: Ký sinh trùng học chẩn đoán (Diagnostic Parasitology)',
    type: 'case_in_point',
    relatedPathogenId: 'necator_americanus',
    caseScenario: {
      vi: 'Bé trai 4 tuổi sống tại vùng nông thôn bang Georgia được đưa đến trạm y tế vì tiêu chảy từng đợt kéo dài gần 4 tuần, phân không có máu tươi. Trẻ xanh xao, lờ đờ, bụng ỏng chướng to. Khám bàn chân thấy có các nốt phỏng nước nhỏ ban đỏ (ground itch). Mẹ bé kể rằng bé thỉnh thoảng ăn đất (pica) và ăn rất khỏe. Gia đình dùng nước giếng khoan chưa qua xử lý. Công thức máu: WBC 10.2 × 10^3/µL với bạch cầu ái toan 14%; Hemoglobin hạ nặng còn 6.2 g/dL; hồng cầu nhỏ nhược sắc; hồng cầu lưới tăng 8%. Cấy phân tìm vi khuẩn đường ruột âm tính. Xét nghiệm soi phân tìm ký sinh trùng (O&P) thấy tinh thể Charcot-Leyden và trứng giun hình bầu dục vỏ mỏng không màu chứa phôi giai đoạn 4-8 tế bào.',
      en: 'A 4-year-old boy in rural Georgia presented with intermittent diarrhea for 4 weeks with no bright red blood. The child was pale, listless, with a protuberant abdomen and erythematous vesicles on his feet (ground itch). His mother noted he ate dirt (pica) and had a voracious appetite. Well water was used. CBC: WBC 10.2 × 10^3/µL with 14% eosinophils; Hemoglobin 6.2 g/dL (microcytic hypochromic); reticulocyte count 8%. Stool bacterial culture was negative. Stool O&P revealed Charcot-Leyden crystals and thin-shelled, colorless oval eggs containing embryos in 4-8 cell cleavage.'
    },
    question: {
      vi: 'Dựa trên tổn thương da sẩn ngứa ở chân, thiếu máu thiếu sắt vi thể, bạch cầu ái toan 14% và hình ảnh trứng phân, ký sinh trùng nào là căn nguyên gây bệnh?',
      en: 'Based on foot vesicular lesions (ground itch), severe microcytic hypochromic anemia, 14% eosinophilia, and characteristic stool eggs, what is the causative parasite?'
    },
    options: [
      {
        id: 'a',
        text: {
          vi: 'Ascaris lumbricoides (Giun đũa)',
          en: 'Ascaris lumbricoides'
        }
      },
      {
        id: 'b',
        text: {
          vi: 'Giun móc (Necator americanus / Ancylostoma duodenale)',
          en: 'Hookworm (Necator americanus / Ancylostoma duodenale)'
        }
      },
      {
        id: 'c',
        text: {
          vi: 'Enterobius vermicularis (Giun kim)',
          en: 'Enterobius vermicularis'
        }
      },
      {
        id: 'd',
        text: {
          vi: 'Trichuris trichiura (Giun tóc)',
          en: 'Trichuris trichiura'
        }
      }
    ],
    correctOptionId: 'b',
    explanation: {
      vi: 'Ấu trùng filariform của giun móc từ đất ẩm chui qua da bàn chân trần gây sẩn ngứa phỏng nước ("ground itch"), di chuyển theo tuần hoàn qua phổi rồi định vị ở tá tràng và hỗng tràng. Giun bám vào niêm mạc bằng bao miệng có móc/răng cắt và hút máu liên tục (0.03 - 0.2 mL/con/ngày), dẫn đến thiếu máu nhược sắc trầm trọng, hạ sắt, bụng ỏng và chứng thèm ăn dị vật (pica). Trứng trong phân đặc trưng với vỏ mỏng, trong suốt, chứa phôi 4-8 tế bào.',
      en: 'Hookworm filariform larvae penetrate bare foot skin causing "ground itch", migrate through lungs, and mature in the small intestine. Adult worms latch onto the mucosa with cutting plates or teeth, causing chronic occult blood loss (0.03-0.2 mL/worm/day) leading to profound hypochromic microcytic anemia, pica, and protuberant abdomen. Eggs are oval, thin-shelled, and contain 4-8 blastomeres.'
    },
    clinicalTakeaway: {
      vi: 'Giun móc xâm nhập qua da chân gây nốt phỏng "ground itch" và hút máu tá tràng gây thiếu máu nhược sắc trầm trọng ở trẻ em; trứng trong phân có vỏ mỏng không màu chứa 4-8 tế bào phân chia.',
      en: 'Hookworm filariform larvae penetrate skin (ground itch) and suck intestinal blood causing severe microcytic hypochromic anemia; eggs are thin-shelled, colorless, and in the 4-8 cell cleavage stage.'
    }
  },

  // CHAPTER 29: Clinical Virology - HIV & Opportunistic Infections
  {
    id: 'case_ch29',
    chapterNumber: 29,
    chapterTitle: 'Chương 29: Virus học lâm sàng (Clinical Virology)',
    type: 'case_in_point',
    relatedPathogenId: 'human_immunodeficiency_virus',
    caseScenario: {
      vi: 'Nam bệnh nhân 36 tuổi có tiền sử nhiễm HIV 2 năm, nghiện ma túy tiêm tĩnh mạch, tiêu chảy mạn 1.5 năm và sụt 25 lb cân nặng, vào viện vì tê bì và yếu chân phải tiến triển 7 tháng nay, 3 ngày qua xuất hiện bí tiểu hoàn toàn và đại tiện không tự chủ. Khám lâm sàng: giảm cơ lực hai chi dưới, giảm phản xạ gân xương, có mảng sẩn Kaposi ở cẳng chân, nấm miệng (thrush) và các vết loét mụn nước herpes quanh hậu môn. Chụp MRI loại trừ chèn ép tủy sống. Chọc dò dịch não tủy (DNT): tăng bạch cầu lympho, protein tăng, glucose bình thường đến giảm nhẹ; cấy vi khuẩn thông thường âm tính. Bệnh nhân được điều trị Acyclovir tĩnh mạch.',
      en: 'A 36-year-old man with 2-year history of HIV and IV drug use presented with 7-month numbness and weakness in right leg, 25-lb weight loss, urinary retention for 3 days, and fecal incontinence. Exam: bilateral lower extremity weakness, slowed reflexes, Kaposi sarcoma lesions on legs, oral thrush, and perianal vesicular herpes lesions. MRI ruled out cord compression. CSF: lymphocytic pleocytosis, elevated protein; bacterial cultures negative. Patient was administered IV acyclovir.'
    },
    question: {
      vi: 'Cơ chế tác dụng của thuốc kháng virus Acyclovir được dùng trong điều trị bệnh lý viêm rễ thần kinh tủy / viêm màng não do HSV/VZV ở bệnh nhân này là gì?',
      en: 'What is the mechanism of action of the antiviral acyclovir administered for presumed HSV/VZV radiculopathy/meningitis in this patient?'
    },
    options: [
      {
        id: 'a',
        text: {
          vi: 'Ức chế men phiên mã ngược Reverse Transcriptase của retrovirus',
          en: 'Inhibition of retroviral reverse transcriptase'
        }
      },
      {
        id: 'b',
        text: {
          vi: 'Được phosphoryl hóa bởi Thymidine Kinase của virus thành dạng có hoạt tính, gây kết thúc sớm chuỗi DNA khi sao chép',
          en: 'Monophosphorylated by viral thymidine kinase into active triphosphate form, causing premature DNA chain termination'
        }
      },
      {
        id: 'c',
        text: {
          vi: 'Ức chế enzym Neuraminidase ngăn cản virus giải phóng khỏi tế bào',
          en: 'Inhibition of neuraminidase preventing viral progeny release'
        }
      },
      {
        id: 'd',
        text: {
          vi: 'Ức chế tháo vỏ protein M2 của virus cúm',
          en: 'Inhibition of viral M2 protein uncoating'
        }
      }
    ],
    correctOptionId: 'b',
    explanation: {
      vi: 'Acyclovir là tiền chất tương tự guanosine. Thuốc cần enzym Thymidine Kinase đặc hiệu của virus herpes (HSV hoặc VZV) để gắn gốc phosphate đầu tiên tạo acyclovir monophosphate (tế bào lành không có enzym này nên thuốc rất an toàn). Sau đó enzym tế bào chủ chuyển thành acyclovir triphosphate, cạnh tranh với deoxyguanosine triphosphate và chèn vào chuỗi DNA đang kéo dài của virus, làm ngừng tổng hợp chuỗi do thiếu nhóm 3-OH.',
      en: 'Acyclovir is a guanosine analogue prodrug requiring initial phosphorylation by herpesvirus-encoded thymidine kinase. Host cellular enzymes subsequently convert it to acyclovir triphosphate, which inhibits viral DNA polymerase and acts as an obligate chain terminator because it lacks the 3-hydroxyl group needed to attach subsequent nucleosides.'
    },
    clinicalTakeaway: {
      vi: 'Acyclovir là tiền chất nucleoside được hoạt hóa chọn lọc bởi thymidine kinase của virus herpes (HSV-1, HSV-2, VZV) để ức chế chọn lọc DNA polymerase của virus mà ít độc cho tế bào lành.',
      en: 'Acyclovir requires initial monophosphorylation by viral thymidine kinase (HSV/VZV) to yield active acyclovir-triphosphate that selectively terminates viral DNA elongation.'
    }
  },

  // CHAPTER 30: Bioterrorism - Inhalation Anthrax
  {
    id: 'case_ch30',
    chapterNumber: 30,
    chapterTitle: 'Chương 30: Vũ khí sinh học & Vi sinh vật pháp y (Agents of Bioterror & Forensic Microbiology)',
    type: 'case_in_point',
    relatedPathogenId: 'bacillus_anthracis',
    caseScenario: {
      vi: 'Ngày 16 tháng 10 năm 2001 (thời điểm xảy ra vụ phát tán thư chứa bào tử than qua đường bưu điện Hoa Kỳ), một người đàn ông 56 tuổi xuất hiện sốt, ớn lạnh, đau đầu, đau họng và mệt mỏi. Bệnh tiến triển nhanh sang khó thở, vã mồ hôi đêm, buồn nôn. Bệnh nhân nhập viện ngày 19/10, nhịp tim 100 l/p, giảm rì rào phế nang. X-quang ngực thẳng và chụp CT cho thấy hình ảnh trung thất giãn rộng điển hình (widened mediastinum) do phù nề và viêm hạch trung thất xuất huyết, không có đông đặc nhu mô phổi. Cấy máu mọc trực khuẩn Gram dương lớn chỉ sau 11 giờ. Bệnh nhân được điều trị khẩn cấp với Ciprofloxacin, Rifampin và Clindamycin và đã hồi phục thành công.',
      en: 'On October 16, 2001, a 56-year-old man experienced fever, chills, headache, sore throat, progressing to severe dyspnea, night sweats, and vomiting. Hospitalized Oct 19, chest radiograph revealed a widened mediastinum and CT showed mediastinal edema. Blood culture grew large gram-positive bacilli within 11 hours. Immediate therapy with ciprofloxacin, rifampin, and clindamycin was initiated, and the patient recovered.'
    },
    question: {
      vi: 'Tại phòng xét nghiệm lâm sàng Sentinel, những đặc điểm nào sau đây cho phép NGHI NGỜ và KHÔNG ĐƯỢC LOẠI TRỪ Bacillus anthracis, đòi hỏi phải dừng ngay thao tác và chuyển tuyến (Refer)?',
      en: 'In a sentinel clinical microbiology laboratory, which phenotypic combination warrants presumptive identification of Bacillus anthracis requiring referral to an LRN reference laboratory?'
    },
    options: [
      {
        id: 'a',
        text: {
          vi: 'Trực khuẩn Gram dương lớn, tan máu beta mạnh trên SBA, di động rất nhanh',
          en: 'Large Gram-positive bacilli, strongly beta-hemolytic on SBA, actively motile'
        }
      },
      {
        id: 'b',
        text: {
          vi: 'Trực khuẩn Gram dương lớn có nha bào, KHÔNG tan máu (nonhemolytic), BẤT ĐỘNG (nonmotile), Catalase (+), khuẩn lạc dai "đầu quỷ Medusa"',
          en: 'Large Gram-positive spore-forming rods, NONHEMOLYTIC on SBA, NONMOTILE, Catalase positive, tenacious "Medusa-head" colonies'
        }
      },
      {
        id: 'c',
        text: {
          vi: 'Cầu trực khuẩn Gram âm nhỏ, cần cysteine để phát triển',
          en: 'Tiny Gram-negative coccobacilli requiring cysteine for growth'
        }
      },
      {
        id: 'd',
        text: {
          vi: 'Trực khuẩn Gram âm bắt màu 2 cực dạng kim băng trên nhuộm Wright',
          en: 'Gram-negative rods with bipolar safety-pin staining on Wright stain'
        }
      }
    ],
    correctOptionId: 'b',
    explanation: {
      vi: 'Quy trình chuẩn Rule-out của mạng lưới LRN (Laboratory Response Network): Bất kỳ trực khuẩn Gram dương lớn có nha bào nào mọc hiếu khí tạo khuẩn lạc 2-5mm xám mờ không tan máu sau 24h, rìa tua "đầu quỷ Medusa", dính dai khi chạm que cấy, catalase dương tính và BẤT ĐỘNG (ngược lại với Bacillus cereus là tan máu beta và di động) phải được coi là nghi ngờ vi khuẩn Than B. anthracis. Phòng xét nghiệm cấp Sentinel phải đóng kín đĩa thạch, báo cáo an toàn sinh học và chuyển tuyến Reference Lab ngay lập tức, không được đưa vào máy định danh tự động vì nguy cơ phát tán khí dung lây nhiễm tử vong.',
      en: 'LRN Sentinel Level Clinical Laboratory Guidelines state that any aerobic large Gram-positive spore-forming rod that is nonhemolytic on sheep blood agar, nonmotile, catalase-positive, with ground-glass tenacious colonies must be considered suspect Bacillus anthracis. Technologists must immediately seal plates, cease manipulation, and notify public health reference laboratories.'
    },
    clinicalTakeaway: {
      vi: 'Bacillus anthracis thể hô hấp biểu hiện trung thất giãn rộng trên X-quang. Phòng xét nghiệm Sentinel nhận biết qua bộ ba: Trực khuẩn Gram dương lớn hình toa tàu + KHÔNG tan máu + BẤT ĐỘNG + Khuẩn lạc Medusa dính dai.',
      en: 'Inhalational anthrax presents with mediastinal widening on imaging. Sentinel rule-out criteria: Large Gram-positive rod + Nonhemolytic on SBA + Nonmotile + Tenacious ground-glass colony.'
    }
  },

  // CHAPTER 31: Biofilms - VRE Prosthetic Joint Infection
  {
    id: 'case_ch31',
    chapterNumber: 31,
    chapterTitle: 'Chương 31: Màng sinh học trong nhiễm trùng (Biofilms: Infection & Device Complications)',
    type: 'case_in_point',
    relatedPathogenId: 'enterococcus_faecium',
    caseScenario: {
      vi: 'Cụ bà 83 tuổi sống tại viện dưỡng lão nhập viện trong tình trạng sốt cao và tụt huyết áp. Bệnh nhân có tiền sử viêm khớp dạng thấp và phẫu thuật thay toàn bộ khớp gối trái 2 năm trước. Sau phẫu thuật, bệnh nhân liên tục bị nhiễm trùng khớp nhân tạo tái phát nhiều đợt, cấy dịch khớp nhiều lần phân lập được Enterococcus faecium kháng vancomycin (VRE). Mặc dù đã dùng nhiều phác đồ kháng sinh liều cao và phẫu thuật cắt lọc rửa khớp nhiều lần, tình trạng nhiễm trùng huyết từ ổ khớp gối nhân tạo vẫn tái phát và cuối cùng bệnh nhân tử vong. Kết quả giải phẫu tử thi kết luận: Nhiễm trùng mạn tính không lành do VRE liên quan đến khớp gối nhân tạo gây nhiễm trùng huyết toàn thân.',
      en: 'An 83-year-old nursing home resident was admitted with fever and hypotension. She had a history of rheumatoid arthritis and total left knee arthroplasty 2 years earlier, complicated by recurrent knee prosthetic joint infections with vancomycin-resistant Enterococcus faecium (VRE). Despite multiple antimicrobial regimens and revisions, sepsis recurred and she passed away. Autopsy confirmed chronic nonhealing VRE wound infection associated with the prosthetic knee and sepsis.'
    },
    question: {
      vi: 'Tại sao kháng sinh dù nhạy cảm in vitro theo kháng sinh đồ tiêu chuẩn vẫn thất bại trong việc tiệt trừ vi khuẩn VRE bám trên khớp gối nhân tạo?',
      en: 'Why did antibiotic regimens fail to eradicate VRE on the prosthetic joint despite documented in vitro susceptibility on routine planktonic testing?'
    },
    options: [
      {
        id: 'a',
        text: {
          vi: 'Do vi khuẩn VRE biến đổi thành dạng L-form không có vách tế bào',
          en: 'Due to VRE transformation into cell-wall deficient L-forms'
        }
      },
      {
        id: 'b',
        text: {
          vi: 'Do vi khuẩn tạo màng sinh học (Biofilm): Nồng độ diệt khuẩn (MBEC) tăng gấp 10 - 1000 lần, chất nền EPS ngăn kháng sinh và chứa các tế bào ngủ sống dai (persister cells)',
          en: 'Due to biofilm formation: Eradication concentration (MBEC) increases 10- to 1000-fold, EPS matrix impedes drug penetration, and dormant persister cells survive'
        }
      },
      {
        id: 'c',
        text: {
          vi: 'Do bệnh nhân bị giảm hấp thu thuốc qua đường tiêu hóa',
          en: 'Due to impaired intestinal drug absorption'
        }
      },
      {
        id: 'd',
        text: {
          vi: 'Do van tim bị nhiễm trùng tiên phát từ trước',
          en: 'Due to primary heart valve infection'
        }
      }
    ],
    correctOptionId: 'b',
    explanation: {
      vi: 'Khi bám vào bề mặt dụng cụ nhân tạo cấy ghép y tế, vi khuẩn chuyển đổi từ dạng bơi tự do (planktonic) sang dạng bám (sessile) và tiết chất nền ngoại bào EPS (extracellular polymeric substances). Màng biofilm tạo rào cản vật lý ngăn cản kháng sinh, đồng thời các tế bào ở tầng sâu rơi vào trạng thái ngừng phân chia trơ với kháng sinh (persister cells). Nồng độ diệt khuẩn màng sinh học (MBEC) có thể cao gấp 1000 lần MIC thông thường. Khi có dòng chảy hoặc màng quá dày, các mảnh màng sinh học rụng ra (seeding/dissemination) trôi vào máu gây sốt rét run và nhiễm khuẩn huyết tái diễn.',
      en: 'On indwelling devices, bacteria transition to a sessile phenotype producing an extracellular polymeric substance (EPS) matrix. Biofilms exhibit phenotypic resistance (tolerance) with MBEC values 10 to 1000 times higher than planktonic MICs. Deep dormant persister cells survive drug exposure, and mature biofilm shedding continuously seeds the bloodstream, triggering recurrent bacteremia.'
    },
    clinicalTakeaway: {
      vi: 'Biofilm trên dụng cụ nhân tạo cấy ghép làm tăng MIC lên 10-1000 lần và chứa các tế bào persister cells sống dai; tiệt trừ nhiễm trùng đòi hỏi phải phẫu thuật tháo bỏ dụng cụ cấy ghép kết hợp kháng sinh diệt màng.',
      en: 'Biofilms on indwelling prosthetic hardware increase antimicrobial tolerance 10- to 1000-fold with persister cell reservoirs; cure almost always necessitates hardware removal.'
    }
  },

  // CHAPTER 32: Respiratory Infections - Pneumococcal Lobar Pneumonia
  {
    id: 'case_ch32',
    chapterNumber: 32,
    chapterTitle: 'Chương 32: Nhiễm trùng đường hô hấp (Respiratory Tract Infections)',
    type: 'case_in_point',
    relatedPathogenId: 'streptococcus_pneumoniae',
    caseScenario: {
      vi: 'Người phụ nữ 52 tuổi nhập viện cấp cứu vì đau ngực phải nhói lên theo từng nhịp thở, ho khạc đờm màu gỉ sắt và sốt cao. Bệnh nhân cho biết các triệu chứng khởi phát đột ngột từ hôm qua với cơn rét run dữ dội. Khám lâm sàng: thân nhiệt 38.8°C (102°F), ran nổ thô ở vùng ngực trước bên phải. Bạch cầu máu tăng cao kèm chuyển trái (neutrophilia with left shift). Phim chụp X-quang ngực thẳng cho thấy đám mờ đồng nhất đậm đặc giới hạn rõ ở thùy trên phổi phải (lobar consolidation). Nhuộm Gram mẫu đờm đạt tiêu chuẩn (chỉ có <10 tế bào biểu mô vảy và >25 bạch cầu đa nhân/vi trường) thấy song cầu Gram dương hình ngọn nến có vỏ nhầy trong suốt.',
      en: 'A 52-year-old woman presented with acute right-sided pleuritic chest pain, productive cough with rust-colored sputum, and fever. Symptoms began abruptly the day prior with shaking chills. Exam: Temp 38.8°C (102°F), coarse breath sounds in right anterior chest. CBC showed leukocytosis with left shift. Chest X-ray demonstrated dense whitish lobar consolidation of the right upper lobe. Gram stain of an acceptable sputum sample (<10 SECs, >25 PMNs/LPF) revealed lancet-shaped Gram-positive diplococci with clear capsule halos.'
    },
    question: {
      vi: 'Để xác định nhanh và chính xác Streptococcus pneumoniae từ khuẩn lạc tan máu alpha trên đĩa thạch máu cừu (SBA), hai thử nghiệm sinh hóa nào sau đây là tiêu chuẩn vàng?',
      en: 'To rapidly and definitively identify Streptococcus pneumoniae from alpha-hemolytic colonies on sheep blood agar, which two confirmatory tests are standard?'
    },
    options: [
      {
        id: 'a',
        text: {
          vi: 'Thử nghiệm Coagulase và Novobiocin',
          en: 'Coagulase and Novobiocin tests'
        }
      },
      {
        id: 'b',
        text: {
          vi: 'Nhạy cảm với Optochin (đĩa ethylhydrocupreine hydroclorid ≥ 14 mm) và Thử nghiệm tan trong muối mật (Bile solubility dương tính)',
          en: 'Optochin susceptibility (ethylhydrocupreine disk ≥ 14 mm) and Bile solubility positive'
        }
      },
      {
        id: 'c',
        text: {
          vi: 'Thử nghiệm Bacitracin và PYR',
          en: 'Bacitracin and PYR tests'
        }
      },
      {
        id: 'd',
        text: {
          vi: 'Thử nghiệm Oxidase và lên men đường glucose',
          en: 'Oxidase and glucose fermentation tests'
        }
      }
    ],
    correctOptionId: 'b',
    explanation: {
      vi: 'Streptococcus pneumoniae tạo khuẩn lạc dẹt rốn lõm (dạng đồng xu có gờ viền) với quầng tan máu alpha màu xanh lục trên thạch máu cừu SBA. Hai thử nghiệm sinh hóa vàng để phân biệt phế cầu với liên cầu viridans hoại sinh là: (1) Nhạy cảm với Optochin (vòng ức chế ≥ 14 mm với đĩa 6 mm chứa 5 µg ethylhydrocupreine hydrochloride khi ủ CO2) và (2) Thử nghiệm tan trong muối mật (Bile solubility test): nhỏ natri deoxycholate 10% làm hoạt hóa enzym autolysin amidase nội sinh gây tự tiêu hủy vách tế bào vi khuẩn trong vòng 10-30 phút.',
      en: 'Streptococcus pneumoniae produces alpha-hemolytic, crater-like colonies with depressed centers due to autolysis on SBA. Confirmation requires Optochin susceptibility (zone of inhibition ≥ 14 mm with 6-mm disk) and bile solubility (addition of 10% sodium deoxycholate activates autolytic enzymes, dissolving bacterial cell walls within 10-30 minutes).'
    },
    clinicalTakeaway: {
      vi: 'Viêm phổi thùy cấp tính do Phế cầu (S. pneumoniae) đặc trưng bởi đờm gỉ sắt và đông đặc thùy phổi; khẳng định phòng xét nghiệm bằng đĩa Optochin (nhạy cảm) và tan trong muối mật (dương tính).',
      en: 'Pneumococcal lobar pneumonia typically presents with rusty sputum and dense lobar consolidation; laboratory confirmation relies on Optochin susceptibility and bile solubility.'
    }
  }
];
