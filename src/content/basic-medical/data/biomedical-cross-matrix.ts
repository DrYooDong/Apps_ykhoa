/**
 * CliniPortal — Multi-Disciplinary Biomedical Knowledge Mesh
 * Path: src/content/basic-medical/data/biomedical-cross-matrix.ts
 * 
 * Ma trận tri thức liên thông 4 chiều giữa 4 Trụ Cột Lý Thuyết & 4 Bộ Công Cụ Tương Tác:
 * [GP-SL Giải Phẫu - Sinh Lý] ⟷ [CCBS Cơ Chế Bệnh Sinh] ⟷ [HS-CH Hóa Sinh] ⟷ [DTH Dịch Tễ Học] ⟷ [Simulators / Formula]
 */

export interface CrossDisciplinaryLink {
  systemId: string;
  systemName: string;
  systemIcon: string;
  systemColor: string;
  keywords: string[];
  physioLink: {
    title: string;
    hash: string;
    description: string;
  };
  pathoLink: {
    title: string;
    hash: string;
    description: string;
  };
  biochemLink: {
    title: string;
    hash: string;
    description: string;
  };
  epiLink: {
    title: string;
    hash: string;
    description: string;
  };
  interactiveTools: Array<{
    name: string;
    hash: string;
    icon: string;
    type: 'sim' | 'calc' | 'map';
  }>;
}

