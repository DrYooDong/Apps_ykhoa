/**
 * CliniPortal — Clinical Approach Curriculum & Master Registry (Tiếp Cận Lâm Sàng)
 * Path: src/content/basic-medical/approach/data/approach-curriculum-data.ts
 *
 * Toàn bộ CSDL 13 Chuyên khoa & 112 Chuyên đề Tiếp Cận Triệu Chứng / Hội Chứng
 * Đối soát 1:1 với Kho Knowledge Vault 2.1 (Kho tiếp cận lâm sàng) & Khung EBM 2026
 */

import { ApproachSpecialty, ApproachLesson, ApproachUrgency, ApproachLessonStatus } from '../types/approach.types';

interface RawLessonSpec {
  n: number;
  slug: string;
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
    const fullSlug = `tc-${ckPad}-${numPad}-${s.slug}`;
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
    badge: 'Nền tảng',
    description: 'Phương pháp luận tiếp cận triệu chứng, tư duy xác suất Bayes, loại trừ bệnh nguy hiểm trước và nhận diện sai lệch nhận thức.',
    clinicalObjective: 'Thiết lập khung phản xạ 7–9 bước chuẩn hóa trước mọi triệu chứng cơ năng và thực thể.',
    lessons: buildLessons(1, 'ck01-nguyen-ly', 'Nguyên Lý Tiếp Cận Lâm Sàng', 'NL', [
      {
        n: 1,
        slug: 'nguyen-ly-tiep-can-trieu-chung',
        title: 'Nguyên lý tiếp cận một triệu chứng lâm sàng',
        desc: 'Quy trình chuẩn 7 bước từ ổn định ABCDE, khai thác SOCRATES đến lập danh sách Must-Not-Miss.',
        keyTakeaway: 'Luôn loại trừ nhóm đe dọa tính mạng trước khi tìm nguyên nhân thường gặp.',
        urgency: 'routine',
        hasVault: true,
        vaultFile: '01. Toàn thân & Cấp cứu/TC_Hướng dẫn cách tiếp cận các triệu chứng_P1.md',
        tags: ['Phương pháp luận', 'SOCRATES', 'Red Flags']
      },
      {
        n: 2,
        slug: 'ban-do-tiep-can-lam-sang',
        title: 'Bản đồ tiếp cận lâm sàng & Lập luận chẩn đoán',
        desc: 'Hệ thống hóa sơ đồ tư duy theo cơ quan, xác suất tiền nghiệm và phòng tránh 6 thiên kiến nhận thức.',
        keyTakeaway: 'Tránh đóng khung chẩn đoán sớm (Premature Closure) bằng kiểm chứng chéo dữ kiện nghịch.',
        urgency: 'routine',
        hasVault: true,
        vaultFile: '01. Toàn thân & Cấp cứu/TC_Tiếp cận Lâm sàng_MOC.md',
        tags: ['Tư duy lâm sàng', 'Bayes', 'Cognitive Bias']
      }
    ], 1)
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
    badge: 'Tối khẩn',
    description: 'Tiếp cận xử trí tối khẩn tại phòng cấp cứu: sốc, phản vệ, ngộ độc cấp và hội chứng cai đe dọa tính mạng.',
    clinicalObjective: 'Nhận diện sớm tình trạng nguy kịch trong 5 phút đầu và can thiệp hồi sức đúng mục tiêu sinh lý.',
    lessons: buildLessons(2, 'ck02-cap-cuu-doc-chat', 'Cấp Cứu – Hồi Sức – Độc Chất', 'CC', [
      {
        n: 1,
        slug: 'soc',
        title: 'Tiếp cận Sốc (Shock) tại Cấp cứu',
        desc: 'Phân biệt 4 nhóm sốc (Giảm thể tích, Phân bố, Tim, Tắc nghẽn) qua siêu âm RUSH và huyết động.',
        keyTakeaway: 'Huyết áp bình thường không loại trừ sốc còn bù; đánh giá tưới máu mô và Lactate máu.',
        urgency: 'emergent',
        hasVault: false,
        vaultFile: '01. Toàn thân & Cấp cứu/TC_Sốc (Shock)_P1.md',
        tags: ['Sốc', 'RUSH', 'Hồi sức']
      },
      {
        n: 2,
        slug: 'phan-ve',
        title: 'Tiếp cận Phản vệ (Anaphylaxis)',
        desc: 'Chẩn đoán lâm sàng nhanh theo tiêu chuẩn WAO/BYT và xử trí Adrenaline tiêm bắp mặt trước ngoài đùi.',
        keyTakeaway: 'Adrenaline tiêm bắp (IM) ngay lập tức là thuốc duy nhất cứu mạng; không trì hoãn chờ kháng Histamin.',
        urgency: 'emergent',
        hasVault: true,
        vaultFile: '01. Toàn thân & Cấp cứu/TC_Phản vệ (Anaphylaxis)_P1.md',
        tags: ['Phản vệ', 'Adrenaline', 'Cấp cứu']
      },
      {
        n: 3,
        slug: 'ngo-doc-ruou-va-cai-ruou',
        title: 'Ngộ độc rượu cấp & Hội chứng cai rượu',
        desc: 'Đánh giá khoảng trống thẩm thấu (Osmolar gap), thang điểm CIWA-Ar và phòng bệnh não Wernicke.',
        keyTakeaway: 'Tiêm Thiamine (Vitamin B1) trước hoặc cùng lúc với truyền Glucose ở bệnh nhân nghiện rượu.',
        urgency: 'emergent',
        hasVault: false,
        vaultFile: '01. Toàn thân & Cấp cứu/TC_Ngộ độc rượu_P1.md',
        tags: ['Độc chất', 'CIWA-Ar', 'Thiamine']
      },
      {
        n: 4,
        slug: 'ngo-doc-co',
        title: 'Tiếp cận Ngộ độc khí CO',
        desc: 'Cơ chế ái lực HbCO gấp 200 lần O2, bẫy SpO2 giả bình thường và chỉ định oxy cao áp.',
        keyTakeaway: 'SpO2 kẹp ngón tay không phân biệt được HbCO và HbO2; phải đo Co-oximetry khí máu.',
        urgency: 'emergent',
        hasVault: false,
        vaultFile: '01. Toàn thân & Cấp cứu/TC_Ngộ độc CO_P1.md',
        tags: ['Ngộ độc CO', 'HbCO', 'Oxy liệu pháp']
      },
      {
        n: 5,
        slug: 'ngo-doc-digoxin',
        title: 'Tiếp cận Ngộ độc Digoxin',
        desc: 'Nhận diện rối loạn nhịp đặc trưng, tăng kali máu tiên lượng tử vong và chỉ định kháng thể DigiFab.',
        keyTakeaway: 'Tăng Kali máu trong ngộ độc Digoxin cấp phản ánh ức chế nặng bơm Na+/K+-ATPase — chỉ định DigiFab.',
        urgency: 'emergent',
        hasVault: false,
        vaultFile: '01. Toàn thân & Cấp cứu/TC_Ngộ độc digoxin_P1.md',
        tags: ['Digoxin', 'Rối loạn nhịp', 'DigiFab']
      },
      {
        n: 6,
        slug: 'roi-loan-y-thuc-cap-cuu',
        title: 'Rối loạn ý thức cấp tại Cấp cứu (AEIOU-TIPS)',
        desc: 'Tiếp cận bệnh nhân hôn mê tại phòng cấp cứu: kiểm tra đường huyết mao mạch, ABCDE và bảo vệ đường thở.',
        keyTakeaway: 'Đo đường huyết mao mạch ngay phút đầu tiên ở mọi bệnh nhân rối loạn tri giác cấp.',
        urgency: 'emergent',
        hasVault: false,
        vaultFile: '02. Thần kinh/TC_Rối loạn ý thức_P1.md',
        tags: ['Hôn mê', 'GCS', 'AEIOU-TIPS']
      }
    ], 3)
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
    badge: '19 bài',
    description: 'Tiếp cận bệnh nhân sốt tổng quát, sốt kéo dài FUO và chuỗi 14 hội chứng Sốt kèm triệu chứng định vị cơ quan.',
    clinicalObjective: 'Định vị nhanh ổ nhiễm trùng, nhận diện Sepsis sớm và phân biệt tác nhân vi khuẩn, siêu vi, ký sinh trùng.',
    lessons: buildLessons(3, 'ck03-truyen-nhiem-sot', 'Truyền Nhiễm – Tiếp Cận Sốt', 'TN', [
      { n: 1, slug: 'sot-tong-quan', title: 'Tiếp cận Sốt tổng quan ở người lớn', desc: 'Cơ chế sốt, đánh giá qSOFA/NEWS2, khai thác dịch tễ và định hướng ổ nhiễm trùng.', keyTakeaway: 'Đánh giá dấu hiệu nhiễm khuẩn huyết và dịch tễ (Dengue, Sốt rét, Scrub typhus) ngay bước đầu.', urgency: 'urgent', hasVault: false, vaultFile: '01. Toàn thân & Cấp cứu/TC_Sốt_P1.md', tags: ['Sốt', 'Sepsis', 'Dịch tễ'] },
      { n: 2, slug: 'sot-keo-dai-fuo', title: 'Sốt kéo dài chưa rõ nguyên nhân (FUO)', desc: 'Phân nhóm 4 nguyên nhân kinh điển (Nhiễm trùng, Tự miễn, Ác tính, Khác) và chiến lược PDCs.', keyTakeaway: 'Tránh dùng kháng sinh/corticoid theo kinh nghiệm khi bệnh nhân FUO ổn định huyết động.', urgency: 'routine', hasVault: false, vaultFile: '01. Toàn thân & Cấp cứu/TC_Sốt kéo dài (Sốt chưa rõ nguyên nhân - FUO)_P1.md', tags: ['FUO', 'Lao', 'Tự miễn'] },
      { n: 3, slug: 'con-ret-run-rigors', title: 'Cơn rét run bần bật (Rigors) & Lạnh run', desc: 'Giá trị tiên đoán du khuẩn huyết của cơn rét run thực sự và thời điểm vàng cấy máu.', keyTakeaway: 'Cơn rét run thực sự (shaking chills) có LR+ cao cho nhiễm khuẩn huyết — ưu tiên cấy máu 2 bộ.', urgency: 'urgent', hasVault: true, vaultFile: '01. Toàn thân & Cấp cứu/TC_Cơn rét run bần bật (Rigors) - Lạnh run_P1.md', tags: ['Rét run', 'Du khuẩn huyết', 'Cấy máu'] },
      { n: 4, slug: 'nhiem-trung-an', title: 'Tiếp cận Nhiễm trùng ẩn (Occult Infection)', desc: 'Truy tìm ổ nhiễm sâu ở bệnh nhân cao tuổi, đái tháo đường, suy giảm miễn dịch.', keyTakeaway: 'Nhiễm trùng ẩn ở người cao tuổi có thể biểu hiện bằng lú lẫn cấp mà không sốt.', urgency: 'urgent', hasVault: true, vaultFile: '01. Toàn thân & Cấp cứu/TC_Nhiễm trùng ẩn_P1.md', tags: ['Nhiễm trùng ẩn', 'Áp xe sâu', 'Lão khoa'] },
      { n: 5, slug: 'sot-do-thuoc', title: 'Tiếp cận Sốt do thuốc (Drug Fever)', desc: 'Nhận diện dấu hiệu mạch nhiệt phân ly, tăng bạch cầu ái toan và các nhóm thuốc hay gây sốt.', keyTakeaway: 'Bệnh nhân sốt cao nhưng tổng trạng tương đối khỏe kèm mạch chậm tương đối: nghĩ đến sốt do thuốc.', urgency: 'routine', hasVault: true, vaultFile: '01. Toàn thân & Cấp cứu/TC_Sốt do thuốc_P1.md', tags: ['Sốt do thuốc', 'ADR', 'Beta-lactam'] },
      { n: 6, slug: 'sot-kem-hoi-chung-soc', title: 'Sốt kèm Hội chứng Sốc (Febrile Shock)', desc: 'Phân biệt sốc nhiễm khuẩn, sốc sốt xuất huyết Dengue, sốc độc tố và suy thượng thận cấp.', keyTakeaway: 'Khởi động gói 1 giờ (1-Hour Bundle): cấy máu, Lactate, kháng sinh phổ rộng và hồi sức dịch.', urgency: 'emergent', hasVault: true, vaultFile: '01. Toàn thân & Cấp cứu/TC_Sốt + Hội chứng sốc_P1.md', tags: ['Sốc nhiễm khuẩn', 'Dengue', '1-Hour Bundle'] },
      { n: 7, slug: 'sot-kem-roi-loan-tri-giac', title: 'Sốt kèm Rối loạn tri giác', desc: 'Loại trừ khẩn cấp viêm màng não mủ, viêm não HSV, sốt rét ác tính và áp xe não.', keyTakeaway: 'Không trì hoãn kháng sinh và Acyclovir quá 1 giờ vì chờ chụp CT sọ não hoặc chọc dò thắt lưng.', urgency: 'emergent', hasVault: true, vaultFile: '01. Toàn thân & Cấp cứu/TC_Sốt + Rối loạn tri giác_P1.md', tags: ['Viêm màng não', 'Viêm não', 'DNT'] },
      { n: 8, slug: 'sot-kem-dau-dau', title: 'Sốt kèm Đau đầu', desc: 'Phân biệt hội chứng màng não, viêm xoang, sốt xuất huyết, thương hàn và áp xe nội sọ.', keyTakeaway: 'Đau đầu dữ dội + sốt + cổ gượng hoặc tử ban: chỉ định chọc dò DNT cấp cứu sau sàng lọc tăng ALNS.', urgency: 'emergent', hasVault: true, vaultFile: '01. Toàn thân & Cấp cứu/TC_Sốt + đau đầu_P1.md', tags: ['Đau đầu', 'Màng não', 'Tử ban'] },
      { n: 9, slug: 'sot-kem-phat-ban', title: 'Sốt kèm Phát ban (Febrile Rash)', desc: 'Phân loại ban dát sẩn, mụn nước, xuất huyết (tử ban không mất khi ấn kính) theo sinh lý bệnh.', keyTakeaway: 'Tử ban không mất khi ấn kính ở bệnh nhân sốt: cảnh báo não mô cầu tối cấp (Meningococcemia).', urgency: 'emergent', hasVault: true, vaultFile: '01. Toàn thân & Cấp cứu/TC_Sốt + phát ban_P1.md', tags: ['Phát ban', 'Não mô cầu', 'Sốt mò'] },
      { n: 10, slug: 'sot-kem-ho', title: 'Sốt kèm Ho', desc: 'Phân tầng viêm phổi cộng đồng (CURB-65), lao phổi, cúm nặng và viêm phế quản cấp.', keyTakeaway: 'Đánh giá nhịp thở, SpO2 và chụp X-quang ngực để phân biệt nhiễm trùng hô hấp trên với viêm phổi.', urgency: 'urgent', hasVault: true, vaultFile: '01. Toàn thân & Cấp cứu/TC_Sốt + ho_P1.md', tags: ['CAP', 'Lao phổi', 'CURB-65'] },
      { n: 11, slug: 'sot-kem-dau-nguc', title: 'Sốt kèm Đau ngực', desc: 'Nhận diện viêm màng ngoài tim cấp, viêm cơ tim, viêm phổi màng phổi và viêm trung thất.', keyTakeaway: 'Đau ngực giảm khi ngồi cúi ra trước + sốt + ST chênh lên lan tỏa lõm trên: viêm màng ngoài tim cấp.', urgency: 'emergent', hasVault: true, vaultFile: '01. Toàn thân & Cấp cứu/TC_Sốt + đau ngực_P1.md', tags: ['Viêm màng ngoài tim', 'Viêm cơ tim', 'Viêm phổi'] },
      { n: 12, slug: 'sot-kem-vang-da', title: 'Sốt kèm Vàng da', desc: 'Phân biệt nhiễm trùng đường mật (Tam chứng Charcot), Leptospirosis, sốt rét, viêm gan cấp và áp xe gan.', keyTakeaway: 'Tam chứng Charcot + tụt huyết áp + lú lẫn (Ngũ chứng Reynolds): dẫn lưu mật cấp cứu.', urgency: 'emergent', hasVault: true, vaultFile: '01. Toàn thân & Cấp cứu/TC_Sốt + vàng da_P1.md', tags: ['Charcot', 'Leptospira', 'Áp xe gan'] },
      { n: 13, slug: 'sot-kem-non-oi-tieu-chay', title: 'Sốt kèm Nôn ói hoặc Tiêu chảy', desc: 'Phân biệt tiêu chảy xâm nhập (lỵ trực trùng/amip), viêm ruột thừa cấp, thương hàn và nhiễm trùng ngoài ruột.', keyTakeaway: 'Cảnh giác nguyên nhân ngoại khoa (viêm ruột thừa tiểu khung) giả dạng viêm dạ dày ruột.', urgency: 'urgent', hasVault: true, vaultFile: '01. Toàn thân & Cấp cứu/TC_Sốt + Nôn ói hay Tiêu chảy_P1.md', tags: ['Tiêu chảy nhiễm trùng', 'Lỵ', 'Đánh giá mất nước'] },
      { n: 14, slug: 'sot-kem-tieu-buot-tieu-rat', title: 'Sốt kèm Tiểu buốt hoặc Tiểu rắt', desc: 'Phân biệt viêm thận bể thận cấp, nhiễm trùng tiểu có tắc nghẽn và viêm tuyến tiền liệt cấp.', keyTakeaway: 'Sốt + đau hông lưng + tắc nghẽn đường tiểu (sỏi): chỉ định giải áp khẩn cấp bằng JJ hoặc mở thận ra da.', urgency: 'urgent', hasVault: true, vaultFile: '01. Toàn thân & Cấp cứu/TC_Sốt + tiểu buốt hoặc tiểu rắt_P1.md', tags: ['Viêm thận bể thận', 'UTI biến chứng', 'Siêu âm thận'] },
      { n: 15, slug: 'sot-kem-hach-to', title: 'Sốt kèm Hạch to', desc: 'Định hướng lao hạch, tăng bạch cầu đơn nhân (EBV/CMV), HIV cấp, sốt mò, bệnh mèo cào và lymphoma.', keyTakeaway: 'Hạch thượng đòn hoặc hạch cứng không đau dính nền: ưu tiên loại trừ bệnh lý ác tính và lao.', urgency: 'routine', hasVault: true, vaultFile: '01. Toàn thân & Cấp cứu/TC_Sốt + Hạch to_P1.md', tags: ['Hạch to', 'EBV', 'Lao hạch'] },
      { n: 16, slug: 'sot-kem-dau-co', title: 'Sốt kèm Đau cơ (Febrile Myalgia)', desc: 'Phân biệt sốt xuất huyết, cúm, Leptospirosis, viêm cơ sinh mủ và tiêu cơ vân cấp.', keyTakeaway: 'Đau bắp chân dữ dội + sốt + xung huyết kết mạc: nghĩ ngay Leptospirosis và kiểm tra CK, Creatinin.', urgency: 'urgent', hasVault: true, vaultFile: '01. Toàn thân & Cấp cứu/TC_Sốt + đau cơ_P1.md', tags: ['Đau cơ', 'Leptospirosis', 'Tiêu cơ vân'] },
      { n: 17, slug: 'sot-kem-dau-khop', title: 'Sốt kèm Đau khớp', desc: 'Loại trừ khẩn cấp viêm khớp nhiễm khuẩn (chọc hút dịch khớp), bệnh Gout cấp và sốt thấp khớp.', keyTakeaway: 'Viêm đơn khớp cấp kèm sốt là viêm khớp nhiễm khuẩn cho đến khi chọc dịch khớp chứng minh ngược lại.', urgency: 'emergent', hasVault: true, vaultFile: '01. Toàn thân & Cấp cứu/TC_Sốt + đau khớp_P1.md', tags: ['Viêm khớp nhiễm khuẩn', 'Dịch khớp', 'Lậu cầu'] },
      { n: 18, slug: 'sot-kem-hc-nhiem-sieu-vi', title: 'Sốt kèm Hội chứng Nhiễm siêu vi', desc: 'Nhận diện giai đoạn khởi phát Dengue, Cúm, Sởi, COVID-19 và các dấu hiệu cảnh báo chuyển nặng.', keyTakeaway: 'Giai đoạn hết sốt ngày 3–6 của Dengue mới là giai đoạn nguy hiểm nhất do thoát huyết tương.', urgency: 'urgent', hasVault: true, vaultFile: '01. Toàn thân & Cấp cứu/TC_Sốt + Hội chứng nhiễm siêu vi_P1.md', tags: ['Nhiễm siêu vi', 'Dengue', 'Cảnh báo nặng'] },
      { n: 19, slug: 'sot-kem-hc-nhiem-trung-va-vet-mo', title: 'Sốt kèm HC Nhiễm trùng & Nhiễm trùng vết mổ', desc: 'Áp dụng quy tắc 5W cho sốt hậu phẫu và phân loại nhiễm trùng vết mổ nông/sâu/khoang cơ quan.', keyTakeaway: 'Sốt cao trong 24–48 giờ đầu hậu phẫu kèm vết mổ đỏ lan nhanh, đau dữ dội: loại trừ viêm cân hoại tử/Clostridium.', urgency: 'urgent', hasVault: true, vaultFile: '01. Toàn thân & Cấp cứu/TC_Sốt + Hội chứng nhiễm trùng_P1.md', tags: ['Nhiễm trùng vết mổ', '5W hậu phẫu', 'SSI'] }
    ], 9)
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
    badge: '5 bài • 1 Golden',
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
      },
      {
        n: 2,
        slug: 'ngat',
        title: 'Tiếp cận Ngất (Syncope)',
        desc: 'Phân biệt ngất thực sự với co giật/đột quỵ, phân loại 3 cơ chế (Phản xạ, Hạ HA tư thế, Tim mạch) và tiêu chuẩn ESC.',
        keyTakeaway: 'Ngất khi đang gắng sức, khi đang nằm ngửa hoặc có tiền sử gia đình đột tử: nguy cơ cao do tim.',
        urgency: 'emergent',
        hasVault: true,
        vaultFile: '03. Tim mạch/TC_Ngất_P1.md',
        tags: ['Ngất', 'Syncope', 'ESC', 'ECG']
      },
      {
        n: 3,
        slug: 'hoi-hop-danh-trong-nguc',
        title: 'Tiếp cận Hồi hộp & Đánh trống ngực',
        desc: 'Phân loại theo nhịp đều/không đều, khởi phát đột ngột/từ từ và chỉ định Holter ECG 24–48h.',
        keyTakeaway: 'Hồi hộp kèm ngất, đau ngực hoặc tụt huyết áp đòi hỏi đo ECG cấp cứu và loại trừ nhịp nhanh thất.',
        urgency: 'urgent',
        hasVault: false,
        vaultFile: '03. Tim mạch/TC_Hồi hộp & đánh trống ngực_P1.md',
        tags: ['Hồi hộp', 'SVT', 'Rung nhĩ']
      },
      {
        n: 4,
        slug: 'roi-loan-nhip-tim',
        title: 'Tiếp cận Rối loạn nhịp tim (Arrhythmia)',
        desc: 'Thuật toán xử trí nhịp nhanh QRS hẹp/rộng và nhịp chậm theo ACLS, phân tầng ổn định huyết động.',
        keyTakeaway: 'Rối loạn nhịp kèm tụt HA, lú lẫn, đau ngực hay phù phổi cấp: sốc điện chuyển nhịp đồng bộ ngay.',
        urgency: 'emergent',
        hasVault: false,
        vaultFile: '03. Tim mạch/TC_Rối loạn nhịp tim (Cardiac Arrhythmia)_P1.md',
        tags: ['ACLS', 'Nhịp nhanh QRS rộng', 'Block AV']
      },
      {
        n: 5,
        slug: 'tieng-tim-va-am-thoi',
        title: 'Tiếp cận Tiếng tim & Âm thổi bất thường',
        desc: 'Kỹ năng nghe tim 4 ổ van, phân biệt âm thổi tâm thu/tâm trương/liên tục và nghiệm pháp động học (Valsalva, ngồi xổm).',
        keyTakeaway: 'Mọi âm thổi tâm trương đều là bệnh lý và bắt buộc chỉ định siêu âm tim đánh giá.',
        urgency: 'routine',
        hasVault: true,
        vaultFile: '03. Tim mạch/TC_Tiếng tim và Âm thổi bất thường_P1.md',
        tags: ['Âm thổi tim', 'Bệnh van tim', 'Khám tim']
      }
    ], 28)
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
    badge: '8 bài',
    description: 'Tiếp cận khó thở, ho, ho ra máu, khò khè, tím, ngón tay dùi trống và diễn giải khí máu/X-quang ngực.',
    clinicalObjective: 'Phân loại nhanh suy hô hấp cấp, xác định cơ chế tim vs phổi và nhận diện các dấu hiệu nguy cơ đặt nội khí quản.',
    lessons: buildLessons(5, 'ck05-ho-hap', 'Hô Hấp', 'HH', [
      { n: 1, slug: 'kho-tho', title: 'Tiếp cận Khó thở (Dyspnea)', desc: 'Phân biệt khó thở cấp vs mạn, nguồn gốc tim vs phổi qua POCUS BLUE protocol và NT-proBNP.', keyTakeaway: 'Sử dụng cơ hô hấp phụ, nói từng từ, lơ mơ hoặc SpO2 < 90%: dấu hiệu suy hô hấp đe dọa.', urgency: 'emergent', hasVault: true, vaultFile: '04. Hô hấp/TC_Khó thở (Dyspnea)_P1.md', tags: ['Khó thở', 'BLUE Protocol', 'Suy hô hấp'] },
      { n: 2, slug: 'ho-dam-ho-khan', title: 'Tiếp cận Ho (Cấp, Bán cấp & Mạn tính)', desc: 'Phân tầng theo mốc 3 tuần – 8 tuần; bộ tứ nguyên nhân ho mạn (UACS, Hen, GERD, thuốc ƯCMC).', keyTakeaway: 'Ho kéo dài > 2 tuần tại Việt Nam luôn phải sàng lọc Lao phổi song song với X-quang ngực.', urgency: 'routine', hasVault: true, vaultFile: '04. Hô hấp/TC_Ho (Ho đàm, ho khan)_P1.md', tags: ['Ho mạn', 'UACS', 'Lao phổi'] },
      { n: 3, slug: 'ho-ra-mau', title: 'Tiếp cận Ho ra máu (Hemoptysis)', desc: 'Phân biệt ho ra máu với nôn ra máu, định lượng mức độ sét đánh và tư thế nằm nghiêng bên tổn thương.', keyTakeaway: 'Ho ra máu lượng lớn đe dọa chết ngạt hơn là mất máu: đặt bệnh nhân nằm nghiêng về bên phổi chảy máu.', urgency: 'emergent', hasVault: false, vaultFile: '04. Hô hấp/TC_Ho ra máu_P1.md', tags: ['Ho ra máu', 'Giãn phế quản', 'BAE'] },
      { n: 4, slug: 'kho-khe', title: 'Tiếp cận Khò khè (Wheezing)', desc: 'Phân biệt khò khè lan tỏa (Hen, COPD, phù phổi cấp) với khò khè khu trú 1 bên (dị vật, u phế quản).', keyTakeaway: '"Không phải mọi tiếng khò khè đều là hen" — khò khè khu trú 1 bên cần soi phế quản loại trừ u/dị vật.', urgency: 'urgent', hasVault: false, vaultFile: '04. Hô hấp/TC_Khò khè (Wheezing)_P1.md', tags: ['Khò khè', 'Hen phế quản', 'COPD'] },
      { n: 5, slug: 'tim-cyanosis', title: 'Tiếp cận Tím (Cyanosis)', desc: 'Phân biệt tím trung ương (niêm mạc lưỡi) vs tím ngoại biên và Methemoglobin máu (máu màu sô-cô-la).', keyTakeaway: 'Tím trung ương không đáp ứng oxy 100% kèm SpO2 quanh 85%: nghĩ ngay Methemoglobinemia hoặc Shunt P-T.', urgency: 'emergent', hasVault: false, vaultFile: '04. Hô hấp/TC_Tím (cyanosis)_P1.md', tags: ['Tím', 'Shunt', 'MetHb'] },
      { n: 6, slug: 'ngon-tay-dui-trong', title: 'Tiếp cận Ngón tay dùi trống (Clubbing)', desc: 'Dấu hiệu cửa sổ Schamroth và bộ nguyên nhân CLUBBING (Phổi, Tim tím, Tiêu hóa, Cường giáp).', keyTakeaway: 'Ngón tay dùi trống ở người hút thuốc lá có ho mạn: chỉ định CT ngực tầm soát ung thư phổi.', urgency: 'routine', hasVault: false, vaultFile: '01. Toàn thân & Cấp cứu/TC_Ngón tay dùi trống (clubbing)_P1.md', tags: ['Clubbing', 'Schamroth', 'Ung thư phổi'] },
      { n: 7, slug: 'bat-thuong-khi-mau-dong-mach', title: 'Tiếp cận Bất thường Khí máu động mạch (ABG)', desc: 'Quy trình 6 bước đọc ABG, tính Anion Gap, Delta Ratio, A-a DO2 và bù trừ kỳ vọng Winter.', keyTakeaway: 'Luôn tính Anion Gap hiệu chỉnh theo Albumin để không bỏ sót toan chuyển hóa tăng AG ẩn.', urgency: 'emergent', hasVault: false, vaultFile: '04. Hô hấp/TC_Bất thường khí máu động mạch_P1.md', tags: ['ABG', 'Toan kiềm', 'Anion Gap'] },
      { n: 8, slug: 'bat-thuong-x-quang-nguc', title: 'Tiếp cận Bất thường X-quang ngực (CXR)', desc: 'Hệ thống đọc phim ABCDE, phân biệt hội chứng phế nang vs mô kẽ, nốt đơn độc phổi và tràn khí/dịch.', keyTakeaway: 'Đánh giá tiêu chuẩn kỹ thuật (RIPE) trước khi kết luận bất thường nhu mô hay bóng tim to.', urgency: 'urgent', hasVault: false, vaultFile: '04. Hô hấp/TC_Bất thường X-quang ngực_P1.md', tags: ['CXR', 'Hình ảnh học', 'Hội chứng phế nang'] }
    ], 33)
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
    badge: '22 bài',
    description: 'Tiếp cận đau bụng cấp theo từng vùng giải phẫu và đối tượng đặc biệt, xuất huyết tiêu hóa, vàng da, bất thường men gan và báng bụng.',
    clinicalObjective: 'Phân định kịp thời bụng ngoại khoa cần mổ cấp cứu vs nội khoa, và tránh bỏ sót thai ngoài tử cung vỡ.',
    lessons: buildLessons(6, 'ck06-tieu-hoa-gan-mat', 'Tiêu Hóa – Gan Mật', 'TH', [
      { n: 1, slug: 'dau-bung-cap-tong-quan', title: 'Đau bụng cấp — Tiếp cận tổng quan 9 vùng', desc: 'Nguyên tắc nhận diện bụng ngoại khoa, tam chứng viêm phúc mạc và loại trừ nguyên nhân ngoài bụng.', keyTakeaway: 'Phụ nữ độ tuổi sinh sản đau bụng cấp: thử beta-hCG bắt buộc để loại trừ thai ngoài tử cung.', urgency: 'emergent', hasVault: false, vaultFile: '05. Tiêu hóa & Gan mật/TC_Đau bụng cấp_P1.md', tags: ['Đau bụng cấp', 'Bụng ngoại khoa', 'Viêm phúc mạc'] },
      { n: 2, slug: 'dau-bung-cap-thuong-vi', title: 'Đau bụng cấp vùng Thượng vị', desc: 'Phân biệt thủng tạng rỗng, viêm tụy cấp, loét dạ dày và NMCT thành dưới giả đau dạ dày.', keyTakeaway: 'Luôn đo ECG ở bệnh nhân trung niên/cao tuổi đau thượng vị cấp để không bỏ sót NMCT thành dưới.', urgency: 'emergent', hasVault: true, vaultFile: '05. Tiêu hóa & Gan mật/TC_Đau bụng cấp thượng vị_P1.md', tags: ['Thượng vị', 'Viêm tụy cấp', 'Thủng dạ dày'] },
      { n: 3, slug: 'dau-bung-cap-hsp', title: 'Đau bụng cấp Hạ sườn phải (RUQ)', desc: 'Phân tầng cơn đau quặn mật, viêm túi mật cấp (Tokyo), nhiễm trùng đường mật và áp xe gan.', keyTakeaway: 'Dấu Murphy dương tính kèm sốt và dày thành túi mật > 4 mm: chẩn đoán xác định viêm túi mật cấp.', urgency: 'urgent', hasVault: true, vaultFile: '05. Tiêu hóa & Gan mật/TC_Đau bụng cấp HSP_P1.md', tags: ['HSP', 'Tokyo Guidelines', 'Đường mật'] },
      { n: 4, slug: 'dau-bung-cap-hst', title: 'Đau bụng cấp Hạ sườn trái (LUQ)', desc: 'Tiếp cận vỡ lách, nhồi máu lách, viêm tụy đuôi tụy, loét bờ cong lớn và viêm phổi thùy dưới trái.', keyTakeaway: 'Đau HST kèm dấu Kehr (đau lan vai trái) sau chấn thương: cảnh báo vỡ lách gây xuất huyết nội.', urgency: 'emergent', hasVault: true, vaultFile: '05. Tiêu hóa & Gan mật/TC_Đau bụng cấp HST_P1.md', tags: ['HST', 'Vỡ lách', 'Dấu Kehr'] },
      { n: 5, slug: 'dau-bung-cap-quanh-ron', title: 'Đau bụng cấp vùng Quanh rốn', desc: 'Tắc ruột non, thiếu máu mạc treo cấp, phình tách ĐMC bụng vỡ và giai đoạn sớm viêm ruột thừa.', keyTakeaway: 'Đau bụng dữ dội không tương xứng với khám bụng mềm (Pain out of proportion): nghi ngờ thiếu máu mạc treo.', urgency: 'emergent', hasVault: true, vaultFile: '05. Tiêu hóa & Gan mật/TC_Đau bụng cấp quanh rốn_P1.md', tags: ['Quanh rốn', 'Thiếu máu mạc treo', 'AAA'] },
      { n: 6, slug: 'dau-bung-cap-hcp', title: 'Đau bụng cấp Hố chậu phải (RLQ)', desc: 'Thang điểm Alvarado/AIR cho viêm ruột thừa cấp, viêm túi thừa Meckel, xoắn buồng trứng và thai ngoài tử cung.', keyTakeaway: 'Đau khởi phát thượng vị/quanh rốn rồi khu trú HCP kèm sốt nhẹ: kinh điển của viêm ruột thừa cấp.', urgency: 'emergent', hasVault: true, vaultFile: '05. Tiêu hóa & Gan mật/TC_Đau bụng cấp HCP_P1.md', tags: ['HCP', 'Viêm ruột thừa', 'Alvarado'] },
      { n: 7, slug: 'dau-bung-cap-hct', title: 'Đau bụng cấp Hố chậu trái (LLQ)', desc: 'Viêm túi thừa đại tràng sigma (phân độ Hinchey), xoắn đại tràng sigma, sỏi niệu quản trái và bệnh lý phần phụ.', keyTakeaway: 'CT bụng cản quang là tiêu chuẩn vàng chẩn đoán và phân độ biến chứng viêm túi thừa cấp.', urgency: 'urgent', hasVault: true, vaultFile: '05. Tiêu hóa & Gan mật/TC_Đau bụng cấp HCT_P1.md', tags: ['HCT', 'Viêm túi thừa', 'Hinchey'] },
      { n: 8, slug: 'dau-bung-cap-ha-vi', title: 'Đau bụng cấp vùng Hạ vị', desc: 'Bí tiểu cấp, viêm vùng chậu (PID), xoắn nang buồng trứng, viêm bàng quang cấp và viêm ruột thừa tiểu khung.', keyTakeaway: 'Siêu âm bàng quang tại giường giúp loại trừ ngay cầu bàng quang gây đau hạ vị dữ dội.', urgency: 'urgent', hasVault: true, vaultFile: '05. Tiêu hóa & Gan mật/TC_Đau bụng cấp Hạ vị_P1.md', tags: ['Hạ vị', 'PID', 'Bí tiểu cấp'] },
      { n: 9, slug: 'dau-bung-cap-pnss', title: 'Đau bụng cấp ở Phụ nữ độ tuổi sinh sản', desc: 'Chiến lược ưu tiên loại trừ thai ngoài tử cung vỡ, xoắn phần phụ, vỡ nang hoàng thể và PID.', keyTakeaway: 'Thử thai định tính/định lượng ngay tại giường; siêu âm ngả âm đạo là chìa khóa chẩn đoán.', urgency: 'emergent', hasVault: true, vaultFile: '05. Tiêu hóa & Gan mật/TC_Đau bụng cấp PNSS_P1.md', tags: ['Sản phụ khoa', 'Thai ngoài tử cung', 'Xoắn buồng trứng'] },
      { n: 10, slug: 'dau-bung-cap-nguoi-cao-tuoi', title: 'Đau bụng cấp ở Người cao tuổi', desc: 'Đặc thù triệu chứng nghèo nàn, không sốt, bạch cầu bình thường nhưng tỷ lệ tử vong cao (AAA, thiếu máu mạc treo, thủng).', keyTakeaway: 'Ngưỡng chỉ định CT bụng sớm ở người > 65 tuổi đau bụng cấp phải thấp hơn nhiều so với người trẻ.', urgency: 'emergent', hasVault: true, vaultFile: '05. Tiêu hóa & Gan mật/TC_Đau bụng cấp NCT_P1.md', tags: ['Lão khoa', 'AAA', 'Chẩn đoán sớm'] },
      { n: 11, slug: 'dau-bung-man', title: 'Tiếp cận Đau bụng mạn tính', desc: 'Phân biệt thực thể (loét, IBD, ác tính) với rối loạn chức năng (IBS tiêu chuẩn Rome IV, khó tiêu chức năng).', keyTakeaway: 'Sụt cân, thiếu máu thiếu sắt, đi cầu ra máu hoặc khởi phát > 50 tuổi: chỉ định nội soi loại trừ ác tính.', urgency: 'routine', hasVault: true, vaultFile: '05. Tiêu hóa & Gan mật/TC_Đau bụng mạn_P1.md', tags: ['Đau bụng mạn', 'Rome IV', 'Red Flags'] },
      { n: 12, slug: 'buon-non-non-oi', title: 'Tiếp cận Buồn nôn & Nôn ói', desc: 'Phân biệt nôn cấp vs mạn, nguyên nhân tiêu hóa vs thần kinh (tăng ALNS), chuyển hóa (DKA, tăng ure) và thai kỳ.', keyTakeaway: 'Nôn vọt không buồn nôn kèm đau đầu sáng sớm: báo động tăng áp lực nội sọ.', urgency: 'urgent', hasVault: true, vaultFile: '05. Tiêu hóa & Gan mật/TC_Buồn nôn, nôn ói_P1.md', tags: ['Nôn ói', 'Tắc ruột', 'Tăng ALNS'] },
      { n: 13, slug: 'nuot-kho', title: 'Tiếp cận Nuốt khó (Dysphagia)', desc: 'Phân định nuốt khó hầu họng (sặc, ho) vs thực quản; thức ăn đặc tăng dần (u) vs cả đặc lẫn lỏng (co thắt tâm vị).', keyTakeaway: 'Nuốt khó tiến triển nhanh từ đặc sang lỏng ở người > 50 tuổi kèm sụt cân: nội soi sinh thiết loại trừ ung thư thực quản.', urgency: 'urgent', hasVault: true, vaultFile: '05. Tiêu hóa & Gan mật/TC_Nuốt khó_P1.md', tags: ['Nuốt khó', 'Thực quản', 'Nội soi'] },
      { n: 14, slug: 'tieu-chay', title: 'Tiếp cận Tiêu chảy (Cấp & Mạn)', desc: 'Phân tầng mất nước, tiêu chảy xâm nhập vs không xâm nhập, tiêu chảy thẩm thấu vs tiết dịch vs kém hấp thu.', keyTakeaway: 'Tính khoảng trống thẩm thấu phân (Stool Osmotic Gap) giúp tách bạch tiêu chảy thẩm thấu và tiết dịch.', urgency: 'urgent', hasVault: true, vaultFile: '05. Tiêu hóa & Gan mật/TC_Tiêu chảy_P1.md', tags: ['Tiêu chảy', 'ORS', 'C. difficile'] },
      { n: 15, slug: 'tao-bon', title: 'Táo bón & Thay đổi thói quen đi tiêu', desc: 'Phân loại táo bón nguyên phát (chậm lưu thông, rối loạn tống phân) vs thứ phát và dấu hiệu báo động đại trực tràng.', keyTakeaway: 'Thay đổi thói quen đi tiêu mới xuất hiện ở người ≥ 45–50 tuổi: chỉ định nội soi đại tràng tầm soát.', urgency: 'routine', hasVault: true, vaultFile: '05. Tiêu hóa & Gan mật/TC_Táo bón & Thay đổi thói quen đi tiêu_P1.md', tags: ['Táo bón', 'Bristol', 'Ung thư đại tràng'] },
      { n: 16, slug: 'xuat-huyet-tieu-hoa-tren', title: 'Tiếp cận Xuất huyết tiêu hóa trên (UGIB)', desc: 'Hồi sức huyết động, phân tầng Glasgow-Blatchford & Rockall, phân biệt do tăng áp cửa (giãn TMTQ) vs loét.', keyTakeaway: 'Truyền hồng cầu lắng theo ngưỡng hạn chế (Hb < 7 g/dL) và nội soi trong vòng 12–24 giờ sau ổn định.', urgency: 'emergent', hasVault: true, vaultFile: '05. Tiêu hóa & Gan mật/TC_Xuất huyết tiêu hóa trên_P1.md', tags: ['UGIB', 'Blatchford', 'Giãn TMTQ'] },
      { n: 17, slug: 'xuat-huyet-tieu-hoa-duoi', title: 'Tiếp cận Xuất huyết tiêu hóa dưới (LGIB)', desc: 'Phân tầng thang điểm Oakland, loại trừ UGIB chảy ồ ạt, túi thừa, dị sản mạch máu và chỉ định CTA/nội soi.', keyTakeaway: '10–15% trường hợp đi cầu máu đỏ tươi có rối loạn huyết động thực chất có nguồn gốc từ XHTH trên.', urgency: 'emergent', hasVault: true, vaultFile: '05. Tiêu hóa & Gan mật/TC_Xuất huyết tiêu hóa dưới_P1.md', tags: ['LGIB', 'Oakland Score', 'CTA'] },
      { n: 18, slug: 'vang-da', title: 'Tiếp cận Vàng da (Jaundice)', desc: 'Phân tầng Bilirubin gián tiếp (trước gan/Gilbert) vs trực tiếp (tại gan vs tắc mật sau gan qua siêu âm).', keyTakeaway: 'Vàng da không đau tăng dần kèm túi mật to (dấu Courvoisier): cảnh báo u đầu tụy hoặc u bóng Vater.', urgency: 'urgent', hasVault: false, vaultFile: '05. Tiêu hóa & Gan mật/TC_Vàng da_P1.md', tags: ['Vàng da', 'Bilirubin', 'Tắc mật'] },
      { n: 19, slug: 'bat-thuong-men-gan', title: 'Tiếp cận Bất thường Men gan & Chức năng gan', desc: 'Tính tỷ số R-factor phân biệt kiểu hủy tế bào gan (AST/ALT) vs ứ mật (ALP/GGT) và ngưỡng suy gan cấp.', keyTakeaway: 'AST/ALT > 1000 U/L hướng về 3 nhóm chính: thiếu máu gan (shock liver), ngộ độc Paracetamol và viêm gan virus cấp.', urgency: 'urgent', hasVault: true, vaultFile: '05. Tiêu hóa & Gan mật/TC_Bất thường chức năng gan men gan_P1.md', tags: ['Men gan', 'R-factor', 'Suy gan cấp'] },
      { n: 20, slug: 'bang-bung', title: 'Tiếp cận Báng bụng (Ascites)', desc: 'Chọc dịch báng chẩn đoán, tính SAAG (≥ 1.1 g/dL tăng áp cửa) và phát hiện sớm viêm phúc mạc tự phát (SBP).', keyTakeaway: 'Mọi bệnh nhân xơ gan báng bụng mới nhập viện đều cần chọc dịch báng sớm loại trừ SBP (PMN ≥ 250/µL).', urgency: 'urgent', hasVault: false, vaultFile: '05. Tiêu hóa & Gan mật/TC_Báng bụng_P1.md', tags: ['Báng bụng', 'SAAG', 'SBP'] },
      { n: 21, slug: 'truong-bung', title: 'Tiếp cận Trướng bụng (Abdominal Distension)', desc: 'Quy tắc 6F (Fluid, Flatus, Fat, Feces, Fetus, Fatal growth) và loại trừ tắc ruột/liệt ruột cấp.', keyTakeaway: 'Trướng bụng kèm bí trung đại tiện và âm ruột tăng âm sắc kim loại: tắc ruột cơ học.', urgency: 'urgent', hasVault: false, vaultFile: '05. Tiêu hóa & Gan mật/TC_Trướng bụng_P1.md', tags: ['Trướng bụng', '6F', 'Tắc ruột'] },
      { n: 22, slug: 'khoi-o-bung', title: 'Tiếp cận Khối ở bụng', desc: 'Phân biệt khối thành bụng (nghiệm pháp Carnett) với khối trong ổ bụng và dấu hiệu khối đập theo nhịp mạch.', keyTakeaway: 'Khối đập theo nhịp mạch vùng giữa bụng: tuyệt đối không ấn mạnh — siêu âm ngay loại trừ phình ĐMC bụng.', urgency: 'urgent', hasVault: false, vaultFile: '05. Tiêu hóa & Gan mật/TC_Khối ở bụng_P1.md', tags: ['Khối bụng', 'Carnett', 'Phình ĐMC'] }
    ], 41)
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
    badge: '13 bài • 1 Golden',
    description: 'Tiếp cận tổn thương thận cấp AKI, tiểu máu, tiểu đạm, phù và trọn bộ rối loạn Natri, Kali, Canxi máu.',
    clinicalObjective: 'Vận dụng sinh lý ống thận (UOsm, UNa, FENa, TTKG) để chẩn đoán chính xác và điều chỉnh điện giải an toàn.',
    lessons: buildLessons(7, 'ck07-than-dien-giai', 'Thận – Tiết Niệu & Nước – Điện Giải', 'TDG', [
      { n: 1, slug: 'ton-thuong-than-cap-aki', title: 'Tiếp cận Tổn thương thận cấp (AKI)', desc: 'Phân độ KDIGO, phân biệt Trước thận – Tại thận – Sau thận bằng siêu âm bàng quang, cặn lắng và FENa/FEUrea.', keyTakeaway: 'Siêu âm thận-bàng quang sớm để loại trừ nguyên nhân sau thận có thể đảo ngược ngay lập tức.', urgency: 'emergent', hasVault: true, vaultFile: '06. Thận - Tiết niệu/TC_Tổn thương thận cấp (AKI)_P1.md', tags: ['AKI', 'KDIGO', 'FENa'] },
      { n: 2, slug: 'hoi-chung-ure-huyet-cao', title: 'Tiếp cận Hội chứng Ure huyết cao', desc: 'Nhận diện chỉ định lọc máu cấp cứu AEIOU (viêm màng ngoài tim, bệnh não ure, toan nặng, quá tải dịch, tăng K+).', keyTakeaway: 'Tiếng cọ màng ngoài tim hoặc lú lẫn tiến triển ở bệnh nhân suy thận: chỉ định lọc máu cấp cứu.', urgency: 'emergent', hasVault: false, vaultFile: '01. Toàn thân & Cấp cứu/TC_Hội chứng ure huyết cao_P1.md', tags: ['Ure huyết cao', 'AEIOU', 'Lọc máu'] },
      { n: 3, slug: 'tieu-mau', title: 'Tiếp cận Tiểu máu (Hematuria)', desc: 'Phân biệt tiểu máu cầu thận (hồng cầu biến dạng, trụ hồng cầu) vs ngoài cầu thận (máu cục, sỏi, u niệu).', keyTakeaway: 'Tiểu máu đại thể không đau ở người > 40 tuổi: tầm soát ung thư đường tiết niệu bằng CT niệu & soi bàng quang.', urgency: 'urgent', hasVault: false, vaultFile: '06. Thận - Tiết niệu/TC_Tiểu máu_P1.md', tags: ['Tiểu máu', 'Cầu thận', 'Soi cặn lắng'] },
      { n: 4, slug: 'tieu-dam', title: 'Tiếp cận Tiểu đạm (Proteinuria)', desc: 'Phân loại tiểu đạm thoáng qua, tư thế, cầu thận (uACR/uPCR) và ngưỡng hội chứng thận hư (≥ 3.5 g/24h).', keyTakeaway: 'Que nhúng chỉ nhạy với Albumin; nghi ngờ đa u tủy xương (chuỗi nhẹ) phải định lượng Protein toàn phần niệu.', urgency: 'routine', hasVault: false, vaultFile: '06. Thận - Tiết niệu/TC_Tiểu đạm_P1.md', tags: ['Tiểu đạm', 'uACR', 'Thận hư'] },
      { n: 5, slug: 'roi-loan-di-tieu', title: 'Tiếp cận Rối loạn đi tiểu (LUTS)', desc: 'Phân biệt triệu chứng chứa đựng (tiểu gắt, tiểu gấp) vs tống xuất (tiểu ngập ngừng, tia yếu) và bí tiểu cấp.', keyTakeaway: 'Bí tiểu cấp kèm yếu hai chi dưới hoặc tê vùng yên ngựa: cấp cứu hội chứng chùm đuôi ngựa.', urgency: 'urgent', hasVault: false, vaultFile: '06. Thận - Tiết niệu/TC_Rối loạn đi tiểu_P1.md', tags: ['LUTS', 'BPH', 'Bí tiểu'] },
      { n: 6, slug: 'sung-dau-vung-biu', title: 'Tiếp cận Sưng đau vùng bìu cấp', desc: 'Phân biệt xoắn tinh hoàn (cửa sổ vàng 6 giờ) với viêm mào tinh-tinh hoàn bằng dấu Prehn và Doppler.', keyTakeaway: 'Nghi ngờ cao xoắn tinh hoàn: phẫu thuật thám sát ngay trong 6 giờ vàng, không trì hoãn chờ siêu âm.', urgency: 'emergent', hasVault: false, vaultFile: '06. Thận - Tiết niệu/TC_Sưng đau vùng bìu_P1.md', tags: ['Xoắn tinh hoàn', 'Cấp cứu niệu', 'Doppler'] },
      { n: 7, slug: 'phu', title: 'Tiếp cận Phù (Edema)', desc: 'Phân biệt phù toàn thân (Tim, Gan, Thận, Suy giáp) vs phù khu trú 1 bên (DVT, suy tĩnh mạch, phù bạch huyết).', keyTakeaway: 'Phù mềm ấn lõm 1 chân khởi phát cấp kèm đau bắp chân: tính điểm Wells và siêu âm Doppler loại trừ DVT.', urgency: 'urgent', hasVault: false, vaultFile: '01. Toàn thân & Cấp cứu/TC_Phù (Edema)_P1.md', tags: ['Phù', 'Starling', 'DVT'] },
      { n: 8, slug: 'roi-loan-nuoc-dien-giai-tong-quan', title: 'Tổng quan Rối loạn Nước & Điện giải', desc: 'Khung sinh lý phân bố dịch khoang nội/ngoại bào, áp lực thẩm thấu hữu hiệu và lựa chọn dịch truyền.', keyTakeaway: 'Rối loạn Natri là rối loạn nước tự do; rối loạn thể tích ngoại bào là rối loạn tổng lượng Natri.', urgency: 'urgent', hasVault: false, vaultFile: '01. Toàn thân & Cấp cứu/TC_Rối loạn nước & chất, điện giải_P1.md', tags: ['Thể dịch', 'Thẩm thấu', 'Dịch truyền'] },
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
      },
      { n: 10, slug: 'tang-natri-mau', title: 'Tiếp cận Tăng Natri máu (Hypernatremia)', desc: 'Cơ chế thiếu nước tự do, phân biệt mất nước ngoài thận vs đái tháo nhạt (AVP-D/AVP-R) và tính lượng nước thiếu.', keyTakeaway: 'Tăng Natri mạn phải bù nước chậm (≤ 10 mmol/L/24h) để tránh phù não hồi ứng.', urgency: 'emergent', hasVault: true, vaultFile: '01. Toàn thân & Cấp cứu/TC_Tăng Natri máu_P1.md', tags: ['Tăng Natri', 'Đái tháo nhạt', 'Free Water Deficit'] },
      { n: 11, slug: 'ha-kali-mau', title: 'Tiếp cận Hạ Kali máu (Hypokalemia)', desc: 'Nhận diện sóng U/đoạn ST chênh xuống trên ECG, phân biệt mất qua thận vs tiêu hóa và vai trò đồng hành của Magie.', keyTakeaway: 'Hạ Kali kháng trị thường đi kèm hạ Magie máu — bắt buộc kiểm tra và bù Magie song song.', urgency: 'emergent', hasVault: true, vaultFile: '01. Toàn thân & Cấp cứu/TC_Hạ Kali máu_P1.md', tags: ['Hạ Kali', 'Sóng U', 'Magie'] },
      { n: 12, slug: 'tang-kali-mau', title: 'Tiếp cận Tăng Kali máu (Hyperkalemia)', desc: 'Loại trừ giả tăng Kali, đọc biến đổi ECG theo bậc và phác đồ 3 trụ cột (Ổn định màng – Đẩy nội bào – Thải trừ).', keyTakeaway: 'Có biến đổi ECG (T cao nhọn, giãn QRS): tiêm ngay Canxi Gluconate tĩnh mạch bảo vệ cơ tim trong 1–3 phút.', urgency: 'emergent', hasVault: true, vaultFile: '01. Toàn thân & Cấp cứu/TC_Tăng Kali máu_P1.md', tags: ['Tăng Kali', 'Canxi Gluconate', 'ECG'] },
      { n: 13, slug: 'ha-canxi-mau', title: 'Tiếp cận Hạ Canxi máu (Hypocalcemia)', desc: 'Hiệu chỉnh theo Albumin hoặc đo Canxi ion hóa, dấu Chvostek/Trousseau, QT kéo dài và trục PTH – Vitamin D.', keyTakeaway: 'Hạ Canxi có cơn tetany, co thắt thanh quản hoặc QT kéo dài: tiêm chậm Canxi Gluconate TM có monitor ECG.', urgency: 'emergent', hasVault: true, vaultFile: '01. Toàn thân & Cấp cứu/TC_Hạ Canxi máu_P1.md', tags: ['Hạ Canxi', 'PTH', 'Trousseau'] }
    ], 63)
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
    badge: '4 bài',
    description: 'Tiếp cận đau đầu (SNOOP10), chóng mặt (TiTrATE & HINTS), co giật – trạng thái động kinh và rối loạn ý thức.',
    clinicalObjective: 'Phân biệt nhanh tổn thương thần kinh trung ương đe dọa tính mạng với nguyên nhân ngoại biên lành tính.',
    lessons: buildLessons(8, 'ck08-than-kinh', 'Thần Kinh', 'TK', [
      { n: 1, slug: 'dau-dau', title: 'Tiếp cận Đau đầu & Cờ đỏ SNOOP10', desc: 'Loại trừ xuất huyết dưới nhện (sét đánh), viêm màng não, viêm động mạch thái dương và phân biệt đau đầu nguyên phát.', keyTakeaway: 'Đau đầu sét đánh đạt đỉnh trong < 1 phút là xuất huyết dưới nhện cho đến khi CT + DNT loại trừ.', urgency: 'emergent', hasVault: false, vaultFile: '02. Thần kinh/TC_Đau đầu_P1.md', tags: ['Đau đầu', 'SNOOP10', 'SAH'] },
      { n: 2, slug: 'chong-mat', title: 'Tiếp cận Chóng mặt (TiTrATE & HINTS)', desc: 'Phân loại theo thời gian và yếu tố khởi phát (AVS, t-EVS, s-EVS); ứng dụng HINTS phân biệt đột quỵ tiểu não vs viêm dây tiền đình.', keyTakeaway: 'Trong hội chứng tiền đình cấp (AVS), nghiệm pháp HINTS chuẩn xác nhạy hơn cả MRI sớm < 48h.', urgency: 'emergent', hasVault: false, vaultFile: '02. Thần kinh/TC_Chóng mặt_P1.md', tags: ['Chóng mặt', 'HINTS', 'TiTrATE'] },
      { n: 3, slug: 'co-giat-va-dong-kinh', title: 'Tiếp cận Co giật & Cơn động kinh', desc: 'Phân biệt co giật thực sự với ngất/PNES, tìm nguyên nhân kích phát và xử trí trạng thái động kinh (> 5 phút).', keyTakeaway: 'Cơn co giật kéo dài > 5 phút là trạng thái động kinh — cắt cơn ngay bằng Benzodiazepine.', urgency: 'emergent', hasVault: false, vaultFile: '02. Thần kinh/TC_Co giật & Cơn động kinh_P1.md', tags: ['Co giật', 'Status Epilepticus', 'EEG'] },
      { n: 4, slug: 'roi-loan-y-thuc', title: 'Tiếp cận Rối loạn ý thức & Hôn mê', desc: 'Đánh giá GCS, đồng tử, phản xạ thân não và phân biệt tổn thương cấu trúc (khu trú) vs chuyển hóa-nhiễm độc (lan tỏa).', keyTakeaway: 'Đồng tử giãn 1 bên mất phản xạ ánh sáng ở bệnh nhân hôn mê: dấu hiệu thoát vị hồi hải mã tối khẩn.', urgency: 'emergent', hasVault: false, vaultFile: '02. Thần kinh/TC_Rối loạn ý thức_P1.md', tags: ['Hôn mê', 'GCS', 'Thân não'] }
    ], 76)
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
    badge: '4 bài',
    description: 'Tiếp cận thiếu máu theo MCV & hồng cầu lưới, bất thường bạch cầu, bất thường tiểu cầu và rối loạn đông cầm máu.',
    clinicalObjective: 'Đọc sâu huyết đồ ngoại biên và nhận diện các cấp cứu huyết học (TTP, DIC, sốt giảm bạch cầu hạt).',
    lessons: buildLessons(9, 'ck09-huyet-hoc-mien-dich', 'Huyết Học – Miễn Dịch', 'HM', [
      { n: 1, slug: 'thieu-mau', title: 'Tiếp cận Thiếu máu (Anemia)', desc: 'Phân tầng theo MCV (nhỏ, bình thường, to) kết hợp chỉ số hồng cầu lưới (RPI) và phết máu ngoại biên.', keyTakeaway: 'Thiếu máu thiếu sắt ở nam giới hoặc phụ nữ mãn kinh: bắt buộc tầm soát xuất huyết tiêu hóa rỉ rả.', urgency: 'urgent', hasVault: false, vaultFile: '07. Huyết học & Miễn dịch/TC_Thiếu máu_P1.md', tags: ['Thiếu máu', 'MCV', 'Reticulocyte'] },
      { n: 2, slug: 'bat-thuong-bach-cau', title: 'Tiếp cận Bất thường tế bào Bạch cầu', desc: 'Phân biệt phản ứng dạng bạch cầu với bệnh bạch cầu cấp/mạn; xử trí khẩn sốt giảm bạch cầu hạt (ANC < 500).', keyTakeaway: 'Sốt + ANC < 500/µL là cấp cứu nội khoa: cấy máu và tiêm kháng sinh phủ Pseudomonas trong 60 phút.', urgency: 'emergent', hasVault: true, vaultFile: '07. Huyết học & Miễn dịch/TC_Bất thường tế bào bạch cầu_P1.md', tags: ['Bạch cầu', 'Febrile Neutropenia', 'Blast'] },
      { n: 3, slug: 'bat-thuong-tieu-cau', title: 'Tiếp cận Bất thường Tiểu cầu', desc: 'Loại trừ giả giảm tiểu cầu (EDTA), phân biệt tiêu thụ (TTP, DIC, HIT) với giảm sản xuất và tăng tiểu cầu.', keyTakeaway: 'Giảm tiểu cầu + thiếu máu tán huyết vi mạch (mảnh vỡ hồng cầu): nghĩ ngay TTP — tính PLASMIC Score.', urgency: 'emergent', hasVault: false, vaultFile: '07. Huyết học & Miễn dịch/TC_Bất thường tiểu cầu_P1.md', tags: ['Tiểu cầu', 'TTP', 'ITP', 'HIT'] },
      { n: 4, slug: 'xuat-huyet-bat-thuong', title: 'Tiếp cận Xuất huyết bất thường (Chảy máu – Bầm máu)', desc: 'Phân biệt rối loạn cầm máu sơ cấp (chấm xuất huyết da niêm) vs thứ cấp (tụ máu cơ/khớp) qua PT, aPTT, Mixing test.', keyTakeaway: 'PT và aPTT cùng kéo dài kèm giảm tiểu cầu và Fibrinogen thấp: cảnh báo đông máu nội mạch lan tỏa (DIC).', urgency: 'emergent', hasVault: false, vaultFile: '07. Huyết học & Miễn dịch/TC_Xuất huyết bất thường (Chảy máu Bầm máu)_P1.md', tags: ['Đông máu', 'DIC', 'PT/aPTT'] }
    ], 80)
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
    badge: '7 bài',
    description: 'Tiếp cận rối loạn đường huyết (hạ/tăng đường huyết, DKA/HHS), tuyến giáp, khối ở cổ, Cushing, béo phì, suy dinh dưỡng và sụt cân.',
    clinicalObjective: 'Vận dụng trục phản hồi ngược nội tiết và nhận diện cơn bão giáp, DKA/HHS và hạ đường huyết nặng.',
    lessons: buildLessons(10, 'ck10-noi-tiet-dinh-duong', 'Nội Tiết – Chuyển Hóa – Dinh Dưỡng', 'NT', [
      { n: 1, slug: 'roi-loan-duong-huyet', title: 'Tiếp cận Rối loạn Đường huyết (Tăng & Hạ đường huyết)', desc: 'Tam chứng Whipple cho hạ đường huyết; chẩn đoán và phân biệt DKA vs HHS ở bệnh nhân tăng đường huyết cấp.', keyTakeaway: 'Trong DKA/HHS, kiểm tra Kali máu trước khi truyền Insulin — nếu K+ < 3.3 mmol/L phải bù Kali trước.', urgency: 'emergent', hasVault: true, vaultFile: '10. Nội tiết & Chuyển hóa/TC_Rối loạn đường huyết_P1.md', tags: ['Đường huyết', 'DKA/HHS', 'Whipple'] },
      { n: 2, slug: 'roi-loan-chuc-nang-tuyen-giap', title: 'Tiếp cận Rối loạn chức năng Tuyến giáp', desc: 'Diễn giải trục TSH – FT4, thang điểm Burch-Wartofsky cho bão giáp và nhận diện hôn mê phù niêm.', keyTakeaway: 'TSH là xét nghiệm tầm soát nhạy nhất cho rối loạn tuyến giáp nguyên phát nhưng mất giá trị trong suy tuyến yên.', urgency: 'urgent', hasVault: false, vaultFile: '10. Nội tiết & Chuyển hóa/TC_Rối loạn chức năng tuyến giáp_P1.md', tags: ['Tuyến giáp', 'TSH', 'Bão giáp'] },
      { n: 3, slug: 'khoi-o-co', title: 'Tiếp cận Khối ở cổ (Neck Mass)', desc: 'Phân vùng tam giác cổ, quy tắc số 7 (7 ngày viêm – 7 tháng u – 7 năm bẩm sinh) và phân tầng siêu âm TI-RADS.', keyTakeaway: 'Khối cổ cứng, không đau, tồn tại > 2 tuần ở người lớn hút thuốc/uống rượu: loại trừ ung thư đầu cổ bằng FNA/CT.', urgency: 'routine', hasVault: true, vaultFile: '10. Nội tiết & Chuyển hóa/TC_Khối ở cổ_P1.md', tags: ['Khối cổ', 'TI-RADS', 'FNA'] },
      { n: 4, slug: 'hoi-chung-cushing', title: 'Tiếp cận Hội chứng Cushing', desc: 'Loại trừ Cushing ngoại sinh do corticoid, 3 test tầm soát chuẩn và phân biệt phụ thuộc vs không phụ thuộc ACTH.', keyTakeaway: 'Luôn hỏi kỹ tiền sử dùng thuốc nam/thuốc gia truyền/thuốc khớp chứa Corticoid trước khi làm xét nghiệm nội tiết.', urgency: 'routine', hasVault: false, vaultFile: '10. Nội tiết & Chuyển hóa/TC_Hội chứng Cushing_P1.md', tags: ['Cushing', 'Cortisol', 'ACTH'] },
      { n: 5, slug: 'beo-phi', title: 'Tiếp cận Béo phì (Obesity)', desc: 'Phân độ BMI châu Á-Thái Bình Dương, vòng eo, tầm soát nguyên nhân nội tiết thứ phát và biến chứng chuyển hóa.', keyTakeaway: 'Đánh giá toàn diện biến chứng chuyển hóa (MASLD, OSA, ĐTĐ typ 2, THA) theo mô hình EOSS.', urgency: 'routine', hasVault: false, vaultFile: '01. Toàn thân & Cấp cứu/TC_Béo phì_P1.md', tags: ['Béo phì', 'BMI châu Á', 'Hội chứng chuyển hóa'] },
      { n: 6, slug: 'suy-dinh-duong', title: 'Tiếp cận Suy dinh dưỡng & Hội chứng Nuôi ăn lại', desc: 'Sàng lọc theo tiêu chuẩn GLIM, đánh giá nguy cơ Refeeding Syndrome (hạ Phosphat, Kali, Magie) và bổ sung Thiamine.', keyTakeaway: 'Phòng Hội chứng Nuôi ăn lại (Refeeding): khởi đầu năng lượng chậm và bổ sung Thiamine + Phosphat sớm.', urgency: 'urgent', hasVault: true, vaultFile: '01. Toàn thân & Cấp cứu/TC_Suy dinh dưỡng_P1.md', tags: ['Suy dinh dưỡng', 'GLIM', 'Refeeding'] },
      { n: 7, slug: 'sut-can', title: 'Tiếp cận Sụt cân không chủ ý', desc: 'Định nghĩa > 5% trọng lượng trong 6–12 tháng; phân nhóm 3 nhóm chính (Ác tính, Nội khoa mạn, Tâm thần-Xã hội).', keyTakeaway: 'Khai thác lượng ăn vào để phân tách sụt cân kèm tăng thèm ăn (Cường giáp, ĐTĐ, kém hấp thu) với chán ăn.', urgency: 'routine', hasVault: false, vaultFile: '01. Toàn thân & Cấp cứu/TC_Sụt cân_P1.md', tags: ['Sụt cân', 'Tầm soát ác tính', 'Nội tiết'] }
    ], 84)
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
    badge: '3 bài',
    description: 'Tiếp cận đau lưng (cờ đỏ chùm đuôi ngựa), đau cổ (chèn ép tủy cổ) và đau khớp/chi không do chấn thương.',
    clinicalObjective: 'Sàng lọc dấu hiệu chèn ép thần kinh cấp cứu, nhiễm trùng cột sống/khớp và tránh lạm dụng MRI không cần thiết.',
    lessons: buildLessons(11, 'ck11-co-xuong-khop', 'Cơ Xương Khớp', 'CXK', [
      { n: 1, slug: 'dau-lung', title: 'Tiếp cận Đau lưng (Low Back Pain)', desc: 'Sàng lọc cờ đỏ hội chứng chùm đuôi ngựa, áp xe ngoài màng cứng, di căn xương và phình ĐMC bụng.', keyTakeaway: 'Đau lưng cấp không cờ đỏ không cần chụp X-quang hay MRI thường quy trong 4–6 tuần đầu.', urgency: 'urgent', hasVault: true, vaultFile: '08. Cơ xương khớp/TC_Đau lưng_P1.md', tags: ['Đau lưng', 'Chùm đuôi ngựa', 'Red Flags'] },
      { n: 2, slug: 'dau-co', title: 'Tiếp cận Đau cổ (Neck Pain)', desc: 'Phân biệt đau cổ cơ học, bệnh rễ cổ (Spurling) và bệnh tủy cổ (Hoffmann, rối loạn dáng đi).', keyTakeaway: 'Đau cổ kèm yếu tứ chi, dấu Lhermitte hoặc tăng phản xạ gân xương: chỉ định MRI cột sống cổ khẩn.', urgency: 'urgent', hasVault: true, vaultFile: '08. Cơ xương khớp/TC_Đau cổ_P1.md', tags: ['Đau cổ', 'Bệnh tủy cổ', 'Spurling'] },
      { n: 3, slug: 'dau-khop-chi', title: 'Tiếp cận Đau khớp & Chi không do chấn thương', desc: 'Phân biệt tại khớp vs quanh khớp, kiểu viêm vs cơ học, đơn khớp vs đa khớp và chọc hút dịch khớp.', keyTakeaway: 'Viêm đơn khớp cấp tính luôn cần chọc dịch khớp soi tinh thể và nhuộm Gram/cấy vi khuẩn.', urgency: 'urgent', hasVault: false, vaultFile: '08. Cơ xương khớp/TC_Đau khớp, chi không do chấn thương_P1.md', tags: ['Đau khớp', 'Gout', 'Viêm khớp'] }
    ], 91)
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
    badge: '2 bài',
    description: 'Tiếp cận thương tổn cơ bản phát ban da (nhận diện SJS/TEN, DRESS, viêm cân hoại tử) và tiếp cận ngứa toàn thân.',
    clinicalObjective: 'Mô tả chính xác sang thương cơ bản và phát hiện sớm các phản ứng thuốc trên da đe dọa tính mạng.',
    lessons: buildLessons(12, 'ck12-da-lieu', 'Da Liễu', 'DL', [
      { n: 1, slug: 'phat-ban-ton-thuong-da', title: 'Tiếp cận Phát ban & Thương tổn da cơ bản', desc: 'Phân loại sang thương (dát, sẩn, mảng, mụn nước, bóng nước, tử ban) và nhận diện cấp cứu da liễu SJS/TEN, DRESS.', keyTakeaway: 'Đau da dữ dội, dấu Nikolsky dương tính và trợt niêm mạc miệng/mắt: cấp cứu SJS/TEN — ngưng ngay thuốc nghi ngờ.', urgency: 'emergent', hasVault: true, vaultFile: '01. Toàn thân & Cấp cứu/TC_Phát ban (Rash, Skin Lesion)_P1.md', tags: ['Phát ban', 'SJS/TEN', 'Nikolsky'] },
      { n: 2, slug: 'ngua-pruritus', title: 'Tiếp cận Ngứa (Pruritus)', desc: 'Phân biệt ngứa kèm sang thương da nguyên phát vs ngứa không sang thương do bệnh hệ thống (ứ mật, suy thận, lymphoma).', keyTakeaway: 'Ngứa toàn thân mạn không có sang thương da nguyên phát: làm CTM, men gan, Creatinin, TSH và X-quang ngực.', urgency: 'routine', hasVault: false, vaultFile: '09. Da liễu/TC_Ngứa (Pruritus)_P1.md', tags: ['Ngứa', 'Ứ mật', 'Bệnh hệ thống'] }
    ], 94)
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
    badge: '16 bài • 1 Golden',
    description: 'Tiếp cận toàn diện 16 triệu chứng và hội chứng cốt lõi ở trẻ em theo chuẩn Nhi khoa YDS, WHO IMCI, AAP & NICE.',
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
      },
      { n: 2, slug: 'ho-o-tre', title: 'Tiếp cận Ho ở trẻ em', desc: 'Phân biệt ho cấp (viêm tiểu phế quản, viêm phổi, Croup) vs ho kéo dài > 4 tuần (hen, ho gà, dị vật bỏ quên).', keyTakeaway: 'Đếm nhịp thở đủ 60 giây khi trẻ yên và quan sát rút lõm lồng ngực theo ngưỡng tuổi WHO.', urgency: 'urgent', hasVault: true, vaultFile: '11. Nhi khoa/TC_Tiếp cận ho ở trẻ em_P1.md', tags: ['Ho trẻ em', 'Viêm phổi', 'IMCI'] },
      { n: 3, slug: 'kho-khe-o-tre', title: 'Tiếp cận Khò khè ở trẻ em', desc: 'Phân biệt khò khè lần đầu (viêm tiểu phế quản, dị vật) với khò khè tái phát (hen nhũ nhi, mềm sụn thanh quản).', keyTakeaway: 'Khò khè khởi phát đột ngột sau cơn sặc ở trẻ 1–3 tuổi: hội chứng xâm nhập dị vật đường thở.', urgency: 'urgent', hasVault: true, vaultFile: '11. Nhi khoa/TC_Tiếp cận khò khè ở trẻ_P1.md', tags: ['Khò khè', 'Viêm tiểu phế quản', 'Hen trẻ em'] },
      { n: 4, slug: 'tre-tim', title: 'Tiếp cận Trẻ Tím', desc: 'Nghiệm pháp tăng oxy (Hyperoxia test) phân biệt tím do tim bẩm sinh với bệnh phổi và xử trí cơn tím thiếu oxy.', keyTakeaway: 'Trẻ tứ chứng Fallot lên cơn tím: đặt tư thế gối-ngực (knee-chest), thở oxy và Morphine.', urgency: 'emergent', hasVault: true, vaultFile: '11. Nhi khoa/TC_Tiếp cận trẻ tím_P1.md', tags: ['Trẻ tím', 'Hyperoxia Test', 'Fallot'] },
      { n: 5, slug: 'tim-bam-sinh-o-tre', title: 'Tiếp cận Tim bẩm sinh ở trẻ em', desc: 'Phân loại 4 nhóm (Tím/Không tím × Tăng/Giảm tuần hoàn phổi) qua X-quang ngực, ECG và mạch tứ chi.', keyTakeaway: 'Luôn bắt mạch bẹn song song mạch quay và đo SpO2 tay phải vs chân để sàng lọc hẹp eo ĐMC.', urgency: 'urgent', hasVault: true, vaultFile: '11. Nhi khoa/TC_Tiếp cận tim bẩm sinh ở trẻ em_P1.md', tags: ['Tim bẩm sinh', 'Shunt', 'SpO2'] },
      { n: 6, slug: 'tim-bam-sinh-nang-so-sinh', title: 'Tiếp cận Tim bẩm sinh nặng phụ thuộc ống động mạch ở Sơ sinh', desc: 'Nhận diện sốc tim/tím nặng tuần đầu sau sinh khi đóng ống động mạch và chỉ định truyền Prostaglandin E1 (PGE1).', keyTakeaway: 'Sơ sinh sốc hoặc tím nặng không đáp ứng oxy: truyền ngay PGE1 duy trì ống động mạch trước khi chuyển viện.', urgency: 'emergent', hasVault: true, vaultFile: '11. Nhi khoa/TC_Tiếp cận tim bẩm sinh nặng ở sơ sinh_P1.md', tags: ['Sơ sinh', 'PGE1', 'Ống động mạch'] },
      { n: 7, slug: 'dau-bung-o-tre', title: 'Tiếp cận Đau bụng cấp & mạn ở trẻ em', desc: 'Phân tầng theo tuổi: lồng ruột (nhũ nhi), xoắn ruột trung tràng, viêm ruột thừa, DKA và đau bụng chức năng.', keyTakeaway: 'Trẻ 6–24 tháng khóc thét từng cơn co chân, nôn, tiêu nhầy máu: siêu âm ngay tìm khối lồng ruột.', urgency: 'emergent', hasVault: true, vaultFile: '11. Nhi khoa/TC_Tiếp cận đau bụng ở trẻ_P1.md', tags: ['Đau bụng trẻ em', 'Lồng ruột', 'Viêm ruột thừa'] },
      { n: 8, slug: 'tre-non-oi-nhieu', title: 'Tiếp cận Trẻ Nôn ói nhiều', desc: 'Phân biệt nôn dịch xanh vàng (tắc ruột dưới bóng Vater), hẹp phì đại môn vị (3–6 tuần) và tăng áp lực nội sọ.', keyTakeaway: 'Sơ sinh nôn dịch xanh (mật) là tắc ruột/xoắn ruột trung tràng cho đến khi chứng minh ngược lại.', urgency: 'emergent', hasVault: true, vaultFile: '11. Nhi khoa/TC_Tiếp cận trẻ nôn ói nhiều_P1.md', tags: ['Nôn dịch mật', 'Hẹp môn vị', 'Cấp cứu nhi'] },
      { n: 9, slug: 'tre-tieu-chay-cap', title: 'Tiếp cận Trẻ Tiêu chảy cấp', desc: 'Đánh giá mất nước theo 3 phác đồ WHO (A, B, C), bù dịch ORS áp lực thẩm thấu thấp, Kẽm và chỉ định kháng sinh.', keyTakeaway: 'Ưu tiên bù dịch đường uống ORS và cho trẻ ăn sớm; chỉ dùng kháng sinh khi lỵ, tả hoặc nhiễm trùng huyết.', urgency: 'urgent', hasVault: true, vaultFile: '11. Nhi khoa/TC_Tiếp cận trẻ tiêu chảy cấp_P1.md', tags: ['Tiêu chảy cấp', 'Phác đồ A-B-C', 'ORS & Kẽm'] },
      { n: 10, slug: 'tre-tao-bon', title: 'Tiếp cận Trẻ bị Táo bón', desc: 'Phân biệt táo bón chức năng (Rome IV) với bệnh Hirschsprung (chậm tiêu phân su > 48h) và phác đồ PEG 3350.', keyTakeaway: 'Chậm tiêu phân su > 48 giờ sau sinh hoặc dấu hiệu tháo cống khi thăm trực tràng: nghĩ ngay bệnh Hirschsprung.', urgency: 'routine', hasVault: true, vaultFile: '11. Nhi khoa/TC_Tiếp cận trẻ bị táo bón_P1.md', tags: ['Táo bón nhi', 'Hirschsprung', 'PEG'] },
      { n: 11, slug: 'tre-vang-da-phong-kham', title: 'Tiếp cận Trẻ Vàng da tại phòng khám', desc: 'Phân biệt vàng da sinh lý vs bệnh lý (xuất hiện < 24h, kéo dài > 14 ngày), nguy cơ vàng da nhân và teo đường mật.', keyTakeaway: 'Trẻ > 14 ngày còn vàng da kèm phân bạc màu: xét nghiệm ngay Bilirubin trực tiếp để loại trừ teo đường mật bẩm sinh.', urgency: 'urgent', hasVault: true, vaultFile: '11. Nhi khoa/TC_Tiếp cận trẻ vàng da tại phòng khám_P1.md', tags: ['Vàng da sơ sinh', 'Teo đường mật', 'Chiếu đèn'] },
      { n: 12, slug: 'tre-roi-loan-tri-giac', title: 'Tiếp cận Trẻ Rối loạn tri giác', desc: 'Đánh giá AVPU/GCS nhi, tam giác đánh giá nhi khoa (PAT), đường huyết nhanh và loại trừ viêm não – màng não.', keyTakeaway: 'Áp dụng Tam giác Đánh giá Nhi khoa (PAT) trong 30 giây đầu và kiểm tra đường huyết mao mạch ngay.', urgency: 'emergent', hasVault: true, vaultFile: '11. Nhi khoa/TC_Tiếp cận trẻ rối loạn tri giác_P1.md', tags: ['PAT', 'GCS Nhi', 'Viêm màng não'] },
      { n: 13, slug: 'thieu-mau-o-tre', title: 'Tiếp cận Chẩn đoán Thiếu máu ở trẻ em', desc: 'Biện luận theo MCV chuẩn hóa theo tuổi: phân biệt thiếu sắt, Thalassemia, thiếu G6PD và bệnh lý tủy xương.', keyTakeaway: 'Chỉ số Mentzer (MCV/RBC) < 13 gợi ý Thalassemia; luôn xét nghiệm điện di Hb và Ferritin.', urgency: 'routine', hasVault: true, vaultFile: '11. Nhi khoa/TC_Tiếp cận chẩn đoán thiếu máu ở trẻ em_P1.md', tags: ['Thiếu máu nhi', 'Thalassemia', 'Mentzer'] },
      { n: 14, slug: 'tre-phu', title: 'Tiếp cận Chẩn đoán Trẻ Phù', desc: 'Phân biệt Hội chứng thận hư (phù trắng mềm, tiểu đạm ngưỡng thận hư) với Viêm cầu thận cấp (tiểu máu, THA) và suy dinh dưỡng.', keyTakeaway: 'Kiểm tra huyết áp theo bách phân vị tuổi và tổng phân tích nước tiểu ở mọi trẻ phù.', urgency: 'urgent', hasVault: true, vaultFile: '11. Nhi khoa/TC_Tiếp cận chẩn đoán trẻ phù_P1.md', tags: ['Trẻ phù', 'Thận hư', 'Viêm cầu thận'] },
      { n: 15, slug: 'tre-cham-tang-truong', title: 'Tiếp cận Trẻ Chậm tăng trưởng (FTT)', desc: 'Phân tích biểu đồ tăng trưởng WHO (Z-score), phân nhóm thiếu cung cấp – kém hấp thu – tăng nhu cầu.', keyTakeaway: 'Cân nặng giảm trước, sau đó chiều cao, cuối cùng vòng đầu phản ánh nguyên nhân thiếu dinh dưỡng năng lượng.', urgency: 'routine', hasVault: true, vaultFile: '11. Nhi khoa/TC_Tiếp cận trẻ chậm tăng trưởng_P1.md', tags: ['Chậm tăng trưởng', 'Z-score', 'WHO'] },
      { n: 16, slug: 'van-de-nuoi-duong-tre-em', title: 'Tiếp cận Các vấn đề về Nuôi dưỡng ở trẻ em', desc: 'Đánh giá bú mẹ, ăn dặm bổ sung đúng độ tuổi, biếng ăn sinh lý/bệnh lý và tư vấn thực hành dinh dưỡng.', keyTakeaway: 'Quan sát trực tiếp một cữ bú/ăn giúp phát hiện 70% sai lầm kỹ thuật nuôi dưỡng.', urgency: 'routine', hasVault: true, vaultFile: '11. Nhi khoa/TC_Các vấn đề về nuôi dưỡng ở trẻ em_P1.md', tags: ['Nuôi dưỡng', 'Ăn dặm', 'Sữa mẹ'] }
    ], 96)
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
