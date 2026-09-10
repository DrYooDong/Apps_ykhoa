import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ShieldAlert,
  AlertTriangle,
  Eye,
  Activity,
  HeartPulse,
  Layers,
  Sparkles,
  Crosshair,
  ChevronRight,
  ChevronLeft,
  X,
  Zap,
  Info,
  Rotate3D,
  Scan,
  Compass,
  CheckCircle2,
  Sliders
} from "lucide-react";
import { BrainHerniation3DCanvas } from "./BrainHerniation3DCanvas";

export type HerniationType = "subfalcine" | "uncal" | "central" | "tonsillar" | "transcalvarial";
export type SlicePlane = "axial" | "coronal" | "dual";
export type RenderEngineMode = "3d-webgl" | "ct-dicom" | "atlas-hd";

export interface Hotspot {
  id: string;
  plane: "axial" | "coronal";
  x: number;
  y: number;
  label: string;
  latinName: string;
  badge: string;
  badgeColor: "rose" | "amber" | "sky" | "purple" | "emerald";
  anatomyDescription: string;
  neurologicalSign: string;
  imagingPearl: string;
}

export interface HerniationInfo {
  id: HerniationType;
  order: number;
  name: string;
  vietnameseName: string;
  stageTitle: string;
  icpEstimate: number; // in mmHg
  midlineShiftMm: number; // in mm
  anatomicalMechanism: string;
  coronalAnatomyNote: string;
  axialAnatomyNote: string;
  motorSign: string;
  eyeSign: {
    description: string;
    rightPupilSize: number; // in mm
    leftPupilSize: number;
    rightReact: boolean;
    leftReact: boolean;
    ptosisRight: boolean;
    label: string;
  };
  respiratorySign: string;
  cushingRisk: string;
  cushingVitals: {
    bp: string;
    hr: number;
    rr: string;
  };
  urgentInterventions: string[];
  hotspots: Hotspot[];
}

