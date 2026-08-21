const fs = require('fs');

// =========================================================
// 1. Cập nhật co-che-benh-sinh.html: tách 1 card thành 2
// =========================================================
const hubPath = 'd:/Apps_ykhoa/src/content/pathophysiology/co-che-benh-sinh.html';
let hub = fs.readFileSync(hubPath, 'utf8');

const oldCard = `                                    <a href="pathophysiology-cases/slb-ccbs-xhth.html" class="specialty-card">
                                        <div class="specialty-card-top">
                                            <div class="specialty-icon"><i class="fa-solid fa-droplet"></i></div>
                                            <div class="specialty-info">
                                                <h3>Xuất huyết tiêu hóa (UGIB &amp; LGIB)</h3>
                                                <p>Cơ chế vỡ giãn tĩnh mạch, acid/pepsin ly giải cục máu đông, phân loại Forrest, túi thừa, dị sản mạch &amp; nút mạch IR.</p>
                                            </div>
                                        </div>
                                        <div class="specialty-card-action">
                                            <span>Xem bài học</span>
                                            <i class="fa-solid fa-arrow-right-long"></i>
                                        </div>
                                    </a>`;

const newCards = `                                    <a href="pathophysiology-cases/slb-ccbs-xhth.html?tab=ugib" class="specialty-card">
                                        <div class="specialty-card-top">
                                            <div class="specialty-icon" style="background:rgba(220,38,38,0.12);color:#dc2626;"><i class="fa-solid fa-stomach"></i></div>
                                            <div class="specialty-info">
                                                <h3>Xuất huyết tiêu hóa Trên (UGIB)</h3>
                                                <p>Vỡ giãn TM cửa (Variceal), cơ chế acid/pepsin ly giải cục máu đông (PUD), phân loại Forrest &amp; PPI liều cao IV.</p>
                                            </div>
                                        </div>
                                        <div class="specialty-card-action">
                                            <span>Xem bài học</span>
                                            <i class="fa-solid fa-arrow-right-long"></i>
                                        </div>
                                    </a>
                                    <a href="pathophysiology-cases/slb-ccbs-xhth.html?tab=lgib" class="specialty-card">
                                        <div class="specialty-card-top">
                                            <div class="specialty-icon" style="background:rgba(217,119,6,0.12);color:#d97706;"><i class="fa-solid fa-circle-nodes"></i></div>
                                            <div class="specialty-info">
                                                <h3>Xuất huyết tiêu hóa Dưới (LGIB)</h3>
                                                <p>Chảy máu túi thừa (ĐM vỡ ồ ạt), dị sản mạch, Dieulafoy, Trĩ, thuốc chống đông &amp; nút mạch CTA/IR.</p>
                                            </div>
                                        </div>
                                        <div class="specialty-card-action">
                                            <span>Xem bài học</span>
                                            <i class="fa-solid fa-arrow-right-long"></i>
                                        </div>
                                    </a>`;

if (hub.includes(oldCard)) {
    hub = hub.replace(oldCard, newCards);
    // Update badge from 4 → 5
    hub = hub.replace(
        '<span class="part-count-badge">4</span>',
        '<span class="part-count-badge">5</span>'
    );
    fs.writeFileSync(hubPath, hub, 'utf8');
    console.log('✅ co-che-benh-sinh.html updated (2 cards + badge 5)');
} else {
    console.log('⚠️  Card pattern not found. Checking raw content...');
    const idx = hub.indexOf('slb-ccbs-xhth.html');
    if (idx !== -1) {
        console.log('Found xhth at index:', idx);
        console.log('Context:', hub.substring(idx - 100, idx + 300));
    }
}

// =========================================================
// 2. Cập nhật co-che-benh-sinh.html: tách 1 card thành 2
// =========================================================
const hubPath2 = 'd:/Apps_ykhoa/src/content/pathophysiology/co-che-benh-sinh.html';
let hub2 = fs.readFileSync(hubPath2, 'utf8');

if (hub2.includes('slb-ccbs-xhth.html') && !hub2.includes('tab=ugib')) {
    // Tìm và thay thế pattern trong co-che-benh-sinh.html (indent khác)
    const idx2 = hub2.indexOf('slb-ccbs-xhth.html');
    const blockStart = hub2.lastIndexOf('<a ', idx2);
    const blockEnd = hub2.indexOf('</a>', idx2) + 4;
    const oldBlock = hub2.substring(blockStart, blockEnd);
    console.log('\nOld block in co-che-benh-sinh.html:');
    console.log(oldBlock);

    const indent = '                                    ';
    const newCards2 = `${indent}<a href="pathophysiology-cases/slb-ccbs-xhth.html?tab=ugib" class="specialty-card">
${indent}    <div class="specialty-card-top">
${indent}        <div class="specialty-icon" style="background:rgba(220,38,38,0.12);color:#dc2626;"><i class="fa-solid fa-stomach"></i></div>
${indent}        <div class="specialty-info">
${indent}            <h3>Xuất huyết tiêu hóa Trên (UGIB)</h3>
${indent}            <p>Vỡ giãn TM cửa (Variceal), cơ chế acid/pepsin ly giải cục máu đông (PUD), phân loại Forrest &amp; PPI liều cao IV.</p>
${indent}        </div>
${indent}    </div>
${indent}    <div class="specialty-card-action">
${indent}        <span>Xem bài học</span>
${indent}        <i class="fa-solid fa-arrow-right-long"></i>
${indent}    </div>
${indent}</a>
${indent}<a href="pathophysiology-cases/slb-ccbs-xhth.html?tab=lgib" class="specialty-card">
${indent}    <div class="specialty-card-top">
${indent}        <div class="specialty-icon" style="background:rgba(217,119,6,0.12);color:#d97706;"><i class="fa-solid fa-circle-nodes"></i></div>
${indent}        <div class="specialty-info">
${indent}            <h3>Xuất huyết tiêu hóa Dưới (LGIB)</h3>
${indent}            <p>Chảy máu túi thừa (ĐM vỡ ồ ạt), dị sản mạch, Dieulafoy, Trĩ, thuốc chống đông &amp; nút mạch CTA/IR.</p>
${indent}        </div>
${indent}    </div>
${indent}    <div class="specialty-card-action">
${indent}        <span>Xem bài học</span>
${indent}        <i class="fa-solid fa-arrow-right-long"></i>
${indent}    </div>
${indent}</a>`;

    hub2 = hub2.substring(0, blockStart) + newCards2 + hub2.substring(blockEnd);
    fs.writeFileSync(hubPath2, hub2, 'utf8');
    console.log('✅ co-che-benh-sinh.html updated (2 cards)');
} else if (hub2.includes('tab=ugib')) {
    console.log('ℹ️  co-che-benh-sinh.html already has tab links');
} else {
    console.log('⚠️  co-che-benh-sinh.html - xhth card not found');
}
