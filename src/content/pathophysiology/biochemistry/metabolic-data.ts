/**
 * CliniPortal 2.0 — Interactive Metabolic Pathways Knowledge Base
 * Path: src/content/pathophysiology/biochemistry/metabolic-data.ts
 */

export interface MetabolicNode {
  id: string;
  name: string;
  chemicalName?: string;
  type: 'substrate' | 'enzyme' | 'product' | 'pathway_cross';
  x: number;
  y: number;
  width?: number;
  height?: number;
  color?: string;
  description: string;
  cofactors?: string[];
  regulators?: {
    activators?: string[];
    inhibitors?: string[];
  };
  clinicalPharmacology?: string;
  inbornErrors?: {
    disease: string;
    inheritance?: string;
    features: string;
  }[];
  labMarkers?: string[];
}

export interface PathwayMap {
  id: string;
  title: string;
  icon: string;
  subtitle: string;
  viewBox: string;
  nodes: MetabolicNode[];
  edges: {
    from: string;
    to: string;
    label?: string;
    dashed?: boolean;
    color?: string;
  }[];
}

export const METABOLIC_PATHWAYS: Record<string, PathwayMap> = {
  glycolysis: {
    id: 'glycolysis',
    title: 'Đường Phân & Tân Tạo Đường',
    icon: 'fa-cubes-stacked',
    subtitle: 'Glycolysis & Gluconeogenesis — Trục chuyển hóa carbohydrate trung tâm',
    viewBox: '0 0 900 620',
    nodes: [
      {
        id: 'glucose',
        name: 'Glucose (Máu)',
        type: 'substrate',
        x: 450,
        y: 40,
        color: '#0284c7',
        description: 'Phân tử đường đơn chính cung cấp năng lượng cho mô não, hồng cầu và cơ xương.',
        labMarkers: ['Đường huyết đói (Fasting Glucose)', 'HbA1c', 'Nghiệm pháp OGTT']
      },
      {
        id: 'hexokinase',
        name: 'Hexokinase / Glucokinase',
        type: 'enzyme',
        x: 450,
        y: 110,
        color: '#8b5cf6',
        description: 'Phosphoryl hóa Glucose thành G6P để giữ glucose trong nội bào. Glucokinase (tại Gan & Tế bào Beta tụy) có Km cao và không bị ức chế bởi G6P.',
        cofactors: ['Mg2+', 'ATP'],
        regulators: {
          activators: ['Insulin (kích thích sao chép Glucokinase)'],
          inhibitors: ['Glucose-6-Phosphate (ức chế Hexokinase I-III)']
        },
        inbornErrors: [
          {
            disease: 'MODY 2 (Maturity-Onset Diabetes of the Young)',
            inheritance: 'Trội NST thường',
            features: 'Đột biến bất hoạt Glucokinase làm tăng ngưỡng tiết Insulin ➔ Tăng đường huyết nhẹ mạn tính.'
          }
        ],
        clinicalPharmacology: 'Glucokinase activators (Dorzagliatin) đang được phát triển để hạ đường huyết ĐTĐ type 2.'
      },
      {
        id: 'g6p',
        name: 'Glucose-6-Phosphate (G6P)',
        type: 'substrate',
        x: 450,
        y: 180,
        color: '#0284c7',
        description: 'Ngã tư chuyển hóa: có thể đi vào Đường phân, Con đường Pentose Phosphate (HMP Shunt), hoặc Tổng hợp Glycogen.'
      },
      {
        id: 'pfk1',
        name: 'Phosphofructokinase-1 (PFK-1)',
        type: 'enzyme',
        x: 450,
        y: 260,
        color: '#ef4444',
        description: 'Enzyme giới hạn tốc độ chính (Rate-limiting enzyme) của toàn bộ con đường đường phân.',
        cofactors: ['Mg2+', 'ATP'],
        regulators: {
          activators: ['AMP', 'Fructose-2,6-bisphosphate (F-2,6-BP do PFK-2 tạo ra dưới kích thích của Insulin)'],
          inhibitors: ['ATP', 'Citrate (từ chu trình Krebs)', 'Glucagon (thông qua PKA)']
        },
        inbornErrors: [
          {
            disease: 'Bệnh Tarui (Glycogen Storage Disease Type VII)',
            inheritance: 'Lặn NST thường',
            features: 'Thiếu PFK-1 ở cơ ➔ Mệt mỏi khi gắng sức, đau cơ, myoglobin niệu, tán huyết.'
          }
        ],
        clinicalPharmacology: 'Tỷ lệ F-2,6-BP được điều hòa bởi enzym lưỡng chức năng PFK-2/FBPase-2 chịu ảnh hưởng đối kháng Insulin/Glucagon.'
      },
      {
        id: 'f16bp',
        name: 'Fructose-1,6-Bisphosphate',
        type: 'substrate',
        x: 450,
        y: 330,
        color: '#0284c7',
        description: 'Sản phẩm phản ứng do PFK-1 xúc tác, phân cắt bởi Aldolase thành DHAP và G3P.'
      },
      {
        id: 'pep',
        name: 'Phosphoenolpyruvate (PEP)',
        type: 'substrate',
        x: 450,
        y: 410,
        color: '#0284c7',
        description: 'Hợp chất giàu năng lượng cao trong đường phân, chuyển nhóm phosphate cho ADP tạo ATP.'
      },
      {
        id: 'pyruvate_kinase',
        name: 'Pyruvate Kinase (PK)',
        type: 'enzyme',
        x: 450,
        y: 480,
        color: '#8b5cf6',
        description: 'Chuyển PEP thành Pyruvate, tạo 1 ATP. Được điều hòa thuận chiều bởi F-1,6-BP (Feedforward activation).',
        cofactors: ['Mg2+', 'K+'],
        regulators: {
          activators: ['Fructose-1,6-bisphosphate'],
          inhibitors: ['ATP', 'Alanine', 'Glucagon (phosphoryl hóa ức chế PK ở gan)']
        },
        inbornErrors: [
          {
            disease: 'Thiếu men Pyruvate Kinase (PK Deficiency)',
            inheritance: 'Lặn NST thường',
            features: 'Nguyên nhân thiếu máu tán huyết không do miễn dịch phổ biến thứ 2 (sau G6PD). Hồng cầu không tạo đủ ATP để duy trì bơm Na+/K+ ATPase ➔ Biến dạng và vỡ hồng cầu.'
          }
        ],
        labMarkers: ['Bilirubin gián tiếp tăng', 'Haptoglobin giảm', 'Reticulocyte tăng']
      },
      {
        id: 'pyruvate',
        name: 'Pyruvate',
        type: 'product',
        x: 450,
        y: 560,
        color: '#10b981',
        description: 'Sản phẩm cuối của đường phân ái khí. Đi vào ti thể chuyển thành Acetyl-CoA hoặc chuyển thành Lactate trong điều kiện yếm khí.',
        labMarkers: ['Lactate máu (Shock/Sepsis)', 'Tỷ lệ Lactate/Pyruvate']
      }
    ],
    edges: [
      { from: 'glucose', to: 'hexokinase' },
      { from: 'hexokinase', to: 'g6p' },
      { from: 'g6p', to: 'pfk1' },
      { from: 'pfk1', to: 'f16bp' },
      { from: 'f16bp', to: 'pep' },
      { from: 'pep', to: 'pyruvate_kinase' },
      { from: 'pyruvate_kinase', to: 'pyruvate' }
    ]
  },

  krebs_etc: {
    id: 'krebs_etc',
    title: 'Chu Trình Krebs & Chuỗi Hô Hấp',
    icon: 'fa-rotate',
    subtitle: 'TCA Cycle & Oxidative Phosphorylation — Cỗ máy sinh năng lượng ATP của tế bào',
    viewBox: '0 0 900 620',
    nodes: [
      {
        id: 'pdh_complex',
        name: 'Phức hợp Pyruvate Dehydrogenase (PDH)',
        type: 'enzyme',
        x: 450,
        y: 50,
        color: '#ef4444',
        description: 'Chuyển Pyruvate thành Acetyl-CoA trong chất nền ti thể. Cần 5 Coenzyme quan trọng: Thiamine pyrophosphate (B1), FAD (B2), NAD+ (B3), CoA (B5), Lipoic acid.',
        cofactors: ['Vitamin B1 (Thiamine)', 'Vitamin B2 (Riboflavin)', 'Vitamin B3 (Niacin)', 'Vitamin B5 (Pantothenate)', 'Lipoic Acid'],
        regulators: {
          activators: ['ADP', 'Pyruvate', 'Ca2+ (khi co cơ/hoạt hóa thần kinh)'],
          inhibitors: ['ATP', 'Acetyl-CoA', 'NADH']
        },
        inbornErrors: [
          {
            disease: 'Hội chứng Thiếu hụt PDH & Thiếu Thiamine (Beriberi/Wernicke-Korsakoff)',
            inheritance: 'Liên kết X hoặc NST thường',
            features: 'Ứ đọng Pyruvate bị chuyển thành Lactic acid ➔ Toan lactic nặng, tổn thương thần kinh trung ương và suy tim.'
          }
        ],
        clinicalPharmacology: 'Bệnh nhân nghiện rượu hoặc suy dinh dưỡng bắt buộc phải được bù Vitamin B1 (Thiamine) TRƯỚC KHI truyền Glucose để tránh thúc đẩy hôn mê Wernicke cấp.'
      },
      {
        id: 'acetyl_coa',
        name: 'Acetyl-CoA',
        type: 'substrate',
        x: 450,
        y: 130,
        color: '#0284c7',
        description: 'Điểm hội tụ của chuyển hóa Carbohydrate, Lipid ($\beta$-oxy hóa) và Protein. Đi vào chu trình Krebs kết hợp với Oxaloacetate.'
      },
      {
        id: 'citrate_synthase',
        name: 'Citrate Synthase',
        type: 'enzyme',
        x: 450,
        y: 200,
        color: '#8b5cf6',
        description: 'Ngưng tụ Acetyl-CoA và Oxaloacetate tạo Citrate. Bị ức chế bởi ATP, NADH, Citrate và Succinyl-CoA.'
      },
      {
        id: 'isocitrate_dh',
        name: 'Isocitrate Dehydrogenase',
        type: 'enzyme',
        x: 450,
        y: 280,
        color: '#ef4444',
        description: 'Enzyme giới hạn tốc độ chính của chu trình Krebs! Chuyển Isocitrate thành $\\alpha$-Ketoglutarate, tạo NADH và giải phóng CO2.',
        cofactors: ['NAD+', 'Mg2+'],
        regulators: {
          activators: ['ADP', 'Ca2+'],
          inhibitors: ['ATP', 'NADH']
        }
      },
      {
        id: 'complex_iv',
        name: 'Phức Hợp IV (Cytochrome c Oxidase)',
        type: 'enzyme',
        x: 250,
        y: 420,
        color: '#ef4444',
        description: 'Chuyển electron từ Cytochrome c sang O2 tạo H2O. Bơm proton qua màng trong ti thể tạo chênh lệch điện thế.',
        clinicalPharmacology: 'Bị ức chế trực tiếp bởi Cyanide ($CN^-$) và Carbon Monoxide ($CO$) ➔ Ngừng trệ hô hấp tế bào, toan lactic cực nặng và tử vong nhanh.'
      },
      {
        id: 'atp_synthase',
        name: 'ATP Synthase (Phức Hợp V)',
        type: 'enzyme',
        x: 650,
        y: 420,
        color: '#10b981',
        description: 'Sử dụng dòng proton $H^+$ chảy ngược vào chất nền ti thể để tổng hợp ATP từ ADP và Pi.',
        clinicalPharmacology: 'Oligomycin ức chế trực tiếp kênh Fo. Các chất làm mất ghép (Uncouplers: 2,4-Dinitrophenol, Aspirin liều độc) làm rò rỉ proton ➔ Tiêu tán năng lượng dưới dạng nhiệt (sốt cao ác tính).'
      }
    ],
    edges: [
      { from: 'pdh_complex', to: 'acetyl_coa' },
      { from: 'acetyl_coa', to: 'citrate_synthase' },
      { from: 'citrate_synthase', to: 'isocitrate_dh' }
    ]
  },

  glycogen_g6pd: {
    id: 'glycogen_g6pd',
    title: 'Chuyển Hóa Glycogen & Men G6PD',
    icon: 'fa-shield-halved',
    subtitle: 'Glycogen Storage & HMP Shunt — Dự trữ đường và bảo vệ chống oxy hóa hồng cầu',
    viewBox: '0 0 900 620',
    nodes: [
      {
        id: 'g6pd',
        name: 'Glucose-6-Phosphate Dehydrogenase (G6PD)',
        type: 'enzyme',
        x: 450,
        y: 80,
        color: '#ef4444',
        description: 'Enzyme giới hạn tốc độ con đường Pentose Phosphate (HMP Shunt). Tạo NADPH cần thiết để khử Glutathione bảo vệ hồng cầu chống các gốc oxy hóa tự do ($H_2O_2$).',
        regulators: {
          activators: ['NADP+'],
          inhibitors: ['NADPH']
        },
        inbornErrors: [
          {
            disease: 'Thiếu Men G6PD (G6PD Deficiency)',
            inheritance: 'Liên kết NST giới tính X',
            features: 'Bệnh di truyền enzym hồng cầu phổ biến nhất thế giới! Tiếp xúc với tác nhân oxy hóa (Đậu tằm Fava beans, Thuốc Primaquine, Dapsone, Sulfonamide, Nhiễm trùng) ➔ Thể Heinz, Bite cells và tán huyết nội mạch cấp.'
          }
        ],
        clinicalPharmacology: 'Tuyệt đối chống chỉ định dùng thuốc có tính oxy hóa cao ở người thiếu men G6PD.'
      },
      {
        id: 'glycogen_phosphorylase',
        name: 'Glycogen Phosphorylase',
        type: 'enzyme',
        x: 250,
        y: 250,
        color: '#8b5cf6',
        description: 'Phân cắt liên kết $\\alpha$-1,4-glucosidic giải phóng Glucose-1-Phosphate. Hoạt hóa bởi Glucagon/Epinephrine (qua cAMP) và Ca2+/AMP ở cơ.',
        inbornErrors: [
          {
            disease: 'Bệnh McArdle (GSD Type V - Thiếu men ở cơ)',
            inheritance: 'Lặn NST thường',
            features: 'Đau mỏi cơ, chuột rút khi vận động gắng sức, myoglobin niệu (nước tiểu màu xá xị), không tăng lactate máu sau test co cơ.'
          },
          {
            disease: 'Bệnh Hers (GSD Type VI - Thiếu men ở gan)',
            inheritance: 'Lặn NST thường',
            features: 'Gan to nhẹ, hạ đường huyết nhẹ khi đói.'
          }
        ]
      },
      {
        id: 'g6pase',
        name: 'Glucose-6-Phosphatase (G6Pase)',
        type: 'enzyme',
        x: 650,
        y: 250,
        color: '#ef4444',
        description: 'Thủy phân G6P thành Glucose tự do để phóng thích vào tuần hoàn (chỉ có ở Gan và Vỏ thượng thận, không có ở cơ xương).',
        inbornErrors: [
          {
            disease: 'Bệnh Von Gierke (GSD Type I)',
            inheritance: 'Lặn NST thường',
            features: 'Hạ đường huyết đói cực kỳ nghiêm trọng, gan to chứa đầy glycogen, tăng toan lactic, tăng acid uric máu (Gout), tăng lipid máu và bộ mặt búp bê tròn (Doll-like facies).'
          }
        ]
      }
    ],
    edges: [
      { from: 'g6pd', to: 'glycogen_phosphorylase', dashed: true },
      { from: 'glycogen_phosphorylase', to: 'g6pase' }
    ]
  },

  lipid_ketone: {
    id: 'lipid_ketone',
    title: 'Chuyển Hóa Lipid & Thể Ceton',
    icon: 'fa-fire-flame-curved',
    subtitle: 'Lipid Metabolism & Ketogenesis — Tổng hợp cholesterol, oxy hóa acid béo & DKA',
    viewBox: '0 0 900 620',
    nodes: [
      {
        id: 'hmgcr',
        name: 'HMG-CoA Reductase',
        type: 'enzyme',
        x: 300,
        y: 100,
        color: '#ef4444',
        description: 'Enzyme giới hạn tốc độ tổng hợp Cholesterol nội sinh tại gan từ HMG-CoA thành Mevalonate.',
        regulators: {
          activators: ['Insulin', 'Thyroxine'],
          inhibitors: ['Glucagon', 'Cholesterol nội bào (feedback)', 'AMPK']
        },
        clinicalPharmacology: 'Đích tác dụng kinh điển của nhóm thuốc STATIN (Atorvastatin, Rosuvastatin...). Thuốc ức chế cạnh tranh men này ➔ Giảm cholesterol tế bào gan ➔ Tăng biểu hiện thụ thể LDL ➔ Hạ LDL-C huyết tương mạnh mẽ.',
        labMarkers: ['Lipid máu toàn phần (Total Cholesterol, LDL-C, HDL-C, Triglyceride)']
      },
      {
        id: 'cpt1',
        name: 'Carnitine Palmitoyltransferase-I (CPT-I)',
        type: 'enzyme',
        x: 600,
        y: 100,
        color: '#8b5cf6',
        description: 'Đưa acid béo chuỗi dài gắn Carnitine vào trong chất nền ti thể để thực hiện $\\beta$-oxy hóa sinh năng lượng.',
        regulators: {
          inhibitors: ['Malonyl-CoA (sản phẩm tổng hợp acid béo, ngăn chặn oxy hóa đồng thời)']
        },
        inbornErrors: [
          {
            disease: 'Hội chứng Thiếu men Carnitine / MCAD Deficiency',
            inheritance: 'Lặn NST thường',
            features: 'Hạ đường huyết không tăng thể ceton khi nhịn đói (Hypoketotic Hypoglycemia), nôn ói, hôn mê, suy gan cấp ở trẻ nhỏ.'
          }
        ]
      },
      {
        id: 'hmg_lyase',
        name: 'HMG-CoA Lyase & Tạo Thể Ceton',
        type: 'enzyme',
        x: 450,
        y: 280,
        color: '#ef4444',
        description: 'Chuyển HMG-CoA thành Acetoacetate, sau đó tạo $\\beta$-Hydroxybutyrate và Acetone khi lượng Acetyl-CoA vượt quá khả năng xử lý của chu trình Krebs (nhịn đói kéo dài, ĐTĐ thiếu Insulin).',
        clinicalPharmacology: 'Toan Ceton Đái Tháo Đường (DKA): Thiếu Insulin tuyệt đối làm tăng ly giải mỡ ➔ Tràn ngập Acetyl-CoA ➔ Tích tụ $\\beta$-Hydroxybutyrate gây toan chuyển hóa tăng Anion Gap và hơi thở mùi hoa quả chín.',
        labMarkers: ['Beta-hydroxybutyrate máu', 'Ceton nước tiểu', 'Khí máu động mạch (pH, HCO3-)']
      }
    ],
    edges: [
      { from: 'cpt1', to: 'hmg_lyase' }
    ]
  },

  urea_purine: {
    id: 'urea_purine',
    title: 'Chu Trình Ure & Chuyển Hóa Purine',
    icon: 'fa-flask',
    subtitle: 'Urea Cycle & Purine Breakdown — Thải độc Amoniac và Bệnh Gout',
    viewBox: '0 0 900 620',
    nodes: [
      {
        id: 'cps1',
        name: 'Carbamoyl Phosphate Synthetase I (CPS-I)',
        type: 'enzyme',
        x: 300,
        y: 80,
        color: '#ef4444',
        description: 'Enzyme giới hạn tốc độ chu trình Ure tại ti thể gan! Kết hợp NH3 và CO2 thành Carbamoyl Phosphate. Bắt buộc phải có N-acetylglutamate (NAG) hoạt hóa.',
        cofactors: ['N-acetylglutamate (NAG)', '2 ATP'],
        inbornErrors: [
          {
            disease: 'Thiếu Men CPS-I / NAGS',
            inheritance: 'Lặn NST thường',
            features: 'Tăng Amoniac máu cực nặng ở trẻ sơ sinh, hôn mê, phù não, KHÔNG tăng Orotic acid trong nước tiểu (khác với OTC).'
          }
        ]
      },
      {
        id: 'otc',
        name: 'Ornithine Transcarbamylase (OTC)',
        type: 'enzyme',
        x: 600,
        y: 80,
        color: '#8b5cf6',
        description: 'Kết hợp Carbamoyl Phosphate và Ornithine tạo Citrulline.',
        inbornErrors: [
          {
            disease: 'Thiếu Men OTC (OTC Deficiency)',
            inheritance: 'Liên kết X (bệnh chu trình Ure duy nhất liên kết X)',
            features: 'Rối loạn chu trình Ure phổ biến nhất. Tăng Amoniac máu kèm tăng Orotic acid trong nước tiểu và máu do Carbamoyl phosphate thừa tràn sang con đường pyrimidine.'
          }
        ],
        labMarkers: ['Amoniac máu ($NH_3$)', 'Orotic acid niệu']
      },
      {
        id: 'xanthine_oxidase',
        name: 'Xanthine Oxidase (XO)',
        type: 'enzyme',
        x: 450,
        y: 280,
        color: '#ef4444',
        description: 'Oxy hóa Hypoxanthine thành Xanthine và chuyển tiếp Xanthine thành Acid Uric trong thoái biến Purine.',
        clinicalPharmacology: 'Đích tác dụng của ALLOPURINOL và FEBUXOSTAT trong điều trị Bệnh Gout và Hội chứng ly giải khối u (Tumor Lysis Syndrome).',
        labMarkers: ['Acid Uric huyết thanh', 'Tinh thể Urate trong dịch khớp (Monosodium Urate - kim nhọn phân cực âm tính)']
      },
      {
        id: 'hgprt',
        name: 'HGPRT (Purine Salvage Pathway)',
        type: 'enzyme',
        x: 200,
        y: 280,
        color: '#8b5cf6',
        description: 'Tái sử dụng Hypoxanthine và Guanine để tái sinh IMP và GMP.',
        inbornErrors: [
          {
            disease: 'Hội chứng Lesch-Nyhan',
            inheritance: 'Liên kết X lặn',
            features: 'Thiếu hụt hoàn toàn HGPRT ➔ Tăng acid uric cực nặng, Gout khởi phát sớm, múa giật (chorea), chậm phát triển tâm thần và hành vi tự cắn ngón tay/môi (self-mutilation).'
          }
        ]
      }
    ],
    edges: [
      { from: 'cps1', to: 'otc' }
    ]
  }
};
