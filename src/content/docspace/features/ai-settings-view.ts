import { getActiveProfile, updateAISettings, getGeminiApiKey, setGeminiApiKey } from '../storage';
import { AISettings, AIProvider } from '../types';
import { testConnection } from '../ai/llm-client';
import { renderSidebar, renderDocSpaceHeader, escapeHtml } from '../docspace-view';

interface PresetConfig {
  name: string;
  provider: AIProvider;
  endpoint: string;
  model: string;
  keyUrl: string;
  badge: string;
  badgeClass: string;
  icon: string;
  desc: string;
}

const PRESETS: Record<string, PresetConfig> = {
  groq: {
    name: 'Groq Free (Siêu tốc)',
    provider: 'groq',
    endpoint: 'https://api.groq.com/openai/v1',
    model: 'llama-3.3-70b-versatile',
    keyUrl: 'https://console.groq.com/keys',
    badge: 'Khuyên dùng · 30 RPM',
    badgeClass: 'background: rgba(34, 197, 94, 0.15); color: #16a34a;',
    icon: 'fa-solid fa-bolt',
    desc: 'Tốc độ cực nhanh (>300 tok/s). Hoàn toàn miễn phí, lấy API key trong 30 giây.'
  },
  gemini: {
    name: 'Google Gemini (1M Context)',
    provider: 'gemini',
    endpoint: 'https://generativelanguage.googleapis.com/v1beta/openai/',
    model: 'gemini-2.0-flash',
    keyUrl: 'https://aistudio.google.com/app/apikey',
    badge: '1.000.000 Tokens · PDF/Vision',
    badgeClass: 'background: rgba(59, 130, 246, 0.15); color: #2563eb;',
    icon: 'fa-solid fa-brain',
    desc: 'Context 1 triệu tokens. Xử lý hồ sơ bệnh án PDF dài, tóm tắt tuần & ảnh X-quang/ECG.'
  },
  openrouter: {
    name: 'OpenRouter Free Hub',
    provider: 'openrouter',
    endpoint: 'https://openrouter.ai/api/v1',
    model: 'meta-llama/llama-3.3-70b-instruct:free',
    keyUrl: 'https://openrouter.ai/keys',
    badge: '40+ Models Miễn phí',
    badgeClass: 'background: rgba(168, 85, 247, 0.15); color: #9333ea;',
    icon: 'fa-solid fa-globe',
    desc: 'Tổng hợp nhiều mô hình AI miễn phí. Tự động điều hướng và cân bằng tải.'
  },
  sambanova: {
    name: 'SambaNova Cloud',
    provider: 'sambanova',
    endpoint: 'https://api.sambanova.ai/v1',
    model: 'Meta-Llama-3.3-70B-Instruct',
    keyUrl: 'https://cloud.sambanova.ai/',
    badge: 'Tốc độ phần cứng RDU',
    badgeClass: 'background: rgba(249, 115, 22, 0.15); color: #ea580c;',
    icon: 'fa-solid fa-rocket',
    desc: 'Tốc độ suy luận hàng ngàn tokens/giây, tối ưu cho phân tích lâm sàng tức thì.'
  },
  local: {
    name: 'Local LLM / 9ROUTER',
    provider: 'custom',
    endpoint: 'http://localhost:20128/v1',
    model: 'local-model',
    keyUrl: '',
    badge: 'Offline 100% · Riêng tư tuyệt đối',
    badgeClass: 'background: rgba(100, 116, 139, 0.15); color: #475569;',
    icon: 'fa-solid fa-laptop-code',
    desc: 'Chạy trực tiếp trên máy bác sĩ qua Ollama / LM Studio / 9ROUTER. Không gửi data ra ngoài.'
  }
};

