/**
 * CliniPortal 2.0 — Good Day UI Modals, Badges & Calendar View
 * Path: src/tools/good-day-modal.ts
 */

import {
  DoctorProfile,
  DayScoreEvaluation,
  ShiftEnergyData,
  BestClinicalDayResult
} from './good-day-types';

import {
  getDoctorProfile,
  saveDoctorProfile,
  evaluateDayScore,
  calculateShiftEnergy,
  getWeekEvaluation,
  getMonthEvaluation,
  findBestClinicalDays,
  downloadICSFile,
  generateICSContent,
  copyDaySummaryText,
  getCanChiYear,
  getSaoTu,
  calculateBiorhythms,
  getTrucNgay,
  getTietKhiInfo,
  calculateGioTimeline,
  kiemTraThanSat,
  kiemTraDiaChi,
  kiemTraQuyNhanLoc
} from './good-day-engine';

import { getDailyClinicalPearl } from './good-day-data';

export function updateDayScoreBadge(now: Date = new Date()): void {
  const scoreBtn = document.getElementById('heroDayScoreBtn');
  const valEl = document.getElementById('heroDayScoreVal');
  const textEl = document.getElementById('heroDayScoreText');
  const iconEl = document.getElementById('heroDayScoreIcon');
  if (!scoreBtn || !valEl || !textEl) return;

  const evalData = evaluateDayScore(now);
  valEl.textContent = `${evalData.total}/100`;
  textEl.textContent = evalData.rating;
  if (iconEl) iconEl.textContent = evalData.icon;

  scoreBtn.className = `status-pill hero-day-score-badge ${evalData.badgeClass}`;
  scoreBtn.setAttribute('data-score', String(evalData.total));
}

export function updateHeroEnergyBadge(now: Date = new Date()): void {
  const energyBtn = document.getElementById('heroEnergyScoreBtn');
  const valEl = document.getElementById('heroEnergyScoreVal');
  const textEl = document.getElementById('heroEnergyScoreText');
  const iconEl = document.getElementById('heroEnergyScoreIcon');
  if (!energyBtn || !valEl || !textEl) return;

  const energy = calculateShiftEnergy(now);
  valEl.textContent = `${energy.energyPercent}%`;
  textEl.textContent = energy.statusText;
  if (iconEl) iconEl.textContent = energy.icon;

  energyBtn.className = `status-pill hero-energy-badge ${energy.statusClass}`;
}

