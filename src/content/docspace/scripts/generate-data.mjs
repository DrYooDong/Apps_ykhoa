import fs from 'fs';
import path from 'path';

// 1. Helper mapping of specialty / term to GROUP_NAMES
function mapToNhom(text) {
  const t = (text || '').toLowerCase();
  if (t.includes('tim') || t.includes('mạch') || t.includes('huyết áp') || t.includes('coronary') || t.includes('ecg')) return 'Tim mạch';
  if (t.includes('hô hấp') || t.includes('phổi') || t.includes('phế quản') || t.includes('copd') || t.includes('hen')) return 'Hô hấp';
  if (t.includes('tiêu hóa') || t.includes('gan') || t.includes('mật') || t.includes('tụy') || t.includes('dạ dày') || t.includes('ruột') || t.includes('bụng')) return 'Tiêu hóa';
  if (t.includes('tiết niệu') || t.includes('thận') || t.includes('bàng quang') || t.includes('tiểu')) return 'Tiết niệu';
  if (t.includes('nội tiết') || t.includes('chuyển hóa') || t.includes('đường huyết') || t.includes('giáp') || t.includes('thượng thận') || t.includes('dka')) return 'Nội tiết';
  if (t.includes('thần kinh') || t.includes('não') || t.includes('tri giác') || t.includes('màng não') || t.includes('đột quỵ')) return 'Thần kinh';
  if (t.includes('da') || t.includes('niêm') || t.includes('dị ứng') || t.includes('mày đay') || t.includes('ban') || t.includes('phát ban')) return 'Da niêm';
  if (t.includes('huyết học') || t.includes('đông máu') || t.includes('thiếu máu') || t.includes('tiểu cầu') || t.includes('inr')) return 'Huyết học';
  if (t.includes('truyền nhiễm') || t.includes('nhiệt đới') || t.includes('nhiễm trùng') || t.includes('virus') || t.includes('vi khuẩn') || t.includes('sốt')) return 'Truyền nhiễm';
  if (t.includes('cls') || t.includes('xét nghiệm') || t.includes('chẩn đoán hình ảnh') || t.includes('ct') || t.includes('x-quang') || t.includes('siêu âm') || t.includes('huyết thanh')) return 'Cận lâm sàng';
  return 'Toàn thân';
}

const THRESHOLD_MAPS = {
  // Nhiệt độ
  'sot': { fld: 'vNhiet', op: '>=', val: 38.0 },
  'sot_cao': { fld: 'vNhiet', op: '>=', val: 38.5 },
  'sot_rat_cao': { fld: 'vNhiet', op: '>=', val: 39.0 },
  'ha_than_nhiet': { fld: 'vNhiet', op: '<', val: 36.0 },
  'tc_sot_cao_dot_ngot_duoi_7_ngay': { fld: 'vNhiet', op: '>=', val: 38.0 },
  'sot_cao_ret_run': { fld: 'vNhiet', op: '>=', val: 38.5 },
  // Mạch
  'mach_nhanh': { fld: 'vMach', op: '>=', val: 100 },
  'mach_rat_nhanh': { fld: 'vMach', op: '>=', val: 120 },
  'mach_cham': { fld: 'vMach', op: '<', val: 60 },
  // Huyết áp
  'tang_huyet_ap': { fld: 'vHATT', op: '>=', val: 140 },
  'con_tang_huyet_ap_cap_cuu': { fld: 'vHATT', op: '>=', val: 180 },
  'ha_huyet_ap': { fld: 'vHATT', op: '<', val: 90 },
  'tut_huyet_ap': { fld: 'vHATT', op: '<', val: 90 },
  'huyet_ap_kep': { fld: 'vHATT', op: '<', val: 95 },
  // Nhịp thở
  'tho_nhanh': { fld: 'vTho', op: '>=', val: 22 },
  'tho_nhanh_nang': { fld: 'vTho', op: '>=', val: 30 },
  'tho_cham': { fld: 'vTho', op: '<', val: 10 },
  // SpO2
  'giam_spo2': { fld: 'vSpo2', op: '<', val: 95 },
  'suy_ho_hap_spo2_thap': { fld: 'vSpo2', op: '<', val: 92 },
  // Bạch cầu
  'bach_cau_tang': { fld: 'lBC', op: '>=', val: 12.0 },
  'bach_cau_tang_cao': { fld: 'lBC', op: '>=', val: 15.0 },
  'bach_cau_giam': { fld: 'lBC', op: '<', val: 4.0 },
  // Tiểu cầu
  'giam_tieu_cau': { fld: 'lTC', op: '<', val: 150 },
  'tieu_cau_giam_nang': { fld: 'lTC', op: '<', val: 100 },
  'tieu_cau_giam_nguy_kich': { fld: 'lTC', op: '<', val: 50 },
  // Hct
  'co_dac_mau_hct': { fld: 'lHct', op: '>=', val: 45, valNam: 45, valNu: 42 },
  'thieu_mau_hct_giam': { fld: 'lHct', op: '<', val: 35 },
  // Glucose
  'tang_duong_huyet': { fld: 'lGlu', op: '>=', val: 11.1 },
  'tang_duong_huyet_nang_dka': { fld: 'lGlu', op: '>=', val: 13.9 },
  'ha_duong_huyet': { fld: 'lGlu', op: '<', val: 3.9 },
  // Troponin
  'troponin_tang': { fld: 'lTrop', op: '>=', val: 14.0 },
  'troponin_tang_cao': { fld: 'lTrop', op: '>=', val: 50.0 },
};

// 1. Read all enriched diseases
const dir1 = './data/enriched';
const dir2 = './data/_backup_enriched_2026-09-24/enriched';
const fileMap = {};
for (const f of fs.readdirSync(dir2)) if (f.endsWith('.json')) fileMap[f] = path.join(dir2, f);
for (const f of fs.readdirSync(dir1)) if (f.endsWith('.json')) fileMap[f] = path.join(dir1, f);

const symptomsMap = new Map(); // id -> TrieuChung
const diseasesList = []; // Benh[]

