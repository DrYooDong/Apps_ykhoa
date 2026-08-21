const fs = require('fs');
const path = require('path');
const base = 'd:/Apps_ykhoa/knowledge-vault';

const target4 = [
  '0. Giải phẫu & sinh lý',
  '0. Hóa sinh y học',
  '0. Kỹ năng',
  '0. Tiếp cận vấn đề lâm sàng'
];

let all4Files = [];

target4.forEach(target => {
  const root = path.join(base, target);
  if (!fs.existsSync(root)) return;

  function traverse(dir) {
    fs.readdirSync(dir, { withFileTypes: true }).forEach(entry => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        traverse(fullPath);
      } else {
        all4Files.push({
          targetFolder: target,
          relToTarget: path.relative(root, fullPath),
          fileName: entry.name,
          fullPath
        });
      }
    });
  }
  traverse(root);
});

console.log(`Total foundational files: ${all4Files.length}`);

function cleanName(str) {
  return str
    .replace(/^hoa_hoc_/i, '')
    .replace(/^chuyen_hoa_/i, '')
    .replace(/_phan_1$/i, '')
    .replace(/_phan_2$/i, '')
    .replace(/\(phần 1\)$/i, '')
    .replace(/\(phần 2\)$/i, '')
    .replace(/\(P1\)$/i, '')
    .replace(/\(P2\)$/i, '')
    .replace(/_P1$/i, '')
    .replace(/_P2$/i, '')
    .replace(/^(GP-SL|SL|TC|KN|HS)_/i, '')
    .replace(/^\d+(\.\d+)*\.\s*/, '')
    .replace(/_/g, ' ')
    .trim();
}

