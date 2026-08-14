import assert from 'node:assert';

// Mô phỏng logic regex của phi-redactor.ts để kiểm thử
function redactString(text) {
  if (!text || typeof text !== 'string') return text;
  let redacted = text;

  // 1. BHYT
  const bhytRegex = /\b([A-Z]{2}[1-9]\d{2}\d{10})\b/g;
  redacted = redacted.replace(bhytRegex, '[BHYT_REDACTED]');

  // 2. CCCD / CMND
  const idCardRegex = /(?:CCCD|CMND|CMT|Số ĐDCN|Số định danh)[:\s]*\b(\d{9}|\d{12})\b/gi;
  redacted = redacted.replace(idCardRegex, '[ID_CARD_REDACTED]');
  const standaloneCccdRegex = /\b(0\d{11})\b/g;
  redacted = redacted.replace(standaloneCccdRegex, '[CCCD_REDACTED]');

  // 3. Phone
  const phoneRegex = /(?:\+84|0)(?:[1-9])(?:\s|\.|\-)?(?:\d(?:\s|\.|\-)?){7,9}\d/g;
  redacted = redacted.replace(phoneRegex, '[PHONE_REDACTED]');

  // 4. Email
  const emailRegex = /([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})/g;
  redacted = redacted.replace(emailRegex, '[EMAIL_REDACTED]');

  // 5. MRN
  const mrnRegex = /(?:HS|BA|PID|MRN|Mã BN|Mã HS|Mã số)[\-\s:#]*[A-Za-z0-9\-_]{4,15}/gi;
  redacted = redacted.replace(mrnRegex, '[MRN_REDACTED]');

  // 6. DOB
  const dobRegex = /(?:sinh ngày|ngày sinh|DOB|NS|N\.S)[:\s]+(\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4})/gi;
  redacted = redacted.replace(dobRegex, 'sinh ngày [DOB_REDACTED]');

  // 7. Address
  const addressRegex = /(?:Địa chỉ|Đ\/c|Thường trú|Tạm trú|Trú tại|Ở tại)[:\s]+([^,\n\r\.;]+(?:,\s*[^,\n\r\.;]+){1,4})/gi;
  redacted = redacted.replace(addressRegex, 'Địa chỉ: [ADDRESS_REDACTED]');

  // 8. Vietnamese Name with titles
  const nameRegex = /(?:Bệnh nhân|BN|Họ [Vv]à [Tt]ên|Họ tên|Tên|Bác|Cụ|Cô|Chú|Anh|Chị|Bé|Cháu|Em)[:\s]+([A-ZĐÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÈÉẺẼẸÊỀẾỂỄỆÌÍỈĨỊÒÓỎÕỌÔỒỐỔỖỘƠỜỚỞỠỢÙÚỦŨỤƯỪỨỬỮỰỲÝỶỸỴ][a-zàáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵ]+(?:\s+[A-ZĐÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÈÉẺẼẸÊỀẾỂỄỆÌÍỈĨỊÒÓỎÕỌÔỒỐỔỖỘƠỜỚỞỠỢÙÚỦŨỤƯỪỨỬỮỰỲÝỶỸỴ][a-zàáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵ]+){1,4})/g;
  redacted = redacted.replace(nameRegex, (match, p1) => {
    return match.replace(p1, '[PATIENT_NAME]');
  });

  return redacted;
}

console.log('🧪 Bắt đầu kiểm thử PHI Redactor...');

const sampleText = `
Bệnh nhân Nguyễn Văn Bình, 54 tuổi, sinh ngày 15/04/1972.
Mã BHYT: GD4010123456789. Số CCCD: 001072001234.
Số điện thoại người nhà: 0987654321, email: nguyenvanbinh@gmail.com.
Địa chỉ: Số 15 đường Giải Phóng, Phường Đồng Tâm, Quận Hai Bà Trưng, Hà Nội.
Bác sĩ khám: Bác Trần Văn An. Mã HS: HS-2026-999.
Chẩn đoán: Cơn hen phế quản cấp mức độ nặng.
`;

const result = redactString(sampleText);
console.log('--- KẾT QUẢ SAU KHI LÀM SẠCH PHI ---');
console.log(result);

assert(result.includes('[PATIENT_NAME]'), 'Tên bệnh nhân phải được ẩn danh');
assert(result.includes('[BHYT_REDACTED]'), 'Mã BHYT phải được ẩn danh');
assert(result.includes('[ID_CARD_REDACTED]') || result.includes('[CCCD_REDACTED]'), 'Số CCCD/CMND phải được ẩn danh');
assert(result.includes('[PHONE_REDACTED]'), 'SĐT phải được ẩn danh');
assert(result.includes('[EMAIL_REDACTED]'), 'Email phải được ẩn danh');
assert(result.includes('[DOB_REDACTED]'), 'Ngày sinh phải được ẩn danh');
assert(result.includes('[ADDRESS_REDACTED]'), 'Địa chỉ phải được ẩn danh');
assert(result.includes('[MRN_REDACTED]'), 'Mã hồ sơ phải được ẩn danh');
assert(!result.includes('Nguyễn Văn Bình'), 'Không được còn tên thật');
assert(!result.includes('0987654321'), 'Không được còn số điện thoại thật');
assert(!result.includes('GD4010123456789'), 'Không được còn mã BHYT thật');

console.log('✅ TẤT CẢ TEST PHI REDACTOR ĐỀU VƯỢT QUA XUẤT SẮC!');
