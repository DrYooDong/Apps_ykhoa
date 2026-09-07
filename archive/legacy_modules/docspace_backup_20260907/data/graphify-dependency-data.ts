/**
 * Graphify Dependency Data - Auto-generated
 * Cung cấp dữ liệu tĩnh (file-level) cho Bản đồ Phụ thuộc Trực quan
 */

export type RiskLevel = 'CRITICAL HUB' | 'HIGH RISK' | 'MEDIUM RISK' | 'LOW';
export type DomainCategory = 'Bệnh lý' | 'Triệu chứng' | 'Công cụ' | 'Kỹ năng' | 'Sinh lý' | 'Dược lý' | 'Guidelines' | 'DocSpace' | 'Core' | 'Other';

export interface DependencyNode {
  id: string;
  label: string;
  domain: DomainCategory;
  inbound: number;
  outbound: number;
  riskLevel: RiskLevel;
  callers: string[];
  dependencies: string[];
}

export const GRAPH_NODES: DependencyNode[] = [
  {
    "id": "js/homepage-widgets.js",
    "label": "homepage-widgets.js",
    "domain": "Other",
    "inbound": 0,
    "outbound": 2,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": [
      "knowledge-vault/.obsidian/plugins/tag-wrangler/main.js",
      "src/content/ebm/guidelines/js/drug-linker.js"
    ]
  },
  {
    "id": "js/main.js",
    "label": "main.js",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "js/pharmacology-flashcards.js",
    "label": "pharmacology-flashcards.js",
    "domain": "Other",
    "inbound": 0,
    "outbound": 2,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": [
      "knowledge-vault/.obsidian/plugins/tag-wrangler/main.js",
      "src/content/ebm/guidelines/js/drug-linker.js"
    ]
  },
  {
    "id": "js/skill-flashcards.js",
    "label": "skill-flashcards.js",
    "domain": "Other",
    "inbound": 0,
    "outbound": 2,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": [
      "knowledge-vault/.obsidian/plugins/tag-wrangler/main.js",
      "src/content/ebm/guidelines/js/drug-linker.js"
    ]
  },
  {
    "id": "src/components/article-view.ts",
    "label": "article-view.ts",
    "domain": "Công cụ",
    "inbound": 1,
    "outbound": 2,
    "riskLevel": "MEDIUM RISK",
    "callers": [
      "src/components/index.ts"
    ],
    "dependencies": [
      "src/core/content-loader.ts",
      "src/core/markdown-engine.ts"
    ]
  },
  {
    "id": "src/components/category-view.ts",
    "label": "category-view.ts",
    "domain": "Công cụ",
    "inbound": 1,
    "outbound": 2,
    "riskLevel": "MEDIUM RISK",
    "callers": [
      "src/components/index.ts"
    ],
    "dependencies": [
      "src/core/category-mapper.ts",
      "src/core/content-loader.ts"
    ]
  },
  {
    "id": "src/components/tool-view.ts",
    "label": "tool-view.ts",
    "domain": "Công cụ",
    "inbound": 1,
    "outbound": 2,
    "riskLevel": "MEDIUM RISK",
    "callers": [
      "src/components/index.ts"
    ],
    "dependencies": [
      "src/core/category-mapper.ts",
      "src/core/content-loader.ts"
    ]
  },
  {
    "id": "src/content/approaches/data/approach-taxonomy.json",
    "label": "approach-taxonomy.json",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/approaches/data/emergency-pathways.json",
    "label": "emergency-pathways.json",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/approaches/pathology/benh-ly-csv-engine.js",
    "label": "benh-ly-csv-engine.js",
    "domain": "Bệnh lý",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/approaches/pathology/benh-ly-markdown.js",
    "label": "benh-ly-markdown.js",
    "domain": "Bệnh lý",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/approaches/pathology/benh-ly-simulator.js",
    "label": "benh-ly-simulator.js",
    "domain": "Bệnh lý",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/approaches/pathology/benh-ly.js",
    "label": "benh-ly.js",
    "domain": "Bệnh lý",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/calculators/general/js/physio-formula-engine.js",
    "label": "physio-formula-engine.js",
    "domain": "Core",
    "inbound": 0,
    "outbound": 1,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": [
      "knowledge-vault/.obsidian/plugins/tag-wrangler/main.js"
    ]
  },
  {
    "id": "src/content/ebm/ebm-lab/ebm-lab.js",
    "label": "ebm-lab.js",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/ebm/ebm-lab/forest-plot.js",
    "label": "forest-plot.js",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/ebm/ebm-lab/funnel-plot.js",
    "label": "funnel-plot.js",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/ebm/ebm-lab/kaplan-meier.js",
    "label": "kaplan-meier.js",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/ebm/ebm-lab/roc-curve.js",
    "label": "roc-curve.js",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/ebm/guidelines/guidelines.js",
    "label": "guidelines.js",
    "domain": "Core",
    "inbound": 0,
    "outbound": 1,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": [
      "knowledge-vault/.obsidian/plugins/tag-wrangler/main.js"
    ]
  },
  {
    "id": "src/content/ebm/guidelines/guidelinesdata.js",
    "label": "guidelinesdata.js",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/ebm/guidelines/js/drug-linker.js",
    "label": "drug-linker.js",
    "domain": "Core",
    "inbound": 3,
    "outbound": 0,
    "riskLevel": "MEDIUM RISK",
    "callers": [
      "js/homepage-widgets.js",
      "js/pharmacology-flashcards.js",
      "js/skill-flashcards.js"
    ],
    "dependencies": []
  },
  {
    "id": "src/content/ebm/js/ebm-format-loader.js",
    "label": "ebm-format-loader.js",
    "domain": "Core",
    "inbound": 0,
    "outbound": 1,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": [
      "knowledge-vault/.obsidian/plugins/tag-wrangler/main.js"
    ]
  },
  {
    "id": "src/content/ebm/medical-statistics/quiz.js",
    "label": "quiz.js",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/pathophysiology/js/components/physio-components.js",
    "label": "physio-components.js",
    "domain": "Công cụ",
    "inbound": 0,
    "outbound": 1,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": [
      "knowledge-vault/.obsidian/plugins/tag-wrangler/main.js"
    ]
  },
  {
    "id": "src/content/pathophysiology/js/physio-clinical-bridge.js",
    "label": "physio-clinical-bridge.js",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/pathophysiology/js/physio-formula-engine.js",
    "label": "physio-formula-engine.js",
    "domain": "Core",
    "inbound": 0,
    "outbound": 1,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": [
      "knowledge-vault/.obsidian/plugins/tag-wrangler/main.js"
    ]
  },
  {
    "id": "src/content/pathophysiology/js/physio-glossary.js",
    "label": "physio-glossary.js",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/pathophysiology/js/physio-md-engine.js",
    "label": "physio-md-engine.js",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/pathophysiology/js/physio-mirror.js",
    "label": "physio-mirror.js",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/pathophysiology/js/physio-pathway-viewer.js",
    "label": "physio-pathway-viewer.js",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/pathophysiology/js/physio-progress.js",
    "label": "physio-progress.js",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/pathophysiology/js/physio-quiz-engine.js",
    "label": "physio-quiz-engine.js",
    "domain": "Core",
    "inbound": 0,
    "outbound": 1,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": [
      "knowledge-vault/.obsidian/plugins/tag-wrangler/main.js"
    ]
  },
  {
    "id": "src/content/pathophysiology/js/physio-shared.js",
    "label": "physio-shared.js",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/pharmacology/data/drugs-db.js",
    "label": "drugs-db.js",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/skills/data/cls/lab-sinh-hoa.json",
    "label": "lab-sinh-hoa.json",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/skills/data/osce/osce-ho-hap.json",
    "label": "osce-ho-hap.json",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/skills/data/osce/osce-kham-tim.json",
    "label": "osce-kham-tim.json",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/skills/js/lab-simulator.js",
    "label": "lab-simulator.js",
    "domain": "Core",
    "inbound": 0,
    "outbound": 1,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": [
      "knowledge-vault/.obsidian/plugins/tag-wrangler/main.js"
    ]
  },
  {
    "id": "src/content/skills/js/markdown-skill-parser.js",
    "label": "markdown-skill-parser.js",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/skills/js/osce-evaluator.js",
    "label": "osce-evaluator.js",
    "domain": "Core",
    "inbound": 0,
    "outbound": 1,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": [
      "knowledge-vault/.obsidian/plugins/tag-wrangler/main.js"
    ]
  },
  {
    "id": "src/content/tcm/acupressure/data/acupoints-data.js",
    "label": "acupoints-data.js",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/tcm/acupressure/data/danger-zones-data.js",
    "label": "danger-zones-data.js",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/tcm/acupressure/data/meridians-data.js",
    "label": "meridians-data.js",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/tcm/acupressure/js/body-map.js",
    "label": "body-map.js",
    "domain": "Core",
    "inbound": 0,
    "outbound": 1,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": [
      "knowledge-vault/.obsidian/plugins/homepage/main.js"
    ]
  },
  {
    "id": "src/content/tcm/diagnostics/data/mach-chan-data.js",
    "label": "mach-chan-data.js",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/tcm/diagnostics/data/thiet-chan-data.js",
    "label": "thiet-chan-data.js",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/tcm/diagnostics/js/mach-chan-simulator.js",
    "label": "mach-chan-simulator.js",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/tcm/diagnostics/js/thiet-chan-atlas.js",
    "label": "thiet-chan-atlas.js",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/tcm/dong-tay-y-bridge/data/dong-tay-y-data.js",
    "label": "dong-tay-y-data.js",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/tcm/dong-tay-y-bridge/js/dong-tay-y-bridge.js",
    "label": "dong-tay-y-bridge.js",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/tcm/herbs-formulas/data/duoc-thao-data.js",
    "label": "duoc-thao-data.js",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/tcm/herbs-formulas/data/phuong-te-data.js",
    "label": "phuong-te-data.js",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/tcm/herbs-formulas/js/duoc-thao-engine.js",
    "label": "duoc-thao-engine.js",
    "domain": "Core",
    "inbound": 0,
    "outbound": 1,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": [
      "knowledge-vault/.obsidian/plugins/tag-wrangler/main.js"
    ]
  },
  {
    "id": "src/content/tcm/herbs-formulas/js/phuong-te-studio.js",
    "label": "phuong-te-studio.js",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/tcm/js/yhct-data-loader.js",
    "label": "yhct-data-loader.js",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/tcm/theory-ngu-hanh/data/ngu-hanh-data.js",
    "label": "ngu-hanh-data.js",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/tcm/theory-ngu-hanh/js/ngu-hanh-studio.js",
    "label": "ngu-hanh-studio.js",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/tcm/wellness-games/data/duong-sinh-data.js",
    "label": "duong-sinh-data.js",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/tcm/wellness-games/data/yhct-quiz-data.js",
    "label": "yhct-quiz-data.js",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/tcm/wellness-games/js/duong-sinh-dashboard.js",
    "label": "duong-sinh-dashboard.js",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/tcm/wellness-games/js/yhct-quiz-arena.js",
    "label": "yhct-quiz-arena.js",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/core/category-mapper.ts",
    "label": "category-mapper.ts",
    "domain": "Core",
    "inbound": 3,
    "outbound": 0,
    "riskLevel": "MEDIUM RISK",
    "callers": [
      "src/components/category-view.ts",
      "src/components/tool-view.ts",
      "src/index.ts"
    ],
    "dependencies": []
  },
  {
    "id": "src/core/clinical-engine.ts",
    "label": "clinical-engine.ts",
    "domain": "Core",
    "inbound": 1,
    "outbound": 0,
    "riskLevel": "MEDIUM RISK",
    "callers": [
      "src/index.ts"
    ],
    "dependencies": []
  },
  {
    "id": "src/core/content-loader.ts",
    "label": "content-loader.ts",
    "domain": "Core",
    "inbound": 5,
    "outbound": 0,
    "riskLevel": "MEDIUM RISK",
    "callers": [
      "src/components/article-view.ts",
      "src/components/category-view.ts",
      "src/components/tool-view.ts",
      "src/core/search-engine.ts",
      "src/index.ts"
    ],
    "dependencies": []
  },
  {
    "id": "src/core/markdown-engine.ts",
    "label": "markdown-engine.ts",
    "domain": "Core",
    "inbound": 2,
    "outbound": 0,
    "riskLevel": "MEDIUM RISK",
    "callers": [
      "src/components/article-view.ts",
      "src/index.ts"
    ],
    "dependencies": []
  },
  {
    "id": "src/core/router.ts",
    "label": "router.ts",
    "domain": "Core",
    "inbound": 2,
    "outbound": 0,
    "riskLevel": "MEDIUM RISK",
    "callers": [
      "src/docspace/index.ts",
      "src/index.ts"
    ],
    "dependencies": []
  },
  {
    "id": "src/core/search-engine.ts",
    "label": "search-engine.ts",
    "domain": "Core",
    "inbound": 1,
    "outbound": 2,
    "riskLevel": "MEDIUM RISK",
    "callers": [
      "src/index.ts"
    ],
    "dependencies": [
      "knowledge-vault/.obsidian/plugins/tag-wrangler/main.js",
      "src/core/content-loader.ts"
    ]
  },
  {
    "id": "src/core/storage.ts",
    "label": "storage.ts",
    "domain": "Core",
    "inbound": 1,
    "outbound": 0,
    "riskLevel": "MEDIUM RISK",
    "callers": [
      "src/index.ts"
    ],
    "dependencies": []
  },
  {
    "id": "src/docspace/index.ts",
    "label": "index.ts",
    "domain": "DocSpace",
    "inbound": 2,
    "outbound": 15,
    "riskLevel": "MEDIUM RISK",
    "callers": [
      "src/docspace/features/ai-settings-view.ts",
      "src/index.ts"
    ],
    "dependencies": [
      "src/core/router.ts",
      "src/docspace/ai/rag-engine.ts",
      "src/docspace/docspace-view.ts",
      "src/docspace/features/ai-settings-view.ts",
      "src/docspace/features/case-logger-view.ts",
      "src/docspace/features/drug-journal-view.ts",
      "src/docspace/features/living-protocol-view.ts",
      "src/docspace/features/notepad-view.ts",
      "src/docspace/features/oncall-view.ts",
      "src/docspace/features/protocol-view.ts",
      "src/docspace/features/quick-links-view.ts",
      "src/docspace/features/quick-save.ts",
      "src/docspace/features/sbar-view.ts",
      "src/docspace/features/simulation-view.ts",
      "src/docspace/storage.ts"
    ]
  },
  {
    "id": "src/index.ts",
    "label": "index.ts",
    "domain": "Core",
    "inbound": 0,
    "outbound": 9,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": [
      "src/components/index.ts",
      "src/core/category-mapper.ts",
      "src/core/clinical-engine.ts",
      "src/core/content-loader.ts",
      "src/core/markdown-engine.ts",
      "src/core/router.ts",
      "src/core/search-engine.ts",
      "src/core/storage.ts",
      "src/docspace/index.ts"
    ]
  },
  {
    "id": "src/README.md",
    "label": "README.md",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/assets/README.md",
    "label": "README.md",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/README.md",
    "label": "README.md",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/approaches/data/clinical-pearls.md",
    "label": "clinical-pearls.md",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/approaches/huong-dan-thiet-ke.md",
    "label": "huong-dan-thiet-ke.md",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/approaches/pathology/data/dvt-evidence-summary.md",
    "label": "dvt-evidence-summary.md",
    "domain": "Bệnh lý",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/approaches/pathology/data/stemi-guideline-2026.md",
    "label": "stemi-guideline-2026.md",
    "domain": "Bệnh lý",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/calculators/calculators-readme.md",
    "label": "calculators-readme.md",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/calculators/cardiology/muc-tieu-ldl-c.md",
    "label": "muc-tieu-ldl-c.md",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/calculators/cardiology/phan-loai-dien-tien-suy-tim-2026.md",
    "label": "phan-loai-dien-tien-suy-tim-2026.md",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/calculators/emergency/quan-ly-may-tho.md",
    "label": "quan-ly-may-tho.md",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/calculators/gastroenterology/thang-diem-hcc.md",
    "label": "thang-diem-hcc.md",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/calculators/huong-dan-thiet-ke.md",
    "label": "huong-dan-thiet-ke.md",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/calculators/infectious/chinh-lieu-khang-sinh.md",
    "label": "chinh-lieu-khang-sinh.md",
    "domain": "Core",
    "inbound": 0,
    "outbound": 1,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": [
      ".agents/AGENTS.md"
    ]
  },
  {
    "id": "src/content/calculators/infectious/chinh-lieu-vancomycin.md",
    "label": "chinh-lieu-vancomycin.md",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/calculators/infectious/duoc-pk-pd.md",
    "label": "duoc-pk-pd.md",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/calculators/infectious/ql-vancomycin.md",
    "label": "ql-vancomycin.md",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/calculators/renal/cap-nhat-toan-kiem.md",
    "label": "cap-nhat-toan-kiem.md",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/ebm/guidelines/content/empa-reg-summary.md",
    "label": "empa-reg-summary.md",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/ebm/guidelines/kho-guidelines/phac-do-soc-nhiem-khuan-sepsis3.md",
    "label": "phac-do-soc-nhiem-khuan-sepsis3.md",
    "domain": "Core",
    "inbound": 1,
    "outbound": 0,
    "riskLevel": "MEDIUM RISK",
    "callers": [
      "src/content/ebm/index.md"
    ],
    "dependencies": []
  },
  {
    "id": "src/content/ebm/guidelines/operations.md",
    "label": "operations.md",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/ebm/guidelines/readme.md",
    "label": "readme.md",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/ebm/index.md",
    "label": "index.md",
    "domain": "Core",
    "inbound": 0,
    "outbound": 1,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": [
      "src/content/ebm/guidelines/kho-guidelines/phac-do-soc-nhiem-khuan-sepsis3.md"
    ]
  },
  {
    "id": "src/content/ebm/medical-statistics/content/01-p-value-and-nnt.md",
    "label": "01-p-value-and-nnt.md",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/pathophysiology/content/sinhly/phan1/sl-tb-diensinhly.md",
    "label": "sl-tb-diensinhly.md",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/pathophysiology/content/slb-ccbs/slb-ccbs-acs.md",
    "label": "slb-ccbs-acs.md",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/pathophysiology/index.md",
    "label": "index.md",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/pathophysiology/pathophysiology-cases/HUONG_DAN_THIET_KE.md",
    "label": "HUONG_DAN_THIET_KE.md",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/pathophysiology/pathophysiology-cases/WORKFLOW_TAO_TRANG_SINH_LY_BENH.md",
    "label": "WORKFLOW_TAO_TRANG_SINH_LY_BENH.md",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/pathophysiology/physiology/huong-dan-thiet-ke.md",
    "label": "huong-dan-thiet-ke.md",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/pathophysiology/physiology/note-sinh-ly.md",
    "label": "note-sinh-ly.md",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/pathophysiology/readme.md",
    "label": "readme.md",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/pharmacology/index.md",
    "label": "index.md",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/pharmacology/monographs/amoxicillin-clavulanate.md",
    "label": "amoxicillin-clavulanate.md",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/pharmacology/monographs/metoprolol-succinate.md",
    "label": "metoprolol-succinate.md",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/pharmacology/readme.md",
    "label": "readme.md",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/skills/clinical/kham-co-xuong-khop/kn-kham-co-xuong-khop.md",
    "label": "kn-kham-co-xuong-khop.md",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/skills/clinical/kham-da-toc-mong/kn-kham-da-toc-mong.md",
    "label": "kn-kham-da-toc-mong.md",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/skills/clinical/kham-ho-hap/kn-kham-ho-hap.md",
    "label": "kn-kham-ho-hap.md",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/skills/clinical/kham-noi-tiet/kn-kham-noi-tiet.md",
    "label": "kn-kham-noi-tiet.md",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/skills/clinical/kham-sinh-duc/kn-kham-sinh-duc.md",
    "label": "kn-kham-sinh-duc.md",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/skills/clinical/kham-tai-mui-hong/kn-kham-tai-mui-hong.md",
    "label": "kn-kham-tai-mui-hong.md",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/skills/clinical/kham-than-kinh/kn-kham-than-kinh.md",
    "label": "kn-kham-than-kinh.md",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/skills/clinical/kham-than-tiet-nieu/kn-kham-than-nieu.md",
    "label": "kn-kham-than-nieu.md",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/skills/clinical/kham-thi-giac/kn-kham-thi-giac.md",
    "label": "kn-kham-thi-giac.md",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/skills/clinical/kham-tieu-hoa/kn-kham-tieu-hoa.md",
    "label": "kn-kham-tieu-hoa.md",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/skills/clinical/kham-tim-mach/kn-kham-dm-ngoai-bien.md",
    "label": "kn-kham-dm-ngoai-bien.md",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/skills/clinical/kham-tim-mach/kn-kham-tim.md",
    "label": "kn-kham-tim.md",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/skills/clinical/kham-tim-mach/kn-kham-tm-ngoai-bien.md",
    "label": "kn-kham-tm-ngoai-bien.md",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/skills/data/procedures/cvc-placement.md",
    "label": "cvc-placement.md",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/skills/index.md",
    "label": "index.md",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/skills/treatment-management/luachon-ks.md",
    "label": "luachon-ks.md",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/tcm/acupressure/note.md",
    "label": "note.md",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/tcm/docs/monographs/bat-doan-cam-duong-sinh.md",
    "label": "bat-doan-cam-duong-sinh.md",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/tcm/docs/monographs/huong-dan-xoa-bop-bam-huyet.md",
    "label": "huong-dan-xoa-bop-bam-huyet.md",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/tcm/docs/monographs/ngu-hanh-ly-luan.md",
    "label": "ngu-hanh-ly-luan.md",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/tcm/docs/monographs/phuong-te-quan-than-ta-su.md",
    "label": "phuong-te-quan-than-ta-su.md",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/tcm/docs/monographs/tu-chan-chan-doan.md",
    "label": "tu-chan-chan-doan.md",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  },
  {
    "id": "src/content/tcm/readme.md",
    "label": "readme.md",
    "domain": "Core",
    "inbound": 0,
    "outbound": 0,
    "riskLevel": "LOW",
    "callers": [],
    "dependencies": []
  }
];

export function queryModuleRisk(searchTerm: string): DependencyNode[] {
  const term = searchTerm.toLowerCase();
  return GRAPH_NODES.filter(n => 
    n.label.toLowerCase().includes(term) || 
    n.id.toLowerCase().includes(term)
  );
}
