/**
 * CliniPortal — Clinical Approaches Interactive Tools (TypeScript Module)
 * Powers body-map.html, case-simulator.html, knowledge-graph.html, ma-tran-trieu-chung.html
 */

export interface BodyRegion {
  id: string;
  name: string;
  symptoms: Array<{ name: string; url: string; redFlags: string }>;
}

export const BODY_REGIONS_DATA: Record<string, BodyRegion> = {
  head: {
    id: "head",
    name: "Đầu - Mặt - Cổ",
    symptoms: [
      { name: "Đau đầu cấp & mạn tính", url: "../symptoms/systemic-symptoms/fever/tc-sot-daudau.html", redFlags: "Đau đầu sét đánh, cứng gáy, dấu thần kinh khu trú" },
      { name: "Chóng mặt & Mất thăng bằng", url: "../../pharmacology/symptoms/dl-chongmat.html", redFlags: "Nystagmus đa hướng, thất điều, liệt nửa người" }
    ]
  },
  chest: {
    id: "chest",
    name: "Lồng ngực (Tim & Phổi)",
    symptoms: [
      { name: "Đau ngực cấp", url: "../symptoms/than-phien-ho-hap-tim-mach/tc-daunguc.html", redFlags: "Đau sau xương ức lan vai trái, tụt HA, khó thở dữ dội" },
      { name: "Khó thở cấp", url: "../symptoms/than-phien-ho-hap-tim-mach/tc-khotho.html", redFlags: "SpO2 < 90%, co kéo cơ hô hấp phụ, thở rít thanh quản" },
      { name: "Ngất & Tiền ngất", url: "../symptoms/than-phien-ho-hap-tim-mach/tc-ngat.html", redFlags: "Ngất khi gắng sức, ECG bất thường, tiền sử đột tử gia đình" }
    ]
  },
  abdomen: {
    id: "abdomen",
    name: "Bụng & Tiêu Hóa",
    symptoms: [
      { name: "Đau bụng cấp vùng thượng vị", url: "../symptoms/gastro-symptoms/abdominal-pain/tc-daubung-cap-thuongvi.html", redFlags: "Bụng gồng cứng như gỗ, sốc tụt HA, nôn ra máu" },
      { name: "Đau bụng cấp hố chậu phải", url: "../symptoms/gastro-symptoms/abdominal-pain/tc-daubung-cap-hcp.html", redFlags: "Phản ứng dội McBurney (+), đề kháng thành bụng, sốt cao" },
      { name: "Vàng da ứ mật / Tán huyết", url: "../symptoms/systemic-symptoms/tc-vangda.html", redFlags: "Tam chứng Charcot (Đau - Sốt - Vàng da), hôn mê gan" }
    ]
  },
  systemic: {
    id: "systemic",
    name: "Toàn Thân & Chuyển Hóa",
    symptoms: [
      { name: "Hội chứng Sốt cấp tính", url: "../symptoms/systemic-symptoms/fever/tc-sot.html", redFlags: "Sốc nhiễm khuẩn, ban xuất huyết hoại tử, tri giác lơ mơ" },
      { name: "Phù toàn thân & Phù chi", url: "../symptoms/systemic-symptoms/tc-phu.html", redFlags: "Phù phổi cấp, thiểu niệu vô niệu, suy tim ứ huyết nặng" }
    ]
  }
};

export function selectBodyRegion(regionKey: string): void {
  const data = BODY_REGIONS_DATA[regionKey];
  const titleEl = document.getElementById('region-title');
  const listEl = document.getElementById('region-symptoms-list');

  if (!data || !titleEl || !listEl) return;

  titleEl.textContent = `Vùng: ${data.name}`;
  listEl.innerHTML = data.symptoms.map(s => `
    <div style="background: var(--color-surface); border: 1px solid var(--color-divider); border-radius: 8px; padding: 1rem; margin-bottom: 0.75rem;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.25rem;">
        <h4 style="margin: 0; font-size: 1rem; color: var(--color-primary);">${s.name}</h4>
        <a href="${s.url}" class="btn-approach" style="background: var(--color-primary); color: #fff; text-decoration: none; padding: 0.3rem 0.75rem; border-radius: 4px; font-size: 0.8rem; font-weight: 700;">Xem Tiếp Cận →</a>
      </div>
      <p style="margin: 0; font-size: 0.825rem; color: #dc2626;"><strong>🚩 Cảnh báo đỏ:</strong> ${s.redFlags}</p>
    </div>
  `).join('');

  document.querySelectorAll('.body-region-btn').forEach(b => b.classList.remove('active'));
  document.querySelector(`.body-region-btn[data-region="${regionKey}"]`)?.classList.add('active');
}

export function initInteractiveTools(): void {
  document.querySelectorAll('.body-region-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const reg = (btn as HTMLElement).dataset.region;
      if (reg) selectBodyRegion(reg);
    });
  });

  if (document.getElementById('region-title')) {
    selectBodyRegion('chest');
  }

  if (typeof window !== 'undefined') {
    (window as any).selectBodyRegion = selectBodyRegion;
  }
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initInteractiveTools);
  } else {
    initInteractiveTools();
  }
}
