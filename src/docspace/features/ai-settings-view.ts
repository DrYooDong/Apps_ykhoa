import { getActiveProfile, updateAISettings } from '../storage';
import { AISettings, AIProvider } from '../types';
import { testConnection } from '../ai/llm-client';

interface PresetConfig {
  name: string;
  provider: AIProvider;
  endpoint: string;
  model: string;
  keyUrl: string;
  badge: string;
  badgeClass: string;
  desc: string;
}

const PRESETS: Record<string, PresetConfig> = {
  groq: {
    name: '⚡ Groq Free (Siêu tốc)',
    provider: 'groq',
    endpoint: 'https://api.groq.com/openai/v1',
    model: 'llama-3.3-70b-versatile',
    keyUrl: 'https://console.groq.com/keys',
    badge: 'Khuyên dùng - 30 RPM',
    badgeClass: 'background: rgba(34, 197, 94, 0.15); color: #16a34a;',
    desc: 'Tốc độ cực nhanh (>300 tok/s). Không cần thẻ tín dụng, lấy key 30 giây.'
  },
  gemini: {
    name: '🧠 Google Gemini Free (1M Context)',
    provider: 'gemini',
    endpoint: 'https://generativelanguage.googleapis.com/v1beta/openai/',
    model: 'gemini-2.0-flash',
    keyUrl: 'https://aistudio.google.com/app/apikey',
    badge: '1.000.000 Tokens PDF/Vision',
    badgeClass: 'background: rgba(59, 130, 246, 0.15); color: #2563eb;',
    desc: 'Context khủng 1M token. Xử lý hồ sơ bệnh án PDF dài + ảnh X-quang/ECG.'
  },
  openrouter: {
    name: '🌐 OpenRouter Free Models',
    provider: 'openrouter',
    endpoint: 'https://openrouter.ai/api/v1',
    model: 'meta-llama/llama-3.3-70b-instruct:free',
    keyUrl: 'https://openrouter.ai/keys',
    badge: '40+ Models Miễn phí',
    badgeClass: 'background: rgba(168, 85, 247, 0.15); color: #9333ea;',
    desc: 'Tổng hợp nhiều mô hình AI miễn phí. Tự động điều hướng nhanh.'
  },
  sambanova: {
    name: '🚀 SambaNova Cloud',
    provider: 'sambanova',
    endpoint: 'https://api.sambanova.ai/v1',
    model: 'Meta-Llama-3.3-70B-Instruct',
    keyUrl: 'https://cloud.sambanova.ai/',
    badge: 'Tốc độ cực cao',
    badgeClass: 'background: rgba(249, 115, 22, 0.15); color: #ea580c;',
    desc: 'Miễn phí với tốc độ tính bằng hàng ngàn tokens/giây.'
  },
  local: {
    name: '💻 Local LLM / 9ROUTER',
    provider: 'custom',
    endpoint: 'http://localhost:20128/v1',
    model: 'local-model',
    keyUrl: '',
    badge: 'Offline 100%',
    badgeClass: 'background: rgba(100, 116, 139, 0.15); color: #475569;',
    desc: 'Chạy mô hình AI ngay trên máy cá nhân qua Ollama / LM Studio / 9ROUTER.'
  }
};

