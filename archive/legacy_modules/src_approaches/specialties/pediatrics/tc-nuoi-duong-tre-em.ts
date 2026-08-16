/**
 * CliniPortal — Tiếp Cận Nuôi Dưỡng Trẻ Em & CDSS Feeding/Refeeding (TypeScript Module)
 */

export function runFeedingEngine(): void {
  const ageEl = document.getElementById('cdss-age') as HTMLSelectElement | null;
  const behaviorEl = document.getElementById('cdss-behavior') as HTMLSelectElement | null;
  const parentEl = document.getElementById('cdss-parent') as HTMLSelectElement | null;

  const titleEl = document.getElementById('res-diag-title');
  const descEl = document.getElementById('res-diag-desc');

  if (!behaviorEl || !parentEl || !titleEl || !descEl) return;

  const behavior = behaviorEl.value;
  const parent = parentEl.value;

  let diagTitle = "";
  let diagDesc = "";
  let colorClass = "var(--nutri-primary-dark, #0284c7)";

  if (behavior === 'organic_flag') {
    diagTitle = "🚨 CHẨN ĐOÁN: KHÓ NUÔI ĂN DO BỆNH LÝ THỰC THỂ (ORGANIC CAUSE)";
    diagDesc = "<strong>Khuyến cáo:</strong> Cần thăm khám chuyên khoa khẩn cấp tầm soát bất thường giải phẫu (dính thắng lưỡi nặng, hẹp thực quản), bệnh lý tiêu hóa (GERD, viêm thực quản), tim mạch hoặc thần kinh. Điều trị bệnh gốc trước khi can thiệp hành vi.";
    colorClass = "#ef4444";
  } else if (behavior === 'little_norm') {
    diagTitle = "✅ CHẨN ĐOÁN: ĂN ÍT DO NHẬN THỨC SAI CỦA CHA MẸ (MISPERCEIVED)";
    diagDesc = "<strong>Khuyến cáo:</strong> Trẻ tăng trưởng hoàn toàn bình thường. Cần giải thích, trấn an cha mẹ về nhu cầu năng lượng sinh lý; tránh ép ăn gây căng thẳng bữa ăn.";
    colorClass = "#10b981";
  } else if (behavior === 'little_active') {
    diagTitle = "🧒 CHẨN ĐOÁN: ĂN ÍT Ở TRẺ NĂNG ĐỘNG (VIGOROUS & ACTIVE)";
    diagDesc = "<strong>Khuyến cáo:</strong> Trẻ thích khám phá xung quanh hơn ăn. Áp dụng 9 nguyên tắc nuôi ăn: Tắt tivi/điện thoại, khen ngợi khi trẻ ăn tốt, phớt lờ khi quấy khóc, giới hạn bữa ăn 20-30 phút và bổ sung thực phẩm giàu năng lượng.";
    colorClass = "#06b6d4";
  } else if (behavior === 'picky_light' || behavior === 'picky_severe') {
    if (behavior === 'picky_severe') {
      diagTitle = "⚠️ CHẨN ĐOÁN: KÉN ĂN NẶNG / NGHĨ TỚI RỐI LOẠN PHÁT TRIỂN (AUTISM / SENSORY)";
      diagDesc = "<strong>Khuyến cáo:</strong> Trẻ giới hạn &lt; 10 món. Cần phối hợp chuyên gia tâm lý / vận động trị liệu. Áp dụng kỹ thuật hành vi (fading & shaping), giới thiệu món mới kiên nhẫn 8-15 lần.";
      colorClass = "#f59e0b";
    } else {
      diagTitle = "🥗 CHẨN ĐOÁN: KÉN ĂN NHẸ SINH LÝ (PICKY EATER)";
      diagDesc = "<strong>Khuyến cáo:</strong> Thường gặp ở độ tuổi 18-24 tháng. Tôn trọng sở thích trẻ, không ép ăn. Giới thiệu món mới lặp lại 8-15 lần khi trẻ đang đói vào đầu bữa.";
      colorClass = "#8b5cf6";
    }
  } else if (behavior === 'fear_infant' || behavior === 'fear_older') {
    diagTitle = "😨 CHẨN ĐOÁN: SỢ ĂN (FEAR OF FEEDING)";
    diagDesc = "<strong>Khuyến cáo:</strong> Tìm tổn thương gây đau khi nuốt. Nếu sợ ăn sau ép ăn thô bạo/sặc: Dùng liệu pháp giải mẫn cảm, tạo không khí thoải mái, không đe dọa.";
    colorClass = "#ef4444";
  }

  if (parent === 'controlling') {
    diagDesc += "<br><br><span style='color: #ef4444;'><strong>Cảnh báo Kiểu Cha Mẹ:</strong> Kiểu 'Kiểm soát' ép ăn làm trầm trọng thêm tình trạng gồng chống của trẻ. Cần chuyển sang mô hình 'Đáp ứng' (Phân chia trách nhiệm).</span>";
  } else if (parent === 'indulgent') {
    diagDesc += "<br><br><span style='color: #f59e0b;'><strong>Gợi ý Kiểu Cha Mẹ:</strong> Kiểu 'Nuông chiều' dễ dẫn tới béo phì và thiếu hụt vi chất. Cần lập lịch bữa ăn cố định.</span>";
  }

  titleEl.innerText = diagTitle;
  titleEl.style.color = colorClass;
  descEl.innerHTML = diagDesc;
}

