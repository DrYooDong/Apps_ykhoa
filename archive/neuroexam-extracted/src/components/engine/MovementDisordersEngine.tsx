import React, { useState } from "react";
import {
  GitBranch,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Info,
  Layers,
  Search,
  RotateCcw,
  Sparkles,
  BookOpen,
  ArrowRight,
  Sliders,
  Flame,
  ShieldCheck
} from "lucide-react";

interface DisorderProfile {
  id: string;
  nameVi: string;
  nameEn: string;
  category: string;
  rhythm: "Rhythmic / Periodic" | "Irregular";
  speed: "Slow" | "Shock-like" | "Violent" | "Rapid" | "Writhing";
  phenomenology: string;
  neuroanatomy: string;
  electrophysiology: string;
  modulatingFactors: string[];
  etiologyAndGenes: string[];
  firstLineTherapy: string[];
  clinicalBoxRef: string;
}

const DISORDERS_DB: DisorderProfile[] = [
  {
    id: "parkinson-tremor",
    nameVi: "Run Khi Nghỉ (Resting Tremor)",
    nameEn: "Parkinsonian Resting Tremor",
    category: "Tremor (Run)",
    rhythm: "Rhythmic / Periodic",
    speed: "Slow",
    phenomenology:
      "Tần số 4-6 Hz, xuất hiện điển hình khi chi ở trạng thái nghỉ cơ hoàn toàn (không co cơ chủ động). Có thể tạm biến mất khi bắt đầu vận động có chủ ý nhưng tái xuất hiện sau vài giây giữ tư thế (Re-emergent tremor). Thường bất đối xứng lúc khởi phát.",
    neuroanatomy:
      "Thoái hóa nơ-ron Dopaminergic tại Liềm đen phần đặc (SNc) $\\rightarrow$ Mất cân bằng vòng hồi tiếp Nhân bèo (GPi) - Đồi thị (Nhân Vim/Vop) - Vỏ não cảm giác vận động.",
    electrophysiology:
      "Điện cơ bề mặt (EMG) cho thấy các chùm sóng điện thế co rút đối nghịch luân phiên (alternating reciprocal burst) giữa nhóm cơ gấp và cơ duỗi tần số 4-6 Hz. Có sự đồng kết nối vỏ - cơ (Corticomuscular coherence).",
    modulatingFactors: [
      "Tăng lên khi căng thẳng tâm lý, tính nhẩm, hoặc khi chi đối bên cử động.",
      "Ức chế/biến mất tạm thời khi cử động chủ ý nhóm cơ đó.",
      "Không bao giờ là run tâm lý đơn thuần nếu có tính bất đối xứng kèm độ cứng đơ (Rigidity) và chậm vận động."
    ],
    etiologyAndGenes: [
      "Bệnh Parkinson vô căn (Idiopathic Parkinson's Disease - IPD).",
      "Đột biến gen di truyền: LRRK2, SNCA (PARK1), Parkin (PARK2), PINK1, DJ-1.",
      "Hội chứng Parkinson do thuốc chẹn thụ thể D2 (Neuroleptics), ngộ độc Mangan, CO."
    ],
    firstLineTherapy: [
      "Levodopa/Carbidopa hoặc đồng vận Dopamine (Pramipexole, Ropinirole).",
      "Kháng cholinergic (Trihexyphenidyl) hữu ích cho run ưu thế ở bệnh nhân trẻ (<65 tuổi).",
      "Kích thích não sâu (DBS) nhân Vim đồi thị hoặc nhân dưới đồi STN khi kháng trị."
    ],
    clinicalBoxRef: "Shibasaki & Hallett Chapter 18-2A, Box 46, Box 47"
  },
  {
    id: "essential-tremor",
    nameVi: "Run Vô Căn (Essential Tremor)",
    nameEn: "Essential Tremor (Postural & Action)",
    category: "Tremor (Run)",
    rhythm: "Rhythmic / Periodic",
    speed: "Slow",
    phenomenology:
      "Tần số 5-8 Hz, ưu thế khi giơ tay giữ tư thế (Postural tremor) và khi thực hiện động tác với tay chạm đích (Action/Kinetic tremor), rõ nhất ở cuối tầm ngón tay chạm mũi. Thường đối xứng hơn về tần số so với Parkinson.",
    neuroanatomy:
      "Bộ máy tạo nhịp (Pacemaker) nằm ở Tiểu não và vòng Olivo-cerebello-thalamo-cortical (Tam giác Guillain-Mollaret). Giảm mật độ tế bào Purkinje hoặc suy giảm chức năng ức chế GABAergic tại nhân Locus Coeruleus.",
    electrophysiology:
      "EMG cho thấy co cơ đồng thì (synchronous) hoặc luân phiên giữa cơ đồng vận và đối vận tần số 5-8 Hz. Tần số tương đối hằng định giữa hai bên tay.",
    modulatingFactors: [
      "Giảm rõ rệt sau khi uống một lượng nhỏ ethanol (Rượu bia làm dịu run - Box 48).",
      "Tăng lên khi mệt mỏi, lo âu, dùng caffein hoặc thuốc kích thích beta.",
      "Có thể kèm theo run đầu gật gù (Titubation) hoặc run giọng nói."
    ],
    etiologyAndGenes: [
      "Di truyền trội trên nhiễm sắc thể thường (Autosomal Dominant) với độ thâm nhập cao (>50% có tiền sử gia đình).",
      "Khoảng 20% bệnh nhân run vô căn kèm theo đau đầu Migraine."
    ],
    firstLineTherapy: [
      "Thuốc chẹn beta không chọn lọc: Propranolol (40 - 160 mg/ngày).",
      "Primidone (chống động kinh) khởi liều thấp tăng dần.",
      "Topiramate, Gabapentin là lựa chọn hàng hai; DBS nhân Vim đồi thị khi tàn phế nặng."
    ],
    clinicalBoxRef: "Shibasaki & Hallett Chapter 18-2B, Box 47, Box 48"
  },
  {
    id: "cortical-myoclonus",
    nameVi: "Giật Cơ Vỏ Não (Cortical Myoclonus & Asterixis)",
    nameEn: "Cortical Myoclonus & Reflex Myoclonus",
    category: "Myoclonus (Giật cơ)",
    rhythm: "Rhythmic / Periodic",
    speed: "Shock-like",
    phenomenology:
      "Co cơ ngắn đột ngột dạng 'điện giật' (<50ms). Có thể là giật cơ dương tính (co cơ đột ngột) hoặc giật cơ âm tính (Asterixis - ngắt quãng trương lực cơ duỗi đột ngột, làm cổ tay rơi xuống). Thường nhạy với kích thích xúc giác hoặc vận động (Reflex myoclonus).",
    neuroanatomy:
      "Tăng kích thích bất thường tại Vỏ não vận động nguyên phát (Brodmann 4 - MI) và Vỏ não cảm giác (SI) do suy giảm cơ chế ức chế nội vỏ qua thụ thể GABA-A.",
    electrophysiology:
      "Điện não đồ (EEG) hiển thị sóng nhọn/gai trước khi giật cơ (Spike-triggered averaging). Điện thế gợi cảm giác thân thể (SEP) khổng lồ (Giant SEP, biên độ P25/N33 cực lớn). Điện cơ thấy phóng điện đa đơn vị vận động thời gian cực ngắn (10-50 ms).",
    modulatingFactors: [
      "Kích thích va chạm xúc giác hoặc kích thích ánh sáng chớp (Photic stimulation) gây cơn giật.",
      "Có thể xuất hiện sau ngừng tuần hoàn hồi sinh tim phổi (Hội chứng Lance-Adams).",
      "Asterixis (Run vẫy âm tính) điển hình trong Hôn mê gan, Urê máu cao, ngộ độc thuốc chống co giật."
    ],
    etiologyAndGenes: [
      "Động kinh giật cơ tiến triển (PME): Unverricht-Lundborg (gen CSTB/EPM1), Bệnh Lafora, BAFME.",
      "Bệnh não thiếu oxy hồi sức sau ngưng tim (Hội chứng Lance-Adams).",
      "Nhồi máu đồi thị đối bên (Thalamic asterixis - Box 58)."
    ],
    firstLineTherapy: [
      "Levetiracetam (Khởi đầu 1000 - 3000 mg/ngày) là lựa chọn ưu tiên hàng đầu.",
      "Clonazepam (0.5 - 4 mg/ngày) tăng cường ức chế GABAergic.",
      "Sodium Valproate, Piracetam liều cao. CHỐNG CHỈ ĐỊNH: Phenytoin, Carbamazepine (vì có thể làm nặng thêm giật cơ vỏ não)."
    ],
    clinicalBoxRef: "Shibasaki & Hallett Chapter 18-8A, Figure 18-10, Box 55, Box 58"
  },
  {
    id: "focal-dystonia",
    nameVi: "Loạn Trương Lực Cơ Khu Trú & Thủ Thuật Cảm Giác",
    nameEn: "Focal Dystonia (Torticollis, Blepharospasm, Writer's Cramp)",
    category: "Dystonia (Loạn trương lực)",
    rhythm: "Irregular",
    speed: "Writhing",
    phenomenology:
      "Co thắt cơ kéo dài, xoắn vặn bất thường tạo nên tư thế bất thường cố định tạm thời. Điển hình: Vẹo cổ co thắt (Cervical dystonia), Co thắt mi mắt (Blepharospasm), Chuột rút người viết/nhạc công (Writer's/Musician's cramp).",
    neuroanatomy:
      "Rối loạn tích hợp cảm giác - vận động (Sensorimotor integration). Mất ức chế phân vùng tại vỏ não vận động và thể vân. Nghiên cứu MEG cho thấy hiện tượng 'nhập vùng' (fusion of finger areas) của các ngón tay tại hồi sau trung tâm.",
    electrophysiology:
      "Co đồng thời (Co-contraction) giữa cơ đồng vận và đối vận kéo dài dai dẳng trên EMG. Mất sự ức chế hồi tiếp tương hỗ (Reciprocal inhibition).",
    modulatingFactors: [
      "DẤU HIỆU ĐẶC BIỆT: 'Thủ thuật cảm giác' (Sensory Trick / Geste antagoniste) - Chạm nhẹ tay vào cằm, má hoặc tựa đầu vào tường làm cổ trở về vị trí thẳng ngay lập tức (Box 52).",
      "Tính đặc hiệu theo công việc (Task-specific): Chỉ xuất hiện khi viết chữ hoặc cầm cây đàn cụ thể, khi gõ bàn phím bình thường.",
      "Giảm khi ngủ hoặc nằm ngửa thư giãn hoàn toàn."
    ],
    etiologyAndGenes: [
      "Nguyên phát / Vô căn; đột biến gen DYT1 (Torsin A), DYT6 (THAP1).",
      "Loạn trương lực đáp ứng L-dopa (Hội chứng Segawa - gen GTP cyclohydrolase I).",
      "Thứ phát sau chấn thương, Bệnh Wilson (cần soi đèn khe tìm vòng Kayser-Fleischer)."
    ],
    firstLineTherapy: [
      "Tiêm Độc tố Botulinum (Botox/Dysport) tại chỗ vào các cơ co thắt đích (ức chế giải phóng Acetylcholine).",
      "Thử nghiệm đáp ứng L-dopa liều thấp để loại trừ Bệnh Segawa (có thể hồi phục hoàn toàn).",
      "Thuốc uống hỗ trợ: Trihexyphenidyl, Baclofen, Clonazepam; DBS nhân bèo trong (GPi) cho thể toàn thể."
    ],
    clinicalBoxRef: "Shibasaki & Hallett Chapter 18-6, Figures 18-6, 18-7, Box 52"
  },
  {
    id: "chorea-huntington",
    nameVi: "Múa Giật (Chorea - Huntington & Căn Nguyên)",
    nameEn: "Chorea & Choreoathetosis",
    category: "Chorea (Múa giật)",
    rhythm: "Irregular",
    speed: "Rapid",
    phenomenology:
      "Các cử động không tự chủ ngắn, nhanh, giật giục, ngẫu nhiên, không thể đoán trước, chuyển dịch liên tục từ nhóm cơ này sang nhóm cơ khác ('nhảy múa'). Bệnh nhân thường cố gắng biến báo thành động tác có chủ đích (quasi-purposive) để che giấu.",
    neuroanatomy:
      "Thoái hóa tế bào gai trung bình (Medium spiny neurons) của Nhân đuôi (Caudate nucleus) và Thể vân. Dẫn đến suy giảm con đường gián tiếp (Indirect pathway) $\\rightarrow$ Mất ức chế đồi thị $\\rightarrow$ Vỏ não vận động bị quá kích thích.",
    electrophysiology:
      "EMG ghi nhận các đợt bộc phát hoạt động cơ hỗn loạn, không đồng bộ, thời gian kéo dài thay đổi từ 50 đến 500 ms, phân bố ngẫu nhiên không có nhịp.",
    modulatingFactors: [
      "Tăng lên khi chú ý, vận động, đi lại, căng thẳng tâm lý.",
      "Mất đi hoàn toàn trong khi ngủ sâu.",
      "Kèm theo dấu hiệu 'vắt sữa' (Milkmaid's grip) - không thể duy trì lực nắm tay liên tục, và lưỡi thò ra bị thụt vào tự phát (Trombone tongue)."
    ],
    etiologyAndGenes: [
      "Bệnh Huntington: Di truyền trội, đột biến lặp đoạn ba nucleotid CAG trên gen Huntingtin nhiễm sắc thể 4p16.3.",
      "Múa giật Sydenham (hậu nhiễm liên cầu khuẩn tan huyết beta nhóm A - PANDAS).",
      "Múa giật do thuốc chẹn thụ thể Dopamine (Tardive dyskinesia) hoặc cường giáp, đái tháo đường tăng áp lực thẩm thấu."
    ],
    firstLineTherapy: [
      "Thuốc ức chế vận chuyển monoamine túi VMAT-2: Tetrabenazine hoặc Deutetrabenazine.",
      "Thuốc an thần kinh kháng Dopamine thụ thể D2 (Haloperidol, Risperidone, Olanzapine).",
      "Điều trị nguyên nhân nền: Kháng sinh/corticoid trong Sydenham, kiểm soát đường huyết."
    ],
    clinicalBoxRef: "Shibasaki & Hallett Chapter 18-3, Box 51"
  },
  {
    id: "hemiballismus",
    nameVi: "Múa Vung Nửa Người (Hemiballism / Ballismus)",
    nameEn: "Hemiballismus / Ballism",
    category: "Ballism (Múa vung)",
    rhythm: "Irregular",
    speed: "Violent",
    phenomenology:
      "Cử động không tự ý biên độ rất lớn, mang tính bạo kích dữ dội (ném, đá, vung mạnh tay chân) chủ yếu ở các khớp gốc chi (vai, hông). Cử động liên tục có thể gây kiệt sức, chấn thương da thịt hoặc ngã khỏi giường.",
    neuroanatomy:
      "Tổn thương Nhân dưới đồi (Subthalamic Nucleus - STN / Thể Luys) hoặc thể vân đối bên. Mất kích thích glutamatergic từ STN sang GPi $\\rightarrow$ Giảm phóng điện GABAergic ức chế từ GPi $\\rightarrow$ Đồi thị bùng nổ xung động kích thích vỏ não.",
    electrophysiology:
      "Bộc phát điện thế cơ biên độ khổng lồ trên EMG ở các nhóm cơ đai vai và đai chậu, co thắt mạnh không chu kỳ.",
    modulatingFactors: [
      "Cơn bộc phát dữ dội khi thức và khi gắng sức thay đổi tư thế.",
      "Limb-shaking TIA (Cơn thiếu máu não thoáng qua lắc chi): Cử động vung giật một chi xuất hiện khi đứng lên, biến mất sau vài phút, cảnh báo hẹp nặng ĐM cảnh trong (Box 51).",
      "Nonketotic hyperglycemic hemiballism: Xuất hiện ở bệnh nhân đái tháo đường kiểm soát kém, MRI T1 thấy tăng tín hiệu thể vân đối bên."
    ],
    etiologyAndGenes: [
      "Đột quỵ nhồi máu não hoặc xuất huyết nhỏ khu trú tại Nhân dưới đồi (STN đối bên).",
      "Tăng đường huyết không nhiễm toan ceton (Nonketotic hyperglycemia).",
      "U hạt, áp xe hoặc viêm não tự miễn khu trú."
    ],
    firstLineTherapy: [
      "Thuốc an thần kinh phong bế D2: Haloperidol đường tiêm/uống, Olanzapine khẩn cấp.",
      "Tetrabenazine (VMAT2 inhibitor) kiểm soát cường độ vung chi.",
      "Bù dịch và hạ đường huyết chuẩn mực nếu do đái tháo đường; điều trị phòng ngừa đột quỵ mạch máu."
    ],
    clinicalBoxRef: "Shibasaki & Hallett Chapter 18-4, Box 51, Box 54"
  },
  {
    id: "tics-tourette",
    nameVi: "Tật Giật Cơ & Hội Chứng Tourette (Tics)",
    nameEn: "Motor & Vocal Tics / Gilles de la Tourette",
    category: "Tics (Tật giật)",
    rhythm: "Rhythmic / Periodic",
    speed: "Rapid",
    phenomenology:
      "Cử động giật định hình (nháy mắt, nhún vai, giật cổ, khịt mũi) hoặc âm thanh (tằng hắng, sủa, phát âm tiếng chửi - Coprolalia). ĐẶC BIỆT: Bệnh nhân cảm nhận thấy 'thôi thúc bức bối tiền triệu' (premonitory urge) và cảm giác nhẹ nhõm sau khi thực hiện tic.",
    neuroanatomy:
      "Rối loạn mạch nối Vỏ não trán ổ mắt - Thể vân - Đồi thị (Cortico-striato-thalamo-cortical circuit). Quá nhạy thụ thể Dopaminergic tại thể vân.",
    electrophysiology:
      "Có thể kìm nén được trong vài giây đến vài phút nếu có nỗ lực tập trung chú ý (nhưng sẽ có hiện tượng bùng nổ bù trừ sau đó - Rebound phenomenon).",
    modulatingFactors: [
      "Có thể kìm nén theo ý muốn trong khoảng thời gian ngắn (Suppressed momentarily).",
      "Tăng vọt khi lo âu, phấn khích, xem tivi hoặc chơi game nhiều.",
      "Thường đi kèm tăng động giảm chú ý (ADHD) và ám ảnh cưỡng chế (OCD)."
    ],
    etiologyAndGenes: [
      "Hội chứng Gilles de la Tourette: Di truyền phức hợp đa gen với yếu tố biểu sinh.",
      "Tic thoáng qua tuổi học đường (thường tự thoái lui sau tuổi dậy thì).",
      "Thứ phát sau viêm não nhiễm trùng hoặc thuốc kích thích thần kinh (Amphetamine, Methylphenidate)."
    ],
    firstLineTherapy: [
      "Can thiệp hành vi toàn diện cho tật giật (CBIT - Comprehensive Behavioral Intervention for Tics).",
      "Thuốc đồng vận Alpha-2 adrenergic: Clonidine, Guanfacine (ưu tiên khi có kèm ADHD).",
      "Thuốc chống loạn thần không điển hình liều thấp: Aripiprazole, Risperidone nếu tic gây đau/tàn phế."
    ],
    clinicalBoxRef: "Shibasaki & Hallett Chapter 18-10A"
  }
];