export const BIOMEDICAL_CROSS_MATRIX: CrossDisciplinaryLink[] = [
  // 1. TIM MẠCH (CARDIOVASCULAR)
  {
    systemId: 'cardiovascular',
    systemName: 'Hệ Tim Mạch & Tuần Hoàn',
    systemIcon: 'fa-heart-pulse',
    systemColor: '#0284c7',
    keywords: ['tim', 'mach', 'suy tim', 'rung nhi', 'huyet ap', 'vanh', 'cardio', 'st', 'tha', 'poaf', 'troponin', 'frank-starling'],
    physioLink: {
      title: 'Sinh Lý Tim Mạch & Điện Thế Hoạt Động',
      hash: '#/basic-medical/physiology/part4/sl-tuan-hoan-tim',
      description: 'Chu chuyển tim, điện thế hoạt động sợi cơ tim, định luật Frank-Starling và huyết động học mao mạch.'
    },
    pathoLink: {
      title: 'Cơ Chế Bệnh Sinh Suy Tim & Rung Nhĩ',
      hash: '#/basic-medical/cases/slb-ccbs-st',
      description: 'Tái cấu trúc cơ tim buồng thất, hoạt hóa quá mức RAAS/SNS và rò rỉ Ca2+ qua thụ thể RyR2 gây rung nhĩ.'
    },
    biochemLink: {
      title: 'Men Tim & Chuyển Hóa Lipid Máu (Block 7)',
      hash: '#/basic-medical/hoa-sinh',
      description: 'Động học phóng thích hs-cTnT/I, CK-MB trong hoại tử cơ tim và cơ chế xơ vữa của ApoB/LDL-C.'
    },
    epiLink: {
      title: 'Dịch Tễ Học Bệnh Tim Thiếu Máu Cục Bộ',
      hash: '#/basic-medical/dich-te-hoc',
      description: 'Gánh rộng tử vong tim mạch toàn cầu, tỷ lệ hiện mắc THA và yếu tố nguy cơ tim mạch SCORE2.'
    },
    interactiveTools: [
      { name: 'Mô Phỏng Cơ Học Frank-Starling', hash: '#/basic-medical/simulators', icon: 'fa-bolt', type: 'sim' },
      { name: 'Tính eGFR & Phân Suất Tống Máu', hash: '#/basic-medical/formula-vault', icon: 'fa-calculator', type: 'calc' }
    ]
  },

  // 2. HÔ HẤP (RESPIRATORY)
  {
    systemId: 'respiratory',
    systemName: 'Hệ Hô Hấp & Trao Đổi Khí',
    systemIcon: 'fa-lungs',
    systemColor: '#059669',
    keywords: ['ho hap', 'phoi', 'copd', 'hen', 'ards', 'khi mau', 'pao2', 'fio2', 'paco2', 'winters', 'respiratory'],
    physioLink: {
      title: 'Sinh Lý Thông Khí & Khuếch Tán Khí Phế Nang',
      hash: '#/basic-medical/physiology/part4/sl-ho-hap',
      description: 'Cơ học hô hấp, suất đàn phổi, màng phế nang mao mạch và phân ly oxyhemoglobin.'
    },
    pathoLink: {
      title: 'Cơ Chế Viêm Đường Thở COPD, Hen & ARDS',
      hash: '#/basic-medical/cases/slb-ccbs-copd',
      description: 'Viêm Type 2 qua tế bào ái toan (IL-4, IL-5) vs Viêm Neutrophils khói thuốc và tổn thương màng phế nang ARDS.'
    },
    biochemLink: {
      title: 'Khí Máu Động Mạch & Hệ Đệm Acid-Base (Block 4)',
      hash: '#/basic-medical/hoa-sinh',
      description: 'Phương trình Henderson-Hasselbalch, hệ đệm Bicarbonate/Hemoglobin và vận chuyển CO2 trong máu.'
    },
    epiLink: {
      title: 'Dịch Tễ Học COPD, Hen Suyễn & Lao Phổi',
      hash: '#/basic-medical/dich-te-hoc',
      description: 'Dịch tễ học phơi nhiễm khói thuốc, chỉ số gánh nặng bệnh tật DALY và chiến lược kiểm soát lao WHO.'
    },
    interactiveTools: [
      { name: 'Mô Phỏng Toan Kiềm Henderson-Hasselbalch', hash: '#/basic-medical/simulators', icon: 'fa-bolt', type: 'sim' },
      { name: 'Tính Công Thức Winters & Tỷ Số P/F', hash: '#/basic-medical/formula-vault', icon: 'fa-calculator', type: 'calc' }
    ]
  },

  // 3. THẬN & NỘI MÔI (RENAL & FLUID HOMEOSTASIS)
  {
    systemId: 'renal',
    systemName: 'Hệ Thận & Thăng Bằng Nội Môi',
    systemIcon: 'fa-filter',
    systemColor: '#0891b2',
    keywords: ['than', 'loc cau than', 'gfr', 'egfr', 'aki', 'ckd', 'fena', 'starling', 'phu', 'nephron', 'creatinine'],
    physioLink: {
      title: 'Sinh Lý Lọc Cầu Thận & Tái Hấp Thu Ống Thận',
      hash: '#/basic-medical/physiology/part6/sl-than-chuc-nang',
      description: 'Cơ chế ngược dòng cô đặc nước tiểu ở quai Henle, điều hòa GFR qua phản hồi TGF và bài tiết ion.'
    },
    pathoLink: {
      title: 'Cơ Chế Bệnh Sinh AKI & Bệnh Thận ĐTĐ (DKD)',
      hash: '#/basic-medical/cases/slb-ccbs-aki',
      description: 'Hoại tử ống thận cấp thiếu máu cục bộ (ATN), tăng áp lực lọc nội cầu thận và xơ hóa mô kẽ thận.'
    },
    biochemLink: {
      title: 'Thoái Hóa Acid Amin & Creatinine/Ure/Acid Uric',
      hash: '#/basic-medical/hoa-sinh',
      description: 'Chu trình Ure ở gan, nguồn gốc sinh hóa của Creatinine từ Phosphocreatine và chuyển hóa Purine.'
    },
    epiLink: {
      title: 'Dịch Tễ Học Bệnh Thận Mạn (CKD) Giai Đoạn Cuối',
      hash: '#/basic-medical/dich-te-hoc',
      description: 'Tỷ lệ suy thận tiến triển tại các nước đang phát triển, biến chứng tim mạch ở bệnh nhân chạy thận nhân tạo.'
    },
    interactiveTools: [
      { name: 'Mô Phỏng Lực Starling Vi Tuần Hoàn & Phù', hash: '#/basic-medical/simulators', icon: 'fa-bolt', type: 'sim' },
      { name: 'Tính FENa & eGFR CKD-EPI 2021', hash: '#/basic-medical/formula-vault', icon: 'fa-calculator', type: 'calc' }
    ]
  },

  // 4. NỘI TIẾT & CHUYỂN HÓA (ENDOCRINE & METABOLISM)
  {
    systemId: 'endocrine',
    systemName: 'Hệ Nội Tiết & Rối Loạn Chuyển Hóa',
    systemIcon: 'fa-dna',
    systemColor: '#8b5cf6',
    keywords: ['noi tiet', 'tieu duong', 'dtd', 'insulin', 'glucagon', 'cushing', 'giap', 'dka', 'metabolic', 'krebs', 'duong phan'],
    physioLink: {
      title: 'Sinh Lý Trục Hạ Đồi - Tuyến Yên & Tụy Nội Tiết',
      hash: '#/basic-medical/physiology/part7/sl-tuyen-yen',
      description: 'Cơ chế điều hòa Feedback âm tính, bài tiết hormon Insulin/Glucagon và hormon tuyến giáp T3/T4.'
    },
    pathoLink: {
      title: 'Cơ Chế ĐTĐ Típ 1/2, Nhiễm Toan Ceton DKA & Bão Giáp',
      hash: '#/basic-medical/cases/slb-ccbs-dtd-than-man',
      description: 'Đề kháng insulin mô đích, cạn kiệt tế bào beta đảo tụy, tích tụ thể cetone và bão hormone giáp.'
    },
    biochemLink: {
      title: 'Chuyển Hóa Carbohydrate & Chu Trình Krebs (Block 3-4)',
      hash: '#/basic-medical/hoa-sinh',
      description: 'Đường phân Glycolysis, Tân tạo glucose Gluconeogenesis, Chuỗi chuyền electron ETC ti thể và thể Cetone.'
    },
    epiLink: {
      title: 'Dịch Tễ Học Đái Tháo Đường & Hội Chứng Chuyển Hóa',
      hash: '#/basic-medical/dich-te-hoc',
      description: 'Đại dịch ĐTĐ toàn cầu theo IDF Diabetes Atlas, gánh nặng biến chứng bàn chân và mù lòa do ĐTĐ.'
    },
    interactiveTools: [
      { name: 'Bản Đồ Chuyển Hóa Phân Tử Động', hash: '#/basic-medical/metabolic-map', icon: 'fa-diagram-project', type: 'map' },
      { name: 'Tính Khoảng Trống Anion Gap Máu', hash: '#/basic-medical/formula-vault', icon: 'fa-calculator', type: 'calc' }
    ]
  }
];

