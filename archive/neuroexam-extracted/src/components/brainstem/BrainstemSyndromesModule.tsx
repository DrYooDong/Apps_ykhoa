import React, { useState } from "react";
import {
  Brain,
  Eye,
  Activity,
  Layers,
  CheckCircle2,
  AlertTriangle,
  Info,
  ArrowRight,
  Split,
  Compass,
  Sparkles,
  BookOpen,
  HelpCircle,
  Minimize2
} from "lucide-react";

type BrainstemLevel = "midbrain" | "pons" | "medulla";
type SubTab = "matrix" | "one-and-half" | "medullary-triad" | "skull-base";

interface SyndromeData {
  id: string;
  nameVi: string;
  nameEn: string;
  level: BrainstemLevel;
  levelNameVi: string;
  siteOfLesion: string;
  artery: string;
  ipsilateralSigns: string[];
  contralateralSigns: string[];
  keyMechanism: string;
  shibasakiCitation: string;
}

const SYNDROMES_DATA: SyndromeData[] = [
  // MIDBRAIN (TRUNG NÃO)
  {
    id: "weber",
    nameVi: "Hội Chứng Weber (Liệt Bắt Chéo Vận Nhãn - Bó Tháp)",
    nameEn: "Weber Syndrome (Superior Alternating Hemiplegia)",
    level: "midbrain",
    levelNameVi: "Trung Não (Cuống Đại Não)",
    siteOfLesion: "Phần bụng trong của Cuống đại não (Cerebral peduncle / crus cerebri), liên lụy rễ thoát ra của dây thần kinh vận nhãn III và bó vỏ - gai / vỏ - nhân.",
    artery: "Nhánh xuyên cuống não của Động mạch Não sau (PCA) hoặc Động mạch Đáy.",
    ipsilateralSigns: [
      "Liệt hoàn toàn dây thần kinh vận nhãn III:",
      "• Sụp mi hoàn toàn (Ptosis do liệt cơ nâng mi trên).",
      "• Mắt bị kéo lệch ra ngoài và hơi xuống dưới (do cơ thẳng ngoài VI và cơ chéo trên IV còn nguyên vẹn).",
      "• Giãn đồng tử (Mydriasis), mất phản xạ ánh sáng (trực tiếp và đồng cảm), mất phản xạ điều tiết."
    ],
    contralateralSigns: [
      "Liệt nửa người đối bên (Contralateral Hemiplegia / Hemiparesis):",
      "• Yếu liệt vận động nửa người kiểu co cứng (Spastic) do tổn thương bó tháp vỏ - gai.",
      "• Liệt mặt trung ương đối bên (liệt cơ vòng môi, mờ nếp mũi má, chừa cơ trán).",
      "• Lưỡi lệch sang bên liệt nửa người khi thè ra (do liệt cơ cằm - lưỡi đối bên - Box 22)."
    ],
    keyMechanism:
      "Weber mô tả đầu tiên năm 1863 ở bệnh nhân nhồi máu cuống đại não trái 15x6.3 mm. Dây III và bó tháp cùng nằm ở mặt bụng trung não, dây III đi ra chưa bắt chéo trong khi bó tháp sẽ bắt chéo ở hành não, tạo ra bệnh cảnh bắt chéo kinh điển.",
    shibasakiCitation: "Bảng 8-1, Hình 9-2, Box 10 (Weber Syndrome)"
  },
  {
    id: "claude",
    nameVi: "Hội Chứng Claude (Liệt Bắt Chéo Vận Nhãn - Thất Điều Nhân Đỏ)",
    nameEn: "Claude Syndrome (Inferior Nucleus Ruber Syndrome)",
    level: "midbrain",
    levelNameVi: "Trung Não (Trần Trung Não Trong)",
    siteOfLesion: "Trần trung não phía trong (Midbrain medial tegmentum), tổn thương dây III và phần dưới Nhân đỏ (Red nucleus) kèm cuống tiểu não trên (Superior cerebellar peduncle - Brachium conjunctivum).",
    artery: "Động mạch xuyên đồi thị - trung não (Thalamoperforating artery) tách từ ĐM não sau (PCA).",
    ipsilateralSigns: [
      "Liệt dây thần kinh vận nhãn III cùng bên:",
      "• Sụp mi mắt, mắt lác ngoài, đồng tử giãn to mất phản xạ ánh sáng."
    ],
    contralateralSigns: [
      "Thất điều tiểu não đối bên (Contralateral Cerebellar Ataxia):",
      "• Quá tầm (Dysmetria), rối tầm (Hypermetria) khi làm nghiệm pháp ngón tay chỉ mũi.",
      "• Mất liên động (Dysdiadochokinesis), run ý đồ / run động tác (Action / Intention tremor).",
      "• Giảm trương lực cơ đối bên (Hypotonia)."
    ],
    keyMechanism:
      "Cuống tiểu não trên bắt nguồn từ nhân răng (Dentate nucleus) của tiểu não đối diện và bắt chéo ở phần thấp trung não trước khi đến nhân đỏ. Do đó, tổn thương sau bắt chéo ở trung não gây thất điều ở chi đối bên tổn thương não.",
    shibasakiCitation: "Bảng 8-1, Hình 9-2, Box 23 (Claude Syndrome)"
  },
  {
    id: "benedikt",
    nameVi: "Hội Chứng Benedikt (Liệt Dây III + Run Múa Vờn + Liệt Nửa Người)",
    nameEn: "Benedikt Syndrome (Midbrain Tegmental Syndrome)",
    level: "midbrain",
    levelNameVi: "Trung Não (Nền - Trần Trung Não)",
    siteOfLesion: "Vùng chuyển tiếp giữa trần và nền trung não: Liềm đen (Substantia nigra), Nhân đỏ (Red nucleus), rễ dây III và một phần bó tháp.",
    artery: "Nhánh xuyên sâu của Động mạch Não sau (Interpeduncular branches of PCA).",
    ipsilateralSigns: [
      "Liệt dây III cùng bên (sụp mi, giãn đồng tử, lác ngoài)."
    ],
    contralateralSigns: [
      "• Liệt nửa người hoặc dấu bó tháp (Babinski dương tính).",
      "• Cử động bất thường không tự ý: Run biên độ lớn (Holmes / Rubral tremor), múa giật - múa vờn (Choreoathetosis) do tổn thương liềm đen và nhân đỏ."
    ],
    keyMechanism:
      "Tổn thương rộng hơn hội chứng Claude và Weber, bao phủ cả hệ Dopaminergic liềm đen và nhân đỏ dẫn đến sự phối hợp giữa liệt vận động và rối loạn vận động tăng động (Hyperkinetic involuntary movements).",
    shibasakiCitation: "Bảng 8-1, Hình 9-2, Chương 9-1A, Box 49"
  },
  {
    id: "parinaud",
    nameVi: "Hội Chứng Parinaud (Hội Chứng Gian Não - Mái Trung Não)",
    nameEn: "Parinaud Syndrome (Dorsal Midbrain Syndrome)",
    level: "midbrain",
    levelNameVi: "Mái Trung Não (Tectum / Pretectum)",
    siteOfLesion: "Vùng trước mái (Pretectal area), củ não sinh tư trên (Superior colliculus), nhân kẽ MLF (riMLF / Interstitial nucleus of Cajal).",
    artery: "Nhánh mạch mạc sau của ĐM não sau hoặc chèn ép do u tuyến tùng (Pinealoma).",
    ipsilateralSigns: [
      "Tổn thương thường mang tính hai bên (Uncrossed bilateral):",
      "• Liệt nhìn lên trên (Supranuclear vertical upward gaze palsy).",
      "• Phân ly ánh sáng - quy tụ (Light-near dissociation): Đồng tử không co khi chiếu sáng nhưng co tốt khi nhìn gần quy tụ.",
      "• Rung giật nhãn cầu co rút (Convergence-retraction nystagmus).",
      "• Dấu hiệu Collier: Co rút mi trên bệnh lý (Trombone sign)."
    ],
    contralateralSigns: [
      "Thường không có liệt nửa người đơn thuần trừ khi khối u xâm lấn lan tỏa xuống cuống não."
    ],
    keyMechanism:
      "Trung tâm nhìn dọc nằm ở trung não (riMLF). Chèn ép từ trên xuống của tuyến tùng tác động trước tiên lên các sợi chỉ huy nhìn lên (nằm nông hơn), bảo tồn phản xạ mắt búp bê (Doll's eye sign) do mang bản chất liệt trên nhân (Supranuclear palsy).",
    shibasakiCitation: "Bảng 8-1, Chương 9-2C (Parinaud 1886)"
  },

  // PONS (CẦU NÃO)
  {
    id: "millard-gubler",
    nameVi: "Hội Chứng Millard-Gubler (Liệt Mặt Ngoại Biên - Bó Tháp Bắt Chéo)",
    nameEn: "Millard-Gubler Syndrome (Ventral Pontine Syndrome)",
    level: "pons",
    levelNameVi: "Cầu Não Dưới (Nền Cầu Não)",
    siteOfLesion: "Mặt bụng ngoài phần thấp cầu não (Caudal pons lateral basis), liên lụy sợi thần kinh mặt VII và bó vỏ - gai.",
    artery: "Nhánh vòng ngắn và nhánh xuyên của Động mạch Thân nền (Basilar artery).",
    ipsilateralSigns: [
      "Liệt dây thần kinh mặt số VII ngoại biên (Peripheral facial palsy):",
      "• Mất nếp nhăn trán, mắt nhắm không kín (Lagophthalmos), dấu Charles Bell (+).",
      "• Nếp mũi má mờ, miệng méo xệch sang bên lành, ăn uống đọng thức ăn má."
    ],
    contralateralSigns: [
      "Liệt nửa người thể co cứng đối bên (Contralateral spastic hemiplegia):",
      "• Tổn thương bó tháp trước khi bắt chéo tại hành não $\\rightarrow$ Liệt tay chân đối bên nhưng KHÔNG liệt nửa mặt đối bên."
    ],
    keyMechanism:
      "Sợi dây VII vòng qua nhân dây VI (Gối dây VII) rồi đi ra ở bờ dưới ngoài cầu não, nằm cạnh bó tháp. Tổn thương tại đây gây liệt mặt ngoại biên cùng bên và liệt nửa người đối bên (Crossed facial hemiplegia).",
    shibasakiCitation: "Bảng 8-1, Chương 11-2A, Box 18, Millard 1856"
  },
  {
    id: "foville",
    nameVi: "Hội Chứng Foville (Liệt Mặt VII + Liệt Nhìn Ngang PPRF + Liệt Nửa Người)",
    nameEn: "Foville Syndrome (Inferior Medial Pontine Syndrome)",
    level: "pons",
    levelNameVi: "Cầu Não Dưới (Nền & Trần Cầu Não)",
    siteOfLesion: "Nền và trần cầu não dưới cạnh đường giữa: Tổn thương nhân dây VI hoặc trung tâm nhìn ngang PPRF, rễ dây VII, và bó tháp.",
    artery: "Nhánh chu vi của ĐM đáy hoặc tắc ĐM tiểu não trước dưới (AICA).",
    ipsilateralSigns: [
      "• Liệt mặt ngoại biên số VII cùng bên.",
      "• Liệt liếc ngang cùng bên tổn thương (Conjugate lateral gaze palsy to lesion side): Hai mắt không thể liếc về phía bên tổn thương do liên lụy PPRF / nhân dây VI."
    ],
    contralateralSigns: [
      "• Liệt nửa người đối bên (Contralateral hemiplegia).",
      "• Hai mắt có xu hướng lệch liên hợp sang bên đối diện (nhìn về phía chi bị liệt)."
    ],
    keyMechanism:
      "Foville (1858) đã mô tả trường hợp nhồi máu cầu não phối hợp liệt mặt và liệt liếc. Kích thích PPRF bên nào sẽ làm hai mắt cùng nhìn sang bên đó; tổn thương PPRF làm mất cử động nhìn sang bên tổn thương.",
    shibasakiCitation: "Bảng 8-1, Chương 9-2B, Foville 1858"
  },
  {
    id: "raymond-cestan",
    nameVi: "Hội Chứng Raymond-Cestan (Liệt Vận Nhãn Liên Nhân + Thất Điều Bắt Chéo)",
    nameEn: "Raymond-Cestan Syndrome (Upper Dorsal Pontine Syndrome)",
    level: "pons",
    levelNameVi: "Cầu Não Trên (Trần Cầu Não)",
    siteOfLesion: "Trần cầu não cao (Rostral pons tegmentum), tổn thương Bó dọc giữa (MLF), Liềm trong (Medial lemniscus), cuống tiểu não trên và bó tháp một phần.",
    artery: "Nhánh chu vi dài của ĐM thân nền hoặc ĐM tiểu não trên (SCA).",
    ipsilateralSigns: [
      "Liệt vận nhãn liên nhân (INO):",
      "• Mắt cùng bên không thể khép vào trong khi liếc sang bên đối diện do đứt kết nối MLF."
    ],
    contralateralSigns: [
      "• Mất cảm giác sâu (cảm giác rung âm thoa và tư thế khớp) và xúc giác tinh tế do đứt liềm trong.",
      "• Thất điều vận động đối bên.",
      "• Liệt nhẹ nửa người đối bên."
    ],
    keyMechanism:
      "Vị trí cao ở cầu não nơi các bó cảm giác sâu (Liềm trong) và bó phối hợp vận nhãn (MLF) nằm sát nhau ở trần cầu não, tạo nên tam chứng: INO + Mất cảm giác sâu + Thất điều.",
    shibasakiCitation: "Bảng 8-1, Chương 9-3 (Raymond & Cestan)"
  },

  // MEDULLA OBLONGATA (HÀNH NÃO)
  {
    id: "wallenberg",
    nameVi: "Hội Chứng Wallenberg (Hội Chứng Hành Não Ngoài - PICA)",
    nameEn: "Wallenberg Syndrome (Lateral Medullary Syndrome)",
    level: "medulla",
    levelNameVi: "Hành Não (Trần Hành Não Ngoài)",
    siteOfLesion: "Trần hành não ngoài (Lateral medullary tegmentum): Nhân hoài nghi (Nucleus ambiguus IX-X), Nhân và dải tủy dây V, Dải gai - đồi thị (Spinothalamic tract), Nhân tiền đình, Cuống tiểu não dưới, Dải giao cảm đi xuống.",
    artery: "Tắc Động mạch Tiểu não Sau dưới (PICA) hoặc Động mạch Đốt sống (Vertebral artery).",
    ipsilateralSigns: [
      "Tổn thương cùng bên tổn thương não:",
      "• Hội chứng Horner (co đồng tử, sụp mi nhẹ, giảm tiết mồ hôi nửa mặt).",
      "• Mất cảm giác đau/nhiệt ở nửa mặt cùng bên (tổn thương nhân dải tủy dây V).",
      "• Liệt vòm họng, dây thanh âm: Nuốt sặc, giọng khàn, dấu vén màn vòm họng (Curtain sign).",
      "• Chóng mặt dữ dội, rung giật nhãn cầu xoay, buồn nôn (nhân tiền đình).",
      "• Thất điều tiểu não chi cùng bên (cuống tiểu não dưới).",
      "• Nghiêng thân mình về bên tổn thương (Body lateropulsion)."
    ],
    contralateralSigns: [
      "Mất cảm giác phân ly đau và nhiệt ở thân mình và tứ chi bên đối diện:",
      "• Do tổn thương bó gai - đồi thị (đã bắt chéo ở tủy sống).",
      "• ĐẶC BIỆT: KHÔNG LIỆT NỬA NGƯỜI (Bó tháp nằm ở mặt trước hành não được bảo tồn hoàn toàn!)."
    ],
    keyMechanism:
      "Minh chứng điển hình cho mật độ giải phẫu dày đặc của thân não (Box 21). Mất cảm giác đau nhiệt kiểu bắt chéo: Mặt cùng bên + Thân đối bên (Crossed analgesia).",
    shibasakiCitation: "Bảng 8-1, Hình 14-1, 14-2, 14-3, Box 21 (Wallenberg 1895)"
  },
  {
    id: "babinski-nageotte",
    nameVi: "Hội Chứng Babinski-Nageotte (Wallenberg + Liệt Bó Tháp Đối Bên)",
    nameEn: "Babinski-Nageotte Syndrome",
    level: "medulla",
    levelNameVi: "Hành Não (Hành Não Ngoài & Trước)",
    siteOfLesion: "Toàn bộ nửa hành não một bên ngoại trừ liềm trong và nhân dây XII: Bao gồm vùng hành não ngoài (như Wallenberg) LAN RỘNG ra trước xâm lấn vào bó tháp.",
    artery: "Tắc nhánh sâu của Động mạch Đốt sống (Vertebral Artery).",
    ipsilateralSigns: [
      "Đầy đủ các triệu chứng của Hội chứng Wallenberg:",
      "• Horner cùng bên, mất cảm giác đau nhiệt nửa mặt cùng bên.",
      "• Nuốt sặc, khàn tiếng, thất điều tiểu não cùng bên."
    ],
    contralateralSigns: [
      "• Mất cảm giác đau nhiệt thân mình và tứ chi đối bên.",
      "• CỘNG THÊM: LIỆT NỬA NGƯỜI ĐỐI BÊN (Hemiplegia) do tổn thương lan vào bó tháp."
    ],
    keyMechanism:
      "Babinski & Nageotte (1902) mô tả tổn thương hoại tử rộng ở nửa hành não. Phân biệt với Wallenberg thuần túy nhờ sự xuất hiện của dấu liệt nửa người bó tháp đối bên (Hình 14-3).",
    shibasakiCitation: "Bảng 8-1, Hình 14-3, Box 21 (Babinski & Nageotte 1902)"
  },
  {
    id: "cestan-chenais",
    nameVi: "Hội Chứng Cestan-Chenais (Wallenberg Khuyết Thất Điều + Liệt Nửa Người)",
    nameEn: "Cestan-Chenais Syndrome",
    level: "medulla",
    levelNameVi: "Hành Não (Vùng Bụng - Ngoài Hành Não)",
    siteOfLesion: "Tổn thương trần hành não ngoài và bó tháp, nhưng CHỪA cuống tiểu não dưới và nhân tiền đình.",
    artery: "Nhồi máu nhánh động mạch đốt sống.",
    ipsilateralSigns: [
      "• Horner cùng bên.",
      "• Mất cảm giác đau nhiệt mặt cùng bên.",
      "• Liệt màn hầu và dây thanh âm (nuốt khó, khàn tiếng).",
      "• KHÔNG CÓ chóng mặt dữ dội và KHÔNG CÓ thất điều tiểu não."
    ],
    contralateralSigns: [
      "• Mất cảm giác đau nhiệt thân mình đối bên.",
      "• Liệt nửa người đối bên (Hemiplegia)."
    ],
    keyMechanism:
      "Nằm ở vị trí trung gian giữa Wallenberg và Babinski-Nageotte. Bệnh nhân có liệt nửa người kèm mất cảm giác bắt chéo nhưng không biểu hiện thất điều tiểu não (Hình 14-3).",
    shibasakiCitation: "Bảng 8-1, Hình 14-3, Box 21 (Cestan & Chenais)"
  }
];

