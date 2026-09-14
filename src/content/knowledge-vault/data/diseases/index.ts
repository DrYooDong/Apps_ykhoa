/**
 * CliniPortal — Knowledge Vault Clinical Rules Diseases Registry
 * Tập hợp bệnh lý cốt lõi CDSS phân tách theo 9 chuyên khoa
 */

import hoHap from './ho-hap.json';
import timMach from './tim-mach.json';
import tieuHoa from './tieu-hoa.json';
import tietNieu from './tiet-nieu.json';
import noiTiet from './noi-tiet.json';
import thanKinh from './than-kinh.json';
import toanThan from './toan-than.json';
import sanPhuKhoa from './san-phu-khoa.json';
import truyenNhiem from './truyen-nhiem.json';

export {
  hoHap,
  timMach,
  tieuHoa,
  tietNieu,
  noiTiet,
  thanKinh,
  toanThan,
  sanPhuKhoa,
  truyenNhiem,
};

export const CLINICAL_RULES_DISEASES_BY_SPECIALTY = {
  'ho-hap': hoHap,
  'tim-mach': timMach,
  'tieu-hoa': tieuHoa,
  'tiet-nieu': tietNieu,
  'noi-tiet': noiTiet,
  'than-kinh': thanKinh,
  'toan-than': toanThan,
  'san-phu-khoa': sanPhuKhoa,
  'truyen-nhiem': truyenNhiem,
};

export const ALL_CLINICAL_RULES_DISEASES = [
  ...hoHap,
  ...timMach,
  ...tieuHoa,
  ...tietNieu,
  ...noiTiet,
  ...thanKinh,
  ...toanThan,
  ...sanPhuKhoa,
  ...truyenNhiem,
];

export default ALL_CLINICAL_RULES_DISEASES;
