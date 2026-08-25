/**
 * CliniPortal — Clinical Patient Context Bridge (ClinicalBridge)
 * 
 * Module quản lý & đồng bộ dữ liệu bệnh nhân giữa các ứng dụng Công cụ độc lập.
 * Tính năng chính:
 *   1. Patient Session Store (sessionStorage): Lưu và nạp thông số bệnh nhân dùng chung.
 *   2. Deep-linking / URL Parameter Parser: Nhận dữ liệu truyền qua URL query string.
 *   3. Smart Auto-fill Banner: Hiển thị banner gợi ý nạp dữ liệu thông minh.
 *   4. Quick Action Chips: Render các nút chuyển tiếp nhanh giữa các công cụ có liên quan lâm sàng.
 */

class ClinicalBridge {
    static STORAGE_KEY = 'cliniportal_patient_session';

    /**
     * Cập nhật thông số bệnh nhân vào Session hiện tại
     * @param {Object} partialContext Đối tượng chứa các thông số mới/cập nhật
     * @returns {Object} Context bệnh nhân hoàn chỉnh sau khi gộp
     */
    static updateSession(partialContext = {}) {
        if (!partialContext || typeof partialContext !== 'object') return this.getSession();
        
        const current = this.getSession();
        const updated = {
            ...current,
            ...partialContext,
            lastUpdated: new Date().toISOString()
        };

        try {
            sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(updated));
        } catch (e) {
            console.warn('[ClinicalBridge] Không thể lưu sessionStorage:', e);
        }

