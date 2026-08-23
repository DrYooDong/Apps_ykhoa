/**
 * Symptom to ICD-10 Candidate Mapping Database - DocSpace
 * Bộ nhận diện Từ khóa Lâm sàng, Triệu chứng Cơ năng & Bệnh cảnh
 * Tự động ánh xạ sang 30 Bệnh Lý Trọng Tâm có độ ưu tiên cao
 */

export interface SymptomMappingEntry {
  symptomKey: string;
  symptomName: string;
  category: 'tim_mach' | 'ho_hap' | 'tieu_hoa' | 'than_kinh' | 'than_tiet_nieu' | 'nhiem_khuan' | 'noi_tiet' | 'di_ung';
  keywords: string[];
  candidateDiagnoses: {
    diseaseKey: string;
    icdCode: string;
    diseaseName: string;
    probability: 'high' | 'moderate' | 'low';
    isMustNotMiss?: boolean;
    rationale: string;
  }[];
  redFlags: string[];
  suggestedUrgentActions: string[];
}

export const SYMPTOM_ICD_MAPPINGS: SymptomMappingEntry[] = [
  // 1. Đau ngực cấp
  {
    symptomKey: 'dau_nguc',
    symptomName: 'Đau ngực / Đau thắt ngực (Chest Pain)',
    category: 'tim_mach',
    keywords: [
      'đau ngực', 'dau nguc', 'tức ngực', 'tuc nguc', 'đè ép ngực', 'de ep nguc', 
      'nặng ngực', 'nang nguc', 'đau sau xương ức', 'dau sau xuong uc', 'chest pain', 'angina'
    ],
    candidateDiagnoses: [
      { diseaseKey: 'hoi_chung_vanh_cap', icdCode: 'I21.9', diseaseName: 'Hội chứng vành cấp / Nhồi máu cơ tim (ACS)', probability: 'high', isMustNotMiss: true, rationale: 'Đau thắt ngực đè ép > 20 phút lan tay trái/cằm, vã mồ hôi' },
      { diseaseKey: 'thuyen_tac_phoi', icdCode: 'I26', diseaseName: 'Thuyên tắc động mạch phổi cấp (PE)', probability: 'high', isMustNotMiss: true, rationale: 'Đau ngực màng phổi kèm khó thở đột ngột, có yếu tố nguy cơ huyết khối' },
      { diseaseKey: 'tran_dich_tran_khi_mang_phoi', icdCode: 'J90', diseaseName: 'Tràn khí / Tràn dịch màng phổi cấp', probability: 'moderate', isMustNotMiss: true, rationale: 'Đau nhói ngực 1 bên đột ngột, khó thở, giảm âm phế bào' },
      { diseaseKey: 'tang_huyet_ap', icdCode: 'I10', diseaseName: 'Cơn Tăng huyết áp cấp cứu / Đau ngực do THA', probability: 'moderate', rationale: 'Huyết áp tăng vọt kèm đau tức ngực' },
      { diseaseKey: 'suy_tim', icdCode: 'I50', diseaseName: 'Suy tim cấp / Cơn hen tim', probability: 'moderate', rationale: 'Nặng ngực kèm khó thở khi nằm, phù 2 chân' }
    ],
    redFlags: [
      'Đau xé rách lan ra sau lưng giữa 2 bả vai (Nghi phình bóc tách ĐMC)',
      'Đau đè ép > 20 phút lan lên cằm/tay trái kèm vã mồ hôi, tụt HA (ACS/STEMI)',
      'Khó thở đột ngột, SpO2 tụt, ho ra máu (Thuyên tắc phổi)',
      'Mất rì rào phế nang 1 bên, gõ vang (Tràn khí màng phổi áp lực)'
    ],
    suggestedUrgentActions: ['Đo ECG 12 chuyển đạo trong ≤ 10 phút đầu', 'Đo SpO2 và Huyết áp cả 2 tay', 'Xét nghiệm hs-Troponin T/I và D-dimer']
  },

  // 2. Khó thở cấp
  {
    symptomKey: 'kho_tho',
    symptomName: 'Khó thở / Suy hô hấp (Dyspnea / Shortness of Breath)',
    category: 'ho_hap',
    keywords: [
      'khó thở', 'kho tho', 'thở mệt', 'tho met', 'thở dốc', 'tho doc', 
      'hụt hơi', 'hut hoi', 'thở co kéo', 'tho co keo', 'dyspnea', 'spo2 giam', 'spo2 tụt'
    ],
    candidateDiagnoses: [
      { diseaseKey: 'copd', icdCode: 'J44.9', diseaseName: 'Bệnh phổi tắc nghẽn mạn tính (Đợt cấp AECOPD)', probability: 'high', rationale: 'Khó thở tiến triển trên người hút thuốc lá/tiền sử COPD, đàm đổi màu' },
      { diseaseKey: 'hen_phe_quan', icdCode: 'J45.9', diseaseName: 'Hen phế quản (Cơn hen cấp)', probability: 'high', rationale: 'Khó thở rít cò cử về đêm/sáng sớm, tiền sử hen dị ứng' },
      { diseaseKey: 'suy_tim', icdCode: 'I50', diseaseName: 'Suy tim cấp / Phù phổi cấp', probability: 'high', isMustNotMiss: true, rationale: 'Khó thở khi nằm đầu thấp, ran ẩm 2 đáy phổi, NT-proBNP tăng' },
      { diseaseKey: 'viem_phoi', icdCode: 'J18.9', diseaseName: 'Viêm phổi mắc phải cộng đồng (CAP)', probability: 'high', rationale: 'Khó thở kèm sốt, ho đờm mủ, ran nổ khu trú' },
      { diseaseKey: 'thuyen_tac_phoi', icdCode: 'I26', diseaseName: 'Thuyên tắc động mạch phổi cấp (PE)', probability: 'high', isMustNotMiss: true, rationale: 'Khó thở khởi phát đột ngột, đau ngực màng phổi' },
      { diseaseKey: 'tran_dich_tran_khi_mang_phoi', icdCode: 'J90', diseaseName: 'Tràn khí / Tràn dịch màng phổi', probability: 'moderate', rationale: 'Khó thở kèm hội chứng 3 giảm hoặc tam chứng Gaillard' }
    ],
    redFlags: [
      'SpO2 < 90% dù đang thở oxy, thở co kéo cơ hô hấp phụ',
      'Khạc bọt hồng, vã mồ hôi, huyết áp tụt (Phù phổi cấp / Choáng tim)',
      'Phổi im lặng (Silent chest trong cơn hen ác tính)',
      'Rì rào phế nang mất hoàn toàn 1 bên phổi'
    ],
    suggestedUrgentActions: ['Thở oxy duy trì SpO2 94-98% (88-92% nếu COPD)', 'Chụp X-quang ngực thẳng tại giường', 'Làm Khí máu động mạch (ABG) và Định lượng NT-proBNP']
  },

  // 3. Sốt cấp tính & Nhiễm trùng
  {
    symptomKey: 'sot_cap',
    symptomName: 'Sốt cấp tính / Hội chứng nhiễm trùng (Acute Fever & Sepsis)',
    category: 'nhiem_khuan',
    keywords: [
      'sốt', 'sot', 'sốt cao', 'sot cao', 'ớn lạnh', 'on lanh', 'rét run', 'ret run', 
      'nhiệt độ', 'fever', 'sốt xuất huyết', 'nhiễm trùng', 'nhiễm khuẩn'
    ],
    candidateDiagnoses: [
      { diseaseKey: 'soc_nhiem_khuan', icdCode: 'A41.9', diseaseName: 'Sốc nhiễm khuẩn / Nhiễm khuẩn huyết (Sepsis-3)', probability: 'high', isMustNotMiss: true, rationale: 'Sốt cao rét run kèm tụt HA, thở nhanh, lơ mơ, Lactate máu tăng' },
      { diseaseKey: 'sot_xuat_huyet', icdCode: 'A91', diseaseName: 'Sốt xuất huyết Dengue', probability: 'high', rationale: 'Sốt cao liên tục ngày 1-7, đau nhức mình mẩy, xuất huyết dưới da' },
      { diseaseKey: 'viem_phoi', icdCode: 'J18.9', diseaseName: 'Viêm phổi mắc phải cộng đồng (CAP)', probability: 'high', rationale: 'Sốt kèm ho đờm mủ, ran nổ phổi' },
      { diseaseKey: 'viem_mang_nao_mu', icdCode: 'G00.9', diseaseName: 'Viêm màng não mủ cấp', probability: 'moderate', isMustNotMiss: true, rationale: 'Sốt cao kèm đau đầu dữ dội, nôn vọt, cổ cứng (+)' },
      { diseaseKey: 'nhiem_trung_tiet_nieu', icdCode: 'N39.0', diseaseName: 'Nhiễm trùng tiểu / Viêm đài bể thận cấp', probability: 'moderate', rationale: 'Sốt rét run kèm tiểu buốt rắt, đau hông lưng' },
      { diseaseKey: 'viem_tui_mat_cap', icdCode: 'K80.0', diseaseName: 'Viêm túi mật / Viêm đường mật cấp', probability: 'moderate', rationale: 'Sốt rét run kèm đau hạ sườn phải, vàng da' }
    ],
    redFlags: [
      'Huyết áp tụt < 90/60 mmHg, chi lạnh ẩm, mạch nhanh nhỏ (Sốc nhiễm khuẩn / Sốc Dengue)',
      'Tử ban xuất huyết hoại tử, lơ mơ cổ cứng (Nhiễm não mô cầu)',
      'Tiểu ít, vàng da tăng nhanh, khó thở'
    ],
    suggestedUrgentActions: ['Lấy mẫu cấy máu 2 vị trí trước khi dùng kháng sinh', 'Đo Lactate máu và Tổng phân tích tế bào máu', 'Đánh giá thang điểm qSOFA và khởi động dịch truyền Ringer Lactate']
  },

  // 4. Đau bụng cấp
  {
    symptomKey: 'dau_bung',
    symptomName: 'Đau bụng cấp / Bụng ngoại khoa (Acute Abdomen)',
    category: 'tieu_hoa',
    keywords: [
      'đau bụng', 'dau bung', 'đau thượng vị', 'dau thuong vi', 'đau hạ sườn', 
      'dau ha suon', 'đau hố chậu', 'dau ho chau', 'đau quặn bụng', 'dau quan bung', 'chướng bụng'
    ],
    candidateDiagnoses: [
      { diseaseKey: 'viem_ruot_thua_cap', icdCode: 'K35.8', diseaseName: 'Viêm ruột thừa cấp', probability: 'high', isMustNotMiss: true, rationale: 'Đau di chuyển từ thượng vị/quanh rốn xuống hố chậu phải, điểm MacBurney (+)' },
      { diseaseKey: 'viem_tuy_cap', icdCode: 'K85', diseaseName: 'Viêm tụy cấp (Acute Pancreatitis)', probability: 'high', isMustNotMiss: true, rationale: 'Đau thượng vị dữ dội lan ra sau lưng sau bữa ăn thịnh soạn/rượu, Amylase/Lipase tăng' },
      { diseaseKey: 'viem_tui_mat_cap', icdCode: 'K80.0', diseaseName: 'Viêm túi mật cấp / Sỏi mật', probability: 'high', rationale: 'Đau quặn hạ sườn phải, dấu Murphy (+), sốt' },
      { diseaseKey: 'soi_than_con_dau_quan_than', icdCode: 'N20.0', diseaseName: 'Cơn đau quặn thận do sỏi niệu quản', probability: 'high', rationale: 'Đau quặn dữ dội hông lưng lan xuống bẹn, tiểu máu' },
      { diseaseKey: 'viem_loet_da_day_hp', icdCode: 'K25.9', diseaseName: 'Viêm loét dạ dày tá tràng (PUD)', probability: 'moderate', rationale: 'Đau cồn cào thượng vị liên quan bữa ăn, ợ chua' }
    ],
    redFlags: [
      'Bụng co cứng như gỗ, đề kháng toàn bụng (Thủng tạng rỗng / Viêm phúc mạc)',
      'Nôn ra máu hoặc đi cầu phân đen ồ ạt kèm tụt HA',
      'Đau bụng dữ dội kèm bụng chướng không trung đại tiện (Tắc ruột)'
    ],
    suggestedUrgentActions: ['Siêu âm ổ bụng tổng quát khẩn cấp', 'Xét nghiệm Amylase/Lipase máu, Bạch cầu, CRP', 'Chụp X-quang bụng đứng không chuẩn bị tìm liềm hơi dưới hoành']
  },

  // 5. Xuất huyết tiêu hóa / Nôn máu & Đi cầu phân đen
  {
    symptomKey: 'xuat_huyet_tieu_hoa',
    symptomName: 'Xuất huyết tiêu hóa trên (UGIB / Hematemesis / Melena)',
    category: 'tieu_hoa',
    keywords: [
      'nôn ra máu', 'non ra mau', 'đi cầu phân đen', 'di cau phan den', 'phân đen', 
      'phan den', 'nôn bã cà phê', 'xuất huyết tiêu hóa', 'xuat huyet tieu hoa', 'chảy máu tiêu hóa'
    ],
    candidateDiagnoses: [
      { diseaseKey: 'xuat_huyet_tieu_hoa_tren', icdCode: 'K92.2', diseaseName: 'Xuất huyết tiêu hóa trên (Loét & Vỡ Giãn TMTQ)', probability: 'high', isMustNotMiss: true, rationale: 'Nôn máu, phân đen khắm, tiền sử loét dạ dày hoặc xơ gan' },
      { diseaseKey: 'xo_gan', icdCode: 'K74.6', diseaseName: 'Xơ gan mất bù / Vỡ giãn tĩnh mạch thực quản', probability: 'high', isMustNotMiss: true, rationale: 'Nôn máu đỏ tươi ồ ạt trên bệnh nhân xơ gan, tăng áp cửa' },
      { diseaseKey: 'viem_loet_da_day_hp', icdCode: 'K25.9', diseaseName: 'Viêm loét dạ dày tá tràng biến chứng chảy máu', probability: 'moderate', rationale: 'Tiền sử đau thượng vị mạn tính, dùng thuốc NSAIDs/Aspirin' }
    ],
    redFlags: [
      'Nôn máu đỏ tươi ồ ạt, tụt huyết áp < 90/60 mmHg (Sốc mất máu)',
      'Hoa mắt, chóng mặt ngất khi thay đổi tư thế, da niêm nhợt nhạt'
    ],
    suggestedUrgentActions: ['Lập 2 đường truyền tĩnh mạch lớn, bù dịch và xét nghiệm nhóm máu chuẩn bị hồng cầu', 'Tiêm tĩnh mạch Pantoprazole 80mg TM + Octreotide nếu nghi xơ gan', 'Hội chẩn Nội soi tiêu hóa cấp cứu cầm máu']
  },

  // 6. Rối loạn tri giác, Hôn mê & Co giật
  {
    symptomKey: 'roi_loan_tri_giac',
    symptomName: 'Hôn mê, Lơ mơ & Rối loạn tri giác (Altered Mental Status / Coma)',
    category: 'than_kinh',
    keywords: [
      'hôn mê', 'hon me', 'lơ mơ', 'lo mo', 'lú lẫn', 'lu lan', 'mê sảng', 
      'co giật', 'co giat', 'gcs giam', 'bất tỉnh', 'mất ý thức'
    ],
    candidateDiagnoses: [
      { diseaseKey: 'ha_duong_huyet_cap', icdCode: 'E16.2', diseaseName: 'Hạ đường huyết cấp & Hôn mê hạ đường huyết', probability: 'high', isMustNotMiss: true, rationale: 'Vã mồ hôi lạnh, lơ mơ hôn mê, Glucose mao mạch < 3.9 mmol/L' },
      { diseaseKey: 'dot_quy_nao', icdCode: 'I63', diseaseName: 'Đột quỵ nhồi máu não / Xuất huyết não cấp', probability: 'high', isMustNotMiss: true, rationale: 'Hôn mê đột ngột kèm liệt nửa người, méo miệng' },
      { diseaseKey: 'nhiem_toan_ceton_dka', icdCode: 'E10.1', diseaseName: 'Nhiễm toan Ceton do ĐTĐ (DKA) / Hôn mê tăng ALTT', probability: 'high', isMustNotMiss: true, rationale: 'Thở Kussmaul mùi táo chín, mất nước nặng, đường huyết tăng cao' },
      { diseaseKey: 'ha_natri_mau', icdCode: 'E87.1', diseaseName: 'Hạ Natri máu nặng gây phù não cấp', probability: 'moderate', rationale: 'Lú lẫn, co giật, Natri huyết thanh < 120 mEq/L' },
      { diseaseKey: 'viem_mang_nao_mu', icdCode: 'G00.9', diseaseName: 'Viêm màng não mủ / Viêm não', probability: 'moderate', isMustNotMiss: true, rationale: 'Sốt cao, cổ cứng, hôn mê' },
      { diseaseKey: 'xo_gan', icdCode: 'K74.6', diseaseName: 'Bệnh não gan / Hôn mê gan', probability: 'moderate', rationale: 'Tiền sử xơ gan, run vỗ cánh tay, NH3 máu tăng' }
    ],
    redFlags: [
      'GCS < 8 điểm (nguy cơ trào ngược, cần đặt ống nội khí quản)',
      'Đồng tử giãn 1 bên mất phản xạ ánh sáng (Dấu hiệu tụt kẹt não)',
      'Đường huyết mao mạch < 2.8 mmol/L hoặc > 33.3 mmol/L'
    ],
    suggestedUrgentActions: ['Bấm đường huyết mao mạch tại giường NGAY LẬP TỨC (Quy tắc DON’T: Dextrose, Oxygen, Naloxone, Thiamine)', 'Đảm bảo thông thoáng đường thở và thở oxy', 'Chụp CT sọ não cấp cứu']
  },

  // 7. Sốc, Tụt huyết áp & Phản vệ
  {
    symptomKey: 'soc_tut_huyet_ap',
    symptomName: 'Sốc, Tụt huyết áp & Dị ứng phản vệ (Shock & Anaphylaxis)',
    category: 'di_ung',
    keywords: [
      'tụt huyết áp', 'tut huyet ap', 'huyết áp tụt', 'sốc', 'soc', 'mày đay', 
      'phù môi', 'phù mắt', 'phản vệ', 'anaphylaxis', 'chi lạnh'
    ],
    candidateDiagnoses: [
      { diseaseKey: 'soc_phan_ve', icdCode: 'T78.2', diseaseName: 'Sốc phản vệ / Phản ứng phản vệ (Anaphylaxis)', probability: 'high', isMustNotMiss: true, rationale: 'Tụt HA, mày đay, khó thở sau tiêm thuốc/ăn dị nguyên' },
      { diseaseKey: 'soc_nhiem_khuan', icdCode: 'A41.9', diseaseName: 'Sốc nhiễm khuẩn (Septic Shock)', probability: 'high', isMustNotMiss: true, rationale: 'Sốt cao, tụt HA kháng bù dịch, Lactate > 2 mmol/L' },
      { diseaseKey: 'suy_thuong_than_cap', icdCode: 'E27.2', diseaseName: 'Suy thượng thận cấp (Adrenal Crisis)', probability: 'high', isMustNotMiss: true, rationale: 'Tụt HA trơ với vận mạch, tiền sử dùng corticoid, hạ Na+ tăng K+' },
      { diseaseKey: 'hoi_chung_vanh_cap', icdCode: 'I21.9', diseaseName: 'Sốc tim do Nhồi máu cơ tim cấp', probability: 'high', isMustNotMiss: true, rationale: 'Tụt HA kèm đau ngực, rale ẩm phổi, men tim tăng' }
    ],
    redFlags: [
      'Thở rít thanh quản (Stridor), khàn tiếng mất tiếng (Phù nề đường thở cấp)',
      'Huyết áp kẹp hoặc không đo được, mạch quay không bắt được'
    ],
    suggestedUrgentActions: ['Tiêm bắp Adrenaline 0.5mg ngay nếu nghi phản vệ', 'Truyền dịch tinh thể NaCl 0.9% hoặc Ringer Lactate tốc độ nhanh', 'Khởi động thuốc vận mạch Noradrenaline']
  },

  // 8. Hồi hộp, Đánh trống ngực & Nhịp tim nhanh
  {
    symptomKey: 'danh_trong_nguc',
    symptomName: 'Hồi hộp, Đánh trống ngực & Cơn tim nhanh (Palpitations & Tachycardia)',
    category: 'tim_mach',
    keywords: [
      'đánh trống ngực', 'danh trong nguc', 'hồi hộp', 'hoi hop', 'tim đập nhanh', 
      'tim dap nhanh', 'loạn nhịp', 'loan nhip', 'rung nhĩ', 'cường giáp'
    ],
    candidateDiagnoses: [
      { diseaseKey: 'rung_nhi', icdCode: 'I48.9', diseaseName: 'Rung nhĩ & Loạn nhịp nhanh (AFib)', probability: 'high', rationale: 'Nhịp tim hoàn toàn không đều, mạch hụt, ECG mất sóng P' },
      { diseaseKey: 'con_bao_giap', icdCode: 'E05.9', diseaseName: 'Cơn bão giáp & Nhiễm độc giáp cấp', probability: 'moderate', isMustNotMiss: true, rationale: 'Tim nhanh > 140 l/p kèm sốt cao, bướu cổ, mắt lồi, vã mồ hôi' },
      { diseaseKey: 'hoi_chung_vanh_cap', icdCode: 'I21.9', diseaseName: 'Cơn loạn nhịp trong Hội chứng vành cấp', probability: 'moderate', rationale: 'Hồi hộp kèm đau thắt ngực' }
    ],
    redFlags: [
      'Nhịp nhanh kèm tụt HA, đau ngực, suy tim cấp (Cần sốc điện đồng bộ ngay)',
      'Nhịp tim > 150-180 lần/phút hoặc ECG có nhanh thất (VT) / rung thất (VF)'
    ],
    suggestedUrgentActions: ['Mắc monitor theo dõi điện tim liên tục và đo ECG 12 chuyển đạo', 'Xét nghiệm TSH, FT4, Điện giải đồ (K+, Mg2+)', 'Chuẩn bị máy phá rung nếu huyết động không ổn định']
  },

  // 9. Phù toàn thân & Bệnh thận
  {
    symptomKey: 'phu_toan_than',
    symptomName: 'Phù toàn thân & Bệnh lý thận (Generalized Edema & Renal Disease)',
    category: 'than_tiet_nieu',
    keywords: [
      'phù', 'phu', 'phù chân', 'phu chan', 'phù mặt', 'phu mat', 'phù toàn thân', 
      'tiểu ít', 'tieu it', 'thiểu niệu', 'nước tiểu có bọt', 'đạm niệu'
    ],
    candidateDiagnoses: [
      { diseaseKey: 'hoi_chung_than_hu', icdCode: 'N04.9', diseaseName: 'Hội chứng thận hư (Nephrotic Syndrome)', probability: 'high', rationale: 'Phù trắng mềm ấn lõm toàn thân, tiểu nhiều bọt, Albumin máu giảm sâu' },
      { diseaseKey: 'suy_than', icdCode: 'N18', diseaseName: 'Tổn thương thận cấp / Bệnh thận mạn', probability: 'high', rationale: 'Phù kèm thiểu niệu, Creatinine máu tăng, tăng huyết áp' },
      { diseaseKey: 'suy_tim', icdCode: 'I50', diseaseName: 'Suy tim sung huyết (CHF)', probability: 'high', rationale: 'Phù 2 chân kèm khó thở khi nằm, tĩnh mạch cổ nổi' },
      { diseaseKey: 'xo_gan', icdCode: 'K74.6', diseaseName: 'Xơ gan cổ trướng', probability: 'high', rationale: 'Cổ trướng bụng to, phù 2 chi dưới, vàng da' }
    ],
    redFlags: [
      'Phù kèm khó thở dữ dội, phổi đầy rale ẩm (Phù phổi cấp)',
      'Vô niệu hoàn toàn (< 100 mL/24h) kèm Kali máu > 6.5 mEq/L (Chỉ định lọc máu cấp)'
    ],
    suggestedUrgentActions: ['Định lượng Protein niệu 24h và Albumin máu', 'Xét nghiệm Creatinine, Ure máu và Điện giải đồ', 'Siêu âm tim và siêu âm ổ bụng']
  },

  // 10. Tiểu buốt, Tiểu rắt & Đau quặn thận
  {
    symptomKey: 'roi_loan_tieu_tien',
    symptomName: 'Tiểu buốt, Tiểu rắt & Đau hông lưng (Urinary Symptoms & Flank Pain)',
    category: 'than_tiet_nieu',
    keywords: [
      'tiểu buốt', 'tieu buot', 'tiểu rắt', 'tieu rat', 'tiểu máu', 'tieu mau', 
      'đái buốt', 'đái rắt', 'đau hông lưng', 'dau hong lung', 'đau mạn sườn'
    ],
    candidateDiagnoses: [
      { diseaseKey: 'nhiem_trung_tiet_nieu', icdCode: 'N39.0', diseaseName: 'Nhiễm trùng đường tiết niệu & Viêm đài bể thận', probability: 'high', rationale: 'Tiểu buốt rát, nước tiểu đục, sốt rét run, đau hông lưng' },
      { diseaseKey: 'soi_than_con_dau_quan_than', icdCode: 'N20.0', diseaseName: 'Sỏi thận & Cơn đau quặn thận', probability: 'high', rationale: 'Đau quặn dữ dội từng cơn hông lưng lan xuống bẹn, tiểu máu vi thể' }
    ],
    redFlags: [
      'Đau quặn thận kèm SỐT CAO RÉT RUN (Sỏi tắc nghẽn ứ mủ thận cần đặt sonde JJ cấp cứu)',
      'Vô niệu hoàn toàn ở bệnh nhân sỏi thận'
    ],
    suggestedUrgentActions: ['Tổng phân tích nước tiểu 10 thông số và cấy nước tiểu', 'Chụp CT Scanner hệ tiết niệu KUB không cản quang', 'Siêu âm hệ tiết niệu kiểm tra đài bể thận ứ nước']
  }
];

