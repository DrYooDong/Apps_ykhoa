/**
 * DocSpace — Chronic Disease & Outpatient Care Control Panel
 * Quản lý Bệnh nhân Mạn tính Ngoại trú · Vẽ Biểu đồ SVG Biến thiên Mục tiêu · Cảnh báo Tầm soát Biến chứng
 */

import {
  getAllChronicPatients,
  getChronicPatientById,
  saveChronicPatient,
  updateChronicPatient,
  deleteChronicPatient,
  addChronicEncounter,
  updateScreeningDates,
  getActiveProfile,
} from '../storage';
import {
  ChronicPatient,
  ChronicEncounterRecord,
  ChronicConditionKey,
  ComplicationScreeningDates,
} from '../types';
import { renderSidebar, renderDocSpaceHeader, escapeHtml, formatDate } from '../docspace-view';

// ─── Helpers: Tính toán Trạng thái Tầm soát Biến chứng ───────────────

interface ScreeningStatusItem {
  id: keyof ComplicationScreeningDates;
  label: string;
  icon: string;
  lastDate?: string;
  monthsSince: number | null;
  status: 'critical' | 'warning' | 'good' | 'not_set';
  statusText: string;
  recommendation: string;
}

function calculateScreeningStatuses(dates: ComplicationScreeningDates, diagnoses: ChronicConditionKey[]): ScreeningStatusItem[] {
  const items: ScreeningStatusItem[] = [];
  const nowMs = Date.now();

  const getMonths = (dateStr?: string): number | null => {
    if (!dateStr) return null;
    const diff = nowMs - new Date(dateStr).getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 30.4375));
  };

  // 1. Soi đáy mắt (Chỉ định cho ĐTĐ & THA)
  if (diagnoses.includes('t2d') || diagnoses.includes('htn')) {
    const m = getMonths(dates.retinopathyScreenedAt);
    let status: ScreeningStatusItem['status'] = 'not_set';
    let statusText = 'Chưa ghi nhận';
    if (m === null) {
      status = 'critical';
      statusText = 'Chưa từng làm';
    } else if (m > 12) {
      status = 'critical';
      statusText = `Quá hạn (${m} tháng trước)`;
    } else if (m >= 9) {
      status = 'warning';
      statusText = `Sắp đến hạn (${m} tháng trước)`;
    } else {
      status = 'good';
      statusText = `Đạt chuẩn (${m} tháng trước)`;
    }
    items.push({
      id: 'retinopathyScreenedAt',
      label: 'Soi đáy mắt (Võng mạc ĐTĐ/THA)',
      icon: 'fa-solid fa-eye',
      lastDate: dates.retinopathyScreenedAt,
      monthsSince: m,
      status,
      statusText,
      recommendation: 'Khuyến cáo soi đáy mắt mỗi 12 tháng theo ADA / Hội Nhãn khoa.',
    });
  }

  // 2. Microalbumin niệu / Tỷ số ACR (ĐTĐ & THA & CKD)
  if (diagnoses.includes('t2d') || diagnoses.includes('htn') || diagnoses.includes('ckd')) {
    const m = getMonths(dates.nephropathyScreenedAt);
    let status: ScreeningStatusItem['status'] = 'not_set';
    let statusText = 'Chưa ghi nhận';
    if (m === null) {
      status = 'critical';
      statusText = 'Chưa từng làm';
    } else if (m > 12) {
      status = 'critical';
      statusText = `Quá hạn (${m} tháng trước)`;
    } else if (m >= 9) {
      status = 'warning';
      statusText = `Sắp đến hạn (${m} tháng trước)`;
    } else {
      status = 'good';
      statusText = `Đạt chuẩn (${m} tháng trước)`;
    }
    items.push({
      id: 'nephropathyScreenedAt',
      label: 'Tỷ số Albumin/Creatinine niệu (ACR)',
      icon: 'fa-solid fa-flask-vial',
      lastDate: dates.nephropathyScreenedAt,
      monthsSince: m,
      status,
      statusText,
      recommendation: 'Khuyến cáo tầm soát tổn thương cầu thận mỗi 12 tháng theo KDIGO.',
    });
  }

  // 3. Khám bàn chân ĐTĐ (Monofilament + Mạch mu chân)
  if (diagnoses.includes('t2d')) {
    const m = getMonths(dates.diabeticFootScreenedAt);
    let status: ScreeningStatusItem['status'] = 'not_set';
    let statusText = 'Chưa ghi nhận';
    if (m === null) {
      status = 'warning';
      statusText = 'Chưa từng khám';
    } else if (m > 12) {
      status = 'critical';
      statusText = `Quá hạn (${m} tháng trước)`;
    } else if (m >= 6) {
      status = 'warning';
      statusText = `Cần khám lại (${m} tháng trước)`;
    } else {
      status = 'good';
      statusText = `Đạt chuẩn (${m} tháng trước)`;
    }
    items.push({
      id: 'diabeticFootScreenedAt',
      label: 'Khám bàn chân cảm giác ĐTĐ',
      icon: 'fa-solid fa-shoe-prints',
      lastDate: dates.diabeticFootScreenedAt,
      monthsSince: m,
      status,
      statusText,
      recommendation: 'Khám cảm giác Monofilament & bắt mạch mu chân định kỳ mỗi 6-12 tháng.',
    });
  }

  // 4. Siêu âm tim (Suy tim & THA lâu năm)
  if (diagnoses.includes('heart_failure') || diagnoses.includes('htn')) {
    const m = getMonths(dates.echocardiogramAt);
    let status: ScreeningStatusItem['status'] = 'not_set';
    let statusText = 'Chưa ghi nhận';
    if (m === null) {
      status = 'warning';
      statusText = 'Chưa ghi nhận';
    } else if (m > 12) {
      status = 'warning';
      statusText = `Đã ${m} tháng trước`;
    } else {
      status = 'good';
      statusText = `Đạt chuẩn (${m} tháng trước)`;
    }
    items.push({
      id: 'echocardiogramAt',
      label: 'Siêu âm tim (Đo EF & buồng tim)',
      icon: 'fa-solid fa-heart-pulse',
      lastDate: dates.echocardiogramAt,
      monthsSince: m,
      status,
      statusText,
      recommendation: 'Đánh giá chức năng tâm thu/tâm trương thất trái mỗi 12 tháng.',
    });
  }

  // 5. Điện tâm đồ (ECG)
  if (diagnoses.length > 0) {
    const m = getMonths(dates.ecgAt);
    items.push({
      id: 'ecgAt',
      label: 'Điện tâm đồ (ECG 12 chuyển đạo)',
      icon: 'fa-solid fa-wave-square',
      lastDate: dates.ecgAt,
      monthsSince: m,
      status: m === null ? 'warning' : m > 12 ? 'warning' : 'good',
      statusText: m === null ? 'Chưa ghi nhận' : `${m} tháng trước`,
      recommendation: 'Tầm soát dày thất trái, rối loạn nhịp tim và thiếu máu cơ tim mỗi 12 tháng.',
    });
  }

  return items;
}

// ─── SVG Pure Charts Generators ──────────────────────────────────────

