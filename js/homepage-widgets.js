/**
 * CliniPortal Homepage Widgets & Live Search JS
 */
(function () {
  'use strict';

  // ============================================================
  // DATABASE: SEARCH INDEX FOR LIVE CLINICAL SEARCH 2.0
  // ============================================================
  const searchIndex = [
    { title: "Tra cứu mã ICD-10 nhanh", category: "Công cụ", url: "src/content/calculators/general/tracuu-ma-icd10.html", keywords: "icd10, icd 10, ma benh, tra cuu, ma quoc te" },
    { title: "Sốc nhiễm khuẩn (Sepsis) & Phác đồ kháng sinh", category: "Cấp cứu", url: "src/content/skills/treatment-management/luachon-khangsinh.html", keywords: "sot cao, tut huyet ap, soc nhiem khuan, sepsis, qsofa, sofa, khang sinh, bu dich, mach nhanh" },
    { title: "Cấp cứu Đau ngực cấp & ACS (Nhồi máu cơ tim)", category: "Cấp cứu", url: "src/content/skills/can-lam-sang/doc-ecg-co-ban.html", keywords: "dau nguc, nhoi mau co tim, st chenh, ecg, troponin, acs, tim mach, con đau thắt ngực" },
    { title: "Đọc Điện tâm đồ ECG cơ bản & Nâng cao", category: "Cận lâm sàng", url: "src/content/skills/can-lam-sang/doc-ecg-co-ban.html", keywords: "ecg, dien tam do, tim, nhip tim, song dien tim, block, loan nhip, st chenh" },
    { title: "Cấp cứu Khí máu động mạch (ABG) & Toan kiềm", category: "Công cụ", url: "src/content/calculators/renal/dg-abg.html", keywords: "khi mau dong mach, toan kiem, ph, pco2, hco3, abg, suy ho hap, kho tho, anion gap" },
    { title: "Cấp cứu & Xử trí Sốt xuất huyết Dengue nặng", category: "Cấp cứu", url: "src/content/calculators/emergency/ql-bu-dich.html", keywords: "sot xuat huyet, dengue, muoi, truyen nhiem, soc sxh, bu dich, xuat huyet, phan do" },
    { title: "Toan Ceton đái tháo đường (DKA) — Bù dịch & Insulin", category: "Nội tiết", url: "src/content/calculators/emergency/ql-bu-dich.html", keywords: "dka, dai thao duong, tieu duong, toan ceton, insulin, kali, glucose, sot cao, tho kussmaul" },
    { title: "Lựa chọn kháng sinh kinh nghiệm ban đầu", category: "Quản lý điều trị", url: "src/content/skills/treatment-management/luachon-khangsinh.html", keywords: "khang sinh, nhiem khuan, vi khuan, vancomycin, carbapenem, viem phoi, sot" },
    { title: "Electrolyte Pro Studio — Bù dịch & Điện giải (Na, K, Ca, Mg)", category: "Công cụ", url: "src/content/calculators/cong-cu.html", keywords: "ha natri, tang natri, dich, bu dich, kali, canxi, dien giai, hạ kali, tăng kali" },
    { title: "Phân tích tế bào máu CBC (Công thức máu)", category: "Cận lâm sàng", url: "src/content/skills/can-lam-sang/doc-tpttb-mau.html", keywords: "mau, cong thuc mau, tieu cau, bach cau, hong cau, cbc, thieu mau, sot" },
    { title: "Sinh hóa chức năng Thận (Ure, Creatinin, eGFR)", category: "Cận lâm sàng", url: "src/content/skills/can-lam-sang/doc-sh-than.html", keywords: "than, creatinine, urea, egfr, suy than, cockcroft, gault, mdrd, clearance" },
    { title: "Khó thở cấp, rên ngáy rên rít (COPD / Hen phế quản)", category: "Hô hấp", url: "src/content/approaches/tiep-can.html", keywords: "kho tho, hen phe quan, copd, khi mau, spo2, ran ngay, ran rit, viem phoi" },
    { title: "Mê sảng, rối loạn ý thức, đánh giá điểm GCS", category: "Thần kinh", url: "src/content/calculators/cong-cu.html", keywords: "tri giac, me sang, glasgow, gcs, hon me, coi giuc, dot quy, nihss" },
    { title: "Chẩn đoán Đột quỵ cấp (NIHSS & Thang điểm)", category: "Thần kinh", url: "src/content/calculators/cong-cu.html", keywords: "nihss, dot quy, tai bien, nao, me sang, yeu me" },
    { title: "Phân tầng độ nặng Viêm phổi (CURB-65, PSI)", category: "Hô hấp", url: "src/content/calculators/cong-cu.html", keywords: "viem phoi, curb65, curb-65, psi, sot, ho, kho tho" },
    { title: "Đánh giá Suy tim lâm sàng (NYHA, AHA)", category: "Tim mạch", url: "src/content/calculators/cong-cu.html", keywords: "suy tim, nyha, phan do, tim, phu chan, kho tho nam, bnp" },
    { title: "Sinh hóa & Đánh giá chức năng Gan", category: "Cận lâm sàng", url: "src/content/skills/ky-nang.html", keywords: "gan, ast, alt, bilirubin, men gan, vang da" },
    { title: "Phân tầng Xơ gan & Cổ trướng (Child-Pugh, MELD)", category: "Tiêu hóa", url: "src/content/calculators/cong-cu.html", keywords: "xo gan, co truong, child pugh, meld, ascites, albumin" },
    { title: "Thuyên tắc phổi (Pulmonary Embolism, Wells Score)", category: "Tim mạch", url: "src/content/calculators/cong-cu.html", keywords: "thuyen tac phoi, pe, wells, ddimer, d-dimer, dau nguc, kho tho" },
    { title: "Bản đồ huyệt vị & Châm cứu Đông y", category: "Y học cổ truyền", url: "src/content/tcm/y-hoc-co-truyen.html", keywords: "huyet vi, dong y, bam huyet, xoa bop, cham cuu" },
    { title: "DocSpace — Trình bệnh SBAR & Ca trực cá nhân", category: "DocSpace", url: "#/docspace", keywords: "docspace, sbar, ca truc, trinh benh, ghi chu, ca benh, nhat ky" }
  ];

  // ============================================================
  // DATABASE: INTERACTIVE CLINICAL FLASHCARDS & PEARLS
  // ============================================================
  const flashcardPearls = [
    {
      id: 1,
      spec: "Đái tháo đường / Cấp cứu",
      question: "Trước khi bắt đầu truyền insulin trong cấp cứu DKA (Nhiễm toan ceton), chỉ số điện giải nào bắt buộc phải kiểm tra và xử trí trước nếu bị hạ nặng?",
      answer: "Bắt buộc bù KALI (K+) trước nếu K+ < 3.3 mEq/L. Truyền insulin khi Kali hạ nặng sẽ đẩy thêm Kali vào tế bào, gây tụt Kali máu trầm trọng dẫn đến loạn nhịp thất tử vong.",
      source: "ADA Guidelines / UpToDate DKA Management"
    },
    {
      id: 2,
      spec: "Hô hấp / ICU",
      question: "Ở bệnh nhân COPD đợt cấp có ứ CO2 mạn tính, đích SpO2 khuyến cáo duy trì ở mức bao nhiêu và tại sao?",
      answer: "Đích SpO2 duy trì ở mức 88 - 92%. Thở oxy liều cao nâng SpO2 > 95% sẽ làm mất phản xạ kích thích thông khí do giảm oxy máu (Hypoxic Drive), gây tăng CO2 máu nặng hơn.",
      source: "GOLD Guidelines 2026"
    },
    {
      id: 3,
      spec: "Tim mạch / Cấp cứu",
      question: "Bệnh nhân nghi ngờ Hội chứng mạch vành cấp (ACS) vào viện, thời gian chuẩn để hoàn thành đo và đọc Điện tâm đồ (ECG) 12 chuyển đạo là bao lâu?",
      answer: "Trong vòng 10 PHÚT ĐẦU TIÊN kể từ lúc tiếp cận y tế (Door-to-ECG < 10 phút) để chẩn đoán phân biệt ngay STEMI và kích hoạt phòng Can thiệp mạch vành.",
      source: "ESC / AHA STEMI Guidelines"
    },
    {
      id: 4,
      spec: "Thận - Điện giải / Cấp cứu",
      question: "Ở bệnh nhân hạ Natri máu mạn tính, tốc độ nâng Natri máu tối đa trong 24 giờ đầu để tránh biến chứng Hội chứng hủy myelin cầu noã (ODS) là bao nhiêu?",
      answer: "Tốc độ nâng Natri an toàn là dưới 8 - 10 mmol/L trong 24 giờ đầu (không quá 0.5 mmol/L/giờ). Nâng Natri quá nhanh làm tế bào não teo do thẩm thấu gây tổn thương thần kinh vĩnh viễn.",
      source: "European Society of Endocrinology Guidelines"
    },
    {
      id: 5,
      spec: "Tiêu hóa / Xơ gan",
      question: "Khi chọc tháo dịch cổ trướng lượng lớn (> 5 lít) ở bệnh nhân xơ gan, cần bù Albumin với liều bao nhiêu cho mỗi lít dịch tháo ra?",
      answer: "Bù 8 gam Albumin ưu trương (20%) cho MỖI LÍT DỊCH tháo ra để phòng ngừa rối loạn tuần hoàn sau chọc dịch (PICD) và suy thận cấp.",
      source: "EASL Clinical Practice Guidelines"
    },
    {
      id: 6,
      spec: "Cấp cứu / Tim mạch",
      question: "Tam chứng Beck nổi tiếng gợi ý chẩn đoán Chèn ép tim cấp (Cardiac Tamponade) gồm những dấu hiệu lâm sàng nào?",
      answer: "1. Huyết áp tụt / Huyết áp kẹt.\n2. Tiếng tim mờ xa xăm.\n3. Tĩnh mạch cổ nổi căng.",
      source: "Macleod Clinical Examination / Tintinalli's Emergency Medicine"
    },
    {
      id: 7,
      spec: "Truyền nhiễm / Thần kinh",
      question: "Trong nghi ngờ Viêm màng não mủ ở người lớn, thứ tự xử trí đúng giữa Cho kháng sinh và Chọc dò tủy sống (LP) khi phải chờ chụp CT sọ não là gì?",
      answer: "Cho KHÁNG SINH KINH NGHIỆM + DEXAMETHASONE NGAY LẬP TỨC trước khi đi chụp CT và chọc dò tủy sống. Tuyệt đối không trì hoãn kháng sinh vì chờ chụp phim.",
      source: "IDSA Bacterial Meningitis Guidelines"
    }
  ];

  // ============================================================
  // DOM ELEMENTS & INITIALIZATION
  // ============================================================
  document.addEventListener('DOMContentLoaded', () => {
    initLiveSearch();
    initClinicalPearlFlashcard();
    initShiftChecklist();
    initMedicalConverter();
    initScratchpad();
    initFavoritesSystem();
    initCategoryFilter();
    initKeyboardShortcuts();
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

    // Voice search initialization
    initVoiceSearch(searchInput, performSearch);
  }

  // Voice Search Helper (Web Speech API)
  function initVoiceSearch(searchInput, performSearch) {
    const voiceBtn = document.getElementById('voiceSearchBtn');
    if (!voiceBtn) return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      voiceBtn.title = "Trình duyệt không hỗ trợ nhận diện giọng nói (Dùng Chrome/Edge)";
      voiceBtn.style.opacity = '0.5';
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'vi-VN';
    recognition.continuous = false;
    recognition.interimResults = false;

    voiceBtn.addEventListener('click', () => {
      if (voiceBtn.classList.contains('listening')) {
        recognition.stop();
      } else {
        try {
          recognition.start();
        } catch (e) {
          console.warn('Speech recognition failed to start', e);
        }
      }
    });

    recognition.onstart = () => {
      voiceBtn.classList.add('listening');
      voiceBtn.title = "Đang lắng nghe y khoa... (Click để dừng)";
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      searchInput.value = transcript;
      performSearch(transcript);
      searchInput.focus();
    };

    recognition.onerror = (event) => {
      console.warn('Voice recognition error:', event.error);
      voiceBtn.classList.remove('listening');
    };

    recognition.onend = () => {
      voiceBtn.classList.remove('listening');
      voiceBtn.title = "Tìm kiếm bằng giọng nói y khoa (Click để nói)";
    };
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
  // FUNCTION: CLINICAL PEARL 3D INTERACTIVE FLASHCARD QUIZ
  // ============================================================
  function initClinicalPearlFlashcard() {
    const card = document.getElementById('flashcardCard');
    const questionEl = document.getElementById('flashcardQuestion');
    const answerEl = document.getElementById('flashcardAnswer');
    const specEl = document.getElementById('flashcardSpec');
    const sourceEl = document.getElementById('flashcardSource');
    const flipBtn = document.getElementById('flashcardFlipBtn');
    const nextBtn = document.getElementById('flashcardNextBtn');

    if (!card || !questionEl || !answerEl || !flipBtn) return;

    let currentIndex = -1;

    function renderFlashcard(index) {
      const pearl = flashcardPearls[index];
      if (!pearl) return;

      if (card.classList.contains('flipped')) {
        card.classList.remove('flipped');
        if (flipBtn && flipBtn.querySelector('span')) {
          flipBtn.querySelector('span').textContent = 'Lật thẻ xem đáp án';
        }
      }

      setTimeout(() => {
        if (specEl) specEl.textContent = pearl.spec;
        if (questionEl) questionEl.textContent = pearl.question;
        if (answerEl) answerEl.textContent = pearl.answer;
        if (sourceEl) sourceEl.textContent = `Nguồn: ${pearl.source}`;
      }, card.classList.contains('flipped') ? 250 : 0);
    }

    function loadRandomFlashcard() {
      let nextIdx;
      do {
        nextIdx = Math.floor(Math.random() * flashcardPearls.length);
      } while (nextIdx === currentIndex && flashcardPearls.length > 1);

      currentIndex = nextIdx;
      renderFlashcard(currentIndex);
    }

    flipBtn.addEventListener('click', () => {
      card.classList.toggle('flipped');
      const isFlipped = card.classList.contains('flipped');
      const label = isFlipped ? 'Quay lại câu hỏi' : 'Lật thẻ xem đáp án';
      if (flipBtn.querySelector('span')) {
        flipBtn.querySelector('span').textContent = label;
      }
    });

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        loadRandomFlashcard();
      });
    }

    // Initial load
    loadRandomFlashcard();
  }

  // ============================================================
  // FUNCTION: DOCSPACE SHIFT CHECKLIST & HANDOVER
  // ============================================================
  function initShiftChecklist() {
    const todoInput = document.getElementById('shiftTodoInput');
    const addBtn = document.getElementById('shiftAddBtn');
    const todoList = document.getElementById('shiftTodoList');
    const counter = document.getElementById('shiftCounter');
    const clearBtn = document.getElementById('shiftClearBtn');

    if (!todoList) return;

    function getShiftData() {
      try {
        return JSON.parse(localStorage.getItem('cliniportal_shift_todos') || '[]');
      } catch (e) {
        return [];
      }
    }

    function saveShiftData(data) {
      try {
        localStorage.setItem('cliniportal_shift_todos', JSON.stringify(data));
      } catch (e) {
        console.warn('Save shift data failed', e);
      }
      renderShiftTodos();
    }

    function renderShiftTodos() {
      const todos = getShiftData();
      todoList.innerHTML = '';

      if (todos.length === 0) {
        todoList.innerHTML = `<li style="font-size: 11px; color: var(--color-text-faint); text-align: center; padding: 0.5rem 0;">Chưa có việc ca trực. Thêm mới ở trên!</li>`;
        if (counter) counter.textContent = '0 việc';
        return;
      }

      let doneCount = 0;
      todos.forEach((item, index) => {
        if (item.done) doneCount++;
        const li = document.createElement('li');
        li.className = `shift-todo-item ${item.done ? 'done' : ''}`;
        li.innerHTML = `
          <label>
            <input type="checkbox" ${item.done ? 'checked' : ''} data-index="${index}">
            <span>${escapeHtml(item.text)}</span>
          </label>
          <button class="shift-todo-del" data-index="${index}" title="Xóa"><i class="fa-solid fa-xmark"></i></button>
        `;

        li.querySelector('input').addEventListener('change', (e) => {
          todos[index].done = e.target.checked;
          saveShiftData(todos);
        });

        li.querySelector('.shift-todo-del').addEventListener('click', () => {
          todos.splice(index, 1);
          saveShiftData(todos);
        });

        todoList.appendChild(li);
      });

      if (counter) {
        counter.textContent = `${todos.length - doneCount}/${todos.length} còn lại`;
      }
    }

    function addTodo() {
      const text = todoInput ? todoInput.value.trim() : '';
      if (!text) return;
      const todos = getShiftData();
      todos.push({ text, done: false, time: new Date().toISOString() });
      saveShiftData(todos);
      if (todoInput) todoInput.value = '';
    }

    if (addBtn) addBtn.addEventListener('click', addTodo);
    if (todoInput) {
      todoInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') addTodo();
      });
    }

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        const todos = getShiftData().filter(t => !t.done);
        saveShiftData(todos);
      });
    }

    renderShiftTodos();
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

  // ============================================================
  // FUNCTION: PINNED FAVORITES SYSTEM
  // ============================================================
  function initFavoritesSystem() {
    const favoritesSection = document.getElementById('favoritesSection');
    const favoritesGrid = document.getElementById('favoritesGrid');

    function getFavorites() {
      try {
        return JSON.parse(localStorage.getItem('cliniportal_favorites') || '[]');
      } catch (e) {
        return [];
      }
    }

    function saveFavorites(favs) {
      try {
        localStorage.setItem('cliniportal_favorites', JSON.stringify(favs));
      } catch (e) {
        console.warn('Saving favorites failed', e);
      }
      renderFavorites();
      updatePinButtons();
    }

    function renderFavorites() {
      if (!favoritesSection || !favoritesGrid) return;
      const favs = getFavorites();

      if (favs.length === 0) {
        favoritesSection.classList.remove('has-favorites');
        favoritesGrid.innerHTML = '';
        return;
      }

      favoritesSection.classList.add('has-favorites');
      favoritesGrid.innerHTML = '';

      favs.forEach(fav => {
        const a = document.createElement('a');
        a.href = fav.url;
        a.className = 'fav-card';
        a.innerHTML = `
          <span class="fav-card-icon">${fav.icon || '⭐'}</span>
          <div class="fav-card-info">
            <span class="fav-card-title">${escapeHtml(fav.title)}</span>
            <span class="fav-card-cat">${escapeHtml(fav.category || 'Công cụ')}</span>
          </div>
          <button class="pin-btn pinned" title="Bỏ ghim khỏi yêu thích" aria-label="Unpin">★</button>
        `;

        const unpinBtn = a.querySelector('.pin-btn');
        unpinBtn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleFavorite(fav);
        });

        favoritesGrid.appendChild(a);
      });
    }

    function toggleFavorite(item) {
      let favs = getFavorites();
      const existingIdx = favs.findIndex(f => f.url === item.url);

      if (existingIdx !== -1) {
        favs.splice(existingIdx, 1);
      } else {
        favs.push({
          title: item.title,
          url: item.url,
          category: item.category || 'Công cụ',
          icon: item.icon || '⭐'
        });
      }

      saveFavorites(favs);
    }

    function updatePinButtons() {
      const favs = getFavorites();
      const pinBtns = document.querySelectorAll('.pin-btn[data-url]');

      pinBtns.forEach(btn => {
        const url = btn.getAttribute('data-url');
        const isPinned = favs.some(f => f.url === url);
        if (isPinned) {
          btn.classList.add('pinned');
          btn.innerHTML = '★';
          btn.title = 'Bỏ ghim khỏi trang chủ';
        } else {
          btn.classList.remove('pinned');
          btn.innerHTML = '☆';
          btn.title = 'Ghim vào trang chủ';
        }
      });
    }

    // Attach click listeners to all pin-btn buttons with data-url attribute
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.pin-btn[data-url]');
      if (!btn) return;

      e.preventDefault();
      e.stopPropagation();

      const url = btn.getAttribute('data-url');
      const title = btn.getAttribute('data-title') || 'Công cụ';
      const category = btn.getAttribute('data-category') || 'Lâm sàng';
      const icon = btn.getAttribute('data-icon') || '⭐';

      toggleFavorite({ url, title, category, icon });
    });

    renderFavorites();
    updatePinButtons();
  }

  // ============================================================
  // FUNCTION: CATEGORY FILTER & LIVE SEARCH
  // ============================================================
  function initCategoryFilter() {
    const pills = document.querySelectorAll('.filter-pill');
    const cards = document.querySelectorAll('.tool-card');
    const searchInput = document.getElementById('categorySearchInput');

    if (cards.length === 0) return;

    let activeCategory = 'all';

    function filterCards() {
      const query = searchInput ? searchInput.value.trim().toLowerCase() : '';

      cards.forEach(card => {
        const cat = card.getAttribute('data-category') || '';
        const title = card.querySelector('h3') ? card.querySelector('h3').textContent.toLowerCase() : '';
        const desc = card.querySelector('p') ? card.querySelector('p').textContent.toLowerCase() : '';

        const matchesCat = activeCategory === 'all' || cat === activeCategory;
        const matchesQuery = !query || title.includes(query) || desc.includes(query);

        if (matchesCat && matchesQuery) {
          card.style.display = '';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
        }
      });
    }

    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        activeCategory = pill.getAttribute('data-filter') || 'all';
        filterCards();
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', filterCards);
    }
  }

  // ============================================================
  // FUNCTION: KEYBOARD SHORTCUTS HELP MODAL
  // ============================================================
  function initKeyboardShortcuts() {
    const overlay = document.getElementById('hotkeyModalOverlay');
    const closeBtn = document.getElementById('hotkeyCloseBtn');
    const triggerBtn = document.getElementById('hotkeyHelpBtn');

    if (!overlay) return;

    function openModal() {
      overlay.classList.add('active');
    }

    function closeModal() {
      overlay.classList.remove('active');
    }

    if (triggerBtn) {
      triggerBtn.addEventListener('click', openModal);
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      // Press '?' key when not typing in input/textarea
      if (e.key === '?') {
        const active = document.activeElement;
        const isTyping = active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA' || active.isContentEditable);
        if (!isTyping) {
          e.preventDefault();
          overlay.classList.contains('active') ? closeModal() : openModal();
        }
      }

      if (e.key === 'Escape' && overlay.classList.contains('active')) {
        closeModal();
      }
    });
  }

  function escapeHtml(unsafe) {
    return String(unsafe || '')
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

})();