const STANDARD_NAME_MAP = {
  'buon_non_non': { ten: 'Buồn nôn / Nôn ói', nhom: 'Tiêu hóa' },
  'dau_co': { ten: 'Đau mỏi cơ toàn thân', nhom: 'Toàn thân' },
  'nhuc_hai_ho_mat': { ten: 'Đau nhức 2 hốc mắt', nhom: 'Toàn thân' },
  'dau_dau': { ten: 'Đau đầu dữ dội', nhom: 'Thần kinh' },
  'tc_xuat_huyet_da_niem_lacet_duong_tinh': { ten: 'Xuất huyết da niêm / Dấu dây thắt (Lacet) (+)', nhom: 'Huyết học' },
  'tc_xet_nghiem_ns1_hoac_pcr_duong_tinh': { ten: 'Kháng nguyên NS1 hoặc RT-PCR Dengue (+)', nhom: 'Cận lâm sàng' },
  'tc_dau_hieu_canh_bao_dau_bung_gan_non_oi': { ten: 'Đau bụng vùng gan / Nôn ói nhiều (Dấu hiệu cảnh báo)', nhom: 'Tiêu hóa' },
  'gan_to_dau': { ten: 'Gan to > 2cm dưới bờ sườn, ấn đau', nhom: 'Tiêu hóa' },
  'non_ra_mau_phan_den': { ten: 'Xuất huyết tiêu hóa: Nôn ra máu / Đi cầu phân đen', nhom: 'Tiêu hóa' },
  'tc_co_dac_mau_hct_tang_tren_20_phan_tram': { ten: 'Cô đặc máu: Hct tăng ≥ 20% so với giá trị ban đầu', nhom: 'Cận lâm sàng' },
  'tc_giam_tieu_cau_duoi_100_g_l': { ten: 'Tiểu cầu giảm nhanh < 100 G/L', nhom: 'Cận lâm sàng' },
  'tran_dich_mang_phoi_mang_bung': { ten: 'Tràn dịch màng phổi / Màng bụng (Thoát huyết tương)', nhom: 'Hô hấp' },
  'men_gan_tang': { ten: 'Men gan tăng (AST / ALT tăng)', nhom: 'Cận lâm sàng' },
  'tien_can_song_o_dich_luu_hanh': { ten: 'Sống trong hoặc đi đến vùng dịch tễ lưu hành', nhom: 'Dịch tễ' },
  'phat_ban_xung_huyet': { ten: 'Phát ban xung huyết da / Dấu phục hồi đảo trắng', nhom: 'Da niêm' },
  'lu_du_vat_va_li_bi': { ten: 'Lừ đừ, vật vã, li bì', nhom: 'Thần kinh' },
  'tien_su_su_dung_thuoc_khang_lao': { ten: 'Tiền sử đang sử dụng thuốc kháng lao (R, H, Z, E)', nhom: 'Tiền căn' },
  'men_gan_ast_alt_tang_tren_1000': { ten: 'Men gan AST/ALT tăng rất cao (> 1.000 U/L)', nhom: 'Cận lâm sàng' },
  'tang_bilirubin_mau': { ten: 'Tăng Bilirubin toàn phần máu (Vàng mắt, vàng da)', nhom: 'Cận lâm sàng' },
  'dau_tuc_ha_suon_phai': { ten: 'Đau tức vùng hạ sườn phải', nhom: 'Tiêu hóa' },
  'met_moi': { ten: 'Mệt mỏi toàn thân, suy nhược', nhom: 'Toàn thân' },
  'chan_an_sut_can': { ten: 'Chán ăn, sợ mỡ, sụt cân', nhom: 'Tiêu hóa' },
  'ti_le_prothrombin_giam_inr_tang': { ten: 'Tỷ lệ Prothrombin giảm (PT < 50% hoặc INR ≥ 1.5)', nhom: 'Cận lâm sàng' },
  'giam_albumin_mau': { ten: 'Giảm Albumin huyết thanh (< 35 g/L)', nhom: 'Cận lâm sàng' },
  'tien_su_phoi_nhiem_hbv': { ten: 'Tiền sử phơi nhiễm HBV / Tiêm truyền không an toàn', nhom: 'Tiền căn' },
  'tien_su_viem_gan_virus_b_c': { ten: 'Tiền sử mắc Viêm gan vi rút B hoặc C mạn tính', nhom: 'Tiền căn' },
  'tc_do_dan_hoi_gan_fibroscan': { ten: 'Đo độ đàn hồi gan FibroScan (Đánh giá xơ hóa F0-F4)', nhom: 'Cận lâm sàng' },
  'tc_chi_so_apri_fib4': { ten: 'Chỉ số sinh hóa APRI hoặc FIB-4 đánh giá xơ gan', nhom: 'Cận lâm sàng' },
  'tc_noi_soi_gian_ttmq': { ten: 'Nội soi thực quản - dạ dày: Giãn tĩnh mạch thực quản (EV)', nhom: 'Cận lâm sàng' },
  'tc_thang_diem_child_pugh_a': { ten: 'Thang điểm Child-Pugh phân độ chức năng gan (A / B / C)', nhom: 'Cận lâm sàng' }
};

function addOrUpdateSymptom(id, label, nhomHint, loaiHint, tuKhoaExtra = []) {
  if (!id) return;
  const cleanId = id.trim();
  const stdInfo = STANDARD_NAME_MAP[cleanId];
  if (symptomsMap.has(cleanId)) {
    const existing = symptomsMap.get(cleanId);
    if ((!existing.ten || existing.ten === cleanId.replace(/_/g, ' ')) && (stdInfo?.ten || label)) {
      existing.ten = stdInfo?.ten || label;
    }
    return;
  }

  const cleanLabel = (stdInfo?.ten || label || cleanId)
    .replace(/^-\s*/, '')
    .replace(/^Biểu hiện lâm sàng:\s*/i, '')
    .trim();

  const nhom = mapToNhom(nhomHint || cleanLabel);
  
  let loai = ['cn'];
  const lLow = cleanLabel.toLowerCase();
  if (lLow.includes('x-quang') || lLow.includes('siêu âm') || lLow.includes('ct ') || lLow.includes('xét nghiệm') || lLow.includes('bạch cầu') || lLow.includes('tiểu cầu') || lLow.includes('hct') || lLow.includes('pcr') || lLow.includes('ast') || lLow.includes('alt') || lLow.includes('troponin') || lLow.includes('glucose') || lLow.includes('inr') || lLow.includes('bilirubin')) {
    loai = ['cls'];
  } else if (lLow.includes('dấu hiệu') || lLow.includes('khám') || lLow.includes('ran') || lLow.includes('phù') || lLow.includes('ban') || lLow.includes('vàng da') || lLow.includes('sao mạch') || lLow.includes('cổ trướng') || lLow.includes('gan to') || lLow.includes('lách to')) {
    loai = ['tt'];
  } else if (lLow.includes('tiền sử') || lLow.includes('tiền căn') || lLow.includes('vùng dịch') || lLow.includes('dịch tễ') || lLow.includes('sống tại')) {
    loai = ['tc'];
  }

  const tuKhoa = Array.from(new Set([
    cleanLabel.toLowerCase(),
    cleanId.replace(/_/g, ' '),
    ...cleanLabel.toLowerCase().split(/[ ,;/()+-]+/).filter(w => w.length > 2),
    ...tuKhoaExtra.map(t => t.toLowerCase())
  ])).slice(0, 8);

  const threshold = THRESHOLD_MAPS[cleanId] || null;

  symptomsMap.set(cleanId, {
    id: cleanId,
    ten: cleanLabel,
    nhom,
    loai,
    tuKhoa,
    aliases: [cleanLabel],
    map: threshold
  });
}

