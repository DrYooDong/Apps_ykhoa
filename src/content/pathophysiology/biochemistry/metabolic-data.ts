/**
 * CliniPortal 2.0 — Interactive Metabolic Pathways Knowledge Base & Studio Data
 * Path: src/content/pathophysiology/biochemistry/metabolic-data.ts
 */

export interface MetabolicNode {
  id: string;
  name: string;
  chemicalName?: string;
  type: 'substrate' | 'enzyme' | 'product' | 'pathway_cross';
  compartment?: 'cytosol' | 'mitochondria_matrix' | 'inner_mitochondrial_membrane' | 'er' | 'lysosome';
  isRateLimiting?: boolean;
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
  energyYield?: string;
  clinicalPharmacology?: string;
  inbornErrors?: {
    disease: string;
    inheritance?: string;
    features: string;
  }[];
  labMarkers?: string[];
  relatedArticles?: {
    title: string;
    hash: string;
  }[];
}

export interface PathwayMap {
  id: string;
  title: string;
  icon: string;
  subtitle: string;
  compartmentLabel?: string;
  viewBox: string;
  nodes: MetabolicNode[];
  edges: {
    from: string;
    to: string;
    label?: string;
    dashed?: boolean;
    color?: string;
    energyLoop?: string;
  }[];
}

