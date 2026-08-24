/**
 * DocSpace — Interactive Clinical Flowchart Studio
 * Cây Thuật Toán Xử Trí Lâm Sàng & Phác Đồ Rẽ Nhánh Tương Tác
 * Chuẩn EBM Quốc Tế (AHA/ACC, ESC, IAP/APA, SSC 2026)
 */

import { getActiveProfile, getAllSoapPatients, updateSoapPatient } from '../storage';
import { renderSidebar, renderDocSpaceHeader, escapeHtml } from '../docspace-view';

export interface FlowNode {
  id: string;
  type: 'START' | 'DECISION' | 'ACTION_STAT' | 'ACTION_ROUTINE' | 'EVALUATION' | 'OUTCOME_ICU' | 'OUTCOME_DISCHARGE';
  title: string;
  subtitle?: string;
  timeframe: string;
  description: string;
  conditionQuestion?: string;
  yesNextId?: string;
  noNextId?: string;
  nextId?: string;
  medications?: { name: string; dose: string; route: string; freq: string }[];
  orderSets?: string[];
  redFlags?: string[];
  clinicalRationale: string;
  evidenceRef: string;
}

export interface ProtocolFlow {
  id: string;
  diseaseCode: string;
  title: string;
  guidelineSource: string;
  urgency: 'CRITICAL_STAT' | 'EMERGENCY' | 'URGENT';
  summary: string;
  initialNodeId: string;
  nodes: Record<string, FlowNode>;
}

