/**
 * CliniPortal — Epidemiology & Public Health (Dịch Tễ Học Y Khoa & Y Tế Công Cộng) SPA View
 * Path: src/content/basic-medical/views/epidemiology-view.ts
 * 
 * Bố cục chuẩn mực theo Chuyên Khoa Lâm Sàng (đồng bộ 100% với Cơ Chế Bệnh Sinh & Sinh Lý Bệnh):
 * - Hero Surveillance Theme & KPI Bar
 * - Compact Isolated Toolkit Suite (Giải Ma Trận 2×2, Epicurve, Study Designs, Bradford Hill, 6 Khối Lý Thuyết)
 * - Sticky Left Navigation: Danh mục 9 Chuyên Khoa Lâm Sàng
 * - Live Multilingual Search & Grid/List View Toggle
 * - Rich Specialty Cards & Deep Interactive Factsheet Modal
 */

import '../../../styles/components/module-dashboard.css';
import '../../../styles/components/physio-content.css';
import '../../../styles/components/formula-vault.css';
import '../../../styles/components/physio-promax-hub.css';
import '../../../styles/components/epidemiology-hub.css';
import '../../../styles/components/biochemistry-hub.css';
import { 
  EPIDEMIOLOGY_BLOCKS, 
  EPIDEMIOLOGY_TOPICS 
} from '../data/epidemiology-data';

// Định nghĩa cấu trúc bài viết Dịch tễ học bệnh lý theo chuyên khoa
export interface SpecialtyEpidemiologyItem {
  id: string;
  code: string;
  icd: string;
  specialtyId: string;
  title: string;
  slug?: string;
  hasFullArticle?: boolean;
  keyMetric: string;
  vectorOrCause: string;
  icon: string;
  color: string;
  bgColor: string;
  overview: string;
  pearlPreview: string;
  highYieldStats: string[];
  tags: string[];
}

export interface ClinicalSpecialtySection {
  id: string;
  name: string;
  shortName: string;
  icon: string;
  color: string;
  bgColor: string;
  description: string;
  items: SpecialtyEpidemiologyItem[];
}

