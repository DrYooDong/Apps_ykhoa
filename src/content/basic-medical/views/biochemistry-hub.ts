/**
 * CLINI_PORTAL — BIOCHEMISTRY HUB CONTROLLER (TYPESCRIPT)
 * Path: src/content/pathophysiology/biochemistry-hub.ts
 * Xử lý logic hiển thị, tìm kiếm, lọc danh mục & Modal tương tác cho Hóa Sinh Y Học
 */

import { BIOCHEMISTRY_DATA } from '../data/biochemistry-data';
import { BiochemistryBlock, BiochemistryTopic, MetabolicPathway } from '../types/biochemistry.types';

// Extend Window interface for global onclick bindings
declare global {
  interface Window {
    BiochemHub: {
      openQuickPreview: (topicId: string) => void;
      closeModal: () => void;
      selectPathway: (pathwayId: string) => void;
    };
  }
}

class BiochemistryHubController {
  private currentFilterBlock: string = 'all';
  private searchQuery: string = '';

  private searchInput: HTMLInputElement | null = null;
  private blocksContainer: HTMLElement | null = null;
  private filterNav: HTMLElement | null = null;
  private modalBackdrop: HTMLElement | null = null;
  private modalContainer: HTMLElement | null = null;

  constructor() {
    // Tự động khởi chạy khi DOM sẵn sàng
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.init());
    } else {
      this.init();
    }
  }

  public init(): void {
    this.initDOMElements();
    this.renderBlockFilterNav();
    this.renderAllBlocksAndTopics();
    this.setupEventListeners();
    this.bindGlobalWindow();
  }

  private initDOMElements(): void {
    this.searchInput = document.getElementById('biochemSearchInput') as HTMLInputElement | null;
    this.blocksContainer = document.getElementById('biochemBlocksContainer');
    this.filterNav = document.getElementById('biochemFilterNav');
    this.modalBackdrop = document.getElementById('biochemModalBackdrop');
    this.modalContainer = document.getElementById('biochemModalContainer');
  }

  private renderBlockFilterNav(): void {
    if (!this.filterNav) return;

    let html = `
      <button type="button" class="block-filter-btn active" data-block="all">
        <i class="fa-solid fa-layer-group"></i> Tất cả (${BIOCHEMISTRY_DATA.topics.length})
      </button>
    `;

    BIOCHEMISTRY_DATA.blocks.forEach((b: BiochemistryBlock) => {
      html += `
        <button type="button" class="block-filter-btn" data-block="${b.id}">
          <i class="fa-solid ${b.icon}" style="color: ${b.color};"></i> ${b.code}: ${b.name}
        </button>
      `;
    });

    this.filterNav.innerHTML = html;
  }

  public renderAllBlocksAndTopics(): void {
    if (!this.blocksContainer) return;

    let totalVisible = 0;
    let html = '';

    BIOCHEMISTRY_DATA.blocks.forEach((block: BiochemistryBlock) => {
      if (this.currentFilterBlock !== 'all' && this.currentFilterBlock !== block.id) return;

      const matchingTopics = BIOCHEMISTRY_DATA.topics.filter((topic: BiochemistryTopic) => {
        if (topic.blockId !== block.id) return false;
        if (!this.searchQuery) return true;

        const q = this.searchQuery.toLowerCase().trim();
        const inTitle = topic.title.toLowerCase().includes(q);
        const inOverview = topic.overview.toLowerCase().includes(q);
        const inTags = topic.tags.some(t => t.toLowerCase().includes(q));
        const inPearls = topic.clinicalPearls.some(p => p.toLowerCase().includes(q));
        const inLabs = topic.relatedLabTests.some(l => l.toLowerCase().includes(q));

        return inTitle || inOverview || inTags || inPearls || inLabs;
      });

      if (matchingTopics.length === 0) return;

      totalVisible += matchingTopics.length;

      html += `
        <section class="block-section" id="${block.id}" style="--block-color: ${block.color};">
          <div class="block-section-header">
            <div class="block-header-left">
              <div class="block-badge-icon" style="background: ${block.bgColor}; color: ${block.color};">
                <i class="fa-solid ${block.icon}"></i>
              </div>
              <div>
                <h2 class="block-header-title">${block.code}. ${block.name}</h2>
                <div class="block-header-desc">${block.description}</div>
              </div>
            </div>
            <div class="block-header-right">
              <span class="topic-code-badge" style="font-size: 0.85rem;">${matchingTopics.length} chuyên đề</span>
            </div>
          </div>

          <div class="topics-grid">
            ${matchingTopics.map(topic => this.renderTopicCard(topic, block)).join('')}
          </div>
        </section>
      `;
    });

    if (totalVisible === 0) {
      html = `
        <div style="text-align: center; padding: 4rem 1rem; background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 12px;">
          <i class="fa-solid fa-magnifying-glass" style="font-size: 2.5rem; color: var(--color-text-muted); margin-bottom: 1rem;"></i>
          <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--color-text); margin-bottom: 0.5rem;">Không tìm thấy chuyên đề phù hợp</h3>
          <p style="color: var(--color-text-muted); font-size: 0.9rem;">Hãy thử tìm bằng từ khóa khác (ví dụ: Krebs, Đường phân, LFTs, Acid Uric, Troponin, G6PD...)</p>
          <button type="button" class="btn-quick-preview" id="btnResetSearch" style="margin-top: 1rem; padding: 0.6rem 1.2rem;">Xóa bộ lọc tìm kiếm</button>
        </div>
      `;
    }

    this.blocksContainer.innerHTML = html;

    const btnReset = document.getElementById('btnResetSearch');
    if (btnReset) {
      btnReset.addEventListener('click', () => {
        if (this.searchInput) this.searchInput.value = '';
        this.searchQuery = '';
        this.currentFilterBlock = 'all';
        this.updateFilterNavUI();
        this.renderAllBlocksAndTopics();
      });
    }
  }

  private renderTopicCard(topic: BiochemistryTopic, block: BiochemistryBlock): string {
    return `
      <article class="topic-card" data-topic-id="${topic.id}">
        <div class="topic-card-header">
          <span class="topic-code-badge">${topic.code}</span>
          <span class="topic-category-badge"><i class="fa-solid fa-bookmark" style="color: ${block.color};"></i> ${topic.badge}</span>
        </div>

        <h3 class="topic-title">${topic.title}</h3>
        <p class="topic-overview">${topic.overview}</p>

        <div class="topic-tags">
          ${topic.tags.map(t => `<span class="topic-tag">${t}</span>`).join('')}
        </div>

        <div class="topic-card-actions">
          <button type="button" class="btn-quick-preview" onclick="window.BiochemHub.openQuickPreview('${topic.id}')">
            <i class="fa-solid fa-eye"></i> Xem Tóm tắt & Điểm ngọc
          </button>
          <span class="pearl-counter" title="${topic.clinicalPearls.length} Điểm ngọc lâm sàng">
            <i class="fa-solid fa-star"></i> ${topic.clinicalPearls.length} Pearls
          </span>
        </div>
      </article>
    `;
  }

  private setupEventListeners(): void {
    if (this.searchInput) {
      this.searchInput.addEventListener('input', (e: Event) => {
        this.searchQuery = (e.target as HTMLInputElement).value;
        this.renderAllBlocksAndTopics();
      });
    }

    if (this.filterNav) {
      this.filterNav.addEventListener('click', (e: MouseEvent) => {
        const btn = (e.target as HTMLElement).closest('.block-filter-btn') as HTMLElement | null;
        if (!btn) return;

        const blockId = btn.getAttribute('data-block');
        if (blockId) {
          this.currentFilterBlock = blockId;
          this.updateFilterNavUI();
          this.renderAllBlocksAndTopics();
        }
      });
    }

    if (this.modalBackdrop) {
      this.modalBackdrop.addEventListener('click', (e: MouseEvent) => {
        if (e.target === this.modalBackdrop) {
          this.closeModal();
        }
      });
    }

    document.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Escape' && this.modalBackdrop && this.modalBackdrop.classList.contains('open')) {
        this.closeModal();
      }
    });
  }

  private updateFilterNavUI(): void {
    if (!this.filterNav) return;
    this.filterNav.querySelectorAll('.block-filter-btn').forEach(btn => {
      if (btn.getAttribute('data-block') === this.currentFilterBlock) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  public openQuickPreview(topicId: string): void {
    if (!this.modalBackdrop || !this.modalContainer) return;

    const topic = BIOCHEMISTRY_DATA.topics.find((t: BiochemistryTopic) => t.id === topicId);
    if (!topic) return;

    const block = BIOCHEMISTRY_DATA.blocks.find((b: BiochemistryBlock) => b.id === topic.blockId);

    this.modalContainer.innerHTML = `
      <div class="modal-header">
        <div class="modal-title-group">
          <span class="modal-badge">${topic.code} • ${block ? block.name : ''}</span>
          <h3 class="modal-title">${topic.title}</h3>
        </div>
        <button type="button" class="modal-close-btn" onclick="window.BiochemHub.closeModal()" aria-label="Đóng">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>

      <div class="modal-body">
        <div class="modal-section-box">
          <h4 class="modal-section-title">
            <i class="fa-solid fa-circle-info" style="color: var(--color-primary);"></i> Tóm tắt Nội dung Cốt lõi
          </h4>
          <p style="font-size: 0.9rem; line-height: 1.6; color: var(--color-text);">${topic.overview}</p>
        </div>

        <div class="modal-section-box">
          <h4 class="modal-section-title">
            <i class="fa-solid fa-flask" style="color: #8b5cf6;"></i> Phản ứng & Điểm chốt Cơ chế
          </h4>
          <ul class="reaction-list">
            ${topic.keyReactions.map(r => `<li><code>${r}</code></li>`).join('')}
          </ul>
        </div>

        <div class="modal-section-box" style="border-left: 4px solid #f59e0b; background: rgba(245, 158, 11, 0.05);">
          <h4 class="modal-section-title" style="color: #b45309;">
            <i class="fa-solid fa-lightbulb" style="color: #f59e0b;"></i> Điểm ngọc Lâm sàng (Clinical Pearls)
          </h4>
          <ul class="pearl-list">
            ${topic.clinicalPearls.map(p => `<li>${p}</li>`).join('')}
          </ul>
        </div>

        <div class="modal-section-box">
          <h4 class="modal-section-title">
            <i class="fa-solid fa-stethoscope" style="color: #10b981;"></i> Chỉ số Xét nghiệm & Thăm dò Liên quan
          </h4>
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.5rem;">
            ${topic.relatedLabTests.map(l => `<span class="topic-tag" style="background: var(--color-surface); color: var(--color-primary); font-weight: 600; padding: 0.35rem 0.75rem;"><i class="fa-solid fa-vial"></i> ${l}</span>`).join('')}
          </div>
        </div>
      </div>
    `;

    this.modalBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  public closeModal(): void {
    if (this.modalBackdrop) {
      this.modalBackdrop.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  public selectPathway(pathwayId: string): void {
    const pathway = BIOCHEMISTRY_DATA.metabolicPathways.find((p: MetabolicPathway) => p.id === pathwayId);
    if (!pathway) return;

    this.openQuickPreview(pathway.topicId);
  }

  private bindGlobalWindow(): void {
    window.BiochemHub = {
      openQuickPreview: (topicId: string) => this.openQuickPreview(topicId),
      closeModal: () => this.closeModal(),
      selectPathway: (pathwayId: string) => this.selectPathway(pathwayId)
    };
  }
}

// Khởi tạo instance
export const biochemHubInstance = new BiochemistryHubController();
