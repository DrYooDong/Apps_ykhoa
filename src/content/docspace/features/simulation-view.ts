import { DRUG_INTERACTIONS, DrugInteractionRule } from '../data/drug-interactions';
import { getActiveProfile } from '../storage';
import { analyzeDrugInteractionsWithAI, generateClinicalScenario } from '../ai/llm-client';
import { renderSidebar, renderDocSpaceHeader, escapeHtml } from '../docspace-view';
import { DiagnosticPathFinder, DiagnosticGraphData, OptimizationCriteria } from '../../../simulators/diagnostic-path-finder';
import { ClinicalStepPlayer, ScenarioData } from '../../../simulators/clinical-step-player';

// Sample Datasets for Instant Interactive Simulation
const SAMPLE_CHEST_PAIN_GRAPH: DiagnosticGraphData = {
  nodes: [
    // Symptoms (Source Nodes)
    { id: 's1', label: 'Đau ngực sau xương ức', type: 'symptom' },
    { id: 's2', label: 'Khó thở cấp tính', type: 'symptom' },
    { id: 's3', label: 'Vã mồ hôi & Buồn nôn', type: 'symptom' },
    { id: 's4', label: 'Đau tăng khi hít sâu', type: 'symptom' },

    // Tests (Steiner Intermediate Nodes)
    { id: 't1', label: 'ECG 12 chuyển đạo', type: 'test', cost: 50, timeMinutes: 5, risk: 1 },
    { id: 't2', label: 'Troponin I/T hs', type: 'test', cost: 180, timeMinutes: 30, risk: 1 },
    { id: 't3', label: 'X-quang ngực thẳng', type: 'test', cost: 90, timeMinutes: 15, risk: 1 },
    { id: 't4', label: 'D-Dimer định lượng', type: 'test', cost: 220, timeMinutes: 40, risk: 1 },
    { id: 't5', label: 'CT Động mạch Phổi', type: 'test', cost: 1200, timeMinutes: 45, risk: 3 },
    { id: 't6', label: 'Siêu âm tim tại giường (POCUS)', type: 'test', cost: 150, timeMinutes: 15, risk: 1 },

    // Diagnoses (Target Nodes)
    { id: 'd1', label: 'NMCT Cấp ST Chênh Lên (STEMI)', type: 'disease' },
    { id: 'd2', label: 'Thuyên Tắc Phổi Cấp (PE)', type: 'disease' },
    { id: 'd3', label: 'Bóc Tách ĐMC Ngực (Aortic Dissection)', type: 'disease' },
    { id: 'd4', label: 'Tràn Khí Màng Phổi Áp Lực', type: 'disease' }
  ],
  edges: [
    // Symptom -> Test
    { source: 's1', target: 't1', condition: 'Đo ngay 10p' },
    { source: 's1', target: 't2', condition: 'Sau 0h-3h' },
    { source: 's2', target: 't3', condition: 'Tầm soát' },
    { source: 's2', target: 't4', condition: 'Nếu Wells ≥ 2' },
    { source: 's3', target: 't1' },
    { source: 's4', target: 't3' },
    { source: 's4', target: 't6' },

    // Test -> Disease
    { source: 't1', target: 'd1', condition: 'ST chênh ≥1mm' },
    { source: 't2', target: 'd1', condition: 'Tăng động học' },
    { source: 't4', target: 't5', condition: 'D-dimer (+)' },
    { source: 't5', target: 'd2', condition: 'Huyết khối ĐMP' },
    { source: 't6', target: 'd3', condition: 'Flap nội mạc' },
    { source: 't3', target: 'd4', condition: 'Đường màng phổi' }
  ]
};