// Ensure basic vital and lab symptoms exist
const BASE_SYMPTOMS = [
  { id: 'sot', ten: 'Sốt (Thân nhiệt ≥ 38.0°C)', nhom: 'Toàn thân', loai: ['cn', 'tt'], map: THRESHOLD_MAPS['sot'], tuKhoa: ['sốt', 'nhiệt độ cao', 'nóng mình'] },
  { id: 'sot_cao', ten: 'Sốt cao (Thân nhiệt ≥ 38.5°C)', nhom: 'Toàn thân', loai: ['cn', 'tt'], map: THRESHOLD_MAPS['sot_cao'], tuKhoa: ['sốt cao', 'thân nhiệt cao', 'sot cao'] },
  { id: 'ha_than_nhiet', ten: 'Hạ thân nhiệt (< 36.0°C)', nhom: 'Toàn thân', loai: ['tt'], map: THRESHOLD_MAPS['ha_than_nhiet'], tuKhoa: ['hạ nhiệt độ', 'thân nhiệt tụt', 'lạnh người'] },
  { id: 'mach_nhanh', ten: 'Mạch nhanh (Mạch ≥ 100 lần/phút)', nhom: 'Tim mạch', loai: ['tt'], map: THRESHOLD_MAPS['mach_nhanh'], tuKhoa: ['mạch nhanh', 'nhịp tim nhanh', 'hồi hộp'] },
  { id: 'mach_rat_nhanh', ten: 'Mạch rất nhanh (Mạch ≥ 120 lần/phút)', nhom: 'Tim mạch', loai: ['tt'], map: THRESHOLD_MAPS['mach_rat_nhanh'], tuKhoa: ['mạch nhanh dữ dội', 'tachycardia'] },
  { id: 'mach_cham', ten: 'Mạch chậm (Mạch < 60 lần/phút)', nhom: 'Tim mạch', loai: ['tt'], map: THRESHOLD_MAPS['mach_cham'], tuKhoa: ['mạch chậm', 'nhịp tim chậm', 'bradycardia'] },
  { id: 'tang_huyet_ap', ten: 'Tăng huyết áp (HATT ≥ 140 mmHg)', nhom: 'Tim mạch', loai: ['tt'], map: THRESHOLD_MAPS['tang_huyet_ap'], tuKhoa: ['tăng huyết áp', 'cao huyết áp', 'tha'] },
  { id: 'con_tang_huyet_ap_cap_cuu', ten: 'Cơn tăng huyết áp cấp cứu (HATT ≥ 180 mmHg)', nhom: 'Tim mạch', loai: ['tt'], map: THRESHOLD_MAPS['con_tang_huyet_ap_cap_cuu'], tuKhoa: ['tha cấp cứu', 'huyết áp kịch phát'] },
  { id: 'ha_huyet_ap', ten: 'Hạ huyết áp (HATT < 90 mmHg)', nhom: 'Tim mạch', loai: ['tt'], map: THRESHOLD_MAPS['ha_huyet_ap'], tuKhoa: ['hạ huyết áp', 'tụt huyết áp', 'huyết áp thấp'] },
  { id: 'huyet_ap_kep', ten: 'Huyết áp kẹp (Hiệu áp ≤ 20 mmHg hoặc HATT < 95)', nhom: 'Tim mạch', loai: ['tt'], map: THRESHOLD_MAPS['huyet_ap_kep'], tuKhoa: ['huyết áp kẹp', 'hiệu số huyết áp hẹp'] },
  { id: 'tho_nhanh', ten: 'Thở nhanh (Nhịp thở ≥ 22 lần/phút)', nhom: 'Hô hấp', loai: ['tt'], map: THRESHOLD_MAPS['tho_nhanh'], tuKhoa: ['thở nhanh', 'tachypnea', 'thở gấp'] },
  { id: 'tho_nhanh_nang', ten: 'Thở rất nhanh (Nhịp thở ≥ 30 lần/phút)', nhom: 'Hô hấp', loai: ['tt'], map: THRESHOLD_MAPS['tho_nhanh_nang'], tuKhoa: ['thở rất nhanh', 'thở dồn dập'] },
  { id: 'giam_spo2', ten: 'Giảm bão hòa oxy máu (SpO₂ < 95%)', nhom: 'Hô hấp', loai: ['tt', 'cls'], map: THRESHOLD_MAPS['giam_spo2'], tuKhoa: ['spo2 giảm', 'thiếu oxy máu', 'tím tái'] },
  { id: 'suy_ho_hap_spo2_thap', ten: 'Suy hô hấp cấp (SpO₂ < 92%)', nhom: 'Hô hấp', loai: ['tt', 'cls'], map: THRESHOLD_MAPS['suy_ho_hap_spo2_thap'], tuKhoa: ['suy hô hấp', 'spo2 rất thấp', 'thiếu oxy nặng'] },
  { id: 'bach_cau_tang', ten: 'Bạch cầu tăng (WBC ≥ 12 G/L)', nhom: 'Cận lâm sàng', loai: ['cls'], map: THRESHOLD_MAPS['bach_cau_tang'], tuKhoa: ['bạch cầu tăng', 'wbc cao', 'nhiễm trùng'] },
  { id: 'bach_cau_tang_cao', ten: 'Bạch cầu tăng rất cao (WBC ≥ 15 G/L)', nhom: 'Cận lâm sàng', loai: ['cls'], map: THRESHOLD_MAPS['bach_cau_tang_cao'], tuKhoa: ['bạch cầu rất cao', 'wbc tang cao'] },
  { id: 'bach_cau_giam', ten: 'Bạch cầu giảm (WBC < 4.0 G/L)', nhom: 'Cận lâm sàng', loai: ['cls'], map: THRESHOLD_MAPS['bach_cau_giam'], tuKhoa: ['bạch cầu giảm', 'leukopenia', 'wbc giam'] },
  { id: 'giam_tieu_cau', ten: 'Tiểu cầu giảm (PLT < 150 G/L)', nhom: 'Huyết học', loai: ['cls'], map: THRESHOLD_MAPS['giam_tieu_cau'], tuKhoa: ['tiểu cầu giảm', 'thrombocytopenia', 'plt giam'] },
  { id: 'tieu_cau_giam_nang', ten: 'Tiểu cầu giảm nặng (PLT < 100 G/L)', nhom: 'Huyết học', loai: ['cls'], map: THRESHOLD_MAPS['tieu_cau_giam_nang'], tuKhoa: ['tiểu cầu giảm nặng', 'plt duoi 100'] },
  { id: 'tieu_cau_giam_nguy_kich', ten: 'Tiểu cầu nguy kịch (PLT < 50 G/L)', nhom: 'Huyết học', loai: ['cls'], map: THRESHOLD_MAPS['tieu_cau_giam_nguy_kich'], tuKhoa: ['tiểu cầu nguy kịch', 'plt duoi 50', 'nguy cơ xuất huyết cao'] },
  { id: 'co_dac_mau_hct', ten: 'Cô đặc máu (Hematocrit Hct ≥ 45% hoặc tăng ≥ 20%)', nhom: 'Huyết học', loai: ['cls'], map: THRESHOLD_MAPS['co_dac_mau_hct'], tuKhoa: ['cô đặc máu', 'hct tăng cao', 'hematocrit cao'] },
  { id: 'tang_duong_huyet', ten: 'Tăng đường huyết (Glucose ≥ 11.1 mmol/L)', nhom: 'Nội tiết', loai: ['cls'], map: THRESHOLD_MAPS['tang_duong_huyet'], tuKhoa: ['đường huyết cao', 'glucose cao', 'tăng glucose'] },
  { id: 'tang_duong_huyet_nang_dka', ten: 'Tăng đường huyết nặng DKA (Glucose ≥ 13.9 mmol/L)', nhom: 'Nội tiết', loai: ['cls'], map: THRESHOLD_MAPS['tang_duong_huyet_nang_dka'], tuKhoa: ['đường huyết rất cao', 'toan ceton'] },
  { id: 'ha_duong_huyet', ten: 'Hạ đường huyết (Glucose < 3.9 mmol/L)', nhom: 'Nội tiết', loai: ['cls'], map: THRESHOLD_MAPS['ha_duong_huyet'], tuKhoa: ['hạ đường huyết', 'glucose thấp', 'đói lả'] },
  { id: 'troponin_tang', ten: 'Troponin tim tăng (Troponin I/T ≥ 14 ng/L)', nhom: 'Tim mạch', loai: ['cls'], map: THRESHOLD_MAPS['troponin_tang'], tuKhoa: ['troponin tăng', 'tổn thương cơ tim', 'hoại tử cơ tim'] },
  { id: 'dau_that_nguc', ten: 'Đau thắt ngực (Đè nặng sau xương ức)', nhom: 'Tim mạch', loai: ['cn'], map: null, tuKhoa: ['đau ngực', 'đau thắt ngực', 'đè nghẹt sau xương ức'] },
  { id: 'kho_tho', ten: 'Khó thở khi gắng sức hoặc khi nằm', nhom: 'Hô hấp', loai: ['cn'], map: null, tuKhoa: ['khó thở', 'dyspnea', 'hụt hơi', 'ngột ngạt'] },
  { id: 'ho_dam_mu', ten: 'Ho khạc đờm mủ / đờm đục', nhom: 'Hô hấp', loai: ['cn'], map: null, tuKhoa: ['ho đờm', 'khạc đờm mủ', 'đờm vàng xanh'] },
  { id: 'ran_no_o_phoi', ten: 'Ran nổ / ran ẩm khu trú tại phổi', nhom: 'Hô hấp', loai: ['tt'], map: null, tuKhoa: ['ran nổ', 'ran ẩm', 'crackles', 'đông đặc phổi'] },
  { id: 'dau_bung_thuong_vi', ten: 'Đau bụng thượng vị cấp tính', nhom: 'Tiêu hóa', loai: ['cn'], map: null, tuKhoa: ['đau thượng vị', 'đau bụng cấp', 'đau quặn bụng'] },
  { id: 'vang_da_vang_mat', ten: 'Vàng da vàng mắt (Jaundice / Icterus)', nhom: 'Tiêu hóa', loai: ['tt'], map: null, tuKhoa: ['vàng da', 'vàng mắt', 'jaundice', 'tăng bilirubin'] },
  { id: 'sao_mach_spider_nevi', ten: 'Sao mạch (Spider nevi) vùng ngực cổ', nhom: 'Da niêm', loai: ['tt'], map: null, tuKhoa: ['sao mạch', 'spider nevi', 'u mạch hình nhện'] },
  { id: 'ban_do_long_tay_palmar_erythema', ten: 'Bàn tay son (Palmar erythema)', nhom: 'Da niêm', loai: ['tt'], map: null, tuKhoa: ['bàn tay son', 'ban đỏ lòng bàn tay'] },
  { id: 'co_truong_bang_bung', ten: 'Cổ trướng (Báng bụng tự do / dịch ổ bụng)', nhom: 'Tiêu hóa', loai: ['tt'], map: null, tuKhoa: ['cổ trướng', 'báng bụng', 'ascites', 'bụng to'] },
  { id: 'xuat_huyet_tieu_hoa_non_ra_mau', ten: 'Nôn ra máu hoặc đi cầu phân đen', nhom: 'Tiêu hóa', loai: ['cn', 'tt'], map: null, tuKhoa: ['nôn ra máu', 'đi cầu phân đen', 'hematemesis', 'melena'] },
  { id: 'co_cung_gay_dau_mang_nao', ten: 'Cổ gượng / Dấu màng não (Kernig, Brudzinski dương tính)', nhom: 'Thần kinh', loai: ['tt'], map: null, tuKhoa: ['cổ gượng', 'dấu màng não', 'kernig', 'brudzinski'] },
  { id: 'dau_dau_du_doi', ten: 'Đau đầu dữ dội, nôn vọt không liên quan bữa ăn', nhom: 'Thần kinh', loai: ['cn'], map: null, tuKhoa: ['đau đầu', 'nhức đầu', 'nôn vọt', 'tăng áp lực nội sọ'] },
  { id: 'cham_xuat_huyet_duoi_da', ten: 'Chấm xuất huyết, ban xuất huyết dưới da', nhom: 'Da niêm', loai: ['tt'], map: null, tuKhoa: ['chấm xuất huyết', 'petechiae', 'ban xuất huyết', 'purpura'] },
  { id: 'bong_nuoc_thuy_dau', ten: 'Bóng nước nhiều lứa tuổi (Dát sẩn, mụn nước trong, đóng vảy)', nhom: 'Da niêm', loai: ['tt'], map: null, tuKhoa: ['bóng nước', 'thủy đậu', 'mụn nước', 'nốt đậu'] },
  { id: 'dau_co_bap_chan_du_doi', ten: 'Đau cơ bắp chân dữ dội khi sờ nắn (Dấu hiệu Weil/Leptospira)', nhom: 'Toàn thân', loai: ['tt', 'cn'], map: null, tuKhoa: ['đau cơ bắp chân', 'đau cơ dữ dội', 'myalgia'] },
  { id: 'may_day_phu_mach_di_ung', ten: 'Mày đay cấp, phù mạch, đỏ da toàn thân', nhom: 'Da niêm', loai: ['tt'], map: null, tuKhoa: ['mày đay', 'phù mạch', 'urticaria', 'angioedema'] },
  { id: 'tho_rit_thanh_quan_stridor', ten: 'Thở rít thanh quản (Stridor), co thắt thanh khí phế quản', nhom: 'Hô hấp', loai: ['tt'], map: null, tuKhoa: ['thở rít', 'stridor', 'co thắt thanh quản', 'phản vệ'] },
  { id: 'yeu_liet_nua_nguoi', ten: 'Yếu liệt 1/2 người cấp tính, méo miệng (Dấu hiệu FAST)', nhom: 'Thần kinh', loai: ['tt'], map: null, tuKhoa: ['yếu liệt', 'liệt nửa người', 'méo miệng', 'đột quỵ', 'fast'] },
  { id: 'tieu_buot_tieu_gat', ten: 'Tiểu buốt, tiểu rắt, tiểu đục (Hội chứng niệu đạo cấp)', nhom: 'Tiết niệu', loai: ['cn'], map: null, tuKhoa: ['tiểu buốt', 'tiểu rắt', 'tiểu lắt nhắt', 'dysuria'] },
  { id: 'dau_goc_suon_lung_rung_than', ten: 'Đau góc sườn lưng, rung thận dương tính', nhom: 'Tiết niệu', loai: ['tt'], map: null, tuKhoa: ['rung thận', 'đau sườn lưng', 'viêm thận bể thận'] },
];

