/**
 * CLINI_PORTAL — BIOCHEMISTRY KNOWLEDGE GRAPH & CURRICULUM DATA (TS)
 * Path: src/content/pathophysiology/data/biochemistry-data.ts
 * Hệ thống dữ liệu 7 Khối - 31 Chuyên đề Hóa Sinh Y Học
 * Tham chiếu: Hóa Sinh Y Học ĐHYD 2024, Harper's Illustrated Biochemistry 32nd, 
 * Clinical Biochemistry: An Illustrated Colour Text 7th, Essential Biochemistry (Pratt).
 */

import { BiochemistryDataStore } from '../types/biochemistry.types';

export const BIOCHEMISTRY_DATA: BiochemistryDataStore = {
  version: "2026.1",
  stats: {
    totalBlocks: 7,
    totalTopics: 31,
    totalPathways: 48,
    totalClinicalPearls: 112,
    totalEnzymes: 240
  },
  
  // Danh mục 7 Khối chuyên đề lớn
  blocks: [
    {
      id: "block-1",
      code: "B1",
      name: "Nền tảng & Cấu trúc Phân tử Sinh học",
      englishName: "Biomolecules & Molecular Architecture",
      icon: "fa-cubes-stacked",
      color: "#0284c7",
      bgColor: "rgba(2, 132, 199, 0.1)",
      description: "Nước, pH, hệ đệm và cấu trúc hóa sinh nền tảng của 4 đại phân tử: Glucid, Lipid, Protid và Acid Nucleic.",
      topicsCount: 6
    },
    {
      id: "block-2",
      code: "B2",
      name: "Động học Xúc tác, Màng & Truyền tín hiệu",
      englishName: "Catalysis, Membranes & Cell Signaling",
      icon: "fa-bolt-lightning",
      color: "#8b5cf6",
      bgColor: "rgba(139, 92, 246, 0.1)",
      description: "Vitamin & Coenzym, Động học enzym Michaelis-Menten, cấu trúc màng sinh học và các con đường truyền tin tế bào (GPCR, RTK).",
      topicsCount: 4
    },
    {
      id: "block-3",
      code: "B3",
      name: "Năng lượng Sinh học & Chuyển hóa Trung gian",
      englishName: "Bioenergetics & Krebs Cycle",
      icon: "fa-fire-flame-curved",
      color: "#f59e0b",
      bgColor: "rgba(245, 158, 11, 0.1)",
      description: "Năng lượng tự do sinh học, chu trình Acid Citric (Krebs), chuỗi hô hấp tế bào ty thể và cơ chế phosphoryl hóa oxy hóa.",
      topicsCount: 3
    },
    {
      id: "block-4",
      code: "B4",
      name: "Chuyển hóa Chuyên biệt 4 Đại phân tử",
      englishName: "Intermediary Metabolism",
      icon: "fa-arrows-spin",
      color: "#10b981",
      bgColor: "rgba(16, 185, 129, 0.1)",
      description: "Chuyển hóa chi tiết Glucid (Đường phân, Tân tạo, HMP), Lipid (β-oxy hóa, FAS, Cholesterol), Protid (Ure), Hemoglobin & Purin/Gout.",
      topicsCount: 5
    },
    {
      id: "block-5",
      code: "B5",
      name: "Sinh học Phân tử Y học & Kỹ thuật Gen",
      englishName: "Molecular Genetics & Recombinant DNA",
      icon: "fa-dna",
      color: "#ec4899",
      bgColor: "rgba(236, 72, 153, 0.1)",
      description: "Tái bản & Sửa sai DNA, Phiên mã & Xử lý RNA, Mã di truyền & Dịch mã, Kỹ thuật PCR, Real-time qPCR và Giải trình tự NGS.",
      topicsCount: 4
    },
    {
      id: "block-6",
      code: "B6",
      name: "Hóa sinh Cơ quan & Tích hợp Chuyển hóa",
      englishName: "Organ & Integrated Metabolism",
      icon: "fa-network-wired",
      color: "#06b6d4",
      bgColor: "rgba(6, 182, 212, 0.1)",
      description: "Tích hợp chuyển hóa No - Đói - Đói kéo dài, Hóa sinh Máu & Dòng thác Đông máu, Hóa sinh Gan, Cơ vân, Thận và Khung ngoại bào.",
      topicsCount: 3
    },
    {
      id: "block-7",
      code: "B7",
      name: "Hóa sinh Lâm sàng, Dịch Sinh học & Biện luận",
      englishName: "Clinical Biochemistry & Lab Diagnostics",
      icon: "fa-flask-vial",
      color: "#ef4444",
      bgColor: "rgba(239, 68, 68, 0.1)",
      description: "Biện luận xét nghiệm chức năng Gan (LFTs), Thận (eGFR, uACR), Tim mạch (Troponin, BNP), Khí máu ABG, Điện giải và Dấu ấn Ung thư.",
      topicsCount: 6
    }
  ],

  // 31 Chuyên đề chi tiết
  topics: [
    // --- KHỐI 1 ---
    {
      id: "topic-01",
      blockId: "block-1",
      order: 1,
      code: "CHEM-01",
      title: "Hóa học Nước, pH & Cân bằng Điện giải Nền tảng",
      slug: "nuoc-ph-he-dem",
      badge: "Cốt lõi",
      tags: ["Nước", "pH", "Hệ đệm", "Điện giải", "Henderson-Hasselbalch"],
      overview: "Bản chất lưỡng cực của nước, liên kết Hydro, hiệu ứng kỵ nước, cơ chế đệm Bicarbonat, Phosphat và Proteinat trong duy trì pH sinh lý 7.35 - 7.45.",
      keyReactions: ["H2O + CO2 ⇌ H2CO3 ⇌ H+ + HCO3-", "pH = pKa + log([A-]/[HA])"],
      clinicalPearls: [
        "Hệ đệm Bicarbonat là hệ đệm mở quan trọng nhất dịch ngoại bào do phổi kiểm soát PaCO2 và thận kiểm soát HCO3-.",
        "Toan hô hấp cấp bù trừ chậm qua thận (2-3 ngày) trong khi toan chuyển hóa bù trừ nhanh qua tăng thông khí phổi (vài phút)."
      ],
      relatedLabTests: ["Khí máu động mạch (ABG)", "Điện giải đồ (Na, K, Cl)", "Áp lực thẩm thấu máu"]
    },
    {
      id: "topic-02",
      blockId: "block-1",
      order: 2,
      code: "CHEM-02",
      title: "Hóa học Glucid (Carbohydrates)",
      slug: "hoa-hoc-glucid",
      badge: "Cốt lõi",
      tags: ["Glucid", "Monosacarid", "Haworth", "Glycogen", "Đường khử"],
      overview: "Cấu tạo, đồng phân D/L, anomer α/β, dạng vòng Pyranose/Furanose của Monosacarid; Cấu trúc Disacarid và Polysacarid (Glycogen, Tinh bột, GAGs).",
      keyReactions: ["Phản ứng khử ion Cu2+ (Thuốc thử Fehling/Benedict) tạo kết tủa đỏ gạch Cu2O.", "Liên kết O-glycosid giữa các phân tử đường."],
      clinicalPearls: [
        "Đường đơn chứa nhóm carbonyl tự do có tính khử, là cơ sở của que thử đường niệu cổ điển.",
        "Kháng nguyên nhóm máu hệ ABO trên bề mặt hồng cầu bản chất là các chuỗi oligosacarid gắn trên sphingolipid và protein."
      ],
      relatedLabTests: ["Glucose máu đói", "Đường niệu", "HbA1c"]
    },
    {
      id: "topic-03",
      blockId: "block-1",
      order: 3,
      code: "CHEM-03",
      title: "Hóa học Lipid & Lipoprotein Màng",
      slug: "hoa-hoc-lipid",
      badge: "Cốt lõi",
      tags: ["Lipid", "Acid béo", "Phospholipid", "Cholesterol", "Màng tế bào"],
      overview: "Phân loại Lipid thuần/tạp; Cấu tạo Acid béo bão hòa, chưa bão hòa (PUFA, Omega-3/6); Cấu trúc Phospholipid màng, Cholesterol và Khung Steroid sinh học.",
      keyReactions: ["Phản ứng este hóa tạo Triglycerid", "Xà phòng hóa lipid bằng kiềm nóng"],
      clinicalPearls: [
        "Tỷ lệ Cholesterol/Phospholipid quyết định độ mềm dẻo và tính lỏng của màng tế bào.",
        "Bệnh tích tụ lipid màng Sphingolipid (Tay-Sachs, Niemann-Pick, Gaucher) do thiếu enzym tiêu thể di truyền."
      ],
      relatedLabTests: ["Lipid máu toàn phần (TC, TG, LDL-C, HDL-C)", "Apolipoprotein B", "Lp(a)"]
    },
    {
      id: "topic-04",
      blockId: "block-1",
      order: 4,
      code: "CHEM-04",
      title: "Hóa học Protid (Acid Amin, Peptid & Protein)",
      slug: "hoa-hoc-protid",
      badge: "Cốt lõi",
      tags: ["Acid amin", "Protein", "Điện di", "Peptid", "Biến tính"],
      overview: "20 acid amin tiêu chuẩn, tính chất ion lưỡng tính, điểm đẳng điện (pI); Cấu trúc 4 bậc của Protein, các liên kết duy trì và hiện tượng biến tính.",
      keyReactions: ["Tạo liên kết peptid giữa nhóm α-COOH và α-NH2 giải phóng H2O.", "Phản ứng Ninhydrin định lượng acid amin."],
      clinicalPearls: [
        "Ở pH sinh lý (7.4), hầu hết acid amin tồn tại ở dạng Zwitterion (lưỡng cực).",
        "Sự cuộn gập sai cấu trúc bậc 3/4 của protein tạo các mảng sợi không tan là cơ chế gây bệnh Alzheimer (Aβ amyloid) và Prion."
      ],
      relatedLabTests: ["Protein toàn phần", "Albumin", "Điện di Protein huyết thanh (SPEP)"]
    },
    {
      id: "topic-05",
      blockId: "block-1",
      order: 5,
      code: "CHEM-05",
      title: "Hóa học Hemoglobin, Myoglobin & Sắc tố Hô hấp",
      slug: "hoa-hoc-hemoglobin",
      badge: "Cốt lõi",
      tags: ["Hemoglobin", "Heme", "Hiệu ứng Bohr", "2,3-BPG", "Thalassemia"],
      overview: "Cấu trúc Heme (Fe2+ + Protoporphyrin IX), Globin tetramer (α2β2), cơ chế kết hợp oxy có tính hợp tác (Allosteric), hiệu ứng Bohr và chất điều hòa 2,3-BPG.",
      keyReactions: ["Hb + 4O2 ⇌ Hb(O2)4", "Fe2+ bị oxy hóa thành Fe3+ tạo Methemoglobin không gắn được O2."],
      clinicalPearls: [
        "Ái lực của Hemoglobin với CO cao gấp 220 lần so với O2, đẩy đường cong phân ly sang trái gây ngạt mô nặng.",
        "Đột biến điểm tại codon 6 chuỗi β-globin (Glu → Val) làm hồng cầu biến dạng hình liềm khi thiếu oxy (HbS)."
      ],
      relatedLabTests: ["Tổng phân tích tế bào máu (CBC)", "Điện di huyết sắc tố (Hb Electrophoresis)", "Khí máu Co-oximetry (MetHb, COHb)"]
    },
    {
      id: "topic-06",
      blockId: "block-1",
      order: 6,
      code: "CHEM-06",
      title: "Hóa học Nucleotid & Acid Nucleic (DNA / RNA)",
      slug: "hoa-hoc-acid-nucleic",
      badge: "Cốt lõi",
      tags: ["DNA", "RNA", "Nucleotid", "Watson-Crick", "Purin/Pyrimidin"],
      overview: "Cấu tạo Base Nitơ, Ribose/Deoxyribose, liên kết Phosphodiester; Cấu trúc chuỗi xoắn kép DNA, nhiệt độ nóng chảy (Tm); Các loại RNA chức năng.",
      keyReactions: ["Nguyên tắc bổ sung: A=T (2 liên kết H), G≡C (3 liên kết H).", "Thủy phân liên kết phosphodiester bằng Nuclease."],
      clinicalPearls: [
        "DNA chứa tỷ lệ G-C càng cao thì nhiệt độ nóng chảy (Tm) càng lớn do có 3 liên kết Hydro.",
        "Các thuốc chống ung thư nhóm antimetabolite (5-Fluorouracil, Methotrexate) ức chế tổng hợp thymidylate gây chết tế bào phân chia nhanh."
      ],
      relatedLabTests: ["Xét nghiệm đột biến gen", "Tải lượng virus DNA/RNA", "Anti-dsDNA (Lupus)"]
    },

    // --- KHỐI 2 ---
    {
      id: "topic-07",
      blockId: "block-2",
      order: 7,
      code: "CAT-01",
      title: "Vitamin & Coenzym Học",
      slug: "vitamin-coenzym",
      badge: "Xúc tác",
      tags: ["Vitamin B", "Vitamin tan trong dầu", "Coenzym", "Biotin", "Folate"],
      overview: "Phân loại, cấu trúc và vai trò coenzym của các Vitamin tan trong nước (B1-TPP, B2-FAD, B3-NAD, B6-PLP, B9-THF, B12) và Vitamin tan trong dầu (A, D, E, K).",
      keyReactions: ["B1 (TPP) xúc tác khử carboxyl oxy hóa pyruvate.", "Vitamin K xúc tác γ-carboxyl hóa yếu tố đông máu II, VII, IX, X."],
      clinicalPearls: [
        "Thiếu Vitamin B1 ở người nghiện rượu gây hội chứng não Wernicke-Korsakoff; bắt buộc tiêm Thiamine trước khi truyền đường Glucose.",
        "Thiếu Folate hoặc B12 ức chế tổng hợp thymidine dẫn đến thiếu máu nguyên hồng cầu khổng lồ (Megaloblastic anemia)."
      ],
      relatedLabTests: ["Định lượng Vitamin B12 / Folate", "Nồng độ 25-OH Vitamin D", "Thời gian Prothrombin (PT/INR)"]
    },
    {
      id: "topic-08",
      blockId: "block-2",
      order: 8,
      code: "CAT-02",
      title: "Enzym & Động học Enzym Học",
      slug: "enzym-dong-hoc",
      badge: "Xúc tác",
      tags: ["Enzym", "Michaelis-Menten", "Km", "Vmax", "Ức chế enzym", "Isoenzym"],
      overview: "Bản chất protein của enzym, trung tâm hoạt động, 6 lớp enzym (EC 1-6); Phương trình Michaelis-Menten, đồ thị Lineweaver-Burk; Ức chế cạnh tranh/không cạnh tranh; Isoenzym lâm sàng.",
      keyReactions: ["V = (Vmax * [S]) / (Km + [S])", "1/V = (Km/Vmax) * (1/[S]) + (1/Vmax)"],
      clinicalPearls: [
        "Ức chế cạnh tranh làm tăng Km biểu kiến nhưng không đổi Vmax (dùng nồng độ cơ chất cao có thể thắng được ức chế, ví dụ Ethanol giải ngộ độc Methanol).",
        "Động học phóng thích Troponin và CK-MB là tiêu chuẩn vàng chẩn đoán hoại tử tế bào cơ tim cấp."
      ],
      relatedLabTests: ["AST, ALT", "CK, CK-MB", "Troponin T/I", "Amylase, Lipase", "LDH", "ALP, GGT"]
    },
    {
      id: "topic-09",
      blockId: "block-2",
      order: 9,
      code: "CAT-03",
      title: "Màng Sinh Học & Vận Chuyển Qua Màng",
      slug: "mang-te-bao-van-chuyen",
      badge: "Cơ chế",
      tags: ["Màng tế bào", "Bơm Na/K", "Aquaporin", "Vận chuyển chủ động", "SNARE"],
      overview: "Mô hình khảm động, tính lỏng màng; Cơ chế khuếch tán đơn thuần, khuếch tán được hỗ trợ (Kênh ion, GLUT); Vận chuyển chủ động nguyên phát (Na+/K+-ATPase) và thứ phát (SGLT1).",
      keyReactions: ["Bơm Na+/K+-ATPase: Bơm 3 Na+ ra ngoài, lấy 2 K+ vào trong, tiêu tốn 1 ATP."],
      clinicalPearls: [
        "Thuốc trợ tim Digoxin ức chế bơm Na+/K+-ATPase làm tăng Na+ nội bào, gián tiếp tăng Ca2+ nội bào qua trao đổi Na+/Ca2+ giúp tăng sức co bóp cơ tim.",
        "Đột biến kênh vận chuyển Clo CFTR gây bệnh xơ nang tụy (Cystic Fibrosis) với dịch tiết quánh đặc ở phổi và tiêu hóa."
      ],
      relatedLabTests: ["Điện giải đồ mồ hôi (Chẩn đoán Xơ nang)", "Độ thẩm thấu niệu"]
    },
    {
      id: "topic-10",
      blockId: "block-2",
      order: 10,
      code: "CAT-04",
      title: "Hormon & Các Con Đường Truyền Tín Hiệu Tế Bào",
      slug: "hormon-truyen-tin",
      badge: "Điều hòa",
      tags: ["GPCR", "cAMP", "IP3/DAG", "Tyrosine Kinase", "Insulin", "Hormon"],
      overview: "Phân loại hormon; Cơ chế thụ thể màng gắn protein G (GPCR con đường cAMP-PKA, IP3/DAG-PKC); Thụ thể enzym Tyrosine Kinase (Insulin, GF); Thụ thể nhân gắn Steroid và T3/T4.",
      keyReactions: ["ATP --(Adenylyl Cyclase)--> cAMP --(Phosphodiesterase)--> 5'-AMP", "PIP2 --(Phospholipase C)--> IP3 + DAG"],
      clinicalPearls: [
        "Độc tố tả (Cholera toxin) khóa tiểu phần Gs ở trạng thái hoạt hóa vĩnh viễn, tăng vọt cAMP ruột gây tiêu chảy mất nước ồ ạt.",
        "Kháng thể kích thích thụ thể TSH (TRAb) kích hoạt liên tục tuyến giáp trong bệnh Basedow (Graves' disease)."
      ],
      relatedLabTests: ["TSH, FT4, FT3", "Cortisol máu", "ACTH", "Insulin & C-peptide"]
    },

    // --- KHỐI 3 ---
    {
      id: "topic-11",
      blockId: "block-3",
      order: 11,
      code: "ENG-01",
      title: "Đại Cương Chuyển Hóa & Năng Lượng Tự Do (ΔG)",
      slug: "nang-luong-sinh-hoc",
      badge: "Năng lượng",
      tags: ["Năng lượng tự do", "ΔG", "ATP", "Dị hóa", "Đồng hóa", "Liên kết cao năng"],
      overview: "Nguyên lý nhiệt động học sinh học, khái niệm năng lượng tự do Gibbs (ΔG°'), các dạng liên kết cao năng (~P: Phosphoenolpyruvate, Creatine phosphate, ATP); Cặp ghép phản ứng sinh học.",
      keyReactions: ["ΔG = ΔH - T*ΔS", "ATP + H2O ⇌ ADP + Pi (ΔG°' = -30.5 kJ/mol)"],
      clinicalPearls: [
        "Phosphocreatine đóng vai trò là bể dự trữ năng lượng cao năng tức thời của mô cơ, tái tạo ATP nhanh chóng trong 5-10 giây đầu vận động.",
        "Các phản ứng có ΔG âm lớn là các điểm điều hòa chính không thể đảo ngược của các con đường chuyển hóa."
      ],
      relatedLabTests: ["Creatine Kinase (CK)", "Lactate máu"]
    },
    {
      id: "topic-12",
      blockId: "block-3",
      order: 12,
      code: "ENG-02",
      title: "Phức Hợp Pyruvat Dehydrogenase & Chu Trình Acid Citric (Krebs)",
      slug: "chu-trinh-krebs",
      badge: "Năng lượng",
      tags: ["Chu trình Krebs", "Pyruvate Dehydrogenase", "Acetyl-CoA", "Citrat", "Ty thể"],
      overview: "Cơ chế 3 enzym & 5 coenzym của phức hợp PDH; 8 phản ứng của chu trình Krebs; Năng lượng tạo thành (3 NADH, 1 FADH2, 1 GTP); Tính chất lưỡng tính (Amphibolic) và phản ứng bổ sung cơ chất.",
      keyReactions: ["Pyruvate + CoA + NAD+ --(PDH)--> Acetyl-CoA + CO2 + NADH", "Oxaloacetate + Acetyl-CoA --(Citrate Synthase)--> Citrate"],
      clinicalPearls: [
        "Đột biến gen PDH hoặc thiếu hụt Thiamine (B1) làm tắc nghẽn chuyển pyruvate thành acetyl-CoA, dồn ứ pyruvate chuyển thành lactate gây toan lactic nặng.",
        "Fluoroacetate (thuốc diệt chuột) chuyển thành Fluorocitrate ức chế enzym Aconitase làm tê liệt chu trình Krebs gây tử vong nhanh chóng."
      ],
      relatedLabTests: ["Lactate máu", "Pyruvate máu", "Khí máu động mạch"]
    },
    {
      id: "topic-13",
      blockId: "block-3",
      order: 13,
      code: "ENG-03",
      title: "Chuỗi Hô Hấp Tế Bào Ty Thể & Phosphoryl Hóa Oxy Hóa",
      slug: "chuoi-ho-hap-etc",
      badge: "Năng lượng",
      tags: ["ETC", "Ty thể", "ATP Synthase", "Cyanua", "ROS", "Uncoupler"],
      overview: "4 phức hợp màng trong ty thể (Complex I - IV), Coenzyme Q, Cytochrome c; Thuyết hóa thẩm Mitchell tạo gradient proton; Hoạt động của FoF1-ATP Synthase; Chất ức chế và chất phá ghép; Gốc tự do ROS.",
      keyReactions: ["NADH + H+ + 1/2 O2 + 3 ADP + 3 Pi --> NAD+ + H2O + 3 ATP", "O2 + e- --> O2•- (Superoxide anion)"],
      clinicalPearls: [
        "Khí độc Cyanua (CN-) và CO ức chế Complex IV (Cytochrome c oxidase), chặn đứng hoàn toàn chuỗi hô hấp tế bào gây chết ngạt mô dù phân áp O2 máu bình thường.",
        "Protein phá ghép Thermogenin (UCP-1) ở ty thể mô mỡ nâu giải phóng năng lượng dưới dạng nhiệt giúp giữ ấm trẻ sơ sinh."
      ],
      relatedLabTests: ["Khí máu động mạch", "Đo độ bão hòa oxy máu tĩnh mạch trung tâm (ScvO2)"]
    },

    // --- KHỐI 4 ---
    {
      id: "topic-14",
      blockId: "block-4",
      order: 14,
      code: "MET-01",
      title: "Chuyển Hóa Glucid Toàn Diện",
      slug: "chuyen-hoa-glucid",
      badge: "Chuyển hóa",
      tags: ["Đường phân", "Tân tạo đường", "Glycogen", "HMP", "G6PD", "Đái tháo đường"],
      overview: "Đường phân (10 phản ứng, enzym PFK-1); Tân tạo Glucose từ Lactate/Glycerol/Acid amin; Thoái hóa & Tổng hợp Glycogen; Nhánh HMP Shunt tạo NADPH; Chuyển hóa Fructose & Galactose.",
      keyReactions: ["Fructose-6-P + ATP --(PFK-1)--> Fructose-1,6-bisP + ADP", "Glucose-6-P + 2 NADP+ --(G6PD)--> 6-Phosphogluconate + 2 NADPH"],
      clinicalPearls: [
        "Thiếu men G6PD di truyền liên kết X: Hồng cầu không tạo đủ NADPH để khử Glutathione, dễ vỡ tán huyết cấp khi sốt, ăn đậu tằm hoặc dùng thuốc oxy hóa (Primaquine, Sulfonamid).",
        "Bệnh ứ đọng Glycogen typ I (Von Gierke - thiếu Glucose-6-Phosphatase): Gan to dữ dội, hạ đường huyết nặng khi đói, tăng toan lactic máu và tăng acid uric."
      ],
      relatedLabTests: ["Định lượng hoạt độ men G6PD", "Glucose máu đói & sau ăn", "HbA1c", "Lactate"]
    },
    {
      id: "topic-15",
      blockId: "block-4",
      order: 15,
      code: "MET-02",
      title: "Chuyển Hóa Lipid & Rối Loạn Lipoprotein Máu",
      slug: "chuyen-hoa-lipid",
      badge: "Chuyển hóa",
      tags: ["β-oxy hóa", "Thể Ceton", "Cholesterol", "Lipoprotein", "Statin", "DKA"],
      overview: "Vận chuyển qua con thoi Carnitine & 4 phản ứng vòng xoắn β-oxy hóa; Sinh tổng hợp & thoái hóa Thể Ceton (DKA); Tổng hợp Acid béo qua FAS; Sinh tổng hợp Cholesterol; Chuyển hóa Chylomicron, VLDL, LDL, HDL.",
      keyReactions: ["Palmitate (16C) qua 7 vòng β-oxy hóa tạo 8 Acetyl-CoA + 7 NADH + 7 FADH2 = 106 ATP.", "HMG-CoA --(HMG-CoA Reductase)--> Mevalonate."],
      clinicalPearls: [
        "Nhiễm toan Ceton đái tháo đường (DKA): Thiếu hụt Insulin tuyệt đối kích hoạt ly giải mô mỡ quá mức, gan chuyển lượng lớn acid béo thành Thể Ceton (Acetoacetate, β-hydroxybutyrate) gây toan chuyển hóa Anion Gap cao.",
        "Thuốc hạ mỡ máu Statin ức chế cạnh tranh men HMG-CoA Reductase, giảm tổng hợp cholesterol nội sinh và kích thích tăng biểu hiện thụ thể LDL receptor ở màng tế bào gan."
      ],
      relatedLabTests: ["Bilan Lipid (TC, TG, LDL-C, HDL-C, Non-HDL-C)", "Thể Ceton máu (β-hydroxybutyrate) & nước tiểu"]
    },
    {
      id: "topic-16",
      blockId: "block-4",
      order: 16,
      code: "MET-03",
      title: "Chuyển Hóa Protid, Acid Amin & Chu Trình Ure",
      slug: "chuyen-hoa-protid",
      badge: "Chuyển hóa",
      tags: ["Chu trình Ure", "Amoniac", "AST/ALT", "Phenylketonuria", "Bệnh não gan"],
      overview: "Thoái hóa chung acid amin (Chuyển amin qua AST/ALT, Khử amin oxy hóa qua GDH); Vận chuyển NH3 dạng Glutamin; 5 phản ứng chu trình Ure ở gan; Chuyển hóa chuyên biệt (Phenylalanin, Tyrosin, Tryptophan, Histidin).",
      keyReactions: ["Glutamate + Oxaloacetate --(AST)--> α-Ketoglutarate + Aspartate", "NH3 + CO2 + 2 ATP --(CPS-I)--> Carbamoyl Phosphate"],
      clinicalPearls: [
        "Suy tế bào gan nặng hoặc thông nối cửa-chủ làm giảm khả năng khử độc NH3 qua chu trình Ure, gây tăng Amoniac máu và phù tế bào hình sao dẫn đến Bệnh não gan (Hepatic Encephalopathy).",
        "Bệnh Phenylketonuria (PKU - thiếu men Phenylalanine Hydroxylase): Tích tụ phenylalanin gây chậm phát triển trí tuệ nặng nề ở trẻ nếu không sàng lọc sơ sinh và kiêng ăn sớm."
      ],
      relatedLabTests: ["Amoniac máu (NH3)", "Ure máu (BUN)", "AST (GOT), ALT (GPT)", "Sàng lọc sơ sinh PKU"]
    },
    {
      id: "topic-17",
      blockId: "block-4",
      order: 17,
      code: "MET-04",
      title: "Chuyển Hóa Hemoglobin, Sắc Tố Mật & Vàng Da",
      slug: "chuyen-hoa-hemoglobin-bilirubin",
      badge: "Chuyển hóa",
      tags: ["Hemoglobin", "Heme", "Bilirubin", "Vàng da", "Gilbert", "Tắc mật"],
      overview: "Sinh tổng hợp Heme (ALA Synthase); Thoái hóa Hb tại hệ võng nội mô tạo Bilirubin tự do (gián tiếp); Liên hợp với acid glucuronic tại gan (UGT1A1); Bài tiết qua mật và tạo Urobilinogen / Stercobilin.",
      keyReactions: ["Succinyl-CoA + Glycine --(ALA Synthase)--> δ-Aminolevulinic acid (ALA)", "Bilirubin + 2 UDP-Glucuronic acid --(UGT1A1)--> Bilirubin Diglucuronide"],
      clinicalPearls: [
        "Vàng da trước gan (Tán huyết): Tăng chủ yếu Bilirubin gián tiếp, Urobilinogen nước tiểu tăng, phân sẫm màu, nước tiểu không có Bilirubin.",
        "Vàng da sau gan (Tắc mật): Tăng vọt Bilirubin trực tiếp, nước tiểu vàng sẫm như nước vối (Bilirubin niệu dương tính), phân bạc màu như phân cò."
      ],
      relatedLabTests: ["Bilirubin toàn phần, trực tiếp, gián tiếp", "Bilirubin & Urobilinogen nước tiểu", "ALP, GGT"]
    },
    {
      id: "topic-18",
      blockId: "block-4",
      order: 18,
      code: "MET-05",
      title: "Chuyển Hóa Nucleotid, Acid Uric & Bệnh Gout",
      slug: "chuyen-hoa-nucleotid-gout",
      badge: "Chuyển hóa",
      tags: ["Acid Uric", "Purin", "Bệnh Gout", "Allopurinol", "Xanthine Oxidase"],
      overview: "Thoái hóa base Purin (Adenin/Guanin) thành Acid Uric nhờ enzym Xanthine Oxidase; Thoái hóa Pyrimidin; Sinh tổng hợp Purin/Pyrimidin theo con đường De novo và Tái sử dụng (Salvage pathway qua HGPRT).",
      keyReactions: ["Hypoxanthine --(Xanthine Oxidase)--> Xanthine --(Xanthine Oxidase)--> Acid Uric", "PRPP + Glutamine --(PRPP Amidotransferase)--> 5-Phosphoribosylamine"],
      clinicalPearls: [
        "Khi acid uric máu vượt ngưỡng bão hòa (> 6.8 mg/dL hay 400 µmol/L), tinh thể Monosodium Urat lắng đọng tại màng hoạt dịch khớp ngón chân cái gây cơn Gout cấp dữ dội.",
        "Thuốc Allopurinol và Febuxostat ức chế chọn lọc enzym Xanthine Oxidase, giảm sản xuất acid uric trong điều trị hạ acid uric máu lâu dài."
      ],
      relatedLabTests: ["Acid Uric huyết thanh", "Soi tìm tinh thể Urat dịch khớp", "Acid Uric niệu 24h"]
    },

    // --- KHỐI 5 ---
    {
      id: "topic-19",
      blockId: "block-5",
      order: 19,
      code: "MOL-01",
      title: "Tái Bản DNA & Các Cơ Chế Sửa Sai",
      slug: "tai-ban-sua-sai-dna",
      badge: "Phân tử",
      tags: ["Nhân đôi DNA", "Helicase", "DNA Polymerase", "Sửa sai", "Ung thư", "Telomere"],
      overview: "Cơ chế bán bảo tồn của quá trình tái bản DNA; Chạc tái bản, đoạn Okazaki; Hoạt tính đọc sửa exonuclease 3'→5'; Các hệ thống sửa sai (BER, NER, Mismatch Repair MMR, Sửa đứt gãy sợi đôi NHEJ/HR).",
      keyReactions: ["Kéo dài chuỗi DNA theo chiều 5'→3' bởi DNA Polymerase.", "Sửa sai bắt cặp chệch (MMR) nhận diện và cắt bỏ base lỗi."],
      clinicalPearls: [
        "Đột biến gen sửa sai ghép lệch (MMR: MSH2, MLH1) gây tính bất ổn vi vệ tinh (MSI-H) và hội chứng Lynch (Ung thư đại trực tràng di truyền không polyp).",
        "Khiếm khuyết hệ thống cắt sửa nucleotide (NER) khiến tế bào không sửa được tổn thương do tia UV, gây bệnh Khô da sắc tố (Xeroderma Pigmentosum)."
      ],
      relatedLabTests: ["Xét nghiệm MSI / MMR trong mô ung thư", "Đột biến gen BRCA1/BRCA2"]
    },
    {
      id: "topic-20",
      blockId: "block-5",
      order: 20,
      code: "MOL-02",
      title: "Phiên Mã & Xử Lý Sau Phiên Mã",
      slug: "phien-ma-bieu-hien-gen",
      badge: "Phân tử",
      tags: ["Phiên mã", "RNA Polymerase", "Cắt nối Splicing", "Biểu hiện gen", "Epigenetics"],
      overview: "Quá trình phiên mã tạo RNA bởi RNA Polymerase; Cấu trúc Promoter, Enhancer; Xử lý tiền mRNA (Gắn mũ 5' Cap, Đuôi Poly-A 3', Cắt nối Intron Splicing); Điều hòa biểu hiện gen & Di truyền biểu sinh.",
      keyReactions: ["Tổng hợp RNA theo chiều 5'→3' bổ sung với mạch khuôn DNA 3'→5'.", "Cắt bỏ Intron và nối Exon nhờ phức hợp Spliceosome."],
      clinicalPearls: [
        "Đột biến tại các vị trí nhận diện cắt nối (Splice site mutations) tạo ra các phân tử mRNA bất thường, là nguyên nhân phổ biến của bệnh β-Thalassemia thể nặng.",
        "Thuốc kháng sinh Rifampicin ức chế chọn lọc RNA Polymerase của vi khuẩn, là trụ cột trong phác đồ điều trị Lao."
      ],
      relatedLabTests: ["Định lượng biểu hiện gen", "Xét nghiệm RT-PCR Lao (GeneXpert)"]
    },
    {
      id: "topic-21",
      blockId: "block-5",
      order: 21,
      code: "MOL-03",
      title: "Mã Di Truyền, Dịch Mã & Các Loại Đột Biến Gen",
      slug: "dich-ma-dot-bien-gen",
      badge: "Phân tử",
      tags: ["Dịch mã", "Ribosome", "Mã di truyền", "Đột biến điểm", "Kháng sinh"],
      overview: "Bộ ba mã di truyền (Codon), tính thoái hóa; Cấu trúc và hoạt hóa tRNA; 3 giai đoạn dịch mã tại Ribosome (Khởi đầu, Kéo dài, Kết thúc); Phân loại đột biến gen (Missense, Nonsense, Frameshift).",
      keyReactions: ["Amino acid + tRNA + ATP --(Synthetase)--> Aminoacyl-tRNA + AMP + PPi", "Hình thành liên kết peptid tại trung tâm Peptidyl Transferase của Ribosome."],
      clinicalPearls: [
        "Nhiều kháng sinh diệt khuẩn tác động bằng cách ức chế chọn lọc Ribosome vi khuẩn: Aminoglycoside (gắn tiểu phần 30S đọc sai mã), Macrolide & Clindamycin (gắn tiểu phần 50S chặn chuyển vị).",
        "Đột biến mất 3 nucleotide (ΔF508) làm mất acid amin Phenylalanine là nguyên nhân hàng đầu gây bệnh Xơ nang."
      ],
      relatedLabTests: ["Giải trình tự gen đột biến", "Kháng sinh đồ"]
    },
    {
      id: "topic-22",
      blockId: "block-5",
      order: 22,
      code: "MOL-04",
      title: "Kỹ Thuật Sinh Học Phân Tử Y Học (PCR, Real-time qPCR, NGS)",
      slug: "ky-thuat-pcr-ngs",
      badge: "Công nghệ",
      tags: ["PCR", "Real-time PCR", "NGS", "Tải lượng virus", "Điều trị đích"],
      overview: "Nguyên lý phản ứng PCR cổ điển (Biến tính, Bắt cặp, Kéo dài); Real-time qPCR đo huỳnh quang (TaqMan probe); Giải trình tự gen Sanger và NGS thế hệ mới; Công nghệ CRISPR-Cas9.",
      keyReactions: ["Khuếch đại hàm số mũ lượng DNA: N = N0 * 2^n qua n chu kỳ nhiệt."],
      clinicalPearls: [
        "Real-time RT-qPCR là tiêu chuẩn vàng theo dõi đáp ứng điều trị viêm gan B, C và HIV qua định lượng tải lượng virus trong máu.",
        "Giải trình tự NGS đa gen giúp phát hiện các đột biến trúng đích (EGFR, ALK, KRAS, BRAF V600E) để lựa chọn thuốc ức chế Tyrosine Kinase trong ung thư học cá thể hóa."
      ],
      relatedLabTests: ["HBV-DNA / HCV-RNA TaqMan", "Panel NGS đột biến khối u (Solid Tumor NGS Panel)"]
    },

    // --- KHỐI 6 ---
    {
      id: "topic-23",
      blockId: "block-6",
      order: 23,
      code: "ORG-01",
      title: "Tích Hợp & Điều Hòa Chuyển Hóa Toàn Thân",
      slug: "tich-hop-dieu-hoa-chuyen-hoa",
      badge: "Tích hợp",
      tags: ["Trạng thái No", "Trạng thái Đói", "Hội chứng chuyển hóa", "Refeeding Syndrome"],
      overview: "Mối liên kết giữa 3 ngã ba chuyển hóa (G6P, Pyruvate, Acetyl-CoA); Động học chuyển hóa ở trạng thái No (Well-fed), Đói sớm (Fasting), Đói kéo dài (Starvation); Phân công chuyển hóa giữa các cơ quan.",
      keyReactions: ["Trạng thái đói kéo dài: Mô mỡ ly giải FA --> Gan tạo Thể Ceton --> Não thích nghi sử dụng Ceton làm năng lượng."],
      clinicalPearls: [
        "Hội chứng nuôi ăn lại (Refeeding Syndrome): Cho ăn carbohydrate quá nhanh ở bệnh nhân suy dinh dưỡng nặng gây giải phóng ồ ạt Insulin, đẩy nhanh Kali, Magie và đặc biệt Phosphat vào nội bào gây suy tim cấp, loạn nhịp và ngừng thở.",
        "Gan là cơ quan trung tâm chuyển hóa: Tổng hợp thể ceton nhưng không có enzym Thiophorase nên không tự sử dụng được thể ceton."
      ],
      relatedLabTests: ["Phosphat máu", "Điện giải đồ", "Glucose máu liên tục"]
    },
    {
      id: "topic-24",
      blockId: "block-6",
      order: 24,
      code: "ORG-02",
      title: "Hóa Sinh Máu, Huyết Tương & Dòng Thác Đông Máu",
      slug: "hoa-sinh-mau-dong-mau",
      badge: "Cơ quan",
      tags: ["Đông máu", "Fibrinogen", "Albumin", "D-Dimer", "Hồng cầu"],
      overview: "Protein huyết tương (Albumin tạo áp suất keo, Globulin miễn dịch); Chuyển hóa đặc thù của Hồng cầu (Thiếu ty thể, hoàn toàn phụ thuộc đường phân kỵ khí); Dòng thác đông máu nội sinh/ngoại sinh và hệ thống tiêu sợi huyết.",
      keyReactions: ["Prothrombin (II) --(Xa + Va + Ca2+)--> Thrombin (IIa)", "Fibrinogen (I) --(Thrombin)--> Fibrin (Ia) tạo mạng lưới cục máu đông."],
      clinicalPearls: [
        "D-Dimer là sản phẩm thoái hóa của Fibrin đã trùng ngưng liên kết chéo; nồng độ D-Dimer bình thường có giá trị dự báo âm tính rất cao để loại trừ Thuyên tắc phổi (PE) và Huyết khối tĩnh mạch sâu (DVT).",
        "Thuốc chống đông kháng Vitamin K (Warfarin) ức chế enzym VKORC1, ngăn chặn sự hoạt hóa của các yếu tố II, VII, IX, X."
      ],
      relatedLabTests: ["PT (INR)", "aPTT", "Fibrinogen", "D-Dimer", "Albumin huyết thanh"]
    },
    {
      id: "topic-25",
      blockId: "block-6",
      order: 25,
      code: "ORG-03",
      title: "Hóa Sinh Gan, Cơ, Thận & Khung Ngoại Bào (ECM)",
      slug: "hoa-sinh-gan-co-ecm",
      badge: "Cơ quan",
      tags: ["Khử độc Gan", "Cytochrome P450", "Collagen", "Phosphocreatine", "Chuyển hóa Xương"],
      overview: "Chức năng khử độc của Gan qua hệ Cytochrome P450 (Pha 1 oxy hóa, Pha 2 liên hợp); Hóa sinh co cơ actin-myosin và chu trình năng lượng phosphocreatine; Khung ngoại bào ECM (Collagen, Elastin, Laminin); Chuyển hóa khoáng xương (Calci, Phosphat, PTH, Calcitonin).",
      keyReactions: ["Pha 1: Xenobiotic + O2 + NADPH --(CYP450)--> Xenobiotic-OH + NADP+ + H2O", "Pha 2: Liên hợp với Glucuronic acid, Glutathione hoặc Sulfat."],
      clinicalPearls: [
        "Ngộ độc Paracetamol liều cao: Quá tải pha 2 làm tích tụ chất chuyển hóa độc NAPQI ở pha 1, làm cạn kiệt Glutathione tế bào gan dẫn đến hoại tử gan ồ ạt; giải độc đặc hiệu bằng N-acetylcysteine (NAC) để bổ sung Glutathione.",
        "Thiếu hụt Vitamin C ngăn cản quá trình hydroxyl hóa Proline và Lysine trong chuỗi Collagen, gây vỡ mao mạch và chảy máu chân răng trong bệnh Scurvy."
      ],
      relatedLabTests: ["N-acetylcysteine protocol", "Calci ion hóa", "Phosphatase kiềm xương", "Định lượng nồng độ Paracetamol máu"]
    },

    // --- KHỐI 7 ---
    {
      id: "topic-26",
      blockId: "block-7",
      order: 26,
      code: "LAB-01",
      title: "Biện Luận Xét Nghiệm Chức Năng Gan & Bệnh Lý Gan Mật",
      slug: "bien-luan-chuc-nang-gan",
      badge: "Lâm sàng",
      tags: ["LFTs", "AST/ALT", "GGT", "ALP", "Bilirubin", "Suy gan", "Tắc mật"],
      overview: "Phân tích và biện luận chuyên sâu bộ xét nghiệm LFTs: Nhóm hoại tử tế bào gan (AST, ALT, tỷ số De Ritis), Nhóm ứ mật tắc mật (GGT, ALP, Bilirubin), Nhóm chức năng tổng hợp (Albumin, PT/INR, Cholesterol).",
      keyReactions: ["Tỷ số De Ritis (AST/ALT) > 2 gợi ý mạnh viêm gan do rượu hoặc xơ gan tiến triển."],
      clinicalPearls: [
        "Men ALT đặc hiệu cho tổn thương gan hơn AST (vì AST còn hiện diện nhiều ở cơ tim, cơ vân và hồng cầu).",
        "Trong tắc mật cấp, ALP và GGT tăng đồng thời; nếu ALP tăng đơn độc cần tầm soát bệnh lý hủy xương hoặc sinh lý thai kỳ."
      ],
      relatedLabTests: ["AST, ALT", "GGT, ALP", "Bilirubin toàn phần / trực tiếp", "Albumin", "PT/INR"]
    },
    {
      id: "topic-27",
      blockId: "block-7",
      order: 27,
      code: "LAB-02",
      title: "Thăm Dò Chức Năng Thận & Tổng Phân Tích Nước Tiểu",
      slug: "bien-luan-chuc-nang-than",
      badge: "Lâm sàng",
      tags: ["eGFR", "Creatinine", "uACR", "AKI", "CKD", "Tổng phân tích nước tiểu"],
      overview: "Động học Creatinine huyết thanh, công thức ước tính độ lọc cầu thận eGFR (CKD-EPI 2021, Cockcroft-Gault); Giá trị của Cystatin C; Phân loại AKI (KDIGO) vs CKD; Tổng phân tích nước tiểu 10 thông số và tỷ lệ uACR.",
      keyReactions: ["Công thức CKD-EPI tính eGFR dựa trên Creatinine máu, tuổi và giới tính."],
      clinicalPearls: [
        "Creatinine máu tăng chậm hơn độ sụt giảm thực tế của GFR (mất > 50% chức năng thận thì Creatinine mới bắt đầu tăng rõ rệt).",
        "Tỷ lệ uACR (Albumin/Creatinine niệu) là xét nghiệm nhạy nhất phát hiện sớm tổn thương cầu thận đái tháo đường khi que thử nước tiểu thông thường còn âm tính."
      ],
      relatedLabTests: ["Creatinine huyết thanh", "eGFR CKD-EPI", "Cystatin C", "uACR", "Tổng phân tích nước tiểu (10 thông số)"]
    },
    {
      id: "topic-28",
      blockId: "block-7",
      order: 28,
      code: "LAB-03",
      title: "Dấu Ấn Sinh Học Tim Mạch (Troponin hs, BNP & Lipid Tim Mạch)",
      slug: "dau-an-tim-mach-troponin-bnp",
      badge: "Lâm sàng",
      tags: ["Troponin hs", "NT-proBNP", "Nhồi máu cơ tim", "Suy tim", "Non-HDL-C"],
      overview: "Động học giải phóng Troponin tim siêu nhạy (hs-cTnT / hs-cTnI) trong nhồi máu cơ tim cấp theo phác đồ ESC 0/1h hoặc 0/2h; Peptid lợi niệu BNP / NT-proBNP trong chẩn đoán suy tim; Đánh giá nguy cơ xơ vữa qua Non-HDL-C và ApoB.",
      keyReactions: ["proBNP --(Corin)--> BNP (hoạt tính) + NT-proBNP (trơ, bán thải dài)."],
      clinicalPearls: [
        "Nồng độ Troponin hs tăng động học (delta tăng/giảm rõ rệt sau 1-2h) giúp phân biệt tổn thương cơ tim cấp (AMI) với tăng Troponin mạn tính ở bệnh nhân suy thận mạn.",
        "NT-proBNP có điểm cắt loại trừ suy tim cấp < 300 pg/mL với giá trị dự báo âm tính lên đến 98%."
      ],
      relatedLabTests: ["hs-cTnT / hs-cTnI", "NT-proBNP / BNP", "Bilan lipid toàn diện", "hs-CRP"]
    },
    {
      id: "topic-29",
      blockId: "block-7",
      order: 29,
      code: "LAB-04",
      title: "Rối Loạn Điện Giải & Toan Kiềm Lâm Sàng (ABG Studio)",
      slug: "dien-giai-toan-kiem-abg",
      badge: "Lâm sàng",
      tags: ["ABG", "Hạ Natri máu", "Tăng Kali máu", "Anion Gap", "Toan chuyển hóa"],
      overview: "Tiếp cận hạ/tăng Natri máu theo áp lực thẩm thấu; Xử trí cấp cứu tăng Kali máu; Biện luận khí máu động mạch (ABG) 6 bước: Đánh giá toan/kiềm, hô hấp/chuyển hóa, Anion Gap huyết tương và Delta Gap (Δ/Δ).",
      keyReactions: ["Anion Gap (AG) = [Na+] - ([Cl-] + [HCO3-]) (Bình thường 12 ± 2 mEq/L)", "Delta Gap = (AG - 12) / (24 - [HCO3-])"],
      clinicalPearls: [
        "Hạ Natri máu mạn tính bắt buộc bù Natri chậm (< 8-10 mmol/L trong 24h) để tránh biến chứng hủy myelin cầu não trung tâm (CPM).",
        "Toan chuyển hóa tăng Anion Gap (MUDPILES: Methanol, Uremia, DKA, Paraldehyde, Isoniazid/Iron, Lactic acidosis, Ethanol, Salicylates)."
      ],
      relatedLabTests: ["Khí máu động mạch (pH, PaCO2, PaO2, HCO3-)", "Điện giải đồ máu & niệu", "Áp lực thẩm thấu máu & niệu"]
    },
    {
      id: "topic-30",
      blockId: "block-7",
      order: 30,
      code: "LAB-05",
      title: "Thăm Dò Chức Năng Nội Tiết (Trục Giáp, Thượng Thận & Tuyến Yên)",
      slug: "tham-do-noi-tiet-tsh-cortisol",
      badge: "Lâm sàng",
      tags: ["TSH", "FT4", "Cortisol", "Cushing", "Suy thượng thận", "HbA1c"],
      overview: "Đánh giá trục Tuyến yên - Giáp (TSH, FT4, FT3) trong Cường giáp / Suy giáp; Đánh giá trục Thượng thận (Cortisol sáng, ACTH, Nghiệm pháp ức chế Dexamethasone liều thấp/cao); Chẩn đoán và theo dõi Đái tháo đường (HbA1c, OGTT, C-peptide).",
      keyReactions: ["Feedback âm tính: FT4/FT3 tăng ức chế tiết TSH tuyến yên và TRH vùng dưới đồi."],
      clinicalPearls: [
        "TSH là xét nghiệm nhạy nhất sàng lọc rối loạn chức năng tuyến giáp; nồng độ TSH thay đổi theo hàm số mũ nghịch đảo với nồng độ FT4.",
        "Nghiệm pháp ức chế Dexamethasone 1mg qua đêm là xét nghiệm đầu tay sàng lọc Hội chứng Cushing (nếu Cortisol sáng hôm sau > 1.8 µg/dL là không bị ức chế)."
      ],
      relatedLabTests: ["TSH, FT4, FT3", "Cortisol máu 8h sáng / 20h", "ACTH", "HbA1c", "C-peptide"]
    },
    {
      id: "topic-31",
      blockId: "block-7",
      order: 31,
      code: "LAB-06",
      title: "Dấu Ấn Ung Thư (Tumor Markers) & Phân Tích Dịch Sinh Học",
      slug: "dau-an-ung-thu-dich-sinh-hoc",
      badge: "Lâm sàng",
      tags: ["Tumor Marker", "CEA", "AFP", "CA 19-9", "Dịch màng phổi", "Dịch não tủy CSF", "Light"],
      overview: "Chỉ định & giá trị theo dõi của các Dấu ấn Ung thư (CEA, AFP, CA 19-9, CA 125, PSA); Tiêu chuẩn Light phân biệt dịch thấm - dịch tiết màng phổi; Phân tích độ chênh Albumin huyết thanh - dịch báng (SAAG); Hóa sinh Dịch não tủy (CSF).",
      keyReactions: ["Tiêu chuẩn Light: Protein dịch/huyết thanh > 0.5 HOẶC LDH dịch/huyết thanh > 0.6 HOẶC LDH dịch > 2/3 giới hạn trên LDH máu bình thường => Dịch tiết (Exudate)."],
      clinicalPearls: [
        "Các Tumor Marker (ngoại trừ PSA và AFP trong bối cảnh nguy cơ cao) KHÔNG được dùng để sàng lọc ung thư đại trà ở người khỏe mạnh, mà chủ yếu dùng để theo dõi đáp ứng điều trị và phát hiện tái phát sớm.",
        "Độ chênh Albumin huyết thanh - dịch màng bụng (SAAG) ≥ 1.1 g/dL chứng minh dịch báng do Tăng áp lực tĩnh mạch cửa (xơ gan, suy tim, hội chứng Budd-Chiari)."
      ],
      relatedLabTests: ["AFP, CEA, CA 19-9, CA 125, PSA", "Sinh hóa Dịch màng phổi / Dịch màng bụng (Protein, LDH, SAAG)", "Sinh hóa Dịch não tủy (Protein, Glucose, Lactate)"]
    }
  ],

  // Các con đường chuyển hóa trung tâm (Quick Interactive Pathways)
  metabolicPathways: [
    {
      id: "pathway-krebs",
      name: "Chu trình Krebs (Citric Acid Cycle)",
      shortDesc: "Vòng oxy hóa Acetyl-CoA tạo NADH, FADH2 & GTP trong chất nền ty thể",
      topicId: "topic-12",
      icon: "fa-circle-notch",
      color: "#f59e0b",
      stepsCount: 8,
      keyEnzymes: ["Citrate Synthase", "Isocitrate Dehydrogenase", "α-Ketoglutarate Dehydrogenase"]
    },
    {
      id: "pathway-glycolysis",
      name: "Con đường Đường phân (Glycolysis)",
      shortDesc: "Thoái hóa Glucose thành Pyruvate/Lactate sinh ATP bào tương",
      topicId: "topic-14",
      icon: "fa-cubes",
      color: "#10b981",
      stepsCount: 10,
      keyEnzymes: ["Hexokinase", "Phosphofructokinase-1 (PFK-1)", "Pyruvate Kinase"]
    },
    {
      id: "pathway-beta-ox",
      name: "Vòng xoắn β-Oxy Hóa Acid Béo",
      shortDesc: "Cắt ngắn từng đoạn 2C sinh năng lượng dồi dào trong ty thể",
      topicId: "topic-15",
      icon: "fa-fire",
      color: "#ef4444",
      stepsCount: 4,
      keyEnzymes: ["Carnitine Palmitoyltransferase-1", "Acyl-CoA Dehydrogenase", "Thiolase"]
    },
    {
      id: "pathway-urea",
      name: "Chu trình Ure (Urea Cycle)",
      shortDesc: "Khử độc khí Amoniac NH3 thành Ure đào thải qua thận",
      topicId: "topic-16",
      icon: "fa-arrows-rotate",
      color: "#8b5cf6",
      stepsCount: 5,
      keyEnzymes: ["Carbamoyl Phosphate Synthetase I", "Ornithine Transcarbamylase", "Arginase"]
    },
    {
      id: "pathway-bilirubin",
      name: "Chuyển hóa Heme & Bilirubin",
      shortDesc: "Thoái hóa vòng Heme hồng cầu thành Bilirubin liên hợp tại gan",
      topicId: "topic-17",
      icon: "fa-droplet",
      color: "#eab308",
      stepsCount: 6,
      keyEnzymes: ["Heme Oxygenase", "Biliverdin Reductase", "UGT1A1"]
    },
    {
      id: "pathway-purine",
      name: "Thoái hóa Purin & Tạo Acid Uric",
      shortDesc: "Thoái biến Adenin/Guanin thành Acid Uric liên quan bệnh Gout",
      topicId: "topic-18",
      icon: "fa-dna",
      color: "#ec4899",
      stepsCount: 5,
      keyEnzymes: ["Adenosine Deaminase (ADA)", "Xanthine Oxidase", "HGPRT"]
    }
  ]
};