export const CLINICAL_FLOWCHARTS: ProtocolFlow[] = [
  {
    id: 'FLOW_ACUTE_PANCREATITIS',
    diseaseCode: 'K85',
    title: 'Phác Đồ Cấp Cứu Viêm Tụy Cấp Nặng (Atlanta 2012 / IAP 2024)',
    guidelineSource: 'American Gastroenterological Association & IAP/APA Guidelines',
    urgency: 'CRITICAL_STAT',
    summary: 'Thuật toán xử trí bù dịch sớm có kiểm soát, phân tầng nguy cơ BISAP/SIRS, kiểm soát đau và chiến lược bậc thang hoại tử tụy nhiễm trùng.',
    initialNodeId: 'node_ap_1',
    nodes: {
      node_ap_1: {
        id: 'node_ap_1',
        type: 'START',
        title: 'Tiếp Nhận & Xác Định Chẩn Đoán (0 - 15 Phút)',
        subtitle: 'Xác thực 2/3 tiêu chuẩn Atlanta',
        timeframe: 'STAT 0-15m',
        description: 'Đau bụng cấp vùng thượng vị lan lưng + Lipase/Amylase > 3 lần GHBT + Hình ảnh CT/Siêu âm điển hình.',
        nextId: 'node_ap_2',
        orderSets: ['Lipase máu', 'Amylase máu', 'Creatinine, Ure', 'Hct, CTM', 'Khí máu động mạch (ABG)', 'Siêu âm bụng tại giường'],
        clinicalRationale: 'Chẩn đoán xác định nhanh trong 15 phút đầu để phân tầng điều trị và tránh mất thời gian bù dịch sớm.',
        evidenceRef: 'Atlanta Classification 2012 / Grade 1A',
      },
      node_ap_2: {
        id: 'node_ap_2',
        type: 'DECISION',
        title: 'Đánh Giá Huyết Động & Dấu Hiệu Sốc / Suy Tạng?',
        timeframe: 'Phút 15 - 30',
        conditionQuestion: 'Bệnh nhân có Tụt huyết áp (MAP < 65 mmHg) hoặc Dấu hiệu suy tạng (Suy hô hấp PaO2/FiO2 < 300, Thận Creatinine > 170 umol/L)?',
        yesNextId: 'node_ap_icu_shock',
        noNextId: 'node_ap_fluid_standard',
        description: 'Đánh giá điểm suy tạng theo thang điểm Marshall sửa đổi hoặc SIRS Score ≥ 2.',
        clinicalRationale: 'Sự hiện diện của suy tạng kéo dài (> 48h) là yếu tố quyết định tiên lượng tử vong trong viêm tụy cấp nặng.',
        evidenceRef: 'Modified Marshall Score / IAP Guidelines',
      },
      node_ap_icu_shock: {
        id: 'node_ap_icu_shock',
        type: 'ACTION_STAT',
        title: 'Hồi Sức Tích Cực Khẩn Cấp & Bù Dịch Tốc Độ Cao (ICU STAT)',
        timeframe: 'Giờ thứ 0 - 2',
        description: 'Bolus Ringer Lactate 20 mL/kg trong 30-60 phút đầu. Đặt Catheter tĩnh mạch trung tâm (CVP) và theo dõi thể tích nước tiểu qua thông bàng quang.',
        nextId: 'node_ap_reassess_24h',
        medications: [
          { name: 'Ringer Lactate (Hartmann)', dose: '20 mL/kg bolus trong 60 phút', route: 'IV Infusion', freq: 'STAT' },
          { name: 'Fentanyl hoặc Morphine', dose: 'Giảm đau tĩnh mạch ngắt quãng', route: 'IV', freq: 'Khi đau VAS > 6' },
        ],
        orderSets: ['Lactate máu động mạch mỗi 2h', 'Đo CVP & ScvO2', 'Theo dõi nước tiểu mỗi giờ (Mục tiêu > 0.5 mL/kg/h)'],
        clinicalRationale: 'Ringer Lactate ưu thế hơn Natri Clorid 0.9% vì giảm nguy cơ toan chuyển hóa tăng clo máu và giảm tỷ lệ SIRS.',
        evidenceRef: 'WATERFALL Trial NEJM / Grade 1B',
      },
      node_ap_fluid_standard: {
        id: 'node_ap_fluid_standard',
        type: 'ACTION_ROUTINE',
        title: 'Bù Dịch Tiêu Chuẩn Có Kiểm Soát (Target-Directed Fluid)',
        timeframe: 'Giờ thứ 0 - 24',
        description: 'Ringer Lactate tốc độ 1.5 - 2.0 mL/kg/h. Đánh giá lại đáp ứng dịch mỗi 4-6 giờ qua Hct, BUN và sinh hiệu.',
        nextId: 'node_ap_reassess_24h',
        medications: [
          { name: 'Ringer Lactate', dose: '1.5 - 2.0 mL/kg/h', route: 'IV Infusion', freq: 'Duy trì' },
          { name: 'Paracetamol IV + Tramadol', dose: '1g IV mỗi 6h khi đau', route: 'IV', freq: 'Khi cần' },
        ],
        clinicalRationale: 'Tránh bù dịch quá mức gây quá tải tuần hoàn, hội chứng khoang bụng và tổn thương phổi cấp ARDS.',
        evidenceRef: 'IAP/APA Guidelines',
      },
      node_ap_reassess_24h: {
        id: 'node_ap_reassess_24h',
        type: 'EVALUATION',
        title: 'Đánh Giá Động Học Tại Thời Điểm 24 - 48 Giờ',
        timeframe: 'Mốc 24 - 48 Giờ',
        description: 'Kiểm tra lại Creatinine, Hct, CRP, Procalcitonin. Đánh giá khả năng dung nạp thức ăn đường ruột sớm (Early Enteral Nutrition).',
        nextId: 'node_ap_infection_check',
        orderSets: ['Creatinine, Ure', 'CRP định lượng', 'Procalcitonin', 'CT Scanner bụng cản quang (sau 72h nếu không cải thiện)'],
        clinicalRationale: 'Nuôi dưỡng đường ruột sớm qua đường miệng hoặc ống thông mũi-hỗng tràng giúp bảo tồn hàng rào niêm mạc ruột.',
        evidenceRef: 'ESPEN Guidelines on Enteral Nutrition 2023',
      },
      node_ap_infection_check: {
        id: 'node_ap_infection_check',
        type: 'DECISION',
        title: 'Bệnh Nhân Sốt Cao, Tăng Bạch Cầu & Nghi Ngờ Hoại Tử Nhiễm Trùng?',
        timeframe: 'Ngày thứ 3 - 7',
        conditionQuestion: 'Bệnh nhân có sốt kéo dài > 38.5°C, Procalcitonin tăng vọt (> 2.0 ng/mL) hoặc hình ảnh bọt khí trong tụy trên CT Scanner?',
        yesNextId: 'node_ap_antibiotics_stepup',
        noNextId: 'node_ap_recovery',
        description: 'Chỉ định kháng sinh thấm mô tụy và hội chẩn can thiệp tối thiểu (Step-up approach).',
        clinicalRationale: 'Kháng sinh chỉ dùng khi có bằng chứng hoại tử tụy nhiễm trùng hoặc nhiễm khuẩn ngoài tụy.',
        evidenceRef: 'PANTER Trial / Dutch Pancreatitis Group',
      },
      node_ap_antibiotics_stepup: {
        id: 'node_ap_antibiotics_stepup',
        type: 'ACTION_STAT',
        title: 'Kháng Sinh Thấm Tụy Khẩn (Meropenem) & Can Thiệp Tối Thiểu',
        timeframe: 'STAT khi có nhiễm trùng',
        description: 'Meropenem 1g IV mỗi 8h hoặc Imipenem/Cilastatin. Hội chẩn ngoại tiêu hóa / can thiệp mạch để dẫn lưu qua da (Percutaneous Drainage).',
        nextId: 'node_ap_icu_transfer',
        medications: [
          { name: 'Meropenem', dose: '1g IV mỗi 8h (chỉnh theo eGFR)', route: 'IV Infusion 3h', freq: 'Mỗi 8h' },
        ],
        clinicalRationale: 'Chiến lược bậc thang (Step-up approach) ưu tiên dẫn lưu tối thiểu trước khi xem xét phẫu thuật mở.',
        evidenceRef: 'IAP/APA Guidelines',
      },
      node_ap_icu_transfer: {
        id: 'node_ap_icu_transfer',
        type: 'OUTCOME_ICU',
        title: 'Chuyển Khoa Hồi Sức Tích Cực (ICU) - Giám Sát Đa Cơ Quan',
        timeframe: 'Mốc chuyển ICU',
        description: 'Bệnh nhân được chuyển ICU với đầy đủ đường truyền trung tâm, theo dõi huyết động xâm lấn và lọc máu CRRT nếu có chỉ định.',
        clinicalRationale: 'Viêm tụy cấp thể nặng có tỷ lệ tử vong 20-30%, đòi hỏi kiểm soát tại ICU.',
        evidenceRef: 'Intensive Care Medicine Protocol',
      },
      node_ap_recovery: {
        id: 'node_ap_recovery',
        type: 'OUTCOME_DISCHARGE',
        title: 'Phục Hồi Ổn Định & Chuyển Chế Độ Ăn Dần (Day 3-5)',
        timeframe: 'Ngày 3 - 5',
        description: 'Đỡ đau bụng, nhu động ruột hồi phục, men tụy và Hct ổn định. Bắt đầu chế độ ăn lỏng ít béo, giảm liều dịch truyền và chuẩn bị xuất viện.',
        clinicalRationale: 'Khi các triệu chứng thoái lui, việc chuyển ăn sớm giúp rút ngắn ngày nằm viện.',
        evidenceRef: 'AGA Practice Update',
      },
    },
  },
  {
    id: 'FLOW_STEMI_ACS',
    diseaseCode: 'I21',
    title: 'Phác Đồ Hội Chứng Vành Cấp STEMI (AHA/ACC & ESC 2023)',
    guidelineSource: 'American Heart Association & European Society of Cardiology 2023',
    urgency: 'CRITICAL_STAT',
    summary: 'Thuật toán xử trí can thiệp mạch vành thì đầu (Primary PCI) trong khung giờ vàng 90-120 phút, liệu pháp kháng ngưng tập tiểu cầu kép DAPT và tiêu sợi huyết cứu vãn.',
    initialNodeId: 'node_stemi_1',
    nodes: {
      node_stemi_1: {
        id: 'node_stemi_1',
        type: 'START',
        title: 'Đo ECG 12 Chuyển Đạo & Nhận Diện ST Chênh Lên (0 - 10 Phút)',
        subtitle: 'Door-to-ECG < 10 phút',
        timeframe: 'STAT 0-10m',
        description: 'Đau thắt ngực kiểu mạch vành > 20 phút + ST chênh lên ≥ 1mm ở ≥ 2 chuyển đạo liên tiếp (hoặc Block nhánh trái mới LBBB).',
        nextId: 'node_stemi_pci_access',
        orderSets: ['Troponin T hs / I', 'Điện tim ECG 12 cần + V7-V9/V3R-V4R', 'Điện giải đồ, Men gan, Creatinine', 'Đông máu toàn bộ (PT, aPTT, INR)'],
        clinicalRationale: 'Thời gian là cơ tim (Time is Muscle). Khám và đọc ECG trong 10 phút đầu để kích hoạt Lab Can thiệp mạch vành.',
        evidenceRef: 'ESC STEMI Guidelines 2023 / Class I, Level A',
      },
      node_stemi_pci_access: {
        id: 'node_stemi_pci_access',
        type: 'DECISION',
        title: 'Có Thể Can Thiệp PCI Trong Khung Giờ < 120 Phút?',
        timeframe: 'Mốc 10 - 20 Phút',
        conditionQuestion: 'Bệnh viện có phòng Catheterization Lab hoạt động và có thể đưa dây dẫn qua tổn thương trong vòng ≤ 90-120 phút?',
        yesNextId: 'node_stemi_dapt_stat',
        noNextId: 'node_stemi_thrombolysis',
        description: 'Xác định chiến lược tái tưới máu: Can thiệp PCI thì đầu hay Tiêu sợi huyết (Thrombolysis).',
        clinicalRationale: 'PCI thì đầu vượt trội hơn tiêu sợi huyết về tỷ lệ tử vong và biến chứng xuất huyết não.',
        evidenceRef: 'AHA/ACC STEMI Guidelines / Class I',
      },
      node_stemi_dapt_stat: {
        id: 'node_stemi_dapt_stat',
        type: 'ACTION_STAT',
        title: 'Liệu Pháp Kháng Ngưng Tập Tiểu Cầu Kép (DAPT Loading) & Heparin',
        timeframe: 'STAT 0 - 30 Phút',
        description: 'Aspirin 300 mg nhai + Ticagrelor 180 mg (hoặc Clopidogrel 600 mg) + Enoxaparin 30 mg IV bolus hoặc Heparin không phân đoạn (UFH) 70-100 UI/kg.',
        nextId: 'node_stemi_cath_lab',
        medications: [
          { name: 'Aspirin (Acid Acetylsalicylic)', dose: '300 mg nhai trực tiếp', route: 'PO', freq: 'STAT' },
          { name: 'Ticagrelor (Brilinta)', dose: '180 mg (2 viên 90mg)', route: 'PO', freq: 'STAT Liều nạp' },
          { name: 'Enoxaparin (Lovenox)', dose: '30 mg IV bolus + 1 mg/kg SC', route: 'IV/SC', freq: 'STAT' },
          { name: 'Atorvastatin', dose: '80 mg', route: 'PO', freq: 'STAT tối' },
        ],
        redFlags: ['Hỏi tiền sử xuất huyết não, viêm loét dạ dày tiến triển hoặc dị ứng thuốc'],
        clinicalRationale: 'DAPT liều nạp ức chế kết tập tiểu cầu tối đa ngăn chặn huyết khối cấp trong lúc nong stent.',
        evidenceRef: 'PLATO & TRITON-TIMI Trials / Class I',
      },
      node_stemi_thrombolysis: {
        id: 'node_stemi_thrombolysis',
        type: 'ACTION_STAT',
        title: 'Chỉ Định Tiêu Sợi Huyết Sớm (Door-to-Needle < 30 Phút)',
        timeframe: 'STAT < 30 Phút',
        description: 'Tenecteplase (TNK-tPA) theo cân nặng (30-50 mg IV bolus đơn liều trong 10 giây) hoặc Alteplase 100 mg truyền tĩnh mạch.',
        nextId: 'node_stemi_cath_lab',
        medications: [
          { name: 'Tenecteplase (TNK-tPA)', dose: 'Liều theo cân nặng (30-50mg)', route: 'IV Bolus', freq: 'Đơn liều' },
          { name: 'Aspirin + Clopidogrel 300mg', dose: 'Liều nạp', route: 'PO', freq: 'STAT' },
        ],
        clinicalRationale: 'Tiêu sợi huyết sớm trong 3 giờ đầu giúp cứu sống vùng cơ tim thiếu máu khi không có điều kiện PCI ngay.',
        evidenceRef: 'STREAM Trial / ESC 2023',
      },
      node_stemi_cath_lab: {
        id: 'node_stemi_cath_lab',
        type: 'OUTCOME_ICU',
        title: 'Đưa Bệnh Nhân Vào Phòng Cath Lab - Tái Tưới Máu Mạch Vành',
        timeframe: 'Door-to-Balloon < 90m',
        description: 'Chụp động mạch vành qua đường động mạch quay (Radial access), hút huyết khối và đặt Stent phủ thuốc (DES). Chuyển CCU theo dõi 48h.',
        clinicalRationale: 'Tiếp cận qua động mạch quay giảm tỷ lệ biến chứng chảy máu tại chỗ và giảm tử vong so với động mạch đùi.',
        evidenceRef: 'MATRIX Trial Lancet',
      },
    },
  },
];