function renderHba1cChartSvg(encounters: ChronicEncounterRecord[], target = 7.0): string {
  const data = encounters
    .filter(e => typeof e.hba1c === 'number' && !isNaN(e.hba1c))
    .map(e => ({ date: e.encounterDate, val: e.hba1c! }));

  if (data.length === 0) {
    return `<div class="dsp-empty-chart"><i class="fa-solid fa-chart-line"></i><span>Chưa có dữ liệu xét nghiệm HbA1c</span></div>`;
  }

  const w = 480;
  const h = 180;
  const padL = 45;
  const padR = 25;
  const padT = 25;
  const padB = 35;
  const innerW = w - padL - padR;
  const innerH = h - padT - padB;

  const minVal = Math.min(5.0, ...data.map(d => d.val), target - 0.5);
  const maxVal = Math.max(10.0, ...data.map(d => d.val), target + 1.5);

  const getX = (idx: number) => padL + (data.length === 1 ? innerW / 2 : (idx / (data.length - 1)) * innerW);
  const getY = (val: number) => padT + innerH - ((val - minVal) / (maxVal - minVal)) * innerH;

  const targetY = getY(target);

  const points = data.map((d, i) => `${getX(i)},${getY(d.val)}`).join(' ');

  return `
    <svg class="dsp-svg-chart" viewBox="0 0 ${w} ${h}" width="100%" height="${h}">
      <defs>
        <linearGradient id="hba1cGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#10b981" stop-opacity="0.35"/>
          <stop offset="100%" stop-color="#10b981" stop-opacity="0.0"/>
        </linearGradient>
      </defs>

      <!-- Target Reference Line (Mục tiêu HbA1c) -->
      <line x1="${padL}" y1="${targetY}" x2="${w - padR}" y2="${targetY}" stroke="#10b981" stroke-width="1.5" stroke-dasharray="4,4" />
      <text x="${w - padR + 2}" y="${targetY + 4}" fill="#10b981" font-size="10" font-weight="700">Mục tiêu: ${target}%</text>

      <!-- Grid Horizontal Lines -->
      <line x1="${padL}" y1="${getY(6)}" x2="${w - padR}" y2="${getY(6)}" stroke="rgba(148,163,184,0.15)" stroke-width="1" />
      <text x="${padL - 6}" y="${getY(6) + 3}" fill="var(--color-text-muted)" font-size="9" text-anchor="end">6%</text>

      <line x1="${padL}" y1="${getY(8)}" x2="${w - padR}" y2="${getY(8)}" stroke="rgba(148,163,184,0.15)" stroke-width="1" />
      <text x="${padL - 6}" y="${getY(8) + 3}" fill="var(--color-text-muted)" font-size="9" text-anchor="end">8%</text>

      <line x1="${padL}" y1="${getY(10)}" x2="${w - padR}" y2="${getY(10)}" stroke="rgba(148,163,184,0.15)" stroke-width="1" />
      <text x="${padL - 6}" y="${getY(10) + 3}" fill="var(--color-text-muted)" font-size="9" text-anchor="end">10%</text>

      <!-- Area fill (nếu có từ 2 điểm trở lên) -->
      ${data.length > 1 ? `
        <polygon points="${padL},${getY(minVal)} ${points} ${w - padR},${getY(minVal)}" fill="url(#hba1cGrad)" />
      ` : ''}

      <!-- Polyline -->
      <polyline fill="none" stroke="#0284c7" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" points="${points}" />

      <!-- Data Dots & Labels -->
      ${data.map((d, i) => {
        const cx = getX(i);
        const cy = getY(d.val);
        const color = d.val <= target ? '#10b981' : d.val <= 8.0 ? '#f59e0b' : '#ef4444';
        const dateShort = d.date.split('-').slice(1).join('/');
        return `
          <g class="dsp-chart-dot-group">
            <circle cx="${cx}" cy="${cy}" r="5" fill="${color}" stroke="#fff" stroke-width="2" />
            <text x="${cx}" y="${cy - 8}" fill="${color}" font-size="10" font-weight="800" text-anchor="middle">${d.val}%</text>
            <text x="${cx}" y="${h - 10}" fill="var(--color-text-muted)" font-size="9" text-anchor="middle">${dateShort}</text>
          </g>
        `;
      }).join('')}
    </svg>
  `;
}

function renderBloodPressureChartSvg(encounters: ChronicEncounterRecord[], targetSys = 130, targetDia = 80): string {
  const data = encounters
    .filter(e => typeof e.systolicBp === 'number' && typeof e.diastolicBp === 'number')
    .map(e => ({ date: e.encounterDate, sys: e.systolicBp!, dia: e.diastolicBp! }));

  if (data.length === 0) {
    return `<div class="dsp-empty-chart"><i class="fa-solid fa-heart-pulse"></i><span>Chưa có dữ liệu đo Huyết áp</span></div>`;
  }

  const w = 480;
  const h = 180;
  const padL = 45;
  const padR = 25;
  const padT = 25;
  const padB = 35;
  const innerW = w - padL - padR;
  const innerH = h - padT - padB;

  const minVal = 50;
  const maxVal = 190;

  const getX = (idx: number) => padL + (data.length === 1 ? innerW / 2 : (idx / (data.length - 1)) * innerW);
  const getY = (val: number) => padT + innerH - ((val - minVal) / (maxVal - minVal)) * innerH;

  const targetSysY = getY(targetSys);
  const targetDiaY = getY(targetDia);

  const sysPoints = data.map((d, i) => `${getX(i)},${getY(d.sys)}`).join(' ');
  const diaPoints = data.map((d, i) => `${getX(i)},${getY(d.dia)}`).join(' ');

  return `
    <svg class="dsp-svg-chart" viewBox="0 0 ${w} ${h}" width="100%" height="${h}">
      <!-- Target Reference Lines -->
      <line x1="${padL}" y1="${targetSysY}" x2="${w - padR}" y2="${targetSysY}" stroke="#ef4444" stroke-width="1.2" stroke-dasharray="3,3" opacity="0.6" />
      <text x="${padL + 4}" y="${targetSysY - 3}" fill="#ef4444" font-size="9" font-weight="700">Mục tiêu Tâm thu: < ${targetSys}</text>

      <line x1="${padL}" y1="${targetDiaY}" x2="${w - padR}" y2="${targetDiaY}" stroke="#0ea5e9" stroke-width="1.2" stroke-dasharray="3,3" opacity="0.6" />
      <text x="${padL + 4}" y="${targetDiaY - 3}" fill="#0ea5e9" font-size="9" font-weight="700">Mục tiêu Tâm trương: < ${targetDia}</text>

      <!-- Systolic line -->
      <polyline fill="none" stroke="#ef4444" stroke-width="2.5" stroke-linecap="round" points="${sysPoints}" />
      <!-- Diastolic line -->
      <polyline fill="none" stroke="#0ea5e9" stroke-width="2.5" stroke-linecap="round" points="${diaPoints}" />

      <!-- Dots -->
      ${data.map((d, i) => {
        const cx = getX(i);
        const sysY = getY(d.sys);
        const diaY = getY(d.dia);
        const dateShort = d.date.split('-').slice(1).join('/');
        return `
          <g>
            <circle cx="${cx}" cy="${sysY}" r="4" fill="#ef4444" stroke="#fff" stroke-width="1.5" />
            <text x="${cx}" y="${sysY - 6}" fill="#ef4444" font-size="9" font-weight="800" text-anchor="middle">${d.sys}</text>

            <circle cx="${cx}" cy="${diaY}" r="4" fill="#0ea5e9" stroke="#fff" stroke-width="1.5" />
            <text x="${cx}" y="${diaY + 12}" fill="#0ea5e9" font-size="9" font-weight="800" text-anchor="middle">${d.dia}</text>

            <text x="${cx}" y="${h - 10}" fill="var(--color-text-muted)" font-size="9" text-anchor="middle">${dateShort}</text>
          </g>
        `;
      }).join('')}
    </svg>
  `;
}

function renderEgfrChartSvg(encounters: ChronicEncounterRecord[]): string {
  const data = encounters
    .filter(e => typeof e.egfr === 'number' && !isNaN(e.egfr))
    .map(e => ({ date: e.encounterDate, val: e.egfr!, acr: e.urineAcr }));

  if (data.length === 0) {
    return `<div class="dsp-empty-chart"><i class="fa-solid fa-kidney"></i><span>Chưa có dữ liệu xét nghiệm eGFR</span></div>`;
  }

  const w = 480;
  const h = 180;
  const padL = 45;
  const padR = 25;
  const padT = 25;
  const padB = 35;
  const innerW = w - padL - padR;
  const innerH = h - padT - padB;

  const minVal = 20;
  const maxVal = 110;

  const getX = (idx: number) => padL + (data.length === 1 ? innerW / 2 : (idx / (data.length - 1)) * innerW);
  const getY = (val: number) => padT + innerH - ((val - minVal) / (maxVal - minVal)) * innerH;

  const threshold60 = getY(60);
  const threshold30 = getY(30);

  const points = data.map((d, i) => `${getX(i)},${getY(d.val)}`).join(' ');

  return `
    <svg class="dsp-svg-chart" viewBox="0 0 ${w} ${h}" width="100%" height="${h}">
      <!-- CKD Stage Thresholds -->
      <line x1="${padL}" y1="${threshold60}" x2="${w - padR}" y2="${threshold60}" stroke="#f59e0b" stroke-width="1" stroke-dasharray="3,3" />
      <text x="${w - padR + 2}" y="${threshold60 + 3}" fill="#f59e0b" font-size="8" font-weight="700">G3a (60)</text>

      <line x1="${padL}" y1="${threshold30}" x2="${w - padR}" y2="${threshold30}" stroke="#ef4444" stroke-width="1" stroke-dasharray="3,3" />
      <text x="${w - padR + 2}" y="${threshold30 + 3}" fill="#ef4444" font-size="8" font-weight="700">G4 (30)</text>

      <polyline fill="none" stroke="#8b5cf6" stroke-width="2.5" stroke-linecap="round" points="${points}" />

      ${data.map((d, i) => {
        const cx = getX(i);
        const cy = getY(d.val);
        const color = d.val >= 60 ? '#10b981' : d.val >= 45 ? '#f59e0b' : '#ef4444';
        const dateShort = d.date.split('-').slice(1).join('/');
        return `
          <g>
            <circle cx="${cx}" cy="${cy}" r="5" fill="${color}" stroke="#fff" stroke-width="1.5" />
            <text x="${cx}" y="${cy - 7}" fill="${color}" font-size="9" font-weight="800" text-anchor="middle">${d.val}</text>
            <text x="${cx}" y="${h - 10}" fill="var(--color-text-muted)" font-size="9" text-anchor="middle">${dateShort}</text>
          </g>
        `;
      }).join('')}
    </svg>
  `;
}

