const fs = require('fs');

const testText = "Ăn thuần chay giảm nguy cơ bệnh tim thiếu máu cục bộ 25%-30% vs Ăn chay giảm 20%-25%; Giảm 20%-50% tỷ lệ mắc đái tháo đường típ 2; Nhóm thuần chay giảm 8%-16% nguy cơ ung thư toàn bộ so với nhóm ăn mặn; Thực phẩm siêu chế biến thực vật làm tăng 20%-30% nguy cơ tử vong do mọi nguyên nhân";

// Load guidelines.js logic or eval relevant section
const code = fs.readFileSync('d:/Apps_ykhoa/src/content/ebm/guidelines/guidelines.js', 'utf8');

// Quick check if syntax in guidelines.js is valid JavaScript
try {
  new Function(code);
  console.log("✅ guidelines.js syntax check passed!");
} catch(e) {
  console.error("❌ guidelines.js syntax error:", e);
}
