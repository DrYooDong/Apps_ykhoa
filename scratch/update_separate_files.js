const fs = require('fs');

// 1. Update co-che-benh-sinh.html
const p1 = 'd:/Apps_ykhoa/src/content/pathophysiology/co-che-benh-sinh.html';
let c1 = fs.readFileSync(p1, 'utf8');
c1 = c1.replace(/slb-ccbs-xhth\.html\?tab=ugib/g, 'slb-ccbs-xhth-tren.html');
c1 = c1.replace(/slb-ccbs-xhth\.html\?tab=lgib/g, 'slb-ccbs-xhth-duoi.html');
fs.writeFileSync(p1, c1, 'utf8');
console.log('Updated co-che-benh-sinh.html');

// 2. Update sinhly-sinhlybenh.html
const p2 = 'd:/Apps_ykhoa/src/content/pathophysiology/sinhly-sinhlybenh.html';
let c2 = fs.readFileSync(p2, 'utf8');
c2 = c2.replace(/slb-ccbs-xhth\.html\?tab=ugib/g, 'slb-ccbs-xhth-tren.html');
c2 = c2.replace(/slb-ccbs-xhth\.html\?tab=lgib/g, 'slb-ccbs-xhth-duoi.html');
fs.writeFileSync(p2, c2, 'utf8');
console.log('Updated sinhly-sinhlybenh.html');

// 3. Update physio-catalog.json
const p3 = 'd:/Apps_ykhoa/src/content/pathophysiology/data/physio-catalog.json';
let c3 = JSON.parse(fs.readFileSync(p3, 'utf8'));
c3.articles = c3.articles.filter(a => a.id !== 'SLB_CCBS_XHTH' && a.id !== 'SLB_CCBS_XHTH_TREN' && a.id !== 'SLB_CCBS_XHTH_DUOI');
c3.articles.push({
    "id": "SLB_CCBS_XHTH_TREN",
    "category_id": "slb_ccbs",
    "title": "Sinh lý bệnh Xuất huyết Tiêu hóa trên (UGIB)",
    "subtitle": "Cơ chế vỡ giãn tĩnh mạch cửa, acid/pepsin ly giải cục máu đông, phân loại Forrest & PPI liều cao",
    "format": "html",
    "path": "pathophysiology-cases/slb-ccbs-xhth-tren.html",
    "tags": ["Tiêu hóa", "Xuất huyết tiêu hóa trên", "UGIB", "Forrest", "Variceal", "PUD"],
    "difficulty": "Lâm sàng",
    "read_time": "20 phút"
});
c3.articles.push({
    "id": "SLB_CCBS_XHTH_DUOI",
    "category_id": "slb_ccbs",
    "title": "Sinh lý bệnh Xuất huyết Tiêu hóa dưới (LGIB)",
    "subtitle": "Cơ chế chảy máu túi thừa, dị sản mạch, Dieulafoy, trĩ, thuốc chống đông & nút mạch IR",
    "format": "html",
    "path": "pathophysiology-cases/slb-ccbs-xhth-duoi.html",
    "tags": ["Tiêu hóa", "Xuất huyết tiêu hóa dưới", "LGIB", "Túi thừa", "CTA", "Oakland"],
    "difficulty": "Lâm sàng",
    "read_time": "18 phút"
});
fs.writeFileSync(p3, JSON.stringify(c3, null, 2), 'utf8');
console.log('Updated physio-catalog.json');
