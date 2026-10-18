import { ToxinProfile, AntimicrobialClassGuideline } from '../types';

export const EXOTOXIN_VS_ENDOTOXIN = [
  {
    property: {
      vi: 'Nguồn gốc vi sinh',
      en: 'Organism Source'
    },
    exotoxin: {
      vi: 'Cả vi khuẩn Gram dương và Gram âm',
      en: 'Both Gram-positive and Gram-negative bacteria'
    },
    endotoxin: {
      vi: 'Độc quyền ở vi khuẩn Gram âm (LPS màng ngoài)',
      en: 'Gram-negative bacteria exclusively (outer membrane LPS)'
    }
  },
  {
    property: {
      vi: 'Bản chất hóa học',
      en: 'Chemical Nature'
    },
    exotoxin: {
      vi: 'Protein hòa tan (thường cấu trúc 2 tiểu đơn vị A-B)',
      en: 'Simple proteins / polypeptides (usually A-B subunit structure)'
    },
    endotoxin: {
      vi: 'Phức hợp Lipopolysaccharide (LPS: Lipid A + Lõi đường + O-antigen)',
      en: 'Protein-lipid-polysaccharide complex (LPS: Lipid A core)'
    }
  },
  {
    property: {
      vi: 'Vị trí & Cơ chế tiết',
      en: 'Location & Release'
    },
    exotoxin: {
      vi: 'Được tế bào sống chủ động tiết ra môi trường ngoài hoặc giải phóng khi ly giải',
      en: 'Actively secreted by living bacteria into environment or upon cell lysis'
    },
    endotoxin: {
      vi: 'Gắn liền trên màng ngoài vách vi khuẩn; giải phóng ồ ạt khi vi khuẩn bị ly giải hoặc phân chia',
      en: 'Integral constituent of outer membrane; released in large amounts upon cell death/lysis'
    }
  },
  {
    property: {
      vi: 'Độ bền nhiệt (100°C)',
      en: 'Stability to Heating (100°C)'
    },
    exotoxin: {
      vi: 'Kém bền nhiệt (bị biến tính ở 60-80°C, trừ Staph enterotoxin & E. coli ST)',
      en: 'Heat-labile (destroyed at 60-80°C, except Staph enterotoxin & E. coli ST)'
    },
    endotoxin: {
      vi: 'Rất bền nhiệt (chịu được đun sôi 100°C trong nhiều giờ, cần nhiệt phân cực cao)',
      en: 'Heat-stable (withstands 100°C boiling for hours)'
    }
  },
  {
    property: {
      vi: 'Độc lực / Liều gây chết',
      en: 'Toxicity & Lethal Dose'
    },
    exotoxin: {
      vi: 'Cực kỳ cao (chất độc nhất hành tinh, liều chết microgram hoặc picogram)',
      en: 'Extremely potent (among most lethal substances, µg or pg doses)'
    },
    endotoxin: {
      vi: 'Độc tính vừa phải hơn; cần lượng microgram đến milligram để gây sốc',
      en: 'Moderate toxicity; higher doses needed to induce lethal endotoxic shock'
    }
  },
  {
    property: {
      vi: 'Tính sinh miễn dịch & Giải độc tố (Toxoid)',
      en: 'Immunogenicity & Toxoid Production'
    },
    exotoxin: {
      vi: 'Tính kháng nguyên mạnh; có thể chuyển hóa bằng Formalin thành Toxoid làm vaccine (uốn ván, bạch hầu)',
      en: 'Highly immunogenic; neutralized by antibody; converted by formalin into toxoids for vaccines'
    },
    endotoxin: {
      vi: 'Miễn dịch yếu; không tạo được giải độc tố (Toxoid); kháng thể trung hòa một phần',
      en: 'Poorly immunogenic; cannot be converted to toxoid vaccines; partial antibody neutralization'
    }
  },
  {
    property: {
      vi: 'Triệu chứng lâm sàng',
      en: 'Clinical Manifestation'
    },
    exotoxin: {
      vi: 'Rất đặc hiệu cho từng mô đích (co giật, liệt mềm, tiêu chảy nước, hoại tử da...)',
      en: 'Highly specific to target organ systems (tetanic spasm, flaccid paralysis, massive diarrhea)'
    },
    endotoxin: {
      vi: 'Không đặc hiệu: sốt cao (kích hoạt IL-1, TNF), hạ huyết áp, sốc nhiễm trùng, đông máu rải rác lòng mạch (DIC)',
      en: 'Systemic & non-specific: high fever (IL-1, TNF-alpha), hypotension, septic shock, leukopenia, DIC'
    }
  }
];

