/**
 * DocSpace — SBAR View
 * Soạn, xem và in báo cáo SBAR (Situation-Background-Assessment-Recommendation)
 */

import { 
  getAllSBARs, saveSBAR, updateSBAR, deleteSBAR, getSBARById,
  getAllSoapPatients, updateSoapPatient, getAllShifts, saveCase, addSoapDailyLog
} from '../storage';
import { SBARRecord, SoapPatientRecord, OnCallShift } from '../types';
import { renderSidebar, renderDocSpaceHeader, formatRelativeDate } from '../docspace-view';
import { getActiveProfile } from '../storage';
import { generateSBAR, critiqueSBARWithAI, SBARCritiqueResult } from '../ai/llm-client';

export interface VitalsCalcResult {
  news2Score: number;
  news2Risk: 'low' | 'medium' | 'high';
  news2Label: string;
  news2Color: string;
  qsofaScore: number;
  isQsofaHigh: boolean;
}

export function calculateNEWS2_qSOFA(
  hr?: number,
  sbp?: number,
  rr?: number,
  spo2?: number,
  onO2 = false,
  temp?: number,
  avpu = 'A'
): VitalsCalcResult {
  let news2 = 0;
  let hasScore3 = false;

  // RR
  if (rr !== undefined && !isNaN(rr)) {
    if (rr <= 8) { news2 += 3; hasScore3 = true; }
    else if (rr <= 11) news2 += 1;
    else if (rr <= 20) news2 += 0;
    else if (rr <= 24) news2 += 2;
    else if (rr >= 25) { news2 += 3; hasScore3 = true; }
  }

  // SpO2
  if (spo2 !== undefined && !isNaN(spo2)) {
    if (spo2 <= 91) { news2 += 3; hasScore3 = true; }
    else if (spo2 <= 93) news2 += 2;
    else if (spo2 <= 95) news2 += 1;
  }

  // On O2
  if (onO2) news2 += 2;

  // SBP
  if (sbp !== undefined && !isNaN(sbp)) {
    if (sbp <= 90) { news2 += 3; hasScore3 = true; }
    else if (sbp <= 100) news2 += 2;
    else if (sbp <= 110) news2 += 1;
    else if (sbp >= 220) { news2 += 3; hasScore3 = true; }
  }

  // HR
  if (hr !== undefined && !isNaN(hr)) {
    if (hr <= 40) { news2 += 3; hasScore3 = true; }
    else if (hr <= 50) news2 += 1;
    else if (hr >= 131) { news2 += 3; hasScore3 = true; }
    else if (hr >= 111) news2 += 2;
    else if (hr >= 91) news2 += 1;
  }

  // AVPU
  if (avpu && avpu !== 'A') {
    news2 += 3;
    hasScore3 = true;
  }

  // Temp
  if (temp !== undefined && !isNaN(temp)) {
    if (temp <= 35.0) { news2 += 3; hasScore3 = true; }
    else if (temp <= 36.0) news2 += 1;
    else if (temp >= 39.1) news2 += 2;
    else if (temp >= 38.1) news2 += 1;
  }

  // Risk categorization
  let news2Risk: 'low' | 'medium' | 'high' = 'low';
  let news2Label = 'Nguy cơ Thấp';
  let news2Color = '#16a34a';

  if (news2 >= 7) {
    news2Risk = 'high';
    news2Label = 'Nguy cơ Cao (Cần BS Cấp cứu / ICU ngay)';
    news2Color = '#dc2626';
  } else if (news2 >= 5 || hasScore3) {
    news2Risk = 'medium';
    news2Label = 'Nguy cơ Trung bình (Theo dõi sát mỗi 1h)';
    news2Color = '#ea580c';
  }

  // qSOFA (SBP <= 100: 1, RR >= 22: 1, AVPU != 'A': 1)
  let qsofa = 0;
  if (sbp !== undefined && !isNaN(sbp) && sbp <= 100) qsofa += 1;
  if (rr !== undefined && !isNaN(rr) && rr >= 22) qsofa += 1;
  if (avpu && avpu !== 'A') qsofa += 1;

  return {
    news2Score: news2,
    news2Risk,
    news2Label,
    news2Color,
    qsofaScore: qsofa,
    isQsofaHigh: qsofa >= 2
  };
}

const SBAR_STEPS = [
  { key: 'situation',     label: 'S — Situation (Tình huống)',     color: 'var(--dsp-sbar-s)', icon: 'fa-solid fa-triangle-exclamation', placeholder: 'Bệnh nhân X, tuổi Y, giường Z. Lý do liên hệ: ...' },
  { key: 'background',    label: 'B — Background (Bối cảnh)',      color: 'var(--dsp-sbar-b)', icon: 'fa-solid fa-clock-rotate-left',   placeholder: 'Tiền sử, bệnh nền, thuốc đang dùng, lý do nhập viện ban đầu...' },
  { key: 'assessment',    label: 'A — Assessment (Đánh giá)',      color: 'var(--dsp-sbar-a)', icon: 'fa-solid fa-magnifying-glass-chart', placeholder: 'Dấu hiệu sinh tồn, đánh giá lâm sàng hiện tại, vấn đề chính...' },
  { key: 'recommendation',label: 'R — Recommendation (Đề xuất)', color: 'var(--dsp-sbar-r)', icon: 'fa-solid fa-check-circle',         placeholder: 'Đề xuất xử trí, cần hội chẩn, y lệnh bổ sung...' },
];

export interface SBARPreset {
  id: string;
  name: string;
  badge: string;
  icon: string;
  title: string;
  situation: string;
  background: string;
  assessment: string;
  recommendation: string;
}

export const SBAR_PRESETS: SBARPreset[] = [
  {
    id: 'emergency',
    name: 'Cấp cứu / Báo động đỏ',
    badge: 'Khẩn cấp',
    icon: 'fa-solid fa-triangle-exclamation',
    title: '[Khẩn cấp] BN [Tên] - Tụt HA / Suy hô hấp cấp',
    situation: 'Bệnh nhân [Tên BN], [Tuổi] tuổi, Giường [Số giường], Khoa [Tên khoa].\nĐang đột ngột xuất hiện [khó thở dữ dội / tụt HA / đau ngực cấp / lơ mơ]. Cần Bác sĩ hỗ trợ khẩn cấp tại giường!',
    background: 'Lý do vào viện: [Chẩn đoán vào viện].\nTiền sử bệnh: [THA, ĐTĐ, COPD, Bệnh mạch vành...].\nThuốc & can thiệp gần nhất: [Thuốc vừa dùng, dịch truyền...]. Dị ứng: [Không ghi nhận / Dị ứng...].',
    assessment: 'Sinh hiệu hiện tại:\n- Mạch: [...] l/p | Huyết áp: [...]/[...] mmHg | SpO2: [...]% (Khí phòng / Thở O2 [...]L/p)\n- Nhịp thở: [...] l/p | Thân nhiệt: [...]°C | Tri giác: [Tỉnh / Lơ mơ / GCS [...]đ]\nKhám nhanh: [Phổi rale rít/ẩm, tim nhanh/loạn nhịp, vã mồ hôi, co kéo cơ hô hấp phụ...]\nVấn đề chính: Nghi ngờ [Sốc phản vệ / Cơn hen cấp nặng / Phù phổi cấp / NMCT cấp...]',
    recommendation: 'Đề xuất xử trí khẩn:\n1) Bác sĩ trực đến khám và chỉ đạo xử trí tại giường ngay.\n2) Chuẩn bị máy hút, bóng Ambu, oxy mask 10L/p, lập 02 đường truyền tĩnh mạch lớn.\n3) Chỉ định cấp: Đo ECG tại giường, Khí máu động mạch (ABG), Men tim Troponin, X-quang phổi tại giường.'
  },
  {
    id: 'handover',
    name: 'Bàn giao ca trực (Handover)',
    badge: 'Giao ban',
    icon: 'fa-solid fa-arrows-rotate',
    title: '[Bàn giao] BN [Tên] - Giường [Số] (Tua trực [Ngày/Đêm])',
    situation: 'Bàn giao BN [Tên BN], [Tuổi]t, Giường [Số], Phòng [Số phòng].\nChẩn đoán: [Chẩn đoán chính]. Ngày điều trị thứ [...].',
    background: 'Bệnh nền: [Bệnh nền chính].\nDiễn tiến trong ca trực vừa qua: [Đã hết sốt, giảm đau bụng, vừa truyền xong 1 đv máu...].\nKết quả CLS mới về: [CT bụng không thấy dịch tự do, Hb sau truyền: 9.8 g/dL...].',
    assessment: 'Tình trạng hiện tại bàn giao:\n- Sinh hiệu: Mạch [...], HA [...]/[...], SpO2 [...]%, To [...]°C.\n- Bệnh nhân tỉnh táo, tiếp xúc tốt, bụng mềm, không khó thở.\n- Dẫn lưu / Vết mổ: [Băng sạch, dẫn lưu ra 50ml dịch hồng]. Nước tiểu 24h: [...] ml.',
    recommendation: 'Kế hoạch theo dõi ca sau:\n1) Lấy máu làm lại xét nghiệm [Creatinine, Điện giải đồ] lúc 05h00 sáng.\n2) Chụp X-quang phổi kiểm tra lại vào buổi sáng.\n3) Theo dõi sát lượng nước tiểu qua sonde mỗi 3 giờ.'
  },
  {
    id: 'consult',
    name: 'Báo cáo BS / Hội chẩn',
    badge: 'Hội chẩn',
    icon: 'fa-solid fa-user-doctor',
    title: '[Hội chẩn] Xin ý kiến BS Chuyên khoa [Tim mạch/Ngoại/ICU] - BN [Tên]',
    situation: 'Em là BS [Tên BS], đang trực tại Khoa [Nội/Cấp cứu].\nEm xin liên hệ để báo cáo và xin ý kiến hội chẩn tại giường ca bệnh [Tên BN], [Tuổi]t, Giường [Số].\nVấn đề cần hội chẩn: [BN đau ngực tăng dần kèm men tim tăng động học / Nghi ngờ viêm ruột thừa cấp vỡ...]',
    background: 'BN vào viện lúc [hh:mm] vì [Lý do].\nĐã được xử trí: [Liều nạp Aspirin + Clopidogrel / Kháng sinh IV / Bù dịch...].\nTiền sử: [Tăng huyết áp 10 năm, Can thiệp PCI cách đây 2 năm...].',
    assessment: 'Đánh giá lâm sàng hiện tại:\n- Sinh hiệu: Mạch [...], HA [...]/[...], SpO2 [...]%.\n- ECG: ST chênh lên ở các chuyển đạo [V1-V4 / DII, DIII, aVF].\n- Men tim: Troponin T hs lúc vào: [...] ng/L, sau 2h: [...] ng/L.\n- Nhận định: Đủ tiêu chuẩn chẩn đoán [NMCT cấp ST chênh lên giờ thứ 3].',
    recommendation: 'Xin ý kiến Bác sĩ chuyên khoa:\n1) Đánh giá chỉ định chụp & can thiệp mạch vành cấp cứu (Primary PCI).\n2) Hướng dẫn dùng thuốc chống đông (Heparin) và thuốc vận mạch tiếp theo.\n3) Chuẩn bị thủ tục chuyển phòng Cathlab.'
  },
  {
    id: 'adverse_drug',
    name: 'Dị ứng / Biến cố thuốc',
    badge: 'Cảnh giác Dược',
    icon: 'fa-solid fa-pills',
    title: '[Cảnh giác Dược] BN [Tên] - Phản ứng nghi ngờ dị ứng/phản vệ thuốc',
    situation: 'BN [Tên BN], [Tuổi]t, Giường [Số].\nXuất hiện phản ứng bất thường lúc [hh:mm] sau khi bắt đầu tiêm truyền [Tên thuốc/Kháng sinh] được [...] phút.',
    background: 'Thuốc nghi ngờ: [Tên thuốc, hàm lượng, tốc độ truyền].\nTiền sử dị ứng thuốc trước đây: [Chưa ghi nhận / Tiền sử dị ứng kháng sinh nhóm Beta-lactam...].\nChỉ định dùng thuốc ban đầu: [Viêm phổi cộng đồng / Nhiễm khuẩn huyết...].',
    assessment: 'Triệu chứng xuất hiện:\n- Da & Niêm mạc: [Mẩn đỏ, ngứa rát, nổi mày đay rải rác toàn thân / Phù mi mắt môi].\n- Hô hấp: [Cảm giác nghẹn họng, thở rít nhẹ Stridor, SpO2 [...]%].\n- Tuần hoàn: [Mạch nhanh [...] l/p, Huyết áp: [...]/[...] mmHg].\n- Phân độ phản vệ: [Độ II - Mức độ Vừa / Độ III - Nặng].',
    recommendation: 'Xử trí đã và đang thực hiện:\n1) ĐÃ NGỪNG NGAY đường truyền thuốc nghi ngờ.\n2) Tiêm bắp Adrenaline 1mg/1ml: Tiêm 1/2 ống (0.5mg) vào mặt trước ngoài đùi.\n3) Cho thở oxy qua cannula 4L/p, lập đường truyền NaCl 0.9% chảy nhanh.\n4) Đề xuất BS trực kiểm tra lại và chỉ định thêm Methylprednisolone + Kháng Histamin H1.'
  },
  {
    id: 'pediatric',
    name: 'Nhi khoa / Suy hô hấp nhi',
    badge: 'Nhi khoa',
    icon: 'fa-solid fa-baby',
    title: '[Nhi khoa] Bé [Tên], [Tuổi] - [Suy hô hấp / Sốt cao co giật]',
    situation: 'Bé [Tên bé], [Tuổi hoặc Tháng tuổi], Cân nặng: [kg] kg, Phòng/Giường [Số].\nVào viện vì: [Sốt cao co giật / Thở co kéo gắng sức / Bỏ bú, nôn ói].',
    background: 'Khởi phát bệnh: [Ngày thứ 2 sau sốt cao...].\nTiền sử: [Co giật do sốt 1 lần lúc 18 tháng tuổi / Sinh non 34 tuần...].\nTiêm chủng: [Đã tiêm 6in1, Phế cầu đầy đủ]. Dị ứng: [Không].',
    assessment: 'Tam giác đánh giá nhi khoa (PAT):\n1) Tri giác / Hình dáng: [Lừ đừ / Kích thích quấy khóc / Giảm trương lực cơ].\n2) Hô hấp: [Thở nhanh [...] l/p, co lõm hõm ức & liên sườn, cánh mũi phập phồng, SpO2: [...]%].\n3) Tuần hoàn: [Da tái, CRT 3 giây, Mạch nhanh [...] l/p, Nhiệt độ: [...]°C].\nĐánh giá: [Cơn hen phế quản cấp trung bình-nặng / Sốt cao co giật lành tính].',
    recommendation: 'Đề xuất xử trí:\n1) Phun khí dung Ventolin 2.5mg + Pulmicort 0.5mg ngay.\n2) Thở oxy gọng kính 2L/p giữ SpO2 >= 95%.\n3) Hạ sốt Paracetamol đặt hậu môn liều [Cân nặng x 15mg = ... mg].\n4) Mời BS Cấp cứu Nhi hội chẩn tại giường.'
  },
  {
    id: 'transfer',
    name: 'Chuyển khoa / Tuyến trên',
    badge: 'Chuyển viện',
    icon: 'fa-solid fa-truck-medical',
    title: '[Chuyển viện/khoa] BN [Tên] - Chuyển sang [ICU / BV Tuyến trên]',
    situation: 'Báo cáo chuyển bệnh nhân [Tên BN], [Tuổi] tuổi từ Khoa [Khoa chuyển] sang [Khoa Hồi sức tích cực (ICU) / BV Tuyến trên].\nLý do chuyển: [Suy hô hấp tiến triển cần thở máy xâm lấn / Sốc nhiễm khuẩn kháng bù dịch].',
    background: 'Chẩn đoán xác định: [Viêm tụy cấp thể nặng hoại tử / Sốc nhiễm khuẩn từ đường mật].\nTổng số ngày nằm viện: [...] ngày. Đã điều trị: [Kháng sinh phổ rộng, bù dịch theo CVP, nuôi dưỡng tĩnh mạch...].',
    assessment: 'Tình trạng sinh hiệu trước khi chuyển:\n- Mạch: [...] l/p | Huyết áp: [...]/[...] mmHg (đang duy trì Noradrenaline [...] mcg/kg/phút).\n- Đang thở O2 HFNC: Lưu lượng [...] L/p, FiO2: [...]%, SpO2: [...]%.\n- Thiết bị & Đường truyền kèm theo: 01 CVC tĩnh mạch cảnh trong, 01 sonde dạ dày, 01 sonde tiểu lưu ra [...] ml/24h.',
    recommendation: 'Kế hoạch bàn giao vận chuyển:\n1) Chuẩn bị máy thở xách tay, monitor theo dõi sinh hiệu trên xe cấp cứu.\n2) Đi cùng xe: 01 Bác sĩ và 01 Điều dưỡng mang theo hộp thuốc cấp cứu.\n3) Đã thông báo và Khoa tiếp nhận đã chuẩn bị sẵn sàng giường & máy thở.'
  }
];

