/**
 * report-generator.mjs - HTML & JSON Report Generator for Deduplication Engine
 * Xuất giao diện báo cáo chuyên nghiệp chuẩn thẩm mỹ CliniPortal
 */

import fs from 'fs';
import path from 'path';

export function generateHtmlReport(summaryResults, outputPath) {
  const timestamp = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
  const totalCritical = 
    (summaryResults.criteria?.exactDupsWithinDisease?.length || 0) +
    (summaryResults.cases?.exactIdDups?.length || 0) +
    (summaryResults.soap?.orphanCatalogEntries?.length || 0) +
    (summaryResults.soap?.duplicateCatalogEntries?.length || 0) +
    (summaryResults.protocol?.exactDrugDupsInBranch?.length || 0);

  const totalWarnings = 
    (summaryResults.criteria?.semanticNearDups?.length || 0) +
    (summaryResults.criteria?.crossDiseaseConflicts?.length || 0) +
    (summaryResults.cases?.nearDuplicateCases?.length || 0) +
    (summaryResults.cases?.exactVitalsFingerprint?.length || 0) +
    (summaryResults.soap?.unregisteredMdFiles?.length || 0) +
    (summaryResults.soap?.nearDuplicateSoapCases?.length || 0) +
    (summaryResults.protocol?.nearDrugDupsInBranch?.length || 0) +
    (summaryResults.protocol?.duplicateTreatmentsInProblem?.length || 0);

  const totalFixed = 
    (summaryResults.criteria?.fixedCount || 0) +
    (summaryResults.cases?.fixedCount || 0) +
    (summaryResults.soap?.fixedCount || 0) +
    (summaryResults.protocol?.fixedCount || 0);

  const statusBadge = totalCritical === 0 
    ? '<span class="badge badge-success">✅ SẠCH LỖI TRÙNG CRITICAL</span>'
    : `<span class="badge badge-danger">🚨 PHÁT HIỆN ${totalCritical} LỖI CRITICAL</span>`;

  const html = `<!DOCTYPE html>
<html lang="vi" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Báo Cáo Lọc Trùng Y Khoa — CliniPortal DocSpace</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <style>
    :root {
      --bg: #090d16;
      --surface: #111827;
      --surface-card: #1f2937;
      --border: #374151;
      --text: #f3f4f6;
      --text-muted: #9ca3af;
      --primary: #0ea5e9;
      --success: #10b981;
      --warning: #f59e0b;
      --danger: #ef4444;
      --radius: 12px;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background: var(--bg);
      color: var(--text);
      line-height: 1.6;
      padding: 24px;
    }
    .container { max-width: 1200px; margin: 0 auto; }
    header {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 24px;
      margin-bottom: 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 16px;
    }
    .header-title h1 { font-size: 24px; font-weight: 700; color: #fff; display: flex; align-items: center; gap: 10px; }
    .header-title p { color: var(--text-muted); font-size: 14px; margin-top: 4px; }
    .badge {
      display: inline-flex;
      align-items: center;
      padding: 6px 12px;
      border-radius: 9999px;
      font-size: 13px;
      font-weight: 600;
    }
    .badge-success { background: rgba(16, 185, 129, 0.15); color: var(--success); border: 1px solid var(--success); }
    .badge-danger { background: rgba(239, 68, 68, 0.15); color: var(--danger); border: 1px solid var(--danger); }
    .badge-warning { background: rgba(245, 158, 11, 0.15); color: var(--warning); border: 1px solid var(--warning); }
    
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 16px;
      margin-bottom: 24px;
    }
    .stat-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 16px 20px;
    }
    .stat-card .label { font-size: 13px; color: var(--text-muted); text-transform: uppercase; font-weight: 600; }
    .stat-card .value { font-size: 28px; font-weight: 800; margin-top: 4px; }
    .stat-card.critical .value { color: var(--danger); }
    .stat-card.warning .value { color: var(--warning); }
    .stat-card.success .value { color: var(--success); }
    .stat-card.primary .value { color: var(--primary); }

    .section {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 24px;
      margin-bottom: 24px;
    }
    .section-title {
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid var(--border);
      padding-bottom: 12px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 12px;
      font-size: 14px;
    }
    th, td {
      padding: 10px 14px;
      text-align: left;
      border-bottom: 1px solid var(--border);
    }
    th { background: rgba(255, 255, 255, 0.03); color: var(--text-muted); font-weight: 600; }
    tr:hover td { background: rgba(255, 255, 255, 0.02); }
    .empty-msg { color: var(--success); padding: 12px 0; font-size: 14px; display: flex; align-items: center; gap: 8px; }
    .code-tag {
      font-family: monospace;
      background: rgba(255, 255, 255, 0.08);
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 12px;
      color: #38bdf8;
    }
    .pill {
      display: inline-block;
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 11px;
      font-weight: 600;
    }
    .pill-red { background: rgba(239, 68, 68, 0.2); color: #f87171; }
    .pill-yellow { background: rgba(245, 158, 11, 0.2); color: #fbbf24; }
    .pill-blue { background: rgba(14, 165, 233, 0.2); color: #38bdf8; }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <div class="header-title">
        <h1><i class="fa-solid fa-filter-circle-dollar" style="color: #0ea5e9;"></i> DocSpace Deduplication Engine</h1>
        <p>Báo cáo tự động kiểm soát & lọc trùng dữ liệu y khoa | Thời gian: ${timestamp}</p>
      </div>
      <div>${statusBadge}</div>
    </header>

    <div class="stats-grid">
      <div class="stat-card critical">
        <div class="label">Lỗi Critical (Exact)</div>
        <div class="value">${totalCritical}</div>
      </div>
      <div class="stat-card warning">
        <div class="label">Cảnh báo (Near-Dup)</div>
        <div class="value">${totalWarnings}</div>
      </div>
      <div class="stat-card success">
        <div class="label">Đã Tự Động Sửa</div>
        <div class="value">${totalFixed}</div>
      </div>
      <div class="stat-card primary">
        <div class="label">Tổng Bệnh Học Quét</div>
        <div class="value">${summaryResults.criteria?.totalDiseases || 0}</div>
      </div>
    </div>

    <!-- SCOPE 1: TIÊU CHUẨN CHẨN ĐOÁN -->
    <div class="section">
      <div class="section-title">
        <span><i class="fa-solid fa-stethoscope" style="color: #0ea5e9;"></i> 1. Tiêu Chuẩn Chẩn Đoán (Criteria)</span>
        <span class="pill pill-blue">${summaryResults.criteria?.totalCriteriaScanned || 0} tiêu chuẩn</span>
      </div>
      
      ${summaryResults.criteria?.exactDupsWithinDisease?.length > 0 ? `
        <h4 style="color: #ef4444; margin: 12px 0;"><i class="fa-solid fa-circle-exclamation"></i> Trùng Lặp Exact ID Trong Cùng Bệnh:</h4>
        <table>
          <thead>
            <tr><th>Bệnh</th><th>Criteria ID</th><th>Label bản 1</th><th>Label bản 2</th></tr>
          </thead>
          <tbody>
            ${summaryResults.criteria.exactDupsWithinDisease.map(d => `
              <tr>
                <td><strong>${d.diseaseName}</strong> (<span class="code-tag">${d.diseaseSlug}</span>)</td>
                <td><span class="code-tag">${d.criteriaId}</span></td>
                <td>${d.firstOccurrence?.label || ''}</td>
                <td>${d.duplicateOccurrence?.label || ''}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      ` : '<div class="empty-msg"><i class="fa-solid fa-check"></i> Không có tiêu chuẩn nào trùng Exact ID trong cùng bệnh.</div>'}

      ${summaryResults.criteria?.semanticNearDups?.length > 0 ? `
        <h4 style="color: #f59e0b; margin: 16px 0 8px;"><i class="fa-solid fa-triangle-exclamation"></i> Tiêu Chuẩn Gần Trùng Triệu Chứng / Nhãn (Near-Duplicates):</h4>
        <table>
          <thead>
            <tr><th>Bệnh</th><th>Cặp Criteria ID</th><th>Độ tương đồng</th><th>Triệu chứng chung</th></tr>
          </thead>
          <tbody>
            ${summaryResults.criteria.semanticNearDups.slice(0, 10).map(d => `
              <tr>
                <td>${d.diseaseName}</td>
                <td><span class="code-tag">${d.idA}</span> <br> <span class="code-tag">${d.idB}</span></td>
                <td><span class="pill pill-yellow">Symptom: ${(d.symptomSimilarity * 100).toFixed(0)}%</span></td>
                <td>${(d.commonSymptoms || []).slice(0, 4).join(', ')}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      ` : ''}
    </div>

    <!-- SCOPE 2: PHÁC ĐỒ ĐIỀU TRỊ -->
    <div class="section">
      <div class="section-title">
        <span><i class="fa-solid fa-prescription-bottle-medical" style="color: #10b981;"></i> 2. Phác Đồ Điều Trị & Danh Mục Thuốc</span>
        <span class="pill pill-blue">${summaryResults.protocol?.totalDrugsScanned || 0} thuốc đã quét</span>
      </div>

      ${summaryResults.protocol?.exactDrugDupsInBranch?.length > 0 ? `
        <h4 style="color: #ef4444; margin: 12px 0;"><i class="fa-solid fa-circle-exclamation"></i> Trùng Thuốc & Liều Trong Cùng Nhánh:</h4>
        <table>
          <thead>
            <tr><th>Bệnh</th><th>Nhánh</th><th>Tên thuốc</th><th>Liều lượng</th></tr>
          </thead>
          <tbody>
            ${summaryResults.protocol.exactDrugDupsInBranch.map(d => `
              <tr>
                <td><strong>${d.diseaseName}</strong></td>
                <td>${d.branchName}</td>
                <td><strong style="color: #ef4444;">${d.drugName}</strong></td>
                <td>${d.dose}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      ` : '<div class="empty-msg"><i class="fa-solid fa-check"></i> Không có thuốc nào bị trùng lặp chính xác trong cùng một nhánh.</div>'}
    </div>

    <!-- SCOPE 3: BỆNH ÁN SOAP & CATALOG -->
    <div class="section">
      <div class="section-title">
        <span><i class="fa-solid fa-book-medical" style="color: #f59e0b;"></i> 3. Bệnh Án SOAP & Catalog Thực Hành</span>
        <span class="pill pill-blue">${summaryResults.soap?.totalMdFiles || 0} files / ${summaryResults.soap?.totalCatalogEntries || 0} catalog</span>
      </div>

      ${summaryResults.soap?.orphanCatalogEntries?.length > 0 ? `
        <h4 style="color: #ef4444; margin: 12px 0;"><i class="fa-solid fa-circle-exclamation"></i> Catalog Trỏ File Không Tồn Tại (Mồ Côi):</h4>
        <table>
          <thead>
            <tr><th>Catalog ID</th><th>Tiêu đề</th><th>File bị thiếu</th></tr>
          </thead>
          <tbody>
            ${summaryResults.soap.orphanCatalogEntries.map(d => `
              <tr>
                <td><span class="code-tag">${d.id}</span></td>
                <td>${d.title}</td>
                <td><span class="pill pill-red">${d.missingFile}</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      ` : '<div class="empty-msg"><i class="fa-solid fa-check"></i> 100% Entry trong Catalog đều trỏ đúng file .md thực tế.</div>'}

      ${summaryResults.soap?.duplicateCatalogEntries?.length > 0 ? `
        <h4 style="color: #ef4444; margin: 12px 0;"><i class="fa-solid fa-circle-exclamation"></i> Trùng Lặp Entry Trong Catalog:</h4>
        <table>
          <thead><tr><th>ID</th><th>Tiêu đề</th><th>Lý do</th></tr></thead>
          <tbody>
            ${summaryResults.soap.duplicateCatalogEntries.map(d => `
              <tr><td><span class="code-tag">${d.id}</span></td><td>${d.title}</td><td>${d.reason}</td></tr>
            `).join('')}
          </tbody>
        </table>
      ` : ''}

      ${summaryResults.soap?.unregisteredMdFiles?.length > 0 ? `
        <h4 style="color: #f59e0b; margin: 12px 0;"><i class="fa-solid fa-triangle-exclamation"></i> File .md Tồn Tại Chưa Được Đăng Ký Catalog:</h4>
        <table>
          <thead><tr><th>Tên file</th><th>Đường dẫn</th></tr></thead>
          <tbody>
            ${summaryResults.soap.unregisteredMdFiles.map(d => `
              <tr><td><span class="code-tag">${d.fileName}</span></td><td>${d.filePath}</td></tr>
            `).join('')}
          </tbody>
        </table>
      ` : '<div class="empty-msg"><i class="fa-solid fa-check"></i> Toàn bộ file .md đều đã được đăng ký trong catalog.</div>'}
    </div>

    <!-- SCOPE 4: CA MẪU LÂM SÀNG -->
    <div class="section">
      <div class="section-title">
        <span><i class="fa-solid fa-hospital-user" style="color: #8b5cf6;"></i> 4. Ca Mẫu Lâm Sàng (Sample Cases)</span>
        <span class="pill pill-blue">${summaryResults.cases?.totalCasesScanned || 0} ca mẫu</span>
      </div>

      ${summaryResults.cases?.exactIdDups?.length > 0 ? `
        <h4 style="color: #ef4444; margin: 12px 0;"><i class="fa-solid fa-circle-exclamation"></i> Ca Mẫu Bị Trùng Exact ID:</h4>
        <table>
          <thead><tr><th>ID</th><th>Tên ca bệnh</th><th>Bệnh ID</th></tr></thead>
          <tbody>
            ${summaryResults.cases.exactIdDups.map(d => `
              <tr><td><span class="code-tag">${d.id}</span></td><td>${d.ten}</td><td>${d.benhId}</td></tr>
            `).join('')}
          </tbody>
        </table>
      ` : '<div class="empty-msg"><i class="fa-solid fa-check"></i> Không có ca mẫu nào bị trùng Exact ID.</div>'}

      ${summaryResults.cases?.nearDuplicateCases?.length > 0 ? `
        <h4 style="color: #f59e0b; margin: 12px 0;"><i class="fa-solid fa-triangle-exclamation"></i> Ca Mẫu Cùng Bệnh Có Triệu Chứng Gần Trùng Hệt:</h4>
        <table>
          <thead><tr><th>Bệnh</th><th>Ca A</th><th>Ca B</th><th>Độ tương đồng</th></tr></thead>
          <tbody>
            ${summaryResults.cases.nearDuplicateCases.map(d => `
              <tr>
                <td><span class="code-tag">${d.benhId}</span></td>
                <td>${d.caseA.ten} (<span class="code-tag">${d.caseA.id}</span>)</td>
                <td>${d.caseB.ten} (<span class="code-tag">${d.caseB.id}</span>)</td>
                <td><span class="pill pill-yellow">${(d.symptomSimilarity * 100).toFixed(0)}%</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      ` : ''}
    </div>

  </div>
</body>
</html>`;

  fs.writeFileSync(outputPath, html, 'utf8');
}
