/**
 * CliniPortal — Data Synchronization & Cross-Module Linkage Engine
 * File: js/cliniportal-sync.js
 * 
 * Quản lý đồng bộ dữ liệu thời gian thực giữa phân hệ Guidelines & EBM Hub,
 * đồng thời cung cấp ma trận liên kết 2 chiều giữa 4 Module y khoa lâm sàng.
 */

(function () {
  'use strict';

  // Key lưu trữ localStorage duy nhất của phân hệ Guidelines
  const STORAGE_KEY = 'internalMedicineStudies';
  const EVENT_NAME = 'cliniportal:guidelines-updated';

  // Khởi tạo namespace toàn cục CliniPortalSync
  const CliniPortalSync = {
    /**
     * Lấy toàn bộ danh sách Guidelines hiện có (LocalStorage -> Dynamic fallback)
     * @returns {Array} Danh sách các nghiên cứu / khuyến cáo
     */
    getStudies: function () {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed;
          }
        }
      } catch (e) {
        console.error('[CliniPortalSync] Lỗi đọc localStorage:', e);
      }

      // Fallback nếu window.SAMPLE_STUDIES đã được nạp
      if (typeof window !== 'undefined' && Array.isArray(window.SAMPLE_STUDIES)) {
        return window.SAMPLE_STUDIES;
      }

      return [];
    },

    /**
     * Lưu danh sách Guidelines và phát sự kiện đồng bộ toàn ứng dụng
     * @param {Array} studiesList 
     */
    saveStudies: function (studiesList) {
      if (!Array.isArray(studiesList)) return;
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(studiesList));
        this.notifyUpdate();
      } catch (e) {
        console.error('[CliniPortalSync] Lỗi lưu localStorage:', e);
      }
    },

    /**
     * Phát CustomEvent để các trang/widget đang mở tự động cập nhật UI tức thì
     */
    notifyUpdate: function () {
      if (typeof window !== 'undefined') {
        const event = new CustomEvent(EVENT_NAME, {
          detail: { timestamp: Date.now() }
        });
        window.dispatchEvent(event);
      }
    },

    /**
     * Lấy dữ liệu thống kê tổng hợp phục vụ EBM Hub
     */
    getSummaryStats: function () {
      const studies = this.getStudies();
      const stats = {
        total: studies.length,
        mohCount: 0,
        associationCount: 0,
        intlCount: 0,
        practiceChangingCount: 0,
        bySpecialty: {}
      };

      studies.forEach(s => {
        // Đếm theo nguồn phát hành
        if (s.sourceType === 'vn-moh') stats.mohCount++;
        else if (s.sourceType === 'vn-association') stats.associationCount++;
        else stats.intlCount++;

        // Đếm mức độ tác động lâm sàng
        if (s.impact === 'practice-changing') stats.practiceChangingCount++;

        // Thống kê theo chuyên khoa
        const spec = s.specialty || 'other';
        stats.bySpecialty[spec] = (stats.bySpecialty[spec] || 0) + 1;
      });

      return stats;
    },

    /**
     * Lấy danh sách bài Guideline practice-changing hoặc mới nhất
     * @param {number} limit 
     */
    getRecentPracticeChanging: function (limit = 4) {
      const studies = this.getStudies();
      // Ưu tiên bài practice-changing, sắp xếp theo thời gian tạo mới hơn
      const sorted = [...studies].sort((a, b) => {
        if (a.impact === 'practice-changing' && b.impact !== 'practice-changing') return -1;
        if (a.impact !== 'practice-changing' && b.impact === 'practice-changing') return 1;
        return (b.year || 0) - (a.year || 0);
      });
      return sorted.slice(0, limit);
    },

    /**
     * Tìm kiếm từ khóa trên toàn bộ kho Guidelines
     * @param {string} query Từ khóa tìm kiếm
     */
    searchGuidelines: function (query) {
      if (!query || !query.trim()) return [];
      const q = query.trim().toLowerCase();
      const studies = this.getStudies();

      return studies.filter(s => {
        const titleMatch = (s.title || '').toLowerCase().includes(q);
        const drugMatch = (s.drug || '').toLowerCase().includes(q);
        const orgMatch = (s.organization || '').toLowerCase().includes(q);
        const summaryMatch = (s.summary || '').toLowerCase().includes(q);
        const specMatch = (s.specialty || '').toLowerCase().includes(q);
        return titleMatch || drugMatch || orgMatch || summaryMatch || specMatch;
      });
    },

    /**
     * Trả về danh sách liên kết 4 Module lâm sàng cho 1 bài Guideline cụ thể
     * @param {Object} study Bài Guideline
     * @param {string} basePath Prefix đường dẫn tương đối (e.g. '../../')
     */
    getCrossModuleLinks: function (study, basePath = '../../') {
      if (!study) return { calculators: [], flowcharts: [], drugs: [] };

      const links = {
        calculators: Array.isArray(study.relatedCalculators) ? study.relatedCalculators : [],
        flowcharts: Array.isArray(study.relatedFlowcharts) ? study.relatedFlowcharts : [],
        drugs: Array.isArray(study.relatedDrugs) ? study.relatedDrugs : []
      };

      // Tự động suy luận liên kết nếu bài viết chưa khai báo explicit
      const textCorpus = ((study.title || '') + ' ' + (study.drug || '') + ' ' + (study.summary || '')).toLowerCase();

      // Suy luận Công cụ tính toán
      if (links.calculators.length === 0) {
        if (textCorpus.includes('copd') || textCorpus.includes('phổi tắc nghẽn')) {
          links.calculators.push(
            { name: 'Thang điểm CAT (COPD)', path: 'pages/Công cụ/Hô hấp/CAT_COPD.html' },
            { name: 'Chỉ số BODE Index', path: 'pages/Công cụ/Hô hấp/BODE_Index.html' }
          );
        }
        if (textCorpus.includes('suy tim') || textCorpus.includes('tim mạch') || textCorpus.includes('thận') || textCorpus.includes('egfr')) {
          links.calculators.push(
            { name: 'Tính eGFR (CKD-EPI 2021)', path: 'pages/Công cụ/Thận/CKD_EPI.html' }
          );
        }
        if (textCorpus.includes('bệnh nhân nặng') || textCorpus.includes('icu') || textCorpus.includes('sốc nhiễm khuẩn')) {
          links.calculators.push(
            { name: 'Đánh giá Khí máu động mạch (ABG)', path: 'pages/Công cụ/Thận/DG_ABG.html' }
          );
        }
      }

      // Suy luận Lưu đồ tiếp cận
      if (links.flowcharts.length === 0) {
        if (textCorpus.includes('copd') || textCorpus.includes('khó thở')) {
          links.flowcharts.push(
            { name: 'Lưu đồ Tiếp cận Khó thở', path: 'pages/Tiếp cận/tiep-can.html' }
          );
        }
        if (textCorpus.includes('kháng sinh') || textCorpus.includes('nhiễm khuẩn') || textCorpus.includes('icu')) {
          links.flowcharts.push(
            { name: 'Lưu đồ Tiếp cận Sốt & Sốc nhiễm khuẩn', path: 'pages/Tiếp cận/tiep-can.html' }
          );
        }
      }

      // Suy luận Dược lý
      if (links.drugs.length === 0) {
        if (study.drug && study.drug !== 'N/A') {
          links.drugs.push(
            { name: `Phác đồ & Dược lý ${study.drug.split(',')[0]}`, path: 'pages/Dược lý/duoc-ly.html' }
          );
        }
      }

      // Chuẩn hóa path với basePath
      const normalizePath = (p) => {
        if (p.startsWith('http://') || p.startsWith('https://')) return p;
        return basePath + p.replace(/^pages\//, 'pages/');
      };

      return {
        calculators: links.calculators.map(item => ({ name: item.name, url: item.url || normalizePath(item.path) })),
        flowcharts: links.flowcharts.map(item => ({ name: item.name, url: item.url || normalizePath(item.path) })),
        drugs: links.drugs.map(item => ({ name: item.name, url: item.url || normalizePath(item.path) }))
      };
    }
  };

  // Đăng ký lắng nghe sự kiện storage (nếu thao tác giữa các tab khác nhau)
  if (typeof window !== 'undefined') {
    window.CliniPortalSync = CliniPortalSync;
    window.addEventListener('storage', function (e) {
      if (e.key === STORAGE_KEY) {
        CliniPortalSync.notifyUpdate();
      }
    });
  }
})();
