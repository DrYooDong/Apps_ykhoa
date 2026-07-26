/**
 * CliniPortal — Article Reader Engine
 * 
 * Bộ điều khiển trình đọc bài viết y khoa Markdown:
 * - Render Markdown + Frontmatter
 * - Tự động dựng Mục lục Động (TOC) & ScrollSpy
 * - Tính toán thời gian đọc (Reading Time)
 * - Tích hợp Bookmark & Ghi chú cá nhân tại chỗ (CliniStorage)
 * - Tùy chỉnh Font size, In bài viết
 * 
 * @module ArticleReaderEngine
 */

(function () {
    'use strict';

    class ArticleReaderEngine {
        constructor() {
            this.fileUrl = null;
            this.articleId = null;
            this.metadata = {};
            this.headings = [];
            this.currentFontSize = 16; // px
        }

        async init() {
            // 1. Lấy file path từ URL (?file=...)
            const urlParams = new URLSearchParams(window.location.search);
            this.fileUrl = urlParams.get('file');

            if (!this.fileUrl) {
                this._renderError('Không tìm thấy tham số file bài viết (VD: ?file=path/to/article.md)');
                return;
            }

            // Tạo unique ID từ file path
            this.articleId = this.fileUrl.replace(/[^\w-]/g, '_');

            try {
                // 2. Render Markdown content & bóc tách metadata
                const container = document.getElementById('article-content-container');
                const { metadata } = await window.CliniMarkdown.renderFromFile(this.fileUrl, container);
                this.metadata = metadata || {};

                // 3. Cập nhật thông tin Header
                this._updateHeaderInfo(container.innerText || '');

                // 4. Khởi tạo Mục lục Động (TOC) & ScrollSpy
                this._buildTableOfContents(container);
                this._initScrollSpy();

                // 5. Khởi tạo Bookmark & Ghi chú cá nhân (CliniStorage)
                this._initBookmarkAndNotes();

                // 6. Đăng ký các sự kiện Toolbar (In bài, đổi font)
                this._initToolbarEvents();

            } catch (err) {
                console.error('ArticleReaderEngine: Lỗi nạp bài viết', err);
                this._renderError(`Lỗi khi nạp file bài viết: ${err.message}`);
            }
        }

        _renderError(message) {
            const container = document.getElementById('article-content-container');
            if (container) {
                container.innerHTML = `
                    <div class="md-alert md-alert-warning" style="margin: 2rem 0;">
                        <i class="fa-solid fa-triangle-exclamation"></i>
                        <div><strong>Lỗi Trình Đọc Bài Viết:</strong> ${message}</div>
                    </div>
                `;
            }
        }

        _updateHeaderInfo(fullText) {
            // Title
            const titleEl = document.getElementById('article-title');
            if (titleEl) {
                titleEl.textContent = this.metadata.title || document.title || 'Tài liệu Y khoa';
                document.title = `${titleEl.textContent} – CliniPortal`;
            }

            // Category / Specialty
            const catEl = document.getElementById('article-category');
            if (catEl) {
                catEl.textContent = this.metadata.category || 'Y học chứng cứ';
            }

            // Author
            const authorEl = document.getElementById('article-author');
            if (authorEl) {
                authorEl.textContent = this.metadata.author || 'Hội đồng Y khoa CliniPortal';
            }

            // Date
            const dateEl = document.getElementById('article-date');
            if (dateEl) {
                dateEl.textContent = this.metadata.updatedDate || this.metadata.date || 'Mới cập nhật';
            }

            // Reading Time (~200 words / min)
            const readTimeEl = document.getElementById('article-readtime');
            if (readTimeEl) {
                const wordCount = fullText.trim().split(/\s+/).length;
                const minutes = Math.max(1, Math.ceil(wordCount / 200));
                readTimeEl.textContent = `${minutes} phút đọc (${wordCount} từ)`;
            }
        }

        _buildTableOfContents(container) {
            const tocList = document.getElementById('article-toc-list');
            if (!tocList) return;

            const headings = container.querySelectorAll('h1, h2, h3, h4');
            this.headings = Array.from(headings);

            if (this.headings.length === 0) {
                tocList.innerHTML = '<li class="toc-empty">Không có mục lục</li>';
                return;
            }

            tocList.innerHTML = this.headings.map(h => {
                const level = h.tagName.toLowerCase();
                const text = h.textContent.replace(/^#+\s*/, '');
                const id = h.id;
                return `
                    <li class="toc-item toc-${level}">
                        <a href="#${id}" class="toc-link" data-id="${id}">${text}</a>
                    </li>
                `;
            }).join('');

            // Click smooth scroll
            tocList.querySelectorAll('.toc-link').forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetId = link.getAttribute('data-id');
                    const targetHeading = document.getElementById(targetId);
                    if (targetHeading) {
                        targetHeading.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                });
            });
        }

        _initScrollSpy() {
            if (this.headings.length === 0) return;

            const observerOptions = {
                root: null,
                rootMargin: '-80px 0px -60% 0px',
                threshold: 0
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const id = entry.target.id;
                        document.querySelectorAll('#article-toc-list .toc-link').forEach(link => {
                            if (link.getAttribute('data-id') === id) {
                                link.classList.add('active');
                            } else {
                                link.classList.remove('active');
                            }
                        });
                    }
                });
            }, observerOptions);

            this.headings.forEach(h => observer.observe(h));
        }

        async _initBookmarkAndNotes() {
            const bmBtn = document.getElementById('btn-article-bookmark');
            if (bmBtn && window.CliniStorage) {
                // Check initial bookmark state
                const isBookmarked = await window.CliniStorage.isBookmarked(this.articleId);
                this._updateBookmarkUI(bmBtn, isBookmarked);

                bmBtn.addEventListener('click', async () => {
                    const newState = await window.CliniStorage.toggleBookmark({
                        id: this.articleId,
                        title: this.metadata.title || document.title,
                        url: window.location.href,
                        category: this.metadata.category || 'Guidelines',
                        module: 'ebm'
                    });
                    this._updateBookmarkUI(bmBtn, newState);
                });
            }

            // Ghi chú cá nhân
            const noteInput = document.getElementById('article-note-input');
            const saveNoteBtn = document.getElementById('btn-save-article-note');
            const notesListEl = document.getElementById('article-notes-list');

            if (saveNoteBtn && noteInput && window.CliniStorage) {
                // Load existing notes
                const renderNotes = async () => {
                    const notes = await window.CliniStorage.getNotes(this.fileUrl);
                    if (notesListEl) {
                        if (notes.length === 0) {
                            notesListEl.innerHTML = '<p class="note-empty">Chưa có ghi chú nào.</p>';
                        } else {
                            notesListEl.innerHTML = notes.map(n => `
                                <div class="note-item">
                                    <div class="note-time">${new Date(n.timestamp).toLocaleDateString('vi-VN')}</div>
                                    <div class="note-text">${n.content}</div>
                                </div>
                            `).join('');
                        }
                    }
                };

                await renderNotes();

                saveNoteBtn.addEventListener('click', async () => {
                    const val = noteInput.value.trim();
                    if (val) {
                        await window.CliniStorage.saveNote(this.fileUrl, val, this.metadata.title);
                        noteInput.value = '';
                        await renderNotes();
                    }
                });
            }
        }

        _updateBookmarkUI(btn, isBookmarked) {
            if (isBookmarked) {
                btn.classList.add('bookmarked');
                btn.innerHTML = '<i class="fa-solid fa-bookmark" style="color:var(--color-warning);"></i> Đã lưu';
            } else {
                btn.classList.remove('bookmarked');
                btn.innerHTML = '<i class="fa-regular fa-bookmark"></i> Lưu bài viết';
            }
        }

        _initToolbarEvents() {
            // In bài viết / Download PDF
            const printBtn = document.getElementById('btn-article-print');
            if (printBtn) {
                printBtn.addEventListener('click', () => window.print());
            }

            // Font size increase / decrease
            const fontIncBtn = document.getElementById('btn-font-inc');
            const fontDecBtn = document.getElementById('btn-font-dec');
            const container = document.getElementById('article-content-container');

            if (container) {
                if (fontIncBtn) {
                    fontIncBtn.addEventListener('click', () => {
                        this.currentFontSize = Math.min(24, this.currentFontSize + 1);
                        container.style.fontSize = `${this.currentFontSize}px`;
                    });
                }
                if (fontDecBtn) {
                    fontDecBtn.addEventListener('click', () => {
                        this.currentFontSize = Math.max(13, this.currentFontSize - 1);
                        container.style.fontSize = `${this.currentFontSize}px`;
                    });
                }
            }
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        const engine = new ArticleReaderEngine();
        engine.init();
    });
})();