const HERNIATION_DATA: Record<HerniationType, HerniationInfo> = {
  subfalcine: {
    id: "subfalcine",
    order: 1,
    name: "Subfalcine (Cingulate) Herniation",
    vietnameseName: "Thoát Vị Dưới Liềm Não (Hồi Đai)",
    stageTitle: "Giai Đoạn 1: Cửa ngõ cảnh báo - Chèn ép bán cầu & Động mạch não trước",
    icpEstimate: 24,
    midlineShiftMm: 8.5,
    anatomicalMechanism:
      "Hồi đai thùy trán bị khối choán chỗ đẩy trượt ép qua bờ tự do dưới của Liềm đại não (Falx cerebri), đè xẹp não thất bên cùng bên và gây thiếu máu Động mạch Não Trước (ACA).",
    coronalAnatomyNote:
      "Trên mặt cắt đứng trán: Hồi đai nhô qua đường giữa dưới bờ tự do liềm não, sừng trán não thất bên bị đè bẹp, não thất bên đối diện giãn ứ nước do bít lỗ Monro.",
    axialAnatomyNote:
      "Trên mặt cắt ngang (Axial CT): Đường giữa bị đẩy lệch (Midline shift > 5mm) rõ rệt, vách trong suốt bị cong vẹo sang trái, sừng trán thất bên cùng bên bị xóa hoàn toàn, rãnh cuộn não vỏ não bị ép phẳng.",
    motorSign:
      "Yếu hoặc liệt chân đối bên ưu thế hơn tay (do thiếu máu cục bộ vùng vỏ não vận động thuộc diện cấp máu của Động mạch Não Trước ACA).",
    eyeSign: {
      description: "Hai đồng tử thường đều 3mm, phản xạ ánh sáng còn nhạy ở giai đoạn sớm. Có thể bắt đầu đờ đẫn khi áp lực nội sọ tiếp tục tăng.",
      rightPupilSize: 3.2,
      leftPupilSize: 3.0,
      rightReact: true,
      leftReact: true,
      ptosisRight: false,
      label: "Đồng tử hai bên cân đối, còn phản xạ ánh sáng"
    },
    respiratorySign: "Nhịp thở đều, chưa rối loạn trực tiếp trừ khi chuyển biến sang thoát vị qua lều não.",
    cushingRisk: "Trung bình; là giai đoạn cửa ngõ cảnh báo trước khi tiến triển sang thoát vị qua lều.",
    cushingVitals: {
      bp: "145/85",
      hr: 68,
      rr: "18 lần/phút (Đều)"
    },
    urgentInterventions: [
      "Chụp CT sọ não khẩn xác định mức độ lệch đường giữa (Midline Shift > 5mm là chỉ định ngoại khoa khẩn).",
      "Nâng cao đầu giường 30°, giữ thẳng trục cổ tránh gập nghẽn tĩnh mạch cảnh dẫn lưu máu về tim.",
      "Hội chẩn Phẫu thuật Thần kinh khẩn cấp xem xét mở sọ giải áp lấy khối choán chỗ (máu tụ / u não)."
    ],
    hotspots: [
      {
        id: "hs_sub_cingulate_ax",
        plane: "axial",
        x: 136,
        y: 104,
        label: "Hồi đai trượt dưới bờ liềm não (Cingulate Gyrus)",
        latinName: "Gyrus cinguli subfalcinus",
        badge: "VỊ TRÍ THOÁT VỊ",
        badgeColor: "amber",
        anatomyDescription:
          "Hồi đai thuộc thùy trán bị khối máu tụ đẩy trượt từ bán cầu phải sang bán cầu trái, chui ngay bên dưới bờ tự do của liềm đại não.",
        neurologicalSign:
          "Chèn ép nhánh Động mạch Não Trước (ACA) gây liệt vận động và rối loạn cảm giác ưu thế chi dưới đối bên (chân yếu hơn tay).",
        imagingPearl:
          "Độ lệch đường giữa (Midline shift) đo tại vách trong suốt > 5mm là mốc chỉ định phẫu thuật mở sọ giải áp cấp cứu."
      },
      {
        id: "hs_sub_falx_ax",
        plane: "axial",
        x: 150,
        y: 50,
        label: "Liềm đại não (Falx Cerebri)",
        latinName: "Falx cerebri",
        badge: "MỐC GIẢI PHẪU CỨNG",
        badgeColor: "sky",
        anatomyDescription:
          "Dải xơ màng cứng chắc chắn ngăn đôi hai bán cầu đại não. Bờ dưới của nó cong tự do và đóng vai trò như một 'lưỡi dao' tì đè nhu mô não.",
        neurologicalSign:
          "Nhu mô hồi đai bị tì vào bờ liềm não có thể gây hoại tử thiếu máu não thứ phát diện rộng.",
        imagingPearl:
          "Liềm não bình thường nằm thẳng tuyệt đối trên trục trước - sau; khi có thoát vị dưới liềm, liềm não bị đẩy cong vẹo."
      },
      {
        id: "hs_sub_ventricle_ax",
        plane: "axial",
        x: 124,
        y: 100,
        label: "Sừng trán não thất bên trái giãn",
        latinName: "Cornu frontale ventriculi lateralis",
        badge: "DẪN LƯU BỊ TẮC",
        badgeColor: "purple",
        anatomyDescription:
          "Khối thoát vị đè xẹp sừng trán bên phải và chèn ép lỗ Monro làm tắc nghẽn lưu thông dịch não tủy từ não thất bên trái.",
        neurologicalSign:
          "Gây giãn não thất tắc nghẽn khu trú (Obstructive hydrocephalus), làm gia tăng áp lực nội sọ cấp tính.",
        imagingPearl:
          "Hình ảnh mất đối xứng não thất kinh điển: Sừng trán cùng bên biến mất (xóa hoàn toàn), sừng trán đối bên giãn to hình túi."
      },
      {
        id: "hs_sub_hematoma_ax",
        plane: "axial",
        x: 218,
        y: 90,
        label: "Khối máu tụ ngoài màng cứng thùy trán phải (EDH)",
        latinName: "Haematoma epidurale frontale",
        badge: "NGUYÊN NHÂN CHOÁN CHỖ",
        badgeColor: "rose",
        anatomyDescription:
          "Khối máu tụ hình thấu kính hai mặt lồi (biconvex) thùy trán phải tạo vectơ áp lực hướng từ ngoài vào trong và từ trước ra sau.",
        neurologicalSign:
          "Đau đầu dữ dội, nôn vọt, tri giác suy giảm dần theo thang điểm Glasgow (GCS).",
        imagingPearl:
          "Vùng tăng tỷ trọng tự nhiên (+60 đến +80 HU) trên CT sọ não không cản quang kèm viền phù não giảm tỷ trọng (+15 đến +20 HU)."
      },
      {
        id: "hs_sub_cingulate_cor",
        plane: "coronal",
        x: 138,
        y: 110,
        label: "Hồi đai trượt dưới bờ liềm não (Mặt cắt đứng trán)",
        latinName: "Herniatio subfalcina coronalis",
        badge: "MẶT CẮT TRÁN",
        badgeColor: "amber",
        anatomyDescription:
          "Trên mặt phẳng đứng trán, nhìn thấy rõ hình ảnh hồi đai 'chui gầm' dưới liềm não sang bán cầu đối diện, ép xẹp thể chai.",
        neurologicalSign:
          "Kéo căng các nhánh xiên của tĩnh mạch màng cứng và động mạch thể chai.",
        imagingPearl:
          "Xóa hoàn toàn khe liên bán cầu ở đoạn trước - giữa và đẩy lệch thể chai."
      }
    ]
  },
  uncal: {
    id: "uncal",
    order: 2,
    name: "Uncal Transtentorial Herniation",
    vietnameseName: "Thoát Vị Hồi Móc Qua Khe Lều (Uncal)",
    stageTitle: "Giai Đoạn 2: Thoát vị qua lều 1 bên - Dây III & Cuống não (Đồng tử Hutchinson)",
    icpEstimate: 36,
    midlineShiftMm: 11.2,
    anatomicalMechanism:
      "Hồi móc (Uncus) thùy thái dương bị khối máu tụ đẩy chèn ép qua khe lều tiểu não, chèn trực tiếp Dây thần kinh sọ số III (vận nhãn) và cuống đại não (Cerebral peduncle) cùng bên.",
    coronalAnatomyNote:
      "Trên mặt cắt đứng trán: Bờ trong thùy thái dương trượt qua gờ lều tiểu não xuống hố sau, đè nát cuống não và làm lệch trục thân não.",
    axialAnatomyNote:
      "Trên mặt cắt ngang (Axial CT/MRI): Bể quanh trung não (Ambient & Crural cistern) bên phải bị chèn bẹp xóa hoàn toàn (Cisternal effacement). Dây III bị kẹp dẹt. Cuống não bên đối diện bị đẩy tì vào bờ lều đối bên tạo rãnh Kernohan (Kernohan's notch).",
    motorSign:
      "Liệt nửa người đối bên (do chèn cuống não cùng bên) HOẶC Liệt nửa người cùng bên nghịch lý (do Khuyết Kernohan ép cuống não đối diện).",
    eyeSign: {
      description: "Đồng tử Hutchinson kinh điển: Đồng tử cùng bên giãn to 7-8mm, cố định, mất phản xạ ánh sáng (Mydriasis) kèm sụp mi (Ptosis) do liệt dây III cấp tính.",
      rightPupilSize: 7.5,
      leftPupilSize: 2.8,
      rightReact: false,
      leftReact: true,
      ptosisRight: true,
      label: "Đồng tử Hutchinson (Phải giãn to 7.5mm mất PX, Trái 2.8mm)"
    },
    respiratorySign: "Thở nhanh sâu chuyển dần sang kiểu thở Cheyne-Stokes chu kỳ khi thân não bị đè sâu.",
    cushingRisk: "RẤT CAO: Bệnh nhân đang đối mặt với nguy cơ tụt não tử vong trong vài giờ tới.",
    cushingVitals: {
      bp: "178/72",
      hr: 52,
      rr: "24 lần/phút (Cheyne-Stokes)"
    },
    urgentInterventions: [
      "Truyền nhanh dung dịch thẩm thấu ưu trương: Bolus Mannitol 20% 1 g/kg HOẶC Saline 3% 250ml trong 15 phút.",
      "Tăng thông khí cấp cứu ngắn hạn (PaCO2 mục tiêu 28-30 mmHg) co mạch não tạm thời trong lúc di chuyển vào phòng mổ.",
      "Báo động đỏ Phẫu thuật Thần kinh mổ mở sọ giải áp giải phóng hồi móc và dây III tức thì."
    ],
    hotspots: [
      {
        id: "hs_uncal_uncus_ax",
        plane: "axial",
        x: 176,
        y: 154,
        label: "Hồi móc thùy thái dương (Uncus)",
        latinName: "Uncus gyri parahippocampalis",
        badge: "ĐIỂM NÚT NGUY HIỂM",
        badgeColor: "rose",
        anatomyDescription:
          "Cấu trúc giải phẫu ở cực trong thùy thái dương. Khi áp lực hố sọ giữa tăng vọt, hồi móc bị trượt qua bờ tự do lều tiểu não vào khoang hố sọ sau.",
        neurologicalSign:
          "Trực tiếp ép nát dây thần kinh sọ III và mặt trước bên của trung não, đe dọa trực tiếp mạng sống bệnh nhân.",
        imagingPearl:
          "Hồi móc phòi qua bờ lều não trên phim chụp cắt lớp CT làm biến dạng hình thái hạt đậu của trung não."
      },
      {
        id: "hs_uncal_cn3_ax",
        plane: "axial",
        x: 174,
        y: 136,
        label: "Dây thần kinh sọ số III (Vận Nhãn)",
        latinName: "Nervus oculomotorius (CN III)",
        badge: "DẤU HIỆU ĐỒNG TỬ VÀNG",
        badgeColor: "rose",
        anatomyDescription:
          "Dây III thoát ra từ rãnh trong cuống não, đi ngay sát bờ lều tiểu não trước khi chui vào xoang hang.",
        neurologicalSign:
          "Các sợi phó giao cảm co đồng tử nằm ở lớp ngoài cùng của bao dây thần kinh nên bị đè dập đầu tiên -> Gây GIÃN ĐỒNG TỬ CÙNG BÊN (Hutchinson Pupil) mất phản xạ ánh sáng và sụp mi.",
        imagingPearl:
          "Giãn đồng tử một bên ở bệnh nhân chấn thương sọ não là chỉ định mổ cấp cứu giải áp ngay lập tức mà không được trì hoãn!"
      },
      {
        id: "hs_uncal_ambient_ax",
        plane: "axial",
        x: 168,
        y: 176,
        label: "Bể quanh trung não (Ambient Cistern) bị xóa",
        latinName: "Cisterna ambiens effacement",
        badge: "CHỈ ĐIỂM HÌNH ẢNH HỌC",
        badgeColor: "sky",
        anatomyDescription:
          "Khoang chứa dịch não tủy bao quanh thân não giúp đệm cơ học và nuôi dưỡng vi mạch quanh trung não.",
        neurologicalSign:
          "Mất hoàn toàn khả năng đệm dịch não tủy, tăng áp lực cục bộ lên trung não gây rối loạn nhịp thở và tri giác.",
        imagingPearl:
          "Dấu hiệu 'Xóa bể quanh trung não' (Cisternal effacement) là tiêu chuẩn vàng có giá trị tiên lượng nặng nhất trên thang điểm Marshall CT."
      },
      {
        id: "hs_uncal_kernohan_ax",
        plane: "axial",
        x: 122,
        y: 152,
        label: "Khuyết Kernohan (Kernohan's Notch)",
        latinName: "Incisura Kernohani",
        badge: "DẤU HIỆU NGHỊCH LÝ",
        badgeColor: "amber",
        anatomyDescription:
          "Trung não bị khối thoát vị bên phải đẩy lệch sang trái, làm cuống não đối diện bị đè tì tì vào bờ tự do lều tiểu não bên trái.",
        neurologicalSign:
          "Tổn thương bó tháp bên trái dẫn tới LIỆT NỬA NGƯỜI CÙNG BÊN PHẢI (nghịch lý) với bên tổn thương ban đầu (False localizing sign).",
        imagingPearl:
          "Hình ảnh khuyết lõm hình chữ V tại bờ ngoài cuống não đối bên trên MRI xung T2/FLAIR."
      },
      {
        id: "hs_uncal_pca_ax",
        plane: "axial",
        x: 166,
        y: 168,
        label: "Động mạch Não Sau (PCA) bị kẹp",
        latinName: "Arteria cerebri posterior (PCA)",
        badge: "NGUY CƠ THIẾU MÁU NÃO",
        badgeColor: "purple",
        anatomyDescription:
          "Động mạch não sau chạy vòng quanh cuống não, bị kẹp giữa hồi móc thoát vị và bờ lều tiểu não.",
        neurologicalSign:
          "Gây nhồi máu thiếu máu thùy chẩm cùng bên -> Bán manh đồng danh đối bên (Contralateral homonymous hemianopia).",
        imagingPearl:
          "Vùng giảm tỷ trọng nhồi máu thùy chẩm xuất hiện muộn trên CT sau hồi sức thoát vị thành công."
      },
      {
        id: "hs_uncal_uncus_cor",
        plane: "coronal",
        x: 168,
        y: 188,
        label: "Hồi móc trượt qua lỗ lều tiểu não",
        latinName: "Incisura tentorii herniation",
        badge: "MẶT CẮT TRÁN",
        badgeColor: "rose",
        anatomyDescription:
          "Trên mặt cắt trán, thấy rõ góc tụt xuống dưới của cực thùy thái dương chui qua lỗ lều tiểu não.",
        neurologicalSign:
          "Chèn ép hệ thống lưới kích hoạt thức tỉnh (ARAS) trong thân não, đẩy nhanh hôn mê sâu.",
        imagingPearl:
          "Lệch trục thân não và mất góc lều tiểu não tự nhiên."
      }
    ]
  },
  central: {
    id: "central",
    order: 3,
    name: "Central (Transtentorial) Herniation",
    vietnameseName: "Thoát Vị Trung Tâm Qua Lều Não",
    stageTitle: "Giai Đoạn 3: Thoát vị qua lều 2 bên thẳng trục - Gian não & Xuất huyết Duret",
    icpEstimate: 42,
    midlineShiftMm: 6.0,
    anatomicalMechanism:
      "Gian não (Đồi thị & Vùng hạ đồi) và cả hai bán cầu bị áp lực đồng thể đẩy tụt thẳng trục xuống dưới qua lỗ lều tiểu não, căng xé rách các nhánh mạch máu nhỏ nuôi thân não (Xuất huyết Duret).",
    coronalAnatomyNote:
      "Trên mặt cắt đứng trán: Toàn bộ nhu mô não hai bên trượt tụt dọc theo trục đứng xuống dưới, não thất ba xẹp dẹt hoàn toàn, lều tiểu não bị căng gập.",
    axialAnatomyNote:
      "Trên mặt cắt ngang: Bể đáy quanh trung não bị xóa đối xứng hoàn toàn cả hai bên. Trung não bị chèn ép co ngắn lại, xuất huyết Duret rải rác trong nhu mô thân não.",
    motorSign:
      "Pha sớm: Co cứng mất vỏ (Decorticate - co gập hai tay, duỗi cứng hai chân). Pha muộn: Duỗi cứng mất não (Decerebrate - duỗi xoay trong toàn bộ tứ chi).",
    eyeSign: {
      description: "Pha đầu đồng tử co nhỏ 2mm do mất ức chế giao cảm vùng hạ đồi; pha sau cố định ở vị trí giữa 4-5mm mất hoàn toàn phản xạ ánh sáng.",
      rightPupilSize: 4.5,
      leftPupilSize: 4.5,
      rightReact: false,
      leftReact: false,
      ptosisRight: false,
      label: "Đồng tử cố định 4.5mm vị trí giữa, mất phản xạ 2 bên"
    },
    respiratorySign: "Thở Cheyne-Stokes giai đoạn đầu -> Tiến triển thành thở nhanh sâu liên tục do kích thích trung tâm hô hấp cầu não.",
    cushingRisk: "Cực kỳ cao. Điểm Glasgow tụt dốc nhanh chóng từ lơ mơ sang hôn mê sâu (GCS 3-5).",
    cushingVitals: {
      bp: "190/65",
      hr: 46,
      rr: "30 lần/phút (Thở nhanh sâu trung ương)"
    },
    urgentInterventions: [
      "Đặt ống nội khí quản bảo vệ đường thở khẩn cấp (sử dụng thuốc mê không ức chế huyết động như Etomidate).",
      "Hồi sức chống phù não đa phương thức: Mannitol 20% + Saline 3% theo áp lực thẩm thấu huyết tương mục tiêu 310-320 mOsm/L.",
      "Đặt catheter dẫn lưu não thất ngoài (EVD) giải áp dịch não tủy nếu có giãn não thất tắc nghẽn."
    ],
    hotspots: [
      {
        id: "hs_central_thalamus_ax",
        plane: "axial",
        x: 150,
        y: 135,
        label: "Gian não & Đồi thị (Diencephalon)",
        latinName: "Diencephalon & Thalamus",
        badge: "TỤT THẲNG TRỤC",
        badgeColor: "rose",
        anatomyDescription:
          "Áp lực lan tỏa đẩy đồi thị và vùng hạ đồi tụt xuống đè ép lên mái của trung não theo phương thẳng đứng.",
        neurologicalSign:
          "Mất phản xạ thức tỉnh, bệnh nhân rơi vào hôn mê sâu nhanh chóng; rối loạn điều hòa thân nhiệt (sốt cao thần kinh) và đái tháo nhạt do tổn thương trục hạ đồi - tuyến yên.",
        imagingPearl:
          "Xóa hoàn toàn khoang não thất ba và bể trên yên đối xứng hai bên trên CT sọ não."
      },
      {
        id: "hs_central_duret_ax",
        plane: "axial",
        x: 150,
        y: 165,
        label: "Xuất huyết Duret thân não (Duret Hemorrhage)",
        latinName: "Haemorrhagia Duret",
        badge: "TỔN THƯƠNG TỬ VONG",
        badgeColor: "rose",
        anatomyDescription:
          "Khi thân não bị dịch chuyển xuống dưới trong khi động mạch thân nền bị cố định, các nhánh xuyên cầu não bị kéo căng quá mức dẫn tới rách vỡ vi mạch.",
        neurologicalSign:
          "Tư thế duỗi cứng mất não (Decerebrate posturing), tổn thương nhân dây thần kinh sọ cầu não và hành não, tiên lượng tử vong > 90%.",
        imagingPearl:
          "Các ổ tăng tỷ trọng dạng chấm/dải xuất huyết nhỏ rải rác ngay giữa trung não và cầu não trên CT sọ não."
      },
      {
        id: "hs_central_basal_ax",
        plane: "axial",
        x: 132,
        y: 178,
        label: "Xóa toàn bộ bể đáy hai bên",
        latinName: "Obliteratio cisternarum basalis",
        badge: "DẤU HIỆU Marshall IV",
        badgeColor: "purple",
        anatomyDescription:
          "Tất cả các bể chứa dịch não tủy quanh thân não (bể liên cuống, bể quanh trung não, bể trên yên) đều bị nhu mô não chèn kín.",
        neurologicalSign:
          "Tắc nghẽn hoàn toàn dòng lưu thông dịch não tủy từ bán cầu xuống tủy sống.",
        imagingPearl:
          "Phân loại chấn thương sọ não Marshall IV (Diffuse Injury IV): Bể đáy bị xóa hoàn toàn, nguy cơ tử vong nội viện cực kỳ cao."
      },
      {
        id: "hs_central_axis_cor",
        plane: "coronal",
        x: 150,
        y: 145,
        label: "Trục sụp đổ nhu mô não hai bán cầu",
        latinName: "Transtentorial axial descent",
        badge: "MẶT CẮT TRÁN",
        badgeColor: "amber",
        anatomyDescription:
          "Hai bán cầu đại não cùng sụp đổ đối xứng xuống dưới qua lỗ mở lều tiểu não.",
        neurologicalSign:
          "Tiến triển từ tư thế co cứng mất vỏ (tổn thương trên nhân đỏ) sang duỗi cứng mất não (tổn thương dưới nhân đỏ).",
        imagingPearl:
          "Đè xẹp toàn bộ não thất bên và não thất ba thành các khe mảnh không còn dịch não tủy."
      }
    ]
  },
  tonsillar: {
    id: "tonsillar",
    order: 4,
    name: "Cerebellar Tonsillar Herniation",
    vietnameseName: "Thoát Vị Hạnh Nhân Tiểu Não Qua Lỗ Chẩm",
    stageTitle: "Giai Đoạn 4: Tụt kẹt Lỗ Chẩm - Hành não & Trung tâm hô hấp (Tối cấp cứu)",
    icpEstimate: 52,
    midlineShiftMm: 3.5,
    anatomicalMechanism:
      "Hạnh nhân tiểu não (Cerebellar tonsils) bị khối choán chỗ hố sau đẩy tụt kẹt qua Lỗ chẩm (Foramen magnum), chèn ép trực tiếp Hành não và tủy cổ cao - trung tâm sinh tồn điều hòa tuần hoàn và hô hấp.",
    coronalAnatomyNote:
      "Trên mặt cắt đứng trán: Hai cực hạnh nhân tiểu não nhọn hoắt thòng tụt xuống dưới mặt phẳng lỗ chẩm > 5mm, siết chặt lấy hành não.",
    axialAnatomyNote:
      "Trên mặt cắt ngang tại lỗ chẩm (Foramen Magnum Axial CT): Không gian chứa dịch não tủy quanh hành não bị xóa trắng, hạnh nhân tiểu não chèn ép nghẹt cứng chu vi lỗ chẩm.",
    motorSign:
      "Liệt mềm tứ chi (Flaccid quadriplegia), mất toàn bộ trương lực cơ và phản xạ gân xương, mất phản xạ nuốt và nôn.",
    eyeSign: {
      description: "Cả hai đồng tử giãn to tối đa 8-9mm, đờ đẫn cố định hoàn toàn (Bilateral fixed and fully dilated pupils).",
      rightPupilSize: 8.5,
      leftPupilSize: 8.5,
      rightReact: false,
      leftReact: false,
      ptosisRight: false,
      label: "Cả 2 đồng tử giãn cực đại 8.5mm cố định (Dấu hiệu chết não)"
    },
    respiratorySign: "Rối loạn nhịp thở thất điều (Biot / Ataxic breathing), thở ngáp cá đứt quãng dẫn tới NGƯNG THỞ ĐỘT NGỘT.",
    cushingRisk: "TỐI CẤP CỨU: Tam chứng Cushing rầm rộ trước khi trụy mạch và ngừng tim hoàn toàn.",
    cushingVitals: {
      bp: "215/50",
      hr: 38,
      rr: "8 lần/phút (Thất điều / Thở ngáp cá)"
    },
    urgentInterventions: [
      "Bóp bóng qua Mask -> Đặt nội khí quản thở máy xâm nhập cấp cứu lập tức.",
      "TUYỆT ĐỐI CHỐNG CHỈ ĐỊNH CHỌC DÒ DỊCH NÃO TỦY (LP) vì gây giảm áp lực hố dưới đột ngột, tụt não tử vong tức thì!",
      "Hồi sức thuốc vận mạch phòng ngừa tụt huyết áp kịch phát và phẫu thuật mở sọ giải áp hố sau khẩn cấp (Suboccipital craniectomy)."
    ],
    hotspots: [
      {
        id: "hs_ton_tonsil_ax",
        plane: "axial",
        x: 150,
        y: 142,
        label: "Hạnh nhân tiểu não kẹt cứng Lỗ Chẩm",
        latinName: "Tonsilla cerebelli",
        badge: "ĐIỂM NGHẼN SINH TỬ",
        badgeColor: "rose",
        anatomyDescription:
          "Hạnh nhân tiểu não bị chèn ép ép chặt vào chu vi vòng xương cứng của Lỗ chẩm (Foramen magnum).",
        neurologicalSign:
          "Siết chặt bó tháp vận động và trung tâm sinh tồn, gây mất toàn bộ phản xạ thân não và liệt mềm tứ chi.",
        imagingPearl:
          "Trên mặt cắt ngang mức lỗ chẩm, toàn bộ vòng dịch não tủy quanh hành não bị xóa trắng bởi nhu mô hạnh nhân."
      },
      {
        id: "hs_ton_medulla_ax",
        plane: "axial",
        x: 150,
        y: 165,
        label: "Hành não & Trung tâm Hô Hấp - Tuần Hoàn",
        latinName: "Medulla oblongata",
        badge: "TRUNG TÂM SINH TỒN",
        badgeColor: "rose",
        anatomyDescription:
          "Nơi chứa trung tâm hô hấp tự động (nhân bó đơn độc, phức hợp Bötzinger) và trung tâm vận mạch tim mạch.",
        neurologicalSign:
          "Thở ngáp cá (Ataxic breathing) rồi NGƯNG THỞ ĐỘT NGỘT; nhịp tim chậm kịch phát (Bradycardia < 40 bpm) dẫn đến vô tâm thu.",
        imagingPearl:
          "Hành não bị đè dẹp trước - sau, phù tủy cổ cao lan tỏa."
      },
      {
        id: "hs_ton_foramen_ax",
        plane: "axial",
        x: 118,
        y: 150,
        label: "Bờ xương Lỗ Chẩm (Foramen Magnum)",
        latinName: "Foramen magnum",
        badge: "VÒNG XƯƠNG CỨNG",
        badgeColor: "sky",
        anatomyDescription:
          "Lỗ xương lớn nhất đáy sọ nối khoang nội sọ với ống sống cổ. Cấu trúc xương cứng không thể dãn nở.",
        neurologicalSign:
          "Tạo ra hiệu ứng thắt cổ chai (bottleneck constriction) làm ngừng trệ tuần hoàn máu nuôi thân não.",
        imagingPearl:
          "Đường McRae (nối bờ trước và bờ sau lỗ chẩm) dùng làm mốc xác định tụt hạnh nhân > 5mm."
      },
      {
        id: "hs_ton_tonsil_cor",
        plane: "coronal",
        x: 137,
        y: 265,
        label: "Hạnh nhân tụt > 5mm qua đường McRae",
        latinName: "Descensus tonsillarum > 5mm",
        badge: "MẶT CẮT TRÁN",
        badgeColor: "rose",
        anatomyDescription:
          "Trên phim cắt trán, cực dưới của hạnh nhân tiểu não nhọn hoắt như cái nêm cắm sâu vào ống sống cổ C1.",
        neurologicalSign:
          "Chèn ép rễ thần kinh cổ cao C1-C2 gây gồng cứng cơ gáy (Cổ gượng cứng dữ dội).",
        imagingPearl:
          "Đo khoảng cách tụt xuống dưới đường McRae trên phim MRI Sagittal/Coronal để phân độ thoát vị Chiari hoặc thoát vị mắc phải."
      }
    ]
  },
  transcalvarial: {
    id: "transcalvarial",
    order: 5,
    name: "Transcalvarial (External) Herniation",
    vietnameseName: "Thoát Vị Não Qua Khuyết Sọ",
    stageTitle: "Giai Đoạn 5: Thoát vị ngoại vi - Sau nứt vỡ sọ hoặc mở nắp sọ giải áp",
    icpEstimate: 19,
    midlineShiftMm: 4.2,
    anatomicalMechanism:
      "Nhu mô não phù nề phòi ra ngoài khoang nội sọ qua vết nứt vỡ vòm sọ hở hoặc qua cửa sổ phẫu thuật mở nắp sọ giải áp (Decompressive craniectomy).",
    coronalAnatomyNote:
      "Trên mặt cắt đứng trán: Nhu mô thùy trán-đỉnh phù nề phòi qua bờ xương khuyết sọ, các tĩnh mạch vỏ não bị thắt nghẽn ở mép xương sọ.",
    axialAnatomyNote:
      "Trên mặt cắt ngang: Khối nhu mô não thoát vị hình cây nấm (Fungating brain) vượt ra ngoài đường chu vi xương sọ, rãnh cuộn não căng phồng xóa rãnh.",
    motorSign:
      "Rối loạn vận động khu trú tùy theo vùng vỏ não bị thắt nghẹt mạch máu tại bờ khuyết xương sọ.",
    eyeSign: {
      description: "Tùy thuộc vào áp lực nội sọ tổng thể; đồng tử thường co giãn tương đối bảo tồn trừ khi có tổn thương dập não phối hợp.",
      rightPupilSize: 3.5,
      leftPupilSize: 3.2,
      rightReact: true,
      leftReact: true,
      ptosisRight: false,
      label: "Đồng tử hai bên bình thường hoặc chênh lệch nhẹ"
    },
    respiratorySign: "Nhịp thở thường ổn định do áp lực nội sọ đã được giải tỏa một phần qua lỗ khuyết sọ.",
    cushingRisk: "Thấp hơn các thể khác do có cơ chế thoát áp lực ra ngoài, nhưng nguy cơ hoại tử thiếu máu não thứ phát do nghẹt mạch bờ xương.",
    cushingVitals: {
      bp: "135/80",
      hr: 74,
      rr: "16 lần/phút (Đều)"
    },
    urgentInterventions: [
      "Che phủ băng gạc vô khuẩn tẩm nước muối sinh lý, TUYỆT ĐỐI KHÔNG ấn nắn cơ học lên khối não phòi.",
      "Kháng sinh phổ rộng đường tĩnh mạch chống viêm màng não và áp xe não mủ nếu là vết thương sọ não hở.",
      "Tối ưu áp lực thẩm thấu huyết tương và điều chỉnh tư thế đầu cao để giảm áp lực phù nề mô não phòi."
    ],
    hotspots: [
      {
        id: "hs_trans_fungus_ax",
        plane: "axial",
        x: 278,
        y: 150,
        label: "Nhu mô não phòi hình cây nấm (Fungating Brain)",
        latinName: "Prolapsus cerebri",
        badge: "GIẢI ÁP NGOẠI KHOA",
        badgeColor: "rose",
        anatomyDescription:
          "Nhu mô não phù nề do chấn thương hoặc nhồi máu não diện rộng thoát ra ngoài khoang nội sọ qua cửa sổ mở sọ.",
        neurologicalSign:
          "Tự giải tỏa áp lực giúp cứu sống tính mạng và bảo vệ thân não, nhưng nhu mô phòi đối mặt nguy cơ tổn thương cơ học thứ phát.",
        imagingPearl:
          "Độ nhô của khối não thoát vị vượt qua bình diện xương sọ ngoài (Outer table herniation distance > 15mm)."
      },
      {
        id: "hs_trans_veins_ax",
        plane: "axial",
        x: 262,
        y: 135,
        label: "Tĩnh mạch vỏ não bị bờ xương thắt nghẹt",
        latinName: "Venae corticales strangulation",
        badge: "NGUY CƠ HOẠI TỬ",
        badgeColor: "amber",
        anatomyDescription:
          "Các tĩnh mạch vỏ não dẫn lưu về xoang tĩnh mạch dọc trên bị tì đè và gập góc ngay tại mép cắt xương sọ sắc nhọn.",
        neurologicalSign:
          "Ứ trệ tuần hoàn tĩnh mạch gây nhồi máu xuất huyết tĩnh mạch (venous hemorrhagic infarction) tại khối não phòi.",
        imagingPearl:
          "Vùng xuất huyết rải rác kèm phù não nặng hơn ở mép khối thoát vị trên phim CT sau mổ."
      },
      {
        id: "hs_trans_cut_cor",
        plane: "coronal",
        x: 248,
        y: 85,
        label: "Bờ khuyết xương mở nắp sọ (Craniectomy Defect)",
        latinName: "Defectum cranii",
        badge: "MẶT CẮT TRÁN",
        badgeColor: "sky",
        anatomyDescription:
          "Mép xương sọ được mở rộng (đường kính tối thiểu > 12cm theo hướng dẫn BTF) để tránh nghẹt mép não.",
        neurologicalSign:
          "Hội chứng vạt da lõm (Syndrome of the trephined) có thể xuất hiện muộn sau khi áp lực sọ giảm.",
        imagingPearl:
          "Đánh giá kích thước cửa sổ mở nắp sọ: Kích thước < 12cm có nguy cơ thắt nghẹt nhu mô cao hơn nhiều."
      }
    ]
  }
};