export const BrainstemSyndromesModule: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<SubTab>("matrix");
  const [selectedLevel, setSelectedLevel] = useState<BrainstemLevel>("midbrain");
  const [selectedSyndromeId, setSelectedSyndromeId] = useState<string>("weber");

  // One-and-a-half Interactive Eye Simulation State
  // Eye gaze direction: "center" | "look-left" | "look-right" | "converge"
  const [gazeMode, setGazeMode] = useState<"center" | "look-left" | "look-right" | "converge">("center");
  // Lesion side: "right" (typical textbook case: right PPRF + right MLF)
  const [lesionSide] = useState<"right">("right");

  const currentSyndrome =
    SYNDROMES_DATA.find((s) => s.id === selectedSyndromeId) || SYNDROMES_DATA[0];

  const filteredSyndromes = SYNDROMES_DATA.filter((s) => s.level === selectedLevel);

  return (
    <div className="space-y-6">
      {/* Top Banner with Shibasaki Oxford 2016 reference */}
      <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 border border-sky-800/60 rounded-2xl p-4 md:p-6 text-white shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-sky-500/20 border border-sky-400/30 text-sky-300 text-xs font-mono font-semibold">
              <Brain className="w-3.5 h-3.5" />
              <span>SHIBASAKI & HALLETT (OXFORD 2016) • CHƯƠNG 8, 9 & 14</span>
            </div>
            <h2 className="text-lg md:text-xl font-extrabold tracking-tight text-white flex items-center gap-2">
              <Split className="w-5 h-5 text-sky-400" />
              Định Khu Hội Chứng Thân Não Bắt Chéo & Hội Chứng Một Rưỡi
            </h2>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Bảng đối chiếu tương tác 3 tầng: <strong>Trung Não (Midbrain) - Cầu Não (Pons) - Hành Não (Medulla)</strong>, mô phỏng sinh lý học bệnh <em>Hội chứng Một Rưỡi (Figure 9-5)</em> và tam chứng nhồi máu hành não.
            </p>
          </div>

          <div className="px-3 py-1.5 rounded-xl bg-sky-900/60 border border-sky-700/60 text-sky-200 text-xs font-mono font-bold">
            CROSSED BRAINSTEM SUITE
          </div>
        </div>
      </div>

      {/* Sub-Tabs Navigation */}
      <div className="bg-white border border-slate-200 p-1.5 rounded-xl flex items-center gap-1.5 overflow-x-auto shadow-2xs">
        <button
          onClick={() => setActiveSubTab("matrix")}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap shrink-0 ${
            activeSubTab === "matrix"
              ? "bg-sky-600 text-white shadow-xs"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Bảng Đối Chiếu 3 Tầng Thân Não (Table 8-1)</span>
        </button>

        <button
          onClick={() => setActiveSubTab("one-and-half")}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap shrink-0 ${
            activeSubTab === "one-and-half"
              ? "bg-sky-600 text-white shadow-xs"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          <Eye className="w-4 h-4" />
          <span>Mô Phỏng Hội Chứng Một Rưỡi (Figure 9-5)</span>
        </button>

        <button
          onClick={() => setActiveSubTab("medullary-triad")}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap shrink-0 ${
            activeSubTab === "medullary-triad"
              ? "bg-sky-600 text-white shadow-xs"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          <Split className="w-4 h-4" />
          <span>Tam Chứng Hành Não (Wallenberg / Babinski / Cestan)</span>
        </button>

        <button
          onClick={() => setActiveSubTab("skull-base")}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap shrink-0 ${
            activeSubTab === "skull-base"
              ? "bg-sky-600 text-white shadow-xs"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Hội Chứng Đa Dây Lỗ Nền Sọ (Table 14-1)</span>
        </button>
      </div>

      {/* ===================== SUB-TAB 1: 3-TIER MATRIX ===================== */}
      {activeSubTab === "matrix" && (
        <div className="space-y-4">
          {/* Level Switcher (Midbrain, Pons, Medulla) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={() => {
                setSelectedLevel("midbrain");
                setSelectedSyndromeId("weber");
              }}
              className={`p-3.5 rounded-2xl border text-left transition-all ${
                selectedLevel === "midbrain"
                  ? "bg-indigo-50 border-indigo-500 shadow-xs text-indigo-950"
                  : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-xs">TẦNG 1: TRUNG NÃO</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-800 font-bold">
                  Mesencephalon
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Dây III & IV, Liềm đen, Nhân đỏ, Cuống não, Nhân riMLF.
              </p>
            </button>

            <button
              onClick={() => {
                setSelectedLevel("pons");
                setSelectedSyndromeId("millard-gubler");
              }}
              className={`p-3.5 rounded-2xl border text-left transition-all ${
                selectedLevel === "pons"
                  ? "bg-sky-50 border-sky-500 shadow-xs text-sky-950"
                  : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-xs">TẦNG 2: CẦU NÃO</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-sky-100 text-sky-800 font-bold">
                  Pons
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Dây V, VI, VII, PPRF (Nhìn ngang), Bó dọc giữa (MLF).
              </p>
            </button>

            <button
              onClick={() => {
                setSelectedLevel("medulla");
                setSelectedSyndromeId("wallenberg");
              }}
              className={`p-3.5 rounded-2xl border text-left transition-all ${
                selectedLevel === "medulla"
                  ? "bg-rose-50 border-rose-500 shadow-xs text-rose-950"
                  : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-xs">TẦNG 3: HÀNH NÃO</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-rose-100 text-rose-800 font-bold">
                  Medulla Oblongata
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Dây IX, X, XII, Nhân hoài nghi, Trâm dưới, Bắt chéo tháp.
              </p>
            </button>
          </div>

          {/* 2-Column: Left List of Syndromes & Right Detailed Comparator */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Syndrome Buttons */}
            <div className="lg:col-span-4 space-y-2">
              <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-xs space-y-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block px-1">
                  Các Hội Chứng Đặc Trưng:
                </span>
                <div className="space-y-1.5">
                  {filteredSyndromes.map((syn) => {
                    const isSelected = syn.id === currentSyndrome.id;
                    return (
                      <button
                        key={syn.id}
                        onClick={() => setSelectedSyndromeId(syn.id)}
                        className={`w-full text-left p-3 rounded-xl border transition-all ${
                          isSelected
                            ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                            : "bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold">{syn.nameVi.split(" (")[0]}</span>
                          <ArrowRight className={`w-3.5 h-3.5 ${isSelected ? "text-amber-400" : "text-slate-400"}`} />
                        </div>
                        <span className={`text-[10px] line-clamp-1 mt-0.5 font-mono ${isSelected ? "text-slate-300" : "text-slate-500"}`}>
                          {syn.nameEn}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Anatomy Reminder Box */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-slate-300 text-xs space-y-2">
                <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                  <Sparkles className="w-4 h-4" />
                  <span>Quy Tắc Bắt Chéo Thần Kinh Sọ (Shibasaki):</span>
                </div>
                <p className="text-[11px] leading-relaxed text-slate-300">
                  Các sợi vận động thần kinh sọ xuất phát từ nhân vận động ở trần thân não và <strong>KHÔNG bắt chéo</strong> bên ngoài thân não (trừ dây IV bắt chéo ở rèm tủy trước). Trong khi đó, các sợi bó tháp đi xuống sẽ bắt chéo tại hành não. Do vậy, một tổn thương khu trú một bên thân não luôn gây <strong>Liệt thần kinh sọ cùng bên + Liệt vận động/cảm giác thân thể đối bên</strong>!
                </p>
              </div>
            </div>

            {/* Right: Detailed Syndrome Breakdown */}
            <div className="lg:col-span-8 space-y-4">
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-5">
                {/* Header */}
                <div className="border-b border-slate-200 pb-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-sky-100 text-sky-800 border border-sky-200">
                      {currentSyndrome.levelNameVi}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">
                      {currentSyndrome.shibasakiCitation}
                    </span>
                  </div>
                  <h3 className="text-base md:text-lg font-black text-slate-900">
                    {currentSyndrome.nameVi}
                  </h3>
                  <p className="text-xs text-slate-500 font-mono">
                    {currentSyndrome.nameEn}
                  </p>
                </div>

                {/* Lesion Location & Vascular Supply */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <strong className="text-slate-800 flex items-center gap-1.5">
                      <Brain className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Vị Trí Giải Phẫu Tổn Thương:</span>
                    </strong>
                    <p className="text-slate-600 leading-relaxed text-[11px]">
                      {currentSyndrome.siteOfLesion}
                    </p>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <strong className="text-slate-800 flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 text-rose-600" />
                      <span>Động Mạch Liên Quan (Vascular Territory):</span>
                    </strong>
                    <p className="text-slate-600 leading-relaxed text-[11px]">
                      {currentSyndrome.artery}
                    </p>
                  </div>
                </div>

                {/* Split Comparison: Ipsilateral vs Contralateral Signs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Ipsilateral (Cùng bên) */}
                  <div className="p-4 rounded-xl border border-amber-300/80 bg-amber-50/50 space-y-2">
                    <div className="flex items-center justify-between border-b border-amber-200 pb-2">
                      <span className="text-xs font-bold text-amber-950 uppercase tracking-wide">
                        Triệu Chứng Cùng Bên (Ipsilateral)
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-200 text-amber-900 font-bold">
                        DÂY THẦN KINH SỌ
                      </span>
                    </div>
                    <ul className="space-y-1 text-xs text-amber-950 leading-relaxed">
                      {currentSyndrome.ipsilateralSigns.map((sign, idx) => (
                        <li key={idx}>{sign}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Contralateral (Đối bên) */}
                  <div className="p-4 rounded-xl border border-indigo-300/80 bg-indigo-50/50 space-y-2">
                    <div className="flex items-center justify-between border-b border-indigo-200 pb-2">
                      <span className="text-xs font-bold text-indigo-950 uppercase tracking-wide">
                        Triệu Chứng Đối Bên (Contralateral)
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-indigo-200 text-indigo-900 font-bold">
                        BÓ DÀI (LONG TRACTS)
                      </span>
                    </div>
                    <ul className="space-y-1 text-xs text-indigo-950 leading-relaxed">
                      {currentSyndrome.contralateralSigns.map((sign, idx) => (
                        <li key={idx}>{sign}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Key Physiological Mechanism */}
                <div className="space-y-1 bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs">
                  <span className="font-bold text-slate-800 flex items-center gap-1.5">
                    <Info className="w-4 h-4 text-sky-600" />
                    <span>Cơ Chế Sinh Lý Bệnh & Bối Cảnh Lịch Sử (Shibasaki 2016):</span>
                  </span>
                  <p className="text-slate-600 leading-relaxed text-[11px]">
                    {currentSyndrome.keyMechanism}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================== SUB-TAB 2: ONE-AND-A-HALF SYNDROME SIMULATOR ===================== */}
      {activeSubTab === "one-and-half" && (
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-6">
          {/* Header & Concept */}
          <div className="border-b border-slate-200 pb-4 space-y-1">
            <div className="flex items-center justify-between">
              <h3 className="text-sm md:text-base font-black text-slate-900 flex items-center gap-2">
                <Eye className="w-4 h-4 text-sky-600" />
                <span>Mô Phỏng Hội Chứng Một Rưỡi (One-and-a-Half Syndrome - Figure 9-5)</span>
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-100 text-sky-800 font-bold">
                PONTINE TEGMENTUM
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Xảy ra khi có một <strong>tổn thương đơn độc ở trần cầu não một bên</strong> phá hủy đồng thời: 
              (1) <strong>Trung tâm nhìn ngang PPRF</strong> (hoặc nhân dây VI) cùng bên VÀ 
              (2) <strong>Bó dọc giữa (MLF)</strong> cùng bên.
            </p>
          </div>

          {/* Interactive Gaze Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 block">
              Thực hiện nghiệm pháp bảo bệnh nhân liếc mắt (Chọn hướng khám):
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <button
                onClick={() => setGazeMode("center")}
                className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-center ${
                  gazeMode === "center"
                    ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                    : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                }`}
              >
                1. Nhìn Thẳng (Primary Position)
              </button>

              <button
                onClick={() => setGazeMode("look-right")}
                className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-center ${
                  gazeMode === "look-right"
                    ? "bg-rose-600 text-white border-rose-600 shadow-xs"
                    : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                }`}
              >
                2. Liếc Sang Phải (Về phía tổn thương)
              </button>

              <button
                onClick={() => setGazeMode("look-left")}
                className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-center ${
                  gazeMode === "look-left"
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-xs"
                    : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                }`}
              >
                3. Liếc Sang Trái (Về phía lành)
              </button>

              <button
                onClick={() => setGazeMode("converge")}
                className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-center ${
                  gazeMode === "converge"
                    ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                    : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                }`}
              >
                4. Nghiệm Pháp Quy Tụ (Convergence)
              </button>
            </div>
          </div>

          {/* Visual Eye Pair Simulation (SVG Clean Medical Graphic) */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white flex flex-col items-center justify-center space-y-6">
            <div className="flex items-center justify-between w-full max-w-md border-b border-slate-800 pb-2 text-xs text-slate-400 font-mono">
              <span>MẮT PHẢI BỆNH NHÂN (RIGHT - Bên Tổn Thương)</span>
              <span>MẮT TRÁI BỆNH NHÂN (LEFT - Bên Lành)</span>
            </div>

            {/* Visual SVG of both eyes */}
            <div className="w-full max-w-md flex items-center justify-around gap-8">
              {/* RIGHT EYE (Bên tổn thương phải: PPRF phải + MLF phải hỏng) */}
              <div className="flex flex-col items-center space-y-2">
                <span className="text-[11px] font-bold text-rose-400 font-mono">MẮT PHẢI (R)</span>
                <div className="relative w-36 h-24 bg-slate-800 rounded-full border-2 border-slate-700 flex items-center justify-center overflow-hidden shadow-inner">
                  {/* Sclera & Iris */}
                  <div
                    className="w-16 h-16 rounded-full bg-sky-900 border-2 border-sky-400 flex items-center justify-center transition-all duration-300"
                    style={{
                      transform:
                        gazeMode === "center"
                          ? "translateX(0px)"
                          : gazeMode === "look-right"
                          ? "translateX(0px)" // Liệt nhìn phải hoàn toàn! Không liếc ra ngoài được
                          : gazeMode === "look-left"
                          ? "translateX(0px)" // Liệt MLF phải! Không khép vào trong được!
                          : gazeMode === "converge"
                          ? "translateX(-16px)" // Quy tụ: Cơ thẳng trong do dây III nguyên vẹn co được!
                          : "none"
                    }}
                  >
                    {/* Pupil */}
                    <div className="w-8 h-8 rounded-full bg-black border border-sky-300" />
                  </div>

                  {/* Red Cross Overlay when Movement Fails */}
                  {(gazeMode === "look-right" || gazeMode === "look-left") && (
                    <div className="absolute inset-0 bg-rose-950/40 border-2 border-rose-500 rounded-full flex items-center justify-center">
                      <span className="text-[10px] font-black text-rose-300 bg-rose-950/80 px-1.5 py-0.5 rounded">
                        BẤT ĐỘNG (FROZEN)
                      </span>
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-center text-slate-400">
                  {gazeMode === "center" && "Ở đường giữa"}
                  {gazeMode === "look-right" && "KHÔNG liếc ngoài được (Liệt PPRF)"}
                  {gazeMode === "look-left" && "KHÔNG khép trong được (Liệt MLF/INO)"}
                  {gazeMode === "converge" && "Khép trong TỐT (Quy tụ bảo tồn)"}
                </span>
              </div>

              {/* LEFT EYE (Bên lành) */}
              <div className="flex flex-col items-center space-y-2">
                <span className="text-[11px] font-bold text-sky-400 font-mono">MẮT TRÁI (L)</span>
                <div className="relative w-36 h-24 bg-slate-800 rounded-full border-2 border-slate-700 flex items-center justify-center overflow-hidden shadow-inner">
                  {/* Sclera & Iris */}
                  <div
                    className="w-16 h-16 rounded-full bg-sky-900 border-2 border-sky-400 flex items-center justify-center transition-all duration-300"
                    style={{
                      transform:
                        gazeMode === "center"
                          ? "translateX(0px)"
                          : gazeMode === "look-right"
                          ? "translateX(0px)" // Khi liếc phải, mắt trái lẽ ra phải khép trong, nhưng PPRF phải hỏng nên không có xung
                          : gazeMode === "look-left"
                          ? "translateX(-24px)" // Liếc ngoài sang trái bình thường! (Cơ thẳng ngoài VI trái tốt)
                          : gazeMode === "converge"
                          ? "translateX(16px)" // Quy tụ: Cơ thẳng trong trái co tốt
                          : "none"
                    }}
                  >
                    {/* Pupil */}
                    <div className="w-8 h-8 rounded-full bg-black border border-sky-300" />
                  </div>

                  {/* Dissociated Nystagmus indicator on left gaze */}
                  {gazeMode === "look-left" && (
                    <div className="absolute top-1 right-2 text-[9px] font-mono text-amber-300 bg-amber-950/90 px-1 rounded border border-amber-600">
                      Rung giật nhãn cầu phân ly
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-center text-slate-400">
                  {gazeMode === "center" && "Ở đường giữa"}
                  {gazeMode === "look-right" && "Không nhận xung liếc phải từ PPRF"}
                  {gazeMode === "look-left" && "Liếc ngoài ĐƯỢC + Rung giật nhãn cầu"}
                  {gazeMode === "converge" && "Khép trong TỐT (Quy tụ bảo tồn)"}
                </span>
              </div>
            </div>

            {/* Live Clinical Summary Banner */}
            <div className="w-full max-w-lg bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs text-center space-y-1">
              <span className="font-bold text-amber-400 font-mono">
                {gazeMode === "center" && "Trạng Thái Ban Đầu: Hai mắt nằm cân đối ở chính giữa."}
                {gazeMode === "look-right" && "Liếc Phải: MẤT HOÀN TOÀN cả 2 mắt (Liệt nhìn ngang sang phải do PPRF phải hỏng) = Liệt '1' bên."}
                {gazeMode === "look-left" && "Liếc Trái: Mắt phải không khép được (INO do MLF hỏng), mắt trái liếc ngoài được = Liệt 'nửa' (0.5) bên còn lại."}
                {gazeMode === "converge" && "Quy Tụ: Hai mắt khép vào trong hoàn hảo! Chứng minh cơ thẳng trong và nhân dây III hoàn toàn bình thường."}
              </span>
              <p className="text-[11px] text-slate-400">
                Tổng cộng: Liệt 1 bên nhìn phải + Liệt nửa bên nhìn trái = <strong>HỘI CHỨNG MỘT RƯỠI (1.5 SYNDROME)</strong>.
              </p>
            </div>
          </div>

          {/* 3 Diagnostic Criteria for INO & One-and-a-half (Shibasaki Page 63) */}
          <div className="p-4 rounded-xl bg-sky-50 border border-sky-200 text-xs space-y-2">
            <span className="font-bold text-sky-950 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-sky-600" />
              <span>3 Tiêu Chuẩn Chẩn Đoán Xác Định Liệt Vận Nhãn Liên Nhân (INO) theo Shibasaki:</span>
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sky-900 text-[11px]">
              <div className="p-2.5 bg-white rounded-lg border border-sky-200">
                <strong>1. Giảm khép (Impairment of adduction):</strong>
                <br />Mắt cùng bên tổn thương MLF không khép vào trong được khi nhìn sang đối bên.
              </div>
              <div className="p-2.5 bg-white rounded-lg border border-sky-200">
                <strong>2. Rung giật nhãn cầu phân ly:</strong>
                <br />Mắt đối bên liếc ngoài xuất hiện nystagmus ngang đơn độc ở mắt dạng (*Dissociated nystagmus*).
              </div>
              <div className="p-2.5 bg-white rounded-lg border border-sky-200">
                <strong>3. Bảo tồn phản xạ quy tụ:</strong>
                <br />Chứng minh cơ thẳng trong và nhân dây III không liệt; nguyên nhân hoàn toàn do đứt bó liên kết MLF trong thân não.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================== SUB-TAB 3: MEDULLARY TRIAD COMPARISON ===================== */}
      {activeSubTab === "medullary-triad" && (
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-6">
          <div className="border-b border-slate-200 pb-3">
            <h3 className="text-sm md:text-base font-black text-slate-900 flex items-center gap-2">
              <Split className="w-4 h-4 text-rose-600" />
              <span>Tam Chứng Nhồi Máu Hành Não (Figure 14-3 & Box 21 Shibasaki)</span>
            </h3>
            <p className="text-xs text-slate-500">
              Đối chiếu giải phẫu vi thể phân định 3 biến thể: Wallenberg vs Babinski-Nageotte vs Cestan-Chenais
            </p>
          </div>

          {/* 3 Interactive Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {/* 1. Wallenberg */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
              <div className="border-b border-slate-200 pb-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-bold">
                  KINH ĐIỂN
                </span>
                <h4 className="text-sm font-bold text-slate-900 mt-1">1. Hội chứng Wallenberg</h4>
                <span className="text-[11px] text-slate-500 font-mono">Lateral Medullary Syndrome</span>
              </div>
              {/* Graphic Cross Section Representation */}
              <div className="h-28 w-full bg-white rounded-lg border border-slate-200 p-2 flex items-center justify-center relative">
                <svg className="w-24 h-24" viewBox="0 0 100 100">
                  {/* Outline of Medulla */}
                  <ellipse cx="50" cy="50" rx="42" ry="38" fill="#f8fafc" stroke="#64748b" strokeWidth="2" />
                  {/* Anterior Pyramids */}
                  <circle cx="42" cy="78" r="7" fill="#e2e8f0" stroke="#94a3b8" />
                  <circle cx="58" cy="78" r="7" fill="#e2e8f0" stroke="#94a3b8" />
                  {/* Lesion in Lateral Medulla */}
                  <path d="M75,35 Q90,50 82,65 Q68,60 70,45 Z" fill="#ef4444" opacity="0.85" />
                  <text x="50" y="25" textAnchor="middle" fontSize="8" fill="#64748b">Lưng (Dorsal)</text>
                  <text x="50" y="95" textAnchor="middle" fontSize="8" fill="#64748b">Bụng (Ventral)</text>
                </svg>
              </div>
              <div className="space-y-1 text-[11px] text-slate-700">
                <p>• <strong>Vị trí:</strong> Trần hành não ngoài.</p>
                <p>• <strong>Triệu chứng:</strong> Horner + Mất cảm giác đau nhiệt mặt cùng bên, thân đối bên + Nuốt nghẹn, khàn tiếng + Chóng mặt, thất điều.</p>
                <p className="font-bold text-rose-700">• ĐẶC ĐIỂM: KHÔNG LIỆT NỬA NGƯỜI (bó tháp ở bụng hành não nguyên vẹn).</p>
              </div>
            </div>

            {/* 2. Babinski-Nageotte */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
              <div className="border-b border-slate-200 pb-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 font-bold">
                  LAN VÀO BÓ THÁP
                </span>
                <h4 className="text-sm font-bold text-slate-900 mt-1">2. Babinski-Nageotte</h4>
                <span className="text-[11px] text-slate-500 font-mono">Wallenberg + Hemiplegia</span>
              </div>
              <div className="h-28 w-full bg-white rounded-lg border border-slate-200 p-2 flex items-center justify-center relative">
                <svg className="w-24 h-24" viewBox="0 0 100 100">
                  <ellipse cx="50" cy="50" rx="42" ry="38" fill="#f8fafc" stroke="#64748b" strokeWidth="2" />
                  <circle cx="42" cy="78" r="7" fill="#e2e8f0" stroke="#94a3b8" />
                  {/* Lesion extends to Pyramid */}
                  <circle cx="58" cy="78" r="7" fill="#ef4444" stroke="#b91c1c" />
                  <path d="M75,35 Q90,50 82,65 Q62,75 56,70 Q60,45 70,40 Z" fill="#ef4444" opacity="0.85" />
                </svg>
              </div>
              <div className="space-y-1 text-[11px] text-slate-700">
                <p>• <strong>Vị trí:</strong> Nửa hành não ngoài lan rộng vào tháp hành trước.</p>
                <p>• <strong>Triệu chứng:</strong> Toàn bộ hội chứng Wallenberg.</p>
                <p className="font-bold text-indigo-700">• CỘNG THÊM: LIỆT NỬA NGƯỜI ĐỐI BÊN (xâm lấn bó tháp vỏ - gai).</p>
              </div>
            </div>

            {/* 3. Cestan-Chenais */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
              <div className="border-b border-slate-200 pb-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold">
                  CHỪA TIỂU NÃO
                </span>
                <h4 className="text-sm font-bold text-slate-900 mt-1">3. Cestan-Chenais</h4>
                <span className="text-[11px] text-slate-500 font-mono">Bụng Ngoài Hành Não</span>
              </div>
              <div className="h-28 w-full bg-white rounded-lg border border-slate-200 p-2 flex items-center justify-center relative">
                <svg className="w-24 h-24" viewBox="0 0 100 100">
                  <ellipse cx="50" cy="50" rx="42" ry="38" fill="#f8fafc" stroke="#64748b" strokeWidth="2" />
                  <circle cx="42" cy="78" r="7" fill="#e2e8f0" stroke="#94a3b8" />
                  <circle cx="58" cy="78" r="7" fill="#ef4444" stroke="#b91c1c" />
                  {/* Lesion in Ventrolateral, sparing Dorsolateral Cerebellar peduncle */}
                  <path d="M78,55 Q85,68 65,78 Q55,75 58,65 Q68,55 78,55 Z" fill="#ef4444" opacity="0.85" />
                </svg>
              </div>
              <div className="space-y-1 text-[11px] text-slate-700">
                <p>• <strong>Vị trí:</strong> Vùng bụng ngoài hành não, bảo tồn cuống tiểu não dưới và nhân tiền đình.</p>
                <p>• <strong>Triệu chứng:</strong> Horner + mất cảm giác đau nhiệt + nuốt khó + liệt nửa người.</p>
                <p className="font-bold text-amber-700">• ĐẶC ĐIỂM: KHÔNG CHÓNG MẶT, KHÔNG THẤT ĐIỀU TIỂU NÃO.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================== SUB-TAB 4: SKULL BASE CANAL SYNDROMES ===================== */}
      {activeSubTab === "skull-base" && (
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="border-b border-slate-200 pb-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Compass className="w-4 h-4 text-indigo-600" />
              <span>Hội Chứng Tổn Thương Đa Dây Lỗ Nền Sọ (Table 14-1 Shibasaki)</span>
            </h3>
            <p className="text-xs text-slate-500">
              Các dây thần kinh sọ thấp thoát ra qua các lỗ nền sọ nằm sát nhau, thường bị tổn thương phối hợp do chấn thương, u hạt hoặc ung thư di căn
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs">
            {/* Gradenigo */}
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
              <div className="flex items-center justify-between">
                <strong className="text-slate-900">Hội chứng Gradenigo</strong>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                  DÂY V, VI
                </span>
              </div>
              <p className="text-slate-600">
                • <strong>Vị trí:</strong> Đỉnh xương đá (Tip of petrous pyramid). Thường do viêm tai giữa biến chứng viêm mỏm đá.
                <br />• <strong>Triệu chứng:</strong> Đau sâu vùng sau nhãn cầu hoặc vùng chi phối V1 + Liệt cơ thẳng ngoài dây VI (lác trong).
              </p>
            </div>

            {/* Vernet */}
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
              <div className="flex items-center justify-between">
                <strong className="text-slate-900">Hội chứng Vernet (Lỗ Tĩnh Mạch Cảnh)</strong>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-800">
                  DÂY IX, X, XI
                </span>
              </div>
              <p className="text-slate-600">
                • <strong>Vị trí:</strong> Lỗ tĩnh mạch cảnh (Jugular foramen).
                <br />• <strong>Triệu chứng:</strong> Nuốt sặc, mất cảm giác 1/3 sau lưỡi (IX); Khàn tiếng, liệt vòm hầu (X); Liệt cơ ức đòn chũm và cơ thang, vai xệ không nâng được (XI).
              </p>
            </div>

            {/* Collet-Sicard */}
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
              <div className="flex items-center justify-between">
                <strong className="text-slate-900">Hội chứng Collet-Sicard</strong>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-800">
                  DÂY IX, X, XI, XII
                </span>
              </div>
              <p className="text-slate-600">
                • <strong>Vị trí:</strong> Lỗ tĩnh mạch cảnh + Ống hạ thiệt (Jugular foramen & Hypoglossal canal).
                <br />• <strong>Triệu chứng:</strong> Toàn bộ hội chứng Vernet CỘNG THÊM Liệt teo nửa lưỡi cùng bên (dây XII).
              </p>
            </div>

            {/* Villaret */}
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
              <div className="flex items-center justify-between">
                <strong className="text-slate-900">Hội chứng Villaret (Khoang Sau Tuyến Mang Tai)</strong>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                  DÂY IX, X, XI, XII + GIAO CẢM
                </span>
              </div>
              <p className="text-slate-600">
                • <strong>Vị trí:</strong> Khoang sau tuyến mang tai (Retroparotid space - Villaret 1916).
                <br />• <strong>Triệu chứng:</strong> Liệt cả 4 dây thần kinh sọ đuôi (IX, X, XI, XII) kèm <strong>Hội chứng Horner</strong> (sụp mi, co đồng tử) do chèn ép thân hạch giao cảm cổ.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
