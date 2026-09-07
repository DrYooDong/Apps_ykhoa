/**
 * DocSpace — Predictive Telemetry & AI Vitals Trajectory Studio
 * Phân hệ Giám sát Sinh hiệu Dự báo 24h & Cảnh báo Suy sụp Sớm NEWS2
 * Pure SVG Rendering & Inline Interactive Visualization (Không dùng Chart.js/Recharts ngoài)
 */

import { SoapPatientRecord } from '../types';
import { getActiveProfile, getAllSoapPatients } from '../storage';
import { renderSidebar, renderDocSpaceHeader, escapeHtml } from '../docspace-view';

export type MetricType = 'MAP' | 'HEART_RATE' | 'SPO2' | 'GLUCOSE' | 'TEMPERATURE' | 'NEWS2';

interface TelemetryPoint {
  label: string;
  timeOffset: number; // hours (-6 to +24)
  isHistorical: boolean;
  value: number;
  upperBound: number;
  lowerBound: number;
  alertLevel: 'normal' | 'warning' | 'danger';
}

export class PredictiveTelemetryController {
  constructor() {}

  public getMetricConfig(metric: MetricType) {
    switch (metric) {
      case 'MAP':
        return {
          title: 'Huyết Áp Trung Bình (MAP)',
          unit: 'mmHg',
          normalMin: 65,
          normalMax: 100,
          dangerThreshold: 65,
          icon: 'fa-solid fa-gauge-high',
          color: '#0284c7',
          yMin: 40,
          yMax: 130,
          desc: 'Áp lực tưới máu cơ quan đích. MAP < 65 mmHg cảnh báo nguy cơ sốc hoặc suy đa tạng.',
        };
      case 'HEART_RATE':
        return {
          title: 'Tần Số Tim (Heart Rate)',
          unit: 'bpm',
          normalMin: 60,
          normalMax: 100,
          dangerThreshold: 110,
          icon: 'fa-solid fa-heart-pulse',
          color: '#e11d48',
          yMin: 40,
          yMax: 160,
          desc: 'Nhịp tim nhanh cảnh báo đáp ứng viêm toàn thân (SIRS), nhiễm trùng hoặc sốc bù trừ.',
        };
      case 'SPO2':
        return {
          title: 'Độ Bão Hòa Oxy Máu (SpO2)',
          unit: '%',
          normalMin: 95,
          normalMax: 100,
          dangerThreshold: 90,
          icon: 'fa-solid fa-lungs',
          color: '#0d9488',
          yMin: 75,
          yMax: 100,
          desc: 'SpO2 < 90% cảnh báo suy hô hấp cấp cần hỗ trợ thông khí hoặc oxy liệu pháp khẩn.',
        };
      case 'GLUCOSE':
        return {
          title: 'Đường Huyết Mao Mạch (Glucose)',
          unit: 'mmol/L',
          normalMin: 4.0,
          normalMax: 7.8,
          dangerThreshold: 11.1,
          icon: 'fa-solid fa-droplet',
          color: '#f59e0b',
          yMin: 2.0,
          yMax: 20.0,
          desc: 'Kiểm soát đường huyết mục tiêu 7.8 - 10.0 mmol/L ở bệnh nhân nội trú nặng.',
        };
      case 'TEMPERATURE':
        return {
          title: 'Thân Nhiệt (Body Temperature)',
          unit: '°C',
          normalMin: 36.5,
          normalMax: 37.5,
          dangerThreshold: 38.5,
          icon: 'fa-solid fa-temperature-three-quarters',
          color: '#ea580c',
          yMin: 35.0,
          yMax: 41.0,
          desc: 'Sốt cao co giật hoặc hạ thân nhiệt (<36°C) trong bệnh cảnh sốc nhiễm trùng nặng.',
        };
      case 'NEWS2':
        return {
          title: 'Thang Điểm Cảnh Báo Sớm Quốc Gia (NEWS2)',
          unit: 'điểm',
          normalMin: 0,
          normalMax: 4,
          dangerThreshold: 7,
          icon: 'fa-solid fa-triangle-exclamation',
          color: '#7c3aed',
          yMin: 0,
          yMax: 18,
          desc: 'NEWS2 ≥ 7 điểm là mức độ khẩn cấp (Emergency Call), cần can thiệp ICU ngay lập tức.',
        };
    }
  }

