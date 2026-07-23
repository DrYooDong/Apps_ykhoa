/**
 * Learning Progress Dashboard & Tracker (physio-progress.js)
 * Module Sinh lý - Sinh lý bệnh | CliniPortal
 * Theo dõi tiến trình học tập, tính toán % hoàn thành, streak học tập & spaced repetition
 */

(function () {
    'use strict';

    const PROGRESS_KEY = 'cliniportal_physio_progress';

    // List of all lessons mapped by section ID
    const LESSON_CATALOG = {
        'part1': [
            'SL_TB_Daicuong&TB.html',
            'SL_TB_Mangtebao.html',
            'SL_TB_Diensinhly.html'
        ],
        'part2': [
            'SL_Coxuong.html',
            'SL_Cotron&Cotim.html',
            'SL_Synapse.html',
            'SL_Thankinh-tuchu.html',
            'SL_Tuygai.html',
            'SL_Thannao&Tieunao&Hangnen.html',
            'SL_Vonao&ChucnangTKcaocap.html',
            'SL_Giacquan.html'
        ],
        'part3': [
            'SL_HeMau&Huyethoc.html',
            'SL_Hongcau.html',
            'SL_Tieucaucammau.html',
            'SL_Bachcau_Mien dich.html',
            'SL_Nhommau&Truyenmau.html'
        ],
        'part4': [
            'SL_CoTim&HoatdongDien.html',
            'SL_Cktim&Cungluongtim.html',
            'SL_HeMach&DieuhoaHA.html',
            'SL_CoHohap&Thongkhi.html',
            'SL_Traodoikhi.html',
            'SL_Vanchuyen&DieuhoaHH.html'
        ],
        'part5': [
            'SL_TH_Mieng&TQ.html',
            'SL_TH_Daday.html',
            'SL_TH_GanTuy.html',
            'SL_TH_Ruotnon.html',
            'SL_TH_Ruotgia.html',
            'SL_ChuyenhoaNL&Dieuhoanhiet.html'
        ],
        'part6': [
            'SL_Than_Cauthan.html',
            'SL_Than_Ongthan.html',
            'SL_Than_Phaloang&Dieuhoadich.html',
            'SL_Than_Toankiem.html'
        ],
        'part7': [
            'SL_NT_Tongquat.html',
            'SL_NT_GH.html',
            'SL_NT_Tuyengiap.html',
            'SL_NT_VoThuongthan.html',
            'SL_NT_Tuyentuy.html',
            'SL_SS_Sinhsan.html'
        ]
    };

    function getProgressData() {
        try {
            return JSON.parse(localStorage.getItem(PROGRESS_KEY)) || {
                visitedLessons: {},
                lastActiveDate: null,
                streak: 0
            };
        } catch (e) {
            return { visitedLessons: {}, lastActiveDate: null, streak: 0 };
        }
    }

    function saveProgressData(data) {
        localStorage.setItem(PROGRESS_KEY, JSON.stringify(data));
    }

    // Auto-track current lesson reading
    function trackCurrentLesson() {
        const path = window.location.pathname;
        const pageName = path.split('/').pop();

        // Check if pageName exists in any section
        let isLesson = false;
        for (const sec in LESSON_CATALOG) {
            if (LESSON_CATALOG[sec].includes(pageName)) {
                isLesson = true;
                break;
            }
        }
        if (!isLesson) return;

        const data = getProgressData();
        const today = new Date().toISOString().split('T')[0];

        // Update streak
        if (data.lastActiveDate !== today) {
            const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
            if (data.lastActiveDate === yesterday) {
                data.streak += 1;
            } else {
                data.streak = 1;
            }
            data.lastActiveDate = today;
        }

        // Mark lesson as visited with timestamp
        if (!data.visitedLessons[pageName]) {
            data.visitedLessons[pageName] = {
                firstVisited: new Date().toISOString(),
                lastVisited: new Date().toISOString(),
                readCount: 1
            };
        } else {
            data.visitedLessons[pageName].lastVisited = new Date().toISOString();
            data.visitedLessons[pageName].readCount += 1;
        }

        saveProgressData(data);
    }

    // Render Dashboard widgets on the Hub page
    function renderDashboardWidget() {
        const container = document.getElementById('physio-progress-dashboard');
        if (!container) return;

        const data = getProgressData();
        let totalLessons = 0;
        let readLessonsCount = 0;

        for (const sec in LESSON_CATALOG) {
            LESSON_CATALOG[sec].forEach(file => {
                totalLessons++;
                if (data.visitedLessons[file]) {
                    readLessonsCount++;
                }
            });
        }

        const percentage = totalLessons > 0 ? Math.round((readLessonsCount / totalLessons) * 100) : 0;

        container.innerHTML = `
            <div class="progress-summary-card">
                <div class="progress-ring-box">
                    <svg class="progress-ring-svg" width="90" height="90" viewBox="0 0 90 90">
                        <circle class="ring-bg" cx="45" cy="45" r="36" />
                        <circle class="ring-fill" cx="45" cy="45" r="36" 
                                stroke-dasharray="226.19" 
                                stroke-dashoffset="${226.19 - (226.19 * percentage / 100)}" />
                    </svg>
                    <div class="ring-text">${percentage}%</div>
                </div>
                <div class="progress-info">
                    <h4>📊 Tiến trình Học Sinh Lý</h4>
                    <p>Đã học <strong>${readLessonsCount}</strong> / <strong>${totalLessons}</strong> bài học</p>
                    <div class="streak-badge">
                        🔥 Chuỗi học liên tục: <strong>${data.streak || 0} ngày</strong>
                    </div>
                </div>
            </div>
        `;
    }

    document.addEventListener('DOMContentLoaded', () => {
        trackCurrentLesson();
        renderDashboardWidget();
    });

    window.refreshPhysioProgressWidget = renderDashboardWidget;
})();
