/**
 * CliniPortal — Calculation History Modal Component
 * 
 * Component hiển thị & quản lý nhật ký tính toán lâm sàng offline.
 * Cho phép xem lại lịch sử, lọc tìm kiếm, xóa bản ghi và xuất báo cáo.
 * 
 * @module CalculationHistoryModal
 */

(function () {
    'use strict';

    class CalculationHistoryModal {
        constructor() {
            this.modalElement = null;
            this.isOpen = false;
            this.historyData = [];
            this._injectStyles();
        }

        _injectStyles() {
            if (document.getElementById('calc-history-modal-styles')) return;

            const css = `
                .calc-history-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(15, 23, 42, 0.65);
                    backdrop-filter: blur(4px);
                    z-index: 9999;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    opacity: 0;
                    visibility: hidden;
                    transition: all 0.25s ease-in-out;
                    padding: 1rem;
                }
                .calc-history-overlay.active {
                    opacity: 1;
                    visibility: visible;
                }
                .calc-history-modal {
                    background: var(--color-surface, #ffffff);
                    color: var(--color-text, #1e293b);
                    width: 100%;
                    max-width: 800px;
                    max-height: 85vh;
                    border-radius: var(--radius-lg, 12px);
                    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                    border: 1px solid var(--color-border, #e2e8f0);
                }
                .calc-history-header {
                    padding: 1.25rem 1.5rem;
                    border-bottom: 1px solid var(--color-border, #e2e8f0);
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    background: var(--color-bg, #f8fafc);
                }
                .calc-history-title {
                    font-size: 1.15rem;
                    font-weight: 700;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: var(--color-primary, #0284c7);
                }
                .calc-history-close {
                    background: transparent;
                    border: none;
                    font-size: 1.25rem;
                    color: var(--color-text-muted, #64748b);
                    cursor: pointer;
                    padding: 0.25rem 0.5rem;
                    border-radius: 4px;
                    transition: color 0.15s;
                }
                .calc-history-close:hover {
                    color: var(--color-danger, #ef4444);
                }
                .calc-history-toolbar {
                    padding: 0.75rem 1.5rem;
                    border-bottom: 1px solid var(--color-border, #e2e8f0);
                    display: flex;
                    gap: 0.75rem;
                    align-items: center;
                    flex-wrap: wrap;
                    background: var(--color-surface, #ffffff);
                }
                .calc-history-search {
                    flex: 1;
                    min-width: 200px;
                    padding: 0.5rem 0.75rem;
                    border-radius: var(--radius-sm, 6px);
                    border: 1px solid var(--color-border, #cbd5e1);
                    background: var(--color-bg, #f8fafc);
                    color: var(--color-text, #1e293b);
                    font-size: 0.875rem;
                }
                .calc-history-body {
                    padding: 1.25rem 1.5rem;
                    overflow-y: auto;
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }
                .calc-history-card {
                    background: var(--color-bg, #f8fafc);
                    border: 1px solid var(--color-border, #e2e8f0);
                    border-radius: var(--radius-md, 8px);
                    padding: 1rem;
                    transition: transform 0.15s ease, box-shadow 0.15s ease;
                }
                .calc-history-card:hover {
                    box-shadow: var(--shadow-sm, 0 1px 3px rgba(0,0,0,0.1));
                }
                .calc-card-head {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 0.5rem;
                }
                .calc-card-toolname {
                    font-weight: 700;
                    font-size: 1rem;
                    color: var(--color-primary, #0284c7);
                }
                .calc-card-time {
                    font-size: 0.75rem;
                    color: var(--color-text-muted, #64748b);
                }
                .calc-card-outputs {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                    margin: 0.5rem 0;
                }
                .calc-output-pill {
                    background: var(--color-surface, #ffffff);
                    border: 1px solid var(--color-border, #cbd5e1);
                    padding: 0.25rem 0.6rem;
                    border-radius: 20px;
                    font-size: 0.825rem;
                    font-weight: 600;
                }
                .calc-card-interp {
                    font-size: 0.875rem;
                    color: var(--color-text, #334155);
                    margin-top: 0.4rem;
                }
                .calc-card-actions {
                    display: flex;
                    justify-content: flex-end;
                    gap: 0.5rem;
                    margin-top: 0.5rem;
                }
                .calc-btn {
                    padding: 0.4rem 0.75rem;
                    font-size: 0.8rem;
                    border-radius: var(--radius-sm, 6px);
                    border: 1px solid var(--color-border, #cbd5e1);
                    background: var(--color-surface, #ffffff);
                    color: var(--color-text, #1e293b);
                    cursor: pointer;
                    display: inline-flex;
                    align-items: center;
                    gap: 0.35rem;
                    font-weight: 500;
                    transition: all 0.15s ease;
                }
                .calc-btn:hover {
                    background: var(--color-bg, #f1f5f9);
                }
                .calc-btn-danger {
                    color: var(--color-danger, #ef4444);
                    border-color: rgba(239, 68, 68, 0.3);
                }
                .calc-btn-danger:hover {
                    background: rgba(239, 68, 68, 0.1);
                }
                .calc-empty-state {
                    text-align: center;
                    padding: 3rem 1rem;
                    color: var(--color-text-muted, #64748b);
                }
                .calc-empty-state i {
                    font-size: 2.5rem;
                    margin-bottom: 0.75rem;
                    opacity: 0.6;
                }
            `;
            const styleEl = document.createElement('style');
            styleEl.id = 'calc-history-modal-styles';
            styleEl.textContent = css;
            document.head.appendChild(styleEl);
        }

        _buildDOM() {
            if (this.modalElement) return;

            const modalHTML = `
                <div class="calc-history-overlay" id="calc-history-modal-overlay">
                    <div class="calc-history-modal" role="dialog" aria-labelledby="calc-history-title">
                        <div class="calc-history-header">
                            <div class="calc-history-title" id="calc-history-title">
                                <i class="fa-solid fa-clock-rotate-left"></i> Nhật Ký Tính Toán Lâm Sàng
                            </div>
                            <button class="calc-history-close" id="calc-history-close-btn" title="Đóng">
                                <i class="fa-solid fa-xmark"></i>
                            </button>
                        </div>
                        <div class="calc-history-toolbar">
                            <input type="text" class="calc-history-search" id="calc-history-search-input" placeholder="Tìm kiếm theo công cụ, kết quả..." />
                            <button class="calc-btn" id="calc-history-export-btn">
                                <i class="fa-solid fa-file-export"></i> Xuất JSON
                            </button>
                            <button class="calc-btn calc-btn-danger" id="calc-history-clear-btn">
                                <i class="fa-solid fa-trash-can"></i> Xóa tất cả
                            </button>
                        </div>
                        <div class="calc-history-body" id="calc-history-body-container">
                            <!-- Records rendered here -->
                        </div>
                    </div>
                </div>
            `;

            const container = document.createElement('div');
            container.innerHTML = modalHTML;
            this.modalElement = container.firstElementChild;
            document.body.appendChild(this.modalElement);

            // Bind events
            this.modalElement.querySelector('#calc-history-close-btn').addEventListener('click', () => this.close());
            this.modalElement.addEventListener('click', (e) => {
                if (e.target === this.modalElement) this.close();
            });

            this.modalElement.querySelector('#calc-history-search-input').addEventListener('input', (e) => {
                this._renderRecords(e.target.value);
            });

            this.modalElement.querySelector('#calc-history-clear-btn').addEventListener('click', async () => {
                if (confirm('Bạn có chắc chắn muốn xóa toàn bộ lịch sử tính toán không?')) {
                    if (window.CliniStorage) {
                        await window.CliniStorage.clearCalculationHistory();
                        await this.loadAndRender();
                    }
                }
            });

            this.modalElement.querySelector('#calc-history-export-btn').addEventListener('click', () => {
                this.exportJSON();
            });
        }

        async open() {
            this._buildDOM();
            await this.loadAndRender();
            this.modalElement.classList.add('active');
            this.isOpen = true;
        }

        close() {
            if (this.modalElement) {
                this.modalElement.classList.remove('active');
            }
            this.isOpen = false;
        }

        async loadAndRender() {
            if (window.CliniStorage) {
                this.historyData = await window.CliniStorage.getCalculationHistory({ limit: 100 });
            } else {
                this.historyData = [];
            }
            const searchVal = this.modalElement ? this.modalElement.querySelector('#calc-history-search-input').value : '';
            this._renderRecords(searchVal);
        }

        _renderRecords(filterQuery = '') {
            const bodyContainer = this.modalElement.querySelector('#calc-history-body-container');
            const q = filterQuery.toLowerCase().trim();

            const filtered = this.historyData.filter(item => {
                if (!q) return true;
                const toolMatch = (item.toolName || '').toLowerCase().includes(q);
                const interpMatch = (item.interpretation || '').toLowerCase().includes(q);
                const catMatch = (item.category || '').toLowerCase().includes(q);
                return toolMatch || interpMatch || catMatch;
            });

            if (filtered.length === 0) {
                bodyContainer.innerHTML = `
                    <div class="calc-empty-state">
                        <i class="fa-solid fa-calculator"></i>
                        <p>${q ? 'Không tìm thấy kết quả tính toán phù hợp.' : 'Chưa có nhật ký tính toán nào được lưu.'}</p>
                    </div>
                `;
                return;
            }

            bodyContainer.innerHTML = filtered.map(item => {
                const dateStr = item.timestamp ? new Date(item.timestamp).toLocaleString('vi-VN') : 'Mới đây';
                
                // Formatted Outputs
                let outputsHTML = '';
                if (item.outputs && typeof item.outputs === 'object') {
                    outputsHTML = Object.entries(item.outputs).map(([k, v]) => {
                        const valText = typeof v === 'object' ? `${v.value || ''} ${v.unit || ''}` : v;
                        return `<span class="calc-output-pill"><strong>${k}:</strong> ${valText}</span>`;
                    }).join('');
                }

                return `
                    <div class="calc-history-card">
                        <div class="calc-card-head">
                            <div>
                                <span class="calc-card-toolname">${item.toolName || item.toolId}</span>
                                <span style="font-size:0.75rem; background:var(--color-border,#e2e8f0); padding:0.1rem 0.4rem; border-radius:4px; margin-left:0.5rem;">${item.category || 'Công cụ'}</span>
                            </div>
                            <span class="calc-card-time"><i class="fa-regular fa-clock"></i> ${dateStr}</span>
                        </div>
                        ${outputsHTML ? `<div class="calc-card-outputs">${outputsHTML}</div>` : ''}
                        ${item.interpretation ? `<div class="calc-card-interp"><strong>Diễn giải:</strong> ${item.interpretation}</div>` : ''}
                        <div class="calc-card-actions">
                            <button class="calc-btn calc-btn-danger delete-item-btn" data-id="${item.id}">
                                <i class="fa-solid fa-trash"></i> Xóa
                            </button>
                        </div>
                    </div>
                `;
            }).join('');

            // Bind single delete buttons
            bodyContainer.querySelectorAll('.delete-item-btn').forEach(btn => {
                btn.addEventListener('click', async (e) => {
                    const id = Number(e.currentTarget.getAttribute('data-id'));
                    if (id && window.CliniStorage) {
                        await window.CliniStorage.deleteCalculation(id);
                        await this.loadAndRender();
                    }
                });
            });
        }

        exportJSON() {
            if (!this.historyData || this.historyData.length === 0) {
                alert('Không có dữ liệu nhật ký để xuất!');
                return;
            }
            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.historyData, null, 2));
            const downloadAnchor = document.createElement('a');
            downloadAnchor.setAttribute("href", dataStr);
            downloadAnchor.setAttribute("download", `nhat-ky-tinh-toan-cliniportal-${new Date().toISOString().slice(0,10)}.json`);
            document.body.appendChild(downloadAnchor);
            downloadAnchor.click();
            downloadAnchor.remove();
        }
    }

    // Singleton export
    window.CalculationHistoryModal = new CalculationHistoryModal();
})();
