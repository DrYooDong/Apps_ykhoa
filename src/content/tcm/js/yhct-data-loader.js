/**
 * YHCT UNIVERSAL DATA LOADER ENGINE - CliniPortal
 * Offine-first asynchronous data fetcher, parser & fallback binder for Non-HTML/CSS/JS formats
 * Handles: JSON Schemas, CSV Tabular Data, Markdown Monographs, SVG Visual Schematics & YAML Config
 */

window.YHCTDataLoader = (function () {
  const isLocalFile = window.location.protocol === 'file:';

  // State cache for loaded resources
  const _cache = {
    json: {},
    csv: {},
    markdown: {},
    svg: {}
  };

  /**
   * Helper to parse CSV string into Array of Objects
   */
  function parseCSV(csvText) {
    if (!csvText) return [];
    const lines = csvText.trim().split('\n');
    if (lines.length < 2) return [];

    const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
    const result = [];

    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue;
      // Handle simple CSV splitting
      const values = lines[i].split(',').map(v => v.trim().replace(/^"|"$/g, ''));
      const obj = {};
      headers.forEach((h, idx) => {
        obj[h] = values[idx] || '';
      });
      result.push(obj);
    }
    return result;
  }

  /**
   * Fetch JSON resource with fallback
   */
  async function loadJSON(url, fallbackGlobalName) {
    if (_cache.json[url]) return _cache.json[url];
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      _cache.json[url] = data;
      return data;
    } catch (err) {
      console.warn(`[YHCTDataLoader] Could not fetch JSON from ${url}. Using local fallback.`, err);
      if (fallbackGlobalName && window[fallbackGlobalName]) {
        return window[fallbackGlobalName];
      }
      return null;
    }
  }

  /**
   * Fetch CSV resource
   */
  async function loadCSV(url) {
    if (_cache.csv[url]) return _cache.csv[url];
    try {
      const response = await fetch(url);
      if (!response.ok) stroke = new Error(`HTTP error! status: ${response.status}`);
      const text = await response.text();
      const data = parseCSV(text);
      _cache.csv[url] = data;
      return data;
    } catch (err) {
      console.warn(`[YHCTDataLoader] Could not fetch CSV from ${url}.`, err);
      return [];
    }
  }

  /**
   * Fetch Markdown Monograph
   */
  async function loadMarkdown(url) {
    if (_cache.markdown[url]) return _cache.markdown[url];
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const text = await response.text();
      _cache.markdown[url] = text;
      return text;
    } catch (err) {
      console.warn(`[YHCTDataLoader] Could not fetch Markdown from ${url}.`, err);
      return "";
    }
  }

  /**
   * Fetch SVG schematic string
   */
  async function loadSVG(url) {
    if (_cache.svg[url]) return _cache.svg[url];
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const svgText = await response.text();
      _cache.svg[url] = svgText;
      return svgText;
    } catch (err) {
      console.warn(`[YHCTDataLoader] Could not fetch SVG from ${url}.`, err);
      return "";
    }
  }

  // Public API methods
  return {
    isOffline: isLocalFile,

    // 1. Ngũ hành Matrix
    getNguHanhData: function (basePath = "../") {
      return loadJSON(`${basePath}data/json/ngu-hanh-matrix.json`, 'NGU_HANH_DATA');
    },

    // 2. Dược thảo Database
    getDuocThaoData: function (basePath = "../") {
      return loadJSON(`${basePath}data/json/duoc-thao-db.json`, 'DUOC_THAO_DATA');
    },

    // 3. Phương tễ Cổ phương Database
    getPhuongTeData: function (basePath = "../") {
      return loadJSON(`${basePath}data/json/phuong-te-db.json`, 'PHUONG_TE_DATA');
    },

    // 4. Huyệt vị Database
    getAcupointsData: function (basePath = "../") {
      return loadJSON(`${basePath}data/json/acupoints-db.json`, 'AcupointsData');
    },

    // 5. 28 Mạch tượng
    getMachChanData: function (basePath = "../") {
      return loadJSON(`${basePath}data/json/mach-chan-28.json`, 'MACH_CHAN_DATA');
    },

    // 6. Thiệt chẩn Atlas
    getThietChanData: function (basePath = "../") {
      return loadJSON(`${basePath}data/json/thiet-chan-atlas.json`, 'THIET_CHAN_DATA');
    },

    // 7. Đông Tây Y Bridge Mapping
    getDongTayYData: function (basePath = "../") {
      return loadJSON(`${basePath}data/json/dong-tay-y-mapping.json`, 'DONG_TAY_Y_DATA');
    },

    // 8. Quiz Bank
    getQuizData: function (basePath = "../") {
      return loadJSON(`${basePath}data/json/yhct-quiz-bank.json`, 'YHCT_QUIZ_DATA');
    },

    // 9. Dưỡng sinh Routines
    getDuongSinhData: function (basePath = "../") {
      return loadJSON(`${basePath}data/json/duong-sinh-routines.json`, 'DUONG_SINH_DATA');
    },

    // CSV Readers
    getHerbsCSV: function (basePath = "../") {
      return loadCSV(`${basePath}data/csv/herbs-properties-matrix.csv`);
    },

    getAcupointsCSV: function (basePath = "../") {
      return loadCSV(`${basePath}data/csv/acupoints-quick-index.csv`);
    },

    getInteractionsCSV: function (basePath = "../") {
      return loadCSV(`${basePath}data/csv/dong-tay-y-interactions.csv`);
    },

    // Monograph & SVG Readers
    getMonograph: function (filename, basePath = "../") {
      return loadMarkdown(`${basePath}docs/monographs/${filename}`);
    },

    getSVGSchematic: function (filename, basePath = "../") {
      return loadSVG(`${basePath}assets/svg/${filename}`);
    }
  };
})();