const SAMPLE_SCENARIOS: Record<string, ScenarioData> = {
  acls_vf: {
    title: 'Hồi Sức Ngừng Tuần Hoàn Nâng Cao (ACLS) — Rung Thất Vô Mạch (VF/pVT)',
    totalDurationSeconds: 360,
    steps: [
      { time: 0, actionTitle: 'Phát hiện ngừng tuần hoàn & Khởi động Code Blue', actionDesc: 'Bệnh nhân mất ý thức, không thở, không bắt được mạch cảnh. Gọi hỗ trợ khẩn, lấy máy khử rung và bắt đầu ép tim chất lượng cao (100-120 l/p).', cprStatus: 'normal' },
      { time: 30, actionTitle: 'Gắn Bản Điện Cực Monitor & Phân Tích Nhịp', actionDesc: 'Monitor hiển thị Rung Thất (Ventricular Fibrillation - VF) sóng thô. Nhịp có chỉ định sốc điện (Shockable Rhythm)!', cprStatus: 'shock', alert: 'Sạc máy sốc điện ngay lập tức, không ngừng ép tim trong lúc sạc.' },
      { time: 60, actionTitle: 'SỐC ĐIỆN LẦN 1: 200J Biphasic & CPR Chu Kỳ 1', actionDesc: 'Clear an toàn ➔ Sốc điện 200J. Tiếp tục ép tim ngay lập tức chu kỳ 2 phút. Thiết lập đường truyền tĩnh mạch ngoại biên (IV) hoặc trong xương (IO).', cprStatus: 'shock' },
      { time: 180, actionTitle: 'Hết Chu Kỳ 1 (T+2P) ➔ Phân Tích Nhịp & SỐC ĐIỆN LẦN 2', actionDesc: 'Kiểm tra nhanh ≤ 10s: Vẫn còn VF ➔ Sốc điện 200J lần 2. Tiếp tục CPR ngay lập tức chu kỳ 2.', cprStatus: 'shock' },
      { time: 210, actionTitle: 'Tiêm Adrenaline 1mg IV/IO Bolus', actionDesc: 'Tiêm Adrenaline 1mg (1 ống 1mg/1ml pha loãng) + Bơm tráng 20ml NaCl 0.9%, nâng cao chi. Lặp lại mỗi 3-5 phút.', cprStatus: 'drug' },
      { time: 300, actionTitle: 'Hết Chu Kỳ 2 (T+4P) ➔ SỐC ĐIỆN LẦN 3 & Tiêm Amiodarone 300mg', actionDesc: 'Vẫn còn VF dai dẳng ➔ Sốc điện 200J lần 3. Tiếp tục CPR. Chỉ định Tiêm Amiodarone 300mg IV Bolus.', cprStatus: 'drug', alert: 'Amiodarone liều đầu 300mg. Liều nhắc lại sau 3-5 phút là 150mg.' },
      { time: 360, actionTitle: 'Đánh giá sau Chu Kỳ 3 ➔ Tái Lập Tuần Hoàn Tự Nhiên (ROSC)', actionDesc: 'Bắt được mạch cảnh rõ, SpO2 96%, huyết áp 100/60 mmHg. Chuyển sang Giai đoạn Hồi Sức Sau Ngừng Tim (Post-Cardiac Arrest Care).', cprStatus: 'normal' }
    ]
  },
  anaphylaxis: {
    title: 'Xử Trí Cấp Cứu Phản Vệ Nguy Kịch (Độ 3) — Kháng Sinh IV',
    totalDurationSeconds: 300,
    steps: [
      { time: 0, actionTitle: 'Phát hiện Phản vệ Độ 3', actionDesc: 'Sau tiêm Ceftriaxone 2 phút: Bệnh nhân khó thở rít thanh quản, phù môi mắt, SpO2 84%, HA tụt 70/40 mmHg.', cprStatus: 'shock', alert: 'NGỪNG NGAY TIẾP XÚC DỊ NGUYÊN!' },
      { time: 20, actionTitle: 'TIÊM ADRENALINE 0.5mg TIÊM BẮP (IM) NGAY LẬP TỨC', actionDesc: 'Tiêm Adrenaline 1:1000 (1mg/1ml) 1/2 ống (0.5ml) bắp đùi mặt trước ngoài. Tuyệt đối không trì hoãn vì bất kỳ lý do nào.', cprStatus: 'drug' },
      { time: 60, actionTitle: 'Đặt bệnh nhân nằm đầu bằng, kê chân cao & Thở Oxy Mask', actionDesc: 'Thở Oxy mask túi 10-15 L/phút. Thiết lập 2 đường truyền tĩnh mạch lớn (Kim 16-18G), xả nhanh NaCl 0.9% 1000ml.', cprStatus: 'normal' },
      { time: 180, actionTitle: 'Đánh giá lại sau 3-5 phút ➔ Tiêm Adrenaline lần 2', actionDesc: 'Huyết áp 80/50 mmHg, còn co thắt thanh quản ➔ Tiêm bắp Adrenaline 0.5mg lần 2 ở đùi đối diện.', cprStatus: 'drug' },
      { time: 240, actionTitle: 'Phối hợp Thuốc Bổ trợ (Kháng Histamin & Corticoid)', actionDesc: 'Methylprednisolone 40-80mg IV + Diphenhydramine 50mg IV hoặc Dimedrol tiêm bắp.', cprStatus: 'drug' },
      { time: 300, actionTitle: 'Huyết động ổn định (HA 110/70 mmHg, SpO2 98%)', actionDesc: 'Bệnh nhân giảm khó thở, mạch 95 l/p. Tiếp tục theo dõi sát tại ICU tối thiểu 24-48 giờ phòng phản vệ 2 pha.', cprStatus: 'normal' }
    ]
  }
};

