/**
 * cxr-engine.js — Chest X-Ray Pro Studio
 * Động cơ phân tích hình ảnh X-quang 5 bước ABCDE & Tỷ lệ CTR.
 */

class CXREngine {
  static analyze(layers, heartWidthPx = 200, thoraxWidthPx = 400) {
    const ctrData = CXR_CRITERIA.evaluateCTR(heartWidthPx, thoraxWidthPx);
    const abcde = CXR_CRITERIA.evaluateABCDE(layers, ctrData);

    const findings = [];
    if (layers.consolidationR) findings.push("Đông đặc thùy dưới phổi phải");
    if (layers.ggo) findings.push("Thâm nhiễm kính mờ 2 bên");
    if (layers.pneumothoraxR) findings.push("Tràn khí màng phổi phải (Áp lực)");
    if (layers.effusionR) findings.push("Tràn dịch màng phổi phải");
    if (layers.cavity) findings.push("Hang lao đỉnh phổi phải");
    if (layers.pulmonaryEdema) findings.push("Phù phổi cấp hình cánh bướm");
    if (layers.cardiomegaly) findings.push("Bóng tim to (CTR > 0.5)");
    if (layers.ribFracture) findings.push("Gãy xương sườn");
    if (layers.emphysema) findings.push("Tràn khí dưới da");

    if (findings.length === 0) findings.push("Phim X-quang ngực chưa ghi nhận bất thường rõ rệt.");

    return {
      ctrData,
      abcde,
      findings,
      isEmergency: layers.pneumothoraxR || (layers.pulmonaryEdema && layers.cardiomegaly) || layers.ribFracture
    };
  }
}
