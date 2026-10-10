import { MdrTargetedPathway } from '../types';

/**
 * Targeted MDR Antimicrobial Pathways (Phác đồ Trúng Đích Vi Khuẩn Đa Kháng)
 * Source: BV Bệnh Nhiệt Đới - Hướng dẫn sử dụng kháng sinh 2026 (File 3, P.14-21)
 */
export const MDR_PATHWAYS: Record<string, MdrTargetedPathway> = {
  cre: {
    category: 'cre',
    titleVi: 'Trực khuẩn Gram âm đường ruột đề kháng Carbapenem (CRE)',
    titleEn: 'Carbapenem-Resistant Enterobacterales (CRE)',
    definitionVi: 'Enterobacterales (E. coli, K. pneumoniae, Enterobacter...) đề kháng ít nhất 1 loại Carbapenem (Ertapenem, Meropenem, Imipenem) hoặc mang gen sinh enzyme Carbapenemase.',
    firstLineDrugs: [
      {
        drugId: 'ceftazidim_avibactam',
        nameVi: 'Ceftazidime/Avibactam (CAZ-AVI)',
        nameEn: 'Ceftazidime/Avibactam',
        standardDoseVi: '2.5g IV mỗi 8 giờ truyền kéo dài 3 giờ',
        hasDosingCalculator: true,
        infusionNoteVi: 'Pha với NaCl 0.9%, truyền kéo dài 3 giờ để tối ưu hóa T>MIC.'
      },
      {
        nameVi: 'Meropenem/Vaborbactam',
        nameEn: 'Meropenem/Vaborbactam',
        standardDoseVi: '4g (2g/2g) IV mỗi 8 giờ truyền 3 giờ',
        hasDosingCalculator: false,
        infusionNoteVi: 'Rất hiệu quả cho chủng sinh men KPC (không tác dụng trên OXA-48 hoặc MBL).'
      },
      {
        nameVi: 'Cefiderocol',
        nameEn: 'Cefiderocol',
        standardDoseVi: '2g IV mỗi 8 giờ truyền 3 giờ',
        hasDosingCalculator: false,
        infusionNoteVi: 'Kháng sinh Siderophore hiệu quả trên cả KPC, OXA-48 và MBL (NDM).'
      }
    ],
    combinationRegimens: [
      [
        {
          drugId: 'ceftazidim_avibactam',
          nameVi: 'Ceftazidime/Avibactam (2.5g q8h)',
          nameEn: 'Ceftazidime/Avibactam',
          hasDosingCalculator: true
        },
        {
          drugId: 'aztreonam',
          nameVi: 'Aztreonam (2g q8h)',
          nameEn: 'Aztreonam',
          hasDosingCalculator: true,
          infusionNoteVi: 'BẮT BUỘC TRUYỀN ĐỒNG THỜI QUA Y-SITE: Mỗi thuốc hoàn nguyên riêng, truyền đồng thời kéo dài 3 giờ. Chỉ định tối thượng cho chủng sinh men Metallo-beta-lactamase (MBL/NDM).'
        }
      ]
    ],
    alternativeDrugs: [
      {
        drugId: 'tigecyclin',
        nameVi: 'Tigecycline liều cao',
        nameEn: 'High-dose Tigecycline',
        standardDoseVi: 'Liều nạp 200mg, sau đó duy trì 100mg IV mỗi 12 giờ',
        hasDosingCalculator: true,
        infusionNoteVi: 'Chỉ định cho nhiễm trùng ổ bụng/da mô mềm (KHÔNG dùng cho nhiễm trùng huyết đơn độc hoặc nhiễm trùng tiểu do nồng độ thấp).'
      },
      {
        drugId: 'colistin',
        nameVi: 'Colistin (CMS)',
        nameEn: 'Colistin (CMS)',
        standardDoseVi: 'Liều nạp 300mg CBA (9M UI), duy trì 150-180mg CBA q12h',
        hasDosingCalculator: true,
        infusionNoteVi: 'Lựa chọn cuối cùng do nguy cơ độc tính cao trên thận.'
      }
    ],
    clinicalNotesVi: [
      'Nhiễm trùng tiểu dưới không phức tạp: ưu tiên Nitrofurantoin, Fosfomycin uống, TMP-SMX hoặc Aminoglycoside trước khi dùng thuốc dự trữ.',
      'Nếu chỉ kháng Ertapenem mà còn nhạy Meropenem/Imipenem: dùng Meropenem liều cao (2g q8h) hoặc Imipenem (1g q8h) truyền kéo dài ≥ 3 - 4 giờ.',
      'Phân tầng theo kiểu gen kháng thuốc:',
      '  • KPC: CAZ-AVI, Meropenem-vaborbactam, Imipenem-relebactam, Cefiderocol, Tigecycline.',
      '  • OXA-48: CAZ-AVI, Cefiderocol, Tigecycline (MEM-VAB & IMP-REL KHÔNG có tác dụng).',
      '  • MBL (NDM, VIM, IMP): CAZ-AVI + Aztreonam truyền qua Y-site HOẶC Cefiderocol.'
    ],
    source: { doc: 'BVBND_HDSDKS', page: 14 }
  },

  dtr_pseudo: {
    category: 'dtr_pseudo',
    titleVi: 'Pseudomonas aeruginosa kháng thuốc khó trị (DTR - P. aeruginosa)',
    titleEn: 'Difficult-to-Treat Resistant Pseudomonas aeruginosa (DTR-PA)',
    definitionVi: 'P. aeruginosa không nhạy cảm với tất cả các kháng sinh: Piperacillin-tazobactam, Ceftazidime, Cefepime, Aztreonam, Meropenem, Imipenem-cilastatin, Ciprofloxacin và Levofloxacin (theo IDSA 2024).',
    firstLineDrugs: [
      {
        drugId: 'ceftolozan_tazo',
        nameVi: 'Ceftolozane/Tazobactam (TOL-TAZ) - Ưu tiên hàng đầu',
        nameEn: 'Ceftolozane/Tazobactam',
        standardDoseVi: '1.5g - 3g IV mỗi 8 giờ truyền kéo dài',
        hasDosingCalculator: true
      },
      {
        drugId: 'ceftazidim_avibactam',
        nameVi: 'Ceftazidime/Avibactam (CAZ-AVI)',
        nameEn: 'Ceftazidime/Avibactam',
        standardDoseVi: '2.5g IV mỗi 8 giờ truyền kéo dài 3 giờ',
        hasDosingCalculator: true
      }
    ],
    combinationRegimens: [
      [
        {
          drugId: 'ceftolozan_tazo',
          nameVi: 'Ceftolozane/Tazobactam hoặc CAZ-AVI',
          nameEn: 'Ceftolozane/Tazobactam or CAZ-AVI',
          hasDosingCalculator: true
        },
        {
          drugId: 'tobramycin',
          nameVi: 'Tobramycin hoặc Amikacin',
          nameEn: 'Tobramycin or Amikacin',
          hasDosingCalculator: true,
          infusionNoteVi: 'Chỉ phối hợp thêm Aminoglycoside khi có Nhiễm khuẩn huyết nặng / Sốc nhiễm khuẩn hoặc Giảm bạch cầu hạt.'
        }
      ]
    ],
    alternativeDrugs: [
      {
        nameVi: 'Cefiderocol',
        nameEn: 'Cefiderocol',
        standardDoseVi: '2g IV mỗi 8 giờ truyền 3 giờ',
        hasDosingCalculator: false
      },
      {
        nameVi: 'Imipenem/Cilastatin/Relebactam',
        nameEn: 'Imipenem/Cilastatin/Relebactam',
        standardDoseVi: '1.25g IV mỗi 6 giờ truyền 30 phút',
        hasDosingCalculator: false
      },
      {
        drugId: 'colistin',
        nameVi: 'Colistin / Polymyxin B',
        nameEn: 'Colistin / Polymyxin B',
        standardDoseVi: 'Lựa chọn cứu cánh cuối cùng nếu đề kháng các nhóm trên',
        hasDosingCalculator: true
      }
    ],
    clinicalNotesVi: [
      'Ưu tiên dùng đơn trị liệu (Ceftolozane-tazobactam hoặc CAZ-AVI). Việc phối hợp thường quy không còn được khuyến cáo do làm tăng phản ứng có hại.',
      'Nếu đã dùng 1 trong 2 loại (Ceftolozane-tazo hoặc CAZ-AVI) mà không đáp ứng thì không nên chuyển sang loại còn lại.',
      'Kháng sinh đường khí dung trong nhiễm khuẩn hô hấp do DTR-P. aeruginosa không được khuyến cáo thường quy do còn thiếu dữ liệu lâm sàng.'
    ],
    source: { doc: 'BVBND_HDSDKS', page: 16 }
  },

  crab: {
    category: 'crab',
    titleVi: 'Acinetobacter baumannii đa kháng (CRAB)',
    titleEn: 'Carbapenem-Resistant Acinetobacter baumannii (CRAB)',
    definitionVi: 'A. baumannii không nhạy cảm với ít nhất 1 kháng sinh trong một nhóm và trên 3 nhóm kháng sinh khác nhau (Beta-lactam/BLI, Carbapenem, FQ, Aminoglycoside, TMP-SMX).',
    firstLineDrugs: [
      {
        nameVi: 'Sulbactam/Durlobactam (SUL-DUR) - Ưu tiên mới nhất',
        nameEn: 'Sulbactam/Durlobactam',
        standardDoseVi: '2g (1g sulbactam/1g durlobactam) IV mỗi 6 giờ truyền 3 giờ',
        hasDosingCalculator: false,
        infusionNoteVi: 'Kết hợp cùng Meropenem hoặc Imipenem.'
      },
      {
        drugId: 'ampicillin_sulbactam',
        nameVi: 'Ampicillin/Sulbactam liều cao',
        nameEn: 'High-dose Ampicillin/Sulbactam',
        standardDoseVi: '27g/ngày (Ampicillin 18g + Sulbactam 9g) chia truyền tĩnh mạch',
        hasDosingCalculator: true,
        infusionNoteVi: 'Sulbactam có hoạt tính diệt A. baumannii qua gắn PBP1 và PBP3.'
      }
    ],
    combinationRegimens: [
      [
        {
          nameVi: 'Sulbactam/Durlobactam (2g q6h)',
          nameEn: 'Sulbactam/Durlobactam',
          hasDosingCalculator: false
        },
        {
          drugId: 'meropenem',
          nameVi: 'Meropenem (1g q8h)',
          nameEn: 'Meropenem',
          hasDosingCalculator: true
        }
      ],
      [
        {
          drugId: 'ampicillin_sulbactam',
          nameVi: 'Ampicillin/Sulbactam liều cao (27g/ngày)',
          nameEn: 'High-dose Amp/Sulbactam',
          hasDosingCalculator: true
        },
        {
          nameVi: 'Polymyxin B (hoặc Colistin)',
          nameEn: 'Polymyxin B or Colistin',
          standardDoseVi: 'Polymyxin B liều nạp 2 - 2.5 mg/kg, sau đó 1.25 - 1.5 mg/kg q12h',
          hasDosingCalculator: false
        },
        {
          nameVi: 'Minocycline (hoặc Tigecycline)',
          nameEn: 'Minocycline or Tigecycline',
          standardDoseVi: 'Minocycline 200mg IV/PO q12h; Tigecycline nạp 200mg, duy trì 100mg q12h',
          hasDosingCalculator: false
        }
      ]
    ],
    alternativeDrugs: [
      {
        nameVi: 'Cefiderocol',
        nameEn: 'Cefiderocol',
        standardDoseVi: '2g IV mỗi 8 giờ truyền 3 giờ',
        hasDosingCalculator: false
      },
      {
        drugId: 'amikacin',
        nameVi: 'Amikacin',
        nameEn: 'Amikacin',
        standardDoseVi: '15 - 20 mg/kg IV mỗi 24 giờ',
        hasDosingCalculator: true
      }
    ],
    contraindicationsVi: [
      'CẢNH BÁO QUAN TRỌNG: Colistin phối hợp Meropenem liều cao truyền kéo dài > 3 giờ KHÔNG CÓ HIỆU QUẢ trên CRAB (đã có bằng chứng nghiên cứu lâm sàng BVBND).',
      'Nếu nhiễm khuẩn tiết niệu: không dùng Polymyxin B, Minocycline và Tigecycline đơn trị liệu do không đạt nồng độ trong nước tiểu.'
    ],
    clinicalNotesVi: [
      'Nhiễm trùng nhẹ: có thể đơn trị các thuốc còn nhạy cảm, ưu tiên Ampicillin-sulbactam hoặc Cefoperazone-sulbactam liều cao.',
      'Nhiễm trùng trung bình - nặng: bắt buộc phối hợp 2 - 3 kháng sinh.',
      'Viêm phổi nặng: cân nhắc phối hợp Colistin khí dung (75-150mg CBA q12h), lưu ý nguy cơ co thắt phế quản.'
    ],
    source: { doc: 'BVBND_HDSDKS', page: 18 }
  },

  s_maltophilia: {
    category: 's_maltophilia',
    titleVi: 'Stenotrophomonas maltophilia',
    titleEn: 'Stenotrophomonas maltophilia Infection',
    definitionVi: 'Trực khuẩn Gram âm không lên men đường, có đề kháng tự nhiên với hầu hết các Beta-lactam (do men L1 metallo-beta-lactamase và L2 cephalosporinase) và Carbapenem.',
    firstLineDrugs: [
      {
        drugId: 'tmp_smx',
        nameVi: 'Co-trimoxazole (TMP-SMX) - Thuốc đầu tay số 1',
        nameEn: 'Co-trimoxazole (TMP-SMX)',
        standardDoseVi: '15 mg/kg/ngày (tính theo TMP) chia 3 - 4 lần IV hoặc PO',
        hasDosingCalculator: true
      },
      {
        nameVi: 'Minocycline',
        nameEn: 'Minocycline',
        standardDoseVi: '200 mg IV hoặc PO mỗi 12 giờ',
        hasDosingCalculator: false
      },
      {
        drugId: 'levofloxacin',
        nameVi: 'Levofloxacin',
        nameEn: 'Levofloxacin',
        standardDoseVi: '750 mg IV hoặc PO mỗi 24 giờ',
        hasDosingCalculator: true
      }
    ],
    combinationRegimens: [
      [
        {
          drugId: 'tmp_smx',
          nameVi: 'Co-trimoxazole (TMP-SMX)',
          nameEn: 'Co-trimoxazole',
          hasDosingCalculator: true
        },
        {
          nameVi: 'Minocycline hoặc Levofloxacin hoặc Cefiderocol',
          nameEn: 'Minocycline or Levofloxacin or Cefiderocol',
          hasDosingCalculator: false
        }
      ],
      [
        {
          drugId: 'ceftazidim_avibactam',
          nameVi: 'Ceftazidime/Avibactam',
          nameEn: 'Ceftazidime/Avibactam',
          hasDosingCalculator: true
        },
        {
          drugId: 'aztreonam',
          nameVi: 'Aztreonam',
          nameEn: 'Aztreonam',
          hasDosingCalculator: true,
          infusionNoteVi: 'Phối hợp cứu cánh khi đề kháng toàn bộ các thuốc trên.'
        }
      ]
    ],
    alternativeDrugs: [
      {
        drugId: 'tigecyclin',
        nameVi: 'Tigecycline',
        nameEn: 'Tigecycline',
        standardDoseVi: 'Nạp 200mg, sau đó 100mg IV mỗi 12 giờ',
        hasDosingCalculator: true
      },
      {
        nameVi: 'Cefiderocol',
        nameEn: 'Cefiderocol',
        standardDoseVi: '2g IV mỗi 8 giờ truyền 3 giờ',
        hasDosingCalculator: false
      }
    ],
    contraindicationsVi: [
      'CHỐNG CHỈ ĐỊNH: Tuyệt đối KHÔNG dùng Ceftazidime đơn độc để điều trị S. maltophilia vì vi khuẩn có cơ chế đề kháng tự nhiên sinh enzym L1 và L2 phân hủy ceftazidime.'
    ],
    clinicalNotesVi: [
      'Nhiễm trùng nhẹ trên người miễn dịch bình thường: chọn đơn trị liệu TMP-SMX hoặc Minocycline hoặc Levofloxacin.',
      'Nhiễm trùng trung bình - nặng hoặc suy giảm miễn dịch: bắt buộc đa trị liệu phối hợp 2 thuốc.'
    ],
    source: { doc: 'BVBND_HDSDKS', page: 21 }
  }
};
