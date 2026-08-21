/**
 * Learning Progress Dashboard & Tracker (physio-progress.ts)
 * Module Sinh lý - Sinh lý bệnh | CliniPortal
 * Theo dõi tiến trình học tập, tính toán % hoàn thành, streak học tập & spaced repetition
 */

export interface ProgressData {
  visitedLessons: Record<string, string>; // pageName -> ISO timestamp
  lastActiveDate: string | null;
  streak: number;
}

export const PROGRESS_KEY = 'cliniportal_physio_progress';

export const LESSON_CATALOG: Record<string, string[]> = {
  "part1": [
    "sl-tb-daicuong-tb.html",
    "sl-tb-diensinhly.html",
    "sl-tb-mangtebao.html"
  ],
  "part2": [
    "sl-cotron-cotim.html",
    "sl-coxuong.html",
    "sl-giacquan.html",
    "sl-synapse.html",
    "sl-thankinh-tuchu.html",
    "sl-thannao-tieunao-hachnen.html",
    "sl-tuygai.html",
    "sl-vonao-chucnangtkcaocap.html"
  ],
  "part3": [
    "sl-bachcau-mien-dich.html",
    "sl-hemau-huyethoc.html",
    "sl-hongcau.html",
    "sl-nhommau-truyenmau.html",
    "sl-tieucaucammau.html"
  ],
  "part4": [
    "sl-cktim-cungluongtim.html",
    "sl-cohohap-thongkhi.html",
    "sl-cotim-hoatdongdien.html",
    "sl-hemach-dieuhoaha.html",
    "sl-traodoikhi.html",
    "sl-vanchuyen-dieuhoahh.html"
  ],
  "part5": [
    "sl-chuyenhoanl-dieuhoanhiet.html",
    "sl-th-daday.html",
    "sl-th-gantuy.html",
    "sl-th-mieng-tq.html",
    "sl-th-ruotgia.html",
    "sl-th-ruotnon.html"
  ],
  "part6": [
    "sl-than-cauthan.html",
    "sl-than-ongthan.html",
    "sl-than-phaloang-dieuhoadich.html",
    "sl-than-toankiem.html"
  ],
  "part7": [
    "sl-nt-gh.html",
    "sl-nt-tongquat.html",
    "sl-nt-tuyengiap.html",
    "sl-nt-tuyentuy.html",
    "sl-nt-vothuongthan.html",
    "sl-ss-sinhsan.html"
  ]
};

export function getProgressData(): ProgressData {
  try {
    return JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}') || {
      visitedLessons: {},
      lastActiveDate: null,
      streak: 0
    };
  } catch (e) {
    return { visitedLessons: {}, lastActiveDate: null, streak: 0 };
  }
}

export function saveProgressData(data: ProgressData): void {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(data));
}

// Auto-track current lesson reading
export function trackCurrentLesson(): void {
  const path = window.location.pathname;
  const pageName = path.split('/').pop() || '';

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

  if (!data.visitedLessons) data.visitedLessons = {};
  data.visitedLessons[pageName] = new Date().toISOString();

  // Streak logic
  if (data.lastActiveDate !== today) {
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    if (data.lastActiveDate === yesterday) {
      data.streak = (data.streak || 0) + 1;
    } else if (!data.lastActiveDate) {
      data.streak = 1;
    } else {
      data.streak = 1;
    }
    data.lastActiveDate = today;
  }

  saveProgressData(data);
}

export function calculateProgressStats() {
  const data = getProgressData();
  const visited = data.visitedLessons || {};

  let totalLessons = 0;
  let completedCount = 0;
  const sectionStats: Record<string, { total: number; completed: number; percent: number }> = {};

  for (const sec in LESSON_CATALOG) {
    const lessons = LESSON_CATALOG[sec];
    totalLessons += lessons.length;
    const done = lessons.filter(l => Boolean(visited[l])).length;
    completedCount += done;
    sectionStats[sec] = {
      total: lessons.length,
      completed: done,
      percent: Math.round((done / lessons.length) * 100)
    };
  }

  const overallPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  return {
    totalLessons,
    completedCount,
    overallPercent,
    sectionStats,
    streak: data.streak || 0
  };
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', trackCurrentLesson);
}
