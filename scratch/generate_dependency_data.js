const fs = require('fs');
const path = require('path');

const GRAPH_PATH = path.join(__dirname, '../graphify-out/graph.json');
const OUT_PATH = path.join(__dirname, '../src/docspace/data/graphify-dependency-data.ts');

if (!fs.existsSync(GRAPH_PATH)) {
  console.error("graph.json not found!");
  process.exit(1);
}

const g = JSON.parse(fs.readFileSync(GRAPH_PATH, 'utf8'));

const fileNodes = new Map();

g.nodes.forEach(n => {
  if (!n.source_file) return;
  const file = n.source_file;
  if (!fileNodes.has(file)) {
    let domain = 'Other';
    if (file.includes('Tiếp cận/4. Bệnh lý') || file.includes('approaches/pathology')) domain = 'Bệnh lý';
    else if (file.includes('Tiếp cận/2. Triệu chứng')) domain = 'Triệu chứng';
    else if (file.includes('Công cụ') || file.includes('components/tool-components') || file.includes('components/')) domain = 'Công cụ';
    else if (file.includes('Kỹ năng')) domain = 'Kỹ năng';
    else if (file.includes('Sinh lý')) domain = 'Sinh lý';
    else if (file.includes('Dược lý')) domain = 'Dược lý';
    else if (file.includes('Y học chứng cứ') || file.includes('Guidelines')) domain = 'Guidelines';
    else if (file.includes('src/docspace')) domain = 'DocSpace';
    else if (file.startsWith('src/core') || file === 'js/main.js' || file.startsWith('src/')) domain = 'Core';

    fileNodes.set(file, {
      id: file,
      label: file.split('/').pop(),
      domain: domain,
      inbound: 0,
      outbound: 0,
      callers: new Set(),
      dependencies: new Set()
    });
  }
});

const nodeMap = new Map(g.nodes.map(n => [n.id, n]));

g.links.forEach(l => {
  const srcNode = nodeMap.get(l.source);
  const tgtNode = nodeMap.get(l.target);
  
  if (srcNode && tgtNode && srcNode.source_file && tgtNode.source_file) {
    const srcFile = srcNode.source_file;
    const tgtFile = tgtNode.source_file;
    
    if (srcFile !== tgtFile) {
      const srcData = fileNodes.get(srcFile);
      const tgtData = fileNodes.get(tgtFile);
      
      if (!srcData.dependencies.has(tgtFile)) {
        srcData.dependencies.add(tgtFile);
        srcData.outbound++;
      }
      if (!tgtData.callers.has(srcFile)) {
        tgtData.callers.add(srcFile);
        tgtData.inbound++;
      }
    }
  }
});

const nodesArr = Array.from(fileNodes.values()).map(n => {
  let riskLevel = 'LOW';
  if (n.inbound > 15) riskLevel = 'CRITICAL HUB';
  else if (n.inbound > 5) riskLevel = 'HIGH RISK';
  else if (n.inbound > 0) riskLevel = 'MEDIUM RISK';
  
  return {
    id: n.id,
    label: n.label,
    domain: n.domain,
    inbound: n.inbound,
    outbound: n.outbound,
    riskLevel: riskLevel,
    callers: Array.from(n.callers),
    dependencies: Array.from(n.dependencies)
  };
});

const coreNodes = nodesArr.filter(n => n.domain === 'Core' || n.id === 'js/main.js' || n.id.includes('src/content/'));
const coreIds = new Set(coreNodes.map(n => n.id));

const relevantNodes = nodesArr.filter(n => {
  if (coreIds.has(n.id)) return true;
  return n.dependencies.some(d => coreIds.has(d));
});

const output = `/**
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

export const GRAPH_NODES: DependencyNode[] = ${JSON.stringify(relevantNodes, null, 2)};

export function queryModuleRisk(searchTerm: string): DependencyNode[] {
  const term = searchTerm.toLowerCase();
  return GRAPH_NODES.filter(n => 
    n.label.toLowerCase().includes(term) || 
    n.id.toLowerCase().includes(term)
  );
}
`;

fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
fs.writeFileSync(OUT_PATH, output);
console.log('Successfully generated ' + OUT_PATH);
