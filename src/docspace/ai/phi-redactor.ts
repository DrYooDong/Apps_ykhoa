/**
 * Automatic PHI Redactor (Lá chắn Ẩn danh Dữ liệu Y tế & Bệnh nhân)
 * 
 * Bộ lọc Middleware nhận dạng và mã hóa thông tin định danh cá nhân (Protected Health Information - PHI)
 * Tuân thủ nguyên tắc HIPAA De-identification & Bảo mật Dữ liệu Y tế Việt Nam trước khi gửi AI.
 */

import { SoapPatientRecord } from '../types';

/**
 * Xóa thông tin nhạy cảm từ một chuỗi văn bản tự do (Free-text PHI Scrubbing)
 */
export function redactString(text: string): string {
  if (!text || typeof text !== 'string') return text;

  let redacted = text;

  // 1. Nhận dạng Mã thẻ Bảo hiểm Y tế (BHYT) Việt Nam (15 ký tự, VD: GD4010123456789, DN4791234567890, TE101...)
  const bhytRegex = /\b([A-Z]{2}[1-9]\d{2}\d{10})\b/g;
  redacted = redacted.replace(bhytRegex, '[BHYT_REDACTED]');

  // 2. Nhận dạng Số CCCD / CMND (9 hoặc 12 chữ số)
  const idCardRegex = /(?:CCCD|CMND|CMT|Số ĐDCN|Số định danh)[:\s]*\b(\d{9}|\d{12})\b/gi;
  redacted = redacted.replace(idCardRegex, '[ID_CARD_REDACTED]');
  // Match độc lập các dãy 12 số thuần túy (CCCD) nếu có ngữ cảnh
  const standaloneCccdRegex = /\b(0\d{11})\b/g;
  redacted = redacted.replace(standaloneCccdRegex, '[CCCD_REDACTED]');

  // 3. Nhận dạng số điện thoại (Việt Nam & Quốc tế, có thể có khoảng trắng, chấm, gạch nối)
  // VD: 0901234567, 090 123 4567, +84 901 234 567, 024.3825.1234
  const phoneRegex = /(?:\+84|0)(?:[1-9])(?:\s|\.|\-)?(?:\d(?:\s|\.|\-)?){7,9}\d/g;
  redacted = redacted.replace(phoneRegex, '[PHONE_REDACTED]');

  // 4. Nhận dạng Email
  const emailRegex = /([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})/g;
  redacted = redacted.replace(emailRegex, '[EMAIL_REDACTED]');

  // 5. Nhận dạng Mã hồ sơ/Mã bệnh nhân/Số lưu trữ (MRN)
  // VD: HS-12345, BA12345, PID-1234, BN_2026_001
  const mrnRegex = /(?:HS|BA|PID|MRN|Mã BN|Mã HS|Mã số)[\-\s:#]*[A-Za-z0-9\-_]{4,15}/gi;
  redacted = redacted.replace(mrnRegex, '[MRN_REDACTED]');

  // 6. Nhận dạng Ngày sinh / Năm sinh đầy đủ có ngữ cảnh
  // VD: "sinh ngày 15/04/1985", "DOB: 1985-04-15", "NS: 15-04-1985", "Ngày sinh: 15/04/1985"
  const dobRegex = /(?:sinh ngày|ngày sinh|DOB|NS|N\.S)[:\s]+(\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4})/gi;
  redacted = redacted.replace(dobRegex, 'sinh ngày [DOB_REDACTED]');

  // 7. Nhận dạng Địa chỉ cụ thể (Thôn, Xóm, Ấp, Xã, Phường, Quận, Huyện, Số nhà, Đường)
  const addressRegex = /(?:Địa chỉ|Đ\/c|Thường trú|Tạm trú|Trú tại|Ở tại)[:\s]+([^,\n\r\.;]+(?:,\s*[^,\n\r\.;]+){1,4})/gi;
  redacted = redacted.replace(addressRegex, 'Địa chỉ: [ADDRESS_REDACTED]');

  // 8. Nhận dạng tên bệnh nhân tiếng Việt phong phú kèm danh xưng
  // Tiền tố: Bệnh nhân, BN, Họ và Tên, Họ tên, Tên, Bác, Cụ, Cô, Chú, Anh, Chị, Bé, Cháu, Em
  const nameRegex = /(?:Bệnh nhân|BN|Họ [Vv]à [Tt]ên|Họ tên|Tên|Bác|Cụ|Cô|Chú|Anh|Chị|Bé|Cháu|Em)[:\s]+([A-ZĐÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÈÉẺẼẸÊỀẾỂỄỆÌÍỈĨỊÒÓỎÕỌÔỒỐỔỖỘƠỜỚỞỠỢÙÚỦŨỤƯỪỨỬỮỰỲÝỶỸỴ][a-zàáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵ]+(?:\s+[A-ZĐÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÈÉẺẼẸÊỀẾỂỄỆÌÍỈĨỊÒÓỎÕỌÔỒỐỔỖỘƠỜỚỞỠỢÙÚỦŨỤƯỪỨỬỮỰỲÝỶỸỴ][a-zàáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵ]+){1,4})/g;
  redacted = redacted.replace(nameRegex, (match, p1) => {
    return match.replace(p1, '[PATIENT_NAME]');
  });

  return redacted;
}