export function detectCandidateDiagnosesFromText(text: string): {
  matchedSymptoms: SymptomMappingEntry[];
  candidateDiseases: {
    diseaseKey: string;
    icdCode: string;
    diseaseName: string;
    score: number;
    probability: 'high' | 'moderate' | 'low';
    isMustNotMiss?: boolean;
    rationale: string;
  }[];
  aggregatedRedFlags: string[];
  suggestedActions: string[];
} {
  if (!text) {
    return { matchedSymptoms: [], candidateDiseases: [], aggregatedRedFlags: [], suggestedActions: [] };
  }

  const lower = text.toLowerCase();
  const matchedSymptoms: SymptomMappingEntry[] = [];
  const diseaseScoreMap = new Map<string, {
    diseaseKey: string;
    icdCode: string;
    diseaseName: string;
    score: number;
    probability: 'high' | 'moderate' | 'low';
    isMustNotMiss?: boolean;
    rationale: string;
  }>();

  const redFlagsSet = new Set<string>();
  const actionsSet = new Set<string>();

  for (const entry of SYMPTOM_ICD_MAPPINGS) {
    const isMatched = entry.keywords.some(kw => lower.includes(kw.toLowerCase()));
    if (isMatched) {
      matchedSymptoms.push(entry);

      entry.redFlags.forEach(rf => redFlagsSet.add(rf));
      entry.suggestedUrgentActions.forEach(ac => actionsSet.add(ac));

      for (const diag of entry.candidateDiagnoses) {
        const weight = diag.probability === 'high' ? 3 : diag.probability === 'moderate' ? 2 : 1;
        const mustMissBonus = diag.isMustNotMiss ? 2 : 0;
        const totalAdd = weight + mustMissBonus;

        if (diseaseScoreMap.has(diag.diseaseKey)) {
          const current = diseaseScoreMap.get(diag.diseaseKey)!;
          current.score += totalAdd;
          if (diag.probability === 'high') current.probability = 'high';
          if (diag.isMustNotMiss) current.isMustNotMiss = true;
        } else {
          diseaseScoreMap.set(diag.diseaseKey, {
            diseaseKey: diag.diseaseKey,
            icdCode: diag.icdCode,
            diseaseName: diag.diseaseName,
            score: totalAdd,
            probability: diag.probability,
            isMustNotMiss: diag.isMustNotMiss,
            rationale: diag.rationale
          });
        }
      }
    }
  }

  const candidateDiseases = Array.from(diseaseScoreMap.values()).sort((a, b) => b.score - a.score);

  return {
    matchedSymptoms,
    candidateDiseases,
    aggregatedRedFlags: Array.from(redFlagsSet),
    suggestedActions: Array.from(actionsSet)
  };
}
