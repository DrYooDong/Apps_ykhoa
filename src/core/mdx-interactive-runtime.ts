/**
 * CliniPortal 2.0 — MDX Interactive Runtime Helper
 * Path: src/core/mdx-interactive-runtime.ts
 * 
 * Cung cấp khả năng tương tác Client-Side nâng cao cho mọi bài học MDX:
 * 1. Tự động nhận diện & bọc khung Clinical Blueprint cho sơ đồ ASCII/Unicode.
 * 2. Tự động bọc responsive wrapper & scroll indicator cho mọi bảng dữ liệu.
 * 3. Interactive Clinical Scoring Engine cho thang điểm TG18, Sepsis, Baveno VII, Burch-Wartofsky.
 * 4. Reading Progress Bar theo dõi tiến độ đọc bài.
 * 5. Active TOC Highlight Observer theo vị trí cuộn trang.
 * 6. One-click Copy Button cho mã nguồn & sơ đồ lưu đồ.
 */

export class MdxInteractiveRuntime {
  private static instance: MdxInteractiveRuntime | null = null;
  private isInitialized = false;

  public static getInstance(): MdxInteractiveRuntime {
    if (!MdxInteractiveRuntime.instance) {
      MdxInteractiveRuntime.instance = new MdxInteractiveRuntime();
    }
    return MdxInteractiveRuntime.instance;
  }

  /**
   * Khởi tạo hoặc tái kích hoạt toàn bộ runtime trên vùng chứa nội dung bài học
   */
  public mount(rootElement: HTMLElement = document.body): void {
    if (!rootElement) return;

    this.initReadingProgressBar();
    this.enhanceDiagramBlocks(rootElement);
    this.enhanceDataTables(rootElement);
    this.initInteractiveCalculators(rootElement);
    this.initActiveTocObserver(rootElement);
    this.initCopyButtons(rootElement);
    this.initDeepLinkAutoExpand(rootElement);
    this.initSynchronizedTabs(rootElement);
    this.initMedicalLightbox(rootElement);
    this.initArticleActionsToolbar(rootElement);

    this.isInitialized = true;
  }

