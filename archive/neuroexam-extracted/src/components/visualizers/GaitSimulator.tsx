import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Footprints,
  Play,
  Pause,
  RotateCcw,
  Eye,
  Compass,
  Activity,
  ShieldCheck,
  Layers,
  ChevronRight,
  Info
} from "lucide-react";

interface GaitPattern {
  id: string;
  name: string;
  vietnameseName: string;
  anatomicalSite: string;
  commonCauses: string[];
  keyFeatures: string[];
  clinicalExamTip: string;
  accentColor: string;
  hotspots: {
    title: string;
    description: string;
    joint: "head" | "pareticArm" | "normalArm" | "pelvis" | "pareticKnee" | "normalKnee" | "pareticFoot" | "normalFoot";
  }[];
}

const GAIT_PATTERNS: GaitPattern[] = [
  {
    id: "hemiparetic",
    name: "Hemiparetic Gait",
    vietnameseName: "Dáng Đi Phạt Cỏ (Vung Chân Nửa Người)",
    anatomicalSite: "Vỏ não vận động / Bó tháp bán cầu đối bên",
    accentColor: "#0284c7", // Sky/Blue
    commonCauses: [
      "Nhồi máu não / Xuất huyết não đối bên",
      "Chấn thương sọ não",
      "U não vùng vận động trung tâm"
    ],
    keyFeatures: [
      "Tay bên liệt co cứng gập: khép sát ngực, gập khuỷu, sấp cẳng tay, gập cổ tay & ngón tay, mất hoàn toàn vung tay.",
      "Chân bên liệt duỗi cứng: khớp gối không gập được, cổ chân duỗi lòng và lật trong (bàn chân thuổng vẹo trong).",
      "Pha vung chân (Swing phase): Bệnh nhân phải vung chân liệt ra ngoài tạo thành một vòng bán nguyệt 3D (Circumduction) để tránh quẹt mũi chân xuống mặt sàn."
    ],
    clinicalExamTip:
      "Thường kèm tăng phản xạ gân xương bên liệt (3+ đến 4+) và dấu Babinski (+). Có thể phát hiện liệt kín đáo bằng nghiệm pháp hạ tay Barré (Pronator drift) và nghiệm pháp Mingazzini chi dưới.",
    hotspots: [
      {
        joint: "pareticArm",
        title: "Co Cứng Tay Liệt",
        description: "Khép vai, gập khuỷu 90°, sấp cẳng tay, mất vung tay"
      },
      {
        joint: "pareticKnee",
        title: "Duỗi Cứng Khớp Gối",
        description: "Tăng trương lực cơ tứ đầu đùi, không gập được gối khi bước"
      },
      {
        joint: "pareticFoot",
        title: "Vung Phạt Cỏ (Circumduction)",
        description: "Bàn chân duỗi lòng vẹo trong, vung cánh cung 3D qua mặt ngoài"
      }
    ]
  },
  {
    id: "parkinsonian",
    name: "Parkinsonian Gait",
    vietnameseName: "Dáng Đi Cuống Quýt / Lê Bước (Parkinson)",
    anatomicalSite: "Hạch nền (Basal Ganglia) - Thoái hóa tế bào sinh Dopamine chất đen",
    accentColor: "#d97706", // Amber
    commonCauses: [
      "Bệnh Parkinson vô căn (Idiopathic Parkinson's Disease)",
      "Hội chứng Parkinson do thuốc chẹn thụ thể Dopamine (Neuroleptics)",
      "Thoái hóa đa hệ thống (MSA) / Liệt trên nhân tiến triển (PSP)"
    ],
    keyFeatures: [
      "Tư thế người gập ra trước (Stooped posture, gù lưng, gập cổ và hông).",
      "Mất hoặc giảm mạnh vung tay hai bên khi bước đi (Loss of arm swing).",
      "Bước chân ngắn, nhỏ, lê sát mặt sàn (Shuffling steps), không nhấc cao gót.",
      "Hiện tượng cuống quýt (Festination): Trọng tâm rơi ra phía trước làm bước chân tự động dồn dập tăng tốc đuổi theo.",
      "Hiện tượng đông cứng dáng đi (Freezing of gait) khi bắt đầu bước hoặc đi qua cửa hẹp."
    ],
    clinicalExamTip:
      "Thực hiện Nghiệm pháp Kéo Lùi (Pull Test) từ phía sau để phát hiện mất phản xạ tư thế. Tìm dấu hiệu 'Bánh xe răng cưa' (Cogwheel rigidity) ở cổ tay khi thụ động vận động.",
    hotspots: [
      {
        joint: "head",
        title: "Tư Thế Gập Trước",
        description: "Đầu và thân mình đổ dồn về trước (Stooped posture)"
      },
      {
        joint: "normalArm",
        title: "Mất Vung Tay 2 Bên",
        description: "Hai tay co nhẹ áp sát sườn, giảm hoàn toàn biên độ vung"
      },
      {
        joint: "normalFoot",
        title: "Lê Bước Chân Ngắn",
        description: "Bước chân nhỏ 15-20cm, lê sát đất, dồn dập cuống quýt"
      }
    ]
  },
  {
    id: "steppage",
    name: "Steppage Gait (Foot Drop)",
    vietnameseName: "Dáng Đi Chân Rũ / Nhấc Gối Cao",
    anatomicalSite: "Thần kinh Mác chung (Peroneal nerve) hoặc Rễ thần kinh L5",
    accentColor: "#059669", // Emerald
    commonCauses: [
      "Tổn thương dây thần kinh mác chung ở chỏm xương mác (chấn thương, bó bột, vắt chân)",
      "Thoát vị đĩa đệm cột sống thắt lưng L4-L5 chèn ép rễ L5",
      "Bệnh lý đa dây thần kinh ngoại biên di truyền (Charcot-Marie-Tooth)"
    ],
    keyFeatures: [
      "Liệt cơ chày trước dẫn đến mất hoàn toàn phản xạ gấp mu bàn chân (Bàn chân rũ xuống).",
      "Để mũi chân không bị quẹt đất và vấp ngã, người bệnh phải nhấc đùi và gập khớp gối lên rất cao như đang bước lên bậc thang cao.",
      "Khi đặt chân xuống, bàn chân đập mạnh đột ngột xuống mặt sàn phát ra tiếng bộp ('Foot-slap')."
    ],
    clinicalExamTip:
      "Khám đi bằng gót chân (Heel walking): chân bệnh hoàn toàn không nhấc mũi lên được. Phân biệt tổn thương dây mác (mất lật ngoài nhưng còn lật trong nhờ cơ chày sau do rễ L5/dây chày chi phối) vs tổn thương rễ L5 (mất cả lật ngoài lẫn lật trong).",
    hotspots: [
      {
        joint: "pareticKnee",
        title: "Gập Gối & Nhấc Đùi Cao",
        description: "Gập gối > 85° để bù trừ, tránh mũi chân quẹt đất"
      },
      {
        joint: "pareticFoot",
        title: "Bàn Chân Rũ (Foot Drop)",
        description: "Liệt cơ chày trước, mũi chân buông thõng đập xuống sàn"
      }
    ]
  },
  {
    id: "ataxic",
    name: "Cerebellar Ataxic Gait",
    vietnameseName: "Dáng Đi Thất Điều Tiểu Não (Người Say Rượu)",
    anatomicalSite: "Tiểu não (Thùy nhộng Vermis hoặc Bán cầu tiểu não)",
    accentColor: "#7c3aed", // Purple
    commonCauses: [
      "Đột quỵ hố sau (Nhồi máu động mạch tiểu não sau dưới PICA / trước dưới AICA)",
      "Ngộ độc cấp tính rượu hoặc thuốc chống co giật (Phenytoin, Carbamazepine)",
      "Bệnh thoái hóa tiểu não tủy sống (SCA), Xơ cứng rải rác (MS)"
    ],
    keyFeatures: [
      "Chân đế rất rộng (Wide-based gait, khoảng cách hai chân mở rộng 25-35 cm) để duy trì trọng tâm.",
      "Bước đi loạng choạng, không đều đặn về khoảng cách và nhịp độ, ngả nghiêng sang hai bên.",
      "Hai tay dang rộng ra hai bên như người đi thăng bằng trên dây để chống ngã.",
      "Hoàn toàn thất bại khi kiểm tra nghiệm pháp đi nối gót (Tandem gait)."
    ],
    clinicalExamTip:
      "Nếu ngả nghiêng về một bên cố định: Tổn thương bán cầu tiểu não cùng bên. Nếu chao đảo đa hướng cả khi đứng yên và ngồi: Tổn thương thùy nhộng (Vermis). Nghiệm pháp Romberg ở bệnh nhân thất điều tiểu não sẽ loạng choạng ngay cả khi mở mắt!",
    hotspots: [
      {
        joint: "head",
        title: "Chao Đảo Thân Mình",
        description: "Dao động đa hướng (Titubation), mất ổn định trục cơ thể"
      },
      {
        joint: "normalArm",
        title: "Dang Tay Giữ Thăng Bằng",
        description: "Hai tay dạng ra ngoài, khuỷu nâng cao như đi trên dây"
      },
      {
        joint: "normalFoot",
        title: "Chân Đế Rất Rộng",
        description: "Hai bàn chân cách xa nhau 30cm, bước đi zig-zag hỗn loạn"
      }
    ]
  },
  {
    id: "spastic",
    name: "Spastic Scissoring Gait",
    vietnameseName: "Dáng Đi Cắt Kéo (Tăng Trương Lực Cơ Khép)",
    anatomicalSite: "Bó tháp hai bên / Tủy sống cổ - ngực / Liệt hai chi dưới",
    accentColor: "#db2777", // Pink
    commonCauses: [
      "Bại não thể co cứng (Spastic Cerebral Palsy)",
      "Bệnh tủy sống cổ thoái hóa chèn ép tủy (Cervical Spondylotic Myelopathy)",
      "Viêm tủy cắt ngang, Chấn thương cột sống tổn thương bó tháp 2 bên"
    ],
    keyFeatures: [
      "Cả hai chân đều bị co cứng, duỗi đơ như đi cà kheo, khớp gối khó gập.",
      "Tăng trương lực cơ khép cực mạnh (Adductor hypertonia): Hai đùi và đầu gối chụm chặt cọ xát vào nhau.",
      "Mỗi bước tiến, cẳng chân bắt chéo qua đường giữa trước chân kia giống như hai lưỡi kéo đan nhau.",
      "Hai bàn chân duỗi lòng (Equinus), người bệnh bước đi chủ yếu trên các đầu ngón chân."
    ],
    clinicalExamTip:
      "Tăng phản xạ gân xương bánh chè và gót nảy vọt (3-4+) kèm giật rung đa nhịp (Clonus) cổ chân hai bên. Dấu hiệu dao gấp (Clasp-knife phenomenon) rõ ở hai chi dưới.",
    hotspots: [
      {
        joint: "pareticKnee",
        title: "Hai Đùi Khép Cọ Xát",
        description: "Co cứng cơ khép đùi cực độ, hai gối đan vào nhau"
      },
      {
        joint: "pareticFoot",
        title: "Bắt Chéo Đường Giữa",
        description: "Chân vung bắt chéo qua trục giữa như lưỡi kéo"
      }
    ]
  },
  {
    id: "waddling",
    name: "Waddling Gait (Trendelenburg)",
    vietnameseName: "Dáng Đi Lắc Lư Con Vịt (Yếu Cơ Đai Hông)",
    anatomicalSite: "Cơ đai hông (Cơ mông nhỡ) / Thần kinh mông trên / Bệnh lý cơ (Myopathy)",
    accentColor: "#0891b2", // Cyan
    commonCauses: [
      "Loạn dưỡng cơ tiến triển (Duchenne, Becker, Limb-girdle MD)",
      "Viêm đa cơ (Polymyositis) / Bệnh cơ do thuốc (Steroid myopathy)",
      "Trật khớp háng bẩm sinh hai bên ở người lớn"
    ],
    keyFeatures: [
      "Yếu cơ mông nhỡ làm mất khả năng giữ thăng bằng khung chậu khi một chân nhấc lên: Hông bên đối diện bị tụt sụt xuống thấp (Dấu Trendelenburg dương tính).",
      "Để bù trừ trọng tâm khỏi bị ngã, thân mình và vai phải nghiêng lắc mạnh sang phía chân đang chịu lực.",
      "Bước đi tạo thành nhịp lắc lư hai bên liên tục đặc trưng giống như con vịt di chuyển."
    ],
    clinicalExamTip:
      "Yêu cầu bệnh nhân đứng một chân (Trendelenburg Test) để quan sát hông bên đối diện bị sụt. Quan sát Dấu hiệu Gowers (+): Bệnh nhân phải dùng hai tay chống bò lên đùi mới đứng dậy được từ sàn nhà.",
    hotspots: [
      {
        joint: "pelvis",
        title: "Sụt Hông (Trendelenburg)",
        description: "Khung chậu nghiêng sụt 15° về bên chân không chịu lực"
      },
      {
        joint: "head",
        title: "Thân Lắc Lư Bù Trừ",
        description: "Thân mình ngả mạnh sang bên chân chịu lực để giữ trọng tâm"
      }
    ]
  }
];