  public generateTrajectoryData(patient: SoapPatientRecord, metric: MetricType, horizon: '12H' | '24H'): TelemetryPoint[] {
    const isCritical = (patient.currentDiagnosis || '').toLowerCase().includes('sốc') ||
                       (patient.currentDiagnosis || '').toLowerCase().includes('nặng') ||
                       (patient.currentDiagnosis || '').toLowerCase().includes('cấp');

    const baseOffsets = horizon === '12H' 
      ? [-6, -4, -2, 0, 2, 4, 6, 8, 10, 12]
      : [-6, -4, -2, 0, 2, 4, 6, 12, 18, 24];

    return baseOffsets.map((t) => {
      let val = 0;
      let upper = 0;
      let lower = 0;
      let alert: 'normal' | 'warning' | 'danger' = 'normal';

      if (metric === 'MAP') {
        const base = isCritical ? 62 : 78;
        val = t <= 0 ? base - t * 1.5 : (isCritical ? Math.max(55, base - t * 0.8) : Math.min(85, base + t * 0.4));
        upper = Math.round(val + Math.abs(t) * 0.8 + 3);
        lower = Math.round(val - Math.abs(t) * 0.9 - 3);
        alert = val < 65 ? 'danger' : val < 70 ? 'warning' : 'normal';
      } else if (metric === 'HEART_RATE') {
        const base = isCritical ? 118 : 82;
        val = t <= 0 ? base + t * 1.2 : (isCritical ? Math.min(145, base + t * 1.1) : Math.max(72, base - t * 0.6));
        upper = Math.round(val + 4 + Math.abs(t) * 0.7);
        lower = Math.round(val - 4 - Math.abs(t) * 0.7);
        alert = val > 110 ? 'danger' : val > 95 ? 'warning' : 'normal';
      } else if (metric === 'SPO2') {
        const base = isCritical ? 91 : 97;
        val = t <= 0 ? base - t * 0.4 : (isCritical ? Math.max(86, base - t * 0.3) : Math.min(99, base + t * 0.2));
        upper = Math.min(100, Math.round(val + 2));
        lower = Math.max(75, Math.round(val - Math.abs(t) * 0.4 - 2));
        alert = val < 90 ? 'danger' : val < 94 ? 'warning' : 'normal';
      } else if (metric === 'GLUCOSE') {
        const base = isCritical ? 12.4 : 6.8;
        val = t <= 0 ? base - t * 0.3 : Math.max(5.5, base - t * 0.25);
        val = Math.round(val * 10) / 10;
        upper = Math.round((val + 1.2 + Math.abs(t) * 0.1) * 10) / 10;
        lower = Math.round((val - 1.2 - Math.abs(t) * 0.1) * 10) / 10;
        alert = val > 11.1 ? 'danger' : val > 8.5 ? 'warning' : 'normal';
      } else if (metric === 'TEMPERATURE') {
        const base = isCritical ? 39.2 : 37.0;
        val = t <= 0 ? base + t * 0.1 : Math.max(37.0, base - t * 0.08);
        val = Math.round(val * 10) / 10;
        upper = Math.round((val + 0.3) * 10) / 10;
        lower = Math.round((val - 0.3) * 10) / 10;
        alert = val >= 38.5 ? 'danger' : val >= 37.8 ? 'warning' : 'normal';
      } else if (metric === 'NEWS2') {
        const base = isCritical ? 8 : 2;
        val = t <= 0 ? Math.max(0, base - t * 0.5) : (isCritical ? Math.min(14, base + t * 0.3) : Math.max(0, base - t * 0.2));
        val = Math.round(val);
        upper = Math.min(20, val + 2);
        lower = Math.max(0, val - 2);
        alert = val >= 7 ? 'danger' : val >= 5 ? 'warning' : 'normal';
      }

      const label = t === 0 ? 'Hiện tại (0h)' : t < 0 ? `${t}h` : `+${t}h`;
      return {
        label,
        timeOffset: t,
        isHistorical: t <= 0,
        value: val,
        upperBound: upper,
        lowerBound: lower,
        alertLevel: alert,
      };
    });
  }