export const METABOLIC_PATHWAYS: Record<string, PathwayMap> = {
  glycolysis: {
    id: 'glycolysis',
    title: 'Đường Phân, Tân Tạo Đường & Chu Trình Cori',
    icon: 'fa-cubes-stacked',
    subtitle: 'Glycolysis, Gluconeogenesis & Cori Cycle — Trục chuyển hóa carbohydrate trung tâm',
    compartmentLabel: 'Tế bào chất (Cytoplasm) ↔ Ti thể Gan/Cơ',
    viewBox: '0 0 920 640',
    nodes: [
      {
        id: 'glucose',
        name: 'Glucose (Máu)',
        type: 'substrate',
        compartment: 'cytosol',
        x: 460,
        y: 45,
        color: '#0284c7',
        description: 'Đường đơn chính cung cấp năng lượng cho mô não, hồng cầu và cơ bắp. Hấp thu qua kênh GLUT-1 (não/hồng cầu), GLUT-2 (gan/tụy), GLUT-4 (cơ/mỡ - phụ thuộc Insulin).',
        labMarkers: ['Đường huyết đói (Fasting Plasma Glucose)', 'HbA1c', 'Nghiệm pháp dung nạp OGTT']
      },
      {
        id: 'hexokinase',
        name: 'Hexokinase / Glucokinase ⭐',
        type: 'enzyme',
        compartment: 'cytosol',
        isRateLimiting: false,
        x: 460,
        y: 120,
        color: '#8b5cf6',
        description: 'Phosphoryl hóa Glucose thành G6P để giữ glucose trong nội bào. Glucokinase (tại Gan & Tế bào Beta tụy) có Km cao (ái lực thấp), Vmax cao và không bị ức chế ngược bởi G6P.',
        cofactors: ['Mg²⁺', 'ATP'],
        regulators: {
          activators: ['Insulin (kích thích sao chép Glucokinase)'],
          inhibitors: ['Glucose-6-Phosphate (ức chế Hexokinase I-III)', 'Glucagon (ức chế qua F-6-P/GKRP)']
        },
        energyYield: '-1 ATP tiêu hao',
        inbornErrors: [
          {
            disease: 'Đái Tháo Đường Khởi Phát Ở Người Trẻ (MODY 2)',
            inheritance: 'Trội NST thường',
            features: 'Đột biến bất hoạt Glucokinase làm tăng ngưỡng nhạy cảm tiết Insulin ➔ Tăng đường huyết mạn tính nhẹ, không cần điều trị thuốc.'
          }
        ],
        clinicalPharmacology: 'Thuốc kích hoạt Glucokinase (Dorzagliatin) được phát triển để tăng tiết Insulin đáp ứng đường huyết ở bệnh nhân ĐTĐ type 2.'
      },
      {
        id: 'g6p',
        name: 'Glucose-6-Phosphate (G6P)',
        type: 'pathway_cross',
        compartment: 'cytosol',
        x: 460,
        y: 195,
        color: '#0284c7',
        description: 'Ngã tư chuyển hóa trung tâm: có thể đi tiếp vào Đường phân, rẽ sang Con đường Pentose Phosphate (HMP Shunt), hoặc đi vào Tổng hợp Glycogen.'
      },
      {
        id: 'pfk1',
        name: 'Phosphofructokinase-1 (PFK-1) ⭐',
        type: 'enzyme',
        compartment: 'cytosol',
        isRateLimiting: true,
        x: 460,
        y: 275,
        color: '#ef4444',
        description: 'ENZYME GIỚI HẠN TỐC ĐỘ CHÍNH của toàn bộ con đường đường phân! Xúc tác chuyển F-6-P thành F-1,6-BP không thuận nghịch.',
        cofactors: ['Mg²⁺', 'ATP'],
        regulators: {
          activators: ['AMP', 'Fructose-2,6-bisphosphate (F-2,6-BP do PFK-2 tạo ra dưới kích thích của Insulin)'],
          inhibitors: ['ATP (dư thừa năng lượng)', 'Citrate (từ chu trình Krebs)', 'Glucagon (thông qua ức chế PFK-2)']
        },
        energyYield: '-1 ATP tiêu hao',
        inbornErrors: [
          {
            disease: 'Bệnh Tarui (Glycogen Storage Disease Type VII)',
            inheritance: 'Lặn NST thường',
            features: 'Thiếu hụt PFK-1 ở mô cơ ➔ Đau mỏi cơ khi vận động gắng sức, myoglobin niệu, chuột rút, tán huyết nội mạch nhẹ.'
          }
        ],
        clinicalPharmacology: 'Cơ chế enzym kép PFK-2 / FBPase-2: Khi đói (Glucagon ↑, cAMP ↑, PKA ↑) ➔ FBPase-2 hoạt hóa, giảm F-2,6-BP ➔ ức chế đường phân, kích hoạt tân tạo đường.'
      },
      {
        id: 'f16bp',
        name: 'Fructose-1,6-Bisphosphate',
        type: 'substrate',
        compartment: 'cytosol',
        x: 460,
        y: 350,
        color: '#0284c7',
        description: 'Được phân cắt bởi Aldolase (Aldolase A ở cơ, Aldolase B ở gan) thành 2 phân tử Triose Phosphate (DHAP & GAP).'
      },
      {
        id: 'pep',
        name: 'Phosphoenolpyruvate (PEP)',
        type: 'substrate',
        compartment: 'cytosol',
        x: 460,
        y: 435,
        color: '#0284c7',
        description: 'Hợp chất chứa liên kết phosphat cao năng cao nhất trong cơ thể ($ΔG° = -61.9$ kJ/mol), chuyển nhóm phosphat cho ADP để tạo ATP.'
      },
      {
        id: 'pyruvate_kinase',
        name: 'Pyruvate Kinase (PK) ⭐',
        type: 'enzyme',
        compartment: 'cytosol',
        isRateLimiting: false,
        x: 460,
        y: 510,
        color: '#8b5cf6',
        description: 'Xúc tác chuyển PEP thành Pyruvate. Được hoạt hóa thuận chiều bởi F-1,6-BP (Feedforward activation) và bị ức chế bởi ATP & Alanine.',
        cofactors: ['Mg²⁺', 'K⁺'],
        regulators: {
          activators: ['Fructose-1,6-bisphosphate (Feedforward)'],
          inhibitors: ['ATP', 'Alanine', 'Glucagon (Phosphoryl hóa ức chế PK ở gan)']
        },
        energyYield: '+2 ATP tạo ra (mức cơ chất)',
        inbornErrors: [
          {
            disease: 'Thiếu Men Pyruvate Kinase (PK Deficiency)',
            inheritance: 'Lặn NST thường',
            features: 'Nguyên nhân thiếu máu tán huyết bẩm sinh không do miễn dịch phổ biến thứ 2 (sau G6PD). Hồng cầu mất khả năng sinh ATP ➔ Hỏng bơm Na+/K+ ATPase ➔ Hồng cầu biến dạng Echinocytes (thể gai) và bị lách bắt giữ tiêu hủy.'
          }
        ],
        labMarkers: ['Bilirubin gián tiếp tăng cao', 'Haptoglobin giảm sâu', 'Hồng cầu lưới (Reticulocyte) tăng cao']
      },
      {
        id: 'pyruvate',
        name: 'Pyruvate',
        type: 'product',
        compartment: 'cytosol',
        x: 460,
        y: 590,
        color: '#10b981',
        description: 'Sản phẩm cuối cùng của đường phân ái khí. Đi vào ti thể chuyển thành Acetyl-CoA (qua PDH) hoặc chuyển thành Lactate trong điều kiện yếm khí (qua LDH trong chu trình Cori).',
        labMarkers: ['Lactate máu (Chẩn đoán Sốc/Sepsis)', 'Tỷ lệ Lactate / Pyruvate']
      }
    ],
    edges: [
      { from: 'glucose', to: 'hexokinase', energyLoop: 'ATP ➔ ADP' },
      { from: 'hexokinase', to: 'g6p' },
      { from: 'g6p', to: 'pfk1' },
      { from: 'pfk1', to: 'f16bp', energyLoop: 'ATP ➔ ADP' },
      { from: 'f16bp', to: 'pep' },
      { from: 'pep', to: 'pyruvate_kinase', energyLoop: '2 ADP ➔ 2 ATP' },
      { from: 'pyruvate_kinase', to: 'pyruvate' }
    ]
  },

  krebs_etc: {
    id: 'krebs_etc',
    title: 'Chu Trình Krebs, Chuỗi Hô Hấp Ti Thể & OxPhos',
    icon: 'fa-rotate',
    subtitle: 'TCA Cycle, ETC & Oxidative Phosphorylation — Cỗ máy sinh năng lượng ATP của tế bào',
    compartmentLabel: 'Chất nền ti thể (Mitochondrial Matrix) & Màng trong ti thể',
    viewBox: '0 0 920 640',
    nodes: [
      {
        id: 'pdh_complex',
        name: 'Phức hợp Pyruvate Dehydrogenase (PDH) ⭐',
        type: 'enzyme',
        compartment: 'mitochondria_matrix',
        isRateLimiting: true,
        x: 460,
        y: 45,
        color: '#ef4444',
        description: 'Cầu nối giữa Đường phân và Chu trình Krebs! Xúc tác khử carboxyl oxy hóa Pyruvate thành Acetyl-CoA. Bắt buộc cần 5 Coenzyme quan trọng (TLC-FN).',
        cofactors: [
          'Vitamin B1 (Thiamine pyrophosphate - TPP)',
          'Lipoic Acid',
          'Vitamin B5 (Coenzyme A)',
          'Vitamin B2 (FAD - Riboflavin)',
          'Vitamin B3 (NAD⁺ - Niacin)'
        ],
        regulators: {
          activators: ['ADP', 'Pyruvate', 'Ca²⁺ (khi cơ tim/cơ xương co bóp)'],
          inhibitors: ['ATP', 'Acetyl-CoA', 'NADH', 'Arsenic (thạch tín gắn kết nhóm Lipoic acid)']
        },
        energyYield: '+1 NADH (+2.5 ATP)',
        inbornErrors: [
          {
            disease: 'Thiếu Hụt PDH Bẩm Sinh & Thiếu Thiamine (Beriberi / Wernicke)',
            inheritance: 'Liên kết X hoặc NST thường',
            features: 'Pyruvate không vào được chu trình Krebs bị tràn sang tạo Lactic acid ➔ Toan lactic máu cực nặng, thoái hóa thần kinh trung ương và suy tim cung lượng cao (Wet Beriberi).'
          }
        ],
        clinicalPharmacology: 'Bệnh nhân nghiện rượu hoặc suy dinh dưỡng nặng BẮT BUỘC phải được tiêm bổ sung Thiamine (B1) TRƯỚC KHI truyền dịch Glucose để tránh thúc đẩy Hội chứng Não Wernicke cấp tính!'
      },
      {
        id: 'acetyl_coa',
        name: 'Acetyl-CoA',
        type: 'substrate',
        compartment: 'mitochondria_matrix',
        x: 460,
        y: 125,
        color: '#0284c7',
        description: 'Điểm hội tụ của toàn bộ chuyển hóa Carbohydrate, Lipid (β-oxy hóa) và Protein. Kết hợp với Oxaloacetate đi vào chu trình Krebs.'
      },
      {
        id: 'citrate_synthase',
        name: 'Citrate Synthase',
        type: 'enzyme',
        compartment: 'mitochondria_matrix',
        x: 460,
        y: 195,
        color: '#8b5cf6',
        description: 'Ngưng tụ Acetyl-CoA (2C) với Oxaloacetate (4C) tạo thành Citrate (6C). Bị ức chế điều hòa ngược bởi ATP, NADH, Citrate và Succinyl-CoA.'
      },
      {
        id: 'isocitrate_dh',
        name: 'Isocitrate Dehydrogenase (ICDH) ⭐',
        type: 'enzyme',
        compartment: 'mitochondria_matrix',
        isRateLimiting: true,
        x: 460,
        y: 275,
        color: '#ef4444',
        description: 'ENZYME GIỚI HẠN TỐC ĐỘ CỦA CHU TRÌNH KREBS! Khử carboxyl oxy hóa Isocitrate thành α-Ketoglutarate, giải phóng CO2 và tạo NADH.',
        cofactors: ['NAD⁺', 'Mg²⁺'],
        regulators: {
          activators: ['ADP', 'Ca²⁺'],
          inhibitors: ['ATP', 'NADH']
        },
        energyYield: '+1 NADH + 1 CO2'
      },
      {
        id: 'complex_iv',
        name: 'Phức Hợp IV (Cytochrome c Oxidase)',
        type: 'enzyme',
        compartment: 'inner_mitochondrial_membrane',
        x: 240,
        y: 430,
        color: '#ef4444',
        description: 'Chuyển electron từ Cytochrome c sang O2 để tạo H2O, bơm proton H⁺ qua màng trong tạo gradient điện thế hóa sinh.',
        clinicalPharmacology: 'ĐÍCH TẤN CÔNG CỦA CHẤT ĐỘC CYANIDE (CN⁻) VÀ CARBON MONOXIDE (CO): Ức chế Fe3+ của heme a3 ➔ Ngừng trệ hoàn toàn chuỗi hô hấp tế bào, toan lactic cực nặng, oxy tĩnh mạch tăng cao (máu đỏ tươi).'
      },
      {
        id: 'atp_synthase',
        name: 'ATP Synthase (Phức Hợp V) ⭐',
        type: 'enzyme',
        compartment: 'inner_mitochondrial_membrane',
        x: 680,
        y: 430,
        color: '#10b981',
        description: 'Khai thác dòng proton H⁺ từ khoang gian màng chảy ngược vào chất nền ti thể để tổng hợp ATP từ ADP và Pi.',
        energyYield: 'Tổng cộng ~30-32 ATP / 1 Glucose',
        clinicalPharmacology: 'Oligomycin ức chế trực tiếp tiểu đơn vị Fo. Các chất làm mất ghép (Uncouplers: 2,4-Dinitrophenol DNP, Aspirin liều độc, Thermogenin ở mỡ nâu) làm rò rỉ proton ➔ Tiêu tán năng lượng thành NHIỆT (sốt cao ác tính).'
      }
    ],
    edges: [
      { from: 'pdh_complex', to: 'acetyl_coa', energyLoop: 'NAD⁺ ➔ NADH' },
      { from: 'acetyl_coa', to: 'citrate_synthase' },
      { from: 'citrate_synthase', to: 'isocitrate_dh' },
      { from: 'isocitrate_dh', to: 'complex_iv', dashed: true },
      { from: 'complex_iv', to: 'atp_synthase', energyLoop: 'Dòng Proton H⁺' }
    ]
  },

  glycogen_g6pd: {
    id: 'glycogen_g6pd',
    title: 'Chuyển Hóa Glycogen & Con Đường HMP Shunt (G6PD)',
    icon: 'fa-shield-halved',
    subtitle: 'Glycogen Storage & HMP Shunt — Dự trữ đường và bảo vệ chống oxy hóa hồng cầu',
    compartmentLabel: 'Tế bào chất (Cytoplasm Gan & Cơ Xương)',
    viewBox: '0 0 920 640',
    nodes: [
      {
        id: 'g6pd',
        name: 'Glucose-6-Phosphate Dehydrogenase (G6PD) ⭐',
        type: 'enzyme',
        compartment: 'cytosol',
        isRateLimiting: true,
        x: 460,
        y: 60,
        color: '#ef4444',
        description: 'Enzyme giới hạn tốc độ của con đường Pentose Phosphate (HMP Shunt). Tạo NADPH cần thiết để khử Glutathione (GSH) bảo vệ hồng cầu chống các gốc oxy hóa tự do (H2O2).',
        cofactors: ['NADP⁺'],
        regulators: {
          activators: ['NADP⁺'],
          inhibitors: ['NADPH']
        },
        energyYield: '+2 NADPH (không sinh ATP)',
        inbornErrors: [
          {
            disease: 'Bệnh Thiếu Men G6PD (G6PD Deficiency)',
            inheritance: 'Liên kết NST giới tính X lặn',
            features: 'Bệnh di truyền enzym hồng cầu phổ biến nhất thế giới! Tiếp xúc tác nhân oxy hóa (Đậu tằm Fava beans, Thuốc Sốt rét Primaquine, Dapsone, Sulfonamide, Nhiễm trùng) ➔ Hb biến tính tạo Thể Heinz, đại thực bào cắn tạo Bite cells và tán huyết nội mạch cấp.'
          }
        ],
        clinicalPharmacology: 'Chống chỉ định tuyệt đối các thuốc có tính oxy hóa cao ở bệnh nhân thiếu men G6PD.'
      },
      {
        id: 'glycogen_synthase',
        name: 'Glycogen Synthase ⭐',
        type: 'enzyme',
        compartment: 'cytosol',
        isRateLimiting: true,
        x: 230,
        y: 220,
        color: '#10b981',
        description: 'Tạo liên kết α-1,4-glycosidic kéo dài chuỗi Glycogen. Được hoạt hóa bởi Insulin (khử phosphoryl hóa) và G-6-P.'
      },
      {
        id: 'glycogen_phosphorylase',
        name: 'Glycogen Phosphorylase ⭐',
        type: 'enzyme',
        compartment: 'cytosol',
        isRateLimiting: true,
        x: 690,
        y: 220,
        color: '#8b5cf6',
        description: 'Phân cắt liên kết α-1,4-glucosidic giải phóng Glucose-1-Phosphate. Hoạt hóa bởi Glucagon & Epinephrine (thông qua cAMP/PKA) và Ca²⁺/AMP ở cơ.',
        inbornErrors: [
          {
            disease: 'Bệnh McArdle (GSD Type V — Thiếu Phosphorylase ở cơ)',
            inheritance: 'Lặn NST thường',
            features: 'Đau mỏi cơ, chuột rút khi vận động nặng, myoglobin niệu (nước tiểu màu xá xị), tăng CK huyết thanh nhưng KHÔNG tăng lactate máu sau test gắng sức.'
          },
          {
            disease: 'Bệnh Hers (GSD Type VI — Thiếu Phosphorylase ở gan)',
            inheritance: 'Lặn NST thường',
            features: 'Gan to ứ đọng Glycogen nhẹ, hạ đường huyết nhẹ khi đói kéo dài.'
          }
        ]
      },
      {
        id: 'g6pase',
        name: 'Glucose-6-Phosphatase (G6Pase) ⭐',
        type: 'enzyme',
        compartment: 'er',
        x: 460,
        y: 430,
        color: '#ef4444',
        description: 'Thủy phân G6P thành Glucose tự do để đưa vào máu duy trì đường huyết đói (chỉ có ở Gan & Vỏ thượng thận, KHÔNG có ở cơ xương).',
        inbornErrors: [
          {
            disease: 'Bệnh Von Gierke (Glycogen Storage Disease Type I)',
            inheritance: 'Lặn NST thường',
            features: 'Hạ đường huyết đói cực kỳ nghiêm trọng, gan to chứa đầy glycogen, tăng toan Lactic máu nặng, tăng Acid Uric máu (Gout), tăng Triglyceride và bộ mặt búp bê tròn (Doll-like facies).'
          }
        ]
      }
    ],
    edges: [
      { from: 'g6pd', to: 'glycogen_synthase', dashed: true },
      { from: 'glycogen_synthase', to: 'g6pase' },
      { from: 'glycogen_phosphorylase', to: 'g6pase' }
    ]
  },

  lipid_ketone: {
    id: 'lipid_ketone',
    title: 'Chuyển Hóa Lipid, β-Oxy Hóa Acid Béo & Thể Ceton',
    icon: 'fa-fire-flame-curved',
    subtitle: 'Lipid Metabolism & Ketogenesis — Tổng hợp cholesterol, oxy hóa acid béo & DKA',
    compartmentLabel: 'Tế bào chất (Tổng hợp mỡ) ↔ Ti thể Gan (β-oxy hóa & Ceton)',
    viewBox: '0 0 920 640',
    nodes: [
      {
        id: 'hmgcr',
        name: 'HMG-CoA Reductase ⭐',
        type: 'enzyme',
        compartment: 'er',
        isRateLimiting: true,
        x: 260,
        y: 80,
        color: '#ef4444',
        description: 'Enzyme giới hạn tốc độ tổng hợp Cholesterol nội sinh tại gan từ HMG-CoA thành Mevalonate.',
        cofactors: ['2 NADPH'],
        regulators: {
          activators: ['Insulin', 'Thyroxine'],
          inhibitors: ['Glucagon', 'Cholesterol nội bào (feedback)', 'AMPK']
        },
        clinicalPharmacology: 'ĐÍCH TÁC DỤNG CỦA NHÓM THUỐC STATIN (Atorvastatin, Rosuvastatin): Ức chế cạnh tranh men này ➔ Giảm cholesterol tế bào gan ➔ Tăng biểu hiện thụ thể LDL receptor trên màng tế bào ➔ Dọn sạch LDL-C huyết tương mạnh mẽ.',
        labMarkers: ['Bộ mỡ máu toàn phần (Total Cholesterol, LDL-C, HDL-C, Triglyceride)']
      },
      {
        id: 'cpt1',
        name: 'Carnitine Palmitoyltransferase-I (CPT-I) ⭐',
        type: 'enzyme',
        compartment: 'inner_mitochondrial_membrane',
        isRateLimiting: true,
        x: 660,
        y: 80,
        color: '#8b5cf6',
        description: 'Thoi đưa Carnitine: Vận chuyển acid béo chuỗi dài vào trong chất nền ti thể để thực hiện β-oxy hóa sinh năng lượng.',
        regulators: {
          inhibitors: ['Malonyl-CoA (sản phẩm tổng hợp acid béo, ngăn chặn vừa tổng hợp vừa thoái hóa đồng thời)']
        },
        inbornErrors: [
          {
            disease: 'Thiếu Men MCAD (Medium-Chain Acyl-CoA Dehydrogenase Deficiency)',
            inheritance: 'Lặn NST thường',
            features: 'Không thể oxy hóa acid béo chuỗi trung bình khi nhịn đói ➔ Hạ đường huyết KHÔNG kèm tăng thể Ceton (Hypoketotic Hypoglycemia), tích tụ acid béo độc hại gây suy gan cấp, hôn mê và đột tử ở trẻ nhỏ.'
          }
        ]
      },
      {
        id: 'hmg_lyase',
        name: 'HMG-CoA Synthase & Lyase (Tạo Thể Ceton) ⭐',
        type: 'enzyme',
        compartment: 'mitochondria_matrix',
        isRateLimiting: true,
        x: 460,
        y: 320,
        color: '#ef4444',
        description: 'Chuyển HMG-CoA thành Acetoacetate, sau đó tạo β-Hydroxybutyrate và Acetone khi Acetyl-CoA dư thừa vượt quá khả năng chu trình Krebs (nhịn đói kéo dài, ĐTĐ thiếu Insulin).',
        clinicalPharmacology: 'Toan Ceton Đái Tháo Đường (DKA): Thiếu Insulin tuyệt đối làm tăng ly giải mỡ ➔ Tràn ngập Acetyl-CoA ➔ Tích tụ β-Hydroxybutyrate gây toan chuyển hóa tăng Anion Gap và hơi thở mùi hoa quả chín.',
        labMarkers: ['Beta-hydroxybutyrate máu', 'Ceton nước tiểu (phản ứng Nitroprusside chỉ đo Acetoacetate)', 'Khí máu ĐM (pH, HCO3-)']
      }
    ],
    edges: [
      { from: 'cpt1', to: 'hmg_lyase' }
    ]
  },

  urea_purine: {
    id: 'urea_purine',
    title: 'Chu Trình Ure & Chuyển Hóa Acid Amin / Purine',
    icon: 'fa-flask',
    subtitle: 'Urea Cycle & Purine Breakdown — Thải độc Amoniac và Bệnh Gout',
    compartmentLabel: 'Ti thể ↔ Tế bào chất Gan',
    viewBox: '0 0 920 640',
    nodes: [
      {
        id: 'cps1',
        name: 'Carbamoyl Phosphate Synthetase I (CPS-I) ⭐',
        type: 'enzyme',
        compartment: 'mitochondria_matrix',
        isRateLimiting: true,
        x: 260,
        y: 70,
        color: '#ef4444',
        description: 'Enzyme giới hạn tốc độ của Chu trình Ure tại ti thể gan! Kết hợp NH3 và CO2 thành Carbamoyl Phosphate. Bắt buộc phải có N-acetylglutamate (NAG) hoạt hóa.',
        cofactors: ['N-acetylglutamate (NAG)', '2 ATP'],
        inbornErrors: [
          {
            disease: 'Thiếu Men CPS-I Bẩm Sinh',
            inheritance: 'Lặn NST thường',
            features: 'Tăng Amoniac máu cực nặng ở trẻ sơ sinh, hôn mê, phù não, KHÔNG tăng Orotic acid trong nước tiểu (khác với thiếu OTC).'
          }
        ]
      },
      {
        id: 'otc',
        name: 'Ornithine Transcarbamylase (OTC) ⭐',
        type: 'enzyme',
        compartment: 'mitochondria_matrix',
        x: 660,
        y: 70,
        color: '#8b5cf6',
        description: 'Kết hợp Carbamoyl Phosphate và Ornithine tạo Citrulline.',
        inbornErrors: [
          {
            disease: 'Thiếu Men OTC (OTC Deficiency)',
            inheritance: 'Liên kết X lặn (bệnh chu trình Ure duy nhất liên kết X)',
            features: 'Rối loạn chu trình Ure phổ biến nhất. Tăng Amoniac máu KÈM TĂNG OROTIC ACID trong nước tiểu do Carbamoyl phosphate thừa tràn sang con đường tổng hợp Pyrimidine.'
          }
        ],
        labMarkers: ['Amoniac máu (NH3)', 'Orotic acid niệu']
      },
      {
        id: 'xanthine_oxidase',
        name: 'Xanthine Oxidase (XO) ⭐',
        type: 'enzyme',
        compartment: 'cytosol',
        x: 460,
        y: 280,
        color: '#ef4444',
        description: 'Oxy hóa Hypoxanthine thành Xanthine và chuyển tiếp Xanthine thành Acid Uric trong thoái biến Purine.',
        clinicalPharmacology: 'ĐÍCH TÁC DỤNG CỦA ALLOPURINOL & FEBUXOSTAT: Ức chế XO ➔ Giảm nồng độ Acid Uric huyết thanh, phòng ngừa cơn Gout cấp và Hội chứng Ly giải khối u (Tumor Lysis Syndrome).',
        labMarkers: ['Acid Uric huyết thanh', 'Dịch khớp: Tinh thể Urate hình kim phân cực âm tính']
      },
      {
        id: 'hgprt',
        name: 'HGPRT (Purine Salvage Pathway) ⭐',
        type: 'enzyme',
        compartment: 'cytosol',
        x: 200,
        y: 280,
        color: '#8b5cf6',
        description: 'Tái sử dụng Hypoxanthine và Guanine để tái sinh IMP và GMP trong con đường trục vớt Purine.',
        inbornErrors: [
          {
            disease: 'Hội Chứng Lesch-Nyhan',
            inheritance: 'Liên kết X lặn',
            features: 'Thiếu hụt hoàn toàn men HGPRT ➔ Tăng acid uric cực nặng, Gout khởi phát sớm ở trẻ em, múa giật (chorea), chậm phát triển tâm thần và ĐẶC BIỆT HÀNH VI TỰ HỦY HOẠI BẢN THÂN (tự cắn ngón tay, môi).'
          }
        ]
      }
    ],
    edges: [
      { from: 'cps1', to: 'otc' },
      { from: 'otc', to: 'xanthine_oxidase', dashed: true },
      { from: 'hgprt', to: 'xanthine_oxidase' }
    ]
  },

  ethanol_disorders: {
    id: 'ethanol_disorders',
    title: 'Chuyển Hóa Cồn Ethanol & Bệnh Sinh Nghiện Rượu',
    icon: 'fa-wine-bottle',
    subtitle: 'Ethanol Metabolism, MEOS & NADH/NAD+ Ratio — Rối loạn chuyển hóa do rượu',
    compartmentLabel: 'Tế bào chất ↔ Ti thể Tế bào Gan',
    viewBox: '0 0 920 640',
    nodes: [
      {
        id: 'ethanol',
        name: 'Ethanol (Cồn Rượu)',
        type: 'substrate',
        compartment: 'cytosol',
        x: 460,
        y: 50,
        color: '#0284c7',
        description: 'Hấp thu nhanh qua dạ dày và ruột non, 90-95% được chuyển hóa tại gan theo động học bậc 0 (tốc độ hằng định).'
      },
      {
        id: 'alcohol_dh',
        name: 'Alcohol Dehydrogenase (ADH) ⭐',
        type: 'enzyme',
        compartment: 'cytosol',
        isRateLimiting: true,
        x: 460,
        y: 140,
        color: '#ef4444',
        description: 'Chuyển Ethanol thành Acetaldehyde tại bào tương. Tiêu tốn NAD⁺ tạo NADH (Làm tăng mạnh tỷ lệ NADH/NAD⁺ ở gan).',
        cofactors: ['NAD⁺', 'Zn²⁺'],
        clinicalPharmacology: 'FOMEPIZOLE: Thuốc ức chế cạnh tranh men ADH, là thuốc giải độc đặc hiệu (Antidote) trong ngộ độc Methanol (Cồn công nghiệp) và Ethylene Glycol (chống đông).'
      },
      {
        id: 'acetaldehyde',
        name: 'Acetaldehyde (Độc Tính Cao)',
        type: 'substrate',
        compartment: 'cytosol',
        x: 460,
        y: 230,
        color: '#f59e0b',
        description: 'Chất trung gian gây độc tế bào gan, gây đỏ bừng mặt, nhức đầu, nôn nao (hangover) và tăng nguy cơ ung thư biểu mô gan.'
      },
      {
        id: 'alDH',
        name: 'Acetaldehyde Dehydrogenase (ALDH) ⭐',
        type: 'enzyme',
        compartment: 'mitochondria_matrix',
        x: 460,
        y: 320,
        color: '#8b5cf6',
        description: 'Chuyển Acetaldehyde thành Acetate trong ti thể. Tiếp tục tạo thêm 1 NADH.',
        cofactors: ['NAD⁺'],
        clinicalPharmacology: 'DISULFIRAM (Antabuse): Ức chế men ALDH ➔ Khi uống rượu sẽ tích tụ Acetaldehyde ồ ạt gây đỏ bừng, tụt huyết áp, nôn ói dữ dội (Phản ứng sợ rượu điều trị cai nghiện). Một số kháng sinh như Metronidazole, Cefotetan cũng có tác dụng phụ kiểu Disulfiram.'
      },
      {
        id: 'acetate',
        name: 'Acetate ➔ Acetyl-CoA',
        type: 'product',
        compartment: 'mitochondria_matrix',
        x: 460,
        y: 430,
        color: '#10b981',
        description: 'Acetate chuyển thành Acetyl-CoA. Tỷ lệ NADH/NAD⁺ tăng cực cao làm ức chế tân tạo đường (gây hạ đường huyết sau uống rượu), kích thích tổng hợp mỡ (Gan nhiễm mỡ do rượu) và tăng tạo thể ceton (Alcoholic Ketoacidosis).'
      }
    ],
    edges: [
      { from: 'ethanol', to: 'alcohol_dh', energyLoop: 'NAD⁺ ➔ NADH' },
      { from: 'alcohol_dh', to: 'acetaldehyde' },
      { from: 'acetaldehyde', to: 'alDH', energyLoop: 'NAD⁺ ➔ NADH' },
      { from: 'alDH', to: 'acetate' }
    ]
  },

  heme_porphyria: {
    id: 'heme_porphyria',
    title: 'Sinh Tổng Hợp Heme, Bệnh Porphyria & Thoái Hóa Bilirubin',
    icon: 'fa-droplet',
    subtitle: 'Heme Biosynthesis, Porphyrias & Jaundice Classifications — Hồng cầu & Vàng da',
    compartmentLabel: 'Ti thể ↔ Tế bào chất Gan & Tủy Xương',
    viewBox: '0 0 920 640',
    nodes: [
      {
        id: 'alas',
        name: 'ALA Synthase (ALAS-1 / ALAS-2) ⭐',
        type: 'enzyme',
        compartment: 'mitochondria_matrix',
        isRateLimiting: true,
        x: 460,
        y: 60,
        color: '#ef4444',
        description: 'ENZYME GIỚI HẠN TỐC ĐỘ TỔNG HỢP HEME! Ngưng tụ Succinyl-CoA và Glycine tạo thành δ-Aminolevulinic acid (ALA). ALAS-1 (ở gan) bị ức chế feedback bởi Heme & Glucose. ALAS-2 (ở tủy xương) phụ thuộc sắt.',
        cofactors: ['Vitamin B6 (Pyridoxal Phosphate - PLP)'],
        inbornErrors: [
          {
            disease: 'Thiếu Máu Nguyên Bào Sắt Liên Kết X (X-linked Sideroblastic Anemia)',
            inheritance: 'Liên kết X',
            features: 'Đột biến ALAS-2 ➔ Không tổng hợp được protoporphyrin, sắt tích tụ dạng vòng quanh nhân nguyên hồng cầu (Ringed Sideroblasts).'
          }
        ],
        clinicalPharmacology: 'Thuốc Isoniazid (chữa lao) ức chế Vitamin B6 ➔ Giảm hoạt tính ALAS gây thiếu máu nguyên bào sắt.'
      },
      {
        id: 'pbg_deaminase',
        name: 'Porphobilinogen Deaminase (PBG-D) ⭐',
        type: 'enzyme',
        compartment: 'cytosol',
        x: 260,
        y: 200,
        color: '#8b5cf6',
        description: 'Chuyển Porphobilinogen thành Hydroxymethylbilane.',
        inbornErrors: [
          {
            disease: 'Bệnh Porphyria Cấp Ngắt Quãng (Acute Intermittent Porphyria - AIP)',
            inheritance: 'Trội NST thường',
            features: '5 Chữ P kinh điển: Painful abdomen (đau bụng dữ dội), Port-wine urine (nước tiểu màu rượu vang khi để sáng), Polyneuropathy (bệnh đa dây thần kinh), Psychological disturbances (rối loạn tâm thần), Precipitated by drugs (khởi phát bởi thuốc cảm ứng CYP450, rượu, nhịn đói).'
          }
        ]
      },
      {
        id: 'urod',
        name: 'Uroporphyrinogen Decarboxylase (UROD) ⭐',
        type: 'enzyme',
        compartment: 'cytosol',
        x: 660,
        y: 200,
        color: '#8b5cf6',
        description: 'Chuyển Uroporphyrinogen III thành Coproporphyrinogen III.',
        inbornErrors: [
          {
            disease: 'Porphyria Cutanea Tarda (PCT)',
            inheritance: 'Trội NST thường hoặc Mắc phải (Viêm gan C, Rượu, Ứ sắt)',
            features: 'Bệnh Porphyria phổ biến nhất! Nhạy cảm ánh sáng da nghiêm trọng: Phồng rộp bóng nước, sẹo và tăng sắc tố ở vùng da hở tiếp xúc ánh nắng mặt trời.'
          }
        ]
      },
      {
        id: 'heme',
        name: 'Heme (Fe²⁺ - Protoporphyrin IX)',
        type: 'product',
        compartment: 'mitochondria_matrix',
        x: 460,
        y: 350,
        color: '#ef4444',
        description: 'Gắn kết với Globin tạo Hemoglobin trong hồng cầu và Myoglobin trong cơ bắp.'
      },
      {
        id: 'ugt1a1',
        name: 'UDP-Glucuronosyltransferase (UGT1A1) ⭐',
        type: 'enzyme',
        compartment: 'er',
        x: 460,
        y: 470,
        color: '#10b981',
        description: 'Liên hợp Bilirubin gián tiếp (không tan trong nước) với Acid Glucuronic tạo Bilirubin trực tiếp tan trong nước để bài tiết vào dịch mật.',
        inbornErrors: [
          {
            disease: 'Hội Chứng Gilbert (Giảm nhẹ UGT1A1 ~30%)',
            inheritance: 'Lặn NST thường',
            features: 'Vàng da nhẹ từng đợt khi căng thẳng, nhịn đói, sốt, không gây tổn thương gan, tiên lượng hoàn toàn lành tính.'
          },
          {
            disease: 'Hội Chứng Crigler-Najjar Type I (Mất hoàn toàn UGT1A1)',
            inheritance: 'Lặn NST thường',
            features: 'Tăng Bilirubin gián tiếp cực nặng ở trẻ sơ sinh ➔ Vàng da nhân não (Kernicterus), tử vong nếu không thay máu và ghép gan.'
          }
        ]
      }
    ],
    edges: [
      { from: 'alas', to: 'pbg_deaminase' },
      { from: 'pbg_deaminase', to: 'urod' },
      { from: 'urod', to: 'heme' },
      { from: 'heme', to: 'ugt1a1', dashed: true }
    ]
  },

  folate_b12: {
    id: 'folate_b12',
    title: 'Chuyển Hóa Một Carbon, Chu Trình Folate & Vitamin B12',
    icon: 'fa-dna',
    subtitle: 'One-Carbon Metabolism, Folate Trap & Homocysteine — Tổng hợp DNA & Tạo máu',
    compartmentLabel: 'Tế bào chất ↔ Ti thể Tế bào sinh sản nhanh',
    viewBox: '0 0 920 640',
    nodes: [
      {
        id: 'dhfr',
        name: 'Dihydrofolate Reductase (DHFR) ⭐',
        type: 'enzyme',
        compartment: 'cytosol',
        isRateLimiting: true,
        x: 260,
        y: 70,
        color: '#ef4444',
        description: 'Khử DHF thành Tetrahydrofolate (THF) - dạng hoạt động chuyển nhóm 1-carbon cần thiết để tổng hợp dTMP (Thymidylate) và Purine cho DNA.',
        cofactors: ['NADPH'],
        clinicalPharmacology: 'ĐÍCH TÁC DỤNG CỦA METHOTREXATE, TRIMETHOPRIM & PYRIMETHAMINE: Ức chế cạnh tranh men DHFR ➔ Ngừng trệ tổng hợp DNA tế bào ung thư, vi khuẩn và ký sinh trùng sốt rét.'
      },
      {
        id: 'methionine_synthase',
        name: 'Methionine Synthase (MS) ⭐',
        type: 'enzyme',
        compartment: 'cytosol',
        x: 660,
        y: 70,
        color: '#8b5cf6',
        description: 'Chuyển nhóm Methyl từ N5-methyl-THF sang Homocysteine để tái sinh Methionine và giải phóng THF tự do.',
        cofactors: ['Vitamin B12 (Cobalamin)'],
        clinicalPharmacology: 'HIỆN TƯỢNG BẪY FOLATE (FOLATE TRAP): Khi thiếu Vitamin B12 ➔ Folate bị kẹt ở dạng N5-methyl-THF không thể biến đổi tiếp ➔ Gây Thiếu Máu Hồng Cầu To (Megaloblastic Anemia).'
      },
      {
        id: 'cbs',
        name: 'Cystathionine β-Synthase (CBS) ⭐',
        type: 'enzyme',
        compartment: 'cytosol',
        x: 460,
        y: 280,
        color: '#ef4444',
        description: 'Chuyển Homocysteine thành Cystathionine trong con đường thoái hóa lưu huỳnh (Transsulfuration).',
        cofactors: ['Vitamin B6 (Pyridoxine)'],
        inbornErrors: [
          {
            disease: 'Bệnh Homocystinuria Bẩm Sinh',
            inheritance: 'Lặn NST thường',
            features: 'Tăng Homocysteine máu và niệu cực nặng ➔ Trật khớp thủy tinh thể lệch xuống dưới (khác Marfan lệch lên), vóc dáng cao gầy kiểu Marfan, loãng xương sớm và NGUY CƠ HUYẾT KHỐI TẮC MẠCH CỰC KỲ CAO ở tuổi trẻ.'
          }
        ],
        labMarkers: ['Homocysteine máu toàn phần', 'Acid Methylmalonic (MMA - tăng trong thiếu B12, bình thường trong thiếu Folate)']
      }
    ],
    edges: [
      { from: 'dhfr', to: 'methionine_synthase', energyLoop: 'Chu trình Folate' },
      { from: 'methionine_synthase', to: 'cbs' }
    ]
  }
};
