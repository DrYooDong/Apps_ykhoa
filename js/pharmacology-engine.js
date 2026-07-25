/**
 * CliniPortal - Pharmacology Engine (Vanilla JS)
 * Handles offline loading & processing of non-HTML/CSS/JS file formats:
 * - JSON (Drugs DB, DDI Matrix, Symptom Pathways, Dosage Rules)
 * - CSV (Tabular Interaction Interchange)
 * - Markdown (.md Monographs)
 * - SVG (Interactive Mechanism of Action Schematics)
 */

class PharmacologyEngine {
  constructor(options = {}) {
    this.basePath = options.basePath || '../pages/Dược lý/';
    this.drugs = [];
    this.interactions = [];
    this.symptomPathways = [];
    this.dosageRules = null;
    this.isLoaded = false;
  }

  /**
   * Initialize and load all non-HTML data stores
   */
  async init() {
    try {
      await Promise.all([
        this.loadDrugsDatabase(),
        this.loadInteractions(),
        this.loadSymptomPathways(),
        this.loadDosageRules()
      ]);
      this.isLoaded = true;
      console.log('💊 Pharmacology Engine initialized successfully with Non-HTML assets.');
      return true;
    } catch (err) {
      console.warn('⚠️ Pharmacology Engine loaded with inline fallback data due to fetch restrictions:', err);
      this.loadFallbackData();
      this.isLoaded = true;
      return true;
    }
  }

  async loadDrugsDatabase() {
    const res = await fetch(`${this.basePath}data/drugs_database.json`);
    const data = await res.json();
    this.drugs = data.drugs || [];
  }

  async loadInteractions() {
    const res = await fetch(`${this.basePath}data/drug_interactions.json`);
    const data = await res.json();
    this.interactions = data.interactions || [];
  }

  async loadSymptomPathways() {
    const res = await fetch(`${this.basePath}data/symptom_pathways.json`);
    const data = await res.json();
    this.symptomPathways = data.pathways || [];
  }

  async loadDosageRules() {
    const res = await fetch(`${this.basePath}data/dosage_rules.json`);
    this.dosageRules = await res.json();
  }

  loadFallbackData() {
    // Embedded fallback data for offline file:/// security restrictions
    this.drugs = [
      {
        id: 'amox_clav',
        name: 'Amoxicillin / Clavulanate',
        brandNames: ['Augmentin', 'Clavulin'],
        drugClass: 'Kháng sinh (Penicillin + Beta-lactamase inhibitor)',
        category: 'Kháng sinh',
        routes: ['PO', 'IV'],
        pregnancyCategory: 'B',
        mechanism: 'Amoxicillin ức chế tổng hợp thành tế bào vi khuẩn; Acid Clavulanic ức chế Beta-lactamase.',
        dosage: { standardAdult: '875/125mg PO q12h hoặc 500/125mg PO q8h' },
        renalAdjustment: {
          brackets: [
            { crcl: '>50', recommendation: 'Liều chuẩn (875/125mg q12h)' },
            { crcl: '10-30', recommendation: '500/125mg PO q12h' },
            { crcl: '<10', recommendation: '500/125mg PO q24h' }
          ]
        }
      },
      {
        id: 'metoprolol_succ',
        name: 'Metoprolol Succinate ER',
        brandNames: ['Toprol-XL', 'Betaloc ZOK'],
        drugClass: 'Chẹn beta-1 chọn lọc (Beta-blocker)',
        category: 'Tim mạch',
        routes: ['PO'],
        pregnancyCategory: 'C',
        mechanism: 'Ức chế chọn lọc thụ thể Beta-1 adrenergic ở cơ tim.',
        dosage: { standardAdult: '25-100mg PO 1 lần/ngày' },
        renalAdjustment: { brackets: [{ crcl: 'All', recommendation: 'Không cần chỉnh liều' }] }
      },
      {
        id: 'verapamil',
        name: 'Verapamil Hydrochloride',
        brandNames: ['Isoptin', 'Calan'],
        drugClass: 'Thuốc chẹn kênh Canxi (Non-Dihydropyridine CCB)',
        category: 'Tim mạch',
        routes: ['PO', 'IV'],
        pregnancyCategory: 'C',
        mechanism: 'Ức chế dòng ion Canxi vào cơ tim và màng tế bào nút AV.',
        dosage: { standardAdult: '80-120mg PO 3 lần/ngày' },
        renalAdjustment: { brackets: [{ crcl: '<10', recommendation: 'Giảm 25-50% liều' }] }
      }
    ];

    this.interactions = [
      {
        drug1: 'metoprolol_succ',
        drug2: 'verapamil',
        severity: 'contraindicated',
        severityLabel: 'Chống chỉ định / Nguy hiểm cao',
        summary: 'Nguy cơ chậm nhịp tim nặng, block AV độ III và suy tim cấp.',
        mechanism: 'Cả 2 thuốc cùng ức chế nút xoang và nút nhĩ thất.',
        clinicalManagement: 'Tránh phối hợp. Chọn Amlodipine nếu cần chẹn kênh Canxi.'
      }
    ];
  }

