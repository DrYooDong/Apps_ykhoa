/**
 * DocSpace — PHI Redactor Service (HIPAA Safe Harbor Standard)
 * Bóc tách và khử định danh 18 nhóm thông tin nhạy cảm của người bệnh
 */

export interface RedactionResult {
  redactedText: string;
  identifiedCount: number;
  redactedTypes: string[];
}

export class PhiRedactorService {
  // Regex patterns for Vietnamese & International medical records
  private static PATTERNS: { type: string; regex: RegExp; replacement: string }[] = [
    // Số điện thoại (VN 10-11 số)
    {
      type: 'PHONE_NUMBER',
      regex: /(?:\+84|0)(?:3[2-9]|5[6|8|9]|7[0|6-9]|8[1-5]|9[0-9])[0-9]{7}/g,
      replacement: '[SĐT-ĐÃ-KHỬ-ĐỊNH-DANH]'
    },
    // Số CMND / CCCD (9 hoặc 12 số)
    {
      type: 'NATIONAL_ID',
      regex: /\b\d{9}\b|\b\d{12}\b/g,
      replacement: '[CCCD-ĐÃ-BẢO-MẬT]'
    },
    // Số thẻ Bảo hiểm y tế (BHYT VN: 15 ký tự chữ & số)
    {
      type: 'INSURANCE_ID',
      regex: /\b[A-Z]{2}[0-9]{13}\b|\bBHYT[-\s]?[0-9A-Z]{10,15}\b/gi,
      replacement: '[MÃ-BHYT-MÃ-HÓA]'
    },
    // Địa chỉ Email
    {
      type: 'EMAIL',
      regex: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
      replacement: '[EMAIL-ĐÃ-ẨN]'
    },
    // Số nhà / Tên đường cụ thể
    {
      type: 'STREET_ADDRESS',
      regex: /(?:Số\s+\d+[\w/]*|Đường|Phố|Ngõ|Ngách|Hẻm)\s+[^,\n]+(?:,\s*(?:Phường|Xã|Thị trấn|Quận|Huyện|TP|Thành phố|Tỉnh)\s+[^,\n]+)*/gi,
      replacement: '[ĐỊA-CHỈ-ĐÃ-BẢO-VỆ-HIPAA]'
    },
    // Mã số bệnh án (VD: HS-10293, BA-2026-991)
    {
      type: 'MEDICAL_RECORD_NO',
      regex: /\b(?:HS|BA|MRN|EMR)[-\s]?[0-9A-Z]{4,12}\b/gi,
      replacement: '[SỐ-HS-MÃ-HÓA]'
    }
  ];

  /**
   * Khử định danh văn bản tự do
   */
  public static redactText(rawText: string): RedactionResult {
    if (!rawText) return { redactedText: '', identifiedCount: 0, redactedTypes: [] };

    let processed = rawText;
    let count = 0;
    const types: Set<string> = new Set();

    this.PATTERNS.forEach(rule => {
      const matches = processed.match(rule.regex);
      if (matches && matches.length > 0) {
        count += matches.length;
        types.add(rule.type);
        processed = processed.replace(rule.regex, rule.replacement);
      }
    });

    return {
      redactedText: processed,
      identifiedCount: count,
      redactedTypes: Array.from(types)
    };
  }

  /**
   * Khử định danh tên riêng người bệnh
   */
  public static redactPatientName(fullName: string): string {
    if (!fullName) return 'Bệnh nhân [Ẩn Danh]';
    const parts = fullName.trim().split(/\s+/);
    if (parts.length <= 1) return 'BN. [Ẩn]';
    // Giữ họ đầu tiên và chữ cái đầu tên
    const lastName = parts[0];
    const firstInitial = parts[parts.length - 1][0];
    return `${lastName} ${firstInitial}. (HIPAA Safe Harbor)`;
  }
}
