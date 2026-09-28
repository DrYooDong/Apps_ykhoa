import { ApproachTopic } from '../types/clinical';

export const APPROACH_TOPICS: ApproachTopic[] = [
  {
    id: 'approach-chest-pain',
    title: 'Tiếp Cận Bệnh Nhân Đau Ngực',
    englishTitle: 'Approach to Chest Pain',
    system: 'cardiovascular',
    urgencyLevel: 'Emergency',
    definition: 'Đau ngực là cảm giác khó chịu, đau tức, đè nặng ở vùng ngực trước, có thể do tổn thương tim mạch, phổi, tiêu hóa, cơ xương hoặc thần kinh.',
    pathophysiology: 'Đau tạng tim (thiếu máu cơ tim) qua sợi giao cảm C7-T4 cho cảm giác mơ hồ, lan lên hàm, cánh tay; đau màng phổi qua dây thần kinh liên sườn và hoành cho cảm giác nhói sắc, tăng khi hít sâu.',
    redFlags: [
      'Đau ngực sau xương ức đè ép dữ dội lan lên hàm, cánh tay trái > 20 phút (Hội chứng vành cấp / STEMI)',
      'Đau ngực xé rách đột ngột lan ra sau lưng giữa hai xương bả vai (Bóc tách động mạch chủ ngực)',
      'Đau ngực kèm tụt huyết áp, nhịp tim nhanh, khó thở đột ngột, SpO2 tụt (Thuyên tắc phổi cấp hoặc Tràn khí màng phổi áp lực)',
      'Nôn dữ dội xong đau ngực dữ dội, tràn khí dưới da vùng cổ (Vỡ thực quản / Hội chứng Boerhaave)',
      'Bệnh nhân vã mồ hôi, da tái lạnh, rối loạn tri giác'
    ],
    keyHistoryQuestions: [
      {
        dimension: 'O - Onset (Khởi phát)',
        question: 'Cơn đau bắt đầu đột ngột dữ dội ngay từ đầu hay tăng dần? Bác đang làm gì khi đau?',
        clinicalMeaning: 'Đau dữ dội đạt đỉnh ngay lập tức gợi ý Bóc tách ĐMC, Thuyên tắc phổi hoặc Tràn khí màng phổi. Đau tăng dần theo kiểu crescendo gợi ý Nhồi máu cơ tim.'
      },
      {
        dimension: 'P - Provoking / Palliating (Yếu tố tăng/giảm)',
        question: 'Đau có tăng khi hít sâu, ho hay xoay trở mình không? Ngồi cúi người ra trước có đỡ không? Dùng thuốc ngậm dưới lưỡi có bớt không?',
        clinicalMeaning: 'Tăng khi hít sâu -> Đau màng phổi (Viêm phổi, PE, Pleurisy). Giảm khi cúi người ra trước -> Viêm màng ngoài tim cấp. Giảm sau ngậm Nitroglycerin 2-5 phút -> Đau thắt ngực do thiếu máu cơ tim.'
      },
      {
        dimension: 'Q - Quality (Tính chất đau)',
        question: 'Bác cảm thấy đau như thế nào: đè nặng như đá đè, bóp nghẹt, xé rách, hay nhói buốt như dao đâm?',
        clinicalMeaning: 'Đè nặng/bóp nghẹt -> Thiếu máu cơ tim (ACS). Xé rách (tearing/ripping) -> Bóc tách ĐMC. Nhói buốt như kim châm/dao đâm -> Màng phổi hoặc thần kinh cơ.'
      },
      {
        dimension: 'R - Radiation (Hướng lan)',
        question: 'Cơn đau có lan đi đâu không? Lên hàm, cổ, vai hay lan xuống cánh tay trái, ra sau lưng?',
        clinicalMeaning: 'Lan hàm, cổ, bờ trong cánh tay trái: ACS. Lan thẳng ra sau lưng giữa hai bả vai: Bóc tách ĐMC.'
      },
      {
        dimension: 'S - Severity (Mức độ đau)',
        question: 'Thang điểm từ 1 đến 10, cơn đau dữ dội mức mấy điểm? Có cảm giác lo âu sợ chết (Angor animi) không?',
        clinicalMeaning: 'Điểm 9-10/10 kèm Angor animi là dấu hiệu cảnh báo NMCT cấp hoặc Bóc tách ĐMC.'
      },
      {
        dimension: 'T - Timing (Thời gian kéo dài)',
        question: 'Cơn đau kéo dài bao lâu: vài giây, 2-10 phút, hay liên tục nhiều giờ?',
        clinicalMeaning: 'Đau thoáng qua vài giây hoặc nhói vài ngày liên tục ít khi là đau thắt ngực. Đau thắt ngực ổn định 2-10 phút. Đau > 20 phút cảnh báo NMCT cấp.'
      }
    ],
    physicalExamFocus: [
      {
        step: 'Sinh hiệu & Tư thế',
        finding: 'Tụt huyết áp + Mạch nhanh + SpO2 giảm',
        meaning: 'Sốc tim, thuyên tắc phổi diện rộng hoặc tràn khí màng phổi áp lực.'
      },
      {
        step: 'Huyết áp 2 tay',
        finding: 'Chênh lệch HA tâm thu giữa 2 tay > 20 mmHg',
        meaning: 'Bóc tách động mạch chủ type A tổn thương thân cánh tay đầu hoặc ĐM dưới đòn T.'
      },
      {
        step: 'Nghe tim',
        finding: 'Tiếng thổi tâm trương mới xuất hiện ở đáy tim',
        meaning: 'Hở van ĐMC cấp do bóc tách ĐMC lan vào gốc van.'
      },
      {
        step: 'Khám ngực & phổi',
        finding: 'Một bên phế trường gõ vang, mất rì rào phế nang, khí quản bị đẩy lệch',
        meaning: 'Tràn khí màng phổi áp lực - Cần chọc kim giải áp khoang màng phổi ngay!'
      },
      {
        step: 'Khám chân',
        finding: 'Một bên bắp chân sưng to, nóng đỏ, ấn đau dọc tĩnh mạch',
        meaning: 'Huyết khối tĩnh mạch sâu (DVT) dẫn tới Thuyên tắc phổi (PE).'
      }
    ],
    differentialDiagnosis: [
      {
        category: 'Nguy hiểm tính mạng - Không được bỏ sót (Rule-Out First)',
        diseases: [
          {
            name: 'Hội chứng vành cấp (STEMI / NSTEMI / Unstable Angina)',
            distinguishingFeatures: 'Đau đè nghẹt sau xương ức > 20 phút, vã mồ hôi, buồn nôn, lan tay trái.',
            initialInvestigation: 'ECG 12 chuyển đạo trong vòng 10 phút, Troponin hs I/T mẫu 0h và 1-2h.',
            priority: 'cannot-miss'
          },
          {
            name: 'Bóc tách động mạch chủ ngực (Aortic Dissection)',
            distinguishingFeatures: 'Đau xé rách khởi phát đột ngột dữ dội lan ra sau lưng, chênh lệch HA 2 tay, tiền sử tăng huyết áp.',
            initialInvestigation: 'Chụp cắt lớp vi tính mạch máu ngực cản quang (CT Angiography). Chống chỉ định dùng thuốc tiêu sợi huyết!',
            priority: 'cannot-miss'
          },
          {
            name: 'Thuyên tắc động mạch phổi (Pulmonary Embolism)',
            distinguishingFeatures: 'Khó thở đột ngột + Đau ngực kiểu màng phổi + Nhịp tim nhanh, yếu tố nguy cơ DVT (bất động, ung thư).',
            initialInvestigation: 'D-dimer (nếu nguy cơ thấp-trung bình), CTA ngực (CTPA), khí máu động mạch, ECG (S1Q3T3).',
            priority: 'cannot-miss'
          },
          {
            name: 'Tràn khí màng phổi áp lực (Tension Pneumothorax)',
            distinguishingFeatures: 'Khó thở cấp dữ dội, lệch khí quản sang bên lành, gõ vang trống, tĩnh mạch cổ nổi, tụt huyết áp.',
            initialInvestigation: 'Chẩn đoán lâm sàng! Không chờ chụp X-quang, chọc kim giải áp khoang liên sườn 2 đường trung đòn ngay.',
            priority: 'cannot-miss'
          },
          {
            name: 'Vỡ thực quản tự phát (Hội chứng Boerhaave)',
            distinguishingFeatures: 'Đau ngực dữ dội sau cơn nôn ói thốc tháo, tràn khí dưới da vùng cổ, tràn khí trung thất.',
            initialInvestigation: 'X-quang ngực, CT ngực uống thuốc cản quang tan trong nước (Gastrografin).',
            priority: 'cannot-miss'
          }
        ]
      },
      {
        category: 'Bệnh lý thường gặp khác (Common Causes)',
        diseases: [
          {
            name: 'Viêm màng ngoài tim cấp (Acute Pericarditis)',
            distinguishingFeatures: 'Đau nhói ngực tăng khi nằm ngửa, giảm rõ rệt khi ngồi cúi người ra trước, tiếng cọ màng tim.',
            initialInvestigation: 'ECG (ST chênh lên lan toả lõm hình đáy chén + PR chênh xuống), Siêu âm tim.',
            priority: 'common'
          },
          {
            name: 'Trào ngược dạ dày thực quản (GERD) / Co thắt thực quản',
            distinguishingFeatures: 'Cảm giác nóng rát sau xương ức sau ăn no hoặc nằm ngửa, ợ chua, giảm khi uống thuốc dạ dày.',
            initialInvestigation: 'Nội soi thực quản dạ dày (OGD), đo pH thực quản.',
            priority: 'common'
          },
          {
            name: 'Viêm khớp ức sườn / Đau cơ thành ngực (Tietze syndrome)',
            distinguishingFeatures: 'Đau nhói nông tại chỗ, ấn tay trực tiếp vào khớp ức sườn tái tạo đúng cơn đau của bệnh nhân.',
            initialInvestigation: 'Khám thực thể ấn đau khu trú, đáp ứng với thuốc giảm đau NSAIDs.',
            priority: 'common'
          }
        ]
      }
    ],
    algorithm: {
      title: 'Lưu đồ Tiếp Cận Đau Ngực Cấp (Chest Pain CDSS)',
      summary: 'Phân tầng nguy cơ đe dọa tính mạng trong 10 phút đầu tiên dựa trên ECG và sinh hiệu',
      startingPoint: 'node-start',
      nodes: [
        {
          id: 'node-start',
          question: 'Bệnh nhân có rối loạn huyết động (Huyết áp < 90, Mạch > 120, SpO2 < 90% hoặc tri giác suy giảm)?',
          options: [
            {
              label: 'CÓ - Nguy kịch (Unstable)',
              targetId: 'node-unstable',
              severity: 'urgent'
            },
            {
              label: 'KHÔNG - Huyết động ổn định',
              targetId: 'node-ecg',
              severity: 'routine'
            }
          ]
        },
        {
          id: 'node-unstable',
          question: 'Xử trí ngay hồi sức ABC: Lập 2 đường truyền lớn, thở oxy, đo ECG tại giường. Khám thấy gì nổi bật?',
          options: [
            {
              label: 'Lồng ngực một bên gõ vang + Lệch khí quản',
              diagnosis: 'Tràn khí màng phổi áp lực (Tension Pneumothorax) -> Chọc kim giải áp KLS 2 đường trung đòn NGAY.',
              severity: 'urgent'
            },
            {
              label: 'Chênh lệch huyết áp 2 tay > 20 mmHg + Đau xé lưng',
              diagnosis: 'Nghi ngờ Bóc tách động mạch chủ ngực -> Hồi sức, kiểm soát HA bằng Esmolol/Labetalol, CTA ngực khẩn cấp.',
              severity: 'urgent'
            },
            {
              label: 'Tụt HA + SpO2 giảm + Chân sưng to (DVT)',
              diagnosis: 'Nghi ngờ Thuyên tắc phổi diện rộng (Massive PE) -> Siêu âm tim tại giường (Bedside Echo), xem xét thuốc tiêu sợi huyết.',
              severity: 'urgent'
            },
            {
              label: 'Tụt huyết áp + ST chênh lên trên ECG',
              diagnosis: 'Nhồi máu cơ tim cấp có sốc tim (Cardiogenic Shock) -> Kích hoạt phòng can thiệp mạch vành (Cathlab) khẩn cấp.',
              severity: 'urgent'
            }
          ]
        },
        {
          id: 'node-ecg',
          question: 'Kết quả ECG 12 chuyển đạo trong 10 phút đầu tiên:',
          options: [
            {
              label: 'ST chênh lên (ST-elevation) ở ít nhất 2 chuyển đạo liên tiếp',
              diagnosis: 'Nhồi máu cơ tim ST chênh lên (STEMI) -> Kích hoạt Cathlab can thiệp PCI thì đầu trong 90-120 phút. Cho Aspirin + Ticagrelor/Clopidogrel + Heparin.',
              severity: 'urgent'
            },
            {
              label: 'ST chênh xuống hoặc T âm sâu đối xứng',
              diagnosis: 'Hội chứng vành cấp không ST chênh lên (NSTEMI / UA) -> Đo Troponin hs, phân tầng thang điểm TIMI/GRACE, dùng thuốc chống đông và kháng kết tập tiểu cầu.',
              severity: 'urgent'
            },
            {
              label: 'ST chênh lên lõm hình thuyền lan toả khắp các chuyển đạo + PR chênh xuống',
              diagnosis: 'Viêm màng ngoài tim cấp (Acute Pericarditis) -> Siêu âm tim, điều trị NSAIDs + Colchicine.',
              severity: 'warning'
            },
            {
              label: 'ECG bình thường hoặc biến đổi không đặc hiệu',
              targetId: 'node-pain-type',
              severity: 'routine'
            }
          ]
        },
        {
          id: 'node-pain-type',
          question: 'Đặc điểm cơn đau ngực của bệnh nhân thế nào?',
          options: [
            {
              label: 'Đau ngực kiểu màng phổi (tăng khi hít sâu/ho) + Khó thở',
              diagnosis: 'Đánh giá nguy cơ Thuyên tắc phổi (Thang điểm Wells score), xét nghiệm D-dimer và chụp CTPA; hoặc Chụp X-quang phổi loại trừ Viêm phổi/Tràn khí màng phổi.',
              severity: 'warning'
            },
            {
              label: 'Ấn vào sụn sườn đau chói tái tạo đúng cơn đau',
              diagnosis: 'Viêm sụn sườn / Đau cơ thành ngực (Costochondritis) -> Trấn an, dùng thuốc chống viêm NSAIDs.',
              severity: 'routine'
            },
            {
              label: 'Nóng rát thượng vị lan lên sau ức, ợ chua sau ăn',
              diagnosis: 'Trào ngược dạ dày thực quản (GERD) -> Thử điều trị thuốc ức chế bơm proton (PPI), theo dõi và nội soi nếu cần.',
              severity: 'routine'
            }
          ]
        }
      ]
    },
    residentClinicalPearls: [
      'Đi buồng: ECG bình thường KHÔNG loại trừ Hội chứng vành cấp! Có tới 5-8% bệnh nhân NSTEMI có ECG ban đầu hoàn toàn bình thường. Phải làm lại ECG sau 15-30 phút nếu cơn đau vẫn tiếp diễn.',
      'Bóc tách động mạch chủ: Tuyệt đối không dùng thuốc tiêu sợi huyết hoặc chống đông nếu chưa loại trừ bóc tách ĐMC, vì sẽ gây tử vong do vỡ động mạch chủ.',
      'Đau ngực ở người cao tuổi, đái tháo đường hoặc phụ nữ thường biểu hiện không điển hình: không đau ngực mà chỉ khó thở đột ngột, mệt lả, tụt huyết áp hoặc lú lẫn.'
    ]
  },
  {
    id: 'approach-dyspnoea',
    title: 'Tiếp Cận Bệnh Nhân Khó Thở',
    englishTitle: 'Approach to Dyspnoea',
    system: 'respiratory',
    urgencyLevel: 'Emergency',
    definition: 'Khó thở (Dyspnoea) là cảm giác chủ quan của người bệnh về việc thở không thoải mái, không đủ không khí, hoặc phải gắng sức để thở.',
    pathophysiology: 'Do mất cân xứng giữa tín hiệu chỉ huy hô hấp từ vỏ não/hành tủy và đáp ứng thông khí cơ học (tải cơ học tăng do tắc nghẽn đường thở, giảm độ giãn nở phổi, hoặc kích thích hóa thụ cảm thể do toan máu, thiếu oxy).',
    redFlags: [
      'Khó thở kèm không nói được trọn câu, thở rên, thở nghịch thường ngực-bụng',
      'Thở nhanh > 30 lần/phút hoặc thở chậm < 10 lần/phút (dấu hiệu kiệt cơ hô hấp)',
      'Tím tái trung ương, SpO2 < 88% dù đã thở oxy',
      'Tụt huyết áp, mạch đảo (Pulsus paradoxus > 10 mmHg)',
      'Lồng ngực im lặng (Silent chest) ở bệnh nhân hen phế quản nặng'
    ],
    keyHistoryQuestions: [
      {
        dimension: 'Thời gian khởi phát (Time course)',
        question: 'Khó thở xuất hiện đột ngột trong vài phút hay tăng dần qua vài ngày đến vài tuần?',
        clinicalMeaning: 'Vài giây đến vài phút: Thuyên tắc phổi, Tràn khí màng phổi, Dị vật đường thở, Phù phổi cấp. Vài ngày: Viêm phổi, Đợt cấp COPD/Hen. Vài tuần-tháng: Bệnh phổi kẽ, Suy tim sung huyết mạn.'
      },
      {
        dimension: 'Tư thế (Positional disposition)',
        question: 'Bác có phải kê nhiều gối khi ngủ (Orthopnoea) không? Có bị thức giấc nửa đêm vì ngạt thở phải ngồi dậy mở cửa sổ (PND) không?',
        clinicalMeaning: 'Khó thở khi nằm phẳng (Orthopnoea) và Khó thở kịch phát về đêm (PND) là dấu hiệu kinh điển của suy tim trái ứ huyết (máu ứ dồn về phổi khi nằm).'
      },
      {
        dimension: 'Triệu chứng hô hấp đi kèm',
        question: 'Có kèm ho khạc đờm mủ đục không? Có nghe tiếng rít cò cử trong ngực không? Có sốt hoặc sút cân không?',
        clinicalMeaning: 'Đờm xanh/vàng + Sốt: Nhiễm trùng phế quản phổi. Khò khè cò cử: Co thắt phế quản (Hen, COPD). Đờm hồng bọt khí: Phù phổi cấp.'
      },
      {
        dimension: 'Tiền sử bệnh lý & Phơi nhiễm',
        question: 'Bác có hút thuốc lá bao nhiêu gói-năm? Có tiền sử bệnh tim mạch, suy thận, hoặc dị ứng không?',
        clinicalMeaning: 'Hút thuốc > 20 gói-năm: COPD, ung thư phổi. Tiền sử nhồi máu cơ tim: Suy tim suy giảm phân suất tống máu (HFrEF).'
      }
    ],
    physicalExamFocus: [
      {
        step: 'Nhìn kiểu thở & cơ hô hấp',
        finding: 'Co kéo cơ liên sườn, cánh mũi phập phồng, thở nghịch thường cơ hoành',
        meaning: 'Kiệt cơ hô hấp, nguy cơ suy hô hấp cấp sắp phải đặt nội khí quản.'
      },
      {
        step: 'Khám tĩnh mạch cổ (JVP)',
        finding: 'JVP nổi cao > 4cm trên góc ức',
        meaning: 'Suy tim phải, suy tim sung huyết hoặc tăng áp động mạch phổi.'
      },
      {
        step: 'Gõ phổi',
        finding: 'Gõ đục như gỗ một bên đáy phổi vs Gõ vang trống',
        meaning: 'Đục: Tràn dịch màng phổi. Vang: Tràn khí màng phổi hoặc khí phế thũng.'
      },
      {
        step: 'Nghe phổi',
        finding: 'Rale nổ ẩm dâng lên nhanh từ hai đáy phổi',
        meaning: 'Cơn phù phổi cấp huyết động (Acute Cardiogenic Pulmonary Oedema).'
      },
      {
        step: 'Nghe tim',
        finding: 'Nhịp tim nhanh kèm tiếng T3 gallop ở mỏm tim',
        meaning: 'Suy tim thất trái cấp hoặc đợt mất bù cấp của suy tim mạn.'
      }
    ],
    differentialDiagnosis: [
      {
        category: 'Nguyên nhân Tim Mạch (Cardiovascular)',
        diseases: [
          {
            name: 'Phù phổi cấp huyết động (Acute Pulmonary Oedema)',
            distinguishingFeatures: 'Khó thở dữ dội khi nằm, ho khạc bọt hồng, rale ẩm hai đáy phổi dâng như nước thủy triều, JVP nổi.',
            initialInvestigation: 'X-quang ngực (hình cánh bướm quanh rốn phổi), NT-proBNP hoặc BNP, Siêu âm tim, Khí máu động mạch.',
            priority: 'cannot-miss'
          },
          {
            name: 'Thuyên tắc động mạch phổi cấp (Pulmonary Embolism)',
            distinguishingFeatures: 'Khó thở đột ngột không giải thích được, đau ngực màng phổi, khám phổi thường "trong sạch" nhưng SpO2 thấp.',
            initialInvestigation: 'Chụp CT mạch máu phổi (CTPA), D-dimer, Siêu âm Doppler tĩnh mạch chi dưới.',
            priority: 'cannot-miss'
          },
          {
            name: 'Chèn ép tim cấp (Cardiac Tamponade)',
            distinguishingFeatures: 'Tam chứng Beck (tụt HA, JVP nổi, tiếng tim mờ), mạch nghịch thường > 10 mmHg.',
            initialInvestigation: 'Siêu âm tim tại giường (thấy tràn dịch màng tim và sụp thất phải thì tâm trương).',
            priority: 'cannot-miss'
          }
        ]
      },
      {
        category: 'Nguyên nhân Hô Hấp (Respiratory)',
        diseases: [
          {
            name: 'Cơn hen phế quản cấp nặng (Acute Severe Asthma)',
            distinguishingFeatures: 'Tiền sử hen, thở rít cò cử thì thở ra kéo dài, lồng ngực căng phồng, nói từng từ ngắt quãng.',
            initialInvestigation: 'Đo đo lưu lượng đỉnh (PEF), Khí máu động mạch (PaCO2 bình thường hoặc tăng là dấu hiệu kiệt sức nguy kịch).',
            priority: 'cannot-miss'
          },
          {
            name: 'Tràn khí màng phổi tự phát (Pneumothorax)',
            distinguishingFeatures: 'Khó thở đột ngột sau cơn đau ngực nhói, gõ vang trống, rì rào phế nang mất hoàn toàn một bên.',
            initialInvestigation: 'X-quang ngực thẳng thì thở ra (thấy viền màng phổi tạng và phế trường sáng không có vân phổi).',
            priority: 'cannot-miss'
          },
          {
            name: 'Viêm phổi mắc phải cộng đồng (CAP)',
            distinguishingFeatures: 'Sốt cao, rét run, ho đờm mủ đục, hội chứng đông đặc (rung thanh tăng, gõ đục, rale nổ khu trú).',
            initialInvestigation: 'X-quang ngực, CTM, CRP/Procalcitonin, cấy đờm và cấy máu.',
            priority: 'common'
          },
          {
            name: 'Đợt cấp bệnh phổi tắc nghẽn mạn tính (AE-COPD)',
            distinguishingFeatures: 'Tiêu chuẩn Anthonisen: Tăng khó thở + Tăng lượng đờm + Đờm mủ đục ở bệnh nhân COPD có tiền sử hút thuốc.',
            initialInvestigation: 'X-quang ngực, Khí máu động mạch (đánh giá toan hô hấp tăng CO2), CRP.',
            priority: 'common'
          }
        ]
      }
    ],
    algorithm: {
      title: 'Lưu đồ Tiếp Cận Khó Thở Cấp (Dyspnoea Diagnostic Flowchart)',
      summary: 'Dựa trên tốc độ khởi phát, X-quang ngực và các chỉ điểm sinh học (Biomarkers)',
      startingPoint: 'node-start',
      nodes: [
        {
          id: 'node-start',
          question: 'Khó thở khởi phát đột ngột trong vòng vài phút đến vài giờ?',
          options: [
            {
              label: 'CÓ - Đột ngột / Cấp tính',
              targetId: 'node-acute',
              severity: 'urgent'
            },
            {
              label: 'KHÔNG - Khó thở mạn tính tiến triển từ từ',
              targetId: 'node-chronic',
              severity: 'routine'
            }
          ]
        },
        {
          id: 'node-acute',
          question: 'Khám phổi và chụp X-quang phổi cấp cứu phát hiện tổn thương gì?',
          options: [
            {
              label: 'Mất vân phổi một bên + Viền lá tạng màng phổi',
              diagnosis: 'Tràn khí màng phổi (Pneumothorax) -> Đặt dẫn lưu màng phổi (Chest tube) hoặc chọc hút.',
              severity: 'urgent'
            },
            {
              label: 'Hình ảnh thâm nhiễm phế nang / Đông đặc có phế quản hơi',
              diagnosis: 'Viêm phổi cấp (Pneumonia) -> Kháng sinh theo kinh nghiệm đường tĩnh mạch, bù dịch, thở oxy.',
              severity: 'warning'
            },
            {
              label: 'Bóng tim to, sung huyết rốn phổi hai bên, đường Kerley B',
              diagnosis: 'Phù phổi cấp / Suy tim ứ huyết -> Furosemide tĩnh mạch, Nitroglycerin truyền tĩnh mạch, thông khí áp lực dương không xâm lấn (CPAP/BiPAP).',
              severity: 'urgent'
            },
            {
              label: 'X-quang phổi BÌNH THƯỜNG hoặc gần như bình thường nhưng bệnh nhân thiếu oxy nặng',
              targetId: 'node-normal-cxr',
              severity: 'urgent'
            }
          ]
        },
        {
          id: 'node-normal-cxr',
          question: 'Bệnh nhân có yếu tố nguy cơ huyết khối (bất động, phẫu thuật gần đây, ung thư, DVT)?',
          options: [
            {
              label: 'CÓ - Nghi ngờ cao Thuyên tắc phổi',
              diagnosis: 'Chụp cắt lớp vi tính động mạch phổi (CTPA) ngay lập tức; điều trị chống đông Heparin trọng lượng phân tử thấp.',
              severity: 'urgent'
            },
            {
              label: 'KHÔNG - Nghe phổi có tiếng thở rít wheezing co thắt',
              diagnosis: 'Cơn hen phế quản cấp hoặc co thắt phế quản -> Phun khí dung Salbutamol + Ipratropium, Corticosteroid toàn thân.',
              severity: 'warning'
            },
            {
              label: 'Bệnh nhân thở nhanh sâu, toan chuyển hoá nặng (Anion gap cao)',
              diagnosis: 'Toan chuyển hoá kích thích thở Kussmaul (DKA, toan lactic, suy thận urê máu cao) -> Kiểm tra khí máu động mạch, đường huyết, chức năng thận.',
              severity: 'urgent'
            }
          ]
        },
        {
          id: 'node-chronic',
          question: 'Đo hô hấp ký (Spirometry) cho kết quả rối loạn thông khí dạng nào?',
          options: [
            {
              label: 'Rối loạn thông khí tắc nghẽn (FEV1/FVC < 0.70)',
              diagnosis: 'COPD hoặc Hen phế quản mạn tính -> Làm test phục hồi phế quản bằng thuốc giãn phế quản.',
              severity: 'routine'
            },
            {
              label: 'Rối loạn thông khí hạn chế (FVC < 80%, FEV1/FVC bình thường)',
              diagnosis: 'Bệnh phổi kẽ (ILD / Xơ phổi), gù vẹo cột sống, béo phì hoặc bệnh thần kinh cơ -> Đo DLCO, chụp HRCT ngực.',
              severity: 'routine'
            }
          ]
        }
      ]
    },
    residentClinicalPearls: [
      'Khí máu động mạch trong cơn hen cấp: Ở người bình thường khó thở thở nhanh, PaCO2 phải GIẢM do tăng thông khí. Nếu bệnh nhân hen cấp mà PaCO2 "BÌNH THƯỜNG" (khoảng 40 mmHg) hoặc TĂNG, đó là báo hiệu KIỆT SỨC HÔ HẤP NGUY KỊCH, sắp ngừng thở!',
      'Siêu âm phổi tại giường (Point-of-Care Ultrasound - POCUS / BLUE Protocol): Chỉ mất 3 phút để phân biệt Tràn dịch màng phổi, Tràn khí màng phổi (mất dấu trượt màng phổi Lung sliding), Phù phổi cấp (hội chứng B-lines lan toả hai bên), Viêm phổi (đông đặc màng phổi).'
    ]
  },
  {
    id: 'approach-abdominal-pain',
    title: 'Tiếp Cận Bệnh Nhân Đau Bụng Cấp',
    englishTitle: 'Approach to Acute Abdominal Pain',
    system: 'gastrointestinal',
    urgencyLevel: 'Emergency',
    definition: 'Đau bụng cấp là tình trạng đau bụng khởi phát đột ngột trong vòng vài giờ đến vài ngày, đòi hỏi phải đánh giá khẩn trương để quyết định can thiệp ngoại khoa hay điều trị nội khoa.',
    pathophysiology: 'Gồm 3 cơ chế: Đau tạng (Visceral pain - căng trướng tạng rỗng hoặc bao tạng đặc, mơ hồ đường giữa); Đau thành (Parietal pain - kích thích phúc mạc thành, khu trú rõ, đau dữ dội liên tục); Đau quy chiếu (Referred pain - do chung khoanh tủy cảm giác).',
    redFlags: [
      'Bụng gồng cứng như gỗ (Board-like rigidity) và cảm ứng phúc mạc lan toả',
      'Dấu hiệu sốc: Tụt huyết áp, mạch nhanh nhỏ, thiểu niệu, chi lạnh vã mồ hôi',
      'Nôn ra máu hoặc đi cầu phân đen/máu tươi số lượng nhiều',
      'Bí trung đại tiện hoàn toàn kèm bụng chướng căng, nôn ra dịch giống phân',
      'Đau bụng dữ dội ở phụ nữ độ tuổi sinh sản kèm trễ kinh (nguy cơ vỡ thai ngoài tử cung)'
    ],
    keyHistoryQuestions: [
      {
        dimension: 'Vị trí ban đầu và vị trí hiện tại',
        question: 'Đau bắt đầu ở đâu và bây giờ đau ở vị trí nào?',
        clinicalMeaning: 'Đau lúc đầu quanh rốn sau chuyển xuống hố chậu phải: Kinh điển của Viêm ruột thừa cấp. Đau hạ sườn phải: Gan mật. Thượng vị xuyên sau lưng: Viêm tụy cấp.'
      },
      {
        dimension: 'Tính chất cơn đau',
        question: 'Đau từng cơn quặn thắt (Colicky) hay đau liên tục dữ dội âm ỉ?',
        clinicalMeaning: 'Đau quặn từng cơn kèm khoảng nghỉ: Tắc ruột cơ học. Đau liên tục dữ dội như dao đâm: Thủng tạng rỗng, Viêm tụy cấp hoại tử, Bóc tách ĐMC bụng.'
      },
      {
        dimension: 'Dấu hiệu tiêu hóa đi kèm',
        question: 'Có nôn ói không? Nôn xong có đỡ đau không? Còn trung tiện (đánh rắm) được không? Đi cầu phân thế nào?',
        clinicalMeaning: 'Nôn xong đỡ đau: Loét dạ dày. Nôn xong không hề đỡ đau: Viêm tụy cấp. Bí trung đại tiện: Tắc ruột.'
      },
      {
        dimension: 'Tiền sử kinh nguyệt (nữ giới)',
        question: 'Kỳ kinh cuối cùng cách đây bao lâu? Có đều không? Có đau bụng lệch một bên kèm ra máu âm đạo bất thường không?',
        clinicalMeaning: 'Loại trừ ngay Thai ngoài tử cung (Ectopic Pregnancy) ở mọi phụ nữ trong độ tuổi sinh đẻ có đau bụng dưới.'
      }
    ],
    physicalExamFocus: [
      {
        step: 'Nhìn thành bụng',
        finding: 'Bụng bất động không di động theo nhịp thở, co cứng gồ cơ thẳng bụng',
        meaning: 'Viêm phúc mạc toàn thể (Peritonitis) do thủng dạ dày hoặc tạng rỗng.'
      },
      {
        step: 'Sờ phát hiện đề kháng',
        finding: 'Đề kháng thành bụng (Involuntary Guarding) và Cảm ứng phúc mạc (Rebound tenderness)',
        meaning: 'Viêm phúc mạc khu trú hoặc toàn thể, chỉ định hội chẩn ngoại khoa khẩn.'
      },
      {
        step: 'Khám các điểm đau ngoại khoa',
        finding: 'Điểm McBurney đau, Dấu hiệu Rovsing (+), Psoas (+), Obturator (+)',
        meaning: 'Viêm ruột thừa cấp tính.'
      },
      {
        step: 'Nghe nhu động ruột',
        finding: 'Nhu động ruột âm sắc kim loại leng keng (Tinkling) vs Im lặng hoàn toàn (Silent abdomen)',
        meaning: 'Leng keng: Tắc ruột cơ học. Im lặng: Liệt ruột hoại tử hoặc viêm phúc mạc.'
      },
      {
        step: 'Khám bẹn và tinh hoàn',
        finding: 'Khối phồng vùng bẹn ấn nghẹt căng đau không đẩy lên được',
        meaning: 'Thoát vị bẹn nghẹt (Strangulated hernia) - Cần mổ cấp cứu tránh hoại tử ruột.'
      }
    ],
    differentialDiagnosis: [
      {
        category: 'Cấp cứu Ngoại khoa (Surgical Emergencies)',
        diseases: [
          {
            name: 'Viêm ruột thừa cấp (Acute Appendicitis)',
            distinguishingFeatures: 'Đau quanh rốn chuyển hố chậu phải, sốt nhẹ, McBurney (+), tăng bạch cầu đa nhân trung tính.',
            initialInvestigation: 'Siêu âm bụng (ruột thừa đường kính > 6mm không xẹp, thâm nhiễm mỡ), CT bụng có cản quang.',
            priority: 'cannot-miss'
          },
          {
            name: 'Thủng tạng rỗng (Perforated Peptic Ulcer)',
            distinguishingFeatures: 'Đau thượng vị đột ngột dữ dội như dao đâm, bụng cứng như gỗ, mất vùng đục trước gan.',
            initialInvestigation: 'X-quang ngực thẳng đứng hoặc bụng đứng không chuẩn bị (tìm liềm hơi dưới vòm hoành).',
            priority: 'cannot-miss'
          },
          {
            name: 'Tắc ruột cơ học (Intestinal Obstruction)',
            distinguishingFeatures: 'Tứ chứng kinh điển: Đau bụng cơn + Nôn ói + Bí trung đại tiện + Bụng chướng quai ruột nổi.',
            initialInvestigation: 'X-quang bụng đứng không sửa soạn (hình ảnh mức nước - mức hơi xếp bậc thang).',
            priority: 'cannot-miss'
          },
          {
            name: 'Vỡ thai ngoài tử cung (Ruptured Ectopic Pregnancy)',
            distinguishingFeatures: 'Nữ giới trễ kinh, đau đột ngột dữ dội hố chậu/hạ vị, tụt HA, phản ứng thành bụng, túi cùng Douglas căng đau.',
            initialInvestigation: 'Quick test thai (nước tiểu), Beta-hCG máu, Siêu âm tử cung phần phụ qua ngả âm đạo.',
            priority: 'cannot-miss'
          },
          {
            name: 'Phình động mạch chủ bụng vỡ/doạ vỡ (Ruptured AAA)',
            distinguishingFeatures: 'Người già hút thuốc, đau bụng/lưng dữ dội đột ngột, khối u đập nảy ngang trên rốn, sốc mất máu.',
            initialInvestigation: 'Siêu âm bụng tại giường cấp cứu, CT Angiography bụng nếu huyết động cho phép.',
            priority: 'cannot-miss'
          }
        ]
      },
      {
        category: 'Bệnh lý Nội khoa & Thường gặp',
        diseases: [
          {
            name: 'Viêm tụy cấp (Acute Pancreatitis)',
            distinguishingFeatures: 'Đau thượng vị dữ dội liên tục lan xuyên ra sau lưng sau bữa ăn thịnh soạn hoặc uống rượu, nôn nhiều không đỡ đau.',
            initialInvestigation: 'Amylase và Lipase máu (Lipase tăng >= 3 lần giới hạn trên bình thường), Siêu âm/CT bụng.',
            priority: 'common'
          },
          {
            name: 'Cơn đau quặn mật / Viêm túi mật cấp (Acute Cholecystitis)',
            distinguishingFeatures: 'Đau hạ sườn phải lan lên vai phải/sau lưng, sốt, nghiệm pháp Murphy (+).',
            initialInvestigation: 'Siêu âm ổ bụng (sỏi kẹt cổ túi mật, thành túi mật dày > 4mm, dịch quanh túi mật).',
            priority: 'common'
          },
          {
            name: 'Cơn đau quặn thận (Renal Colic)',
            distinguishingFeatures: 'Đau quặn dữ dội vùng hố thắt lưng lan xuống bẹn/bìu/môi lớn, đái máu, bệnh nhân lăn lộn không tư thế giảm đau.',
            initialInvestigation: 'Tổng phân tích nước tiểu (hồng cầu vi thể), Siêu âm hệ tiết niệu, CT hệ niệu không cản quang (CT KUB).',
            priority: 'common'
          }
        ]
      }
    ],
    algorithm: {
      title: 'Lưu đồ Tiếp Cận Đau Bụng Cấp theo Khu Vực Giải Phẫu',
      summary: 'Định hướng chẩn đoán nhanh dựa trên vị trí đau ưu thế và dấu hiệu phúc mạc',
      startingPoint: 'node-location',
      nodes: [
        {
          id: 'node-location',
          question: 'Vị trí đau bụng chiếm ưu thế nhất của bệnh nhân ở đâu?',
          options: [
            {
              label: 'Thượng vị (Epigastrium) hoặc Toàn thể có gồng cứng bụng',
              targetId: 'node-epigastric',
              severity: 'urgent'
            },
            {
              label: 'Hạ sườn phải (RUQ)',
              targetId: 'node-ruq',
              severity: 'warning'
            },
            {
              label: 'Hố chậu phải (RLQ)',
              targetId: 'node-rlq',
              severity: 'urgent'
            },
            {
              label: 'Hố chậu trái (LLQ)',
              targetId: 'node-llq',
              severity: 'warning'
            }
          ]
        },
        {
          id: 'node-epigastric',
          question: 'Khám thấy bụng cứng đờ như gỗ, mất vùng đục trước gan?',
          options: [
            {
              label: 'CÓ - Nghi ngờ Thủng tạng rỗng',
              diagnosis: 'Chụp X-quang bụng/ngực đứng tìm liềm hơi dưới hoành -> Hội chẩn phẫu thuật cấp cứu ngoại khoa ngay!',
              severity: 'urgent'
            },
            {
              label: 'KHÔNG - Đau xuyên lưng, nôn nhiều, có yếu tố sỏi mật/rượu',
              diagnosis: 'Nghi ngờ Viêm tụy cấp -> Xét nghiệm Lipase máu (> 3 lần bình thường), Siêu âm bụng, phân tầng thang điểm Balthazar/APACHE II.',
              severity: 'urgent'
            }
          ]
        },
        {
          id: 'node-ruq',
          question: 'Khám thấy nghiệm pháp Murphy dương tính, sốt, kèm vàng da?',
          options: [
            {
              label: 'Có Sốt + Đau hạ sườn P + Vàng da (Tam chứng Charcot)',
              diagnosis: 'Nhiễm trùng đường mật cấp (Acute Cholangitis) -> Kháng sinh phổ rộng, hội chẩn tiêu hóa làm ERCP giải áp đường mật cấp cứu.',
              severity: 'urgent'
            },
            {
              label: 'Murphy (+) đơn thuần, không vàng da, đau sau ăn mỡ',
              diagnosis: 'Viêm túi mật cấp do sỏi -> Làm siêu âm bụng xác định độ dày thành túi mật, chỉ định cắt túi mật nội soi.',
              severity: 'warning'
            }
          ]
        },
        {
          id: 'node-rlq',
          question: 'Bệnh nhân là nữ trong độ tuổi sinh đẻ có trễ kinh hoặc ra máu âm đạo?',
          options: [
            {
              label: 'CÓ - Nguy cơ Thai ngoài tử cung',
              diagnosis: 'Thử que thai khẩn cấp, siêu âm đầu dò âm đạo kiểm tra buồng tử cung và túi cùng Douglas.',
              severity: 'urgent'
            },
            {
              label: 'KHÔNG - Điểm McBurney đau, Dấu hiệu Rovsing (+), sốt nhẹ',
              diagnosis: 'Viêm ruột thừa cấp -> Siêu âm hố chậu phải, chuẩn bị mổ cắt ruột thừa nội soi.',
              severity: 'urgent'
            }
          ]
        },
        {
          id: 'node-llq',
          question: 'Bệnh nhân lớn tuổi có sốt, thay đổi thói quen đại tiện, đau hố chậu trái?',
          options: [
            {
              label: 'CÓ',
              diagnosis: 'Viêm túi thừa đại tràng Sigma (Diverticulitis) -> Chụp CT bụng có cản quang, kháng sinh phổ rộng, tạm nhịn ăn.',
              severity: 'warning'
            },
            {
              label: 'KHÔNG - Đau quặn từng cơn lan xuống bẹn, tiểu máu vi thể',
              diagnosis: 'Sỏi niệu quản trái -> Siêu âm hệ tiết niệu, giảm đau bằng NSAIDs dạng tiêm/uống, chụp CT KUB.',
              severity: 'routine'
            }
          ]
        }
      ]
    },
    residentClinicalPearls: [
      'Nguyên tắc vàng cấp cứu: Ở mọi bệnh nhân nữ trong độ tuổi sinh đẻ có đau bụng dưới, THAI NGOÀI TỬ CUNG luôn phải được loại trừ đầu tiên bằng xét nghiệm nước tiểu hoặc máu, dù bệnh nhân khai kinh nguyệt hoàn toàn đều đặn!',
      'Giảm đau trong đau bụng cấp: Quan niệm cổ điển "không được cho thuốc giảm đau vì sợ làm lu mờ triệu chứng ngoại khoa" hiện nay đã lỗi thời! Sau khi đánh giá ban đầu, cần dùng giảm đau thích hợp (paracetamol, chống co thắt hoặc opioid liều dò) để người bệnh đỡ vật vã và hợp tác khám bụng chính xác hơn.',
      'Người cao tuổi đau bụng cấp: Thường không có sốt cao, không có phản ứng thành bụng rầm rộ dù ruột đã hoại tử thủng phúc mạc, vì cơ thành bụng teo mỏng và đáp ứng miễn dịch suy giảm.'
    ]
  },
  {
    id: 'approach-jaundice',
    title: 'Tiếp Cận Bệnh Nhân Vàng Da (Jaundice)',
    englishTitle: 'Approach to Jaundice',
    system: 'gastrointestinal',
    urgencyLevel: 'Urgent',
    definition: 'Vàng da (Jaundice/Icterus) là tình trạng đổi màu vàng của củng mạc mắt, niêm mạc và da do nồng độ Bilirubin trong máu tăng cao (thường phát hiện lâm sàng khi Bilirubin toàn phần > 50 µmol/L hay 3 mg/dL).',
    pathophysiology: 'Chia làm 3 nhóm lớn: Trước gan (Tăng gián tiếp do tăng sinh Bilirubin quá mức - tan máu); Tại gan (Tổn thương tế bào gan hoặc tắc mật trong gan); Sau gan (Tắc nghẽn đường mật ngoài gan).',
    redFlags: [
      'Tam chứng Charcot (Đau bụng + Sốt rét run + Vàng da) hoặc Ngũ chứng Reynolds (thêm Tụt huyết áp + Rối loạn tri giác): Nhiễm trùng đường mật sốc nhiễm trùng nguy kịch',
      'Vàng da kèm rối loạn đông máu nặng (INR > 1.5) và bệnh não gan (lú lẫn, ngủ gà, run vỗ asterixis): Suy gan cấp (Acute Liver Failure)',
      'Vàng da tiến triển nhanh kèm phân bạc màu như phân cò, nước tiểu sẫm màu như nước vối, ngứa dữ dội, sút cân không đau (U đầu tụy hoặc đường mật)'
    ],
    keyHistoryQuestions: [
      {
        dimension: 'Màu sắc phân và nước tiểu',
        question: 'Nước tiểu có sậm màu như trà đặc/nước vối không? Phân có bị bạc màu (trắng xám như phân cò) không?',
        clinicalMeaning: 'Phân bạc màu + Nước tiểu sẫm màu: Chắc chắn là Tắc mật sau gan (Bilirubin trực tiếp bài xuất qua thận, không xuống được ruột). Nước tiểu vàng trong, phân sẫm màu: Tan máu trước gan.'
      },
      {
        dimension: 'Đau bụng và sốt',
        question: 'Có sốt rét run không? Có cơn đau hạ sườn phải dữ dội không?',
        clinicalMeaning: 'Sốt rét run + Đau quặn mật: Sỏi ống mật chủ gây nhiễm trùng đường mật. Vàng da tăng dần KHÔNG ĐAU: U đầu tụy, u bóng Vater, ung thư biểu mô đường mật (Cholangiocarcinoma).'
      },
      {
        dimension: 'Thuốc, rượu và độc chất',
        question: 'Bác có uống rượu bia không? Có dùng Paracetamol liều cao, thuốc bắc, thuốc nam hay thuốc kháng lao gần đây không?',
        clinicalMeaning: 'Ngộ độc Paracetamol, viêm gan do thuốc kháng lao (INH, Rifampicin, Pyrazinamide), viêm gan rượu cấp.'
      },
      {
        dimension: 'Yếu tố nguy cơ lây nhiễm virus',
        question: 'Có tiền sử truyền máu, tiêm chích ma túy, xăm mình, quan hệ tình dục không an toàn không?',
        clinicalMeaning: 'Viêm gan virus B, C cấp hoặc mạn bùng phát.'
      }
    ],
    physicalExamFocus: [
      {
        step: 'Khám củng mạc mắt & niêm mạc dưới lưỡi',
        finding: 'Vàng rực củng mạc mắt dưới ánh sáng tự nhiên',
        meaning: 'Củng mạc mắt giàu elastin nên có ái lực gắn kết đặc biệt mạnh với bilirubin.'
      },
      {
        step: 'Khám da tìm dấu hiệu suy tế bào gan',
        finding: 'Sao mạch (Spider naevi), lòng bàn tay son (Palmar erythema), phù chân, tuần hoàn bàng hệ',
        meaning: 'Bệnh gan mạn tính tiến triển / Xơ gan mất bù.'
      },
      {
        step: 'Sờ hạ sườn phải (Khám túi mật)',
        finding: 'Sờ thấy khối căng tròn nhẵn không đau vùng đáy túi mật (Định luật Courvoisier)',
        meaning: 'Tắc mật do u ác tính chèn ép đường mật ngoài gan (u đầu tụy).'
      },
      {
        step: 'Khám thần kinh tìm Bệnh não gan',
        finding: 'Dấu run vỗ cánh (Asterixis / Flapping tremor) khi giơ thẳng 2 tay ngửa cổ tay',
        meaning: 'Bệnh não gan do tăng nồng độ ammoniac máu và độc chất thần kinh.'
      }
    ],
    differentialDiagnosis: [
      {
        category: 'Sau gan / Tắc mật ngoài gan (Obstructive Jaundice)',
        diseases: [
          {
            name: 'Sỏi ống mật chủ (Choledocholithiasis)',
            distinguishingFeatures: 'Tam chứng Charcot (Đau hạ sườn P -> Sốt rét run -> Vàng da dao động), tiền sử sỏi mật.',
            initialInvestigation: 'Siêu âm gan mật, MRCP (Chụp cộng hưởng từ đường mật tụy), ERCP vừa chẩn đoán vừa lấy sỏi.',
            priority: 'cannot-miss'
          },
          {
            name: 'Ung thư đầu tụy / Ung thư biểu mô đường mật (Cholangiocarcinoma)',
            distinguishingFeatures: 'Vàng da tắc mật tăng dần không đau, sút cân nhanh, ngứa toàn thân, túi mật to (Courvoisier +).',
            initialInvestigation: 'Chụp CT ổ bụng 4 thì có tiêm thuốc cản quang, chất chỉ điểm ung thư CA 19-9.',
            priority: 'cannot-miss'
          }
        ]
      },
      {
        category: 'Tại gan (Hepatocellular Jaundice)',
        diseases: [
          {
            name: 'Viêm gan virus cấp (Hepatitis A, B, C, E)',
            distinguishingFeatures: 'Giai đoạn tiền vàng da mệt mỏi chán ăn sợ mùi thịt cá, sau đó vàng da niêm mạc, gan to hơi đau.',
            initialInvestigation: 'Men gan AST/ALT tăng vọt > 1000 U/L, HBsAg, Anti-HBc IgM, Anti-HCV, Anti-HAV IgM.',
            priority: 'common'
          },
          {
            name: 'Viêm gan do thuốc / Độc chất (DILI)',
            distinguishingFeatures: 'Tiền sử dùng thuốc (Paracetamol, kháng lao, NSAIDs, thực phẩm chức năng lạ) trong vòng vài tuần.',
            initialInvestigation: 'Men gan, định lượng nồng độ Paracetamol máu, đông máu toàn bộ (PT/INR).',
            priority: 'cannot-miss'
          },
          {
            name: 'Hội chứng Gilbert (Tăng Bilirubin gián tiếp lành tính)',
            distinguishingFeatures: 'Người trẻ, vàng mắt nhẹ thoáng qua khi nhịn đói, stress, mất ngủ hoặc nhiễm lạnh, men gan hoàn toàn bình thường.',
            initialInvestigation: 'Bilirubin gián tiếp tăng nhẹ (< 80 µmol/L), các xét nghiệm chức năng gan và siêu âm gan bình thường.',
            priority: 'common'
          }
        ]
      },
      {
        category: 'Trước gan / Tan máu (Hemolytic Jaundice)',
        diseases: [
          {
            name: 'Thiếu máu tan máu (Hemolytic Anaemia)',
            distinguishingFeatures: 'Da vàng rơm nhạt kèm da xanh tái thiếu máu, lách to, nước tiểu sẫm do urobilinogen.',
            initialInvestigation: 'Tổng phân tích tế bào máu, hồng cầu lưới tăng cao, Haptoglobin giảm, Test Coombs trực tiếp.',
            priority: 'cannot-miss'
          }
        ]
      }
    ],
    algorithm: {
      title: 'Lưu đồ Tiếp Cận Vàng Da Dựa Trên Bilirubin và Siêu Âm',
      summary: 'Phân định bước đầu giữa Tăng Bilirubin gián tiếp và trực tiếp, sau đó khảo sát giãn đường mật',
      startingPoint: 'node-bili',
      nodes: [
        {
          id: 'node-bili',
          question: 'Xét nghiệm Bilirubin toàn phần & thành phần: Loại Bilirubin nào chiếm ưu thế?',
          options: [
            {
              label: 'Tăng Bilirubin GIÁN TIẾP chiếm > 80%',
              targetId: 'node-indirect',
              severity: 'routine'
            },
            {
              label: 'Tăng Bilirubin TRỰC TIẾP hoặc Hỗn hợp (> 50% là trực tiếp)',
              targetId: 'node-direct',
              severity: 'warning'
            }
          ]
        },
        {
          id: 'node-indirect',
          question: 'Bệnh nhân có thiếu máu (Hb giảm) và hồng cầu lưới tăng không?',
          options: [
            {
              label: 'CÓ - Có bằng chứng tan máu',
              diagnosis: 'Thiếu máu tán huyết (Tán huyết miễn dịch, bệnh huyết sắc tố, thiếu men G6PD) -> Làm xét nghiệm Coombs test, Haptoglobin, Phết máu ngoại vi.',
              severity: 'warning'
            },
            {
              label: 'KHÔNG - Máu bình thường, men gan bình thường',
              diagnosis: 'Hội chứng Gilbert (khiếm khuyết gen glucuronyl transferase lành tính) -> Trấn an bệnh nhân, không cần điều trị thuốc.',
              severity: 'routine'
            }
          ]
        },
        {
          id: 'node-direct',
          question: 'Siêu âm gan mật cấp cứu: Đường mật trong và ngoài gan CÓ GIÃN không?',
          options: [
            {
              label: 'CÓ GIÃN ĐƯỜNG MẬT - Tắc mật cơ học sau gan',
              targetId: 'node-obstructive',
              severity: 'urgent'
            },
            {
              label: 'KHÔNG GIÃN ĐƯỜNG MẬT - Tổn thương tế bào gan tại gan',
              targetId: 'node-hepatic',
              severity: 'warning'
            }
          ]
        },
        {
          id: 'node-obstructive',
          question: 'Bệnh nhân có sốt rét run và đau bụng hạ sườn phải không?',
          options: [
            {
              label: 'CÓ - Nghi ngờ Sỏi ống mật chủ kèm Nhiễm trùng đường mật',
              diagnosis: 'Nhiễm trùng đường mật cấp (Tam chứng Charcot) -> Kháng sinh khẩn cấp, làm ERCP gắp sỏi giải áp đường mật.',
              severity: 'urgent'
            },
            {
              label: 'KHÔNG - Vàng da tăng dần không đau, sút cân, túi mật to',
              diagnosis: 'U đầu tụy hoặc u đường mật ác tính -> Chụp CT bụng cản quang/MRCP, hội chẩn phẫu thuật hoặc đặt stent đường mật.',
              severity: 'urgent'
            }
          ]
        },
        {
          id: 'node-hepatic',
          question: 'Men gan AST/ALT tăng ở mức độ nào?',
          options: [
            {
              label: 'Tăng vọt > 1000 U/L',
              diagnosis: 'Viêm gan virus cấp tính (Hepatitis A, B, E) hoặc Hoại tử gan do thuốc (Paracetamol, độc chất). Cần theo dõi sát đông máu INR đề phòng suy gan cấp!',
              severity: 'urgent'
            },
            {
              label: 'Tăng vừa phải (< 500 U/L), ALP và GGT tăng ưu thế',
              diagnosis: 'Viêm gan mạn tính, Xơ gan, Viêm đường mật tiên phát (PBC) hoặc Viêm gan do rượu (AST/ALT > 2).',
              severity: 'warning'
            }
          ]
        }
      ]
    },
    residentClinicalPearls: [
      'Điểm khám vàng da nhạy nhất: Củng mạc mắt (dưới ánh sáng tự nhiên ban ngày, không dùng đèn vàng) và niêm mạc mặt dưới lưỡi. Không nhầm với chứng tăng caroten máu (ăn nhiều cà rốt, đu đủ): Caroten làm vàng da lòng bàn tay bàn chân nhưng HOÀN TOÀN KHÔNG làm vàng củng mạc mắt.',
      'Theo dõi suy gan cấp: Dấu hiệu cảnh báo suy gan cấp tối khẩn cấp không phải là nồng độ Bilirubin hay men gan, mà chính là TỶ LỆ PROTHROMBIN (PT/INR) kéo dài và RỐI LOẠN Ý THỨC (bệnh não gan).'
    ]
  },
  {
    id: 'approach-coma',
    title: 'Tiếp Cận Hôn Mê & Rối Loạn Ý Thức',
    englishTitle: 'Approach to Altered Mental Status & Coma',
    system: 'neurological',
    urgencyLevel: 'Emergency',
    definition: 'Hôn mê (Coma) là tình trạng mất ý thức sâu và không thể đánh thức được, người bệnh không có phản ứng có ý thức với môi trường xung quanh dù bị kích thích đau mạnh.',
    pathophysiology: 'Tổn thương cấu trúc trực tiếp hoặc ức chế chuyển hóa hệ thống lưới hoạt hóa hướng lên (Reticular Activating System - ARAS) ở thân não hoặc cả hai bán cầu đại não lan toả.',
    redFlags: [
      'Hôn mê khởi phát đột ngột kèm dấu thần kinh khu trú (đột quỵ xuất huyết não/nhồi máu não diện rộng)',
      'Đồng tử một bên giãn to cố định mất phản xạ ánh sáng (dấu hiệu thoát vị hồi móc thái dương chèn ép dây III)',
      'Tam chứng Cushing: Tăng huyết áp kịch phát + Nhịp tim chậm + Thở bất thường (đe doạ tụt não sắp tử vong)',
      'Hôn mê kèm sốt cao, co giật liên tục hoặc cứng gáy (viêm màng não, viêm não)',
      'Đường huyết mao mạch < 2.8 mmol/L (Hạ đường huyết gây tổn thương não không hồi phục nếu không cấp cứu trong vài phút)'
    ],
    keyHistoryQuestions: [
      {
        dimension: 'Tốc độ khởi phát & Hoàn cảnh xảy ra',
        question: 'Người nhà thấy bệnh nhân bất tỉnh từ khi nào? Đột ngột ngã quỵ hay lơ mơ ngủ gà tăng dần qua nhiều ngày?',
        clinicalMeaning: 'Đột ngột trong tích tắc: Xuất huyết não, Nhồi máu thân não, Xuất huyết dưới nhện, Co giật. Tăng dần: Rối loạn chuyển hoá (hôn mê gan, toan DKA, tăng ure máu), u não, viêm màng não mủ.'
      },
      {
        dimension: 'Thuốc và độc chất xung quanh',
        question: 'Tại hiện trường có vỉ thuốc ngủ, thuốc an thần, bơm kim tiêm hay vỏ rượu bia không? Bệnh nhân có bệnh trầm cảm không?',
        clinicalMeaning: 'Ngộ độc thuốc an thần Benzodiazepine, thuốc phiện Opioids, ngộ độc Paracetamol, ngộ độc rượu.'
      },
      {
        dimension: 'Tiền sử bệnh mạn tính',
        question: 'Bệnh nhân có tiền sử đái tháo đường đang dùng Insulin, suy thận lọc máu, xơ gan hay động kinh không?',
        clinicalMeaning: 'Hạ đường huyết do quá liều insulin, Hôn mê tăng áp lực thẩm thấu, Hôn mê gan, Hôn mê urê huyết cao.'
      }
    ],
    physicalExamFocus: [
      {
        step: 'Thang điểm Glasgow & Dấu sinh tồn',
        finding: 'GCS ≤ 8 điểm, rối loạn nhịp thở (Cheyne-Stokes hoặc Ataxic)',
        meaning: 'Tổn thương thân não nặng, chỉ định đặt ống nội khí quản bảo vệ đường thở khẩn cấp.'
      },
      {
        step: 'Khám đồng tử (Pupillary Reflex)',
        finding: 'Đồng tử co nhỏ như đầu đinh ghim (Pinpoint < 1mm) phản xạ ánh sáng yếu',
        meaning: 'Ngộ độc Opioid hoặc Xuất huyết cầu não (Pontine haemorrhage).'
      },
      {
        step: 'Đồng tử một bên giãn to cố định',
        finding: 'Một bên đồng tử giãn 5-7mm không co khi soi đèn',
        meaning: 'Tụt não thùy thái dương (Uncal herniation) chèn ép dây III cùng bên -> Cần chụp CT đầu và can thiệp ngoại thần kinh ngay.'
      },
      {
        step: 'Phản xạ mắt búp bê (Oculocephalic Reflex)',
        finding: 'Mắt di chuyển ngược hướng xoay đầu (bình thường) vs Mắt nằm đờ ra xoay theo đầu (mất phản xạ)',
        meaning: 'Mất phản xạ mắt búp bê chứng tỏ tổn thương cấu trúc cầu não và trung não nặng nề.'
      },
      {
        step: 'Vận động & Trương lực',
        finding: 'Tư thế mất vỏ (Decorticate: 2 tay gấp cứng, 2 chân duỗi) vs Tư thế mất não (Decerebrate: 2 tay duỗi xoay trong, 2 chân duỗi cứng)',
        meaning: 'Mất vỏ: Tổn thương trên nhân đỏ (bán cầu/bao trong). Mất não: Tổn thương dưới nhân đỏ (thân não - tiên lượng rất xấu).'
      }
    ],
    differentialDiagnosis: [
      {
        category: 'Nguyên nhân chuyển hóa / Nhiễm độc (Toxic-Metabolic Coma)',
        diseases: [
          {
            name: 'Hạ đường huyết cấp (Severe Hypoglycaemia)',
            distinguishingFeatures: 'Vã mồ hôi đầm đìa, mạch nhanh, da tái lạnh, đồng tử giãn nhẹ, hôn mê sâu có thể co giật.',
            initialInvestigation: 'Bấm đường huyết mao mạch tại giường (Dextrostix). Phải làm NGAY LẬP TỨC!',
            priority: 'cannot-miss'
          },
          {
            name: 'Ngộ độc Opioid (Heroin, Morphine, Fentanyl)',
            distinguishingFeatures: 'Tam chứng ngộ độc: Ức chế hô hấp (thở chậm < 8 l/p) + Đồng tử co nhỏ đầu đinh ghim + Hôn mê.',
            initialInvestigation: 'Thử đáp ứng tiêm tĩnh mạch Naloxone 0.4 - 2 mg; xét nghiệm độc chất nước tiểu.',
            priority: 'cannot-miss'
          },
          {
            name: 'Hôn mê toan Ceton đái tháo đường (DKA) / Tăng áp lực thẩm thấu (HHS)',
            distinguishingFeatures: 'Thở nhanh sâu Kussmaul có mùi táo thối/acetone, mất nước nặng, da khô nóng, đường huyết tăng vọt > 25-35 mmol/L.',
            initialInvestigation: 'Khí máu động mạch, Ceton máu/nước tiểu, Điện giải đồ tính khoảng trống Anion gap.',
            priority: 'cannot-miss'
          },
          {
            name: 'Bệnh não gan (Hepatic Encephalopathy)',
            distinguishingFeatures: 'Tiền sử xơ gan, vàng da, cổ trướng, dấu sao mạch, mùi gan fetor hepaticus trên hơi thở.',
            initialInvestigation: 'Amoniac máu (NH3), men gan, đông máu PT/INR, điện giải.',
            priority: 'common'
          }
        ]
      },
      {
        category: 'Nguyên nhân cấu trúc / Thần kinh (Structural Coma)',
        diseases: [
          {
            name: 'Đột quỵ xuất huyết não diện rộng hoặc nhồi máu não thân não',
            distinguishingFeatures: 'Khởi phát đột ngột, liệt nửa người, liệt dây sọ đối bên, đồng tử bất đối xứng.',
            initialInvestigation: 'Chụp CT sọ não không cản quang cấp cứu.',
            priority: 'cannot-miss'
          },
          {
            name: 'Chấn thương sọ não (Máu tụ ngoài màng cứng / dưới màng cứng)',
            distinguishingFeatures: 'Có khoảng tỉnh (Lucid interval) sau chấn thương đầu rồi hôn mê nhanh, đồng tử giãn một bên.',
            initialInvestigation: 'Chụp CT sọ não khẩn cấp (thấy hình thấu kính hai mặt lồi hoặc hình trăng khuyết).',
            priority: 'cannot-miss'
          },
          {
            name: 'Viêm màng não mủ / Viêm não',
            distinguishingFeatures: 'Sốt cao, cứng gáy, dấu Kernig (+), ban xuất huyết hoại tử (Não mô cầu).',
            initialInvestigation: 'Chụp CT não loại trừ khối choán chỗ, sau đó chọc dò dịch não tủy (CSF analysis).',
            priority: 'cannot-miss'
          }
        ]
      }
    ],
    algorithm: {
      title: 'Lưu đồ Cấp Cứu Hôn Mê Tiếp Cận ABC-DEFG',
      summary: 'Quy tắc "Don’t Ever Forget Glucose" và phân biệt tổn thương chuyển hóa vs tổn thương cấu trúc',
      startingPoint: 'node-abc',
      nodes: [
        {
          id: 'node-abc',
          question: 'Hồi sức ABC: Đường thở có thông suốt không? Thở có tự chủ tốt không? Mạch và HA thế nào?',
          options: [
            {
              label: 'Thở chậm < 10 l/p, tắc nghẽn đờm dãi, GCS ≤ 8',
              diagnosis: 'Đặt nội khí quản thở máy ngay lập tức để bảo vệ đường thở và oxy hóa não!',
              severity: 'urgent'
            },
            {
              label: 'Đường thở ổn định tạm thời',
              targetId: 'node-defg',
              severity: 'routine'
            }
          ]
        },
        {
          id: 'node-defg',
          question: 'Quy tắc DEFG: Đo đường huyết mao mạch (Dextrostix) cho kết quả gì?',
          options: [
            {
              label: 'Đường huyết < 3.0 mmol/L (< 54 mg/dL)',
              diagnosis: 'HẠ ĐƯỜNG HUYẾT CẤP -> Bơm tĩnh mạch ngay 50ml Glucose 20-30% hoặc 100ml Glucose 10%. Đánh giá lại tri giác sau 5 phút.',
              severity: 'urgent'
            },
            {
              label: 'Đường huyết bình thường hoặc tăng cao',
              targetId: 'node-pupils',
              severity: 'routine'
            }
          ]
        },
        {
          id: 'node-pupils',
          question: 'Khám đồng tử: Kích thước và phản xạ ánh sáng của đồng tử hai mắt như thế nào?',
          options: [
            {
              label: 'Đồng tử co nhỏ như đầu đinh ghim (< 1mm) hai bên',
              diagnosis: 'Nghi ngờ Ngộ độc Opiate -> Tiêm tĩnh mạch Naloxone 0.4mg lặp lại; hoặc Xuất huyết cầu não.',
              severity: 'urgent'
            },
            {
              label: 'Đồng tử bất đối xứng: Một bên giãn to mất phản xạ ánh sáng',
              diagnosis: 'Dấu hiệu chèn ép tụt não thùy thái dương -> Chụp CT sọ não cấp cứu, dùng dung dịch ưu trương (Mannitol hoặc NaCl 3%), mời phẫu thuật thần kinh.',
              severity: 'urgent'
            },
            {
              label: 'Đồng tử hai bên tròn đều, co tốt với ánh sáng',
              targetId: 'node-focal',
              severity: 'warning'
            }
          ]
        },
        {
          id: 'node-focal',
          question: 'Bệnh nhân có dấu thần kinh khu trú (liệt nửa người, méo miệng) hoặc hội chứng màng não không?',
          options: [
            {
              label: 'CÓ DẤU KHU TRÚ',
              diagnosis: 'Bệnh lý cấu trúc não bộ (Đột quỵ não, máu tụ nội sọ, u não) -> Đi chụp CT hoặc MRI sọ não cấp cứu.',
              severity: 'urgent'
            },
            {
              label: 'KHÔNG CÓ DẤU KHU TRÚ (Cổ mềm, tứ chi mềm đều)',
              diagnosis: 'Hôn mê do căn nguyên Chuyển hóa / Độc chất / Toan kiềm / Nhiễm trùng toàn thân -> Xét nghiệm bộ khí máu, độc chất, chức năng gan thận, amoniac, điện giải đồ.',
              severity: 'warning'
            }
          ]
        }
      ]
    },
    residentClinicalPearls: [
      'Khắc cốt ghi tâm công thức cấp cứu "COMA COCKTAIL": 1) Oxy; 2) Glucose ưu trương (trừ khi đã bấm que đường huyết bình thường); 3) Thiamine (Vitamin B1 100mg trước khi truyền đường ở người nghiện rượu để ngừa hội chứng não Wernicke); 4) Naloxone (nếu nghi ngờ ngộ độc thuốc phiện).',
      'Đồng tử trong hôn mê: Nếu đồng tử hai bên vẫn còn phản xạ ánh sáng (dù co nhỏ hay giãn vừa), 90% căn nguyên là do Rối loạn chuyển hóa hoặc ngộ độc thuốc. Nếu mất phản xạ ánh sáng hoặc đồng tử bất đối xứng, khả năng rất cao là tổn thương cấu trúc thân não hoặc thoát vị não!'
    ]
  },
  {
    id: 'approach-weakness',
    title: 'Tiếp Cận Bệnh Nhân Yếu Cơ & Liệt',
    englishTitle: 'Approach to Weakness & Motor Deficit',
    system: 'neurological',
    urgencyLevel: 'Urgent',
    definition: 'Yếu cơ (Weakness) là tình trạng giảm sức mạnh co bóp chủ động của cơ bắp, cần phân biệt với cảm giác mệt mỏi toàn thân (Asthenia/Fatigue).',
    pathophysiology: 'Tổn thương bất kỳ khâu nào trong chuỗi vận động: Vỏ não vận động -> Bó tháp -> Tủy sống -> Rễ thần kinh -> Đám rối -> Dây thần kinh ngoại biên -> Khớp nối thần kinh-cơ (NMJ) -> Sợi cơ.',
    redFlags: [
      'Yếu cơ tiến triển tăng dần từ ngón chân lan lên ngực kèm khó thở (Hội chứng Guillain-Barré đe dọa suy hô hấp)',
      'Liệt nửa người khởi phát đột ngột trong vòng 4.5 giờ (Cửa sổ vàng tiêu sợi huyết điều trị đột quỵ thiếu máu não)',
      'Liệt hai chi dưới kèm mất cảm giác tầng sinh môn và bí tiểu (Hội chứng chèn ép tủy sống cấp hoặc hội chứng chùm đuôi ngựa)',
      'Yếu cơ hô hấp, sụp mi, khó nuốt tăng nặng vào cuối ngày (Cơn nhược cơ tối cấp - Myasthenic crisis)'
    ],
    keyHistoryQuestions: [
      {
        dimension: 'Phân bố giải phẫu của sự yếu cơ',
        question: 'Yếu ở đâu: Nửa người (tay và chân cùng bên), hai chân, hay chỉ ở ngọn chi (bàn tay, bàn chân) hoặc gốc chi (vai, đùi)?',
        clinicalMeaning: 'Liệt nửa người: Bán cầu não đối bên. Liệt 2 chân: Tủy sống. Yếu gốc chi (khó chải đầu, khó đứng dậy khỏi ghế): Bệnh cơ (Myopathy). Yếu ngọn chi (khó cài khuy áo, vấp ngón chân): Bệnh thần kinh ngoại biên.'
      },
      {
        dimension: 'Tính chất mỏi cơ theo thời gian',
        question: 'Sức cơ có bị yếu tăng dần khi làm việc và hồi phục sau khi nghỉ ngơi không? Buổi sáng thức dậy thấy khỏe hơn buổi chiều tối?',
        clinicalMeaning: 'Hiện tượng mỏi cơ dao động trong ngày là dấu hiệu đặc trưng của bệnh lý khớp nối thần kinh - cơ (Nhược cơ Myasthenia Gravis).'
      },
      {
        dimension: 'Rối loạn cảm giác và cơ vòng đi kèm',
        question: 'Có kèm tê bì, mất cảm giác không? Có bị bí tiểu hoặc tiểu đại tiện không tự chủ không?',
        clinicalMeaning: 'Có rối loạn cơ vòng + Rối loạn cảm giác có ranh giới mức tủy -> Tổn thương tủy sống. Yếu cơ đơn thuần KHÔNG có rối loạn cảm giác: Bệnh sừng trước tủy (ALS), Nhược cơ hoặc Bệnh cơ.'
      }
    ],
    physicalExamFocus: [
      {
        step: 'Khám trương lực cơ (Tone)',
        finding: 'Tăng trương lực kiểu co cứng (Spasticity) vs Giảm trương lực mềm nhẽo (Flaccidity)',
        meaning: 'Tăng: Tổn thương nơron vận động trên (UMN). Giảm: Tổn thương nơron vận động dưới (LMN) hoặc sốc tủy giai đoạn cấp.'
      },
      {
        step: 'Khám phản xạ gân xương (DTRs)',
        finding: 'Tăng nhạy, đa động, có giật cơ (Clonus) vs Mất phản xạ gân xương',
        meaning: 'Tăng: UMN (đột quỵ, chèn ép tủy). Mất/giảm: LMN (viêm đa rễ dây thần kinh, bệnh thần kinh ngoại biên).'
      },
      {
        step: 'Khám phản xạ da lòng bàn chân',
        finding: 'Dấu hiệu Babinski dương tính (ngón cái duỗi ngược, xòe nan quạt)',
        meaning: 'Khẳng định tổn thương đường dẫn truyền bó tháp (Corticospinal tract).'
      },
      {
        step: 'Tìm dấu hiệu teo cơ & Rung giật bó cơ',
        finding: 'Teo cơ nhanh chóng kèm rung giật sợi cơ (Fasciculations)',
        meaning: 'Tổn thương sừng trước tủy (Bệnh xơ cứng cột bên teo cơ - ALS).'
      }
    ],
    differentialDiagnosis: [
      {
        category: 'Tổn thương Nơron vận động trên (UMN Lesions)',
        diseases: [
          {
            name: 'Đột quỵ nhồi máu não / Xuất huyết não',
            distinguishingFeatures: 'Liệt nửa người đột ngột, méo miệng cùng bên liệt (liệt VII trung ương), nói ngọng, phản xạ gân xương tăng, Babinski (+).',
            initialInvestigation: 'Chụp CT sọ não không cản quang hoặc MRI não khẩn cấp.',
            priority: 'cannot-miss'
          },
          {
            name: 'Chèn ép tủy sống cấp tính (Spinal Cord Compression)',
            distinguishingFeatures: 'Liệt hai chân tăng dần, có ranh giới mất cảm giác rõ rệt trên thân mình, bí tiểu tiện, đau cột sống tại chỗ.',
            initialInvestigation: 'Chụp cộng hưởng từ (MRI) toàn bộ cột sống khẩn cấp để mổ giải áp.',
            priority: 'cannot-miss'
          }
        ]
      },
      {
        category: 'Tổn thương Nơron vận động dưới & Ngoại biên (LMN Lesions)',
        diseases: [
          {
            name: 'Hội chứng Guillain-Barré (Viêm đa rễ dây thần kinh cấp)',
            distinguishingFeatures: 'Yếu cơ gốc và ngọn chi đối xứng tiến triển từ dưới lên trên sau đợt sốt/tiêu chảy, MẤT PHẢN XẠ GÂN XƯƠNG hoàn toàn.',
            initialInvestigation: 'Chọc dò tủy sống (phân ly đạm - tế bào: Protein tăng cao trong khi tế bào bình thường), Đo điện cơ (EMG).',
            priority: 'cannot-miss'
          },
          {
            name: 'Bệnh Nhược Cơ (Myasthenia Gravis)',
            distinguishingFeatures: 'Sụp mi mắt, nhìn đôi, nuốt khó, yếu cơ tay chân thay đổi theo mức độ hoạt động gắng sức, phản xạ gân xương bình thường.',
            initialInvestigation: 'Kháng thể kháng thụ thể Acetylcholine (AChR-Ab), Test Tensilon / Khí dung Neostigmine, Đo điện cơ sợi đơn độc (SFEMG).',
            priority: 'common'
          },
          {
            name: 'Viêm đa cơ / Viêm da cơ (Polymyositis / Dermatomyositis)',
            distinguishingFeatures: 'Yếu cơ gốc chi đối xứng (khó nhấc tay, khó đứng lên khỏi ghế), đau cơ, men cơ tăng cao, có thể kèm ban tím mi mắt (Heliotrope).',
            initialInvestigation: 'Định lượng men cơ CK (Creatine Kinase), Sinh thiết cơ, Kháng thể tự miễn (Anti-Jo-1).',
            priority: 'common'
          }
        ]
      }
    ],
    algorithm: {
      title: 'Lưu đồ Tiếp Cận Chẩn Đoán Yếu Liệt Cơ (Motor Deficit CDSS)',
      summary: 'Phân tầng UMN vs LMN dựa trên trương lực, phản xạ gân xương và dấu Babinski',
      startingPoint: 'node-umn-lmn',
      nodes: [
        {
          id: 'node-umn-lmn',
          question: 'Khám thực thể: Bệnh nhân có tăng phản xạ gân xương, tăng trương lực co cứng và dấu Babinski (+) không?',
          options: [
            {
              label: 'CÓ - Kiểu tổn thương UMN (Trung ương)',
              targetId: 'node-umn-pattern',
              severity: 'urgent'
            },
            {
              label: 'KHÔNG - Giảm trương lực cơ, mất phản xạ gân xương, Babinski (-) (Kiểu LMN / Bệnh cơ)',
              targetId: 'node-lmn-pattern',
              severity: 'warning'
            }
          ]
        },
        {
          id: 'node-umn-pattern',
          question: 'Phân bố của tổn thương yếu liệt kiểu UMN như thế nào?',
          options: [
            {
              label: 'Liệt nửa người (Mặt, tay, chân cùng bên)',
              diagnosis: 'Tổn thương bán cầu đại não hoặc bao trong đối bên (Đột quỵ, U não, Viêm não) -> Chụp CT/MRI sọ não cấp.',
              severity: 'urgent'
            },
            {
              label: 'Liệt hai chân (Paraplegia) kèm rối loạn tiểu tiện và mức cảm giác',
              diagnosis: 'Tổn thương cắt ngang tủy sống (Chèn ép tủy, viêm tủy cắt ngang) -> Chụp MRI cột sống khẩn cấp để mổ giải áp.',
              severity: 'urgent'
            },
            {
              label: 'Liệt tứ chi (Quadriplegia) có rối loạn cảm giác từ cổ trở xuống',
              diagnosis: 'Tổn thương tủy cổ (Cervical cord lesion) -> Cố định cột sống cổ, chụp MRI cột sống cổ.',
              severity: 'urgent'
            }
          ]
        },
        {
          id: 'node-lmn-pattern',
          question: 'Đặc điểm phân bố yếu cơ và rối loạn cảm giác đi kèm ra sao?',
          options: [
            {
              label: 'Yếu cơ tăng dần từ 2 chân lên 2 tay, MẤT PHẢN XẠ GÂN XƯƠNG, không teo cơ cấp',
              diagnosis: 'Hội chứng Guillain-Barré -> Theo dõi sát dung tích sống (FVC), chuẩn bị lọc huyết tương (PE) hoặc IVIG.',
              severity: 'urgent'
            },
            {
              label: 'Yếu cơ dao động trong ngày, mệt mỏi tăng khi gắng sức, sụp mi, KHÔNG rối loạn cảm giác',
              diagnosis: 'Bệnh nhược cơ (Myasthenia Gravis) -> Xét nghiệm kháng thể kháng thụ thể AChR, chụp CT ngực tìm u tuyến ức.',
              severity: 'warning'
            },
            {
              label: 'Yếu cơ gốc chi đối xứng hai bên, đau cơ, KHÔNG có rối loạn cảm giác',
              diagnosis: 'Bệnh lý cơ (Viêm đa cơ Polymyositis, bệnh cơ do thuốc/nội tiết) -> Xét nghiệm men cơ CK, đo điện cơ EMG.',
              severity: 'routine'
            },
            {
              label: 'Teo cơ ngọn chi, yếu cơ kèm RUNG GIẬT BÓ CƠ (Fasciculations), vừa có dấu UMN vừa có LMN',
              diagnosis: 'Bệnh xơ cứng cột bên teo cơ (ALS / Bệnh nơron vận động) -> Đo điện cơ khảo sát 3 vùng giải phẫu.',
              severity: 'warning'
            }
          ]
        }
      ]
    },
    residentClinicalPearls: [
      'Giai đoạn sốc tủy (Spinal Shock) trong chấn thương tủy cấp: Dù là tổn thương nơron vận động trên (UMN) nhưng trong giai đoạn cấp (vài ngày đến vài tuần đầu), các chi liệt lại MỀM NHẼO và MẤT HOÀN TOÀN PHẢN XẠ GÂN XƯƠNG. Phải chờ sau giai đoạn sốc tủy mới xuất hiện tăng trương lực co cứng và tăng phản xạ gân xương.',
      'Quy tắc 20-30-40 trong theo dõi Hội chứng Guillain-Barré: Bệnh nhân có nguy cơ suy hô hấp cần đặt ống thở khi: Dung tích sống (FVC) < 20 ml/kg, Áp lực hít vào tối đa (MIP) < 30 cmH2O, hoặc Áp lực thở ra tối đa (MEP) < 40 cmH2O.'
    ]
  },
  {
    id: 'approach-cough-haemoptysis',
    title: 'Tiếp Cận Ho & Ho Ra Máu',
    englishTitle: 'Approach to Cough & Haemoptysis',
    system: 'respiratory',
    urgencyLevel: 'Emergency',
    definition: 'Ho là phản xạ tống xuất dị vật và đờm dịch khỏi đường thở; Ho mạn tính kéo dài > 8 tuần. Ho ra máu (Haemoptysis) là sự khạc máu từ đường hô hấp dưới thanh môn (cần phân biệt với nôn ra máu và chảy máu mũi họng).',
    pathophysiology: 'Máu có thể xuất phát từ hệ mạch áp lực thấp (Động mạch phổi 10-20 mmHg) hoặc mạch áp lực cao (Động mạch phế quản 100-120 mmHg - 90% các ca ho ra máu ồ ạt đe doạ tính mạng).',
    redFlags: [
      'Ho ra máu sét đánh / ồ ạt: Lượng máu >= 100 ml/giờ hoặc >= 500 ml/24 giờ (nguy cơ tử vong do ngạt thở cấp)',
      'Ho ra máu kèm suy hô hấp, SpO2 tụt, khó thở dữ dội',
      'Ho mạn tính ở bệnh nhân hút thuốc lá kèm sút cân, khó nuốt, khàn tiếng',
      'Đau ngực màng phổi cấp kèm nhịp tim nhanh và ho ra máu (Thuyên tắc phổi)',
      'Tụt huyết áp, sốc mất máu'
    ],
    keyHistoryQuestions: [
      {
        dimension: 'Lượng máu và tốc độ ho ra máu',
        question: 'Bác ho khạc ra mấy cốc/chén máu? Máu đỏ tươi có lẫn bọt khí không?',
        clinicalMeaning: 'Máu từ đường hô hấp dưới có tính kiềm, đỏ tươi và lẫn bọt khí. Phân biệt với nôn ra máu: dịch toan tính axit, màu nâu sẫm bã cà phê, lẫn thức ăn.'
      },
      {
        dimension: 'Thời gian ho (Cấp vs Mạn)',
        question: 'Cơn ho đã kéo dài bao nhiêu tuần? Ho khan hay có đờm?',
        clinicalMeaning: 'Ho < 3 tuần: Nhiễm trùng hô hấp cấp. Ho > 8 tuần: Hội chứng ho đường hô hấp trên (UACS), Hen phế quản thể ho, Trào ngược dạ dày thực quản (GERD), Thuốc ức chế men chuyển ACEi, Lao hoặc Ung thư phổi.'
      },
      {
        dimension: 'Tiền sử bệnh lý phổi',
        question: 'Trước đây bác có từng bị Lao phổi, Giãn phế quản, hoặc sốt về chiều đổ mồ hôi trộm không?',
        clinicalMeaning: 'Lao phổi tiến triển hoặc di chứng giãn phế quản sau lao là nguyên nhân hàng đầu gây ho ra máu nặng tại Việt Nam.'
      },
      {
        dimension: 'Thuốc đang sử dụng',
        question: 'Bác có đang dùng thuốc chống đông máu (Warfarin, NOAC) hay thuốc hạ huyết áp ức chế men chuyển (Enalapril, Perindopril) không?',
        clinicalMeaning: 'Ho khan do ACEi xảy ra ở 10-15% bệnh nhân. Thuốc chống đông làm tăng nặng nguy cơ xuất huyết phế nang.'
      }
    ],
    physicalExamFocus: [
      {
        step: 'Đánh giá đường thở & Huyết động',
        finding: 'Bệnh nhân nghẹn thở, thở rít, co kéo, SpO2 tụt, huyết áp tụt',
        meaning: 'Cấp cứu ho ra máu ngạt thở: Cho nằm nghiêng bên phổi tổn thương, hút thông đường thở, đặt nội khí quản nòng đôi.'
      },
      {
        step: 'Khám toàn trạng',
        finding: 'Ngón tay dùi trống + Sụt cân, hạch thượng đòn to',
        meaning: 'Ung thư phế quản phổi di căn hoặc Giãn phế quản mạn tính.'
      },
      {
        step: 'Nghe phổi',
        finding: 'Rale nổ khu trú vùng đỉnh phổi vs Rale ẩm to hạt rải rác hai đáy',
        meaning: 'Đỉnh phổi: Lao phổi. Đáy phổi: Giãn phế quản bội nhiễm.'
      }
    ],
    differentialDiagnosis: [
      {
        category: 'Nguyên nhân Ho ra máu đe dọa tính mạng (Cannot Miss)',
        diseases: [
          {
            name: 'Giãn phế quản bội nhiễm (Bronchiectasis)',
            distinguishingFeatures: 'Tiền sử ho khạc đờm mủ đục số lượng nhiều hàng ngày từ nhiều năm, ho ra máu tái phát nhiều đợt.',
            initialInvestigation: 'Chụp CT ngực lớp mỏng độ phân giải cao (HRCT ngực - tiêu chuẩn vàng), Cấy đờm.',
            priority: 'cannot-miss'
          },
          {
            name: 'Lao phổi tiến triển (Pulmonary Tuberculosis)',
            distinguishingFeatures: 'Ho kéo dài > 2-3 tuần, sốt nhẹ về chiều, ra mồ hôi đêm, sút cân, thâm nhiễm hoặc hang đỉnh phổi.',
            initialInvestigation: 'Xét nghiệm đờm soi tìm AFB, GeneXpert MTB/RIF, X-quang phổi.',
            priority: 'cannot-miss'
          },
          {
            name: 'Ung thư phế quản phổi (Bronchogenic Carcinoma)',
            distinguishingFeatures: 'Người > 45 tuổi hút thuốc lá nhiều, ho máu dai dẳng vệt máu tươi, khàn giọng (bovoid cough), gầy sút.',
            initialInvestigation: 'Chụp CT ngực có cản quang, Soi phế quản ống mềm sinh thiết khối u.',
            priority: 'cannot-miss'
          },
          {
            name: 'Thuyên tắc động mạch phổi (PE)',
            distinguishingFeatures: 'Khó thở đột ngột, đau ngực màng phổi, ho ra máu ít, nhịp tim nhanh, yếu tố nguy cơ DVT.',
            initialInvestigation: 'CT Angiography động mạch phổi (CTPA), D-dimer.',
            priority: 'cannot-miss'
          }
        ]
      },
      {
        category: 'Nguyên nhân Ho mạn tính thường gặp (> 8 tuần)',
        diseases: [
          {
            name: 'Hội chứng ho đường hô hấp trên (UACS / Chảy mũi sau)',
            distinguishingFeatures: 'Cảm giác vướng đờm ở cổ họng, liên tục tằng hắng giọng, viêm mũi dị ứng, hình ảnh sỏi lát (cobblestone) thành sau họng.',
            initialInvestigation: 'Soi mũi xoang, thử điều trị kháng Histamin H1 + xịt Corticoid tại chỗ.',
            priority: 'common'
          },
          {
            name: 'Hen phế quản thể ho (Cough-Variant Asthma)',
            distinguishingFeatures: 'Ho khan kích phát về đêm hoặc khi gắng sức, lạnh, không nghe thấy khò khè rõ.',
            initialInvestigation: 'Hô hấp ký đo tính phản ứng phế quản (Methacholine challenge test).',
            priority: 'common'
          },
          {
            name: 'Trào ngược dạ dày thực quản (GERD)',
            distinguishingFeatures: 'Ho sau khi nằm hoặc sau ăn no, ợ nóng, khàn tiếng buổi sáng, không có đờm.',
            initialInvestigation: 'Nội soi thực quản dạ dày, thử điều trị PPI liều cao trong 4-8 tuần.',
            priority: 'common'
          },
          {
            name: 'Ho do thuốc ức chế men chuyển (ACEi-induced cough)',
            distinguishingFeatures: 'Bệnh nhân tim mạch/tăng huyết áp đang dùng Enalapril, Captopril, Lisinopril, ho khan ngứa họng liên tục.',
            initialInvestigation: 'Ngừng thuốc ACEi chuyển sang ARB (nhóm ức chế thụ thể), ho sẽ hết trong 1-4 tuần.',
            priority: 'common'
          }
        ]
      }
    ],
    algorithm: {
      title: 'Lưu đồ Tiếp Cận Ho Ra Máu Cấp Cứu',
      summary: 'Phân loại mức độ xuất huyết và xử trí bảo tồn đường thở tức thì',
      startingPoint: 'node-severity',
      nodes: [
        {
          id: 'node-severity',
          question: 'Lượng máu ho ra có nguy kịch (>= 100ml/h hoặc gây suy hô hấp tụt HA)?',
          options: [
            {
              label: 'CÓ - Ho ra máu ồ ạt / Sét đánh (Massive)',
              targetId: 'node-massive',
              severity: 'urgent'
            },
            {
              label: 'KHÔNG - Ho ra máu số lượng ít đến trung bình',
              targetId: 'node-non-massive',
              severity: 'warning'
            }
          ]
        },
        {
          id: 'node-massive',
          question: 'Xử trí cấp cứu: Cho bệnh nhân nằm nghiêng về bên tổn thương (nếu biết). Bước tiếp theo:',
          options: [
            {
              label: 'Có dấu hiệu nghẹt thở suy hô hấp',
              diagnosis: 'Đặt nội khí quản nòng đôi (Double-lumen tube) hoặc đặt NKQ qua soi phế quản hút sạch máu đông, thở máy bảo vệ phổi lành.',
              severity: 'urgent'
            },
            {
              label: 'Huyết động ổn định tạm thời',
              diagnosis: 'Chuyển can thiệp mạch: Chụp mạch và nút tắc động mạch phế quản cấp cứu (BAE - Bronchial Artery Embolization).',
              severity: 'urgent'
            }
          ]
        },
        {
          id: 'node-non-massive',
          question: 'Chụp phim X-quang phổi và làm xét nghiệm đờm cho thấy tổn thương gì?',
          options: [
            {
              label: 'Thâm nhiễm hoặc hang ở phân thùy đỉnh/sau thùy trên',
              diagnosis: 'Nghi ngờ Lao phổi hoạt động -> Làm xét nghiệm AFB nhuộm soi và GeneXpert đờm, cách ly đường hô hấp.',
              severity: 'warning'
            },
            {
              label: 'Khối mờ tròn hoặc xẹp phổi có dày màng phổi, hạch trung thất',
              diagnosis: 'Nghi ngờ Ung thư phổi -> Chụp CT ngực có cản quang, chỉ định nội soi phế quản sinh thiết mô bệnh học.',
              severity: 'urgent'
            },
            {
              label: 'Đường ray xe lửa, bóng sáng nang giãn phế quản',
              diagnosis: 'Đợt bội nhiễm của Giãn phế quản -> Kháng sinh diệt trực khuẩn mủ xanh (Pseudomonas), dẫn lưu tư thế, thuốc cầm máu.',
              severity: 'warning'
            }
          ]
        }
      ]
    },
    residentClinicalPearls: [
      'Tư thế sống còn khi ho ra máu: Cho bệnh nhân nằm nghiêng về BÊN PHỔI CHẢY MÁU để máu không chảy tràn qua phế quản gốc bên đối diện làm ngạt thở phổi lành!',
      'Trong ho mạn tính, "Bộ ba kinh điển" chiếm 85% các trường hợp ở bệnh nhân không hút thuốc có X-quang ngực bình thường là: 1) Chảy mũi sau (UACS); 2) Hen phế quản; 3) Trào ngược dạ dày thực quản (GERD).'
    ]
  },
  {
    id: 'approach-dizziness-vertigo',
    title: 'Tiếp Cận Chóng Mặt & Mất Thăng Bằng',
    englishTitle: 'Approach to Dizziness & Vertigo',
    system: 'neurological',
    urgencyLevel: 'Emergency',
    definition: 'Chóng mặt (Dizziness) là thuật ngữ mơ hồ mà bệnh nhân dùng để mô tả: 1) Chóng mặt xoay tròn thực sự (Vertigo); 2) Choáng váng/Tiền ngất (Presyncope); 3) Mất thăng bằng khi đi lại (Dysequilibrium); 4) Cảm giác lâng lâng tâm lý (Lightheadedness).',
    pathophysiology: 'Vertigo do xung đột thông tin giữa 2 mê đạo tiền đình hoặc thân não/tiểu não. Presyncope do giảm tưới máu não thoáng qua. Dysequilibrium do tổn thương cảm giác sâu, thị giác hoặc tiểu não.',
    redFlags: [
      'Chóng mặt cấp tính kèm nuốt khó, nói ngọng, tê nửa mặt hoặc nhìn đôi (Hội chứng Wallenberg / Nhồi máu hành não sau ngoài)',
      'Nystagmus đập dọc (Vertical nystagmus) hoặc nystagmus đổi hướng theo hướng nhìn (chắc chắn tổn thương trung ương!)',
      'Mất thăng bằng nghiêm trọng đến mức không thể tự ngồi vững trên giường dù hai tay chống đỡ',
      'Đau đầu dữ dội vùng chẩm hoặc đau cổ đột ngột (Bóc tách động mạch đốt sống)',
      'Khám HINTS (Head Impulse - Nystagmus - Test of Skew) chỉ điểm đột quỵ tiểu não'
    ],
    keyHistoryQuestions: [
      {
        dimension: 'Bản chất cảm giác "chóng mặt"',
        question: 'Bác cảm thấy nhà cửa quay cuồng chao đảo quanh mình, hay cảm giác hoa mắt xây xẩm tối sầm mặt lại?',
        clinicalMeaning: 'Nhà cửa xoay tròn: Chóng mặt tiền đình (Vertigo). Hoa mắt tối sầm khi đứng lên: Tiền ngất do tụt huyết áp tư thế (Presyncope).'
      },
      {
        dimension: 'Thời gian kéo dài của mỗi cơn',
        question: 'Mỗi cơn chóng mặt kéo dài bao lâu: vài giây, vài giờ hay liên tục nhiều ngày?',
        clinicalMeaning: 'Vài giây (khi trở mình trên giường): Chóng mặt kịch phát lành tính theo tư thế (BPPV). Vài giờ (kèm ù tai, giảm thính lực): Bệnh Ménière. Nhiều ngày liên tục dữ dội: Viêm thần kinh tiền đình hoặc Đột quỵ tiểu não.'
      },
      {
        dimension: 'Yếu tố khởi kích',
        question: 'Cơn chóng mặt xuất hiện khi xoay đầu, ngửa cổ nhìn lên, hay xuất hiện tự phát khi đang ngồi yên?',
        clinicalMeaning: 'Xoay đầu trên giường -> BPPV. Tự phát kéo dài -> Viêm thần kinh tiền đình hoặc đột quỵ mạch máu não sau.'
      }
    ],
    physicalExamFocus: [
      {
        step: 'Bộ ba nghiệm pháp HINTS (Rất quan trọng!)',
        finding: 'Head Impulse bình thường + Nystagmus đổi hướng + Test of Skew (+)',
        meaning: 'ĐỘT QUỴ TIỂU NÃO / THÂN NÃO (Trung ương). Nhạy hơn cả chụp MRI não trong 24 giờ đầu!'
      },
      {
        step: 'Nghiệm pháp Dix-Hallpike',
        finding: 'Sau 5-15s xuất hiện nystagmus xoay tròn giật lên trên kèm chóng mặt, kéo dài < 30s và mỏi mệt khi lặp lại',
        meaning: 'Chẩn đoán xác định BPPV ống bán khuyên sau. Điều trị khỏi ngay bằng Nghiệm pháp tái định vị sỏi tai Epley.'
      },
      {
        step: 'Đo Huyết áp tư thế',
        finding: 'HA tâm thu tụt > 20 mmHg hoặc tâm trương tụt > 10 mmHg sau đứng 3 phút',
        meaning: 'Hạ huyết áp tư thế (Orthostatic hypotension).'
      }
    ],
    differentialDiagnosis: [
      {
        category: 'Tiền đình Ngoại biên (Peripheral Vertigo - Lành tính)',
        diseases: [
          {
            name: 'Chóng mặt kịch phát lành tính theo tư thế (BPPV)',
            distinguishingFeatures: 'Cơn chóng mặt ngắn < 1 phút khi thay đổi tư thế đầu, Dix-Hallpike (+), thính lực hoàn toàn bình thường.',
            initialInvestigation: 'Nghiệm pháp Dix-Hallpike chẩn đoán, điều trị ngay bằng nghiệm pháp Epley.',
            priority: 'common'
          },
          {
            name: 'Viêm thần kinh tiền đình (Vestibular Neuritis)',
            distinguishingFeatures: 'Chóng mặt dữ dội liên tục nhiều ngày sau nhiễm virus, nôn nhiều, đi lại loạng choạng, KHÔNG giảm thính lực.',
            initialInvestigation: 'Khám HINTS (Head Impulse bất thường sang bên bệnh, nystagmus một hướng), loại trừ đột quỵ bằng MRI não nếu nghi ngờ.',
            priority: 'common'
          },
          {
            name: 'Bệnh Ménière (Ứ dịch nội dịch tai trong)',
            distinguishingFeatures: 'Tam chứng: Cơn chóng mặt 20 phút - vài giờ + Ù tai trầm + Giảm thính lực tiếp nhận tần số thấp + Cảm giác đầy tức tai.',
            initialInvestigation: 'Đo thính lực đồ (Audiometry), MRI góc cầu tiểu não loại trừ u dây thần kinh VIII.',
            priority: 'common'
          }
        ]
      },
      {
        category: 'Tiền đình Trung ương (Central Vertigo - Nguy hiểm)',
        diseases: [
          {
            name: 'Nhồi máu tiểu não hoặc thân não (Cerebellar / Brainstem Stroke)',
            distinguishingFeatures: 'Khám HINTS chỉ điểm trung ương, thất điều chi, nói khó, liệt mặt, nystagmus dọc hoặc đa hướng.',
            initialInvestigation: 'Chụp MRI sọ não xung khuếch tán (DWI MRI).',
            priority: 'cannot-miss'
          }
        ]
      }
    ],
    algorithm: {
      title: 'Lưu đồ Tiếp Cận Chóng Mặt và Khám HINTS',
      summary: 'Phân loại theo thời gian cơn và ứng dụng HINTS protocol loại trừ đột quỵ',
      startingPoint: 'node-vertigo-type',
      nodes: [
        {
          id: 'node-vertigo-type',
          question: 'Chóng mặt kiểu xoay tròn (Vertigo) hay cảm giác choáng váng hoa mắt (Presyncope)?',
          options: [
            {
              label: 'Chóng mặt xoay tròn thực sự (Vertigo)',
              targetId: 'node-timing',
              severity: 'warning'
            },
            {
              label: 'Choáng váng tối sầm mặt khi thay đổi tư thế đứng',
              diagnosis: 'Hạ huyết áp tư thế hoặc Rối loạn nhịp tim -> Đo HA nằm-đứng, làm ECG, đánh giá thuốc hạ áp và thuốc lợi tiểu.',
              severity: 'routine'
            }
          ]
        },
        {
          id: 'node-timing',
          question: 'Thời gian kéo dài của cơn chóng mặt xoay tròn:',
          options: [
            {
              label: 'Cơn rất ngắn (dưới 1 phút), kích phát khi lật trở mình',
              targetId: 'node-dix-hallpike',
              severity: 'routine'
            },
            {
              label: 'Kéo dài 20 phút đến vài giờ, kèm ù tai và giảm thính lực',
              diagnosis: 'Bệnh Ménière -> Đo thính lực đồ, giảm muối trong khẩu phần ăn, thuốc lợi tiểu hoặc Betahistine.',
              severity: 'warning'
            },
            {
              label: 'Chóng mặt liên tục dữ dội kéo dài nhiều ngày (Hội chứng tiền đình cấp)',
              targetId: 'node-hints',
              severity: 'urgent'
            }
          ]
        },
        {
          id: 'node-dix-hallpike',
          question: 'Làm nghiệm pháp Dix-Hallpike: Có xuất hiện nystagmus xoay giật lên sau thời gian tiềm tàng?',
          options: [
            {
              label: 'CÓ - Điển hình',
              diagnosis: 'BPPV (Sỏi ốc tai ống bán khuyên sau) -> Tiến hành thủ thuật xoay chuyển sỏi Epley (Epley Manoeuvre), khỏi ngay tại phòng khám.',
              severity: 'routine'
            },
            {
              label: 'KHÔNG - Nystagmus hướng xuống cố định không mỏi',
              diagnosis: 'Nghi ngờ tổn thương hố sau / dị tật Chiari -> Chỉ định chụp MRI sọ não.',
              severity: 'urgent'
            }
          ]
        },
        {
          id: 'node-hints',
          question: 'Kết quả bộ ba khám HINTS (Head Impulse, Nystagmus, Test of Skew):',
          options: [
            {
              label: 'Bất kỳ dấu hiệu trung ương nào: Head Impulse bình thường HOẶC Nystagmus đổi hướng HOẶC Lệch trục nhãn cầu (Skew)',
              diagnosis: 'CẢNH BÁO ĐỘT QUỴ TIỂU NÃO / THÂN NÃO -> Chụp MRI não khẩn cấp, theo dõi phù não chèn ép thân não.',
              severity: 'urgent'
            },
            {
              label: 'Cả 3 dấu hiệu đều là ngoại biên: Head impulse giật mắt điều chỉnh (bất thường) + Nystagmus 1 hướng duy nhất + Không Skew',
              diagnosis: 'Viêm thần kinh tiền đình cấp (Vestibular Neuritis) -> Corticosteroid ngắn ngày, thuốc chống nôn, tập phục hồi chức năng tiền đình.',
              severity: 'warning'
            }
          ]
        }
      ]
    },
    residentClinicalPearls: [
      'Nghịch lý Head Impulse Test trong khám HINTS: Khi làm nghiệm pháp lắc đầu nhanh (Head Impulse Test), nếu thấy xuất hiện "cử động giật mắt điều chỉnh" (bất thường) thì lại là LÀNH TÍNH (tổn thương tiền đình ngoại biên)! Còn nếu Head Impulse "hoàn toàn bình thường" ở một bệnh nhân đang chóng mặt nystagmus liên tục, thì đó lại là DẤU HIỆU NGUY CƠ CAO CỦA ĐỘT QUỴ TIỂU NÃO!',
      'Nghiệm pháp Epley chữa BPPV: Là can thiệp lâm sàng kỳ diệu nhất trong y khoa. Bệnh nhân có thể khỏi hoàn toàn cơn chóng mặt hành hạ nhiều tháng chỉ sau 5 phút làm thủ thuật nắn sỏi mà không cần bất kỳ viên thuốc nào.'
    ]
  },
  {
    id: 'approach-joint-pain',
    title: 'Tiếp Cận Bệnh Nhân Đau Khớp & Viêm Khớp',
    englishTitle: 'Approach to Joint Pain & Arthritis',
    system: 'musculoskeletal',
    urgencyLevel: 'Urgent',
    definition: 'Đau khớp (Arthralgia) là triệu chứng cơ năng đau ở khớp; Viêm khớp (Arthritis) là tình trạng viêm thực thể với đầy đủ triệu chứng sưng, nóng, đỏ, đau và hạn chế vận động.',
    pathophysiology: 'Viêm khớp nhiễm khuẩn (vi khuẩn xâm nhập ổ khớp phá hủy sụn); Viêm khớp vi tinh thể (tinh thể Urat hoặc Canxi pyrophosphat kích hoạt đại thực bào); Tự miễn (Viêm khớp dạng thấp, Lupus, Viêm cột sống dính khớp); Thoái hoá (Mất cân bằng thoái triển sụn khớp).',
    redFlags: [
      'Viêm một khớp cấp tính: Khớp sưng to, nóng đỏ, đau dữ dội, không thể cử động kèm sốt (Viêm khớp nhiễm khuẩn - CẤP CỨU CẦN CHỌC DÒ KHỚP NGAY!)',
      'Đau khớp kèm sốt cao, ban xuất huyết hoại tử trên da, sút cân nhanh',
      'Đau cột sống thắt lưng kèm sốt, đau gõ gai sống, yếu 2 chân (Viêm đĩa đệm đốt sống nhiễm khuẩn / Áp xe ngoài màng cứng)',
      'Viêm đa khớp kèm tổn thương thận (protein niệu, đái máu) hoặc khó thở'
    ],
    keyHistoryQuestions: [
      {
        dimension: 'Số lượng khớp và tính chất phân bố',
        question: 'Đau một khớp duy nhất (Monoarthritis) hay nhiều khớp (Polyarthritis)? Có đối xứng hai bên cơ thể không?',
        clinicalMeaning: '1 khớp: Viêm khớp nhiễm khuẩn, Gout, Chấn thương. Nhiều khớp đối xứng (khớp bàn ngón, cổ tay): Viêm khớp dạng thấp (RA). Không đối xứng: Viêm khớp vảy nến, Viêm khớp phản ứng.'
      },
      {
        dimension: 'Thời gian cứng khớp buổi sáng',
        question: 'Buổi sáng thức dậy khớp có bị cứng đờ không? Phải mất bao nhiêu phút hoặc tiếng xoa bóp thì mới cử động dễ dàng?',
        clinicalMeaning: 'Cứng khớp buổi sáng > 30-60 phút: Chắc chắn là Bệnh lý Viêm (Inflammatory). Cứng khớp thoáng qua < 15-30 phút: Thoái hoá khớp cơ học (Osteoarthritis).'
      },
      {
        dimension: 'Các biểu hiện ngoài khớp',
        question: 'Có vảy nến ở da/móng không? Có loét miệng, rụng tóc, đỏ mắt hay tiền sử tiêu chảy, nhiễm trùng niệu đạo trước đó không?',
        clinicalMeaning: 'Ban cánh bướm + rụng tóc + loét miệng: Lupus (SLE). Vảy nến + dính móng: Viêm khớp vảy nến. Viêm niệu đạo + viêm kết mạc sau tiêu chảy: Viêm khớp phản ứng (Reiter).'
      }
    ],
    physicalExamFocus: [
      {
        step: 'Khám 4 dấu hiệu viêm',
        finding: 'Khớp sưng phồng do tràn dịch màng hoạt dịch, nóng đỏ rực rỡ, đau chói',
        meaning: 'Viêm khớp nhiễm khuẩn hoặc Cơn Gout cấp.'
      },
      {
        step: 'Khám bàn tay chi tiết',
        finding: 'Hạt Heberden (khớp ngón xa DIP) và Bouchard (khớp ngón gần PIP)',
        meaning: 'Thoái hoá khớp ngón tay (Nodal Osteoarthritis).'
      },
      {
        step: 'Tìm biến dạng khớp giai đoạn muộn',
        finding: 'Bàn tay gió thổi (Ulnar deviation), ngón tay cổ cò (Swan-neck), ngón tay cài khuy (Boutonniere)',
        meaning: 'Di chứng của Viêm khớp dạng thấp (RA) phá hủy dây chằng và sụn khớp.'
      }
    ],
    differentialDiagnosis: [
      {
        category: 'Viêm một khớp cấp tính (Acute Monoarthritis - Rule out Sepsis)',
        diseases: [
          {
            name: 'Viêm khớp nhiễm khuẩn (Septic Arthritis)',
            distinguishingFeatures: 'Sưng nóng đỏ đau dữ dội 1 khớp (hay gặp nhất là khớp gối), sốt, hạn chế vận động tuyệt đối.',
            initialInvestigation: 'Chọc hút dịch khớp làm xét nghiệm tế bào, nhuộm Gram và cấy vi khuẩn NGAY LẬP TỨC.',
            priority: 'cannot-miss'
          },
          {
            name: 'Cơn Gout cấp tính (Acute Gouty Arthritis)',
            distinguishingFeatures: 'Đau dữ dội đạt đỉnh trong 12-24h, hay gặp nhất ở khớp bàn ngón chân cái (khớp ngón I - Podagra), tiền sử tăng axit uric máu.',
            initialInvestigation: 'Soi tươi dịch khớp dưới kính hiển vi phân cực (thấy tinh thể Urat hình kim có tính lưỡng chiết quang âm tính).',
            priority: 'common'
          }
        ]
      },
      {
        category: 'Viêm nhiều khớp mạn tính (Chronic Polyarthritis)',
        diseases: [
          {
            name: 'Viêm khớp dạng thấp (Rheumatoid Arthritis - RA)',
            distinguishingFeatures: 'Nữ giới tuổi trung niên, viêm đối xứng các khớp nhỏ bàn tay (MCP, PIP, cổ tay), cứng khớp sáng > 1h, không tổn thương DIP.',
            initialInvestigation: 'Kháng thể Anti-CCP (rất đặc hiệu), Yếu tố dạng thấp RF, X-quang khớp bàn tay hai bên.',
            priority: 'common'
          },
          {
            name: 'Thoái hoá khớp (Osteoarthritis - OA)',
            distinguishingFeatures: 'Người cao tuổi, đau tăng khi vận động chịu lực, giảm khi nghỉ, cứng khớp sáng < 30 phút, hạt Heberden và Bouchard.',
            initialInvestigation: 'X-quang khớp (4 dấu hiệu kinh điển: hẹp khe khớp không đều, đặc xương dưới sụn, gai xương ở rìa, nang xương dưới sụn).',
            priority: 'common'
          }
        ]
      }
    ],
    algorithm: {
      title: 'Lưu đồ Tiếp Cận Bệnh Nhân Đau Khớp (Joint Pain CDSS)',
      summary: 'Phân loại theo số lượng khớp và tính chất Viêm vs Cơ học',
      startingPoint: 'node-joint-count',
      nodes: [
        {
          id: 'node-joint-count',
          question: 'Số lượng khớp bị tổn thương là bao nhiêu?',
          options: [
            {
              label: 'Một khớp duy nhất (Viêm 1 khớp cấp - Monoarthritis)',
              targetId: 'node-mono',
              severity: 'urgent'
            },
            {
              label: 'Nhiều khớp (Viêm đa khớp - Polyarthritis)',
              targetId: 'node-poly',
              severity: 'warning'
            }
          ]
        },
        {
          id: 'node-mono',
          question: 'Khớp sưng nóng đỏ đau dữ dội: Bước xử trí thiết yếu hàng đầu là gì?',
          options: [
            {
              label: 'CHỌC HÚT DỊCH KHỚP XÉT NGHIỆM KHẨN CẤP',
              diagnosis: 'Phân tích dịch khớp: Bạch cầu > 50.000/mm3 với > 90% bạch cầu đa nhân trung tính -> Viêm khớp nhiễm khuẩn; Tìm tinh thể Urat -> Gout; Tinh thể CPPD hình thoi -> Giả Gout.',
              severity: 'urgent'
            }
          ]
        },
        {
          id: 'node-poly',
          question: 'Thời gian cứng khớp buổi sáng của bệnh nhân kéo dài bao lâu?',
          options: [
            {
              label: 'Cứng khớp sáng kéo dài > 30-60 phút (Đặc trưng của Viêm)',
              targetId: 'node-poly-pattern',
              severity: 'warning'
            },
            {
              label: 'Cứng khớp thoáng qua < 15-30 phút, đau tăng khi đi lại (Đặc trưng Cơ học)',
              diagnosis: 'Thoái hoá khớp (Osteoarthritis) -> Chụp X-quang khớp chịu lực, tập vật lý trị liệu, giảm cân, Paracetamol/NSAIDs.',
              severity: 'routine'
            }
          ]
        },
        {
          id: 'node-poly-pattern',
          question: 'Kiểu phân bố tổn thương khớp có đối xứng hai bên không?',
          options: [
            {
              label: 'Đối xứng hai bên, ưu thế khớp nhỏ cổ tay, bàn ngón tay (MCP, PIP)',
              diagnosis: 'Viêm khớp dạng thấp (RA) hoặc Lupus ban đỏ (SLE) -> Xét nghiệm Anti-CCP, RF, ANA, CRP, chỉ định sớm thuốc DMARDs.',
              severity: 'warning'
            },
            {
              label: 'Không đối xứng, kèm sưng ngón tay hình khúc dồi (Dactylitis) hoặc viêm cột sống',
              diagnosis: 'Bệnh lý cột sống huyết thanh âm tính (Viêm cột sống dính khớp, Viêm khớp vảy nến, Viêm khớp phản ứng) -> Xét nghiệm HLA-B27, chụp MRI khớp cùng chậu.',
              severity: 'warning'
            }
          ]
        }
      ]
    },
    residentClinicalPearls: [
      'Quy tắc vàng về Viêm một khớp cấp: Bất kỳ bệnh nhân nào xuất hiện sưng nóng đỏ đau một khớp cấp tính đều phải xem là VIÊM KHỚP NHIỄM KHUẨN cho đến khi dịch khớp được chọc hút và xét nghiệm loại trừ! Đừng bao giờ vội vàng kết luận là Gout hay tiêm Corticoid vào khớp.',
      'Khớp bàn ngón xa (DIP): Nếu bệnh nhân có viêm sưng đau ở khớp ngón xa DIP, hai chẩn đoán phải nghĩ tới là THOÁI HOÁ KHỚP (hạt Heberden) hoặc VIÊM KHỚP VẢY NẾN. Viêm khớp dạng thấp kinh điển KHÔNG BAO GIỜ tổn thương khớp ngón xa DIP đơn độc!'
    ]
  },
  {
    id: 'approach-headache',
    title: 'Tiếp Cận Bệnh Nhân Đau Đầu Cấp & Mạn Tính',
    englishTitle: 'Approach to Acute & Chronic Headache (Macleod Ch.7)',
    system: 'neurological',
    urgencyLevel: 'Emergency',
    definition: 'Đau đầu là cảm giác đau nhức ở bất kỳ phần nào của đầu hoặc cổ trên, chia thành đau đầu nguyên phát (Migraine, Tension, Cluster) và đau đầu thứ phát nguy hiểm tính mạng.',
    pathophysiology: 'Nhu mô não không có thụ cảm thể đau; đau đầu phát sinh do kích thích màng não, mạch máu màng não (qua dây V), xoang tĩnh mạch, cơ da đầu và dây thần kinh sọ.',
    redFlags: [
      'S - Systemic symptoms: Sốt, sụt cân, tiền sử ung thư, suy giảm miễn dịch HIV.',
      'N - Neurological signs: Liệt khu trú, lú lẫn, co giật, phù gai thị, nhìn đôi.',
      'O - Onset: Đau đầu sét đánh (Thunderclap headache) - đau dữ dội nhất cuộc đời đạt đỉnh trong vòng 1 phút.',
      'O - Older age: Đau đầu mới khởi phát lần đầu ở người > 50 tuổi (nghi ngờ Viêm động mạch thái dương hoặc U não).',
      'P - Pattern change: Thay đổi tính chất cơn đau đầu mạn tính, đau tăng khi ho/rặn, đau dữ dội khi thức giấc hoặc đau tư thế.'
    ],
    keyHistoryQuestions: [
      {
        dimension: 'Tốc độ khởi phát (Onset)',
        question: 'Cơn đau bắt đầu đột ngột dữ dội như bị sét đánh trúng đầu trong vài giây hay đau âm ỉ tăng dần?',
        clinicalMeaning: 'Đau đầu sét đánh đạt đỉnh trong < 1 phút là dấu hiệu chỉ điểm của Xuất huyết khoang dưới nhện (SAH) do vỡ phình mạch não.'
      },
      {
        dimension: 'Yếu tố tư thế & thời điểm (Timing & Posture)',
        question: 'Cơn đau có dữ dội nhất vào lúc sáng sớm thức dậy kèm buồn nôn không? Đau có tăng khi ho, cúi người hoặc rặn đại tiện không?',
        clinicalMeaning: 'Đau sáng sớm tăng khi ho/rặn gợi ý Tăng áp lực nội sọ (U não, xuất huyết). Đau dữ dội khi đứng dậy và biến mất khi nằm phẳng gợi ý Giảm áp lực dịch não tủy do rò DNT.'
      },
      {
        dimension: 'Triệu chứng đi kèm (Associated symptoms)',
        question: 'Bác có thấy sốt, cứng cổ sợ ánh sáng, đau buốt thái dương khi chải đầu, hay đau mỏi cơ hàm khi nhai thức ăn (Jaw claudication) không?',
        clinicalMeaning: 'Đau cơ hàm khi nhai + Đau thái dương ở người > 50 tuổi là dấu hiệu vàng của Viêm động mạch thái dương tế bào khổng lồ (GCA - nguy cơ mù vĩnh viễn).'
      }
    ],
    physicalExamFocus: [
      {
        step: 'Khám dấu màng não',
        finding: 'Dấu cứng gáy (Neck stiffness) & Dấu Kernig / Brudzinski (+)',
        meaning: 'Kích thích màng não do Viêm màng não mủ hoặc Xuất huyết khoang dưới nhện.'
      },
      {
        step: 'Soi đáy mắt',
        finding: 'Phù gai thị (Papilloedema) - bờ gai mờ, mất hõm gai sinh lý',
        meaning: 'Tăng áp lực nội sọ kéo dài; CHỐNG CHỈ ĐỊNH chọc dò tủy sống trước khi chụp CT sọ não!'
      },
      {
        step: 'Bắt mạch thái dương',
        finding: 'Động mạch thái dương nông căng cứng như sợi thừng, không đập, ấn đau',
        meaning: 'Viêm động mạch tế bào khổng lồ (Giant Cell Arteritis).'
      }
    ],
    differentialDiagnosis: [
      {
        category: 'Nguy kịch đe dọa tính mạng (Thứ phát)',
        diseases: [
          {
            name: 'Xuất huyết khoang dưới nhện (SAH)',
            distinguishingFeatures: 'Đau đầu sét đánh dữ dội nhất cuộc đời, nôn ói, lú lẫn, gáy cứng, có thể mất ý thức thoáng qua.',
            initialInvestigation: 'Chụp CT sọ não không cản quang khẩn cấp trong 6 giờ đầu. Nếu CT âm tính nhưng nghi ngờ cao: Chọc dò dịch não tủy tìm Xanthochromia (sau 12 giờ).',
            priority: 'cannot-miss'
          },
          {
            name: 'Viêm màng não cấp tính (Bacterial Meningitis)',
            distinguishingFeatures: 'Tam chứng: Sốt cao + Cứng gáy + Rối loạn tri giác, có thể có ban xuất huyết hoại tử hình sao (não mô cầu).',
            initialInvestigation: 'Kháng sinh phổ rộng tiêm mạch (Ceftriaxone 2g + Vancomycin + Dexamethasone) NGAY LẬP TỨC, không trì hoãn chờ kết quả chọc dò nếu nghi ngờ cao.',
            priority: 'cannot-miss'
          },
          {
            name: 'Viêm động mạch thái dương (Giant Cell Arteritis)',
            distinguishingFeatures: 'Tuổi > 50, đau thái dương một bên, đau mỏi hàm khi nhai, tốc độ máu lắng ESR > 50-100 mm/h.',
            initialInvestigation: 'Dùng Corticoid liều cao (Prednisolone 60 mg/ngày) ngay tức thì để bảo tồn thị lực, sau đó làm sinh thiết động mạch thái dương.',
            priority: 'cannot-miss'
          }
        ]
      },
      {
        category: 'Đau đầu nguyên phát lành tính',
        diseases: [
          {
            name: 'Đau nửa đầu Migraine',
            distinguishingFeatures: 'Đau theo nhịp mạch đập nửa đầu, kéo dài 4-72 giờ, sợ ánh sáng sợ tiếng ồn, buồn nôn, có thể có tiền triệu aura thị giác.',
            initialInvestigation: 'Cắt cơn bằng Triptans (Sumatriptan) hoặc NSAIDs; phòng ngừa bằng Beta-blocker hoặc Topiramate.',
            priority: 'common'
          },
          {
            name: 'Đau đầu căng thẳng (Tension-type Headache)',
            distinguishingFeatures: 'Đau thắt vòng quanh đầu như đội vòng kim cô, âm ỉ hai bên, không có buồn nôn hay sợ ánh sáng.',
            initialInvestigation: 'Paracetamol, NSAIDs, thư giãn cơ, giảm căng thẳng.',
            priority: 'common'
          }
        ]
      }
    ],
    algorithm: {
      title: 'Lưu đồ chẩn đoán đau đầu cấp & mạn tính',
      summary: 'Phân loại nhanh chóng giữa đau đầu nguy kịch (SAH, Viêm màng não, U não) và đau đầu nguyên phát lành tính.',
      startingPoint: 'node-headache-onset',
      nodes: [
        {
          id: 'node-headache-onset',
          question: 'Cơn đau đầu có phải là đau đầu sét đánh (Thunderclap: đạt đỉnh dữ dội tối đa trong vòng 1 phút)?',
          options: [
            {
              label: 'CÓ - Đau sét đánh dữ dội đạt đỉnh ngay lập tức',
              diagnosis: 'CẢNH BÁO XUẤT HUYẾT DƯỚI NHỆN (SAH) -> Chụp CT sọ não không cản quang cấp cứu ngay lập tức!',
              severity: 'urgent'
            },
            {
              label: 'KHÔNG - Khởi phát từ từ hoặc bán cấp',
              targetId: 'node-headache-redflags',
              severity: 'warning'
            }
          ]
        },
        {
          id: 'node-headache-redflags',
          question: 'Bệnh nhân có sốt, cứng gáy, dấu thần kinh khu trú, phù gai thị hoặc tiền sử ung thư?',
          options: [
            {
              label: 'CÓ - Có dấu màng não hoặc dấu thần kinh khu trú',
              diagnosis: 'Nghi ngờ Viêm màng não hoặc Khối choán chỗ nội sọ -> Kháng sinh khẩn + Chụp CT sọ não trước khi chọc DNT.',
              severity: 'urgent'
            },
            {
              label: 'KHÔNG - Khám thần kinh hoàn toàn bình thường',
              targetId: 'node-headache-primary',
              severity: 'routine'
            }
          ]
        },
        {
          id: 'node-headache-primary',
          question: 'Đau đầu theo nhịp đập nửa bên kèm buồn nôn và sợ ánh sáng, hay đau thắt đè ép cả hai bên?',
          options: [
            {
              label: 'Đau giật nửa bên, nôn ói, sợ ánh sáng (Migraine)',
              diagnosis: 'Cơn Migraine cấp tính -> Điều trị cắt cơn bằng Triptans + chống nôn.',
              severity: 'routine'
            },
            {
              label: 'Đau đè ép như đội vòng siết quanh trán hai bên',
              diagnosis: 'Đau đầu căng thẳng (Tension headache) -> Paracetamol / NSAIDs + nghỉ ngơi.',
              severity: 'routine'
            }
          ]
        }
      ]
    },
    residentClinicalPearls: [
      'Quy tắc vàng chọc dò dịch não tủy trong SAH: Nếu nghi ngờ Xuất huyết dưới nhện mà phim CT sọ não chụp sau 6 giờ cho kết quả bình thường, BẮT BUỘC phải chọc dò thắt lưng sau thời điểm khởi phát 12 giờ để tìm Xanthochromia (dịch não tủy vàng do thoái hóa oxyhaemoglobin thành bilirubin).',
      'Đau đầu ở người trên 50 tuổi: Không bao giờ được chẩn đoán Migraine lần đầu tiên ở bệnh nhân > 50 tuổi mà không loại trừ Viêm động mạch thái dương (GCA) hoặc U não di căn!'
    ]
  },
  {
    id: 'approach-fever-fuo',
    title: 'Tiếp Cận Bệnh Nhân Sốt & Sốt Chưa Rõ Nguyên Nhân',
    englishTitle: 'Approach to Fever & Pyrexia of Unknown Origin (Macleod Ch.3)',
    system: 'general',
    urgencyLevel: 'Urgent',
    definition: 'Sốt là sự gia tăng thân nhiệt trung tâm do trung tâm điều nhiệt vùng dưới đồi thiết lập lại ngưỡng nhiệt (> 38.3°C). Sốt chưa rõ nguyên nhân (FUO) là sốt > 38.3°C kéo dài > 3 tuần mà không tìm ra nguyên nhân sau 3 ngày nhập viện hoặc 3 lần khám ngoại trú.',
    pathophysiology: 'Nội độc tố vi khuẩn hoặc cytokine nội sinh (IL-1, IL-6, TNF-alpha) kích thích thụ thể nội mô mạch máu vùng dưới đồi sản xuất Prostaglandin E2 (PGE2), nâng điểm thiết lập thân nhiệt.',
    redFlags: [
      'Dấu hiệu sốc nhiễm khuẩn (Septic Shock): Tụt huyết áp (HA tâm thu < 90 mmHg), lactate máu > 2 mmol/L dù đã bù đủ dịch.',
      'Rối loạn tri giác, lú lẫn, cứng gáy, xuất huyết hoại tử da hình sao (Meningococcaemia).',
      'Thở nhanh > 25 lần/phút, SpO2 < 92%, thiểu niệu vô niệu (Suy đa tạng theo thang điểm qSOFA/SOFA).',
      'Bệnh nhân suy giảm miễn dịch nặng: Bạch cầu trung tính < 500/uL (Neutropenic fever sau hóa trị) hoặc HIV/AIDS.'
    ],
    keyHistoryQuestions: [
      {
        dimension: 'Yếu tố dịch tễ & Du lịch (Travel history)',
        question: 'Trong vòng vài tuần đến vài tháng qua, bác có đi du lịch hay công tác ở vùng rừng núi, vùng lưu hành sốt rét, sốt xuất huyết hay vùng dịch tễ nào không?',
        clinicalMeaning: 'Sốt rét có thể khởi phát sau nhiều tháng (P. vivax, P. ovale thể ngủ trong gan). Sốt xuất huyết Dengue ủ bệnh 4-10 ngày.'
      },
      {
        dimension: 'Phơi nhiễm động vật & Nghề nghiệp (Exposures)',
        question: 'Bác có tiếp xúc với gia súc, chuột, cắn bọ ve, uống sữa tươi chưa tiệt trùng hay ăn nem chua thịt sống không?',
        clinicalMeaning: 'Bệnh Leptospira (nước tiểu chuột), Rickettsia / Sốt mò (vết mò đốt eschar), Brucellosis (sữa chưa tiệt trùng), Toxoplasmosis (mèo).'
      },
      {
        dimension: 'Đơn thuốc & Dị ứng (Drug Fever)',
        question: 'Bác có mới bắt đầu uống loại thuốc kháng sinh, chống động kinh hay tim mạch nào trong 1-3 tuần qua không?',
        clinicalMeaning: 'Sốt do thuốc (Drug fever): Bệnh nhân sốt cao nhưng toàn trạng vẫn tương đối khỏe khoắn, kèm tăng bạch cầu ái toan (Eosinophilia).'
      }
    ],
    physicalExamFocus: [
      {
        step: 'Khám toàn bộ bề mặt da',
        finding: 'Vết cắn đáy đen viền đỏ (Eschar) ở nách, bẹn, vùng kín',
        meaning: 'Bệnh Sốt mò (Scrub typhus do Orientia tsutsugamushi).'
      },
      {
        step: 'Nghe tim tìm tiếng thổi',
        finding: 'Tiếng thổi tâm thu mới xuất hiện kèm xuất huyết móng dạng vệt',
        meaning: 'Viêm nội tâm mạc nhiễm khuẩn (Infective Endocarditis).'
      },
      {
        step: 'Sờ hạch bạch huyết toàn thân',
        finding: 'Hạch to lan tỏa, sờ như cao su, gan lách to',
        meaning: 'U lympho ác tính (Lymphoma) hoặc Lao hạch.'
      }
    ],
    differentialDiagnosis: [
      {
        category: 'Nhiễm trùng (Chiếm 30-40% FUO)',
        diseases: [
          {
            name: 'Lao ngoài phổi / Lao kê (Miliary TB)',
            distinguishingFeatures: 'Sốt về chiều, sụt cân, ra mồ hôi trộm, tổn thương hạt kê trên X-quang phổi hoặc sinh thiết tạng.',
            initialInvestigation: 'Cấy đờm, PCR lao GeneXpert, soi đáy mắt tìm củ lao màng mạch, khởi động phác đồ chống lao RHZE.',
            priority: 'cannot-miss'
          },
          {
            name: 'Viêm nội tâm mạc nhiễm khuẩn (Infective Endocarditis)',
            distinguishingFeatures: 'Sốt kéo dài, tiếng thổi tim mới, lách to, nước tiểu có hồng cầu vi thể, tổn thương Janeway/Osler.',
            initialInvestigation: 'Cấy máu 3 bộ ở 3 vị trí khác nhau trước khi dùng kháng sinh, siêu âm tim qua thực quản (TEE).',
            priority: 'cannot-miss'
          },
          {
            name: 'Áp xe ẩn sâu (Intra-abdominal / Pelvic Abscess)',
            distinguishingFeatures: 'Sốt dao động mạnh kèm rét run, bạch cầu tăng cao, tiền sử phẫu thuật bụng.',
            initialInvestigation: 'Chụp CT ngực bụng có cản quang, dẫn lưu ổ mủ qua da.',
            priority: 'cannot-miss'
          }
        ]
      },
      {
        category: 'Bệnh tự miễn & Ác tính (Chiếm 30-40% FUO)',
        diseases: [
          {
            name: 'Bệnh Still người lớn (Adult-onset Still’s Disease)',
            distinguishingFeatures: 'Sốt cao vọt hàng ngày về chiều, ban đỏ màu cá hồi thoáng qua lúc sốt, đau khớp, Ferritin máu tăng cực cao (> 1000-5000 ng/mL).',
            initialInvestigation: 'Corticoid liều cao, thuốc ức chế IL-1 (Anakinra) sau khi loại trừ nhiễm trùng và ung thư.',
            priority: 'less-common'
          },
          {
            name: 'U Lympho ác tính (Lymphoma)',
            distinguishingFeatures: 'Sốt chu kỳ kiểu Pel-Ebstein, sút cân > 10%, mồ hôi đêm (tam chứng B symptoms), hạch to.',
            initialInvestigation: 'Sinh thiết trọn vẹn một hạch bạch huyết (Excisional biopsy) để giải phẫu bệnh.',
            priority: 'cannot-miss'
          }
        ]
      }
    ],
    algorithm: {
      title: 'Lưu đồ tiếp cận sốt cấp & sốt chưa rõ nguyên nhân (FUO)',
      summary: 'Quy trình xử trí sốc nhiễm trùng, sốt giảm bạch cầu và các bước tầm soát căn nguyên FUO mạn tính.',
      startingPoint: 'node-fever-stability',
      nodes: [
        {
          id: 'node-fever-stability',
          question: 'Bệnh nhân có dấu hiệu sốc nhiễm khuẩn (Tụt huyết áp, tri giác suy giảm, thở nhanh, lactate > 2)?',
          options: [
            {
              label: 'CÓ - Sốc nhiễm trùng đe dọa tử vong',
              diagnosis: 'CẤP CỨU NHIỄM KHUẨN HUYẾT -> Kháng sinh phổ rộng tiêm mạch trong 1 giờ đầu + Bù dịch 30ml/kg + Cấy máu 2 bộ!',
              severity: 'urgent'
            },
            {
              label: 'KHÔNG - Huyết động ổn định',
              targetId: 'node-fever-neutropenia',
              severity: 'warning'
            }
          ]
        },
        {
          id: 'node-fever-neutropenia',
          question: 'Bệnh nhân có giảm bạch cầu trung tính (ANC < 500) hoặc đang điều trị hóa trị ung thư?',
          options: [
            {
              label: 'CÓ - Sốt hạ bạch cầu trung tính (Neutropenic Fever)',
              diagnosis: 'CẤP CỨU NỘI KHOA UNG THƯ -> Dùng kháng sinh diệt trực khuẩn mủ xanh (Meropenem hoặc Cefepime) ngay lập tức!',
              severity: 'urgent'
            },
            {
              label: 'KHÔNG - Bạch cầu bình thường, sốt kéo dài > 3 tuần',
              targetId: 'node-fever-fuo-workup',
              severity: 'routine'
            }
          ]
        },
        {
          id: 'node-fever-fuo-workup',
          question: 'Khám lâm sàng có phát hiện vết mò cắn, tiếng thổi tim mới, hay hạch to?',
          options: [
            {
              label: 'Có tiếng thổi tim mới hoặc tổn thương mạch ngoại vi',
              diagnosis: 'Nghi ngờ Viêm nội tâm mạc -> Cấy máu 3 bộ + Siêu âm tim qua thành ngực / thực quản.',
              severity: 'warning'
            },
            {
              label: 'Không có dấu khu trú -> Tiến hành gói xét nghiệm FUO',
              diagnosis: 'Tiếp cận FUO chuẩn mực: Cấy máu, cấy nước tiểu, CT ngực-bụng-chậu, Ferritin, ANA, ESR/CRP, cấy đờm tìm AFB/GeneXpert.',
              severity: 'routine'
            }
          ]
        }
      ]
    },
    residentClinicalPearls: [
      'Phân ly mạch - nhiệt (Faget’s sign): Thường khi sốt tăng 1°C thì nhịp tim tăng khoảng 10-15 nhịp/phút. Nếu bệnh nhân sốt cao 39-40°C mà nhịp tim vẫn chậm < 70-80 nhịp/phút, hãy nghĩ ngay đến: Sốt thương hàn (Typhoid fever), Bệnh Legionella, Bệnh sốt vàng hoặc Sốt do thuốc (Drug fever).',
      'Khám vết đốt mò (Eschar): Bọ mò thường cắn ở những vùng da ẩm, ấm và kín đáo (nách, dưới bầu vú, bẹn, quanh hậu môn, bìu, rốn). Nếu không cởi bỏ quần áo bệnh nhân để khám toàn diện, bác sĩ sẽ bỏ sót 100% vết mò đốt và chẩn đoán nhầm thành nhiễm trùng huyết không rõ nguồn!'
    ]
  }
];

