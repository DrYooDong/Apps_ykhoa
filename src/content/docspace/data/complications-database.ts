/**
 * CliniPortal DocSpace — Complications Sentinel & Vigilance Database
 * Kho Biến Chứng Bệnh Học, Dấu Hiệu Cảnh Báo Sớm & Chiến Lược Dự Phòng (Kho BC)
 * Kết nối suy luận lâm sàng giữa Sinh hiệu/Xét nghiệm bất thường với nguy cơ biến chứng cấp đe dọa tính mạng
 */

export type ComplicationSeverity = 'critical' | 'acute' | 'subacute' | 'chronic';

export interface ComplicationEntry {
  id: string;
  name: string;
  severity: ComplicationSeverity;
  timeframe: string; // Khung thời gian phát sinh: ví dụ "0 - 24 giờ đầu", "Ngày 3 - 7"
  incidence: string; // Tần suất: ví dụ "5 - 10%", "< 1%"
  pathophysiology: string; // Cơ chế sinh bệnh
  earlyWarningSigns: string[]; // Dấu hiệu cảnh báo sớm (Mạch, HA, SpO2, tri giác...)
  diagnosticAction: string; // Cận lâm sàng xác định biến chứng
  emergencyManagement: string; // Phác đồ xử trí cấp cứu
  preventionStrategy: string; // Chiến lược dự phòng chủ động
}

export interface DiseaseComplicationProfile {
  diseaseId: string;
  diseaseName: string;
  icd10: string;
  specialty: string;
  complications: ComplicationEntry[];
  vaultArticleRelPath: string; // Đường dẫn tương đối trong knowledge-vault/
}