export const EPIDEMIOLOGY_SPECIALTY_SECTIONS: ClinicalSpecialtySection[] = [
  {
    id: 'epi-truyen-nhiem',
    name: '1. Truyền Nhiễm & Y Học Nhiệt Đới',
    shortName: 'Truyền nhiễm & Nhiệt đới',
    icon: 'fa-virus-covid',
    color: '#ef4444',
    bgColor: 'rgba(239, 68, 68, 0.12)',
    description: 'Động học lây truyền vector, hệ số lây nhiễm R0/Rt, chu kỳ ủ bệnh, miễn dịch bầy đàn và phác đồ dập dịch chuẩn WHO & Bộ Y Tế.',
    items: [
      {
        id: 'dth-dengue',
        code: 'DTH-DEN',
        icd: 'ICD-10: A90–A91',
        specialtyId: 'epi-truyen-nhiem',
        title: 'Dịch Tễ Học Sốt Xuất Huyết Dengue (DENV)',
        slug: 'dth-dengue',
        hasFullArticle: true,
        keyMetric: 'CFR sốc DSS: 1-5% • R0: 2.0-4.5',
        vectorOrCause: 'Véc-tơ Aedes aegypti / albopictus',
        icon: 'fa-mosquito',
        color: '#ef4444',
        bgColor: 'rgba(239, 68, 68, 0.12)',
        overview: 'Tam giác dịch tễ học DENV, sinh học muỗi véc-tơ, chu kỳ ủ bệnh ngoại lai (EIP), cơ chế tăng cường miễn dịch phụ thuộc kháng thể (ADE), số liệu dịch kỷ lục và phác đồ phòng chống.',
        pearlPreview: 'Tái nhiễm khác serotype kích hoạt ADE gây bão cytokine, rò rỉ huyết tương và sốc DSS nguy kịch.',
        highYieldStats: ['4 Serotype (DENV 1-4)', 'EIP: 8-12 ngày', 'Mưa ẩm & Đô thị hóa'],
        tags: ['Aedes', 'ADE', 'DENV 1-4', 'Sốc Dengue', 'WHO 2024']
      },
      {
        id: 'dth-sot-ret',
        code: 'DTH-MAL',
        icd: 'ICD-10: B50–B54',
        specialtyId: 'epi-truyen-nhiem',
        title: 'Dịch Tễ Học Bệnh Sốt Rét (Malaria / Plasmodium)',
        slug: 'dth-sot-ret',
        hasFullArticle: true,
        keyMetric: 'Gánh nặng: 249M ca/năm • CFR P.falciparum: ~0.3%',
        vectorOrCause: 'Véc-tơ muỗi Anopheles',
        icon: 'fa-mosquito',
        color: '#d97706',
        bgColor: 'rgba(217, 119, 6, 0.12)',
        overview: '5 loài Plasmodium, thể ngủ gan (Hypnozoites), động học lây truyền muỗi Anopheles, 4 mối đe dọa sinh học (kháng Artemisinin gen pfk13, xóa gen pfhrp2/3), WHO 2025 và QĐ 4922/QĐ-BYT.',
        pearlPreview: 'Điều trị tiệt căn P. vivax bắt buộc dùng Primaquine tiêu diệt thể ngủ và phải xét nghiệm men G6PD.',
        highYieldStats: ['P. falciparum & P. vivax', 'Gen kháng pfk13', 'Xóa gen pfhrp2/3'],
        tags: ['Anopheles', 'Plasmodium', 'Hypnozoites', 'Artemisinin', 'G6PD']
      },
      {
        id: 'dth-thuy-dau',
        code: 'DTH-VZV',
        icd: 'ICD-10: B01–B02',
        specialtyId: 'epi-truyen-nhiem',
        title: 'Dịch Tễ Học Bệnh Thủy Đậu (Varicella / VZV)',
        slug: 'dth-thuy-dau',
        hasFullArticle: true,
        keyMetric: 'R0 ≈ 10–12 • Tử vong người lớn gấp 23–29 lần',
        vectorOrCause: 'Đường hô hấp & Giọt bắn không khí',
        icon: 'fa-shield-virus',
        color: '#8b5cf6',
        bgColor: 'rgba(139, 92, 246, 0.12)',
        overview: 'Sự tương phản sâu sắc ôn đới vs nhiệt đới, tỷ lệ tử vong chữ U (gấp 23–29 lần ở người lớn), kỷ nguyên vắc-xin 1-liều/2-liều, rủi ro dịch chuyển tuổi khi độ bao phủ thấp dưới 80% (WHO).',
        pearlPreview: 'Bao phủ vắc-xin <80% đẩy lùi tuổi mắc bệnh sang người lớn, làm tăng ca biến chứng viêm phổi và tử vong chung.',
        highYieldStats: ['Tử vong chữ U', 'Tuổi mắc chuyển dịch', 'Vắc-xin 2 liều'],
        tags: ['VZV', 'Varicella', 'Vaccine', 'R0 ≈ 10-12', 'Tuổi mắc']
      },
      {
        id: 'dth-viem-mang-nao',
        code: 'DTH-MEN',
        icd: 'ICD-10: G00, G03, A17, B37.5',
        specialtyId: 'epi-truyen-nhiem',
        title: 'Dịch Tễ Học Viêm Màng Não (Meningitis)',
        slug: 'dth-viem-mang-nao',
        hasFullArticle: true,
        keyMetric: 'Gánh nặng GBD: 2.51M ca • S. suis VN: 52.3% ca người lớn',
        vectorOrCause: 'Phế cầu, Não mô cầu, H. influenzae, S. suis & Lao màng não TBM',
        icon: 'fa-brain',
        color: '#dc2626',
        bgColor: 'rgba(220, 38, 38, 0.12)',
        overview: 'Gánh nặng GBD 2.51 triệu ca toàn cầu, dịch tễ vi khuẩn theo lứa tuổi (ESCMID), Streptococcus suis từ lợn chiếm 52.3% ca viêm màng não mủ người lớn tại Việt Nam, lao màng não TBM và lộ trình WHO Defeating Meningitis by 2030.',
        pearlPreview: 'Tại Việt Nam, Streptococcus suis từ thực phẩm/chăn nuôi lợn là căn nguyên hàng đầu gây viêm màng não người lớn và để lại di chứng điếc tiếp nhận vĩnh viễn.',
        highYieldStats: ['S. suis VN 52.3%', 'ESCMID theo lứa tuổi', 'Lao màng não TBM', 'Cryptococcus HIV'],
        tags: ['Viêm màng não', 'Meningitis', 'Streptococcus suis', 'Lao màng não', 'ESCMID', 'WHO 2030']
      },
      {
        id: 'dth-measles',
        code: 'DTH-MEA',
        icd: 'ICD-10: B05',
        specialtyId: 'epi-truyen-nhiem',
        title: 'Dịch Tễ Học Bệnh Sởi (Measles / Morbillivirus)',
        hasFullArticle: false,
        keyMetric: 'R0 cao nhất: 12–18 • Ngưỡng miễn dịch cộng đồng: ≥ 95%',
        vectorOrCause: 'Sol khí lơ lửng (Aerosol lơ lửng tới 2h)',
        icon: 'fa-head-side-cough',
        color: '#ef4444',
        bgColor: 'rgba(239, 68, 68, 0.12)',
        overview: 'Bệnh truyền nhiễm có hệ số lây nhiễm R0 cao nhất ở người. Hiện tượng "Xóa trí nhớ miễn dịch" (Immune Amnesia) sau nhiễm sởi làm tăng nguy cơ tử vong do các nhiễm trùng thứ phát trong 2-3 năm tiếp theo.',
        pearlPreview: 'Sởi phá hủy 20–70% kháng thể nhớ trước đó, khiến cơ thể dễ tử vong vì viêm phổi, tiêu chảy thứ phát.',
        highYieldStats: ['Immune Amnesia', 'Bao phủ vaccine ≥ 95%', 'Vitamin A liều cao'],
        tags: ['Sởi', 'Measles', 'R0 12-18', 'Immune Amnesia', 'Vaccine MMR']
      },
      {
        id: 'dth-hiv-sti',
        code: 'DTH-HIV',
        icd: 'ICD-10: B20–B24',
        specialtyId: 'epi-truyen-nhiem',
        title: 'Dịch Tễ Học HIV/AIDS & Nhiễm Trùng Lây Qua Đường Tình Dục',
        hasFullArticle: false,
        keyMetric: 'Mục tiêu UNAIDS: 95-95-95 • U=U (K=K)',
        vectorOrCause: 'Máu, Quan hệ tình dục & Mẹ truyền sang con',
        icon: 'fa-ribbon',
        color: '#e11d48',
        bgColor: 'rgba(225, 29, 72, 0.12)',
        overview: 'Chuyển dịch mô hình lây truyền HIV từ tiêm chích ma túy sang nhóm nam quan hệ tình dục đồng giới (MSM). Bằng chứng khoa học K=K (Không phát hiện = Không lây truyền) và hiệu quả điều trị dự phòng trước phơi nhiễm (PrEP).',
        pearlPreview: 'Tải lượng virus HIV dưới ngưỡng phát hiện (<200 bản sao/mL) hoàn toàn KHÔNG lây truyền qua đường tình dục (U=U).',
        highYieldStats: ['PrEP hiệu quả > 99%', 'Chiến lược 95-95-95', 'U=U / K=K'],
        tags: ['HIV', 'PrEP', 'U=U', 'MSM', 'UNAIDS']
      },
      {
        id: 'dth-bach-hau',
        code: 'DTH-DIP',
        icd: 'ICD-10: A36',
        specialtyId: 'epi-truyen-nhiem',
        title: 'Dịch Tễ Học Bệnh Bạch Hầu (Diphtheria)',
        slug: 'dth-bach-hau',
        hasFullArticle: true,
        keyMetric: 'R0: 1,7–4,3 • POR tiếp xúc: 11,94 • Bao phủ DPT3 VN 2023: 64,9%',
        vectorOrCause: 'Corynebacterium diphtheriae, Giọt bắn hô hấp & Bạch hầu da (ổ chứa thầm lặng)',
        icon: 'fa-lungs-virus',
        color: '#0284c7',
        bgColor: 'rgba(2, 132, 199, 0.12)',
        overview: 'Nguồn truyền nhiễm độc quyền ở người, ổ chứa thầm lặng từ bạch hầu da, hệ số lây nhiễm R0 từ 1,7–4,3, nguy cơ bùng phát tại vùng lõm tiêm chủng, đợt bùng phát Tây Phi 2023 và diễn biến các ổ dịch tại Việt Nam.',
        pearlPreview: 'Bạch hầu da là ổ chứa thầm lặng duy trì mầm bệnh trong cộng đồng; tỷ lệ tiêm DPT3 sụt giảm xuống 64,9% tại Việt Nam tạo ra khoảng trống miễn dịch đáng báo động.',
        highYieldStats: ['R0: 1,7–4,3', 'Ổ chứa bạch hầu da', 'Bao phủ DPT3 VN 64,9%', 'Kháng độc tố DAT', 'Meta-analysis 29 NC'],
        tags: ['Bạch hầu', 'Diphtheria', 'DTP3', 'DAT', 'C. diphtheriae', 'R0']
      }
    ]
  },
  {
    id: 'epi-tim-mach',
    name: '2. Tim Mạch & Đột Quỵ',
    shortName: 'Tim mạch & Đột quỵ',
    icon: 'fa-heart-pulse',
    color: '#dc2626',
    bgColor: 'rgba(220, 38, 38, 0.12)',
    description: 'Nguyên nhân tử vong và mất DALYs hàng đầu thế giới. Đo lường tỷ suất mới mắc, quy tắc một nửa (Rule of Halves) và phân tầng nguy cơ 10 năm.',
    items: [
      {
        id: 'dth-hypertension',
        code: 'DTH-THA',
        icd: 'ICD-10: I10–I15',
        specialtyId: 'epi-tim-mach',
        title: 'Dịch Tễ Học Tăng Huyết Áp (Hypertension)',
        hasFullArticle: false,
        keyMetric: 'Prevalence người lớn: ~33% • DALYs mất: #1 toàn cầu',
        vectorOrCause: 'Lượng muối ăn cao, Ít vận động, Rượu bia & Tuổi già',
        icon: 'fa-gauge-high',
        color: '#dc2626',
        bgColor: 'rgba(220, 38, 38, 0.12)',
        overview: 'Kẻ giết người thầm lặng: Tăng huyết áp là yếu tố nguy cơ đơn lẻ lớn nhất gây tử vong tim mạch và đột quỵ. Tồn tại "Quy tắc 1/2": 1/2 không biết mắc bệnh, 1/2 biết nhưng không điều trị, 1/2 điều trị nhưng không đạt huyết áp mục tiêu.',
        pearlPreview: 'Giảm 5 mmHg huyết áp tâm thu làm giảm 10% biến cố tim mạch chính và 13% tỷ lệ tử vong do mọi nguyên nhân.',
        highYieldStats: ['Rule of Halves', 'Attributable Risk Đột quỵ > 50%', 'DASH Diet & Giảm Muối'],
        tags: ['Tăng huyết áp', 'Rule of Halves', 'Muối ăn', 'Đột quỵ', 'Framingham']
      },
      {
        id: 'dth-cad-mi',
        code: 'DTH-CAD',
        icd: 'ICD-10: I20–I25',
        specialtyId: 'epi-tim-mach',
        title: 'Dịch Tễ Học Bệnh Mạch Vành & Nhồi Máu Cơ Tim (CAD / MI)',
        hasFullArticle: false,
        keyMetric: 'Tử vong do bệnh tim thiếu máu cục bộ: ~9 triệu ca/năm',
        vectorOrCause: 'Xơ vữa động mạch, Hút thuốc lá, Rối loạn lipid máu, ĐTĐ',
        icon: 'fa-heart-crack',
        color: '#b91c1c',
        bgColor: 'rgba(185, 28, 28, 0.12)',
        overview: 'Nghiên cứu kinh điển Framingham Heart Study đặt nền móng cho dịch tễ học tim mạch hiện đại. Phân biệt yếu tố nguy cơ kinh điển (Hút thuốc lá, Tăng LDL-C, Tăng HA, ĐTĐ) và thang điểm SCORE2 theo phân vùng địa lý.',
        pearlPreview: 'Từ bỏ hút thuốc lá giúp giảm 50% nguy cơ tái phát nhồi máu cơ tim chỉ sau 1 năm cai thuốc hoàn toàn.',
        highYieldStats: ['Framingham Study', 'SCORE2 Risk Engine', 'LDL-C Attributable Risk'],
        tags: ['Mạch vành', 'Nhồi máu cơ tim', 'Framingham', 'SCORE2', 'Xơ vữa']
      },
      {
        id: 'dth-stroke',
        code: 'DTH-STR',
        icd: 'ICD-10: I60–I64',
        specialtyId: 'epi-tim-mach',
        title: 'Dịch Tễ Học Đột Quỵ Não (Stroke / Tai Biến Mạch Máu Não)',
        hasFullArticle: false,
        keyMetric: 'Tỷ lệ tử vong & tàn phế #2 toàn cầu • 85% Thiếu máu não',
        vectorOrCause: 'Tăng huyết áp, Rung nhĩ, Đái tháo đường, Hút thuốc lá',
        icon: 'fa-brain',
        color: '#991b1b',
        bgColor: 'rgba(153, 27, 27, 0.12)',
        overview: 'Gánh nặng kép: Tử vong sớm và tàn tật kéo dài (DALYs). Phân loại dịch tễ Đột quỵ thiếu máu não cục bộ (Ischemic ~85%) vs Đột quỵ xuất huyết não (Hemorrhagic ~15%). Rung nhĩ làm tăng nguy cơ đột quỵ gấp 5 lần.',
        pearlPreview: 'Rung nhĩ không được dùng kháng đông là nguyên nhân gây ra các ca đột quỵ tắc mạch diện rộng và tử vong cao nhất.',
        highYieldStats: ['Rung nhĩ tăng nguy cơ 5x', 'Cửa sổ vàng 4.5h rtPA', 'Tàn tật DALYs'],
        tags: ['Đột quỵ', 'Tai biến', 'Rung nhĩ', 'CHA2DS2-VASc', 'Tàn tật']
      },
      {
        id: 'dth-heart-failure',
        code: 'DTH-HF',
        icd: 'ICD-10: I50',
        specialtyId: 'epi-tim-mach',
        title: 'Dịch Tễ Học Suy Tim (Heart Failure)',
        hasFullArticle: false,
        keyMetric: 'Prevalence: 1-2% dân số • CFR 5 năm ≈ 50%',
        vectorOrCause: 'Hậu quả cuối cùng của Tăng huyết áp, Nhồi máu cơ tim & Bệnh van tim',
        icon: 'fa-heart-pulse',
        color: '#ea580c',
        bgColor: 'rgba(234, 88, 12, 0.12)',
        overview: 'Giai đoạn cuối của chuỗi bệnh lý tim mạch. Dịch tễ học dân số già hóa khiến tỷ lệ mắc suy tim bảo tồn phân suất tống máu (HFpEF) tăng vọt, tỷ lệ tái nhập viện trong 30 ngày lên tới 20-25%.',
        pearlPreview: 'Tỷ lệ sống sót sau 5 năm của suy tim tương đương hoặc xấu hơn nhiều loại ung thư ác tính phổ biến.',
        highYieldStats: ['Tái nhập viện 30 ngày ~25%', 'HFpEF tăng theo tuổi', '4 Trụ Cột GDMT'],
        tags: ['Suy tim', 'Tái nhập viện', 'HFpEF', 'HFrEF', 'Già hóa dân số']
      }
    ]
  },
  {
    id: 'epi-ho-hap',
    name: '3. Hô Hấp & Bệnh Phổi',
    shortName: 'Hô hấp & Phổi',
    icon: 'fa-lungs',
    color: '#0284c7',
    bgColor: 'rgba(2, 132, 199, 0.12)',
    description: 'Dịch tễ học bệnh phổi tắc nghẽn, ô nhiễm không khí PM2.5, khói thuốc lá, vi khuẩn lao và gánh nặng nhiễm trùng đường hô hấp dưới.',
    items: [
      {
        id: 'dth-copd',
        code: 'DTH-COPD',
        icd: 'ICD-10: J44',
        specialtyId: 'epi-ho-hap',
        title: 'Dịch Tễ Học Bệnh Phổi Tắc Nghẽn Mạn Tính (COPD)',
        hasFullArticle: false,
        keyMetric: 'Nguyên nhân tử vong #3 toàn cầu • PAF khói thuốc: > 75%',
        vectorOrCause: 'Khói thuốc lá, Khói bếp sinh khối & Bụi mịn PM2.5',
        icon: 'fa-lungs',
        color: '#0284c7',
        bgColor: 'rgba(2, 132, 199, 0.12)',
        overview: 'Căn bệnh tiến triển âm thầm với gánh nặng khổng lồ. Tỷ phần quy thuộc (Attributable Fraction) do thuốc lá chiếm > 75% ở các nước phát triển, trong khi ô nhiễm không khí trong nhà do đun nấu chất đốt sinh khối là yếu tố chính ở phụ nữ nông thôn.',
        pearlPreview: 'Cai thuốc lá là can thiệp dịch tễ duy nhất chứng minh làm chậm tốc độ suy giảm FEV1 hàng năm ở bệnh nhân COPD.',
        highYieldStats: ['PAF Thuốc lá > 75%', 'PM2.5 Môi trường', 'Chiến lược GOLD 2024'],
        tags: ['COPD', 'Thuốc lá', 'Bụi mịn PM2.5', 'GOLD', 'FEV1']
      },
      {
        id: 'dth-tuberculosis',
        code: 'DTH-TB',
        icd: 'ICD-10: A15–A19',
        specialtyId: 'epi-ho-hap',
        title: 'Dịch Tễ Học Lao Phổi & Lao Kháng Thuốc (Tuberculosis / MDR-TB)',
        hasFullArticle: false,
        keyMetric: '1/4 dân số nhiễm Lao tiềm ẩn (LTBI) • 10.6M ca mắc mới/năm',
        vectorOrCause: 'Vi khuẩn Mycobacterium tuberculosis lây qua giọt bắn hô hấp',
        icon: 'fa-bacteria',
        color: '#0369a1',
        bgColor: 'rgba(3, 105, 161, 0.12)',
        overview: 'Việt Nam nằm trong top 30 quốc gia có gánh nặng bệnh lao và lao kháng đa thuốc (MDR-TB) cao nhất thế giới. Chỉ 5-10% người nhiễm lao tiềm ẩn tiến triển thành bệnh lao hoạt động trong đời (tăng gấp 20 lần nếu nhiễm kèm HIV).',
        pearlPreview: 'Đồng nhiễm HIV-Lao tạo thành "vòng xoáy tử thần": Lao là nguyên nhân tử vong hàng đầu ở người sống chung với HIV.',
        highYieldStats: ['Lao tiềm ẩn LTBI 25%', 'MDR-TB Kháng Rifampicin', 'Chiến lược End TB'],
        tags: ['Lao', 'Tuberculosis', 'MDR-TB', 'LTBI', 'GeneXpert']
      },
      {
        id: 'dth-asthma',
        code: 'DTH-AST',
        icd: 'ICD-10: J45',
        specialtyId: 'epi-ho-hap',
        title: 'Dịch Tễ Học Hen Phế Quản (Asthma)',
        hasFullArticle: false,
        keyMetric: 'Bệnh mạn tính phổ biến nhất ở trẻ em (~10-14%)',
        vectorOrCause: 'Cơ địa dị ứng, Mạt bụi nhà, Lông thú & Thuyết vệ sinh',
        icon: 'fa-wind',
        color: '#0ea5e9',
        bgColor: 'rgba(14, 165, 233, 0.12)',
        overview: 'Dịch tễ học hen chứng kiến sự gia tăng tại các nước công nghiệp hóa. "Giả thuyết vệ sinh" (Hygiene Hypothesis) giải thích việc trẻ em ít tiếp xúc với vi sinh vật trong môi trường sớm có nguy cơ mắc bệnh dị ứng và hen cao hơn.',
        pearlPreview: 'Sử dụng quá mức thuốc cắt cơn SABA đơn độc (≥3 bình xịt/năm) liên quan trực tiếp đến tăng tỷ lệ tử vong do hen (GINA).',
        highYieldStats: ['Hygiene Hypothesis', 'Trẻ em chiếm tỷ lệ cao', 'Khuyến cáo GINA'],
        tags: ['Hen phế quản', 'Asthma', 'Hygiene Hypothesis', 'GINA', 'Atopy']
      }
    ]
  },
  {
    id: 'epi-tieu-hoa',
    name: '4. Tiêu Hóa & Gan Mật',
    shortName: 'Tiêu hóa & Gan mật',
    icon: 'fa-bowl-food',
    color: '#d97706',
    bgColor: 'rgba(217, 119, 6, 0.12)',
    description: 'Dịch tễ học viêm gan siêu vi B/C, tỷ lệ nhiễm H. pylori, xơ gan do rượu/MASH và sàng lọc sớm ung thư đường tiêu hóa.',
    items: [
      {
        id: 'dth-vgsv-b',
        code: 'DTH-HBV',
        icd: 'ICD-10: B18.0, B18.1, B16',
        specialtyId: 'epi-tieu-hoa',
        title: 'Dịch Tễ Học Viêm Gan Siêu Vi B (HBV)',
        slug: 'dth-vgsv-b',
        hasFullArticle: true,
        keyMetric: 'Lưu hành VN: ≥ 9.4% (QĐ 1740/BYT) • Gánh nặng: 254M ca',
        vectorOrCause: 'Lây truyền mẹ-con chu sinh (90% mạn tính), Đường máu & Tình dục',
        icon: 'fa-virus',
        color: '#d97706',
        bgColor: 'rgba(217, 119, 6, 0.12)',
        overview: 'Gánh nặng 254 triệu ca toàn cầu, Việt Nam vùng dịch tễ cao ≥9.4% (QĐ 1740/QĐ-BYT 2026), Cascade of Care Lancet, đồng nhiễm HDV, lây chu sinh và phác đồ điều trị kháng virus TDF/TAF/ETV theo chuẩn EASL & AASLD.',
        pearlPreview: 'Lây truyền chu sinh từ mẹ sang con có tới 90% nguy cơ trở thành viêm gan mạn tính; tiêm vắc-xin sơ sinh trong 24 giờ đầu là can thiệp cốt lõi.',
        highYieldStats: ['Lưu hành VN ≥9.4%', 'Cascade of Care Lancet', 'Kháng thuốc gen rtM204V'],
        tags: ['Viêm gan B', 'HBV', 'HBsAg', 'EASL 2026', 'TDF/TAF', 'Cascade of Care']
      },
      {
        id: 'dth-vgsv-c',
        code: 'DTH-HCV',
        icd: 'ICD-10: B18.2, B17.1',
        specialtyId: 'epi-tieu-hoa',
        title: 'Dịch Tễ Học Viêm Gan Siêu Vi C (HCV)',
        slug: 'dth-vgsv-c',
        hasFullArticle: true,
        keyMetric: '50M ca mạn • VN > 900.000 ca (QĐ 2855/BYT) • DAA SVR12 > 95%',
        vectorOrCause: 'Đường máu, Tiêm chích ma túy, Can thiệp y tế không an toàn & Tái nhiễm MSM',
        icon: 'fa-shield-virus',
        color: '#b45309',
        bgColor: 'rgba(180, 83, 9, 0.12)',
        overview: 'Gánh nặng 50 triệu ca mạn tính toàn cầu, Việt Nam >900.000 ca (QĐ 2855/QĐ-BYT 2024), Care Cascade Lancet 2026, phân bố 6 genotypes (Genotype 1 & 6 chiếm ưu thế tại VN), động học tái nhiễm MSM/HIV và kỷ nguyên DAA pangenotypic chữa khỏi >95%.',
        pearlPreview: 'Viêm gan C hoàn toàn có thể chữa khỏi dứt điểm trong 12 tuần với phác đồ DAA pangenotypic (Sofosbuvir/Velpatasvir) mà không cần interferon.',
        highYieldStats: ['DAA SVR12 > 95%', 'Genotype 1 & 6 tại VN', 'Care Cascade Lancet 2026'],
        tags: ['Viêm gan C', 'HCV', 'DAA', 'Sofosbuvir', 'Velpatasvir', 'SVR12']
      },
      {
        id: 'dth-xo-gan',
        code: 'DTH-CIR',
        icd: 'ICD-10: K70, K70.3, K74',
        specialtyId: 'epi-tieu-hoa',
        title: 'Dịch Tễ Học Xơ Gan & Bệnh Gan Mạn Tính (CLDs)',
        slug: 'dth-xo-gan',
        hasFullArticle: true,
        keyMetric: 'GBD: 1.48M tử vong • CFR đợt ACLF 28 ngày: 30-50%',
        vectorOrCause: 'HBV/HCV, Nghiện rượu (Alcohol-associated), Nhiễm mỡ MASLD/MASH',
        icon: 'fa-disease',
        color: '#ea580c',
        bgColor: 'rgba(234, 88, 12, 0.12)',
        overview: 'Gánh nặng GBD 2019, chuyển dịch dịch tễ từ viêm gan siêu vi sang MASLD/Rượu, động học tiến triển Còn bù ➔ Mất bù ➔ Suy gan cấp trên nền mạn (ACLF), tăng áp cửa không xơ gan (NCPH) và tầm soát ung thư biểu mô tế bào gan định kỳ.',
        pearlPreview: 'Xuất huyết tiêu hóa do giãn vỡ tĩnh mạch thực quản hoặc nhiễm trùng SBP đẩy người bệnh vào hội chứng ACLF với tỷ lệ tử vong 30-50% trong 28 ngày.',
        highYieldStats: ['Chuyển dịch sang MASLD', 'ACLF CFR 30-50%', 'Child-Pugh & MELD 3.0'],
        tags: ['Xơ gan', 'Cirrhosis', 'MASLD', 'ACLF', 'Tăng áp cửa', 'Child-Pugh']
      },
      {
        id: 'dth-hpylori',
        code: 'DTH-HP',
        icd: 'ICD-10: K25–K29',
        specialtyId: 'epi-tieu-hoa',
        title: 'Dịch Tễ Học Nhiễm Helicobacter Pylori & Bệnh Dạ Dày',
        hasFullArticle: false,
        keyMetric: 'Tỷ lệ nhiễm cộng đồng VN: ~70% • Tác nhân sinh ung nhóm 1',
        vectorOrCause: 'Đường phân - miệng & miệng - miệng trong gia đình',
        icon: 'fa-bacterium',
        color: '#b45309',
        bgColor: 'rgba(180, 83, 9, 0.12)',
        overview: 'IARC xếp H. pylori vào nhóm tác nhân sinh ung thư loại 1 đối với ung thư biểu mô tuyến dạ dày và u lympho MALT. Dịch tễ học phản ánh điều kiện vệ sinh, thói quen ăn uống chung bát đũa và gia đình đông người.',
        pearlPreview: 'Tiệt trừ H. pylori thành công trước khi xuất hiện dị sản ruột/teo niêm mạc làm giảm đáng kể nguy cơ ung thư dạ dày.',
        highYieldStats: ['Sinh ung thư IARC Nhóm 1', 'MALT Lymphoma', 'Tỷ lệ kháng Clarithromycin cao'],
        tags: ['H. pylori', 'Dạ dày', 'Ung thư dạ dày', 'MALT', 'Viêm loét']
      },
      {
        id: 'dth-colorectal-cancer',
        code: 'DTH-CRC',
        icd: 'ICD-10: C18–C20',
        specialtyId: 'epi-tieu-hoa',
        title: 'Dịch Tễ Học Ung Thư Đại Trực Tràng (Colorectal Cancer - CRC)',
        hasFullArticle: false,
        keyMetric: 'Ung thư phổ biến #3 toàn cầu • Đang trẻ hóa dưới 50 tuổi',
        vectorOrCause: 'Chế độ ăn nhiều thịt đỏ/thịt chế biến, Ít chất xơ, Béo phì, Gen FAP/Lynch',
        icon: 'fa-disease',
        color: '#92400e',
        bgColor: 'rgba(146, 64, 14, 0.12)',
        overview: 'Chuyển đổi dịch tễ học dinh dưỡng: Các quốc gia đang phát triển ghi nhận tỷ lệ mắc CRC tăng nhanh do Tây hóa chế độ ăn. Sàng lọc sớm bằng xét nghiệm máu ẩn trong phân (FIT/FOBT) và nội soi đại tràng giúp giảm tử vong tới 50%.',
        pearlPreview: 'Hầu hết ung thư đại trực tràng bắt nguồn từ polyp tuyến (Adenoma) qua chuỗi 10-15 năm, là cơ hội vàng để sàng lọc cắt bỏ.',
        highYieldStats: ['Sàng lọc từ 45 tuổi', 'Nội soi định kỳ 10 năm', 'Hội chứng Lynch'],
        tags: ['Ung thư đại tràng', 'CRC', 'FIT/FOBT', 'Polyp tuyến', 'Lynch']
      },
      {
        id: 'dth-xhth-tren',
        code: 'DTH-UGIB',
        icd: 'ICD-10: K92.0, K92.1, K92.2',
        specialtyId: 'epi-tieu-hoa',
        title: 'Dịch Tễ Học Xuất Huyết Tiêu Hóa Trên (UGIB)',
        slug: 'dth-xhth-tren',
        hasFullArticle: true,
        keyMetric: 'Mắc: 48–160/100k dân/năm • Tử vong hiện nay: ~2% (từ 10–14%)',
        vectorOrCause: 'Loét dạ dày tá tràng, Viêm trợt, NSAIDs/Aspirin, Vỡ giãn TMTQ xơ gan',
        icon: 'fa-droplet',
        color: '#dc2626',
        bgColor: 'rgba(220, 38, 38, 0.12)',
        overview: 'Cấp cứu tiêu hóa hàng đầu với >500.000 ca nhập viện tại Mỹ, phân loại không do vỡ giãn (NVUGIB) vs do vỡ giãn tĩnh mạch xơ gan (Variceal, tử vong 15-20%), ưu thế nam giới 3:1 và mô hình phân tầng nguy cơ Glasgow-Blatchford Score (GBS).',
        pearlPreview: 'Thang điểm Glasgow-Blatchford GBS ≤ 1 dự đoán chính xác 99% khả năng xuất viện an toàn không cần can thiệp cấp cứu.',
        highYieldStats: ['GBS ≤ 1 an toàn 99%', 'Tử vong giảm còn ~2%', 'Vỡ giãn TMTQ tử vong 15–20%', 'Nam chiếm 75,9%'],
        tags: ['XHTH trên', 'UGIB', 'Loét dạ dày', 'Vỡ giãn TMTQ', 'GBS', 'ACG 2021']
      },
      {
        id: 'dth-xhth-duoi',
        code: 'DTH-LGIB',
        icd: 'ICD-10: K92.0, K92.1, K92.2',
        specialtyId: 'epi-tieu-hoa',
        title: 'Dịch Tễ Học Xuất Huyết Tiêu Hóa Dưới (LGIB)',
        slug: 'dth-xhth-duoi',
        hasFullArticle: true,
        keyMetric: 'Mắc: 33–87/100k dân/năm (1,26/1.000 người-năm) • Tuổi TB: 74 tuổi',
        vectorOrCause: 'Bệnh túi thừa (26–64%), Trĩ/hậu môn, Viêm đại tràng, Thuốc chống huyết khối',
        icon: 'fa-layer-group',
        color: '#d97706',
        bgColor: 'rgba(217, 119, 6, 0.12)',
        overview: 'Tỷ lệ mắc gia tăng và vượt qua XHTHT do già hóa dân số và sử dụng thuốc kháng huyết khối/Aspirin, tuổi trung vị 74 tuổi, thang điểm Oakland (ESGE/ACG) xuất viện an toàn và thang điểm SALGIB trên đoàn hệ bệnh nhân Việt Nam.',
        pearlPreview: 'Thang điểm SALGIB (Quách Trọng Đức et al. 2021) dựa trên 4 biến số tại giường giúp xác định chính xác bệnh nhân XHTHD nguy cơ thấp tại Việt Nam.',
        highYieldStats: ['Oakland ≤ 8 an toàn 95–98%', 'Thang điểm SALGIB VN', 'Túi thừa đại tràng 26–64%', 'Aspirin tăng nguy cơ gấp 3'],
        tags: ['XHTH dưới', 'LGIB', 'Bệnh túi thừa', 'Oakland Score', 'SALGIB', 'ESGE 2021']
      }
    ]
  },
  {
    id: 'epi-than-tiet-nieu',
    name: '5. Thận - Tiết Niệu',
    shortName: 'Thận - Tiết niệu',
    icon: 'fa-filter',
    color: '#2563eb',
    bgColor: 'rgba(37, 99, 235, 0.12)',
    description: 'Dịch tễ học bệnh thận mạn, gánh nặng lọc máu chu kỳ, tổn thương thận cấp ICU và dịch tễ sỏi niệu vùng Đông Nam Á.',
    items: [
      {
        id: 'dth-ckd',
        code: 'DTH-CKD',
        icd: 'ICD-10: N18',
        specialtyId: 'epi-than-tiet-nieu',
        title: 'Dịch Tễ Học Bệnh Thận Mạn (Chronic Kidney Disease - CKD)',
        slug: 'dth-ckd',
        hasFullArticle: true,
        keyMetric: 'Prevalence: ~10% (>850M ca) • ĐTĐ T2 VN: 23.8%–41.7%',
        vectorOrCause: 'Đái tháo đường (~40%), Tăng huyết áp (~30%) & Viêm cầu thận mạn',
        icon: 'fa-filter',
        color: '#2563eb',
        bgColor: 'rgba(37, 99, 235, 0.12)',
        overview: 'Gánh nặng 850 triệu ca toàn cầu, Ma trận phân tầng nguy cơ KDIGO 2D CGA (G1-G5 & A1-A3), Progression Cascade, Hội chứng Tim - Thận - Chuyển hóa CKM (AHA 2023), tỷ lệ CKD trên ĐTĐ Type 2 tại Việt Nam (23.8%–41.7%) và 4 trụ cột GDMT làm chậm suy thận.',
        pearlPreview: 'Bệnh nhân CKD giai đoạn sớm phần lớn tử vong vì biến cố tim mạch (Hội chứng CKM) trước khi kịp tiến triển sang suy thận giai đoạn cuối lọc máu.',
        highYieldStats: ['Ma trận KDIGO CGA', 'Hội chứng CKM (AHA 2023)', '4 Trụ cột Tim-Thận'],
        tags: ['Bệnh thận mạn', 'CKD', 'KDIGO', 'CKM', 'SGLT2i', 'Albumin niệu']
      },
      {
        id: 'dth-aki',
        code: 'DTH-AKI',
        icd: 'ICD-10: N17',
        specialtyId: 'epi-than-tiet-nieu',
        title: 'Dịch Tễ Học Tổn Thương Thận Cấp (Acute Kidney Injury - AKI)',
        hasFullArticle: false,
        keyMetric: 'Tần suất tại ICU: 30–50% • Tăng tỷ lệ tử vong nội viện gấp 3-5 lần',
        vectorOrCause: 'Nhiễm trùng huyết (Sepsis), Thuốc độc thận & Giảm tưới máu',
        icon: 'fa-triangle-exclamation',
        color: '#1d4ed8',
        bgColor: 'rgba(29, 78, 216, 0.12)',
        overview: 'Một biến chứng lâm sàng thường gặp ở bệnh nhân nặng nằm viện. Nghiên cứu dịch tễ KDIGO chứng minh dù chức năng thận hồi phục sau AKI, bệnh nhân vẫn có nguy cơ cao tiến triển thành CKD và suy thận mạn tính trong tương lai.',
        pearlPreview: 'AKI không phải là biến cố thoáng qua: 1 đợt AKI làm tăng gấp 3 lần nguy cơ phát triển CKD mới trong 5 năm sau đó.',
        highYieldStats: ['Tiêu chuẩn KDIGO', 'Sepsis chiếm 50% nguyên nhân ICU', 'Nguy cơ chuyển dạng sang CKD'],
        tags: ['AKI', 'Tổn thương thận cấp', 'KDIGO', 'Sepsis', 'ICU']
      },
      {
        id: 'dth-urolithiasis',
        code: 'DTH-URO',
        icd: 'ICD-10: N20',
        specialtyId: 'epi-than-tiet-nieu',
        title: 'Dịch Tễ Học Sỏi Tiết Niệu (Urolithiasis / Stone Belt)',
        hasFullArticle: false,
        keyMetric: 'Prevalence tại VN: 10–12% • Tỷ lệ tái phát 5 năm: ~50%',
        vectorOrCause: 'Khí hậu nóng ẩm, Mất nước mồ hôi, Chế độ ăn nhiều đạm/muối',
        icon: 'fa-gem',
        color: '#1e40af',
        bgColor: 'rgba(30, 64, 175, 0.12)',
        overview: 'Việt Nam nằm trọn trong "Vành đai sỏi" (Stone Belt) thế giới do khí hậu nhiệt đới gió mùa gây mất nước qua mồ hôi, dẫn đến cô đặc nước tiểu và tăng bão hòa tinh thể Canxi Oxalat.',
        pearlPreview: 'Uống đủ nước để duy trì lượng nước tiểu ≥ 2.5 lít/ngày là can thiệp dịch tễ hiệu quả nhất để giảm 50% nguy cơ tái phát sỏi.',
        highYieldStats: ['Stone Belt Đông Nam Á', 'Sỏi Canxi Oxalat chiếm 80%', 'Tái phát 50% sau 5 năm'],
        tags: ['Sỏi thận', 'Sỏi tiết niệu', 'Stone Belt', 'Canxi Oxalat', 'Tái phát']
      }
    ]
  },
  {
    id: 'epi-noi-tiet',
    name: '6. Nội Tiết & Chuyển Hóa',
    shortName: 'Nội tiết & Chuyển hóa',
    icon: 'fa-dna',
    color: '#7c3aed',
    bgColor: 'rgba(124, 58, 237, 0.12)',
    description: 'Đại dịch đái tháo đường Type 2, béo phì, hội chứng chuyển hóa và các ngưỡng chuẩn BMI dành riêng cho người châu Á.',
    items: [
      {
        id: 'dth-diabetes',
        code: 'DTH-T2D',
        icd: 'ICD-10: E11, E10, E14',
        specialtyId: 'epi-noi-tiet',
        title: 'Dịch Tễ Học Đái Tháo Đường Típ 2 (T2DM)',
        slug: 'dth-diabetes',
        hasFullArticle: true,
        keyMetric: 'Gánh nặng: 589M người lớn (11,1%) • Chưa chẩn đoán: 42,8% • VN: 7,3%',
        vectorOrCause: 'Kháng insulin, Giảm tiết insulin, Kiểu hình MONW Châu Á, Béo phì & Đô thị hóa',
        icon: 'fa-cubes-stacked',
        color: '#7c3aed',
        bgColor: 'rgba(124, 58, 237, 0.12)',
        overview: 'Gánh nặng toàn cầu 589 triệu ca năm 2024, khối băng chìm chưa chẩn đoán 42,8% (251,7M), đặc thù kiểu hình Châu Á (63% BN Ấn Độ cân nặng chuẩn), số liệu dịch tễ Việt Nam (7,3%–8,3%), biến chứng thần kinh 38%, võng mạc 20-35% và sơ đồ sàng lọc dự phòng IDF 2025.',
        pearlPreview: 'Người Châu Á mắc ĐTĐ ở mức BMI thấp hơn người da trắng (kiểu hình Thin-Fat MONW) và có tỷ lệ biến chứng thần kinh ngoại biên tại Việt Nam lên tới 38%.',
        highYieldStats: ['IDF Atlas 2024 (589M)', 'Chưa chẩn đoán 42,8%', 'Việt Nam 7,3%–8,3%', 'Kiểu hình MONW', 'Sơ đồ IDF 2025'],
        tags: ['Đái tháo đường', 'T2DM', 'IDF 2025', 'ADA 2026', 'MONW', 'Biến chứng']
      },
      {
        id: 'dth-obesity-metabolic',
        code: 'DTH-OBE',
        icd: 'ICD-10: E66',
        specialtyId: 'epi-noi-tiet',
        title: 'Dịch Tễ Học Béo Phì & Hội Chứng Chuyển Hóa',
        hasFullArticle: false,
        keyMetric: 'Ngưỡng BMI châu Á (WHO WPRO): Thừa cân ≥ 23, Béo phì ≥ 25 kg/m²',
        vectorOrCause: 'Mất cân bằng năng lượng nạp/tiêu, Thực phẩm siêu chế biến, Môi trường tạo béo (Obesogenic)',
        icon: 'fa-weight-scale',
        color: '#6d28d9',
        bgColor: 'rgba(109, 40, 217, 0.12)',
        overview: 'Béo phì được WHO công nhận là bệnh lý mạn tính phức tạp, không đơn thuần là vấn đề thẩm mỹ. Tiêu chuẩn chẩn đoán béo phì cho người châu Á hạ thấp hơn phương Tây (BMI ≥ 25 kg/m²) do nguy cơ tim mạch và ĐTĐ xuất hiện ở ngưỡng BMI thấp hơn.',
        pearlPreview: 'Vòng eo là chỉ số phản ánh mỡ nội tạng chính xác hơn BMI (Ngưỡng nguy cơ châu Á: Nam ≥ 90 cm, Nữ ≥ 80 cm).',
        highYieldStats: ['Ngưỡng BMI WPRO ≥ 23 & 25', 'Vòng eo cảnh báo', 'Thực phẩm siêu chế biến'],
        tags: ['Béo phì', 'Hội chứng chuyển hóa', 'BMI châu Á', 'Vòng eo', 'Mỡ nội tạng']
      }
    ]
  },
  {
    id: 'epi-ung-buou',
    name: '7. Ung Bướu & Dịch Tễ Môi Trường',
    shortName: 'Ung bướu & Môi trường',
    icon: 'fa-ribbon',
    color: '#db2777',
    bgColor: 'rgba(219, 39, 119, 0.12)',
    description: 'Số liệu GLOBOCAN, dịch tễ học ung thư phổ biến, phơi nhiễm hóa chất nghề nghiệp, amiăng và phòng ngừa bằng vắc-xin.',
    items: [
      {
        id: 'dth-cervical-cancer',
        code: 'DTH-CXCA',
        icd: 'ICD-10: C53',
        specialtyId: 'epi-ung-buou',
        title: 'Dịch Tễ Học Ung Thư Cổ Tử Cung (Cervical Cancer)',
        hasFullArticle: false,
        keyMetric: 'Chiến lược WHO 90-70-90 • PAF do virus HPV: > 99%',
        vectorOrCause: 'Nhiễm dai dẳng các type HPV nguy cơ cao (Type 16, 18)',
        icon: 'fa-venus',
        color: '#db2777',
        bgColor: 'rgba(219, 39, 119, 0.12)',
        overview: 'Một trong những loại ung thư hiếm hoi có thể loại trừ hoàn toàn nhờ vắc-xin HPV và sàng lọc định kỳ. Hai type HPV 16 và 18 chịu trách nhiệm cho hơn 70% các ca ung thư cổ tử cung toàn cầu.',
        pearlPreview: 'Ung thư cổ tử cung hoàn toàn có thể ngăn ngừa được nhờ kết hợp tiêm vắc-xin HPV cho trẻ vị thành niên và sàng lọc HPV DNA định kỳ.',
        highYieldStats: ['HPV 16 & 18 chiếm >70%', 'Mục tiêu loại trừ WHO 2030', 'Vắc-xin 9 giá HPV'],
        tags: ['Ung thư cổ tử cung', 'HPV', 'Vaccine HPV', 'Pap smear', 'WHO 90-70-90']
      },
      {
        id: 'dth-breast-cancer',
        code: 'DTH-BRCA',
        icd: 'ICD-10: C50',
        specialtyId: 'epi-ung-buou',
        title: 'Dịch Tễ Học Ung Thư Vú (Breast Cancer)',
        hasFullArticle: false,
        keyMetric: 'Ung thư phổ biến #1 ở nữ giới • GLOBOCAN: 2.3M ca mới/năm',
        vectorOrCause: 'Đột biến BRCA1/2, Phơi nhiễm Estrogen kéo dài (Kinh sớm, Mãn muộn, Không sinh con)',
        icon: 'fa-ribbon',
        color: '#ec4899',
        bgColor: 'rgba(236, 72, 153, 0.12)',
        overview: 'Ung thư có số ca mắc mới hàng đầu ở nữ giới. Dịch tễ học phân biệt rõ nhóm nguy cơ di truyền gia đình (BRCA1/BRCA2) và nhóm nguy cơ liên quan đến thời gian tiếp xúc nội tiết tố nữ estrogen.',
        pearlPreview: 'Sàng lọc bằng chụp X-quang tuyến vú (Mammography) định kỳ từ 40-50 tuổi giúp phát hiện giai đoạn sớm và giảm 20-30% tỷ lệ tử vong.',
        highYieldStats: ['Mammography sàng lọc', 'Gen BRCA1 & BRCA2', 'GLOBOCAN #1 nữ'],
        tags: ['Ung thư vú', 'BRCA1', 'Mammography', 'GLOBOCAN', 'Estrogen']
      },
      {
        id: 'dth-lung-cancer',
        code: 'DTH-LUNG',
        icd: 'ICD-10: C34',
        specialtyId: 'epi-ung-buou',
        title: 'Dịch Tễ Học Ung Thư Phổi (Lung Cancer)',
        hasFullArticle: false,
        keyMetric: 'Nguyên nhân tử vong do ung thư #1 • PAF do Thuốc lá: 85%',
        vectorOrCause: 'Hút thuốc lá chủ động/thụ động, Khí Radon, Phơi nhiễm Amiăng (Asbestos)',
        icon: 'fa-lungs-virus',
        color: '#be185d',
        bgColor: 'rgba(190, 24, 93, 0.12)',
        overview: 'Mối liên hệ kinh điển giữa thuốc lá và ung thư phổi trong nghiên cứu bác sĩ Anh quốc của Doll & Hill. Phân loại dịch tễ Ung thư phổi không tế bào nhỏ (NSCLC ~85%) vs Ung thư phổi tế bào nhỏ (SCLC ~15% - liên quan chặt chẽ với thuốc lá).',
        pearlPreview: 'Sàng lọc bằng CT liều thấp (LDCT) hàng năm ở người hút thuốc lá nặng (≥20 bao-năm, 50-80 tuổi) giúp giảm 20% tử vong (NLST Trial).',
        highYieldStats: ['Doll & Hill Study', 'CT liều thấp LDCT', 'Amiăng & Mesothelioma'],
        tags: ['Ung thư phổi', 'Thuốc lá', 'LDCT', 'Doll & Hill', 'Amiăng']
      }
    ]
  },
  {
    id: 'epi-than-kinh',
    name: '8. Thần Kinh & Sức Khỏe Tâm Thần',
    shortName: 'Thần kinh & Tâm thần',
    icon: 'fa-brain',
    color: '#059669',
    bgColor: 'rgba(5, 150, 105, 0.12)',
    description: 'Dịch tễ học bệnh Alzheimer, sa sút trí tuệ trong già hóa dân số, trầm cảm, lo âu và khoảng trống điều trị sức khỏe tâm thần.',
    items: [
      {
        id: 'dth-dementia',
        code: 'DTH-DEM',
        icd: 'ICD-10: G30, F00–F03',
        specialtyId: 'epi-than-kinh',
        title: 'Dịch Tễ Học Sa Sút Trí Tuệ & Bệnh Alzheimer (Dementia)',
        hasFullArticle: false,
        keyMetric: '> 55 triệu người mắc • Cứ 3 giây có thêm 1 ca mắc mới toàn cầu',
        vectorOrCause: 'Tuổi cao, Gen ApoE-ε4, Tăng HA, ĐTĐ, Mất thính lực chưa can thiệp & Lối sống',
        icon: 'fa-brain',
        color: '#059669',
        bgColor: 'rgba(5, 150, 105, 0.12)',
        overview: 'Ủy ban Lancet Commission xác định 12 yếu tố nguy cơ có thể thay đổi (Modifiable Risk Factors) chiếm tới 40% các trường hợp sa sút trí tuệ toàn cầu (Mất thính lực, Ít học vấn, Hút thuốc, Trầm cảm, Ít vận động, ĐTĐ, Cô lập xã hội...).',
        pearlPreview: 'Can thiệp sớm điều chỉnh 12 yếu tố nguy cơ tim mạch và lối sống có thể ngăn ngừa hoặc trì hoãn tới 40% các ca sa sút trí tuệ.',
        highYieldStats: ['Lancet Commission 12 Yếu tố', 'ApoE-ε4 Gene', 'Già hóa dân số'],
        tags: ['Sa sút trí tuệ', 'Alzheimer', 'Lancet Commission', 'ApoE', 'Tuổi già']
      },
      {
        id: 'dth-depression',
        code: 'DTH-DEP',
        icd: 'ICD-10: F32–F33',
        specialtyId: 'epi-than-kinh',
        title: 'Dịch Tễ Học Rối Loạn Trầm Cảm Chủ Yếu (Major Depressive Disorder - MDD)',
        hasFullArticle: false,
        keyMetric: 'Gánh nặng tàn phế YLD #1 • Khoảng trống điều trị > 75% ở nước nghèo',
        vectorOrCause: 'Stress mạn tính, Chấn thương tâm lý thời thơ ấu, Yếu tố di truyền & Bệnh mạn tính',
        icon: 'fa-head-side-virus',
        color: '#047857',
        bgColor: 'rgba(4, 120, 87, 0.12)',
        overview: 'Trầm cảm là nguyên nhân hàng đầu gây mất số năm sống với bệnh tật (YLD) trên toàn thế giới. Tỷ lệ mắc ở phụ nữ cao gấp đôi nam giới. Sự kỳ thị (Stigma) và thiếu nhân lực tâm thần tạo nên khoảng trống điều trị khổng lồ.',
        pearlPreview: 'Trầm cảm làm tăng gấp 2 lần nguy cơ mắc bệnh mạch vành và làm tăng tỷ lệ tử vong sau nhồi máu cơ tim.',
        highYieldStats: ['YLDs hàng đầu toàn cầu', 'Nữ mắc gấp 2 lần nam', 'Khoảng trống điều trị >75%'],
        tags: ['Trầm cảm', 'MDD', 'YLDs', 'Sức khỏe tâm thần', 'Stigma']
      }
    ]
  },
  {
    id: 'epi-nhi-san',
    name: '9. Sức Khỏe Mẹ & Bé / Nhi Khoa',
    shortName: 'Mẹ & Bé / Nhi khoa',
    icon: 'fa-baby',
    color: '#0891b2',
    bgColor: 'rgba(8, 145, 178, 0.12)',
    description: 'Chỉ số tử vong sơ sinh/chu sinh theo chuẩn SDG 3.2, dự phòng dị tật ống thần kinh bằng Acid Folic và dịch tễ học dinh dưỡng 1000 ngày đầu đời.',
    items: [
      {
        id: 'dth-neonatal-mortality',
        code: 'DTH-NEO',
        icd: 'ICD-10: P00–P96',
        specialtyId: 'epi-nhi-san',
        title: 'Dịch Tễ Học Tử Vong Sơ Sinh & Chu Sinh (Neonatal Mortality)',
        hasFullArticle: false,
        keyMetric: 'Tử vong sơ sinh chiếm ~47% tổng tử vong trẻ dưới 5 tuổi (SDG 3.2)',
        vectorOrCause: 'Đẻ non (Preterm), Ngạt chu sinh & Nhiễm khuẩn sơ sinh',
        icon: 'fa-baby',
        color: '#0891b2',
        bgColor: 'rgba(8, 145, 178, 0.12)',
        overview: 'Thước đo nhạy cảm nhất phản ánh chất lượng hệ thống chăm sóc y tế một quốc gia. 3 nhóm nguyên nhân chính (Sinh non/Nhẹ cân, Ngạt/Chấn thương sản khoa, và Nhiễm khuẩn sơ sinh) chiếm hơn 80% các ca tử vong trong 28 ngày đầu đời.',
        pearlPreview: 'Chăm sóc Kangaroo (KMC) và bú sữa mẹ hoàn toàn sớm giúp giảm tới 40% tỷ lệ tử vong ở trẻ sơ sinh đẻ non và nhẹ cân.',
        highYieldStats: ['SDG 3.2 < 12/1000', '28 ngày đầu đời quan trọng nhất', 'Chăm sóc Kangaroo KMC'],
        tags: ['Tử vong sơ sinh', 'Sinh non', 'SDG 3.2', 'KMC', 'Chu sinh']
      },
      {
        id: 'dth-neural-tube-defects',
        code: 'DTH-NTD',
        icd: 'ICD-10: Q00–Q07',
        specialtyId: 'epi-nhi-san',
        title: 'Dịch Tễ Học Dị Tật Ống Thần Kinh & Dự Phòng Acid Folic (NTDs)',
        hasFullArticle: false,
        keyMetric: 'Bổ sung Acid Folic quanh thụ thai giảm > 70% nguy cơ NTD',
        vectorOrCause: 'Thiếu hụt Folate thời kỳ phôi thai (Đóng ống thần kinh ngày thứ 28)',
        icon: 'fa-shield-halved',
        color: '#0e7490',
        bgColor: 'rgba(14, 116, 144, 0.12)',
        overview: 'Một trong những thành tựu can thiệp dịch tễ học dinh dưỡng vĩ đại nhất lịch sử y tế công cộng. Chiến lược bổ sung Acid Folic 400 mcg/ngày trước khi thụ thai ít nhất 1 tháng và vi chất hóa thực phẩm đã giảm mạnh tỷ lệ vô sọ và tật nứt đốt sống.',
        pearlPreview: 'Ống thần kinh đóng hoàn toàn vào ngày thứ 28 sau thụ thai, khi người phụ nữ thường chưa biết mình mang thai, vì vậy bổ sung Folate phải tiến hành TRƯỚC KHI mang thai.',
        highYieldStats: ['Folate 400 mcg/ngày', 'Đóng ống thần kinh ngày 28', 'Giảm > 70% nguy cơ'],
        tags: ['Dị tật bẩm sinh', 'Ống thần kinh', 'Acid Folic', 'Nứt đốt sống', 'Dự phòng']
      },
      {
        id: 'dth-child-stunting',
        code: 'DTH-STU',
        icd: 'ICD-10: E40–E46',
        specialtyId: 'epi-nhi-san',
        title: 'Dịch Tễ Học Suy Dinh Dưỡng Thể Thấp Còi (Childhood Stunting)',
        hasFullArticle: false,
        keyMetric: 'Tỷ lệ thấp còi tại VN: ~18–19% • Cửa sổ vàng 1000 ngày đầu đời',
        vectorOrCause: 'Dinh dưỡng nghèo nàn trong thai kỳ, Bú mẹ không đúng cách, Nhiễm trùng tái diễn',
        icon: 'fa-ruler-vertical',
        color: '#155e75',
        bgColor: 'rgba(21, 94, 117, 0.12)',
        overview: 'Thấp còi phản ánh suy dinh dưỡng mạn tính tích lũy. Tổn thương thể chất và phát triển nhận thức não bộ trong "Cửa sổ 1000 ngày đầu đời" (từ khi thụ thai đến 2 tuổi) là không thể đảo ngược nếu không can thiệp kịp thời.',
        pearlPreview: 'Can thiệp dinh dưỡng sau 2 tuổi không thể phục hồi hoàn toàn chiều cao tiềm năng và sự phát triển trí não bị tổn thương do thấp còi.',
        highYieldStats: ['1000 ngày đầu đời', 'Không thể đảo ngược sau 2 tuổi', 'Thiếu vi chất Sắt/Kẽm'],
        tags: ['Thấp còi', 'Suy dinh dưỡng', '1000 ngày đầu đời', 'Stunting', 'Vi chất']
      }
    ]
  }
];

