/**
 * CliniPortal 2.0 — Predatory Blacklist & Audit Heuristics (TypeScript)
 * Path: src/content/ebm/guidelines/data/predatory-blacklist.ts
 */

export interface PredatoryFlag {
  type: string;
  severity: string;
  title: string;
  detail: string;
}

export interface PredatoryAuditResult {
  riskLevel: 'HIGH' | 'MEDIUM' | 'WARN' | 'SAFE';
  isPredatory: boolean;
  scoreDeduction: number;
  flags: PredatoryFlag[];
  summary: string;
}

import '../js/guidelines-types';

export const PREDATORY_PUBLISHERS = [
  { name: 'OMICS International', aliases: ['omics', 'omics group', 'omics publishing'], risk: 'HIGH', reason: 'Nằm trong danh sách cảnh báo FTC và Beall\'s List với tiền lệ giả mạo phản biện và thu phí ẩn.' },
  { name: 'World Academy of Science Engineering and Technology (WASET)', aliases: ['waset'], risk: 'HIGH', reason: 'Tổ chức hội nghị & tạp chí giả mạo hàng loạt không qua kiểm duyệt chất lượng.' },
  { name: 'Academic Journals Inc.', aliases: ['academic journals inc'], risk: 'HIGH', reason: 'NXB bị liệt vào danh sách đen của Beall\'s List.' },
  { name: 'Scientific Research Publishing (SCIRP)', aliases: ['scirp'], risk: 'MEDIUM', reason: 'Ghi nhận nhiều tạp chí chất lượng thấp, quy trình phản biện thiếu minh bạch.' },
  { name: 'MedCrave Group', aliases: ['medcrave'], risk: 'HIGH', reason: 'Tập đoàn xuất bản biến tướng với email spam hàng loạt và phí APC không rõ ràng.' },
  { name: 'Allied Academies', aliases: ['allied academies'], risk: 'HIGH', reason: 'NXB bị mua lại bởi OMICS, có dấu hiệu hoạt động biến tướng.' },
  { name: 'Baishideng Publishing Group', aliases: ['baishideng'], risk: 'LOW_WARN', reason: 'Cần lưu ý: Tạp chí có kiểm duyệt nhưng phí APC cao và tự trích dẫn lớn.' },
  { name: 'WSEAS', aliases: ['wseas'], risk: 'HIGH', reason: 'Liệt vào danh sách đen Beall\'s List.' },
  { name: 'International Scholars Journals', aliases: ['international scholars journals'], risk: 'HIGH', reason: 'Tạp chí biến tướng phát email spam giả mạo.' }
];

export const FAKE_METRIC_NAMES = [
  { name: 'Global Impact Factor', abbr: 'GIF' },
  { name: 'Universal Impact Factor', abbr: 'UIF' },
  { name: 'International Impact Factor Services', abbr: 'IIFS' },
  { name: 'COSMOS Impact Factor', abbr: 'CIF' },
  { name: 'CiteFactor', abbr: 'CF' },
  { name: 'General Impact Factor', abbr: 'GIF' },
  { name: 'Global Science Citation Index', abbr: 'GSCI' },
  { name: 'International Scientific Indexing', abbr: 'ISI-Fake' },
  { name: 'Journal Impact Factor (JIF) - Non-WoS', abbr: 'JIF-Fake' },
  { name: 'Scientific Journal Impact Factor', abbr: 'SJIF' },
  { name: 'IP Indexing Impact Factor', abbr: 'IPI' },
  { name: 'Advanced Science Index', abbr: 'ASI' }
];

export const HIJACKED_PATTERNS = [
  { pattern: /international journal of.*(lancet|nejm|jama|bmj)/i, warning: 'Nghi ngờ nhái tên tạp chí y khoa danh tiếng (NEJM/Lancet/JAMA/BMJ).' },
  { pattern: /american journal of.*(fake|online|advanced.*res)/i, warning: 'Tên tạp chí mạo danh các hội y học Hoa Kỳ.' },
  { pattern: /european journal of.*(quick|fast|rapid)/i, warning: 'Tên mạo danh tạp chí Châu Âu cam kết đăng siêu tốc.' }
];

