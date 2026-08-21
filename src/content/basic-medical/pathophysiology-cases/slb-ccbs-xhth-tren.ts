/**
 * Upper GI Bleeding Pathophysiology Interactive Calculator (slb-ccbs-xhth-tren.ts)
 * Module Sinh lý - Sinh lý bệnh | CliniPortal
 */

export function evaluateTransfusion(): void {
  const locEl = document.getElementById('calc-loc') as HTMLSelectElement | null;
  const hbEl = document.getElementById('calc-hb') as HTMLInputElement | null;
  const cardiacEl = document.getElementById('calc-cardiac') as HTMLSelectElement | null;
  const resEl = document.getElementById('calc-result-text');

  if (!locEl || !hbEl || !cardiacEl || !resEl) return;

  const loc = locEl.value;
  const hb = parseFloat(hbEl.value);
  const cardiac = cardiacEl.value;

  if (isNaN(hb)) {
    resEl.innerHTML = '⚠️ <em>Vui lòng nhập nồng độ Hemoglobin hợp lệ.</em>';
    return;
  }

  if (cardiac === 'yes') {
    if (hb < 8.0) {
      resEl.innerHTML = `🚨 <strong>Chỉ định truyền máu:</strong> Hb hiện tại <strong>${hb} g/dL</strong> (&lt; 8.0 g/dL ở bệnh nhân có bệnh tim mạch). Mục tiêu nâng Hb &ge; 8.0 – 10.0 g/dL để bảo vệ thiếu máu cơ tim.`;
    } else {
      resEl.innerHTML = `✅ <strong>Theo dõi tiếp:</strong> Hb hiện tại <strong>${hb} g/dL</strong> đã đạt mục tiêu an toàn cho bệnh nhân tim mạch (&ge; 8.0 g/dL).`;
    }
  } else {
    if (loc === 'ugib-variceal') {
      if (hb < 7.0) {
        resEl.innerHTML = `🚨 <strong>Chỉ định truyền máu Hạn chế:</strong> Hb = <strong>${hb} g/dL</strong> (&lt; 7.0 g/dL). Truyền khối hồng cầu duy trì mục tiêu strictly <strong>7.0 – 9.0 g/dL</strong>. Tránh truyền quá mức gây tăng áp lực tĩnh mạch cửa!`;
      } else if (hb > 9.0) {
        resEl.innerHTML = `⚠️ <strong>Cảnh báo Truyền Máu Quá Mức:</strong> Hb = <strong>${hb} g/dL</strong>. Việc truyền máu tự do nâng Hb &gt; 9.0 g/dL làm tăng chênh lệch áp lực tĩnh mạch cửa (PPG) và tăng vọt nguy cơ vỡ tái phát búi giãn!`;
      } else {
        resEl.innerHTML = `✅ <strong>Huyết động Đạt Mục Tiêu Sinh Lý:</strong> Hb = <strong>${hb} g/dL</strong> nằm trong khoảng an toàn tối ưu (7.0 – 9.0 g/dL).`;
      }
    } else {
      if (hb < 7.0) {
        resEl.innerHTML = `🚨 <strong>Chỉ định truyền máu:</strong> Hb = <strong>${hb} g/dL</strong> (&lt; 7.0 g/dL). Duy trì mục tiêu Hb 7.0 – 9.0 g/dL theo khuyến cáo ESGE/ACG.`;
      } else {
        resEl.innerHTML = `✅ <strong>Chưa có chỉ định truyền máu:</strong> Hb = <strong>${hb} g/dL</strong> &ge; 7.0 g/dL. Tiếp tục hồi sức dịch tinh thể và theo dõi sát huyết động.`;
      }
    }
  }
}

if (typeof window !== 'undefined') {
  (window as any).evaluateTransfusion = evaluateTransfusion;

  document.addEventListener('DOMContentLoaded', () => {
    const inputs = ['calc-loc', 'calc-hb', 'calc-cardiac'];
    inputs.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('change', evaluateTransfusion);
      if (el && el.tagName === 'INPUT') el.addEventListener('input', evaluateTransfusion);
    });
    evaluateTransfusion();
  });
}