let activePathFinder: DiagnosticPathFinder | null = null;
let activeStepPlayer: ClinicalStepPlayer | null = null;

export function renderSimulationView(profileId: string, sessionId?: string): string {
  const profile = getActiveProfile();
  if (!profile) return '';

  return `
    <div class="dsp-layout" id="dspLayout">
      ${renderSidebar(profile, 'sandbox')}
      <main class="dsp-main" id="dspMain">
        ${renderDocSpaceHeader(profile, 'sandbox')}

        <div class="dsp-page-content">

          <!-- Page Header -->
          <div class="dsp-page-header" style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:1.5rem; flex-wrap:wrap; gap:1rem;">
            <div>
              <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.25rem;">
                <h1 class="dsp-page-title" style="margin:0;"><i class="fa-solid fa-flask" style="color:var(--dsp-amber, #f59e0b);"></i> Simulation Sandbox &amp; AI Clinical Lab</h1>
                <span class="dsp-badge" style="background:var(--dsp-violet, #8b5cf6); color:#fff; border:none;">Advanced Simulation Suite</span>
              </div>
              <p class="dsp-page-subtitle" style="margin:0;">
                Hệ sinh thái mô phỏng lâm sàng toàn diện: Tương tác thuốc, Ca bệnh OSCE, Đồ thị Dò đường chẩn đoán &amp; Trình diễn Thời gian Cấp cứu.
              </p>
            </div>
            <a href="#/docspace" class="dsp-btn dsp-btn-ghost dsp-btn-sm" id="btnBackSandbox">
              <i class="fa-solid fa-arrow-left"></i> Quay lại Dashboard
            </a>
          </div>

          <!-- Tool Selector Navigation Tabs -->
          <div class="dsp-tabs-nav" style="display:flex; gap:0.5rem; margin-bottom:1.5rem; border-bottom:1px solid var(--color-border); padding-bottom:0.75rem; overflow-x:auto;">
            <button class="dsp-btn dsp-btn-sm dsp-tab-btn active" data-tab="tab-drug" style="font-weight:700;">
              <i class="fa-solid fa-pills" style="color:var(--dsp-rose, #f43f5e);"></i> Tương Tác Thuốc
            </button>
            <button class="dsp-btn dsp-btn-sm dsp-tab-btn" data-tab="tab-osce" style="font-weight:700;">
              <i class="fa-solid fa-user-doctor" style="color:var(--dsp-violet, #8b5cf6);"></i> Ca Bệnh OSCE (AI)
            </button>
            <button class="dsp-btn dsp-btn-sm dsp-tab-btn" data-tab="tab-graph" style="font-weight:700;">
              <i class="fa-solid fa-diagram-project" style="color:var(--color-primary, #0284c7);"></i> Dò Đường Chẩn Đoán (Dijkstra)
            </button>
            <button class="dsp-btn dsp-btn-sm dsp-tab-btn" data-tab="tab-timeline" style="font-weight:700;">
              <i class="fa-solid fa-stopwatch-20" style="color:var(--color-danger, #ef4444);"></i> Cấp Cứu Theo Thời Gian (ACLS)
            </button>
          </div>
          
          <!-- TAB 1: DRUG INTERACTIONS -->
          <div id="tab-drug" class="simulation-tab-content active">
            <div style="display:grid; grid-template-columns: minmax(300px, 380px) 1fr; gap: 1.5rem; align-items: flex-start;">
              <div class="dsp-card">
                <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.35rem;">
                  <i class="fa-solid fa-pills" style="color:var(--dsp-rose, #f43f5e); font-size:1.1rem;"></i>
                  <h3 style="margin:0; font-size:0.98rem; font-weight:800; color:var(--color-text);">Tra cứu Tương tác Thuốc</h3>
                </div>
                <p style="font-size:0.78rem; color:var(--color-text-muted); margin-bottom:0.75rem;">Nhập danh sách thuốc cách nhau bởi dấu phẩy.</p>
                <form id="dspSandboxForm" novalidate>
                  <div class="dsp-form-group">
                    <textarea id="dspDrugList" class="dsp-textarea" rows="3" placeholder="VD: vancomycin, gentamicin, furosemide" style="min-height:80px;" required></textarea>
                  </div>
                  <div style="display:flex; flex-direction:column; gap:8px; margin-top:0.5rem;">
                    <button type="submit" class="dsp-btn dsp-btn-primary dsp-btn-full" style="font-size:0.85rem;">
                      <i class="fa-solid fa-shield-virus"></i> Tra cứu Offline
                    </button>
                    <button type="button" id="btnAiAnalyzeDrugs" class="dsp-btn dsp-btn-outline dsp-btn-full" style="font-size:0.85rem; color:var(--dsp-sky, #0ea5e9); border-color:rgba(14,165,233,0.3);">
                      <i class="fa-solid fa-wand-magic-sparkles"></i> ✨ Phân tích AI Chuyên sâu
                    </button>
                  </div>
                </form>
              </div>

              <div class="dsp-card">
                <h3 style="margin-top:0; font-size:1rem; font-weight:800; color:var(--color-text); margin-bottom:1rem; display:flex; align-items:center; gap:0.5rem;">
                  <i class="fa-solid fa-square-poll-vertical" style="color:var(--dsp-sky, #0ea5e9);"></i> Kết quả Phân tích Tương tác
                </h3>
                <div id="dspSandboxResult">
                  <div class="dsp-empty-profiles" style="padding: 3rem 1rem;">
                    <i class="fa-solid fa-pills"></i>
                    <p>Nhập danh sách thuốc ở cột bên trái và bấm <strong>Tra cứu Offline</strong> hoặc <strong>Phân tích AI</strong>.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- TAB 2: OSCE SIMULATOR -->
          <div id="tab-osce" class="simulation-tab-content" style="display:none;">
            <div style="display:grid; grid-template-columns: minmax(300px, 380px) 1fr; gap: 1.5rem; align-items: flex-start;">
              <div class="dsp-card">
                <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.35rem;">
                  <i class="fa-solid fa-user-doctor" style="color:var(--dsp-violet, #8b5cf6); font-size:1.1rem;"></i>
                  <h3 style="margin:0; font-size:0.98rem; font-weight:800; color:var(--color-text);">Mô phỏng Ca Bệnh OSCE</h3>
                </div>
                <p style="font-size:0.78rem; color:var(--color-text-muted); margin-bottom:0.75rem;">Sinh ca bệnh giả lập thử thách ra quyết định lâm sàng.</p>
                <form id="dspOsceForm" novalidate>
                  <div class="dsp-form-group">
                    <label class="dsp-label">Chuyên khoa</label>
                    <select id="osceSpecialty" class="dsp-input">
                      <option value="Nội tim mạch">Nội Tim Mạch</option>
                      <option value="Nội hô hấp">Nội Hô Hấp</option>
                      <option value="Nội thận - Tiết niệu">Nội Thận - Tiết Niệu</option>
                      <option value="Cấp cứu - Hồi sức">Cấp Cứu - Hồi Sức (ICU)</option>
                      <option value="Ngoại khoa">Ngoại Khoa</option>
                      <option value="Nhi khoa">Nhi Khoa</option>
                    </select>
                  </div>
                  <div class="dsp-form-group">
                    <label class="dsp-label">Độ khó</label>
                    <select id="osceDifficulty" class="dsp-input">
                      <option value="easy">Cơ bản (Sinh viên Y khoa)</option>
                      <option value="medium" selected>Trung bình (Bác sĩ Nội trú)</option>
                      <option value="hard">Nâng cao (Bác sĩ Chuyên khoa)</option>
                    </select>
                  </div>
                  <button type="submit" class="dsp-btn dsp-btn-primary dsp-btn-full" style="background:linear-gradient(135deg, #8b5cf6, #6366f1); border-color:#8b5cf6; margin-top:0.5rem; font-size:0.85rem;">
                    <i class="fa-solid fa-dice"></i> 🎲 Sinh Ca Bệnh OSCE (AI)
                  </button>
                </form>
              </div>

              <div class="dsp-card">
                <h3 style="margin-top:0; font-size:1rem; font-weight:800; color:var(--color-text); margin-bottom:1rem; display:flex; align-items:center; gap:0.5rem;">
                  <i class="fa-solid fa-clipboard-user" style="color:var(--dsp-violet, #8b5cf6);"></i> Kịch Bản Ca Bệnh Lâm Sàng
                </h3>
                <div id="dspOsceResult">
                  <div class="dsp-empty-profiles" style="padding: 3rem 1rem;">
                    <i class="fa-solid fa-user-doctor"></i>
                    <p>Chọn chuyên khoa và độ khó để AI tạo trạm thi OSCE tương tác.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- TAB 3: DIAGNOSTIC PATH FINDER & STEINER TREE -->
          <div id="tab-graph" class="simulation-tab-content" style="display:none;">
            <div style="display:grid; grid-template-columns: 320px 1fr; gap: 1.5rem; align-items: flex-start;">
              <div class="dsp-card">
                <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.5rem;">
                  <i class="fa-solid fa-route" style="color:var(--color-primary, #0284c7); font-size:1.1rem;"></i>
                  <h3 style="margin:0; font-size:0.98rem; font-weight:800; color:var(--color-text);">Tiêu Chí Tìm Đường Tối Ưu</h3>
                </div>
                <p style="font-size:0.78rem; color:var(--color-text-muted); margin-bottom:1rem;">
                  Ứng dụng thuật toán Dijkstra &amp; Steiner Tree tính toán đường chẩn đoán có chi phí &amp; thời gian thấp nhất.
                </p>

                <div class="dsp-form-group">
                  <label class="dsp-label">Triệu chứng khởi đầu (Source)</label>
                  <select id="selGraphSource" class="dsp-input">
                    <option value="s1">Đau ngực sau xương ức</option>
                    <option value="s2">Khó thở cấp tính</option>
                    <option value="s3">Vã mồ hôi &amp; Buồn nôn</option>
                    <option value="s4">Đau tăng khi hít sâu</option>
                  </select>
                </div>

                <div class="dsp-form-group">
                  <label class="dsp-label">Chẩn đoán đích (Target)</label>
                  <select id="selGraphTarget" class="dsp-input">
                    <option value="d1">NMCT Cấp STEMI</option>
                    <option value="d2">Thuyên Tắc Phổi Cấp (PE)</option>
                    <option value="d3">Bóc Tách ĐMC Ngực</option>
                    <option value="d4">Tràn Khí Màng Phổi Áp Lực</option>
                  </select>
                </div>

                <div class="dsp-form-group">
                  <label class="dsp-label">Tiêu chí ưu tiên (Criteria)</label>
                  <select id="selGraphCriteria" class="dsp-input">
                    <option value="balanced">Cân bằng (Thời gian + Chi phí + Xâm lấn)</option>
                    <option value="fastest">Nhanh nhất (Ưu tiên cấp cứu)</option>
                    <option value="cheapest">Tiết kiệm chi phí nhất</option>
                    <option value="least-invasive">Ít xâm lấn nhất (An toàn)</option>
                  </select>
                </div>

                <button type="button" id="btnRunDijkstra" class="dsp-btn dsp-btn-primary dsp-btn-full" style="margin-top:0.5rem; font-weight:700;">
                  <i class="fa-solid fa-calculator"></i> Tính Đường Đi Tối Ưu
                </button>

                <hr style="margin:1.25rem 0; border:none; border-top:1px solid var(--color-border);" />

                <div id="graphCalculationSummary" style="font-size:0.85rem; color:var(--color-text-muted);">
                  <div style="font-weight:700; color:var(--color-text); margin-bottom:0.5rem;">Kết quả tính toán:</div>
                  <div id="graphResultText">Chưa thực hiện tìm đường. Nhấn nút phía trên để chạy thuật toán Dijkstra.</div>
                </div>
              </div>

              <div class="dsp-card" style="min-height:540px; padding:1rem;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
                  <h4 style="margin:0; font-size:0.95rem; font-weight:800; color:var(--color-text);">
                    <i class="fa-solid fa-circle-nodes" style="color:var(--color-primary, #0284c7);"></i> Bản Đồ Tri Thức Vector Tương Tác
                  </h4>
                  <span style="font-size:0.75rem; color:var(--color-text-muted);">Click vào Node bất kỳ để xem chi tiết</span>
                </div>
                <div id="svgPathFinderContainer" style="width:100%; height:480px; background:var(--color-surface-2, #1e293b); border-radius:8px; overflow:hidden; border:1px solid var(--color-border);"></div>
              </div>
            </div>
          </div>

          <!-- TAB 4: CLINICAL TIMELINE & CPR STEP PLAYER -->
          <div id="tab-timeline" class="simulation-tab-content" style="display:none;">
            <div style="display:grid; grid-template-columns: 1fr 340px; gap: 1.5rem; align-items: flex-start;">
              <div>
                <!-- Scenario Selector -->
                <div class="dsp-card" style="margin-bottom:1rem; padding:0.75rem 1.25rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem;">
                  <div style="display:flex; align-items:center; gap:0.5rem;">
                    <label style="font-size:0.85rem; font-weight:700; color:var(--color-text);">Chọn Kịch Bản:</label>
                    <select id="selTimelineScenario" class="dsp-input" style="width:auto; padding:0.35rem 0.75rem; font-size:0.85rem;">
                      <option value="acls_vf">Ngừng Tuần Hoàn ACLS — Rung Thất (VF)</option>
                      <option value="anaphylaxis">Cấp Cứu Phản Vệ Nguy Kịch (Độ 3)</option>
                    </select>
                  </div>
                  <span style="font-size:0.75rem; color:var(--color-text-muted);"><i class="fa-solid fa-keyboard"></i> Hỗ trợ phím Space để Play/Pause</span>
                </div>

                <!-- Step Player Main Viewport -->
                <div id="stepPlayerContainer" style="background:var(--color-surface); border-radius:10px; border:1px solid var(--color-border); padding:1rem; margin-bottom:1rem;"></div>
              </div>

              <!-- Action Checklist Log -->
              <div id="stepPlayerLogContainer"></div>
            </div>
          </div>

        </div>
      </main>
    </div>
  `;
}