export function auditPredatoryRisk(journalObjOrName: any, optPublisher?: string, _optIssn?: string): PredatoryAuditResult {
  if (!journalObjOrName) return { riskLevel: 'SAFE', isPredatory: false, scoreDeduction: 0, flags: [], summary: 'Không có thông tin' };

  let name = '';
  let publisher = '';
  let claimedMetricName = '';
  let peerReviewDays: number | null = null;
  let ifVal: number | null = null;
  let quartile: string | null = null;
  let sjr: number | null = null;
  let isUnindexed = false;

  if (typeof journalObjOrName === 'string') {
    name = journalObjOrName.trim().toLowerCase();
    publisher = (optPublisher || '').trim().toLowerCase();
  } else {
    name = (journalObjOrName.name || journalObjOrName.journal || '').trim().toLowerCase();
    publisher = (journalObjOrName.publisher || journalObjOrName.organization || optPublisher || '').trim().toLowerCase();
    claimedMetricName = journalObjOrName.claimedMetricName || '';
    peerReviewDays = journalObjOrName.peerReviewDays || null;
    ifVal = journalObjOrName.if || null;
    quartile = journalObjOrName.quartile || null;
    sjr = journalObjOrName.sjr || null;
    isUnindexed = !!journalObjOrName.isUnindexed;
  }

  const flags: PredatoryFlag[] = [];
  let scoreDeduction = 0;
  let maxRisk: 'HIGH' | 'MEDIUM' | 'WARN' | 'SAFE' = 'SAFE';

  if (publisher || name) {
    for (const pub of PREDATORY_PUBLISHERS) {
      const matchesPub = publisher && pub.aliases.some(a => publisher.includes(a));
      const matchesName = name && pub.aliases.some(a => name.includes(a));
      if (matchesPub || matchesName) {
        flags.push({
          type: 'BLACKLISTED_PUBLISHER',
          severity: pub.risk,
          title: `🚨 Nhà xuất bản nằm trong cảnh báo: ${pub.name}`,
          detail: pub.reason
        });
        if (pub.risk === 'HIGH') {
          scoreDeduction += 60;
          maxRisk = 'HIGH';
        } else if (pub.risk === 'MEDIUM') {
          scoreDeduction += 30;
          if (maxRisk !== 'HIGH') maxRisk = 'MEDIUM';
        } else if (pub.risk === 'LOW_WARN') {
          scoreDeduction += 10;
          if (maxRisk === 'SAFE') maxRisk = 'WARN';
        }
      }
    }
  }

  for (const item of HIJACKED_PATTERNS) {
    if (item.pattern.test(name)) {
      flags.push({
        type: 'HIJACKED_NAME',
        severity: 'HIGH',
        title: '⚠️ Tên tạp chí có dấu hiệu mạo danh (Hijacked Journal)',
        detail: item.warning
      });
      scoreDeduction += 40;
      if (maxRisk !== 'HIGH') maxRisk = 'HIGH';
    }
  }

  if (claimedMetricName) {
    const claimedLower = claimedMetricName.toLowerCase();
    const fakeMatch = FAKE_METRIC_NAMES.find(f => claimedLower.includes(f.name.toLowerCase()) || claimedLower.includes(f.abbr.toLowerCase()));
    if (fakeMatch) {
      flags.push({
        type: 'FAKE_METRIC',
        severity: 'HIGH',
        title: `🚨 Sử dụng chỉ số chất lượng giả mạo (${fakeMatch.name})`,
        detail: 'Tạp chí sử dụng các chỉ số Impact Factor tự phong không thuộc Clarivate Analytics (WoS) hay Scopus.'
      });
      scoreDeduction += 50;
      if (maxRisk !== 'HIGH') maxRisk = 'HIGH';
    }
  }

  if (peerReviewDays && peerReviewDays < 7) {
    flags.push({
      type: 'FAST_PEER_REVIEW',
      severity: 'MEDIUM',
      title: '⚡ Thời gian phản biện siêu tốc (< 7 ngày)',
      detail: 'Cảnh báo: Thời gian phản biện quá ngắn thường là dấu hiệu bỏ qua quy trình kiểm duyệt chuyên môn y khoa.'
    });
    scoreDeduction += 20;
    if (maxRisk === 'SAFE' || maxRisk === 'WARN') maxRisk = 'MEDIUM';
  }

  if (ifVal && ifVal > 5 && !quartile && !sjr && isUnindexed) {
    flags.push({
      type: 'UNINDEXED_HIGH_IF',
      severity: 'MEDIUM',
      title: '❓ Tuyên bố IF cao nhưng không xuất hiện trong Scopus/WoS',
      detail: 'Chỉ số IF không xác minh được qua CSDL trích dẫn độc lập.'
    });
    scoreDeduction += 25;
    if (maxRisk === 'SAFE') maxRisk = 'MEDIUM';
  }

  const isPredatory = maxRisk === 'HIGH' || scoreDeduction >= 50;

  let summary = 'Tạp chí an toàn, chưa ghi nhận dấu hiệu biến tướng.';
  if (maxRisk === 'HIGH') summary = '🚨 CẢNH BÁO CAO: Tạp chí có nhiều dấu hiệu biến tướng / predatory!';
  else if (maxRisk === 'MEDIUM') summary = '⚠️ CẢNH BÁO VỪA: Tạp chí cần cẩn trọng kiểm tra lại quy trình phản biện.';
  else if (maxRisk === 'WARN') summary = '💡 LƯU Ý: Tạp chí có một số đặc điểm cần tham khảo kỹ.';

  return {
    riskLevel: maxRisk,
    isPredatory,
    scoreDeduction,
    flags,
    summary
  };
}

if (typeof window !== 'undefined') {
  window.PREDATORY_PUBLISHERS = PREDATORY_PUBLISHERS;
  window.FAKE_METRIC_NAMES = FAKE_METRIC_NAMES;
  window.auditPredatoryRisk = auditPredatoryRisk;
}
