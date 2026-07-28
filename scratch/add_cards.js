const fs = require('fs');
const filePath = 'd:/Apps_ykhoa/src/content/pathophysiology/co-che-benh-sinh.html';
let content = fs.readFileSync(filePath, 'utf8');

const sepsisCard = `
                                    <a href="pathophysiology-cases/slb-ccbs-sepsis.html" class="specialty-card">
                                        <div class="specialty-card-top">
                                            <div class="specialty-icon" style="background:rgba(220,38,38,0.12);color:#dc2626;"><i class="fa-solid fa-bacteria"></i></div>
                                            <div class="specialty-info">
                                                <h3>Sepsis &amp; Shock Sepsis</h3>
                                                <p>Mô hình Sepsis-3 vs SIRS, rối loạn ty thể PDH, tổn thương vi tuần hoàn NO/S1P/Endocan, suy giảm miễn dịch Immunoparalysis, hội chứng TAMOF và biến đổi dược động học PK.</p>
                                            </div>
                                        </div>
                                        <div class="specialty-card-action">
                                            <span>Xem bài học</span>
                                            <i class="fa-solid fa-arrow-right-long"></i>
                                        </div>
                                    </a>`;

if (!content.includes('slb-ccbs-sepsis.html')) {
    const target = 'href="pathophysiology-cases/slb-ccbs-suy-ho-hap.html" class="specialty-card"';
    const parts = content.split(target);
    if (parts.length === 2) {
        const endAnchorIdx = parts[1].indexOf('</a>');
        const insertPos = endAnchorIdx + 4;
        parts[1] = parts[1].slice(0, insertPos) + sepsisCard + parts[1].slice(insertPos);
        content = parts.join(target);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('SUCCESS: Sepsis card injected');
    } else {
        console.error('Target not found or ambiguous');
    }
} else {
    console.log('Sepsis card already present');
}
