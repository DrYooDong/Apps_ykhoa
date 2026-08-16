/**
 * CliniPortal — Traditional Chinese Medicine Database (TypeScript Module)
 */
import { TcmHerb, MeridianClockHour, AcupointItem, IntegrativeProtocolItem } from './types';

export const HERBS_DATA: Record<string, TcmHerb> = {
  nhansam: {
    name: "Nhân Sâm",
    latin: "Panax ginseng C. A. Mey.",
    pinyin: "Rén Shēn (人参)",
    taste: "Vị ngọt, hơi đắng, tính ôn (ấm).",
    meridians: "Tỳ, Phế, Tâm.",
    actions: "Đại bổ nguyên khí, bổ tỳ ích phế, sinh tân, an thần, ích trí.",
    indications: "Phế khí hư nhược (thở ngắn, ho suyễn), tỳ khí hư (tiêu chảy, mệt mỏi), tiêu khát, cơ thể suy nhược sau bệnh nặng, mất ngủ.",
    contra: "Không dùng khi có thực tà (đang bị cảm sốt cấp tính), âm hư hỏa vượng, hoặc kết hợp với Lê Lô, Ngũ Linh Chi.",
    icon: "🌿"
  },
  kytu: {
    name: "Kỷ Tử (Câu Kỷ Tử)",
    latin: "Lycium barbarum L.",
    pinyin: "Gǒu Qǐ Zǐ (枸杞子)",
    taste: "Vị ngọt, tính bình.",
    meridians: "Phế, Can, Thận.",
    actions: "Tư bổ can thận, ích tinh huyết, minh mục (làm sáng mắt), nhuận phế.",
    indications: "Can thận âm hư gây lưng đau gối mỏi, chóng mặt ù tai, mắt mờ nhìn kém, ho khan do phế âm hư, tiêu khát.",
    contra: "Người có tỳ vị hư hàn, tiêu chảy kéo dài, hoặc đang bị sốt, viêm nhiễm cấp tính không nên dùng nhiều.",
    icon: "🍒"
  },
  hoangky: {
    name: "Hoàng Kỳ",
    latin: "Astragalus membranaceus (Fisch.) Bge.",
    pinyin: "Huáng Qí (黄芪)",
    taste: "Vị ngọt, tính ôn.",
    meridians: "Tỳ, Phế.",
    actions: "Bổ khí thăng dương, ích vệ cố biểu (tăng sức đề kháng), lợi niệu tiêu thũng, bài nùng sinh cơ.",
    indications: "Tỳ vị khí hư gây mệt mỏi, ăn kém, sa tử cung, sa trực tràng. Vệ khí hư tự hãn (mồ hôi trộm), phù thũng do khí hư, ung thũng khó vỡ mủ hoặc khó lành miệng.",
    contra: "Không dùng cho trường hợp thực chứng, âm hư dương thịnh, mụn nhọt mới phát hỏa độc đang thịnh.",
    icon: "🌱"
  },
  lucvi: {
    name: "Lục Vị Địa Hoàng Hoàn",
    latin: "Liuwei Dihuang Wan",
    pinyin: "Liù Wèi Dì Huáng Wán (六味地黄丸)",
    taste: "Bài thuốc cổ phương gồm 6 vị: Thục địa, Sơn thù du, Sơn dược, Trạch tả, Đan bì, Phục linh.",
    meridians: "Tác động vào ba kinh Thận, Can, Tỳ (chủ yếu bổ Thận âm).",
    actions: "Tư âm bổ thận (công thức phối ngũ 'Tam bổ Tam tả' giúp bổ âm mà không gây nê trệ tỳ vị).",
    indications: "Thận âm bất túc gây triều nhiệt (nóng sốt về chiều), cốt chưng, đạo hãn (đổ mồ hôi trộm), ù tai di tinh, đau lưng mỏi gối, chóng mặt, trẻ em chậm mọc răng thóp lâu liền.",
    contra: "Người tỳ vị hư hàn (hay đầy bụng, tiêu chảy), đang bị cảm mạo phong hàn hoặc đờm thấp thịnh.",
    icon: "🥣"
  }
};