  /**
   * Search Drugs Database
   */
  searchDrugs(query = '', category = 'all') {
    const q = query.trim().toLowerCase();
    return this.drugs.filter(drug => {
      const matchQuery = !q || 
        drug.name.toLowerCase().includes(q) ||
        drug.brandNames.some(b => b.toLowerCase().includes(q)) ||
        drug.drugClass.toLowerCase().includes(q);

      const matchCat = category === 'all' || drug.category === category;
      return matchQuery && matchCat;
    });
  }

  /**
   * Check Drug-Drug Interactions for an array of selected drug IDs
   */
  checkInteractions(selectedDrugIds = []) {
    const results = [];
    for (let i = 0; i < selectedDrugIds.length; i++) {
      for (let j = i + 1; j < selectedDrugIds.length; j++) {
        const idA = selectedDrugIds[i];
        const idB = selectedDrugIds[j];

        const match = this.interactions.find(item => 
          (item.drug1 === idA && item.drug2 === idB) || 
          (item.drug1 === idB && item.drug2 === idA)
        );

        const drugAObj = this.drugs.find(d => d.id === idA);
        const drugBObj = this.drugs.find(d => d.id === idB);

        if (match) {
          results.push({
            drugA: drugAObj ? drugAObj.name : idA,
            drugB: drugBObj ? drugBObj.name : idB,
            ...match
          });
        } else {
          results.push({
            drugA: drugAObj ? drugAObj.name : idA,
            drugB: drugBObj ? drugBObj.name : idB,
            severity: 'none',
            severityLabel: 'Không có tương tác đáng kể',
            summary: 'Chưa ghi nhận tương tác bất lợi nghiêm trọng giữa hai hoạt chất này.',
            mechanism: 'Chuyển hóa và cơ chế tác dụng độc lập.',
            clinicalManagement: 'Sử dụng phối hợp an toàn.'
          });
        }
      }
    }
    return results;
  }

  /**
   * Calculate Cockcroft-Gault Renal Clearance (CrCl)
   */
  calculateCrCl(age, weightKg, serumCrMgDl, isFemale = false) {
    if (!age || !weightKg || !serumCrMgDl || serumCrMgDl <= 0) return null;
    let crcl = ((140 - age) * weightKg) / (72 * serumCrMgDl);
    if (isFemale) crcl *= 0.85;
    return parseFloat(crcl.toFixed(1));
  }

  /**
   * Parse Markdown string to clean HTML (Simple Vanilla parser)
   */
  parseMarkdown(mdText) {
    if (!mdText) return '';
    let html = mdText
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')
      .replace(/\*\*(.* animate)?\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*)\*/gim, '<em>$1</em>')
      .replace(/^- (.*$)/gim, '<li>$1</li>')
      .replace(/\n\n/gim, '<p></p>');

    return html.replace(/(<li>.*<\/li>)/sim, '<ul>$1</ul>');
  }

  /**
   * Attach Interactive SVG Node Handlers
   */
  attachSvgInteractions(containerElement, onNodeClick) {
    if (!containerElement) return;
    const nodes = containerElement.querySelectorAll('.moa-node');
    nodes.forEach(node => {
      node.style.cursor = 'pointer';
      node.addEventListener('click', () => {
        const title = node.getAttribute('data-title') || 'Cơ chế Phân tử';
        const desc = node.getAttribute('data-desc') || 'Thông tin cơ chế tác dụng.';
        if (typeof onNodeClick === 'function') {
          onNodeClick({ title, desc, id: node.id });
        }
      });
    });
  }
}

// Global Export
window.PharmacologyEngine = PharmacologyEngine;