export function openDayScoreModal(
  targetDate: Date = new Date(),
  activeTab: 'day' | 'week' | 'finder' | 'month' | 'profile' = 'day'
): void {
  const evalData = evaluateDayScore(targetDate);
  const weekData = getWeekEvaluation(new Date());
  const doc = evalData.docProfile;

  const currentYear = targetDate.getFullYear();
  const currentMonth = targetDate.getMonth() + 1;
  const monthData = getMonthEvaluation(currentYear, currentMonth, doc);
  const bestSurgeryDays = findBestClinicalDays('surgery', 30, doc);

  const firstDayOfMonth = new Date(currentYear, currentMonth - 1, 1).getDay();
  // Trong JS getDay(): 0 = CN, 1 = T2, 2 = T3, 3 = T4, 4 = T5, 5 = T6, 6 = T7
  // Grid xếp theo: T2 (0), T3 (1), T4 (2), T5 (3), T6 (4), T7 (5), CN (6)
  const firstDayOffset = (firstDayOfMonth + 6) % 7;

  const existing = document.getElementById('dayScoreModalOverlay');
  if (existing) existing.remove();

  const truc = evalData.trucNgay;
  const tiet = evalData.tietKhiInfo;
  const than = evalData.thanSat;
  const sao = evalData.saoTu;
  const diaChi = evalData.diaChiRelations;
  const quyNhan = evalData.quyNhanLoc;

  const modalHtml = `
    <div class="day-score-modal-overlay" id="dayScoreModalOverlay" style="position: fixed; inset: 0; background: rgba(15,23,42,0.72); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 0.75rem;">
      <div class="day-score-modal-card animate-pop-in" style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 1.15rem; width: 100%; max-width: 860px; max-height: 94vh; overflow-y: auto; box-shadow: 0 25px 40px -5px rgba(0,0,0,0.35); padding: 1.4rem; display: flex; flex-direction: column;">
        
        <!-- Modal Header -->
        <div class="modal-card-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.85rem; border-bottom: 1px solid var(--color-border, #e2e8f0); padding-bottom: 0.75rem;">
          <div>
            <span style="font-size: 0.72rem; font-weight: 800; color: var(--color-primary, #0284c7); text-transform: uppercase; letter-spacing: 0.06em;">☯ THUẬT TOÁN Y KHOA & CÁT HUNG NHẬT HẠN</span>
            <h3 style="font-size: 1.25rem; font-weight: 800; margin: 0.15rem 0 0 0; color: var(--color-text, #0f172a); display: flex; align-items: center; gap: 0.5rem;">
              <span>Chỉ Số Ngày Tốt & Hoạch Định Lịch Trình Y Khoa</span>
            </h3>
          </div>
          <button class="modal-close-btn" id="closeDayScoreModal" style="background: none; border: none; font-size: 1.8rem; cursor: pointer; color: var(--color-text-muted, #64748b); line-height: 1;" title="Đóng">&times;</button>
        </div>

        <!-- Navigation Tabs (5 Tabs) -->
        <div class="modal-tab-bar" style="display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 1.15rem; border-bottom: 1px solid var(--color-border, #e2e8f0); padding-bottom: 0.5rem;">
          <button type="button" class="score-tab-btn" id="tabBtnDay" style="padding: 0.45rem 0.8rem; border-radius: 0.5rem; font-size: 0.82rem; font-weight: 700; border: none; cursor: pointer; background: ${activeTab === 'day' ? 'var(--color-primary, #0284c7)' : 'var(--color-surface-offset, #f1f5f9)'}; color: ${activeTab === 'day' ? '#fff' : 'var(--color-text, #334155)'};">
            📅 Chi Tiết Ngày
          </button>
          <button type="button" class="score-tab-btn" id="tabBtnWeek" style="padding: 0.45rem 0.8rem; border-radius: 0.5rem; font-size: 0.82rem; font-weight: 700; border: none; cursor: pointer; background: ${activeTab === 'week' ? 'var(--color-primary, #0284c7)' : 'var(--color-surface-offset, #f1f5f9)'}; color: ${activeTab === 'week' ? '#fff' : 'var(--color-text, #334155)'};">
            📊 Dự Báo 7 Ngày
          </button>
          <button type="button" class="score-tab-btn" id="tabBtnFinder" style="padding: 0.45rem 0.8rem; border-radius: 0.5rem; font-size: 0.82rem; font-weight: 700; border: none; cursor: pointer; background: ${activeTab === 'finder' ? 'var(--color-primary, #0284c7)' : 'var(--color-surface-offset, #f1f5f9)'}; color: ${activeTab === 'finder' ? '#fff' : 'var(--color-text, #334155)'};">
            🎯 Tìm Ngày Đẹp Y Khoa
          </button>
          <button type="button" class="score-tab-btn" id="tabBtnMonth" style="padding: 0.45rem 0.8rem; border-radius: 0.5rem; font-size: 0.82rem; font-weight: 700; border: none; cursor: pointer; background: ${activeTab === 'month' ? 'var(--color-primary, #0284c7)' : 'var(--color-surface-offset, #f1f5f9)'}; color: ${activeTab === 'month' ? '#fff' : 'var(--color-text, #334155)'};">
            🗓️ Lịch Tháng Heatmap
          </button>
          <button type="button" class="score-tab-btn" id="tabBtnProfile" style="padding: 0.45rem 0.8rem; border-radius: 0.5rem; font-size: 0.82rem; font-weight: 700; border: none; cursor: pointer; background: ${activeTab === 'profile' ? 'var(--color-primary, #0284c7)' : 'var(--color-surface-offset, #f1f5f9)'}; color: ${activeTab === 'profile' ? '#fff' : 'var(--color-text, #334155)'}; margin-left: auto;">
            ⚙️ Hồ Sơ Bác Sĩ
          </button>
        </div>

        <!-- TAB 1: CHI TIẾT NGÀY ĐANG CHỌN -->
        <div id="tabContentDay" style="display: ${activeTab === 'day' ? 'flex' : 'none'}; flex-direction: column; gap: 1.15rem;">
          
          <!-- Top Score Summary Banner -->
          <div class="score-summary-banner ${evalData.badgeClass}" style="display: flex; align-items: center; gap: 1.25rem; padding: 1.25rem; background: var(--color-surface-offset, #f8fafc); border-radius: 0.85rem; border: 1px solid var(--color-border, #e2e8f0);">
            <div class="score-gauge-wrap" style="position: relative; width: 84px; height: 84px; flex-shrink: 0; display: flex; align-items: center; justify-content: center;">
              <svg style="width: 100%; height: 100%; transform: rotate(-90deg);" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="var(--color-border, #e2e8f0)" stroke-width="8" />
                <circle cx="50" cy="50" r="42" fill="none" stroke="var(--color-primary, #0284c7)" stroke-width="8" stroke-dasharray="264" stroke-dashoffset="${264 - (264 * evalData.total) / 100}" stroke-linecap="round" />
              </svg>
              <div style="position: absolute; text-align: center;">
                <span style="font-size: 1.35rem; font-weight: 800; color: var(--color-text, #0f172a);">${evalData.total}</span>
                <span style="font-size: 0.65rem; color: var(--color-text-muted, #64748b); display: block; margin-top: -3px;">/100</span>
              </div>
            </div>
            <div style="flex: 1;">
              <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 0.35rem;">
                <div style="display: flex; align-items: center; gap: 0.4rem;">
                  <span style="font-size: 0.8rem; font-weight: 700; padding: 0.2rem 0.65rem; border-radius: 1rem; background: var(--color-primary, #0284c7); color: #fff;">
                    ${evalData.icon} ${evalData.rating}
                  </span>
                  <span style="font-size: 0.8rem; color: var(--color-text-muted, #64748b);">Sao <strong>${sao.name}</strong> (${sao.type === 'cat' ? '✨ Cát' : '⚠️ Hung'}) • Trực <strong>${truc.name}</strong></span>
                </div>
                <div style="display: flex; gap: 0.35rem;">
                  <button type="button" id="btnExportICS" style="padding: 0.25rem 0.6rem; font-size: 0.75rem; font-weight: 700; border-radius: 0.35rem; border: 1px solid var(--color-primary, #0284c7); background: rgba(2,132,199,0.1); color: var(--color-primary, #0284c7); cursor: pointer;" title="Tải file .ics vào Google/Apple Calendar">
                    📅 Xuất iCal
                  </button>
                  <button type="button" id="btnCopySummary" style="padding: 0.25rem 0.6rem; font-size: 0.75rem; font-weight: 700; border-radius: 0.35rem; border: 1px solid var(--color-border, #e2e8f0); background: var(--color-surface, #fff); color: var(--color-text, #334155); cursor: pointer;" title="Sao chép tóm tắt ngày">
                    📋 Sao chép
                  </button>
                </div>
              </div>
              <h4 style="margin: 0 0 0.25rem 0; font-size: 1.1rem; font-weight: 800; color: var(--color-text, #0f172a);">
                ${evalData.formattedDate} — Ngày ${evalData.canChiDay} (Âm lịch: ${evalData.lunarDay}/${evalData.lunarMonth})
              </h4>
              <p style="margin: 0; font-size: 0.85rem; color: var(--color-text-muted, #64748b); line-height: 1.45;">${evalData.summaryText}</p>
              <div style="margin-top: 0.5rem; font-size: 0.78rem; color: var(--color-text, #0f172a); display: flex; flex-wrap: wrap; align-items: center; gap: 0.4rem;">
                <span>👨‍⚕️ <strong>${doc.name || 'Bác sĩ'}</strong> (${doc.gender || 'Nam'}) — Tuổi ${doc.canNam} ${doc.chiNam} (Mệnh ${doc.hanhMenh})</span>
                ${quyNhan.thienAt.isMatch ? `<span style="background: rgba(16,185,129,0.15); color: #059669; padding: 0.1rem 0.4rem; border-radius: 4px; font-weight: 700;">🌟 Thiên Ất Quý Nhân</span>` : ''}
                ${diaChi.tamHop.isMatch ? `<span style="background: rgba(2,132,199,0.15); color: #0284c7; padding: 0.1rem 0.4rem; border-radius: 4px; font-weight: 700;">✨ Tam Hợp Cát</span>` : ''}
              </div>
            </div>
          </div>

          <!-- 4 Khuyến Nghị Hành Động Lâm Sàng -->
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(190px, 1fr)); gap: 0.65rem;">
            <div style="padding: 0.75rem; border-radius: 0.6rem; background: var(--color-surface-offset, #f8fafc); border: 1px solid var(--color-border, #e2e8f0);">
              <div style="font-size: 0.8rem; font-weight: 700; color: ${evalData.advice.surgery.status === 'good' ? '#059669' : (evalData.advice.surgery.status === 'caution' ? '#d97706' : 'var(--color-text, #0f172a)')}; margin-bottom: 0.2rem;">
                🔪 ${evalData.advice.surgery.title}
              </div>
              <p style="margin: 0; font-size: 0.78rem; color: var(--color-text-muted, #64748b); line-height: 1.35;">${evalData.advice.surgery.text}</p>
            </div>
            <div style="padding: 0.75rem; border-radius: 0.6rem; background: var(--color-surface-offset, #f8fafc); border: 1px solid var(--color-border, #e2e8f0);">
              <div style="font-size: 0.8rem; font-weight: 700; color: ${evalData.advice.consultation.status === 'good' ? '#059669' : 'var(--color-text, #0f172a)'}; margin-bottom: 0.2rem;">
                🔬 ${evalData.advice.consultation.title}
              </div>
              <p style="margin: 0; font-size: 0.78rem; color: var(--color-text-muted, #64748b); line-height: 1.35;">${evalData.advice.consultation.text}</p>
            </div>
            <div style="padding: 0.75rem; border-radius: 0.6rem; background: var(--color-surface-offset, #f8fafc); border: 1px solid var(--color-border, #e2e8f0);">
              <div style="font-size: 0.8rem; font-weight: 700; color: ${evalData.advice.communication.status === 'good' ? '#059669' : (evalData.advice.communication.status === 'caution' ? '#d97706' : 'var(--color-text, #0f172a)')}; margin-bottom: 0.2rem;">
                💬 ${evalData.advice.communication.title}
              </div>
              <p style="margin: 0; font-size: 0.78rem; color: var(--color-text-muted, #64748b); line-height: 1.35;">${evalData.advice.communication.text}</p>
            </div>
            <div style="padding: 0.75rem; border-radius: 0.6rem; background: var(--color-surface-offset, #f8fafc); border: 1px solid var(--color-border, #e2e8f0);">
              <div style="font-size: 0.8rem; font-weight: 700; color: ${evalData.advice.research.status === 'good' ? '#059669' : 'var(--color-text, #0f172a)'}; margin-bottom: 0.2rem;">
                📚 ${evalData.advice.research.title}
              </div>
              <p style="margin: 0; font-size: 0.78rem; color: var(--color-text-muted, #64748b); line-height: 1.35;">${evalData.advice.research.text}</p>
            </div>
          </div>

          <!-- Timeline 12 Khung Giờ Real-Time -->
          <div style="padding: 0.85rem; border-radius: 0.6rem; background: var(--color-surface-offset, #f8fafc); border: 1px solid var(--color-border, #e2e8f0);">
            <div style="font-size: 0.85rem; font-weight: 800; color: var(--color-text, #0f172a); margin-bottom: 0.5rem; display: flex; justify-content: space-between; align-items: center;">
              <span><i class="fa-solid fa-clock-rotate-left" style="color: var(--color-primary, #0284c7);"></i> Timeline 12 Khung Giờ & Thần Sát (Cát/Hắc Đạo):</span>
              <span style="font-size: 0.72rem; color: #10b981; font-weight: 700;">🟢 Khung giờ phát sáng = Giờ hiện tại</span>
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(125px, 1fr)); gap: 0.4rem;">
              ${evalData.gioTimeline.map(g => `
                <div style="padding: 0.4rem 0.5rem; border-radius: 0.4rem; border: 1px solid ${g.isCurrent ? '#10b981' : 'var(--color-border, #e2e8f0)'}; background: ${g.isCurrent ? 'rgba(16,185,129,0.12)' : (g.isHoangDao ? 'rgba(2,132,199,0.05)' : 'var(--color-surface, #fff)')}; position: relative; ${g.isCurrent ? 'box-shadow: 0 0 0 2px rgba(16,185,129,0.4);' : ''}">
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-size: 0.75rem; font-weight: 800; color: var(--color-text, #0f172a);">Giờ ${g.chi}</span>
                    <span style="font-size: 0.65rem; font-weight: 700; color: ${g.isHoangDao ? '#059669' : '#94a3b8'};">${g.isHoangDao ? '🌟 Hoàng Đạo' : '🌑 Hắc Đạo'}</span>
                  </div>
                  <div style="font-size: 0.68rem; color: var(--color-text-muted, #64748b);">${g.timeRange}</div>
                  <div style="font-size: 0.7rem; font-weight: 700; color: ${g.isHoangDao ? 'var(--color-primary, #0284c7)' : 'var(--color-text-muted, #64748b)'}; margin-top: 0.15rem;" title="${g.meaning}">
                    ${g.starName}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Bát Tự & 28 Sao Tú & Tiết Khí -->
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 0.75rem;">
            <div style="padding: 0.85rem; border-radius: 0.6rem; background: var(--color-surface-offset, #f8fafc); border: 1px solid var(--color-border, #e2e8f0);">
              <span style="font-size: 0.7rem; font-weight: 700; color: var(--color-text-muted, #64748b); text-transform: uppercase;">NHỊ THẬP BÁT TÚ</span>
              <div style="font-weight: 800; font-size: 0.95rem; color: var(--color-text, #0f172a); margin: 0.2rem 0;">
                Sao ${sao.name} (${sao.element} ${sao.animal}) — ${sao.type === 'cat' ? '<span style="color:#10b981;">Cát Tinh</span>' : '<span style="color:#ef4444;">Hung Tinh</span>'}
              </div>
              <p style="font-size: 0.78rem; color: var(--color-text-muted, #64748b); margin: 0; line-height: 1.35;">${sao.desc}</p>
            </div>
            <div style="padding: 0.85rem; border-radius: 0.6rem; background: var(--color-surface-offset, #f8fafc); border: 1px solid var(--color-border, #e2e8f0);">
              <span style="font-size: 0.7rem; font-weight: 700; color: var(--color-text-muted, #64748b); text-transform: uppercase;">12 TRỰC NGÀY</span>
              <div style="font-weight: 800; font-size: 0.95rem; color: var(--color-text, #0f172a); margin: 0.2rem 0;">Trực ${truc.name} (${truc.rating})</div>
              <p style="font-size: 0.78rem; color: var(--color-text-muted, #64748b); margin: 0; line-height: 1.35;">${truc.desc}</p>
            </div>
            <div style="padding: 0.85rem; border-radius: 0.6rem; background: var(--color-surface-offset, #f8fafc); border: 1px solid var(--color-border, #e2e8f0);">
              <span style="font-size: 0.7rem; font-weight: 700; color: var(--color-text-muted, #64748b); text-transform: uppercase;">TIẾT KHÍ KHÍ HẬU</span>
              <div style="font-weight: 800; font-size: 0.95rem; color: var(--color-text, #0f172a); margin: 0.2rem 0;">${tiet.tietKhi.icon} Tiết ${tiet.tietKhi.name}</div>
              <p style="font-size: 0.78rem; color: var(--color-text-muted, #64748b); margin: 0; line-height: 1.35;">Cát khí mùa: +${tiet.tietKhi.score}đ ${tiet.tuLyTuTuyet ? ` | <strong style="color:#ef4444;">⚠️ ${tiet.tuLyTuTuyet.name}</strong>` : ''}</p>
            </div>
          </div>

          <!-- Biorhythms 4 Trục -->
          <div style="padding: 0.85rem; border-radius: 0.6rem; background: var(--color-surface-offset, #f8fafc); border: 1px solid var(--color-border, #e2e8f0);">
            <div style="font-weight: 800; font-size: 0.85rem; color: var(--color-text, #0f172a); margin-bottom: 0.5rem; display: flex; justify-content: space-between; align-items: center;">
              <span><i class="fa-solid fa-heart-pulse" style="color: #ef4444;"></i> Nhịp Sinh Học 4 Trục (${evalData.bio.daysLived} ngày tuổi):</span>
              <span style="font-size: 0.75rem; color: var(--color-text-muted, #64748b);">TB: ${evalData.bio.avgScore}%</span>
            </div>
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.4rem; text-align: center;">
              <div style="padding: 0.4rem 0.2rem; background: var(--color-surface, #fff); border-radius: 0.4rem; border: 1px solid var(--color-border, #e2e8f0);">
                <div style="font-size: 0.7rem; color: var(--color-text-muted, #64748b);">💪 Thể lực</div>
                <div style="font-weight: 800; font-size: 0.95rem; color: #10b981;">${evalData.bio.physical}%</div>
              </div>
              <div style="padding: 0.4rem 0.2rem; background: var(--color-surface, #fff); border-radius: 0.4rem; border: 1px solid var(--color-border, #e2e8f0);">
                <div style="font-size: 0.7rem; color: var(--color-text-muted, #64748b);">🧠 Trí tuệ</div>
                <div style="font-weight: 800; font-size: 0.95rem; color: #8b5cf6;">${evalData.bio.intellectual}%</div>
              </div>
              <div style="padding: 0.4rem 0.2rem; background: var(--color-surface, #fff); border-radius: 0.4rem; border: 1px solid var(--color-border, #e2e8f0);">
                <div style="font-size: 0.7rem; color: var(--color-text-muted, #64748b);">❤️ Cảm xúc</div>
                <div style="font-weight: 800; font-size: 0.95rem; color: #0284c7;">${evalData.bio.emotional}%</div>
              </div>
              <div style="padding: 0.4rem 0.2rem; background: var(--color-surface, #fff); border-radius: 0.4rem; border: 1px solid var(--color-border, #e2e8f0);">
                <div style="font-size: 0.7rem; color: var(--color-text-muted, #64748b);">🎯 Trực giác</div>
                <div style="font-weight: 800; font-size: 0.95rem; color: #f59e0b;">${evalData.bio.intuitive}%</div>
              </div>
            </div>
            ${evalData.bio.clinicalTips.length > 0 ? `
              <div style="margin-top: 0.5rem; font-size: 0.78rem; color: var(--color-text, #0f172a);">
                ${evalData.bio.clinicalTips.map(tip => `<div style="margin-top: 0.2rem;">${tip}</div>`).join('')}
              </div>
            ` : ''}
          </div>

        </div>

        <!-- TAB 2: DỰ BÁO 7 NGÀY -->
        <div id="tabContentWeek" style="display: ${activeTab === 'week' ? 'flex' : 'none'}; flex-direction: column; gap: 1rem;">
          <div style="padding: 0.75rem 1rem; background: rgba(2,132,199,0.08); border-radius: 0.6rem; border: 1px solid rgba(2,132,199,0.25); display: flex; align-items: center; justify-content: space-between;">
            <div>
              <span style="font-weight: 800; font-size: 0.9rem; color: var(--color-primary, #0284c7);">📊 DỰ BÁO NHẬT HẠN 7 NGÀY LIÊN TIẾP</span>
              <p style="margin: 0.15rem 0 0 0; font-size: 0.78rem; color: var(--color-text-muted, #64748b);">Click vào bất kỳ thẻ ngày nào bên dưới để mở phân tích chi tiết cho ngày đó.</p>
            </div>
          </div>

          <div class="week-forecast-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); gap: 0.5rem;">
            ${weekData.map((item) => `
              <div class="week-forecast-card ${item.badgeClass} ${item.isToday ? 'is-today' : ''} ${item.isBestDay ? 'is-best-day' : ''}" 
                   data-date-str="${item.date.toISOString()}"
                   style="padding: 0.75rem 0.5rem; border-radius: 0.6rem; background: var(--color-surface-offset, #f8fafc); border: 1px solid ${item.isToday ? 'var(--color-primary, #0284c7)' : 'var(--color-border, #e2e8f0)'}; cursor: pointer; text-align: center; position: relative; transition: all 0.2s ease;">
                
                ${item.isBestDay ? `<span style="position: absolute; top: -8px; right: -4px; background: #f59e0b; color: #fff; font-size: 0.6rem; font-weight: 800; padding: 0.1rem 0.35rem; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.15);">🌟 TỐT NHẤT</span>` : ''}
                ${item.isToday ? `<span style="position: absolute; top: -8px; left: -4px; background: var(--color-primary, #0284c7); color: #fff; font-size: 0.6rem; font-weight: 800; padding: 0.1rem 0.35rem; border-radius: 10px;">HÔM NAY</span>` : ''}

                <div style="font-size: 0.75rem; font-weight: 700; color: var(--color-text-muted, #64748b); text-transform: uppercase;">${item.dayOfWeek}</div>
                <div style="font-size: 0.95rem; font-weight: 800; color: var(--color-text, #0f172a); margin: 0.1rem 0;">${item.dateFormatted}</div>
                <div style="font-size: 0.7rem; color: var(--color-text-muted, #64748b);">${item.lunarFormatted}</div>
                
                <div style="margin: 0.5rem 0 0.3rem 0; font-size: 1.25rem; font-weight: 900; color: var(--color-text, #0f172a);">
                  ${item.score}<span style="font-size: 0.65rem; font-weight: 600; color: var(--color-text-muted, #64748b);">/100</span>
                </div>
                
                <div style="font-size: 0.72rem; font-weight: 700; padding: 0.15rem 0.3rem; border-radius: 4px; background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); color: var(--color-text, #0f172a); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                  ${item.icon} ${item.rating}
                </div>

                <div style="margin-top: 0.4rem; font-size: 0.68rem; color: var(--color-text-muted, #64748b); line-height: 1.2;">
                  <div>${item.canChi}</div>
                  <div>Sao <strong>${item.saoTu}</strong> • Trực <strong>${item.truc}</strong></div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- TAB 3: BỘ TÌM NGÀY ĐẸP Y KHOA (CLINICAL DATE FINDER) -->
        <div id="tabContentFinder" style="display: ${activeTab === 'finder' ? 'flex' : 'none'}; flex-direction: column; gap: 1rem;">
          <div style="padding: 1rem; background: var(--color-surface-offset, #f8fafc); border-radius: 0.6rem; border: 1px solid var(--color-border, #e2e8f0);">
            <label style="font-weight: 800; font-size: 0.9rem; display: block; margin-bottom: 0.5rem; color: var(--color-primary, #0284c7);">
              🎯 Chọn Mục Đích Cần Tìm Ngày Đẹp (Quét 30 Ngày Tới):
            </label>
            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;" id="purposeSelectorWrap">
              <button type="button" class="purpose-filter-btn active" data-purpose="surgery" style="padding: 0.45rem 0.85rem; font-size: 0.8rem; font-weight: 700; border-radius: 0.4rem; border: 1px solid var(--color-primary, #0284c7); background: var(--color-primary, #0284c7); color: #fff; cursor: pointer;">
                🔪 Phẫu Thuật & Mổ Phiên
              </button>
              <button type="button" class="purpose-filter-btn" data-purpose="clinic" style="padding: 0.45rem 0.85rem; font-size: 0.8rem; font-weight: 700; border-radius: 0.4rem; border: 1px solid var(--color-border, #e2e8f0); background: var(--color-surface, #fff); color: var(--color-text, #334155); cursor: pointer;">
                🏥 Khai Trương / Tiếp Nhận Máy
              </button>
              <button type="button" class="purpose-filter-btn" data-purpose="ebm" style="padding: 0.45rem 0.85rem; font-size: 0.8rem; font-weight: 700; border-radius: 0.4rem; border: 1px solid var(--color-border, #e2e8f0); background: var(--color-surface, #fff); color: var(--color-text, #334155); cursor: pointer;">
                🎓 Báo Cáo EBM & Luận Án
              </button>
              <button type="button" class="purpose-filter-btn" data-purpose="consultation" style="padding: 0.45rem 0.85rem; font-size: 0.8rem; font-weight: 700; border-radius: 0.4rem; border: 1px solid var(--color-border, #e2e8f0); background: var(--color-surface, #fff); color: var(--color-text, #334155); cursor: pointer;">
                🤝 Hội Chẩn & Ký Hợp Đồng
              </button>
            </div>
          </div>

          <!-- Top 5 Best Days Container -->
          <div id="bestDaysContainer" style="display: flex; flex-direction: column; gap: 0.65rem;">
            ${bestSurgeryDays.map((item) => `
              <div class="week-forecast-card ${item.evalData.badgeClass}" 
                   data-date-str="${item.evalData.dateObj.toISOString()}"
                   style="padding: 0.85rem 1rem; border-radius: 0.6rem; background: var(--color-surface-offset, #f8fafc); border: 1px solid var(--color-border, #e2e8f0); display: flex; align-items: center; justify-content: space-between; gap: 1rem; cursor: pointer;">
                <div style="display: flex; align-items: center; gap: 0.75rem;">
                  <span style="font-size: 1.4rem; font-weight: 900; color: ${item.rank === 1 ? '#f59e0b' : (item.rank === 2 ? '#94a3b8' : '#b45309')};">
                    #${item.rank}
                  </span>
                  <div>
                    <h4 style="margin: 0 0 0.15rem 0; font-size: 0.95rem; font-weight: 800; color: var(--color-text, #0f172a);">
                      ${item.evalData.formattedDate} — Ngày ${item.evalData.canChiDay}
                    </h4>
                    <div style="font-size: 0.75rem; color: var(--color-text-muted, #64748b);">
                      ${item.matchReasons.join(' • ')}
                    </div>
                  </div>
                </div>
                <div style="text-align: right; flex-shrink: 0;">
                  <div style="font-size: 1.25rem; font-weight: 900; color: var(--color-text, #0f172a);">${item.evalData.total}đ</div>
                  <span style="font-size: 0.72rem; font-weight: 700; color: #059669;">${item.evalData.icon} ${item.evalData.rating}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- TAB 4: LỊCH THÁNG HEATMAP (30-DAY MATRIX) -->
        <div id="tabContentMonth" style="display: ${activeTab === 'month' ? 'flex' : 'none'}; flex-direction: column; gap: 1rem;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-weight: 800; font-size: 0.95rem; color: var(--color-text, #0f172a);">
              🗓️ Tháng ${currentMonth} Năm ${currentYear} (Toàn Cảnh Nhật Hạn)
            </span>
            <div style="display: flex; gap: 0.5rem; font-size: 0.72rem; font-weight: 700;">
              <span style="color: #059669;">🟢 Đại Cát (≥82)</span>
              <span style="color: #0284c7;">🔵 Cát Lành (≥65)</span>
              <span style="color: #64748b;">⚪ Bình Hòa (≥45)</span>
              <span style="color: #d97706;">🟠 Thận Trọng</span>
            </div>
          </div>

          <!-- Month Matrix Grid (7 columns: T2 -> CN) -->
          <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 0.35rem;">
            ${['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map(w => `
              <div style="font-size: 0.72rem; font-weight: 800; color: var(--color-text-muted, #64748b); text-align: center; padding: 0.2rem 0;">${w}</div>
            `).join('')}
            ${Array.from({ length: firstDayOffset }).map(() => `
              <div style="padding: 0.4rem 0.2rem; border-radius: 0.4rem; opacity: 0; pointer-events: none;" aria-hidden="true"></div>
            `).join('')}
            ${monthData.map(d => {
              const dayNum = d.dateObj.getDate();
              const isToday = d.dateObj.toDateString() === new Date().toDateString();
              return `
                <div class="week-forecast-card ${d.badgeClass} ${isToday ? 'is-today' : ''}" 
                     data-date-str="${d.dateObj.toISOString()}"
                     style="padding: 0.4rem 0.2rem; border-radius: 0.4rem; background: var(--color-surface-offset, #f8fafc); border: 1px solid ${isToday ? 'var(--color-primary, #0284c7)' : 'var(--color-border, #e2e8f0)'}; cursor: pointer; text-align: center;">
                  <div style="font-size: 0.8rem; font-weight: 800; color: var(--color-text, #0f172a);">${dayNum}</div>
                  <div style="font-size: 0.65rem; color: var(--color-text-muted, #64748b);">${d.lunarDay}/${d.lunarMonth}</div>
                  <div style="font-size: 0.75rem; font-weight: 800; color: ${d.total >= 82 ? '#059669' : (d.total >= 65 ? '#0284c7' : (d.total >= 45 ? '#64748b' : '#d97706'))}; margin-top: 0.1rem;">
                    ${d.total}đ
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- TAB 5: HỒ SƠ BÁC SĨ -->
        <div id="tabContentProfile" style="display: ${activeTab === 'profile' ? 'flex' : 'none'}; flex-direction: column; gap: 1rem;">
          <div style="padding: 1rem; background: var(--color-surface-offset, #f8fafc); border: 1px solid var(--color-border, #e2e8f0); border-radius: 0.6rem;">
            <label style="font-weight: 800; font-size: 0.9rem; display: block; margin-bottom: 0.6rem; color: var(--color-primary, #0284c7);">
              ⚙️ Cấu Hình Thông Tin Bác Sĩ (Cá Nhân Hóa Bát Tự & Biorhythms):
            </label>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 0.65rem;">
              <div>
                <span style="font-size: 0.75rem; color: var(--color-text-muted, #64748b); font-weight: 600;">Họ tên:</span>
                <input type="text" id="inputDocName" value="${doc.name || 'Bác sĩ'}" style="width: 100%; padding: 0.4rem; font-size: 0.85rem; border: 1px solid var(--color-border, #e2e8f0); border-radius: 0.35rem; background: var(--color-surface, #fff); color: var(--color-text, #0f172a);">
              </div>
              <div>
                <span style="font-size: 0.75rem; color: var(--color-text-muted, #64748b); font-weight: 600;">Giới tính:</span>
                <select id="selectDocGender" style="width: 100%; padding: 0.4rem; font-size: 0.85rem; border: 1px solid var(--color-border, #e2e8f0); border-radius: 0.35rem; background: var(--color-surface, #fff); color: var(--color-text, #0f172a);">
                  <option value="Nam" ${doc.gender === 'Nam' ? 'selected' : ''}>Nam</option>
                  <option value="Nữ" ${doc.gender === 'Nữ' ? 'selected' : ''}>Nữ</option>
                </select>
              </div>
              <div>
                <span style="font-size: 0.75rem; color: var(--color-text-muted, #64748b); font-weight: 600;">Năm sinh:</span>
                <input type="number" id="inputDocYear" value="${doc.birthYear || 1990}" min="1930" max="2030" style="width: 100%; padding: 0.4rem; font-size: 0.85rem; border: 1px solid var(--color-border, #e2e8f0); border-radius: 0.35rem; background: var(--color-surface, #fff); color: var(--color-text, #0f172a);">
              </div>
              <div>
                <span style="font-size: 0.75rem; color: var(--color-text-muted, #64748b); font-weight: 600;">Tháng sinh:</span>
                <input type="number" id="inputDocMonth" value="${doc.birthMonth || 8}" min="1" max="12" style="width: 100%; padding: 0.4rem; font-size: 0.85rem; border: 1px solid var(--color-border, #e2e8f0); border-radius: 0.35rem; background: var(--color-surface, #fff); color: var(--color-text, #0f172a);">
              </div>
              <div>
                <span style="font-size: 0.75rem; color: var(--color-text-muted, #64748b); font-weight: 600;">Ngày sinh:</span>
                <input type="number" id="inputDocDay" value="${doc.birthDay || 15}" min="1" max="31" style="width: 100%; padding: 0.4rem; font-size: 0.85rem; border: 1px solid var(--color-border, #e2e8f0); border-radius: 0.35rem; background: var(--color-surface, #fff); color: var(--color-text, #0f172a);">
              </div>
              <div>
                <span style="font-size: 0.75rem; color: var(--color-text-muted, #64748b); font-weight: 600;">Bản mệnh:</span>
                <select id="selectDocHanhMenh" style="width: 100%; padding: 0.4rem; font-size: 0.85rem; border: 1px solid var(--color-border, #e2e8f0); border-radius: 0.35rem; background: var(--color-surface, #fff); color: var(--color-text, #0f172a);">
                  <option value="Kim" ${doc.hanhMenh === 'Kim' ? 'selected' : ''}>Mệnh Kim ⚙️</option>
                  <option value="Mộc" ${doc.hanhMenh === 'Mộc' ? 'selected' : ''}>Mệnh Mộc 🌿</option>
                  <option value="Thủy" ${doc.hanhMenh === 'Thủy' ? 'selected' : ''}>Mệnh Thủy 🌊</option>
                  <option value="Hỏa" ${doc.hanhMenh === 'Hỏa' ? 'selected' : ''}>Mệnh Hỏa 🔥</option>
                  <option value="Thổ" ${doc.hanhMenh === 'Thổ' ? 'selected' : ''}>Mệnh Thổ 🏔️</option>
                </select>
              </div>
            </div>
            <div style="margin-top: 1rem; text-align: right;">
              <button type="button" id="btnSaveDocProfile" style="background: var(--color-primary, #0284c7); color: #fff; border: none; padding: 0.5rem 1.2rem; font-size: 0.85rem; font-weight: 700; border-radius: 0.4rem; cursor: pointer;">
                💾 Lưu Hồ Sơ & Cập Nhật Điểm
              </button>
            </div>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="modal-card-footer" style="margin-top: 1.25rem; padding-top: 0.75rem; border-top: 1px solid var(--color-border, #e2e8f0); display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 0.72rem; color: var(--color-text-muted, #64748b);">28 Sao Tú, Tam Hợp, Quý Nhân, Timeline 12 Giờ & Biorhythms 4 Trục</span>
          <button class="btn btn-primary" id="btnCloseDayScoreModalBottom" style="background: var(--color-primary, #0284c7); color: #fff; border: none; padding: 0.45rem 1.1rem; border-radius: 0.4rem; cursor: pointer; font-size: 0.85rem; font-weight: 700;">
            Đóng
          </button>
        </div>

      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);

  const overlay = document.getElementById('dayScoreModalOverlay');
  const closeBtn = document.getElementById('closeDayScoreModal');
  const closeBottom = document.getElementById('btnCloseDayScoreModalBottom');
  
  const tabBtnDay = document.getElementById('tabBtnDay');
  const tabBtnWeek = document.getElementById('tabBtnWeek');
  const tabBtnFinder = document.getElementById('tabBtnFinder');
  const tabBtnMonth = document.getElementById('tabBtnMonth');
  const tabBtnProfile = document.getElementById('tabBtnProfile');

  const tabContentDay = document.getElementById('tabContentDay');
  const tabContentWeek = document.getElementById('tabContentWeek');
  const tabContentFinder = document.getElementById('tabContentFinder');
  const tabContentMonth = document.getElementById('tabContentMonth');
  const tabContentProfile = document.getElementById('tabContentProfile');

  const btnExportICS = document.getElementById('btnExportICS');
  const btnCopySummary = document.getElementById('btnCopySummary');
  const btnSaveProfile = document.getElementById('btnSaveDocProfile');

  const closeModal = () => overlay && overlay.remove();
  closeBtn?.addEventListener('click', closeModal);
  closeBottom?.addEventListener('click', closeModal);
  overlay?.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  // Export iCal & Copy Summary Listeners
  btnExportICS?.addEventListener('click', () => downloadICSFile(evalData));
  btnCopySummary?.addEventListener('click', () => {
    copyDaySummaryText(evalData);
    if (btnCopySummary) {
      btnCopySummary.textContent = "✅ Đã chép!";
      setTimeout(() => { btnCopySummary.textContent = "📋 Sao chép"; }, 2000);
    }
  });

  // Switch Tab Handler
  const switchTab = (tab: 'day' | 'week' | 'finder' | 'month' | 'profile') => {
    if (tabContentDay) tabContentDay.style.display = tab === 'day' ? 'flex' : 'none';
    if (tabContentWeek) tabContentWeek.style.display = tab === 'week' ? 'flex' : 'none';
    if (tabContentFinder) tabContentFinder.style.display = tab === 'finder' ? 'flex' : 'none';
    if (tabContentMonth) tabContentMonth.style.display = tab === 'month' ? 'flex' : 'none';
    if (tabContentProfile) tabContentProfile.style.display = tab === 'profile' ? 'flex' : 'none';

    const setBtnStyle = (btn: HTMLElement | null, isActive: boolean) => {
      if (!btn) return;
      btn.style.background = isActive ? 'var(--color-primary, #0284c7)' : 'var(--color-surface-offset, #f1f5f9)';
      btn.style.color = isActive ? '#fff' : 'var(--color-text, #334155)';
    };

    setBtnStyle(tabBtnDay, tab === 'day');
    setBtnStyle(tabBtnWeek, tab === 'week');
    setBtnStyle(tabBtnFinder, tab === 'finder');
    setBtnStyle(tabBtnMonth, tab === 'month');
    setBtnStyle(tabBtnProfile, tab === 'profile');
  };

  tabBtnDay?.addEventListener('click', () => switchTab('day'));
  tabBtnWeek?.addEventListener('click', () => switchTab('week'));
  tabBtnFinder?.addEventListener('click', () => switchTab('finder'));
  tabBtnMonth?.addEventListener('click', () => switchTab('month'));
  tabBtnProfile?.addEventListener('click', () => switchTab('profile'));

  // Purpose filter in Finder tab
  const purposeBtns = overlay?.querySelectorAll('.purpose-filter-btn');
  const bestDaysContainer = document.getElementById('bestDaysContainer');
  purposeBtns?.forEach(btn => {
    btn.addEventListener('click', () => {
      purposeBtns.forEach(b => {
        (b as HTMLElement).style.background = 'var(--color-surface, #fff)';
        (b as HTMLElement).style.color = 'var(--color-text, #334155)';
        (b as HTMLElement).style.borderColor = 'var(--color-border, #e2e8f0)';
      });
      (btn as HTMLElement).style.background = 'var(--color-primary, #0284c7)';
      (btn as HTMLElement).style.color = '#fff';
      (btn as HTMLElement).style.borderColor = 'var(--color-primary, #0284c7)';

      const p = btn.getAttribute('data-purpose') as any;
      const found = findBestClinicalDays(p, 30, doc);

      if (bestDaysContainer) {
        bestDaysContainer.innerHTML = found.map(item => `
          <div class="week-forecast-card ${item.evalData.badgeClass}" 
               data-date-str="${item.evalData.dateObj.toISOString()}"
               style="padding: 0.85rem 1rem; border-radius: 0.6rem; background: var(--color-surface-offset, #f8fafc); border: 1px solid var(--color-border, #e2e8f0); display: flex; align-items: center; justify-content: space-between; gap: 1rem; cursor: pointer;">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <span style="font-size: 1.4rem; font-weight: 900; color: ${item.rank === 1 ? '#f59e0b' : (item.rank === 2 ? '#94a3b8' : '#b45309')};">
                #${item.rank}
              </span>
              <div>
                <h4 style="margin: 0 0 0.15rem 0; font-size: 0.95rem; font-weight: 800; color: var(--color-text, #0f172a);">
                  ${item.evalData.formattedDate} — Ngày ${item.evalData.canChiDay}
                </h4>
                <div style="font-size: 0.75rem; color: var(--color-text-muted, #64748b);">
                  ${item.matchReasons.join(' • ')}
                </div>
              </div>
            </div>
            <div style="text-align: right; flex-shrink: 0;">
              <div style="font-size: 1.25rem; font-weight: 900; color: var(--color-text, #0f172a);">${item.evalData.total}đ</div>
              <span style="font-size: 0.72rem; font-weight: 700; color: #059669;">${item.evalData.icon} ${item.evalData.rating}</span>
            </div>
          </div>
        `).join('');

        // Re-attach clicks
        bestDaysContainer.querySelectorAll('.week-forecast-card').forEach(card => {
          card.addEventListener('click', () => {
            const dateStr = card.getAttribute('data-date-str');
            if (dateStr) {
              closeModal();
              openDayScoreModal(new Date(dateStr), 'day');
            }
          });
        });
      }
    });
  });

  // Click card trong 7-Day & Month Grid để xem chi tiết ngày đó
  const allCards = overlay?.querySelectorAll('.week-forecast-card');
  allCards?.forEach(card => {
    card.addEventListener('click', () => {
      const dateStr = card.getAttribute('data-date-str');
      if (dateStr) {
        closeModal();
        openDayScoreModal(new Date(dateStr), 'day');
      }
    });
  });

  // Save Doctor Profile
  btnSaveProfile?.addEventListener('click', () => {
    const name = (document.getElementById('inputDocName') as HTMLInputElement)?.value.trim();
    const gender = (document.getElementById('selectDocGender') as HTMLSelectElement)?.value as any;
    const birthYear = parseInt((document.getElementById('inputDocYear') as HTMLInputElement)?.value, 10);
    const birthMonth = parseInt((document.getElementById('inputDocMonth') as HTMLInputElement)?.value, 10);
    const birthDay = parseInt((document.getElementById('inputDocDay') as HTMLInputElement)?.value, 10);
    const hanhMenh = (document.getElementById('selectDocHanhMenh') as HTMLSelectElement)?.value as any;

    saveDoctorProfile({ name, gender, birthYear, birthMonth, birthDay, hanhMenh });
    closeModal();
    updateDayScoreBadge();
    updateHeroEnergyBadge();
    openDayScoreModal(targetDate, 'day');
  });
}

// ─── MODAL NĂNG LƯỢNG TRỰC CA & CLINICAL PEARL ────────────────────────

export function openEnergyModal(): void {
  const now = new Date();
  const energy = calculateShiftEnergy(now);
  const pearl = getDailyClinicalPearl(now);

  const existing = document.getElementById('energyModalOverlay');
  if (existing) existing.remove();

  const modalHtml = `
    <div class="day-score-modal-overlay" id="energyModalOverlay" style="position: fixed; inset: 0; background: rgba(15,23,42,0.7); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 1rem;">
      <div class="day-score-modal-card animate-pop-in" style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 1.1rem; width: 100%; max-width: 640px; max-height: 90vh; overflow-y: auto; box-shadow: 0 25px 35px -5px rgba(0,0,0,0.3); padding: 1.4rem; display: flex; flex-direction: column; gap: 1.1rem;">
        
        <div class="modal-card-header" style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--color-border, #e2e8f0); padding-bottom: 0.75rem;">
          <div>
            <span style="font-size: 0.72rem; font-weight: 800; color: #f59e0b; text-transform: uppercase; letter-spacing: 0.06em;">⚡ CHỈ SỐ SẴN SÀNG LÂM SÀNG & CA TRỰC</span>
            <h3 style="font-size: 1.25rem; font-weight: 800; margin: 0.15rem 0 0 0; color: var(--color-text, #0f172a);">
              Mức Năng Lượng & Nhịp Sinh Học Circadian
            </h3>
          </div>
          <button class="modal-close-btn" id="closeEnergyModal" style="background: none; border: none; font-size: 1.8rem; cursor: pointer; color: var(--color-text-muted, #64748b); line-height: 1;" title="Đóng">&times;</button>
        </div>

        <div style="display: flex; align-items: center; gap: 1.25rem; padding: 1.1rem; background: linear-gradient(135deg, rgba(245,158,11,0.08), rgba(2,132,199,0.08)); border-radius: 0.85rem; border: 1px solid rgba(245,158,11,0.25);">
          <div style="font-size: 2.75rem; text-align: center; line-height: 1;">
            ${energy.icon}
          </div>
          <div>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span style="font-size: 1.4rem; font-weight: 900; color: #d97706;">${energy.energyPercent}%</span>
              <span style="font-size: 0.85rem; font-weight: 800; padding: 0.15rem 0.6rem; border-radius: 1rem; background: #f59e0b; color: #fff;">${energy.statusText}</span>
            </div>
            <div style="font-size: 0.85rem; font-weight: 700; color: var(--color-text, #0f172a); margin-top: 0.2rem;">
              Pha Sinh Học: ${energy.circadianPhase}
            </div>
            <div style="font-size: 0.78rem; color: var(--color-text-muted, #64748b); margin-top: 0.15rem;">
              🎯 Khung giờ vàng tập trung: <strong>${energy.peakHours}</strong>
            </div>
          </div>
        </div>

        ${energy.fatigueWarning ? `
          <div style="padding: 0.75rem 1rem; border-radius: 0.6rem; background: rgba(239,68,68,0.08); border: 1px solid rgba(239,68,68,0.25); font-size: 0.82rem; color: #dc2626; display: flex; align-items: center; gap: 0.5rem;">
            <span>⚠️</span> <span>${energy.fatigueWarning}</span>
          </div>
        ` : ''}

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
          <div style="padding: 0.85rem; border-radius: 0.6rem; background: var(--color-surface-offset, #f8fafc); border: 1px solid var(--color-border, #e2e8f0);">
            <div style="font-size: 0.8rem; font-weight: 800; color: var(--color-text, #0f172a); margin-bottom: 0.35rem;">
              ☕ Khuyến Nghị Nạp Năng Lượng:
            </div>
            <p style="margin: 0; font-size: 0.78rem; color: var(--color-text-muted, #64748b); line-height: 1.4;">${energy.caffeineTip}</p>
          </div>
          <div style="padding: 0.85rem; border-radius: 0.6rem; background: var(--color-surface-offset, #f8fafc); border: 1px solid var(--color-border, #e2e8f0);">
            <div style="font-size: 0.8rem; font-weight: 800; color: var(--color-text, #0f172a); margin-bottom: 0.35rem;">
              📋 Bảng Kiểm An Toàn Ca Trực:
            </div>
            <div style="font-size: 0.75rem; color: var(--color-text-muted, #64748b); line-height: 1.35;">
              ${energy.safetyChecklist.map(item => `<div>${item}</div>`).join('')}
            </div>
          </div>
        </div>

        <div style="padding: 1rem; border-radius: 0.75rem; background: linear-gradient(135deg, rgba(2,132,199,0.08), rgba(99,102,241,0.08)); border: 1px solid rgba(2,132,199,0.3);">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.35rem;">
            <span style="font-size: 0.72rem; font-weight: 800; color: var(--color-primary, #0284c7); text-transform: uppercase;">
              💡 CLINICAL PEARL TRONG NGÀY [${pearl.topic}]
            </span>
            <span style="font-size: 0.7rem; color: var(--color-text-muted, #64748b);">EBM Chuẩn 30s</span>
          </div>
          <h4 style="margin: 0 0 0.25rem 0; font-size: 0.95rem; font-weight: 800; color: var(--color-text, #0f172a);">
            ${pearl.title}
          </h4>
          <p style="margin: 0; font-size: 0.82rem; color: var(--color-text, #334155); line-height: 1.45;">
            ${pearl.text}
          </p>
        </div>

        <div style="text-align: right; border-top: 1px solid var(--color-border, #e2e8f0); padding-top: 0.75rem;">
          <button class="btn btn-primary" id="btnCloseEnergyModalBottom" style="background: var(--color-primary, #0284c7); color: #fff; border: none; padding: 0.45rem 1.1rem; border-radius: 0.4rem; cursor: pointer; font-size: 0.85rem; font-weight: 700;">
            Đóng
          </button>
        </div>

      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);

  const overlay = document.getElementById('energyModalOverlay');
  const closeBtn = document.getElementById('closeEnergyModal');
  const closeBottom = document.getElementById('btnCloseEnergyModalBottom');

  const closeModal = () => overlay && overlay.remove();
  closeBtn?.addEventListener('click', closeModal);
  closeBottom?.addEventListener('click', closeModal);
  overlay?.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });
}

// ─── INITIALIZATION ───────────────────────────────────────────────────

export function initGoodDayCalculator(): void {
  updateDayScoreBadge();
  updateHeroEnergyBadge();

  const heroDayBtn = document.getElementById('heroDayScoreBtn');
  if (heroDayBtn) {
    heroDayBtn.style.cursor = 'pointer';
    heroDayBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openDayScoreModal(new Date(), 'day');
    });
  }

  const heroEnergyBtn = document.getElementById('heroEnergyScoreBtn');
  if (heroEnergyBtn) {
    heroEnergyBtn.style.cursor = 'pointer';
    heroEnergyBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openEnergyModal();
    });
  }
}

// Auto init
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initGoodDayCalculator());
  } else {
    initGoodDayCalculator();
  }
}

// Expose to window for backward compatibility
if (typeof window !== 'undefined') {
  (window as any).GoodDayCalculator = {
    evaluateDayScore,
    getWeekEvaluation,
    findBestClinicalDays,
    getMonthEvaluation,
    generateICSContent,
    downloadICSFile,
    copyDaySummaryText,
    calculateShiftEnergy,
    getDailyClinicalPearl,
    getDoctorProfile,
    saveDoctorProfile,
    getCanChiYear,
    getSaoTu,
    calculateBiorhythms,
    getTrucNgay,
    getTietKhiInfo,
    calculateGioTimeline,
    kiemTraThanSat,
    kiemTraDiaChi,
    kiemTraQuyNhanLoc,
    updateDayScoreBadge,
    updateHeroEnergyBadge,
    openDayScoreModal,
    openEnergyModal,
    initGoodDayCalculator
  };
}