export function renderAISettingsView(profileId: string): string {
  const profile = getActiveProfile();
  if (!profile) return '';

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

  return `
    <div class="dsp-layout" id="dspLayout">
      ${renderSidebar(profile, 'ai-settings')}
      <main class="dsp-main" id="dspMain">
        ${renderDocSpaceHeader(profile, 'ai-settings')}

        <div class="dsp-page-content">

          <!-- Page Top Breadcrumb & Header -->
          <div class="dsp-page-header" style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:1.5rem; flex-wrap:wrap; gap:1rem;">
            <div>
              <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.25rem;">
                <h1 class="dsp-page-title" style="margin:0;"><i class="fa-solid fa-microchip" style="color:var(--dsp-violet);"></i> Cấu hình AI Co-Pilot &amp; LLM Miễn Phí</h1>
                <span class="dsp-badge" style="background:rgba(139,92,246,0.15); color:var(--dsp-violet); border:1px solid rgba(139,92,246,0.3);">Local-First &amp; BYOK</span>
              </div>
              <p class="dsp-page-subtitle" style="margin:0;">
                Tự do kết nối API AI đa nền tảng. Khóa API và dữ liệu lâm sàng được bảo mật cục bộ trên thiết bị của bạn.
              </p>
            </div>
            <a href="#/docspace" class="dsp-btn dsp-btn-ghost dsp-btn-sm" id="btnBack">
              <i class="fa-solid fa-arrow-left"></i> Quay lại Dashboard
            </a>
          </div>

          <div style="max-width: 860px; margin: 0 auto;">
            <form id="aiSettingsForm" class="dsp-form" novalidate>

              <!-- Section 1: Activation Switches -->
              <div style="display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1.5rem;">
                
                <!-- Main AI Toggle Card -->
                <div class="dsp-toggle-card dsp-toggle-card--primary">
                  <div class="dsp-toggle-left">
                    <div class="dsp-toggle-icon" style="background: rgba(14, 165, 233, 0.15); color: var(--dsp-sky);">
                      <i class="fa-solid fa-brain"></i>
                    </div>
                    <div>
                      <div class="dsp-toggle-title">Bật Trợ lý AI Lâm sàng (Clinical Memory &amp; Reasoning Co-Pilot)</div>
                      <div class="dsp-toggle-subtitle">Hỗ trợ gợi ý SOAP, tóm tắt SBAR, cảnh báo tương tác thuốc và tra cứu Guidelines tự động.</div>
                    </div>
                  </div>
                  <label class="dsp-switch">
                    <input type="checkbox" id="aiEnabled" ${currentSettings.enabled ? 'checked' : ''} />
                    <span class="dsp-switch-slider"></span>
                  </label>
                </div>

                <!-- Lab Mode Toggle Card -->
                <div class="dsp-toggle-card dsp-toggle-card--warning">
                  <div class="dsp-toggle-left">
                    <div class="dsp-toggle-icon" style="background: rgba(245, 158, 11, 0.15); color: var(--dsp-amber);">
                      <i class="fa-solid fa-flask"></i>
                    </div>
                    <div>
                      <div class="dsp-toggle-title">Bật AI Lab Mode (Mở khóa tính năng thử nghiệm)</div>
                      <div class="dsp-toggle-subtitle">Kích hoạt Phác đồ động (Living Protocols), Sandbox tương tác thuốc &amp; Trình giả lập OSCE.</div>
                    </div>
                  </div>
                  <label class="dsp-switch">
                    <input type="checkbox" id="labModeEnabled" ${currentSettings.labModeEnabled ? 'checked' : ''} />
                    <span class="dsp-switch-slider"></span>
                  </label>
                </div>

              </div>

              <!-- Section 2: 1-Click Presets Bar -->
              <div class="dsp-card" style="margin-bottom: 1.5rem;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
                  <label class="dsp-label" style="margin:0; font-size:0.95rem;">
                    <span><i class="fa-solid fa-bolt" style="color:var(--dsp-amber);"></i> <strong>Nạp Nhanh Cấu hình LLM API Miễn Phí (1-Click Presets)</strong></span>
                  </label>
                  <span style="font-size:0.75rem; color:var(--color-text-muted);">Bấm chọn để tự điền Endpoint &amp; Model</span>
                </div>
                
                <div class="dsp-preset-grid">
                  ${Object.entries(PRESETS).map(([key, p]) => `
                    <button type="button" class="dsp-preset-card preset-btn" data-preset="${key}" id="preset-${key}">
                      <div class="dsp-preset-card-title">
                        <i class="${p.icon}" style="color:var(--dsp-sky);"></i>
                        <span>${p.name}</span>
                      </div>
                      <span class="dsp-preset-badge" style="${p.badgeClass}">${p.badge}</span>
                      <div class="dsp-preset-desc">${p.desc}</div>
                    </button>
                  `).join('')}
                </div>
              </div>

              <!-- Section 3: Primary Provider Form -->
              <div class="dsp-card" style="margin-bottom: 1.5rem; border-left: 4px solid var(--dsp-sky);">
                <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:1.25rem;">
                  <span style="width:32px; height:32px; border-radius:8px; background:rgba(14,165,233,0.15); color:var(--dsp-sky); display:flex; align-items:center; justify-content:center; font-size:1rem;">
                    <i class="fa-solid fa-server"></i>
                  </span>
                  <div>
                    <h3 style="margin:0; font-size:1.05rem; font-weight:800; color:var(--color-text);">Provider Chính (Primary LLM Engine)</h3>
                    <span style="font-size:0.78rem; color:var(--color-text-muted);">Mô hình xử lý chính cho toàn bộ tác vụ chẩn đoán, SOAP và tra cứu</span>
                  </div>
                </div>

                <div class="dsp-form-row dsp-form-row--2">
                  <div class="dsp-form-group">
                    <label class="dsp-label" for="aiEndpoint">Endpoint API (Chuẩn OpenAI Compatible) <span class="dsp-required">*</span></label>
                    <input class="dsp-input" type="url" id="aiEndpoint" value="${escapeHtml(currentSettings.endpoint)}" placeholder="https://api.groq.com/openai/v1" required />
                    <span class="dsp-hint">Base URL của nhà cung cấp LLM (Groq, OpenAI, Gemini API, OpenRouter...)</span>
                  </div>

                  <div class="dsp-form-group">
                    <label class="dsp-label" for="aiModel">Tên Model ID <span class="dsp-required">*</span></label>
                    <input class="dsp-input" type="text" id="aiModel" value="${escapeHtml(currentSettings.model)}" placeholder="llama-3.3-70b-versatile" required />
                    <span class="dsp-hint">VD: <code>llama-3.3-70b-versatile</code>, <code>gemini-2.0-flash</code></span>
                  </div>
                </div>

                <div class="dsp-form-group" style="margin-top:0.5rem;">
                  <div class="dsp-label">
                    <span>API Key (Khóa Truy Cập)</span>
                    <span id="keyLinkContainer"></span>
                  </div>
                  <div class="dsp-input-group">
                    <input class="dsp-input" type="password" id="aiApiKey" value="${escapeHtml(currentSettings.apiKey || '')}" placeholder="Nhập sk-... hoặc gsk_..." autocomplete="off" />
                    <button type="button" class="dsp-input-icon" id="toggleAiApiKey" title="Hiện/ẩn API Key">
                      <i class="fa-solid fa-eye"></i>
                    </button>
                  </div>
                  <span class="dsp-hint"><i class="fa-solid fa-shield-halved" style="color:var(--color-success);"></i> Khóa được lưu trực tiếp trên trình duyệt cá nhân (LocalStorage/IndexedDB), không bao giờ gửi qua máy chủ trung gian.</span>
                </div>
              </div>

              <!-- Section 4: Fallback Engine Section -->
              <div class="dsp-card" style="margin-bottom: 1.5rem; border: 1px dashed rgba(56, 189, 248, 0.4); background: rgba(56, 189, 248, 0.03);">
                <div class="dsp-toggle-card" style="background:transparent; border:none; padding:0; margin-bottom:0.75rem;">
                  <div class="dsp-toggle-left">
                    <div class="dsp-toggle-icon" style="background:rgba(56,189,248,0.15); color:var(--dsp-sky);">
                      <i class="fa-solid fa-rotate"></i>
                    </div>
                    <div>
                      <div class="dsp-toggle-title">🔄 Bật Provider Dự phòng (Auto Fallback Engine)</div>
                      <div class="dsp-toggle-subtitle">Tự động chuyển tiếp câu hỏi khi Provider chính bị Rate Limit (HTTP 429) hoặc timeout.</div>
                    </div>
                  </div>
                  <label class="dsp-switch">
                    <input type="checkbox" id="fallbackEnabled" ${currentSettings.fallbackEnabled ? 'checked' : ''} />
                    <span class="dsp-switch-slider"></span>
                  </label>
                </div>

                <div id="fallbackContainer" style="display: ${currentSettings.fallbackEnabled ? 'block' : 'none'}; padding-top:1rem; border-top:1px dashed var(--color-border); margin-top:0.75rem;">
                  <div class="dsp-form-row dsp-form-row--2">
                    <div class="dsp-form-group">
                      <label class="dsp-label" for="secondaryEndpoint">Endpoint Dự phòng (Secondary Endpoint)</label>
                      <input class="dsp-input" type="url" id="secondaryEndpoint" value="${escapeHtml(currentSettings.secondaryEndpoint || 'https://generativelanguage.googleapis.com/v1beta/openai/')}" />
                    </div>

                    <div class="dsp-form-group">
                      <label class="dsp-label" for="secondaryModel">Model ID Dự phòng</label>
                      <input class="dsp-input" type="text" id="secondaryModel" value="${escapeHtml(currentSettings.secondaryModel || 'gemini-2.0-flash')}" />
                    </div>
                  </div>

                  <div class="dsp-form-group" style="margin-top:0.5rem; margin-bottom:0;">
                    <label class="dsp-label" for="secondaryApiKey">API Key Dự phòng</label>
                    <div class="dsp-input-group">
                      <input class="dsp-input" type="password" id="secondaryApiKey" value="${escapeHtml(currentSettings.secondaryApiKey || '')}" placeholder="Nhập API Key dự phòng..." autocomplete="off" />
                      <button type="button" class="dsp-input-icon" id="toggleSecondaryApiKey" title="Hiện/ẩn API Key">
                        <i class="fa-solid fa-eye"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Section 5: Gemini Dedicated Engine Section -->
              <div class="dsp-card" style="margin-bottom: 1.5rem; border: 1px solid rgba(59, 130, 246, 0.35); background: rgba(59, 130, 246, 0.03);">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem; flex-wrap:wrap; gap:0.5rem;">
                  <div style="display:flex; align-items:center; gap:0.5rem;">
                    <span style="width:30px; height:30px; border-radius:8px; background:rgba(59,130,246,0.15); color:#2563eb; display:flex; align-items:center; justify-content:center; font-size:0.95rem;">
                      <i class="fa-solid fa-sparkles"></i>
                    </span>
                    <div>
                      <h4 style="margin:0; color:#2563eb; font-weight:800; font-size:0.95rem;">Google Gemini AI Chuyên Trách (CRCE v3.0 &amp; EBM 1M Context)</h4>
                      <div style="font-size:0.75rem; color:var(--color-text-muted);">Cung cấp trí tuệ nhân tạo cho 5 Bước Chuỗi Phản Ứng Liên Hoàn (Symptom Analyzer, Auto Criteria Tick, Protocol Advisor, Drug Safety, Complications).</div>
                    </div>
                  </div>
                  <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener" class="dsp-btn dsp-btn-ghost dsp-btn-sm" style="font-size:0.78rem; color:#2563eb; border-color:rgba(59,130,246,0.3);">
                    <i class="fa-solid fa-key"></i> Lấy Gemini Key miễn phí →
                  </a>
                </div>

                <div class="dsp-form-group" style="margin-bottom:0; margin-top:0.75rem;">
                  <label class="dsp-label" for="geminiApiKey">Google Gemini API Key (Dùng cho CRCE &amp; Insights)</label>
                  <div class="dsp-input-group">
                    <input class="dsp-input" type="password" id="geminiApiKey" value="${escapeHtml(currentSettings.geminiApiKey || getGeminiApiKey(profile.id) || '')}" placeholder="Dán Gemini API Key của bạn..." autocomplete="off" />
                    <button type="button" class="dsp-input-icon" id="toggleGeminiApiKey" title="Hiện/ẩn API Key">
                      <i class="fa-solid fa-eye"></i>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="dsp-form-actions" style="justify-content:space-between; flex-wrap:wrap; gap:1rem;">
                <button type="button" class="dsp-btn dsp-btn-outline" id="btnTestConn">
                  <i class="fa-solid fa-wifi"></i> Kiểm tra kết nối API
                </button>
                <button type="submit" class="dsp-btn dsp-btn-primary" id="btnSaveAISettings">
                  <i class="fa-solid fa-floppy-disk"></i> Lưu Cấu Hình AI
                </button>
              </div>

              <!-- Test Result Box -->
              <div id="aiTestResult" style="margin-top:1.25rem; font-weight:600; padding:12px 16px; border-radius:10px; display:none; line-height:1.5;"></div>

            </form>
          </div>

        </div>
      </main>
    </div>
  `;
}