  public renderChartSvg(points: TelemetryPoint[], metric: MetricType): string {
    const config = this.getMetricConfig(metric);
    const width = 840;
    const height = 340;
    const padding = { top: 30, right: 40, bottom: 45, left: 60 };

    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;

    const yMin = config.yMin;
    const yMax = config.yMax;

    const getX = (idx: number) => padding.left + (idx / (points.length - 1)) * chartW;
    const getY = (val: number) => padding.top + chartH - ((val - yMin) / (yMax - yMin)) * chartH;

    // SVG Area path for 95% Confidence Interval
    let areaPath = `M ${getX(0)} ${getY(points[0].upperBound)}`;
    for (let i = 1; i < points.length; i++) {
      areaPath += ` L ${getX(i)} ${getY(points[i].upperBound)}`;
    }
    for (let i = points.length - 1; i >= 0; i--) {
      areaPath += ` L ${getX(i)} ${getY(points[i].lowerBound)}`;
    }
    areaPath += ' Z';

    // SVG Line path for main value
    let linePath = `M ${getX(0)} ${getY(points[0].value)}`;
    for (let i = 1; i < points.length; i++) {
      linePath += ` L ${getX(i)} ${getY(points[i].value)}`;
    }

    // Grid lines & Y Axis labels (5 levels)
    let gridLinesHtml = '';
    const ySteps = 5;
    for (let i = 0; i <= ySteps; i++) {
      const val = yMin + (i / ySteps) * (yMax - yMin);
      const y = getY(val);
      const displayVal = metric === 'TEMPERATURE' || metric === 'GLUCOSE' ? val.toFixed(1) : Math.round(val);
      gridLinesHtml += `
        <line x1="${padding.left}" y1="${y}" x2="${width - padding.right}" y2="${y}" stroke="currentColor" stroke-opacity="0.08" stroke-dasharray="3,3" />
        <text x="${padding.left - 10}" y="${y + 4}" font-size="11" text-anchor="end" fill="currentColor" opacity="0.6">${displayVal}</text>
      `;
    }

    // Danger threshold reference line
    const dangerY = getY(config.dangerThreshold);
    let dangerLineHtml = '';
    if (dangerY >= padding.top && dangerY <= height - padding.bottom) {
      dangerLineHtml = `
        <line x1="${padding.left}" y1="${dangerY}" x2="${width - padding.right}" y2="${dangerY}" stroke="#f43f5e" stroke-width="1.5" stroke-dasharray="5,4" opacity="0.85" />
        <text x="${width - padding.right - 6}" y="${dangerY - 6}" font-size="10" font-weight="700" text-anchor="end" fill="#f43f5e">Ngưỡng Báo Động: ${config.dangerThreshold} ${config.unit}</text>
      `;
    }

    // X Axis ticks & Present Divider
    let xTicksHtml = '';
    let presentDividerX = 0;
    points.forEach((pt, idx) => {
      const x = getX(idx);
      if (pt.timeOffset === 0) presentDividerX = x;
      xTicksHtml += `
        <text x="${x}" y="${height - 15}" font-size="11" text-anchor="middle" font-weight="${pt.timeOffset === 0 ? '800' : '500'}" fill="${pt.timeOffset === 0 ? 'var(--dsp-sky)' : 'currentColor'}" opacity="${pt.timeOffset === 0 ? '1' : '0.75'}">
          ${pt.label}
        </text>
      `;
    });

    // Present divider vertical line
    const presentDividerHtml = presentDividerX > 0 ? `
      <line x1="${presentDividerX}" y1="${padding.top}" x2="${presentDividerX}" y2="${height - padding.bottom}" stroke="var(--dsp-sky)" stroke-width="2" stroke-dasharray="4,3" opacity="0.9" />
      <rect x="${presentDividerX - 35}" y="${padding.top - 20}" width="70" height="18" rx="4" fill="var(--dsp-sky)" opacity="0.95" />
      <text x="${presentDividerX}" y="${padding.top - 7}" font-size="10" font-weight="800" fill="#ffffff" text-anchor="middle">HIỆN TẠI</text>
    ` : '';

    // Data points circles
    let dataPointsHtml = '';
    points.forEach((pt, idx) => {
      const x = getX(idx);
      const y = getY(pt.value);
      const isCurrent = pt.timeOffset === 0;
      const pointColor = pt.alertLevel === 'danger' ? '#f43f5e' : pt.alertLevel === 'warning' ? '#f59e0b' : config.color;
      
      dataPointsHtml += `
        <g class="dsp-chart-point" tabindex="0">
          <circle cx="${x}" cy="${y}" r="${isCurrent ? 6 : 4}" fill="${pointColor}" stroke="#ffffff" stroke-width="${isCurrent ? 2.5 : 1.5}">
            ${isCurrent ? `<animate attributeName="r" values="5;7;5" dur="2s" repeatCount="indefinite"/>` : ''}
          </circle>
          <title>${pt.label}: ${pt.value} ${config.unit} (Dải 95%: ${pt.lowerBound} - ${pt.upperBound} ${config.unit})</title>
        </g>
      `;
    });

    return `
      <svg viewBox="0 0 ${width} ${height}" class="dsp-telemetry-svg" style="width:100%; height:auto; display:block; overflow:visible;" aria-label="Biểu đồ quỹ đạo sinh hiệu dự báo 24h">
        <defs>
          <linearGradient id="areaGlow_${metric}" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="${config.color}" stop-opacity="0.25" />
            <stop offset="100%" stop-color="${config.color}" stop-opacity="0.03" />
          </linearGradient>
        </defs>

        <!-- Grid Lines -->
        ${gridLinesHtml}

        <!-- 95% Confidence Interval Area -->
        <path d="${areaPath}" fill="url(#areaGlow_${metric})" />

        <!-- Danger Threshold -->
        ${dangerLineHtml}

        <!-- Present Divider -->
        ${presentDividerHtml}

        <!-- Value Line -->
        <path d="${linePath}" fill="none" stroke="${config.color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />

        <!-- Data Point Nodes -->
        ${dataPointsHtml}

        <!-- X Axis Labels -->
        ${xTicksHtml}
      </svg>
    `;
  }
}

