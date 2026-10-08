/**
 * CliniPortal 2.0 — Good Day UI Modals, Badges & Clinical Internal Medicine Calendar
 * Thiết kế giao diện chuyên nghiệp, tối giản, công thái học cho Bác Sĩ Nội Khoa
 * Path: src/tools/good-day-modal.ts
 */

import type {
  DoctorProfile,
  DoctorSpecialty,
  DayScoreEvaluation,
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
  copyDaySummaryText,
  SPECIALTY_METAS
} from './good-day-engine';

import { getDailyClinicalPearl } from './good-day-data';

// ─── HELPER FORMAT STYLES (MINIMALIST & ACCESSIBLE) ───────────────────

function getNapAmRelationBadge(relation: string, score: number, text: string): string {
  let bg = 'rgba(100, 116, 139, 0.08)';
  let color = 'var(--color-text-muted, #64748b)';
  let border = 'var(--color-border, #e2e8f0)';

  switch (relation) {
    case 'sinh_nhap':
      bg = 'rgba(16, 185, 129, 0.1)';
      color = '#059669';
      border = 'rgba(16, 185, 129, 0.3)';
      break;
    case 'dong_khi':
    case 'dong_hanh':
      bg = 'rgba(2, 132, 199, 0.08)';
      color = 'var(--color-primary, #0284c7)';
      border = 'rgba(2, 132, 199, 0.25)';
      break;
    case 'sinh_xuat':
      bg = 'rgba(99, 102, 241, 0.08)';
      color = '#4f46e5';
      border = 'rgba(99, 102, 241, 0.25)';
      break;
    case 'khac_xuat':
      bg = 'rgba(245, 158, 11, 0.08)';
      color = '#d97706';
      border = 'rgba(245, 158, 11, 0.25)';
      break;
    case 'khac_nhap':
      bg = 'rgba(239, 68, 68, 0.08)';
      color = '#dc2626';
      border = 'rgba(239, 68, 68, 0.25)';
      break;
  }

  const scoreStr = score >= 0 ? `+${score}đ` : `${score}đ`;
  return `
    <span style="display: inline-flex; align-items: center; gap: 0.35rem; padding: 0.2rem 0.55rem; border-radius: 4px; background: ${bg}; color: ${color}; border: 1px solid ${border}; font-size: 0.74rem; font-weight: 600;">
      <span>${text} (${scoreStr})</span>
    </span>
  `;
}

function getGioRankVisual(rank: number): { badgeBg: string; textColor: string; borderColor: string; title: string } {
  switch (rank) {
    case 1:
      return { badgeBg: 'rgba(16, 185, 129, 0.12)', textColor: '#047857', borderColor: 'rgba(16, 185, 129, 0.4)', title: 'Hạng 1 • Rất nên dùng' };
    case 2:
      return { badgeBg: 'rgba(16, 185, 129, 0.08)', textColor: '#059669', borderColor: 'rgba(16, 185, 129, 0.25)', title: 'Hạng 2 • Nên dùng' };
    case 3:
      return { badgeBg: 'rgba(2, 132, 199, 0.08)', textColor: 'var(--color-primary, #0284c7)', borderColor: 'rgba(2, 132, 199, 0.25)', title: 'Hạng 3 • Khá nên dùng' };
    case 4:
      return { badgeBg: 'rgba(59, 130, 246, 0.08)', textColor: '#2563eb', borderColor: 'rgba(59, 130, 246, 0.2)', title: 'Hạng 4 • Khá nên dùng' };
    case 5:
      return { badgeBg: 'var(--color-surface, #fff)', textColor: 'var(--color-text-muted, #64748b)', borderColor: 'var(--color-border, #e2e8f0)', title: 'Hạng 5 • Tạm dùng' };
    case 6:
      return { badgeBg: 'rgba(245, 158, 11, 0.08)', textColor: '#d97706', borderColor: 'rgba(245, 158, 11, 0.25)', title: 'Hạng 6 • Chẳng nên dùng' };
    case 7:
      return { badgeBg: 'rgba(249, 115, 22, 0.08)', textColor: '#ea580c', borderColor: 'rgba(249, 115, 22, 0.25)', title: 'Hạng 7 • Chẳng nên dùng' };
    case 8:
      return { badgeBg: 'rgba(239, 68, 68, 0.08)', textColor: '#dc2626', borderColor: 'rgba(239, 68, 68, 0.25)', title: 'Hạng 8 • Tránh dùng' };
    case 9:
      return { badgeBg: 'rgba(220, 38, 38, 0.12)', textColor: '#b91c1c', borderColor: 'rgba(220, 38, 38, 0.35)', title: 'Hạng 9 • Tuyệt đối tránh' };
    default:
      return { badgeBg: 'var(--color-surface, #fff)', textColor: 'var(--color-text, #334155)', borderColor: 'var(--color-border, #e2e8f0)', title: 'Bình hòa' };
  }
}

// ─── HERO BADGE UPDATES ───────────────────────────────────────────────

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

// ─── MAIN DAY SCORE MODAL (CHUYÊN BIỆT NỘI KHOA) ───────────────────────

