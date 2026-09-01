/**
 * CliniPortal 2.0 — CCBS (Cơ Chế Bệnh Sinh & Sinh Lý Bệnh) Data Store
 * Path: src/content/basic-medical/data/ccbs-data.ts
 */

import { CcbsDataStore } from '../types/ccbs.types';

export const CCBS_DATA: CcbsDataStore = {
  version: "2.0.0",
  totalCases: 62,
  topics: [
  {
    "id": "ccbs-1",
    "slug": "slb-ccbs-acs",
    "code": "CCBS-01",
    "title": "Hội chứng vành cấp (ACS)",
    "system": "cardiovascular",
    "systemName": "Tim Mạch & Tuần Hoàn",
    "order": 1,
    "overview": "Sinh lý bệnh và Cơ chế bệnh sinh Hội chứng vành cấp (Acute Coronary Syndrome Pathophysiology): Phân tích chi tiết 3 cơ chế tại chỗ (Nứt vỡ mảng xơ vữa vỏ mỏng TCFA, Xói mòn mảng xơ vữa qua thụ thể TLR2 và bẫy ngoại bào NETs, Nốt vôi hóa đâm xuyên), chuyển dịch mô hình 'Bệnh nhân dễ tổn thương', phân loại Nhồi máu cơ tim theo UDMI-V 2026 (Primary, Secondary, Procedure-related), các nguyên nhân không do xơ vữa (SCAD, co thắt, cầu cơ tim, Takotsubo), hội chứng làm việc MINOCA, rối loạn vi tuần hoàn, tổn thương tái tưới máu (No-reflow, 4 giai đoạn CMR theo CCS 2024), cùng các liệu pháp điều trị nhắm trúng đích cơ chế (Stentless strategy, Colchicine).",
    "clinicalPearls": [
      "Chỉ dưới 5% mảng xơ vữa vỏ mỏng (TCFA) thực sự tiến triển thành biến cố tắc mạch; sự chuyển dịch sang mô hình 'Bệnh nhân dễ tổn thương' (Vulnerable Patient) phối hợp bộ ba Mảng xơ vữa + Máu tăng đông + Cơ tim nhạy cảm giúp cá thể hóa điều trị toàn diện.",
      "Xói mòn mảng xơ vữa (Plaque Erosion) có vỏ xơ nguyên vẹn và huyết khối trắng giàu tiểu cầu; nghiên cứu EROSION chứng minh bệnh nhân có thể điều trị bảo tồn an toàn bằng thuốc kháng huyết khối mạnh (Aspirin + Ticagrelor) mà không cần đặt stent (Stentless strategy).",
      "Đồng thuận toàn cầu lần thứ năm (UDMI-V 2026) bãi bỏ phân loại Type 1-5, chuyển sang phân loại dựa trên sinh lý bệnh: Primary MI (nguyên phát tại mạch vành bao gồm cả SCAD, co thắt), Secondary MI (mất cân bằng cung - cầu oxy) và Procedure-related MI (liên quan can thiệp/phẫu thuật trong 30 ngày).",
      "MINOCA được tái định nghĩa là 'Tổn thương cơ tim với động mạch vành không tắc nghẽn' (Myocardial Injury); chụp Cộng hưởng từ tim (CMR) sớm trong vòng 2 tuần đầu là tiêu chuẩn vàng (Class I, Level B) để chẩn đoán phân biệt giữa NMCT thực sự, Viêm cơ tim cấp và Hội chứng Takotsubo."
    ],
    "tags": [
      "Tim Mạch",
      "Hội chứng vành cấp",
      "ACS",
      "Sinh lý bệnh",
      "Cơ chế bệnh sinh",
      "UDMI-V 2026",
      "MINOCA",
      "SCAD",
      "Plaque Erosion"
    ]
  },
  {
    "id": "ccbs-2",
    "slug": "slb-ccbs-aki",
    "code": "CCBS-02",
    "title": "AKI",
    "system": "renal",
    "systemName": "Thận & Tiết Niệu",
    "order": 2,
    "overview": "Sinh lý bệnh và Cơ chế bệnh sinh Tổn thương thận cấp (Acute Kidney Injury - AKI Pathophysiology): Phân loại trước thận (suy giảm tưới máu, hội chứng tim thận và sung huyết tĩnh mạch thận), tại thận (hoại tử ống thận cấp ATN, nhiễm trùng huyết SA-AKI, rối loạn vi tuần hoàn glycocalyx, Warburg reprogramming, pyroptosis, ferroptosis), sau thận (tắc nghẽn cơ học), tiến trình maladaptive repair chuyển tiếp AKI sang CKD, phân độ KDIGO và vai trò của các dấu ấn sinh học mới TIMP-2, IGFBP7, NGAL, KIM-1.",
    "clinicalPearls": [
      "Giảm cung lượng tim (suy tim cấp, nhồi máu cơ tim dữ dội).",
      "Giãn mạch hệ thống gây phân bố lại tuần hoàn (sốc nhiễm trùng, sốc phản vệ).",
      "Sử dụng thuốc ức chế tự điều hòa cầu thận (NSAIDs làm co tiểu động mạch vào, ức chế men chuyển ACEi/ARBs làm giãn tiểu động mạch ra).",
      "Hoại tử ống thận cấp (ATN): Hậu quả của thiếu máu cục bộ kéo dài (trước thận nặng chuyển sang) hoặc nhiễm độc chất ống thận."
    ],
    "tags": [
      "Thận",
      "AKI",
      "Sinh lý bệnh",
      "Cơ chế bệnh sinh"
    ]
  },
  {
    "id": "ccbs-3",
    "slug": "slb-ccbs-alagille",
    "code": "CCBS-03",
    "title": "Hội Chứng Alagille (ALGS)",
    "system": "digestive",
    "systemName": "Tiêu Hóa & Gan Mật",
    "order": 3,
    "overview": "Sinh lý bệnh & Cơ chế bệnh sinh Hội chứng Alagille (Alagille Syndrome - ALGS): Suy giảm con đường tín hiệu Notch (JAG1/NOTCH2), nghèo nàn đường mật liên thùy (PIBD), bẫy chẩn đoán với teo đường mật (Kasai pitfall), bệnh lý mạch máu hệ thống (Vasculopathy, Moyamoya, Phình mạch não) và biểu hiện đa cơ quan.",
    "clinicalPearls": [
      "2. Trục Tín Hiệu JAG1 – NOTCH2",
      "3. Bệnh Sinh Gan: Giảm Đường Mật (PIBD)",
      "4. Bẫy Chẩn Đoán &amp; Cảnh Báo Mổ Kasai",
      "5. Hậu Quả Ứ Mật &amp; Lipoprotein-X"
    ],
    "tags": [
      "Tiêu Hóa",
      "Hội Chứng Alagille",
      "Sinh lý bệnh",
      "Cơ chế bệnh sinh"
    ]
  },
  {
    "id": "ccbs-4",
    "slug": "slb-ccbs-bach-hau",
    "code": "CCBS-04",
    "title": "Bệnh Bạch hầu",
    "system": "pediatrics",
    "systemName": "Nhi Khoa & Truyền Nhiễm",
    "order": 4,
    "overview": "Sinh lý bệnh và Cơ chế bệnh sinh Bệnh Bạch hầu (Diphtheria Pathophysiology): Phân tích đặc điểm ngoại độc tố Diphtheria Toxin, gen tox, cơ chế gây độc phân tử 6 bước (gắn HB-EGF, nhập bào clathrin, phân cắt furin, ADP-ribosyl hóa eEF-2), sự hình thành màng giả hô hấp, dấu hiệu cổ bạnh, biến chứng nhiễm độc cơ tim, thoái hóa bao myelin dây thần kinh và tổn thương thận cấp.",
    "clinicalPearls": [
      "Cấu tạo Màng giả: Mạng lưới sợi Fibrin đông cứng lại, giam hãm hồng cầu, bạch cầu hoại tử, tế bào biểu mô hoại tử và hàng triệu vi khuẩn C. diphtheriae tạo thành một lớp màng bao phủ bề mặt gọi là Màng giả (Pseudomembrane).",
      "Biến đổi màu sắc theo tiến triển: Ban đầu màng giả có màu trắng xám bóng, sau đó chuyển sang màu xám đục, xám xanh hoặc màu đen sẫm (do xuất huyết hoại tử tích tụ).",
      "Thời điểm xuất hiện: Thường bùng phát từ ngày thứ 7 đến ngày thứ 14 (tuần thứ 1 đến tuần thứ 2) sau khi khởi phát triệu chứng hô hấp.",
      "Hệ quả Sinh lý bệnh & Lâm sàng:\r\n                                \r\n                                    Suy tim sung huyết (CHF): Giảm thể tích co bóp, giãn thất, tụt huyết áp, nhịp tim nhanh, gan to, tĩnh mạch cổ nổi, phù phổi cấp."
    ],
    "tags": [
      "Nhi Khoa",
      "Bệnh Bạch hầu",
      "Sinh lý bệnh",
      "Cơ chế bệnh sinh"
    ]
  },
  {
    "id": "ccbs-5",
    "slug": "slb-ccbs-benh-nao-gan",
    "code": "CCBS-05",
    "title": "Bệnh Não Gan (HE)",
    "system": "digestive",
    "systemName": "Tiêu Hóa & Gan Mật",
    "order": 5,
    "overview": "Sinh lý bệnh & Cơ chế bệnh sinh Bệnh Não Gan (Hepatic Encephalopathy Pathophysiology): Phân loại Type A, B, C theo EASL/AASLD, thang West Haven, thuyết nhiễm độc Amoniac (NH3), phù tế bào sao (Astrocyte Swelling), teo cơ (Sarcopenia), tỷ lệ Fischer BCAA/AAA, trục Ruột-Gan-Não và độc tố nội thể LPS, 6 yếu tố thúc đẩy đợt cấp, cơ chế phân tử của Lactulose, Rifaximin, LOLA, BCAA và quy trình chẩn đoán phân biệt.",
    "clinicalPearls": [
      "Biểu mô ruột non: Khử amin của glutamine nhờ enzyme glutaminase.",
      "Thận: Sản xuất amoniac tại tế bào ống thận (tăng mạnh khi có hạ Kali máu và toan hóa nội bào).",
      "Chuyển hóa protein từ bữa ăn: Sự hấp thu các hợp chất chứa nitơ.",
      "Hạ đường huyết hoặc Hôn mê tăng áp lực thẩm thấu: Kiểm tra ngay đường huyết mao mạch tại giường."
    ],
    "tags": [
      "Tiêu Hóa",
      "Bệnh Não Gan",
      "Sinh lý bệnh",
      "Cơ chế bệnh sinh"
    ]
  },
  {
    "id": "ccbs-6",
    "slug": "slb-ccbs-budd-chiari",
    "code": "CCBS-06",
    "title": "Hội Chứng Budd-Chiari (BCS)",
    "system": "general",
    "systemName": "Tổng Quát",
    "order": 6,
    "overview": "Sinh lý bệnh & Cơ chế bệnh sinh Hội chứng Budd-Chiari (Budd-Chiari Syndrome - BCS / Huyết khối tĩnh mạch gan): Tắc nghẽn đường ra tĩnh mạch gan (HVOTO), tăng áp lực thủy tĩnh xoang gan, hoại tử trung tâm tiểu thùy (Zone 3), phì đại bù trừ thùy đuôi (Caudate lobe), đột biến JAK2 V617F, bẫy ngoại bào NETs và 4 thể lâm sàng.",
    "clinicalPearls": [
      "2. Huyết Động Học &amp; Tăng Áp Xoang",
      "3. Hoại Tử Zone 3 &amp; Xơ Hóa Pericentral",
      "4. Giải Phẫu &amp; Phì Đại Thùy Đuôi",
      "5. Đột Biến JAK2 V617F &amp; Tăng Đông"
    ],
    "tags": [
      "Tổng Quát",
      "Hội Chứng Budd-Chiari",
      "Sinh lý bệnh",
      "Cơ chế bệnh sinh"
    ]
  },
  {
    "id": "ccbs-7",
    "slug": "slb-ccbs-ccs",
    "code": "CCBS-07",
    "title": "Hội chứng vành mạn",
    "system": "general",
    "systemName": "Tổng Quát",
    "order": 7,
    "overview": "Sinh lý bệnh và Cơ chế bệnh sinh Hội chứng vành mạn (Chronic Coronary Syndromes Pathophysiology): Phân tích bất thường cấu trúc/chức năng động mạch thượng tâm mạc, rối loạn chức năng vi tuần hoàn vành (CMD), hội chứng ANOCA/INOCA và mất cân bằng cung-cầu oxy.",
    "clinicalPearls": [
      "Xơ vữa lan tỏa: Mảng xơ vữa phân bố rải rác, không gây hẹp khu trú nghiêm trọng trên phim chụp mạch vành nhưng vẫn tạo ra sự sụt giảm áp lực tưới máu lũy tiến dọc theo chiều dài mạch máu, làm giảm đáng kể khả năng cung cấp oxy khi gắng sức.",
      "Bất thường cấu trúc khác: Cầu cơ tim (myocardial bridging - động mạch chạy ngầm trong cơ tim bị siết chặt ở kỳ tâm thu), phình động mạch vành hoặc chèn ép cơ học từ ngoài (do phì đại cơ tim, tăng áp lực cuối tâm trương thất trái trong suy tim).",
      "Rối loạn chức năng nội mạc: Tế bào nội mô bị tổn thương mất khả năng tiết ra chất giãn mạch Nitric Oxide (NO) dưới tác động của lực trượt dòng chảy (flow-mediated dilation).",
      "Tái cấu trúc hướng vào trong: Lớp cơ trơn tiểu động mạch phì đại làm hẹp lòng vi mạch."
    ],
    "tags": [
      "Tổng Quát",
      "Hội chứng vành mạn",
      "Sinh lý bệnh",
      "Cơ chế bệnh sinh"
    ]
  },
  {
    "id": "ccbs-8",
    "slug": "slb-ccbs-celiac",
    "code": "CCBS-08",
    "title": "Bệnh Celiac",
    "system": "general",
    "systemName": "Tổng Quát",
    "order": 8,
    "overview": "Sinh lý bệnh và Cơ chế bệnh sinh Bệnh Celiac (Coeliac Disease Pathophysiology &amp; Pathogenesis): Phân tích toàn diện tính kháng tiêu hóa của gluten, enzyme Tissue Transglutaminase 2 (TG2), phức hợp HLA-DQ2/DQ8, đáp ứng miễn dịch thích ứng vs bẩm sinh, IL-15, độc tế bào IELs, phân loại Marsh cải tiến, thể tiềm ẩn (PCD), thể kháng trị (RCD1 vs RCD2, đột biến JAK1-STAT3, nguy cơ EATL) và các đích tác động dược lý mới.",
    "clinicalPearls": [
      "Glutamine: Cung cấp cơ chất lý tưởng cho phản ứng biến đổi sinh học sau này bởi enzyme TG2.",
      "Hoạt hóa T CD4+: APCs (HLA-DQ2/DQ8+) trình diện DGP cho tế bào T CD4+ đặc hiệu gluten trong lớp đệm.",
      "Bão Cytokine Th1 / Th17: Tế bào T CD4+ tiết ra nồng độ cao IFN-&gamma;, TNF-&alpha;, IL-21.",
      "Tái cấu trúc mô: IFN-&gamma; và TNF-&alpha; kích thích nguyên bào sợi bài tiết các enzyme Matrix Metalloproteinases (MMPs), phân hủy chất nền ngoại bào và kích thích quá sản khe tuyến (crypt hyperplasia)."
    ],
    "tags": [
      "Tổng Quát",
      "Bệnh Celiac",
      "Sinh lý bệnh",
      "Cơ chế bệnh sinh"
    ]
  },
  {
    "id": "ccbs-9",
    "slug": "slb-ccbs-ckd",
    "code": "CCBS-09",
    "title": "CKD",
    "system": "renal",
    "systemName": "Thận & Tiết Niệu",
    "order": 9,
    "overview": "Sinh lý bệnh và Cơ chế bệnh sinh Bệnh thận mạn (Chronic Kidney Disease - CKD Pathophysiology): Sự thích ứng thích nghi phì đại cầu thận, cơ chế mất thăng bằng nội môi và cố định áp lực thẩm thấu nước tiểu (isosthenuria), tích tụ creatinin/urê, sương urê huyết (uremic frost), rối loạn điện giải (kali, natri) và kiềm toan, bệnh lý loạn dưỡng xương do thận (renal osteodystrophy) liên đới calcitriol và PTH, thiếu máu do giảm erythropoietin, cơ chế bệnh thận đái tháo đường (DKD, hyperfiltration, podocyte injury) và các liệu pháp SGLT2i/GLP-1 RA.",
    "clinicalPearls": [
      "Viêm xương xơ hóa (Osteitis fibrosa cystica): Do PTH quá cao kích thích hủy cốt bào hoạt động mạnh, làm tiêu xương và xơ hóa tủy xương (high-turnover bone disease).",
      "Bệnh xương bất động (Adynamic bone disease): Do điều trị ức chế PTH quá mức hoặc do viêm mạn, tế bào xương ngừng hoạt động chuyển hóa (low-turnover bone disease).",
      "Nhuyễn xương (Osteomalacia): Xương kém khoáng hóa do thiếu hụt calcitriol trầm trọng.",
      "Tăng sản xuất các gốc tự do oxy hóa (ROS) từ chuỗi hô hấp ty thể, gây tổn thương DNA và bào quan."
    ],
    "tags": [
      "Thận",
      "CKD",
      "Sinh lý bệnh",
      "Cơ chế bệnh sinh"
    ]
  },
  {
    "id": "ccbs-10",
    "slug": "slb-ccbs-co-truong",
    "code": "CCBS-10",
    "title": "Cổ Trướng (Ascites) Trong Xơ Gan",
    "system": "general",
    "systemName": "Tổng Quát",
    "order": 10,
    "overview": "Sinh lý bệnh & Cơ chế bệnh sinh Cổ Trướng trong Xơ Gan (Cirrhotic Ascites Pathophysiology): Thuyết giãn mạch ngoại vi (Splanchnic Vasodilation), Thuyết viêm hệ thống mới (Systemic Inflammation), Dịch chuyển vi khuẩn (BT), PAMPs/DAMPs, Rối loạn tuần hoàn sau chọc tháo dịch (PICD) và phân tích Gradient SAAG.",
    "clinicalPearls": [
      "Aithal GP, Palaniyappan N, China L, et al. Guidelines on the management of ascites in cirrhosis. Gut. 2021;70(1):9-29. doi:10.1136/gutjnl-2020-321790.",
      "Kaplan DE, Ripoll C, Thiele M, et al. AASLD Practice Guidance on risk stratification and management of portal hypertension and varices in cirrhosis. Hepatology. 2024;79(5):1180-1211. doi:10.1097/HEP.0000000000000612.",
      "Bekaert J, Aerts M, François S, et al. The burden of ascites in cirrhosis. Acta Clin Belg. 2025;80(1-2):8-16. doi:10.1080/17843286.2025.2506472.",
      "Zhou HJ, Li ZQ, Dili DE, Xie Q. Human albumin infusion for reducing hyponatremia and circulatory dysfunction in liver cirrhosis: A meta-analysis update. World J Hepatol. 2025;17(6):106418. doi:10.4254/wjh.v17.i6.106418."
    ],
    "tags": [
      "Tổng Quát",
      "Cổ Trướng",
      "Sinh lý bệnh",
      "Cơ chế bệnh sinh"
    ]
  },
  {
    "id": "ccbs-11",
    "slug": "slb-ccbs-copd",
    "code": "CCBS-11",
    "title": "BPTNMT (COPD)",
    "system": "respiratory",
    "systemName": "Hô Hấp & Thăng Bằng Khí Máu",
    "order": 11,
    "overview": "Sinh lý bệnh và Cơ chế bệnh sinh Bệnh phổi tắc nghẽn mạn tính (COPD Pathophysiology): Khái niệm di truyền-môi trường-thời gian GETomics, thay đổi bệnh lý viêm đường thở nhỏ và phế nang (type 2-high vs. type 2-low), cơ chế bẫy khí/căng phồng phổi, bất tương xứng thông khí-tưới máu (V/Q mismatch), tăng áp phổi và hội chứng chồng lấp tim phổi (syndemics).",
    "clinicalPearls": [
      "Xơ hóa đường thở nhỏ (Small airway disease): Phản ứng viêm mạn tính và quá trình sửa chữa lỗi liên tục dẫn đến xơ hóa quanh tiểu phế quản, phì đại lớp cơ trơn phế quản, làm hẹp lòng và tăng sức cản đường thở nhỏ (&lt; 2mm).",
      "Tăng tiết chất nhầy (Viêm phế quản mạn): Khói thuốc kích thích phì đại các tuyến dưới niêm mạc và tăng sản tế bào đài (được điều hòa bởi gen MUC5AC và MUC5B) ở các đường thở lớn, gây tăng tiết đờm nhầy mạn tính làm bít tắc lòng ống dẫn khí.",
      "Yếu tố kích phát: Chủ yếu do nhiễm trùng đường hô hấp (virus như Rhinovirus, Influenza; vi khuẩn như H. influenzae, S. pneumoniae, M. catarrhalis) hoặc sự gia tăng nồng độ các chất ô nhiễm môi trường (bụi mịn PM2.5, khói thuốc).",
      "Dòng thác bùng phát viêm: Các tác nhân này kích hoạt phản ứng viêm bùng phát tại đường thở, làm tăng tiết đờm đặc/mủ gây bít tắc lòng mạch, phù nề niêm mạc và co thắt phế quản cấp tính."
    ],
    "tags": [
      "Hô Hấp",
      "BPTNMT",
      "Sinh lý bệnh",
      "Cơ chế bệnh sinh"
    ]
  },
  {
    "id": "ccbs-12",
    "slug": "slb-ccbs-dka",
    "code": "CCBS-12",
    "title": "Toan Ceton do ĐTĐ (DKA &amp; euDKA)",
    "system": "endocrine",
    "systemName": "Nội Tiết & Chuyển Hóa",
    "order": 12,
    "overview": "Sinh lý bệnh & Cơ chế bệnh sinh Toan Ceton do Đái tháo đường (Diabetic Ketoacidosis - DKA) & Thể Toan Ceton Đường Huyết Bình Thường (euDKA) do SGLT2i: Phân tích mất cân bằng tỷ lệ Glucagon/Insulin, con đường Ketogenesis tại gan qua CPT-1, tỷ lệ BOHB/Acetoacetate 10:1, toan chuyển hóa và cập nhật tiêu chuẩn loại bỏ Anion Gap (Consensus 2024/ADA 2026), nghịch lý Kali, phù não trẻ em và phác đồ Dextrose sớm.",
    "clinicalPearls": [
      "Trục Protein (Thoái Hóa Protein Cơ Vân):\n                                &bull; Tăng phân giải protein ở cơ xương giải phóng các amino acid tân tạo đường (Alanine, Glutamine) cung cấp nhiên liệu liên tục cho gan sản xuất thêm glucose.",
      "Đáp ứng bù trừ hô hấp (Kiểu thở Kussmaul): Toan máu kích thích các thụ thể hóa học ở xoang cảnh và thân não &rarr; khởi phát nhịp thở sâu, nhanh, liên tục (thở Kussmaul) để tăng thông khí đào thải tối đa CO2 làm giảm áp lực acid bay hơi (PaCO2).",
      "Hơi thở mùi táo chín (Acetone Breath): Acetone là thể ceton bay hơi dễ khuếch tán qua màng phế nang &ndash; mao mạch ra ngoài hơi thở.",
      "Cơ chế Phù não (Cerebral Injury/Edema) ở trẻ em: Là biến chứng nguy hiểm nhất với tỷ lệ tử vong lên tới 25 &ndash; 30%."
    ],
    "tags": [
      "Nội Tiết",
      "Toan Ceton do ĐTĐ",
      "Sinh lý bệnh",
      "Cơ chế bệnh sinh"
    ]
  },
  {
    "id": "ccbs-13",
    "slug": "slb-ccbs-dot-quy",
    "code": "CCBS-13",
    "title": "Đột quỵ",
    "system": "general",
    "systemName": "Tổng Quát",
    "order": 13,
    "overview": "Sinh lý bệnh và Cơ chế bệnh sinh Đột quỵ (Stroke Pathophysiology): Nhồi máu não (Dòng thác thiếu máu cục bộ, phân loại TOAST, Glutamate excitotoxicity, Ferroptosis, trục ruột-não), Chảy máu não/ICH (Deep HTN vs Lobar CAA, tổn thương nguyên phát vs thứ phát), HKTMN/CVT, Phình động mạch & thang điểm PHASES, Dị dạng AVM & Spetzler-Martin, PFO thuyên tắc nghịch lý và Sa sút trí tuệ mạch máu.",
    "clinicalPearls": [
      "Tắc mạch tại chỗ do Huyết khối: Huyết khối hình thành phủ kín lòng mạch bị hẹp nặng.",
      "Tắc động mạch nhánh (Branch Atheromatous Disease): Mảng xơ vữa ở động mạch lớn nội sọ lấp mất lỗ ra của các nhánh xuyên sâu.",
      "Giảm tưới máu vùng xa (Watershed/Borderzone infarct): Hẹp rất nặng làm sụt giảm áp lực tưới máu ở vùng giáp ranh giữa các vùng tưới máu động mạch.",
      "Nếu CT điển hình chảy máu dưới nhện: Chụp CTA hoặc DSA ngay &rarr; Phát hiện túi phình &rarr; Can thiệp nội mạch (Coiling) hoặc Phẫu thuật kẹp (Clipping)."
    ],
    "tags": [
      "Tổng Quát",
      "Đột quỵ",
      "Sinh lý bệnh",
      "Cơ chế bệnh sinh"
    ]
  },
  {
    "id": "ccbs-14",
    "slug": "slb-ccbs-dtd",
    "code": "CCBS-14",
    "title": "Đái tháo đường",
    "system": "general",
    "systemName": "Tổng Quát",
    "order": 14,
    "overview": "Sinh lý bệnh và Cơ chế bệnh sinh Đái tháo đường (Diabetes Mellitus Pathophysiology): Phân tích chi tiết cơ chế tự miễn ĐTĐ Típ 1, đề kháng insulin và suy kiệt tế bào beta ĐTĐ Típ 2, cơ chế IFG/IGT, các biến chứng cấp tính DKA và HHS, thuyết ngộ độc glucose gây biến chứng vi mạch-thần kinh, hiện tượng Trí nhớ chuyển hóa (Metabolic Memory), và mối liên quan với gan nhiễm mỡ MASLD.",
    "clinicalPearls": [
      "Yếu tố môi trường kích phát: Nhiễm vi rút (như Coxsackievirus B, Enterovirus, Rubella hoặc SARS-CoV-2) kích hoạt hiện tượng \"bắt chước phân tử\" (molecular mimicry), thúc đẩy hệ miễn dịch nhầm lẫn và tấn công tế bào tụy.",
      "Tại cơ: Giảm thu nhận glucose do lỗi dòng tín hiệu nội bào của thụ thể insulin (IRS-1), ngăn cản sự chuyển vị của kênh vận chuyển GLUT-4 lên màng tế bào.",
      "Tại gan: Mất tín hiệu ức chế tân tạo đường, gan tiếp tục sản xuất glucose đói đổ vào máu.",
      "Động học mô mỡ: Béo phì tạng gây giải phóng lượng lớn các cytokine viêm (TNF-α, IL-6) và các acid béo tự do (FFA) vào máu, gây nhiễm độc mỡ và làm giảm hoạt tính của thụ thể insulin."
    ],
    "tags": [
      "Tổng Quát",
      "Đái tháo đường",
      "Sinh lý bệnh",
      "Cơ chế bệnh sinh"
    ]
  },
  {
    "id": "ccbs-15",
    "slug": "slb-ccbs-dumping",
    "code": "CCBS-15",
    "title": "Hội Chứng Dumping",
    "system": "general",
    "systemName": "Tổng Quát",
    "order": 15,
    "overview": "Sinh lý bệnh & Cơ chế bệnh sinh Hội Chứng Dumping (Dumping Syndrome Pathophysiology): Dumping sớm (Rapid Fluid Shift, giảm thể tích tuần hoàn cấp, phóng thích VIP/Neurotensin) vs Dumping muộn (Hấp thu Glucose nhanh qua SGLT-1, tăng tiết GLP-1, tăng Insulin phản ứng và hạ đường huyết sau ăn), các đích điều trị và thang điểm Sigstad / Arts.",
    "clinicalPearls": [
      "Thu hẹp thể tích chứa đựng của dạ dày (Reduced gastric volume capacity): Dạ dày mất khả năng giãn tiếp nhận (receptive relaxation), đẩy nhanh dưỡng trấp xuống ruột non.",
      "Rodgers L, Phillips CA. Dumping syndrome: Causes, management, and patient education. Am Nurse Today. 2018;13(1):6-10.",
      "Masclee GMC, Masclee AAM. Dumping Syndrome: Pragmatic Treatment Options and Experimental Approaches for Improving Clinical Outcomes. Clin Exp Gastroenterol. 2023;16:197-210. doi:10.2147/CEG.S390317.",
      "Vavricka SR, Greuter T. Gastroparesis and Dumping Syndrome: Current Concepts and Management. J Clin Med. 2019;8(8):1127. doi:10.3390/jcm8081127."
    ],
    "tags": [
      "Tổng Quát",
      "Hội Chứng Dumping",
      "Sinh lý bệnh",
      "Cơ chế bệnh sinh"
    ]
  },
  {
    "id": "ccbs-16",
    "slug": "slb-ccbs-gerd",
    "code": "CCBS-16",
    "title": "GERD",
    "system": "digestive",
    "systemName": "Tiêu Hóa & Gan Mật",
    "order": 16,
    "overview": "Sinh lý bệnh và Cơ chế bệnh sinh bệnh trào ngược dạ dày thực quản (GERD Pathophysiology): Phân tích chi tiết hàng rào chống trào ngược (LES, TLESRs, thoát vị hoành, cơ hoành, dải cơ clasp/sling, góc His, van GEFV), rối loạn thanh thải thực quản, cơ chế túi axit (acid pocket), trào ngược không axit, phân nhóm NERD theo Rome IV, và sinh lý bệnh ở phụ nữ có thai/béo phì.",
    "clinicalPearls": [
      "Giảm áp lực cơ thắt thực quản dưới (Hypotensive LES): Áp lực LES duy trì liên tục ở mức thấp (&lt;10 mmHg) do suy giảm trương lực cơ trơn hoặc do tác động của một số chất (caffeine, thuốc lá, thức ăn nhiều mỡ, thuốc giãn cơ trơn).",
      "Chậm làm trống dạ dày (Delayed Gastric Emptying): Thức ăn và dịch vị ứ đọng lâu trong dạ dày làm tăng áp lực dạ dày kéo dài, thúc đẩy giãn TLESRs liên tục và ép dịch dạ dày trào ngược lên trên.",
      "Yếu tố cơ học: Kích thước tử cung lớn dần ở các tháng cuối ép trực tiếp lên dạ dày, làm tăng áp lực dạ dày cơ học vượt quá áp lực LES.",
      "Tăng áp lực ổ bụng: Khối lượng lớn mỡ nội tạng đè ép liên tục lên dạ dày, làm gia tăng chênh lệch áp lực giữa dạ dày và thực quản, thúc đẩy dịch vị vọt qua LES."
    ],
    "tags": [
      "Tiêu Hóa",
      "GERD",
      "Sinh lý bệnh",
      "Cơ chế bệnh sinh"
    ]
  },
  {
    "id": "ccbs-17",
    "slug": "slb-ccbs-gilbert",
    "code": "CCBS-17",
    "title": "Hội Chứng Gilbert (GS)",
    "system": "general",
    "systemName": "Tổng Quát",
    "order": 17,
    "overview": "Sinh lý bệnh & Cơ chế bệnh sinh Hội chứng Gilbert (Gilbert Syndrome - GS): Đột biến promoter UGT1A1*28 và exon Gly71Arg, giảm 50-70% hoạt tính enzyme liên hợp glucuronide, độc tính thuốc Irinotecan (SN-38), nghịch lý bảo vệ tim mạch",
    "clinicalPearls": [
      "2. Hóa Sinh Chuyển Hóa Bilirubin",
      "3. Di Truyền Học &amp; Đột Biến UGT1A1",
      "4. Yếu Tố Kích Hoạt (Nhịn Ăn &amp; Stress)",
      "5. Dược Lý Học &amp; Độc Tính Irinotecan (SN-38)"
    ],
    "tags": [
      "Tổng Quát",
      "Hội Chứng Gilbert",
      "Sinh lý bệnh",
      "Cơ chế bệnh sinh"
    ]
  },
  {
    "id": "ccbs-18",
    "slug": "slb-ccbs-ha-duong-huyet",
    "code": "CCBS-18",
    "title": "Hạ Đường Huyết trong ĐTĐ",
    "system": "cardiovascular",
    "systemName": "Tim Mạch & Tuần Hoàn",
    "order": 18,
    "overview": "Sinh lý bệnh & Cơ chế bệnh sinh Hạ Đường Huyết trong Đái tháo đường (Hypoglycemia Pathophysiology & HAAF): Phân loại 3 mức độ theo ADA 2026 (Level 1, 2, 3), chuỗi phản xạ đối kháng nội tiết (Insulin, Glucagon, Epinephrine, Cortisol, GH), hội chứng suy giảm nhận biết hạ đường huyết (Hypoglycemia-Associated Autonomic Failure - HAAF), cơ chế giảm thanh thải insulin ở bệnh thận mạn, bão GLP-1 sau mổ chuyển hóa và quy tắc 15.",
    "clinicalPearls": [
      "2. American Diabetes Association Professional Practice Committee. 14. Children and adolescents: Standards of Care in Diabetes—2026. Diabetes Care. 2026;49(Suppl. 1):S297-S320. doi:10.2337/dc26-S014.",
      "3. Cryer PE. Mechanisms of Hypoglycemia-Associated Autonomic Failure in Diabetes. N Engl J Med. 2013;369(4):362-372. doi:10.1056/NEJMra1215228.",
      "4. Bộ Y tế Việt Nam. Hướng dẫn chẩn đoán và điều trị bệnh đái tháo đường và biến chứng thần kinh tự chủ. Hà Nội: NXB Y học; 2025.",
      "5. Umpierrez GE, Davis GM, ElSayed NA, et al. Hyperglycemic crises in adults with diabetes: A consensus report. Diabetes Care. 2024;47(8):1257-1275. doi:10.2337/dci24-0032."
    ],
    "tags": [
      "Tim Mạch",
      "Hạ Đường Huyết trong ĐTĐ",
      "Sinh lý bệnh",
      "Cơ chế bệnh sinh"
    ]
  },
  {
    "id": "ccbs-19",
    "slug": "slb-ccbs-hav",
    "code": "CCBS-19",
    "title": "Viêm Gan Siêu Vi A",
    "system": "general",
    "systemName": "Tổng Quát",
    "order": 19,
    "overview": "Sinh lý bệnh và Cơ chế bệnh sinh Viêm gan Siêu vi A (HAV Pathophysiology & Pathogenesis): Phân tích chi tiết cấu trúc hạt virion trần và bán vỏ màng (eHAV), con đường chết chương trình nội bào qua MAVS-IRF3/7, miễn dịch thích ứng CTLs CD8+, 6 đặc điểm mô bệnh học kinh điển ở người (thâm nhiễm tương bào, hoại tử mảnh, ứ mật, rosette), bệnh học so sánh trên tinh tinh, khỉ đêm và chuột knockout Ifnar1-/-, cùng bảng đối sánh HAV vs HBV vs HCV.",
    "clinicalPearls": [
      "1. Phình to tế bào gan (Hepatocellular Ballooning) & Lộn xộn tiểu thùy (Lobular Disarray): Tế bào gan trương phồng tích tụ dịch nội bào, bào tương có dạng ren (lacy appearance), phá vỡ cấu trúc bè gan song song bình thường.",
      "3. Tổn thương quanh khoảng cửa & Hoại tử mảnh (Piecemeal Necrosis): Đám tế bào viêm thâm nhiễm dày đặc phá vỡ màng giới hạn (limiting plate) của khoảng cửa, tấn công các tế bào gan rìa (periportal hepatocytes) tạo hình ảnh hoại tử mối gặm.",
      "4. Thể ưa acid / Thể Councilman (Acidophilic Apoptotic Bodies): Các tế bào gan bị chết chương trình co cụm lại, bào tương bắt màu hồng sẫm (deeply eosinophilic) và nhân đông ngưng tụ, kế cận các tế bào Kupffer phì đại chứa sắc tố hemosiderin.",
      "1. Cullen JM, Lemon SM. Comparative Pathology of Hepatitis A Virus and Hepatitis E Virus Infection. Cold Spring Harb Perspect Med. 2019;9(9):a033456. doi:10.1101/cshperspect.a033456."
    ],
    "tags": [
      "Tổng Quát",
      "Viêm Gan Siêu Vi A",
      "Sinh lý bệnh",
      "Cơ chế bệnh sinh"
    ]
  },
  {
    "id": "ccbs-20",
    "slug": "slb-ccbs-hbv",
    "code": "CCBS-20",
    "title": "Viêm Gan Siêu Vi B",
    "system": "general",
    "systemName": "Tổng Quát",
    "order": 20,
    "overview": "Sinh lý bệnh và Cơ chế bệnh sinh Viêm gan Siêu vi B (HBV Pathophysiology & Pathogenesis): Phân tích chi tiết cấu trúc bộ gen rcDNA, con đường sửa chữa hình thành cccDNA minichromosome, cơ chế miễn dịch không hủy tế bào qua APOBEC3A/3B, cơ chế cạn kiệt tế bào T, 4 pha diễn tiến tự nhiên theo EASL 2025 & Bộ Y tế 2026, viêm gan thể ẩn (OBI), và cơ chế sinh ung thư gan HCC qua protein HBx/tích hợp DNA.",
    "clinicalPearls": [
      "Gắn kết ban đầu: Hạt Dane bám lỏng lẻo vào Heparan Sulfate Proteoglycans (HSPG) trên bề mặt tế bào gan.",
      "Biểu hiện thụ thể ức chế (Checkpoints): Màng tế bào T đặc hiệu tăng biểu hiện các phân tử ức chế miễn dịch PD-1, CTLA-4, TIM-3, LAG-3 làm tê liệt khả năng tăng sinh và tiết cytokine của tế bào T.",
      "Tác động dung nạp miễn dịch của HBeAg hòa tan: HBeAg được tiết ồ ạt vào máu, vượt qua hàng rào tuần hoàn đến tuyến ức, gây dung nạp âm tính đối với các dòng tế bào T nhận diện kháng nguyên lõi HBc/HBe ngay từ giai đoạn chu sinh.",
      "Phân hủy phức hợp ức chế Smc5/6: HBx chuyển hướng phức hợp ubiquitin ligase CUL4-DDB1 của tế bào chủ để phân hủy phức hợp Smc5/6 (vốn có nhiệm vụ khóa cccDNA), giải phóng cccDNA và phá hủy khả năng sửa chữa đứt gãy DNA kép của tế bào gan."
    ],
    "tags": [
      "Tổng Quát",
      "Viêm Gan Siêu Vi B",
      "Sinh lý bệnh",
      "Cơ chế bệnh sinh"
    ]
  },
  {
    "id": "ccbs-21",
    "slug": "slb-ccbs-hcv",
    "code": "CCBS-21",
    "title": "Viêm Gan Siêu Vi C",
    "system": "general",
    "systemName": "Tổng Quát",
    "order": 21,
    "overview": "Sinh lý bệnh và Cơ chế bệnh sinh Viêm gan Siêu vi C (HCV Pathophysiology & Pathogenesis): Phân tích chi tiết bộ gen (+)ssRNA, hiện tượng Quasispecies, chu kỳ sống Lipo-viro-particle, 5 con đường mỡ hóa gan (Steatosis), cơ chế đề kháng insulin qua IRS-1/2, cơ chế xơ hóa gan qua MDA/4-HNE/TGF-β, suy kiệt tế bào T, và vết sẹo phân tử (Epigenetic Scar) sau điều trị DAA.",
    "clinicalPearls": [
      "Phân bố kiểu gen: HCV được chia làm 6 kiểu gen chính (Genotypes 1 đến 6) và hàng chục phân nhóm (subtypes a, b, c...). Tại Việt Nam, kiểu gen 1 (chủ yếu 1b) và kiểu gen 6 chiếm đa số trường hợp lâm sàng.",
      "Lắp ráp liên kết giọt mỡ (Lipid Droplets Assembly): HCV sử dụng giọt mỡ (lipid droplets) trong bào tương làm \"bệ phóng lắp ráp\". Protein Core tập trung quanh giọt mỡ, thu hút RNA thế hệ mới từ NS5A sang để đóng gói nucleocapsid.",
      "1 Tăng hấp thu acid béo tự do (FFA Input): Tình trạng đề kháng insulin ngoại vi kích hoạt enzyme hormone-sensitive lipase tại mô mỡ, giải phóng ồ ạt acid béo tự do vào tuần hoàn cửa đổ về gan.",
      "2 Tăng đường phân & Tổng hợp lipid mới (De novo lipogenesis): Trạng thái tăng đường huyết và tăng insulin máu kích hoạt con đường SREBP-1c và ChREBP, thúc đẩy tế bào gan tổng hợp acid béo mới."
    ],
    "tags": [
      "Tổng Quát",
      "Viêm Gan Siêu Vi C",
      "Sinh lý bệnh",
      "Cơ chế bệnh sinh"
    ]
  },
  {
    "id": "ccbs-22",
    "slug": "slb-ccbs-hdv",
    "code": "CCBS-22",
    "title": "Viêm Gan Siêu Vi D",
    "system": "general",
    "systemName": "Tổng Quát",
    "order": 22,
    "overview": "Sinh lý bệnh và Cơ chế bệnh sinh Viêm gan Siêu vi D (HDV Pathophysiology & Pathogenesis): Phân tích chi tiết cấu trúc viroid subviral satellite (-)ssRNA vòng tròn ~1.7 kb, cơ chế ribozyme tự cắt, sự phụ thuộc bắt buộc vào vỏ HBsAg qua thụ thể NTCP, chỉnh sửa RNA qua ADAR1 sinh ra S-HDAg vs L-HDAg (farnesylation), 2 hình thái lâm sàng đồng nhiễm (Coinfection) vs bội nhiễm (Superinfection), cơ chế thúc đẩy xơ hóa gan bão táp, và liệu pháp đích Bulevirtide/Lonafarnib.",
    "clinicalPearls": [
      "Tổn thương nguyên phát dẫn đến suy giảm chức năng cơ quan đích.",
      "Cơ chế bù trừ ban đầu có thể chuyển thành yếu tố thúc đẩy suy sụp chức năng."
    ],
    "tags": [
      "Tổng Quát",
      "Viêm Gan Siêu Vi D",
      "Sinh lý bệnh",
      "Cơ chế bệnh sinh"
    ]
  },
  {
    "id": "ccbs-23",
    "slug": "slb-ccbs-hemophilia",
    "code": "CCBS-23",
    "title": "Bệnh Hemophilia ở trẻ em",
    "system": "hematology",
    "systemName": "Huyết Học & Miễn Dịch",
    "order": 23,
    "overview": "Sinh lý bệnh và Cơ chế bệnh sinh Bệnh Hemophilia ở trẻ em (Pediatric Hemophilia Pathophysiology): Phân tích di truyền lặn liên kết NST X (gen F8, F9), khiếm khuyết phức hợp Tenase nội sinh (FVIIIa-FIXa-PL-Ca2+), mất làn sóng bùng phát Thrombin, phân loại 3 mức độ giảm yếu tố và cơ chế biến chứng xuất huyết khớp (Hemophilic Arthropathy), tụ máu cơ iliopsoas, u giả và chất ức chế Inhibitors.",
    "clinicalPearls": [
      "Hemophilia B (Thiếu yếu tố IX): Chiếm 10% – 15% tổng số bệnh nhân Hemophilia. Tần suất mắc bệnh khoảng 1/30.000 trẻ nam sinh sống.",
      "Hemophilia C (Thiếu yếu tố XI): Di truyền lặn trên nhiễm sắc thể thường (autosomal recessive), gặp ở cả nam và nữ với tỷ lệ ngang nhau.",
      "Yếu tố XIa (FXIa) kích hoạt yếu tố IX thành yếu tố IXa (FIXa).",
      "Yếu tố IXa (FIXa) kết hợp với yếu tố VIIIa (FVIIIa), Phospholipid (PL) màng tiểu cầu và ion Ca2+ tạo thành Phức hợp Tenase nội sinh [FIXa – FVIIIa – PL – Ca2+]."
    ],
    "tags": [
      "Huyết Học",
      "Bệnh Hemophilia ở trẻ em",
      "Sinh lý bệnh",
      "Cơ chế bệnh sinh"
    ]
  },
  {
    "id": "ccbs-24",
    "slug": "slb-ccbs-henpq",
    "code": "CCBS-24",
    "title": "Hen Phế Quản",
    "system": "respiratory",
    "systemName": "Hô Hấp & Thăng Bằng Khí Máu",
    "order": 24,
    "overview": "Sinh lý bệnh và Cơ chế bệnh sinh Hen phế quản (Asthma Pathophysiology): Phân tích phân thể miễn dịch Type 2 vs Non-Type 2, vai trò kép của Nitric Oxide (iNOS vs eNOS), tái cấu trúc đường thở (Airway Remodeling), nút nhầy tắc nghẽn, các thể đặc thù (AERD, EIB, Hen béo phì) và cơ chế phân tử của các liệu pháp sinh học trúng đích theo GINA 2026.",
    "clinicalPearls": [
      "Tắc nghẽn luồng khí dao động trong hen được tạo thành từ 3 cơ chế: Co thắt cơ trơn phế quản cấp, phù nề dày thành đường thở và nút nhầy đặc quánh (mucus plugs).",
      "Viêm Kiểu 2 (Type 2 High) được điều hòa bởi IL-4 (chuyển lớp IgE), IL-5 (trưởng thành & sống sót Eosinophil), IL-13 (tăng tiết nhầy & iNOS) và các Alarmin (TSLP, IL-33, IL-25).",
      "Nitric Oxide (NO) có vai trò kép: NO từ iNOS tạo Peroxynitrite (OONO-) gây độc tế bào biểu mô; ngược lại NO từ eNOS kích hoạt cGMP/PKG làm giãn cơ trơn phế quản (cơ chế tác dụng của MgSO4).",
      "Bệnh hô hấp do NSAIDs/Aspirin (AERD) xuất phát từ rối loạn chuyển hóa Acid Arachidonic: Ức chế COX-1 làm cạn kiệt PGE2 bảo vệ, đẩy dòng chuyển hóa sang 5-LOX sinh bão Cysteinyl Leukotrienes (LTC4, LTD4, LTE4)."
    ],
    "tags": [
      "Hô Hấp",
      "Hen Phế Quản",
      "Sinh lý bệnh",
      "Cơ chế bệnh sinh",
      "GINA 2026"
    ]
  },
  {
    "id": "ccbs-25",
    "slug": "slb-ccbs-hev",
    "code": "CCBS-25",
    "title": "Viêm Gan Siêu Vi E",
    "system": "general",
    "systemName": "Tổng Quát",
    "order": 25,
    "overview": "Sinh lý bệnh và Cơ chế bệnh sinh Viêm gan Siêu vi E (HEV Pathophysiology & Pathogenesis): Phân tích chi tiết cấu trúc hạt quasi-enveloped, phân loại One Health 8 genotypes, phản ứng ống mật và thâm nhiễm bạch cầu trung tính, cơ chế bão miễn dịch gây suy gan cấp ở phụ nữ mang thai, 2 trục bệnh sinh thần kinh (xâm nhập BBB qua ZO-1/Claudin-5 và tự miễn kháng GM1/GM2), và bảng ma trận đối sánh 5 siêu vi gan A, B, C, D, E.",
    "clinicalPearls": [
      "Thời gian ủ bệnh: Kéo dài từ 15 đến 75 ngày (trung bình 36 ngày).",
      "Động học nhiễm vi rút: Sự bài tiết virus ra phân (fecal shedding) và tình trạng nhiễm virus huyết (viremia) đạt đỉnh đồng thời vào cuối thời kỳ ủ bệnh, ngay trước khi có biểu hiện tăng men gan và triệu chứng lâm sàng.",
      "Bản chất Non-cytopathic: HEV không trực tiếp làm vỡ màng tế bào gan. Hoại tử nhu mô gan và tăng ALT/AST là hệ quả của phản ứng miễn dịch qua trung gian tế bào T CD8+ (CTLs) và tế bào NK tấn công tiêu diệt các tế bào gan nhiễm virus.",
      "Tổn thương hàng rào bánh nhau: Nồng độ virus cực cao phá hủy trực tiếp các tế bào nuôi bánh nhau (syncytiotrophoblasts), dẫn đến suy giảm chức năng nhau thai, gây băng huyết sau sinh, sẩy thai, sinh non và thai chết lưu."
    ],
    "tags": [
      "Tổng Quát",
      "Viêm Gan Siêu Vi E",
      "Sinh lý bệnh",
      "Cơ chế bệnh sinh"
    ]
  },
  {
    "id": "ccbs-26",
    "slug": "slb-ccbs-hhs",
    "code": "CCBS-26",
    "title": "Tăng Áp Lực Thẩm Thấu do ĐTĐ (HHS)",
    "system": "general",
    "systemName": "Tổng Quát",
    "order": 26,
    "overview": "Sinh lý bệnh & Cơ chế bệnh sinh Trạng thái Tăng Áp Lực Thẩm Thấu do Đái tháo đường (Hyperglycemic Hyperosmolar State - HHS Pathophysiology): Phân tích nồng độ insulin tồn dư tối thiểu đủ ức chế Lipolysis nhưng bất lực trước tăng đường huyết, cơ chế lợi niệu thẩm thấu mất 12-15% nước cơ thể, vòng xoắn suy thận chức năng, áp lực thẩm thấu hiệu dụng > 300 mOsm/kg, nghịch lý bảo tồn huyết động, trạng thái tăng đông tắc mạch, tiêu cơ vân cấp và tiêu chuẩn chẩn đoán cập nhật Consensus 2024 / ADA 2026.",
    "clinicalPearls": [
      "Catecholamines (Epinephrine/Norepinephrine): Làm trầm trọng thêm tình trạng đề kháng insulin ở mô ngoại biên và ức chế thêm sự bài tiết insulin còn sót lại từ tuyến tụy.",
      "Natri (Na+ thâm hụt 5 &ndash; 13 mmol/kg): Thất thoát qua nước tiểu. Nồng độ Natri đo được ban đầu thường thấp giả tạo do hiệu ứng pha loãng thẩm thấu của Glucose (xem công thức hiệu chỉnh).",
      "Phosphat và Magie: Thất thoát nặng qua nước tiểu, làm suy giảm năng lượng ATP và tăng nguy cơ yếu cơ hoành, tiêu cơ vân cấp.",
      "1. Umpierrez GE, Davis GM, ElSayed NA, et al. Hyperglycemic crises in adults with diabetes: A consensus report. Diabetes Care. 2024;47(8):1257-1275. doi:10.2337/dci24-0032."
    ],
    "tags": [
      "Tổng Quát",
      "Tăng Áp Lực Thẩm Thấu do ĐTĐ",
      "Sinh lý bệnh",
      "Cơ chế bệnh sinh"
    ]
  },
  {
    "id": "ccbs-27",
    "slug": "slb-ccbs-hp",
    "code": "CCBS-27",
    "title": "Nhiễm khuẩn Helicobacter pylori",
    "system": "general",
    "systemName": "Tổng Quát",
    "order": 27,
    "overview": "Sinh lý bệnh và Cơ chế bệnh sinh Nhiễm khuẩn Helicobacter pylori (H. pylori Pathophysiology & Pathogenesis): Phân tích chi tiết cơ chế thích nghi sinh học men Urease, yếu tố độc lực CagA/T4SS, VacA, DupA, các kiểu hình định cư hang vị vs thân vị, chuỗi chuyển sản - nghịch sản Correa và cơ chế sinh học phân tử đề kháng kháng sinh.",
    "clinicalPearls": [
      "🧬Sinh lý &amp; Sinh lý bệnh",
      "Phản ứng viêm mạn tính gây tổn thương chọn lọc các tế bào D (D-cells) ở hang vị, làm sụt giảm nghiêm trọng nồng độ Somatostatin (hormone ức chế tiết gastrin).",
      "Sự mất ức chế hồi tác này khiến tế bào G (G-cells) tăng tiết mạnh Gastrin vào máu (Hypergastrinemia).",
      "Gastrin theo tuần hoàn đến kích thích trực tiếp tế bào thành (Parietal cells) và tế bào ECL ở vùng thân vị (nơi niêm mạc còn nguyên vẹn chưa bị viêm) tăng bài tiết acid HCl dữ dội (Hyperchlorhydria)."
    ],
    "tags": [
      "Tổng Quát",
      "Nhiễm khuẩn Helicobacter pylori",
      "Sinh lý bệnh",
      "Cơ chế bệnh sinh"
    ]
  },
  {
    "id": "ccbs-28",
    "slug": "slb-ccbs-ibd",
    "code": "CCBS-28",
    "title": "IBD (Crohn &amp; Viêm loét đại tràng)",
    "system": "digestive",
    "systemName": "Tiêu Hóa & Gan Mật",
    "order": 28,
    "overview": "Sinh lý bệnh và Cơ chế bệnh sinh Viêm Ruột Mạn Tính (IBD - Crohn & Viêm Loét Đại Tràng): Phân tích rối loạn vi sinh vật dysbiosis, suy giảm SCFA butyrate, Calprotectin phân, tổn thương xuyên thành, biến chứng ngoài ruột và hướng dẫn bổ sung sắt ESPEN.",
    "clinicalPearls": [
      "Acceleration in Incidence (Gia tốc Tỷ lệ mắc mới): Tỷ lệ mắc mới vọt tăng tại các nước công nghiệp hóa mới (2000 - 2020).",
      "Compounding Prevalence (Tỷ lệ hiện mắc tích lũy): Tỷ lệ mắc mới ổn định nhưng tỷ lệ hiện mắc liên tục cộng dồn tại các nước phương Tây.",
      "Prevalence Equilibrium (Cân bằng Tỷ lệ hiện mắc): Dự phóng sau năm 2050 khi tỷ lệ tử vong cân bằng với tỷ lệ mắc mới.",
      "Độ tuổi chẩn đoán (A): A1 (&le; 16 tuổi), A2 (17–40 tuổi), A3 (&gt; 40 tuổi)."
    ],
    "tags": [
      "Tiêu Hóa",
      "IBD",
      "Sinh lý bệnh",
      "Cơ chế bệnh sinh"
    ]
  },
  {
    "id": "ccbs-29",
    "slug": "slb-ccbs-ibs",
    "code": "CCBS-29",
    "title": "IBS (Hội chứng ruột kích thích)",
    "system": "general",
    "systemName": "Tổng Quát",
    "order": 29,
    "overview": "Sinh lý bệnh và Cơ chế bệnh sinh Hội Chứng Ruột Kích Thích (IBS): Phân tích rối loạn tương tác ruột - não (DGBI), tăng nhạy cảm nội tạng, IBS sau nhiễm trùng (PI-IBS), vai trò chế độ ăn Low-FODMAP, kém hấp thu axit mật BAM và rối loạn sàn chậu.",
    "clinicalPearls": [
      "Cơ chế: Tình trạng viêm cấp tính làm tổn thương liên kết chặt (Tight junctions) của biểu mô, gây thâm nhiễm dai dẳng tế bào Mast và tế bào T lympho ở hổng tràng/hồi tràng, kéo dài hiện tượng nhạy cảm đau nội tạng dù vi khuẩn đã được thanh thải.",
      "Yếu tố nguy cơ: Giới tính nữ, thời gian viêm kéo dài, sử dụng kháng sinh phổ rộng và có tâm lý lo âu/trầm cảm tại thời điểm nhiễm trùng.",
      "Hội chứng Hậu COVID-19 (PCS): Nhiễm SARS-CoV-2 qua thụ thể ACE2 ở ruột gây rối loạn vi sinh vật và phát triển PI-IBS dai dẳng.",
      "1. Lacy BE, Pimentel M, Brenner DM, et al. ACG Clinical Guideline: Management of Irritable Bowel Syndrome. Am J Gastroenterol. 2021;116(1):17-44."
    ],
    "tags": [
      "Tổng Quát",
      "IBS",
      "Sinh lý bệnh",
      "Cơ chế bệnh sinh"
    ]
  },
  {
    "id": "ccbs-30",
    "slug": "slb-ccbs-kem-hap-thu",
    "code": "CCBS-30",
    "title": "Hội Chứng Kém Hấp Thu",
    "system": "general",
    "systemName": "Tổng Quát",
    "order": 30,
    "overview": "Sinh lý bệnh & Cơ chế bệnh sinh Hội chứng Kém Hấp Thu (Malabsorption Syndrome): Phân loại 3 pha (Lòng ruột - Niêm mạc - Sau niêm mạc), cơ chế tiêu phân mỡ (Steatorrhea), mất đạm qua ruột (PLE), bệnh Celiac, SIBO, Abetalipoproteinemia và bệnh bao thể vi nhung mao (MVID).",
    "clinicalPearls": [
      "3. Cơ Chế Theo Nhóm Dưỡng Chất",
      "4. Bệnh Sinh Phân Tử (Celiac, SIBO, MVID)",
      "6. Phân Loại Nguyên Nhân Theo Cơ Chế",
      "7. Tương Quan Triệu Chứng &amp; Cận Lâm Sàng"
    ],
    "tags": [
      "Tổng Quát",
      "Hội Chứng Kém Hấp Thu",
      "Sinh lý bệnh",
      "Cơ chế bệnh sinh"
    ]
  },
  {
    "id": "ccbs-31",
    "slug": "slb-ccbs-lao",
    "code": "CCBS-31",
    "title": "Bệnh Lao",
    "system": "general",
    "systemName": "Tổng Quát",
    "order": 31,
    "overview": "Sinh lý bệnh và Cơ chế bệnh sinh Bệnh Lao (Tuberculosis): Phân tích chi tiết vi sinh AFB, u hạt Granuloma, phức hợp Ghon/Ranke, lan truyền nội phế quản/đường máu, lao ngoài phổi, đột biến gen rpoB và ảnh hưởng đồng nhiễm HIV.",
    "clinicalPearls": [
      "Trạng thái miễn dịch người phơi nhiễm: Cơ địa suy dinh dưỡng, đái tháo đường, nhiễm HIV hay dùng thuốc ức chế miễn dịch làm giảm đáng kể liều nhiễm tối thiểu cần thiết để gây bệnh.",
      "Ổ Ghon (Ghon Focus):** Ổ viêm dưới màng phổi (thường ở phần dưới thùy trên hoặc phần trên thùy dưới phế trường), nơi đại thực bào phế nang nuốt vi khuẩn nhưng không tiêu diệt được hoàn toàn.",
      "Phức hợp Ghon (Ghon Complex): Sự kết hợp giữa Ổ Ghon tại nhu mô phổi và tình trạng viêm nổi hạch bạch huyết cùng bên (phù nề rốn phổi/trung thất).",
      "Phức hợp Ranke (Ranke Complex): Khi phản ứng miễn dịch khống chế được vi khuẩn, phức hợp Ghon bị xơ hóa và lắng đọng canxi tạo thành nốt vôi hóa đặc trên X-quang."
    ],
    "tags": [
      "Tổng Quát",
      "Bệnh Lao",
      "Sinh lý bệnh",
      "Cơ chế bệnh sinh"
    ]
  },
  {
    "id": "ccbs-32",
    "slug": "slb-ccbs-masld",
    "code": "CCBS-32",
    "title": "Bệnh Gan Nhiễm Mỡ Chuyển Hóa (MASLD / MASH)",
    "system": "general",
    "systemName": "Tổng Quát",
    "order": 32,
    "overview": "Sinh lý bệnh và Cơ chế bệnh sinh Bệnh Gan Nhiễm Mỡ Chuyển Hóa (MASLD / MASH / MAFLD / NAFLD): Phân tích toàn diện sự mất cân bằng thu nhận - đào thải lipid, cơ chế kháng insulin đa cơ quan, độc tính lipid (Lipotoxicity), stress mạng lưới nội chất (ER Stress), trục ruột - gan, đa hình di truyền PNPLA3/TM6SF2, kiểu hình thể gầy (Lean MASLD), phổ mô bệnh học và đích tác động phân tử của các liệu pháp điều trị mới (SGLT2i, GLP-1RA, GIP/GLP-1, Resmetirom THR-beta).",
    "clinicalPearls": [
      "🧬Sinh lý &amp; Sinh lý bệnh",
      "BMI &ge; 25 kg/m2 (&ge; 23 ở người châu Á) hoặc vòng eo &ge; 94 cm (nam), &ge; 80 cm (nữ).",
      "Đường huyết đói &ge; 100 mg/dL hoặc HbA1c &ge; 5.7% hoặc ĐTĐ típ 2 đang điều trị.",
      "Huyết áp &ge; 130/85 mmHg hoặc đang dùng thuốc hạ áp."
    ],
    "tags": [
      "Tổng Quát",
      "Bệnh Gan Nhiễm Mỡ Chuyển Hóa",
      "Sinh lý bệnh",
      "Cơ chế bệnh sinh"
    ]
  },
  {
    "id": "ccbs-33",
    "slug": "slb-ccbs-pud",
    "code": "CCBS-33",
    "title": "Loét Dạ dày - Tá tràng",
    "system": "general",
    "systemName": "Tổng Quát",
    "order": 33,
    "overview": "Sinh lý bệnh và Cơ chế bệnh sinh Loét Dạ dày - Tá tràng (Peptic Ulcer Disease - PUD): Phân tích toàn diện sự mất cân bằng giữa yếu tố bảo vệ và tấn công, cơ chế nhiễm khuẩn Helicobacter pylori, độc tính NSAID, hội chứng Zollinger-Ellison (ZES), biến chứng xuất huyết tiêu hóa (phân loại Forrest, cơ chế ly giải fibrin do acid/pepsin, thang điểm GBS) và biến chứng thủng ổ loét (viêm phúc mạc hóa học, nhiễm trùng đa khuẩn, sốc nhiễm trùng).",
    "clinicalPearls": [
      "Hàng rào chất nhầy - Bicarbonate (Mucus-HCO3- barrier): Lớp gel nhầy ưa nước liên kết chặt với ion HCO3- tạo ra một gradient pH trung tính (pH ~7.0) ngay sát bề mặt tế bào biểu mô, bất chấp pH trong lòng dạ dày có thể rơi xuống mức 1.0 - 2.0.",
      "Dòng máu tưới niêm mạc (Mucosal Blood Flow): Đảm bảo cung cấp oxy, glucose, đồng thời cuốn trôi và trung hòa nhanh chóng lượng ion H+ thẩm thấu ngược vào lớp đệm.",
      "Prostaglandin E2 (PGE2) & PGI2: Chất điều hòa thể dịch chỉ huy tối cao, kích thích tế bào biểu mô tiết chất nhầy, tiết HCO3-, duy trì tưới máu vi mạch và ức chế trực tiếp bài tiết acid từ tế bào thành.",
      "Acid Clohydric (HCl): Được bài tiết bởi tế bào thành (parietal cells) qua bơm proton H+/K+-ATPase, đóng vai trò hoạt hóa pepsinogen và phân giải liên kết ngoại bào."
    ],
    "tags": [
      "Tổng Quát",
      "Loét Dạ dày - Tá tràng",
      "Sinh lý bệnh",
      "Cơ chế bệnh sinh"
    ]
  },
  {
    "id": "ccbs-34",
    "slug": "slb-ccbs-rl-canxi",
    "code": "CCBS-34",
    "title": "Rối loạn Canxi máu",
    "system": "general",
    "systemName": "Tổng Quát",
    "order": 34,
    "overview": "Sinh lý bệnh & Cơ chế bệnh sinh Rối loạn Canxi máu (Hypercalcemia & Hypocalcemia Pathophysiology): Phân tích canxi ion hóa vs gắn albumin, hiệu ứng pH, trục CaSR - PTH - Calcitriol, cơ chế tăng canxi (phụ thuộc/không phụ thuộc PTH, PTHrP, u hạt), hạ canxi (suy cận giáp sau mổ, saponification, truyền máu citrate), biến đổi QT trên ECG và phác đồ cấp cứu.",
    "clinicalPearls": [
      "Vai trò của Magne (Mg2+): Magne là cofactor bắt buộc cho sự tiết PTH và hoạt động của thụ thể PTH tại cơ quan đích. Hạ Magne máu nặng gây ức chế tiết PTH và đề kháng PTH &rarr; gây Hạ Canxi máu kháng trị nếu không bù Magne trước.",
      "Bù thể tích lớn NaCl 0.9% (4 &ndash; 6 L/24h): Khôi phục thể tích nước mất do đái tháo nhạt, Natri cạnh tranh tái hấp thu với Canxi tại ống thận giúp tăng đào thải Canxi qua nước tiểu.",
      "Ức chế hủy cốt bào: Bisphosphonates IV (Zoledronic acid 4 mg / Pamidronate 60-90 mg - tác dụng tối đa sau 2-4 ngày); Calcitonin (4-8 UI/kg IM mỗi 12h - tác dụng nhanh sau vài giờ nhưng bị lờn thuốc sau 48h).",
      "Ức chế 1-alpha-hydroxylase: Prednisolone 40 mg/ngày trong tăng canxi do u hạt, lymphoma hoặc ngộ độc vitamin D."
    ],
    "tags": [
      "Tổng Quát",
      "Rối loạn Canxi máu",
      "Sinh lý bệnh",
      "Cơ chế bệnh sinh"
    ]
  },
  {
    "id": "ccbs-35",
    "slug": "slb-ccbs-rl-kali",
    "code": "CCBS-35",
    "title": "Rối loạn Kali máu",
    "system": "general",
    "systemName": "Tổng Quát",
    "order": 35,
    "overview": "Sinh lý bệnh & Cơ chế bệnh sinh Rối loạn Kali máu (Hypokalemia & Hyperkalemia Pathophysiology): Phân tích chuyên sâu phân bố dịch, vai trò Magne, cân bằng nội - ngoại bào, cơ chế hạ/tăng kali máu, độc tính tim mạch & thần kinh - cơ, biến đổi điện tâm đồ ECG và 3 trục trị liệu cấp cứu.",
    "clinicalPearls": [
      "Nồng độ nội bào duy trì rất cao: 140 &ndash; 150 mEq/L.",
      "Tạo nên bể dự trữ kali khổng lồ, đóng vai trò là hệ đệm dung lượng cao để ổn định nồng độ ngoại bào.",
      "Chỉ chứa khoảng 2% tổng lượng kali cơ thể.",
      "Nồng độ huyết thanh bình thường duy trì trong khoảng hẹp: 3.5 &ndash; 5.0 mEq/L (hoặc đến 5.2 mEq/L tùy phòng xét nghiệm)."
    ],
    "tags": [
      "Tổng Quát",
      "Rối loạn Kali máu",
      "Sinh lý bệnh",
      "Cơ chế bệnh sinh"
    ]
  },
  {
    "id": "ccbs-36",
    "slug": "slb-ccbs-rl-magie",
    "code": "CCBS-36",
    "title": "Rối loạn Magie máu",
    "system": "general",
    "systemName": "Tổng Quát",
    "order": 36,
    "overview": "Sinh lý bệnh & Cơ chế bệnh sinh Rối loạn Magie máu (Hypomagnesemia & Hypermagnesemia Pathophysiology): Phân tích phân bố khoang dịch, tái hấp thu tại quai Henle qua Claudin-16/19, kênh TRPM6/7, cơ chế hạ Magie máu gây hạ Kali và Canxi kháng trị (nút chặn ROMK, ức chế PTH), biến đổi điện tâm đồ ECG (QT kéo dài, Xoắn đỉnh Torsades de Pointes), độc tính tăng Magie máu theo nồng độ và đối kháng cấp cứu bằng Canxi tĩnh mạch.",
    "clinicalPearls": [
      "Duy trì hoạt tính của bơm Na+-K+-ATPase: Magie là cofactor bắt buộc để thủy phân ATP cho bơm Na+-K+-ATPase. Thiếu hụt Magie nội bào làm tê liệt bơm, làm giảm nồng độ Kali nội bào và tăng Natri nội bào, phá vỡ điện thế nghỉ màng tế bào.",
      "Tiêu chảy bài tiết kéo dài: Dịch tiêu hóa bình thường chứa ~6 mEq/L Mg, khi tiêu chảy cấp/mạn lượng mất tăng vọt lên 10 &ndash; 15 mEq/L.",
      "Viêm tụy cấp (Acute Pancreatitis): Enzym lipase giải phóng acid béo tự do tạo phức hợp xà phòng hóa Ca-Mg (Saponification) không tan lắng đọng tại mỡ quanh tụy và khoang phúc mạc.",
      "Thuốc ức chế bơm Proton (PPI kéo dài &gt; 1 năm): Omeprazole, Esomeprazole làm kiềm hóa môi trường lòng ruột, bất hoạt kênh vận chuyển chủ động TRPM6/7 tại hồi tràng &amp; đại tràng."
    ],
    "tags": [
      "Tổng Quát",
      "Rối loạn Magie máu",
      "Sinh lý bệnh",
      "Cơ chế bệnh sinh"
    ]
  },
  {
    "id": "ccbs-37",
    "slug": "slb-ccbs-rl-natri",
    "code": "CCBS-37",
    "title": "Rối loạn Natri máu",
    "system": "general",
    "systemName": "Tổng Quát",
    "order": 37,
    "overview": "Sinh lý bệnh & Cơ chế bệnh sinh Rối loạn Natri máu (Hyponatremia & Hypernatremia Pathophysiology): Phân tích áp lực thẩm thấu & trương lực, cơ chế AVP/Aquaporin-2, động học thích nghi tế bào não, hội chứng hủy myelin do thẩm thấu (ODS), phân nhóm theo thể tích ECF (Hypovolemic, Euvolemic, Hypervolemic), SIADH vs CSW, Đái tháo nhạt AVP-D/AVP-R và nguyên tắc bù an toàn.",
    "clinicalPearls": [
      "Ngưỡng kích thích thẩm thấu (Osmotic Threshold): Tiết AVP bắt đầu ở mức &sim;285 mOsm/kg. Khi Posm vượt qua mức này, nồng độ AVP tăng tuyến tính; ngưỡng kích thích cảm giác khát thường cao hơn một chút (~290 mOsm/kg).",
      "AVP gắn vào thụ thể V2 Receptor (V2R) ở màng đáy-bên tế bào biểu mô ống góp.",
      "Kích hoạt protein Gs &rarr; Tăng nồng độ cAMP nội bào &rarr; Hoạt hóa Protein Kinase A (PKA).",
      "PKA phosphoryl hóa các túi nội bào chứa kênh nước Aquaporin-2 (AQP2), thúc đẩy sự hòa màng lên màng đỉnh (apical membrane)."
    ],
    "tags": [
      "Tổng Quát",
      "Rối loạn Natri máu",
      "Sinh lý bệnh",
      "Cơ chế bệnh sinh"
    ]
  },
  {
    "id": "ccbs-38",
    "slug": "slb-ccbs-rl-phosphat",
    "code": "CCBS-38",
    "title": "Rối loạn Phosphat máu",
    "system": "general",
    "systemName": "Tổng Quát",
    "order": 38,
    "overview": "Sinh lý bệnh & Cơ chế bệnh sinh Rối loạn Phosphat máu (Hypophosphatemia & Hyperphosphatemia Pathophysiology): Phân tích phân bố dịch, trục PTH - FGF-23 - Calcitriol (kênh NaPi), hội chứng nuôi ăn lại Refeeding, kiềm hô hấp kích hoạt PFK, thiếu ATP cơ hoành thất bại cai máy thở, giảm 2,3-DPG thiếu oxy mô, tăng phosphat CKD-MBD (tích số Ca x P >= 55) và vôi hóa áo giữa mạch máu.",
    "clinicalPearls": [
      "Phá hủy tế bào ồ ạt: Hội chứng ly giải u (Tumor Lysis Syndrome - TLS) sau hóa trị, Tiêu cơ vân cấp giải phóng lượng phosphat nội bào khổng lồ vào máu.",
      "Suy cận giáp (Hypoparathyroidism): Thiếu PTH làm mất tác dụng ức chế kênh NaPi-IIa &rarr; tăng tái hấp thu phosphat tại ống lượn gần.",
      "Thực phẩm giàu phụ gia phosphat: Các hợp chất phosphat vô cơ trong thức ăn nhanh có độ hấp thu tại ruột gần 100%.",
      "[1] da Silva JSV, Seres DS, Sabino K, et al. ASPEN Consensus Recommendations for Refeeding Syndrome. Nutr Clin Pract. 2020;35(2):178-195. doi:10.1002/ncp.10475."
    ],
    "tags": [
      "Tổng Quát",
      "Rối loạn Phosphat máu",
      "Sinh lý bệnh",
      "Cơ chế bệnh sinh"
    ]
  },
  {
    "id": "ccbs-39",
    "slug": "slb-ccbs-rung-nhi",
    "code": "CCBS-39",
    "title": "Rung Nhĩ (AF)",
    "system": "cardiovascular",
    "systemName": "Tim Mạch & Tuần Hoàn",
    "order": 39,
    "overview": "Sinh lý bệnh & Cơ chế bệnh sinh Rung Nhĩ (Atrial Fibrillation Pathophysiology): Ổ khởi kích tĩnh mạch phổi (Haïssaguerre), rối loạn Canxi nội bào (RyR2/NCX/DADs), bước sóng dẫn truyền lambda, tái cấu trúc cấu trúc và xơ hóa cơ tim nhĩ, mô mỡ thượng tâm mạc (EAT), rung nhĩ sau phẫu thuật (POAF) và vòng xoáy AF begets AF.",
    "clinicalPearls": [
      "Đa số (> 90%) các cơn rung nhĩ kịch phát được khởi kích bởi các ổ ngoại vị từ bao cơ tĩnh mạch phổi (Haïssaguerre 1998).",
      "Rối loạn chu kỳ Canxi qua thụ thể RyR2 bị hyperphosphoryl hóa bởi CaMKII gây rò rỉ Ca2+ tâm trương, kích hoạt bơm NCX tạo dòng điện hướng trong sinh điện và DADs.",
      "Tái cấu trúc điện học diễn ra nhanh chóng trong vài ngày đầu (giảm ICa,L, tăng IK1) làm rút ngắn ERP và bước sóng dẫn truyền (λ = ERP × CV), tạo điều kiện cho rung nhĩ tự duy trì (AF begets AF).",
      "Mở màng ngoài tim sau bên trái (PLP) giúp dẫn lưu máu đọng và dịch viêm vô trùng, giảm tỷ lệ rung nhĩ sau phẫu thuật tim mở (POAF) ngoạn mục từ 32% xuống 17% (Thử nghiệm ngẫu nhiên PALACS)."
    ],
    "tags": [
      "Tim Mạch",
      "Rung Nhĩ",
      "Sinh lý bệnh",
      "Cơ chế bệnh sinh",
      "POAF"
    ]
  },
  {
    "id": "ccbs-40",
    "slug": "slb-ccbs-sepsis",
    "code": "CCBS-40",
    "title": "Sepsis &amp; Shock Sepsis",
    "system": "general",
    "systemName": "Tổng Quát",
    "order": 40,
    "overview": "Sinh lý bệnh và Cơ chế bệnh sinh Sepsis và Shock Sepsis (Septic Shock): Phân tích chi tiết mô hình Sepsis-3, rối loạn ty thể PDH, tổn thương vi tuần hoàn NO/S1P, immunoparalysis, TAMOF và dược động học PK.",
    "clinicalPearls": [
      "Rối loạn chức năng cơ quan (Organ Dysfunction): Được xác định bằng sự gia tăng điểm số SOFA (Sequential Organ Failure Assessment) &ge; 2 điểm so với mức cơ bản do hậu quả của nhiễm khuẩn.",
      "Rối loạn cơ quan bị che lấp (Occult Organ Dysfunction): Rối loạn chức năng cơ quan có thể diễn ra âm thầm, không triệu chứng rầm rộ; do đó cần chủ động tầm soát ở mọi bệnh nhân bị nhiễm khuẩn.",
      "Hệ Tim mạch (Sepsis-Induced Myocardial Dysfunction): Gặp ở ~40% bệnh nhân Sepsis. Sự kết hợp của Cytokine (TNF-&alpha;, IL-1&beta;), NO và rối loạn canxi nội bào làm giảm co bóp cơ tim thất trái/thất phải, giảm đáp ứng với catecholamine.",
      "Hệ Thần kinh (Septic Encephalopathy): Căng thẳng oxy hóa phá vỡ hàng rào máu não (BBB), rò rỉ chất độc nội sinh và cytokine vào mô não gây Bệnh não do Sepsis với các biểu hiện mê sảng, lú lẫn, rối loạn nhận thức."
    ],
    "tags": [
      "Tổng Quát",
      "Sepsis &amp; Shock Sepsis",
      "Sinh lý bệnh",
      "Cơ chế bệnh sinh"
    ]
  },
  {
    "id": "ccbs-41",
    "slug": "slb-ccbs-sibo",
    "code": "CCBS-41",
    "title": "SIBO &amp; IMO",
    "system": "general",
    "systemName": "Tổng Quát",
    "order": 41,
    "overview": "Sinh lý bệnh và Cơ chế bệnh sinh Tăng Sinh Vi Khuẩn Ruột Non (SIBO &amp; IMO Pathophysiology): Phân tích toàn diện sự phân bố vi sinh vật đường ruột, suy giảm phức hợp MMC, 3 con đường kém hấp thu (tổn thương niêm mạc, cạnh tranh B12 vs tăng Folate, giải liên hợp axit mật gây tiêu chảy phân nước &amp; tiêu chảy mỡ), phân loại thể khí thở (H-SIBO, IMO qua Archaea Methanobrevibacter smithii, H2S-SIBO), vai trò màng sinh học Biofilm, liên kết IBS và trục Ruột - Gan thúc đẩy MASLD/MASH.",
    "clinicalPearls": [
      "Lên men tạo khí: Carbohydrate ứ đọng bị vi khuẩn lên men tạo ra lượng lớn khí gas: Hydro (H2), Metan (CH4), Hydro Sulfua (H2S) &rarr; Đầy hơi chướng bụng dữ dội, đau bụng quanh rốn.",
      "Tăng tính thấm ruột (Leaky Gut): Độc tố LPS phá hủy liên kết chặt ZO-1 &rarr; Rò rỉ vi khuẩn và cytokine tiền viêm vào máu cửa.",
      "Cạn kiệt Vitamin B12: Vi khuẩn kỵ khí (Bacteroides) tiêu thụ trực tiếp phức hợp B12-yếu tố nội tại trong lòng ruột &rarr; Thiếu hụt Vitamin B12, gây thiếu máu hồng cầu to và tổn thương thần kinh ngoại biên.",
      "Giảm Thiamine &amp; Nicotinamide: Do vi khuẩn tranh chấp hấp thu."
    ],
    "tags": [
      "Tổng Quát",
      "SIBO &amp; IMO",
      "Sinh lý bệnh",
      "Cơ chế bệnh sinh"
    ]
  },
  {
    "id": "ccbs-42",
    "slug": "slb-ccbs-soc",
    "code": "CCBS-42",
    "title": "Sốc",
    "system": "general",
    "systemName": "Tổng Quát",
    "order": 42,
    "overview": "Sinh lý bệnh & Cơ chế bệnh sinh Sốc (Shock Pathophysiology): Phân tích sinh lý cung cấp oxy DO₂, biến đổi huyết động 4 loại sốc, cơ chế vi tuần hoàn, bão cytokine nhiễm khuẩn, tổn thương glycocalyx, vòng luẩn quẩn sốc tim, tương tác tim-phổi, TAMOF và các cơ chế chuyên sâu đặc thù.",
    "clinicalPearls": [
      "Vi tuần hoàn: thoái hóa glycocalyx, vi huyết khối, hiện tượng shunt tiểu động mạch &rarr; tiểu tĩnh mạch",
      "Cytopathic hypoxia: rối loạn phosphoryl hóa oxy hóa ty thể &mdash; thiếu oxy tế bào dù oxy mô có sẵn",
      "Chèn ép tim cấp (Cardiac Tamponade)",
      "Thuyên tắc phổi lớn (massive PE)"
    ],
    "tags": [
      "Tổng Quát",
      "Sốc",
      "Sinh lý bệnh",
      "Cơ chế bệnh sinh"
    ]
  },
  {
    "id": "ccbs-43",
    "slug": "slb-ccbs-sot-ret",
    "code": "CCBS-43",
    "title": "Bệnh Sốt rét",
    "system": "general",
    "systemName": "Tổng Quát",
    "order": 43,
    "overview": "Sinh lý bệnh và Cơ chế bệnh sinh Bệnh Sốt rét (Malaria Pathophysiology): Phân tích chu kỳ sinh học 5 loài Plasmodium (falciparum, vivax, ovale, malariae, knowlesi), thể ngủ hypnozoite, hiện tượng kết dính tế bào cyto-adherence và ẩn trú sequestration qua PfEMP1, biến chứng sốt rét thể não, toan chuyển hóa, thiếu máu nặng, sốt rét nhau thai và bảng hướng dẫn xử trí cấp cứu tức thời WHO 2025.",
    "clinicalPearls": [
      "Giai đoạn Thể giao bào (Gametocyte Stage): Một số merozoite biệt hóa thành giao bào đực và giao bào cái lưu hành trong máu người, sẵn sàng lây sang muỗi khi muỗi hút máu để thực hiện chu kỳ sinh sản hữu tính.",
      "Hạ đường huyết (Hypoglycaemia): Đường huyết &lt; 2.2 mmol/L (&lt; 40 mg/dL). Nguyên nhân do ký sinh trùng tiêu thụ lượng lớn glucose, giảm tân tạo đường tại gan và do thuốc Quinine kích thích tế bào beta tụy tăng tiết Insulin.",
      "Tổn thương Thận cấp (AKI): Do hoại tử ống thận cấp (ATN) vì tắc nghẽn vi mạch thận, lắng đọng Hb (đái huyết cầu tố) và phù nề mô kẽ (Creatinine &gt; 3 mg/dL).",
      "Phù phổi cấp (Acute Pulmonary Oedema): Tăng tính thấm mao mạch phổi qua trung gian cytokine và quá tải dịch truyền."
    ],
    "tags": [
      "Tổng Quát",
      "Bệnh Sốt rét",
      "Sinh lý bệnh",
      "Cơ chế bệnh sinh"
    ]
  },
  {
    "id": "ccbs-44",
    "slug": "slb-ccbs-st",
    "code": "CCBS-44",
    "title": "Suy tim (Heart Failure)",
    "system": "cardiovascular",
    "systemName": "Tim Mạch & Tuần Hoàn",
    "order": 44,
    "overview": "Sinh lý bệnh và Cơ chế bệnh sinh Suy tim (Heart Failure Pathophysiology & Pathogenesis): Phân tích chi tiết định nghĩa huyết động Universal Definition 2026; suy chức năng co bóp tâm thu và tái cấu trúc lệch tâm trong HFrEF; hội chứng viêm hệ thống mạn tính, suy giảm NO-cGMP-PKG, xơ cứng protein Titin và mô mỡ thượng tâm mạc EAT trong HFpEF; trục thần kinh - thể dịch (SNS, RAAS) và peptide bài niệu (BNP, NT-proBNP); rối loạn chức năng ty thể, đói năng lượng cơ tim và hệ thống tự thực autophagy; sinh lý bệnh sung huyết cấp (quá tải thể tích vs tái phân bố dịch tối cấp); lưu đồ tiếp cận chẩn đoán và kiểm soát sung huyết theo eGFR (ESC 2026) cùng cơ sở phân tử của Tứ trụ điều trị (ARNI, BB, MRA, SGLT2i, GLP-1RA).",
    "clinicalPearls": [
      "Universal Definition of Heart Failure 2026 định nghĩa suy tim là hội chứng lâm sàng do bất thường cấu trúc/chức năng tim dẫn đến tăng áp lực đổ đầy buồng tim và/hoặc giảm cung lượng tim lúc nghỉ hoặc khi gắng sức.",
      "Trong HFpEF, viêm hệ thống mạn tính mức độ thấp làm suy giảm sinh khả dụng Nitric Oxide (NO) tại vi mạch vành, giảm hoạt tính trục sGC-cGMP-PKG làm giảm phosphorylation protein titin, khiến cơ tim bị xơ cứng và suy giảm đổ đầy tâm trương.",
      "Sung huyết trong suy tim cấp có 2 cơ chế đối lập: Quá tải thể tích thực sự (tích tụ muối nước chậm, cần lợi tiểu quai liều cao) và Tái phân bố dịch tối cấp (co thắt tĩnh mạch tạng đẩy máu về phổi gây phù phổi cấp nhưng không phù ngoại biên, cần thuốc giãn mạch Nitroglycerin làm chủ chốt).",
      "Thuốc ức chế SGLT2 (Dapagliflozin, Empagliflozin) bảo vệ tim thông qua phục hồi con đường AMPK-mTOR dọn dẹp autophagy, cung cấp thể ceton cho ty thể cơ tim, và rút dịch chọn lọc từ khoang kẽ mà không làm giảm thể tích nội mạch."
    ],
    "tags": [
      "Tim Mạch",
      "Suy tim",
      "Heart Failure",
      "HFrEF",
      "HFpEF",
      "Tứ Trụ Suy Tim",
      "ESC 2026",
      "Universal Definition 2026",
      "Sinh lý bệnh",
      "Cơ chế bệnh sinh"
    ]
  },
  {
    "id": "ccbs-45",
    "slug": "slb-ccbs-suy-ho-hap",
    "code": "CCBS-45",
    "title": "Suy hô hấp cấp",
    "system": "respiratory",
    "systemName": "Hô Hấp & Thăng Bằng Khí Máu",
    "order": 45,
    "overview": "Sinh lý bệnh và Cơ chế bệnh sinh Suy hô hấp cấp (Acute Respiratory Failure Pathophysiology): Phân loại hạ oxy máu Type 1 vs tăng CO2 máu Type 2, bất xứng V/Q, Shunt, A-a gradient, cơ chế hypoxia mô, ARDS tế bào, tương tác Brain-Lung, VILI, P-SILI, COPD bẫy khí và Tâm phế mạn.",
    "clinicalPearls": [
      "2. Guyton and Hall Textbook of Medical Physiology (14th ed.) – Unit VII: Respiration & Pathophysiology of Respiratory Insufficiency.",
      "3. NIHMS Guidelines (2024) – Mechanisms of Hypoxemia and Hypercapnia in Intensive Care.",
      "4. GOLD Report 2025 – Global Strategy for Diagnosis, Management, and Prevention of COPD.",
      "5. TiepCanSuyHoHapCap.pdf & TS.BS. Lê Đức Nhân / Bùi Thị Hạnh Duyên – Giáo trình Phác đồ Hồi sức Cấp cứu & ARDS Pathogenesis."
    ],
    "tags": [
      "Hô Hấp",
      "Suy hô hấp cấp",
      "Sinh lý bệnh",
      "Cơ chế bệnh sinh"
    ]
  },
  {
    "id": "ccbs-46",
    "slug": "slb-ccbs-sxhd",
    "code": "CCBS-46",
    "title": "Sốt xuất huyết Dengue",
    "system": "general",
    "systemName": "Tổng Quát",
    "order": 46,
    "overview": "Sinh lý bệnh và Cơ chế bệnh sinh của Sốt xuất huyết Dengue (SXHD): Quá trình nhân lên của virus, hiện tượng tăng cường qua trung gian kháng thể (ADE), cơn bão cytokine, rò rỉ huyết tương, bệnh lý đông máu và suy đa tạng.",
    "clinicalPearls": [
      "Phá hủy miễn dịch: Kháng thể kháng tiểu cầu loại IgM xuất hiện kết hợp với bổ thể bám lên tiểu cầu, hoạt hóa quá trình ly giải tế bào hoặc tăng cường bị thực bào tại lách và gan.",
      "Bắt giữ ngoại vi & bám dính: Hiện tượng bám dính tế bào (cytoadherence) khiến các tiểu cầu kết tụ với nhau và bám dính vào tế bào nội mạc mạch máu bị tổn thương, dẫn đến bắt giữ tiểu cầu ở mạng lưới mạch ngoại vi.",
      "Rối loạn chức năng: Tiểu cầu bị giảm chất lượng nghiêm trọng do khiếm khuyết trong giải phóng các hạt chứa ADP, làm suy giảm khả năng ngưng tập tiểu cầu tạo nút cầm máu.",
      "Rò rỉ Heparan Sulphate\r\n                                Khi lớp glycocalyx bị phá hủy, chất kháng đông tự nhiên Heparan sulphate giải phóng ồ ạt vào lòng mạch, gây kéo dài thời gian thromboplastin từng phần hoạt hóa (aPTT)."
    ],
    "tags": [
      "Tổng Quát",
      "Sốt xuất huyết Dengue",
      "Sinh lý bệnh",
      "Cơ chế bệnh sinh"
    ]
  },
  {
    "id": "ccbs-47",
    "slug": "slb-ccbs-tang-ap-cua",
    "code": "CCBS-47",
    "title": "Tăng Áp Lực Tĩnh Mạch Cửa",
    "system": "general",
    "systemName": "Tổng Quát",
    "order": 47,
    "overview": "Sinh lý bệnh & Cơ chế bệnh sinh Tăng Áp Lực Tĩnh Mạch Cửa (Portal Hypertension Pathophysiology): Huyết động học P = Q x R, phân loại giải phẫu 3 nhóm, cơ chế tăng sức cản (R) và tăng dòng chảy (Q), định luật Laplace trong vỡ giãn tĩnh mạch thực quản, hội chứng gan phổi (HPS), tăng áp cửa không do xơ gan (NCPH / PSVD) và dược lý NSBB theo Baveno VII & AASLD 2024.",
    "clinicalPearls": [
      "de Franchis R, Bosch J, Garcia-Tsao G, Reiberger T, Ripoll C, Baveno VII Faculty. Baveno VII &ndash; Renewing consensus in portal hypertension. J Hepatol. 2022;76(4):959-974. doi:10.1016/j.jhep.2021.12.022.",
      "European Association for the Study of the Liver. EASL Clinical Practice Guidelines for the management of patients with decompensated cirrhosis. J Hepatol. 2018;69(2):406-460. doi:10.1016/j.jhep.2018.03.024.",
      "Sarin SK, et al. Asia-Pacific Association for the Study of the Liver (APASL) consensus guidelines on non-cirrhotic portal fibrosis/idiopathic portal hypertension (NCPF/IPH). Hepatol Int. 2024;18:1684-1711. doi:10.1007/s12072-024-10739-6.",
      "Aithal GP, Palaniyappan N, China L, et al. Guidelines on the management of ascites in cirrhosis. Gut. 2021;70(1):9-29. doi:10.1136/gutjnl-2020-321790."
    ],
    "tags": [
      "Tổng Quát",
      "Tăng Áp Lực Tĩnh Mạch Cửa",
      "Sinh lý bệnh",
      "Cơ chế bệnh sinh"
    ]
  },
  {
    "id": "ccbs-48",
    "slug": "slb-ccbs-tha",
    "code": "CCBS-48",
    "title": "Tăng huyết áp",
    "system": "cardiovascular",
    "systemName": "Tim Mạch & Tuần Hoàn",
    "order": 48,
    "overview": "Sinh lý bệnh & Cơ chế bệnh sinh Tăng Huyết Áp (Hypertension Pathophysiology): Huyết động học BP = CO × SVR, tiến trình lão hóa xơ cứng động mạch, béo phì và trục SNS-RAAS mô mỡ, cơ chế bộ đệm Natri Glycocalyx và đáp ứng IPROS, hệ thống thận thu nhỏ tại da (Cutaneous mini-kidneys), viêm mạn tính và thể viêm NLRP3, tăng huyết áp thứ phát (PA, RVH mô hình Goldblatt, OSA), THA kháng trị & bằng chứng EBM Spironolactone (PATHWAY-2), đích phân tử mới (Aprocitentan, Baxdrostat) và tổn thương 4 cơ quan đích HMOD (Tim, Não, Thận, Mắt) theo chuẩn AHA/ACC 2025, ESC 2024 và ESH 2023.",
    "clinicalPearls": [
      "Bắt đầu từ trị số 115/75 mmHg, nguy cơ tử vong do đột quỵ não hoặc nhồi máu cơ tim tăng gấp đôi với mỗi mức tăng 20/10 mmHg của huyết áp.",
      "Béo phì chịu trách nhiệm cho 65% - 75% nguy cơ THA nguyên phát qua đề kháng insulin kích thích giao cảm, RAAS nội tại mô mỡ và chèn ép cơ học tủy thận bởi mỡ quanh thận.",
      "Lớp Glycocalyx tích điện âm trên hồng cầu và nội mạc hoạt động như bộ đệm Natri sinh học; ăn mặn kéo dài phá hủy Glycocalyx, khiến Na+ tự do thâm nhập gây xơ cứng thành mạch và đáp ứng tăng áp tức thì (IPROS).",
      "AHA/ACC 2025 nâng mức khuyến cáo lên Class 1 (LoE A) đối với mục tiêu SBP < 130 mmHg ở mọi người trưởng thành để bảo vệ vi mạch não và phòng ngừa tối ưu sa sút trí tuệ."
    ],
    "tags": [
      "Tim Mạch",
      "Tăng huyết áp",
      "Sinh lý bệnh",
      "Cơ chế bệnh sinh",
      "Cường Aldosterone",
      "HMOD",
      "AHA 2025"
    ]
  },
  {
    "id": "ccbs-49",
    "slug": "slb-ccbs-thuy-dau",
    "code": "CCBS-49",
    "title": "Thủy Đậu & Herpes Zoster (VZV)",
    "system": "general",
    "systemName": "Tổng Quát",
    "order": 49,
    "overview": "Sinh lý bệnh và Cơ chế bệnh sinh Thủy đậu & Zona (Varicella-Zoster Virus - VZV Pathophysiology & Pathogenesis): Phân tích toàn diện cấu trúc vi rút DNA kép, hướng tế bào T CLA+/CCR4+, hướng da và cơ chế phóng thích virus tự do qua M6PR, hợp bào đa nhân syncytia, vận chuyển ngược sợi trục, cơ chế biểu sinh thiết lập ẩn nấp (VLT, IE63), cơ chế tái hoạt Zona, đau thần kinh sau Zona (PHN) qua kênh Nav1.8, và chiến lược vắc-xin/dự phòng PEP.",
    "clinicalPearls": [
      "Vật chủ tự nhiên độc quyền: VZV chỉ gây bệnh trên người, hầu như không lây nhiễm hoặc bị giới hạn nghiêm ngặt trên động vật thí nghiệm.",
      "Đường lây truyền khí dung & tiếp xúc: Virus lây truyền cực mạnh qua khí dung (aerosols) từ dịch mụn nước (thủy đậu hoặc zona), giọt bắn hô hấp, hoặc tiếp xúc trực tiếp nốt ban.",
      "Thời gian lây truyền: Khả năng lây cao nhất từ 1 - 2 ngày trước phát ban cho đến khi tất cả nốt mụn nước đóng vảy hoàn toàn (thường 5 - 6 ngày sau phát ban ở người miễn dịch bình thường).",
      "Hòa màng tế bào - tế bào (Cell-cell fusion): Tại da, VZV kích hoạt sự hòa màng trực tiếp giữa các tế bào biểu sừng liền kề tạo thành các tế bào khổng lồ đa nhân (polykaryocytes hay syncytia) dưới sự điều hòa của phức hợp gB và gH/gL."
    ],
    "tags": [
      "Tổng Quát",
      "Thủy Đậu & Herpes Zoster",
      "Sinh lý bệnh",
      "Cơ chế bệnh sinh"
    ]
  },
  {
    "id": "ccbs-50",
    "slug": "slb-ccbs-tsg",
    "code": "CCBS-50",
    "title": "Tiền sản giật",
    "system": "general",
    "systemName": "Tổng Quát",
    "order": 50,
    "overview": "Sinh lý bệnh và Cơ chế bệnh sinh Tiền sản giật (Preeclampsia Pathophysiology): Thuyết bánh nhau hai giai đoạn (nguyên bào nuôi xâm lấn kém, co thắt động mạch xoắn, mất cân bằng sFlt-1/sEng và VEGF/PlGF), thuyết tim mạch mẹ, rối loạn chức năng nội mô, tổn thương thận (glomerular endotheliosis), hội chứng HELLP, sản giật và cơ chế tác dụng của Magnesium Sulfate (MgSO4).",
    "clinicalPearls": [
      "Tình trạng này dẫn đến giảm tưới máu nhau thai nghiêm trọng, gây thiếu oxy và thiếu máu cục bộ mạn tính tại bánh nhau.",
      "Sự xuất hiện của các tổn thương xơ vữa cấp tính (acute atherosis) với sự lắng đọng các tế bào bọt (foam cells) tích tụ mỡ ở thành mạch càng làm hẹp thêm lòng mạch cấp máu.",
      "sEng (soluble endoglin): Đồng thời tăng tiết làm cản trở tín hiệu của yếu tố tăng trưởng TGF-β1, qua đó trực tiếp gây co mạch và ức chế quá trình sản xuất Nitric Oxide (NO) gây giãn mạch.",
      "Rối loạn vận mạch: Nội mô bị tổn thương làm giảm sản xuất chất giãn mạch (NO, prostacyclin) và tăng sản xuất chất co mạch (endothelin-1, thromboxane A2)."
    ],
    "tags": [
      "Tổng Quát",
      "Tiền sản giật",
      "Sinh lý bệnh",
      "Cơ chế bệnh sinh"
    ]
  },
  {
    "id": "ccbs-51",
    "slug": "slb-ccbs-viem-gan-do-ruou",
    "code": "CCBS-51",
    "title": "Viêm Gan Do Rượu (AH)",
    "system": "digestive",
    "systemName": "Tiêu Hóa & Gan Mật",
    "order": 51,
    "overview": "Sinh lý bệnh và Cơ chế bệnh sinh Viêm Gan Do Rượu (Alcohol-Associated Hepatitis - AH / AAH): Phân tích toàn diện 3 con đường bệnh sinh cốt lõi (Độc tính trực tiếp Acetaldehyde/CYP2E1/ROS, Độc tính lipid Lipotoxicity, Tổn thương trục ruột - gan rò rỉ PAMPs/TLR4), thác miễn dịch tuyển mộ bạch cầu trung tính qua IL-8/ICAM-1, xơ hóa quanh tế bào dạng lưới thép (chicken-wire fibrosis), sinh lý bệnh suy thận cấp AKI/HRS, hội chứng suy giảm miễn dịch do xơ gan và nhiễm nấm Aspergillus xâm lấn.",
    "clinicalPearls": [
      "🧬Sinh lý &amp; Sinh lý bệnh",
      "1. Loạn khuẩn &amp; Tổn thương niêm mạc: Ethanol gây loạn khuẩn và phá hủy liên kết chặt niêm mạc ruột (Leaky Gut).",
      "2. Chuyển vị PAMPs: Các thành phần vi khuẩn (PAMPs / LPS) dịch chuyển qua tĩnh mạch cửa đổ dồn về gan.",
      "3. Kích hoạt TLR4 &amp; Tế bào Kupffer: Gắn kết phức hợp CD14/TLR4 trên tế bào Kupffer, kích hoạt con đường MyD88 &ndash; NF-&kappa;B."
    ],
    "tags": [
      "Tiêu Hóa",
      "Viêm Gan Do Rượu",
      "Sinh lý bệnh",
      "Cơ chế bệnh sinh"
    ]
  },
  {
    "id": "ccbs-52",
    "slug": "slb-ccbs-vp",
    "code": "CCBS-52",
    "title": "Viêm phổi",
    "system": "general",
    "systemName": "Tổng Quát",
    "order": 52,
    "overview": "Sinh lý bệnh và Cơ chế bệnh sinh Viêm phổi (Pneumonia Pathophysiology): Phân tích 4 con đường xâm nhập nhu mô phổi, cơ chế viêm màng phế nang mao mạch, các giai đoạn giải phẫu bệnh thùy phổi, phế quản phế viêm, độc tố vi khuẩn (exotoxin, PVL), viêm phổi hoại tử, huyết khối vi mạch, tổn thương phế nang lan tỏa (DAD) và viêm phổi tổ chức hóa (Organizing Pneumonia).",
    "clinicalPearls": [
      "Huy động bạch cầu: IL-8 đóng vai trò là chất hóa hướng động cực mạnh, thu hút ồ ạt bạch cầu đa nhân trung tính (neutrophils) từ lòng mao mạch phổi di chuyển xuyên vách phế nang vào lòng phế nang.",
      "Rung thanh tăng: Do tổ chức phổi đông đặc truyền rung động từ thanh quản ra thành ngực tốt hơn phổi chứa khí bình thường.",
      "Gõ đục: Do phế nang không còn chứa khí mà chứa dịch đặc.",
      "Rì rào phế nang giảm hoặc mất: Do luồng khí không thể đi vào phế nang đã bị lấp đầy."
    ],
    "tags": [
      "Tổng Quát",
      "Viêm phổi",
      "Sinh lý bệnh",
      "Cơ chế bệnh sinh"
    ]
  },
  {
    "id": "ccbs-53",
    "slug": "slb-ccbs-vtc",
    "code": "CCBS-53",
    "title": "Viêm tụy cấp",
    "system": "general",
    "systemName": "Tổng Quát",
    "order": 53,
    "overview": "Sinh lý bệnh và Cơ chế bệnh sinh Viêm tụy cấp (Acute Pancreatitis Pathophysiology): Quá trình tự tiêu hủy (autodigestion) do trypsin, phản ứng viêm tại chỗ, rối loạn vi tuần hoàn, cơ chế thất thoát dịch gây SIRS/sốc và suy đa cơ quan, các nguyên nhân đặc thù như tăng Triglyceride, sau ERCP, tăng canxi và đột biến gen di truyền.",
    "clinicalPearls": [
      "Rối loạn tín hiệu Canxi nội bào (tăng canxi nội bào kéo dài kích hoạt lysosome cathepsin B).",
      "Nhiễm toan nội bào và rối loạn chức năng ty thể tế bào nang tụy.",
      "Stress lưới nội chất và khiếm khuyết trong con đường vận chuyển men nội bào.",
      "Suy giảm quá trình tự thực (impaired autophagy) của tế bào."
    ],
    "tags": [
      "Tổng Quát",
      "Viêm tụy cấp",
      "Sinh lý bệnh",
      "Cơ chế bệnh sinh"
    ]
  },
  {
    "id": "ccbs-54",
    "slug": "slb-ccbs-vtpq",
    "code": "CCBS-54",
    "title": "Viêm tiểu phế quản cấp",
    "system": "general",
    "systemName": "Tổng Quát",
    "order": 54,
    "overview": "Sinh lý bệnh và Cơ chế bệnh sinh Viêm tiểu phế quản cấp ở trẻ em (Acute Bronchiolitis Pathophysiology): Phân tích đặc điểm tổn thương tế bào biểu mô hô hấp, phù nề niêm mạc, nút nhầy tắc nghẽn, hiện tượng ứ khí phế nang, xẹp phổi, rối loạn trao đổi khí V/Q mismatch, cấu trúc virus RSV và các dấu ấn sinh học độ nặng (IL-33, IL-13, Leukotrienes, SP-A).",
    "clinicalPearls": [
      "Phá hủy tế bào nhung mao (lông chuyển): Mất khả năng làm sạch nhầy - nhung mao (mucociliary clearance), khiến dịch tiết bẫy đọng lại tại chỗ.",
      "Tẩm nhuận tế bào viêm đơn nhân: Bạch cầu đơn nhân, lympho bào và bạch cầu trung tính tẩm nhuận xung quanh thành tiểu phế quản.",
      "Thể tích cuối kỳ thở ra gia tăng (FRC tăng): Do hiện tượng bẫy khí (air trapping) phế nang không thoát ra được trong thì thở ra.",
      "Giảm độ đàn hồi (Compliance) của phổi: Phổi bị căng phồng quá mức (hyperinflation) làm mô phổi hoạt động ở đoạn đường cong độ giãn nở không thuận lợi, làm phổi trở nên cứng hơn và giảm khả năng đàn hồi sinh lý."
    ],
    "tags": [
      "Tổng Quát",
      "Viêm tiểu phế quản cấp",
      "Sinh lý bệnh",
      "Cơ chế bệnh sinh"
    ]
  },
  {
    "id": "ccbs-55",
    "slug": "slb-ccbs-xg",
    "code": "CCBS-55",
    "title": "Xơ gan (Liver Cirrhosis)",
    "system": "digestive",
    "systemName": "Tiêu Hóa & Gan Mật",
    "order": 55,
    "overview": "Sinh lý bệnh và Cơ chế bệnh sinh Xơ gan (Liver Cirrhosis Pathophysiology): Tiến trình tự nhiên còn bù ➔ mất bù và phân giai đoạn cACLD theo AASLD 2024; cơ chế tế bào tạo xơ (Kupffer, chuyển biệt hóa tế bào hình sao HSCs thành nguyên bào sợi cơ, mao mạch hóa xoang gan); động lực học tăng áp cửa Ohm (ΔP = Q × R); cơ chế báng bụng (thuyết giãn mạch ngoại vi, hạ natri máu loãng vs giảm thể tích); hội chứng gan thận (HRS-AKI / HRS-NAKI theo ADQI-ICA 2024); chuyển vị vi khuẩn và hội chứng CAIDS / SBP; bệnh não gan (phù tế bào chiêm tinh và teo cơ sarcopenia); hội chứng gan phổi (HPS - Platypnea / Orthodeoxia), tăng áp phổi do cửa (PPHT), bệnh cơ tim do xơ gan (CCM) và cơ chế ung thư hóa HCC.",
    "clinicalPearls": [
      "Sự chuyển tiếp từ xơ gan còn bù sang mất bù xảy ra với tốc độ 5% - 7%/năm; thời gian sống trung vị giảm sút nghiêm trọng từ > 12 năm (còn bù) xuống chỉ còn 1.5 - 2 năm (mất bù).",
      "Tăng áp lực tĩnh mạch cửa được quyết định bởi định luật Ohm ΔP = Q × R: Sức cản nội gan (R) gồm 70% thành phần cấu trúc và 30% thành phần động (co thắt HSCs, giảm NO nội gan); lưu lượng dòng máu tạng (Q) tăng vọt do hiện tượng giãn mạch tạng qua trung gian NO ngoại vi tạo trạng thái tuần hoàn tăng động.",
      "Theo đồng thuận ADQI-ICA 2024, Hội chứng gan thận được phân loại thành HRS-AKI (suy thận chức năng cấp tính không đáp ứng sau 48h bù Albumin 1 g/kg/ngày và ngưng lợi tiểu) và HRS-NAKI; cơ chế bệnh sinh là sự phối hợp giữa co thắt mạch thận cực độ và bão Cytokine gây nhiễm độc ty thể tế bào ống thận.",
      "Hội chứng gan phổi (HPS) đặc trưng bởi sự giãn mao mạch phế nang bất thường (IPVD 100 - 500 µm) gây bất tương hợp V/Q và shunt chức năng nội phổi, biểu hiện lâm sàng bằng triệu chứng khó thở khi ngồi (Platypnea) và sụt giảm oxy máu khi đứng thẳng (Orthodeoxia)."
    ],
    "tags": [
      "Tiêu Hóa",
      "Xơ gan",
      "Liver Cirrhosis",
      "Tăng Áp Cửa",
      "HRS-AKI",
      "CAIDS",
      "HPS",
      "AASLD 2024",
      "Sinh lý bệnh",
      "Cơ chế bệnh sinh"
    ]
  },
  {
    "id": "ccbs-56",
    "slug": "slb-ccbs-xhth-duoi",
    "code": "CCBS-56",
    "title": "Xuất huyết tiêu hóa dưới",
    "system": "general",
    "systemName": "Tổng Quát",
    "order": 56,
    "overview": "Sinh lý bệnh và Cơ chế bệnh sinh Xuất huyết tiêu hóa dưới (Lower Gastrointestinal Bleeding - LGIB): Phân tích chi tiết 5 nhóm nguyên nhân bao gồm chảy máu túi thừa (động mạch ăn mòn vòm/cổ túi thừa gây tiêu máu tươi ồ ạt không đau bụng), dị sản mạch máu (Angioectasias), Dieulafoy đại tràng, bệnh trĩ, khối u đại trực tràng, biến chứng do thuốc chống ngưng tập tiểu cầu/chống đông; thuật toán phân tầng nguy cơ Oakland, kỹ thuật chụp CTA phát hiện thoát mạch cản quang (extravasation) và chỉ định nút mạch qua X-quang can thiệp (IR Embolization).",
    "clinicalPearls": [
      "2. Sengupta N, Feuerstein JD, Jairath V, et al. Management of Patients With Acute Lower Gastrointestinal Bleeding: An Updated ACG Guideline. Am J Gastroenterol. 2023;118(2):208-231.",
      "3. Khakoo NS. Management of Patients with Acute Lower Gastrointestinal Bleeding: An Updated ACG Guideline. The Emoroid Digest. 2023."
    ],
    "tags": [
      "Tổng Quát",
      "Xuất huyết tiêu hóa dưới",
      "Sinh lý bệnh",
      "Cơ chế bệnh sinh"
    ]
  },
  {
    "id": "ccbs-57",
    "slug": "slb-ccbs-xhth-tren",
    "code": "CCBS-57",
    "title": "Xuất huyết tiêu hóa trên",
    "system": "general",
    "systemName": "Tổng Quát",
    "order": 57,
    "overview": "Sinh lý bệnh và Cơ chế bệnh sinh Xuất huyết tiêu hóa trên (Upper Gastrointestinal Bleeding - UGIB): Phân tích chi tiết xuất huyết do vỡ giãn tĩnh mạch cửa (Variceal bleeding), vỡ giãn tĩnh mạch thực quản/dạ dày phình vị, thuốc vận mạch, thắt vòng EVL, tiêm keo Cyanoacrylate, TIPS; và xuất huyết không do vỡ giãn (Non-variceal bleeding - PUD), cơ chế acid/pepsin ly giải cục máu đông, tác động đệm của máu, phân loại Forrest và hộp công cụ cầm máu nội soi.",
    "clinicalPearls": [
      "Can thiệp nội soi (EVL / Tiêm keo Cyanoacrylate): Thắt cơ học búi giãn thực quản hoặc tạo huyết khối tắc mạch búi giãn dạ dày (phình vị).",
      "Đặt Shunt Cửa-Chủ qua tĩnh mạch cảnh (TIPS): Giải áp lực tĩnh mạch cửa trực tiếp ở trường hợp chảy máu dai dẳng (Salvage TIPS) hoặc có nguy cơ tái xuất huyết cao (Preemptive TIPS).",
      "Ở môi trường acid với pH &lt; 4.0, enzym pepsin bị kích hoạt mạnh, thúc đẩy quá trình tiêu sợi huyết (ly giải cục máu đông) và ức chế sự ngưng tập tiểu cầu.",
      "Pepsin chỉ bị vô hiệu hóa hoàn toàn và cục máu đông duy trì độ bền vững khi pH trong lòng dạ dày được nâng lên và duy trì liên tục ở mức pH &gt; 5.0 – 6.0."
    ],
    "tags": [
      "Tổng Quát",
      "Xuất huyết tiêu hóa trên",
      "Sinh lý bệnh",
      "Cơ chế bệnh sinh"
    ]
  },
  {
    "id": "ccbs-58",
    "slug": "slb-ccbs-benh-dai",
    "code": "CCBS-58",
    "title": "Bệnh Dại",
    "system": "neurology",
    "systemName": "Thần Kinh & Tâm Thần",
    "order": 58,
    "overview": "Sinh lý bệnh và Cơ chế bệnh sinh Bệnh dại (Rabies Pathophysiology): Phân tích cơ chế gắn thụ thể nAChR/NCAM/p75NTR, vận chuyển ngược dòng sợi trục thần kinh, nghịch lý rối loạn chức năng không hoại tử tế bào, thể vùi Negri, nhiễm độc kích thích Quinolinate và cơ sở sinh lý học của phác đồ dự phòng sau phơi nhiễm (PEP).",
    "clinicalPearls": [
      "Glycoprotein G của virus dại gắn kết đặc hiệu với thụ thể Nicotinic Acetylcholine (nAChR) tại bản vận động thần kinh - cơ và thụ thể NCAM (CD56) / p75NTR trên màng tế bào thần kinh.",
      "Vận chuyển ngược dòng sợi trục (Retrograde Axonal Transport): Virus di chuyển dọc theo hệ thống vi ống hướng tâm về thân neuron với tốc độ 50 - 100 mm/ngày để xâm nhập tủy sống và não bộ.",
      "Nghịch lý Bệnh học Thần kinh: Bệnh dại có tỷ lệ tử vong gần 100% nhưng tiêu bản mô học não cho thấy rất ít hoặc không có hoại tử cấu trúc tế bào; bản chất là rối loạn chức năng điện sinh học và nhiễm độc kích thích thụ thể NMDA do tích tụ Quinolinate và Oxit Nitric (NO).",
      "Cơ sở sinh lý của Dự phòng Sau Phơi nhiễm (PEP): Virus dại có màng lipid nhạy cảm với xà phòng/chất sát khuẩn (rửa vết thương làm giảm 80-90% tải lượng virus); tiêm huyết thanh kháng dại (RIG) và vắc-xin chỉ có hiệu quả trước khi virus lọt vào bên trong bao sợi trục thần kinh."
    ],
    "tags": [
      "Thần Kinh",
      "Bệnh Dại",
      "Sinh lý bệnh",
      "Cơ chế bệnh sinh",
      "PEP"
    ]
  },
  {
    "id": "ccbs-59",
    "slug": "slb-ccbs-ta",
    "code": "CCBS-59",
    "title": "Bệnh Tả",
    "system": "digestive",
    "systemName": "Tiêu Hóa & Gan Mật",
    "order": 59,
    "overview": "Sinh lý bệnh và Cơ chế bệnh sinh Bệnh tả (Cholera Pathophysiology): Phân tích độc tố tả Cholera Toxin (AB5), cơ chế ADP-ribosylation khóa Gs-alpha, tăng vọt cAMP hoạt hóa kênh CFTR, tiêu chảy xuất tiết phân 'nước vo gạo' và cơ sở sinh lý bù nước qua kênh SGLT-1 của dung dịch ORS theo WHO.",
    "clinicalPearls": [
      "Vibrio cholerae là vi khuẩn không xâm lấn (Non-invasive): Chỉ bám dính vào vi nhung mao ruột non qua Pili đồng điều hòa độc tố (TCP) mà không xâm lấn mô hay vào máu, giải thích vì sao bệnh nhân tả tiêu chảy ồ ạt nhưng KHÔNG SỐT.",
      "Cơ chế phân tử của Độc tố Tả (CT - Cấu trúc AB5): Tiểu đơn vị B gắn vào thụ thể Ganglioside GM1; tiểu đơn vị A xúc tác ADP-ribosylation khóa tiểu đơn vị Gs-alpha ở trạng thái hoạt động vĩnh viễn, kích hoạt men Adenylate Cyclase sản sinh bão cAMP nội bào.",
      "Tăng vọt cAMP nội bào kích thích mở tối đa kênh CFTR tại hốc tuyến ruột gây bài tiết ồ ạt ion Cl- và HCO3-, đồng thời ức chế hấp thu Na+ tại nhung mao, kéo theo lượng nước khổng lồ (lên đến 10 - 20 lít/ngày) tạo phân 'nước vo gạo' mùi tanh cá.",
      "Cơ sở sinh lý học kỳ diệu của Dung dịch ORS: Kênh đồng vận chuyển Natri - Glucose (SGLT-1) tại viền bàn chải ruột non hoàn toàn không bị ảnh hưởng bởi cAMP; cung cấp đồng thời Glucose và Natri giúp tái hấp thu nước và điện giải cứu sống bệnh nhân sốc giảm thể tích."
    ],
    "tags": [
      "Tiêu Hóa",
      "Bệnh Tả",
      "Sinh lý bệnh",
      "Cơ chế bệnh sinh",
      "ORS"
    ]
  },
  {
    "id": "ccbs-60",
    "slug": "slb-ccbs-lau",
    "code": "CCBS-60",
    "title": "Bệnh Lậu",
    "system": "general",
    "systemName": "Truyền Nhiễm & Vi Sinh",
    "order": 60,
    "overview": "Sinh lý bệnh và Cơ chế bệnh sinh Bệnh lậu (Gonorrhea Pathophysiology): Phân tích cơ chế bám dính Pili Type IV, protein Opa tương tác thụ thể CEACAM, cơ chế lẩn tránh miễn dịch biến đổi pha, viêm vùng chậu (PID), hội chứng Fitz-Hugh-Curtis, lậu lan tỏa (DGI) và cơ chế kháng kháng sinh đa lớp (penA, mtrR, gyrA) theo WHO & CDC 2024.",
    "clinicalPearls": [
      "Neisseria gonorrhoeae bám dính và xâm nhập biểu mô trụ niêm mạc qua Pili Type IV và Protein Opa (liên kết với thụ thể CEACAM), sau đó xuyên bào (Transcytosis) xuống mô liên kết dưới niêm.",
      "Nghịch lý nhiễm trùng không triệu chứng (Asymptomatic): Có tới 50 - 80% phụ nữ và > 90% trường hợp nhiễm lậu hầu họng/trực tràng không có triệu chứng, tạo điều kiện cho vi khuẩn lan truyền ngược dòng gây Viêm vùng chậu (PID), thai ngoài tử cung và vô sinh do tắc vòi trứng.",
      "Hội chứng Lậu lan tỏa (DGI - Disseminated Gonococcal Infection): Vi khuẩn thoát vào máu ở bệnh nhân thiếu hụt bổ thể C5-C9, biểu hiện tam chứng Viêm bao gân - Đau đa khớp - Tổn thương mụn mủ hoại tử ngoài da hoặc Viêm khớp nhiễm trùng mủ.",
      "Hầu họng là 'Lò luyện' Kháng thuốc (Antimicrobial Resistance): N. gonorrhoeae trao đổi gen kháng thuốc với các loài Neisseria hội sinh tại hầu họng; đột biến gen penA (thay đổi PBP2) và mtrR (tăng bơm tống thuốc MtrCDE) làm giảm nhạy cảm với Ceftriaxone."
    ],
    "tags": [
      "Truyền Nhiễm",
      "Bệnh Lậu",
      "Sinh lý bệnh",
      "Cơ chế bệnh sinh",
      "Kháng thuốc"
    ]
  },
  {
    "id": "ccbs-61",
    "slug": "slb-ccbs-hiv-aids",
    "code": "CCBS-61",
    "title": "HIV / AIDS",
    "system": "general",
    "systemName": "Truyền Nhiễm & Vi Sinh",
    "order": 61,
    "overview": "Sinh lý bệnh và Cơ chế bệnh sinh HIV / AIDS: Phân tích cơ chế gắn kết gp120/CD4/CCR5, chu kỳ phiên mã ngược & tích hợp provirus, động học miễn dịch GALT, rò rỉ vi khuẩn (Microbial Translocation), hồ chứa virus (Viral Reservoir), bệnh tim mạch gia tốc (REPRIEVE) và bản đồ thuốc ART trúng đích theo EACS 2025 & WHO.",
    "clinicalPearls": [
      "Chu kỳ xâm nhập và vỏ Capsid nguyên vẹn: Glycoprotein gp120 gắn kết thụ thể CD4 và đồng thụ thể CCR5 (hoặc CXCR4), kích hoạt gp41 hòa màng; lõi Capsid nguyên vẹn hoạt động như 'áo choàng tàng hình' bảo vệ RNA virus khỏi các thụ thể cảm biến nội bào (cGAS) trên đường di chuyển vào nhân qua phân tử CPSF6.",
      "Tổn thương mô lympho ruột (GALT) sớm: Ngay trong giai đoạn nhiễm cấp tính, virus tiêu diệt chọn lọc và không thể phục hồi tế bào T CD4+ Th17 tại niêm mạc ruột, phá vỡ hàng rào niêm mạc gây hiện tượng Rò rỉ vi khuẩn (Microbial Translocation) và giải phóng LPS kích hoạt thụ thể TLR4 tạo trạng thái Viêm hệ thống mạn tính.",
      "Hồ chứa virus hoạt động (Active Reservoir): Provirus tích hợp trong tế bào T CD4+ nhớ nghỉ tự nhân bản qua quá trình tăng sinh dòng (Clonal Expansion); hồ chứa hoạt động vẫn phiên mã dịch mã tạo protein Gag gây phản ứng viêm mạn tính và các đợt bùng phát tải lượng virus thấp (Viral Blips) dù tải lượng huyết thanh được kiểm soát < 20 bản sao/mL.",
      "Bệnh tim mạch gia tốc & Thử nghiệm bước ngoặt REPRIEVE: Tình trạng viêm nội mạc mạch máu mạn tính làm tăng gấp đôi nguy cơ biến cố tim mạch (MACE); Statin (Pitavastatin) giúp giảm 35% nguy cơ MACE nhờ tác dụng kháng viêm nội mạc độc lập với mức hạ LDL-C (Guideline EACS 2025)."
    ],
    "tags": [
      "Truyền Nhiễm",
      "HIV/AIDS",
      "Sinh lý bệnh",
      "Cơ chế bệnh sinh",
      "ART",
      "REPRIEVE"
    ]
  },
  {
    "id": "ccbs-62",
    "slug": "slb-ccbs-covid-19",
    "code": "CCBS-62",
    "title": "COVID-19",
    "system": "general",
    "systemName": "Truyền Nhiễm & Vi Sinh",
    "order": 62,
    "overview": "Sinh lý bệnh và Cơ chế bệnh sinh COVID-19: Phân tích toàn diện cơ chế gắn kết Spike-ACE2/TMPRSS2, huyết khối do viêm (Immunothrombosis), lật màng Phosphatidylserine, cục đông Amyloid kháng tiêu sợi huyết, tổn thương nội mạc thoát mạch (CLS), ARDS, tâm phế cấp và hội chứng Long COVID theo IDSA & WHO 2025.",
    "clinicalPearls": [
      "Xâm nhập tế bào đích qua trục ACE2 / TMPRSS2: Protein Gai (Spike) gắn kết thụ thể ACE2 trên tế bào biểu mô phế nang Type II và tế bào nội mạc mạch máu, được enzyme Protease serine TMPRSS2 cắt mồi kích hoạt hòa màng trực tiếp hoặc nhập bào.",
      "Cơ chế Huyết khối do Viêm (Immunothrombosis): SARS-CoV-2 và bão cytokine làm cạn kiệt ATP và tăng Ca2+ nội bào, bất hoạt Flippase/Floppase và kích hoạt Scramblase lật Phosphatidylserine (PS) ra lá ngoài màng; PS mang điện tích âm đóng vai trò là bề mặt xúc tác lắp ráp phức hợp Tenase và Prothrombinase sinh Thrombin ồ ạt.",
      "Vi huyết khối Amyloid kháng tiêu sợi huyết (Amyloid Microclots): Sợi Fibrin biến tính thành cấu trúc amyloid bền vững kháng lại sự phân hủy của Plasmin; kết hợp với nồng độ PAI-1 tăng vọt từ tế bào nội mạc tổn thương gây trạng thái Tăng đông đi kèm Giảm tiêu sợi huyết (Hypofibrinolysis) kéo dài.",
      "Tổn thương phổi ARDS & Thoát dịch mao mạch (CLS): Viêm nội mạc (Endotheliitis) làm co rút tế bào, tách rời liên kết liên bào gây thoát huyết tương vào phế nang làm bất hoạt Surfactant, xẹp phổi và bất xứng thông khí/tưới máu (V/Q mismatch) dẫn đến giảm oxy máu trơ."
    ],
    "tags": [
      "Truyền Nhiễm",
      "COVID-19",
      "Sinh lý bệnh",
      "Cơ chế bệnh sinh",
      "Immunothrombosis",
      "ARDS"
    ]
  }
]
};