export function formatSBARToChat(record: SBARRecord, doctorName = ''): string {
  const timeStr = new Date(record.updatedAt || record.createdAt || Date.now()).toLocaleString('vi-VN', {
    hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric'
  });
  return [
    `🚨 *[BÁO CÁO SBAR]*: *${record.title || 'Trình bệnh khẩn'}*`,
    `⏱️ *Thời gian:* ${timeStr}${doctorName ? ` | 👨‍⚕️ *BS:* ${doctorName}` : ''}`,
    `----------------------------------------`,
    `🔴 *S — TÌNH HUỐNG (Situation):*`,
    record.situation ? record.situation.trim() : '_(Chưa có thông tin)_',
    ``,
    `🕒 *B — BỐI CẢNH (Background):*`,
    record.background ? record.background.trim() : '_(Chưa có thông tin)_',
    ``,
    `🔍 *A — ĐÁNH GIÁ (Assessment):*`,
    record.assessment ? record.assessment.trim() : '_(Chưa có thông tin)_',
    ``,
    `✅ *R — ĐỀ XUẤT (Recommendation):*`,
    record.recommendation ? record.recommendation.trim() : '_(Chưa có thông tin)_',
    `----------------------------------------`,
    `🏥 _Tạo tự động từ CliniPortal DocSpace_`
  ].join('\n');
}

export function formatSBARToSMS(record: SBARRecord): string {
  return `[SBAR] ${record.title || 'Báo cáo'} | S: ${record.situation || '-'} | B: ${record.background || '-'} | A: ${record.assessment || '-'} | R: ${record.recommendation || '-'}`.replace(/\n+/g, ' ');
}

