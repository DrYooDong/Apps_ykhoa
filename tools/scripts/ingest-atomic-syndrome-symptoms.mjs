#!/usr/bin/env node
/**
 * 🩺 Ingest & Standardize 37 Atomic Syndrome Symptoms
 * Tự động đồng bộ các triệu chứng nguyên tử chuẩn y khoa vào 12 tệp hệ cơ quan (src/content/docspace/data/symptoms/)
 * để giải quyết triệt để 50 vi phạm khóa ngoại liên kết giữa Kho Hội chứng (Syndromes) và Bước 3 (CDSS).
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SYMPTOMS_DIR = path.resolve(__dirname, '../../src/content/docspace/data/symptoms');

const ATOMIC_SYMPTOMS_MAP = {
  'toan-than.json': [
    {
      id: 'sot',
      ten: 'Sốt (Thân nhiệt ≥ 38.0°C)',
      nhom: 'Toàn thân',
      loai: ['cn', 'tt'],
      tuKhoa: ['sốt', 'nhiệt độ tăng', 'nóng sốt', 'thân nhiệt cao', 'fever', 'pyrexia'],
      aliases: ['sốt nhẹ đến vừa', 'nóng mình', 'thân nhiệt >= 38 độ'],
      map: { fld: 'vNhiet', op: '>=', val: 38.0 }
    },
    {
      id: 'sot_cao',
      ten: 'Sốt cao (Thân nhiệt ≥ 39.0°C)',
      nhom: 'Toàn thân',
      loai: ['cn', 'tt'],
      tuKhoa: ['sốt cao', 'sốt dữ dội', 'thân nhiệt >= 39', 'high fever'],
      aliases: ['sốt cao liên tục', 'sốt 39-40 độ', 'sốt khó hạ'],
      map: { fld: 'vNhiet', op: '>=', val: 39.0 }
    },
    {
      id: 'sot_cao_ret_run',
      ten: 'Sốt cao rét run',
      nhom: 'Toàn thân',
      loai: ['cn', 'tt'],
      tuKhoa: ['sốt rét run', 'rét run', 'ớn lạnh', 'chills', 'rigors'],
      aliases: ['sốt run cầm cập', 'lên cơn rét run'],
      map: null
    },
    {
      id: 'sot_nhe_giai_doan_khoi_phat',
      ten: 'Sốt nhẹ khởi phát (Thân nhiệt 37.5 - 38.0°C)',
      nhom: 'Toàn thân',
      loai: ['cn', 'tt'],
      tuKhoa: ['sốt nhẹ', 'hâm hấp sốt', 'low grade fever'],
      aliases: ['sốt âm ỉ', 'người âm ấm'],
      map: { fld: 'vNhiet', op: '>=', val: 37.5 }
    }
  ],
  'tim-mach.json': [
    {
      id: 'mach_nhanh',
      ten: 'Mạch nhanh (Nhịp tim > 90 lần/phút)',
      nhom: 'Tim mạch',
      loai: ['tt'],
      tuKhoa: ['mạch nhanh', 'nhịp tim nhanh', 'tachycardia'],
      aliases: ['tim đập nhanh', 'mạch quay nhanh'],
      map: { fld: 'vMach', op: '>', val: 90 }
    },
    {
      id: 'mach_rat_nhanh',
      ten: 'Mạch rất nhanh (Nhịp tim > 120 lần/phút)',
      nhom: 'Tim mạch',
      loai: ['tt'],
      tuKhoa: ['mạch rất nhanh', 'nhịp tim rất nhanh', 'severe tachycardia'],
      aliases: ['mạch nhanh nhỏ', 'nhịp tim dồn dập'],
      map: { fld: 'vMach', op: '>', val: 120 }
    },
    {
      id: 'tut_huyet_ap',
      ten: 'Tụt huyết áp (HATT < 90 mmHg)',
      nhom: 'Tim mạch',
      loai: ['tt'],
      tuKhoa: ['tụt huyết áp', 'huyết áp tụt', 'hypotension'],
      aliases: ['ha tụt', 'huyết áp thấp cấp tính'],
      map: { fld: 'vHATT', op: '<', val: 90 }
    },
    {
      id: 'ha_huyet_ap',
      ten: 'Hạ huyết áp (HATT ≤ 100 mmHg)',
      nhom: 'Tim mạch',
      loai: ['tt'],
      tuKhoa: ['hạ huyết áp', 'huyết áp giảm', 'low blood pressure'],
      aliases: ['huyết áp thấp', 'hatt <= 100'],
      map: { fld: 'vHATT', op: '<=', val: 100 }
    },
    {
      id: 'huyet_ap_kep',
      ten: 'Huyết áp kẹp (Hiệu áp ≤ 20 mmHg)',
      nhom: 'Tim mạch',
      loai: ['tt'],
      tuKhoa: ['huyết áp kẹp', 'ha kẹp', 'narrow pulse pressure'],
      aliases: ['hiệu áp kẹp', 'khoảng cách ha <= 20'],
      map: null
    }
  ],
  'ho-hap.json': [
    {
      id: 'tho_nhanh',
      ten: 'Thở nhanh (Nhịp thở > 20 lần/phút)',
      nhom: 'Hô hấp',
      loai: ['tt'],
      tuKhoa: ['thở nhanh', 'nhịp thở tăng', 'tachypnea'],
      aliases: ['thở gấp', 'nhịp thở nhanh'],
      map: { fld: 'vTho', op: '>', val: 20 }
    },
    {
      id: 'tho_nhanh_nang',
      ten: 'Thở rất nhanh (Nhịp thở ≥ 30 lần/phút)',
      nhom: 'Hô hấp',
      loai: ['tt'],
      tuKhoa: ['thở rất nhanh', 'thở co kéo', 'severe tachypnea'],
      aliases: ['thở hổn hển', 'thở dốc'],
      map: { fld: 'vTho', op: '>=', val: 30 }
    },
    {
      id: 'tho_cham',
      ten: 'Thở chậm (Nhịp thở < 10 lần/phút)',
      nhom: 'Hô hấp',
      loai: ['tt'],
      tuKhoa: ['thở chậm', 'ức chế hô hấp', 'bradypnea'],
      aliases: ['nhịp thở yếu', 'thở ngáp'],
      map: { fld: 'vTho', op: '<', val: 10 }
    },
    {
      id: 'kho_tho_khi_nam',
      ten: 'Khó thở khi nằm đầu bằng (Orthopnea)',
      nhom: 'Hô hấp',
      loai: ['cn', 'tt'],
      tuKhoa: ['khó thở khi nằm', 'orthopnea', 'phải ngồi thở'],
      aliases: ['ngồi dậy mới thở được', 'khó thở kịch phát về đêm'],
      map: null
    },
    {
      id: 'ran_o_phoi',
      ten: 'Ran ẩm hoặc ran nổ ở phổi',
      nhom: 'Hô hấp',
      loai: ['tt'],
      tuKhoa: ['ran phổi', 'ran ẩm', 'ran nổ', 'crackles', 'rales'],
      aliases: ['nghe phổi có ran', 'ran ứ đọng'],
      map: null
    },
    {
      id: 'giam_spo2',
      ten: 'Giảm SpO₂ máu (< 95%)',
      nhom: 'Hô hấp',
      loai: ['tt'],
      tuKhoa: ['giảm spo2', 'tụt oxy máu', 'hypoxemia'],
      aliases: ['độ bão hòa oxy giảm', 'spo2 dưới 95'],
      map: { fld: 'vSpo2', op: '<', val: 95 }
    },
    {
      id: 'suy_ho_hap_spo2_thap',
      ten: 'Suy hô hấp cấp (SpO₂ < 90%)',
      nhom: 'Hô hấp',
      loai: ['tt'],
      tuKhoa: ['suy hô hấp', 'spo2 tụt sâu', 'severe hypoxemia'],
      aliases: ['suy hô hấp cấp tính', 'tím tái do thiếu oxy'],
      map: { fld: 'vSpo2', op: '<', val: 90 }
    }
  ],
  'da-niem.json': [
    {
      id: 'xuat_huyet_da_niem',
      ten: 'Xuất huyết da niêm mạc',
      nhom: 'Da niêm',
      loai: ['tt'],
      tuKhoa: ['xuất huyết da niêm', 'chảy máu dưới da', 'purpura', 'ecchymosis'],
      aliases: ['chảy máu chân răng mũi', 'xuất huyết niêm mạc'],
      map: null
    },
    {
      id: 'cham_xuat_huyet_duoi_da',
      ten: 'Chấm xuất huyết rải rác dưới da (Petechiae)',
      nhom: 'Da niêm',
      loai: ['tt'],
      tuKhoa: ['chấm xuất huyết', 'petechiae', 'nốt xuất huyết'],
      aliases: ['chấm đỏ không mất khi căng da', 'chấm xuất huyết cẳng tay cẳng chân'],
      map: null
    },
    {
      id: 'ban_do_long_tay_palmar_erythema',
      ten: 'Lòng bàn tay son (Palmar erythema)',
      nhom: 'Da niêm',
      loai: ['tt'],
      tuKhoa: ['lòng bàn tay son', 'palmar erythema', 'ban đỏ lòng bàn tay'],
      aliases: ['gan bàn tay đỏ', 'bàn tay son xơ gan'],
      map: null
    }
  ],
  'can-lam-sang.json': [
    {
      id: 'co_dac_mau_hct',
      ten: 'Cô đặc máu (Hematocrit tăng cao)',
      nhom: 'Cận lâm sàng',
      loai: ['cls'],
      tuKhoa: ['cô đặc máu', 'hct tăng', 'hemoconcentration'],
      aliases: ['hematocrit tăng cao', 'hct dốc đứng'],
      map: { fld: 'lHct', op: '>=', val: 42 }
    },
    {
      id: 'giam_tieu_cau',
      ten: 'Giảm tiểu cầu (PLT < 150 G/L)',
      nhom: 'Cận lâm sàng',
      loai: ['cls'],
      tuKhoa: ['giảm tiểu cầu', 'plt giảm', 'thrombocytopenia'],
      aliases: ['tiểu cầu thấp', 'hạ tiểu cầu'],
      map: { fld: 'lTC', op: '<', val: 150 }
    },
    {
      id: 'tieu_cau_giam_nang',
      ten: 'Giảm tiểu cầu nặng (PLT < 50 G/L)',
      nhom: 'Cận lâm sàng',
      loai: ['cls'],
      tuKhoa: ['tiểu cầu giảm nặng', 'plt < 50', 'severe thrombocytopenia'],
      aliases: ['tiểu cầu tụt sâu', 'tiểu cầu dưới 50'],
      map: { fld: 'lTC', op: '<', val: 50 }
    },
    {
      id: 'tieu_cau_giam_nguy_kich',
      ten: 'Tiểu cầu giảm nguy kịch (PLT < 20 G/L)',
      nhom: 'Cận lâm sàng',
      loai: ['cls'],
      tuKhoa: ['tiểu cầu nguy kịch', 'plt < 20', 'critical thrombocytopenia'],
      aliases: ['nguy cơ xuất huyết tự nhiên', 'tiểu cầu dưới 20'],
      map: { fld: 'lTC', op: '<', val: 20 }
    },
    {
      id: 'giam_tieu_cau_do_trach_gan',
      ten: 'Giảm tiểu cầu do cường lách hoặc bệnh gan',
      nhom: 'Cận lâm sàng',
      loai: ['cls'],
      tuKhoa: ['cường lách', 'giảm tiểu cầu xơ gan', 'hypersplenism'],
      aliases: ['giảm tiểu cầu lách to', 'hạ tiểu cầu do gan'],
      map: null
    },
    {
      id: 'bach_cau_tang',
      ten: 'Bạch cầu máu tăng (WBC > 10 G/L)',
      nhom: 'Cận lâm sàng',
      loai: ['cls'],
      tuKhoa: ['bạch cầu tăng', 'wbc tăng', 'leukocytosis'],
      aliases: ['bạch cầu cao', 'bạch cầu máu tăng'],
      map: { fld: 'lBC', op: '>', val: 10 }
    },
    {
      id: 'bach_cau_tang_cao',
      ten: 'Bạch cầu máu tăng cao (WBC > 15 G/L)',
      nhom: 'Cận lâm sàng',
      loai: ['cls'],
      tuKhoa: ['bạch cầu rất cao', 'wbc > 15', 'severe leukocytosis'],
      aliases: ['bạch cầu tăng vọt', 'phản ứng giả bạch cầu'],
      map: { fld: 'lBC', op: '>', val: 15 }
    },
    {
      id: 'inr_keo_dai_tren_1_5',
      ten: 'INR kéo dài > 1.5',
      nhom: 'Cận lâm sàng',
      loai: ['cls'],
      tuKhoa: ['inr tăng', 'inr > 1.5', 'rối loạn đông máu'],
      aliases: ['tỷ lệ prothrombin giảm', 'inr kéo dài'],
      map: null
    },
    {
      id: 'tang_bilirubin_mau',
      ten: 'Bilirubin toàn phần máu tăng cao',
      nhom: 'Cận lâm sàng',
      loai: ['cls'],
      tuKhoa: ['tăng bilirubin', 'hyperbilirubinemia', 'bilirubin máu cao'],
      aliases: ['sắc tố mật tăng', 'ứ mật huyết thanh'],
      map: null
    }
  ],
  'tieu-hoa.json': [
    {
      id: 'co_truong_dich_do_o_bung',
      ten: 'Cổ trướng hoặc tràn dịch tự do màng bụng',
      nhom: 'Tiêu hóa',
      loai: ['tt', 'cls'],
      tuKhoa: ['cổ trướng', 'báng bụng', 'dịch ổ bụng', 'ascites'],
      aliases: ['bụng to bè bè', 'dịch màng bụng tự do'],
      map: null
    },
    {
      id: 'gan_to_duoi_bo_suon',
      ten: 'Gan to dưới bờ sườn',
      nhom: 'Tiêu hóa',
      loai: ['tt'],
      tuKhoa: ['gan to', 'hepatomegaly', 'bờ gan dưới bờ sườn'],
      aliases: ['sờ thấy gan', 'gan phì đại'],
      map: null
    },
    {
      id: 'phan_bac_mau',
      ten: 'Phân bạc màu (Phân màu đất sét / Cò cò)',
      nhom: 'Tiêu hóa',
      loai: ['cn'],
      tuKhoa: ['phân bạc màu', 'clay colored stool', 'acholic stool'],
      aliases: ['phân trắng bệch', 'phân màu đất sét'],
      map: null
    },
    {
      id: 'dau_hieu_canh_bao_dau_bung_gan_non_oi',
      ten: 'Đau bụng hạ sườn phải liên tục và nôn ói nhiều',
      nhom: 'Tiêu hóa',
      loai: ['cn'],
      tuKhoa: ['đau bụng gan', 'đau hạ sườn phải', 'nôn ói nhiều'],
      aliases: ['đau tức vùng gan nôn ói', 'dấu hiệu cảnh báo đau bụng'],
      map: null
    }
  ],
  'than-kinh.json': [
    {
      id: 'cung_gay',
      ten: 'Cứng gáy hoặc cổ gượng (Nuchal rigidity)',
      nhom: 'Thần kinh',
      loai: ['tt'],
      tuKhoa: ['cứng gáy', 'cổ gượng', 'nuchal rigidity'],
      aliases: ['kháng cự gấp cổ', 'dấu cứng gáy'],
      map: null
    },
    {
      id: 'co_cung_gay_dau_mang_nao',
      ten: 'Dấu cứng gáy màng não (+)',
      nhom: 'Thần kinh',
      loai: ['tt'],
      tuKhoa: ['cứng gáy màng não', 'dấu màng não dương tính'],
      aliases: ['cổ cứng đau', 'dấu kích thích màng não'],
      map: null
    },
    {
      id: 'cung_gay_dieu_tri_mang_nao',
      ten: 'Dấu màng não (Cứng gáy, Kernig (+), Brudzinski (+))',
      nhom: 'Thần kinh',
      loai: ['tt'],
      tuKhoa: ['dấu màng não', 'kernig', 'brudzinski', 'meningeal signs'],
      aliases: ['hội chứng màng não', 'tam chứng màng não'],
      map: null
    },
    {
      id: 'photophobia_so_anh_sang',
      ten: 'Sợ ánh sáng và sợ tiếng động (Photophobia)',
      nhom: 'Thần kinh',
      loai: ['cn'],
      tuKhoa: ['sợ ánh sáng', 'photophobia', 'chói mắt'],
      aliases: ['không dám nhìn sáng', 'sợ tiếng động'],
      map: null
    },
    {
      id: 'roi_loan_tri_giac',
      ten: 'Rối loạn tri giác (Lơ mơ, li bì, bứt rứt, GCS < 15)',
      nhom: 'Thần kinh',
      loai: ['tt'],
      tuKhoa: ['rối loạn tri giác', 'lơ mơ', 'li bì', 'gcs < 15', 'altered mental status'],
      aliases: ['tri giác u ám', 'hôn mê', 'ý thức chậm chạp'],
      map: null
    }
  ]
};

let totalAdded = 0;

for (const [fileName, newItems] of Object.entries(ATOMIC_SYMPTOMS_MAP)) {
  const filePath = path.join(SYMPTOMS_DIR, fileName);
  if (!fs.existsSync(filePath)) continue;

  const raw = fs.readFileSync(filePath, 'utf8');
  let currentList = [];
  try {
    currentList = JSON.parse(raw);
  } catch (e) {
    console.error(`Lỗi đọc ${fileName}:`, e.message);
    continue;
  }

  const existingIds = new Set(currentList.map(item => item.id));
  let addedCount = 0;

  for (const item of newItems) {
    if (!existingIds.has(item.id)) {
      currentList.push(item);
      existingIds.add(item.id);
      addedCount++;
      totalAdded++;
    }
  }

  if (addedCount > 0) {
    fs.writeFileSync(filePath, JSON.stringify(currentList, null, 2) + '\n', 'utf8');
    console.log(`✅ [${fileName}]: Đã bổ sung ${addedCount} triệu chứng nguyên tử chuẩn.`);
  } else {
    console.log(`ℹ️ [${fileName}]: Đã đầy đủ, không cần bổ sung.`);
  }
}

console.log(`\n🎉 Hoàn tất tích hợp ${totalAdded} triệu chứng nguyên tử chuẩn y khoa!`);
