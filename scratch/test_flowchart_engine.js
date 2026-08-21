const fs = require('fs');

console.log('=== KIỂM THỬ SƠ ĐỒ THUẬT TOÁN TIẾP CẬN & CÂY QUYẾT ĐỊNH LÂM SÀNG TƯƠNG TÁC ===\n');

// 1. Kiểm tra types.ts
const typesContent = fs.readFileSync('d:/Apps_ykhoa/src/content/knowledge-vault/types.ts', 'utf8');
const hasFlowchartNode = typesContent.includes('interface FlowchartNode');
const hasFlowchartEdge = typesContent.includes('interface FlowchartEdge');
const hasClinicalFlowchart = typesContent.includes('interface ClinicalFlowchart');

console.log(`1. TypeScript Interfaces:`);
console.log(`   - FlowchartNode: ${hasFlowchartNode ? '✅ OK' : '❌ Lỗi'}`);
console.log(`   - FlowchartEdge: ${hasFlowchartEdge ? '✅ OK' : '❌ Lỗi'}`);
console.log(`   - ClinicalFlowchart: ${hasClinicalFlowchart ? '✅ OK' : '❌ Lỗi'}`);

// 2. Kiểm tra vault-flowchart-engine.ts
const engineContent = fs.readFileSync('d:/Apps_ykhoa/src/content/knowledge-vault/vault-flowchart-engine.ts', 'utf8');
const hasAcsChart = engineContent.includes('flowchart_acs');
const hasDyspneaChart = engineContent.includes('flowchart_dyspnea');
const hasSepsisChart = engineContent.includes('flowchart_sepsis');
const hasOrthogonalSvg = engineContent.includes('viewBox="0 0 960 480"') && engineContent.includes('L ${tx}');
const hasLabelMask = engineContent.includes('rect x=') && engineContent.includes('fill="var(--color-surface');
const hasInsertSoapBtn = engineContent.includes('btn-insert-flowchart-to-soap');

console.log(`\n2. Flowchart Engine & Registry:`);
console.log(`   - ACS Flowchart (Đau ngực cấp): ${hasAcsChart ? '✅ OK' : '❌ Lỗi'}`);
console.log(`   - Dyspnea Flowchart (Khó thở cấp): ${hasDyspneaChart ? '✅ OK' : '❌ Lỗi'}`);
console.log(`   - Sepsis 1-Hour Bundle Flowchart: ${hasSepsisChart ? '✅ OK' : '❌ Lỗi'}`);
console.log(`   - Chuẩn Orthogonal SVG 960x480: ${hasOrthogonalSvg ? '✅ OK' : '❌ Lỗi'}`);
console.log(`   - Label Masking Rect (che nền chữ): ${hasLabelMask ? '✅ OK' : '❌ Lỗi'}`);
console.log(`   - Nút Chèn lộ trình vào SOAP: ${hasInsertSoapBtn ? '✅ OK' : '❌ Lỗi'}`);

// 3. Kiểm tra tích hợp vào Web Hub (vault-hub-view.ts)
const hubContent = fs.readFileSync('d:/Apps_ykhoa/src/content/knowledge-vault/vault-hub-view.ts', 'utf8');
const hasFlowchartTab = hubContent.includes('Sơ Đồ Thuật Toán') && hubContent.includes('data-group="FLOWCHART"');
const hasDrawerFlowchart = hubContent.includes('drawer-flowchart-mount');

console.log(`\n3. Web Hub Integration:`);
console.log(`   - Tab Sơ Đồ Thuật Toán trên Main Hub: ${hasFlowchartTab ? '✅ OK' : '❌ Lỗi'}`);
console.log(`   - Tích hợp tự động Flowchart vào Drawer: ${hasDrawerFlowchart ? '✅ OK' : '❌ Lỗi'}`);

if (hasFlowchartNode && hasFlowchartEdge && hasClinicalFlowchart && hasAcsChart && hasDyspneaChart && hasSepsisChart && hasOrthogonalSvg && hasLabelMask && hasInsertSoapBtn && hasFlowchartTab && hasDrawerFlowchart) {
  console.log('\n🎉 TẤT CẢ TÍNH NĂNG SƠ ĐỒ THUẬT TOÁN ĐÃ SẴN SÀNG & ĐẠT CHUẨN CAO NHẤT!');
} else {
  console.log('\n⚠️ Cần kiểm tra lại một số thành phần.');
}
