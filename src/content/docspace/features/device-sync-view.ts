/**
 * DocSpace — Real-Time Bedside Medical Device Sync Hub
 * Phân hệ Kết nối & Giám sát Thiết Bị Y Tế Tại Giường (HL7/FHIR Telemetry)
 */

import { getActiveProfile, getAllSoapPatients } from '../storage';
import { renderSidebar, renderDocSpaceHeader, escapeHtml } from '../docspace-view';
import { DeviceSyncService, MedicalDeviceItem } from '../services/device-sync-service';
import { hospitalAudio } from '../services/telemetry-audio-engine';

export function renderDeviceSyncView(): string {
  const profile = getActiveProfile();
  if (!profile) return '';

  const devices = DeviceSyncService.getDevices();
  const patients = getAllSoapPatients(profile.id);

  return `
    <div class="dsp-layout" id="dspLayout">
      ${renderSidebar(profile, 'studios')}

      <main class="dsp-main" id="dspMain">
        ${renderDocSpaceHeader(profile, 'studios')}

        <div class="dsp-page-content">
          
          <!-- Top Header -->
          <div class="dsp-telemetry-header-bar">
            <div>
              <div class="dsp-telemetry-pill-tag">
                <span class="dsp-live-pulse-dot"></span>
                <span>HL7 v2.5 / FHIR R4 Real-Time Telemetry Interface</span>
              </div>
              <h1 class="dsp-page-title" style="margin-top:4px;">
                <i class="fa-solid fa-satellite-dish" style="color:#10b981;"></i> Trạm Kết Nối &amp; Đồng Bộ Thiết Bị Buồng Bệnh
              </h1>
              <p class="dsp-page-subtitle">
                Đồng bộ đa luồng tín hiệu từ Monitor sinh hiệu, Máy thở ICU, Bơm tiêm điện và Cảm biến đường huyết liên tục CGM.
              </p>
            </div>

            <!-- Audio Alarm Controls -->
            <div class="dsp-audio-controls-box">
              <button type="button" class="dsp-btn dsp-btn-sm dsp-btn-outline" id="btnTestAlarmSound">
                <i class="fa-solid fa-bell"></i> Thử Còi Báo Động IEC
              </button>
              <button type="button" class="dsp-btn dsp-btn-sm dsp-btn-danger" id="btnTestCodeBlue">
                <i class="fa-solid fa-truck-medical"></i> Kích Hoạt Code Blue
              </button>
            </div>
          </div>

          <!-- Connected Devices Grid -->
          <div class="dsp-devices-grid">
            ${devices.map(dev => {
              const activePat = patients.find(p => p.id === dev.patientId) || patients[0];
              const packet = DeviceSyncService.generateTelemetryPacket(dev);
              const isStreaming = dev.status === 'streaming';

              return `
                <div class="dsp-device-card" id="dev-card-${dev.id}">
                  <div class="dsp-device-card-top">
                    <div class="dsp-device-icon-box">
                      <i class="${getDeviceIcon(dev.category)}"></i>
                    </div>
                    <div class="dsp-device-info-main">
                      <h3 class="dsp-device-name">${escapeHtml(dev.name)}</h3>
                      <div class="dsp-device-model">
                        <span>${escapeHtml(dev.model)}</span> • <small>${escapeHtml(dev.serialNumber)}</small>
                      </div>
                    </div>
                    <div class="dsp-device-status-tag dsp-device-status-tag--${dev.status}">
                      <span class="dsp-live-pulse-dot" style="${isStreaming ? '' : 'background:#94a3b8; animation:none;'}"></span>
                      <span>${isStreaming ? 'Đang truyền (5s)' : 'Tạm dừng'}</span>
                    </div>
                  </div>

                  <!-- Bed & Patient Association -->
                  <div class="dsp-device-bed-assoc">
                    <i class="fa-solid fa-bed" style="color:var(--dsp-sky);"></i>
                    <span>Giường <strong>${escapeHtml(dev.bedNumber)}</strong>: ${escapeHtml(activePat?.fullName || 'BN. Nội Trú')}</span>
                  </div>

                  <!-- Live Primary Feed Strip -->
                  <div class="dsp-device-feed-strip">
                    <div class="dsp-feed-item">
                      <span class="dsp-feed-label">Thông Số Chính</span>
                      <div class="dsp-feed-value">
                        <strong>${dev.dataFeed.primaryValue}</strong> <small>${escapeHtml(dev.dataFeed.primaryUnit)}</small>
                      </div>
                    </div>
                    ${dev.dataFeed.secondaryValue !== undefined ? `
                      <div class="dsp-feed-item">
                        <span class="dsp-feed-label">Thông Số Phụ</span>
                        <div class="dsp-feed-value">
                          <strong>${dev.dataFeed.secondaryValue}</strong> <small>${escapeHtml(dev.dataFeed.secondaryUnit || '')}</small>
                        </div>
                      </div>
                    ` : ''}
                    <div class="dsp-feed-item">
                      <span class="dsp-feed-label">Pin Thiết Bị</span>
                      <div class="dsp-feed-value" style="color:${dev.batteryPercent > 20 ? '#10b981' : '#f43f5e'};">
                        <i class="fa-solid fa-battery-three-quarters"></i> <strong>${dev.batteryPercent}%</strong>
                      </div>
                    </div>
                  </div>

                  <!-- Encrypted Packet Preview -->
                  <div class="dsp-device-packet-box">
                    <div class="dsp-packet-header">
                      <span><i class="fa-solid fa-shield-halved" style="color:#10b981;"></i> Gói Tin Viễn Thông (${packet.packetId})</span>
                      <code>${packet.signatureHash.slice(0, 16)}</code>
                    </div>
                    <pre class="dsp-packet-code"><code>${escapeHtml(packet.hl7Segment)}</code></pre>
                  </div>

                  <!-- Actions Footer -->
                  <div class="dsp-device-card-footer">
                    <button type="button" class="dsp-btn dsp-btn-sm dsp-btn-ghost btn-toggle-stream" data-dev-id="${dev.id}">
                      <i class="fa-solid ${isStreaming ? 'fa-pause' : 'fa-play'}"></i> ${isStreaming ? 'Tạm Dừng Stream' : 'Tiếp Tục Stream'}
                    </button>
                    <a href="#/docspace/telemetry?patient=${dev.patientId}" class="dsp-btn dsp-btn-sm dsp-btn-primary">
                      <i class="fa-solid fa-chart-line"></i> Xem Đồ Thị 24h
                    </a>
                  </div>
                </div>
              `;
            }).join('')}
          </div>

        </div>
      </main>
    </div>
  `;
}

