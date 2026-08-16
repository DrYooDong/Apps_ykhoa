/**
 * ACUPOINTS DATABASE — Dữ liệu huyệt vị chủ chốt
 * Nguồn: Atlas Of Acupuncture Points (AcupunctureProducts.com, 2007)
 * ViewBox: 0 0 500 1000
 */
const ACUPOINTS = [
  // ═══════════════════════════════════════════════
  //  LUNG MERIDIAN (LU) — Kinh Thủ Thái Âm Phế
  // ═══════════════════════════════════════════════
  {
    id: 'LU1', name_vi: 'Trung Phủ', name_pinyin: 'Zhōngfǔ 中府',
    meridian_id: 'LU', region: 'chest-abdomen', view: 'front',
    anatomy_location: 'Cách đường giữa trước 6 thốn, ngang mức khoang liên sườn 1, dưới huyệt Vân Môn (LU2) 1 thốn.',
    anatomy_depth: 'Cơ ngực lớn, cơ ngực bé; động mạch ngực ngoài; thần kinh ngực trước.',
    clinical_indications: ['Ho', 'Hen suyễn', 'Đau ngực', 'Đau vai trước', 'Viêm phế quản'],
    needling_depth: 'Châm xiên 0,5-0,8 thốn',
    danger_level: 'caution',
    danger_note: 'Châm xiên tránh phổi (nguy cơ tràn khí màng phổi)',
    coordinates: { front: { x: 178, y: 195 } }
  },
  {
    id: 'LU5', name_vi: 'Xích Trạch', name_pinyin: 'Chǐzé 尺泽',
    meridian_id: 'LU', region: 'upper-limb', view: 'front',
    anatomy_location: 'Trên nếp lằn khuỷu tay, tại chỗ lõm phía ngoài gân cơ nhị đầu cánh tay.',
    anatomy_depth: 'Gân cơ nhị đầu cánh tay, cơ cánh tay quay; động mạch quặt ngược quay; thần kinh bì cẳng tay ngoài, thần kinh quay.',
    clinical_indications: ['Ho', 'Ho ra máu', 'Hen suyễn', 'Viêm họng', 'Đau khuỷu tay', 'Bệnh hô hấp'],
    needling_depth: 'Châm thẳng 0,5-0,8 thốn',
    danger_level: 'safe',
    coordinates: { front: { x: 128, y: 300 } }
  },
  {
    id: 'LU7', name_vi: 'Liệt Khuyết', name_pinyin: 'Lièquē 列缺',
    meridian_id: 'LU', region: 'upper-limb', view: 'front',
    anatomy_location: 'Phía trên nếp lằn cổ tay 1,5 thốn, phía trên mỏm trâm quay.',
    anatomy_depth: 'Cơ cánh tay quay, cơ giạng dài ngón cái; tĩnh mạch đầu; thần kinh bì cẳng tay ngoài, nhánh nông của thần kinh quay.',
    clinical_indications: ['Đau đầu', 'Cứng gáy', 'Ho', 'Hen suyễn', 'Đau cổ tay', 'Liệt mặt'],
    needling_depth: 'Châm xiên 0,3-0,5 thốn',
    danger_level: 'safe',
    coordinates: { front: { x: 112, y: 400 } }
  },
  {
    id: 'LU9', name_vi: 'Thái Uyên', name_pinyin: 'Tàiyuān 太渊',
    meridian_id: 'LU', region: 'upper-limb', view: 'front',
    anatomy_location: 'Trên nếp lằn cổ tay, ở phía ngoài động mạch quay.',
    anatomy_depth: 'Gân cơ giạng dài ngón cái; động mạch quay; thần kinh bì cẳng tay ngoài, nhánh nông của thần kinh quay.',
    clinical_indications: ['Ho', 'Hen suyễn', 'Đau ngực', 'Mạch yếu', 'Đau cổ tay'],
    needling_depth: 'Châm thẳng 0,2-0,3 thốn',
    danger_level: 'caution',
    danger_note: 'Tránh động mạch quay',
    coordinates: { front: { x: 106, y: 420 } }
  },

  // ═══════════════════════════════════════════════
  //  LARGE INTESTINE (LI) — Kinh Thủ Dương Minh Đại Trường
  // ═══════════════════════════════════════════════
  {
    id: 'LI4', name_vi: 'Hợp Cốc', name_pinyin: 'Héɡǔ 合谷',
    meridian_id: 'LI', region: 'upper-limb', view: 'front',
    anatomy_location: 'Ở mu bàn tay, giữa xương bàn tay thứ 1 và thứ 2, tại trung điểm bờ quay của xương bàn tay thứ 2.',
    anatomy_depth: 'Cơ gian cốt mu tay thứ nhất, cơ khép ngón cái; mạng lưới tĩnh mạch mu tay; nhánh nông của thần kinh quay.',
    clinical_indications: ['Đau đầu', 'Đau răng', 'Đau mặt', 'Viêm họng', 'Sốt', 'Liệt mặt', 'Mắt đỏ', 'Nghẹt mũi', 'Giảm đau toàn thân'],
    needling_depth: 'Châm thẳng 0,5-1,0 thốn',
    danger_level: 'safe',
    coordinates: { front: { x: 92, y: 458 } }
  },
  {
    id: 'LI11', name_vi: 'Khúc Trì', name_pinyin: 'Qūchí 曲池',
    meridian_id: 'LI', region: 'upper-limb', view: 'front',
    anatomy_location: 'Tại tận cùng phía ngoài của nếp lằn khuỷu tay, trung điểm của đường nối huyệt Xích Trạch (LU5) và mỏm trên lồi cầu ngoài xương cánh tay.',
    anatomy_depth: 'Cơ duỗi cổ tay quay dài, cơ ngửa; động mạch quặt ngược quay; thần kinh bì cẳng tay sau, thần kinh quay.',
    clinical_indications: ['Đau khuỷu tay', 'Liệt chi trên', 'Sốt', 'Cao huyết áp', 'Mày đay', 'Dị ứng da'],
    needling_depth: 'Châm thẳng 1,0-1,5 thốn',
    danger_level: 'safe',
    coordinates: { front: { x: 122, y: 295 } }
  },
  {
    id: 'LI20', name_vi: 'Nghênh Hương', name_pinyin: 'Yínɡxiānɡ 迎香',
    meridian_id: 'LI', region: 'head-neck', view: 'front',
    anatomy_location: 'Trong rãnh mũi má, ngang mức trung điểm bờ ngoài cánh mũi.',
    anatomy_depth: 'Cơ nâng môi trên; động mạch và tĩnh mạch góc; nhánh má của thần kinh mặt, thần kinh dưới ổ mắt.',
    clinical_indications: ['Nghẹt mũi', 'Chảy máu mũi', 'Liệt mặt', 'Viêm xoang', 'Mất khứu giác'],
    needling_depth: 'Châm xiên 0,3-0,5 thốn',
    danger_level: 'safe',
    coordinates: { front: { x: 238, y: 88 } }
  },

  // ═══════════════════════════════════════════════
  //  STOMACH (ST) — Kinh Túc Dương Minh Vị
  // ═══════════════════════════════════════════════
  {
    id: 'ST6', name_vi: 'Giáp Xa', name_pinyin: 'Jiáchē 颊车',
    meridian_id: 'ST', region: 'head-neck', view: 'front',
    anatomy_location: 'Cách góc xương hàm dưới một khoát ngón tay về phía trước và phía trên, ngay chỗ cơ cắn nổi lên cao nhất khi cắn chặt răng.',
    anatomy_depth: 'Cơ cắn; động mạch cơ cắn; thần kinh tai lớn, thần kinh mặt.',
    clinical_indications: ['Đau răng', 'Sưng má', 'Liệt mặt', 'Đau hàm'],
    needling_depth: 'Châm thẳng 0,3-0,5 thốn',
    danger_level: 'safe',
    coordinates: { front: { x: 222, y: 102 } }
  },
  {
    id: 'ST25', name_vi: 'Thiên Khu', name_pinyin: 'Tiānshū 天枢',
    meridian_id: 'ST', region: 'chest-abdomen', view: 'front',
    anatomy_location: 'Từ trung tâm rốn đo ngang ra ngoài 2 thốn.',
    anatomy_depth: 'Cơ thẳng bụng; các nhánh của động mạch thượng vị trên và dưới; thần kinh liên sườn thứ 10.',
    clinical_indications: ['Đau bụng', 'Tiêu chảy', 'Táo bón', 'Rối loạn kinh nguyệt', 'Viêm ruột'],
    needling_depth: 'Châm thẳng 0,7-1,2 thốn',
    danger_level: 'safe',
    coordinates: { front: { x: 225, y: 358 } }
  },
  {
    id: 'ST36', name_vi: 'Túc Tam Lý', name_pinyin: 'Zúsānlǐ 足三里',
    meridian_id: 'ST', region: 'lower-limb', view: 'front',
    anatomy_location: 'Dưới huyệt Độc Tỵ (ST35) 3 thốn, cách mào trước xương chày một khoát ngón tay, trong cơ chày trước.',
    anatomy_depth: 'Cơ chày trước; động mạch chày trước; thần kinh mác sâu, nhánh bì của thần kinh bắp chân ngoài.',
    clinical_indications: ['Đau dạ dày', 'Nôn mửa', 'Tiêu chảy', 'Táo bón', 'Mệt mỏi', 'Suy nhược', 'Tăng miễn dịch', 'Đau gối'],
    needling_depth: 'Châm thẳng 1,0-2,0 thốn',
    danger_level: 'safe',
    coordinates: { front: { x: 216, y: 638 } }
  },
  {
    id: 'ST44', name_vi: 'Nội Đình', name_pinyin: 'Nèitínɡ 内庭',
    meridian_id: 'ST', region: 'lower-limb', view: 'front',
    anatomy_location: 'Ngay phía sau kẽ ngón chân, giữa ngón chân thứ 2 và thứ 3.',
    anatomy_depth: 'Cơ gian cốt mu chân thứ 2 và 3; động mạch mu ngón chân; thần kinh mác nông.',
    clinical_indications: ['Đau răng', 'Đau họng', 'Chảy máu mũi', 'Đau bụng', 'Tiêu chảy'],
    needling_depth: 'Châm thẳng 0,3-0,5 thốn',
    danger_level: 'safe',
    coordinates: { front: { x: 210, y: 855 } }
  },

  // ═══════════════════════════════════════════════
  //  SPLEEN (SP) — Kinh Túc Thái Âm Tỳ
  // ═══════════════════════════════════════════════
  {
    id: 'SP6', name_vi: 'Tam Âm Giao', name_pinyin: 'Sānyīnjiāo 三阴交',
    meridian_id: 'SP', region: 'lower-limb', view: 'front',
    anatomy_location: 'Từ đỉnh mắt cá trong đo thẳng lên 3 thốn, sát bờ sau xương chày.',
    anatomy_depth: 'Cơ gấp dài các ngón chân; động mạch chày sau và tĩnh mạch hiển lớn; thần kinh bì cẳng chân trong, thần kinh chày.',
    clinical_indications: ['Rối loạn kinh nguyệt', 'Đau bụng kinh', 'Vô sinh', 'Mất ngủ', 'Phù', 'Tiêu chảy', 'Đau bụng dưới'],
    needling_depth: 'Châm thẳng 1,0-1,5 thốn',
    danger_level: 'safe',
    coordinates: { front: { x: 222, y: 765 } }
  },
  {
    id: 'SP9', name_vi: 'Âm Lăng Tuyền', name_pinyin: 'Yīnlínɡquán 阴陵泉',
    meridian_id: 'SP', region: 'lower-limb', view: 'front',
    anatomy_location: 'Ở bờ dưới lồi cầu trong xương chày, tại chỗ lõm giữa bờ sau xương chày và cơ bụng chân.',
    anatomy_depth: 'Cơ bụng chân, cơ dép; động mạch gối dưới trong; thần kinh bì bắp chân trong.',
    clinical_indications: ['Phù', 'Tiểu khó', 'Tiêu chảy', 'Đau gối', 'Vàng da'],
    needling_depth: 'Châm thẳng 1,0-2,0 thốn',
    danger_level: 'safe',
    coordinates: { front: { x: 224, y: 618 } }
  },
  {
    id: 'SP21', name_vi: 'Đại Bao', name_pinyin: 'Dàbāo 大包',
    meridian_id: 'SP', region: 'chest-abdomen', view: 'front',
    anatomy_location: 'Trên đường nách giữa, thuộc khoang liên sườn thứ 6.',
    anatomy_depth: 'Cơ răng trước; động mạch ngực lưng; thần kinh liên sườn thứ 6, thần kinh ngực dài.',
    clinical_indications: ['Đau ngực', 'Đau sườn', 'Hen suyễn', 'Đau toàn thân'],
    needling_depth: 'Châm xiên 0,3-0,5 thốn',
    danger_level: 'caution',
    danger_note: 'Châm xiên tránh tổn thương phổi',
    coordinates: { front: { x: 168, y: 268 } }
  },

  // ═══════════════════════════════════════════════
  //  HEART (HT) — Kinh Thủ Thiếu Âm Tâm
  // ═══════════════════════════════════════════════
  {
    id: 'HT7', name_vi: 'Thần Môn', name_pinyin: 'Shénmén 神门',
    meridian_id: 'HT', region: 'upper-limb', view: 'front',
    anatomy_location: 'Tại tận cùng phía xương trụ của nếp lằn cổ tay, chỗ lõm ở bờ quay gân cơ gấp cổ tay trụ.',
    anatomy_depth: 'Gân cơ gấp cổ tay trụ; động mạch trụ; thần kinh bì cẳng tay trong, thần kinh trụ.',
    clinical_indications: ['Mất ngủ', 'Hồi hộp', 'Lo âu', 'Hay quên', 'Đau tim', 'Động kinh'],
    needling_depth: 'Châm thẳng 0,3-0,5 thốn',
    danger_level: 'caution',
    danger_note: 'Gần động mạch trụ',
    coordinates: { front: { x: 104, y: 418 } }
  },

  // ═══════════════════════════════════════════════
  //  SMALL INTESTINE (SI) — Kinh Thủ Thái Dương Tiểu Trường
  // ═══════════════════════════════════════════════
  {
    id: 'SI3', name_vi: 'Hậu Khê', name_pinyin: 'Hòuxī 后溪',
    meridian_id: 'SI', region: 'upper-limb', view: 'front',
    anatomy_location: 'Khi nắm hờ bàn tay, huyệt nằm ở tận cùng phía xương trụ của nếp gấp lòng bàn tay xa, phía sau khớp bàn ngón tay thứ 5.',
    anatomy_depth: 'Cơ giạng ngón út; động mạch mu ngón tay; nhánh mu tay của thần kinh trụ.',
    clinical_indications: ['Đau cổ', 'Cứng gáy', 'Đau lưng', 'Đau đầu', 'Ù tai', 'Động kinh'],
    needling_depth: 'Châm thẳng 0,5-0,7 thốn',
    danger_level: 'safe',
    coordinates: { front: { x: 86, y: 458 } }
  },

  // ═══════════════════════════════════════════════
  //  BLADDER (BL) — Kinh Túc Thái Dương Bàng Quang
  // ═══════════════════════════════════════════════
  {
    id: 'BL2', name_vi: 'Toản Trúc', name_pinyin: 'Cuánzhú 攒竹',
    meridian_id: 'BL', region: 'head-neck', view: 'front',
    anatomy_location: 'Ở đầu trong lông mày, thẳng từ khóe mắt trong lên, ngay chỗ khuyết trên ổ mắt.',
    anatomy_depth: 'Cơ vòng mi, cơ hạ mày; động mạch và tĩnh mạch trán; nhánh trong của thần kinh trán.',
    clinical_indications: ['Đau đầu', 'Mờ mắt', 'Đau mắt', 'Chảy nước mắt', 'Co giật mí mắt'],
    needling_depth: 'Châm ngang dưới da 0,3-0,5 thốn',
    danger_level: 'caution',
    danger_note: 'Gần mắt – châm ngang luồn kim, không châm sâu',
    coordinates: { front: { x: 234, y: 58 } }
  },
  {
    id: 'BL13', name_vi: 'Phế Du', name_pinyin: 'Fèishù 肺俞',
    meridian_id: 'BL', region: 'back', view: 'back',
    anatomy_location: 'Từ bờ dưới mỏm gai đốt sống ngực thứ 3 (T3) đo ngang ra ngoài 1,5 thốn.',
    anatomy_depth: 'Cơ thang, cơ trám lớn; động mạch gian sườn sau; nhánh bì trong thuộc nhánh sau của thần kinh ngực thứ 3.',
    clinical_indications: ['Ho', 'Hen suyễn', 'Đau ngực', 'Mồ hôi trộm', 'Viêm phổi', 'Lao phổi'],
    needling_depth: 'Châm xiên 0,5-0,8 thốn',
    danger_level: 'caution',
    danger_note: 'Châm xiên hướng về cột sống, tránh tổn thương phổi',
    coordinates: { back: { x: 228, y: 210 } }
  },
  {
    id: 'BL15', name_vi: 'Tâm Du', name_pinyin: 'Xīnshù 心俞',
    meridian_id: 'BL', region: 'back', view: 'back',
    anatomy_location: 'Từ bờ dưới mỏm gai đốt sống ngực thứ 5 (T5) đo ngang ra ngoài 1,5 thốn.',
    anatomy_depth: 'Cơ thang, cơ trám lớn; động mạch gian sườn sau; nhánh trong thuộc nhánh sau của thần kinh ngực thứ 5.',
    clinical_indications: ['Hồi hộp', 'Mất ngủ', 'Hay quên', 'Đau tim', 'Lo âu', 'Động kinh'],
    needling_depth: 'Châm xiên 0,5-0,8 thốn',
    danger_level: 'caution',
    danger_note: 'Châm xiên hướng về cột sống, tránh tổn thương phổi/tim',
    coordinates: { back: { x: 228, y: 240 } }
  },
  {
    id: 'BL18', name_vi: 'Can Du', name_pinyin: 'Gānshù 肝俞',
    meridian_id: 'BL', region: 'back', view: 'back',
    anatomy_location: 'Từ bờ dưới mỏm gai đốt sống ngực thứ 9 (T9) đo ngang ra ngoài 1,5 thốn.',
    anatomy_depth: 'Cơ thang, cơ lưng rộng; động mạch gian sườn sau; nhánh sau của thần kinh ngực thứ 9.',
    clinical_indications: ['Đau mắt', 'Mờ mắt', 'Đau sườn', 'Vàng da', 'Động kinh', 'Bệnh gan'],
    needling_depth: 'Châm xiên 0,5-0,8 thốn',
    danger_level: 'safe',
    coordinates: { back: { x: 228, y: 290 } }
  },
  {
    id: 'BL20', name_vi: 'Tỳ Du', name_pinyin: 'Píshù 脾俞',
    meridian_id: 'BL', region: 'back', view: 'back',
    anatomy_location: 'Từ bờ dưới mỏm gai đốt sống ngực thứ 11 (T11) đo ngang ra ngoài 1,5 thốn.',
    anatomy_depth: 'Cơ lưng rộng, cơ dựng sống; nhánh sau của động mạch gian sườn thứ 11; nhánh sau của thần kinh ngực thứ 11.',
    clinical_indications: ['Đau bụng', 'Tiêu chảy', 'Phù', 'Vàng da', 'Nôn mửa', 'Chán ăn'],
    needling_depth: 'Châm xiên 0,5-0,8 thốn',
    danger_level: 'safe',
    coordinates: { back: { x: 228, y: 318 } }
  },
  {
    id: 'BL23', name_vi: 'Thận Du', name_pinyin: 'Shènshù 肾俞',
    meridian_id: 'BL', region: 'back', view: 'back',
    anatomy_location: 'Từ bờ dưới mỏm gai đốt sống thắt lưng thứ 2 (L2) đo ngang ra ngoài 1,5 thốn.',
    anatomy_depth: 'Cơ dựng sống; động mạch thắt lưng thứ 2; nhánh sau của thần kinh thắt lưng thứ 2.',
    clinical_indications: ['Đau lưng', 'Ù tai', 'Điếc', 'Tiểu nhiều', 'Di tinh', 'Liệt dương', 'Rối loạn kinh nguyệt'],
    needling_depth: 'Châm thẳng 0,8-1,5 thốn',
    danger_level: 'caution',
    danger_note: 'Châm quá sâu có thể tổn thương thận',
    coordinates: { back: { x: 228, y: 355 } }
  },
  {
    id: 'BL40', name_vi: 'Ủy Trung', name_pinyin: 'Wěizhōnɡ 委中',
    meridian_id: 'BL', region: 'lower-limb', view: 'back',
    anatomy_location: 'Chính giữa nếp lằn hố khoeo chân, giữa gân cơ nhị đầu đùi và gân cơ bán gân.',
    anatomy_depth: 'Giữa cơ nhị đầu đùi và cơ bán gân; động mạch và tĩnh mạch khoeo; thần kinh chày, thần kinh mác chung.',
    clinical_indications: ['Đau lưng', 'Đau gối', 'Liệt chi dưới', 'Đau thần kinh tọa', 'Trúng nắng'],
    needling_depth: 'Châm thẳng 0,5-1,0 thốn',
    danger_level: 'danger',
    danger_note: 'Vùng bó mạch động mạch khoeo & thần kinh chày — cần châm cẩn thận',
    coordinates: { back: { x: 218, y: 595 } }
  },
  {
    id: 'BL60', name_vi: 'Côn Lôn', name_pinyin: 'Kūnlún 昆仑',
    meridian_id: 'BL', region: 'lower-limb', view: 'front',
    anatomy_location: 'Tại chỗ lõm giữa đỉnh mắt cá chân ngoài và gân gót (gân Achilles).',
    anatomy_depth: 'Mạc hãm gân mác; động mạch mác; thần kinh bắp chân.',
    clinical_indications: ['Đau đầu', 'Đau cổ', 'Đau lưng', 'Đau gót chân', 'Khó sinh'],
    needling_depth: 'Châm thẳng 0,5-0,8 thốn',
    danger_level: 'safe',
    coordinates: { front: { x: 204, y: 805 } }
  },

  // ═══════════════════════════════════════════════
  //  KIDNEY (KI) — Kinh Túc Thiếu Âm Thận
  // ═══════════════════════════════════════════════
  {
    id: 'KI1', name_vi: 'Dũng Tuyền', name_pinyin: 'Yǒnɡquán 涌泉',
    meridian_id: 'KI', region: 'lower-limb', view: 'back',
    anatomy_location: 'Ở lòng bàn chân, tại chỗ lõm xuất hiện khi bàn chân gập lòng, tại điểm nối 1/3 trước và 2/3 sau của đoạn thẳng nối gốc ngón chân thứ 2-3 với gót chân.',
    anatomy_depth: 'Cơ giun thứ 2, cơ gấp ngắn các ngón chân; cung động mạch gan chân; thần kinh gan ngón chân chung thứ 2.',
    clinical_indications: ['Đau đỉnh đầu', 'Chóng mặt', 'Mất ý thức', 'Động kinh', 'Hồi sức cấp cứu'],
    needling_depth: 'Châm thẳng 0,3-0,5 thốn',
    danger_level: 'safe',
    coordinates: { back: { x: 215, y: 858 } }
  },
  {
    id: 'KI3', name_vi: 'Thái Khê', name_pinyin: 'Tàixī 太溪',
    meridian_id: 'KI', region: 'lower-limb', view: 'front',
    anatomy_location: 'Tại chỗ lõm giữa đỉnh mắt cá chân trong và gân gót (gân Achilles), ngang mức với đỉnh mắt cá trong.',
    anatomy_depth: 'Cơ gấp dài các ngón chân, cơ gấp dài ngón cái; động mạch chày sau; thần kinh chày.',
    clinical_indications: ['Đau họng', 'Đau răng', 'Ù tai', 'Điếc', 'Mất ngủ', 'Di tinh', 'Đau lưng'],
    needling_depth: 'Châm thẳng 0,3-0,5 thốn',
    danger_level: 'caution',
    danger_note: 'Gần động mạch chày sau',
    coordinates: { front: { x: 220, y: 805 } }
  },

  // ═══════════════════════════════════════════════
  //  PERICARDIUM (PC) — Kinh Thủ Quyết Âm Tâm Bào
  // ═══════════════════════════════════════════════
  {
    id: 'PC6', name_vi: 'Nội Quan', name_pinyin: 'Nèiɡuān 内关',
    meridian_id: 'PC', region: 'upper-limb', view: 'front',
    anatomy_location: 'Từ nếp lằn cổ tay đo lên 2 thốn, giữa gân cơ gan tay dài và gân cơ gấp cổ tay quay.',
    anatomy_depth: 'Giữa cơ gấp nông và cơ gấp sâu các ngón tay; động mạch giữa; thần kinh giữa.',
    clinical_indications: ['Buồn nôn', 'Nôn mửa', 'Đau ngực', 'Hồi hộp', 'Đau dạ dày', 'Mất ngủ', 'Say tàu xe'],
    needling_depth: 'Châm thẳng 0,5-1,0 thốn',
    danger_level: 'caution',
    danger_note: 'Thần kinh giữa nằm ngay phía dưới thân huyệt',
    coordinates: { front: { x: 110, y: 388 } }
  },

  // ═══════════════════════════════════════════════
  //  TRIPLE WARMER (TW/TE) — Kinh Thủ Thiếu Dương Tam Tiêu
  // ═══════════════════════════════════════════════
  {
    id: 'TE5', name_vi: 'Ngoại Quan', name_pinyin: 'Wàiɡuān 外关',
    meridian_id: 'TE', region: 'upper-limb', view: 'front',
    anatomy_location: 'Từ nếp lằn mu cổ tay đo lên 2 thốn, nằm giữa xương quay và xương trụ.',
    anatomy_depth: 'Giữa cơ duỗi các ngón tay và cơ duỗi ngón út; động mạch gian cốt sau; thần kinh gian cốt sau, thần kinh bì cẳng tay sau.',
    clinical_indications: ['Sốt', 'Đau đầu', 'Đau tai', 'Điếc', 'Đau sườn', 'Liệt chi trên'],
    needling_depth: 'Châm thẳng 0,5-1,0 thốn',
    danger_level: 'safe',
    coordinates: { front: { x: 108, y: 388 } }
  },

  // ═══════════════════════════════════════════════
  //  GALLBLADDER (GB) — Kinh Túc Thiếu Dương Đởm
  // ═══════════════════════════════════════════════
  {
    id: 'GB20', name_vi: 'Phong Trì', name_pinyin: 'Fēnɡchí 风池',
    meridian_id: 'GB', region: 'head-neck', view: 'back',
    anatomy_location: 'Tại chỗ lõm giữa phần trên bờ cơ ức đòn chũm và cơ thang, ngang mức huyệt Phong Phủ (GV16).',
    anatomy_depth: 'Giữa cơ ức đòn chũm và cơ thang; động mạch và tĩnh mạch chẩm; thần kinh chẩm nhỏ.',
    clinical_indications: ['Đau đầu', 'Chóng mặt', 'Cảm cúm', 'Đau mắt', 'Ù tai', 'Cứng gáy', 'Cao huyết áp', 'Tất cả rối loạn não'],
    needling_depth: 'Châm xiên 0,5-1,2 thốn, hướng mũi kim về phía đầu mũi',
    danger_level: 'danger',
    danger_note: 'Gần thân não & động mạch đốt sống – KHÔNG châm quá sâu, hướng kim chuẩn xác về phía mũi',
    coordinates: { back: { x: 228, y: 128 } }
  },
  {
    id: 'GB30', name_vi: 'Hoàn Khiêu', name_pinyin: 'Huántiào 环跳',
    meridian_id: 'GB', region: 'lower-limb', view: 'front',
    anatomy_location: 'Tại điểm nối 1/3 ngoài và 2/3 trong của đoạn thẳng nối từ đỉnh mấu chuyển lớn xương đùi đến khe xương cùng.',
    anatomy_depth: 'Cơ mông lớn, cơ hình lê; động mạch mông dưới; thần kinh mông dưới, thần kinh tọa.',
    clinical_indications: ['Đau lưng', 'Đau hông', 'Liệt chi dưới', 'Đau thần kinh tọa'],
    needling_depth: 'Châm thẳng sâu 2,0-3,0 thốn',
    danger_level: 'caution',
    danger_note: 'Thân kim đi sát dây thần kinh tọa (thần kinh hông to)',
    coordinates: { front: { x: 178, y: 452 } }
  },
  {
    id: 'GB34', name_vi: 'Dương Lăng Tuyền', name_pinyin: 'Yánɡlínɡquán 阳陵泉',
    meridian_id: 'GB', region: 'lower-limb', view: 'front',
    anatomy_location: 'Tại chỗ lõm phía trước và phía dưới đầu xương mác.',
    anatomy_depth: 'Cơ mác dài; động mạch gối dưới ngoài; thần kinh mác chung.',
    clinical_indications: ['Đau gối', 'Yếu chi dưới', 'Đau sườn', 'Miệng đắng', 'Nôn mửa', 'Bệnh cơ & gân'],
    needling_depth: 'Châm thẳng 0,8-1,2 thốn',
    danger_level: 'caution',
    danger_note: 'Vị trí sát thần kinh mác chung',
    coordinates: { front: { x: 208, y: 618 } }
  },
  {
    id: 'GB39', name_vi: 'Huyền Chung', name_pinyin: 'Xuánzhōnɡ 悬钟',
    meridian_id: 'GB', region: 'lower-limb', view: 'front',
    anatomy_location: 'Từ đỉnh mắt cá chân ngoài đo thẳng lên 3 thốn, nằm giữa bờ sau xương mác và các gân cơ mác dài, mác ngắn.',
    anatomy_depth: 'Giữa cơ mác dài và cơ mác ngắn; nhánh động mạch chày trước; thần kinh mác nông.',
    clinical_indications: ['Đau cổ', 'Đau ngực', 'Đau gối', 'Liệt nửa người', 'Bệnh tủy xương'],
    needling_depth: 'Châm thẳng 0,5-0,8 thốn',
    danger_level: 'safe',
    coordinates: { front: { x: 205, y: 778 } }
  },

  // ═══════════════════════════════════════════════
  //  LIVER (LV) — Kinh Túc Quyết Âm Can
  // ═══════════════════════════════════════════════
  {
    id: 'LR3', name_vi: 'Thái Xung', name_pinyin: 'Tàichōnɡ 太冲',
    meridian_id: 'LR', region: 'lower-limb', view: 'front',
    anatomy_location: 'Ở mu bàn chân, tại chỗ lõm phía trước kẽ nối xương bàn chân thứ 1 và thứ 2.',
    anatomy_depth: 'Cơ gian cốt mu chân thứ nhất; động mạch mu chân; thần kinh mác sâu.',
    clinical_indications: ['Đau đầu', 'Chóng mặt', 'Cao huyết áp', 'Mất ngủ', 'Rối loạn kinh nguyệt', 'Đau mắt', 'Stress', 'Hệ thần kinh'],
    needling_depth: 'Châm thẳng 0,5-0,8 thốn',
    danger_level: 'safe',
    coordinates: { front: { x: 218, y: 845 } }
  },
  {
    id: 'LR14', name_vi: 'Kỳ Môn', name_pinyin: 'Qīmén 期门',
    meridian_id: 'LR', region: 'chest-abdomen', view: 'front',
    anatomy_location: 'Thẳng từ núm vú xuống, cách đường giữa trước 4 thốn, thuộc khoang liên sườn thứ 6.',
    anatomy_depth: 'Cơ chéo bụng ngoài, cơ chéo bụng trong, cơ ngang bụng; động mạch gian sườn thứ 6; thần kinh liên sườn thứ 6.',
    clinical_indications: ['Đau sườn', 'Đầy bụng', 'Trào ngược', 'Nấc', 'Trầm cảm'],
    needling_depth: 'Châm xiên dưới da 0,5-0,8 thốn',
    danger_level: 'caution',
    danger_note: 'Châm xiên nông — tránh tạng gan ở bên phải và lách ở bên trái',
    coordinates: { front: { x: 210, y: 252 } }
  },

  // ═══════════════════════════════════════════════
  //  CONCEPTION VESSEL (CV/REN) — Nhâm Mạch
  // ═══════════════════════════════════════════════
  {
    id: 'CV4', name_vi: 'Quan Nguyên', name_pinyin: 'Guānyuán 关元',
    meridian_id: 'CV', region: 'chest-abdomen', view: 'front',
    anatomy_location: 'Trên đường chính trung trước bụng, dưới rốn thẳng xuống 3 thốn.',
    anatomy_depth: 'Đường trắng; các nhánh của động mạch thượng vị nông và thượng vị dưới; nhánh bì trước của thần kinh dưới sườn thứ 12.',
    clinical_indications: ['Đau bụng dưới', 'Tiểu nhiều', 'Di tinh', 'Liệt dương', 'Rối loạn kinh nguyệt', 'Tiêu chảy', 'Bồi bổ nguyên khí'],
    needling_depth: 'Châm thẳng 0,8-1,2 thốn',
    danger_level: 'caution',
    danger_note: 'Phía dưới có bàng quang — người bệnh cần đi tiểu trước khi châm',
    coordinates: { front: { x: 250, y: 398 } }
  },
  {
    id: 'CV6', name_vi: 'Khí Hải', name_pinyin: 'Qìhǎi 气海',
    meridian_id: 'CV', region: 'chest-abdomen', view: 'front',
    anatomy_location: 'Trên đường chính trung trước bụng, dưới rốn thẳng xuống 1,5 thốn.',
    anatomy_depth: 'Đường trắng; các nhánh của động mạch thượng vị nông và thượng vị dưới; nhánh bì trước của thần kinh dưới sườn thứ 11.',
    clinical_indications: ['Đau bụng', 'Phù', 'Tiểu khó', 'Di tinh', 'Liệt dương', 'Suy nhược', 'Tăng năng lượng'],
    needling_depth: 'Châm thẳng 0,8-1,2 thốn',
    danger_level: 'safe',
    coordinates: { front: { x: 250, y: 378 } }
  },
  {
    id: 'CV8', name_vi: 'Thần Khuyết', name_pinyin: 'Shénquè 神阙',
    meridian_id: 'CV', region: 'chest-abdomen', view: 'front',
    anatomy_location: 'Chính giữa tâm rốn.',
    anatomy_depth: 'Vùng mô rốn; Chỉ dùng phương pháp cứu (moxibustion), TUYỆT ĐỐI KHÔNG châm.',
    clinical_indications: ['Đau bụng', 'Tiêu chảy', 'Trúng phong (đột quỵ)', 'Hôn mê'],
    needling_depth: 'Chỉ cứu, NGHIÊM CẤM châm',
    danger_level: 'danger',
    danger_note: 'CẤM CHÂM KIM — chỉ dùng phương pháp cứu ngải cứu (moxibustion)',
    coordinates: { front: { x: 250, y: 358 } }
  },
  {
    id: 'CV12', name_vi: 'Trung Quản', name_pinyin: 'Zhōnɡwǎn 中脘',
    meridian_id: 'CV', region: 'chest-abdomen', view: 'front',
    anatomy_location: 'On the midline, 4 cun superior to the umbilicus.',
    anatomy_depth: 'Linea alba; superior epigastric artery; anterior cutaneous branch of 8th intercostal nerve.',
    anatomy_location: 'Trên đường chính trung trước bụng, từ rốn đo thẳng lên 4 thốn.',
    anatomy_depth: 'Đường trắng; động mạch thượng vị trên; nhánh bì trước của thần kinh liên sườn thứ 8.',
    clinical_indications: ['Đau dạ dày', 'Nôn mửa', 'Đầy bụng', 'Tiêu chảy', 'Đau thượng vị', 'Cơ quan Dương'],
    needling_depth: 'Châm thẳng 0,5-1,2 thốn',
    danger_level: 'safe',
    coordinates: { front: { x: 250, y: 312 } }
  },
  {
    id: 'CV17', name_vi: 'Đản Trung', name_pinyin: 'Dànzhōnɡ 膻中',
    meridian_id: 'CV', region: 'chest-abdomen', view: 'front',
    anatomy_location: 'Trên đường chính trung trước xương ức, ngang mức khoang liên sườn thứ 4, điểm giữa đoạn thẳng nối hai núm vú.',
    anatomy_depth: 'Màng xương ức; nhánh xuyên của động mạch ngực trong; nhánh bì trước của thần kinh liên sườn thứ 4.',
    clinical_indications: ['Hen suyễn', 'Đau ngực', 'Thiếu sữa', 'Nấc', 'Khó thở', 'Trung tâm hô hấp'],
    needling_depth: 'Châm ngang dưới da 0,3-0,5 thốn',
    danger_level: 'safe',
    coordinates: { front: { x: 250, y: 232 } }
  },

  // ═══════════════════════════════════════════════
  //  GOVERNING VESSEL (GV/DU) — Đốc Mạch
  // ═══════════════════════════════════════════════
  {
    id: 'GV4', name_vi: 'Mệnh Môn', name_pinyin: 'Mìnɡmén 命门',
    meridian_id: 'GV', region: 'back', view: 'back',
    anatomy_location: 'Tại chỗ lõm dưới mỏm gai đốt sống thắt lưng thứ 2 (L2).',
    anatomy_depth: 'Dây chằng trên gai, dây chằng liên gai; nhánh sau của động mạch thắt lưng; nhánh trong thuộc nhánh sau của thần kinh thắt lưng thứ 2.',
    clinical_indications: ['Đau lưng', 'Liệt dương', 'Di tinh', 'Tiêu chảy', 'Hệ miễn dịch'],
    needling_depth: 'Châm thẳng 0,5-1,0 thốn',
    danger_level: 'caution',
    danger_note: 'Phía sâu sát ống sống và tủy sống — không châm quá sâu',
    coordinates: { back: { x: 250, y: 355 } }
  },
  {
    id: 'GV14', name_vi: 'Đại Chùy', name_pinyin: 'Dàzhuī 大椎',
    meridian_id: 'GV', region: 'head-neck', view: 'back',
    anatomy_location: 'Tại chỗ lõm dưới mỏm gai đốt sống cổ thứ 7 (C7) - đốt sống gồ cao nhất vùng gáy khi cúi đầu.',
    anatomy_depth: 'Dây chằng trên gai, dây chằng liên gai; nhánh sau của động mạch gian sườn thứ 7; nhánh trong thuộc nhánh sau của thần kinh cổ thứ 8.',
    clinical_indications: ['Sốt', 'Cảm cúm', 'Ho', 'Hen suyễn', 'Cứng gáy', 'Động kinh', 'Giảm thừa năng lượng'],
    needling_depth: 'Châm chếch lên trên 0,5-1,0 thốn',
    danger_level: 'caution',
    danger_note: 'Vị trí gần ống sống cổ — châm xiên chếch nhẹ lên trên, không hướng vuông góc ra sau',
    coordinates: { back: { x: 250, y: 162 } }
  },
  {
    id: 'GV20', name_vi: 'Bách Hội', name_pinyin: 'Bǎihuì 百会',
    meridian_id: 'GV', region: 'head-neck', view: 'front',
    anatomy_location: 'Trên đường chính trung đỉnh đầu, tại trung điểm của đường nối đỉnh hai vành tai, cách bờ tóc sau 7 thốn.',
    anatomy_depth: 'Cân mạc trên sọ (Galea aponeurotica); mạng mạch khớp nối của động mạch thái dương nông và động mạch chẩm; nhánh của thần kinh chẩm lớn.',
    clinical_indications: ['Đau đầu', 'Chóng mặt', 'Mất ngủ', 'Hay quên', 'Trúng phong', 'Sa trực tràng', 'Da liễu', 'Thần kinh giao cảm'],
    needling_depth: 'Châm ngang luồn kim dưới da 0,3-0,5 thốn',
    danger_level: 'safe',
    coordinates: { front: { x: 250, y: 15 } }
  },
  {
    id: 'GV26', name_vi: 'Nhân Trung', name_pinyin: 'Rénzhōnɡ 人中',
    meridian_id: 'GV', region: 'head-neck', view: 'front',
    anatomy_location: 'Dưới vách mũi, tại điểm nối 1/3 trên và 2/3 dưới của rãnh nhân trung.',
    anatomy_depth: 'Cơ vòng miệng; động mạch môi trên; nhánh má của thần kinh mặt, thần kinh dưới ổ mắt.',
    clinical_indications: ['Hôn mê', 'Ngất', 'Động kinh', 'Trúng phong', 'Đau lưng cấp', 'Bất tỉnh', 'Béo phì'],
    needling_depth: 'Châm xiên chếch lên trên 0,2-0,3 thốn',
    danger_level: 'safe',
    coordinates: { front: { x: 250, y: 94 } }
  },

  // ═══════════════════════════════════════════════
  //  EXTRA POINTS (EX) — Huyệt ngoài kinh
  // ═══════════════════════════════════════════════
  {
    id: 'EX-HN3', name_vi: 'Ấn Đường', name_pinyin: 'Yìntánɡ 印堂',
    meridian_id: 'EX', region: 'head-neck', view: 'front',
    anatomy_location: 'Chính giữa điểm nối hai đầu trong của lông mày.',
    anatomy_depth: 'Cơ mảnh khảnh, cơ hạ mày; các nhánh của động mạch trán; thần kinh trên ròng rọc.',
    clinical_indications: ['Đau đầu', 'Chóng mặt', 'Nghẹt mũi', 'Mất ngủ', 'Đau mắt', 'Lo âu'],
    needling_depth: 'Châm ngang dưới da từ trên xuống dưới 0,3-0,5 thốn',
    danger_level: 'safe',
    coordinates: { front: { x: 250, y: 62 } }
  }
];