export function mountSimulationController(profileId: string): void {
  // Tab Switcher Handler
  const tabBtns = document.querySelectorAll<HTMLButtonElement>('.dsp-tab-btn');
  const tabContents = document.querySelectorAll<HTMLElement>('.simulation-tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTabId = btn.getAttribute('data-tab');
      if (!targetTabId) return;

      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => {
        c.style.display = 'none';
        c.classList.remove('active');
      });

      btn.classList.add('active');
      const activeContent = document.getElementById(targetTabId);
      if (activeContent) {
        activeContent.style.display = 'block';
        activeContent.classList.add('active');
      }

      // Lazy-load interactive engines when opening tabs
      if (targetTabId === 'tab-graph') {
        initGraphTab();
      } else if (targetTabId === 'tab-timeline') {
        initTimelineTab();
      }
    });
  });

  // Init Form 1: Drug Interaction
  initDrugInteractionForm();

  // Init Form 2: OSCE Simulator
  initOsceSimulatorForm();
}

function initDrugInteractionForm(): void {
  const form = document.getElementById('dspSandboxForm') as HTMLFormElement;
  if (!form) return;

  const runOfflineCheck = () => {
    const input = (document.getElementById('dspDrugList') as HTMLTextAreaElement).value;
    const drugs = input.split(',').map(d => d.trim().toLowerCase()).filter(Boolean);
    
    if (drugs.length < 2) {
      alert('Vui lòng nhập ít nhất 2 loại thuốc để kiểm tra tương tác.');
      return null;
    }

    const results = checkInteractions(drugs, DRUG_INTERACTIONS);
    renderResults(results, drugs);
    return drugs;
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    runOfflineCheck();
  });

  document.getElementById('btnAiAnalyzeDrugs')?.addEventListener('click', async () => {
    const input = (document.getElementById('dspDrugList') as HTMLTextAreaElement).value;
    const drugs = input.split(',').map(d => d.trim()).filter(Boolean);

    if (drugs.length < 2) {
      alert('Vui lòng nhập ít nhất 2 loại thuốc để phân tích tương tác AI.');
      return;
    }

    const profile = getActiveProfile();
    if (!profile || !profile.aiSettings || !profile.aiSettings.enabled) {
      alert('Vui lòng bật và cấu hình AI trong Cài đặt AI trước.');
      return;
    }

    const container = document.getElementById('dspSandboxResult');
    if (!container) return;

    container.innerHTML = `
      <div class="dsp-p-4 dsp-rounded-md" style="background: rgba(2, 132, 199, 0.05); border: 1px dashed var(--color-primary);">
        <div style="font-weight: 700; color: var(--color-primary); margin-bottom: 8px; display: flex; align-items: center; gap: 8px;">
          <i class="fa-solid fa-spinner fa-spin"></i> Dược sĩ AI đang phân tích tương tác dược lực học...
        </div>
        <div id="aiDrugResultText" style="font-size: 13px; line-height: 1.6; white-space: pre-wrap; color: var(--color-text);"></div>
      </div>
    `;

    const resultTextEl = document.getElementById('aiDrugResultText');
    const btn = document.getElementById('btnAiAnalyzeDrugs') as HTMLButtonElement;
    if (btn) btn.disabled = true;

    try {
      let streamed = '';
      await analyzeDrugInteractionsWithAI(drugs, profile.aiSettings, (chunk) => {
        streamed += chunk;
        if (resultTextEl) resultTextEl.textContent = streamed;
      });
    } catch (err: any) {
      if (resultTextEl) resultTextEl.textContent = '❌ Lỗi phân tích AI: ' + err.message;
    } finally {
      if (btn) btn.disabled = false;
    }
  });
}

