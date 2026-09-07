import { getActiveProfile, updateSyncSettings, getSyncAdapter } from '../storage';
import { SyncSettings } from '../types';
import { renderSidebar, renderDocSpaceHeader, escapeHtml } from '../docspace-view';

export function renderSyncSettingsView(profileId: string): string {
  const profile = getActiveProfile();
  if (!profile) return '';

  const currentSettings: SyncSettings = profile.syncSettings || {
    enabled: false,
    provider: 'couchdb',
    remoteUrl: 'https://couchdb.example.com/docspace',
    dbName: 'docspace_db',
    username: '',
    password: '',
    passphrase: '',
    isE2eeEnabled: true,
    autoSync: true,
    autoSyncIntervalSec: 30,
  };

  const adapter = getSyncAdapter(profile.id);
  const currentStatus = adapter.getStatus();

  return `
    <div class="dsp-layout" id="dspLayout">
      ${renderSidebar(profile, 'sync-settings')}
      <main class="dsp-main" id="dspMain">
        ${renderDocSpaceHeader(profile, 'sync-settings')}

        <div class="dsp-page-content">

          <!-- Page Header -->
          <div class="dsp-page-header" style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:1.5rem; flex-wrap:wrap; gap:1rem;">
            <div>
              <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.25rem;">
                <h1 class="dsp-page-title" style="margin:0;"><i class="fa-solid fa-cloud-arrow-up" style="color:var(--dsp-sky);"></i> Cấu hình Đồng bộ Đa Thiết bị (Sync Engine)</h1>
                <span class="dsp-badge" style="background:rgba(14,165,233,0.15); color:var(--dsp-sky); border:1px solid rgba(14,165,233,0.3);">E2EE Encrypted</span>
              </div>
              <p class="dsp-page-subtitle" style="margin:0;">
                Đồng bộ hóa an toàn sổ tay SOAP, SBAR và ca bệnh giữa máy tính phòng khám, laptop và điện thoại.
              </p>
            </div>
            <a href="#/docspace" class="dsp-btn dsp-btn-ghost dsp-btn-sm" id="btnSyncBack">
              <i class="fa-solid fa-arrow-left"></i> Quay lại Dashboard
            </a>
          </div>

          <div style="max-width: 800px; margin: 0 auto;">
            
            <!-- Trạng thái Sync Banner Card -->
            <div class="dsp-card" style="margin-bottom: 1.5rem; border-left: 4px solid var(--dsp-sky);">
              <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
                <div style="display: flex; align-items: center; gap: 1rem;">
                  <div class="dsp-toggle-icon" style="background: rgba(14, 165, 233, 0.15); color: var(--dsp-sky); width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.25rem;">
                    <i class="fa-solid fa-rotate"></i>
                  </div>
                  <div>
                    <h3 style="margin: 0 0 0.25rem 0; font-size: 1.05rem; font-weight: 800; color: var(--color-text);">
                      Trạng thái Kết nối Máy chủ
                    </h3>
                    <div id="syncStatusBadgeContainer" style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
                      ${renderStatusBadgeHtml(currentStatus.state)}
                      <span style="font-size: 0.82rem; color: var(--color-text-muted);">
                        ${currentStatus.lastSyncedAt ? `Đồng bộ gần nhất: ${currentStatus.lastSyncedAt}` : 'Chưa từng đồng bộ'}
                      </span>
                    </div>
                    ${currentStatus.errorMessage ? `<div style="color: var(--color-danger); font-size: 0.82rem; margin-top: 4px;"><i class="fa-solid fa-triangle-exclamation"></i> ${escapeHtml(currentStatus.errorMessage)}</div>` : ''}
                  </div>
                </div>
                <button type="button" class="dsp-btn dsp-btn-primary" id="btnTriggerSyncNow" ${!currentSettings.enabled ? 'disabled' : ''}>
                  <i class="fa-solid fa-rotate"></i> Đồng bộ ngay
                </button>
              </div>
            </div>

            <!-- Form Cấu hình -->
            <div class="dsp-card">
              <form id="syncSettingsForm" class="dsp-form" novalidate>
                
                <!-- Main Sync Switch -->
                <div class="dsp-toggle-card dsp-toggle-card--primary" style="margin-bottom: 1.5rem;">
                  <div class="dsp-toggle-left">
                    <div class="dsp-toggle-icon" style="background: rgba(14, 165, 233, 0.15); color: var(--dsp-sky);">
                      <i class="fa-solid fa-cloud"></i>
                    </div>
                    <div>
                      <div class="dsp-toggle-title">Bật tính năng Đồng bộ Đa thiết bị (Multi-device Sync)</div>
                      <div class="dsp-toggle-subtitle">Tự động sao lưu và đồng bộ ngầm khi thiết bị có kết nối Internet.</div>
                    </div>
                  </div>
                  <label class="dsp-switch">
                    <input type="checkbox" id="syncEnabled" ${currentSettings.enabled ? 'checked' : ''} />
                    <span class="dsp-switch-slider"></span>
                  </label>
                </div>

                <!-- Server Provider & URL -->
                <div class="dsp-form-row dsp-form-row--2">
                  <div class="dsp-form-group">
                    <label class="dsp-label" for="syncProvider">Nền tảng Máy chủ Sync</label>
                    <select id="syncProvider" class="dsp-input">
                      <option value="couchdb" ${currentSettings.provider === 'couchdb' ? 'selected' : ''}>CouchDB / PouchDB Server (Khuyến nghị)</option>
                      <option value="webdav" ${currentSettings.provider === 'webdav' ? 'selected' : ''}>WebDAV Server (Nextcloud / OwnCloud)</option>
                    </select>
                  </div>

                  <div class="dsp-form-group">
                    <label class="dsp-label" for="syncRemoteUrl">Địa chỉ Remote Server URL <span class="dsp-required">*</span></label>
                    <input class="dsp-input" type="url" id="syncRemoteUrl" value="${escapeHtml(currentSettings.remoteUrl)}" placeholder="https://couchdb.example.com/docspace" required />
                    <span class="dsp-hint">URL máy chủ CouchDB hoặc WebDAV cá nhân của bạn</span>
                  </div>
                </div>

                <!-- Username & Password -->
                <div class="dsp-form-row dsp-form-row--2" style="margin-top: 0.5rem;">
                  <div class="dsp-form-group">
                    <label class="dsp-label" for="syncUsername">Tên đăng nhập (Username)</label>
                    <input class="dsp-input" type="text" id="syncUsername" value="${escapeHtml(currentSettings.username || '')}" placeholder="VD: bacsi_an" />
                  </div>

                  <div class="dsp-form-group">
                    <label class="dsp-label" for="syncPassword">Mật khẩu / Auth Token</label>
                    <input class="dsp-input" type="password" id="syncPassword" value="${escapeHtml(currentSettings.password || '')}" placeholder="••••••••" />
                  </div>
                </div>

                <!-- E2EE Encryption Settings -->
                <div style="margin: 1.5rem 0; padding: 1.25rem; border-radius: 1rem; background: rgba(34, 197, 94, 0.04); border: 1px solid rgba(34, 197, 94, 0.25);">
                  <div class="dsp-toggle-card dsp-toggle-card--success" style="background: transparent; border: none; padding: 0; margin-bottom: 0.75rem;">
                    <div class="dsp-toggle-left">
                      <div class="dsp-toggle-icon" style="background: rgba(34, 197, 94, 0.15); color: var(--color-success);">
                        <i class="fa-solid fa-lock"></i>
                      </div>
                      <div>
                        <div class="dsp-toggle-title">Bật Mã hóa Đầu cuối E2EE (AES-GCM 256-bit)</div>
                        <div class="dsp-toggle-subtitle">Dữ liệu được mã hóa trước khi gửi lên máy chủ. Máy chủ không thể đọc được nội dung y khoa!</div>
                      </div>
                    </div>
                    <label class="dsp-switch">
                      <input type="checkbox" id="syncE2ee" ${currentSettings.isE2eeEnabled ? 'checked' : ''} />
                      <span class="dsp-switch-slider"></span>
                    </label>
                  </div>

                  <div class="dsp-form-group" style="margin-bottom: 0; margin-top: 0.75rem;">
                    <label class="dsp-label" for="syncPassphrase">Mật khẩu Mã hóa E2EE (Passphrase cá nhân)</label>
                    <input class="dsp-input" type="password" id="syncPassphrase" value="${escapeHtml(currentSettings.passphrase || '')}" placeholder="Nhập chuỗi bảo mật cá nhân dùng chung trên các thiết bị" />
                    <span class="dsp-hint" style="color: var(--color-warning);"><i class="fa-solid fa-key"></i> Passphrase này chỉ lưu trên máy bạn. Hãy ghi nhớ để mở khóa trên thiết bị khác.</span>
                  </div>
                </div>

                <!-- Auto Sync & Interval -->
                <div class="dsp-form-row dsp-form-row--2">
                  <div class="dsp-form-group" style="justify-content: center;">
                    <div class="dsp-toggle-card" style="padding: 0.75rem 1rem;">
                      <div class="dsp-toggle-left">
                        <i class="fa-solid fa-bolt" style="color: var(--dsp-amber);"></i>
                        <span style="font-weight: 600; font-size: 0.88rem;">Tự động đồng bộ ngầm</span>
                      </div>
                      <label class="dsp-switch">
                        <input type="checkbox" id="syncAuto" ${currentSettings.autoSync ? 'checked' : ''} />
                        <span class="dsp-switch-slider"></span>
                      </label>
                    </div>
                  </div>

                  <div class="dsp-form-group">
                    <label class="dsp-label" for="syncInterval">Chu kỳ tự động (Giây)</label>
                    <input class="dsp-input" type="number" id="syncInterval" value="${currentSettings.autoSyncIntervalSec || 30}" min="10" max="3600" />
                  </div>
                </div>

                <!-- Actions -->
                <div class="dsp-form-actions" style="justify-content: space-between; margin-top: 1.5rem;">
                  <button type="button" class="dsp-btn dsp-btn-outline" id="btnTestSyncConn">
                    <i class="fa-solid fa-wifi"></i> Kiểm tra kết nối máy chủ
                  </button>
                  <button type="submit" class="dsp-btn dsp-btn-primary">
                    <i class="fa-solid fa-floppy-disk"></i> Lưu Cấu Hình Đồng Bộ
                  </button>
                </div>
              </form>

              <div id="syncTestResult" style="margin-top: 1.25rem; font-weight: 600; display: none; padding: 12px 16px; border-radius: 10px; line-height: 1.5;"></div>
            </div>

          </div>

        </div>
      </main>
    </div>
  `;
}

