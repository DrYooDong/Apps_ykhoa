/**
 * CliniPortal — Storage Service (IndexedDB Engine with LocalStorage Fallback)
 * 
 * Bộ quản lý lưu trữ offline cho CliniPortal:
 * - calculation_history: Nhật ký tính toán lâm sàng
 * - bookmarks: Danh sách yêu thích / bookmark các bài viết & công cụ
 * - personal_notes: Ghi chú cá nhân y khoa
 * - user_preferences: Cấu hình giao diện và ứng dụng
 * 
 * @module StorageService
 */

(function () {
    'use strict';

    const DB_NAME = 'CliniPortalDB';
    const DB_VERSION = 1;

    class StorageService {
        constructor() {
            this.db = null;
            this.isIndexedDBSupported = 'indexedDB' in window;
            this.initPromise = null;
        }

        /**
         * Khởi tạo kết nối IndexedDB database
         * @returns {Promise<StorageService>}
         */
        async init() {
            if (this.initPromise) return this.initPromise;

            this.initPromise = new Promise((resolve) => {
                if (!this.isIndexedDBSupported) {
                    console.warn('StorageService: IndexedDB không được hỗ trợ. Chuyển sang fallback LocalStorage.');
                    resolve(this);
                    return;
                }

                try {
                    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

                    request.onerror = (event) => {
                        console.warn('StorageService: Không thể mở IndexedDB, dùng LocalStorage fallback.', event.target.error);
                        this.isIndexedDBSupported = false;
                        resolve(this);
                    };

                    request.onsuccess = (event) => {
                        this.db = event.target.result;
                        console.log('StorageService: Kết nối IndexedDB thành công.');
                        resolve(this);
                    };

                    request.onupgradeneeded = (event) => {
                        const db = event.target.result;

                        // 1. Nhật ký tính toán (calculation_history)
                        if (!db.objectStoreNames.contains('calculation_history')) {
                            const calcStore = db.createObjectStore('calculation_history', { keyPath: 'id', autoIncrement: true });
                            calcStore.createIndex('toolId', 'toolId', { unique: false });
                            calcStore.createIndex('timestamp', 'timestamp', { unique: false });
                        }

                        // 2. Bookmarks / Yêu thích
                        if (!db.objectStoreNames.contains('bookmarks')) {
                            const bmStore = db.createObjectStore('bookmarks', { keyPath: 'id' });
                            bmStore.createIndex('module', 'module', { unique: false });
                            bmStore.createIndex('timestamp', 'timestamp', { unique: false });
                        }

                        // 3. Ghi chú cá nhân (personal_notes)
                        if (!db.objectStoreNames.contains('personal_notes')) {
                            const noteStore = db.createObjectStore('personal_notes', { keyPath: 'id', autoIncrement: true });
                            noteStore.createIndex('pageUrl', 'pageUrl', { unique: false });
                            noteStore.createIndex('timestamp', 'timestamp', { unique: false });
                        }

                        // 4. Cấu hình người dùng (user_preferences)
                        if (!db.objectStoreNames.contains('user_preferences')) {
                            db.createObjectStore('user_preferences', { keyPath: 'key' });
                        }
                    };
                } catch (e) {
                    console.warn('StorageService: Ngoại lệ khi mở IndexedDB.', e);
                    this.isIndexedDBSupported = false;
                    resolve(this);
                }
            });

            return this.initPromise;
        }

        // ============================================================================
        // 1. NHẬT KÝ TÍNH TOÁN LÂM SÀNG (Calculation History)
        // ============================================================================

        /**
         * Lưu một kết quả tính toán vào nhật ký
         * @param {Object} data - Thông tin tính toán
         * @returns {Promise<number>} ID bản ghi
         */
        async saveCalculation(data) {
            await this.init();
            const record = {
                toolId: data.toolId || 'unknown',
                toolName: data.toolName || 'Công cụ lâm sàng',
                category: data.category || 'Chung',
                inputs: data.inputs || {},
                outputs: data.outputs || {},
                interpretation: data.interpretation || '',
                recommendations: data.recommendations || [],
                patientRef: data.patientRef || '',
                note: data.note || '',
                timestamp: data.timestamp || new Date().toISOString()
            };

            if (this.db) {
                return new Promise((resolve, reject) => {
                    const tx = this.db.transaction(['calculation_history'], 'readwrite');
                    const store = tx.objectStore('calculation_history');
                    const req = store.add(record);
                    req.onsuccess = () => resolve(req.result);
                    req.onerror = () => reject(req.error);
                });
            } else {
                // Fallback LocalStorage
                const history = this._getLS('cliniportal_calc_history', []);
                record.id = Date.now();
                history.unshift(record);
                // Giới hạn 200 bản ghi nếu dùng localStorage
                if (history.length > 200) history.pop();
                this._setLS('cliniportal_calc_history', history);
                return record.id;
            }
        }

        /**
         * Lấy danh sách nhật ký tính toán (Sắp xếp mới nhất trước)
         * @param {Object} [options] - Lọc theo toolId hoặc limit
         * @returns {Promise<Array>}
         */
        async getCalculationHistory(options = {}) {
            await this.init();
            const limit = options.limit || 50;

            if (this.db) {
                return new Promise((resolve, reject) => {
                    const tx = this.db.transaction(['calculation_history'], 'readonly');
                    const store = tx.objectStore('calculation_history');
                    const index = store.index('timestamp');
                    const request = index.openCursor(null, 'prev'); // Mới nhất lên trước
                    const results = [];

                    request.onsuccess = (event) => {
                        const cursor = event.target.result;
                        if (cursor && results.length < limit) {
                            if (!options.toolId || cursor.value.toolId === options.toolId) {
                                results.push(cursor.value);
                            }
                            cursor.continue();
                        } else {
                            resolve(results);
                        }
                    };
                    request.onerror = () => reject(request.error);
                });
            } else {
                let history = this._getLS('cliniportal_calc_history', []);
                if (options.toolId) {
                    history = history.filter(item => item.toolId === options.toolId);
                }
                return history.slice(0, limit);
            }
        }

        /**
         * Xóa một bản ghi tính toán theo ID
         * @param {number} id 
         */
        async deleteCalculation(id) {
            await this.init();
            if (this.db) {
                return new Promise((resolve, reject) => {
                    const tx = this.db.transaction(['calculation_history'], 'readwrite');
                    const store = tx.objectStore('calculation_history');
                    const req = store.delete(id);
                    req.onsuccess = () => resolve(true);
                    req.onerror = () => reject(req.error);
                });
            } else {
                let history = this._getLS('cliniportal_calc_history', []);
                history = history.filter(item => item.id !== id);
                this._setLS('cliniportal_calc_history', history);
                return true;
            }
        }

        /**
         * Xóa toàn bộ nhật ký tính toán
         */
        async clearCalculationHistory() {
            await this.init();
            if (this.db) {
                return new Promise((resolve, reject) => {
                    const tx = this.db.transaction(['calculation_history'], 'readwrite');
                    const store = tx.objectStore('calculation_history');
                    const req = store.clear();
                    req.onsuccess = () => resolve(true);
                    req.onerror = () => reject(req.error);
                });
            } else {
                this._setLS('cliniportal_calc_history', []);
                return true;
            }
        }

        // ============================================================================
        // 2. BOOKMARKS / YÊU THÍCH (Bookmarks & Favorites)
        // ============================================================================

        /**
         * Thêm hoặc xóa một Bookmark
         * @param {Object} item - { id, title, url, category, module }
         * @returns {Promise<boolean>} State sau khi toggle (true: đã lưu, false: đã bỏ lưu)
         */
        async toggleBookmark(item) {
            await this.init();
            if (!item || !item.id) return false;

            const isCurrentlyBookmarked = await this.isBookmarked(item.id);

            if (this.db) {
                return new Promise((resolve, reject) => {
                    const tx = this.db.transaction(['bookmarks'], 'readwrite');
                    const store = tx.objectStore('bookmarks');
                    if (isCurrentlyBookmarked) {
                        const req = store.delete(item.id);
                        req.onsuccess = () => resolve(false);
                        req.onerror = () => reject(req.error);
                    } else {
                        const record = {
                            id: item.id,
                            title: item.title || item.name || 'Trang y khoa',
                            url: item.url || '',
                            category: item.category || 'General',
                            module: item.module || 'general',
                            timestamp: new Date().toISOString()
                        };
                        const req = store.put(record);
                        req.onsuccess = () => resolve(true);
                        req.onerror = () => reject(req.error);
                    }
                });
            } else {
                let favorites = this._getLS('cliniportal_favorite_tools', []);
                let newState = false;
                if (favorites.includes(item.id)) {
                    favorites = favorites.filter(id => id !== item.id);
                    newState = false;
                } else {
                    favorites.push(item.id);
                    newState = true;
                }
                this._setLS('cliniportal_favorite_tools', favorites);
                return newState;
            }
        }

        /**
         * Kiểm tra xem ID có được bookmark không
         * @param {string} id 
         * @returns {Promise<boolean>}
         */
        async isBookmarked(id) {
            await this.init();
            if (!id) return false;

            if (this.db) {
                return new Promise((resolve) => {
                    const tx = this.db.transaction(['bookmarks'], 'readonly');
                    const store = tx.objectStore('bookmarks');
                    const req = store.get(id);
                    req.onsuccess = () => resolve(!!req.result);
                    req.onerror = () => resolve(false);
                });
            } else {
                const favorites = this._getLS('cliniportal_favorite_tools', []);
                return favorites.includes(id);
            }
        }

        /**
         * Lấy danh sách toàn bộ Bookmarks
         * @returns {Promise<Array>}
         */
        async getBookmarks(moduleFilter = null) {
            await this.init();
            if (this.db) {
                return new Promise((resolve, reject) => {
                    const tx = this.db.transaction(['bookmarks'], 'readonly');
                    const store = tx.objectStore('bookmarks');
                    const req = store.getAll();
                    req.onsuccess = () => {
                        let list = req.result || [];
                        if (moduleFilter) {
                            list = list.filter(item => item.module === moduleFilter);
                        }
                        resolve(list);
                    };
                    req.onerror = () => reject(req.error);
                });
            } else {
                const favorites = this._getLS('cliniportal_favorite_tools', []);
                return favorites.map(id => ({ id, title: id }));
            }
        }

        // ============================================================================
        // 3. GHI CHÚ CÁ NHÂN (Personal Notes)
        // ============================================================================

        /**
         * Lưu một ghi chú cá nhân
         * @param {string} pageUrl 
         * @param {string} content 
         * @param {string} [title] 
         */
        async saveNote(pageUrl, content, title = '') {
            await this.init();
            const record = {
                pageUrl,
                content,
                title: title || 'Ghi chú y khoa',
                timestamp: new Date().toISOString()
            };

            if (this.db) {
                return new Promise((resolve, reject) => {
                    const tx = this.db.transaction(['personal_notes'], 'readwrite');
                    const store = tx.objectStore('personal_notes');
                    const req = store.add(record);
                    req.onsuccess = () => resolve(req.result);
                    req.onerror = () => reject(req.error);
                });
            } else {
                const notes = this._getLS('cliniportal_personal_notes', []);
                record.id = Date.now();
                notes.unshift(record);
                this._setLS('cliniportal_personal_notes', notes);
                return record.id;
            }
        }

        /**
         * Lấy danh sách ghi chú theo trang hoặc tất cả
         */
        async getNotes(pageUrl = null) {
            await this.init();
            if (this.db) {
                return new Promise((resolve, reject) => {
                    const tx = this.db.transaction(['personal_notes'], 'readonly');
                    const store = tx.objectStore('personal_notes');
                    const req = store.getAll();
                    req.onsuccess = () => {
                        let list = req.result || [];
                        if (pageUrl) {
                            list = list.filter(n => n.pageUrl === pageUrl);
                        }
                        resolve(list);
                    };
                    req.onerror = () => reject(req.error);
                });
            } else {
                let notes = this._getLS('cliniportal_personal_notes', []);
                if (pageUrl) {
                    notes = notes.filter(n => n.pageUrl === pageUrl);
                }
                return notes;
            }
        }

        // ============================================================================
        // 4. CẤU HÌNH & HELPER LOCALSTORAGE FALLBACK
        // ============================================================================

        _getLS(key, defaultValue) {
            try {
                const val = localStorage.getItem(key);
                return val ? JSON.parse(val) : defaultValue;
            } catch (e) {
                return defaultValue;
            }
        }

        _setLS(key, value) {
            try {
                localStorage.setItem(key, JSON.stringify(value));
            } catch (e) {
                console.error('StorageService: Lỗi ghi LocalStorage', e);
            }
        }
    }

    // Export Singleton instance sang window.CliniStorage
    window.CliniStorage = new StorageService();
})();