// ─── Main View Render Function ───────────────────────────────────────

export async function renderChronicCareView(profileId: string, selectedPatientId?: string): Promise<string> {
  const profile = getActiveProfile();
  if (!profile) return '';

  const patients = getAllChronicPatients(profileId);
  const activePatient = selectedPatientId
    ? patients.find(p => p.id === selectedPatientId) || patients[0]
    : patients[0];

  // Tính toán số liệu KPI phòng khám mạn tính
  let totalPatients = patients.length;
  let controlledHba1cCount = 0;
  let hba1cTestedCount = 0;
  let controlledBpCount = 0;
  let bpTestedCount = 0;
  let criticalScreeningCount = 0;

  patients.forEach(p => {
    const lastEnc = p.encounters[p.encounters.length - 1];
    if (lastEnc) {
      if (typeof lastEnc.hba1c === 'number') {
        hba1cTestedCount++;
        if (lastEnc.hba1c <= (p.targetGoals.targetHba1c || 7.0)) controlledHba1cCount++;
      }
      if (typeof lastEnc.systolicBp === 'number' && typeof lastEnc.diastolicBp === 'number') {
        bpTestedCount++;
        if (lastEnc.systolicBp <= (p.targetGoals.targetSystolicBp || 130) && lastEnc.diastolicBp <= (p.targetGoals.targetDiastolicBp || 80)) {
          controlledBpCount++;
        }
      }
    }
    const scrList = calculateScreeningStatuses(p.screeningDates, p.diagnoses);
    if (scrList.some(s => s.status === 'critical')) criticalScreeningCount++;
  });

  const hba1cRate = hba1cTestedCount > 0 ? Math.round((controlledHba1cCount / hba1cTestedCount) * 100) : 0;
  const bpRate = bpTestedCount > 0 ? Math.round((controlledBpCount / bpTestedCount) * 100) : 0;

  // Render Danh sách bệnh nhân
  const patientListHtml = patients.map(p => {
    const isActive = activePatient && p.id === activePatient.id;
    const lastEnc = p.encounters[p.encounters.length - 1];
    const scrList = calculateScreeningStatuses(p.screeningDates, p.diagnoses);
    const hasCritical = scrList.some(s => s.status === 'critical');

    return `
      <div class="dsp-chronic-patient-card${isActive ? ' dsp-chronic-patient-card--active' : ''}" data-patient-id="${p.id}">
        <div class="dsp-chronic-patient-header">
          <div>
            <div class="dsp-chronic-patient-name">${escapeHtml(p.fullName)}</div>
            <div class="dsp-chronic-patient-meta">
              <span>${p.age} tuổi</span> · <span>${p.gender === 'male' ? 'Nam' : 'Nữ'}</span> · <code>${escapeHtml(p.patientCode)}</code>
            </div>
          </div>
          ${hasCritical ? `
            <span class="dsp-badge dsp-badge--critical" title="Có biến chứng quá hạn tầm soát">
              <i class="fa-solid fa-triangle-exclamation"></i> Cảnh báo đỏ
            </span>
          ` : `
            <span class="dsp-badge dsp-badge--good">
              <i class="fa-solid fa-circle-check"></i> Ổn định
            </span>
          `}
        </div>

        <div class="dsp-chronic-patient-tags">
          ${p.diagnosesLabels.map(l => `<span class="dsp-condition-pill">${escapeHtml(l)}</span>`).join('')}
        </div>

        <div class="dsp-chronic-patient-stats">
          <div>
            <span class="dsp-mini-label">HbA1c gần nhất</span>
            <span class="dsp-mini-val ${lastEnc?.hba1c ? (lastEnc.hba1c <= (p.targetGoals.targetHba1c || 7.0) ? 'dsp-text-success' : 'dsp-text-danger') : ''}">
              ${lastEnc?.hba1c ? `${lastEnc.hba1c}%` : '—'}
            </span>
          </div>
          <div>
            <span class="dsp-mini-label">Huyết áp</span>
            <span class="dsp-mini-val">
              ${lastEnc?.systolicBp ? `${lastEnc.systolicBp}/${lastEnc.diastolicBp}` : '—'}
            </span>
          </div>
          <div>
            <span class="dsp-mini-label">eGFR</span>
            <span class="dsp-mini-val">
              ${lastEnc?.egfr ? `${lastEnc.egfr}` : '—'}
            </span>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Render Bệnh nhân chi tiết đang chọn
  let patientDetailHtml = '';
  if (activePatient) {
    const screeningItems = calculateScreeningStatuses(activePatient.screeningDates, activePatient.diagnoses);
    const lastEnc = activePatient.encounters[activePatient.encounters.length - 1];

    patientDetailHtml = `
      <div class="dsp-chronic-detail-wrap">
        
        <!-- Header Bệnh nhân -->
        <div class="dsp-card dsp-chronic-hero-card">
          <div class="dsp-chronic-hero-top">
            <div>
              <div style="display:flex; align-items:center; gap:0.75rem; flex-wrap:wrap;">
                <h2 class="dsp-chronic-hero-name">${escapeHtml(activePatient.fullName)}</h2>
                <span class="dsp-badge dsp-badge--info">${escapeHtml(activePatient.patientCode)}</span>
                <span class="dsp-badge">${activePatient.age} tuổi · ${activePatient.gender === 'male' ? 'Nam' : 'Nữ'}</span>
              </div>
              <div class="dsp-chronic-hero-sub" style="margin-top:0.35rem;">
                <i class="fa-solid fa-phone" style="font-size:0.75rem;"></i> ${escapeHtml(activePatient.phoneNumber || 'Chưa có SĐT')} &nbsp;·&nbsp;
                <i class="fa-solid fa-calendar-check" style="font-size:0.75rem;"></i> ${activePatient.encounters.length} lần khám định kỳ
              </div>
            </div>
            <div class="dsp-chronic-hero-actions">
              <button class="dsp-btn dsp-btn-primary dsp-btn-sm" id="btnCreateSoapFromChronic" data-patient-id="${activePatient.id}" style="background:linear-gradient(135deg, #0284c7, #2563eb); font-weight:700;">
                <i class="fa-solid fa-notes-medical"></i> ⚡ Tạo SOAP Từ Ca Này
              </button>
              <button class="dsp-btn dsp-btn-ghost dsp-btn-sm" id="btnCreateSbarFromChronic" data-patient-id="${activePatient.id}" title="Tạo tóm tắt SBAR để hội chẩn hoặc bàn giao">
                <i class="fa-solid fa-file-waveform" style="color:var(--dsp-sky);"></i> Tạo SBAR
              </button>
              <button class="dsp-btn dsp-btn-primary dsp-btn-sm" id="btnOpenAddEncounterModal" data-patient-id="${activePatient.id}">
                <i class="fa-solid fa-plus"></i> Lần khám mới
              </button>
              <button class="dsp-btn dsp-btn-ghost dsp-btn-sm" id="btnOpenScreeningModal" data-patient-id="${activePatient.id}">
                <i class="fa-solid fa-calendar-days"></i> Tầm soát
              </button>
            </div>
          </div>

          <!-- Nhãn Bệnh Mạn Tính & Mục tiêu Cá thể hóa -->
          <div class="dsp-chronic-targets-bar">
            <div class="dsp-target-item">
              <span class="dsp-target-label"><i class="fa-solid fa-bullseye" style="color:var(--dsp-sky);"></i> Mục tiêu HbA1c:</span>
              <span class="dsp-target-val">< ${activePatient.targetGoals.targetHba1c || 7.0}%</span>
            </div>
            <div class="dsp-target-item">
              <span class="dsp-target-label"><i class="fa-solid fa-bullseye" style="color:#ef4444;"></i> Mục tiêu Huyết áp:</span>
              <span class="dsp-target-val">< ${activePatient.targetGoals.targetSystolicBp || 130}/${activePatient.targetGoals.targetDiastolicBp || 80} mmHg</span>
            </div>
            <div class="dsp-target-item">
              <span class="dsp-target-label"><i class="fa-solid fa-bullseye" style="color:#10b981;"></i> Mục tiêu LDL-C:</span>
              <span class="dsp-target-val">< ${activePatient.targetGoals.targetLdlC || 1.8} mmol/L</span>
            </div>
          </div>
        </div>

        <!-- CẢNH BÁO TẦM SOÁT BIẾN CHỨNG ĐỊNH KỲ (Quality & Screening Guardian) -->
        <div class="dsp-card dsp-screening-guardian-card">
          <div class="dsp-card-header" style="border-bottom: 1px solid var(--dsp-glass-border); padding-bottom: 0.75rem;">
            <div style="display:flex; align-items:center; gap:0.5rem;">
              <span class="dsp-stat-icon" style="width:28px; height:28px; font-size:0.85rem; background:linear-gradient(135deg, #ef4444, #f59e0b); color:#fff; border-radius:6px;">
                <i class="fa-solid fa-shield-heart"></i>
              </span>
              <h3 class="dsp-card-title" style="font-size:1rem; margin:0;">Bảng kiểm Tầm soát Biến chứng Định kỳ (Complication Screening)</h3>
            </div>
            <span class="dsp-badge" style="background:rgba(255,255,255,0.06); font-size:0.75rem;">Chuẩn ADA / KDIGO / ESC</span>
          </div>

          <div class="dsp-screening-grid">
            ${screeningItems.map(item => `
              <div class="dsp-screening-card dsp-screening-card--${item.status}">
                <div class="dsp-screening-top">
                  <div class="dsp-screening-title">
                    <i class="${item.icon}"></i>
                    <span>${item.label}</span>
                  </div>
                  <span class="dsp-screening-badge dsp-screening-badge--${item.status}">
                    ${item.statusText}
                  </span>
                </div>
                <p class="dsp-screening-rec">${item.recommendation}</p>
                <div class="dsp-screening-footer">
                  <span>Lần cuối: <strong>${item.lastDate ? formatDate(item.lastDate) : 'Chưa có'}</strong></span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 4 ĐỒ THỊ SVG THUẦN BIẾN THIÊN MỤC TIÊU -->
        <div class="dsp-charts-grid">
          <!-- Chart 1: HbA1c -->
          <div class="dsp-card dsp-chart-box">
            <div class="dsp-chart-header">
              <div class="dsp-chart-title">
                <i class="fa-solid fa-chart-line" style="color:#0284c7;"></i>
                <span>Đường cong HbA1c qua các lần khám</span>
              </div>
              <span class="dsp-badge dsp-badge--info">Mục tiêu: < ${activePatient.targetGoals.targetHba1c || 7.0}%</span>
            </div>
            <div class="dsp-chart-body">
              ${renderHba1cChartSvg(activePatient.encounters, activePatient.targetGoals.targetHba1c || 7.0)}
            </div>
          </div>

          <!-- Chart 2: Huyết áp -->
          <div class="dsp-card dsp-chart-box">
            <div class="dsp-chart-header">
              <div class="dsp-chart-title">
                <i class="fa-solid fa-heart-pulse" style="color:#ef4444;"></i>
                <span>Đường cong Huyết áp (Tâm thu / Tâm trương)</span>
              </div>
              <span class="dsp-badge dsp-badge--danger">Mục tiêu: < 130/80</span>
            </div>
            <div class="dsp-chart-body">
              ${renderBloodPressureChartSvg(activePatient.encounters, activePatient.targetGoals.targetSystolicBp || 130, activePatient.targetGoals.targetDiastolicBp || 80)}
            </div>
          </div>

          <!-- Chart 3: Chức năng thận eGFR -->
          <div class="dsp-card dsp-chart-box">
            <div class="dsp-chart-header">
              <div class="dsp-chart-title">
                <i class="fa-solid fa-kidney" style="color:#8b5cf6;"></i>
                <span>Độ lọc cầu thận eGFR (mL/phút/1.73m²)</span>
              </div>
              <span class="dsp-badge" style="background:rgba(139,92,246,0.15); color:#8b5cf6;">Bảo tồn chức năng thận</span>
            </div>
            <div class="dsp-chart-body">
              ${renderEgfrChartSvg(activePatient.encounters)}
            </div>
          </div>

          <!-- Card 4: Tóm tắt Đơn thuốc mạn & Tuân thủ điều trị -->
          <div class="dsp-card dsp-chart-box">
            <div class="dsp-chart-header">
              <div class="dsp-chart-title">
                <i class="fa-solid fa-pills" style="color:#ec4899;"></i>
                <span>Phác đồ Đang dùng & Mức độ Tuân thủ</span>
              </div>
              <span class="dsp-badge ${lastEnc?.adherenceLevel === 'good' ? 'dsp-badge--good' : 'dsp-badge--warning'}">
                Tuân thủ: ${lastEnc?.adherenceLevel === 'good' ? 'Rất tốt' : lastEnc?.adherenceLevel === 'moderate' ? 'Trung bình' : 'Kém'}
              </span>
            </div>
            <div class="dsp-med-body" style="padding:1rem; font-size:0.85rem; line-height:1.6;">
              <div style="margin-bottom:0.75rem;">
                <div style="font-weight:700; color:var(--color-text); margin-bottom:0.25rem;">
                  <i class="fa-solid fa-prescription"></i> Toa thuốc hiện hành:
                </div>
                <div style="background:var(--color-surface); padding:0.65rem 0.85rem; border-radius:8px; border:1px solid var(--color-border); font-family:monospace; font-size:0.82rem;">
                  ${escapeHtml(lastEnc?.currentMedications || 'Chưa ghi nhận thuốc')}
                </div>
              </div>
              <div>
                <div style="font-weight:700; color:var(--color-text); margin-bottom:0.25rem;">
                  <i class="fa-solid fa-user-doctor"></i> Lưu ý & Kế hoạch bác sĩ:
                </div>
                <p style="color:var(--color-text-muted); margin:0;">
                  ${escapeHtml(lastEnc?.clinicalNotes || 'Không có ghi chú đặc biệt.')}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- CẨM NANG & PHÁC ĐỒ THEO DÕI TỪ KNOWLEDGE VAULT -->
        <div class="dsp-card" style="margin-top:1.25rem; background:linear-gradient(135deg, rgba(2,132,199,0.03), rgba(139,92,246,0.03)); border:1px solid rgba(2,132,199,0.2);">
          <div class="dsp-card-header" style="border-bottom:1px solid var(--color-border); padding-bottom:0.75rem; display:flex; justify-content:space-between; align-items:center;">
            <div style="display:flex; align-items:center; gap:0.5rem;">
              <span class="dsp-stat-icon" style="width:28px; height:28px; font-size:0.85rem; background:linear-gradient(135deg, #0284c7, #8b5cf6); color:#fff; border-radius:6px;">
                <i class="fa-solid fa-graduation-cap"></i>
              </span>
              <h3 class="dsp-card-title" style="font-size:1rem; margin:0;">Tài Liệu &amp; Phác Đồ Hỗ Trợ Từ Knowledge Vault</h3>
            </div>
            <a href="../knowledge-vault/index.html" target="_blank" style="font-size:11px; color:var(--color-primary); text-decoration:none; font-weight:700; display:flex; align-items:center; gap:4px;">
              Mở Hub Vault (2.250+ bài) <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </a>
          </div>

          <div style="padding:1rem 0 0.5rem; display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:0.85rem;">
            <!-- Dinh dưỡng mạn tính -->
            <div style="background:var(--color-surface); border:1px solid var(--color-border); border-radius:8px; padding:10px 14px;">
              <div style="font-weight:700; font-size:12px; color:#10b981; margin-bottom:6px; display:flex; align-items:center; gap:5px;">
                <i class="fa-solid fa-utensils"></i> Dinh Dưỡng &amp; Tiết Chế
              </div>
              <div style="display:flex; flex-direction:column; gap:4px; font-size:11.5px;">
                <a href="../knowledge-vault/index.html?search=DASH" target="_blank" style="color:var(--color-text); text-decoration:none; display:flex; align-items:center; justify-content:space-between;">
                  <span>• Chế độ ăn DASH hạ huyết áp</span> <i class="fa-solid fa-chevron-right" style="font-size:9px; color:var(--color-text-muted);"></i>
                </a>
                <a href="../knowledge-vault/index.html?search=Địa Trung Hải" target="_blank" style="color:var(--color-text); text-decoration:none; display:flex; align-items:center; justify-content:space-between;">
                  <span>• Chế độ ăn Địa Trung Hải tim mạch</span> <i class="fa-solid fa-chevron-right" style="font-size:9px; color:var(--color-text-muted);"></i>
                </a>
                <a href="../knowledge-vault/index.html?search=thận mạn" target="_blank" style="color:var(--color-text); text-decoration:none; display:flex; align-items:center; justify-content:space-between;">
                  <span>• Tiết chế đạm trong bệnh thận mạn</span> <i class="fa-solid fa-chevron-right" style="font-size:9px; color:var(--color-text-muted);"></i>
                </a>
              </div>
            </div>

            <!-- Biến chứng cần tầm soát -->
            <div style="background:var(--color-surface); border:1px solid var(--color-border); border-radius:8px; padding:10px 14px;">
              <div style="font-weight:700; font-size:12px; color:#ef4444; margin-bottom:6px; display:flex; align-items:center; gap:5px;">
                <i class="fa-solid fa-triangle-exclamation"></i> Cảnh Báo Biến Chứng
              </div>
              <div style="display:flex; flex-direction:column; gap:4px; font-size:11.5px;">
                <a href="../knowledge-vault/index.html?search=Đái tháo đường" target="_blank" style="color:var(--color-text); text-decoration:none; display:flex; align-items:center; justify-content:space-between;">
                  <span>• Biến chứng vi mạch &amp; bàn chân ĐTĐ</span> <i class="fa-solid fa-chevron-right" style="font-size:9px; color:var(--color-text-muted);"></i>
                </a>
                <a href="../knowledge-vault/index.html?search=Tăng huyết áp" target="_blank" style="color:var(--color-text); text-decoration:none; display:flex; align-items:center; justify-content:space-between;">
                  <span>• Tổn thương cơ quan đích do THA</span> <i class="fa-solid fa-chevron-right" style="font-size:9px; color:var(--color-text-muted);"></i>
                </a>
                <a href="../knowledge-vault/index.html?search=Bệnh thận mạn" target="_blank" style="color:var(--color-text); text-decoration:none; display:flex; align-items:center; justify-content:space-between;">
                  <span>• Tiến triển suy thận giai đoạn cuối</span> <i class="fa-solid fa-chevron-right" style="font-size:9px; color:var(--color-text-muted);"></i>
                </a>
              </div>
            </div>

            <!-- Phác đồ bậc thang & Thuốc -->
            <div style="background:var(--color-surface); border:1px solid var(--color-border); border-radius:8px; padding:10px 14px;">
              <div style="font-weight:700; font-size:12px; color:#0284c7; margin-bottom:6px; display:flex; align-items:center; gap:5px;">
                <i class="fa-solid fa-pills"></i> Phác Đồ Thuốc Chuẩn Hóa
              </div>
              <div style="display:flex; flex-direction:column; gap:4px; font-size:11.5px;">
                <a href="../knowledge-vault/index.html?search=Đái tháo đường" target="_blank" style="color:var(--color-text); text-decoration:none; display:flex; align-items:center; justify-content:space-between;">
                  <span>• Phác đồ SGLT2i + Metformin + GLP-1RA</span> <i class="fa-solid fa-chevron-right" style="font-size:9px; color:var(--color-text-muted);"></i>
                </a>
                <a href="../knowledge-vault/index.html?search=Tăng huyết áp" target="_blank" style="color:var(--color-text); text-decoration:none; display:flex; align-items:center; justify-content:space-between;">
                  <span>• Phác đồ phối hợp đôi viên phối hợp (SPC)</span> <i class="fa-solid fa-chevron-right" style="font-size:9px; color:var(--color-text-muted);"></i>
                </a>
                <a href="../knowledge-vault/index.html?search=Statin" target="_blank" style="color:var(--color-text); text-decoration:none; display:flex; align-items:center; justify-content:space-between;">
                  <span>• Điều trị rối loạn lipid cường độ cao</span> <i class="fa-solid fa-chevron-right" style="font-size:9px; color:var(--color-text-muted);"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- LỊCH SỬ CÁC LẦN KHÁM (Encounter Timeline Table) -->
        <div class="dsp-card" style="margin-top:1.25rem;">
          <div class="dsp-card-header">
            <h3 class="dsp-card-title"><i class="fa-solid fa-clock-rotate-left"></i> Lịch sử Lần khám Định kỳ (${activePatient.encounters.length})</h3>
          </div>
          <div style="overflow-x:auto;">
            <table class="dsp-table" style="width:100%; border-collapse:collapse; font-size:0.82rem;">
              <thead>
                <tr style="background:rgba(255,255,255,0.03); border-bottom:1px solid var(--color-border); text-align:left;">
                  <th style="padding:0.75rem 1rem;">Ngày khám</th>
                  <th style="padding:0.75rem 1rem;">Huyết áp</th>
                  <th style="padding:0.75rem 1rem;">HbA1c</th>
                  <th style="padding:0.75rem 1rem;">Đường huyết đói</th>
                  <th style="padding:0.75rem 1rem;">eGFR / ACR</th>
                  <th style="padding:0.75rem 1rem;">LDL-C</th>
                  <th style="padding:0.75rem 1rem;">Tuân thủ</th>
                  <th style="padding:0.75rem 1rem;">Tái khám</th>
                </tr>
              </thead>
              <tbody>
                ${activePatient.encounters.slice().reverse().map(enc => `
                  <tr style="border-bottom:1px solid var(--color-border);">
                    <td style="padding:0.75rem 1rem; font-weight:700;">${formatDate(enc.encounterDate)}</td>
                    <td style="padding:0.75rem 1rem;">${enc.systolicBp ? `${enc.systolicBp}/${enc.diastolicBp} mmHg` : '—'}</td>
                    <td style="padding:0.75rem 1rem; font-weight:800; color:${enc.hba1c ? (enc.hba1c <= (activePatient.targetGoals.targetHba1c || 7.0) ? '#10b981' : '#ef4444') : 'inherit'};">
                      ${enc.hba1c ? `${enc.hba1c}%` : '—'}
                    </td>
                    <td style="padding:0.75rem 1rem;">${enc.fastingGlucose ? `${enc.fastingGlucose} mmol/L` : '—'}</td>
                    <td style="padding:0.75rem 1rem;">
                      ${enc.egfr ? `${enc.egfr} mL/p` : '—'} ${enc.urineAcr ? `· ACR: ${enc.urineAcr}` : ''}
                    </td>
                    <td style="padding:0.75rem 1rem;">${enc.ldlC ? `${enc.ldlC} mmol/L` : '—'}</td>
                    <td style="padding:0.75rem 1rem;">
                      <span class="dsp-badge ${enc.adherenceLevel === 'good' ? 'dsp-badge--good' : 'dsp-badge--warning'}" style="font-size:0.7rem;">
                        ${enc.adherenceLevel === 'good' ? 'Tốt' : enc.adherenceLevel === 'moderate' ? 'TB' : 'Kém'}
                      </span>
                    </td>
                    <td style="padding:0.75rem 1rem; color:var(--color-primary); font-weight:600;">
                      ${enc.nextAppointmentDate ? formatDate(enc.nextAppointmentDate) : '—'}
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    `;
  } else {
    patientDetailHtml = `
      <div class="dsp-empty-state" style="padding:4rem 2rem;">
        <i class="fa-solid fa-heart-pulse"></i>
        <p>Chưa có bệnh nhân mạn tính nào. Bấm "Thêm Bệnh nhân Mới" để bắt đầu theo dõi.</p>
      </div>
    `;
  }

  return `
    <div class="dsp-layout" id="dspLayout">
      ${renderSidebar(profile, 'chronic-care')}
      <main class="dsp-main" id="dspMain">
        ${renderDocSpaceHeader(profile, 'chronic-care')}
        <div class="dsp-page-content">

          <!-- Page Header & Action -->
          <div class="dsp-page-header" style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:1rem; margin-bottom:1.25rem;">
            <div>
              <div style="display:flex; align-items:center; gap:0.5rem;">
                <h1 class="dsp-page-title" style="margin:0;"><i class="fa-solid fa-heart-pulse" style="color:#ef4444;"></i> Quản Lý Bệnh Mạn Tính &amp; Ngoại Trú</h1>
                <span class="dsp-badge dsp-badge--info">Outpatient Control Panel</span>
              </div>
              <p class="dsp-page-subtitle" style="margin:0.25rem 0 0 0;">
                Theo dõi diễn tiến biến thiên mục tiêu (HbA1c, Huyết áp, eGFR) và tự động cảnh báo tầm soát biến chứng định kỳ.
              </p>
            </div>
            <button class="dsp-btn dsp-btn-primary" id="btnOpenNewPatientModal" style="font-weight:700;">
              <i class="fa-solid fa-user-plus"></i> Thêm Bệnh Nhân Mạn Tính Mới
            </button>
          </div>

          <!-- KPI Summary Bar -->
          <div class="dsp-chronic-kpi-grid">
            <div class="dsp-chronic-kpi-card">
              <div class="dsp-chronic-kpi-icon" style="background:rgba(2,132,199,0.15); color:#0284c7;">
                <i class="fa-solid fa-users"></i>
              </div>
              <div>
                <div class="dsp-chronic-kpi-val">${totalPatients}</div>
                <div class="dsp-chronic-kpi-label">Tổng số Bệnh nhân Quản lý</div>
              </div>
            </div>

            <div class="dsp-chronic-kpi-card">
              <div class="dsp-chronic-kpi-icon" style="background:rgba(16,185,129,0.15); color:#10b981;">
                <i class="fa-solid fa-chart-line"></i>
              </div>
              <div>
                <div class="dsp-chronic-kpi-val">${hba1cRate}%</div>
                <div class="dsp-chronic-kpi-label">Tỷ lệ Đạt Mục tiêu HbA1c (< 7%)</div>
              </div>
            </div>

            <div class="dsp-chronic-kpi-card">
              <div class="dsp-chronic-kpi-icon" style="background:rgba(245,158,11,0.15); color:#f59e0b;">
                <i class="fa-solid fa-heart-pulse"></i>
              </div>
              <div>
                <div class="dsp-chronic-kpi-val">${bpRate}%</div>
                <div class="dsp-chronic-kpi-label">Tỷ lệ Kiểm soát HA (< 130/80)</div>
              </div>
            </div>

            <div class="dsp-chronic-kpi-card">
              <div class="dsp-chronic-kpi-icon" style="background:rgba(239,68,68,0.15); color:#ef4444;">
                <i class="fa-solid fa-triangle-exclamation"></i>
              </div>
              <div>
                <div class="dsp-chronic-kpi-val" style="color:#ef4444;">${criticalScreeningCount}</div>
                <div class="dsp-chronic-kpi-label">BN có Tầm soát Quá hạn (> 12th)</div>
              </div>
            </div>
          </div>

          <!-- Main Two-Column Layout (Left: Patient List | Right: Patient Canvas) -->
          <div class="dsp-chronic-two-col">
            <!-- Left: Patient Sidebar -->
            <div class="dsp-chronic-col-list">
              <div class="dsp-card" style="padding:0.75rem;">
                <div style="margin-bottom:0.75rem;">
                  <input type="search" id="dspChronicSearchInput" class="dsp-input" placeholder="🔍 Tìm tên, mã BN, bệnh..." style="font-size:0.82rem;" />
                </div>
                <div class="dsp-chronic-list-scroll" id="dspChronicListContainer">
                  ${patientListHtml}
                </div>
              </div>
            </div>

            <!-- Right: Patient Detail -->
            <div class="dsp-chronic-col-canvas" id="dspChronicCanvasContainer">
              ${patientDetailHtml}
            </div>
          </div>

        </div>
      </main>
    </div>

    <!-- MODAL: Thêm Lần Khám Định Kỳ Mới -->
    <div class="dsp-modal" id="dspEncounterModal" style="display:none;">
      <div class="dsp-modal-backdrop" id="dspEncounterModalBackdrop"></div>
      <div class="dsp-modal-box dsp-modal-box--md">
        <div class="dsp-modal-header">
          <h2 class="dsp-modal-title"><i class="fa-solid fa-calendar-plus"></i> Ghi nhận Lần khám Định kỳ Mới</h2>
          <button class="dsp-icon-btn" id="btnCloseEncounterModal"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <form id="dspEncounterForm" style="padding:1.25rem;" novalidate>
          <input type="hidden" id="encPatientId" value="${activePatient?.id || ''}" />
          
          <div class="dsp-form-row dsp-form-row--2">
            <div class="dsp-form-group">
              <label class="dsp-label" for="encDate">Ngày khám <span class="dsp-required">*</span></label>
              <input type="date" id="encDate" class="dsp-input" value="${new Date().toISOString().split('T')[0]}" required />
            </div>
            <div class="dsp-form-group">
              <label class="dsp-label" for="encNextDate">Hẹn ngày tái khám</label>
              <input type="date" id="encNextDate" class="dsp-input" />
            </div>
          </div>

          <div class="dsp-form-row dsp-form-row--3">
            <div class="dsp-form-group">
              <label class="dsp-label" for="encSysBp">Huyết áp Tâm thu (mmHg)</label>
              <input type="number" id="encSysBp" class="dsp-input" placeholder="VD: 130" min="50" max="260" />
            </div>
            <div class="dsp-form-group">
              <label class="dsp-label" for="encDiaBp">Huyết áp Tâm trương (mmHg)</label>
              <input type="number" id="encDiaBp" class="dsp-input" placeholder="VD: 80" min="30" max="150" />
            </div>
            <div class="dsp-form-group">
              <label class="dsp-label" for="encHeartRate">Nhịp tim (l/p)</label>
              <input type="number" id="encHeartRate" class="dsp-input" placeholder="VD: 75" min="30" max="220" />
            </div>
          </div>

          <div class="dsp-form-row dsp-form-row--3">
            <div class="dsp-form-group">
              <label class="dsp-label" for="encHba1c">HbA1c (%)</label>
              <input type="number" id="encHba1c" class="dsp-input" placeholder="VD: 6.8" step="0.1" min="3" max="20" />
            </div>
            <div class="dsp-form-group">
              <label class="dsp-label" for="encGlucose">Đường huyết đói (mmol/L)</label>
              <input type="number" id="encGlucose" class="dsp-input" placeholder="VD: 6.5" step="0.1" />
            </div>
            <div class="dsp-form-group">
              <label class="dsp-label" for="encEgfr">eGFR (mL/p/1.73m²)</label>
              <input type="number" id="encEgfr" class="dsp-input" placeholder="VD: 65" step="1" />
            </div>
          </div>

          <div class="dsp-form-row dsp-form-row--3">
            <div class="dsp-form-group">
              <label class="dsp-label" for="encLdl">LDL-C (mmol/L)</label>
              <input type="number" id="encLdl" class="dsp-input" placeholder="VD: 1.8" step="0.1" />
            </div>
            <div class="dsp-form-group">
              <label class="dsp-label" for="encAcr">Tỷ số ACR niệu (mg/g)</label>
              <input type="number" id="encAcr" class="dsp-input" placeholder="VD: 30" step="1" />
            </div>
            <div class="dsp-form-group">
              <label class="dsp-label" for="encWeight">Cân nặng (kg)</label>
              <input type="number" id="encWeight" class="dsp-input" placeholder="VD: 68" step="0.5" />
            </div>
          </div>

          <div class="dsp-form-group">
            <label class="dsp-label" for="encMeds">Toa thuốc duy trì</label>
            <input type="text" id="encMeds" class="dsp-input" placeholder="VD: Metformin 850mg x 2, Telmisartan 40mg x 1, Empagliflozin 10mg x 1" />
          </div>

          <div class="dsp-form-row dsp-form-row--2">
            <div class="dsp-form-group">
              <label class="dsp-label" for="encAdherence">Mức độ tuân thủ dùng thuốc</label>
              <select id="encAdherence" class="dsp-input">
                <option value="good">Tốt (Uống đều đặn đúng giờ)</option>
                <option value="moderate">Trung bình (Thỉnh thoảng quên liều)</option>
                <option value="poor">Kém (Tự ý ngưng/giảm liều)</option>
              </select>
            </div>
            <div class="dsp-form-group">
              <label class="dsp-label" for="encNotes">Ghi chú lâm sàng & Dặn dò</label>
              <input type="text" id="encNotes" class="dsp-input" placeholder="VD: Ăn nhạt, tập thể dục 30p/ngày..." />
            </div>
          </div>

          <div class="dsp-form-actions" style="margin-top:1.25rem;">
            <button type="button" class="dsp-btn dsp-btn-ghost" id="btnCancelEncounter">Hủy</button>
            <button type="submit" class="dsp-btn dsp-btn-primary" id="btnSaveEncounter"><i class="fa-solid fa-floppy-disk"></i> Lưu Lần Khám</button>
          </div>
        </form>
      </div>
    </div>

    <!-- MODAL: Cập nhật Ngày Tầm Soát Biến Chứng -->
    <div class="dsp-modal" id="dspScreeningModal" style="display:none;">
      <div class="dsp-modal-backdrop" id="dspScreeningModalBackdrop"></div>
      <div class="dsp-modal-box dsp-modal-box--sm">
        <div class="dsp-modal-header">
          <h2 class="dsp-modal-title"><i class="fa-solid fa-calendar-check"></i> Cập nhật Ngày Tầm Soát Biến Chứng</h2>
          <button class="dsp-icon-btn" id="btnCloseScreeningModal"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <form id="dspScreeningForm" style="padding:1.25rem;" novalidate>
          <input type="hidden" id="scrPatientId" value="${activePatient?.id || ''}" />
          
          <div class="dsp-form-group">
            <label class="dsp-label" for="scrRetinopathy"><i class="fa-solid fa-eye"></i> Ngày Soi đáy mắt gần nhất</label>
            <input type="date" id="scrRetinopathy" class="dsp-input" value="${activePatient?.screeningDates?.retinopathyScreenedAt || ''}" />
          </div>

          <div class="dsp-form-group">
            <label class="dsp-label" for="scrNephropathy"><i class="fa-solid fa-flask-vial"></i> Ngày Xét nghiệm Microalbumin niệu (ACR)</label>
            <input type="date" id="scrNephropathy" class="dsp-input" value="${activePatient?.screeningDates?.nephropathyScreenedAt || ''}" />
          </div>

          <div class="dsp-form-group">
            <label class="dsp-label" for="scrFoot"><i class="fa-solid fa-shoe-prints"></i> Ngày Khám bàn chân ĐTĐ</label>
            <input type="date" id="scrFoot" class="dsp-input" value="${activePatient?.screeningDates?.diabeticFootScreenedAt || ''}" />
          </div>

          <div class="dsp-form-group">
            <label class="dsp-label" for="scrEcho"><i class="fa-solid fa-heart-pulse"></i> Ngày Siêu âm Tim</label>
            <input type="date" id="scrEcho" class="dsp-input" value="${activePatient?.screeningDates?.echocardiogramAt || ''}" />
          </div>

          <div class="dsp-form-group">
            <label class="dsp-label" for="scrEcg"><i class="fa-solid fa-wave-square"></i> Ngày Đo Điện tâm đồ (ECG)</label>
            <input type="date" id="scrEcg" class="dsp-input" value="${activePatient?.screeningDates?.ecgAt || ''}" />
          </div>

          <div class="dsp-form-actions" style="margin-top:1.25rem;">
            <button type="button" class="dsp-btn dsp-btn-ghost" id="btnCancelScreening">Hủy</button>
            <button type="submit" class="dsp-btn dsp-btn-primary" id="btnSaveScreening"><i class="fa-solid fa-floppy-disk"></i> Lưu Ngày Tầm Soát</button>
          </div>
        </form>
      </div>
    </div>

    <!-- MODAL: Thêm Bệnh Nhân Mạn Tính Mới -->
    <div class="dsp-modal" id="dspNewPatientModal" style="display:none;">
      <div class="dsp-modal-backdrop" id="dspNewPatientModalBackdrop"></div>
      <div class="dsp-modal-box dsp-modal-box--md">
        <div class="dsp-modal-header">
          <h2 class="dsp-modal-title"><i class="fa-solid fa-user-plus"></i> Thêm Hồ Sơ Bệnh Nhân Mạn Tính Mới</h2>
          <button class="dsp-icon-btn" id="btnCloseNewPatientModal"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <form id="dspNewPatientForm" style="padding:1.25rem;" novalidate>
          <div class="dsp-form-row dsp-form-row--3">
            <div class="dsp-form-group" style="grid-column: 1 / 3;">
              <label class="dsp-label" for="newFullName">Họ và tên bệnh nhân <span class="dsp-required">*</span></label>
              <input type="text" id="newFullName" class="dsp-input" placeholder="VD: Nguyễn Văn An" required />
            </div>
            <div class="dsp-form-group">
              <label class="dsp-label" for="newAge">Tuổi <span class="dsp-required">*</span></label>
              <input type="number" id="newAge" class="dsp-input" placeholder="VD: 55" min="1" max="120" required />
            </div>
          </div>

          <div class="dsp-form-row dsp-form-row--3">
            <div class="dsp-form-group">
              <label class="dsp-label" for="newGender">Giới tính</label>
              <select id="newGender" class="dsp-input">
                <option value="male">Nam</option>
                <option value="female">Nữ</option>
                <option value="other">Khác</option>
              </select>
            </div>
            <div class="dsp-form-group">
              <label class="dsp-label" for="newPhone">Số điện thoại</label>
              <input type="tel" id="newPhone" class="dsp-input" placeholder="VD: 0912345678" />
            </div>
            <div class="dsp-form-group">
              <label class="dsp-label" for="newPatientCode">Mã hồ sơ</label>
              <input type="text" id="newPatientCode" class="dsp-input" placeholder="Tự sinh nếu để trống" />
            </div>
          </div>

          <div class="dsp-form-group">
            <label class="dsp-label">Các bệnh mạn tính mắc kèm <span class="dsp-required">*</span></label>
            <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap:0.5rem; margin-top:0.25rem;">
              <label style="display:flex; align-items:center; gap:0.4rem; font-size:0.85rem; cursor:pointer;">
                <input type="checkbox" name="chronicDiagnoses" value="t2d" checked /> Đái tháo đường T2
              </label>
              <label style="display:flex; align-items:center; gap:0.4rem; font-size:0.85rem; cursor:pointer;">
                <input type="checkbox" name="chronicDiagnoses" value="htn" checked /> Tăng huyết áp
              </label>
              <label style="display:flex; align-items:center; gap:0.4rem; font-size:0.85rem; cursor:pointer;">
                <input type="checkbox" name="chronicDiagnoses" value="ckd" /> Bệnh thận mạn (CKD)
              </label>
              <label style="display:flex; align-items:center; gap:0.4rem; font-size:0.85rem; cursor:pointer;">
                <input type="checkbox" name="chronicDiagnoses" value="dyslipidemia" checked /> Rối loạn Lipid máu
              </label>
              <label style="display:flex; align-items:center; gap:0.4rem; font-size:0.85rem; cursor:pointer;">
                <input type="checkbox" name="chronicDiagnoses" value="heart_failure" /> Suy tim
              </label>
            </div>
          </div>

          <div class="dsp-form-row dsp-form-row--3">
            <div class="dsp-form-group">
              <label class="dsp-label" for="newTargetHba1c">Mục tiêu HbA1c (%)</label>
              <input type="number" id="newTargetHba1c" class="dsp-input" value="7.0" step="0.1" />
            </div>
            <div class="dsp-form-group">
              <label class="dsp-label" for="newTargetSysBp">Mục tiêu Huyết áp (mmHg)</label>
              <input type="number" id="newTargetSysBp" class="dsp-input" value="130" step="5" />
            </div>
            <div class="dsp-form-group">
              <label class="dsp-label" for="newTargetLdl">Mục tiêu LDL-C (mmol/L)</label>
              <input type="number" id="newTargetLdl" class="dsp-input" value="1.8" step="0.1" />
            </div>
          </div>

          <div class="dsp-form-actions" style="margin-top:1.25rem;">
            <button type="button" class="dsp-btn dsp-btn-ghost" id="btnCancelNewPatient">Hủy</button>
            <button type="submit" class="dsp-btn dsp-btn-primary" id="btnSaveNewPatient"><i class="fa-solid fa-user-check"></i> Tạo Hồ Sơ Bệnh Nhân</button>
          </div>
        </form>
      </div>
    </div>
  `;
}

// ─── Controller & Event Listeners ────────────────────────────────────

export function mountChronicCareController(profileId: string): void {
  // 1. Chuyển đổi bệnh nhân đang chọn khi click vào danh sách bên trái
  document.querySelectorAll('.dsp-chronic-patient-card').forEach(card => {
    card.addEventListener('click', () => {
      const pId = card.getAttribute('data-patient-id');
      if (pId) {
        window.location.hash = `#/docspace/chronic-care?patient=${pId}`;
      }
    });
  });

  // 2. Tìm kiếm bệnh nhân
  const searchInput = document.getElementById('dspChronicSearchInput') as HTMLInputElement;
  searchInput?.addEventListener('input', () => {
    const q = searchInput.value.toLowerCase().trim();
    document.querySelectorAll('.dsp-chronic-patient-card').forEach(card => {
      const txt = card.textContent?.toLowerCase() || '';
      (card as HTMLElement).style.display = txt.includes(q) ? 'block' : 'none';
    });
  });

  // 3. Modal Thêm Lần khám
  const encModal = document.getElementById('dspEncounterModal') as HTMLElement;
  const btnOpenEnc = document.getElementById('btnOpenAddEncounterModal');
  const btnCloseEnc = document.getElementById('btnCloseEncounterModal');
  const btnCancelEnc = document.getElementById('btnCancelEncounter');
  const encForm = document.getElementById('dspEncounterForm') as HTMLFormElement;

  btnOpenEnc?.addEventListener('click', () => {
    if (encModal) encModal.style.display = 'flex';
  });
  btnCloseEnc?.addEventListener('click', () => {
    if (encModal) encModal.style.display = 'none';
  });
  btnCancelEnc?.addEventListener('click', () => {
    if (encModal) encModal.style.display = 'none';
  });

  encForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const patientId = (document.getElementById('encPatientId') as HTMLInputElement).value;
    const date = (document.getElementById('encDate') as HTMLInputElement).value;
    if (!patientId || !date) return;

    const sysBp = parseFloat((document.getElementById('encSysBp') as HTMLInputElement).value) || undefined;
    const diaBp = parseFloat((document.getElementById('encDiaBp') as HTMLInputElement).value) || undefined;
    const heartRate = parseFloat((document.getElementById('encHeartRate') as HTMLInputElement).value) || undefined;
    const hba1c = parseFloat((document.getElementById('encHba1c') as HTMLInputElement).value) || undefined;
    const fastingGlucose = parseFloat((document.getElementById('encGlucose') as HTMLInputElement).value) || undefined;
    const egfr = parseFloat((document.getElementById('encEgfr') as HTMLInputElement).value) || undefined;
    const ldlC = parseFloat((document.getElementById('encLdl') as HTMLInputElement).value) || undefined;
    const urineAcr = parseFloat((document.getElementById('encAcr') as HTMLInputElement).value) || undefined;
    const weightKg = parseFloat((document.getElementById('encWeight') as HTMLInputElement).value) || undefined;
    const currentMedications = (document.getElementById('encMeds') as HTMLInputElement).value.trim();
    const adherenceLevel = (document.getElementById('encAdherence') as HTMLSelectElement).value as any;
    const clinicalNotes = (document.getElementById('encNotes') as HTMLInputElement).value.trim();
    const nextAppointmentDate = (document.getElementById('encNextDate') as HTMLInputElement).value || undefined;

    addChronicEncounter(profileId, patientId, {
      encounterDate: date,
      systolicBp: sysBp,
      diastolicBp: diaBp,
      heartRate,
      hba1c,
      fastingGlucose,
      egfr,
      ldlC,
      urineAcr,
      weightKg,
      currentMedications,
      adherenceLevel: adherenceLevel || 'good',
      clinicalNotes,
      nextAppointmentDate,
    });

    if (encModal) encModal.style.display = 'none';
    window.location.hash = `#/docspace/chronic-care?patient=${patientId}&t=${Date.now()}`;
  });

  // 4. Modal Cập nhật Ngày Tầm soát Biến chứng
  const scrModal = document.getElementById('dspScreeningModal') as HTMLElement;
  const btnOpenScr = document.getElementById('btnOpenScreeningModal');
  const btnCloseScr = document.getElementById('btnCloseScreeningModal');
  const btnCancelScr = document.getElementById('btnCancelScreening');
  const scrForm = document.getElementById('dspScreeningForm') as HTMLFormElement;

  btnOpenScr?.addEventListener('click', () => {
    if (scrModal) scrModal.style.display = 'flex';
  });
  btnCloseScr?.addEventListener('click', () => {
    if (scrModal) scrModal.style.display = 'none';
  });
  btnCancelScr?.addEventListener('click', () => {
    if (scrModal) scrModal.style.display = 'none';
  });

  scrForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const patientId = (document.getElementById('scrPatientId') as HTMLInputElement).value;
    if (!patientId) return;

    const retinopathyScreenedAt = (document.getElementById('scrRetinopathy') as HTMLInputElement).value || undefined;
    const nephropathyScreenedAt = (document.getElementById('scrNephropathy') as HTMLInputElement).value || undefined;
    const diabeticFootScreenedAt = (document.getElementById('scrFoot') as HTMLInputElement).value || undefined;
    const echocardiogramAt = (document.getElementById('scrEcho') as HTMLInputElement).value || undefined;
    const ecgAt = (document.getElementById('scrEcg') as HTMLInputElement).value || undefined;

    updateScreeningDates(profileId, patientId, {
      retinopathyScreenedAt,
      nephropathyScreenedAt,
      diabeticFootScreenedAt,
      echocardiogramAt,
      ecgAt,
    });

    if (scrModal) scrModal.style.display = 'none';
    window.location.hash = `#/docspace/chronic-care?patient=${patientId}&t=${Date.now()}`;
  });

  // 5. Modal Thêm Bệnh nhân mạn tính Mới
  const newPatModal = document.getElementById('dspNewPatientModal') as HTMLElement;
  const btnOpenNewPat = document.getElementById('btnOpenNewPatientModal');
  const btnCloseNewPat = document.getElementById('btnCloseNewPatientModal');
  const btnCancelNewPat = document.getElementById('btnCancelNewPatient');
  const newPatForm = document.getElementById('dspNewPatientForm') as HTMLFormElement;

  btnOpenNewPat?.addEventListener('click', () => {
    if (newPatModal) newPatModal.style.display = 'flex';
  });
  btnCloseNewPat?.addEventListener('click', () => {
    if (newPatModal) newPatModal.style.display = 'none';
  });
  btnCancelNewPat?.addEventListener('click', () => {
    if (newPatModal) newPatModal.style.display = 'none';
  });

  newPatForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const fullName = (document.getElementById('newFullName') as HTMLInputElement).value.trim();
    const age = parseInt((document.getElementById('newAge') as HTMLInputElement).value) || 50;
    const gender = (document.getElementById('newGender') as HTMLSelectElement).value as any;
    const phoneNumber = (document.getElementById('newPhone') as HTMLInputElement).value.trim();
    const patientCode = (document.getElementById('newPatientCode') as HTMLInputElement).value.trim();

    const checkedBoxes = Array.from(document.querySelectorAll('input[name="chronicDiagnoses"]:checked')) as HTMLInputElement[];
    const diagnoses = checkedBoxes.map(b => b.value as ChronicConditionKey);

    const labelsMap: Record<string, string> = {
      t2d: 'Đái tháo đường T2',
      htn: 'Tăng huyết áp',
      ckd: 'Bệnh thận mạn',
      dyslipidemia: 'Rối loạn Lipid máu',
      heart_failure: 'Suy tim',
    };
    const diagnosesLabels = diagnoses.map(d => labelsMap[d] || d);

    const targetHba1c = parseFloat((document.getElementById('newTargetHba1c') as HTMLInputElement).value) || 7.0;
    const targetSystolicBp = parseFloat((document.getElementById('newTargetSysBp') as HTMLInputElement).value) || 130;
    const targetLdlC = parseFloat((document.getElementById('newTargetLdl') as HTMLInputElement).value) || 1.8;

    const newPat = saveChronicPatient(profileId, {
      fullName,
      age,
      gender,
      phoneNumber,
      patientCode,
      diagnoses,
      diagnosesLabels,
      targetGoals: { targetHba1c, targetSystolicBp, targetDiastolicBp: 80, targetLdlC },
      screeningDates: {},
    });

    if (newPatModal) newPatModal.style.display = 'none';
    window.location.hash = `#/docspace/chronic-care?patient=${newPat.id}`;
  });

  // 6. Nút Tạo Bệnh án SOAP từ Ca Mạn tính (Chuyển tiếp 2 chiều sang SOAP)
  document.getElementById('btnCreateSoapFromChronic')?.addEventListener('click', () => {
    const pId = document.getElementById('btnCreateSoapFromChronic')?.getAttribute('data-patient-id');
    if (pId) {
      window.location.hash = `#/docspace/soap?from_chronic=${pId}`;
    }
  });

  // 7. Nút Tạo SBAR từ Ca Mạn tính (Chuyển tiếp 2 chiều sang SBAR)
  document.getElementById('btnCreateSbarFromChronic')?.addEventListener('click', () => {
    const pId = document.getElementById('btnCreateSbarFromChronic')?.getAttribute('data-patient-id');
    if (pId) {
      window.location.hash = `#/docspace/sbar?from_chronic=${pId}`;
    }
  });
}
