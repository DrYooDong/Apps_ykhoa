/**
 * DocSpace — ECG Clinical Presets & Waveform Library
 * Path: src/content/docspace/features/studios/ecg-presets.ts
 */

import { EcgInputs, EcgPreset, EcgMorphologyComparison } from './ecg-types';

export const ECG_PRESETS: EcgPreset[] = [
  {
    id: 'stemi_anterior_proximal_lad',
    name: '1. STEMI Thành Trước Rộng (Tắc Đoạn Gần LAD)',
    badge: '🚨 Cấp Cứu Mạch Vành Cực Nguy',
    badgeColor: '#dc2626',
    category: 'ischemia',
    description: 'ST chênh vòm V1-V6, DI, aVL (2-6mm) kèm ST chênh xuống soi gương DII, DIII, aVF. Tắc thân LAD trước nhánh D1/S1.',
    keyLeads: ['V2', 'V3', 'aVL', 'III'],
    annotations: [
      { lead: 'V2', waveTarget: 'J', label: 'ST↑ +5.5mm (Vòm)', badgeType: 'danger', detail: 'Điểm J chênh lên cao tạo dạng bia mộ (Tombstone), tổn thương xuyên thành vách trước.' },
      { lead: 'V3', waveTarget: 'T', label: 'T Tối Cấp (Hyperacute)', badgeType: 'danger', detail: 'Sóng T khổng lồ phồng rộng cùng đoạn ST chênh lên.' },
      { lead: 'aVL', waveTarget: 'J', label: 'ST↑ +3.0mm', badgeType: 'danger', detail: 'Tổn thương thành bên cao do tắc trên nhánh chéo D1.' },
      { lead: 'III', waveTarget: 'ST', label: 'ST↓ Soi Gương -3.0mm', badgeType: 'warning', detail: 'Hình ảnh soi gương (Reciprocal STD) đối kháng qua trục điện học tim.' }
    ],
    morphology: {
      title: 'Đối chiếu Hình thái: STEMI Trước Rộng vs ECG Bình Thường',
      normalDescription: 'Đoạn ST nằm ngang trên đường đẳng điện (0mm), sóng T dương nhẹ 2-4mm, phức bộ QRS thanh mảnh 85ms.',
      pathologicalDescription: 'ST chênh vòm cực đại 5.5-6.0mm ở V2-V3 vượt ngưỡng chẩn đoán quốc tế (≥2.0mm ở nam), kèm ST chênh xuống sâu ở DII, DIII, aVF.',
      keySignatures: [
        { feature: 'Điểm J / Đoạn ST ở V2-V3', normal: 'Đẳng điện (0 ± 0.5 mm)', abnormal: 'Chênh lên dạng vòm +5.5 mm', significance: 'Dòng tổn thương thiếu máu xuyên thành cơ tim thất trái' },
        { feature: 'Chuyển đạo thành dưới (DIII, aVF)', normal: 'ST đẳng điện, T dương', abnormal: 'ST chênh xuống soi gương -3.0 mm', significance: 'Khẳng định độ đặc hiệu >95% nhồi máu cơ tim cấp OMI' },
        { feature: 'Sóng T chuyển đạo trước tim', normal: 'T dương vừa phải, bất đối xứng', abnormal: 'Sóng T khổng lồ phồng to (Hyperacute T)', significance: 'Giai đoạn tối cấp của tắc mạch vành hoàn toàn' }
      ],
      electrophysiologyMechanism: 'Dòng điện tổn thương tâm thu (Systolic injury current) hướng về phía các điện cực trước tim do mất phân cực sớm vùng cơ tim thiếu máu diện rộng.',
      reciprocalChanges: 'DII, DIII, aVF (ST chênh xuống 2-3mm)',
      targetLeads: ['V1', 'V2', 'V3', 'V4', 'aVL', 'III']
    },
    values: {
      heartRate: 110, rhythmType: 'sinus', lead1Net: 10, avfNet: -8, prInterval: 145, qrsDuration: 95, qtInterval: 390,
      stI: 2.5, stII: -2.0, stIII: -3.0, staVR: 1.0, staVL: 3.0, staVF: -2.5,
      stV1: 3.0, stV2: 5.5, stV3: 6.0, stV4: 4.5, stV5: 3.0, stV6: 2.0,
      tWaveType: 'hyperacute', sv1: 6, rv5: 14, raVL: 12, sv3: 8, gender: 'male'
    }
  },
  {
    id: 'stemi_inferior_rv_rca',
    name: '2. STEMI Thành Dưới + Thất Phải (Tắc RCA)',
    badge: '⚠️ ST Chênh DIII > DII, ST↑ V4R',
    badgeColor: '#ea580c',
    category: 'ischemia',
    description: 'ST chênh lên DIII > DII, aVF kèm ST chênh lên ở V4R (1.5mm). ST chênh xuống soi gương DI, aVL. Chống chỉ định Nitrate.',
    keyLeads: ['III', 'aVF', 'V4R', 'aVL'],
    annotations: [
      { lead: 'III', waveTarget: 'J', label: 'ST↑ +4.5mm (DIII > DII)', badgeType: 'danger', detail: 'Vector tổn thương lệch sang phải (+120°), định danh nhánh thủ phạm ĐM Vành Phải (RCA).' },
      { lead: 'aVF', waveTarget: 'J', label: 'ST↑ +3.5mm', badgeType: 'danger', detail: 'Tổn thương cơ tim thành dưới trực diện.' },
      { lead: 'V4R', waveTarget: 'J', label: 'ST↑ +2.0mm (Thất Phải)', badgeType: 'warning', detail: 'Nhồi máu thất phải đi kèm, tuyệt đối không dùng Nitrate hạ áp.' },
      { lead: 'aVL', waveTarget: 'ST', label: 'ST↓ Soi Gương -3.0mm', badgeType: 'info', detail: 'Hình ảnh soi gương kinh điển tại thành bên cao.' }
    ],
    morphology: {
      title: 'Đối chiếu Hình thái: STEMI Dưới + Thất Phải vs Bình Thường',
      normalDescription: 'DII, DIII, aVF có đoạn ST đẳng điện, sóng T dương mềm mại.',
      pathologicalDescription: 'ST chênh lên nổi trội ở DIII (4.5mm) vượt trội DII (2.5mm), ST chênh xuống rõ ở DI, aVL và ST chênh lên ở chuyển đạo tim phải V4R (2.0mm).',
      keySignatures: [
        { feature: 'ST ở DIII so với DII', normal: 'Đẳng điện như nhau', abnormal: 'ST↑ DIII > ST↑ DII (+4.5mm vs +2.5mm)', significance: 'Đặc trưng tắc RCA đoạn gần thay vì LCx' },
        { feature: 'Chuyển đạo bên phải V4R', normal: 'ST đẳng điện (<0.5mm)', abnormal: 'ST↑ +2.0mm tại V4R', significance: 'Nhồi máu tâm thất phải đồng thời (Phụ thuộc tiền tải)' },
        { feature: 'Chuyển đạo aVL', normal: 'ST đẳng điện', abnormal: 'ST↓ soi gương -3.0mm', significance: 'Dấu hiệu nhạy nhất của STEMI thành dưới' }
      ],
      electrophysiologyMechanism: 'Vector thiếu máu thành dưới hướng xuống dưới và sang phải, tạo ST chênh lên ở DIII/aVF và ST chênh xuống soi gương ở aVL.',
      reciprocalChanges: 'DI, aVL (ST chênh xuống 2-3mm)',
      targetLeads: ['III', 'II', 'aVF', 'aVL', 'V4R']
    },
    values: {
      heartRate: 54, rhythmType: 'sinus', lead1Net: -5, avfNet: 14, prInterval: 220, qrsDuration: 90, qtInterval: 430,
      stI: -2.0, stII: 2.5, stIII: 4.5, staVR: -1.0, staVL: -3.0, staVF: 3.5,
      stV1: 1.0, stV2: -1.5, stV3: -1.0, stV4: 0.5, stV5: 0, stV6: 0, stV4R: 2.0,
      tWaveType: 'normal', sv1: 5, rv5: 12, raVL: -4, sv3: 6, gender: 'male'
    }
  },
  {
    id: 'wellens_type_a',
    name: '3. Hội Chứng Wellens Type A (Hẹp Nặng Thân LAD)',
    badge: '🚨 Hội Chứng Tiền Nhồi Máu Cấp',
    badgeColor: '#dc2626',
    category: 'ischemia',
    description: 'Sóng T hai pha (+/-) rõ rệt ở V2, V3 trong giai đoạn hết đau ngực. 75% nhồi máu cơ tim trước rộng trong vòng vài ngày nếu không can thiệp.',
    keyLeads: ['V2', 'V3', 'V4', 'I'],
    annotations: [
      { lead: 'V2', waveTarget: 'T', label: 'T Hai Pha (+/-) Type A', badgeType: 'danger', detail: 'Pha đầu dương, pha sau âm sâu đặc trưng cho tái tưới máu không bền vững của LAD.' },
      { lead: 'V3', waveTarget: 'T', label: 'T Biphasic Điển Hình', badgeType: 'danger', detail: 'Hẹp > 90% đoạn gần động mạch liên thất trước.' }
    ],
    morphology: {
      title: 'Đối chiếu Hình thái: Hội Chứng Wellens Type A vs Bình Thường',
      normalDescription: 'Sóng T ở V2-V3 hoàn toàn dương, tròn đều, sườn lên thoai thoải sườn xuống dốc.',
      pathologicalDescription: 'Sóng T hai pha (Biphasic: nhô lên dương rồi lao thẳng xuống âm sâu) ở V2, V3 mà đoạn ST không chênh và không có sóng Q hoại tử.',
      keySignatures: [
        { feature: 'Hình thái sóng T ở V2-V3', normal: 'Dương đơn pha, đỉnh mềm', abnormal: 'Hai pha (+/-) rõ rệt', significance: 'Hẹp cực nặng đoạn gần LAD (Critical LAD Stenosis)' },
        { feature: 'Đoạn ST', normal: 'Đẳng điện (0mm)', abnormal: 'Gần như đẳng điện hoặc chênh rất nhẹ (<1mm)', significance: 'Bẫy bỏ sót nhồi máu cơ tim nếu chỉ tìm ST chênh vòm' }
      ],
      electrophysiologyMechanism: 'Tái cực bất đồng nhất sau khi nhánh LAD tự tái thông một phần sau cơn co thắt/thiếu máu cục bộ nặng.',
      targetLeads: ['V2', 'V3', 'V4']
    },
    values: {
      heartRate: 72, rhythmType: 'sinus', lead1Net: 8, avfNet: 6, prInterval: 160, qrsDuration: 85, qtInterval: 420,
      stI: 0, stII: 0, stIII: 0, staVR: 0, staVL: 0.5, staVF: 0,
      stV1: 0.5, stV2: 0.5, stV3: 0.5, stV4: 0, stV5: 0, stV6: 0,
      tWaveType: 'biphasic_wellens', sv1: 8, rv5: 16, raVL: 7, sv3: 10, gender: 'male'
    }
  },
  {
    id: 'wellens_type_b',
    name: '4. Hội Chứng Wellens Type B (T Đảo Ngược Sâu Đối Xứng)',
    badge: '🚨 Hẹp > 90% LAD Đoạn Gần',
    badgeColor: '#dc2626',
    category: 'ischemia',
    description: 'Sóng T âm sâu (> 5mm), đối xứng ở V2, V3, V4, V5 mà không có sóng Q hoại tử. Báo hiệu cơ tim đang hồi phục sau thiếu máu cục bộ nặng.',
    keyLeads: ['V2', 'V3', 'V4', 'V5'],
    annotations: [
      { lead: 'V2', waveTarget: 'T', label: 'T Âm Sâu Đối Xứng (-6mm)', badgeType: 'danger', detail: 'Sóng T cắm sâu hình chữ V ngược đối xứng hoàn hảo.' },
      { lead: 'V3', waveTarget: 'T', label: 'T Âm Khổng Lồ (-7mm)', badgeType: 'danger', detail: 'Nguy cơ tắc hoàn toàn LAD trong vòng 24-48 giờ.' }
    ],
    morphology: {
      title: 'Đối chiếu Hình thái: Hội Chứng Wellens Type B vs Bình Thường',
      normalDescription: 'Sóng T dương từ V2 đến V6, biên độ 3-6mm.',
      pathologicalDescription: 'Sóng T âm sâu > 5mm, đối xứng tuyệt đối hình chữ V nhọn ở các chuyển đạo trước tim V2-V5.',
      keySignatures: [
        { feature: 'Sóng T V2-V4', normal: 'Dương (+3 đến +6 mm)', abnormal: 'Âm sâu đối xứng (-5 đến -8 mm)', significance: 'Tiêu chuẩn Wellens Type B (75% ca Wellens)' }
      ],
      electrophysiologyMechanism: 'Chênh lệch điện thế tái cực sâu sắc giữa lớp nội mạc và ngoại mạc cơ tim vách liên thất.',
      targetLeads: ['V2', 'V3', 'V4', 'V5']
    },
    values: {
      heartRate: 68, rhythmType: 'sinus', lead1Net: 9, avfNet: 5, prInterval: 155, qrsDuration: 88, qtInterval: 450,
      stI: 0, stII: 0, stIII: 0, staVR: 0, staVL: 0.5, staVF: 0,
      stV1: 0, stV2: -0.5, stV3: -0.5, stV4: -0.5, stV5: 0, stV6: 0,
      tWaveType: 'inverted', sv1: 9, rv5: 15, raVL: 8, sv3: 11, gender: 'female'
    }
  },
  {
    id: 'de_winter_t_wave',
    name: '5. Dấu Hiệu De Winter (Tắc Cấp Hoàn Toàn LAD)',
    badge: '🚨 STEMI Tương Đương (OMI Cấp)',
    badgeColor: '#991b1b',
    category: 'ischemia',
    description: 'ST chênh xuống 1-3mm dốc lên tại điểm J tiếp nối sóng T cao nhọn đối xứng khổng lồ từ V1-V4. Chỉ định Cathlab khẩn cấp.',
    keyLeads: ['V2', 'V3', 'aVR', 'V1'],
    annotations: [
      { lead: 'V2', waveTarget: 'J', label: 'ST↓ Điểm J -2.5mm', badgeType: 'danger', detail: 'Điểm J chênh xuống dốc đứng nối thẳng vào đỉnh sóng T.' },
      { lead: 'V2', waveTarget: 'T', label: 'T Cao Nhọn Đối Xứng', badgeType: 'danger', detail: 'Sóng T khổng lồ cao vút, dấu ấn tắc thân LAD cấp tính.' },
      { lead: 'aVR', waveTarget: 'J', label: 'ST↑ aVR +1.5mm', badgeType: 'warning', detail: 'ST chênh lên kèm theo ở aVR phản ánh thiếu máu cơ tim vùng đáy.' }
    ],
    morphology: {
      title: 'Đối chiếu Hình thái: De Winter vs ECG Bình Thường',
      normalDescription: 'ST nằm ngang đẳng điện, tiếp nối sóng T dương thoải.',
      pathologicalDescription: 'ST chênh xuống 1-3mm dốc lên tại điểm J tiếp nối sóng T cao nhọn đối xứng khổng lồ từ V1-V4.',
      keySignatures: [
        { feature: 'Điểm J & Đoạn ST V1-V4', normal: 'Đẳng điện (0mm)', abnormal: 'ST chênh xuống dốc lên (Upsloping STD -2.5mm)', significance: '2% trường hợp tắc cấp LAD không biểu hiện ST chênh lên' },
        { feature: 'Biên độ sóng T V2-V3', normal: '3 - 5 mm', abnormal: 'Cao nhọn đối xứng khổng lồ (>10mm)', significance: 'Dấu hiệu De Winter — Kích hoạt Cathlab tức thì như STEMI' }
      ],
      electrophysiologyMechanism: 'Mất cân bằng dẫn truyền do kênh kali ATP-sensitive mở rộng làm chậm tái cực xuyên thành cơ tim.',
      targetLeads: ['V1', 'V2', 'V3', 'V4', 'aVR']
    },
    values: {
      heartRate: 98, rhythmType: 'sinus', lead1Net: 7, avfNet: 4, prInterval: 150, qrsDuration: 90, qtInterval: 400,
      stI: 0.5, stII: 0, stIII: 0, staVR: 1.5, staVL: 1.0, staVF: 0,
      stV1: -1.5, stV2: -2.5, stV3: -2.5, stV4: -1.5, stV5: 0, stV6: 0,
      tWaveType: 'de_winter', sv1: 7, rv5: 15, raVL: 6, sv3: 9, gender: 'male'
    }
  },
  {
    id: 'aslanger_pattern',
    name: '6. Kiểu Hình Aslanger (Nhồi Máu Thành Dưới Đa Nhánh)',
    badge: '⚡ OMI Ẩn Giấu Trên Nền Bệnh Nhiều Nhánh',
    badgeColor: '#b45309',
    category: 'ischemia',
    description: 'ST chênh lên đơn độc ở DIII (kèm ST chênh xuống ở V4-V6) và ST chênh lên ở V1. Dấu hiệu nhồi máu cơ tim dưới cấp kèm thiếu máu diện rộng.',
    keyLeads: ['III', 'V1', 'V5', 'aVL'],
    annotations: [
      { lead: 'III', waveTarget: 'J', label: 'ST↑ Đơn Độc DIII +2.5mm', badgeType: 'danger', detail: 'Chỉ chênh lên ở DIII mà không thỏa tiêu chuẩn STEMI 2 chuyển đạo liên tiếp.' },
      { lead: 'V1', waveTarget: 'J', label: 'ST↑ V1 +1.0mm', badgeType: 'warning', detail: 'ST chênh lên ở V1 cùng chiều DIII.' },
      { lead: 'V5', waveTarget: 'ST', label: 'ST↓ V4-V6 -2.0mm', badgeType: 'danger', detail: 'Thiếu máu vùng mỏm/thành bên trên nền bệnh nhiều nhánh mạch vành.' }
    ],
    morphology: {
      title: 'Đối chiếu Hình thái: Kiểu Hình Aslanger vs Bình Thường',
      normalDescription: 'DII, DIII, aVF và V4-V6 đều có đoạn ST đẳng điện đồng bộ.',
      pathologicalDescription: 'ST chênh lên ở duy nhất DIII (kèm ST chênh lên nhẹ ở V1) và ST chênh xuống từ V4 đến V6.',
      keySignatures: [
        { feature: 'ST ở chuyển đạo DIII', normal: 'Đẳng điện', abnormal: 'ST chênh lên +2.5mm đơn độc', significance: 'Nhồi máu thành dưới bị triệt tiêu ở DII/aVF do thiếu máu đối kháng' }
      ],
      electrophysiologyMechanism: 'Vector thiếu máu thành dưới (+120°) kết hợp với vector thiếu máu mỏm tim tạo nên hình ảnh ST chênh đặc biệt ở DIII và V1.',
      targetLeads: ['III', 'V1', 'V4', 'V5', 'V6']
    },
    values: {
      heartRate: 84, rhythmType: 'sinus', lead1Net: -2, avfNet: 10, prInterval: 175, qrsDuration: 95, qtInterval: 410,
      stI: -1.0, stII: 0.5, stIII: 2.5, staVR: 0.5, staVL: -1.5, staVF: 1.0,
      stV1: 1.0, stV2: 0, stV3: -0.5, stV4: -1.5, stV5: -2.0, stV6: -1.5,
      tWaveType: 'normal', sv1: 8, rv5: 14, raVL: -2, sv3: 9, gender: 'male'
    }
  },
  {
    id: 'posterior_stemi',
    name: '7. Nhồi Máu Cơ Tim Thành Sau Thực Thụ (Posterior MI)',
    badge: '🚨 ST Chênh Xuống Ngang V1-V3, R Cao',
    badgeColor: '#dc2626',
    category: 'ischemia',
    description: 'ST chênh xuống nằm ngang ở V1-V3, sóng R cao (R/S > 1 ở V2), T thẳng đứng. Hình ảnh soi gương của ST chênh lên thành sau (V7-V9).',
    keyLeads: ['V2', 'V3', 'V1', 'V4'],
    annotations: [
      { lead: 'V2', waveTarget: 'ST', label: 'ST↓ Nằm Ngang -3.5mm', badgeType: 'danger', detail: 'Hình ảnh soi gương của ST chênh lên ở V7-V9 thành sau.' },
      { lead: 'V2', waveTarget: 'R', label: 'Sóng R Cao (R/S > 1)', badgeType: 'warning', detail: 'Hình ảnh soi gương của sóng Q hoại tử thành sau thực thụ.' }
    ],
    morphology: {
      title: 'Đối chiếu Hình thái: Posterior MI vs Bình Thường',
      normalDescription: 'V1-V2 có dạng rS (r nhỏ, S sâu), ST đẳng điện.',
      pathologicalDescription: 'V1-V3 có sóng R cao bất thường (R/S > 1), ST chênh xuống nằm ngang và sóng T dương thẳng đứng.',
      keySignatures: [
        { feature: 'Tỷ lệ R/S ở V2', normal: 'R/S < 1 (Sóng S chiếm ưu thế)', abnormal: 'R/S > 1 (Sóng R cao vượt trội)', significance: 'Hình ảnh soi gương của sóng Q bệnh lý thành sau' }
      ],
      electrophysiologyMechanism: 'Điện cực V1-V3 nhìn vào mặt trong buồng tâm thất đối diện với vùng hoại tử thành sau lưng.',
      targetLeads: ['V1', 'V2', 'V3']
    },
    values: {
      heartRate: 88, rhythmType: 'sinus', lead1Net: 6, avfNet: 8, prInterval: 165, qrsDuration: 90, qtInterval: 405,
      stI: 0, stII: 1.0, stIII: 1.5, staVR: 0, staVL: 0, staVF: 1.0,
      stV1: -2.5, stV2: -3.5, stV3: -3.0, stV4: -1.0, stV5: 0, stV6: 0, stV7V9: 1.5,
      tWaveType: 'normal', sv1: 4, rv5: 18, raVL: 6, sv3: 5, gender: 'male'
    }
  },
  {
    id: 'lbbb_modified_sgarbossa',
    name: '8. LBBB Kèm Modified Smith-Sgarbossa (+)',
    badge: '🚨 NMCT Cấp Tắc Mạch Trên Nền LBBB',
    badgeColor: '#dc2626',
    category: 'ischemia',
    description: 'LBBB hoàn toàn (QRS 150ms). Tỷ lệ ST chênh lên ngược hướng / S sâu = 6mm / 20mm = 0.30 ≥ 0.25 (Modified Sgarbossa dương tính 91% Sp).',
    keyLeads: ['V1', 'V2', 'V5', 'I'],
    annotations: [
      { lead: 'V1', waveTarget: 'J', label: 'Tỷ lệ ST/S = 6/20 = 0.30 (≥0.25)', badgeType: 'danger', detail: 'Thỏa mãn tiêu chuẩn Smith-Modified Sgarbossa xác định NMCT cấp có tắc mạch.' },
      { lead: 'V5', waveTarget: 'R', label: 'M-Shape Notched R', badgeType: 'info', detail: 'Dạng sóng R rộng có khuyết chẻ đôi của Block nhánh trái.' }
    ],
    morphology: {
      title: 'Đối chiếu Hình thái: LBBB + Sgarbossa (+) vs LBBB Bình Thường',
      normalDescription: 'LBBB không biến chứng: ST chênh lên thứ phát ngược hướng < 25% biên độ sóng S (ST/S < 0.25).',
      pathologicalDescription: 'LBBB kèm tắc mạch cấp: ST chênh lên quá mức tỷ lệ ST/S = 0.30 ≥ 0.25 hoặc ST chênh lên đồng hướng ≥ 1mm.',
      keySignatures: [
        { feature: 'Đoạn ST chênh / S sâu (V1)', normal: '< 0.25', abnormal: '6mm / 20mm = 0.30 (≥ 0.25)', significance: 'Modified Smith-Sgarbossa (+): Độ đặc hiệu 91% nhồi máu cơ tim cấp' }
      ],
      electrophysiologyMechanism: 'Dòng tổn thương thiếu máu cơ tim cấp vượt qua điện thế tái cực thứ phát của hiện tượng dẫn truyền chậm qua nhánh trái.',
      targetLeads: ['V1', 'V2', 'V3', 'V5', 'I', 'aVL']
    },
    values: {
      heartRate: 92, rhythmType: 'sinus', lead1Net: 14, avfNet: -6, prInterval: 180, qrsDuration: 150, qtInterval: 470,
      hasLbbb: true, sgarbossaDiscordantSte: 6.0, sgarbossaPrecedingS: 20.0,
      stI: 1.5, stII: 0, stIII: 0, staVR: -1.0, staVL: 1.5, staVF: 0,
      stV1: 6.0, stV2: 5.5, stV3: 4.0, stV4: 0, stV5: -2.0, stV6: -2.0,
      sv1: 20, rv5: 22, raVL: 14, sv3: 18, gender: 'male'
    }
  },
  {
    id: 'wpw_type_a_left_free_wall',
    name: '9. Hội Chứng WPW Type A (Đường Phụ Thành Tự Do Trái)',
    badge: '⚡ Sóng Delta (+) V1, PR Ngắn',
    badgeColor: '#7c3aed',
    category: 'conduction',
    description: 'PR ngắn 95ms (< 120ms), sóng Delta dương ở tất cả các chuyển đạo trước tim V1-V6 (R cao ở V1). Vị trí đường phụ nằm ở thành tự do thất trái.',
    keyLeads: ['V1', 'II', 'aVF', 'I'],
    annotations: [
      { lead: 'V1', waveTarget: 'Delta', label: 'Sóng Delta (+) Dương V1', badgeType: 'warning', detail: 'Sóng delta sườn lên thoai thoải, PR ngắn 95ms và R cao ở V1 (WPW Type A).' }
    ],
    morphology: {
      title: 'Đối chiếu Hình thái: WPW Type A vs ECG Bình Thường',
      normalDescription: 'Khoảng PR chuẩn 120-200ms, sườn lên QRS dốc đứng, QRS hẹp <120ms.',
      pathologicalDescription: 'Khoảng PR rất ngắn (95ms), xuất hiện sóng Delta làm thoai thoải chân sóng R, QRS giãn rộng 130ms.',
      keySignatures: [
        { feature: 'Khoảng PR', normal: '120 - 200 ms', abnormal: '95 ms (< 120 ms)', significance: 'Tiền kích thích thất qua đường dẫn truyền phụ (Cầu Kent)' }
      ],
      electrophysiologyMechanism: 'Dẫn truyền phụ nhĩ - thất bỏ qua sự làm chậm sinh lý của nút AV.',
      targetLeads: ['V1', 'II', 'I', 'aVF']
    },
    values: {
      heartRate: 78, rhythmType: 'sinus', lead1Net: 12, avfNet: 8, prInterval: 95, qrsDuration: 130, qtInterval: 410,
      hasDeltaWave: true, wpwDeltaI: 'pos', wpwDeltaAvf: 'pos', wpwDeltaV1: 'pos',
      sv1: 2, rv5: 24, raVL: 11, sv3: 4, gender: 'male'
    }
  },
  {
    id: 'wpw_type_b_right_sided',
    name: '10. Hội Chứng WPW Type B (Đường Phụ Thành Phải / Vách)',
    badge: '⚡ Sóng Delta (-) V1, QS Pattern',
    badgeColor: '#7c3aed',
    category: 'conduction',
    description: 'PR 100ms, sóng Delta âm ở V1, V2 tạo dạng QS giống LBBB. Vị trí cầu Kent nằm ở thành tự do thất phải hoặc vách trước.',
    keyLeads: ['V1', 'V2', 'I', 'aVF'],
    annotations: [
      { lead: 'V1', waveTarget: 'Delta', label: 'Sóng Delta (-) Âm V1 (Dạng QS)', badgeType: 'warning', detail: 'Delta âm tạo dạng sóng QS giả nhồi máu hoặc giống LBBB.' }
    ],
    morphology: {
      title: 'Đối chiếu Hình thái: WPW Type B vs Bình Thường',
      normalDescription: 'PR 160ms, V1 có sóng r nhỏ mở đầu.',
      pathologicalDescription: 'PR ngắn 100ms, sóng Delta âm ở V1 tạo dạng QS sâu (WPW Type B - Cầu Kent bên phải).',
      keySignatures: [
        { feature: 'Sóng Delta V1', normal: 'Không có', abnormal: 'Sóng Delta âm (-) tạo dạng QS', significance: 'Định vị đường phụ bên tim phải hoặc vách ngăn' }
      ],
      electrophysiologyMechanism: 'Khử cực thất bắt đầu từ thất phải lan sang thất trái theo hướng ra xa chuyển đạo V1.',
      targetLeads: ['V1', 'V2', 'I', 'aVF']
    },
    values: {
      heartRate: 82, rhythmType: 'sinus', lead1Net: 10, avfNet: -4, prInterval: 100, qrsDuration: 135, qtInterval: 415,
      hasDeltaWave: true, wpwDeltaI: 'pos', wpwDeltaAvf: 'neg', wpwDeltaV1: 'neg',
      sv1: 18, rv5: 16, raVL: 10, sv3: 14, gender: 'female'
    }
  },
  {
    id: 'vt_monomorphic_av_dissoc',
    name: '11. Nhịp Nhanh Thất (VT) Kèm Phân Ly Nhĩ Thất',
    badge: '🚨 Cấp Cứu Loạn Nhịp QRS Rộng',
    badgeColor: '#b91c1c',
    category: 'arrhythmia',
    description: 'QRS 165ms, tần số 175 l/p, trục cực phải (-140°), có nhát bóp hỗn hợp (Fusion beat) và phân ly nhĩ thất rõ rệt (Brugada Step 3 +).',
    keyLeads: ['II', 'aVR', 'V1', 'V6'],
    annotations: [
      { lead: 'II', waveTarget: 'P', label: 'Phân Ly Nhĩ Thất (AV Dissoc)', badgeType: 'danger', detail: 'Sóng P độc lập tần số chậm lọt giữa các phức bộ QRS nhanh.' },
      { lead: 'aVR', waveTarget: 'R', label: 'Sóng R Đơn Độc aVR', badgeType: 'danger', detail: 'Vereckei aVR Step 1 (+): Khẳng định chắc chắn Nhịp Nhanh Thất (VT).' }
    ],
    morphology: {
      title: 'Đối chiếu Hình thái: Nhịp Nhanh Thất (VT) vs SVT Dẫn Truyền Lệch',
      normalDescription: 'Nhịp xoang hoặc SVT: QRS hẹp <120ms, liên hệ 1:1 với sóng P.',
      pathologicalDescription: 'VT: QRS giãn rộng 165ms kỳ dị, trục vô định, có phân ly nhĩ thất và sóng R ban đầu ở aVR.',
      keySignatures: [
        { feature: 'Đoạn QRS', normal: '< 120 ms', abnormal: '165 ms (> 140 ms)', significance: 'Tiêu chuẩn Brugada gợi ý nguồn gốc từ tâm thất' }
      ],
      electrophysiologyMechanism: 'Vòng vào lại hoặc ổ phát nhịp tự động nằm sâu trong cơ thất.',
      targetLeads: ['II', 'aVR', 'V1', 'V6']
    },
    values: {
      heartRate: 175, rhythmType: 'vt', lead1Net: -10, avfNet: -12, prInterval: 0, qrsDuration: 165, qtInterval: 320,
      wctAvDissociation: true, wctVereckeiInitialR: true, wctVereckeiViVtLe1: true,
      sv1: 12, rv5: 10, raVL: -8, sv3: 10, gender: 'male'
    }
  },
  {
    id: 'afib_rvr',
    name: '12. Rung Nhĩ Đáp Ứng Thất Rất Nhanh (AFib with RVR)',
    badge: '⚡ Tần Số Thất > 150 l/p',
    badgeColor: '#f59e0b',
    category: 'arrhythmia',
    description: 'Mất sóng P hoàn toàn, thay bằng sóng lăn tăn f tần số 400-600 l/p, khoảng cách RR hoàn toàn không đều (Irregularly irregular).',
    keyLeads: ['II', 'V1', 'V5', 'I'],
    annotations: [
      { lead: 'II', waveTarget: 'P', label: 'Mất P — Sóng f Lăn Tăn', badgeType: 'warning', detail: 'Hoàn toàn không có sóng P xoang, đường đẳng điện gợn sóng nhấp nhô.' }
    ],
    morphology: {
      title: 'Đối chiếu Hình thái: Rung Nhĩ (AFib) vs Nhịp Xoang Bình Thường',
      normalDescription: 'Sóng P đi trước mỗi QRS, khoảng RR đều đặn như đồng hồ.',
      pathologicalDescription: 'Mất hẳn sóng P, thay bằng sóng f lăn tăn hỗn loạn, khoảng cách RR biến thiên liên tục.',
      keySignatures: [
        { feature: 'Sóng P xoang', normal: 'Hiện diện đều đặn', abnormal: 'Vắng mặt hoàn toàn (Mất sóng P)', significance: 'Khử cực nhĩ hỗn loạn tần số 400-600 l/p' }
      ],
      electrophysiologyMechanism: 'Đa ổ vi vào lại (Multiple micro-reentrant wavelets) trong tâm nhĩ.',
      targetLeads: ['II', 'V1']
    },
    values: {
      heartRate: 155, rhythmType: 'afib', lead1Net: 8, avfNet: 6, prInterval: 0, qrsDuration: 85, qtInterval: 310,
      sv1: 5, rv5: 14, raVL: 6, sv3: 6, gender: 'female'
    }
  },
  {
    id: 'complete_av_block_3rd',
    name: '13. Block Nhĩ Thất Độ III Hoàn Toàn (Third-Degree AVB)',
    badge: '🚨 Nhịp Thoát Bộ Nối Chậm 38 l/p',
    badgeColor: '#dc2626',
    category: 'conduction',
    description: 'Sóng P độc lập tần số 85 l/p, QRS độc lập tần số 38 l/p. Nhĩ và thất đập hoàn toàn không liên hệ nhau. Chỉ định đặt máy tạo nhịp.',
    keyLeads: ['II', 'V1', 'aVF', 'III'],
    annotations: [
      { lead: 'II', waveTarget: 'P', label: 'Sóng P Độc Lập (85 l/p)', badgeType: 'danger', detail: 'Sóng P đập đều nhưng không dẫn truyền xuống thất, có lúc lẫn vào QRS hoặc sóng T.' }
    ],
    morphology: {
      title: 'Đối chiếu Hình thái: Block AV Độ III vs Bình Thường',
      normalDescription: 'Mỗi sóng P dẫn 1 phức bộ QRS với khoảng PR cố định 160ms.',
      pathologicalDescription: 'Sóng P và phức bộ QRS đập hoàn toàn độc lập, khoảng PR thay đổi ngẫu nhiên, tần số thất rất chậm.',
      keySignatures: [
        { feature: 'Liên hệ P và QRS', normal: 'Tỷ lệ 1:1, PR cố định', abnormal: 'Phân ly hoàn toàn (P rate > QRS rate)', significance: 'Mất hoàn toàn dẫn truyền qua nút nhĩ thất / bó His' }
      ],
      electrophysiologyMechanism: 'Tắc nghẽn hoàn toàn xung động điện thế từ tâm nhĩ xuống tâm thất.',
      targetLeads: ['II', 'V1']
    },
    values: {
      heartRate: 38, rhythmType: 'junctional', lead1Net: 6, avfNet: 7, prInterval: 0, qrsDuration: 95, qtInterval: 520,
      sv1: 6, rv5: 13, raVL: 5, sv3: 7, gender: 'male'
    }
  },
  {
    id: 'hyperkalemia_stage3_sine_wave',
    name: '14. Tăng Kali Máu Nặng Nguy Kịch (K+ = 8.4 mmol/L)',
    badge: '🚨 Đe Dọa Sóng Dạng Sin (Sine Wave)',
    badgeColor: '#7f1d1d',
    category: 'electrolyte',
    description: 'Mất hẳn sóng P, QRS giãn rộng 180ms hòa lẫn với sóng T nhọn khổng lồ tạo sóng hình Sin liên tục. Tiêm ngay Calcium Gluconate IV!',
    keyLeads: ['V2', 'V3', 'II', 'V4'],
    annotations: [
      { lead: 'V2', waveTarget: 'T', label: 'T Cao Nhọn Đáy Hẹp (Tent-like)', badgeType: 'danger', detail: 'Sóng T khổng lồ hình lều nhọn hoắt.' },
      { lead: 'V2', waveTarget: 'R', label: 'QRS Dãn Rộng Sóng Hình Sin', badgeType: 'danger', detail: 'QRS 180ms hòa lẫn vào sóng T đe dọa rung thất và ngừng tim.' }
    ],
    morphology: {
      title: 'Đối chiếu Hình thái: Tăng Kali Máu Nặng vs Bình Thường',
      normalDescription: 'Sóng P rõ, QRS 85ms, sóng T thoải 3-4mm.',
      pathologicalDescription: 'Mất sóng P, QRS giãn rộng 180ms biến dạng hòa nhập với sóng T cao nhọn tạo hình ảnh sóng Sine liên tục.',
      keySignatures: [
        { feature: 'Sóng T', normal: 'Thấp, bất đối xứng', abnormal: 'Cao nhọn, đáy hẹp, đối xứng hình lều', significance: 'Tăng tốc độ tái cực màng tế bào do tăng K+ ngoại bào' }
      ],
      electrophysiologyMechanism: 'Giảm điện thế nghỉ màng tế bào cơ tim làm bất hoạt kênh Natri nhanh và thúc đẩy dòng Kali IKr.',
      targetLeads: ['V2', 'V3', 'II']
    },
    values: {
      heartRate: 60, rhythmType: 'sinus', lead1Net: 6, avfNet: 4, prInterval: 280, qrsDuration: 180, qtInterval: 480,
      tWaveType: 'peaked', hyperkalemiaStage: 3, sv1: 10, rv5: 12, raVL: 6, sv3: 9, gender: 'male'
    }
  },
  {
    id: 'hypokalemia_severe_u_wave',
    name: '15. Hạ Kali Máu Nặng (K+ = 2.0 mmol/L) Kèm Sóng U',
    badge: '⚠️ ST Chênh Xuống + Sóng U Khổng Lồ',
    badgeColor: '#ca8a04',
    category: 'electrolyte',
    description: 'Sóng T dẹt/âm, ST chênh xuống lan tỏa, xuất hiện sóng U nổi bật > 2mm ở V2-V4 kéo dài khoảng QU tạo cảm giác QTc kéo dài giả tạo.',
    keyLeads: ['V2', 'V3', 'V4', 'II'],
    annotations: [
      { lead: 'V2', waveTarget: 'U', label: 'Sóng U Khổng Lồ > 2mm', badgeType: 'warning', detail: 'Sóng U nhô cao theo sau sóng T dẹt tạo khoảng QU kéo dài giả tạo.' }
    ],
    morphology: {
      title: 'Đối chiếu Hình thái: Hạ Kali Máu vs Bình Thường',
      normalDescription: 'Sóng T dương rõ, không có sóng U hoặc sóng U < 1mm.',
      pathologicalDescription: 'Sóng T dẹt/âm, ST chênh xuống nhẹ, xuất hiện sóng U to vượt trội sóng T (U > T).',
      keySignatures: [
        { feature: 'Sóng U ở V2-V3', normal: '< 1mm hoặc không thấy', abnormal: 'Nổi bật > 2mm (U > T)', significance: 'Chậm trễ tái cực mạng lưới sợi Purkinje do hạ K+' }
      ],
      electrophysiologyMechanism: 'Kéo dài thời gian tái cực của hệ thống dẫn truyền Purkinje tạo ra sóng U bệnh lý.',
      targetLeads: ['V2', 'V3', 'V4']
    },
    values: {
      heartRate: 94, rhythmType: 'sinus', lead1Net: 7, avfNet: 5, prInterval: 180, qrsDuration: 90, qtInterval: 560,
      stI: -1.0, stII: -1.5, stIII: -1.0, staVR: 0.5, staVL: -0.5, staVF: -1.0,
      stV2: -1.5, stV3: -2.0, stV4: -1.5, stV5: -1.0, stV6: -0.5,
      hasUWave: true, tWaveType: 'flattened', sv1: 6, rv5: 14, raVL: 6, sv3: 8, gender: 'female'
    }
  },
  {
    id: 'brugada_syndrome_type1',
    name: '16. Hội Chứng Brugada Type 1 (Dạng Vòm Coved-Type)',
    badge: '🚨 Nguy Cơ Đột Tử Do Tim (SCD)',
    badgeColor: '#dc2626',
    category: 'channelopathy',
    description: 'ST chênh lên dạng vòm (Coved) ≥ 2.5mm ở V1, V2 tiếp nối sóng T âm đối xứng. Bệnh lý kênh Natri Nav1.5 (gen SCN5A).',
    keyLeads: ['V1', 'V2', 'V3', 'aVR'],
    annotations: [
      { lead: 'V1', waveTarget: 'J', label: 'ST↑ Vòm Coved ≥ 2mm', badgeType: 'danger', detail: 'Điểm J vồng lên như lưng lạc đà rồi dốc thẳng xuống sóng T âm.' }
    ],
    morphology: {
      title: 'Đối chiếu Hình thái: Hội Chứng Brugada Type 1 vs Bình Thường',
      normalDescription: 'V1 có dạng rS, ST đẳng điện, T dương hoặc âm nhẹ.',
      pathologicalDescription: 'ST chênh lên dạng vòm (Coved-type) ≥ 2mm tại V1-V2, tiếp nối sóng T âm đối xứng sâu.',
      keySignatures: [
        { feature: 'Hình thái ST-T ở V1-V2', normal: 'ST đẳng điện, T thẳng', abnormal: 'ST chênh lên dạng vòm cúp (Coved-type ≥ 2mm) + T âm', significance: 'Bệnh lý kênh Natri Nav1.5 (Gen SCN5A)' }
      ],
      electrophysiologyMechanism: 'Mất cân bằng giữa dòng vào INa bị suy giảm và dòng ra Ito chiếm ưu thế tại đường ra thất phải (RVOT).',
      targetLeads: ['V1', 'V2']
    },
    values: {
      heartRate: 74, rhythmType: 'sinus', lead1Net: 8, avfNet: 4, prInterval: 170, qrsDuration: 105, qtInterval: 410,
      hasBrugadaPattern: 'type1', stV1: 3.5, stV2: 3.0, stV3: 1.0,
      sv1: 7, rv5: 16, raVL: 7, sv3: 8, gender: 'male'
    }
  },
  {
    id: 'lqts_congenital_type2',
    name: '17. Hội Chứng QT Dài Bẩm Sinh (LQT2 - Sóng T Chẻ Đôi)',
    badge: '🚨 QTc = 570 ms — Nguy Cơ Xoắn Đỉnh',
    badgeColor: '#7c3aed',
    category: 'channelopathy',
    description: 'Khoảng QTc kéo dài 570ms, sóng T biên độ thấp có khuyết chẻ đôi (Bifid/Notched T-wave) ở DII, V4-V6. Đột biến kênh K+ KCNH2.',
    keyLeads: ['II', 'V4', 'V5', 'V6'],
    annotations: [
      { lead: 'II', waveTarget: 'T', label: 'Sóng T Chẻ Đôi (Notched T)', badgeType: 'warning', detail: 'Sóng T có khuyết hai đỉnh đặc trưng LQT2.' }
    ],
    morphology: {
      title: 'Đối chiếu Hình thái: LQTS Type 2 vs Bình Thường',
      normalDescription: 'QTc bình thường < 440ms (nam) / < 460ms (nữ), sóng T đỉnh đơn mềm.',
      pathologicalDescription: 'Khoảng QTc kéo dài 570ms, sóng T biên độ thấp có khuyết chẻ đôi (Notched T-wave).',
      keySignatures: [
        { feature: 'Khoảng QTc', normal: '< 440 ms', abnormal: '570 ms (Kéo dài nguy kịch > 500ms)', significance: 'Đột biến kênh IKr KCNH2 — Nguy cơ xoắn đỉnh khi nghe tiếng động lớn' }
      ],
      electrophysiologyMechanism: 'Giảm dòng điện ion Kali tái cực IKr kéo dài thời gian trơ hiệu quả của cơ tâm thất.',
      targetLeads: ['II', 'V4', 'V5']
    },
    values: {
      heartRate: 62, rhythmType: 'sinus', lead1Net: 7, avfNet: 5, prInterval: 165, qrsDuration: 95, qtInterval: 560,
      tWaveType: 'biphasic_wellens', sv1: 6, rv5: 15, raVL: 6, sv3: 8, gender: 'female'
    }
  },
  {
    id: 'lvh_peguero_strain',
    name: '18. Dày Thất Trái Tăng Gánh (Peguero-Lo Presti +)',
    badge: '🫀 Tăng Huyết Áp Mạn Tính Nặng',
    badgeColor: '#0284c7',
    category: 'hypertrophy',
    description: 'Tiêu chuẩn Peguero-Lo Presti (Deepest S = 22mm + SV4 = 18mm) = 40mm ≥ 28mm ở nam. Sóng RaVL = 15mm > 11mm. ST-T biến đổi tăng gánh.',
    keyLeads: ['V1', 'V4', 'V5', 'aVL'],
    annotations: [
      { lead: 'V1', waveTarget: 'S', label: 'S Sâu Khổng Lồ (22mm)', badgeType: 'info', detail: 'Điện thế tăng gánh dày thành thất trái.' }
    ],
    morphology: {
      title: 'Đối chiếu Hình thái: Dày Thất Trái Tăng Gánh vs Bình Thường',
      normalDescription: 'Sokolow-Lyon < 35mm, Cornell RaVL < 11mm, ST-T đẳng điện.',
      pathologicalDescription: 'Điện thế QRS cực cao (S V1 sâu 22mm, R V5 cao 26mm, RaVL 15mm), ST chênh xuống và T âm dạng Strain pattern ở V5-V6.',
      keySignatures: [
        { feature: 'Tiêu chuẩn Peguero-Lo Presti', normal: '< 28mm (Nam)', abnormal: 'Deepest S (22mm) + SV4 (18mm) = 40mm', significance: 'Độ nhạy cao hơn Sokolow-Lyon trong phát hiện LVH' }
      ],
      electrophysiologyMechanism: 'Phì đại khối lượng cơ thất trái làm tăng tổng vector khử cực thất và thiếu máu tương đối lớp nội mạc.',
      targetLeads: ['V1', 'V4', 'V5', 'aVL']
    },
    values: {
      heartRate: 76, rhythmType: 'sinus', lead1Net: 15, avfNet: -5, prInterval: 180, qrsDuration: 110, qtInterval: 430,
      sv1: 22, rv5: 26, rv6: 22, raVL: 15, sv3: 20, sv4: 18, deepestS: 22,
      stV5: -1.5, stV6: -1.5, staVL: -1.0, tWaveType: 'inverted', gender: 'male'
    }
  },
  {
    id: 'pulmonary_embolism_s1q3t3',
    name: '19. Thuyên Tắc Phổi Cấp (McGinn-White S1Q3T3 + RV Strain)',
    badge: '🫁 Tăng Gánh Thất Phải Cấp Tính',
    badgeColor: '#e11d48',
    category: 'arrhythmia',
    description: 'Nhịp nhanh xoang 118 l/p, sóng S sâu ở DI, sóng Q bệnh lý ở DIII, T âm ở DIII (S1Q3T3), T âm đối xứng từ V1-V4 (RV strain).',
    keyLeads: ['I', 'III', 'V1', 'V2'],
    annotations: [
      { lead: 'I', waveTarget: 'S', label: 'S1: Sóng S Sâu ở DI', badgeType: 'danger', detail: 'Dấu ấn xoay trục tim sang phải cấp tính.' }
    ],
    morphology: {
      title: 'Đối chiếu Hình thái: Thuyên Tắc Phổi Cấp vs Bình Thường',
      normalDescription: 'DI không có sóng S sâu, DIII không có Q bệnh lý, T V1-V4 dương.',
      pathologicalDescription: 'S sâu ở DI, Q và T âm ở DIII (dấu S1Q3T3), kèm nhịp nhanh xoang 118 l/p và T âm đối xứng trước tim phải (RV Strain).',
      keySignatures: [
        { feature: 'Bộ ba McGinn-White', normal: 'Không có', abnormal: 'S1 + Q3 + T3 rõ nét', significance: 'Dấu hiệu tăng gánh thất phải cấp tính do bít tắc động mạch phổi' }
      ],
      electrophysiologyMechanism: 'Tăng áp lực động mạch phổi đột ngột gây giãn cấp buồng thất phải và xoay trục tim theo chiều kim đồng hồ.',
      targetLeads: ['I', 'III', 'V1', 'V2']
    },
    values: {
      heartRate: 118, rhythmType: 'sinus', lead1Net: -4, avfNet: 12, prInterval: 140, qrsDuration: 95, qtInterval: 340,
      stIII: 1.0, stV1: 0.5, stV2: -1.0, stV3: -1.5, stV4: -1.0,
      tWaveType: 'inverted', sv1: 5, rv5: 11, raVL: -3, sv3: 6, gender: 'female'
    }
  },
  {
    id: 'digoxin_toxicity_salvador_dali',
    name: '20. Ngộ Độc Digoxin (ST Hình Đáy Chén Salvador Dalí)',
    badge: '💊 Hiệu Ứng Digoxin + Ngoại Tâm Thu Đôi',
    badgeColor: '#ca8a04',
    category: 'electrolyte',
    description: 'ST chênh xuống uốn cong mềm mại hình ria mép danh họa Salvador Dalí ở V4-V6, DI, aVL, PR kéo dài 230ms, khoảng QT ngắn lại.',
    keyLeads: ['V5', 'V6', 'I', 'aVL'],
    annotations: [
      { lead: 'V5', waveTarget: 'ST', label: 'ST Đáy Chén Salvador Dalí', badgeType: 'warning', detail: 'ST chênh xuống võng cong mềm mại như ria mép Salvador Dalí.' }
    ],
    morphology: {
      title: 'Đối chiếu Hình thái: Dấu Hiệu Digoxin vs Bình Thường',
      normalDescription: 'ST nằm ngang đẳng điện, PR < 200ms.',
      pathologicalDescription: 'ST chênh xuống cong lõm hình đáy chén, PR kéo dài 230ms, QT ngắn lại.',
      keySignatures: [
        { feature: 'Hình thái đoạn ST', normal: 'Đẳng điện phẳng', abnormal: 'Cong lõm hình đáy chén (Scooped ST)', significance: 'Hiệu ứng ức chế bơm Na+/K+ ATPase của Digoxin' }
      ],
      electrophysiologyMechanism: 'Tăng canxi nội bào rút ngắn thời gian điện thế hoạt động cơ tâm thất.',
      targetLeads: ['V4', 'V5', 'V6', 'I']
    },
    values: {
      heartRate: 58, rhythmType: 'sinus', lead1Net: 8, avfNet: 5, prInterval: 230, qrsDuration: 88, qtInterval: 330,
      hasDigoxinSagging: true, stI: -1.5, stII: -1.5, staVL: -1.0, stV4: -2.0, stV5: -2.5, stV6: -2.0,
      sv1: 6, rv5: 15, raVL: 7, sv3: 8, gender: 'male'
    }
  },
  {
    id: 'hypothermia_osborn_j_wave',
    name: '21. Hạ Thân Nhiệt Nặng (Nhiệt Độ < 30°C — Sóng Osborn)',
    badge: '❄️ Sóng J / Osborn Khổng Lồ',
    badgeColor: '#0ea5e9',
    category: 'channelopathy',
    description: 'Nhịp chậm xoang 42 l/p, xuất hiện sóng vồng nhô lên tại chỗ nối QRS-ST (Sóng Osborn / J-wave) rõ nhất ở V3-V6 và DII, kèm nhiễu cơ do run.',
    keyLeads: ['V4', 'V5', 'II', 'V3'],
    annotations: [
      { lead: 'V4', waveTarget: 'Osborn', label: 'Sóng Osborn (J-Wave) Khổng Lồ', badgeType: 'info', detail: 'Sóng vồng nhô cao tại điểm nối QRS-ST phản ánh thân nhiệt < 30°C.' }
    ],
    morphology: {
      title: 'Đối chiếu Hình thái: Hạ Thân Nhiệt (Sóng Osborn) vs Bình Thường',
      normalDescription: 'Điểm J chuyển tiếp mượt mà giữa QRS và ST, không có sóng phụ.',
      pathologicalDescription: 'Sóng Osborn nhô cao như một ngọn đồi phụ tại điểm nối QRS-ST, nhịp chậm xoang 42 l/p.',
      keySignatures: [
        { feature: 'Điểm nối QRS-ST', normal: 'Góc nhọn chuyển tiếp', abnormal: 'Sóng vồng Osborn (J-wave) cao 3.5mm', significance: 'Đặc trưng hạ thân nhiệt nặng' }
      ],
      electrophysiologyMechanism: 'Chênh lệch gradient điện thế tái cực dòng Ito giữa thượng tâm mạc và nội tâm mạc khi bị làm lạnh.',
      targetLeads: ['V3', 'V4', 'V5', 'II']
    },
    values: {
      heartRate: 42, rhythmType: 'sinus', lead1Net: 6, avfNet: 6, prInterval: 210, qrsDuration: 125, qtInterval: 510,
      hasOsbornWave: true, stII: 2.0, stV3: 3.0, stV4: 3.5, stV5: 2.5, stV6: 2.0,
      sv1: 5, rv5: 14, raVL: 6, sv3: 7, gender: 'male'
    }
  },
  {
    id: 'rbbb_lafb_bifascicular',
    name: '22. Block Hai Phân Nhánh (RBBB + LAFB)',
    badge: '⚡ Nguy Cơ Tiến Triển Block AV Hoàn Toàn',
    badgeColor: '#f59e0b',
    category: 'conduction',
    description: 'Block nhánh phải hoàn toàn (dạng rsR\' ở V1, QRS 140ms) kết hợp Block phân nhánh trái trước (Trục lệch trái nặng -60°, dạng qR ở DI, aVL).',
    keyLeads: ['V1', 'I', 'aVL', 'III'],
    annotations: [
      { lead: 'V1', waveTarget: 'R', label: 'Dạng rsR\' Tai Thỏ RBBB', badgeType: 'warning', detail: 'Sóng R thứ hai (R\') cao rộng phản ánh khử cực muộn của thất phải.' }
    ],
    morphology: {
      title: 'Đối chiếu Hình thái: Block Hai Phân Nhánh vs Bình Thường',
      normalDescription: 'V1 dạng rS thanh mảnh, trục điện tim trung tính +60°.',
      pathologicalDescription: 'V1 dạng hai tai thỏ rsR\' (QRS 140ms) kèm trục lệch trái nặng -60° dạng qR ở DI, aVL.',
      keySignatures: [
        { feature: 'Hình thái V1', normal: 'rS thanh mảnh', abnormal: 'rsR\' (M-shape / Tai thỏ)', significance: 'Block nhánh phải (RBBB)' }
      ],
      electrophysiologyMechanism: 'Mất dẫn truyền qua 2/3 hệ thống dẫn truyền His-Purkinje (Nhánh phải + Phân nhánh trái trước).',
      targetLeads: ['V1', 'I', 'aVL', 'III']
    },
    values: {
      heartRate: 75, rhythmType: 'sinus', lead1Net: 14, avfNet: -10, prInterval: 175, qrsDuration: 140, qtInterval: 430,
      sv1: 4, rv5: 12, raVL: 13, sv3: 8, gender: 'male'
    }
  }
];

/**
 * 🌟 AI DEEP LEARNING MULTI-LABEL CLASSIFIER PROBABILITIES
 * Kế thừa từ taxonomy mô hình deep learning của torch_ecg-master
 */

export function getPresetMorphologyComparison(presetId: string): EcgMorphologyComparison | null {
  const preset = ECG_PRESETS.find(p => p.id === presetId);
  return preset?.comparison || null;
}
