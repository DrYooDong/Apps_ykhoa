/**
 * CliniPortal 2.0 — High-Yield Clinical Mechanism Cases, Flashcards & Cascade Builder Data
 * Path: src/content/pathophysiology/quiz/patho-quiz-data.ts
 * Evidence-Based Medicine (EBM) & Molecular Pathophysiology Database
 */

export interface CaseChallenge {
  id: string;
  specialty: string;
  specialtyKey: string;
  difficulty: 'Nền tảng' | 'Trung cấp' | 'Nâng cao';
  title: string;
  vignette: string;
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  cascadeExplanation: string;
  clinicalPearls: string;
  relatedModule?: string;
  readArticleLink?: string;
}

export interface FlashcardItem {
  id: string;
  category: string;
  categoryKey: string;
  frontTitle: string;
  frontClue: string;
  backMechanism: string;
  clinicalPearl: string;
  formulaOrLaw?: string;
}

export interface CascadeStep {
  id: string;
  stepNumber: number;
  stageName: string;
  text: string;
}

export interface CascadeBuilderItem {
  id: string;
  specialty: string;
  specialtyKey: string;
  title: string;
  clinicalScenario: string;
  orderedSteps: CascadeStep[];
  distractorSteps?: string[];
  fullCascadeText: string;
  clinicalPearl: string;
  relatedModule?: string;
}

/* ==========================================================================
   1. KHO 18 CA LÂM SÀNG CƠ CHẾ BỆNH SINH & HÓA SINH CHUYÊN SÂU (CLINICAL CASES)
   ========================================================================== */