function initOsceSimulatorForm(): void {
  document.getElementById('dspOsceForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const specialty = (document.getElementById('osceSpecialty') as HTMLSelectElement).value;
    const difficulty = (document.getElementById('osceDifficulty') as HTMLSelectElement).value as 'easy' | 'medium' | 'hard';

    const profile = getActiveProfile();
    if (!profile || !profile.aiSettings || !profile.aiSettings.enabled) {
      alert('Vui lòng bật và cấu hình AI trong Cài đặt AI trước.');
      return;
    }

    const container = document.getElementById('dspOsceResult');
    if (!container) return;

    container.innerHTML = `
      <div class="dsp-p-4 dsp-rounded-md" style="background: rgba(139, 92, 246, 0.05); border: 1px dashed #8b5cf6;">
        <div style="font-weight: 700; color: #8b5cf6; margin-bottom: 8px; display: flex; align-items: center; gap: 8px;">
          <i class="fa-solid fa-spinner fa-spin"></i> Giám khảo AI đang tạo Ca bệnh Mô phỏng OSCE...
        </div>
        <div id="aiOsceResultText" style="font-size: 13px; line-height: 1.6; white-space: pre-wrap; color: var(--color-text);"></div>
      </div>
    `;

    const resultTextEl = document.getElementById('aiOsceResultText');

    try {
      let streamed = '';
      await generateClinicalScenario(specialty, difficulty, profile.aiSettings, (chunk) => {
        streamed += chunk;
        if (resultTextEl) resultTextEl.textContent = streamed;
      });
    } catch (err: any) {
      if (resultTextEl) resultTextEl.textContent = '❌ Lỗi tạo ca bệnh OSCE AI: ' + err.message;
    }
  });
}