export const COMPLICATIONS_DATABASE: Record<string, DiseaseComplicationProfile> = {
  // ─── 1. HỘI CHỨNG VÀNH CẤP (ACS / STEMI / NSTEMI) ─────────────────────────
  acs: {
    diseaseId: 'acs',
    diseaseName: 'Hội chứng vành cấp',
    icd10: 'I21',
    specialty: 'Tim mạch',
    vaultArticleRelPath: '2.5. Kho biến chứng/Tim mạch/BC_Hội chứng vành cấp_P1.md',
    complications: [
      {
        id: 'acs_shock',
        name: 'Sốc tim (Cardiogenic Shock)',
        severity: 'critical',
        timeframe: '0 - 24 giờ đầu sau NMCT',
        incidence: '5 - 8%',
        pathophysiology: 'Hoại tử xuyên thành > 40% khối lượng cơ tim thất trái làm giảm trầm trọng cung lượng tim, tụt huyết áp và thiếu máu đa cơ quan.',
        earlyWarningSigns: ['HATT < 90 mmHg kéo dài > 30 phút', 'Mạch nhanh nhỏ > 110 l/p', 'Thiểu niệu < 0.5 mL/kg/h', 'Chi lạnh, vã mồ hôi, da nổi bông', 'Lactate máu > 2.0 mmol/L'],
        diagnosticAction: 'Siêu âm tim cấp cứu tại giường (LVEF giảm nặng, rối loạn vận động vùng), Đo huyết áp động mạch xâm lấn.',
        emergencyManagement: 'Can thiệp tái tưới máu mạch vành khẩn cấp (Primary PCI < 2 giờ). Thuốc vận mạch Noradrenaline + Dobutamine. Cân nhắc hỗ trợ tuần hoàn cơ học (IABP / Impella / VA-ECMO).',
        preventionStrategy: 'Rút ngắn tối đa thời gian từ lúc đau ngực đến khi mở thông mạch vành (Door-to-Balloon < 60-90 phút).'
      },
      {
        id: 'acs_mechanical',
        name: 'Biến chứng cơ học (Thủng vách liên thất / Đứt dây chằng cơ nhú)',
        severity: 'critical',
        timeframe: 'Ngày 3 - 7 sau NMCT',
        incidence: '< 1%',
        pathophysiology: 'Đại thực bào dọn dẹp mô hoại tử làm nhuyễn hóa và đứt rời cấu trúc cơ tim chịu áp lực cao trong thì tâm thu.',
        earlyWarningSigns: ['Đau ngực tái phát dữ dội đột ngột', 'Xuất hiện âm thổi tâm thu mới cường độ lớn tại mỏm hoặc bờ trái xương ức', 'Tụt huyết áp trụy mạch nhanh', 'Khó thở phù phổi cấp trào bọt hồng'],
        diagnosticAction: 'Siêu âm tim cấp cứu Doppler màu: Phát hiện dòng shunt qua vách liên thất hoặc hở van hai lá cấp tính mức độ nặng.',
        emergencyManagement: 'Phẫu thuật cấp cứu tim hở sửa chữa vách/van tim. Đặt bóng đối xung nội động mạch chủ (IABP) giảm hậu gánh làm cầu nối phẫu thuật.',
        preventionStrategy: 'Tái tưới máu PCI thì đầu sớm ngăn ngừa diện hoại tử xuyên thành lan rộng.'
      },
      {
        id: 'acs_vt_vf',
        name: 'Loạn nhịp thất đe dọa tính mạng (Rung thất VF / Nhịp nhanh thất VT)',
        severity: 'critical',
        timeframe: 'Giờ 0 - 48 đầu',
        incidence: '4 - 10%',
        pathophysiology: 'Ổ ngoại vị tự động tính cao hoặc vòng vào lại điện học tại vùng ranh giới giữa mô cơ tim lành và mô hoại tử thiếu máu cục bộ.',
        earlyWarningSigns: ['Ngoại tâm thu thất đa dạng/thành chùm (R-on-T) trên monitor', 'Hồi hộp đánh trống ngực dữ dội', 'Chóng mặt, hoa mắt, ngất xỉu đột ngột'],
        diagnosticAction: 'Theo dõi monitor điện tim liên tục 12 đạo trình, ghi nhận VT/VF.',
        emergencyManagement: 'Rung thất/VT vô mạch: Sốc điện khử rung không đồng bộ ngay 200J (Biphasic) + CPR + Adrenaline 1mg + Amiodarone 300mg IV.',
        preventionStrategy: 'Khởi trị sớm thuốc chẹn beta giao cảm (Bisoprolol/Metoprolol) khi huyết động ổn định; bù đủ Kali máu ≥ 4.0 mEq/L và Magie máu ≥ 2.0 mg/dL.'
      }
    ]
  },

  // ─── 2. SUY TIM CẤP / MẤT BÙ CẤP (ACUTE HEART FAILURE) ───────────────────
  heart_failure: {
    diseaseId: 'heart_failure',
    diseaseName: 'Suy tim',
    icd10: 'I50',
    specialty: 'Tim mạch',
    vaultArticleRelPath: '2.5. Kho biến chứng/Tim mạch/BC_Suy tim_P1.md',
    complications: [
      {
        id: 'hf_flash_edema',
        name: 'Phù phổi cấp huyết động (Flash Pulmonary Edema)',
        severity: 'critical',
        timeframe: 'Bất kỳ lúc nào / Vài phút đến vài giờ',
        incidence: '15 - 20% các đợt cấp',
        pathophysiology: 'Tăng đột ngột áp lực mao mạch phổi bít > 25 mmHg đẩy dịch ồ ạt từ lòng mạch tràn vào phế nang làm ngập nước phế nang.',
        earlyWarningSigns: ['Khó thở dữ dội phải ngồi bật dậy thở (Orthopnea)', 'Nhịp thở > 30 l/p, co kéo cơ hô hấp phụ', 'SpO2 tụt dốc < 85%', 'Ran ẩm nổ dâng nhanh từ hai đáy phổi lên đỉnh', 'Khạc đờm bọt hồng'],
        diagnosticAction: 'Khí máu động mạch (giảm oxy máu nặng toan hô hấp), X-quang ngực thẳng (Hình ảnh cánh bướm rốn phổi), Siêu âm tim/phổi (Dày đặc B-lines).',
        emergencyManagement: 'Ngồi thõng hai chân. Thở oxy mask túi hoặc thở máy không xâm lấn (NIV - CPAP/BiPAP PEEP 5-10 cmH2O). Furosemide 40-80mg TM. Nitroglycerin truyền TM kiểm soát huyết áp.',
        preventionStrategy: 'Kiểm soát chặt lượng muối nước nạp vào (< 2g muối/ngày), tuân thủ 4 trụ cột suy tim (Fantastic Four: SGLT2i, ARNI/ACEi, Chẹn beta, MRA).'
      },
      {
        id: 'hf_cardiorenal',
        name: 'Hội chứng Tim - Thận type 1 (Cardiorenal Syndrome)',
        severity: 'acute',
        timeframe: 'Ngày 2 - 5 trong đợt bù dịch/lợi tiểu',
        incidence: '25 - 35%',
        pathophysiology: 'Tăng áp lực tĩnh mạch trung tâm gây ứ trệ tuần hoàn tĩnh mạch thận kết hợp giảm lưu lượng tưới máu động mạch thận.',
        earlyWarningSigns: ['Creatinine máu tăng > 26.5 µmol/L (0.3 mg/dL) hoặc tăng > 50% so với nền', 'Thể tích nước tiểu giảm mặc dù đã dùng lợi tiểu liều cao', 'Phù kháng trị'],
        diagnosticAction: 'Định lượng Creatinine máu, Điện giải đồ, Siêu âm Doppler tĩnh mạch thận đánh giá chỉ số xung VExUS.',
        emergencyManagement: 'Tối ưu hóa huyết động: Cân nhắc phối hợp lợi tiểu quai + Thiazide (giải vây Nephron) hoặc Lợi tiểu quai + SGLT2i. Tránh dùng thuốc độc cho thận (NSAIDs, cản quang). Cân nhắc siêu lọc máu (Ultrafiltration) nếu kháng lợi tiểu hoàn toàn.',
        preventionStrategy: 'Theo dõi sát cân nặng mỗi ngày (mục tiêu giảm 0.5 - 1.0 kg/ngày), không giảm thể tích nội mạch quá nhanh.'
      }
    ]
  },

  // ─── 3. VIÊM PHỔI CỘNG ĐỒNG (CAP) & NHIỄM TRÙNG HÔ HẤP ───────────────────
  cap: {
    diseaseId: 'cap',
    diseaseName: 'Viêm phổi cộng đồng',
    icd10: 'J18',
    specialty: 'Hô hấp',
    vaultArticleRelPath: '2.5. Kho biến chứng/Hô hấp/BC_Viêm phổi_P1.md',
    complications: [
      {
        id: 'cap_sepsis_shock',
        name: 'Nhiễm khuẩn huyết & Sốc nhiễm khuẩn (Septic Shock)',
        severity: 'critical',
        timeframe: '24 - 48 giờ đầu',
        incidence: '8 - 12%',
        pathophysiology: 'Vi khuẩn xâm nhập lòng mạch giải phóng độc tố kích hoạt bão Cytokine gây giãn mạch hệ thống và tổn thương nội mạc lan tỏa.',
        earlyWarningSigns: ['Huyết áp tụt HATT < 90 hoặc MAP < 65 mmHg', 'Mạch nhanh > 110 l/p, thở nhanh > 25 l/p', 'Lactate máu tăng > 2.0 mmol/L', 'Thiểu niệu, tri giác lú lẫn'],
        diagnosticAction: 'Cấy máu 2 vị trí trước khi dùng kháng sinh, Khí máu động mạch, Công thức máu, Procalcitonin, CRP.',
        emergencyManagement: 'Bù dịch tinh thể 30 mL/kg trong 3 giờ đầu. Kháng sinh phổ rộng đường tĩnh mạch trong giờ đầu tiên (Hour-1 Bundle). Khởi trị Noradrenaline nếu MAP < 65 sau bù dịch.',
        preventionStrategy: 'Phân tầng nguy cơ sớm bằng thang điểm CURB-65 / PSI để quyết định nhập ICU kịp thời.'
      },
      {
        id: 'cap_empyema',
        name: 'Tràn dịch mủ màng phổi & Áp xe phổi (Empyema & Lung Abscess)',
        severity: 'acute',
        timeframe: 'Tuần 1 - 2',
        incidence: '3 - 5%',
        pathophysiology: 'Ổ viêm lan ra sát màng phổi tạng gây phản ứng tiết dịch, vi khuẩn xâm lấn tạo dịch rỉ viêm nhiều fibrin hóa vách hóa mủ màng phổi.',
        earlyWarningSigns: ['Sốt cao dai dẳng không dứt sau 72 giờ dùng kháng sinh đúng phác đồ', 'Đau ngực kiểu màng phổi tăng khi hít sâu', 'Hội chứng 3 giảm tại đáy phổi'],
        diagnosticAction: 'Chụp CT lồng ngực có cản quang, Siêu âm màng phổi định vị dịch, Chọc hút dịch màng phổi xét nghiệm (pH < 7.2, Glucose < 2.2 mmol/L, LDH > 1000 U/L, soi nhuộm vi khuẩn).',
        emergencyManagement: 'Đặt ống dẫn lưu màng phổi kín (Chest tube) giải áp mủ. Bơm rửa tiêu sợi huyết (tPA + DNase) nếu dịch vách hóa. Phẫu thuật nội soi lồng ngực bóc vỏ màng phổi (VATS) nếu thất bại.',
        preventionStrategy: 'Điều trị kháng sinh đủ liều, đúng phổ vi khuẩn theo khuyến cáo ATS/IDSA.'
      }
    ]
  },

  // ─── 4. SỐT XUẤT HUYẾT DENGUE (DENGUE FEVER) ──────────────────────────────
  dengue: {
    diseaseId: 'dengue',
    diseaseName: 'Sốt xuất huyết Dengue',
    icd10: 'A97',
    specialty: 'Truyền nhiễm & Vi sinh',
    vaultArticleRelPath: '2.5. Kho biến chứng/Truyền nhiễm & Vi sinh/BC_Sốt xuất huyết Dengue nặng_P1.md',
    complications: [
      {
        id: 'dengue_shock',
        name: 'Sốc Sốt Xuất Huyết Dengue (DSS) / Thoát huyết tương ồ ạt',
        severity: 'critical',
        timeframe: 'Ngày 4 - ngày 6 của bệnh (Giai đoạn nguy hiểm)',
        incidence: '10 - 15%',
        pathophysiology: 'Phản ứng miễn dịch quá mức làm tăng tính thấm mao mạch chọn lọc và thoáng qua, huyết tương thất thoát vào khoang màng phổi/màng bụng gây cô đặc máu và giảm thể tích tuần hoàn.',
        earlyWarningSigns: ['Hết sốt đột ngột nhưng mệt lả li bì', 'Đau bụng hạ sườn phải tăng', 'Nôn ói liên tục ≥ 3 lần/ngày', 'Hct tăng cao > 20% so với giá trị ban đầu kèm tiểu cầu giảm nhanh < 100.000/µL', 'Huyết áp kẹt (hiệu số HATT - HATTr ≤ 20 mmHg) hoặc tụt huyết áp'],
        diagnosticAction: 'Tổng phân tích tế bào máu mỗi 4-6 giờ theo dõi Hct và tiểu cầu, Siêu âm bụng tìm dịch màng bụng và dày thành túi mật, Siêu âm ngực tìm dịch màng phổi.',
        emergencyManagement: 'Quy trình bù dịch chống sốc theo Phác đồ Bộ Y tế 2023: Khởi đầu dung dịch tinh thể (Ringer Lactate / Ringer Fundin) 15-20 mL/kg/giờ. Đánh giá lại mỗi giờ. Chuyển dịch cao phân tử (Dextran 40 / HES 200.000) nếu tái sốc hoặc không đáp ứng.',
        preventionStrategy: 'Phát hiện sớm dấu hiệu cảnh báo (Warning Signs) ở ngày 3-4 để nhập viện theo dõi sát cọc dịch.'
      },
      {
        id: 'dengue_bleed',
        name: 'Xuất huyết nặng đe dọa tính mạng (Xuất huyết tiêu hóa, Chảy máu nội tạng)',
        severity: 'critical',
        timeframe: 'Ngày 4 - 7',
        incidence: '2 - 4%',
        pathophysiology: 'Phối hợp giữa giảm tiểu cầu trầm trọng, rối loạn đông máu tiêu thụ và tổn thương tế bào nội mạc vi mạch.',
        earlyWarningSigns: ['Nôn ra máu tươi hoặc máu đen', 'Đi cầu phân đen hoặc đỏ tươi', 'Chảy máu mũi/chân răng ồ ạt khó cầm', 'Hct tụt đột ngột không tương xứng với lượng dịch bù'],
        diagnosticAction: 'Nội soi dạ dày cấp cứu nếu huyết động cho phép, Theo dõi Hct liên tục mỗi 2-4 giờ.',
        emergencyManagement: 'Truyền khối hồng cầu đậm đặc cầm máu khi Hct tụt. Truyền khối tiểu cầu khi tiểu cầu < 50.000/µL kèm xuất huyết nặng đang tiến triển hoặc < 10.000/µL có nguy cơ xuất huyết não. Truyền huyết tương tươi đông lạnh (FFP) nếu rối loạn đông máu.',
        preventionStrategy: 'Tuyệt đối KHÔNG dùng Aspirin, Ibuprofen hoặc các thuốc NSAIDs hạ sốt trong SXH Dengue.'
      }
    ]
  },

  // ─── 5. VIÊM TỤY CẤP (ACUTE PANCREATITIS) ──────────────────────────────────
  acute_pancreatitis: {
    diseaseId: 'acute_pancreatitis',
    diseaseName: 'Viêm tụy cấp',
    icd10: 'K85',
    specialty: 'Tiêu hóa - Gan mật',
    vaultArticleRelPath: '2.5. Kho biến chứng/Tiêu hóa - Gan mật/BC_Viêm tụy cấp_P1.md',
    complications: [
      {
        id: 'ap_necrosis_infection',
        name: 'Hoại tử tụy nhiễm trùng & Áp xe tụy (Infected Pancreatic Necrosis)',
        severity: 'critical',
        timeframe: 'Tuần 2 - 4 sau khởi phát',
        incidence: '15 - 25% các ca viêm tụy hoại tử',
        pathophysiology: 'Tế bào mô tụy bị tự tiêu do men tụy hoạt hóa, sau đó vi khuẩn đường ruột (E. coli, Klebsiella, Pseudomonas) di chuyển xuyên thành ruột xâm lấn mô hoại tử.',
        earlyWarningSigns: ['Sốt gai rét trở lại sau tuần đầu tiên', 'Bạch cầu tăng vọt, CRP > 150 mg/L, Procalcitonin tăng cao', 'Đau bụng dữ dội không giảm kèm chướng bụng tăng dần'],
        diagnosticAction: 'Chụp CT-Scanner ổ bụng có cản quang (Balthazar độ D-E, chỉ số hoại tử > 30%), có dấu hiệu bọt khí trong ổ hoại tử (Retroperitoneal Gas). Chọc hút kim nhỏ (FNA) dưới hướng dẫn CT cấy vi sinh.',
        emergencyManagement: 'Kháng sinh ngấm tốt qua mô tụy (Carbapenem - Meropenem 1g mỗi 8 giờ hoặc Quinolone + Metronidazole). Chiến lược can thiệp bậc thang (Step-up approach): Dẫn lưu qua da/nội soi trước, nếu thất bại mới phẫu thuật nội soi sau phúc mạc cắt lọc mô hoại tử (VARD).',
        preventionStrategy: 'Hồi sức bù dịch đầy đủ trong 24 giờ đầu (Ringer Lactate 200-250 mL/h) bảo tồn tưới máu vi tuần hoàn tụy.'
      },
      {
        id: 'ap_multiorgan_failure',
        name: 'Suy đa tạng sớm (Early MODS: ARDS + Sốc + Suy thận cấp AKI)',
        severity: 'critical',
        timeframe: 'Giờ 24 - 72 đầu',
        incidence: '10 - 15%',
        pathophysiology: 'Men tụy và cytokine viêm (IL-1, IL-6, TNF-alpha) tràn ngập tuần hoàn hệ thống gây hội chứng đáp ứng viêm toàn thân dữ dội (SIRS) làm tổn thương mao mạch phế nang và cầu thận.',
        earlyWarningSigns: ['SpO2 giảm < 92%, thở nhanh > 25 l/p', 'Huyết áp tụt không nâng lên sau bù dịch', 'Creatinine máu tăng gấp đôi', 'Thang điểm Marshall hiệu chỉnh ≥ 2 điểm tại ≥ 1 cơ quan'],
        diagnosticAction: 'Khí máu động mạch (tính chỉ số PaO2/FiO2), Bilan chức năng gan thận, Theo dõi áp lực ổ bụng (IAP) qua bàng quang.',
        emergencyManagement: 'Chuyển ICU khẩn cấp. Thở máy bảo vệ phổi (Vt thấp 6 mL/kg PBW). Lọc máu liên tục (CRRT) loại bỏ cytokine và kiểm soát thể tích. Giảm áp lực ổ bụng nếu có hội chứng khoang bụng.',
        preventionStrategy: 'Đánh giá độ nặng sớm theo tiêu chuẩn Atlanta 2012 / Thang điểm BISAP trong 24 giờ đầu.'
      }
    ]
  },

  // ─── 6. ĐÁI THÁO ĐƯỜNG TÍP 2 (TYPE 2 DIABETES) ─────────────────────────────
  diabetes_t2: {
    diseaseId: 'diabetes_t2',
    diseaseName: 'Đái tháo đường típ 2',
    icd10: 'E11',
    specialty: 'Nội tiết - Chuyển hóa',
    vaultArticleRelPath: '2.5. Kho biến chứng/Nội tiết - Chuyển hóa/BC_Đái tháo đường_P1.md',
    complications: [
      {
        id: 'dm_hhs_dka',
        name: 'Hôn mê tăng áp lực thẩm thấu (HHS) & Nhiễm toan Ceton (DKA)',
        severity: 'critical',
        timeframe: 'Vài ngày đến 1 tuần diễn tiến',
        incidence: '1 - 3% bệnh nhân đợt cấp',
        pathophysiology: 'Thiếu hụt Insulin tương đối hoặc tuyệt đối cộng thêm tăng các hormon đối kháng (Cortisol, Glucagon) gây tăng đường huyết cực độ, mất nước thẩm thấu nặng nề qua thận.',
        earlyWarningSigns: ['Đường huyết mao mạch > 33.3 mmol/L (> 600 mg/dL)', 'Tri giác suy giảm: lơ mơ, ngủ gà, hôn mê', 'Dấu hiệu mất nước nặng: mắt trũng, da khô nhăn nheo, tụt huyết áp', 'Hơi thở mùi táo chín (DKA) hoặc thở nhanh sâu Kussmaul'],
        diagnosticAction: 'Định lượng ALTT huyết tương hiệu chỉnh (> 320 mOsm/kg), Khí máu động mạch (pH < 7.30 trong DKA), Định lượng Ceton máu (Beta-hydroxybutyrate > 3.0 mmol/L).',
        emergencyManagement: 'Bù dịch NaCl 0.9% tích cực (1-1.5 lít trong giờ đầu). Bơm tiêm điện Insulin Regular liều chuẩn 0.1 UI/kg/h. Bù Kali máu duy trì 4.0 - 5.0 mEq/L (không tiêm Insulin nếu K+ < 3.3).',
        preventionStrategy: 'Giáo dục người bệnh không tự ý bỏ Insulin/thuốc hạ đường khi bị ốm (Sick-day management).'
      },
      {
        id: 'dm_hypoglycemia',
        name: 'Hạ đường huyết nặng do thuốc (Severe Hypoglycemia)',
        severity: 'critical',
        timeframe: 'Đột ngột trong ngày (đặc biệt khi bỏ bữa/vận động quá sức)',
        incidence: 'Phổ biến khi dùng Sulfonylurea hoặc Insulin',
        pathophysiology: 'Lượng Insulin hoặc thuốc kích thích tiết Insulin vượt quá nhu cầu chuyển hóa cơ thể, làm não thiếu hụt nguồn năng lượng duy nhất là glucose.',
        earlyWarningSigns: ['Vã mồ hôi lạnh toàn thân', 'Run rẩy tay chân, tim đập nhanh hồi hộp', 'Đói cồn cào, hoa mắt chóng mặt', 'Lú lẫn, nói nhảm, co giật, hôn mê sâu'],
        diagnosticAction: 'Đo ngay đường huyết mao mạch tại giường (< 3.9 mmol/L hoặc < 70 mg/dL).',
        emergencyManagement: 'Bệnh nhân tỉnh: Cho uống ngay 15-20g đường nhanh (nước đường, nước ngọt có ga). Bệnh nhân hôn mê: Tiêm tĩnh mạch chậm 40-50 mL dung dịch Glucose 20% hoặc 30%, sau đó truyền duy trì Glucose 5-10% theo dõi đường huyết mỗi 15-30 phút.',
        preventionStrategy: 'Quy tắc 15-15: Uống 15g đường, nghỉ 15 phút đo lại. Ưu tiên dùng thuốc ít gây hạ đường huyết (SGLT2i, GLP-1RA, DPP-4i).'
      }
    ]
  }
};