export const CLINICAL_CASES: CaseChallenge[] = [
  // 1. TIM MẠCH: SUY TIM
  {
    id: 'case_1_hf_edema',
    specialty: 'Tim Mạch & Thận',
    specialtyKey: 'cardiology',
    difficulty: 'Trung cấp',
    title: 'Phù Chân & Khó Thở Khi Nằm ở Bệnh Nhân Suy Tim Tâm Thu',
    vignette: 'Bệnh nhân nam 68 tuổi có tiền căn nhồi máu cơ tim cũ, vào viện vì khó thở tăng dần khi nằm đầu bằng (orthopnea) và phù 2 chi dưới mức độ vừa. Khám: Tĩnh mạch cổ nổi ở 45 độ, ran ẩm 2 đáy phổi, T3 gallop, huyết áp 110/70 mmHg. Siêu âm tim cho thấy EF = 32%, giãn thất trái.',
    question: 'Chuỗi biến đổi cơ chế bệnh sinh nào sau đây giải thích chính xác nhất tình trạng ứ dịch và tái cấu trúc mô kẽ ở bệnh nhân này?',
    options: [
      {
        id: 'A',
        text: 'Giảm cung lượng tim ➔ Giảm tưới máu thận ➔ Hoạt hóa trục RAAS và hệ giao cảm ➔ Tăng tái hấp thu Na+ và nước tại ống thận ➔ Tăng áp suất thủy tĩnh mao mạch (Pc).',
        isCorrect: true
      },
      {
        id: 'B',
        text: 'Tăng áp lực keo huyết tương (πc) do gan tăng tổng hợp Albumin bù trừ ➔ Kéo nước vào mô kẽ.',
        isCorrect: false
      },
      {
        id: 'C',
        text: 'Ức chế hoàn toàn peptid lợi niệu BNP do tâm thất bị căng giãn quá mức ➔ Giảm bài tiết muối qua nước tiểu.',
        isCorrect: false
      },
      {
        id: 'D',
        text: 'Tổn thương màng đáy mao mạch ngoại vi làm giảm hệ số phản xạ protein (σ) xuống 0.',
        isCorrect: false
      }
    ],
    cascadeExplanation: 'Suy giảm co bóp thất trái (EF < 40%) ➔ Giảm thể tích tống máu (SV) & Cung lượng tim (CO) ➔ Kích hoạt thụ thể áp lực xoang cảnh & bộ máy cạnh cầu thận ➔ Tiết Renin & Noradrenaline ➔ Angiotensin II co tiểu động mạch đi và kích thích Vỏ thượng thận tiết Aldosterone ➔ Tăng tái hấp thu Na+ và nước tại ống lượn xa & ống góp ➔ Tăng thể tích dịch ngoại bào (ECF) & Tăng tiền tải ➔ Áp suất thủy tĩnh mao mạch ngoại vi và mao mạch phổi (Pc) vượt quá áp suất keo (πc) theo định luật Starling ➔ Thoát dịch vào mô kẽ gây phù chân và ứ huyết phổi.',
    clinicalPearls: 'Bộ tứ trụ điều trị suy tim phân suất tống máu giảm (HFrEF) gồm ARNI/ACEi, Beta-blocker, MRA và SGLT2i đều nhắm trực tiếp vào việc cắt đứt các mắt xích của chuỗi phản hồi bệnh lý RAAS - Giao cảm này.',
    relatedModule: '#/pathophysiology/simulators',
    readArticleLink: '#/pathophysiology/cases/slb-ccbs-hf'
  },

  // 2. MẠCH VÀNH: NHỒI MÁU CƠ TIM CẤP
  {
    id: 'case_2_acs_mi',
    specialty: 'Tim Mạch & Huyết Động',
    specialtyKey: 'cardiology',
    difficulty: 'Nâng cao',
    title: 'Đau Thắt Ngực Kiểu Đè Ép & Biến Đổi Điện Sinh Lý Trong Nhồi Máu Cơ Tim Cấp',
    vignette: 'Bệnh nhân nam 55 tuổi hút thuốc lá nhiều năm, đột ngột đau thắt ngực dữ dội sau xương ức lan lên cằm và tay trái kéo dài trên 30 phút, kèm vã mồ hôi lạnh. ECG ghi nhận đoạn ST chênh lên dạng vòm ở V1-V4. Men tim hs-Troponin I tăng gấp 20 lần giới hạn trên.',
    question: 'Ở mức độ tế bào và phân tử, cơ chế nào giải thích hiện tượng đoạn ST chênh lên trên ECG và sự phóng thích Troponin vào máu?',
    options: [
      {
        id: 'A',
        text: 'Tắc động mạch vành ➔ Thiếu oxy tế bào ➔ Ngừng phosphoryl hóa oxy hóa ➔ Cạn kiệt ATP ➔ Ức chế Na+/K+ ATPase gây khử cực một phần màng tế bào tạo dòng điện tổn thương ➔ Vỡ màng tế bào giải phóng Troponin.',
        isCorrect: true
      },
      {
        id: 'B',
        text: 'Tăng dòng Canxi đi ra ngoài tế bào làm tăng phân cực màng trong pha 2 của điện thế hoạt động.',
        isCorrect: false
      },
      {
        id: 'C',
        text: 'Tăng tổng hợp ATP ty thể quá mức làm mở đồng loạt các kênh K+ phụ thuộc điện thế.',
        isCorrect: false
      },
      {
        id: 'D',
        text: 'Hoạt hóa men Phospholipase C phân giải Actin giải phóng Troponin qua kênh ion mở tự do.',
        isCorrect: false
      }
    ],
    cascadeExplanation: 'Tắc hoàn toàn nhánh ĐM vành liên thất trước (LAD) do vỡ mảng xơ vữa và hình thành huyết khối đỏ giàu fibrin ➔ Thiếu máu cục bộ xuyên thành vùng trước vách ➔ Ngừng chuỗi chuyền điện tử ty thể trong vòng 8-10 giây ➔ Cạn kiệt ATP nội bào ➔ Bơm Na+/K+ ATPase ngừng hoạt động ➔ Ion K+ thất thoát ra ngoại bào, Na+ và Ca2+ ứ đọng nội bào ➔ Chênh lệch điện thế giữa vùng thiếu máu và vùng cơ tim lành tạo nên "Dòng điện tổn thương" (Current of Injury) biểu hiện là ST chênh lên ➔ Thiếu máu kéo dài > 20-30 phút gây toan chuyển hóa lactic, ứ đọng Ca2+ hoạt hóa men Protease phá hủy màng sarcolemma ➔ Phức hợp Troponin I/T tự do thoát vào tuần hoàn.',
    clinicalPearls: 'Hs-Troponin tim là tiêu chuẩn vàng chẩn đoán hoại tử tế bào cơ tim. Trong STEMI, "Thời gian là cơ tim" (Door-to-Balloon < 90 phút) nhằm tái tưới máu trước khi tế bào cơ tim chuyển từ giai đoạn thiếu máu hồi phục sang hoại tử vĩnh viễn.',
    relatedModule: '#/pathophysiology/simulators',
    readArticleLink: '#/pathophysiology/cases/slb-ccbs-acs'
  },

  // 3. HÔ HẤP: HEN PHẾ QUẢN CẤP
  {
    id: 'case_3_asthma_airway',
    specialty: 'Hô Hấp & Miễn Dịch',
    specialtyKey: 'respiratory',
    difficulty: 'Trung cấp',
    title: 'Cơn Khó Thở Thì Thở Ra & Bẫy Khí Trong Hen Phế Quản Cấp',
    vignette: 'Bệnh nhân nữ 24 tuổi có tiền sử viêm mũi dị ứng, nhập viện vì khó thở thì thở ra, thở rít cò cử sau khi dọn nhà nhiều bụi. Khám: Co kéo cơ hô hấp phụ, lồng ngực căng phồng, nghe phổi có nhiều ran rít và ran ngáy lan tỏa 2 phế trường. FEV1 giảm còn 45% giá trị dự đoán.',
    question: 'Chất trung gian hóa học nào sau đây chịu trách nhiệm chính cho tình trạng co thắt cơ trơn phế quản kéo dài và tăng tiết nhầy trong pha muộn của cơn hen?',
    options: [
      {
        id: 'A',
        text: 'Cysteinyl Leukotrienes (LTC4, LTD4, LTE4) do tế bào Mast và Bạch cầu ái toan tiết ra.',
        isCorrect: true
      },
      {
        id: 'B',
        text: 'Surfactant phế nang do tế bào biểu mô phế nang Type II tiết ra.',
        isCorrect: false
      },
      {
        id: 'C',
        text: 'Nitric Oxide tổng hợp từ enzym eNOS nội mô gây giãn phế quản nghịch thường.',
        isCorrect: false
      },
      {
        id: 'D',
        text: 'Interleukin-10 ức chế hoàn toàn phản ứng viêm của tế bào Th2.',
        isCorrect: false
      }
    ],
    cascadeExplanation: 'Dị nguyên xâm nhập niêm mạc phế quản ➔ Tế bào trình diện kháng nguyên (APC) hoạt hóa lympho Th2 ➔ Tiết IL-4, IL-5, IL-13 ➔ Kích thích lympho B chuyển lớp kháng thể sang IgE ➔ IgE gắn lên thụ thể FcεRI trên dưỡng bào (Mast cell) ➔ Dị nguyên tái tiếp xúc liên kết chéo các phân tử IgE ➔ Degranulation giải phóng Histamin (gây co thắt sớm) và sinh tổng hợp Leukotrienes C4, D4, E4 từ acid arachidonic qua con đường 5-Lipoxygenase ➔ Leukotrienes có hoạt lực co thắt cơ trơn phế quản mạnh gấp 1000 lần Histamin, gây phù nề niêm mạc, tăng tiết nút nhầy dính đặc ➔ Tăng sức cản đường thở, bẫy khí thì thở ra, thông khí phế nang không đồng đều gây bất tương xứng V/Q.',
    clinicalPearls: 'Thuốc đối kháng thụ thể Leukotriene (Montelukast) và Thuốc ức chế 5-Lipoxygenase nhắm trúng đích vào cơ chế này. Trong cơn cấp, đồng vận Beta-2 tác dụng ngắn (SABA) kích hoạt con đường Gs-cAMP-PKA làm giãn nhanh cơ trơn phế quản.',
    relatedModule: '#/pathophysiology/simulators',
    readArticleLink: '#/pathophysiology/cases/slb-ccbs-hen'
  },

  // 4. HÔ HẤP NGUY KỊCH: ARDS
  {
    id: 'case_4_ards_shunt',
    specialty: 'Hô Hấp & Cấp Cứu',
    specialtyKey: 'respiratory',
    difficulty: 'Nâng cao',
    title: 'Giảm Oxy Máu Kháng Trị & Shunt Phải - Trái Trong Hội Chứng ARDS',
    vignette: 'Bệnh nhân nam 40 tuổi viêm tụy cấp nặng ngày thứ 3, đột ngột thở nhanh 36 lần/phút, tím tái. Khí máu động mạch thở oxy mask túi 15L/phút (FiO2 ~ 80%): pH 7.32, PaO2 52 mmHg, PaCO2 33 mmHg (PaO2/FiO2 = 65 mmHg). X-quang phổi cho thấy thâm nhiễm phế nang lan tỏa 2 bên (phổi trắng), không có dấu hiệu suy tim sung huyết.',
    question: 'Cơ chế bệnh sinh chính dẫn đến tình trạng giảm oxy máu nặng không đáp ứng với liệu pháp thở oxy liều cao ở bệnh nhân này là gì?',
    options: [
      {
        id: 'A',
        text: 'Tổn thương màng phế nang - mao mạch làm tràn ngập dịch giàu protein vào phế nang ➔ Xẹp phế nang tạo luồng Shunt nội phổi (Qs/Qt tăng cao).',
        isCorrect: true
      },
      {
        id: 'B',
        text: 'Liệt cơ hoành do giảm kali máu làm giảm thể tích khí lưu thông.',
        isCorrect: false
      },
      {
        id: 'C',
        text: 'Tăng áp lực mao mạch phổi bít (PCWP > 18 mmHg) do quá tải tuần hoàn thể tích.',
        isCorrect: false
      },
      {
        id: 'D',
        text: 'Giảm ái lực của Hemoglobin với Oxy do máu bị kiềm hóa nặng nề.',
        isCorrect: false
      }
    ],
    cascadeExplanation: 'Enzym tụy và Cytokines gây viêm toàn thân (TNF-α, IL-1β, IL-6, IL-8) ➔ Hoạt hóa bạch cầu đa nhân trung tính bám dính và xuyên mạch vào nhu mô phổi ➔ Phóng thích các gốc tự do oxy hóa ROS và men Protease (Elastase) ➔ Phá hủy tế bào nội mô mao mạch và tế bào biểu mô phế nang (Pneumocyte Type I & Type II) ➔ Mất tính toàn vẹn hàng rào phế nang - mao mạch ➔ Dịch phù giàu protein và fibrin tràn vào phế nang tạo màng Hyaline ➔ Mất Surfactant gây xẹp phế nang diện rộng ➔ Máu tĩnh mạch qua mao mạch phổi không được trao đổi khí (Shunt V/Q = 0) ➔ Oxy hít vào nồng độ cao không thể khuếch tán vào máu được do phế nang bị tắc nghẽn dịch phù và xẹp.',
    clinicalPearls: 'Chiến lược thở máy bảo vệ phổi trong ARDS kinh điển (ARDSNet): Thể tích khí lưu thông thấp (Vt 4-6 mL/kg cân nặng lý tưởng), duy trì áp lực đẩy (Driving Pressure) < 15 cmH2O và sử dụng PEEP tối ưu để huy động phế nang xẹp mà không làm căng giãn quá mức vùng phổi lành.',
    relatedModule: '#/pathophysiology/simulators',
    readArticleLink: '#/pathophysiology/cases/slb-ccbs-ards'
  },

  // 5. TIÊU HÓA - GAN: XƠ GAN & TĂNG ÁP CỬA
  {
    id: 'case_5_cirrhosis_ascites',
    specialty: 'Tiêu Hóa & Gan Mật',
    specialtyKey: 'gi_hepato',
    difficulty: 'Nâng cao',
    title: 'Cổ Trướng Lượng Nhiều & Giãn Giảm Áp Lực Tuần Hoàn Hiệu Dụng Trong Xơ Gan',
    vignette: 'Bệnh nhân nam 52 tuổi tiền sử nghiện rượu 20 năm, vào viện vì bụng trướng to nhanh kèm vàng da nhẹ và phù chân. Khám: Tuần hoàn bàng hệ kiểu cửa - chủ, gõ đục vùng thấp, dấu sóng vỗ (+), sao mạch trên ngực. Xét nghiệm: Albumin 22 g/L, Bilirubin toàn phần 55 µmol/L, Na+ máu 128 mEq/L.',
    question: 'Yếu tố nào đóng vai trò khởi phát sự giãn mạch tạng và hoạt hóa hệ thống giữ muối nước thứ phát ở bệnh nhân xơ gan cổ trướng?',
    options: [
      {
        id: 'A',
        text: 'Tăng sản xuất Nitric Oxide (NO) cục bộ tại tuần hoàn mạc treo do tăng áp lực cửa và chuyển vị vi khuẩn đường ruột.',
        isCorrect: true
      },
      {
        id: 'B',
        text: 'Tăng tổng hợp quá mức Albumin làm tăng áp lực keo nội mạch.',
        isCorrect: false
      },
      {
        id: 'C',
        text: 'Ức chế thụ thể V2 của ADH tại ống góp làm cô đặc nước tiểu.',
        isCorrect: false
      },
      {
        id: 'D',
        text: 'Tăng áp lực tưới máu động mạch thận kích thích bài tiết Natri niệu.',
        isCorrect: false
      }
    ],
    cascadeExplanation: 'Xơ hóa khoảng cửa và biến dạng cấu trúc tiểu thùy gan ➔ Tăng sức cản mạch máu trong gan ➔ Tăng áp lực tĩnh mạch cửa (> 10-12 mmHg) ➔ Kích thích tế bào nội mô mạch máu mạc treo sản xuất lượng lớn Nitric Oxide (NO) ➔ Giãn toàn bộ động mạch tạng mạc treo ➔ Ứ đọng lượng lớn thể tích máu tại giường mạch tạng ➔ Giảm thể tích máu động mạch hiệu dụng (Effective Arterial Blood Volume) ➔ Kích thích các thụ thể áp lực xoang cảnh & cầu thận ➔ Hoạt hóa cực đại hệ Thần kinh giao cảm, Trục RAAS và bài tiết ADH (Vasopressin) không theo áp suất thẩm thấu ➔ Thận co mạch dữ dội và tăng tái hấp thu muối nước cực đại ➔ Kết hợp với giảm áp lực keo huyết tương (do suy giảm tổng hợp Albumin tại tế bào gan) và tăng áp lực thủy tĩnh xoang gan ➔ Dịch thấm lọc tràn ngập vào khoang phúc mạc hình thành cổ trướng.',
    clinicalPearls: 'Điều trị cổ trướng trong xơ gan kết hợp Spironolactone (kháng Aldosterone) và Furosemide theo tỷ lệ chuẩn 100mg : 40mg để duy trì cân bằng Kali máu. Trong Hội chứng Gan Thận (HRS-AKI), thuốc co mạch tạng Terlipressin phối hợp Albumin giúp đảo ngược tình trạng giãn mạch tạng.',
    relatedModule: '#/pathophysiology/simulators',
    readArticleLink: '#/pathophysiology/cases/slb-ccbs-xg'
  },

  // 6. TIÊU HÓA: DẠ DÀY & H. PYLORI
  {
    id: 'case_6_pud_hpylori',
    specialty: 'Tiêu Hóa & Vi Sinh',
    specialtyKey: 'gi_hepato',
    difficulty: 'Trung cấp',
    title: 'Loét Hành Tá Tràng & Mất Ức Chế Tiết Acid Do Nhiễm Helicobacter pylori',
    vignette: 'Bệnh nhân nam 32 tuổi hay đau bụng âm ỉ vùng thượng vị xuất hiện sau ăn 2-3 giờ hoặc lúc đói nửa đêm, ăn vào thì đỡ đau. Nội soi dạ dày tá tràng thấy ổ loét kích thước 1.2 cm tại mặt trước hành tá tràng, Clo-test (Urease) dương tính mạnh.',
    question: 'H. pylori cư trú chủ yếu tại vùng hang vị gây tăng tiết acid HCl qua cơ chế tác động lên loại tế bào nội tiết nào của niêm mạc dạ dày?',
    options: [
      {
        id: 'A',
        text: 'Phá hủy tế bào D làm giảm bài tiết Somatostatin ➔ Mất ức chế lên tế bào G ➔ Tăng tiết Gastrin kích thích tế bào Viền tăng sản xuất HCl.',
        isCorrect: true
      },
      {
        id: 'B',
        text: 'Kích thích trực tiếp tế bào ECL giải phóng Acetylcholine ức chế bơm H+/K+ ATPase.',
        isCorrect: false
      },
      {
        id: 'C',
        text: 'Tăng tổng hợp Prostaglandin E2 làm mỏng lớp chất nhầy bảo vệ niêm mạc tá tràng.',
        isCorrect: false
      },
      {
        id: 'D',
        text: 'Ức chế hoàn toàn men Urease làm môi trường hang vị bị acid hóa cực độ tiêu diệt vi khuẩn.',
        isCorrect: false
      }
    ],
    cascadeExplanation: 'H. pylori sử dụng men Urease chuyển hóa Ure thành NH3 và CO2 để tạo vi môi trường kiềm bảo vệ xung quanh nó ➔ Vi khuẩn bám dính tế bào biểu mô hang vị qua các adhesin (BabA, SabA) và tiết độc tố CagA, VacA gây viêm niêm mạc mạn tính ➔ Phản ứng viêm làm tổn thương và giảm số lượng tế bào D tiết Somatostatin tại hang vị ➔ Mất tác dụng ức chế kiểu paracrine của Somatostatin lên tế bào G (tiết Gastrin) và tế bào Viền (tiết HCl) ➔ Nồng độ Gastrin máu tăng cao ➔ Gastrin kích thích thụ thể CCK-B trên tế bào ECL giải phóng Histamin ➔ Histamin gắn thụ thể H2 trên tế bào Viền kích hoạt bơm proton H+/K+ ATPase tiết lượng lớn ion H+ ➔ Dịch vị quá toan trào vào hành tá tràng làm vượt quá khả năng đệm của bicarbonat dịch tụy ➔ Dị sản dạ dày tại tá tràng (Gastric Metaplasia), vi khuẩn xâm chiếm và gây loét tá tràng.',
    clinicalPearls: 'Thuốc ức chế bơm Proton (PPI) ức chế trực tiếp giai đoạn cuối cùng của quá trình tiết acid tại kênh H+/K+ ATPase, bất kể kích thích khởi phát là Gastrin, Histamin hay Acetylcholine. Tiệt trừ H. pylori giúp phục hồi số lượng tế bào D và giảm tỷ lệ tái phát loét từ 80% xuống < 5%.',
    relatedModule: '#/pathophysiology/biochemistry',
    readArticleLink: '#/pathophysiology/cases/slb-ccbs-pud'
  },

  // 7. TIÊU HÓA: VIÊM TỤY CẤP
  {
    id: 'case_7_pancreatitis_autodigestion',
    specialty: 'Tiêu Hóa & Cấp Cứu',
    specialtyKey: 'gi_hepato',
    difficulty: 'Nâng cao',
    title: 'Tự Tiêu Hủy Enzyme Nội Bào & Hoại Tử Mỡ Trong Viêm Tụy Cấp',
    vignette: 'Bệnh nhân nữ 45 tuổi thể trạng béo phì, nhập viện sau bữa ăn thịnh soạn nhiều dầu mỡ vì đau dữ dội vùng thượng vị lan xuyên ra sau lưng, kèm buồn nôn và nôn nhiều. Khám bụng chướng, ấn đau đề kháng thượng vị. Xét nghiệm: Amylase máu 1800 U/L, Lipase máu 2400 U/L, Canxi máu toàn phần 1.85 mmol/L (giảm).',
    question: 'Hiện tượng hạ Canxi máu trong viêm tụy cấp nặng được giải thích bằng cơ chế sinh học phân tử nào?',
    options: [
      {
        id: 'A',
        text: 'Enzym Lipase được hoạt hóa giải phóng acid béo tự do, acid béo kết hợp với ion Canxi tạo thành phức hợp xà phòng hóa không tan (Saponification).',
        isCorrect: true
      },
      {
        id: 'B',
        text: 'Tuyến cận giáp bị tiêu hủy hoàn toàn bởi men Trypsin làm ngừng tiết PTH.',
        isCorrect: false
      },
      {
        id: 'C',
        text: 'Thận tăng bài tiết canxi qua nước tiểu do tác dụng phụ của men Amylase.',
        isCorrect: false
      },
      {
        id: 'D',
        text: 'Canxi bị đẩy vào trong ty thể tế bào biểu mô ruột để tạo năng lượng ATP bù trừ.',
        isCorrect: false
      }
    ],
    cascadeExplanation: 'Sỏi mật kẹt tại bóng Vater hoặc độc chất cồn ➔ Tắc nghẽn dòng chảy dịch tụy và tăng áp lực ống tụy ➔ Trộn lẫn các hạt zymogen chứa enzyme tụy với không bào tiêu thể (Lysosome) bên trong tế bào nang tuyến tụy ➔ Men Cathepsin B của tiêu thể cắt và hoạt hóa sớm Trypsinogen thành Trypsin tự do ngay trong bào tương tế bào ➔ Trypsin kích hoạt hàng loạt các tiền men khác (Chymotrypsin, Elastase, Phospholipase A2, Procarboxypeptidase) ➔ Men Elastase phá hủy thành mạch máu gây xuất huyết, Phospholipase A2 phá hủy màng tế bào ➔ Men Lipase phân giải mô mỡ quanh tụy và mạc nối thành các acid béo tự do (FFA) ➔ Các acid béo tự do kết tủa với ion Canxi huyết thanh tạo thành các vết đốm xà phòng trắng (Hiện tượng xà phòng hóa Canxi - Saponification) ➔ Tiêu hao lượng lớn Canxi tự do trong máu gây hạ Canxi máu cấp.',
    clinicalPearls: 'Hạ Canxi máu là một trong các tiêu chuẩn tiên lượng nặng trong thang điểm Ranson và Glasgow. Lipase có độ nhạy và độ đặc hiệu cao hơn Amylase nhiều trong chẩn đoán viêm tụy cấp, đặc biệt ở bệnh nhân đến muộn hoặc do rượu.',
    relatedModule: '#/pathophysiology/biochemistry',
    readArticleLink: '#/pathophysiology/cases/slb-ccbs-vtc'
  },

  // 8. THẬN: TỔN THƯƠNG THẬN CẤP (AKI)
  {
    id: 'case_8_aki_atn',
    specialty: 'Thận & Điện Giải',
    specialtyKey: 'nephrology',
    difficulty: 'Nâng cao',
    title: 'Hoại Tử Ống Thận Cấp Do Thiếu Máu & Phản Hồi Ống - Cầu Thận (TGF)',
    vignette: 'Bệnh nhân nam 62 tuổi sốc mất máu sau chấn thương vỡ lách, huyết áp tụt 70/40 mmHg trong 2 giờ trước khi được phẫu thuật. Sau mổ 24 giờ, bệnh nhân thiểu niệu (nước tiểu 200 mL/24h), Creatinine tăng từ 80 lên 320 µmol/L, FeNa (Phân suất bài tiết Natri) = 2.8%, cặn lắng nước tiểu có nhiều trụ hạt màu nâu bùn (Muddy brown granular casts).',
    question: 'Tình trạng FeNa > 2% và sự hình thành trụ hạt màu nâu bùn phản ánh cơ chế tổn thương nào tại ống thận?',
    options: [
      {
        id: 'A',
        text: 'Tổn thương và bong tróc tế bào biểu mô ống lượn gần và quai Henle làm mất phân cực bơm Na+/K+ ATPase, tế bào hoại tử lọt vào lòng ống tạo trụ tắc nghẽn.',
        isCorrect: true
      },
      {
        id: 'B',
        text: 'Co thắt tiểu động mạch đến của cầu thận đơn thuần nhưng cấu trúc tế bào ống thận còn nguyên vẹn hoàn toàn.',
        isCorrect: false
      },
      {
        id: 'C',
        text: 'Tăng tái hấp thu Na+ quá mức tại ống lượn xa do kích thích trục Aldosterone.',
        isCorrect: false
      },
      {
        id: 'D',
        text: 'Lắng đọng phức hợp kháng nguyên - kháng thể làm rách màng đáy cầu thận.',
        isCorrect: false
      }
    ],
    cascadeExplanation: 'Tụt huyết áp kéo dài làm giảm nghiêm trọng tưới máu tủy thận ngoài (vùng vốn dĩ có phân áp oxy thấp sinh lý) ➔ Thiếu máu cục bộ tế bào biểu mô ống lượn gần (đoạn S3) và nhánh dày quai Henle ➔ Cạn kiệt ATP nội bào ➔ Mất phân cực màng: Bơm Na+/K+ ATPase bị di dời từ màng đáy - bên lên màng đỉnh lòng ống ➔ Mất khả năng tái hấp thu Na+ chủ động dẫn đến FeNa > 2% ➔ Khung xương tế bào actin bị phá vỡ, các tế bào biểu mô bong tróc vào lòng ống thận ➔ Tế bào hoại tử kết tụ với protein Tamm-Horsfall tạo thành trụ hạt màu nâu bùn ➔ Trụ gây tắc nghẽn lòng ống, làm tăng áp suất thủy tĩnh trong bao Bowman chống lại áp lực lọc cầu thận ➔ Dịch lọc mang nhiều Na+ tới vết đặc (Macula densa) kích hoạt phản xạ Phản hồi Ống - Cầu thận (Tubuloglomerular Feedback - TGF) làm co tiểu động mạch đến ➔ GFR giảm sụt nghiêm trọng.',
    clinicalPearls: 'Phân biệt AKI trước thận (Pre-renal) và Hoại tử ống thận cấp tại thận (ATN): Pre-renal có FeNa < 1%, U/Cr niệu/máu > 20, nước tiểu trong; ATN có FeNa > 2%, U/Cr niệu/máu < 10, cặn lắng có trụ hạt nâu bùn.',
    relatedModule: '#/pathophysiology/simulators',
    readArticleLink: '#/pathophysiology/cases/slb-ccbs-aki'
  },

  // 9. THẬN: BỆNH THẬN MẠN & LOẠN DƯỠNG XƯƠNG
  {
    id: 'case_9_ckd_mineral_bone',
    specialty: 'Thận & Nội Tiết',
    specialtyKey: 'nephrology',
    difficulty: 'Nâng cao',
    title: 'Rối Loạn Khoáng Chất - Xương & Cường Cận Giáp Thứ Phát Trong Bệnh Thận Mạn',
    vignette: 'Bệnh nhân nữ 58 tuổi tiền sử ĐTĐ type 2 biến chứng bệnh thận mạn giai đoạn 4 (eGFR = 22 mL/phút/1.73m2). Xét nghiệm định kỳ: Phospho máu 2.1 mmol/L (tăng), Canxi toàn phần 1.95 mmol/L (giảm), iPTH (Hormone cận giáp nguyên vẹn) 380 pg/mL (tăng gấp 6 lần bình thường), FGF-23 tăng cao.',
    question: 'Sự suy giảm tổng hợp chất nào tại mô thận là nguyên nhân cốt lõi gây giảm hấp thu Canxi tại ruột và kích thích tuyến cận giáp tăng tiết PTH bù trừ?',
    options: [
      {
        id: 'A',
        text: '1,25-dihydroxycholecalciferol (Calcitriol) do giảm hoạt tính men 1-alpha-hydroxylase tại tế bào ống thận.',
        isCorrect: true
      },
      {
        id: 'B',
        text: 'Erythropoietin (EPO) làm giảm phân chia tế bào tủy xương.',
        isCorrect: false
      },
      {
        id: 'C',
        text: 'Renin làm mất khả năng giữ muối tại quai Henle.',
        isCorrect: false
      },
      {
        id: 'D',
        text: 'Angiotensinogen do gan không thể chuyển hóa tại biểu mô cầu thận.',
        isCorrect: false
      }
    ],
    cascadeExplanation: 'Mất dần các nephron chức năng trong CKD ➔ Giảm độ lọc cầu thận GFR ➔ Giảm bài xuất Phosphate qua nước tiểu ➔ Tích tụ Phosphate trong máu (Tăng Phosphate máu) ➔ Phosphate tự do liên kết với Canxi tạo phức hợp lắng đọng gây hạ Canxi máu ion hóa ➔ Mô xương tăng tiết Fibroblast Growth Factor 23 (FGF-23) để thải bớt Phosphate ➔ FGF-23 phối hợp với sự tổn thương khối tế bào ống thận ức chế mạnh men 1-α-hydroxylase (CYP27B1) ➔ Giảm chuyển hóa 25(OH)D3 thành dạng hoạt tính sinh học 1,25(OH)2D3 (Calcitriol) ➔ Giảm hấp thu Canxi tại ruột ➔ Nồng độ Canxi máu thấp kéo dài và thiếu Calcitriol làm mất ức chế lên thụ thể cảm ứng canxi (CaSR) trên tuyến cận giáp ➔ Tuyến cận giáp phì đại và tăng tiết PTH ồ ạt (Cường cận giáp thứ phát) ➔ PTH kích thích hủy cốt bào phá hủy xương giải phóng Canxi gây viêm xương sợi hóa (Osteitis Fibrosa Cystica) và vôi hóa mạch máu.',
    clinicalPearls: 'Kiểm soát CKD-MBD đòi hỏi can thiệp đa mục tiêu: Thuốc gắn Phosphate tại ruột (Calcium acetate, Sevelamer), Bổ sung Vitamin D hoạt tính (Calcitriol), và Thuốc bắt chước Canxi (Calcimimetics như Cinacalcet) để ức chế tiết PTH mà không làm tăng tích số Ca x P.',
    relatedModule: '#/pathophysiology/biochemistry',
    readArticleLink: '#/pathophysiology/cases/slb-ccbs-ckd'
  },

  // 10. NỘI TIẾT: DKA
  {
    id: 'case_10_dka_ketogenesis',
    specialty: 'Nội Tiết & Chuyển Hóa',
    specialtyKey: 'endocrine',
    difficulty: 'Nâng cao',
    title: 'Thở Nhanh Sâu Kussmaul & Nhiễm Toan Ceton Do Đái Tháo Đường',
    vignette: 'Bệnh nhân nữ 19 tuổi ĐTĐ type 1 tự ý ngưng tiêm Insulin 2 ngày, nhập viện vì lơ mơ, buồn nôn, đau bụng dữ dội, thở nhanh sâu kiểu Kussmaul (tần số 32 lần/phút), hơi thở mùi táo thối. Xét nghiệm: Glucose máu 480 mg/dL, pH máu 7.12, HCO3- 7 mEq/L, pCO2 18 mmHg, Na+ 130 mEq/L, Cl- 94 mEq/L, Ceton niệu (++++).',
    question: 'Bước enzym nào giải thích sự chuyển hướng các acid béo tự do vào trong ty thể gan để tổng hợp thể ceton ồ ạt khi thiếu hụt Insulin tuyệt đối?',
    options: [
      {
        id: 'A',
        text: 'Giảm Malonyl-CoA làm mất ức chế men Carnitine Palmitoyltransferase-I (CPT-I), đưa acid béo vào ty thể thực hiện beta-oxy hóa tạo Acetyl-CoA vượt quá công suất chu trình Krebs.',
        isCorrect: true
      },
      {
        id: 'B',
        text: 'Ức chế men HMG-CoA Reductase làm ngừng tổng hợp Cholesterol chuyển sang thoái hóa ceton.',
        isCorrect: false
      },
      {
        id: 'C',
        text: 'Hoạt hóa men Glycogen Synthase biến đổi toàn bộ glucose thừa thành acid acetoacetic.',
        isCorrect: false
      },
      {
        id: 'D',
        text: 'Tăng tổng hợp Oxaloacetate làm cạn kiệt cơ chất của chu trình Acid Citric.',
        isCorrect: false
      }
    ],
    cascadeExplanation: 'Thiếu hụt Insulin tuyệt đối + Tăng vọt các hormone đối kháng (Glucagon, Cortisol, Epinephrine) ➔ Tăng hoạt tính men Hormone-Sensitive Lipase (HSL) tại mô mỡ ➔ Ly giải Triglyceride giải phóng hàng loạt Acid béo tự do (FFA) vào máu ➔ Tại tế bào gan, nồng độ Malonyl-CoA giảm sút do thiếu Insulin ➔ Mất ức chế lên enzyme con thoi Carnitine Palmitoyltransferase-I (CPT-I) trên màng ngoài ty thể ➔ Axyl béo ồ ạt đi vào chất nền ty thể thực hiện quá trình $\\beta$-oxy hóa sinh ra lượng khổng lồ Acetyl-CoA ➔ Acetyl-CoA không thể vào hết chu trình Krebs (vì Oxaloacetate đã bị rút đi để tân tạo glucose) ➔ 3 phân tử Acetyl-CoA ngưng tụ qua enzyme HMG-CoA Synthase tạo thành Acetoacetate, $\\beta$-Hydroxybutyrate và Acetone (các thể ceton) ➔ Các acid ceton phân ly phóng thích ion $H^+$ làm cạn kiệt hệ đệm Bicarbonat ➔ Toan chuyển hóa tăng khoảng trống Anion Gap kích thích trung tâm hô hấp tại hành não gây kiểu thở Kussmaul nhằm bù trừ hô hấp tối đa.',
    clinicalPearls: 'Anion Gap ở bệnh nhân này: AG = 130 - (94 + 7) = 29 mEq/L (> 12). Công thức Winter: $pCO_2 = 1.5 \\times 7 + 8 = 18.5 \\pm 2$ mmHg (phù hợp hoàn hảo với $pCO_2 = 18$ mmHg đo được ➔ Bù trừ hô hấp tối ưu). Lưu ý bù Kali trước khi truyền Insulin nếu $K^+ < 3.3$ mEq/L vì Insulin đưa Kali vào trong tế bào.',
    relatedModule: '#/pathophysiology/biochemistry',
    readArticleLink: '#/pathophysiology/cases/slb-ccbs-dka'
  },

  // 11. NỘI TIẾT: CƠN BÃO GIÁP
  {
    id: 'case_11_thyroid_storm',
    specialty: 'Nội Tiết & Cấp Cứu',
    specialtyKey: 'endocrine',
    difficulty: 'Nâng cao',
    title: 'Sốt Cao, Rung Nhĩ & Cơn Bão Giáp Kích Hoạt Tăng Tiêu Thụ Oxy Tế Bào',
    vignette: 'Bệnh nhân nữ 35 tuổi tiền sử Basedow điều trị không liên tục, sau khi nhổ răng khôn 1 ngày thì sốt cao 40.5 độ C, kích động mê sảng, vã mồ hôi đầm đìa, tim đập loạn nhịp hoàn toàn. ECG ghi nhận Rung nhĩ đáp ứng thất nhanh tần số 165 chu kỳ/phút, huyết áp 160/70 mmHg.',
    question: 'Hormone tuyến giáp (T3/T4) tăng cao tự do kích thích sinh nhiệt và tăng nhịp tim thông qua cơ chế phân tử nào?',
    options: [
      {
        id: 'A',
        text: 'Gắn lên thụ thể nhân tế bào (TR) làm tăng phiên mã bơm Na+/K+ ATPase và tăng mật độ thụ thể Beta-1 Adrenergic trên màng tế bào cơ tim.',
        isCorrect: true
      },
      {
        id: 'B',
        text: 'Ức chế hoàn toàn chuỗi hô hấp tế bào làm giảm sản xuất nhiệt năng cơ thể.',
        isCorrect: false
      },
      {
        id: 'C',
        text: 'Phong bế kênh Canxi loại L trên nút xoang làm chậm dẫn truyền nút nhĩ thất.',
        isCorrect: false
      },
      {
        id: 'D',
        text: 'Kích thích thụ thể Muscarinic M2 của hệ phó giao cảm gây co thắt mạch vành.',
        isCorrect: false
      }
    ],
    cascadeExplanation: 'T3 (Triiodothyronine) tự do khuếch tán vào nhân tế bào gắn lên thụ thể Hormone Tuyến giáp (TR - Thyroid Hormone Receptor) tạo dị dị hợp thể với thụ thể RXR ➔ Liên kết với yếu tố đáp ứng TRE trên promoter của DNA ➔ Tăng cường phiên mã và tổng hợp hàng loạt protein then chốt: (1) Bơm $Na^+/K^+$ ATPase trên màng hầu hết các mô làm tăng tiêu hao năng lượng ATP và sinh nhiệt khổng lồ (Calorigenic effect) gây sốt cao vọt; (2) Tăng biểu hiện thụ thể $\\beta_1$-Adrenergic tại cơ tim và nút xoang, đồng thời tăng biểu hiện protein Phospholamban và SERCA2a ➔ Tăng tính nhạy cảm của tim với Catecholamine ➔ Tăng co bóp cơ tim (Inotropy), tăng nhịp tim (Chronotropy) và rút ngắn thời gian trơ dẫn đến loạn nhịp nhanh kịch phát (Rung nhĩ).',
    clinicalPearls: 'Điều trị cơn bão giáp theo thang điểm Burch-Wartofsky: Phối hợp Propylthiouracil (PTU - ức chế tổng hợp và ức chế men 5\'-deiodinase ngoại vi), Thuốc chẹn beta Propranolol, Dung dịch Iod Lugol (hiệu ứng Wolff-Chaikoff - cho sau PTU 1 giờ) và Hydrocortisone.',
    relatedModule: '#/pathophysiology/biochemistry',
    readArticleLink: '#/pathophysiology/biochemistry/block2-catalysis-signaling'
  },

  // 12. HUYẾT HỌC: THIẾU G6PD
  {
    id: 'case_12_g6pd_deficiency',
    specialty: 'Huyết Học & Di Truyền',
    specialtyKey: 'hematology',
    difficulty: 'Trung cấp',
    title: 'Tán Huyết Cấp Do Thiếu Enzym G6PD Khi Tiếp Xúc Tác Nhân Oxy Hóa',
    vignette: 'Bệnh nhân nam 22 tuổi sau khi uống thuốc kháng sinh Sulfamethoxazole-Trimethoprim (Bactrim) 2 ngày thì xuất hiện mệt lả, vàng mắt, nước tiểu sẫm màu như nước ngọt coca-cola. Xét nghiệm: Hb giảm từ 14.5 xuống 8.2 g/dL, Bilirubin gián tiếp 58 µmol/L, Haptoglobin huyết thanh giảm gần bằng 0. Nhuộm phết máu ngoại biên thấy có hồng cầu hình vết cắn (Bite cells) và thể Heinz.',
    question: 'Enzym G6PD giữ vai trò sống còn bảo vệ màng hồng cầu chống lại các gốc tự do thông qua việc cung cấp chất nào?',
    options: [
      {
        id: 'A',
        text: 'NADPH trong con đường Pentose Phosphate để duy trì trạng thái khử của Glutathione (GSH).',
        isCorrect: true
      },
      {
        id: 'B',
        text: 'NADH trong con đường đường phân để khử Methemoglobin thành Hemoglobin bình thường.',
        isCorrect: false
      },
      {
        id: 'C',
        text: '2,3-Bisphosphoglycerate (2,3-BPG) để tăng giải phóng oxy cho mô ngoại biên.',
        isCorrect: false
      },
      {
        id: 'D',
        text: 'ATP từ chu trình Krebs để nuôi dưỡng nhân tế bào hồng cầu trưởng thành.',
        isCorrect: false
      }
    ],
    cascadeExplanation: 'Hồng cầu trưởng thành không có ty thể, hoàn toàn phụ thuộc vào con đường Đường phân (Glycolysis) và nhánh Pentose Phosphate Shunt (HMP Shunt) ➔ Enzym Glucose-6-Phosphate Dehydrogenase (G6PD) là enzym giới hạn tốc độ của con đường HMP Shunt, xúc tác biến đổi G6P thành 6-Phosphogluconolactone đồng thời khử $NADP^+$ thành $NADPH$ ➔ $NADPH$ là cơ chất bắt buộc cho enzym Glutathione Reductase để biến đổi Glutathione dạng oxy hóa (GSSG) trở lại dạng khử ($GSH$) ➔ Khi dùng thuốc oxy hóa (Sulfa, Primaquine, Dapsone, ăn đậu Fava), $H_2O_2$ và các gốc tự do ROS sinh ra ồ ạt ➔ Do thiếu hụt G6PD di truyền liên kết NST X, lượng NADPH không đủ để tái tạo $GSH$ ➔ ROS oxy hóa các nhóm sulfhydryl (-SH) của chuỗi globin làm Hemoglobin bị biến tính và kết tủa thành các hạt thể vùi dính vào màng hồng cầu gọi là **Thể Heinz** ➔ Khi hồng cầu đi qua các xoang tủy đỏ của lách, đại thực bào tại lách gặm nhấm cắt bỏ thể Heinz tạo ra hình ảnh **Hồng cầu vết cắn (Bite cells)** và gây vỡ màng hồng cầu ồ ạt trong lòng mạch.',
    clinicalPearls: 'Không nên định lượng hoạt độ men G6PD trong giai đoạn tán huyết cấp tính vì các hồng cầu già thiếu men đã bị vỡ hết, các hồng cầu lưới mới sinh có hoạt độ men bình thường sẽ cho kết quả âm tính giả. Cần xét nghiệm lại sau đợt cấp 2-3 tháng.',
    relatedModule: '#/pathophysiology/biochemistry',
    readArticleLink: '#/pathophysiology/biochemistry/block4-intermediary-metabolism'
  },

  // 13. HUYẾT HỌC: THIẾU B12 & FOLATE
  {
    id: 'case_13_megaloblastic_anemia',
    specialty: 'Huyết Học & Hóa Sinh',
    specialtyKey: 'hematology',
    difficulty: 'Nâng cao',
    title: 'Thiếu Máu Hồng Cầu To & Bẫy Folate Trong Thiếu Hụt Vitamin B12',
    vignette: 'Bệnh nhân nữ 65 tuổi ăn chay trường 15 năm, khám vì mệt mỏi, khó thở khi gắng sức, lưỡi đỏ mất gai (viêm lưỡi Hunter) và cảm giác tê bì dị cảm hai bàn chân đối xứng kiểu đi găng. Xét nghiệm: Hb 7.2 g/dL, MCV 118 fL (hồng cầu to), Bạch cầu hạt trung tính nhiều đoạn (Hypersegmented neutrophils > 5 múi). Homocysteine và Methylmalonic acid (MMA) huyết thanh đều tăng cao.',
    question: 'Cơ chế nào giải thích tình trạng phân ly nhân - bào tương (Nuclear-cytoplasmic asynchrony) gây hồng cầu to trong tủy xương khi thiếu Vitamin B12?',
    options: [
      {
        id: 'A',
        text: 'Thiếu B12 làm ứ đọng N5-Methyl-THF ("Bẫy Methyl-Folate") ➔ Thiếu hụt THF tự do để tổng hợp dTMP ➔ Ức chế tổng hợp DNA trong khi RNA và Protein bào tương vẫn phát triển bình thường.',
        isCorrect: true
      },
      {
        id: 'B',
        text: 'Thiếu B12 làm giảm hấp thu sắt tại tá tràng gây ứ đọng nguyên bào sắt trong tủy.',
        isCorrect: false
      },
      {
        id: 'C',
        text: 'Tăng tổng hợp quá mức Thymidine làm chu kỳ tế bào hồng cầu bị rút ngắn lại.',
        isCorrect: false
      },
      {
        id: 'D',
        text: 'Đột biến gen mã hóa chuỗi Globin làm tăng thể tích hồng cầu tự phát.',
        isCorrect: false
      }
    ],
    cascadeExplanation: 'Vitamin B12 (Cobalamin) là coenzym của enzym Methionine Synthase, xúc tác chuyển nhóm methyl từ $N^5$-Methyl-Tetrahydrofolate ($N^5$-Methyl-THF) sang Homocysteine để tạo thành Methionine và tái tạo Tetrahydrofolate ($THF$) tự do ➔ Khi thiếu hụt B12, nhóm methyl bị "mắc kẹt" vĩnh viễn ở dạng $N^5$-Methyl-THF (Hiện tượng Bẫy Folate - Methyl-Folate Trap) ➔ Cạn kiệt nguồn $THF$ và $N^5,N^{10}$-Methylene-THF tự do ➔ Enzym Thymidylate Synthase không có cơ chất để chuyển dUMP thành dTMP (Thymidine monophosphate) ➔ Khuyết tật tổng hợp Thymine làm ngừng trệ quá trình sao chép và sửa sai DNA ở pha S của phân bào trong tủy xương ➔ Quá trình phân chia nhân bị chậm lại đáng kể, trong khi quá trình phiên mã RNA và tổng hợp Hemoglobin ở bào tương vẫn diễn ra bình thường ➔ Nhân non nớt trong bào tương già dặn (Phân ly nhân - bào tương) tạo ra các nguyên hồng cầu khổng lồ (Megaloblasts) bị tiêu hủy sớm ngay trong tủy xương (Sinh máu không hiệu lực). Đồng thời, B12 là coenzym của Methylmalonyl-CoA Mutase chuyển hóa Methylmalonyl-CoA thành Succinyl-CoA ➔ Thiếu B12 gây tích tụ Methylmalonic acid làm thoái hóa myelin cột sau và cột bên tủy sống (Subacute Combined Degeneration).',
    clinicalPearls: 'Bổ sung Acid Folic liều cao đơn độc cho bệnh nhân thiếu B12 có thể cải thiện tình trạng thiếu máu nhưng sẽ làm tổn thương thần kinh do thiếu B12 tiến triển nặng nề và không thể hồi phục. Định lượng Methylmalonic acid (MMA) giúp phân biệt chính xác: Thiếu B12 làm tăng cả Homocysteine và MMA; trong khi Thiếu Folate chỉ làm tăng Homocysteine đơn thuần.',
    relatedModule: '#/pathophysiology/biochemistry',
    readArticleLink: '#/pathophysiology/biochemistry/block2-catalysis-signaling'
  },

  // 14. MIỄN DỊCH: SỐC PHẢN VỆ
  {
    id: 'case_14_anaphylactic_shock',
    specialty: 'Miễn Dịch & Dị Ứng',
    specialtyKey: 'immunology_inf',
    difficulty: 'Trung cấp',
    title: 'Tụt Huyết Áp & Phù Thanh Quản Cấp Trong Sốc Phản Vệ Do Thuốc Kháng Sinh',
    vignette: 'Bệnh nhân nam 28 tuổi tiêm tĩnh mạch Cefriaxone điều trị viêm đường tiết niệu. Sau tiêm 3 phút, bệnh nhân xuất hiện mày đay đỏ toàn thân, ngứa họng, khàn tiếng, khó thở thanh quản, sau đó ngất xỉu. Khám: Mạch nhanh nhỏ 130 lần/phút, huyết áp tụt 60/30 mmHg, SpO2 82%, tiếng rít thanh quản (Stridor) nghe rõ.',
    question: 'Chất trung gian tiền hình thành nào được giải phóng ồ ạt từ các bọc dự trữ của tế bào Mast là dấu ấn sinh học đặc hiệu nhất để xác định chẩn đoán phản vệ?',
    options: [
      {
        id: 'A',
        text: 'Tryptase huyết thanh giải phóng cùng với Histamin qua quá trình Degranulation phụ thuộc IgE.',
        isCorrect: true
      },
      {
        id: 'B',
        text: 'Procalcitonin do tế bào C tuyến giáp tiết ra dưới kích thích của vi khuẩn.',
        isCorrect: false
      },
      {
        id: 'C',
        text: 'Creatine Kinase MB do hoại tử cơ tim cấp tính.',
        isCorrect: false
      },
      {
        id: 'D',
        text: 'Interferon-gamma do tế bào lympho NK tiết ra chống virus.',
        isCorrect: false
      }
    ],
    cascadeExplanation: 'Kháng nguyên thuốc liên kết chéo các phân tử kháng thể IgE đặc hiệu đã gắn sẵn trên thụ thể ái lực cao $Fc\\varepsilon RI$ trên màng tế bào Dưỡng bào (Mast cell) và Bạch cầu ái kiềm ➔ Kích hoạt dòng thác Phosphoryl hóa Tyrosine Kinase (Lyn, Syk) ➔ Tăng nồng độ $Ca^{2+}$ nội bào ➔ Hòa màng các hạt dự trữ và giải phóng tức thì các chất trung gian tiền hình thành: **Histamin** và **Tryptase** ➔ Histamin gắn thụ thể $H_1$ trên tế bào cơ trơn phế quản gây co thắt đường thở, gắn thụ thể $H_1$ trên tế bào nội mô mạch máu làm tăng tính thấm mao mạch gây phù mạch (phù nề thanh môn gây tắc nghẽn đường thở), và gắn thụ thể $H_2$ trên cơ trơn mạch máu gây giãn tiểu động mạch toàn thể ➔ Tụt huyết áp đột ngột và thất thoát dịch từ lòng mạch vào mô kẽ làm giảm hồi lưu tĩnh mạch gây Sốc phân bố.',
    clinicalPearls: 'Adrenaline (Epinephrine) tiêm bắp sâu ở mặt trước ngoài đùi là thuốc cấp cứu ĐẦU TAY, DUY NHẤT và KHẨN CẤP trong sốc phản vệ. Adrenaline kích thích thụ thể $\\alpha_1$ gây co mạch nâng HA và giảm phù thanh quản, thụ thể $\\beta_1$ tăng co bóp cơ tim, và thụ thể $\\beta_2$ gây giãn cơ trơn phế quản đồng thời ức chế tế bào Mast tiếp tục phóng thích hóa chất trung gian.',
    relatedModule: '#/pathophysiology/simulators',
    readArticleLink: '#/pathophysiology/cases/slb-ccbs-anaphylaxis'
  },

  // 15. TRUYỀN NHIỄM: SỐC NHIỄM KHUẨN (SEPSIS)
  {
    id: 'case_15_septic_shock_dic',
    specialty: 'Truyền Nhiễm & Hồi Sức',
    specialtyKey: 'immunology_inf',
    difficulty: 'Nâng cao',
    title: 'Liệt Mạch Do Nitric Oxide & Rối Loạn Tưới Máu Trong Sốc Nhiễm Khuẩn',
    vignette: 'Bệnh nhân nam 70 tuổi viêm phổi nặng, ngày thứ 2 xuất hiện sốt cao 39.2 độ C, thở nhanh 32 lần/phút, tri giác lú lẫn, huyết áp tụt còn 75/45 mmHg dù đã được truyền đủ 30 mL/kg dịch tinh thể đẳng trương. Xét nghiệm: Lactate máu 4.8 mmol/L, Bạch cầu 24,000/µL, Tiểu cầu giảm còn 65,000/µL, D-dimer tăng cao, INR 1.8.',
    question: 'Enzym nào được cảm ứng tổng hợp mạnh mẽ dưới tác động của nội độc tố vi khuẩn (LPS) và cytokine gây giãn mạch kháng trị trong sốc nhiễm khuẩn?',
    options: [
      {
        id: 'A',
        text: 'Inducible Nitric Oxide Synthase (iNOS) tạo lượng lớn NO liên tục làm giãn cơ trơn thành mạch và ức chế đáp ứng với Catecholamine.',
        isCorrect: true
      },
      {
        id: 'B',
        text: 'Endothelial Nitric Oxide Synthase (eNOS) phụ thuộc Calmodulin điều hòa trương lực mạch sinh lý.',
        isCorrect: false
      },
      {
        id: 'C',
        text: 'Cyclooxygenase-1 (COX-1) duy trì tưới máu niêm mạc dạ dày.',
        isCorrect: false
      },
      {
        id: 'D',
        text: 'Angiotensin Converting Enzyme (ACE) chuyển đổi Angiotensin I thành Angiotensin II.',
        isCorrect: false
      }
    ],
    cascadeExplanation: 'Nội độc tố Lipopolysaccharide (LPS) của vi khuẩn Gr(-) liên kết với Protein gắn LPS (LBP) và phức hợp thụ thể CD14/Toll-like Receptor 4 (TLR-4) trên bề mặt đại thực bào ➔ Kích hoạt con đường truyền tin NF-κB ➔ Tiết ồ ạt các cytokine tiền viêm (TNF-α, IL-1β, IL-6) ➔ Cytokines cảm ứng phiên mã gen enzym **iNOS (Inducible Nitric Oxide Synthase)** trong tế bào cơ trơn mạch máu và tế bào nội mô ➔ iNOS hoạt động không phụ thuộc canxi, liên tục tổng hợp lượng khổng lồ **Nitric Oxide (NO)** ➔ NO khuếch tán vào tế bào cơ trơn mạch máu kích hoạt men Guanylyl Cyclase hòa tan (sGC) tạo cGMP ➔ Hoạt hóa Protein Kinase G (PKG) làm giảm nồng độ Canxi nội bào và mở kênh $K_{ATP}$ ➔ Giãn mạch sâu rộng toàn thân, mất hoàn toàn trương lực mạch máu ngoại biên (Liệt mạch - Vasoplegia) và trơ với các thuốc co mạch nội sinh ➔ Tụt huyết áp nặng nề, giảm áp lực tưới máu mô ➔ Tế bào chuyển sang chuyển hóa kỵ khí sinh Lactic Acid ➔ Tổn thương nội mô diện rộng bộc lộ Yếu tố Mô (Tissue Factor) kích hoạt dòng thác đông máu ngoại sinh gây Đông máu nội mạch rải rác (DIC) và suy đa tạng (MODS).',
    clinicalPearls: 'Noradrenaline là thuốc vận mạch lựa chọn hàng đầu (First-line) trong sốc nhiễm khuẩn để nâng MAP $\\ge 65$ mmHg. Nếu Noradrenaline liều trung bình/cao vẫn chưa đạt huyết áp mục tiêu, bổ sung sớm Vasopressin (0.03 U/phút) giúp bù đắp tình trạng thiếu hụt Vasopressin nội sinh và tận dụng cơ chế co mạch qua thụ thể V1 độc lập với Catecholamine.',
    relatedModule: '#/pathophysiology/simulators',
    readArticleLink: '#/pathophysiology/cases/slb-ccbs-sepsis'
  },

  // 16. TRUYỀN NHIỄM: SỐT XUẤT HUYẾT DENGUE
  {
    id: 'case_16_dengue_plasma_leakage',
    specialty: 'Truyền Nhiễm & Miễn Dịch',
    specialtyKey: 'immunology_inf',
    difficulty: 'Trung cấp',
    title: 'Hội Chứng Rò Rỉ Huyết Tương & Tổn Thương Glycocalyx Trong Sốt Xuất Huyết Dengue',
    vignette: 'Bệnh nhi nam 10 tuổi ngày thứ 5 của sốt xuất huyết Dengue, nhiệt độ bắt đầu hạ sốt (37.2 độ C) nhưng trẻ trở nên li bì, đau bụng vùng gan, nôn ói. Khám: Chi lạnh, mạch nhanh nhẹ 125 lần/phút, huyết áp kẹp 90/75 mmHg. Xét nghiệm: Hematocrit (HCT) tăng vọt từ 36% lên 48%, Tiểu cầu giảm còn 28,000/µL, siêu âm có dịch màng phổi lượng ít và dày thành túi mật do phù nề.',
    question: 'Kháng nguyên phi cấu trúc nào của virus Dengue được chứng minh phá hủy trực tiếp lớp áo Glycocalyx của tế bào nội mô mạch máu gây thoát huyết tương?',
    options: [
      {
        id: 'A',
        text: 'Protein phi cấu trúc 1 (NS1) của virus Dengue kích hoạt enzym Heparanase phân giải lớp màng đệm Glycocalyx nội mô.',
        isCorrect: true
      },
      {
        id: 'B',
        text: 'Kháng nguyên vỏ E (Envelope Protein) kích thích tế bào biểu mô phế nang tiết dịch thẩm thấu.',
        isCorrect: false
      },
      {
        id: 'C',
        text: 'Kháng nguyên lõi C (Capsid Protein) ức chế chức năng tạo tiểu cầu của mẫu tiểu cầu trong tủy xương.',
        isCorrect: false
      },
      {
        id: 'D',
        text: 'Enzym RNA-dependent RNA Polymerase (NS5) gây ly giải trực tiếp hồng cầu.',
        isCorrect: false
      }
    ],
    cascadeExplanation: 'Nhiễm thứ phát type huyết thanh Dengue khác kích hoạt hiện tượng Tăng cường miễn dịch phụ thuộc kháng thể (Antibody-Dependent Enhancement - ADE) ➔ Tăng vọt lượng virus xâm nhập vào bạch cầu đơn nhân và đại thực bào ➔ Virus tiết lượng lớn protein **NS1 (Non-structural Protein 1)** vào tuần hoàn ➔ NS1 gắn trực tiếp lên thụ thể TLR-4 trên tế bào nội mô mạch máu và kích thích tế bào nội mô tiết enzyme **Heparanase** và **Hyaluronidase** ➔ Các enzyme này cắt đứt các chuỗi Heparan Sulfate và Hyaluronic Acid cấu tạo nên lớp áo bảo vệ **Endothelial Glycocalyx Layer (EGL)** ➔ Mất tính chọn lọc kích thước và điện tích của màng mao mạch ➔ Huyết tương (nước và albumin) rò rỉ ồ ạt qua các khe nối nội mô vào khoang gian bào (khoang màng phổi, màng bụng, thành túi mật) ➔ Thể tích lòng mạch sụt giảm nhanh chóng dẫn đến cô đặc máu (HCT tăng > 20%), huyết áp kẹt (chênh lệch HA tâm thu - tâm trương $\\le 20$ mmHg) và sốc giảm thể tích (Dengue Shock Syndrome - DSS).',
    clinicalPearls: 'Giai đoạn nguy hiểm nhất của Sốt xuất huyết Dengue là ngày 3 đến ngày 7 của bệnh (thời điểm bệnh nhân hết sốt). Theo dõi sát Hematocrit (HCT), lượng nước tiểu và các dấu hiệu cảnh báo (đau bụng vùng gan, nôn ói liên tục, li bì, xuất huyết niêm mạc) để bù dịch kịp thời trước khi bệnh nhân rơi vào sốc sâu.',
    relatedModule: '#/pathophysiology/simulators',
    readArticleLink: '#/pathophysiology/cases/slb-ccbs-sxhd'
  },

  // 17. CƠ XƯƠNG KHỚP: VIÊM KHỚP GOUT
  {
    id: 'case_17_gout_nlrp3',
    specialty: 'Cơ Xương Khớp & Hóa Sinh',
    specialtyKey: 'rheum_bone',
    difficulty: 'Trung cấp',
    title: 'Phản Ứng Viêm Cấp Tính Kích Hoạt Thể Viêm NLRP3 Bởi Tinh Thể Urate (MSU)',
    vignette: 'Bệnh nhân nam 48 tuổi tiền sử tăng acid uric máu, sau bữa tiệc nhậu hải sản và uống nhiều bia, nửa đêm thức giấc vì khớp bàn ngón chân cái bên phải sưng to, nóng đỏ, đau dữ dội chạm nhẹ vào cũng không chịu nổi. Xét nghiệm: Acid uric máu 580 µmol/L, CRP 45 mg/L. Soi dịch khớp dưới kính hiển vi phân cực thấy tinh thể hình kim phân cực âm tính mạnh nằm trong bạch cầu đa nhân.',
    question: 'Phức hợp protein nội bào nào trong đại thực bào được kích hoạt khi thực bào tinh thể Monosodium Urate (MSU) để sản sinh Interleukin-1 beta (IL-1β) gây viêm dữ dội?',
    options: [
      {
        id: 'A',
        text: 'Thể viêm NLRP3 Inflammasome kích hoạt men Caspase-1 để cắt tiền chất Pro-IL-1β thành IL-1β dạng hoạt động.',
        isCorrect: true
      },
      {
        id: 'B',
        text: 'Phức hợp C1q của hệ thống Bổ thể theo con đường cổ điển.',
        isCorrect: false
      },
      {
        id: 'C',
        text: 'Thụ thể Nhân PPAR-gamma ức chế quá trình thoái hóa acid béo tại khớp.',
        isCorrect: false
      },
      {
        id: 'D',
        text: 'Phức hợp Ribosome 80S tổng hợp các sợi Collagen Type II bất thường.',
        isCorrect: false
      }
    ],
    cascadeExplanation: 'Nồng độ Acid Uric máu vượt ngưỡng bão hòa sinh lý ($> 6.8$ mg/dL hay $404$ $\\mu$mol/L) trong điều kiện nhiệt độ thấp ở các khớp ngoại vi xa trung tâm (như khớp bàn ngón chân cái MTP 1) ➔ Kết tinh thành các tinh thể **Monosodium Urate (MSU)** hình kim ➔ Tinh thể MSU được đại thực bào mô hoạt dịch thực bào vào trong lysosome ➔ Tinh thể không bị tiêu hủy làm vỡ màng tiêu thể, giải phóng enzym Cathepsin B vào bào tương ➔ Kích hoạt phức hợp đa protein **NLRP3 Inflammasome** ➔ Thể viêm hoạt hóa enzym **Caspase-1** ➔ Caspase-1 cắt tiền chất vô hoạt Pro-IL-1$\\beta$ và Pro-IL-18 thành các cytokine hoạt tính **IL-1$\\beta$** và IL-18 ➔ IL-1$\\beta$ tiết ra ngoài gắn lên tế bào nội mô mạch máu hoạt dịch làm bộc lộ các phân tử bám dính (Selectin, ICAM-1) và tiết Chemokine IL-8 ➔ Thu hút ồ ạt hàng triệu bạch cầu đa nhân trung tính (Neutrophils) từ máu tràn vào ổ khớp ➔ Bạch cầu thực bào tinh thể giải phóng men lysosome, gốc oxy hóa ROS và hình thành bẫy ngoại bào NETs gây phá hủy mô và đau đớn dữ dội.',
    clinicalPearls: 'Colchicine điều trị cơn Gout cấp bằng cách gắn vào Tubulin ngăn cản quá trình trùng hợp vi ống (Microtubule polymerization), từ đó ức chế sự di chuyển và giải phóng hạt của bạch cầu trung tính và ức chế thể viêm NLRP3. Không nên bắt đầu hoặc thay đổi liều thuốc hạ acid uric (Allopurinol, Febuxostat) ngay trong cơn Gout cấp vì sự biến động nồng độ urate máu sẽ làm bong tróc tinh thể và kéo dài đợt viêm.',
    relatedModule: '#/pathophysiology/biochemistry',
    readArticleLink: '#/pathophysiology/cases/slb-ccbs-gout'
  },

  // 18. SẢN KHOA: TIỀN SẢN GIẬT
  {
    id: 'case_18_preeclampsia_sflt1',
    specialty: 'Sản Khoa & Tim Mạch',
    specialtyKey: 'ob_peds',
    difficulty: 'Nâng cao',
    title: 'Mất Cân Bằng sFlt-1 / PlGF & Rối Loạn Nội Mô Mạch Máu Trong Tiền Sản Giật',
    vignette: 'Sản phụ 28 tuổi mang thai con so tuần thứ 32, khám thai định kỳ thấy huyết áp tăng cao 165/105 mmHg, phù 2 chi dưới và phù mi mắt. Xét nghiệm nước tiểu: Protein niệu que nhúng 3+ (định lượng đạm niệu 24 giờ = 3.5 g). Xét nghiệm máu có Acid uric 420 µmol/L, men gan AST/ALT tăng nhẹ, tiểu cầu 110,000/µL.',
    question: 'Yếu tố kháng tạo mạch nào được bánh nhau thiếu máu cục bộ tiết vào tuần hoàn mẹ làm trung hòa VEGF và PlGF gây tổn thương tế bào nội mô toàn thể?',
    options: [
      {
        id: 'A',
        text: 'Soluble Fms-like Tyrosine Kinase-1 (sFlt-1) và Soluble Endoglin (sEng).',
        isCorrect: true
      },
      {
        id: 'B',
        text: 'Human Chorionic Gonadotropin (hCG) dạng chuỗi beta tự do.',
        isCorrect: false
      },
      {
        id: 'C',
        text: 'Human Placental Lactogen (hPL) gây đề kháng insulin thai kỳ.',
        isCorrect: false
      },
      {
        id: 'D',
        text: 'Alpha-Fetoprotein (AFP) tăng cao do khuyết tật ống thần kinh thai nhi.',
        isCorrect: false
      }
    ],
    cascadeExplanation: 'Giai đoạn 1 (Bánh nhau): Khiếm khuyết quá trình xâm nhập của các nguyên bào nuôi ngoài gai nhau (Extravillous Cytotrophoblasts) vào các động mạch xoắn tử cung của người mẹ ➔ Động mạch xoắn không được tái cấu trúc thành các mạch máu khẩu kính lớn, áp lực thấp mà vẫn giữ nguyên đặc tính lòng hẹp, kháng lực cao ➔ Thiếu máu cục bộ và giảm tưới máu bánh nhau mạn tính ➔ Bánh nhau thiếu oxy giải phóng lượng lớn các yếu tố kháng tạo mạch vào máu mẹ: **sFlt-1 (Soluble Fms-like Tyrosine Kinase-1)** và **sEng (Soluble Endoglin)** ➔ Giai đoạn 2 (Toàn thân mẹ): sFlt-1 hoạt động như một thụ thể mồi bẫy, gắn và trung hòa các yếu tố tăng trưởng nội mô mạch máu tự do **VEGF (Vascular Endothelial Growth Factor)** và **PlGF (Placental Growth Factor)** ➔ Tế bào nội mô toàn cơ thể người mẹ bị mất tín hiệu duy trì sống còn sinh lý ➔ Rối loạn chức năng nội mô toàn thể: Giảm sản xuất các chất giãn mạch (NO, Prostacyclin) và tăng tiết các chất co mạch (Endothelin-1, Thromboxane A2) ➔ Co thắt tiểu động mạch toàn thân gây **Tăng huyết áp**; Phá hủy tế bào có chân (Podocyte) và tế bào nội mô mao mạch cầu thận (Endotheliosis cầu thận) làm rò rỉ protein gây **Đạm niệu** và phù nề.',
    clinicalPearls: 'Tỷ số sFlt-1/PlGF trong máu mẹ (xét nghiệm Roche Elecsys) là dấu ấn sinh học có giá trị tiên lượng âm tính rất cao: Tỷ số $\\le 38$ giúp loại trừ khả năng xuất hiện tiền sản giật trong vòng 1 tuần với độ tin cậy > 99%. Aspirin liều thấp (81-150 mg/ngày) uống trước tuần 16 thai kỳ giúp ức chế ưu thế Thromboxane A2 mà không ức chế Prostacyclin, giảm đáng kể nguy cơ tiền sản giật sớm ở nhóm thai phụ nguy cơ cao.',
    relatedModule: '#/pathophysiology/simulators',
    readArticleLink: '#/pathophysiology/cases/slb-ccbs-tsg'
  }
];

