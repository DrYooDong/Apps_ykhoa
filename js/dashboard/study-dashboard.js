/**
 * Personal Study Analytics & Gamified Dashboard (study-dashboard.js)
 * Location: js/dashboard/study-dashboard.js
 * CliniPortal Framework — Vanilla JavaScript
 */

(function () {
  'use strict';

  function calculateStreak() {
    const STREAK_KEY = 'cliniportal_study_streak_v1';
    const today = new Date().toISOString().split('T')[0];
    let data = { currentStreak: 1, lastDate: today };

    try {
      const raw = localStorage.getItem(STREAK_KEY);
      if (raw) {
        data = JSON.parse(raw);
        if (data.lastDate !== today) {
          const last = new Date(data.lastDate);
          const diffDays = Math.round((new Date(today) - last) / (1000 * 3600 * 24));
          if (diffDays === 1) {
            data.currentStreak += 1;
            data.lastDate = today;
          } else if (diffDays > 1) {
            data.currentStreak = 1;
            data.lastDate = today;
          }
          localStorage.setItem(STREAK_KEY, JSON.stringify(data));
        }
      } else {
        localStorage.setItem(STREAK_KEY, JSON.stringify(data));
      }
    } catch (e) {}

    return data.currentStreak || 1;
  }

  function getAggregateData() {
    let bookmarks = [];
    let history = [];
    let quizStats = { completedCases: [], masteredFlashcards: [], solvedCascades: [], completedExams: 0, score: 0 };

    try {
      bookmarks = JSON.parse(localStorage.getItem('cliniportal_bookmarks')) || [];
      history = JSON.parse(localStorage.getItem('cliniportal_study_history')) || [];
      quizStats = JSON.parse(localStorage.getItem('cliniportal_mechanism_reasoning_stats')) || quizStats;
    } catch (e) {}

    const streak = calculateStreak();

    // Module Breakdown from history + bookmarks
    const moduleCounts = {
      'Cơ sở Y khoa': 0,
      'Dược lý': 0,
      'Kỹ năng': 0,
      'Tiếp cận': 0,
      'Chứng cứ': 0,
      'Công cụ': 0,
      'YHCT': 0
    };

    [...history, ...bookmarks].forEach(item => {
      if (item.module && moduleCounts[item.module] !== undefined) {
        moduleCounts[item.module]++;
      }
    });

    return {
      streak,
      totalRead: history.length,
      bookmarksCount: bookmarks.length,
      quizSolved: (quizStats.completedCases?.length || 0) + (quizStats.masteredFlashcards?.length || 0) + (quizStats.solvedCascades?.length || 0) + ((quizStats.completedExams || 0) * 5),
      quizScore: quizStats.score || 0,
      moduleCounts,
      bookmarks,
      history
    };
  }

  function renderDashboard() {
    const container = document.getElementById('studyDashboardRoot');
    if (!container) return;

    const data = getAggregateData();

    // Badges unlock logic
    const badges = [
      { id: 'apprentice', name: 'Tập sự Y khoa', icon: '🌱', unlocked: data.totalRead >= 1 },
      { id: 'scholar', name: 'Bác sĩ Đọc sách', icon: '📚', unlocked: data.totalRead >= 10 },
      { id: 'streak_master', name: 'Ngọn lửa Chăm chỉ', icon: '🔥', unlocked: data.streak >= 3 },
      { id: 'quiz_hero', name: 'Nhà Biện luận Cơ chế', icon: '🧠', unlocked: data.quizSolved >= 5 },
      { id: 'ebm_master', name: 'Master Guidelines', icon: '🔬', unlocked: (data.moduleCounts['Chứng cứ'] || 0) >= 3 },
      { id: 'pharma_pro', name: 'Dược lý Thực hành', icon: '💊', unlocked: (data.moduleCounts['Dược lý'] || 0) >= 3 },
      { id: 'skill_expert', name: 'Bàn tay Vàng OSCE', icon: '🩺', unlocked: (data.moduleCounts['Kỹ năng'] || 0) >= 3 },
      { id: 'grandmaster', name: 'Đại sư Y Lâm sàng', icon: '👑', unlocked: data.totalRead >= 25 && data.quizSolved >= 15 }
    ];

    container.innerHTML = `
      <div class="dashboard-container">
        <!-- 1. Hero Banner -->
        <div class="dashboard-hero">
          <div class="dashboard-hero-info">
            <h1>Trung tâm Học tập Cá nhân</h1>
            <p>Theo dõi năng lực lâm sàng, tích lũy kiến thức y khoa và chuỗi học tập liên tục.</p>
          </div>
          <div class="dashboard-hero-badge">
            <i class="fa-solid fa-fire" style="color: #f59e0b;"></i>
            <span>Chuỗi học: ${data.streak} ngày liên tục</span>
          </div>
        </div>

        <!-- 2. Bento KPI Cards -->
        <div class="dashboard-bento-grid">
          <div class="dashboard-kpi-card">
            <div class="dashboard-kpi-icon" style="background: rgba(2, 132, 199, 0.1); color: #0284c7;">
              <i class="fa-solid fa-book-open"></i>
            </div>
            <div>
              <div class="dashboard-kpi-num">${data.totalRead}</div>
              <div class="dashboard-kpi-label">Bài viết đã đọc</div>
            </div>
          </div>

          <div class="dashboard-kpi-card">
            <div class="dashboard-kpi-icon" style="background: rgba(139, 92, 246, 0.1); color: #8b5cf6;">
              <i class="fa-solid fa-brain"></i>
            </div>
            <div>
              <div class="dashboard-kpi-num">${data.quizSolved}</div>
              <div class="dashboard-kpi-label">Ca lâm sàng & Quiz</div>
            </div>
          </div>

          <div class="dashboard-kpi-card">
            <div class="dashboard-kpi-icon" style="background: rgba(245, 158, 11, 0.1); color: #f59e0b;">
              <i class="fa-solid fa-bookmark"></i>
            </div>
            <div>
              <div class="dashboard-kpi-num">${data.bookmarksCount}</div>
              <div class="dashboard-kpi-label">Tài liệu đã lưu</div>
            </div>
          </div>

          <div class="dashboard-kpi-card">
            <div class="dashboard-kpi-icon" style="background: rgba(16, 185, 129, 0.1); color: #10b981;">
              <i class="fa-solid fa-award"></i>
            </div>
            <div>
              <div class="dashboard-kpi-num">${badges.filter(b => b.unlocked).length} / ${badges.length}</div>
              <div class="dashboard-kpi-label">Huy hiệu đạt được</div>
            </div>
          </div>
        </div>

        <!-- 3. Main Row: Module Mastery & Badges -->
        <div class="dashboard-layout-row">
          <!-- Left: Module Mastery -->
          <div class="dashboard-panel">
            <div class="dashboard-panel-header">
              <h3 class="dashboard-panel-title">
                <i class="fa-solid fa-chart-simple" style="color: var(--color-primary, #0284c7);"></i>
                <span>Năng lực Phân hệ Kiến thức</span>
              </h3>
            </div>
            <div class="module-progress-list">
              ${Object.entries(data.moduleCounts).map(([name, count]) => {
                const maxTarget = 20;
                const pct = Math.min(100, Math.round((count / maxTarget) * 100));
                return `
                  <div class="module-progress-item">
                    <div class="module-progress-header">
                      <span>${name}</span>
                      <span>${count} tài liệu (${pct}%)</span>
                    </div>
                    <div class="module-progress-track">
                      <div class="module-progress-fill" style="width: ${Math.max(5, pct)}%; background: var(--color-primary, #0284c7);"></div>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>

            <!-- Backup & Sync Actions -->
            <div class="dashboard-actions">
              <button class="dashboard-btn" id="exportDataBtn">
                <i class="fa-solid fa-download"></i> Sao lưu Dữ liệu (JSON)
              </button>
              <button class="dashboard-btn" id="importDataBtn">
                <i class="fa-solid fa-upload"></i> Khôi phục Dữ liệu
              </button>
              <input type="file" id="importFileInput" accept=".json" style="display: none;" />
            </div>
          </div>

          <!-- Right: Badges & Achievements -->
          <div class="dashboard-panel">
            <div class="dashboard-panel-header">
              <h3 class="dashboard-panel-title">
                <i class="fa-solid fa-trophy" style="color: #f59e0b;"></i>
                <span>Huy hiệu & Thành tích</span>
              </h3>
            </div>
            <div class="badges-grid">
              ${badges.map(b => `
                <div class="badge-item ${b.unlocked ? 'unlocked' : 'locked'}" title="${b.unlocked ? 'Đã mở khóa' : 'Chưa đạt yêu cầu'}">
                  <div class="badge-item-icon">${b.icon}</div>
                  <div class="badge-item-name">${b.name}</div>
                  <small style="font-size: 0.68rem; color: var(--color-text-muted);">${b.unlocked ? 'Đã đạt' : 'Khóa'}</small>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;

    // Attach Export / Import Listeners
    container.querySelector('#exportDataBtn')?.addEventListener('click', exportBackup);
    const importBtn = container.querySelector('#importDataBtn');
    const fileInput = container.querySelector('#importFileInput');

    importBtn?.addEventListener('click', () => fileInput?.click());
    fileInput?.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const backup = JSON.parse(event.target.result);
          if (backup.bookmarks) localStorage.setItem('cliniportal_bookmarks', JSON.stringify(backup.bookmarks));
          if (backup.history) localStorage.setItem('cliniportal_study_history', JSON.stringify(backup.history));
          if (backup.quizStats) localStorage.setItem('cliniportal_mechanism_reasoning_stats', JSON.stringify(backup.quizStats));
          alert('Khôi phục dữ liệu học tập thành công!');
          renderDashboard();
        } catch (err) {
          alert('Tệp sao lưu không hợp lệ!');
        }
      };
      reader.readAsText(file);
    });
  }

  function exportBackup() {
    const data = {
      version: '2.0.0',
      exportDate: new Date().toISOString(),
      bookmarks: JSON.parse(localStorage.getItem('cliniportal_bookmarks') || '[]'),
      history: JSON.parse(localStorage.getItem('cliniportal_study_history') || '[]'),
      quizStats: JSON.parse(localStorage.getItem('cliniportal_mechanism_reasoning_stats') || '{}')
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cliniportal-study-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderDashboard);
  } else {
    renderDashboard();
  }

  window.CliniPortalDashboard = {
    refresh: renderDashboard,
    exportData: exportBackup
  };
})();
