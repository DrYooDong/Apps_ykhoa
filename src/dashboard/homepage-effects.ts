/**
 * Homepage Advanced Effects & Live Clock (homepage-effects.ts)
 * Path: src/dashboard/homepage-effects.ts
 */

export function initHeroClock(): void {
  const timeEl = document.getElementById('heroClockTime');
  const dateEl = document.getElementById('heroClockDate');
  const greetEl = document.getElementById('heroGreeting');

  if (!timeEl) return;

  function update(): void {
    const now = new Date();
    const h = now.getHours();
    const m = now.getMinutes();
    const s = now.getSeconds();

    if (timeEl) timeEl.textContent = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    if (dateEl) dateEl.textContent = now.toLocaleDateString('vi-VN', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' });
    if (greetEl) {
      if (h >= 5 && h < 12) greetEl.textContent = '🌅 Chào buổi sáng, Bác sĩ!';
      else if (h >= 12 && h < 18) greetEl.textContent = '☀️ Chào buổi chiều, Bác sĩ!';
      else greetEl.textContent = '🌆 Chào buổi tối, Bác sĩ!';
    }
  }

  update();
  setInterval(update, 1000);
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

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
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

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initHeroClock();
      initBackToTop();
      initScrollProgress();
    });
  } else {
    initHeroClock();
    initBackToTop();
    initScrollProgress();
  }
}
