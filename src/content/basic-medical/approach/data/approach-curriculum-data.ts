/**
 * CliniPortal — Clinical Approach Curriculum & Master Registry (Tiếp Cận Lâm Sàng)
 * Path: src/content/basic-medical/approach/data/approach-curriculum-data.ts
 *
 * Danh mục 13 Chuyên khoa Tiếp Cận Lâm Sàng (chỉ đăng ký các bài học đã có tệp .mdx thực tế)
 */

import { ApproachSpecialty, ApproachLesson, ApproachUrgency, ApproachLessonStatus } from '../types/approach.types';

interface RawLessonSpec {
  n: number;
  slug: string;
  exactSlug?: string;
  title: string;
  desc: string;
  keyTakeaway: string;
  urgency: ApproachUrgency;
  hasVault: boolean;
  vaultFile?: string;
  tags: string[];
  minutes?: number;
  status?: ApproachLessonStatus;
  redFlags?: string;
  golden?: boolean;
}

function buildLessons(
  specialtyNumber: number,
  specialtyKey: string,
  specialtyTitle: string,
  codePrefix: string,
  specs: RawLessonSpec[],
  startOrder: number
): ApproachLesson[] {
  const ckPad = String(specialtyNumber).padStart(2, '0');
  return specs.map((s, idx) => {
    const numPad = String(s.n).padStart(2, '0');
    const fullSlug = s.exactSlug || `tc-${ckPad}-${numPad}-${s.slug}`;
    return {
      id: `${codePrefix.toLowerCase()}-${numPad}`,
      code: `TC-${codePrefix}-${numPad}`,
      slug: fullSlug,
      title: s.title,
      specialtyNumber,
      specialtyKey,
      specialtyTitle,
      lessonNumber: s.n,
      order: startOrder + idx,
      description: s.desc,
      estimatedMinutes: s.minutes || (s.hasVault ? 20 : 18),
      urgency: s.urgency,
      status: s.status || 'draft',
      hasVaultSource: s.hasVault,
      vaultFile: s.vaultFile,
      tags: s.tags,
      keyTakeaway: s.keyTakeaway,
      redFlagsPreview: s.redFlags,
      isGoldenTemplate: s.golden || false
    };
  });
}

