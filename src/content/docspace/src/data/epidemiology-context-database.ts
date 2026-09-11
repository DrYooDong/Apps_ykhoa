/**
 * CliniPortal DocSpace — Epidemiology Context Database
 * Kho Dữ Liệu Bối Cảnh Dịch Tễ Học Lâm Sàng & Phân Tích Tam Giác Chẩn Đoán
 * Kết nối bối cảnh dịch tễ học với 30 Bệnh Lý Trọng Tâm
 */

import { EpidemiologyContext } from '../types.ts';

export interface DiseaseEpidemiologyProfile {
  diseaseId: string;
  diseaseName: string;
  icdCode: string;
  specialty: string;
  endemicAreas: string[];          // Vùng dịch tễ lưu hành (ĐBSCL, Tây Nguyên, Đô thị mật độ cao...)
  peakSeasons: string[];           // Mùa dịch cao điểm (Mùa mưa, Đông Xuân, Quanh năm...)
  vectors: string[];               // Véc-tơ truyền bệnh hoặc nguồn phơi nhiễm
  occupationalRisks: string[];     // Nghề nghiệp có nguy cơ cao
  foodWaterRisks: string[];        // Nguy cơ nguồn nước, thực phẩm
  transmissionRoutes: string[];    // Đường truyền nhiễm
  incubationPeriod: string;        // Thời gian ủ bệnh
  highRiskPopulations: string[];   // Quần thể nguy cơ cao
  outbreakPotential: 'high' | 'moderate' | 'low' | 'sporadic';
  clinicalPearls: string;          // Đúc kết dịch tễ học then chốt
}

