import { Pathogen } from '../types';

export const ADDITIONAL_PATHOGENS: Pathogen[] = [
  // 1. Staphylococcus epidermidis
  {
    id: 's_epidermidis',
    name: 'Staphylococcus epidermidis',
    scientificName: 'Staphylococcus epidermidis',
    commonName: {
      vi: 'Tụ cầu da (CoNS sinh Biofilm)',
      en: 'Staph epidermidis (CoNS Biofilm Producer)'
    },
    taxonomy: {
      domain: 'Bacteria',
      phylum: 'Bacillota',
      class: 'Bacilli',
      order: 'Bacillales',
      family: 'Staphylococcaceae',
      genus: 'Staphylococcus',
      species: 'S. epidermidis'
    },
    gramReaction: 'gram_positive',
    shape: 'cocci',
    arrangement: 'Clusters, pairs, single',
    oxygen: 'facultative_anaerobe',
    biosafetyLevel: 1,
    directSmearFeatures: {
      vi: 'Cầu khuẩn Gram dương hình cầu, 0.5 - 1.2 µm, xếp thành cụm hoặc đôi.',
      en: 'Gram-positive cocci in clusters or pairs, 0.5 - 1.2 µm.'
    },
    colony: {
      bloodAgar: 'Small to medium, circular, smooth, porcelain white or gray-white, usually nonhemolytic (gamma).',
      hemolysis: 'gamma',
      chocolateAgar: 'Abundant white-gray colonies.',
      macConkeyAgar: 'No growth.',
      otherMedia: 'Mannitol Salt Agar (MSA): Red (does not ferment mannitol, phenol red stays red).',
      pigment: 'White to grayish white',
      elevation: 'convex',
      margin: 'smooth',
      texture: 'creamy'
    },
    biochemicals: {
      catalase: '+',
      coagulase: '-',
      oxidase: '-',
      urease: '+',
      otherKeyTests: 'Novobiocin: Susceptible (zone ≥16 mm). Acid from Trehalose (-), Mannitol (-).'
    },
    virulenceFactors: {
      vi: [
        'Màng sinh học Biofilm (Polysaccharide intercellular adhesin - PIA & poly-gamma-DL-glutamic acid): Giúp bám dính chắc chắn trên bề mặt nhựa và kim loại, bảo vệ vi khuẩn khỏi kháng sinh và bạch cầu',
        'Khả năng đề kháng nhiều loại kháng sinh (tỷ lệ mang mecA rất cao >70-80% trong bệnh viện)'
      ],
      en: [
        'Biofilm / slime production (PIA and poly-gamma-DL-glutamic acid): adherence to catheters, shunts, prosthetic valves',
        'Multidrug resistance (high frequency of mecA-mediated methicillin resistance - MRSE)'
      ]
    },
    primaryToxins: ['Biofilm exopolysaccharide, delta-like hemolysins'],
    clinicalSignificance: {
      vi: 'Căn nguyên hàng đầu gây nhiễm khuẩn huyết liên quan ống thông mạch máu (catheter-related bloodstream infection), viêm nội tâm mạc van nhân tạo, nhiễm trùng khớp nhân tạo và shunt dẫn lưu não thất.',
      en: 'Leading cause of foreign-body infections: prosthetic valve endocarditis, catheter-related bacteremia, CNS shunt infections, and orthopedic implant infections.'
    },
    recommendedAntibiotics: {
      firstLine: ['Vancomycin (do tỷ lệ MRSE rất cao)', 'Daptomycin'],
      alternative: ['Linezolid', 'Rifampin (phối hợp để xuyên thấu biofilm)', 'Cefazolin/Nafcillin (chỉ khi MSSE)'],
      intrinsicResistance: ['Penicillin G (tiết penicillinase)']
    },
    clsiGroupNotes: {
      groupA: ['Penicillin', 'Cefoxitin (hoặc Oxacillin)'],
      groupB: ['Vancomycin', 'Gentamicin', 'Rifampin', 'Daptomycin'],
      groupC: ['Linezolid', 'Doxycycline']
    },
    diagnosticPitfalls: {
      vi: 'Thường là vi hệ bình thường trên da làm tạp nhiễm mẫu cấy máu. Chỉ kết luận là mầm bệnh khi phân lập được cùng 1 kiểu hình trong ≥2 bộ chai cấy máu lấy ở 2 vị trí khác nhau kèm triệu chứng lâm sàng.',
      en: 'Frequent skin contaminant in blood cultures; true bacteremia requires ≥2 positive sets with matching antibiograms.'
    },
    svgType: 'staph_cluster'
  },

  // 2. Staphylococcus saprophyticus
  {
    id: 's_saprophyticus',
    name: 'Staphylococcus saprophyticus',
    scientificName: 'Staphylococcus saprophyticus',
    commonName: {
      vi: 'Tụ cầu hoại sinh (Kháng Novobiocin, Viêm bàng quang trăng mật)',
      en: 'Staph saprophyticus (Novobiocin Resistant UTI)'
    },
    taxonomy: {
      domain: 'Bacteria',
      phylum: 'Bacillota',
      class: 'Bacilli',
      order: 'Bacillales',
      family: 'Staphylococcaceae',
      genus: 'Staphylococcus',
      species: 'S. saprophyticus'
    },
    gramReaction: 'gram_positive',
    shape: 'cocci',
    arrangement: 'Clusters, pairs',
    oxygen: 'facultative_anaerobe',
    biosafetyLevel: 1,
    directSmearFeatures: {
      vi: 'Cầu khuẩn Gram dương hình cầu, xếp thành cụm hoặc đôi.',
      en: 'Gram-positive cocci in clusters and pairs.'
    },
    colony: {
      bloodAgar: 'Medium size (slightly larger than S. epidermidis), nonhemolytic, 50% strains produce a yellow-creamy pigment.',
      hemolysis: 'gamma',
      chocolateAgar: 'White to creamy-yellow colonies.',
      macConkeyAgar: 'No growth.',
      otherMedia: 'MSA: Variable (may ferment mannitol weakly).',
      pigment: 'White or 50% yellow/cream',
      elevation: 'convex',
      margin: 'smooth',
      texture: 'creamy'
    },
    biochemicals: {
      catalase: '+',
      coagulase: '-',
      oxidase: '-',
      urease: '+',
      otherKeyTests: 'Novobiocin (5 µg disk): KHÁNG (Resistant, đường kính vô khuẩn <16 mm). Trehalose (+), Sucrose (+).'
    },
    virulenceFactors: {
      vi: [
        'Urease mạnh: Thủy phân ure kiềm hóa nước tiểu',
        'Protein bám dính đặc hiệu tế bào biểu mô đường niệu urogenital: UafA, SdrI'
      ],
      en: [
        'Potent urease activity',
        'Surface adhesins (UafA, SdrI) mediating adherence to uroepithelial cells'
      ]
    },
    primaryToxins: ['Urease enzyme, hemagglutinins'],
    clinicalSignificance: {
      vi: 'Là căn nguyên thứ hai (chỉ sau E. coli) gây nhiễm khuẩn đường tiết niệu cấp tính không biến chứng (viêm bàng quang, viêm niệu đạo) ở phụ nữ trẻ có hoạt động tình dục ("Honeymoon cystitis"). Số lượng khuẩn lạc thấp (<10,000 CFU/mL) vẫn có ý nghĩa bệnh lý.',
      en: 'Second most common cause of uncomplicated community-acquired UTIs (acute cystitis) in sexually active young women. Significant even at low colony counts (<10,000 CFU/mL).'
    },
    recommendedAntibiotics: {
      firstLine: ['Nitrofurantoin', 'Trimethoprim-sulfamethoxazole (Bactrim)', 'Fosfomycin'],
      alternative: ['Amoxicillin-clavulanate', 'Fluoroquinolones (Ciprofloxacin)'],
      intrinsicResistance: ['Novobiocin (đặc tính định danh)']
    },
    clsiGroupNotes: {
      groupA: ['Nitrofurantoin', 'Trimethoprim-sulfamethoxazole'],
      groupU: ['Fosfomycin', 'Ciprofloxacin']
    },
    diagnosticPitfalls: {
      vi: 'Thử nghiệm đĩa Novobiocin 5µg là test phân biệt kinh điển: S. saprophyticus KHÁNG (<16mm), trong khi đa số các tụ cầu CoNS khác đều NHẠY (≥16mm).',
      en: 'Novobiocin 5µg disk susceptibility distinguishes S. saprophyticus (R, <16 mm) from other CoNS (S, ≥16 mm).'
    },
    svgType: 'staph_cluster'
  },

  // 3. Staphylococcus lugdunensis
  {
    id: 's_lugdunensis',
    name: 'Staphylococcus lugdunensis',
    scientificName: 'Staphylococcus lugdunensis',
    commonName: {
      vi: 'Tụ cầu Lugdunensis (CoNS độc lực cao giống S. aureus)',
      en: 'Staph lugdunensis (Aggressive CoNS)'
    },
    taxonomy: {
      domain: 'Bacteria',
      phylum: 'Bacillota',
      class: 'Bacilli',
      order: 'Bacillales',
      family: 'Staphylococcaceae',
      genus: 'Staphylococcus',
      species: 'S. lugdunensis'
    },
    gramReaction: 'gram_positive',
    shape: 'cocci',
    arrangement: 'Clusters, pairs',
    oxygen: 'facultative_anaerobe',
    biosafetyLevel: 2,
    directSmearFeatures: {
      vi: 'Cầu khuẩn Gram dương hình cầu đứng cụm.',
      en: 'Gram-positive cocci in clusters.'
    },
    colony: {
      bloodAgar: 'Medium sized, often beta-hemolytic after 48h, yellowish/cream, distinct sweet bleach/hay odor.',
      hemolysis: 'beta',
      chocolateAgar: 'Abundant growth.',
      macConkeyAgar: 'No growth.',
      pigment: 'Cream to light golden',
      elevation: 'convex',
      margin: 'smooth',
      texture: 'creamy'
    },
    biochemicals: {
      catalase: '+',
      coagulase: '- (Tube test âm tính)',
      oxidase: '-',
      otherKeyTests: 'Slide coagulase / Clumping factor: DƯƠNG TÍNH (+). PYR: DƯƠNG TÍNH (+). Ornithine decarboxylase (ODC): DƯƠNG TÍNH (+).'
    },
    virulenceFactors: {
      vi: [
        'Độc lực cao tương tự S. aureus: Bám dính và phá hủy mô tim dữ dội',
        'Protein von Willebrand factor-binding, fibrinogen-binding'
      ],
      en: [
        'High virulence akin to S. aureus; causes rapid valve destruction',
        'Fibrinogen and von Willebrand factor-binding adhesins'
      ]
    },
    primaryToxins: ['Lugdunin (peptide kháng khuẩn), hemolysins'],
    clinicalSignificance: {
      vi: 'Gây viêm nội tâm mạc ác tính phá hủy van tim tự nhiên và van nhân tạo, tỷ lệ tử vong cao và thường đòi hỏi phẫu thuật thay van tim khẩn cấp. Gây nhiễm khuẩn huyết, viêm khớp mủ và nhiễm trùng vết mổ.',
      en: 'Causes unusually aggressive native and prosthetic valve endocarditis with rapid valve perforation, high mortality, often requiring emergency valve replacement surgery.'
    },
    recommendedAntibiotics: {
      firstLine: ['Oxacillin / Cefazolin (nếu MSSA-like)', 'Vancomycin / Daptomycin (nếu mecA+)'],
      alternative: ['Ceftriaxone', 'Rifampin'],
      intrinsicResistance: []
    },
    clsiGroupNotes: {
      groupA: ['Penicillin', 'Oxacillin (dùng điểm cắt MIC như S. aureus, khác với CoNS khác)'],
      groupB: ['Vancomycin', 'Gentamicin', 'Daptomycin']
    },
    diagnosticPitfalls: {
      vi: 'Dễ nhầm là S. aureus vì thử nghiệm Clumping factor trên lam kính DƯƠNG TÍNH (+) và tan máu beta! Bắt buộc dùng thử nghiệm Tube coagulase (âm tính), PYR (+) và Ornithine decarboxylase (+) để định danh chính xác.',
      en: 'Easily misidentified as S. aureus due to positive slide coagulase (clumping factor) and beta-hemolysis. Tube coagulase is negative; PYR and ODC are positive.'
    },
    svgType: 'staph_cluster'
  },

  // 4. Listeria monocytogenes
  {
    id: 'listeria_monocytogenes',
    name: 'Listeria monocytogenes',
    scientificName: 'Listeria monocytogenes',
    commonName: {
      vi: 'Trực khuẩn Listeria (Viêm màng não sơ sinh & thai phụ)',
      en: 'Listeria monocytogenes (Neonatal / Maternal Listeriosis)'
    },
    taxonomy: {
      domain: 'Bacteria',
      phylum: 'Bacillota',
      class: 'Bacilli',
      order: 'Bacillales',
      family: 'Listeriaceae',
      genus: 'Listeria',
      species: 'L. monocytogenes'
    },
    gramReaction: 'gram_positive',
    shape: 'coccobacilli',
    arrangement: 'Singles, short chains, palisades (V or L shapes)',
    oxygen: 'facultative_anaerobe',
    biosafetyLevel: 2,
    directSmearFeatures: {
      vi: 'Cầu trực khuẩn Gram dương ngắn, 0.5 x 1-2 µm, dễ nhầm với cầu khuẩn Streptococcus hoặc trực khuẩn dạng diphtheroid. Có thể bắt màu Gram biến thiên ở canh cấy già.',
      en: 'Short Gram-positive coccobacilli in pairs, short chains, or diphtheroid V/L palisades.'
    },
    colony: {
      bloodAgar: 'Small, round, smooth, translucent, surrounded by a narrow zone of beta-hemolysis (often only visible when colony is removed).',
      hemolysis: 'beta',
      chocolateAgar: 'Smooth, translucent colonies.',
      macConkeyAgar: 'No growth.',
      otherMedia: 'Oxford agar / PALCAM agar (selective for Listeria, black colonies due to esculin hydrolysis).',
      pigment: 'Translucent grayish-white',
      elevation: 'convex',
      margin: 'smooth',
      texture: 'creamy'
    },
    biochemicals: {
      catalase: '+',
      oxidase: '-',
      esculin: '+',
      hippurate: '+',
      bileEsculin: '+',
      otherKeyTests: 'Di động nhào lộn (Tumbling motility) ở 22-25°C, bất động ở 35°C. Thạch bán lỏng tạo hình dù xòe (Umbrella pattern) ở 25°C. CAMP test (+) hình khối vuông (block shape).'
    },
    virulenceFactors: {
      vi: [
        'Listeriolysin O (LLO): Phá vỡ màng phagosome, giúp vi khuẩn thoát vào bào tương đại thực bào',
        'Protein ActA: Trùng hợp actin của tế bào chủ tạo đuôi đẩy vi khuẩn lướt sang tế bào kế cận mà không ra ngoài gian bào',
        'Internalin A & B: Thúc đẩy xâm nhập tế bào biểu mô ruột và vượt qua hàng rào rau thai, hàng rào máu não'
      ],
      en: [
        'Listeriolysin O (LLO): pore-forming cytolysin enabling phagosomal escape',
        'ActA protein: actin-based intracellular propulsion and cell-to-cell spread',
        'Internalins InlA/InlB: invasion across intestinal barrier, placenta, and blood-brain barrier'
      ]
    },
    primaryToxins: ['Listeriolysin O (cholesterol-dependent cytolysin), Phospholipase C'],
    clinicalSignificance: {
      vi: 'Bệnh Listeriosis: Nhiễm trùng nguy kịch ở thai phụ (sảy thai, thai chết lưu, đẻ non), nhiễm khuẩn huyết và viêm màng não ở trẻ sơ sinh (thể sớm và thể muộn), người già, người ghép tạng, ung thư. Lây qua thực phẩm bơ sữa chưa tiệt trùng, phô mai mềm, xúc xích nguội.',
      en: 'Severe foodborne listeriosis in pregnant women (stillbirth, septic abortion), neonatal sepsis and meningitis, and CNS infections in immunocompromised elderly.'
    },
    recommendedAntibiotics: {
      firstLine: ['Ampicillin đơn độc hoặc kết hợp Gentamicin (hiệu đồng vận diệt khuẩn)'],
      alternative: ['Trimethoprim-sulfamethoxazole (Bactrim)', 'Meropenem'],
      intrinsicResistance: ['Tất cả Cephalosporin (Cephalosporin-resistant naturally!)']
    },
    clsiGroupNotes: {
      groupA: ['Ampicillin', 'Penicillin'],
      groupB: ['Trimethoprim-sulfamethoxazole', 'Gentamicin (synergy)']
    },
    diagnosticPitfalls: {
      vi: 'Listeria kháng tự nhiên với TẤT CẢ CEPHALOSPORIN. Nếu điều trị viêm màng não kinh nghiệm bằng Ceftriaxone đơn độc sẽ thất bại. Luôn phân biệt Listeria (Catalase +, Esculin +, Di động +) với S. agalactiae (Catalase -, Esculin -, Bất động).',
      en: 'Listeria is intrinsically resistant to ALL cephalosporins. Differentiate from GBS using catalase (+), esculin (+), and motility at 25°C (+).'
    },
    svgType: 'listeria_coccobacillus'
  },

  // 5. Corynebacterium diphtheriae
  {
    id: 'corynebacterium_diphtheriae',
    name: 'Corynebacterium diphtheriae',
    scientificName: 'Corynebacterium diphtheriae',
    commonName: {
      vi: 'Trực khuẩn Bạch hầu (Tạo màng giả hô hấp)',
      en: 'Diphtheria Bacillus (Respiratory Pseudomembrane)'
    },
    taxonomy: {
      domain: 'Bacteria',
      phylum: 'Actinomycetota',
      class: 'Actinomycetes',
      order: 'Mycobacteriales',
      family: 'Corynebacteriaceae',
      genus: 'Corynebacterium',
      species: 'C. diphtheriae'
    },
    gramReaction: 'gram_positive',
    shape: 'bacilli',
    arrangement: 'Palisades, V and L shapes, Chinese letter-like, clubbed ends',
    oxygen: 'facultative_anaerobe',
    biosafetyLevel: 2,
    directSmearFeatures: {
      vi: 'Trực khuẩn Gram dương đa hình thái, đầu phình dùi trống (club-shaped), xếp song song kiểu hàng rào (palisades) hoặc tạo góc nhọn chữ V, L, ký tự chữ Nho. Nhuộm xanh methylene Loeffler thấy các hạt biến sắc Babès-Ernst bắt màu đỏ tím.',
      en: 'Pleomorphic Gram-positive rods with clubbed ends in V and L shapes (Chinese letters). Methylene blue stain reveals metachromatic Babès-Ernst granules.'
    },
    colony: {
      bloodAgar: 'Small, grayish-white, translucent colonies, occasionally very narrow zone of beta-hemolysis.',
      hemolysis: 'beta',
      chocolateAgar: 'Grayish colonies.',
      macConkeyAgar: 'No growth.',
      otherMedia: 'Cystine-tellurite blood agar (CTBA / Tinsdale): Black/brownish colonies surrounded by a characteristic brown halo (cystinase positive). Môi trường Loeffler/Pai.',
      pigment: 'Grayish white to black on tellurite',
      elevation: 'convex',
      margin: 'entire',
      texture: 'creamy'
    },
    biochemicals: {
      catalase: '+',
      oxidase: '-',
      urease: '- (Phân biệt với C. ulcerans và C. pseudotuberculosis Urease +)',
      otherKeyTests: 'Cystinase trên thạch Tinsdale (+ tạo quầng nâu). Khử Nitrate (+). Thử nghiệm khuếch tán miễn dịch Elek khẳng định độc tố bạch hầu (đường tủa tạo góc 45°).'
    },
    virulenceFactors: {
      vi: [
        'Diphtheria toxin (độc tố bạch hầu do phage beta mang gen tox tích hợp): Gồm phân mảnh A và B; mảnh A gắn ADP-ribose làm bất hoạt yếu tố kéo dài EF-2 trên ribosome, ngừng hoàn toàn quá trình tổng hợp protein của tế bào ký chủ'
      ],
      en: [
        'Diphtheria exotoxin (A-B toxin encoded by lysogenic beta-phage tox gene): ADP-ribosylates elongation factor 2 (EF-2), halting eukaryotic protein synthesis'
      ]
    },
    primaryToxins: ['Diphtheria toxin (lethal dose: 130 ng/kg)'],
    clinicalSignificance: {
      vi: 'Bạch hầu hô hấp: Tạo màng giả dai màu xám trắng bám chặt amidan, họng, thanh quản; bóc tách gây chảy máu; nguy cơ ngạt thở tử vong cấp. Độc tố hấp thu vào máu gây viêm cơ tim cấp suy tim tử vong và viêm dây thần kinh ngoại biên liệt vòm họng.',
      en: 'Respiratory diphtheria with adherent pseudomembrane leading to airway obstruction; systemic toxin absorption causes myocarditis, cardiac failure, and demyelinating polyneuropathy.'
    },
    recommendedAntibiotics: {
      firstLine: ['Kháng độc tố bạch hầu khẩn cấp (Diphtheria antitoxin - DAT từ huyết thanh ngựa)', 'Penicillin G tiêm mạch hoặc Erythromycin'],
      alternative: ['Clarithromycin', 'Azithromycin'],
      intrinsicResistance: []
    },
    clsiGroupNotes: {
      groupA: ['Penicillin', 'Erythromycin']
    },
    diagnosticPitfalls: {
      vi: 'Chỉ định danh vi khuẩn là C. diphtheriae chưa đủ kết luận mắc bệnh bạch hầu; bắt buộc phải làm thử nghiệm sinh độc tố Elek test hoặc PCR phát hiện gen tox. Phân biệt với C. ulcerans (Urease +) và C. jeikeium (kháng đa thuốc, Lipophilic).',
      en: 'Identification of C. diphtheriae must be accompanied by toxigenicity testing (Elek test or PCR for tox gene). Differentiate from C. ulcerans (urease positive).'
    },
    svgType: 'diphtheria_palisade'
  },

  // 6. Neisseria meningitidis
  {
    id: 'neisseria_meningitidis',
    name: 'Neisseria meningitidis',
    scientificName: 'Neisseria meningitidis',
    commonName: {
      vi: 'Não mô cầu (Viêm màng não dịch tễ & Sốc tử ban)',
      en: 'Meningococcus (Epidemic Meningitis & Meningococcemia)'
    },
    taxonomy: {
      domain: 'Bacteria',
      phylum: 'Pseudomonadota',
      class: 'Betaproteobacteria',
      order: 'Neisseriales',
      family: 'Neisseriaceae',
      genus: 'Neisseria',
      species: 'N. meningitidis'
    },
    gramReaction: 'gram_negative',
    shape: 'diplococci',
    arrangement: 'Pairs with adjacent sides flattened (coffee-bean/kidney-bean)',
    oxygen: 'facultative_anaerobe',
    biosafetyLevel: 2,
    directSmearFeatures: {
      vi: 'Song cầu Gram âm hình hạt cà phê hoặc quả thận, đứng đôi, nằm trong và ngoài tế bào bạch cầu đa nhân trung tính trong dịch não tủy hoặc phết tử ban da.',
      en: 'Gram-negative coffee bean-shaped diplococci, intracellular and extracellular in CSF neutrophils.'
    },
    colony: {
      bloodAgar: 'Medium size (1-2 mm), bluish-gray, convex, smooth, glistening; encapsulated strains are mucoid; green cast in agar beneath colonies.',
      hemolysis: 'gamma',
      chocolateAgar: 'Abundant gray-tan convex mucoid colonies.',
      macConkeyAgar: 'No growth.',
      otherMedia: 'Modified Thayer-Martin (MTM), Martin-Lewis, NYC agar: Colorless to gray smooth colonies.',
      pigment: 'Bluish-gray or tan',
      elevation: 'convex',
      margin: 'smooth',
      texture: 'mucoid'
    },
    biochemicals: {
      catalase: '+',
      oxidase: '+',
      superoxol: '-',
      otherKeyTests: 'Lên men GLUCOSE (+) và MALTOSE (+); Lactose (-), Sucrose (-). Gamma-Glutamyl Aminopeptidase (+, phân biệt với N. gonorrhoeae -).'
    },
    virulenceFactors: {
      vi: [
        'Vỏ polysaccharide (12 nhóm huyết thanh: A, B, C, Y, W-135): Kháng thực bào tối quan trọng',
        'Nội độc tố Lipooligosaccharide (LOS): Phóng thích các túi màng blebs gây tổn thương nội mô, đông máu nội mạch rải rác (DIC) và sốc nhiễm khuẩn',
        'Pili: Giúp bám dính niêm mạc vòm họng',
        'IgA protease: Cắt kháng thể sIgA niêm mạc'
      ],
      en: [
        'Polysaccharide capsule (serogroups A, B, C, Y, W-135): antiphagocytic',
        'Lipooligosaccharide (LOS) endotoxin blebs: triggers severe DIC and septic shock',
        'Pili and IgA protease'
      ]
    },
    primaryToxins: ['Lipooligosaccharide (LOS) endotoxin blebs'],
    clinicalSignificance: {
      vi: 'Viêm màng não mủ bùng phát thành dịch ở thanh thiếu niên, tân binh quân đội, sinh viên nội trú. Nhiễm khuẩn huyết tối cấp (Meningococcemia): Tử ban xuất huyết hình sao hoại tử da, sốc nhiễm khuẩn và hoại tử xuất huyết 2 tuyến thượng thận (Hội chứng Waterhouse-Friderichsen), tử vong trong 12-24h.',
      en: 'Epidemic meningitis and fulminant meningococcemia with petechial/purpuric rash, DIC, and bilateral adrenal hemorrhage (Waterhouse-Friderichsen syndrome).'
    },
    recommendedAntibiotics: {
      firstLine: ['Ceftriaxone hoặc Cefotaxime', 'Penicillin G (nếu MIC nhạy)'],
      alternative: ['Meropenem', 'Chloramphenicol'],
      intrinsicResistance: []
    },
    clsiGroupNotes: {
      groupA: ['Ceftriaxone', 'Penicillin', 'Ampicillin'],
      groupB: ['Ciprofloxacin (dự phòng)', 'Rifampin (dự phòng người tiếp xúc gần)']
    },
    diagnosticPitfalls: {
      vi: 'Mọc được trên cả đĩa thạch máu SBA (trong khi lậu cầu N. gonorrhoeae không mọc trên SBA). Phân biệt bằng chuyển hóa đường: Não mô cầu lên men cả Glucose và Maltose; lậu cầu chỉ lên men Glucose. Thao tác nghi ngờ não mô cầu trong tủ BSC để tránh lây qua khí dung cho nhân viên xét nghiệm!',
      en: 'Unlike N. gonorrhoeae, N. meningitidis grows on SBA. Ferments glucose and maltose. Must be manipulated in BSC to prevent laboratory-acquired infection.'
    },
    svgType: 'neisseria_diplococci'
  },

  // 7. Moraxella catarrhalis
  {
    id: 'moraxella_catarrhalis',
    name: 'Moraxella catarrhalis',
    scientificName: 'Moraxella catarrhalis',
    commonName: {
      vi: 'Moraxella catarrhalis (Khuẩn lạc Hockey puck, Viêm tai giữa)',
      en: 'Moraxella catarrhalis (Hockey Puck Otitis Agent)'
    },
    taxonomy: {
      domain: 'Bacteria',
      phylum: 'Pseudomonadota',
      class: 'Gammaproteobacteria',
      order: 'Pseudomonadales',
      family: 'Moraxellaceae',
      genus: 'Moraxella',
      species: 'M. catarrhalis'
    },
    gramReaction: 'gram_negative',
    shape: 'diplococci',
    arrangement: 'Pairs with adjacent sides flattened',
    oxygen: 'aerobe',
    biosafetyLevel: 1,
    directSmearFeatures: {
      vi: 'Song cầu Gram âm hạt cà phê, hình thái giống hệt Neisseria.',
      en: 'Gram-negative diplococci with adjacent sides flattened.'
    },
    colony: {
      bloodAgar: 'Large (3-5 mm), grayish-white, opaque. Dấu hiệu "Hockey puck": có thể dùng que cấy đẩy trượt nguyên khối khuẩn lạc trên mặt thạch mà không bị vỡ. Sau 48h tạo hình nan hoa bánh xe (wagon wheel).',
      hemolysis: 'gamma',
      chocolateAgar: 'Large opaque gray-white colonies, wagon-wheel appearance after 48h.',
      macConkeyAgar: 'No growth (usually inhibited by colistin).',
      pigment: 'Grayish white',
      elevation: 'convex',
      margin: 'wavy',
      texture: 'brittle'
    },
    biochemicals: {
      catalase: '+',
      oxidase: '+',
      dnase: '+ (Phân biệt với Neisseria âm tính)',
      otherKeyTests: 'Thủy phân Tributyrin (Butyrate esterase): DƯƠNG TÍNH (+). Asaccharolytic: Không lên men tất cả các loại đường (Glucose -, Maltose -, Lactose -, Sucrose -).'
    },
    virulenceFactors: {
      vi: [
        'Tiết beta-lactamase (BRO-1, BRO-2): Đề kháng ampicillin/amoxicillin ở >95% các chủng',
        'Protein bám dính bề mặt OMP, màng sinh học biofilm'
      ],
      en: [
        'Beta-lactamase production (BRO-1, BRO-2) in >95% isolates',
        'Outer membrane adhesins and biofilm formation'
      ]
    },
    primaryToxins: ['Endotoxin (LOS)'],
    clinicalSignificance: {
      vi: 'Căn nguyên vi khuẩn thứ 3 gây viêm tai giữa cấp (AOM) và viêm xoang ở trẻ em (sau S. pneumoniae và H. influenzae). Gây đợt cấp viêm phế quản mạn tính và viêm phổi ở người lớn tuổi mắc COPD.',
      en: 'Third most common cause of otitis media and acute sinusitis in children; exacerbation of COPD and pneumonia in elderly adults.'
    },
    recommendedAntibiotics: {
      firstLine: ['Amoxicillin-clavulanate (Augmentin)', 'Azithromycin / Clarithromycin', 'Cefuroxime / Cefdinir'],
      alternative: ['Trimethoprim-sulfamethoxazole', 'Levofloxacin / Moxifloxacin'],
      intrinsicResistance: ['Amoxicillin và Ampicillin đơn thuần (do tiết beta-lactamase BRO)']
    },
    clsiGroupNotes: {
      groupA: ['Amoxicillin-clavulanate', 'Azithromycin'],
      groupB: ['Cefuroxime', 'Trimethoprim-sulfamethoxazole']
    },
    diagnosticPitfalls: {
      vi: 'Hình thái Gram giống hệt Neisseria nhưng sinh hóa phân biệt dễ dàng: M. catarrhalis hoàn toàn không lên men đường (Asaccharolytic), nhưng dương tính với DNase và Butyrate esterase (thử nghiệm đĩa Catarrhalis/Tributyrin đổi màu xanh nhanh chóng). Dấu hiệu "Hockey puck" trượt trên mặt thạch.',
      en: 'Identical Gram stain to Neisseria but asaccharolytic. Distinguished by positive DNase and butyrate esterase (tributyrin hydrolysis), plus "hockey puck" slide test.'
    },
    svgType: 'moraxella_diplococci'
  },

  // 8. Eikenella corrodens
  {
    id: 'eikenella_corrodens',
    name: 'Eikenella corrodens',
    scientificName: 'Eikenella corrodens',
    commonName: {
      vi: 'Eikenella corrodens (Nhóm HACEK, Mùi javel, Ăn mòn thạch)',
      en: 'Eikenella corrodens (HACEK Pitting Bleach-Odor)'
    },
    taxonomy: {
      domain: 'Bacteria',
      phylum: 'Pseudomonadota',
      class: 'Betaproteobacteria',
      order: 'Neisseriales',
      family: 'Neisseriaceae',
      genus: 'Eikenella',
      species: 'E. corrodens'
    },
    gramReaction: 'gram_negative',
    shape: 'coccobacilli',
    arrangement: 'Straight, slender bacilli or coccobacilli',
    oxygen: 'facultative_anaerobe',
    biosafetyLevel: 2,
    directSmearFeatures: {
      vi: 'Trực khuẩn hoặc cầu trực khuẩn Gram âm nhỏ, thẳng, mảnh mai.',
      en: 'Small, slender, straight Gram-negative bacilli or coccobacilli.'
    },
    colony: {
      bloodAgar: 'Small colonies, 45% làm lõm hoặc ăn mòn mặt thạch (pitting/corroding), quầng đổi màu xanh nhẹ xung quanh. Mùi đặc trưng nồng nặc như thuốc tẩy javel (chlorine bleach odor).',
      hemolysis: 'gamma',
      chocolateAgar: 'Colonies pit or corrode the agar surface, emit strong bleach odor.',
      macConkeyAgar: 'No growth.',
      pigment: 'Pale yellow in older cultures',
      elevation: 'flat',
      margin: 'irregular',
      texture: 'dry'
    },
    biochemicals: {
      catalase: '-',
      oxidase: '+',
      otherKeyTests: 'Ornithine decarboxylase (ODC): DƯƠNG TÍNH (+). Khử Nitrate (+). Asaccharolytic: không lên men carbohydrate. Urease (-), Indole (-).'
    },
    virulenceFactors: {
      vi: [
        'Khả năng bám dính và ăn mòn mô liên kết và van tim',
        'Thuộc nhóm HACEK gây viêm nội tâm mạc bán cấp'
      ],
      en: [
        'Tissue adherence and corrosion of endothelium and heart valves',
        'Part of HACEK endocarditis group'
      ]
    },
    primaryToxins: ['Endotoxin'],
    clinicalSignificance: {
      vi: 'Viêm mô tế bào và viêm tủy xương sau vết thương cắn người (human bite) hoặc vết thương nắm đấm vào răng người khác ("clenched-fist injury"). Viêm nội tâm mạc bán cấp nhóm HACEK ở người bệnh van tim hoặc sau thủ thuật nha khoa.',
      en: 'Infections associated with human bites or clenched-fist injuries; subacute infective endocarditis (HACEK group) and adult periodontitis.'
    },
    recommendedAntibiotics: {
      firstLine: ['Ampicillin-sulbactam', 'Amoxicillin-clavulanate', 'Ceftriaxone'],
      alternative: ['Cefoxitin', 'Fluoroquinolones'],
      intrinsicResistance: ['Clindamycin', 'Macrolides', 'Cephalosporin thế hệ 1 (Cefazolin) - Rất nguy hiểm vì đây là thuốc hay dùng cho nhiễm trùng vết thương thông thường!']
    },
    clsiGroupNotes: {
      groupA: ['Ampicillin', 'Ceftriaxone'],
      groupB: ['Ciprofloxacin', 'Trimethoprim-sulfamethoxazole']
    },
    diagnosticPitfalls: {
      vi: 'CẢNH BÁO LÂM SÀNG: Eikenella corrodens KHÁNG TỰ NHIÊN VỚI CLINDAMYCIN VÀ CEFAZOLIN (những kháng sinh thường chỉ định theo thói quen cho nhiễm trùng da/vết cắn). Nếu nghi ngờ clenched fist injury phải dùng ngay Ampicillin-sulbactam hoặc Ceftriaxone!',
      en: 'CRITICAL PITFALL: E. corrodens is intrinsically resistant to clindamycin and 1st-gen cephalosporins! Use ampicillin-sulbactam for human bite clenched-fist wounds.'
    },
    svgType: 'hacek_eikenella'
  },

  // 9. Legionella pneumophila
  {
    id: 'legionella_pneumophila',
    name: 'Legionella pneumophila',
    scientificName: 'Legionella pneumophila',
    commonName: {
      vi: 'Trực khuẩn Legionella (Bệnh viêm phổi Legionnaires)',
      en: 'Legionella pneumophila (Legionnaires Disease Agent)'
    },
    taxonomy: {
      domain: 'Bacteria',
      phylum: 'Pseudomonadota',
      class: 'Gammaproteobacteria',
      order: 'Legionellales',
      family: 'Legionellaceae',
      genus: 'Legionella',
      species: 'L. pneumophila'
    },
    gramReaction: 'gram_negative',
    shape: 'bacilli',
    arrangement: 'Pleomorphic, thin rods (2 - 20 µm)',
    oxygen: 'aerobe',
    biosafetyLevel: 2,
    directSmearFeatures: {
      vi: 'Trực khuẩn Gram âm mảnh, nhuộm Gram bắt màu rất mờ nhạt (cần kéo dài thời gian nhuộm safranin lên 10 phút hoặc dùng thuốc nhuộm huỳnh quang/Giemsa/Kinyoun). Ký sinh nội bào trong đại thực bào và bạch cầu trung tính.',
      en: 'Thin, faintly staining Gram-negative bacilli (requires extended safranin staining time to 10 min). Intracellular within macrophages.'
    },
    colony: {
      bloodAgar: 'NO GROWTH on unsupplemented sheep blood agar (requires L-cysteine).',
      hemolysis: 'gamma',
      chocolateAgar: 'Rare tiny colonies on cysteine-supplemented CHOC.',
      macConkeyAgar: 'No growth.',
      otherMedia: 'Buffered Charcoal Yeast Extract (BCYE) agar with L-cysteine: Mọc sau 3-5 ngày, khuẩn lạc tròn lồi màu trắng xám/xanh lục nhạt, dưới kính soi nổi có hình "kính mờ" (ground-glass appearance) với tâm dạng hạt và viền xẻ rãnh hồng/xanh.',
      pigment: 'Grayish-white or blue-green, autofluorescence under UV (366nm)',
      elevation: 'convex',
      margin: 'entire',
      texture: 'moist'
    },
    biochemicals: {
      catalase: '+ (yếu)',
      oxidase: '+ (yếu)',
      otherKeyTests: 'Bắt buộc cần L-cysteine: Cấy song song lên đĩa BCYE có L-cysteine (+) và BCYE không có L-cysteine (-). Thử nghiệm kháng nguyên nước tiểu (Urine Antigen Test serogroup 1).'
    },
    virulenceFactors: {
      vi: [
        'Ký sinh nội bào: Xâm nhập đại thực bào phế nang, ức chế hòa màng phagosome - lysosome bằng hệ thống tiết loại IV (Dot/Icm type IV secretion system)',
        'Khả năng nhân lên bên trong amip tự do ngoài môi trường nước, chịu được nồng độ clo 3 mg/L trong đường ống dẫn nước'
      ],
      en: [
        'Dot/Icm Type IV secretion system: blocks phagolysosome fusion in alveolar macrophages',
        'Intracellular survival within free-living aquatic amoebae; chlorine tolerant'
      ]
    },
    primaryToxins: ['Proteolytic enzymes, endotoxin'],
    clinicalSignificance: {
      vi: '1. Bệnh Legionnaires: Viêm phổi thùy hoại tử cấp tính nặng, sốt cao rét run, đau đầu, lú lẫn lơ mơ, tiêu chảy phân lỏng và hạ natri máu; tỷ lệ tử vong 15-30% (lên đến 50% ở người bệnh viện). 2. Sốt Pontiac: Thể sốt nhẹ tự khỏi giống cúm trong 2-5 ngày.',
      en: '1. Legionnaires’ disease: severe necrotizing pneumonia with multi-organ symptoms (diarrhea, hyponatremia, confusion), 15-30% mortality. 2. Pontiac fever: self-limited flulike illness.'
    },
    recommendedAntibiotics: {
      firstLine: ['Levofloxacin / Moxifloxacin (Fluoroquinolone hô hấp)', 'Azithromycin (Macrolide)'],
      alternative: ['Doxycycline'],
      intrinsicResistance: ['Tất cả Penicillin và Cephalosporin (không có tác dụng nội bào!)']
    },
    clsiGroupNotes: {
      groupA: ['Levofloxacin', 'Azithromycin'],
      groupB: ['Doxycycline']
    },
    diagnosticPitfalls: {
      vi: 'Không nuôi cấy được trên thạch SBA thông thường! Xét nghiệm nhanh hàng đầu được khuyến cáo là tìm kháng nguyên L. pneumophila nhóm huyết thanh 1 trong nước tiểu (độ nhạy 97%, đặc hiệu 100%).',
      en: 'Will not grow on routine blood agar. Urine antigen detection for serogroup 1 is the most sensitive and rapid diagnostic tool.'
    },
    svgType: 'legionella_rod'
  },

  // 10. Bordetella pertussis
  {
    id: 'bordetella_pertussis',
    name: 'Bordetella pertussis',
    scientificName: 'Bordetella pertussis',
    commonName: {
      vi: 'Trực khuẩn Ho gà (Bệnh ho gà trẻ em)',
      en: 'Whooping Cough Bacillus'
    },
    taxonomy: {
      domain: 'Bacteria',
      phylum: 'Pseudomonadota',
      class: 'Betaproteobacteria',
      order: 'Burkholderiales',
      family: 'Alcaligenaceae',
      genus: 'Bordetella',
      species: 'B. pertussis'
    },
    gramReaction: 'gram_negative',
    shape: 'coccobacilli',
    arrangement: 'Singles, pairs',
    oxygen: 'aerobe',
    biosafetyLevel: 2,
    directSmearFeatures: {
      vi: 'Cầu trực khuẩn Gram âm cực nhỏ, 0.2 - 0.5 x 0.5 - 1.0 µm.',
      en: 'Tiny Gram-negative coccobacilli.'
    },
    colony: {
      bloodAgar: 'No growth on sheep blood agar (inhibited by fatty acids/peroxides).',
      hemolysis: 'beta',
      chocolateAgar: 'No growth without protective agents.',
      macConkeyAgar: 'No growth.',
      otherMedia: 'Thạch than máu ngựa Regan-Lowe / Bordet-Gengou: Mọc sau 3-7 ngày, khuẩn lạc nhỏ, tròn lồi, bóng mượt lấp lánh như hạt ngọc hoặc "giọt thủy ngân" (mercury droplets).',
      pigment: 'Silver to whitish gray',
      elevation: 'convex',
      margin: 'smooth',
      texture: 'glistening'
    },
    biochemicals: {
      catalase: '+',
      oxidase: '+',
      urease: '- (Phân biệt với B. parapertussis Urease + 24h và B. bronchiseptica Urease + 4h)',
      otherKeyTests: 'Bất động (Motility -). Nitrate reduction (-). PCR phát hiện gen IS481 và ptxtP là tiêu chuẩn vàng chẩn đoán nhanh.'
    },
    virulenceFactors: {
      vi: [
        'Độc tố ho gà Pertussis toxin (PT): Độc tố A-B gây ADP-ribosyl hóa protein Gi, làm tăng nồng độ cAMP nội bào gây tăng tiết chất nhầy và tăng bạch cầu lympho máu ngoại vi cực mạnh',
        'Độc tố Adenylate cyclase toxin (ACT): Xâm nhập bạch cầu ức chế thực bào',
        'Filamentous hemagglutinin (FHA) & Pertactin: Giúp vi khuẩn bám chặt vào tế bào biểu mô có lông chuyển đường hô hấp',
        'Tracheal cytotoxin: Gây liệt và phá hủy biểu mô lông chuyển phế quản'
      ],
      en: [
        'Pertussis toxin (PT): ADP-ribosylation of Gi protein leading to cAMP surge and profound lymphocytosis',
        'Adenylate cyclase toxin (ACT), FHA, Pertactin, and Tracheal cytotoxin (ciliostasis)'
      ]
    },
    primaryToxins: ['Pertussis toxin (PT), Adenylate cyclase toxin, Tracheal cytotoxin'],
    clinicalSignificance: {
      vi: 'Bệnh ho gà (Whooping cough): Trải qua 3 giai đoạn: 1. Thời kỳ khởi phát (Catarrhal - lây lan mạnh nhất); 2. Thời kỳ kịch phát (Paroxysmal - những cơn ho rũ rượi liên tục không thở được, cuối cơn thở rít như gà gáy "whoop" kèm nôn mửa, tím tái, ngừng thở ở trẻ nhỏ); 3. Thời kỳ hồi phục (Convalescent).',
      en: 'Classic pertussis (whooping cough): Catarrhal phase (most infectious), Paroxysmal phase (repetitive spasms ending in inspiratory "whoop" and post-tussive vomiting), and Convalescent phase.'
    },
    recommendedAntibiotics: {
      firstLine: ['Azithromycin (Macrolide lựa chọn hàng đầu cho trẻ nhỏ và thai phụ)', 'Clarithromycin'],
      alternative: ['Trimethoprim-sulfamethoxazole (Bactrim, dùng cho trẻ >2 tháng dị ứng macrolide)'],
      intrinsicResistance: ['Cephalosporin đường uống (tự nhiên)']
    },
    clsiGroupNotes: {
      groupA: ['Azithromycin', 'Erythromycin']
    },
    diagnosticPitfalls: {
      vi: 'Que lấy bệnh phẩm bắt buộc là Dacron hoặc Flocked swab ngoáy tỵ hầu sâu; TUYỆT ĐỐI KHÔNG dùng tăm bông cán gỗ hay canxi alginate vì chúng làm chết vi khuẩn. Nuôi cấy khó mọc sau khi cơn ho gà điển hình xuất hiện; Real-time PCR là phương pháp tối ưu.',
      en: 'Specimen of choice is nasopharyngeal swab with Dacron/polyester (calcium alginate and cotton/wooden shafts are inhibitory). Real-time PCR is preferred over culture.'
    },
    svgType: 'bordetella_coccobacillus'
  },

  // 11. Shigella dysenteriae
  {
    id: 'shigella_dysenteriae',
    name: 'Shigella dysenteriae',
    scientificName: 'Shigella dysenteriae',
    commonName: {
      vi: 'Trực khuẩn Lỵ Shiga (Lỵ trực trùng ác tính, HUS)',
      en: 'Shigella dysenteriae (Bacillary Dysentery & Shiga Toxin)'
    },
    taxonomy: {
      domain: 'Bacteria',
      phylum: 'Pseudomonadota',
      class: 'Gammaproteobacteria',
      order: 'Enterobacterales',
      family: 'Enterobacteriaceae',
      genus: 'Shigella',
      species: 'S. dysenteriae'
    },
    gramReaction: 'gram_negative',
    shape: 'bacilli',
    arrangement: 'Singles, pairs',
    oxygen: 'facultative_anaerobe',
    biosafetyLevel: 2,
    directSmearFeatures: {
      vi: 'Trực khuẩn Gram âm, không có vỏ, không có lông (bất động hoàn toàn). Soi phân thấy vô số bạch cầu đa nhân PMN và hồng cầu trong chất nhầy.',
      en: 'Gram-negative bacilli, nonmotile, non-encapsulated. Stool microscopy shows abundant PMNs and RBCs in mucus.'
    },
    colony: {
      bloodAgar: 'Medium, smooth, grayish, nonhemolytic.',
      hemolysis: 'gamma',
      chocolateAgar: 'Smooth gray colonies.',
      macConkeyAgar: 'Colorless, transparent, non-lactose fermenting (NLF) colonies.',
      otherMedia: 'Hektoen Enteric (HE): Clear green colonies (no H2S). XLD: Translucent red colonies without black centers. SS agar: Colorless colonies.',
      pigment: 'Colorless to green/red on differential agars',
      elevation: 'flat',
      margin: 'entire',
      texture: 'smooth'
    },
    biochemicals: {
      catalase: '+',
      oxidase: '-',
      h2s: '-',
      urease: '-',
      indole: 'variable',
      citrate: '-',
      motility: '- (Bất động hoàn toàn)',
      otherKeyTests: 'Không sinh hơi từ Glucose. Không lên men Mannitol (Phân biệt với S. flexneri, S. boydii, S. sonnei đều lên men Mannitol +). Lysine decarboxylase (-).'
    },
    virulenceFactors: {
      vi: [
        'Shiga toxin (Stx): Độc tố gây chết tế bào ruột và tế bào nội mô mao mạch cầu thận, gây hội chứng tan máu ure huyết cao (HUS)',
        'Xâm nhập trực tiếp và phá hủy niêm mạc đại tràng bằng protein xâm lấn Ipa (Invasion plasmid antigens)',
        'Liều nhiễm trùng cực thấp: Chỉ cần ít hơn 10 - 100 con vi khuẩn là có thể gây bệnh ở người khỏe mạnh'
      ],
      en: [
        'Shiga toxin (Stx): Inactivates 60S ribosomal subunit, causing mucosal necrosis and HUS',
        'Invasion plasmid antigens (Ipa) mediating direct enterocyte entry and spread',
        'Extremely low infectious dose (<100 organisms)'
      ]
    },
    primaryToxins: ['Shiga toxin (Stx1)'],
    clinicalSignificance: {
      vi: 'Hội chứng lỵ trực trùng kinh điển: Sốt cao, đau quặn bụng dữ dội, mót rặn (tenesmus), đi ngoài phân lỏng nhiều lần sau đó toàn máu, mủ và chất nhầy. Có thể biến chứng thủng ruột, phình đại tràng nhiễm độc (toxic megacolon) và suy thận cấp do HUS.',
      en: 'Severe bacillary dysentery with high fever, abdominal cramps, tenesmus, and bloody mucoid stools; complicated by toxic megacolon and HUS.'
    },
    recommendedAntibiotics: {
      firstLine: ['Azithromycin', 'Ceftriaxone', 'Ciprofloxacin (nếu chủng còn nhạy)'],
      alternative: ['Trimethoprim-sulfamethoxazole (kháng thuốc gia tăng)'],
      intrinsicResistance: []
    },
    clsiGroupNotes: {
      groupA: ['Ampicillin', 'Ciprofloxacin', 'Trimethoprim-sulfamethoxazole'],
      groupB: ['Ceftriaxone', 'Azithromycin']
    },
    diagnosticPitfalls: {
      vi: 'Shigella rất nhạy cảm với pH acid trong mẫu phân; nếu không cấy ngay trong vòng 2h thì vi khuẩn sẽ chết dẫn đến âm tính giả. Cần chuyển ngay vào môi trường bảo quản Cary-Blair. TUYỆT ĐỐI KHÔNG dùng thuốc cầm tiêu chảy loperamide vì làm ứ đọng độc tố gây vỡ ruột!',
      en: 'Shigella is fragile to stool acidity; prompt plating or Cary-Blair transport is essential. Antidiarrheal agents (loperamide) are contraindicated.'
    },
    svgType: 'shigella_rod'
  },

  // 12. Proteus mirabilis
  {
    id: 'proteus_mirabilis',
    name: 'Proteus mirabilis',
    scientificName: 'Proteus mirabilis',
    commonName: {
      vi: 'Trực khuẩn Proteus (Hiện tượng bò loang, Sỏi san hô)',
      en: 'Proteus mirabilis (Swarming & Struvite Stones)'
    },
    taxonomy: {
      domain: 'Bacteria',
      phylum: 'Pseudomonadota',
      class: 'Gammaproteobacteria',
      order: 'Enterobacterales',
      family: 'Morganellaceae',
      genus: 'Proteus',
      species: 'P. mirabilis'
    },
    gramReaction: 'gram_negative',
    shape: 'bacilli',
    arrangement: 'Pleomorphic, single, swarmer filaments',
    oxygen: 'facultative_anaerobe',
    biosafetyLevel: 1,
    directSmearFeatures: {
      vi: 'Trực khuẩn Gram âm đa hình thái, từ trực khuẩn ngắn đến các dạng sợi dài bò loang.',
      en: 'Gram-negative pleomorphic rods, including elongated hyperflagellated swarmer cells.'
    },
    colony: {
      bloodAgar: 'Hiện tượng bò loang tạo các vòng đồng tâm lan khắp mặt thạch (swarming motility). Mùi đặc trưng hăng nồng như "sôcôla cháy" (burnt chocolate odor).',
      hemolysis: 'gamma',
      chocolateAgar: 'Swarming growth over the entire plate.',
      macConkeyAgar: 'Non-lactose fermenter (colorless translucent colonies); hiện tượng swarming bị ức chế trên MAC nhờ muối mật.',
      pigment: 'Translucent gray',
      elevation: 'flat',
      margin: 'swarming',
      texture: 'smooth'
    },
    biochemicals: {
      catalase: '+',
      oxidase: '-',
      h2s: '+ (Sinh H2S mạnh)',
      urease: '+ (Thủy phân ure cực mạnh 4+ trong vài phút)',
      indole: '- (ÂM TÍNH - Phân biệt then chốt với Proteus vulgaris Indole +)',
      otherKeyTests: 'Phenylalanine deaminase (PAD): DƯƠNG TÍNH (+ màu xanh lục với FeCl3). Ornithine decarboxylase (ODC): DƯƠNG TÍNH (+).'
    },
    virulenceFactors: {
      vi: [
        'Urease cực mạnh: Thủy phân urea trong nước tiểu tạo lượng lớn amoniac (NH3), làm pH nước tiểu tăng vọt >8.0, kết tủa ion magie, amoni và phosphat hình thành sỏi san hô struvite (magnesium ammonium phosphate / apatite)',
        'Khả năng biến đổi tế bào bò loang (Swarming motility do siêu tiên mao), fimbriae bám dính biểu mô bàng quang và đài bể thận'
      ],
      en: [
        'Hyperactive urease: raises urine pH >8.0, causing struvite and apatite kidney stones',
        'Coordinated swarming motility and uroepithelial fimbriae'
      ]
    },
    primaryToxins: ['Hemolysins, Urease enzyme, Endotoxin'],
    clinicalSignificance: {
      vi: 'Nhiễm trùng đường tiết niệu có biến chứng, viêm đài bể thận ngược dòng, hình thành sỏi san hô thận khổng lồ gây tắc nghẽn và suy thận. Nhiễm trùng vết mổ và loét tì đè ở bệnh nhân nằm liệt.',
      en: 'Complicated UTIs, pyelonephritis, struvite renal calculi (staghorn stones), and catheter-associated infections.'
    },
    recommendedAntibiotics: {
      firstLine: ['Ceftriaxone', 'Ciprofloxacin', 'Ampicillin (nếu nhạy)'],
      alternative: ['Piperacillin-tazobactam', 'Meropenem'],
      intrinsicResistance: ['Nitrofurantoin', 'Colistin/Polymyxin B', 'Tigecycline (kháng tự nhiên kinh điển!)']
    },
    clsiGroupNotes: {
      groupA: ['Ampicillin', 'Cefazolin', 'Gentamicin'],
      groupB: ['Ceftriaxone', 'Ciprofloxacin', 'Trimethoprim-sulfamethoxazole']
    },
    diagnosticPitfalls: {
      vi: 'ĐẶC ĐIỂM KHÁNG THUỐC TỰ NHIÊN: Proteus mirabilis kháng tự nhiên hoàn toàn với Nitrofurantoin (thuốc hay dùng cho viêm bàng quang), Colistin và Tigecycline! Phân biệt P. mirabilis (Indole -, ODC +) với P. vulgaris (Indole +, ODC -).',
      en: 'INTRINSIC RESISTANCE ALERT: Proteus is intrinsically resistant to Nitrofurantoin, Polymyxins/Colistin, and Tigecycline! Differentiate from P. vulgaris using indole (negative in mirabilis).'
    },
    svgType: 'proteus_swarming'
  },

  // 13. Yersinia enterocolitica
  {
    id: 'yersinia_enterocolitica',
    name: 'Yersinia enterocolitica',
    scientificName: 'Yersinia enterocolitica',
    commonName: {
      vi: 'Yersinia enterocolitica (Hội chứng viêm ruột thừa giả, Mọc ở 4°C)',
      en: 'Yersinia enterocolitica (Pseudoappendicitis & Psychrotolerant)'
    },
    taxonomy: {
      domain: 'Bacteria',
      phylum: 'Pseudomonadota',
      class: 'Gammaproteobacteria',
      order: 'Enterobacterales',
      family: 'Yersiniaceae',
      genus: 'Yersinia',
      species: 'Y. enterocolitica'
    },
    gramReaction: 'gram_negative',
    shape: 'coccobacilli',
    arrangement: 'Singles, short chains, safety-pin bipolar staining',
    oxygen: 'facultative_anaerobe',
    biosafetyLevel: 2,
    directSmearFeatures: {
      vi: 'Cầu trực khuẩn Gram âm nhỏ, bắt màu đậm hai cực (bipolar staining) giống chiếc kim băng cài áo khi nhuộm Wright hoặc Giemsa.',
      en: 'Small Gram-negative coccobacilli with bipolar safety-pin staining.'
    },
    colony: {
      bloodAgar: 'Small, pinpoint, smooth, translucent, nonhemolytic.',
      hemolysis: 'gamma',
      chocolateAgar: 'Small colonies.',
      macConkeyAgar: 'NLF (khuẩn lạc nhỏ trong suốt, có thể lên men lactose rất chậm sau 48h).',
      otherMedia: 'Thạch chọn lọc CIN (Cefsulodin-Irgasan-Novobiocin): Khuẩn lạc đặc trưng hình "mắt bò" (bulls-eye) với tâm màu đỏ đậm (lên men mannitol) và viền trong suốt xung quanh.',
      pigment: 'Translucent, deep red center on CIN',
      elevation: 'convex',
      margin: 'entire',
      texture: 'smooth'
    },
    biochemicals: {
      catalase: '+',
      oxidase: '-',
      urease: '+',
      otherKeyTests: 'Di động ở 25°C (+), BẤT ĐỘNG ở 37°C (-). Tăng sinh ở nhiệt độ lạnh 4°C (Cold enrichment). Khử Nitrate (+).'
    },
    virulenceFactors: {
      vi: [
        'Protein màng ngoài Yops (Yersinia outer proteins) tiết qua hệ thống tiết loại III (T3SS): Làm tê liệt thực bào',
        'Protein bám dính YadA, Inv (Invasin): Gắn vào tế bào M mảng Peyer của ruột non',
        'Khả năng sinh trưởng và nhân lên ở nhiệt độ tủ lạnh 4°C'
      ],
      en: [
        'Yops effector proteins delivered via T3SS',
        'Invasin and YadA adhesins mediating Peyer patch invasion',
        'Psychrotolerance: ability to replicate at 4°C in refrigerated food and packed RBCs'
      ]
    },
    primaryToxins: ['Enterotoxin ST-like, Endotoxin'],
    clinicalSignificance: {
      vi: '1. Viêm ruột cấp tính ở trẻ nhỏ. 2. Hội chứng viêm ruột thừa giả (Pseudoappendicitis) ở trẻ lớn và thiếu niên: Đau hố chậu phải dữ dội, sốt, siêu âm thấy viêm hạch mạc treo ruột (mesenteric adenitis) và hồi tràng, mổ ruột thừa bình thường. 3. Nhiễm trùng huyết do truyền khối hồng cầu bảo quản lạnh 4°C.',
      en: 'Enterocolitis in young children; pseudoappendicitis (mesenteric adenitis) mimicking acute appendicitis in teenagers; transfusion-related septic shock from contaminated refrigerated packed RBCs.'
    },
    recommendedAntibiotics: {
      firstLine: ['Ceftriaxone', 'Ciprofloxacin', 'Trimethoprim-sulfamethoxazole'],
      alternative: ['Doxycycline', 'Gentamicin'],
      intrinsicResistance: ['Ampicillin và Cephalosporin thế hệ 1 (tiết beta-lactamase BlaA tự nhiên)']
    },
    clsiGroupNotes: {
      groupA: ['Trimethoprim-sulfamethoxazole', 'Ciprofloxacin'],
      groupB: ['Ceftriaxone']
    },
    diagnosticPitfalls: {
      vi: 'Nhiệt độ kiểm tra di động: Y. enterocolitica DI ĐỘNG ở 25°C nhưng HOÀN TOÀN BẤT ĐỘNG ở 37°C! Cần dùng thạch CIN để phát hiện khuẩn lạc mắt bò tâm đỏ. Bệnh phẩm phân để ở 4°C trong nước muối sinh lý (Cold enrichment) giúp tăng sinh vi khuẩn.',
      en: 'Temperature-dependent motility: Motile at 25°C, nonmotile at 37°C. Forms distinctive "bullseye" colonies on CIN agar.'
    },
    svgType: 'yersinia_bipolar'
  },

  // 14. Vibrio cholerae
  {
    id: 'vibrio_cholerae',
    name: 'Vibrio cholerae',
    scientificName: 'Vibrio cholerae',
    commonName: {
      vi: 'Phẩy khuẩn Tả (Dịch tả, Phân nước vo gạo)',
      en: 'Cholera Vibrio (Pandemic Cholera)'
    },
    taxonomy: {
      domain: 'Bacteria',
      phylum: 'Pseudomonadota',
      class: 'Gammaproteobacteria',
      order: 'Vibrionales',
      family: 'Vibrionaceae',
      genus: 'Vibrio',
      species: 'V. cholerae'
    },
    gramReaction: 'gram_negative',
    shape: 'curved_rod',
    arrangement: 'Single curved/comma-shaped rods',
    oxygen: 'facultative_anaerobe',
    biosafetyLevel: 2,
    directSmearFeatures: {
      vi: 'Trực khuẩn Gram âm hình dấu phẩy hoặc hình hạt gạo cong nhẹ, cực kỳ linh động với một lông roi duy nhất ở một cực (monotrichous flagellum).',
      en: 'Curved, comma-shaped Gram-negative rods with rapid shooting motility.'
    },
    colony: {
      bloodAgar: 'Medium to large, smooth, iridescent with greenish hue, may show beta-hemolysis (El Tor).',
      hemolysis: 'beta',
      chocolateAgar: 'Abundant growth.',
      macConkeyAgar: 'Colorless to pinkish (non-lactose fermenter or weak delayed).',
      otherMedia: 'Thạch TCBS (Thiosulfate Citrate Bile Salts Sucrose): Khuẩn lạc lớn màu VÀNG chanh rực rỡ do lên men sucrose mạnh mẽ.',
      pigment: 'Bright yellow colonies on TCBS',
      elevation: 'convex',
      margin: 'entire',
      texture: 'smooth'
    },
    biochemicals: {
      catalase: '+',
      oxidase: '+',
      otherKeyTests: 'String test: DƯƠNG TÍNH (+ kéo sợi nhầy với natri deoxycholate 0.5%). Nhạy cảm đĩa O/129 150µg (S). MỌC ĐƯỢC TRONG CANH THANG 0% NaCl (Nonhalophilic, khác các Vibrio khác).'
    },
    virulenceFactors: {
      vi: [
        'Độc tố Tả (Choleragen / Cholera toxin - CT): Cấu trúc A-B; tiểu phần A1 xúc tác ADP-ribosyl hóa protein Gs gắn chặt vào trạng thái hoạt hóa, kích hoạt adenylate cyclase sản xuất ồ ạt cAMP, làm tế bào biểu mô ruột bơm chủ động Na+, Cl-, HCO3- và nước ra lòng ruột (10-30 lít/ngày)',
        'Pili đồng điều hòa độc tố (Toxin-coregulated pilus - TCP): Giúp vi khuẩn kết cụm và bám dính vào niêm mạc nhung mao ruột non'
      ],
      en: [
        'Cholera toxin (choleragen): A-B enterotoxin causing persistent ADP-ribosylation of Gs, cAMP surge, and massive electrolyte/water secretion',
        'Toxin-coregulated pilus (TCP) essential for mucosal colonization'
      ]
    },
    primaryToxins: ['Cholera toxin (choleragen)'],
    clinicalSignificance: {
      vi: 'Bệnh Tả (Cholera): Đại dịch toàn cầu, tiêu chảy xối xả liên tục như nước vo gạo (rice-water stool, có lẫn mảng nhầy trắng, không có mùi phân), mất nước và điện giải cấp tính tới 1 lít/giờ dẫn đến sốc giảm thể tích, toan chuyển hóa, suy thận cấp và tử vong sau vài giờ nếu không bù dịch kịp.',
      en: 'Asiatic cholera: massive painless rice-water diarrhea leading to hypovolemic shock, metabolic acidosis, and death within hours without rapid rehydration.'
    },
    recommendedAntibiotics: {
      firstLine: ['Bù dịch và điện giải khẩn cấp (Oral Rehydration Salts - ORS hoặc Ringer Lactate tĩnh mạch)', 'Doxycycline liều duy nhất 300mg (rút ngắn thời gian tiêu chảy)'],
      alternative: ['Azithromycin', 'Ciprofloxacin'],
      intrinsicResistance: []
    },
    clsiGroupNotes: {
      groupA: ['Ampicillin', 'Tetracycline / Doxycycline', 'Trimethoprim-sulfamethoxazole']
    },
    diagnosticPitfalls: {
      vi: 'Phân biệt V. cholerae với các loài Vibrio khác: V. cholerae và V. mimicus KHÔNG BẮT BUỘC CẦN MUỐI (mọc được trong môi trường 0% NaCl). Trên thạch TCBS tạo khuẩn lạc màu VÀNG. Bệnh phẩm phân nghi ngờ tả phải chuyển ngay bằng môi trường Cary-Blair hoặc nước pepton kiềm (APW pH 8.5).',
      en: 'V. cholerae grows in 0% NaCl (nonhalophilic) and forms yellow colonies on TCBS. Transport in Cary-Blair or alkaline peptone water (APW pH 8.5).'
    },
    svgType: 'vibrio_curved'
  },

  // 15. Campylobacter jejuni
  {
    id: 'campylobacter_jejuni',
    name: 'Campylobacter jejuni',
    scientificName: 'Campylobacter jejuni',
    commonName: {
      vi: 'Campylobacter jejuni (Cánh hải âu, Vi hiếu khí 42°C, GBS)',
      en: 'Campylobacter jejuni (Seagull-Wing Diarrhea & GBS)'
    },
    taxonomy: {
      domain: 'Bacteria',
      phylum: 'Campylobacterota',
      class: 'Campylobacteria',
      order: 'Campylobacterales',
      family: 'Campylobacteraceae',
      genus: 'Campylobacter',
      species: 'C. jejuni'
    },
    gramReaction: 'gram_negative',
    shape: 'curved_rod',
    arrangement: 'Single, pairs forming "seagull wings", long spirals or S shapes',
    oxygen: 'microaerophile',
    biosafetyLevel: 2,
    directSmearFeatures: {
      vi: 'Trực khuẩn Gram âm cong mảnh, hình dấu phẩy, chữ S hoặc hai con vi khuẩn ghép lại giống "đôi cánh hải âu đang bay" (flying seagull wings). Nhuộm Gram bắt màu kém, nên dùng thuốc nhuộm carbolfuchsin làm chất đối màu.',
      en: 'Slender, curved Gram-negative rods forming classic "seagull-wing" or spiral S-shapes.'
    },
    colony: {
      bloodAgar: 'Campy blood agar / Campy-CVA: Mọc sau 24-48h ở 42°C, khuẩn lạc dẹt, ẩm ướt, loang theo đường cấy (runny looking/spreading), không tan máu, có thể có ánh hồng nhạt.',
      hemolysis: 'gamma',
      chocolateAgar: 'Spreading moist colonies in microaerophilic atmosphere.',
      macConkeyAgar: 'No growth.',
      pigment: 'Translucent, flat, watery-spreading',
      elevation: 'flat',
      margin: 'spreading',
      texture: 'sticky'
    },
    biochemicals: {
      catalase: '+',
      oxidase: '+',
      hippurate: '+ (DƯƠNG TÍNH - Phân biệt then chốt với C. coli Hippurate âm tính)',
      otherKeyTests: 'Khí trường vi hiếu khí (5% O2, 10% CO2, 85% N2). Mọc ở 42°C (+), KHÔNG mọc ở 25°C. Di động kiểu phi lao (Darting motility). Nhạy cảm Nalidixic acid (S), kháng Cephalothin (R).'
    },
    virulenceFactors: {
      vi: [
        'Cyclethethic distending toxin (CDT): Gây đứt gãy DNA làm ngừng chu kỳ phân bào',
        'Cấu trúc tương đồng phân tử (Molecular mimicry): Kháng nguyên vỏ và lipooligosaccharide (LOS) tương đồng với ganglioside GM1 của bao myelin dây thần kinh người, kích hoạt kháng thể tự miễn sinh ra sau nhiễm trùng tấn công rễ thần kinh ngoại biên'
      ],
      en: [
        'Cytolethal distending toxin (CDT) causing cell arrest',
        'Molecular mimicry between LOS and host neuronal gangliosides (GM1), triggering autoimmune attack'
      ]
    },
    primaryToxins: ['Cytolethal distending toxin (CDT), Endotoxin'],
    clinicalSignificance: {
      vi: 'Nguyên nhân vi khuẩn hàng đầu gây viêm ruột tiêu chảy cấp tính trên toàn cầu. Tiêu chảy dữ dội kèm đau thắt bụng dữ dội, sốt cao, phân tóe máu. Di chứng thần kinh nặng: Khoảng 1/1000 bệnh nhân phát triển Hội chứng Guillain-Barré (liệt mềm hai chi dưới đối xứng tiến triển lên trên).',
      en: 'Leading bacterial cause of gastroenteritis worldwide; acute bloody diarrhea and severe cramps. Major post-infectious trigger of Guillain-Barré syndrome (GBS).'
    },
    recommendedAntibiotics: {
      firstLine: ['Azithromycin (Macrolide lựa chọn hàng đầu)', 'Erythromycin'],
      alternative: ['Ciprofloxacin (tuy nhiên tỷ lệ kháng fluoroquinolone hiện nay rất cao)', 'Doxycycline'],
      intrinsicResistance: ['Tất cả Cephalosporin (Cephalothin)']
    },
    clsiGroupNotes: {
      groupA: ['Azithromycin', 'Ciprofloxacin']
    },
    diagnosticPitfalls: {
      vi: 'Điều kiện nuôi cấy bắt buộc: Cần khí trường VI HIẾU KHÍ (5% O2, túi sinh khí CampyPak) và ủ ở 42°C (nhiệt độ này ức chế vi hệ đường ruột thường trú). C. jejuni là loài duy nhất thủy phân Hippurate (+), phân biệt với C. coli (-).',
      en: 'Mandatory microaerophilic conditions (5% O2) and 42°C incubation. C. jejuni is uniquely hippurate hydrolysis positive.'
    },
    svgType: 'campylobacter_seagull'
  },

  // 16. Helicobacter pylori
  {
    id: 'helicobacter_pylori',
    name: 'Helicobacter pylori',
    scientificName: 'Helicobacter pylori',
    commonName: {
      vi: 'Vi khuẩn HP (Loét dạ dày tá tràng, Ung thư dạ dày)',
      en: 'Helicobacter pylori (Peptic Ulcer & Gastric Carcinoma)'
    },
    taxonomy: {
      domain: 'Bacteria',
      phylum: 'Campylobacterota',
      class: 'Campylobacteria',
      order: 'Campylobacterales',
      family: 'Helicobacteraceae',
      genus: 'Helicobacter',
      species: 'H. pylori'
    },
    gramReaction: 'gram_negative',
    shape: 'curved_rod',
    arrangement: 'Curved, spiral rods with lophotrichous polar flagella',
    oxygen: 'microaerophile',
    biosafetyLevel: 2,
    directSmearFeatures: {
      vi: 'Trực khuẩn Gram âm cong hoặc xoắn nhẹ hình chữ U, có chùm 4-6 lông roi ở một cực (lophotrichous).',
      en: 'Curved spiral Gram-negative bacilli with multiple unipolar flagella.'
    },
    colony: {
      bloodAgar: 'Small, pinpoint, translucent colonies on selective Skirrow or Brucella blood agar after 3-5 days in microaerophilic incubator at 37°C.',
      hemolysis: 'gamma',
      chocolateAgar: 'Pinpoint glistening colonies.',
      macConkeyAgar: 'No growth.',
      pigment: 'Translucent gray',
      elevation: 'convex',
      margin: 'smooth',
      texture: 'moist'
    },
    biochemicals: {
      catalase: '+',
      oxidase: '+',
      urease: '+++ (SIÊU DƯƠNG TÍNH - Thủy phân ure cực nhanh trong 15 phút - 2 giờ)',
      otherKeyTests: 'Rapid Urease Test (CLOtest) chuyển màu vàng sang đỏ cánh sen nhanh chóng. Test thở UBT (Urea Breath Test) với C13/C14.'
    },
    virulenceFactors: {
      vi: [
        'Enzyme Urease khổng lồ: Thủy phân ure nội sinh trong dạ dày tạo CO2 và Amoniac (NH3) kiềm hóa môi trường acid dạ dày xung quanh vi khuẩn giúp nó sinh sống trong lớp chất nhầy',
        'CagA (Cytotoxin-associated gene A): Tiêm vào tế bào biểu mô dạ dày gây viêm mạn tính và biến đổi ác tính',
        'VacA (Vacuolating cytotoxin): Tạo không bào và làm chết tế bào biểu mô dạ dày'
      ],
      en: [
        'Massive urease activity: neutralizes gastric acid via ammonia production',
        'CagA oncoprotein delivered by Type IV secretion; VacA vacuolating cytotoxin'
      ]
    },
    primaryToxins: ['VacA cytotoxin, CagA oncoprotein, Urease'],
    clinicalSignificance: {
      vi: 'Căn nguyên hàng đầu gây viêm dạ dày mạn tính type B, loét dạ dày - tá tràng. Được WHO phân loại là Tác nhân sinh ung thư nhóm 1 (Class 1 Carcinogen) gây ung thư biểu mô tuyến dạ dày (Gastric adenocarcinoma) và u lympho MALT.',
      en: 'Causative agent of type B chronic gastritis, peptic and duodenal ulcers. Classified as a Class 1 human carcinogen for gastric adenocarcinoma and MALT lymphoma.'
    },
    recommendedAntibiotics: {
      firstLine: ['Phác đồ 4 thuốc có Bismuth: PPI (Esomeprazole) + Bismuth subsalicylate + Metronidazole + Tetracycline trong 14 ngày'],
      alternative: ['Phác đồ 4 thuốc không Bismuth: PPI + Amoxicillin + Clarithromycin + Metronidazole'],
      intrinsicResistance: ['Trimethoprim', 'Sulfonamides']
    },
    clsiGroupNotes: {
      groupA: ['Amoxicillin', 'Clarithromycin', 'Metronidazole', 'Tetracycline']
    },
    diagnosticPitfalls: {
      vi: 'Chẩn đoán không xâm lấn tối ưu là Test thở Ure (UBT) hoặc kháng nguyên phân (Stool Antigen). Trước khi làm test thở phải ngưng thuốc ức chế bơm proton (PPI) ít nhất 2 tuần và kháng sinh 4 tuần để tránh âm tính giả.',
      en: 'Non-invasive test of choice is the Urea Breath Test (UBT). Patients must discontinue PPIs for 2 weeks and antibiotics for 4 weeks before testing.'
    },
    svgType: 'helicobacter_pylori'
  },

  // 17. Acinetobacter baumannii
  {
    id: 'acinetobacter_baumannii',
    name: 'Acinetobacter baumannii',
    scientificName: 'Acinetobacter baumannii',
    commonName: {
      vi: 'Acinetobacter baumannii (CRAB siêu kháng thuốc, Viêm phổi thở máy)',
      en: 'Acinetobacter baumannii (CRAB Multidrug Resistant)'
    },
    taxonomy: {
      domain: 'Bacteria',
      phylum: 'Pseudomonadota',
      class: 'Gammaproteobacteria',
      order: 'Pseudomonadales',
      family: 'Moraxellaceae',
      genus: 'Acinetobacter',
      species: 'A. baumannii'
    },
    gramReaction: 'gram_negative',
    shape: 'coccobacilli',
    arrangement: 'Pairs, short chains, plump coccobacilli (resists decolorization)',
    oxygen: 'aerobe',
    biosafetyLevel: 2,
    directSmearFeatures: {
      vi: 'Cầu trực khuẩn Gram âm mập tròn, thường xếp đôi. Dễ giữ màu tím tinh thể (decolorization resistant) trên phết cấy máu khiến dễ bị đọc nhầm thành cầu khuẩn Gram dương.',
      en: 'Plump Gram-negative coccobacilli in pairs; resists decolorization and may appear Gram-positive.'
    },
    colony: {
      bloodAgar: 'Medium, smooth, opaque, grayish-white, nonhemolytic.',
      hemolysis: 'gamma',
      chocolateAgar: 'Abundant gray colonies.',
      macConkeyAgar: 'Saccharolytic: Tạo khuẩn lạc màu hồng nhạt hoặc ánh tím tím nhạt (purplish hue) trên thạch MAC dễ nhầm với vi khuẩn lên men lactose.',
      pigment: 'Purplish tint on MacConkey',
      elevation: 'convex',
      margin: 'entire',
      texture: 'smooth'
    },
    biochemicals: {
      catalase: '+',
      oxidase: '- (ÂM TÍNH - Phân biệt then chốt với Pseudomonas và Moraxella)',
      motility: '- (Bất động hoàn toàn - "Acineto" = không di động)',
      otherKeyTests: 'Oxi hóa Glucose (+). Citrate (+). Kháng Carbapenem (CRAB) mang gen oxacillinase OXA-23, OXA-51, NDM.'
    },
    virulenceFactors: {
      vi: [
        'Khả năng sống sót cực kỳ bền bỉ trên bề mặt khô hạn vô cơ (bàn mổ, giường bệnh, máy thở) hàng tuần',
        'Hệ thống bơm tống thuốc đa cơ chế và khả năng thu nhận các plasmid kháng thuốc (Carbapenemase OXA, KPC, NDM)',
        'Màng sinh học biofilm dày đặc bám ống nội khí quản'
      ],
      en: [
        'Remarkable desiccation tolerance on dry hospital surfaces for weeks',
        'Extensive efflux pumps, aminoglycoside-modifying enzymes, and carbapenemases (OXA-23, NDM)',
        'Heavy biofilm on endotracheal tubes'
      ]
    },
    primaryToxins: ['Endotoxin (LPS), Outer membrane vesicles (OMVs)'],
    clinicalSignificance: {
      vi: 'Căn nguyên hàng đầu gây viêm phổi thở máy (VAP) và nhiễm khuẩn huyết tại phòng Hồi sức tích cực (ICU). Tỷ lệ tử vong rất cao (40-60%) do vi khuẩn kháng gần như toàn bộ kháng sinh thông thường (CRAB). Gây nhiễm trùng vết thương bỏng và viêm màng não sau mổ sọ não.',
      en: 'Leading cause of ventilator-associated pneumonia (VAP) and catheter-related sepsis in intensive care units; associated with extreme drug resistance (CRAB).'
    },
    recommendedAntibiotics: {
      firstLine: ['Colistin (Polymyxin E) phối hợp Meropenem liều cao truyền kéo dài', 'Ampicillin-sulbactam (Sulbactam có hoạt tính diệt Acinetobacter)'],
      alternative: ['Tigecycline', 'Cefiderocol'],
      intrinsicResistance: ['Ampicillin', 'Cephalosporin thế hệ 1, 2', 'Ertapenem']
    },
    clsiGroupNotes: {
      groupA: ['Ampicillin-sulbactam', 'Ciprofloxacin', 'Gentamicin'],
      groupB: ['Meropenem', 'Imipenem', 'Colistin', 'Tigecycline']
    },
    diagnosticPitfalls: {
      vi: 'Phân biệt A. baumannii với A. lwoffii: A. baumannii có khả năng oxi hóa glucose (saccharolytic, gây bệnh chính); A. lwoffii asaccharolytic (thường là vi hệ da lành tính nhạy cảm kháng sinh). Trên thạch MAC, Acinetobacter tạo ánh tím hoa cà dễ nhầm là vi khuẩn lên men lactose.',
      en: 'A. baumannii is saccharolytic (oxidizes glucose) and highly resistant; A. lwoffii is asaccharolytic and susceptible. Oxidase negative and nonmotile distinguish it from Pseudomonas.'
    },
    svgType: 'acinetobacter_coccobacillus'
  },

  // 18. Stenotrophomonas maltophilia
  {
    id: 'stenotrophomonas_maltophilia',
    name: 'Stenotrophomonas maltophilia',
    scientificName: 'Stenotrophomonas maltophilia',
    commonName: {
      vi: 'Stenotrophomonas maltophilia (Kháng tự nhiên Carbapenem, Nhạy Bactrim)',
      en: 'Stenotrophomonas maltophilia (Intrinsic Carbapenem Resistant)'
    },
    taxonomy: {
      domain: 'Bacteria',
      phylum: 'Pseudomonadota',
      class: 'Gammaproteobacteria',
      order: 'Xanthomonadales',
      family: 'Xanthomonadaceae',
      genus: 'Stenotrophomonas',
      species: 'S. maltophilia'
    },
    gramReaction: 'gram_negative',
    shape: 'bacilli',
    arrangement: 'Straight rods, singles, pairs',
    oxygen: 'aerobe',
    biosafetyLevel: 2,
    directSmearFeatures: {
      vi: 'Trực khuẩn Gram âm thẳng, kích thước trung bình.',
      en: 'Medium-sized straight Gram-negative bacilli.'
    },
    colony: {
      bloodAgar: 'Medium size, smooth, glistening, producing an unmistakable lavender-green to greenish-yellow discoloration of sheep blood agar underneath and surrounding the colonies.',
      hemolysis: 'gamma',
      chocolateAgar: 'Abundant grayish-yellow colonies.',
      macConkeyAgar: 'Growth is good, non-lactose fermenter (may appear bluish).',
      pigment: 'Lavender-green discoloration on SBA',
      elevation: 'convex',
      margin: 'entire',
      texture: 'smooth'
    },
    biochemicals: {
      catalase: '+',
      oxidase: '- (ÂM TÍNH - Đặc điểm then chốt phân biệt với Pseudomonas)',
      dnase: '+ (DƯƠNG TÍNH - Phân biệt với hầu hết các nonfermenter khác)',
      esculin: '+',
      otherKeyTests: 'Thủy phân Gelatin (+). Lysine decarboxylase (+). Oxi hóa mạnh đường Maltose (tên loài "maltophilia" = ưa đường maltose).'
    },
    virulenceFactors: {
      vi: [
        'Enzyme beta-lactamase kép nhiễm sắc thể tự nhiên: Men L1 metallo-beta-lactamase (thủy phân toàn bộ Carbapenem) và men L2 serine-cephalosporinase',
        'Màng sinh học biofilm mạnh trên ống thông nhựa và máy thở'
      ],
      en: [
        'Chromosomal dual beta-lactamases: L1 metallo-beta-lactamase (destroys all carbapenems) and L2 cephalosporinase',
        'Biofilm formation on medical prostheses and mechanical ventilators'
      ]
    },
    primaryToxins: ['Extracellular elastase, protease, DNase'],
    clinicalSignificance: {
      vi: 'Gây viêm phổi bệnh viện ở bệnh nhân thở máy, bệnh nhân xơ nang phổi (CF) và nhiễm khuẩn huyết ở bệnh nhân ung thư máu giảm bạch cầu sau khi đã dùng kháng sinh phổ rộng (đặc biệt sau điều trị Carbapenem kéo dài).',
      en: 'Nosocomial pneumonia and bacteremia in immunocompromised patients, particularly following broad-spectrum carbapenem therapy; colonizer in cystic fibrosis.'
    },
    recommendedAntibiotics: {
      firstLine: ['Trimethoprim-sulfamethoxazole (Bactrim / SXT - THUỐC LỰA CHỌN HÀNG ĐẦU BẮT BUỘC)'],
      alternative: ['Levofloxacin', 'Minocycline', 'Tigecycline', 'Ceftazidime (cần theo dõi MIC)'],
      intrinsicResistance: ['TẤT CẢ CARBAPENEM (Imipenem, Meropenem, Doripenem, Ertapenem KHÁNG TỰ NHIÊN 100%!)', 'Aminoglycosides']
    },
    clsiGroupNotes: {
      groupA: ['Trimethoprim-sulfamethoxazole'],
      groupB: ['Levofloxacin', 'Minocycline', 'Ceftazidime']
    },
    diagnosticPitfalls: {
      vi: 'CẢNH BÁO NGUY HIỂM: Không bao giờ được dùng Carbapenem (Meropenem/Imipenem) cho S. maltophilia vì vi khuẩn kháng tự nhiên 100% qua men L1. Trên thạch máu cừu có quầng xanh tím oải hương (lavender-green), Oxidase (-) và DNase (+).',
      en: 'CRITICAL WARNING: NEVER use carbapenems for S. maltophilia due to intrinsic L1 metallo-beta-lactamase! Oxidase negative, DNase positive, lavender-green on SBA.'
    },
    svgType: 'stenotrophomonas_rod'
  },

  // 19. Burkholderia pseudomallei
  {
    id: 'burkholderia_pseudomallei',
    name: 'Burkholderia pseudomallei',
    scientificName: 'Burkholderia pseudomallei',
    commonName: {
      vi: 'Trực khuẩn Whitmore (Bệnh Melioidosis, Bắt màu 2 cực)',
      en: 'Burkholderia pseudomallei (Melioidosis / Whitmore Bacillus)'
    },
    taxonomy: {
      domain: 'Bacteria',
      phylum: 'Pseudomonadota',
      class: 'Betaproteobacteria',
      order: 'Burkholderiales',
      family: 'Burkholderiaceae',
      genus: 'Burkholderia',
      species: 'B. pseudomallei'
    },
    gramReaction: 'gram_negative',
    shape: 'bacilli',
    arrangement: 'Straight or slightly curved bacilli with bipolar safety-pin staining',
    oxygen: 'aerobe',
    biosafetyLevel: 3,
    directSmearFeatures: {
      vi: 'Trực khuẩn Gram âm thẳng hoặc cong nhẹ, nhuộm Wayson hoặc Gram thấy bắt màu đậm hai cực (bipolar staining) giống chiếc kim băng cài áo.',
      en: 'Gram-negative bacilli with safety-pin bipolar staining.'
    },
    colony: {
      bloodAgar: 'Colonies initially smooth, after 48-72 hours become dry, wrinkled, rugose, cream to orange-tan, emitting a distinct earthy/musty odor.',
      hemolysis: 'beta',
      chocolateAgar: 'Wrinkled colonies after 48 hours.',
      macConkeyAgar: 'Growth is good, wrinkled colonies that absorb neutral red.',
      otherMedia: 'Thạch Ashdown: Môi trường chọn lọc chứa colistin; khuẩn lạc nhăn nheo đặc trưng màu tím hồng đậm (deep pink) có viền răng cưa.',
      pigment: 'Deep pink on Ashdown agar, tan/orange on blood agar',
      elevation: 'raised',
      margin: 'irregular',
      texture: 'dry'
    },
    biochemicals: {
      catalase: '+',
      oxidase: '+',
      otherKeyTests: 'Oxi hóa Glucose và Lactose (+, phân biệt với P. stutzeri không dùng lactose). Khử Nitrate thành N2 khí (+). Mùi đất ẩm nồng nặc (cấm ngửi đĩa cấy!). BSL-3 select agent.'
    },
    virulenceFactors: {
      vi: [
        'Ký sinh nội bào tùy nghi: Trốn thoát khỏi phagosome vào bào tương, trùng hợp actin tế bào tạo đuôi đẩy lây lan trực tiếp',
        'Vỏ polysaccharide typ I kháng thực bào và kháng bổ thể',
        'Hệ thống tiết loại III và loại VI (T3SS, T6SS)'
      ],
      en: [
        'Facultative intracellular survival with actin-based motility and giant cell formation',
        'Capsular polysaccharide and T3SS/T6SS effectors'
      ]
    },
    primaryToxins: ['Burkholderia lethal factor 1 (BLF1), Endotoxin'],
    clinicalSignificance: {
      vi: 'Bệnh Melioidosis (Bệnh Whitmore): Lưu hành dịch tễ tại Đông Nam Á (đặc biệt Việt Nam, Thái Lan) và miền Bắc Úc. Vi khuẩn xâm nhập qua vết xước dính bùn đất hoặc hít phải bụi đất sau mưa bão. Gây viêm phổi hoại tử tạo hang, áp-xe gan lách tuyến tiền liệt, viêm tủy xương và nhiễm khuẩn huyết tối cấp tử vong 40-50%.',
      en: 'Melioidosis: endemic in Southeast Asia (Vietnam, Thailand) and Northern Australia. Acquired via percutaneous inoculation or aerosol inhalation of muddy soil/water. Causes necrotizing pneumonia, visceral abscesses, and fatal septicemia.'
    },
    recommendedAntibiotics: {
      firstLine: ['Giai đoạn tấn công tĩnh mạch (Intensive phase ≥10-14 ngày): Ceftazidime hoặc Meropenem', 'Giai đoạn duy trì đường uống (Eradication phase 3-6 tháng): Trimethoprim-sulfamethoxazole (Bactrim)'],
      alternative: ['Imipenem', 'Amoxicillin-clavulanate (nếu không dung nạp Bactrim)'],
      intrinsicResistance: ['Colistin / Polymyxin B (kháng 100% tự nhiên)', 'Penicillin', 'Ampicillin', 'Cephalosporin thế hệ 1, 2', 'Aminoglycosides']
    },
    clsiGroupNotes: {
      groupA: ['Ceftazidime', 'Meropenem', 'Trimethoprim-sulfamethoxazole']
    },
    diagnosticPitfalls: {
      vi: 'NGUY HIỂM AN TOÀN SINH HỌC CẤP III (BSL-3): Tuyệt đối KHÔNG ĐƯỢC ngửi đĩa thạch vì mùi đất ẩm! Thao tác toàn bộ trong tủ an toàn sinh học. Nhận diện: Khuẩn lạc nhăn nheo trên thạch máu/Ashdown, bắt màu 2 cực, kháng tự nhiên 100% với Colistin/Polymyxin và Aminoglycoside.',
      en: 'BSL-3 SELECT AGENT: Never sniff plates! Inherently resistant to colistin and aminoglycosides. Characteristic wrinkled colonies on Ashdown agar.'
    },
    svgType: 'burkholderia_wrinkled'
  },

  // 20. Clostridium perfringens
  {
    id: 'clostridium_perfringens',
    name: 'Clostridium perfringens',
    scientificName: 'Clostridium perfringens',
    commonName: {
      vi: 'Trực khuẩn Hoại thư sinh hơi (Tan máu 2 vòng, Alpha-toxin)',
      en: 'Clostridium perfringens (Gas Gangrene & Double-Zone Hemolysis)'
    },
    taxonomy: {
      domain: 'Bacteria',
      phylum: 'Bacillota',
      class: 'Clostridia',
      order: 'Eubacteriales',
      family: 'Clostridiaceae',
      genus: 'Clostridium',
      species: 'C. perfringens'
    },
    gramReaction: 'gram_positive',
    shape: 'bacilli',
    arrangement: 'Large, blunt-ended, rectangular boxcar-shaped rods',
    oxygen: 'obligate_anaerobe',
    biosafetyLevel: 2,
    directSmearFeatures: {
      vi: 'Trực khuẩn Gram dương kích thước lớn, thân hình chữ nhật đầu vuông vắn như toa tàu (boxcar-shaped). Hiếm khi quan sát thấy bào tử trong mẫu bệnh phẩm lâm sàng. Phết mủ vết thương hầu như KHÔNG THẤY BẠCH CẦU do bị độc tố alpha tiêu hủy.',
      en: 'Large, rectangular, boxcar-shaped Gram-positive bacilli. Spores rarely observed in clinical smears. Absence of WBCs due to toxin-mediated lysis.'
    },
    colony: {
      bloodAgar: 'Large, flat, spreading colonies. ĐẶC TRƯNG KINH ĐIỂN: Tan máu beta hai vòng kép (Double zone of beta-hemolysis): vòng hẹp bên trong tan máu hoàn toàn (do theta-toxin) và vòng rộng mờ bên ngoài tan máu bán phần (do alpha-toxin).',
      hemolysis: 'beta',
      chocolateAgar: 'Growth only under anaerobic conditions.',
      macConkeyAgar: 'No growth.',
      otherMedia: 'Egg Yolk Agar (EYA): Lecithinase DƯƠNG TÍNH (+ tạo quầng trắng đục không tan ngấm sâu trong thạch). Lipase ÂM TÍNH (-). Phản ứng ức chế Nagler (+).',
      pigment: 'Grayish, translucent',
      elevation: 'flat',
      margin: 'irregular',
      texture: 'rough'
    },
    biochemicals: {
      catalase: '- (Phân biệt với Bacillus catalase +)',
      lecithinase: '+ (trên EYA)',
      lipase: '-',
      gelatin: '+',
      otherKeyTests: 'Lên men sữa bão hòa "Stormy fermentation" (lên men lactose tạo cục đông vỡ nát sinh hơi dữ dội). Thử nghiệm CAMP ngược (Reverse CAMP test) dương tính hình mũi tên hướng về S. agalactiae.'
    },
    virulenceFactors: {
      vi: [
        'Alpha-toxin (Lecithinase / Phospholipase C): Phá hủy màng tế bào hồng cầu, tiểu cầu, bạch cầu và tế bào cơ gây hoại tử cơ nặng nề và sốc',
        'Theta-toxin (Perfringolysin O): Độc tố gây tan máu hoàn toàn và ức chế co bóp cơ tim',
        'Enterotoxin type A: Độc tố ruột phóng thích khi vi khuẩn tạo bào tử gây tiêu chảy ngộ độc thịt'
      ],
      en: [
        'Alpha-toxin (phospholipase C/lecithinase): destroys cell membranes, causing myonecrosis and shock',
        'Theta-toxin (perfringolysin O): oxygen-labile hemolysin',
        'Enterotoxin linked to sporulation causing food poisoning'
      ]
    },
    primaryToxins: ['Alpha-toxin (phospholipase C), Theta-toxin, Enterotoxin'],
    clinicalSignificance: {
      vi: '1. Hoại thư sinh hơi (Gas gangrene / Clostridial myonecrosis): Cấp cứu ngoại khoa tối khẩn cấp sau chấn thương đụng dập dính đất bẩn, mô hoại tử nhanh chóng sinh bọng hơi dưới da, sốc độc tố tử vong trong vài giờ nếu không cắt lọc. 2. Viêm ruột hoại tử (Enteritis necroticans / Pigbel do type C). 3. Ngộ độc thức ăn do thịt nấu chín để nguội.',
      en: 'Gas gangrene (clostridial myonecrosis) with crepitus, rapid tissue necrosis, and systemic shock; foodborne illness; enteritis necroticans (Pigbel).'
    },
    recommendedAntibiotics: {
      firstLine: ['Cắt lọc ngoại khoa triệt để khẩn cấp', 'Penicillin G liều cao truyền tĩnh mạch + Clindamycin (để ức chế tổng hợp độc tố)'],
      alternative: ['Meropenem', 'Metronidazole', 'Liệu pháp oxy cao áp (Hyperbaric Oxygen - HBO)'],
      intrinsicResistance: []
    },
    clsiGroupNotes: {
      groupA: ['Penicillin', 'Ampicillin'],
      groupB: ['Clindamycin', 'Metronidazole', 'Piperacillin-tazobactam']
    },
    diagnosticPitfalls: {
      vi: 'Soi mủ trực tiếp thấy trực khuẩn Gram dương to hình toa tàu mà KHÔNG CÓ BẠCH CẦU là dấu hiệu cảnh báo hoại thư sinh hơi! Đĩa thạch máu kỵ khí có tan máu 2 vòng kép và EYA lecithinase (+) quầng đục trắng.',
      en: 'Direct smear with large boxcar GPB and absence of leukocytes suggests gas gangrene. Presumptively identified by double-zone beta-hemolysis and positive lecithinase on EYA.'
    },
    svgType: 'clostridium_perfringens'
  },

  // 21. Bacteroides fragilis
  {
    id: 'bacteroides_fragilis',
    name: 'Bacteroides fragilis',
    scientificName: 'Bacteroides fragilis',
    commonName: {
      vi: 'Trực khuẩn Kỵ khí Bacteroides fragilis (Áp-xe ổ bụng, Thạch BBE)',
      en: 'Bacteroides fragilis (Intra-abdominal Anaerobe & BBE Agar)'
    },
    taxonomy: {
      domain: 'Bacteria',
      phylum: 'Bacteroidota',
      class: 'Bacteroidia',
      order: 'Bacteroidales',
      family: 'Bacteroidaceae',
      genus: 'Bacteroides',
      species: 'B. fragilis'
    },
    gramReaction: 'gram_negative',
    shape: 'coccobacilli',
    arrangement: 'Pleomorphic rods with rounded ends, pale staining',
    oxygen: 'obligate_anaerobe',
    biosafetyLevel: 2,
    directSmearFeatures: {
      vi: 'Cầu trực khuẩn hoặc trực khuẩn Gram âm đa hình thái, bắt màu thuốc nhuộm nhạt, đầu tròn.',
      en: 'Pale-staining pleomorphic Gram-negative rods with rounded ends.'
    },
    colony: {
      bloodAgar: 'Medium to large (>1 mm), smooth, convex, translucent, grayish-white, nonhemolytic.',
      hemolysis: 'gamma',
      chocolateAgar: 'Growth only under anaerobic conditions.',
      macConkeyAgar: 'No growth.',
      otherMedia: 'Bacteroides Bile Esculin (BBE) agar: Mọc khuẩn lạc lớn (>1mm) màu xám đen, môi trường xung quanh chuyển màu đen thui do chịu được 20% muối mật và thủy phân esculin mạnh. KVLB agar: Mọc tốt.',
      pigment: 'Blackening on BBE agar',
      elevation: 'convex',
      margin: 'entire',
      texture: 'smooth'
    },
    biochemicals: {
      catalase: '+',
      indole: '- (B. fragilis điển hình là Indole âm, phân biệt với B. thetaiotaomicron Indole +)',
      bileEsculin: '+ (Chịu 20% muối mật và thủy phân esculin)',
      otherKeyTests: 'Kháng cả 3 đĩa kháng sinh định danh đặc biệt (Special potency disks): Vancomycin (R), Kanamycin (R), Colistin (R) (Kiểu hình R-R-R).'
    },
    virulenceFactors: {
      vi: [
        'Vỏ polysaccharide typ A (PSA): Thúc đẩy tạo ổ áp-xe độc lập trong phúc mạc kể cả khi không có vi khuẩn khác',
        'Nội độc tố LPS: Tuy nhiên chuỗi lipid A có độc tính thấp hơn LPS của vi khuẩn hiếu khí',
        'Enzyme beta-lactamase (gen cepA, cfxA) phân hủy hầu hết penicillin và cephalosporin'
      ],
      en: [
        'Polysaccharide capsule (PSA) inducing intra-abdominal abscess formation',
        'Endogenous beta-lactamases (cepA) conferring resistance to penicillins and cephalosporins'
      ]
    },
    primaryToxins: ['Enterotoxigenic B. fragilis (ETBF) enterotoxin (BFT - metalloprotease)'],
    clinicalSignificance: {
      vi: 'Chiếm hơn 60-70% các ca nhiễm trùng kỵ khí trong ổ bụng và nhiễm khuẩn huyết do vi khuẩn kỵ khí: Viêm phúc mạc sau thủng ruột, áp-xe gan, áp-xe vùng chậu, loét tì đè và hoại tử nhiễm trùng chân đái tháo đường.',
      en: 'Accounts for >60% of anaerobic intra-abdominal infections and bacteremia following peritonitis, appendiceal perforation, and pelvic abscesses.'
    },
    recommendedAntibiotics: {
      firstLine: ['Metronidazole (Flagyl)', 'Carbapenem (Meropenem, Ertapenem)', 'Piperacillin-tazobactam'],
      alternative: ['Ampicillin-sulbactam', 'Tigecycline', 'Cefoxitin (tuy nhiên kháng thuốc tăng)'],
      intrinsicResistance: ['Penicillin G', 'Ampicillin', 'Cephalosporin (Cefotaxime, Ceftriaxone)', 'Aminoglycosides']
    },
    clsiGroupNotes: {
      groupA: ['Metronidazole', 'Ampicillin-sulbactam', 'Piperacillin-tazobactam', 'Meropenem'],
      groupB: ['Clindamycin', 'Cefoxitin', 'Moxifloxacin']
    },
    diagnosticPitfalls: {
      vi: 'Định danh sơ bộ nhanh trong 24h: Khuẩn lạc xám đen trên thạch BBE (>1mm) + mọc trên thạch KVLB + kháng cả 3 đĩa Vancomycin 5µg, Kanamycin 1000µg, Colistin 10µg (R-R-R).',
      en: 'Rapid presumptive ID: Black colonies >1mm on BBE agar + growth on KVLB + resistant to special potency disks Vancomycin, Kanamycin, Colistin (R-R-R).'
    },
    svgType: 'bacteroides_fragilis'
  },

  // 22. Treponema pallidum
  {
    id: 'treponema_pallidum',
    name: 'Treponema pallidum subsp. pallidum',
    scientificName: 'Treponema pallidum subsp. pallidum',
    commonName: {
      vi: 'Xoắn khuẩn Giang mai (Bệnh giang mai, Săng giang mai)',
      en: 'Syphilis Spirochete'
    },
    taxonomy: {
      domain: 'Bacteria',
      phylum: 'Spirochaetota',
      class: 'Spirochaetia',
      order: 'Spirochaetales',
      family: 'Spirochaetaceae',
      genus: 'Treponema',
      species: 'T. pallidum'
    },
    gramReaction: 'gram_negative',
    shape: 'spirochete',
    arrangement: 'Slender, flexuous, regular helical spirals (4 to 14 coils)',
    oxygen: 'microaerophile',
    biosafetyLevel: 2,
    directSmearFeatures: {
      vi: 'Xoắn khuẩn cực kỳ thanh mảnh, 0.1 - 0.2 µm x 6 - 20 µm, xoắn đều đặn 4 đến 14 vòng. Quá mỏng để thấy bằng kính hiển vi quang học thông thường; bắt buộc phải quan sát bằng kính hiển vi nền đen (dark-field) thấy chuyển động uốn lượn mềm mại uyển chuyển.',
      en: 'Extremely thin, regular spirals with 4-14 coils, exhibiting graceful flexuous motility under dark-field microscopy.'
    },
    colony: {
      bloodAgar: 'KHÔNG THỂ NUÔI CẤY trên môi trường nhân tạo vô bào (Unculturable in vitro).',
      hemolysis: 'gamma',
      chocolateAgar: 'No growth.',
      macConkeyAgar: 'No growth.',
      pigment: 'None (unculturable)',
      elevation: 'flat',
      margin: 'entire',
      texture: 'smooth'
    },
    biochemicals: {
      otherKeyTests: 'Soi tươi kính hiển vi nền đen (Dark-field) từ săng giang mai. Huyết thanh học không đặc hiệu (Nontreponemal): RPR, VDRL. Huyết thanh học đặc hiệu (Treponemal): TP-PA, FTA-ABS, EIA.'
    },
    virulenceFactors: {
      vi: [
        'Khả năng xuyên qua niêm mạc nguyên vẹn và vượt qua hàng rào nhau thai gây giang mai bẩm sinh',
        'Biến đổi kháng nguyên bề mặt màng ngoài (nghèo kháng nguyên) giúp trốn thoát sự nhận diện của hệ miễn dịch',
        'Di động bằng sợi trục periplasmic giúp xoắn khuẩn khoan sâu vào mô và thành mạch máu'
      ],
      en: [
        'Ability to cross intact mucosa and transplacental barrier (congenital syphilis)',
        'Antigenic stealth (paucity of outer membrane proteins)',
        'Invasive corkscrew motility via periplasmic endoflagella'
      ]
    },
    primaryToxins: ['No classic exotoxin; pathology is endarteritis obliterans and delayed hypersensitivity'],
    clinicalSignificance: {
      vi: 'Bệnh Giang mai (Syphilis): 1. Giang mai thời kỳ 1: Săng (chancre) đơn độc, tròn, đáy sạch gờ cứng không đau kèm hạch bẹn cứng không đau; 2. Giang mai thời kỳ 2 (sau 2-12 tuần): Ban đào khắp người bao gồm cả lòng bàn tay, lòng bàn chân, mảng niêm mạc sùi condyloma lata; 3. Giang mai thời kỳ 3: Gôm (gumma) da xương gan, phình bóc tách động mạch chủ, giang mai thần kinh (Tabes dorsalis, sa sút trí tuệ). Giang mai bẩm sinh.',
      en: 'Syphilis: Primary (painless hard chancre), Secondary (generalized rash including palms and soles, condylomata lata), Latent, Tertiary (gummas, aortitis, neurosyphilis), and Congenital syphilis.'
    },
    recommendedAntibiotics: {
      firstLine: ['Benzathine Penicillin G 2.4 triệu đơn vị tiêm bắp sâu (DUY NHẤT CHƯA TỪNG BỊ ĐỀ KHÁNG!)'],
      alternative: ['Doxycycline 100mg uống 14 ngày (nếu dị ứng penicillin ở người không mang thai)'],
      intrinsicResistance: []
    },
    clsiGroupNotes: {
      groupA: ['Penicillin G (thuốc duy nhất được chứng minh chữa khỏi giang mai thai kỳ)']
    },
    diagnosticPitfalls: {
      vi: 'Thuật toán chẩn đoán huyết thanh: Dùng RPR/VDRL để theo dõi hiệu giá kháng thể (giảm 4 lần sau điều trị). Test treponemal (TP-PA, FTA-ABS) khẳng định nhiễm bệnh và sẽ DƯƠNG TÍNH SUỐT ĐỜI (không dùng để theo dõi tái nhiễm hay khỏi bệnh).',
      en: 'Nontreponemal tests (RPR/VDRL) monitor treatment efficacy via titer drops. Treponemal tests (TP-PA/FTA-ABS) remain positive for life.'
    },
    svgType: 'treponema_spirochete'
  },

  // 23. Chlamydia trachomatis
  {
    id: 'chlamydia_trachomatis',
    name: 'Chlamydia trachomatis',
    scientificName: 'Chlamydia trachomatis',
    commonName: {
      vi: 'Chlamydia trachomatis (Đau mắt hột, Viêm niệu đạo NGU, Hột xoài LGV)',
      en: 'Chlamydia trachomatis (Trachoma & Genital Chlamydia)'
    },
    taxonomy: {
      domain: 'Bacteria',
      phylum: 'Chlamydiota',
      class: 'Chlamydiia',
      order: 'Chlamydiales',
      family: 'Chlamydiaceae',
      genus: 'Chlamydia',
      species: 'C. trachomatis'
    },
    gramReaction: 'gram_negative',
    shape: 'coccobacilli',
    arrangement: 'Intracellular inclusion bodies within columnar epithelial cells',
    oxygen: 'obligate_anaerobe',
    biosafetyLevel: 2,
    directSmearFeatures: {
      vi: 'Ký sinh nội bào bắt buộc. Không nuôi cấy được trên thạch thông thường. Nhuộm Giemsa hoặc huỳnh quang DFA thấy thể vùi nội bào hình tròn chứa glycogen bắt màu iod trong tế bào biểu mô trụ.',
      en: 'Obligate intracellular. Staining reveals intracytoplasmic inclusions in columnar epithelial cells.'
    },
    colony: {
      bloodAgar: 'KHÔNG MỌC trên môi trường nhân tạo vô bào (đòi hỏi nuôi cấy tế bào sống McCoy hoặc HeLa).',
      hemolysis: 'gamma',
      chocolateAgar: 'No growth.',
      macConkeyAgar: 'No growth.',
      pigment: 'None (intracellular)',
      elevation: 'flat',
      margin: 'entire',
      texture: 'smooth'
    },
    biochemicals: {
      otherKeyTests: 'Xét nghiệm khuếch đại gen NAAT (PCR / TMA) trên mẫu nước tiểu đầu dòng hoặc que quệt cổ tử cung/niệu đạo là TIÊU CHUẨN VÀNG chẩn đoán.'
    },
    virulenceFactors: {
      vi: [
        'Chu kỳ nhân lên 2 giai đoạn: Thể cơ bản (Elementary body - EB) chịu được áp lực môi trường giúp lây nhiễm; Thể lưới (Reticulate body - RB) nhân đôi nội bào',
        'Protein màng ngoài chủ yếu MOMP và LPS họ Chlamydiaceae',
        '10 plasmid ổn định trong tế bào chất'
      ],
      en: [
        'Unique biphasic cycle: Elementary Body (EB, infectious) and Reticulate Body (RB, metabolically active)',
        'Major outer membrane protein (MOMP) and polymorphic outer membrane proteins (Pmps)'
      ]
    },
    primaryToxins: ['LPS endotoxin, Chlamydial cytotoxin'],
    clinicalSignificance: {
      vi: '1. Serovar A, B, Ba, C: Bệnh đau mắt hột (Trachoma) gây biến dạng quặm mi, loét giác mạc và mù lòa hàng triệu người; 2. Serovar D - K: Bệnh lây qua đường tình dục phổ biến nhất (viêm niệu đạo không do lậu NGU, viêm cổ tử cung nhầy mủ, viêm vòi trứng gây vô sinh/thai ngoài tử cung, hội chứng Reiter; viêm kết mạc và viêm phổi ngắt quãng ở trẻ sơ sinh); 3. Serovar L1, L2, L3: Bệnh hột xoài (Lymphogranuloma venereum - LGV) gây loét sinh dục và vỡ mủ hạch bẹn.',
      en: 'Trachoma (serovars A-C), genital tract infections and neonatal pneumonia/conjunctivitis (serovars D-K), and lymphogranuloma venereum (serovars L1-L3).'
    },
    recommendedAntibiotics: {
      firstLine: ['Azithromycin 1g uống liều duy nhất', 'Doxycycline 100mg uống 2 lần/ngày trong 7 ngày (21 ngày đối với LGV)'],
      alternative: ['Levofloxacin', 'Erythromycin (lựa chọn cho trẻ sơ sinh và thai phụ)'],
      intrinsicResistance: ['Tất cả Beta-lactam (không có vách peptidoglycan kinh điển)']
    },
    clsiGroupNotes: {
      groupA: ['Azithromycin', 'Doxycycline']
    },
    diagnosticPitfalls: {
      vi: 'TIÊU CHUẨN VÀNG: Xét nghiệm NAAT (PCR, TMA) có độ nhạy/đặc hiệu vượt trội so với nuôi cấy tế bào và EIA. Lấy nước tiểu đầu dòng ở nam giới không xâm lấn. Ở phụ nữ, >50% nhiễm trùng không có triệu chứng.',
      en: 'NAAT is the diagnostic method of choice due to high sensitivity/specificity and noninvasive urine sampling.'
    },
    svgType: 'chlamydia_elementary'
  },

  // 24. Mycoplasma pneumoniae
  {
    id: 'mycoplasma_pneumoniae',
    name: 'Mycoplasma pneumoniae',
    scientificName: 'Mycoplasma pneumoniae',
    commonName: {
      vi: 'Mycoplasma pneumoniae (Viêm phổi không điển hình, Thiếu vách tế bào)',
      en: 'Mycoplasma pneumoniae (Walking Pneumonia & Mollicutes)'
    },
    taxonomy: {
      domain: 'Bacteria',
      phylum: 'Mycoplasmatota',
      class: 'Mollicutes',
      order: 'Mycoplasmatales',
      family: 'Mycoplasmataceae',
      genus: 'Mycoplasma',
      species: 'M. pneumoniae'
    },
    gramReaction: 'gram_negative',
    shape: 'pleomorphic',
    arrangement: 'Permanently lack cell wall; pleomorphic coccoid to filamentous',
    oxygen: 'aerobe',
    biosafetyLevel: 2,
    directSmearFeatures: {
      vi: 'HOÀN TOÀN KHÔNG BẮT MÀU NHUỘM GRAM do vĩnh viễn không có vách tế bào peptidoglycan. Màng tế bào chứa sterol/cholesterol.',
      en: 'Invisible on Gram stain due to permanent absence of a peptidoglycan cell wall. Membrane contains sterols.'
    },
    colony: {
      bloodAgar: 'No growth on routine blood agar.',
      hemolysis: 'gamma',
      chocolateAgar: 'No growth without cholesterol/serum supplementation.',
      macConkeyAgar: 'No growth.',
      otherMedia: 'Canh thang và thạch SP4 (chứa 20% huyết thanh ngựa, cholesterol, chỉ thị phenol red): Mọc sau 2-3 tuần, khuẩn lạc nhỏ (10-100 µm) hình trứng ốp lết (fried egg appearance) có tâm gồ sẫm màu và rìa mỏng.',
      pigment: 'Translucent fried-egg microcolonies',
      elevation: 'raised',
      margin: 'smooth',
      texture: 'granular'
    },
    biochemicals: {
      otherKeyTests: 'Lên men Glucose (làm vàng môi trường SP4). Thủy phân Arginine (-). Thủy phân Ure (-). Ngưng kết hồng cầu chuột lang (Guinea pig RBC hemadsorption +).'
    },
    virulenceFactors: {
      vi: [
        'Protein bám dính P1 (P1 adhesin): Gắn đặc hiệu vào thụ thể sialic acid trên các tế bào biểu mô có lông chuyển của khí phế quản',
        'Độc tố CARDS (Community-Acquired Respiratory Distress Syndrome toxin): Độc tố ADP-ribosyl hóa gây phá hủy tế bào biểu mô lông chuyển phế quản',
        'Sản xuất hydrogen peroxide (H2O2) gây độc tế bào phổi'
      ],
      en: [
        'P1 adhesin mediating tight binding to ciliated respiratory epithelium',
        'CARDS toxin (ADP-ribosylating toxin) causing ciliostasis and epithelial vacuolation'
      ]
    },
    primaryToxins: ['CARDS toxin (ADP-ribosylating toxin)'],
    clinicalSignificance: {
      vi: 'Viêm phổi không điển hình tiên phát ("Viêm phổi đi bộ" - Walking pneumonia): Ho khan dữ dội kéo dài nhiều tuần, sốt nhẹ, đau rát họng, X-quang phổi thâm nhiễm phế nang dạng lưới kẽ feathery lớn hơn nhiều so với triệu chứng nghèo nàn khi nghe phổi. Phổ biến nhất ở lứa tuổi học sinh, sinh viên, người trẻ.',
      en: 'Primary atypical pneumonia (walking pneumonia) and tracheobronchitis in children and young adults; dry persistent cough, disproportional infiltrates on chest radiography.'
    },
    recommendedAntibiotics: {
      firstLine: ['Azithromycin / Clarithromycin (Macrolide)', 'Doxycycline (người lớn)'],
      alternative: ['Levofloxacin / Moxifloxacin (Fluoroquinolone hô hấp)'],
      intrinsicResistance: ['TẤT CẢ KHÁNG SINH BETA-LACTAM (Penicillin, Cephalosporin, Carbapenem KHÁNG TỰ NHIÊN 100%!)', 'Vancomycin']
    },
    clsiGroupNotes: {
      groupA: ['Azithromycin', 'Doxycycline']
    },
    diagnosticPitfalls: {
      vi: 'KHÁNG TỰ NHIÊN HOÀN TOÀN VỚI BETA-LACTAM VÀ VANCOMYCIN vì vi khuẩn không có vách tế bào! Kháng thể ngưng kết lạnh (Cold agglutinins) chỉ dương tính khoảng 50% và không đặc hiệu. Chẩn đoán tối ưu hiện nay là PCR đa mồi (Multiplex respiratory PCR) hoặc huyết thanh học IgM/IgG.',
      en: 'Completely intrinsically resistant to beta-lactams and vancomycin due to absence of cell wall. Cold agglutinins are nonspecific; PCR or serology is preferred.'
    },
    svgType: 'mycoplasma_fried_egg'
  }
];