export function mountSyncSettingsController(profileId: string): void {
  const profile = getActiveProfile();
  if (!profile) return;

  const currentSettings: SyncSettings = profile.syncSettings || {
    enabled: false,
    provider: 'couchdb',
    remoteUrl: 'https://couchdb.example.com/docspace',
    dbName: 'docspace_db',
    username: '',
    password: '',
    passphrase: '',
    isE2eeEnabled: true,
    autoSync: true,
    autoSyncIntervalSec: 30,
  };

  const adapter = getSyncAdapter(profile.id);

  document.getElementById('btnSyncBack')?.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.hash = '#/docspace';
  });

  // Listen to status updates
  adapter.onStatusChange((status) => {
    const badgeContainer = document.getElementById('syncStatusBadgeContainer');
    if (badgeContainer) {
      badgeContainer.innerHTML = `
        ${renderStatusBadgeHtml(status.state)}
        <span style="font-size: 0.82rem; color: var(--color-text-muted); margin-left: 8px;">
          ${status.lastSyncedAt ? `Đồng bộ gần nhất: ${status.lastSyncedAt}` : 'Chưa đồng bộ'}
        </span>
      `;
    }
  });

  // Trigger Sync Now button
  document.getElementById('btnTriggerSyncNow')?.addEventListener('click', async () => {
    const btn = document.getElementById('btnTriggerSyncNow') as HTMLButtonElement;
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Đang đồng bộ...';
    }
    
    await adapter.triggerSync(currentSettings);
    
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = '<i class="fa-solid fa-rotate"></i> Đồng bộ ngay';
    }
  });

  // Test connection button
  document.getElementById('btnTestSyncConn')?.addEventListener('click', async () => {
    const settings = getFormSettings();
    const resultEl = document.getElementById('syncTestResult');
    const testBtn = document.getElementById('btnTestSyncConn') as HTMLButtonElement;
    if (!resultEl) return;

    resultEl.style.display = 'block';
    resultEl.style.background = 'rgba(100, 116, 139, 0.1)';
    resultEl.style.color = 'var(--color-text-muted)';
    resultEl.style.border = '1px solid var(--color-border)';
    resultEl.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Đang kết nối đến máy chủ Sync...';
    if (testBtn) testBtn.disabled = true;

    try {
      const res = await adapter.testConnection(settings);
      if (res.success) {
        resultEl.style.background = 'rgba(34, 197, 94, 0.12)';
        resultEl.style.color = 'var(--color-success)';
        resultEl.style.border = '1px solid rgba(34, 197, 94, 0.3)';
        resultEl.innerHTML = '✅ <strong>Kết nối máy chủ Sync thành công:</strong> ' + escapeHtml(res.message);
      } else {
        resultEl.style.background = 'rgba(239, 68, 68, 0.12)';
        resultEl.style.color = 'var(--color-danger)';
        resultEl.style.border = '1px solid rgba(239, 68, 68, 0.3)';
        resultEl.innerHTML = '❌ <strong>Kết nối máy chủ thất bại:</strong> ' + escapeHtml(res.message);
      }
    } catch (err: any) {
      resultEl.style.background = 'rgba(239, 68, 68, 0.12)';
      resultEl.style.color = 'var(--color-danger)';
      resultEl.style.border = '1px solid rgba(239, 68, 68, 0.3)';
      resultEl.innerHTML = '❌ <strong>Lỗi kết nối:</strong> ' + escapeHtml(err.message);
    } finally {
      if (testBtn) testBtn.disabled = false;
    }
  });

  // Form submit
  const form = document.getElementById('syncSettingsForm') as HTMLFormElement;
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const settings = getFormSettings();
    updateSyncSettings(profile.id, settings);
    alert('✅ Đã lưu cấu hình Đồng bộ Đa thiết bị thành công!');
    window.location.hash = '#/docspace';
  });
}