  /**
   * 1. THANH TIẾN ĐỘ ĐỌC BÀI (Reading Progress Bar)
   */
  private initReadingProgressBar(): void {
    if (typeof window === 'undefined') return;

    let progressBar = document.getElementById('mdx-reading-progress');
    if (!progressBar) {
      progressBar = document.createElement('div');
      progressBar.id = 'mdx-reading-progress';
      progressBar.className = 'mdx-reading-progress-bar';
      document.body.prepend(progressBar);
    }

    const updateProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (scrollHeight > 0 && progressBar) {
        const progress = Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100));
        progressBar.style.width = `${progress}%`;
      }
    };

    window.removeEventListener('scroll', updateProgress);
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  /**
   * 2. TỰ ĐỘNG BỌC & NÂNG CẤP SƠ ĐỒ LƯU ĐỒ ASCII (Clinical Blueprint Cards)
   */
  private enhanceDiagramBlocks(root: HTMLElement): void {
    const preBlocks = root.querySelectorAll('pre');
    preBlocks.forEach((pre) => {
      // Bỏ qua nếu đã được bọc
      if (pre.closest('.mdx-diagram-card') || pre.classList.contains('blueprint-enhanced')) return;

      const codeText = pre.textContent || '';
      const isAsciiDiagram =
        codeText.includes('──►') ||
        codeText.includes('──>') ||
        codeText.includes('-->') ||
        codeText.includes('├──') ||
        codeText.includes('└──') ||
        codeText.includes('┌──') ||
        codeText.includes('▲') ||
        codeText.includes('▼') ||
        codeText.includes('│');

      if (isAsciiDiagram) {
        pre.classList.add('blueprint-enhanced', 'mdx-diagram-canvas');

        // Tạo Card Wrapper
        const card = document.createElement('div');
        card.className = 'mdx-diagram-card';

        // Tạo Header Bar
        const header = document.createElement('div');
        header.className = 'mdx-diagram-header';
        header.innerHTML = `
          <div class="mdx-diagram-title-wrap">
            <span class="mdx-diagram-badge"><i class="fa-solid fa-diagram-project"></i> SƠ ĐỒ CƠ CHẾ</span>
            <span>Chu trình & Lưu đồ Lâm sàng</span>
          </div>
          <div class="mdx-diagram-actions">
            <button type="button" class="mdx-diagram-btn mdx-copy-trigger" title="Sao chép sơ đồ">
              <i class="fa-regular fa-copy"></i>
              <span>Sao chép</span>
            </button>
          </div>
        `;

        if (pre.parentNode) {
          pre.parentNode.insertBefore(card, pre);
          card.appendChild(header);
          card.appendChild(pre);
        }
      }
    });
  }

  /**
   * 3. TỰ ĐỘNG BỌC RESPONSIVE TABLE VỚI CHỈ BÁO VUỐT NGANG TRÊN MOBILE
   */
  private enhanceDataTables(root: HTMLElement): void {
    const tables = root.querySelectorAll('table');
    tables.forEach((table) => {
      if (table.closest('.table-wrapper') || table.closest('.table-container') || table.closest('.mdx-table-wrapper')) {
        return;
      }

      table.classList.add('mdx-table');

      const wrapper = document.createElement('div');
      wrapper.className = 'table-wrapper mdx-table-wrapper';

      if (table.parentNode) {
        table.parentNode.insertBefore(wrapper, table);
        wrapper.appendChild(table);
      }
    });
  }

  /**
   * 4. INTERACTIVE CLINICAL SCORING ENGINE (Thang điểm TG18, Sepsis-3, Baveno VII...)
   */
  private initInteractiveCalculators(root: HTMLElement): void {
    const calcCards = root.querySelectorAll<HTMLElement>('.sec-card, .sub-card, .widget-container');

    calcCards.forEach((card) => {
      const checkboxes = card.querySelectorAll<HTMLInputElement>('.calc-checkbox-label input[type="checkbox"]');
      if (checkboxes.length === 0) return;

      const scoreDisplay = card.querySelector<HTMLElement>('.calc-score-number');
      const verdictTag = card.querySelector<HTMLElement>('.calc-verdict-tag, .calc-score-text');

      const recalculate = () => {
        let totalScore = 0;
        checkboxes.forEach((cb) => {
          if (cb.checked) {
            const val = parseFloat(cb.dataset.score || cb.value || '1');
            totalScore += isNaN(val) ? 1 : val;
          }
        });

        if (scoreDisplay) {
          scoreDisplay.textContent = totalScore.toString();
        }

        if (verdictTag) {
          if (totalScore >= 3) {
            verdictTag.textContent = 'Nguy cơ CAO / Cần can thiệp khẩn';
            verdictTag.style.color = 'var(--color-danger, #dc2626)';
          } else if (totalScore >= 1) {
            verdictTag.textContent = 'Nguy cơ TRUNG BÌNH / Cần theo dõi sát';
            verdictTag.style.color = 'var(--color-warning, #d97706)';
          } else {
            verdictTag.textContent = 'Nguy cơ THẤP / Theo dõi thường quy';
            verdictTag.style.color = 'var(--color-success, #059669)';
          }
        }
      };

      checkboxes.forEach((cb) => {
        cb.removeEventListener('change', recalculate);
        cb.addEventListener('change', recalculate);
      });
    });
  }

  /**
   * 5. THEO DÕI MỤC LỤC NỔI THEO VỊ TRÍ CUỘN TRANG (Active TOC Highlight)
   */
  private initActiveTocObserver(root: HTMLElement): void {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    const headings = root.querySelectorAll('h1[id], h2[id], h3[id]');
    const tocLinks = document.querySelectorAll('.toc-list a, .article-toc-sidebar a');
    if (headings.length === 0 || tocLinks.length === 0) return;

    const headingMap = new Map<string, Element>();
    headings.forEach((h) => {
      if (h.id) headingMap.set(h.id, h);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const activeId = entry.target.id;
            tocLinks.forEach((link) => {
              const href = link.getAttribute('href') || '';
              const targetId = href.replace(/^#/, '');
              const parentLi = link.closest('li');
              if (targetId === activeId) {
                link.classList.add('active');
                if (parentLi) parentLi.classList.add('active');
              } else {
                link.classList.remove('active');
                if (parentLi) parentLi.classList.remove('active');
              }
            });
          }
        });
      },
      {
        rootMargin: '0px 0px -70% 0px',
        threshold: 0.1
      }
    );

    headings.forEach((h) => observer.observe(h));
  }

  /**
   * 6. NÚT SAO CHÉP MÃ NGUỒN & SƠ ĐỒ (One-Click Copy Tooltip)
   */
  private initCopyButtons(root: HTMLElement): void {
    const copyTriggers = root.querySelectorAll('.mdx-copy-trigger');
    copyTriggers.forEach((btn) => {
      btn.removeEventListener('click', this.handleCopyClick);
      btn.addEventListener('click', this.handleCopyClick);
    });
  }

  private handleCopyClick = (e: Event): void => {
    const btn = (e.currentTarget as HTMLElement);
    const card = btn.closest('.mdx-diagram-card, .mdx-code-block');
    if (!card) return;

    const targetContent = card.querySelector('pre, code');
    if (!targetContent) return;

    const textToCopy = targetContent.textContent || '';
    if (!navigator.clipboard) return;

    navigator.clipboard.writeText(textToCopy).then(() => {
      const originalHtml = btn.innerHTML;
      btn.innerHTML = `<i class="fa-solid fa-check" style="color: var(--color-success, #10b981);"></i> <span style="color: var(--color-success, #10b981);">Đã chép</span>`;
      setTimeout(() => {
        btn.innerHTML = originalHtml;
      }, 2000);
    });
  };

  /**
   * 7. DEEP-LINKING AUTO-EXPAND (#hash) CHO ACCORDIONS & DETAILS (Expo-inspired)
   * Khi URL chứa #hash trùng với id của <details> hoặc thẻ cha, tự động mở và cuộn mượt tới vị trí đó.
   */
  private initDeepLinkAutoExpand(root: HTMLElement): void {
    if (typeof window === 'undefined') return;

    const handleHashChange = () => {
      const rawHash = window.location.hash;
      if (!rawHash || rawHash.length <= 1) return;
      const hashId = decodeURIComponent(rawHash.substring(1));
      const target = root.querySelector(`[id="${hashId}"]`) || document.getElementById(hashId);
      if (!target) return;

      // Tự động mở nếu target là <details> hoặc nằm bên trong <details>
      let parentDetails: HTMLElement | null = target.closest('details');
      while (parentDetails) {
        (parentDetails as HTMLDetailsElement).open = true;
        parentDetails = parentDetails.parentElement?.closest('details') || null;
      }

      // Mở nếu target là custom accordion/collapse
      const accordionCard = target.closest('.sec-card, .accordion-item, .collapsible-card');
      if (accordionCard && !accordionCard.classList.contains('active')) {
        accordionCard.classList.add('active', 'open');
      }

      // Cuộn mượt tới phần tử
      setTimeout(() => {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
    };

    window.removeEventListener('hashchange', handleHashChange);
    window.addEventListener('hashchange', handleHashChange);

    if (window.location.hash) {
      setTimeout(handleHashChange, 200);
    }

    const hashLinks = root.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');
    hashLinks.forEach((link) => {
      link.removeEventListener('click', this.handleInternalHashClick);
      link.addEventListener('click', this.handleInternalHashClick);
    });
  }

  private handleInternalHashClick = (e: MouseEvent): void => {
    const anchor = (e.currentTarget as HTMLAnchorElement);
    const href = anchor.getAttribute('href') || '';
    if (!href.startsWith('#') || href.length <= 1) return;
    const targetId = decodeURIComponent(href.substring(1));
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      let parentDetails: HTMLElement | null = targetEl.closest('details');
      while (parentDetails) {
        (parentDetails as HTMLDetailsElement).open = true;
        parentDetails = parentDetails.parentElement?.closest('details') || null;
      }
    }
  };

  /**
   * 8. TABSGROUP — ĐỒNG BỘ TRẠNG THÁI TAB TOÀN TRANG (Expo-inspired)
   * Khi người dùng đổi tab ở một khối, các khối tab khác có cùng sync-group hoặc cùng nhãn sẽ tự động đồng bộ theo.
   */
  private initSynchronizedTabs(root: HTMLElement): void {
    const tabContainers = root.querySelectorAll<HTMLElement>('.tab-group, .sync-tabs, [data-sync-tabs]');
    if (tabContainers.length === 0) return;

    tabContainers.forEach((container) => {
      const tabButtons = container.querySelectorAll<HTMLElement>('.tab-btn, .tab-link, [role="tab"]');
      tabButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
          const tabLabel = btn.textContent?.trim() || '';
          const groupName = container.dataset.syncTabs;

          tabContainers.forEach((otherContainer) => {
            if (otherContainer === container) return;
            if (groupName && otherContainer.dataset.syncTabs !== groupName) return;

            const otherButtons = Array.from(otherContainer.querySelectorAll<HTMLElement>('.tab-btn, .tab-link, [role="tab"]'));
            const matchingBtn = otherButtons.find(b => b.textContent?.trim() === tabLabel) || otherButtons[index];
            if (matchingBtn && !matchingBtn.classList.contains('active')) {
              matchingBtn.click();
            }
          });
        });
      });
    });
  }

  /**
   * 9. MEDICAL LIGHTBOX MODAL (Expo-inspired ContentSpotlight)
   * Tự động phóng to hình ảnh y khoa / sơ đồ / phim X-quang toàn màn hình với nền DotGrid
   */
  private initMedicalLightbox(root: HTMLElement): void {
    if (typeof document === 'undefined') return;

    let overlay = document.getElementById('clini-global-lightbox');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'clini-global-lightbox';
      overlay.className = 'clini-lightbox-overlay';
      overlay.innerHTML = `
        <div class="clini-lightbox-dialog">
          <button type="button" class="clini-lightbox-close" title="Đóng (Esc)"><i class="fa-solid fa-xmark"></i></button>
          <div class="clini-lightbox-img-wrap">
            <img class="clini-lightbox-img" src="" alt="">
          </div>
          <div class="clini-lightbox-caption"></div>
        </div>
      `;
      document.body.appendChild(overlay);

      const closeBtn = overlay.querySelector('.clini-lightbox-close');
      const closeLightbox = () => overlay?.classList.remove('active');

      closeBtn?.addEventListener('click', closeLightbox);
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeLightbox();
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay?.classList.contains('active')) {
          closeLightbox();
        }
      });
    }

    const targetImgs = root.querySelectorAll<HTMLImageElement>(
      'img.clini-zoomable-img, .mdx-diagram-card img, .article-reader-container img, .infographic-poster img, .content-container img'
    );

    targetImgs.forEach((img) => {
      if (img.classList.contains('no-lightbox') || img.closest('.clini-lightbox-dialog')) return;
      img.classList.add('clini-zoomable-img');
      img.addEventListener('click', () => {
        const dialogImg = overlay?.querySelector<HTMLImageElement>('.clini-lightbox-img');
        const captionEl = overlay?.querySelector<HTMLElement>('.clini-lightbox-caption');
        if (dialogImg && overlay) {
          dialogImg.src = img.currentSrc || img.src;
          dialogImg.alt = img.alt || 'Hình ảnh lâm sàng';
          if (captionEl) {
            const figCaption = img.closest('figure')?.querySelector('figcaption')?.textContent?.trim();
            captionEl.textContent = figCaption || img.alt || 'Hình ảnh / Sơ đồ Lâm sàng CliniPortal';
          }
          overlay.classList.add('active');
        }
      });
    });
  }

  /**
   * 10. ARTICLE ACTIONS & AI TOOLBAR (Expo-inspired MarkdownActions)
   * Cung cấp thanh công cụ sao chép Markdown, gửi prompt sang ChatGPT/Claude/Gemini và in ấn
   */
  private initArticleActionsToolbar(root: HTMLElement): void {
    const articleContainers = root.querySelectorAll<HTMLElement>('.article-reader-container, .guideline-article-container, .mdx-article-body');
    if (articleContainers.length === 0) return;

    articleContainers.forEach((article) => {
      if (article.querySelector('.clini-article-toolbar')) return;

      const title = document.querySelector('h1')?.textContent?.trim() || 'Tài liệu Y khoa CliniPortal';
      const pageUrl = typeof window !== 'undefined' ? window.location.href : '';

      const toolbar = document.createElement('div');
      toolbar.className = 'clini-article-toolbar';
      toolbar.innerHTML = `
        <button type="button" class="clini-toolbar-btn clini-copy-md-btn" title="Sao chép nội dung Markdown">
          <i class="fa-regular fa-copy"></i>
          <span>Copy MD</span>
        </button>
        <div class="clini-ai-dropdown-wrapper">
          <button type="button" class="clini-toolbar-btn clini-ai-trigger-btn" title="Hỏi AI về bài viết này">
            <i class="fa-solid fa-wand-magic-sparkles" style="color: #a855f7;"></i>
            <span>Hỏi AI</span>
            <i class="fa-solid fa-chevron-down" style="font-size: 0.7rem; margin-left: 2px;"></i>
          </button>
          <div class="clini-ai-dropdown">
            <a href="#" class="clini-ai-dropdown-item clini-ai-chatgpt" target="_blank" rel="noopener">
              <i class="fa-solid fa-robot" style="color: #10a37f;"></i>
              <span>Hỏi qua ChatGPT</span>
            </a>
            <a href="#" class="clini-ai-dropdown-item clini-ai-claude" target="_blank" rel="noopener">
              <i class="fa-solid fa-brain" style="color: #d97706;"></i>
              <span>Hỏi qua Claude</span>
            </a>
            <a href="#" class="clini-ai-dropdown-item clini-ai-gemini" target="_blank" rel="noopener">
              <i class="fa-solid fa-gem" style="color: #3b82f6;"></i>
              <span>Hỏi qua Gemini</span>
            </a>
          </div>
        </div>
        <button type="button" class="clini-toolbar-btn clini-print-btn" title="In / Xuất PDF phác đồ">
          <i class="fa-solid fa-print"></i>
          <span>In</span>
        </button>
      `;

      const h1 = article.querySelector('h1') || document.querySelector('h1');
      if (h1 && h1.parentNode) {
        h1.parentNode.insertBefore(toolbar, h1.nextSibling);
      } else {
        article.prepend(toolbar);
      }

      // 1. Copy Markdown handler
      const copyBtn = toolbar.querySelector('.clini-copy-md-btn');
      copyBtn?.addEventListener('click', () => {
        const textContent = article.innerText || '';
        const mdText = `# ${title}\n\nNguồn: CliniPortal (${pageUrl})\n\n${textContent}`;
        if (navigator.clipboard) {
          navigator.clipboard.writeText(mdText).then(() => {
            const originalHtml = copyBtn.innerHTML;
            copyBtn.innerHTML = `<i class="fa-solid fa-check" style="color: var(--color-success, #10b981);"></i> <span>Đã chép</span>`;
            setTimeout(() => { copyBtn.innerHTML = originalHtml; }, 2000);
          });
        }
      });

      // 2. AI Dropdown Toggle
      const aiBtn = toolbar.querySelector('.clini-ai-trigger-btn');
      const aiDropdown = toolbar.querySelector('.clini-ai-dropdown');
      aiBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        aiDropdown?.classList.toggle('open');
      });

      document.addEventListener('click', () => {
        aiDropdown?.classList.remove('open');
      });

      // Setup AI Links
      const promptText = encodeURIComponent(`Tôi là bác sĩ/nhân viên y tế. Dựa trên phác đồ y khoa "${title}" (tại ${pageUrl}), hãy hỗ trợ tôi phân tích ca bệnh hoặc giải đáp thắc mắc lâm sàng sau:\n\n`);

      const chatgptLink = toolbar.querySelector<HTMLAnchorElement>('.clini-ai-chatgpt');
      if (chatgptLink) chatgptLink.href = `https://chatgpt.com/?q=${promptText}`;

      const claudeLink = toolbar.querySelector<HTMLAnchorElement>('.clini-ai-claude');
      if (claudeLink) claudeLink.href = `https://claude.ai/new?q=${promptText}`;

      const geminiLink = toolbar.querySelector<HTMLAnchorElement>('.clini-ai-gemini');
      if (geminiLink) geminiLink.href = `https://gemini.google.com/app`;

      // 3. Print handler
      const printBtn = toolbar.querySelector('.clini-print-btn');
      printBtn?.addEventListener('click', () => {
        window.print();
      });
    });
  }
}

export const mdxInteractiveRuntime = MdxInteractiveRuntime.getInstance();


