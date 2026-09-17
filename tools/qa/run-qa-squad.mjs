#!/usr/bin/env node

/**
 * 🎯 QA SQUAD CONDUCTOR — Master Orchestrator Runner
 * CliniPortal QA Agent Squad
 * 
 * Chức năng:
 *  1. Điều phối chạy tuần tự toàn bộ 5 Agent chuyên trách (AGENT-01 -> AGENT-05).
 *  2. Đo lường thời gian thực thi, thu thập trạng thái và mã lỗi của từng Agent.
 *  3. Định dạng bảng tổng hợp kết quả (Audit Summary Matrix) trực quan trên console.
 *  4. Xuất báo cáo tự động sang JSON: tools/qa/reports/qa-report-latest.json.
 *  5. Trả về mã thoát (exit code) chuẩn mực cho CI/CD hoặc Git pre-commit hook.
 * 
 * Sử dụng:
 *  node tools/qa/run-qa-squad.mjs
 *  node tools/qa/run-qa-squad.mjs --verbose
 */

import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '../..');
const REPORTS_DIR = path.join(__dirname, 'reports');

const isVerbose = process.argv.includes('--verbose');

const SQUAD_MEMBERS = [
  {
    id: 'AGENT-01',
    name: 'SVG & KaTeX QA Auditor',
    script: 'agent01-svg-katex-audit.mjs',
    desc: 'Quét ký tự box-drawing rác, code block thô và chuẩn hóa KaTeX'
  },
  {
    id: 'AGENT-02',
    name: 'CSS Layout & Card Stacking Auditor',
    script: 'agent02-css-layout-audit.mjs',
    desc: 'Bảo vệ xếp chồng dọc infobox và định nghĩa typography'
  },
  {
    id: 'AGENT-03',
    name: 'Dark Mode & Design Token Auditor',
    script: 'agent03-darkmode-token-audit.mjs',
    desc: 'Kiểm soát hardcoded hex, tương thích [data-theme="dark"]'
  },
  {
    id: 'AGENT-04',
    name: 'SPA Reader View Injection Auditor',
    script: 'agent04-spa-reader-audit.mjs',
    desc: 'Xác thực nạp dynamic CSS và override container trong SPA'
  },
  {
    id: 'AGENT-05',
    name: 'JSON Schema & Clinical Rules Validator',
    script: 'agent05-json-schema-validator.mjs',
    desc: 'Rà soát lỗi escape \\_, mảng suy luận dd và vault-catalog'
  }
];

console.log('\n╔════════════════════════════════════════════════════════════════════════════════╗');
console.log('║               🎯 CLINIPORTAL QA AGENT SQUAD — MASTER RUNNER                   ║');
console.log('║       Hệ thống điều phối 5 Agent chuyên trách kiểm định chất lượng y khoa      ║');
console.log('╚════════════════════════════════════════════════════════════════════════════════╝\n');

const startTime = Date.now();
const results = [];
let squadHasError = false;

for (let i = 0; i < SQUAD_MEMBERS.length; i++) {
  const member = SQUAD_MEMBERS[i];
  const scriptPath = path.join(__dirname, member.script);

  console.log(`[${i + 1}/${SQUAD_MEMBERS.length}] 🚀 Đang kích hoạt ${member.id}: ${member.name}...`);

  const agentStart = Date.now();
  const proc = spawnSync(process.execPath, [scriptPath], {
    cwd: ROOT_DIR,
    encoding: 'utf8'
  });
  const duration = Date.now() - agentStart;

  const passed = proc.status === 0;
  if (!passed) squadHasError = true;

  results.push({
    id: member.id,
    name: member.name,
    script: member.script,
    desc: member.desc,
    passed,
    exitCode: proc.status,
    durationMs: duration,
    output: proc.stdout || proc.stderr || ''
  });

  if (isVerbose) {
    console.log(proc.stdout || proc.stderr);
  } else {
    if (passed) {
      console.log(`    ✅ Hoàn tất thành công (${duration}ms)\n`);
    } else {
      console.log(`    ❌ Thất bại (Mã lỗi: ${proc.status})\n`);
      console.log(proc.stdout || proc.stderr);
    }
  }
}

const totalDuration = Date.now() - startTime;

// In bảng tóm tắt
console.log('════════════════════════════════════════════════════════════════════════════════');
console.log('📊 BẢNG TỔNG HỢP KẾT QUẢ KIỂM ĐỊNH (SQUAD AUDIT MATRIX)');
console.log('════════════════════════════════════════════════════════════════════════════════');
console.log(`| Vai trò   | Tên Tác Tử                           | Thời gian | Trạng Thái |`);
console.log(`|-----------|--------------------------------------|-----------|------------|`);

for (const r of results) {
  const statusBadge = r.passed ? '🟢 PASS    ' : '🔴 FAIL    ';
  const paddedId = r.id.padEnd(9, ' ');
  const paddedName = r.name.padEnd(36, ' ');
  const paddedTime = `${r.durationMs}ms`.padStart(7, ' ');
  console.log(`| ${paddedId} | ${paddedName} |   ${paddedTime} | ${statusBadge} |`);
}

console.log('════════════════════════════════════════════════════════════════════════════════');
console.log(`⏱️  Tổng thời gian thực thi: ${(totalDuration / 1000).toFixed(2)}s`);

// Lưu báo cáo JSON
if (!fs.existsSync(REPORTS_DIR)) {
  fs.mkdirSync(REPORTS_DIR, { recursive: true });
}

const reportPayload = {
  timestamp: new Date().toISOString(),
  totalDurationMs: totalDuration,
  overallStatus: squadHasError ? 'FAIL' : 'PASS',
  summary: results.map(r => ({
    id: r.id,
    name: r.name,
    passed: r.passed,
    exitCode: r.exitCode,
    durationMs: r.durationMs
  }))
};

const reportFilePath = path.join(REPORTS_DIR, 'qa-report-latest.json');
fs.writeFileSync(reportFilePath, JSON.stringify(reportPayload, null, 2), 'utf8');
console.log(`📄 Đã lưu báo cáo chi tiết tại: tools/qa/reports/qa-report-latest.json\n`);

if (squadHasError) {
  console.log('❌ [MERGE GATE REJECTED] Có ít nhất một tác tử phát hiện lỗi nghiêm trọng. Cần xử lý trước khi hợp nhất!\n');
  process.exit(1);
} else {
  console.log('🎉 [MERGE GATE APPROVED] Toàn bộ 5 tác tử QA Agent Squad đều đạt 100% tiêu chuẩn chất lượng!\n');
  process.exit(0);
}