export const APPROACH_SPECIALTIES: ApproachSpecialty[] = [
  // =========================================================================
  // CK01: NGUYÊN LÝ TIẾP CẬN
  // =========================================================================
  {
    id: 'ck01',
    number: 1,
    key: 'ck01-nguyen-ly',
    codePrefix: 'NL',
    title: 'Nguyên Lý Tiếp Cận Lâm Sàng',
    shortTitle: 'Nguyên Lý',
    icon: 'fa-compass',
    color: '#0284c7',
    bgColor: 'rgba(2, 132, 199, 0.12)',
    badge: '0 bài',
    description: 'Phương pháp luận tiếp cận triệu chứng, tư duy xác suất Bayes, loại trừ bệnh nguy hiểm trước và nhận diện sai lệch nhận thức.',
    clinicalObjective: 'Thiết lập khung phản xạ 7–9 bước chuẩn hóa trước mọi triệu chứng cơ năng và thực thể.',
    lessons: []
  },

  // =========================================================================
  // CK02: CẤP CỨU – HỒI SỨC – ĐỘC CHẤT
  // =========================================================================
  {
    id: 'ck02',
    number: 2,
    key: 'ck02-cap-cuu-doc-chat',
    codePrefix: 'CC',
    title: 'Cấp Cứu – Hồi Sức – Độc Chất',
    shortTitle: 'Cấp Cứu',
    icon: 'fa-truck-medical',
    color: '#e11d48',
    bgColor: 'rgba(225, 29, 72, 0.12)',
    badge: '0 bài',
    description: 'Tiếp cận xử trí tối khẩn tại phòng cấp cứu: sốc, phản vệ, ngộ độc cấp và hội chứng cai đe dọa tính mạng.',
    clinicalObjective: 'Nhận diện sớm tình trạng nguy kịch trong 5 phút đầu và can thiệp hồi sức đúng mục tiêu sinh lý.',
    lessons: []
  },

  // =========================================================================
  // CK03: TRUYỀN NHIỄM – SỐT
  // =========================================================================
  {
    id: 'ck03',
    number: 3,
    key: 'ck03-truyen-nhiem-sot',
    codePrefix: 'TN',
    title: 'Truyền Nhiễm – Tiếp Cận Sốt',
    shortTitle: 'Truyền Nhiễm',
    icon: 'fa-virus',
    color: '#0d9488',
    bgColor: 'rgba(13, 148, 136, 0.12)',
    badge: '4 bài MDX',
    description: 'Tiếp cận bệnh nhân sốt tổng quát, sốt kéo dài FUO và chuỗi hội chứng Sốt kèm triệu chứng định vị cơ quan.',
    clinicalObjective: 'Định vị nhanh ổ nhiễm trùng, nhận diện Sepsis sớm và phân biệt tác nhân vi khuẩn, siêu vi, ký sinh trùng.',
    lessons: buildLessons(3, 'ck03-truyen-nhiem-sot', 'Truyền Nhiễm – Tiếp Cận Sốt', 'TN', [
      {
        n: 1,
        slug: 'sot-cap-tinh-nl',
        exactSlug: 'tc-03-sot-cap-tinh-nl',
        title: 'Tiếp Cận Sốt Cấp Tính Ở Người Lớn (Acute Fever in Adults)',
        desc: 'Tiếp cận có hệ thống sốt cấp tính ở người lớn: phân biệt sốt và tăng thân nhiệt, nhận diện Red Flags & qSOFA, khai thác bệnh sử dịch tễ, dấu hiệu mạch nhiệt phân ly, cận lâm sàng theo bậc và xử trí cấp cứu.',
        keyTakeaway: 'Luôn đánh giá huyết động trước: tìm ngay Red Flags, tính qSOFA và loại trừ sốc nhiễm khuẩn; tuyệt đối tránh NSAIDs/Aspirin khi chưa loại trừ sốt xuất huyết Dengue.',
        urgency: 'urgent',
        hasVault: true,
        vaultFile: '01. Toàn thân & Cấp cứu/TC_Sốt_P1.md',
        tags: ['Sốt cấp tính', 'qSOFA', 'Nhiễm khuẩn huyết', 'Sốt xuất huyết Dengue'],
        minutes: 25,
        status: 'published',
        redFlags: 'qSOFA ≥ 2, tụt huyết áp/sốc nhiễm khuẩn, rối loạn tri giác, cổ gượng, tử ban không mất khi ấn kính, thân nhiệt > 40.5°C.'
      },
      {
        n: 2,
        slug: 'sot-keo-dai-nl',
        exactSlug: 'tc-03-sot-keo-dai-nl',
        title: 'Tiếp Cận Sốt Bán Cấp và Sốt Kéo Dài Ở Người Lớn (FUO)',
        desc: 'Định nghĩa sốt bán cấp, sốt kéo dài và FUO (Durack & Street), 4 nhóm căn nguyên chính, chiến lược truy tìm manh mối PDCs, cận lâm sàng theo bậc (CT, TEE, FDG-PET/CT) và nguyên tắc tránh điều trị thử.',
        keyTakeaway: 'Tránh dùng kháng sinh hoặc corticoid theo kinh nghiệm khi bệnh nhân FUO ổn định huyết động; tập trung tìm Manh mối chẩn đoán tiềm năng (PDCs).',
        urgency: 'routine',
        hasVault: true,
        vaultFile: '01. Toàn thân & Cấp cứu/TC_Sốt kéo dài (Sốt chưa rõ nguyên nhân - FUO)_P1.md',
        tags: ['Sốt kéo dài', 'FUO', 'PDCs', 'Lao', 'Tự miễn'],
        minutes: 25,
        status: 'published'
      },
      {
        n: 4,
        slug: 'sot-phat-ban',
        exactSlug: 'tc-03-sot-phat-ban',
        title: 'Tiếp Cận Bệnh Nhân Người Lớn Sốt Kèm Phát Ban (Fever and Rash)',
        desc: 'Tiếp cận cấp cứu sốt kèm phát ban ở người lớn: 5 cơ chế bệnh sinh, 8 Red Flags (não mô cầu, SJS/TEN, viêm cân hoại tử), phân loại 5 hình thái ban, cận lâm sàng theo bậc, xử trí cấp cứu và ca lâm sàng sốt mò.',
        keyTakeaway: 'Sàng lọc Red Flags trước khi phân tích hình thái ban; kháng sinh TM phổ rộng trong 1 giờ nếu nghi não mô cầu, soi kỹ nếp gấp tìm Eschar (sốt mò) và chống chỉ định NSAIDs khi chưa loại trừ Dengue.',
        urgency: 'emergent',
        hasVault: true,
        tags: ['Sốt kèm phát ban', 'Não mô cầu', 'SJS/TEN', 'Sốt mò', 'DRESS'],
        minutes: 25,
        status: 'published',
        redFlags: 'Tụt huyết áp/sốc, rối loạn tri giác/cổ gượng, tử ban không mất khi ấn kính, trợt ≥ 2 hốc niêm mạc, dấu Nikolsky (+), bong da > 10% BSA, đau da dữ dội không tương xứng.'
      },
      {
        n: 5,
        slug: 'sot-vang-da',
        exactSlug: 'tc-03-sot-vang-da',
        title: 'Tiếp Cận Bệnh Nhân Người Lớn Có Sốt Kèm Vàng Da (Fever and Jaundice)',
        desc: 'Tiếp cận cấp cứu sốt kèm vàng da ở người lớn: 3 cơ chế (trước gan, tại gan, sau gan), Tam chứng Charcot & Ngũ chứng Reynolds, 4 kiểu hình sinh hóa, siêu âm đường mật và giải áp ERCP khẩn cấp.',
        keyTakeaway: 'Sốt kèm vàng da là cấp cứu nội – ngoại khoa: nhận diện sớm Ngũ chứng Reynolds & Suy gan cấp; kháng sinh phổ rộng trong 1 giờ kết hợp giải áp đường mật khẩn cấp (ERCP).',
        urgency: 'emergent',
        hasVault: true,
        tags: ['Sốt kèm vàng da', 'Viêm đường mật cấp', 'Ngũ chứng Reynolds', 'Leptospirosis', 'ERCP'],
        minutes: 25,
        status: 'published',
        redFlags: 'Ngũ chứng Reynolds (đau HSP + sốt rét run + vàng da + tụt HA + rối loạn tri giác), Suy gan cấp (bệnh não gan + INR ≥ 1.5), sốt rét ác tính, hội chứng Weil suy thận/xuất huyết phổi.'
      }
    ], 1)
  },

  // =========================================================================
  // CK04: TIM MẠCH
  // =========================================================================
  {
    id: 'ck04',
    number: 4,
    key: 'ck04-tim-mach',
    codePrefix: 'TM',
    title: 'Tim Mạch',
    shortTitle: 'Tim Mạch',
    icon: 'fa-heart-pulse',
    color: '#dc2626',
    bgColor: 'rgba(220, 38, 38, 0.12)',
    badge: '1 bài • Golden',
    description: 'Tiếp cận đau ngực cấp, ngất, hồi hộp đánh trống ngực, rối loạn nhịp và âm thổi bất thường theo AHA/ACC & ESC.',
    clinicalObjective: 'Đo ECG trong 10 phút, loại trừ 6 sát thủ đau ngực và phân tầng nguy cơ đột tử tim.',
    lessons: buildLessons(4, 'ck04-tim-mach', 'Tim Mạch', 'TM', [
      {
        n: 1,
        slug: 'dau-nguc',
        title: 'Tiếp cận Đau ngực cấp & 6 Sát thủ đe dọa tính mạng',
        desc: 'Đo ECG ≤ 10 phút, bảng đối chiếu 6 Big Killers, phân tầng HEART Score và thuật toán hs-cTn ESC 0h/1h.',
        keyTakeaway: 'Door-to-ECG ≤ 10 phút và loại trừ ngay 6 sát thủ (ACS, Bóc tách ĐMC, PE, TKMP áp lực, Chèn ép tim, Boerhaave).',
        urgency: 'emergent',
        hasVault: true,
        vaultFile: '03. Tim mạch/TC_Đau ngực_P1.md',
        tags: ['Đau ngực', 'ACS', 'HEART Score', 'ESC 0h/1h'],
        minutes: 25,
        status: 'published',
        redFlags: 'ST chênh lên, tụt huyết áp, chênh HA 2 tay > 20 mmHg, tam chứng Beck, suy hô hấp.',
        golden: true
      }
    ], 3)
  },

  // =========================================================================
  // CK05: HÔ HẤP
  // =========================================================================
  {
    id: 'ck05',
    number: 5,
    key: 'ck05-ho-hap',
    codePrefix: 'HH',
    title: 'Hô Hấp',
    shortTitle: 'Hô Hấp',
    icon: 'fa-lungs',
    color: '#0284c7',
    bgColor: 'rgba(2, 132, 199, 0.12)',
    badge: '0 bài',
    description: 'Tiếp cận khó thở, ho, ho ra máu, khò khè, tím, ngón tay dùi trống và diễn giải khí máu/X-quang ngực.',
    clinicalObjective: 'Phân loại nhanh suy hô hấp cấp, xác định cơ chế tim vs phổi và nhận diện các dấu hiệu nguy cơ đặt nội khí quản.',
    lessons: []
  },

  // =========================================================================
  // CK06: TIÊU HÓA – GAN MẬT
  // =========================================================================
  {
    id: 'ck06',
    number: 6,
    key: 'ck06-tieu-hoa-gan-mat',
    codePrefix: 'TH',
    title: 'Tiêu Hóa – Gan Mật',
    shortTitle: 'Tiêu Hóa',
    icon: 'fa-stomach',
    color: '#d97706',
    bgColor: 'rgba(217, 119, 6, 0.12)',
    badge: '0 bài',
    description: 'Tiếp cận đau bụng cấp theo từng vùng giải phẫu và đối tượng đặc biệt, xuất huyết tiêu hóa, vàng da, bất thường men gan và báng bụng.',
    clinicalObjective: 'Phân định kịp thời bụng ngoại khoa cần mổ cấp cứu vs nội khoa, và tránh bỏ sót thai ngoài tử cung vỡ.',
    lessons: []
  },

  // =========================================================================
  // CK07: THẬN – TIẾT NIỆU & NƯỚC – ĐIỆN GIẢI
  // =========================================================================
  {
    id: 'ck07',
    number: 7,
    key: 'ck07-than-dien-giai',
    codePrefix: 'TDG',
    title: 'Thận – Tiết Niệu & Nước – Điện Giải',
    shortTitle: 'Thận & Điện Giải',
    icon: 'fa-droplet',
    color: '#0891b2',
    bgColor: 'rgba(8, 145, 178, 0.12)',
    badge: '1 bài • Golden',
    description: 'Tiếp cận tổn thương thận cấp AKI, tiểu máu, tiểu đạm, phù và trọn bộ rối loạn Natri, Kali, Canxi máu.',
    clinicalObjective: 'Vận dụng sinh lý ống thận (UOsm, UNa, FENa, TTKG) để chẩn đoán chính xác và điều chỉnh điện giải an toàn.',
    lessons: buildLessons(7, 'ck07-than-dien-giai', 'Thận – Tiết Niệu & Nước – Điện Giải', 'TDG', [
      {
        n: 9,
        slug: 'ha-natri-mau',
        title: 'Tiếp cận Hạ Natri máu (Hyponatremia)',
        desc: 'Công thức Edelman, hiệu chỉnh Glucose, thuật toán UOsm & UNa, cấp cứu NaCl 3% và bảo vệ não chống ODS.',
        keyTakeaway: 'Cấp cứu não trước bằng bolus 150 mL NaCl 3% khi có triệu chứng nặng; giới hạn tốc độ bù ≤ 8–10 mmol/L/24h.',
        urgency: 'emergent',
        hasVault: true,
        vaultFile: '01. Toàn thân & Cấp cứu/TC_Hạ Natri máu_P1.md',
        tags: ['Hạ Natri', 'SIADH', 'NaCl 3%', 'ODS'],
        minutes: 25,
        status: 'published',
        redFlags: 'Co giật, hôn mê, lơ mơ sâu, nôn ói dữ dội (phù não cấp); hoặc tăng Na > 10 mmol/L/24h (ODS).',
        golden: true
      }
    ], 4)
  },

  // =========================================================================
  // CK08: THẦN KINH
  // =========================================================================
  {
    id: 'ck08',
    number: 8,
    key: 'ck08-than-kinh',
    codePrefix: 'TK',
    title: 'Thần Kinh',
    shortTitle: 'Thần Kinh',
    icon: 'fa-brain',
    color: '#7c3aed',
    bgColor: 'rgba(124, 58, 237, 0.12)',
    badge: '0 bài',
    description: 'Tiếp cận đau đầu (SNOOP10), chóng mặt (TiTrATE & HINTS), co giật – trạng thái động kinh và rối loạn ý thức.',
    clinicalObjective: 'Phân biệt nhanh tổn thương thần kinh trung ương đe dọa tính mạng với nguyên nhân ngoại biên lành tính.',
    lessons: []
  },

  // =========================================================================
  // CK09: HUYẾT HỌC – MIỄN DỊCH
  // =========================================================================
  {
    id: 'ck09',
    number: 9,
    key: 'ck09-huyet-hoc-mien-dich',
    codePrefix: 'HM',
    title: 'Huyết Học – Miễn Dịch',
    shortTitle: 'Huyết Học',
    icon: 'fa-droplet',
    color: '#be123c',
    bgColor: 'rgba(190, 18, 60, 0.12)',
    badge: '3 bài MDX',
    description: 'Tiếp cận thiếu máu theo MCV & hồng cầu lưới, bất thường bạch cầu, bất thường tiểu cầu, rối loạn đông cầm máu và dị ứng thuốc – miễn dịch lâm sàng.',
    clinicalObjective: 'Đọc sâu huyết đồ ngoại biên, nhận diện các cấp cứu huyết học – miễn dịch (TTP, DIC, sốt giảm bạch cầu hạt, phản vệ, SJS/TEN, DRESS) và vận dụng chuẩn xác các test chẩn đoán dị ứng – tự miễn.',
    lessons: buildLessons(9, 'ck09-huyet-hoc-mien-dich', 'Huyết Học – Miễn Dịch', 'HM', [
      {
        n: 1,
        slug: 'thieu-mau-hong-cau-nho',
        title: 'Tiếp Cận Thiếu Máu Hồng Cầu Nhỏ Nhược Sắc Ở Người Lớn',
        desc: 'Tiêu chuẩn WHO/BYT, 4 nhóm căn nguyên TAIL, biện giải huyết đồ (RDW, Mentzer, PBS), Bilan sắt cập nhật ASH 2026 & AGA 2024, lưu đồ chẩn đoán và truy tìm ổ mất máu đường tiêu hóa.',
        keyTakeaway: 'Thiếu máu thiếu sắt ở nam giới lớn tuổi và phụ nữ sau mãn kinh luôn là cờ đỏ của ung thư đường tiêu hóa — bắt buộc nội soi tiêu hóa hai chiều; không bao giờ chỉ kê đơn sắt rồi cho về.',
        urgency: 'routine',
        hasVault: true,
        tags: ['Thiếu máu', 'Hồng cầu nhỏ nhược sắc', 'IDA', 'Thalassemia', 'Bilan sắt', 'ASH 2026'],
        minutes: 25,
        status: 'published',
        redFlags: 'Hb < 70 g/L hoặc < 80 g/L kèm bệnh mạch vành/suy tim, bất ổn huyết động, xuất huyết tiêu hóa đang tiến triển, IDA ở nam lớn tuổi / nữ sau mãn kinh.'
      },
      {
        n: 2,
        slug: 'di-ung-thuoc',
        exactSlug: 'tc-09-di-ung-thuoc',
        title: 'Tiếp Cận Chẩn Đoán & Điều Trị Dị Ứng Thuốc (Drug Allergy)',
        desc: 'Cơ chế Gell & Coombs & giả dị ứng, phân loại nhanh/chậm (Phản vệ, SJS/TEN, DRESS, AGEP), thang điểm SCORTEN & RegiSCAR, xét nghiệm In vivo/In vitro, bảng thay thế Beta-lactam và giảm mẫn cảm nhanh 12–16 bước (QĐ 3592/QĐ-BYT).',
        keyTakeaway: 'Ngừng ngay thuốc nghi ngờ; tiêm bắp Adrenaline tức thì cho phản vệ từ độ II trở lên; thay thế Beta-lactam theo tương đồng chuỗi bên R1/R2 và chống chỉ định tuyệt đối DPT/giảm mẫn cảm ở tiền sử SCARs.',
        urgency: 'emergent',
        hasVault: true,
        tags: ['Dị ứng thuốc', 'Phản vệ', 'SJS/TEN', 'DRESS', 'SCORTEN', 'RegiSCAR', 'Beta-lactam'],
        minutes: 30,
        status: 'published',
        redFlags: 'Phản vệ độ II–IV (khó thở, tụt HA < 90 mmHg), loét đa hốc niêm mạc & bong tróc thượng bì (SJS/TEN), sốt cao + ban thâm nhiễm > 50% BSA + tổn thương nội tạng (DRESS), giảm bạch cầu hạt < 0.5 G/L.'
      },
      {
        n: 3,
        slug: 'chan-doan-di-ung-tu-mien',
        exactSlug: 'tc-09-chan-doan',
        title: 'Các Phương Pháp Chẩn Đoán Bệnh Dị Ứng & Tự Miễn (In Vivo & In Vitro)',
        desc: '8 phương pháp chẩn đoán chuyên sâu theo QĐ 3592/QĐ-BYT (2026): Test lẩy da (SPT), Test nội bì (IDT), Test áp da (Patch test), Test kích thích thuốc (DPT), Giảm mẫn cảm nhanh 12–16 bước, ASST, định lượng sIgE và bộ tự kháng thể ANA (IFA trên tế bào Hep-2).',
        keyTakeaway: 'Tuân thủ thời gian ngừng kháng H1 trước test da; không làm IDT với dị nguyên thức ăn/hô hấp; chống chỉ định tuyệt đối DPT ở phản vệ ≥ Độ 3 & SCARs; sàng lọc tự miễn hệ thống đầu tay bằng ANA (IFA).',
        urgency: 'urgent',
        hasVault: true,
        tags: ['Test lẩy da', 'Test nội bì', 'Patch test', 'Test kích thích', 'Giảm mẫn cảm', 'ASST', 'sIgE', 'ANA IFA'],
        minutes: 30,
        status: 'published',
        redFlags: 'Chống chỉ định tuyệt đối DPT ở tiền sử phản vệ ≥ Độ 3, SJS/TEN, DRESS, AGEP, tổn thương cơ quan nặng; lưu theo dõi đủ 40 phút sau IDT nguy cơ cao.'
      }
    ], 8)
  },

  // =========================================================================
  // CK10: NỘI TIẾT – CHUYỂN HÓA – DINH DƯỠNG
  // =========================================================================
  {
    id: 'ck10',
    number: 10,
    key: 'ck10-noi-tiet-dinh-duong',
    codePrefix: 'NT',
    title: 'Nội Tiết – Chuyển Hóa – Dinh Dưỡng',
    shortTitle: 'Nội Tiết',
    icon: 'fa-scale-balanced',
    color: '#059669',
    bgColor: 'rgba(5, 150, 105, 0.12)',
    badge: '0 bài',
    description: 'Tiếp cận rối loạn đường huyết (hạ/tăng đường huyết, DKA/HHS), tuyến giáp, khối ở cổ, Cushing, béo phì, suy dinh dưỡng và sụt cân.',
    clinicalObjective: 'Vận dụng trục phản hồi ngược nội tiết và nhận diện cơn bão giáp, DKA/HHS và hạ đường huyết nặng.',
    lessons: []
  },

  // =========================================================================
  // CK11: CƠ XƯƠNG KHỚP
  // =========================================================================
  {
    id: 'ck11',
    number: 11,
    key: 'ck11-co-xuong-khop',
    codePrefix: 'CXK',
    title: 'Cơ Xương Khớp',
    shortTitle: 'Cơ Xương Khớp',
    icon: 'fa-bone',
    color: '#4f46e5',
    bgColor: 'rgba(79, 70, 229, 0.12)',
    badge: '0 bài',
    description: 'Tiếp cận đau lưng (cờ đỏ chùm đuôi ngựa), đau cổ (chèn ép tủy cổ) và đau khớp/chi không do chấn thương.',
    clinicalObjective: 'Sàng lọc dấu hiệu chèn ép thần kinh cấp cứu, nhiễm trùng cột sống/khớp và tránh lạm dụng MRI không cần thiết.',
    lessons: []
  },

  // =========================================================================
  // CK12: DA LIỄU
  // =========================================================================
  {
    id: 'ck12',
    number: 12,
    key: 'ck12-da-lieu',
    codePrefix: 'DL',
    title: 'Da Liễu',
    shortTitle: 'Da Liễu',
    icon: 'fa-hand-dots',
    color: '#db2777',
    bgColor: 'rgba(219, 39, 119, 0.12)',
    badge: '0 bài',
    description: 'Tiếp cận thương tổn cơ bản phát ban da (nhận diện SJS/TEN, DRESS, viêm cân hoại tử) và tiếp cận ngứa toàn thân.',
    clinicalObjective: 'Mô tả chính xác sang thương cơ bản và phát hiện sớm các phản ứng thuốc trên da đe dọa tính mạng.',
    lessons: []
  },

  // =========================================================================
  // CK13: NHI KHOA
  // =========================================================================
  {
    id: 'ck13',
    number: 13,
    key: 'ck13-nhi-khoa',
    codePrefix: 'NK',
    title: 'Nhi Khoa',
    shortTitle: 'Nhi Khoa',
    icon: 'fa-baby',
    color: '#ea580c',
    bgColor: 'rgba(234, 88, 12, 0.12)',
    badge: '1 bài • Golden',
    description: 'Tiếp cận toàn diện các triệu chứng và hội chứng cốt lõi ở trẻ em theo chuẩn Nhi khoa YDS, WHO IMCI, AAP & NICE.',
    clinicalObjective: 'Phân tầng nguy cơ theo lứa tuổi (sơ sinh, nhũ nhi, trẻ lớn) và nhận diện dấu hiệu nguy hiểm toàn thân IMCI.',
    lessons: buildLessons(13, 'ck13-nhi-khoa', 'Nhi Khoa', 'NK', [
      {
        n: 1,
        slug: 'tre-sot',
        title: 'Tiếp cận Trẻ Sốt (Cấp tính & Kéo dài FUO)',
        desc: 'Sinh lý điều nhiệt hạ đồi vs Tăng thân nhiệt, phân tầng NICE & trẻ < 3 tháng, chỉ định nhập viện và hạ sốt an toàn.',
        keyTakeaway: 'Trẻ < 2 tháng tuổi sốt ≥ 38°C bắt buộc nhập viện đánh giá nhiễm khuẩn huyết/viêm màng não toàn diện.',
        urgency: 'emergent',
        hasVault: true,
        vaultFile: '11. Nhi khoa/TC_Tiếp cận trẻ sốt_P1.md',
        tags: ['Trẻ sốt', 'NICE Traffic Light', 'Sơ sinh', 'FUO'],
        minutes: 25,
        status: 'published',
        redFlags: 'Trẻ < 2 tháng sốt ≥ 38°C, li bì khó đánh thức, co giật, bỏ bú, tử ban, thóp phồng, sốc.',
        golden: true
      }
    ], 5)
  }
];

export function getAllApproachLessons(): ApproachLesson[] {
  return APPROACH_SPECIALTIES.flatMap(s => s.lessons);
}

export function getPublishedApproachLessons(): ApproachLesson[] {
  return getAllApproachLessons().filter(l => l.status === 'published');
}

export function getApproachSpecialtyByKey(key: string): ApproachSpecialty | undefined {
  return APPROACH_SPECIALTIES.find(s => s.key === key);
}

export function getApproachLessonBySlug(specialtyKey: string, slug: string): ApproachLesson | undefined {
  const cleanSlug = slug.replace(/\.(mdx|html)$/i, '');
  const spec = getApproachSpecialtyByKey(specialtyKey);
  if (spec) {
    return spec.lessons.find(l => l.slug === cleanSlug);
  }
  return getAllApproachLessons().find(l => l.slug === cleanSlug);
}