export const EPIDEMIOLOGY_DATABASE: Record<string, DiseaseEpidemiologyProfile> = {
  sot_xuat_huyet: {
    diseaseId: 'sot_xuat_huyet',
    diseaseName: 'Sốt xuất huyết Dengue',
    icdCode: 'A91',
    specialty: 'Truyền Nhiễm',
    endemicAreas: ['Đồng bằng sông Cửu Long', 'TP. Hồ Chí Minh', 'Miền Trung - Tây Nguyên', 'Đô thị đông dân cư nước đọng'],
    peakSeasons: ['Mùa mưa (Tháng 5 – 11 ở miền Nam)', 'Mùa hè - thu (Miền Bắc)'],
    vectors: ['Muỗi Aedes aegypti (muỗi vằn)', 'Muỗi Aedes albopictus'],
    occupationalRisks: ['Người làm việc ngoài trời', 'Học sinh, sinh viên sống tại ký túc xá / khu trọ ẩm thấp'],
    foodWaterRisks: ['Chum vại lu nước đọng quanh nhà không đậy nắp'],
    transmissionRoutes: ['Muỗi vằn đốt truyền virus từ người sang người'],
    incubationPeriod: '4 – 10 ngày (trung bình 5 – 7 ngày)',
    highRiskPopulations: ['Trẻ em', 'Phụ nữ mang thai', 'Người béo phì (BMI > 25)', 'Người có bệnh nền tim mạch, ĐTĐ, suy thận'],
    outbreakPotential: 'high',
    clinicalPearls: 'Tại vùng dịch lưu hành, bất kỳ bệnh nhân nào sốt cao đột ngột 2-7 ngày đều phải cảnh giác Dengue trước tiên.'
  },
  viem_phoi: {
    diseaseId: 'viem_phoi',
    diseaseName: 'Viêm phổi mắc phải cộng đồng (CAP)',
    icdCode: 'J18.9',
    specialty: 'Hô Hấp / Nhiễm',
    endemicAreas: ['Toàn quốc, đặc biệt các khu vực ô nhiễm không khí, thời tiết chuyển lạnh'],
    peakSeasons: ['Mùa Đông – Xuân (Miền Bắc)', 'Mùa mưa lạnh chuyển mùa (Miền Nam)'],
    vectors: ['Không qua vector côn trùng'],
    occupationalRisks: ['Công nhân xây dựng, mỏ than, tiếp xúc bụi đá silica', 'Nhân viên y tế'],
    foodWaterRisks: ['Hít sặc thức ăn/dịch vị ở bệnh nhân đột quỵ, hôn mê'],
    transmissionRoutes: ['Giọt bắn hô hấp qua ho, hắt hơi, hít phải vi sinh vật thường trú vùng hầu họng'],
    incubationPeriod: '1 – 3 ngày đối với virus, 2 – 7 ngày đối với vi khuẩn',
    highRiskPopulations: ['Người cao tuổi (≥ 65 tuổi)', 'Trẻ < 2 tuổi', 'Người nghiện rượu', 'BN suy giảm miễn dịch, COPD'],
    outbreakPotential: 'moderate',
    clinicalPearls: 'Phế cầu (Streptococcus pneumoniae) vẫn là căn nguyên hàng đầu; cảnh giác vi khuẩn không điển hình ở người trẻ.'
  },
  copd: {
    diseaseId: 'copd',
    diseaseName: 'Bệnh phổi tắc nghẽn mạn tính (COPD)',
    icdCode: 'J44.9',
    specialty: 'Hô Hấp',
    endemicAreas: ['Toàn quốc, tỷ lệ cao ở vùng nông thôn dùng bếp củi và đô thị ô nhiễm bụi mịn PM2.5'],
    peakSeasons: ['Đợt cấp bùng phát nhiều vào mùa lạnh Đông - Xuân và khi thời tiết thay đổi đột ngột'],
    vectors: ['Không'],
    occupationalRisks: ['Nông dân đun nấu than tổ ong/bếp củi', 'Công nhân luyện kim, dệt may, thợ mộc hít bụi gỗ'],
    foodWaterRisks: ['Không'],
    transmissionRoutes: ['Không lây nhiễm, bệnh lý tích lũy do phơi nhiễm khói độc'],
    incubationPeriod: 'Bệnh tiến triển mạn tính qua 20-30 năm hút thuốc',
    highRiskPopulations: ['Nam giới ≥ 40 tuổi hút thuốc lá/thuốc lào ≥ 20 gói-năm', 'Phụ nữ nông thôn tiếp xúc khói sinh khối'],
    outbreakPotential: 'sporadic',
    clinicalPearls: 'Mỗi đợt nhiễm trùng đường hô hấp trên vào mùa lạnh đều có thể châm ngòi cho một đợt cấp COPD đe dọa tính mạng.'
  },
  soc_nhiem_khuan: {
    diseaseId: 'soc_nhiem_khuan',
    diseaseName: 'Sốc nhiễm khuẩn & Nhiễm khuẩn huyết',
    icdCode: 'A41.9',
    specialty: 'Hồi Sức Cấp Cứu',
    endemicAreas: ['Toàn quốc, cả cộng đồng và nhiễm khuẩn bệnh viện (HAIs)'],
    peakSeasons: ['Quanh năm'],
    vectors: ['Có thể từ vết thương ngập lụt, côn trùng đốt nhiễm trùng'],
    occupationalRisks: ['Lao động tiếp xúc bùn đất cống rãnh (Burkholderia pseudomallei - Whitmore)', 'Giết mổ lợn (Streptococcus suis)'],
    foodWaterRisks: ['Ăn tiết canh, thịt lợn sống/tái, hải sản sống (Vibrio vulnificus)'],
    transmissionRoutes: ['Nhiễm trùng từ ổ tiên phát (phổi, tiết niệu, đường mật, mô mềm) lan vào máu'],
    incubationPeriod: 'Vài giờ đến vài ngày',
    highRiskPopulations: ['Bệnh nhân nằm viện lâu ngày, đặt ống thông xâm lấn', 'Người xơ gan, ĐTĐ, người già, suy giảm miễn dịch'],
    outbreakPotential: 'low',
    clinicalPearls: 'Hỏi kỹ tiền sử ăn tiết canh (nghiên cứu lợn) hoặc lội bùn ruộng mùa mưa lũ (bệnh Whitmore).'
  },
  lao_phoi: {
    diseaseId: 'lao_phoi',
    diseaseName: 'Lao phổi (Tuberculosis)',
    icdCode: 'A15',
    specialty: 'Hô Hấp / Truyền Nhiễm',
    endemicAreas: ['Việt Nam nằm trong top 30 quốc gia có gánh nặng bệnh lao cao nhất thế giới'],
    peakSeasons: ['Quanh năm, phát hiện nhiều sau các đợt suy giảm thể trạng'],
    vectors: ['Không'],
    occupationalRisks: ['Nhân viên y tế khoa hô hấp/lao', 'Quản giáo trại giam', 'Công nhân môi trường'],
    foodWaterRisks: ['Uống sữa bò tươi chưa tiệt trùng (Mycobacterium bovis)'],
    transmissionRoutes: ['Lây qua đường không khí khi người bệnh ho, khạc, hắt hơi phát tán hạt khí dung'],
    incubationPeriod: '2 – 12 tuần (hoặc lao tiềm ẩn kéo dài nhiều năm)',
    highRiskPopulations: ['Người nhiễm HIV', 'Bệnh nhân dùng thuốc ức chế miễn dịch (Anti-TNF, Corticoid)', 'Người suy dinh dưỡng'],
    outbreakPotential: 'moderate',
    clinicalPearls: 'Ho khạc kéo dài trên 2 tuần kèm sốt nhẹ về chiều tại Việt Nam phải luôn xét nghiệm đờm tìm AFB/GeneXpert.'
  },
  viem_mang_nao_mu: {
    diseaseId: 'viem_mang_nao_mu',
    diseaseName: 'Viêm màng não mủ cấp',
    icdCode: 'G00.9',
    specialty: 'Thần Kinh / Truyền Nhiễm',
    endemicAreas: ['Toàn quốc, ổ dịch não mô cầu xuất hiện rải rác ở tập thể đóng kín'],
    peakSeasons: ['Đông - Xuân (Não mô cầu), Mùa hè (Phế cầu, Viêm não Nhật Bản)'],
    vectors: ['Muỗi Culex (trong Viêm não Nhật Bản phối hợp)'],
    occupationalRisks: ['Doanh trại quân đội, ký túc xá, nhà trẻ', 'Người giết mổ gia súc lợn'],
    foodWaterRisks: ['Ăn tiết canh, lòng lợn sống (Liên cầu lợn Streptococcus suis)'],
    transmissionRoutes: ['Giọt bắn hô hấp qua tiếp xúc gần hoặc qua đường tiêu hóa/vết xước da'],
    incubationPeriod: '1 – 7 ngày đối với Não mô cầu, 1 – 3 ngày đối với Liên cầu lợn',
    highRiskPopulations: ['Trẻ nhỏ < 5 tuổi', 'Thanh thiếu niên sống tập thể', 'Người đã cắt lách (nguy cơ cao với vi khuẩn có vỏ)'],
    outbreakPotential: 'high',
    clinicalPearls: 'Sốt cao, đau đầu, gáy cứng kèm ban xuất huyết hoại tử hình sao là dấu chỉ điểm của Não mô cầu nguy kịch.'
  },
  thuyen_tac_phoi: {
    diseaseId: 'thuyen_tac_phoi',
    diseaseName: 'Thuyên tắc động mạch phổi cấp (PE)',
    icdCode: 'I26.9',
    specialty: 'Tim Mạch',
    endemicAreas: ['Toàn quốc, xuất hiện tại mọi cơ sở y tế tiếp nhận bệnh nhân nằm bất động'],
    peakSeasons: ['Quanh năm'],
    vectors: ['Không'],
    occupationalRisks: ['Người lái xe đường dài, phi công, nhân viên văn phòng ngồi liên tục > 6-8 giờ'],
    foodWaterRisks: ['Không'],
    transmissionRoutes: ['Không lây nhiễm'],
    incubationPeriod: 'Hình thành sau vài ngày đến vài tuần nằm bất động hoặc sau phẫu thuật lớn',
    highRiskPopulations: ['Sau phẫu thuật thay khớp háng/gối', 'Bệnh nhân ung thư tiến triển', 'Phụ nữ mang thai hoặc dùng thuốc tránh thai phối hợp'],
    outbreakPotential: 'sporadic',
    clinicalPearls: 'Khó thở đột ngột không giải thích được sau chuyến bay dài hoặc sau bất động chi là dấu hiệu cảnh báo số 1.'
  },
  xo_gan: {
    diseaseId: 'xo_gan',
    diseaseName: 'Xơ gan & Biến chứng tăng áp cửa',
    icdCode: 'K74.6',
    specialty: 'Tiêu Hóa & Gan Mật',
    endemicAreas: ['Việt Nam có tỷ lệ nhiễm virus Viêm gan B (8-12%) và Viêm gan C (1-2%) hàng đầu khu vực'],
    peakSeasons: ['Quanh năm, đợt mất bù hay bùng phát sau các dịp lễ tết uống nhiều rượu bia'],
    vectors: ['Không'],
    occupationalRisks: ['Thợ sơn, công nhân tiếp xúc hóa chất độc gan (Carbon tetrachloride)'],
    foodWaterRisks: ['Ăn ngũ cốc, ngô mốc nhiễm độc tố Aflatoxin (tăng nguy cơ K gan trên nền xơ gan)'],
    transmissionRoutes: ['Lây qua đường máu, quan hệ tình dục không an toàn, mẹ truyền sang con (HBV, HCV)'],
    incubationPeriod: 'Xơ hóa tiến triển âm thầm 15-30 năm từ khi nhiễm viêm gan mạn',
    highRiskPopulations: ['Người nghiện rượu mạn tính', 'Người mang virus HBV/HCV mạn chưa điều trị kháng virus'],
    outbreakPotential: 'sporadic',
    clinicalPearls: 'Hỏi kỹ tiền sử tiêm chích, truyền máu trước năm 1992, xăm mình và lượng cồn tiêu thụ mỗi ngày.'
  },
  nhiem_trung_tiet_nieu: {
    diseaseId: 'nhiem_trung_tiet_nieu',
    diseaseName: 'Nhiễm trùng đường tiết niệu & Viêm đài bể thận',
    icdCode: 'N39.0',
    specialty: 'Tiết Niệu',
    endemicAreas: ['Toàn quốc'],
    peakSeasons: ['Mùa hè thời tiết nóng bức (mất nước, cô đặc nước tiểu)'],
    vectors: ['Không'],
    occupationalRisks: ['Công nhân may, tài xế thường xuyên nhịn tiểu và uống ít nước'],
    foodWaterRisks: ['Uống ít nước, dùng nguồn nước sinh hoạt không hợp vệ sinh'],
    transmissionRoutes: ['Nhiễm trùng ngược dòng từ vi khuẩn đường tiêu hóa qua lỗ niệu đạo'],
    incubationPeriod: '1 – 3 ngày',
    highRiskPopulations: ['Phụ nữ trẻ hoạt động tình dục', 'Phụ nữ mãn kinh', 'Bệnh nhân đặt ống thông tiểu lưu (CAUTI)'],
    outbreakPotential: 'low',
    clinicalPearls: 'Phụ nữ có niệu đạo ngắn nên tỷ lệ mắc cao gấp 30 lần nam giới; nam giới bị UTI bắt buộc tìm dị tật tắc nghẽn hoặc sỏi.'
  },
  viem_loet_da_day_hp: {
    diseaseId: 'viem_loet_da_day_hp',
    diseaseName: 'Viêm loét dạ dày tá tràng & Nhiễm H. Pylori',
    icdCode: 'K25.9',
    specialty: 'Tiêu Hóa',
    endemicAreas: ['Tỷ lệ nhiễm H. pylori trong cộng đồng người Việt Nam ước tính lên đến 70%'],
    peakSeasons: ['Quanh năm'],
    vectors: ['Không'],
    occupationalRisks: ['Người làm việc căng thẳng thần kinh, trực đêm nhiều, tài xế'],
    foodWaterRisks: ['Ăn uống chung bát nước chấm, dùng chung đũa thìa gắp thức ăn'],
    transmissionRoutes: ['Đường phân – miệng và đường miệng – miệng trong gia đình'],
    incubationPeriod: 'Nhiễm trùng mạn tính thường mắc từ thời thơ ấu',
    highRiskPopulations: ['Người có người thân cùng nhà nhiễm HP', 'Người lạm dụng rượu, thuốc lá, thuốc giảm đau NSAIDs'],
    outbreakPotential: 'sporadic',
    clinicalPearls: 'Tập quán ăn uống chung bát chấm tại Việt Nam là nguyên nhân chính gây lây nhiễm chéo H. pylori trong gia đình.'
  }
};