export function runRefeedingEngine(): void {
  const hr = parseFloat((document.getElementById('ref-hr') as HTMLInputElement)?.value) || 0;
  const sbp = parseFloat((document.getElementById('ref-sbp') as HTMLInputElement)?.value) || 0;
  const temp = parseFloat((document.getElementById('ref-temp') as HTMLInputElement)?.value) || 0;
  const ibw = parseFloat((document.getElementById('ref-ibw') as HTMLInputElement)?.value) || 0;
  const k = parseFloat((document.getElementById('ref-k') as HTMLInputElement)?.value) || 0;
  const phos = parseFloat((document.getElementById('ref-phos') as HTMLInputElement)?.value) || 0;

  const titleEl = document.getElementById('ref-res-title');
  const descEl = document.getElementById('ref-res-desc');

  if (!titleEl || !descEl) return;

  const reasons: string[] = [];

  if (hr > 0 && hr < 50) reasons.push("Mạch chậm severe (&lt; 50 nhịp/phút)");
  if (sbp > 0 && sbp < 90) reasons.push("Hạ huyết áp (&lt; 90 mmHg)");
  if (temp > 0 && temp < 36.1) reasons.push("Hạ thân nhiệt (&lt; 36.1°C)");
  if (ibw > 0 && ibw < 80) reasons.push("Sụt cân nặng (&lt; 80% cân nặng lý tưởng)");
  if (k > 0 && k < 3.0) reasons.push("Hạ Kali máu nặng (&lt; 3.0 mmol/L)");
  if (phos > 0 && phos < 0.8) reasons.push("Hạ Phosphate máu nặng (&lt; 0.8 mmol/L) - Cảnh báo Refeeding!");

  if (reasons.length > 0) {
    titleEl.innerText = "🚨 BẮT BUỘC NHẬP VIỆN CẤP CỨU (" + reasons.length + " TIÊU CHUẨN NGUY CƠ)";
    titleEl.style.color = "#ef4444";
    
    let html = "<ul style='margin: 4px 0; padding-left: 18px; color: #b91c1c;'>";
    reasons.forEach(r => { html += "<li><strong>" + r + "</strong></li>"; });
    html += "</ul>";
    html += "<strong>HƯỚNG XỬ TRÍ CẤP CỨU:</strong><br>";
    html += "&bull; Nhập viện theo dõi điện tim liên tục.<br>";
    html += "&bull; Bắt đầu nuôi ăn lại từ từ (10-20 kcal/kg/ngày), không tăng calo quá nhanh.<br>";
    html += "&bull; Bổ sung Thiamine và bù Phosphate/Kali đường tĩnh mạch/uống trước khi tăng calo.";
    
    descEl.innerHTML = html;
  } else {
    titleEl.innerText = "✅ CHƯA THẤY TIÊU CHUẨN NHẬP VIỆN CẤP CỨU";
    titleEl.style.color = "#10b981";
    descEl.innerHTML = "Bệnh nhân đủ điều kiện theo dõi và can thiệp ngoại trú dinh dưỡng &amp; tâm lý. Tiếp tục tái khám định kỳ theo dõi biểu đồ tăng trưởng.";
  }
}

if (typeof window !== 'undefined') {
  (window as any).runFeedingEngine = runFeedingEngine;
  (window as any).runRefeedingEngine = runRefeedingEngine;
}

export function initPediatricNutrition(): void {
  const cdssInputs = ['cdss-age', 'cdss-behavior', 'cdss-parent'];
  cdssInputs.forEach(id => {
    document.getElementById(id)?.addEventListener('change', runFeedingEngine);
  });

  const refeedInputs = ['ref-hr', 'ref-sbp', 'ref-temp', 'ref-ibw', 'ref-k', 'ref-phos'];
  refeedInputs.forEach(id => {
    document.getElementById(id)?.addEventListener('input', runRefeedingEngine);
  });

  runFeedingEngine();
  runRefeedingEngine();
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPediatricNutrition);
  } else {
    initPediatricNutrition();
  }
}
