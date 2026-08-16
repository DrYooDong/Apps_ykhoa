/**
 * CliniPortal — Heart Failure Universal Definition & Staging Engine (TypeScript Module)
 * AHA/ACC/ESC/WHF 2026 Consensus: LVEF Classification (HFrEF, HFpEF, impHF), ACC/AHA Stages (A, B, C, D), Trajectory Subtypes & Quadruple GDMT Actions
 */

export interface HFCalculationResult {
  lvefType: string;
  lvefBadge: string;
  lvefDesc: string;
  stageVal: string;
  stageBadge: string;
  stageDesc: string;
  actionText: string;
}

export function calculateHF(): void {
  const lvefInput = (document.getElementById('lvef_current') as HTMLInputElement | null)?.value;
  const history = (document.getElementById('lvef_history') as HTMLSelectElement | null)?.value || 'no';
  const stage = (document.getElementById('hf_stage') as HTMLSelectElement | null)?.value || '';
  const status = (document.getElementById('hf_status') as HTMLSelectElement | null)?.value || 'stable';
  const etiology = (document.getElementById('hf_etiology') as HTMLSelectElement | null)?.value || 'none';

  const dashboard = document.getElementById('resultDashboard');
  const emptyState = document.getElementById('emptyState');
  const resultContent = document.getElementById('resultContent');

  if (!dashboard || !emptyState || !resultContent) return;

  // Show empty state if nothing is entered
  if (!lvefInput && !stage && etiology === 'none') {
    dashboard.classList.remove('active');
    emptyState.style.display = 'block';
    resultContent.style.display = 'none';
    return;
  }

  // Activate dashboard
  dashboard.classList.add('active');
  emptyState.style.display = 'none';
  resultContent.style.display = 'block';

  // 1. Evaluate LVEF Type
  let lvefType = '-';
  let lvefBadge = 'badge-default';
  let lvefDesc = 'Chưa có thông tin LVEF';

  if (lvefInput) {
    const lvef = parseFloat(lvefInput);
    if (history === 'yes' && lvef >= 40) {
      lvefType = 'impHF (Cải thiện)';
      lvefBadge = 'badge-info';
      lvefDesc = 'Cải thiện LVEF nhờ điều trị GDMT/tái cấu trúc.';
    } else if (lvef < 50) {
      lvefType = 'HFrEF (Giảm)';
      lvefBadge = 'badge-danger';
      lvefDesc = 'LVEF dưới mức bình thường (không còn mốc cắt cứng nhắc).';
    } else {
      lvefType = 'HFpEF (Bảo tồn)';
      lvefBadge = 'badge-warning';
      lvefDesc = 'LVEF ở mức bảo tồn nhưng có rối loạn tâm trương.';
    }
  }

  // 2. Evaluate Stage & Status
  let stageVal = '-';
  let stageBadge = 'badge-default';
  let stageDesc = 'Chưa phân giai đoạn';
  let actionText = '';

  if (stage) {
    stageVal = 'Giai đoạn ' + stage;

    if (stage === 'A') {
      stageBadge = 'badge-success';
      stageDesc = 'Nguy cơ cao, chưa có tổn thương tim.';
      actionText =
        'Mục tiêu: Kiểm soát tích cực yếu tố nguy cơ (THA, ĐTĐ, béo phì, lipid máu) để ngăn ngừa tổn thương cấu trúc tim.';
    } else if (stage === 'B') {
      stageBadge = 'badge-info';
      stageDesc = 'Tiền suy tim (Pre-HF), chưa có triệu chứng.';
      actionText =
        'Mục tiêu: Ngăn chặn tiến triển. Cân nhắc ACEi/ARB, Beta-blocker hoặc SGLT2i tùy bệnh cảnh.';
    } else if (stage === 'C') {
      stageBadge = 'badge-warning';

      if (status === 'worsening') {
        stageVal += ' - Diễn tiến xấu';
        stageDesc = 'Triệu chứng nặng dần, tăng biomarker.';
        actionText =
          'Bệnh nhân đang ở quỹ đạo Diễn tiến xấu (Worsening HF). Tăng cường và tối ưu hóa bộ tứ GDMT (ARNI/ACEi, BB, MRA, SGLT2i).';
      } else if (status === 'decompensated') {
        stageBadge = 'badge-danger';
        stageVal += ' - Mất bù (DHF)';
        stageDesc = 'Đợt cấp bắt buộc leo thang điều trị.';
        actionText =
          'Giải quyết sung huyết (lợi tiểu quai) và tận dụng thời gian này để tối ưu hóa GDMT trước khi xuất viện. Lưu ý không tự ý cắt giảm thuốc.';
      } else if (status === 'remission') {
        stageBadge = 'badge-success';
        stageVal += ' - Lui bệnh';
        stageDesc = 'Hết triệu chứng, biomarker ổn định.';
        actionText =
          'Bệnh nhân đạt Lui bệnh (Remission). BẮT BUỘC duy trì GDMT, không ngừng thuốc vì rủi ro tái phát rất cao.';
      } else {
        stageVal += ' - Ổn định';
        stageDesc = 'Triệu chứng được kiểm soát tốt.';
        actionText = 'Tiếp tục duy trì liều đích GDMT, theo dõi lâm sàng định kỳ.';
      }
    } else if (stage === 'D') {
      stageBadge = 'badge-danger';
      stageDesc = 'Suy tim tiến triển/kháng trị.';
      actionText =
        'Chuyển tuyến chuyên sâu. Cân nhắc các liệu pháp thay thế: MCS, ghép tim, hoặc chăm sóc giảm nhẹ.';
    }
  }

  // Etiology note
  if (etiology === 'infiltrative') {
    actionText +=
      (actionText ? '<br><br>' : '') +
      '<strong>Chú ý:</strong> Bệnh cơ tim thâm nhiễm (như Amyloidosis) cần các liệu pháp điều trị trúng đích riêng biệt.';
  } else if (etiology !== 'none') {
    actionText +=
      (actionText ? '<br><br>' : '') +
      '<strong>Nguyên nhân nền:</strong> Điều trị đặc hiệu theo nguyên nhân gốc rễ là cực kỳ quan trọng.';
  }

  // ImpHF note
  if (lvefType.includes('impHF')) {
    actionText +=
      (actionText ? '<br><br>' : '') +
      '<strong>Cảnh báo (impHF):</strong> LVEF cải thiện không có nghĩa là khỏi bệnh. Tuyệt đối không ngừng GDMT.';
  }

  if (!actionText) {
    actionText = 'Vui lòng nhập thêm Giai đoạn hoặc Nguyên nhân để có khuyến cáo lâm sàng.';
  }

  // Render Results
  const resLvefBadge = document.getElementById('res_lvef_badge');
  const resLvefVal = document.getElementById('res_lvef_val');
  const resLvefDesc = document.getElementById('res_lvef_desc');
  const resStageBadge = document.getElementById('res_stage_badge');
  const resStageVal = document.getElementById('res_stage_val');
  const resStageDesc = document.getElementById('res_stage_desc');
  const resActionText = document.getElementById('res_action_text');

  if (resLvefBadge) {
    resLvefBadge.className = 'badge ' + lvefBadge;
    resLvefBadge.innerText = lvefType !== '-' ? lvefType.split(' ')[0] : 'N/A';
  }
  if (resLvefVal) resLvefVal.innerText = lvefType;
  if (resLvefDesc) resLvefDesc.innerText = lvefDesc;

  if (resStageBadge) {
    resStageBadge.className = 'badge ' + stageBadge;
    resStageBadge.innerText = stage ? 'Stage ' + stage : 'N/A';
  }
  if (resStageVal) resStageVal.innerText = stageVal;
  if (resStageDesc) resStageDesc.innerText = stageDesc;

  if (resActionText) resActionText.innerHTML = actionText;
}

export function initHeartFailureCalculator(): void {
  const inputs = document.querySelectorAll('#hfCalcForm input, #hfCalcForm select');
  inputs.forEach(input => {
    input.addEventListener('input', calculateHF);
    input.addEventListener('change', calculateHF);
  });

  calculateHF();
}

// Global binding
if (typeof window !== 'undefined') {
  (window as any).calculateHF = calculateHF;
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeartFailureCalculator);
  } else {
    initHeartFailureCalculator();
  }
}