export const TOXIN_PROFILES: ToxinProfile[] = [
  {
    id: 'tetanospasmin',
    name: 'Tetanospasmin (Tetanus Toxin)',
    type: 'exotoxin',
    organism: 'Clostridium tetani',
    disease: {
      vi: 'Bệnh uốn ván (Tetanus): co cứng hàm (trismus), cơn co giật giật cứng toàn thân',
      en: 'Tetanus: lockjaw (trismus), risus sardonicus, painful opistotonos and rigid spasms'
    },
    mechanism: {
      vi: 'Zinc-metalloprotease phân cắt synaptobrevin (VAMP), ngăn chặn giải phóng chất dẫn truyền ức chế GABA và Glycine tại tủy sống',
      en: 'Zinc metalloprotease cleaving synaptobrevin (VAMP), blocking release of inhibitory neurotransmitters GABA and glycine'
    },
    targetCell: 'Tế bào thần kinh ức chế sừng trước tủy sống và tủy thần kinh',
    clinicalEffect: {
      vi: 'Mất ức chế vận động, dẫn đến kích thích liên tục các neuron vận động gây co cứng cơ liên tục đe dọa ngừng thở',
      en: 'Uncontrolled motor nerve hyperactivity resulting in spastic paralysis and respiratory arrest'
    },
    lethalityScore: 'Extremely High',
    heatStability: 'Heat-labile'
  },
  {
    id: 'botulinum',
    name: 'Botulinum Neurotoxin (Types A-G)',
    type: 'exotoxin',
    organism: 'Clostridium botulinum',
    disease: {
      vi: 'Bệnh ngộ độc thịt Botulism: liệt mềm đối xứng lan xuống dưới, hội chứng ngộ độc thức ăn đóng hộp',
      en: 'Botulism: descending symmetrical flaccid paralysis, diplopia, bulbar palsy, respiratory failure'
    },
    mechanism: {
      vi: 'Phân cắt các protein phức hợp SNARE (SNAP-25, Syntaxin, Synaptobrevin), ngăn giải phóng Acetylcholine tại synap thần kinh - cơ',
      en: 'Cleaves SNARE complex proteins (SNAP-25, syntaxin), blocking acetylcholine exocytosis at neuromuscular junction'
    },
    targetCell: 'Múc nối thần kinh - cơ (Neuromuscular junction)',
    clinicalEffect: {
      vi: 'Liệt cơ mềm hoàn toàn, nhìn đôi, sụp mi, nuốt khó, liệt cơ hoành dẫn đến ngạt thở',
      en: 'Flaccid muscle paralysis, diplopia, ptosis, dysphagia, respiratory arrest'
    },
    lethalityScore: 'Extremely High',
    heatStability: 'Heat-labile'
  },
  {
    id: 'diphtheria',
    name: 'Diphtheria Toxin',
    type: 'exotoxin',
    organism: 'Corynebacterium diphtheriae',
    disease: {
      vi: 'Bệnh bạch hầu: màng giả dai màu xám ở hầu họng, viêm cơ tim nhiễm độc, liệt dây thần kinh sọ',
      en: 'Diphtheria: tough grayish pseudomembrane on tonsils/pharynx, toxic myocarditis, neuropathies'
    },
    mechanism: {
      vi: 'Ngoại độc tố cấu trúc A-B: Tiểu đơn vị A xúc tác gắn ADP-ribosyl vào yếu tố kéo dài EF-2, làm ngừng hoàn toàn tổng hợp protein',
      en: 'A-B subunit toxin: Subunit A catalyzes ADP-ribosylation of Elongation Factor 2 (EF-2), halting cellular protein synthesis'
    },
    targetCell: 'Biểu mô hô hấp, tế bào cơ tim, bao Schwann sợi thần kinh',
    clinicalEffect: {
      vi: 'Tử vong do tắc nghẽn đường thở bởi màng giả hoặc suy tim cấp do viêm cơ tim nhiễm độc',
      en: 'Airway occlusion by fibrous pseudomembrane, lethal cardiac arrhythmia or congestive heart failure'
    },
    lethalityScore: 'High',
    heatStability: 'Heat-labile'
  },
  {
    id: 'cholera_toxin',
    name: 'Cholera Enterotoxin (Choleragen)',
    type: 'exotoxin',
    organism: 'Vibrio cholerae',
    disease: {
      vi: 'Bệnh dịch tả (Cholera): tiêu chảy xối xả dạng "nước vo gạo", mất nước và điện giải cấp tính',
      en: 'Cholera: severe voluminous "rice-water" diarrhea with rapid hypovolemic shock'
    },
    mechanism: {
      vi: 'Tiểu đơn vị A ADP-ribosyl hóa tiểu đơn vị Gs-alpha, giữ Adenylate Cyclase ở trạng thái mở liên tục, làm tăng vọt nồng độ cAMP nội bào',
      en: 'ADP-ribosylates Gs-alpha protein, locking adenylate cyclase in permanently active state, spiking intracellular cAMP'
    },
    targetCell: 'Tế bào biểu mô niêm mạc ruột non (Enterocytes)',
    clinicalEffect: {
      vi: 'Bơm chủ động ion Cl- và ức chế hấp thu Na+, kéo theo lượng nước khổng lồ (lên tới 20 lít/ngày) vào lòng ruột',
      en: 'Active secretion of chloride and inhibition of sodium uptake, purging up to 20 liters of isotonic fluid per day'
    },
    lethalityScore: 'High',
    heatStability: 'Heat-labile'
  },
  {
    id: 'cdiff_toxin_b',
    name: 'C. difficile Cytotoxin (Toxin B) & Enterotoxin (Toxin A)',
    type: 'exotoxin',
    organism: 'Clostridioides difficile',
    disease: {
      vi: 'Viêm đại tràng màng giả, tiêu chảy mất nước sau dùng kháng sinh phổ rộng',
      en: 'Pseudomembranous colitis, severe antibiotic-associated colitis with toxic megacolon'
    },
    mechanism: {
      vi: 'Glucosyl hóa các protein Rho/Rac GTPase nội bào, phá vỡ cấu trúc vi sợi Actin của bộ khung tế bào biểu mô đại tràng',
      en: 'Monoglucosylates small Rho and Rac GTPases, collapsing actin cytoskeleton and tight junctions of colonocytes'
    },
    targetCell: 'Tế bào biểu mô đại tràng và đại thực bào màng nhầy',
    clinicalEffect: {
      vi: 'Thoát dịch tế bào, hoại tử màng niêm mạc, hình thành màng giả fibrin-bạch cầu phủ trên các ổ loét',
      en: 'Epithelial cell apoptosis, hypersecretion, mucosal ulcerations covered by yellow-white pseudomembranous plaques'
    },
    lethalityScore: 'High',
    heatStability: 'Heat-labile'
  },
  {
    id: 'shiga_toxin',
    name: 'Shiga Toxin (Stx1, Stx2 / Verotoxin)',
    type: 'exotoxin',
    organism: 'Shigella dysenteriae / EHEC (E. coli O157:H7)',
    disease: {
      vi: 'Hội chứng lỵ trực trùng, Hội chứng tan huyết ure máu cao (HUS) ở trẻ nhỏ',
      en: 'Bacillary dysentery, Hemolytic Uremic Syndrome (HUS: microangiopathic hemolytic anemia, thrombocytopenia, acute renal failure)'
    },
    mechanism: {
      vi: 'N-glycosidase phân cắt một Adenine cụ thể khỏi 28S rRNA của tiểu đơn vị ribosome 60S, ức chế gắn kết aminoacyl-tRNA',
      en: 'N-glycosidase cleaving a specific adenine from 28S rRNA of 60S ribosomal subunit, irreversibly halting translation'
    },
    targetCell: 'Nội mô vi mạch cầu thận và mao mạch ruột (gắn qua thụ thể Gb3)',
    clinicalEffect: {
      vi: 'Hoại tử vi mạch thận, tạo cục máu đông vi thể, tiêu máu trong phân, suy thận cấp ở trẻ em',
      en: 'Glomerular microvascular thrombosis, red cell fragmentation (schistocytes), acute renal shutdown'
    },
    lethalityScore: 'Extremely High',
    heatStability: 'Heat-labile'
  },
  {
    id: 'lipid_a_lps',
    name: 'Endotoxin (Lipid A of LPS)',
    type: 'endotoxin',
    organism: 'Tất cả vi khuẩn Gram âm (E. coli, Klebsiella, Pseudomonas, Salmonella, Neisseria...)',
    disease: {
      vi: 'Hội chứng đáp ứng viêm toàn thân (SIRS), sốc nhiễm trùng Gram âm, đông máu rải rác lòng mạch (DIC)',
      en: 'Gram-negative septic shock, severe sepsis, multi-organ dysfunction syndrome (MODS), and DIC'
    },
    mechanism: {
      vi: 'Gắn vào TLR-4 trên đại thực bào thông qua protein LBP và CD14, kích hoạt tín hiệu NF-kB giải phóng ồ ạt TNF-alpha, IL-1, IL-6, Nitric Oxide (NO)',
      en: 'Binds TLR-4/MD-2 complex via CD14 and LBP, activating NF-kB pathway to trigger massive surge of TNF-alpha, IL-1beta, IL-6, and inducible NO synthase'
    },
    targetCell: 'Đại thực bào, tế bào nội mô mạch máu, tiểu cầu và dòng bạch cầu trung tính',
    clinicalEffect: {
      vi: 'Sốt cao, giãn mạch toàn thân, tụt huyết áp kháng dịch, tổn thương nội mô gây đông máu tiêu thụ và xuất huyết',
      en: 'High fever, refractory systemic vasodilation, hypotension, vascular collapse, capillary leak, platelet consumption'
    },
    lethalityScore: 'High',
    heatStability: 'Heat-stable (100°C)'
  }
];

