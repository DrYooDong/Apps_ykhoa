/**
 * CliniPortal 2.0 — Comprehensive Medical Exam Bank (Hóa Sinh Y Học & Giải Phẫu Sinh Lý)
 * Path: src/content/pathophysiology/quiz/exam-bank-data.ts
 * Nguồn dữ liệu từ 80+ file .md trong knowledge-vault/0. Hóa sinh y học & 0. Giải phẫu & sinh lý
 */

export interface ExamQuestion {
  id: string;
  subject: 'Hóa sinh y học' | 'Giải phẫu & Sinh lý' | 'Sinh lý bệnh';
  subjectKey: 'biochem' | 'physiology' | 'patho';
  topicKey: string;
  topicName: string;
  difficulty: 'Dễ' | 'Vừa' | 'Khó';
  difficultyScore: 1 | 2 | 3;
  question: string;
  options: {
    id: 'A' | 'B' | 'C' | 'D';
    text: string;
  }[];
  correctKey: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  clinicalPearl: string;
  sourceFile: string;
}

export interface TopicMetadata {
  key: string;
  name: string;
  subjectKey: 'biochem' | 'physiology' | 'patho';
  subjectName: string;
  icon: string;
}

export const TOPIC_METADATA_LIST: TopicMetadata[] = [
  // HÓA SINH Y HỌC (7 KHỐI)
  { key: 'biochem_block1_biomolecules', name: 'Khối 1: Đại Phân Tử Sinh Học (Glucid, Lipid, Protid, Acid Nucleic)', subjectKey: 'biochem', subjectName: 'Hóa sinh y học', icon: 'fa-dna' },
  { key: 'biochem_block2_catalysis', name: 'Khối 2: Xúc Tác, Vitamin, Enzyme & Truyền Tín Hiệu', subjectKey: 'biochem', subjectName: 'Hóa sinh y học', icon: 'fa-flask' },
  { key: 'biochem_block3_bioenergetics', name: 'Khối 3: Năng Lượng Sinh Học, Phức Hợp PDH, Chu Trình Krebs & ETC', subjectKey: 'biochem', subjectName: 'Hóa sinh y học', icon: 'fa-bolt' },
  { key: 'biochem_block4_intermediary', name: 'Khối 4: Chuyển Hóa Trung Gian, Chu Trình Ure & Thoái Hóa Hemoglobin', subjectKey: 'biochem', subjectName: 'Hóa sinh y học', icon: 'fa-code-branch' },
  { key: 'biochem_block5_genetics', name: 'Khối 5: Di Truyền Phân Tử, Tái Bản DNA & Kỹ Thuật Sinh Học Phân Tử', subjectKey: 'biochem', subjectName: 'Hóa sinh y học', icon: 'fa-microscope' },
  { key: 'biochem_block6_organ', name: 'Khối 6: Hóa Sinh Cơ Quan, Đông Máu & Tích Hợp Chuyển Hóa', subjectKey: 'biochem', subjectName: 'Hóa sinh y học', icon: 'fa-cubes' },
  { key: 'biochem_block7_clinical', name: 'Khối 7: Hóa Sinh Lâm Sàng, Biện Luận Xét Nghiệm & Dấu Ấn Sinh Học', subjectKey: 'biochem', subjectName: 'Hóa sinh y học', icon: 'fa-vial' },

  // GIẢI PHẪU & SINH LÝ (9 PHẦN)
  { key: 'physio_part1_cell_membrane', name: 'Phần 1: Đại Cương Tế Bào, Màng & Điện Sinh Lý', subjectKey: 'physiology', subjectName: 'Giải phẫu & Sinh lý', icon: 'fa-circle-nodes' },
  { key: 'physio_part2_muscle_nerve', name: 'Phần 2: Cơ Xương, Cơ Trơn, Khớp & Hệ Thần Kinh', subjectKey: 'physiology', subjectName: 'Giải phẫu & Sinh lý', icon: 'fa-brain' },
  { key: 'physio_part3_hematology', name: 'Phần 3: Huyết Học, Hồng Cầu, Bạch Cầu & Cầm Máu', subjectKey: 'physiology', subjectName: 'Giải phẫu & Sinh lý', icon: 'fa-droplet' },
  { key: 'physio_part4_cardiovascular', name: 'Phần 4: Tuần Hoàn, Chu Kỳ Tim, Điện Tâm Đồ & Huyết Áp', subjectKey: 'physiology', subjectName: 'Giải phẫu & Sinh lý', icon: 'fa-heart-pulse' },
  { key: 'physio_part5_respiratory', name: 'Phần 5: Hô Hấp, Cơ Học Phổi, Trao Đổi Khí & Vận Chuyển Khí', subjectKey: 'physiology', subjectName: 'Giải phẫu & Sinh lý', icon: 'fa-lungs' },
  { key: 'physio_part6_digestive', name: 'Phần 6: Tiêu Hóa, Dạ Dày, Ruột, Gan & Tụy Ngoại Tiết', subjectKey: 'physiology', subjectName: 'Giải phẫu & Sinh lý', icon: 'fa-utensils' },
  { key: 'physio_part7_renal_acidbase', name: 'Phần 7: Thận, Lọc Cầu Thận, Cô Đặc Nước Tiểu & Toan Kiềm', subjectKey: 'physiology', subjectName: 'Giải phẫu & Sinh lý', icon: 'fa-filter' },
  { key: 'physio_part8_endocrine_repro', name: 'Phần 8: Nội Tiết Tuyến Yên, Giáp, Thượng Thận & Sinh Sản', subjectKey: 'physiology', subjectName: 'Giải phẫu & Sinh lý', icon: 'fa-shield-halved' },
  { key: 'physio_part9_pediatric_dev', name: 'Phần 9: Sinh Lý Nhi Khoa, Tăng Trưởng & Phát Triển Trẻ Em', subjectKey: 'physiology', subjectName: 'Giải phẫu & Sinh lý', icon: 'fa-baby' }
];

