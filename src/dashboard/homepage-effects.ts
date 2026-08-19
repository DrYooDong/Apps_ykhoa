/**
 * Homepage Advanced Effects & Live Clock (homepage-effects.ts)
 * Path: src/dashboard/homepage-effects.ts
 */

import {
  updateDayScoreBadge,
  updateHeroEnergyBadge,
  openDayScoreModal,
  openEnergyModal
} from '../tools/good-day-calculator';

export function initHeroClock(): void {
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

    // Shift Calculation
    if (shiftText) {
      let shiftName = '';
      let endH = 0;
      if (h >= 7 && h < 13) {
        shiftName = 'Ca Sáng';
        endH = 13;
      } else if (h >= 13 && h < 21) {
        shiftName = 'Ca Chiều';
        endH = 21;
      } else {
        shiftName = 'Ca Đêm';
        endH = (h >= 21) ? 31 : 7;
      }

      const currentMins = (h < 7 && endH === 7) ? (h + 24) * 60 + m : h * 60 + m;
      const targetMins = endH * 60;
      const diffMins = Math.max(0, targetMins - currentMins);
      const remH = Math.floor(diffMins / 60);
      const remM = diffMins % 60;
      shiftText.textContent = `${shiftName} (còn ${remH}h${remM}p)`;
    }

    // Circadian Energy Calculation
    if (energyText) {
      let energyPercent = 85;
      if (h >= 8 && h <= 11) energyPercent = 95;
      else if (h >= 13 && h <= 15) energyPercent = 70;
      else if (h >= 16 && h <= 19) energyPercent = 88;
      else if (h >= 22 || h <= 4) energyPercent = 55;
      energyText.textContent = `${energyPercent}% Năng lượng`;
    }
  }

  update();
  setInterval(update, 1000);
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
