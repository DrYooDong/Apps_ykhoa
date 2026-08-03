import { getActiveProfile, updateSyncSettings, getSyncAdapter } from '../storage';
import { SyncSettings } from '../types';

export function renderSyncSettings(): void {
  const profile = getActiveProfile();
  if (!profile) return;

  const appEl = document.getElementById('app');
  if (!appEl) return;

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

  appEl.innerHTML = `
    <div class="dsp-page-header">
      <h2><i class="fa-solid fa-rotate"></i> Cấu hình Đồng bộ Đa Thiết bị (Sync Engine)</h2>
      <button class="dsp-btn-outline" id="btnSyncBack">
        <i class="fa-solid fa-arrow-left"></i> Quay lại
      </button>
    </div>

    <div style="max-width: 700px; margin: 0 auto; margin-top: 1.5rem;">
      <!-- Trạng thái Sync Banner -->
      <div class="dsp-card" style="margin-bottom: 1.5rem; border-left: 4px solid var(--color-primary);">
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <div>
            <h4 style="margin: 0 0 0.5rem 0; color: var(--color-text);">
              <i class="fa-solid fa-cloud-arrow-up"></i> Trạng thái Đồng bộ
            </h4>
            <div id="syncStatusBadgeContainer">
              ${renderStatusBadgeHtml(currentStatus.state)}
              <span style="font-size: 0.85rem; color: var(--color-text-muted); margin-left: 8px;">
                ${currentStatus.lastSyncedAt ? `Đồng bộ gần nhất: ${currentStatus.lastSyncedAt}` : 'Chưa đồng bộ'}
              </span>
            </div>
            ${currentStatus.errorMessage ? `<div style="color: var(--color-danger); font-size: 0.85rem; margin-top: 4px;">${currentStatus.errorMessage}</div>` : ''}
          </div>
          <button type="button" class="dsp-btn-primary" id="btnTriggerSyncNow" ${!currentSettings.enabled ? 'disabled' : ''}>
            <i class="fa-solid fa-sync"></i> Đồng bộ ngay
          </button>
        </div>
      </div>

      <!-- Form Cấu hình -->
      <div class="dsp-card">
        <form id="syncSettingsForm" class="dsp-form">
          <div class="dsp-form-group checkbox-group" style="padding: 10px; background: rgba(2, 132, 199, 0.08); border-radius: 8px;">
            <input type="checkbox" id="syncEnabled" ${currentSettings.enabled ? 'checked' : ''} />
            <label for="syncEnabled" style="font-weight: 600; color: var(--color-primary);">Bật tính năng Đồng bộ Đa thiết bị (Multi-device Sync)</label>
          </div>

          <div class="dsp-form-group">
            <label>Nền tảng Máy chủ Sync</label>
            <select id="syncProvider">
              <option value="couchdb" ${currentSettings.provider === 'couchdb' ? 'selected' : ''}>CouchDB / PouchDB Server (Khuyến nghị)</option>
              <option value="webdav" ${currentSettings.provider === 'webdav' ? 'selected' : ''}>WebDAV Server (Nextcloud / OwnCloud)</option>
            </select>
          </div>

          <div class="dsp-form-group">
            <label>Địa chỉ Remote Server URL</label>
            <input type="url" id="syncRemoteUrl" value="${currentSettings.remoteUrl}" placeholder="https://couchdb.example.com/docspace" required />
            <small>URL máy chủ CouchDB hoặc WebDAV endpoint cá nhân của bạn</small>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
            <div class="dsp-form-group">
              <label>Tên đăng nhập (Username)</label>
              <input type="text" id="syncUsername" value="${currentSettings.username || ''}" placeholder="Bác sĩ / Admin" />
            </div>

            <div class="dsp-form-group">
              <label>Mật khẩu (Password / Token)</label>
              <input type="password" id="syncPassword" value="${currentSettings.password || ''}" placeholder="••••••••" />
            </div>
          </div>

          <hr style="margin: 1.5rem 0; border: none; border-top: 1px dashed var(--color-border);" />

          <!-- E2EE Encryption Settings -->
          <div class="dsp-form-group checkbox-group" style="padding: 10px; background: rgba(34, 197, 94, 0.08); border-radius: 8px;">
            <input type="checkbox" id="syncE2ee" ${currentSettings.isE2eeEnabled ? 'checked' : ''} />
            <label for="syncE2ee" style="font-weight: 600; color: var(--color-success);">
              <i class="fa-solid fa-lock"></i> Bật Mã hóa Đầu cuối E2EE (AES-GCM 256-bit)
            </label>
          </div>

          <div class="dsp-form-group">
            <label>Mật khẩu Mã hóa E2EE (Passphrase)</label>
            <input type="password" id="syncPassphrase" value="${currentSettings.passphrase || ''}" placeholder="Nhập chuỗi bảo mật cá nhân" />
            <small style="color: var(--color-warning);">
              ⚠️ Chỉ có bạn biết Passphrase này. Dữ liệu trước khi đẩy lên cloud sẽ được mã hóa E2EE. Máy chủ không thể đọc được nội dung y khoa!
            </small>
          </div>

          <!-- Auto Sync -->
          <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 1rem;">
            <div class="dsp-form-group checkbox-group" style="align-self: center;">
              <input type="checkbox" id="syncAuto" ${currentSettings.autoSync ? 'checked' : ''} />
              <label for="syncAuto">Tự động đồng bộ ngầm khi có mạng</label>
            </div>
            <div class="dsp-form-group">
              <label>Chu kỳ (Giây)</label>
              <input type="number" id="syncInterval" value="${currentSettings.autoSyncIntervalSec || 30}" min="10" max="3600" />
            </div>
          </div>

          <div class="dsp-actions" style="justify-content: space-between; margin-top: 1.5rem;">
            <button type="button" class="dsp-btn-outline" id="btnTestSyncConn">
              <i class="fa-solid fa-wifi"></i> Kiểm tra kết nối
            </button>
            <button type="submit" class="dsp-btn-primary">
              <i class="fa-solid fa-floppy-disk"></i> Lưu Cấu Hình
            </button>
          </div>
        </form>
        <div id="syncTestResult" style="margin-top: 1rem; font-weight: 500; display: none; padding: 10px; border-radius: 6px;"></div>
      </div>
    </div>
  `;

  document.getElementById('btnSyncBack')?.addEventListener('click', () => {
    window.location.hash = '#/docspace';
  });

  // Listen to status updates
  adapter.onStatusChange((status) => {
    const badgeContainer = document.getElementById('syncStatusBadgeContainer');
    if (badgeContainer) {
      badgeContainer.innerHTML = `
        ${renderStatusBadgeHtml(status.state)}
        <span style="font-size: 0.85rem; color: var(--color-text-muted); margin-left: 8px;">
          ${status.lastSyncedAt ? `Đồng bộ gần nhất: ${status.lastSyncedAt}` : 'Chưa đồng bộ'}
        </span>
      `;
    }
  });

  // Trigger Sync Now button
  document.getElementById('btnTriggerSyncNow')?.addEventListener('click', async () => {
    const btn = document.getElementById('btnTriggerSyncNow') as HTMLButtonElement;
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Đang đồng bộ...';
    
    await adapter.triggerSync(currentSettings);
    
    btn.disabled = false;
    btn.innerHTML = '<i class="fa-solid fa-sync"></i> Đồng bộ ngay';
  });

  // Test connection button
  document.getElementById('btnTestSyncConn')?.addEventListener('click', async () => {
    const settings = getFormSettings();
    const resultEl = document.getElementById('syncTestResult');
    if (!resultEl) return;

    resultEl.style.display = 'block';
    resultEl.style.background = 'var(--color-bg)';
    resultEl.style.color = 'var(--color-text-muted)';
    resultEl.textContent = 'Đang kết nối đến máy chủ Sync...';

    const res = await adapter.testConnection(settings);
    if (res.success) {
      resultEl.style.background = 'rgba(34, 197, 94, 0.1)';
      resultEl.style.color = 'var(--color-success)';
      resultEl.textContent = '✅ ' + res.message;
    } else {
      resultEl.style.background = 'rgba(239, 68, 68, 0.1)';
      resultEl.style.color = 'var(--color-danger)';
      resultEl.textContent = '❌ ' + res.message;
    }
  });

  // Form submit
  const form = document.getElementById('syncSettingsForm') as HTMLFormElement;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const settings = getFormSettings();
    updateSyncSettings(profile.id, settings);
    alert('Đã lưu cấu hình Đồng bộ Đa thiết bị!');
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
      return '<span style="background: rgba(34, 197, 94, 0.15); color: #16a34a; padding: 4px 8px; border-radius: 12px; font-weight: 600; font-size: 0.8rem;"><i class="fa-solid fa-check-circle"></i> Đã đồng bộ</span>';
    case 'syncing':
      return '<span style="background: rgba(234, 179, 8, 0.15); color: #ca8a04; padding: 4px 8px; border-radius: 12px; font-weight: 600; font-size: 0.8rem;"><i class="fa-solid fa-spinner fa-spin"></i> Đang đồng bộ...</span>';
    case 'error':
      return '<span style="background: rgba(239, 68, 68, 0.15); color: #dc2626; padding: 4px 8px; border-radius: 12px; font-weight: 600; font-size: 0.8rem;"><i class="fa-solid fa-circle-exclamation"></i> Lỗi đồng bộ</span>';
    case 'offline':
      return '<span style="background: rgba(148, 163, 184, 0.15); color: #64748b; padding: 4px 8px; border-radius: 12px; font-weight: 600; font-size: 0.8rem;"><i class="fa-solid fa-wifi"></i> Ngoại tuyến</span>';
    default:
      return '<span style="background: rgba(148, 163, 184, 0.15); color: #64748b; padding: 4px 8px; border-radius: 12px; font-weight: 600; font-size: 0.8rem;"><i class="fa-solid fa-power-off"></i> Chưa bật Sync</span>';
  }
}