export const EXAM_QUESTION_BANK: ExamQuestion[] = [
  // ==========================================
  // HÓA SINH Y HỌC (BIOCHEMISTRY)
  // ==========================================

  // KHỐI 1: ĐẠI PHÂN TỬ
  {
    id: 'q_bio_01',
    subject: 'Hóa sinh y học',
    subjectKey: 'biochem',
    topicKey: 'biochem_block1_biomolecules',
    topicName: 'Khối 1: Đại Phân Tử Sinh Học',
    difficulty: 'Dễ',
    difficultyScore: 1,
    question: 'Hệ đệm nào giữ vai trò quan trọng nhất trong việc duy trì pH sinh lý của dịch ngoại bào và huyết tương ở mức 7.35 - 7.45?',
    options: [
      { id: 'A', text: 'Hệ đệm Bicarbonate (H2CO3 / HCO3-)' },
      { id: 'B', text: 'Hệ đệm Phosphate (H2PO4- / HPO4 2-)' },
      { id: 'C', text: 'Hệ đệm Hemoglobin trong hồng cầu' },
      { id: 'D', text: 'Hệ đệm Protein huyết tương (Albumin)' }
    ],
    correctKey: 'A',
    explanation: 'Hệ đệm Bicarbonate là hệ đệm ngoại bào quan trọng nhất vì có nồng độ cao và là một "hệ đệm mở": phổi điều hòa pCO2 (thành phần acid) và thận điều hòa nồng độ HCO3- (thành phần kiềm).',
    clinicalPearl: 'Tỷ lệ [HCO3-] / (0.03 * pCO2) bình thường xấp xỉ 24 / 1.2 = 20, tương ứng với pH = 6.1 + log(20) = 7.40 theo phương trình Henderson-Hasselbalch.',
    sourceFile: 'knowledge-vault/0. Hóa sinh y học/block1-biomolecules/01-nuoc-ph-he-dem.md'
  },
  {
    id: 'q_bio_02',
    subject: 'Hóa sinh y học',
    subjectKey: 'biochem',
    topicKey: 'biochem_block1_biomolecules',
    topicName: 'Khối 1: Đại Phân Tử Sinh Học',
    difficulty: 'Vừa',
    difficultyScore: 2,
    question: 'Apolipoprotein nào đóng vai trò là phối tử gắn với thụ thể LDL-R trên màng tế bào để đưa cholesterol vào tế bào theo cơ chế nhập bào?',
    options: [
      { id: 'A', text: 'Apo B-100' },
      { id: 'B', text: 'Apo A-I' },
      { id: 'C', text: 'Apo C-II' },
      { id: 'D', text: 'Apo E' }
    ],
    correctKey: 'A',
    explanation: 'Apo B-100 có mặt trên hạt LDL và VLDL, là phối tử đặc hiệu nhận diện bởi thụ thể LDL Receptor. Đột biến gen Apo B-100 hoặc thụ thể LDL-R gây bệnh Tăng cholesterol máu gia đình (Familial Hypercholesterolemia).',
    clinicalPearl: 'Apo A-I là thành phần chính của HDL kích hoạt enzyme LCAT; Apo C-II kích hoạt Lipoprotein Lipase (LPL) để thủy phân triglycerid từ chylomicron và VLDL.',
    sourceFile: 'knowledge-vault/0. Hóa sinh y học/block1-biomolecules/03-hoa-hoc-lipid.md'
  },
  {
    id: 'q_bio_03',
    subject: 'Hóa sinh y học',
    subjectKey: 'biochem',
    topicKey: 'biochem_block1_biomolecules',
    topicName: 'Khối 1: Đại Phân Tử Sinh Học',
    difficulty: 'Khó',
    difficultyScore: 3,
    question: 'Trong bệnh lý Hemoglobin S (Bệnh hồng cầu hình liềm), đột biến điểm xảy ra tại chuỗi beta-globin liên quan đến sự thay đổi acid amin nào?',
    options: [
      { id: 'A', text: 'Acid Glutamic (tích điện âm) ở vị trí số 6 bị thay thế bởi Valine (kỵ nước)' },
      { id: 'B', text: 'Acid Glutamic ở vị trí số 6 bị thay thế bởi Lysine (tích điện dương)' },
      { id: 'C', text: 'Histidine gần (F8) bị thay thế bởi Tyrosine gây oxy hóa Fe2+ thành Fe3+' },
      { id: 'D', text: 'Glycine ở vị trí số 12 bị thay thế bởi Alanine' }
    ],
    correctKey: 'A',
    explanation: 'HbS là do đột biến nucleotide GAG -> GTG tại codon 6 của gen HBB, thay thế Acid Glutamic phân cực bằng Valine kỵ nước. Khi phân áp oxy giảm, các phân tử khử oxy-HbS trùng hợp tạo thành các sợi polyme dạng que dài làm biến dạng hồng cầu thành hình liềm.',
    clinicalPearl: 'Nếu Glutamate ở vị trí 6 bị thay bằng Lysine thì tạo thành Hemoglobin C (HbC).',
    sourceFile: 'knowledge-vault/0. Hóa sinh y học/block1-biomolecules/05-hoa-hoc-hemoglobin.md'
  },

  // KHỐI 2: XÚC TÁC & ENZYME & VITAMIN
  {
    id: 'q_bio_04',
    subject: 'Hóa sinh y học',
    subjectKey: 'biochem',
    topicKey: 'biochem_block2_catalysis',
    topicName: 'Khối 2: Enzyme, Vitamin & Truyền Tin',
    difficulty: 'Vừa',
    difficultyScore: 2,
    question: 'Vitamin nào là tiền chất của coenzyme Thiamine Pyrophosphate (TPP) tham gia vào phản ứng khử carboxyl oxy hóa của phức hợp Pyruvate Dehydrogenase và alpha-Ketoglutarate Dehydrogenase?',
    options: [
      { id: 'A', text: 'Vitamin B1 (Thiamine)' },
      { id: 'B', text: 'Vitamin B2 (Riboflavin)' },
      { id: 'C', text: 'Vitamin B3 (Niacin)' },
      { id: 'D', text: 'Vitamin B6 (Pyridoxine)' }
    ],
    correctKey: 'A',
    explanation: 'Vitamin B1 được phosphoryl hóa thành TPP, là coenzyme bắt buộc của các enzyme khử carboxyl alpha-keto acid (PDH, alpha-KGDH) và enzyme Transketolase trong con đường Pentose Phosphate.',
    clinicalPearl: 'Thiếu hụt Vitamin B1 ở người nghiện rượu gây hội chứng não Wernicke-Korsakoff và bệnh Beriberi (ướt/khô). Bắt buộc phải truyền Thiamine trước khi truyền Glucose cho bệnh nhân nghiện rượu để tránh làm khởi phát toan lactic cấp và hôn mê Wernicke.',
    sourceFile: 'knowledge-vault/0. Hóa sinh y học/block2-catalysis-signaling/07-vitamin-coenzym.md'
  },
  {
    id: 'q_bio_05',
    subject: 'Hóa sinh y học',
    subjectKey: 'biochem',
    topicKey: 'biochem_block2_catalysis',
    topicName: 'Khối 2: Enzyme, Vitamin & Truyền Tin',
    difficulty: 'Khó',
    difficultyScore: 3,
    question: 'Khi thêm một chất ức chế cạnh tranh (Competitive Inhibitor) vào phản ứng enzyme, thông số động học Michaelis-Menten sẽ thay đổi như thế nào?',
    options: [
      { id: 'A', text: 'Km biểu kiến tăng, Vmax không thay đổi' },
      { id: 'B', text: 'Km không đổi, Vmax giảm' },
      { id: 'C', text: 'Cả Km và Vmax đều giảm' },
      { id: 'D', text: 'Cả Km và Vmax đều tăng' }
    ],
    correctKey: 'A',
    explanation: 'Chất ức chế cạnh tranh tranh chấp vị trí trung tâm hoạt động với cơ chất. Khi nồng độ cơ chất [S] tăng đủ cao, cơ chất sẽ đẩy chất ức chế ra ngoài nên Vmax vẫn đạt được (không đổi), nhưng cần nồng độ cơ chất cao hơn để đạt nửa Vmax nên Km biểu kiến tăng lên.',
    clinicalPearl: 'Thuốc statin (Atorvastatin) là chất ức chế cạnh tranh của HMG-CoA Reductase; Thuốc giải độc Methanol Fomepizole là chất ức chế cạnh tranh của Alcohol Dehydrogenase.',
    sourceFile: 'knowledge-vault/0. Hóa sinh y học/block2-catalysis-signaling/08-enzym-dong-hoc.md'
  },

  // KHỐI 3: NĂNG LƯỢNG SINH HỌC & KREBS
  {
    id: 'q_bio_06',
    subject: 'Hóa sinh y học',
    subjectKey: 'biochem',
    topicKey: 'biochem_block3_bioenergetics',
    topicName: 'Khối 3: Năng Lượng Sinh Học & Chu Trình Krebs',
    difficulty: 'Vừa',
    difficultyScore: 2,
    question: 'Một vòng quay của Chu trình Acid Citric (Chu trình Krebs) oxy hóa hoàn toàn một phân tử Acetyl-CoA sẽ trực tiếp tạo ra bao nhiêu phân tử NADH, FADH2 và GTP?',
    options: [
      { id: 'A', text: '3 NADH, 1 FADH2, 1 GTP' },
      { id: 'B', text: '2 NADH, 2 FADH2, 2 ATP' },
      { id: 'C', text: '4 NADH, 0 FADH2, 1 GTP' },
      { id: 'D', text: '1 NADH, 3 FADH2, 2 GTP' }
    ],
    correctKey: 'A',
    explanation: 'Mỗi vòng chu trình Krebs giải phóng 2 phân tử CO2, tạo ra 3 NADH (ở phản ứng Isocitrate DH, alpha-Ketoglutarate DH, Malate DH), 1 FADH2 (Succinate DH), và 1 GTP (Succinyl-CoA Synthetase). Khi đi qua chuỗi chuyền điện tử, 3 NADH sinh ~7.5 ATP, 1 FADH2 sinh ~1.5 ATP, cùng 1 GTP = 1 ATP ➔ Tổng cộng 10 ATP / 1 Acetyl-CoA.',
    clinicalPearl: 'Succinate Dehydrogenase (Phức hợp II) là enzyme duy nhất của chu trình Krebs gắn trực tiếp trên màng trong ti thể và tham gia vào chuỗi truyền điện tử.',
    sourceFile: 'knowledge-vault/0. Hóa sinh y học/block3-bioenergetics/12-chu-trinh-krebs.md'
  },
  {
    id: 'q_bio_07',
    subject: 'Hóa sinh y học',
    subjectKey: 'biochem',
    topicKey: 'biochem_block3_bioenergetics',
    topicName: 'Khối 3: Năng Lượng Sinh Học & Chu Trình Krebs',
    difficulty: 'Khó',
    difficultyScore: 3,
    question: 'Chất ức chế nào sau đây gắn vào phức hợp IV (Cytochrome c Oxidase) của chuỗi hô hấp tế bào làm ngừng trệ hoàn toàn sự vận chuyển điện tử tới Oxy?',
    options: [
      { id: 'A', text: 'Cyanide (CN-) và Carbon Monoxide (CO)' },
      { id: 'B', text: 'Rotenone và Amytal' },
      { id: 'C', text: 'Antimycin A' },
      { id: 'D', text: 'Oligomycin' },
    ],
    correctKey: 'A',
    explanation: 'Cyanide (CN-), CO và Azide (N3-) ức chế Phức hợp IV (Cytochrome a/a3) bằng cách gắn chặt vào nhóm Fe3+ và CuB, ngăn chặn sự gắn oxy phân tử. Hậu quả là ngừng hô hấp tế bào, ứ đọng NADH/FADH2, tê liệt chu trình Krebs và chuyển sang đường phân kỵ khí sinh toan lactic nặng.',
    clinicalPearl: 'Thuốc giải độc Cyanide gồm Hydroxocobalamin (tạo Cyanocobalamin thải qua nước tiểu) hoặc Bộ kit Nitrite + Sodium Thiosulfate.',
    sourceFile: 'knowledge-vault/0. Hóa sinh y học/block3-bioenergetics/13-chuoi-ho-hap-etc.md'
  },

  // KHỐI 4: CHUYỂN HÓA TRUNG GIAN
  {
    id: 'q_bio_08',
    subject: 'Hóa sinh y học',
    subjectKey: 'biochem',
    topicKey: 'biochem_block4_intermediary',
    topicName: 'Khối 4: Chuyển Hóa Trung Gian & Ure',
    difficulty: 'Vừa',
    difficultyScore: 2,
    question: 'Sản phẩm thoái hóa cuối cùng của các base purine (Adenine và Guanine) ở người được đào thải qua nước tiểu là gì?',
    options: [
      { id: 'A', text: 'Acid Uric' },
      { id: 'B', text: 'Ure' },
      { id: 'C', text: 'Allantoin' },
      { id: 'D', text: 'Beta-Alanine' }
    ],
    correctKey: 'A',
    explanation: 'Ở người và linh trưởng bậc cao do thiếu men Urate Oxidase (Uricase), sản phẩm thoái hóa cuối cùng của purine là Acid Uric thông qua xúc tác của enzyme Xanthine Oxidase.',
    clinicalPearl: 'Thuốc điều trị Gout Allopurinol và Febuxostat ức chế enzyme Xanthine Oxidase làm giảm nồng độ acid uric huyết thanh và tăng đào thải các tiền chất tan tốt hơn là Hypoxanthine và Xanthine.',
    sourceFile: 'knowledge-vault/0. Hóa sinh y học/block4-intermediary-metabolism/18-chuyen-hoa-nucleotid-gout.md'
  },
  {
    id: 'q_bio_09',
    subject: 'Hóa sinh y học',
    subjectKey: 'biochem',
    topicKey: 'biochem_block4_intermediary',
    topicName: 'Khối 4: Chuyển Hóa Trung Gian & Ure',
    difficulty: 'Khó',
    difficultyScore: 3,
    question: 'Trong quá trình thoái hóa Hemoglobin tại hệ liên võng nội mô, enzyme nào xúc tác cho phản ứng mở vòng Porphyrin để tạo thành Biliverdin, đồng thời giải phóng Fe2+ và khí Carbon Monoxide (CO)?',
    options: [
      { id: 'A', text: 'Heme Oxygenase' },
      { id: 'B', text: 'Biliverdin Reductase' },
      { id: 'C', text: 'UDP-Glucuronosyltransferase (UGT1A1)' },
      { id: 'D', text: 'ALA Synthase' }
    ],
    correctKey: 'A',
    explanation: 'Heme Oxygenase (HO-1/HO-2) sử dụng NADPH và O2 để mở cầu nối alpha-methenyl của nhân porphyrin, tạo Biliverdin màu xanh lá cây, giải phóng ion Sắt và khí CO nội sinh duy nhất trong cơ thể.',
    clinicalPearl: 'Đột biến gen UGT1A1 làm suy giảm quá trình liên hợp Bilirubin tại gan, gây ra các hội chứng vàng da di truyền: Hội chứng Gilbert (nhẹ, lành tính) và Hội chứng Crigler-Najjar (nặng, có thể gây vàng da nhân).',
    sourceFile: 'knowledge-vault/0. Hóa sinh y học/block4-intermediary-metabolism/17-chuyen-hoa-hemoglobin-bilirubin.md'
  },

  // KHỐI 5: DI TRUYỀN PHÂN TỬ
  {
    id: 'q_bio_10',
    subject: 'Hóa sinh y học',
    subjectKey: 'biochem',
    topicKey: 'biochem_block5_genetics',
    topicName: 'Khối 5: Di Truyền Phân Tử & Kỹ Thuật Gen',
    difficulty: 'Vừa',
    difficultyScore: 2,
    question: 'Enzyme nào chịu trách nhiệm tháo xoắn chuỗi xoắn kép DNA tại chạc ba tái bản bằng cách cắt đứt các liên kết hydro giữa hai mạch?',
    options: [
      { id: 'A', text: 'DNA Helicase' },
      { id: 'B', text: 'DNA Topoisomerase (Gyrase)' },
      { id: 'C', text: 'DNA Polymerase III' },
      { id: 'D', text: 'DNA Ligase' }
    ],
    correctKey: 'A',
    explanation: 'DNA Helicase sử dụng năng lượng ATP để phá vỡ các liên kết hydro giữa các cặp base bổ sung, tách 2 mạch đơn tạo chạc ba tái bản. DNA Topoisomerase làm nhiệm vụ cắt và nối lại mạch để giải tỏa sức căng siêu xoắn phía trước chạc ba.',
    clinicalPearl: 'Thuốc kháng sinh nhóm Fluoroquinolone (Ciprofloxacin) ức chế enzyme DNA Gyrase của vi khuẩn; Thuốc chống ung thư Etoposide ức chế Topoisomerase II của tế bào người.',
    sourceFile: 'knowledge-vault/0. Hóa sinh y học/block5-molecular-genetics/19-tai-ban-sua-sai-dna.md'
  },

  // KHỐI 7: HÓA SINH LÂM SÀNG
  {
    id: 'q_bio_11',
    subject: 'Hóa sinh y học',
    subjectKey: 'biochem',
    topicKey: 'biochem_block7_clinical',
    topicName: 'Khối 7: Hóa Sinh Lâm Sàng',
    difficulty: 'Dễ',
    difficultyScore: 1,
    question: 'Dấu ấn sinh học nào có độ đặc hiệu và độ nhạy cao nhất để chẩn đoán hoại tử tế bào cơ tim trong nhồi máu cơ tim cấp?',
    options: [
      { id: 'A', text: 'High-sensitivity Cardiac Troponin (hs-cTnI / hs-cTnT)' },
      { id: 'B', text: 'Creatine Kinase MB (CK-MB)' },
      { id: 'C', text: 'Myoglobin' },
      { id: 'D', text: 'Lactate Dehydrogenase (LDH-1)' }
    ],
    correctKey: 'A',
    explanation: 'Hs-Troponin tim là tiêu chuẩn vàng theo định nghĩa toàn cầu lần thứ 4 về Nhồi máu cơ tim, xuất hiện sớm sau 1-3 giờ, đạt đỉnh sau 12-24 giờ và có thể tồn tại trong máu 1-2 tuần.',
    clinicalPearl: 'CK-MB có thời gian bán hủy ngắn (trở về bình thường sau 48-72h) nên rất có giá trị để chẩn đoán Nhồi máu cơ tim tái phát sớm (Reinfarction).',
    sourceFile: 'knowledge-vault/0. Hóa sinh y học/block7-clinical-biochemistry/28-dau-an-tim-mach-troponin-bnp.md'
  },

  // ==========================================
  // GIẢI PHẪU & SINH LÝ HỌC (PHYSIOLOGY)
  // ==========================================

  // PHẦN 1: MÀNG & ĐIỆN SINH LÝ
  {
    id: 'q_phys_01',
    subject: 'Giải phẫu & Sinh lý',
    subjectKey: 'physiology',
    topicKey: 'physio_part1_cell_membrane',
    topicName: 'Phần 1: Tế Bào, Màng & Điện Sinh Lý',
    difficulty: 'Dễ',
    difficultyScore: 1,
    question: 'Pha 0 khử cực nhanh của điện thế hoạt động ở sợi trục thần kinh và tế bào cơ tâm thất được tạo ra bởi dòng ion nào?',
    options: [
      { id: 'A', text: 'Dòng Na+ nhanh ồ ạt đi vào trong tế bào qua kênh Na+ có cổng điện thế' },
      { id: 'B', text: 'Dòng K+ đi ra ngoài tế bào qua kênh K+ rò rỉ' },
      { id: 'C', text: 'Dòng Ca2+ chậm đi vào qua kênh L-type' },
      { id: 'D', text: 'Dòng Cl- đi vào trong tế bào' }
    ],
    correctKey: 'A',
    explanation: 'Khi điện thế màng đạt ngưỡng (~ -55 mV), các kênh Na+ phụ thuộc điện thế mở ra đồng loạt theo cơ chế feedback dương của Hodgkin, làm Na+ tràn vào tế bào đẩy điện thế màng vọt lên mức dương (+20 đến +30 mV).',
    clinicalPearl: 'Thuốc tê Lidocaine chẹn cổng trong của kênh Na+ phụ thuộc điện thế, ngăn chặn pha 0 khử cực nên ức chế dẫn truyền cảm giác đau.',
    sourceFile: 'knowledge-vault/0. Giải phẫu & sinh lý/0.1. Đại cương & Tế bào/SL_Điện thế màng & Điện thế hoạt động.md'
  },
  {
    id: 'q_phys_02',
    subject: 'Giải phẫu & Sinh lý',
    subjectKey: 'physiology',
    topicKey: 'physio_part1_cell_membrane',
    topicName: 'Phần 1: Tế Bào, Màng & Điện Sinh Lý',
    difficulty: 'Khó',
    difficultyScore: 3,
    question: 'Trong phương trình Nernst, nếu nồng độ Kali ngoại bào giảm từ 4.0 mmol/L xuống 2.0 mmol/L (Hạ Kali máu), điện thế cân bằng của Kali (E_K) sẽ thay đổi như thế nào?',
    options: [
      { id: 'A', text: 'Trở nên âm hơn (Ưu phân cực màng)' },
      { id: 'B', text: 'Trở nên bớt âm hơn (Khử cực màng)' },
      { id: 'C', text: 'Không thay đổi vì nồng độ nội bào không đổi' },
      { id: 'D', text: 'Chuyển sang giá trị dương' }
    ],
    correctKey: 'A',
    explanation: 'E_K = 61.5 * log10([K+]out / [K+]in). Khi [K+]out giảm, tỷ số [K+]out / [K+]in càng nhỏ hơn 1 ➔ log10 có giá trị âm lớn hơn ➔ E_K dịch từ -90 mV xuống -105 mV (Ưu phân cực màng), khiến tế bào khó bị kích thích hơn.',
    clinicalPearl: 'Hạ kali máu làm giảm tính hưng phấn thần kinh cơ gây liệt mềm 2 chi dưới, giảm nhu động ruột gây chướng bụng liệt ruột, và kéo dài khoảng QT tạo sóng U trên ECG.',
    sourceFile: 'knowledge-vault/0. Giải phẫu & sinh lý/0.1. Đại cương & Tế bào/SL_Điện thế màng & Điện thế hoạt động.md'
  },

  // PHẦN 2: CƠ & THẦN KINH
  {
    id: 'q_phys_03',
    subject: 'Giải phẫu & Sinh lý',
    subjectKey: 'physiology',
    topicKey: 'physio_part2_muscle_nerve',
    topicName: 'Phần 2: Cơ & Hệ Thần Kinh',
    difficulty: 'Vừa',
    difficultyScore: 2,
    question: 'Trong cơ chế co cơ vân, ion Canxi (Ca2+) giải phóng từ lưới nội chất tương gắn vào protein điều hòa nào để làm bộc lộ vị trí gắn của Actin với Myosin?',
    options: [
      { id: 'A', text: 'Troponin C' },
      { id: 'B', text: 'Tropomyosin' },
      { id: 'C', text: 'Calmodulin' },
      { id: 'D', text: 'Myosin Light Chain Kinase (MLCK)' }
    ],
    correctKey: 'A',
    explanation: 'Ở cơ vân, Ca2+ gắn vào Troponin C làm biến đổi cấu trúc phức hợp Troponin, kéo sợi Tropomyosin ra khỏi rãnh của sợi Actin, để lộ vị trí gắn của đầu Myosin lên phân tử Actin hình thành cầu nối chéo.',
    clinicalPearl: 'Ở cơ trơn không có Troponin; thay vào đó Ca2+ tạo phức hợp với Calmodulin để kích hoạt men MLCK phosphoryl hóa chuỗi nhẹ myosin.',
    sourceFile: 'knowledge-vault/0. Giải phẫu & sinh lý/0.2. Cơ & Thần kinh/SL_Co xuong.md'
  },
  {
    id: 'q_phys_04',
    subject: 'Giải phẫu & Sinh lý',
    subjectKey: 'physiology',
    topicKey: 'physio_part2_muscle_nerve',
    topicName: 'Phần 2: Cơ & Hệ Thần Kinh',
    difficulty: 'Khó',
    difficultyScore: 3,
    question: 'Tổn thương thùy trán bên bán cầu ưu thế tại vùng Broca (Vùng 44, 45 Brodmann) sẽ dẫn tới triệu chứng lâm sàng nào sau đây?',
    options: [
      { id: 'A', text: 'Mất ngôn ngữ diễn đạt (Broca aphasia) - hiểu lời nói nhưng không nói lưu loát được' },
      { id: 'B', text: 'Mất ngôn ngữ tiếp nhận (Wernicke aphasia) - nói trôi chảy nhưng vô nghĩa và không hiểu lời nói' },
      { id: 'C', text: 'Mất trí nhớ ngắn hạn hoàn toàn' },
      { id: 'D', text: 'Mù màu vỏ não' }
    ],
    correctKey: 'A',
    explanation: 'Vùng Broca ở hồi trán dưới phụ trách vận động tạo lời nói. Tổn thương Broca gây thất ngôn không lưu loát: bệnh nhân hiểu được câu hỏi của bác sĩ nhưng rất vất vả để phát âm từng từ ngắn, ngữ pháp gãy gọn.',
    clinicalPearl: 'Vùng Wernicke nằm ở hồi thái dương trên vùng sau, phụ trách hiểu ngôn ngữ; tổn thương gây thất ngôn lưu loát (Wernicke aphasia - "salad từ ngữ").',
    sourceFile: 'knowledge-vault/0. Giải phẫu & sinh lý/0.2. Cơ & Thần kinh/SL_Thần kinh_Vỏ não & Chức năng thần kinh cao cấp.md'
  },

  // PHẦN 3: HUYẾT HỌC
  {
    id: 'q_phys_05',
    subject: 'Giải phẫu & Sinh lý',
    subjectKey: 'physiology',
    topicKey: 'physio_part3_hematology',
    topicName: 'Phần 3: Huyết Học & Cầm Máu',
    difficulty: 'Dễ',
    difficultyScore: 1,
    question: 'Hormone nào do tế bào kẽ quanh ống thận tiết ra để kích thích tủy xương tăng sinh hồng cầu khi nồng độ oxy mô giảm?',
    options: [
      { id: 'A', text: 'Erythropoietin (EPO)' },
      { id: 'B', text: 'Thrombopoietin (TPO)' },
      { id: 'C', text: 'Granulocyte Colony-Stimulating Factor (G-CSF)' },
      { id: 'D', text: 'Aldosterone' }
    ],
    correctKey: 'A',
    explanation: 'Erythropoietin (90% do tế bào quanh ống thận tiết ra, 10% ở gan) được cảm ứng bởi yếu tố phiên mã nhạy cảm oxy HIF-1alpha khi mô thận bị thiếu oxy.',
    clinicalPearl: 'Bệnh nhân suy thận mạn (CKD) giảm tiết EPO dẫn tới thiếu máu đẳng sắc đẳng bào, cần điều trị bổ sung Erythropoietin tái tổ hợp (rhEPO).',
    sourceFile: 'knowledge-vault/0. Giải phẫu & sinh lý/0.3. Huyết học/SL_Huyết học_Hồng cầu.md'
  },
  {
    id: 'q_phys_06',
    subject: 'Giải phẫu & Sinh lý',
    subjectKey: 'physiology',
    topicKey: 'physio_part3_hematology',
    topicName: 'Phần 3: Huyết Học & Cầm Máu',
    difficulty: 'Vừa',
    difficultyScore: 2,
    question: 'Xét nghiệm thời gian Prothrombin (PT / INR) phản ánh chức năng của con đường đông máu nào?',
    options: [
      { id: 'A', text: 'Con đường ngoại sinh và con đường chung (Yếu tố VII, X, V, II, I)' },
      { id: 'B', text: 'Con đường nội sinh (Yếu tố XII, XI, IX, VIII)' },
      { id: 'C', text: 'Chức năng ngưng tập tiểu cầu đơn thuần' },
      { id: 'D', text: 'Tốc độ tiêu sợi huyết Fibrinolysis' }
    ],
    correctKey: 'A',
    explanation: 'PT đo thời gian đông máu khi bổ sung Yếu tố mô (Tissue Factor) và Canxi, phản ánh con đường ngoại sinh (Yếu tố VII) và con đường chung. aPTT phản ánh con đường nội sinh.',
    clinicalPearl: 'Thuốc chống đông kháng Vitamin K (Warfarin) ức chế tổng hợp các yếu tố đông máu phụ thuộc Vitamin K (II, VII, IX, X, Protein C/S), được theo dõi hiệu quả bằng chỉ số INR (từ xét nghiệm PT).',
    sourceFile: 'knowledge-vault/0. Giải phẫu & sinh lý/0.3. Huyết học/SL_Huyết học_Tiểu cầu & Cầm máu.md'
  },

  // PHẦN 4: TUẦN HOÀN & TIM MẠCH
  {
    id: 'q_phys_07',
    subject: 'Giải phẫu & Sinh lý',
    subjectKey: 'physiology',
    topicKey: 'physio_part4_cardiovascular',
    topicName: 'Phần 4: Tim Mạch & Huyết Áp',
    difficulty: 'Dễ',
    difficultyScore: 1,
    question: 'Nút nào giữ vai trò là "Bộ tạo nhịp tự nhiên chủ đạo" (Dominant Pacemaker) của tim với tần số phát nhịp sinh lý cao nhất (60 - 100 lần/phút)?',
    options: [
      { id: 'A', text: 'Nút Xoang nhĩ (SA node)' },
      { id: 'B', text: 'Nút Nhĩ thất (AV node)' },
      { id: 'C', text: 'Bó His' },
      { id: 'D', text: 'Mạng lưới Purkinje' }
    ],
    correctKey: 'A',
    explanation: 'Nút xoang nằm ở ranh giới tĩnh mạch chủ trên và tâm nhĩ phải, có pha 4 khử cực tâm trương tự phát dốc nhất do dòng ion Funny (If - Na+/K+ đi vào) làm điện thế màng tự động chạm ngưỡng phát nhịp nhanh nhất.',
    clinicalPearl: 'Thuốc Ivabradine chẹn chọn lọc kênh If tại nút xoang, giúp làm chậm nhịp tim mà không ảnh hưởng đến sức co bóp cơ tim hay huyết áp.',
    sourceFile: 'knowledge-vault/0. Giải phẫu & sinh lý/0.4. Tuần hoàn & Tim mạch/SL_Tim mạch_Cơ tim & Hoạt động điện.md'
  },
  {
    id: 'q_phys_08',
    subject: 'Giải phẫu & Sinh lý',
    subjectKey: 'physiology',
    topicKey: 'physio_part4_cardiovascular',
    topicName: 'Phần 4: Tim Mạch & Huyết Áp',
    difficulty: 'Khó',
    difficultyScore: 3,
    question: 'Tiếng tim thứ hai (T2) trên thính chẩn tim xuất hiện do sự đóng lại của các van tim nào?',
    options: [
      { id: 'A', text: 'Van Động mạch chủ (A2) và Van Động mạch phổi (P2)' },
      { id: 'B', text: 'Van Hai lá (M1) và Van Ba lá (T1)' },
      { id: 'C', text: 'Dòng máu đổ về tâm thất nhanh trong đầu tâm trương' },
      { id: 'D', text: 'Tâm nhĩ co bóp tống máu vào tâm thất cứng' }
    ],
    correctKey: 'A',
    explanation: 'Tiếng T2 đánh dấu kết thúc thời kỳ tâm thu tống máu và bắt đầu thời kỳ tâm trương, phát sinh do sự đóng đột ngột của van tổ chim (Van ĐMC và Van ĐMP). Tiếng T1 do đóng van nhĩ thất (2 lá và 3 lá).',
    clinicalPearl: 'Hiện tượng tách đôi sinh lý của T2 (Physiological splitting): Khi hít vào sâu, áp lực âm lồng ngực làm tăng máu về tim phải ➔ Van ĐMP đóng muộn hơn van ĐMC, nghe thấy T2 tách đôi rõ (A2 trước, P2 sau).',
    sourceFile: 'knowledge-vault/0. Giải phẫu & sinh lý/0.4. Tuần hoàn & Tim mạch/SL_Tim mạch_Chu kỳ tim & Cung lượng tim.md'
  },

  // PHẦN 5: HÔ HẤP
  {
    id: 'q_phys_09',
    subject: 'Giải phẫu & Sinh lý',
    subjectKey: 'physiology',
    topicKey: 'physio_part5_respiratory',
    topicName: 'Phần 5: Hô Hấp & Trao Đổi Khí',
    difficulty: 'Dễ',
    difficultyScore: 1,
    question: 'Chất hoạt diện Surfactant do tế bào biểu mô phế nang Type II tiết ra có vai trò cốt lõi nào?',
    options: [
      { id: 'A', text: 'Làm giảm sức căng bề mặt của phế nang, ngăn ngừa xẹp phế nang ở cuối thì thở ra' },
      { id: 'B', text: 'Làm tăng sức cản đường dẫn khí lớn' },
      { id: 'C', text: 'Kích thích phản xạ ho đào thải đờm' },
      { id: 'D', text: 'Tăng cường khuếch tán khí CO2 qua màng phế nang' }
    ],
    correctKey: 'A',
    explanation: 'Theo định luật Laplace: P = 2T / r. Nếu không có Surfactant (thành phần chính là Dipalmitoylphosphatidylcholine - DPPC), phế nang nhỏ (r nhỏ) sẽ có áp lực xẹp P rất lớn và xẹp đổ vào phế nang lớn. Surfactant làm giảm sức căng T ở phế nang nhỏ nhiều hơn phế nang lớn, giúp ổn định phế nang.',
    clinicalPearl: 'Hội chứng suy hô hấp sơ sinh ở trẻ sinh non (NRDS) là do thiếu hụt Surfactant do tế bào Type II chưa trưởng thành (thường trước tuần 34 thai kỳ). Điều trị dự phòng bằng tiêm Corticoid (Betamethasone) cho mẹ trước sinh.',
    sourceFile: 'knowledge-vault/0. Giải phẫu & sinh lý/0.5. Hô hấp/SL_Hô hấp_Cơ học hô hấp & Thông khí phế nang.md'
  },
  {
    id: 'q_phys_10',
    subject: 'Giải phẫu & Sinh lý',
    subjectKey: 'physiology',
    topicKey: 'physio_part5_respiratory',
    topicName: 'Phần 5: Hô Hấp & Trao Đổi Khí',
    difficulty: 'Vừa',
    difficultyScore: 2,
    question: 'Thể tích khí còn lại trong phổi sau khi đã thở ra tối đa được gọi là gì?',
    options: [
      { id: 'A', text: 'Thể tích khí cặn (Residual Volume - RV)' },
      { id: 'B', text: 'Thể tích khí lưu thông (Tidal Volume - Vt)' },
      { id: 'C', text: 'Dung tích sống (Vital Capacity - VC)' },
      { id: 'D', text: 'Thể tích dự trữ thở ra (Expiratory Reserve Volume - ERV)' }
    ],
    correctKey: 'A',
    explanation: 'Thể tích khí cặn (RV) là thể tích khí không bao giờ tống ra khỏi phổi được ngay cả khi gắng sức thở ra hết mức. RV không thể đo được bằng hô hấp ký thông thường (Spirometry) mà phải dùng phương pháp đo pha loãng khí Heli hoặc Thân thể ký (Plethysmography).',
    clinicalPearl: 'Trong bệnh phổi tắc nghẽn mạn tính (COPD), hiện tượng bẫy khí làm RV và Dung tích cặn chức năng (FRC) tăng cao rõ rệt.',
    sourceFile: 'knowledge-vault/0. Giải phẫu & sinh lý/0.5. Hô hấp/SL_Hô hấp_Cơ học hô hấp & Thông khí phế nang.md'
  },

  // PHẦN 6: TIÊU HÓA
  {
    id: 'q_phys_11',
    subject: 'Giải phẫu & Sinh lý',
    subjectKey: 'physiology',
    topicKey: 'physio_part6_digestive',
    topicName: 'Phần 6: Tiêu Hóa & Gan Mật',
    difficulty: 'Dễ',
    difficultyScore: 1,
    question: 'Tế bào viền (Parietal cells) ở niêm mạc thân và đáy dạ dày bài tiết những chất nào sau đây?',
    options: [
      { id: 'A', text: 'Acid Hydrochloric (HCl) và Yếu tố nội tại (Intrinsic Factor)' },
      { id: 'B', text: 'Pepsinogen và Lipase dạ dày' },
      { id: 'C', text: 'Gastrin và Histamin' },
      { id: 'D', text: 'Somatostatin và Bicarbonate' }
    ],
    correctKey: 'A',
    explanation: 'Tế bào viền sử dụng bơm proton H+/K+ ATPase để tiết HCl giúp toan hóa dịch vị (pH 1.5 - 2.0) và tiết Yếu tố nội tại (IF) - glycoprotein bắt buộc cho sự hấp thu Vitamin B12 tại đoạn cuối hồi tràng.',
    clinicalPearl: 'Viêm teo dạ dày tự miễn phá hủy tế bào viền gây thiếu acid dịch vị và thiếu yếu tố nội tại, dẫn đến bệnh Thiếu máu ác tính Biermer (Pernicious Anemia) do thiếu B12.',
    sourceFile: 'knowledge-vault/0. Giải phẫu & sinh lý/0.6. Tiêu hóa/SL_Tiêu hóa_Dạ dày.md'
  },
  {
    id: 'q_phys_12',
    subject: 'Giải phẫu & Sinh lý',
    subjectKey: 'physiology',
    topicKey: 'physio_part6_digestive',
    topicName: 'Phần 6: Tiêu Hóa & Gan Mật',
    difficulty: 'Vừa',
    difficultyScore: 2,
    question: 'Hormone Cholecystokinin (CCK) do tế bào I của niêm mạc tá tràng tiết ra khi tiếp xúc với lipid và acid amin có tác dụng sinh lý chính nào?',
    options: [
      { id: 'A', text: 'Co bóp túi mật và kích thích tụy ngoại tiết bài tiết enzyme tiêu hóa giàu protein' },
      { id: 'B', text: 'Kích thích tụy tiết lượng lớn dịch kiềm giàu Bicarbonate' },
      { id: 'C', text: 'Kích thích dạ dày tăng co bóp và tăng tiết acid HCl' },
      { id: 'D', text: 'Giãn cơ vòng Oddi làm ngừng bài xuất mật vào tá tràng' }
    ],
    correctKey: 'A',
    explanation: 'CCK gây co bóp túi mật tống mật vào ống mật chủ, đồng thời làm giãn cơ vòng Oddi và kích thích tế bào nang tuyến tụy tiết enzyme (Amylase, Lipase, Protease). Ngược lại, Secretin (do tế bào S tiết ra dưới kích thích của acid) kích thích tế bào biểu mô ống tụy tiết dịch giàu HCO3-.',
    clinicalPearl: 'Nghiệm pháp kích thích CCK được dùng trong chẩn đoán suy chức năng túi mật và rối loạn cơ vòng Oddi.',
    sourceFile: 'knowledge-vault/0. Giải phẫu & sinh lý/0.6. Tiêu hóa/SL_Tiêu hóa_Gan & Tụy ngoại tiết.md'
  },

  // PHẦN 7: THẬN & TOAN KIỀM
  {
    id: 'q_phys_13',
    subject: 'Giải phẫu & Sinh lý',
    subjectKey: 'physiology',
    topicKey: 'physio_part7_renal_acidbase',
    topicName: 'Phần 7: Thận & Thăng Bằng Toan Kiềm',
    difficulty: 'Vừa',
    difficultyScore: 2,
    question: 'Vị trí nào dọc theo nephron là nơi tái hấp thu phần lớn lượng nước, Na+, K+, Bicarbonate và 100% Glucose, Acid amin được lọc qua cầu thận?',
    options: [
      { id: 'A', text: 'Ống lượn gần (Proximal Convoluted Tubule - PCT)' },
      { id: 'B', text: 'Nhánh xuống quai Henle' },
      { id: 'C', text: 'Ống lượn xa (Distal Convoluted Tubule - DCT)' },
      { id: 'D', text: 'Ống góp tủy thận (Collecting Duct)' }
    ],
    correctKey: 'A',
    explanation: 'Ống lượn gần tái hấp thu đẳng trương ~65-70% lượng Na+ và nước lọc, 85% HCO3-, và tái hấp thu toàn bộ 100% Glucose (qua kênh SGLT2/SGLT1) và Acid amin nhờ diện tích bề mặt diềm bàn chải vi nhung mao khổng lồ.',
    clinicalPearl: 'Hội chứng Fanconi là khiếm khuyết toàn bộ chức năng tái hấp thu của ống lượn gần, dẫn tới tiểu nhiều acid amin, đường niệu với đường máu bình thường, tiểu phosphate và toan hóa ống thận type 2.',
    sourceFile: 'knowledge-vault/0. Giải phẫu & sinh lý/0.7. Thận - Tiết niệu & Thăng bằng toan kiềm/SL_Thận_Tái hấp thu & Bài tiết ở ống thận.md'
  },
  {
    id: 'q_phys_14',
    subject: 'Giải phẫu & Sinh lý',
    subjectKey: 'physiology',
    topicKey: 'physio_part7_renal_acidbase',
    topicName: 'Phần 7: Thận & Thăng Bằng Toan Kiềm',
    difficulty: 'Khó',
    difficultyScore: 3,
    question: 'Hormone kháng bài niệu ADH (Vasopressin) gắn vào thụ thể V2 trên màng đáy - bên của tế bào chính ống góp để kích hoạt sự di chuyển của kênh dẫn nước nào lên màng đỉnh lòng ống?',
    options: [
      { id: 'A', text: 'Aquaporin-2 (AQP2)' },
      { id: 'B', text: 'Aquaporin-1 (AQP1)' },
      { id: 'C', text: 'Aquaporin-3 (AQP3)' },
      { id: 'D', text: 'Kênh ENaC' }
    ],
    correctKey: 'A',
    explanation: 'ADH gắn thụ thể V2 kích hoạt con đường Gs-cAMP-PKA ➔ Phosphoryl hóa và kích thích các túi nội bào chứa kênh Aquaporin-2 hòa màng vào màng đỉnh lòng ống ➔ Tăng tính thấm nước của ống góp, giúp nước tái hấp thu vào tủy thận ưu trương cô đặc nước tiểu.',
    clinicalPearl: 'Bệnh Đái tháo nhạt do thận (Nephrogenic DI) do đột biến thụ thể V2 hoặc kênh AQP2 (hoặc do ngộ độc Lithium), nước tiểu loãng nhiều dù nồng độ ADH máu rất cao.',
    sourceFile: 'knowledge-vault/0. Giải phẫu & sinh lý/0.7. Thận - Tiết niệu & Thăng bằng toan kiềm/SL_Thận_Pha loãng & Cô đặc nước tiểu_Điều hòa dịch.md'
  },

  // PHẦN 8: NỘI TIẾT
  {
    id: 'q_phys_15',
    subject: 'Giải phẫu & Sinh lý',
    subjectKey: 'physiology',
    topicKey: 'physio_part8_endocrine_repro',
    topicName: 'Phần 8: Nội Tiết & Sinh Sản',
    difficulty: 'Dễ',
    difficultyScore: 1,
    question: 'Lớp nào của vỏ tuyến thượng thận chịu trách nhiệm chính trong việc tổng hợp và bài tiết hormone Mineralocorticoid (Aldosterone)?',
    options: [
      { id: 'A', text: 'Lớp Cầu (Zona Glomerulosa)' },
      { id: 'B', text: 'Lớp Bó (Zona Fasciculata)' },
      { id: 'C', text: 'Lớp Lưới (Zona Reticularis)' },
      { id: 'D', text: 'Tủy thượng thận (Adrenal Medulla)' }
    ],
    correctKey: 'A',
    explanation: 'Vỏ thượng thận gồm 3 lớp từ ngoài vào trong (G-F-R: Glomerulosa - Fasciculata - Reticularis ➔ tương ứng M-G-A: Mineralocorticoid/Aldosterone - Glucocorticoid/Cortisol - Androgens/DHEA). Lớp Cầu là nơi duy nhất chứa enzyme Aldosterone Synthase.',
    clinicalPearl: 'U vỏ thượng thận tiết quá mức Aldosterone (Hội chứng Conn - Cường Aldosterone nguyên phát) biểu hiện Tăng huyết áp kháng trị kèm Hạ Kali máu và Kiềm chuyển hóa.',
    sourceFile: 'knowledge-vault/0. Giải phẫu & sinh lý/0.8. Nội tiết & Sinh sản/SL_Nội tiết_Tuyến vỏ thượng thận.md'
  },
  {
    id: 'q_phys_16',
    subject: 'Giải phẫu & Sinh lý',
    subjectKey: 'physiology',
    topicKey: 'physio_part8_endocrine_repro',
    topicName: 'Phần 8: Nội Tiết & Sinh Sản',
    difficulty: 'Vừa',
    difficultyScore: 2,
    question: 'Hiện tượng phóng noãn (Rụng trứng) vào giữa chu kỳ kinh nguyệt được kích hoạt trực tiếp bởi đỉnh tăng vọt (surge) của hormone nào từ tuyến yên?',
    options: [
      { id: 'A', text: 'Luteinizing Hormone (LH)' },
      { id: 'B', text: 'Follicle-Stimulating Hormone (FSH)' },
      { id: 'C', text: 'Progesterone' },
      { id: 'D', text: 'Prolactin' }
    ],
    correctKey: 'A',
    explanation: 'Vào cuối pha nang noãn, nồng độ Estrogen (Estradiol) tăng cao kéo dài vượt ngưỡng chuyển từ cơ chế feedback âm sang feedback DƯƠNG lên trục hạ đồi - tuyến yên ➔ Tạo đỉnh tăng vọt LH (LH surge) kích thích nang noãn De Graaf vỡ ra giải phóng noãn bào.',
    clinicalPearl: 'Que thử rụng trứng tại nhà phát hiện sự xuất hiện của đỉnh LH trong nước tiểu khoảng 24-36 giờ trước thời điểm rụng trứng.',
    sourceFile: 'knowledge-vault/0. Giải phẫu & sinh lý/0.8. Nội tiết & Sinh sản/SL_Sinh sản.md'
  }
];