        return updated;
    }

    /**
     * Lấy dữ liệu phiên làm việc bệnh nhân hiện tại
     * @returns {Object}
     */
    static getSession() {
        try {
            const data = sessionStorage.getItem(this.STORAGE_KEY);
            return data ? JSON.parse(data) : {};
        } catch (e) {
            console.warn('[ClinicalBridge] Lỗi đọc sessionStorage:', e);
            return {};
        }
    }

    /** Xóa phiên làm việc bệnh nhân */
    static clearSession() {
        try {
            sessionStorage.removeItem(this.STORAGE_KEY);
        } catch (e) {
            console.warn('[ClinicalBridge] Lỗi xóa sessionStorage:', e);
        }
    }

    /**
     * Trích xuất tham số từ URL Query String
     * @returns {Object} Chứa các tham số dưới dạng key-value
     */
    static getQueryParams() {
        if (typeof window === 'undefined') return {};
        const params = new URLSearchParams(window.location.search);
        const result = {};
        for (const [key, value] of params.entries()) {
            // Tự động ép kiểu số nếu có thể
            result[key] = (value !== '' && !isNaN(value)) ? parseFloat(value) : value;
        }
        return result;
    }

    /**
     * Hiển thị Smart Auto-fill Banner nếu có dữ liệu bệnh nhân lưu từ công cụ trước
     * @param {Function} onApply Callback nhận đối tượng session khi người dùng bấm "Sử dụng"
     */
    static renderAutoFillBanner(onApply) {
        const session = this.getSession();
        if (!session || !session.lastUpdated) return;

        // Bỏ qua nếu banner đã tồn tại
        if (document.getElementById('clini-autofill-banner')) return;

        const banner = document.createElement('div');
        banner.id = 'clini-autofill-banner';
        banner.className = 'ab ab-info auto-fill-banner';
        banner.style.cssText = `
            margin-bottom: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 12px;
            background: rgba(13, 110, 253, 0.08);
            border: 1px solid var(--primary-color, #0d6efd);
            border-left: 5px solid var(--primary-color, #0d6efd);
            padding: 12px 16px;
            border-radius: 8px;
        `;

        const genderText = session.gender === 'male' ? 'Nam' : (session.gender === 'female' ? 'Nữ' : '');
        const ageText = session.age ? `${session.age} tuổi` : '';
        const weightText = session.weight ? `${session.weight} kg` : '';
        const crclText = session.cgResult ? `CrCl: ${session.cgResult.value} mL/min` : (session.crcl ? `CrCl: ${session.crcl} mL/min` : '');
        const egfrText = session.epiResult ? `eGFR: ${session.epiResult.value} mL/min/1.73m²` : '';

        const summaryParts = [genderText, ageText, weightText, crclText, egfrText].filter(Boolean).join(', ');

        banner.innerHTML = `
            <div style="font-size: 0.9rem; line-height: 1.4;">
                <strong style="color: var(--primary-color, #0d6efd);">⚡ Phát hiện thông số ca bệnh có sẵn:</strong> 
                <span>${summaryParts || 'Thông số ca bệnh từ công cụ trước'}</span>
            </div>
            <div style="display: flex; gap: 8px;">
                <button type="button" class="calc-btn" id="btn-apply-session" style="padding: 6px 14px; font-size: 0.85rem; background: var(--primary-color, #0d6efd); color: #fff; border: none; border-radius: 4px; cursor: pointer; font-weight: 600;">
                    ✓ Nhập dữ liệu này
                </button>
                <button type="button" id="btn-dismiss-session" style="padding: 6px 10px; font-size: 0.85rem; background: transparent; border: 1px solid var(--border-color, #ccc); color: var(--text-muted, #666); border-radius: 4px; cursor: pointer;">
                    ✕ Ẩn
                </button>
            </div>
        `;

        const targetContainer = document.querySelector('.main-wrapper') || document.body;
        const breadcrumb = targetContainer.querySelector('clini-breadcrumb') || targetContainer.firstChild;
        if (breadcrumb && breadcrumb.nextSibling) {
            targetContainer.insertBefore(banner, breadcrumb.nextSibling);
        } else {
            targetContainer.insertBefore(banner, targetContainer.firstChild);
        }

        document.getElementById('btn-apply-session').addEventListener('click', () => {
            if (typeof onApply === 'function') onApply(session);
            banner.remove();
        });

        document.getElementById('btn-dismiss-session').addEventListener('click', () => {
            banner.remove();
        });
    }

    /**
     * Render cụm nút Quick Action Chips chuyển tiếp nhanh sang các công cụ liên quan
     * @param {HTMLElement|string} containerTarget Element hoặc ID container
     * @param {Array<Object>} actions Danh sách các action [{ label, icon, url, params }]
     */
    static renderActionChips(containerTarget, actions = []) {
        const container = typeof containerTarget === 'string' 
            ? document.getElementById(containerTarget) 
            : containerTarget;
            
        if (!container || !actions || actions.length === 0) return;

        let chipsWrapper = container.querySelector('.clinical-action-chips');
        if (!chipsWrapper) {
            chipsWrapper = document.createElement('div');
            chipsWrapper.className = 'clinical-action-chips';
            chipsWrapper.style.cssText = `
                margin-top: 16px;
                padding-top: 12px;
                border-top: 1px dashed var(--border-color, #e9ecef);
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
                align-items: center;
            `;
            container.appendChild(chipsWrapper);
        }

        const currentSession = this.getSession();

        chipsWrapper.innerHTML = `
            <div style="width: 100%; font-size: 0.82rem; font-weight: 700; color: var(--text-muted, #6c757d); margin-bottom: 4px;">
                🔗 ĐIỀU HƯỚNG LÂM SÀNG LIÊN QUAN:
            </div>
            ${actions.map(act => {
                // Gộp params mặc định của action với params lấy từ session hiện tại
                const queryParams = new URLSearchParams();
                const mergedParams = {
                    age: currentSession.age,
                    gender: currentSession.gender,
                    weight: currentSession.weight || currentSession.calcWeight,
                    height: currentSession.height,
                    crcl: currentSession.cgResult ? currentSession.cgResult.value : currentSession.crcl,
                    egfr: currentSession.epiResult ? currentSession.epiResult.value : currentSession.egfr,
                    scr: currentSession.scrMgDl,
                    ...(act.params || {})
                };

                for (const [k, v] of Object.entries(mergedParams)) {
                    if (v !== undefined && v !== null && v !== '') {
                        queryParams.set(k, v);
                    }
                }

                const targetUrl = `${act.url}?${queryParams.toString()}`;

                return `
                    <a href="${targetUrl}" class="chip-btn" style="
                        display: inline-flex;
                        align-items: center;
                        gap: 6px;
                        padding: 6px 12px;
                        background: var(--bg-light, #f8f9fa);
                        border: 1px solid var(--border-color, #dee2e6);
                        border-radius: 20px;
                        color: var(--primary-color, #0d6efd);
                        font-size: 0.85rem;
                        font-weight: 600;
                        text-decoration: none;
                        transition: all 0.2s ease;
                    " onmouseover="this.style.background='var(--primary-color, #0d6efd)'; this.style.color='#fff';" onmouseout="this.style.background='var(--bg-light, #f8f9fa)'; this.style.color='var(--primary-color, #0d6efd)';">
                        <span>${act.icon || '⚙️'}</span>
                        <span>${act.label}</span>
                    </a>
                `;
            }).join('')}
        `;
    }
}

// Global Export
if (typeof window !== 'undefined') {
    window.ClinicalBridge = ClinicalBridge;
}
