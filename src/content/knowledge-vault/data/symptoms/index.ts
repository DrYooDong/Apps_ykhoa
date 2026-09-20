/**
 * CliniPortal — Knowledge Vault Clinical Rules Symptoms Registry
 * Tập hợp danh mục triệu chứng CDSS phân tách theo 12 hệ cơ quan / phân nhóm
 */

import toanThan from './toan-than.json';
import timMach from './tim-mach.json';
import hoHap from './ho-hap.json';
import tieuHoa from './tieu-hoa.json';
import tietNieu from './tiet-nieu.json';
import noiTiet from './noi-tiet.json';
import thanKinh from './than-kinh.json';
import daNiem from './da-niem.json';
import huyetHoc from './huyet-hoc.json';
import sanPhuKhoa from './san-phu-khoa.json';
import canLamSang from './can-lam-sang.json';
import tienCan from './tien-can.json';

export {
  toanThan,
  timMach,
  hoHap,
  tieuHoa,
  tietNieu,
  noiTiet,
  thanKinh,
  daNiem,
  huyetHoc,
  sanPhuKhoa,
  canLamSang,
  tienCan,
};

export const CLINICAL_RULES_SYMPTOMS_BY_SYSTEM = {
  'toan-than': toanThan,
  'tim-mach': timMach,
  'ho-hap': hoHap,
  'tieu-hoa': tieuHoa,
  'tiet-nieu': tietNieu,
  'noi-tiet': noiTiet,
  'than-kinh': thanKinh,
  'da-niem': daNiem,
  'huyet-hoc': huyetHoc,
  'san-phu-khoa': sanPhuKhoa,
  'can-lam-sang': canLamSang,
  'tien-can': tienCan,
};

export const ALL_CLINICAL_RULES_SYMPTOMS = [
  ...toanThan,
  ...timMach,
  ...hoHap,
  ...tieuHoa,
  ...tietNieu,
  ...noiTiet,
  ...thanKinh,
  ...daNiem,
  ...huyetHoc,
  ...sanPhuKhoa,
  ...canLamSang,
  ...tienCan,
];

export default ALL_CLINICAL_RULES_SYMPTOMS;