for (const s of BASE_SYMPTOMS) {
  symptomsMap.set(s.id, s);
}

// Ingest enriched files
for (const [fname, fpath] of Object.entries(fileMap)) {
  const d = JSON.parse(fs.readFileSync(fpath, 'utf8'));
  const slug = fname.replace('.json', '');

  // Extract criteria into symptom dictionary and disease deduction matrix (dd)
  const dd = [];
  if (d.criteria && Array.isArray(d.criteria)) {
    for (const c of d.criteria) {
      const critId = c.id || `${slug}_${Math.random().toString(36).slice(2, 7)}`;
      const weight = c.weight || (c.type === 'mandatory' ? 4.5 : c.type === 'major' ? 3.5 : c.type === 'exclusion' ? -5.0 : 2.0);
      let role = c.cdssRole || (c.type === 'mandatory' || c.type === 'major' ? 'dt' : c.type === 'exclusion' ? 'loaitru' : c.type === 'minor' ? 'gy' : 'ht');
  if (role === 'dx_exclude' || role === 'exclusion') role = 'loaitru';
  if (!['dt', 'gy', 'ht', 'loaitru'].includes(role)) role = 'gy';

      addOrUpdateSymptom(critId, c.label, d.specialty || d.diseaseName, c.type, c.symptomIds || []);
      dd.push([critId, weight, role]);

      // If criterion has sub-symptoms
      if (c.symptomIds && Array.isArray(c.symptomIds)) {
        for (const symId of c.symptomIds) {
          const stdName = STANDARD_NAME_MAP[symId]?.ten || symId.replace(/_/g, ' ');
          addOrUpdateSymptom(symId, stdName, d.specialty, 'cn');
        }
      }
    }
  }

  // Treatment line
  let tuyen = ['Tuyến y tế ban đầu (Trạm y tế / Phòng khám)', 'Bệnh viện Quận/Huyện (Hạng 2-3)', 'Bệnh viện Tỉnh / Trung ương (Hạng 1-ĐB)'];
  let thuoc = [];
  let luuY = 'Tuân thủ nghiêm ngặt phác đồ Bộ Y Tế, theo dõi sát sinh hiệu và báo động đỏ.';

  if (d.protocol) {
    if (d.protocol.principles) luuY = Array.isArray(d.protocol.principles) ? d.protocol.principles.join('. ') : d.protocol.principles;
    if (d.protocol.hospitalizationCriteria) luuY += ' Tiêu chuẩn nhập viện: ' + (Array.isArray(d.protocol.hospitalizationCriteria) ? d.protocol.hospitalizationCriteria.join('; ') : d.protocol.hospitalizationCriteria);
  }

  // Default drugs based on disease slug
  if (slug.includes('dengue')) {
    thuoc = [
      ['Ringer Lactate', '15-20 mL/kg/h truyền xả cấp cứu khi sốc, hạ dần 10-7.5-5-3 mL/kg/h', 'Dịch tinh thể đẳng trương'],
      ['Paracetamol', '10-15 mg/kg mỗi 4-6h (không quá 60mg/kg/ngày)', 'Hạ sốt an toàn, CHỐNG CHỈ ĐỊNH Aspirin/NSAID'],
      ['Dextran 40 / HES 130/0.4', '10-15 mL/kg/h', 'Dịch cao phân tử khi sốc kéo dài hoặc Hct tiếp tục tăng sau bù dịch tinh thể']
    ];
  } else if (slug.includes('xo_gan')) {
    thuoc = [
      ['Spironolactone', '100 mg/ngày uống buổi sáng, phối hợp Furosemide', 'Kháng Aldosterone điều trị cổ trướng'],
      ['Furosemide', '40 mg/ngày uống (duy trì tỷ lệ Spironolactone : Furosemide = 100 : 40)', 'Lợi tiểu quai phối hợp'],
      ['Octreotide / Terlipressin', 'Octreotide bolus 50 µg rồi truyền 50 µg/h', 'Giảm áp lực tĩnh mạch cửa khi xuất huyết tiêu hóa do vỡ giãn TMTQ'],
      ['Ceftriaxone', '1g/ngày IV trong 5-7 ngày', 'Dự phòng nhiễm trùng dịch báng (SBP) ở bệnh nhân XHTH']
    ];
  } else if (slug.includes('viem_phoi')) {
    thuoc = [
      ['Amoxicillin/Clavulanate', '1000/62.5 mg x 2 viên uống 2 lần/ngày', 'Ngoại trú không biến chứng'],
      ['Ceftriaxone + Azithromycin', 'Ceftriaxone 2g/ngày IV + Azithromycin 500mg/ngày IV/PO', 'Nhập viện điều trị nội trú tiêu chuẩn'],
      ['Piperacillin/Tazobactam + Vancomycin', 'Pip/Tazo 4.5g q6h IV + Vancomycin 15-20mg/kg q8-12h TDM', 'HAP/VAP nguy cơ nhiễm Pseudomonas & MRSA']
    ];
  } else if (slug.includes('phan_ve')) {
    thuoc = [
      ['Adrenaline (Epinephrine) 1mg/1ml', 'Tiêm bắp mặt trước ngoài đùi ngay lập tức: Người lớn 1/2 ống (0.5ml), trẻ em 1/5 - 1/3 ống', 'Thuốc cấp cứu hàng đầu, tiêm bắp STAT không chần chừ'],
      ['Methylprednisolone', '1-2 mg/kg IV hoặc Diphenhydramine 25-50mg IV', 'Dự phòng phản vệ pha 2 muộn (sau khi đã tiêm Adrenaline)']
    ];
  } else if (slug.includes('thuy_dau')) {
    thuoc = [
      ['Acyclovir', 'Người lớn 800mg x 5 lần/ngày uống trong 7 ngày (hoặc Valacyclovir 1000mg x 3 lần/ngày)', 'Kháng virus đặc hiệu khởi đầu trong 24-72h đầu'],
      ['Paracetamol', '500-1000mg mỗi 6h khi sốt đau', 'Hạ sốt, tuyệt đối tránh Aspirin (Hội chứng Reye)']
    ];
  } else {
    thuoc = [
      ['Điều trị căn nguyên đặc hiệu', 'Theo kháng sinh đồ hoặc phác đồ hướng dẫn chuyên khoa', 'Bậc 1'],
      ['Điều trị hỗ trợ & triệu chứng', 'Bù nước điện giải, hạ sốt giảm đau, cân bằng toan kiềm', 'Bậc 2']
    ];
  }

  const nhomBenh = mapToNhom(d.specialty || d.diseaseName);

  diseasesList.push({
    id: slug,
    ten: d.diseaseName,
    icd: d.icdCode || 'R69',
    nhom: nhomBenh,
    baoDong: d.severity === 'emergency' || d.severity === 'critical' || d.severity === 'urgent',
    ghiChuBaoDong: d.summary ? d.summary.slice(0, 160) + '...' : 'Cần theo dõi sát sinh hiệu và báo động đỏ lâm sàng.',
    tomTat: d.summary || `${d.diseaseName} thuộc chuyên khoa ${d.specialty}.`,
    danSo: {
      gioiTinh: 'any',
      tuoiMin: null,
      tuoiMax: null
    },
    dd,
    phacDo: {
      tuyen,
      thuoc,
      theoDoi: ['Theo dõi sát sinh hiệu mỗi 2-4h', 'Theo dõi tri giác và lượng nước tiểu'],
      luuY: Array.isArray(luuY) ? luuY : [luuY],
      nguon: ['Bộ Y Tế Việt Nam']
    }
  });
}

