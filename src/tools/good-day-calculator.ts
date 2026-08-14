/**
 * Good Day & Clinical Calendar Astrological Intelligence Calculator (good-day-calculator.ts)
 * Path: src/tools/good-day-calculator.ts
 */

export const CAN = ["Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"];
export const CHI = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];

export function getCanChiYear(year: number): string {
  const can = CAN[(year + 6) % 10];
  const chi = CHI[(year + 8) % 12];
  return `${can} ${chi}`;
}

export function initGoodDayCalculator(): void {
  const container = document.getElementById('good-day-widget');
  if (!container) return;

  const now = new Date();
  const yearStr = getCanChiYear(now.getFullYear());
  container.innerHTML = `
    <div style="font-size:0.85rem; color:var(--color-primary); font-weight:700;">
      📅 Năm ${yearStr} (${now.getFullYear()})
    </div>
  `;
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGoodDayCalculator);
  } else {
    initGoodDayCalculator();
  }
}