/**
 * Lấy hồ sơ dịch tễ học của một bệnh lý
 */
export function getEpidemiologyProfileForDisease(diseaseId: string): DiseaseEpidemiologyProfile | undefined {
  return EPIDEMIOLOGY_DATABASE[diseaseId];
}

/**
 * Đánh giá mức độ phù hợp giữa bối cảnh dịch tễ của bệnh nhân và bệnh lý mục tiêu
 * Trả về điểm cộng dịch tễ (0 - 15 điểm) và lý do biện luận
 */
export function matchEpidemiologyBoost(
  diseaseId: string,
  ctx: EpidemiologyContext
): { score: number; reasons: string[] } {
  const profile = EPIDEMIOLOGY_DATABASE[diseaseId];
  if (!profile) return { score: 0, reasons: [] };

  let score = 0;
  const reasons: string[] = [];

  // 1. Kiểm tra Vùng lưu hành
  if (ctx.endemicArea && ctx.endemicArea.trim() !== '') {
    const matched = profile.endemicAreas.some(area => 
      ctx.endemicArea.toLowerCase().includes(area.toLowerCase()) || 
      area.toLowerCase().includes(ctx.endemicArea.toLowerCase())
    );
    if (matched) {
      score += 4;
      reasons.push(`Nơi cư trú/lưu hành phù hợp vùng dịch: ${ctx.endemicArea}`);
    }
  }

  // 2. Kiểm tra Mùa bệnh
  if (ctx.seasonalContext && ctx.seasonalContext.trim() !== '') {
    const matched = profile.peakSeasons.some(season =>
      ctx.seasonalContext.toLowerCase().includes(season.toLowerCase()) ||
      season.toLowerCase().includes(ctx.seasonalContext.toLowerCase())
    );
    if (matched) {
      score += 3;
      reasons.push(`Thời điểm mắc bệnh rơi vào mùa cao điểm dịch tễ`);
    }
  }

  // 3. Kiểm tra Tiếp xúc Vector côn trùng / Động vật
  if (ctx.vectorExposure && ctx.vectorExposure.trim() !== '') {
    const matched = profile.vectors.some(vec =>
      ctx.vectorExposure.toLowerCase().includes(vec.toLowerCase()) ||
      vec.toLowerCase().includes(ctx.vectorExposure.toLowerCase())
    );
    if (matched) {
      score += 4;
      reasons.push(`Tiền sử tiếp xúc vector truyền bệnh: ${ctx.vectorExposure}`);
    }
  }

  // 4. Kiểm tra Nguy cơ Nghề nghiệp
  if (ctx.occupationalRisk && ctx.occupationalRisk.trim() !== '') {
    const matched = profile.occupationalRisks.some(occ =>
      ctx.occupationalRisk.toLowerCase().includes(occ.toLowerCase()) ||
      occ.toLowerCase().includes(ctx.occupationalRisk.toLowerCase())
    );
    if (matched) {
      score += 2;
      reasons.push(`Yếu tố nguy cơ nghề nghiệp liên quan`);
    }
  }

  // 5. Kiểm tra Nguồn nước / Thực phẩm
  if (ctx.waterFoodRisk && ctx.waterFoodRisk.trim() !== '') {
    const matched = profile.foodWaterRisks.some(food =>
      ctx.waterFoodRisk.toLowerCase().includes(food.toLowerCase()) ||
      food.toLowerCase().includes(ctx.waterFoodRisk.toLowerCase())
    );
    if (matched) {
      score += 3;
      reasons.push(`Phơi nhiễm nguồn nước/thực phẩm nguy cơ cao`);
    }
  }

  return {
    score: Math.min(score, 15), // Chặn trên tối đa 15 điểm boost
    reasons
  };
}