export const MovementDisordersEngine: React.FC = () => {
  const [selectedDisorderId, setSelectedDisorderId] = useState<string>("parkinson-tremor");
  const [filterRhythm, setFilterRhythm] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Step-by-step Interactive Flowchart State
  const [step1Rhythm, setStep1Rhythm] = useState<"rhythmic" | "irregular" | null>(null);
  const [step2Quality, setStep2Quality] = useState<string | null>(null);

  const selectedDisorder =
    DISORDERS_DB.find((d) => d.id === selectedDisorderId) || DISORDERS_DB[0];

  const filteredDisorders = DISORDERS_DB.filter((d) => {
    if (filterRhythm !== "all" && d.rhythm !== filterRhythm) return false;
    if (filterCategory !== "all" && !d.category.includes(filterCategory)) return false;
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      return (
        d.nameVi.toLowerCase().includes(q) ||
        d.nameEn.toLowerCase().includes(q) ||
        d.phenomenology.toLowerCase().includes(q) ||
        d.neuroanatomy.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const resetFlowchart = () => {
    setStep1Rhythm(null);
    setStep2Quality(null);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner with Scientific Citation */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-800/60 rounded-2xl p-4 md:p-6 text-white shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-mono font-semibold">
              <GitBranch className="w-3.5 h-3.5" />
              <span>SHIBASAKI & HALLETT (OXFORD 2016) • CHƯƠNG 18</span>
            </div>
            <h2 className="text-lg md:text-xl font-extrabold tracking-tight text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-indigo-400" />
              Cây Phân Loại & Động Thái Rối Loạn Vận Động Bất Thường
            </h2>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Thuật toán nhận diện trực quan dựa trên <strong>tính nhịp điệu (Rhythmicity)</strong>, tốc độ co cơ và cơ chế vòng hồi tiếp Thể vân - Đồi thị - Vỏ não (Center-Surround Hypothesis).
            </p>
          </div>

          <button
            onClick={resetFlowchart}
            className="px-3 py-1.5 rounded-xl bg-indigo-600/80 hover:bg-indigo-600 text-xs font-semibold text-white flex items-center gap-1.5 transition-all shadow-xs border border-indigo-400/40"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Khởi Động Lại Cây Phân Nhánh</span>
          </button>
        </div>
      </div>

      {/* INTERACTIVE FLOWCHART (Figure 18-1 Recreated in UI) */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 md:p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700 font-bold text-xs">
              1
            </span>
            <h3 className="text-sm font-bold text-slate-900">
              Cây Quyết Định Thăm Khám Nhanh Tại Giường (Interactive Flowchart - Figure 18-1)
            </h3>
          </div>
          <span className="text-[11px] text-slate-500 font-medium hidden sm:inline-block">
            Nhấp từng nấc để định vị hội chứng
          </span>
        </div>

        {/* Step 1: Rhythmicity */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 block">
            Bước 1: Cử động bất thường có tính NHỊP ĐIỆU (Rhythmicity) hay KHÔNG ĐỀU (Irregular)?
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => {
                setStep1Rhythm("rhythmic");
                setStep2Quality(null);
              }}
              className={`p-3 rounded-xl border text-left transition-all ${
                step1Rhythm === "rhythmic"
                  ? "bg-indigo-50/80 border-indigo-500 text-indigo-900 shadow-xs"
                  : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs">Có nhịp điệu / Định kỳ (Rhythmic / Periodic)</span>
                {step1Rhythm === "rhythmic" && <CheckCircle2 className="w-4 h-4 text-indigo-600" />}
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Lặp lại theo chu kỳ đều đặn (như con lắc) hoặc có khoảng nghỉ hằng định (Run, Giật cơ vỏ não, Tic).
              </p>
            </button>

            <button
              onClick={() => {
                setStep1Rhythm("irregular");
                setStep2Quality(null);
              }}
              className={`p-3 rounded-xl border text-left transition-all ${
                step1Rhythm === "irregular"
                  ? "bg-indigo-50/80 border-indigo-500 text-indigo-900 shadow-xs"
                  : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs">Không đều / Hỗn loạn (Irregular)</span>
                {step1Rhythm === "irregular" && <CheckCircle2 className="w-4 h-4 text-indigo-600" />}
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Biên độ và chu kỳ thay đổi hỗn loạn, không lường trước được (Dystonia, Chorea, Ballism, Dyskinesia).
              </p>
            </button>
          </div>
        </div>

        {/* Step 2: Quality based on Step 1 */}
        {step1Rhythm && (
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <label className="text-xs font-bold text-slate-700 block">
              Bước 2: Tốc độ và đặc tính co cơ lâm sàng (Muscle Contraction Character):
            </label>

            {step1Rhythm === "rhythmic" ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <button
                  onClick={() => {
                    setStep2Quality("slow-tremor");
                    setSelectedDisorderId("parkinson-tremor");
                  }}
                  className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                    step2Quality === "slow-tremor"
                      ? "bg-teal-50 border-teal-500 text-teal-900 font-bold"
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <div className="font-bold text-slate-900">1. Chậm (Slow, 3 - 8 Hz)</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Co cơ đối kháng luân phiên $\rightarrow$ <strong>Run (Tremor)</strong>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setStep2Quality("shock-myoclonus");
                    setSelectedDisorderId("cortical-myoclonus");
                  }}
                  className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                    step2Quality === "shock-myoclonus"
                      ? "bg-teal-50 border-teal-500 text-teal-900 font-bold"
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <div className="font-bold text-slate-900">2. Dạng giật điện (Shock-like)</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Co giật cực nhanh (&lt;50ms) $\rightarrow$ <strong>Giật cơ (Myoclonus)</strong>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setStep2Quality("suppressible-tic");
                    setSelectedDisorderId("tics-tourette");
                  }}
                  className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                    step2Quality === "suppressible-tic"
                      ? "bg-teal-50 border-teal-500 text-teal-900 font-bold"
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <div className="font-bold text-slate-900">3. Kìm nén tạm thời được</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Có thôi thúc tiền triệu $\rightarrow$ <strong>Tật giật (Tic)</strong>
                  </div>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
                <button
                  onClick={() => {
                    setStep2Quality("slow-writhing");
                    setSelectedDisorderId("focal-dystonia");
                  }}
                  className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                    step2Quality === "slow-writhing"
                      ? "bg-teal-50 border-teal-500 text-teal-900 font-bold"
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <div className="font-bold text-slate-900">1. Xoắn vặn (Writhing)</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Tư thế bất thường $\rightarrow$ <strong>Loạn trương lực (Dystonia)</strong>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setStep2Quality("simple-rapid");
                    setSelectedDisorderId("chorea-huntington");
                  }}
                  className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                    step2Quality === "simple-rapid"
                      ? "bg-teal-50 border-teal-500 text-teal-900 font-bold"
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <div className="font-bold text-slate-900">2. Nhanh, biến chuyển</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Cử động như nhảy múa $\rightarrow$ <strong>Múa giật (Chorea)</strong>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setStep2Quality("violent-proximal");
                    setSelectedDisorderId("hemiballismus");
                  }}
                  className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                    step2Quality === "violent-proximal"
                      ? "bg-teal-50 border-teal-500 text-teal-900 font-bold"
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <div className="font-bold text-slate-900">3. Bạo kích gốc chi</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Quăng ném mạnh mẽ $\rightarrow$ <strong>Múa vung (Ballism)</strong>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setStep2Quality("complex-restless");
                    setSelectedDisorderId("chorea-huntington");
                  }}
                  className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                    step2Quality === "complex-restless"
                      ? "bg-teal-50 border-teal-500 text-teal-900 font-bold"
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <div className="font-bold text-slate-900">4. Phức tạp / Do thuốc</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Miệng lưỡi, bồn chồn $\rightarrow$ <strong>Dyskinesia / Akathisia</strong>
                  </div>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Two-Column Explorer: Left Selector & Right Detailed Scientific Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Quick Filter and List */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-indigo-600" />
                <span>Bộ Lọc & Tra Cứu</span>
              </span>
              <span className="text-[10px] font-mono text-slate-500">
                {filteredDisorders.length} thể bệnh
              </span>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm run, giật cơ, gen, GABA..."
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 bg-slate-50"
              />
            </div>

            {/* Rhythm Filter Pills */}
            <div className="flex items-center gap-1.5 text-[11px]">
              <button
                onClick={() => setFilterRhythm("all")}
                className={`px-2.5 py-1 rounded-lg border font-medium ${
                  filterRhythm === "all"
                    ? "bg-slate-800 text-white border-slate-800"
                    : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200"
                }`}
              >
                Tất cả
              </button>
              <button
                onClick={() => setFilterRhythm("Rhythmic / Periodic")}
                className={`px-2.5 py-1 rounded-lg border font-medium ${
                  filterRhythm === "Rhythmic / Periodic"
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200"
                }`}
              >
                Đều/Nhịp
              </button>
              <button
                onClick={() => setFilterRhythm("Irregular")}
                className={`px-2.5 py-1 rounded-lg border font-medium ${
                  filterRhythm === "Irregular"
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200"
                }`}
              >
                Không đều
              </button>
            </div>

            {/* Disorder Selection List */}
            <div className="space-y-1.5 pt-2 border-t border-slate-100 max-h-[460px] overflow-y-auto">
              {filteredDisorders.map((disorder) => {
                const isSelected = disorder.id === selectedDisorder.id;
                return (
                  <button
                    key={disorder.id}
                    onClick={() => setSelectedDisorderId(disorder.id)}
                    className={`w-full text-left p-2.5 rounded-xl border transition-all ${
                      isSelected
                        ? "bg-indigo-50/90 border-indigo-500 shadow-2xs"
                        : "bg-white border-slate-200/80 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-xs font-bold ${
                          isSelected ? "text-indigo-950" : "text-slate-800"
                        }`}
                      >
                        {disorder.nameVi}
                      </span>
                      <span
                        className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                          disorder.rhythm === "Rhythmic / Periodic"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {disorder.rhythm === "Rhythmic / Periodic" ? "NHỊP ĐIỆU" : "KHÔNG ĐỀU"}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                      {disorder.nameEn}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Concept Box: Center-Surround Hypothesis */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-slate-300 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-amber-400 font-bold">
              <Sparkles className="w-4 h-4" />
              <span>Thuyết Ức Chế Xung Quanh (Mink 2007)</span>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-300">
              Thể vân (Striatum) thực hiện chức năng <strong>lựa chọn động tác (motor selection)</strong>: Dải GABAergic ức chế cục bộ nhân GPi để <em>giải ức chế (disinhibit)</em> vận động có chủ đích, trong khi nhân dưới đồi STN kích thích lan tỏa GPi để <em>ức chế lan tỏa</em> mọi cử động thừa không mong muốn (Figures 16-10, 16-11).
            </p>
          </div>
        </div>

        {/* Right Column: Detailed Scientific Profile */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-5">
            {/* Title & Metadata Badges */}
            <div className="border-b border-slate-200 pb-4">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 border border-indigo-200">
                  {selectedDisorder.category}
                </span>
                <span className="text-[10px] font-mono text-slate-500">
                  {selectedDisorder.clinicalBoxRef}
                </span>
              </div>
              <h3 className="text-base md:text-lg font-extrabold text-slate-900">
                {selectedDisorder.nameVi}
              </h3>
              <p className="text-xs text-indigo-700 font-medium font-mono">
                {selectedDisorder.nameEn}
              </p>
            </div>

            {/* 1. Đặc điểm lâm sàng hiện tượng học (Phenomenology) */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 text-indigo-900">
                <Info className="w-4 h-4 text-indigo-600" />
                <span>1. Đặc Tính Lâm Sàng Hiện Tượng Học (Clinical Phenomenology)</span>
              </span>
              <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                {selectedDisorder.phenomenology}
              </p>
            </div>

            {/* 2. Cơ sở Giải phẫu Sinh lý Thần kinh (Neuroanatomy & Circuitry) */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 text-indigo-900">
                <Layers className="w-4 h-4 text-indigo-600" />
                <span>2. Định Khu Giải Phẫu & Vòng Hồi Tiếp (Functional Neuroanatomy)</span>
              </span>
              <p className="text-xs text-slate-700 leading-relaxed bg-indigo-50/40 p-3.5 rounded-xl border border-indigo-200/70">
                {selectedDisorder.neuroanatomy}
              </p>
            </div>

            {/* 3. Bằng chứng Điện sinh lý Thần kinh (Electrophysiology & EMG/EEG) */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 text-indigo-900">
                <Activity className="w-4 h-4 text-indigo-600" />
                <span>3. Điện Sinh Lý Lâm Sàng (EMG / EEG / Evoked Potentials)</span>
              </span>
              <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                {selectedDisorder.electrophysiology}
              </p>
            </div>

            {/* 4. Yếu tố điều biến & Nghiệm pháp bên giường bệnh */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 text-indigo-900">
                <Flame className="w-4 h-4 text-indigo-600" />
                <span>4. Yếu Tố Điều Biến & Nghiệm Pháp Khám Giường Bệnh</span>
              </span>
              <ul className="space-y-1.5 text-xs text-slate-700 bg-amber-50/50 p-3.5 rounded-xl border border-amber-200/70">
                {selectedDisorder.modulatingFactors.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 5. Căn nguyên & Đột biến gen theo Shibasaki - Hallett */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2">
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 text-slate-800">
                  <BookOpen className="w-4 h-4 text-teal-600" />
                  <span>Căn Nguyên & Đột Biến Gen</span>
                </span>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1">
                  {selectedDisorder.etiologyAndGenes.map((gen, idx) => (
                    <div key={idx} className="flex items-start gap-1.5">
                      <span className="text-teal-600 font-bold">•</span>
                      <span>{gen}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 text-emerald-900">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Điều Trị Hàng Đầu (First-Line Therapy)</span>
                </span>
                <div className="bg-emerald-50/50 p-3 rounded-xl border border-emerald-200 text-xs text-emerald-900 space-y-1">
                  {selectedDisorder.firstLineTherapy.map((med, idx) => (
                    <div key={idx} className="flex items-start gap-1.5">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span>{med}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