function classifyFoundational(f) {
  const target = f.targetFolder;
  const rel = f.relToTarget;
  const fileNameNoExt = path.parse(f.fileName).name;
  const parts = rel.split(path.sep);

  let kho = '';
  let subDir = '';
  let prefix = '';
  let part = 'P1';
  let subject = cleanName(fileNameNoExt);

  // Check part 1 / 2
  if (
    fileNameNoExt.includes('phan_2') || 
    fileNameNoExt.includes('phần 2') || 
    fileNameNoExt.includes('P2') || 
    fileNameNoExt.includes('(p2)')
  ) {
    part = 'P2';
  } else if (
    fileNameNoExt.includes('phan_3') || 
    fileNameNoExt.includes('phần 3') || 
    fileNameNoExt.includes('P3')
  ) {
    part = 'P3';
  }

  // 1. Giải phẫu & Sinh lý
  if (target === '0. Giải phẫu & sinh lý') {
    kho = 'Kho giải phẫu & sinh lý';
    prefix = 'GPSL';
    const sub = parts[0] || '';
    if (sub.includes('Tế bào') || sub.includes('Đại cương')) subDir = '01. Tế bào & Đại cương';
    else if (sub.includes('Cơ & Thần kinh')) subDir = '02. Thần kinh & Cơ';
    else if (sub.includes('Huyết học')) subDir = '03. Huyết học & Miễn dịch';
    else if (sub.includes('Tuần hoàn')) subDir = '04. Tuần hoàn & Tim mạch';
    else if (sub.includes('Hô hấp')) subDir = '05. Hô hấp';
    else if (sub.includes('Tiêu hóa')) subDir = '06. Tiêu hóa';
    else if (sub.includes('Thận')) subDir = '07. Thận - Tiết niệu & Toan kiềm';
    else if (sub.includes('Nội tiết')) subDir = '08. Nội tiết & Sinh sản';
    else if (sub.includes('trẻ em') || sub.includes('Tăng trưởng')) subDir = '09. Sinh lý phát triển Trẻ em';
    else subDir = '01. Tế bào & Đại cương';
  }

  // 2. Hóa sinh y học
  else if (target === '0. Hóa sinh y học') {
    kho = 'Kho hóa sinh y học';
    prefix = 'HS';
    const sub = parts[0] || '';
    if (sub.includes('block1')) subDir = 'Block 1 - Đại phân tử sinh học';
    else if (sub.includes('block2')) subDir = 'Block 2 - Xúc tác sinh học & Truyền tin';
    else if (sub.includes('block3')) subDir = 'Block 3 - Chuyển hóa năng lượng & Oxy hóa tế bào';
    else if (sub.includes('block4')) subDir = 'Block 4 - Chuyển hóa trung gian chất';
    else if (sub.includes('block5')) subDir = 'Block 5 - Di truyền phân tử & Sinh học phân tử';
    else if (sub.includes('block6')) subDir = 'Block 6 - Hóa sinh chuyển hóa cơ quan';
    else if (sub.includes('block7')) subDir = 'Block 7 - Hóa sinh lâm sàng & Xét nghiệm';
    else subDir = 'Block 1 - Đại phân tử sinh học';

    // Format biochem snake_case names into readable Vietnamese
    const biochemMap = {
      'hoa hoc glucid carbohydrates': 'Hóa học Glucid & Carbohydrate',
      'hoa hoc lipid lipoprotein mang': 'Hóa học Lipid & Lipoprotein',
      'hoa hoc acid amin peptid protein': 'Hóa học Acid amin, Peptid & Protein',
      'hoa hoc nucleotid acid nucleic': 'Hóa học Nucleotid & Acid nucleic',
      'hoa hoc hemoglobin myoglobin sac to ho hap': 'Hóa học Hemoglobin & Myoglobin',
      'hoa hoc nuoc ph can bang dien giai nen tang': 'Hóa học Nước, Điện giải & pH',
      'enzym hoc co ban van toc dong hoc uc che': 'Enzym học & Động học enzym',
      'co che xuc tac enzym coenzym vitamin': 'Cơ chế xúc tác Enzym & Vitamin Coenzym',
      'dieu hoa hoat tinh enzym allosteric cong hoa bien doi': 'Điều hòa hoạt tính Enzym',
      'truyen tin te bao thu the chat truyen tin thu hai': 'Truyền tin tế bào & Thụ thể',
      'hormon co che tac dung truc tuyen yen co quan dich': 'Cơ chế tác dụng của Hormon',
      'nhiet dong luc hoc sinh hoc lien ket giau nang luong atp': 'Nhiệt động lực học & Năng lượng ATP',
      'chuoi chuyen dien tu ty the phuc hop i iv': 'Chuỗi truyền điện tử ty thể',
      'phosphoryl hoa oxy hoa tong hop atp atp synthase': 'Phosphoryl hóa oxy hóa & ATP Synthase',
      'chu trinh acid citric krebs tca cycle': 'Chu trình Krebs (Citric Acid Cycle)',
      'cac dang oxy hoa hoat dong ros stress oxy hoa he thong chong oxy hoa': 'Stress oxy hóa & Gốc tự do ROS',
      'chuyen hoa glucid thoai hoa glucose duong phan': 'Chuyển hóa thoai hóa Glucose (Đường phân)',
      'chuyen hoa glucid chu trinh pentose phosphate glycogen': 'Chu trình Pentose Phosphate & Glycogen',
      'chuyen hoa glucid tan tao duong gluconeogenesis dieu hoa': 'Tân tạo đường (Gluconeogenesis)',
      'chuyen hoa lipid thoai hoa acid beo beta oxy hoa the ceton': 'Thoái hóa Acid béo & Thể Ceton',
      'chuyen hoa lipid tong hop acid beo triglycerid phospholipid': 'Tổng hợp Acid béo & Triglycerid',
      'chuyen hoa lipid cholesterol lipoprotein xo vua dong mach': 'Chuyển hóa Cholesterol & Xơ vữa',
      'chuyen hoa acid amin khu amin trao doi amin chu trinh ure': 'Chuyển hóa Acid amin & Chu trình Ure',
      'chuyen hoa carbon dac biet chu trinh folat s am': 'Chuyển hóa nhóm 1-Carbon & Folat',
      'chuyen hoa porphyrin tong hop thoai hoa hem vang da': 'Chuyển hóa Porphyrin, Hem & Bilirubin',
      'chuyen hoa purin pyrimidin tong hop thoai hoa acid uric': 'Chuyển hóa Purin, Pyrimidin & Acid uric',
      'tai ban dna co che sua sai dot bien': 'Tái bản DNA & Sửa sai đột biến',
      'phien ma tong hop rna xu ly post transcriptional': 'Phiên mã & Xử lý RNA',
      'dich ma tong hop protein ma di truyen ribosome': 'Dịch mã & Tổng hợp Protein',
      'dieu hoa bieu hien gen bieu truyen epigenetics': 'Điều hòa biểu hiện gen & Di truyền biểu sinh',
      'hoa sinh gan chuyen hoa chuyen hoa thuoc giai doc pha i ii': 'Hóa sinh Gan & Khử độc chuyển hóa thuốc',
      'hoa sinh than thang bang toan kiem bai tiet': 'Hóa sinh Thận & Thăng bằng toan kiềm',
      'hoa sinh mo co nao mo mo hong cau': 'Hóa sinh Mô cơ, Não, Mô mỡ & Hồng cầu',
      'xet nghiem enzym huyet thanh troponin ck mb ast alt alp ggt': 'Xét nghiệm Enzym huyết thanh & Dấu ấn tim gan',
      'xet nghiem danh gia chuc nang gan than lipid mau glucose mau': 'Xét nghiệm Đánh giá chức năng Gan, Thận, Lipid & Đường huyết',
      'khi mau dong manh dien giai do khoang trong anion gap': 'Khí máu động mạch & Điện giải đồ Anion Gap'
    };

    const norm = fileNameNoExt
      .replace(/_phan_\d+$/i, '')
      .replace(/_/g, ' ')
      .trim()
      .toLowerCase();

    if (biochemMap[norm]) {
      subject = biochemMap[norm];
    }
  }

  // 3. Kỹ năng lâm sàng
  else if (target === '0. Kỹ năng') {
    kho = 'Kho kỹ năng lâm sàng';
    prefix = 'KN';
    const sub = parts[0] || '';
    if (sub.includes('Bệnh án')) subDir = '01. Kỹ năng làm bệnh án & Biện luận';
    else if (sub.includes('khám')) subDir = '02. Kỹ năng thăm khám lâm sàng';
    else if (sub.includes('cận lâm sàng')) subDir = '03. Phân tích kết quả cận lâm sàng';
    else if (sub.includes('Thủ thuật') || sub.includes('Cấp cứu')) subDir = '04. Thủ thuật lâm sàng & Cấp cứu';
    else if (sub.includes('Quy chế') || sub.includes('ICD')) subDir = '05. Quy chế y tế & Mã hóa ICD-10';
    else if (sub.includes('Thiết kế')) subDir = '06. Thiết kế & Trực quan y khoa';
    else subDir = '01. Kỹ năng làm bệnh án & Biện luận';
  }

  // 4. Tiếp cận vấn đề lâm sàng
  else if (target === '0. Tiếp cận vấn đề lâm sàng') {
    kho = 'Kho tiếp cận lâm sàng';
    prefix = 'TC';
    const sub = parts[0] || '';
    if (sub.includes('Toàn thân') || sub.includes('00.')) subDir = '01. Toàn thân & Cấp cứu';
    else if (sub.includes('Thần kinh')) subDir = '02. Thần kinh';
    else if (sub.includes('Tim mạch')) subDir = '03. Tim mạch';
    else if (sub.includes('Hô hấp')) subDir = '04. Hô hấp';
    else if (sub.includes('Tiêu hóa')) subDir = '05. Tiêu hóa & Gan mật';
    else if (sub.includes('Thận')) subDir = '06. Thận - Tiết niệu';
    else if (sub.includes('Máu') || sub.includes('Miễn dịch')) subDir = '07. Huyết học & Miễn dịch';
    else if (sub.includes('Cơ xương khớp')) subDir = '08. Cơ xương khớp';
    else if (sub.includes('Da')) subDir = '09. Da liễu';
    else if (sub.includes('Nội Tiết')) subDir = '10. Nội tiết & Chuyển hóa';
    else if (sub.includes('Nhi khoa')) subDir = '11. Nhi khoa';
    else subDir = '01. Toàn thân & Cấp cứu';
  }

  if (fileNameNoExt.startsWith('MOC')) {
    subject = fileNameNoExt.replace(/^MOC\s*-\s*/i, '');
    part = 'MOC';
  }

  const newFileName = `${prefix}_${subject}_${part}.md`.replace(/\s+/g, ' ');
  return {
    kho,
    subDir,
    prefix,
    subject,
    part,
    newFileName,
    targetRelPath: path.join(kho, subDir, newFileName),
    originalRel: path.join(target, rel),
    fullPath: f.fullPath
  };
}

