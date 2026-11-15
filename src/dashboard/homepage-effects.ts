/**
 * Homepage Advanced Effects & Live Clock (homepage-effects.ts)
 * Path: src/dashboard/homepage-effects.ts
 */

import {
  updateDayScoreBadge,
  updateHeroEnergyBadge,
  openDayScoreModal,
  openEnergyModal,
  calculateShiftEnergy
} from '../tools/good-day-calculator';

let heroClockTimer: number | null = null;

export function initHeroClock(): void {
  if (heroClockTimer !== null) {
    window.clearInterval(heroClockTimer);
    heroClockTimer = null;
  }

  const timeEl = document.getElementById('statusClockTime');
  const dateEl = document.getElementById('statusClockDate');
  const greetEl = document.getElementById('statusGreetingText');
  const shiftText = document.getElementById('statusShiftText');
  const energyText = document.getElementById('statusEnergyText');

  function update(): void {
    const now = new Date();
    const h = now.getHours();
    const m = now.getMinutes();
    const s = now.getSeconds();

    if (timeEl) timeEl.textContent = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    if (dateEl) {
      const days = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];
      dateEl.textContent = `${days[now.getDay()]}, ${now.getDate()}/${now.getMonth() + 1}`;
    }
    if (greetEl) {
      if (h >= 5 && h < 12) greetEl.textContent = 'Chào buổi sáng, Bác sĩ!';
      else if (h >= 12 && h < 18) greetEl.textContent = 'Chào buổi chiều, Bác sĩ!';
      else greetEl.textContent = 'Chào buổi tối, Bác sĩ!';
    }

    const energy = calculateShiftEnergy(now);
    if (shiftText) {
      shiftText.textContent = `${energy.shiftName} (${energy.shiftRemainingText})`;
    }
    if (energyText) {
      energyText.textContent = `${energy.energyPercent}% • ${energy.statusText}`;
    }
  }

  update();
  heroClockTimer = window.setInterval(update, 1000);
}

export function initGoodDayAndEnergyButtons(): void {
  updateDayScoreBadge();
  updateHeroEnergyBadge();

  const heroDayBtn = document.getElementById('heroDayScoreBtn');
  if (heroDayBtn) {
    heroDayBtn.onclick = (e) => {
      e.preventDefault();
      openDayScoreModal(new Date(), 'day');
    };
  }

  const heroEnergyBtn = document.getElementById('heroEnergyScoreBtn');
  if (heroEnergyBtn) {
    heroEnergyBtn.onclick = (e) => {
      e.preventDefault();
      openEnergyModal();
    };
  }
}

export function initBackToTop(): void {
  const btn = document.getElementById('backToTopBtn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      btn.style.display = 'flex';
    } else {
      btn.style.display = 'none';
    }
  }, { passive: true });

  btn.onclick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
}

export function initScrollProgress(): void {
  const bar = document.getElementById('scrollProgressBar');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    if (total > 0) {
      const progress = (window.scrollY / total) * 100;
      bar.style.width = `${progress}%`;
    }
  }, { passive: true });
}

export function initHomepageEffects(): void {
  initHeroClock();
  initGoodDayAndEnergyButtons();
  initBackToTop();
  initScrollProgress();
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHomepageEffects);
  } else {
    initHomepageEffects();
  }
}
