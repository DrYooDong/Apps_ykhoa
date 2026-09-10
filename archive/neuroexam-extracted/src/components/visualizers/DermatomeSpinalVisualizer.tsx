import React, { useState } from "react";
import {
  Layers,
  ShieldAlert,
  Sparkles,
  RefreshCw,
  Zap,
  Activity,
  Info,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Disc,
  Stethoscope,
  Maximize2
} from "lucide-react";

export type DermatomeLevel =
  | "C2"
  | "C4"
  | "C5"
  | "C6"
  | "C7"
  | "C8"
  | "T4"
  | "T10"
  | "L1"
  | "L3"
  | "L4"
  | "L5"
  | "S1"
  | "S2-S5";

export type DisplayMode = "dermatome" | "spine_disc" | "dual_integrated";
export type BodyView = "anterior" | "posterior" | "both";

export interface DermatomeData {
  code: DermatomeLevel;
  region: string;
  name: string;
  landmark: string;
  colorHex: string;
  painPattern: string;
  sensoryLoss: string;
  keySensoryPoint: string;
  motorWeakness: string;
  myotomeAction: string;
  mrcTestDescription: string;
  reflex: string;
  reflexGradeTypical: string;
  discLevel: string;
  compressedRootType: string;
  surgicalRule: string;
  provocativeTests: {
    name: string;
    description: string;
    sensitivity: string;
  }[];
  clinicalPearls: string;
  isRedFlag?: boolean;
}