export async function renderSBARView(profileId: string, editId?: string): Promise<string> {
  const profile = getActiveProfile();
  if (!profile) return '';

  const sbars = await getAllSBARs(profileId);
  const editRecord = editId ? await getSBARById(profileId, editId) : null;

  const listHtml = sbars.length
    ? sbars.map(s => `
        <div class="dsp-list-item" data-sbar-id="${s.id}">
          <div class="dsp-list-item-body">
            <div class="dsp-list-item-title">
              ${escapeHtml(s.title) || '(Chưa đặt tên)'}
              ${s.isLocked ? '<i class="fa-solid fa-lock dsp-text-primary" title="Đã Khóa & Ký"></i>' : ''}
              ${s.isTampered ? '<i class="fa-solid fa-triangle-exclamation dsp-text-danger" title="Dữ liệu bị can thiệp!"></i>' : ''}
            </div>
            <div class="dsp-list-item-meta">
              ${s.isDraft ? '<span class="dsp-badge dsp-badge--draft">Nháp</span>' : ''}
              <span>${formatRelativeDate(s.updatedAt)}</span>
            </div>
            <div class="dsp-sbar-preview">
              <span class="dsp-sbar-chip dsp-sbar-s">S</span>
              <span class="dsp-sbar-preview-text">${truncate(s.situation, 60)}</span>
            </div>
          </div>
          <div class="dsp-list-item-actions">
            <button class="dsp-icon-btn" style="color:#2563eb" data-action="copy-chat-sbar" data-id="${s.id}" title="Sao chép dạng tin nhắn Zalo/Telegram">
              <i class="fa-solid fa-share-nodes"></i>
            </button>
            <button class="dsp-icon-btn" style="color:var(--color-primary)" data-action="sandbox-sbar" data-id="${s.id}" title="Đưa vào Sandbox (Mô phỏng)">
              <i class="fa-solid fa-flask"></i>
            </button>
            <button class="dsp-icon-btn" data-action="view-sbar" data-id="${s.id}" title="Xem & In">
              <i class="fa-solid fa-eye"></i>
            </button>
            ${!s.isLocked ? `
              <button class="dsp-icon-btn" data-action="edit-sbar" data-id="${s.id}" title="Chỉnh sửa">
                <i class="fa-solid fa-pen"></i>
              </button>
              <button class="dsp-icon-btn dsp-icon-btn--danger" data-action="delete-sbar" data-id="${s.id}" title="Xóa">
                <i class="fa-solid fa-trash"></i>
              </button>
            ` : `
              <button class="dsp-icon-btn" disabled title="Bản ghi đã khóa"><i class="fa-solid fa-lock"></i></button>
            `}
          </div>
        </div>
      `).join('')
    : `<div class="dsp-empty-state">
         <i class="fa-solid fa-file-waveform"></i>
         <p>Chưa có SBAR nào. Tạo SBAR đầu tiên →</p>
       </div>`;

  const formTitle = editRecord ? `Chỉnh sửa: ${editRecord.title || 'SBAR'}` : 'Tạo SBAR mới';
  const isLocked = editRecord?.isLocked === true;
  
  const presetsHtml = `
    <div class="dsp-sbar-presets-container" style="margin-bottom: 1.25rem; background: var(--color-bg); padding: 0.875rem; border-radius: 8px; border: 1px solid var(--color-border);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; flex-wrap: wrap; gap: 6px;">
        <span style="font-size: 0.85rem; font-weight: 700; color: var(--color-text); display: flex; align-items: center; gap: 6px;">
          <i class="fa-solid fa-bolt" style="color: #eab308;"></i> Chọn nhanh mẫu SBAR & Liên kết hồ sơ:
        </span>
        <button type="button" class="dsp-btn dsp-btn-sm" id="dspBtnOpenPatientPicker" ${isLocked ? 'disabled' : ''} style="background: #0284c7; color: #fff; border: none; font-size: 0.78rem; padding: 3px 10px; border-radius: 6px;">
          <i class="fa-solid fa-hospital-user"></i> 👤 Nhập từ SOAP / Ca trực
        </button>
      </div>
      <div class="dsp-preset-chips" style="display: flex; flex-wrap: wrap; gap: 6px;">
        ${SBAR_PRESETS.map(p => `
          <button type="button" class="dsp-btn dsp-btn-sm dsp-btn-ghost dsp-sbar-preset-btn" data-preset-id="${p.id}" ${isLocked ? 'disabled' : ''} style="border: 1px solid var(--color-border); background: var(--color-surface); font-size: 0.8rem; padding: 4px 10px; border-radius: 20px; display: inline-flex; align-items: center; gap: 5px;">
            <i class="${p.icon}"></i> ${p.name}
          </button>
        `).join('')}
      </div>
    </div>
  `;

  const formHtml = `
    <form class="dsp-sbar-form" id="dspSBARForm" novalidate>
      <input type="hidden" id="dspSBAREditId" value="${editRecord?.id || ''}" />
      
      ${isLocked ? `
        <div class="dsp-alert dsp-alert-warning dsp-mb-4" style="background: #fff3cd; color: #856404; padding: 10px; border-radius: 4px;">
          <i class="fa-solid fa-lock"></i> SBAR này đã được ký số và khóa. Bạn không thể chỉnh sửa.
        </div>
      ` : ''}

      ${!isLocked ? presetsHtml : ''}

      <div class="dsp-form-group">
        <label class="dsp-label" for="dspSBARTitle">Tiêu đề (tùy chọn)</label>
        <input class="dsp-input" type="text" id="dspSBARTitle"
          placeholder="VD: BN suy hô hấp phòng 5 lúc 2h sáng"
          value="${escapeHtml(editRecord?.title || '')}" maxlength="100" ${isLocked ? 'disabled' : ''} />
      </div>

      <!-- AI Assistant -->
      <div class="dsp-card" style="background: var(--color-surface); margin-bottom: 1.5rem; border: 1px dashed #8b5cf6; padding: 1rem; border-radius: 8px;">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
          <h3 style="margin-top:0; font-size: 1rem; color: #8b5cf6;"><i class="fa-solid fa-wand-magic-sparkles"></i> Trợ lý AI: Phân tích & Phản biện SBAR</h3>
          <div style="display: flex; gap: 6px;">
            ${editRecord && editRecord.versions && editRecord.versions.length > 0 ? `
              <button type="button" class="dsp-btn dsp-btn-sm dsp-btn-outline" id="btnViewSBARHistory" style="color: #8b5cf6; border-color: #8b5cf6;">
                <i class="fa-solid fa-clock-rotate-left"></i> Lịch sử AI (${editRecord.versions.length})
              </button>
            ` : ''}
          </div>
        </div>
        <p style="font-size: 0.85rem; color: var(--color-text-muted); margin-bottom: 0.5rem;">Dán đoạn ghi chú lộn xộn hoặc ghi âm, AI sẽ phân loại thành S-B-A-R hoặc kiểm tra lỗ hổng an toàn.</p>
        <textarea class="dsp-textarea" id="dspSBAR_RawNotes" rows="3" placeholder="Ví dụ: Bn nam 65t, vô vì đau ngực. Tiền sử THA. Khám thấy tim đều, huyết áp 160/90. Cho làm ECG gấp..."></textarea>
        <div class="dsp-ai-actions" style="display: flex; justify-content: flex-end; gap: 8px; margin-top: 0.5rem; flex-wrap: wrap;">
          <button type="button" class="dsp-btn dsp-btn-sm dsp-btn-outline" id="btnVoiceToSBAR" style="color: #8b5cf6; border-color: #8b5cf6; flex: 1 1 auto; justify-content: center;">
            <i class="fa-solid fa-microphone"></i> 🎙️ Ghi âm giọng nói
          </button>
          <button type="button" class="dsp-btn dsp-btn-sm dsp-btn-outline" id="btnAICritiqueSBAR" style="color: #ea580c; border-color: #ea580c; flex: 1 1 auto; justify-content: center;" title="AI rà soát cờ đỏ, phát hiện thiếu sót và gợi ý câu hỏi phản biện">
            <i class="fa-solid fa-shield-halved"></i> 🛡️ AI Phản biện SBAR
          </button>
          <button type="button" class="dsp-btn dsp-btn-sm dsp-btn-primary" id="btnAIGenerateSBAR" style="background-color: #8b5cf6; border-color: #8b5cf6; flex: 1 1 auto; justify-content: center;">
            <i class="fa-solid fa-wand-magic-sparkles"></i> Phân tích AI SBAR
          </button>
        </div>
      </div>

      <!-- S — Situation -->
      <div class="dsp-sbar-step" style="--step-color: var(--dsp-sbar-s)">
        <label class="dsp-sbar-step-label" for="dspSBAR_situation">
          <i class="fa-solid fa-triangle-exclamation" style="color: var(--dsp-sbar-s)"></i>
          S — Situation (Tình huống)
        </label>
        <textarea class="dsp-textarea" id="dspSBAR_situation"
          placeholder="Bệnh nhân X, tuổi Y, giường Z. Lý do liên hệ: ..." rows="3" ${isLocked ? 'disabled' : ''}
          >${escapeHtml(editRecord ? editRecord.situation : '')}</textarea>
      </div>

      <!-- B — Background -->
      <div class="dsp-sbar-step" style="--step-color: var(--dsp-sbar-b)">
        <label class="dsp-sbar-step-label" for="dspSBAR_background">
          <i class="fa-solid fa-clock-rotate-left" style="color: var(--dsp-sbar-b)"></i>
          B — Background (Bối cảnh)
        </label>
        <textarea class="dsp-textarea" id="dspSBAR_background"
          placeholder="Tiền sử, bệnh nền, thuốc đang dùng, lý do nhập viện ban đầu..." rows="3" ${isLocked ? 'disabled' : ''}
          >${escapeHtml(editRecord ? editRecord.background : '')}</textarea>
      </div>

      <!-- Vital Signs Quick-Bar (Integrated for A — Assessment) -->
      ${!isLocked ? `
      <div class="dsp-vitals-quickbar" style="background: var(--color-surface); border: 1px solid var(--color-border); border-left: 3px solid var(--dsp-sbar-a); border-radius: 8px; padding: 12px; margin-bottom: 0.875rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; flex-wrap: wrap; gap: 8px;">
          <span style="font-weight: 700; font-size: 0.85rem; color: var(--color-text); display: flex; align-items: center; gap: 6px;">
            <i class="fa-solid fa-heart-pulse" style="color: var(--dsp-sbar-a)"></i> Thanh Nhập Nhanh Sinh Hiệu & Điểm Cảnh Báo Sớm
          </span>
          <div style="display: flex; gap: 6px; align-items: center; flex-wrap: wrap;">
            <span id="dspNews2Badge" class="dsp-badge" style="background: rgba(34, 197, 94, 0.15); color: #16a34a; font-weight: 700; font-size: 0.75rem; padding: 3px 8px; border-radius: 12px;">NEWS2: 0 (Thấp)</span>
            <span id="dspQsofaBadge" class="dsp-badge" style="background: rgba(14, 165, 233, 0.15); color: #0284c7; font-weight: 700; font-size: 0.75rem; padding: 3px 8px; border-radius: 12px;">qSOFA: 0/3</span>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(105px, 1fr)); gap: 8px; margin-bottom: 10px;">
          <div>
            <label style="font-size: 0.72rem; color: var(--color-text-muted); display: block; margin-bottom: 2px;">Mạch (l/p)</label>
            <input type="number" id="dspVit_HR" class="dsp-input" placeholder="VD: 85" style="padding: 4px 8px; font-size: 0.85rem;" />
          </div>
          <div>
            <label style="font-size: 0.72rem; color: var(--color-text-muted); display: block; margin-bottom: 2px;">Huyết áp (mmHg)</label>
            <div style="display: flex; gap: 3px; align-items: center;">
              <input type="number" id="dspVit_SBP" class="dsp-input" placeholder="120" style="padding: 4px 4px; font-size: 0.85rem; width: 48%; text-align: center;" />
              <span style="color: var(--color-text-muted);">/</span>
              <input type="number" id="dspVit_DBP" class="dsp-input" placeholder="80" style="padding: 4px 4px; font-size: 0.85rem; width: 48%; text-align: center;" />
            </div>
          </div>
          <div>
            <label style="font-size: 0.72rem; color: var(--color-text-muted); display: block; margin-bottom: 2px;">Nhịp thở (l/p)</label>
            <input type="number" id="dspVit_RR" class="dsp-input" placeholder="VD: 18" style="padding: 4px 8px; font-size: 0.85rem;" />
          </div>
          <div>
            <label style="font-size: 0.72rem; color: var(--color-text-muted); display: block; margin-bottom: 2px;">SpO2 (%)</label>
            <input type="number" id="dspVit_SpO2" class="dsp-input" placeholder="VD: 98" style="padding: 4px 8px; font-size: 0.85rem;" />
          </div>
          <div>
            <label style="font-size: 0.72rem; color: var(--color-text-muted); display: block; margin-bottom: 2px;">Thân nhiệt (°C)</label>
            <input type="number" step="0.1" id="dspVit_Temp" class="dsp-input" placeholder="VD: 37.0" style="padding: 4px 8px; font-size: 0.85rem;" />
          </div>
          <div>
            <label style="font-size: 0.72rem; color: var(--color-text-muted); display: block; margin-bottom: 2px;">Tri giác (AVPU)</label>
            <select id="dspVit_AVPU" class="dsp-input" style="padding: 4px 6px; font-size: 0.8rem;">
              <option value="A">A — Tỉnh táo</option>
              <option value="V">V — Đáp ứng lời</option>
              <option value="P">P — Đáp ứng đau</option>
              <option value="U">U — Không đáp ứng</option>
            </select>
          </div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; font-size: 0.8rem;">
          <label style="display: inline-flex; align-items: center; gap: 6px; cursor: pointer; color: var(--color-text);">
            <input type="checkbox" id="dspVit_OnO2" /> <span>Đang thở Oxy hỗ trợ (+2đ NEWS2)</span>
          </label>
          <button type="button" class="dsp-btn dsp-btn-sm dsp-btn-outline" id="dspBtnInsertVitalsToA" style="color: var(--dsp-sbar-a); border-color: var(--dsp-sbar-a); font-size: 0.8rem;">
            <i class="fa-solid fa-arrow-down"></i> ⚡ Chèn vào Đánh giá (A)
          </button>
        </div>
      </div>
      ` : ''}

      <!-- A — Assessment -->
      <div class="dsp-sbar-step" style="--step-color: var(--dsp-sbar-a)">
        <label class="dsp-sbar-step-label" for="dspSBAR_assessment">
          <i class="fa-solid fa-magnifying-glass-chart" style="color: var(--dsp-sbar-a)"></i>
          A — Assessment (Đánh giá)
        </label>
        <textarea class="dsp-textarea" id="dspSBAR_assessment"
          placeholder="Dấu hiệu sinh tồn, đánh giá lâm sàng hiện tại, vấn đề chính..." rows="4" ${isLocked ? 'disabled' : ''}
          >${escapeHtml(editRecord ? editRecord.assessment : '')}</textarea>
      </div>

      <!-- R — Recommendation -->
      <div class="dsp-sbar-step" style="--step-color: var(--dsp-sbar-r)">
        <label class="dsp-sbar-step-label" for="dspSBAR_recommendation">
          <i class="fa-solid fa-check-circle" style="color: var(--dsp-sbar-r)"></i>
          R — Recommendation (Đề xuất)
        </label>
        <textarea class="dsp-textarea" id="dspSBAR_recommendation"
          placeholder="Đề xuất xử trí, cần hội chẩn, y lệnh bổ sung..." rows="3" ${isLocked ? 'disabled' : ''}
          >${escapeHtml(editRecord ? editRecord.recommendation : '')}</textarea>
      </div>

      <div class="dsp-form-actions" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; margin-top: 1.5rem;">
        <div style="display: flex; gap: 6px; flex-wrap: wrap;">
          <button type="button" class="dsp-btn dsp-btn-outline dsp-btn-sm" id="dspSBARCopyChatNow" style="color: #2563eb; border-color: #2563eb;" title="Sao chép nội dung đang soạn dạng tin nhắn Zalo/Telegram">
            <i class="fa-solid fa-share-nodes"></i> Sao chép Chat
          </button>
          <button type="button" class="dsp-btn dsp-btn-outline dsp-btn-sm" id="dspBtnCritiqueFooter" style="color: #ea580c; border-color: #ea580c;" title="AI Phản biện & Kiểm tra cờ đỏ">
            <i class="fa-solid fa-shield-halved"></i> Phản biện
          </button>
          <button type="button" class="dsp-btn dsp-btn-outline dsp-btn-sm" id="dspBtnExportCaseFromForm" style="color: #059669; border-color: #059669;" title="Lưu thành một ca lâm sàng trong Case Logger">
            <i class="fa-solid fa-folder-plus"></i> Sang Case
          </button>
          <button type="button" class="dsp-btn dsp-btn-outline dsp-btn-sm" id="dspBtnExportSoapFromForm" style="color: #7c3aed; border-color: #7c3aed;" title="Đưa SBAR này vào Diễn tiến SOAP bệnh nhân">
            <i class="fa-solid fa-clipboard-check"></i> Sang SOAP
          </button>
        </div>
        
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          ${!isLocked ? `
            <button type="button" class="dsp-btn dsp-btn-ghost" id="dspSBARSaveDraft">
              <i class="fa-regular fa-floppy-disk"></i> Lưu nháp
            </button>
            <button type="submit" class="dsp-btn dsp-btn-primary" id="dspSBARSave">
              <i class="fa-solid fa-check"></i> Lưu SBAR
            </button>
            ${editRecord ? `
            <button type="button" class="dsp-btn dsp-btn-danger" id="dspSBARLock" style="background:#dc2626; color:#fff; border:none;" title="Ký số bằng Audit Trail và Khóa vĩnh viễn bản ghi này">
              <i class="fa-solid fa-lock"></i> Ký & Khóa
            </button>
            ` : ''}
          ` : ''}
        </div>
      </div>
    </form>
  `;

  return `
    <div class="dsp-layout" id="dspLayout">
      ${renderSidebar(profile, 'sbar')}
      <main class="dsp-main">
        ${renderDocSpaceHeader(profile, 'sbar')}
        <div class="dsp-page-content">

          <div class="dsp-page-header">
            <h1 class="dsp-page-title"><i class="fa-solid fa-file-waveform"></i> SBAR — Trình bệnh nhanh</h1>
            <p class="dsp-page-subtitle">Soạn báo cáo SBAR chuẩn, lưu và in nhanh để bàn giao hoặc hội chẩn.</p>
          </div>

          <div class="dsp-two-col">
            <!-- Left: Form -->
            <div class="dsp-col-main">
              <div class="dsp-card">
                <div class="dsp-card-header">
                  <h2 class="dsp-card-title">${formTitle}</h2>
                  ${editRecord ? `<button class="dsp-btn dsp-btn-ghost dsp-btn-sm" id="dspSBARClearEdit"><i class="fa-solid fa-xmark"></i> Tạo mới</button>` : ''}
                </div>
                ${formHtml}
              </div>
            </div>

            <!-- Right: List -->
            <div class="dsp-col-side">
              <div class="dsp-card">
                <div class="dsp-card-header">
                  <h2 class="dsp-card-title">Đã lưu (${sbars.length})</h2>
                </div>
                <div class="dsp-list" id="dspSBARList">
                  ${listHtml}
                </div>
              </div>
            </div>
          </div>

          <!-- Preview Modal -->
          <div class="dsp-modal" id="dspSBARPreviewModal" style="display:none">
            <div class="dsp-modal-backdrop" id="dspSBARModalBackdrop"></div>
            <div class="dsp-modal-box dsp-modal-box--lg">
              <div class="dsp-modal-header">
                <h2 class="dsp-modal-title" id="dspPreviewTitle">SBAR Preview</h2>
                <div class="dsp-modal-actions" style="display:flex; gap:6px; flex-wrap:wrap;">
                  <button class="dsp-btn dsp-btn-sm" id="dspCopyChatBtn" style="background:#2563eb; color:#fff; border:none;" title="Sao chép chuẩn gửi Zalo/Telegram">
                    <i class="fa-solid fa-share-nodes"></i> Copy Chat
                  </button>
                  <button class="dsp-btn dsp-btn-sm dsp-btn-outline" id="dspShowQrBtn" style="color:#7c3aed; border-color:#7c3aed;" title="Hiển thị mã QR chia sẻ nhanh qua điện thoại">
                    <i class="fa-solid fa-qrcode"></i> Mã QR
                  </button>
                  <button class="dsp-btn dsp-btn-sm dsp-btn-outline" id="dspExportCaseFromPreview" style="color:#059669; border-color:#059669;" title="Lưu ca này vào Case Logger">
                    <i class="fa-solid fa-folder-plus"></i> Lưu Case
                  </button>
                  <button class="dsp-btn dsp-btn-sm dsp-btn-outline" id="dspCopySmsBtn" title="Sao chép dạng tóm tắt 1 dòng SMS">
                    <i class="fa-solid fa-comment-sms"></i> SMS
                  </button>
                  <button class="dsp-btn dsp-btn-ghost dsp-btn-sm" id="dspCopyBtn">
                    <i class="fa-regular fa-copy"></i> Sao chép
                  </button>
                  <button class="dsp-btn dsp-btn-outline dsp-btn-sm" id="dspPrintA5Btn" style="color:var(--color-primary); border-color:var(--color-primary);" title="In phiếu trình bệnh định dạng A5">
                    <i class="fa-solid fa-file-lines"></i> In A5
                  </button>
                  <button class="dsp-btn dsp-btn-primary dsp-btn-sm" id="dspPrintBtn">
                    <i class="fa-solid fa-print"></i> In
                  </button>
                  <button class="dsp-icon-btn" id="dspClosePreview"><i class="fa-solid fa-xmark"></i></button>
                </div>
              </div>
              <div class="dsp-modal-body" id="dspSBARPreviewContent"></div>
            </div>
          </div>

          <!-- History Modal -->
          <div class="dsp-modal" id="dspSBARHistoryModal" style="display:none">
            <div class="dsp-modal-backdrop" id="dspSBARHistoryModalBackdrop"></div>
            <div class="dsp-modal-box dsp-modal-box--lg">
              <div class="dsp-modal-header">
                <h2 class="dsp-modal-title"><i class="fa-solid fa-clock-rotate-left"></i> Lịch sử AI sinh SBAR</h2>
                <div class="dsp-modal-actions">
                  <button class="dsp-icon-btn" id="dspCloseHistory"><i class="fa-solid fa-xmark"></i></button>
                </div>
              </div>
              <div class="dsp-modal-body" id="dspSBARHistoryContent" style="max-height: 60vh; overflow-y: auto;">
                ${editRecord && editRecord.versions ? editRecord.versions.map((v, i) => `
                  <div class="dsp-card dsp-mb-4 dsp-p-4">
                    <div class="dsp-font-bold dsp-mb-2 dsp-text-primary">Bản sinh lúc: ${new Date(v.timestamp).toLocaleString('vi-VN')}</div>
                    <pre style="white-space: pre-wrap; font-family: inherit; font-size: 0.9rem; margin: 0; padding: 10px; background: var(--color-bg); border-radius: 4px;">${escapeHtml(v.content)}</pre>
                    <div class="dsp-mt-4 dsp-text-right">
                      <button class="dsp-btn dsp-btn-sm dsp-btn-outline dsp-restore-version-btn" data-content="${encodeURIComponent(v.content)}">Phục hồi bản này</button>
                    </div>
                  </div>
                `).join('') : '<div class="dsp-empty-state"><p>Chưa có lịch sử sinh AI nào.</p></div>'}
              </div>
            </div>
          </div>

          <!-- AI Critique Modal -->
          <div class="dsp-modal" id="dspSBARCritiqueModal" style="display:none">
            <div class="dsp-modal-backdrop" id="dspSBARCritiqueModalBackdrop"></div>
            <div class="dsp-modal-box dsp-modal-box--lg">
              <div class="dsp-modal-header">
                <h2 class="dsp-modal-title" style="color:#ea580c; display:flex; align-items:center; gap:8px;">
                  <i class="fa-solid fa-shield-halved"></i> AI Phản biện & Báo động An toàn SBAR
                </h2>
                <div class="dsp-modal-actions">
                  <button class="dsp-icon-btn" id="dspCloseCritique"><i class="fa-solid fa-xmark"></i></button>
                </div>
              </div>
              <div class="dsp-modal-body" id="dspSBARCritiqueContent" style="max-height: 65vh; overflow-y: auto;">
                <!-- Filled dynamically -->
              </div>
            </div>
          </div>

          <!-- Patient Picker Modal (Import from SOAP / OnCall) -->
          <div class="dsp-modal" id="dspSBARPatientPickerModal" style="display:none">
            <div class="dsp-modal-backdrop" id="dspSBARPatientPickerBackdrop"></div>
            <div class="dsp-modal-box dsp-modal-box--lg">
              <div class="dsp-modal-header">
                <h2 class="dsp-modal-title"><i class="fa-solid fa-hospital-user" style="color:#0284c7;"></i> Chọn Bệnh Nhân Từ SOAP / Ca Trực</h2>
                <div class="dsp-modal-actions">
                  <button class="dsp-icon-btn" id="dspClosePatientPicker"><i class="fa-solid fa-xmark"></i></button>
                </div>
              </div>
              <div class="dsp-modal-body" style="max-height: 70vh; overflow-y: auto;">
                <div style="margin-bottom: 12px;">
                  <input type="text" id="dspPatientSearchInput" class="dsp-input" placeholder="🔍 Tìm kiếm theo tên, mã bệnh nhân, số giường..." />
                </div>
                <div id="dspPatientPickerList" style="display: flex; flex-direction: column; gap: 8px;">
                  <!-- Dynamically populated -->
                </div>
              </div>
            </div>
          </div>

          <!-- QR Code Modal -->
          <div class="dsp-modal" id="dspSBARQrModal" style="display:none">
            <div class="dsp-modal-backdrop" id="dspSBARQrBackdrop"></div>
            <div class="dsp-modal-box" style="max-width: 380px; text-align: center;">
              <div class="dsp-modal-header">
                <h2 class="dsp-modal-title" style="font-size: 1.1rem;"><i class="fa-solid fa-qrcode" style="color:#7c3aed;"></i> Mã QR Chia Sẻ SBAR</h2>
                <div class="dsp-modal-actions">
                  <button class="dsp-icon-btn" id="dspCloseQrModal"><i class="fa-solid fa-xmark"></i></button>
                </div>
              </div>
              <div class="dsp-modal-body" style="padding: 1rem 0;">
                <div id="dspQrImageContainer" style="display: flex; justify-content: center; margin-bottom: 1rem;">
                  <!-- QR Image -->
                </div>
                <p style="font-size: 0.85rem; color: var(--color-text-muted); margin: 0 1rem;">
                  Đồng nghiệp có thể dùng Camera điện thoại hoặc Zalo quét mã QR này để nhận ngay báo cáo SBAR.
                </p>
              </div>
            </div>
          </div>

          <!-- SOAP Target Selection Modal -->
          <div class="dsp-modal" id="dspSBARSoapTargetModal" style="display:none">
            <div class="dsp-modal-backdrop" id="dspSBARSoapTargetBackdrop"></div>
            <div class="dsp-modal-box">
              <div class="dsp-modal-header">
                <h2 class="dsp-modal-title"><i class="fa-solid fa-clipboard-check" style="color:#7c3aed;"></i> Chọn Bệnh Nhân Ghi Diễn Tiến SOAP</h2>
                <div class="dsp-modal-actions">
                  <button class="dsp-icon-btn" id="dspCloseSoapTarget"><i class="fa-solid fa-xmark"></i></button>
                </div>
              </div>
              <div class="dsp-modal-body" style="max-height: 60vh; overflow-y: auto;">
                <p style="font-size: 0.85rem; color: var(--color-text-muted); margin-bottom: 10px;">
                  Chọn bệnh nhân để thêm nội dung SBAR này thành 1 ngày diễn tiến SOAP hôm nay:
                </p>
                <div id="dspSoapTargetList" style="display: flex; flex-direction: column; gap: 8px;">
                  <!-- Dynamically populated -->
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  `;
}