export function renderFlowchartView(flowId?: string, nodeId?: string): string {
  const profile = getActiveProfile();
  if (!profile) return '';

  const selectedFlowId = flowId || (window as any).dsp_active_flowchart_id || CLINICAL_FLOWCHARTS[0].id;
  const currentFlow = CLINICAL_FLOWCHARTS.find(f => f.id === selectedFlowId) || CLINICAL_FLOWCHARTS[0];
  
  const currentNodeId = nodeId || (window as any).dsp_active_flowchart_node_id || currentFlow.initialNodeId;
  const currentNode = currentFlow.nodes[currentNodeId] || currentFlow.nodes[currentFlow.initialNodeId];

  const patients = getAllSoapPatients(profile.id);

  return `
    <div class="dsp-layout" id="dspLayout">
      ${renderSidebar(profile, 'protocol')}

      <main class="dsp-main" id="dspMain">
        ${renderDocSpaceHeader(profile, 'protocol')}

        <div class="dsp-page-content">
          
          <!-- Top Header -->
          <div class="dsp-flow-header">
            <div>
              <div class="dsp-telemetry-pill-tag">
                <i class="fa-solid fa-code-branch" style="color:var(--dsp-sky);"></i>
                <span>Clinical Decision Algorithm • Phác Đồ Tương Tác EBM</span>
              </div>
              <h1 class="dsp-page-title" style="margin-top:4px;">
                <i class="fa-solid fa-sitemap" style="color:var(--dsp-sky);"></i> ${escapeHtml(currentFlow.title)}
              </h1>
              <p class="dsp-page-subtitle">
                Nguồn khuyến cáo: <strong>${escapeHtml(currentFlow.guidelineSource)}</strong> • Mã ICD-10: <code>${currentFlow.diseaseCode}</code>
              </p>
            </div>

            <!-- Flowchart Switcher Dropdown -->
            <div class="dsp-flow-select-wrap">
              <label for="dspFlowSelect" style="font-size:0.75rem; color:var(--color-text-muted); font-weight:700; display:block; margin-bottom:4px;">
                <i class="fa-solid fa-book-medical"></i> Chọn Phác Đồ:
              </label>
              <select id="dspFlowSelect" class="dsp-select" style="min-width:280px; font-weight:700;">
                ${CLINICAL_FLOWCHARTS.map(f => `
                  <option value="${f.id}" ${f.id === currentFlow.id ? 'selected' : ''}>
                    [${f.diseaseCode}] ${escapeHtml(f.title)}
                  </option>
                `).join('')}
              </select>
            </div>
          </div>

          <!-- Protocol Summary Card -->
          <div class="dsp-flow-summary-card">
            <div style="display:flex; align-items:center; gap:8px; font-size:0.85rem; color:var(--dsp-sky); font-weight:800;">
              <i class="fa-solid fa-circle-info"></i> TÓM TẮT MỤC TIÊU ĐIỀU TRỊ:
            </div>
            <p style="margin:4px 0 0; font-size:0.85rem; color:var(--color-text); line-height:1.5;">
              ${escapeHtml(currentFlow.summary)}
            </p>
          </div>

          <!-- Main Interactive Node Showcase Box -->
          <div class="dsp-flow-node-card dsp-flow-node-card--${currentNode.type.toLowerCase()}">
            
            <div class="dsp-node-header">
              <div class="dsp-node-type-badge dsp-node-type-badge--${currentNode.type.toLowerCase()}">
                <i class="${getNodeIcon(currentNode.type)}"></i>
                <span>${getNodeTypeLabel(currentNode.type)}</span>
              </div>
              <div class="dsp-node-timeframe">
                <i class="fa-solid fa-clock"></i> ${escapeHtml(currentNode.timeframe)}
              </div>
            </div>

            <h2 class="dsp-node-title">${escapeHtml(currentNode.title)}</h2>
            ${currentNode.subtitle ? `<div class="dsp-node-subtitle">${escapeHtml(currentNode.subtitle)}</div>` : ''}

            <div class="dsp-node-desc">
              ${escapeHtml(currentNode.description)}
            </div>

            <!-- Decision Question & Branching Buttons -->
            ${currentNode.type === 'DECISION' ? `
              <div class="dsp-decision-box">
                <div class="dsp-decision-question">
                  <i class="fa-solid fa-circle-question" style="color:#f59e0b;"></i>
                  <strong>${escapeHtml(currentNode.conditionQuestion || 'Lựa chọn phương án tiếp theo:')}</strong>
                </div>
                <div class="dsp-decision-buttons">
                  ${currentNode.yesNextId ? `
                    <button type="button" class="dsp-branch-btn dsp-branch-btn--yes" data-target-node="${currentNode.yesNextId}">
                      <i class="fa-solid fa-check"></i> CÓ / ĐÚNG (Tiến hành can thiệp tích cực)
                    </button>
                  ` : ''}
                  ${currentNode.noNextId ? `
                    <button type="button" class="dsp-branch-btn dsp-branch-btn--no" data-target-node="${currentNode.noNextId}">
                      <i class="fa-solid fa-xmark"></i> KHÔNG / CHƯA CÓ (Điều trị tiêu chuẩn)
                    </button>
                  ` : ''}
                </div>
              </div>
            ` : ''}

            <!-- STAT Medications List -->
            ${currentNode.medications && currentNode.medications.length > 0 ? `
              <div class="dsp-node-meds-box">
                <div class="dsp-box-title"><i class="fa-solid fa-pills" style="color:#e11d48;"></i> Y Lệnh Thuốc &amp; Liều Nạp STAT:</div>
                <div class="dsp-meds-table-wrap">
                  <table class="dsp-meds-table">
                    <thead>
                      <tr>
                        <th>Tên Thuốc</th>
                        <th>Liều Lượng</th>
                        <th>Đường Dùng</th>
                        <th>Tần Suất</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${currentNode.medications.map(m => `
                        <tr>
                          <td><strong>${escapeHtml(m.name)}</strong></td>
                          <td><span class="dsp-dose-pill">${escapeHtml(m.dose)}</span></td>
                          <td>${escapeHtml(m.route)}</td>
                          <td>${escapeHtml(m.freq)}</td>
                        </tr>
                      `).join('')}
                    </tbody>
                  </table>
                </div>
              </div>
            ` : ''}

            <!-- Order Sets List -->
            ${currentNode.orderSets && currentNode.orderSets.length > 0 ? `
              <div class="dsp-node-orders-box">
                <div class="dsp-box-title"><i class="fa-solid fa-vial" style="color:#0284c7;"></i> Chỉ Định Cận Lâm Sàng Cần Làm:</div>
                <div class="dsp-orders-chips">
                  ${currentNode.orderSets.map(o => `
                    <span class="dsp-order-chip"><i class="fa-solid fa-check-double"></i> ${escapeHtml(o)}</span>
                  `).join('')}
                </div>
              </div>
            ` : ''}

            <!-- Red Flags Warning -->
            ${currentNode.redFlags && currentNode.redFlags.length > 0 ? `
              <div class="dsp-node-redflags-box">
                <div class="dsp-box-title" style="color:#f43f5e;"><i class="fa-solid fa-triangle-exclamation"></i> CẢNH BÁO NGUY HIỂM &amp; CHỐNG CHỈ ĐỊNH:</div>
                <ul style="margin:4px 0 0; padding-left:1.2rem; font-size:0.85rem; color:#f43f5e;">
                  ${currentNode.redFlags.map(rf => `<li>${escapeHtml(rf)}</li>`).join('')}
                </ul>
              </div>
            ` : ''}

            <!-- Clinical Rationale & Evidence -->
            <div class="dsp-node-evidence-row">
              <div>
                <strong>Biện luận lâm sàng:</strong> ${escapeHtml(currentNode.clinicalRationale)}
              </div>
              <div class="dsp-evidence-tag">
                <i class="fa-solid fa-award"></i> ${escapeHtml(currentNode.evidenceRef)}
              </div>
            </div>

            <!-- Bottom Navigation for Linear Nodes -->
            ${currentNode.type !== 'DECISION' && currentNode.nextId ? `
              <div class="dsp-node-footer-actions">
                <button type="button" class="dsp-btn dsp-btn-primary dsp-btn-next-node" data-target-node="${currentNode.nextId}">
                  <span>Tiếp tục bước tiếp theo</span> <i class="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            ` : ''}

            ${currentNode.type.startsWith('OUTCOME_') ? `
              <div class="dsp-node-footer-actions">
                <button type="button" class="dsp-btn dsp-btn-outline" id="btnRestartFlow">
                  <i class="fa-solid fa-rotate-left"></i> Khởi Động Lại Phác Đồ
                </button>
              </div>
            ` : ''}

          </div>

          <!-- 1-Click Apply to SOAP Note Widget -->
          <div class="dsp-apply-soap-card">
            <div class="dsp-apply-soap-header">
              <div style="display:flex; align-items:center; gap:8px;">
                <span class="dsp-icon-badge dsp-icon-badge--sky"><i class="fa-solid fa-file-signature"></i></span>
                <h3 style="margin:0; font-size:0.95rem; font-weight:800; color:var(--color-text);">Tích Hợp 1-Click Vào Sổ Tay SOAP Bệnh Phòng</h3>
              </div>
            </div>

            <div class="dsp-apply-soap-body">
              <div style="display:flex; flex-wrap:wrap; align-items:center; gap:12px;">
                <label for="dspFlowTargetPatientSelect" style="font-size:0.8rem; font-weight:700; color:var(--color-text-muted);">
                  Chọn Bệnh Nhân Đích:
                </label>
                <select id="dspFlowTargetPatientSelect" class="dsp-select" style="min-width:220px; font-weight:700;">
                  ${patients.map(p => `
                    <option value="${p.id}">
                      [G.${p.bedNumber || '?'}] ${escapeHtml(p.fullName)} — ${escapeHtml(p.currentDiagnosis || 'Chưa có CĐ')}
                    </option>
                  `).join('')}
                </select>
                <button type="button" class="dsp-btn dsp-btn-emerald" id="btnApplyFlowToSoap">
                  <i class="fa-solid fa-bolt"></i> Nạp Toàn Bộ Y Lệnh &amp; Thuốc Vào SOAP
                </button>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  `;
}

function getNodeIcon(type: string): string {
  switch (type) {
    case 'START': return 'fa-solid fa-play';
    case 'DECISION': return 'fa-solid fa-code-branch';
    case 'ACTION_STAT': return 'fa-solid fa-bolt';
    case 'ACTION_ROUTINE': return 'fa-solid fa-clipboard-check';
    case 'EVALUATION': return 'fa-solid fa-magnifying-glass-chart';
    case 'OUTCOME_ICU': return 'fa-solid fa-bed-pulse';
    case 'OUTCOME_DISCHARGE': return 'fa-solid fa-house-chimney-medical';
    default: return 'fa-solid fa-circle-dot';
  }
}

function getNodeTypeLabel(type: string): string {
  switch (type) {
    case 'START': return 'BƯỚC 1: TIẾP NHẬN & CHẨN ĐOÁN';
    case 'DECISION': return 'ĐÁNH GIÁ RẼ NHÁNH QUYẾT ĐỊNH';
    case 'ACTION_STAT': return 'Y LỆNH XỬ TRÍ KHẨN (STAT)';
    case 'ACTION_ROUTINE': return 'ĐIỀU TRỊ TIÊU CHUẨN';
    case 'EVALUATION': return 'TÁI ĐÁNH GIÁ 24-48H';
    case 'OUTCOME_ICU': return 'KẾT CỤC: HỒI SỨC TÍCH CỰC ICU';
    case 'OUTCOME_DISCHARGE': return 'KẾT CỤC: PHỤC HỒI & XUẤT VIỆN';
    default: return type;
  }
}

export function mountFlowchartController(): void {
  // Flowchart selector change
  const flowSelect = document.getElementById('dspFlowSelect') as HTMLSelectElement;
  if (flowSelect) {
    flowSelect.addEventListener('change', () => {
      (window as any).dsp_active_flowchart_id = flowSelect.value;
      (window as any).dsp_active_flowchart_node_id = undefined;
      const app = document.getElementById('app');
      if (app) {
        app.innerHTML = renderFlowchartView(flowSelect.value);
        mountFlowchartController();
      }
    });
  }

  // Branch buttons click
  document.querySelectorAll('[data-target-node]').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetNodeId = btn.getAttribute('data-target-node');
      if (targetNodeId) {
        (window as any).dsp_active_flowchart_node_id = targetNodeId;
        const app = document.getElementById('app');
        if (app) {
          app.innerHTML = renderFlowchartView(undefined, targetNodeId);
          mountFlowchartController();
        }
      }
    });
  });

  // Restart flow button
  document.getElementById('btnRestartFlow')?.addEventListener('click', () => {
    (window as any).dsp_active_flowchart_node_id = undefined;
    const app = document.getElementById('app');
    if (app) {
      app.innerHTML = renderFlowchartView();
      mountFlowchartController();
    }
  });

  // Apply to SOAP note
  document.getElementById('btnApplyFlowToSoap')?.addEventListener('click', () => {
    const profile = getActiveProfile();
    if (!profile) return;

    const patSelect = document.getElementById('dspFlowTargetPatientSelect') as HTMLSelectElement;
    const patId = patSelect ? patSelect.value : '';
    const patients = getAllSoapPatients(profile.id);
    const pat = patients.find(p => p.id === patId);
    if (!pat) {
      alert('Vui lòng chọn bệnh nhân hợp lệ.');
      return;
    }

    const flowId = (window as any).dsp_active_flowchart_id || CLINICAL_FLOWCHARTS[0].id;
    const currentFlow = CLINICAL_FLOWCHARTS.find(f => f.id === flowId) || CLINICAL_FLOWCHARTS[0];

    const planAppend = `\n[Phác đồ EBM: ${currentFlow.title}]:\n- Áp dụng các bước can thiệp chuẩn hoá theo khuyến cáo quốc tế.\n- Đánh giá động học và bilan theo dõi sát mỗi 4-6h.`;
    pat.pPlan = (pat.pPlan || '') + planAppend;
    updateSoapPatient(profile.id, pat.id, { pPlan: pat.pPlan });
    alert(`✅ Đã nạp thành công phác đồ "${currentFlow.title}" vào kế hoạch điều trị (P) của bệnh nhân ${pat.fullName}!`);
  });
}