export function mountAISettingsController(profileId: string): void {
  const profile = getActiveProfile();
  if (!profile) return;

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

  // Helper to toggle password visibility
  const setupPasswordToggle = (btnId: string, inputId: string) => {
    const btn = document.getElementById(btnId);
    const input = document.getElementById(inputId) as HTMLInputElement;
    if (!btn || !input) return;

    btn.addEventListener('click', () => {
      const isPassword = input.type === 'password';
      input.type = isPassword ? 'text' : 'password';
      btn.innerHTML = `<i class="fa-solid fa-${isPassword ? 'eye-slash' : 'eye'}"></i>`;
    });
  };

  setupPasswordToggle('toggleAiApiKey', 'aiApiKey');
  setupPasswordToggle('toggleSecondaryApiKey', 'secondaryApiKey');
  setupPasswordToggle('toggleGeminiApiKey', 'geminiApiKey');

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
      linkEl.innerHTML = `<a href="${targetUrl}" target="_blank" rel="noopener" style="color: var(--dsp-sky); text-decoration: underline; font-weight: 600;"><i class="fa-solid fa-key"></i> Lấy API Key Miễn Phí →</a>`;
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

      document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('dsp-preset-card--active'));
      btn.classList.add('dsp-preset-card--active');

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
  document.getElementById('btnBack')?.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.hash = '#/docspace';
  });

  // Form Submit Handler
  const form = document.getElementById('aiSettingsForm') as HTMLFormElement;
  form?.addEventListener('submit', (e) => {
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
      secondaryApiKey: (document.getElementById('secondaryApiKey') as HTMLInputElement).value.trim(),
      geminiApiKey: (document.getElementById('geminiApiKey') as HTMLInputElement)?.value.trim() || ''
    };
    
    if (newSettings.geminiApiKey) {
      setGeminiApiKey(profile.id, newSettings.geminiApiKey);
    }
    
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
    const testBtn = document.getElementById('btnTestConn') as HTMLButtonElement;
    if (!resultEl) return;
    
    resultEl.style.display = 'block';
    resultEl.style.background = 'rgba(100, 116, 139, 0.1)';
    resultEl.style.color = 'var(--color-text-muted)';
    resultEl.style.border = '1px solid var(--color-border)';
    resultEl.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Đang kiểm tra kết nối API tới LLM Server...';
    if (testBtn) testBtn.disabled = true;

    try {
      const res = await testConnection(endpoint, model, apiKey);
      let msg = `✅ <strong>Provider chính kết nối thành công!</strong> Phản hồi từ LLM: <em>"${res.trim()}"</em>`;

      if (fallbackEnabled && secondaryEndpoint) {
        try {
          const secRes = await testConnection(secondaryEndpoint, secondaryModel, secondaryApiKey);
          msg += `<br>✅ <strong>Provider dự phòng kết nối tốt:</strong> <em>"${secRes.trim()}"</em>`;
        } catch (secErr: any) {
          msg += `<br>⚠️ <strong>Cảnh báo Provider dự phòng lỗi:</strong> ${secErr.message}`;
        }
      }

      resultEl.style.background = 'rgba(34, 197, 94, 0.12)';
      resultEl.style.color = 'var(--color-success)';
      resultEl.style.border = '1px solid rgba(34, 197, 94, 0.3)';
      resultEl.innerHTML = msg;
    } catch (err: any) {
      resultEl.style.background = 'rgba(239, 68, 68, 0.12)';
      resultEl.style.color = 'var(--color-danger)';
      resultEl.style.border = '1px solid rgba(239, 68, 68, 0.3)';
      resultEl.innerHTML = `❌ <strong>Kết nối Provider chính thất bại:</strong> ${err.message}`;
    } finally {
      if (testBtn) testBtn.disabled = false;
    }
  });
}
