/**
 * ECG Pro Studio — Diagnostic Criteria Library
 * Contains standard diagnostic criteria for ECG abnormalities based on standard medical theory.
 */

(function () {
  'use strict';

  const CRITERIA = {
    // NHÓM 1: RỐI LOẠN NHỊP
    sinus_normal: [
      'Sóng P đồng dạng đi trước mỗi phức bộ QRS.',
      'Sóng P dương ở DII, aVF và âm ở aVR.',
      'Khoảng RR hằng định (nhịp đều).',
      'Tần số tim từ 60 - 100 chu kỳ/phút.'
    ],
    sinus_tachy: [
      'Thỏa mãn tiêu chuẩn của nhịp xoang bình thường.',
      'Tần số tim > 100 chu kỳ/phút (thường 100-150).'
    ],
    sinus_brady: [
      'Thỏa mãn tiêu chuẩn của nhịp xoang bình thường.',
      'Tần số tim < 60 chu kỳ/phút (thường 40-60).'
    ],
    sinus_arrhythmia: [
      'Nhịp có nguồn gốc xoang (P đi trước QRS, P(+) ở DII).',
      'Khoảng RR thay đổi, chênh lệch giữa RR dài nhất và ngắn nhất > 0.16s (hoặc > 10%).',
      'Thường liên quan đến hô hấp: nhịp tăng khi hít vào, giảm khi thở ra.'
    ],
    atrial_fib: [
      'Mất hoàn toàn sóng P xoang.',
      'Xuất hiện các sóng lăn tăn (sóng f) hình dạng và biên độ không đều, rõ nhất ở V1, V2, DII.',
      'Khoảng RR hoàn toàn không đều (loạn nhịp hoàn toàn).',
      'QRS thường hẹp bình thường (trừ khi có block nhánh hoặc dẫn truyền lệch hướng).'
    ],
    atrial_flutter: [
      'Mất sóng P bình thường.',
      'Thay bằng các sóng F lớn, đều đặn dạng răng cưa, liên tục không có đường đẳng điện (rõ ở DII, DIII, aVF).',
      'Tần số sóng F khoảng 250-350 lần/phút.',
      'Nhịp thất có thể đều (nếu dẫn truyền AV cố định 2:1, 3:1) hoặc không đều.'
    ],
    svt_avnrt: [
      'Nhịp tim rất nhanh và đều đặn (150-250 lần/phút).',
      'Phức bộ QRS hẹp (< 0.12s).',
      'Sóng P thường bị lấp trong QRS hoặc nằm ngay sau QRS (P âm ở DII, DIII, aVF).',
      'Khởi phát và kết thúc đột ngột.'
    ],
    pvc_isolated: [
      'Nhát bóp đến sớm hơn bình thường.',
      'Phức bộ QRS giãn rộng (≥ 0.12s) và biến dạng.',
      'Đoạn ST và sóng T trái hướng với QRS chính.',
      'Không có sóng P đi trước QRS đến sớm.',
      'Khoảng nghỉ bù hoàn toàn (RR trước + RR sau NTT = 2 RR xoang).'
    ],
    pvc_bigeminy: [
      'Cứ 1 nhát bóp xoang bình thường lại xen kẽ với 1 nhát ngoại tâm thu thất.',
      'Các nhát ngoại tâm thu có hình dạng giống nhau (nếu là đơn ổ).'
    ],
    pac: [
      'Nhát bóp đến sớm.',
      'Sóng P\' đi trước có hình thái khác với sóng P xoang.',
      'Khoảng PR của P\' thường bình thường hoặc dài hơn một chút.',
      'Phức bộ QRS hẹp giống nhịp cơ sở.',
      'Khoảng nghỉ bù không hoàn toàn.'
    ],
    vt_mono: [
      'Tần số tim nhanh > 100 lần/phút (thường 140-200), nhịp đều.',
      'Phức bộ QRS giãn rộng (≥ 0.12s), dị dạng.',
      'Các phức bộ QRS có hình thái giống hệt nhau (đơn hình).',
      'Có thể thấy phân ly nhĩ thất (sóng P độc lập thỉnh thoảng xuất hiện).'
    ],
    vt_torsade: [
      'Nhịp nhanh QRS giãn rộng, tần số 200-250 lần/phút.',
      'Trục QRS thay đổi liên tục, xoay quanh đường đẳng điện.',
      'Biên độ QRS tăng dần rồi giảm dần (hình con thoi).',
      'Bắt đầu bằng một ngoại tâm thu thất đến sớm (R/T) trên nền QT kéo dài.'
    ],
    vfib: [
      'Mất hoàn toàn cấu trúc P-QRS-T.',
      'Sóng dao động lăn tăn, hỗn loạn, không đều về biên độ và hình dạng.',
      'Tần số > 300 lần/phút.',
      'Tình trạng ngừng tuần hoàn trên lâm sàng.'
    ],
    junctional: [
      'Nhịp đều, tần số 40-60 lần/phút.',
      'Phức bộ QRS hẹp (< 0.12s).',
      'Sóng P âm (ngược hướng) ở DII, DIII, aVF.',
      'P có thể xuất hiện trước (PR ngắn < 0.12s), chìm trong, hoặc ngay sau QRS.'
    ],

    // NHÓM 2: RỐI LOẠN DẪN TRUYỀN
    av_block_1: [
      'Khoảng PR kéo dài hằng định > 0.20s (hơn 1 ô vuông lớn).',
      'Mỗi sóng P đều dẫn theo một phức bộ QRS.',
      'Tần số và nhịp điệu thường bình thường.'
    ],
    av_block_2_wenckebach: [
      'Khoảng PR dài dần ra sau mỗi nhịp.',
      'Đến khi xuất hiện một sóng P không dẫn (bị rớt mất QRS).',
      'Khoảng RR chứa nhát rớt ngắn hơn 2 khoảng RR trước đó.',
      'Chu kỳ lặp lại (chu kỳ Wenckebach).'
    ],
    av_block_2_mobitz2: [
      'Khoảng PR hằng định (bình thường hoặc dài).',
      'Đột ngột có sóng P không dẫn theo QRS.',
      'Tỷ lệ dẫn truyền có thể cố định (2:1, 3:1) hoặc thay đổi.',
      'Thường kèm block nhánh, QRS giãn rộng.'
    ],
    av_block_3: [
      'Phân ly nhĩ thất hoàn toàn: sóng P và phức bộ QRS đập độc lập.',
      'Tần số nhĩ (P) nhanh hơn tần số thất (QRS).',
      'Khoảng PP đều đặn, khoảng RR đều đặn nhưng không liên quan gì nhau.',
      'QRS có thể hẹp (chủ nhịp nối) hoặc rộng (chủ nhịp thất).'
    ],
    rbbb: [
      'QRS giãn rộng ≥ 0.12s.',
      'Hình ảnh tai thỏ (rsR\', rSR\', rR\') ở V1, V2.',
      'Sóng S rộng, móc ở DI, V5, V6.',
      'ST chênh xuống và T âm ở V1, V2 (thứ phát).'
    ],
    lbbb: [
      'QRS giãn rộng ≥ 0.12s.',
      'Mất sóng q sinh lý, R rộng có khía hoặc chẻ đôi ở DI, aVL, V5, V6.',
      'Sóng S sâu rộng ở V1, V2 (rS hoặc QS).',
      'ST-T luôn trái hướng với sóng chính của QRS.'
    ],
    lafb: [
      'Trục điện tim lệch trái nhiều (-45° đến -90°).',
      'Hình ảnh qR ở DI, aVL.',
      'Hình ảnh rS ở DII, DIII, aVF.',
      'QRS thời gian bình thường hoặc hơi rộng (< 0.12s).'
    ],
    lpfb: [
      'Trục điện tim lệch phải (+90° đến +180°).',
      'Hình ảnh rS ở DI, aVL.',
      'Hình ảnh qR ở DII, DIII, aVF.',
      'Cần loại trừ các nguyên nhân khác gây trục lệch phải (lớn thất phải, COPD...)'
    ],
    wpw: [
      'Khoảng PR ngắn < 0.12s.',
      'Trát đậm đầu sóng R tạo thành sóng Delta.',
      'Phức bộ QRS giãn rộng > 0.11s.',
      'Thay đổi ST-T thứ phát (trái hướng với sóng Delta).'
    ],

    // NHÓM 3: BỆNH MẠCH VÀNH
    stemi_anterior: [
      'ST chênh lên lồi ở các chuyển đạo trước ngực (V1-V4).',
      'Tiến triển qua các giai đoạn (T tối cấp, ST chênh vòm, Q hoại tử, T âm).',
      'Hình ảnh soi gương (ST chênh xuống) ở các chuyển đạo thành dưới (DII, DIII, aVF).'
    ],
    stemi_inferior: [
      'ST chênh lên ≥ 1mm ở ít nhất 2 trong 3 chuyển đạo DII, DIII, aVF.',
      'Thường kèm xuất hiện sóng Q bệnh lý theo thời gian.',
      'Hình ảnh soi gương (ST chênh xuống) ở DI, aVL.'
    ],
    stemi_lateral: [
      'ST chênh lên ở DI, aVL, V5, V6.',
      'Hình ảnh soi gương có thể thấy ở các chuyển đạo thành dưới (đặc biệt DIII).'
    ],
    stemi_posterior: [
      'Hình ảnh soi gương rõ rệt ở V1-V3:',
      'ST chênh xuống đi ngang hoặc đi xuống ≥ 0.5mm.',
      'Sóng R cao (R/S > 1 ở V2).',
      'Sóng T dương cao, thẳng đứng.',
      '(Cần đo thêm V7, V8, V9 để thấy ST chênh lên).'
    ],
    nstemi: [
      'ST chênh xuống (nằm ngang hoặc dốc xuống) ≥ 0.5mm ở ít nhất 2 chuyển đạo liên tiếp.',
      'Hoặc sóng T đảo ngược (âm sâu, đối xứng) ≥ 1mm.',
      'Không có ST chênh lên lồi.',
      'Đòi hỏi xét nghiệm Troponin để chẩn đoán xác định.'
    ],
    wellens: [
      'Dấu hiệu cảnh báo hẹp nặng đoạn gần động mạch liên thất trước (LAD).',
      'Sóng T 2 pha (âm/dương) ở V2, V3 (Wellens Type A).',
      'Hoặc sóng T âm sâu đối xứng ở V2, V3, có thể lan đến V1-V6 (Wellens Type B).',
      'Bệnh nhân thường trong trạng thái hết đau ngực khi có dấu hiệu này, không có sóng Q hoại tử.'
    ],
    de_winter: [
      'Tương đương với nhồi máu cơ tim cấp (STEMI) do tắc hoàn toàn LAD.',
      'ST chênh xuống điểm J ≥ 1-3mm ở các chuyển đạo V1-V6.',
      'Kèm theo sóng T cao nhọn, đối xứng liên tục đi lên từ điểm J.',
      'Mất tiến triển sóng R ở các chuyển đạo trước tim.'
    ],

    // NHÓM 4: DÀY BUỒNG TIM
    lvh: [
      'Tiêu chuẩn Sokolow-Lyon: S(V1 hoặc V2) + R(V5 hoặc V6) ≥ 35mm.',
      'Hoặc tiêu chuẩn Cornell: R(aVL) + S(V3) > 28mm (Nam) / > 20mm (Nữ).',
      'Trục lệch trái.',
      'Dấu hiệu "tăng gánh" (Strain): ST chênh xuống và T âm bất đối xứng ở V5, V6, DI, aVL.'
    ],
    rvh: [
      'Trục lệch phải > +90°.',
      'Sóng R cao ở V1: R/S > 1 hoặc R ≥ 7mm.',
      'Sóng S sâu ở V5, V6: R/S < 1 hoặc S ≥ 7mm.',
      'Dấu hiệu tăng gánh: ST chênh xuống và T âm ở V1-V3.'
    ],
    lae: [
      'Sóng P rộng (thời gian ≥ 0.12s) ở DII.',
      'Sóng P có khía (chẻ đôi chữ M) ở DII, khoảng cách 2 đỉnh ≥ 0.04s.',
      'Pha âm của sóng P ở V1 sâu hơn 1mm và rộng hơn 0.04s (1 ô vuông nhỏ).'
    ],
    rae: [
      'Sóng P cao nhọn (hình túp lều) ở DII, DIII, aVF.',
      'Biên độ sóng P > 2.5mm ở các chuyển đạo chi.',
      'Sóng P dương cao > 1.5mm ở V1, V2.'
    ],

    // NHÓM 5: RỐI LOẠN ĐIỆN GIẢI & KHÁC
    hyperkalemia_mild: [
      'Dấu hiệu sớm nhất của tăng Kali máu.',
      'Sóng T cao, nhọn, đối xứng, đáy hẹp (hình lều).',
      'Biên độ sóng T > 5mm ở chuyển đạo chi, > 10mm ở trước tim.',
      'Nhìn rõ nhất ở các chuyển đạo V2-V5.'
    ],
    hyperkalemia_severe: [
      'Sóng P dẹt dần rồi biến mất.',
      'Khoảng PR kéo dài.',
      'Phức bộ QRS giãn rộng, hòa lẫn vào đoạn ST và sóng T.',
      'Tạo thành hình ảnh "sóng hình sin" (Sine wave) - cảnh báo ngừng tim sắp xảy ra.'
    ],
    hypokalemia: [
      'Đoạn ST chênh xuống nhẹ.',
      'Sóng T dẹt, đảo ngược.',
      'Xuất hiện sóng U dương cao, rõ nhất ở V2, V3.',
      'Khi hạ nặng: U lấn át T, PR kéo dài, dễ chuyển thành nhịp nhanh thất / xoắn đỉnh.'
    ],
    hypercalcemia: [
      'Khoảng QT ngắn lại chủ yếu do đoạn ST ngắn lại hoặc biến mất.',
      'Sóng T thường không thay đổi, xuất hiện ngay sau QRS.'
    ],
    hypocalcemia: [
      'Khoảng QT kéo dài.',
      'Sự kéo dài này chủ yếu do đoạn ST kéo dài (khác với hạ Kali là do sóng U/T).',
      'Sóng T hình dạng bình thường.'
    ],
    digitalis_effect: [
      'Dấu hiệu ngấm thuốc, không hẳn là ngộ độc.',
      'Đoạn ST chênh xuống lõm dạng "đáy chén" (scooped) ở V5, V6, DI, DII.',
      'Sóng T dẹt hoặc đảo ngược.',
      'Khoảng QT ngắn lại.'
    ],
    pericarditis: [
      'Giai đoạn 1: ST chênh lên lồi nhẹ, lan tỏa ở nhiều chuyển đạo (trừ aVR và V1).',
      'PR chênh xuống lan tỏa (dấu hiệu rất đặc hiệu).',
      'Ở aVR: ST chênh xuống, PR chênh lên.',
      'Không có hình ảnh soi gương cục bộ (khác với STEMI).'
    ],
    pe_acute: [
      'Tâm phế cấp do thuyên tắc động mạch phổi.',
      'Nhịp nhanh xoang (phổ biến nhất).',
      'Dấu S1Q3T3: Sóng S sâu ở DI, sóng Q ở DIII, T âm ở DIII.',
      'Block nhánh phải mới xuất hiện, T âm ở V1-V4.'
    ],
    copd_ecg: [
      'Điện thế thấp lan tỏa ở các chuyển đạo chi.',
      'Trục lệch phải, tim xoay theo chiều kim đồng hồ (S sâu kéo dài đến V6).',
      'P phế (Lớn nhĩ phải).',
      'Mất tiến triển sóng R ở trước tim (R cắt cụt).'
    ],
    osborn_wave: [
      'Dấu hiệu của hạ thân nhiệt (thường < 32°C).',
      'Sóng J (sóng Osborn): chỗ nhô lên lồi tại điểm J.',
      'Rõ nhất ở các chuyển đạo thành dưới và thành bên.',
      'Kèm theo nhịp chậm xoang, QT kéo dài, run cơ (nhiễu nền).'
    ],
    brugada_type1: [
      'ST chênh lên dạng vòm (Coved-type) ≥ 2mm nối tiếp bằng sóng T âm ở V1, V2.',
      'Điểm J chênh lên cao ≥ 2mm và dốc thẳng xuống đoạn ST.',
      'Thường kèm hình ảnh Block nhánh phải không hoàn toàn ở V1-V2.',
      'Triệu chứng lâm sàng: Ngất ban đêm, giật mình khi ngủ, gia đình có người đột tử.'
    ],
    lgl: [
      'Khoảng PR ngắn < 0.12s (120ms).',
      'Phức bộ QRS thời gian bình thường (< 0.12s), hẹp nhọn.',
      'KHÔNG CÓ sóng Delta ở chân sóng R (khác biệt quan trọng với Hội chứng WPW).',
      'Do xung điện dẫn truyền qua cầu James bỏ qua nút nhĩ thất.'
    ],
    cerebral_t_waves: [
      'Sóng T âm rất sâu, rộng đối xứng (Giant inverted T waves) ở nhiều chuyển đạo (V1-V6, DI, aVL).',
      'Khoảng QTc kéo dài đáng kể (> 500ms).',
      'Thường kèm nhịp chậm xoang hoặc tăng huyết áp phản ứng.',
      'Gặp trong tai biến mạch máu nội sọ (Xuất huyết dưới nhện SAH, xuất huyết não, tăng áp lực nội sọ cấp).'
    ],
    prinzmetal_angina: [
      'ST chênh lên vòm cấp tính trong lúc đang lên cơn đau ngực.',
      'Thường chênh ở các chuyển đạo V2-V4 hoặc DII, DIII, aVF.',
      'ST trở về đường đẳng điện hoàn toàn khi hết đau ngực (không để lại sóng Q hoại tử).',
      'Do co thắt cấp tính động mạch vành (Coronary vasospasm).'
    ],
    bifascicular_block: [
      'Thỏa mãn tiêu chuẩn Block Nhánh Phải Hoàn Toàn (RBBB: QRS ≥ 0.12s, rsR\' ở V1).',
      'Kèm theo tiêu chuẩn Block Phân Nhánh Trái Trước (LAFB: trục lệch trái < -30°) hoặc Block Phân Nhánh Trái Sau (LPFB: trục lệch phải > +90°).',
      'Cảnh báo nguy cơ cao tiến triển thành Block AV Hoàn Toàn.'
    ],
    long_qt_syndrome: [
      'Khoảng QTc kéo dài > 470ms ở Nam hoặc > 480ms ở Nữ (công thức Bazett).',
      'Sóng T rộng, biến dạng hoặc chẻ đôi khuyết đỉnh (notched T).',
      'Tiền sử ngất kịch phát khi nghe tiếng động mạnh, bơi lội hoặc tiền sử gia đình đột tử.',
      'Nguy cơ cao kích hoạt cơn Xoắn Đỉnh (Torsades de Pointes).'
    ]
  };

  window.ECGCriteria = CRITERIA;
})();
