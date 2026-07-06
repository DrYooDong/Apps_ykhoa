/**
 * CliniPortal Homepage Widgets & Live Search JS
 */
(function () {
  'use strict';

  // ============================================================
  // DATABASE: SEARCH INDEX FOR LIVE SEARCH
  // ============================================================
  const searchIndex = [
    { title: "Tra cứu mã ICD-10 nhanh", category: "Công cụ", url: "pages/Công cụ/Chung/Tracuu_maICD10.html", keywords: "icd10, icd 10, ma benh, tra cuu" },
    { title: "Đọc Điện tâm đồ ECG cơ bản", category: "Cận lâm sàng", url: "pages/Kỹ năng/Cận lâm sàng/doc-ecg-co-ban.html", keywords: "ecg, dien tam do, tim, nhip tim, song dien tim" },
    { title: "Đọc Điện tâm đồ ECG nâng cao", category: "Cận lâm sàng", url: "pages/Kỹ năng/Cận lâm sàng/doc-ecg-nang-cao.html", keywords: "ecg, dien tam do nang cao, block, loan nhip" },
    { title: "Phân tích tế bào máu CBC", category: "Cận lâm sàng", url: "pages/Kỹ năng/Cận lâm sàng/doc-tpttb-mau.html", keywords: "mau, cong thuc mau, tieu cau, bach cau, hong cau" },
    { title: "Sinh hóa chức năng Thận (Ure, Creatinin, eGFR)", category: "Cận lâm sàng", url: "pages/Kỹ năng/Cận lâm sàng/doc-sh-than.html", keywords: "than, creatinine, urea, egfr, suy than" },
    { title: "Xử trí Sốt xuất huyết Dengue", category: "Tiếp cận lâm sàng", url: "pages/Tiếp cận/3. Quản lý bệnh lý mạn tính & hệ thống/Huyết học & Truyền nhiễm/TC_SXHD.html", keywords: "sot xuat huyet, dengue, muoi, truyen nhiem" },
    { title: "Lựa chọn kháng sinh kinh nghiệm ban đầu", category: "Quản lý điều trị", url: "pages/Kỹ năng/Quản lý điều trị/Luachon_Khangsinh.html", keywords: "khang sinh, nhiem khuan, vi khuan" },
    { title: "Phân tích Khí máu động mạch ABG", category: "Công cụ", url: "pages/Công cụ/Thận & Điện giải - toan kiểm/DG_ABG.html", keywords: "khi mau dong mach, toan kiem, ph, pco2, hco3" },
    { title: "Tính toán bù dịch & điều chỉnh Natri máu", category: "Công cụ", url: "pages/Công cụ/Thận & Điện giải - toan kiểm/DG_Natri-Dich.html", keywords: "ha natri, tang natri, dich, bu dich" },
    { title: "Đánh giá chức năng thận & Clearance", category: "Công cụ", url: "pages/Công cụ/Thận & Điện giải - toan kiểm/renal-function.html", keywords: "suy than, cockcroft, gault, mdrd, egfr" },
    { title: "Đánh giá nguy cơ tim mạch & huyết khối", category: "Công cụ", url: "pages/Công cụ/Tim mạch & huyết khối/ptnctimmach.html", keywords: "tim mach, huyet khoi, cha2ds2, has bled" },
    { title: "Đánh giá Suy tim lâm sàng (NYHA, AHA)", category: "Công cụ", url: "pages/Công cụ/Tim mạch & huyết khối/DG_Suytim.html", keywords: "suy tim, nyha, phan do, tim" },
    { title: "Sinh hóa & Đánh giá chức năng Gan", category: "Cận lâm sàng", url: "pages/Kỹ năng/Cận lâm sàng/doc-sh-gan.html", keywords: "gan, ast, alt, bilirubin, men gan" },
    { title: "Phân tầng Xơ gan & Cổ trướng (Child-Pugh, MELD)", category: "Công cụ", url: "pages/Công cụ/Tiêu hóa & Dinh dưỡng/DG_Xogan.html", keywords: "xo gan, co truong, child pugh, meld" },
    { title: "Chẩn đoán Đột quỵ cấp (NIHSS)", category: "Công cụ", url: "pages/Công cụ/Thần kinh/DG_Dotquy.html", keywords: "nihss, dot quy, tai bien, nao" },
    { title: "Phân tầng độ nặng Viêm phổi (CURB-65, PSI)", category: "Công cụ", url: "pages/Công cụ/Hô hấp & Lao/DG_Viem-phoi.html", keywords: "viem phoi, curb65, curb-65, psi" },
    { title: "Quản lý & chỉnh liều Vancomycin", category: "Công cụ", url: "pages/Công cụ/Truyền Nhiễm/QL_Vancomycin.html", keywords: "vancomycin, auc, mic, khang sinh" },
    { title: "Mẫu Bệnh án Nội khoa chuẩn", category: "Công cụ", url: "pages/Công cụ/Chung/Bệnh án/benh-an-noi-khoa.html", keywords: "benh an, benh an mau, kham benh" },
    { title: "Tiếp cận chẩn đoán Đau ngực cấp", category: "Tiếp cận lâm sàng", url: "pages/Tiếp cận/2. Tiếp cận chẩn đoán từ triệu chứng lâm sàng/Than phiền Hô hấp - Tim mạch/TC_Daunguc.html", keywords: "dau nguc, tim, mach vanh, phoi" },
    { title: "Tiếp cận chẩn đoán Khó thở cấp", category: "Tiếp cận lâm sàng", url: "pages/Tiếp cận/2. Tiếp cận chẩn đoán từ triệu chứng lâm sàng/Than phiền Hô hấp - Tim mạch/TC_Khotho.html", keywords: "kho tho, hen, copd, suy tim" },
    { title: "Tiếp cận chẩn đoán Đau bụng cấp", category: "Tiếp cận lâm sàng", url: "pages/Tiếp cận/2. Tiếp cận chẩn đoán từ triệu chứng lâm sàng/Than phiền Tiêu hóa - Bụng/Dau bụng/TC_Daubung.html", keywords: "dau bung, ngoai khoa, viem ruot thua" },
    { title: "Khám Tim mạch chuẩn Bedside", category: "Lâm sàng", url: "pages/Kỹ năng/Lâm sàng/Khám tim mạch/KN_Khamtim.html", keywords: "kham tim, tim mach, tieng tim, thoi tam thu" },
    { title: "Khám Hô hấp chuẩn Bedside", category: "Lâm sàng", url: "pages/Kỹ năng/Lâm sàng/Khám hô hấp/KN_Hohap.html", keywords: "kham phoi, ran, ri rao phe nang" },
    { title: "Đọc X-quang ngực (Chest X-ray)", category: "Cận lâm sàng", url: "pages/Kỹ năng/Cận lâm sàng/doc-xq-nguc.html", keywords: "xquang phoi, cxr, bong tim" },
    { title: "Bản đồ huyệt vị & Châm cứu Đông y", category: "Y học cổ truyền", url: "pages/Y học cổ truyền/Xoa bóp & bấm huyệt/ban-do-huyet-vi.html", keywords: "huyet vi, dong y, bam huyet, xoa bop, cham cuu" }
  ];

  // ============================================================
  // DATABASE: CLINICAL PEARLS
  // ============================================================
  const clinicalPearls = [
    "Hãy luôn kiểm tra và bù Kali máu trước khi bắt đầu truyền insulin trong cấp cứu DKA (nhiễm toan ceton do đái tháo đường) nếu Kali < 3.3 mEq/L.",
    "Ở bệnh nhân COPD đợt cấp, đích SpO2 khuyến cáo duy trì ở mức 88-92% để tránh ức chế phản xạ thông khí do tăng CO2 máu.",
    "Khi chẩn đoán đau ngực cấp nghi do hội chứng mạch vành cấp (ACS), phải hoàn thành đo và đọc ECG 12 chuyển đạo trong vòng 10 phút đầu tiên.",
    "Thang điểm CURB-65 giúp phân tầng nguy cơ nhanh cho viêm phổi cộng đồng: C (Ý thức), U (Ure > 7 mmol/L), R (Tần số thở >= 30), B (Huyết áp < 90/60), 65 (Tuổi >= 65).",
    "Tránh dùng thuốc ức chế men chuyển (ACEi) hoặc chẹn thụ thể (ARB) ở bệnh nhân hẹp động mạch thận hai bên vì có nguy cơ gây suy thận cấp nặng.",
    "Bù Natri quá nhanh ở bệnh nhân hạ Natri máu mạn tính có thể dẫn đến Hội chứng hủy myelin cầu não do thẩm thấu (ODS). Tốc độ an toàn là dưới 8-10 mmol/L trong 24 giờ đầu.",
    "Tam chứng Beck của chèn ép tim cấp bao gồm: Huyết áp kẹt/thấp, Tiếng tim mờ xa xăm, và Tĩnh mạch cổ nổi.",
    "Kháng sinh Aminoglycoside có tính chất diệt khuẩn phụ thuộc nồng độ đỉnh (Concentration-dependent killing), do đó phác đồ dùng 1 liều lớn duy nhất mỗi ngày (Once-daily dosing) thường tối ưu hơn.",
    "Ở bệnh nhân xơ gan cổ trướng, trước khi chọc tháo dịch lượng lớn (> 5 lít), cần bù Albumin liều 8g cho mỗi lít dịch tháo ra để phòng ngừa hội chứng rối loạn tuần hoàn sau chọc dịch.",
    "Quy tắc chẩn đoán Thuyên tắc phổi (Pulmonary Embolism): Nếu nghi ngờ lâm sàng, sử dụng thang điểm Wells. Nếu Wells thấp, xét nghiệm D-Dimer có giá trị loại trừ cao nhờ độ nhạy lớn."
  ];

  // ============================================================
  // DOM ELEMENTS & INITIALIZATION
  // ============================================================
  document.addEventListener('DOMContentLoaded', () => {
    initLiveSearch();
    initClinicalPearl();
    initMedicalConverter();
    initScratchpad();
  });

  // ============================================================
  // FUNCTION: LIVE SEARCH
  // ============================================================
  function initLiveSearch() {
    const searchInput = document.querySelector('.search-container .input');
    const searchContainer = document.querySelector('.search-bar-container');
    
    if (!searchInput || !searchContainer) return;

    // Create dropdown element
    const dropdown = document.getElementById('searchResultsDropdown');
    
    let selectedIndex = -1;
    let currentResults = [];

    // Helper to remove Vietnamese tones for better search matching
    function removeAccents(str) {
      return str.normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/đ/g, 'd')
                .replace(/Đ/g, 'D');
    }

    function renderResults(results, query) {
      dropdown.innerHTML = '';
      selectedIndex = -1;
      currentResults = results;

      if (results.length === 0) {
        dropdown.innerHTML = `
          <div class="search-no-results">
            <span>🔍</span>
            <p>Không tìm thấy kết quả cho <strong>"${escapeHtml(query)}"</strong></p>
          </div>
        `;
        return;
      }

      // Heading label
      const header = document.createElement('div');
      header.className = 'search-results-header';
      header.textContent = `${results.length} kết quả`;
      dropdown.appendChild(header);

      results.forEach((item, index) => {
        const a = document.createElement('a');
        a.href = item.url;
        a.className = 'search-result-item';
        a.setAttribute('data-index', index);

        const highlightedTitle = highlightMatch(item.title, query);

        a.innerHTML = `
          <div class="search-result-icon">
            <i class="fa-solid fa-file-medical"></i>
          </div>
          <div class="search-result-info">
            <span class="search-result-title">${highlightedTitle}</span>
            <div class="search-result-meta">
              <span class="search-result-category">${escapeHtml(item.category)}</span>
            </div>
          </div>
          <i class="fa-solid fa-chevron-right search-result-arrow"></i>
        `;

        a.addEventListener('click', () => saveToRecent(item));
        dropdown.appendChild(a);
      });
    }

    function highlightMatch(text, query) {
      if (!query) return escapeHtml(text);
      const cleanText = removeAccents(text).toLowerCase();
      const cleanQuery = removeAccents(query).toLowerCase();
      const index = cleanText.indexOf(cleanQuery);
      
      if (index === -1) return escapeHtml(text);

      const originalMatch = text.substr(index, query.length);
      const before = text.substr(0, index);
      const after = text.substr(index + query.length);

      return `${escapeHtml(before)}<mark style="background: var(--color-primary-hl); color: var(--color-primary); font-weight: 700; border-radius: 2px; padding: 0 2px;">${escapeHtml(originalMatch)}</mark>${escapeHtml(after)}`;
    }

    function escapeHtml(unsafe) {
      return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    }

    function performSearch(query) {
      const cleanQuery = removeAccents(query).trim().toLowerCase();
      if (!cleanQuery) {
        dropdown.classList.remove('show');
        return;
      }

      // Filter index
      const results = searchIndex.filter(item => {
        const cleanTitle = removeAccents(item.title).toLowerCase();
        const cleanKeywords = removeAccents(item.keywords).toLowerCase();
        const cleanCat = removeAccents(item.category).toLowerCase();
        return cleanTitle.includes(cleanQuery) || 
               cleanKeywords.includes(cleanQuery) || 
               cleanCat.includes(cleanQuery);
      }).slice(0, 8); // Limit to top 8 results

      renderResults(results, query);
      dropdown.classList.add('show');
    }

    function updateSelection(direction) {
      const items = dropdown.querySelectorAll('.search-result-item');
      if (items.length === 0) return;

      if (selectedIndex !== -1) {
        items[selectedIndex].classList.remove('selected');
      }

      if (direction === 'down') {
        selectedIndex = (selectedIndex + 1) % items.length;
      } else if (direction === 'up') {
        selectedIndex = (selectedIndex - 1 + items.length) % items.length;
      }

      if (selectedIndex !== -1) {
        const selectedItem = items[selectedIndex];
        selectedItem.classList.add('selected');
        selectedItem.focus();
        
        // Ensure focused item is visible in scroll container
        selectedItem.scrollIntoView({ block: 'nearest' });
      }
    }

    // Input event
    searchInput.addEventListener('input', (e) => {
      performSearch(e.target.value);
    });

    // Focus event
    searchInput.addEventListener('focus', () => {
      if (searchInput.value.trim() !== '') {
        performSearch(searchInput.value);
      }
    });

    // Keyboard navigation inside input / dropdown
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        performSearch(searchInput.value); // ensure open
        updateSelection('down');
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        updateSelection('up');
      } else if (e.key === 'Enter') {
        if (selectedIndex !== -1 && currentResults[selectedIndex]) {
          e.preventDefault();
          saveToRecent(currentResults[selectedIndex]);
          window.location.href = currentResults[selectedIndex].url;
        }
      } else if (e.key === 'Escape') {
        dropdown.classList.remove('show');
        searchInput.blur();
      }
    });

    // Handle keypresses on dropdown itself
    dropdown.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        updateSelection('down');
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        updateSelection('up');
      } else if (e.key === 'Enter') {
        if (selectedIndex !== -1 && currentResults[selectedIndex]) {
          e.preventDefault();
          saveToRecent(currentResults[selectedIndex]);
          window.location.href = currentResults[selectedIndex].url;
        }
      } else if (e.key === 'Escape') {
        dropdown.classList.remove('show');
        searchInput.focus();
      }
    });

    // Close dropdown on click outside
    document.addEventListener('click', (e) => {
      if (!searchContainer.contains(e.target)) {
        dropdown.classList.remove('show');
      }
    });
  }

  // Save to recent list (optional tracking helper)
  function saveToRecent(item) {
    try {
      let recent = JSON.parse(localStorage.getItem('cliniportal_recent') || '[]');
      // Remove duplicate if exists
      recent = recent.filter(r => r.url !== item.url);
      // Prepend
      recent.unshift({ title: item.title, url: item.url, category: item.category });
      // Limit to 5
      recent = recent.slice(0, 5);
      localStorage.setItem('cliniportal_recent', JSON.stringify(recent));
    } catch (e) {
      console.warn('Recent tracking storage failed', e);
    }
  }

  // ============================================================
  // FUNCTION: CLINICAL PEARL OF THE DAY
  // ============================================================
  function initClinicalPearl() {
    const pearlText = document.getElementById('pearlText');
    const refreshBtn = document.getElementById('pearlRefreshBtn');
    
    if (!pearlText || !refreshBtn) return;

    let currentIdx = -1;

    function showRandomPearl() {
      let idx;
      do {
        idx = Math.floor(Math.random() * clinicalPearls.length);
      } while (idx === currentIdx && clinicalPearls.length > 1);

      currentIdx = idx;
      
      // Smooth transition
      pearlText.style.opacity = 0;
      setTimeout(() => {
        pearlText.textContent = clinicalPearls[currentIdx];
        pearlText.style.opacity = 1;
      }, 150);
    }

    refreshBtn.addEventListener('click', () => {
      const icon = refreshBtn.querySelector('i');
      if (icon) icon.classList.add('spinning');
      
      showRandomPearl();
      
      setTimeout(() => {
        if (icon) icon.classList.remove('spinning');
      }, 800);
    });

    // Set initial
    showRandomPearl();
  }

  // ============================================================
  // FUNCTION: MEDICAL UNIT CONVERTER
  // ============================================================
  function initMedicalConverter() {
    const tabs = document.querySelectorAll('.converter-tab');
    const panels = document.querySelectorAll('.converter-panel');
    
    if (tabs.length === 0) return;

    // Tab switching
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));

        tab.classList.add('active');
        const targetId = tab.getAttribute('data-target');
        const targetPanel = document.getElementById(targetId);
        if (targetPanel) {
          targetPanel.classList.add('active');
        }
      });
    });

    // Tab 1: Glucose (mg/dL <-> mmol/L)
    const glcMg = document.getElementById('glcMg');
    const glcMmol = document.getElementById('glcMmol');
    
    if (glcMg && glcMmol) {
      glcMg.addEventListener('input', () => {
        const val = parseFloat(glcMg.value);
        if (isNaN(val) || val <= 0) {
          glcMmol.value = '';
          return;
        }
        glcMmol.value = (val / 18.0182).toFixed(2);
      });

      glcMmol.addEventListener('input', () => {
        const val = parseFloat(glcMmol.value);
        if (isNaN(val) || val <= 0) {
          glcMg.value = '';
          return;
        }
        glcMg.value = (val * 18.0182).toFixed(1);
      });
    }

    // Tab 2: Creatinine (µmol/L <-> mg/dL)
    const crUmol = document.getElementById('crUmol');
    const crMg = document.getElementById('crMg');

    if (crUmol && crMg) {
      crUmol.addEventListener('input', () => {
        const val = parseFloat(crUmol.value);
        if (isNaN(val) || val <= 0) {
          crMg.value = '';
          return;
        }
        crMg.value = (val / 88.4).toFixed(3);
      });

      crMg.addEventListener('input', () => {
        const val = parseFloat(crMg.value);
        if (isNaN(val) || val <= 0) {
          crUmol.value = '';
          return;
        }
        crUmol.value = (val * 88.4).toFixed(1);
      });
    }

    // Tab 3: Temperature (°C <-> °F)
    const tempC = document.getElementById('tempC');
    const tempF = document.getElementById('tempF');

    if (tempC && tempF) {
      tempC.addEventListener('input', () => {
        const val = parseFloat(tempC.value);
        if (isNaN(val)) {
          tempF.value = '';
          return;
        }
        tempF.value = (val * 1.8 + 32).toFixed(1);
      });

      tempF.addEventListener('input', () => {
        const val = parseFloat(tempF.value);
        if (isNaN(val)) {
          tempC.value = '';
          return;
        }
        tempC.value = ((val - 32) / 1.8).toFixed(1);
      });
    }
  }

  // ============================================================
  // FUNCTION: CLINICAL SCRATCHPAD
  // ============================================================
  function initScratchpad() {
    const textarea = document.getElementById('scratchpadText');
    const btnCopy = document.getElementById('scratchpadCopyBtn');
    const btnClear = document.getElementById('scratchpadClearBtn');
    const btnExport = document.getElementById('scratchpadExportBtn');
    const selectTemplate = document.getElementById('scratchpadTemplateSelect');

    if (!textarea) return;

    // Load saved content
    const saved = localStorage.getItem('cliniportal_scratchpad');
    if (saved) {
      textarea.value = saved;
    }

    // Autosave
    textarea.addEventListener('input', () => {
      localStorage.setItem('cliniportal_scratchpad', textarea.value);
    });

    // Copy to clipboard
    if (btnCopy) {
      btnCopy.addEventListener('click', () => {
        if (!textarea.value.trim()) return;
        
        navigator.clipboard.writeText(textarea.value).then(() => {
          const originalHTML = btnCopy.innerHTML;
          btnCopy.innerHTML = '<i class="fa-solid fa-check"></i> Đã chép!';
          btnCopy.style.borderColor = 'var(--color-success)';
          btnCopy.style.color = 'var(--color-success)';
          
          setTimeout(() => {
            btnCopy.innerHTML = originalHTML;
            btnCopy.style.borderColor = '';
            btnCopy.style.color = '';
          }, 1500);
        }).catch(err => {
          console.error('Copy failed', err);
        });
      });
    }

    // Clear content
    if (btnClear) {
      btnClear.addEventListener('click', () => {
        if (!textarea.value.trim()) return;
        if (confirm('Bạn có chắc chắn muốn xóa toàn bộ ghi chú không?')) {
          textarea.value = '';
          localStorage.removeItem('cliniportal_scratchpad');
        }
      });
    }

    // Export text file
    if (btnExport) {
      btnExport.addEventListener('click', () => {
        const text = textarea.value;
        if (!text.trim()) return;

        const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
        const now = new Date();
        const dateStr = now.getFullYear() + 
                        String(now.getMonth() + 1).padStart(2, '0') + 
                        String(now.getDate()).padStart(2, '0') + '_' +
                        String(now.getHours()).padStart(2, '0') + 
                        String(now.getMinutes()).padStart(2, '0');
        const filename = `Ghi_chu_CliniPortal_${dateStr}.txt`;
        
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = filename;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        
        setTimeout(() => {
          document.body.removeChild(a);
          URL.revokeObjectURL(a.href);
        }, 100);
      });
    }

    // Templates selection
    if (selectTemplate) {
      const templates = {
        summary: `[BỆNH ÁN TÓM TẮT BEDSIDE]
- Họ và tên: 
- Tuổi:     Giới: 
- Lý do vào viện: 
- Tiền sử: 
- Bệnh sử tóm tắt: 
- Khám lâm sàng:
  + Sinh hiệu: HA: ... mmHg | Mạch: ... l/p | t°: ... °C | SpO2: ...%
  + Khám: 
- Chẩn đoán sơ bộ: `,

        lab: `[KẾT QUẢ LAB / CẬN LÂM SÀNG]
- Tế bào máu: Hb: ... | WBC: ... (Neu: ...%) | PLT: ...
- Sinh hóa:
  + Ure: ... | Creatinine: ... -> eGFR: ... ml/ph/1.73m2
  + AST: ... | ALT: ... | Bilirubin TP: ...
  + Điện giải đồ: Na: ... | K: ... | Cl: ... | Ca: ...
- ECG: 
- Chẩn đoán hình ảnh (X-ray/Siêu âm): `,

        rx: `[Y LỆNH / ĐIỀU TRỊ THAM KHẢO]
- Chẩn đoán: 
- Chế độ chăm sóc: Cấp ... | Dinh dưỡng: ...
- Điều trị cụ thể:
  1. Thuốc truyền dịch: 
  2. Thuốc tiêm/uống: 
  3. Theo dõi lâm sàng: `
      };

      selectTemplate.addEventListener('change', () => {
        const val = selectTemplate.value;
        if (!val || !templates[val]) return;

        const separator = textarea.value.trim() ? '\n\n' : '';
        textarea.value += separator + templates[val];
        textarea.focus();
        
        // Save & reset select
        localStorage.setItem('cliniportal_scratchpad', textarea.value);
        selectTemplate.value = '';
      });
    }
  }

})();
