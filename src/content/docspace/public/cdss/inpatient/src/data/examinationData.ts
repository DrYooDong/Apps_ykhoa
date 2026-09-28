import { ExamModule } from '../types/clinical';

export const EXAMINATION_MODULES: ExamModule[] = [
  {
    id: 'cardiovascular-exam',
    system: 'cardiovascular',
    title: 'Khám Hệ Tim Mạch',
    subtitle: 'Cardiovascular Examination - Bates Ch.16 & Macleod Ch.4',
    overview: 'Khám tim mạch đòi hỏi sự phối hợp nhịp nhàng giữa quan sát toàn trạng, bắt mạch, đo huyết áp, đánh giá áp lực tĩnh mạch cảnh (JVP), sờ diện tim và nghe tim theo các tư thế chuyên biệt.',
    anatomyPhysiologyPoints: [
      'T1 (tiếng đóng van 2 lá & 3 lá): Báo hiệu đầu thì tâm thu, nghe rõ nhất ở mỏm tim.',
      'T2 (tiếng đóng van ĐMC & ĐMP): Báo hiệu đầu thì tâm trương, tách đôi sinh lý khi hít vào sâu.',
      'Tĩnh mạch cảnh trong (IJV) phản ánh trực tiếp áp lực nhĩ phải (bình thường ≤ 3-4 cm trên góc ức khi nghiêng 45°).',
      'Mỏm tim bình thường ở khoang liên sườn 5 đường trung đòn trái, đường kính < 2.5 cm, diện nảy ngắn.'
    ],
    equipmentNeeded: [
      'Ống nghe y khoa (màng nghe diaphragm & chuông bell)',
      'Huyết áp kế thủy ngân hoặc đồng hồ cơ có bao đo chuẩn (chiều rộng bằng 40% chu vi cánh tay)',
      'Đồng hồ có kim giây để đếm mạch',
      'Thước đo milimet kiểm tra JVP'
    ],
    steps: [
      {
        phase: 'Chuẩn bị',
        technique: 'Chuẩn bị bệnh nhân và tư thế',
        techniqueDetails: [
          'Giải thích và xin phép bệnh nhân. Đảm bảo phòng khám ấm áp, đủ sáng và riêng tư.',
          'Bệnh nhân bộc lộ ngực hoàn toàn, tư thế nằm ngửa đầu cao 45 độ (semi-recumbent) có gối nâng đỡ vùng cổ.',
          'Bác sĩ đứng hoặc ngồi ở bên phải của người bệnh.'
        ],
        normalFindings: 'Bệnh nhân thoải mái, thở êm, không co kéo cơ hô hấp, không tím tái.',
        abnormalFindings: [
          'Khó thở khi nằm phẳng (Orthopnoea) - gợi ý suy tim trái ứ huyết',
          'Vẻ mặt lo âu, thở gấp, tái nhợt do sốc tim hoặc hội chứng vành cấp'
        ],
        clinicalSignificance: 'Tư thế nằm ngửa 45° là chuẩn mực vàng để quan sát JVP và diện đập mỏm tim.'
      },
      {
        phase: 'Nhìn (Inspection)',
        technique: 'Khám dấu hiệu ngoại biên và nhìn lồng ngực',
        techniqueDetails: [
          'Bàn tay & Móng tay: Tìm ngón tay dùi trống (clubbing), xuất huyết móng dạng vệt (splinter haemorrhages), nốt Osler (đau ở đầu ngón), tổn thương Janeway (hồng ban không đau ở lòng bàn tay).',
          'Mặt & Mắt: Tìm ban vàng xanthelasma, vòng cung giác mạc (corneal arcus), niêm mạc mắt nhợt, tím môi/lưỡi (central cyanosis).',
          'Lồng ngực: Tìm sẹo mổ tim giữa xương ức (sternotomy) hoặc dưới vú trái (mở van 2 lá), máy tạo nhịp dưới da (pacemaker), biến dạng lồng ngực (ức lõm pectus excavatum, ức gà pectus carinatum).'
        ],
        normalFindings: 'Bàn tay ấm khô, hồng hào, CRT < 2s. Không có các tổn thương mạch ngoại biên.',
        abnormalFindings: [
          'Nốt Osler + Janeway + Xuất huyết mảnh dằm: Viêm nội tâm mạc nhiễm khuẩn (IE)',
          'Ngón tay dùi trống: Tim bẩm sinh có tím (Fallot), viêm nội tâm mạc nhiễm khuẩn bán cấp',
          'Tím trung ương ở lưỡi/niêm mạc miệng: SaO2 < 85%, shunt Phải-Trái hoặc phù phổi cấp',
          'U vàng gân (Tendon xanthoma) gân duỗi ngón tay: Tăng cholesterol máu gia đình'
        ],
        clinicalSignificance: 'Các dấu hiệu ngoại biên cung cấp manh mối chẩn đoán ngay trước khi đặt ống nghe.',
        residentPearls: [
          'Khi khám bàn tay bệnh nhân nghi ngờ viêm nội tâm mạc, bắt buộc phải lật cả mặt lòng và mặt mu bàn tay, kiểm tra từng đầu ngón tay.',
          'Phân biệt tím ngoại biên (lạnh đầu chi, mạch co, lưỡi hồng) với tím trung ương (lưỡi và niêm mạc miệng tím, SpO2 giảm).'
        ]
      },
      {
        phase: 'Sờ (Palpation)',
        technique: 'Bắt mạch và sờ vùng trước tim',
        techniqueDetails: [
          'Mạch quay: Đánh giá tần số, nhịp điệu (đều, loạn nhịp hoàn toàn trong rung nhĩ). Kiểm tra mạch nảy mạnh chìm nhanh (Collapsing pulse/Corrigan) bằng cách nâng cánh tay bệnh nhân lên cao.',
          'Mạch cảnh: Bắt nhẹ nhàng từng bên (không bao giờ bắt 2 bên cùng lúc). Đánh giá biên độ và tốc độ dốc lên (upstroke: chậm trong hẹp van ĐMC).',
          'Mỏm tim (PMI): Dùng lòng bàn tay định vị rồi dùng 1-2 ngón tay xác định vị trí chính xác (KLS 5 đường trung đòn T), diện đập (< 2.5cm) và thời gian đập.',
          'Rung miêu (Thrills): Đặt lòng bàn tay tại mỏm tim, bờ trái ức và đáy tim tìm cảm giác rung cơ học (tương đương tiếng thổi >= 4/6).',
          'Dấu nẩy thất phải (Parasternal Heave): Đặt gót bàn tay áp sát bờ trái xương ức xem có bị đẩy bổng theo nhịp tim không (gợi ý phì đại thất phải).'
        ],
        normalFindings: 'Mạch đều 60-100 l/p, mỏm tim ở KLS 5 đường trung đòn T, không có rung miêu hay ổ đập thất phải.',
        abnormalFindings: [
          'Loạn nhịp hoàn toàn: Rung nhĩ (Atrial Fibrillation)',
          'Mạch nảy chậm, biên độ thấp (Pulsus parvus et tardus): Hẹp van động mạch chủ khít (Severe AS)',
          'Mạch nảy mạnh chìm nhanh (Water-hammer / Corrigan pulse): Hở van động mạch chủ (AR)',
          'Mạch nghịch thường (Pulsus paradoxus - HA tâm thu tụt > 10 mmHg khi hít vào): Chèn ép tim cấp (Cardiac Tamponade), hen phế quản nặng',
          'Mỏm tim dời lệch sang trái và xuống dưới (> KLS 5 ngoài đường nách trước): Giãn thất trái, suy tim sung huyết'
        ],
        clinicalSignificance: 'Sờ mỏm tim và bắt mạch giúp định vị tổn thương giải phẫu buồng tim nhanh chóng.',
        residentPearls: [
          'Tư thế nghiêng trái (Left lateral decubitus) giúp đưa mỏm tim lại gần thành ngực, sờ rõ mỏm tim và nghe rõ tiếng rung tâm trương hẹp 2 lá.',
          'Rung miêu (Thrill) chính là bản sao xúc giác của tiếng thổi có cường độ từ 4/6 trở lên.'
        ]
      },
      {
        phase: 'Khám Tĩnh Mạch Cổ (JVP)',
        technique: 'Đo và phân tích sóng tĩnh mạch cảnh trong',
        techniqueDetails: [
          'Tư thế bệnh nhân nằm nghiêng đầu 45 độ, xoay nhẹ đầu sang trái, cơ ức đòn chũm thả lỏng.',
          'Chiếu ánh sáng chếch qua cổ để nhìn sóng đập của tĩnh mạch cảnh trong (sau cơ ức đòn chũm).',
          'Đo khoảng cách thẳng đứng từ đỉnh sóng JVP đến góc ức Louis. Bình thường ≤ 3-4 cm (tương đương áp lực nhĩ phải ≤ 8-9 cmH2O).',
          'Nghiệm pháp phản hồi gan - tĩnh mạch cổ (Abdominojugular test): Ấn liên tục vùng hạ sườn phải trong 10-15s, JVP tăng bền vững > 3-4 cm trong suốt thời gian ấn là dương tính.'
        ],
        normalFindings: 'Đỉnh dao động JVP < 3-4 cm trên góc ức. Sóng xẹp xuống nhẹ nhàng khi hít vào.',
        abnormalFindings: [
          'JVP nổi cao > 4 cm: Suy tim phải, suy tim toàn bộ, tràn dịch màng ngoài tim, hẹp van 3 lá',
          'Sóng a khổng lồ (Giant a wave): Tăng áp động mạch phổi, hẹp van 3 lá (nhĩ phải bóp chống lại sức cản cao)',
          'Sóng đại bác (Cannon waves): Nhĩ phải bóp khi van 3 lá đóng trong Block nhĩ thất độ III',
          'Mất sóng a: Rung nhĩ (nhĩ không còn co bóp cơ học)',
          'Dấu hiệu Kussmaul (JVP tăng khi hít vào thay vì giảm): Viêm màng ngoài tim co thắt (Constrictive pericarditis)'
        ],
        clinicalSignificance: 'JVP là thước đo không xâm lấn chính xác nhất áp lực buồng tim phải ngay tại giường bệnh.',
        residentPearls: [
          'Phân biệt JVP và mạch cảnh: JVP có 2 đỉnh/chu kỳ (sóng a & v), không sờ thấy được nảy dưới tay, thay đổi theo hô hấp và tư thế, biến mất khi ép nhẹ gốc cổ.'
        ]
      },
      {
        phase: 'Nghe (Auscultation)',
        technique: 'Nghe tim hệ thống và các nghiệm pháp động học',
        techniqueDetails: [
          'Nghe tại 4 vị trí kinh điển: Ổ van ĐMC (KLS 2 bờ phải ức), Ổ van ĐMP (KLS 2 bờ trái ức), Ổ van 3 lá (KLS 4-5 bờ trái ức), Ổ van 2 lá (Mỏm tim).',
          'Sử dụng cả mặt màng (cho âm cao: T1, T2, tiếng thổi tâm thu, hở van ĐMC) và mặt chuông (cho âm trầm: T3, T4, rung tâm trương hẹp 2 lá).',
          'Bắt mạch cảnh trong lúc nghe để xác định chính xác thì tâm thu (bắt đầu bằng T1, đồng thời nảy mạch cảnh) và tâm trương (bắt đầu bằng T2).',
          'Nghe mỏm tim khi bệnh nhân nghiêng trái (chuông ấn nhẹ) tìm tiếng T3, T4 và rung tâm trương.',
          'Nghe bờ trái ức khi bệnh nhân ngồi dậy, cúi người ra trước, thở ra hết rồi nín thở để tìm tiếng thổi đầu tâm trương của hở van ĐMC.'
        ],
        normalFindings: 'T1 và T2 rõ, đều, không có tiếng T3/T4 bệnh lý, không có tiếng thổi.',
        abnormalFindings: [
          'Tiếng thổi tâm thu tống máu (Ejection systolic murmur): Hẹp van ĐMC (lan lên động mạch cảnh hai bên, hình quả trám crescendo-decrescendo)',
          'Tiếng thổi toàn tâm thu (Pansystolic murmur): Hở van 2 lá (lan ra nách, cường độ đều suốt tâm thu)',
          'Tiếng thổi đầu tâm trương êm dịu: Hở van ĐMC (nghe rõ ở KLS 3 bờ trái ức - ổ Erb khi cúi người ra trước)',
          'Rung tâm trương kèm clack mở van (Opening Snap): Hẹp van 2 lá (nghe ở mỏm tim tư thế nghiêng trái)',
          'Tiếng cọ màng tim (Pericardial friction rub): Âm ráp ráp thô ráp 3 thì (nhĩ thu, thất thu, thất trương), nghe rõ nhất bờ trái ức, tăng khi cúi người'
        ],
        clinicalSignificance: 'Phân tích tiếng tim và tiếng thổi giúp định danh chính xác tổn thương van tim và suy chức năng tâm thất.',
        residentPearls: [
          'Nghiệm pháp Valsalva & Đứng dậy: Giảm hồi lưu tĩnh mạch -> làm giảm hầu hết các tiếng thổi NGOẠI TRỪ tiếng thổi của Hẹp phì đại dưới van ĐMC (HOCM) và Sa van 2 lá (MVP) lại TĂNG LÊN.',
          'Tiếng T3 bệnh lý ở người > 40 tuổi (nhịp ngựa phi thất - Ventricular Gallop) là dấu hiệu kinh điển của suy tim thất trái ứ huyết (quá tải thể tích).'
        ]
      }
    ],
    highYieldPoints: [
      '6 độ tiếng thổi theo thang Levine: I (rất nhỏ, nghe trong phòng tĩnh), II (nhỏ nhưng nhận biết ngay), III (trung bình, không rung miêu), IV (to, có rung miêu), V (rất to, chếch ống nghe vẫn nghe thấy), VI (nghe thấy ngay cả khi ống nghe chưa chạm ngực).',
      'Tam chứng Beck trong chèn ép tim cấp: Tụt huyết áp + Tĩnh mạch cổ nổi + Tiếng tim mờ xa xăm.',
      'Dấu hiệu Carvallo: Tiếng thổi toàn tâm thu của hở van 3 lá TĂNG LÊN KHI HÍT VÀO (do tăng lượng máu về tim phải).'
    ],
    specialSigns: [
      {
        name: 'Dấu hiệu Kussmaul',
        description: 'Tĩnh mạch cổ phồng to hơn khi hít vào (bình thường áp lực âm trong lồng ngực kéo máu về tim làm JVP xẹp xuống).',
        indicates: 'Viêm màng ngoài tim co thắt, suy thất phải nặng, nhồi máu cơ tim thất phải.',
        clinicalPearl: 'Thường đi kèm với tiếng gõ màng tim (pericardial knock) sớm ở thì tâm trương.'
      },
      {
        name: 'Dấu hiệu Corrigan & Mạch nảy mạnh chìm nhanh',
        description: 'Động mạch cảnh đập mạnh nhìn thấy rõ ở cổ (Corrigan sign) và mạch quay nảy vọt đập vào lòng bàn tay rồi sụp nhanh khi giơ cao tay.',
        indicates: 'Hở van động mạch chủ nặng (Aortic Regurgitation) do chênh lệch huyết áp tâm thu và tâm trương rất lớn.',
        clinicalPearl: 'Kiểm tra thêm tiếng thổi đôi Duroziez ở động mạch đùi khi ấn chuông ống nghe.'
      },
      {
        name: 'Tiếng Clack mở van (Opening Snap - OS)',
        description: 'Tiếng sắc, gọn, đanh xuất hiện ngay sau T2 ở đầu thì tâm trương do van 2 lá xơ cứng bật mở đột ngột.',
        indicates: 'Hẹp van 2 lá do di chứng thấp tim.',
        clinicalPearl: 'Khoảng cách A2 - OS càng ngắn chứng tỏ áp lực nhĩ trái càng cao, mức độ hẹp van 2 lá càng khít.'
      }
    ],
    references: "Bates' Guide to Physical Examination, 13th/14th Ed; Macleod's Clinical Examination, 14th Ed."
  },
  {
    id: 'respiratory-exam',
    system: 'respiratory',
    title: 'Khám Hệ Hô Hấp',
    subtitle: 'Respiratory Examination - Bates Ch.15 & Macleod Ch.5',
    overview: 'Khám hô hấp chuẩn mực tuân theo tuần tự 4 bước: Nhìn (Inspection) - Sờ (Palpation) - Gõ (Percussion) - Nghe (Auscultation), đối chiếu hình bậc thang hai bên từ đỉnh phổi xuống đáy phổi.',
    anatomyPhysiologyPoints: [
      'Khí quản phân chia tại góc Louis (KLS 2 trước ngực, T4-T5 sau lưng).',
      'Đỉnh phổi nhô cao 2-4 cm trên 1/3 trong xương đòn (hố thượng đòn).',
      'Bờ dưới phổi ở người bình thường: đường trung đòn (xương sườn 6), đường nách giữa (xương sườn 8), phía sau (xương sườn 10).',
      'Rì rào phế nang là âm thanh êm dịu của luồng khí qua phế quản nhỏ và phế nang, thì hít vào dài gấp 3 lần thì thở ra.'
    ],
    equipmentNeeded: [
      'Ống nghe có màng nghe sạch',
      'Đồng hồ đếm nhịp thở trong 60 giây',
      'Thước dây đo độ giãn lồng ngực',
      'Máy đo SpO2 kẹp ngón'
    ],
    steps: [
      {
        phase: 'Chuẩn bị',
        technique: 'Quan sát tổng trạng và tư thế người bệnh',
        techniqueDetails: [
          'Bệnh nhân cởi trần hoặc mặc áo choàng mở lưng, ngồi thẳng thoải mái trên giường khám.',
          'Đếm tần số thở trong 60 giây một cách kín đáo (giả vờ như đang bắt mạch quay để bệnh nhân không tự ý thay đổi nhịp thở).',
          'Đánh giá SpO2 kẹp ngón tay và quan sát khay đờm (màu sắc, lượng, lẫn máu).'
        ],
        normalFindings: 'Nhịp thở 14-20 lần/phút, đều đặn, không thở mím môi hay gắng sức.',
        abnormalFindings: [
          'Thở nhanh nông (Tachypnoea > 20 l/p): Viêm phổi, thuyên tắc phổi, suy tim',
          'Thở sâu Kussmaul: Toan chuyển hoá nặng (DKA, suy thận toan huyết)',
          'Thở Cheyne-Stokes (tăng dần - giảm dần - ngưng thở): Suy tim nặng, tổn thương thần kinh trung ương'
        ],
        clinicalSignificance: 'Tần số thở là dấu hiệu sinh tồn nhạy nhất báo trước nguy cơ suy hô hấp cấp.'
      },
      {
        phase: 'Nhìn (Inspection)',
        technique: 'Khám hình dạng lồng ngực và kiểu thở',
        techniqueDetails: [
          'Hình dạng lồng ngực: Đo đường kính trước - sau so với đường kính ngang (bình thường tỉ lệ < 0.7-0.9). Tìm lồng ngực hình thùng (barrel chest), gù vẹo cột sống (kyphoscoliosis).',
          'Co kéo cơ hô hấp phụ: Quan sát cơ ức đòn chũm, cơ liên sườn, hõm trên ức và cánh mũi.',
          'Dấu hiệu Hoover: Chuyển động nghịch thường của bờ sườn dưới co rút vào trong khi hít vào (do cơ hoành bị dẹt trong COPD).',
          'Kiểm tra ngón tay dùi trống, móng tay nhuộm nicotine (tobacco staining), phù áo khoác do tắc tĩnh mạch chủ trên (SVC syndrome).'
        ],
        normalFindings: 'Lồng ngực đối xứng, di động đều theo nhịp thở. Tỉ lệ đường kính trước-sau/ngang khoảng 1:2.',
        abnormalFindings: [
          'Lồng ngực hình thùng (tỉ lệ > 0.9): Khí phế thũng, COPD tiến triển',
          'Co kéo cơ liên sườn và hõm ức: Tắc nghẽn đường thở nặng (cơn hen cấp, dị vật thanh quản)',
          'Ngực di động nghịch thường (Mảng sườn di động - Flail chest): Gãy nhiều xương sườn sau chấn thương ngực'
        ],
        clinicalSignificance: 'Nhìn kiểu thở và hình dáng lồng ngực gợi ý ngay bệnh lý tắc nghẽn mạn tính hoặc chấn thương cấp cứu.'
      },
      {
        phase: 'Sờ (Palpation)',
        technique: 'Khám khí quản, độ giãn nở và rung thanh',
        techniqueDetails: [
          'Khí quản: Đặt ngón tay trỏ nhẹ nhàng vào hõm trên ức để kiểm tra xem khí quản có nằm ngay đường giữa hay bị lệch sang một bên.',
          'Độ giãn nở lồng ngực (Chest expansion): Áp hai bàn tay ôm mặt sau lồng ngực ở mức xương sườn 10, hai ngón cái chụm vào đường giữa, yêu cầu bệnh nhân hít sâu để quan sát khoảng cách hai ngón cái tách nhau ra (bình thường >= 4-5 cm).',
          'Rung thanh (Tactile vocal fremitus): Áp bờ trụ bàn tay hoặc lòng bàn tay vào các vùng đối xứng của lồng ngực, yêu cầu bệnh nhân nói "Một - Hai - Ba" hoặc "Chín mươi chín".'
        ],
        normalFindings: 'Khí quản chính giữa, lồng ngực giãn nở cân đối 2 bên >= 4cm, rung thanh đều 2 phế trường.',
        abnormalFindings: [
          'Khí quản lệch về BÊN BỆNH: Xẹp phổi thùy, xơ co kéo màng phổi thùy trên',
          'Khí quản lệch sang BÊN ĐỐI DIỆN: Tràn khí màng phổi áp lực (cấp cứu!), tràn dịch màng phổi lượng nhiều',
          'Rung thanh TĂNG: Đông đặc phổi (Hội chứng đông đặc - phế nang chứa dịch/mủ truyền âm tốt hơn)',
          'Rung thanh GIẢM hoặc MẤT: Tràn dịch màng phổi, tràn khí màng phổi, xẹp phổi do tắc phế quản'
        ],
        clinicalSignificance: 'Rung thanh giúp phân biệt rõ ràng giữa tổn thương nhu mô phổi (đông đặc) và khoang màng phổi (tràn dịch/khí).'
      },
      {
        phase: 'Gõ (Percussion)',
        technique: 'Gõ đối xứng theo hình bậc thang (Ladder pattern)',
        techniqueDetails: [
          'Đặt ngón giữa bàn tay trái (ngón gõ bản - pleximeter) áp sát khoang liên sườn song song xương sườn.',
          'Dùng đầu ngón giữa bàn tay phải (ngón gõ búa - plexor) gõ dứt khoát 2 nhịp từ khớp cổ tay lên khớp liên đốt xa ngón bản.',
          'Gõ lần lượt từ đỉnh phổi xuống đáy phổi, so sánh đối xứng từng mức bên phải và bên trái.',
          'Gõ xác định bờ trên gan ở ngực trước, khoảng Traube bên trái, và biên độ di động cơ hoành ở ngực sau (bình thường 4-5 cm).'
        ],
        normalFindings: 'Tiếng trong (Resonant) đều khắp hai phế trường. Khoảng Traube gõ vang (chứa túi hơi dạ dày).',
        abnormalFindings: [
          'Gõ đục (Dull): Đông đặc phổi (viêm phổi thùy), xẹp phổi, u phổi',
          'Gõ đục như gỗ (Stony dull): Tràn dịch màng phổi (đặc trưng kinh điển)',
          'Gõ vang trống (Hyperresonant / Tympanitic): Tràn khí màng phổi, khí phế thũng nặng',
          'Mất khoảng Traube (gõ đục vùng Traube): Lách to hoặc tràn dịch màng phổi trái'
        ],
        clinicalSignificance: 'Gõ đục như gỗ kết hợp mất rì rào phế nang là chẩn đoán xác định tràn dịch màng phổi đến khi có bằng chứng ngược lại.'
      },
      {
        phase: 'Nghe (Auscultation)',
        technique: 'Nghe tiếng thở và các tiếng thêm bất thường',
        techniqueDetails: [
          'Yêu cầu bệnh nhân hít thở sâu, chậm bằng miệng mở nhẹ.',
          'Nghe bằng màng ống nghe lần lượt theo hình bậc thang từ đỉnh xuống đáy phổi, ít nhất trọn vẹn 1 chu kỳ hô hấp (hít vào - thở ra) tại mỗi điểm.',
          'Đánh giá rì rào phế nang (Bình thường: hít vào êm dịu, thở ra ngắn và nhỏ dần).',
          'Tìm tiếng thổi phế quản bệnh lý (Bronchial breathing: âm thanh thô ráp, thì thở ra dài và rõ, có khoảng nghỉ giữa 2 thì).',
          'Tìm rale bệnh lý: Rale nổ (fine crackles - cuối thì hít vào, âm sắc cao giống bóc miếng dán Velcro), Rale ẩm (coarse crackles), Rale rít/rale ngáy (wheezes/rhonchi - âm liên tục, chủ yếu thì thở ra).',
          'Tiếng vang thanh (Vocal resonance): Yêu cầu nói "99", tiếng vang phế quản (Bronchophony), tiếng dê kêu (Egophony - nói E nghe thành A qua đông đặc).'
        ],
        normalFindings: 'Rì rào phế nang êm dịu hai phế trường, không rale, tiếng thở thanh khí quản bình thường ở vùng cổ/cán ức.',
        abnormalFindings: [
          'Hội chứng 3 giảm (Rung thanh giảm + Gõ đục + Rì rào phế nang giảm/mất): Tràn dịch màng phổi',
          'Hội chứng tràn khí (Rung thanh giảm + Gõ vang + Rì rào phế nang mất): Tràn khí màng phổi',
          'Hội chứng đông đặc (Rung thanh tăng + Gõ đục + Tiếng thổi phế quản + Rale nổ): Viêm phổi thùy',
          'Rale nổ khô hai đáy phổi (Velcro crackles): Bệnh phổi kẽ (Idiopathic Pulmonary Fibrosis - IPF)',
          'Rale rít lan toả hai phế trường: Cơn hen phế quản, đợt cấp COPD'
        ],
        clinicalSignificance: 'Nghe phổi xác định cơ chế rối loạn thông khí và vị trí tổn thương giải phẫu phế nang hoặc đường dẫn khí.',
        residentPearls: [
          'Khám bệnh nhân nghi ngờ xẹp phổi hoặc tràn dịch, luôn kiểm tra tiếng dê kêu (Egophony) tại ranh giới trên của vùng đục - âm thanh "E" sẽ đổi thành "A" the thé chói tai.',
          'Lồng ngực im lặng (Silent Chest) trong cơn hen phế quản là dấu hiệu tối khẩn cấp: đường thở tắc nghẽn gần như hoàn toàn, không còn đủ dòng khí để tạo ra tiếng rít.'
        ]
      }
    ],
    highYieldPoints: [
      'Hội chứng 3 giảm (tràn dịch màng phổi) vs Hội chứng tràn khí: Khác nhau ở bước GÕ (tràn dịch gõ đục như gỗ, tràn khí gõ vang trống).',
      'Đông đặc phổi: Rung thanh tăng, gõ đục, tiếng thở phế quản (bronchial breathing), rale nổ cuối thì hít vào.',
      'Dấu hiệu thở mím môi (Pursed-lip breathing) ở bệnh nhân khí phế thũng (Pink Puffer): giúp tạo áp lực dương cuối kỳ thở ra (PEEP nội sinh), ngăn ngừa xẹp đường thở nhỏ.'
    ],
    specialSigns: [
      {
        name: 'Dấu hiệu Trail (Trail’s sign)',
        description: 'Đầu ức của cơ ức đòn chũm bên khí quản bị lệch trở nên nổi rõ bất thường.',
        indicates: 'Xẹp phổi nặng hoặc tràn khí màng phổi áp lực gây lệch trung thất.',
        clinicalPearl: 'Hữu ích khi bệnh nhân cổ ngắn hoặc khó sờ nắn hõm ức.'
      },
      {
        name: 'Tiếng cọ màng phổi (Pleural Friction Rub)',
        description: 'Âm thanh thô ráp nông như hai miếng da khô cọ vào nhau, nghe ở cả hai thì, không thay đổi sau khi ho.',
        indicates: 'Viêm màng phổi cấp (Pleurisy), nhồi máu phổi, viêm phổi sát màng phổi.',
        clinicalPearl: 'Biến mất khi có tràn dịch màng phổi xuất hiện (hai lá màng phổi bị tách rời bởi dịch).'
      },
      {
        name: 'Tiếng rít thanh quản (Stridor)',
        description: 'Tiếng thở the thé, âm sắc cao nghe rõ nhất ở thì hít vào, nghe được từ xa không cần ống nghe.',
        indicates: 'Tắc nghẽn đường hô hấp trên nguy kịch (phù nề thanh môn, viêm nắp thanh thiệt, dị vật đường thở).',
        clinicalPearl: 'Cần bảo đảm đường thở khẩn cấp, chuẩn bị phương tiện đặt nội khí quản hoặc mở khí quản.'
      }
    ],
    references: "Bates' Guide to Physical Examination, 13th Ed; Macleod's Clinical Examination, 14th Ed."
  },
  {
    id: 'gastrointestinal-exam',
    system: 'gastrointestinal',
    title: 'Khám Bụng & Hệ Tiêu Hóa',
    subtitle: 'Abdominal Examination - Bates Ch.19 & Macleod Ch.6',
    overview: 'Khám bụng tuân theo thứ tự bắt buộc: Nhìn - Nghe - Gõ - Sờ (đặt ống nghe nghe nhu động ruột trước khi sờ gõ để tránh làm biến đổi nhu động ruột tự nhiên).',
    anatomyPhysiologyPoints: [
      'Phân chia 9 vùng bụng: Hạ sườn P, Thượng vị, Hạ sườn T; Mạn sườn P, Quanh rốn, Mạn sườn T; Hố chậu P, Hạ vị, Hố chậu T.',
      'Nhu động ruột bình thường: 5-30 lần/phút, âm sắc vừa phải, ngắt quãng.',
      'Bờ dưới gan bình thường mấp mé bờ sườn hoặc dưới bờ sườn ≤ 1-2 cm khi hít vào sâu, bờ sắc, mềm nhẵn.',
      'Lách bình thường không sờ thấy được; khi sờ thấy bờ lách dưới hạ sườn trái nghĩa là lách đã to ít nhất gấp 2-3 lần thể tích bình thường.'
    ],
    equipmentNeeded: [
      'Ống nghe y khoa',
      'Thước dây đo vòng bụng và chiều cao gan (liver span)',
      'Găng tay y tế & dầu bôi trơn khám hậu môn - trực tràng (nếu chỉ định)'
    ],
    steps: [
      {
        phase: 'Chuẩn bị',
        technique: 'Tư thế khám bụng chuẩn',
        techniqueDetails: [
          'Yêu cầu bệnh nhân đi tiểu hết trước khi khám để bàng quang xẹp.',
          'Bệnh nhân nằm ngửa hoàn toàn, hai tay buông xuôi dọc thân mình (không khoanh tay trên ngực vì làm căng cơ bụng).',
          'Hai chân co nhẹ ở khớp gối để làm chùng tối đa cơ thành bụng.',
          'Bộc lộ bụng từ mũi ức xuống tận khớp mu, che đắp vùng bẹn đùi lịch sự.'
        ],
        normalFindings: 'Thành bụng mềm, phẳng hoặc thon gọn, không co cứng gồng mình.',
        abnormalFindings: [
          'Bụng chướng căng, rốn lồi: Cổ trướng (Ascites)',
          'Bệnh nhân nằm bất động, thở ngực hoàn toàn, sợ cử động: Viêm phúc mạc toàn thể'
        ],
        clinicalSignificance: 'Thành bụng được thư giãn hoàn toàn là điều kiện tiên quyết để sờ nắn tạng sâu.'
      },
      {
        phase: 'Nhìn (Inspection)',
        technique: 'Quan sát bề mặt và hình thể thành bụng',
        techniqueDetails: [
          'Hình dạng bụng: Cân đối, phẳng, lõm lòng thuyền (người gầy/suy kiệt) hay bè hai bên (cổ trướng).',
          'Rốn: Lõm (bình thường), phẳng hoặc lồi (cổ trướng, thoát vị rốn), tìm nốt di căn ung thư Sister Mary Joseph.',
          'Chuyển động: Quan sát thành bụng di động theo nhịp thở; dấu hiệu quai ruột nổi và sóng nhu động (Dấu hiệu rắn bò trong tắc ruột cơ học).',
          'Tuần hoàn bàng hệ: Xác định chiều dòng máu chảy (kiểu cửa - chủ tỏa ra từ rốn hình đầu sứa Caput Medusae; kiểu chủ - chủ từ dưới lên trên).',
          'Dấu hiệu xuất huyết phúc mạc: Bầm tím quanh rốn (Cullen sign), bầm tím hai bên mạn sườn (Grey Turner sign) trong viêm tuỵ cấp hoại tử hoặc vỡ thai ngoài tử cung.'
        ],
        normalFindings: 'Bụng phẳng cân đối, rốn lõm, di động đều theo nhịp thở, không có sẹo mổ hay tuần hoàn bàng hệ.',
        abnormalFindings: [
          'Dấu hiệu rắn bò (Visible peristalsis): Tắc ruột cơ học',
          'Tuần hoàn bàng hệ gánh - chủ (Caput Medusae): Tăng áp lực tĩnh mạch cửa do xơ gan',
          'Dấu hiệu Cullen / Grey Turner: Chảy máu sau phúc mạc, viêm tụy cấp hoại tử xuất huyết nặng',
          'Vết mổ cũ: Tìm thoát vị vết mổ (Incisional hernia)'
        ],
        clinicalSignificance: 'Nhìn bụng có thể chẩn đoán ngay hội chứng tắc ruột hoặc viêm tụy hoại tử thể nặng.'
      },
      {
        phase: 'Nghe (Auscultation)',
        technique: 'Nghe nhu động ruột và tiếng thổi mạch máu',
        techniqueDetails: [
          'Đặt màng ống nghe tại vùng quanh rốn hoặc hố chậu phải trong ít nhất 1-2 phút trước khi kết luận mất tiếng nhu động ruột.',
          'Đếm tần số nhu động: Bình thường 5-30 lần/phút.',
          'Nghe tiếng thổi mạch máu bằng mặt màng: Động mạch chủ bụng (trên rốn), Động mạch thận 2 bên (cách đường giữa 2-3 cm sang hai bên và trên rốn 2-3 cm), Động mạch chậu và đùi.',
          'Nghe tiếng cọ màng bụng (Friction rub) trên vùng gan (u gan, nhồi máu gan) hoặc lách (nhồi máu lách).',
          'Tiếng óc ách lúc đói (Succussion splash): Lắc lắc nhẹ hai mào chậu khi bệnh nhân nhịn ăn > 4h (gợi ý hẹp môn vị).'
        ],
        normalFindings: 'Tiếng sôi réo ngắt quãng 5-30 lần/phút, không có tiếng thổi mạch máu hay tiếng cọ.',
        abnormalFindings: [
          'Nhu động ruột tăng tần số, âm sắc cao leng keng (Tinkling bowel sounds): Tắc ruột cơ học giai đoạn đầu',
          'Mất hoàn toàn nhu động ruột (sau 2 phút nghe im bặt): Liệt ruột cơ năng, viêm phúc mạc toàn thể',
          'Tiếng thổi tâm thu trên rốn lan sang 2 bên: Hẹp động mạch thận (nguyên nhân gây tăng huyết áp thứ phát)',
          'Tiếng cọ vùng gan/lách: Nhồi máu lách, u gan hoại tử'
        ],
        clinicalSignificance: 'Nghe trước khi sờ giúp đánh giá chính xác hoạt động cơ học của ống tiêu hóa.'
      },
      {
        phase: 'Gõ (Percussion)',
        technique: 'Gõ xác định tạng và tìm dịch ổ bụng',
        techniqueDetails: [
          'Gõ toàn bụng: Phân biệt âm trong của hơi ống tiêu hóa với âm đục của tạng đặc hoặc dịch.',
          'Đo chiều cao gan (Liver span): Gõ từ KLS 2 đường trung đòn phải xuống tìm bờ trên (bình thường KLS 5), gõ từ dưới rốn lên tìm bờ dưới. Khoảng cách bình thường 6-12 cm ở đường trung đòn phải.',
          'Gõ vùng lách (Traube space): Giới hạn bởi xương sườn 6, đường nách giữa và bờ sườn trái. Bình thường gõ vang; nếu đục ở thì hít vào sâu (Castell sign) gợi ý lách to.',
          'Gõ tìm đục vùng thấp (Shifting dullness): Gõ từ rốn ra hai bên mạn sườn tìm ranh giới trong-đục. Cho bệnh nhân nghiêng sang bên đối diện, đợi 10 giây rồi gõ lại, nếu vùng đục chuyển thành trong là dương tính (có dịch tự do > 500ml).',
          'Dấu hiệu sóng vỗ (Fluid wave): Yêu cầu người phụ tá hoặc bệnh nhân đặt bờ bàn tay ấn dọc đường giữa bụng. Bác sĩ dùng tay phải búng nhẹ vào một bên mạn sườn, tay trái áp sát mạn sườn đối diện để cảm nhận xung động dịch truyền qua.'
        ],
        normalFindings: 'Bụng gõ vang đều khắp, chiều cao gan 6-12 cm, khoảng Traube trong, không có đục vùng thấp.',
        abnormalFindings: [
          'Đục vùng thấp chuyển tư thế dương tính: Cổ trướng (Ascites)',
          'Mất vùng đục trước gan (gõ vang trước gan): Thủng tạng rỗng (hơi tự do liềm hơi dưới hoành)',
          'Chiều cao gan > 12-14 cm: Gan to (Hepatomegaly do suy tim, viêm gan, xơ gan giai đoạn sớm, u gan)'
        ],
        clinicalSignificance: 'Gõ là công cụ bedside nhạy nhất phát hiện tràn khí phúc mạc và cổ trướng lượng vừa-nhiều.'
      },
      {
        phase: 'Sờ (Palpation)',
        technique: 'Sờ nông, sờ sâu và khám các dấu hiệu chuyên biệt',
        techniqueDetails: [
          'Nguyên tắc: Hỏi bệnh nhân chỗ đau trước. Bắt đầu sờ từ vùng KHÔNG ĐAU xa nhất và tiến dần về phía vùng đau. Quan sát nét mặt bệnh nhân liên tục.',
          'Sờ nông (Light palpation): Dùng lòng 4 đầu ngón tay ấn nhẹ nhàng (độ sâu 1 cm) để phát hiện sự đề kháng thành bụng (Guarding) và điểm đau nông.',
          'Sờ sâu (Deep palpation): Dùng cả hai bàn tay chồng lên nhau ấn sâu hơn (2-3 cm) để tìm u cục, xác định bờ gan, bờ lách, cực dưới thận.',
          'Cảm ứng phúc mạc (Rebound tenderness / Blumberg sign): Ấn sâu từ từ vào vùng đau rồi buông tay đột ngột. Nếu bệnh nhân đau chói giật mình -> Viêm phúc mạc.',
          'Bụng gồng cứng như gỗ (Board-like rigidity): Cơ thành bụng co cứng tự nhiên không phụ thuộc ý muốn người bệnh -> Thủng dạ dày, viêm phúc mạc toàn thể.',
          'Sờ gan: Đặt bàn tay phải phẳng từ hố chậu phải, hướng lên hạ sườn phải, bảo bệnh nhân hít sâu vào. Bờ gan sẽ chạm vào đầu ngón tay.',
          'Sờ lách: Đặt bàn tay phải từ rốn hướng lên hạ sườn trái, tay trái luồn dưới mạn sườn trái nâng lồng ngực lên, bảo bệnh nhân thở sâu. Nếu cần, cho bệnh nhân nằm nghiêng sang phải 45 độ.',
          'Khám thận: Dấu hiệu chạm thận và bập bềnh thận (Ballottement).'
        ],
        normalFindings: 'Bụng mềm, ấn không đau, không sờ thấy gan lách thận, không có khối u bất thường.',
        abnormalFindings: [
          'Đề kháng thành bụng (Guarding) & Cảm ứng phúc mạc (Rebound): Nhiễm trùng viêm phúc mạc',
          'Điểm McBurney ấn đau chói / Dấu hiệu Rovsing (+): Viêm ruột thừa cấp',
          'Nghiệm pháp Murphy (+): Viêm túi mật cấp',
          'Gan to mật độ cứng, bề mặt lổn nhổn: Ung thư gan nguyên phát hoặc di căn',
          'Khối đập nảy ngang vùng quanh rốn đường kính > 3-4 cm: Phình động mạch chủ bụng (AAA)'
        ],
        clinicalSignificance: 'Sờ nắn thành bụng là bước quyết định xem bệnh nhân có "bụng ngoại khoa" cần mổ khẩn cấp hay không.',
        residentPearls: [
          'Dấu hiệu Rovsing: Ấn sâu vào hố chậu TRÁI nhưng bệnh nhân lại thấy đau chói ở hố chậu PHẢI -> Rất gợi ý viêm ruột thừa cấp do di chuyển cột khí trong đại tràng.',
          'Phân biệt đề kháng tự ý (Voluntary guarding - do rét, sợ đau, người nhột) với đề kháng thực sự (Involuntary guarding): yêu cầu bệnh nhân thở bằng miệng, gập đầu gối, đánh lạc hướng; đề kháng tự ý sẽ mềm dần, còn đề kháng thực sự vẫn co cứng liên tục.'
        ]
      }
    ],
    highYieldPoints: [
      'Bộ 4 dấu hiệu viêm ruột thừa: Điểm McBurney, Dấu hiệu Rovsing, Dấu cơ thắt lưng chậu (Psoas sign - đau khi duỗi háng phải), Dấu cơ bịt (Obturator sign - đau khi gấp và xoay trong khớp háng phải).',
      'Nghiệm pháp Murphy: Đặt các ngón tay dưới bờ sườn phải tại bờ ngoài cơ thẳng bụng, yêu cầu bệnh nhân hít sâu. Bệnh nhân ngừng thở đột ngột vì đau chói khi túi mật viêm chạm vào tay người khám -> Viêm túi mật cấp.',
      'Định luật Courvoisier-Terrier: Bệnh nhân vàng da tắc mật mà sờ thấy túi mật to không đau -> Nghĩ nhiều đến u đầu tụy hoặc u đường mật chèn ép, ít nghĩ đến sỏi mật (vì sỏi thường gây viêm túi mật mạn tính làm teo xơ túi mật).'
    ],
    specialSigns: [
      {
        name: 'Dấu hiệu Murphy (Murphy’s Sign)',
        description: 'Ấn ngón tay dưới bờ sườn phải điểm giao bờ ngoài cơ thẳng bụng, bảo bệnh nhân hít vào sâu. Bệnh nhân ngừng hít vào đột ngột do đau chói.',
        indicates: 'Viêm túi mật cấp tính (Acute Cholecystitis).',
        clinicalPearl: 'Phải đối chiếu với việc ấn tương tự ở hạ sườn trái; nếu hai bên đều ngừng thở thì dấu hiệu không có giá trị đặc hiệu.'
      },
      {
        name: 'Dấu hiệu Rovsing',
        description: 'Ấn sâu liên tục vào hố chậu trái gây ra đau ở hố chậu phải.',
        indicates: 'Viêm ruột thừa cấp tính.',
        clinicalPearl: 'Cơ chế do dồn khí từ đại tràng xuống qua đại tràng ngang sang manh tràng làm căng phồng ruột thừa viêm.'
      },
      {
        name: 'Dấu hiệu Cơ Thắt Lưng Chậu (Psoas Sign)',
        description: 'Bệnh nhân nằm nghiêng trái, bác sĩ duỗi thụ động khớp háng phải ra sau, hoặc bệnh nhân nằm ngửa chủ động nâng chân phải chống lại lực cản.',
        indicates: 'Viêm ruột thừa sau manh tràng (Retrocaecal appendicitis) làm viêm kích thích cơ thắt lưng chậu.',
        clinicalPearl: 'Đặc biệt giá trị khi ruột thừa nằm sau manh tràng, nơi ấn điểm McBurney phía trước có thể không rõ.'
      }
    ],
    references: "Bates' Guide to Physical Examination, 13th Ed; Macleod's Clinical Examination, 14th Ed."
  },
  {
    id: 'neurological-exam',
    system: 'neurological',
    title: 'Khám Hệ Thần Kinh Toàn Diện',
    subtitle: 'Neurological Examination - Bates Ch.24 & Macleod Ch.7',
    overview: 'Khám thần kinh là bài kiểm tra tính toàn vẹn từ vỏ não, thân não, tủy sống, rễ thần kinh cho đến dây thần kinh ngoại biên và cơ. Cần phân định 2 câu hỏi cốt lõi: Vị trí tổn thương ở đâu? (Where is the lesion?) và Bản chất tổn thương là gì? (What is the lesion?).',
    anatomyPhysiologyPoints: [
      'Bó tháp (Corticospinal tract): Bắt chéo tại hành tủy (Decussation of pyramids) -> Tổn thương trên hành não gây liệt nửa người đối bên.',
      'Cột sau tủy sống (Dorsal columns): Dẫn truyền cảm giác bản thể (vị thế khớp) và rung âm thoa cùng bên, lên hành não mới bắt chéo.',
      'Bó gai - thị (Spinothalamic tract): Dẫn truyền cảm giác đau và nhiệt, bắt chéo ngay tại khoanh tủy (1-2 đốt tủy).',
      'Tổn thương nơron vận động trên (UMN): Tăng trương lực cơ kiểu co cứng (spasticity), tăng phản xạ gân xương, dấu Babinski (+). Tổn thương nơron vận động dưới (LMN): Giảm trương lực cơ, teo cơ rõ rệt, rung giật bó cơ (fasciculations), mất phản xạ gân xương.'
    ],
    equipmentNeeded: [
      'Búa gõ phản xạ (Reflex hammer)',
      'Âm thoa 128 Hz (khám rung xương) và 512 Hz (khám thính lực Weber/Rinne)',
      'Đèn pin đồng tử và bảng thị lực Snellen',
      'Dụng cụ đầu tù gãi da (Neurotip/que gỗ) và bông gòn y tế sạch',
      'Đèn soi đáy mắt (Ophthalmoscope)'
    ],
    steps: [
      {
        phase: 'Chuẩn bị',
        technique: 'Đánh giá ý thức và dấu màng não',
        techniqueDetails: [
          'Đánh giá thang điểm hôn mê Glasgow (GCS 3-15 điểm): Mắt (E 1-4), Lời nói (V 1-5), Vận động (M 1-6).',
          'Dấu cứng gáy (Neck stiffness): Bệnh nhân nằm ngửa, người khám nâng nhẹ đầu bệnh nhân gập cằm vào ngực. Đánh giá sự kháng cự của cơ gáy.',
          'Dấu hiệu Kernig: Gấp đùi vuông góc 90° vào bụng, duỗi cẳng chân từ từ. Kháng cự hoặc đau nhức ở mặt sau đùi -> Dương tính.',
          'Dấu hiệu Brudzinski: Khi nâng gập đầu thụ động, bệnh nhân tự động co gấp hai khớp háng và khớp gối -> Dương tính.'
        ],
        normalFindings: 'GCS 15 điểm, tỉnh táo hoàn toàn. Cổ mềm, cằm chạm ngực dễ dàng, Kernig & Brudzinski âm tính.',
        abnormalFindings: [
          'GCS ≤ 8: Hôn mê nặng, cần đặt ống nội khí quản bảo vệ đường thở',
          'Tam chứng màng não (Sốt + Đau đầu + Cứng gáy): Viêm màng não mủ, viêm màng não lao, xuất huyết dưới nhện (SAH)',
          'Dấu hiệu JAH (Jolt accentuation of headache) dương tính: Đau đầu tăng dữ dội khi lắc đầu nhanh 2-3 lần/giây'
        ],
        clinicalSignificance: 'Phát hiện sớm hội chứng màng não và suy giảm tri giác cấp cứu.'
      },
      {
        phase: 'Khám 12 Đôi Dây Thần Kinh Sọ (Cranial Nerves)',
        technique: 'Khám hệ thống dây sọ từ I đến XII',
        techniqueDetails: [
          'Dây II (Thị giác): Kiểm tra thị lực (Snellen), thị trường đối đầu (Confrontation test), soi đáy mắt tìm phù gai thị (Papilloedema).',
          'Dây II & III (Đồng tử): Kích thước, tính đối xứng, phản xạ ánh sáng trực tiếp và đồng cảm, phản xạ điều tiết quy tụ. Tìm khuyết tật hướng tâm tương đối (RAPD / Marcus Gunn pupil).',
          'Dây III, IV, VI (Vận nhãn): Hướng dẫn bệnh nhân nhìn theo ngón tay theo hình chữ "H" to trong không gian, tìm sụp mi, lác mắt (strabismus), nhìn đôi (diplopia) và giật nhãn cầu (nystagmus).',
          'Dây V (Sinh ba): Cảm giác 3 nhánh V1, V2, V3 bằng bông gòn/kim đầu tù. Vận động: Cơ nhai (cắn chặt răng sờ cơ thái dương và cơ cắn), gõ phản xạ cằm (jaw jerk). Phản xạ giác mạc.',
          'Dây VII (Mặt): Nhăn trán, nhắm chặt mắt, nhe răng, phồng má. Phân biệt liệt VII trung ương (liệt 1/4 dưới mặt đối bên, trán nhăn bình thường) vs liệt VII ngoại biên (liệt nửa mặt cùng bên, mất nếp nhăn trán, dấu Charles Bell +).',
          'Dây VIII (Tiền đình - Ốc tai): Thính lực qua tiếng thì thầm, nghiệm pháp Rinne (âm thoa 512Hz trên xương chũm vs cạnh ống tai) và Weber (âm thoa giữa đỉnh đầu).',
          'Dây IX, X (Thiệt hầu, Lang thang): Bảo bệnh nhân nói "A", quan sát lưỡi gà và vòm khẩu cái nâng lên cân đối hay lệch sang bên lành. Đánh giá phản xạ nuốt và phản xạ nôn.',
          'Dây XI (Phụ): Nâng vai chống lại lực cản (cơ thang), quay đầu sang bên đối diện chống lại lực cản (cơ ức đòn chũm).',
          'Dây XII (Hạ thiệt): Quan sát lưỡi nằm yên trong miệng tìm teo cơ/rung giật bó cơ. Đưa lưỡi ra trước: Lưỡi lệch về BÊN LIỆT.'
        ],
        normalFindings: '12 đôi dây sọ nguyên vẹn chức năng, đồng tử tròn đều 2-4mm co nhanh với ánh sáng, nhãn cầu vận động linh hoạt.',
        abnormalFindings: [
          'Phù gai thị (Papilloedema): Tăng áp lực nội sọ (U não, xuất huyết não, viêm màng não)',
          'Liệt dây III hoàn toàn: Sụp mi hoàn toàn, giãn đồng tử mất phản xạ, nhãn cầu lác ngoài và xuống dưới (Down and Out)',
          'Liệt dây VI: Nhãn cầu không thể liếc ra ngoài, nhìn đôi tăng khi nhìn về bên liệt',
          'Liệt VII ngoại biên (Bell’s Palsy): Mắt nhắm không kín (Charles Bell +), mất nếp nhăn trán và rãnh mũi má cùng bên'
        ],
        clinicalSignificance: 'Khám dây sọ cho phép định vị chính xác vị trí tổn thương tại cuống não (III, IV), cầu não (V, VI, VII, VIII) hay hành não (IX, X, XI, XII).'
      },
      {
        phase: 'Khám Vận Động (Motor System)',
        technique: 'Đánh giá Trương lực - Sức cơ - Độ đối xứng',
        techniqueDetails: [
          'Nhìn: Đánh giá tư thế chi, teo cơ (đo chu vi chi đối xứng), phì đại giả (loạn dưỡng cơ Duchenne), rung giật sợi cơ (Fasciculations trong xơ cứng cột bên teo cơ ALS).',
          'Trương lực cơ (Tone): Thao tác cử động thụ động khớp cổ tay, khuỷu tay, khớp gối, cổ chân ở các tốc độ khác nhau. Phân biệt tăng trương lực kiểu co cứng (Spasticity - dao gấp, phụ thuộc tốc độ) vs kiểu cứng đờ (Rigidity - ống chì / bánh xe răng cưa trong Parkinson) vs giảm trương lực (Flaccidity).',
          'Sức cơ (Power - Thang điểm MRC 0-5):',
          ' - 0/5: Không có co cơ;',
          ' - 1/5: Có co cơ nhìn/sờ thấy nhưng không phát sinh cử động;',
          ' - 2/5: Cử động được trên mặt phẳng loại bỏ trọng lực;',
          ' - 3/5: Thắng được trọng lực nhưng không thắng được sức cản;',
          ' - 4/5: Thắng được sức cản trung bình;',
          ' - 5/5: Sức cơ bình thường.',
          'Nghiệm pháp Pronator Drift: Nhắm mắt, giơ thẳng 2 tay ngửa lòng bàn tay ra trước trong 20-30s. Nếu một tay từ từ sấp lại và trôi xuống -> Tổn thương bó tháp (UMN lesion) đối bên.'
        ],
        normalFindings: 'Cơ bắp nở nang cân đối, trương lực mềm dẻo, sức cơ 5/5 ở tất cả các nhóm cơ, Pronator drift âm tính.',
        abnormalFindings: [
          'Liệt kiểu tháp (Pyramidal weakness): Tay yếu nhóm cơ duỗi nhiều hơn co, chân yếu nhóm cơ co nhiều hơn duỗi',
          'Yếu cơ gốc chi (Proximal weakness): Bệnh cơ (Polymyositis, loạn dưỡng cơ, bệnh cơ do Corticosteroid)',
          'Yếu cơ ngọn chi (Distal weakness): Bệnh đa dây thần kinh (Peripheral neuropathy)'
        ],
        clinicalSignificance: 'Phân loại UMN vs LMN và định vị nhóm cơ bị tổn thương.'
      },
      {
        phase: 'Khám Phản Xạ (Reflexes)',
        technique: 'Khám phản xạ gân xương và phản xạ da lòng bàn chân',
        techniqueDetails: [
          'Kỹ thuật gõ búa: Cầm cán búa thả lỏng cổ tay, gõ nhát dứt khoát lên gân cơ.',
          'Gân nhị đầu (Biceps - rễ C5-C6): Đặt ngón cái người khám lên gân nhị đầu nếp gấp khuỷu rồi gõ búa lên ngón cái.',
          'Gân tam đầu (Triceps - rễ C7): Đỡ cẳng tay bệnh nhân vuông góc, gõ trực tiếp lên gân tam đầu trên mỏm khuỷu.',
          'Trâm quay (Brachioradialis - rễ C6): Gõ cách mỏm trâm quay 2-3 cm.',
          'Gân bánh chè (Knee jerk - rễ L3-L4): Đỡ khoeo chân bệnh nhân hoặc cho ngồi thõng chân, gõ lên gân bánh chè.',
          'Gân gót (Ankle jerk - rễ S1): Giữ bàn chân hơi gập mu, gõ lên gân Achilles.',
          'Thang điểm phản xạ: 0 (mất), 1+ (giảm), 2+ (bình thường), 3+ (nhanh), 4+ (đa động kèm giật cơ clonus).',
          'Nghiệm pháp tăng cường Jendrassik: Nếu phản xạ khó xuất hiện, bảo bệnh nhân móc chặt 2 bàn tay vào nhau rồi kéo mạnh khi gõ.',
          'Dấu hiệu Babinski: Dùng đầu tù que gỗ vạch dọc bờ ngoài lòng bàn chân từ gót lên đến gốc ngón út rồi vòng sang ngón cái. Đáp ứng dương tính bệnh lý: Ngón chân cái duỗi từ từ lên trên, các ngón con xòe nan quạt.'
        ],
        normalFindings: 'Phản xạ gân xương 2+ đối xứng hai bên, phản xạ da lòng bàn chân cụp (Flexor response).',
        abnormalFindings: [
          'Phản xạ tăng nhạy + Dấu Babinski (+): Tổn thương bó tháp (UMN lesion do đột quỵ, chấn thương tủy, u tủy)',
          'Giật cơ mắt cá chân (Ankle Clonus >= 3-5 nhịp): Tăng phản xạ bệnh lý vỏ não/tủy sống',
          'Phản xạ giảm hoặc mất hoàn toàn: Hội chứng Guillain-Barré, bệnh thần kinh đái tháo đường, tổn thương sừng trước tủy'
        ],
        clinicalSignificance: 'Phản xạ gân xương và dấu Babinski là ranh giới phân định tổn thương trung ương và ngoại biên.'
      },
      {
        phase: 'Phối Hợp Vận Động & Cảm Giác',
        technique: 'Khám tiểu não và các đường dẫn truyền cảm giác',
        techniqueDetails: [
          'Tiểu não chi trên: Ngón tay chỉ mũi (Finger-to-nose test) tìm rối tầm (Dysmetria) và run chủ tình (Intention tremor). Nghiệm pháp lật sấp bàn tay nhanh (Dysdiadochokinesis).',
          'Tiểu não chi dưới: Nghiệm pháp gót - đầu gối (Heel-to-shin test).',
          'Khám dáng đi: Dáng đi hình sao, dáng đi người say rượu (thất điều cerebellar ataxia), dáng đi nối gót (Tandem gait test).',
          'Dấu hiệu Romberg: Bệnh nhân đứng thẳng chụm 2 chân, mắt mở vững, khi nhắm mắt thì loạng choạng ngã -> Mất cảm giác sâu (Sensory ataxia), KHÔNG PHẢI thất điều tiểu não.',
          'Cảm giác nông: Dùng kim đầu tù (đau) và bông gòn (sờ nhẹ) so sánh 2 bên theo các khoanh cảm giác da (Dermatomes: C6 ngón cái, T4 ngang núm vú, T10 ngang rốn, L1 nếp bẹn, L4 đầu gối, S1 bờ ngoài bàn chân).',
          'Cảm giác sâu: Rung âm thoa 128Hz trên mắt cá/đốt bàn ngón; Vị thế khớp (cầm hai bên ngón chân/ngón tay cử động lên xuống, nhắm mắt đoán hướng).'
        ],
        normalFindings: 'Chỉ mũi và gót gối chính xác, không run, đi nối gót vững, Romberg âm tính, cảm giác nông và sâu toàn vẹn.',
        abnormalFindings: [
          'Run chủ tình (Intention tremor) + Quá tầm (Dysmetria) + Nystagmus: Hội chứng tiểu não',
          'Romberg (+): Mất cảm giác bản thể sâu cột sau (Tabes dorsalis, thiếu vitamin B12, bệnh đa dây thần kinh nặng)',
          'Mất cảm giác kiểu "đi găng - đi tất" (Glove-stocking distribution): Viêm đa dây thần kinh ngoại biên (Đái tháo đường, nghiện rượu)'
        ],
        clinicalSignificance: 'Giúp phân biệt thất điều tiểu não với thất điều cảm giác và xác định ranh giới khoanh tủy bị chèn ép.'
      }
    ],
    highYieldPoints: [
      'Hội chứng Brown-Séquard (Cắt ngang nửa tủy): Cùng bên tổn thương: Liệt vận động kiểu UMN + Mất cảm giác rung/bản thể sâu; Đối bên tổn thương (dưới tổn thương 1-2 đốt): Mất cảm giác đau và nhiệt.',
      'Phân biệt Liệt VII trung ương vs Ngoại biên: Liệt VII ngoại biên liệt TOÀN BỘ nửa mặt cùng bên (mắt nhắm không kín, mất nhăn trán). Liệt VII trung ương chỉ liệt 1/4 DƯỚI mặt đối bên (còn nhăn trán và nhắm kín mắt vì nhân vận động nửa trên mặt nhận sợi vỏ não từ 2 bán cầu).',
      'Tam chứng Cushing trong tăng áp lực nội sọ đe doạ tụt não: Tăng huyết áp có khoảng trống huyết áp rộng + Nhịp tim chậm + Rối loạn nhịp thở bất thường.'
    ],
    specialSigns: [
      {
        name: 'Dấu hiệu Babinski (Extensor Plantar Response)',
        description: 'Vạch bờ ngoài lòng bàn chân từ gót lên ngón út vòng sang ngón cái. Ngón cái duỗi ngược lên trên kèm xòe ngón con.',
        indicates: 'Tổn thương bó tháp (Hệ nơron vận động trên UMN).',
        clinicalPearl: 'Là phản xạ bình thường ở trẻ sơ sinh dưới 1 tuổi do hệ thần kinh chưa myelin hóa hoàn toàn, nhưng là bệnh lý tuyệt đối ở người lớn.'
      },
      {
        name: 'Dấu hiệu Charles Bell',
        description: 'Khi cố gắng nhắm chặt mắt, nhãn cầu bên liệt bị đẩy lăn ngược lên trên và ra ngoài, lộ củng mạc trắng qua khe mi không khép kín.',
        indicates: 'Liệt dây thần kinh mặt ngoại biên (Dây VII ngoại biên).',
        clinicalPearl: 'Là cơ chế sinh lý bảo vệ giác mạc không bị loét trợt khi mi mắt không thể khép lại.'
      },
      {
        name: 'Dấu hiệu Hoover (Hoover’s Sign)',
        description: 'Bệnh nhân nằm ngửa, người khám luồn tay dưới gót chân bên bình thường trong khi yêu cầu bệnh nhân nâng chân bên yếu lên. Nếu có nỗ lực thật sự, gót chân bên bình thường sẽ tự động ấn mạnh xuống tay người khám.',
        indicates: 'Phân biệt liệt hữu cơ thực sự với yếu liệt cơ năng (Functional neurological disorder / Conversion).',
        clinicalPearl: 'Nếu gót chân lành không hề ấn xuống khi bệnh nhân than phiền chân kia yếu liệt, gợi ý yếu liệt cơ năng hoặc giả vờ.'
      }
    ],
    references: "Bates' Guide to Physical Examination, 13th Ed; Macleod's Clinical Examination, 14th Ed."
  },
  {
    id: 'musculoskeletal-exam',
    system: 'musculoskeletal',
    title: 'Khám Hệ Cơ Xương Khớp',
    subtitle: 'Musculoskeletal Examination - Bates Ch.23 & Macleod Ch.13',
    overview: 'Quy trình tiếp cận khám cơ xương khớp theo phương pháp GALS (Gait - Arms - Legs - Spine) và nguyên tắc kinh điển "Nhìn - Sờ - Cử động - Nghiệm pháp chuyên biệt" (Look - Feel - Move - Special Tests).',
    anatomyPhysiologyPoints: [
      'Phân biệt tổn thương tại khớp (Articular: hạn chế cả vận động chủ động và thụ động, đau lan toả) với ngoài khớp (Extra-articular: đau khu trú điểm bám gân, chỉ hạn chế vận động ở hướng kéo căng gân cơ).',
      '4 dấu hiệu viêm khớp cấp: Sưng (Swelling), Nóng (Warmth), Đỏ (Erythema), Đau (Tenderness).',
      'Cấu trúc khớp hoạt dịch: Bao khớp, màng hoạt dịch, sụn khớp và dịch khớp.',
      'Sụn chêm khớp gối: Chêm trong hình chữ C dính với dây chằng bên trong (MCL), chêm ngoài hình chữ O di động hơn.'
    ],
    equipmentNeeded: [
      'Thước đo góc khớp (Goniometer)',
      'Thước dây đo chu vi cơ và chiều dài chi thể',
      'Búa gõ phản xạ'
    ],
    steps: [
      {
        phase: 'Chuẩn bị',
        technique: 'Sàng lọc hệ thống GALS (Gait, Arms, Legs, Spine)',
        techniqueDetails: [
          'Hỏi 3 câu hỏi sàng lọc: Bác có đau hoặc cứng khớp/cơ/lưng không? Bác có tự mặc quần áo được không? Bác có tự đi lên xuống cầu thang được không?',
          'Quan sát dáng đi (Gait): Đều, nhịp nhàng, sải chân cân đối, đánh tay tự nhiên, không đi khập khiễng.',
          'Quan sát cột sống (Spine): Độ cong sinh lý cổ, ngực, thắt lưng; độ thẳng trục sau lưng.',
          'Khám chi trên (Arms): Giơ tay chạm sau đầu, đưa tay sau lưng, nắm tay, chạm đầu ngón tay cái vào các ngón.',
          'Khám chi dưới (Legs): Gập gối, xoay háng trong ngoài, ấn các khớp bàn ngón chân.'
        ],
        normalFindings: '3 câu hỏi âm tính, dáng đi tự nhiên vững vàng, biên độ vận động các khớp tối đa không đau.',
        abnormalFindings: [
          'Dáng đi giảm đau (Antalgic gait): Rút ngắn thời gian chịu lực bên chân đau',
          'Cứng khớp buổi sáng kéo dài > 30-60 phút: Viêm khớp dạng thấp (RA), Viêm cột sống dính khớp',
          'Cứng khớp sau nghỉ ngơi giảm nhanh trong vài phút: Thoái hoá khớp (Osteoarthritis - OA)'
        ],
        clinicalSignificance: 'GALS là công cụ sàng lọc nhanh 2 phút phát hiện 95% bất thường cơ xương khớp.'
      },
      {
        phase: 'Khám Khớp Vai',
        technique: 'Khám chóp xoay và độ linh hoạt khớp vai',
        techniqueDetails: [
          'Nhìn: Teo cơ delta, teo cơ trên gai/dưới gai, biến dạng khớp cùng đòn (AC joint separation).',
          'Sờ: Khớp ức đòn, khớp cùng đòn, mỏm cùng vai, rãnh gân cơ nhị đầu.',
          'Cử động: Gấp (180°), duỗi (60°), dạng (180°), áp, xoay trong (đưa tay sau lưng chạm bả vai), xoay ngoài (khuỷu áp sườn, xoay cẳng tay ra ngoài).',
          'Nghiệm pháp vòng cung đau (Painful Arc Test): Đưa tay dạng từ 0° lên 180°. Đau xuất hiện ở khoảng 60°-120° gợi ý viêm gân chóp xoay/chèn ép dưới mỏm cùng vai (Impingement syndrome).',
          'Nghiệm pháp Neer: Giữ xương bả vai cố định, nâng cánh tay xoay trong lên cao tối đa.',
          'Nghiệm pháp Hawkins-Kennedy: Gấp vai 90°, khuỷu 90°, xoay trong cánh tay cưỡng bức.',
          'Nghiệm pháp Empty Can (Jobe test): Dang tay 90°, đưa ra trước 30°, ngón cái chúc xuống như dốc lon nước ngọt, ấn cánh tay xuống bệnh nhân chống lại (khám cơ trên gai Supraspinatus).'
        ],
        normalFindings: 'Khớp vai vận động mềm mại đối xứng không đau, không có tiếng lạo xạo hay chèn ép.',
        abnormalFindings: [
          'Đông cứng khớp vai (Frozen shoulder / Adhesive capsulitis): Mất hoàn toàn biên độ vận động cả chủ động và thụ động, đặc biệt mất xoay ngoài',
          'Rách gân trên gai (Rotator cuff tear): Nghiệm pháp rơi cánh tay (Drop Arm test dương tính - không giữ được tay hạ từ 90° xuống)',
          'Viêm gân cơ nhị đầu: Ấn đau chói rãnh nhị đầu, nghiệm pháp Yergason hoặc Speed (+)'
        ],
        clinicalSignificance: 'Phân định chính xác bệnh lý chóp xoay, viêm bao khớp đông cứng hay thoái hoá khớp.'
      },
      {
        phase: 'Khám Khớp Gối',
        technique: 'Đánh giá tràn dịch, dây chằng và sụn chêm',
        techniqueDetails: [
          'Nhìn: Trục chân (chân chữ O - Genu varum, chân chữ X - Genu valgum), sưng các túi cùng hoạt dịch trên bánh chè, teo cơ tứ đầu đùi (Vastus medialis).',
          'Dấu hiệu bập bềnh xương bánh chè (Patellar Tap test): Vuốt dồn dịch từ túi cùng trên bánh chè xuống, dùng ngón trỏ ấn thẳng xương bánh chè xuống rãnh ròng rọc lồi cầu đùi. Cảm giác xương chạm đáy rồi nổi lên -> Tràn dịch khớp gối lượng vừa-nhiều.',
          'Dấu hiệu sóng vỗ / gợn sóng (Bulge / Ripple sign): Vuốt dịch mặt trong lên trên, ấn nhẹ mặt ngoài -> vệt sóng dịch phồng ở mặt trong -> Tràn dịch lượng ít (10-15ml).',
          'Dây chằng chéo trước (ACL): Nghiệm pháp Lachman (gấp gối 20-30°, kéo xương chày ra trước cố định xương đùi - nhạy nhất) và Dấu ngăn kéo trước (Anterior Drawer test).',
          'Dây chằng chéo sau (PCL): Dấu sụt lùi xương chày (Posterior sag) và Dấu ngăn kéo sau.',
          'Dây chằng bên (MCL & LCL): Nghiệm pháp bẻ khớp gối sang ngoài (Valgus stress) và sang trong (Varus stress).',
          'Sụn chêm (Meniscus): Nghiệm pháp McMurray (gấp gối tối đa, xoay cẳng chân và duỗi từ từ, cảm nhận tiếng lục khục hoặc đau ở khe khớp).'
        ],
        normalFindings: 'Không tràn dịch khớp, các dây chằng vững chắc có điểm dừng rõ (firm end-point), sụn chêm trơn tru.',
        abnormalFindings: [
          'Đứt dây chằng chéo trước (ACL rupture): Lachman (+) có độ dịch chuyển ra trước nhiều, mất điểm dừng cứng',
          'Rách sụn chêm: McMurray (+), ấn đau chói chính xác dọc khe khớp trong/ngoài',
          'Kén Baker vùng khoeo: Khối nang căng ở hố khoeo, có thể vỡ gây viêm tĩnh mạch giả (pseudothrombophlebitis)'
        ],
        clinicalSignificance: 'Chẩn đoán xác định các tổn thương chấn thương thể thao thường gặp nhất.'
      },
      {
        phase: 'Khám Cột Sống Thắt Lưng',
        technique: 'Đánh giá độ giãn cột sống và chèn ép rễ thần kinh',
        techniqueDetails: [
          'Nhìn: Quan sát độ ưỡn cột sống thắt lưng, vẹo cột sống phản ứng chống đau.',
          'Sờ: Ấn dọc các gai sống và khối cơ cạnh sống tìm điểm đau chói và co cứng cơ.',
          'Đo độ giãn thắt lưng (Schober Test): Đánh dấu gai sống S1 (ngang gai chậu sau trên) và một điểm cách 10 cm lên trên. Yêu cầu bệnh nhân cúi gập người hết cỡ chân thẳng. Đo lại khoảng cách: Bình thường tăng thêm >= 5 cm (tổng >= 15 cm). Nếu tăng < 4 cm -> Hạn chế giãn cột sống thắt lưng.',
          'Nghiệm pháp Lasegue (Straight Leg Raise - SLR): Bệnh nhân nằm ngửa, nâng thẳng chân lên. Dương tính khi đau buốt lan dọc từ mông xuống cẳng chân theo rễ L5/S1 ở góc < 60°.',
          'Dấu hiệu Bragard: Hạ chân xuống một chút dưới mức góc đau của Lasegue rồi gập thụ động bàn chân lên. Đau nhói tái phát -> Khẳng định chèn ép rễ thần kinh toạ.',
          'Kiểm tra rễ: L4 (đi bằng gót, phản xạ gân bánh chè), L5 (đi bằng gót, duỗi ngón cái), S1 (đi bằng mũi chân, phản xạ gân gót).'
        ],
        normalFindings: 'Độ giãn Schober >= 5 cm, Lasegue đạt 80-90° không đau lan, đi gót và mũi chân bình thường.',
        abnormalFindings: [
          'Schober giảm < 4 cm: Viêm cột sống dính khớp (Ankylosing Spondylitis)',
          'Lasegue (+) ở góc < 60° kèm Bragard (+): Thoát vị đĩa đệm chèn ép rễ thần kinh toạ',
          'Hội chứng đuôi ngựa (Cauda Equina Syndrome): Mất cảm giác vùng yên ngựa (Saddle anaesthesia), bí tiểu hoặc tiểu không tự chủ, mất trương lực cơ thắt hậu môn -> CẤP CỨU NGOẠI THẦN KINH!'
        ],
        clinicalSignificance: 'Phát hiện sớm hội chứng chèn ép rễ thần kinh và cấp cứu chùm đuôi ngựa tránh tàn phế.'
      }
    ],
    highYieldPoints: [
      'Bàn tay trong Thoái hoá khớp vs Viêm khớp dạng thấp: Thoái hoá khớp tổn thương khớp ngón xa DIP (hạt Heberden) và khớp ngón gần PIP (hạt Bouchard). Viêm khớp dạng thấp tổn thương đối xứng khớp cổ tay, khớp bàn ngón MCP, khớp ngón gần PIP, KHÔNG BAO GIỜ tổn thương khớp ngón xa DIP đơn độc.',
      'Dấu hiệu viêm gân De Quervain (Finkelstein test): Bệnh nhân nắm ngón tay cái trong lòng 4 ngón tay còn lại, người khám bẻ nghiêng cổ tay về phía xương trụ -> Đau chói vùng mỏm trâm quay.',
      'Dấu hiệu Tinel & Nghiệm pháp Phalen trong Hội chứng ống cổ tay (Carpal Tunnel Syndrome - ép dây thần kinh giữa): Gõ mặt lòng cổ tay hoặc chụm 2 mu bàn tay gập 90° trong 60 giây gây tê buốt ngón cái, trỏ, giữa.'
    ],
    specialSigns: [
      {
        name: 'Nghiệm pháp Schober (Schober’s Test)',
        description: 'Đo độ giãn nở cột sống thắt lưng khi cúi gập người (điểm mốc S1 và điểm 10cm phía trên).',
        indicates: 'Viêm cột sống dính khớp (Axial Spondyloarthritis) nếu tăng < 4 cm.',
        clinicalPearl: 'Là chỉ số khách quan nhất để theo dõi tiến triển cứng cột sống theo thời gian.'
      },
      {
        name: 'Nghiệm pháp Lachman',
        description: 'Gấp gối 20-30°, tay trái giữ chắc đầu dưới xương đùi, tay phải kéo đầu trên xương chày ra trước.',
        indicates: 'Đứt dây chằng chéo trước (Anterior Cruciate Ligament - ACL).',
        clinicalPearl: 'Có độ nhạy và độ đặc hiệu cao hơn nhiều so với nghiệm pháp ngăn kéo trước vì tránh được sự co cơ chống đối của cơ gân khoeo.'
      },
      {
        name: 'Dấu hiệu Phalen (Phalen’s Test)',
        description: 'Ép mu hai bàn tay vào nhau sao cho cổ tay gập 90 độ, giữ yên trong 60 giây.',
        indicates: 'Chèn ép thần kinh giữa trong hội chứng ống cổ tay (Carpal Tunnel Syndrome).',
        clinicalPearl: 'Tái tạo lại cảm giác tê rần như kiến bò ở vùng phân bố cảm giác của dây thần kinh giữa (ngón I, II, III và nửa ngoài ngón IV).'
      }
    ],
    references: "Bates' Guide to Physical Examination, 13th Ed; Macleod's Clinical Examination, 14th Ed."
  },
  {
    id: 'heent-exam',
    system: 'heent',
    title: 'Khám Đầu Mặt Cổ & Tuyến Giáp',
    subtitle: 'Head, Neck, Thyroid & HEENT - Bates Ch.11-14 & Macleod Ch.8-10',
    overview: 'Khám vùng đầu mặt cổ tích hợp đánh giá tuyến giáp, chuỗi hạch bạch huyết cổ, khoang miệng, mắt và tai mũi họng nhằm phát hiện các bệnh lý nội tiết, nhiễm trùng và u bướu ác tính.',
    anatomyPhysiologyPoints: [
      'Tuyến giáp nằm dưới sụn nhẫn, eo tuyến giáp vắt ngang qua vòng sụn khí quản 2-4.',
      'Tuyến giáp dính chặt vào sụn khí quản nên di động theo nhịp nuốt.',
      'Chuỗi hạch bạch huyết vùng cổ chia thành 6 nhóm giải phẫu học; hạch Virchow (Troisier sign) ở hố thượng đòn trái dẫn lưu dịch bạch huyết từ ổ bụng/dạ dày.',
      'Sụn thanh thiệt và nẹp sụn bảo vệ đường thở khi nuốt.'
    ],
    equipmentNeeded: [
      'Ly nước uống cho nghiệm pháp nuốt',
      'Đèn pin soi họng',
      'Cây đè lưỡi gỗ dùng một lần',
      'Ống soi tai (Otoscope) và loa soi tai các cỡ'
    ],
    steps: [
      {
        phase: 'Chuẩn bị',
        technique: 'Chuẩn bị bệnh nhân và quan sát đầu cổ',
        techniqueDetails: [
          'Bệnh nhân ngồi trên ghế đối diện người khám, cổ bộc lộ hoàn toàn đến xương ức.',
          'Quan sát tổng thể khuôn mặt: Nét mặt vô cảm phù niêm (Myxoedema trong suy giáp), mắt trợn lồi (Exophthalmos trong Basedow/Graves), vẻ mặt trăng tròn đỏ (Moon face trong Cushing).',
          'Quan sát tư thế đầu: Cổ nghiêng vẹo (Torticollis).'
        ],
        normalFindings: 'Khuôn mặt cân đối, không phù, da niêm mạc bình thường.',
        abnormalFindings: [
          'Vẻ mặt nhiễm trùng nhiễm độc',
          'Mặt tròn đỏ như mặt trăng (Moon facies): Hội chứng Cushing',
          'Phù mi mắt, da khô sáp vàng, rụng đuôi lông mày (Dấu hiệu Hertoghe): Suy giáp nặng'
        ],
        clinicalSignificance: 'Bộ mặt nội tiết mang tính chất chẩn đoán nhận diện ngay từ cái nhìn đầu tiên (Spot diagnosis).'
      },
      {
        phase: 'Khám Tuyến Giáp (Thyroid Exam)',
        technique: 'Nhìn, Sờ từ phía sau, Gõ và Nghe tiếng thổi',
        techniqueDetails: [
          'Nhìn: Đưa ly nước cho bệnh nhân, yêu cầu ngửa cổ nhẹ và uống một ngụm nước rồi nuốt. Quan sát bướu giáp di động lên xuống theo nhịp nuốt.',
          'Sờ từ phía sau (Bimanual Palpation): Bác sĩ đứng sau lưng bệnh nhân, đặt 2 tay vòng qua cổ, ngón trỏ đặt ngay dưới sụn nhẫn. Bảo bệnh nhân nuốt một ngụm nước: Cảm nhận eo tuyến giáp trượt dưới ngón tay. Lần lượt nghiêng nhẹ đầu sang phải để sờ thùy phải, nghiêng sang trái sờ thùy trái.',
          'Đánh giá tính chất bướu: Độ lớn, mật độ (mềm, chắc, cứng như đá), bề mặt (nhẵn hay nhiều nhân), ranh giới, có đau không, có tụt sau xương ức không.',
          'Nghe: Đặt màng ống nghe lên 2 thùy tuyến giáp tìm tiếng thổi tâm thu (Bruit do tăng sinh mạch máu trong bệnh Basedow).',
          'Dấu hiệu Pemberton: Yêu cầu bệnh nhân giơ thẳng hai tay lên cao sát hai tai trong 1 phút. Nếu mặt đỏ bừng tím tái, tĩnh mạch cổ nổi to -> Bướu giáp chìm sau xương ức chèn ép tĩnh mạch chủ trên.'
        ],
        normalFindings: 'Tuyến giáp không to hoặc sờ thấy mơ hồ eo giáp mềm mại, di động nhịp nhàng theo nuốt, không tiếng thổi.',
        abnormalFindings: [
          'Bướu giáp lan tỏa, có rung miêu và tiếng thổi tâm thu liên tục: Bệnh Basedow (Graves’ disease)',
          'Nhân giáp đơn độc cứng chắc dính vào cấu trúc xung quanh, không di động khi nuốt: Nghi ngờ Ung thư tuyến giáp',
          'Bướu giáp đa nhân to ấn đau lan toả sau đợt sốt/nhiễm virus: Viêm giáp bán cấp De Quervain',
          'Dấu hiệu Pemberton (+): Bướu giáp thòng trung thất chèn ép khoang trên lồng ngực'
        ],
        clinicalSignificance: 'Phát hiện bướu giáp nhiễm độc và sàng lọc nhân giáp ác tính cần sinh thiết chọc hút tế bào (FNA).'
      },
      {
        phase: 'Khám Hạch Cổ (Cervical Lymph Nodes)',
        technique: 'Sờ hệ thống 10 nhóm hạch cổ theo trình tự chuẩn',
        techniqueDetails: [
          'Bác sĩ đứng phía sau bệnh nhân, dùng các đầu ngón tay day xoay nhẹ nhàng trên da theo tuần tự:',
          ' 1. Hạch dưới cằm (Submental)',
          ' 2. Hạch dưới hàm (Submandibular)',
          ' 3. Hạch trước tai (Preauricular)',
          ' 4. Hạch sau tai (Postauricular / Mastoid)',
          ' 5. Hạch chẩm (Occipital)',
          ' 6. Hạch amidan góc hàm (Tonsillar / Jugulodigastric)',
          ' 7. Chuỗi hạch cổ nông (Superficial cervical)',
          ' 8. Chuỗi hạch cổ sâu (Deep cervical chain) dọc cơ ức đòn chũm',
          ' 9. Hạch tam giác cổ sau (Posterior triangle)',
          ' 10. Hạch trên đòn (Supraclavicular nodes) hai bên.',
          'Đặc biệt lưu ý hạch Virchow ở hố thượng đòn trái.'
        ],
        normalFindings: 'Các hạch không sờ thấy hoặc nhỏ < 0.5 cm, mềm, di động tự do, không đau.',
        abnormalFindings: [
          'Hạch Virchow sưng cứng, không đau ở hố thượng đòn trái: Di căn ung thư đường tiêu hóa (Dạ dày, thực quản, đại tràng)',
          'Chuỗi hạch cổ sưng to, dính chùm, nhuyễn hoá rò mủ: Lao hạch (Scrofuloderma)',
          'Hạch to cứng như đá, dính chặt vào cơ và da: Di căn ung thư vùng đầu cổ',
          'Hạch to mật độ đàn hồi như cao su (rubber-like), không đau: U lympho (Lymphoma)'
        ],
        clinicalSignificance: 'Hạch cổ là trạm gác chẩn đoán của nhiễm trùng vùng tai mũi họng và di căn ung thư toàn thân.'
      },
      {
        phase: 'Khám Mắt & Mi Mắt',
        technique: 'Tìm dấu hiệu bệnh mắt tuyến giáp và tổn thương đồng tử',
        techniqueDetails: [
          'Lồi mắt (Exophthalmos / Proptosis): Nhìn từ đỉnh đầu xuống hoặc đo bằng thước Hertel để phát hiện củng mạc lộ phía trước.',
          'Co rút mi trên (Lid retraction / Dalrymple sign): Củng mạc lộ rõ phía trên rìa giác mạc ở tư thế nhìn thẳng.',
          'Dấu hiệu mi trễ (Lid lag / von Graefe sign): Bảo bệnh nhân nhìn theo ngón tay di chuyển chậm từ trên xuống dưới, mi mắt trên hạ xuống chậm hơn nhãn cầu làm lộ củng mạc trắng.',
          'Hội chứng Horner (Tổn thương giao cảm cổ): Tam chứng Sụp mi nhẹ (Ptosis) + Co đồng tử (Miosis) + Giảm tiết mồ hôi nửa mặt (Anhidrosis).'
        ],
        normalFindings: 'Mi trên che phủ khoảng 1-2 mm cực trên giác mạc khi nhìn thẳng. Mi hạ nhịp nhàng theo nhãn cầu.',
        abnormalFindings: [
          'Lồi mắt + Co rút mi + Giảm vận nhãn: Bệnh mắt Basedow (Graves’ ophthalmopathy)',
          'Hội chứng Horner: U đỉnh phổi Pancoast chèn ép hạch giao cảm sao cổ'
        ],
        clinicalSignificance: 'Phát hiện sớm biến chứng mắt đe dọa thị lực của Basedow và u chèn ép giao cảm ngực trên.'
      }
    ],
    highYieldPoints: [
      'Khám tuyến giáp: Luôn chuẩn bị sẵn cốc nước cho bệnh nhân nuốt, vì việc nuốt giúp khẳng định khối u có thuộc tuyến giáp hay không.',
      'Hạch Virchow (Troisier’s sign): Hạch thượng đòn trái to cứng là dấu hiệu báo động đỏ của ung thư dạ dày di căn theo ống ngực.',
      'Khám tai bằng Otoscope: Ở người lớn, kéo vành tai LÊN TRÊN và RA SAU để làm thẳng ống tai ngoài. Ở trẻ nhỏ dưới 3 tuổi, kéo vành tai XUỐNG DƯỚI và RA SAU.'
    ],
    specialSigns: [
      {
        name: 'Dấu hiệu Pemberton',
        description: 'Bệnh nhân giơ 2 tay thẳng lên cao sát đầu trong 1 phút. Xuất hiện sung huyết đỏ bừng mặt, tĩnh mạch cổ nổi phồng và khó thở nhẹ.',
        indicates: 'Bướu giáp thòng sau xương ức chèn ép lối vào lồng ngực (Thoracic inlet obstruction).',
        clinicalPearl: 'Là nghiệm pháp vật lý học đơn giản giúp phát hiện bướu giáp sau xương ức trước khi có phim CT.'
      },
      {
        name: 'Dấu hiệu Chvostek & Trousseau',
        description: 'Chvostek: Gõ nhẹ vùng trước nắp tai trên đường đi dây VII gây giật mép và môi cùng bên. Trousseau: Bơm băng đo HA trên HA tâm thu 20 mmHg trong 3 phút gây co cứng bàn tay đỡ đẻ.',
        indicates: 'Hạ canxi máu (Hypocalcaemia) sau phẫu thuật cắt giáp phạm vào tuyến cận giáp.',
        clinicalPearl: 'Dấu hiệu Trousseau nhạy và đặc hiệu hơn dấu hiệu Chvostek rất nhiều.'
      },
      {
        name: 'Hạch Virchow (Troisier’s Sign)',
        description: 'Sờ thấy một hạch cứng chắc, không đau, cố định nằm ở hố thượng đòn bên trái.',
        indicates: 'Di căn ung thư ổ bụng qua đường ống ngực (kinh điển là ung thư biểu mô tuyến dạ dày).',
        clinicalPearl: 'Bất kỳ hạch thượng đòn nào cũng phải coi là ác tính cho đến khi sinh thiết chứng minh điều ngược lại.'
      }
    ],
    references: "Bates' Guide to Physical Examination, 13th Ed; Macleod's Clinical Examination, 14th Ed."
  },
  {
    id: 'general-exam',
    system: 'general',
    title: 'Khám Toàn Trạng, Bàn Tay, Hạch & Dấu Hiệu Sinh Tồn',
    subtitle: 'General Aspects of Examination - Macleod Ch.3 & Bates Ch.4',
    overview: 'Khám toàn trạng bắt đầu ngay từ giây phút đầu tiên bác sĩ nhìn thấy và bắt tay người bệnh. Đánh giá dáng đi, tri giác, thể trạng dinh dưỡng, bàn tay, móng tay, hạch bạch huyết toàn thân, mức độ nước-phù và các dấu hiệu sinh tồn cốt lõi.',
    anatomyPhysiologyPoints: [
      'Góc Lovibond bình thường giữa nền móng và nếp móng là < 160 độ; khi bị ngón tay dùi trống, góc này tù ra > 180 độ.',
      'Hạch bạch huyết thượng đòn trái dẫn lưu toàn bộ tạng trong ổ bụng qua ống ngực (thoracic duct).',
      'Phù ấn lõm (Pitting oedema) xuất hiện khi thể tích dịch gian bào tăng vượt quá khả năng hấp thu của mao mạch và mạch bạch huyết (tăng áp lực thủy tĩnh hoặc giảm áp lực keo oncotic).',
      'Phù không ấn lõm (Non-pitting oedema) do ứ đọng mucopolysaccharide mô kẽ (phù niêm myxoedema trong suy giáp) hoặc tắc nghẽn bạch huyết (lymphoedema).'
    ],
    equipmentNeeded: [
      'Huyết áp kế cơ hoặc điện tử chuẩn hóa có băng đo phù hợp chu vi cánh tay',
      'Đồng hồ có kim giây để đếm mạch và nhịp thở trong 60 giây trọn vẹn',
      'Nhiệt kế y tế (thủy ngân hoặc điện tử)',
      'Máy đo SpO2 kẹp ngón tay',
      'Đèn pin khám y khoa soi hạch và niêm mạc',
      'Cân sức khỏe và thước đo chiều cao để tính BMI'
    ],
    steps: [
      {
        phase: 'Quan sát ban đầu',
        technique: 'Đánh giá dáng đi, thể trạng, tư thế và bắt tay người bệnh',
        techniqueDetails: [
          'Dáng đi & Tư thế: Dáng đi bước nhỏ dồn dập (Parkinson), dáng đi vạt cỏ nửa người (di chứng đột quỵ), dáng đi loạng choạng thất điều (tiểu não).',
          'Thể trạng & BMI: Suy kiệt gầy mòn (Cachexia - K, suy tim nặng, lao) vs Béo phì trung tâm (Cushing).',
          'Bắt tay (Handshake clues): Tay lạnh ẩm (lo âu), tay nóng ẩm kèm run (cường giáp), tay thô to ẩm nhão (to đầu chi acromegaly), chậm nhả tay sau nắm (loạn dưỡng cơ myotonia).'
        ],
        normalFindings: 'Bệnh nhân tỉnh táo, tiếp xúc tốt, dáng đi vững vàng, thể trạng cân đối (BMI 18.5 - 22.9 theo chuẩn châu Á IDI & WPRO).',
        abnormalFindings: [
          'Hội chứng suy mòn suy kiệt (Cachexia): Thái dương hóp sâu, hốc mắt trũng, lộ rõ các xương sườn',
          'Vẻ mặt Cushingoid: Mặt tròn đỏ, gù trâu sau gáy, rạn da tím'
        ],
        clinicalSignificance: 'Cung cấp chẩn đoán "từ cái nhìn đầu tiên" (spot diagnosis) trước khi đặt ống nghe vào người bệnh.'
      },
      {
        phase: 'Dấu hiệu sinh tồn',
        technique: 'Đo lường có hệ thống 5 dấu hiệu sinh tồn chuẩn mực',
        techniqueDetails: [
          'Mạch (Pulse): Bắt mạch quay 2 bên trong 60 giây. Đánh giá tần số, nhịp điệu (đều hay loạn nhịp hoàn toàn), độ nảy và biên độ.',
          'Huyết áp (Blood Pressure): Đo ở tư thế ngồi nghỉ ít nhất 5 phút, cánh tay ngang mức tim. Bơm phồng túi hơi trên mức mất mạch quay 30 mmHg. Xả hơi chậm 2-3 mmHg/giây. Xác định Pha I (HA tâm thu) và Pha V (HA tâm trương). Đo cả 2 tay và đo tư thế đứng nếu nghi ngờ tụt HA tư thế.',
          'Nhịp thở (Respiratory Rate): Đếm kín đáo khi đang giả vờ bắt mạch để tránh bệnh nhân tự điều chỉnh nhịp thở.',
          'Nhiệt độ (Temperature): Đo nách hoặc miệng. Sốt nhẹ (37.5 - 38°C), Sốt vừa (38 - 39°C), Sốt cao (> 39°C).',
          'SpO2: Đánh giá độ bão hòa oxy máu mao mạch và biên độ sóng xung.'
        ],
        normalFindings: 'Mạch 60-90 ck/phút, đều, nảy rõ. HA 100-120 / 60-80 mmHg. Nhịp thở 14-18 ck/phút êm dịu. Thân nhiệt 36.5 - 37.2°C. SpO2 ≥ 96% khí trời.',
        abnormalFindings: [
          'Mạch loạn nhịp hoàn toàn (Irregularly irregular): Rung nhĩ (AF)',
          'Tụt huyết áp tư thế: HA tâm thu giảm ≥ 20 mmHg hoặc HA tâm trương giảm ≥ 10 mmHg sau 3 phút đứng dậy',
          'Kiểu thở Kussmaul (thở sâu nhanh liên tục): Toan chuyển hóa (DKA, suy thận)',
          'Kiểu thở Cheyne-Stokes (thở nhanh sâu rồi giảm dần kèm ngưng thở chu kỳ): Suy tim nặng, tổn thương bán cầu não 2 bên'
        ],
        clinicalSignificance: 'Sinh hiệu là thước đo phản ánh tính mạng người bệnh; bất kỳ sinh hiệu bất thường nào đều phải ưu tiên xử trí cấp cứu.'
      },
      {
        phase: 'Bàn tay & Móng',
        technique: 'Khám chi tiết bàn tay, móng và lòng bàn tay',
        techniqueDetails: [
          'Ngón tay dùi trống (Clubbing): Tìm mất góc Lovibond (> 180°), dấu hiệu cửa sổ Schamroth (+), móng cong gồ lên như mặt kính đồng hồ, đầu ngón tay phình to như dùi trống.',
          'Móng tay hình thìa (Koilonychia): Móng lõm lòng thuyền, giữ được giọt nước -> Thiếu máu thiếu sắt mạn tính.',
          'Móng trắng (Leuconychia / Terry’s nails): Nền móng trắng đục mất hồng cầu, dải đỏ hẹp ở ngọn móng -> Hạ albumin máu (xơ gan, hội chứng thận hư).',
          'Xuất huyết dạng mảnh dằm (Splinter haemorrhages): Vệt máu nâu đỏ dọc theo trục móng -> Viêm nội tâm mạc nhiễm khuẩn, viêm mạch hệ thống.',
          'Đường rãnh ngang Beau (Beau’s lines): Rãnh ngang trên toàn bộ các móng tay do ngừng phát triển móng tạm thời sau bệnh cấp tính nặng.',
          'Co rút gân lòng bàn tay Dupuytren: Dày sừng cục và co rút gân gập ngón nhẫn và ngón út -> Xơ gan do rượu, lao động nặng lặp lại.'
        ],
        normalFindings: 'Móng hồng, bóng, góc Lovibond < 160°, khe cửa sổ Schamroth hình thoi rõ ràng. Lòng bàn tay mềm mại.',
        abnormalFindings: [
          'Ngón tay dùi trống độ 1-5: Ung thư phổi, giãn phế quản, xơ phổi, tim bẩm sinh tím, viêm nội tâm mạc',
          'Móng hình thìa: Thiếu máu thiếu sắt nặng',
          'Bàn tay son (Palmar erythema): Xơ gan ứ mật, thai kỳ, cường giáp'
        ],
        clinicalSignificance: 'Bàn tay là tấm gương phản chiếu các bệnh lý nội tạng toàn thân mạn tính.'
      },
      {
        phase: 'Khám Hạch Bạch Huyết',
        technique: 'Sờ hạch bạch huyết có hệ thống từ đầu cổ đến bẹn',
        techniqueDetails: [
          'Tư thế: Bác sĩ đứng sau lưng hoặc trước mặt bệnh nhân, dùng các đầu ngón tay day nhẹ xoay tròn trên mặt phẳng cơ và xương nâng đỡ bên dưới.',
          'Trình tự khám hạch vùng đầu cổ: Hạch chẩm -> Hạch sau tai (chũm) -> Hạch trước tai -> Hạch dưới hàm -> Hạch dưới cằm -> Chuỗi cổ nông (dọc cơ ức đòn chũm) -> Chuỗi cổ sâu -> Tam giác cổ sau -> Hố thượng đòn (đặc biệt hạch Virchow bên trái).',
          'Khám hạch nách: Nâng cánh tay bệnh nhân, sờ 5 nhóm (đỉnh, trước ngực, sau dưới vai, ngoài cánh tay, trung tâm).',
          'Khám hạch bẹn: Sờ nhóm nằm ngang dọc dây chằng bẹn và nhóm nằm dọc tĩnh mạch hiển lớn.',
          'Đặc điểm cần mô tả khi phát hiện hạch: Vị trí, số lượng, kích thước (cm), mật độ (mềm, chắc, cứng như đá), bề mặt, ranh giới, độ di động với mô xung quanh, có đau khi sờ không, da bao phủ có đỏ nóng không.'
        ],
        normalFindings: 'Các hạch bạch huyết không sờ thấy hoặc sờ thấy vài hạch nhỏ < 1cm ở cổ/bẹn, mềm, ranh giới rõ, di động tự do, không đau.',
        abnormalFindings: [
          'Hạch cứng như đá, cố định, không đau: Di căn ung thư di căn (Carcinoma metastasis)',
          'Hạch to mềm như cao su (rubbery), dính chùm: U lympho ác tính (Hodgkin hoặc Non-Hodgkin Lymphoma)',
          'Hạch sưng to, nóng đỏ đau, dò mủ: Viêm hạch nhiễm trùng cấp hoặc lao hạch (Scrofula)',
          'Hạch Virchow (Troisier sign): Hạch thượng đòn trái to cứng gợi ý K dạ dày/ổ bụng'
        ],
        clinicalSignificance: 'Phân biệt hạch viêm phản ứng lành tính với bệnh lý ác tính hệ tạo máu hoặc di căn ung thư biểu mô.'
      },
      {
        phase: 'Đánh giá Phù & Tình trạng nước',
        technique: 'Khám phù ngoại biên và dấu hiệu mất nước',
        techniqueDetails: [
          'Khám phù ngoại biên: Dùng ngón tay cái ấn chắc chắn trên nền xương cứng (mặt trước trong xương chày, mắt cá trong, hoặc vùng xương cùng cụt nếu bệnh nhân nằm liệt giường) trong ít nhất 5 giây rồi thả ra.',
          'Phân biệt Phù ấn lõm (Pitting) vs Phù không ấn lõm (Non-pitting): Nếu để lại vết lõm tồn tại vài chục giây -> Pitting. Nếu đàn hồi trở lại ngay hoặc da dày cứng sần sùi vỏ cam -> Non-pitting.',
          'Đánh giá tình trạng mất nước: Nếp véo da vùng cẳng tay hoặc bụng (Skin turgor) biến mất chậm > 2 giây, niêm mạc lưỡi khô nứt, mắt trũng sâu, tĩnh mạch mu bàn tay xẹp lép.'
        ],
        normalFindings: 'Không phù, không để lại vết lõm khi ấn xương chày. Da đàn hồi tốt, nếp véo da biến mất tức thì, lưỡi ẩm ướt.',
        abnormalFindings: [
          'Phù ấn lõm mềm 2 bên chân đối xứng: Suy tim sung huyết, xơ gan mất bù, hội chứng thận hư, suy dinh dưỡng',
          'Phù ấn lõm 1 bên chân kèm đau bắp chân: Huyết khối tĩnh mạch sâu (DVT) hoặc viêm mô tế bào',
          'Phù không ấn lõm kèm da khô rụng tóc: Phù niêm (Myxoedema) trong suy giáp nặng',
          'Phù không ấn lõm sưng to chân voi: Phù mạch bạch huyết (Lymphoedema do giun chỉ hoặc sau phẫu thuật vét hạch)'
        ],
        clinicalSignificance: 'Định hướng nhanh chóng cơ chế bệnh sinh của ứ dịch hay giảm thể tích nội mạch.'
      }
    ],
    highYieldPoints: [
      'Nghiệm pháp Cửa sổ Schamroth: Áp 2 mặt lưng móng tay trỏ vào nhau. Ở người bình thường xuất hiện khe hở hình thoi nhỏ. Khi bị ngón tay dùi trống, khe hở này biến mất hoàn toàn.',
      'Đo huyết áp: Bao đo quá nhỏ so với bắp tay sẽ làm số đo HA cao giả tạo (overestimation); bao đo quá to sẽ làm HA thấp giả tạo.',
      'Run vỗ (Asterixis / Flapping tremor): Duỗi thẳng 2 tay ra trước và gập mu bàn tay tối đa trong 30 giây. Bàn tay giật nảy mất trương lực đột ngột -> Gặp trong Hôn mê gan, Suy hô hấp tăng CO2 máu (CO2 narcosis), Suy thận tăng urê máu.'
    ],
    specialSigns: [
      {
        name: 'Dấu hiệu Cửa sổ Schamroth',
        description: 'Khi áp sát 2 đốt xa của ngón tay đối xứng, khoảng trống hình thoi giữa 2 nền móng bị xóa mờ hoàn toàn.',
        indicates: 'Ngón tay dùi trống (Clubbing) từ giai đoạn 2 trở đi.',
        clinicalPearl: 'Nghiệm pháp nhanh và chuẩn xác nhất tại giường bệnh để phát hiện Clubbing sớm.'
      },
      {
        name: 'Nghiệm pháp Run vỗ (Asterixis / Flapping Tremor)',
        description: 'Bệnh nhân duỗi thẳng 2 tay ra trước, các ngón tay xòe rộng và cổ tay gập mu tối đa. Bàn tay bị giật rũ xuống từng đợt không kiểm soát rồi nảy lên lại.',
        indicates: 'Bệnh não gan (Hepatic encephalopathy), suy thận mạn tăng urê máu hoặc tăng thán khí CO2.',
        clinicalPearl: 'Không phải là một cơn run thực thụ (tremor), mà là sự mất trương lực cơ tư thế từng đợt ngắn (negative myoclonus).'
      },
      {
        name: 'Móng Terry (Terry’s Nails)',
        description: 'Toàn bộ phiến móng có màu trắng đục mờ như kính mài, chỉ chừa lại một dải viền đỏ hồng hẹp 1-2 mm ở đầu xa móng.',
        indicates: 'Xơ gan nặng, suy tim sung huyết hoặc suy dinh dưỡng giảm albumin máu kéo dài.',
        clinicalPearl: 'Khác với móng Lindsay (móng nửa-nửa trong suy thận: 50% gốc móng màu trắng, 50% ngọn móng màu nâu đỏ).'
      }
    ],
    references: "Macleod's Clinical Examination 14th Ed (Chapter 3: General aspects of examination); Bates' Guide to Physical Examination 13th Ed."
  }
];