const DERMATOME_DATABASE: Record<DermatomeLevel, DermatomeData> = {
  C2: {
    code: "C2",
    region: "Cột sống cổ cao (Upper Cervical)",
    name: "Rễ Thần Kinh C2",
    landmark: "Củ chẩm ngoài & Vùng da đầu sau đỉnh tai",
    colorHex: "#f43f5e",
    painPattern: "Đau nhức nửa đầu sau (Đau dây thần kinh Arnold / Chẩm lớn)",
    sensoryLoss: "Vùng chẩm sau gáy, góc hàm dưới và sau tai",
    keySensoryPoint: "Mấu chẩm ngoài (Ít nhất 3cm sau tai)",
    motorWeakness: "Các cơ dưới chẩm sâu (xoay ngửa đầu cổ)",
    myotomeAction: "Xoay và ngửa đầu nhẹ",
    mrcTestDescription: "Yếu các vận động tinh tế gập duỗi trục sọ - cổ",
    reflex: "Không có phản xạ gân xương chuyên biệt",
    reflexGradeTypical: "Không áp dụng",
    discLevel: "C1-C2 (Trật khớp đội - trục / Đau khớp C1-C2)",
    compressedRootType: "Rễ thoát C2",
    surgicalRule: "Cổ cao không có đĩa đệm C1-C2; chèn ép thường do thoái hóa mỏm nha hoặc viêm khớp dạng thấp.",
    provocativeTests: [
      {
        name: "Nghiệm pháp ấn điểm Arnold",
        description: "Ấn vào điểm giữa đường nối củ chẩm ngoài và mỏm chũm gây đau nhói lan lên đỉnh đầu.",
        sensitivity: "85%"
      }
    ],
    clinicalPearls: "Cần cảnh giác trật khớp đội trục (Atlantoaxial subluxation) ở bệnh nhân viêm cột sống dính khớp hoặc viêm khớp dạng thấp."
  },
  C4: {
    code: "C4",
    region: "Cột sống cổ giữa (Mid Cervical)",
    name: "Rễ Thần Kinh C4",
    landmark: "Khớp cùng vai & bờ trên cơ thang",
    colorHex: "#38bdf8",
    painPattern: "Đau gốc cổ lan xuống bờ trên xương bả vai và ngực trên",
    sensoryLoss: "Vùng bờ trên vai, không vượt quá mỏm cùng vai",
    keySensoryPoint: "Mặt trên khớp cùng đòn (Acromioclavicular joint)",
    motorWeakness: "Cơ hoành (C3, C4, C5 giữ nhịp thở sống còn!) & Cơ nâng vai",
    myotomeAction: "Nâng vai (Shrug shoulders) & Hô hấp",
    mrcTestDescription: "Yếu động tác nhún vai đối kháng hai bên",
    reflex: "Không có phản xạ gân xương đặc hiệu",
    reflexGradeTypical: "Không áp dụng",
    discLevel: "Đĩa đệm C3-C4",
    compressedRootType: "Rễ C4 thoát ra qua lỗ liên hợp C3-C4",
    surgicalRule: "Rễ thần kinh cổ thoát ra TRÊN cuống đốt sống cùng số (Rễ C4 đi trên đốt C4 qua lỗ liên hợp C3-C4).",
    provocativeTests: [
      {
        name: "Nghiệm pháp Spurling cổ",
        description: "Nghiêng đầu sang bên đau và ấn nhẹ đỉnh đầu, tái hiện cảm giác đau buốt lan lên vai.",
        sensitivity: "60% (Đặc hiệu 93%)"
      }
    ],
    clinicalPearls: "Tổn thương rễ C4 phối hợp có thể làm cơ hoành một bên nâng cao bất thường trên X-quang phổi."
  },
  C5: {
    code: "C5",
    region: "Cột sống cổ (C-Spine)",
    name: "Rễ Thần Kinh C5",
    landmark: "Mặt ngoài cánh tay (Vùng phủ cơ Delta)",
    colorHex: "#6366f1",
    painPattern: "Đau từ cổ lan xuống bờ ngoài vai và mặt ngoài cánh tay đến khuỷu",
    sensoryLoss: "Mặt ngoài cánh tay trên (Vùng cơ delta)",
    keySensoryPoint: "Mặt ngoài của hố khuỷu (Gần phía trên lồi cầu ngoài)",
    motorWeakness: "Dạng cánh tay (Cơ delta) & Gập khuỷu tay (Cơ nhị đầu)",
    myotomeAction: "Dạng cánh tay 90° đối kháng (Abduction of shoulder)",
    mrcTestDescription: "Bệnh nhân không thể đưa cánh tay sang ngang hoặc chải đầu",
    reflex: "Phản xạ gân cơ nhị đầu cánh tay (Biceps Reflex - C5, C6)",
    reflexGradeTypical: "Giảm hoặc mất (0 hoặc 1+)",
    discLevel: "Đĩa đệm C4-C5",
    compressedRootType: "Rễ C5 đi qua lỗ liên hợp C4-C5",
    surgicalRule: "Thoát vị C4-C5 chèn ép rễ C5; bảo tồn duỗi khuỷu và cảm giác bàn tay.",
    provocativeTests: [
      {
        name: "Nghiệm pháp giảm đau dạng vai (Bakody sign)",
        description: "Bệnh nhân đặt bàn tay bên đau lên đỉnh đầu, triệu chứng đau rễ C5 giảm bớt do giảm căng rễ.",
        sensitivity: "75%"
      },
      {
        name: "Test Spurling C5",
        description: "Gây đau nhói lan tới vùng cơ delta mặt ngoài cánh tay.",
        sensitivity: "65%"
      }
    ],
    clinicalPearls: "Phân biệt với rách chóp xoay vai (Rotator cuff tear): Bệnh lý rễ C5 kèm giảm phản xạ gân nhị đầu và tê bì da."
  },
  C6: {
    code: "C6",
    region: "Cột sống cổ (C-Spine)",
    name: "Rễ Thần Kinh C6",
    landmark: "Mặt quay cẳng tay, ngón tay cái & ngón trỏ",
    colorHex: "#06b6d4",
    painPattern: "Đau lan từ cổ dọc theo mặt trước-ngoài cẳng tay xuống tận ngón cái",
    sensoryLoss: "Bờ quay cẳng tay, mu đốt xa ngón tay cái và ngón trỏ",
    keySensoryPoint: "Mặt mu của đốt ngón gần ngón tay cái (Thumb)",
    motorWeakness: "Duỗi cổ tay (Cơ duỗi cổ tay quay dài & ngắn) & Gập khuỷu",
    myotomeAction: "Duỗi cổ tay chống lại lực cản (Wrist extension)",
    mrcTestDescription: "Khó giữ cổ tay duỗi ngược khi thầy thuốc ấn xuống",
    reflex: "Phản xạ gân cơ cánh tay quay (Brachioradialis Reflex) & Cơ nhị đầu",
    reflexGradeTypical: "Giảm rõ rệt (1+ hoặc 0)",
    discLevel: "Đĩa đệm C5-C6",
    compressedRootType: "Rễ C6 đi qua lỗ liên hợp C5-C6",
    surgicalRule: "Tầng đĩa đệm C5-C6 là tầng thoái hóa và thoát vị phổ biến thứ 2 ở cột sống cổ (~25%).",
    provocativeTests: [
      {
        name: "Nghiệm pháp Spurling A & B",
        description: "Đau buốt bắn dọc theo đường viền ngoài cẳng tay cắm xuống ngón tay cái.",
        sensitivity: "70%"
      }
    ],
    clinicalPearls: "Phân biệt với Hội chứng ống cổ tay (CTS): Rễ C6 yếu cơ duỗi cổ tay và giảm phản xạ cánh tay quay, CTS thì phản xạ bình thường."
  },
  C7: {
    code: "C7",
    region: "Cột sống cổ (C-Spine)",
    name: "Rễ Thần Kinh C7 (Hay gặp nhất chi trên)",
    landmark: "Ngón tay giữa & Mặt sau cẳng tay",
    colorHex: "#a855f7",
    painPattern: "Đau mặt sau cánh tay qua khuỷu, mặt sau cẳng tay bắn thẳng vào ngón giữa",
    sensoryLoss: "Mặt mu ngón tay giữa (Middle finger)",
    keySensoryPoint: "Mặt mu của đốt ngón giữa ngón tay giữa",
    motorWeakness: "Duỗi cẳng tay (Cơ tam đầu) & Gập cổ tay, duỗi các ngón tay",
    myotomeAction: "Đẩy thẳng khuỷu tay đối kháng (Elbow extension - Triceps)",
    mrcTestDescription: "Bệnh nhân không thể đẩy tạ hoặc chống tay đẩy người dậy",
    reflex: "Phản xạ gân cơ tam đầu cánh tay (Triceps Reflex - C7)",
    reflexGradeTypical: "Mất hoặc suy giảm nặng (0 - 1+)",
    discLevel: "Đĩa đệm C6-C7",
    compressedRootType: "Rễ C7 đi qua lỗ liên hợp C6-C7",
    surgicalRule: "Thoát vị C6-C7 chiếm tới 60-70% toàn bộ bệnh lý rễ thần kinh cổ trong phẫu thuật thần kinh.",
    provocativeTests: [
      {
        name: "Thử nghiệm gõ mỏm khuỷu & Triceps",
        description: "Mất phản xạ giật cẳng tay cơ tam đầu.",
        sensitivity: "80%"
      },
      {
        name: "Dấu hiệu Lhermitte",
        description: "Gập cổ đột ngột gây cảm giác điện giật dọc sống lưng xuống cánh tay (nếu có chèn ép tủy cổ kèm theo).",
        sensitivity: "45% (Chỉ điểm Myelopathy)"
      }
    ],
    clinicalPearls: "Rễ C7 là 'ông vua' của bệnh rễ cổ. Nhìn ngón giữa tê + mất phản xạ gân tam đầu = chỉ điểm ngay C6-C7."
  },
  C8: {
    code: "C8",
    region: "Cột sống cổ - ngực (Cervicothoracic)",
    name: "Rễ Thần Kinh C8",
    landmark: "Ngón tay út, ngón nhẫn & bờ trong cẳng tay",
    colorHex: "#ec4899",
    painPattern: "Đau dọc bờ trụ cẳng tay lan xuống ngón nhẫn và ngón út",
    sensoryLoss: "Ngón 5 (ngón út), nửa trong ngón 4 và bờ trụ bàn tay",
    keySensoryPoint: "Mặt mu của đốt ngón gần ngón tay út (Little finger)",
    motorWeakness: "Nắm chặt bàn tay (Gập các ngón tay sâu) & Các cơ nội tại bàn tay",
    myotomeAction: "Nắm chặt bàn tay & Xòe khép ngón tay (Interossei)",
    mrcTestDescription: "Lực nắm bàn tay yếu, bệnh nhân đánh rơi đồ vật",
    reflex: "Không có phản xạ gân xương chuyên biệt cho rễ C8",
    reflexGradeTypical: "Không áp dụng",
    discLevel: "Đĩa đệm C7-T1",
    compressedRootType: "Rễ C8 đi qua lỗ liên hợp C7-T1",
    surgicalRule: "Đốt sống cổ chỉ có 7 đốt (C1-C7) nhưng có 8 rễ cổ. Rễ C8 thoát ra DƯỚI đốt C7 và TRÊN đốt ngực T1.",
    provocativeTests: [
      {
        name: "Nghiệm pháp kẹp giấy Froment biến thể",
        description: "Yếu các cơ gian cốt mu tay và khép ngón cái.",
        sensitivity: "65%"
      }
    ],
    clinicalPearls: "Cần loại trừ U đỉnh phổi Pancoast chèn ép thân dưới đám rối thần kinh cánh tay (Hội chứng Horner: sụp mi, co đồng tử, giảm tiết mồ hôi mặt)."
  },
  T4: {
    code: "T4",
    region: "Cột sống ngực cao (Thoracic Spine)",
    name: "Khoanh Tủy Ngực T4",
    landmark: "Đường ngang qua hai núm vú (Nipple line)",
    colorHex: "#e11d48",
    painPattern: "Đau rát bỏng vòng quanh ngực kiểu thắt đai (Girdle-like band pain)",
    sensoryLoss: "Mất cảm giác nông từ ngang đường liên vú trở xuống chi dưới",
    keySensoryPoint: "Khoang gian sườn 4 tại đường nách giữa (Ngang mức núm vú)",
    motorWeakness: "Liệt hai chi dưới kiểu UMN (Co cứng, tăng trương lực cơ)",
    myotomeAction: "Cơ hô hấp gian sườn trên",
    mrcTestDescription: "Liệt 2 chân hoàn toàn nếu tổn thương tủy cắt ngang",
    reflex: "Tăng phản xạ gân xương bánh chè & gót 2 bên (3+ đến 4+ kèm Clonus), Babinski (+) 2 bên",
    reflexGradeTypical: "Tăng phản xạ bệnh lý (3+ hoặc 4+)",
    discLevel: "Đĩa đệm T3-T4 hoặc khối u màng tủy / Viêm tủy cắt ngang T4",
    compressedRootType: "Khoanh tủy ngực T4",
    surgicalRule: "Chèn ép tủy ngực T4 là cấp cứu ngoại khoa! Cần chụp MRI tủy ngực có tiêm tương phản khẩn cấp.",
    provocativeTests: [
      {
        name: "Dấu hiệu Beevor",
        description: "Khám thành bụng khi gập cổ: xác định ranh giới định khu tổn thương tủy ngực.",
        sensitivity: "70%"
      }
    ],
    clinicalPearls: "Mức cảm giác T4 là mốc ranh giới vàng trong cấp cứu thần kinh: chẩn đoán phân biệt Viêm tủy thị thần kinh (NMO), xơ cứng rải rác (MS) và u chèn ép tủy.",
    isRedFlag: true
  },
  T10: {
    code: "T10",
    region: "Cột sống ngực thấp (Lower Thoracic)",
    name: "Khoanh Tủy Ngực T10",
    landmark: "Đường ngang qua rốn (Umbilicus)",
    colorHex: "#f97316",
    painPattern: "Đau buốt vòng quanh thắt lưng chạy ra trước bụng quanh rốn",
    sensoryLoss: "Mất cảm giác từ ngang rốn trở xuống đến hai bàn chân",
    keySensoryPoint: "Khoang gian sườn 10 tại đường nách giữa (Ngang mức rốn)",
    motorWeakness: "Liệt 2 chi dưới, rối loạn kiểm soát cơ vòng bàng quang",
    myotomeAction: "Thành bụng dưới & Cơ hoành bụng",
    mrcTestDescription: "Bệnh nhân không thể nhấc chân, bí tiểu cấp",
    reflex: "Mất phản xạ da bụng dưới, tăng phản xạ gót/gối, Babinski (+) 2 bên",
    reflexGradeTypical: "Babinski (+), Mất phản xạ da bụng",
    discLevel: "Đốt sống T9-T10",
    compressedRootType: "Tủy ngực đoạn rốn",
    surgicalRule: "Đoạn tủy T10 nằm tương ứng thân đốt sống ngực T9 do hiện tượng tủy sống ngắn hơn ống sống.",
    provocativeTests: [
      {
        name: "Dấu hiệu Beevor điển hình",
        description: "Khi bệnh nhân gập đầu lên lúc nằm ngửa, rốn bị kéo giật ngược LÊN TRÊN do cơ bụng trên còn lực (T7-T9) còn cơ bụng dưới bị liệt (T10-T12).",
        sensitivity: "90% (Đặc hiệu cho tổn thương mức T10)"
      }
    ],
    clinicalPearls: "Dấu hiệu Beevor (+) có giá trị định khu cực kỳ chính xác cho tổn thương tủy ngực ngang mức T10.",
    isRedFlag: true
  },
  L1: {
    code: "L1",
    region: "Cột sống thắt lưng cao (Upper Lumbar)",
    name: "Rễ Thần Kinh L1",
    landmark: "Nếp bẹn & Vùng mu trên",
    colorHex: "#84cc16",
    painPattern: "Đau từ thắt lưng trên lan xiên chéo xuống nếp bẹn và háng",
    sensoryLoss: "Dải da ngang nếp bẹn và trên mu",
    keySensoryPoint: "Điểm giữa của dây chằng bẹn",
    motorWeakness: "Gập khớp háng nhẹ (Cơ thắt lưng chậu L1-L3)",
    myotomeAction: "Gập đùi vào thân mình",
    mrcTestDescription: "Yếu động tác nhấc đùi khi ngồi",
    reflex: "Phản xạ cơ bìu (Cremasteric reflex L1-L2)",
    reflexGradeTypical: "Mất phản xạ cơ bìu cùng bên",
    discLevel: "Đĩa đệm L1-L2",
    compressedRootType: "Rễ L1",
    surgicalRule: "Tầng L1-L2 là vị trí tận cùng của Tủy sống (Nón tủy - Conus Medullaris kết thúc ở bờ dưới L1 hoặc bờ trên L2).",
    provocativeTests: [
      {
        name: "Nghiệm pháp căng thần kinh đùi trên",
        description: "Nằm sấp gấp gối gây đau buốt vùng bẹn.",
        sensitivity: "60%"
      }
    ],
    clinicalPearls: "Thoát vị đĩa đệm ở tầng L1-L2 có thể gây Hội chứng Nón tủy (Conus Medullaris Syndrome) kết hợp cả tổn thương neuron vận động trên và dưới."
  },
  L3: {
    code: "L3",
    region: "Cột sống thắt lưng (Lumbar Spine)",
    name: "Rễ Thần Kinh L3",
    landmark: "Mặt trước đùi & Lồi cầu trong xương đùi",
    colorHex: "#eab308",
    painPattern: "Đau mặt trước trong đùi lan xuống mặt trong đầu gối",
    sensoryLoss: "Mặt trước giữa đùi và trên lồi cầu trong xương đùi",
    keySensoryPoint: "Trên lồi cầu trong xương đùi (Medial femoral condyle)",
    motorWeakness: "Duỗi đầu gối (Cơ tứ đầu đùi) & Gập khớp háng (Cơ thắt lưng chậu)",
    myotomeAction: "Duỗi khớp gối chống lại sức cản (Knee extension)",
    mrcTestDescription: "Bệnh nhân khó leo cầu thang, cảm giác sụm chân khi bước",
    reflex: "Phản xạ gân xương bánh chè (Patellar Reflex L2-L4)",
    reflexGradeTypical: "Giảm rõ (1+)",
    discLevel: "Đĩa đệm L2-L3",
    compressedRootType: "Rễ L3",
    surgicalRule: "Thoát vị L2-L3 cạnh trung tâm chèn rễ L3 đi ngang; thoát vị lỗ liên hợp chèn rễ L2 thoát ra.",
    provocativeTests: [
      {
        name: "Nghiệm pháp căng thần kinh đùi (Femoral Stretch Test / Ely test)",
        description: "Bệnh nhân nằm sấp, gấp cẳng chân vào mông và nâng đùi: tái hiện đau buốt mặt trước đùi.",
        sensitivity: "85% (Rất nhạy cho rễ L2, L3, L4)"
      }
    ],
    clinicalPearls: "Đau rễ L3 và L4 có nghiệm pháp Lasègue âm tính nhưng Nghiệm pháp căng thần kinh đùi (nằm sấp) lại dương tính mạnh."
  },
  L4: {
    code: "L4",
    region: "Cột sống thắt lưng (L-Spine)",
    name: "Rễ Thần Kinh L4",
    landmark: "Xương bánh chè & Mặt trong cẳng chân đến mắt cá trong",
    colorHex: "#14b8a6",
    painPattern: "Đau từ thắt lưng lan chéo qua mặt trước đùi, mặt trước gối xuống mặt trong cẳng chân",
    sensoryLoss: "Mặt trước gối, mặt trong cẳng chân đến đỉnh mắt cá trong",
    keySensoryPoint: "Mắt cá trong (Medial malleolus)",
    motorWeakness: "Duỗi đầu gối (Cơ tứ đầu đùi - Quadriceps) & Gấp mu bàn chân vào trong (Cơ chày trước)",
    myotomeAction: "Đá thẳng cẳng chân (Knee extension) & Đi bằng gót chân nghiêng trong",
    mrcTestDescription: "Thụt gối khi đi xuống dốc hoặc ngồi xổm đứng dậy (Squat & rise test yếu)",
    reflex: "Phản xạ gân xương bánh chè (Patellar Reflex - L4 kinh điển)",
    reflexGradeTypical: "Mất hoặc suy giảm nặng (0 - 1+)",
    discLevel: "Đĩa đệm L3-L4",
    compressedRootType: "Rễ L4 (khi thoát vị đĩa đệm L3-L4 cạnh trung tâm)",
    surgicalRule: "Thoát vị L3-L4 cạnh trung tâm chèn rễ L4 đi ngang (Traversing L4 root).",
    provocativeTests: [
      {
        name: "Nghiệm pháp gõ gân bánh chè",
        description: "Mất hoặc giảm rõ rệt đáp ứng giật cơ tứ đầu đùi so với bên lành.",
        sensitivity: "90%"
      },
      {
        name: "Nghiệm pháp ngồi xổm đứng dậy (Squat Test)",
        description: "Bệnh nhân không thể đứng dậy từ tư thế ngồi xổm do yếu cơ tứ đầu đùi.",
        sensitivity: "80%"
      }
    ],
    clinicalPearls: "Bộ ba kinh điển rễ L4: Đau mặt trong cẳng chân + Yếu cơ tứ đầu đùi + Mất phản xạ gân xương bánh chè."
  },
  L5: {
    code: "L5",
    region: "Cột sống thắt lưng (L-Spine)",
    name: "Rễ Thần Kinh L5 (Phổ biến nhất lâm sàng)",
    landmark: "Mu bàn chân, kẽ ngón chân 1 - 2 & Ngón chân cái",
    colorHex: "#10b981",
    painPattern: "Đau mặt sau-ngoài đùi, mặt trước-ngoài cẳng chân, mu bàn chân lan tới ngón chân cái",
    sensoryLoss: "Mặt ngoài cẳng chân, toàn bộ mu bàn chân và kẽ ngón chân 1 - 2",
    keySensoryPoint: "Mặt mu của khớp bàn - ngón chân cái (Dorsum of 3rd MTP or 1st Web Space)",
    motorWeakness: "Duỗi ngón chân cái (EHL) & Gấp mu bàn chân (Cơ chày trước) -> BÀN CHÂN RŨ (FOOT DROP)",
    myotomeAction: "Bẻ ngược ngón chân cái lên trên (Great toe extension - EHL) & Đi bằng gót chân",
    mrcTestDescription: "Bệnh nhân KHÔNG THỂ ĐI BẰNG GÓT CHÂN (Heel Walking Test thất bại)",
    reflex: "Không có phản xạ gân xương tin cậy (Phản xạ gân chày sau ít dùng)",
    reflexGradeTypical: "Phản xạ gân gối và gót vẫn bình thường!",
    discLevel: "Đĩa đệm L4-L5",
    compressedRootType: "Rễ L5 đi ngang (Traversing L5 root trong thoát vị L4-L5 cạnh trung tâm)",
    surgicalRule: "QUY TẮC PHẪU THUẬT KRAMER: Thoát vị L4-L5 cạnh trung tâm đè rễ L5 đi ngang; thoát vị ngoài lỗ liên hợp L4-L5 đè rễ L4 thoát ra.",
    provocativeTests: [
      {
        name: "Nghiệm pháp Lasègue (SLR Test)",
        description: "Nâng chân thẳng gây đau chói từ mông bắn xuống mu bàn chân ở góc 30° - 70°.",
        sensitivity: "92% (Dấu hiệu vàng rễ L5/S1)"
      },
      {
        name: "Nghiệm pháp Lasègue chéo (Crossed SLR)",
        description: "Nâng chân BÊN LÀNH nhưng lại gây đau buốt dữ dội ở CHÂN BỆNH.",
        sensitivity: "Độ đặc hiệu > 95% (Chỉ điểm thoát vị đĩa đệm chèn ép rễ kích thước lớn)"
      },
      {
        name: "Nghiệm pháp Bragard",
        description: "Hạ chân xuống dưới góc gây đau của Lasègue một chút rồi gấp mu bàn chân đột ngột: đau tái phát dữ dội.",
        sensitivity: "88%"
      }
    ],
    clinicalPearls: "L5 là rễ thần kinh bị chèn ép nhiều nhất trong cơ thể người. Dấu hiệu bàn chân rũ (Foot Drop) đi kèm dáng đi phạt cỏ (Steppage Gait) là chỉ định mổ sớm tránh teo cơ không hồi phục!"
  },
  S1: {
    code: "S1",
    region: "Cột sống thắt lưng - cùng (Lumbosacral)",
    name: "Rễ Thần Kinh S1",
    landmark: "Mặt sau bắp chân, gân gót, gót chân & Bờ ngoài bàn chân (ngón 5)",
    colorHex: "#2563eb",
    painPattern: "Đau mặt sau mông, mặt sau đùi, bắp chân chạy thẳng xuống gót và bờ ngoài ngón út",
    sensoryLoss: "Bờ ngoài bàn chân, gan bàn chân và gót chân ngoài",
    keySensoryPoint: "Mặt ngoài của gót chân hoặc bờ ngoài ngón chân út",
    motorWeakness: "Gấp lòng bàn chân (Cơ bụng chân & Cơ dép) & Nghiêng ngoài bàn chân",
    myotomeAction: "Nhón gót chân đứng trên các đầu ngón (Plantar flexion)",
    mrcTestDescription: "Bệnh nhân KHÔNG THỂ ĐI BẰNG MŨI CHÂN (Toe Walking Test thất bại)",
    reflex: "Phản xạ gân gót Achilles (Achilles Tendon Reflex - S1 kinh điển)",
    reflexGradeTypical: "Mất hoàn toàn (0) hoặc giảm nặng (1+)",
    discLevel: "Đĩa đệm L5-S1",
    compressedRootType: "Rễ S1 đi ngang (Traversing S1 root)",
    surgicalRule: "Thoát vị L5-S1 cạnh trung tâm chèn rễ S1 đi ngang. Khoảng liên gai L5-S1 rộng, là vị trí thuận lợi nhất cho phẫu thuật nội soi lấy nhân đệm qua lỗ liên hợp.",
    provocativeTests: [
      {
        name: "Nghiệm pháp Lasègue (SLR)",
        description: "Dương tính rõ rệt, đau phóng dọc mặt sau đùi cẳng chân xuống gót chân.",
        sensitivity: "90%"
      },
      {
        name: "Khám phản xạ gân gót Achilles",
        description: "Gõ gân gót mất đáp ứng gấp lòng bàn chân so với chân đối diện.",
        sensitivity: "94%"
      },
      {
        name: "Nghiệm pháp đi bằng mũi chân",
        description: "Chân bệnh sụm xuống, không thể nhấc nổi gót chân khỏi mặt đất.",
        sensitivity: "85%"
      }
    ],
    clinicalPearls: "Phân biệt L5 vs S1 kinh điển tại giường: L5 = Yếu đi bằng gót + Tê mu chân ngón 1 + Phản xạ gót bình thường; S1 = Yếu đi bằng mũi chân + Tê bờ ngoài ngón 5 + MẤT phản xạ gân gót!"
  },
  "S2-S5": {
    code: "S2-S5",
    region: "Nón tủy & Chùm đuôi ngựa (Cauda Equina)",
    name: "Vùng Yên Ngựa (Saddle Area / Cauda Equina)",
    landmark: "Đáy chậu, quanh hậu môn, cơ quan sinh dục ngoài & Mông trong",
    colorHex: "#dc2626",
    painPattern: "Đau buốt sâu vùng đáy chậu, mông 2 bên, xương cùng cụt",
    sensoryLoss: "MẤT CẢM GIÁC VÙNG YÊN NGỰA (Ngồi bồn cầu không cảm thấy lạnh / mất cảm giác lau giấy vệ sinh)",
    keySensoryPoint: "Vùng da quanh bờ hậu môn (Perianal area)",
    motorWeakness: "Mất trương lực cơ thắt hậu môn, liệt bàng quang (Bí tiểu cấp hoặc Tiểu không tự chủ tràn ngập)",
    myotomeAction: "Co thắt hậu môn chủ động & Tống xuất nước tiểu",
    mrcTestDescription: "Mất hoàn toàn trương lực cơ thắt hậu môn khi thăm trực tràng (DRE)",
    reflex: "Mất Phản xạ co thắt hậu môn (Anal Wink S2-S4) & Phản xạ hành hang (Bulbocavernosus S2-S4)",
    reflexGradeTypical: "Mất toàn bộ phản xạ vùng chậu",
    discLevel: "Thoát vị đĩa đệm trung tâm lớn tầng L4-L5 hoặc L5-S1 chèn ép toàn bộ chùm đuôi ngựa",
    compressedRootType: "Toàn bộ bó rễ thần kinh Chùm Đuôi Ngựa (Cauda Equina)",
    surgicalRule: "CẤP CỨU NGOẠI THẦN KINH TỐI CẤP! Chỉ định phẫu thuật mở sọ / mở cung sau giải áp chùm đuôi ngựa TRONG VÒNG 24-48 GIỜ ĐẦU để cứu vãn chức năng đại tiểu tiện và tình dục vĩnh viễn.",
    provocativeTests: [
      {
        name: "Thăm khám trực tràng bằng ngón tay (DRE)",
        description: "Mất trương lực cơ thắt hậu môn tự ý và phản xạ siết ngón tay của cơ thắt.",
        sensitivity: "95%"
      },
      {
        name: "Đo thể tích nước tiểu tồn lưu sau đi tiểu (PVR)",
        description: "PVR > 200ml chỉ điểm rối loạn bài niệu thần kinh cấp tính.",
        sensitivity: "90%"
      }
    ],
    clinicalPearls: "HỘI CHỨNG CHÙM ĐUÔI NGỰA (CES) LÀ CỜ ĐỎ SỐ 1: Bất kỳ bệnh nhân đau thần kinh tọa nào xuất hiện TÊ VÙNG YÊN NGỰA hoặc BÍ TIỂU đều phải chuyển cấp cứu ngoại thần kinh ngay lập tức!",
    isRedFlag: true
  }
};