export const MERIDIANS_CLOCK_DATA: MeridianClockHour[] = [
  {
    id: 0,
    zodiac: "Tý",
    timeStr: "23:00 - 01:00",
    startHour: 23,
    endHour: 1,
    name: "Đảm (Mật)",
    fullName: "Túc Thiếu Dương Đảm Kinh",
    element: "Mộc",
    elClass: "element-wood",
    desc: "Túi mật bài tiết dịch mật để hỗ trợ tiêu hóa chất béo và là nơi lọc máu. Đây là thời gian phục hồi của tủy xương và hệ thần kinh.",
    advice: "Nên ngủ sâu trước 23:00 để túi mật hoạt động hiệu quả, giúp ngày hôm sau tràn đầy sinh lực và tinh thần minh mẫn."
  },
  {
    id: 1,
    zodiac: "Sửu",
    timeStr: "01:00 - 03:00",
    startHour: 1,
    endHour: 3,
    name: "Can (Gan)",
    fullName: "Túc Quyết Âm Can Kinh",
    element: "Mộc",
    elClass: "element-wood",
    desc: "Gan thực hiện chức năng đào thải độc tố mạnh mẽ nhất, lọc máu cũ và tái sinh máu mới. Đây là đỉnh điểm âm khí.",
    advice: "Cực kỳ cần ngủ say. Tránh thức khuya giờ này vì sẽ làm tổn thương Can huyết, gây nóng gan, sạm da và suy giảm thị lực."
  },
  {
    id: 2,
    zodiac: "Dần",
    timeStr: "03:00 - 05:00",
    startHour: 3,
    endHour: 5,
    name: "Phế (Phổi)",
    fullName: "Thủ Thái Âm Phế Kinh",
    element: "Kim",
    elClass: "element-metal",
    desc: "Phổi phân phối dưỡng khí và khí huyết đi toàn thân. Thời gian này cơ thể chuyển từ trạng thái tĩnh sang động.",
    advice: "Cần ngủ ấm. Người lớn tuổi hoặc người bị hen suyễn thường dễ ho vào giờ này. Nếu đã dậy, nên tập thở sâu, thiền nhẹ."
  },
  {
    id: 3,
    zodiac: "Mão",
    timeStr: "05:00 - 07:00",
    startHour: 5,
    endHour: 7,
    name: "Đại Trường",
    fullName: "Thủ Dương Minh Đại Trường Kinh",
    element: "Kim",
    elClass: "element-metal",
    desc: "Ruột giải co bóp mạnh để thải chất cặn bã ra ngoài, giải độc cho cơ thể trước ngày mới.",
    advice: "Thời điểm vàng để thức dậy, uống một ly nước ấm và đi đại tiện để làm sạch đại tràng, ngăn ngừa tích tụ độc tố."
  },
  {
    id: 4,
    zodiac: "Thìn",
    timeStr: "07:00 - 09:00",
    startHour: 7,
    endHour: 9,
    name: "Vị (Dạ dày)",
    fullName: "Túc Dương Minh Vị Kinh",
    element: "Thổ",
    elClass: "element-earth",
    desc: "Dạ dày hoạt động co bóp tiêu hóa thức ăn mạnh mẽ nhất. Khả năng hấp thụ chất dinh dưỡng ở mức cao nhất trong ngày.",
    advice: "Bắt buộc phải ăn bữa sáng đầy đủ dinh dưỡng. Tránh ăn đồ lạnh hoặc bỏ bữa sáng để bảo vệ tỳ vị."
  },
  {
    id: 5,
    zodiac: "Tỵ",
    timeStr: "09:00 - 11:00",
    startHour: 9,
    endHour: 11,
    name: "Tỳ (Lá lách)",
    fullName: "Túc Thái Âm Tỳ Kinh",
    element: "Thổ",
    elClass: "element-earth",
    desc: "Tỳ chủ vận hóa chất dinh dưỡng từ dạ dày, chuyển hóa thành khí huyết đi nuôi dưỡng cơ bắp và não bộ.",
    advice: "Thời gian làm việc và học tập tập trung nhất. Uống đủ nước, tránh ăn vặt đồ ngọt để tỳ vị hoạt động tốt."
  },
  {
    id: 6,
    zodiac: "Ngọ",
    timeStr: "11:00 - 13:00",
    startHour: 11,
    endHour: 13,
    name: "Tâm (Tim)",
    fullName: "Thủ Thiếu Âm Tâm Kinh",
    element: "Hỏa",
    elClass: "element-fire",
    desc: "Tim điều khiển dòng tuần hoàn máu, điều hòa thần trí. Khí huyết đạt cực đại (Dương cực sinh Âm).",
    advice: "Nên nghỉ trưa ngắn từ 15-30 phút để dưỡng Tâm khí, giúp cân bằng âm dương và duy trì sự tỉnh táo cho buổi chiều."
  },
  {
    id: 7,
    zodiac: "Mùi",
    timeStr: "13:00 - 15:00",
    startHour: 13,
    endHour: 15,
    name: "Tiểu Trường",
    fullName: "Thủ Thái Dương Tiểu Trường Kinh",
    element: "Hỏa",
    elClass: "element-fire",
    desc: "Ruột non hấp thụ các chất dinh dưỡng tốt nhất từ bữa trưa và phân loại chất lỏng đưa sang bàng quang.",
    advice: "Nên uống nước để hỗ trợ quá trình lọc và hấp thụ. Tránh ăn bữa trưa quá muộn sau 13:00."
  },
  {
    id: 8,
    zodiac: "Thân",
    timeStr: "15:00 - 17:00",
    startHour: 15,
    endHour: 17,
    name: "Bàng Quang",
    fullName: "Túc Thái Dương Bàng Quang Kinh",
    element: "Thủy",
    elClass: "element-water",
    desc: "Bàng quang chứa và thải nước tiểu. Đường kinh dài nhất đi qua dọc cột sống lên não bộ, ảnh hưởng trí nhớ.",
    advice: "Thời điểm lý tưởng để học tập, làm việc trí óc hoặc tập thể thao nhẹ. Nên uống nước nhiều để thanh lọc đường niệu."
  },
  {
    id: 9,
    zodiac: "Dậu",
    timeStr: "17:00 - 19:00",
    startHour: 17,
    endHour: 19,
    name: "Thận",
    fullName: "Túc Thiếu Âm Thận Kinh",
    element: "Thủy",
    elClass: "element-water",
    desc: "Thận tàng tinh, chủ cốt tủy, là gốc của sinh mệnh. Giờ này Thận bắt đầu lọc và dự trữ tinh hoa.",
    advice: "Thời điểm thích hợp để ăn tối nhẹ nhàng, đi dạo. Tránh làm việc quá sức hoặc ăn mặn vào giờ này để giảm tải cho Thận."
  },
  {
    id: 10,
    zodiac: "Tuất",
    timeStr: "19:00 - 21:00",
    startHour: 19,
    endHour: 21,
    name: "Tâm Bào",
    fullName: "Thủ Quyết Âm Tâm Bào Kinh",
    element: "Hỏa",
    elClass: "element-fire",
    desc: "Màng ngoài tim bảo vệ tim, điều hòa lưu thông khí huyết quanh ngực và hệ thần kinh.",
    advice: "Thích hợp để thư giãn tinh thần, đọc sách, trò chuyện cùng gia đình. Tránh vận động mạnh hoặc tức giận trước khi đi ngủ."
  },
  {
    id: 11,
    zodiac: "Hợi",
    timeStr: "21:00 - 23:00",
    startHour: 21,
    endHour: 23,
    name: "Tam Tiêu",
    fullName: "Thủ Thiếu Dương Tam Tiêu Kinh",
    element: "Hỏa",
    elClass: "element-fire",
    desc: "Tam Tiêu chủ trì thông đạo thủy dịch và nguyên khí toàn thân. Thời điểm chuẩn bị cho giấc ngủ đêm.",
    advice: "Nên ngâm chân nước ấm, giữ ấm cơ thể, tránh dùng thiết bị điện tử để dễ đi vào giấc ngủ trước 23:00."
  }
];

