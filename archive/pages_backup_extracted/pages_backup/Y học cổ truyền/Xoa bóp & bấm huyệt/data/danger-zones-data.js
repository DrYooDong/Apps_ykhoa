/**
 * DANGER ZONES — Vùng cảnh báo nguy hiểm khi châm cứu
 * Dùng cho Layer 4 (Heatmap)
 * ViewBox: 0 0 500 1000
 */
const DANGER_ZONES = [
  {
    id: 'dz-lungs-front',
    name: 'Phổi (mặt trước)',
    description: 'Nguy cơ tràn khí màng phổi (pneumothorax) khi châm quá sâu vùng ngực trên.',
    risk_level: 'danger',
    view: 'front',
    region: 'chest-abdomen',
    shape: 'ellipse',
    cx: 210, cy: 210, rx: 45, ry: 35
  },
  {
    id: 'dz-lungs-front-r',
    name: 'Phổi phải (mặt trước)',
    description: 'Nguy cơ tràn khí màng phổi khi châm quá sâu vùng ngực trên bên phải.',
    risk_level: 'danger',
    view: 'front',
    region: 'chest-abdomen',
    shape: 'ellipse',
    cx: 290, cy: 210, rx: 45, ry: 35
  },
  {
    id: 'dz-lungs-back',
    name: 'Phổi (mặt sau)',
    description: 'Nguy cơ tràn khí màng phổi khi châm các huyệt Du (BL13-BL17) quá sâu.',
    risk_level: 'danger',
    view: 'back',
    region: 'back',
    shape: 'ellipse',
    cx: 220, cy: 225, rx: 40, ry: 40
  },
  {
    id: 'dz-lungs-back-r',
    name: 'Phổi phải (mặt sau)',
    description: 'Nguy cơ tràn khí màng phổi khi châm các huyệt Du bên phải quá sâu.',
    risk_level: 'danger',
    view: 'back',
    region: 'back',
    shape: 'ellipse',
    cx: 280, cy: 225, rx: 40, ry: 40
  },
  {
    id: 'dz-heart',
    name: 'Tim',
    description: 'Vùng tim nằm sau xương ức và sụn sườn trái. Châm quá sâu có thể gây chèn ép hoặc tổn thương màng tim.',
    risk_level: 'danger',
    view: 'front',
    region: 'chest-abdomen',
    shape: 'ellipse',
    cx: 235, cy: 240, rx: 20, ry: 22
  },
  {
    id: 'dz-liver',
    name: 'Gan',
    description: 'Gan nằm dưới bờ sườn phải. Châm huyệt Kỳ Môn (LR14) bên phải quá sâu tăng nguy cơ tổn thương nhu mô gan.',
    risk_level: 'caution',
    view: 'front',
    region: 'chest-abdomen',
    shape: 'ellipse',
    cx: 295, cy: 275, rx: 30, ry: 22
  },
  {
    id: 'dz-spleen',
    name: 'Lách',
    description: 'Lách nằm dưới bờ sườn trái. Châm huyệt Kỳ Môn (LR14) bên trái quá sâu tăng nguy cơ tổn thương lách.',
    risk_level: 'caution',
    view: 'front',
    region: 'chest-abdomen',
    shape: 'ellipse',
    cx: 195, cy: 270, rx: 22, ry: 18
  },
  {
    id: 'dz-kidney-l',
    name: 'Thận trái',
    description: 'Châm huyệt Thận Du (BL23) quá sâu (>2 thốn) có thể tổn thương nhu mô thận.',
    risk_level: 'caution',
    view: 'back',
    region: 'back',
    shape: 'ellipse',
    cx: 225, cy: 355, rx: 20, ry: 18
  },
  {
    id: 'dz-kidney-r',
    name: 'Thận phải',
    description: 'Châm huyệt Thận Du (BL23) quá sâu (>2 thốn) có thể tổn thương nhu mô thận.',
    risk_level: 'caution',
    view: 'back',
    region: 'back',
    shape: 'ellipse',
    cx: 275, cy: 355, rx: 20, ry: 18
  },
  {
    id: 'dz-spinal-cord',
    name: 'Tủy sống',
    description: 'Đường Đốc mạch chạy dọc cột sống. Châm quá sâu các huyệt hệ GV nguy cơ đâm thấu vào cấu trúc tủy sống.',
    risk_level: 'danger',
    view: 'back',
    region: 'back',
    shape: 'rect',
    x: 244, y: 155, width: 12, height: 260
  },
  {
    id: 'dz-carotid',
    name: 'Động mạch cảnh',
    description: 'Động mạch cảnh chạy dọc hai bên cổ. Tuyệt đối tránh châm sâu vào vùng cổ bên.',
    risk_level: 'danger',
    view: 'front',
    region: 'head-neck',
    shape: 'ellipse',
    cx: 235, cy: 138, rx: 8, ry: 18
  },
  {
    id: 'dz-carotid-r',
    name: 'Động mạch cảnh phải',
    description: 'Động mạch cảnh chạy dọc hai bên cổ phải.',
    risk_level: 'danger',
    view: 'front',
    region: 'head-neck',
    shape: 'ellipse',
    cx: 265, cy: 138, rx: 8, ry: 18
  },
  {
    id: 'dz-popliteal',
    name: 'Hố khoeo',
    description: 'Chứa động mạch khoeo và thần kinh chày. Huyệt Ủy Trung (BL40) cần châm đúng độ sâu lâm sàng.',
    risk_level: 'caution',
    view: 'back',
    region: 'lower-limb',
    shape: 'ellipse',
    cx: 218, cy: 595, rx: 15, ry: 12
  },
  {
    id: 'dz-popliteal-r',
    name: 'Hố khoeo phải',
    description: 'Chứa động mạch khoeo phải và thần kinh chày.',
    risk_level: 'caution',
    view: 'back',
    region: 'lower-limb',
    shape: 'ellipse',
    cx: 282, cy: 595, rx: 15, ry: 12
  },
  {
    id: 'dz-brainstem',
    name: 'Thân não / Hành tủy',
    description: 'Vùng huyệt Phong Trì (GB20), Á Môn (GV15), Phong Phủ (GV16) rất gần hành tủy. Châm sai hướng hoặc quá sâu CÓ THỂ GÂY TỬ VONG.',
    risk_level: 'danger',
    view: 'back',
    region: 'head-neck',
    shape: 'ellipse',
    cx: 250, cy: 120, rx: 28, ry: 15
  }
];