// Camera angle presets for 2D / 3D view
interface CameraPreset {
  name: string;
  yaw: number;
  pitch: number;
  label: string;
}

const CAMERA_PRESETS: CameraPreset[] = [
  { name: "front", yaw: 0, pitch: 0, label: "Mặt Trước 2D (Coronal / Nhìn thẳng)" },
  { name: "side", yaw: 90, pitch: 0, label: "Mặt Bên 2D (Sagittal / Nhìn nghiêng)" },
  { name: "iso", yaw: 35, pitch: 18, label: "Phối Cảnh Nghiêng (3D)" },
  { name: "top", yaw: 0, pitch: 75, label: "Từ Trên Xuống (Mặt Sàn)" }
];

export const GaitSimulator: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>("hemiparetic");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [phase, setPhase] = useState<number>(0); // 0 to 2*PI

  // Camera Rotation State - default to 2D Frontal Coronal View
  const [yaw, setYaw] = useState<number>(0); // 0 = straight 2D
  const [pitch, setPitch] = useState<number>(0); // 0 = flat 2D
  const [activePreset, setActivePreset] = useState<string>("front");

  // Display toggles
  const [showTrail, setShowTrail] = useState<boolean>(true);
  const [showAngles, setShowAngles] = useState<boolean>(true);
  const [showHotspots, setShowHotspots] = useState<boolean>(true);

  // Animation frame reference
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(performance.now());

  const currentGait = useMemo(
    () => GAIT_PATTERNS.find((g) => g.id === selectedId) || GAIT_PATTERNS[0],
    [selectedId]
  );

  // Animation loop updating phase
  useEffect(() => {
    const animate = (now: number) => {
      const dt = (now - lastTimeRef.current) / 1000;
      lastTimeRef.current = now;

      if (isPlaying) {
        // Standard walk cycle frequency ~ 0.9 Hz (full cycle ~ 1.1s)
        const cadence = currentGait.id === "parkinsonian" ? 1.6 : 1.0;
        const deltaPhase = dt * Math.PI * 2 * 0.9 * playbackSpeed * cadence;
        setPhase((prev) => (prev + deltaPhase) % (Math.PI * 2));
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    lastTimeRef.current = performance.now();
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, playbackSpeed, currentGait.id]);

  // Set camera preset
  const handlePresetSelect = (preset: CameraPreset) => {
    setActivePreset(preset.name);
    setYaw(preset.yaw);
    setPitch(preset.pitch);
  };

  // 3D Projection Math
  // World space: X is Lateral (Right: +X, Left: -X), Y is Vertical (Height: Ground is 0, Head is +170), Z is Depth (Forward: +Z, Back: -Z)
  const project3D = (
    x: number,
    y: number,
    z: number,
    camYaw: number,
    camPitch: number,
    scale = 1.15,
    originX = 175,
    originY = 240
  ) => {
    const radY = (camYaw * Math.PI) / 180;
    const radX = (camPitch * Math.PI) / 180;

    // Rotate around Y axis (Yaw)
    const cosY = Math.cos(radY);
    const sinY = Math.sin(radY);
    const x1 = x * cosY - z * sinY;
    const z1 = x * sinY + z * cosY;

    // Rotate around X axis (Pitch)
    const cosX = Math.cos(radX);
    const sinX = Math.sin(radX);
    const y2 = y * cosX - z1 * sinX;
    const z2 = y * sinX + z1 * cosX;

    // Perspective projection
    const fovDist = 480;
    const perspective = fovDist / (fovDist + z2);

    const screenX = originX + x1 * perspective * scale;
    const screenY = originY - y2 * perspective * scale; // Invert Y so up is up

    return {
      x: screenX,
      y: screenY,
      depth: z2,
      scale: perspective * scale
    };
  };

  // 3D Kinematics Calculation for Mannequin Model
  const skeleton = useMemo(() => {
    const t = phase;
    const gaitId = currentGait.id;

    // Right leg phase and Left leg phase (antiphase)
    const rightPhase = t;
    const leftPhase = (t + Math.PI) % (Math.PI * 2);

    // Baseline Anatomical Dimensions (in cm units)
    // Ground Y = 0
    let headX = 0;
    let headY = 168;
    let headZ = 0;

    let chestX = 0;
    let chestY = 126;
    let chestZ = 0;

    let pelvisX = 0;
    let pelvisY = 88;
    let pelvisZ = 0;
    let pelvisTiltDeg = 0; // Lateral tilt for Trendelenburg

    // Torso sway
    let torsoLeanX = 0;
    let stoopZ = 0;

    // Joint Coordinates Default initialization
    let rShoulder = { x: 16, y: 130, z: 0 };
    let lShoulder = { x: -16, y: 130, z: 0 };

    let rElbow = { x: 20, y: 104, z: 0 };
    let lElbow = { x: -20, y: 104, z: 0 };

    let rHand = { x: 20, y: 80, z: 0 };
    let lHand = { x: -20, y: 80, z: 0 };

    let rHip = { x: 10, y: 88, z: 0 };
    let lHip = { x: -10, y: 88, z: 0 };

    let rKnee = { x: 10, y: 48, z: 0 };
    let lKnee = { x: -10, y: 48, z: 0 };

    let rAnkle = { x: 10, y: 8, z: 0 };
    let lAnkle = { x: -10, y: 8, z: 0 };

    let rToe = { x: 10, y: 0, z: 12 };
    let lToe = { x: -10, y: 0, z: 12 };

    // Real-time telemetry angles
    let telemetryKneeFlex = 20;
    let telemetryHipFlex = 25;
    let telemetryAnkleAngle = 0;
    let telemetryBaseWidth = 18;
    let telemetryStrideLength = 55;

    // ================= SPECIFIC GAIT KINEMATICS =================

    if (gaitId === "hemiparetic") {
      // Right side is PARETIC (Circumduction)
      // Left side is NORMAL
      telemetryBaseWidth = 18;
      telemetryStrideLength = 45;

      // Normal Left Arm: swings reciprocally
      const lArmSwing = Math.sin(leftPhase) * 22;
      lElbow = { x: -20, y: 104, z: lArmSwing * 0.8 };
      lHand = { x: -22, y: 80, z: lArmSwing * 1.5 };

      // Paretic Right Arm: Flexed elbow (90°), adducted shoulder, pronated, zero swing
      rShoulder = { x: 12, y: 130, z: 4 };
      rElbow = { x: 15, y: 106, z: 14 }; // elbow bent forward
      rHand = { x: 8, y: 110, z: 20 }; // hand held flexed against mid-chest

      // Normal Left Leg: normal swing and stance
      const lSwing = Math.sin(leftPhase);
      const lKneeBend = lSwing > 0 ? Math.sin(leftPhase) * 45 : 5;
      lHip = { x: -10, y: 88, z: 0 };
      lKnee = { x: -10, y: 48 + (lSwing > 0 ? 8 : 0), z: lSwing * 18 };
      lAnkle = { x: -10, y: 8 + (lSwing > 0 ? 10 : 0), z: lSwing * 26 };
      lToe = { x: -10, y: lSwing > 0 ? 10 : 0, z: lSwing * 26 + 12 };

      // Paretic Right Leg: Knee stiff in extension (cannot flex), Equinovarus foot
      // During swing (rightPhase 0 to PI), hip circumducts in wide lateral arc (X moves out to +28)
      const rSwingPhase = Math.sin(rightPhase);
      const isSwing = rSwingPhase > 0;
      const circumductionX = isSwing ? Math.sin(rightPhase) * 22 : 0;
      const rightHipHike = isSwing ? Math.sin(rightPhase) * 5 : 0; // Pelvic hike

      pelvisTiltDeg = isSwing ? 5 : 0;
      rHip = { x: 10, y: 88 + rightHipHike, z: 0 };
      // Stiff knee (< 5 deg flexion)
      rKnee = { x: 10 + circumductionX * 0.7, y: 48 + rightHipHike, z: Math.sin(rightPhase) * 16 };
      // Ankle plantarflexed + inverted (toe pointed down)
      rAnkle = { x: 10 + circumductionX, y: 8 + (isSwing ? 4 : 0), z: Math.sin(rightPhase) * 22 };
      // Equinovarus toe (pointing inwards and downwards)
      rToe = { x: 6 + circumductionX, y: isSwing ? 1 : 0, z: Math.sin(rightPhase) * 22 + 10 };

      telemetryKneeFlex = isSwing ? 6 : 2; // Stiff
      telemetryHipFlex = 22;
      telemetryAnkleAngle = -28; // Equinus (plantarflexion)
    } else if (gaitId === "parkinsonian") {
      // Stooped posture, small shuffling steps, loss of arm swing
      telemetryBaseWidth = 14;
      telemetryStrideLength = 18; // Very short steps

      stoopZ = 24; // Thorax stooped forward
      headZ = 30;
      headY = 160; // Stooped head
      chestZ = 22;
      chestY = 120;

      // Both arms flexed at elbows (60°), held rigid near flanks, virtually NO swing
      rElbow = { x: 16, y: 100, z: 14 };
      lElbow = { x: -16, y: 100, z: 14 };
      rHand = { x: 14, y: 84, z: 20 };
      lHand = { x: -14, y: 84, z: 20 };

      // Small rapid shuffling strides, feet close to floor
      const rStepZ = Math.sin(rightPhase) * 10;
      const lStepZ = Math.sin(leftPhase) * 10;

      const rLift = Math.max(0, Math.sin(rightPhase)) * 3; // Barely 3cm off floor
      const lLift = Math.max(0, Math.sin(leftPhase)) * 3;

      // Knees permanently slightly bent (15 deg flexion)
      rKnee = { x: 8, y: 46 + rLift, z: rStepZ * 0.7 + 6 };
      lKnee = { x: -8, y: 46 + lLift, z: lStepZ * 0.7 + 6 };

      rAnkle = { x: 8, y: 8 + rLift, z: rStepZ };
      lAnkle = { x: -8, y: 8 + lLift, z: lStepZ };

      rToe = { x: 8, y: rLift, z: rStepZ + 11 };
      lToe = { x: -8, y: lLift, z: lStepZ + 11 };

      telemetryKneeFlex = 16;
      telemetryHipFlex = 30; // Stooped
      telemetryAnkleAngle = -2;
    } else if (gaitId === "steppage") {
      // Foot Drop (Right side): High knee and hip flexion to clear toes
      telemetryBaseWidth = 18;
      telemetryStrideLength = 50;

      // Normal arms
      const armSwing = Math.sin(t) * 18;
      rHand = { x: 20, y: 80, z: -armSwing };
      lHand = { x: -20, y: 80, z: armSwing };

      // Normal Left Leg
      const lSwing = Math.sin(leftPhase);
      const lLift = Math.max(0, lSwing) * 8;
      lKnee = { x: -10, y: 48 + lLift, z: lSwing * 18 };
      lAnkle = { x: -10, y: 8 + lLift, z: lSwing * 24 };
      lToe = { x: -10, y: lLift, z: lSwing * 24 + 12 };

      // Right Leg (Affected): High steppage (knee lifted up to 75-85° flexion)
      const rSwing = Math.sin(rightPhase);
      const isRSwing = rSwing > 0;
      const rHighLift = isRSwing ? Math.sin(rightPhase) * 22 : 0; // High knee lift

      rKnee = { x: 10, y: 48 + rHighLift * 0.9, z: rSwing * 22 + (isRSwing ? 10 : 0) };
      // Ankle hangs down limp in plantarflexion
      rAnkle = { x: 10, y: 8 + rHighLift, z: rSwing * 26 };
      // Toe hangs limp below ankle when lifted
      rToe = { x: 10, y: isRSwing ? 8 + rHighLift - 8 : 0, z: rSwing * 26 + (isRSwing ? 2 : 12) };

      telemetryKneeFlex = isRSwing ? 85 : 12; // High flexion
      telemetryHipFlex = isRSwing ? 65 : 20;
      telemetryAnkleAngle = isRSwing ? -35 : 0; // Limp foot drop
    } else if (gaitId === "ataxic") {
      // Wide base, arms abducted for balance, irregular lateral sway
      telemetryBaseWidth = 32; // Wide base
      telemetryStrideLength = 38;

      // Lateral trunk sway (staggering)
      torsoLeanX = Math.sin(t * 0.8) * 10;
      headX = torsoLeanX * 1.3;
      chestX = torsoLeanX;

      // Arms abducted wide (balance pole posture)
      rShoulder = { x: 18, y: 130, z: 0 };
      lShoulder = { x: -18, y: 130, z: 0 };
      rElbow = { x: 30, y: 110, z: 8 };
      lElbow = { x: -30, y: 110, z: -8 };
      rHand = { x: 36, y: 95, z: 12 };
      lHand = { x: -36, y: 95, z: -4 };

      // Wide stance hips and legs
      const rStepZ = Math.sin(rightPhase) * 18;
      const lStepZ = Math.sin(leftPhase) * 18;

      rHip = { x: 15, y: 88, z: 0 };
      lHip = { x: -15, y: 88, z: 0 };

      const rLift = Math.max(0, Math.sin(rightPhase)) * 12;
      const lLift = Math.max(0, Math.sin(leftPhase)) * 12;

      rKnee = { x: 18, y: 48 + rLift * 0.6, z: rStepZ };
      lKnee = { x: -18, y: 48 + lLift * 0.6, z: lStepZ };

      rAnkle = { x: 20, y: 8 + rLift, z: rStepZ * 1.2 };
      lAnkle = { x: -20, y: 8 + lLift, z: lStepZ * 1.2 };

      rToe = { x: 21, y: rLift, z: rStepZ * 1.2 + 12 };
      lToe = { x: -21, y: lLift, z: lStepZ * 1.2 + 12 };

      telemetryKneeFlex = 30;
      telemetryHipFlex = 24;
      telemetryAnkleAngle = 5;
    } else if (gaitId === "spastic") {
      // Scissoring: Adductor spasm, crossing midline, stiff extension, equinus
      telemetryBaseWidth = 6; // Very narrow / crossing
      telemetryStrideLength = 32;

      // Both arms held guarding in slight flexion
      rElbow = { x: 16, y: 108, z: 8 };
      lElbow = { x: -16, y: 108, z: 8 };
      rHand = { x: 14, y: 88, z: 14 };
      lHand = { x: -14, y: 88, z: 14 };

      // Legs stiff in extension (<10° knee bend)
      // Knees adducted inward touching each other
      const rSwing = Math.sin(rightPhase);
      const lSwing = Math.sin(leftPhase);

      // Crossing midline: when right swings, X crosses to negative (left of midline)
      const rCrossX = rSwing > 0 ? -Math.sin(rightPhase) * 10 : 4;
      const lCrossX = lSwing > 0 ? Math.sin(leftPhase) * 10 : -4;

      rKnee = { x: rCrossX + 3, y: 48, z: rSwing * 16 };
      lKnee = { x: lCrossX - 3, y: 48, z: lSwing * 16 };

      // Walking on balls of feet / toes (Equinus)
      rAnkle = { x: rCrossX + 2, y: 12, z: rSwing * 20 };
      lAnkle = { x: lCrossX - 2, y: 12, z: lSwing * 20 };

      rToe = { x: rCrossX + 2, y: 0, z: rSwing * 20 + 10 };
      lToe = { x: lCrossX - 2, y: 0, z: lSwing * 20 + 10 };

      telemetryKneeFlex = 8; // Stiff
      telemetryHipFlex = 18;
      telemetryAnkleAngle = -30; // Equinus
    } else if (gaitId === "waddling") {
      // Trendelenburg: Pelvic drop to unsupported side + compensatory torso lurch
      telemetryBaseWidth = 24;
      telemetryStrideLength = 40;

      // When Right leg is lifted (right swing > 0), Right pelvis drops by 12 deg
      // Torso lurches strongly to Left stance side
      const pelvicOscillation = Math.sin(t);
      pelvisTiltDeg = pelvicOscillation * 14;

      // Compensatory torso tilt opposite direction
      torsoLeanX = -pelvicOscillation * 16;
      headX = torsoLeanX * 1.2;
      chestX = torsoLeanX;

      const rLift = Math.max(0, Math.sin(rightPhase)) * 8;
      const lLift = Math.max(0, Math.sin(leftPhase)) * 8;

      // Pelvis height shifts
      rHip = { x: 12, y: 88 - pelvisTiltDeg * 0.8, z: 0 };
      lHip = { x: -12, y: 88 + pelvisTiltDeg * 0.8, z: 0 };

      rKnee = { x: 14 + torsoLeanX * 0.2, y: 48 + rLift * 0.5, z: Math.sin(rightPhase) * 16 };
      lKnee = { x: -14 + torsoLeanX * 0.2, y: 48 + lLift * 0.5, z: Math.sin(leftPhase) * 16 };

      rAnkle = { x: 14, y: 8 + rLift, z: Math.sin(rightPhase) * 20 };
      lAnkle = { x: -14, y: 8 + lLift, z: Math.sin(leftPhase) * 20 };

      rToe = { x: 14, y: rLift, z: Math.sin(rightPhase) * 20 + 12 };
      lToe = { x: -14, y: lLift, z: Math.sin(leftPhase) * 20 + 12 };

      telemetryKneeFlex = 25;
      telemetryHipFlex = 22;
      telemetryAnkleAngle = 2;
    }

    // Apply stoop and torso lean to head & chest
    const headPt = { x: headX, y: headY, z: headZ + stoopZ };
    const chestPt = { x: chestX, y: chestY, z: chestZ + stoopZ * 0.7 };
    const pelvisPt = { x: pelvisX, y: pelvisY, z: pelvisZ };

    // Project all joints to screen coordinates
    const pHead = project3D(headPt.x, headPt.y, headPt.z, yaw, pitch);
    const pChest = project3D(chestPt.x, chestPt.y, chestPt.z, yaw, pitch);
    const pPelvis = project3D(pelvisPt.x, pelvisPt.y, pelvisPt.z, yaw, pitch);

    const pRShoulder = project3D(rShoulder.x, rShoulder.y, rShoulder.z, yaw, pitch);
    const pLShoulder = project3D(lShoulder.x, lShoulder.y, lShoulder.z, yaw, pitch);

    const pRElbow = project3D(rElbow.x, rElbow.y, rElbow.z, yaw, pitch);
    const pLElbow = project3D(lElbow.x, lElbow.y, lElbow.z, yaw, pitch);

    const pRHand = project3D(rHand.x, rHand.y, rHand.z, yaw, pitch);
    const pLHand = project3D(lHand.x, lHand.y, lHand.z, yaw, pitch);

    const pRHip = project3D(rHip.x, rHip.y, rHip.z, yaw, pitch);
    const pLHip = project3D(lHip.x, lHip.y, lHip.z, yaw, pitch);

    const pRKnee = project3D(rKnee.x, rKnee.y, rKnee.z, yaw, pitch);
    const pLKnee = project3D(lKnee.x, lKnee.y, lKnee.z, yaw, pitch);

    const pRAnkle = project3D(rAnkle.x, rAnkle.y, rAnkle.z, yaw, pitch);
    const pLAnkle = project3D(lAnkle.x, lAnkle.y, lAnkle.z, yaw, pitch);

    const pRToe = project3D(rToe.x, rToe.y, rToe.z, yaw, pitch);
    const pLToe = project3D(lToe.x, lToe.y, lToe.z, yaw, pitch);

    // Ground shadows for feet and pelvis
    const sPelvis = project3D(pelvisPt.x, 0, pelvisPt.z, yaw, pitch);
    const sRFoot = project3D(rAnkle.x, 0, rAnkle.z + 5, yaw, pitch);
    const sLFoot = project3D(lAnkle.x, 0, lAnkle.z + 5, yaw, pitch);

    return {
      joints: {
        head: pHead,
        chest: pChest,
        pelvis: pPelvis,
        rShoulder: pRShoulder,
        lShoulder: pLShoulder,
        rElbow: pRElbow,
        lElbow: pLElbow,
        rHand: pRHand,
        lHand: pLHand,
        rHip: pRHip,
        lHip: pLHip,
        rKnee: pRKnee,
        lKnee: pLKnee,
        rAnkle: pRAnkle,
        lAnkle: pLAnkle,
        rToe: pRToe,
        lToe: pLToe
      },
      shadows: {
        pelvis: sPelvis,
        rFoot: sRFoot,
        lFoot: sLFoot
      },
      raw: {
        rAnkle,
        lAnkle,
        pelvisTiltDeg
      },
      telemetry: {
        kneeFlex: telemetryKneeFlex,
        hipFlex: telemetryHipFlex,
        pelvicTilt: Math.abs(pelvisTiltDeg),
        ankleAngle: telemetryAnkleAngle,
        baseWidth: telemetryBaseWidth,
        strideLength: telemetryStrideLength
      }
    };
  }, [phase, currentGait.id, yaw, pitch]);

  // 3D Ground Grid Line Segments
  const groundGrid = useMemo(() => {
    const lines = [];
    const step = 20;
    const range = 60;

    // Transverse lines (along X axis)
    for (let z = -range; z <= range; z += step) {
      const p1 = project3D(-range, 0, z, yaw, pitch);
      const p2 = project3D(range, 0, z, yaw, pitch);
      lines.push({ p1, p2, isCenter: z === 0 });
    }

    // Longitudinal lines (along Z axis)
    for (let x = -range; x <= range; x += step) {
      const p1 = project3D(x, 0, -range, yaw, pitch);
      const p2 = project3D(x, 0, range, yaw, pitch);
      lines.push({ p1, p2, isCenter: x === 0 });
    }

    return lines;
  }, [yaw, pitch]);

  // Dynamic Trajectory Ribbon / Floor Track Path in 3D
  const trajectoryPath = useMemo(() => {
    const points = [];
    const steps = 36;
    const gaitId = currentGait.id;

    for (let i = 0; i <= steps; i++) {
      const subPhase = (i / steps) * Math.PI * 2;
      let x = 10;
      let y = 0;
      let z = Math.sin(subPhase) * 24;

      if (gaitId === "hemiparetic") {
        // Circumduction outer semicircle
        const isSwing = Math.sin(subPhase) > 0;
        const circumX = isSwing ? Math.sin(subPhase) * 22 : 0;
        x = 10 + circumX;
        y = isSwing ? Math.sin(subPhase) * 4 : 0;
      } else if (gaitId === "steppage") {
        // High vertical arc
        const isSwing = Math.sin(subPhase) > 0;
        y = isSwing ? Math.sin(subPhase) * 22 : 0;
      } else if (gaitId === "spastic") {
        // Crosses over to negative X
        const isSwing = Math.sin(subPhase) > 0;
        x = isSwing ? -Math.sin(subPhase) * 10 + 2 : 4;
      } else if (gaitId === "parkinsonian") {
        // Tiny step cluster
        z = Math.sin(subPhase) * 9;
        x = 8;
      } else if (gaitId === "ataxic") {
        // Wide stagger
        x = 20 + Math.sin(subPhase * 2) * 6;
      } else if (gaitId === "waddling") {
        x = 14 + Math.sin(subPhase) * 5;
      }

      const pt = project3D(x, y, z, yaw, pitch);
      points.push(pt);
    }
    return points;
  }, [currentGait.id, yaw, pitch]);

  // Map hotspot key to joint position
  const getHotspotPosition = (jointKey: string) => {
    const j = skeleton.joints;
    switch (jointKey) {
      case "head":
        return j.head;
      case "pareticArm":
        return j.rElbow;
      case "normalArm":
        return j.lElbow;
      case "pelvis":
        return j.pelvis;
      case "pareticKnee":
        return j.rKnee;
      case "normalKnee":
        return j.lKnee;
      case "pareticFoot":
        return j.rToe;
      case "normalFoot":
        return j.lToe;
      default:
        return j.chest;
    }
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-4 md:p-6 shadow-xs space-y-6">
      {/* Header section with 3D status badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200">
              <Footprints className="w-5 h-5" />
            </span>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <span>Mô Phỏng 2D Đồ Họa Động 6 Dạng Dáng Đi Thần Kinh Kinh Điển</span>
              <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-emerald-600 text-white shadow-2xs">
                2D BIOMECHANICS
              </span>
            </h3>
          </div>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            Mô hình giải phẫu người 2D trực quan mặt phẳng đứng trán (Coronal) và mặt bên (Sagittal), phân tích quỹ đạo vung chi và góc khớp thời gian thực.
          </p>
        </div>

        {/* Playback Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              isPlaying
                ? "bg-amber-100 text-amber-800 hover:bg-amber-200 border border-amber-300"
                : "bg-emerald-600 text-white hover:bg-emerald-700 shadow-2xs"
            }`}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            {isPlaying ? "Tạm dừng" : "Tiếp tục chạy"}
          </button>

          <button
            onClick={() => {
              setPhase(0);
              setIsPlaying(true);
            }}
            title="Khởi động lại chu kỳ bước"
            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Gait Pattern Selector Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {GAIT_PATTERNS.map((pattern) => {
          const isSelected = pattern.id === selectedId;
          return (
            <button
              key={pattern.id}
              onClick={() => setSelectedId(pattern.id)}
              className={`p-2.5 rounded-xl border text-left transition-all relative overflow-hidden ${
                isSelected
                  ? "bg-slate-900 border-slate-900 text-white shadow-sm ring-2 ring-emerald-500/50"
                  : "bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-900"
              }`}
            >
              <div
                className="absolute top-0 left-0 right-0 h-1"
                style={{ backgroundColor: pattern.accentColor }}
              />
              <span
                className={`text-[10px] font-mono block ${
                  isSelected ? "text-emerald-400 font-bold" : "text-slate-400"
                }`}
              >
                {pattern.name}
              </span>
              <span
                className={`text-xs font-semibold line-clamp-1 mt-0.5 ${
                  isSelected ? "text-white" : "text-slate-800"
                }`}
              >
                {pattern.vietnameseName.split("(")[0]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Camera Controls & Viewport Tools */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-100/80 p-3 rounded-xl border border-slate-200 text-xs">
        {/* Preset Angle Buttons */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-slate-500 font-semibold flex items-center gap-1 text-[11px] mr-1">
            <Compass className="w-3.5 h-3.5 text-slate-600" />
            <span>Mặt cắt quan sát:</span>
          </span>
          {CAMERA_PRESETS.map((preset) => (
            <button
              key={preset.name}
              onClick={() => handlePresetSelect(preset)}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                activePreset === preset.name
                  ? "bg-emerald-600 text-white shadow-2xs font-semibold"
                  : "bg-white text-slate-700 hover:bg-slate-200/80 border border-slate-200"
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>

        {/* View toggles & Speed */}
        <div className="flex items-center gap-3 ml-auto flex-wrap">
          {/* Playback speed multiplier */}
          <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-lg border border-slate-200">
            <span className="text-slate-400 text-[10px]">Tốc độ:</span>
            {[0.5, 1.0, 1.5].map((spd) => (
              <button
                key={spd}
                onClick={() => setPlaybackSpeed(spd)}
                className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                  playbackSpeed === spd
                    ? "bg-slate-800 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>

          {/* Toggles */}
          <label className="flex items-center gap-1 cursor-pointer select-none text-slate-700">
            <input
              type="checkbox"
              checked={showTrail}
              onChange={(e) => setShowTrail(e.target.checked)}
              className="rounded text-emerald-600 focus:ring-emerald-500 w-3.5 h-3.5"
            />
            <span>Quỹ đạo vung bước</span>
          </label>

          <label className="flex items-center gap-1 cursor-pointer select-none text-slate-700">
            <input
              type="checkbox"
              checked={showHotspots}
              onChange={(e) => setShowHotspots(e.target.checked)}
              className="rounded text-emerald-600 focus:ring-emerald-500 w-3.5 h-3.5"
            />
            <span>Nhãn chú giải</span>
          </label>
        </div>
      </div>

      {/* Main 3D Simulation Viewport & Clinical Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: 3D Animated Mannequin Stage */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-4 relative overflow-hidden shadow-lg flex flex-col items-center justify-between min-h-[460px]">
          {/* Subtle 3D Orientation Compass Badge */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-slate-800/90 backdrop-blur-xs border border-slate-700 px-2.5 py-1 rounded-lg text-[10px] font-mono text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Yaw: {yaw}°</span>
            <span className="text-slate-500">|</span>
            <span>Pitch: {pitch}°</span>
            <span className="text-slate-500">|</span>
            <span>Pha: {Math.round((phase / (Math.PI * 2)) * 100)}%</span>
          </div>

          {/* Current Gait Title Badge Overlay */}
          <div className="absolute top-4 right-4 z-10 bg-slate-800/90 backdrop-blur-xs border border-slate-700 px-3 py-1.5 rounded-xl text-right">
            <span className="text-[10px] font-mono text-emerald-400 font-bold block">
              {currentGait.name}
            </span>
            <span className="text-xs font-semibold text-white">
              {currentGait.vietnameseName.split("(")[0]}
            </span>
          </div>

          {/* 3D SVG STAGE */}
          <svg
            viewBox="0 0 350 360"
            className="w-full h-80 sm:h-96 overflow-visible select-none my-auto"
          >
            <defs>
              {/* Radial Gradients for 3D Shaded Spheres & Mannequin Joints */}
              <radialGradient id="gradHead" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#bae6fd" />
                <stop offset="50%" stopColor="#0284c7" />
                <stop offset="100%" stopColor="#0369a1" />
              </radialGradient>

              <radialGradient id="gradTorso" cx="30%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#cbd5e1" />
                <stop offset="60%" stopColor="#475569" />
                <stop offset="100%" stopColor="#1e293b" />
              </radialGradient>

              <radialGradient id="gradNormalJoint" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#e2e8f0" />
                <stop offset="70%" stopColor="#64748b" />
                <stop offset="100%" stopColor="#334155" />
              </radialGradient>

              <radialGradient id="gradPareticJoint" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#fecdd3" />
                <stop offset="60%" stopColor="#e11d48" />
                <stop offset="100%" stopColor="#9f1239" />
              </radialGradient>

              {/* Shadow filter */}
              <filter id="shadowBlur" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
              </filter>
            </defs>

            {/* 1. 3D Ground Perspective Grid */}
            <g opacity="0.25">
              {groundGrid.map((line, idx) => (
                <line
                  key={idx}
                  x1={line.p1.x}
                  y1={line.p1.y}
                  x2={line.p2.x}
                  y2={line.p2.y}
                  stroke={line.isCenter ? "#10b981" : "#64748b"}
                  strokeWidth={line.isCenter ? 1.5 : 0.8}
                  strokeDasharray={line.isCenter ? "none" : "2 3"}
                />
              ))}
            </g>

            {/* 2. Projected 3D Cast Shadows on Floor Plane */}
            <g opacity="0.4" filter="url(#shadowBlur)">
              {/* Pelvis cast shadow */}
              <ellipse
                cx={skeleton.shadows.pelvis.x}
                cy={skeleton.shadows.pelvis.y}
                rx={22 * skeleton.shadows.pelvis.scale}
                ry={9 * skeleton.shadows.pelvis.scale}
                fill="#000000"
              />
              {/* Right Foot shadow */}
              <ellipse
                cx={skeleton.shadows.rFoot.x}
                cy={skeleton.shadows.rFoot.y}
                rx={12 * skeleton.shadows.rFoot.scale}
                ry={5 * skeleton.shadows.rFoot.scale}
                fill="#000000"
              />
              {/* Left Foot shadow */}
              <ellipse
                cx={skeleton.shadows.lFoot.x}
                cy={skeleton.shadows.lFoot.y}
                rx={12 * skeleton.shadows.lFoot.scale}
                ry={5 * skeleton.shadows.lFoot.scale}
                fill="#000000"
              />
            </g>

            {/* 3. 3D Trajectory Ribbon / Walking Path */}
            {showTrail && trajectoryPath.length > 1 && (
              <g>
                <polyline
                  points={trajectoryPath.map((p) => `${p.x},${p.y}`).join(" ")}
                  fill="none"
                  stroke={currentGait.accentColor}
                  strokeWidth="2.5"
                  strokeDasharray="4 3"
                  opacity="0.85"
                />
                {/* Arrowhead at forward direction */}
                <circle
                  cx={trajectoryPath[0].x}
                  cy={trajectoryPath[0].y}
                  r="3.5"
                  fill={currentGait.accentColor}
                />
              </g>
            )}

            {/* 4. 3D Volumetric Mannequin Human Figure */}
            {/* Pelvis to Torso Backbone */}
            <line
              x1={skeleton.joints.pelvis.x}
              y1={skeleton.joints.pelvis.y}
              x2={skeleton.joints.chest.x}
              y2={skeleton.joints.chest.y}
              stroke="#475569"
              strokeWidth={10 * skeleton.joints.chest.scale}
              strokeLinecap="round"
            />
            {/* Clavicle / Shoulder Bar */}
            <line
              x1={skeleton.joints.lShoulder.x}
              y1={skeleton.joints.lShoulder.y}
              x2={skeleton.joints.rShoulder.x}
              y2={skeleton.joints.rShoulder.y}
              stroke="#64748b"
              strokeWidth={6 * skeleton.joints.chest.scale}
              strokeLinecap="round"
            />
            {/* Pelvic Ring Bar (Shows Trendelenburg lateral tilt) */}
            <line
              x1={skeleton.joints.lHip.x}
              y1={skeleton.joints.lHip.y}
              x2={skeleton.joints.rHip.x}
              y2={skeleton.joints.rHip.y}
              stroke={currentGait.id === "waddling" ? "#06b6d4" : "#64748b"}
              strokeWidth={8 * skeleton.joints.pelvis.scale}
              strokeLinecap="round"
            />

            {/* Neck */}
            <line
              x1={skeleton.joints.chest.x}
              y1={skeleton.joints.chest.y}
              x2={skeleton.joints.head.x}
              y2={skeleton.joints.head.y}
              stroke="#475569"
              strokeWidth={6 * skeleton.joints.head.scale}
              strokeLinecap="round"
            />

            {/* Left Arm (Normal or Contralateral) */}
            <line
              x1={skeleton.joints.lShoulder.x}
              y1={skeleton.joints.lShoulder.y}
              x2={skeleton.joints.lElbow.x}
              y2={skeleton.joints.lElbow.y}
              stroke="#64748b"
              strokeWidth={5 * skeleton.joints.lShoulder.scale}
              strokeLinecap="round"
            />
            <line
              x1={skeleton.joints.lElbow.x}
              y1={skeleton.joints.lElbow.y}
              x2={skeleton.joints.lHand.x}
              y2={skeleton.joints.lHand.y}
              stroke="#94a3b8"
              strokeWidth={4 * skeleton.joints.lElbow.scale}
              strokeLinecap="round"
            />
            <circle
              cx={skeleton.joints.lElbow.x}
              cy={skeleton.joints.lElbow.y}
              r={4 * skeleton.joints.lElbow.scale}
              fill="url(#gradNormalJoint)"
            />
            <circle
              cx={skeleton.joints.lHand.x}
              cy={skeleton.joints.lHand.y}
              r={4.5 * skeleton.joints.lHand.scale}
              fill="url(#gradNormalJoint)"
            />

            {/* Left Leg */}
            <line
              x1={skeleton.joints.lHip.x}
              y1={skeleton.joints.lHip.y}
              x2={skeleton.joints.lKnee.x}
              y2={skeleton.joints.lKnee.y}
              stroke="#64748b"
              strokeWidth={7 * skeleton.joints.lHip.scale}
              strokeLinecap="round"
            />
            <line
              x1={skeleton.joints.lKnee.x}
              y1={skeleton.joints.lKnee.y}
              x2={skeleton.joints.lAnkle.x}
              y2={skeleton.joints.lAnkle.y}
              stroke="#94a3b8"
              strokeWidth={5.5 * skeleton.joints.lKnee.scale}
              strokeLinecap="round"
            />
            {/* Left Foot Segment */}
            <line
              x1={skeleton.joints.lAnkle.x}
              y1={skeleton.joints.lAnkle.y}
              x2={skeleton.joints.lToe.x}
              y2={skeleton.joints.lToe.y}
              stroke="#cbd5e1"
              strokeWidth={5 * skeleton.joints.lAnkle.scale}
              strokeLinecap="round"
            />
            <circle
              cx={skeleton.joints.lKnee.x}
              cy={skeleton.joints.lKnee.y}
              r={5 * skeleton.joints.lKnee.scale}
              fill="url(#gradNormalJoint)"
            />
            <circle
              cx={skeleton.joints.lAnkle.x}
              cy={skeleton.joints.lAnkle.y}
              r={4 * skeleton.joints.lAnkle.scale}
              fill="url(#gradNormalJoint)"
            />

            {/* Right Arm (Affected in Hemiparetic, or both in Parkinson/Spastic) */}
            {(() => {
              const isPareticArm =
                currentGait.id === "hemiparetic" ||
                currentGait.id === "parkinsonian" ||
                currentGait.id === "spastic";
              const strokeColor = isPareticArm ? currentGait.accentColor : "#64748b";
              const gradJoint = isPareticArm ? "url(#gradPareticJoint)" : "url(#gradNormalJoint)";

              return (
                <g>
                  <line
                    x1={skeleton.joints.rShoulder.x}
                    y1={skeleton.joints.rShoulder.y}
                    x2={skeleton.joints.rElbow.x}
                    y2={skeleton.joints.rElbow.y}
                    stroke={strokeColor}
                    strokeWidth={5.5 * skeleton.joints.rShoulder.scale}
                    strokeLinecap="round"
                  />
                  <line
                    x1={skeleton.joints.rElbow.x}
                    y1={skeleton.joints.rElbow.y}
                    x2={skeleton.joints.rHand.x}
                    y2={skeleton.joints.rHand.y}
                    stroke={strokeColor}
                    strokeWidth={4.5 * skeleton.joints.rElbow.scale}
                    strokeLinecap="round"
                  />
                  <circle
                    cx={skeleton.joints.rElbow.x}
                    cy={skeleton.joints.rElbow.y}
                    r={4 * skeleton.joints.rElbow.scale}
                    fill={gradJoint}
                  />
                  <circle
                    cx={skeleton.joints.rHand.x}
                    cy={skeleton.joints.rHand.y}
                    r={4.5 * skeleton.joints.rHand.scale}
                    fill={gradJoint}
                  />
                </g>
              );
            })()}

            {/* Right Leg (Affected in Hemiparetic/Steppage, or both in Spastic/Waddling/Ataxic) */}
            {(() => {
              const isPareticLeg =
                currentGait.id === "hemiparetic" ||
                currentGait.id === "steppage" ||
                currentGait.id === "spastic";
              const strokeColor = isPareticLeg ? currentGait.accentColor : "#64748b";
              const gradJoint = isPareticLeg ? "url(#gradPareticJoint)" : "url(#gradNormalJoint)";

              return (
                <g>
                  <line
                    x1={skeleton.joints.rHip.x}
                    y1={skeleton.joints.rHip.y}
                    x2={skeleton.joints.rKnee.x}
                    y2={skeleton.joints.rKnee.y}
                    stroke={strokeColor}
                    strokeWidth={7 * skeleton.joints.rHip.scale}
                    strokeLinecap="round"
                  />
                  <line
                    x1={skeleton.joints.rKnee.x}
                    y1={skeleton.joints.rKnee.y}
                    x2={skeleton.joints.rAnkle.x}
                    y2={skeleton.joints.rAnkle.y}
                    stroke={strokeColor}
                    strokeWidth={5.5 * skeleton.joints.rKnee.scale}
                    strokeLinecap="round"
                  />
                  {/* Right Foot */}
                  <line
                    x1={skeleton.joints.rAnkle.x}
                    y1={skeleton.joints.rAnkle.y}
                    x2={skeleton.joints.rToe.x}
                    y2={skeleton.joints.rToe.y}
                    stroke={isPareticLeg ? "#f43f5e" : "#cbd5e1"}
                    strokeWidth={5 * skeleton.joints.rAnkle.scale}
                    strokeLinecap="round"
                  />
                  <circle
                    cx={skeleton.joints.rKnee.x}
                    cy={skeleton.joints.rKnee.y}
                    r={5 * skeleton.joints.rKnee.scale}
                    fill={gradJoint}
                  />
                  <circle
                    cx={skeleton.joints.rAnkle.x}
                    cy={skeleton.joints.rAnkle.y}
                    r={4.5 * skeleton.joints.rAnkle.scale}
                    fill={gradJoint}
                  />
                </g>
              );
            })()}

            {/* Head Sphere (3D shaded) with Visor/Direction Marker */}
            <g>
              <circle
                cx={skeleton.joints.head.x}
                cy={skeleton.joints.head.y}
                r={13 * skeleton.joints.head.scale}
                fill="url(#gradHead)"
                stroke="#0369a1"
                strokeWidth="1.5"
              />
              {/* Visor face marker pointing in 3D direction */}
              <ellipse
                cx={skeleton.joints.head.x + Math.sin((yaw * Math.PI) / 180) * 4}
                cy={skeleton.joints.head.y - 1}
                rx={7 * skeleton.joints.head.scale}
                ry={3 * skeleton.joints.head.scale}
                fill="#38bdf8"
                opacity="0.8"
              />
            </g>

            {/* 5. 3D Hotspot Annotation Badges */}
            {showHotspots &&
              currentGait.hotspots.map((hs, idx) => {
                const pos = getHotspotPosition(hs.joint);
                const isLeftOffset = pos.x < 175;
                const offsetX = isLeftOffset ? -85 : 45;
                const offsetY = (idx % 2 === 0 ? -1 : 1) * 20;

                return (
                  <g key={idx} className="transition-all duration-300">
                    {/* Anchor line */}
                    <line
                      x1={pos.x}
                      y1={pos.y}
                      x2={pos.x + offsetX * 0.4}
                      y2={pos.y + offsetY}
                      stroke={currentGait.accentColor}
                      strokeWidth="1.2"
                      strokeDasharray="2 2"
                      opacity="0.85"
                    />
                    {/* Hotspot Target Pulse Ring */}
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r="4"
                      fill={currentGait.accentColor}
                      opacity="0.75"
                    />
                    <circle cx={pos.x} cy={pos.y} r="3" fill="#ffffff" />

                    {/* Annotation Label Pill */}
                    <foreignObject
                      x={pos.x + (isLeftOffset ? -145 : 20)}
                      y={pos.y + offsetY - 14}
                      width="140"
                      height="50"
                      className="overflow-visible pointer-events-none"
                    >
                      <div className="bg-slate-950/90 backdrop-blur-xs border border-slate-700/90 text-white rounded-lg p-1.5 shadow-md">
                        <span className="text-[9px] font-bold text-emerald-400 block line-clamp-1 leading-tight">
                          {hs.title}
                        </span>
                        <span className="text-[8px] text-slate-300 block line-clamp-2 leading-tight mt-0.5">
                          {hs.description}
                        </span>
                      </div>
                    </foreignObject>
                  </g>
                );
              })}
          </svg>

          {/* Interactive Manual Camera 3D Sliders & Phase Scrub Bar */}
          <div className="w-full bg-slate-950/90 border border-slate-800 rounded-xl p-3 z-10 space-y-2 mt-2">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-slate-400 text-[11px]">
              {/* Yaw (Góc xoay ngang 360°) */}
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>Xoay ngang (Yaw):</span>
                  <span className="font-mono text-emerald-400 font-bold">{yaw}°</span>
                </div>
                <input
                  type="range"
                  min="-180"
                  max="180"
                  value={yaw}
                  onChange={(e) => {
                    setYaw(Number(e.target.value));
                    setActivePreset("custom");
                  }}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>

              {/* Pitch (Góc nghiêng đứng) */}
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>Góc nhìn từ trên (Pitch):</span>
                  <span className="font-mono text-emerald-400 font-bold">{pitch}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="85"
                  value={pitch}
                  onChange={(e) => {
                    setPitch(Number(e.target.value));
                    setActivePreset("custom");
                  }}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>

              {/* Phase Scrubbing (Tua chậm chu kỳ bước) */}
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>Pha bước chân (0-100%):</span>
                  <span className="font-mono text-emerald-400 font-bold">
                    {Math.round((phase / (Math.PI * 2)) * 100)}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={Math.round((phase / (Math.PI * 2)) * 100)}
                  onChange={(e) => {
                    setIsPlaying(false);
                    setPhase((Number(e.target.value) / 100) * Math.PI * 2);
                  }}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-400"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right: Real-time Biomechanics & Clinical Diagnostics Panel */}
        <div className="lg:col-span-5 space-y-4">
          {/* Real-time 3D Biomechanical Telemetry */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2.5 mb-3">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-emerald-600" />
                <span>Thông Số Động Học Khớp Thời Gian Thực (Kinematics Telemetry)</span>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                LIVE KINEMATICS
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              {/* Knee Flexion */}
              <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <span className="text-[10px] text-slate-500 block">Góc gập gối (Knee Flexion)</span>
                <span className="text-base font-bold font-mono text-slate-900 mt-0.5 block">
                  {Math.round(skeleton.telemetry.kneeFlex)}°
                </span>
                <div className="w-full bg-slate-100 h-1.5 rounded-full mt-1.5 overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full transition-all duration-150"
                    style={{ width: `${Math.min(100, (skeleton.telemetry.kneeFlex / 90) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Ankle Angle */}
              <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <span className="text-[10px] text-slate-500 block">Cổ chân (Dorsi/Plantar)</span>
                <span
                  className={`text-base font-bold font-mono mt-0.5 block ${
                    skeleton.telemetry.ankleAngle < -15 ? "text-rose-600" : "text-slate-900"
                  }`}
                >
                  {skeleton.telemetry.ankleAngle > 0 ? "+" : ""}
                  {Math.round(skeleton.telemetry.ankleAngle)}°
                </span>
                <div className="w-full bg-slate-100 h-1.5 rounded-full mt-1.5 overflow-hidden">
                  <div
                    className="bg-sky-500 h-full rounded-full transition-all duration-150"
                    style={{
                      width: `${Math.max(
                        10,
                        Math.min(100, ((skeleton.telemetry.ankleAngle + 40) / 70) * 100)
                      )}%`
                    }}
                  />
                </div>
              </div>

              {/* Pelvic Tilt (Trendelenburg) */}
              <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <span className="text-[10px] text-slate-500 block">Nghiêng chậu (Pelvic Tilt)</span>
                <span
                  className={`text-base font-bold font-mono mt-0.5 block ${
                    skeleton.telemetry.pelvicTilt > 8 ? "text-amber-600 font-extrabold" : "text-slate-900"
                  }`}
                >
                  {Math.round(skeleton.telemetry.pelvicTilt)}°
                </span>
                <div className="w-full bg-slate-100 h-1.5 rounded-full mt-1.5 overflow-hidden">
                  <div
                    className="bg-amber-500 h-full rounded-full transition-all duration-150"
                    style={{ width: `${Math.min(100, (skeleton.telemetry.pelvicTilt / 20) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Base of Support Width */}
              <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <span className="text-[10px] text-slate-500 block">Độ rộng chân đế (Base Width)</span>
                <span
                  className={`text-base font-bold font-mono mt-0.5 block ${
                    skeleton.telemetry.baseWidth > 25 ? "text-purple-600" : "text-slate-900"
                  }`}
                >
                  {skeleton.telemetry.baseWidth} cm
                </span>
                <div className="w-full bg-slate-100 h-1.5 rounded-full mt-1.5 overflow-hidden">
                  <div
                    className="bg-purple-500 h-full rounded-full transition-all duration-150"
                    style={{ width: `${Math.min(100, (skeleton.telemetry.baseWidth / 40) * 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Clinical Diagnostic Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4 shadow-xs">
            <div className="border-b border-slate-200 pb-3">
              <span className="text-[11px] font-mono text-emerald-700 font-semibold uppercase tracking-wider">
                {currentGait.name}
              </span>
              <h4 className="text-lg font-bold text-slate-900 mt-0.5">
                {currentGait.vietnameseName}
              </h4>
              <div className="flex items-start gap-1.5 text-xs text-slate-600 mt-1.5">
                <span className="text-amber-700 font-semibold shrink-0">📍 Vị trí định vị:</span>
                <span className="font-medium text-slate-800">{currentGait.anatomicalSite}</span>
              </div>
            </div>

            {/* Key Clinical Features */}
            <div className="space-y-1.5">
              <span className="text-xs font-semibold text-slate-800 block">
                Đặc điểm nhận diện then chốt:
              </span>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {currentGait.keyFeatures.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-600 shrink-0 font-bold">•</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Common Causes */}
            <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs shadow-2xs">
              <span className="text-slate-500 font-medium block mb-1.5">
                Căn nguyên thường gặp trong cấp cứu:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {currentGait.commonCauses.map((cause, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-800 border border-slate-200 text-[11px]"
                  >
                    {cause}
                  </span>
                ))}
              </div>
            </div>

            {/* Clinical Bedside Exam Pearl */}
            <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200 text-xs text-emerald-950 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
              <div>
                <span className="font-bold text-slate-900 block mb-0.5">
                  Mẹo thăm khám thực hành của Bác sĩ Chuyên khoa:
                </span>
                <p className="text-slate-700 text-xs leading-relaxed">
                  {currentGait.clinicalExamTip}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