/**
 * Ẩn danh toàn bộ một bản ghi SOAP trước khi đưa vào AI Engine hoặc lưu trữ chia sẻ
 */
export function redactSoapRecord(record: SoapPatientRecord): SoapPatientRecord {
  if (!record) return record;

  // Deep clone to avoid mutating the original object in RAM
  const redactedRecord: SoapPatientRecord = JSON.parse(JSON.stringify(record));

  // Redact structured administrative fields
  if (redactedRecord.fullName) {
    redactedRecord.fullName = '[PATIENT_NAME]';
  }
  if (redactedRecord.patientCode) {
    redactedRecord.patientCode = '[PATIENT_CODE]';
  }
  if (redactedRecord.medicalRecordNo) {
    redactedRecord.medicalRecordNo = '[MRN_REDACTED]';
  }

  // Redact free-text fields in current state
  redactedRecord.sNotes = redactString(redactedRecord.sNotes || '');
  redactedRecord.oNotes = redactString(redactedRecord.oNotes || '');
  redactedRecord.aAssessment = redactString(redactedRecord.aAssessment || '');
  redactedRecord.pPlan = redactString(redactedRecord.pPlan || '');

  // Redact all daily logs
  if (Array.isArray(redactedRecord.dailyLogs)) {
    redactedRecord.dailyLogs = redactedRecord.dailyLogs.map(log => ({
      ...log,
      sNotes: redactString(log.sNotes || ''),
      oNotes: redactString(log.oNotes || ''),
      aAssessment: redactString(log.aAssessment || ''),
      pPlan: redactString(log.pPlan || ''),
    }));
  }

  return redactedRecord;
}

/**
 * Hàm đệ quy làm sạch PHI cho bất kỳ payload dữ liệu nào (Object, Array, String) trước khi gửi qua API
 */
export function redactMedicalContext<T = any>(data: T): T {
  if (data === null || data === undefined) return data;

  if (typeof data === 'string') {
    return redactString(data) as unknown as T;
  }

  if (Array.isArray(data)) {
    return data.map(item => redactMedicalContext(item)) as unknown as T;
  }

  if (typeof data === 'object') {
    const clone: Record<string, any> = {};
    for (const key of Object.keys(data)) {
      // Nhận diện các trường định danh nhạy cảm
      if (/^(name|fullName|patientName|phone|phoneNumber|email|address|idCard|cccd|cmnd|bhyt|mrn|medicalRecordNo)$/i.test(key)) {
        clone[key] = `[${key.toUpperCase()}_REDACTED]`;
      } else {
        clone[key] = redactMedicalContext((data as Record<string, any>)[key]);
      }
    }
    return clone as unknown as T;
  }

  return data;
}