function initGraphTab(): void {
  const container = document.getElementById('svgPathFinderContainer');
  if (!container) return;

  if (!activePathFinder) {
    activePathFinder = new DiagnosticPathFinder({
      svgContainer: container,
      width: container.clientWidth || 780,
      height: 480,
      onNodeClick: (node) => {
        const resText = document.getElementById('graphResultText');
        if (resText) {
          resText.innerHTML = `
            <div style="padding:0.5rem; background:var(--color-surface); border-radius:6px; border:1px solid var(--color-border); margin-top:0.5rem;">
              <strong>${node.label}</strong> (${node.type.toUpperCase()})<br/>
              ${node.cost ? `• Chi phí ước tính: <strong>${node.cost.toLocaleString('vi-VN')}k VNĐ</strong><br/>` : ''}
              ${node.timeMinutes ? `• Thời gian thực hiện: <strong>${node.timeMinutes} phút</strong><br/>` : ''}
              ${node.risk ? `• Mức độ xâm lấn: Cấp ${node.risk}` : ''}
            </div>
          `;
        }
      }
    });

    activePathFinder.loadGraph(SAMPLE_CHEST_PAIN_GRAPH);
  }

  // Bind Dijkstra Calculation Button
  const btnCalc = document.getElementById('btnRunDijkstra');
  if (btnCalc) {
    btnCalc.onclick = () => {
      if (!activePathFinder) return;
      const src = (document.getElementById('selGraphSource') as HTMLSelectElement).value;
      const tgt = (document.getElementById('selGraphTarget') as HTMLSelectElement).value;
      const criteria = (document.getElementById('selGraphCriteria') as HTMLSelectElement).value as OptimizationCriteria;

      const pathResult = activePathFinder.findOptimalPath(src, tgt, criteria);
      const resText = document.getElementById('graphResultText');

      if (!pathResult) {
        if (resText) resText.innerHTML = '<span style="color:var(--color-danger);">❌ Không tìm thấy đường dẫn kết nối trực tiếp giữa 2 đỉnh này.</span>';
        activePathFinder.renderGraph();
        return;
      }

      // Highlight path on SVG
      activePathFinder.renderGraph(pathResult.nodes, pathResult.edges);

      if (resText) {
        const nodeLabels = pathResult.nodes.map(id => {
          const n = SAMPLE_CHEST_PAIN_GRAPH.nodes.find(node => node.id === id);
          return n ? n.label : id;
        });

        resText.innerHTML = `
          <div style="padding:0.75rem; background:rgba(2,132,199,0.08); border-radius:6px; border:1px solid var(--color-primary); margin-top:0.5rem;">
            <div style="font-weight:700; color:var(--color-primary); margin-bottom:0.25rem;">
              <i class="fa-solid fa-check-circle"></i> Đường đi tối ưu (${criteria}):
            </div>
            <div style="font-size:0.8rem; margin-bottom:0.5rem; line-height:1.4;">
              ${nodeLabels.join(' ➔ ')}
            </div>
            <div style="font-size:0.78rem; color:var(--color-text);">
              • Tổng chi phí CLS: <strong>${pathResult.totalCost.toLocaleString('vi-VN')}k VNĐ</strong><br/>
              • Thời gian trung bình: <strong>${pathResult.totalTimeMinutes} phút</strong><br/>
              • Mức xâm lấn tối đa: <strong>Cấp ${pathResult.maxRisk}</strong>
            </div>
          </div>
        `;
      }
    };
  }
}