// ─── SBAR Preview HTML (for modal & print) ───────────────────────

export function renderSBARPreviewHtml(record: SBARRecord): string {
  return `
    <div class="dsp-sbar-preview-full" id="dspPrintTarget">
      <div class="dsp-sbar-print-header">
        <div class="dsp-sbar-print-logo"><i class="fa-solid fa-hospital"></i> CliniPortal · DocSpace</div>
        <div class="dsp-sbar-print-date">${new Date(record.updatedAt).toLocaleString('vi-VN')}</div>
      </div>
      
      <!-- Trạng thái Legal Shield -->
      <div class="dsp-mb-4 dsp-p-2 dsp-rounded-md dsp-text-sm" style="background: ${record.isTampered ? '#fef2f2' : (record.isLocked ? '#f0fdf4' : '#f8fafc')}; border: 1px solid ${record.isTampered ? '#fca5a5' : (record.isLocked ? '#86efac' : '#e2e8f0')};">
        ${record.isTampered 
          ? '<i class="fa-solid fa-triangle-exclamation dsp-text-danger"></i> <span class="dsp-text-danger dsp-font-bold">CẢNH BÁO: Dữ liệu đã bị can thiệp. Mã băm không khớp.</span>'
          : record.isLocked 
            ? '<i class="fa-solid fa-shield-halved" style="color:#16a34a"></i> <span style="color:#16a34a" class="dsp-font-bold">Hồ sơ đã được Khóa & Ký số an toàn.</span>'
            : '<i class="fa-solid fa-circle-info" style="color:#64748b"></i> <span style="color:#64748b">Hồ sơ này chưa được khóa.</span>'
        }
      </div>

      <h2 class="dsp-sbar-print-title">${escapeHtml(record.title || 'Báo cáo SBAR')}</h2>
      ${SBAR_STEPS.map(step => `
        <div class="dsp-sbar-block" style="--step-color: ${step.color}">
          <div class="dsp-sbar-block-label">
            <i class="${step.icon}"></i> ${step.label}
          </div>
          <div class="dsp-sbar-block-content">${escapeHtml((record as any)[step.key] || '').replace(/\n/g, '<br>')}</div>
        </div>
      `).join('')}
    </div>
  `;
}

