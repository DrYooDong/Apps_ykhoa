/**
 * MedicalSearchEngine — Engine Tra cứu Ngữ cảnh Y khoa & Xếp hạng Ưu tiên (Inspired by Upstash Context7)
 * CliniPortal Medical Knowledge Ecosystem
 * 
 * Features:
 * 1. In-Memory & LocalStorage Caching (< 1ms search response).
 * 2. Category Tab Filtering (Tất cả, Phác đồ, Dược lý, Thang điểm, Sinh lý, Guidelines).
 * 3. Clinical Emergency Reranking: Tự động nâng điểm phác đồ Cấp cứu Red-Flag khi phát hiện từ khóa nguy kịch.
 * 4. Guideline Versioning & PubMed Link integration.
 */

(function (global) {
  'use strict';

  const STORAGE_KEY = 'cliniportal_medical_index_v1';
  const EMERGENCY_KEYWORDS = [
    'sốc', 'soc', 'hen cấp', 'hen cap', 'ngừng tuần hoàn', 'ngung tuan hoan', 
    'nhồi máu', 'nhoi mau', 'stemi', 'đột quỵ', 'dot quy', 'cấp cứu', 'cap cuu', 
    'anaphylaxis', 'phản vệ', 'phan ve', 'mất máu', 'mat mau', 'ngộ độc', 'ngo doc',
    'suy hô hấp', 'suy ho hap', 'tụt huyết áp', 'tut huyet ap', 'fast'
  ];

  function removeAccents(str) {
    if (!str) return '';
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D')
      .toLowerCase();
  }

  class MedicalSearchEngine {
    constructor() {
      this.index = [];
      this.isLoaded = false;
      this.loadingPromise = null;
    }

    /**
     * Khởi tạo và nạp dữ liệu chỉ mục
     * @param {string} basePath Đường dẫn tương đối từ vị trí trang hiện tại
     */
    async init(basePath = '') {
      if (this.isLoaded) return true;
      if (this.loadingPromise) return this.loadingPromise;

      this.loadingPromise = (async () => {
        try {
          // 1. Thử lấy dữ liệu từ localStorage để đạt tốc độ < 1ms
          const cached = localStorage.getItem(STORAGE_KEY);
          if (cached) {
            try {
              this.index = JSON.parse(cached);
              this.isLoaded = true;
              // Fetch ngầm để cập nhật cache nếu có dữ liệu mới
              this.fetchAndUpdateCache(basePath);
              return true;
            } catch (e) {
              console.warn('[MedicalSearchEngine] Cache hỏng, tải lại từ file:', e);
            }
          }

          // 2. Tải trực tiếp tệp json
          await this.fetchAndUpdateCache(basePath);
          return true;
        } catch (err) {
          console.error('[MedicalSearchEngine] Không thể nạp medical-index.json:', err);
          return false;
        }
      })();

      return this.loadingPromise;
    }

    async fetchAndUpdateCache(basePath = '') {
      const url = basePath + 'js/data/medical-index.json';
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      this.index = data;
      this.isLoaded = true;
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch (e) {
        /* Quản lý vượt dung lượng localStorage nếu có */
      }
    }

    /**
     * Thực hiện tìm kiếm & Reranking lâm sàng
     * @param {string} query Từ khóa tìm kiếm
     * @param {string} category Filter tab ('all' | 'approach' | 'pharma' | 'tools' | 'physio' | 'guidelines')
     * @returns {Array} Kết quả đã sắp xếp theo điểm liên quan
     */
    search(query, category = 'all') {
      if (!query || !query.trim()) return [];
      const cleanQuery = query.trim().toLowerCase();
      const normQuery = removeAccents(cleanQuery);

      // Kiểm tra câu hỏi có chứa từ khóa cấp cứu nguy kịch không
      const isEmergencyQuery = EMERGENCY_KEYWORDS.some(kw => normQuery.includes(removeAccents(kw)));

      const results = [];

      for (let i = 0; i < this.index.length; i++) {
        const item = this.index[i];

        // Lọc theo Tab Phân hệ
        if (category !== 'all' && item.category !== category) {
          continue;
        }

        let score = 0;
        const normTitle = removeAccents(item.title);
        const normSubtitle = removeAccents(item.subtitle || '');
        const normKeywords = (item.keywords || []).map(k => removeAccents(k));

        // 1. Tiêu đề (Weight cao nhất)
        if (normTitle.includes(normQuery)) {
          score += 20;
          if (normTitle.startsWith(normQuery)) score += 10;
        }

        // 2. Từ khóa đồng nghĩa / triệu chứng
        for (const kw of normKeywords) {
          if (kw.includes(normQuery)) {
            score += 12;
            break;
          }
        }

        // 3. Subtitle / Mô tả
        if (normSubtitle.includes(normQuery)) {
          score += 5;
        }

        // 4. Match Guideline version (e.g. GINA, ADA, ESC)
        if (item.guidelineVersion && removeAccents(item.guidelineVersion).includes(normQuery)) {
          score += 15;
        }

        // 🚨 CLINICAL EMERGENCY RERANKING BOOST
        // Nếu người dùng đang tìm kiếm từ khóa cấp cứu (sốc, hen cấp, nhồi máu...) 
        // và mục này là phác đồ Cấp cứu Red-Flag -> Nhân hệ số điểm vọt lên top 1!
        if (isEmergencyQuery && item.isEmergency) {
          score += 40;
        }

        if (score > 0) {
          results.push({
            ...item,
            _score: score,
            _isEmergencyMatch: isEmergencyQuery && item.isEmergency
          });
        }
      }

      // Sắp xếp kết quả theo tổng điểm giảm dần
      results.sort((a, b) => b._score - a._score);
      return results;
    }
  }

  // Global Export Singleton
  global.medicalSearchEngine = new MedicalSearchEngine();
})(typeof window !== 'undefined' ? window : this);