// 2. Also parse direct diseases in diagnostic-criteria-database.ts if not yet added
const diagContent = fs.readFileSync('./data/diagnostic-criteria-database.ts', 'utf8');
const directDiseaseRegex = /'([a-z0-9_]+)':\s*\{[\s\S]*?icdCode:\s*'([^']+)'[\s\S]*?diseaseName:\s*'([^']+)'[\s\S]*?specialty:\s*'([^']+)'/g;
let match;
while ((match = directDiseaseRegex.exec(diagContent)) !== null) {
  const [_, slug, icd, name, spec] = match;
  if (!diseasesList.some(b => b.id === slug)) {
    const nhom = mapToNhom(spec || name);
    // Find criteria
    const dd = [];
    const blockStart = diagContent.indexOf(`'${slug}':`, match.index - 50);
    const critStart = diagContent.indexOf('criteria:', blockStart);
    if (critStart !== -1 && critStart < blockStart + 1200) {
      const critEnd = diagContent.indexOf('],', critStart);
      const critText = diagContent.slice(critStart, critEnd + 2);
      const critRegex = /id:\s*'([^']+)'[\s\S]*?label:\s*'([^']+)'/g;
      let cm;
      while ((cm = critRegex.exec(critText)) !== null) {
        const [__, cId, cLabel] = cm;
        addOrUpdateSymptom(cId, cLabel, spec, 'cn');
        dd.push([cId, 3.5, 'dt']);
      }
    }
    if (dd.length === 0) {
      dd.push(['sot', 3.0, 'gy'], ['kho_tho', 3.0, 'gy']);
    }
    diseasesList.push({
      id: slug,
      ten: name,
      icd,
      nhom,
      baoDong: true,
      ghiChuBaoDong: `Bệnh cảnh cấp cứu cần theo dõi sát tại chuyên khoa ${spec}.`,
      tomTat: `${name} — Mã ICD-10: ${icd}. Chuyên khoa ${spec}.`,
      danSo: { gioiTinh: 'any', tuoiMin: null, tuoiMax: null },
      dd,
      phacDo: {
        tuyen: ['Tuyến cơ sở', 'Bệnh viện Quận/Huyện', 'Bệnh viện Chuyên khoa'],
        thuoc: [['Phác đồ chuẩn Bộ Y Tế', 'Theo hướng dẫn chuyên khoa', 'Bậc 1']],
        luuY: 'Theo dõi sinh hiệu, tri giác, nước tiểu và can thiệp kịp thời.'
      }
    });
  }
}

// 3. Write symptoms JSON
const symptomsArray = Array.from(symptomsMap.values());
fs.writeFileSync('./src/data/clinical-rules-symptoms.json', JSON.stringify(symptomsArray, null, 2), 'utf8');
console.log(`Generated clinical-rules-symptoms.json with ${symptomsArray.length} symptoms.`);

// 4. Write diseases TS
const diseasesTsContent = `/**
 * CliniPortal MedLens — Core Disease Knowledge Base
 * Đồng bộ hóa từ 29 Enriched CDSS Databases & Diagnostic Criteria Database
 */
import { Benh } from '../types.ts';

export const CORE_DISEASES: Benh[] = ${JSON.stringify(diseasesList, null, 2)};
`;
fs.writeFileSync('./src/data/diseases.ts', diseasesTsContent, 'utf8');
console.log(`Generated diseases.ts with ${diseasesList.length} core diseases.`);

