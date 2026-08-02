/**
 * Automatic PHI Redactor (Lá chắn Ẩn danh Bệnh nhân)
 * 
 * Bộ lọc Middleware để nhận dạng và mã hóa thông tin định danh cá nhân (PHI)
 * Đảm bảo HIPAA Compliance trước khi dữ liệu rời khỏi LocalStorage hoặc vào AI Engine.
 */

import { SoapPatientRecord } from '../types';

/**
 * Xóa thông tin nhạy cảm từ một chuỗi văn bản tự do.
 */
export function redactString(text: string): string {
  if (!text) return text;

  let redacted = text;

  // 1. Nhận dạng số điện thoại (10 số, có thể có khoảng trắng/chấm)
  // VD: 0901234567, 090 123 4567, +84901234567
  const phoneRegex = /(?:\+84|0)[1-9](?:\s|\.|\-)?(?:\d(?:\s|\.|\-)?){7,8}\d/g;
  redacted = redacted.replace(phoneRegex, '[PHONE_REDACTED]');

  // 2. Nhận dạng Email
  const emailRegex = /([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})/g;
  redacted = redacted.replace(emailRegex, '[EMAIL_REDACTED]');

  // 3. Nhận dạng Mã hồ sơ/Mã bệnh nhân phổ biến
  // VD: HS-12345, BA12345, PID-1234
  const mrnRegex = /(?:HS|BA|PID|BN)[\-\s:]*\d{4,10}/gi;
  redacted = redacted.replace(mrnRegex, '[MRN_REDACTED]');

  // 4. Nhận dạng tên bệnh nhân (Cơ bản)
  // Thường đi sau các từ khóa "Bệnh nhân", "BN", "Họ tên", "Tên"
  // Giả định tên tiếng Việt in hoa chữ cái đầu, có 2-5 chữ.
  const nameRegex = /(?:Bệnh nhân|BN|Họ [Vv]à [Tt]ên|Họ tên|Tên)[:\s]+([A-ZĐ][a-zàáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵ]+(?:\s[A-ZĐ][a-zàáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵ]+){1,4})/g;
  redacted = redacted.replace(nameRegex, (match, p1) => {
    return match.replace(p1, '[PATIENT_NAME]');
  });

  return redacted;
}

/**
 * Ẩn danh toàn bộ một bản ghi SOAP
 */
export function redactSoapRecord(record: SoapPatientRecord): SoapPatientRecord {
  // Deep clone to avoid mutating the original
  const redactedRecord: SoapPatientRecord = JSON.parse(JSON.stringify(record));

  // Redact structured fields
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
  redactedRecord.sNotes = redactString(redactedRecord.sNotes);
  redactedRecord.oNotes = redactString(redactedRecord.oNotes);
  redactedRecord.aAssessment = redactString(redactedRecord.aAssessment);
  redactedRecord.pPlan = redactString(redactedRecord.pPlan);

  // Redact all daily logs
  if (redactedRecord.dailyLogs) {
    redactedRecord.dailyLogs = redactedRecord.dailyLogs.map(log => ({
      ...log,
      sNotes: redactString(log.sNotes),
      oNotes: redactString(log.oNotes),
      aAssessment: redactString(log.aAssessment),
      pPlan: redactString(log.pPlan),
    }));
  }

  return redactedRecord;
}