const list = all4Files.map(classifyFoundational);

// Resolve collisions
const destMap = {};
list.forEach(item => {
  let fullTarget = item.targetRelPath;
  if (destMap[fullTarget]) {
    let count = 2;
    let candidate = path.join(item.kho, item.subDir, `${item.prefix}_${item.subject}_P${count}.md`);
    while (destMap[candidate]) {
      count++;
      candidate = path.join(item.kho, item.subDir, `${item.prefix}_${item.subject}_P${count}.md`);
    }
    item.part = `P${count}`;
    item.newFileName = `${item.prefix}_${item.subject}_P${count}.md`;
    fullTarget = candidate;
    item.targetRelPath = fullTarget;
  }
  destMap[fullTarget] = item.originalRel;
});

console.log(`\nProcessed ${list.length} files. Total unique destinations: ${Object.keys(destMap).length}`);

const summary = {};
list.forEach(i => {
  summary[i.kho] = (summary[i.kho] || 0) + 1;
});
console.log('\n--- Thống kê 4 Kho Cơ sở & Lâm sàng ---');
console.log(JSON.stringify(summary, null, 2));

console.log('\n--- Mẫu chuyển đổi cho từng Kho ---');
Object.keys(summary).forEach(k => {
  console.log(`\n=== ${k} ===`);
  list.filter(i => i.kho === k).slice(0, 4).forEach(i => {
    console.log(`OLD: ${i.originalRel}`);
    console.log(`NEW: ${i.targetRelPath}\n`);
  });
});