/**
 * Lấy hồ sơ biến chứng theo Disease ID hoặc Tên bệnh
 */
export function getComplicationsForDisease(diseaseIdOrName: string): DiseaseComplicationProfile | undefined {
  const clean = diseaseIdOrName.toLowerCase().trim();
  
  // Direct ID match
  if (COMPLICATIONS_DATABASE[clean]) {
    return COMPLICATIONS_DATABASE[clean];
  }

  // Search by diseaseName or keywords
  for (const profile of Object.values(COMPLICATIONS_DATABASE)) {
    const profName = profile.diseaseName.toLowerCase();
    if (profName.includes(clean) || clean.includes(profName)) {
      return profile;
    }
  }

  return undefined;
}

/**
 * Động cơ phát hiện nguy cơ biến chứng dựa trên Sinh hiệu (Vitals) và Cận lâm sàng (Labs)
 */
export function detectComplicationRisks(
  diseaseId: string,
  vitals?: { vNhiet?: string; vMach?: string; vHATT?: string; vHATTr?: string; vTho?: string; vSpo2?: string },
  labs?: { lBC?: string; lTC?: string; lHct?: string; lGlu?: string; lTrop?: string }
): {
  complication: ComplicationEntry;
  riskLevel: 'critical' | 'high' | 'warning';
  matchedTriggers: string[];
}[] {
  const profile = getComplicationsForDisease(diseaseId);
  if (!profile) return [];

  const results: {
    complication: ComplicationEntry;
    riskLevel: 'critical' | 'high' | 'warning';
    matchedTriggers: string[];
  }[] = [];

  const hatt = vitals?.vHATT ? parseFloat(vitals.vHATT) : NaN;
  const mach = vitals?.vMach ? parseFloat(vitals.vMach) : NaN;
  const tho = vitals?.vTho ? parseFloat(vitals.vTho) : NaN;
  const spo2 = vitals?.vSpo2 ? parseFloat(vitals.vSpo2) : NaN;
  const glu = labs?.lGlu ? parseFloat(labs.lGlu) : NaN;
  const tc = labs?.lTC ? parseFloat(labs.lTC) : NaN;
  const trop = labs?.lTrop ? parseFloat(labs.lTrop) : NaN;

  for (const comp of profile.complications) {
    const triggers: string[] = [];

    // Tụt huyết áp / Sốc
    if (!isNaN(hatt) && hatt < 90 && (comp.id.includes('shock') || comp.id.includes('flash'))) {
      triggers.push(`Huyết áp tâm thu tụt: ${hatt} mmHg (< 90)`);
    }

    // Mạch nhanh
    if (!isNaN(mach) && mach > 110 && (comp.id.includes('shock') || comp.id.includes('vt_vf') || comp.id.includes('sepsis'))) {
      triggers.push(`Nhịp tim nhanh: ${mach} l/p (> 110)`);
    }

    // Suy hô hấp / SpO2 tụt
    if (!isNaN(spo2) && spo2 < 92 && (comp.id.includes('edema') || comp.id.includes('sepsis') || comp.id.includes('multiorgan'))) {
      triggers.push(`SpO₂ hạ thấp: ${spo2}% (< 92%)`);
    }

    // Nhịp thở nhanh
    if (!isNaN(tho) && tho > 24 && (comp.id.includes('sepsis') || comp.id.includes('edema') || comp.id.includes('multiorgan'))) {
      triggers.push(`Nhịp thở nhanh: ${tho} l/p (> 24)`);
    }

    // Tăng đường huyết cực độ
    if (!isNaN(glu) && glu > 25.0 && comp.id.includes('hhs_dka')) {
      triggers.push(`Đường huyết tăng cao: ${glu} mmol/L (> 25)`);
    }

    // Giảm tiểu cầu nặng
    if (!isNaN(tc) && tc < 100 && comp.id.includes('bleed')) {
      triggers.push(`Tiểu cầu giảm sâu: ${tc} G/L (< 100)`);
    }

    // Men tim tăng
    if (!isNaN(trop) && trop > 0.05 && (comp.id.includes('shock') || comp.id.includes('mechanical'))) {
      triggers.push(`Troponin tăng cao: ${trop} ng/mL`);
    }

    if (triggers.length > 0) {
      results.push({
        complication: comp,
        riskLevel: triggers.length >= 2 || comp.severity === 'critical' ? 'critical' : 'high',
        matchedTriggers: triggers
      });
    }
  }

  return results;
}