export const INTRINSIC_RESISTANCE_MATRIX = [
  {
    organism: 'Pseudomonas aeruginosa',
    intrinsicResistantDrugs: [
      'Ampicillin, Amoxicillin-clavulanate',
      'Cefazolin, Cefuroxime, Cefotaxime, Ceftriaxone',
      'Ertapenem (lacks antipseudomonal activity)',
      'Trimethoprim, Trimethoprim-sulfamethoxazole',
      'Tetracycline, Chloramphenicol'
    ],
    mechanism: {
      vi: 'Màng ngoài permeability cực thấp kết hợp bơm tống thuốc MexAB-OprM và men AmpC nhiễm sắc thể inducible.',
      en: 'Low outer membrane permeability, multidrug efflux pumps (MexAB-OprM), and inducible chromosomal AmpC.'
    }
  },
  {
    organism: 'Klebsiella pneumoniae',
    intrinsicResistantDrugs: ['Ampicillin, Amoxicillin, Carbenicillin, Ticarcillin'],
    mechanism: {
      vi: 'Men penicillinase blaSHV-1 hiện diện tự nhiên trên nhiễm sắc thể.',
      en: 'Constitutively expressed chromosomal blaSHV-1 beta-lactamase.'
    }
  },
  {
    organism: 'Enterococcus faecalis / faecium',
    intrinsicResistantDrugs: [
      'Tất cả Cephalosporin (Thế hệ 1 đến 4)',
      'Trimethoprim-sulfamethoxazole (dùng folate ngoại sinh in vivo)',
      'Aminoglycosides đơn độc liều thông thường (kém thấm)',
      'Clindamycin'
    ],
    mechanism: {
      vi: 'PBP có ái lực rất thấp với Cephalosporin; khả năng dung nạp hấp thu folate có sẵn trong cơ thể người.',
      en: 'Low-affinity PBPs (PBP5) to cephalosporins; can utilize exogenous folates in human host tissue.'
    }
  },
  {
    organism: 'Stenotrophomonas maltophilia',
    intrinsicResistantDrugs: [
      'Carbapenems (Imipenem, Meropenem, Doripenem, Ertapenem)',
      'Hầu hết beta-lactams và aminoglycosides'
    ],
    mechanism: {
      vi: 'Mang gen metallo-beta-lactamase L1 thủy phân carbapenem và cephalosporinase L2.',
      en: 'Chromosomal zinc-dependent metallo-beta-lactamase L1 (hydrolyzes carbapenems) and cephalosporinase L2.'
    }
  },
  {
    organism: 'Proteus mirabilis',
    intrinsicResistantDrugs: ['Nitrofurantoin', 'Tetracyclines', 'Colistin / Polymyxin B'],
    mechanism: {
      vi: 'Thay đổi điện tích màng ngoài LPS và đề kháng tự nhiên với polymyxins.',
      en: 'Altered LPS charge causing natural resistance to cationic peptides (polymyxins) and nitrofurantoin.'
    }
  }
];