function initTimelineTab(): void {
  const container = document.getElementById('stepPlayerContainer');
  const logContainer = document.getElementById('stepPlayerLogContainer');
  if (!container || !logContainer) return;

  if (!activeStepPlayer) {
    activeStepPlayer = new ClinicalStepPlayer({
      container: container,
      logContainer: logContainer
    });

    activeStepPlayer.loadScenario(SAMPLE_SCENARIOS.acls_vf!);
  }

  const scenarioSelector = document.getElementById('selTimelineScenario') as HTMLSelectElement;
  if (scenarioSelector) {
    scenarioSelector.onchange = () => {
      const chosen = scenarioSelector.value;
      const scData = SAMPLE_SCENARIOS[chosen];
      if (scData && activeStepPlayer) {
        activeStepPlayer.loadScenario(scData);
      }
    };
  }
}

function checkInteractions(drugs: string[], rules: DrugInteractionRule[]): DrugInteractionRule[] {
  const results: DrugInteractionRule[] = [];
  for (let i = 0; i < drugs.length; i++) {
    for (let j = i + 1; j < drugs.length; j++) {
      const d1 = drugs[i];
      const d2 = drugs[j];
      const rule = rules.find(r => 
        (r.drug_a === d1 && r.drug_b === d2) || 
        (r.drug_a === d2 && r.drug_b === d1)
      );
      if (rule) results.push(rule);
    }
  }
  return results;
}

