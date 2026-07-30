import { getActiveProfile, updateAISettings } from '../storage';
import { AISettings } from '../types';


export function renderAISettings(): void {
  const profile = getActiveProfile();
  if (!profile) return;

  const appEl = document.getElementById('app');
  if (!appEl) return;

  const currentSettings: AISettings = profile.aiSettings || {
    enabled: true,
    endpoint: 'http://localhost:20128/v1',
    model: 'local-model',
    apiKey: '',
  };

  appEl.innerHTML = `
    <div class="dsp-page-header">
      <h2><i class="fa-solid fa-microchip"></i> Cấu hình AI & LLM</h2>
      <button class="dsp-btn-outline" id="btnBack">
        <i class="fa-solid fa-arrow-left"></i> Quay lại
      </button>
    </div>
    
    <div class="dsp-card" style="max-width: 600px; margin: 0 auto; margin-top: 2rem;">
      <form id="aiSettingsForm" class="dsp-form">
        <div class="dsp-form-group checkbox-group">
          <input type="checkbox" id="aiEnabled" ${currentSettings.enabled ? 'checked' : ''} />
          <label for="aiEnabled">Bật tính năng AI (Context-Aware Clinical Memory)</label>
        </div>

        <div class="dsp-form-group checkbox-group" style="margin-top: 1rem; padding: 10px; background: rgba(255, 171, 0, 0.1); border: 1px solid var(--color-warning); border-radius: 8px;">
          <input type="checkbox" id="labModeEnabled" ${currentSettings.labModeEnabled ? 'checked' : ''} />
          <label for="labModeEnabled" style="color: var(--color-warning);">Bật Lab Mode (Mở khóa tính năng đang thử nghiệm)</label>
        </div>

        <div class="dsp-form-group">
          <label>Endpoint API (OpenAI Compatible)</label>
          <input type="url" id="aiEndpoint" value="${currentSettings.endpoint}" required />
          <small>Mặc định cho 9ROUTER: http://localhost:20128/v1</small>
        </div>

        <div class="dsp-form-group">
          <label>Tên Model</label>
          <input type="text" id="aiModel" value="${currentSettings.model}" required />
        </div>

        <div class="dsp-form-group">
          <label>API Key (Tùy chọn)</label>
          <input type="password" id="aiApiKey" value="${currentSettings.apiKey || ''}" />
        </div>

        <div class="dsp-actions" style="justify-content: space-between;">
          <button type="button" class="dsp-btn-outline" id="btnTestConn">
            <i class="fa-solid fa-wifi"></i> Kiểm tra kết nối
          </button>
          <button type="submit" class="dsp-btn-primary">
            <i class="fa-solid fa-save"></i> Lưu cấu hình
          </button>
        </div>
      </form>
      <div id="aiTestResult" style="margin-top: 1rem; font-weight: bold; display: none;"></div>
    </div>
  `;

  document.getElementById('btnBack')?.addEventListener('click', () => {
    window.history.back();
  });

  const form = document.getElementById('aiSettingsForm') as HTMLFormElement;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const newSettings: AISettings = {
      enabled: (document.getElementById('aiEnabled') as HTMLInputElement).checked,
      labModeEnabled: (document.getElementById('labModeEnabled') as HTMLInputElement).checked,
      endpoint: (document.getElementById('aiEndpoint') as HTMLInputElement).value.trim(),
      model: (document.getElementById('aiModel') as HTMLInputElement).value.trim(),
      apiKey: (document.getElementById('aiApiKey') as HTMLInputElement).value.trim(),
    };
    
    updateAISettings(profile.id, newSettings);
    alert('Đã lưu cấu hình AI thành công!');
    window.location.hash = '#/docspace';
  });

  document.getElementById('btnTestConn')?.addEventListener('click', async () => {
    const endpoint = (document.getElementById('aiEndpoint') as HTMLInputElement).value.trim();
    const model = (document.getElementById('aiModel') as HTMLInputElement).value.trim();
    const apiKey = (document.getElementById('aiApiKey') as HTMLInputElement).value.trim();
    
    const resultEl = document.getElementById('aiTestResult');
    if (!resultEl) return;
    
    resultEl.style.display = 'block';
    resultEl.style.color = 'var(--color-text-muted)';
    resultEl.textContent = 'Đang ping đến LLM Server...';

    try {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (apiKey) headers['Authorization'] = `Bearer ${apiKey}`;
      
      const res = await fetch(`${endpoint.replace(/\/$/, '')}/models`, {
        method: 'GET',
        headers
      });

      if (res.ok) {
        resultEl.style.color = 'var(--color-success)';
        resultEl.textContent = '✅ Kết nối thành công! Server sẵn sàng.';
      } else {
        throw new Error(res.statusText);
      }
    } catch (err: any) {
      resultEl.style.color = 'var(--color-danger)';
      resultEl.textContent = `❌ Kết nối thất bại: ${err.message}. Hãy kiểm tra CORS hoặc xem server đã chạy chưa.`;
    }
  });
}