/**
 * Tìm kiếm các liên kết đa phân hệ phù hợp với từ khóa/slug của bài học
 */
export function getCrossDisciplinaryLinksForTopic(topicOrKeyword: string): CrossDisciplinaryLink[] {
  if (!topicOrKeyword) return [];
  const q = topicOrKeyword.toLowerCase().trim();
  return BIOMEDICAL_CROSS_MATRIX.filter(item => 
    item.keywords.some(k => q.includes(k) || k.includes(q)) ||
    item.systemName.toLowerCase().includes(q)
  );
}

/**
 * Render Widget HTML Tri Thức Đa Phân Hệ Liên Quan
 */
export function renderCrossDisciplinaryWidgetHtml(link: CrossDisciplinaryLink): string {
  return `
    <div class="biomedical-cross-mesh-widget" style="background:linear-gradient(135deg, rgba(2,132,199,0.05), rgba(139,92,246,0.04)); border:1.5px solid var(--color-border, #cbd5e1); border-radius:14px; padding:18px 20px; margin:2rem 0; box-shadow:0 4px 18px rgba(0,0,0,0.03);">
      
      <!-- Header -->
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; flex-wrap:wrap; gap:8px; border-bottom:1px solid var(--color-border, #e2e8f0); padding-bottom:10px;">
        <div style="display:flex; align-items:center; gap:9px;">
          <div style="width:34px; height:34px; border-radius:9px; background:${link.systemColor}; color:#fff; display:flex; align-items:center; justify-content:center; font-size:15px;">
            <i class="fa-solid ${link.systemIcon}"></i>
          </div>
          <div>
            <span style="font-size:10.5px; font-weight:800; text-transform:uppercase; color:${link.systemColor}; letter-spacing:0.04em;">
              🌐 Mạng Lưới Tri Thức Y Sinh Đa Chiều (Cross-Disciplinary Mesh)
            </span>
            <h4 style="margin:2px 0 0; font-size:15px; font-weight:800; color:var(--color-text, #0f172a);">
              ${escapeHtml(link.systemName)}
            </h4>
          </div>
        </div>
        <span style="font-size:11px; font-weight:700; color:var(--color-text-muted); background:var(--color-surface); padding:3px 10px; border-radius:999px; border:1px solid var(--color-border);">
          4 Phân Hệ + Công Cụ
        </span>
      </div>

      <!-- 4 Pillars Cards Grid -->
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:10px; margin-bottom:14px;">
        
        <!-- 1. Sinh lý -->
        <a href="${link.physioLink.hash}" style="background:var(--color-surface, #fff); border:1px solid var(--color-border, #e2e8f0); border-radius:10px; padding:10px 12px; text-decoration:none; color:inherit; border-left:3.5px solid #0284c7; display:flex; flex-direction:column; justify-content:space-between; transition:transform 0.15s ease;">
          <div>
            <span style="font-size:10px; font-weight:800; color:#0284c7; text-transform:uppercase;">🧬 Sinh Lý Học (GP-SL)</span>
            <div style="font-size:12.5px; font-weight:700; color:var(--color-text); margin:3px 0;">${escapeHtml(link.physioLink.title)}</div>
            <div style="font-size:11px; color:var(--color-text-muted); line-height:1.4;">${escapeHtml(link.physioLink.description)}</div>
          </div>
          <span style="font-size:11px; font-weight:700; color:#0284c7; margin-top:8px; display:inline-flex; align-items:center; gap:4px;">Xem bài học →</span>
        </a>

        <!-- 2. Bệnh sinh -->
        <a href="${link.pathoLink.hash}" style="background:var(--color-surface, #fff); border:1px solid var(--color-border, #e2e8f0); border-radius:10px; padding:10px 12px; text-decoration:none; color:inherit; border-left:3.5px solid #059669; display:flex; flex-direction:column; justify-content:space-between; transition:transform 0.15s ease;">
          <div>
            <span style="font-size:10px; font-weight:800; color:#059669; text-transform:uppercase;">🔬 Bệnh Sinh (CCBS)</span>
            <div style="font-size:12.5px; font-weight:700; color:var(--color-text); margin:3px 0;">${escapeHtml(link.pathoLink.title)}</div>
            <div style="font-size:11px; color:var(--color-text-muted); line-height:1.4;">${escapeHtml(link.pathoLink.description)}</div>
          </div>
          <span style="font-size:11px; font-weight:700; color:#059669; margin-top:8px; display:inline-flex; align-items:center; gap:4px;">Xem cơ chế →</span>
        </a>

        <!-- 3. Hóa sinh -->
        <a href="${link.biochemLink.hash}" style="background:var(--color-surface, #fff); border:1px solid var(--color-border, #e2e8f0); border-radius:10px; padding:10px 12px; text-decoration:none; color:inherit; border-left:3.5px solid #8b5cf6; display:flex; flex-direction:column; justify-content:space-between; transition:transform 0.15s ease;">
          <div>
            <span style="font-size:10px; font-weight:800; color:#8b5cf6; text-transform:uppercase;">🧪 Hóa Sinh (HS-CH)</span>
            <div style="font-size:12.5px; font-weight:700; color:var(--color-text); margin:3px 0;">${escapeHtml(link.biochemLink.title)}</div>
            <div style="font-size:11px; color:var(--color-text-muted); line-height:1.4;">${escapeHtml(link.biochemLink.description)}</div>
          </div>
          <span style="font-size:11px; font-weight:700; color:#8b5cf6; margin-top:8px; display:inline-flex; align-items:center; gap:4px;">Xem phân tử →</span>
        </a>

        <!-- 4. Dịch tễ -->
        <a href="${link.epiLink.hash}" style="background:var(--color-surface, #fff); border:1px solid var(--color-border, #e2e8f0); border-radius:10px; padding:10px 12px; text-decoration:none; color:inherit; border-left:3.5px solid #0d9488; display:flex; flex-direction:column; justify-content:space-between; transition:transform 0.15s ease;">
          <div>
            <span style="font-size:10px; font-weight:800; color:#0d9488; text-transform:uppercase;">📊 Dịch Tễ Học (DTH)</span>
            <div style="font-size:12.5px; font-weight:700; color:var(--color-text); margin:3px 0;">${escapeHtml(link.epiLink.title)}</div>
            <div style="font-size:11px; color:var(--color-text-muted); line-height:1.4;">${escapeHtml(link.epiLink.description)}</div>
          </div>
          <span style="font-size:11px; font-weight:700; color:#0d9488; margin-top:8px; display:inline-flex; align-items:center; gap:4px;">Xem giám sát →</span>
        </a>

      </div>

      <!-- Interactive Tools Action Bar -->
      ${link.interactiveTools.length > 0 ? `
        <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap; background:rgba(255,255,255,0.6); padding:8px 12px; border-radius:8px; border:1px dashed var(--color-border);">
          <span style="font-size:11px; font-weight:700; color:var(--color-text-muted);"><i class="fa-solid fa-wand-magic-sparkles"></i> Công cụ tương tác áp dụng:</span>
          ${link.interactiveTools.map(tool => `
            <a href="${tool.hash}" style="background:var(--color-surface); border:1px solid var(--color-border); font-size:11.5px; font-weight:700; color:#0284c7; text-decoration:none; padding:3px 10px; border-radius:6px; display:inline-flex; align-items:center; gap:5px;">
              <i class="fa-solid ${tool.icon}"></i> ${escapeHtml(tool.name)}
            </a>
          `).join('')}
        </div>
      ` : ''}

    </div>
  `;
}

function escapeHtml(str: string): string {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