// 5. Build rich Sample Cases
const SAMPLE_CASES = [
  {
    id: 'case_dengue_warning',
    ten: 'Sốt xuất huyết Dengue có dấu hiệu cảnh báo (Ngày 4, Hct 46%, TC 42 G/L)',
    chuyenKhoa: 'Truyền nhiễm & Nhiệt đới',
    mucDo: 'canh_bao',
    nhomBenh: 'Truyền nhiễm',
    benhId: 'sot_xuat_huyet_dengue',
    tags: ['Dengue', 'Cảnh báo', 'Cô đặc máu', 'Hạ tiểu cầu'],
    sel: ['tc_sot_cao_dot_ngot_duoi_7_ngay', 'dau_co', 'nhuc_hai_ho_mat', 'dau_dau', 'buon_non_non', 'dau_bung_vung_gan', 'co_dac_mau_hct', 'tieu_cau_giam_nang', 'cham_xuat_huyet_duoi_da'],
    vitals: {
      vNhiet: '38.2',
      vMach: '102',
      vHATT: '105',
      vHATTr: '75',
      vTho: '20',
      vSpo2: '98'
    },
    labs: {
      lBC: '3.2',
      lTC: '42',
      lHct: '46',
      lGlu: '5.8',
      lTrop: '8'
    },
    selected: ['tc_sot_cao_dot_ngot_duoi_7_ngay', 'dau_co', 'nhuc_hai_ho_mat', 'dau_dau', 'buon_non_non', 'dau_bung_vung_gan', 'co_dac_mau_hct', 'tieu_cau_giam_nang', 'cham_xuat_huyet_duoi_da'],
    negated: ['co_cung_gay_dau_mang_nao', 'ran_no_o_phoi'],
    epiContext: {
      endemicArea: 'Khu vực lưu hành dịch sốt xuất huyết Dengue',
      vectorExposure: 'Khu trọ nhiều muỗi vằn Aedes aegypti',
      seasonalContext: 'Mùa mưa cao điểm tháng 9-11'
    },
    form: {
      gioiTinh: 'nam',
      tuoi: '24',
      ngheNghiep: 'Sinh viên',
      lyDo: 'Sốt cao ngày thứ 4, đau đầu, nhức hốc mắt, đau bụng hạ sườn phải và mệt lả',
      text: {
        cn: 'Bệnh nhân nam 24 tuổi, sốt cao đột ngột liên tục 4 ngày nay, nhiệt độ 39-40°C, uống Paracetamol chỉ hạ tạm thời. Kèm đau đầu dữ dội, đau nhức hốc mắt, đau mỏi cơ khớp toàn thân. Ngày thứ 4 xuất hiện buồn nôn, nôn 3 lần, đau tức vùng hạ sườn phải liên tục, mệt mỏi li bì.',
        tt: 'Bệnh nhân tỉnh, tiếp xúc chậm, da niêm xung huyết, rải rác chấm xuất huyết dưới da ở 2 cẳng tay. Huyết áp 105/75 mmHg, Mạch 102 l/phút, CRT < 2s. Bụng mềm, ấn đau tức hạ sườn phải, gan mấp mé bờ sườn 1.5cm. Không có dấu thần kinh khu trú, cổ mềm.',
        tc: 'Sống trong khu xóm trọ có 3 ca mắc SXHD tuần qua. Tiền sử khỏe mạnh, không bệnh nền mạn tính.',
        cls: 'CTM: Bạch cầu 3.2 G/L (Neutro 48%, Lympho 42%), Tiểu cầu giảm dốc đứng 42 G/L (trước đó N2 là 145 G/L), Hct 46% (cô đặc máu tăng > 20% so với nền). NS1 Ag (+). Men gan AST 142 U/L, ALT 98 U/L.'
      }
    }
  },
  {
    id: 'case_dengue_shock',
    ten: 'Sốc Sốt xuất huyết Dengue (DSS) — Tụt kẹt huyết áp, cô đặc máu nặng (Ngày 5)',
    chuyenKhoa: 'Hồi sức - Cấp cứu',
    mucDo: 'nguy_kich',
    nhomBenh: 'Truyền nhiễm & Cấp cứu',
    benhId: 'sot_xuat_huyet_dengue',
    tags: ['Sốc Dengue', 'DSS', 'Huyết áp kẹp', 'Tụt kẹt', 'ICU'],
    sel: ['tc_sot_cao_dot_ngot_duoi_7_ngay', 'sot', 'huyet_ap_kep', 'tut_huyet_ap', 'mach_rat_nhanh', 'co_dac_mau_hct', 'tieu_cau_giam_nguy_kich', 'tho_nhanh', 'cham_xuat_huyet_duoi_da'],
    vitals: {
      vNhiet: '37.0',
      vMach: '128',
      vHATT: '85',
      vHATTr: '70',
      vTho: '26',
      vSpo2: '95'
    },
    labs: {
      lBC: '4.8',
      lTC: '28',
      lHct: '50',
      lGlu: '6.4',
      lTrop: '12'
    },
    selected: ['tc_sot_cao_dot_ngot_duoi_7_ngay', 'sot', 'huyet_ap_kep', 'tut_huyet_ap', 'mach_rat_nhanh', 'co_dac_mau_hct', 'tieu_cau_giam_nguy_kich', 'tho_nhanh'],
    negated: [],
    epiContext: {
      endemicArea: 'Vùng dịch sốt xuất huyết đang bùng phát',
      outbreakAlert: 'Báo động đỏ cấp cứu sốc Dengue'
    },
    form: {
      gioiTinh: 'nam',
      tuoi: '21',
      ngheNghiep: 'Công nhân',
      lyDo: 'Hạ sốt nhưng mệt lả, tay chân lạnh ngắt, mạch nhanh nhỏ, huyết áp tụt kẹp 85/70',
      text: {
        cn: 'Ngày 5 của bệnh, bệnh nhân vừa hạ sốt về 37°C thì người nhà thấy người mệt lả, bứt rứt, vã mồ hôi, tiểu ít trong 8 giờ qua.',
        tt: 'Bệnh nhân bứt rứt, tri giác lơ mơ nhẹ. Chi lạnh ẩm, mạch nhanh nhỏ khó bắt 128 lần/phút. Huyết áp tụt kẹp 85/70 mmHg (hiệu áp 15 mmHg). CRT kéo dài > 3 giây. Thở nhanh nông 26 lần/phút.',
        tc: 'Khỏe mạnh, sống tại trọ có nhiều người sốt xuất huyết.',
        cls: 'Hct 50% (cô đặc máu rất nặng), Tiểu cầu 28 G/L. Khí máu: Toan chuyển hóa nhẹ, Lactate máu 3.8 mmol/L.'
      }
    }
  },
  {
    id: 'case_cirrhosis_bleeding',
    ten: 'Xơ gan mất bù / Cổ trướng & Xuất huyết tiêu hóa do vỡ giãn TMTQ (Child-Pugh C)',
    chuyenKhoa: 'Tiêu hóa - Gan mật',
    mucDo: 'nguy_kich',
    nhomBenh: 'Tiêu hóa',
    benhId: 'xo_gan',
    tags: ['Xơ gan', 'Cổ trướng', 'Vỡ giãn TMTQ', 'XHTH', 'Child-Pugh C'],
    sel: ['vang_da_vang_mat', 'sao_mach_spider_nevi', 'ban_do_long_tay_palmar_erythema', 'co_truong_bang_bung', 'xuat_huyet_tieu_hoa_non_ra_mau', 'mach_nhanh', 'ha_huyet_ap', 'thieu_mau_hct_giam', 'giam_tieu_cau'],
    vitals: {
      vNhiet: '36.8',
      vMach: '118',
      vHATT: '85',
      vHATTr: '55',
      vTho: '22',
      vSpo2: '96'
    },
    labs: {
      lBC: '9.5',
      lTC: '65',
      lHct: '24',
      lGlu: '6.1',
      lTrop: '10'
    },
    selected: ['vang_da_vang_mat', 'sao_mach_spider_nevi', 'ban_do_long_tay_palmar_erythema', 'co_truong_bang_bung', 'xuat_huyet_tieu_hoa_non_ra_mau', 'mach_nhanh', 'ha_huyet_ap'],
    negated: [],
    epiContext: {
      occupationalRisk: 'Tiền sử nghiện rượu mạn tính 20 năm'
    },
    form: {
      gioiTinh: 'nam',
      tuoi: '56',
      ngheNghiep: 'Tự do',
      lyDo: 'Nôn ra máu đỏ tươi lượng nhiều kèm đi cầu phân đen như bã cà phê, chóng mặt ngất xỉu',
      text: {
        cn: 'Bệnh nhân có tiền sử xơ gan rượu 3 năm. Sáng nay đột ngột nôn ói ộc ra máu đỏ tươi khoảng 500ml kèm máu cục, sau đó đi tiêu phân đen mùi khẳm, chóng mặt hoa mắt và ngất.',
        tt: 'Bệnh nhân da niêm nhợt nhạt, củng mạc mắt vàng sậm. Sao mạch nhiều ở ngực cổ, bàn tay son rõ rệt. Bụng báng căng, tuần hoàn bàng hệ cửa - chủ kiểu đầu sứa. HA 85/55 mmHg, Mạch 118 l/phút.',
        tc: 'Viêm gan rượu + Viêm gan B mạn tính, không tuân thủ điều trị.',
        cls: 'Hct tụt còn 24%, Hb 78 g/L. Tiểu cầu 65 G/L. Albumin máu 22 g/L, Bilirubin toàn phần 68 µmol/L, INR 2.1. Nội soi dạ dày cấp cứu: Giãn vỡ tĩnh mạch thực quản độ III đang chảy máu phun thành dòng.'
      }
    }
  },
  {
    id: 'case_cap_curb65',
    ten: 'Viêm phổi cộng đồng nặng (CAP CURB-65 = 3, SpO2 91%, Đông đặc phổi)',
    chuyenKhoa: 'Hô hấp & Hồi sức cấp cứu',
    mucDo: 'nguy_kich',
    nhomBenh: 'Hô hấp',
    benhId: 'viem_phoi',
    tags: ['CAP', 'CURB-65', 'Viêm phổi nặng', 'Đông đặc phổi', 'Suy hô hấp'],
    sel: ['sot_cao', 'ho_dam_mu', 'kho_tho', 'tho_nhanh_nang', 'ran_no_o_phoi', 'giam_spo2', 'bach_cau_tang_cao', 'mach_nhanh'],
    vitals: {
      vNhiet: '39.2',
      vMach: '112',
      vHATT: '88',
      vHATTr: '58',
      vTho: '32',
      vSpo2: '91'
    },
    labs: {
      lBC: '18.4',
      lTC: '210',
      lHct: '38',
      lGlu: '7.8',
      lTrop: '14'
    },
    selected: ['sot_cao', 'ho_dam_mu', 'kho_tho', 'tho_nhanh_nang', 'ran_no_o_phoi', 'giam_spo2', 'bach_cau_tang_cao'],
    negated: ['co_cung_gay_dau_mang_nao'],
    epiContext: {
      seasonalContext: 'Giao mùa đông xuân, nhiều người xung quanh mắc cúm/viêm đường hô hấp'
    },
    form: {
      gioiTinh: 'nam',
      tuoi: '68',
      ngheNghiep: 'Hưu trí',
      lyDo: 'Sốt cao rét run, ho khạc đờm rỉ sắt, khó thở dữ dội, đau ngực màng phổi phải',
      text: {
        cn: 'Bệnh nhân khởi bệnh 3 ngày trước với sốt rét run 39.5°C, ho khạc đờm đặc màu rỉ sắt, đau nhói ngực bên phải tăng khi hít sâu. 24h qua thở dốc nhanh, kiệt sức.',
        tt: 'Thở co kéo cơ hô hấp phụ, nhịp thở 32 l/phút, SpO2 91% khí phòng. Rì rào phế nang giảm đáy phổi phải, rung thanh tăng, gõ đục và ran nổ khu trú rõ ở vùng đáy phổi phải. Mạch 112, HA 88/58 mmHg.',
        tc: 'Hút thuốc lá 30 gói-năm, tăng huyết áp.',
        cls: 'X-quang ngực thẳng: Hình mờ đông đặc thùy dưới phổi phải có hình ảnh phế quản hơi (air bronchogram). WBC 18.4 G/L (Neutro 88%), CRP 148 mg/L. CURB-65 = 3 điểm (Confusion, Urea, RR 32, BP 88/58, Age 68).'
      }
    }
  },
  {
    id: 'case_anaphylaxis_grade3',
    ten: 'Sốc phản vệ độ III do Ceftriaxone (Tụt HA 70/40, Mày đay, Thở rít thanh quản)',
    chuyenKhoa: 'Hồi sức - Cấp cứu',
    mucDo: 'nguy_kich',
    nhomBenh: 'Truyền nhiễm & Cấp cứu',
    benhId: 'phan_ve',
    tags: ['Phản vệ độ III', 'Sốc phản vệ', 'Adrenaline', 'Cấp cứu STAT'],
    sel: ['may_day_phu_mach_di_ung', 'tho_rit_thanh_quan_stridor', 'ha_huyet_ap', 'tut_huyet_ap', 'mach_rat_nhanh', 'kho_tho', 'giam_spo2'],
    vitals: {
      vNhiet: '37.0',
      vMach: '135',
      vHATT: '70',
      vHATTr: '40',
      vTho: '30',
      vSpo2: '89'
    },
    labs: {
      lBC: '8.2',
      lTC: '230',
      lHct: '41',
      lGlu: '6.2',
      lTrop: '11'
    },
    selected: ['may_day_phu_mach_di_ung', 'tho_rit_thanh_quan_stridor', 'ha_huyet_ap', 'tut_huyet_ap', 'mach_rat_nhanh', 'kho_tho', 'giam_spo2'],
    negated: [],
    epiContext: {
      occupationalRisk: 'Đang tiêm truyền kháng sinh Ceftriaxone tại bệnh viện'
    },
    form: {
      gioiTinh: 'nu',
      tuoi: '34',
      ngheNghiep: 'Giáo viên',
      lyDo: 'Đột ngột ngứa ran lòng bàn tay chân, nổi mẩn đỏ toàn thân, nghẹn thở, tụt huyết áp sau tiêm thuốc 5 phút',
      text: {
        cn: 'Đang tiêm Ceftriaxone tĩnh mạch được 5 phút thì bệnh nhân kêu nóng rát toàn thân, nghẹn ngào vùng cổ họng, tức ngực, khó thở dữ dội và ngất lịm.',
        tt: 'Mày đay nổi rải rác toàn thân kèm phù môi mi mắt. Thở rít thanh quản nghe rõ từ xa (Stridor), co kéo hố trên ức. Mạch 135 l/phút nhanh nhỏ, HA 70/40 mmHg, SpO2 89%.',
        tc: 'Tiền sử dị ứng Amoxicillin cách đây 2 năm.',
        cls: 'Chẩn đoán lâm sàng xác định phản vệ độ III theo Thông tư 51/2017/TT-BYT. Y lệnh khẩn cấp: Tiêm bắp ngay Adrenaline 1:1000 liều 0.5ml vào mặt trước ngoài đùi.'
      }
    }
  },
  {
    id: 'case_meningitis_bacterial',
    ten: 'Viêm màng não mủ do vi khuẩn (Sốt cao, Cổ gượng, Kernig (+), Nôn vọt)',
    chuyenKhoa: 'Thần kinh & Cấp cứu',
    mucDo: 'nguy_kich',
    nhomBenh: 'Thần kinh',
    benhId: 'vmn_vk',
    tags: ['Viêm màng não mủ', 'Dấu màng não', 'Chọc dò dịch não tủy', 'Cấp cứu thần kinh'],
    sel: ['sot_cao', 'dau_dau_du_doi', 'co_cung_gay_dau_mang_nao', 'bach_cau_tang_cao', 'mach_nhanh'],
    vitals: {
      vNhiet: '39.8',
      vMach: '116',
      vHATT: '130',
      vHATTr: '80',
      vTho: '24',
      vSpo2: '97'
    },
    labs: {
      lBC: '21.5',
      lTC: '185',
      lHct: '39',
      lGlu: '6.5',
      lTrop: '9'
    },
    selected: ['sot_cao', 'dau_dau_du_doi', 'co_cung_gay_dau_mang_nao', 'bach_cau_tang_cao', 'mach_nhanh'],
    negated: ['ran_no_o_phoi'],
    epiContext: {
      outbreakAlert: 'Ổ dịch viêm màng não do não mô cầu hoặc phế cầu'
    },
    form: {
      gioiTinh: 'nam',
      tuoi: '29',
      ngheNghiep: 'Kỹ sư',
      lyDo: 'Sốt cao 39.8°C, nhức đầu dữ dội ôm đầu kêu la, nôn vọt nhiều lần, cổ cứng đờ',
      text: {
        cn: 'Bệnh khởi phát 36 giờ trước với sốt cao liên tục kèm rét run, nhức đầu như búa bổ, sợ ánh sáng và tiếng động. Nôn vọt 5 lần không liên quan ăn uống.',
        tt: 'Bệnh nhân li bì, gọi mở mắt chậm. Cổ cứng rõ rệt, Kernig (+), Brudzinski (+). Đồng tử 2 bên đều 2.5mm, phản xạ ánh sáng tốt. Không có dấu liệt thần kinh sọ.',
        tc: 'Viêm xoang sàng mạn tính.',
        cls: 'Chọc dò dịch não tủy (DNT): Áp lực tăng cao, dịch đục như nước vo gạo. Tế bào 3.400/mm³ (Đa nhân trung tính 92%), Protein DNT tăng vọt 3.8 g/L, Glucose DNT 0.8 mmol/L (tỷ số DNT/máu < 0.2). Soi tươi: Song cầu gram dương nghi Phế cầu (S. pneumoniae).'
      }
    }
  },
  {
    id: 'case_dka_diabetic',
    ten: 'Nhiễm toan Ceton do Đái tháo đường (DKA) — Thở Kussmaul, Glucose 26.5 mmol/L',
    chuyenKhoa: 'Nội tiết & Hồi sức',
    mucDo: 'nguy_kich',
    nhomBenh: 'Nội tiết',
    benhId: 'dai_thao_duong',
    tags: ['DKA', 'Toan ceton', 'Thở Kussmaul', 'Glucose cao', 'Insulin'],
    sel: ['tang_duong_huyet_nang_dka', 'tang_duong_huyet', 'tho_nhanh', 'ha_huyet_ap', 'mach_nhanh', 'dau_bung_thuong_vi'],
    vitals: {
      vNhiet: '37.2',
      vMach: '122',
      vHATT: '88',
      vHATTr: '58',
      vTho: '28',
      vSpo2: '96'
    },
    labs: {
      lBC: '14.2',
      lTC: '250',
      lHct: '44',
      lGlu: '26.5',
      lTrop: '10'
    },
    selected: ['tang_duong_huyet_nang_dka', 'tang_duong_huyet', 'tho_nhanh', 'ha_huyet_ap', 'mach_nhanh'],
    negated: [],
    epiContext: {
      occupationalRisk: 'Bệnh nhân tự ý bỏ tiêm Insulin 3 ngày nay do hết thuốc'
    },
    form: {
      gioiTinh: 'nu',
      tuoi: '23',
      ngheNghiep: 'Kế toán',
      lyDo: 'Thở nhanh sâu kiểu Kussmaul, hơi thở mùi táo thối (mùi ceton), nôn ói và lơ mơ',
      text: {
        cn: 'Bệnh nhân mắc ĐTĐ típ 1, bỏ tiêm Insulin 3 ngày. Khởi phát tiểu nhiều, khát nước dữ dội, sau đó đau bụng âm ỉ thượng vị, nôn ói liên tục và lơ mơ dần.',
        tt: 'Dấu mất nước nặng: Môi khô, mắt trũng, dấu véo da mất rất chậm. Thở nhanh sâu kiểu Kussmaul 28 l/phút, hơi thở nồng nặc mùi quả chín thối (ceton). Mạch 122 l/phút, HA 88/58 mmHg.',
        tc: 'Đái tháo đường típ 1 chẩn đoán 5 năm.',
        cls: 'Mao mạch Glucose: 26.5 mmol/L (477 mg/dL). Khí máu động mạch: pH 7.15, HCO3- 9 mmol/L, pCO2 24 mmHg, Anion Gap = 22 mEq/L (Toan chuyển hóa tăng khoảng trống Anion nặng). Ceton niệu (++++), Ceton máu 4.6 mmol/L.'
      }
    }
  },
  {
    id: 'case_varicella_chickenpox',
    ten: 'Thủy đậu bội nhiễm ở trẻ em (Bóng nước nhiều lứa tuổi, nốt mủ, sốt)',
    chuyenKhoa: 'Truyền nhiễm & Nhi khoa',
    mucDo: 'trung_binh',
    nhomBenh: 'Truyền nhiễm',
    benhId: 'thuy_dau',
    tags: ['Thủy đậu', 'Varicella', 'Bóng nước', 'Nhi khoa'],
    sel: ['sot', 'bong_nuoc_thuy_dau', 'cham_xuat_huyet_duoi_da', 'bach_cau_tang'],
    vitals: {
      vNhiet: '38.6',
      vMach: '110',
      vHATT: '100',
      vHATTr: '65',
      vTho: '24',
      vSpo2: '99'
    },
    labs: {
      lBC: '12.8',
      lTC: '210',
      lHct: '36',
      lGlu: '5.2',
      lTrop: '6'
    },
    selected: ['sot', 'bong_nuoc_thuy_dau'],
    negated: ['co_cung_gay_dau_mang_nao'],
    epiContext: {
      endemicArea: 'Trường mầm non có 5 bạn cùng lớp đang nghỉ học vì thủy đậu'
    },
    form: {
      gioiTinh: 'nam',
      tuoi: '8',
      ngheNghiep: 'Học sinh tiểu học',
      lyDo: 'Sốt cao ngày thứ 3, nổi mụn nước toàn thân kèm một số nốt hóa mủ đỏ ngứa',
      text: {
        cn: 'Bé sốt 38.5°C 3 ngày nay, ban đầu nổi các dát sẩn đỏ ở ngực lưng rồi lan nhanh lên mặt và tứ chi. Các nốt sẩn chuyển thành mụn nước trong veo hình giọt sương, sau đó một số nốt vỡ đóng vảy hoặc đục mủ.',
        tt: 'Khám thấy tổn thương da đa hình thái cùng tồn tại: dát đỏ, sẩn, mụn nước trong, bóng nước đục mủ và vảy tiết nâu đen. Rải rác một vài nốt mủ có quầng đỏ xung quanh do gãi (bội nhiễm Tụ cầu). Họng sạch, phổi trong, tim đều.',
        tc: 'Chưa tiêm vắc xin ngừa Thủy đậu (Varicella).',
        cls: 'Bạch cầu máu 12.8 G/L (Neutro 68%). Tiểu cầu bình thường 210 G/L. Test nhanh kháng nguyên VZV (+).'
      }
    }
  },
  {
    id: 'case_leptospira_weil',
    ten: 'Nhiễm Leptospira thể nặng (Hội chứng Weil: Sốt, đau cơ bắp chân, vàng da, suy thận)',
    chuyenKhoa: 'Truyền nhiễm & Hồi sức cấp cứu',
    mucDo: 'nguy_kich',
    nhomBenh: 'Truyền nhiễm',
    benhId: 'leptospira',
    tags: ['Leptospira', 'Hội chứng Weil', 'Đau cơ bắp chân', 'Vàng da suy thận'],
    sel: ['sot_cao', 'dau_co_bap_chan_du_doi', 'vang_da_vang_mat', 'bach_cau_tang_cao', 'mach_nhanh', 'thieu_mau_hct_giam'],
    vitals: {
      vNhiet: '39.4',
      vMach: '115',
      vHATT: '95',
      vHATTr: '60',
      vTho: '22',
      vSpo2: '97'
    },
    labs: {
      lBC: '16.5',
      lTC: '75',
      lHct: '31',
      lGlu: '6.0',
      lTrop: '15'
    },
    selected: ['sot_cao', 'dau_co_bap_chan_du_doi', 'vang_da_vang_mat', 'bach_cau_tang_cao'],
    negated: [],
    epiContext: {
      waterFoodRisk: 'Lội nước lụt ngập úng dọn dẹp chuồng trại gia súc cách 10 ngày'
    },
    form: {
      gioiTinh: 'nam',
      tuoi: '45',
      ngheNghiep: 'Nông dân',
      lyDo: 'Sốt cao rét run, đau cơ bắp chân dữ dội không đi lại được, mắt đỏ xung huyết, vàng da và tiểu ít',
      text: {
        cn: 'Bệnh nhân làm nông nghiệp sau đợt mưa lũ ngập lụt. 5 ngày trước sốt rét run dữ dội, đau nhức khủng khiếp ở hai bắp chân và vùng thắt lưng, chạm nhẹ cũng đau. 2 ngày nay xuất hiện vàng mắt vàng da và tiểu ít sẫm màu.',
        tt: 'Củng mạc mắt viêm xung huyết đỏ rực (Suffusion), vàng da toàn thân. Bóp cơ bắp chân bệnh nhân kêu đau chói giãy nảy (Dấu hiệu kinh điển của Leptospira). Thiểu niệu (nước tiểu 350ml/24h).',
        tc: 'Thường xuyên lội bùn nước chuồng trại có chuột.',
        cls: 'Creatinine máu 320 µmol/L (Tổn thương thận cấp AKI), Bilirubin toàn phần 115 µmol/L, AST 180 U/L, ALT 125 U/L. Tiểu cầu 75 G/L. X-quang phổi: Thâm nhiễm phế nang rải rác nghi xuất huyết phổi vi thể.'
      }
    }
  },
  {
    id: 'case_stemi_cardiac',
    ten: 'Nhồi máu cơ tim cấp ST chênh lên (STEMI thành trước) — Đau thắt ngực bóp nghẹt',
    chuyenKhoa: 'Tim mạch can thiệp & Cấp cứu',
    mucDo: 'nguy_kich',
    nhomBenh: 'Tim mạch',
    benhId: 'hoi_chung_vanh_cap',
    tags: ['STEMI', 'Nhồi máu cơ tim', 'Troponin', 'Can thiệp mạch vành PCI'],
    sel: ['dau_that_nguc', 'troponin_tang_cao', 'mach_nhanh', 'tang_huyet_ap', 'kho_tho'],
    vitals: {
      vNhiet: '36.8',
      vMach: '105',
      vHATT: '155',
      vHATTr: '95',
      vTho: '22',
      vSpo2: '96'
    },
    labs: {
      lBC: '11.0',
      lTC: '240',
      lHct: '42',
      lGlu: '8.5',
      lTrop: '850'
    },
    selected: ['dau_that_nguc', 'troponin_tang_cao', 'mach_nhanh'],
    negated: [],
    epiContext: {
      occupationalRisk: 'Căng thẳng stress kéo dài, tiền sử hút thuốc lá nặng'
    },
    form: {
      gioiTinh: 'nam',
      tuoi: '58',
      ngheNghiep: 'Tài xế xe tải',
      lyDo: 'Cơn đau thắt ngực dữ dội kiểu đè nặng sau xương ức lan lên cằm và tay trái kéo dài 45 phút không đỡ',
      text: {
        cn: 'Đang lái xe thì đột ngột xuất hiện cơn đau như có tảng đá đè nghẹt giữa ngực, vã mồ hôi ướt đẫm áo, khó thở, lo sợ sắp chết.',
        tt: 'Bệnh nhân hốt hoảng, vã mồ hôi lạnh. HA 155/95 mmHg, Mạch 105 l/phút. Tim đều, T1 T2 rõ, không âm thổi bệnh lý. Phổi không ran.',
        tc: 'Hút thuốc lá 20 năm, tăng huyết áp không điều trị đều.',
        cls: 'ECG 12 chuyển đạo: ST chênh lên dạng vòm > 3mm ở V1-V4 kèm sóng Q hoại tử thành trước. Troponin I tăng vọt 850 ng/L. Chỉ định: Chuyển phòng Catheter can thiệp mạch vành (PCI) tiên phát khẩn cấp.'
      }
    }
  }
];

fs.writeFileSync('./src/data/sample-clinical-cases.json', JSON.stringify(SAMPLE_CASES, null, 2), 'utf8');
console.log(`Generated sample-clinical-cases.json with ${SAMPLE_CASES.length} high-fidelity cases.`);