function getDeviceIcon(category: string): string {
  switch (category) {
    case 'CARDIAC_TELEMETRY_ECG': return 'fa-solid fa-heart-pulse';
    case 'MECHANICAL_VENTILATOR': return 'fa-solid fa-lungs';
    case 'SYRINGE_INFUSION_PUMP': return 'fa-solid fa-syringe';
    case 'CONTINUOUS_GLUCOSE_MONITOR': return 'fa-solid fa-droplet';
    case 'NIBP_MONITOR': return 'fa-solid fa-gauge-high';
    default: return 'fa-solid fa-microchip';
  }
}

export function mountDeviceSyncController(): void {
  // Test Alarm Sound
  document.getElementById('btnTestAlarmSound')?.addEventListener('click', () => {
    hospitalAudio.playEmergencyAlarm();
  });

  // Test Code Blue Sound
  document.getElementById('btnTestCodeBlue')?.addEventListener('click', () => {
    hospitalAudio.playCodeBlueAlarm();
    alert('🚨 ĐÃ KÍCH HOẠT CÒI BÁO ĐỘNG ĐỎ / CODE BLUE (IEC 60601-1-8 ALARM)!');
  });

  // Toggle Stream button
  document.querySelectorAll('.btn-toggle-stream').forEach(btn => {
    btn.addEventListener('click', () => {
      const devId = btn.getAttribute('data-dev-id');
      if (devId) {
        const devices = DeviceSyncService.getDevices();
        const dev = devices.find(d => d.id === devId);
        if (dev) {
          dev.status = dev.status === 'streaming' ? 'standby' : 'streaming';
          DeviceSyncService.saveDevices(devices);
          const app = document.getElementById('app');
          if (app) {
            app.innerHTML = renderDeviceSyncView();
            mountDeviceSyncController();
          }
        }
      }
    });
  });
}
