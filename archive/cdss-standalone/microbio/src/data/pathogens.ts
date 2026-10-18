import { Pathogen } from '../types';
import { ADDITIONAL_PATHOGENS } from './additionalPathogens';
import { PATHOGENS_PART2 } from './pathogensPart2';
import { PATHOGENS_PART3 } from './pathogensPart3';

const BASE_PATHOGENS: Pathogen[] = [
  // 1. Staphylococcus aureus
  {
    id: 's_aureus',
    name: 'Staphylococcus aureus',
    scientificName: 'Staphylococcus aureus',
    commonName: {
      vi: 'Tụ cầu vàng (MSSA / MRSA)',
      en: 'Golden Staph (MSSA / MRSA)'
    },
    taxonomy: {
      domain: 'Bacteria',
      phylum: 'Bacillota (Firmicutes)',
      class: 'Bacilli',
      order: 'Bacillales',
      family: 'Staphylococcaceae',
      genus: 'Staphylococcus',
      species: 'S. aureus'
    },
    gramReaction: 'gram_positive',
    shape: 'cocci',
    arrangement: 'Clusters (grape-like), single or pairs',
    oxygen: 'facultative_anaerobe',
    biosafetyLevel: 2,
    directSmearFeatures: {
      vi: 'Cầu khuẩn Gram dương hình cầu, tụ thành đám như chùm nho, kích thước 0.5 - 1.0 µm. Thường quan sát thấy trong hoặc ngoài bạch cầu đa nhân (PMN).',
      en: 'Gram-positive spherical cocci in irregular grape-like clusters, 0.5 - 1.0 µm. Intracellular and extracellular within PMN leukocytes.'
    },
    colony: {
      bloodAgar: 'Medium to large, round, smooth, convex, opaque, buttery-creamy texture, golden-yellow to porcelain-white pigment, typically beta-hemolytic with clear zone.',
      hemolysis: 'beta',
      chocolateAgar: 'Abundant growth, creamy golden-white colonies.',
      macConkeyAgar: 'No growth (inhibited by bile salts & crystal violet).',
      otherMedia: 'Mannitol Salt Agar (MSA): Yellow colonies with yellow halo (ferments mannitol).',
      pigment: 'Golden-yellow (staphyloxanthin) or creamy white',
      odor: 'Old sock / sweaty sneaker aroma on nonselective media',
      elevation: 'convex',
      margin: 'smooth',
      texture: 'creamy'
    },
    biochemicals: {
      catalase: '+',
      coagulase: '+',
      oxidase: '-',
      dnase: '+',
      urease: '+',
      otherKeyTests: 'Cefoxitin disk (30µg) surrogate for mecA/MRSA (≤21mm is MRSA; ≥22mm is MSSA). Latex agglutination for PBP2a positive in MRSA.'
    },
    virulenceFactors: {
      vi: [
        'Protein A: Liên kết vùng Fc của IgG, vô hiệu hóa opsonin hóa và thực bào',
        'Coagulase: Tạo vỏ bọc fibrin bảo vệ vi khuẩn khỏi bạch cầu',
        'Panton-Valentine Leukocidin (PVL): Tiêu hủy bạch cầu, gây hoại tử mô sâu trong MRSA cộng đồng',
        'Exfoliatin A & B: Gây hội chứng phồng rộp da do tụ cầu (SSSS)',
        'Enterotoxin A-E: Độc tố ruột bền nhiệt gây ngộ độc thức ăn',
        'TSST-1: Siêu kháng nguyên kích hoạt giải phóng ồ ạt cytokine, sốc độc tố'
      ],
      en: [
        'Protein A: Binds Fc portion of IgG, preventing opsonization and phagocytosis',
        'Coagulase: Clots plasma to form protective fibrin barriers',
        'Panton-Valentine Leukocidin (PVL): Cytolytic to leukocytes, severe necrotic tissue lesions',
        'Exfoliatin toxins: Cleaves desmoglein-1 causing Staphylococcal Scalded Skin Syndrome (SSSS)',
        'Enterotoxins A-E: Heat-stable enterotoxins causing rapid food intoxication',
        'TSST-1: Superantigen stimulating massive TNF/IL-1 storm in Toxic Shock Syndrome'
      ]
    },
    primaryToxins: ['TSST-1', 'Alpha-toxin (hemolysin)', 'Enterotoxins A-E', 'Exfoliatins A & B', 'Panton-Valentine Leukocidin'],
    clinicalSignificance: {
      vi: 'Căn nguyên hàng đầu gây viêm da mủ (nhọt, áp-xe), viêm mô tế bào, viêm tủy xương, viêm phổi hoại tử, nhiễm trùng huyết kết hợp dụng cụ nội mạch (CLABSI), viêm nội tâm mạc nhiễm khuẩn và hội chứng sốc nhiễm độc.',
      en: 'Major cause of purulent skin infections (furuncles, carbuncles), osteomyelitis, necrotizing pneumonia, catheter-associated bacteremia (CLABSI), endocarditis, and toxic shock syndrome.'
    },
    recommendedAntibiotics: {
      firstLine: ['MSSA: Cefazolin, Oxacillin, Nafcillin', 'MRSA: Vancomycin, Daptomycin, Linezolid'],
      alternative: ['Ceftaroline (anti-MRSA 5th gen cephalosporin)', 'TMP-SMX', 'Doxycycline', 'Clindamycin (if D-test negative)'],
      intrinsicResistance: ['Penicillin G / Ampicillin (due to BlaZ penicillinase)', 'All standard beta-lactams in MRSA except Ceftaroline']
    },
    clsiGroupNotes: {
      groupA: ['Penicillin', 'Oxacillin / Cefoxitin screen', 'Erythromycin', 'Clindamycin'],
      groupB: ['Vancomycin', 'Daptomycin', 'Linezolid', 'Gentamicin (synergy)'],
      groupC: ['Ceftaroline', 'Rifampin (always combination)']
    },
    diagnosticPitfalls: {
      vi: 'Cần lưu ý hiện tượng dị kháng (heteroresistance) ở MRSA: dùng đĩa Cefoxitin 30µg tin cậy hơn Oxacillin; kiểm tra D-zone test nếu kháng Erythromycin nhưng nhạy Clindamycin để tránh thất bại lâm sàng do cảm ứng gen erm.',
      en: 'Heteroresistance is frequent: use Cefoxitin 30µg surrogate disk instead of oxacillin. Always perform D-zone test on erythromycin-R, clindamycin-S isolates to detect inducible erm methylase.'
    },
    svgType: 'gpc_clusters'
  },

  // 2. Streptococcus pneumoniae
  {
    id: 's_pneumoniae',
    name: 'Streptococcus pneumoniae',
    scientificName: 'Streptococcus pneumoniae',
    commonName: {
      vi: 'Phế cầu khuẩn (Pneumococcus)',
      en: 'Pneumococcus'
    },
    taxonomy: {
      domain: 'Bacteria',
      phylum: 'Bacillota',
      class: 'Bacilli',
      order: 'Lactobacillales',
      family: 'Streptococcaceae',
      genus: 'Streptococcus',
      species: 'S. pneumoniae'
    },
    gramReaction: 'gram_positive',
    shape: 'diplococci',
    arrangement: 'Pairs (lancet-shaped diplococci), short chains',
    oxygen: 'facultative_anaerobe',
    biosafetyLevel: 2,
    directSmearFeatures: {
      vi: 'Song cầu Gram dương hình ngọn nến (lancet-shaped), đầu nhọn hướng ra ngoài, thường có quầng sáng không bắt màu (vỏ polysaccharide capsule) bao quanh tế bào.',
      en: 'Gram-positive lancet-shaped diplococci with pointed ends facing opposite directions; clear nonstaining halo (polysaccharide capsule) visible.'
    },
    colony: {
      bloodAgar: 'Small, shiny, translucent to mucoid colonies with distinct zone of alpha-hemolysis (greenish). Upon aging (24-48h), autolysis causes central depression ("penny edge" or umbilicate).',
      hemolysis: 'alpha',
      chocolateAgar: 'Small greenish colonies without true hemolysis (erythrocytes already lysed).',
      macConkeyAgar: 'No growth.',
      elevation: 'umbilicate',
      margin: 'smooth',
      texture: 'mucoid'
    },
    biochemicals: {
      catalase: '-',
      bileSolubility: '+',
      otherKeyTests: 'Optochin (ethylhydrocupreine HCl) susceptible (zone ≥14mm with 6mm disk). Soluble in 10% sodium deoxycholate.'
    },
    virulenceFactors: {
      vi: [
        'Vỏ Polysaccharide: Yếu tố độc lực chủ đạo ức chế thực bào (>90 serotype)',
        'Pneumolysin: Độc tố tế bào phá hủy biểu mô hô hấp và ức chế hóa hướng động',
        'IgA1 Protease: Cắt đứt kháng thể IgA tiết trên niêm mạc màng nhầy'
      ],
      en: [
        'Polysaccharide capsule: Key anti-phagocytic factor (>90 distinct serotypes)',
        'Pneumolysin: Pore-forming cytolysin damaging respiratory cilia and PMNs',
        'IgA1 Protease: Cleaves mucosal secretory IgA to promote colonization'
      ]
    },
    primaryToxins: ['Pneumolysin', 'Autolysin (LytA)'],
    clinicalSignificance: {
      vi: 'Nguyên nhân hàng đầu gây viêm phổi mắc phải cộng đồng (CAP) ở người lớn, viêm tai giữa, viêm xoang, viêm màng não mủ và nhiễm khuẩn huyết.',
      en: 'Leading etiologic agent of community-acquired pneumonia (CAP), otitis media, sinusitis, bacterial meningitis, and bacteremia.'
    },
    recommendedAntibiotics: {
      firstLine: ['Penicillin G (if susceptible)', 'Amoxicillin / Ceftriaxone', 'Cefotaxime'],
      alternative: ['Vancomycin + Ceftriaxone (for meningitis)', 'Levofloxacin / Moxifloxacin', 'Linezolid'],
      intrinsicResistance: ['Aminoglycosides (low permeability unless combined with cell-wall active agent)']
    },
    clsiGroupNotes: {
      groupA: ['Penicillin (tested with oxacillin 1µg disk screen)', 'Erythromycin', 'TMP-SMX'],
      groupB: ['Ceftriaxone / Cefotaxime (MIC required for CSF)', 'Vancomycin', 'Fluoroquinolones (Levofloxacin)']
    },
    diagnosticPitfalls: {
      vi: 'Sàng lọc tính nhạy Penicillin bằng đĩa Oxacillin 1µg (vòng ≥20mm = nhạy Penicillin). Nếu vòng ≤19mm, BẮT BUỘC xác định MIC Penicillin và Ceftriaxone, đặc biệt với mẫu dịch não tủy.',
      en: 'Screen penicillin susceptibility with 1µg Oxacillin disk (zone ≥20mm = susceptible). If ≤19mm, MIC testing for Penicillin and Ceftriaxone is MANDATORY, especially for CSF.'
    },
    svgType: 'gpc_lancet'
  },

  // 3. Streptococcus pyogenes (Group A)
  {
    id: 's_pyogenes',
    name: 'Streptococcus pyogenes',
    scientificName: 'Streptococcus pyogenes',
    commonName: {
      vi: 'Liên cầu nhóm A (GAS - Group A Strep)',
      en: 'Group A Streptococcus (GAS)'
    },
    taxonomy: {
      domain: 'Bacteria',
      phylum: 'Bacillota',
      class: 'Bacilli',
      order: 'Lactobacillales',
      family: 'Streptococcaceae',
      genus: 'Streptococcus',
      species: 'S. pyogenes'
    },
    gramReaction: 'gram_positive',
    shape: 'cocci',
    arrangement: 'Chains (short to long chains), spherical',
    oxygen: 'facultative_anaerobe',
    biosafetyLevel: 2,
    directSmearFeatures: {
      vi: 'Cầu khuẩn Gram dương tròn nhỏ sắp xếp thành chuỗi dài hoặc ngắn, kích thước 0.6 - 1.0 µm.',
      en: 'Gram-positive spherical cocci in pairs and long flexible chains, 0.6 - 1.0 µm.'
    },
    colony: {
      bloodAgar: 'Small (pinpoint to 1mm), translucent, dome-shaped, grayish colonies with wide, deep, clear zone of beta-hemolysis (2-4x colony diameter). Enhanced by stabbing agar.',
      hemolysis: 'beta',
      chocolateAgar: 'Small grayish colonies.',
      macConkeyAgar: 'No growth.',
      elevation: 'flat',
      margin: 'smooth',
      texture: 'dry'
    },
    biochemicals: {
      catalase: '-',
      pyr: '+',
      otherKeyTests: 'Bacitracin (0.04 U / Taxo A) susceptible (any zone of inhibition). PYR (L-pyrrolidonyl-beta-naphthylamide) positive (bright red color).'
    },
    virulenceFactors: {
      vi: [
        'Protein M: Kháng thực bào, làm bất hoạt bổ thể C3b, quyết định typ huyết thanh',
        'Streptolysin O (SLO): Oxy-labile hemolysin sinh kháng thể ASO định lượng',
        'Streptolysin S (SLS): Oxy-stable tạo vòng tan máu beta bề mặt',
        'Streptokinase & Hyaluronidase: Làm tan cục đông và phá hủy tổ chức liên kết',
        'Độc tố sinh nhiệt SpeA, SpeB, SpeC: Gây phát ban sốt tinh hồng nhiệt (Scarlet fever) và sốc'
      ],
      en: [
        'M protein: Primary anti-phagocytic adhesin, inhibits complement activation',
        'Streptolysin O (SLO): Oxygen-labile hemolysin eliciting diagnostic ASO titers',
        'Streptolysin S (SLS): Oxygen-stable surface hemolysin',
        'Streptokinase & Hyaluronidase: Dissolves clots and connective tissue spreading factor',
        'Pyrogenic exotoxins (SpeA, SpeC): Superantigens mediating scarlet fever and toxic shock'
      ]
    },
    primaryToxins: ['Streptolysin O & S', 'Pyrogenic exotoxins A-C (SpeA-C)', 'Streptokinase'],
    clinicalSignificance: {
      vi: 'Viêm họng liên cầu (strep throat), chốc lở (impetigo), viêm quầng (erysipelas), viêm mô hoại tử (flesh-eating disease). Biến chứng hậu nhiễm: thấp tim cấp (Rheumatic fever) và viêm cầu thận cấp (PSGN).',
      en: 'Streptococcal pharyngitis, impetigo, erysipelas, necrotizing fasciitis. Post-streptococcal sequelae: acute rheumatic fever and poststreptococcal glomerulonephritis.'
    },
    recommendedAntibiotics: {
      firstLine: ['Penicillin V (oral)', 'Penicillin G (IM/IV)', 'Amoxicillin'],
      alternative: ['Cephalexin (non-anaphylactic penicillin allergy)', 'Azithromycin / Clarithromycin', 'Clindamycin'],
      intrinsicResistance: ['Aminoglycosides (alone)']
    },
    clsiGroupNotes: {
      groupA: ['Penicillin (universally susceptible, no routine AST required)', 'Ampicillin'],
      groupB: ['Erythromycin', 'Clindamycin (require D-test if Ery-R)']
    },
    diagnosticPitfalls: {
      vi: 'S. pyogenes vẫn nhạy cảm tuyệt đối 100% với Penicillin (không có chủng kháng Penicillin nào được ghi nhận). Khi bệnh nhân dị ứng Penicillin cần dùng Macrolide/Lincosamide thì bắt buộc làm thử nghiệm D-zone.',
      en: 'S. pyogenes remains 100% universally susceptible to Penicillin. For penicillin-allergic patients receiving macrolides/clindamycin, always perform D-zone test for inducible erm resistance.'
    },
    svgType: 'gpc_chains'
  },

  // 4. Streptococcus agalactiae (Group B)
  {
    id: 's_agalactiae',
    name: 'Streptococcus agalactiae',
    scientificName: 'Streptococcus agalactiae',
    commonName: {
      vi: 'Liên cầu nhóm B (GBS - Group B Strep)',
      en: 'Group B Streptococcus (GBS)'
    },
    taxonomy: {
      domain: 'Bacteria',
      phylum: 'Bacillota',
      class: 'Bacilli',
      order: 'Lactobacillales',
      family: 'Streptococcaceae',
      genus: 'Streptococcus',
      species: 'S. agalactiae'
    },
    gramReaction: 'gram_positive',
    shape: 'cocci',
    arrangement: 'Chains (medium length) and pairs',
    oxygen: 'facultative_anaerobe',
    biosafetyLevel: 2,
    directSmearFeatures: {
      vi: 'Cầu khuẩn Gram dương xếp thành chuỗi ngắn hoặc đôi, tương tự S. pyogenes nhưng chuỗi có xu hướng ngắn hơn.',
      en: 'Gram-positive cocci in short to medium chains and pairs.'
    },
    colony: {
      bloodAgar: 'Medium size, flat, grayish-white, semiopaque with "bulls-eye" dense center; narrow, diffuse, soft zone of beta-hemolysis directly beneath the colony (sometimes nonhemolytic).',
      hemolysis: 'beta',
      chocolateAgar: 'Medium gray-white colonies.',
      macConkeyAgar: 'No growth.',
      elevation: 'flat',
      margin: 'smooth',
      texture: 'creamy'
    },
    biochemicals: {
      catalase: '-',
      pyr: '-',
      otherKeyTests: 'CAMP test positive (arrowhead hemolysis synergy with S. aureus beta-lysin). Sodium hippurate hydrolysis positive (ninhydrin turns purple). Bacitracin resistant.'
    },
    virulenceFactors: {
      vi: [
        'Vỏ Polysaccharide chứa Sialic acid: Ức chế hoạt hóa bổ thể theo con đường nhánh',
        'Yếu tố CAMP: Protein khuếch tán hiệp đồng làm tan hồng cầu cừu',
        'Beta-hemolysin / Cytolysin: Gây tổn thương màng tế bào vật chủ'
      ],
      en: [
        'Sialic acid-rich capsular polysaccharide: Inhibits alternative complement pathway',
        'CAMP factor: Diffusible peptide synergizing with staphylococcal beta-lysin',
        'Beta-hemolysin/cytolysin: Damages alveolar endothelial and epithelial cells'
      ]
    },
    primaryToxins: ['CAMP factor', 'Pore-forming hemolysin'],
    clinicalSignificance: {
      vi: 'Căn nguyên hàng đầu gây nhiễm khuẩn huyết sơ sinh sớm (early-onset neonatal sepsis), viêm màng não sơ sinh và viêm phổi ở trẻ sơ sinh. Nhiễm khuẩn đường tiểu và viêm nội mạc tử cung ở thai phụ.',
      en: 'Primary cause of early-onset neonatal sepsis, neonatal meningitis, and pneumonia. Postpartum endometritis and UTIs in pregnant females.'
    },
    recommendedAntibiotics: {
      firstLine: ['Penicillin G (intrapartum antibiotic prophylaxis)', 'Ampicillin'],
      alternative: ['Cefazolin (for penicillin allergy)', 'Clindamycin or Vancomycin (high risk allergy)'],
      intrinsicResistance: ['Aminoglycosides monotherapy']
    },
    clsiGroupNotes: {
      groupA: ['Penicillin G', 'Ampicillin'],
      groupB: ['Cefazolin', 'Erythromycin', 'Clindamycin']
    },
    diagnosticPitfalls: {
      vi: 'Vòng tan máu beta của GBS rất hẹp, đôi khi chỉ thấy rõ khi gạt bỏ khuẩn lạc bằng que cấy hoặc chiếu đèn xuyên qua đĩa (transillumination). Có khoảng 5% chủng GBS không tan máu (gamma-hemolytic).',
      en: 'GBS beta-hemolysis is narrow and soft; often only visible after moving colony with loop or transilluminating plate. ~5% of isolates are nonhemolytic (gamma).'
    },
    svgType: 'gpc_chains_gbs'
  },

  // 5. Enterococcus faecalis / faecium
  {
    id: 'enterococcus_spp',
    name: 'Enterococcus faecalis / faecium',
    scientificName: 'Enterococcus faecalis',
    commonName: {
      vi: 'Vi khuẩn đường ruột Enterococcus (VRE)',
      en: 'Enterococci / VRE'
    },
    taxonomy: {
      domain: 'Bacteria',
      phylum: 'Bacillota',
      class: 'Bacilli',
      order: 'Lactobacillales',
      family: 'Enterococcaceae',
      genus: 'Enterococcus',
      species: 'E. faecalis / E. faecium'
    },
    gramReaction: 'gram_positive',
    shape: 'cocci',
    arrangement: 'Pairs and short chains (oval/lancet diplococci)',
    oxygen: 'facultative_anaerobe',
    biosafetyLevel: 2,
    directSmearFeatures: {
      vi: 'Cầu khuẩn Gram dương hơi bầu dục (ovoid) xếp thành đôi hoặc chuỗi ngắn.',
      en: 'Gram-positive ovoid cocci occurring in pairs and short chains.'
    },
    colony: {
      bloodAgar: 'Medium, smooth, convex, grayish-white colonies, usually nonhemolytic (gamma), rarely alpha or beta-hemolytic.',
      hemolysis: 'gamma',
      chocolateAgar: 'Good growth, grey colonies.',
      macConkeyAgar: 'Small, pinpoint dark red/pink colonies (tolerate bile, ferment lactose slowly).',
      elevation: 'convex',
      margin: 'smooth',
      texture: 'butyrous'
    },
    biochemicals: {
      catalase: '-' /* or pseudo-catalase weak */,
      pyr: '+',
      bileSolubility: '-',
      otherKeyTests: 'Bile Esculin positive (black agar slant). Growth in 6.5% NaCl broth. PYR positive.'
    },
    virulenceFactors: {
      vi: [
        'Khả năng tạo Biofilm bám dính trên ống thông tiểu và van tim nhân tạo',
        'Enzym Gelatinase và Cytolysin (gây tổn thương mô)',
        'Độ bền tự nhiên cao với muối mật, nhiệt độ (10-45°C) và nồng độ muối cao'
      ],
      en: [
        'Biofilm formation on catheters and prosthetic valves',
        'Gelatinase and Cytolysin causing tissue damage',
        'Intrinsic extreme environmental tolerance (bile salts, 6.5% NaCl, 10-45°C)'
      ]
    },
    primaryToxins: ['Cytolysin'],
    clinicalSignificance: {
      vi: 'Nhiễm trùng bệnh viện (HAI) phổ biến: nhiễm khuẩn tiết niệu kết hợp đặt sonde (CAUTI), nhiễm khuẩn vết mổ (SSI), nhiễm khuẩn máu (CLABSI) và viêm nội tâm mạc.',
      en: 'Major cause of healthcare-associated infections (HAIs): CAUTI, SSI, catheter bacteremia (CLABSI), and subacute bacterial endocarditis.'
    },
    recommendedAntibiotics: {
      firstLine: ['Ampicillin (for E. faecalis)', 'Vancomycin (for ampicillin-resistant strains)'],
      alternative: ['Linezolid (for VRE)', 'Daptomycin', 'Tigecycline', 'Quinupristin-dalfopristin (E. faecium only)'],
      intrinsicResistance: [
        'Cephalosporins (all generations)',
        'Trimethoprim-sulfamethoxazole (can use exogenous folates in vivo)',
        'Low-level aminoglycosides',
        'Clindamycin'
      ]
    },
    clsiGroupNotes: {
      groupA: ['Penicillin / Ampicillin', 'Vancomycin'],
      groupB: ['Linezolid', 'Daptomycin', 'High-level Gentamicin/Streptomycin screen for synergy'],
      groupU: ['Nitrofurantoin', 'Fosfomycin']
    },
    diagnosticPitfalls: {
      vi: 'Enterococci có tính kháng tự nhiên với TẤT CẢ Cephalosporin và TMP-SMX dù trên đĩa in vitro có thể thấy vòng ức chế giả! Điều trị viêm nội tâm mạc cần phối hợp Ampicillin + Gentamicin (nếu không có HLAR).',
      en: 'Enterococci possess intrinsic clinical resistance to ALL cephalosporins and TMP-SMX despite misleading in vitro susceptibility. Endocarditis requires synergistic bactericidal combo (Ampicillin + Aminoglycoside).'
    },
    svgType: 'gpc_enterococcus'
  },

  // 6. Escherichia coli
  {
    id: 'e_coli',
    name: 'Escherichia coli',
    scientificName: 'Escherichia coli',
    commonName: {
      vi: 'Trực khuẩn đại tràng (E. coli)',
      en: 'Colon Bacillus (E. coli)'
    },
    taxonomy: {
      domain: 'Bacteria',
      phylum: 'Pseudomonadota (Proteobacteria)',
      class: 'Gammaproteobacteria',
      order: 'Enterobacterales',
      family: 'Enterobacteriaceae',
      genus: 'Escherichia',
      species: 'E. coli'
    },
    gramReaction: 'gram_negative',
    shape: 'bacilli',
    arrangement: 'Single, straight rods, rounded ends',
    oxygen: 'facultative_anaerobe',
    biosafetyLevel: 2,
    directSmearFeatures: {
      vi: 'Trực khuẩn Gram âm kích thước trung bình (1-3 µm x 0.5 µm), bắt màu hồng đồng đều, hai đầu tròn.',
      en: 'Gram-negative straight bacilli, medium size (1-3 µm x 0.5 µm), pink staining with rounded ends.'
    },
    colony: {
      bloodAgar: 'Large, circular, low-convex, gray colonies; frequently beta-hemolytic on sheep blood agar (especially uropathogenic strains).',
      hemolysis: 'variable',
      chocolateAgar: 'Large, moist gray colonies.',
      macConkeyAgar: 'Dry, flat, dark pink colonies surrounded by a precipitate zone of bile salts (vigorous lactose fermenter).',
      otherMedia: 'EMB agar: Dark purple colonies with distinctive green metallic sheen. SMAC (Sorbitol MacConkey): Colorless for EHEC O157:H7.',
      elevation: 'flat',
      margin: 'smooth',
      texture: 'creamy'
    },
    biochemicals: {
      oxidase: '-',
      catalase: '+',
      indole: '+',
      mr: '+',
      vp: '-',
      citrate: '-',
      lactoseFermentation: '+',
      tsi: 'A/A Gas+ H2S-',
      lia: 'K/K',
      motility: '+',
      urease: '-'
    },
    virulenceFactors: {
      vi: [
        'Lipopolysaccharide (LPS / Lipid A): Nội độc tố gây sốt, giãn mạch, hạ huyết áp, sốc nhiễm trùng',
        'Fimbriae P (P-pili) & FimH: Bám chặt vào biểu mô đường tiết niệu',
        'Kháng nguyên vỏ K1: Chống thực bào, đặc trưng ở chủng gây viêm màng não sơ sinh',
        'Độc tố ruột: LT (labile toxin - cAMP), ST (stable toxin - cGMP) ở ETEC; Shiga-like toxin (Stx1/Stx2) ở EHEC/STEC gây HUS'
      ],
      en: [
        'Lipopolysaccharide (LPS / Lipid A endotoxin): Triggers TNF/IL-1, septic shock, DIC',
        'P-fimbriae & Type 1 fimbriae: Uroepithelial adherence',
        'K1 capsular antigen: Evades phagocytosis and complement in neonatal meningitis',
        'Exotoxins: LT/ST in ETEC, Shiga toxins (Stx1, Stx2) in EHEC causing Hemolytic Uremic Syndrome'
      ]
    },
    primaryToxins: ['Lipid A Endotoxin', 'Shiga toxins (Stx1, Stx2)', 'Heat-labile (LT) & Heat-stable (ST) enterotoxins', 'Hemolysin'],
    clinicalSignificance: {
      vi: 'Nguyên nhân số 1 gây nhiễm khuẩn đường tiết niệu (UTI), viêm đài bể thận, nhiễm khuẩn huyết, nhiễm khuẩn vết mổ ổ bụng, tiêu chảy du lịch (ETEC) và hội chứng tán huyết ure máu cao HUS (EHEC O157:H7).',
      en: 'Most common cause of ambulatory and nosocomial UTIs, pyelonephritis, sepsis, abdominal wound infections, travelers diarrhea, and HUS (EHEC).'
    },
    recommendedAntibiotics: {
      firstLine: ['Ceftriaxone / Cefotaxime (systemic)', 'Nitrofurantoin / Fosfomycin (uncomplicated UTI)', 'Ciprofloxacin'],
      alternative: ['Piperacillin-tazobactam', 'Meropenem / Ertapenem (if ESBL producer)', 'Amikacin'],
      intrinsicResistance: ['Vancomycin', 'Penicillin G', 'Clindamycin', 'Macrolides']
    },
    clsiGroupNotes: {
      groupA: ['Ampicillin', 'Cefazolin', 'Gentamicin', 'Tobramycin'],
      groupB: ['Amoxicillin-clavulanate', 'Piperacillin-tazobactam', 'Cefepime', 'Ceftriaxone', 'Ciprofloxacin', 'Meropenem', 'TMP-SMX'],
      groupU: ['Nitrofurantoin', 'Trimethoprim', 'Fosfomycin']
    },
    diagnosticPitfalls: {
      vi: 'IMViC của E. coli kinh điển là ++-- (Indole +, MR +, VP -, Citrate -). Cần cảnh giác các chủng sinh ESBL (men CTX-M-15): thử nghiệm với Cefotaxime/Ceftazidime kết hợp Clavulanic acid.',
      en: 'Classic IMViC is ++-- (Indole+, MR+, VP-, Citrate-). Beware of ESBL producers (e.g. CTX-M-15): verify synergy with Clavulanic acid.'
    },
    svgType: 'gnb_enteric'
  },

  // 7. Klebsiella pneumoniae
  {
    id: 'k_pneumoniae',
    name: 'Klebsiella pneumoniae',
    scientificName: 'Klebsiella pneumoniae',
    commonName: {
      vi: 'Trực khuẩn Klebsiella (ESBL / KPC)',
      en: 'Klebsiella (ESBL / KPC)'
    },
    taxonomy: {
      domain: 'Bacteria',
      phylum: 'Pseudomonadota',
      class: 'Gammaproteobacteria',
      order: 'Enterobacterales',
      family: 'Enterobacteriaceae',
      genus: 'Klebsiella',
      species: 'K. pneumoniae'
    },
    gramReaction: 'gram_negative',
    shape: 'bacilli',
    arrangement: 'Single, short plump rods, prominent clear capsule',
    oxygen: 'facultative_anaerobe',
    biosafetyLevel: 2,
    directSmearFeatures: {
      vi: 'Trực khuẩn Gram âm ngắn, mập (plump rods), thường có quầng sáng bao quanh tế bào do lớp vỏ nhầy polysaccharide dày.',
      en: 'Gram-negative short, plump rods with prominent clear halo indicating heavy polysaccharide capsule.'
    },
    colony: {
      bloodAgar: 'Large, mucoid, dome-shaped, grayish-white colonies, strings out when touched with loop (hyperviscous). Nonhemolytic.',
      hemolysis: 'gamma',
      chocolateAgar: 'Large, heaped, mucoid colonies.',
      macConkeyAgar: 'Large, heaped, intensely mucoid pink colonies, sometimes coalescing together, pale center after 48h.',
      elevation: 'convex',
      margin: 'smooth',
      texture: 'mucoid'
    },
    biochemicals: {
      oxidase: '-',
      catalase: '+',
      indole: '-' /* K. oxytoca is + */,
      mr: '-',
      vp: '+',
      citrate: '+',
      urease: '+',
      lactoseFermentation: '+',
      motility: '-',
      tsi: 'A/A Gas+ H2S-',
      lia: 'K/K'
    },
    virulenceFactors: {
      vi: [
        'Vỏ nhầy Polysaccharide dày: Ức chế bổ thể và ngăn cản thực bào',
        'Nội độc tố LPS (Lipid A): Khởi phát viêm mạnh mẽ',
        'Gen kháng thuốc blaSHV-1 nhiễm sắc thể (kháng tự nhiên Ampicillin)',
        'Khả năng nhận plasmid chứa ESBL (CTX-M) và Carbapenemase (KPC, NDM-1)'
      ],
      en: [
        'Heavy polysaccharide capsule: Protects from complement lysis and phagocytosis',
        'LPS Endotoxin Lipid A: Strong systemic inflammatory stimulus',
        'Chromosomal blaSHV-1 beta-lactamase (intrinsic ampicillin resistance)',
        'Readily acquires plasmids encoding ESBLs (CTX-M) and Carbapenemases (KPC, NDM-1)'
      ]
    },
    primaryToxins: ['Lipid A Endotoxin', 'Colibactin (some genotoxic strains)'],
    clinicalSignificance: {
      vi: 'Viêm phổi hoại tử thùy phổi ("đờm thạch nho đỏ" - red currant jelly sputum) ở người nghiện rượu, đái tháo đường; nhiễm trùng bệnh viện (VAP, CAUTI, CLABSI), áp-xe gan sinh mủ.',
      en: 'Severe necrotizing pneumonia with "red currant jelly sputum" in alcoholics/diabetics; hospital-acquired pneumonia (VAP), CAUTI, liver abscesses.'
    },
    recommendedAntibiotics: {
      firstLine: ['Ceftriaxone / Cefepime (if non-ESBL)', 'Meropenem / Imipenem (for ESBL isolates)'],
      alternative: ['Ceftazidime-Avibactam (for KPC producers)', 'Colistin / Tigecycline (for CRE/NDM-1)'],
      intrinsicResistance: ['Ampicillin / Amoxicillin (chromosomal SHV-1 penicillinase)', 'Ticarcillin']
    },
    clsiGroupNotes: {
      groupA: ['Cefazolin', 'Gentamicin', 'Tobramycin'],
      groupB: ['Piperacillin-tazobactam', 'Cefepime', 'Ceftriaxone', 'Meropenem', 'Amikacin', 'Ciprofloxacin'],
      groupC: ['Ceftazidime-avibactam', 'Colistin']
    },
    diagnosticPitfalls: {
      vi: 'K. pneumoniae LUÔN LUÔN kháng tự nhiên với Ampicillin (blaSHV-1). Nếu phòng xét nghiệm trả lời Ampicillin "Nhạy cảm" là lỗi kỹ thuật. Phân biệt với K. oxytoca bằng phản ứng Indole (K. pneumoniae âm tính, K. oxytoca dương tính).',
      en: 'K. pneumoniae is INTRINSICALLY resistant to Ampicillin (blaSHV-1); reporting ampicillin susceptible is an error. Differentiate from K. oxytoca by Indole (K. pneumoniae is Indole-, K. oxytoca is +).'
    },
    svgType: 'gnb_mucoid'
  },

  // 8. Pseudomonas aeruginosa
  {
    id: 'p_aeruginosa',
    name: 'Pseudomonas aeruginosa',
    scientificName: 'Pseudomonas aeruginosa',
    commonName: {
      vi: 'Trực khuẩn mủ xanh (Pseudomonas)',
      en: 'Blue-green Pus Bacillus'
    },
    taxonomy: {
      domain: 'Bacteria',
      phylum: 'Pseudomonadota',
      class: 'Gammaproteobacteria',
      order: 'Pseudomonadales',
      family: 'Pseudomonadaceae',
      genus: 'Pseudomonas',
      species: 'P. aeruginosa'
    },
    gramReaction: 'gram_negative',
    shape: 'bacilli',
    arrangement: 'Single or pairs, straight or slightly curved slender rods',
    oxygen: 'obligate_aerobe',
    biosafetyLevel: 2,
    directSmearFeatures: {
      vi: 'Trực khuẩn Gram âm mảnh, thẳng hoặc hơi cong nhẹ, kích thước 0.5 - 1.0 µm x 1.5 - 3.0 µm.',
      en: 'Slender, straight or slightly curved Gram-negative bacilli, 0.5 - 1.0 µm x 1.5 - 3.0 µm.'
    },
    colony: {
      bloodAgar: 'Large, flat, spreading colonies with jagged or serrated edge; metallic sheen, blue-green pigment (pyocyanin + pyoverdine), distinct beta-hemolysis.',
      hemolysis: 'beta',
      chocolateAgar: 'Spreading colonies with greenish tint and metallic iridescence.',
      macConkeyAgar: 'Colorless to pale brownish/amber colonies (Non-Lactose Fermenter), often with spreading edge.',
      otherMedia: 'Cetrimide agar: Selective isolation with fluorescence under UV.',
      pigment: 'Pyocyanin (blue) + Pyoverdine/Fluorescein (yellow-green fluorescent) = vivid blue-green',
      odor: 'Sweet fruity, grape-like, or fresh tortilla / taco shell odor',
      elevation: 'flat',
      margin: 'irregular',
      texture: 'creamy'
    },
    biochemicals: {
      oxidase: '+',
      catalase: '+',
      citrate: '+',
      motility: '+' /* single polar flagellum */,
      lactoseFermentation: '-',
      tsi: 'K/K (alkaline slant/alkaline butt, no fermentation)',
      urease: 'variable'
    },
    virulenceFactors: {
      vi: [
        'Exotoxin A: Ức chế tổng hợp protein tế bào qua ADP-ribosyl hóa EF-2 (cơ chế giống ngoại độc tố bạch hầu)',
        'Màng ngoài ít thấm (low outer membrane permeability) kết hợp bơm tống thuốc đa cơ chất MexAB-OprM',
        'Alginate slime / Biofilm: Tạo lớp vỏ nhầy dày ở bệnh nhân xơ nang (Cystic Fibrosis)',
        'Elastase & Alkaline Protease: Phá hủy mạch máu và mô liên kết (gây ecthyma gangrenosum)'
      ],
      en: [
        'Exotoxin A: Inactivates EF-2 via ADP-ribosylation (identical mechanism to diphtheria toxin)',
        'High intrinsic impermeability + active multi-efflux pumps (MexAB-OprM)',
        'Alginate exopolysaccharide / Biofilm: Critical in cystic fibrosis patients',
        'Elastase & Proteases: Degrades elastin in blood vessels leading to ecthyma gangrenosum'
      ]
    },
    primaryToxins: ['Exotoxin A', 'Exoenzyme S, T, U, Y (Type III secretion)', 'Elastase', 'Pyocyanin'],
    clinicalSignificance: {
      vi: 'Nhiễm trùng cơ hội nghiêm trọng ở bệnh nhân bỏng, bệnh nhân xơ nang (CF), thở máy (VAP), nhiễm khuẩn huyết kèm sốc, viêm tai ngoài ác tính ở người tiểu đường, loét giác mạc do kính áp tròng.',
      en: 'Major opportunistic pathogen in burn patients, cystic fibrosis lungs, ventilator-associated pneumonia (VAP), neutropenic bacteremia, malignant otitis externa, corneal ulcers.'
    },
    recommendedAntibiotics: {
      firstLine: ['Ceftazidime, Cefepime', 'Piperacillin-tazobactam', 'Meropenem / Doripenem'],
      alternative: ['Ciprofloxacin, Levofloxacin', 'Tobramycin / Amikacin', 'Colistin (polymyxin E for XDR)'],
      intrinsicResistance: [
        'Ampicillin, Amoxicillin-clavulanate',
        'Cefazolin, Cefotaxime, Ceftriaxone',
        'Ertapenem (lacks antipseudomonal activity)',
        'Trimethoprim-sulfamethoxazole',
        'Tetracyclines, Chloramphenicol'
      ]
    },
    clsiGroupNotes: {
      groupA: ['Gentamicin', 'Tobramycin', 'Ceftazidime', 'Piperacillin'],
      groupB: ['Amikacin', 'Cefepime', 'Ciprofloxacin', 'Meropenem', 'Piperacillin-tazobactam']
    },
    diagnosticPitfalls: {
      vi: 'P. aeruginosa là vi khuẩn hiếu khí bắt buộc, Oxidase DƯƠNG TÍNH, không lên men đường (TSI K/K). Ertapenem KHÔNG CÓ tác dụng trên Pseudomonas. Nhạy cảm với Ampicillin là sai sót kỹ thuật.',
      en: 'P. aeruginosa is obligately aerobic, Oxidase POSITIVE, nonfermenter (TSI K/K). Ertapenem has ZERO activity against Pseudomonas. Reporting ampicillin-S is an error.'
    },
    svgType: 'gnb_pseudomonas'
  },

  // 9. Salmonella enterica (serovar Typhi / Typhimurium)
  {
    id: 'salmonella_typhi',
    name: 'Salmonella enterica ser. Typhi',
    scientificName: 'Salmonella enterica serovar Typhi',
    commonName: {
      vi: 'Trực khuẩn thương hàn (Salmonella Typhi)',
      en: 'Typhoid Bacillus (Salmonella Typhi)'
    },
    taxonomy: {
      domain: 'Bacteria',
      phylum: 'Pseudomonadota',
      class: 'Gammaproteobacteria',
      order: 'Enterobacterales',
      family: 'Enterobacteriaceae',
      genus: 'Salmonella',
      species: 'S. enterica'
    },
    gramReaction: 'gram_negative',
    shape: 'bacilli',
    arrangement: 'Single, motile rods (peritrichous flagella)',
    oxygen: 'facultative_anaerobe',
    biosafetyLevel: 2,
    bioterrorCategory: 'B',
    directSmearFeatures: {
      vi: 'Trực khuẩn Gram âm kích thước 1-3 µm x 0.5 µm, di động mạnh bằng lông roi quanh thân.',
      en: 'Gram-negative bacilli, 1-3 µm x 0.5 µm, peritrichously flagellated and motile.'
    },
    colony: {
      bloodAgar: 'Medium, smooth, grayish-white colonies, nonhemolytic.',
      hemolysis: 'gamma',
      chocolateAgar: 'Smooth gray colonies.',
      macConkeyAgar: 'Colorless, transparent colonies (Non-Lactose Fermenter).',
      otherMedia: 'Hektoen Enteric (HE): Blue-green colonies with black centers (H2S+). XLD agar: Red colonies with black centers. Bismuth Sulfite: Black colonies with metallic sheen.',
      elevation: 'convex',
      margin: 'smooth',
      texture: 'creamy'
    },
    biochemicals: {
      oxidase: '-',
      catalase: '+',
      lactoseFermentation: '-',
      tsi: 'K/A H2S+ (weak ring of H2S in S. Typhi, no gas)',
      lia: 'K/K H2S+ (lysine decarboxylase positive)',
      citrate: '-',
      urease: '-',
      indole: '-',
      motility: '+'
    },
    virulenceFactors: {
      vi: [
        'Kháng nguyên Vi (Virulence capsular polysaccharide): Ức chế thực bào và ngăn cản bổ thể',
        'Hệ thống tiết Type III: Giúp vi khuẩn xâm nhập tế bào M mảng Peyer ruột',
        'Khả năng tồn tại nội bào trong đại thực bào và hệ thống võng nội mô (gan, lách, tủy xương, túi mật)'
      ],
      en: [
        'Vi capsular antigen: Polysaccharide masking somatic O antigen and evading phagocytosis',
        'Type III secretion systems: Mediates M cell invasion in Peyer patches',
        'Intracellular survival within macrophages and reticuloendothelial system (gallbladder carrier)'
      ]
    },
    primaryToxins: ['Lipid A Endotoxin', 'Cytolethal distending toxin'],
    clinicalSignificance: {
      vi: 'Bệnh thương hàn (Typhoid fever): sốt hình bậc thang kéo dài, mạch nhiệt phân ly, đào ban (rose spots), xuất huyết tiêu hóa, thủng ruột. Người lành mang trùng mãn tính khu trú ở túi mật.',
      en: 'Typhoid enteric fever: stepwise prolonged fever, bradycardia (Faget sign), rose spots, intestinal hemorrhage/perforation. Chronic carrier state in gallbladder.'
    },
    recommendedAntibiotics: {
      firstLine: ['Ceftriaxone', 'Azithromycin'],
      alternative: ['Ciprofloxacin (if susceptible, check fluoroquinolone MIC)', 'Trimethoprim-sulfamethoxazole'],
      intrinsicResistance: ['First- and second-generation cephalosporins and aminoglycosides are clinically ineffective in vivo']
    },
    clsiGroupNotes: {
      groupA: ['Ampicillin', 'Ciprofloxacin', 'TMP-SMX'],
      groupB: ['Ceftriaxone', 'Azithromycin']
    },
    diagnosticPitfalls: {
      vi: 'CLSI khuyến cáo: đối với Salmonella phân lập từ phân, CHỈ báo cáo Ampicillin, Fluoroquinolone và TMP-SMX. Không báo cáo Cephalosporin thế hệ 1, 2 hay Aminoglycoside vì không có hiệu lực trên lâm sàng.',
      en: 'CLSI mandate: for fecal Salmonella, report ONLY ampicillin, a fluoroquinolone, and TMP-SMX. Extraintestinal isolates require 3rd-gen cephalosporin & chloramphenicol.'
    },
    svgType: 'gnb_salmonella'
  },

  // 10. Neisseria gonorrhoeae & meningitidis
  {
    id: 'neisseria_gonorrhoeae',
    name: 'Neisseria gonorrhoeae',
    scientificName: 'Neisseria gonorrhoeae',
    commonName: {
      vi: 'Lậu cầu khuẩn (Gonococcus)',
      en: 'Gonococcus (GC)'
    },
    taxonomy: {
      domain: 'Bacteria',
      phylum: 'Pseudomonadota',
      class: 'Betaproteobacteria',
      order: 'Neisseriales',
      family: 'Neisseriaceae',
      genus: 'Neisseria',
      species: 'N. gonorrhoeae'
    },
    gramReaction: 'gram_negative',
    shape: 'diplococci',
    arrangement: 'Kidney bean-shaped diplococci, intracellular in PMNs',
    oxygen: 'capnophile',
    biosafetyLevel: 2,
    directSmearFeatures: {
      vi: 'Song cầu Gram âm hình hạt cà phê (kidney-bean), hai mặt lõm úp vào nhau, nằm điển hình bên trong bào tương của tế bào bạch cầu đa nhân (PMN).',
      en: 'Gram-negative kidney bean-shaped diplococci with adjacent flattened sides, typically intracellular within PMN leukocytes.'
    },
    colony: {
      bloodAgar: 'No growth (fastidious, requires hemoglobin/hemin).',
      hemolysis: 'gamma',
      chocolateAgar: 'Small, grayish-white to tan, glistening, raised colonies at 35-37°C in 3-5% CO2.',
      macConkeyAgar: 'No growth.',
      otherMedia: 'Modified Thayer-Martin (MTM), JEMBEC, Martin-Lewis, New York City (NYC) medium: Selective with vancomycin, colistin, nystatin, trimethoprim.',
      elevation: 'raised',
      margin: 'smooth',
      texture: 'sticky'
    },
    biochemicals: {
      oxidase: '+',
      catalase: '+',
      otherKeyTests: 'CTA (Cystine Tryptic Agar) sugars: Glucose ONLY (+), Maltose (-), Lactose (-), Sucrose (-). Superoxol (30% H2O2) strongly positive.'
    },
    virulenceFactors: {
      vi: [
        'Pili (Fimbriae): Bám dính vào tế bào biểu mô sinh dục, biến đổi kháng nguyên liên tục',
        'IgA1 Protease: Phân cắt kháng thể IgA màng nhầy',
        'Lipooligosaccharide (LOS): Nội độc tố mạnh thiếu chuỗi O dài',
        'Protein Opa (Opacity-associated): Trung gian xâm nhập tế bào ký chủ'
      ],
      en: [
        'Pili: Mediates mucosal attachment, high antigenic and phase variation',
        'IgA1 Protease: Cleaves mucosal IgA',
        'Lipooligosaccharide (LOS): Potent endotoxin lacking O-antigen repeats',
        'Opa proteins: Intercellular adherence and host cell invasion'
      ]
    },
    primaryToxins: ['LOS Endotoxin'],
    clinicalSignificance: {
      vi: 'Bệnh lậu (Gonorrhea): viêm niệu đạo tiết mủ ở nam giới, viêm cổ tử cung và viêm vùng chậu (PID) dẫn đến vô sinh ở nữ giới, viêm kết mạc sơ sinh, lậu cầu lan tỏa (DGI).',
      en: 'Gonorrhea: acute purulent urethritis in males, endocervicitis and pelvic inflammatory disease (PID) with tubal scarring in females, ophthalmia neonatorum, disseminated gonococcal infection (DGI).'
    },
    recommendedAntibiotics: {
      firstLine: ['Ceftriaxone (500mg IM single dose)'],
      alternative: ['Gentamicin (IM) + Azithromycin (oral) (if severe beta-lactam allergy)'],
      intrinsicResistance: ['Natural competence for genetic transformation facilitates rapid multi-drug resistance']
    },
    clsiGroupNotes: {
      groupA: ['Ceftriaxone', 'Cefixime'],
      groupB: ['Azithromycin', 'Ciprofloxacin (widespread resistance)']
    },
    diagnosticPitfalls: {
      vi: 'N. gonorrhoeae cực kỳ nhạy cảm với lạnh và khô; mẫu bệnh phẩm cần cấy ngay tại giường (bedside) lên đĩa JEMBEC/MTM và ủ trong 3-5% CO2. Lậu cầu phân biệt với N. meningitidis bằng lên men Maltose (Lậu âm tính, Não mô cầu dương tính).',
      en: 'Extremely fastidious and cold-sensitive: requires immediate bedside inoculation onto JEMBEC/MTM in 3-5% CO2. Differentiate from N. meningitidis by maltose (GC is maltose-, NM is maltose+).'
    },
    svgType: 'gndc_intracellular'
  },

  // 11. Haemophilus influenzae
  {
    id: 'h_influenzae',
    name: 'Haemophilus influenzae',
    scientificName: 'Haemophilus influenzae',
    commonName: {
      vi: 'Vi khuẩn Haemophilus (HiB)',
      en: 'Haemophilus influenzae (HiB)'
    },
    taxonomy: {
      domain: 'Bacteria',
      phylum: 'Pseudomonadota',
      class: 'Gammaproteobacteria',
      order: 'Pasteurellales',
      family: 'Pasteurellaceae',
      genus: 'Haemophilus',
      species: 'H. influenzae'
    },
    gramReaction: 'gram_negative',
    shape: 'coccobacilli',
    arrangement: 'Pleomorphic small coccobacilli or slender rods',
    oxygen: 'facultative_anaerobe',
    biosafetyLevel: 2,
    directSmearFeatures: {
      vi: 'Trực cầu khuẩn Gram âm rất nhỏ, đa hình thái (pleomorphic coccobacilli), bắt màu hồng nhạt, đôi khi thấy dạng sợi dài.',
      en: 'Very small, pale-staining pleomorphic Gram-negative coccobacilli or filaments.'
    },
    colony: {
      bloodAgar: 'No growth on plain sheep blood agar (lacks free V factor and contains sheep blood enzymes destroying V factor). Demonstrates satellitism around S. aureus colonies.',
      hemolysis: 'gamma',
      chocolateAgar: 'Medium, smooth, flat, translucent, grayish-tan colonies with mousy or musty odor.',
      macConkeyAgar: 'No growth.',
      otherMedia: 'Haemophilus Test Medium (HTM). Rabbit or horse blood agar supports growth without satellitism.',
      odor: 'Musty basement or "mousy" / mouse nest odor',
      elevation: 'flat',
      margin: 'smooth',
      texture: 'creamy'
    },
    biochemicals: {
      oxidase: '+',
      catalase: '+',
      otherKeyTests: 'Requires BOTH X factor (hemin) and V factor (NAD) for growth. Porphyrin (ALA) test negative.'
    },
    virulenceFactors: {
      vi: [
        'Vỏ Polyribosylribitol phosphate (PRP - type b): Yếu tố độc lực chính gây bệnh xâm lấn',
        'IgA1 Protease: Phá hủy kháng thể niêm mạc',
        'Pili và protein màng ngoài: Giúp bám dính biểu mô vòm họng'
      ],
      en: [
        'Type b PRP capsule: Primary anti-phagocytic factor causing invasive pediatric disease',
        'IgA1 Protease: Mucosal colonization facilitator',
        'Pili and outer membrane adhesins: Colonization of respiratory tract'
      ]
    },
    primaryToxins: ['Lipid A Endotoxin'],
    clinicalSignificance: {
      vi: 'Viêm nắp thanh quản cấp (epiglottitis - cấp cứu đe dọa tắc thở), viêm màng não mủ ở trẻ em (typ b), viêm tai giữa, viêm xoang, đợt cấp COPD (chủng không vỏ NTHi).',
      en: 'Acute epiglottitis (airway emergency), pediatric meningitis (type b), otitis media, sinusitis, COPD exacerbations (non-typeable strains).'
    },
    recommendedAntibiotics: {
      firstLine: ['Ceftriaxone / Cefotaxime (for severe/invasive disease)', 'Amoxicillin-clavulanate'],
      alternative: ['Ampicillin (if beta-lactamase negative)', 'Levofloxacin / Moxifloxacin', 'Azithromycin'],
      intrinsicResistance: ['Macrolides have borderline/variable activity in vitro']
    },
    clsiGroupNotes: {
      groupA: ['Ampicillin', 'Cefotaxime / Ceftriaxone', 'TMP-SMX'],
      groupB: ['Amoxicillin-clavulanate', 'Cefuroxime', 'Meropenem', 'Ciprofloxacin']
    },
    diagnosticPitfalls: {
      vi: 'Cần làm thử nghiệm nhanh Cefinase (đĩa nitrocefin) để phát hiện men beta-lactamase (25-50% chủng kháng ampicillin qua sinh men). Nếu beta-lactamase âm tính mà kháng ampicillin gọi là BLNAR (đột biến PBP3).',
      en: 'Perform rapid nitrocefin (Cefinase) disk test: ~30-40% produce beta-lactamase. Strains that are beta-lactamase-negative but ampicillin-resistant are BLNAR (altered PBP3).'
    },
    svgType: 'gnb_coccobacilli'
  },

  // 12. Mycobacterium tuberculosis
  {
    id: 'm_tuberculosis',
    name: 'Mycobacterium tuberculosis',
    scientificName: 'Mycobacterium tuberculosis',
    commonName: {
      vi: 'Trực khuẩn lao (AFB / Koch Bacillus)',
      en: 'Tubercle Bacillus (AFB / MTb)'
    },
    taxonomy: {
      domain: 'Bacteria',
      phylum: 'Actinomycetota',
      class: 'Actinomycetes',
      order: 'Mycobacteriales',
      family: 'Mycobacteriaceae',
      genus: 'Mycobacterium',
      species: 'M. tuberculosis'
    },
    gramReaction: 'acid_fast',
    shape: 'branching_filamentous',
    arrangement: 'Slender, slightly curved or beaded rods, often in serpentine cords',
    oxygen: 'obligate_aerobe',
    biosafetyLevel: 3,
    directSmearFeatures: {
      vi: 'Bắt màu đỏ tươi trên nền xanh khi nhuộm kháng toan Ziehl-Neelsen / Kinyoun; phát huỳnh quang vàng cam sáng khi nhuộm Auramine-Rhodamine. Trên nhuộm Gram bắt màu rất yếu hoặc dạng "bóng âm tính" (negative ghost image).',
      en: 'Bright red beaded slender bacilli against blue background on Ziehl-Neelsen/Kinyoun acid-fast stain. Bright yellow-orange on fluorescent Auramine-Rhodamine. Ghost negative on Gram stain.'
    },
    colony: {
      bloodAgar: 'No growth within standard incubation (takes 2-6 weeks on specialized media).',
      hemolysis: 'gamma',
      chocolateAgar: 'Slow growth.',
      macConkeyAgar: 'No growth.',
      otherMedia: 'Lowenstein-Jensen (LJ) slant: Rough, crumbly, dry, warty, cauliflower-like buff/cream colonies ("rough, buff"). Middlebrook 7H10/7H11. BACTEC MGIT broth.',
      elevation: 'raised',
      margin: 'rough',
      texture: 'dry'
    },
    biochemicals: {
      catalase: '+' /* heat labile at 68C - */,
      otherKeyTests: 'Niacin accumulation positive. Nitrate reduction positive. Acid-fast positive. Real-time PCR (GeneXpert MTB/RIF) detects MTb and rpoB rifampin resistance within 2 hours.'
    },
    virulenceFactors: {
      vi: [
        'Vách tế bào giàu Axit Mycolic (>60% lipid): Kháng hóa chất, khô hạn, ngăn cản tiêu hủy trong thực bào',
        'Cord factor (Trehalose dimycolate): Tạo chuỗi thừng đặc trưng, ức chế di chuyển bạch cầu',
        'Ức chế hòa màng Phagosome - Lysosome: Cho phép vi khuẩn nhân lên bên trong đại thực bào phế nang'
      ],
      en: [
        'Mycolic acid-rich cell wall (>60% lipids): Resistance to desiccation, acids, and intracellular digestion',
        'Cord factor (Trehalose 6,6-dimycolate): Forms serpentine cords, inhibits PMN migration',
        'Inhibition of phagolysosome fusion: Replicates intracellularly within alveolar macrophages'
      ]
    },
    primaryToxins: ['No classic exotoxin; cell wall components mediate severe delayed-type hypersensitivity and caseous necrosis'],
    clinicalSignificance: {
      vi: 'Bệnh lao phổi kinh điển (ho khạc kéo dài, ho ra máu, gầy sút cân, sốt về chiều, đổ mồ hôi đêm) và lao ngoài phổi (lao hạch, lao màng não, lao màng phổi, lao xương khớp Pott).',
      en: 'Pulmonary tuberculosis (chronic cough, hemoptysis, weight loss, night sweats) and extrapulmonary TB (scrofula, tuberculous meningitis, Pott disease).'
    },
    recommendedAntibiotics: {
      firstLine: ['Rifampin (R)', 'Isoniazid (H)', 'Pyrazinamide (Z)', 'Ethambutol (E) (RHZE regimen)'],
      alternative: ['MDR-TB: Bedaquiline, Linezolid, Fluoroquinolones (Moxifloxacin), Delamanid, Amikacin'],
      intrinsicResistance: ['Inherently resistant to all standard broad-spectrum antibacterial beta-lactams due to waxy lipid cell wall']
    },
    clsiGroupNotes: {
      groupA: ['Isoniazid', 'Rifampin', 'Pyrazinamide', 'Ethambutol'],
      groupB: ['Amikacin', 'Levofloxacin / Moxifloxacin', 'Linezolid']
    },
    diagnosticPitfalls: {
      vi: 'Trực khuẩn lao là tác nhân lây qua đường không khí, yêu cầu an toàn sinh học cấp độ 3 (BSL-3). Không được mở đĩa cấy nghi ngờ ngoài buồng an toàn sinh học. Dùng GeneXpert MTB/RIF cho kết quả nhanh sau 2 giờ.',
      en: 'Airborne pathogen requiring Biosafety Level 3 (BSL-3). Never manipulate suspicious cultures outside a certified Class II/III BSC. Utilize GeneXpert MTB/RIF for rapid 2-hour detection and rifampin resistance.'
    },
    svgType: 'afb_cords'
  },

  // 14. Bacillus anthracis
  {
    id: 'b_anthracis',
    name: 'Bacillus anthracis',
    scientificName: 'Bacillus anthracis',
    commonName: {
      vi: 'Trực khuẩn than (Anthrax - Vũ khí sinh học nhóm A)',
      en: 'Anthrax Bacillus (Select Agent Tier 1)'
    },
    taxonomy: {
      domain: 'Bacteria',
      phylum: 'Bacillota',
      class: 'Bacilli',
      order: 'Bacillales',
      family: 'Bacillaceae',
      genus: 'Bacillus',
      species: 'B. anthracis'
    },
    gramReaction: 'gram_positive',
    shape: 'bacilli',
    arrangement: 'Large, boxcar-shaped rods in long chains with central/subterminal spores',
    oxygen: 'obligate_aerobe',
    biosafetyLevel: 3,
    bioterrorCategory: 'A',
    directSmearFeatures: {
      vi: 'Trực khuẩn Gram dương rất lớn (1-1.5 µm x 3-5 µm), hình toa tàu (boxcar), đầu vuông, đứng thành chuỗi dài như mắt xích, bào tử không bắt màu nhuộm Gram.',
      en: 'Very large Gram-positive boxcar-shaped rods with square ends in long chains; unstained oval central spores.'
    },
    colony: {
      bloodAgar: 'Large, flat, rough, gray-white with swirling filamentous projections ("Medusa head" or beaten-egg white appearance), NON-HEMOLYTIC (differentiates from B. cereus).',
      hemolysis: 'gamma',
      chocolateAgar: 'Abundant dry rough growth.',
      macConkeyAgar: 'No growth.',
      elevation: 'flat',
      margin: 'filamentous',
      texture: 'dry'
    },
    biochemicals: {
      catalase: '+',
      motility: '-' /* Key rule-out: nonmotile, unlike B. cereus */,
      otherKeyTests: 'Gamma phage lysis susceptible. Penicillin string-of-pearls test positive (cells round up like pearls in subinhibitory penicillin).'
    },
    virulenceFactors: {
      vi: [
        'Vỏ Poly-D-glutamic acid (trên plasmid pXO2): Vỏ polypeptide duy nhất không chứa polysaccharide, kháng thực bào',
        'Phức hợp ngoại độc tố 3 thành phần (trên plasmid pXO1):',
        '1. Protective Antigen (PA): Gắn thụ thể màng tế bào, mở kênh vận chuyển độc tố',
        '2. Edema Factor (EF): Calmodulin-dependent adenylate cyclase gây phù nề ồ ạt',
        '3. Lethal Factor (LF): Zinc metalloprotease phân cắt MAPK gây hoại tử mô và chết tế bào'
      ],
      en: [
        'Poly-D-glutamic acid capsule (pXO2): Non-immunogenic peptide capsule evading phagocytosis',
        'Tripartite exotoxin complex (pXO1):',
        '1. Protective Antigen (PA): Binds cell receptors and mediates toxin entry',
        '2. Edema Factor (EF): Calmodulin-activated adenylate cyclase causing massive edema',
        '3. Lethal Factor (LF): Zinc metalloprotease cleaving MAPKK leading to shock and death'
      ]
    },
    primaryToxins: ['Protective Antigen (PA)', 'Edema Factor (EF)', 'Lethal Factor (LF)'],
    clinicalSignificance: {
      vi: 'Bệnh than thể da (loét hoại tử đáy đen - eschar), bệnh than thể hô hấp (inhalation anthrax - trung thất giãn rộng, tử vong rất cao), và bệnh than tiêu hóa. Tác nhân khủng bố sinh học nguy hiểm số 1.',
      en: 'Cutaneous anthrax with black eschar, inhalation anthrax with widened mediastinum (rapidly fatal), gastrointestinal anthrax. Category A Bioterror Agent.'
    },
    recommendedAntibiotics: {
      firstLine: ['Ciprofloxacin', 'Doxycycline'],
      alternative: ['Meropenem', 'Penicillin G (if susceptible)', 'Clindamycin / Linezolid (inhibits toxin production)'],
      intrinsicResistance: ['Cephalosporins (produce beta-lactamases)']
    },
    clsiGroupNotes: {
      groupA: ['Ciprofloxacin', 'Doxycycline'],
      groupB: ['Penicillin G', 'Clindamycin']
    },
    diagnosticPitfalls: {
      vi: 'Dấu hiệu loại trừ (Rule-out) B. anthracis tại lab tuyến cơ sở: B. anthracis KHÔNG DI ĐỘNG (motility -), KHÔNG TAN MÁU TRÊN MÁU CỪU (nonhemolytic) và nhạy Penicillin. B. cereus di động mạnh và tan máu beta rộng.',
      en: 'Sentinel lab rule-out criteria: B. anthracis is NONMOTILE and NONHEMOLYTIC on sheep blood agar. B. cereus is motile and strongly beta-hemolytic.'
    },
    svgType: 'gpr_boxcar'
  },

  // 15. Cryptococcus neoformans
  {
    id: 'c_neoformans',
    name: 'Cryptococcus neoformans',
    scientificName: 'Cryptococcus neoformans',
    commonName: {
      vi: 'Nấm men có vỏ bao Cryptococcus',
      en: 'Encapsulated Yeast (Cryptococcus)'
    },
    taxonomy: {
      domain: 'Eukarya',
      phylum: 'Basidiomycota',
      class: 'Tremellomycetes',
      order: 'Tremellales',
      family: 'Cryptococcaceae',
      genus: 'Cryptococcus',
      species: 'C. neoformans'
    },
    gramReaction: 'variable_or_other',
    shape: 'yeast',
    arrangement: 'Spherical yeast with narrow-based budding and giant capsule',
    oxygen: 'obligate_aerobe',
    biosafetyLevel: 2,
    directSmearFeatures: {
      vi: 'Nhuộm Mực Tàu (India ink) hoặc Nigrosin trên DNT: tế bào nấm men hình cầu tròn (4-10 µm) nảy chồi đế hẹp, bao bọc bởi lớp vỏ nang polysaccharide khổng lồ khúc xạ ánh sáng (quầng sáng trong suốt trên nền đen).',
      en: 'India ink negative stain of CSF: Round to oval yeasts (4-10 µm) with narrow-based buds, surrounded by a distinct wide clear halo of polysaccharide capsule on dark background.'
    },
    colony: {
      bloodAgar: 'Medium, convex, creamy-white to mucoid colonies in 48-72 hours.',
      hemolysis: 'gamma',
      chocolateAgar: 'Mucoid cream colonies.',
      macConkeyAgar: 'No growth.',
      otherMedia: 'Birdseed agar (Guizotia abyssinica / Caffeic acid agar): Brown-black colonies due to melanin production by phenoloxidase. Sabouraud Dextrose Agar (SDA).',
      elevation: 'convex',
      margin: 'smooth',
      texture: 'mucoid'
    },
    biochemicals: {
      urease: '+',
      otherKeyTests: 'Cryptococcal capsular antigen (CrAg) lateral flow assay (LFA) positive with >98% sensitivity. Phenoloxidase positive on birdseed agar.'
    },
    virulenceFactors: {
      vi: [
        'Vỏ Glucuronoxylomannan (GXM): Kháng thực bào, ức chế miễn dịch tế bào T',
        'Enzym Phenoloxidase tổng hợp Melanin: Chống lại các gốc oxy phản ứng của đại thực bào',
        'Khả năng phát triển tốt ở 37°C'
      ],
      en: [
        'Glucuronoxylomannan (GXM) capsule: Strongly anti-phagocytic and immunosuppressive',
        'Melanin synthesis via phenoloxidase: Protects against oxidative burst inside macrophages',
        'Thermotolerance at 37°C'
      ]
    },
    primaryToxins: ['No classic exotoxin; capsule GXM and melanin are primary determinants'],
    clinicalSignificance: {
      vi: 'Viêm màng não - não do nấm ở bệnh nhân suy giảm miễn dịch (đặc biệt là người nhiễm HIV/AIDS với CD4 < 100 tế bào/µL, người ghép tạng). Tỷ lệ tử vong rất cao nếu chẩn đoán muộn.',
      en: 'Cryptococcal meningoencephalitis in immunocompromised hosts (especially HIV/AIDS with CD4 < 100/µL, solid organ transplant). Fatal without prompt treatment.'
    },
    recommendedAntibiotics: {
      firstLine: ['Amphotericin B deoxycholate + Flucytosine (induction)', 'Fluconazole (consolidation & maintenance)'],
      alternative: ['Liposomal Amphotericin B', 'High-dose Fluconazole'],
      intrinsicResistance: ['Echinocandins (Caspofungin, Micafungin are intrinsically inactive against Cryptococcus!)']
    },
    clsiGroupNotes: {
      groupA: ['Amphotericin B', 'Flucytosine', 'Fluconazole'],
      groupB: ['Voriconazole', 'Posaconazole']
    },
    diagnosticPitfalls: {
      vi: 'Test kháng nguyên nang Cryptococcus (CrAg LFA) trên dịch não tủy và huyết thanh có độ nhạy/đặc hiệu vượt trội (>98%) so với nhuộm Mực Tàu (chỉ khoảng 50-70%). Echinocandin KHÔNG CÓ tác dụng trên Cryptococcus.',
      en: 'Cryptococcal antigen LFA has >98% sensitivity compared to India ink (~60%). Echinocandins have NO ACTIVITY against Cryptococcus.'
    },
    svgType: 'yeast_india_ink'
  }
];

const RAW_COMBINED_PATHOGENS: Pathogen[] = [
  ...BASE_PATHOGENS,
  ...ADDITIONAL_PATHOGENS,
  ...PATHOGENS_PART2,
  ...PATHOGENS_PART3
];

// Ensure absolutely unique IDs across datasets to prevent duplicate React keys
const seenPathogenIds = new Set<string>();
export const PATHOGENS: Pathogen[] = RAW_COMBINED_PATHOGENS.filter(p => {
  if (seenPathogenIds.has(p.id)) {
    return false;
  }
  seenPathogenIds.add(p.id);
  return true;
});