/* ==========================================================================
   2. KHO 24 FLASHCARDS GHI NHỚ QUY LUẬT & CƠ CHẾ PHÂN TỬ (FLASHCARDS)
   ========================================================================== */

export const FLASHCARDS_DATA: FlashcardItem[] = [
  // HÓA SINH CHUYỂN HÓA & ENZYME
  {
    id: 'fc_1_allosteric',
    category: 'Hóa Sinh & Động Học Enzyme',
    categoryKey: 'biochem',
    frontTitle: 'Hiệu Ứng Dị Lập Thể (Allosteric Regulation)',
    frontClue: 'Tại sao enzyme điều hòa có đồ thị vận tốc dạng đường cong chữ S (Sigmoidal curve) thay vì đường hyperbol chuẩn Michaelis-Menten?',
    backMechanism: 'Enzyme dị lập thể cấu tạo từ nhiều tiểu đơn vị (oligomer). Sự gắn của chất phối tử (ligand/cơ chất) vào một tiểu đơn vị làm biến đổi không gian cấu trúc của các tiểu đơn vị lân cận, chuyển từ trạng thái căng ít hoạt động (T-state) sang trạng thái giãn hoạt tính cao (R-state). Hiện tượng cộng tác liên kết (Cooperativity) này tạo ra đồ thị chữ S, cho phép enzyme phản ứng cực kỳ nhạy bén với những thay đổi rất nhỏ của nồng độ cơ chất trong tế bào.',
    clinicalPearl: 'Phosphofructokinase-1 (PFK-1) là enzyme dị lập thể giới hạn tốc độ đường phân: Bị ức chế dị lập thể bởi ATP và Citrate (tín hiệu no năng lượng), và được hoạt hóa mạnh mẽ bởi Fructose-2,6-bisphosphate (F-2,6-BP) và AMP.',
    formulaOrLaw: 'Hill Equation: v = (Vmax * [S]^n) / (K0.5^n + [S]^n)'
  },
  {
    id: 'fc_2_enzyme_inhibition',
    category: 'Hóa Sinh & Dược Lý',
    categoryKey: 'biochem',
    frontTitle: 'Ức Chế Cạnh Tranh vs. Phi Cạnh Tranh',
    frontClue: 'Làm thế nào để phân biệt chất ức chế cạnh tranh (Competitive) và chất ức chế phi cạnh tranh (Non-competitive) dựa trên Km và Vmax?',
    backMechanism: '• Ức chế Cạnh tranh: Chất ức chế có cấu trúc tương tự cơ chất, cạnh tranh gắn vào Trung tâm hoạt động (Active site). Tăng nồng độ cơ chất [S] có thể đẩy chất ức chế ra. Kết quả: Vmax không đổi, Km tăng (ái lực biểu kiến giảm).\n• Ức chế Phi cạnh tranh: Gắn vào vị trí dị lập thể khác, làm giảm hiệu suất xúc tác. Tăng [S] không đảo ngược được. Kết quả: Vmax giảm, Km không đổi.',
    clinicalPearl: 'Thuốc Statin (ức chế HMG-CoA Reductase) và thuốc hạ áp Captopril (ức chế ACE) là các chất ức chế cạnh tranh kinh điển; trong khi thuốc trừ sâu phospho hữu cơ ức chế không hồi phục acetylcholinesterase.',
    formulaOrLaw: 'Lineweaver-Burk: 1/v = (Km/Vmax)*(1/[S]) + 1/Vmax'
  },
  {
    id: 'fc_3_cori_cycle',
    category: 'Hóa Sinh Chuyển Hóa',
    categoryKey: 'biochem',
    frontTitle: 'Chu Trình Cori (Lactate Cycle Gan - Cơ)',
    frontClue: 'Mối liên kết chuyển hóa năng lượng giữa cơ vận động mạnh kỵ khí và gan để ngăn ngừa toan lactic là gì?',
    backMechanism: 'Khi cơ co mạnh thiếu oxy, pyruvate chuyển thành Lactate nhờ enzyme LDH để tái tạo NAD+ duy trì đường phân sinh 2 ATP. Lactate khuếch tán vào máu về gan. Tại gan, LDH gan chuyển Lactate trở lại Pyruvate, sau đó gan tiêu tốn 6 phân tử ATP (qua con đường tân tạo đường Gluconeogenesis) để tổng hợp Glucose tự do đưa trở lại máu nuôi dưỡng cơ và não.',
    clinicalPearl: 'Bệnh nhân suy gan nặng hoặc uống nhiều rượu (gây cạn kiệt NAD+ tại gan) làm ngưng trệ chu trình Cori, dẫn đến nguy cơ toan Lactic máu nặng và hạ đường huyết khi vận động.',
    formulaOrLaw: 'Cơ (Glucose ➔ 2 Lactate + 2 ATP) ⟷ Gan (2 Lactate + 6 ATP ➔ Glucose)'
  },
  {
    id: 'fc_4_urea_cycle',
    category: 'Hóa Sinh Chuyển Hóa',
    categoryKey: 'biochem',
    frontTitle: 'Chu Trình Ure & Khử Độc Amoniac (NH3)',
    frontClue: 'Enzyme nào là bước điều hòa giới hạn tốc độ của chu trình Ure và cần chất hoạt hóa dị lập thể bắt buộc nào?',
    backMechanism: 'Carbamoyl Phosphate Synthetase I (CPS-I) nằm trong ty thể tế bào gan là enzyme giới hạn tốc độ, gắn NH4+ với CO2 (HCO3-) tiêu tốn 2 ATP để tạo Carbamoyl Phosphate. CPS-I đòi hỏi chất hoạt hóa dị lập thể bắt buộc là N-Acetylglutamate (NAG) - được tổng hợp bởi NAGS khi nồng độ acid amin Arginine tăng cao sau bữa ăn giàu đạm.',
    clinicalPearl: 'Thiếu hụt enzyme Ornithine Transcarbamylase (OTC) là rối loạn chu trình Ure di truyền liên kết NST X phổ biến nhất, gây tăng Amoniac máu kịch phát (gây phù não, hôn mê) kèm tăng nồng độ Orotic acid trong nước tiểu.',
    formulaOrLaw: 'CPS-I + NAG: NH4+ + HCO3- + 2 ATP ➔ Carbamoyl-P + 2 ADP + Pi'
  },

  // SINH LÝ MÀNG & ĐIỆN SINH LÝ
  {
    id: 'fc_5_nernst_potential',
    category: 'Điện Sinh Lý Màng',
    categoryKey: 'physiology',
    frontTitle: 'Phương Trình Nernst & Điện Thế Cân Bằng Ion',
    frontClue: 'Tại sao điện thế nghỉ của tế bào thần kinh và cơ (-70 đến -90 mV) lại xấp xỉ gần bằng điện thế cân bằng của ion Kali (E_K)?',
    backMechanism: 'Phương trình Nernst tính điện thế màng tại đó lực khuếch tán hóa học (do chênh lệch nồng độ) cân bằng hoàn toàn với lực đẩy tĩnh điện. Ở trạng thái nghỉ, màng tế bào có tính thấm chọn lọc rất cao với ion K+ thông qua các kênh K+ rò rỉ (Leak channels) mở liên tục, trong khi tính thấm với Na+ rất thấp. Do đó, điện thế nghỉ bị chi phối chủ yếu bởi dòng K+ đi ra ngoài cho tới khi đạt trạng thái cân bằng xấp xỉ -90 mV.',
    clinicalPearl: 'Hạ Kali máu ngoại bào ([K+]out giảm) làm tăng gradient nồng độ ➔ E_K âm hơn (Ưu phân cực màng) ➔ Tế bào cơ tim khó khử cực hơn, gây yếu cơ, liệt ruột và sóng U trên điện tâm đồ.',
    formulaOrLaw: 'E_ion = (61.5 / z) * log10([Ion]_out / [Ion]_in) (ở 37°C)'
  },
  {
    id: 'fc_6_ghk_equation',
    category: 'Điện Sinh Lý Màng',
    categoryKey: 'physiology',
    frontTitle: 'Phương Trình Goldman-Hodgkin-Katz (GHK)',
    frontClue: 'Yếu tố nào quyết định điện thế màng thực tế khi có sự tham gia của nhiều ion đồng thời (Na+, K+, Cl-)?',
    backMechanism: 'Phương trình GHK tính toán điện thế màng dựa trên tổng hòa nồng độ trong/ngoài và độ thấm màng (Permeability - P) của từng ion. Khi độ thấm của một ion tăng vọt (ví dụ P_Na tăng gấp hàng trăm lần trong Pha 0 khử cực khi mở kênh Na+ nhanh phụ thuộc điện thế), điện thế màng sẽ bị kéo lệch nhanh chóng về phía điện thế cân bằng Nernst của chính ion đó (+60 mV đối với Na+).',
    clinicalPearl: 'Thuốc tê tại chỗ (Lidocaine) và độc tố cá nóc (Tetrodotoxin) chẹn kênh Na+ có cổng điện thế ➔ Ngăn chặn sự gia tăng P_Na ➔ Triệt tiêu điện thế hoạt động, ức chế dẫn truyền cảm giác đau.',
    formulaOrLaw: 'Vm = 61.5 * log10( (P_K[K+]o + P_Na[Na+]o + P_Cl[Cl-]i) / (P_K[K+]i + P_Na[Na+]i + P_Cl[Cl-]o) )'
  },
  {
    id: 'fc_7_nak_atpase',
    category: 'Sinh Lý Tế Bào',
    categoryKey: 'physiology',
    frontTitle: 'Bơm Na+/K+ ATPase & Điều Hòa Thể Tích Tế Bào',
    frontClue: 'Tại sao việc ngừng trệ bơm Na+/K+ ATPase khi cạn kiệt ATP lại dẫn đến phù nề và vỡ tế bào (Cell Swelling)?',
    backMechanism: 'Bơm Na+/K+ ATPase bơm tích cực 3 ion Na+ ra ngoài và 2 ion K+ vào trong tế bào tiêu tốn 1 phân tử ATP (bơm sinh điện). Do tế bào chứa nhiều protein tích điện âm không thể khuếch tán ra ngoài, nếu không có bơm Na+ ra ngoài liên tục, Na+ và Cl- sẽ ứ đọng nội bào ➔ Tăng áp suất thẩm thấu nội bào ➔ Nước từ ngoại bào ồ ạt tràn vào tế bào theo gradient thẩm thấu làm trương phù và vỡ tế bào.',
    clinicalPearl: 'Thuốc tim mạch Digoxin ức chế một phần bơm Na+/K+ ATPase ở cơ tim ➔ Tăng nhẹ [Na+] nội bào ➔ Giảm hoạt động bơm trao đổi Na+/Ca2+ (NCX) ➔ Tăng nồng độ [Ca2+] trong tế bào chất và lưới nội chất ➔ Tăng sức co bóp cơ tim (Hiệu ứng co bóp dương).',
    formulaOrLaw: '3 Na+(in) + 2 K+(out) + ATP + H2O ➔ 3 Na+(out) + 2 K+(in) + ADP + Pi'
  },

  // HUYẾT ĐỘNG & TUẦN HOÀN
  {
    id: 'fc_8_frank_starling',
    category: 'Sinh Lý Tim Mạch',
    categoryKey: 'physiology',
    frontTitle: 'Quy Luật Frank-Starling Của Tim',
    frontClue: 'Mối quan hệ giữa thể tích cuối tâm trương (EDV - Tiền tải) và thể tích nhát bóp (Stroke Volume) hoạt động như thế nào?',
    backMechanism: 'Khi tiền tải (EDV) tăng lên trong giới hạn sinh lý ➔ Cơ tim bị kéo giãn nhiều hơn trước khi co ➔ Tăng mức độ gối lên nhau tối ưu giữa sợi actin và myosin (chiều dài sarcomere tối ưu ~2.2 µm) và tăng độ nhạy cảm của Troponin C với ion Ca2+ ➔ Số lượng cầu nối chéo actin-myosin hình thành tối đa ➔ Lực co bóp cơ tim tăng lên tương ứng ➔ Tăng thể tích tống máu (SV), giúp tim tự động cân bằng cung lượng giữa thất phải và thất trái.',
    clinicalPearl: 'Trong suy tim mất bù, thất bị giãn quá mức vượt qua đỉnh của đường cong Frank-Starling: Tăng thêm dịch truyền không làm tăng được cung lượng tim mà chỉ làm tăng áp lực tĩnh mạch gây phù phổi cấp.',
    formulaOrLaw: 'CO = HR * SV; Chiều dài sợi cơ ban đầu ∝ Lực co bóp'
  },
  {
    id: 'fc_9_poiseuille_law',
    category: 'Huyết Động Học',
    categoryKey: 'physiology',
    frontTitle: 'Định Luật Poiseuille & Kháng Lực Mạch Máu',
    frontClue: 'Tại sao bán kính lòng mạch (r) lại là yếu tố quyền lực nhất quyết định huyết áp và lưu lượng máu?',
    backMechanism: 'Theo định luật Poiseuille, kháng lực mạch máu (R) tỷ lệ nghịch với lũy thừa bậc 4 của bán kính lòng mạch ($R \\propto 1/r^4$). Điều này có nghĩa là nếu bán kính lòng tiểu động mạch giảm đi một nửa (giảm 50%), kháng lực dòng máu qua mạch đó sẽ tăng vọt lên gấp $2^4 = 16$ lần!',
    clinicalPearl: 'Các tiểu động mạch (Arterioles) được gọi là "Mạch máu kháng lực chính" của hệ tuần hoàn. Chỉ cần co nhẹ cơ trơn tiểu động mạch dưới tác dụng của Angiotensin II hoặc Noradrenaline đã làm tăng vọt Kháng lực mạch hệ thống (SVR) và Huyết áp.',
    formulaOrLaw: 'R = (8 * η * L) / (π * r^4); Q = ΔP / R'
  },
  {
    id: 'fc_10_baroreceptor_reflex',
    category: 'Điều Hòa Tuần Hoàn',
    categoryKey: 'physiology',
    frontTitle: 'Phản Xạ Áp Thụ Quan Xoang Cảnh (Baroreceptor Reflex)',
    frontClue: 'Cơ chế nào giúp cơ thể duy trì huyết áp não không bị tụt khi đột ngột đứng dậy từ tư thế nằm?',
    backMechanism: 'Khi đứng dậy, trọng lực kéo máu dồn xuống chi dưới ➔ Giảm hồi lưu tĩnh mạch và giảm huyết áp tức thời ➔ Giảm độ căng giãn thành xoang cảnh và quai ĐMC ➔ Giảm tần số xung động truyền theo dây IX (Hering) và dây X về nhân đơn độc (NTS) tại hành não ➔ Giải ức chế trung tâm co mạch giao cảm và ức chế trung tâm phó giao cảm ➔ Tăng tiết Noradrenaline gây co tiểu động mạch (tăng SVR), co tĩnh mạch (tăng tiền tải) và tăng nhịp tim/co bóp ➔ Phục hồi huyết áp trong vài giây.',
    clinicalPearl: 'Hạ huyết áp tư thế (Orthostatic Hypotension) xảy ra khi phản xạ này bị suy giảm do tuổi già, bệnh thần kinh tự chủ đái tháo đường, hoặc dùng thuốc ức chế alpha-blocker.',
    formulaOrLaw: 'ΔHA ➔ Áp thụ quan (Dây IX/X) ➔ Nhân NTS ➔ Điều hòa Giao cảm / Phó giao cảm'
  },

  // HÔ HẤP & KHÍ MÁU
  {
    id: 'fc_11_bohr_haldane',
    category: 'Sinh Lý Hô Hấp',
    categoryKey: 'physiology',
    frontTitle: 'Hiệu Ứng Bohr vs. Hiệu Ứng Haldane',
    frontClue: 'Làm thế nào để phân biệt bản chất và vị trí tác dụng của Hiệu ứng Bohr và Hiệu ứng Haldane?',
    backMechanism: '• Hiệu ứng Bohr (Tại mô ngoại biên): Nồng độ $CO_2$, $H^+$ (toan), nhiệt độ và 2,3-BPG tăng cao tại mô chuyển hóa gắn vào phân tử Hemoglobin ➔ Ổn định cấu trúc dạng T ➔ Dịch chuyển đường cong phân ly $O_2-Hb$ sang PHẢI ➔ Giảm ái lực, giúp Hb dễ dàng nhả oxy cho mô tiêu thụ.\n• Hiệu ứng Haldane (Tại phổi): Phân áp $O_2$ cao tại phế nang gắn vào Hemoglobin ➔ Thúc đẩy Hb nhả $CO_2$ và $H^+$ ➔ $CO_2$ đào thải ra khí thở.',
    clinicalPearl: 'Đường cong lệch PHẢI (Nhả oxy dễ dàng): Tăng $CO_2$, Tăng $H^+$ (giảm pH), Tăng 2,3-BPG, Tăng Nhiệt độ, Tăng độ cao (Ghi nhớ: "CADET face RIGHT" - CO2, Acid, 2,3-DPG, Exercise, Temp).',
    formulaOrLaw: 'Bohr: H+ & CO2 ảnh hưởng ái lực O2; Haldane: O2 ảnh hưởng ái lực CO2'
  },
  {
    id: 'fc_12_aa_gradient',
    category: 'Sinh Lý Hô Hấp',
    categoryKey: 'physiology',
    frontTitle: 'Chênh Lệch Oxy Phế Nang - Mao Mạch (A-a Gradient)',
    frontClue: 'Ý nghĩa của khoảng chênh áp A-a O2 trong việc chẩn đoán nguyên nhân gây giảm oxy máu?',
    backMechanism: '$P_{A-a}O_2 = P_A O_2 - P_a O_2$. Trong đó $P_A O_2$ (oxy phế nang) tính theo phương trình khí phế nang: $P_A O_2 = (P_{atm} - P_{H2O}) * FiO_2 - (PaCO_2 / R)$. Giá trị bình thường: $A-a \\le (Tuổi / 4) + 4$ (khoảng 5-15 mmHg khi thở khí trời).\n• A-a bình thường: Giảm oxy máu do Giảm thông khí phế nang (ngộ độc thuốc phiện, yếu cơ hô hấp) hoặc Giảm FiO2 (lên núi cao).\n• A-a TĂNG: Giảm oxy máu do Bất tương xứng V/Q (COPD, Hen, PE), Shunt (ARDS, phù phổi cấp) hoặc Khuyết tật màng khuếch tán (Xơ phổi).',
    clinicalPearl: 'Một bệnh nhân giảm oxy máu có $PaCO_2$ cao nhưng A-a gradient hoàn toàn bình thường chỉ cần thông khí nhân tạo hoặc giải ngộ độc Naloxone là đủ, không có tổn thương nhu mô phổi thực thể.',
    formulaOrLaw: 'PAO2 = 150 - (PaCO2 / 0.8) (thở khí trời ngang mực nước biển)'
  },
  {
    id: 'fc_13_fick_diffusion',
    category: 'Sinh Lý Hô Hấp',
    categoryKey: 'physiology',
    frontTitle: 'Định Luật Khuếch Tán Fick Qua Màng Phế Nang',
    frontClue: 'Các yếu tố nào ảnh hưởng đến tốc độ khuếch tán của khí Oxy và CO2 qua màng phế nang - mao mạch?',
    backMechanism: 'Tốc độ khuếch tán khí ($V_{gas}$) tỷ lệ thuận với diện tích bề mặt màng trao đổi ($A$), hệ số hòa tan của khí ($S$) và chênh lệch phân áp khí hai bên màng ($\\Delta P$), đồng thời tỷ lệ nghịch với độ dày của màng màng ($T$) và căn bậc hai trọng lượng phân tử ($\\sqrt{MW}$). Do $CO_2$ có độ hòa tan trong nước cao gấp 24 lần $O_2$, $CO_2$ khuếch tán nhanh hơn $O_2$ gấp 20 lần.',
    clinicalPearl: 'Trong bệnh xơ phổi kẽ (tăng độ dày màng T) hoặc khí phế thũng (phá hủy phế nang làm giảm diện tích A), quá trình khuếch tán $O_2$ bị ảnh hưởng nặng nề đầu tiên (giảm $DLCO$ và gây khó thở khi gắng sức), trong khi $CO_2$ vẫn khuếch tán bình thường trừ giai đoạn cuối.',
    formulaOrLaw: 'V_gas = (A * D * ΔP) / T; Trong đó D ∝ S / √MW'
  },

  // THẬN & TOAN KIỀM
  {
    id: 'fc_14_anion_gap',
    category: 'Thăng Bằng Toan Kiềm',
    categoryKey: 'physiology',
    frontTitle: 'Khoảng Trống Anion Gap Huyết Tương',
    frontClue: 'Tại sao Anion Gap lại là công cụ phân loại không thể thiếu trong toan chuyển hóa?',
    backMechanism: 'Định luật trung hòa điện tích: Tổng Cation = Tổng Anion ($[Na^+] + [K^+] + Unmeasured Cations = [Cl^-] + [HCO_3^-] + Unmeasured Anions$). Do nồng độ Unmeasured Anions (Albumin, Phosphate, Sulfate, Hữu cơ) lớn hơn Cation chưa đo, tạo nên khoảng trống biểu kiến: $AG = [Na^+] - ([Cl^-] + [HCO_3^-])$. Giá trị bình thường: $8 - 12$ mEq/L.',
    clinicalPearl: 'Toan chuyển hóa tăng Anion Gap (> 12 mEq/L) do tích tụ acid không bay hơi: Mnemonic **MUDPILES** (Methanol, Uremia, DKA, Propylene glycol, Isoniazid/Iron, Lactic acidosis, Ethylene glycol, Salicylates). Cần hiệu chỉnh AG theo Albumin: $AG_{hiệu chỉnh} = AG_{đo} + 2.5 \\times (4 - Albumin g/dL)$.',
    formulaOrLaw: 'AG = Na+ - (Cl- + HCO3-) (Bình thường: 10 ± 2 mEq/L)'
  },
  {
    id: 'fc_15_winter_formula',
    category: 'Thăng Bằng Toan Kiềm',
    categoryKey: 'physiology',
    frontTitle: 'Công Thức Winter Dự Đoán Bù Trừ Hô Hấp',
    frontClue: 'Làm thế nào để phát hiện rối loạn toan kiềm hỗn hợp ẩn giấu trong toan chuyển hóa nguyên phát?',
    backMechanism: 'Trong toan chuyển hóa, cơ thể lập tức tăng thông khí để giảm $pCO_2$ bù trừ. Công thức Winter tính toán mức $pCO_2$ bù trừ kỳ vọng tối ưu của phổi: $pCO_2 = 1.5 \\times [HCO_3^-] + 8 \\pm 2$.\n• Nếu $pCO_2$ đo được NẰM TRONG khoảng dự đoán: Toan chuyển hóa đơn thuần có bù trừ hô hấp phù hợp.\n• Nếu $pCO_2$ đo được CAO HƠN khoảng dự đoán: Có kèm **Toan hô hấp phối hợp** (suy hô hấp, kiệt cơ).\n• Nếu $pCO_2$ đo được THẤP HƠN khoảng dự đoán: Có kèm **Kiềm hô hấp phối hợp** (sốt, lo âu, ngộ độc Salicylate sớm).',
    clinicalPearl: 'Quy tắc ngón tay cái: Trong toan chuyển hóa đơn thuần, hai chữ số sau dấu phẩy của pH xấp xỉ bằng giá trị $pCO_2$ (ví dụ: pH = 7.25 thì $pCO_2 \\approx 25$ mmHg).',
    formulaOrLaw: 'Expected pCO2 = (1.5 * [HCO3-]) + 8 ± 2'
  },
  {
    id: 'fc_16_glomerular_filtration',
    category: 'Sinh Lý Thận',
    categoryKey: 'physiology',
    frontTitle: 'Áp Lực Siêu Lọc Cầu Thận (PUF - Starling Cầu Thận)',
    frontClue: 'Sự tương tác giữa áp lực thủy tĩnh và áp lực keo quyết định tốc độ lọc cầu thận (GFR) như thế nào?',
    backMechanism: '$GFR = K_f \\times P_{UF} = K_f \\times [ (P_{GC} - P_{BS}) - (\\pi_{GC} - \\pi_{BS}) ]$. Trong đó:\n• $P_{GC}$ (Áp suất thủy tĩnh mao mạch cầu thận ~60 mmHg) thúc đẩy lọc.\n• $P_{BS}$ (Áp suất thủy tĩnh khoang Bowman ~15 mmHg) và $\\pi_{GC}$ (Áp lực keo mao mạch cầu thận ~32 mmHg) chống lại lọc.\n• $\\pi_{BS}$ bằng 0 vì dịch lọc bình thường không có protein. Áp lực lọc hữu hiệu tịnh $P_{UF} \\approx 60 - 15 - 32 = +13$ mmHg.',
    clinicalPearl: 'Thuốc ức chế men chuyển (ACEi) làm giãn tiểu động mạch đi nhiều hơn tiểu động mạch đến ➔ Làm giảm $P_{GC}$ ➔ Giảm áp lực lọc cầu thận (giảm vi đạm niệu và bảo vệ thận lâu dài ở bệnh nhân ĐTĐ, nhưng có thể làm tăng nhẹ Creatinine máu thoáng qua).',
    formulaOrLaw: 'PUF = (PGC - PBS) - πGC'
  },

  // NỘI TIẾT & TRUYỀN TÍN HIỆU TẾ BÀO
  {
    id: 'fc_17_g_protein_camp',
    category: 'Truyền Tin Tế Bào',
    categoryKey: 'biochem',
    frontTitle: 'Con Đường Truyền Tín Hiệu Gs - cAMP - PKA',
    frontClue: 'Làm thế nào một phân tử Glucagon hoặc Adrenaline có thể khuếch đại tín hiệu sinh ra hàng triệu phân tử Glucose?',
    backMechanism: 'Phối tử gắn thụ thể 7 đoạn xuyên màng (GPCR) loại Gs ➔ Tiểu đơn vị $\\alpha_s$ tách ra gắn GTP ➔ Hoạt hóa enzyme Adenylyl Cyclase trên màng ➔ Chuyển ATP thành cAMP (chất truyền tin thứ hai) ➔ cAMP gắn vào tiểu đơn vị điều hòa của Protein Kinase A (PKA) giải phóng tiểu đơn vị xúc tác hoạt động ➔ PKA phosphoryl hóa hàng loạt enzyme: Hoạt hóa Glycogen Phosphorylase (ly giải glycogen) và ức chế Glycogen Synthase. Một thụ thể kích hoạt hàng ngàn PKA, mỗi PKA kích hoạt hàng vạn enzyme (Dòng thác khuếch đại tín hiệu).',
    clinicalPearl: 'Độc tố tả (Vibrio cholerae toxin) gây ADP-ribosyl hóa cố định tiểu đơn vị Gs ở trạng thái gắn GTP liên tục ➔ Nồng độ cAMP tăng vọt không kiểm soát trong tế bào biểu mô ruột ➔ Mở liên tục kênh CFTR bài tiết Cl- và nước gây tiêu chảy xối xả như nước vo gạo.',
    formulaOrLaw: 'Ligand ➔ GPCR (Gs) ➔ AC ➔ cAMP ➔ PKA ➔ Phosphorylation Cascade'
  },
  {
    id: 'fc_18_ip3_dag_pathway',
    category: 'Truyền Tin Tế Bào',
    categoryKey: 'biochem',
    frontTitle: 'Con Đường Truyền Tín Hiệu Gq - IP3 - DAG - PKC',
    frontClue: 'Cơ chế nào giúp Angiotensin II và Oxytocin gây co thắt cơ trơn mạch máu và tử cung dữ dội?',
    backMechanism: 'Ligand gắn thụ thể kết cặp protein Gq ➔ Tiểu đơn vị $\\alpha_q$ hoạt hóa enzyme **Phospholipase C-beta (PLC-$\\beta$)** trên màng tế bào ➔ PLC cắt phân tử màng $PIP_2$ (Phosphatidylinositol 4,5-bisphosphate) thành 2 chất truyền tin thứ hai:\n1. **$IP_3$ (Inositol 1,4,5-trisphosphate)**: Tan trong bào tương, gắn lên thụ thể $IP_3R$ trên màng Lưới nội chất (ER) làm mở kênh giải phóng ồ ạt ion $Ca^{2+}$ vào bào tương ➔ $Ca^{2+}$ gắn Calmodulin kích hoạt MLCK gây co cơ trơn.\n2. **DAG (Diacylglycerol)**: Nằm lại trên màng, cùng với $Ca^{2+}$ hoạt hóa enzym **Protein Kinase C (PKC)**.',
    clinicalPearl: 'Các thụ thể sử dụng con đường Gq (Mnemonic **HAVe 1 M&M**): H1 (Histamin), A1 ($\\alpha_1$-Adrenergic), V1 (Vasopressin), M1 & M3 (Muscarinic).',
    formulaOrLaw: 'PIP2 ➔ (PLC) ➔ IP3 (giải phóng Ca2+ từ ER) + DAG (hoạt hóa PKC)'
  },
  {
    id: 'fc_19_rtk_mapk',
    category: 'Sinh Học Phân Tử',
    categoryKey: 'biochem',
    frontTitle: 'Thụ Thể Tyrosine Kinase (RTK) & Con Đường Ras-MAPK',
    frontClue: 'Insulin và các yếu tố tăng trưởng (EGF, PDGF) kích thích tế bào tăng sinh và phân chia qua chuỗi tín hiệu nào?',
    backMechanism: 'Yếu tố tăng trưởng gắn vào vùng ngoại bào của thụ thể RTK làm 2 monomer thụ thể nhị hợp hóa (Dimerization) ➔ Tự phosphoryl hóa chéo (Trans-autophosphorylation) các gốc Tyrosine nội bào ➔ Tạo vị trí gắn cho protein tiếp hợp chứa domain SH2 (như Grb2) ➔ Tuyển mộ SOS (yếu tố trao đổi nucleotide guanine) ➔ Hoạt hóa protein G nhỏ **Ras** (chuyển GDP thành GTP) ➔ Ras hoạt hóa dòng thác kinase: **Raf (MAPKKK)** ➔ **MEK (MAPKK)** ➔ **ERK/MAPK** ➔ ERK di chuyển vào nhân phosphoryl hóa các yếu tố phiên mã (c-Myc, c-Jun, c-Fos) kích thích tế bào đi từ pha G1 vào pha S của chu kỳ phân bào.',
    clinicalPearl: 'Đột biến kích hoạt gen sinh ung $KRAS$ (mất hoạt tính tự thủy phân GTP làm Ras luôn ở trạng thái mở) gặp trong > 90% ung thư tụy và 40% ung thư đại trực tràng, kháng hoàn toàn với thuốc ức chế EGFR như Cetuximab.',
    formulaOrLaw: 'Growth Factor ➔ RTK ➔ Grb2-SOS ➔ Ras-GTP ➔ Raf ➔ MEK ➔ ERK/MAPK'
  },
  {
    id: 'fc_20_dna_repair',
    category: 'Di Truyền Phân Tử',
    categoryKey: 'biochem',
    frontTitle: 'Sửa Sai Ghép Cặp Lệch (Mismatch Repair - MMR) vs. Cắt Bỏ Nucleotide (NER)',
    frontClue: 'Sự khiếm khuyết trong các cơ chế sửa sai DNA gây ra những hội chứng ung thư di truyền nổi tiếng nào?',
    backMechanism: '• **Nucleotide Excision Repair (NER)**: Cắt bỏ các đoạn tổn thương cồng kềnh biến dạng chuỗi xoắn kép do tia cực tím (UV) tạo ra dime Pyrimidine (Thymine dimer). Khiếm khuyết các gen NER (XPA đến XPG) gây bệnh **Khô da sắc tố (Xeroderma Pigmentosum)**, da cực kỳ nhạy cảm với ánh nắng và ung thư da tăng gấp 2000 lần.\n• **Mismatch Repair (MMR)**: Sửa sai các bắt cặp base nhầm lẫn phát sinh trong quá trình sao chép DNA ở pha G2 (các gen MSH2, MLH1, MSH6, PMS2). Khiếm khuyết hệ MMR gây bệnh **Hội chứng Lynch (Ung thư đại trực tràng di truyền không polyp)** với đặc trưng mất ổn định vi vệ tinh (Microsatellite Instability - MSI-H).',
    clinicalPearl: 'Khối u có tình trạng MSI-H / dMMR biểu hiện lượng lớn tân kháng nguyên đột biến (neoantigens), đáp ứng ngoạn mục với liệu pháp ức chế điểm kiểm soát miễn dịch (Anti-PD-1 như Pembrolizumab).',
    formulaOrLaw: 'Tia UV ➔ Thymine Dimer ➔ Sửa bởi NER; Lỗi sao chép ➔ Mismatch ➔ Sửa bởi MMR'
  },

  // THÂN NHIỆT & CHUYỂN HÓA CƠ QUAN
  {
    id: 'fc_21_metabolic_syndrome',
    category: 'Chuyển Hóa Năng Lượng',
    categoryKey: 'biochem',
    frontTitle: 'Đề Kháng Insulin & Rối Loạn Lipid Máu Sinh Vữa Xơ',
    frontClue: 'Bộ ba rối loạn lipid máu đặc trưng (Atherogenic Dyslipidemia) trong đề kháng insulin và béo phì trung tâm gồm những gì?',
    backMechanism: 'Đề kháng insulin tại mô mỡ làm tăng ly giải mỡ ➔ Tràn ngập acid béo tự do (FFA) về gan ➔ Gan tăng tổng hợp Triglyceride và bài xuất lượng lớn hạt lipoprotein tỷ trọng rất thấp giàu triglyceride (**VLDL**) ➔ Protein chuyển este cholesteryl (CETP) trao đổi triglyceride từ VLDL sang HDL và LDL ➔ Hạt HDL giàu TG bị men Hepatic Lipase phân hủy nhanh chóng làm **Giảm nồng độ HDL-C** bảo vệ; trong khi hạt LDL trở thành các hạt **LDL nhỏ, đậm đặc (Small dense LDL)** dễ dàng chui qua nội mô mạch máu và bị oxy hóa thành ox-LDL gây xơ vữa.',
    clinicalPearl: 'Bộ ba sinh xơ vữa kinh điển: (1) Tăng Triglyceride, (2) Giảm HDL-C, và (3) Tăng tỷ lệ hạt Small dense LDL. Nồng độ LDL-C toàn phần có thể bình thường nhưng số lượng hạt ApoB sinh xơ vữa lại rất cao.',
    formulaOrLaw: 'Đề kháng Insulin ➔ ↑ VLDL + ↑ TG + ↓ HDL-C + ↑ Small Dense LDL'
  },
  {
    id: 'fc_22_starling_forces',
    category: 'Sinh Lý Mao Mạch',
    categoryKey: 'physiology',
    frontTitle: 'Lực Starling Mao Mạch Ngoại Vi & Cơ Chế Phù',
    frontClue: '4 cơ chế sinh lý bệnh cơ bản giải thích sự hình thành dịch phù mô kẽ theo phương trình Starling?',
    backMechanism: '$J_v = K_f \\times [ (P_c - P_i) - \\sigma \\times (\\pi_c - \\pi_i) ]$. Trong đó $P_c$ là áp suất thủy tĩnh mao mạch, $\\pi_c$ là áp lực keo huyết tương, $\\sigma$ là hệ số phản xạ protein màng mao mạch. Phù xuất hiện khi tốc độ lọc dịch vượt quá khả năng dẫn lưu của hệ bạch huyết qua 4 cơ chế:\n1. Tăng áp suất thủy tĩnh mao mạch ($P_c$ tăng): Suy tim, huyết khối tĩnh mạch sâu DVT, xơ gan.\n2. Giảm áp suất keo huyết tương ($\\pi_c$ giảm): Hội chứng thận hư (tiểu đạm), suy dinh dưỡng Kwashiorkor, xơ gan giảm albumin.\n3. Tăng tính thấm thành mạch ($\\sigma$ giảm): Phản vệ, nhiễm trùng, bỏng, chấn thương mô.\n4. Tắc nghẽn mạch bạch huyết: Di căn ung thư chèn ép, phẫu thuật nạo hạch, nhiễm giun chỉ bạch huyết.',
    clinicalPearl: 'Phù do suy tim hoặc thận hư là phù mềm, ấn lõm, đối xứng; trong khi phù do tắc mạch bạch huyết (Lymphedema) giai đoạn muộn là phù cứng, không ấn lõm do lắng đọng mô xơ.',
    formulaOrLaw: 'Jv = Kf * [ (Pc - Pi) - σ(πc - πi) ]'
  },
  {
    id: 'fc_23_abg_compensation',
    category: 'Thăng Bằng Toan Kiềm',
    categoryKey: 'physiology',
    frontTitle: 'Tốc Độ Bù Trừ Giữa Hệ Hô Hấp & Hệ Thận',
    frontClue: 'Tại sao đáp ứng bù trừ của phổi diễn ra trong vài phút trong khi đáp ứng bù trừ của thận cần từ 2 đến 5 ngày?',
    backMechanism: '• **Bù trừ Hô hấp**: Diễn ra gần như NGAY LẬP TỨC (vài phút đến vài giờ) do các thụ thể hóa học trung ương tại hành não và xoang cảnh cực kỳ nhạy cảm với sự thay đổi pH dịch não tủy và máu ➔ Điều chỉnh ngay tần số và độ sâu thông khí phế nang để thay đổi đào thải $CO_2$.\n• **Bù trừ của Thận**: Diễn ra CHẬM (bắt đầu sau 12-24 giờ và đạt tối đa sau 3-5 ngày) vì đòi hỏi phải thay đổi biểu hiện gen, tổng hợp mới các phân tử vận chuyển ion ($Na^+/H^+$ exchanger NHE3, Bơm $H^+$ ATPase) và tăng sinh tổng hợp Glutamine tại tế bào ống thận để tăng bài tiết ion $NH_4^+$ và tái hấp thu mới $HCO_3^-$.',
    clinicalPearl: 'Trong toan hô hấp cấp (ví dụ ngừng thở đột ngột), $[HCO_3^-]$ chỉ tăng nhẹ 1 mEq/L cho mỗi 10 mmHg $pCO_2$ tăng; nhưng trong toan hô hấp mạn tính (COPD lâu năm), thận có đủ thời gian bù trừ làm $[HCO_3^-]$ tăng tới 3.5 - 4 mEq/L cho mỗi 10 mmHg $pCO_2$ tăng.',
    formulaOrLaw: 'Phổi (Phút ➔ Giờ): Đào thải CO2; Thận (Ngày): Tái hấp thu & Sinh mới HCO3-'
  },
  {
    id: 'fc_24_clotting_cascade',
    category: 'Huyết Học & Đông Máu',
    categoryKey: 'biochem',
    frontTitle: 'Mô Hình Đông Máu Dựa Trên Tế Bào (Cell-Based Model of Hemostasis)',
    frontClue: 'Tại sao mô hình dòng thác đông máu cổ điển (Nội sinh / Ngoại sinh) được thay thế bằng mô hình 3 pha trên tế bào?',
    backMechanism: 'Mô hình tế bào phản ánh chính xác diễn biến in vivo qua 3 pha liên tiếp:\n1. **Pha Khởi đầu (Initiation)**: Xảy ra trên tế bào mang Yếu tố mô (TF) ngoài lòng mạch. Phức hợp TF:VIIa hoạt hóa một lượng nhỏ Yếu tố X và IX, tạo ra lượng vết Thrombin ban đầu.\n2. **Pha Khuếch đại (Amplification)**: Thrombin ban đầu hoạt hóa tiểu cầu, đồng thời hoạt hóa các đồng yếu tố V, VIII và XI trên bề mặt màng tiểu cầu đã hoạt hóa.\n3. **Pha Lan tỏa (Propagation)**: Trên màng tiểu cầu giàu Phosphatidylserine tích điện âm, phức hợp Tenase (IXa:VIIIa:Ca2+) và phức hợp Prothrombinase (Xa:Va:Ca2+) hoạt động với hiệu suất tăng gấp hàng trăm ngàn lần ➔ Tạo "Bùng nổ Thrombin" (Thrombin Burst) ➔ Cắt Fibrinogen thành lưới Fibrin bền vững liên kết chéo nhờ Yếu tố XIIIa.',
    clinicalPearl: 'Bệnh Hemophilia A (thiếu Yếu tố VIII) và Hemophilia B (thiếu Yếu tố IX) làm tê liệt pha Lan tỏa trên bề mặt tiểu cầu, khiến cơ thể không thể tạo ra đợt bùng nổ Thrombin để cầm máu thứ phát, gây chảy máu khớp và cơ tái diễn.',
    formulaOrLaw: 'Pha Khởi đầu (TF:VIIa) ➔ Pha Khuếch đại (Thrombin kích hoạt Tiểu cầu) ➔ Pha Lan tỏa (Bùng nổ Thrombin)'
  }
];

