/**
 * DocSpace — AI Insights & Practice Analytics View (Cluster 5)
 * Giao diện Bento Grid Dashboard phân tích thực hành, tóm tắt tuần AI và bảo vệ sức khỏe bác sĩ.
 */

import { getActiveProfile, getProfile, getGeminiApiKey, setGeminiApiKey, getAllWeeklySummaries, saveWeeklySummary } from '../storage';
import { renderSidebar, renderDocSpaceHeader, escapeHtml, formatDate } from '../docspace-view';
import { calculatePracticeAnalytics, renderSvgDonutChart } from './analytics-engine';
import { testGeminiConnection, generateWeeklyClinicalSummaryWithGemini } from '../ai/gemini-insights-service';
import { PracticeAnalyticsData, WeeklySummaryRecord } from '../types';

export async function renderInsightsView(profileId: string): Promise<string> {
  const profile = getActiveProfile() || getProfile(profileId);
  if (!profile) return '<div class="dsp-alert dsp-alert-danger">Hồ sơ không tồn tại</div>';

  const analytics: PracticeAnalyticsData = await calculatePracticeAnalytics(profileId);
  const geminiKey = getGeminiApiKey(profileId);
  const weeklySummaries = getAllWeeklySummaries(profileId);
  const latestSummary = weeklySummaries[0];

  const burnout = analytics.burnout;
  const topDiag = analytics.topDiagnoses;
  const contextList = analytics.contextDistribution;
  const logs7 = analytics.activityLogs7Days;

  return `
    <div class="dsp-layout" id="dspLayout">
      <!-- Sidebar -->
      ${renderSidebar(profile, 'insights')}

      <!-- Main Content -->
      <main class="dsp-main" id="dspMain">
        ${renderDocSpaceHeader(profile, 'insights')}

        <div class="dsp-page-content animate-fade-in" style="max-width: 1280px; margin: 0 auto; padding-bottom: 3rem;">
          
          <!-- Top Hero Banner -->
          <div class="dsp-greeting" style="background: linear-gradient(135deg, rgba(2, 132, 199, 0.15), rgba(99, 102, 241, 0.12)); border: 1px solid rgba(56, 189, 248, 0.25); border-radius: 16px; margin-bottom: 1.75rem; padding: 1.5rem 2rem;">
            <div class="dsp-greeting-left">
              <div class="dsp-avatar dsp-avatar--hero" style="background: linear-gradient(135deg, #0284c7, #6366f1); color: #fff;">
                <i class="fa-solid fa-brain"></i>
              </div>
              <div class="dsp-greeting-text">
                <h1 class="dsp-page-title" style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
                  AI Insights &amp; Sức Khỏe Nghề Nghiệp
                  <span class="dsp-badge" style="background: rgba(99, 102, 241, 0.2); color: #818cf8; border: 1px solid rgba(99, 102, 241, 0.4); font-size: 0.75rem;">
                    <i class="fa-solid fa-sparkles"></i> Gemini Clinical Engine
                  </span>
                </h1>
                <p class="dsp-page-subtitle">
                  Phân tích thực hành lâm sàng, phát hiện tín hiệu quá tải và tổng kết chuyên môn tuần qua
                </p>
              </div>
            </div>
            <div class="dsp-greeting-actions">
              <button class="dsp-btn dsp-btn-primary" id="btnTriggerWeeklySummary" style="font-weight: 800; box-shadow: 0 4px 14px rgba(2, 132, 199, 0.35);">
                <i class="fa-solid fa-wand-magic-sparkles"></i> ✨ Tổng kết Tuần bằng Gemini AI
              </button>
            </div>
          </div>

          <!-- Bento Grid Layout -->
          <div style="display: grid; grid-template-columns: repeat(12, 1fr); gap: 1.5rem;">

            <!-- 1. Doctor Wellness Guardian & Burnout Alert (Full Top 12 cols) -->
            <div class="dsp-card dsp-p-6" style="grid-column: span 12; border-left: 6px solid ${burnout.color}; background: var(--color-surface);">
              <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:1rem; margin-bottom: 1.25rem;">
                <div>
                  <div style="display:flex; align-items:center; gap: 8px; margin-bottom: 4px;">
                    <span style="font-size: 1.25rem; font-weight: 800; color: var(--color-text);">
                      <i class="fa-solid fa-heart-pulse" style="color: ${burnout.color};"></i> Trạng thái Sức Khỏe Nghề Nghiệp (Wellness Guardian)
                    </span>
                    <span class="dsp-badge" style="${burnout.badgeClass}; font-weight: 700; padding: 4px 10px; border-radius: 20px;">
                      ${burnout.title}
                    </span>
                  </div>
                  <p class="dsp-text-sm dsp-text-muted" style="margin:0;">
                    Chỉ số đánh giá tải trọng làm việc, tần suất tua trực và mức độ chi tiết khi làm bệnh án
                  </p>
                </div>
                <div style="text-align: right;">
                  <div style="font-size: 0.75rem; color: var(--color-text-muted); text-transform: uppercase; font-weight: 700;">Điểm Áp lực Tuần</div>
                  <div style="font-size: 1.75rem; font-weight: 900; color: ${burnout.color}; line-height: 1;">
                    ${burnout.score}<span style="font-size: 1rem; color: var(--color-text-muted); font-weight: 500;">/100</span>
                  </div>
                </div>
              </div>

              <!-- Quick Workload Metrics Strip -->
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem; margin-bottom: 1.25rem; background: var(--color-bg); padding: 1rem; border-radius: 12px;">
                <div style="display:flex; align-items:center; gap:10px;">
                  <div style="width:38px; height:38px; border-radius:8px; background:rgba(245, 158, 11, 0.15); color:#f59e0b; display:flex; align-items:center; justify-content:center; font-size:1.1rem;">
                    <i class="fa-solid fa-moon"></i>
                  </div>
                  <div>
                    <div style="font-size:0.75rem; color:var(--color-text-muted);">Ca trực trong tuần</div>
                    <div style="font-size:1.1rem; font-weight:800; color:var(--color-text);">${burnout.metrics.shiftsThisWeek} ca <span style="font-size:0.75rem; color:#10b981; font-weight:600;">(Streak: ${analytics.weeklyDutyStreak}w)</span></div>
                  </div>
                </div>

                <div style="display:flex; align-items:center; gap:10px;">
                  <div style="width:38px; height:38px; border-radius:8px; background:rgba(2, 132, 199, 0.15); color:#0284c7; display:flex; align-items:center; justify-content:center; font-size:1.1rem;">
                    <i class="fa-solid fa-notes-medical"></i>
                  </div>
                  <div>
                    <div style="font-size:0.75rem; color:var(--color-text-muted);">Bệnh án SOAP đã ghi</div>
                    <div style="font-size:1.1rem; font-weight:800; color:var(--color-text);">${burnout.metrics.soapsThisWeek} ghi chú</div>
                  </div>
                </div>

                <div style="display:flex; align-items:center; gap:10px;">
                  <div style="width:38px; height:38px; border-radius:8px; background:rgba(99, 102, 241, 0.15); color:#6366f1; display:flex; align-items:center; justify-content:center; font-size:1.1rem;">
                    <i class="fa-solid fa-pen-nib"></i>
                  </div>
                  <div>
                    <div style="font-size:0.75rem; color:var(--color-text-muted);">Độ sâu SOAP trung bình</div>
                    <div style="font-size:1.1rem; font-weight:800; color:var(--color-text);">~${burnout.metrics.avgSoapWordCount} từ/ghi chú</div>
                  </div>
                </div>

                <div style="display:flex; align-items:center; gap:10px;">
                  <div style="width:38px; height:38px; border-radius:8px; background:rgba(239, 68, 68, 0.15); color:#ef4444; display:flex; align-items:center; justify-content:center; font-size:1.1rem;">
                    <i class="fa-solid fa-triangle-exclamation"></i>
                  </div>
                  <div>
                    <div style="font-size:0.75rem; color:var(--color-text-muted);">Ca nguy kịch (Critical)</div>
                    <div style="font-size:1.1rem; font-weight:800; color:var(--color-text);">${burnout.metrics.criticalPatientsCount} ca</div>
                  </div>
                </div>
              </div>

              <!-- AI Weekly Summary Display Box -->
              <div id="aiSummaryBox" style="background: rgba(2, 132, 199, 0.04); border: 1px solid rgba(2, 132, 199, 0.2); border-radius: 12px; padding: 1.25rem; position: relative;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 0.75rem; border-bottom: 1px solid var(--color-border); padding-bottom: 0.5rem;">
                  <div style="font-weight: 700; color: var(--color-primary); display: flex; align-items: center; gap: 8px;">
                    <i class="fa-solid fa-calendar-check"></i>
                    <span id="aiSummaryTitle">Bản Tổng Kết Tuần Lâm Sàng Mới Nhất</span>
                    ${latestSummary ? `<span style="font-size:0.75rem; color:var(--color-text-muted); font-weight:normal;">(${formatDate(latestSummary.createdAt)})</span>` : ''}
                  </div>
                  <div style="display: flex; gap: 6px;">
                    <button class="dsp-btn dsp-btn-ghost dsp-btn-sm" id="btnCopySummary" title="Sao chép nội dung báo cáo" style="font-size: 0.75rem;">
                      <i class="fa-solid fa-copy"></i> Sao chép
                    </button>
                    <button class="dsp-btn dsp-btn-ghost dsp-btn-sm" id="btnRefreshSummary" title="Tạo lại bản tóm tắt mới" style="font-size: 0.75rem; color: var(--color-primary);">
                      <i class="fa-solid fa-arrows-rotate"></i> Làm mới
                    </button>
                  </div>
                </div>

                <div id="aiSummaryContent" style="color: var(--color-text); font-size: 0.9rem; line-height: 1.6;">
                  ${latestSummary ? renderMarkdownText(latestSummary.summaryText) : `
                    <div style="text-align: center; padding: 1.5rem; color: var(--color-text-muted);">
                      <i class="fa-solid fa-wand-magic-sparkles" style="font-size: 2rem; color: var(--color-primary); opacity: 0.6; margin-bottom: 8px;"></i>
                      <p style="margin: 0; font-weight: 600;">Chưa có bản tổng kết tuần nào được tạo.</p>
                      <p style="margin: 4px 0 0 0; font-size: 0.8rem;">Nhấn nút <strong>"Tổng kết Tuần bằng Gemini AI"</strong> ở trên để AI phân tích toàn bộ ca bệnh và sức khỏe tuần qua.</p>
                    </div>
                  `}
                </div>
              </div>

              <!-- Wellness Advice & Reasons -->
              <div style="margin-top: 1rem; display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1rem;">
                ${burnout.reasons.length > 0 ? `
                  <div style="background: rgba(245, 158, 11, 0.08); padding: 0.75rem 1rem; border-radius: 8px; border-left: 3px solid #f59e0b;">
                    <div style="font-size: 0.8rem; font-weight: 700; color: #b45309; margin-bottom: 4px;">
                      <i class="fa-solid fa-circle-exclamation"></i> Tín hiệu cần lưu tâm:
                    </div>
                    <ul style="margin: 0; padding-left: 1.25rem; font-size: 0.85rem; color: var(--color-text);">
                      ${burnout.reasons.map(r => `<li>${escapeHtml(r)}</li>`).join('')}
                    </ul>
                  </div>
                ` : ''}

                <div style="background: rgba(16, 185, 129, 0.08); padding: 0.75rem 1rem; border-radius: 8px; border-left: 3px solid #10b981;">
                  <div style="font-size: 0.8rem; font-weight: 700; color: #047857; margin-bottom: 4px;">
                    <i class="fa-solid fa-shield-heart"></i> Khuyến nghị Phục hồi &amp; Giữ gìn Sức khỏe:
                  </div>
                  <ul style="margin: 0; padding-left: 1.25rem; font-size: 0.85rem; color: var(--color-text);">
                    ${burnout.recommendations.map(rc => `<li>${escapeHtml(rc)}</li>`).join('')}
                  </ul>
                </div>
              </div>

            </div>

            <!-- 2. Top 10 Diagnoses Pie/Donut Chart (Left 7 cols) -->
            <div class="dsp-card dsp-p-6" style="grid-column: span 7; display: flex; flex-direction: column;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 1.25rem;">
                <div>
                  <h3 style="margin:0; font-size: 1.15rem; font-weight: 800; color: var(--color-text);">
                    <i class="fa-solid fa-chart-pie" style="color:var(--color-primary); margin-right:6px;"></i> Top 10 Bệnh lý Thường gặp Nhất
                  </h3>
                  <p class="dsp-text-xs dsp-text-muted" style="margin:2px 0 0 0;">Dữ liệu trích xuất từ SOAP Ward Notes, Cases, SBAR và OnCall Shifts</p>
                </div>
                <span class="dsp-badge dsp-badge--primary">${topDiag.length} Mặt bệnh</span>
              </div>

              <div style="display: flex; flex-direction: column; md:flex-row; align-items: center; gap: 1.5rem; flex: 1;">
                <!-- SVG Donut Chart -->
                <div style="flex: 0 0 auto;">
                  ${renderSvgDonutChart(topDiag, 240)}
                </div>

                <!-- Legend Table with Progress Bars -->
                <div style="flex: 1; width: 100%; max-height: 280px; overflow-y: auto; padding-right: 6px;">
                  <div style="display: flex; flex-direction: column; gap: 8px;">
                    ${topDiag.map((item, idx) => `
                      <div style="display: flex; align-items: center; justify-content: space-between; font-size: 0.85rem; padding: 4px 6px; border-radius: 6px; background: var(--color-bg);">
                        <div style="display: flex; align-items: center; gap: 8px; flex: 1; min-width: 0;">
                          <span style="width: 10px; height: 10px; border-radius: 50%; background: ${item.color}; flex-shrink: 0;"></span>
                          <span style="font-weight: 600; color: var(--color-text); text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">
                            ${idx + 1}. ${escapeHtml(item.name)}
                          </span>
                          ${item.icd10 ? `<span style="font-size: 0.7rem; font-family: monospace; background: rgba(2, 132, 199, 0.1); color: var(--color-primary); padding: 1px 4px; border-radius: 4px;">${item.icd10}</span>` : ''}
                        </div>
                        <div style="display: flex; align-items: center; gap: 8px; flex-shrink: 0;">
                          <span style="font-weight: 700; color: var(--color-text);">${item.count} ca</span>
                          <span style="font-size: 0.75rem; color: var(--color-text-muted); width: 32px; text-align: right;">${item.percentage}%</span>
                        </div>
                      </div>
                    `).join('')}
                  </div>
                </div>
              </div>
            </div>

            <!-- 3. Context Distribution & SBAR Handover (Right 5 cols) -->
            <div class="dsp-card dsp-p-6" style="grid-column: span 5; display: flex; flex-direction: column; gap: 1.25rem;">
              
              <!-- Context Distribution -->
              <div>
                <h3 style="margin:0 0 0.75rem 0; font-size: 1.05rem; font-weight: 800; color: var(--color-text);">
                  <i class="fa-solid fa-hospital-user" style="color:var(--dsp-indigo, #6366f1); margin-right:6px;"></i> Phân bố Khoa phòng &amp; Bối cảnh
                </h3>
                <div style="display: flex; flex-direction: column; gap: 8px;">
                  ${contextList.map(ctx => `
                    <div>
                      <div style="display:flex; justify-content:space-between; font-size: 0.8rem; margin-bottom: 2px;">
                        <span style="color:var(--color-text); font-weight: 600;"><i class="${ctx.icon}" style="color:${ctx.color}; margin-right:4px;"></i> ${ctx.label}</span>
                        <span style="color:var(--color-text-muted); font-weight: 700;">${ctx.count} ca (${ctx.percentage}%)</span>
                      </div>
                      <div style="height: 6px; background: var(--color-bg); border-radius: 3px; overflow: hidden;">
                        <div style="height: 100%; width: ${ctx.percentage}%; background: ${ctx.color}; border-radius: 3px; transition: width 0.4s ease;"></div>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>

              <!-- SBAR Submission Rate & 7-Day Activity -->
              <div style="border-top: 1px solid var(--color-border); padding-top: 1rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
                  <h4 style="margin:0; font-size: 0.95rem; font-weight: 800; color: var(--color-text);">
                    <i class="fa-solid fa-file-waveform" style="color: #10b981; margin-right:4px;"></i> Tỷ lệ Bàn giao SBAR Chuẩn
                  </h4>
                  <span style="font-size: 1.1rem; font-weight: 900; color: #10b981;">${analytics.sbarRatio}%</span>
                </div>
                <p class="dsp-text-xs dsp-text-muted" style="margin:0 0 10px 0;">Đã lập ${analytics.totalSbars} phiếu SBAR trên tổng số ${analytics.totalEncounters} lượt tiếp nhận.</p>
                
                <!-- 7-Day Activity Mini-Heatmap -->
                <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px; text-align: center;">
                  ${logs7.map(day => {
                    const bg = day.totalActivities >= 4 ? '#0284c7' : day.totalActivities >= 2 ? '#38bdf8' : day.totalActivities > 0 ? '#bae6fd' : 'var(--color-bg)';
                    const textColor = day.totalActivities >= 2 ? '#fff' : 'var(--color-text)';
                    return `
                      <div style="display:flex; flex-direction:column; align-items:center; gap:2px;">
                        <span style="font-size:0.65rem; color:var(--color-text-muted); font-weight:700;">${day.dayName}</span>
                        <div style="width:100%; height:26px; border-radius:4px; background:${bg}; color:${textColor}; display:flex; align-items:center; justify-content:center; font-size:0.75rem; font-weight:800; border: 1px solid var(--color-border);" title="${day.date}: ${day.totalActivities} hoạt động ${day.hasDuty ? '(Có ca trực)' : ''}">
                          ${day.hasDuty ? '<i class="fa-solid fa-moon" style="font-size:0.65rem;"></i>' : day.totalActivities || '-'}
                        </div>
                      </div>
                    `;
                  }).join('')}
                </div>
              </div>

            </div>

            <!-- 4. Dedicated Gemini API Quick Config Card (Full bottom 12 cols) -->
            <div class="dsp-card dsp-p-6" style="grid-column: span 12; background: linear-gradient(135deg, rgba(15, 23, 42, 0.6), rgba(30, 41, 59, 0.7)); border: 1px solid rgba(56, 189, 248, 0.2);">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem;">
                <div style="max-width: 600px;">
                  <h3 style="margin:0 0 6px 0; font-size: 1.1rem; font-weight: 800; color: #fff; display: flex; align-items: center; gap: 8px;">
                    <i class="fa-solid fa-microchip" style="color: var(--color-primary);"></i> Cấu hình Google Gemini AI Chuyên Trách
                  </h3>
                  <p style="color: #94a3b8; font-size: 0.85rem; margin: 0; line-height: 1.5;">
                    Sử dụng Google Gemini API Miễn phí (Flash 2.0 / 2.5) với ngữ cảnh 1.000.000 tokens để tổng kết bệnh án, tóm tắt tuần và phân tích khuyến cáo EBM. Key được mã hóa lưu trữ hoàn toàn nội bộ trên máy của bạn.
                  </p>
                </div>

                <!-- API Key Inline Input -->
                <div style="flex: 1; min-width: 280px; max-width: 480px;">
                  <form id="formGeminiInsightsKey" style="display: flex; flex-direction: column; gap: 8px;">
                    <div style="display: flex; gap: 6px;">
                      <input
                        type="password"
                        id="geminiInsightsKeyInput"
                        class="dsp-input"
                        placeholder="Dán Gemini API Key (AIzaSy...)"
                        value="${escapeHtml(geminiKey)}"
                        style="background: rgba(0,0,0,0.3); border-color: rgba(255,255,255,0.15); color: #fff; font-size: 0.85rem; font-family: monospace;"
                      />
                      <button type="button" id="btnToggleGeminiKeyVisibility" class="dsp-btn dsp-btn-outline" style="padding: 0 10px; color: #94a3b8;" title="Hiện/Ẩn Key">
                        <i class="fa-solid fa-eye"></i>
                      </button>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                      <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener" style="font-size: 0.75rem; color: #38bdf8; text-decoration: underline;">
                        <i class="fa-solid fa-arrow-up-right-from-square"></i> Lấy Key miễn phí từ Google AI Studio
                      </a>
                      <div style="display: flex; gap: 6px;">
                        <button type="button" id="btnTestGeminiKey" class="dsp-btn dsp-btn-outline dsp-btn-sm" style="font-size: 0.75rem; color: #38bdf8; border-color: rgba(56, 189, 248, 0.4);">
                          <i class="fa-solid fa-bolt"></i> Kiểm tra Key
                        </button>
                        <button type="submit" class="dsp-btn dsp-btn-primary dsp-btn-sm" style="font-size: 0.75rem; font-weight: 700;">
                          <i class="fa-solid fa-floppy-disk"></i> Lưu Key
                        </button>
                      </div>
                    </div>
                    <div id="geminiKeyStatusFeedback" style="font-size: 0.8rem; margin-top: 4px;"></div>
                  </form>
                </div>
              </div>
            </div>

          </div>

        </div>
      </main>
    </div>
  `;
}

function renderMarkdownText(md: string): string {
  if (!md) return '';
  let html = escapeHtml(md);
  
  // Headers
  html = html.replace(/^### (.*$)/gim, '<h4 style="color:var(--color-primary); margin:12px 0 4px 0; font-size:0.95rem;">$1</h4>');
  html = html.replace(/^## (.*$)/gim, '<h3 style="color:var(--color-text); margin:16px 0 6px 0; font-size:1.05rem; font-weight:800;">$1</h3>');
  html = html.replace(/^# (.*$)/gim, '<h2 style="color:var(--color-text); margin:18px 0 8px 0; font-size:1.15rem; font-weight:900;">$1</h2>');
  
  // Bold & Italic
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  
  // Bullet lists
  html = html.replace(/^\- (.*$)/gim, '<li style="margin-bottom:4px;">$1</li>');
  html = html.replace(/(<li.*<\/li>)/s, '<ul style="padding-left:1.25rem; margin:6px 0;">$1</ul>');

  // Line breaks
  html = html.replace(/\n/g, '<br/>');
  html = html.replace(/<br\/><h/g, '<h').replace(/<br\/><ul/g, '<ul').replace(/<\/ul><br\/>/g, '</ul>');
  
  return html;
}

export function mountInsightsController(profileId: string): void {
  const btnTrigger = document.getElementById('btnTriggerWeeklySummary');
  const btnRefresh = document.getElementById('btnRefreshSummary');
  const btnCopy = document.getElementById('btnCopySummary');
  const summaryBox = document.getElementById('aiSummaryContent');
  
  const formKey = document.getElementById('formGeminiInsightsKey');
  const inputKey = document.getElementById('geminiInsightsKeyInput') as HTMLInputElement;
  const btnTestKey = document.getElementById('btnTestGeminiKey');
  const btnToggleEye = document.getElementById('btnToggleGeminiKeyVisibility');
  const statusFeedback = document.getElementById('geminiKeyStatusFeedback');

  // Toggle eye
  btnToggleEye?.addEventListener('click', () => {
    if (!inputKey) return;
    const isPass = inputKey.type === 'password';
    inputKey.type = isPass ? 'text' : 'password';
    btnToggleEye.innerHTML = isPass ? '<i class="fa-solid fa-eye-slash"></i>' : '<i class="fa-solid fa-eye"></i>';
  });

  // Test Key
  btnTestKey?.addEventListener('click', async () => {
    const key = inputKey?.value.trim() || getGeminiApiKey(profileId);
    if (!key) {
      if (statusFeedback) statusFeedback.innerHTML = '<span style="color:#ef4444;"><i class="fa-solid fa-triangle-exclamation"></i> Vui lòng nhập API Key trước.</span>';
      return;
    }

    if (statusFeedback) statusFeedback.innerHTML = '<span style="color:#38bdf8;"><i class="fa-solid fa-spinner fa-spin"></i> Đang kết nối thử nghiệm với Google Gemini...</span>';
    
    const result = await testGeminiConnection(key);
    if (result.success) {
      if (statusFeedback) statusFeedback.innerHTML = `<span style="color:#10b981; font-weight:700;"><i class="fa-solid fa-circle-check"></i> ${result.message}</span>`;
    } else {
      if (statusFeedback) statusFeedback.innerHTML = `<span style="color:#ef4444; font-weight:600;"><i class="fa-solid fa-circle-xmark"></i> ${result.message}</span>`;
    }
  });

  // Save Key
  formKey?.addEventListener('submit', (e) => {
    e.preventDefault();
    const key = inputKey?.value.trim() || '';
    setGeminiApiKey(profileId, key);
    if (statusFeedback) {
      statusFeedback.innerHTML = '<span style="color:#10b981; font-weight:700;"><i class="fa-solid fa-check"></i> Đã lưu Gemini API Key thành công!</span>';
    }
  });

  // Generate Weekly Summary
  const handleGenerateSummary = async () => {
    const key = getGeminiApiKey(profileId);
    if (!key) {
      alert('Vui lòng cấu hình Google Gemini API Key bên dưới trước khi tạo bản tổng kết tuần.');
      inputKey?.focus();
      return;
    }

    const profile = getActiveProfile() || getProfile(profileId);
    if (!profile || !summaryBox) return;

    summaryBox.innerHTML = `
      <div style="text-align:center; padding: 2rem; color: var(--color-primary);">
        <i class="fa-solid fa-spinner fa-spin" style="font-size: 2rem; margin-bottom: 8px;"></i>
        <div style="font-weight: 700;">Gemini AI đang tổng hợp số liệu lâm sàng & phân tích tuần qua...</div>
        <div style="font-size: 0.8rem; color: var(--color-text-muted); margin-top: 4px;">Đang đánh giá chỉ số áp lực, diễn tiến bệnh án SOAP và trích xuất khuyến nghị...</div>
      </div>
    `;

    try {
      const analytics = await calculatePracticeAnalytics(profileId);
      const summaryText = await generateWeeklyClinicalSummaryWithGemini(
        analytics,
        profile.displayName,
        profile.specialty || 'Nội khoa Lâm sàng',
        key
      );

      // Save to history
      const savedRecord = saveWeeklySummary(profileId, {
        weekRange: `Tuần ${new Date().toLocaleDateString('vi-VN')}`,
        summaryText,
        burnoutScore: analytics.burnout.score,
        burnoutLevel: analytics.burnout.level,
        highlights: analytics.topDiagnoses.slice(0, 3).map(d => d.name),
        metricsSnapshot: {
          shiftsCount: analytics.burnout.metrics.shiftsThisWeek,
          soapsCount: analytics.burnout.metrics.soapsThisWeek,
          casesCount: analytics.totalCases,
          sbarsCount: analytics.totalSbars,
          topDiagnosesNames: analytics.topDiagnoses.slice(0, 5).map(d => d.name),
        },
      });

      summaryBox.innerHTML = renderMarkdownText(summaryText);
      const titleEl = document.getElementById('aiSummaryTitle');
      if (titleEl) {
        titleEl.innerText = `Bản Tổng Kết Tuần Lâm Sàng (${formatDate(savedRecord.createdAt)})`;
      }
    } catch (err: any) {
      console.error('Error generating summary:', err);
      summaryBox.innerHTML = `
        <div class="dsp-alert dsp-alert-danger" style="margin: 0;">
          <i class="fa-solid fa-triangle-exclamation"></i> <strong>Lỗi tạo bản tổng kết:</strong> ${escapeHtml(err.message)}
        </div>
      `;
    }
  };

  btnTrigger?.addEventListener('click', handleGenerateSummary);
  btnRefresh?.addEventListener('click', handleGenerateSummary);

  // Copy Summary
  btnCopy?.addEventListener('click', () => {
    const text = summaryBox?.innerText || '';
    if (!text.trim()) return;
    navigator.clipboard.writeText(text).then(() => {
      alert('✅ Đã sao chép nội dung Bản Tổng kết Tuần vào Clipboard!');
    });
  });
}