export const ACUPOINTS_DATA: AcupointItem[] = [
  {
    code: "LI4",
    name: "Hợp Cốc",
    pinyin: "Hégǔ (合谷)",
    meridian: "Thủ Dương Minh Đại Trường Kinh",
    location: "Ở bờ ngoài chính giữa xương bàn ngón tay thứ 2 (ngón trỏ), trong khối cơ gian cốt mu tay 1.",
    indications: "Giảm đau toàn thân (đặc biệt đau đầu, đau răng, đau mặt), sốt, liệt mặt ngoại biên, điều hòa nhu động ruột.",
    needleTechnique: "Châm thẳng 0.5 - 1.0 thốn. Cấm châm phụ nữ có thai vì kích thích co bóp tử cung."
  },
  {
    code: "ST36",
    name: "Túc Tam Lý",
    pinyin: "Zúsānlǐ (足三里)",
    meridian: "Túc Dương Minh Vị Kinh",
    location: "Dưới hõm ngoài xương bánh chè (Độc Tỵ) 3 thốn, cách mào chày 1 khoát ngón tay.",
    indications: "Đại bổ tỳ vị, tăng cường miễn dịch, nâng cao thể trạng, giảm đau dạ dày, buồn nôn, tiêu chảy, mệt mỏi suy nhược.",
    needleTechnique: "Châm thẳng 1.0 - 1.5 thốn, cứu ngải thường xuyên giúp dưỡng sinh trường thọ."
  },
  {
    code: "SP6",
    name: "Tam Âm Giao",
    pinyin: "Sānyīnjiāo (三阴交)",
    meridian: "Túc Thái Âm Tỳ Kinh",
    location: "Trên đỉnh mắt cá trong 3 thốn, sát bờ sau trong xương chày.",
    indications: "Giao hội của 3 kinh âm (Can, Tỳ, Thận). Trị rong kinh, bế kinh, đau bụng kinh, mất ngủ, di tinh, tăng huyết áp.",
    needleTechnique: "Châm thẳng 1.0 - 1.5 thốn. Cấm châm phụ nữ có thai."
  },
  {
    code: "PC6",
    name: "Nội Quan",
    pinyin: "Nèiguān (内关)",
    meridian: "Thủ Quyết Âm Tâm Bào Kinh",
    location: "Trên nếp gấp cổ tay 2 thốn, giữa hai gân cơ gan tay lớn và gan tay bé.",
    indications: "Chống nôn mửa, say tàu xe, buồn nôn do hóa trị, an thần, điều hòa nhịp tim, giảm hồi hộp đánh trống ngực.",
    needleTechnique: "Châm thẳng 0.5 - 1.0 thốn."
  }
];

