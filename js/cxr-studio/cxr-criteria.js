/**
 * cxr-criteria.js — Chest X-Ray Pro Studio
 * Tiêu chuẩn chẩn đoán X-quang ngực & Quy trình kiểm tra hệ thống ABCDE.
 */

const CXR_CRITERIA = {
  // 1. Tính & Phân loại Tỷ lệ Tim-Lồng Ngực (CTR)
  evaluateCTR(heartWidth, thoraxWidth) {
    if (!heartWidth || !thoraxWidth || thoraxWidth === 0) {
      return { ctr: 0.45, text: "Bình thường", isCardiomegaly: false };
    }
    const ctr = heartWidth / thoraxWidth;
    const isCardiomegaly = ctr > 0.50;

    let text = "Tỷ lệ Tim-Lồng ngực CTR < 0.50 (Bình thường)";
    if (ctr > 0.50 && ctr <= 0.60) {
      text = `CTR = ${ctr.toFixed(2)} — Tim to nhẹ - vừa (> 0.50)`;
    } else if (ctr > 0.60) {
      text = `CTR = ${ctr.toFixed(2)} — Tim to nặng / Giãn bóng tim nghiêm trọng (> 0.60)`;
    }

    return { ctr, text, isCardiomegaly };
  },

  // 2. Bảng kiểm ABCDE 5 bước hệ thống
  evaluateABCDE(layers, ctrData) {
    const abcde = {
      airways: {
        status: layers.pneumothoraxR ? "Khí quản bị đẩy lệch sang bên trái" : "Khí quản nằm chính giữa",
        class: layers.pneumothoraxR ? "status-abnormal" : "status-normal",
        note: layers.pneumothoraxR ? "🚨 Cảnh báo Tràn khí màng phổi áp lực! Trung thất bị đẩy lệch." : "Đường thở thông thoáng, khí quản không bị đè ép."
      },
      breathing: {
        status: "Khảo sát Nhu mô & Màng phổi",
        class: "status-normal",
        note: ""
      },
      circulation: {
        status: ctrData.text,
        class: ctrData.isCardiomegaly ? "status-abnormal" : "status-normal",
        note: ctrData.isCardiomegaly ? "Bóng tim to. Cần khảo sát suy tim / tràn dịch màng ngoài tim." : "Bóng tim và các quai mạch máu trung thất kích thước bình thường."
      },
      diaphragm: {
        status: layers.effusionR ? "Vòm hoành phải bị xóa / Tù góc sườn hoành" : "Vòm hoành 2 bên rõ",
        class: layers.effusionR ? "status-abnormal" : "status-normal",
        note: layers.effusionR ? "Có dịch tích tụ trong khoang màng phổi gây xóa góc sườn hoành." : "Góc sườn hoành 2 bên nhọn, không tù."
      },
      everythingElse: {
        status: layers.ribFractures || layers.emphysema ? "Bất thường Xương & Mô mềm" : "Cột sống & Xương lồng ngực bình thường",
        class: (layers.ribFractures || layers.emphysema) ? "status-abnormal" : "status-normal",
        note: layers.ribFractures ? "Phát hiện gãy xương sườn." : (layers.emphysema ? "Phát hiện tràn khí dưới da thành ngực." : "Không thấy tổn thương gãy xương.")
      }
    };

    // Evaluate Breathing detail
    const breathingNotes = [];
    if (layers.consolidationR) breathingNotes.push("Đông đặc thùy dưới phổi phải kèm phế quản khí");
    if (layers.ggo) breathingNotes.push("Thâm nhiễm kính mờ (Ground-glass) 2 bên");
    if (layers.pneumothoraxR) breathingNotes.push("Tràn khí màng phổi phải (sáng vô mạch)");
    if (layers.effusionR) breathingNotes.push("Tràn dịch màng phổi phải (mờ đồng nhất)");
    if (layers.cavity) breathingNotes.push("Hang thành dày phân thùy đỉnh phổi");
    if (layers.pulmonaryEdema) breathingNotes.push("Phù phổi cấp hình cánh bướm 2 bên");

    if (breathingNotes.length > 0) {
      abcde.breathing.status = breathingNotes.join(" + ");
      abcde.breathing.class = "status-abnormal";
      abcde.breathing.note = "Phát hiện bất thường nhu mô / màng phổi.";
    } else {
      abcde.breathing.status = "Phế trường 2 bên trong, sáng đều";
      abcde.breathing.note = "Không thấy thâm nhiễm hay tràn dịch/khí màng phổi.";
    }

    return abcde;
  }
};
