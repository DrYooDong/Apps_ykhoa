/**
 * Skill Progress Tracker — CliniPortal
 * Quản lý tiến trình học tập kỹ năng lâm sàng với 5 cấp độ thành thục & localStorage
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'cliniportal_skill_progress';

  const MASTERY_LEVELS = {
    unread: { name: 'Chưa học', icon: '⬜', level: 0, class: 'badge-unread' },
    read: { name: 'Đã đọc', icon: '🟨', level: 1, class: 'badge-read' },
    practiced: { name: 'Đã thực hành', icon: '🟧', level: 2, class: 'badge-practiced' },
    confident: { name: 'Tự tin', icon: '🟩', level: 3, class: 'badge-confident' },
    mastered: { name: 'Thuần thục', icon: '⭐', level: 4, class: 'badge-mastered' }
  };

  const CATEGORIES = [
    { id: 'benh-an', name: 'Bệnh án Nội khoa', total: 2 },
    { id: 'hoi-suc', name: 'Hồi sức cấp cứu', total: 7 },
    { id: 'lam-sang', name: 'Khám cơ quan bedside', total: 11 },
    { id: 'can-lam-sang', name: 'Đọc kết quả CLS', total: 11 },
    { id: 'quan-ly-dieu-tri', name: 'Quản lý điều trị', total: 3 },
    { id: 'thu-thuat', name: 'Kỹ năng thủ thuật', total: 6 }
  ];

  function getProgressData() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { skills: {}, streak: 1, lastActive: new Date().toISOString() };
      return JSON.parse(raw);
    } catch (e) {
      console.warn('SkillTracker: Error reading localStorage', e);
      return { skills: {}, streak: 1, lastActive: new Date().toISOString() };
    }
  }

  function saveProgressData(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('SkillTracker: Error saving localStorage', e);
    }
  }

  function setSkillStatus(skillId, levelKey) {
    const data = getProgressData();
    data.skills[skillId] = {
      status: levelKey,
      updatedAt: new Date().toISOString()
    };
    saveProgressData(data);
    return data;
  }

  function renderDashboardWidget() {
    const container = document.getElementById('skill-tracker-dashboard-widget');
    if (!container) return;

    const data = getProgressData();
    const skills = data.skills || {};

    let totalLearned = 0;
    let totalConfidentOrMastered = 0;

    Object.values(skills).forEach(item => {
      if (item.status && item.status !== 'unread') totalLearned++;
      if (item.status === 'confident' || item.status === 'mastered') totalConfidentOrMastered++;
    });

    const TOTAL_SKILLS = 40;
    const progressPercent = Math.min(100, Math.round((totalLearned / TOTAL_SKILLS) * 100));

    container.innerHTML = `
      <div class="skill-tracker-dashboard">
        <div class="tracker-header">
          <div class="tracker-title-group">
            <div class="tracker-icon">
              <i class="fa-solid fa-chart-line"></i>
            </div>
            <div>
              <h3 class="tracker-title">Tiến Trình Học Kỹ Năng</h3>
              <p class="tracker-subtitle">Theo dõi & đánh giá mức độ thành thục bedside</p>
            </div>
          </div>
          <span class="mastery-badge badge-confident">
            <i class="fa-solid fa-fire"></i> Chuỗi: ${data.streak || 1} ngày
          </span>
        </div>

        <div class="tracker-stats-grid">
          <div class="stat-card">
            <div class="stat-value">${totalLearned}/${TOTAL_SKILLS}</div>
            <div class="stat-label">Kỹ năng đã đọc</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">${totalConfidentOrMastered}</div>
            <div class="stat-label">Tự tin / Thuần thục</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">${progressPercent}%</div>
            <div class="stat-label">Hoàn thành tổng thể</div>
          </div>
        </div>

        <div class="category-progress-list">
          ${CATEGORIES.map(cat => {
            let catCount = 0;
            Object.keys(skills).forEach(k => {
              if (k.startsWith(cat.id) && skills[k].status !== 'unread') catCount++;
            });
            const p = Math.round((catCount / cat.total) * 100);
            return `
              <div class="cat-progress-item">
                <div class="cat-progress-header">
                  <span>${cat.name}</span>
                  <span>${catCount}/${cat.total} (${p}%)</span>
                </div>
                <div class="cat-progress-bar-bg">
                  <div class="cat-progress-bar-fill" style="width: ${p}%"></div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  function renderSkillStatusSelector(containerId, skillId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const data = getProgressData();
    const currentStatus = (data.skills[skillId] && data.skills[skillId].status) || 'unread';

    container.innerHTML = `
      <div class="skill-status-widget">
        <div class="skill-status-label">
          <i class="fa-solid fa-graduation-cap"></i> Đánh giá mức độ tự tin bài học này:
        </div>
        <div class="status-btn-group">
          ${Object.keys(MASTERY_LEVELS).filter(k => k !== 'unread').map(levelKey => {
            const lvl = MASTERY_LEVELS[levelKey];
            const isActive = currentStatus === levelKey ? 'active' : '';
            return `
              <button type="button" class="status-option-btn ${isActive}" data-level="${levelKey}">
                <span>${lvl.icon}</span> ${lvl.name}
              </button>
            `;
          }).join('')}
        </div>
      </div>
    `;

    container.querySelectorAll('.status-option-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        const selectedLevel = this.getAttribute('data-level');
        setSkillStatus(skillId, selectedLevel);
        renderSkillStatusSelector(containerId, skillId);
      });
    });
  }

  window.SkillTracker = {
    getProgressData,
    setSkillStatus,
    renderDashboardWidget,
    renderSkillStatusSelector
  };

  document.addEventListener('DOMContentLoaded', function () {
    renderDashboardWidget();
  });
})();
