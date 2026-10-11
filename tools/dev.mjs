#!/usr/bin/env node
/**
 * CliniPortal Unified Developer CLI (tools/dev.mjs)
 * Tự động hóa các tác vụ lặp lại để tăng tốc độ phát triển cho mọi dự án:
 * - audit: Kiểm tra tính toàn vẹn HTML, đường dẫn tương đối, dark mode, CSS tokens
 * - check: Kiểm tra nhanh 1 tệp HTML / MDX / JS
 * - help: Hiển thị hướng dẫn
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const command = process.argv[2] || 'help';
const targetArg = process.argv[3];

function printBanner() {
  console.log('\n🩺 CliniPortal Developer CLI (v1.0.0)');
  console.log('────────────────────────────────────────');
}

function checkFileIntegrity(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Không tìm thấy tệp: ${filePath}`);
    return false;
  }

  const content = fs.readFileSync(filePath, 'utf8');
  let hasError = false;

  console.log(`\n🔍 Kiểm tra: ${path.relative(ROOT_DIR, filePath)}`);

  // 1. Thẻ HTML cân bằng
  const tags = ['div', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'p', 'span', 'h2', 'h3', 'ul', 'li', 'strong', 'em', 'small'];
  let tagMismatches = [];
  for (const tag of tags) {
    const openRegex = new RegExp(`<${tag}(\\s+[^>]*)?>`, 'gi');
    const closeRegex = new RegExp(`</${tag}>`, 'gi');
    const openCount = (content.match(openRegex) || []).length;
    const closeCount = (content.match(closeRegex) || []).length;
    if (openCount !== closeCount) {
      tagMismatches.push(`<${tag}> (mở: ${openCount}, đóng: ${closeCount})`);
      hasError = true;
    }
  }

  if (tagMismatches.length > 0) {
    console.error(`  ❌ Mất cân bằng thẻ: ${tagMismatches.join(', ')}`);
  } else {
    console.log(`  ✅ Thẻ HTML: Cân bằng hoàn chỉnh`);
  }

  // 2. Kiểm tra LaTeX $ chưa escape
  const mathMatches = content.match(/\$[^$\n]+\$/g);
  if (mathMatches && mathMatches.length > 0) {
    console.warn(`  ⚠️ Cảnh báo ký tự $: Tìm thấy ${mathMatches.length} vị trí. Cần kiểm tra nếu là văn bản thuần.`);
  } else {
    console.log(`  ✅ Math / Ký tự $: Sạch sẽ`);
  }

  // 3. Đường dẫn tuyệt đối cục bộ (Local hardcoded path)
  const hardcodedPathMatches = content.match(/([a-zA-Z]:\\[^"'\s<]+|\/[a-zA-Z0-9_\-]+\/[a-zA-Z0-9_\-]+)/g);
  const suspiciousPaths = (hardcodedPathMatches || []).filter(p => p.includes('Apps_ykhoa') || p.includes('App_Canhan') || p.startsWith('C:') || p.startsWith('D:') || p.startsWith('I:'));
  if (suspiciousPaths.length > 0) {
    console.warn(`  ⚠️ Phát hiện đường dẫn tuyệt đối máy nội bộ (${suspiciousPaths.length}):`);
    suspiciousPaths.slice(0, 3).forEach(p => console.warn(`     - ${p}`));
  } else {
    console.log(`  ✅ Đường dẫn: Không chứa đường dẫn tuyệt đối ổ cứng`);
  }

  return !hasError;
}

switch (command) {
  case 'check': {
    printBanner();
    if (!targetArg) {
      console.error('Cách dùng: node tools/dev.mjs check <path/to/file.html|mdx>');
      process.exit(1);
    }
    const targetPath = path.isAbsolute(targetArg) ? targetArg : path.join(ROOT_DIR, targetArg);
    const ok = checkFileIntegrity(targetPath);
    console.log(ok ? '\n✨ KẾT QUẢ: HỢP LỆ (PASS)\n' : '\n⚠️ KẾT QUẢ: PHÁT HIỆN LỖI CẦN SỬA\n');
    break;
  }

  case 'audit': {
    printBanner();
    console.log('🚀 Đang chạy bộ kiểm định QA Suite...');
    try {
      execSync('node tools/qa_suite.js', { stdio: 'inherit', cwd: ROOT_DIR });
    } catch (err) {
      console.error('Audit kết thúc với một số cảnh báo/lỗi.');
    }
    break;
  }

  case 'push': {
    printBanner();
    const commitMsg = targetArg || `chore: auto sync ${new Date().toISOString().slice(0, 10)}`;
    console.log(`🚀 Bắt đầu quy trình đẩy GitHub nhanh & an toàn...`);
    console.log(`📝 Thông điệp commit: "${commitMsg}"\n`);

    try {
      // 1. Kiểm tra trạng thái
      const status = execSync('git status --porcelain', { cwd: ROOT_DIR, encoding: 'utf8' }).trim();
      if (!status) {
        console.log('✨ Không có tệp nào thay đổi. Working tree hoàn toàn sạch sẽ.');
        break;
      }

      // 2. Kiểm tra file quá lớn (> 50MB) trước khi add
      const changedFiles = status.split('\n').map(l => l.slice(3).trim());
      let oversizedFiles = [];
      for (const f of changedFiles) {
        const fullP = path.join(ROOT_DIR, f);
        if (fs.existsSync(fullP) && fs.statSync(fullP).isFile()) {
          const sizeMB = fs.statSync(fullP).size / (1024 * 1024);
          if (sizeMB > 50) {
            oversizedFiles.push(`${f} (${sizeMB.toFixed(1)}MB)`);
          }
        }
      }

      if (oversizedFiles.length > 0) {
        console.error(`❌ CẢNH BÁO NGUY HIỂM: Phát hiện tệp > 50MB có thể bị GitHub chặn:`);
        oversizedFiles.forEach(f => console.error(`   - ${f}`));
        console.error(`\nVui lòng thêm vào .gitignore hoặc dùng Git LFS trước khi push!`);
        process.exit(1);
      }

      // 3. Stage & Commit
      console.log('📦 Đang đóng gói staging (git add -A)...');
      execSync('git add -A', { cwd: ROOT_DIR, stdio: 'inherit' });

      console.log('✍️ Đang ghi nhận commit...');
      execSync(`git commit -m "${commitMsg.replace(/"/g, '\\"')}"`, { cwd: ROOT_DIR, stdio: 'inherit' });

      // 4. Push lên GitHub
      console.log('⚡ Đang đẩy lên GitHub (git push)...');
      execSync('git push', { cwd: ROOT_DIR, stdio: 'inherit' });

      console.log('\n🎉 THÀNH CÔNG: Đã đẩy toàn bộ mã nguồn lên GitHub an toàn & chính xác!\n');
    } catch (err) {
      console.error('\n❌ Thất bại khi đẩy lên GitHub:');
      console.error(err.message || err);
      console.log('\n💡 Mẹo khắc phục: Nếu nhánh bị lệch, hãy chạy: git pull --rebase rồi thử lại.');
    }
    break;
  }

  case 'selfcheck': {
    printBanner();
    console.log('🩺 Đang kiểm tra sức khỏe của hệ sinh thái Agent (Commands, Rules, Learnings)...\n');
    let issues = 0;

    // 1. Kiểm tra Commands
    const commandsDir = path.join(ROOT_DIR, '.agents', 'commands');
    if (fs.existsSync(commandsDir)) {
      const commandFiles = fs.readdirSync(commandsDir).filter(f => f.endsWith('.md'));
      console.log(`📁 Kiểm tra Commands (${commandFiles.length} lệnh):`);
      for (const f of commandFiles) {
        const content = fs.readFileSync(path.join(commandsDir, f), 'utf8');
        const hasDesc = content.includes('description:');
        if (!hasDesc) {
          console.warn(`  ⚠️ Lệnh ${f} thiếu frontmatter description!`);
          issues++;
        } else {
          console.log(`  ✅ /${f.replace('.md', '')}`);
        }
      }
    } else {
      console.error('❌ Không tìm thấy thư mục .agents/commands!');
      issues++;
    }

    // 2. Kiểm tra Rules
    const rulesDir = path.join(ROOT_DIR, '.agents', 'rules');
    if (fs.existsSync(rulesDir)) {
      const ruleFiles = fs.readdirSync(rulesDir).filter(f => f.endsWith('.md'));
      console.log(`\n📁 Kiểm tra Rules (${ruleFiles.length} quy tắc):`);
      ruleFiles.forEach(f => console.log(`  ✅ ${f}`));
    }

    // 3. Kiểm tra Retro Cards
    const retroDir = path.join(ROOT_DIR, '.agents', 'learnings', 'retro');
    if (fs.existsSync(retroDir)) {
      const retroFiles = fs.readdirSync(retroDir).filter(f => f.endsWith('.md') && f !== 'README.md');
      console.log(`\n📁 Kiểm tra Retro Cards (${retroFiles.length} thẻ ghi nhận):`);
      for (const rf of retroFiles) {
        const lines = fs.readFileSync(path.join(retroDir, rf), 'utf8').split('\n');
        if (lines.length > 25) {
          console.warn(`  ⚠️ Thẻ ${rf} quá dài (${lines.length} dòng, khuyến nghị ≤ 15-20 dòng)`);
        } else {
          console.log(`  ✅ ${rf} (${lines.length} dòng)`);
        }
      }
      if (retroFiles.length === 0) {
        console.log(`  ℹ️ Chưa có Retro Card nào (sẵn sàng đón nhận qua /retro).`);
      }
    }

    console.log('\n────────────────────────────────────────');
    if (issues === 0) {
      console.log('✨ KẾT QUẢ SELF-CHECK: HỆ THỐNG AGENT HOÀN TOÀN KHỎE MẠNH (PASS)\n');
    } else {
      console.log(`⚠️ KẾT QUẢ SELF-CHECK: Phát hiện ${issues} cảnh báo cần tinh chỉnh.\n`);
    }
    break;
  }

  case 'help':
  default: {
    printBanner();
    console.log('Lệnh hỗ trợ:');
    console.log('  node tools/dev.mjs check <tệp>         - Kiểm tra nhanh thẻ HTML, Math, đường dẫn của 1 tệp');
    console.log('  node tools/dev.mjs audit               - Chạy toàn bộ bộ kiểm thử QA Suite');
    console.log('  node tools/dev.mjs selfcheck           - Kiểm tra tính hợp lệ của hệ thống Agent (Commands, Rules, Retro)');
    console.log('  node tools/dev.mjs push "<thông điệp>" - Đóng gói, kiểm tra an toàn & đẩy lên GitHub siêu tốc');
    console.log('  node tools/dev.mjs help                - Hiển thị hướng dẫn này\n');
    break;
  }
}