// ─── Controller (event binding) ──────────────────────────────────

let currentPreviewRecord: SBARRecord | null = null;

export function mountSBARController(profileId: string): void {
  const form = document.getElementById('dspSBARForm') as HTMLFormElement;
  if (!form) return;

  const profile = getActiveProfile();
  const doctorName = profile?.displayName || '';

  // 1. Live Vital Signs & Early Warning Scores Handler
  const updateLiveVitals = () => {
    const hr = parseFloat((document.getElementById('dspVit_HR') as HTMLInputElement)?.value);
    const sbp = parseFloat((document.getElementById('dspVit_SBP') as HTMLInputElement)?.value);
    const dbp = parseFloat((document.getElementById('dspVit_DBP') as HTMLInputElement)?.value);
    const rr = parseFloat((document.getElementById('dspVit_RR') as HTMLInputElement)?.value);
    const spo2 = parseFloat((document.getElementById('dspVit_SpO2') as HTMLInputElement)?.value);
    const temp = parseFloat((document.getElementById('dspVit_Temp') as HTMLInputElement)?.value);
    const onO2 = (document.getElementById('dspVit_OnO2') as HTMLInputElement)?.checked || false;
    const avpu = (document.getElementById('dspVit_AVPU') as HTMLSelectElement)?.value || 'A';

    const result = calculateNEWS2_qSOFA(hr, sbp, rr, spo2, onO2, temp, avpu);

    const news2Badge = document.getElementById('dspNews2Badge');
    if (news2Badge) {
      news2Badge.textContent = `NEWS2: ${result.news2Score} (${result.news2Label})`;
      news2Badge.style.background = result.news2Risk === 'high' ? '#fee2e2' : result.news2Risk === 'medium' ? '#ffedd5' : '#dcfce7';
      news2Badge.style.color = result.news2Color;
    }

    const qsofaBadge = document.getElementById('dspQsofaBadge');
    if (qsofaBadge) {
      qsofaBadge.textContent = `qSOFA: ${result.qsofaScore}/3${result.isQsofaHigh ? ' ⚠️ Nguy cơ Sepsis' : ''}`;
      qsofaBadge.style.background = result.isQsofaHigh ? '#fee2e2' : '#e0f2fe';
      qsofaBadge.style.color = result.isQsofaHigh ? '#dc2626' : '#0284c7';
    }

    return { hr, sbp, dbp, rr, spo2, temp, onO2, avpu, result };
  };

  ['dspVit_HR', 'dspVit_SBP', 'dspVit_DBP', 'dspVit_RR', 'dspVit_SpO2', 'dspVit_Temp', 'dspVit_AVPU', 'dspVit_OnO2'].forEach(id => {
    const elem = document.getElementById(id);
    if (elem) {
      elem.addEventListener('input', updateLiveVitals);
      elem.addEventListener('change', updateLiveVitals);
    }
  });

  // Insert Vitals To Assessment (A)
  document.getElementById('dspBtnInsertVitalsToA')?.addEventListener('click', () => {
    const { hr, sbp, dbp, rr, spo2, temp, onO2, avpu, result } = updateLiveVitals();
    const vitalsParts: string[] = [];

    if (!isNaN(hr)) vitalsParts.push(`Mạch: ${hr} l/p`);
    if (!isNaN(sbp)) vitalsParts.push(`HA: ${sbp}${!isNaN(dbp) ? '/' + dbp : ''} mmHg`);
    if (!isNaN(rr)) vitalsParts.push(`Nhịp thở: ${rr} l/p`);
    if (!isNaN(spo2)) vitalsParts.push(`SpO2: ${spo2}% (${onO2 ? 'Thở O2 hỗ trợ' : 'Khí phòng'})`);
    if (!isNaN(temp)) vitalsParts.push(`Thân nhiệt: ${temp}°C`);
    if (avpu) {
      const avpuText = avpu === 'A' ? 'Tỉnh táo (Alert)' : avpu === 'V' ? 'Đáp ứng lời nói (Voice)' : avpu === 'P' ? 'Đáp ứng đau (Pain)' : 'Hôn mê/Không đáp ứng (Unresponsive)';
      vitalsParts.push(`Tri giác: ${avpuText}`);
    }

    if (vitalsParts.length === 0) {
      alert('Vui lòng nhập ít nhất 1 chỉ số sinh hiệu.');
      return;
    }

    const vitalsSummary = `- Sinh hiệu: ${vitalsParts.join(' | ')}\n- Đánh giá cảnh báo sớm: NEWS2 = ${result.news2Score} điểm (${result.news2Label}) | qSOFA = ${result.qsofaScore}/3${result.isQsofaHigh ? ' [⚠️ CẢNH BÁO NGUY CƠ NHIỄM KHUẨN HUYẾT]' : ''}`;

    const assElem = document.getElementById('dspSBAR_assessment') as HTMLTextAreaElement;
    if (assElem) {
      if (assElem.value.trim()) {
        assElem.value = `${assElem.value.trim()}\n\n${vitalsSummary}`;
      } else {
        assElem.value = vitalsSummary;
      }
      assElem.focus();

      const btn = document.getElementById('dspBtnInsertVitalsToA');
      if (btn) {
        btn.innerHTML = '<i class="fa-solid fa-check" style="color:#22c55e"></i> Đã chèn vào (A)';
        setTimeout(() => {
          btn.innerHTML = '<i class="fa-solid fa-arrow-down"></i> ⚡ Chèn vào Đánh giá (A)';
        }, 1500);
      }
    }
  });

  // 2. Preset Selection Handlers
  document.querySelectorAll('.dsp-sbar-preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const presetId = btn.getAttribute('data-preset-id');
      const preset = SBAR_PRESETS.find(p => p.id === presetId);
      if (!preset) return;

      const sitElem = document.getElementById('dspSBAR_situation') as HTMLTextAreaElement;
      const bgElem = document.getElementById('dspSBAR_background') as HTMLTextAreaElement;
      const assElem = document.getElementById('dspSBAR_assessment') as HTMLTextAreaElement;
      const recElem = document.getElementById('dspSBAR_recommendation') as HTMLTextAreaElement;
      const titleElem = document.getElementById('dspSBARTitle') as HTMLInputElement;

      const hasContent = sitElem?.value.trim() || bgElem?.value.trim() || assElem?.value.trim() || recElem?.value.trim();
      if (hasContent) {
        if (!confirm(`Bạn có muốn áp dụng mẫu "${preset.name}" không?\nNội dung các trường đang nhập sẽ được thay thế bằng khung mẫu mới.`)) {
          return;
        }
      }

      if (titleElem && (!titleElem.value.trim() || titleElem.value.startsWith('['))) {
        titleElem.value = preset.title;
      }
      if (sitElem) sitElem.value = preset.situation;
      if (bgElem) bgElem.value = preset.background;
      if (assElem) assElem.value = preset.assessment;
      if (recElem) recElem.value = preset.recommendation;

      const originalText = btn.innerHTML;
      btn.innerHTML = `<i class="fa-solid fa-check" style="color:#22c55e"></i> Đã áp dụng`;
      setTimeout(() => { btn.innerHTML = originalText; }, 1500);
    });
  });

  // 3. Patient Picker (Import from SOAP / On-Call Shifts)
  document.getElementById('dspBtnOpenPatientPicker')?.addEventListener('click', async () => {
    const modal = document.getElementById('dspSBARPatientPickerModal');
    const listContainer = document.getElementById('dspPatientPickerList');
    if (!modal || !listContainer) return;

    listContainer.innerHTML = '<div style="text-align:center; padding:1.5rem;"><i class="fa-solid fa-spinner fa-spin"></i> Đang tải dữ liệu bệnh nhân...</div>';
    modal.style.display = 'flex';

    const soapPatients = await getAllSoapPatients(profileId);
    const shifts = getAllShifts(profileId);
    const activeShift = shifts.length ? shifts[0] : null;
    const onCallPatients = activeShift ? activeShift.patients : [];

    const renderList = (filterText = '') => {
      const q = filterText.toLowerCase().trim();
      let html = '';

      // Section A: SOAP Patients
      const filteredSoap = soapPatients.filter(p => 
        !q || p.fullName.toLowerCase().includes(q) || p.patientCode.toLowerCase().includes(q) || p.bedNumber.toLowerCase().includes(q) || (p.currentDiagnosis || p.admissionDiagnosis).toLowerCase().includes(q)
      );

      html += `<div style="font-size:0.8rem; font-weight:700; color:var(--color-primary); margin-top:4px; margin-bottom:4px;"><i class="fa-solid fa-bed-pulse"></i> Bệnh nhân Bệnh phòng SOAP (${filteredSoap.length})</div>`;
      if (filteredSoap.length) {
        html += filteredSoap.map(p => `
          <div class="dsp-card dsp-patient-pick-item" data-type="soap" data-id="${p.id}" style="padding:10px; cursor:pointer; border:1px solid var(--color-border); border-radius:6px; transition:background 0.2s;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span style="font-weight:700; color:var(--color-text);">${escapeHtml(p.fullName)} <span style="font-size:0.75rem; color:var(--color-text-muted);">(${p.patientCode} · ${p.age}t · Giường ${p.bedNumber})</span></span>
              <span class="dsp-badge dsp-badge--active" style="font-size:0.7rem;">Ngày N${p.dayOfIllness || 1}</span>
            </div>
            <div style="font-size:0.82rem; color:var(--color-text-muted); margin-top:3px;">
              <strong>Chẩn đoán:</strong> ${escapeHtml(p.currentDiagnosis || p.admissionDiagnosis || 'Chưa ghi')}
            </div>
          </div>
        `).join('');
      } else {
        html += '<div style="font-size:0.8rem; color:var(--color-text-muted); padding:4px 0;">Không tìm thấy bệnh nhân SOAP phù hợp.</div>';
      }

      // Section B: OnCall Patients
      const filteredOnCall = onCallPatients.filter(p => 
        !q || p.bed.toLowerCase().includes(q) || p.diagnosis.toLowerCase().includes(q) || p.note.toLowerCase().includes(q)
      );

      html += `<div style="font-size:0.8rem; font-weight:700; color:#ea580c; margin-top:12px; margin-bottom:4px;"><i class="fa-solid fa-user-clock"></i> Bệnh nhân Ca trực gần nhất (${filteredOnCall.length})</div>`;
      if (filteredOnCall.length) {
        html += filteredOnCall.map(p => `
          <div class="dsp-card dsp-patient-pick-item" data-type="oncall" data-id="${p.id}" style="padding:10px; cursor:pointer; border:1px solid var(--color-border); border-radius:6px; transition:background 0.2s;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span style="font-weight:700; color:var(--color-text);">Giường: ${escapeHtml(p.bed)}</span>
              <span class="dsp-badge" style="font-size:0.7rem; background:${p.flag === 'critical' ? '#fee2e2' : p.flag === 'watch' ? '#ffedd5' : '#dcfce7'}; color:${p.flag === 'critical' ? '#dc2626' : p.flag === 'watch' ? '#ea580c' : '#16a34a'};">
                ${p.flag === 'critical' ? '🔴 Nguy cấp' : p.flag === 'watch' ? '🟡 Theo dõi' : '🟢 Ổn định'}
              </span>
            </div>
            <div style="font-size:0.82rem; color:var(--color-text-muted); margin-top:3px;">
              <strong>Chẩn đoán:</strong> ${escapeHtml(p.diagnosis)}
            </div>
            ${p.note ? `<div style="font-size:0.78rem; color:var(--color-text-muted); margin-top:2px;"><em>Ghi chú: ${escapeHtml(p.note)}</em></div>` : ''}
          </div>
        `).join('');
      } else {
        html += '<div style="font-size:0.8rem; color:var(--color-text-muted); padding:4px 0;">Không có bệnh nhân trong ca trực gần nhất.</div>';
      }

      listContainer.innerHTML = html;

      // Click event on cards
      listContainer.querySelectorAll('.dsp-patient-pick-item').forEach(item => {
        item.addEventListener('click', () => {
          const type = item.getAttribute('data-type');
          const id = item.getAttribute('data-id');

          if (type === 'soap') {
            const p = soapPatients.find(x => x.id === id);
            if (p) {
              const titleElem = document.getElementById('dspSBARTitle') as HTMLInputElement;
              const sitElem = document.getElementById('dspSBAR_situation') as HTMLTextAreaElement;
              const bgElem = document.getElementById('dspSBAR_background') as HTMLTextAreaElement;
              const assElem = document.getElementById('dspSBAR_assessment') as HTMLTextAreaElement;
              const recElem = document.getElementById('dspSBAR_recommendation') as HTMLTextAreaElement;

              if (titleElem) titleElem.value = `[SBAR] BN ${p.fullName} (${p.patientCode}) - G.${p.bedNumber} (${p.currentDiagnosis || p.admissionDiagnosis})`;
              if (sitElem) sitElem.value = `Bệnh nhân: ${p.fullName}, ${p.age} tuổi, Giường ${p.bedNumber}, Mã HS: ${p.medicalRecordNo || p.patientCode}.\nChẩn đoán hiện tại: ${p.currentDiagnosis || p.admissionDiagnosis}.\nNgày thứ N${p.dayOfIllness || 1} điều trị. Lý do liên hệ / Diễn biến mới:...`;
              if (bgElem) {
                const rxStr = (p.prescriptions || []).map((r: any) => `${r.name} ${r.dosage || ''}`).join(', ');
                bgElem.value = `Bối cảnh & Bệnh sử:\n- Chẩn đoán vào viện: ${p.admissionDiagnosis}\n- Thuốc đang dùng: ${rxStr || 'Chưa ghi nhận'}\n- Diễn tiến cơ năng: ${p.sNotes || '—'}`;
              }
              if (assElem) {
                const clsStr = (p.clsResults || []).map((c: any) => `${c.text}`).join('; ');
                assElem.value = `Đánh giá hiện tại:\n- Khám thực thể: ${p.oNotes || '—'}\n- Đánh giá lâm sàng: ${p.aAssessment || '—'}${clsStr ? '\n- Cận lâm sàng: ' + clsStr : ''}`;
              }
              if (recElem) recElem.value = `Kế hoạch & Đề xuất:\n${p.pPlan || '1) Tiếp tục theo dõi sát sinh hiệu.\n2) Chỉ định thêm cận lâm sàng / hội chẩn...'}`;
            }
          } else if (type === 'oncall') {
            const p = onCallPatients.find(x => x.id === id);
            if (p) {
              const titleElem = document.getElementById('dspSBARTitle') as HTMLInputElement;
              const sitElem = document.getElementById('dspSBAR_situation') as HTMLTextAreaElement;
              const bgElem = document.getElementById('dspSBAR_background') as HTMLTextAreaElement;
              const assElem = document.getElementById('dspSBAR_assessment') as HTMLTextAreaElement;
              const recElem = document.getElementById('dspSBAR_recommendation') as HTMLTextAreaElement;

              if (titleElem) titleElem.value = `[SBAR Ca trực] BN Giường ${p.bed} - ${p.diagnosis}`;
              if (sitElem) sitElem.value = `Báo cáo BN Giường ${p.bed} (Mức độ ca trực: ${p.flag === 'critical' ? '🔴 CỰC KỲ NGUY CẤP' : p.flag === 'watch' ? '🟡 THEO DÕI SÁT' : '🟢 ỔN ĐỊNH'}).\nChẩn đoán: ${p.diagnosis}.\nDiễn biến mới cần xử trí:...`;
              if (bgElem) bgElem.value = `Diễn tiến trong ca trực:\n${p.note || '—'}`;
              if (assElem) assElem.value = `Đánh giá lâm sàng ca trực:\n${p.note || '—'}`;
              if (recElem) recElem.value = `Đề xuất xử trí tiếp theo:\n1) Bác sĩ trực kiểm tra lại tại giường.\n2) ...`;
            }
          }

          modal.style.display = 'none';
        });
      });
    };

    renderList();

    document.getElementById('dspPatientSearchInput')?.addEventListener('input', (e) => {
      renderList((e.target as HTMLInputElement).value);
    });
  });

  document.getElementById('dspClosePatientPicker')?.addEventListener('click', () => {
    const modal = document.getElementById('dspSBARPatientPickerModal');
    if (modal) modal.style.display = 'none';
  });

  document.getElementById('dspSBARPatientPickerBackdrop')?.addEventListener('click', () => {
    const modal = document.getElementById('dspSBARPatientPickerModal');
    if (modal) modal.style.display = 'none';
  });

  // 4. Case Logger Bridge (Export SBAR to Case Record)
  const exportSBARToCaseLogger = async (sourceRecord?: SBARRecord) => {
    const title = sourceRecord ? sourceRecord.title : (document.getElementById('dspSBARTitle') as HTMLInputElement)?.value || '';
    const situation = sourceRecord ? sourceRecord.situation : (document.getElementById('dspSBAR_situation') as HTMLTextAreaElement)?.value || '';
    const background = sourceRecord ? sourceRecord.background : (document.getElementById('dspSBAR_background') as HTMLTextAreaElement)?.value || '';
    const assessment = sourceRecord ? sourceRecord.assessment : (document.getElementById('dspSBAR_assessment') as HTMLTextAreaElement)?.value || '';
    const recommendation = sourceRecord ? sourceRecord.recommendation : (document.getElementById('dspSBAR_recommendation') as HTMLTextAreaElement)?.value || '';

    if (!situation && !assessment) {
      alert('Cần có nội dung Situation hoặc Assessment để tạo Ca lâm sàng.');
      return;
    }

    try {
      await saveCase(profileId, {
        date: new Date().toISOString().split('T')[0] || '2026-08-23',
        context: 'duty',
        chiefComplaint: situation || title || 'Trình bệnh SBAR',
        objective: assessment || '—',
        management: recommendation || '—',
        diagnosisText: title || 'Ca cấp cứu / Bàn giao SBAR',
        lesson: background ? `[Bối cảnh]: ${background}` : undefined,
        outcome: 'Đã xử trí theo SBAR'
      });

      if (confirm('✅ Đã lưu thành công vào Nhật ký Ca lâm sàng (Case Logger)!\nBạn có muốn chuyển sang màn hình Nhật ký Ca bệnh để xem ngay không?')) {
        window.location.hash = '#/docspace/cases';
      }
    } catch (err: any) {
      alert('Lỗi lưu Case: ' + err.message);
    }
  };

  document.getElementById('dspBtnExportCaseFromForm')?.addEventListener('click', () => exportSBARToCaseLogger());
  document.getElementById('dspExportCaseFromPreview')?.addEventListener('click', () => {
    if (currentPreviewRecord) exportSBARToCaseLogger(currentPreviewRecord);
  });

  // 5. SOAP Bridge (Export SBAR to Daily SOAP Note)
  const openSoapTargetPicker = async (sourceRecord?: SBARRecord) => {
    const situation = sourceRecord ? sourceRecord.situation : (document.getElementById('dspSBAR_situation') as HTMLTextAreaElement)?.value || '';
    const background = sourceRecord ? sourceRecord.background : (document.getElementById('dspSBAR_background') as HTMLTextAreaElement)?.value || '';
    const assessment = sourceRecord ? sourceRecord.assessment : (document.getElementById('dspSBAR_assessment') as HTMLTextAreaElement)?.value || '';
    const recommendation = sourceRecord ? sourceRecord.recommendation : (document.getElementById('dspSBAR_recommendation') as HTMLTextAreaElement)?.value || '';
    const title = sourceRecord ? sourceRecord.title : (document.getElementById('dspSBARTitle') as HTMLInputElement)?.value || 'Diễn tiến SBAR';

    const modal = document.getElementById('dspSBARSoapTargetModal');
    const listContainer = document.getElementById('dspSoapTargetList');
    if (!modal || !listContainer) return;

    const soapPatients = await getAllSoapPatients(profileId);
    if (!soapPatients.length) {
      alert('Chưa có bệnh nhân nào trong Sổ tay SOAP. Vui lòng tạo hồ sơ bệnh nhân trong phân hệ SOAP trước.');
      return;
    }

    listContainer.innerHTML = soapPatients.map(p => `
      <div class="dsp-card dsp-soap-pick-target" data-id="${p.id}" style="padding:10px; cursor:pointer; border:1px solid var(--color-border); border-radius:6px; transition:background 0.2s;">
        <div style="font-weight:700; color:var(--color-text);">${escapeHtml(p.fullName)} (${p.patientCode} · G.${p.bedNumber})</div>
        <div style="font-size:0.8rem; color:var(--color-text-muted);">${escapeHtml(p.currentDiagnosis || p.admissionDiagnosis)}</div>
      </div>
    `).join('');

    modal.style.display = 'flex';

    listContainer.querySelectorAll('.dsp-soap-pick-target').forEach(item => {
      item.addEventListener('click', async () => {
        const patientId = item.getAttribute('data-id');
        if (!patientId) return;

        try {
          const todayStr = new Date().toISOString().split('T')[0] || '2026-08-23';
          addSoapDailyLog(profileId, patientId, todayStr);
          await updateSoapPatient(profileId, patientId, {
            sNotes: `[SBAR Situation & Background]:\n${situation}\n${background}`.trim(),
            oNotes: assessment || '—',
            aAssessment: `[SBAR Assessment - ${title}]:\n${assessment}`.trim(),
            pPlan: recommendation || '—',
            soapStatus: 'da_lam'
          });

          modal.style.display = 'none';
          if (confirm('✅ Đã cập nhật thành công Diễn tiến SOAP hôm nay cho bệnh nhân!\nBạn có muốn mở Sổ tay SOAP để xem ngay không?')) {
            window.location.hash = `#/docspace/soap?patient=${patientId}`;
          }
        } catch (err: any) {
          alert('Lỗi ghi SOAP: ' + err.message);
        }
      });
    });
  };

  document.getElementById('dspBtnExportSoapFromForm')?.addEventListener('click', () => openSoapTargetPicker());
  document.getElementById('dspCloseSoapTarget')?.addEventListener('click', () => {
    const modal = document.getElementById('dspSBARSoapTargetModal');
    if (modal) modal.style.display = 'none';
  });
  document.getElementById('dspSBARSoapTargetBackdrop')?.addEventListener('click', () => {
    const modal = document.getElementById('dspSBARSoapTargetModal');
    if (modal) modal.style.display = 'none';
  });

  // 6. QR Code Share Modal
  document.getElementById('dspShowQrBtn')?.addEventListener('click', () => {
    if (!currentPreviewRecord) return;
    const chatText = formatSBARToChat(currentPreviewRecord, doctorName);
    const qrContainer = document.getElementById('dspQrImageContainer');
    const qrModal = document.getElementById('dspSBARQrModal');

    if (qrContainer && qrModal) {
      // Encode summary into clean QR Code URL (QuickChart / API QR standard)
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(chatText.slice(0, 900))}`;
      qrContainer.innerHTML = `<img src="${qrUrl}" alt="SBAR QR Code" style="width:250px; height:250px; border:4px solid #fff; border-radius:8px; box-shadow:0 4px 12px rgba(0,0,0,0.15);" />`;
      qrModal.style.display = 'flex';
    }
  });

  document.getElementById('dspCloseQrModal')?.addEventListener('click', () => {
    const modal = document.getElementById('dspSBARQrModal');
    if (modal) modal.style.display = 'none';
  });
  document.getElementById('dspSBARQrBackdrop')?.addEventListener('click', () => {
    const modal = document.getElementById('dspSBARQrModal');
    if (modal) modal.style.display = 'none';
  });

  // 7. Print A5 Mode
  document.getElementById('dspPrintA5Btn')?.addEventListener('click', () => {
    document.body.classList.add('dsp-print-a5-mode');
    window.print();
    setTimeout(() => {
      document.body.classList.remove('dsp-print-a5-mode');
    }, 1000);
  });

  // 8. AI Critique Handler
  const triggerAICritique = async () => {
    const title = (document.getElementById('dspSBARTitle') as HTMLInputElement)?.value || '';
    const situation = (document.getElementById('dspSBAR_situation') as HTMLTextAreaElement)?.value || '';
    const background = (document.getElementById('dspSBAR_background') as HTMLTextAreaElement)?.value || '';
    const assessment = (document.getElementById('dspSBAR_assessment') as HTMLTextAreaElement)?.value || '';
    const recommendation = (document.getElementById('dspSBAR_recommendation') as HTMLTextAreaElement)?.value || '';

    if (!situation && !background && !assessment && !recommendation) {
      alert('Vui lòng nhập nội dung SBAR trước khi yêu cầu AI phản biện.');
      return;
    }

    if (!profile || !profile.aiSettings || !profile.aiSettings.enabled) {
      alert('Vui lòng cấu hình và bật AI trong Cài đặt AI trước.');
      return;
    }

    const btnHeader = document.getElementById('btnAICritiqueSBAR') as HTMLButtonElement;
    const btnFooter = document.getElementById('dspBtnCritiqueFooter') as HTMLButtonElement;
    if (btnHeader) { btnHeader.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Đang phản biện...'; btnHeader.disabled = true; }
    if (btnFooter) { btnFooter.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Đang phân tích...'; btnFooter.disabled = true; }

    try {
      const result: SBARCritiqueResult = await critiqueSBARWithAI(
        { title, situation, background, assessment, recommendation },
        profile.aiSettings
      );

      const scoreColor = result.score >= 8 ? '#16a34a' : result.score >= 5 ? '#ea580c' : '#dc2626';
      const scoreBadgeBg = result.score >= 8 ? '#dcfce7' : result.score >= 5 ? '#ffedd5' : '#fee2e2';

      const critiqueHtml = `
        <div style="margin-bottom: 1.25rem; display: flex; align-items: center; justify-content: space-between; background: ${scoreBadgeBg}; padding: 12px 16px; border-radius: 8px; border: 1px solid ${scoreColor};">
          <div>
            <div style="font-size: 0.85rem; color: var(--color-text-muted);">Điểm Chuẩn hóa & An toàn SBAR:</div>
            <div style="font-size: 1.5rem; font-weight: 800; color: ${scoreColor};">${result.score}/10 Điểm</div>
          </div>
          <div style="text-align: right; max-width: 60%; font-size: 0.9rem; font-weight: 600; color: var(--color-text);">
            ${escapeHtml(result.verdict)}
          </div>
        </div>

        ${result.redFlags && result.redFlags.length > 0 ? `
          <div style="margin-bottom: 1rem;">
            <h4 style="color: #dc2626; font-size: 0.95rem; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 6px;">
              <i class="fa-solid fa-triangle-exclamation"></i> Cờ đỏ lâm sàng & Lỗ hổng cần chú ý:
            </h4>
            <div style="display: flex; flex-direction: column; gap: 6px;">
              ${result.redFlags.map(rf => `
                <div style="background: #fef2f2; border-left: 3px solid #dc2626; padding: 8px 12px; border-radius: 4px; font-size: 0.88rem; color: #991b1b;">
                  ${escapeHtml(rf)}
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        ${result.recommendations && result.recommendations.length > 0 ? `
          <div style="margin-bottom: 1rem;">
            <h4 style="color: #0284c7; font-size: 0.95rem; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 6px;">
              <i class="fa-solid fa-lightbulb"></i> Khuyến nghị bổ sung cho phần Đề xuất (R):
            </h4>
            <div style="display: flex; flex-direction: column; gap: 6px;">
              ${result.recommendations.map(rec => `
                <div style="background: #f0f9ff; border-left: 3px solid #0284c7; padding: 8px 12px; border-radius: 4px; font-size: 0.88rem; color: #075985;">
                  ${escapeHtml(rec)}
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        ${result.likelyQuestions && result.likelyQuestions.length > 0 ? `
          <div style="margin-bottom: 1rem;">
            <h4 style="color: #8b5cf6; font-size: 0.95rem; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 6px;">
              <i class="fa-solid fa-circle-question"></i> 3 Câu hỏi phản biện có thể gặp từ Bác sĩ Trưởng tua / Hội chẩn:
            </h4>
            <div style="background: var(--color-bg); padding: 10px 14px; border-radius: 6px; border: 1px solid var(--color-border);">
              <ol style="margin: 0; padding-left: 1.25rem; font-size: 0.88rem; color: var(--color-text); line-height: 1.6;">
                ${result.likelyQuestions.map(q => `<li><strong>${escapeHtml(q)}</strong></li>`).join('')}
              </ol>
            </div>
          </div>
        ` : ''}
      `;

      const critiqueContent = document.getElementById('dspSBARCritiqueContent');
      const critiqueModal = document.getElementById('dspSBARCritiqueModal');
      if (critiqueContent && critiqueModal) {
        critiqueContent.innerHTML = critiqueHtml;
        critiqueModal.style.display = 'flex';
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      if (btnHeader) { btnHeader.innerHTML = '<i class="fa-solid fa-shield-halved"></i> 🛡️ AI Phản biện SBAR'; btnHeader.disabled = false; }
      if (btnFooter) { btnFooter.innerHTML = '<i class="fa-solid fa-shield-halved"></i> Phản biện'; btnFooter.disabled = false; }
    }
  };

  document.getElementById('btnAICritiqueSBAR')?.addEventListener('click', triggerAICritique);
  document.getElementById('dspBtnCritiqueFooter')?.addEventListener('click', triggerAICritique);

  document.getElementById('dspCloseCritique')?.addEventListener('click', () => {
    const modal = document.getElementById('dspSBARCritiqueModal');
    if (modal) modal.style.display = 'none';
  });

  document.getElementById('dspSBARCritiqueModalBackdrop')?.addEventListener('click', () => {
    const modal = document.getElementById('dspSBARCritiqueModal');
    if (modal) modal.style.display = 'none';
  });

  // 9. Copy Chat Form Content Directly
  document.getElementById('dspSBARCopyChatNow')?.addEventListener('click', () => {
    const title = (document.getElementById('dspSBARTitle') as HTMLInputElement)?.value || 'Trình bệnh khẩn';
    const situation = (document.getElementById('dspSBAR_situation') as HTMLTextAreaElement)?.value || '';
    const background = (document.getElementById('dspSBAR_background') as HTMLTextAreaElement)?.value || '';
    const assessment = (document.getElementById('dspSBAR_assessment') as HTMLTextAreaElement)?.value || '';
    const recommendation = (document.getElementById('dspSBAR_recommendation') as HTMLTextAreaElement)?.value || '';

    if (!situation && !background && !assessment && !recommendation) {
      alert('Vui lòng nhập nội dung trước khi sao chép.');
      return;
    }

    const tempRecord: SBARRecord = {
      id: 'temp',
      doctorId: profileId,
      title,
      situation,
      background,
      assessment,
      recommendation,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isDraft: false
    };

    const chatText = formatSBARToChat(tempRecord, doctorName);
    navigator.clipboard.writeText(chatText).then(() => {
      const btn = document.getElementById('dspSBARCopyChatNow');
      if (btn) {
        btn.innerHTML = '<i class="fa-solid fa-check"></i> Đã chép Chat Zalo';
        setTimeout(() => {
          btn.innerHTML = '<i class="fa-solid fa-share-nodes"></i> Sao chép Chat';
        }, 2000);
      }
    });
  });

  // 10. Voice-to-Text Web Speech API Handler
  let isRecording = false;
  let recognition: any = null;

  document.getElementById('btnVoiceToSBAR')?.addEventListener('click', () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Trình duyệt của bạn không hỗ trợ Web Speech API nhận diện giọng nói. Vui lòng dùng Chrome, Edge hoặc Safari.');
      return;
    }

    const btn = document.getElementById('btnVoiceToSBAR') as HTMLButtonElement;
    const textarea = document.getElementById('dspSBAR_RawNotes') as HTMLTextAreaElement;
    if (!btn || !textarea) return;

    if (isRecording && recognition) {
      recognition.stop();
      isRecording = false;
      btn.style.background = '';
      btn.style.color = '#8b5cf6';
      btn.innerHTML = '<i class="fa-solid fa-microphone"></i> 🎙️ Ghi âm giọng nói';
      return;
    }

    try {
      recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'vi-VN';

      let initialText = textarea.value.trim();

      recognition.onstart = () => {
        isRecording = true;
        btn.style.background = '#8b5cf6';
        btn.style.color = '#fff';
        btn.innerHTML = '<i class="fa-solid fa-microphone fa-bounce"></i> 🔴 Đang lắng nghe... (Bấm dừng)';
      };

      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        textarea.value = initialText ? `${initialText} ${transcript}` : transcript;
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech Recognition Error:', event.error);
        isRecording = false;
        btn.style.background = '';
        btn.style.color = '#8b5cf6';
        btn.innerHTML = '<i class="fa-solid fa-microphone"></i> 🎙️ Ghi âm giọng nói';
      };

      recognition.onend = () => {
        isRecording = false;
        btn.style.background = '';
        btn.style.color = '#8b5cf6';
        btn.innerHTML = '<i class="fa-solid fa-microphone"></i> 🎙️ Ghi âm giọng nói';
      };

      recognition.start();
    } catch (err: any) {
      alert('Lỗi khởi chạy Micro: ' + err.message);
    }
  });

  // 11. AI SBAR Generation
  document.getElementById('btnAIGenerateSBAR')?.addEventListener('click', async () => {
    const rawNotes = (document.getElementById('dspSBAR_RawNotes') as HTMLTextAreaElement)?.value.trim();
    if (!rawNotes) return;
    
    if (!profile || !profile.aiSettings) {
      alert('Vui lòng cấu hình và bật AI trong Cài đặt AI trước.');
      return;
    }

    const btn = document.getElementById('btnAIGenerateSBAR') as HTMLButtonElement;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Đang xử lý...';
    btn.disabled = true;

    try {
      const result = await generateSBAR(rawNotes, profile.aiSettings);
      
      const situationStr = result.situation || '';
      const backgroundStr = result.background || '';
      const assessmentStr = result.assessment || '';
      const recommendationStr = result.recommendation || '';

      (document.getElementById('dspSBAR_situation') as HTMLTextAreaElement).value = situationStr;
      (document.getElementById('dspSBAR_background') as HTMLTextAreaElement).value = backgroundStr;
      (document.getElementById('dspSBAR_assessment') as HTMLTextAreaElement).value = assessmentStr;
      (document.getElementById('dspSBAR_recommendation') as HTMLTextAreaElement).value = recommendationStr;
      
      const editId = (document.getElementById('dspSBAREditId') as HTMLInputElement)?.value;
      if (editId) {
        const record = await getSBARById(profileId, editId);
        if (record) {
          const versions = record.versions || [];
          const content = `S: ${situationStr}\nB: ${backgroundStr}\nA: ${assessmentStr}\nR: ${recommendationStr}`;
          versions.unshift({ timestamp: new Date().toISOString(), content });
          if (versions.length > 5) versions.pop();
          await updateSBAR(profileId, editId, { versions });
        }
      }
      
    } catch (err: any) {
      alert(err.message);
    } finally {
      btn.innerHTML = '<i class="fa-solid fa-wand-magic-sparkles"></i> Phân tích AI SBAR';
      btn.disabled = false;
    }
  });

  // 12. View History
  document.getElementById('btnViewSBARHistory')?.addEventListener('click', () => {
    const modal = document.getElementById('dspSBARHistoryModal');
    if (modal) modal.style.display = 'flex';
  });

  document.getElementById('dspCloseHistory')?.addEventListener('click', () => {
    const modal = document.getElementById('dspSBARHistoryModal');
    if (modal) modal.style.display = 'none';
  });

  document.getElementById('dspSBARHistoryModalBackdrop')?.addEventListener('click', () => {
    const modal = document.getElementById('dspSBARHistoryModal');
    if (modal) modal.style.display = 'none';
  });

  // Restore version
  document.getElementById('dspSBARHistoryContent')?.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest('.dsp-restore-version-btn') as HTMLElement;
    if (!btn) return;
    const content = decodeURIComponent(btn.getAttribute('data-content') || '');
    if (!content) return;
    
    const lines = content.split('\n');
    let s = '', b = '', a = '', r = '';
    lines.forEach(line => {
      if (line.startsWith('S: ')) s = line.substring(3);
      else if (line.startsWith('B: ')) b = line.substring(3);
      else if (line.startsWith('A: ')) a = line.substring(3);
      else if (line.startsWith('R: ')) r = line.substring(3);
    });

    (document.getElementById('dspSBAR_situation') as HTMLTextAreaElement).value = s;
    (document.getElementById('dspSBAR_background') as HTMLTextAreaElement).value = b;
    (document.getElementById('dspSBAR_assessment') as HTMLTextAreaElement).value = a;
    (document.getElementById('dspSBAR_recommendation') as HTMLTextAreaElement).value = r;
    
    const modal = document.getElementById('dspSBARHistoryModal');
    if (modal) modal.style.display = 'none';
  });

  // 13. Save SBAR
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    await submitSBAR(profileId, false);
  });

  // Save Draft
  document.getElementById('dspSBARSaveDraft')?.addEventListener('click', async () => {
    await submitSBAR(profileId, true);
  });

  // Lock
  document.getElementById('dspSBARLock')?.addEventListener('click', async () => {
    if (confirm('Sau khi khóa, bạn sẽ không thể chỉnh sửa SBAR này nữa. Hệ thống sẽ sinh mã băm lưu vết. Tiếp tục?')) {
      await submitSBAR(profileId, false, true);
    }
  });

  // List Actions
  document.getElementById('dspSBARList')?.addEventListener('click', async (e) => {
    const target = e.target as HTMLElement;
    const btn = target.closest('[data-action]') as HTMLButtonElement;
    if (!btn) return;
    if (btn.disabled) return;
    const action = btn.getAttribute('data-action');
    const id = btn.getAttribute('data-id') || '';

    if (action === 'delete-sbar') {
      if (confirm('Xóa SBAR này?')) {
        deleteSBAR(profileId, id);
        window.location.hash = '#/docspace/sbar';
      }
    } else if (action === 'copy-chat-sbar') {
      const record = await getSBARById(profileId, id);
      if (record) {
        const chatText = formatSBARToChat(record, doctorName);
        navigator.clipboard.writeText(chatText).then(() => {
          const orig = btn.innerHTML;
          btn.innerHTML = '<i class="fa-solid fa-check" style="color:#22c55e"></i>';
          setTimeout(() => { btn.innerHTML = orig; }, 1500);
        });
      }
    } else if (action === 'sandbox-sbar') {
      window.location.hash = `#/docspace/sandbox?source=sbar&id=${id}`;
    } else if (action === 'view-sbar') {
      await showSBARPreview(profileId, id);
    } else if (action === 'edit-sbar') {
      window.location.hash = `#/docspace/sbar?edit=${id}`;
    }
  });

  // Clear edit
  document.getElementById('dspSBARClearEdit')?.addEventListener('click', () => {
    window.location.hash = '#/docspace/sbar';
  });

  // Modal close
  document.getElementById('dspSBARModalBackdrop')?.addEventListener('click', closePreview);
  document.getElementById('dspClosePreview')?.addEventListener('click', closePreview);

  // Print Normal
  document.getElementById('dspPrintBtn')?.addEventListener('click', () => {
    window.print();
  });

  // Copy Full Content
  document.getElementById('dspCopyBtn')?.addEventListener('click', () => {
    const content = document.getElementById('dspSBARPreviewContent');
    if (content) {
      navigator.clipboard.writeText(content.innerText).then(() => {
        const btn = document.getElementById('dspCopyBtn');
        if (btn) { btn.innerHTML = '<i class="fa-solid fa-check"></i> Đã sao chép'; setTimeout(() => { btn.innerHTML = '<i class="fa-regular fa-copy"></i> Sao chép'; }, 2000); }
      });
    }
  });

  // Copy Chat Format in Modal
  document.getElementById('dspCopyChatBtn')?.addEventListener('click', () => {
    if (currentPreviewRecord) {
      const chatText = formatSBARToChat(currentPreviewRecord, doctorName);
      navigator.clipboard.writeText(chatText).then(() => {
        const btn = document.getElementById('dspCopyChatBtn');
        if (btn) {
          btn.innerHTML = '<i class="fa-solid fa-check"></i> Đã chép Chat';
          setTimeout(() => {
            btn.innerHTML = '<i class="fa-solid fa-share-nodes"></i> Copy Chat';
          }, 2000);
        }
      });
    }
  });

  // Copy SMS Format in Modal
  document.getElementById('dspCopySmsBtn')?.addEventListener('click', () => {
    if (currentPreviewRecord) {
      const smsText = formatSBARToSMS(currentPreviewRecord);
      navigator.clipboard.writeText(smsText).then(() => {
        const btn = document.getElementById('dspCopySmsBtn');
        if (btn) {
          btn.innerHTML = '<i class="fa-solid fa-check"></i> Đã chép SMS';
          setTimeout(() => {
            btn.innerHTML = '<i class="fa-solid fa-comment-sms"></i> SMS';
          }, 2000);
        }
      });
    }
  });
}