function getFormSettings(): SyncSettings {
  return {
    enabled: (document.getElementById('syncEnabled') as HTMLInputElement).checked,
    provider: (document.getElementById('syncProvider') as HTMLSelectElement).value as any,
    remoteUrl: (document.getElementById('syncRemoteUrl') as HTMLInputElement).value.trim(),
    dbName: 'docspace_db',
    username: (document.getElementById('syncUsername') as HTMLInputElement).value.trim(),
    password: (document.getElementById('syncPassword') as HTMLInputElement).value.trim(),
    passphrase: (document.getElementById('syncPassphrase') as HTMLInputElement).value.trim(),
    isE2eeEnabled: (document.getElementById('syncE2ee') as HTMLInputElement).checked,
    autoSync: (document.getElementById('syncAuto') as HTMLInputElement).checked,
    autoSyncIntervalSec: parseInt((document.getElementById('syncInterval') as HTMLInputElement).value) || 30,
  };
}

function renderStatusBadgeHtml(state: string): string {
  switch (state) {
    case 'synced':
      return '<span class="dsp-badge" style="background: rgba(34, 197, 94, 0.15); color: #16a34a; border:1px solid rgba(34, 197, 94, 0.3);"><i class="fa-solid fa-check-circle"></i> Đã đồng bộ</span>';
    case 'syncing':
      return '<span class="dsp-badge" style="background: rgba(234, 179, 8, 0.15); color: #ca8a04; border:1px solid rgba(234, 179, 8, 0.3);"><i class="fa-solid fa-spinner fa-spin"></i> Đang đồng bộ...</span>';
    case 'error':
      return '<span class="dsp-badge" style="background: rgba(239, 68, 68, 0.15); color: #dc2626; border:1px solid rgba(239, 68, 68, 0.3);"><i class="fa-solid fa-circle-exclamation"></i> Lỗi đồng bộ</span>';
    case 'offline':
      return '<span class="dsp-badge" style="background: rgba(148, 163, 184, 0.15); color: #64748b; border:1px solid rgba(148, 163, 184, 0.3);"><i class="fa-solid fa-wifi"></i> Ngoại tuyến</span>';
    default:
      return '<span class="dsp-badge" style="background: rgba(148, 163, 184, 0.15); color: #64748b; border:1px solid rgba(148, 163, 184, 0.3);"><i class="fa-solid fa-power-off"></i> Chưa bật Sync</span>';
  }
}