export const DermatomeSpinalVisualizer: React.FC = () => {
  const [selectedCode, setSelectedCode] = useState<DermatomeLevel>("L5");
  const [displayMode, setDisplayMode] = useState<DisplayMode>("dual_integrated");
  const [bodyView, setBodyView] = useState<BodyView>("both");
  const [showPainStream, setShowPainStream] = useState<boolean>(true);
  const [showAsiaPoints, setShowAsiaPoints] = useState<boolean>(true);
  const [discHerniationSide, setDiscHerniationSide] = useState<"right" | "left">("right");

  const current = DERMATOME_DATABASE[selectedCode];

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-4 md:p-6 shadow-xs space-y-6">
      {/* 1. Header Banner with Clinical Badges */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-200">
              <Layers className="w-5 h-5" />
            </span>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <span>Bản Đồ Khoanh Da Cảm Giác (Dermatomes) & Định Vị Rễ Cột Sống Đĩa Đệm</span>
              <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-indigo-600 text-white shadow-2xs">
                NEURO-ANATOMY HD
              </span>
            </h3>
          </div>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            Mô phỏng giải phẫu vector độ phân giải cao: <strong>Bản đồ khoanh da 2 mặt (Anterior & Posterior)</strong>, <strong>Mặt cắt ngang đĩa đệm chèn rễ (Axial Disc Herniation)</strong>, cơ lực Myotome và nghiệm pháp kích thích rễ tại giường.
          </p>
        </div>

        {/* Cauda Equina / Red Flag Warning Box if applicable */}
        {current.isRedFlag ? (
          <div className="flex items-center gap-2 bg-rose-50 border border-rose-200 px-3.5 py-1.5 rounded-xl shadow-2xs">
            <ShieldAlert className="w-4 h-4 text-rose-600" />
            <div className="text-xs">
              <span className="font-bold text-rose-900 block">BÁO ĐỘNG ĐỎ CẤP CỨU:</span>
              <span className="text-[11px] text-rose-700">Tổn thương chèn ép tủy / Chùm đuôi ngựa khẩn</span>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 bg-indigo-50/70 border border-indigo-200 px-3.5 py-1.5 rounded-xl text-xs text-indigo-900">
            <Disc className="w-4 h-4 text-indigo-600" />
            <span>Tầng đĩa đệm tương ứng: <strong>{current.discLevel}</strong></span>
          </div>
        )}
      </div>

      {/* 2. Top Level Navigation Bar: Select Dermatome & Display View Modes */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-500 font-semibold px-1">
          <span>CHỌN KHOANH DA / RỄ THẦN KINH CẦN THĂM KHÁM:</span>
          <span className="font-mono text-indigo-600">Đang chọn: {current.code} - {current.name}</span>
        </div>

        {/* Quick Level Pills */}
        <div className="grid grid-cols-4 sm:grid-cols-7 lg:grid-cols-14 gap-1.5">
          {(Object.keys(DERMATOME_DATABASE) as DermatomeLevel[]).map((lvl) => {
            const item = DERMATOME_DATABASE[lvl];
            const isSelected = selectedCode === lvl;
            return (
              <button
                key={lvl}
                onClick={() => setSelectedCode(lvl)}
                className={`py-2 px-1 rounded-xl border text-center transition-all flex flex-col items-center justify-center ${
                  isSelected
                    ? item.isRedFlag
                      ? "bg-rose-600 border-rose-600 text-white shadow-sm ring-2 ring-rose-300 font-bold scale-105"
                      : "bg-indigo-600 border-indigo-600 text-white shadow-sm ring-2 ring-indigo-300 font-bold scale-105"
                    : item.isRedFlag
                    ? "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                <span className="font-mono text-xs font-bold leading-none">{item.code}</span>
                <span className={`text-[9px] mt-1 line-clamp-1 ${isSelected ? "text-indigo-100" : "text-slate-400"}`}>
                  {item.landmark.split(" ")[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Viewport Mode Switcher & Graphic Toggles */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-100/90 p-3 rounded-xl border border-slate-200 text-xs">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-slate-600 font-semibold flex items-center gap-1 mr-1">
            <Maximize2 className="w-4 h-4 text-slate-700" />
            <span>Chế độ mô phỏng:</span>
          </span>

          <button
            onClick={() => setDisplayMode("dual_integrated")}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              displayMode === "dual_integrated"
                ? "bg-indigo-600 text-white shadow-2xs"
                : "bg-white text-slate-700 hover:bg-slate-200/80 border border-slate-200"
            }`}
          >
            Toàn Cảnh Tích Hợp (Khoanh Da + Cột Sống Đĩa Đệm)
          </button>

          <button
            onClick={() => setDisplayMode("dermatome")}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              displayMode === "dermatome"
                ? "bg-indigo-600 text-white shadow-2xs"
                : "bg-white text-slate-700 hover:bg-slate-200/80 border border-slate-200"
            }`}
          >
            Bản Đồ Da Cơ Thể (Body Dermatome Map)
          </button>

          <button
            onClick={() => setDisplayMode("spine_disc")}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              displayMode === "spine_disc"
                ? "bg-indigo-600 text-white shadow-2xs"
                : "bg-white text-slate-700 hover:bg-slate-200/80 border border-slate-200"
            }`}
          >
            Cột Sống & Cắt Ngang Đĩa Đệm (Spine & Disc Cross-Section)
          </button>
        </div>

        {/* Auxiliary Graphic Toggles */}
        <div className="flex items-center gap-3 ml-auto flex-wrap text-slate-700">
          {displayMode !== "spine_disc" && (
            <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-lg border border-slate-200">
              <span className="text-slate-500 mr-1">Góc nhìn:</span>
              <button
                onClick={() => setBodyView("both")}
                className={`px-1.5 py-0.5 rounded text-[11px] font-medium ${
                  bodyView === "both" ? "bg-indigo-600 text-white" : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                Cả 2 Mặt
              </button>
              <button
                onClick={() => setBodyView("anterior")}
                className={`px-1.5 py-0.5 rounded text-[11px] font-medium ${
                  bodyView === "anterior" ? "bg-indigo-600 text-white" : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                Trước
              </button>
              <button
                onClick={() => setBodyView("posterior")}
                className={`px-1.5 py-0.5 rounded text-[11px] font-medium ${
                  bodyView === "posterior" ? "bg-indigo-600 text-white" : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                Sau
              </button>
            </div>
          )}

          <label className="flex items-center gap-1.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={showPainStream}
              onChange={(e) => setShowPainStream(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500 w-3.5 h-3.5"
            />
            <span>Đường đau phóng lan (Radicular pain)</span>
          </label>

          <label className="flex items-center gap-1.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={showAsiaPoints}
              onChange={(e) => setShowAsiaPoints(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500 w-3.5 h-3.5"
            />
            <span>Điểm mốc chuẩn ASIA</span>
          </label>
        </div>
      </div>

      {/* 4. Main Interactive Canvas & Clinical Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Interactive Graphic Visualizer Area */}
        <div
          className={`${
            displayMode === "dual_integrated" ? "lg:col-span-8" : "lg:col-span-7"
          } bg-slate-900 border border-slate-800 rounded-2xl p-4 md:p-5 relative overflow-hidden shadow-lg flex flex-col items-center justify-between min-h-[500px]`}
        >
          {/* Top Canvas Bar */}
          <div className="w-full flex items-center justify-between border-b border-slate-800 pb-2.5 mb-3 text-slate-300">
            <div className="flex items-center gap-2 text-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
              <span className="font-mono text-indigo-400 font-bold uppercase">
                {current.code}: {current.name}
              </span>
              <span className="text-slate-500">|</span>
              <span className="text-slate-400 font-medium">{current.region}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="bg-slate-800 px-2 py-0.5 rounded text-[11px] font-mono text-amber-400 border border-slate-700">
                Tầng: <strong>{current.discLevel}</strong>
              </span>
              <span className="bg-slate-800 px-2 py-0.5 rounded text-[11px] font-mono text-sky-400 border border-slate-700">
                Rễ: <strong>{current.compressedRootType.split(" ")[0] || current.code}</strong>
              </span>
            </div>
          </div>

          {/* Graphical Viewport Container */}
          <div className="w-full flex flex-col md:flex-row items-center justify-around gap-4 my-auto">
            {/* VIEW A: Human Body Dermatome Map (Anterior / Posterior / Both) */}
            {(displayMode === "dermatome" || displayMode === "dual_integrated") && (
              <div className="flex items-center justify-center gap-3 w-full">
                {/* 1. Anterior View (Mặt trước) */}
                {(bodyView === "anterior" || bodyView === "both") && (
                  <div className="flex flex-col items-center w-full max-w-[240px]">
                    <span className="text-[10px] font-mono font-bold text-sky-400 tracking-wider mb-1 bg-slate-800 px-2 py-0.5 rounded">
                      MẶT TRƯỚC (ANTERIOR)
                    </span>

                    <svg viewBox="0 0 240 420" className="w-full h-84 sm:h-96 select-none drop-shadow-md">
                      <defs>
                        <linearGradient id="bodySkinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#334155" />
                          <stop offset="50%" stopColor="#1e293b" />
                          <stop offset="100%" stopColor="#0f172a" />
                        </linearGradient>

                        <radialGradient id="painGlowGrad" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.9" />
                          <stop offset="70%" stopColor="#e11d48" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#9f1239" stopOpacity="0" />
                        </radialGradient>

                        <filter id="activeGlow" x="-20%" y="-20%" width="140%" height="140%">
                          <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#6366f1" floodOpacity="0.7" />
                        </filter>
                      </defs>

                      {/* Head & Neck Base Contour */}
                      <ellipse cx="120" cy="38" rx="20" ry="24" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
                      {/* Facial Silhouette markers */}
                      <ellipse cx="114" cy="36" rx="1.8" ry="1.2" fill="#64748b" />
                      <ellipse cx="126" cy="36" rx="1.8" ry="1.2" fill="#64748b" />
                      <path d="M117,45 Q120,47 123,45" stroke="#64748b" strokeWidth="1" fill="none" />

                      {/* C2 / C3 Neck Angle */}
                      <path
                        d="M106,58 C108,48 132,48 134,58 L142,66 L98,66 Z"
                        fill={selectedCode === "C2" ? "#f43f5e" : "#1e293b"}
                        stroke={selectedCode === "C2" ? "#fb7185" : "#334155"}
                        strokeWidth={selectedCode === "C2" ? "2" : "1"}
                        className="cursor-pointer hover:opacity-80 transition-all"
                        onClick={() => setSelectedCode("C2")}
                      />

                      {/* C4 Supraclavicular & Trapezius */}
                      <path
                        d="M98,66 L78,82 L84,96 L112,84 L128,84 L156,96 L162,82 L142,66 Z"
                        fill={selectedCode === "C4" ? "#38bdf8" : "#1e293b"}
                        stroke={selectedCode === "C4" ? "#7dd3fc" : "#475569"}
                        strokeWidth={selectedCode === "C4" ? "2.5" : "1.2"}
                        className="cursor-pointer hover:opacity-80 transition-all"
                        onClick={() => setSelectedCode("C4")}
                      />

                      {/* C5 Lateral Arm (Deltoid) Left & Right */}
                      <path
                        d="M78,82 L52,125 L68,130 L86,96 Z"
                        fill={selectedCode === "C5" ? "#6366f1" : "#1e293b"}
                        stroke={selectedCode === "C5" ? "#818cf8" : "#475569"}
                        strokeWidth={selectedCode === "C5" ? "2.5" : "1.2"}
                        className="cursor-pointer hover:opacity-80 transition-all"
                        onClick={() => setSelectedCode("C5")}
                      />
                      <path
                        d="M162,82 L188,125 L172,130 L154,96 Z"
                        fill={selectedCode === "C5" ? "#6366f1" : "#1e293b"}
                        stroke={selectedCode === "C5" ? "#818cf8" : "#475569"}
                        strokeWidth={selectedCode === "C5" ? "2.5" : "1.2"}
                        className="cursor-pointer hover:opacity-80 transition-all"
                        onClick={() => setSelectedCode("C5")}
                      />

                      {/* C6 Lateral Forearm & Thumb */}
                      <path
                        d="M52,125 L36,175 L48,178 L66,130 Z"
                        fill={selectedCode === "C6" ? "#06b6d4" : "#1e293b"}
                        stroke={selectedCode === "C6" ? "#22d3ee" : "#475569"}
                        strokeWidth={selectedCode === "C6" ? "2.5" : "1.2"}
                        className="cursor-pointer hover:opacity-80 transition-all"
                        onClick={() => setSelectedCode("C6")}
                      />
                      <path
                        d="M188,125 L204,175 L192,178 L174,130 Z"
                        fill={selectedCode === "C6" ? "#06b6d4" : "#1e293b"}
                        stroke={selectedCode === "C6" ? "#22d3ee" : "#475569"}
                        strokeWidth={selectedCode === "C6" ? "2.5" : "1.2"}
                        className="cursor-pointer hover:opacity-80 transition-all"
                        onClick={() => setSelectedCode("C6")}
                      />
                      {/* Thumb tips C6 */}
                      <circle
                        cx="32"
                        cy="182"
                        r="5"
                        fill={selectedCode === "C6" ? "#06b6d4" : "#334155"}
                        stroke={selectedCode === "C6" ? "#22d3ee" : "#475569"}
                        strokeWidth={selectedCode === "C6" ? "2" : "1"}
                        className="cursor-pointer hover:opacity-80"
                        onClick={() => setSelectedCode("C6")}
                      />
                      <circle
                        cx="208"
                        cy="182"
                        r="5"
                        fill={selectedCode === "C6" ? "#06b6d4" : "#334155"}
                        stroke={selectedCode === "C6" ? "#22d3ee" : "#475569"}
                        strokeWidth={selectedCode === "C6" ? "2" : "1"}
                        className="cursor-pointer hover:opacity-80"
                        onClick={() => setSelectedCode("C6")}
                      />

                      {/* C7 Middle Finger tips */}
                      <circle
                        cx="42"
                        cy="192"
                        r="4.5"
                        fill={selectedCode === "C7" ? "#a855f7" : "#334155"}
                        stroke={selectedCode === "C7" ? "#c084fc" : "#475569"}
                        strokeWidth={selectedCode === "C7" ? "2" : "1"}
                        className="cursor-pointer hover:opacity-80"
                        onClick={() => setSelectedCode("C7")}
                      />
                      <circle
                        cx="198"
                        cy="192"
                        r="4.5"
                        fill={selectedCode === "C7" ? "#a855f7" : "#334155"}
                        stroke={selectedCode === "C7" ? "#c084fc" : "#475569"}
                        strokeWidth={selectedCode === "C7" ? "2" : "1"}
                        className="cursor-pointer hover:opacity-80"
                        onClick={() => setSelectedCode("C7")}
                      />

                      {/* C8 Medial Forearm & Little Finger */}
                      <path
                        d="M66,130 L48,178 L56,188 L72,135 Z"
                        fill={selectedCode === "C8" ? "#ec4899" : "#1e293b"}
                        stroke={selectedCode === "C8" ? "#f472b6" : "#475569"}
                        strokeWidth={selectedCode === "C8" ? "2" : "1"}
                        className="cursor-pointer hover:opacity-80"
                        onClick={() => setSelectedCode("C8")}
                      />
                      <path
                        d="M174,130 L192,178 L184,188 L168,135 Z"
                        fill={selectedCode === "C8" ? "#ec4899" : "#1e293b"}
                        stroke={selectedCode === "C8" ? "#f472b6" : "#475569"}
                        strokeWidth={selectedCode === "C8" ? "2" : "1"}
                        className="cursor-pointer hover:opacity-80"
                        onClick={() => setSelectedCode("C8")}
                      />
                      <circle
                        cx="54"
                        cy="192"
                        r="4"
                        fill={selectedCode === "C8" ? "#ec4899" : "#334155"}
                        stroke={selectedCode === "C8" ? "#f472b6" : "#475569"}
                        strokeWidth={selectedCode === "C8" ? "2" : "1"}
                        className="cursor-pointer hover:opacity-80"
                        onClick={() => setSelectedCode("C8")}
                      />
                      <circle
                        cx="186"
                        cy="192"
                        r="4"
                        fill={selectedCode === "C8" ? "#ec4899" : "#334155"}
                        stroke={selectedCode === "C8" ? "#f472b6" : "#475569"}
                        strokeWidth={selectedCode === "C8" ? "2" : "1"}
                        className="cursor-pointer hover:opacity-80"
                        onClick={() => setSelectedCode("C8")}
                      />

                      {/* Trunk: Upper Thoracic T1-T3 */}
                      <path
                        d="M84,96 L156,96 L152,112 L88,112 Z"
                        fill="#1e293b"
                        stroke="#475569"
                        strokeWidth="1.2"
                      />

                      {/* T4 Nipple Level */}
                      <path
                        d="M88,112 L152,112 L148,132 L92,132 Z"
                        fill={selectedCode === "T4" ? "#e11d48" : "#1e293b"}
                        stroke={selectedCode === "T4" ? "#fb7185" : "#475569"}
                        strokeWidth={selectedCode === "T4" ? "2.5" : "1.2"}
                        className="cursor-pointer hover:opacity-80 transition-all"
                        onClick={() => setSelectedCode("T4")}
                      />
                      {/* Nipples */}
                      <circle cx="106" cy="120" r="2.5" fill="#f43f5e" />
                      <circle cx="134" cy="120" r="2.5" fill="#f43f5e" />
                      <text x="120" y="123" textAnchor="middle" fontSize="6.5" fill="#94a3b8" fontWeight="bold">
                        T4 (Núm vú)
                      </text>

                      {/* Lower Thoracic T5-T9 */}
                      <path
                        d="M92,132 L148,132 L144,148 L96,148 Z"
                        fill="#1e293b"
                        stroke="#475569"
                        strokeWidth="1.2"
                      />

                      {/* T10 Umbilicus Level */}
                      <path
                        d="M96,148 L144,148 L140,166 L100,166 Z"
                        fill={selectedCode === "T10" ? "#f97316" : "#1e293b"}
                        stroke={selectedCode === "T10" ? "#fb923c" : "#475569"}
                        strokeWidth={selectedCode === "T10" ? "2.5" : "1.2"}
                        className="cursor-pointer hover:opacity-80 transition-all"
                        onClick={() => setSelectedCode("T10")}
                      />
                      {/* Umbilicus */}
                      <circle cx="120" cy="156" r="3" fill="#ea580c" />
                      <text x="120" y="152" textAnchor="middle" fontSize="6" fill="#f97316" fontWeight="bold">
                        T10 (Rốn)
                      </text>

                      {/* L1 Inguinal Band */}
                      <path
                        d="M100,166 L140,166 L138,182 L102,182 Z"
                        fill={selectedCode === "L1" ? "#84cc16" : "#1e293b"}
                        stroke={selectedCode === "L1" ? "#a3e635" : "#475569"}
                        strokeWidth={selectedCode === "L1" ? "2.5" : "1.2"}
                        className="cursor-pointer hover:opacity-80 transition-all"
                        onClick={() => setSelectedCode("L1")}
                      />

                      {/* S2-S5 Genitalia / Perianal Anterior */}
                      <path
                        d="M108,182 L132,182 L126,198 L114,198 Z"
                        fill={selectedCode === "S2-S5" ? "#dc2626" : "#1e293b"}
                        stroke={selectedCode === "S2-S5" ? "#ef4444" : "#475569"}
                        strokeWidth={selectedCode === "S2-S5" ? "2.5" : "1.2"}
                        className="cursor-pointer hover:opacity-80 transition-all"
                        onClick={() => setSelectedCode("S2-S5")}
                      />

                      {/* L3 Anterior Thigh & Knee */}
                      <path
                        d="M102,182 L116,182 L114,242 L94,242 Z"
                        fill={selectedCode === "L3" ? "#eab308" : "#1e293b"}
                        stroke={selectedCode === "L3" ? "#fde047" : "#475569"}
                        strokeWidth={selectedCode === "L3" ? "2.5" : "1.2"}
                        className="cursor-pointer hover:opacity-80 transition-all"
                        onClick={() => setSelectedCode("L3")}
                      />
                      <path
                        d="M124,182 L138,182 L146,242 L126,242 Z"
                        fill={selectedCode === "L3" ? "#eab308" : "#1e293b"}
                        stroke={selectedCode === "L3" ? "#fde047" : "#475569"}
                        strokeWidth={selectedCode === "L3" ? "2.5" : "1.2"}
                        className="cursor-pointer hover:opacity-80 transition-all"
                        onClick={() => setSelectedCode("L3")}
                      />

                      {/* L4 Medial Knee & Medial Shin */}
                      <path
                        d="M94,242 L108,242 L105,315 L92,315 Z"
                        fill={selectedCode === "L4" ? "#14b8a6" : "#1e293b"}
                        stroke={selectedCode === "L4" ? "#2dd4bf" : "#475569"}
                        strokeWidth={selectedCode === "L4" ? "2.5" : "1.2"}
                        className="cursor-pointer hover:opacity-80 transition-all"
                        onClick={() => setSelectedCode("L4")}
                      />
                      <path
                        d="M132,242 L146,242 L148,315 L135,315 Z"
                        fill={selectedCode === "L4" ? "#14b8a6" : "#1e293b"}
                        stroke={selectedCode === "L4" ? "#2dd4bf" : "#475569"}
                        strokeWidth={selectedCode === "L4" ? "2.5" : "1.2"}
                        className="cursor-pointer hover:opacity-80 transition-all"
                        onClick={() => setSelectedCode("L4")}
                      />
                      {/* Medial Malleolus markers (L4) */}
                      <circle cx="106" cy="360" r="3.5" fill={selectedCode === "L4" ? "#14b8a6" : "#475569"} />
                      <circle cx="134" cy="360" r="3.5" fill={selectedCode === "L4" ? "#14b8a6" : "#475569"} />

                      {/* L5 Anterolateral Leg & Dorsum of Foot / Hallux */}
                      <path
                        d="M92,315 L105,315 L102,365 L84,365 Z"
                        fill={selectedCode === "L5" ? "#10b981" : "#1e293b"}
                        stroke={selectedCode === "L5" ? "#34d399" : "#475569"}
                        strokeWidth={selectedCode === "L5" ? "2.5" : "1.2"}
                        className="cursor-pointer hover:opacity-80 transition-all"
                        onClick={() => setSelectedCode("L5")}
                      />
                      <path
                        d="M135,315 L148,315 L156,365 L138,365 Z"
                        fill={selectedCode === "L5" ? "#10b981" : "#1e293b"}
                        stroke={selectedCode === "L5" ? "#34d399" : "#475569"}
                        strokeWidth={selectedCode === "L5" ? "2.5" : "1.2"}
                        className="cursor-pointer hover:opacity-80 transition-all"
                        onClick={() => setSelectedCode("L5")}
                      />

                      {/* Dorsum of Foot & Great Toe L5 */}
                      <ellipse
                        cx="94"
                        cy="382"
                        rx="12"
                        ry="8"
                        fill={selectedCode === "L5" ? "#10b981" : "#334155"}
                        stroke={selectedCode === "L5" ? "#34d399" : "#475569"}
                        strokeWidth={selectedCode === "L5" ? "2" : "1"}
                        className="cursor-pointer hover:opacity-80"
                        onClick={() => setSelectedCode("L5")}
                      />
                      <ellipse
                        cx="146"
                        cy="382"
                        rx="12"
                        ry="8"
                        fill={selectedCode === "L5" ? "#10b981" : "#334155"}
                        stroke={selectedCode === "L5" ? "#34d399" : "#475569"}
                        strokeWidth={selectedCode === "L5" ? "2" : "1"}
                        className="cursor-pointer hover:opacity-80"
                        onClick={() => setSelectedCode("L5")}
                      />

                      {/* S1 Lateral Foot Border */}
                      <path
                        d="M82,365 L88,365 L86,388 L78,388 Z"
                        fill={selectedCode === "S1" ? "#2563eb" : "#1e293b"}
                        stroke={selectedCode === "S1" ? "#60a5fa" : "#475569"}
                        strokeWidth={selectedCode === "S1" ? "2" : "1"}
                        className="cursor-pointer hover:opacity-80"
                        onClick={() => setSelectedCode("S1")}
                      />
                      <path
                        d="M152,365 L158,365 L162,388 L154,388 Z"
                        fill={selectedCode === "S1" ? "#2563eb" : "#1e293b"}
                        stroke={selectedCode === "S1" ? "#60a5fa" : "#475569"}
                        strokeWidth={selectedCode === "S1" ? "2" : "1"}
                        className="cursor-pointer hover:opacity-80"
                        onClick={() => setSelectedCode("S1")}
                      />

                      {/* Radiating Pain Stream Vector (Dynamic Electric Bolt / Arrow) */}
                      {showPainStream && selectedCode === "L5" && (
                        <g>
                          <path
                            d="M138,170 Q145,240 142,320 T146,380"
                            fill="none"
                            stroke="#10b981"
                            strokeWidth="3.5"
                            strokeDasharray="4 2"
                          />
                          <circle cx="146" cy="382" r="5" fill="#10b981" opacity="0.8" />
                        </g>
                      )}

                      {showPainStream && selectedCode === "C6" && (
                        <g>
                          <path
                            d="M150,85 Q175,130 195,175"
                            fill="none"
                            stroke="#06b6d4"
                            strokeWidth="3"
                            strokeDasharray="4 2"
                          />
                          <circle cx="208" cy="182" r="5" fill="#06b6d4" opacity="0.8" />
                        </g>
                      )}

                      {/* ASIA Key Sensory Points */}
                      {showAsiaPoints && (
                        <g>
                          <circle cx="120" cy="120" r="2.5" fill="#f43f5e" stroke="#ffffff" strokeWidth="1" />
                          <circle cx="120" cy="156" r="2.5" fill="#ea580c" stroke="#ffffff" strokeWidth="1" />
                          <circle cx="208" cy="182" r="2.5" fill="#06b6d4" stroke="#ffffff" strokeWidth="1" />
                          <circle cx="146" cy="382" r="2.5" fill="#10b981" stroke="#ffffff" strokeWidth="1" />
                        </g>
                      )}
                    </svg>
                  </div>
                )}

                {/* 2. Posterior View (Mặt sau) */}
                {(bodyView === "posterior" || bodyView === "both") && (
                  <div className="flex flex-col items-center w-full max-w-[240px]">
                    <span className="text-[10px] font-mono font-bold text-indigo-400 tracking-wider mb-1 bg-slate-800 px-2 py-0.5 rounded">
                      MẶT SAU (POSTERIOR)
                    </span>

                    <svg viewBox="0 0 240 420" className="w-full h-84 sm:h-96 select-none drop-shadow-md">
                      {/* Occiput C2 */}
                      <ellipse
                        cx="120"
                        cy="38"
                        rx="20"
                        ry="24"
                        fill={selectedCode === "C2" ? "#f43f5e" : "#1e293b"}
                        stroke={selectedCode === "C2" ? "#fb7185" : "#475569"}
                        strokeWidth={selectedCode === "C2" ? "2.5" : "1.5"}
                        className="cursor-pointer hover:opacity-80"
                        onClick={() => setSelectedCode("C2")}
                      />
                      <path d="M106,30 Q120,44 134,30" stroke="#64748b" strokeWidth="1.2" fill="none" />
                      <text x="120" y="38" textAnchor="middle" fontSize="6.5" fill="#ffffff" fontWeight="bold">
                        C2 (Chẩm)
                      </text>

                      {/* C4 Trapezius & Upper Scapula */}
                      <path
                        d="M98,66 L78,82 L84,96 L112,84 L128,84 L156,96 L162,82 L142,66 Z"
                        fill={selectedCode === "C4" ? "#38bdf8" : "#1e293b"}
                        stroke={selectedCode === "C4" ? "#7dd3fc" : "#475569"}
                        strokeWidth={selectedCode === "C4" ? "2.5" : "1.2"}
                        className="cursor-pointer hover:opacity-80"
                        onClick={() => setSelectedCode("C4")}
                      />

                      {/* C5 Posterior Shoulder */}
                      <path
                        d="M78,82 L52,125 L68,130 L86,96 Z"
                        fill={selectedCode === "C5" ? "#6366f1" : "#1e293b"}
                        stroke={selectedCode === "C5" ? "#818cf8" : "#475569"}
                        strokeWidth={selectedCode === "C5" ? "2.5" : "1.2"}
                        className="cursor-pointer hover:opacity-80"
                        onClick={() => setSelectedCode("C5")}
                      />
                      <path
                        d="M162,82 L188,125 L172,130 L154,96 Z"
                        fill={selectedCode === "C5" ? "#6366f1" : "#1e293b"}
                        stroke={selectedCode === "C5" ? "#818cf8" : "#475569"}
                        strokeWidth={selectedCode === "C5" ? "2.5" : "1.2"}
                        className="cursor-pointer hover:opacity-80"
                        onClick={() => setSelectedCode("C5")}
                      />

                      {/* C7 Triceps & Posterior Forearm */}
                      <path
                        d="M52,125 L36,175 L48,178 L66,130 Z"
                        fill={selectedCode === "C7" ? "#a855f7" : "#1e293b"}
                        stroke={selectedCode === "C7" ? "#c084fc" : "#475569"}
                        strokeWidth={selectedCode === "C7" ? "2.5" : "1.2"}
                        className="cursor-pointer hover:opacity-80"
                        onClick={() => setSelectedCode("C7")}
                      />
                      <path
                        d="M188,125 L204,175 L192,178 L174,130 Z"
                        fill={selectedCode === "C7" ? "#a855f7" : "#1e293b"}
                        stroke={selectedCode === "C7" ? "#c084fc" : "#475569"}
                        strokeWidth={selectedCode === "C7" ? "2.5" : "1.2"}
                        className="cursor-pointer hover:opacity-80"
                        onClick={() => setSelectedCode("C7")}
                      />
                      {/* Middle finger C7 */}
                      <circle
                        cx="42"
                        cy="192"
                        r="5"
                        fill={selectedCode === "C7" ? "#a855f7" : "#334155"}
                        stroke={selectedCode === "C7" ? "#c084fc" : "#475569"}
                        strokeWidth={selectedCode === "C7" ? "2" : "1"}
                        className="cursor-pointer hover:opacity-80"
                        onClick={() => setSelectedCode("C7")}
                      />
                      <circle
                        cx="198"
                        cy="192"
                        r="5"
                        fill={selectedCode === "C7" ? "#a855f7" : "#334155"}
                        stroke={selectedCode === "C7" ? "#c084fc" : "#475569"}
                        strokeWidth={selectedCode === "C7" ? "2" : "1"}
                        className="cursor-pointer hover:opacity-80"
                        onClick={() => setSelectedCode("C7")}
                      />

                      {/* Spine line indicator */}
                      <line x1="120" y1="68" x2="120" y2="185" stroke="#475569" strokeWidth="2" strokeDasharray="3 3" />

                      {/* Upper Back T4 */}
                      <path
                        d="M84,96 L156,96 L150,130 L90,130 Z"
                        fill={selectedCode === "T4" ? "#e11d48" : "#1e293b"}
                        stroke={selectedCode === "T4" ? "#fb7185" : "#475569"}
                        strokeWidth={selectedCode === "T4" ? "2.5" : "1.2"}
                        className="cursor-pointer hover:opacity-80"
                        onClick={() => setSelectedCode("T4")}
                      />

                      {/* Mid Back T10 */}
                      <path
                        d="M90,130 L150,130 L146,166 L94,166 Z"
                        fill={selectedCode === "T10" ? "#f97316" : "#1e293b"}
                        stroke={selectedCode === "T10" ? "#fb923c" : "#475569"}
                        strokeWidth={selectedCode === "T10" ? "2.5" : "1.2"}
                        className="cursor-pointer hover:opacity-80"
                        onClick={() => setSelectedCode("T10")}
                      />

                      {/* S2-S5 Saddle Area & Buttocks / Perianal Ring (Kinh điển) */}
                      <path
                        d="M94,166 L146,166 L142,212 L98,212 Z"
                        fill={selectedCode === "S2-S5" ? "#dc2626" : "#1e293b"}
                        stroke={selectedCode === "S2-S5" ? "#ef4444" : "#475569"}
                        strokeWidth={selectedCode === "S2-S5" ? "3" : "1.5"}
                        className="cursor-pointer hover:opacity-80 transition-all"
                        onClick={() => setSelectedCode("S2-S5")}
                      />
                      {/* Gluteal cleft & concentric ring */}
                      <line x1="120" y1="172" x2="120" y2="212" stroke="#dc2626" strokeWidth="1.5" />
                      <ellipse
                        cx="120"
                        cy="192"
                        rx="14"
                        ry="12"
                        fill={selectedCode === "S2-S5" ? "#ef4444" : "none"}
                        opacity={selectedCode === "S2-S5" ? 0.8 : 0}
                      />
                      <text x="120" y="195" textAnchor="middle" fontSize="6.5" fill="#ffffff" fontWeight="bold">
                        S2-S5 (Yên Ngựa)
                      </text>

                      {/* Posterolateral Thigh L5 */}
                      <path
                        d="M98,212 L116,212 L112,275 L92,275 Z"
                        fill={selectedCode === "L5" ? "#10b981" : "#1e293b"}
                        stroke={selectedCode === "L5" ? "#34d399" : "#475569"}
                        strokeWidth={selectedCode === "L5" ? "2.5" : "1.2"}
                        className="cursor-pointer hover:opacity-80"
                        onClick={() => setSelectedCode("L5")}
                      />
                      <path
                        d="M124,212 L142,212 L148,275 L128,275 Z"
                        fill={selectedCode === "L5" ? "#10b981" : "#34d399"}
                        stroke={selectedCode === "L5" ? "#34d399" : "#475569"}
                        strokeWidth={selectedCode === "L5" ? "2.5" : "1.2"}
                        className="cursor-pointer hover:opacity-80"
                        onClick={() => setSelectedCode("L5")}
                      />

                      {/* Posterior Calf & Achilles / Heel S1 */}
                      <path
                        d="M92,275 L112,275 L108,365 L86,365 Z"
                        fill={selectedCode === "S1" ? "#2563eb" : "#1e293b"}
                        stroke={selectedCode === "S1" ? "#60a5fa" : "#475569"}
                        strokeWidth={selectedCode === "S1" ? "2.5" : "1.2"}
                        className="cursor-pointer hover:opacity-80"
                        onClick={() => setSelectedCode("S1")}
                      />
                      <path
                        d="M128,275 L148,275 L154,365 L132,365 Z"
                        fill={selectedCode === "S1" ? "#2563eb" : "#1e293b"}
                        stroke={selectedCode === "S1" ? "#60a5fa" : "#475569"}
                        strokeWidth={selectedCode === "S1" ? "2.5" : "1.2"}
                        className="cursor-pointer hover:opacity-80"
                        onClick={() => setSelectedCode("S1")}
                      />

                      {/* Heel & Sole S1 */}
                      <ellipse
                        cx="94"
                        cy="382"
                        rx="12"
                        ry="10"
                        fill={selectedCode === "S1" ? "#2563eb" : "#334155"}
                        stroke={selectedCode === "S1" ? "#60a5fa" : "#475569"}
                        strokeWidth={selectedCode === "S1" ? "2.5" : "1"}
                        className="cursor-pointer hover:opacity-80"
                        onClick={() => setSelectedCode("S1")}
                      />
                      <ellipse
                        cx="146"
                        cy="382"
                        rx="12"
                        ry="10"
                        fill={selectedCode === "S1" ? "#2563eb" : "#334155"}
                        stroke={selectedCode === "S1" ? "#60a5fa" : "#475569"}
                        strokeWidth={selectedCode === "S1" ? "2.5" : "1"}
                        className="cursor-pointer hover:opacity-80"
                        onClick={() => setSelectedCode("S1")}
                      />

                      {/* Radiating Sciatic Pain S1 */}
                      {showPainStream && selectedCode === "S1" && (
                        <g>
                          <path
                            d="M136,195 Q145,260 142,330 T146,382"
                            fill="none"
                            stroke="#3b82f6"
                            strokeWidth="3.5"
                            strokeDasharray="4 2"
                          />
                          <circle cx="146" cy="382" r="5" fill="#3b82f6" opacity="0.8" />
                        </g>
                      )}
                    </svg>
                  </div>
                )}
              </div>
            )}

            {/* VIEW B: Spine Column & Axial Disc Herniation Cross-Section (Cột Sống & Cắt Ngang Đĩa Đệm) */}
            {(displayMode === "spine_disc" || displayMode === "dual_integrated") && (
              <div className="flex flex-col items-center w-full max-w-[340px] bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] font-mono font-bold text-amber-400 tracking-wider mb-2 bg-slate-800 px-2 py-0.5 rounded">
                  MẶT CẮT TRỤC NGANG ĐĨA ĐỆM (AXIAL DISC & NERVE ROOT)
                </span>

                {/* Axial Disc SVG Cross Section */}
                <svg viewBox="0 0 300 240" className="w-full h-56 sm:h-60 select-none drop-shadow-md">
                  <defs>
                    <radialGradient id="discNucleusGrad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#38bdf8" />
                      <stop offset="70%" stopColor="#0284c7" />
                      <stop offset="100%" stopColor="#0369a1" />
                    </radialGradient>

                    <radialGradient id="herniationGrad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#f87171" />
                      <stop offset="70%" stopColor="#dc2626" />
                      <stop offset="100%" stopColor="#991b1b" />
                    </radialGradient>
                  </defs>

                  {/* 1. Vertebral Body Anterior (Thân đốt sống phía trước - hình hạt đậu) */}
                  <path
                    d="M60,110 C60,45 100,25 150,25 C200,25 240,45 240,110 C240,145 195,155 150,150 C105,155 60,145 60,110 Z"
                    fill="#1e293b"
                    stroke="#64748b"
                    strokeWidth="2.5"
                  />
                  <text x="150" y="55" textAnchor="middle" fill="#94a3b8" fontSize="8" fontWeight="bold">
                    THÂN ĐỐT SỐNG (ANTERIOR)
                  </text>
                  <text x="150" y="66" textAnchor="middle" fill="#64748b" fontSize="7">
                    Tầng {current.discLevel}
                  </text>

                  {/* 2. Intervertebral Disc: Anulus Fibrosus (Vòng sợi đĩa đệm nhiều lớp) */}
                  <ellipse cx="150" cy="115" rx="72" ry="32" fill="#0f172a" stroke="#475569" strokeWidth="2" />
                  <ellipse cx="150" cy="115" rx="55" ry="24" fill="#1e293b" stroke="#334155" strokeWidth="1.5" strokeDasharray="3 2" />

                  {/* Nucleus Pulposus (Nhân nhầy đĩa đệm) */}
                  <ellipse cx="150" cy="115" rx="35" ry="16" fill="url(#discNucleusGrad)" opacity="0.85" />
                  <text x="150" y="118" textAnchor="middle" fill="#ffffff" fontSize="7.5" fontWeight="bold">
                    Nhân nhầy (Nucleus)
                  </text>

                  {/* 3. Spinal Canal / Thecal Sac (Bao màng cứng ống sống chứa dịch não tủy) */}
                  <path
                    d="M110,158 C110,150 130,148 150,148 C170,148 190,150 190,158 C190,195 170,205 150,205 C130,205 110,195 110,158 Z"
                    fill="#0284c7"
                    opacity="0.3"
                    stroke="#38bdf8"
                    strokeWidth="1.5"
                  />
                  {/* Cauda Equina / Spinal Cord fibers inside thecal sac */}
                  <circle cx="142" cy="175" r="2" fill="#bae6fd" />
                  <circle cx="150" cy="172" r="2" fill="#bae6fd" />
                  <circle cx="158" cy="175" r="2" fill="#bae6fd" />
                  <circle cx="146" cy="184" r="2" fill="#bae6fd" />
                  <circle cx="154" cy="184" r="2" fill="#bae6fd" />
                  <text x="150" y="196" textAnchor="middle" fill="#7dd3fc" fontSize="6.5" fontWeight="bold">
                    Bao màng cứng (Thecal sac)
                  </text>

                  {/* 4. Posterior Vertebral Arch & Spinous Process (Cung sau & Mỏm gai) */}
                  <path
                    d="M80,140 L70,180 L110,195 L150,230 L190,195 L230,180 L220,140"
                    fill="none"
                    stroke="#475569"
                    strokeWidth="3"
                  />
                  <text x="150" y="238" textAnchor="middle" fill="#94a3b8" fontSize="7" fontWeight="bold">
                    Mỏm gai sau (Posterior)
                  </text>

                  {/* 5. Left & Right Nerve Roots (Rễ thần kinh 2 bên) */}
                  {/* Normal Side (Left of patient - Screen Left) */}
                  <g id="normalRootLeft">
                    {/* Exiting Root */}
                    <path d="M115,150 Q90,145 68,160" stroke="#f59e0b" strokeWidth="3" fill="none" />
                    {/* Traversing Root */}
                    <path d="M125,165 Q110,180 100,195" stroke="#fbbf24" strokeWidth="2.5" fill="none" />
                    <text x="50" y="152" fill="#fbbf24" fontSize="6.5" fontWeight="bold">
                      Rễ thoát
                    </text>
                  </g>

                  {/* Affected Side (Right of patient - Screen Right): PARACENTRAL HERNIATION */}
                  <g id="affectedRootRight">
                    {/* Disc Protrusion / Extrusion Herniation Mass */}
                    <path
                      d="M165,130 Q188,145 186,165 Q175,172 158,155 Z"
                      fill="url(#herniationGrad)"
                      stroke="#ef4444"
                      strokeWidth="2"
                    />

                    {/* Compressed Traversing Nerve Root (Bị đè bẹp đỏ rực!) */}
                    <path d="M175,165 Q185,178 190,195" stroke="#ef4444" strokeWidth="4" fill="none" />
                    <circle cx="182" cy="168" r="4.5" fill="#ef4444" opacity="0.8" />

                    {/* Exiting Root passing above */}
                    <path d="M185,145 Q210,145 232,160" stroke="#f59e0b" strokeWidth="2.5" fill="none" />

                    {/* Callout Arrow */}
                    <line x1="220" y1="130" x2="190" y2="155" stroke="#ef4444" strokeWidth="1.5" />
                    <rect x="210" y="112" width="85" height="28" rx="4" fill="#0f172a" stroke="#ef4444" strokeWidth="1" />
                    <text x="214" y="123" fill="#fca5a5" fontSize="6.5" fontWeight="bold">
                      Thoát vị cạnh trung tâm
                    </text>
                    <text x="214" y="134" fill="#fecdd3" fontSize="6">
                      Đè rễ {current.code} đi ngang!
                    </text>
                  </g>
                </svg>

                {/* Kramer / Macnab Spine Surgical Rule Box */}
                <div className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-300 mt-2">
                  <div className="flex items-center gap-1.5 text-amber-400 font-bold text-[11px] mb-1">
                    <Disc className="w-3.5 h-3.5" />
                    <span>Quy Tắc Thoát Vị Đĩa Đệm (Kramer Rule):</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {current.surgicalRule}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Telemetry Bar */}
          <div className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300 mt-3">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                <Stethoscope className="w-4 h-4" />
              </span>
              <div>
                <span className="text-[11px] text-slate-400 block">Cột mốc chuẩn giải phẫu (Landmark):</span>
                <span className="font-semibold text-white">{current.landmark}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-400">Điểm cảm giác ASIA:</span>
              <span className="font-mono text-emerald-400 font-bold bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                {current.keySensoryPoint}
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: High-Yield Neurological Examination Panel */}
        <div
          className={`${
            displayMode === "dual_integrated" ? "lg:col-span-4" : "lg:col-span-5"
          } space-y-4`}
        >
          {/* Main Card: Radiculopathy Profile */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 md:p-5 space-y-3.5 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-slate-900 font-mono">{current.code}</span>
                  <span className="text-sm font-semibold text-indigo-700">({current.name})</span>
                </div>
                <span className="text-xs text-slate-500">{current.region}</span>
              </div>

              {current.isRedFlag ? (
                <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 text-[10px] font-bold border border-rose-300 flex items-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
                  CẤP CỨU ĐỎ
                </span>
              ) : (
                <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-1 rounded border border-indigo-200">
                  {current.discLevel}
                </span>
              )}
            </div>

            {/* Diagnostic Clinical Quadrants */}
            <div className="grid grid-cols-1 gap-2.5 text-xs">
              <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
                <span className="text-slate-500 font-medium block mb-1 flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  <span>Đường đau phóng lan (Radicular Pain):</span>
                </span>
                <span className="text-amber-900 font-semibold leading-relaxed">{current.painPattern}</span>
              </div>

              <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
                <span className="text-slate-500 font-medium block mb-1 flex items-center gap-1">
                  <Activity className="w-3.5 h-3.5 text-rose-500" />
                  <span>Yếu cơ vận động (Myotome & MRC Scale):</span>
                </span>
                <span className="text-rose-700 font-semibold block">{current.motorWeakness}</span>
                <span className="text-slate-600 text-[11px] mt-0.5 block">
                  Động tác thử nghiệm: {current.myotomeAction}
                </span>
              </div>

              <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
                <span className="text-slate-500 font-medium block mb-1">🔨 Phản xạ gân xương (Deep Tendon Reflex):</span>
                <div className="flex items-center justify-between">
                  <span className="text-teal-800 font-semibold">{current.reflex}</span>
                  <span className="text-[10px] font-mono font-bold bg-teal-50 text-teal-700 px-1.5 py-0.5 rounded border border-teal-200">
                    {current.reflexGradeTypical}
                  </span>
                </div>
              </div>

              <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
                <span className="text-slate-500 font-medium block mb-1">✋ Vùng da mất cảm giác chủ yếu:</span>
                <span className="text-slate-800">{current.sensoryLoss}</span>
              </div>
            </div>

            {/* Clinical Pearls Box */}
            <div
              className={`p-3 rounded-xl border text-xs flex items-start gap-2.5 ${
                current.isRedFlag
                  ? "bg-rose-50 border-rose-200 text-rose-950"
                  : "bg-indigo-50/80 border-indigo-200 text-indigo-950"
              }`}
            >
              <Sparkles className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
              <div>
                <span className="font-bold text-slate-900 block mb-0.5">Kinh nghiệm lâm sàng chuyên khoa:</span>
                <p className="text-slate-700 leading-relaxed text-[11px]">{current.clinicalPearls}</p>
              </div>
            </div>

            {/* Bedside Provocative Tests List */}
            <div className="pt-1">
              <span className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider block mb-2">
                Nghiệm pháp kích thích rễ tại giường:
              </span>
              <div className="space-y-2">
                {current.provocativeTests.map((t, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-white border border-slate-200 text-xs shadow-2xs">
                    <div className="flex items-center justify-between font-semibold text-indigo-900">
                      <span>{t.name}</span>
                      <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                        Độ nhạy {t.sensitivity}
                      </span>
                    </div>
                    <p className="text-slate-600 text-[11px] mt-1 leading-relaxed">{t.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
