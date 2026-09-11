import { ChapterSummary } from '../types';
import { MAHON_CHAPTERS_PART2 } from './mahonChaptersPart2';
import { MAHON_CHAPTERS_PART3 } from './mahonChaptersPart3';

const BASE_MAHON_CHAPTERS: ChapterSummary[] = [
  {
    chapterNumber: 14,
    title: {
      vi: 'Chương 14: Tụ Cầu Khuẩn (Staphylococci & Micrococci)',
      en: 'Chapter 14: Staphylococci and Micrococci'
    },
    authors: 'Linda S. Monson, Lindsey E. Nielsen',
    outline: {
      vi: [
        'Đặc điểm chung của họ Staphylococcaceae và Micrococcaceae',
        'Các loài có ý nghĩa lâm sàng: S. aureus, S. epidermidis, S. saprophyticus, S. lugdunensis, S. haemolyticus, S. pseudintermedius',
        'Chẩn đoán phòng xét nghiệm: Nhuộm soi, nuôi cấy đĩa SBA, MSA, CHROMagar',
        'Phương pháp thử nghiệm Coagulase (Slide vs Tube coagulase) và hạt ngưng kết latex',
        'Độ nhạy cảm và cơ chế kháng thuốc: MRSA, mecA/PBP2a, VISA/VRSA, D-zone test phát hiện kháng cảm ứng Clindamycin'
      ],
      en: [
        'General characteristics of Staphylococcaceae and Micrococcaceae',
        'Clinically significant species: S. aureus, S. epidermidis, S. saprophyticus, S. lugdunensis, S. haemolyticus, S. pseudintermedius',
        'Laboratory diagnosis: Gram stain, culture on SBA, MSA, CHROMagar',
        'Coagulase testing methods (slide clumping factor vs tube staphylocoagulase) and latex agglutination',
        'Antimicrobial susceptibility: MRSA, mecA/PBP2a, VISA/VRSA, D-zone inducible clindamycin resistance'
      ]
    },
    keyTerms: [
      'Staphylocoagulase', 'Clumping factor', 'Protein A', 'TSST-1', 'Exfoliatin',
      'Panton-Valentine leukocidin (PVL)', 'MRSA', 'mecA', 'PBP2a', 'D-zone test',
      'Novobiocin', 'Small colony variants (SCVs)', 'Slime/Biofilm', 'Microdase'
    ],
    pointsToRemember: {
      vi: [
        'Tụ cầu là cầu khuẩn Gram dương, catalase dương tính, đứng thành cụm hình chùm nho.',
        'Staphylococcus aureus là tác nhân gây bệnh hàng đầu trong chi; phân lập từ bất kỳ bệnh phẩm nào đều có ý nghĩa lâm sàng.',
        'S. aureus tiết nhiều yếu tố độc lực: Protein A (kháng thực bào bằng gắn đoạn Fc của IgG), TSST-1, Exfoliatin A&B (SSSS/bệnh Ritter), enterotoxin A-E (ngộ độc thức ăn bền nhiệt), và PVL (hoại tử da, phổi ở CA-MRSA).',
        'Thử nghiệm ngưng kết phiến kính (slide test) chỉ phát hiện clumping factor (coagulase gắn). Nếu âm tính, bắt buộc làm tube coagulase test (phát hiện staphylocoagulase tự do, đọc kết quả sau 4h ở 35-37°C và để qua đêm ở nhiệt độ phòng để tránh âm tính giả do fibrinolysin).',
        'S. lugdunensis cho phản ứng slide coagulase dương tính nhưng tube coagulase âm tính, có men PYR (+) và ornithine decarboxylase (+), gây viêm nội tâm mạc ác tính phá hủy van tim nhanh chóng.',
        'S. saprophyticus kháng Novobiocin (đĩa 5µg, đường kính vô khuẩn <16mm), là căn nguyên viêm đường tiết niệu thứ hai ở phụ nữ trẻ.',
        'S. epidermidis tạo lớp màng sinh học biofilm mạnh (poly-gamma-DL-glutamic acid), thường trú trên da, gây nhiễm trùng liên quan ống thông mạch máu và van tim nhân tạo.',
        'S. pseudintermedius là vi khuẩn từ chó/mèo gây nhiễm trùng vết mổ sau phẫu thuật thay dây chằng chéo ở người tiếp xúc thú nuôi, có tube coagulase (+), cần phân biệt với S. aureus bằng MALDI-TOF hoặc phản ứng hạt latex (-).',
        'Kháng Methicillin (MRSA) do gen mecA mã hóa protein gắn penicillin đột biến PBP2a. Đĩa Cefoxitin (30µg) là chỉ điểm nhạy nhất thay thế Oxacillin.',
        'D-zone test cần thực hiện khi Erythromycin kháng (R) nhưng Clindamycin nhạy (S) để phát hiện đề kháng cảm ứng qua gen erm (vết lõm hình chữ D quanh đĩa Clindamycin).'
      ],
      en: [
        'Staphylococci are catalase-positive, Gram-positive cocci in grape-like clusters.',
        'Staphylococcus aureus is the primary pathogen in the genus; isolation from any site is considered clinically significant.',
        'S. aureus produces Protein A (binds Fc of IgG), TSST-1, Exfoliative toxins (SSSS/Ritter disease), Enterotoxins A-E, and PVL.',
        'Slide test detects clumping factor; negative results must be followed by tube coagulase test (staphylocoagulase) read at 4h and held overnight at room temperature.',
        'S. lugdunensis is slide coagulase positive, tube negative, PYR+, ODC+, causing aggressive native/prosthetic valve endocarditis.',
        'S. saprophyticus is novobiocin resistant (<16mm zone with 5µg disk), common cause of UTIs in young sexually active females.',
        'S. epidermidis produces thick biofilms, causing catheter and prosthetic device infections.',
        'S. pseudintermedius is a zoonotic pathogen from dogs/cats with tube coagulase (+), clumping factor (-), often oxacillin resistant.',
        'Cefoxitin disk test is the preferred surrogate method for detecting mecA-mediated oxacillin resistance (MRSA).',
        'D-zone test detects inducible clindamycin resistance when erythromycin is resistant and clindamycin is susceptible.'
      ]
    },
    clinicalPearls: {
      vi: [
        'Mẹo chẩn đoán: Micrococcus phân biệt với Staphylococcus bằng đĩa Microdase (modified oxidase +), nhạy cảm Bacitracin 0.04U (S), và kháng Lysostaphin (R).',
        'Lưu ý mẫu cấy máu: Nếu chỉ mọc 1 chai CoNS sau >48h thường là tạp nhiễm do sát trùng da chưa kỹ. Nếu mọc ≥2 bộ chai cấy máu ở bệnh nhân có catheter, coi chừng nhiễm khuẩn huyết thật sự do S. epidermidis.'
      ],
      en: [
        'Diagnostic tip: Differentiate Micrococcus from Staph using Microdase (oxidase +), Bacitracin 0.04U susceptible, and Lysostaphin resistant.',
        'Blood culture pearl: Single positive bottle for CoNS after >48h often represents skin flora contamination. Multiple sets positive indicate true bacteremia.'
      ]
    },
    tables: [
      {
        id: 'table_14_1',
        title: {
          vi: 'Bảng 14.1: Phân biệt Staphylococcus và Micrococcus trong thường quy phòng xét nghiệm',
          en: 'Table 14.1: Differentiation Between Staphylococci and Micrococci'
        },
        headers: ['Thử nghiệm (Test)', 'Staphylococci', 'Micrococci'],
        rows: [
          ['Modified oxidase (Microdase)', '-', '+'],
          ['Sinh acid yếm khí từ Glucose (Anaerobic acid from glucose)', '+', '-'],
          ['Mọc trên thạch Furoxone-Tween 80-oil red O', '-', '+'],
          ['Sinh acid yếm khí từ Glycerol + Erythromycin', '+', '-'],
          ['Kháng Bacitracin (0.04 đơn vị)', 'Kháng (R)', 'Nhạy (S)'],
          ['Đĩa Lysosome (50-mg)', 'Kháng (R)', 'Nhạy (S)'],
          ['Thử nghiệm Lysostaphin', 'Nhạy (S)', 'Kháng (R)']
        ]
      },
      {
        id: 'table_14_6',
        title: {
          vi: 'Bảng 14.6: Các thử nghiệm then chốt định danh các loài Staphylococcus lâm sàng',
          en: 'Table 14.6: Key Tests for Clinical Identification of Staphylococci'
        },
        headers: ['Thử nghiệm', 'S. aureus', 'S. epidermidis', 'S. haemolyticus', 'S. lugdunensis', 'S. saprophyticus', 'S. schleiferi'],
        rows: [
          ['Sắc tố khuẩn lạc (Colony pigment)', '+ (vàng/trắng)', '-', 'd (biến thiên)', 'd', 'd (50% vàng)', '-'],
          ['Staphylocoagulase (Ống nghiệm)', '+', '-', '-', '-', '-', '-'],
          ['Clumping factor (Lam kính)', '+', '-', '-', '(+)', '-', '+'],
          ['Heat-stable nuclease (DNase)', '+', '-', '-', '-', '-', '+'],
          ['Alkaline phosphatase', '+', '+', '-', '-', '-', '+'],
          ['PYR (Pyrrolidonyl arylamidase)', '-', '-', '+', '+', '-', '+'],
          ['Ornithine decarboxylase (ODC)', '-', '(d)', '-', '+', '-', '-'],
          ['Urease', 'd', '+', '-', 'd', '+', '-'],
          ['Đề kháng Novobiocin (5 µg)', 'Nhạy (S)', 'Nhạy (S)', 'Nhạy (S)', 'Nhạy (S)', 'Kháng (R)', 'Nhạy (S)'],
          ['Sinh acid từ D-Mannitol', '+', '-', '-', '-', 'd', '-'],
          ['Sinh acid từ D-Trehalose', '+', '-', '+', '+', '+', 'd']
        ]
      }
    ]
  },
  {
    chapterNumber: 15,
    title: {
      vi: 'Chương 15: Liên Cầu Khuẩn, Phế Cầu & Enterococcus (Catalase-Negative GPC)',
      en: 'Chapter 15: Streptococcus, Enterococcus, and Other Catalase-Negative Gram-Positive Cocci'
    },
    authors: 'Kalavati Suvarna, Connie R. Mahon',
    outline: {
      vi: [
        'Cấu trúc vách tế bào và kháng nguyên carbohydrate C (phân loại Lancefield nhóm A đến U)',
        'Hình thái tan máu trên thạch máu cừu (SBA): Alpha (α), Beta (β), Gamma (không tan máu), Alpha-prime (α\')',
        'Streptococcus pyogenes (GAS): Độc lực protein M (gen emm), Streptolysin O/S, biến chứng hậu nhiễm (viêm vi cầu thận cấp, thấp tim)',
        'Streptococcus agalactiae (GBS): Tầm soát thai phụ 35-37 tuần, thử nghiệm CAMP, thủy phân Hippurate',
        'Streptococcus pneumoniae (Phế cầu): Song cầu hình ngọn nến, nhạy cảm Optochin, tan trong muối mật (bile solubility)',
        'Nhóm Viridans streptococci (5 nhóm), Abiotrophia/Granulicatella (NVS cần pyridoxal/hiện tượng vệ tinh), Aerococcus, Leuconostoc/Pediococcus (kháng vancomycin tự nhiên)'
      ],
      en: [
        'Cell wall structure and Lancefield C carbohydrate grouping',
        'Hemolytic patterns on sheep blood agar (alpha, beta, nonhemolytic, alpha-prime)',
        'S. pyogenes (GAS): M protein, Streptolysin O/S, post-streptococcal sequelae (ARF, AGN)',
        'S. agalactiae (GBS): 35-37 weeks gestational screening, CAMP test, Hippurate hydrolysis',
        'S. pneumoniae: Lancet-shaped diplococci, optochin susceptible, bile soluble',
        'Viridans groups, Abiotrophia/Granulicatella (NVS), Aerococcus, Leuconostoc and Pediococcus (intrinsic vancomycin resistance)'
      ]
    },
    keyTerms: [
      'Lancefield grouping', 'M protein (emm)', 'Streptolysin O (ASO)', 'Streptolysin S', 'Erythrogenic exotoxin (SpeA-F)',
      'Necrotizing fasciitis', 'CAMP test', 'Hippuricase', 'Optochin (ethylhydrocuprein)', 'Bile solubility (sodium deoxycholate)',
      'Bile esculin', '6.5% NaCl tolerance', 'PYR hydrolysis', 'LAP (leucine aminopeptidase)', 'VRE (VanA, VanB)', 'Nutritionally variant streptococci (NVS)'
    ],
    pointsToRemember: {
      vi: [
        'Streptococcaceae là cầu khuẩn Gram dương, catalase âm tính, xếp thành đôi hoặc chuỗi dài trong môi trường lỏng.',
        'S. pyogenes (GAS) tan máu beta rộng, nhạy cảm đĩa Bacitracin (0.04 đơn vị), PYR (+). Kháng nguyên M protein quyết định độc lực và tính sinh miễn dịch đặc hiệu type.',
        'S. agalactiae (GBS) tan máu beta hẹp, thủy phân Hippurate (+), thử nghiệm CAMP (+) tạo hình mũi tên tan máu với đường cấy S. aureus.',
        'S. pneumoniae tan máu alpha, khuẩn lạc non hình vòm nhầy, khuẩn lạc già lõm trung tâm (đồng xu dập nổi autolysis), nhạy cảm Optochin (vòng vô khuẩn ≥14mm với đĩa 6mm) và tan hoàn toàn trong muối mật natri deoxycholate 10%.',
        'Enterococcus (E. faecalis, E. faecium) dương tính đồng thời với Bile Esculin (đen thạch) và chịu mặn 6.5% NaCl (+), PYR (+). Khác với Group D non-enterococcus (S. bovis/equinus) là Group D không mọc trong 6.5% NaCl.',
        'Leuconostoc và Pediococcus là cầu khuẩn Gram dương catalase âm tính có đặc tính kháng Vancomycin tự nhiên (MIC >256 µg/mL).',
        'Abiotrophia và Granulicatella (liên cầu biến dưỡng phụ thuộc dinh dưỡng - NVS) không mọc trên thạch SBA thông thường trừ khi có đường cấy S. aureus tạo vệ tinh (satellitism) hoặc bổ sung pyridoxal hydrochloride (Vitamin B6).'
      ],
      en: [
        'Streptococcaceae are catalase-negative Gram-positive cocci in pairs or chains.',
        'S. pyogenes (GAS) is beta-hemolytic, bacitracin susceptible, and PYR positive.',
        'S. agalactiae (GBS) is CAMP test positive (arrowhead) and hippurate positive.',
        'S. pneumoniae is alpha-hemolytic, optochin susceptible (≥14mm), and bile soluble.',
        'Enterococcus is bile esculin positive, 6.5% NaCl tolerant, and PYR positive. Group D streptococci fail to grow in 6.5% NaCl.',
        'Leuconostoc and Pediococcus possess intrinsic vancomycin resistance.',
        'Abiotrophia and Granulicatella require pyridoxal (vitamin B6) or S. aureus streak for satellitism.'
      ]
    },
    clinicalPearls: {
      vi: [
        'Cấy máu mọc S. gallolyticus (S. bovis): Bác sĩ lâm sàng bắt buộc phải chỉ định nội soi đại tràng toàn bộ vì có mối liên quan mật thiết với ung thư biểu mô tuyến đại trực tràng.',
        'GBS ở sản phụ: Tầm soát swab âm đạo - trực tràng tuần 35-37; nếu dương tính cần kháng sinh dự phòng khi chuyển dạ để tránh nhiễm khuẩn huyết và viêm màng não sơ sinh sớm.'
      ],
      en: [
        'Blood culture growing S. gallolyticus (S. bovis) warrants immediate colonoscopy due to strong association with colon carcinoma.',
        'GBS vaginal-rectal screening at 35-37 weeks prevents early-onset neonatal sepsis and meningitis via intrapartum prophylaxis.'
      ]
    },
    tables: [
      {
        id: 'table_15_3',
        title: {
          vi: 'Bảng 15.3: Nhận diện sinh hóa Streptococcus và các chi liên quan',
          en: 'Table 15.3: Biochemical Identification of Streptococcus and Similar Organisms'
        },
        headers: ['Đặc điểm', 'S. pyogenes (GAS)', 'S. agalactiae (GBS)', 'Enterococcus', 'Group D Strep', 'S. pneumoniae', 'Viridans Strep', 'Leuconostoc / Pediococcus'],
        rows: [
          ['Tan máu (Hemolysis)', 'β', 'β', 'α, β, không', 'α, không', 'α', 'α, không', 'α, không'],
          ['Vancomycin (30 µg)', 'Nhạy (S)', 'Nhạy (S)', 'Nhạy/Kháng (VRE)', 'Nhạy (S)', 'Nhạy (S)', 'Nhạy (S)', 'Kháng tự nhiên (R)'],
          ['Bacitracin (0.04 U)', 'Nhạy (S)', 'Kháng (R)', 'Kháng (R)', 'Kháng (R)', 'Nhạy (S)', 'Kháng (R)', 'Biến thiên'],
          ['Optochin (5 µg)', 'Kháng (R)', 'Kháng (R)', 'Kháng (R)', 'Kháng (R)', 'Nhạy (S ≥14mm)', 'Kháng (R)', 'Kháng (R)'],
          ['Thủy phân Hippurate', '-', '+', '-', '-', '-', '-', '+ (Pediococcus)'],
          ['PYR', '+', '-', '+', '-', '-', '-', '-'],
          ['CAMP test', '-', '+ (mũi tên)', '-', '-', '-', '-', '-'],
          ['LAP', '+', '+', '+', '+', '+', '+', 'Leuconostoc (-), Pedio (+)'],
          ['Bile esculin', '-', '-', '+', '+', '-', '-', '+'],
          ['Mọc trong 6.5% NaCl', '-', '-', '+', '-', '-', '-', '+']
        ]
      }
    ]
  },
  {
    chapterNumber: 16,
    title: {
      vi: 'Chương 16: Trực Khuẩn Gram Dương Hiếu Khí (Bacillus, Listeria, Corynebacterium & Nocardia)',
      en: 'Chapter 16: Aerobic Gram-Positive Bacilli'
    },
    authors: 'Steven D. Mahlen, Amanda T. Harrington',
    outline: {
      vi: [
        'Phân nhóm trực khuẩn Gram dương: Sinh bào tử (Bacillus) vs Không sinh bào tử (Listeria, Corynebacterium, Erysipelothrix, Arcanobacterium, Gardnerella) vs Phân nhánh kháng toan một phần (Nocardia, Streptomyces)',
        'Corynebacterium diphtheriae: Độc tố bạch hầu bất hoạt EF-2, hạt Babès-Ernst, thạch Tinsdale/CTBA tạo quầng nâu, thử nghiệm Elek',
        'Listeria monocytogenes: Chuyển động nhào lộn (tumbling motility) 22°C, dù xòe trong thạch mềm, CAMP hình khối vuông (block), làm lạnh tăng sinh 4°C',
        'Erysipelothrix rhusiopathiae: Sinh H2S trên TSI, hình chổi rửa ống nghiệm trong thạch gelatin, kháng tự nhiên vancomycin',
        'Arcanobacterium haemolyticum: Viêm họng kèm ban scarlatiniform, reverse CAMP (+), kháng penicillin',
        'Gardnerella vaginalis: Tế bào chỉ điểm (Clue cells), thang điểm Nugent, tiêu chuẩn Amsel, thạch HBT',
        'Nocardia spp.: Phân nhánh, hạt lưu huỳnh (sulfur granules), nhuộm kháng toan cải tiến modified Kinyoun (+)',
        'Bacillus anthracis (Trực khuẩn than) vs B. cereus: Đầu vuông như đốt tre, Medusa head, không tan máu, không di động, nhạy Penicillin'
      ],
      en: [
        'Classification: Spore-formers (Bacillus) vs Non-spore-formers vs Branching aerobic actinomycetes (Nocardia)',
        'Corynebacterium diphtheriae: EF-2 toxin, Babès-Ernst granules, CTBA brown halo, Elek immunodiffusion test',
        'Listeria monocytogenes: Tumbling motility at 22°C, umbrella motility, block-shaped CAMP, cold enrichment',
        'Erysipelothrix rhusiopathiae: H2S positive on TSI, test-tube brush gelatin stab, intrinsic vancomycin resistance',
        'Arcanobacterium haemolyticum: Pharyngitis with rash, reverse CAMP, penicillin resistant',
        'Gardnerella vaginalis: Clue cells, Nugent score, Amsel criteria, HBT agar',
        'Nocardia: Branching beaded rods, modified acid-fast, sulfur granules, actinomycotic mycetoma',
        'Bacillus anthracis vs B. cereus: Bamboo rod, Medusa head, nonhemolytic, nonmotile, penicillin susceptible'
      ]
    },
    keyTerms: [
      'Babès-Ernst granules', 'Cystine-tellurite blood agar (CTBA)', 'Elek test', 'Pseudomembrane', 'Tumbling motility',
      'Umbrella pattern', 'Block CAMP', 'Cold enrichment', 'Test tube brush-like', 'Reverse CAMP', 'Clue cells',
      'Nugent score', 'Amsel criteria', 'Whiff test', 'Partially acid-fast', 'Sulfur granules', 'Medusa head', 'Eschar'
    ],
    pointsToRemember: {
      vi: [
        'C. diphtheriae: Trực khuẩn hình dùi trống, xếp chữ V hoặc L (diphtheroid), có hạt biến sắc Babès-Ernst. Trên CTBA khử tellurite tạo khuẩn lạc đen có quầng nâu (cystinase +). Chẩn đoán xác định tiết độc tố bằng thử nghiệm khuếch tán miễn dịch Elek.',
        'Listeria monocytogenes: Cầu trực khuẩn Gram dương, tan máu beta nhẹ, catalase (+), thủy phân esculin (+), di động nhào lộn ở 22-25°C nhưng bất động ở 35°C, tạo hình dù xòe trong thạch bán lỏng. CAMP tạo hình khối vuông với S. aureus.',
        'Erysipelothrix rhusiopathiae: Trực khuẩn Gram dương duy nhất sinh H2S trên TSI, catalase (-), cấy chích sâu gelatin tạo hình chổi rửa ống nghiệm, kháng vancomycin tự nhiên.',
        'Arcanobacterium haemolyticum: Catalase (-), tan máu beta hẹp, Gram soi thấy trực khuẩn phân nhánh thô sơ. Thử nghiệm Reverse CAMP (+) (ức chế tan máu của S. aureus do tiết phospholipase D). Đề kháng penicillin, điều trị bằng Erythromycin.',
        'Gardnerella vaginalis: Trực khuẩn Gram biến thiên, gây viêm âm đạo do vi khuẩn (BV). Chẩn đoán qua Clue cells trên dịch soi tươi, điểm Nugent ≥7, hoặc 3/4 tiêu chuẩn Amsel.',
        'Nocardia brasiliensis / cyriacigeorgica: Sợi phân nhánh mảnh, bắt màu kháng toan yếu (modified Kinyoun với H2SO4 1%), khuẩn lạc khô xốp như vụn bánh mì, gây u hạt actinomycotic mycetoma có hạt lưu huỳnh. Nhạy cảm với Sulfonamides (Bactrim), kháng Penicillin.',
        'Bacillus anthracis (Bào tử than): Trực khuẩn to đầu vuông xếp chuỗi đốt tre, không di động, không tan máu trên SBA, tạo khuẩn lạc "đầu sứa" (Medusa head) dính chặt mặt thạch, nhạy cảm với Penicillin 10U/mL (khác B. cereus tan máu mạnh, di động, kháng penicillin).'
      ],
      en: [
        'C. diphtheriae: Pleomorphic club-shaped rods in V/L palisades with Babès-Ernst granules; brown halo on CTBA; Elek test confirms toxin.',
        'L. monocytogenes: Motile at 22-25°C (tumbling/umbrella), catalase+, esculin+, block CAMP+, can cross placenta and blood-brain barrier.',
        'E. rhusiopathiae: Gram-positive rod that is H2S positive on TSI, catalase negative, test-tube brush growth in gelatin, vancomycin resistant.',
        'A. haemolyticum: Catalase negative, reverse CAMP positive (inhibits S. aureus beta-lysin), penicillin resistant.',
        'G. vaginalis: Gram-variable rod causing BV, diagnosed via clue cells, Nugent score, and Amsel criteria.',
        'Nocardia: Branching beaded filaments, partially acid-fast (modified Kinyoun), causes mycetoma with sulfur granules; treated with sulfonamides.',
        'B. anthracis: Nonmotile, nonhemolytic on SBA, Medusa head colonies, penicillin susceptible, differentiated from B. cereus.'
      ]
    },
    clinicalPearls: {
      vi: [
        'Phân biệt Listeria vs Streptococcus agalactiae (GBS): Cả hai đều gây viêm màng não/nhiễm khuẩn huyết sơ sinh và tan máu beta nhẹ. Listeria là trực khuẩn Gram dương, Catalase (+), Esculin (+), di động ở 25°C; còn GBS là cầu khuẩn chuỗi, Catalase (-), Esculin (-), bất động.',
        'Cảnh báo an toàn sinh học than: Khi thấy trực khuẩn Gram dương lớn, không di động, không tan máu có khuẩn lạc đầu sứa, lập tức đóng đĩa, thao tác trong tủ BSL-3 và báo cáo hệ thống đáp ứng LRN vì nghi ngờ B. anthracis!'
      ],
      en: [
        'Listeria vs GBS pearl: Both cause neonatal sepsis/meningitis with narrow beta-hemolysis. Listeria is a catalase+ motile rod; GBS is a catalase- nonmotile coccus.',
        'Anthrax alert: Nonhemolytic, nonmotile large Gram-positive rod with Medusa head colonies must be handled in BSL-3 and referred immediately to LRN.'
      ]
    },
    tables: [
      {
        id: 'table_16_6',
        title: {
          vi: 'Bảng 16.6: Phân biệt Bacillus anthracis và Bacillus cereus',
          en: 'Table 16.6: Differentiation of Bacillus anthracis and Bacillus cereus'
        },
        headers: ['Đặc điểm', 'Bacillus anthracis', 'Bacillus cereus'],
        rows: [
          ['Tan máu trên SBA', 'Âm tính (-)', 'Dương tính (+) (Beta mạnh)'],
          ['Di động (Motility)', 'Bất động (-)', 'Di động (+)'],
          ['Nhạy cảm Penicillin (10 U/mL)', 'Nhạy (S)', 'Kháng (R)'],
          ['Sinh Lecithinase (Trứng)', 'Dương tính (+)', 'Dương tính (+)'],
          ['Lên men Salicin', 'Âm tính (-)', 'Dương tính / Biến thiên (+/-)'],
          ['Mọc trên thạch PEA', 'Âm tính (-)', 'Dương tính (+)'],
          ['Thủy phân Gelatin', 'Âm tính (-)', 'Dương tính (+)'],
          ['Hình thái khuẩn lạc', 'Đầu sứa (Medusa head), dai dính', 'Kính mờ (frosted glass), lan rộng']
        ]
      }
    ]
  },
  {
    chapterNumber: 17,
    title: {
      vi: 'Chương 17: Các Loài Neisseria & Moraxella catarrhalis',
      en: 'Chapter 17: Neisseria Species and Moraxella catarrhalis'
    },
    authors: 'Lauren Roberts',
    outline: {
      vi: [
        'Đặc điểm chung họ Neisseriaceae: Song cầu Gram âm hạt cà phê, Oxidase (+), Catalase (+)',
        'Neisseria gonorrhoeae: Độc lực pili (T1-T2), LOS, porB, viêm niệu đạo mủ, viêm tiểu khung (PID), hội chứng Fitz-Hugh-Curtis, lậu mắt sơ sinh',
        'Neisseria meningitidis: Viêm màng não mủ, ban xuất huyết hoại tử tử ban, hội chứng Waterhouse-Friderichsen (suy thượng thận cấp do xuất huyết), tiêm chủng vacxin A, C, Y, W-135 và B',
        'Moraxella catarrhalis: Căn nguyên thứ 3 gây viêm tai giữa và viêm xoang ở trẻ em, tiết Butyrate esterase (Tributyrin +), DNase (+), dấu hiệu đẩy khuẩn lạc "hockey puck"',
        'Phân biệt Neisseria gây bệnh và Neisseria thường trú (N. lactamica ONPG +, N. sicca nhăn nheo, N. cinerea nhạy Colistin)'
      ],
      en: [
        'Neisseriaceae general features: Kidney bean Gram-negative diplococci, oxidase+, catalase+',
        'Neisseria gonorrhoeae: Pili, LOS, PID, Fitz-Hugh-Curtis, ophthalmia neonatorum, MTM/NYC media',
        'Neisseria meningitidis: Meningococcemia, petechial rash, Waterhouse-Friderichsen syndrome',
        'Moraxella catarrhalis: Pediatric otitis media/sinusitis, DNase+, Tributyrin+, "hockey puck" sign',
        'Differentiating pathogenic from commensal Neisseria (N. lactamica ONPG+, N. sicca wrinkled, N. cinerea colistin susceptible)'
      ]
    },
    keyTerms: [
      'Diplococci', 'Oxidase', 'Superoxol (30% H2O2)', 'Thayer-Martin (MTM)', 'New York City (NYC)',
      'Waterhouse-Friderichsen syndrome', 'Fitz-Hugh-Curtis syndrome', 'Ophthalmia neonatorum',
      'Butyrate esterase (Tributyrin)', 'DNase', 'Hockey puck sign', 'Wagon-wheel colony', 'PPNG'
    ],
    pointsToRemember: {
      vi: [
        'Neisseria gonorrhoeae và N. meningitidis là hai tác nhân gây bệnh hàng đầu, đòi hỏi khí trường 3-5% CO2 và môi trường giàu dinh dưỡng (thạch Chocolate, Thayer-Martin cải tiến MTM).',
        'N. gonorrhoeae chỉ lên men đường GLUCOSE (Maltose -, Lactose -, Sucrose -). Cho phản ứng Superoxol (H2O2 30%) sủi bọt nổ tức thì.',
        'N. meningitidis lên men GLUCOSE và MALTOSE. Có enzym gamma-glutamyl aminopeptidase (+).',
        'N. lactamica là vi khuẩn thường trú ở vòm họng trẻ em, lên men GLUCOSE, MALTOSE và LACTOSE (ONPG dương tính trong 30 phút).',
        'Moraxella catarrhalis không lên men đường (asaccharolytic), nhưng dương tính với DNase và Butyrate esterase (thủy phân Tributyrin). Khuẩn lạc già có hình nan hoa bánh xe (wagon-wheel) và có thể gạt nguyên khối trên mặt thạch như con bài khúc côn cầu ("hockey puck"). Hầu hết tiết beta-lactamase.',
        'Môi trường chọn lọc MTM chứa: Vancomycin (ức chế vi khuẩn Gram +), Colistin (ức chế Gram -), Nystatin/Amphotericin B (ức chế nấm men), Trimethoprim (ức chế Proteus swarming).'
      ],
      en: [
        'N. gonorrhoeae and N. meningitidis require enriched media (CHOC, MTM) and 3-5% CO2.',
        'N. gonorrhoeae ferments glucose only; superoxol (30% H2O2) strongly positive.',
        'N. meningitidis ferments glucose and maltose; gamma-glutamyl aminopeptidase positive.',
        'N. lactamica ferments glucose, maltose, and lactose (ONPG positive within 30 min).',
        'Moraxella catarrhalis is asaccharolytic, DNase+, butyrate esterase (tributyrin)+, with "hockey puck" sliding colonies.',
        'Modified Thayer-Martin (MTM) contains Vancomycin, Colistin, Nystatin, and Trimethoprim.'
      ]
    },
    clinicalPearls: {
      vi: [
        'Soi tươi niệu đạo nam giới: Thấy song cầu Gram âm hình hạt cà phê nội bào bạch cầu đa nhân (PMN) có độ nhạy và đặc hiệu >95% để chẩn đoán bệnh lậu (không cần chờ cấy). Ở nữ giới, dịch cổ tử cung có vi hệ bình thường tương tự nên bắt buộc phải nuôi cấy hoặc làm PCR/NAAT.',
        'Hội chứng Waterhouse-Friderichsen: Tình trạng nhiễm khuẩn huyết tối cấp do não mô cầu kèm ban xuất huyết lan nhanh, trụy tim mạch và hoại tử xuất huyết cả hai tuyến thượng thận, tử vong trong 12-48 giờ.'
      ],
      en: [
        'Urethral smear in symptomatic males showing intracellular Gram-negative diplococci is >95% diagnostic for gonorrhea. Female endocervical smears require confirmation by NAAT or culture.',
        'Waterhouse-Friderichsen syndrome is fulminant meningococcemia with bilateral adrenal hemorrhage, DIC, and shock, fatal within 12-48 hours.'
      ]
    },
    tables: [
      {
        id: 'table_17_5',
        title: {
          vi: 'Bảng 17.5: Đặc điểm phân biệt các loài Neisseria, Moraxella và Kingella',
          en: 'Table 17.5: Characteristics of Significant Species of Neisseria, Moraxella, and Kingella'
        },
        headers: ['Đặc điểm', 'N. gonorrhoeae', 'N. meningitidis', 'N. lactamica', 'N. sicca', 'Moraxella catarrhalis', 'Kingella kingae'],
        rows: [
          ['Mọc trên thạch MTM/NYC', '+', '+', '+', '-', 'd (biến thiên)', '+'],
          ['Mọc trên SBA ở 35°C', '-', '+', '+', '+', '+', '+ (tan máu beta)'],
          ['Catalase (H2O2 3%)', '+', '+', '+', '+', '+', '-'],
          ['Superoxol (H2O2 30%)', '+ (mạnh)', '-', '-', '-', '-', '-'],
          ['Oxidase', '+', '+', '+', '+', '+', '+'],
          ['Acid từ Glucose', '+', '+', '+', '+', '-', '+'],
          ['Acid từ Maltose', '-', '+', '+', '+', '-', '-'],
          ['Acid từ Lactose (ONPG)', '-', '-', '+', '-', '-', '-'],
          ['Acid từ Sucrose', '-', '-', '-', '+', '-', '-'],
          ['DNase', '-', '-', '-', '-', '+', '-'],
          ['Thủy phân Tributyrin', '-', '-', '-', '-', '+', '-'],
          ['Gamma-Glutamyl Aminopeptidase', '-', '+', '-', '-', '-', '-']
        ]
      }
    ]
  },
  {
    chapterNumber: 18,
    title: {
      vi: 'Chương 18: Haemophilus, Nhóm HACEK, Legionella & Bordetella',
      en: 'Chapter 18: Haemophilus, HACEK Group, Legionella, and Bordetella'
    },
    authors: 'Donald Lehman, Christian Whelen',
    outline: {
      vi: [
        'Chi Haemophilus: Yếu tố X (hemin) và V (NAD), hiện tượng mọc vệ tinh (satellitism), thử nghiệm Porphyrin (ALA), H. influenzae (Hib vs NTHi), H. ducreyi (hạ cam mềm), H. aegyptius (sốt ban xuất huyết Brazil)',
        'Nhóm HACEK: Viêm nội tâm mạc bán cấp van tim tổn thương/nhân tạo: Aggregatibacter (hoa khế 4-6 cánh), Cardiobacterium (chuỗi hoa hồng rosettes), Eikenella corrodens (ăn mòn thạch, mùi thuốc tẩy javel), Kingella kingae (viêm xương khớp trẻ <4 tuổi)',
        'Capnocytophaga: Trực khuẩn hình thoi lướt (gliding), nhiễm khuẩn huyết sau chó cắn (C. canimorsus)',
        'Pasteurella multocida: Chó/mèo cắn, nhuộm bắt màu 2 cực (bipolar safety-pin), không mọc trên MAC',
        'Brucella (sốt gợn sóng, BSL-3, urease siêu nhanh <2h) & Francisella tularensis (sốt thỏ, cần cysteine/cystine, BSL-3)',
        'Legionella pneumophila: Bệnh viêm phổi Legionnaires & Sốt Pontiac, cần thạch BCYE + L-cysteine, kháng nguyên nước tiểu serogroup 1',
        'Bordetella pertussis: Bệnh ho gà, thạch Bordet-Gengou/Regan-Lowe (giọt thủy ngân), độc tố ho gà PT, FHA'
      ],
      en: [
        'Haemophilus: X and V factors, satellitism around S. aureus, Porphyrin (ALA) test, H. ducreyi chancroid',
        'HACEK group in endocarditis: Aggregatibacter (star-like colonies), Cardiobacterium (rosettes), Eikenella (pits agar, bleach odor), Kingella (osteoarthritis in children <4)',
        'Capnocytophaga: Fusiform gliding rods, dog-bite sepsis in asplenic patients (C. canimorsus)',
        'Pasteurella multocida: Animal bites, bipolar staining, MAC negative',
        'Brucella (undulant fever, BSL-3) & Francisella tularensis (tularemia, cysteine required, BSL-3)',
        'Legionella pneumophila: BCYE agar with L-cysteine, urine antigen test',
        'Bordetella pertussis: Whooping cough, Regan-Lowe mercury droplets, pertussis toxin'
      ]
    },
    keyTerms: [
      'X factor (hemin)', 'V factor (NAD)', 'Satellitism', 'Porphyrin test (ALA)', 'HACEK',
      'Bleach-like odor', 'Pitting agar', 'Bipolar staining', 'Undulant fever', 'Cysteine requirement',
      'BCYE agar', 'Ground-glass colony', 'Urine antigen test', 'Mercury droplets', 'Regan-Lowe medium'
    ],
    pointsToRemember: {
      vi: [
        'Haemophilus influenzae đòi hỏi CẢ YẾU TỐ X và V để mọc; thử nghiệm Porphyrin âm tính (không tự tổng hợp được nhân heme). Mọc vệ tinh quanh khóm S. aureus tiết V factor trên đĩa SBA.',
        'H. parainfluenzae chỉ cần yếu tố V, Porphyrin dương tính (phát huỳnh quang đỏ cam dưới đèn UV 360nm).',
        'H. ducreyi chỉ cần yếu tố X (không cần V), gây bệnh hạ cam mềm (chancroid) với hạch bẹn sưng mủ (buboes), trực khuẩn Gram âm xếp hình "đàn cá bơi" (school of fish) hoặc "đường ray xe lửa".',
        'Eikenella corrodens: Mùi thuốc tẩy javel đặc trưng, làm lõm mặt thạch (pitting agar 45%), thường phân lập sau chấn thương cắn người (clenched fist wound).',
        'Kingella kingae: Cầu trực khuẩn Gram âm đầu vuông xếp chuỗi, catalase (-), oxidase (+), tan máu beta dưới khuẩn lạc, là nguyên nhân số 1 gây viêm xương khớp ở trẻ dưới 4 tuổi.',
        'Pasteurella multocida: Cầu trực khuẩn bắt màu đậm 2 cực (bipolar staining), oxidase (+), catalase (+), indole (+), mọc tốt trên SBA nhưng KHÔNG mọc trên MacConkey.',
        'Brucella spp.: Trực khuẩn Gram âm nhỏ, nội bào, oxidase (+), catalase (+), urease dương tính cực nhanh (<2 giờ, thậm chí <30 phút với B. suis). Tác nhân BSL-3 dễ lây qua khí dung trong phòng xét nghiệm.',
        'Legionella pneumophila: Trực khuẩn Gram âm nhuộm nhạt (cần kéo dài thời gian safranin 10 phút), bắt buộc cần L-cysteine và sắt trên thạch BCYE để mọc, khuẩn lạc hình "kính mờ" (ground glass) có viền hồng/xanh.',
        'Bordetella pertussis: Bệnh ho gà, khuẩn lạc nhỏ sáng lấp lánh như giọt thủy ngân trên thạch Regan-Lowe hoặc Bordet-Gengou sau 3-7 ngày.'
      ],
      en: [
        'H. influenzae requires both X and V factors; porphyrin test negative; satellite around S. aureus.',
        'H. ducreyi causes chancroid, requires X factor only, exhibits "school of fish" Gram stain morphology.',
        'Eikenella corrodens produces a chlorine bleach odor and pits agar, common in human bite wounds.',
        'Kingella kingae is a catalase-negative, beta-hemolytic pathogen causing septic arthritis in children <4 years.',
        'Pasteurella multocida exhibits bipolar staining, oxidase+, indole+, and fails to grow on MacConkey.',
        'Brucella species are BSL-3 zoonotic agents with rapid urease (<2 hours).',
        'Legionella requires L-cysteine on BCYE agar, showing cut-glass / ground-glass colonies.',
        'Bordetella pertussis forms mercury-droplet colonies on charcoal Regan-Lowe medium.'
      ]
    },
    clinicalPearls: {
      vi: [
        'Vết cắn động vật: Chó/mèo cắn sưng nóng đỏ đau cấp tính sau vài giờ thường do Pasteurella multocida (nhạy Penicillin/Augmentin, kháng Macrolide). Người cắn/đấm vào răng người khác (clenched-fist injury) hãy nghĩ ngay đến Eikenella corrodens.',
        'Viêm phổi du lịch / Hội nghị: Bệnh nhân lớn tuổi hút thuốc, đi du lịch du thuyền hoặc khách sạn dùng máy lạnh/bồn tắm nước nóng, viêm phổi kèm hạ natri máu, lú lẫn, tiêu chảy -> Làm ngay test kháng nguyên Legionella nước tiểu!'
      ],
      en: [
        'Animal bite pearl: Dog/cat bite cellulitis developing within 24h is classically Pasteurella multocida. Human bite wounds harbor Eikenella corrodens.',
        'Travel-associated pneumonia in an older smoker with GI symptoms and confusion strongly points to Legionella pneumophila (order urine antigen).'
      ]
    },
    tables: [
      {
        id: 'table_18_2',
        title: {
          vi: 'Bảng 18.2: Phân biệt các loài Haemophilus và Aggregatibacter',
          en: 'Table 18.2: Differential Tests for Haemophilus and Aggregatibacter'
        },
        headers: ['Loài', 'Yếu tố X', 'Yếu tố V', 'Thử nghiệm Porphyrin', 'Tan máu (máu ngựa)', 'Oxidase', 'Catalase'],
        rows: [
          ['Haemophilus influenzae', '+', '+', '-', '-', '+', '+'],
          ['Haemophilus haemolyticus', '+', '+', '-', '+ (Beta)', '+', '+'],
          ['Haemophilus parainfluenzae', '-', '+', '+', '-', '+', 'v'],
          ['Haemophilus parahaemolyticus', '-', '+', '+', '+ (Beta)', '+', '+'],
          ['Haemophilus ducreyi', '+', '-', '-', '-', '-', '-'],
          ['Aggregatibacter aphrophilus', '- (hoặc + ban đầu)', '-', '+', '-', 'v', '-']
        ]
      }
    ]
  },
  {
    chapterNumber: 19,
    title: {
      vi: 'Chương 19: Họ Vi Khuẩn Đường Ruột (Enterobacteriaceae)',
      en: 'Chapter 19: Enterobacteriaceae'
    },
    authors: 'Kimberly E. Walker, Connie R. Mahon, Donald Lehman',
    outline: {
      vi: [
        'Đặc điểm kinh điển: Trực khuẩn Gram âm, lên men Glucose, Oxidase âm tính (trừ Plesiomonas), khử Nitrate thành Nitrite, di động (trừ Klebsiella, Shigella, Yersinia 37°C)',
        'Kháng nguyên vi khuẩn: O (somatic vách), H (tiên mao), K/Vi (vỏ nang chịu nhiệt)',
        'Các chủng E. coli gây bệnh đường ruột: ETEC (tiêu chảy du lịch, LT/ST), EPEC (tiêu chảy trẻ em), EHEC/STEC (O157:H7, verotoxin, HUS, không lên men Sorbitol trên SMAC, MUG âm tính), EIEC (hội chứng lỵ), EAEC (xếp gạch)',
        'Tộc Escherichieae & Klebsielleae: Klebsiella (vỏ nhầy, bất động, KPC), Enterobacter, Cronobacter sakazakii (sắc tố vàng trong sữa công thức trẻ em), Serratia marcescens (sắc tố đỏ prodigiosin, DNase +)',
        'Tộc Proteeae: Proteus mirabilis (swarming, mùi sôcôla cháy, sỏi san hô struvite, Indole -, ODC +) vs P. vulgaris (Indole +, ODC -)',
        'Tác nhân gây bệnh đường ruột nguyên phát: Salmonella (H2S +, Lysine +, di động, sốt thương hàn Typhi), Shigella (bất động, không sinh hơi, liều nhiễm cực thấp <100 vi khuẩn), Yersinia enterocolitica (viêm hạch mạc treo giống ruột thừa, mọc ở 4°C, thạch CIN khuẩn lạc mắt bò, di động ở 25°C nhưng bất động ở 35°C)'
      ],
      en: [
        'Classical traits: Ferment glucose, oxidase negative (except Plesiomonas), reduce nitrate to nitrite, motile (except Klebsiella, Shigella, Yersinia at 37°C)',
        'Antigens: O (somatic), H (flagellar), K/Vi (capsular)',
        'Diarrheagenic E. coli: ETEC (traveler diarrhea), EPEC, EHEC (O157:H7, SMAC negative, MUG negative, HUS), EIEC, EAEC',
        'Klebsielleae: Klebsiella (capsular mucoid, nonmotile), Cronobacter (infant formula yellow pigment), Serratia (prodigiosin, DNase)',
        'Proteeae: Phenylalanine deaminase positive, Proteus mirabilis (swarming, struvite calculi, indole negative) vs P. vulgaris (indole positive)',
        'Primary enteric pathogens: Salmonella (H2S+, lysine+), Shigella (nonmotile, low infectious dose <100), Yersinia (CIN bullseye, 25°C motile)'
      ]
    },
    keyTerms: [
      'Enterics', 'Oxidase negative', 'Glucose fermentation', 'Nitrate reduction',
      'ETEC', 'EHEC O157:H7', 'SMAC agar', 'MUG test', 'Hemolytic uremic syndrome (HUS)',
      'Prodigiosin', 'Swarming motility', 'Phenylalanine deaminase (PAD)', 'Struvite stones',
      'Vi antigen', 'Rose spots', 'CIN agar', 'Cold enrichment', 'CRE / KPC'
    ],
    pointsToRemember: {
      vi: [
        'Tất cả thành viên họ Enterobacteriaceae đều lên men glucose, khử nitrate thành nitrite và cytochrome oxidase âm tính (ngoại lệ duy nhất Plesiomonas shigelloides oxidase dương tính).',
        'Klebsiella, Shigella và Yersinia (ở 37°C) là các vi khuẩn đường ruột bất động.',
        'EHEC O157:H7 không lên men Sorbitol sau 24h (khuẩn lạc không màu trên thạch SMAC) và không sinh enzyme beta-glucuronidase (MUG âm tính). Tiết Shiga toxin 1 và 2 gây hội chứng tán huyết ure máu cao (HUS).',
        'Proteus, Morganella, Providencia thuộc tộc Proteeae có khả năng sinh enzyme phenylalanine deaminase (PAD dương tính, tạo màu xanh lục đậm khi thêm FeCl3).',
        'Proteus mirabilis không sinh Indole (Indole âm), Ornithine (+), sinh H2S; Proteus vulgaris sinh Indole (+), Ornithine (-). Cả hai đều sinh urease 4+ cực mạnh làm kiềm hóa nước tiểu tạo sỏi struvite.',
        'Serratia marcescens tiết enzyme ngoại bào DNase (+), gelatinase (+), và sinh sắc tố đỏ gạch prodigiosin khi ủ ở nhiệt độ phòng.',
        'Salmonella sinh H2S (+), khử carboxylate lysine (+), di động (+); ngược lại Shigella không sinh H2S, lysine (-), bất động (-). S. sonnei là loài duy nhất lên men lactose chậm và ODC (+).',
        'Yersinia enterocolitica di động ở 25°C nhưng bất động ở 35°C; trên thạch chọn lọc CIN tạo khuẩn lạc đặc trưng "mắt bò" (bull’s eye) tâm đỏ đậm viền trong suốt.'
      ],
      en: [
        'Enterobacteriaceae ferment glucose, reduce nitrate, and are oxidase negative (except Plesiomonas).',
        'Klebsiella, Shigella, and Yersinia (at 37°C) are nonmotile.',
        'E. coli O157:H7 is sorbitol negative on SMAC and MUG negative; produces Shiga toxins causing HUS.',
        'Tribe Proteeae is phenylalanine deaminase (PAD) positive.',
        'Proteus mirabilis is indole negative, ODC positive; Proteus vulgaris is indole positive, ODC negative.',
        'Serratia produces extracellular DNase and red prodigiosin pigment at room temperature.',
        'Salmonella is H2S+, lysine+, motile. Shigella is H2S-, lysine-, nonmotile.',
        'Yersinia enterocolitica is motile at 25°C but nonmotile at 35°C; produces bullseye colonies on CIN agar.'
      ]
    },
    clinicalPearls: {
      vi: [
        'Viêm ruột thừa giả ở trẻ nhỏ (Pseudoappendicitis): Trẻ đau hố chậu phải sốt cao kèm tiêu chảy, phẫu thuật thấy ruột thừa bình thường nhưng viêm hạch mạc treo mạc treo ruột dữ dội -> nguyên nhân kinh điển là Yersinia enterocolitica (lây qua thịt heo tái, chitterlings).',
        'Sốt thương hàn (Typhoid fever): Tuần 1 cấy máu dương tính cao nhất (80-90%); tuần 2-3 cấy phân và nước tiểu dương tính, xuất hiện đào ban (rose spots) vùng bụng.'
      ],
      en: [
        'Pseudoappendicitis in children with right lower quadrant pain and mesenteric adenitis is classically caused by Yersinia enterocolitica.',
        'Typhoid fever timeline: Blood cultures are most positive in week 1 (80-90%); stool and urine cultures become positive in weeks 2-3 with rose spots.'
      ]
    },
    tables: [
      {
        id: 'table_19_2',
        title: {
          vi: 'Bảng 19.2: Đặc điểm sinh hóa phân biệt các tộc thuộc họ Enterobacteriaceae',
          en: 'Table 19.2: Biochemical Characteristics of Tribes of Enterobacteriaceae'
        },
        headers: ['Thử nghiệm', 'Escherichieae', 'Edwardsielleae', 'Salmonelleae', 'Citrobacteriaceae', 'Klebsielleae', 'Proteeae', 'Yersinieae'],
        rows: [
          ['H2S (TSI)', '-', '+', '+', '+ hoặc -', '-', '+ hoặc -', '-'],
          ['Urease', '-', '-', '-', '+ hoặc -', '+ hoặc -', '+', '+'],
          ['Indole', '+ hoặc -', '+', '-', '- hoặc +', '-', '+ hoặc -', '+ hoặc -'],
          ['Methyl Red (MR)', '+', '+', '+', '+', '-', '+', '+'],
          ['Voges-Proskauer (VP)', '-', '-', '-', '-', '+', '-', '-'],
          ['Citrate (Simmons)', '-', '-', '+', '+', '+', 'd', '-'],
          ['Phenylalanine deaminase (PAD)', '-', '-', '-', '-', '-', '+', '-'],
          ['Lên men Mannitol', '+ hoặc -', '-', '+', '+', '+', '- hoặc +', '+']
        ]
      },
      {
        id: 'table_19_9',
        title: {
          vi: 'Bảng 19.9: Phân loại sinh hóa và huyết thanh 4 loài Shigella',
          en: 'Table 19.9: Biochemical and Serologic Differentiation of Shigella Species'
        },
        headers: ['Loài Shigella', 'Nhóm huyết thanh (Serogroup)', 'Lên men Mannitol', 'ONPG', 'Ornithine decarboxylase (ODC)'],
        rows: [
          ['Shigella dysenteriae', 'Nhóm A (độc lực cao nhất, Shiga toxin)', '-', 'Biến thiên', '-'],
          ['Shigella flexneri', 'Nhóm B (phổ biến ở người lớn, MSM)', '+', '-', '-'],
          ['Shigella boydii', 'Nhóm C (hiếm gặp)', '+', 'Biến thiên', '-'],
          ['Shigella sonnei', 'Nhóm D (phổ biến nhất tại các nước phát triển)', '+', '+ (chậm)', '+']
        ]
      }
    ]
  },
  {
    chapterNumber: 20,
    title: {
      vi: 'Chương 20: Các Loài Vibrio, Aeromonas & Campylobacter',
      en: 'Chapter 20: Vibrio, Aeromonas, and Campylobacter Species'
    },
    authors: 'Deborah Ann Josko',
    outline: {
      vi: [
        'Chi Vibrio: Phẩy khuẩn Gram âm, Oxidase (+), nhạy hợp chất ức chế phẩy khuẩn O/129 (150µg), string test (+), ưa mặn (halophilic, trừ V. cholerae và V. mimicus)',
        'Vibrio cholerae: Dịch tả, phân nước vo gạo, độc tố choleragen (tiết Na+, Cl-, nước qua cơ chế cAMP), thạch TCBS lên men sucrose khuẩn lạc vàng, biotype El Tor vs Cổ điển',
        'Vibrio parahaemolyticus: Hiện tượng Kanagawa (tan máu trên thạch Wagatsuma), tiêu chảy mùa hè sau ăn hàu sống',
        'Vibrio vulnificus: Nhiễm khuẩn huyết tối cấp kèm bóng nước xuất huyết và viêm cân mạc hoại tử ở bệnh nhân xơ gan/ứ sắt sau tiếp xúc hải sản/nước biển, tử vong 50%',
        'Aeromonas spp.: Trực khuẩn Gram âm oxidase (+), không cần muối (mọc trong 0% NaCl), kháng O/129, gây tiêu chảy và nhiễm trùng sau đỉa cắn (A. veronii biovar sobria)',
        'Campylobacter jejuni: Khuẩn hình cánh hải âu (seagull wings), di động lao nhanh (darting motility), vi hiếu khí (5% O2, 10% CO2, 85% N2), mọc ở 42°C, thủy phân Hippurate (+), biến chứng Guillain-Barré (GBS)',
        'Helicobacter pylori: Loét dạ dày tá tràng, ung thư dạ dày, sinh urease cực mạnh, test thở UBT, CLOtest'
      ],
      en: [
        'Vibrio: Comma-shaped GNB, oxidase+, O/129 susceptible, string test+, halophilic (except V. cholerae/mimicus)',
        'V. cholerae: Rice-water stool, choleragen toxin (cAMP hypersecretion), TCBS yellow colonies',
        'V. parahaemolyticus: Kanagawa phenomenon on Wagatsuma agar, seafood gastroenteritis',
        'V. vulnificus: Blistering bullae, septic shock in cirrhotic patients, 50% mortality',
        'Aeromonas: Oxidase+, grows in 0% NaCl, O/129 resistant, leech infections',
        'Campylobacter jejuni: Seagull wings, darting motility, microaerophilic at 42°C, hippurate+, Guillain-Barré syndrome',
        'Helicobacter pylori: Peptic ulcer disease, gastric cancer, strong urease, urea breath test'
      ]
    },
    keyTerms: [
      'Choleragen', 'Rice-water stool', 'String test', 'O/129 (150 µg)', 'Halophilic', 'TCBS agar',
      'Kanagawa phenomenon', 'Wagatsuma agar', 'Seagull wings', 'Darting motility', 'Microaerophilic (42°C)',
      'Hippurate hydrolysis', 'Guillain-Barré syndrome', 'Type B gastritis', 'Urea breath test (UBT)'
    ],
    pointsToRemember: {
      vi: [
        'Vibrio spp. là vi khuẩn ưa mặn (cần Na+ để mọc, trừ V. cholerae và V. mimicus mọc được trong 0% NaCl). Nhạy cảm đĩa O/129 (150 µg) và cho thử nghiệm kéo sợi String test (+) với natri deoxycholate 0.5%.',
        'Thạch TCBS (Thiosulfate Citrate Bile Salts Sucrose): V. cholerae và V. alginolyticus lên men sucrose tạo khuẩn lạc màu VÀNG; V. parahaemolyticus và đa số V. vulnificus không lên men sucrose tạo khuẩn lạc màu XANH LỤC.',
        'Bệnh nhân xơ gan, viêm gan mạn hoặc ứ sắt (hemochromatosis) ăn hàu sống hoặc bị gai tôm/cua đâm nhiễm V. vulnificus có thể rơi vào sốc nhiễm khuẩn hoại tử da chỉ trong 12-24 giờ với tỷ lệ tử vong 50%.',
        'Aeromonas phân biệt với Vibrio bằng tính kháng đĩa O/129 (R), String test (-) và mọc tốt trong canh thang 0% NaCl nhưng không mọc trong 6% NaCl.',
        'Campylobacter jejuni là căn nguyên vi khuẩn gây tiêu chảy hàng đầu thế giới; trực khuẩn cong hình cánh hải âu, di động kiểu lao nhanh (darting), mọc chọn lọc ở 42°C trong khí trường vi hiếu khí (5% O2), thủy phân Hippurate (+). Khoảng 1/1000 ca nhiễm C. jejuni dẫn đến hội chứng liệt mềm tự miễn Guillain-Barré.',
        'Helicobacter pylori cư trú dưới lớp chất nhầy niêm mạc dạ dày, sinh urease cực mạnh làm kiềm hóa môi trường acid xung quanh; chẩn đoán không xâm lấn bằng test thở C13/C14 hoặc tìm kháng nguyên trong phân.'
      ],
      en: [
        'Vibrios are halophilic (except V. cholerae/mimicus), O/129 susceptible, and string test positive.',
        'TCBS agar: V. cholerae is yellow (sucrose+); V. parahaemolyticus and V. vulnificus are green (sucrose-).',
        'V. vulnificus causes fatal septicemia and bullae in patients with liver disease and iron overload.',
        'Aeromonas is distinguished by O/129 resistance, negative string test, and growth in 0% NaCl.',
        'C. jejuni is microaerophilic, grows at 42°C, hippurate positive, and linked to Guillain-Barré syndrome.',
        'H. pylori produces potent urease, diagnosed via urea breath test (UBT) and stool antigen.'
      ]
    },
    clinicalPearls: {
      vi: [
        'Viêm mô tế bào hoại tử sau đỉa hút máu: Bệnh nhân phẫu thuật tạo hình vi phẫu được chỉ định đắp đỉa y tế (Hirudo medicinalis) giải ứ huyết tĩnh mạch bị nhiễm trùng -> Tác nhân điển hình là Aeromonas veronii biovar sobria (cộng sinh trong ruột đỉa).',
        'Nhiễm khuẩn huyết do phẩy khuẩn: V. vulnificus là một cấp cứu nội - ngoại khoa khẩn cấp, phối hợp Ciprofloxacin + Ceftriaxone kèm rạch giải áp mô hoại tử sớm.'
      ],
      en: [
        'Medicinal leech therapy wound infection is classically caused by Aeromonas veronii biovar sobria.',
        'V. vulnificus sepsis is a medical and surgical emergency requiring ciprofloxacin + ceftriaxone and aggressive debridement.'
      ]
    },
    tables: [
      {
        id: 'table_20_2',
        title: {
          vi: 'Bảng 20.2: Các đặc điểm then chốt phân biệt Vibrio, Aeromonas và Plesiomonas',
          en: 'Table 20.2: Key Features for the Identification of Vibrio, Aeromonas, and Plesiomonas'
        },
        headers: ['Đặc điểm', 'Vibrio', 'Aeromonas', 'Plesiomonas'],
        rows: [
          ['Nhuộm Gram', 'Trực khuẩn cong/thẳng Gram âm', 'Trực khuẩn thẳng Gram âm', 'Trực khuẩn thẳng Gram âm'],
          ['Hoạt tính Oxidase', '+', '+', '+'],
          ['Nhạy cảm O/129 (150 µg)', 'Nhạy (S)', 'Kháng (R)', 'Nhạy (S)'],
          ['Mọc trên thạch TCBS', '+', '-', '-'],
          ['Mọc trong 0% NaCl', '- (trừ V. cholerae/mimicus)', '+', '+'],
          ['Mọc trong 6.5% NaCl', '+', '-', 'Không mọc'],
          ['Lên men Inositol', '-', '-', '+'],
          ['Thủy phân Gelatin', '+', '+', '-']
        ]
      }
    ]
  },
  {
    chapterNumber: 21,
    title: {
      vi: 'Chương 21: Trực Khuẩn Gram Âm Không Lên Men (Nonfermenters: Pseudomonas, Acinetobacter...)',
      en: 'Chapter 21: Nonfermenting and Miscellaneous Gram-Negative Bacilli'
    },
    authors: 'Yousif Barzani',
    outline: {
      vi: [
        'Đặc điểm chung: Không làm acid hóa phần sâu ống thạch TSI/KIA (K/K), hiếu khí tuyệt đối, thường kháng nhiều kháng sinh',
        '4 nhóm không lên men phổ biến nhất: Pseudomonas aeruginosa, Acinetobacter baumannii, Stenotrophomonas maltophilia, Burkholderia cepacia complex',
        'Pseudomonas aeruginosa: Sắc tố xanh pyocyanin + xanh vàng pyoverdin, mùi nho/kẹo ngọt (2-aminoacetophenone), mọc ở 42°C, khuẩn lạc nhầy alginate ở bệnh nhân xơ nang (CF)',
        'Acinetobacter baumannii: Cầu trực khuẩn Gram âm (dễ giữ màu tím nhầm Gram +), bất động, oxidase (-), tạo ánh tím trên MAC, CRAB đa kháng',
        'Stenotrophomonas maltophilia: Oxidase (-), DNase (+), khuẩn lạc ánh tím xanh/oải hương (lavender-green) trên SBA, kháng tự nhiên Carbapenem, nhạy cảm Bactrim (SXT)',
        'Burkholderia pseudomallei (bệnh Melioidosis): Khuẩn lạc nhăn nheo, mùi đất ẩm, bắt màu 2 cực trên thạch Ashdown; Burkholderia mallei (bệnh Glanders ở ngựa)',
        'Các loài khác: Elizabethkingia meningoseptica (viêm màng não sơ sinh, vàng, nhạy vancomycin), Shewanella putrefaciens (sinh H2S mạnh), Sphingomonas paucimobilis (vàng, bất động 37°C)'
      ],
      en: [
        'General characteristics: TSI K/K, strictly aerobic, multidrug resistant',
        'Four most common nonfermenters: P. aeruginosa, A. baumannii, S. maltophilia, B. cepacia complex',
        'P. aeruginosa: Pyocyanin and pyoverdin pigments, grape-like odor, 42°C growth, mucoid alginate in CF',
        'Acinetobacter baumannii: Coccobacilli, nonmotile, oxidase negative, purplish hue on MAC, CRAB strains',
        'Stenotrophomonas maltophilia: Oxidase negative, DNase positive, lavender-green on SBA, intrinsic carbapenem resistance, SXT drug of choice',
        'Burkholderia pseudomallei: Melioidosis, wrinkled colonies, earthy odor, Ashdown agar, BSL-3',
        'Other nonfermenters: Elizabethkingia (yellow, vancomycin sensitive), Shewanella (H2S+), Sphingomonas (yellow pigment)'
      ]
    },
    keyTerms: [
      'Nonfermenter', 'TSI K/K', 'Pyocyanin', 'Pyoverdin', 'Alginate slime', 'CRAB',
      'Stenotrophomonas maltophilia', 'Lavender-green', 'Melioidosis', 'Ashdown medium',
      'Elizabethkingia meningoseptica', 'Shewanella putrefaciens', 'Cystic fibrosis (CF)'
    ],
    pointsToRemember: {
      vi: [
        'Vi khuẩn không lên men (Nonfermenters) không làm acid hóa phần đáy thạch TSI (đáy giữ nguyên màu đỏ K/K).',
        'Pseudomonas aeruginosa là loài duy nhất sản xuất sắc tố xanh pyocyanin (kết hợp với pyoverdin tạo màu xanh lá ánh kim). Mọc được ở 42°C, có mùi thơm hoa quả hoặc mùi nho ngọt do 2-aminoacetophenone.',
        'Acinetobacter baumannii là cầu trực khuẩn Gram âm bất động, oxidase (-), có thể kháng hầu hết kháng sinh kể cả carbapenem (CRAB). Thường chỉ còn nhạy với Colistin và Tigecycline.',
        'Stenotrophomonas maltophilia là trực khuẩn oxidase (-), DNase (+), thủy phân esculin (+). Có enzyme metallo-beta-lactamase L1 và cephalosporinase L2 tự nhiên khiến nó KHÁNG HOÀN TOÀN với tất cả Carbapenem (Imipenem, Meropenem). Kháng sinh lựa chọn hàng đầu là Trimethoprim-sulfamethoxazole (Bactrim/SXT).',
        'Burkholderia pseudomallei (tác nhân bệnh Melioidosis): Phổ biến tại Đông Nam Á (Việt Nam, Thái Lan), tạo khuẩn lạc nhăn nheo màu hồng đậm trên thạch Ashdown, có mùi đất ẩm. Là tác nhân an toàn sinh học BSL-3 nguy hiểm.',
        'Elizabethkingia meningoseptica là trực khuẩn Gram âm không lên men hiếm hoi có khả năng nhạy cảm với Vancomycin, gây viêm màng não và nhiễm khuẩn huyết sơ sinh.'
      ],
      en: [
        'Nonfermenters fail to acidify the butt of TSI/KIA agar (K/K alkaline butt).',
        'P. aeruginosa produces pyocyanin and pyoverdin, grows at 42°C, and emits a grape-like odor.',
        'A. baumannii is a nonmotile, oxidase-negative coccobacillus, often carbapenem-resistant (CRAB).',
        'S. maltophilia is oxidase negative, DNase positive, intrinsically resistant to carbapenems; SXT is the drug of choice.',
        'B. pseudomallei causes melioidosis, forming wrinkled colonies with an earthy odor on Ashdown agar (BSL-3).',
        'Elizabethkingia meningoseptica is an unusual Gram-negative rod that is susceptible to vancomycin.'
      ]
    },
    clinicalPearls: {
      vi: [
        'Sai lầm điều trị Stenotrophomonas maltophilia: Dùng Carbapenem (Meropenem/Imipenem) cho bệnh nhân nhiễm trùng S. maltophilia là một sai lầm chết người vì vi khuẩn kháng tự nhiên 100% qua men metallo-beta-lactamase L1. Luôn dùng Bactrim (SXT) làm thuốc đầu tay!',
        'Bệnh nhân xơ nang phổi (Cystic Fibrosis): Khi cấy đờm thấy P. aeruginosa tiết dịch nhầy dính khổng lồ (alginate) hoặc B. cepacia complex, tiên lượng chức năng phổi suy giảm rất nhanh.'
      ],
      en: [
        'Treatment pitfall: Prescribing carbapenems for S. maltophilia is contraindicated due to intrinsic metallo-beta-lactamase; SXT is mandatory.',
        'Cystic fibrosis pearl: Overproduction of alginate slime by mucoid P. aeruginosa correlates with severe chronic pulmonary destruction.'
      ]
    },
    tables: [
      {
        id: 'box_21_2',
        title: {
          vi: 'Hộp 21.2: Các đặc điểm sắc tố, hình thái và mùi đặc trưng của vi khuẩn không lên men',
          en: 'Box 21.2: Characteristic Features of Nonfermenters'
        },
        headers: ['Đặc điểm nhận diện', 'Các loài vi khuẩn điển hình'],
        rows: [
          ['Sắc tố vàng (Yellow pigment)', 'Chryseobacterium, Elizabethkingia, Sphingomonas paucimobilis, P. luteola, P. stutzeri (vàng nhạt)'],
          ['Sắc tố xanh lá/xanh lam (Blue-green)', 'Pseudomonas aeruginosa (kết hợp Pyocyanin + Pyoverdin)'],
          ['Sắc tố tím hoa cà / hồng (Pink/Purple)', 'Roseomonas (hồng nhầy), Methylobacterium (hồng san hô), Acinetobacter (ánh tím trên MAC)'],
          ['Sắc tố oải hương / xám xanh trên thạch máu', 'Stenotrophomonas maltophilia (lavender-green)'],
          ['Khuẩn lạc nhăn nheo (Wrinkled colonies)', 'Pseudomonas stutzeri, Burkholderia pseudomallei, Pseudomonas oryzihabitans'],
          ['Mùi đặc trưng (Characteristic odor)', 'P. aeruginosa (mùi nho ngọt/hoa quả), Alcaligenes faecalis (mùi táo ngọt), Eikenella (mùi thuốc tẩy javel)'],
          ['Bất động (Nonmotile)', 'Acinetobacter spp., Moraxella spp., Elizabethkingia, Oligella'],
          ['Oxidase âm tính', 'Acinetobacter spp., Stenotrophomonas maltophilia, P. luteola, P. oryzihabitans, Burkholderia cepacia (chậm/yếu)'],
          ['Sinh H2S trên TSI', 'Shewanella putrefaciens (khuẩn lạc nâu nhầy, oxidase +)']
        ]
      }
    ]
  },
  {
    chapterNumber: 22,
    title: {
      vi: 'Chương 22: Vi Khuẩn Kỵ Khí Có Ý Nghĩa Lâm Sàng (Anaerobic Bacteriology)',
      en: 'Chapter 22: Anaerobes of Clinical Importance'
    },
    authors: 'Robert C. Fader',
    outline: {
      vi: [
        'Định nghĩa và cơ chế nhạy cảm oxy: Thiếu Superoxide dismutase và Catalase, gốc tự do hydroxyl (.OH)',
        'Vi khuẩn kỵ khí sinh bào tử: Clostridium perfringens (hoại thư sinh hơi, tan máu 2 vòng kép, lecithinase +), C. tetani (uốn ván, bào tử tròn tận cùng như dùi trống), C. botulinum (ngộ độc thịt, liệt mềm), Clostridioides difficile (viêm đại tràng giả mạc, thạch CCFA huỳnh quang lục)',
        'Trực khuẩn Gram âm kỵ khí: Nhóm Bacteroides fragilis (chiếm 60% nhiễm trùng kỵ khí, kháng 20% mật, thạch BBE đen, kháng Vancomycin/Kanamycin/Colistin), Prevotella (sắc tố nâu đen, huỳnh quang đỏ gạch), Porphyromonas (nhạy vancomycin), Fusobacterium nucleatum (hình thoi đầu nhọn, huỳnh quang lục chartreuse)',
        'Cầu khuẩn kỵ khí: Peptostreptococcus anaerobius (nhạy đĩa SPS), Peptoniphilus asaccharolyticus (Indole +), Veillonella (cầu khuẩn Gram âm, huỳnh quang đỏ)',
        'Trực khuẩn Gram dương không sinh bào tử: Cutibacterium acnes (catalase +, indole +), Actinomyces israelii (u hạt dò mủ có hạt lưu huỳnh sulfur granules, khuẩn lạc răng hàm molar tooth)'
      ],
      en: [
        'Mechanisms of oxygen toxicity: Lack of superoxide dismutase/catalase, hydroxyl radicals',
        'Spore-forming anaerobes: C. perfringens (gas gangrene, double-zone hemolysis, lecithinase+), C. tetani, C. botulinum, C. difficile (CCFA agar, toxin A/B)',
        'Anaerobic GNB: Bacteroides fragilis group (BBE black colonies, bile resistant), Prevotella (brick-red fluorescence), Porphyromonas, Fusobacterium',
        'Anaerobic cocci: Peptostreptococcus anaerobius (SPS disk sensitive), Veillonella',
        'Non-spore-forming GPB: Cutibacterium acnes (catalase+, indole+), Actinomyces israelii (sulfur granules, molar-tooth colony)'
      ]
    },
    keyTerms: [
      'Superoxide dismutase', 'Hydroxyl radical', 'Exogenous vs Endogenous', 'Gas gangrene (myonecrosis)',
      'Double zone beta-hemolysis', 'Tetanospasmin', 'Botulinum toxin', 'Pseudomembranous colitis',
      'Bacteroides bile esculin (BBE)', 'KVLB agar', 'Egg yolk agar (EYA)', 'Lecithinase vs Lipase',
      'Brick red fluorescence', 'Chartreuse fluorescence', 'SPS disk', 'Sulfur granules', 'Molar tooth colony'
    ],
    pointsToRemember: {
      vi: [
        'Vi khuẩn kỵ khí thiếu superoxide dismutase và/hoặc catalase, khiến chúng dễ bị phá hủy bởi gốc tự do superoxide anion và hydroxyl radical.',
        'Bệnh phẩm KHÔNG ĐƯỢC cấy kỵ khí: Phết họng, đờm khạc, que quệt bề mặt da/vết loét hở, phân (trừ tìm C. difficile), nước tiểu lấy qua bàng quang hoặc sonde tiểu thông thường.',
        'Bacteroides fragilis group là vi khuẩn kỵ khí phân lập nhiều nhất trong ổ bụng và máu: Mọc mạnh trên thạch BBE tạo khuẩn lạc xám đen có tủa (thủy phân esculin + chịu 20% mật), kháng cả 3 đĩa kháng sinh định danh Kanamycin, Vancomycin và Colistin (R-R-R).',
        'Clostridium perfringens: Trực khuẩn Gram dương to hình toa tàu (boxcar), tan máu beta 2 vòng kép trên thạch máu kỵ khí, dương tính với lecithinase trên thạch lòng đỏ trứng EYA (tạo quầng trắng đục trong thạch).',
        'Thử nghiệm đĩa phân biệt nhanh: Peptostreptococcus anaerobius nhạy cảm với đĩa Sodium Polyanethol Sulfonate (SPS ≥12mm); Cutibacterium acnes catalase (+) và spot indole (+).',
        'Phát huỳnh quang dưới tia cực tím 366nm: Prevotella và Porphyromonas huỳnh quang ĐỎ GẠCH (brick red); Fusobacterium nucleatum và Clostridioides difficile huỳnh quang VÀNG LỤC (chartreuse).'
      ],
      en: [
        'Anaerobes lack SOD and catalase, making them susceptible to lethal hydroxyl radicals.',
        'Unacceptable anaerobic specimens: Expectorated sputum, throat swabs, superficial swabs, voided urine.',
        'Bacteroides fragilis group: Bile resistant, black colonies on BBE agar, resistant to Kanamycin, Vancomycin, Colistin (R-R-R).',
        'C. perfringens: Large boxcar Gram-positive rods, double zone of beta-hemolysis, lecithinase positive on EYA.',
        'SPS disk differentiates Peptostreptococcus anaerobius (susceptible); Cutibacterium acnes is catalase+ and spot indole+.',
        'Fluorescence under UV 366nm: Prevotella/Porphyromonas show brick red; Fusobacterium and C. difficile show chartreuse.'
      ]
    },
    clinicalPearls: {
      vi: [
        'Đặc điểm phân biệt Lecithinase và Lipase trên thạch lòng đỏ trứng (EYA): Lecithinase tạo quầng trắng đục ngấm sâu trong thạch bao quanh khuẩn lạc (như C. perfringens). Lipase tạo lớp màng óng ánh nhiều màu như váng dầu xăng trên bề mặt khuẩn lạc (như F. necrophorum, C. botulinum).',
        'Viêm đại tràng màng giả (CDAD): Bệnh nhân sau dùng kháng sinh phổ rộng (Clindamycin, Cephalosporin, Fluoroquinolone) bị tiêu chảy tóe nước có mùi chuồng ngựa -> Xét nghiệm phân tìm độc tố Toxin A/B hoặc gen qua NAAT.'
      ],
      en: [
        'EYA differentiation: Lecithinase creates an opaque white precipitate within agar; Lipase creates an iridescent multicolored sheen on the colony surface.',
        'C. difficile colitis follows broad-spectrum antibiotic therapy; diagnosed via stool Toxin A/B EIA or NAAT.'
      ]
    },
    tables: [
      {
        id: 'table_22_12',
        title: {
          vi: 'Bảng 22.12: Diễn giải kết quả bộ 3 đĩa kháng sinh định danh vi khuẩn kỵ khí (Vancomycin 5µg, Kanamycin 1000µg, Colistin 10µg)',
          en: 'Table 22.12: Interpretation of Special Potency Antimicrobial Disks for Anaerobes'
        },
        headers: ['Vancomycin (5 µg)', 'Kanamycin (1000 µg)', 'Colistin (10 µg)', 'Gợi ý định danh sơ bộ'],
        rows: [
          ['S', 'V', 'R', 'Trực khuẩn Gram dương (Clostridium ramosum/clostridioforme); nếu Kanamycin kháng thì nghĩ tới Porphyromonas'],
          ['S', 'R', 'R', 'Porphyromonas spp. (cầu trực khuẩn kỵ khí sắc tố)'],
          ['R', 'R', 'R', 'Bacteroides fragilis group (hoặc Prevotella/Parabacteroides)'],
          ['R', 'R', 'V / S', 'Prevotella spp.'],
          ['R', 'S', 'S', 'Fusobacterium spp., Campylobacter ureolyticus, Bilophila wadsworthia, hoặc Veillonella']
        ]
      }
    ]
  },
  {
    chapterNumber: 23,
    title: {
      vi: 'Chương 23: Xoắn Khuẩn Gây Bệnh (Treponema, Borrelia & Leptospira)',
      en: 'Chapter 23: The Spirochetes'
    },
    authors: 'A. Christian Whelen',
    outline: {
      vi: [
        'Đặc điểm hình thể: Vi khuẩn xoắn lò xo, di động bằng sợi trục nội bào (periplasmic flagella)',
        'Treponema pallidum subsp. pallidum (Giang mai): 3 giai đoạn (Săng giang mai săng chancre cứng không đau -> Ban đào lòng bàn tay bàn chân -> Gôm giang mai, tổn thương thần kinh, tim mạch); Giang mai bẩm sinh',
        'Chẩn đoán huyết thanh giang mai: Test không đặc hiệu tìm kháng thể reagin (VDRL, RPR dùng kháng nguyên cardiolipin) vs Test đặc hiệu kháng thể treponema (TP-PA, FTA-ABS, EIA)',
        'Borrelia burgdorferi: Bệnh Lyme lây qua ve Ixodes, ban đỏ mục tiêu di chuyển (Erythema migrans), chẩn đoán 2 bước (EIA -> Western blot)',
        'Borrelia recurrentis: Sốt hồi quy lây qua rận hoặc ve mềm Ornithodoros, biến đổi kháng nguyên bề mặt trốn miễn dịch, quan sát trực tiếp trên phết máu nhuộm Giemsa',
        'Leptospira interrogans: Bệnh Leptospirosis lây qua nước/bùn nhiễm nước tiểu chuột/thú nuôi, thể nặng suy gan thận sốc xuất huyết (Hội chứng Weil), xoắn chặt 2 đầu uốn cong hình móc câu'
      ],
      en: [
        'Spirochete morphology: Helical cells with periplasmic flagella',
        'Treponema pallidum (Syphilis): Primary chancre, secondary rash on palms/soles, tertiary gummas/neurosyphilis, congenital syphilis',
        'Syphilis serology: Nontreponemal (VDRL, RPR) vs Treponemal confirmatory tests (TP-PA, FTA-ABS)',
        'Borrelia burgdorferi (Lyme disease): Ixodes tick, erythema migrans, two-tiered serology (EIA then Western blot)',
        'Borrelia recurrentis: Relapsing fever, antigenic variation, seen directly in blood smear',
        'Leptospira interrogans: Leptospirosis, Weil disease, hooked ends, darkfield microscopy'
      ]
    },
    keyTerms: [
      'Periplasmic flagella', 'Chancre', 'VDRL', 'RPR', 'Cardiolipin', 'TP-PA', 'FTA-ABS',
      'Neurosyphilis', 'Erythema migrans (EM)', 'Two-tiered testing', 'Western blot',
      'Relapsing fever', 'Antigenic variation', 'Leptospirosis', 'Weil disease', 'Hooked ends'
    ],
    pointsToRemember: {
      vi: [
        'Treponema pallidum không nuôi cấy được trên môi trường nhân tạo. Chẩn đoán giang mai giai đoạn 1 dựa vào soi kính hiển vi nền đen (dark-field) tìm xoắn khuẩn di động lượn sóng từ dịch tiết săng.',
        'Huyết thanh học giang mai: Test không đặc hiệu (RPR, VDRL) dùng để sàng lọc và theo dõi đáp ứng điều trị (hiệu giá giảm sau điều trị khỏi). Test đặc hiệu (TP-PA, FTA-ABS) dùng để khẳng định và tồn tại dương tính suốt đời.',
        'Bệnh Lyme do Borrelia burgdorferi: Chẩn đoán chuẩn quy tắc 2 bước (two-tiered approach): Bước 1 sàng lọc bằng EIA/IFA; nếu dương tính hoặc nghi ngờ chuyển sang Bước 2 Western blot (IgM cần 2/3 băng 24, 39, 41 kDa; IgG cần 5/10 băng).',
        'Sốt hồi quy (Borrelia recurrentis) là bệnh xoắn khuẩn DUY NHẤT có thể nhìn thấy trực tiếp trên phết máu ngoại vi nhuộm Giemsa hoặc Wright dưới kính hiển vi quang học thông thường.',
        'Leptospira có 2 đầu uốn cong hình móc câu đặc trưng, lây nhiễm qua vết trầy xước tiếp xúc nước ô nhiễm nước tiểu chuột, chó, heo. Thể nặng nhất là hội chứng Weil (vàng da, suy thận, xuất huyết phổi).'
      ],
      en: [
        'T. pallidum cannot be cultivated in cell-free media; darkfield microscopy shows primary chancre motile spirochetes.',
        'Syphilis serology: Nontreponemal (RPR/VDRL) for screening and monitoring treatment; Treponemal (TP-PA/FTA-ABS) for confirmation.',
        'Lyme disease requires two-tiered testing: sensitive screening EIA followed by Western blot confirmation.',
        'Relapsing fever is the only spirochetal illness visible directly in blood smears stained with Giemsa/Wright.',
        'Leptospira exhibits hooked ends, transmitted via animal urine in water; severe disease manifests as Weil disease.'
      ]
    },
    clinicalPearls: {
      vi: [
        'Ban giang mai thời kỳ 2: Xuất hiện ban hồng giác sẩn ở cả lòng bàn tay và lòng bàn chân (rất hiếm bệnh ngoài da có đặc điểm này) kèm nổi hạch toàn thân và mảng niêm mạc chứa đầy xoắn khuẩn cực kỳ lây nhiễm.',
        'Phản ứng Jarisch-Herxheimer: Sau liều tiêm Penicillin đầu tiên điều trị giang mai hoặc doxycycline điều trị sốt hồi quy, bệnh nhân có thể sốt rét run dữ dội tụt huyết áp do giải phóng ồ ạt nội độc tố từ xoắn khuẩn bị tiêu diệt.'
      ],
      en: [
        'Secondary syphilis rash characteristically involves the palms and soles, accompanied by generalized lymphadenopathy.',
        'Jarisch-Herxheimer reaction occurs within hours after antimicrobial therapy due to sudden release of endotoxin from dying spirochetes.'
      ]
    },
    tables: []
  },
  {
    chapterNumber: 24,
    title: {
      vi: 'Chương 24: Chlamydia, Rickettsia & Các Vi Khuẩn Tương Tự',
      en: 'Chapter 24: Chlamydia, Rickettsia, and Similar Organisms'
    },
    authors: 'Donald C. Lehman, Connie R. Mahon',
    outline: {
      vi: [
        'Đặc điểm vi khuẩn ký sinh nội bào bắt buộc (Obligate intracellular)',
        'Họ Chlamydiaceae: Thể cơ bản (Elementary body - EB lây nhiễm) và Thể lưới (Reticulate body - RB nhân lên). Chlamydia trachomatis (Serovar A-C đau mắt hột mù lòa; D-K nhiễm trùng niệu sinh dục, viêm kết mạc thể vùi; L1-L3 hột xoài LGV); Chlamydophila pneumoniae (viêm phổi không điển hình TWAR); C. psittaci (sốt vẹt)',
        'Họ Rickettsiaceae: Rickettsia rickettsii (Sốt phát ban núi Rocky RMSF do ve chó Dermacentor, ban lòng bàn tay/chân, viêm mạch máu hoại tử); Rickettsia prowazekii (sốt phát ban dịch tễ do rận người, bệnh Brill-Zinsser tái phát); Orientia tsutsugamushi (sốt mò do ấu trùng mò chigger, vết loét hoại tử đáy đen tache noire)',
        'Anaplasmataceae: Ehrlichia chaffeensis (HME ký sinh bạch cầu đơn nhân, thể morulae) & Anaplasma phagocytophilum (HGA ký sinh bạch cầu hạt)',
        'Coxiella burnetii: Sốt Q (Query fever), cấu trúc giống bào tử chịu nhiệt, lây qua hít bụi dịch đẻ/sữa chưa tiệt trùng của gia súc'
      ],
      en: [
        'Obligate intracellular parasites',
        'Chlamydiaceae: Elementary body (infectious EB) vs Reticulate body (replicative RB). C. trachomatis serovars A-C (trachoma), D-K (STD), L1-L3 (LGV)',
        'Rickettsia: R. rickettsii (RMSF), R. prowazekii (epidemic typhus, Brill-Zinsser), Orientia tsutsugamushi (scrub typhus, tache noire eschar)',
        'Ehrlichia (monocytes, morulae) and Anaplasma (granulocytes, morulae)',
        'Coxiella burnetii: Q fever, spore-like resistance, transmitted via livestock birth fluids'
      ]
    },
    keyTerms: [
      'Obligate intracellular', 'Elementary body (EB)', 'Reticulate body (RB)', 'Trachoma', 'LGV (Buboes)',
      'NAAT', 'MOMP', 'RMSF (Dermacentor)', 'Tache noire', 'Brill-Zinsser disease', 'Morulae', 'Q fever'
    ],
    pointsToRemember: {
      vi: [
        'Chlamydiaceae có chu kỳ nhân lên độc nhất: Thể cơ bản (EB) nhỏ, bền vững ngoài môi trường, có tính lây nhiễm; sau khi xâm nhập tế bào biểu mô chuyển thành Thể lưới (RB) chuyển hóa phân chia bằng trực phân trong 24h, rồi cô đặc lại thành EB phá vỡ tế bào sau 35-40h.',
        'C. trachomatis serovar A, B, Ba, C gây bệnh đau mắt hột (trachoma) - nguyên nhân hàng đầu gây mù lòa phòng ngừa được; serovar D-K gây viêm niệu đạo không do lậu (NGU), viêm cổ tử cung, viêm vòi trứng vô sinh; serovar L1-L3 gây bệnh u hạt hoa liễu (LGV) với hạch bẹn sưng vỡ mủ (buboes).',
        'NAAT (PCR, TMA) là tiêu chuẩn vàng chẩn đoán C. trachomatis nhờ độ nhạy và đặc hiệu >95%, lấy bệnh phẩm nước tiểu đầu dòng không xâm lấn.',
        'Rickettsia rickettsii gây sốt phát ban Rocky Mountain (RMSF) qua vết cắn của ve chó Dermacentor, ban xuất hiện ở cổ tay, mắt cá chân lan vào lòng bàn tay bàn chân, gây viêm nội mô mạch máu nặng.',
        'Orientia tsutsugamushi gây sốt mò (Scrub typhus) do ấu trùng mò Leptotrombidium đốt, tạo vết loét hoại tử có vảy đen điển hình (tache noire / eschar).',
        'Ehrlichia chaffeensis tạo các đám vi khuẩn hình dâu tằm (morulae) trong bào tương bạch cầu đơn nhân (monocyte); Anaplasma phagocytophilum tạo morulae trong bạch cầu hạt (granulocyte).',
        'Coxiella burnetii (Sốt Q): Kháng nhiệt và khô hạn nhờ cấu trúc giống bào tử, lây qua hít phải dịch ối khô khi gia súc sinh đẻ.'
      ],
      en: [
        'Chlamydia life cycle: Infectious elementary body (EB) vs replicative reticulate body (RB).',
        'C. trachomatis serovars A-C cause trachoma; D-K cause genital tract infections; L1-L3 cause LGV.',
        'NAAT is the gold standard for C. trachomatis detection.',
        'R. rickettsii causes RMSF transmitted by Dermacentor ticks; rash involves palms and soles.',
        'Orientia tsutsugamushi causes scrub typhus with characteristic black eschar (tache noire).',
        'Ehrlichia forms morulae in monocytes; Anaplasma forms morulae in granulocytes.',
        'Coxiella burnetii causes Q fever, highly infectious via aerosols from livestock birthing tissues.'
      ]
    },
    clinicalPearls: {
      vi: [
        'Viêm phổi sơ sinh do Chlamydia trachomatis: Trẻ 2-6 tuần tuổi ho từng cơn dạng ngắt quãng (staccato cough) không sốt, tiền sử viêm kết mạc sau sinh, bạch cầu ái toan máu tăng cao.',
        'Tìm vảy đen sốt mò: Bệnh nhân sốt cao kéo dài không rõ nguyên nhân ở vùng nhiệt đới, luôn phải khám kỹ các nếp gấp kín (bẹn, nách, bìu, dưới nếp vú) để tìm vết loét vảy đen tache noire không đau của ấu trùng mò đốt.'
      ],
      en: [
        'Infant pneumonia caused by C. trachomatis typically presents at 2-6 weeks with a staccato cough, tachypnea, and eosinophilia without fever.',
        'In FUO in endemic regions, thoroughly examine intertriginous areas (groin, axilla) for the painless black eschar of scrub typhus.'
      ]
    },
    tables: [
      {
        id: 'table_24_2',
        title: {
          vi: 'Bảng 24.2: Phân biệt các loài thuộc họ Chlamydiaceae',
          en: 'Table 24.2: Initial Differentiation of Chlamydiaceae Species'
        },
        headers: ['Đặc điểm', 'Chlamydia trachomatis', 'Chlamydophila pneumoniae', 'Chlamydophila psittaci'],
        rows: [
          ['Hình thái thể vùi (Inclusions)', 'Hình tròn, có không bào', 'Hình tròn, đặc', 'Hình dạng thay đổi, đặc'],
          ['Tích tụ Glycogen trong thể vùi', '+ (bắt màu iod)', '-', '-'],
          ['Hình thái thể cơ bản (EB)', 'Hình tròn', 'Hình quả lê (pear-shaped)', 'Hình tròn'],
          ['Nhạy cảm Sulfonamide', 'Nhạy (+)', 'Kháng (-)', 'Kháng (-)'],
          ['Vật chủ tự nhiên', 'Người', 'Người', 'Chim, gia cầm, thú'],
          ['Bệnh cảnh lâm sàng chính', 'Đau mắt hột, Lậu mủ, LGV, Viêm phổi sơ sinh', 'Viêm phổi không điển hình, viêm phế quản', 'Sốt vẹt (Psittacosis), viêm phổi hít gia cầm']
        ]
      }
    ]
  },
  {
    chapterNumber: 25,
    title: {
      vi: 'Chương 25: Mycoplasma và Ureaplasma (Vi Khuẩn Không Có Vách Tế Bào)',
      en: 'Chapter 25: Mycoplasma and Ureaplasma'
    },
    authors: 'Donald C. Lehman, Connie R. Mahon',
    outline: {
      vi: [
        'Đặc điểm lớp Mollicutes: Sinh vật tự sao chép nhỏ nhất, hoàn toàn không có vách tế bào peptidoglycan, màng tế bào chứa sterol/cholesterol',
        'Kháng tự nhiên hoàn toàn với nhóm Beta-lactam (Penicillin, Cephalosporin), không nhuộm được bằng Gram',
        'Mycoplasma pneumoniae: Viêm phổi không điển hình tiên phát (walking pneumonia), bám vào lông chuyển biểu mô đường thở, khuẩn lạc hình trứng ốp lết (fried egg), ngưng kết lạnh (cold agglutinins)',
        'Mycoplasma hominis & Ureaplasma urealyticum: Nhiễm trùng niệu sinh dục, viêm niệu đạo không do lậu NGU, viêm màng não và bệnh phổi mạn tính ở trẻ sinh non cực nhẹ cân (<1.5 kg)',
        'Môi trường nuôi cấy chuyên biệt: SP4, Shepherd 10B, thạch A8, đổi màu chỉ thị pH phenol red (M. pneumoniae sinh acid từ glucose, M. hominis thủy phân arginine tạo kiềm, Ureaplasma thủy phân ure)'
      ],
      en: [
        'Mollicutes characteristics: Smallest self-replicating organisms, lack peptidoglycan cell wall, require sterols',
        'Intrinsic resistance to all beta-lactams; invisible on Gram stain',
        'Mycoplasma pneumoniae: Walking pneumonia, attaches to respiratory cilia, fried egg colonies, cold agglutinins',
        'M. hominis and Ureaplasma urealyticum: Genital infections, neonatal meningitis and chronic lung disease in low-birth-weight preterm infants',
        'Special culture media: SP4, 10B broth, A8 agar; pH shifts (glucose, arginine, urea)'
      ]
    },
    keyTerms: [
      'Mollicutes', 'Cell wall deficient', 'Sterols/Cholesterol', 'Fried egg colony',
      'Walking pneumonia', 'Cold agglutinins', 'T-strain mycoplasma', 'U9B urease test',
      'Dienes stain', 'SP4 medium', 'Preterm neonatal meningitis'
    ],
    pointsToRemember: {
      vi: [
        'Mollicutes vĩnh viễn không có vách tế bào peptidoglycan; do đó chúng KHÁNG TỰ NHIÊN với mọi kháng sinh ức chế tổng hợp vách (Penicillin, Cephalosporin, Carbapenem, Vancomycin).',
        'M. pneumoniae là nguyên nhân gây ra khoảng 20% các ca viêm phổi trong cộng đồng ("viêm phổi đi bộ" walking pneumonia), hay gặp ở thanh thiếu niên và môi trường tập thể kín (trường học, doanh trại quân đội).',
        'M. pneumoniae cần glucose để sinh năng lượng (làm vàng môi trường SP4); M. hominis chuyển hóa arginine làm kiềm hóa môi trường đỏ hơn; Ureaplasma urealyticum thủy phân ure làm kiềm hóa môi trường 10B trong 24h.',
        'Ureaplasma spp. (trước đây gọi là T-strain vì tạo khuẩn lạc siêu nhỏ "tiny") trên thạch U9B chứa muối mangan tạo khuẩn lạc màu nâu đen do lắng đọng mangan dioxide.',
        'Ở trẻ sơ sinh non yếu, cực nhẹ cân (<1.5 kg) có triệu chứng viêm màng não nhưng dịch não tủy soi không thấy vi khuẩn và cấy thường quy âm tính, phải nghĩ ngay đến M. hominis hoặc U. urealyticum.'
      ],
      en: [
        'Mollicutes permanently lack a cell wall; intrinsically resistant to all beta-lactams and vancomycin.',
        'M. pneumoniae causes community-acquired walking pneumonia in school-age children and young adults.',
        'M. pneumoniae utilizes glucose (acid shift), M. hominis utilizes arginine (alkaline shift), Ureaplasma hydrolyzes urea (rapid alkaline shift).',
        'Ureaplasma forms tiny colonies with brown manganese dioxide precipitate on U9B agar.',
        'In low-birth-weight neonates with sterile CSF on routine Gram stain/culture, consider M. hominis or Ureaplasma.'
      ]
    },
    clinicalPearls: {
      vi: [
        'Kháng sinh điều trị Mycoplasma: Lựa chọn hàng đầu là Macrolide (Azithromycin) hoặc Doxycycline (người lớn), Fluoroquinolone hô hấp (Levofloxacin/Moxifloxacin). Lưu ý M. hominis thường kháng tự nhiên với Macrolide 14-carbon (Erythromycin) nhưng nhạy với Clindamycin!',
        'Ureaplasma thì ngược lại: Nhạy cảm với Erythromycin nhưng kháng với Clindamycin.'
      ],
      en: [
        'Antibiotic selection: Macrolides (azithromycin) or doxycycline. Note that M. hominis is intrinsically resistant to erythromycin but susceptible to clindamycin.',
        'Conversely, Ureaplasma is susceptible to erythromycin but resistant to clindamycin.'
      ]
    },
    tables: [
      {
        id: 'table_25_2',
        title: {
          vi: 'Bảng 25.2: Đặc điểm so sánh các chi thuộc lớp Mollicutes',
          en: 'Table 25.2: Characteristics of Genera in Class Mollicutes'
        },
        headers: ['Đặc điểm', 'Mycoplasma', 'Ureaplasma', 'Acholeplasma'],
        rows: [
          ['Thiếu vách tế bào', '+', '+', '+'],
          ['Nhuộm Gram', 'Không bắt màu (-)', 'Không bắt màu (-)', 'Không bắt màu (-)'],
          ['Nhạy cảm Penicillin', 'Kháng tự nhiên (-)', 'Kháng tự nhiên (-)', 'Kháng tự nhiên (-)'],
          ['Hoạt tính Urease', '-', '+ (thủy phân ure)', '-'],
          ['Nhu cầu Sterol/Cholesterol', '+', '+', '- (không bắt buộc)'],
          ['Kích thước khuẩn lạc', '15 - 300 µm (hình trứng ốp lết)', 'Rất nhỏ (<15-50 µm, T-strain)', 'Hình trứng ốp lết nhỏ']
        ]
      }
    ]
  },
  {
    chapterNumber: 26,
    title: {
      vi: 'Chương 26: Mycobacterium tuberculosis và Trực Khuẩn Kháng Toan NTM',
      en: 'Chapter 26: Mycobacterium tuberculosis and Nontuberculous Mycobacteria'
    },
    authors: 'Donald Lehman',
    outline: {
      vi: [
        'Cấu trúc vách tế bào giàu lipid/acid mycolic: Tính kháng cồn kháng toan (Acid fastness), nhuộm Ziehl-Neelsen, Kinyoun và huỳnh quang Auramine-rhodamine',
        'Phức hợp Mycobacterium tuberculosis complex (MTBC): M. tuberculosis, M. bovis (BCG), M. africanum; bệnh lao phổi và lao ngoài phổi (lao màng não, lao cột sống Pott, lao kê)',
        'Chẩn đoán phòng xét nghiệm: Nồng độ mẫu đờm NALC-NaOH, thạch trứng Löwenstein-Jensen (LJ), thạch trong Middlebrook 7H10/7H11, hệ thống lỏng tự động MGIT/VersaTREK',
        'Thử nghiệm sinh hóa MTBC: Tích tụ Niacin (+), khử Nitrate (+), Catalase 68°C âm tính, Cord factor (tạo dải thừng bện xoắn)',
        'Phân loại Runyon cho NTM: Nhóm I Photochromogens (M. kansasii, M. marinum), Nhóm II Scotochromogens (M. scrofulaceum, M. gordonae), Nhóm III Nonphotochromogens (MAC M. avium/intracellulare), Nhóm IV Mọc nhanh (M. fortuitum, M. chelonae, M. abscessus)',
        'Mycobacterium leprae (Bệnh phong/Hansen): Không nuôi cấy được in vitro, phong củ (tuberculoid) vs phong u (lepromatous)',
        'Đề kháng kháng sinh lao: Phác đồ RHEZ, Lao đa kháng (MDR-TB: kháng INH + RIF), Lao siêu kháng (XDR-TB: MDR + Fluoroquinolone + thuốc tiêm hàng 2)'
      ],
      en: [
        'Mycolic acid-rich cell wall: Acid fastness, Ziehl-Neelsen, Kinyoun, Auramine-rhodamine fluorochrome stain',
        'M. tuberculosis complex (MTBC): Pulmonary and extrapulmonary TB (Pott disease, miliary TB)',
        'Processing: NALC-NaOH digestion-decontamination, LJ medium, Middlebrook 7H10/7H11, automated MGIT liquid culture',
        'Biochemicals for M. tuberculosis: Niacin accumulation+, nitrate reduction+, heat-stable catalase 68°C negative, cord factor',
        'Runyon classification: Group I Photochromogens, Group II Scotochromogens, Group III Nonphotochromogens (MAC), Group IV Rapid growers',
        'Mycobacterium leprae: Hansen disease, tuberculoid vs lepromatous',
        'Drug resistance: First-line RIF/INH/PZA/EMB, MDR-TB, XDR-TB'
      ]
    },
    keyTerms: [
      'Acid fastness (AFB)', 'Ziehl-Neelsen', 'Auramine-rhodamine', 'Cord factor',
      'Löwenstein-Jensen (LJ)', 'Middlebrook 7H11', 'MGIT 960', 'NALC-NaOH',
      'Niacin test', 'Nitrate reduction', 'Heat-stable catalase (68°C)', 'Pott disease',
      'Miliary TB', 'Runyon groups', 'Photochromogens', 'Scotochromogens', 'MDR-TB', 'XDR-TB'
    ],
    pointsToRemember: {
      vi: [
        'Vách tế bào Mycobacteria chứa đến 60% lipid và acid mycolic, ngăn thuốc nhuộm thông thường nhưng khi đã bắt carbolfuchsin sẽ kháng lại quá trình tẩy màu bằng cồn-acid (tính kháng acid).',
        'Nhuộm huỳnh quang Auramine-rhodamine nhạy hơn carbolfuchsin khoảng 18% và cho phép soi ở độ phóng đại nhỏ hơn (250x - 400x) giúp khảo sát 300 vi trường nhanh hơn.',
        'Mycobacterium tuberculosis tạo khuẩn lạc thô ráp, sần sùi, màu vàng da bò (buff-colored) sau 2-4 tuần trên thạch LJ, có yếu tố tạo dây thừng (cord factor). Sinh hóa đặc trưng: Niacin (+), Nitrate (+), Catalase ở 68°C (-).',
        'Phân biệt M. bovis với M. tuberculosis: M. bovis Niacin (-), Nitrate (-), nhạy cảm với T2H (thiophene-2-carboxylic acid hydrazide), pyrazinamidase (-).',
        'Phân loại Runyon vi khuẩn NTM: Photochromogens chỉ sinh sắc tố vàng cam khi tiếp xúc ánh sáng (M. kansasii, M. marinum); Scotochromogens sinh sắc tố cả trong tối lẫn ngoài sáng (M. scrofulaceum, M. gordonae); Nonphotochromogens không sinh sắc tố (M. avium complex - MAC, M. xenopi); Rapid growers mọc nhanh <7 ngày (M. fortuitum, M. chelonae, M. abscessus).',
        'M. marinum có nhiệt độ phát triển tối ưu thấp 28-32°C, gây u hạt bể bơi (swimming pool granuloma) khi tiếp xúc nước hồ bơi/bể cá cảnh.',
        'M. avium complex (MAC): NTM phổ biến nhất ở bệnh nhân HIV/AIDS khi tế bào CD4 <50/µL; khử Tellurite thành kim loại đen sau 3-4 ngày, chịu nhiệt 68°C catalase (+).',
        'M. leprae không thể nuôi cấy nhân tạo in vitro; chẩn đoán dựa vào phết rạch da soi trực tiếp tìm trực khuẩn kháng toan bằng Ziehl-Neelsen cải tiến (tẩy bằng H2SO4 10%).'
      ],
      en: [
        'Mycobacterial cell walls contain high lipid and mycolic acid content conferring acid fastness.',
        'Auramine-rhodamine fluorescent stain is ~18% more sensitive than carbolfuchsin.',
        'M. tuberculosis: Rough, buff-colored colonies with cording; niacin+, nitrate+, 68°C catalase negative.',
        'M. bovis is niacin negative, nitrate negative, and susceptible to T2H.',
        'Runyon classification divides NTM based on growth rate and photoreactivity (Photochromogens, Scotochromogens, Nonphotochromogens, Rapid growers).',
        'M. marinum grows optimally at 28-32°C, causing swimming pool granuloma.',
        'MAC is the primary NTM pathogen in advanced HIV/AIDS, reducing tellurite to black metallic tellurium.',
        'M. leprae cannot be grown in vitro; diagnosis relies on acid-fast skin biopsy smears.'
      ]
    },
    clinicalPearls: {
      vi: [
        'Quy tắc an toàn phòng xét nghiệm lao: Bắt buộc thao tác mẫu đờm trong tủ an toàn sinh học cấp II (Class II BSC), phòng áp lực âm với 6-12 lần trao đổi khí/giờ, đeo khẩu trang N95 đã được fit-test.',
        'Xử lý mẫu đờm chứa Pseudomonas: Ở bệnh nhân xơ nang (CF) hoặc giãn phế quản chứa nhiều P. aeruginosa, khử nhiễm đờm bằng dung dịch Acid Oxalic 5% hiệu quả tiêu diệt trực khuẩn mủ xanh tốt hơn NaOH thông thường.'
      ],
      en: [
        'Biosafety level 3 practices, Class II BSC, negative pressure room with 6-12 air changes/hr, and fit-tested N95 respirators are required for TB work.',
        'For sputum containing heavy Pseudomonas aeruginosa (e.g. cystic fibrosis patients), 5% oxalic acid decontamination is superior to NaOH.'
      ]
    },
    tables: [
      {
        id: 'box_26_4',
        title: {
          vi: 'Hộp 26.4: Phân loại tính nhạy sáng (Photoreactivity) của các loài Mycobacteria lâm sàng',
          en: 'Box 26.4: Photoreactivity Groups of Clinically Significant Mycobacteria'
        },
        headers: ['Nhóm quang phản ứng (Runyon)', 'Thời gian mọc', 'Các loài tiêu biểu'],
        rows: [
          ['Không sinh sắc tố (Nonchromogens)', 'Mọc chậm (>7 ngày)', 'M. tuberculosis, M. bovis, M. avium complex (MAC), M. gastri, M. ulcerans, M. xenopi (thường không sắc tố)'],
          ['Không sinh sắc tố (Nonchromogens)', 'Mọc nhanh (<7 ngày)', 'M. fortuitum group, M. chelonae, M. abscessus'],
          ['Quang sắc tố (Photochromogens - Vàng cam khi có ánh sáng)', 'Mọc chậm (>7 ngày)', 'M. kansasii, M. marinum (hồ bơi 30°C), M. simiae, M. asiaticum'],
          ['Ám sắc tố (Scotochromogens - Vàng cam cả trong tối và sáng)', 'Mọc chậm (>7 ngày)', 'M. scrofulaceum (viêm hạch cổ trẻ em), M. gordonae (khuẩn vòi nước tap-water), M. szulgai (37°C)'],
          ['Ám sắc tố (Scotochromogens)', 'Mọc nhanh (<7 ngày)', 'M. phlei, M. smegmatis group']
        ]
      }
    ]
  }
];

export const MAHON_CHAPTERS: ChapterSummary[] = [...BASE_MAHON_CHAPTERS, ...MAHON_CHAPTERS_PART2, ...MAHON_CHAPTERS_PART3];