export const INTEGRATIVE_PROTOCOLS_DATA: IntegrativeProtocolItem[] = [
  {
    id: "stroke-rehab",
    westernDisease: "Đột Quỵ Não Giai Đoạn Phục Hồi Chức Năng (I69)",
    tcmPattern: "Khí hư huyết ứ / Can thận âm hư",
    westernTreatment: "Kháng kết tập tiểu cầu, Kiểm soát HA, Statin + Tập Vật lý trị liệu/Vận động trị liệu",
    tcmFormula: "Bổ Dương Hoàn Ngũ Thang (Hoàng kỳ, Đương quy vĩ, Xích thược, Xuyên khung, Đào nhân, Hồng hoa, Địa long)",
    acupoints: ["GV20 (Bách Hội)", "LI4 (Hợp Cốc)", "LI11 (Khúc Trì)", "ST36 (Túc Tam Lý)", "GB34 (Dương Lăng Tuyền)"],
    evidenceNote: "Điện châm kết hợp phục hồi chức năng sớm giúp cải thiện thang điểm Barthel Index và Fugl-Meyer đáng kể so với đơn trị liệu."
  },
  {
    id: "hypertension-integrative",
    westernDisease: "Tăng Huyết Áp Nguyên Phát (I10)",
    tcmPattern: "Can dương thượng kháng",
    westernTreatment: "ACEi/ARB + CCB liều chuẩn",
    tcmFormula: "Thiên Ma Câu Đằng Ẩm",
    acupoints: ["LR3 (Thái Xung)", "GB20 (Phong Trì)", "LI11 (Khúc Trì)", "KI1 (Dũng Tuyền)"],
    evidenceNote: "Ngâm chân nước ấm thảo dược + Châm cứu hỗ trợ hạ 5-8 mmHg HA tâm thu và giảm triệu chứng hoa mắt, chóng mặt."
  }
];
