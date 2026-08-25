/**
 * CliniPortal — Clinical Calculator Base Engine
 * 
 * Bộ khung chuẩn hóa các công cụ tính toán & hỗ trợ ra quyết định lâm sàng (Clinical Calculators).
 * Tự động hóa quá trình kiểm tra dữ liệu đầu vào (Validation), tính toán, diễn giải kết quả,
 * và tích hợp tự động lưu vết nhật ký vào CliniStorage (IndexedDB).
 * 
 * @module ClinicalCalculatorEngine
 */

(function () {
    'use strict';

    class ClinicalCalculatorEngine {
        /**
         * Kiểm tra dữ liệu vào theo định nghĩa trường (Field Definitions)
         * @param {Object} inputs - Giá trị người dùng nhập
         * @param {Array} fields - Danh sách quy định [{ id, name, min, max, required, unit }]
         * @returns {Object} { isValid: boolean, errors: Array }
         */
        static validateInputs(inputs, fields) {
            const errors = [];
            if (!fields || !Array.isArray(fields)) return { isValid: true, errors: [] };

            for (const field of fields) {
                const val = inputs[field.id];

                if (field.required && (val === undefined || val === null || val === '')) {
                    errors.push(`Vui lòng nhập thông số: ${field.name || field.id}`);
                    continue;
                }

                if (val !== undefined && val !== null && val !== '') {
                    const num = Number(val);
                    if (isNaN(num)) {
                        errors.push(`${field.name || field.id} phải là một số hợp lệ`);
                    } else {
                        if (field.min !== undefined && num < field.min) {
                            errors.push(`${field.name || field.id} phải ≥ ${field.min} ${field.unit || ''}`);
                        }
                        if (field.max !== undefined && num > field.max) {
                            errors.push(`${field.name || field.id} phải ≤ ${field.max} ${field.unit || ''}`);
                        }
                    }
                }
            }

            return {
                isValid: errors.length === 0,
                errors
            };
        }

        /**
         * Thực thi tính toán lâm sàng một cách an toàn và lưu vết tự động
         * 
         * @param {Object} config - Cấu hình công cụ tính toán
         * @param {string} config.toolId - Mã công cụ (ví dụ: 'egfr-ckdepi', 'abg-interpreter')
         * @param {string} config.toolName - Tên công cụ
         * @param {string} config.category - Chuyên khoa / Phân loại
         * @param {Array} [config.fields] - Quy định kiểm tra đầu vào
         * @param {Function} config.calculateFn - Hàm logic thực hiện tính toán ({ inputs }) => { outputs, interpretation, recommendations }
         * @param {Object} rawInputs - Dữ liệu người dùng nhập vào
         * @param {Object} [options] - Cấu hình thêm (patientRef, note, autoSave)
         * @returns {Promise<Object>} Formatted result object
         */
        static async execute(config, rawInputs, options = {}) {
            const autoSave = options.autoSave !== false;

            // 1. Validation
            const validation = this.validateInputs(rawInputs, config.fields);
            if (!validation.isValid) {
                return {
                    success: false,
                    toolId: config.toolId,
                    toolName: config.toolName,
                    errors: validation.errors
                };
            }

            try {
                // 2. Logic Execution
                const calcResult = await config.calculateFn(rawInputs);

                const finalResult = {
                    success: true,
                    toolId: config.toolId,
                    toolName: config.toolName || 'Công cụ lâm sàng',
                    category: config.category || 'Nội khoa',
                    inputs: rawInputs,
                    outputs: calcResult.outputs || {},
                    interpretation: calcResult.interpretation || '',
                    recommendations: calcResult.recommendations || [],
                    patientRef: options.patientRef || '',
                    note: options.note || '',
                    timestamp: new Date().toISOString()
                };

                // 3. Auto-save to CliniStorage
                if (autoSave && window.CliniStorage) {
                    try {
                        const recordId = await window.CliniStorage.saveCalculation({
                            toolId: finalResult.toolId,
                            toolName: finalResult.toolName,
                            category: finalResult.category,
                            inputs: finalResult.inputs,
                            outputs: finalResult.outputs,
                            interpretation: finalResult.interpretation,
                            recommendations: finalResult.recommendations,
                            patientRef: finalResult.patientRef,
                            note: finalResult.note,
                            timestamp: finalResult.timestamp
                        });
                        finalResult.recordId = recordId;
                    } catch (err) {
                        console.warn('ClinicalCalculatorEngine: Lỗi khi lưu vào CliniStorage', err);
                    }
                }

                return finalResult;
            } catch (error) {
                console.error(`ClinicalCalculatorEngine [${config.toolId}]: Lỗi tính toán`, error);
                return {
                    success: false,
                    toolId: config.toolId,
                    toolName: config.toolName,
                    errors: [`Lỗi tính toán hệ thống: ${error.message || 'Không xác định'}`]
                };
            }
        }

        /**
         * Render badge khuyến cáo lâm sàng với màu sắc tương ứng
         * @param {string} severity - 'info' | 'success' | 'warning' | 'danger'
         * @param {string} text - Nội dung khuyến cáo
         * @returns {string} HTML string
         */
        static renderRecommendationBadge(severity, text) {
            const colorMap = {
                info: 'var(--color-info, #0284c7)',
                success: 'var(--color-success, #10b981)',
                warning: 'var(--color-warning, #f59e0b)',
                danger: 'var(--color-danger, #ef4444)'
            };
            const bgMap = {
                info: 'rgba(2, 132, 199, 0.1)',
                success: 'rgba(16, 185, 129, 0.1)',
                warning: 'rgba(245, 158, 11, 0.1)',
                danger: 'rgba(239, 68, 68, 0.1)'
            };

            const color = colorMap[severity] || colorMap.info;
            const bg = bgMap[severity] || bgMap.info;

            return `
                <div style="background: ${bg}; border-left: 4px solid ${color}; color: var(--color-text); padding: 0.75rem 1rem; border-radius: var(--radius-sm, 6px); margin-top: 0.5rem; font-size: 0.9rem;">
                    <strong><i class="fa-solid fa-stethoscope" style="color: ${color}; margin-right: 0.4rem;"></i> Khuyến cáo:</strong> ${text}
                </div>
            `;
        }
    }

    // Export Engine
    window.ClinicalCalculatorEngine = ClinicalCalculatorEngine;
})();