export function renderEpidemiologyView(): string {
  // Tính tổng số bài
  const totalItemsCount = EPIDEMIOLOGY_SPECIALTY_SECTIONS.reduce((acc, sec) => acc + sec.items.length, 0);

  return `
    <div class="promax-wrapper" id="mainContent">

      <!-- BREADCRUMB -->
      <div class="breadcrumb" style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); margin-bottom: 1.25rem;">
        <a href="#/" style="color: inherit; text-decoration: none;">🏠 Trang chủ</a> &nbsp;/&nbsp; 
        <a href="#/basic-medical" style="color: inherit; text-decoration: none;">Basic Medical Sciences</a> &nbsp;/&nbsp; 
        <span style="color: #0d9488; font-weight: 600;">Dịch Tễ Học Y Khoa Theo Chuyên Khoa (DTH - YTCC)</span>
      </div>

      <!-- PROMAX LUXURY HERO SECTION (SURVEILLANCE THEME) -->
      <section class="promax-hero hero-epi-theme" aria-labelledby="hero-title" style="margin-bottom: 1.25rem;">
        <div class="promax-hero-grid">
          <div>
            <div class="epi-badge-pulse">
              <span class="pulse-dot" style="background: #2dd4bf;"></span>
              <span>Epidemiological Surveillance & Clinical Specialty Matrix • CDC & WHO Standards</span>
            </div>
            <h1 id="hero-title" class="promax-hero-title">
              🦠 DỊCH TỄ HỌC LÂM SÀNG THEO CHUYÊN KHOA
            </h1>
            <p class="promax-hero-desc">
              Hệ thống hóa dịch tễ học bệnh tật theo 9 chuyên khoa lâm sàng: tỷ suất mới mắc (Incidence), hiện mắc (Prevalence), gánh nặng DALYs, động học lây truyền R0, tỷ phần quy thuộc (PAF) và chiến lược can thiệp y tế công cộng bằng chứng EBM.
            </p>

            <!-- KPI Metric Bar -->
            <div class="promax-kpi-bar">
              <div class="promax-kpi-pill">
                <i class="fa-solid fa-hospital" style="font-size: 1.1rem; color: #2dd4bf;"></i>
                <div>
                  <div class="promax-kpi-num">9</div>
                  <div class="promax-kpi-lbl">Chuyên Khoa</div>
                </div>
              </div>
              <div class="promax-kpi-pill">
                <i class="fa-solid fa-book-medical" style="font-size: 1.1rem; color: #38bdf8;"></i>
                <div>
                  <div class="promax-kpi-num">${totalItemsCount}+</div>
                  <div class="promax-kpi-lbl">Dịch Tễ Bệnh Học</div>
                </div>
              </div>
              <div class="promax-kpi-pill">
                <i class="fa-solid fa-lightbulb" style="font-size: 1.1rem; color: #fbbf24;"></i>
                <div>
                  <div class="promax-kpi-num">120+</div>
                  <div class="promax-kpi-lbl">Clinical Pearls</div>
                </div>
              </div>
              <div class="promax-kpi-pill">
                <i class="fa-solid fa-calculator" style="font-size: 1.1rem; color: #a78bfa;"></i>
                <div>
                  <div class="promax-kpi-num">4 Studio</div>
                  <div class="promax-kpi-lbl">Bộ Công Cụ Quyết Định</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Hero Vector Artwork (Radar & Outbreak Curve) -->
          <div class="tcm-hero-decor" style="display: flex; align-items: center; justify-content: center;">
            <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 140px; height: 140px; filter: drop-shadow(0 10px 20px rgba(0,0,0,0.3));">
              <circle cx="60" cy="60" r="50" stroke="rgba(45, 212, 191, 0.25)" stroke-width="2" stroke-dasharray="4 4"/>
              <circle cx="60" cy="60" r="32" stroke="rgba(45, 212, 191, 0.4)" stroke-width="2"/>
              <circle cx="60" cy="60" r="16" stroke="#2dd4bf" stroke-width="2"/>
              <line x1="60" y1="5" x2="60" y2="115" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>
              <line x1="5" y1="60" x2="115" y2="60" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>
              <path d="M15 95 Q 40 90, 50 40 T 75 75 T 105 95" stroke="#fbbf24" stroke-width="3.5" fill="none" stroke-linecap="round"/>
              <circle cx="50" cy="40" r="5.5" fill="#ef4444" stroke="#ffffff" stroke-width="2"/>
              <circle cx="75" cy="75" r="4.5" fill="#fbbf24" stroke="#ffffff" stroke-width="1.5"/>
              <circle cx="28" cy="92" r="3.5" fill="#2dd4bf"/>
              <circle cx="95" cy="90" r="3.5" fill="#2dd4bf"/>
            </svg>
          </div>
        </div>
      </section>

      <!-- ========================================================================= -->
      <!-- COMPACT ISOLATED TOOLKIT SUITE (GÓC CÔNG CỤ DỊCH TỄ TINH GỌN - KHÔNG CHEN VÀO CHUYÊN KHOA) -->
      <!-- ========================================================================= -->
      <div class="epi-compact-toolkit-bar" aria-label="Bộ công cụ dịch tễ học tương tác">
        <div class="epi-toolkit-badge">
          <i class="fa-solid fa-toolbox" style="color: #0d9488; font-size: 1rem;"></i>
          <span>Bộ Công Cụ Hỗ Trợ Dịch Tễ:</span>
        </div>
        <div class="epi-toolkit-pills">
          <a href="#/basic-medical/epidemiology/matrix-solver" class="epi-tool-pill-btn tool-matrix" title="Bộ giải ma trận 2x2 tính RR, OR, Se, Sp, LR">
            <i class="fa-solid fa-table-cells" style="color: #0d9488;"></i>
            <span>Bộ Giải Ma Trận 2×2</span>
          </a>
          <a href="#/basic-medical/epidemiology/epicurve" class="epi-tool-pill-btn tool-epicurve" title="Mô phỏng đường cong dịch tễ ổ dịch">
            <i class="fa-solid fa-chart-area" style="color: #f59e0b;"></i>
            <span>Đường Cong Dịch Tễ (Epicurve)</span>
          </a>
          <a href="#/basic-medical/epidemiology/study-designs" class="epi-tool-pill-btn tool-design" title="Ma trận so sánh thiết kế nghiên cứu RCT, Cohort, Case-Control">
            <i class="fa-solid fa-sitemap" style="color: #3b82f6;"></i>
            <span>Thiết Kế Nghiên Cứu</span>
          </a>
          <a href="#/basic-medical/epidemiology/bradford-hill" class="epi-tool-pill-btn tool-causality" title="9 Tiêu chuẩn Nhân - Quả Bradford Hill">
            <i class="fa-solid fa-scale-balanced" style="color: #8b5cf6;"></i>
            <span>9 Chuẩn Bradford Hill</span>
          </a>
          <button type="button" class="epi-tool-pill-btn tool-vault" onclick="window.EpiHub?.openMethodologyModal()" title="Mở kho lý thuyết 6 khối phương pháp luận & công thức">
            <i class="fa-solid fa-book-bookmark"></i>
            <span>6 Khối Lý Thuyết &amp; Công Thức</span>
          </button>
        </div>
      </div>

      <!-- PROMAX TOOLBAR & SEARCH -->
      <div class="promax-toolbar">
        <div class="promax-search-wrap">
          <i class="fa-solid fa-magnifying-glass promax-search-icon"></i>
          <input type="text" id="lesson-search" class="promax-search-input" placeholder="Tìm kiếm dịch tễ bệnh học (Sốt xuất huyết, Sốt rét, Thủy đậu, Tăng huyết áp, Đột quỵ, ĐTĐ, COPD, Lao, K Gan, K Cổ tử cung...)..." aria-label="Tìm kiếm dịch tễ chuyên khoa">
          <span class="promax-shortcut-pill">Ctrl + K</span>
          <button id="clear-search" class="clear-search-btn" aria-label="Xóa tìm kiếm" style="display: none; position: absolute; right: 4.5rem; top: 50%; transform: translateY(-50%); background: none; border: none; font-size: 1.2rem; cursor: pointer; color: var(--color-text-muted);">&times;</button>
        </div>

        <div class="view-toggle-container" style="display: flex; align-items: center; gap: 0.5rem;">
          <span class="toggle-label" style="font-size: 0.825rem; font-weight: 600; color: var(--color-text-muted);">Hiển thị:</span>
          <div class="toggle-buttons">
            <button id="view-grid-btn" class="toggle-btn active" title="Dạng lưới" aria-label="Xem dạng lưới">
              <i class="fa-solid fa-grip"></i>
            </button>
            <button id="view-list-btn" class="toggle-btn" title="Dạng danh sách" aria-label="Xem dạng danh sách">
              <i class="fa-solid fa-list-ul"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- DASHBOARD LAYOUT (ĐỒNG BỘ 100% VỚI SINH LÝ BỆNH & CƠ CHẾ BỆNH SINH) -->
      <div class="dashboard-layout">
        
        <!-- Navigation Sidebar (Sticky Danh Mục Chuyên Khoa) -->
        <aside class="layout-nav-sidebar" aria-label="Danh mục chuyên khoa dịch tễ">
          <div class="nav-sidebar-sticky" id="patho-nav">
            <h4 class="nav-sidebar-title">Chuyên Khoa Dịch Tễ</h4>
            <ul class="part-nav-list">
              ${EPIDEMIOLOGY_SPECIALTY_SECTIONS.map((sec, idx) => `
                <li>
                  <a href="#${sec.id}-section" class="part-nav-item p${(idx % 9) + 1} ${idx === 0 ? 'active' : ''}" data-target="${sec.id}-section">
                    <span class="part-icon"><i class="fa-solid ${sec.icon}"></i></span>
                    <span class="part-text">${sec.shortName}</span>
                    <span class="part-count-badge">${sec.items.length}</span>
                  </a>
                </li>
              `).join('')}
            </ul>
          </div>
        </aside>

        <!-- Main Content Area -->
        <main class="layout-content-area" id="lessons-container">
          
          <!-- Empty Search State -->
          <div id="empty-search-state" class="empty-search-state" style="display: none;">
            <div class="empty-search-icon">🔍</div>
            <h3>Không tìm thấy bệnh lý dịch tễ nào phù hợp</h3>
            <p>Vui lòng thử từ khóa khác (ví dụ: Sốt xuất huyết, Sốt rét, Thủy đậu, Tăng huyết áp, Đột quỵ, Đái tháo đường, COPD, Lao, Ung thư...).</p>
          </div>

          <!-- ========================================================================= -->
          <!-- CÁC CHUYÊN KHOA DỊCH TỄ HỌC LÂM SÀNG (TIM MẠCH, HÔ HẤP, TIÊU HÓA, THẬN...) -->
          <!-- ========================================================================= -->
          ${EPIDEMIOLOGY_SPECIALTY_SECTIONS.map(sec => `
            <section id="${sec.id}-section" aria-labelledby="${sec.id}-heading" style="margin-bottom: 2rem;">
              <div class="physio-group-container">
                <div class="physio-group-header">
                  <span class="physio-group-icon" style="color: ${sec.color}; background: ${sec.bgColor};">
                    <i class="fa-solid ${sec.icon}"></i>
                  </span>
                  <div>
                    <h3 id="${sec.id}-heading">${sec.name}</h3>
                    <p style="margin: 0.15rem 0 0 0; font-size: 0.85rem; color: var(--color-text-muted, #64748b); font-weight: normal;">
                      ${sec.description}
                    </p>
                  </div>
                </div>

                <div class="specialty-grid">
                  ${sec.items.map(item => {
                    const clickAction = item.hasFullArticle && item.slug
                      ? `href="#/basic-medical/epidemiology/article/${item.slug}"`
                      : `href="javascript:void(0)" onclick="window.EpiHub?.openDiseaseFactsheet('${item.id}')"`;

                    return `
                      <a ${clickAction} class="specialty-card" data-topic-id="${item.id}">
                        <div class="specialty-card-top">
                          <div class="specialty-icon" style="background: ${item.bgColor}; color: ${item.color};">
                            <i class="fa-solid ${item.icon}"></i>
                          </div>
                          <div class="specialty-info">
                            <h3>${item.title}</h3>
                            <p>${item.overview}</p>
                          </div>
                        </div>
                        <div class="specialty-card-action">
                          <span>
                            ${item.hasFullArticle 
                              ? '<i class="fa-solid fa-book-open" style="color: #0284c7;"></i> Đọc bài chuyên khảo' 
                              : '<i class="fa-solid fa-bolt" style="color: #0d9488;"></i> Xem tóm tắt dịch tễ'}
                          </span>
                          <i class="fa-solid fa-chevron-right"></i>
                        </div>
                      </a>
                    `;
                  }).join('')}
                </div>
              </div>
            </section>
          `).join('')}

        </main>
      </div>

    </div>

    <!-- QUICK PREVIEW MODAL / FACTSHEET DRAWER -->
    <div class="biochem-modal-backdrop" id="epiModalBackdrop">
      <div class="biochem-modal" id="epiModalContainer" role="dialog" aria-modal="true" style="max-width: 800px;"></div>
    </div>
  `;
}

