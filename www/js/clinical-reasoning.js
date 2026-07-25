/**
 * Clinical Reasoning Engine — CliniPortal
 * Xử lý logic 3 Framework: SBAR, SNAPPS & Semantic Qualifier Grid
 */

(function () {
  'use strict';

  let currentFramework = 'sbar';

  function switchFramework(frameworkKey) {
    currentFramework = frameworkKey;

    document.querySelectorAll('.framework-tab').forEach(tab => {
      tab.classList.toggle('active', tab.getAttribute('data-framework') === frameworkKey);
    });

    document.querySelectorAll('.framework-panel').forEach(panel => {
      panel.style.display = panel.id === `panel-${frameworkKey}` ? 'block' : 'none';
    });

    const outputEl = document.getElementById('output-preview');
    if (outputEl) outputEl.style.display = 'none';
  }

  function generateSBARText() {
    const situation = document.getElementById('sbar-situation')?.value || '';
    const background = document.getElementById('sbar-background')?.value || '';
    const assessment = document.getElementById('sbar-assessment')?.value || '';
    const recommendation = document.getElementById('sbar-recommendation')?.value || '';

    return `=== BÁO CÁO BỆNH NHÂN THEO CHUẨN SBAR ===
[S - Situation (Tình huống)]
${situation || '(Chưa nhập)'}

[B - Background (Bối cảnh)]
${background || '(Chưa nhập)'}

[A - Assessment (Đánh giá)]
${assessment || '(Chưa nhập)'}

[R - Recommendation (Đề xuất)]
${recommendation || '(Chưa nhập)'}`;
  }

  function generateSNAPPS Text() {
    const s = document.getElementById('snapps-s')?.value || '';
    const n = document.getElementById('snapps-n')?.value || '';
    const a = document.getElementById('snapps-a')?.value || '';
    const p = document.getElementById('snapps-p')?.value || '';
    const pl = document.getElementById('snapps-plan')?.value || '';

    return `=== TRÌNH BỆNH ÁN THEO CHUẨN SNAPPS ===
[1. Summarize - Tóm tắt bệnh án]
${s || '(Chưa nhập)'}

[2. Narrow - Bảng Chẩn đoán Phân biệt]
${n || '(Chưa nhập)'}

[3. Analyze - Phân tích so sánh]
${a || '(Chưa nhập)'}

[4. Probe - Đặt câu hỏi với Giảng viên/Bác sĩ chính]
${p || '(Chưa nhập)'}

[5. Plan - Kế hoạch Quản lý & Kế hoạch Học tập]
${pl || '(Chưa nhập)'}`;
  }

  function generateOutput() {
    let text = '';
    if (currentFramework === 'sbar') text = generateSBARText();
    else if (currentFramework === 'snapps') text = generateSNAPPS Text();

    const outputEl = document.getElementById('output-preview');
    if (outputEl) {
      outputEl.textContent = text;
      outputEl.style.display = 'block';
      outputEl.scrollIntoView({ behavior: 'smooth' });
    }
  }

  function copyToClipboard() {
    const outputEl = document.getElementById('output-preview');
    if (!outputEl || !outputEl.textContent) return;

    navigator.clipboard.writeText(outputEl.textContent).then(() => {
      alert('📋 Đã sao chép nội dung vào Clipboard!');
    }).catch(err => {
      console.error('Copy error', err);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.framework-tab').forEach(tab => {
      tab.addEventListener('click', function () {
        switchFramework(this.getAttribute('data-framework'));
      });
    });

    document.getElementById('btn-generate-output')?.addEventListener('click', generateOutput);
    document.getElementById('btn-copy-output')?.addEventListener('click', copyToClipboard);
  });
})();
