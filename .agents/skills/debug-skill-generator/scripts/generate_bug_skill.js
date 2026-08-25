/**
 * generate_bug_skill.js
 * 
 * Script Node.js tự động khởi tạo 01 Skill sửa lỗi mới trong .agents/skills/<skill_name>/
 * mỗi khi hệ thống phát hiện dạng lỗi / sự cố mới cần ghi nhớ tri thức và tự động hóa quy trình vá.
 * 
 * Cách sử dụng CLI:
 *   node .agents/skills/debug-skill-generator/scripts/generate_bug_skill.js --name <skill_name> --desc "<mô tả>" [options]
 * 
 * Ví dụ:
 *   node .agents/skills/debug-skill-generator/scripts/generate_bug_skill.js \
 *     --name "fix-zindex-modal-bug" \
 *     --desc "Khắc phục lỗi z-index che khuất modal và dropdown trên mobile" \
 *     --symptoms "Modal bị chìm bên dưới header sticky hoặc backdrop làm xám toàn bộ màn hình" \
 *     --rootcause "Z-index của sticky topnav (200) cao hơn z-index mặc định của modal (100)" \
 *     --solution "Nâng z-index của modal-backdrop lên 1000 và modal-content lên 1010"
 */

const fs = require('fs');
const path = require('path');

const WORKSPACE_ROOT = path.resolve(__dirname, '../../../../');
const SKILLS_DIR = path.join(WORKSPACE_ROOT, '.agents/skills');

function parseArgs() {
  const args = process.argv.slice(2);
  const options = {};

  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith('--')) {
      const key = args[i].replace(/^--/, '');
      const val = args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : true;
      options[key] = val;
      if (val !== true) i++;
    }
  }

  return options;
}

function slugifySkillName(name) {
  if (!name) return 'custom-bug-fix-skill';
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd').replace(/Đ/g, 'D')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function createBugFixSkill() {
  const options = parseArgs();

  if (!options.name) {
    console.error('❌ Vui lòng cung cấp tham số --name cho skill sửa lỗi mới!');
    console.log('Ví dụ: node generate_bug_skill.js --name "fix-zindex-modal-bug" --desc "Khắc phục lỗi z-index"');
    process.exit(1);
  }

  const skillSlug = slugifySkillName(options.name);
  const skillFolderPath = path.join(SKILLS_DIR, skillSlug);
  const skillFilePath = path.join(skillFolderPath, 'SKILL.md');
  const scriptsFolderPath = path.join(skillFolderPath, 'scripts');

  if (!fs.existsSync(skillFolderPath)) {
    fs.mkdirSync(skillFolderPath, { recursive: true });
  }
  if (!fs.existsSync(scriptsFolderPath)) {
    fs.mkdirSync(scriptsFolderPath, { recursive: true });
  }

  const desc = options.desc || `Quy trình chẩn đoán và khắc phục sự cố ${skillSlug} trong dự án CliniPortal.`;
  const symptoms = options.symptoms || `Phát hiện hành vi bất thường, vỡ layout hoặc lỗi runtime liên quan đến ${skillSlug}.`;
  const rootcause = options.rootcause || `Xung đột cấu hình, lỗi tham chiếu DOM hoặc sai lệch thứ tự load tài nguyên.`;
  const solution = options.solution || `Khắc phục bằng cách điều chỉnh cấu trúc CSS/JS và kiểm tra tính toàn vẹn với master_project_audit.js.`;

  const skillContent = `---
name: ${skillSlug}
description: >
  ${desc.replace(/\n/g, ' ')}
---

# ${skillSlug.toUpperCase().replace(/-/g, ' ')} SKILL

Tài liệu này định nghĩa quy trình chẩn đoán, nguyên nhân cốt lõi và các bước khắc phục chuẩn cho dạng lỗi **${skillSlug}** trong hệ sinh thái CliniPortal.

---

## 🔍 1. Triệu Chứng Nhận Diện (Symptoms)

- **Biểu hiện**: ${symptoms}
- **Mức độ ảnh hưởng**: Cần khắc phục trước khi commit / bàn giao.

---

## 🧬 2. Phân Tích Nguyên Nhân Cốt Lõi (Root Cause Analysis)

- **Nguyên nhân chính**: ${rootcause}
- **Vùng mã nguồn rủi ro**: Kiểm tra CSS, DOM event listeners, thứ tự z-index hoặc đường dẫn tương đối.

---

## 🛠️ 3. Quy Trình Khắc Phục 4 Bước (4-Step Remediation Workflow)

### Bước 1: Xác định điểm lỗi
- Kiểm tra các file ảnh hưởng bằng lệnh:
  \`\`\`bash
  node tools/tools/scratch/master_project_audit.js
  \`\`\`

### Bước 2: Khắc phục sự cố
- ${solution}
- **Quy tắc vá lỗi an toàn**: Sử dụng NodeJS patch để ghi đè chuỗi độc nhất nhằm tránh rủi ro CRLF line ending truncation.

### Bước 3: Đánh giá tác động gián tiếp (Graphify Trace)
- Kiểm tra các file/hàm phụ thuộc:
  \`\`\`bash
  node tools/tools/scratch/query_graph.js <symbol_hoặc_filename>
  \`\`\`

### Bước 4: Xác nhận và Lưu nhật ký
- Đảm bảo 100% test PASSED.
- Cập nhật nhật ký lỗi vào \`.agents/skills/cliniportal-debugging/SKILL.md\`.

---

## 🧪 4. Kịch Bản Kiểm Thử Phòng Ngừa Tái Phát

1. Quét cú pháp JS: \`node -c path/to/file.js\`
2. Quét thẻ HTML: \`node tools/tools/scratch/check_tags.js path/to/file.html\`
3. Chạy master audit: \`node tools/tools/scratch/master_project_audit.js\`
`;

  fs.writeFileSync(skillFilePath, skillContent, 'utf8');
  console.log(`\n🎉 ĐÃ TẠO THÀNH CÔNG SKILL SỬA LỖI MỚI!`);
  console.log(`📁 Thư mục Skill: ${skillFolderPath}`);
  console.log(`📄 File Skill: ${skillFilePath}`);
}

createBugFixSkill();
