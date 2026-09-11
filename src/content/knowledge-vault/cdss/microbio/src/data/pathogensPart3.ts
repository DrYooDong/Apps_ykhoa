import { Pathogen } from '../types';

export const PATHOGENS_PART3: Pathogen[] = [
  // 1. Clostridioides difficile
  {
    id: 'c_difficile',
    name: 'Clostridioides difficile',
    scientificName: 'Clostridioides difficile',
    commonName: {
      vi: 'Trực khuẩn gây viêm đại tràng giả mạc (C. diff / CDAD)',
      en: 'C. diff / Antibiotic-Associated Colitis'
    },
    taxonomy: {
      domain: 'Bacteria',
      phylum: 'Bacillota (Firmicutes)',
      class: 'Clostridia',
      order: 'Eubacteriales',
      family: 'Clostridiaceae',
      genus: 'Clostridioides',
      species: 'C. difficile'
    },
    gramReaction: 'gram_positive',
    shape: 'bacilli',
    arrangement: 'Single or pairs, large straight rods with subterminal oval spores',
    oxygen: 'obligate_anaerobe',
    biosafetyLevel: 2,
    directSmearFeatures: {
      vi: 'Trực khuẩn Gram dương lớn, kỵ khí tuyệt đối, sinh nha bào hình bầu dục lệch tâm. Nhuộm soi phân trực tiếp ít giá trị do lẫn vi hệ bình thường, chẩn đoán dựa vào xét nghiệm độc tố.',
      en: 'Large Gram-positive bacilli, obligate anaerobe with subterminal oval spores. Direct fecal Gram stain is non-diagnostic; toxin detection is required.'
    },
    colony: {
      bloodAgar: 'Grayish-white to opaque, flat or slightly raised, irregular margins, distinctive horse-stable / barnyard odor due to p-cresol.',
      hemolysis: 'gamma',
      chocolateAgar: 'Grows under anaerobic conditions only; grayish colonies.',
      macConkeyAgar: 'No growth (inhibited by bile salts & crystal violet).',
      otherMedia: 'CCFA (Cycloserine-Cefoxitin-Fructose Agar): Yellow ground-glass colonies with yellow halo, chartreuse yellow-green fluorescence under 365 nm UV.',
      odor: 'Horse-stable / barnyard aroma (p-cresol production)',
      elevation: 'flat',
      margin: 'irregular'
    },
    biochemicals: {
      catalase: '-',
      esculin: '+',
      gelatin: '+',
      otherKeyTests: 'Lên men Fructose (+), Phản ứng Lecithinase (-) và Lipase (-) trên EYA; Chủng dịch tễ BI/NAP1/027 tăng tiết độc tố gấp 16-23 lần.'
    },
    virulenceFactors: {
      vi: [
        'Độc tố A (TcdA): Enterotoxin gây xuất tiết dịch ruột, viêm và hủy hoại biểu mô liên kết.',
        'Độc tố B (TcdB): Cytotoxin độc tế bào mạnh gấp 1000 lần độc tố A, làm tiêu hủy khung tế bào niêm mạc đại tràng.',
        'Độc tố nhị phân (Binary toxin CDT): Thúc đẩy bám dính tế bào biểu mô ở chủng đột biến BI/NAP1/027.',
        'Nha bào chịu nhiệt và hóa chất tẩy rửa thông thường, lây truyền dễ dàng trong bệnh viện.'
      ],
      en: [
        'Toxin A (TcdA): Enterotoxin inducing fluid secretion and intestinal mucosal damage.',
        'Toxin B (TcdB): Cytotoxin 1000x more potent than Toxin A, disrupting actin cytoskeleton.',
        'Binary Toxin (CDT): Promotes microtubule protrusion and adherence in epidemic BI/NAP1/027.',
        'Resistant endospores persisting in hospital environment.'
      ]
    },
    primaryToxins: ['Toxin A (Enterotoxin)', 'Toxin B (Cytotoxin)', 'Binary Toxin (CDT)'],
    clinicalSignificance: {
      vi: 'Căn nguyên hàng đầu gây tiêu chảy liên quan đến kháng sinh (CDAD) và Viêm đại tràng giả mạc (Pseudomembranous colitis). Bệnh cảnh dao động từ tiêu chảy phân nước nhiều lần đến phình đại tràng nhiễm độc (toxic megacolon) đe dọa tính mạng.',
      en: 'Leading cause of antibiotic-associated diarrhea (CDAD) and pseudomembranous colitis. Ranges from watery diarrhea to life-threatening toxic megacolon.'
    },
    recommendedAntibiotics: {
      firstLine: ['Vancomycin (uống)', 'Fidaxomicin (uống)'],
      alternative: ['Metronidazole (uống, chỉ dùng cho đợt đầu nhẹ nếu không có Vancomycin)', 'Cấy vi hệ phân (Fecal Microbiota Transplant - FMT) cho ca tái phát nhiều lần'],
      intrinsicResistance: ['Cephalosporins (toàn bộ)', 'Fluoroquinolones', 'Clindamycin']
    },
    clsiGroupNotes: {
      groupA: ['Vancomycin (oral)', 'Fidaxomicin'],
      groupB: ['Metronidazole']
    },
    diagnosticPitfalls: {
      vi: 'Chỉ xét nghiệm phân lỏng không đóng khuôn (trừ trường hợp liệt ruột/phình đại tràng). Cấy phân không phân biệt được người mang trùng lành tính (5-10% người lớn khỏe mạnh). Xét nghiệm chẩn đoán tối ưu là thuật toán 2 bước: Test nhanh GDH + EIA Toxin A/B, hoặc PCR khuếch đại gen tcdB.',
      en: 'Only test unformed liquid stool. Stool culture cannot differentiate colonization from active infection. Use a 2-step algorithmic approach (GDH + Toxin EIA, or PCR tcdB).'
    },
    svgType: 'spore_rod'
  },

  // 2. Campylobacter jejuni
  {
    id: 'c_jejuni',
    name: 'Campylobacter jejuni',
    scientificName: 'Campylobacter jejuni subsp. jejuni',
    commonName: {
      vi: 'Phẩy khuẩn Campylobacter đường tiêu hóa',
      en: 'Campylobacter gastroenteritis'
    },
    taxonomy: {
      domain: 'Bacteria',
      phylum: 'Campylobacterota',
      class: 'Epsilonproteobacteria',
      order: 'Campylobacterales',
      family: 'Campylobacteraceae',
      genus: 'Campylobacter',
      species: 'C. jejuni'
    },
    gramReaction: 'gram_negative',
    shape: 'curved_rod',
    arrangement: 'Single curved rods resembling seagull wings, S-shaped or spiral forms in young cultures; coccoid in older cultures',
    oxygen: 'microaerophile',
    biosafetyLevel: 2,
    directSmearFeatures: {
      vi: 'Trực khuẩn Gram âm mảnh, cong hình dấu phẩy, chữ S hoặc hình cánh chim hải âu (seagull wings). Di động rất nhanh kiểu phi lao (darting motility) trên tiêu bản soi tươi giọt phân.',
      en: 'Slender, curved Gram-negative rods forming seagull wing, S, or spiral shapes. Rapid darting motility on wet mount examination of fresh stool.'
    },
    colony: {
      bloodAgar: 'Moist, runny, spreading colonies following the streak line on selective Campy blood agar (or flat, translucent, non-hemolytic colonies).',
      hemolysis: 'gamma',
      chocolateAgar: 'Growth observed in microaerophilic atmosphere at 42°C.',
      macConkeyAgar: 'No growth or very poor growth (inhibited by selective bile salts).',
      otherMedia: 'Campy-CVA / Skirrow agar (42°C, 5% O2, 10% CO2, 85% N2): colonies grayish, flat, watery spreading.',
      elevation: 'flat',
      margin: 'spreading',
      texture: 'moist'
    },
    biochemicals: {
      catalase: '+',
      oxidase: '+',
      hippurate: '+',
      motility: '+',
      otherKeyTests: 'Thủy phân Hippurate (+) là xét nghiệm chìa khóa phân biệt C. jejuni (+) với C. coli (-); Mọc tốt ở 42°C nhưng KHÔNG mọc ở 25°C; Nhạy cảm với Nalidixic acid, đề kháng Cephalothin.'
    },
    virulenceFactors: {
      vi: [
        'Kháng nguyên lông (Flagella): Đảm bảo khả năng di động phi lao xâm nhập lớp chất nhầy đường ruột.',
        'Độc tố tế bào làm giãn nở nhân (Cytolethal distending toxin - CDT): Ngừng chu kỳ tế bào niêm mạc.',
        'Cấu trúc Lipooligosaccharide (LOS): Bắt chước phân tử ganglioside GM1 của bao myelin thần kinh người, gây phản ứng tự miễn dẫn đến Hội chứng Guillain-Barré (GBS).'
      ],
      en: [
        'Flagella: High-speed darting motility enabling penetration of intestinal mucus layer.',
        'Cytolethal distending toxin (CDT): Induces DNA double-strand breaks and cell cycle arrest.',
        'Molecular mimicry of LOS: Matches human GM1 gangliosides, triggering post-infectious Guillain-Barré syndrome (GBS).'
      ]
    },
    primaryToxins: ['Cytolethal distending toxin (CDT)', 'Enterotoxin'],
    clinicalSignificance: {
      vi: 'Nguyên nhân hàng đầu gây tiêu chảy nhiễm trùng do vi khuẩn ở các nước phát triển. Bệnh cảnh viêm ruột cấp tính đau bụng dữ dội, sốt, tiêu chảy phân toàn máu giống viêm ruột thừa hoặc lỵ trực trùng. Biến chứng muộn nặng: Hội chứng viêm đa rễ dây thần kinh Guillain-Barré (1/1000 ca) và Viêm khớp phản ứng (Hội chứng Reiter).',
      en: 'Leading bacterial cause of foodborne gastroenteritis in developed countries. Acute bloody diarrhea mimicking appendicitis. Post-infectious complications include Guillain-Barré syndrome and reactive arthritis.'
    },
    recommendedAntibiotics: {
      firstLine: ['Azithromycin (Macrolide)'],
      alternative: ['Ciprofloxacin (tuy nhiên tỷ lệ đề kháng Fluoroquinolone hiện nay rất cao >50%)', 'Erythromycin'],
      intrinsicResistance: ['Cephalosporins (toàn bộ)', 'Penicillin']
    },
    clsiGroupNotes: {
      groupA: ['Azithromycin', 'Erythromycin', 'Ciprofloxacin']
    },
    diagnosticPitfalls: {
      vi: 'Vi khuẩn vi hiếu khí bắt buộc: cần ủ ở 42°C trong hệ thống sinh khí chuyên dụng (5% O2, 10% CO2, 85% N2). Vi khuẩn chết nhanh trong môi trường hiếu khí thông thường. Nhuộm soi phân trực tiếp nên dùng Safranin kéo dài hoặc Carbolfuchsin làm chất nhuộm tương phản do vi khuẩn bắt màu Gram âm rất nhạt.',
      en: 'Requires microaerophilic conditions (5% O2, 10% CO2) and 42°C for optimal recovery. Highly fastidious; carbolfuchsin counterstain recommended for direct smear due to faint Gram staining.'
    },
    svgType: 'curved_rod'
  },

  // 3. Treponema pallidum
  {
    id: 't_pallidum',
    name: 'Treponema pallidum',
    scientificName: 'Treponema pallidum subsp. pallidum',
    commonName: {
      vi: 'Xoắn khuẩn Giang mai',
      en: 'Syphilis spirochete'
    },
    taxonomy: {
      domain: 'Bacteria',
      phylum: 'Spirochaetota',
      class: 'Spirochaetia',
      order: 'Spirochaetales',
      family: 'Treponemataceae',
      genus: 'Treponema',
      species: 'T. pallidum'
    },
    gramReaction: 'gram_negative',
    shape: 'spirochete',
    arrangement: 'Delicate, tight regular helical coils with tapered ends (6-14 coils), 6-15 µm in length, 0.1-0.2 µm in diameter',
    oxygen: 'microaerophile',
    biosafetyLevel: 2,
    directSmearFeatures: {
      vi: 'Xoắn khuẩn cực mảnh (0.1 - 0.2 µm), KHÔNG THỂ quan sát được dưới kính hiển vi quang học thông thường bằng nhuộm Gram. Quan sát trực tiếp bằng kính hiển vi nền đen (Darkfield) hoặc nhuộm huỳnh quang DFA-TP thấy chuyển động xoay tròn quanh trục và uốn gập góc cạnh nhịp nhàng.',
      en: 'Extremely slender helically coiled spirochetes, invisible by standard brightfield Gram stain. Direct visualization requires Darkfield microscopy showing corkscrew rotation and flexion, or DFA-TP staining.'
    },
    colony: {
      bloodAgar: 'Cannot be cultivated on standard artificial cell-free bacteriological media.',
      hemolysis: 'gamma',
      chocolateAgar: 'No growth on cell-free artificial media.',
      macConkeyAgar: 'No growth.',
      otherMedia: 'Obligate human pathogen; maintained only by intratesticular inoculation in rabbits.'
    },
    biochemicals: {
      otherKeyTests: 'Không làm được phản ứng sinh hóa thông thường do không nuôi cấy được trên môi trường nhân tạo. Chẩn đoán dựa trên huyết thanh học (Serology: RPR/VDRL và TP-PA/FTA-ABS) và NAAT PCR.'
    },
    virulenceFactors: {
      vi: [
        'Sợi sợi nội roi (Endoflagella / Axial filaments): Nằm trong khoang chu chất, giúp xoắn khuẩn khoan xuyên qua màng nhầy và mô liên kết.',
        'Hyaluronidase: Phân giải acid hyaluronic ngoại bào, tạo điều kiện xâm lấn mô sâu.',
        'Khả năng ngụy trang miễn dịch (Tế bào phủ fibronectin ký chủ, mật độ protein màng ngoài cực thấp).',
        'Gây viêm nội mạc mạch máu tắc nghẽn (Obliterative endarteritis) đặc trưng.'
      ],
      en: [
        'Periplasmic endoflagella (axial filaments): Mediates corkscrew drilling through endothelial junctions and connective tissues.',
        'Hyaluronidase: Breaks down extracellular matrix enabling tissue dissemination.',
        'Low outer-membrane protein density allowing stealth immune evasion.',
        'Induces characteristic obliterative endarteritis leading to ischemic tissue necrosis.'
      ]
    },
    primaryToxins: ['No classic exotoxin; pathology driven by invasive endarteritis and host cellular immune reaction'],
    clinicalSignificance: {
      vi: 'Tác nhân gây bệnh Giang mai lây qua đường tình dục và lây truyền mẹ - con qua nhau thai. Diễn tiến 4 giai đoạn kinh điển: Thời kỳ 1 (Săng giang mai chancre đơn độc, đáy sạch viền cứng không đau + hạch vùng), Thời kỳ 2 (Ban hoa đào đào ban ở lòng bàn tay/bàn chân, mảng niêm mạc mủ, sùi condylomata lata), Thời kỳ tiềm tàng (Latent), và Thời kỳ 3 (Gôm giang mai gumma, viêm phình động mạch chủ, giang mai thần kinh Tabes dorsalis và liệt toàn thể). Giang mai bẩm sinh gây dị tật Hutchinson, mũi gãy yên ngựa, răng cưa.',
      en: 'Etiologic agent of venereal Syphilis and congenital syphilis. Primary (painless indurated chancre), Secondary (diffuse maculopapular rash on palms/soles, condylomata lata), Latent, Tertiary (gummas, aortitis, neurosyphilis/tabes dorsalis). Congenital causes saddle nose and Hutchinson teeth.'
    },
    recommendedAntibiotics: {
      firstLine: ['Benzathine Penicillin G (tiêm bắp sâu - điều trị lựa chọn duy nhất cho mọi giai đoạn)'],
      alternative: ['Doxycycline (uống 14-28 ngày nếu dị ứng Penicillin ở người không mang thai)', 'Ceftriaxone', 'Penicillin G tinh thể tiêm tĩnh mạch (bắt buộc cho Giang mai thần kinh)'],
      intrinsicResistance: ['Aminoglycosides (không hiệu quả)', 'Quinolones']
    },
    clsiGroupNotes: {
      groupA: ['Penicillin G (Benzathine / Aqueous crystalline)']
    },
    diagnosticPitfalls: {
      vi: 'Không nuôi cấy được trên thạch vi sinh! Chẩn đoán huyết thanh dùng 2 nhóm test: (1) Test không đặc hiệu Nontreponemal (RPR, VDRL) để định lượng theo dõi hiệu giá kháng thể điều trị, dễ âm tính giả do hiện tượng Prozone khi hiệu giá quá cao; (2) Test đặc hiệu Treponemal (TP-PA, FTA-ABS, EIA) để khẳng định, tồn tại dương tính suốt đời. Hiện tượng phản ứng sốt Jarisch-Herxheimer thường xảy ra trong 24 giờ đầu sau mũi tiêm Penicillin.',
      en: 'Cannot be cultured in vitro. Nontreponemal tests (RPR/VDRL) monitor treatment response (watch for Prozone effect). Treponemal tests (TP-PA, EIA) confirm diagnosis and remain positive for life. Jarisch-Herxheimer reaction common post-penicillin.'
    },
    svgType: 'spirochete'
  },

  // 4. Haemophilus ducreyi
  {
    id: 'h_ducreyi',
    name: 'Haemophilus ducreyi',
    scientificName: 'Haemophilus ducreyi',
    commonName: {
      vi: 'Trực khuẩn Hạ cam mềm (Chancroid)',
      en: 'Chancroid bacillus'
    },
    taxonomy: {
      domain: 'Bacteria',
      phylum: 'Pseudomonadota',
      class: 'Gammaproteobacteria',
      order: 'Pasteurellales',
      family: 'Pasteurellaceae',
      genus: 'Haemophilus',
      species: 'H. ducreyi'
    },
    gramReaction: 'gram_negative',
    shape: 'coccobacilli',
    arrangement: 'Small, pleomorphic coccobacilli arranging in parallel chains or clusters described as a "school of fish" or "railroad tracks"',
    oxygen: 'facultative_anaerobe',
    biosafetyLevel: 2,
    directSmearFeatures: {
      vi: 'Trực cầu khuẩn Gram âm nhỏ, bắt màu đậm hai cực, xếp thành chuỗi song song đặc trưng giống "đàn cá bơi" (school of fish) hoặc "đường ray xe lửa" (railroad tracks) giữa các tế bào mủ.',
      en: 'Small, pleomorphic Gram-negative coccobacilli with bipolar staining, arranging in parallel chains resembling a "school of fish" or "railroad tracks" pattern.'
    },
    colony: {
      bloodAgar: 'No growth on sheep blood agar due to lack of free X factor (hemin).',
      hemolysis: 'gamma',
      chocolateAgar: 'Slow growth; requires enriched media with IsoVitaleX and fetal bovine serum, incubated at 33-35°C in 5% CO2 for 48-72 hours.',
      macConkeyAgar: 'No growth.',
      otherMedia: 'Selective GC agar or Mueller-Hinton base with 5% sheep blood, 1% IsoVitaleX, and 3 µg/mL Vancomycin (at 33°C, humidified CO2): small, smooth, yellow-gray colonies.',
      elevation: 'convex'
    },
    biochemicals: {
      catalase: '-',
      oxidase: '+',
      otherKeyTests: 'CHỈ ĐÒI HỎI YẾU TỐ X (Hemin), KHÔNG CẦN YẾU TỐ V (NAD); Thử nghiệm Porphyrin/ALA âm tính (-); Lên men Glucose (+), Nitrate (+).'
    },
    virulenceFactors: {
      vi: [
        'Độc tố tế bào làm phình nhân (Cytolethal distending toxin - HdCDT): Gây chết tế bào lympho T và tế bào biểu mô da.',
        'Protein màng ngoài DsrA: Ức chế thực bào và kháng lại tác dụng diệt khuẩn của huyết thanh bổ thể.',
        'Lông pili siêu mịn bám dính tế bào sừng thượng bì.'
      ],
      en: [
        'Cytolethal distending toxin (HdCDT): Induces apoptosis in human keratinocytes and T cells.',
        'Serum resistance protein DsrA: Confers resistance to complement-mediated killing.',
        'Fine fimbriae mediating strong adhesion to epidermal keratinocytes.'
      ]
    },
    primaryToxins: ['Cytolethal distending toxin (HdCDT)'],
    clinicalSignificance: {
      vi: 'Căn nguyên gây bệnh Hạ cam mềm (Chancroid) - một bệnh loét sinh dục lây qua đường tình dục. Biểu hiện kinh điển: Vết loét sinh dục mềm, bờ nham nhở KHÔNG CỨNG, ĐÁY TIẾT NHIỀU DỊCH MỦ VÀ CỰC KỲ ĐAU ĐỚN (trái ngược hoàn toàn với săng giang mai không đau). Khoảng 50% trường hợp có biến chứng viêm phì đại hạch bẹn một bên hóa mủ vỡ rò mủ (Bubo). Là yếu tố nguy cơ tăng truyền nhiễm HIV lên gấp 5-10 lần.',
      en: 'Etiologic agent of Chancroid (soft chancre). Characterized by multiple, EXTREMELY PAINFUL genital ulcers with non-indurated ragged margins and purulent base, accompanied by painful fluctuant unilateral inguinal buboes. Major co-factor for HIV transmission.'
    },
    recommendedAntibiotics: {
      firstLine: ['Azithromycin 1g uống liều duy nhất', 'Ceftriaxone 250mg tiêm bắp liều duy nhất'],
      alternative: ['Ciprofloxacin 500mg uống 2 lần/ngày trong 3 ngày', 'Erythromycin base 500mg uống 3 lần/ngày trong 7 ngày'],
      intrinsicResistance: ['Penicillin / Ampicillin (do sinh enzyme beta-lactamase plasmid)']
    },
    clsiGroupNotes: {
      groupA: ['Azithromycin', 'Ceftriaxone', 'Ciprofloxacin']
    },
    diagnosticPitfalls: {
      vi: 'Rất khó nuôi cấy (độ nhạy <50%) và dễ bị các tạp khuẩn đường sinh dục mọc đè. Bắt buộc ủ ở nhiệt độ thấp hơn bình thường (33-35°C, không ủ 37°C) trong môi trường có độ ẩm cao và 5-10% CO2. Ngày nay tiêu chuẩn vàng là NAAT PCR.',
      en: 'Extremely fastidious (<50% culture sensitivity); requires lower incubation temperature (33-35°C, humid 5% CO2). Readily overgrown by vaginal flora; PCR is the definitive gold standard.'
    },
    svgType: 'school_of_fish'
  },

  // 5. Erysipelothrix rhusiopathiae
  {
    id: 'e_rhusiopathiae',
    name: 'Erysipelothrix rhusiopathiae',
    scientificName: 'Erysipelothrix rhusiopathiae',
    commonName: {
      vi: 'Trực khuẩn đóng dấu lợn / Bệnh Erysipeloid',
      en: 'Swine erysipelas bacillus / Fish handler\'s disease'
    },
    taxonomy: {
      domain: 'Bacteria',
      phylum: 'Bacillota (Firmicutes)',
      class: 'Erysipelotrichia',
      order: 'Erysipelotrichales',
      family: 'Erysipelotrichaceae',
      genus: 'Erysipelothrix',
      species: 'E. rhusiopathiae'
    },
    gramReaction: 'gram_positive',
    shape: 'bacilli',
    arrangement: 'Slender, thin Gram-positive rods arranged singly, in short chains, or long non-branching tangled filaments in rough colonies',
    oxygen: 'facultative_anaerobe',
    biosafetyLevel: 2,
    directSmearFeatures: {
      vi: 'Trực khuẩn Gram dương mảnh, ngắn, có thể xếp chuỗi; ở các khuẩn lạc dạng nhám (rough colony) biến đổi thành các sợi chỉ dài ngoằn ngoèo không phân nhánh. Dễ bị bắt màu Gram âm loang lổ sau 24h.',
      en: 'Slender, thin, non-spore-forming Gram-positive bacilli; form long tangled non-branching filaments in rough colonies. Easily decolorizes during Gram staining.'
    },
    colony: {
      bloodAgar: 'Small, circular, convex, translucent smooth colonies (smooth form) or larger, flat, rough colonies with matte surface; typically shows green alpha-hemolysis after 48h.',
      hemolysis: 'alpha',
      chocolateAgar: 'Small transparent colonies.',
      macConkeyAgar: 'No growth.',
      otherMedia: 'Gelatin stab culture: Characteristic "test-tube brush" (bottle-brush) lateral spike growth radiating outward along the stab line at 22-25°C.',
      elevation: 'convex'
    },
    biochemicals: {
      catalase: '-',
      oxidase: '-',
      h2s: '+',
      motility: '-',
      esculin: '-',
      otherKeyTests: 'SINH H2S DỌC ĐƯỜNG ĐÂM SÂU TRÊN THẠCH TSI/KIA (Trực khuẩn Gram dương duy nhất sinh H2S (+)); Thủy phân Esculin âm tính (-) giúp phân biệt với Listeria monocytogenes (+); Catalase (-).'
    },
    virulenceFactors: {
      vi: [
        'Enzyme Neuraminidase: Cắt đứt acid sialic trên bề mặt tế bào nội mô, giúp vi khuẩn xâm lấn mô sâu.',
        'Lớp vỏ Polysaccharide capsule: Kháng lại quá trình thực bào của bạch cầu trung tính.',
        'Protein gắn bề mặt (Adhesins) giúp bám vào van tim.'
      ],
      en: [
        'Neuraminidase: Cleaves sialic acids facilitating tissue attachment and vascular invasion.',
        'Polysaccharide capsule: Inhibits phagocytosis by polymorphonuclear leukocytes.',
        'Surface adhesins mediating tropism for vascular endothelium and cardiac valves.'
      ]
    },
    primaryToxins: ['Neuraminidase', 'Hyaluronidase'],
    clinicalSignificance: {
      vi: 'Bệnh truyền lây từ động vật (Zoonosis) liên quan đến nghề nghiệp: Công nhân lò mổ lợn, người bán thịt cá, ngư dân (Fish handler\'s disease). 3 thể lâm sàng: (1) Erysipeloid khu trú (Hồng ban tím đỏ rực hình tròn ở ngón tay/bàn tay, bờ nổi gồ lan rộng, ngứa rát buốt, KHÔNG HÓA MỦ); (2) Thể da lan tỏa; (3) Thể nhiễm khuẩn huyết kèm Viêm nội tâm mạc ác tính (thường tổn thương van động mạch chủ ở van lành, tỷ lệ tử vong cao).',
      en: 'Occupational zoonosis in swine butchers and fishmongers. Forms include: (1) Localized Erysipeloid of Rosenbach (sharply demarcated violaceous cellulitis of hands without suppuration); (2) Diffuse cutaneous; (3) Sepsis with high-mortality destructive endocarditis on native aortic valves.'
    },
    recommendedAntibiotics: {
      firstLine: ['Penicillin G (hoặc Ampicillin)'],
      alternative: ['Ciprofloxacin', 'Levofloxacin', 'Doxycycline'],
      intrinsicResistance: ['VANCOMYCIN (Đề kháng tự nhiên hoàn toàn với glycopeptide!)', 'Daptomycin (MIC cao)', 'Teicoplanin']
    },
    clsiGroupNotes: {
      groupA: ['Penicillin', 'Ampicillin', 'Ciprofloxacin']
    },
    diagnosticPitfalls: {
      vi: 'NGUY HIỂM CHẾT NGƯỜI NẾU NHẦM LẪN: Vi khuẩn đề kháng tự nhiên 100% với Vancomycin! Nếu bác sĩ nhầm lẫn với viêm mô tế bào do tụ cầu/liên cầu và dùng Vancomycin kinh nghiệm, bệnh nhân viêm nội tâm mạc sẽ tử vong. Sinh H2S trên TSI là dấu hiệu nhận diện bất biến.',
      en: 'FATAL CLINICAL PITFALL: E. rhusiopathiae is INTRINSICALLY RESISTANT TO VANCOMYCIN! Empiric vancomycin for suspected staph cellulitis/endocarditis will fail catastrophically. H2S production in TSI confirms identification.'
    },
    svgType: 'filament_rod'
  },

  // 6. Pasteurella multocida
  {
    id: 'pasteurella_multocida',
    name: 'Pasteurella multocida',
    scientificName: 'Pasteurella multocida',
    commonName: {
      vi: 'Trực khuẩn Pasteurella / Nhiễm trùng do chó mèo cắn',
      en: 'Pasteurella / Animal bite cellulitis'
    },
    taxonomy: {
      domain: 'Bacteria',
      phylum: 'Pseudomonadota',
      class: 'Gammaproteobacteria',
      order: 'Pasteurellales',
      family: 'Pasteurellaceae',
      genus: 'Pasteurella',
      species: 'P. multocida'
    },
    gramReaction: 'gram_negative',
    shape: 'coccobacilli',
    arrangement: 'Small, ovoid, pleomorphic Gram-negative coccobacilli or short rods occurring singly, in pairs, or short chains; distinctive bipolar staining (safety pin appearance)',
    oxygen: 'facultative_anaerobe',
    biosafetyLevel: 2,
    directSmearFeatures: {
      vi: 'Trực cầu khuẩn Gram âm rất nhỏ, hình bầu dục, bắt màu đậm hai cực (bipolar staining) giống hình chiếc ghim băng an toàn (safety pin) khi nhuộm Giemsa hoặc Wayson.',
      en: 'Minute, pleomorphic Gram-negative coccobacilli with characteristic bipolar "safety-pin" staining on Giemsa or methylene blue stain.'
    },
    colony: {
      bloodAgar: 'Small to medium, round, smooth, grayish-white, non-hemolytic colonies with a characteristic musty or mushroom-like odor due to indole.',
      hemolysis: 'gamma',
      chocolateAgar: 'Good growth with smooth buttery colonies.',
      macConkeyAgar: 'NO GROWTH (Failure to grow on MacConkey agar is a critical diagnostic feature).',
      otherMedia: 'Nutrient agar without blood: growth supported.',
      odor: 'Musty / mushroom-like / semen-like odor (due to indole production)',
      elevation: 'convex'
    },
    biochemicals: {
      catalase: '+',
      oxidase: '+',
      indole: '+',
      urease: '-',
      otherKeyTests: 'BỘ BA KINH ĐIỂN: Oxidase (+), Catalase (+), Indole (+) VÀ KHÔNG MỌC TRÊN MACCONKEY; Lên men Glucose kiểu acid không sinh hơi; Nhạy cảm cao với Penicillin (đĩa 10-unit).'
    },
    virulenceFactors: {
      vi: [
        'Độc tố hủy xương Pasteurella multocida toxin (PMT): Kích hoạt protein Gq/11, gây tiêu hủy xương và hoại tử mô liên kết.',
        'Lớp vỏ Hyaluronic acid capsule: Ức chế thực bào và ngăn cản bổ thể bám dính.',
        'Fimbriae bám dính tế bào biểu mô đường hô hấp trên của động vật.'
      ],
      en: [
        'Pasteurella multocida toxin (PMT): Dermonecrotic toxin activating G-proteins, stimulating osteoclast bone resorption.',
        'Hyaluronic acid antiphagocytic capsule: Protects against neutrophil phagocytosis and serum lysis.',
        'Fimbrial adhesins mediating attachment to mucosal epithelial surfaces.'
      ]
    },
    primaryToxins: ['Pasteurella multocida dermonecrotic toxin (PMT)'],
    clinicalSignificance: {
      vi: 'Vi hệ bình thường trong khoang miệng của 70-90% mèo và 50-60% chó. Là căn nguyên số 1 gây nhiễm trùng sau vết cào hoặc cắn của mèo/chó. Đặc điểm lâm sàng nổi bật: Viêm mô tế bào khởi phát CỰC NHANH (< 24 giờ, thường chỉ trong 2-12 giờ) với sưng nề đỏ đau nhức dữ dội, tiết dịch xơ huyết mùi hôi. Biến chứng nguy hiểm do răng mèo đâm sâu: Viêm bao gân gập mủ (Tenosynovitis), Viêm khớp nhiễm khuẩn, Viêm tủy xương và Nhiễm khuẩn huyết.',
      en: 'Normal oral flora of domestic cats (90%) and dogs (50%). Leading cause of acute animal bite wound infections. Characterized by explosive rapid onset (<24h, typically 2-12h) of intense pain, erythema, and serosanguinous discharge. Complications: tenosynovitis, osteomyelitis, septic arthritis.'
    },
    recommendedAntibiotics: {
      firstLine: ['Amoxicillin-clavulanic acid (Augmentin uống)', 'Ampicillin-sulbactam (Unasyn tiêm TM)'],
      alternative: ['Doxycycline', 'Ciprofloxacin', 'Ceftriaxone', 'Penicillin G'],
      intrinsicResistance: ['Cephalexin / Cefadroxil (Cephalosporin thế hệ 1 KHÔNG HIỆU QUẢ!)', 'Clindamycin', 'Vancomycin', 'Erythromycin']
    },
    clsiGroupNotes: {
      groupA: ['Penicillin', 'Amoxicillin-clavulanate', 'Ampicillin-sulbactam'],
      groupB: ['Doxycycline', 'Ciprofloxacin']
    },
    diagnosticPitfalls: {
      vi: 'SAI LẦM ĐIỀU TRỊ THƯỜNG GẶP: Bác sĩ cho dùng Cephalexin hoặc Clindamycin để điều trị vết thương cắn ngoài da vì nghĩ do tụ cầu -> Thất bại điều trị hoàn toàn do P. multocida đề kháng kém với Cephalosporin thế hệ 1 và Clindamycin! Luôn phải dùng Amoxicillin-clavulanate. Mùi nấm mốc (musty odor) và không mọc trên MacConkey là chìa khóa vi sinh.',
      en: 'TREATMENT PITFALL: First-generation cephalosporins (Cephalexin) and Clindamycin have POOR activity against P. multocida; Amoxicillin-clavulanate is mandatory. Oxidase+, Indole+, and failure to grow on MacConkey confirm diagnosis.'
    },
    svgType: 'bipolar_rod'
  },

  // 7. Capnocytophaga canimorsus
  {
    id: 'capnocytophaga_canimorsus',
    name: 'Capnocytophaga canimorsus',
    scientificName: 'Capnocytophaga canimorsus',
    commonName: {
      vi: 'Trực khuẩn gây sốc nhiễm trùng tối cấp sau chó cắn (DF-2)',
      en: 'Dog bite sepsis bacillus (Dysgonic Fermenter-2 / DF-2)'
    },
    taxonomy: {
      domain: 'Bacteria',
      phylum: 'Bacteroidota',
      class: 'Flavobacteriia',
      order: 'Flavobacteriales',
      family: 'Flavobacteriaceae',
      genus: 'Capnocytophaga',
      species: 'C. canimorsus'
    },
    gramReaction: 'gram_negative',
    shape: 'pleomorphic',
    arrangement: 'Slender, fusiform Gram-negative bacilli with tapered pointed ends; may show curved or filamentous morphology',
    oxygen: 'capnophile',
    biosafetyLevel: 2,
    directSmearFeatures: {
      vi: 'Trực khuẩn Gram âm mảnh mai, hai đầu nhọn hình thoi (fusiform), hơi cong. Đôi khi quan sát thấy trực khuẩn nằm bên trong bạch cầu đa nhân trung tính (intracellular) trên tiêu bản nhuộm Gram cặn ly tâm máu cấy.',
      en: 'Slender, fusiform Gram-negative rods with tapered pointy ends. Can be seen intracellularly within neutrophils in buffy coat or positive blood culture bottles.'
    },
    colony: {
      bloodAgar: 'Small, flat, grayish-yellow, slightly spreading colonies with gliding motility producing a faint fringe or swarming-like edge on chocolate and blood agar after 48-72h in 5-10% CO2.',
      hemolysis: 'gamma',
      chocolateAgar: 'Slow growth, pale yellow spreading colonies.',
      macConkeyAgar: 'NO GROWTH.',
      otherMedia: 'Heart infusion agar with rabbit blood: enhanced gliding motility fringed margins.',
      elevation: 'flat',
      margin: 'spreading'
    },
    biochemicals: {
      catalase: '+',
      oxidase: '+',
      otherKeyTests: 'Di động trượt (Gliding motility) trên mặt thạch rắn; Lên men Glucose, Maltose, Lactose; Thử nghiệm Oxidase (+) và Catalase (+) phân biệt với các loài Capnocytophaga khoang miệng người (Oxidase - / Catalase -).'
    },
    virulenceFactors: {
      vi: [
        'Cơ chế ức chế thực bào tinh vi: Đề kháng lại sự thấu bào và phá hủy bổ thể qua trung gian TLR4.',
        'Deglycosylase: Cắt đứt các chuỗi polysaccharide bảo vệ trên bề mặt thụ thể tế bào miễn dịch.',
        'Khả năng nhân lên nhanh chóng trong máu mà không kích hoạt phản ứng viêm ban đầu (Stealth pathogen).'
      ],
      en: [
        'Stealth immune evasion: Blocks TLR4-mediated activation and evades complement killing.',
        'Surface deglycosylases stripping protective glycoproteins from host immune cells.',
        'Intracellular survival within macrophages resisting oxidative burst.'
      ]
    },
    primaryToxins: ['No classic exotoxin; lethal DIC driven by severe endotoxemia and vascular purpura'],
    clinicalSignificance: {
      vi: 'Vi hệ thường trú trong miệng của >74% chó và >57% mèo. Lây truyền qua vết cắn, vết cào, hoặc thậm chí CHỈ CẦN VẾT LIẾM của chó lên da trầy xước. Ở NGƯỜI ĐÃ CẮT LÁCH (Asplenia) HOẶC NGHIỆN RƯỢU MẠN TÍNH: Vi khuẩn gây Nhiễm khuẩn huyết tối cấp, Sốc nhiễm trùng tử vong nhanh trong 24-48 giờ, Đông máu nội mạch rải rác (DIC) và Ban xuất huyết hoại tử đối xứng (Purpura fulminans) dẫn đến hoại thư cụt tứ chi.',
      en: 'Normal oral flora of dogs (>74%) and cats (>57%). Transmitted via bites, scratches, or licking of broken skin. In SPLENECTOMIZED, ALCOHOLIC, or immunosuppressed patients: causes fulminant bacteremia, septic shock, catastrophic DIC, and symmetrical peripheral gangrene (Purpura fulminans) requiring amputation.'
    },
    recommendedAntibiotics: {
      firstLine: ['Ampicillin-sulbactam tiêm TM (hoặc Piperacillin-tazobactam)', 'Amoxicillin-clavulanic acid (uống)'],
      alternative: ['Meropenem', 'Ceftriaxone', 'Clindamycin'],
      intrinsicResistance: ['Aminoglycosides (Gentamicin, Tobramycin - ĐỀ KHÁNG TỰ NHIÊN!)', 'TMP-SMX', 'Colistin']
    },
    clsiGroupNotes: {
      groupA: ['Ampicillin-sulbactam', 'Meropenem', 'Ceftriaxone']
    },
    diagnosticPitfalls: {
      vi: 'Phát triển rất chậm trên chai cấy máu (có thể mất 5-7 ngày mới báo dương tính) và đòi hỏi CO2 để mọc. Vi khuẩn có thể bị bỏ sót nếu rút ngắn thời gian ủ cấy máu. KHÔNG BAO GIỜ DÙNG Aminoglycoside để phối hợp điều trị vì vi khuẩn đề kháng tự nhiên hoàn toàn.',
      en: 'Slow-growing capnophilic organism; automated blood cultures may take 5-7 days to turn positive. Intrinsically resistant to Aminoglycosides and TMP-SMX.'
    },
    svgType: 'fusiform_rod'
  },

  // 8. Bartonella henselae
  {
    id: 'b_henselae',
    name: 'Bartonella henselae',
    scientificName: 'Bartonella henselae',
    commonName: {
      vi: 'Trực khuẩn gây Bệnh Sốt mèo cào / U mạch trực khuẩn',
      en: 'Cat scratch disease / Bacillary angiomatosis'
    },
    taxonomy: {
      domain: 'Bacteria',
      phylum: 'Pseudomonadota',
      class: 'Alphaproteobacteria',
      order: 'Hyphomicrobiales',
      family: 'Bartonellaceae',
      genus: 'Bartonella',
      species: 'B. henselae'
    },
    gramReaction: 'gram_negative',
    shape: 'coccobacilli',
    arrangement: 'Small, curved, pleomorphic Gram-negative coccobacilli; fastidious, intracellular pathogen',
    oxygen: 'aerobe',
    biosafetyLevel: 2,
    directSmearFeatures: {
      vi: 'Trực cầu khuẩn Gram âm cực nhỏ, bắt màu rất nhạt trên tiêu bản nhuộm Gram thông thường. Nhuộm bạc Warthin-Starry trên sinh thiết mô hạch thấy vi khuẩn tập trung thành từng đám màu nâu đen trong vùng hoại tử.',
      en: 'Minute, curved, pleomorphic Gram-negative rods staining poorly with routine Gram stain. Readily demonstrated as brown-black clusters in necrotic tissue using Warthin-Starry silver stain.'
    },
    colony: {
      bloodAgar: 'Extremely slow growing (requires 9 to 40 days of incubation at 35°C in 5% CO2); small, rough, cauliflower-like, pitted dry colonies adhering tenaciously to the agar surface.',
      hemolysis: 'gamma',
      chocolateAgar: 'Slow growth of dry, rough embedded colonies.',
      macConkeyAgar: 'NO GROWTH.',
      otherMedia: 'Fresh rabbit blood agar or endothelial cell co-culture; lysis-centrifugation blood culture (Isolator).',
      elevation: 'raised',
      texture: 'dry'
    },
    biochemicals: {
      catalase: '-',
      oxidase: '-',
      urease: '-',
      otherKeyTests: 'Hoàn toàn trơ về mặt sinh hóa (biochemically inert); Nhận diện dựa vào PCR khuếch đại gen gltA / rpoB hoặc huyết thanh học IFA.'
    },
    virulenceFactors: {
      vi: [
        'Protein kích thích tăng sinh nội mạc mạch máu (Bartonella angiogenic factor - BadA): Thúc đẩy bài tiết VEGF gây tân tạo mạch máu u cục.',
        'Hệ thống tiết Type IV (VirB/VirD4 T4SS): Bơm các protein tác động vào tế bào nội mô người, ngăn ngừa quá trình tự chết (apoptosis).',
        'Lông Pili bám dính tế bào hồng cầu (Intraerythrocytic parasitism).'
      ],
      en: [
        'BadA adhesin: Stimulates host secretion of vascular endothelial growth factor (VEGF) driving neoangiogenesis.',
        'Type IV secretion system (VirB/VirD4): Injects Bep effectors preventing endothelial apoptosis.',
        'Intraerythrocytic parasitism: Survives inside human and feline erythrocytes avoiding immune clearance.'
      ]
    },
    primaryToxins: ['No classic exotoxin; pathology driven by intraerythrocytic parasitism and angiogenic proliferation'],
    clinicalSignificance: {
      vi: 'Ổ chứa tự nhiên là Mèo nhà (đặc biệt là Mèo con) với bọ chét mèo Ctenocephalides felis làm véc-tơ truyền bệnh. Lây truyền qua vết cào, vết cắn hoặc liếm của mèo. Biểu hiện lâm sàng: (1) Bệnh sốt mèo cào (Cat Scratch Disease - CSD) ở người có miễn dịch bình thường: Vết sẩn đỏ ban đầu tại vết cào sau 1-2 tuần, sau đó nổi hạch lympho vùng (nách, cổ, bẹn) phì đại rất to, sưng đau, có thể hóa mủ vô khuẩn kéo dài vài tháng; (2) Ở bệnh nhân HIV/AIDS (CD4 < 100/µL): Gây U mạch trực khuẩn (Bacillary angiomatosis - tổn thương u hạt mạch máu đỏ thẫm trên da giống Sarcoma Kaposi) và Viêm gan dạng chấm xuất huyết (Peliosis hepatis).',
      en: 'Feline reservoir (cat fleas vector). (1) Cat Scratch Disease (CSD) in immunocompetent: primary skin papule followed 2-3 weeks later by regional tender lymphadenopathy. (2) In immunocompromised (HIV/AIDS): Bacillary angiomatosis (vascular skin lesions mimicking Kaposi sarcoma) and Peliosis hepatis (blood-filled cystic hepatic cavities).'
    },
    recommendedAntibiotics: {
      firstLine: ['Azithromycin (cho Bệnh sốt mèo cào hạch)', 'Doxycycline (uống 3 tháng cho U mạch trực khuẩn ở HIV)'],
      alternative: ['Ciprofloxacin', 'Rifampin', 'TMP-SMX'],
      intrinsicResistance: ['Penicillins / Cephalosporins (không hiệu quả trên lâm sàng in vivo dù nhạy trên in vitro)']
    },
    clsiGroupNotes: {
      groupA: ['Azithromycin', 'Doxycycline']
    },
    diagnosticPitfalls: {
      vi: 'Thời gian ủ cấy máu có thể kéo dài tới 4-6 tuần trên hệ thống thông thường; Cấy đĩa thạch máu thường âm tính. Tiêu chuẩn chẩn đoán hiện đại là Huyết thanh học IFA (hiệu giá IgG >= 1:256) hoặc sinh thiết hạch nhuộm bạc Warthin-Starry / PCR khuếch đại gen đặc hiệu.',
      en: 'Blood cultures take 2-6 weeks and have low yield; diagnosis is made via Serology (IFA IgG >= 1:256), Warthin-Starry silver staining on tissue biopsies, or PCR.'
    },
    svgType: 'intracellular_rod'
  },

  // 9. Vibrio vulnificus
  {
    id: 'vibrio_vulnificus',
    name: 'Vibrio vulnificus',
    scientificName: 'Vibrio vulnificus',
    commonName: {
      vi: 'Phẩy khuẩn biển ăn thịt người / Nhiễm trùng huyết do hải sản',
      en: 'Flesh-eating marine Vibrio / Halophilic wound pathogen'
    },
    taxonomy: {
      domain: 'Bacteria',
      phylum: 'Pseudomonadota',
      class: 'Gammaproteobacteria',
      order: 'Vibrionales',
      family: 'Vibrionaceae',
      genus: 'Vibrio',
      species: 'V. vulnificus'
    },
    gramReaction: 'gram_negative',
    shape: 'curved_rod',
    arrangement: 'Curved, comma-shaped or straight Gram-negative rods with a single polar flagellum; actively motile',
    oxygen: 'facultative_anaerobe',
    biosafetyLevel: 2,
    directSmearFeatures: {
      vi: 'Trực khuẩn Gram âm hình cong dấu phẩy, chuyển động cực kỳ linh hoạt nhờ một lông roi ở một cực. Nhuộm soi dịch nốt phỏng thấy trực khuẩn Gram âm kèm nhiều hồng cầu và hoại tử mô.',
      en: 'Curved, comma-shaped Gram-negative rods with single polar flagellum exhibiting rapid darting motility in wet mounts.'
    },
    colony: {
      bloodAgar: 'Medium to large, smooth, opaque, round, beta-hemolytic colonies after 24h at 35°C.',
      hemolysis: 'beta',
      chocolateAgar: 'Abundant growth.',
      macConkeyAgar: 'Grows as lactose fermenter (pink colonies on MAC after 48h - 85% of strains ferment lactose).',
      otherMedia: 'TCBS Agar: 85% of strains form GREEN / BLUE-GREEN colonies (sucrose non-fermenting, unlike yellow V. cholerae); CPC agar.',
      pigment: 'Green on TCBS agar',
      elevation: 'convex'
    },
    biochemicals: {
      catalase: '+',
      oxidase: '+',
      indole: '+',
      lactoseFermentation: '+',
      otherKeyTests: 'ƯA MUỐI BẮT BUỘC (Halophilic: đòi hỏi tối thiểu 0.5-1% NaCl để mọc, nồng độ tối ưu 1-3% NaCl); Lên men Lactose (+) ở 85% chủng (duy nhất trong chi Vibrio); Không lên men Sucrose trên TCBS (khuẩn lạc xanh lục); Khử Nitrate (+).'
    },
    virulenceFactors: {
      vi: [
        'Vỏ Polysaccharide capsule: Yếu tố độc lực sống còn nhất, kháng lại thực bào và diệt khuẩn qua trung gian bổ thể.',
        'Độc tố Multifunctional autoprocessing repeats-in-toxin (MARTX): Tiêu hủy actin, gây hoại tử tế bào hàng loạt.',
        'Hệ thống thu nhận sắt (Iron acquisition / Siderophores): Tận dụng nồng độ sắt tự do cao trong huyết thanh bệnh nhân xơ gan hoặc ứ sắt để bùng nổ nhân lên với tốc độ kinh hoàng.',
        'Metalloprotease: Phá hủy collagen màng đáy nội mô gây thoát dịch và bọng nước xuất huyết.'
      ],
      en: [
        'Polysaccharide capsule: Essential for systemic virulence, preventing phagocytosis and complement lysis.',
        'MARTX toxin: Disrupts host actin cytoskeleton causing massive epithelial and endothelial cell necrosis.',
        'Iron scavenging siderophores: Rapidly proliferates in hyperferremic hosts (cirrhosis, hemochromatosis).',
        'VvpE metalloprotease: Degrades basement membranes inducing hemorrhagic bullae and edema.'
      ]
    },
    primaryToxins: ['MARTX toxin', 'Hemolysin / Cytolysin (VvhA)', 'Metalloprotease (VvpE)'],
    clinicalSignificance: {
      vi: 'Vi khuẩn sống tự do trong nước biển ấm (>20°C) và động vật có vỏ (Hàu, sò sống). 2 hội chứng lâm sàng đe dọa tính mạng: (1) Nhiễm khuẩn huyết nguyên phát (Primary septicemia): Xuất hiện sau khi ĂN HÀU SỐNG ở người có bệnh gan mạn tính (xơ gan, viêm gan, nghiện rượu) hoặc ứ sắt hemochromatosis; Khởi phát đột ngột sốt cao, rét run, tụt huyết áp sốc, xuất hiện các BỌNG NƯỚC XUẤT HUYẾT HOẠI TỬ DA (Hemorrhagic bullae) ở hai cẳng chân; Tỷ lệ tử vong >50% (lên tới 100% nếu sốc trong 48h); (2) Viêm mô tế bào hoại tử vết thương (Wound infection): Tiếp xúc nước biển hoặc bị gai cá/vỏ hàu đâm, tiến triển viêm cân mạc hoại tử nhanh cần phẫu thuật cắt cụt chi.',
      en: 'Halophilic marine pathogen. (1) Primary septicemia: Ingestion of raw oysters in patients with chronic liver disease (cirrhosis) or iron overload; explosive onset of fever, septic shock, and necrotic hemorrhagic bullae; >50% mortality. (2) Necrotizing wound infection after marine trauma requiring urgent surgical debridement or amputation.'
    },
    recommendedAntibiotics: {
      firstLine: ['Ceftriaxone (tiêm TM) + Doxycycline (uống/tiêm TM)'],
      alternative: ['Levofloxacin hoặc Ciprofloxacin phối hợp Cefotaxime'],
      intrinsicResistance: ['Vancomycin', 'Clindamycin', 'Macrolides']
    },
    clsiGroupNotes: {
      groupA: ['Doxycycline', 'Ceftriaxone', 'Levofloxacin']
    },
    diagnosticPitfalls: {
      vi: 'CẤP CỨU NỘI NGOẠI KHOA TỐI KHẨN! Mỗi giờ chậm trễ kháng sinh làm tăng tỷ lệ tử vong thêm 10%. Bệnh nhân xơ gan ăn hải sản sống có bọng nước xuất huyết chân phải điều trị Ceftriaxone + Doxycycline NGAY LẬP TỨC mà không đợi kết quả cấy máu. Cấy trên thạch TCBS mọc khuẩn lạc màu XANH LỤC (khác V. cholerae màu vàng).',
      en: 'HYPERACUTE MEDICAL EMERGENCY: Mortality exceeds 50% within 48h. Cirrhotic patients with hemorrhagic bullae after eating raw seafood require immediate Ceftriaxone + Doxycycline. Forms green colonies on TCBS (sucrose-negative).'
    },
    svgType: 'curved_rod'
  },

  // 10. Yersinia enterocolitica
  {
    id: 'y_enterocolitica',
    name: 'Yersinia enterocolitica',
    scientificName: 'Yersinia enterocolitica',
    commonName: {
      vi: 'Trực khuẩn Yersinia đường ruột / Hội chứng giả viêm ruột thừa',
      en: 'Yersiniosis / Pseudoappendicitis bacillus'
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
    arrangement: 'Small, pleomorphic Gram-negative coccobacilli or short rods with rounded ends; bipolar staining (safety pin) especially on Giemsa stain',
    oxygen: 'facultative_anaerobe',
    biosafetyLevel: 2,
    directSmearFeatures: {
      vi: 'Trực cầu khuẩn Gram âm nhỏ, đa hình thái, đầu tù. Nhuộm Giemsa hoặc xanh methylen thấy hiện tượng bắt màu đậm hai cực (bipolar staining). Bạch cầu đa nhân thoái hóa trong phân.',
      en: 'Small, pleomorphic Gram-negative coccobacilli with rounded ends; bipolar staining prominent on methylene blue or Giemsa preparations.'
    },
    colony: {
      bloodAgar: 'Pinpoint, translucent colonies after 24h at 35°C; larger and more distinctive after 48h.',
      hemolysis: 'gamma',
      chocolateAgar: 'Small translucent colonies.',
      macConkeyAgar: 'Non-lactose fermenter (small, colorless to pale peach translucent colonies).',
      otherMedia: 'CIN Agar (Cefsulodin-Irgasan-Novobiocin): Đặc hiệu nhất! Tạo khuẩn lạc hình "MẮT BÒ" (Bull\'s-eye) với tâm màu hồng cánh sen/đỏ thẫm và viền ngoài trong suốt sau 24-48h ở 25-30°C.',
      pigment: 'Deep red center with translucent border on CIN agar',
      elevation: 'convex'
    },
    biochemicals: {
      catalase: '+',
      oxidase: '-',
      urease: '+',
      motility: '+',
      tsi: 'A/A (hoặc K/A) H2S- (Do lên men Sucrose)',
      otherKeyTests: 'DI ĐỘNG PHỤ THUỘC NHIỆT ĐỘ: DI ĐỘNG DƯƠNG TÍNH (+) Ở 22-25°C NHƯNG BẤT ĐỘNG HOÀN TOÀN (-) Ở 35-37°C; Urease dương tính nhanh (+); Lên men Sucrose (+); Lên men Lactose (-); Phản ứng ODC (+).'
    },
    virulenceFactors: {
      vi: [
        'Protein xâm nhập YadA và Invasin: Gắn kết trực tiếp thụ thể beta-1 integrin trên tế bào M biểu mô ruột.',
        'Hệ thống tiết Type III (T3SS) và protein Yops (YopE, YopH, YopJ): Bơm vào đại thực bào làm tê liệt tế bào thực bào.',
        'Độc tố ruột chịu nhiệt Yst (Yersinia stable toxin): Tương tự độc tố ST của ETEC, làm tăng cGMP gây tiêu chảy nước.',
        'Khả năng sinh trưởng ở nhiệt độ lạnh 4°C (Psychrotrophic growth).'
      ],
      en: [
        'YadA and Invasin outer membrane proteins: Mediate binding to beta-1 integrins on microfold (M) cells of Peyer patches.',
        'Type III secretion system injecting Yops (YopH, YopE): Paralyzes macrophage phagocytosis and induces apoptosis.',
        'Heat-stable enterotoxin (Yst): Elevates cGMP inducing secretory diarrhea.',
        'Cold enrichment capability (proliferates at 4°C).'
      ]
    },
    primaryToxins: ['Heat-stable enterotoxin (Yst)'],
    clinicalSignificance: {
      vi: 'Nhiễm trùng từ thịt lợn chưa nấu chín (nem chua, tiết canh), sữa chưa tiệt trùng hoặc lây từ chó mèo. Biểu hiện lâm sàng: (1) Viêm dạ dày ruột cấp tính: Tiêu chảy phân nước hoặc nhầy máu, sốt; (2) HỘI CHỨNG GIẢ VIÊM RUỘT THỪA (Pseudoappendicitis): Viêm hạch mạc treo và viêm hồi tràng đoạn cuối gây đau dữ dội ở hố chậu phải kèm sốt, khiến nhiều bệnh nhân (đặc biệt là trẻ em và thanh thiếu niên) bị phẫu thuật cắt ruột thừa nhầm; (3) Nhiễm khuẩn huyết liên quan đến TRUYỀN KHỐI HỒNG CẦU: Do vi khuẩn phát triển mạnh được ở nhiệt độ tủ lạnh 4°C và tích lũy sắt trong túi máu; (4) Viêm khớp phản ứng sau nhiễm trùng ở người mang kháng nguyên HLA-B27.',
      en: 'Transmitted via undercooked pork or unpasteurized milk. (1) Acute gastroenteritis. (2) Pseudoappendicitis (mesenteric lymphadenitis & terminal ileitis presenting as RLQ pain leading to negative appendectomies). (3) Transfusion-related septic shock from contaminated RBC units (grows at 4°C). (4) Post-infectious reactive arthritis in HLA-B27 patients.'
    },
    recommendedAntibiotics: {
      firstLine: ['Ciprofloxacin (hoặc Levofloxacin)', 'TMP-SMX'],
      alternative: ['Ceftriaxone', 'Doxycycline', 'Gentamicin'],
      intrinsicResistance: ['Ampicillin / Amoxicillin', 'Cephalosporin thế hệ 1 (do sinh enzyme beta-lactamase AmpC và BlaA)']
    },
    clsiGroupNotes: {
      groupA: ['Ciprofloxacin', 'TMP-SMX', 'Ceftriaxone']
    },
    diagnosticPitfalls: {
      vi: 'Khuẩn lạc trên thạch MacConkey rất nhỏ và mọc chậm ở 35°C dễ bị trực khuẩn ruột khác lấn át; Bắt buộc cấy trên thạch chọn lọc CIN ủ ở 25-30°C để thấy hình mắt bò (bull\'s-eye). Thử nghiệm di động nhiệt độ kép (Motility (+) ở 25°C vs (-) ở 35°C) là xét nghiệm vàng nhận diện.',
      en: 'Overgrown on MacConkey at 35°C; culture on CIN agar at 25°C reveals classic pink "bull\'s-eye" colonies. Key test: motility positive at 25°C but negative at 35°C.'
    },
    svgType: 'bipolar_rod'
  },

  // 11. Acanthamoeba spp.
  {
    id: 'acanthamoeba_sp',
    name: 'Acanthamoeba castellanii / polyphaga',
    scientificName: 'Acanthamoeba spp.',
    commonName: {
      vi: 'Amip tự do gây Viêm loét giác mạc & Viêm não hạt (GAE)',
      en: 'Acanthamoeba / Contact lens keratitis'
    },
    taxonomy: {
      domain: 'Eukaryota',
      phylum: 'Amoebozoa',
      class: 'Discosea',
      order: 'Centramoebida',
      family: 'Acanthamoebidae',
      genus: 'Acanthamoeba',
      species: 'A. castellanii / A. polyphaga'
    },
    gramReaction: 'variable_or_other',
    shape: 'trophozoite_cyst',
    arrangement: 'Free-living ameba existing in two stages: motile trophozoite (15-45 µm) with spine-like acanthopodia, and highly resistant double-walled cyst (10-25 µm)',
    oxygen: 'aerobe',
    biosafetyLevel: 2,
    directSmearFeatures: {
      vi: 'Thể hoạt động (Trophozoite) có các chân giả hình gai nhọn (Acanthopodia), nhân có một nhân thể lớn ở trung tâm. Thể bào nang (Cyst) hình sao hoặc đa giác đặc trưng với 2 lớp vỏ dày (vỏ ngoài nhăn nheo ectocyst, vỏ trong hình đa giác endocyst). Bắt màu huỳnh quang sáng chói dưới ánh sáng tia UV khi nhuộm Calcofluor White.',
      en: 'Trophozoite features spine-like pseudopodia (acanthopodia) with prominent central nucleolus. Double-walled cysts (wrinkled outer ectocyst and polygonal inner endocyst). Bright apple-green fluorescence under UV with Calcofluor White stain.'
    },
    colony: {
      bloodAgar: 'Does not grow on standard bacteriological agar media.',
      hemolysis: 'gamma',
      chocolateAgar: 'No growth.',
      macConkeyAgar: 'No growth.',
      otherMedia: 'Nonnutrient agar (NNA) coated with a lawn of live or heat-killed Escherichia coli or Enterobacter aerogenes: Amip ăn vi khuẩn và bò để lại các đường hằn ngoằn ngoèo (track marks) nhìn rõ sau 2-7 ngày ở 30°C.',
      elevation: 'flat'
    },
    biochemicals: {
      otherKeyTests: 'Không có phản ứng sinh hóa vi khuẩn. Nhận diện dựa vào hình thái bào nang 2 lớp vỏ trên cạo giác mạc, đường di chuyển gặm vi khuẩn trên thạch NNA, và Real-time PCR khuếch đại gen 18S rRNA.'
    },
    virulenceFactors: {
      vi: [
        'Chân giả gai Acanthopodia: Bám dính chặt chẽ vào glycoprotein mannose trên biểu mô giác mạc.',
        'Enzyme tiêu Protein (MIP-133, Serine protease, Metalloprotease): Tiêu hủy màng Bowman và chất nền collagen nhu mô giác mạc.',
        'Bào nang 2 lớp vỏ cellulose cực kỳ bền vững: Đề kháng hoàn toàn với clo khử trùng nước máy, đông lạnh, nhiệt độ khô và hầu hết thuốc sát trùng kính áp tròng thông thường.'
      ],
      en: [
        'Acanthopodia: Mediate binding to mannosylated glycoproteins on corneal epithelial cells.',
        'Proteolytic enzymes (MIP-133 serine proteases): Digest collagenous corneal stroma and Bowman membrane.',
        'Double-walled cellulose cyst: Highly resistant to standard chlorine, freezing, and multipurpose contact lens solutions.'
      ]
    },
    primaryToxins: ['MIP-133 Serine protease', 'Cytolytic factor'],
    clinicalSignificance: {
      vi: 'Amip tự do trong nước ngọt, đất cát và nước máy. 2 hội chứng lâm sàng: (1) Viêm loét giác mạc do Acanthamoeba (Acanthamoeba keratitis): CẤP CỨU NHÃN KHOA ở người đeo kính áp tròng mềm (vệ sinh kính bằng nước máy, bơi lội khi đeo kính); Biểu hiện đau nhức mắt dữ dội vượt xa tổn thương thực thể nhìn thấy, thâm nhiễm giác mạc dạng vòng tròn nhẫn (Ring infiltrate) và viêm dây thần kinh quanh giác mạc (Radial keratoneuritis), dẫn tới mù lòa nếu không điều trị sớm; (2) Viêm não hạt do amip (Granulomatous amebic encephalitis - GAE) ở bệnh nhân suy giảm miễn dịch nặng / HIV: tổn thương u hạt hoại tử não mạn tính tử vong >90%.',
      en: 'Free-living ameba. (1) Acanthamoeba keratitis: Ocular emergency in contact lens wearers (using tap water or swimming with lenses). Agonizing ocular pain out of proportion to exam, classic stromal ring infiltrate, radial keratoneuritis; causes permanent blindness. (2) Granulomatous Amebic Encephalitis (GAE) in immunocompromised hosts (>90% mortality).'
    },
    recommendedAntibiotics: {
      firstLine: ['Polyhexamethylene biguanide (PHMB 0.02%) nhỏ mắt kết hợp Chlorhexidine 0.02%'],
      alternative: ['Brolene (Propamidine isethionate 0.1%) phối hợp Neomycin tra mắt', 'Voriconazole (hoặc Miltefosine đường uống cho GAE)'],
      intrinsicResistance: ['Kháng sinh diệt khuẩn thông thường KHÔNG CÓ TÁC DỤNG!']
    },
    clsiGroupNotes: {
      groupA: ['PHMB 0.02%', 'Chlorhexidine 0.02%']
    },
    diagnosticPitfalls: {
      vi: 'Thường bị chẩn đoán nhầm với viêm giác mạc do Herpes simplex (HSV) hoặc do nấm, khiến bệnh nhân bị dùng Corticosteroid nhỏ mắt làm bùng phát amip hoại tử toàn bộ nhãn cầu! Nuôi cấy bắt buộc dùng đĩa thạch NNA tráng thảm vi khuẩn E. coli. Nhuộm Calcofluor White trên mẫu cạo giác mạc là xét nghiệm nhanh tốt nhất.',
      en: 'Frequently misdiagnosed as Herpes simplex (HSV) or fungal keratitis; topical steroids exacerbate disease. Cultured on Nonnutrient Agar (NNA) with E. coli lawn. Calcofluor white staining of corneal scrapings is the fastest bedside diagnostic test.'
    },
    svgType: 'amoeba'
  }
];
