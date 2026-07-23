/**
 * ECG Pro Studio — Abnormality Modifier Library
 * Defines parameters and transformation rules for 35+ clinical ECG abnormalities based on standard medical criteria.
 */

(function () {
  'use strict';

  const MODIFIERS = {
    // === NHÓM 1: RỐI LOẠN NHỊP (RHYTHM) ===
    sinus_normal: {
      id: 'sinus_normal',
      name: 'Nhịp Xoang Bình Thường',
      category: 'Rối loạn nhịp',
      params: { hr: 75, pr: 160, qrsWidth: 80, qt: 380, axis: 60 },
      description: 'Nhịp xoang đều, tần số 60-100 l/phút, P (+) ở DII, P (-) ở aVR.'
    },
    sinus_tachy: {
      id: 'sinus_tachy',
      name: 'Nhịp Nhanh Xoang',
      category: 'Rối loạn nhịp',
      params: { hr: 125, pr: 140, qrsWidth: 80, qt: 320, axis: 60 },
      description: 'Tần số xoang > 100 l/phút, P-QRS-T hình dạng bình thường.'
    },
    sinus_brady: {
      id: 'sinus_brady',
      name: 'Nhịp Chậm Xoang',
      category: 'Rối loạn nhịp',
      params: { hr: 48, pr: 180, qrsWidth: 85, qt: 430, axis: 55 },
      description: 'Tần số xoang < 60 l/phút, nhịp đều.'
    },
    sinus_arrhythmia: {
      id: 'sinus_arrhythmia',
      name: 'Loạn Nhịp Xoang Hô Hấp',
      category: 'Rối loạn nhịp',
      params: { hr: 72, pr: 150, qrsWidth: 80, qt: 380, axis: 60, irregularRR: 0.25 },
      description: 'Khoảng PP/RR thay đổi theo hô hấp (chu kỳ hít vào nhanh, thở ra chậm).'
    },
    atrial_fib: {
      id: 'atrial_fib',
      name: 'Rung Nhĩ (Atrial Fibrillation - AF)',
      category: 'Rối loạn nhịp',
      params: { hr: 135, pr: 0, qrsWidth: 80, qt: 360, axis: 60, noP: true, fWaves: true, irregularRR: 0.45 },
      description: 'Mất hoàn toàn sóng P, thay bằng các lăn tăn sóng f. Khoảng RR hoàn toàn loạn.'
    },
    atrial_flutter: {
      id: 'atrial_flutter',
      name: 'Cuồng Nhĩ (Atrial Flutter)',
      category: 'Rối loạn nhịp',
      params: { hr: 150, pr: 0, qrsWidth: 80, qt: 360, axis: 60, flutterWaves: true, flutterRatio: 2 },
      description: 'Sóng F dạng răng cưa tần số 250-350 l/phút, dẫn truyền AV tỷ lệ 2:1.'
    },
    svt_avnrt: {
      id: 'svt_avnrt',
      name: 'Nhịp Nhanh Vào Lại Nút AV (AVNRT)',
      category: 'Rối loạn nhịp',
      params: { hr: 185, pr: 0, qrsWidth: 80, qt: 290, axis: 65, hiddenP: true, retroP: true },
      description: 'Kích thích nhanh trên thất 150-250 bpm, QRS hẹp, sóng P âm nằm ngay sau QRS.'
    },
    pvc_isolated: {
      id: 'pvc_isolated',
      name: 'Ngoại Tâm Thu Thất (PVCS)',
      category: 'Rối loạn nhịp',
      params: { pvcFrequency: 0.15, pvcQrsWidth: 150 },
      description: 'Các nhát bóp thất đến sớm, QRS rộng dị dạng, đoạn nghỉ bù hoàn toàn.'
    },
    pvc_bigeminy: {
      id: 'pvc_bigeminy',
      name: 'Ngoại Tâm Thu Thất Nhịp Đôi (Bigeminy)',
      category: 'Rối loạn nhịp',
      params: { pvcBigeminy: true, pvcQrsWidth: 150 },
      description: 'Cứ 1 nhát nhịp xoang lại đi kèm 1 ngoại tâm thu thất.'
    },
    pac: {
      id: 'pac',
      name: 'Ngoại Tâm Thu Nhĩ (PACs)',
      category: 'Rối loạn nhịp',
      params: { pacFrequency: 0.15 },
      description: 'Sóng P\' đến sớm biến dạng, QRS hẹp bình thường, nghỉ bù không hoàn toàn.'
    },
    vt_mono: {
      id: 'vt_mono',
      name: 'Nhịp Nhanh Thất Đơn Hình (VT)',
      category: 'Rối loạn nhịp',
      params: { hr: 175, pr: 0, qrsWidth: 160, qt: 0, axis: -60, noP: true, vtMono: true },
      description: 'CẤP CỨU! Phức bộ QRS giãn rộng đồng dạng (> 0.12s), tần số 140-220 bpm.'
    },
    vt_torsade: {
      id: 'vt_torsade',
      name: 'Xoắn Đỉnh (Torsades de Pointes)',
      category: 'Rối loạn nhịp',
      params: { hr: 200, pr: 0, qrsWidth: 170, qt: 540, axis: 0, torsade: true },
      description: 'CẤP CỨU! QRS rộng xoay quanh đường đẳng điện, hay xuất hiện trên nền QT kéo dài.'
    },
    vfib: {
      id: 'vfib',
      name: 'Rung Thất (Ventricular Fibrillation)',
      category: 'Rối loạn nhịp',
      params: { hr: 0, pr: 0, qrsWidth: 0, qt: 0, vfib: true },
      description: 'CẤP CỨU TỐI KHẨN! Mất P-QRS-T, sóng lăn tăn hỗn loạn. Bệnh nhân ngừng tuần hoàn.'
    },
    junctional: {
      id: 'junctional',
      name: 'Nhịp Bộ Nối (Junctional Rhythm)',
      category: 'Rối loạn nhịp',
      params: { hr: 52, pr: 90, qrsWidth: 80, qt: 410, invertedP: true },
      description: 'Nút AV làm chủ nhịp (40-60 bpm), P âm ở DII/DIII/aVF đi trước hoặc sau QRS.'
    },

    // === NHÓM 2: RỐI LOẠN DẪN TRUYỀN (CONDUCTION) ===
    av_block_1: {
      id: 'av_block_1',
      name: 'Block AV Độ I (First-degree AV block)',
      category: 'Rối loạn dẫn truyền',
      params: { pr: 260 },
      description: 'Khoảng PR kéo dài cố định > 0.20s (5 ô nhỏ), mỗi sóng P đều dẫn được QRS.'
    },
    av_block_2_wenckebach: {
      id: 'av_block_2_wenckebach',
      name: 'Block AV Độ II Mobitz I (Wenckebach)',
      category: 'Rối loạn dẫn truyền',
      params: { mobitz1: true },
      description: 'Khoảng PR dài dần qua từng chu kỳ cho đến khi 1 sóng P bị block mất QRS.'
    },
    av_block_2_mobitz2: {
      id: 'av_block_2_mobitz2',
      name: 'Block AV Độ II Mobitz II',
      category: 'Rối loạn dẫn truyền',
      params: { mobitz2: true, mobitzRatio: 2 },
      description: 'PR cố định nhưng đột ngột có sóng P không dẫn được QRS (dẫn truyền 2:1 hoặc 3:1).'
    },
    av_block_3: {
      id: 'av_block_3',
      name: 'Block AV Hoàn Toàn (Complete Heart Block)',
      category: 'Rối loạn dẫn truyền',
      params: { hr: 38, pr: 0, qrsWidth: 130, avDissociation: true },
      description: 'Phân ly nhĩ thất hoàn toàn! Sóng P và phức bộ QRS đập độc lập với tần số khác nhau.'
    },
    rbbb: {
      id: 'rbbb',
      name: 'Block Nhánh Phải Hoàn Toàn (RBBB)',
      category: 'Rối loạn dẫn truyền',
      params: { qrsWidth: 140, rbbbPattern: true },
      description: 'QRS > 0.12s; Dạng rsR\' chữ M ở V1-V3; sóng S rộng sâu chữ W ở V5-V6.'
    },
    lbbb: {
      id: 'lbbb',
      name: 'Block Nhánh Trái Hoàn Toàn (LBBB)',
      category: 'Rối loạn dẫn truyền',
      params: { qrsWidth: 150, axis: -30, lbbbPattern: true },
      description: 'QRS > 0.12s; Sóng QS/rS sâu dạng V ở V1; sóng R rộng có móc chữ M ở I, aVL, V5-V6.'
    },
    lafb: {
      id: 'lafb',
      name: 'Block Phân Nhánh Trái Trước (LAFB)',
      category: 'Rối loạn dẫn truyền',
      params: { axis: -45, qrsWidth: 95 },
      description: 'Lệch trục trái nghiêm trọng (-30° đến -90°); Dạng qR ở DI, aVL; rS ở DII, DIII, aVF.'
    },
    lpfb: {
      id: 'lpfb',
      name: 'Block Phân Nhánh Trái Sau (LPFB)',
      category: 'Rối loạn dẫn truyền',
      params: { axis: 120, qrsWidth: 95 },
      description: 'Lệch trục phải (+110° đến +160°); Dạng rS ở DI, aVL; qR ở DII, DIII, aVF.'
    },
    wpw: {
      id: 'wpw',
      name: 'Hội Chứng Wolff-Parkinson-White (WPW)',
      category: 'Rối loạn dẫn truyền',
      params: { pr: 100, qrsWidth: 130, deltaWave: true },
      description: 'Tam chứng WPW: PR ngắn < 0.12s, sóng Delta ở chân QRS, QRS giãn rộng.'
    },

    // === NHÓM 3: BỆNH MẠCH VÀNH (CORONARY DISEASE) ===
    stemi_anterior: {
      id: 'stemi_anterior',
      name: 'STEMI Thành Trước Vách (V1-V4)',
      category: 'Mạch vành',
      leadStElevations: { V1: 2.5, V2: 4.0, V3: 4.5, V4: 3.0 },
      leadStDepressions: { DII: -1.5, DIII: -2.0, aVF: -1.5 },
      qWaves: ['V1', 'V2', 'V3'],
      description: 'ST chênh lên vòm ở V1-V4 (tắc nhánh LAD). Hình ảnh soi gương ST chênh xuống ở DII, DIII, aVF.'
    },
    stemi_inferior: {
      id: 'stemi_inferior',
      name: 'STEMI Thành Dưới (DII, DIII, aVF)',
      category: 'Mạch vành',
      leadStElevations: { DII: 3.0, DIII: 4.5, aVF: 3.5 },
      leadStDepressions: { DI: -2.0, aVL: -2.5 },
      qWaves: ['DII', 'DIII', 'aVF'],
      description: 'ST chênh lên ở DII, DIII, aVF (tắc RCA). Hình ảnh soi gương ST chênh xuống ở DI, aVL.'
    },
    stemi_lateral: {
      id: 'stemi_lateral',
      name: 'STEMI Thành Bên (DI, aVL, V5-V6)',
      category: 'Mạch vành',
      leadStElevations: { DI: 2.5, aVL: 3.0, V5: 3.0, V6: 2.5 },
      leadStDepressions: { DIII: -2.0, aVF: -1.5 },
      qWaves: ['DI', 'aVL', 'V5'],
      description: 'ST chênh lên ở DI, aVL, V5-V6 (tắc nhánh LCx hoặc D1 LAD).'
    },
    stemi_posterior: {
      id: 'stemi_posterior',
      name: 'STEMI Thành Sau (Dấu gián tiếp V1-V3)',
      category: 'Mạch vành',
      leadStDepressions: { V1: -3.0, V2: -3.5, V3: -3.0 },
      tWaveUprightV1V2: true,
      rTallV1V2: true,
      description: 'Hình ảnh soi gương ở V1-V3: Sóng R cao rộng, ST chênh xuống đi ngang, sóng T dương thẳng đứng.'
    },
    nstemi: {
      id: 'nstemi',
      name: 'NSTEMI / Thiếu Máu Cơ Tim',
      category: 'Mạch vành',
      leadStDepressions: { V3: -2.0, V4: -2.5, V5: -2.5, V6: -2.0, DI: -1.5, aVL: -1.5 },
      tInversions: ['V3', 'V4', 'V5', 'V6', 'DI', 'aVL'],
      description: 'ST chênh xuống nằm ngang/dốc xuống ≥ 1mm và sóng T âm sâu ở nhiều chuyển đạo.'
    },
    wellens: {
      id: 'wellens',
      name: 'Hội Chứng Wellens (Wellens Syndrome)',
      category: 'Mạch vành',
      wellensPattern: 'biphasic', // or 'deep_inverted'
      tInversions: ['V2', 'V3', 'V4'],
      description: 'Sóng T 2 pha hoặc âm sâu đối xứng ở V2-V3 trong lúc hết đau ngực. Cảnh báo hẹp nặng LAD gần!'
    },
    de_winter: {
      id: 'de_winter',
      name: 'Dấu Hiệu De Winter (De Winter T waves)',
      category: 'Mạch vành',
      leadStDepressions: { V1: -1.5, V2: -2.5, V3: -3.0, V4: -2.5 },
      tallSTt: ['V1', 'V2', 'V3', 'V4', 'V5'],
      description: 'ST chênh xuống điểm J kết hợp với sóng T cao nhọn đối xứng ở V1-V4 (Tương đương STEMI LAD cấp).'
    },

    // === NHÓM 4: DÀY BUỒNG TIM (CHAMBER ENLARGEMENT) ===
    lvh: {
      id: 'lvh',
      name: 'Phì Đại Thất Trái (LVH - Sokolow-Lyon)',
      category: 'Dày buồng tim',
      params: { axis: -15 },
      amplifiers: { V1_S: 1.8, V5_R: 2.2, V6_R: 2.0 },
      leadStDepressions: { V5: -1.5, V6: -1.5, DI: -1.0, aVL: -1.0 },
      tInversions: ['V5', 'V6', 'DI', 'aVL'],
      description: 'Sokolow-Lyon (SV1 + RV5 > 35mm); Dấu hiệu tăng gánh thất trái: ST chênh xuống và T âm ở V5-V6.'
    },
    rvh: {
      id: 'rvh',
      name: 'Phì Đại Thất Phải (RVH)',
      category: 'Dày buồng tim',
      params: { axis: 110 },
      amplifiers: { V1_R: 2.2, V1_S: 0.4 },
      tInversions: ['V1', 'V2', 'V3'],
      description: 'Trục lệch phải (> +110°); R/S > 1 ở V1; S sâu ở V5-V6; ST-T biến đổi ở V1-V3.'
    },
    lae: {
      id: 'lae',
      name: 'Lớn Nhĩ Trái (P hai lá / LAE)',
      category: 'Dày buồng tim',
      pNotched: true,
      params: { pWidth: 130 },
      description: 'Sóng P rộng > 0.12s có 2 đỉnh ở DII; Pha âm sóng P ở V1 sâu > 1mm.'
    },
    rae: {
      id: 'rae',
      name: 'Lớn Nhĩ Phải (P phế / RAE)',
      category: 'Dày buồng tim',
      amplifiers: { P_DII: 2.5 },
      description: 'Sóng P cao nhọn > 2.5mm ở DII, DIII, aVF (Thường gặp trong bệnh phổi mạn).'
    },

    // === NHÓM 5: RỐI LOẠN ĐIỆN GIẢI & BỆNH LÝ KHÁC ===
    hyperkalemia_mild: {
      id: 'hyperkalemia_mild',
      name: 'Tăng Kali Máu Nhẹ (K+ 5.5 - 6.5 mEq/L)',
      category: 'Điện giải & Khác',
      tallT: ['V2', 'V3', 'V4', 'V5', 'DII'],
      description: 'Sớm nhất: Sóng T cao nhọn đối xứng hẹp chân (Tent-shaped T waves) nổi bật ở V2-V4.'
    },
    hyperkalemia_severe: {
      id: 'hyperkalemia_severe',
      name: 'Tăng Kali Máu Nặng (K+ > 7.5 mEq/L)',
      category: 'Điện giải & Khác',
      params: { hr: 45, pr: 280, qrsWidth: 170 },
      noP: true,
      sineWave: true,
      description: 'CẤP CỨU! Mất sóng P, QRS giãn rất rộng dính liền với sóng T tạo hình sóng hình sin (Sine wave).'
    },
    hypokalemia: {
      id: 'hypokalemia',
      name: 'Hạ Kali Máu (K+ < 2.7 mEq/L)',
      category: 'Điện giải & Khác',
      uWaves: true,
      leadStDepressions: { V2: -1.0, V3: -1.0, V4: -1.0 },
      flatT: true,
      description: 'Sóng U dương cao ở V2-V4 (U > T), ST chênh xuống nhẹ, sóng T dẹt hoặc đảo ngược.'
    },
    hypercalcemia: {
      id: 'hypercalcemia',
      name: 'Tăng Calci Máu (Hypercalcemia)',
      category: 'Điện giải & Khác',
      params: { qt: 280 },
      description: 'Khoảng QT ngắn lại đặc trưng do rút ngắn đoạn ST.'
    },
    hypocalcemia: {
      id: 'hypocalcemia',
      name: 'Hạ Calci Máu (Hypocalcemia)',
      category: 'Điện giải & Khác',
      params: { qt: 480 },
      description: 'Khoảng QT kéo dài do kéo dài đoạn ST, sóng T bình thường.'
    },
    digitalis_effect: {
      id: 'digitalis_effect',
      name: 'Tác Dụng Digoxin (Digitalis Effect)',
      category: 'Điện giải & Khác',
      scoopedST: true,
      params: { qt: 320, pr: 210 },
      description: 'Đoạn ST chênh xuống lõm dạng "đáy chén" / "muỗng bán nguyệt", QT ngắn, PR kéo dài nhẹ.'
    },
    pericarditis: {
      id: 'pericarditis',
      name: 'Viêm Màng Ngoài Tim Cấp (Pericarditis)',
      category: 'Điện giải & Khác',
      diffuseStElevations: true, // Elevates all except aVR
      prDepression: true,        // Depresses PR in most leads, elevates in aVR
      description: 'ST chênh lên lõm lan tỏa ở hầu hết các chuyển đạo (trừ aVR), PR chênh xuống lan tỏa.'
    },
    pe_acute: {
      id: 'pe_acute',
      name: 'Thuyên Tắc Phổi Cấp (SI-QIII-TIII)',
      category: 'Điện giải & Khác',
      params: { hr: 120, axis: 100 },
      s1q3t3: true,
      tInversions: ['V1', 'V2', 'V3'],
      description: 'Dấu SI-QIII-TIII: Sóng S sâu ở DI, sóng Q sâu ở DIII, sóng T âm ở DIII + Nhịp nhanh xoang + T âm V1-V3.'
    },
    copd_ecg: {
      id: 'copd_ecg',
      name: 'Bệnh Phổi Tắc Nghẽn Mạn (COPD)',
      category: 'Điện giải & Khác',
      params: { axis: 100 },
      lowVoltage: true,
      rae: true,
      description: 'Điện thế thấp ở các chuyển đạo ngoại biên, sóng P phế cao nhọn, tim xoay chiều kim đồng hồ.'
    },
    osborn_wave: {
      id: 'osborn_wave',
      name: 'Sóng Osborn / Hạ Thân Nhiệt (Hypothermia)',
      category: 'Điện giải & Khác',
      params: { hr: 42, qt: 520 },
      osbornNotch: true,
      description: 'Sóng Osborn (J wave notch) nhô lên tròn tại điểm J ở các chuyển đạo trước ngực trong hạ thân nhiệt.'
    }
  };

  /**
   * Combines multiple modifiers into a synthesized parameter state
   */
  function combineModifiers(selectedIds) {
    const combined = {
      hr: 75,
      pr: 160,
      qrsWidth: 80,
      qt: 380,
      axis: 60,
      noP: false,
      fWaves: false,
      flutterWaves: false,
      flutterRatio: 2,
      hiddenP: false,
      retroP: false,
      invertedP: false,
      pvcFrequency: 0,
      pvcQrsWidth: 150,
      pvcBigeminy: false,
      pacFrequency: 0,
      vtMono: false,
      torsade: false,
      vfib: false,
      avDissociation: false,
      mobitz1: false,
      mobitz2: false,
      rbbbPattern: false,
      lbbbPattern: false,
      deltaWave: false,
      wellensPattern: null,
      scoopedST: false,
      diffuseStElevations: false,
      prDepression: false,
      s1q3t3: false,
      lowVoltage: false,
      osbornNotch: false,
      sineWave: false,
      uWaves: false,
      flatT: false,
      pNotched: false,
      leadStElevations: {},
      leadStDepressions: {},
      qWaves: [],
      tInversions: [],
      tallT: [],
      amplifiers: {}
    };

    selectedIds.forEach(id => {
      const mod = MODIFIERS[id];
      if (!mod) return;

      if (mod.params) {
        if (mod.params.hr !== undefined) combined.hr = mod.params.hr;
        if (mod.params.pr !== undefined) combined.pr = mod.params.pr;
        if (mod.params.qrsWidth !== undefined) combined.qrsWidth = Math.max(combined.qrsWidth, mod.params.qrsWidth);
        if (mod.params.qt !== undefined) combined.qt = mod.params.qt;
        if (mod.params.axis !== undefined) combined.axis = mod.params.axis;
        if (mod.params.noP) combined.noP = true;
        if (mod.params.fWaves) combined.fWaves = true;
        if (mod.params.flutterWaves) combined.flutterWaves = true;
        if (mod.params.flutterRatio) combined.flutterRatio = mod.params.flutterRatio;
        if (mod.params.hiddenP) combined.hiddenP = true;
        if (mod.params.retroP) combined.retroP = true;
        if (mod.params.invertedP) combined.invertedP = true;
        if (mod.params.pvcFrequency) combined.pvcFrequency = mod.params.pvcFrequency;
        if (mod.params.pvcQrsWidth) combined.pvcQrsWidth = mod.params.pvcQrsWidth;
        if (mod.params.pvcBigeminy) combined.pvcBigeminy = true;
        if (mod.params.pacFrequency) combined.pacFrequency = mod.params.pacFrequency;
        if (mod.params.vtMono) combined.vtMono = true;
        if (mod.params.torsade) combined.torsade = true;
        if (mod.params.vfib) combined.vfib = true;
        if (mod.params.avDissociation) combined.avDissociation = true;
        if (mod.params.mobitz1) combined.mobitz1 = true;
        if (mod.params.mobitz2) combined.mobitz2 = true;
        if (mod.params.rbbbPattern) combined.rbbbPattern = true;
        if (mod.params.lbbbPattern) combined.lbbbPattern = true;
        if (mod.params.deltaWave) combined.deltaWave = true;
        if (mod.params.sineWave) combined.sineWave = true;
        if (mod.params.irregularRR) combined.irregularRR = mod.params.irregularRR;
      }

      if (mod.leadStElevations) Object.assign(combined.leadStElevations, mod.leadStElevations);
      if (mod.leadStDepressions) Object.assign(combined.leadStDepressions, mod.leadStDepressions);
      if (mod.qWaves) combined.qWaves.push(...mod.qWaves);
      if (mod.tInversions) combined.tInversions.push(...mod.tInversions);
      if (mod.tallT) combined.tallT.push(...mod.tallT);
      if (mod.wellensPattern) combined.wellensPattern = mod.wellensPattern;
      if (mod.scoopedST) combined.scoopedST = true;
      if (mod.diffuseStElevations) combined.diffuseStElevations = true;
      if (mod.prDepression) combined.prDepression = true;
      if (mod.s1q3t3) combined.s1q3t3 = true;
      if (mod.lowVoltage) combined.lowVoltage = true;
      if (mod.osbornNotch) combined.osbornNotch = true;
      if (mod.uWaves) combined.uWaves = true;
      if (mod.flatT) combined.flatT = true;
      if (mod.pNotched) combined.pNotched = true;
      if (mod.amplifiers) Object.assign(combined.amplifiers, mod.amplifiers);
    });

    return combined;
  }

  window.ECGModifiers = {
    MODIFIERS,
    combineModifiers
  };
})();