export const ANTIMICROBIAL_CLASSES: AntimicrobialClassGuideline[] = [
  {
    class: 'Beta-Lactams (Penicillins, Cephalosporins, Carbapenems, Monobactams)',
    target: 'Penicillin-Binding Proteins (PBPs) - Transpeptidases',
    mechanism: {
      vi: 'Tương tự cấu trúc cơ chất D-Ala-D-Ala, gắn cộng hóa trị vào PBP, ức chế phản ứng tạo liên kết chéo peptidoglycan làm ly giải tế bào',
      en: 'Structural analogs of D-Ala-D-Ala; binds PBPs to inhibit peptidoglycan transpeptidation cross-linking leading to osmotic lysis'
    },
    examples: ['Amoxicillin', 'Cefazolin', 'Ceftriaxone', 'Cefepime', 'Meropenem', 'Aztreonam'],
    spectrum: 'Phổ hẹp đến siêu rộng (Gram dương và Gram âm)',
    primaryResistanceMechanism: {
      vi: 'Sinh men Beta-lactamase (TEM, SHV, CTX-M ESBL, KPC, NDM-1), biến đổi PBP (mecA PBP2a ở MRSA), giảm tính thấm porin',
      en: 'Beta-lactamase production (ESBLs, Carbapenemases), target PBP modification (PBP2a in MRSA), porin downregulation'
    }
  },
  {
    class: 'Glycopeptides & Lipoglycopeptides (Vancomycin, Teicoplanin, Oritavancin)',
    target: 'Đầu tận D-Ala-D-Ala của chuỗi pentapeptide vách',
    mechanism: {
      vi: 'Bao bọc và gắn chặt vào đầu D-Ala-D-Ala tự do, phong bế không gian ngăn cản transglycosylase và transpeptidase kéo dài vách peptidoglycan',
      en: 'Binds with high affinity to terminal D-Ala-D-Ala dipeptide, sterically blocking peptidoglycan elongation'
    },
    examples: ['Vancomycin', 'Teicoplanin', 'Daptomycin (cyclic lipopeptide)'],
    spectrum: 'Chỉ có hoạt tính trên vi khuẩn Gram dương (quá lớn để đi qua màng ngoài Gram âm)',
    primaryResistanceMechanism: {
      vi: 'Thay thế D-Ala-D-Ala thành D-Ala-D-Lactate (gen vanA, vanB ở VRE/VRSA) làm giảm 1000 lần ái lực gắn của Vancomycin',
      en: 'Reprogramming cell wall terminus to D-Ala-D-Lac (vanA/vanB in VRE/VRSA) reducing binding affinity 1000-fold'
    }
  },
  {
    class: 'Aminoglycosides (Gentamicin, Tobramycin, Amikacin)',
    target: 'Tiểu đơn vị 30S Ribosome (16S rRNA)',
    mechanism: {
      vi: 'Gắn vị trí A của 16S rRNA, gây đọc sai mã bộ ba codon (mistranslation) và ức chế chuyển vị; diệt khuẩn phụ thuộc năng lượng hiếu khí',
      en: 'Binds 16S rRNA of 30S subunit, inducing mRNA codon misreading and protein mistranslation; oxygen-dependent bactericidal'
    },
    examples: ['Gentamicin', 'Tobramycin', 'Amikacin', 'Streptomycin'],
    spectrum: 'Trực khuẩn Gram âm hiếu khí, tụ cầu, phối hợp hiệp đồng trong viêm nội tâm mạc',
    primaryResistanceMechanism: {
      vi: 'Enzym biến đổi aminoglycoside qua Acetyl hóa (AAC), Adenyl hóa (ANT), Phosphoryl hóa (APH); đột biến bơm đẩy',
      en: 'Aminoglycoside-modifying enzymes: N-acetyltransferases (AAC), O-adenyltransferases (ANT), O-phosphotransferases (APH)'
    }
  },
  {
    class: 'Fluoroquinolones (Ciprofloxacin, Levofloxacin, Moxifloxacin)',
    target: 'DNA Gyrase (Topoisomerase II) & Topoisomerase IV',
    mechanism: {
      vi: 'Khóa chặt phức hợp enzym-DNA đang cắt dở, làm đứt gãy sợi đôi nhiễm sắc thể DNA vi khuẩn và ức chế sao chép',
      en: 'Traps topoisomerase-DNA cleavage complexes, generating lethal double-strand DNA breaks and halting replication'
    },
    examples: ['Ciprofloxacin', 'Levofloxacin', 'Moxifloxacin'],
    spectrum: 'Rộng (Gram âm đường ruột, Pseudomonas, vi khuẩn không điển hình, phế cầu)',
    primaryResistanceMechanism: {
      vi: 'Đột biến điểm vùng QRDR trên gen gyrA và parC; bơm tống thuốc chủ động; gen plasmid qnr bảo vệ gyrase',
      en: 'Point mutations in QRDR region of gyrA/parC; upregulated multidrug efflux pumps; plasmid-mediated qnr protection'
    }
  },
  {
    class: 'Macrolides & Lincosamides (Azithromycin, Clarithromycin, Clindamycin)',
    target: 'Tiểu đơn vị 50S Ribosome (23S rRNA)',
    mechanism: {
      vi: 'Gắn gần vị trí peptidyltransferase trên 23S rRNA, chặn đường hầm thoát của chuỗi peptide đang hình thành, kìm khuẩn',
      en: 'Binds near peptidyltransferase center of 23S rRNA in 50S subunit, blocking peptide exit tunnel and elongation'
    },
    examples: ['Azithromycin', 'Clarithromycin', 'Erythromycin', 'Clindamycin'],
    spectrum: 'Gram dương, vi khuẩn nội bào (Chlamydia, Mycoplasma, Legionella)',
    primaryResistanceMechanism: {
      vi: 'Methyl hóa ribosome qua enzym methylase mã hóa bởi gen erm (kiểu hình MLSB cảm ứng hoặc cấu thành); bơm tống thuốc gen mef/msrA',
      en: 'Ribosomal methylation by erm methylase (inducible MLSB phenotype detected by D-zone test); efflux via mef/msrA'
    }
  }
];
