/**
 * arrhythmia-engine.js
 * Multi-Axis Classification Engine cho module Rối loạn nhịp tim - CliniPortal
 * Thiết kế theo nguyên tắc Defensive Programming để giảm rủi ro lỗi khi tích hợp vào hệ sinh thái.
 */

const ArrhythmiaEngine = (() => {
    let db = null;
    let flowchartData = null;
    const REQUIRED_AXES = ["rate", "qrsWidth", "regularity", "mechanism", "origin", "structuralHeart"];

    async function safeFetchJSON(path) {
        try {
            const res = await fetch(path);
            if (!res.ok) {
                throw new Error(`HTTP ${res.status} khi tải ${path}`);
            }
            return await res.json();
        } catch (err) {
            console.error(`[ArrhythmiaEngine] Lỗi tải dữ liệu từ ${path}:`, err);
            return null;
        }
    }

    function validateDB(data) {
        const errors = [];
        if (!data || !Array.isArray(data.entities)) {
            errors.push("Dữ liệu DB rỗng hoặc thiếu trường 'entities'.");
            return errors;
        }
        if (!data.axes) {
            errors.push("Thiếu trường 'axes' định nghĩa các chiều phân loại.");
            return errors;
        }
        REQUIRED_AXES.forEach(axis => {
            if (!data.axes[axis]) errors.push(`Thiếu định nghĩa axis bắt buộc: '${axis}'`);
        });
        const seenIds = new Set();
        data.entities.forEach((e, idx) => {
            if (!e.id) { errors.push(`Entity tại index ${idx} thiếu 'id'.`); return; }
            if (seenIds.has(e.id)) errors.push(`Trùng id entity: '${e.id}'`);
            seenIds.add(e.id);
            if (!e.label) errors.push(`Entity '${e.id}' thiếu 'label'.`);
            if (!e.tags) { errors.push(`Entity '${e.id}' thiếu 'tags'.`); return; }
            Object.entries(e.tags).forEach(([axis, val]) => {
                if (!data.axes[axis]) {
                    errors.push(`Entity '${e.id}': axis '${axis}' không được định nghĩa trong 'axes'.`);
                } else if (!data.axes[axis].includes(val)) {
                    errors.push(`Entity '${e.id}': giá trị '${val}' không hợp lệ cho axis '${axis}'.`);
                }
            });
        });
        return errors;
    }

    async function init(dbPath, flowchartPath) {
        const rawDB = await safeFetchJSON(dbPath);
        const rawFlowchart = await safeFetchJSON(flowchartPath);

        if (!rawDB) {
            renderFatalError("Không thể tải cơ sở dữ liệu phân loại rối loạn nhịp. Vui lòng kiểm tra đường dẫn file JSON.");
            return false;
        }

        const validationErrors = validateDB(rawDB);
        if (validationErrors.length > 0) {
            console.warn("[ArrhythmiaEngine] Phát hiện lỗi cấu trúc dữ liệu:", validationErrors);
            renderValidationWarning(validationErrors);
        }

        db = rawDB;
        flowchartData = rawFlowchart;
        return true;
    }

    function renderFatalError(message) {
        const target = document.getElementById("arrhythmia-error-panel") || document.body;
        const div = document.createElement("div");
        div.className = "alert-banner alert-danger";
        div.style.cssText = "padding:12px;border-left:4px solid var(--color-danger, #dc2626);background:#fef2f2;margin:12px 0;";
        div.innerText = `⚠️ Lỗi hệ thống: ${message}`;
        target.prepend(div);
    }

    function renderValidationWarning(errors) {
        const target = document.getElementById("arrhythmia-error-panel");
        if (!target) return;
        const div = document.createElement("div");
        div.className = "alert-banner alert-warning";
        div.style.cssText = "padding:12px;border-left:4px solid var(--color-warning, #d97706);background:#fffbeb;margin:12px 0;";
        div.innerHTML = `<strong>Cảnh báo dữ liệu (${errors.length} vấn đề):</strong><ul>${errors.map(e => `<li>${e}</li>`).join("")}</ul>`;
        target.prepend(div);
    }

    /**
     * Lọc entities theo nhiều tiêu chí (multi-axis filter). An toàn với input null/undefined.
     */
    function filterByAxes(criteria = {}) {
        if (!db || !Array.isArray(db.entities)) return [];
        return db.entities.filter(entity => {
            if (!entity.tags) return false;
            return Object.entries(criteria).every(([axis, value]) => {
                if (value === undefined || value === null || value === "") return true;
                return entity.tags[axis] === value;
            });
        });
    }

    function getEntityById(id) {
        if (!db || !Array.isArray(db.entities)) return null;
        return db.entities.find(e => e.id === id) || null;
    }

    function getFlowchart() {
        return flowchartData || { nodes: [], edges: [] };
    }

    function getRarityLabel(rarityCode) {
        const map = {
            "common": "Thường gặp",
            "uncommon": "Không thường gặp",
            "rare": "Hiếm",
            "very-rare": "Rất hiếm"
        };
        return map[rarityCode] || "Không xác định";
    }

    return {
        init,
        filterByAxes,
        getEntityById,
        getFlowchart,
        getRarityLabel,
        validateDB
    };
})();

if (typeof module !== "undefined" && module.exports) {
    module.exports = ArrhythmiaEngine;
}
