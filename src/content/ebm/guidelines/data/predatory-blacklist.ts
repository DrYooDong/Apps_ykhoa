/**
 * Predatory Journal Blacklist & Risk Heuristics (predatory-blacklist.ts)
 * Path: src/content/ebm/guidelines/data/predatory-blacklist.ts
 * Phân hệ Y học chứng cứ (EBM) | CliniPortal
 */

export interface PredatoryPublisher {
  name: string;
  aliases: string[];
  risk: 'HIGH' | 'MEDIUM' | 'LOW_WARN';
  reason: string;
}

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

export const PREDATORY_PUBLISHERS: PredatoryPublisher[] = [
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

export function auditPredatoryRisk(journalObj: any): PredatoryAuditResult {
  if (!journalObj) {
    return { riskLevel: 'SAFE', isPredatory: false, scoreDeduction: 0, flags: [], summary: 'Không có thông tin' };
  }

  const name = (journalObj.name || journalObj.journal || '').trim().toLowerCase();
  const publisher = (journalObj.publisher || journalObj.organization || '').trim().toLowerCase();
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

  return {
    riskLevel: maxRisk,
    isPredatory: maxRisk === 'HIGH',
    scoreDeduction,
    flags,
    summary: flags.length ? `Phát hiện ${flags.length} dấu hiệu bất thường` : 'An toàn'
  };
}

if (typeof window !== 'undefined') {
  (window as any).CliniPredatoryAuditor = {
    audit: auditPredatoryRisk,
    PUBLISHERS: PREDATORY_PUBLISHERS,
    FAKE_METRICS: FAKE_METRIC_NAMES
  };
}