const PROGRESSION_SEQUENCE: HerniationType[] = ["subfalcine", "uncal", "central", "tonsillar", "transcalvarial"];

export const BrainHerniationVisualizer: React.FC = () => {
  const [activeType, setActiveType] = useState<HerniationType>("uncal");
  const [renderEngine, setRenderEngine] = useState<RenderEngineMode>("atlas-hd");
  const [slicePlane, setSlicePlane] = useState<SlicePlane>("dual");
  const [showVessels, setShowVessels] = useState<boolean>(true);
  const [showMeasurements, setShowMeasurements] = useState<boolean>(true);
  const [showHotspots, setShowHotspots] = useState<boolean>(true);
  const [showLandmarkLabels, setShowLandmarkLabels] = useState<boolean>(true);
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>("hs_uncal_cn3_ax");

  const current = HERNIATION_DATA[activeType];
  const activeHotspots = current.hotspots.filter(
    (h) => slicePlane === "dual" || h.plane === slicePlane
  );

  const selectedHotspot = current.hotspots.find((h) => h.id === activeHotspotId) || activeHotspots[0] || null;
  const currentIndex = PROGRESSION_SEQUENCE.indexOf(activeType);

  const handleStepProgression = (direction: "next" | "prev") => {
    let nextIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;
    if (nextIndex >= PROGRESSION_SEQUENCE.length) nextIndex = 0;
    if (nextIndex < 0) nextIndex = PROGRESSION_SEQUENCE.length - 1;
    const nextType = PROGRESSION_SEQUENCE[nextIndex];
    setActiveType(nextType);

    const newHotspots = HERNIATION_DATA[nextType].hotspots;
    if (newHotspots.length > 0) {
      setActiveHotspotId(newHotspots[0].id);
    }
  };

  const handleSelectHotspot = (hsId: string) => {
    setActiveHotspotId(hsId);
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-4 md:p-6 shadow-xs space-y-6">
      {/* 1. Header with Cushing Quick Status & Engine Selector */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-rose-50 text-rose-600 border border-rose-200">
              <ShieldAlert className="w-5 h-5" />
            </span>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <span>Mô Phỏng 5 Hội Chứng Thoát Vị Não & Tam Chứng Cushing Cấp Cứu</span>
              <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-rose-600 text-white shadow-2xs">
                NEURO-ANATOMY PRO
              </span>
            </h3>
          </div>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            Mô phỏng giải phẫu thần kinh 2D trực quan: <strong>Bản đồ giải phẫu Y học 2D (Netter Atlas HD)</strong>, <strong>Mặt cắt Cắt Lớp Vi Tính 2D (CT Scanner DICOM Hounsfield)</strong>, và <strong>Đối chiếu 2 bình diện 2D (Axial & Coronal)</strong>.
          </p>
        </div>

        {/* Cushing's Triad Quick Status Badge */}
        <div className="flex items-center gap-2 bg-rose-50 border border-rose-200 px-3.5 py-1.5 rounded-xl shadow-2xs">
          <HeartPulse className="w-4 h-4 text-rose-600" />
          <div className="text-xs">
            <span className="font-bold text-rose-900 block">Tam chứng Cushing Cấp cứu:</span>
            <span className="text-[11px] text-rose-700">HA tăng kẹp + Mạch chậm sâu + Rối loạn nhịp thở</span>
          </div>
        </div>
      </div>

      {/* 2. Pathological Progression Step Navigator (Streamlined & Compact) */}
      <div className="bg-slate-900 text-white p-2.5 rounded-xl border border-slate-800 space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="p-1 rounded-md bg-rose-500/20 text-rose-400">
              <Compass className="w-3.5 h-3.5" />
            </span>
            <span className="font-bold tracking-wide text-slate-200 uppercase text-[11px]">
              Tiến Triển Thoát Vị (5 Giai Đoạn):
            </span>
          </div>

          {/* Stepper buttons */}
          <div className="flex items-center gap-1 ml-auto">
            <button
              onClick={() => handleStepProgression("prev")}
              className="px-2 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[11px] font-medium border border-slate-700/80 flex items-center gap-1 transition-all"
              title="Xem giai đoạn trước"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Trước</span>
            </button>
            <span className="font-mono text-[10px] text-slate-400 px-1 font-semibold">
              {currentIndex + 1}/5
            </span>
            <button
              onClick={() => handleStepProgression("next")}
              className="px-2 py-1 rounded-md bg-rose-600 hover:bg-rose-500 text-white text-[11px] font-medium shadow-xs flex items-center gap-1 transition-all"
              title="Tiến triển sang giai đoạn tiếp theo"
            >
              <span className="hidden xs:inline">Tiếp</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Progression Pills Grid (Streamlined Single-line Pills) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-1.5">
          {PROGRESSION_SEQUENCE.map((key, idx) => {
            const item = HERNIATION_DATA[key];
            const isSelected = activeType === key;
            const stageLabels = [
              "1. Dưới Liềm",
              "2. Hồi Móc",
              "3. Trung Tâm",
              "4. Hạnh Nhân",
              "5. Khuyết Sọ"
            ];
            return (
              <button
                key={key}
                onClick={() => {
                  setActiveType(key);
                  const newHs = HERNIATION_DATA[key].hotspots;
                  if (newHs.length > 0) setActiveHotspotId(newHs[0].id);
                }}
                className={`py-1.5 px-2 rounded-lg border text-left transition-all flex items-center justify-between gap-1.5 ${
                  isSelected
                    ? "bg-rose-600 border-rose-500 text-white shadow-xs ring-1 ring-rose-400/50 font-semibold"
                    : "bg-slate-800/80 border-slate-700/70 hover:bg-slate-800 text-slate-300 hover:text-white"
                }`}
                title={`${item.vietnameseName} (${item.name}) - Áp lực nội sọ ICP ~${item.icpEstimate} mmHg`}
              >
                <span className="text-[11px] truncate">
                  {stageLabels[idx]}
                </span>
                <span
                  className={`text-[9px] font-mono px-1 py-0.5 rounded shrink-0 ${
                    isSelected ? "bg-black/30 text-rose-100 font-bold" : "bg-slate-700/80 text-slate-400"
                  }`}
                >
                  ~{item.icpEstimate}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Primary Graphics Engine Mode & Slice Plane Selector */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-100/90 p-3 rounded-xl border border-slate-200 text-xs">
        {/* GRAPHICS ENGINE TABS */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-slate-700 font-bold flex items-center gap-1 mr-1">
            <Sliders className="w-4 h-4 text-rose-600" />
            <span>Chế độ hình ảnh:</span>
          </span>

          <button
            onClick={() => setRenderEngine("atlas-hd")}
            className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
              renderEngine === "atlas-hd"
                ? "bg-teal-700 text-white shadow-sm ring-1 ring-teal-500"
                : "bg-white text-slate-700 hover:bg-slate-200 border border-slate-200"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Bản Đồ Giải Phẫu 2D (Netter Atlas HD)</span>
          </button>

          <button
            onClick={() => setRenderEngine("ct-dicom")}
            className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
              renderEngine === "ct-dicom"
                ? "bg-slate-900 text-rose-400 shadow-sm ring-1 ring-slate-700"
                : "bg-white text-slate-700 hover:bg-slate-200 border border-slate-200"
            }`}
          >
            <Scan className="w-3.5 h-3.5" />
            <span>Cắt Lớp Vi Tính 2D (CT Scanner DICOM)</span>
          </button>

          <button
            onClick={() => setRenderEngine("3d-webgl")}
            className={`px-2.5 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition-all text-slate-600 hover:text-slate-900 ${
              renderEngine === "3d-webgl"
                ? "bg-rose-600 text-white shadow-sm ring-1 ring-rose-400 font-bold"
                : "bg-white/80 hover:bg-slate-200 border border-slate-200"
            }`}
            title="Mô hình phối cảnh 3D tương tác (Three.js)"
          >
            <Rotate3D className="w-3.5 h-3.5" />
            <span>Mô Hình 3D (Tùy chọn)</span>
          </button>
        </div>

        {/* Slice plane controls (Only relevant for 2D CT & Atlas) */}
        {renderEngine !== "3d-webgl" && (
          <div className="flex items-center gap-1.5 flex-wrap ml-auto border-l border-slate-300 pl-3">
            <span className="text-slate-600 font-semibold flex items-center gap-1">
              <Layers className="w-3.5 h-3.5" />
              <span>Mặt cắt:</span>
            </span>

            <button
              onClick={() => setSlicePlane("axial")}
              className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                slicePlane === "axial"
                  ? "bg-slate-800 text-white"
                  : "bg-white text-slate-700 hover:bg-slate-200 border border-slate-200"
              }`}
            >
              Axial (Ngang)
            </button>
            <button
              onClick={() => setSlicePlane("coronal")}
              className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                slicePlane === "coronal"
                  ? "bg-slate-800 text-white"
                  : "bg-white text-slate-700 hover:bg-slate-200 border border-slate-200"
              }`}
            >
              Coronal (Trán)
            </button>
            <button
              onClick={() => setSlicePlane("dual")}
              className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                slicePlane === "dual"
                  ? "bg-slate-800 text-white"
                  : "bg-white text-slate-700 hover:bg-slate-200 border border-slate-200"
              }`}
            >
              Dual (Song song)
            </button>
          </div>
        )}

        {/* Anatomical Overlays Toggles */}
        <div className="flex items-center gap-3 ml-auto flex-wrap text-slate-700">
          <label className="flex items-center gap-1.5 cursor-pointer select-none font-semibold text-rose-700">
            <input
              type="checkbox"
              checked={showHotspots}
              onChange={(e) => setShowHotspots(e.target.checked)}
              className="rounded text-rose-600 focus:ring-rose-500 w-3.5 h-3.5"
            />
            <span className="flex items-center gap-1">
              <Crosshair className="w-3.5 h-3.5 text-rose-600" />
              <span>Điểm nhấn giải phẫu (Hotspots)</span>
            </span>
          </label>

          <label className="flex items-center gap-1.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={showLandmarkLabels}
              onChange={(e) => setShowLandmarkLabels(e.target.checked)}
              className="rounded text-rose-600 focus:ring-rose-500 w-3.5 h-3.5"
            />
            <span>Mốc giải phẫu chuẩn y khoa</span>
          </label>

          <label className="flex items-center gap-1.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={showMeasurements}
              onChange={(e) => setShowMeasurements(e.target.checked)}
              className="rounded text-rose-600 focus:ring-rose-500 w-3.5 h-3.5"
            />
            <span>Thước đo độ lệch ĐG</span>
          </label>
        </div>
      </div>

      {/* 4. Main Interactive Canvas & Clinical Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left / Center: High-Fidelity 3D WebGL / CT / Atlas Viewport */}
        <div
          className={`${
            slicePlane === "dual" && renderEngine !== "3d-webgl" ? "lg:col-span-8" : "lg:col-span-7"
          } bg-slate-900 border border-slate-800 rounded-2xl p-4 md:p-5 relative overflow-hidden shadow-lg flex flex-col items-center justify-between min-h-[520px]`}
        >
          {/* Top Status Badges */}
          <div className="w-full flex items-center justify-between border-b border-slate-800 pb-2.5 mb-3 text-slate-300">
            <div className="flex items-center gap-2 text-xs">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <span className="font-mono text-rose-400 font-bold uppercase">
                {current.id} ({current.name.split(" ")[0]})
              </span>
              <span className="text-slate-500">|</span>
              <span className="text-slate-400 font-medium">
                {renderEngine === "3d-webgl"
                  ? "MÔ HÌNH 3D WEBGL KHÔNG GIAN 3 CHIỀU (THREE.JS)"
                  : renderEngine === "ct-dicom"
                  ? "CẮT LỚP CT SCANNER THANG XÁM HOUNSFIELD CHUẨN DICOM"
                  : "BẢN ĐỒ GIẢI PHẪU THẦN KINH Y HỌC NETTER ATLAS HD"}
              </span>
            </div>

            {/* Midline shift & ICP Telemetry */}
            <div className="flex items-center gap-2">
              <div className="bg-slate-800 px-2 py-0.5 rounded text-[11px] font-mono text-amber-400 border border-slate-700">
                Lệch ĐG: <strong>{current.midlineShiftMm} mm</strong>
              </div>
              <div className="bg-slate-800 px-2 py-0.5 rounded text-[11px] font-mono text-rose-400 border border-slate-700">
                ICP: <strong>{current.icpEstimate} mmHg</strong>
              </div>
            </div>
          </div>

          {/* Quick Hotspot Badges Bar */}
          {showHotspots && activeHotspots.length > 0 && (
            <div className="w-full flex items-center gap-1.5 overflow-x-auto pb-2 mb-2 text-xs scrollbar-none">
              <span className="text-[10px] font-mono text-slate-400 font-semibold uppercase shrink-0 flex items-center gap-1 mr-1">
                <Crosshair className="w-3 h-3 text-rose-400" />
                <span>Mốc giải phẫu:</span>
              </span>
              {activeHotspots.map((hs) => {
                const isSelected = selectedHotspot?.id === hs.id;
                return (
                  <button
                    key={hs.id}
                    onClick={() => handleSelectHotspot(hs.id)}
                    className={`px-2 py-0.5 rounded-md text-[10px] font-medium shrink-0 transition-all flex items-center gap-1 border ${
                      isSelected
                        ? "bg-rose-600 text-white border-rose-500 shadow-xs scale-105"
                        : "bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 border-slate-700"
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span>{hs.label.split("(")[0]}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* VIEW ENGINE 1: 3D WEBGL RENDERING (THREE.JS) */}
          {renderEngine === "3d-webgl" && (
            <div className="w-full my-auto">
              <BrainHerniation3DCanvas
                activeType={activeType}
                onSelectHotspot={(lbl) => {
                  const match = current.hotspots.find((h) => h.label.includes(lbl));
                  if (match) setActiveHotspotId(match.id);
                }}
              />
            </div>
          )}

          {/* VIEW ENGINE 2 & 3: 2D HIGH-DEFINITION CT DICOM OR MEDICAL ATLAS */}
          {renderEngine !== "3d-webgl" && (
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeType}-${slicePlane}-${renderEngine}`}
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -10 }}
                transition={{ duration: 0.32, ease: "easeOut" }}
                className="w-full flex flex-col md:flex-row items-center justify-around gap-4 my-auto relative"
              >
                {/* 1. AXIAL CROSS-SECTION (HIGH-FIDELITY MEDICAL NEUROANATOMY) */}
                {(slicePlane === "axial" || slicePlane === "dual") && (
                  <div className="flex flex-col items-center w-full max-w-[360px] relative">
                    <span
                      className={`text-[10px] font-mono font-bold tracking-wider mb-1 px-2.5 py-0.5 rounded ${
                        renderEngine === "ct-dicom"
                          ? "bg-slate-950 text-rose-400 border border-slate-800"
                          : "bg-teal-950 text-teal-300 border border-teal-800"
                      }`}
                    >
                      {renderEngine === "ct-dicom"
                        ? "AXIAL CT SCANNER (CỬA SỔ NHU MÔ W:80 L:40)"
                        : "AXIAL ATLAS (MỨC ĐỒI THỊ - TRUNG NÃO - HỒI MÓC)"}
                    </span>

                    <svg viewBox="0 0 320 320" className="w-full h-76 sm:h-84 select-none drop-shadow-md">
                      <defs>
                        {/* CT Bone Window Gradient */}
                        <linearGradient id="ctBoneGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#ffffff" />
                          <stop offset="50%" stopColor="#e2e8f0" />
                          <stop offset="100%" stopColor="#cbd5e1" />
                        </linearGradient>

                        {/* CT Brain Parenchyma (W:80, L:40) */}
                        <radialGradient id="ctBrainGrad" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stopColor="#334155" />
                          <stop offset="70%" stopColor="#1e293b" />
                          <stop offset="100%" stopColor="#0f172a" />
                        </radialGradient>

                        {/* Medical Atlas Brain Color */}
                        <linearGradient id="atlasBrainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#f8fafc" />
                          <stop offset="70%" stopColor="#f1f5f9" />
                          <stop offset="100%" stopColor="#e2e8f0" />
                        </linearGradient>

                        {/* Hyperdense Acute Hematoma (+75 HU) */}
                        <radialGradient id="ctAcuteHematoma" cx="40%" cy="40%" r="60%">
                          <stop offset="0%" stopColor="#ffffff" />
                          <stop offset="40%" stopColor="#f87171" />
                          <stop offset="85%" stopColor="#b91c1c" />
                          <stop offset="100%" stopColor="#7f1d1d" />
                        </radialGradient>

                        {/* Hypodense Vasogenic Edema Rim (+15 HU) */}
                        <filter id="ctEdemaFilter" x="-40%" y="-40%" width="180%" height="180%">
                          <feGaussianBlur stdDeviation="5" result="blur" />
                          <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                      </defs>

                      {/* 1. CRANIAL BONE VAULT (BẢN SỌ 2 LỚP VÀ XƯƠNG XỐP DIPLOE) */}
                      {/* Outer table */}
                      <path
                        d="M160,20 C85,20 25,75 25,160 C25,245 85,300 160,300 C235,300 295,245 295,160 C295,75 235,20 160,20 Z"
                        fill="#020617"
                        stroke={renderEngine === "ct-dicom" ? "#ffffff" : "#64748b"}
                        strokeWidth="7"
                      />
                      {/* Diploe spongy bone layer */}
                      <path
                        d="M160,24 C88,24 31,77 31,160 C31,242 88,296 160,296 C232,296 289,242 289,160 C289,77 232,24 160,24 Z"
                        fill="none"
                        stroke={renderEngine === "ct-dicom" ? "#64748b" : "#94a3b8"}
                        strokeWidth="2.5"
                      />
                      {/* Inner table */}
                      <path
                        d="M160,27 C91,27 36,80 36,160 C36,239 91,293 160,293 C229,293 284,239 284,160 C284,80 229,27 160,27 Z"
                        fill={renderEngine === "ct-dicom" ? "url(#ctBrainGrad)" : "url(#atlasBrainGrad)"}
                        stroke={renderEngine === "ct-dicom" ? "#ffffff" : "#475569"}
                        strokeWidth="2"
                      />

                      {/* Frontal sinus (Xoang trán trước) */}
                      <path d="M152,24 Q160,28 168,24" stroke="#000000" strokeWidth="4" fill="none" />

                      {/* Orientation Markers */}
                      <text x="154" y="16" fill="#94a3b8" fontSize="8" fontWeight="bold" fontFamily="monospace">
                        TRƯỚC (A)
                      </text>
                      <text x="154" y="315" fill="#94a3b8" fontSize="8" fontWeight="bold" fontFamily="monospace">
                        SAU (P)
                      </text>
                      <text x="300" y="163" fill="#94a3b8" fontSize="8" fontWeight="bold" fontFamily="monospace">
                        P (R)
                      </text>
                      <text x="10" y="163" fill="#94a3b8" fontSize="8" fontWeight="bold" fontFamily="monospace">
                        T (L)
                      </text>

                      {/* 2. REALISTIC CORTICAL SULCI & GYRI (RÃNH CUỘN NÃO THẬT) */}
                      {/* Sylvian Fissure (Rãnh bên Sylvius) & Insular Cortex (Thùy đảo) */}
                      <path
                        d="M40,145 Q80,142 96,155 Q85,168 45,178"
                        stroke={renderEngine === "ct-dicom" ? "#020617" : "#cbd5e1"}
                        strokeWidth="2.5"
                        fill="none"
                      />
                      {/* Contralateral Sylvian Fissure */}
                      <path
                        d="M280,145 Q240,142 224,155 Q235,168 275,178"
                        stroke={renderEngine === "ct-dicom" ? "#020617" : "#cbd5e1"}
                        strokeWidth={activeType === "subfalcine" || activeType === "uncal" ? "1" : "2.5"}
                        fill="none"
                      />
                      {/* Frontal, Central & Parieto-Occipital Sulci */}
                      <path d="M70,85 Q95,95 125,75" stroke={renderEngine === "ct-dicom" ? "#020617" : "#cbd5e1"} strokeWidth="1.5" fill="none" />
                      <path d="M55,115 Q90,122 130,110" stroke={renderEngine === "ct-dicom" ? "#020617" : "#cbd5e1"} strokeWidth="1.5" fill="none" />
                      <path d="M65,225 Q100,215 130,235" stroke={renderEngine === "ct-dicom" ? "#020617" : "#cbd5e1"} strokeWidth="1.5" fill="none" />
                      <path d="M80,260 Q110,250 140,265" stroke={renderEngine === "ct-dicom" ? "#020617" : "#cbd5e1"} strokeWidth="1.5" fill="none" />

                      {/* 3. DEEP GRAY NUCLEI & INTERNAL CAPSULE (HẠCH NỀN & BAO TRONG) */}
                      {/* Left Caudate Nucleus Head (Đầu nhân đuôi trái) */}
                      <ellipse
                        cx="134"
                        cy="116"
                        rx="7"
                        ry="12"
                        fill={renderEngine === "ct-dicom" ? "#475569" : "#cbd5e1"}
                        stroke="#94a3b8"
                        strokeWidth="0.8"
                      />
                      {/* Left Lentiform Nucleus: Putamen & Globus Pallidus (Nhân bèo trái) */}
                      <path
                        d="M102,130 Q122,126 126,145 Q115,165 100,150 Z"
                        fill={renderEngine === "ct-dicom" ? "#475569" : "#cbd5e1"}
                        stroke="#94a3b8"
                        strokeWidth="0.8"
                      />
                      {/* Left Thalamus (Đồi thị trái) */}
                      <ellipse
                        cx="138"
                        cy="165"
                        rx="12"
                        ry="18"
                        fill={renderEngine === "ct-dicom" ? "#475569" : "#d8b4fe"}
                        stroke="#a855f7"
                        strokeWidth="0.8"
                      />
                      {/* Left Internal Capsule (Bao trong hình chữ V mở ra ngoài) */}
                      <path
                        d="M128,110 L126,135 L132,165"
                        stroke={renderEngine === "ct-dicom" ? "#334155" : "#fed7aa"}
                        strokeWidth="4.5"
                        fill="none"
                      />

                      {/* Right Thalamus & Basal Ganglia (Compressed in pathology) */}
                      <ellipse
                        cx={activeType === "subfalcine" || activeType === "uncal" ? "178" : "182"}
                        cy="165"
                        rx={activeType === "uncal" ? "9" : "12"}
                        ry="18"
                        fill={renderEngine === "ct-dicom" ? "#475569" : "#d8b4fe"}
                        stroke="#a855f7"
                        strokeWidth="0.8"
                      />

                      {/* 4. VENTRICULAR SYSTEM (HỆ THỐNG NÃO THẤT & DỊCH NÃO TỦY CSF) */}
                      {/* Left Frontal Horn (Sừng trán thất bên trái - giãn hoặc bình thường) */}
                      <path
                        d={
                          activeType === "subfalcine"
                            ? "M136,88 Q150,110 150,132 Q136,126 125,98 Z"
                            : "M142,94 Q152,110 152,128 Q142,122 134,100 Z"
                        }
                        fill={renderEngine === "ct-dicom" ? "#020617" : "#38bdf8"}
                        stroke={renderEngine === "ct-dicom" ? "#0f172a" : "#0284c7"}
                        strokeWidth="1.2"
                      />
                      {/* Right Frontal Horn (Đè xẹp thành khe mảnh do choán chỗ) */}
                      <path
                        d={
                          activeType === "subfalcine" || activeType === "uncal"
                            ? "M166,112 Q168,120 165,126 Q163,120 166,112 Z" // Collapsed slit
                            : "M178,94 Q168,110 168,128 Q178,122 186,100 Z"
                        }
                        fill={renderEngine === "ct-dicom" ? "#020617" : "#38bdf8"}
                        stroke={renderEngine === "ct-dicom" ? "#0f172a" : "#0284c7"}
                        strokeWidth="1.2"
                      />
                      {/* Third Ventricle (Não thất ba ở đường giữa) */}
                      <path
                        d={
                          activeType === "subfalcine" || activeType === "uncal"
                            ? `M${160 - current.midlineShiftMm * 1.8},145 L${160 - current.midlineShiftMm * 1.8},175`
                            : "M160,145 L160,175"
                        }
                        stroke={renderEngine === "ct-dicom" ? "#020617" : "#0284c7"}
                        strokeWidth={activeType === "central" ? "1" : "3"}
                      />

                      {/* 5. FALX CEREBRI (LIỀM ĐẠI NÃO DỌC GIỮA) */}
                      {activeType === "subfalcine" || activeType === "uncal" ? (
                        <path
                          d={`M160,30 Q${160 - current.midlineShiftMm * 2.2},125 160,285`}
                          stroke={renderEngine === "ct-dicom" ? "#ffffff" : "#e11d48"}
                          strokeWidth="3.5"
                          strokeDasharray="4 2"
                          fill="none"
                        />
                      ) : (
                        <line x1="160" y1="30" x2="160" y2="285" stroke="#94a3b8" strokeWidth="2.5" strokeDasharray="4 2" />
                      )}

                      {/* 6. MESENCEPHALON / MIDBRAIN (TRUNG NÃO HÌNH CHÚ CHUỘT MICKEY KINH ĐIỂN) */}
                      <g id="anatomicalMidbrain">
                        {/* Ambient Cistern (Bể quanh trung não chứa CSF) */}
                        <path
                          d={
                            activeType === "uncal"
                              ? "M118,142 C118,185 150,205 164,205 C175,200 186,188 188,172 C186,152 170,142 160,142 Z"
                              : "M118,142 C112,185 145,205 160,205 C175,205 208,185 202,142 C180,126 140,126 118,142 Z"
                          }
                          fill={renderEngine === "ct-dicom" ? "#020617" : "#bae6fd"}
                          stroke={renderEngine === "ct-dicom" ? "#0f172a" : "#0284c7"}
                          strokeWidth="1.2"
                        />

                        {/* Midbrain Body (Thân trung não) */}
                        <path
                          d={
                            activeType === "uncal"
                              ? "M132,148 C122,165 132,188 152,188 C165,188 175,178 175,160 C172,150 155,142 132,148 Z"
                              : "M132,148 C125,165 136,186 160,186 C184,186 195,165 188,148 C176,156 144,156 132,148 Z"
                          }
                          fill={renderEngine === "ct-dicom" ? "#334155" : "#e2e8f0"}
                          stroke="#64748b"
                          strokeWidth="1.5"
                        />

                        {/* Cerebral Peduncles (Hai tai Mickey - Cuống đại não) */}
                        <ellipse cx="144" cy="156" rx="9" ry="11" fill={renderEngine === "ct-dicom" ? "#475569" : "#cbd5e1"} stroke="#94a3b8" strokeWidth="1" />
                        <ellipse
                          cx={activeType === "uncal" ? "168" : "176"}
                          cy="156"
                          rx={activeType === "uncal" ? "7" : "9"}
                          ry="11"
                          fill={activeType === "uncal" ? "#fca5a5" : renderEngine === "ct-dicom" ? "#475569" : "#cbd5e1"}
                          stroke={activeType === "uncal" ? "#e11d48" : "#94a3b8"}
                          strokeWidth={activeType === "uncal" ? "2" : "1"}
                        />

                        {/* Substantia Nigra (Liềm đen giàu tế bào sinh Dopamine) */}
                        <path d="M138,162 Q144,166 150,164" stroke="#0f172a" strokeWidth="2.5" fill="none" />
                        <path
                          d={activeType === "uncal" ? "M165,164 Q170,165 174,162" : "M170,164 Q176,166 182,162"}
                          stroke="#0f172a"
                          strokeWidth="2.5"
                          fill="none"
                        />

                        {/* Red Nucleus (Nhân đỏ) */}
                        <circle cx="146" cy="172" r="3.2" fill="#f43f5e" opacity="0.8" />
                        <circle cx={activeType === "uncal" ? "166" : "174"} cy="172" r="3.2" fill="#f43f5e" opacity="0.8" />

                        {/* Cerebral Aqueduct of Sylvius (Cống não) */}
                        <circle cx="160" cy="176" r="2.8" fill={renderEngine === "ct-dicom" ? "#020617" : "#0284c7"} />
                      </g>

                      {/* 7. CRANIAL NERVE III & WILLIS CIRCLE (DÂY III & MẠCH MÁU) */}
                      {showVessels && (
                        <g>
                          {/* Left CN III (Normal) */}
                          <path d="M152,150 Q138,136 122,122" stroke="#fbbf24" strokeWidth="2.5" fill="none" />
                          <circle cx="122" cy="122" r="2.5" fill="#d97706" />

                          {/* Right CN III (Severely compressed/stretched in Uncal) */}
                          <path
                            d={
                              activeType === "uncal"
                                ? "M168,150 Q186,142 200,140"
                                : "M168,150 Q182,136 198,122"
                            }
                            stroke={activeType === "uncal" ? "#ef4444" : "#fbbf24"}
                            strokeWidth={activeType === "uncal" ? "3.5" : "2.5"}
                            fill="none"
                          />
                          {activeType === "uncal" && (
                            <g>
                              <circle cx="190" cy="142" r="5" fill="#ef4444" opacity="0.8" />
                              <circle cx="190" cy="142" r="3.5" fill="#ffffff" />
                            </g>
                          )}
                        </g>
                      )}

                      {/* 8. PATHOLOGY VECTORS & LESIONS */}
                      {activeType === "subfalcine" && (
                        <g>
                          {/* Right frontal acute epidural hematoma */}
                          <circle cx="225" cy="100" r="32" fill="url(#ctAcuteHematoma)" filter="url(#ctEdemaFilter)" />
                          <text x="208" y="103" fill="white" fontSize="9" fontWeight="bold">
                            EDH (+75 HU)
                          </text>

                          {/* Shift vector */}
                          <path d="M195,106 Q165,114 136,110" stroke="#f59e0b" strokeWidth="4.5" fill="none" />
                          <polygon points="136,110 145,104 143,116" fill="#f59e0b" />
                        </g>
                      )}

                      {activeType === "uncal" && (
                        <g>
                          {/* Right temporal acute subdural hematoma */}
                          <path
                            d="M276,120 C250,145 250,175 276,200 C286,180 286,140 276,120 Z"
                            fill="url(#ctAcuteHematoma)"
                            filter="url(#ctEdemaFilter)"
                          />
                          <text x="238" y="162" fill="white" fontSize="9" fontWeight="bold">
                            SDH (+75 HU)
                          </text>

                          {/* Herniating Uncus pushing into Midbrain */}
                          <path d="M216,158 Q192,164 178,160" stroke="#ef4444" strokeWidth="5" fill="none" />
                          <polygon points="178,160 188,154 186,166" fill="#ef4444" />

                          {/* Kernohan notch on contralateral side */}
                          <circle cx="128" cy="158" r="6" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" />
                        </g>
                      )}

                      {activeType === "central" && (
                        <g>
                          {/* Bilateral diffuse edema */}
                          <ellipse cx="160" cy="160" rx="55" ry="42" fill="#ef4444" opacity="0.3" />
                          {/* Concentric compression */}
                          <circle cx="160" cy="160" r="32" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="4 3" />
                        </g>
                      )}

                      {activeType === "tonsillar" && (
                        <g>
                          <circle cx="160" cy="160" r="42" fill="#dc2626" opacity="0.8" />
                          <text x="90" y="156" fill="#ffffff" fontSize="9" fontWeight="bold">
                            Hạnh Nhân Kẹt Lỗ Chẩm
                          </text>
                        </g>
                      )}

                      {activeType === "transcalvarial" && (
                        <g>
                          <line x1="284" y1="135" x2="290" y2="185" stroke="#020617" strokeWidth="10" />
                          <ellipse cx="304" cy="160" rx="18" ry="24" fill="#ef4444" opacity="0.85" />
                        </g>
                      )}

                      {/* 9. MIDLINE SHIFT CALIPERS (THƯỚC ĐO LỆCH ĐƯỜNG GIỮA CHUẨN CT) */}
                      {showMeasurements && (activeType === "subfalcine" || activeType === "uncal") && (
                        <g>
                          <line x1="160" y1="75" x2="160" y2="145" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2 2" />
                          <line
                            x1={160 - current.midlineShiftMm * 2.2}
                            y1="75"
                            x2={160 - current.midlineShiftMm * 2.2}
                            y2="145"
                            stroke="#ef4444"
                            strokeWidth="1.5"
                          />
                          <line
                            x1="160"
                            y1="105"
                            x2={160 - current.midlineShiftMm * 2.2}
                            y2="105"
                            stroke="#fbbf24"
                            strokeWidth="2.2"
                          />
                          <rect x="118" y="70" width="62" height="17" rx="4" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.2" />
                          <text x="122" y="82" fill="#fef08a" fontSize="8" fontWeight="bold" fontFamily="monospace">
                            Shift: {current.midlineShiftMm}mm
                          </text>
                        </g>
                      )}

                      {/* 10. ANATOMICAL LABELS (MỐC GIẢI PHẪU Y KHOA CHUẨN) */}
                      {showLandmarkLabels && (
                        <g opacity="0.85">
                          <text x="45" y="142" fill="#94a3b8" fontSize="6.5" fontWeight="bold">Rãnh Sylvius</text>
                          <text x="135" y="180" fill="#a855f7" fontSize="6.5" fontWeight="bold">Đồi thị</text>
                          <text x="138" y="160" fill="#64748b" fontSize="6.5" fontWeight="bold">Cuống não</text>
                        </g>
                      )}

                      {/* 11. INTERACTIVE HOTSPOTS */}
                      {showHotspots &&
                        current.hotspots
                          .filter((h) => h.plane === "axial")
                          .map((hs, index) => {
                            const isSelected = selectedHotspot?.id === hs.id;
                            return (
                              <g
                                key={hs.id}
                                className="cursor-pointer transition-transform hover:scale-115"
                                onClick={() => handleSelectHotspot(hs.id)}
                              >
                                <circle
                                  cx={hs.x + 10}
                                  cy={hs.y}
                                  r={isSelected ? "12" : "8.5"}
                                  fill={isSelected ? "#ef4444" : "#f59e0b"}
                                  opacity={isSelected ? "0.4" : "0.25"}
                                />
                                <circle
                                  cx={hs.x + 10}
                                  cy={hs.y}
                                  r={isSelected ? "7.5" : "6"}
                                  fill={isSelected ? "#dc2626" : "#f59e0b"}
                                  stroke="#ffffff"
                                  strokeWidth={isSelected ? "2.2" : "1.4"}
                                  className="shadow-lg"
                                />
                                <text
                                  x={hs.x + 10}
                                  y={hs.y + 2.5}
                                  textAnchor="middle"
                                  fontSize={isSelected ? "8" : "7"}
                                  fill="#ffffff"
                                  fontWeight="bold"
                                  fontFamily="monospace"
                                >
                                  {index + 1}
                                </text>
                              </g>
                            );
                          })}
                    </svg>
                  </div>
                )}

                {/* 2. CORONAL CROSS-SECTION (HIGH-FIDELITY MEDICAL NEUROANATOMY) */}
                {(slicePlane === "coronal" || slicePlane === "dual") && (
                  <div className="flex flex-col items-center w-full max-w-[360px] relative">
                    <span
                      className={`text-[10px] font-mono font-bold tracking-wider mb-1 px-2.5 py-0.5 rounded ${
                        renderEngine === "ct-dicom"
                          ? "bg-slate-950 text-sky-400 border border-slate-800"
                          : "bg-teal-950 text-teal-300 border border-teal-800"
                      }`}
                    >
                      CORONAL (MẶT CẮT TRÁN - LỀU TIỂU NÃO & LỖ CHẨM MCRAE)
                    </span>

                    <svg viewBox="0 0 320 320" className="w-full h-76 sm:h-84 select-none drop-shadow-md">
                      {/* Skull Vault */}
                      <path
                        d="M40,150 C40,55 100,32 160,32 C220,32 280,55 280,150 C280,220 245,260 205,270 L205,285 L115,285 L115,270 C75,260 40,220 40,150 Z"
                        fill="#020617"
                        stroke={renderEngine === "ct-dicom" ? "#ffffff" : "#64748b"}
                        strokeWidth="7"
                      />
                      <path
                        d="M47,150 C47,62 104,40 160,40 C216,40 273,62 273,150 C273,215 240,254 202,264 L202,280 L118,280 L118,264 C80,254 47,215 47,150 Z"
                        fill={renderEngine === "ct-dicom" ? "#1e293b" : "#f1f5f9"}
                        stroke={renderEngine === "ct-dicom" ? "#64748b" : "#94a3b8"}
                        strokeWidth="1.5"
                      />

                      {/* Crista Galli (Mào gà) & Superior Sagittal Sinus */}
                      <polygon points="160,36 156,48 164,48" fill="#ffffff" />
                      <polygon points="160,32 153,42 167,42" fill="#0284c7" />

                      {/* Falx Cerebri (Liềm đại não) */}
                      <line x1="160" y1="42" x2="160" y2="135" stroke="#64748b" strokeWidth="3.5" strokeDasharray="4 2" />

                      {/* Corpus Callosum (Thể chai) */}
                      <path d="M125,120 Q160,110 195,120 Q160,128 125,120 Z" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.2" />

                      {/* Lateral Ventricles */}
                      <path d="M138,110 Q152,128 152,148 Q138,142 128,122 Z" fill="#38bdf8" opacity="0.8" stroke="#0284c7" strokeWidth="1.2" />
                      <path
                        d={
                          activeType === "subfalcine" || activeType === "uncal"
                            ? "M166,128 Q168,136 165,144 Q163,136 166,128 Z"
                            : "M182,110 Q168,128 168,148 Q182,142 192,122 Z"
                        }
                        fill="#38bdf8"
                        opacity="0.8"
                        stroke="#0284c7"
                        strokeWidth="1.2"
                      />

                      {/* Tentorium Cerebelli (Lều tiểu não) */}
                      <line x1="56" y1="195" x2="128" y2="195" stroke="#38bdf8" strokeWidth="3.5" />
                      <line x1="264" y1="195" x2="192" y2="195" stroke="#38bdf8" strokeWidth="3.5" />
                      <text x="210" y="190" fill="#38bdf8" fontSize="7.5" fontWeight="bold" fontFamily="monospace">
                        Lều tiểu não
                      </text>

                      {/* Brainstem (Thân não cắt trán: Trung não, Cầu não, Hành não) */}
                      <path d="M136,165 L184,165 L178,252 L142,252 Z" fill="#fbcfe8" stroke="#64748b" strokeWidth="1.5" />
                      <text x="146" y="185" fill="#475569" fontSize="7.5" fontWeight="bold">Trung não</text>
                      <text x="148" y="215" fill="#475569" fontSize="7.5" fontWeight="bold">Cầu não</text>
                      <text x="148" y="244" fill="#475569" fontSize="7.5" fontWeight="bold">Hành não</text>

                      {/* Cerebellar Hemispheres */}
                      <ellipse cx="105" cy="226" rx="28" ry="20" fill="#e0e7ff" stroke="#94a3b8" strokeWidth="1.2" />
                      <ellipse cx="215" cy="226" rx="28" ry="20" fill="#e0e7ff" stroke="#94a3b8" strokeWidth="1.2" />

                      {/* Foramen Magnum McRae Line (Đường McRae nối Basion và Opisthion) */}
                      <line x1="118" y1="270" x2="202" y2="270" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="3 2" />
                      <text x="124" y="280" fill="#f43f5e" fontSize="7.5" fontWeight="bold" fontFamily="monospace">
                        Đường McRae (Lỗ Chẩm)
                      </text>

                      {/* Pathology on Coronal */}
                      {activeType === "subfalcine" && (
                        <g>
                          <circle cx="225" cy="110" r="26" fill="url(#ctAcuteHematoma)" />
                          <path d="M192,118 Q164,140 138,125" stroke="#f59e0b" strokeWidth="4.5" fill="none" />
                          <polygon points="138,125 147,120 145,132" fill="#f59e0b" />
                        </g>
                      )}

                      {activeType === "uncal" && (
                        <g>
                          <circle cx="236" cy="160" r="24" fill="url(#ctAcuteHematoma)" />
                          <path d="M212,172 Q188,192 172,200" stroke="#ef4444" strokeWidth="4.5" fill="none" />
                          <polygon points="172,200 181,195 179,206" fill="#ef4444" />
                          <circle cx="172" cy="200" r="5" fill="#ef4444" opacity="0.8" />
                        </g>
                      )}

                      {activeType === "central" && (
                        <g>
                          <line x1="148" y1="115" x2="148" y2="168" stroke="#ef4444" strokeWidth="4" />
                          <polygon points="148,168 144,160 152,160" fill="#ef4444" />
                          <line x1="172" y1="115" x2="172" y2="168" stroke="#ef4444" strokeWidth="4" />
                          <polygon points="172,168 168,160 176,160" fill="#ef4444" />
                        </g>
                      )}

                      {activeType === "tonsillar" && (
                        <g>
                          {/* Tonsils descending > 5mm below McRae */}
                          <path d="M136,242 Q138,284 146,286 Q154,272 154,242 Z" fill="#ef4444" opacity="0.85" />
                          <path d="M166,242 Q166,272 174,286 Q182,284 184,242 Z" fill="#ef4444" opacity="0.85" />
                        </g>
                      )}

                      {activeType === "transcalvarial" && (
                        <g>
                          <line x1="250" y1="72" x2="274" y2="100" stroke="#ef4444" strokeWidth="6" />
                          <ellipse cx="278" cy="86" rx="18" ry="14" fill="#ef4444" opacity="0.85" />
                        </g>
                      )}

                      {/* Hotspots for Coronal */}
                      {showHotspots &&
                        current.hotspots
                          .filter((h) => h.plane === "coronal")
                          .map((hs, index) => {
                            const isSelected = selectedHotspot?.id === hs.id;
                            return (
                              <g
                                key={hs.id}
                                className="cursor-pointer transition-transform hover:scale-115"
                                onClick={() => handleSelectHotspot(hs.id)}
                              >
                                <circle
                                  cx={hs.x + 10}
                                  cy={hs.y}
                                  r={isSelected ? "12" : "8.5"}
                                  fill={isSelected ? "#ef4444" : "#38bdf8"}
                                  opacity={isSelected ? "0.4" : "0.25"}
                                />
                                <circle
                                  cx={hs.x + 10}
                                  cy={hs.y}
                                  r={isSelected ? "7.5" : "6"}
                                  fill={isSelected ? "#dc2626" : "#0284c7"}
                                  stroke="#ffffff"
                                  strokeWidth={isSelected ? "2.2" : "1.4"}
                                  className="shadow-lg"
                                />
                                <text
                                  x={hs.x + 10}
                                  y={hs.y + 2.5}
                                  textAnchor="middle"
                                  fontSize={isSelected ? "8" : "7"}
                                  fill="#ffffff"
                                  fontWeight="bold"
                                  fontFamily="monospace"
                                >
                                  {index + 1}
                                </text>
                              </g>
                            );
                          })}
                    </svg>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          )}

          {/* DEDICATED HOTSPOT INSPECTOR CARD */}
          {selectedHotspot && showHotspots && (
            <div className="w-full bg-slate-950 border-2 border-rose-500/80 rounded-xl p-3.5 z-10 text-xs text-slate-300 mt-2 shadow-xl animate-in fade-in slide-in-from-bottom-2 duration-200">
              <div className="flex items-start justify-between border-b border-slate-800 pb-2">
                <div className="flex items-center gap-2">
                  <span className="p-1 rounded bg-rose-600 text-white font-mono text-[10px] font-bold">
                    <Crosshair className="w-3.5 h-3.5" />
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">{selectedHotspot.label}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-rose-950 text-rose-300 border border-rose-800">
                        {selectedHotspot.badge}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 italic font-mono block">
                      {selectedHotspot.latinName}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <span className="text-[10px] font-mono text-slate-500 bg-slate-900 px-2 py-0.5 rounded uppercase border border-slate-800">
                    Bình diện: {selectedHotspot.plane.toUpperCase()}
                  </span>
                  <button
                    onClick={() => setActiveHotspotId(null)}
                    className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800"
                    title="Đóng chi tiết điểm nhấn"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Hotspot Content Quadrants */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 mt-2.5 text-[11px]">
                <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-amber-400 font-bold block mb-1 flex items-center gap-1">
                    <Info className="w-3 h-3 text-amber-400" />
                    <span>Giải Phẫu & Cơ Chế Bệnh Sinh:</span>
                  </span>
                  <p className="text-slate-300 leading-relaxed">{selectedHotspot.anatomyDescription}</p>
                </div>

                <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-rose-400 font-bold block mb-1 flex items-center gap-1">
                    <Zap className="w-3 h-3 text-rose-400" />
                    <span>Triệu Chứng Thần Kinh Trực Tiếp:</span>
                  </span>
                  <p className="text-rose-200 leading-relaxed">{selectedHotspot.neurologicalSign}</p>
                </div>

                <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800 md:col-span-2">
                  <span className="text-sky-400 font-bold block mb-1 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-sky-400" />
                    <span>Ý Nghĩa Hình Ảnh Học (CT/MRI Imaging Pearl):</span>
                  </span>
                  <p className="text-slate-300 leading-relaxed">{selectedHotspot.imagingPearl}</p>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Anatomical Comparison Callout if no hotspot selected */}
          {!selectedHotspot && (
            <div className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-3 z-10 text-xs text-slate-300 mt-2">
              <div className="flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block mb-0.5">
                    Đặc Điểm Hình Ảnh Học {slicePlane === "axial" ? "Trên Mặt Cắt Ngang (Axial CT)" : "Trên Mặt Cắt Đứng Trán (Coronal)"}:
                  </span>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    {slicePlane === "axial" ? current.axialAnatomyNote : current.coronalAnatomyNote}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right: Pathophysiological, Cushing Monitor & Action Protocol */}
        <div className={`${slicePlane === "dual" && renderEngine !== "3d-webgl" ? "lg:col-span-4" : "lg:col-span-5"} space-y-4`}>
          {/* Real-time Cushing Triad & ICP Monitor Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-white shadow-md space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-rose-400" />
                <span>Theo Dõi Monitor Huyết Động & Tam Chứng Cushing</span>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 font-bold">
                CRITICAL
              </span>
            </div>

            {/* Vitals Grid with Motion Updates */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeType}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-3 gap-2 text-center"
              >
                {/* Blood Pressure */}
                <div className="bg-slate-800/90 p-2.5 rounded-xl border border-slate-700">
                  <span className="text-[10px] text-slate-400 block font-mono">Huyết Áp (HA)</span>
                  <span className="text-sm md:text-base font-bold font-mono text-amber-400 mt-0.5 block">
                    {current.cushingVitals.bp}
                  </span>
                  <span className="text-[9px] text-rose-300 block mt-0.5">Tăng kẹp rộng</span>
                </div>

                {/* Heart Rate */}
                <div className="bg-slate-800/90 p-2.5 rounded-xl border border-slate-700">
                  <span className="text-[10px] text-slate-400 block font-mono">Nhịp Tim (HR)</span>
                  <span className="text-sm md:text-base font-bold font-mono text-sky-400 mt-0.5 block">
                    {current.cushingVitals.hr} bpm
                  </span>
                  <span className="text-[9px] text-sky-300 block mt-0.5">Mạch chậm</span>
                </div>

                {/* Respiratory Rate */}
                <div className="bg-slate-800/90 p-2.5 rounded-xl border border-slate-700">
                  <span className="text-[10px] text-slate-400 block font-mono">Nhịp Thở</span>
                  <span className="text-xs md:text-xs font-bold font-mono text-emerald-400 mt-0.5 block line-clamp-1">
                    {current.cushingVitals.rr.split(" ")[0]}
                  </span>
                  <span className="text-[9px] text-slate-400 block mt-0.5 line-clamp-1">
                    {current.cushingVitals.rr.split("(")[1]?.replace(")", "") || "Bất thường"}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Interactive Dynamic Pupil Graphics Display */}
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-400 font-medium flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-teal-400" />
                  <span>Hình Thái Đồng Tử Tại Giường:</span>
                </span>
                <span className="text-[10px] font-mono text-teal-400">{current.eyeSign.label}</span>
              </div>

              <div className="flex items-center justify-around py-1 bg-slate-900/80 rounded-lg border border-slate-800">
                {/* Right Eye */}
                <div className="flex flex-col items-center gap-1">
                  <span className="text-[9px] font-mono text-slate-400">MẮT PHẢI (P)</span>
                  <div className="w-14 h-9 bg-slate-200 rounded-full border border-slate-400 relative flex items-center justify-center overflow-hidden">
                    <div className="w-7 h-7 rounded-full bg-amber-900 flex items-center justify-center">
                      <div
                        className="rounded-full bg-slate-950 transition-all duration-300"
                        style={{
                          width: `${current.eyeSign.rightPupilSize * 2.8}px`,
                          height: `${current.eyeSign.rightPupilSize * 2.8}px`
                        }}
                      />
                    </div>
                    {current.eyeSign.ptosisRight && (
                      <div className="absolute top-0 inset-x-0 h-4 bg-amber-200/90 border-b border-amber-400" />
                    )}
                  </div>
                  <span className="text-[10px] font-mono font-bold text-white">
                    {current.eyeSign.rightPupilSize} mm {current.eyeSign.rightReact ? "(+)" : "(- PX)"}
                  </span>
                </div>

                <div className="h-10 w-px bg-slate-800" />

                {/* Left Eye */}
                <div className="flex flex-col items-center gap-1">
                  <span className="text-[9px] font-mono text-slate-400">MẮT TRÁI (T)</span>
                  <div className="w-14 h-9 bg-slate-200 rounded-full border border-slate-400 relative flex items-center justify-center overflow-hidden">
                    <div className="w-7 h-7 rounded-full bg-amber-900 flex items-center justify-center">
                      <div
                        className="rounded-full bg-slate-950 transition-all duration-300"
                        style={{
                          width: `${current.eyeSign.leftPupilSize * 2.8}px`,
                          height: `${current.eyeSign.leftPupilSize * 2.8}px`
                        }}
                      />
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-white">
                    {current.eyeSign.leftPupilSize} mm {current.eyeSign.leftReact ? "(+)" : "(- PX)"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Clinical Diagnostics Card with Motion Transitions */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeType}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="bg-slate-50 border border-slate-200 rounded-2xl p-4 md:p-5 space-y-4 shadow-xs"
            >
              <div className="border-b border-slate-200 pb-3">
                <span className="text-[11px] font-mono text-rose-700 font-semibold uppercase tracking-wider">
                  {current.name}
                </span>
                <h4 className="text-lg font-bold text-slate-900 mt-0.5">{current.vietnameseName}</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {current.anatomicalMechanism}
                </p>
              </div>

              {/* Triad of Findings */}
              <div className="space-y-2 text-xs">
                <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
                  <div className="flex items-center gap-1.5 text-amber-800 font-semibold mb-1">
                    <Activity className="w-3.5 h-3.5 text-amber-600" />
                    <span>Vận động & Tư thế co cứng:</span>
                  </div>
                  <p className="text-slate-700 text-[11px] leading-relaxed">{current.motorSign}</p>
                </div>

                <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
                  <div className="flex items-center gap-1.5 text-rose-800 font-semibold mb-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                    <span>Kiểu rối loạn hô hấp & Nguy cơ Cushing:</span>
                  </div>
                  <p className="text-slate-700 text-[11px] leading-relaxed">{current.respiratorySign}</p>
                </div>
              </div>

              {/* Immediate Actions Checklist */}
              <div className="space-y-1.5">
                <span className="text-xs font-semibold text-slate-900 flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
                  <span>Phác đồ xử trí khẩn cấp (Neurocritical Protocol):</span>
                </span>
                <div className="space-y-1.5">
                  {current.urgentInterventions.map((action, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 flex items-start gap-2 shadow-2xs"
                    >
                      <span className="text-rose-600 font-bold shrink-0">{idx + 1}.</span>
                      <span className="leading-relaxed text-[11px]">{action}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