/**
 * Initialize Event Listeners for Master Epidemiology Hub
 */
export function initEpidemiologyView(): void {
  const searchInput = document.getElementById('lesson-search') as HTMLInputElement | null;
  const clearBtn = document.getElementById('clear-search') as HTMLElement | null;
  const emptyState = document.getElementById('empty-search-state') as HTMLElement | null;
  const viewGridBtn = document.getElementById('view-grid-btn') as HTMLElement | null;
  const viewListBtn = document.getElementById('view-list-btn') as HTMLElement | null;
  const lessonsContainer = document.getElementById('lessons-container') as HTMLElement | null;
  const navItems = document.querySelectorAll<HTMLElement>('.part-nav-item');
  const sections = document.querySelectorAll<HTMLElement>('.layout-content-area > section');
  const modalBackdrop = document.getElementById('epiModalBackdrop');
  const modalContainer = document.getElementById('epiModalContainer');

  // 1. Live Multilingual Search across Specialties
  function performSearch(query: string): void {
    const q = query.toLowerCase().trim();
    if (clearBtn) clearBtn.style.display = q ? 'block' : 'none';

    let totalVisible = 0;

    sections.forEach(sec => {
      const sectionEl = sec;
      const cards = sectionEl.querySelectorAll<HTMLElement>('.specialty-card');
      let sectionVisibleCount = 0;

      cards.forEach(card => {
        const text = card.textContent?.toLowerCase() || '';
        if (!q || text.includes(q)) {
          card.style.display = '';
          sectionVisibleCount++;
          totalVisible++;
        } else {
          card.style.display = 'none';
        }
      });

      sectionEl.style.display = sectionVisibleCount > 0 ? '' : 'none';
    });

    if (emptyState) {
      emptyState.style.display = totalVisible === 0 ? 'block' : 'none';
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      performSearch((e.target as HTMLInputElement).value);
    });
  }

  if (clearBtn && searchInput) {
    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      performSearch('');
      searchInput.focus();
    });
  }

  // Keyboard shortcut Ctrl+K / Cmd+K
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      searchInput?.focus();
    }
  });

  // 2. View Toggle (Grid / List)
  if (viewGridBtn && viewListBtn && lessonsContainer) {
    viewGridBtn.addEventListener('click', () => {
      viewGridBtn.classList.add('active');
      viewListBtn.classList.remove('active');
      lessonsContainer.querySelectorAll('.specialty-grid').forEach(g => g.classList.remove('list-view'));
    });

    viewListBtn.addEventListener('click', () => {
      viewListBtn.classList.add('active');
      viewGridBtn.classList.remove('active');
      lessonsContainer.querySelectorAll('.specialty-grid').forEach(g => g.classList.add('list-view'));
    });
  }

  // 3. Scroll Spy for Sticky Left Navigation Sidebar
  function updateScrollSpy(): void {
    const scrollPos = window.scrollY + 160;

    sections.forEach(sec => {
      const sectionEl = sec;
      if (sectionEl.style.display === 'none') return;

      const top = sectionEl.offsetTop;
      const height = sectionEl.offsetHeight;
      const id = sectionEl.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navItems.forEach(item => {
          if (item.getAttribute('data-target') === id) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateScrollSpy, { passive: true });

  // 4. Smooth Scroll when clicking nav item
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = item.getAttribute('data-target');
      if (!targetId) return;

      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        const offset = 100;
        const targetPos = targetEl.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });

        navItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
      }
    });
  });

  // 5. Open Disease Factsheet Modal
  function openDiseaseFactsheet(itemId: string): void {
    if (!modalBackdrop || !modalContainer) return;

    let targetItem: SpecialtyEpidemiologyItem | undefined;
    let targetSection: ClinicalSpecialtySection | undefined;

    for (const sec of EPIDEMIOLOGY_SPECIALTY_SECTIONS) {
      const found = sec.items.find(i => i.id === itemId);
      if (found) {
        targetItem = found;
        targetSection = sec;
        break;
      }
    }

    if (!targetItem || !targetSection) return;

    modalContainer.innerHTML = `
      <div class="modal-header" style="padding: 1.25rem 1.5rem; border-bottom: 1px solid var(--color-border); display: flex; justify-content: space-between; align-items: center; background: var(--color-surface);">
        <div>
          <span style="font-size: 0.75rem; font-weight: 700; background: ${targetItem.bgColor}; color: ${targetItem.color}; padding: 0.2rem 0.5rem; border-radius: 4px;">
            ${targetItem.code} • ${targetItem.icd} • ${targetSection.shortName}
          </span>
          <h3 style="margin: 0.35rem 0 0 0; font-size: 1.25rem; font-weight: 700; color: var(--color-text);">${targetItem.title}</h3>
        </div>
        <button type="button" class="modal-close-btn" onclick="window.EpiHub?.closeModal()" aria-label="Đóng" style="background: transparent; border: none; font-size: 1.5rem; cursor: pointer; color: var(--color-text-muted); width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; border-radius: 8px;">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>

      <div class="modal-body" style="padding: 1.5rem; max-height: 75vh; overflow-y: auto;">
        <!-- Tổng quan dịch tễ -->
        <div style="margin-bottom: 1.25rem; background: var(--color-bg); padding: 1.25rem; border-radius: 10px; border: 1px solid var(--color-border);">
          <h4 style="margin: 0 0 0.5rem 0; font-size: 0.95rem; font-weight: 700; color: var(--color-primary); display: flex; align-items: center; gap: 0.5rem;">
            <i class="fa-solid fa-circle-info"></i> Bối Cảnh Dịch Tễ &amp; Động Học Bệnh Học
          </h4>
          <p style="margin: 0; font-size: 0.9rem; line-height: 1.65; color: var(--color-text);">${targetItem.overview}</p>
        </div>

        <!-- Chỉ số dịch tễ then chốt -->
        <div style="margin-bottom: 1.25rem; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.75rem;">
          <div style="background: rgba(13, 148, 136, 0.08); border: 1px solid rgba(13, 148, 136, 0.2); border-radius: 8px; padding: 0.85rem;">
            <div style="font-size: 0.72rem; font-weight: 700; color: #0d9488; text-transform: uppercase;">Chỉ Số Then Chốt</div>
            <div style="font-size: 0.95rem; font-weight: 800; color: #0f766e; margin-top: 0.25rem;">${targetItem.keyMetric}</div>
          </div>
          <div style="background: rgba(59, 130, 246, 0.08); border: 1px solid rgba(59, 130, 246, 0.2); border-radius: 8px; padding: 0.85rem;">
            <div style="font-size: 0.72rem; font-weight: 700; color: #2563eb; text-transform: uppercase;">Yếu Tố Căn Nguyên / Véc-tơ</div>
            <div style="font-size: 0.95rem; font-weight: 800; color: #1d4ed8; margin-top: 0.25rem;">${targetItem.vectorOrCause}</div>
          </div>
        </div>

        <!-- Clinical Pearl -->
        <div style="margin-bottom: 1.25rem; background: rgba(245,158,11,0.08); border-left: 4px solid #f59e0b; padding: 1.15rem; border-radius: 0 10px 10px 0;">
          <h4 style="margin: 0 0 0.45rem 0; font-size: 0.95rem; font-weight: 700; color: #b45309; display: flex; align-items: center; gap: 0.5rem;">
            <i class="fa-solid fa-lightbulb" style="color: #f59e0b;"></i> Điểm Ngọc Dịch Tễ Lâm Sàng (Clinical Pearl)
          </h4>
          <p style="margin: 0; font-size: 0.9rem; line-height: 1.6; color: var(--color-text);">${targetItem.pearlPreview}</p>
        </div>

        <!-- High-Yield Facts -->
        <div style="margin-bottom: 1.25rem;">
          <h4 style="margin: 0 0 0.5rem 0; font-size: 0.95rem; font-weight: 700; color: var(--color-text); display: flex; align-items: center; gap: 0.5rem;">
            <i class="fa-solid fa-tags" style="color: #3b82f6;"></i> Yếu Tố Dịch Tễ Trọng Yếu &amp; Tags
          </h4>
          <div style="display: flex; flex-wrap: wrap; gap: 0.45rem;">
            ${targetItem.highYieldStats.map(s => `<span style="font-size: 0.8rem; background: var(--color-bg); border: 1px solid var(--color-border); color: #2563eb; font-weight: 600; padding: 0.25rem 0.65rem; border-radius: 6px;">#${s}</span>`).join('')}
            ${targetItem.tags.map(t => `<span style="font-size: 0.8rem; background: var(--color-bg); border: 1px solid var(--color-border); color: var(--color-text-muted); padding: 0.25rem 0.65rem; border-radius: 6px;">${t}</span>`).join('')}
          </div>
        </div>

        ${targetItem.hasFullArticle && targetItem.slug ? `
          <div style="margin-top: 1.5rem; text-align: center;">
            <a href="#/basic-medical/epidemiology/article/${targetItem.slug}" class="promax-bento-card" style="display: inline-flex; align-items: center; gap: 0.6rem; padding: 0.75rem 1.5rem; background: #0d9488; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 700;">
              <i class="fa-solid fa-book-open"></i> Mở bài giảng chuyên khảo toàn diện
            </a>
          </div>
        ` : ''}
      </div>
    `;

    modalBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  // 6. Open Methodology Vault Modal (6 Khối Lý Thuyết & Công Thức)
  function openMethodologyModal(): void {
    if (!modalBackdrop || !modalContainer) return;

    modalContainer.innerHTML = `
      <div class="modal-header" style="padding: 1.25rem 1.5rem; border-bottom: 1px solid var(--color-border); display: flex; justify-content: space-between; align-items: center; background: var(--color-surface);">
        <div>
          <span style="font-size: 0.75rem; font-weight: 700; background: rgba(13, 148, 136, 0.15); color: #0d9488; padding: 0.2rem 0.5rem; border-radius: 4px;">
            Core Methodology Vault • 6 Khối Kiến Thức Cốt Lõi
          </span>
          <h3 style="margin: 0.35rem 0 0 0; font-size: 1.25rem; font-weight: 700; color: var(--color-text);">Phương Pháp Luận Dịch Tễ Học &amp; Thống Kê Y Học</h3>
        </div>
        <button type="button" class="modal-close-btn" onclick="window.EpiHub?.closeModal()" aria-label="Đóng" style="background: transparent; border: none; font-size: 1.5rem; cursor: pointer; color: var(--color-text-muted); width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; border-radius: 8px;">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>

      <div class="modal-body" style="padding: 1.5rem; max-height: 75vh; overflow-y: auto;">
        <p style="margin: 0 0 1.25rem 0; font-size: 0.875rem; color: var(--color-text-muted); line-height: 1.5;">
          Tra cứu nhanh 6 khối phương pháp luận nghiên cứu khoa học y học, công thức đo lường nguy cơ (RR, OR, AR), đánh giá test chẩn đoán (Se, Sp, PPV, NPV, LR), sai số (Bias, Confounding) và chuẩn nhân quả Bradford Hill.
        </p>

        <div style="display: flex; flex-direction: column; gap: 1.25rem;">
          ${EPIDEMIOLOGY_BLOCKS.map(block => {
            const blockTopics = EPIDEMIOLOGY_TOPICS.filter(t => t.blockId === block.id);
            return `
              <div style="background: var(--color-bg); border: 1px solid var(--color-border); border-radius: 10px; padding: 1.15rem;">
                <div style="display: flex; align-items: center; gap: 0.6rem; margin-bottom: 0.5rem;">
                  <span style="width: 28px; height: 28px; border-radius: 6px; background: ${block.bgColor}; color: ${block.color}; display: flex; align-items: center; justify-content: center; font-size: 0.85rem;">
                    <i class="fa-solid ${block.icon}"></i>
                  </span>
                  <h4 style="margin: 0; font-size: 0.95rem; font-weight: 700; color: var(--color-text);">${block.code}. ${block.name}</h4>
                </div>
                <p style="margin: 0 0 0.75rem 0; font-size: 0.825rem; color: var(--color-text-muted);">${block.description}</p>
                
                <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                  ${blockTopics.map(t => `
                    <div style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 6px; padding: 0.75rem;">
                      <div style="display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; margin-bottom: 0.35rem;">
                        <strong style="font-size: 0.85rem; color: var(--color-primary);">${t.code}: ${t.title}</strong>
                        <span style="font-size: 0.7rem; color: #f59e0b; font-weight: 600;"><i class="fa-solid fa-lightbulb"></i> ${t.clinicalPearls.length} Pearls</span>
                      </div>
                      <p style="margin: 0 0 0.4rem 0; font-size: 0.8rem; color: var(--color-text); line-height: 1.45;">${t.overview}</p>
                      <div style="background: var(--color-bg); padding: 0.4rem 0.6rem; border-radius: 4px; font-family: monospace; font-size: 0.75rem; color: #0f766e;">
                        ${t.keyFormulas[0] || ''}
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;

    modalBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(): void {
    if (modalBackdrop) {
      modalBackdrop.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  // Bind to window for HTML event handlers
  (window as any).EpiHub = {
    openDiseaseFactsheet,
    openMethodologyModal,
    closeModal
  };

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop?.classList.contains('open')) {
      closeModal();
    }
  });
}
