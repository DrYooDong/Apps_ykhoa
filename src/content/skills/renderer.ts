/**
 * CliniPortal — Clinical Skills Hub TypeScript Renderer & Controller
 */
import { CRANIAL_NERVES_DATA, OSCE_CASES } from './data';
import { OsceCase, OsceDifficulty } from './types';

export function initCranialNervesWidget(): void {
  const nerveBtns = document.querySelectorAll('.nerve-btn');
  const detailsCard = document.getElementById('nerveDetailsCard');
  if (!detailsCard || nerveBtns.length === 0) return;

  function showNerveDetail(key: string) {
    const data = CRANIAL_NERVES_DATA[key];
    if (!data) return;

    nerveBtns.forEach(btn => {
      if (btn.getAttribute('data-nerve') === key) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    detailsCard!.innerHTML = `
      <div class="physio-details-header">
        <h4 style="color: var(--color-purple); font-weight: 700;"><span>${data.title}</span></h4>
        <span class="element-badge" style="background-color: var(--color-purple);">${data.type.split(' ')[0]}</span>
      </div>
      <div class="meridian-detail-row">
        <strong>Phân loại chức năng:</strong>
        <p class="meridian-detail-desc" style="color: var(--color-text); font-weight: 500;">${data.type}</p>
      </div>
      <div class="meridian-detail-row">
        <strong>Kỹ thuật thăm khám:</strong>
        <p class="meridian-detail-desc" style="color: var(--color-text);">${data.exam}</p>
      </div>
      <div class="meridian-detail-row" style="margin-bottom:0; border-top: 1px dashed var(--color-divider); padding-top: 0.5rem; margin-top: 0.5rem;">
        <strong>Dấu hiệu tổn thương lâm sàng:</strong>
        <p class="meridian-detail-desc" style="color: var(--color-danger); font-weight: 500;">⚠️ ${data.patho}</p>
      </div>
    `;
  }

  showNerveDetail('cn1');

  nerveBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const nerveKey = btn.getAttribute('data-nerve');
      if (nerveKey) showNerveDetail(nerveKey);
    });
  });
}

export function initSkillsSearch(): void {
  const searchInput = document.getElementById('lesson-search') as HTMLInputElement | null;
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const query = (e.target as HTMLInputElement).value.toLowerCase().trim();
    const cards = document.querySelectorAll('.specialty-card');

    cards.forEach(card => {
      const title = card.querySelector('h3')?.textContent?.toLowerCase() || '';
      const desc = card.querySelector('p')?.textContent?.toLowerCase() || '';

      if (title.includes(query) || desc.includes(query)) {
        (card as HTMLElement).style.display = 'flex';
      } else {
        (card as HTMLElement).style.display = 'none';
      }
    });
  });
}

export function getRandomOsceCase(difficulty: OsceDifficulty | 'all' = 'all'): OsceCase | null {
  const pool = difficulty === 'all'
    ? OSCE_CASES
    : OSCE_CASES.filter(c => c.difficulty === difficulty);

  if (pool.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * pool.length);
  return pool[randomIndex] || null;
}

export function initSkillsHub(): void {
  initCranialNervesWidget();
  initSkillsSearch();
}