async function submitSBAR(profileId: string, isDraft: boolean, isLockAction = false): Promise<void> {
  const editId = (document.getElementById('dspSBAREditId') as HTMLInputElement)?.value;
  const title = (document.getElementById('dspSBARTitle') as HTMLInputElement)?.value || '';
  const situation = (document.getElementById('dspSBAR_situation') as HTMLTextAreaElement)?.value || '';
  const background = (document.getElementById('dspSBAR_background') as HTMLTextAreaElement)?.value || '';
  const assessment = (document.getElementById('dspSBAR_assessment') as HTMLTextAreaElement)?.value || '';
  const recommendation = (document.getElementById('dspSBAR_recommendation') as HTMLTextAreaElement)?.value || '';

  if (!situation.trim() && !isDraft) {
    alert('Vui lòng nhập ít nhất phần Situation (S).');
    return;
  }

  if (editId) {
    await updateSBAR(profileId, editId, { title, situation, background, assessment, recommendation, isDraft, isLocked: isLockAction }, isLockAction);
  } else {
    await saveSBAR(profileId, { title, situation, background, assessment, recommendation, isDraft });
  }

  window.location.hash = '#/docspace/sbar';
}

async function showSBARPreview(profileId: string, id: string): Promise<void> {
  const record = await getSBARById(profileId, id);
  if (!record) return;
  currentPreviewRecord = record;
  const modal = document.getElementById('dspSBARPreviewModal');
  const content = document.getElementById('dspSBARPreviewContent');
  const title = document.getElementById('dspPreviewTitle');
  if (modal && content && title) {
    title.textContent = record.title || 'SBAR Preview';
    content.innerHTML = renderSBARPreviewHtml(record);
    modal.style.display = 'flex';
  }
}

function closePreview(): void {
  const modal = document.getElementById('dspSBARPreviewModal');
  if (modal) modal.style.display = 'none';
  currentPreviewRecord = null;
}

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function truncate(str: string, len: number): string {
  return str.length > len ? str.slice(0, len) + '…' : str;
}
