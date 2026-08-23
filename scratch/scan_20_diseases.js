const fs = require('fs');
const catalog = JSON.parse(fs.readFileSync('src/content/knowledge-vault/data/vault-catalog.json', 'utf8'));

const candidates = [
  { key: 'hoi_chung_vanh_cap', name: 'Hội chứng vành cấp / Nhồi máu cơ tim (ACS/STEMI/NSTEMI)', code: 'I21.9', prefixes: ['I20', 'I21', 'I24', 'I25'], keys: ['vành', 'nhồi máu cơ tim', 'acs', 'stemi', 'nstemi', 'đau thắt ngực'] },
  { key: 'copd', name: 'Bệnh phổi tắc nghẽn mạn tính (COPD)', code: 'J44.9', prefixes: ['J44'], keys: ['copd', 'phổi tắc nghẽn', 'đợt cấp copd'] },
  { key: 'hen_phe_quan', name: 'Hen phế quản (Asthma)', code: 'J45.9', prefixes: ['J45'], keys: ['hen phế quản', 'asthma', 'cơn hen'] },
  { key: 'soc_nhiem_khuan', name: 'Sốc nhiễm khuẩn / Nhiễm khuẩn huyết (Sepsis / Septic Shock)', code: 'A41.9', prefixes: ['A40', 'A41', 'R65'], keys: ['nhiễm khuẩn huyết', 'sepsis', 'sốc nhiễm khuẩn', 'sofa'] },
  { key: 'xuat_huyet_tieu_hoa', name: 'Xuất huyết tiêu hóa trên (UGIB)', code: 'K92.2', prefixes: ['K92', 'K25', 'K26', 'I85'], keys: ['xuất huyết tiêu hóa', 'chảy máu tiêu hóa', 'nôn ra máu', 'đi cầu phân đen', 'forrest'] },
  { key: 'nhiem_toan_ceton_dka', name: 'Nhiễm toan Ceton do ĐTĐ (DKA) & HHS', code: 'E10.1', prefixes: ['E10.1', 'E11.1', 'E13.1'], keys: ['dka', 'ketoacidosis', 'ceton', 'tăng áp lực thẩm thấu', 'hhs'] },
  { key: 'con_bao_giap', name: 'Cơn bão giáp & Nhiễm độc giáp (Thyroid Storm)', code: 'E05.9', prefixes: ['E05'], keys: ['bão giáp', 'nhiễm độc giáp', 'cường giáp', 'basedow', 'graves'] },
  { key: 'suy_thuong_than_cap', name: 'Suy thượng thận cấp (Adrenal Crisis)', code: 'E27.2', prefixes: ['E27'], keys: ['suy thượng thận', 'cơn suy thượng thận', 'adrenal crisis'] },
  { key: 'viem_ruot_thua_cap', name: 'Viêm ruột thừa cấp (Acute Appendicitis)', code: 'K35.8', prefixes: ['K35'], keys: ['ruột thừa', 'viêm ruột thừa', 'alvarado'] },
  { key: 'viem_tui_mat_cap', name: 'Sỏi mật & Viêm túi mật cấp (Acute Cholecystitis)', code: 'K80.0', prefixes: ['K80', 'K81'], keys: ['túi mật', 'viêm túi mật', 'sỏi mật', 'tokyo guideline'] },
  { key: 'nhiem_trung_tiet_nieu', name: 'Nhiễm trùng đường tiết niệu & Viêm đài bể thận (UTI)', code: 'N39.0', prefixes: ['N39', 'N10', 'N30'], keys: ['nhiễm trùng tiểu', 'tiết niệu', 'viêm đài bể thận', 'uti'] },
  { key: 'viem_mang_nao_mu', name: 'Viêm màng não mủ & Viêm não (Meningitis)', code: 'G00.9', prefixes: ['G00', 'G03', 'G04'], keys: ['viêm màng não', 'màng não mủ', 'meningitis', 'dịch não tủy'] },
  { key: 'rung_nhi', name: 'Rung nhĩ & Loạn nhịp nhanh (Atrial Fibrillation)', code: 'I48.9', prefixes: ['I48'], keys: ['rung nhĩ', 'atrial fibrillation', 'afib', 'cha2ds2'] },
  { key: 'ha_natri_mau', name: 'Hạ Natri máu & Rối loạn điện giải (Hyponatremia)', code: 'E87.1', prefixes: ['E87'], keys: ['hạ natri', 'rối loạn điện giải', 'tăng kali', 'hạ kali', 'siadh'] },
  { key: 'viem_khop_gout', name: 'Viêm khớp Gout cấp & Mạn (Gout)', code: 'M10.9', prefixes: ['M10'], keys: ['gout', 'viêm khớp gút', 'acid uric', 'colchicine'] },
  { key: 'soc_phan_ve', name: 'Sốc phản vệ & Phản ứng phản vệ (Anaphylaxis)', code: 'T78.2', prefixes: ['T78.2', 'T78.0'], keys: ['sốc phản vệ', 'phản vệ', 'anaphylaxis', 'adrenaline'] },
  { key: 'tran_dich_tran_khi_mang_phoi', name: 'Tràn dịch & Tràn khí màng phổi (Effusion / Pneumothorax)', code: 'J90', prefixes: ['J90', 'J91', 'J93'], keys: ['tràn dịch màng phổi', 'tràn khí màng phổi', 'màng phổi', 'light'] },
  { key: 'viem_noi_tam_mac_nhiem_khuan', name: 'Viêm nội tâm mạc nhiễm khuẩn (Infective Endocarditis)', code: 'I33.0', prefixes: ['I33', 'I38'], keys: ['viêm nội tâm mạc', 'nội tâm mạc nhiễm khuẩn', 'duke', 'endocarditis'] },
  { key: 'hoi_chung_guillain_barre', name: 'Hội chứng Guillain-Barré & Nhược cơ (GBS)', code: 'G61.0', prefixes: ['G61', 'G70'], keys: ['guillain', 'nhược cơ', 'myasthenia', 'gbs'] },
  { key: 'ha_duong_huyet_cap', name: 'Hạ đường huyết cấp (Hypoglycemia)', code: 'E16.2', prefixes: ['E16.0', 'E16.1', 'E16.2'], keys: ['hạ đường huyết', 'hypoglycemia', 'whipple'] }
];

console.log('=== KẾT QUẢ QUÉT 20 BỆNH MỚI TRONG KHO TRI THỨC VAULT (2.362 BÀI) ===\n');
candidates.forEach((c, idx) => {
  const matched = catalog.filter(art => {
    const text = (art.title + ' ' + (art.snippet || '') + ' ' + (art.tags ? art.tags.join(' ') : '')).toLowerCase();
    return c.keys.some(k => text.includes(k));
  });
  console.log(`${idx + 1}. [${c.code}] ${c.name} -> ${matched.length} bài viết Vault`);
});
