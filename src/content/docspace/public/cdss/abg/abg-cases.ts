import { ClinicalCase } from './abg-types';

export const CLINICAL_CASES: ClinicalCase[] = [
  {
    id: 1,
    source: 'Hennessey & Japp (Made Easy)',
    caseNumberDisplay: 'Ca 01 (Hennessey)',
    title: 'Viêm phổi thùy cộng đồng ở người trẻ',
    patientProfile: 'Nam 25 tuổi, không tiền sử bệnh lý, sốt 2 ngày, ho đờm và khó thở tăng dần',
    categoryTag: 'Suy hô hấp Type 1',
    difficulty: 'Cơ bản',
    history: 'Nam thanh niên 25 tuổi, khỏe mạnh, vào viện vì sốt 39.3°C, ho khạc đờm mủ và khó thở tiến triển 2 ngày. Không có bệnh lý hô hấp trước đây.',
    examination: {
      vitals: {
        pulse: '104 lần/phút',
        rr: '28 lần/phút',
        bp: '118/70 mmHg',
        temp: '39.3°C',
        spo2: '89% (khí trời)',
        fio2: '21%'
      },
      findings: 'Tỉnh, thở nhanh co kéo cơ liên sườn. Rung thanh tăng, gõ đục, tiếng thở phế quản và ran nổ thô ở đáy phổi trái phía sau.'
    },
    abg: {
      unit: 'kPa',
      pH: 7.50,
      pCO2: 3.74, // 28.1 mmHg
      pO2: 7.68,  // 57.8 mmHg
      hco3: 23.9,
      be: -0.5,
      sao2: 88.7,
      fio2: 21,
      na: 138,
      k: 3.7,
      cl: 99,
      lactate: 1.2,
      glucose: 5.4,
      patientAge: 25
    },
    questions: [
      '1. Đánh giá trao đổi khí tại phổi của bệnh nhân?',
      '2. Đánh giá thăng bằng kiềm toan?',
      '3. Bệnh nhân có cần thở oxy bổ sung không?',
      '4. Máy đo SpO2 kẹp ngón tay có phải là công cụ theo dõi phù hợp thay cho chọc khí máu lặp lại không?'
    ],
    answers: {
      gasExchange: 'Suy hô hấp Type 1 mức độ trung bình (PaO2 57.8 mmHg / 7.68 kPa < 60 mmHg). Có tình trạng tăng thông khí phế nang (PaCO2 giảm xuống 28.1 mmHg / 3.74 kPa) do phản xạ thở nhanh bù trừ thiếu oxy.',
      acidBase: 'Kiềm hô hấp cấp chưa bù trừ (pH 7.50 tăng, PaCO2 giảm, HCO3- bình thường 23.9 mmol/L). Lưu ý: thận cần nhiều ngày để bù trừ chuyển hóa nên trong rối loạn hô hấp cấp tính, HCO3- vẫn bình thường.',
      differentialDiagnosis: 'Viêm phổi thùy trái (Community-acquired pneumonia - CAP). Đông đặc nhu mô phổi gây bất tương xứng thông khí/tưới máu (V/Q mismatch) và shunt sinh lý.',
      clinicalAction: 'Cho thở oxy bổ sung ngay (gọng kính mũi 2-4 L/phút) để đưa PaO2 lên > 60 mmHg (SpO2 94-98%). Khởi động kháng sinh điều trị viêm phổi theo phác đồ kinh nghiệm. Bù đủ nước và hạ sốt.',
      physiologicalInsight: 'Vì PaCO2 không tăng mà giảm (thông khí còn tốt), bệnh nhân hoàn toàn không có nguy cơ ứ CO2. SpO2 kẹp ngón tay là phương tiện theo dõi tiến triển cực kỳ an toàn và hiệu quả, tránh việc phải chọc động mạch đau đớn nhiều lần.'
    }
  },
  {
    id: 2,
    source: 'Hennessey & Japp (Made Easy)',
    caseNumberDisplay: 'Ca 02 (Hennessey)',
    title: 'Hội chứng Pickwickian (Béo phì giảm thông khí)',
    patientProfile: 'Nữ 34 tuổi, béo phì bệnh lý (BMI 49), ĐTĐ type 2, làm xét nghiệm tiền phẫu cắt dạ dày giảm béo',
    categoryTag: 'Suy hô hấp Type 2',
    difficulty: 'Trung bình',
    history: 'Bệnh nhân nữ 34 tuổi, BMI = 49 kg/m2, không triệu chứng hô hấp lúc nghỉ, được làm khí máu động mạch tầm soát tiền phẫu trước mổ bariatric surgery.',
    examination: {
      vitals: {
        pulse: '76 lần/phút',
        rr: '14 lần/phút',
        bp: '130/80 mmHg',
        temp: '36.8°C',
        spo2: '96% (khí trời)',
        fio2: '21%'
      },
      findings: 'Thể trạng béo phì nặng, lồng ngực di động kém theo nhịp thở. Nghe phổi rì rào phế nang giảm nhẹ toàn bộ, không ran.'
    },
    abg: {
      unit: 'kPa',
      pH: 7.35,
      pCO2: 7.30, // 54.8 mmHg
      pO2: 9.60,  // 72.2 mmHg
      hco3: 29.0,
      be: 3.8,
      sao2: 96.0,
      fio2: 21,
      na: 134,
      k: 4.7,
      cl: 102,
      lactate: 1.0,
      glucose: 9.0,
      patientAge: 34
    },
    questions: [
      '1. Mô tả trao đổi khí và thăng bằng kiềm toan?',
      '2. Chẩn đoán nguyên nhân hợp lý nhất?',
      '3. Làm thế nào để biết đây là Toan hô hấp mạn tính bù trừ hay Kiềm chuyển hóa bù trừ hô hấp?'
    ],
    answers: {
      gasExchange: 'Suy hô hấp Type 2 mạn tính (Tăng CO2 mạn tính PaCO2 54.8 mmHg / 7.3 kPa do hạn chế lồng ngực). Giảm oxy hóa máu mức độ nhẹ.',
      acidBase: 'Toan hô hấp mạn tính bù trừ hoàn toàn (Compensated Respiratory Acidosis). pH 7.35 (ở cận dưới bình thường 7.35-7.40), HCO3- tăng lên 29.0 mmol/L.',
      differentialDiagnosis: 'Hội chứng béo phì giảm thông khí (Obesity-Hypoventilation Syndrome / Pickwickian Syndrome). Khối lượng mỡ thành ngực quá lớn cản trở giãn nở phổi gây giảm thông khí phế nang kéo dài.',
      clinicalAction: 'Tập vật lý trị liệu hô hấp, tầm soát ngưng thở khi ngủ (Polysomnography), chỉ định thông khí áp lực dương không xâm nhập (CPAP/BiPAP) ban đêm trước và sau phẫu thuật.',
      physiologicalInsight: 'Nguyên tắc vàng: Không bao giờ có sự "bù trừ quá mức" (Overcompensation does not occur). Điểm trung hòa là pH 7.40; vì pH thực tế là 7.35 (nghiêng về toan) nên rối loạn tiên phát BẮT BUỘC là Toan hô hấp và HCO3 tăng là đáp ứng bù trừ của thận kéo dài nhiều tuần.'
    }
  },
  {
    id: 3,
    source: 'Hennessey & Japp (Made Easy)',
    caseNumberDisplay: 'Ca 03 (Hennessey)',
    title: 'Thuyên tắc mạch phổi cấp (Pulmonary Embolism)',
    patientProfile: 'Nữ 24 tuổi, sinh viên điều dưỡng, khó thở đột ngột sau chuyến bay 24 giờ từ Úc về Anh',
    categoryTag: 'Cấp cứu mạch phổi',
    difficulty: 'Nâng cao',
    history: 'Nữ 24 tuổi, không tiền sử bệnh tim phổi, không hút thuốc. Vừa đáp chuyến bay đường dài từ Úc về ngày hôm trước, xuất hiện khó thở đột ngột, lo lắng tột độ. Không đau ngực kiểu màng phổi, không ho máu.',
    examination: {
      vitals: {
        pulse: '88 lần/phút',
        rr: '22 lần/phút',
        bp: '124/76 mmHg',
        temp: '37.0°C',
        spo2: '95% (khí trời)',
        fio2: '21%'
      },
      findings: 'Bệnh nhân rất lo lắng, hốt hoảng. Khám phổi hoàn toàn bình thường, không ran, không dấu hiệu DVT chi dưới trên lâm sàng. X-quang ngực thẳng bình thường.'
    },
    abg: {
      unit: 'kPa',
      pH: 7.51,
      pCO2: 3.90, // 29.3 mmHg
      pO2: 10.3,  // 77.0 mmHg
      hco3: 25.0,
      be: 0.7,
      sao2: 93.7,
      fio2: 21,
      na: 141,
      k: 4.3,
      cl: 101,
      lactate: 1.0,
      glucose: 4.6,
      patientAge: 24
    },
    questions: [
      '1. Phân tích trao đổi khí và toan kiềm?',
      '2. Tính toán A-a gradient ở ca này?',
      '3. Chẩn đoán nghi ngờ hàng đầu là gì và hướng xử trí tiếp theo?'
    ],
    answers: {
      gasExchange: 'Suy hô hấp Type 1 mức độ nhẹ có kèm tăng thông khí rõ rệt (PaCO2 giảm xuống 29.3 mmHg). Ở người trẻ 24 tuổi bình thường, PaO2 phải đạt > 95 mmHg; mức 77 mmHg là bất thường rõ rệt!',
      acidBase: 'Kiềm hô hấp cấp chưa bù trừ do thở nhanh phản xạ.',
      differentialDiagnosis: 'Thuyên tắc động mạch phổi (Pulmonary Embolism - PE) thứ phát sau huyết khối tĩnh mạch sâu do bất động trên chuyến bay dài. Phân biệt với cơn hoảng loạn (Panic attack/Hyperventilation syndrome).',
      clinicalAction: 'A-a gradient tính được là 38 mmHg (4.7 kPa), vượt xa mức bình thường (< 20 mmHg hay < 2.6 kPa). Điều này chứng minh có bất tương xứng V/Q thực tổn trong phổi chứ không phải chỉ là lo âu đơn thuần! Chỉ định ngay CT mạch máu phổi có cản quang (CTPA) hoặc xét nghiệm D-Dimer, khởi động chống đông khi có chỉ định.',
      physiologicalInsight: 'Một cái bẫy chết người trên lâm sàng: Nhìn SpO2 95% có vẻ bình thường, nhưng khi bệnh nhân đang thở nhanh (PaCO2 giảm), theo phương trình khí phế nang PAO2 phải tăng lên cao. Khi PaO2 thực tế không tăng tương xứng làm A-a gradient giãn rộng, đó là bằng chứng của tắc nghẽn giường mạch phổi!'
    }
  },
  {
    id: 4,
    source: 'Hennessey & Japp (Made Easy)',
    caseNumberDisplay: 'Ca 04 (Hennessey)',
    title: 'Ngộ độc Morphin hậu phẫu gây ngừng thở',
    patientProfile: 'Nam 78 tuổi, hậu phẫu cắt túi mật mở, li bì khó đánh thức, đồng tử co nhỏ',
    categoryTag: 'Ngộ độc / Cấp cứu',
    difficulty: 'Cấp cứu',
    history: 'Cụ ông 78 tuổi vừa mổ hở cắt túi mật phức tạp. Bệnh nhân được tiêm 3 mũi Morphin 10mg trong vòng vài giờ ngoài lượng morphin do máy giảm đau PCA cung cấp. Điều dưỡng phát hiện bệnh nhân li bì, thở ngắt quãng.',
    examination: {
      vitals: {
        pulse: '90 lần/phút',
        rr: '5 lần/phút',
        bp: '98/64 mmHg',
        temp: '36.2°C',
        spo2: '99% (đang thở oxy 28%)',
        fio2: '28%'
      },
      findings: 'Hôn mê nông, không đáp ứng lời gọi, thở rất nông 5 lần/phút. Hai đồng tử co nhỏ như đầu đinh ghim (pinpoint pupils).'
    },
    abg: {
      unit: 'kPa',
      pH: 7.18,
      pCO2: 8.20, // 62.0 mmHg
      pO2: 11.76, // 87.0 mmHg
      hco3: 22.4,
      be: -1.5,
      sao2: 99.8,
      fio2: 28,
      na: 137,
      k: 4.4,
      cl: 103,
      lactate: 1.0,
      glucose: 3.9,
      patientAge: 78
    },
    questions: [
      '1. Mô tả trao đổi khí và thăng bằng kiềm toan?',
      '2. Chẩn đoán nguyên nhân?',
      '3. Xử trí cấp cứu cụ thể ngay lập tức là gì?'
    ],
    answers: {
      gasExchange: 'Suy hô hấp Type 2 cấp tính (Suy thông khí phế nang cấp tính do ức chế trung tâm hô hấp). PaO2 bình thường giả tạo do đang thở oxy 28%.',
      acidBase: 'Toan hô hấp cấp tính chưa bù trừ mức độ nặng (pH 7.18 tụt sâu, PaCO2 tăng cao 62 mmHg, HCO3- bình thường 22.4 mmol/L).',
      differentialDiagnosis: 'Ngộ độc quá liều Opiate / Morphin hậu phẫu (Opioid Toxicity).',
      clinicalAction: '1. Khai thông đường thở, bóp bóng Ambu qua mặt nạ ngay lập tức. 2. Tiêm tĩnh mạch chất đối kháng đặc hiệu NALOXONE 0.4mg - 0.8mg, lặp lại sau mỗi 2-3 phút đến khi nhịp thở phục hồi. 3. Lưu ý: Naloxone có thời gian bán hủy ngắn hơn morphin (chỉ 30-60 phút), bệnh nhân có thể tái ngộ độc và ức chế hô hấp trở lại, phải theo dõi sát liên tục trong đơn vị hồi tỉnh/ICU.',
      physiologicalInsight: 'Dù SpO2 máy kẹp hiển thị 99% nhờ oxy 28%, bệnh nhân đang ở bờ vực tử vong vì PaCO2 vọt lên gây toan máu nặng (pH 7.18). Đây là minh chứng rõ rệt cho việc máy đo SpO2 hoàn toàn vô dụng trong đánh giá thông khí phế nang!'
    }
  },
  {
    id: 5,
    source: 'Hennessey & Japp (Made Easy)',
    caseNumberDisplay: 'Ca 05 (Hennessey)',
    title: 'Đợt cấp COPD: Khi nào ĐƯỢC PHÉP cho thở oxy?',
    patientProfile: 'Nam 75 tuổi, tiền sử COPD nặng nhiều năm, khó thở tăng dần 3 ngày, thở chúm môi',
    categoryTag: 'Bệnh phổi mạn tính (COPD)',
    difficulty: 'Cơ bản',
    history: 'Cụ ông 75 tuổi có tiền sử COPD nhiều năm. 3 ngày nay khó thở nhiều hơn, khạc đờm đặc nhiều. Gia đình đưa vào cấp cứu trong tình trạng nói từng từ, vã mồ hôi.',
    examination: {
      vitals: {
        pulse: '120 lần/phút',
        rr: '26 lần/phút',
        bp: '150/80 mmHg',
        temp: '36.0°C',
        spo2: '81% (khí trời)',
        fio2: '21%'
      },
      findings: 'Bệnh nhân vật vã, co kéo cơ liên sườn, thở chúm môi. Lồng ngực hình thùng, rì rào phế nang giảm toàn diện.'
    },
    abg: {
      unit: 'kPa',
      pH: 7.40,
      pCO2: 4.90, // 36.0 mmHg
      pO2: 5.80,  // 44.0 mmHg
      hco3: 23.0,
      be: -1.2,
      sao2: 80.0,
      fio2: 21,
      na: 137,
      k: 4.1,
      cl: 99,
      lactate: 1.0,
      glucose: 3.8,
      patientAge: 75
    },
    questions: [
      '1. Đánh giá trao đổi khí và toan kiềm?',
      '2. Có nên cho bệnh nhân này thở oxy không, hay phải kiêng vì sợ mất Hypoxic Drive?'
    ],
    answers: {
      gasExchange: 'Suy hô hấp Type 1 mức độ trung bình-nặng (PaO2 44 mmHg / 5.8 kPa, SaO2 80%). PaCO2 hoàn toàn bình thường (36 mmHg).',
      acidBase: 'Thăng bằng toan kiềm bình thường (pH 7.40, HCO3- 23 mmol/L).',
      differentialDiagnosis: 'Đợt cấp bệnh phổi tắc nghẽn mạn tính (AECOPD) - Thể suy hô hấp giảm oxy máu đơn thuần (Type 1).',
      clinicalAction: 'CHO THỞ OXY NGAY LẬP TỨC! Mục tiêu SpO2 ban đầu 88 - 92% hoặc 94% nếu theo dõi sát. Dùng khí dung Salbutamol + Ipratropium, Corticoid toàn thân.',
      physiologicalInsight: 'Bài học đắt giá trong y khoa: Rất nhiều bác sĩ và điều dưỡng sợ thở oxy cho bệnh nhân COPD vì ám ảnh khái niệm "mất Hypoxic Drive". Tuy nhiên, bệnh nhân này có PaCO2 bình thường và HCO3 bình thường, nghĩa là KHÔNG HỀ CÓ Ứ CO2 MẠN TÍNH và không hề sống phụ thuộc hypoxic drive! PaO2 44 mmHg rơi vào đoạn dốc đứng của đường cong phân ly Hemoglobin; nếu nhịn thở oxy, bệnh nhân sẽ tử vong vì thiếu oxy não và cơ tim trước khi kịp bị ứ CO2!'
    }
  },
  {
    id: 6,
    source: 'Hennessey & Japp (Made Easy)',
    caseNumberDisplay: 'Ca 06 (Hennessey)',
    title: 'Kiệt cơ hô hấp trong đợt cấp COPD: Thở oxy không đủ!',
    patientProfile: 'Bệnh nhân ở Ca 05 sau 6 giờ điều trị, thở chậm lại còn 16 l/p nhưng lú lẫn, kiệt sức',
    categoryTag: 'Suy hô hấp Type 2',
    difficulty: 'Nâng cao',
    history: 'Bệnh nhân Ca 05 được khí dung giãn phế quản, uống prednisolone, kháng sinh và cho thở oxy 28% qua mask Venturi. Sau 6 giờ, SpO2 chỉ lên được 83%, bệnh nhân ngày càng mệt mỏi và lú lẫn.',
    examination: {
      vitals: {
        pulse: '120 lần/phút',
        rr: '16 lần/phút',
        bp: '120/80 mmHg',
        temp: '36.0°C',
        spo2: '83% (đang thở 28% O2)',
        fio2: '28%'
      },
      findings: 'Bệnh nhân kiệt sức, tri giác lơ mơ lẫn lộn. Nhịp thở giảm từ 26 xuống 16 lần/phút (dấu hiệu kiệt cơ hô hấp nguy hiểm).'
    },
    abg: {
      unit: 'kPa',
      pH: 7.29,
      pCO2: 6.90, // 52.0 mmHg
      pO2: 6.40,  // 48.0 mmHg
      hco3: 24.0,
      be: -0.9,
      sao2: 84.0,
      fio2: 28,
      na: 137,
      k: 4.0,
      cl: 99,
      lactate: 1.0,
      glucose: 4.2,
      patientAge: 75
    },
    questions: [
      '1. Mô tả sự thay đổi so với khí máu ban đầu?',
      '2. Có nên cắt oxy của bệnh nhân không?',
      '3. Biện pháp xử trí can thiệp nào là tối ưu lúc này?'
    ],
    answers: {
      gasExchange: 'Chuyển biến từ Suy hô hấp Type 1 sang Suy hô hấp Type 2 cấp tính (PaCO2 tăng từ 36 lên 52 mmHg). Thiếu oxy máu vẫn nghiêm trọng (PaO2 48 mmHg trên FiO2 28%).',
      acidBase: 'Toan hô hấp cấp chưa bù trừ (pH 7.29 toan máu, PaCO2 tăng cao, HCO3- 24 chưa kịp bù).',
      differentialDiagnosis: 'Kiệt cơ hô hấp (Respiratory Muscle Fatigue / Exhaustion) trong đợt cấp COPD kháng trị thuốc giãn phế quản.',
      clinicalAction: 'KHÔNG ĐƯỢC CẮT OXY! Bệnh nhân đang thiếu oxy máu nặng (PaO2 48 mmHg). Nguyên nhân PaCO2 tăng không phải do mất hypoxic drive mà là do các cơ hô hấp bị kiệt sức không còn sức tống khí. BẮT BUỘC KHỞI ĐỘNG THÔNG KHÍ KHÔNG XÂM NHẬP (NIV / BiPAP) ngay lập tức. Nếu thất bại với BiPAP hoặc ý thức suy giảm thêm -> Đặt Nội khí quản thở máy.',
      physiologicalInsight: 'Khi một bệnh nhân suy hô hấp đang thở 26-30 l/p đột ngột "thở chậm lại" 14-16 l/p mà SpO2 không lên, kèm lơ mơ, đó KHÔNG PHẢI là bệnh nhân đỡ khó thở, mà là cơ hoành và cơ liên sườn đã hoàn toàn kiệt sức (Exhaustion). PaCO2 sẽ ứ đọng thần tốc gây toan máu tử vong nếu không có máy thở gánh vác công thở!'
    }
  },
  {
    id: 9,
    source: 'Hennessey & Japp (Made Easy)',
    caseNumberDisplay: 'Ca 09 (Hennessey)',
    title: 'COPD đợt cấp ở người có ứ CO2 mạn: Nguy cơ Hypoxic Drive',
    patientProfile: 'Nam 68 tuổi, COPD nặng lâu năm, khó thở khi gắng sức nhẹ, môi chúm',
    categoryTag: 'Bệnh phổi mạn tính (COPD)',
    difficulty: 'Trung bình',
    history: 'Bệnh nhân 68 tuổi, tiền sử COPD nặng, đi bộ 500m là mệt, nay khó thở ngay cả khi mặc quần áo. Vào viện vì khó thở tăng trong 24 giờ qua.',
    examination: {
      vitals: {
        pulse: '96 lần/phút',
        rr: '24 lần/phút',
        bp: '138/82 mmHg',
        temp: '36.5°C',
        spo2: '78% (khí trời)',
        fio2: '21%'
      },
      findings: 'Tỉnh táo, tiếp xúc tốt, thở chúm môi, co kéo cơ hô hấp phụ nhẹ. Nghe phổi rì rào phế nang giảm, rải rác ran ngáy.'
    },
    abg: {
      unit: 'kPa',
      pH: 7.36,
      pCO2: 7.20, // 54.1 mmHg
      pO2: 5.30,  // 40.0 mmHg
      hco3: 30.6,
      be: 4.9,
      sao2: 75.2,
      fio2: 21,
      na: 144,
      k: 3.7,
      cl: 102,
      lactate: 1.2,
      glucose: 4.9,
      patientAge: 68
    },
    questions: [
      '1. Mô tả trao đổi khí và thăng bằng kiềm toan?',
      '2. Chỉ số nào đã thay đổi cấp tính trong 24h qua?',
      '3. Hai chỉ số nào cảnh báo cần hết sức thận trọng khi cho thở oxy?'
    ],
    answers: {
      gasExchange: 'Suy hô hấp Type 2 mạn tính (PaCO2 54.1 mmHg tăng mạn) có kèm giảm oxy máu mức độ nặng (PaO2 40 mmHg / 5.3 kPa).',
      acidBase: 'Toan hô hấp mạn tính bù trừ hoàn toàn (pH 7.36 nằm trong khoảng bình thường 7.35-7.40, HCO3- tăng cao 30.6 mmol/L).',
      differentialDiagnosis: 'Đợt cấp COPD trên nền suy hô hấp mạn tính tăng thán khí.',
      clinicalAction: 'Chỉ số thay đổi cấp tính trong 24h là PaO2 tụt xuống 40 mmHg (nguyên nhân gây khó thở dữ dội). Hai chỉ số cảnh báo thận trọng thở oxy là PaCO2 (7.2 kPa) và HCO3- (30.6 mmol/L) chứng minh bệnh nhân có ứ CO2 mạn tính và CÓ NGUY CƠ CAO MẤT HYPOXIC DRIVE nếu thở oxy nồng độ cao! Dùng mask Venturi 24% hoặc 28%, mục tiêu SpO2 nghiêm ngặt 88 - 92%.',
      physiologicalInsight: 'Thận cần 3-5 ngày để tích lũy HCO3- lên 30.6 mmol/L nhằm kéo pH về 7.36. Vì cơ thể đã quen sống chung với CO2 cao, trung tâm hô hấp ở hành não không còn nhạy cảm với CO2 nữa mà duy trì nhịp thở dựa vào thụ thể cảnh báo thiếu oxy tại xoang cảnh (Hypoxic Drive).'
    }
  },
  {
    id: 10,
    source: 'Hennessey & Japp (Made Easy)',
    caseNumberDisplay: 'Ca 10 (Hennessey)',
    title: 'Hậu quả cho thở Oxy 60% bừa bãi ở COPD: Mất Hypoxic Drive',
    patientProfile: 'Bệnh nhân ở Ca 09 sau khi bị cho thở mask Oxy 60%, 1 giờ sau li bì lơ mơ',
    categoryTag: 'Bệnh phổi mạn tính (COPD)',
    difficulty: 'Cấp cứu',
    history: 'Bệnh nhân Ca 09 được chuyển lên khoa, điều dưỡng thấy SpO2 thấp nên cho thở mask oxy 60%. Sau 1 giờ, SpO2 tăng lên 96% nhưng bệnh nhân trở nên lơ mơ, lay gọi khó thức, không thể tiếp xúc được.',
    examination: {
      vitals: {
        pulse: '88 lần/phút',
        rr: '14 lần/phút (thở rất yếu)',
        bp: '132/80 mmHg',
        temp: '36.5°C',
        spo2: '96% (đang thở 60% O2)',
        fio2: '60%'
      },
      findings: 'Hôn mê nông, tay có dấu hiệu run vỗ (Asterixis / Flapping tremor), mạch nảy mạnh, da ấm vã mồ hôi.'
    },
    abg: {
      unit: 'kPa',
      pH: 7.29,
      pCO2: 8.70, // 65.3 mmHg
      pO2: 11.2,  // 84.0 mmHg
      hco3: 30.3,
      be: 4.7,
      sao2: 96.2,
      fio2: 60,
      na: 144,
      k: 3.6,
      cl: 102,
      lactate: 1.2,
      glucose: 5.0,
      patientAge: 68
    },
    questions: [
      '1. Mô tả trao đổi khí và thăng bằng kiềm toan hiện tại?',
      '2. Nguyên nhân nào gây ra sự suy sụp tri giác đột ngột của bệnh nhân?'
    ],
    answers: {
      gasExchange: 'Suy hô hấp Type 2 đợt cấp trên nền mạn tính (Acute-on-chronic Type 2 respiratory impairment).',
      acidBase: 'Toan hô hấp mất bù (bán phần): pH tụt từ 7.36 xuống 7.29, PaCO2 vọt từ 54 lên 65.3 mmHg (8.7 kPa).',
      differentialDiagnosis: 'Ngộ độc oxy gây ức chế thông khí do xóa bỏ Hypoxic Drive (CO2 Narcosis / Hypercapnic Encephalopathy).',
      clinicalAction: '1. Giảm ngay nồng độ oxy xuống Venturi 28% (mục tiêu SpO2 88-92%). 2. KHÔNG ĐƯỢC ngắt oxy hoàn toàn vì bệnh nhân sẽ tụt PaO2 chết não. 3. Đặt ngay máy thở không xâm nhập BiPAP để cưỡng bức đào thải CO2. 4. Cân nhắc dùng thuốc kích thích hô hấp (Doxapram) nếu chưa có máy thở. Sẵn sàng đặt nội khí quản nếu toan máu tiếp tục xấu đi.',
      physiologicalInsight: 'Thở oxy 60% làm PaO2 vọt lên 84 mmHg, làm tắt hoàn toàn kích thích thở ở thụ thể ngoại biên. Bệnh nhân thở chậm lại, CO2 không thoát được tích tụ dữ dội tạo thành H2CO3 làm toan máu và ngộ độc não CO2.'
    }
  },
  {
    id: 11,
    source: 'Hennessey & Japp (Made Easy)',
    caseNumberDisplay: 'Ca 11 (Hennessey)',
    title: 'Cơn hen ác tính đe dọa tính mạng: Bẫy PaCO2 bình thường',
    patientProfile: 'Nữ 21 tuổi, hen phế quản nặng, nói từng từ, co kéo toàn bộ cơ cổ và ngực',
    categoryTag: 'Cấp cứu đường thở',
    difficulty: 'Cấp cứu',
    history: 'Nữ 21 tuổi, tiền sử hen nặng từng 2 lần vào ICU. 6 giờ nay lên cơn khó thở dữ dội, xịt Salbutamol không đỡ. Vào viện thở 30 l/p, chỉ nói được từng từ cụt ngủn.',
    examination: {
      vitals: {
        pulse: '115 lần/phút',
        rr: '30 lần/phút',
        bp: '120/80 mmHg',
        temp: '37.0°C',
        spo2: '96% (khí trời)',
        fio2: '21%'
      },
      findings: 'Co kéo cơ ức đòn chũm và cơ liên sườn dữ dội. Nghe phổi ran rít ran ngáy lan tỏa khắp 2 phế trường. PEF đo được 160 L/phút (dự đoán 400 L/phút).'
    },
    abg: {
      unit: 'kPa',
      pH: 7.38,
      pCO2: 5.80, // 43.5 mmHg
      pO2: 10.2,  // 76.5 mmHg
      hco3: 24.0,
      be: -1.3,
      sao2: 96.0,
      fio2: 21,
      na: 140,
      k: 4.0,
      cl: 99,
      lactate: 1.0,
      glucose: 5.0,
      patientAge: 21
    },
    questions: [
      '1. Mô tả trao đổi khí và thăng bằng kiềm toan?',
      '2. Chỉ số nào trên khí máu là đáng lo ngại nhất và tại sao?',
      '3. Phân loại mức độ nặng của cơn hen này?'
    ],
    answers: {
      gasExchange: 'Suy hô hấp Type 1 mức độ nhẹ. PaO2 76.5 mmHg (ở người 21 tuổi bình thường phải > 95 mmHg).',
      acidBase: 'pH và HCO3- bình thường.',
      differentialDiagnosis: 'Cơn hen phế quản nặng đe dọa tính mạng (Life-threatening Asthma Attack).',
      clinicalAction: 'CHỈ SỐ ĐÁNG SỢ NHẤT LÀ PaCO2 = 43.5 mmHg (5.8 kPa)! Ở một người trẻ đang thở 30 lần/phút với công thở cực lớn, PaCO2 ĐÁNG LẼ PHẢI RẤT THẤP (< 30 mmHg do tăng thông khí). PaCO2 ở mức bình thường cao chứng tỏ tắc nghẽn đường thở cực kỳ trầm trọng và bệnh nhân BẮT ĐẦU KIỆT CƠ! Báo động ICU ngay lập tức, khí dung liên tục Salbutamol + Ipratropium, tiêm Hydrocortisone IV, Magnesium sulfate 2g IV truyền 20 phút, chuẩn bị sẵn sàng đặt ống nội khí quản.',
      physiologicalInsight: 'Trong cơn hen, "PaCO2 bình thường" là một dấu hiệu báo tử! Nó cho thấy bệnh nhân không còn đủ sức duy trì thể tích phút để thải CO2, vài phút sau PaCO2 sẽ vọt lên và bệnh nhân sẽ ngừng thở do kiệt cơ hoành.'
    }
  },
  {
    id: 12,
    source: 'Hennessey & Japp (Made Easy)',
    caseNumberDisplay: 'Ca 12 (Hennessey)',
    title: 'Hội chứng tăng thông khí do lo âu (Psychogenic Hyperventilation)',
    patientProfile: 'Nữ 23 tuổi, té ngã đau cổ chân, hoảng sợ khóc lóc, tê quanh miệng và co quắp bàn tay',
    categoryTag: 'Tăng thông khí / Thần kinh',
    difficulty: 'Cơ bản',
    history: 'Nữ 23 tuổi bị trẹo chân nhẹ, chụp X-quang bình thường nhưng bệnh nhân không tin, kích động khóc lóc. Đột ngột thấy nghẹn thở, tức ngực, tê bì quanh miệng và ngón tay co cứng như bàn tay người đỡ đẻ (dấu Trousseau).',
    examination: {
      vitals: {
        pulse: '96 lần/phút',
        rr: '36 lần/phút',
        bp: '130/80 mmHg',
        temp: '36.8°C',
        spo2: '100% (khí trời)',
        fio2: '21%'
      },
      findings: 'Thở rất nhanh nông 36 lần/phút. Tim phổi nghe trong, ECG nhịp xoang bình thường, PEF bình thường.'
    },
    abg: {
      unit: 'kPa',
      pH: 7.53,
      pCO2: 3.14, // 24.0 mmHg
      pO2: 14.3,  // 108.0 mmHg
      hco3: 24.0,
      be: -1.8,
      sao2: 99.0,
      fio2: 21,
      na: 140,
      k: 3.5,
      cl: 99,
      lactate: 1.0,
      glucose: 5.0,
      patientAge: 23
    },
    questions: [
      '1. Mô tả trao đổi khí và thăng bằng kiềm toan?',
      '2. Bất thường xét nghiệm nào giải thích triệu chứng tê môi và co quắp ngón tay?',
      '3. Chẩn đoán và cách xử trí?'
    ],
    answers: {
      gasExchange: 'Tăng thông khí phế nang nguyên phát (Primary Hyperventilation). PaO2 tăng cao (108 mmHg), PaCO2 tụt sâu (24 mmHg).',
      acidBase: 'Kiềm hô hấp cấp chưa bù trừ (Uncompensated Respiratory Alkalosis, pH 7.53).',
      differentialDiagnosis: 'Hội chứng tăng thông khí do căn nguyên tâm lý (Psychogenic Hyperventilation Syndrome / Panic attack).',
      clinicalAction: 'Triệu chứng tê bì co quắp ngọn chi là do HẠ CALCI ION HÓA MÁU (iCa2+ tụt xuống 0.9 mmol/L). Khi máu bị kiềm, ion H+ rời khỏi albumin tạo thêm vị trí gắn cho Ca2+, làm giảm nồng độ calci ion tự do trong máu. Xử trí: Trấn an tâm lý, hướng dẫn hít thở chậm lại, cho thở lại vào túi giấy để hít lại CO2 tự thân (chỉ làm khi đã chắc chắn loại trừ bệnh lý tim phổi nguy hiểm). Không cần tiêm calci.',
      physiologicalInsight: 'Hiện tượng rửa trôi CO2 làm kiềm máu cấp tính gây co mạch máu não (dẫn tới hoa mắt, chóng mặt) và hạ Calci ion hóa gây kích thích thần kinh cơ (tê môi, dấu Chvostek và Trousseau).'
    }
  },
  {
    id: 13,
    source: 'Hennessey & Japp (Made Easy)',
    caseNumberDisplay: 'Ca 13 (Hennessey)',
    title: 'Ngộ độc khí CO (Carbon Monoxide): Cạm bẫy SpO2 99%',
    patientProfile: 'Nam 40 tuổi, được lính cứu hỏa cứu khỏi đám cháy nhà kín, hít khói 20 phút',
    categoryTag: 'Ngộ độc / Cấp cứu',
    difficulty: 'Nâng cao',
    history: 'Nam 40 tuổi mắc kẹt trong phòng kín đầy khói đen 20 phút. Vào cấp cứu người đầy bồ hóng, nôn ói, đau đầu dữ dội, lú lẫn tri giác.',
    examination: {
      vitals: {
        pulse: '98 lần/phút',
        rr: '18 lần/phút',
        bp: '125/80 mmHg',
        temp: '37.0°C',
        spo2: '99% (thở oxy mask 15L)',
        fio2: '80%'
      },
      findings: 'Ý thức lú lẫn, niêm mạc có thể đỏ như quả anh đào (cherry-red). Không bỏng da diện rộng.'
    },
    abg: {
      unit: 'kPa',
      pH: 7.36,
      pCO2: 4.50, // 34.0 mmHg
      pO2: 47.0,  // 353.0 mmHg
      hco3: 18.0,
      be: -5.5,
      sao2: 100.0,
      fio2: 80,
      na: 145,
      k: 3.6,
      cl: 103,
      lactate: 2.0,
      glucose: 4.0,
      patientAge: 40,
      coHb: 40
    },
    questions: [
      '1. Mô tả trao đổi khí và thăng bằng toan kiềm?',
      '2. Chẩn đoán xác định?',
      '3. Chỉ số nào trên kết quả khí máu là SAI LỆCH GIẢ TẠO (Falsely High)?'
    ],
    answers: {
      gasExchange: 'Phổi trao đổi khí bình thường đối với khí thở vào (PaO2 rất cao 353 mmHg trên FiO2 80%), nhưng mô thực tế bị thiếu oxy cực độ!',
      acidBase: 'Toan chuyển hóa bù trừ hoàn toàn (pH 7.36, HCO3- giảm 18 mmol/L, PaCO2 giảm nhẹ 34 mmHg bù trừ) do toan lactic tế bào.',
      differentialDiagnosis: 'Ngộ độc cấp khí Carbon Monoxide (CO Poisoning) - Carboxyhaemoglobin (COHb) 40%.',
      clinicalAction: 'CHỈ SỐ SaO2 VÀ SpO2 LÀ SAI LỆCH GIẢ TẠO! Máy đo SpO2 kẹp ngón tay và thuật toán tính SaO2 trên máy khí máu thông thường không phân biệt được Oxyhaemoglobin và Carboxyhaemoglobin (chúng hấp thụ bước sóng gần tương đương), nên báo 99-100% ảo. Trên thực tế, 40% Hb đã bị CO chiếm giữ, oxy không thể gắn kết và giải phóng cho mô. Xử trí: Thở Oxy 100% qua mask có túi dự trữ không thở lại (giảm thời gian bán hủy COHb từ 320 phút xuống 80 phút). Chuyển điều trị OXY CAO ÁP (HBOT) nếu COHb > 25%, phụ nữ mang thai hoặc có rối loạn ý thức.',
      physiologicalInsight: 'CO có ái lực với Hemoglobin gấp 200 lần Oxy. PaO2 chỉ đo lượng oxy hòa tan tự do trong huyết tương (chỉ chiếm 1-2% tổng lượng oxy máu), trong khi 98-99% oxy phải gắn với Hb. Bệnh nhân có PaO2 353 mmHg nhưng các tế bào vẫn chết ngạt vì thiếu oxy!'
    }
  },
  {
    id: 14,
    source: 'Hennessey & Japp (Made Easy)',
    caseNumberDisplay: 'Ca 14 (Hennessey)',
    title: 'Phù phổi cấp do suy tim trái: Toan hỗn hợp nguy kịch',
    patientProfile: 'Nam 68 tuổi, nhồi máu cơ tim cũ 4 tuần, thức giấc nửa đêm vì nghẹt thở dữ dội',
    categoryTag: 'Cấp cứu tim mạch',
    difficulty: 'Cấp cứu',
    history: 'Cụ ông 68 tuổi, tiền sử NMCT diện rộng 4 tuần trước. Nửa đêm thức giấc vì khó thở dữ dội, không nằm được, phù 2 chân tăng dần.',
    examination: {
      vitals: {
        pulse: '128 lần/phút',
        rr: '40 lần/phút',
        bp: '144/70 mmHg',
        temp: '36.6°C',
        spo2: '91% (thở mask túi 15L)',
        fio2: '80%'
      },
      findings: 'Vã mồ hôi, tím tái, co kéo toàn bộ cơ hô hấp. Tĩnh mạch cổ nổi đến góc hàm, phù 2 chân đến gối. Nghe phổi ran ẩm dâng lên như thủy triều lan đến 2/3 phế trường.'
    },
    abg: {
      unit: 'kPa',
      pH: 7.21,
      pCO2: 6.12, // 46.0 mmHg
      pO2: 9.30,  // 70.0 mmHg
      hco3: 17.2,
      be: -5.9,
      sao2: 93.0,
      fio2: 80,
      na: 141,
      k: 3.7,
      cl: 100,
      lactate: 4.9,
      glucose: 8.5,
      patientAge: 68
    },
    questions: [
      '1. Mô tả trao đổi khí và thăng bằng kiềm toan?',
      '2. Chẩn đoán bệnh lý?',
      '3. Nguyên nhân gây ra toan chuyển hóa ở bệnh nhân này?'
    ],
    answers: {
      gasExchange: 'Suy hô hấp Type 2 kết hợp suy giảm oxy máu cực nặng (PaO2 chỉ đạt 70 mmHg dù đang thở oxy mask túi 15L, tương đương P/F < 90). PaCO2 bắt đầu tăng lên 46 mmHg.',
      acidBase: 'TOAN HỖN HỢP NGUY KỊCH (Mixed Respiratory and Metabolic Acidosis). pH 7.21 tụt sâu, cả PaCO2 tăng và HCO3- giảm (17.2 mmol/L).',
      differentialDiagnosis: 'Phù phổi cấp huyết động (Acute Cardiogenic Pulmonary Oedema) do suy thất trái cấp mất bù.',
      clinicalAction: 'Toan chuyển hóa là do TOAN LACTIC NẶNG (Lactate 4.9 mmol/L) sinh ra từ 3 cơ chế: 1. Thiếu oxy mô toàn thân; 2. Cung lượng tim tụt giảm gây giảm tưới máu tạng; 3. Các cơ hô hấp phải làm việc cật lực tạo ra acid lactic. Xử trí: Lợi tiểu Furosemide tĩnh mạch, truyền dãn mạch Nitroglycerin/Isoket nếu huyết áp cho phép, thở máy không xâm nhập CPAP/BiPAP áp lực cao ngay để tống dịch ra khỏi phế nang.',
      physiologicalInsight: 'Phù phổi cấp thông thường giai đoạn đầu là Suy hô hấp Type 1 kèm kiềm hô hấp do thở nhanh. Khi PaCO2 tăng lên kèm toan lactic, đó là lúc bệnh nhân đã bước vào giai đoạn kiệt sức (Exhaustion), cận kề ngừng thở nếu không can thiệp máy thở!'
    }
  },
  {
    id: 16,
    source: 'Hennessey & Japp (Made Easy)',
    caseNumberDisplay: 'Ca 16 (Hennessey)',
    title: 'Thiếu máu nặng: Thở oxy không giải quyết được vấn đề!',
    patientProfile: 'Nữ 79 tuổi, khó thở nhiều, mệt lả, tiền sử u đại tràng chảy máu rỉ rả 6 tháng',
    categoryTag: 'Huyết học / Khí máu',
    difficulty: 'Trung bình',
    history: 'Cụ bà 79 tuổi nhập viện chờ mổ cắt u đại tràng. Bà than phiền khó thở dữ dội, mệt mỏi kiệt sức dù lượng máu mất qua phân những ngày gần đây không tăng.',
    examination: {
      vitals: {
        pulse: '100 lần/phút',
        rr: '24 lần/phút',
        bp: '100/80 mmHg',
        temp: '36.5°C',
        spo2: '100% (khí trời)',
        fio2: '21%'
      },
      findings: 'Da niêm mạc nhợt nhạt như sáp, lòng bàn tay trắng bệch. Tim nhanh, phổi hoàn toàn trong trẻo không ran.'
    },
    abg: {
      unit: 'kPa',
      pH: 7.49,
      pCO2: 3.31, // 25.0 mmHg
      pO2: 11.9,  // 89.0 mmHg
      hco3: 22.0,
      be: -2.0,
      sao2: 99.8,
      fio2: 21,
      na: 138,
      k: 3.8,
      cl: 96,
      lactate: 1.0,
      glucose: 3.9,
      patientAge: 79
    },
    questions: [
      '1. Mô tả trao đổi khí và thăng bằng toan kiềm?',
      '2. Nguyên nhân thực sự gây khó thở ở bệnh nhân này là gì?',
      '3. Phương pháp nào hiệu quả nhất để cải thiện lượng oxy cung cấp cho mô?'
    ],
    answers: {
      gasExchange: 'Trao đổi khí tại màng phế nang mao mạch hoàn toàn bình thường (PaO2 89 mmHg, SaO2 99.8%). Có tăng thông khí phế nang (PaCO2 25 mmHg).',
      acidBase: 'Kiềm hô hấp cấp tính chưa bù trừ do thở nhanh phản xạ.',
      differentialDiagnosis: 'Thiếu máu thiếu sắt nặng (Severe Anemia) với Hb = 6.8 g/dL.',
      clinicalAction: 'TRUYỀN KHỐI HỒNG CẦU CẤP CỨU! Cho thở thêm oxy hầu như không có tác dụng, vì lượng Hemoglobin còn lại đã bão hòa 100% oxy (SaO2 99.8%), không thể mang thêm phân tử oxy nào nữa. Công thức tính lượng oxy trong máu (CaO2) = (1.34 x Hb x SaO2) + (0.003 x PaO2). Khi Hb giảm một nửa, khả năng vận chuyển oxy giảm một nửa! Bù dịch cầm chừng và truyền máu.',
      physiologicalInsight: 'Một bài học lâm sàng cơ bản: Khí máu PaO2 và SaO2 bình thường KHÔNG CÓ NGHĨA là oxy mô bình thường. Nếu thiếu người vận chuyển (Hemoglobin), mô vẫn bị ngạt oxy.'
    }
  },
  {
    id: 17,
    source: 'Hennessey & Japp (Made Easy)',
    caseNumberDisplay: 'Ca 17 (Hennessey)',
    title: 'Nhồi máu mạc treo: Toan Lactic ẩn mình sau đau bụng',
    patientProfile: 'Nữ 78 tuổi, rung nhĩ uống digoxin/aspirin, đau bụng dữ dội từng cơn nhưng khám bụng mềm',
    categoryTag: 'Cấp cứu bụng ngoại khoa',
    difficulty: 'Nâng cao',
    history: 'Cụ bà 78 tuổi, tiền sử rung nhĩ, đột ngột đau bụng dữ dội quanh rốn không lan, không nôn, không tiêu chảy. Đau quằn quại nhưng khám bụng lại mềm mại, chỉ tức nhẹ khi ấn sâu.',
    examination: {
      vitals: {
        pulse: '110 lần/phút (loạn nhịp hoàn toàn)',
        rr: '24 lần/phút',
        bp: '135/75 mmHg',
        temp: '37.1°C',
        spo2: '99% (đang thở oxy mask 10L)',
        fio2: '40%'
      },
      findings: 'Bệnh nhân đau đớn dữ dội, kêu la không tương xứng với khám bụng (bụng mềm, không phản ứng thành bụng, X-quang bụng không liềm hơi).'
    },
    abg: {
      unit: 'kPa',
      pH: 7.28,
      pCO2: 4.39, // 33.0 mmHg
      pO2: 28.6,  // 215.0 mmHg
      hco3: 16.2,
      be: -10.4,
      sao2: 99.8,
      fio2: 40,
      na: 135,
      k: 4.6,
      cl: 96,
      lactate: 3.2,
      glucose: 3.8,
      patientAge: 78
    },
    questions: [
      '1. Mô tả trao đổi khí và thăng bằng toan kiềm?',
      '2. Chẩn đoán cấp cứu ngoại khoa nguy hiểm cần nghĩ tới ngay?',
      '3. Nguồn gốc sinh ra acid lactic ở ca bệnh này là từ đâu?'
    ],
    answers: {
      gasExchange: 'Oxy hóa máu tốt trên FiO2 40% (PaO2 215 mmHg). Tăng thông khí thứ phát (PaCO2 33 mmHg) để bù trừ toan máu.',
      acidBase: 'Toan chuyển hóa tăng Anion Gap bù trừ bán phần (pH 7.28, HCO3- 16.2 mmol/L, BE -10.4 mmol/L). Anion Gap = 135 - (96 + 16.2) = 22.8 mmol/L.',
      differentialDiagnosis: 'Thiếu máu cục bộ mạc treo cấp / Nhồi máu mạc treo (Acute Mesenteric Ischaemia) do huyết khối từ tâm nhĩ bắn đi.',
      clinicalAction: 'Nguồn acid lactic (3.2 mmol/L) chính là QUAI RUỘT ĐANG BỊ THIẾU MÁU HOẠI TỬ! Dấu hiệu kinh điển: "Đau bụng dữ dội không tương xứng với triệu chứng thực thể" kèm toan Lactic máu ở bệnh nhân rung nhĩ = Nhồi máu mạc treo cho tới khi có bằng chứng ngược lại. Xử trí: Chụp CT mạch máu ổ bụng (CTA bụng) khẩn cấp và hội chẩn phẫu thuật ngoại khoa mở bụng cấp cứu hoặc can thiệp lấy huyết khối.',
      physiologicalInsight: 'Nếu chỉ đợi đến khi bụng có phản ứng thành bụng gồng cứng, ruột đã hoại tử thủng hoàn toàn và tỷ lệ tử vong > 80%. Khí máu với toan lactic là manh mối sớm duy nhất cứu sống bệnh nhân!'
    }
  },
  {
    id: 18,
    source: 'Hennessey & Japp (Made Easy)',
    caseNumberDisplay: 'Ca 18 (Hennessey)',
    title: 'Nhiễm toan Ceton đái tháo đường (DKA) nặng',
    patientProfile: 'Nữ 35 tuổi, ĐTĐ Type 1, nôn ói bỏ tiêm insulin 3 ngày, thở Kussmaul sâu ngắt quãng',
    categoryTag: 'Cấp cứu nội tiết / Toan chuyển hóa',
    difficulty: 'Cấp cứu',
    history: 'Nữ 35 tuổi, tiền sử đái tháo đường Type 1. Ba ngày nay bị sốt nôn ói ăn uống kém, sợ hạ đường huyết nên tự ý ngưng chích insulin. Người nhà phát hiện lơ mơ, miệng sực mùi táo chín (mùi acetone).',
    examination: {
      vitals: {
        pulse: '130 lần/phút',
        rr: '26 lần/phút (thở sâu Kussmaul)',
        bp: '100/60 mmHg',
        temp: '36.8°C',
        spo2: '99% (thở oxy mask 10L)',
        fio2: '60%'
      },
      findings: 'Tri giác lơ mơ (GCS 12 điểm), mắt trũng, niêm mạc miệng khô khốc, véo da mất rất chậm. Thở nhanh sâu kiểu Kussmaul.'
    },
    abg: {
      unit: 'kPa',
      pH: 7.05,
      pCO2: 1.50, // 11.0 mmHg
      pO2: 28.4,  // 187.0 mmHg
      hco3: 6.0,
      be: -25.2,
      sao2: 99.8,
      fio2: 60,
      na: 141,
      k: 4.6,
      cl: 96,
      lactate: 1.0,
      glucose: 35.0, // mmol/L (~630 mg/dL)
      patientAge: 35
    },
    questions: [
      '1. Mô tả trao đổi khí và thăng bằng toan kiềm?',
      '2. Tính khoảng trống Anion (Anion Gap)?',
      '3. Chẩn đoán xác định và các trụ cột điều trị hồi sức cấp cứu?'
    ],
    answers: {
      gasExchange: 'Tăng thông khí phế nang thứ phát tối đa (PaCO2 tụt xuống mức kỷ lục 11 mmHg / 1.5 kPa). Oxy hóa máu được bảo tồn.',
      acidBase: 'Toan chuyển hóa tăng khoảng trống Anion cực kỳ nặng, bù trừ hô hấp bán phần (pH 7.05 toan máu đe dọa ngừng tim, HCO3- 6.0 mmol/L, BE -25.2 mmol/L). Anion Gap = (141 + 4.6) - (96 + 6.0) = 43.6 mmol/L (chuẩn 10-18)!',
      differentialDiagnosis: 'Nhiễm toan Ceton do Đái tháo đường mức độ nặng (Severe Diabetic Ketoacidosis - DKA). Tam chứng: Đường huyết cao (35 mmol/L), Toan chuyển hóa (pH < 7.3, HCO3 < 15), Ceton máu/nước tiểu dương tính.',
      clinicalAction: 'Trụ cột hồi sức DKA: 1. Bù dịch tích cực (NaCl 0.9% 1000ml trong giờ đầu, bù 4-6 lít trong 24h); 2. Truyền Insulin tĩnh mạch liên tục liều 0.1 UI/kg/giờ (chỉ bắt đầu khi K+ > 3.3 mmol/L); 3. Theo dõi sát và bù Kali liên tục (khi truyền insulin, K+ sẽ di chuyển ào ạt vào nội bào gây hạ kali tử vong); 4. Cân nhắc truyền Bicarbonate đẳng trương 1.4% thận trọng vì pH < 6.9-7.1; 5. Khi đường huyết hạ xuống < 14 mmol/L, đổi dịch truyền sang Glucose 5% + NaCl 0.45% để tránh hạ đường huyết trong khi tiếp tục truyền insulin dập tắt ceton.',
      physiologicalInsight: 'Bệnh nhân đang thở Kussmaul cật lực đẩy PaCO2 xuống tận 11 mmHg (bù trừ hô hấp gần như tối đa), nhưng lượng thể ceton (Acetoacetate, Beta-hydroxybutyrate) quá khổng lồ đã đè bẹp hoàn toàn hệ đệm khiến pH tụt xuống 7.05. Nếu bệnh nhân mệt mỏi giảm thở, pH sẽ rơi xuống < 6.8 gây ngừng tim ngay tức khắc.'
    }
  },
  {
    id: 20,
    source: 'Hennessey & Japp (Made Easy)',
    caseNumberDisplay: 'Ca 20 (Hennessey)',
    title: 'Toan hóa ống thận Type 1 (RTA 1): Toan chuyển hóa khoảng trống Anion bình thường',
    patientProfile: 'Nam 52 tuổi, tiền sử sỏi thận cản quang tái phát nhiều đợt, mệt mỏi uể oải',
    categoryTag: 'Bệnh thận / Toan chuyển hóa',
    difficulty: 'Trung bình',
    history: 'Nam 52 tuổi, khám tại khoa niệu vì sỏi thận canxi tái phát nhiều lần. Thường xuyên mệt mỏi, yếu cơ chi dưới. Không tiêu chảy, không dùng thuốc lợi tiểu.',
    examination: {
      vitals: {
        pulse: '74 lần/phút',
        rr: '16 lần/phút',
        bp: '120/75 mmHg',
        temp: '36.7°C',
        spo2: '99% (khí trời)',
        fio2: '21%'
      },
      findings: 'Toàn trạng bình thường, không phù, khám bụng không có điểm đau niệu quản.'
    },
    abg: {
      unit: 'kPa',
      pH: 7.37,
      pCO2: 4.20, // 31.5 mmHg
      pO2: 13.2,  // 99.0 mmHg
      hco3: 18.0,
      be: -7.0,
      sao2: 99.0,
      fio2: 21,
      na: 137,
      k: 3.0,     // Hạ kali máu
      cl: 109,    // Tăng clo máu
      lactate: 1.0,
      glucose: 4.0,
      patientAge: 52
    },
    questions: [
      '1. Mô tả trao đổi khí và thăng bằng toan kiềm?',
      '2. Tính khoảng trống Anion (Anion Gap)?',
      '3. Chẩn đoán nguyên nhân phù hợp nhất?'
    ],
    answers: {
      gasExchange: 'Trao đổi khí bình thường. Tăng thông khí nhẹ (PaCO2 31.5 mmHg) bù trừ cho toan.',
      acidBase: 'Toan chuyển hóa khoảng trống Anion BÌNH THƯỜNG bù trừ hoàn toàn (pH 7.37, HCO3- 18.0 mmol/L). Anion Gap = (137 + 3.0) - (109 + 18.0) = 13.0 mmol/L (nằm trọn trong giới hạn bình thường 10-18 mmol/L)!',
      differentialDiagnosis: 'Toan hóa ống thận xa Type 1 (Distal Renal Tubular Acidosis - Type 1 RTA). Đặc trưng bởi: Toan chuyển hóa tăng Clo máu (Hyperchloraemic Metabolic Acidosis), hạ Kali máu (K 3.0 mmol/L) và sỏi thận Calci phosphate.',
      clinicalAction: 'Bổ sung Bicarbonate hoặc Citrate đường uống (Shohl solution), kết hợp bù Kali (Potassium citrate). Kiềm hóa nước tiểu giúp hòa tan calci và bảo tồn chức năng thận.',
      physiologicalInsight: 'Trong Type 1 RTA, ống lượn xa không thể bài tiết ion H+ vào nước tiểu. Để tái hấp thu Na+, thận buộc phải bài tiết K+ (dẫn đến hạ Kali) và giữ lại Cl- (dẫn đến tăng Clo máu để bảo toàn tính trung hòa điện tích). Vì Cl- là anion được đo trực tiếp trong công thức, Anion Gap hoàn toàn không tăng!'
    }
  },
  {
    id: 21,
    source: 'Hennessey & Japp (Made Easy)',
    caseNumberDisplay: 'Ca 21 (Hennessey)',
    title: 'Ngộ độc Aspirin (Salicylate): Rối loạn hỗn hợp kinh điển',
    patientProfile: 'Nữ 18 tuổi, uống quá liều thuốc giảm đau 5 giờ trước, ù tai, buồn nôn, thở nhanh sâu',
    categoryTag: 'Ngộ độc / Cấp cứu',
    difficulty: 'Nâng cao',
    history: 'Thiếu nữ 18 tuổi uống một lượng lớn thuốc không rõ loại cách 5 giờ. Vào viện than buồn nôn và nghe thấy tiếng ve kêu ríu rít trong tai (ù tai - tinnitus), lơ mơ nhẹ.',
    examination: {
      vitals: {
        pulse: '100 lần/phút',
        rr: '26 lần/phút (thở nhanh sâu)',
        bp: '132/100 mmHg',
        temp: '37.6°C',
        spo2: '99% (khí trời)',
        fio2: '21%'
      },
      findings: 'Bệnh nhân bứt rứt, thở nhanh sâu. Khám tim phổi bình thường.'
    },
    abg: {
      unit: 'kPa',
      pH: 7.41,
      pCO2: 3.01, // 22.6 mmHg
      pO2: 14.1,  // 97.5 mmHg
      hco3: 17.6,
      be: -8.3,
      sao2: 99.0,
      fio2: 21,
      na: 140,
      k: 3.6,
      cl: 99,
      lactate: 1.4,
      glucose: 5.0,
      patientAge: 18
    },
    questions: [
      '1. Nhìn vào pH 7.41 bình thường, bệnh nhân có rối loạn kiềm toan không?',
      '2. Tính khoảng trống Anion?',
      '3. Hoạt chất gây ngộ độc nhiều khả năng nhất và cơ chế sinh lý bệnh?'
    ],
    answers: {
      gasExchange: 'Tăng thông khí phế nang rõ rệt (PaCO2 22.6 mmHg). Oxy hóa máu bình thường.',
      acidBase: 'RỐI LOẠN TOAN KIỀM HỖN HỢP: Kiềm hô hấp tiên phát PHỐI HỢP Toan chuyển hóa tăng Anion Gap tiên phát (Mixed Respiratory Alkalosis and High Anion Gap Metabolic Acidosis). pH 7.41 là do hai rối loạn đối kháng nhau cùng lúc!',
      differentialDiagnosis: 'Ngộ độc cấp Salicylate / Aspirin (Aspirin Poisoning). Anion Gap = (140 + 3.6) - (99 + 17.6) = 27 mmol/L (tăng cao).',
      clinicalAction: 'Định lượng nồng độ Salicylate máu khẩn cấp. Phác đồ xử trí: 1. Kiềm hóa nước tiểu bằng Natri Bicarbonate 8.4% truyền tĩnh mạch mục tiêu pH nước tiểu 7.5 - 8.5 (giúp ion hóa salicylate ngăn tái hấp thu ở ống thận và tăng bài tiết); 2. Bù dịch và theo dõi sát Kali; 3. Chỉ định lọc máu thận nhân tạo ngắt quãng (HD) nếu nồng độ salicylate > 100 mg/dL hoặc toan máu nặng trơ, suy thận, phù phổi.',
      physiologicalInsight: 'Aspirin tác động qua 2 cơ chế độc lập: Một mặt, Salicylate kích thích trực tiếp trung tâm hô hấp ở hành tủy gây thở nhanh sâu dẫn đến Kiềm hô hấp nguyên phát. Mặt khác, bản thân Salicylate là acid hữu cơ, đồng thời ức chế chuỗi hô hấp tế bào (uncoupling oxidative phosphorylation) làm tích tụ acid lactic và acid hữu cơ gây Toan chuyển hóa tăng Anion Gap nguyên phát!'
    }
  },
  {
    id: 22,
    source: 'Hennessey & Japp (Made Easy)',
    caseNumberDisplay: 'Ca 22 (Hennessey)',
    title: 'Sốc nhiễm khuẩn đường niệu: Lactate là chỉ số sống còn',
    patientProfile: 'Nữ 64 tuổi, sốt 39.8°C, mạch 122 sau thủ thuật can thiệp đường tiết niệu 48h',
    categoryTag: 'Sốc / Nhiễm trùng huyết',
    difficulty: 'Cấp cứu',
    history: 'Nữ 64 tuổi, sau tán sỏi nội soi 48 giờ xuất hiện rét run, sốt cao 39.8°C, tụt huyết áp dần, nước tiểu ít trong 4 giờ qua.',
    examination: {
      vitals: {
        pulse: '122 lần/phút (nhanh xoang)',
        rr: '26 lần/phút',
        bp: '100/65 mmHg',
        temp: '39.8°C',
        spo2: '100% (thở oxy mask 10L)',
        fio2: '60%'
      },
      findings: 'Da đỏ nóng vã mồ hôi, thời gian đổ đầy mao mạch (CRT) kéo dài > 3 giây. C-reactive protein vọt lên 267 mg/L.'
    },
    abg: {
      unit: 'kPa',
      pH: 7.36,
      pCO2: 4.20, // 31.5 mmHg
      pO2: 27.1,  // 203.0 mmHg
      hco3: 17.3,
      be: -6.9,
      sao2: 100.0,
      fio2: 60,
      na: 140,
      k: 4.1,
      cl: 101,
      lactate: 5.1, // Toan lactic nặng!
      glucose: 6.8,
      patientAge: 64
    },
    questions: [
      '1. Mô tả trao đổi khí và thăng bằng kiềm toan?',
      '2. Giá trị nào trên khí máu mang ý nghĩa tiên lượng sống còn quan trọng nhất?',
      '3. Phác đồ xử trí khẩn cấp giờ đầu (Surviving Sepsis Campaign bundle)?'
    ],
    answers: {
      gasExchange: 'Tăng thông khí thứ phát bù trừ toan (PaCO2 31.5 mmHg). Oxy hóa máu đạt được nhờ mask oxy 10L.',
      acidBase: 'Toan chuyển hóa tăng Anion Gap có bù trừ hô hấp hoàn toàn (pH 7.36, HCO3- 17.3 mmol/L). Anion Gap = (140 + 4.1) - (101 + 17.3) = 25.8 mmol/L.',
      differentialDiagnosis: 'Nhiễm khuẩn huyết / Sốc nhiễm khuẩn đường vào từ hệ tiết niệu (Urosepsis).',
      clinicalAction: 'CHỈ SỐ TIÊN LƯỢNG QUAN TRỌNG NHẤT LÀ LACTATE = 5.1 mmol/L! Dù huyết áp tâm thu còn 100 mmHg chưa tụt sâu, Lactate > 4 mmol/L chứng minh có tình trạng thiếu máu nuôi mô vi tuần hoàn nghiêm trọng (tỷ lệ tử vong tới 30%). Phác đồ Sepsis Bundle: 1. Cấy máu trước khi dùng kháng sinh; 2. Kháng sinh phổ rộng đường tĩnh mạch trong vòng 1 giờ; 3. Bù dịch tinh thể đẳng trương 30ml/kg trong 3 giờ đầu; 4. Dùng vận mạch Noradrenaline nếu HA trung bình MAP < 65 mmHg sau bù dịch; 5. Đo lại lactate sau 2-4 giờ để đánh giá độ thanh thải.',
      physiologicalInsight: 'Sự giãn mạch và thoát quản do cơn bão cytokine làm sụt giảm lưu lượng máu hiệu dụng đến các cơ quan. Các mô buộc phải chuyển sang chuyển hóa kỵ khí sinh ra acid lactic ào ạt.'
    }
  },
  {
    id: 26,
    source: 'Hennessey & Japp (Made Easy)',
    caseNumberDisplay: 'Ca 26 (Hennessey)',
    title: 'Nôn ói liên tục 3 ngày: Kiềm chuyển hóa giảm Clo & Kali',
    patientProfile: 'Nữ 35 tuổi, nôn ói dữ dội kéo dài sau mổ triệt sản, không được truyền dịch bù phụ',
    categoryTag: 'Kiềm chuyển hóa',
    difficulty: 'Trung bình',
    history: 'Nữ 35 tuổi sau phẫu thuật nội soi triệt sản xuất hiện hội chứng nôn dữ dội kéo dài 3 ngày. Bảng theo dõi dịch vào ra cho thấy mất dịch lớn nhưng không được kê đơn truyền bù dịch.',
    examination: {
      vitals: {
        pulse: '100 lần/phút',
        rr: '10 lần/phút (thở chậm)',
        bp: '160/100 mmHg',
        temp: '36.6°C',
        spo2: '96% (khí trời)',
        fio2: '21%'
      },
      findings: 'Dấu hiệu mất nước rõ: véo da mất chậm, môi lưỡi khô khốc. Nhịp thở chậm 10 l/p.'
    },
    abg: {
      unit: 'kPa',
      pH: 7.44,
      pCO2: 6.40, // 48.0 mmHg
      pO2: 11.1,  // 83.0 mmHg
      hco3: 32.0,
      be: 4.0,
      sao2: 96.0,
      fio2: 21,
      na: 133,
      k: 3.0,     // Hạ kali
      cl: 91,     // Hạ clo
      lactate: 1.0,
      glucose: 5.0,
      patientAge: 35
    },
    questions: [
      '1. Mô tả trao đổi khí và thăng bằng toan kiềm?',
      '2. Bệnh nhân có những rối loạn điện giải nào?',
      '3. Loại dịch truyền nào sẽ sửa chữa triệt để rối loạn toan kiềm này?'
    ],
    answers: {
      gasExchange: 'Suy hô hấp Type 2 mức độ nhẹ mang tính bù trừ (PaCO2 tăng lên 48 mmHg do trung tâm hô hấp hãm nhịp thở xuống 10 l/p để giữ CO2). Oxy hóa máu đạt yêu cầu.',
      acidBase: 'Kiềm chuyển hóa bù trừ hoàn toàn (pH 7.44 nằm trong giới hạn 7.40-7.45, HCO3- tăng 32.0 mmol/L).',
      differentialDiagnosis: 'Kiềm chuyển hóa đáp ứng với Clo (Chloride-responsive metabolic alkalosis) do nôn mất dịch vị dạ dày (HCl) và mất dịch đẳng trương.',
      clinicalAction: 'Rối loạn điện giải: Hạ Kali (3.0 mmol/L), Hạ Clo (91 mmol/L), Hạ Natri nhẹ (133 mmol/L). DỊCH TRUYỀN TỐI ƯU ĐỂ ĐIỀU CHỈNH: Dung dịch Natri Clorid 0.9% (Normal Saline) kết hợp bổ sung Kali Clorid (KCl). Khi được cung cấp đủ Cl-, thận sẽ ngừng giữ HCO3- và bài tiết bicarb ra nước tiểu, đưa kiềm chuyển hóa về bình thường.',
      physiologicalInsight: 'Tại sao thận không tự đào thải HCO3- dư thừa? Vì khi mất nước và giảm Clo trầm trọng, ưu tiên sống còn của thận là giữ Natri và nước. Dưới tác dụng của Aldosterone, Na+ được giữ lại ở ống thận bằng cách đào thải K+ hoặc H+. Vì K+ đã bị cạn kiệt, thận bắt buộc phải thải H+ ra nước tiểu (nghịch lý toan nước tiểu trong kiềm máu), làm tình trạng kiềm chuyển hóa càng bị duy trì!'
    }
  },
  {
    id: 27,
    source: 'Hennessey & Japp (Made Easy)',
    caseNumberDisplay: 'Ca 27 (Hennessey)',
    title: 'Hẹp môn vị phì đại ở trẻ sơ sinh: Kiềm chuyển hóa nặng',
    patientProfile: 'Bé trai 8 tuần tuổi, nôn trớ vọt ra sữa không có dịch mật, sờ thấy khối u môn vị',
    categoryTag: 'Nhi khoa / Ngoại khoa',
    difficulty: 'Nâng cao',
    history: 'Bé trai 8 tuần tuổi, tiền sử sinh thường đủ tháng. Hai tuần gần đây nôn trớ vọt sau mỗi bữa bú, sụt cân nghiêm trọng, không sốt, phân ít.',
    examination: {
      vitals: {
        pulse: '150 lần/phút',
        rr: '24 lần/phút',
        bp: '78/45 mmHg',
        temp: '36.8°C',
        spo2: '99% (khí trời)',
        fio2: '21%'
      },
      findings: 'Trẻ quấy khóc, suy dinh dưỡng, mắt trũng, thóp lõm. Sờ thấy khối tròn chắc kích thước bằng quả ô-liu ở vùng thượng vị.'
    },
    abg: {
      unit: 'kPa',
      pH: 7.54,
      pCO2: 6.10, // 45.8 mmHg
      pO2: 11.2,  // 80.0 mmHg
      hco3: 37.5,
      be: 14.0,
      sao2: 99.0,
      fio2: 21,
      na: 135,
      k: 2.5,     // Hạ kali máu nặng!
      cl: 86,     // Hạ clo máu nặng!
      lactate: 1.0,
      glucose: 5.1,
      patientAge: 0.15 // 8 tuần
    },
    questions: [
      '1. Mô tả trao đổi khí và thăng bằng toan kiềm?',
      '2. So với mức độ kiềm máu nặng (pH 7.54, HCO3 37.5), PaCO2 45.8 mmHg là cao hay thấp hơn kỳ vọng?',
      '3. Chẩn đoán và nguyên tắc điều trị ngoại khoa?'
    ],
    answers: {
      gasExchange: 'Thông khí phế nang bù trừ nhẹ (PaCO2 45.8 mmHg). Trao đổi khí bảo tồn.',
      acidBase: 'Kiềm chuyển hóa mất bù bán phần mức độ nặng (pH 7.54, HCO3- vọt lên 37.5 mmol/L, BE +14 mmol/L).',
      differentialDiagnosis: 'Hẹp môn vị phì đại bẩm sinh (Infantile Hypertrophic Pyloric Stenosis).',
      clinicalAction: 'PaCO2 45.8 mmHg là THẤP HƠN KỲ VỌNG bù trừ của một ca kiềm máu nặng như vậy! Lý do: Trẻ đang đau đớn, mất nước và quấy khóc nhiều tạo kích thích tăng thông khí phản xạ, làm cùn mòn khả năng hãm thở giữ CO2. NGUYÊN TẮC: TUYỆT ĐỐI KHÔNG ĐƯỢC MỔ CẤP CỨU KHI CHƯA HIỆU CHỈNH TOAN KIỀM! Trẻ sẽ bị ngưng thở sau mổ dưới tác dụng của thuốc mê nếu kiềm máu còn nặng. Phải nhịn bú, truyền dịch NaCl 0.9% + Glucose 5% + KCl 20-30 mEq/L cho tới khi Clo > 100, K+ > 3.5 và HCO3 < 30 mmol/L mới tiến hành phẫu thuật mở cơ môn vị Ramstedt.',
      physiologicalInsight: 'Vì vị trí tắc nằm ở môn vị (trước tá tràng), chất nôn chỉ chứa dịch vị dạ dày giàu HCl, không hề có dịch mật tụy giàu kiềm HCO3-. Toàn bộ ion H+ và Cl- bị tống sạch ra ngoài tạo nên bức tranh kiềm hạ clo kinh điển.'
    }
  },
  {
    id: 29,
    source: 'Hennessey & Japp (Made Easy)',
    caseNumberDisplay: 'Ca 29 (Hennessey)',
    title: 'Lấy nhầm máu tĩnh mạch (VBG): Cạm bẫy lâm sàng thường gặp',
    patientProfile: 'Sản phụ 36 tuổi mang thai tuần 34, cảm giác khó thở cơ năng, lâm sàng hoàn toàn khỏe mạnh',
    categoryTag: 'Cạm bẫy lâm sàng / VBG',
    difficulty: 'Cơ bản',
    history: 'Sản phụ 36 tuổi mang thai 34 tuần, than phiền hụt hơi khi leo cầu thang. Bác sĩ nội trú lấy khí máu động mạch quay. Kết quả trả về khiến cả tua trực hoảng hốt: PaO2 chỉ có 35 mmHg!',
    examination: {
      vitals: {
        pulse: '110 lần/phút',
        rr: '20 lần/phút',
        bp: '112/70 mmHg',
        temp: '36.6°C',
        spo2: '99% (khí trời)',
        fio2: '21%'
      },
      findings: 'Sản phụ tỉnh táo, da dẻ hồng hào, nói chuyện lưu loát, không có bất kỳ dấu hiệu suy hô hấp hay co kéo cơ hô hấp nào. Khám phổi bình thường.'
    },
    abg: {
      unit: 'kPa',
      pH: 7.45,
      pCO2: 4.90, // 37.0 mmHg
      pO2: 4.70,  // 35.0 mmHg (Tụt dốc thê thảm!)
      hco3: 24.0,
      be: 2.0,
      sao2: 74.0, // SaO2 khí máu báo 74%!
      fio2: 21,
      na: 138,
      k: 3.6,
      cl: 104,
      lactate: 1.0,
      glucose: 5.0,
      patientAge: 36,
      isVenousSample: true
    },
    questions: [
      '1. Kết quả khí máu thể hiện bệnh lý gì trên giấy?',
      '2. Điều gì bất thường và giải thích hợp lý nhất cho sự mâu thuẫn này?',
      '3. Các dấu hiệu nhận biết lấy nhầm máu tĩnh mạch lúc đâm kim?'
    ],
    answers: {
      gasExchange: 'Trên giấy tờ: Thể hiện một tình trạng Suy hô hấp Type 1 cực kỳ nguy kịch (PaO2 35 mmHg, SaO2 74% - đe dọa ngừng tim). Nhưng lâm sàng bệnh nhân hoàn toàn bình thường!',
      acidBase: 'Thăng bằng toan kiềm bình thường (pH 7.45, HCO3 24).',
      differentialDiagnosis: 'MẪU MÁU ĐÃ BỊ CHỌC NHẦM VÀO TĨNH MẠCH (Venous Blood Gas - VBG) chứ không phải máu động mạch!',
      clinicalAction: 'KHÔNG ĐƯỢC HOẢNG LOẠN ĐẶT NỘI KHÍ QUẢN! Sự chênh lệch quá lớn giữa SpO2 máy kẹp (99%) và SaO2 trên máy khí máu (74%) ở bệnh nhân tỉnh táo hồng hào là bằng chứng rõ nhất của mẫu máu tĩnh mạch. Cần lấy lại mẫu khí máu động mạch chuẩn xác.',
      physiologicalInsight: 'Các dấu hiệu nhận biết lấy nhầm máu tĩnh mạch: 1. Máu sẫm màu, không có màu đỏ tươi của oxyhemoglobin; 2. Máu không tự động đẩy piston của xi-lanh lên theo nhịp đập mạch nảy mà người lấy phải kéo piston hút ra; 3. SaO2 khí máu thấp xa so với SpO2 ngón tay.'
    }
  },
  {
    id: 30,
    source: 'Hennessey & Japp (Made Easy)',
    caseNumberDisplay: 'Ca 30 (Hennessey)',
    title: 'Khí máu bình thường KHÔNG loại trừ được thuyên tắc phổi!',
    patientProfile: 'Nữ 55 tuổi, ngày 4 sau thay khớp gối nhân tạo, đau ngực trái đột ngột kèm thở nhanh',
    categoryTag: 'Cạm bẫy lâm sàng / PE',
    difficulty: 'Nâng cao',
    history: 'Nữ 55 tuổi, sau phẫu thuật thay khớp gối 4 ngày, nằm bất động tại giường. Đột ngột đau chói ngực trái kiểu màng phổi, hụt hơi và hồi hộp tim đập nhanh.',
    examination: {
      vitals: {
        pulse: '98 lần/phút (nhanh xoang)',
        rr: '20 lần/phút',
        bp: '160/100 mmHg',
        temp: '36.6°C',
        spo2: '99% (khí trời)',
        fio2: '21%'
      },
      findings: 'Không sốt, khám tim phổi không phát hiện bất thường. X-quang ngực thẳng bình thường, ECG chỉ có nhịp nhanh xoang.'
    },
    abg: {
      unit: 'kPa',
      pH: 7.43,
      pCO2: 4.90, // 37.0 mmHg
      pO2: 12.1,  // 91.0 mmHg
      hco3: 25.8,
      be: -1.8,
      sao2: 99.0,
      fio2: 21,
      na: 136,
      k: 3.8,
      cl: 99,
      lactate: 1.0,
      glucose: 5.0,
      patientAge: 55
    },
    questions: [
      '1. Đánh giá trao đổi khí và toan kiềm?',
      '2. Tính A-a gradient?',
      '3. Khí máu hoàn toàn bình thường này có loại trừ được thuyên tắc phổi không? Cần làm gì tiếp theo?'
    ],
    answers: {
      gasExchange: 'Trao đổi khí hoàn toàn bình thường (PaO2 91 mmHg / 12.1 kPa, PaCO2 37 mmHg).',
      acidBase: 'Thăng bằng toan kiềm bình thường (pH 7.43, HCO3 25.8).',
      differentialDiagnosis: 'Thuyên tắc động mạch phổi cấp tính (Pulmonary Embolism) nhánh nhỏ/vừa.',
      clinicalAction: 'A-a gradient = 15 mmHg (1.9 kPa) hoàn toàn bình thường (< 20 mmHg). Tuy nhiên: KHÍ MÁU ĐỘNG MẠCH BÌNH THƯỜNG HOÀN TOÀN KHÔNG LOẠI TRỪ ĐƯỢC THUYÊN TẮC PHỔI! Có tới 15-20% bệnh nhân thuyên tắc phổi có PaO2 và A-a gradient hoàn toàn trong giới hạn bình thường. Bệnh nhân có nguy cơ cao (sau mổ khớp gối bất động, đau ngực màng phổi cấp, nhịp nhanh), BẮT BUỘC chụp CT mạch máu phổi (CTPA) hoặc xạ hình V/Q scan ngay lập tức.',
      physiologicalInsight: 'Khí máu động mạch là công cụ hỗ trợ đánh giá sinh lý, không phải công cụ chẩn đoán hình ảnh. Đừng bao giờ để một kết quả khí máu "đẹp như tranh" làm mờ mắt trước một bệnh cảnh lâm sàng nguy hiểm!'
    }
  },
  {
    id: 31,
    source: 'Pierre & Ranson (Case Study)',
    caseNumberDisplay: 'Ca 3.1 (Pierre & Ranson)',
    title: 'Hôn mê ngưng thở do bơm Morphin giảm đau PCA',
    patientProfile: 'Nữ 38 tuổi, sau cắt tử cung toàn phần do u xơ, bấm máy giảm đau morphin PCA liên tục',
    categoryTag: 'Suy hô hấp Type 2',
    difficulty: 'Cấp cứu',
    history: 'Nữ 38 tuổi sau mổ cắt tử cung ngả bụng, than đau nhiều nên được cho dùng máy giảm đau tự kiểm soát (PCA Morphin). Một giờ sau, người chồng hốt hoảng gọi vì thấy vợ ngưng thở và không trả lời.',
    examination: {
      vitals: {
        pulse: '102 lần/phút',
        rr: '5 lần/phút (ngáy to, tắc nghẽn)',
        bp: '88/42 mmHg',
        temp: '36.6°C',
        spo2: '99% (đang thở oxy gọng mũi 2L)',
        fio2: '28%'
      },
      findings: 'Hôn mê không đáp ứng AVPU = U (Unresponsive). Đồng tử co nhỏ như đinh ghim. Đường thở ngáy to do tụt lưỡi.'
    },
    abg: {
      unit: 'kPa',
      pH: 7.25,
      pCO2: 8.20, // 61.5 mmHg
      pO2: 12.0,  // 90.0 mmHg
      hco3: 21.0,
      be: -2.0,
      sao2: 99.0,
      fio2: 28,
      na: 138,
      k: 4.0,
      cl: 102,
      lactate: 1.1,
      glucose: 5.5,
      patientAge: 38
    },
    questions: [
      '1. Đánh giá khí máu theo quy trình 6 bước chuẩn?',
      '2. Tiếp cận ABCDE và biện pháp cấp cứu?'
    ],
    answers: {
      gasExchange: 'Suy hô hấp Type 2 cấp tính (ứ trệ CO2 nghiêm trọng PaCO2 61.5 mmHg).',
      acidBase: 'Toan hô hấp cấp chưa bù trừ (pH 7.25 tụt sâu, HCO3- 21 mmol/L).',
      differentialDiagnosis: 'Ngộ độc Morphin hậu phẫu gây ức chế hô hấp và tụt huyết áp.',
      clinicalAction: 'Theo phác đồ ABCDE: A (Airway): Đặt canule họng miệng (Guedel) ngay vì tụt lưỡi tắc nghẽn; B (Breathing): Bóp bóng Ambu giàu oxy; C (Circulation): Tụt HA do morphin giải phóng histamine, truyền dịch Hartman; D (Disability): Tiêm tĩnh mạch NALOXONE đối kháng Opiate; E (Exposure): Kiểm tra vết mổ. Chuyển ICU theo dõi.',
      physiologicalInsight: 'Sự phối hợp 6 bước tiếp cận của Pierre & Ranson giúp nhận diện ngay tổn thương hô hấp nguyên phát khi pH và PaCO2 biến thiên ngược chiều nhau.'
    }
  },
  {
    id: 34,
    source: 'Pierre & Ranson (Case Study)',
    caseNumberDisplay: 'Ca 7.5 (Pierre & Ranson)',
    title: 'Toan hỗn hợp cực nặng do vùi lấp chấn thương hoại tử chi',
    patientProfile: 'Nữ mất tích 3 ngày, tìm thấy bất tỉnh sau ngã, gãy hở cổ chân hoại tử thiếu máu',
    categoryTag: 'Rối loạn hỗn hợp',
    difficulty: 'Cấp cứu',
    history: 'Bệnh nhân mất tích 3 ngày, được phát hiện hôn mê tại hiện trường sau tai nạn ngã vùi lấp. Bệnh nhân được đặt nội khí quản tại hiện trường và đưa thẳng vào phòng mổ vì bàn chân gãy hở hoại tử đen.',
    examination: {
      vitals: {
        pulse: '135 lần/phút',
        rr: '12 lần/phút (thở máy)',
        bp: '80/50 mmHg',
        temp: '35.0°C',
        spo2: '99% (thở oxy 100%)',
        fio2: '100%'
      },
      findings: 'Hôn mê sâu, hạ thân nhiệt. Bàn chân trái tím đen lạnh ngắt, sưng nề hoại tử do chèn ép thiếu máu kéo dài.'
    },
    abg: {
      unit: 'kPa',
      pH: 6.90,
      pCO2: 13.2, // 99.0 mmHg (Tăng khủng khiếp!)
      pO2: 15.0,  // 112.5 mmHg
      hco3: 14.0,
      be: -7.0,
      sao2: 99.0,
      fio2: 100,
      na: 140,
      k: 6.5,     // Tăng kali máu nguy hiểm do tiêu cơ!
      cl: 98,
      lactate: 8.0,
      glucose: 7.0,
      patientAge: 45
    },
    questions: [
      '1. Nhận diện dạng rối loạn thăng bằng kiềm toan?',
      '2. Những nguyên nhân nào cùng thúc đẩy toan máu ở ca này?'
    ],
    answers: {
      gasExchange: 'Suy hô hấp Type 2 mức độ cực kỳ nghiêm trọng (PaCO2 99 mmHg) do thông khí nhân tạo chưa đủ thể tích phút.',
      acidBase: 'TOAN HỖN HỢP NGUY KỊCH (Combined / Mixed Acidosis): Toan hô hấp rất nặng (PaCO2 99 mmHg) KẾT HỢP Toan chuyển hóa rất nặng (HCO3 14 mmol/L, Lactate 8 mmol/L). pH 6.90 là mức đe dọa tử vong tức thì!',
      differentialDiagnosis: 'Hội chứng vùi lấp (Crush syndrome) hoại tử chi gây toan lactic và tiêu cơ vân + Suy thông khí phế nang cấp tính.',
      clinicalAction: '1. Tăng ngay thể tích phút máy thở (tăng tần số và thể tích lưu thông Vt) để đào thải CO2 hạ PaCO2; 2. Hồi sức sốc dịch tinh thể tích cực; 3. Cấp cứu tăng Kali máu (K+ 6.5 mmol/L) bằng Canxi clorid/gluconate tiêm TM bảo vệ tim, truyền Glucose + Insulin; 4. Phẫu thuật cắt lọc hoại tử khẩn cấp hoặc cắt cụt chi; 5. Lọc máu liên tục (CRRT).',
      physiologicalInsight: 'Khi cả hệ hô hấp (ứ CO2) và hệ chuyển hóa (toan lactic và acid vô cơ) cùng đổ dồn acid vào máu mà không có hệ cơ quan nào bù trừ, pH máu sẽ sụp đổ dưới 7.0, làm tê liệt các enzym tế bào và ngừng co bóp cơ tim.'
    }
  }
];