/* ==========================================================================
   3. KHO 8 CHUỖI LẮP RÁP CƠ CHẾ BỆNH SINH TƯƠNG TÁC (CASCADE BUILDER)
   ========================================================================== */

export const CASCADE_BUILDER_DATA: CascadeBuilderItem[] = [
  // 1. SUY TIM PHÙ
  {
    id: 'cascade_1_hf',
    specialty: 'Tim Mạch',
    specialtyKey: 'cardiology',
    title: 'Chuỗi Bệnh Sinh: Suy Tim Tâm Thu ➔ Phù Mô Kẽ Ngoại Biên',
    clinicalScenario: 'Sắp xếp 5 mắt xích theo đúng trình tự nhân quả từ khi cơ tim bị tổn thương hoại tử cho đến khi dịch thoát ra mô kẽ gây phù chân.',
    orderedSteps: [
      {
        id: 's1',
        stepNumber: 1,
        stageName: 'Bệnh nguyên khởi phát',
        text: 'Nhồi máu cơ tim làm hoại tử tế bào cơ thất trái, giảm phân suất tống máu (EF < 35%) và giảm cung lượng tim (CO).'
      },
      {
        id: 's2',
        stepNumber: 2,
        stageName: 'Phản ứng bù trừ & Thần kinh thể dịch',
        text: 'Giảm áp lực tưới máu cầu thận kích hoạt bộ máy cạnh cầu thận tiết Renin, khởi động dòng thác Trục RAAS và hệ Giao cảm.'
      },
      {
        id: 's3',
        stepNumber: 3,
        stageName: 'Biến đổi phân tử tại ống thận',
        text: 'Angiotensin II và Aldosterone kích thích tăng tái hấp thu ion Na+ và nước tối đa tại ống lượn gần và ống góp.'
      },
      {
        id: 's4',
        stepNumber: 4,
        stageName: 'Huyết động & Lực Starling',
        text: 'Tăng thể tích dịch ngoại bào làm tăng hồi lưu máu, ứ trệ tuần hoàn tĩnh mạch hệ thống và tăng áp suất thủy tĩnh mao mạch (Pc).'
      },
      {
        id: 's5',
        stepNumber: 5,
        stageName: 'Biểu hiện lâm sàng',
        text: 'Áp suất thủy tĩnh Pc vượt quá áp lực keo πc, dịch lọc thoát ồ ạt qua thành mao mạch vào khoang gian bào gây phù chân ấn lõm.'
      }
    ],
    distractorSteps: [
      'Gan tăng tổng hợp Albumin đột ngột làm tăng áp lực keo mao mạch kéo nước ngược vào lòng mạch.',
      'Tâm nhĩ ngừng hoàn toàn việc sản xuất peptid lợi niệu ANP làm co thắt động mạch phổi.'
    ],
    fullCascadeText: 'Hoại tử cơ tim ➔ Giảm CO ➔ Giảm tưới máu thận ➔ Hoạt hóa trục RAAS & Giao cảm ➔ Tăng tái hấp thu Na+ và nước ➔ Tăng thể tích dịch ngoại bào & Áp suất thủy tĩnh mao mạch Pc ➔ Phù mô kẽ ngoại biên.',
    clinicalPearl: 'Thuốc lợi tiểu quai (Furosemide) ức chế kênh đồng vận Na+/K+/2Cl- tại quai Henle giúp đào thải nhanh lượng dịch ứ trệ, giảm ngay áp suất thủy tĩnh Pc để giảm phù.',
    relatedModule: '#/pathophysiology/simulators'
  },

  // 2. NHIỄM TOAN CETON ĐTĐ (DKA)
  {
    id: 'cascade_2_dka',
    specialty: 'Nội Tiết & Chuyển Hóa',
    specialtyKey: 'endocrine',
    title: 'Chuỗi Bệnh Sinh: Thiếu Insulin Tuyệt Đối ➔ Toan Ceton & Thở Kussmaul',
    clinicalScenario: 'Lắp ráp chuỗi chuyển hóa giải thích từ tình trạng thiếu Insulin đến biến đổi khí máu động mạch và kiểu thở bù trừ.',
    orderedSteps: [
      {
        id: 's1',
        stepNumber: 1,
        stageName: 'Bệnh nguyên tế bào',
        text: 'Tế bào beta tụy bị tự miễn phá hủy gây thiếu hụt Insulin tuyệt đối kèm tăng nồng độ Glucagon máu.'
      },
      {
        id: 's2',
        stepNumber: 2,
        stageName: 'Chuyển hóa tại mô mỡ',
        text: 'Mất ức chế của Insulin lên men Hormone-Sensitive Lipase (HSL) làm tăng phân giải Triglyceride giải phóng acid béo tự do (FFA).'
      },
      {
        id: 's3',
        stepNumber: 3,
        stageName: 'Chuyển hóa tại ty thể gan',
        text: 'Giảm Malonyl-CoA giải phóng ức chế enzyme CPT-I, đưa acid béo vào ty thể beta-oxy hóa quá tải tạo hàng loạt thể ceton acid.'
      },
      {
        id: 's4',
        stepNumber: 4,
        stageName: 'Nội môi & Thăng bằng toan kiềm',
        text: 'Acid acetoacetic và beta-hydroxybutyric phân ly giải phóng ion H+, tiêu hao hệ đệm HCO3- tạo toan chuyển hóa tăng Anion Gap.'
      },
      {
        id: 's5',
        stepNumber: 5,
        stageName: 'Đáp ứng hô hấp lâm sàng',
        text: 'Nồng độ H+ cao kích thích trung tâm hô hấp tại hành não gây kiểu thở nhanh sâu Kussmaul nhằm đào thải CO2 bù trừ tối đa.'
      }
    ],
    distractorSteps: [
      'Tăng tổng hợp Glycogen tại gan làm ức chế hoàn toàn quá trình tạo thể ceton.',
      'Thận tăng tái hấp thu H+ qua tế bào kẽ loại B làm kiềm hóa nước tiểu.'
    ],
    fullCascadeText: 'Thiếu Insulin ➔ Tăng HSL ly giải mô mỡ ➔ Tràn ngập FFA vào gan ➔ Hoạt hóa CPT-I & beta-oxy hóa ➔ Sinh thể ceton ồ ạt ➔ Toan chuyển hóa tăng Anion Gap ➔ Thở nhanh sâu Kussmaul.',
    clinicalPearl: 'Bù dịch mặn đẳng trương NaCl 0.9% là bước cấp cứu đầu tiên quan trọng nhất để phục hồi thể tích tuần hoàn và tưới máu thận trước khi chỉnh liều Insulin.',
    relatedModule: '#/pathophysiology/biochemistry'
  },

  // 3. TÁN HUYẾT G6PD
  {
    id: 'cascade_3_g6pd',
    specialty: 'Huyết Học & Hóa Sinh',
    specialtyKey: 'hematology',
    title: 'Chuỗi Bệnh Sinh: Thiếu G6PD ➔ Stress Oxy Hóa ➔ Tiểu Màu Xá Xị',
    clinicalScenario: 'Lắp ráp chuỗi phản ứng từ khi bệnh nhân tiếp xúc thuốc oxy hóa đến hiện tượng vỡ hồng cầu và biến đổi màu sắc nước tiểu.',
    orderedSteps: [
      {
        id: 's1',
        stepNumber: 1,
        stageName: 'Khiếm khuyết di truyền',
        text: 'Đột biến gen G6PD trên nhiễm sắc thể X làm suy giảm hoạt tính enzyme giới hạn của con đường Pentose Phosphate trong hồng cầu.'
      },
      {
        id: 's2',
        stepNumber: 2,
        stageName: 'Cạn kiệt chất chống oxy hóa',
        text: 'Tiếp xúc thuốc oxy hóa sinh nhiều gốc ROS nhưng tế bào không đủ NADPH để enzyme Glutathione Reductase tái tạo Glutathione khử (GSH).'
      },
      {
        id: 's3',
        stepNumber: 3,
        stageName: 'Biến tính Protein & Thể vùi',
        text: 'Gốc tự do oxy hóa nhóm -SH của chuỗi Globin làm Hemoglobin biến tính kết tủa thành các hạt thể Heinz dính vào màng hồng cầu.'
      },
      {
        id: 's4',
        stepNumber: 4,
        stageName: 'Tổn thương màng tại lách',
        text: 'Đại thực bào tủy đỏ của lách gặm nhấm thể Heinz tạo hồng cầu hình vết cắn (Bite cells) và gây vỡ màng hồng cầu trong lòng mạch.'
      },
      {
        id: 's5',
        stepNumber: 5,
        stageName: 'Biến đổi sinh hóa & Nước tiểu',
        text: 'Hemoglobin tự do vượt quá khả năng gắn của Haptoglobin lọc qua cầu thận vào nước tiểu làm nước tiểu có màu đen sẫm như xá xị.'
      }
    ],
    distractorSteps: [
      'Tăng sinh tủy xương quá mức làm tăng giải phóng Hemoglobin A2 vào nước tiểu.',
      'Enzyme Pyruvate Kinase bị ức chế hoàn toàn làm ngừng trệ sản xuất 2,3-BPG.'
    ],
    fullCascadeText: 'Đột biến G6PD ➔ Giảm tạo NADPH ➔ Cạn kiệt GSH bảo vệ ➔ ROS oxy hóa Hb tạo Thể Heinz ➔ Đại thực bào lách tạo Bite cells & gây vỡ hồng cầu ➔ Hemoglobin niệu làm nước tiểu đen sẫm.',
    clinicalPearl: 'Cần cung cấp danh sách các thuốc và thực phẩm cần tránh tuyệt đối (Primaquine, Dapsone, Nitrofurantoin, Sulfonamides, Đậu Fava) cho người bệnh mang gen thiếu G6PD.',
    relatedModule: '#/pathophysiology/biochemistry'
  },

  // 4. SỐC NHIỄM KHUẨN (SEPTIC SHOCK)
  {
    id: 'cascade_4_sepsis',
    specialty: 'Truyền Nhiễm & Cấp Cứu',
    specialtyKey: 'immunology_inf',
    title: 'Chuỗi Bệnh Sinh: Nội Độc Tố Vi Khuẩn (LPS) ➔ Liệt Mạch & Sốc Nhiễm Khuẩn',
    clinicalScenario: 'Sắp xếp các bước từ khi vi khuẩn Gram âm xâm nhập đến hiện tượng giãn mạch toàn thể và toan lactic mô.',
    orderedSteps: [
      {
        id: 's1',
        stepNumber: 1,
        stageName: 'Nhận diện kháng nguyên PAMP',
        text: 'Nội độc tố LPS của vi khuẩn gắn vào thụ thể TLR-4 trên bề mặt đại thực bào, kích hoạt yếu tố phiên mã nhân NF-κB.'
      },
      {
        id: 's2',
        stepNumber: 2,
        stageName: 'Cơn bão Cytokines',
        text: 'Đại thực bào tiết ồ ạt các cytokine tiền viêm (TNF-α, IL-1β, IL-6) kích thích tế bào nội mô và cơ trơn thành mạch.'
      },
      {
        id: 's3',
        stepNumber: 3,
        stageName: 'Tổng hợp quá mức chất giãn mạch',
        text: 'Cytokines cảm ứng biểu hiện enzyme iNOS tổng hợp lượng khổng lồ Nitric Oxide (NO), làm tăng cGMP trong tế bào cơ trơn mạch máu.'
      },
      {
        id: 's4',
        stepNumber: 4,
        stageName: 'Liệt mạch & Tụt huyết áp',
        text: 'Mở kênh K+ phụ thuộc ATP gây ưu phân cực và giảm canxi nội bào, làm giãn mạch sâu rộng toàn thân và kháng với thuốc co mạch.'
      },
      {
        id: 's5',
        stepNumber: 5,
        stageName: 'Thiếu oxy tế bào & Toan Lactic',
        text: 'Tụt huyết áp nặng làm giảm áp lực tưới máu mô, tế bào chuyển sang hô hấp kỵ khí sinh Lactic acid gây toan máu và suy đa tạng.'
      }
    ],
    distractorSteps: [
      'Enzyme ACE tăng sinh quá mức gây co thắt cực độ toàn bộ động mạch phổi.',
      'Bạch cầu lympho T tiết IL-10 làm co cứng thành mạch ngoại vi.'
    ],
    fullCascadeText: 'LPS gắn TLR-4 ➔ Tiết Cytokines (TNF-α, IL-1) ➔ Cảm ứng iNOS tạo lượng lớn NO ➔ Mở kênh K_ATP gây liệt mạch toàn thân ➔ Tụt HA sâu & Toan Lactic mô ➔ Suy đa tạng.',
    clinicalPearl: 'Kháng sinh phổ rộng đường tĩnh mạch cần được bắt đầu ngay trong giờ đầu tiên (Golden Hour) sau khi cấy máu để tiêu diệt nguồn phát sinh nội độc tố.',
    relatedModule: '#/pathophysiology/simulators'
  },

  // 5. LOÉT DẠ DÀY DO H. PYLORI
  {
    id: 'cascade_5_pud',
    specialty: 'Tiêu Hóa',
    specialtyKey: 'gi_hepato',
    title: 'Chuỗi Bệnh Sinh: Nhiễm H. pylori Hang Vị ➔ Loét Hành Tá Tràng',
    clinicalScenario: 'Lắp ráp chuỗi tác động của vi khuẩn H. pylori lên hệ thống tế bào nội tiết dạ dày dẫn đến tăng tiết acid và phá hủy niêm mạc tá tràng.',
    orderedSteps: [
      {
        id: 's1',
        stepNumber: 1,
        stageName: 'Xâm nhập & Thích nghi',
        text: 'H. pylori tiết men Urease tạo vi môi trường kiềm NH3 bao quanh, bám dính vào niêm mạc hang vị và tiết độc tố CagA/VacA.'
      },
      {
        id: 's2',
        stepNumber: 2,
        stageName: 'Mất cân bằng nội tiết Paracrine',
        text: 'Phản ứng viêm mạn tính phá hủy chọn lọc các tế bào D tại hang vị, làm giảm sút nghiêm trọng hormone ức chế Somatostatin.'
      },
      {
        id: 's3',
        stepNumber: 3,
        stageName: 'Tăng tiết Gastrin & Kích thích tế bào Viền',
        text: 'Mất ức chế của Somatostatin làm tế bào G tăng tiết Gastrin vào máu, kích hoạt tế bào ECL tiết Histamin kích thích tế bào Viền.'
      },
      {
        id: 's4',
        stepNumber: 4,
        stageName: 'Tăng sản xuất Acid HCl',
        text: 'Bơm proton H+/K+ ATPase trên màng đỉnh tế bào Viền hoạt động tối đa, bài tiết lượng lớn ion H+ làm dịch vị quá toan.'
      },
      {
        id: 's5',
        stepNumber: 5,
        stageName: 'Tổn thương niêm mạc tá tràng',
        text: 'Lượng acid dư thừa tràn vào hành tá tràng vượt quá khả năng đệm của HCO3- dịch tụy, gây dị sản dạ dày và hình thành ổ loét tá tràng.'
      }
    ],
    distractorSteps: [
      'Tế bào chính (Chief cells) ngừng hoàn toàn việc sản xuất Pepsinogen làm giảm co bóp dạ dày.',
      'Vi khuẩn kích thích tế bào nhầy tiết chất nhầy kiềm dày đặc bảo vệ tá tràng.'
    ],
    fullCascadeText: 'H. pylori viêm hang vị ➔ Tổn thương tế bào D giảm Somatostatin ➔ Mất ức chế tế bào G tăng Gastrin ➔ Tế bào Viền tăng tiết HCl ➔ Quá tải toan tá tràng gây loét hành tá tràng.',
    clinicalPearl: 'Test hơi thở Ure C13/C14 dựa chính xác vào hoạt tính enzyme Urease của vi khuẩn để xác định tình trạng nhiễm hoặc đánh giá tiệt trừ sau điều trị.',
    relatedModule: '#/pathophysiology/biochemistry'
  },

  // 6. XƠ GAN CỔ TRƯỚNG
  {
    id: 'cascade_6_cirrhosis',
    specialty: 'Tiêu Hóa & Gan Mật',
    specialtyKey: 'gi_hepato',
    title: 'Chuỗi Bệnh Sinh: Xơ Gan ➔ Giãn Mạch Tạng ➔ Cổ Trướng & Giảm Natri Máu',
    clinicalScenario: 'Sắp xếp 5 giai đoạn tiến triển từ tổn thương xơ hóa gan đến sự hình thành cổ trướng và giữ muối nước của thận.',
    orderedSteps: [
      {
        id: 's1',
        stepNumber: 1,
        stageName: 'Biến đổi cấu trúc gan',
        text: 'Tế bào hình sao (Ito) hoạt hóa tăng sinh sợi collagen làm xơ hóa khoảng cửa, tăng sức cản mạch máu và gây Tăng áp tĩnh mạch cửa.'
      },
      {
        id: 's2',
        stepNumber: 2,
        stageName: 'Giãn mạch tuần hoàn tạng',
        text: 'Áp lực cửa tăng kích thích nội mô mạc treo tiết nhiều Nitric Oxide (NO) gây giãn toàn bộ hệ động mạch tạng và ứ trệ máu tại mạc treo.'
      },
      {
        id: 's3',
        stepNumber: 3,
        stageName: 'Giảm thể tích tuần hoàn hiệu dụng',
        text: 'Thể tích máu động mạch hiệu dụng (EABV) sụt giảm kích hoạt các thụ thể áp lực xoang cảnh, hoạt hóa cực đại trục RAAS và tiết ADH.'
      },
      {
        id: 's4',
        stepNumber: 4,
        stageName: 'Giữ muối nước tại thận',
        text: 'Aldosterone tăng tái hấp thu Na+, ADH mở kênh Aquaporin-2 tái hấp thu nước tự do làm tăng thể tích dịch ngoại bào và hạ Na+ máu.'
      },
      {
        id: 's5',
        stepNumber: 5,
        stageName: 'Thoát dịch vào ổ bụng (Cổ trướng)',
        text: 'Kết hợp giảm Albumin máu (giảm áp lực keo) và tăng áp lực xoang gan làm dịch thấm lọc ồ ạt qua màng bao gan vào khoang phúc mạc.'
      }
    ],
    distractorSteps: [
      'Gan tăng cường chuyển hóa Aldosterone làm nồng độ hormone này trong máu giảm thấp.',
      'Áp lực tĩnh mạch cửa giảm sâu làm dịch từ ổ bụng bị hút ngược trở lại vào lòng mạch.'
    ],
    fullCascadeText: 'Tăng áp cửa ➔ Giãn mạch tạng do NO ➔ Giảm thể tích máu hiệu dụng EABV ➔ Kích hoạt RAAS & ADH giữ muối nước ➔ Giảm áp lực keo + Tăng áp xoang gan ➔ Hình thành cổ trướng.',
    clinicalPearl: 'Chọc tháo dịch báng lượng lớn (> 5 lít) bắt buộc phải truyền bù Albumin (8g cho mỗi lít dịch tháo ra) để phòng ngừa hội chứng Rối loạn tuần hoàn sau chọc tháo (PPCD).',
    relatedModule: '#/pathophysiology/simulators'
  },

  // 7. CƠN GOUT CẤP
  {
    id: 'cascade_7_gout',
    specialty: 'Cơ Xương Khớp',
    specialtyKey: 'rheum_bone',
    title: 'Chuỗi Bệnh Sinh: Tăng Acid Uric ➔ Thể Viêm NLRP3 ➔ Viêm Khớp Gout Cấp',
    clinicalScenario: 'Lắp ráp chuỗi phản ứng tế bào từ khi nồng độ acid uric vượt ngưỡng bão hòa đến phản ứng viêm cấp tính dữ dội tại ổ khớp.',
    orderedSteps: [
      {
        id: 's1',
        stepNumber: 1,
        stageName: 'Quá bão hòa & Kết tinh',
        text: 'Nồng độ Acid Uric máu tăng vượt ngưỡng hòa tan (> 6.8 mg/dL), kết tinh thành các tinh thể Monosodium Urate (MSU) hình kim tại dịch khớp.'
      },
      {
        id: 's2',
        stepNumber: 2,
        stageName: 'Thực bào & Kích hoạt Thể viêm',
        text: 'Đại thực bào mô hoạt dịch thực bào tinh thể MSU làm vỡ màng tiêu thể, kích hoạt phức hợp đa protein thể viêm NLRP3 Inflammasome.'
      },
      {
        id: 's3',
        stepNumber: 3,
        stageName: 'Cắt tiền chất Cytokine',
        text: 'NLRP3 hoạt hóa enzyme Caspase-1, enzyme này cắt tiền chất Pro-IL-1β trong bào tương thành Interleukin-1β (IL-1β) dạng hoạt động.'
      },
      {
        id: 's4',
        stepNumber: 4,
        stageName: 'Chiêu mộ Bạch cầu đa nhân',
        text: 'IL-1β hoạt hóa nội mô mạch máu màng hoạt dịch, bộc lộ phân tử bám dính và tiết IL-8 thu hút ồ ạt bạch cầu trung tính vào khoang khớp.'
      },
      {
        id: 's5',
        stepNumber: 5,
        stageName: 'Viêm cấp tính & Đau đớn dữ dội',
        text: 'Bạch cầu trung tính thực bào giải phóng men lysosome, gốc tự do ROS và bẫy ngoại bào NETs gây sưng nóng đỏ và đau khớp dữ dội.'
      }
    ],
    distractorSteps: [
      'Tinh thể Urate kích thích trực tiếp tạo cốt bào tăng sinh làm cứng khớp tức thì.',
      'Kháng thể tự miễn Anti-CCP kết hợp với tinh thể tạo phức hợp miễn dịch lắng đọng tại cầu thận.'
    ],
    fullCascadeText: 'Tăng Acid Uric bão hòa ➔ Kết tinh tinh thể MSU ➔ Đại thực bào kích hoạt NLRP3 Inflammasome ➔ Caspase-1 tiết IL-1β ➔ Chiêu mộ Neutrophils ➔ Giải phóng ROS & Enzyme gây viêm khớp Gout cấp.',
    clinicalPearl: 'Thuốc sinh học ức chế IL-1 (Anakinra, Canakinumab) là giải pháp cứu cánh cực kỳ hiệu quả cho những bệnh nhân Gout cấp kháng trị hoặc có chống chỉ định với NSAID, Colchicine và Corticoid.',
    relatedModule: '#/pathophysiology/biochemistry'
  },

  // 8. TIỀN SẢN GIẬT (PREECLAMPSIA)
  {
    id: 'cascade_8_preeclampsia',
    specialty: 'Sản Khoa',
    specialtyKey: 'ob_peds',
    title: 'Chuỗi Bệnh Sinh: Thiếu Máu Bánh Nhau ➔ Tiết sFlt-1 ➔ Tiền Sản Giật',
    clinicalScenario: 'Lắp ráp chuỗi cơ chế 2 giai đoạn từ khuyết tật tái cấu trúc động mạch xoắn tử cung đến tăng huyết áp và tổn thương nội mô của mẹ.',
    orderedSteps: [
      {
        id: 's1',
        stepNumber: 1,
        stageName: 'Khiếm khuyết xâm nhập nguyên bào nuôi',
        text: 'Nguyên bào nuôi ngoài gai nhau không xâm nhập sâu vào lớp cơ tử cung, khiến động mạch xoắn tử cung không được giãn rộng và giữ lòng hẹp.'
      },
      {
        id: 's2',
        stepNumber: 2,
        stageName: 'Thiếu oxy bánh nhau & Stress oxy hóa',
        text: 'Giảm tưới máu mạn tính làm bánh nhau thiếu oxy, kích hoạt các phản ứng viêm và phóng thích các gốc tự do vào tuần hoàn bánh nhau.'
      },
      {
        id: 's3',
        stepNumber: 3,
        stageName: 'Tiết các yếu tố kháng tạo mạch',
        text: 'Bánh nhau thiếu oxy tiết ồ ạt các yếu tố kháng tạo mạch sFlt-1 và Soluble Endoglin vào hệ tuần hoàn máu của người mẹ.'
      },
      {
        id: 's4',
        stepNumber: 4,
        stageName: 'Trung hòa yếu tố tăng trưởng nội mô',
        text: 'sFlt-1 gắn và trung hòa các phân tử VEGF và PlGF tự do, làm mất tín hiệu sống còn và bảo vệ của tế bào nội mô toàn cơ thể mẹ.'
      },
      {
        id: 's5',
        stepNumber: 5,
        stageName: 'Rối loạn nội mô toàn thân & Biểu hiện bệnh',
        text: 'Nội mô tổn thương giảm tiết NO/Prostacyclin gây co mạch tăng huyết áp; tổn thương podocyte cầu thận gây rò rỉ đạm niệu và phù nề.'
      }
    ],
    distractorSteps: [
      'Bánh nhau tăng tiết nồng độ lớn VEGF tự do kích thích tân tạo mạch máu khắp cơ thể mẹ.',
      'Tuyến thượng thận thai nhi ngừng tiết hormone DHEA-S làm giảm áp lực tuần hoàn rốn.'
    ],
    fullCascadeText: 'Khiếm khuyết xâm nhập ĐM xoắn ➔ Thiếu máu bánh nhau ➔ Tiết yếu tố kháng tạo mạch sFlt-1 ➔ Trung hòa VEGF & PlGF ➔ Tổn thương nội mô mẹ ➔ Tăng huyết áp & Đạm niệu (Tiền sản giật).',
    clinicalPearl: 'Chấm dứt thai kỳ (sinh con và lấy bánh nhau ra) là phương pháp điều trị triệt để duy nhất cho tiền sản giật nặng vì bánh nhau chính là nguồn gốc phát sinh các độc chất kháng tạo mạch.',
    relatedModule: '#/pathophysiology/simulators'
  }
];