function renderResults(results: DrugInteractionRule[], drugs: string[]) {
  const container = document.getElementById('dspSandboxResult');
  if (!container) return;

  if (results.length === 0) {
    container.innerHTML = `
      <div class="dsp-alert dsp-alert-success" style="margin-bottom: 1rem;">
        <i class="fa-solid fa-check-circle"></i> Không tìm thấy tương tác nào giữa các thuốc (${drugs.join(', ')}) trong DB Offline.
      </div>
      <button type="button" id="btnAutoTriggerAi" class="dsp-btn dsp-btn-primary">
        <i class="fa-solid fa-wand-magic-sparkles"></i> Phân tích Chuyên sâu bằng AI →
      </button>
    `;

    document.getElementById('btnAutoTriggerAi')?.addEventListener('click', () => {
      document.getElementById('btnAiAnalyzeDrugs')?.click();
    });
    return;
  }

  let html = `<div class="dsp-flex dsp-flex-col" style="gap: 1rem;">`;
  
  for (const r of results) {
    const isHigh = r.severity === 'high';
    const borderColor = isHigh ? 'var(--color-danger)' : 'var(--color-warning)';
    const bgColor = isHigh ? 'rgba(239, 68, 68, 0.05)' : 'rgba(245, 158, 11, 0.05)';
    const iconColor = isHigh ? 'var(--color-danger)' : 'var(--color-warning)';

    html += `
      <div class="dsp-p-4 dsp-rounded-md dsp-border" style="border-left: 4px solid ${borderColor}; background: ${bgColor};">
        <div class="dsp-font-bold dsp-text-lg dsp-mb-2" style="text-transform: capitalize;">
          <i class="fa-solid fa-triangle-exclamation dsp-mr-2" style="color: ${iconColor};"></i> 
          ${r.drug_a} + ${r.drug_b}
        </div>
        <div class="dsp-mb-2"><strong><i class="fa-solid fa-bolt dsp-text-muted"></i> Cơ chế:</strong> ${r.mechanism}</div>
        <div><strong><i class="fa-solid fa-stethoscope dsp-text-primary"></i> Xử trí:</strong> ${r.recommendation}</div>
      </div>
    `;
  }

  html += `</div>`;
  container.innerHTML = html;
}