export function openDayScoreModal(
  targetDate: Date = new Date(),
  activeTab: 'day' | 'tasks' | 'hours' | 'week' | 'finder' | 'profile' = 'day'
): void {
  const evalData = evaluateDayScore(targetDate);
  const weekData = getWeekEvaluation(new Date());
  const doc = evalData.docProfile;

  const currentYear = targetDate.getFullYear();
  const currentMonth = targetDate.getMonth() + 1;
  const monthData = getMonthEvaluation(currentYear, currentMonth, doc);
  const bestDiagnosisDays = findBestClinicalDays('diagnosis', 30, doc);

  const firstDayOfMonth = new Date(currentYear, currentMonth - 1, 1).getDay();
  const firstDayOffset = (firstDayOfMonth + 6) % 7;

  const existing = document.getElementById('dayScoreModalOverlay');
  if (existing) existing.remove();

  const truc = evalData.trucNgay;
  const tiet = evalData.tietKhiInfo;
  const than = evalData.thanSat;
  const sao = evalData.saoTu;
  const saoDangVien = evalData.saoTuDangVien;
  const diaChi = evalData.diaChiRelations;
  const quyNhan = evalData.quyNhanLoc;
  const napAmDay = evalData.napAmDay;
  const napAmDoc = evalData.napAmDoc;
  const napAmRel = evalData.napAmRelation;
  const medTasks = evalData.medicalTasks;
  const docSpec = SPECIALTY_METAS[doc.specialty || 'internal_general'] || SPECIALTY_METAS.internal_general;

  const modalHtml = `
    <div class="day-score-modal-overlay" id="dayScoreModalOverlay" style="position: fixed; inset: 0; background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px); z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 0.75rem;">
      <div class="day-score-modal-card animate-pop-in" style="background: var(--color-surface, #ffffff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 1rem; width: 100%; max-width: 920px; max-height: 92vh; overflow-y: auto; box-shadow: 0 20px 35px -10px rgba(0, 0, 0, 0.2); padding: 1.4rem; display: flex; flex-direction: column; font-family: inherit;">
        
        <!-- Header Thanh Lịch -->
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.85rem; border-bottom: 1px solid var(--color-border, #e2e8f0); padding-bottom: 0.75rem;">
          <div>
            <div style="display: flex; align-items: center; gap: 0.45rem;">
              <span style="font-size: 0.72rem; font-weight: 700; color: var(--color-primary, #0284c7); text-transform: uppercase; letter-spacing: 0.05em;">LÂM SÀNG NỘI KHOA • NHẬT HẠN & BÁT TỰ</span>
              <span style="font-size: 0.7rem; padding: 0.1rem 0.45rem; border-radius: 4px; background: rgba(2, 132, 199, 0.08); color: var(--color-primary, #0284c7); font-weight: 600;">EBM & Biorhythms</span>
            </div>
            <h3 style="font-size: 1.25rem; font-weight: 700; margin: 0.2rem 0 0 0; color: var(--color-text, #0f172a); display: flex; align-items: center; gap: 0.5rem;">
              <span>Chỉ Số Ngày Tốt & Định Hướng Lâm Sàng Nội Khoa</span>
            </h3>
          </div>
          <button id="closeDayScoreModal" style="background: none; border: none; font-size: 1.6rem; cursor: pointer; color: var(--color-text-muted, #64748b); line-height: 1; padding: 0.2rem;" title="Đóng">&times;</button>
        </div>

        <!-- Navigation Tabs (Tối Giản, 6 Tabs Ngắn Gọn) -->
        <div class="modal-tab-bar" style="display: flex; flex-wrap: wrap; gap: 0.35rem; margin-bottom: 1.15rem; border-bottom: 1px solid var(--color-border, #e2e8f0); padding-bottom: 0.45rem;">
          <button type="button" class="score-tab-btn" id="tabBtnDay" style="padding: 0.4rem 0.75rem; border-radius: 0.45rem; font-size: 0.8rem; font-weight: 600; border: none; cursor: pointer; background: ${activeTab === 'day' ? 'var(--color-primary, #0284c7)' : 'transparent'}; color: ${activeTab === 'day' ? '#fff' : 'var(--color-text-muted, #64748b)'};">
            🩺 Tổng Quan & Điểm Số
          </button>
          <button type="button" class="score-tab-btn" id="tabBtnTasks" style="padding: 0.4rem 0.75rem; border-radius: 0.45rem; font-size: 0.8rem; font-weight: 600; border: none; cursor: pointer; background: ${activeTab === 'tasks' ? 'var(--color-primary, #0284c7)' : 'transparent'}; color: ${activeTab === 'tasks' ? '#fff' : 'var(--color-text-muted, #64748b)'};">
            📋 Tác Vụ Nội Khoa
          </button>
          <button type="button" class="score-tab-btn" id="tabBtnHours" style="padding: 0.4rem 0.75rem; border-radius: 0.45rem; font-size: 0.8rem; font-weight: 600; border: none; cursor: pointer; background: ${activeTab === 'hours' ? 'var(--color-primary, #0284c7)' : 'transparent'}; color: ${activeTab === 'hours' ? '#fff' : 'var(--color-text-muted, #64748b)'};">
            ⏱️ 9 Bậc Giờ Khởi Sự
          </button>
          <button type="button" class="score-tab-btn" id="tabBtnWeek" style="padding: 0.4rem 0.75rem; border-radius: 0.45rem; font-size: 0.8rem; font-weight: 600; border: none; cursor: pointer; background: ${activeTab === 'week' ? 'var(--color-primary, #0284c7)' : 'transparent'}; color: ${activeTab === 'week' ? '#fff' : 'var(--color-text-muted, #64748b)'};">
            📈 7 Ngày & Lịch Tháng
          </button>
          <button type="button" class="score-tab-btn" id="tabBtnFinder" style="padding: 0.4rem 0.75rem; border-radius: 0.45rem; font-size: 0.8rem; font-weight: 600; border: none; cursor: pointer; background: ${activeTab === 'finder' ? 'var(--color-primary, #0284c7)' : 'transparent'}; color: ${activeTab === 'finder' ? '#fff' : 'var(--color-text-muted, #64748b)'};">
            🎯 Tìm Ngày Đẹp
          </button>
          <button type="button" class="score-tab-btn" id="tabBtnProfile" style="padding: 0.4rem 0.75rem; border-radius: 0.45rem; font-size: 0.8rem; font-weight: 600; border: none; cursor: pointer; background: ${activeTab === 'profile' ? 'var(--color-primary, #0284c7)' : 'transparent'}; color: ${activeTab === 'profile' ? '#fff' : 'var(--color-text-muted, #64748b)'}; margin-left: auto;">
            👤 Hồ Sơ Bác Sĩ
          </button>
        </div>

        <!-- ── TAB 1: TỔNG QUAN & ĐIỂM SỐ HÔM NAY ── -->
        <div id="tabContentDay" style="display: ${activeTab === 'day' ? 'flex' : 'none'}; flex-direction: column; gap: 1rem;">
          
          <!-- Summary Hero Banner Tối Giản -->
          <div style="display: flex; align-items: center; gap: 1.25rem; padding: 1.15rem; background: var(--color-surface-offset, #f8fafc); border-radius: 0.75rem; border: 1px solid var(--color-border, #e2e8f0);">
            
            <!-- Gauge tối giản -->
            <div style="position: relative; width: 84px; height: 84px; flex-shrink: 0; display: flex; align-items: center; justify-content: center;">
              <svg style="width: 100%; height: 100%; transform: rotate(-90deg);" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="var(--color-border, #e2e8f0)" stroke-width="6" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="var(--color-primary, #0284c7)" stroke-width="6" stroke-dasharray="251" stroke-dashoffset="${251 - (251 * evalData.total) / 100}" stroke-linecap="round" />
              </svg>
              <div style="position: absolute; text-align: center;">
                <span style="font-size: 1.45rem; font-weight: 800; color: var(--color-text, #0f172a);">${evalData.total}</span>
                <span style="font-size: 0.65rem; color: var(--color-text-muted, #64748b); display: block; margin-top: -3px;">/100</span>
              </div>
            </div>

            <div style="flex: 1;">
              <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.35rem; margin-bottom: 0.25rem;">
                <div style="display: flex; align-items: center; gap: 0.4rem; flex-wrap: wrap;">
                  <span style="font-size: 0.75rem; font-weight: 700; padding: 0.15rem 0.55rem; border-radius: 4px; background: rgba(2, 132, 199, 0.1); color: var(--color-primary, #0284c7); border: 1px solid rgba(2, 132, 199, 0.25);">
                    ${evalData.icon} ${evalData.rating}
                  </span>
                  <span style="font-size: 0.78rem; color: var(--color-text-muted, #64748b);">
                    Sao <strong>${sao.name}</strong> (${sao.type === 'cat' ? 'Cát' : 'Hung'}) • Trực <strong>${truc.name}</strong> (${truc.rating})
                  </span>
                </div>
                <div style="display: flex; gap: 0.35rem;">
                  <button type="button" id="btnExportICS" style="padding: 0.25rem 0.55rem; font-size: 0.75rem; font-weight: 600; border-radius: 0.35rem; border: 1px solid var(--color-border, #e2e8f0); background: var(--color-surface, #fff); color: var(--color-text, #0f172a); cursor: pointer;" title="Tải file .ics vào lịch">
                    📅 Xuất iCal
                  </button>
                  <button type="button" id="btnCopySummary" style="padding: 0.25rem 0.55rem; font-size: 0.75rem; font-weight: 600; border-radius: 0.35rem; border: 1px solid var(--color-border, #e2e8f0); background: var(--color-surface, #fff); color: var(--color-text, #0f172a); cursor: pointer;" title="Sao chép tóm tắt">
                    📋 Báo Cáo
                  </button>
                </div>
              </div>

              <h4 style="margin: 0.2rem 0; font-size: 1.1rem; font-weight: 700; color: var(--color-text, #0f172a);">
                ${evalData.formattedDate} — Ngày ${evalData.canChiDay} (Âm lịch: ${evalData.lunarDay}/${evalData.lunarMonth})
              </h4>
              <p style="margin: 0 0 0.4rem 0; font-size: 0.82rem; color: var(--color-text-muted, #64748b); line-height: 1.4;">${evalData.summaryText}</p>

              <!-- Chi Tiết Nạp Âm & Tương Quan Bản Mệnh -->
              <div style="display: flex; align-items: center; gap: 0.4rem; flex-wrap: wrap;">
                <span style="font-size: 0.72rem; padding: 0.15rem 0.45rem; border-radius: 4px; background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); color: var(--color-text, #0f172a);">
                  Nạp Âm Ngày: <strong>${napAmDay.name}</strong> (${napAmDay.element})
                </span>
                <span style="font-size: 0.72rem; padding: 0.15rem 0.45rem; border-radius: 4px; background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); color: var(--color-text, #0f172a);">
                  Nạp Âm BS: <strong>${napAmDoc.name}</strong> (${napAmDoc.element})
                </span>
                ${getNapAmRelationBadge(napAmRel.relationType, napAmRel.score, napAmRel.text.split(':')[0] || napAmRel.text)}
              </div>

              ${saoDangVien.isDangVien ? `
                <div style="margin-top: 0.4rem; padding: 0.25rem 0.55rem; border-radius: 4px; background: rgba(245, 158, 11, 0.08); border: 1px solid rgba(245, 158, 11, 0.3); color: #b45309; font-size: 0.75rem; font-weight: 600;">
                  👑 Sao Đăng Viên: ${saoDangVien.note}
                </div>
              ` : ''}

              <!-- Bác Sĩ & Chuyên Khoa Nội -->
              <div style="margin-top: 0.4rem; font-size: 0.75rem; color: var(--color-text-muted, #64748b); display: flex; flex-wrap: wrap; align-items: center; gap: 0.4rem;">
                <span>BS <strong>${doc.name || 'Bác sĩ'}</strong> (${doc.canNam} ${doc.chiNam} • Mệnh ${doc.hanhMenh})</span>
                <span style="padding: 0.1rem 0.45rem; border-radius: 4px; background: rgba(2, 132, 199, 0.08); color: var(--color-primary, #0284c7); font-weight: 600;">
                  ${docSpec.icon} ${docSpec.shortName}
                </span>
                ${quyNhan.thienAt.isMatch ? `<span style="color: #059669; font-weight: 600;">• Thiên Ất Quý Nhân</span>` : ''}
                ${quyNhan.locThan.isMatch ? `<span style="color: #d97706; font-weight: 600;">• Lộc Thần</span>` : ''}
                ${diaChi.tamHop.isMatch ? `<span style="color: #0284c7; font-weight: 600;">• Tam Hợp</span>` : ''}
              </div>
            </div>
          </div>

          <!-- 4 TRỤ CỘT KHUYẾN NGHỊ HÀNH ĐỘNG NỘI KHOA -->
          <div>
            <div style="font-size: 0.8rem; font-weight: 700; color: var(--color-text, #0f172a); margin-bottom: 0.45rem; text-transform: uppercase; letter-spacing: 0.04em;">
              4 Trụ Cột Kế Hoạch Lâm Sàng Nội Khoa Trong Ngày
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(205px, 1fr)); gap: 0.65rem;">
              
              <!-- 1. Chẩn đoán -->
              <div style="padding: 0.75rem; border-radius: 0.5rem; background: var(--color-surface-offset, #f8fafc); border: 1px solid var(--color-border, #e2e8f0);">
                <div style="font-size: 0.8rem; font-weight: 700; color: ${evalData.advice.diagnosis.status === 'good' ? '#059669' : (evalData.advice.diagnosis.status === 'caution' ? '#d97706' : 'var(--color-text, #0f172a)')}; margin-bottom: 0.2rem; display: flex; align-items: center; gap: 0.35rem;">
                  <span>🧠</span> <span>${evalData.advice.diagnosis.title}</span>
                </div>
                <p style="margin: 0; font-size: 0.75rem; color: var(--color-text-muted, #64748b); line-height: 1.4;">${evalData.advice.diagnosis.text}</p>
              </div>

              <!-- 2. Dược trị liệu -->
              <div style="padding: 0.75rem; border-radius: 0.5rem; background: var(--color-surface-offset, #f8fafc); border: 1px solid var(--color-border, #e2e8f0);">
                <div style="font-size: 0.8rem; font-weight: 700; color: ${evalData.advice.pharmacotherapy.status === 'good' ? '#059669' : (evalData.advice.pharmacotherapy.status === 'caution' ? '#d97706' : 'var(--color-text, #0f172a)')}; margin-bottom: 0.2rem; display: flex; align-items: center; gap: 0.35rem;">
                  <span>💊</span> <span>${evalData.advice.pharmacotherapy.title}</span>
                </div>
                <p style="margin: 0; font-size: 0.75rem; color: var(--color-text-muted, #64748b); line-height: 1.4;">${evalData.advice.pharmacotherapy.text}</p>
              </div>

              <!-- 3. Giao tiếp bệnh mạn -->
              <div style="padding: 0.75rem; border-radius: 0.5rem; background: var(--color-surface-offset, #f8fafc); border: 1px solid var(--color-border, #e2e8f0);">
                <div style="font-size: 0.8rem; font-weight: 700; color: ${evalData.advice.communication.status === 'good' ? '#059669' : (evalData.advice.communication.status === 'caution' ? '#d97706' : 'var(--color-text, #0f172a)')}; margin-bottom: 0.2rem; display: flex; align-items: center; gap: 0.35rem;">
                  <span>💬</span> <span>${evalData.advice.communication.title}</span>
                </div>
                <p style="margin: 0; font-size: 0.75rem; color: var(--color-text-muted, #64748b); line-height: 1.4;">${evalData.advice.communication.text}</p>
              </div>

              <!-- 4. Tra cứu EBM -->
              <div style="padding: 0.75rem; border-radius: 0.5rem; background: var(--color-surface-offset, #f8fafc); border: 1px solid var(--color-border, #e2e8f0);">
                <div style="font-size: 0.8rem; font-weight: 700; color: ${evalData.advice.evidence.status === 'good' ? '#059669' : 'var(--color-text, #0f172a)'}; margin-bottom: 0.2rem; display: flex; align-items: center; gap: 0.35rem;">
                  <span>📚</span> <span>${evalData.advice.evidence.title}</span>
                </div>
                <p style="margin: 0; font-size: 0.75rem; color: var(--color-text-muted, #64748b); line-height: 1.4;">${evalData.advice.evidence.text}</p>
              </div>

            </div>
          </div>

          <!-- NHỊP SINH HỌC BIORHYTHMS NỘI KHOA (ƯU TIÊN TRÍ TUỆ & TRỰC GIÁC) -->
          <div style="padding: 0.85rem; border-radius: 0.65rem; background: var(--color-surface-offset, #f8fafc); border: 1px solid var(--color-border, #e2e8f0);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
              <span style="font-size: 0.8rem; font-weight: 700; color: var(--color-text, #0f172a);">
                Chỉ Số Nhịp Sinh Học Bác Sĩ (${evalData.bio.daysLived} ngày tuổi • Trung bình ${evalData.bio.avgScore}%)
              </span>
              <span style="font-size: 0.72rem; color: var(--color-primary, #0284c7); font-weight: 600;">
                Ưu tiên Trí tuệ (${(docSpec.weights.intellectual * 100).toFixed(0)}%) & Trực giác (${(docSpec.weights.intuitive * 100).toFixed(0)}%)
              </span>
            </div>

            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.45rem; text-align: center;">
              <div style="padding: 0.45rem 0.3rem; background: var(--color-surface, #fff); border-radius: 0.35rem; border: 1px solid var(--color-border, #e2e8f0);">
                <div style="font-size: 0.68rem; color: var(--color-text-muted, #64748b);">Trí tuệ (33n)</div>
                <div style="font-size: 1.05rem; font-weight: 800; color: #8b5cf6;">${evalData.bio.intellectual}%</div>
              </div>
              <div style="padding: 0.45rem 0.3rem; background: var(--color-surface, #fff); border-radius: 0.35rem; border: 1px solid var(--color-border, #e2e8f0);">
                <div style="font-size: 0.68rem; color: var(--color-text-muted, #64748b);">Trực giác (38n)</div>
                <div style="font-size: 1.05rem; font-weight: 800; color: var(--color-primary, #0284c7);">${evalData.bio.intuitive}%</div>
              </div>
              <div style="padding: 0.45rem 0.3rem; background: var(--color-surface, #fff); border-radius: 0.35rem; border: 1px solid var(--color-border, #e2e8f0);">
                <div style="font-size: 0.68rem; color: var(--color-text-muted, #64748b);">Cảm xúc (28n)</div>
                <div style="font-size: 1.05rem; font-weight: 800; color: #059669;">${evalData.bio.emotional}%</div>
              </div>
              <div style="padding: 0.45rem 0.3rem; background: var(--color-surface, #fff); border-radius: 0.35rem; border: 1px solid var(--color-border, #e2e8f0);">
                <div style="font-size: 0.68rem; color: var(--color-text-muted, #64748b);">Thể lực (23n)</div>
                <div style="font-size: 1.05rem; font-weight: 800; color: #64748b;">${evalData.bio.physical}%</div>
              </div>
            </div>

            ${evalData.bio.clinicalTips.length > 0 ? `
              <div style="margin-top: 0.5rem; font-size: 0.74rem; color: var(--color-text, #0f172a); line-height: 1.45; border-top: 1px dashed var(--color-border, #e2e8f0); padding-top: 0.4rem;">
                ${evalData.bio.clinicalTips.map(tip => `<div style="margin-top: 0.2rem;">${tip}</div>`).join('')}
              </div>
            ` : ''}
          </div>

        </div>

        <!-- ── TAB 2: 5 TÁC VỤ LÂM SÀNG NỘI KHOA ── -->
        <div id="tabContentTasks" style="display: ${activeTab === 'tasks' ? 'flex' : 'none'}; flex-direction: column; gap: 0.85rem;">
          <div style="font-size: 0.8rem; color: var(--color-text-muted, #64748b);">
            Khảo sát 5 nghiệp vụ nội khoa trọng điểm theo ngày Can Chi & quy tắc y học cổ truyền kết hợp EBM:
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 0.65rem;">
            ${(Object.keys(medTasks) as Array<keyof typeof medTasks>).map(key => {
              const t = medTasks[key];
              const isGood = t.recommendation === 'rat_tot' || t.recommendation === 'tot';
              const isBad = t.recommendation === 'khong_nen';
              const badgeText = t.recommendation === 'rat_tot' ? 'Đại Cát' : (t.recommendation === 'tot' ? 'Cát Lành' : (isBad ? 'Thận Trọng' : 'Bình Hòa'));
              const badgeColor = isGood ? '#059669' : (isBad ? '#dc2626' : '#64748b');
              const badgeBg = isGood ? 'rgba(16, 185, 129, 0.1)' : (isBad ? 'rgba(239, 68, 68, 0.1)' : 'rgba(100, 116, 139, 0.08)');
              const border = t.isSpecialDay ? '#f59e0b' : (isGood ? 'rgba(16, 185, 129, 0.3)' : (isBad ? 'rgba(239, 68, 68, 0.3)' : 'var(--color-border, #e2e8f0)'));
              const reasons = [t.trucNote, t.saoNote, t.thanSatNote].filter(Boolean).join(' • ');

              return `
                <div style="padding: 0.85rem; border-radius: 0.6rem; background: var(--color-surface, #fff); border: 1px solid ${border}; display: flex; flex-direction: column; justify-content: space-between;">
                  <div>
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 0.4rem; margin-bottom: 0.3rem;">
                      <div>
                        <span style="font-size: 0.68rem; font-weight: 700; color: var(--color-primary, #0284c7);">VỤ ${t.task.vuNumber}</span>
                        <h5 style="margin: 0.1rem 0; font-size: 0.9rem; font-weight: 700; color: var(--color-text, #0f172a);">
                          ${t.task.shortTitle}
                        </h5>
                      </div>
                      <span style="font-size: 0.72rem; font-weight: 700; padding: 0.15rem 0.45rem; border-radius: 4px; background: ${badgeBg}; color: ${badgeColor}; white-space: nowrap;">
                        ${badgeText} (${t.totalScore >= 0 ? '+' : ''}${t.totalScore}đ)
                      </span>
                    </div>

                    ${t.isSpecialDay ? `
                      <div style="margin: 0.25rem 0; padding: 0.2rem 0.45rem; border-radius: 4px; background: rgba(245, 158, 11, 0.1); border: 1px solid #f59e0b; color: #b45309; font-size: 0.7rem; font-weight: 700;">
                        🌟 NGÀY TỐI THƯỢNG Y DƯỢC (${evalData.canChiDay})
                      </div>
                    ` : ''}

                    <p style="margin: 0.3rem 0; font-size: 0.75rem; color: var(--color-text-muted, #64748b); line-height: 1.4;">
                      ${reasons || t.task.description}
                    </p>
                  </div>

                  <div style="margin-top: 0.45rem; padding-top: 0.4rem; border-top: 1px dashed var(--color-border, #e2e8f0); font-size: 0.72rem; color: var(--color-text, #0f172a);">
                    💡 <strong>Lưu ý:</strong> ${t.task.specialNotes[0] || 'Thực hiện theo đúng phác đồ chuẩn.'}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- ── TAB 3: TIMELINE 12 KHUNG GIỜ & 9 BẬC KHỞI SỰ ── -->
        <div id="tabContentHours" style="display: ${activeTab === 'hours' ? 'flex' : 'none'}; flex-direction: column; gap: 0.85rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.4rem;">
            <span style="font-size: 0.82rem; font-weight: 700; color: var(--color-text, #0f172a);">
              Phân Hạng 9 Bậc Giờ Khởi Sự (Ngũ Thử Độn Can Giờ & Bát Tự Bác Sĩ)
            </span>
            <span style="font-size: 0.72rem; color: #059669; font-weight: 600;">
              🟢 Khung giờ phát sáng = Giờ hiện tại
            </span>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(135px, 1fr)); gap: 0.45rem;">
            ${evalData.gioRanks.map(g => {
              const timelineItem = evalData.gioTimeline.find(t => t.chi === g.chi);
              const isCurrent = timelineItem ? timelineItem.isCurrent : false;
              const visual = getGioRankVisual(g.rank);

              return `
                <div style="padding: 0.5rem 0.55rem; border-radius: 0.5rem; border: 1px solid ${isCurrent ? 'var(--color-primary, #0284c7)' : visual.borderColor}; background: ${isCurrent ? 'rgba(2, 132, 199, 0.08)' : (g.isHoangDao ? 'var(--color-surface-offset, #f8fafc)' : 'var(--color-surface, #fff)')}; ${isCurrent ? 'box-shadow: 0 0 0 1px var(--color-primary, #0284c7);' : ''} display: flex; flex-direction: column; justify-content: space-between;">
                  <div>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                      <span style="font-size: 0.8rem; font-weight: 700; color: var(--color-text, #0f172a);">${g.fullCanChi}</span>
                      <span style="font-size: 0.65rem; font-weight: 600; color: ${g.isHoangDao ? '#059669' : '#94a3b8'};">${g.isHoangDao ? 'Hoàng Đạo' : 'Hắc Đạo'}</span>
                    </div>
                    <div style="font-size: 0.7rem; color: var(--color-text-muted, #64748b);">${g.timeRange}</div>
                    <div style="font-size: 0.65rem; color: var(--color-text-muted, #64748b); margin-top: 0.15rem;">
                      ${g.napAm} (${g.napAmElement})
                    </div>
                  </div>

                  <div style="margin-top: 0.4rem;">
                    <div style="padding: 0.15rem 0.25rem; border-radius: 3px; background: ${visual.badgeBg}; border: 1px solid ${visual.borderColor}; color: ${visual.textColor}; font-size: 0.68rem; font-weight: 700; text-align: center; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${g.clinicalNote}">
                      ${visual.title}
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- ── TAB 4: DỰ BÁO 7 NGÀY & LỊCH THÁNG HEATMAP ── -->
        <div id="tabContentWeek" style="display: ${activeTab === 'week' ? 'flex' : 'none'}; flex-direction: column; gap: 1rem;">
          
          <!-- 7 Ngày Liên Tiếp -->
          <div>
            <div style="font-size: 0.82rem; font-weight: 700; color: var(--color-text, #0f172a); margin-bottom: 0.45rem;">
              Dự Báo Độ Thuận Lợi 7 Ngày Liên Tiếp (Click thẻ ngày để xem chi tiết)
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(110px, 1fr)); gap: 0.45rem;">
              ${weekData.map((item) => `
                <div class="week-forecast-card ${item.badgeClass}" 
                     data-date-str="${item.date.toISOString()}"
                     style="padding: 0.65rem 0.45rem; border-radius: 0.5rem; background: var(--color-surface-offset, #f8fafc); border: 1px solid ${item.isToday ? 'var(--color-primary, #0284c7)' : 'var(--color-border, #e2e8f0)'}; cursor: pointer; text-align: center; position: relative;">
                  
                  ${item.isToday ? `<span style="position: absolute; top: -6px; left: 4px; background: var(--color-primary, #0284c7); color: #fff; font-size: 0.58rem; font-weight: 700; padding: 0.05rem 0.3rem; border-radius: 4px;">Hôm nay</span>` : ''}
                  ${item.isBestDay ? `<span style="position: absolute; top: -6px; right: 4px; background: #f59e0b; color: #fff; font-size: 0.58rem; font-weight: 700; padding: 0.05rem 0.3rem; border-radius: 4px;">Tốt nhất</span>` : ''}

                  <div style="font-size: 0.72rem; font-weight: 600; color: var(--color-text-muted, #64748b); text-transform: uppercase;">${item.dayOfWeek}</div>
                  <div style="font-size: 0.9rem; font-weight: 700; color: var(--color-text, #0f172a);">${item.dateFormatted}</div>
                  <div style="font-size: 0.68rem; color: var(--color-text-muted, #64748b);">${item.lunarFormatted}</div>
                  
                  <div style="margin: 0.35rem 0 0.2rem 0; font-size: 1.15rem; font-weight: 800; color: var(--color-text, #0f172a);">
                    ${item.score}<span style="font-size: 0.62rem; color: var(--color-text-muted, #64748b); font-weight: normal;">/100</span>
                  </div>
                  
                  <div style="font-size: 0.7rem; font-weight: 600; color: var(--color-primary, #0284c7);">
                    ${item.icon} ${item.rating}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Lịch Tháng 30 Ngày Grid -->
          <div style="padding-top: 0.75rem; border-top: 1px solid var(--color-border, #e2e8f0);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.45rem;">
              <span style="font-size: 0.82rem; font-weight: 700; color: var(--color-text, #0f172a);">
                Lịch Tháng ${currentMonth}/${currentYear} (Chỉ số sẵn sàng Nội khoa)
              </span>
              <div style="display: flex; gap: 0.5rem; font-size: 0.7rem; color: var(--color-text-muted, #64748b);">
                <span>🟢 ≥82</span>
                <span>🔵 ≥65</span>
                <span>⚪ ≥45</span>
                <span>🟠 &lt;45</span>
              </div>
            </div>

            <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 0.3rem;">
              ${['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map(w => `
                <div style="font-size: 0.7rem; font-weight: 700; color: var(--color-text-muted, #64748b); text-align: center; padding: 0.15rem 0;">${w}</div>
              `).join('')}
              ${Array.from({ length: firstDayOffset }).map(() => `
                <div style="padding: 0.3rem; opacity: 0; pointer-events: none;" aria-hidden="true"></div>
              `).join('')}
              ${monthData.map(d => {
                const dayNum = d.dateObj.getDate();
                const isToday = d.dateObj.toDateString() === new Date().toDateString();
                const color = d.total >= 82 ? '#059669' : (d.total >= 65 ? 'var(--color-primary, #0284c7)' : (d.total >= 45 ? '#64748b' : '#d97706'));
                return `
                  <div class="week-forecast-card" 
                       data-date-str="${d.dateObj.toISOString()}"
                       style="padding: 0.35rem 0.2rem; border-radius: 0.35rem; background: var(--color-surface-offset, #f8fafc); border: 1px solid ${isToday ? 'var(--color-primary, #0284c7)' : 'var(--color-border, #e2e8f0)'}; cursor: pointer; text-align: center;">
                    <div style="font-size: 0.75rem; font-weight: 700; color: var(--color-text, #0f172a);">${dayNum}</div>
                    <div style="font-size: 0.65rem; font-weight: 700; color: ${color}; margin-top: 0.05rem;">
                      ${d.total}đ
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

        </div>

        <!-- ── TAB 5: BỘ TÌM NGÀY ĐẸP NỘI KHOA ── -->
        <div id="tabContentFinder" style="display: ${activeTab === 'finder' ? 'flex' : 'none'}; flex-direction: column; gap: 0.85rem;">
          <div>
            <div style="font-size: 0.82rem; font-weight: 700; color: var(--color-text, #0f172a); margin-bottom: 0.4rem;">
              Chọn Mục Đích Cần Tìm Ngày Thuận Lợi (Quét 30 Ngày Tới):
            </div>
            <div style="display: flex; flex-wrap: wrap; gap: 0.35rem;" id="purposeSelectorWrap">
              <button type="button" class="purpose-filter-btn active" data-purpose="diagnosis" style="padding: 0.35rem 0.7rem; font-size: 0.78rem; font-weight: 600; border-radius: 0.35rem; border: 1px solid var(--color-primary, #0284c7); background: var(--color-primary, #0284c7); color: #fff; cursor: pointer;">
                🧠 Chẩn Đoán Ca Khó
              </button>
              <button type="button" class="purpose-filter-btn" data-purpose="pharmacotherapy" style="padding: 0.35rem 0.7rem; font-size: 0.78rem; font-weight: 600; border-radius: 0.35rem; border: 1px solid var(--color-border, #e2e8f0); background: var(--color-surface, #fff); color: var(--color-text, #334155); cursor: pointer;">
                💊 Khởi Đầu Phác Đồ Mới
              </button>
              <button type="button" class="purpose-filter-btn" data-purpose="discharge" style="padding: 0.35rem 0.7rem; font-size: 0.78rem; font-weight: 600; border-radius: 0.35rem; border: 1px solid var(--color-border, #e2e8f0); background: var(--color-surface, #fff); color: var(--color-text, #334155); cursor: pointer;">
                📋 Xuất Viện & Xuống Thang
              </button>
              <button type="button" class="purpose-filter-btn" data-purpose="ebm" style="padding: 0.35rem 0.7rem; font-size: 0.78rem; font-weight: 600; border-radius: 0.35rem; border: 1px solid var(--color-border, #e2e8f0); background: var(--color-surface, #fff); color: var(--color-text, #334155); cursor: pointer;">
                🎓 Hội Chẩn & Báo Cáo EBM
              </button>
              <button type="button" class="purpose-filter-btn" data-purpose="clinic" style="padding: 0.35rem 0.7rem; font-size: 0.78rem; font-weight: 600; border-radius: 0.35rem; border: 1px solid var(--color-border, #e2e8f0); background: var(--color-surface, #fff); color: var(--color-text, #334155); cursor: pointer;">
                🏥 Khai Trương & Thăm Dò
              </button>
            </div>
          </div>

          <!-- Danh sách Top 5 Ngày Đẹp -->
          <div id="bestDaysContainer" style="display: flex; flex-direction: column; gap: 0.5rem;">
            ${bestDiagnosisDays.map((item) => `
              <div class="week-forecast-card" 
                   data-date-str="${item.evalData.dateObj.toISOString()}"
                   style="padding: 0.75rem 0.9rem; border-radius: 0.5rem; background: var(--color-surface-offset, #f8fafc); border: 1px solid var(--color-border, #e2e8f0); display: flex; align-items: center; justify-content: space-between; gap: 0.75rem; cursor: pointer;">
                <div style="display: flex; align-items: center; gap: 0.75rem;">
                  <span style="font-size: 1.25rem; font-weight: 800; color: ${item.rank === 1 ? '#f59e0b' : (item.rank === 2 ? '#64748b' : '#b45309')};">
                    #${item.rank}
                  </span>
                  <div>
                    <div style="display: flex; align-items: center; gap: 0.4rem; flex-wrap: wrap;">
                      <h4 style="margin: 0; font-size: 0.9rem; font-weight: 700; color: var(--color-text, #0f172a);">
                        ${item.evalData.formattedDate} — Ngày ${item.evalData.canChiDay}
                      </h4>
                      ${item.evalData.medicalTasks.kham_chandoan?.isSpecialDay ? `<span style="font-size: 0.65rem; font-weight: 700; background: rgba(245, 158, 11, 0.15); color: #b45309; padding: 0.05rem 0.35rem; border-radius: 3px;">Tối Thượng</span>` : ''}
                    </div>
                    <div style="font-size: 0.74rem; color: var(--color-text-muted, #64748b); margin-top: 0.15rem;">
                      ${item.matchReasons.join(' • ')}
                    </div>
                  </div>
                </div>
                <div style="text-align: right; flex-shrink: 0;">
                  <div style="font-size: 1.15rem; font-weight: 800; color: var(--color-text, #0f172a);">${item.evalData.total}đ</div>
                  <span style="font-size: 0.7rem; font-weight: 600; color: #059669;">${item.evalData.rating}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- ── TAB 6: HỒ SƠ BÁC SĨ NỘI KHOA ── -->
        <div id="tabContentProfile" style="display: ${activeTab === 'profile' ? 'flex' : 'none'}; flex-direction: column; gap: 0.85rem;">
          <div style="padding: 1rem; background: var(--color-surface-offset, #f8fafc); border: 1px solid var(--color-border, #e2e8f0); border-radius: 0.65rem;">
            <div style="font-size: 0.85rem; font-weight: 700; color: var(--color-text, #0f172a); margin-bottom: 0.6rem;">
              Cấu Hình Bát Tự & Phân Hệ Nội Khoa Của Bác Sĩ
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 0.6rem;">
              <div>
                <span style="font-size: 0.72rem; color: var(--color-text-muted, #64748b); font-weight: 600;">Họ tên:</span>
                <input type="text" id="inputDocName" value="${doc.name || 'Bác sĩ'}" style="width: 100%; padding: 0.35rem 0.5rem; font-size: 0.82rem; border: 1px solid var(--color-border, #e2e8f0); border-radius: 0.35rem; background: var(--color-surface, #fff); color: var(--color-text, #0f172a);">
              </div>
              <div>
                <span style="font-size: 0.72rem; color: var(--color-text-muted, #64748b); font-weight: 600;">Giới tính:</span>
                <select id="selectDocGender" style="width: 100%; padding: 0.35rem 0.5rem; font-size: 0.82rem; border: 1px solid var(--color-border, #e2e8f0); border-radius: 0.35rem; background: var(--color-surface, #fff); color: var(--color-text, #0f172a);">
                  <option value="Nam" ${doc.gender === 'Nam' ? 'selected' : ''}>Nam</option>
                  <option value="Nữ" ${doc.gender === 'Nữ' ? 'selected' : ''}>Nữ</option>
                </select>
              </div>
              <div>
                <span style="font-size: 0.72rem; color: var(--color-text-muted, #64748b); font-weight: 600;">Năm sinh:</span>
                <input type="number" id="inputDocYear" value="${doc.birthYear || 1990}" min="1930" max="2030" style="width: 100%; padding: 0.35rem 0.5rem; font-size: 0.82rem; border: 1px solid var(--color-border, #e2e8f0); border-radius: 0.35rem; background: var(--color-surface, #fff); color: var(--color-text, #0f172a);">
              </div>
              <div>
                <span style="font-size: 0.72rem; color: var(--color-text-muted, #64748b); font-weight: 600;">Tháng sinh:</span>
                <input type="number" id="inputDocMonth" value="${doc.birthMonth || 8}" min="1" max="12" style="width: 100%; padding: 0.35rem 0.5rem; font-size: 0.82rem; border: 1px solid var(--color-border, #e2e8f0); border-radius: 0.35rem; background: var(--color-surface, #fff); color: var(--color-text, #0f172a);">
              </div>
              <div>
                <span style="font-size: 0.72rem; color: var(--color-text-muted, #64748b); font-weight: 600;">Ngày sinh:</span>
                <input type="number" id="inputDocDay" value="${doc.birthDay || 15}" min="1" max="31" style="width: 100%; padding: 0.35rem 0.5rem; font-size: 0.82rem; border: 1px solid var(--color-border, #e2e8f0); border-radius: 0.35rem; background: var(--color-surface, #fff); color: var(--color-text, #0f172a);">
              </div>
              <div>
                <span style="font-size: 0.72rem; color: var(--color-text-muted, #64748b); font-weight: 600;">Bản mệnh:</span>
                <select id="selectDocHanhMenh" style="width: 100%; padding: 0.35rem 0.5rem; font-size: 0.82rem; border: 1px solid var(--color-border, #e2e8f0); border-radius: 0.35rem; background: var(--color-surface, #fff); color: var(--color-text, #0f172a);">
                  <option value="Kim" ${doc.hanhMenh === 'Kim' ? 'selected' : ''}>Mệnh Kim ⚙️</option>
                  <option value="Mộc" ${doc.hanhMenh === 'Mộc' ? 'selected' : ''}>Mệnh Mộc 🌿</option>
                  <option value="Thủy" ${doc.hanhMenh === 'Thủy' ? 'selected' : ''}>Mệnh Thủy 🌊</option>
                  <option value="Hỏa" ${doc.hanhMenh === 'Hỏa' ? 'selected' : ''}>Mệnh Hỏa 🔥</option>
                  <option value="Thổ" ${doc.hanhMenh === 'Thổ' ? 'selected' : ''}>Mệnh Thổ 🏔️</option>
                </select>
              </div>
              
              <!-- 6 Phân Hệ Nội Khoa -->
              <div style="grid-column: 1 / -1;">
                <span style="font-size: 0.72rem; color: var(--color-primary, #0284c7); font-weight: 700;">Chuyên khoa Lâm sàng (Tùy biến trọng số Biorhythms & Khuyến nghị):</span>
                <select id="selectDocSpecialty" style="width: 100%; padding: 0.45rem 0.5rem; font-size: 0.82rem; font-weight: 600; border: 1px solid var(--color-primary, #0284c7); border-radius: 0.35rem; background: var(--color-surface, #fff); color: var(--color-text, #0f172a);">
                  <option value="internal_general" ${(!doc.specialty || doc.specialty === 'internal_general') ? 'selected' : ''}>🩺 Nội Tổng Quát & Ca Bệnh Phức Tạp (Ưu tiên tư duy chẩn đoán nhiều tầng)</option>
                  <option value="internal_cardio" ${doc.specialty === 'internal_cardio' ? 'selected' : ''}>❤️ Nội Tim Mạch & Huyết Động Học (Ưu tiên ECG, POCUS & tứ trụ suy tim)</option>
                  <option value="internal_resp_icu" ${doc.specialty === 'internal_resp_icu' ? 'selected' : ''}>🫁 Nội Hô Hấp & Hồi Sức Nội Khoa (Ưu tiên ABG, thông khí & sốc nhiễm khuẩn)</option>
                  <option value="internal_gi_hepa" ${doc.specialty === 'internal_gi_hepa' ? 'selected' : ''}>🧪 Nội Tiêu Hóa & Gan Mật (Ưu tiên chức năng gan, Child-Pugh & xuất huyết)</option>
                  <option value="internal_endo_nephro" ${doc.specialty === 'internal_endo_nephro' ? 'selected' : ''}>🩸 Nội Tiết, Chuyển Hóa & Thận Học (Ưu tiên toan kiềm, insulin & eGFR/CrCl)</option>
                  <option value="internal_neuro_id" ${doc.specialty === 'internal_neuro_id' ? 'selected' : ''}>🧠 Nội Thần Kinh & Bệnh Truyền Nhiễm (Ưu tiên định vị tổn thương & kháng sinh)</option>
                </select>
              </div>
            </div>

            <div style="margin-top: 0.85rem; text-align: right;">
              <button type="button" id="btnSaveDocProfile" style="background: var(--color-primary, #0284c7); color: #fff; border: none; padding: 0.45rem 1.1rem; font-size: 0.82rem; font-weight: 600; border-radius: 0.35rem; cursor: pointer;">
                💾 Lưu Hồ Sơ & Cập Nhật Điểm Số
              </button>
            </div>
          </div>
        </div>

        <!-- Modal Footer Tối Giản -->
        <div style="margin-top: 1rem; padding-top: 0.65rem; border-top: 1px solid var(--color-border, #e2e8f0); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
          <span style="font-size: 0.72rem; color: var(--color-text-muted, #64748b);">
            Hệ thống hỗ trợ ra quyết định lâm sàng chuyên biệt Nội khoa • CliniPortal 2.0
          </span>
          <button id="btnCloseDayScoreModalBottom" style="background: var(--color-surface-offset, #f1f5f9); color: var(--color-text, #334155); border: 1px solid var(--color-border, #e2e8f0); padding: 0.4rem 1rem; border-radius: 0.35rem; cursor: pointer; font-size: 0.82rem; font-weight: 600;">
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
  const tabBtnTasks = document.getElementById('tabBtnTasks');
  const tabBtnHours = document.getElementById('tabBtnHours');
  const tabBtnWeek = document.getElementById('tabBtnWeek');
  const tabBtnFinder = document.getElementById('tabBtnFinder');
  const tabBtnProfile = document.getElementById('tabBtnProfile');

  const tabContentDay = document.getElementById('tabContentDay');
  const tabContentTasks = document.getElementById('tabContentTasks');
  const tabContentHours = document.getElementById('tabContentHours');
  const tabContentWeek = document.getElementById('tabContentWeek');
  const tabContentFinder = document.getElementById('tabContentFinder');
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

  btnExportICS?.addEventListener('click', () => downloadICSFile(evalData));
  btnCopySummary?.addEventListener('click', () => {
    copyDaySummaryText(evalData);
    if (btnCopySummary) {
      btnCopySummary.textContent = "✅ Đã Chép!";
      setTimeout(() => { btnCopySummary.textContent = "📋 Báo Cáo"; }, 2000);
    }
  });

  const switchTab = (tab: 'day' | 'tasks' | 'hours' | 'week' | 'finder' | 'profile') => {
    if (tabContentDay) tabContentDay.style.display = tab === 'day' ? 'flex' : 'none';
    if (tabContentTasks) tabContentTasks.style.display = tab === 'tasks' ? 'flex' : 'none';
    if (tabContentHours) tabContentHours.style.display = tab === 'hours' ? 'flex' : 'none';
    if (tabContentWeek) tabContentWeek.style.display = tab === 'week' ? 'flex' : 'none';
    if (tabContentFinder) tabContentFinder.style.display = tab === 'finder' ? 'flex' : 'none';
    if (tabContentProfile) tabContentProfile.style.display = tab === 'profile' ? 'flex' : 'none';

    const setBtnStyle = (btn: HTMLElement | null, isActive: boolean) => {
      if (!btn) return;
      btn.style.background = isActive ? 'var(--color-primary, #0284c7)' : 'transparent';
      btn.style.color = isActive ? '#fff' : 'var(--color-text-muted, #64748b)';
    };

    setBtnStyle(tabBtnDay, tab === 'day');
    setBtnStyle(tabBtnTasks, tab === 'tasks');
    setBtnStyle(tabBtnHours, tab === 'hours');
    setBtnStyle(tabBtnWeek, tab === 'week');
    setBtnStyle(tabBtnFinder, tab === 'finder');
    setBtnStyle(tabBtnProfile, tab === 'profile');
  };

  tabBtnDay?.addEventListener('click', () => switchTab('day'));
  tabBtnTasks?.addEventListener('click', () => switchTab('tasks'));
  tabBtnHours?.addEventListener('click', () => switchTab('hours'));
  tabBtnWeek?.addEventListener('click', () => switchTab('week'));
  tabBtnFinder?.addEventListener('click', () => switchTab('finder'));
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
          <div class="week-forecast-card" 
               data-date-str="${item.evalData.dateObj.toISOString()}"
               style="padding: 0.75rem 0.9rem; border-radius: 0.5rem; background: var(--color-surface-offset, #f8fafc); border: 1px solid var(--color-border, #e2e8f0); display: flex; align-items: center; justify-content: space-between; gap: 0.75rem; cursor: pointer;">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <span style="font-size: 1.25rem; font-weight: 800; color: ${item.rank === 1 ? '#f59e0b' : (item.rank === 2 ? '#64748b' : '#b45309')};">
                #${item.rank}
              </span>
              <div>
                <div style="display: flex; align-items: center; gap: 0.4rem; flex-wrap: wrap;">
                  <h4 style="margin: 0; font-size: 0.9rem; font-weight: 700; color: var(--color-text, #0f172a);">
                    ${item.evalData.formattedDate} — Ngày ${item.evalData.canChiDay}
                  </h4>
                </div>
                <div style="font-size: 0.74rem; color: var(--color-text-muted, #64748b); margin-top: 0.15rem;">
                  ${item.matchReasons.join(' • ')}
                </div>
              </div>
            </div>
            <div style="text-align: right; flex-shrink: 0;">
              <div style="font-size: 1.15rem; font-weight: 800; color: var(--color-text, #0f172a);">${item.evalData.total}đ</div>
              <span style="font-size: 0.7rem; font-weight: 600; color: #059669;">${item.evalData.rating}</span>
            </div>
          </div>
        `).join('');

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

  btnSaveProfile?.addEventListener('click', () => {
    const name = (document.getElementById('inputDocName') as HTMLInputElement)?.value.trim();
    const gender = (document.getElementById('selectDocGender') as HTMLSelectElement)?.value as any;
    const birthYear = parseInt((document.getElementById('inputDocYear') as HTMLInputElement)?.value, 10);
    const birthMonth = parseInt((document.getElementById('inputDocMonth') as HTMLInputElement)?.value, 10);
    const birthDay = parseInt((document.getElementById('inputDocDay') as HTMLInputElement)?.value, 10);
    const hanhMenh = (document.getElementById('selectDocHanhMenh') as HTMLSelectElement)?.value as any;
    const specialty = (document.getElementById('selectDocSpecialty') as HTMLSelectElement)?.value as any;

    saveDoctorProfile({ name, gender, birthYear, birthMonth, birthDay, hanhMenh, specialty });
    closeModal();
    updateDayScoreBadge();
    updateHeroEnergyBadge();
    openDayScoreModal(targetDate, 'day');
  });
}

// ─── MODAL NĂNG LƯỢNG TRỰC CA NỘI KHOA & CLINICAL PEARL ───────────────

export function openEnergyModal(): void {
  const now = new Date();
  const energy = calculateShiftEnergy(now);
  const pearl = getDailyClinicalPearl(now);

  const existing = document.getElementById('energyModalOverlay');
  if (existing) existing.remove();

  const modalHtml = `
    <div class="day-score-modal-overlay" id="energyModalOverlay" style="position: fixed; inset: 0; background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px); z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 1rem;">
      <div class="day-score-modal-card animate-pop-in" style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 1rem; width: 100%; max-width: 620px; max-height: 90vh; overflow-y: auto; box-shadow: 0 20px 30px -10px rgba(0, 0, 0, 0.2); padding: 1.4rem; display: flex; flex-direction: column; gap: 1rem;">
        
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--color-border, #e2e8f0); padding-bottom: 0.65rem;">
          <div>
            <span style="font-size: 0.72rem; font-weight: 700; color: #d97706; text-transform: uppercase; letter-spacing: 0.05em;">LÂM SÀNG NỘI TRÚ • CA TRỰC NỘI KHOA</span>
            <h3 style="font-size: 1.15rem; font-weight: 700; margin: 0.15rem 0 0 0; color: var(--color-text, #0f172a);">
              Mức Sẵn Sàng Lâm Sàng & Nhịp Sinh Học Circadian
            </h3>
          </div>
          <button id="closeEnergyModal" style="background: none; border: none; font-size: 1.6rem; cursor: pointer; color: var(--color-text-muted, #64748b); line-height: 1;" title="Đóng">&times;</button>
        </div>

        <div style="display: flex; align-items: center; gap: 1.1rem; padding: 1rem; background: var(--color-surface-offset, #f8fafc); border-radius: 0.75rem; border: 1px solid var(--color-border, #e2e8f0);">
          <div style="font-size: 2.4rem; text-align: center; line-height: 1;">
            ${energy.icon}
          </div>
          <div>
            <div style="display: flex; align-items: center; gap: 0.45rem;">
              <span style="font-size: 1.35rem; font-weight: 800; color: #d97706;">${energy.energyPercent}%</span>
              <span style="font-size: 0.78rem; font-weight: 700; padding: 0.1rem 0.5rem; border-radius: 4px; background: rgba(245, 158, 11, 0.12); color: #b45309;">${energy.statusText}</span>
            </div>
            <div style="font-size: 0.82rem; font-weight: 600; color: var(--color-text, #0f172a); margin-top: 0.15rem;">
              Pha sinh học: ${energy.circadianPhase}
            </div>
            <div style="font-size: 0.76rem; color: var(--color-text-muted, #64748b); margin-top: 0.1rem;">
              🎯 Khung giờ vàng tập trung: <strong>${energy.peakHours}</strong>
            </div>
          </div>
        </div>

        ${energy.fatigueWarning ? `
          <div style="padding: 0.65rem 0.85rem; border-radius: 0.5rem; background: rgba(239, 68, 68, 0.08); border: 1px solid rgba(239, 68, 68, 0.25); font-size: 0.78rem; color: #dc2626; display: flex; align-items: center; gap: 0.45rem;">
            <span>⚠️</span> <span>${energy.fatigueWarning}</span>
          </div>
        ` : ''}

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.65rem;">
          <div style="padding: 0.75rem; border-radius: 0.5rem; background: var(--color-surface-offset, #f8fafc); border: 1px solid var(--color-border, #e2e8f0);">
            <div style="font-size: 0.78rem; font-weight: 700; color: var(--color-text, #0f172a); margin-bottom: 0.25rem;">
              ☕ Khuyến Nghị Thể Lực:
            </div>
            <p style="margin: 0; font-size: 0.74rem; color: var(--color-text-muted, #64748b); line-height: 1.4;">${energy.caffeineTip}</p>
          </div>
          <div style="padding: 0.75rem; border-radius: 0.5rem; background: var(--color-surface-offset, #f8fafc); border: 1px solid var(--color-border, #e2e8f0);">
            <div style="font-size: 0.78rem; font-weight: 700; color: var(--color-text, #0f172a); margin-bottom: 0.25rem;">
              📋 Bảng Kiểm An Toàn Ca Trực:
            </div>
            <div style="font-size: 0.72rem; color: var(--color-text-muted, #64748b); line-height: 1.35;">
              ${energy.safetyChecklist.map(item => `<div>${item}</div>`).join('')}
            </div>
          </div>
        </div>

        <!-- Clinical Pearl Nội Khoa Chuẩn EBM -->
        <div style="padding: 0.85rem; border-radius: 0.65rem; background: rgba(2, 132, 199, 0.05); border: 1px solid rgba(2, 132, 199, 0.2);">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.25rem;">
            <span style="font-size: 0.7rem; font-weight: 700; color: var(--color-primary, #0284c7); text-transform: uppercase;">
              💡 CLINICAL PEARL NỘI KHOA [${pearl.topic}]
            </span>
            <span style="font-size: 0.68rem; color: var(--color-text-muted, #64748b);">EBM 2026</span>
          </div>
          <h4 style="margin: 0 0 0.2rem 0; font-size: 0.88rem; font-weight: 700; color: var(--color-text, #0f172a);">
            ${pearl.title}
          </h4>
          <p style="margin: 0; font-size: 0.78rem; color: var(--color-text, #334155); line-height: 1.45;">
            ${pearl.text}
          </p>
        </div>

        <div style="text-align: right; border-top: 1px solid var(--color-border, #e2e8f0); padding-top: 0.65rem;">
          <button id="btnCloseEnergyModalBottom" style="background: var(--color-surface-offset, #f1f5f9); color: var(--color-text, #334155); border: 1px solid var(--color-border, #e2e8f0); padding: 0.4rem 1rem; border-radius: 0.35rem; cursor: pointer; font-size: 0.82rem; font-weight: 600;">
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

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initGoodDayCalculator());
  } else {
    initGoodDayCalculator();
  }
}

if (typeof window !== 'undefined') {
  (window as any).GoodDayCalculator = {
    evaluateDayScore,
    getWeekEvaluation,
    findBestClinicalDays,
    getMonthEvaluation,
    downloadICSFile,
    copyDaySummaryText,
    calculateShiftEnergy,
    getDailyClinicalPearl,
    getDoctorProfile,
    saveDoctorProfile,
    updateDayScoreBadge,
    updateHeroEnergyBadge,
    openDayScoreModal,
    openEnergyModal,
    initGoodDayCalculator
  };
}
