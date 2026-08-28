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
}

export const mdxInteractiveRuntime = MdxInteractiveRuntime.getInstance();