export function renderAISettings(): void {
  const profile = getActiveProfile();
  if (!profile) return;

  const appEl = document.getElementById('app');
  if (!appEl) return;

  const currentSettings: AISettings = profile.aiSettings || {
    enabled: true,
    provider: 'groq',
    endpoint: 'https://api.groq.com/openai/v1',
    model: 'llama-3.3-70b-versatile',
    apiKey: '',
    fallbackEnabled: true,
    secondaryProvider: 'gemini',
    secondaryEndpoint: 'https://generativelanguage.googleapis.com/v1beta/openai/',
    secondaryModel: 'gemini-2.0-flash',
    secondaryApiKey: ''
  };

  appEl.innerHTML = `
    <div class="dsp-page-header">
      <h2><i class="fa-solid fa-microchip"></i> Cấu hình AI & LLM Miễn phí</h2>
      <button class="dsp-btn-outline" id="btnBack">
        <i class="fa-solid fa-arrow-left"></i> Quay lại
      </button>
    </div>
    
    <div class="dsp-card" style="max-width: 720px; margin: 0 auto; margin-top: 1.5rem;">
      <form id="aiSettingsForm" class="dsp-form">

        <!-- Status Toggles -->
        <div style="display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1.5rem;">
          <div class="dsp-form-group checkbox-group" style="padding: 12px; background: rgba(2, 132, 199, 0.08); border-radius: 8px;">
            <input type="checkbox" id="aiEnabled" ${currentSettings.enabled ? 'checked' : ''} />
            <label for="aiEnabled"><strong>Bật Trợ lý AI Lâm sàng (Clinical Memory & Reasoning)</strong></label>
          </div>

          <div class="dsp-form-group checkbox-group" style="padding: 10px; background: rgba(255, 171, 0, 0.1); border: 1px solid var(--color-warning); border-radius: 8px;">
            <input type="checkbox" id="labModeEnabled" ${currentSettings.labModeEnabled ? 'checked' : ''} />
            <label for="labModeEnabled" style="color: var(--color-warning);">Bật Lab Mode (Mở khóa tính năng đang thử nghiệm)</label>
          </div>
        </div>

        <!-- 1-Click Preset Selection Bar -->
        <div style="margin-bottom: 1.5rem;">
          <label style="font-weight: 600; display: block; margin-bottom: 0.5rem;">
            ⚡ Nạp Nhanh Cấu hình LLM API Miễn Phí (1-Click Presets):
          </label>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.5rem;">
            ${Object.entries(PRESETS).map(([key, p]) => `
              <button type="button" class="dsp-btn-outline preset-btn" data-preset="${key}" style="text-align: left; padding: 10px; border-radius: 8px; font-size: 0.85rem;">
                <div style="font-weight: 600;">${p.name}</div>
                <span style="display: inline-block; padding: 2px 6px; border-radius: 4px; font-size: 0.75rem; margin-top: 4px; ${p.badgeClass}">${p.badge}</span>
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Primary Provider Form -->
        <div style="padding: 1rem; border: 1px solid var(--color-border); border-radius: 8px; margin-bottom: 1.5rem; background: var(--color-surface);">
          <h4 style="margin-top: 0; margin-bottom: 1rem; color: var(--color-primary);"><i class="fa-solid fa-server"></i> Provider Chính (Primary LLM Engine)</h4>
          
          <div class="dsp-form-group">
            <label>Endpoint API (OpenAI Compatible Format)</label>
            <input type="url" id="aiEndpoint" value="${currentSettings.endpoint}" required />
          </div>

          <div class="dsp-form-group">
            <label>Tên Model ID</label>
            <input type="text" id="aiModel" value="${currentSettings.model}" required />
          </div>

          <div class="dsp-form-group">
            <label>
              API Key (Khóa Truy Cập)
              <span id="keyLinkContainer" style="margin-left: 8px; font-weight: normal; font-size: 0.85rem;"></span>
            </label>
            <input type="password" id="aiApiKey" value="${currentSettings.apiKey || ''}" placeholder="Nhập sk-... hoặc gsk_..." />
          </div>
        </div>

        <!-- Fallback Engine Section -->
        <div style="padding: 1rem; border: 1px dashed var(--color-info); border-radius: 8px; margin-bottom: 1.5rem; background: rgba(56, 189, 248, 0.05);">
          <div class="dsp-form-group checkbox-group" style="margin-bottom: 1rem;">
            <input type="checkbox" id="fallbackEnabled" ${currentSettings.fallbackEnabled ? 'checked' : ''} />
            <label for="fallbackEnabled"><strong>🔄 Bật Provider Dự phòng (Auto Fallback Engine)</strong></label>
          </div>
          <small style="display: block; color: var(--color-text-muted); margin-bottom: 1rem;">
            Nếu Provider chính bị chạm giới hạn Rate Limit (HTTP 429) hoặc lỗi kết nối, hệ thống sẽ tự động chuyển tiếp câu hỏi sang Provider phụ dưới đây.
          </small>

          <div id="fallbackContainer" style="display: ${currentSettings.fallbackEnabled ? 'block' : 'none'};">
            <div class="dsp-form-group">
              <label>Endpoint Dự phòng (Secondary Endpoint)</label>
              <input type="url" id="secondaryEndpoint" value="${currentSettings.secondaryEndpoint || 'https://generativelanguage.googleapis.com/v1beta/openai/'}" />
            </div>

            <div class="dsp-form-group">
              <label>Model ID Dự phòng</label>
              <input type="text" id="secondaryModel" value="${currentSettings.secondaryModel || 'gemini-2.0-flash'}" />
            </div>

            <div class="dsp-form-group">
              <label>API Key Dự phòng</label>
              <input type="password" id="secondaryApiKey" value="${currentSettings.secondaryApiKey || ''}" placeholder="Nhập API Key dự phòng..." />
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="dsp-actions" style="justify-content: space-between; gap: 1rem;">
          <button type="button" class="dsp-btn-outline" id="btnTestConn">
            <i class="fa-solid fa-wifi"></i> Kiểm tra kết nối API
          </button>
          <button type="submit" class="dsp-btn-primary">
            <i class="fa-solid fa-floppy-disk"></i> Lưu cấu hình AI
          </button>
        </div>
      </form>
      <div id="aiTestResult" style="margin-top: 1rem; font-weight: 500; padding: 10px; border-radius: 6px; display: none;"></div>
    </div>
  `;

  // Update Key Link helper
  const updateKeyLink = (endpoint: string) => {
    const linkEl = document.getElementById('keyLinkContainer');
    if (!linkEl) return;

    let targetUrl = '';
    if (endpoint.includes('groq.com')) targetUrl = PRESETS.groq.keyUrl;
    else if (endpoint.includes('googleapis.com')) targetUrl = PRESETS.gemini.keyUrl;
    else if (endpoint.includes('openrouter.ai')) targetUrl = PRESETS.openrouter.keyUrl;
    else if (endpoint.includes('sambanova.ai')) targetUrl = PRESETS.sambanova.keyUrl;

    if (targetUrl) {
      linkEl.innerHTML = `<a href="${targetUrl}" target="_blank" rel="noopener" style="color: var(--color-primary); text-decoration: underline;"><i class="fa-solid fa-key"></i> Lấy API Key Miễn Phí →</a>`;
    } else {
      linkEl.innerHTML = '';
    }
  };

  const endpointInput = document.getElementById('aiEndpoint') as HTMLInputElement;
  endpointInput?.addEventListener('input', () => updateKeyLink(endpointInput.value));
  updateKeyLink(currentSettings.endpoint);

  // Preset Button Handlers
  document.querySelectorAll('.preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const presetKey = (btn as HTMLElement).dataset.preset;
      if (!presetKey || !PRESETS[presetKey]) return;

      const p = PRESETS[presetKey];
      (document.getElementById('aiEndpoint') as HTMLInputElement).value = p.endpoint;
      (document.getElementById('aiModel') as HTMLInputElement).value = p.model;
      updateKeyLink(p.endpoint);
    });
  });

  // Toggle Fallback visibility
  const fallbackCheckbox = document.getElementById('fallbackEnabled') as HTMLInputElement;
  fallbackCheckbox?.addEventListener('change', () => {
    const container = document.getElementById('fallbackContainer');
    if (container) container.style.display = fallbackCheckbox.checked ? 'block' : 'none';
  });

  // Back Button
  document.getElementById('btnBack')?.addEventListener('click', () => {
    window.history.back();
  });

  // Form Submit Handler
  const form = document.getElementById('aiSettingsForm') as HTMLFormElement;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const endpoint = (document.getElementById('aiEndpoint') as HTMLInputElement).value.trim();
    
    let provider: AIProvider = 'custom';
    if (endpoint.includes('groq.com')) provider = 'groq';
    else if (endpoint.includes('googleapis.com')) provider = 'gemini';
    else if (endpoint.includes('openrouter.ai')) provider = 'openrouter';
    else if (endpoint.includes('sambanova.ai')) provider = 'sambanova';

    const newSettings: AISettings = {
      enabled: (document.getElementById('aiEnabled') as HTMLInputElement).checked,
      labModeEnabled: (document.getElementById('labModeEnabled') as HTMLInputElement).checked,
      provider,
      endpoint,
      model: (document.getElementById('aiModel') as HTMLInputElement).value.trim(),
      apiKey: (document.getElementById('aiApiKey') as HTMLInputElement).value.trim(),
      fallbackEnabled: (document.getElementById('fallbackEnabled') as HTMLInputElement).checked,
      secondaryEndpoint: (document.getElementById('secondaryEndpoint') as HTMLInputElement).value.trim(),
      secondaryModel: (document.getElementById('secondaryModel') as HTMLInputElement).value.trim(),
      secondaryApiKey: (document.getElementById('secondaryApiKey') as HTMLInputElement).value.trim()
    };
    
    updateAISettings(profile.id, newSettings);
    alert('✅ Đã lưu cấu hình AI & Fallback Engine thành công!');
    window.location.hash = '#/docspace';
  });

  // Test Connection Handler
  document.getElementById('btnTestConn')?.addEventListener('click', async () => {
    const endpoint = (document.getElementById('aiEndpoint') as HTMLInputElement).value.trim();
    const model = (document.getElementById('aiModel') as HTMLInputElement).value.trim();
    const apiKey = (document.getElementById('aiApiKey') as HTMLInputElement).value.trim();

    const fallbackEnabled = (document.getElementById('fallbackEnabled') as HTMLInputElement).checked;
    const secondaryEndpoint = (document.getElementById('secondaryEndpoint') as HTMLInputElement).value.trim();
    const secondaryModel = (document.getElementById('secondaryModel') as HTMLInputElement).value.trim();
    const secondaryApiKey = (document.getElementById('secondaryApiKey') as HTMLInputElement).value.trim();
    
    const resultEl = document.getElementById('aiTestResult');
    if (!resultEl) return;
    
    resultEl.style.display = 'block';
    resultEl.style.background = 'rgba(100, 116, 139, 0.1)';
    resultEl.style.color = 'var(--color-text-muted)';
    resultEl.textContent = '⏳ Đang kiểm tra kết nối API tới LLM Server...';

    try {
      const res = await testConnection(endpoint, model, apiKey);
      let msg = `✅ Provider chính thành công! Phản hồi từ LLM: "${res.trim()}"`;

      if (fallbackEnabled && secondaryEndpoint) {
        try {
          const secRes = await testConnection(secondaryEndpoint, secondaryModel, secondaryApiKey);
          msg += `\n✅ Provider dự phòng cũng kết nối tốt ("${secRes.trim()}").`;
        } catch (secErr: any) {
          msg += `\n⚠️ Cảnh báo Provider dự phòng lỗi: ${secErr.message}`;
        }
      }

      resultEl.style.background = 'rgba(34, 197, 94, 0.15)';
      resultEl.style.color = 'var(--color-success)';
      resultEl.textContent = msg;
    } catch (err: any) {
      resultEl.style.background = 'rgba(239, 68, 68, 0.15)';
      resultEl.style.color = 'var(--color-danger)';
      resultEl.textContent = `❌ Kết nối Provider chính thất bại: ${err.message}`;
    }
  });
}