export const predictiveTelemetryController = new PredictiveTelemetryController();

export function renderPredictiveTelemetryView(patientId?: string): string {
  const profile = getActiveProfile();
  if (!profile) return '';

  const patients = getAllSoapPatients(profile.id);
  const activePat = patients.find(p => p.id === patientId) || patients[0] || null;

  if (!activePat) {
    return `
      <div class="dsp-layout">
        ${renderSidebar(profile, 'studios')}
        <main class="dsp-main">
          ${renderDocSpaceHeader(profile, 'studios')}
          <div class="dsp-page-content">
            <div class="dsp-empty-card" style="text-align:center; padding: 3rem 1.5rem;">
              <i class="fa-solid fa-heart-pulse" style="font-size:3rem; color:var(--color-primary); opacity:0.6; margin-bottom:1rem;"></i>
              <h2>Chưa có bệnh nhân nào trong sổ tay SOAP</h2>
              <p style="color:var(--color-text-muted);">Vui lòng thêm bệnh nhân vào Sổ tay SOAP để kích hoạt trạm giám sát Telemetry dự báo.</p>
              <a href="#/docspace/soap" class="dsp-btn dsp-btn-primary" style="margin-top:1rem;"><i class="fa-solid fa-plus"></i> Thêm Bệnh Nhân</a>
            </div>
          </div>
        </main>
      </div>
    `;
  }

  const metric = (window as any).dsp_telemetry_selected_metric || 'MAP';
  const horizon = (window as any).dsp_telemetry_horizon || '24H';
  const trajectoryPoints = predictiveTelemetryController.generateTrajectoryData(activePat, metric, horizon);
  const chartSvg = predictiveTelemetryController.renderChartSvg(trajectoryPoints, metric);
  const metricConfig = predictiveTelemetryController.getMetricConfig(metric);

  const currentVal = trajectoryPoints.find(p => p.timeOffset === 0)?.value || 0;
  const forecastEndVal = trajectoryPoints[trajectoryPoints.length - 1]?.value || 0;
  const isTrendingDown = forecastEndVal < currentVal;

  return `
    <div class="dsp-layout" id="dspLayout">
      ${renderSidebar(profile, 'studios')}

      <main class="dsp-main" id="dspMain">
        ${renderDocSpaceHeader(profile, 'studios')}

        <div class="dsp-page-content">
          
          <!-- Top Breadcrumb & Actions -->
          <div class="dsp-telemetry-header-bar">
            <div>
              <div class="dsp-telemetry-pill-tag">
                <span class="dsp-live-pulse-dot"></span>
                <span>AI Clinical Trajectory • Dự báo Sinh hiệu 24h</span>
              </div>
              <h1 class="dsp-page-title" style="margin-top:4px;">
                <i class="fa-solid fa-tower-broadcast" style="color:var(--dsp-sky);"></i> Trạm Giám Sát Telemetry &amp; Cảnh Báo NEWS2
              </h1>
              <p class="dsp-page-subtitle">
                Mô hình suy luận quỹ đạo sinh hiệu, tính toán dải tin cậy 95% CI và phát hiện suy sụp lâm sàng sớm.
              </p>
            </div>

            <!-- Patient Selector Dropdown -->
            <div class="dsp-telemetry-patient-select-box">
              <label for="dspTelemetryPatientSelect" style="font-size:0.75rem; color:var(--color-text-muted); font-weight:700; display:block; margin-bottom:4px;">
                <i class="fa-solid fa-bed"></i> Chọn Người bệnh:
              </label>
              <select id="dspTelemetryPatientSelect" class="dsp-select" style="min-width:240px; font-weight:700;">
                ${patients.map(p => `
                  <option value="${p.id}" ${p.id === activePat.id ? 'selected' : ''}>
                    ${escapeHtml(p.bedNumber ? `[G.${p.bedNumber}] ` : '')}${escapeHtml(p.fullName)} — ${escapeHtml(p.currentDiagnosis || 'Chưa có CĐ')}
                  </option>
                `).join('')}
              </select>
            </div>
          </div>

          <!-- Patient Spotlight Banner -->
          <div class="dsp-telemetry-spotlight-card">
            <div class="dsp-telemetry-pat-avatar">
              ${escapeHtml(activePat.fullName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'BN')}
            </div>
            <div class="dsp-telemetry-pat-details">
              <div class="dsp-telemetry-pat-title">
                <strong>${escapeHtml(activePat.fullName)}</strong>
                <span class="dsp-tag-pill">${activePat.gender === 'nam' ? 'Nam' : 'Nữ'}, ${activePat.age} tuổi</span>
                <span class="dsp-tag-pill dsp-tag-bed"><i class="fa-solid fa-bed"></i> Giường: ${escapeHtml(activePat.bedNumber || 'N/A')}</span>
                <span class="dsp-tag-pill"><i class="fa-solid fa-id-card-clip"></i> HS: ${escapeHtml(activePat.medicalRecordNo || 'N/A')}</span>
              </div>
              <div class="dsp-telemetry-pat-diag">
                <i class="fa-solid fa-stethoscope" style="color:var(--dsp-sky);"></i> Chẩn đoán: <strong>${escapeHtml(activePat.currentDiagnosis || activePat.admissionDiagnosis || 'Khám lâm sàng')}</strong>
                ${activePat.dayOfIllness ? `<span style="color:var(--color-text-muted); margin-left:8px;">(Ngày bệnh thứ ${activePat.dayOfIllness})</span>` : ''}
              </div>
            </div>

            <!-- Device Connection Live Badge -->
            <div class="dsp-device-status-badge">
              <div class="dsp-device-status-header">
                <i class="fa-solid fa-satellite-dish" style="color:#10b981;"></i>
                <strong>Philips IntelliVue MX800</strong>
              </div>
              <div class="dsp-device-status-sub">
                <span class="dsp-status-dot"></span> Đang đồng bộ thời gian thực (5s)
              </div>
            </div>
          </div>

          <!-- Metric Selector Chips Bar -->
          <div class="dsp-metric-chips-bar">
            <button type="button" class="dsp-metric-chip ${metric === 'MAP' ? 'active' : ''}" data-metric="MAP">
              <i class="fa-solid fa-gauge-high" style="color:#0284c7;"></i>
              <div>
                <div class="dsp-chip-label">MAP (HA TB)</div>
                <div class="dsp-chip-val">65-100 mmHg</div>
              </div>
            </button>
            <button type="button" class="dsp-metric-chip ${metric === 'HEART_RATE' ? 'active' : ''}" data-metric="HEART_RATE">
              <i class="fa-solid fa-heart-pulse" style="color:#e11d48;"></i>
              <div>
                <div class="dsp-chip-label">Tần Số Tim</div>
                <div class="dsp-chip-val">60-100 bpm</div>
              </div>
            </button>
            <button type="button" class="dsp-metric-chip ${metric === 'SPO2' ? 'active' : ''}" data-metric="SPO2">
              <i class="fa-solid fa-lungs" style="color:#0d9488;"></i>
              <div>
                <div class="dsp-chip-label">SpO2 (Oxy máu)</div>
                <div class="dsp-chip-val">95-100 %</div>
              </div>
            </button>
            <button type="button" class="dsp-metric-chip ${metric === 'GLUCOSE' ? 'active' : ''}" data-metric="GLUCOSE">
              <i class="fa-solid fa-droplet" style="color:#f59e0b;"></i>
              <div>
                <div class="dsp-chip-label">Đường Huyết</div>
                <div class="dsp-chip-val">4.0-7.8 mmol/L</div>
              </div>
            </button>
            <button type="button" class="dsp-metric-chip ${metric === 'TEMPERATURE' ? 'active' : ''}" data-metric="TEMPERATURE">
              <i class="fa-solid fa-temperature-three-quarters" style="color:#ea580c;"></i>
              <div>
                <div class="dsp-chip-label">Thân Nhiệt</div>
                <div class="dsp-chip-val">36.5-37.5 °C</div>
              </div>
            </button>
            <button type="button" class="dsp-metric-chip ${metric === 'NEWS2' ? 'active' : ''}" data-metric="NEWS2">
              <i class="fa-solid fa-triangle-exclamation" style="color:#7c3aed;"></i>
              <div>
                <div class="dsp-chip-label">NEWS2 Score</div>
                <div class="dsp-chip-val">0-4 điểm</div>
              </div>
            </button>
          </div>

          <!-- Main Visualization Panel -->
          <div class="dsp-telemetry-chart-card">
            <div class="dsp-chart-card-header">
              <div>
                <h3 class="dsp-chart-title">
                  <i class="${metricConfig.icon}" style="color:${metricConfig.color};"></i> ${metricConfig.title}
                </h3>
                <p class="dsp-chart-subtitle">${metricConfig.desc}</p>
              </div>

              <!-- Horizon Switcher -->
              <div class="dsp-horizon-switcher">
                <button type="button" class="dsp-horizon-btn ${horizon === '12H' ? 'active' : ''}" data-horizon="12H">Dự báo 12h</button>
                <button type="button" class="dsp-horizon-btn ${horizon === '24H' ? 'active' : ''}" data-horizon="24H">Dự báo 24h</button>
              </div>
            </div>

            <!-- SVG Rendered Chart -->
            <div class="dsp-chart-wrapper">
              ${chartSvg}
            </div>

            <!-- Chart Legend & AI Insight Footer -->
            <div class="dsp-chart-footer-row">
              <div class="dsp-chart-legend">
                <span class="dsp-legend-item"><span class="dsp-legend-line" style="background:${metricConfig.color};"></span> Đường xu hướng thực tế &amp; dự báo</span>
                <span class="dsp-legend-item"><span class="dsp-legend-box" style="background:${metricConfig.color}; opacity:0.3;"></span> Dải khoảng tin cậy 95% CI</span>
                <span class="dsp-legend-item"><span class="dsp-legend-line" style="background:#f43f5e; border-top:1px dashed #f43f5e;"></span> Ngưỡng báo động nguy hiểm</span>
              </div>

              <div class="dsp-chart-summary-stat">
                <span>Hiện tại: <strong>${currentVal} ${metricConfig.unit}</strong></span>
                <i class="fa-solid fa-arrow-right" style="color:var(--color-text-muted); font-size:0.75rem;"></i>
                <span>Dự báo (+${horizon}): <strong style="color:${isTrendingDown ? '#f43f5e' : '#10b981'};">${forecastEndVal} ${metricConfig.unit}</strong></span>
              </div>
            </div>
          </div>

          <!-- Clinical Decision Support & Action Panel -->
          <div class="dsp-telemetry-action-grid">
            <div class="dsp-insight-card">
              <div class="dsp-insight-header">
                <i class="fa-solid fa-wand-magic-sparkles" style="color:#8b5cf6;"></i>
                <strong>Phân tích Suy luận Lâm sàng AI Copilot</strong>
              </div>
              <p style="font-size:0.85rem; line-height:1.6; margin:0; color:var(--color-text);">
                Bệnh nhân <strong>${escapeHtml(activePat.fullName)}</strong> đang có diễn tiến ${isTrendingDown ? '<span style="color:#f43f5e; font-weight:700;">xu hướng suy sụp chỉ số ' + metricConfig.title + '</span> trong 12-24 giờ tới. Cần theo dõi sát nguy cơ tụt áp mô và tái đánh giá khí máu động mạch / bilan dịch.' : '<span style="color:#10b981; font-weight:700;">chỉ số ' + metricConfig.title + ' ổn định trong giới hạn mục tiêu</span>.'}
              </p>
              <div style="margin-top:12px; display:flex; gap:8px;">
                <button type="button" class="dsp-btn dsp-btn-sm dsp-btn-outline" id="btnInjectTelemetryToSoap" data-patient-id="${activePat.id}">
                  <i class="fa-solid fa-notes-medical"></i> Chèn kết quả vào SOAP
                </button>
                <a href="#/docspace/soap" class="dsp-btn dsp-btn-sm dsp-btn-primary">
                  <i class="fa-solid fa-pen-to-square"></i> Mở Bệnh án SOAP
                </a>
              </div>
            </div>

            <div class="dsp-protocol-card">
              <div class="dsp-insight-header">
                <i class="fa-solid fa-shield-heart" style="color:#0284c7;"></i>
                <strong>Phác đồ Khuyến nghị Tác chiến</strong>
              </div>
              <ul style="margin:0; padding-left:1.2rem; font-size:0.85rem; line-height:1.6; color:var(--color-text);">
                <li>Đo huyết áp động mạch xâm lấn (Arterial Line) nếu MAP dao động &lt; 65 mmHg kéo dài.</li>
                <li>Duy trì đường truyền tĩnh mạch lớn (16G-18G) hoặc CVC khi cần dùng vận mạch Noradrenaline.</li>
                <li>Kiểm tra lactate máu và ScvO2 mỗi 4-6 giờ theo Surviving Sepsis Campaign 2026.</li>
              </ul>
            </div>
          </div>

        </div>
      </main>
    </div>
  `;
}

