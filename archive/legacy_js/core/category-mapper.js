/**
 * CliniPortal — Category Mapper Engine
 * 
 * Bộ chuyển đổi & ánh xạ chuyên khoa tập trung:
 * - Nạp cấu hình từ `data/categories.json`
 * - Ánh xạ từ slug ASCII (e.g. 'pathophysiology', 'calculators') sang tên Tiếng Việt, Icon & Color Tokens.
 * - Render UI Badges & Breadcrumbs tự động cho toàn bộ hệ thống.
 * 
 * @module CategoryMapper
 */

(function () {
    'use strict';

    // Fallback data cấu hình trong bộ nhớ phòng trường hợp fetch JSON thất bại
    const FALLBACK_CATEGORIES = {
        calculators: { name: 'Công cụ Lâm sàng', shortName: 'Công cụ', icon: 'fa-calculator', color: 'var(--color-primary, #0284c7)' },
        pharmacology: { name: 'Dược lý Học', shortName: 'Dược lý', icon: 'fa-pills', color: 'var(--color-success, #10b981)' },
        pathophysiology: { name: 'Sinh lý & Sinh lý bệnh', shortName: 'Sinh lý', icon: 'fa-dna', color: 'var(--color-purple, #8b5cf6)' },
        ebm: { name: 'Y học Chứng cứ & Guidelines', shortName: 'Y học chứng cứ', icon: 'fa-book-medical', color: 'var(--color-warning, #f59e0b)' },
        skills: { name: 'Kỹ năng Lâm sàng & OSCE', shortName: 'Kỹ năng', icon: 'fa-stethoscope', color: 'var(--color-info, #06b6d4)' },
        approaches: { name: 'Tiếp cận Triệu chứng & Phác đồ', shortName: 'Tiếp cận', icon: 'fa-diagram-project', color: 'var(--color-danger, #ef4444)' },
        tcm: { name: 'Y học Cổ truyền', shortName: 'YHCT', icon: 'fa-yin-yang', color: 'var(--color-emerald, #059669)' }
    };

    class CategoryMapper {
        constructor() {
            this.categories = FALLBACK_CATEGORIES;
            this.isLoaded = false;
            this.initPromise = null;
        }

        /**
         * Nạp cấu hình từ categories.json
         * @param {string} [jsonPath] Đường dẫn tới categories.json (tự động đếm cấp nếu không truyền)
         */
        async init(jsonPath) {
            if (this.initPromise) return this.initPromise;

            this.initPromise = new Promise(async (resolve) => {
                let targetPath = jsonPath;
                if (!targetPath) {
                    // Tự động đoán đường dẫn relative dựa trên vị trí trang hiện tại
                    const path = window.location.pathname;
                    if (path.includes('/src/content/')) {
                        const segments = path.split('/src/content/')[1].split('/').filter(Boolean);
                        const depth = segments.length + 1; // +1 cho src/content/
                        const prefix = '../'.repeat(depth);
                        targetPath = `${prefix}data/categories.json`;
                    } else if (path.includes('/pages/')) {
                        const segments = path.split('/pages/')[1].split('/').filter(Boolean);
                        const depth = segments.length; // 1 -> ../, 2 -> ../../
                        const prefix = '../'.repeat(depth);
                        targetPath = `${prefix}data/categories.json`;
                    } else {
                        targetPath = './data/categories.json';
                    }
                }

                try {
                    const res = await fetch(targetPath);
                    if (res.ok) {
                        const data = await res.json();
                        if (data && data.categories) {
                            this.categories = data.categories;
                            this.isLoaded = true;
                        }
                    }
                } catch (e) {
                    console.warn('CategoryMapper: Không thể nạp categories.json, dùng fallback memory.', e);
                }
                resolve(this);
            });

            return this.initPromise;
        }

        /**
         * Lấy thông tin đầy đủ của Category theo Slug ASCII
         * @param {string} slug 
         * @returns {Object}
         */
        getCategory(slug) {
            if (!slug) return null;
            const normalized = slug.toLowerCase().trim();
            return this.categories[normalized] || {
                id: normalized,
                slug: normalized,
                name: slug,
                shortName: slug,
                icon: 'fa-folder',
                color: 'var(--color-primary, #0284c7)'
            };
        }

        /**
         * Lấy tên hiển thị Tiếng Việt
         * @param {string} slug 
         * @param {boolean} [shortForm=false] 
         * @returns {string}
         */
        getDisplayName(slug, shortForm = false) {
            const cat = this.getCategory(slug);
            return shortForm ? (cat.shortName || cat.name) : cat.name;
        }

        /**
         * Lấy danh sách tất cả các Categories
         * @returns {Array<Object>}
         */
        getAllCategories() {
            return Object.values(this.categories);
        }

        /**
         * Render Badge HTML cho Chuyên khoa
         * @param {string} slug 
         * @param {string} [extraClass=''] 
         * @returns {string} HTML string
         */
        renderBadge(slug, extraClass = '') {
            const cat = this.getCategory(slug);
            const color = cat.color || 'var(--color-primary)';
            const bg = cat.bgLight || 'rgba(2, 132, 199, 0.1)';

            return `
                <span class="clini-cat-badge ${extraClass}" style="background: ${bg}; color: ${color}; padding: 0.25rem 0.65rem; border-radius: 20px; font-size: 0.8rem; font-weight: 700; display: inline-flex; align-items: center; gap: 0.35rem; border: 1px solid rgba(0,0,0,0.05);">
                    <i class="fa-solid ${cat.icon}"></i> ${cat.name}
                </span>
            `;
        }

        /**
         * Render Breadcrumb HTML
         * @param {string} moduleSlug 
         * @param {string} [pageTitle] 
         * @returns {string} HTML string
         */
        renderBreadcrumb(moduleSlug, pageTitle = '') {
            const cat = this.getCategory(moduleSlug);
            return `
                <nav class="clini-breadcrumb" aria-label="Breadcrumb" style="font-size: 0.85rem; color: var(--color-text-muted); margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
                    <a href="../../index.html" style="color: inherit; text-decoration: none;"><i class="fa-solid fa-house"></i> Trang chủ</a>
                    <span>/</span>
                    <a href="${cat.legacyPath || '#'}" style="color: var(--color-primary); text-decoration: none; font-weight: 600;">
                        <i class="fa-solid ${cat.icon}"></i> ${cat.name}
                    </a>
                    ${pageTitle ? `<span>/</span><span style="color: var(--color-text); font-weight: 500;">${pageTitle}</span>` : ''}
                </nav>
            `;
        }
    }

    // Singleton Export sang window.CliniCategoryMapper
    window.CliniCategoryMapper = new CategoryMapper();

    // Tự động khởi tạo ngay khi trang nạp xong
    document.addEventListener('DOMContentLoaded', () => {
        window.CliniCategoryMapper.init();
    });
})();