// Hàm tạo huyệt đối xứng (bên phải) cho huyệt hai bên
function getMirroredAcupoints() {
  const bilateral = ACUPOINTS.filter(p =>
    p.coordinates.front && p.coordinates.front.x !== 250 && p.meridian_id !== 'CV' && p.meridian_id !== 'GV'
  );
  const mirrored = [];
  bilateral.forEach(p => {
    if (p.coordinates.front) {
      mirrored.push({
        ...p,
        _mirrored: true,
        _originalId: p.id,
        coordinates: {
          ...p.coordinates,
          front: p.coordinates.front ? { x: 500 - p.coordinates.front.x, y: p.coordinates.front.y } : undefined
        }
      });
    }
  });
  // Đồng thời mirror các huyệt mặt sau
  const bilateralBack = ACUPOINTS.filter(p =>
    p.coordinates.back && p.coordinates.back.x !== 250 && p.meridian_id !== 'CV' && p.meridian_id !== 'GV'
  );
  bilateralBack.forEach(p => {
    if (p.coordinates.back) {
      mirrored.push({
        ...p,
        _mirrored: true,
        _originalId: p.id,
        coordinates: {
          ...p.coordinates,
          back: p.coordinates.back ? { x: 500 - p.coordinates.back.x, y: p.coordinates.back.y } : undefined
        }
      });
    }
  });
  return mirrored;
}