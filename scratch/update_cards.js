const fs = require('fs');

const paths = [
    'd:/Apps_ykhoa/src/content/pathophysiology/co-che-benh-sinh.html',
    'd:/Apps_ykhoa/src/content/pathophysiology/co-che-benh-sinh.html'
];

const card = `
                                    <a href="pathophysiology-cases/slb-ccbs-xhth.html" class="specialty-card">
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

paths.forEach(p => {
    let content = fs.readFileSync(p, 'utf8');
    const anchor = 'pathophysiology-cases/slb-ccbs-xg.html';
    if (content.includes(anchor) && !content.includes('slb-ccbs-xhth.html')) {
        const idx = content.indexOf('</a>', content.indexOf(anchor));
        content = content.slice(0, idx + 4) + card + content.slice(idx + 4);
        fs.writeFileSync(p, content, 'utf8');
        console.log('Updated successfully:', p);
    } else {
        console.log('Already updated or anchor not found:', p);
    }
});
