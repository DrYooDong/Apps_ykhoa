/**
 * DocSpace — SOAP-to-PICO Engine & EBM Hub Bridge
 * Path: src/content/docspace/features/pico-bridge.ts
 * 
 * Bóc tách tự động 4 yếu tố câu hỏi nghiên cứu PICO từ Bệnh án SOAP:
 * P (Population): Tuổi, giới tính, chẩn đoán chính, các bệnh lý nền
 * I (Intervention): Nhóm thuốc hoặc cận lâm sàng dự kiến can thiệp
 * C (Comparison): Phác đồ chuẩn, giả dược hoặc thuốc đối chứng
 * O (Outcome): Tiêu chí kết cục mong đợi (Giảm tử vong, biến cố tim mạch, an toàn)
 */

import { SoapPatientRecord } from '../types';

export interface PICOQuery {
  population: string;
  intervention: string;
  comparison: string;
  outcome: string;
  fullSearchQuery: string;
  ebmHubUrl: string;
}

/**
 * Trích xuất PICO từ bệnh án SOAP
 */
export function extractPICOFromSoap(patient: SoapPatientRecord): PICOQuery {
  const ageStr = patient.age ? `${patient.age} tuổi` : '';
  const genderStr = patient.gender === 'nam' ? 'nam' : (patient.gender === 'nu' ? 'nữ' : '');
  const dx = patient.currentDiagnosis || patient.admissionDiagnosis || 'Bệnh nhân nội trú';
  
  // Population
  const popElements = [genderStr, ageStr, dx].filter(Boolean).join(', ');
  const population = popElements ? `Bệnh nhân ${popElements}` : dx;

  // Intervention: Lấy từ đơn thuốc hoặc can thiệp trong kế hoạch P
  let intervention = '';
  if (patient.prescriptions && patient.prescriptions.length > 0) {
    intervention = patient.prescriptions.map(p => p.name).slice(0, 2).join(' + ');
  } else if (patient.pPlan) {
    intervention = patient.pPlan.split('\n')[0]?.slice(0, 50) || 'Can thiệp điều trị chuẩn';
  } else {
    intervention = 'Phác đồ điều trị EBM mới';
  }

  // Comparison
  const comparison = 'Phác đồ điều trị thường quy (Standard Care) / Giả dược';

  // Outcome
  let outcome = 'Tử vong mọi nguyên nhân, tái nhập viện, biến cố tim mạch & an toàn';
  const dxLower = dx.toLowerCase();
  if (dxLower.includes('suy tim') || dxLower.includes('tim')) {
    outcome = 'Giảm tử vong do tim mạch, tái nhập viện vì suy tim & cải thiện EF';
  } else if (dxLower.includes('viêm phổi') || dxLower.includes('sepsis') || dxLower.includes('nhiễm')) {
    outcome = 'Tỷ lệ khỏi lâm sàng 14-28 ngày, thời gian thở máy, thời gian nằm ICU';
  } else if (dxLower.includes('thận') || dxLower.includes('ckd')) {
    outcome = 'Làm chậm tiến triển suy thận, giảm đạm niệu & nhu cầu lọc máu';
  } else if (dxLower.includes('đái tháo đường') || dxLower.includes('đường')) {
    outcome = 'Đạt mục tiêu HbA1c, giảm nguy cơ hạ đường huyết & bảo vệ tim thận';
  }

  const fullSearchQuery = `${dx} ${intervention}`.trim();
  const ebmHubUrl = `#/ebm?pico_p=${encodeURIComponent(population)}&pico_i=${encodeURIComponent(intervention)}&pico_c=${encodeURIComponent(comparison)}&pico_o=${encodeURIComponent(outcome)}`;

  return {
    population,
    intervention,
    comparison,
    outcome,
    fullSearchQuery,
    ebmHubUrl
  };
}

/**
 * Render PICO Extraction Modal / Box
 */
export function renderPICOModalHtml(pico: PICOQuery): string {
  return `
    <div class="ebm-pico-modal-content" style="background:var(--color-surface, #fff); border-radius:12px; padding:16px 20px; border:1px solid var(--color-border); box-shadow:0 10px 30px rgba(0,0,0,0.15);">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; border-bottom:1px solid var(--color-border); padding-bottom:8px;">
        <span style="font-size:14px; font-weight:800; color:var(--color-primary); display:flex; align-items:center; gap:6px;">
          <i class="fa-solid fa-microscope" style="color:#0284c7;"></i> Động Cơ Sinh Câu Hỏi PICO Từ Ca Bệnh
        </span>
        <span class="dsp-badge" style="background:rgba(2,132,199,0.1); color:#0284c7; font-weight:700;">EBM Query Generator</span>
      </div>

      <div style="display:flex; flex-direction:column; gap:8px; margin-bottom:14px;">
        <div style="background:rgba(2,132,199,0.06); padding:8px 10px; border-radius:6px; border-left:3px solid #0284c7; font-size:12px;">
          <strong style="color:#0284c7;">[P] Dân số / Bệnh nhân:</strong> ${escapeHtml(pico.population)}
        </div>
        <div style="background:rgba(139,92,246,0.06); padding:8px 10px; border-radius:6px; border-left:3px solid #8b5cf6; font-size:12px;">
          <strong style="color:#7c3aed;">[I] Can thiệp / Phác đồ:</strong> ${escapeHtml(pico.intervention)}
        </div>
        <div style="background:rgba(245,158,11,0.06); padding:8px 10px; border-radius:6px; border-left:3px solid #f59e0b; font-size:12px;">
          <strong style="color:#b45309;">[C] So sánh / Đối chứng:</strong> ${escapeHtml(pico.comparison)}
        </div>
        <div style="background:rgba(16,185,129,0.06); padding:8px 10px; border-radius:6px; border-left:3px solid #10b981; font-size:12px;">
          <strong style="color:#047857;">[O] Kết cục kỳ vọng:</strong> ${escapeHtml(pico.outcome)}
        </div>
      </div>

      <div style="display:flex; justify-content:flex-end; gap:8px;">
        <a href="${pico.ebmHubUrl}" class="dsp-btn dsp-btn-primary dsp-btn-sm" style="font-size:12px; text-decoration:none; display:inline-flex; align-items:center; gap:5px;">
          <i class="fa-solid fa-magnifying-glass"></i> Mở Tìm Kiếm PICO Trong EBM Hub →
        </a>
      </div>
    </div>
  `;
}

function escapeHtml(str: string): string {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
