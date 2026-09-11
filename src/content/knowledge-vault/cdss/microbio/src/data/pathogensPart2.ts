import { Pathogen } from '../types';

export const PATHOGENS_PART2: Pathogen[] = [
  // 1. Fusarium solani (Chapter 27)
  {
    id: 'fusarium_solani',
    name: 'Fusarium solani',
    scientificName: 'Fusarium solani complex',
    commonName: {
      vi: 'Vi nấm Fusarium (Nấm sợi hình thuyền gây nhiễm nấm huyết)',
      en: 'Fusarium species (Banana-shaped macroconidia, Fungemia in BMT)'
    },
    taxonomy: {
      domain: 'Eukaryota',
      phylum: 'Ascomycota',
      class: 'Sordariomycetes',
      order: 'Hypocreales',
      family: 'Nectriaceae',
      genus: 'Fusarium',
      species: 'F. solani'
    },
    gramReaction: 'variable_or_other',
    shape: 'mold',
    arrangement: 'Septate hyphae branching at 45 degrees, sickle-shaped macroconidia',
    oxygen: 'obligate_aerobe',
    biosafetyLevel: 2,
    directSmearFeatures: {
      vi: 'Sinh thiết mô nhuộm GMS/PAS: Sợi nấm có vách ngăn phân nhánh góc 45 độ giống Aspergillus. Mẫu cấy: Thể sinh bào tử lớn (macroconidia) đa bào hình quả chuối hoặc chiếc thuyền cong (canoe-shaped) với 3-5 vách ngăn.',
      en: 'Tissue biopsy: Septate hyphae branching at 45° mimicking Aspergillus. Culture: Characteristic multicellular, sickle- or canoe-shaped macroconidia with 3-5 transverse septa.'
    },
    colony: {
      bloodAgar: 'Rapid growth; initially moist, yeastlike or membranous, rapidly developing white, pink, purple, or rose-colored aerial cottony mycelium.',
      hemolysis: 'gamma',
      chocolateAgar: 'Cottony floccose aerial mycelium.',
      macConkeyAgar: 'No growth.',
      otherMedia: 'Sabouraud Dextrose Agar (SDA) & Potato Dextrose Agar (PDA): Woolly/cottony, pinkish-purple or yellow-cream with deep purple-brown reverse.',
      pigment: 'Pink, purple, rose, or cream',
      texture: 'dry'
    },
    biochemicals: {
      catalase: '+',
      oxidase: 'variable'
    },
    virulenceFactors: {
      vi: [
        'Độc tố nấm mycotoxin (T-2 toxin, fumonisins, trichothecenes)',
        'Khả năng sinh bào tử trực tiếp trong dòng máu (adventitious sporulation)',
        'Protease và collagenase gây hoại tử mạch máu và mô'
      ],
      en: [
        'Mycotoxins (T-2 toxin, fumonisins, trichothecenes)',
        'Adventitious sporulation in blood',
        'Proteases and collagenases facilitating angioinvasion and tissue necrosis'
      ]
    },
    primaryToxins: ['T-2 toxin', 'Fumonisins', 'Trichothecenes'],
    clinicalSignificance: {
      vi: 'Nhiễm nấm Fusarium xâm lấn (Invasive Fusariosis) đặc biệt ở bệnh nhân ghép tủy (BMT) và ung thư huyết học: Sốt dai dẳng không đáp ứng kháng sinh, tổn thương da sẩn hoại tử rải rác ngoại vi, và ĐẶC BIỆT là cấy máu dương tính (điều hiếm thấy ở các nấm mốc khác). Tỷ lệ tử vong lên tới 90-100%. Ngoài ra gây viêm giác mạc do nấm (fungal keratitis) ở người đeo kính áp tròng.',
      en: 'Invasive fusariosis in hematologic malignancy and bone marrow transplant recipients: persistent fever, metastatic necrotic skin lesions, and blood culture positivity (unique among molds). Near 100% mortality. Also causes fungal keratitis in contact lens users.'
    },
    recommendedAntibiotics: {
      firstLine: ['Voriconazole', 'Liposomal Amphotericin B'],
      alternative: ['Posaconazole'],
      intrinsicResistance: ['Echinocandins (Caspofungin, Micafungin, Anidulafungin KHÔNG CÓ HOẠT TÍNH LÂM SÀNG)', 'Fluconazole']
    },
    clsiGroupNotes: {
      groupA: ['Voriconazole', 'Amphotericin B'],
      groupB: ['Posaconazole']
    },
    diagnosticPitfalls: {
      vi: 'Fusarium là một trong số rất ít nấm mốc có thể mọc trong bình cấy máu chuẩn. Đừng nhầm lẫn khuẩn lạc ướt ban đầu là nấm men Candida! Kháng tự nhiên hoàn toàn với nhóm Echinocandin.',
      en: 'Fusarium is one of the very few hyaline molds readily isolated from blood cultures. Initial moist colonies must not be mistaken for yeasts. Intrinsically refractory to echinocandins.'
    },
    svgType: 'mold_multicell'
  },

  // 2. Aspergillus fumigatus (Chapter 27)
  {
    id: 'aspergillus_fumigatus',
    name: 'Aspergillus fumigatus',
    scientificName: 'Aspergillus fumigatus',
    commonName: {
      vi: 'Nấm mốc khói (Gây u nấm phổi & Aspergillosis xâm lấn)',
      en: 'Smoky Green Mold (Invasive Aspergillosis / Aspergilloma)'
    },
    taxonomy: {
      domain: 'Eukaryota',
      phylum: 'Ascomycota',
      class: 'Eurotiomycetes',
      order: 'Eurotiales',
      family: 'Aspergillaceae',
      genus: 'Aspergillus',
      species: 'A. fumigatus'
    },
    gramReaction: 'variable_or_other',
    shape: 'mold',
    arrangement: 'Dichotomously branching septate hyphae (45-degree angle), single row of phialides on vesicle upper two-thirds',
    oxygen: 'obligate_aerobe',
    biosafetyLevel: 2,
    directSmearFeatures: {
      vi: 'Soi tươi dịch rửa phế quản hoặc nhuộm GMS/PAS: Sợi nấm có vách ngăn đều đặn, phân nhánh đôi hình chữ V (dichotomous) góc nhọn 45 độ đặc trưng. Bào đài (conidiophore) có bọc đỉnh (vesicle) hình chai, thể bình (phialides) đơn tầng (uniseriate) chỉ phân bố ở 2/3 trên bọc đỉnh, mang các chuỗi bào tử đính hình cầu màu xanh khói.',
      en: 'GMS/PAS: Uniformly septate hyphae with dichotomous 45° acute-angle branching. Conidiophore with bottle-shaped vesicle, uniseriate phialides covering upper two-thirds bearing chains of smoky green echinulate conidia.'
    },
    colony: {
      bloodAgar: 'Rapidly spreading velvety or powdery colonies, initial white turning smoky green or dark gray-green.',
      hemolysis: 'gamma',
      chocolateAgar: 'Smoky-green powdery colonies.',
      macConkeyAgar: 'No growth.',
      otherMedia: 'SDA / Potato Dextrose Agar: Velvety to powdery, smoky blue-green with pale yellow or white reverse; thermotolerant (grows well at 45°C).',
      pigment: 'Smoky green to dark gray-green',
      texture: 'dry'
    },
    biochemicals: {
      catalase: '+',
      oxidase: 'variable'
    },
    virulenceFactors: {
      vi: [
        'Kháng nguyên vách tế bào Galactomannan',
        'Elastase, protease serin phá hủy mô phổi',
        'Độc tố Gliotoxin ức chế đại thực bào phế nang',
        'Sắc tố Melanin ở vách bào tử chống oxy hóa diệt nấm'
      ],
      en: [
        'Galactomannan cell wall antigen',
        'Elastases, serine proteases, metalloproteinases',
        'Gliotoxin (immunosuppressive mycotoxin)',
        'Melanin in conidial wall preventing macrophage killing'
      ]
    },
    primaryToxins: ['Gliotoxin', 'Fumagillin'],
    clinicalSignificance: {
      vi: 'Nhiễm nấm Aspergillus phổi xâm lấn (IPA) ở bệnh nhân suy giảm miễn dịch nặng (giảm bạch cầu hạt, ghép tủy/tạng): Sốt, ho ra máu, đau ngực, hình ảnh "halo sign" trên CT scan lồng ngực. U nấm phổi (Aspergilloma) phát triển trong hang lao cũ. Dị ứng phế quản phổi do nấm (ABPA) ở người hen phế quản hoặc xơ nang.',
      en: 'Invasive pulmonary aspergillosis (IPA) in neutropenic patients: CT halo sign, hemoptysis, angioinvasion. Aspergilloma ("fungus ball") in pre-existing cavities. Allergic bronchopulmonary aspergillosis (ABPA) in asthmatics.'
    },
    recommendedAntibiotics: {
      firstLine: ['Voriconazole (Thuốc lựa chọn hàng đầu)', 'Isavuconazole'],
      alternative: ['Liposomal Amphotericin B', 'Posaconazole'],
      intrinsicResistance: ['Fluconazole (KHÔNG CÓ TÁC DỤNG đối với Aspergillus)']
    },
    clsiGroupNotes: {
      groupA: ['Voriconazole', 'Isavuconazole'],
      groupB: ['Posaconazole', 'Amphotericin B']
    },
    diagnosticPitfalls: {
      vi: 'Aspergillus HẦU NHƯ KHÔNG BAO GIỜ mọc từ cấy máu! Xét nghiệm Galactomannan EIA (huyết thanh hoặc dịch BAL) có giá trị chẩn đoán sớm rất cao. Fluconazole hoàn toàn không có tác dụng trên Aspergillus.',
      en: 'Aspergillus is virtually never isolated from routine blood cultures. Serum and BAL Galactomannan EIA is a key biomarker. Fluconazole is totally ineffective.'
    },
    svgType: 'aspergillus_conidiophore'
  },

  // 3. Necator americanus (Chapter 28)
  {
    id: 'necator_americanus',
    name: 'Necator americanus',
    scientificName: 'Necator americanus',
    commonName: {
      vi: 'Giun móc Tân thế giới (Gây thiếu máu nhược sắc & ngứa da bàn chân)',
      en: 'New World Hookworm (Ground Itch & Microcytic Hypochromic Anemia)'
    },
    taxonomy: {
      domain: 'Eukaryota',
      phylum: 'Nematoda',
      class: 'Secernentea',
      order: 'Strongylida',
      family: 'Ancylostomatidae',
      genus: 'Necator',
      species: 'N. americanus'
    },
    gramReaction: 'variable_or_other',
    shape: 'egg_larva',
    arrangement: 'Adult worms in small intestine, eggs passed in feces, larvae in soil',
    oxygen: 'microaerophile',
    biosafetyLevel: 2,
    directSmearFeatures: {
      vi: 'Soi phân tìm trứng (O&P): Trứng hình bầu dục thuôn dài, kích thước 60-75 × 35-40 µm, vỏ mỏng không màu trong suốt, bên trong chứa phôi giai đoạn phân chia 4-8 phôi bào (cleavage stage) có khoảng trống rõ giữa vỏ và phôi bào.',
      en: 'Stool O&P: Oval, thin-shelled, colorless transparent eggs (60-75 × 35-40 µm) containing 4-8 cell cleavage stage embryo with clear space between shell and embryo.'
    },
    colony: {
      bloodAgar: 'Not cultivable on standard bacteriological media; larvae cultured on Harada-Mori filter paper.',
      hemolysis: 'gamma',
      chocolateAgar: 'No growth.',
      macConkeyAgar: 'No growth.'
    },
    biochemicals: {},
    virulenceFactors: {
      vi: [
        'Đôi phiến cắt (cutting plates) trong bao miệng ngoạm vào nhung mao ruột',
        'Chất chống đông ức chế yếu tố Xa và dòng đông máu mô',
        'Enzym protease tiêu hủy hemoglobin và tế bào chủ'
      ],
      en: [
        'Pair of cutting plates in buccal cavity',
        'Anticoagulants inhibiting factor Xa and tissue factor pathway',
        'Proteases degrading hemoglobin and mucosal tissue'
      ]
    },
    primaryToxins: ['Anticoagulant peptides', 'Tissue proteases'],
    clinicalSignificance: {
      vi: 'Giai đoạn xâm nhập: Ấu trùng chui qua da chân trần gây nốt phỏng ngứa ban đỏ "Ground itch". Giai đoạn phổi: Hội chứng Loeffler (ho, thở khò khè, tăng bạch cầu ái toan). Giai đoạn ruột: Giun trưởng thành ngoạm niêm mạc tá tràng hút 0.03-0.2 mL máu/ngày/con gây THIẾU MÁU THIẾU SẮT NHƯỢC SẮC nặng, suy tim cung lượng cao, bụng ỏng, phù suy dinh dưỡng và hội chứng thèm ăn đất/dị vật (pica) ở trẻ em.',
      en: 'Penetration: "Ground itch" erythematous papulovesicular dermatitis. Pulmonary: Loeffler syndrome. Intestinal: Adult worms attach to mucosa via cutting plates, sucking 0.03-0.2 mL blood/worm/day causing severe iron deficiency anemia, pica, and growth stunting.'
    },
    recommendedAntibiotics: {
      firstLine: ['Albendazole (400 mg liều duy nhất)', 'Mebendazole (100 mg × 2 lần/ngày trong 3 ngày)'],
      alternative: ['Pyrantel pamoate', 'Bổ sung sắt đường uống (Oral iron supplementation)'],
      intrinsicResistance: ['Kháng sinh kháng khuẩn thông thường không có tác dụng']
    },
    clsiGroupNotes: {
      groupA: ['Albendazole', 'Mebendazole']
    },
    diagnosticPitfalls: {
      vi: 'Trứng giun móc phân hủy nhanh nếu để phân lâu ở nhiệt độ phòng và nở thành ấu trùng rhabditiform (cần phân biệt với ấu trùng Strongyloides stercoralis bằng khoang miệng dài buccal cavity). Trứng của Necator americanus và Ancylostoma duodenale không thể phân biệt được dưới kính hiển vi quang học thông thường.',
      en: 'Hookworm eggs hatch in unpreserved stool into rhabditiform larvae (distinguished from Strongyloides by a longer buccal cavity). Necator and Ancylostoma eggs are morphologically identical.'
    },
    svgType: 'parasite_egg'
  },

  // 4. Giardia duodenalis (Chapter 28)
  {
    id: 'giardia_duodenalis',
    name: 'Giardia duodenalis',
    scientificName: 'Giardia duodenalis (syn. Giardia lamblia / intestinalis)',
    commonName: {
      vi: 'Trùng roi đường ruột Giardia (Gây tiêu chảy kéo dài phân mỡ hôi thối)',
      en: 'Giardia lamblia (Beaver Fever / Steatorrhea / Malabsorption)'
    },
    taxonomy: {
      domain: 'Eukaryota',
      phylum: 'Metamonada',
      class: 'Diplomonadida',
      order: 'Diplomonadida',
      family: 'Hexamitidae',
      genus: 'Giardia',
      species: 'G. duodenalis'
    },
    gramReaction: 'variable_or_other',
    shape: 'trophozoite_cyst',
    arrangement: 'Trophozoites in duodenum/jejunum; cysts in stool',
    oxygen: 'obligate_anaerobe',
    biosafetyLevel: 2,
    directSmearFeatures: {
      vi: 'Thể hoạt động (Trophozoite): Hình quả lê hoặc giọt nước cắt dọc, kích thước 10-20 × 5-15 µm, đối xứng hai bên, có 2 nhân đối xứng trông như "khuôn mặt đeo kính", đĩa hút bụng lớn và 4 đôi roi (8 roi). Chuyển động lảo đảo như lá rơi (falling leaf motility). Thể bào nang (Cyst): Hình bầu dục, 8-12 × 7-10 µm, vỏ dày khúc xạ, có 4 nhân (khi chín) và các sợi trục roi uốn lượn bên trong.',
      en: 'Trophozoite: Pear/teardrop-shaped (10-20 µm), bilateral symmetry with 2 nuclei resembling "an old man with glasses", ventral sucking disk, 8 flagella, erratic "falling leaf" motility. Cyst: Oval (8-12 µm), smooth thick cyst wall, 4 nuclei and prominent curved axonemes.'
    },
    colony: {
      bloodAgar: 'Not cultivable on bacteriological agar.',
      hemolysis: 'gamma',
      chocolateAgar: 'No growth.',
      macConkeyAgar: 'No growth.'
    },
    biochemicals: {},
    virulenceFactors: {
      vi: [
        'Đĩa hút mặt bụng (ventral sucking disk) cơ học làm teo nhung mao ruột',
        'Protein biến đổi bề mặt (VSPs) né tránh kháng thể bảo vệ ruột',
        'Ức chế các enzym men bờ bàn chải ruột non (disaccharidases)'
      ],
      en: [
        'Ventral sucking disk causing mechanical mucosal flattening',
        'Variant-specific surface proteins (VSPs) for antigenic variation',
        'Inhibition of intestinal brush-border enzymes (disaccharidases)'
      ]
    },
    primaryToxins: ['Non-classical enterotoxin peptides'],
    clinicalSignificance: {
      vi: 'Bệnh Giardiasis: Tiêu chảy nhiều nước sau đó chuyển thành phân lỏng mỡ, sủi bọt, hôi thối nồng nặc (steatorrhea), đầy hơi chướng bụng, ợ hơi mùi trứng thối (lưu huỳnh), sụt cân mệt mỏi. Không xâm lấn niêm mạc nên KHÔNG CÓ MÁU trong phân. Lây truyền qua nước uống nhiễm phân (người đi dã ngoại uống nước suối - "Beaver fever") hoặc nhà trẻ.',
      en: 'Giardiasis: Watery diarrhea progressing to greasy, malodorous floating stools (steatorrhea), abdominal cramps, bloating, sulfurous burping, and weight loss without fecal blood. Transmitted via contaminated water ("beaver fever") or daycare centers.'
    },
    recommendedAntibiotics: {
      firstLine: ['Metronidazole (250 mg × 3 lần/ngày trong 5-7 ngày)', 'Tinidazole (2 g liều duy nhất)'],
      alternative: ['Nitazoxanide', 'Paromomycin (phụ nữ có thai)'],
      intrinsicResistance: ['Kháng sinh diệt khuẩn thông thường']
    },
    clsiGroupNotes: {
      groupA: ['Metronidazole', 'Tinidazole']
    },
    diagnosticPitfalls: {
      vi: 'Thải bào nang ngắt quãng (intermittent shedding) nên cần xét nghiệm tối thiểu 3 mẫu phân thu thập vào các ngày khác nhau. Test phát hiện kháng nguyên Giardia trong phân bằng ELISA hoặc sắc ký miễn dịch (Rapid DFA) có độ nhạy vượt trội (>95%) so với soi tươi.',
      en: 'Cysts are shed intermittently; examine at least three stool specimens collected on alternate days. Stool antigen detection by EIA or DFA provides >95% sensitivity.'
    },
    svgType: 'parasite_trophozoite'
  },

  // 5. Human Immunodeficiency Virus (Chapter 29)
  {
    id: 'human_immunodeficiency_virus',
    name: 'Human Immunodeficiency Virus 1 (HIV-1)',
    scientificName: 'Human Immunodeficiency Virus type 1',
    commonName: {
      vi: 'Virus suy giảm miễn dịch ở người (HIV-1 / AIDS)',
      en: 'Human Immunodeficiency Virus 1 (HIV-1 / AIDS)'
    },
    taxonomy: {
      domain: 'Riboviria',
      phylum: 'Negarnaviricota',
      class: 'Revtraviricetes',
      order: 'Ortervirales',
      family: 'Retroviridae',
      genus: 'Lentivirus',
      species: 'Primate lentivirus group 1'
    },
    gramReaction: 'variable_or_other',
    shape: 'virion',
    arrangement: 'Enveloped spherical virion (~120 nm), conical capsid containing two copies of positive-sense ssRNA',
    oxygen: 'obligate_aerobe',
    biosafetyLevel: 3,
    directSmearFeatures: {
      vi: 'Kính hiển vi điện tử: Hạt virion hình cầu có màng bọc lipid, đường kính ~120 nm, vỏ gắn các gai nhú glycoprotein gp120/gp41, lõi capsid hình nón cấu tạo bởi protein p24 bao bọc hai sợi đơn RNA cùng enzym phiên mã ngược Reverse Transcriptase, Integrase và Protease.',
      en: 'Electron microscopy: Spherical enveloped virion (~120 nm) with gp120/gp41 surface spikes, conical p24 capsid core containing two identical copies of single-stranded positive-sense RNA, reverse transcriptase, integrase, and protease.'
    },
    colony: {
      bloodAgar: 'Obligate intracellular virus - does not grow on cell-free media.',
      hemolysis: 'gamma',
      chocolateAgar: 'No growth.',
      macConkeyAgar: 'No growth.'
    },
    biochemicals: {},
    virulenceFactors: {
      vi: [
        'Glycoprotein gp120 gắn kết thụ thể CD4 và đồng thụ thể CCR5/CXCR4',
        'Glycoprotein gp41 làm dung hợp màng virus với màng tế bào chủ',
        'Men phiên mã ngược sao chép dễ sai sót tạo biến dị né tránh miễn dịch',
        'Protein Nef làm giảm biểu hiện kháng nguyên MHC-I'
      ],
      en: [
        'gp120 binding to CD4 receptor and CCR5/CXCR4 coreceptors',
        'gp41 mediating viral envelope fusion with host cell membrane',
        'Reverse transcriptase high error rate causing rapid drug-resistance mutations',
        'Nef protein downregulating MHC-I to evade cytotoxic CD8 T cells'
      ]
    },
    primaryToxins: ['Viral protein R (Vpr)', 'Tat (transactivator of transcription)', 'Nef'],
    clinicalSignificance: {
      vi: 'Nhiễm HIV tiến triển sang Hội chứng suy giảm miễn dịch mắc phải (AIDS): Phá hủy tế bào T CD4 dẫn đến suy giảm miễn dịch trầm trọng. Dễ mắc các bệnh nhiễm trùng cơ hội: Viêm phổi do Pneumocystis jirovecii (PCP), viêm màng não do Cryptococcus neoformans, nhiễm nấm Candida thực quản, lao, sarcoma Kaposi và các bệnh lý rễ thần kinh.',
      en: 'HIV infection leading to Acquired Immunodeficiency Syndrome (AIDS): Progressive depletion of CD4+ T lymphocytes resulting in opportunistic infections (Pneumocystis jirovecii, Cryptococcus neoformans, esophageal candidiasis, toxoplasmosis) and malignancies (Kaposi sarcoma).'
    },
    recommendedAntibiotics: {
      firstLine: ['Phác đồ ARV phối hợp 3 thuốc (cART): 2 NRTIs (Tenofovir + Emtricitabine/Lamivudine) + 1 INSTI (Dolutegravir hoặc Bictegravir)'],
      alternative: ['NNRTI-based (Efavirenz)', 'PI-based (Darunavir/ritonavir)'],
      intrinsicResistance: ['Kháng sinh diệt khuẩn không có tác dụng']
    },
    clsiGroupNotes: {
      groupA: ['Tenofovir', 'Emtricitabine', 'Dolutegravir']
    },
    diagnosticPitfalls: {
      vi: 'Sử dụng xét nghiệm kháng thể/kháng nguyên thế hệ thứ 4 (4th-generation Ag/Ab combo ELISA phát hiện đồng thời kháng thể kháng HIV-1/2 và kháng nguyên p24) giúp rút ngắn thời gian "cửa sổ" xuống còn 2-3 tuần. Tải lượng virus HIV-1 RNA PCR dùng theo dõi hiệu quả điều trị cART.',
      en: '4th-generation HIV-1/2 Ag/Ab immunoassay detecting both antibodies and p24 antigen shortens window period to 2-3 weeks. Plasma HIV-1 viral load (RNA PCR) monitors antiretroviral therapy efficacy.'
    },
    svgType: 'virus_enveloped'
  },

  // 6. Bacillus anthracis (Chapter 30)
  {
    id: 'bacillus_anthracis',
    name: 'Bacillus anthracis',
    scientificName: 'Bacillus anthracis',
    commonName: {
      vi: 'Trực khuẩn Than (Tác nhân vũ khí sinh học Hạng 1 - Tier 1 Select Agent)',
      en: 'Anthrax Bacillus (Tier 1 Bioterrorism Agent / Woolsorter Disease)'
    },
    taxonomy: {
      domain: 'Bacteria',
      phylum: 'Bacillota (Firmicutes)',
      class: 'Bacilli',
      order: 'Bacillales',
      family: 'Bacillaceae',
      genus: 'Bacillus',
      species: 'B. anthracis'
    },
    gramReaction: 'gram_positive',
    shape: 'bacilli',
    arrangement: 'Large square-ended rods in long bamboo-like chains with central ellipsoidal spores',
    oxygen: 'facultative_anaerobe',
    biosafetyLevel: 3,
    directSmearFeatures: {
      vi: 'Trực khuẩn Gram dương lớn, kích thước 1-1.5 × 3-5 µm, đầu vuông phẳng, xếp thành chuỗi dài như đốt tre. Bào tử hình bầu dục nằm ở trung tâm tế bào không làm biến dạng thân vi khuẩn (bào tử KHÔNG hình thành trong mô sống mà chỉ tạo ra ngoài môi trường không khí). Nhuộm Wright/Giemsa hoặc M’Fadyean thấy vỏ poly-D-glutamic acid màu tím nhạt bao quanh vi khuẩn màu xanh.',
      en: 'Gram-positive large square-ended bacilli (1-1.5 × 3-5 µm) in long chains ("boxcars"). Ellipsoidal central spores without swelling; spores form only in ambient air, not in vivo. Capsule composed of poly-D-glutamic acid (stained with M’Fadyean methylene blue).'
    },
    colony: {
      bloodAgar: 'Large (2-5 mm), flat, irregular, opaque, grayish-white with frosted ground-glass texture, curling comma-shaped projections from colony margin ("Medusa-head"), nonhemolytic (gamma). Tenacious consistency (stands upright like whipped egg whites when lifted with a loop).',
      hemolysis: 'gamma',
      chocolateAgar: 'Abundant gray-white colonies.',
      macConkeyAgar: 'No growth.',
      pigment: 'Gray-white / Ground-glass',
      texture: 'dry'
    },
    biochemicals: {
      catalase: '+',
      oxidase: '-',
      motility: '-'
    },
    virulenceFactors: {
      vi: [
        'Vỏ nhầy Poly-D-glutamic acid mã hóa trên plasmid pXO2 chống thực bào',
        'Phức hợp ngoại độc tố 3 thành phần trên pXO1: Kháng nguyên bảo vệ (PA), Yếu tố gây phù (EF), Yếu tố gây chết (LF)'
      ],
      en: [
        'Poly-D-glutamic acid capsule (encoded on pXO2 plasmid) preventing phagocytosis',
        'Tripartite exotoxin (encoded on pXO1 plasmid): Protective Antigen (PA), Edema Factor (EF - adenylate cyclase), Lethal Factor (LF - zinc metalloproteinase cleaving MAPKK)'
      ]
    },
    primaryToxins: ['Protective Antigen (PA)', 'Edema Factor (EF)', 'Lethal Factor (LF)'],
    clinicalSignificance: {
      vi: 'Bệnh Than (Anthrax): (1) Thể da (95% ca tự nhiên): Sẩn ngứa tiến triển thành mụn nước rồi loét hoại tử có vảy đen điển hình (eschar) kèm phù nề dữ dội không tương xứng. (2) Thể hô hấp (Vũ khí sinh học): Hít bào tử vào phế nang, đại thực bào vận chuyển đến hạch trung thất gây viêm hoại tử xuất huyết trung thất, TRUNG THẤT GIÃN RỘNG trên X-quang, suy hô hấp tối cấp và sốc nhiễm trùng tử vong nhanh chóng. (3) Thể tiêu hóa: Xuất huyết hoại tử ruột.',
      en: 'Cutaneous anthrax (painless black eschar with gelatinous edema). Inhalation anthrax (bioterrorism mode: spore inhalation, hemorrhagic mediastinitis with marked mediastinal widening on imaging, severe shock and death). Gastrointestinal anthrax.'
    },
    recommendedAntibiotics: {
      firstLine: ['Ciprofloxacin (Fluoroquinolone)', 'Doxycycline'],
      alternative: ['Meropenem', 'Clindamycin (để ức chế sản sinh ngoại độc tố)', 'Anthrax immunoglobulin (Raxibacumab / Obiltoxaximab)'],
      intrinsicResistance: ['Cephalosporins (B. anthracis sinh men beta-lactamase cephalosporinase)']
    },
    clsiGroupNotes: {
      groupA: ['Ciprofloxacin', 'Doxycycline'],
      groupB: ['Penicillin G', 'Clindamycin', 'Meropenem']
    },
    diagnosticPitfalls: {
      vi: 'TIÊU CHUẨN LOẠI TRỪ (RULE-OUT) TẠI PHÒNG XÉT NGHIỆM SENTINEL: Trực khuẩn Gram dương lớn có nha bào, KHÔNG TAN MÁU trên SBA, BẤT ĐỘNG (motile = negative) và dính dai quăn đứng -> DỪNG NGAY THAO TÁC, KHÔNG DÙNG MÁY TỰ ĐỘNG (tránh tạo khí dung lây nhiễm tử vong) và chuyển tuyến LRN Reference Lab ngay lập tức!',
      en: 'SENTINEL LAB RULE-OUT CRITERIA: Large Gram-positive rod with spores, NONHEMOLYTIC on SBA, NONMOTILE, catalase-positive, tenacious colony -> CEASE WORK, do not use automated systems, notify biosafety and refer to LRN Reference Lab immediately!'
    },
    svgType: 'bacillus_anthracis_chain'
  },

  // 7. Enterococcus faecium (Chapter 31)
  {
    id: 'enterococcus_faecium',
    name: 'Enterococcus faecium (VRE)',
    scientificName: 'Enterococcus faecium',
    commonName: {
      vi: 'Cầu khuẩn ruột Faecium kháng Vancomycin (VRE tạo Biofilm)',
      en: 'Vancomycin-Resistant Enterococcus faecium (VRE Biofilm Former)'
    },
    taxonomy: {
      domain: 'Bacteria',
      phylum: 'Bacillota (Firmicutes)',
      class: 'Bacilli',
      order: 'Lactobacillales',
      family: 'Enterococcaceae',
      genus: 'Enterococcus',
      species: 'E. faecium'
    },
    gramReaction: 'gram_positive',
    shape: 'cocci',
    arrangement: 'Pairs and short chains',
    oxygen: 'facultative_anaerobe',
    biosafetyLevel: 2,
    directSmearFeatures: {
      vi: 'Cầu khuẩn Gram dương hình bầu dục hoặc quả trứng, xếp đôi hoặc chuỗi ngắn.',
      en: 'Gram-positive oval cocci in pairs and short chains.'
    },
    colony: {
      bloodAgar: 'Small, smooth, translucent to white-gray, typically nonhemolytic (gamma) or occasionally alpha-hemolytic.',
      hemolysis: 'gamma',
      chocolateAgar: 'Abundant white-gray colonies.',
      macConkeyAgar: 'Tiny pink pinpoint colonies (resistant to bile salts).',
      otherMedia: 'Bile Esculin Agar: Blackening of medium (+); 6.5% NaCl broth: Growth / turbid (+); VRE chromogenic agar: Blue/green colonies.',
      pigment: 'White to grayish',
      texture: 'smooth'
    },
    biochemicals: {
      catalase: '-',
      pyr: '+',
      bileEsculin: '+',
      otherKeyTests: '6.5% NaCl (+), Arabinose (+), Pyruvate (-)',
      motility: '-'
    },
    virulenceFactors: {
      vi: [
        'Protein bề mặt Esp tăng cường khả năng bám dính và tạo màng sinh học Biofilm bền vững trên dụng cụ cấy ghép',
        'Cụm gen vanA/vanB biến đổi tận cùng D-Ala-D-Ala thành D-Ala-D-Lac làm mất ái lực gắn của Vancomycin',
        'Khả năng chống chịu cao với khô hanh và chất sát khuẩn bề mặt bệnh viện'
      ],
      en: [
        'Esp (Enterococcal surface protein) promoting robust biofilm formation on catheters and prosthetics',
        'VanA / VanB gene clusters synthesizing D-Ala-D-Lac cell wall precursors (high-level vancomycin resistance)',
        'High natural tolerance to environmental desiccation and disinfectants'
      ]
    },
    primaryToxins: ['Cytolysin / hemolysin (certain strains)'],
    clinicalSignificance: {
      vi: 'Tác nhân gây nhiễm trùng bệnh viện hàng đầu: Nhiễm trùng khớp nhân tạo cấy ghép mạn tính (prosthetic joint infections - PJI) qua màng sinh học Biofilm, nhiễm khuẩn huyết catheter (CRBSI), viêm nội tâm mạc nhiễm khuẩn, nhiễm trùng đường tiết niệu có đặt sonde Foley. Thất bại điều trị kháng sinh cao do biofilm làm tăng MIC lên hàng trăm lần.',
      en: 'Leading nosocomial pathogen: Recurrent prosthetic joint and indwelling device infections mediated by persistent biofilms, central line-associated bloodstream infections (CLABSI), endocarditis, and catheter-associated UTIs.'
    },
    recommendedAntibiotics: {
      firstLine: ['Linezolid (Oxazolidinone)', 'Daptomycin (liều cao 8-12 mg/kg/ngày)'],
      alternative: ['Tigecycline', 'Quinupristin-Dalfopristin (chỉ có tác dụng với E. faecium, không tác dụng với E. faecalis)'],
      intrinsicResistance: ['Ampicillin (hầu hết E. faecium đề kháng mạnh qua PBP5)', 'Cephalosporins (tất cả)', 'Vancomycin (ở chủng mang gen vanA/vanB)', 'Aminoglycosides liều thường']
    },
    clsiGroupNotes: {
      groupA: ['Linezolid', 'Daptomycin'],
      groupB: ['Tigecycline', 'Quinupristin-dalfopristin']
    },
    diagnosticPitfalls: {
      vi: 'Phân biệt E. faecium với E. faecalis: E. faecium arabinose (+), thường kháng ampicillin và đa số chủng bệnh viện là VRE; ngược lại E. faecalis thường nhạy cảm ampicillin và pyruvate (+). Màng biofilm trên khớp nhân tạo đòi hỏi phải phẫu thuật thay lại khớp (revision arthroplasty) vì kháng sinh đơn độc không thể tiệt trừ vi khuẩn thể ngủ.',
      en: 'Distinguish from E. faecalis: E. faecium ferments arabinose, is typically ampicillin-resistant, and lacks pyruvate utilization. Biofilms on prosthetic joints necessitate hardware explantation.'
    },
    svgType: 'enterococcus_chain'
  }
];
