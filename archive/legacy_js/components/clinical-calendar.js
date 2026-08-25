/**
 * ============================================================================
 * CLINICAL CALENDAR MODULE — Mantine v9 Inspired (`@mantine/schedule` equivalent)
 * Lịch theo dõi Lâm sàng, Ca bệnh & Nhắc nhở dùng thuốc offline
 * ============================================================================
 */

export class ClinicalCalendar {
  /**
   * Khởi tạo Lịch Lâm sàng
   * @param {HTMLElement} mountEl - Container chứa bộ lịch
   * @param {Object} options 
   */
  constructor(mountEl, options = {}) {
    if (!mountEl) return;
    this.container = mountEl;
    this.currentDate = options.initialDate || new Date();
    this.events = options.events || this.loadEvents();
    this.viewMode = options.viewMode || 'month'; // 'month' | 'week' | 'day'

    this.init();
  }

  init() {
    this.container.classList.add('clinical-calendar');
    this.render();
  }

  loadEvents() {
    try {
      const saved = localStorage.getItem('cliniportal_calendar_events');
      return saved ? JSON.parse(saved) : [
        { id: '1', date: new Date().toISOString().slice(0, 10), title: 'Tái khám ĐTĐ Tuýp 2', type: 'appointment', color: 'var(--color-primary)' },
        { id: '2', date: new Date().toISOString().slice(0, 10), title: 'Uống Aspirin 81mg', type: 'medication', color: 'var(--color-success)' }
      ];
    } catch (e) {
      return [];
    }
  }

  saveEvents() {
    try {
      localStorage.setItem('cliniportal_calendar_events', JSON.stringify(this.events));
    } catch (e) {}
  }

  render() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();

    const monthNames = [
      'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
      'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
    ];

    this.container.innerHTML = `
      <div class="calendar-header">
        <div class="calendar-title-group">
          <h3 class="calendar-month-title">${monthNames[month]} ${year}</h3>
          <div class="calendar-nav-btns">
            <button class="calendar-btn" data-btn-prev><i class="fa-solid fa-chevron-left"></i></button>
            <button class="calendar-btn" data-btn-today>Hôm nay</button>
            <button class="calendar-btn" data-btn-next><i class="fa-solid fa-chevron-right"></i></button>
          </div>
        </div>
      </div>

      <div class="calendar-grid">
        <div class="calendar-day-header">CN</div>
        <div class="calendar-day-header">T2</div>
        <div class="calendar-day-header">T3</div>
        <div class="calendar-day-header">T4</div>
        <div class="calendar-day-header">T5</div>
        <div class="calendar-day-header">T6</div>
        <div class="calendar-day-header">T7</div>
        ${this.generateDaysGrid(year, month)}
      </div>
    `;

    this.attachEvents();
  }

  generateDaysGrid(year, month) {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    let html = '';

    // Ô trống tháng trước
    for (let i = 0; i < firstDay; i++) {
      html += `<div class="calendar-day-cell is-empty"></div>`;
    }

    const todayStr = new Date().toISOString().slice(0, 10);

    // Ngày trong tháng
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const isToday = dateStr === todayStr;
      const dayEvents = this.events.filter(e => e.date === dateStr);

      html += `
        <div class="calendar-day-cell ${isToday ? 'is-today' : ''}" data-date="${dateStr}">
          <span class="calendar-day-num">${d}</span>
          <div class="calendar-events-list">
            ${dayEvents.map(ev => `
              <div class="calendar-event-chip" style="background: ${ev.color};" title="${ev.title}">
                ${ev.title}
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    return html;
  }

  attachEvents() {
    const prevBtn = this.container.querySelector('[data-btn-prev]');
    const nextBtn = this.container.querySelector('[data-btn-next]');
    const todayBtn = this.container.querySelector('[data-btn-today]');

    prevBtn.addEventListener('click', () => {
      this.currentDate.setMonth(this.currentDate.getMonth() - 1);
      this.render();
    });

    nextBtn.addEventListener('click', () => {
      this.currentDate.setMonth(this.currentDate.getMonth() + 1);
      this.render();
    });

    todayBtn.addEventListener('click', () => {
      this.currentDate = new Date();
      this.render();
    });
  }
}
