/**
 * MERIDIANS DATABASE — 14 đường kinh mạch + 2 kỳ kinh
 * Waypoints dùng để vẽ SVG Path mượt trên viewBox 500×1000
 * Mỗi kinh có: front waypoints và/hoặc back waypoints
 */
const MERIDIANS = [
  {
    id: 'LU', name: 'Lung Meridian',
    name_vi: 'Kinh Thủ Thái Âm Phế', name_short: 'Phế',
    element: 'Kim', organ: 'Phổi',
    color: '#8B9DAF',
    description: 'Từ ngực, chạy dọc mặt trước-trong cánh tay, đến ngón tay cái.',
    totalPoints: 11,
    front_waypoints: [
      [178, 195], [165, 210], [152, 240], [140, 270], [128, 300], [120, 340], [115, 370], [112, 400], [108, 418], [100, 445], [92, 465]
    ],
    back_waypoints: null
  },
  {
    id: 'LI', name: 'Large Intestine Meridian',
    name_vi: 'Kinh Thủ Dương Minh Đại Trường', name_short: 'Đại trường',
    element: 'Kim', organ: 'Đại trường',
    color: '#A0AEC0',
    description: 'Từ ngón trỏ, lên mặt ngoài cánh tay, qua vai lên mặt.',
    totalPoints: 20,
    front_waypoints: [
      [88, 468], [92, 458], [98, 440], [105, 410], [112, 375], [118, 340], [122, 310], [124, 295], [132, 270], [142, 240], [155, 215], [168, 195], [185, 178], [210, 155], [225, 135], [232, 115], [238, 100], [240, 90], [238, 88]
    ],
    back_waypoints: null
  },
  {
    id: 'ST', name: 'Stomach Meridian',
    name_vi: 'Kinh Túc Dương Minh Vị', name_short: 'Vị',
    element: 'Thổ', organ: 'Dạ dày',
    color: '#D4A843',
    description: 'Từ mắt xuống mặt, xuống ngực bụng, dọc mặt trước chân đến ngón chân thứ 2.',
    totalPoints: 45,
    front_waypoints: [
      [234, 58], [230, 72], [225, 85], [222, 102], [228, 120], [230, 145], [232, 170], [230, 195], [228, 220], [225, 250], [224, 290], [225, 320], [225, 358], [222, 400], [220, 435], [218, 470], [218, 510], [218, 550], [218, 590], [216, 638], [215, 680], [212, 720], [210, 760], [208, 800], [210, 835], [210, 855]
    ],
    back_waypoints: null
  },
  {
    id: 'SP', name: 'Spleen Meridian',
    name_vi: 'Kinh Túc Thái Âm Tỳ', name_short: 'Tỳ',
    element: 'Thổ', organ: 'Lá lách',
    color: '#C9985A',
    description: 'Từ ngón chân cái, lên mặt trong chân, qua bụng đến ngực bên.',
    totalPoints: 21,
    front_waypoints: [
      [225, 860], [224, 845], [222, 825], [222, 805], [222, 765], [224, 720], [224, 680], [224, 638], [224, 618], [226, 580], [228, 540], [230, 500], [235, 465], [240, 435], [242, 400], [245, 360], [248, 320], [245, 290], [240, 268], [225, 252], [210, 248], [178, 268]
    ],
    back_waypoints: null
  },
  {
    id: 'HT', name: 'Heart Meridian',
    name_vi: 'Kinh Thủ Thiếu Âm Tâm', name_short: 'Tâm',
    element: 'Hỏa', organ: 'Tim',
    color: '#E74C3C',
    description: 'Từ tim, dọc mặt trong cánh tay đến ngón út.',
    totalPoints: 9,
    front_waypoints: [
      [192, 225], [180, 240], [165, 260], [150, 280], [138, 300], [128, 330], [118, 360], [110, 390], [104, 418], [95, 445], [86, 465]
    ],
    back_waypoints: null
  },
  {
    id: 'SI', name: 'Small Intestine Meridian',
    name_vi: 'Kinh Thủ Thái Dương Tiểu Trường', name_short: 'Tiểu trường',
    element: 'Hỏa', organ: 'Tiểu trường',
    color: '#C0392B',
    description: 'Từ ngón út, lên mặt ngoài cánh tay, qua bả vai lên mặt.',
    totalPoints: 19,
    front_waypoints: [
      [84, 468], [86, 458], [90, 440], [95, 415], [100, 390], [105, 360], [112, 330], [120, 300], [128, 270], [138, 240], [150, 215]
    ],
    back_waypoints: [
      [150, 215], [160, 200], [170, 188], [180, 180], [195, 172], [210, 165], [225, 155], [235, 148], [240, 138], [238, 128]
    ]
  },
  {
    id: 'BL', name: 'Bladder Meridian',
    name_vi: 'Kinh Túc Thái Dương Bàng Quang', name_short: 'Bàng quang',
    element: 'Thủy', organ: 'Bàng quang',
    color: '#2980B9',
    description: 'Từ mắt, qua đỉnh đầu, xuống lưng dọc cột sống, qua mông chân đến ngón chân út.',
    totalPoints: 67,
    front_waypoints: null,
    back_waypoints: [
      [234, 50], [238, 35], [242, 25], [248, 18], [250, 12], [252, 18], [255, 30], [252, 48], [248, 62], [244, 80], [240, 100], [238, 115], [236, 128], [234, 145], [240, 160], [242, 175], [238, 190], [232, 210], [228, 240], [228, 270], [228, 290], [228, 318], [228, 355], [228, 390], [228, 420], [226, 448], [222, 470], [220, 500], [218, 540], [218, 575], [218, 595], [218, 630], [216, 670], [212, 720], [208, 760], [206, 790], [204, 805], [202, 825], [200, 845], [198, 860]
    ]
  },
  {
    id: 'KI', name: 'Kidney Meridian',
    name_vi: 'Kinh Túc Thiếu Âm Thận', name_short: 'Thận',
    element: 'Thủy', organ: 'Thận',
    color: '#1A5276',
    description: 'Từ lòng bàn chân, lên mặt trong chân, qua bụng đến ngực.',
    totalPoints: 27,
    front_waypoints: [
      [220, 858], [220, 840], [220, 820], [220, 805], [222, 780], [222, 765], [224, 730], [224, 690], [226, 650], [226, 618], [228, 580], [230, 540], [234, 500], [238, 465], [242, 435], [246, 410], [248, 390], [250, 370], [250, 350], [248, 320], [246, 290], [244, 265], [242, 245], [240, 230]
    ],
    back_waypoints: null
  },
  {
    id: 'PC', name: 'Pericardium Meridian',
    name_vi: 'Kinh Thủ Quyết Âm Tâm Bào', name_short: 'Tâm bào',
    element: 'Hỏa', organ: 'Màng tim',
    color: '#E67E22',
    description: 'Từ ngực, dọc giữa mặt trong cánh tay đến ngón giữa.',
    totalPoints: 9,
    front_waypoints: [
      [195, 230], [182, 245], [168, 265], [155, 285], [140, 305], [130, 330], [120, 360], [110, 388], [106, 410], [100, 435], [92, 458]
    ],
    back_waypoints: null
  },
  {
    id: 'TE', name: 'Triple Warmer Meridian',
    name_vi: 'Kinh Thủ Thiếu Dương Tam Tiêu', name_short: 'Tam tiêu',
    element: 'Hỏa', organ: 'Tam tiêu',
    color: '#D35400',
    description: 'Từ ngón áp út, lên mặt ngoài cánh tay, qua vai lên tai.',
    totalPoints: 23,
    front_waypoints: [
      [90, 462], [95, 445], [100, 425], [105, 400], [108, 388], [112, 365], [118, 340], [125, 310], [130, 285], [138, 260], [148, 235], [160, 215], [175, 198]
    ],
    back_waypoints: [
      [175, 198], [185, 188], [198, 178], [215, 168], [228, 158], [235, 148], [238, 135], [236, 125], [232, 118], [228, 108], [225, 98], [222, 88], [220, 78], [218, 68]
    ]
  },
  {
    id: 'GB', name: 'Gallbladder Meridian',
    name_vi: 'Kinh Túc Thiếu Dương Đởm', name_short: 'Đởm',
    element: 'Mộc', organ: 'Túi mật',
    color: '#27AE60',
    description: 'Từ mắt ngoài, vòng quanh đầu-tai, xuống bên hông-chân đến ngón chân thứ 4.',
    totalPoints: 44,
    front_waypoints: [
      [215, 50], [210, 58], [205, 68], [208, 78], [215, 85], [220, 92], [218, 100], [212, 110], [208, 118], [200, 128], [195, 142], [190, 160], [185, 180], [180, 200], [176, 225], [174, 250], [172, 270], [175, 300], [178, 340], [180, 380], [178, 420], [178, 452], [182, 480], [188, 510], [195, 540], [200, 570], [205, 600], [208, 618], [210, 650], [210, 685], [208, 720], [206, 755], [205, 778], [204, 805], [202, 830], [200, 852], [198, 862]
    ],
    back_waypoints: null
  },
  {
    id: 'LR', name: 'Liver Meridian',
    name_vi: 'Kinh Túc Quyết Âm Can', name_short: 'Can',
    element: 'Mộc', organ: 'Gan',
    color: '#1E8449',
    description: 'Từ ngón chân cái, lên mặt trong chân, qua bụng dưới đến dưới núm vú.',
    totalPoints: 14,
    front_waypoints: [
      [222, 862], [220, 850], [218, 845], [218, 830], [218, 815], [220, 805], [222, 780], [224, 750], [226, 720], [228, 680], [230, 640], [232, 618], [236, 580], [240, 540], [244, 500], [248, 465], [250, 440], [248, 415], [245, 390], [242, 365], [238, 340], [235, 310], [230, 285], [225, 265], [218, 255], [210, 252]
    ],
    back_waypoints: null
  },
  {
    id: 'CV', name: 'Conception Vessel',
    name_vi: 'Nhâm Mạch', name_short: 'Nhâm',
    element: 'N/A', organ: 'N/A',
    color: '#8E44AD',
    description: 'Từ tầng sinh môn lên giữa mặt trước cơ thể đến cằm.',
    totalPoints: 24,
    front_waypoints: [
      [250, 455], [250, 435], [250, 420], [250, 398], [250, 378], [250, 358], [250, 340], [250, 320], [250, 312], [250, 290], [250, 270], [250, 250], [250, 232], [250, 215], [250, 195], [250, 178], [250, 162], [250, 148], [250, 135], [250, 108]
    ],
    back_waypoints: null
  },
  {
    id: 'GV', name: 'Governing Vessel',
    name_vi: 'Đốc Mạch', name_short: 'Đốc',
    element: 'N/A', organ: 'N/A',
    color: '#9B59B6',
    description: 'Từ xương cụt lên giữa lưng, qua đỉnh đầu xuống mũi-miệng.',
    totalPoints: 28,
    front_waypoints: [
      [250, 15], [250, 28], [250, 40], [250, 52], [250, 62], [250, 72], [250, 82], [250, 94], [250, 108]
    ],
    back_waypoints: [
      [250, 455], [250, 440], [250, 420], [250, 400], [250, 380], [250, 355], [250, 330], [250, 310], [250, 290], [250, 270], [250, 250], [250, 230], [250, 210], [250, 190], [250, 170], [250, 162], [250, 148], [250, 135], [250, 120], [250, 100], [250, 80], [250, 60], [250, 40], [250, 25], [250, 15]
    ]
  }
];

// Hàm tạo waypoints đối xứng (bên phải cơ thể) cho kinh song bên
function getMirroredMeridianWaypoints(waypoints) {
  if (!waypoints) return null;
  return waypoints.map(([x, y]) => [500 - x, y]);
}