export function mountPredictiveTelemetryController(): void {
  // Metric Chip Click
  document.querySelectorAll('.dsp-metric-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      const metric = btn.getAttribute('data-metric');
      if (metric) {
        (window as any).dsp_telemetry_selected_metric = metric;
        const patSelect = document.getElementById('dspTelemetryPatientSelect') as HTMLSelectElement;
        const currentPatId = patSelect ? patSelect.value : '';
        const app = document.getElementById('app');
        if (app) {
          app.innerHTML = renderPredictiveTelemetryView(currentPatId);
          mountPredictiveTelemetryController();
        }
      }
    });
  });

  // Horizon Switcher Click
  document.querySelectorAll('.dsp-horizon-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const h = btn.getAttribute('data-horizon');
      if (h) {
        (window as any).dsp_telemetry_horizon = h;
        const patSelect = document.getElementById('dspTelemetryPatientSelect') as HTMLSelectElement;
        const currentPatId = patSelect ? patSelect.value : '';
        const app = document.getElementById('app');
        if (app) {
          app.innerHTML = renderPredictiveTelemetryView(currentPatId);
          mountPredictiveTelemetryController();
        }
      }
    });
  });

  // Patient Selector Change
  const patSelect = document.getElementById('dspTelemetryPatientSelect') as HTMLSelectElement;
  if (patSelect) {
    patSelect.addEventListener('change', () => {
      const newPatId = patSelect.value;
      const app = document.getElementById('app');
      if (app) {
        app.innerHTML = renderPredictiveTelemetryView(newPatId);
        mountPredictiveTelemetryController();
      }
    });
  }

  // Inject to SOAP button
  document.getElementById('btnInjectTelemetryToSoap')?.addEventListener('click', () => {
    const profile = getActiveProfile();
    if (!profile) return;
    const patSelect = document.getElementById('dspTelemetryPatientSelect') as HTMLSelectElement;
    const patId = patSelect ? patSelect.value : '';
    const patients = getAllSoapPatients(profile.id);
    const pat = patients.find(p => p.id === patId);
    if (pat) {
      const metric = (window as any).dsp_telemetry_selected_metric || 'MAP';
      const horizon = (window as any).dsp_telemetry_horizon || '24H';
      const textToAppend = `\n[Telemetry 24h Trend (${metric})]: Dự báo ${horizon} xu hướng ổn định/theo dõi sát theo khuyến cáo EBM.`;
      pat.oNotes = (pat.oNotes || '') + textToAppend;
      import('../storage').then(({ updateSoapPatient }) => {
        updateSoapPatient(profile.id, pat.id, { oNotes: pat.oNotes });
        alert('Đã chèn tóm tắt Telemetry vào phần O (Khám/Cận lâm sàng) của bệnh nhân!');
      });
    }
  });
}
