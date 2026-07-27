const fs = require('fs');
const path = require('path');

const GRAPH_PATH = path.join(__dirname, '../graphify-out/graph.json');
const REPORT_PATH = path.join(__dirname, '../graphify-out/GRAPH_REPORT.md');

function queryGraph(searchTerm) {
  if (!searchTerm) {
    console.log("Usage: node scratch/query_graph.js <search_term>");
    process.exit(1);
  }

  if (!fs.existsSync(GRAPH_PATH)) {
    console.error("Error: graph.json not found at " + GRAPH_PATH);
    process.exit(1);
  }

  console.log(`Searching Graphify graph for: "${searchTerm}"...\n`);
  const graphData = JSON.parse(fs.readFileSync(GRAPH_PATH, 'utf8'));
  const termLower = searchTerm.toLowerCase();

  // Find matching nodes
  const matchingNodes = graphData.nodes.filter(node => 
    (node.label && node.label.toLowerCase().includes(termLower)) ||
    (node.source_file && node.source_file.toLowerCase().includes(termLower)) ||
    (node.id && node.id.toLowerCase().includes(termLower))
  );

  if (matchingNodes.length === 0) {
    console.log(`No nodes matching "${searchTerm}" found in graph.json.`);
    return;
  }

  console.log(`Found ${matchingNodes.length} matching node(s):`);
  const nodeMap = new Map();
  graphData.nodes.forEach(n => nodeMap.set(n.id, n));

  const nodeIds = new Set(matchingNodes.map(n => n.id));

  matchingNodes.slice(0, 10).forEach(node => {
    console.log(` - ID: ${node.id}`);
    console.log(`   Label: ${node.label}`);
    console.log(`   File: ${node.source_file || 'N/A'}`);
    console.log(`   Community: ${node.community_name || node.community}\n`);
  });

  // Find edges
  const inbound = [];
  const outbound = [];

  graphData.links.forEach(link => {
    if (nodeIds.has(link.target)) {
      inbound.push(link);
    }
    if (nodeIds.has(link.source)) {
      outbound.push(link);
    }
  });

  console.log(`--- DEPENDENCY & RISK ANALYSIS ---`);
  console.log(`Inbound Dependencies (Who relies on this / Fan-in): ${inbound.length}`);
  console.log(`Outbound Dependencies (What this relies on / Fan-out): ${outbound.length}`);

  let riskLevel = 'LOW';
  if (inbound.length > 15) riskLevel = 'CRITICAL HUB (Modifying this risks breaking multiple features)';
  else if (inbound.length > 5) riskLevel = 'HIGH RISK (Requires regression testing across dependent files)';
  else if (inbound.length > 0) riskLevel = 'MEDIUM RISK';

  console.log(`Risk Assessment: ${riskLevel}\n`);

  if (inbound.length > 0) {
    console.log(`Inbound Edge Samples (Top 10 callers/dependents):`);
    inbound.slice(0, 10).forEach(l => {
      const srcNode = nodeMap.get(l.source);
      console.log(` - [${l.relation}] from ${srcNode ? srcNode.source_file || srcNode.label : l.source} (Line ${l.source_location || 'N/A'})`);
    });
    console.log('');
  }

  if (outbound.length > 0) {
    console.log(`Outbound Edge Samples (Top 10 calls/dependencies):`);
    outbound.slice(0, 10).forEach(l => {
      const tgtNode = nodeMap.get(l.target);
      console.log(` - [${l.relation}] to ${tgtNode ? tgtNode.source_file || tgtNode.label : l.target}`);
    });
  }
}

const queryArg = process.argv[2];
queryGraph(queryArg);
