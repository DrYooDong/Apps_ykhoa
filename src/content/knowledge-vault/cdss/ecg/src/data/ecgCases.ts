import { EcgCase, LeadName, LeadWaveData } from "../types";

// Helper for generating standard normal baseline lead
function createNormalLead(lead: LeadName): LeadWaveData {
  switch (lead) {
    case "I":
      return {
        pWave: { amp: 0.12, dur: 0.08, shape: "normal" },
        prSegment: { dur: 0.06 },
        qWave: { amp: -0.05, dur: 0.02 },
        rWave: { amp: 1.1, dur: 0.04 },
        sWave: { amp: -0.2, dur: 0.03 },
        stSegment: { elevation: 0.0, slope: "horizontal" },
        tWave: { amp: 0.35, dur: 0.16, shape: "normal" },
      };
    case "II":
      return {
        pWave: { amp: 0.18, dur: 0.09, shape: "normal" },
        prSegment: { dur: 0.06 },
        qWave: { amp: -0.06, dur: 0.02 },
        rWave: { amp: 1.6, dur: 0.04 },
        sWave: { amp: -0.25, dur: 0.03 },
        stSegment: { elevation: 0.0, slope: "horizontal" },
        tWave: { amp: 0.45, dur: 0.16, shape: "normal" },
      };
    case "III":
      return {
        pWave: { amp: 0.08, dur: 0.08, shape: "normal" },
        prSegment: { dur: 0.06 },
        qWave: { amp: -0.08, dur: 0.02 },
        rWave: { amp: 0.8, dur: 0.04 },
        sWave: { amp: -0.3, dur: 0.03 },
        stSegment: { elevation: 0.0, slope: "horizontal" },
        tWave: { amp: 0.2, dur: 0.16, shape: "normal" },
      };
    case "aVR":
      return {
        pWave: { amp: -0.12, dur: 0.08, shape: "inverted" },
        prSegment: { dur: 0.06 },
        qWave: { amp: 0, dur: 0.01 },
        rWave: { amp: 0.2, dur: 0.03 },
        sWave: { amp: -1.2, dur: 0.04 },
        stSegment: { elevation: 0.0, slope: "horizontal" },
        tWave: { amp: -0.3, dur: 0.16, shape: "inverted" },
      };
    case "aVL":
      return {
        pWave: { amp: 0.08, dur: 0.08, shape: "normal" },
        prSegment: { dur: 0.06 },
        qWave: { amp: -0.04, dur: 0.02 },
        rWave: { amp: 0.7, dur: 0.04 },
        sWave: { amp: -0.2, dur: 0.03 },
        stSegment: { elevation: 0.0, slope: "horizontal" },
        tWave: { amp: 0.2, dur: 0.16, shape: "normal" },
      };
    case "aVF":
      return {
        pWave: { amp: 0.14, dur: 0.08, shape: "normal" },
        prSegment: { dur: 0.06 },
        qWave: { amp: -0.05, dur: 0.02 },
        rWave: { amp: 1.2, dur: 0.04 },
        sWave: { amp: -0.2, dur: 0.03 },
        stSegment: { elevation: 0.0, slope: "horizontal" },
        tWave: { amp: 0.35, dur: 0.16, shape: "normal" },
      };
    case "V1":
      return {
        pWave: { amp: 0.06, dur: 0.08, shape: "biphasic" },
        prSegment: { dur: 0.06 },
        qWave: { amp: 0, dur: 0.01 },
        rWave: { amp: 0.3, dur: 0.03 },
        sWave: { amp: -1.2, dur: 0.04 },
        stSegment: { elevation: 0.05, slope: "horizontal" },
        tWave: { amp: 0.15, dur: 0.16, shape: "normal" },
      };
    case "V2":
      return {
        pWave: { amp: 0.1, dur: 0.08, shape: "normal" },
        prSegment: { dur: 0.06 },
        qWave: { amp: 0, dur: 0.01 },
        rWave: { amp: 0.7, dur: 0.03 },
        sWave: { amp: -1.6, dur: 0.04 },
        stSegment: { elevation: 0.08, slope: "horizontal" },
        tWave: { amp: 0.45, dur: 0.16, shape: "normal" },
      };
    case "V3":
      return {
        pWave: { amp: 0.12, dur: 0.08, shape: "normal" },
        prSegment: { dur: 0.06 },
        qWave: { amp: 0, dur: 0.01 },
        rWave: { amp: 1.2, dur: 0.04 },
        sWave: { amp: -1.2, dur: 0.04 },
        stSegment: { elevation: 0.05, slope: "horizontal" },
        tWave: { amp: 0.55, dur: 0.16, shape: "normal" },
      };
    case "V4":
      return {
        pWave: { amp: 0.12, dur: 0.08, shape: "normal" },
        prSegment: { dur: 0.06 },
        qWave: { amp: -0.05, dur: 0.02 },
        rWave: { amp: 1.8, dur: 0.04 },
        sWave: { amp: -0.6, dur: 0.03 },
        stSegment: { elevation: 0.02, slope: "horizontal" },
        tWave: { amp: 0.5, dur: 0.16, shape: "normal" },
      };
    case "V5":
      return {
        pWave: { amp: 0.12, dur: 0.08, shape: "normal" },
        prSegment: { dur: 0.06 },
        qWave: { amp: -0.08, dur: 0.02 },
        rWave: { amp: 1.9, dur: 0.04 },
        sWave: { amp: -0.3, dur: 0.03 },
        stSegment: { elevation: 0.0, slope: "horizontal" },
        tWave: { amp: 0.45, dur: 0.16, shape: "normal" },
      };
    case "V6":
      return {
        pWave: { amp: 0.1, dur: 0.08, shape: "normal" },
        prSegment: { dur: 0.06 },
        qWave: { amp: -0.06, dur: 0.02 },
        rWave: { amp: 1.4, dur: 0.04 },
        sWave: { amp: -0.2, dur: 0.03 },
        stSegment: { elevation: 0.0, slope: "horizontal" },
        tWave: { amp: 0.35, dur: 0.16, shape: "normal" },
      };
  }
}

function cloneNormalLeads(): Record<LeadName, LeadWaveData> {
  const leads: LeadName[] = ["I", "II", "III", "aVR", "aVL", "aVF", "V1", "V2", "V3", "V4", "V5", "V6"];
  const res = {} as Record<LeadName, LeadWaveData>;
  for (const l of leads) {
    res[l] = JSON.parse(JSON.stringify(createNormalLead(l)));
  }
  return res;
}

export const ECG_CASES: EcgCase[] = [
  {
    id: "case-stemi-anterior",
    category: "Ischemia",
    title: "NMCT Cấp Thành Trước Rộng (Extensive Anterior STEMI)",
    subtitle: "Tắc đoạn gần động mạch liên thất trước (LAD) - Nguy kịch",
    severity: "Khẩn cấp",
    patient: {
      name: "Trần Văn Bình",
      age: 58,
      gender: "Nam",
      chiefComplaint: "Đau ngực dữ dội kiểu bóp nghẹt sau xương ức lan ra vai trái và hàm",
      clinicalHistory: "Bệnh nhân có tiền sử THA 8 năm, đái tháo đường type 2, hút thuốc lá 20 gói-năm. Đau ngực khởi phát lúc 05:30 sáng khi nghỉ ngơi, kéo dài >90 phút không đỡ với nitrate ngậm dưới lưỡi, kèm vã mồ hôi lạnh và buồn nôn.",
      vitals: { bp: "145/95", hr: 96, spo2: 95, temp: 36.8 },
      labs: { k: 4.1, ca: 2.3, mg: 0.9, troponinI: "2.45 ng/mL (Tăng cao)", ckmb: "48 U/L" },
    },
    metrics: {
      heartRate: 96,
      rhythmType: "Nhịp xoang đều",
      regularity: "Đều",
      axis: "Trục trung gian",
      alphaAngle: 45,
      prInterval: 160,
      qrsDuration: 90,
      qt: 410,
      qtc: 448,
    },
    leadsData: (() => {
      const leads = cloneNormalLeads();
      // ST elevation in V1-V5, I, aVL
      leads["V1"].stSegment = { elevation: 0.25, slope: "coved" };
      leads["V1"].tWave = { amp: 0.4, dur: 0.18, shape: "hyperacute" };

      leads["V2"].qWave = { amp: -0.3, dur: 0.04 }; // Q hoại tử
      leads["V2"].rWave = { amp: 0.4, dur: 0.03 };
      leads["V2"].stSegment = { elevation: 0.55, slope: "coved" }; // ST chênh 5.5mm
      leads["V2"].tWave = { amp: 0.7, dur: 0.2, shape: "hyperacute" };

      leads["V3"].qWave = { amp: -0.4, dur: 0.04 };
      leads["V3"].rWave = { amp: 0.5, dur: 0.03 };
      leads["V3"].stSegment = { elevation: 0.6, slope: "coved" }; // ST chênh vòm
      leads["V3"].tWave = { amp: 0.65, dur: 0.2, shape: "hyperacute" };

      leads["V4"].qWave = { amp: -0.3, dur: 0.03 };
      leads["V4"].stSegment = { elevation: 0.4, slope: "coved" };
      leads["V4"].tWave = { amp: 0.5, dur: 0.18, shape: "hyperacute" };

      leads["V5"].stSegment = { elevation: 0.25, slope: "coved" };
      leads["I"].stSegment = { elevation: 0.2, slope: "coved" };
      leads["aVL"].stSegment = { elevation: 0.25, slope: "coved" };

      // Reciprocal ST depression in DIII and aVF
      leads["III"].stSegment = { elevation: -0.25, slope: "downsloping" };
      leads["III"].tWave = { amp: -0.35, dur: 0.16, shape: "inverted" };
      leads["aVF"].stSegment = { elevation: -0.2, slope: "downsloping" };
      leads["aVF"].tWave = { amp: -0.25, dur: 0.16, shape: "inverted" };
      return leads;
    })(),
    leadsSummary: {
      limbLeadsSummary: "ST chênh lên ở DI, aVL (0.2 - 0.25mV); ST chênh xuống đối ứng (soi gương) sâu ở DIII, aVF (-0.25mV).",
      chestLeadsSummary: "ST chênh lên dạng vòm (coved) rất cao ở V1-V5 (đạt 0.6mV ở V3); sóng Q hoại tử rộng >0.04s xuất hiện ở V2-V4; sóng T nhọn khổng lồ (hyperacute T).",
    },
    diagnosis: {
      primary: "Nhồi máu cơ tim cấp có ST chênh lên thành trước rộng (Extensive Anterior STEMI) giai đoạn tối cấp đến cấp",
      culpritVesselOrCause: "Động mạch liên thất trước (LAD - Left Anterior Descending artery), tổn thương đoạn gần (proximal LAD)",
      differentials: [
        "Viêm màng ngoài tim cấp (loại trừ vì có dấu hiệu soi gương rõ ở DIII, aVF và ST không chênh lõm lan tỏa)",
        "Tái cực sớm lành tính (loại trừ vì ST chênh vòm lồi, có sóng Q hoại tử và hình ảnh soi gương)",
        "Phình vách thất trái (loại trừ vì đau ngực cấp mới khởi phát và men tim tăng)",
      ],
      keyFindings: [
        "ST chênh lên vòm lồi ≥ 2mm tại V1-V4, kèm chuyển đạo bên DI, aVL",
        "Hình ảnh soi gương (reciprocal ST depression) điển hình ở DIII, aVF",
        "Sóng Q hoại tử bệnh lý (>0.04s, >1/4 sóng R) tại V2, V3",
        "Sóng R bị cắt cụt (poor R wave progression) từ V1 đến V4",
      ],
      clinicalNote: "Đây là dạng NMCT có tiên lượng nặng nề nhất do diện hoại tử cơ tim lớn, nguy cơ cao xảy ra choáng tim, suy tim cấp hoặc rung thất đột tử.",
      treatment: [
        "Kích hoạt báo động Đỏ Can thiệp Mạch Vành Cấp (Code STEMI / Cath-Lab) để tái tưới máu ngay trong giờ vàng (<90-120 phút).",
        "Thở oxy nếu SpO2 < 90%, thiết lập đường truyền tĩnh mạch và monitor theo dõi liên tục.",
        "Aspirin 300mg nhai ngậm + Kháng P2Y12 (Ticagrelor 180mg hoặc Clopidogrel 600mg).",
        "Chống đông Heparin không phân đoạn hoặc Enoxaparin.",
        "Morphine tĩnh mạch giảm đau nếu đau ngực dữ dội, kiểm soát huyết áp và nhịp tim cẩn trọng.",
      ],
      confidence: { primary: 98.2, secondaryName: "STEMI trước vách", secondaryConfidence: 1.5 },
    },
    learningNotes: {
      chapterRef: "Chương 8: Bệnh mạch vành (Trang 36-51)",
      coreTakeaway: "Định khu thành trước: V1-V2 là vùng vách, V2-V5 mặt trước, V1-V6 kèm DI, aVL là trước rộng do tắc LAD. Dấu hiệu soi gương ở DIII, aVF là chìa khóa phân biệt với viêm màng ngoài tim.",
      pitfallToAvoid: "Không được nhầm ST chênh lên lồi của STEMI với ST chênh lên lõm của viêm màng ngoài tim. Khi có hình ảnh soi gương ở chuyển đạo đối diện, 99% là hội chứng vành cấp.",
    },
  },
  {
    id: "case-stemi-inferior",
    category: "Ischemia",
    title: "NMCT Cấp Thành Dưới (Acute Inferior STEMI)",
    subtitle: "Tắc động mạch vành phải (RCA) - Chú ý nguy cơ nhồi máu thất phải đi kèm",
    severity: "Khẩn cấp",
    patient: {
      name: "Nguyễn Thị Mai",
      age: 64,
      gender: "Nữ",
      chiefComplaint: "Đau tức vùng thượng vị và sau xương ức, vã mồ hôi, nôn mửa, huyết áp tụt",
      clinicalHistory: "Bệnh nhân khởi phát đau thượng vị âm ỉ sau đó tức nghẹn ngực lan lên cổ. Gia đình ban đầu nghĩ là đau dạ dày. Khi vào viện bệnh nhân lơ mơ nhẹ, huyết áp tụt 85/50 mmHg, tĩnh mạch cổ nổi.",
      vitals: { bp: "85/50", hr: 52, spo2: 96, temp: 37.0 },
      labs: { k: 4.0, ca: 2.2, mg: 0.85, troponinI: "3.1 ng/mL", ckmb: "62 U/L" },
    },
    metrics: {
      heartRate: 52,
      rhythmType: "Nhịp xoang chậm kèm ngoại tâm thu nhĩ",
      regularity: "Đều",
      axis: "Trục lệch phải",
      alphaAngle: 105,
      prInterval: 190,
      qrsDuration: 85,
      qt: 430,
      qtc: 400,
    },
    leadsData: (() => {
      const leads = cloneNormalLeads();
      // ST elevation in DII, DIII, aVF (DIII > DII => RCA)
      leads["II"].stSegment = { elevation: 0.3, slope: "coved" };
      leads["II"].tWave = { amp: 0.5, dur: 0.18, shape: "hyperacute" };

      leads["III"].qWave = { amp: -0.3, dur: 0.04 };
      leads["III"].rWave = { amp: 0.6, dur: 0.03 };
      leads["III"].stSegment = { elevation: 0.45, slope: "coved" }; // DIII > DII
      leads["III"].tWave = { amp: 0.6, dur: 0.2, shape: "hyperacute" };

      leads["aVF"].qWave = { amp: -0.2, dur: 0.03 };
      leads["aVF"].stSegment = { elevation: 0.35, slope: "coved" };
      leads["aVF"].tWave = { amp: 0.45, dur: 0.18, shape: "hyperacute" };

      // Reciprocal ST depression in DI, aVL
      leads["I"].stSegment = { elevation: -0.2, slope: "downsloping" };
      leads["I"].tWave = { amp: -0.25, dur: 0.16, shape: "inverted" };

      leads["aVL"].stSegment = { elevation: -0.3, slope: "downsloping" };
      leads["aVL"].tWave = { amp: -0.3, dur: 0.16, shape: "inverted" };
      return leads;
    })(),
    leadsSummary: {
      limbLeadsSummary: "ST chênh lên dạng vòm lồi ở DII (0.3mV), DIII (0.45mV) và aVF (0.35mV). ST chênh lên ở DIII lớn hơn DII. ST chênh xuống đối ứng rất rõ ở aVL (-0.3mV) và DI.",
      chestLeadsSummary: "Chuyển đạo trước tim V1-V6 không có ST chênh lên. Cần đo thêm V3R, V4R khảo sát thất phải và V7-V9 thành sau.",
    },
    diagnosis: {
      primary: "Nhồi máu cơ tim cấp có ST chênh lên thành dưới (Inferior STEMI) kèm nghi ngờ tổn thương thất phải",
      culpritVesselOrCause: "Động mạch vành phải (RCA - Right Coronary Artery), ST chênh DIII > DII chỉ điểm RCA vượt trội",
      differentials: [
        "Tắc ĐM mũ trái (LCx) - loại trừ vì tổn thương LCx thường ST chênh ở DII > DIII và có ST chênh lên ở V5, V6, DI, aVL",
        "Viêm cơ tim cấp",
        "Thuyên tắc phổi",
      ],
      keyFindings: [
        "ST chênh lên ở DII, DIII, aVF",
        "Mức độ chênh DIII > DII kết hợp ST chênh xuống ở DI, aVL",
        "Nhịp chậm xoang (52 l/p) do thiếu máu nuôi nút xoang/nút nhĩ thất từ nhánh của RCA",
      ],
      clinicalNote: "Bệnh nhân có huyết áp tụt (85/50) và tĩnh mạch cổ nổi. Chống chỉ định tuyệt đối dùng Nitrate và lợi tiểu vì sẽ làm giảm tiền tải trầm trọng gây tụt HA không hồi phục!",
      treatment: [
        "Đo ngay chuyển đạo thất phải V3R, V4R và chuyển đạo thành sau V7, V8, V9.",
        "Kích hoạt can thiệp mạch vành cấp cứu PCI đặt stent RCA.",
        "Truyền dịch muối đẳng trương (NaCl 0.9%) để nâng tiền tải thất phải, nâng HA.",
        "Tránh tuyệt đối Nitroglycerin, Morphine liều cao, lợi tiểu và thuốc ức chế beta lúc này.",
        "Sẵn sàng Atropine hoặc máy tạo nhịp tạm thời nếu xuất hiện Bloc AV cao độ.",
      ],
      confidence: { primary: 97.5, secondaryName: "STEMI thành dưới kèm thất phải", secondaryConfidence: 2.0 },
    },
    learningNotes: {
      chapterRef: "Chương 8: Bệnh mạch vành (Trang 44, 48-49)",
      coreTakeaway: "ĐM vành phải (RCA) cung cấp 80% máu cho thành dưới. Nếu ST chênh DIII > DII kèm ST chênh xuống DI, aVL -> 90% do RCA. Luôn đo V3R, V4R tìm nhồi máu thất phải.",
      pitfallToAvoid: "Người già đau thượng vị kèm tụt HA phải lập tức đo ECG loại trừ NMCT thành dưới. Không cho nhầm thuốc dạ dày hoặc cho Nitrate hạ HA.",
    },
  },
  {
    id: "case-complete-av-block",
    category: "Conduction",
    title: "Bloc Nhĩ - Thất Hoàn Toàn Độ III (Complete 3rd Degree AV Block)",
    subtitle: "Phân ly nhĩ thất hoàn toàn - Nhịp thoát thất chậm 34 lần/phút",
    severity: "Nguy kịch",
    patient: {
      name: "Lê Văn Hùng",
      age: 76,
      gender: "Nam",
      chiefComplaint: "Ngất tái diễn, choáng váng đột ngột, mạch đập rất chậm",
      clinicalHistory: "Bệnh nhân 76 tuổi có 2 cơn ngất đột ngột kiểu Stokes-Adams trong 24 giờ qua. Khi ngất mặt tái nhợt, ngã ra sàn khoảng 20 giây rồi tỉnh lại, không yếu liệt thần kinh khu trú.",
      vitals: { bp: "160/60", hr: 34, spo2: 97, temp: 36.5 },
      labs: { k: 4.3, ca: 2.25, mg: 0.95, troponinI: "0.02 ng/mL (bình thường)" },
    },
    metrics: {
      heartRate: 34,
      rhythmType: "Bloc nhĩ thất độ III (Phân ly nhĩ thất hoàn toàn)",
      regularity: "Đều",
      axis: "Trục lệch trái",
      alphaAngle: -45,
      prInterval: 0, // Không cố định
      qrsDuration: 135, // QRS rộng do nhịp thoát thất
      qt: 520,
      qtc: 390,
    },
    leadsData: (() => {
      const leads = cloneNormalLeads();
      // In 3rd degree AV block, P waves march independently at ~75 bpm, QRS escape at ~34 bpm
      for (const k of Object.keys(leads) as LeadName[]) {
        leads[k].pWave = { amp: 0.22, dur: 0.09, shape: "normal" };
        leads[k].prSegment = { dur: 0.2 };
        leads[k].qrsDuration = 0.14;
        leads[k].rWave = { amp: leads[k].rWave.amp * 1.2, dur: 0.08, notched: true };
        leads[k].sWave = { amp: leads[k].sWave.amp * 1.3, dur: 0.06 };
        leads[k].stSegment = { elevation: -0.05, slope: "downsloping" };
      }
      return leads;
    })(),
    leadsSummary: {
      limbLeadsSummary: "Sóng P đi đều đặn với tần số nhĩ ~75 l/p. Phức bộ QRS đi đều đặn với tần số thất ~34 l/p. Không có sự liên hệ giữa sóng P và QRS (khoảng PR biến thiên liên tục, thỉnh thoảng P đè lên QRS hoặc T).",
      chestLeadsSummary: "Phức bộ QRS dãn rộng >0.12s (135ms), hình thái dị dạng kiểu nhịp thoát tự thất (idioventricular escape rhythm).",
    },
    diagnosis: {
      primary: "Bloc Nhĩ - Thất hoàn toàn độ III (Third-Degree Atrioventricular Block) với nhịp thoát thất chậm",
      culpritVesselOrCause: "Thoái hóa hệ thống dẫn truyền (Bệnh Lenegre / Lev) hoặc thiếu máu nuôi nút AV",
      differentials: [
        "Bloc nhĩ thất độ II Mobitz 2 dẫn truyền 2:1 hoặc 3:1 (ở đây P và QRS phân ly hoàn toàn độc lập)",
        "Nhịp chậm xoang nặng",
        "Ngộ độc thuốc chẹn beta / chẹn calci",
      ],
      keyFindings: [
        "Phân ly nhĩ thất hoàn toàn (AV dissociation): Nhĩ đập theo nhịp xoang 75 l/p, Thất đập theo nhịp tự thất 34 l/p",
        "Khoảng P-P đều nhau, khoảng R-R đều nhau nhưng không có mối tương quan",
        "Khoảng PR hoàn toàn ngẫu nhiên và biến thiên",
        "QRS dãn rộng >0.12s do ổ phát nhịp nằm dưới chỗ phân chia bó His trong tâm thất",
      ],
      clinicalNote: "Nguy cơ ngừng tim vô tâm thu (asystole) hoặc khởi phát rung thất/xoắn đỉnh rất cao. Hội chứng Adams-Stokes là chỉ định đặt máy tạo nhịp tim cấp cứu!",
      treatment: [
        "Đặt máy tạo nhịp tạm thời qua da (Transcutaneous pacing) hoặc qua tĩnh mạch (Transvenous pacing) ngay lập tức.",
        "Dùng Isoproterenol hoặc Adrenaline truyền tĩnh mạch duy trì nếu chưa kịp đặt máy tạo nhịp.",
        "Atropine 0.5 - 1mg TM có thể thử nhưng thường ít đáp ứng khi tổn thương dưới nút AV.",
        "Chỉ định cấy máy tạo nhịp vĩnh viễn (Permanent Pacemaker - DDD/VVI).",
      ],
      confidence: { primary: 99.1, secondaryName: "Bloc AV cao độ", secondaryConfidence: 0.8 },
    },
    learningNotes: {
      chapterRef: "Chương 10: Rối loạn nhịp tim (Trang 62, 82, 114)",
      coreTakeaway: "Trong BAV độ III: P và QRS có nhịp riêng rẽ. Tần số nhĩ 70-80 l/p, tần số thất 30-40 l/p. Dùng compa đo khoảng PP và RR sẽ thấy 2 nhịp hoàn toàn độc lập.",
      pitfallToAvoid: "Cần tìm kỹ sóng P lẫn vào đoạn ST hoặc sóng T bằng cách dùng thước compa gióng đều khoảng P-P.",
    },
  },
  {
    id: "case-afib-rvr",
    category: "Arrhythmia",
    title: "Rung Nhĩ Đáp Ứng Thất Nhanh (Atrial Fibrillation with RVR)",
    subtitle: "Tần số thất 148 l/p, hoàn toàn không đều - Nguy cơ tắc mạch huyết khối",
    severity: "Cảnh giác cao",
    patient: {
      name: "Hoàng Văn Tuấn",
      age: 62,
      gender: "Nam",
      chiefComplaint: "Hồi hộp đánh trống ngực dồn dập, khó thở khi gắng sức, hụt hơi",
      clinicalHistory: "Bệnh nhân có tiền sử THA 10 năm, hẹp van 2 lá nhẹ. Khoảng 4 giờ trước thấy tim đập loạn xạ trong lồng ngực, cảm giác như tim nhảy múa, hoa mắt nhẹ. Bắt mạch thấy nhịp đập lúc nhanh lúc chậm, cường độ mạch không đều.",
      vitals: { bp: "135/85", hr: 148, spo2: 96, temp: 36.6 },
      labs: { k: 4.2, ca: 2.3, mg: 0.9, troponinI: "0.03 ng/mL", bnp: "320 pg/mL" },
    },
    metrics: {
      heartRate: 148,
      rhythmType: "Rung nhĩ (Atrial Fibrillation)",
      regularity: "Loạn nhịp hoàn toàn",
      axis: "Trục trung gian",
      alphaAngle: 30,
      prInterval: 0, // Không có sóng P
      qrsDuration: 85,
      qt: 320,
      qtc: 480,
    },
    leadsData: (() => {
      const leads = cloneNormalLeads();
      for (const k of Object.keys(leads) as LeadName[]) {
        // Flat or fibrillatory f waves, no P wave
        leads[k].pWave = { amp: 0.03, dur: 0.05, shape: "flat" };
        leads[k].stSegment = { elevation: -0.05, slope: "downsloping" };
      }
      // Lead V1 shows clear fine fibrillatory f waves
      leads["V1"].pWave = { amp: 0.06, dur: 0.04, shape: "biphasic" };
      return leads;
    })(),
    leadsSummary: {
      limbLeadsSummary: "Khoảng R-R hoàn toàn không đều. Mất hoàn toàn sóng P của nhịp xoang, thay bằng các sóng f lăn tăn không đều về biên độ và hình dạng.",
      chestLeadsSummary: "Phức bộ QRS hẹp (<0.12s). Nhịp thất dao động từ 130 - 165 l/p (trung bình 148 l/p). Quan sát sóng f rõ nhất ở V1.",
    },
    diagnosis: {
      primary: "Rung nhĩ kịch phát có đáp ứng thất nhanh (Atrial Fibrillation with Rapid Ventricular Response)",
      culpritVesselOrCause: "Vòng vi vào lại đa ổ trong buồng tâm nhĩ, thường khởi phát từ các tĩnh mạch phổi",
      differentials: [
        "Cuồng nhĩ với dẫn truyền nhĩ thất thay đổi (loại trừ vì cuồng nhĩ có sóng răng cưa F đều đặn ở DII, DIII, aVF)",
        "Nhịp nhanh xoang có nhiều ngoại tâm thu nhĩ",
        "Nhịp nhanh nhĩ đa ổ (MAT)",
      ],
      keyFindings: [
        "Nhịp thất hoàn toàn không đều (khoảng RR biến thiên bất quy tắc)",
        "Mất sóng P, thay bằng sóng f lăn tăn tần số 350-600 l/p",
        "Phức bộ QRS thanh mảnh bình thường (<0.12s)",
        "Đáp ứng thất nhanh trung bình >100 l/p (ở đây là 148 l/p)",
      ],
      clinicalNote: "Rung nhĩ làm tăng nguy cơ tai biến mạch máu não do huyết khối buồng tim lên gấp 5 lần. Cần tính thang điểm CHA2DS2-VASc để chỉ định kháng đông.",
      treatment: [
        "Kiểm soát tần số thất: Thuốc chẹn beta giao cảm (Metoprolol/Bisoprolol) hoặc chẹn kênh calci Diltiazem truyền TM.",
        "Đánh giá nguy cơ tắc mạch theo thang điểm CHA2DS2-VASc và nguy cơ chảy máu HAS-BLED.",
        "Kháng đông đường uống (NOAC/DOAC như Apixaban, Rivaroxaban hoặc Dabigatran).",
        "Cân nhắc chuyển nhịp (bằng sốc điện đồng bộ hoặc thuốc Amiodarone/Flecainide) nếu thời gian khởi phát <48h hoặc sau khi siêu âm tim qua thực quản (TEE) loại trừ huyết khối tiểu nhĩ trái.",
      ],
      confidence: { primary: 99.4, secondaryName: "Cuồng nhĩ dẫn truyền thay đổi", secondaryConfidence: 0.5 },
    },
    learningNotes: {
      chapterRef: "Chương 10: Rối loạn nhịp tim (Trang 65-66)",
      coreTakeaway: "Rung nhĩ đặc trưng bởi tam chứng: 1. Khoảng R-R hoàn toàn không đều; 2. Mất sóng P; 3. Xuất hiện sóng f lăn tăn tần số 350-600 chu kỳ/phút rõ ở V1, V2, DII.",
      pitfallToAvoid: "Đừng nhầm sóng f lăn tăn lớn ở V1 với sóng F răng cưa của cuồng nhĩ. Cuồng nhĩ có đường đẳng điện răng cưa liên tục cực kỳ đều đặn ở DII, DIII, aVF.",
    },
  },
  {
    id: "case-wpw-syndrome",
    category: "Arrhythmia",
    title: "Hội Chứng Wolff - Parkinson - White (WPW Type A)",
    subtitle: "Đường dẫn truyền phụ Bó Kent nhĩ thất trái - Sóng Delta dương ở V1",
    severity: "Cảnh giác cao",
    patient: {
      name: "Đỗ Minh Khang",
      age: 23,
      gender: "Nam",
      chiefComplaint: "Cơn hồi hộp tim đập nhanh kịch phát, cảm giác hẫng ngực khi chơi thể thao",
      clinicalHistory: "Bệnh nhân nam 23 tuổi, sinh viên đại học. Thỉnh thoảng có cơn tim đập thình thịch 180-200 l/p khởi phát đột ngột và kết thúc đột ngột sau vài phút. Không đau ngực, không ngất. Đi khám sức khỏe tình cờ phát hiện điện tim bất thường.",
      vitals: { bp: "120/75", hr: 78, spo2: 99, temp: 36.6 },
      labs: { k: 4.1, ca: 2.3, mg: 0.9, troponinI: "Âm tính" },
    },
    metrics: {
      heartRate: 78,
      rhythmType: "Nhịp xoang kèm tiền kích thích thất (WPW)",
      regularity: "Đều",
      axis: "Trục trung gian",
      alphaAngle: 30,
      prInterval: 95, // PR ngắn < 120ms
      qrsDuration: 130, // QRS dãn rộng do sóng delta
      qt: 400,
      qtc: 440,
    },
    leadsData: (() => {
      const leads = cloneNormalLeads();
      // WPW Type A: accessory pathway left side, positive delta in V1-V6
      for (const k of Object.keys(leads) as LeadName[]) {
        leads[k].prSegment = { dur: 0.01 }; // Short PR
        leads[k].pWave = { amp: 0.12, dur: 0.08, shape: "normal" };
      }
      // V1: tall R with positive Delta
      leads["V1"].rWave = { amp: 1.4, dur: 0.07, notched: true };
      leads["V1"].sWave = { amp: -0.2, dur: 0.02 };
      leads["V1"].stSegment = { elevation: -0.1, slope: "downsloping" };
      leads["V1"].tWave = { amp: -0.2, dur: 0.16, shape: "inverted" };

      // V2-V6 positive Delta
      leads["V2"].rWave = { amp: 2.2, dur: 0.08, notched: true };
      leads["V5"].rWave = { amp: 2.4, dur: 0.08, notched: true };
      leads["I"].rWave = { amp: 1.5, dur: 0.07, notched: true };
      leads["II"].rWave = { amp: 1.8, dur: 0.07, notched: true };
      return leads;
    })(),
    leadsSummary: {
      limbLeadsSummary: "Khoảng PR ngắn rõ rệt <0.12s (95ms). Phức bộ QRS dãn rộng (130ms) với phần khởi đầu thoai thoải của sóng Delta.",
      chestLeadsSummary: "Sóng Delta dương nổi bật ở tất cả các chuyển đạo trước tim V1-V6. Sóng R cao ưu thế ở V1 (Type A, cầu nối Kent nằm bên tim trái). Biến đổi ST-T thứ phát trái chiều với QRS.",
    },
    diagnosis: {
      primary: "Hội chứng tiền kích thích Wolff - Parkinson - White (WPW Type A)",
      culpritVesselOrCause: "Cầu nối dẫn truyền phụ nhĩ thất (Bó Kent - Bundle of Kent) nằm ở tim trái",
      differentials: [
        "Hội chứng Lown-Ganong-Levine (LGL) - loại trừ vì LGL có PR ngắn nhưng QRS hẹp bình thường và không có sóng Delta",
        "Bloc nhánh phải (RBBB) - loại trừ vì RBBB có PR bình thường và có dạng rsR' chữ M",
        "Phì đại thất phải (RVH)",
      ],
      keyFindings: [
        "Khoảng PR ngắn < 0.12 giây (0.095s)",
        "Sóng Delta thoai thoải ở sườn lên phức bộ QRS",
        "Phức bộ QRS dãn rộng ≥ 0.12 giây",
        "Sóng R trội và Delta dương tại V1 (Type A)",
        "Thay đổi tái cực ST-T thứ phát ngược chiều sóng delta",
      ],
      clinicalNote: "Nếu bệnh nhân WPW bị rung nhĩ (AF + WPW), xung động có thể dẫn truyền cực nhanh qua cầu Kent xuống thất (>250-300 l/p) gây thoái triển thành Rung thất (VF) đột tử!",
      treatment: [
        "Phương pháp triệt để: Thăm dò điện sinh lý tim (EPS) và triệt đốt đường dẫn truyền phụ qua ống thông bằng sóng cao tần (RF Catheter Ablation).",
        "Nếu xuất hiện cơn nhịp nhanh vào lại nhĩ thất (AVRT) QRS hẹp: nghiệm pháp kích thích phế vị (Valsalva, xoa xoang cảnh) hoặc Adenosine TM nhanh.",
        "CẢNH BÁO QUAN TRỌNG: Chống chỉ định dùng Digoxin, Verapamil, Diltiazem nếu có Rung nhĩ kèm WPW vì các thuốc này ức chế nút AV làm dồn xung động qua bó Kent gây rung thất.",
      ],
      confidence: { primary: 98.7, secondaryName: "WPW Type B", secondaryConfidence: 1.0 },
    },
    learningNotes: {
      chapterRef: "Chương 6: Hội chứng kích thích sớm (Trang 30-31)",
      coreTakeaway: "Tam chứng WPW: 1. PR ngắn < 0.12s; 2. Sóng Delta; 3. QRS dãn rộng > 0.11s. Type A: Delta dương ở V1 (cầu Kent bên trái); Type B: Delta âm ở V1 (cầu Kent bên phải).",
      pitfallToAvoid: "Sóng delta âm ở chuyển đạo dưới hoặc thành trước dễ bị đọc nhầm thành sóng Q hoại tử của nhồi máu cơ tim (hình ảnh giả nhồi máu). Luôn kiểm tra khoảng PR!",
    },
  },
  {
    id: "case-ventricular-tachycardia",
    category: "Arrhythmia",
    title: "Cơn Nhịp Nhanh Thất (Ventricular Tachycardia - VT)",
    subtitle: "Áp dụng Thuật toán Brugada phân biệt Nhịp Nhanh Thất với SVT QRS Rộng",
    severity: "Khẩn cấp",
    patient: {
      name: "Phạm Quốc Dũng",
      age: 67,
      gender: "Nam",
      chiefComplaint: "Hồi hộp dữ dội, tức ngực, choáng ngất, vã mồ hôi sau nhồi máu cơ tim cũ",
      clinicalHistory: "Bệnh nhân có tiền sử NMCT thành trước rộng 3 năm trước, EF 35%. Đang sinh hoạt bình thường thì đột ngột xuất hiện cơn tim đập như trống trận, choáng váng muốn xỉu, vã mồ hôi đầm đìa.",
      vitals: { bp: "90/55", hr: 175, spo2: 92, temp: 36.7 },
      labs: { k: 3.8, ca: 2.2, mg: 0.8, troponinI: "0.15 ng/mL" },
    },
    metrics: {
      heartRate: 175,
      rhythmType: "Nhịp nhanh thất đơn dạng (Monomorphic VT)",
      regularity: "Đều",
      axis: "Trục vô định (Northwest Axis)",
      alphaAngle: -150,
      prInterval: 0,
      qrsDuration: 165, // QRS rất rộng
      qt: 340,
      qtc: 540,
    },
    leadsData: (() => {
      const leads = cloneNormalLeads();
      // Broad monomorphic VT complexes, concordance in chest leads
      for (const k of Object.keys(leads) as LeadName[]) {
        leads[k].pWave = { amp: 0, dur: 0.01 };
        leads[k].qrsDuration = 0.165;
        leads[k].stSegment = { elevation: -0.15, slope: "downsloping" };
      }
      // V1-V6 negative concordance (predominantly QS or broad S)
      leads["V1"].rWave = { amp: 0.2, dur: 0.04 };
      leads["V1"].sWave = { amp: -2.0, dur: 0.12, wide: true };
      leads["V1"].tWave = { amp: 0.5, dur: 0.16, shape: "peaked" };

      leads["V2"].sWave = { amp: -2.4, dur: 0.12, wide: true };
      leads["V3"].sWave = { amp: -2.2, dur: 0.12, wide: true };
      leads["V4"].sWave = { amp: -2.0, dur: 0.12, wide: true };
      leads["V5"].sWave = { amp: -1.8, dur: 0.12, wide: true };
      leads["V6"].sWave = { amp: -1.6, dur: 0.12, wide: true };

      leads["I"].rWave = { amp: 0.2, dur: 0.03 };
      leads["I"].sWave = { amp: -1.4, dur: 0.12 };
      leads["aVR"].rWave = { amp: 1.5, dur: 0.08 }; // tall R in aVR
      return leads;
    })(),
    leadsSummary: {
      limbLeadsSummary: "Nhịp nhanh đều 175 l/p, QRS dãn rộng dị dạng 165ms. Trục điện tim vô định (cực Tây Bắc, R ưu thế ở aVR). Có dấu hiệu phân ly nhĩ thất thoáng qua.",
      chestLeadsSummary: "Đồng dạng âm (Negative Concordance) trên toàn bộ chuyển đạo trước tim V1-V6 (không có dạng RS). Dấu hiệu Brugada dương tính tuyệt đối.",
    },
    diagnosis: {
      primary: "Cơn nhịp nhanh thất đơn dạng (Monomorphic Ventricular Tachycardia) - Brugada (+)",
      culpritVesselOrCause: "Vòng vào lại quanh mô sẹo nhồi máu cơ tim cũ thất trái",
      differentials: [
        "Nhịp nhanh trên thất (SVT) kèm dẫn truyền lệch hướng hoặc bloc nhánh có sẵn",
        "Nhịp nhanh qua đường dẫn truyền phụ ngược chiều (Antidromic AVRT)",
      ],
      keyFindings: [
        "Thuật toán Brugada Bước 1: Vắng mặt hoàn toàn dạng RS ở các chuyển đạo trước tim V1-V6 (Độ đặc hiệu 100% cho VT)",
        "Đồng dạng âm (Negative concordance) từ V1 đến V6",
        "Độ rộng QRS > 0.16s (165ms)",
        "Sóng R cao đơn độc ở aVR",
        "Trục vô định (-150°)",
      ],
      clinicalNote: "Huyết áp bệnh nhân 90/55 mmHg, có dấu hiệu giảm tưới máu não (choáng váng). Đây là tình huống đe dọa ngừng tuần hoàn chuyển sang rung thất!",
      treatment: [
        "Nếu có rối loạn huyết động (tụt HA, đau ngực, lơ mơ, phù phổi): SỐC ĐIỆN ĐỒNG BỘ NGAY LẬP TỨC (Synchronized Cardioversion 100J - 200J).",
        "Nếu huyết động còn tạm ổn định: Amiodarone 150mg tiêm tĩnh mạch trong 10 phút, sau đó truyền duy trì 1mg/phút trong 6 giờ.",
        "Tránh tuyệt đối Adenosine, Verapamil, Diltiazem vì có thể gây tụt HA trụy mạch tử vong nếu nhầm VT thành SVT.",
        "Sau khi cắt cơn: Đặt máy phá rung tự động cấy được (ICD) dự phòng đột tử do tim.",
      ],
      confidence: { primary: 98.9, secondaryName: "SVT dẫn truyền lệch hướng", secondaryConfidence: 1.0 },
    },
    learningNotes: {
      chapterRef: "Chương 10: Rối loạn nhịp nhanh QRS rộng & Tiêu chuẩn Brugada (Trang 69-74, 90-93)",
      coreTakeaway: "4 bước thuật toán Brugada: 1. Có dạng RS ở V1-V6 không? (Không -> VT); 2. Khoảng RS > 100ms? (Có -> VT); 3. Có phân ly nhĩ thất? (Có -> VT); 4. Tiêu chuẩn hình thái học ở V1 & V6.",
      pitfallToAvoid: "Mọi cơn nhịp nhanh QRS rộng ở bệnh nhân lớn tuổi có tiền sử bệnh tim đều phải coi là Nhịp nhanh thất cho đến khi có bằng chứng ngược lại.",
    },
  },
  {
    id: "case-hyperkalemia",
    category: "Electrolyte",
    title: "Cấp Cứu Tăng Kali Máu Nặng (Severe Hyperkalemia - K+ 7.8 mEq/L)",
    subtitle: "Sóng T cao nhọn đối xứng hẹp, mất sóng P, QRS dãn rộng hình sin",
    severity: "Nguy kịch",
    patient: {
      name: "Nguyễn Văn Chánh",
      age: 55,
      gender: "Nam",
      chiefComplaint: "Yếu liệt tứ chi tăng dần, khó thở, nói khó, buồn nôn",
      clinicalHistory: "Bệnh nhân có tiền sử bệnh thận mạn giai đoạn cuối (CKD stage 5) đang lọc máu chu kỳ, bỏ lỡ 2 buổi chạy thận do bận việc gia đình. Xuất hiện cảm giác tê bì quanh miệng rồi yếu dần hai chân và hai tay.",
      vitals: { bp: "100/60", hr: 48, spo2: 93, temp: 36.4 },
      labs: { k: 7.8, ca: 1.9, mg: 1.2, troponinI: "0.04 ng/mL", bnp: "450 pg/mL" },
    },
    metrics: {
      heartRate: 48,
      rhythmType: "Nhịp xoang - thất chậm do tăng Kali máu (Sinoventricular rhythm)",
      regularity: "Đều",
      axis: "Trục lệch trái",
      alphaAngle: -40,
      prInterval: 240,
      qrsDuration: 145, // QRS dãn rộng nguy hiểm
      qt: 450,
      qtc: 400,
    },
    leadsData: (() => {
      const leads = cloneNormalLeads();
      for (const k of Object.keys(leads) as LeadName[]) {
        // P waves flattened or absent
        leads[k].pWave = { amp: 0.02, dur: 0.06, shape: "flat" };
        leads[k].prSegment = { dur: 0.12 };
        // QRS widened
        leads[k].qrsDuration = 0.145;
        leads[k].rWave = { amp: leads[k].rWave.amp * 0.8, dur: 0.08, notched: true };
        leads[k].sWave = { amp: leads[k].sWave.amp * 1.4, dur: 0.06 };
        // Tall, peaked, tented, narrow-base T waves (characteristic!)
        leads[k].tWave = { amp: 1.1, dur: 0.14, shape: "peaked" };
      }
      // V2-V4 show massive peaked T waves
      leads["V2"].tWave = { amp: 1.8, dur: 0.14, shape: "peaked" };
      leads["V3"].tWave = { amp: 2.0, dur: 0.14, shape: "peaked" };
      leads["V4"].tWave = { amp: 1.6, dur: 0.14, shape: "peaked" };
      return leads;
    })(),
    leadsSummary: {
      limbLeadsSummary: "Sóng P xẹp gần như biến mất hoàn toàn. Phức bộ QRS dãn rộng dị dạng 145ms. Sóng T cao nhọn đối xứng ở các chuyển đạo chi.",
      chestLeadsSummary: "Sóng T khổng lồ, cao nhọn, đáy hẹp hình lều (tented / peaked T waves) rõ nhất ở V2-V4 (đạt 2.0mV). QRS hòa lẫn vào sóng T tạo xu hướng sóng hình sin (Sine wave pattern) đe dọa ngừng tim.",
    },
    diagnosis: {
      primary: "Rối loạn điện giải: Tăng Kali máu nặng đe dọa tính mạng (Severe Hyperkalemia)",
      culpritVesselOrCause: "Suy giảm bài tiết kali qua thận ở bệnh nhân suy thận mạn bỏ chạy thận chu kỳ",
      differentials: [
        "Nhồi máu cơ tim tối cấp với sóng T khổng lồ (loại trừ vì T trong NMCT có đáy rộng, không đối xứng và có ST chênh lồi khu trú theo vùng động mạch)",
        "Bloc nhánh trái (LBBB)",
        "Tái cực sớm lành tính",
      ],
      keyFindings: [
        "Sóng T cao, nhọn hoắt, đối xứng, đáy hẹp (peaked T) trên khắp các chuyển đạo, rõ nhất ở V2-V4",
        "Sóng P dẹt gần như biến mất (tê liệt cơ tâm nhĩ)",
        "Phức bộ QRS dãn rộng >0.12s",
        "Tiến triển dạng sóng hình sin báo trước rung thất hoặc vô tâm thu",
      ],
      clinicalNote: "Kali 7.8 mEq/L là cấp cứu khẩn cấp bậc một trong y khoa! Bệnh nhân có thể ngừng tim đột ngột trong vài phút nếu không ổn định màng tế bào cơ tim.",
      treatment: [
        "Bước 1 (Ổn định màng cơ tim ngay): Calcium Gluconate 10% 10-20ml hoặc Calcium Chloride tiêm TM chậm trong 3-5 phút (tác dụng bảo vệ tim trong 30-60 phút).",
        "Bước 2 (Chuyển dịch Kali vào nội bào): Truyền dung dịch Glucose 20% + Insulin Regular 10 UI tĩnh mạch; Khí dung Salbutamol 10-20mg; Natri Bicarbonate 8.4% nếu có toan máu.",
        "Bước 3 (Thải trừ Kali khỏi cơ thể): Thuốc lợi tiểu quai Furosemide liều cao (nếu thận còn bài niệu), Resonium hoặc Lokelma qua đường tiêu hóa.",
        "Bước 4: Chỉ định CHẠY THẬN NHÂN TẠO CẤP CỨU (Emergency Hemodialysis) để lọc bỏ kali.",
      ],
      confidence: { primary: 99.6, secondaryName: "NMCT tối cấp", secondaryConfidence: 0.3 },
    },
    learningNotes: {
      chapterRef: "Chương 12: Rối loạn điện giải - Tăng kali máu (Trang 89-90, 94)",
      coreTakeaway: "Các giai đoạn biến thiên ECG khi Kali tăng: 1. K+ 5.5-6.5: T cao nhọn đối xứng hẹp; 2. K+ 6.5-7.0: PR kéo dài, P dẹt, ST chênh xuống; 3. K+ 7.0-9.0: Mất sóng P, QRS dãn rộng; 4. K+ >9.0: Sóng hình sin -> Ngừng tim.",
      pitfallToAvoid: "Tuyệt đối không đợi xét nghiệm máu về mới xử trí nếu ECG đã có sóng T nhọn hoắt kèm QRS dãn trên nền bệnh nhân suy thận. Tiêm Canxi ngay để bảo vệ tim!",
    },
  },
  {
    id: "case-acute-pericarditis",
    category: "Ischemia",
    title: "Viêm Màng Ngoài Tim Cấp (Acute Pericarditis Giai Đoạn 1)",
    subtitle: "ST chênh lên lõm lan tỏa kèm đoạn PR chênh xuống - Không có hình ảnh soi gương",
    severity: "Cảnh giác cao",
    patient: {
      name: "Vũ Hải Đăng",
      age: 32,
      gender: "Nam",
      chiefComplaint: "Đau ngực nhói sau xương ức tăng khi hít sâu, giảm đau rõ rệt khi ngồi cúi người ra trước",
      clinicalHistory: "Bệnh nhân nam trẻ tuổi, có đợt sốt nhẹ và viêm đường hô hấp trên 1 tuần trước. Xuất hiện đau nhói ngực sau xương ức 2 ngày nay, đau dữ dội khi nằm ngửa hoặc hít sâu, khi ngồi cúi gập người về phía trước thì thấy dễ chịu hơn.",
      vitals: { bp: "125/80", hr: 92, spo2: 98, temp: 37.8 },
      labs: { k: 4.2, ca: 2.3, mg: 0.9, troponinI: "0.08 ng/mL (tăng nhẹ)", ckmb: "18 U/L" },
    },
    metrics: {
      heartRate: 92,
      rhythmType: "Nhịp xoang đều",
      regularity: "Đều",
      axis: "Trục trung gian",
      alphaAngle: 50,
      prInterval: 170,
      qrsDuration: 85,
      qt: 370,
      qtc: 450,
    },
    leadsData: (() => {
      const leads = cloneNormalLeads();
      // Diffuse saddle-shaped (concave upward) ST elevation, PR depression in DI, DII, aVF, V2-V6
      const affectedLeads: LeadName[] = ["I", "II", "III", "aVF", "V2", "V3", "V4", "V5", "V6"];
      for (const l of affectedLeads) {
        leads[l].prSegment = { dur: 0.07, deviation: -0.08 }; // PR chênh xuống
        leads[l].stSegment = { elevation: 0.22, slope: "upsloping" }; // ST chênh lên dạng lõm (concave)
        leads[l].tWave = { amp: 0.4, dur: 0.16, shape: "normal" };
      }
      // aVR: PR elevation, ST depression
      leads["aVR"].prSegment = { dur: 0.07, deviation: 0.08 }; // PR chênh lên ở aVR
      leads["aVR"].stSegment = { elevation: -0.15, slope: "downsloping" }; // ST chênh xuống ở aVR
      return leads;
    })(),
    leadsSummary: {
      limbLeadsSummary: "ST chênh lên lõm (hình lòng chảo / đáy chén cong lên) lan tỏa ở DI, DII, DIII, aVF. Đoạn PR chênh xuống sâu ở DII. Chuyển đạo aVR có hình ảnh đối nghịch duy nhất: PR chênh lên và ST chênh xuống.",
      chestLeadsSummary: "ST chênh lên dạng lõm lan tỏa khắp các chuyển đạo V2-V6 (không khu trú theo vùng cấp máu động mạch vành). Không có sóng Q hoại tử.",
    },
    diagnosis: {
      primary: "Viêm màng ngoài tim cấp tính giai đoạn I (Acute Pericarditis Stage 1)",
      culpritVesselOrCause: "Phản ứng viêm màng ngoài tim do virus (Coxsackie, Echovirus, Adenovirus)",
      differentials: [
        "Nhồi máu cơ tim cấp (STEMI) - loại trừ vì ở đây ST chênh lõm lan tỏa không theo vùng động mạch vành, có PR chênh xuống và không có ST chênh xuống đối xứng soi gương",
        "Tái cực sớm lành tính (BER) - phân biệt bằng tỷ lệ ST/T ở V6 > 0.25 và có PR chênh xuống",
        "Bóc tách động mạch chủ ngực",
      ],
      keyFindings: [
        "ST chênh lên dạng lõm (concave upward / saddle-shaped) lan tỏa ở hầu hết các chuyển đạo",
        "Đoạn PR chênh xuống dưới đường đẳng điện (đặc biệt rõ ở DII, độ nhạy 88%)",
        "Chuyển đạo aVR có ST chênh xuống và PR chênh lên",
        "Vắng mặt hoàn toàn hình ảnh soi gương ở các chuyển đạo đối diện",
      ],
      clinicalNote: "Đặc điểm đau ngực cơ học thay đổi theo tư thế (tăng khi nằm, giảm khi ngồi cúi ra trước) kết hợp tiếng cọ màng tim trên lâm sàng là chìa khóa chẩn đoán.",
      treatment: [
        "Nghỉ ngơi tại giường, hạn chế vận động thể lực nặng.",
        "Kháng viêm không steroid (NSAIDs) liều cao: Ibuprofen 600mg x 3 lần/ngày hoặc Aspirin 750-1000mg x 3 lần/ngày trong 1-2 tuần.",
        "Phối hợp Colchicine 0.5mg x 1-2 lần/ngày trong 3 tháng để giảm tỷ lệ tái phát.",
        "Tránh dùng Corticosteroid trong đợt đầu trừ khi có chống chỉ định với NSAIDs hoặc viêm do bệnh tự miễn.",
        "Siêu âm tim theo dõi lượng dịch màng ngoài tim tránh biến chứng chèn ép tim cấp (Cardiac Tamponade).",
      ],
      confidence: { primary: 97.8, secondaryName: "Tái cực sớm lành tính", secondaryConfidence: 1.8 },
    },
    learningNotes: {
      chapterRef: "Chương 12: Viêm màng ngoài tim (Trang 98-99, 119)",
      coreTakeaway: "Viêm màng ngoài tim Giai đoạn I: ST chênh lên lõm lan tỏa + PR chênh xuống (DII, V2-V6) và PR chênh lên ở aVR. Tỷ lệ ST/T > 0.25 ở V6 gợi ý viêm màng tim, < 0.25 là tái cực sớm.",
      pitfallToAvoid: "Đừng nhầm ST chênh lên của viêm màng ngoài tim với STEMI mà cho thuốc tiêu sợi huyết (Thrombolysis) - cực kỳ nguy hiểm có thể gây xuất huyết tràn máu khoang màng tim!",
    },
  },
  {
    id: "case-pulmonary-embolism",
    category: "Conduction",
    title: "Thuyên Tắc Phổi Cấp (Acute Pulmonary Embolism - PE)",
    subtitle: "Dấu hiệu kinh điển McGinn-White S1Q3T3 - Tăng áp động mạch phổi cấp tính",
    severity: "Khẩn cấp",
    patient: {
      name: "Nguyễn Văn Hưng",
      age: 49,
      gender: "Nam",
      chiefComplaint: "Khó thở dữ dội đột ngột, đau ngực màng phổi bên phải, ho ra ít máu",
      clinicalHistory: "Bệnh nhân vừa trải qua phẫu thuật thay khớp háng 10 ngày trước, nằm bất động nhiều tại giường. Sáng nay khi cố gắng đứng dậy đi vệ sinh thì đột ngột khó thở dữ dội, thở nhanh nông, vã mồ hôi, tĩnh mạch cổ nổi rõ.",
      vitals: { bp: "95/60", hr: 122, spo2: 87, temp: 37.2 },
      labs: { k: 4.0, ca: 2.2, mg: 0.9, troponinI: "0.12 ng/mL (tăng nhẹ)", bnp: "480 pg/mL" },
    },
    metrics: {
      heartRate: 122,
      rhythmType: "Nhịp nhanh xoang",
      regularity: "Đều",
      axis: "Trục lệch phải",
      alphaAngle: 110,
      prInterval: 140,
      qrsDuration: 105,
      qt: 330,
      qtc: 470,
    },
    leadsData: (() => {
      const leads = cloneNormalLeads();
      // McGinn-White S1Q3T3 sign
      // Deep S wave in Lead I
      leads["I"].sWave = { amp: -0.85, dur: 0.04, wide: true };

      // Pathological Q and inverted T in Lead III
      leads["III"].qWave = { amp: -0.35, dur: 0.03 };
      leads["III"].rWave = { amp: 0.5, dur: 0.03 };
      leads["III"].tWave = { amp: -0.4, dur: 0.16, shape: "inverted" };

      // Inverted T waves in V1-V4 (Right ventricular strain pattern)
      leads["V1"].tWave = { amp: -0.35, dur: 0.16, shape: "inverted" };
      leads["V2"].tWave = { amp: -0.45, dur: 0.16, shape: "inverted" };
      leads["V3"].tWave = { amp: -0.35, dur: 0.16, shape: "inverted" };
      leads["V4"].tWave = { amp: -0.2, dur: 0.16, shape: "inverted" };

      // Incomplete RBBB pattern in V1
      leads["V1"].rPrimeWave = { amp: 0.4, dur: 0.04 };
      return leads;
    })(),
    leadsSummary: {
      limbLeadsSummary: "Nhịp nhanh xoang 122 l/p. Dấu hiệu kinh điển S1Q3T3: Sóng S sâu ở DI, sóng Q xuất hiện ở DIII kèm sóng T đảo ngược ở DIII. Trục QRS lệch phải (+110°).",
      chestLeadsSummary: "Dấu hiệu tăng gánh thất phải cấp (RV Strain): Sóng T âm đối xứng sâu ở V1-V4. Dạng bloc nhánh phải không hoàn toàn (rSR' ở V1). Vùng chuyển tiếp xoay sang trái.",
    },
    diagnosis: {
      primary: "Thuyên tắc động mạch phổi cấp tính mức độ nặng (Acute Massive/Submassive Pulmonary Embolism)",
      culpritVesselOrCause: "Cục huyết khối tĩnh mạch sâu chi dưới (DVT) di chuyển gây tắc nghẽn thân/nhánh động mạch phổi",
      differentials: [
        "Hội chứng vành cấp / NMCT thành dưới (ST ở DIII có Q và T âm nhưng DII, aVF không có ST chênh lên điển hình)",
        "Tràn khí màng phổi tự phát",
        "Đợt cấp COPD / Tâm phế cấp",
      ],
      keyFindings: [
        "Nhịp nhanh xoang (dấu hiệu phổ biến nhất của PE)",
        "Dấu hiệu S1Q3T3 (McGinn-White sign)",
        "Sóng T âm ở các chuyển đạo trước tim phải V1-V4 (RV Strain)",
        "Trục điện tim lệch phải và xuất hiện bloc nhánh phải mới xuất hiện",
      ],
      clinicalNote: "Thuyên tắc phổi là bệnh cảnh cấp cứu có tỷ lệ tử vong cao. Chụp cắt lớp vi tính mạch máu phổi (CTPA - CT Pulmonary Angiography) là tiêu chuẩn vàng chẩn đoán xác định.",
      treatment: [
        "Thở oxy lưu lượng cao qua mask, sẵn sàng hỗ trợ hô hấp.",
        "Kháng đông lập tức: Enoxaparin (LMWH) 1mg/kg mỗi 12 giờ hoặc Heparin không phân đoạn truyền tĩnh mạch.",
        "Nếu có tụt huyết áp (PE nguy cơ cao/sốc): Chỉ định tiêu sợi huyết toàn thân (Alteplase 100mg truyền trong 2 giờ) hoặc can thiệp lấy huyết khối qua catheter.",
        "Hồi sức dịch thận trọng, dùng thuốc vận mạch Noradrenaline nếu tụt HA.",
      ],
      confidence: { primary: 96.5, secondaryName: "Tâm phế cấp / RV Strain", secondaryConfidence: 2.8 },
    },
    learningNotes: {
      chapterRef: "Chương 12: Bệnh ở phổi - Thuyên tắc phổi (Trang 106, 126)",
      coreTakeaway: "Dấu hiệu S1Q3T3: Sóng S sâu ở DI, sóng Q ở DIII và sóng T âm ở DIII. T âm ở V1-V4 phản ánh buồng tim phải bị dãn và tăng áp lực cấp tính.",
      pitfallToAvoid: "Khoảng 20% bệnh nhân thuyên tắc phổi có ECG hoàn toàn bình thường. ECG bình thường không bao giờ loại trừ được thuyên tắc phổi nếu lâm sàng nghi ngờ cao.",
    },
  },
  {
    id: "case-digoxin-toxicity",
    category: "Electrolyte",
    title: "Ngộ Độc Thuốc Trợ Tim Digoxin (Digoxin Toxicity)",
    subtitle: "Đoạn ST chênh xuống hình đáy chén Salvador Dali, QT ngắn, ngoại tâm thu thất nhịp đôi",
    severity: "Cảnh giác cao",
    patient: {
      name: "Bùi Thị Sáu",
      age: 74,
      gender: "Nữ",
      chiefComplaint: "Buồn nôn, chán ăn, nhìn vật thấy có quầng sáng vàng xanh, mệt lả",
      clinicalHistory: "Bệnh nhân nữ 74 tuổi, suy tim mạn và rung nhĩ đang điều trị duy trì Digoxin 0.25mg/ngày kèm Furosemide. 3 ngày nay bệnh nhân ăn uống kém, mệt mỏi, mắt nhìn thấy hào quang màu vàng (xanthopsia), nôn ói nhiều lần.",
      vitals: { bp: "110/65", hr: 56, spo2: 97, temp: 36.5 },
      labs: { k: 3.1, ca: 2.4, mg: 0.75, troponinI: "0.01 ng/mL", bnp: "510 pg/mL" },
    },
    metrics: {
      heartRate: 56,
      rhythmType: "Rung nhĩ đáp ứng thất chậm kèm ngoại tâm thu thất (PVC) nhịp đôi",
      regularity: "Không đều có chu kỳ",
      axis: "Trục trung gian",
      alphaAngle: 45,
      prInterval: 0,
      qrsDuration: 90,
      qt: 320,
      qtc: 340, // QT ngắn
    },
    leadsData: (() => {
      const leads = cloneNormalLeads();
      // Characteristic "Salvador Dali mustache" / scooped ST depression
      const leadsScooped: LeadName[] = ["I", "II", "aVF", "V4", "V5", "V6"];
      for (const l of leadsScooped) {
        leads[l].stSegment = { elevation: -0.22, slope: "scooped" };
        leads[l].tWave = { amp: 0.15, dur: 0.12, shape: "biphasic" };
      }
      return leads;
    })(),
    leadsSummary: {
      limbLeadsSummary: "Đoạn ST chênh xuống lõm cong mềm mại hình đáy chén hay hình ria mép của danh họa Salvador Dali (scooped ST depression) ở DII, aVF. Khoảng QT ngắn.",
      chestLeadsSummary: "Hình ảnh đáy chén rất rõ ở V4-V6. Xuất hiện ngoại tâm thu thất nhịp đôi (Ventricular Bigeminy) xen kẽ nhịp cơ bản.",
    },
    diagnosis: {
      primary: "Ngộ độc thuốc tim mạch Digoxin trên nền hạ Kali máu (Digoxin Toxicity with Hypokalemia)",
      culpritVesselOrCause: "Quá liều tích lũy digoxin kết hợp giảm thanh thải thận và hạ Kali máu do thuốc lợi tiểu Furosemide",
      differentials: [
        "Thiếu máu cơ tim dưới nội tâm mạc (loại trừ vì ST trong thiếu máu thường chênh xuống dốc xuống hoặc nằm ngang, không có hình đáy chén cong mềm)",
        "Hạ kali máu đơn thuần (loại trừ vì ngộ độc digoxin có QT ngắn, hạ kali có QT/QU kéo dài)",
      ],
      keyFindings: [
        "ST chênh xuống hình đáy chén kinh điển (Salvador Dali's mustache) ở các chuyển đạo có R cao (DII, V4-V6)",
        "Rút ngắn khoảng QT",
        "Rối loạn nhịp phối hợp: Nhịp chậm kèm ngoại tâm thu thất nhịp đôi (Ventricular Bigeminy)",
        "Sóng T hai pha hoặc phẳng",
      ],
      clinicalNote: "Hạ Kali máu làm tăng gắn kết của Digoxin vào thụ thể Na+/K+-ATPase của cơ tim, biến liều điều trị thông thường thành liều gây độc chết người!",
      treatment: [
        "Ngừng ngay lập tức Digoxin và thuốc lợi tiểu làm mất kali.",
        "Bù Kali tích cực qua đường uống hoặc truyền tĩnh mạch để duy trì Kali máu từ 4.0 - 4.5 mEq/L.",
        "Bù Magne sulfate tĩnh mạch nếu có hạ Magne máu.",
        "Nếu có rối loạn nhịp thất đe dọa tính mạng hoặc tăng Kali cấp tính: dùng kháng thể đặc hiệu kháng Digoxin (Digoxin-specific Fab fragments / DigiFab).",
        "Tránh sốc điện chuyển nhịp trừ khi cực kỳ bắt buộc vì dễ gây rung thất trơ.",
      ],
      confidence: { primary: 98.1, secondaryName: "Thiếu máu cơ tim dưới nội mạc", secondaryConfidence: 1.5 },
    },
    learningNotes: {
      chapterRef: "Chương 12: Ngộ độc thuốc Digoxin (Trang 95, 115)",
      coreTakeaway: "Hình ảnh ST hình đáy chén chỉ ra hiệu lực của Digoxin; khi xuất hiện kèm ngoại tâm thu thất nhịp đôi, bloc nhĩ thất hoặc nhịp nhanh nhĩ dẫn truyền 2:1 là dấu hiệu ngộ độc Digoxin.",
      pitfallToAvoid: "Đừng nhầm hình ảnh đáy chén của Digoxin với thiếu máu cơ tim. Đáy chén cong võng mềm mại, trong khi thiếu máu cơ tim ST đi ngang hoặc dốc xuống thẳng tắp.",
    },
  },
  {
    id: "case-normal-ecg",
    category: "Normal",
    title: "Điện Tâm Đồ 12 Chuyển Đạo Bình Thường (Normal 12-Lead ECG)",
    subtitle: "Nhịp xoang đều 72 l/p, trục trung gian, các khoảng và đoạn chuẩn mực",
    severity: "Ổn định",
    patient: {
      name: "Nguyễn Thu Hương",
      age: 28,
      gender: "Nữ",
      chiefComplaint: "Khám sức khỏe định kỳ tiền hôn nhân, không có triệu chứng tim mạch",
      clinicalHistory: "Người trẻ khỏe mạnh, tập thể thao thường xuyên, không tiền sử bệnh lý tim mạch hay gia đình có người đột tử.",
      vitals: { bp: "115/75", hr: 72, spo2: 99, temp: 36.6 },
      labs: { k: 4.2, ca: 2.35, mg: 0.9, troponinI: "Âm tính" },
    },
    metrics: {
      heartRate: 72,
      rhythmType: "Nhịp xoang bình thường",
      regularity: "Đều",
      axis: "Trục trung gian",
      alphaAngle: 55,
      prInterval: 150,
      qrsDuration: 85,
      qt: 380,
      qtc: 416,
      sokolowLyon: 24, // SV1 (12mm) + RV5 (12mm) = 24mm (<35mm)
    },
    leadsData: cloneNormalLeads(),
    leadsSummary: {
      limbLeadsSummary: "Sóng P dương ở DI, DII, aVF và âm ở aVR. Khoảng PR 150ms cố định. Phức bộ QRS thanh mảnh 85ms. Đoạn ST đẳng điện, sóng T dương ở DI, DII, aVF.",
      chestLeadsSummary: "Sóng R tăng dần biên độ từ V1 đến V5, sóng S giảm dần biên độ. Vùng chuyển tiếp (R/S ~ 1) ở V3-V4. ST đẳng điện, T dương ở V3-V6.",
    },
    diagnosis: {
      primary: "Điện tâm đồ 12 chuyển đạo trong giới hạn bình thường (Normal Electrocardiogram)",
      culpritVesselOrCause: "Hệ thống phát nhịp và dẫn truyền điện học tim hoạt động sinh lý hoàn hảo",
      differentials: ["Không có bệnh lý"],
      keyFindings: [
        "Đúng tiêu chuẩn nhịp xoang: P đồng dạng, P(+) ở DII, aVF, P(-) ở aVR, mỗi P đi kèm 1 QRS",
        "Tần số 72 chu kỳ/phút (nằm trong giới hạn bình thường 60-100 l/p)",
        "Trục điện tim trung gian (+55°)",
        "Thời gian và biên độ các sóng P, QRS, T, khoảng PR và QT trong giới hạn sinh lý",
      ],
      clinicalNote: "Điện tâm đồ hoàn toàn bình thường, không ghi nhận rối loạn nhịp, phì đại buồng tim hay biến đổi thiếu máu cơ tim.",
      treatment: ["Tiếp tục duy trì lối sống lành mạnh, dinh dưỡng hợp lý và rèn luyện thể thao."],
      confidence: { primary: 99.8 },
    },
    learningNotes: {
      chapterRef: "Chương 4: Các bước căn bản đọc điện tâm đồ (Trang 12-18, 111-113)",
      coreTakeaway: "10 bước chuẩn mực khi đọc bất kỳ ECG nào: 1. Nhịp -> 2. Tần số -> 3. Trục & góc alpha -> 4. Sóng P -> 5. PR -> 6. QRS -> 7. ST -> 8. T -> 9. QT/QTc -> 10. Sóng U.",
      pitfallToAvoid: "Luôn kiểm tra kỹ thuật test 1mV (cao 10mm) và tốc độ giấy 25mm/s trước khi kết luận điện tim bình thường.",
    },
  },
  {
    id: "case-lbbb",
    category: "Conduction",
    title: "Bloc Nhánh Trái Hoàn Toàn (Complete LBBB)",
    subtitle: "QRS dãn rộng 145ms, sóng R chẻ đôi hình chữ M ở DI, aVL, V5, V6; dạng QS sâu ở V1-V3",
    severity: "Cảnh giác cao",
    patient: {
      name: "Trần Văn Hùng",
      age: 67,
      gender: "Nam",
      chiefComplaint: "Mệt mỏi, khó thở khi gắng sức (NYHA II), cảm giác tức nặng ngực trái âm ỉ",
      clinicalHistory: "Bệnh nhân nam 67 tuổi, tiền sử Tăng huyết áp 15 năm và bệnh cơ tim giãn, điều trị không liên tục. Gần đây mệt mỏi tăng khi leo cầu thang, thỉnh thoảng cảm giác hồi hộp tức ngực.",
      vitals: { bp: "155/90", hr: 75, spo2: 97, temp: 36.7 },
      labs: { k: 4.1, ca: 2.3, mg: 0.85, troponinI: "0.02 ng/mL (bình thường)", bnp: "420 pg/mL" },
    },
    metrics: {
      heartRate: 75,
      rhythmType: "Nhịp xoang kèm Bloc nhánh trái hoàn toàn (Complete LBBB)",
      regularity: "Đều",
      axis: "Trục lệch trái",
      alphaAngle: -25,
      prInterval: 175,
      qrsDuration: 145,
      qt: 420,
      qtc: 470,
    },
    leadsData: (() => {
      const leads = cloneNormalLeads();
      // Lateral leads: wide notched R wave (M shape), no Q waves, ST depression, inverted asymmetric T
      const lateralLeads: LeadName[] = ["I", "aVL", "V5", "V6"];
      for (const l of lateralLeads) {
        leads[l].qWave = { amp: 0, dur: 0.01 }; // Mất sóng q sinh lý
        leads[l].rWave = { amp: l === "V5" || l === "V6" ? 2.2 : 1.4, dur: 0.08, notched: true };
        leads[l].sWave = { amp: -0.1, dur: 0.02 };
        leads[l].stSegment = { elevation: -0.15, slope: "downsloping" };
        leads[l].tWave = { amp: -0.38, dur: 0.16, shape: "inverted" };
        leads[l].qrsDuration = 145;
      }
      // Right precordial leads: tiny r, deep wide QS or S wave, secondary discordant ST elevation
      const septalLeads: LeadName[] = ["V1", "V2", "V3"];
      for (const l of septalLeads) {
        leads[l].rWave = { amp: 0.1, dur: 0.02 };
        leads[l].sWave = { amp: l === "V2" ? -2.5 : -2.0, dur: 0.08, wide: true };
        leads[l].stSegment = { elevation: 0.18, slope: "upsloping" }; // ST chênh lên thứ phát bất tương xứng
        leads[l].tWave = { amp: 0.45, dur: 0.16, shape: "normal" };
        leads[l].qrsDuration = 145;
      }
      return leads;
    })(),
    leadsSummary: {
      limbLeadsSummary: "DI, aVL: Phức bộ QRS dãn rộng 145ms, sóng R chẻ đôi có khía hình chữ M (notched R), mất sóng q vách, ST chênh xuống và T âm thứ phát trái chiều với QRS.",
      chestLeadsSummary: "V1-V3: Sóng r cực nhỏ hoặc dạng QS rất sâu và rộng, ST chênh lên thứ phát dạng vòm lượn. V5-V6: Sóng R đỉnh tù chẻ đôi, thời gian nhánh nội điện kéo dài > 60ms.",
    },
    diagnosis: {
      primary: "Bloc Nhánh Trái Hoàn Toàn (Complete Left Bundle Branch Block - LBBB)",
      culpritVesselOrCause: "Tổn thương nhánh trái bó His do tăng huyết áp mạn tính kéo dài, xơ hóa thoái hóa hệ dẫn truyền (bệnh Lev/Lenègre) hoặc bệnh mạch vành",
      differentials: [
        "Phì đại thất trái đơn thuần (QRS thường < 120ms, không mất sóng q ở V5-V6)",
        "Hội chứng WPW Type B (có sóng Delta, khoảng PR ngắn < 120ms)",
        "Nhịp tự thất chậm (tần số thường < 40 l/p, phân ly nhĩ thất)",
      ],
      keyFindings: [
        "QRS dãn rộng ≥ 120ms (thực tế 145ms)",
        "Sóng R rộng có khía chẻ đôi hình chữ M ở các chuyển đạo bên (DI, aVL, V5, V6)",
        "Mất hoàn toàn sóng q sinh lý ở DI, V5, V6 do đảo ngược chiều khử cực vách liên thất",
        "Dạng rS hoặc QS rất sâu và rộng ở V1-V3",
        "Biến đổi ST-T thứ phát luôn ngược chiều với phức bộ QRS (ST chênh xuống và T âm ở V5-V6; ST chênh lên nhẹ ở V1-V3)",
      ],
      clinicalNote: "Khi xuất hiện LBBB mới hoặc nghi ngờ mới, LBBB che khuất các biến đổi ST-T của nhồi máu cơ tim. Cần áp dụng Tiêu chuẩn Sgarbossa cải biên để chẩn đoán NMCT cấp.",
      treatment: [
        "Đánh giá toàn diện bệnh tim thực thể nền (Siêu âm tim Doppler màu, chụp MSCT mạch vành nếu đau ngực).",
        "Kiểm soát huyết áp tối ưu với thuốc ức chế men chuyển (ACEi) / ARB và thuốc chẹn beta.",
        "Nếu kèm suy tim nặng EF ≤ 35% và QRS ≥ 130-150ms: xem xét chỉ định liệu pháp tái đồng bộ cơ tim (CRT-D / CRT-P).",
      ],
      confidence: { primary: 98.6, secondaryName: "Phì đại thất trái có rối loạn dẫn truyền", secondaryConfidence: 1.2 },
    },
    learningNotes: {
      chapterRef: "Atul Luthra - Chương 7: Abnormalities of QRS Complex (Trang 79-81, 95 - Hình 7.10)",
      coreTakeaway: "Đặc trưng cốt lõi của LBBB: QRS ≥ 120ms, mất sóng q vách, sóng R chẻ đôi hình chữ M ở V5-V6 và biến đổi ST-T luôn ngược chiều (discordant) với phức bộ QRS.",
      pitfallToAvoid: "Đừng vội chẩn đoán NMCT cấp chỉ vì thấy ST chênh lên ở V1-V3 trong LBBB, vì đây là chênh lên thứ phát tự nhiên (discordant ST elevation). Hãy tìm ST chênh cùng chiều (concordant) theo tiêu chuẩn Sgarbossa.",
    },
  },
  {
    id: "case-rbbb",
    category: "Conduction",
    title: "Bloc Nhánh Phải Hoàn Toàn (Complete RBBB)",
    subtitle: "Phức bộ dạng tai thỏ rsR' ở V1-V2 (QRS 135ms), sóng S rộng sâu và tù ở DI, aVL, V5, V6",
    severity: "Ổn định",
    patient: {
      name: "Lê Hoàng Nam",
      age: 42,
      gender: "Nam",
      chiefComplaint: "Khám sức khỏe tổng quát định kỳ, hoàn toàn không đau ngực hay khó thở",
      clinicalHistory: "Bệnh nhân nam 42 tuổi, làm việc văn phòng, không tiền sử bệnh lý tim mạch. Khám tim nghe tiếng tim T2 tách đôi rộng cố định nhẹ, không có tiếng thổi bệnh lý.",
      vitals: { bp: "120/78", hr: 70, spo2: 99, temp: 36.5 },
      labs: { k: 4.3, ca: 2.35, mg: 0.9, troponinI: "Âm tính" },
    },
    metrics: {
      heartRate: 70,
      rhythmType: "Nhịp xoang kèm Bloc nhánh phải hoàn toàn (Complete RBBB)",
      regularity: "Đều",
      axis: "Trục phải nhẹ",
      alphaAngle: 100,
      prInterval: 160,
      qrsDuration: 135,
      qt: 390,
      qtc: 421,
    },
    leadsData: (() => {
      const leads = cloneNormalLeads();
      // V1 & V2: classic triphasic rsR' "rabbit ears" pattern with taller R' wave
      leads["V1"].rWave = { amp: 0.35, dur: 0.03 };
      leads["V1"].sWave = { amp: -0.4, dur: 0.03 };
      leads["V1"].rPrimeWave = { amp: 1.4, dur: 0.06 };
      leads["V1"].stSegment = { elevation: -0.08, slope: "downsloping" };
      leads["V1"].tWave = { amp: -0.3, dur: 0.14, shape: "inverted" };
      leads["V1"].qrsDuration = 135;

      leads["V2"].rWave = { amp: 0.5, dur: 0.03 };
      leads["V2"].sWave = { amp: -0.45, dur: 0.03 };
      leads["V2"].rPrimeWave = { amp: 1.25, dur: 0.05 };
      leads["V2"].stSegment = { elevation: -0.05, slope: "downsloping" };
      leads["V2"].tWave = { amp: -0.22, dur: 0.14, shape: "inverted" };
      leads["V2"].qrsDuration = 135;

      // Lateral leads I, aVL, V5, V6: normal R wave followed by wide, slurred S wave
      const lateralLeads: LeadName[] = ["I", "aVL", "V5", "V6"];
      for (const l of lateralLeads) {
        leads[l].sWave = { amp: -0.65, dur: 0.06, wide: true }; // S sâu và bè rộng (slurred S)
        leads[l].qrsDuration = 135;
      }
      return leads;
    })(),
    leadsSummary: {
      limbLeadsSummary: "DI, aVL: Phức bộ QRS dãn rộng 135ms với sóng S sâu, rộng và tù (slurred S wave). Đoạn ST và sóng T bình thường.",
      chestLeadsSummary: "V1-V2: Dạng sóng 3 pha kinh điển rsR' hình 'tai thỏ' (M-shaped complex), trong đó đỉnh R' thứ hai cao và rộng hơn sóng r ban đầu. Sóng T âm thứ phát ở V1-V2. V5-V6: Sóng S rộng, tù.",
    },
    diagnosis: {
      primary: "Bloc Nhánh Phải Hoàn Toàn (Complete Right Bundle Branch Block - RBBB)",
      culpritVesselOrCause: "Dẫn truyền qua nhánh phải bó His bị chậm trễ hoặc nghẽn, khử cực thất phải xảy ra muộn qua con đường cơ tim thông thường",
      differentials: [
        "Hội chứng Brugada (có ST chênh vòm coved ở V1-V2, không có sóng S rộng ở DI, V6)",
        "Phì đại thất phải (RVH) (sóng R đơn pha cao ở V1, QRS < 120ms)",
        "Hội chứng Wolff-Parkinson-White Type A (PR ngắn, có sóng delta)",
      ],
      keyFindings: [
        "Thời gian phức bộ QRS dãn rộng ≥ 120ms (thực tế 135ms)",
        "Dạng sóng 3 pha rsR' hình 'tai thỏ' ở chuyển đạo trước tim phải V1, V2",
        "Sóng S rộng và tù (slurred S wave) kéo dài > 40ms ở DI, aVL, V5, V6",
        "Sóng T âm thứ phát ngược chiều với R' ở V1 và V2",
        "Không làm biến dạng giai đoạn đầu của phức bộ QRS (vẫn chẩn đoán được NMCT cấp)",
      ],
      clinicalNote: "RBBB đơn độc có thể gặp ở người hoàn toàn khỏe mạnh mà không có ý nghĩa bệnh lý tim mạch nguy hiểm. Tuy nhiên, nếu RBBB xuất hiện mới đột ngột, cần tầm soát ngay thuyên tắc phổi cấp hoặc nhồi máu cơ tim thành trước vách.",
      treatment: [
        "Nếu RBBB đơn độc ở người trẻ không triệu chứng: Không cần điều trị đặc hiệu, trấn an bệnh nhân.",
        "Siêu âm tim loại trừ bệnh tim bẩm sinh kín đáo như thông liên nhĩ lỗ thứ hai (Ostium secundum ASD).",
        "Theo dõi định kỳ hàng năm.",
      ],
      confidence: { primary: 99.2 },
    },
    learningNotes: {
      chapterRef: "Atul Luthra - Chương 7: Abnormalities of QRS Complex (Trang 79-81, 94-96 - Hình 7.9)",
      coreTakeaway: "Bộ ba dấu hiệu RBBB: 1. QRS ≥ 120ms; 2. rsR' (tai thỏ) ở V1-V2; 3. Sóng S rộng tù ở DI và V6. Điểm đặc biệt: RBBB không làm mất sóng Q hoại tử nên vẫn chẩn đoán được NMCT!",
      pitfallToAvoid: "Phân biệt RBBB với Brugada: Brugada có ST chênh lên vòm cao đặc thù ở V1-V2 và hoàn toàn không có sóng S rộng tù ở chuyển đạo bên DI, V6.",
    },
  },
  {
    id: "case-lvh-strain",
    category: "Hypertrophy",
    title: "Phì Đại Thất Trái Kèm Tăng Gánh Tâm Thu (LVH with Systolic Strain)",
    subtitle: "Sokolow-Lyon 50mm (>35mm), ST chênh xuống và T âm sâu bất đối xứng ở V5-V6, dày nhĩ trái (P mitrale)",
    severity: "Cảnh giác cao",
    patient: {
      name: "Đỗ Văn Thành",
      age: 62,
      gender: "Nam",
      chiefComplaint: "Đau đầu vùng chẩm, chóng mặt, tức ngực trái âm ỉ khi lao động nặng",
      clinicalHistory: "Bệnh nhân nam 62 tuổi, tiền sử tăng huyết áp vô căn 12 năm điều trị không đều đặn, hút thuốc lá 20 bao-năm. Huyết áp phòng khám đo được 185/105 mmHg, mỏm tim đập dội mạnh ở khoang liên sườn 6 ngoài đường trung đòn trái.",
      vitals: { bp: "185/105", hr: 78, spo2: 98, temp: 36.8 },
      labs: { k: 4.1, ca: 2.38, mg: 0.88, troponinI: "0.01 ng/mL", bnp: "180 pg/mL" },
    },
    metrics: {
      heartRate: 78,
      rhythmType: "Nhịp xoang kèm phì đại thất trái và dày nhĩ trái",
      regularity: "Đều",
      axis: "Trục lệch trái",
      alphaAngle: -35,
      prInterval: 180,
      qrsDuration: 105,
      qt: 410,
      qtc: 468,
      sokolowLyon: 50, // SV1 (24mm) + RV5 (26mm) = 50mm (> 35mm)
      cornellCriteria: 32, // RaVL (14mm) + SV3 (18mm) = 32mm (> 28mm ở nam)
    },
    leadsData: (() => {
      const leads = cloneNormalLeads();
      // P mitrale in DII: broad and notched
      leads["II"].pWave = { amp: 0.18, dur: 0.12, shape: "bifid" };
      // P biphasic with deep negative terminal component in V1
      leads["V1"].pWave = { amp: -0.12, dur: 0.10, shape: "biphasic" };
      leads["V1"].rWave = { amp: 0.2, dur: 0.02 };
      leads["V1"].sWave = { amp: -2.4, dur: 0.05 }; // S sâu 24mm
      leads["V1"].stSegment = { elevation: 0.08, slope: "upsloping" };

      leads["V2"].sWave = { amp: -2.8, dur: 0.05 };
      leads["V3"].sWave = { amp: -1.8, dur: 0.04 };

      // aVL tall R
      leads["aVL"].rWave = { amp: 1.4, dur: 0.04 }; // RaVL = 14mm (>11mm)
      leads["aVL"].stSegment = { elevation: -0.12, slope: "downsloping" };
      leads["aVL"].tWave = { amp: -0.25, dur: 0.16, shape: "inverted" };

      // Lateral leads V5, V6: massive R wave + asymmetric T inversion & ST depression (strain pattern)
      leads["V5"].rWave = { amp: 2.6, dur: 0.05 }; // RV5 = 26mm
      leads["V5"].stSegment = { elevation: -0.2, slope: "downsloping" };
      leads["V5"].tWave = { amp: -0.5, dur: 0.18, shape: "inverted" };

      leads["V6"].rWave = { amp: 2.2, dur: 0.05 };
      leads["V6"].stSegment = { elevation: -0.18, slope: "downsloping" };
      leads["V6"].tWave = { amp: -0.45, dur: 0.18, shape: "inverted" };

      return leads;
    })(),
    leadsSummary: {
      limbLeadsSummary: "Trục QRS lệch trái (-35°). Sóng P ở DII rộng 120ms có hai đỉnh (P mitrale). Sóng R ở aVL cao 14mm (> 11mm). ST chênh xuống và T âm ở DI, aVL.",
      chestLeadsSummary: "Sóng S cực sâu ở V1 (24mm) và V2 (28mm). Sóng R cao vút ở V5 (26mm) và V6 (22mm). Chỉ số Sokolow-Lyon = 50mm (ngưỡng bình thường < 35mm). Kiểu biến đổi tăng gánh thất trái (LV Strain) rõ rệt với ST chênh dốc xuống và T âm sâu bất đối xứng.",
    },
    diagnosis: {
      primary: "Phì Đại Thất Trái Nặng Kèm Kiểu Tăng Gánh Tâm Thu (Severe LVH with Systolic Strain Pattern)",
      culpritVesselOrCause: "Quá tải áp lực tâm thu kéo dài do tăng huyết áp vô căn mạn tính chưa được kiểm soát tốt",
      differentials: [
        "Bệnh cơ tim phì đại mỏm tim (Apical HCM) (thường có sóng T âm khổng lồ > 10mm đối xứng)",
        "Thiếu máu cơ tim dưới nội mạc thành bên (ST chênh xuống đi ngang, T âm đối xứng nhọn)",
        "Bloc nhánh trái không hoàn toàn (QRS thường dãn rộng hơn, không đáp ứng trọn vẹn tiêu chuẩn điện thế)",
      ],
      keyFindings: [
        "Tiêu chuẩn điện thế Sokolow-Lyon: S(V1) + R(V5) = 24 + 26 = 50 mm (tiêu chuẩn > 35 mm)",
        "Tiêu chuẩn Cornell: R(aVL) + S(V3) = 14 + 18 = 32 mm (tiêu chuẩn ở nam > 28 mm)",
        "Tiêu chuẩn Framingham: R(aVL) = 14 mm (> 11 mm)",
        "Dấu hiệu quá tải tâm thu (Systolic Strain): ST chênh xuống dốc xuống và T âm bất đối xứng (sườn xuống thoai thoải, sườn lên dốc đứng) ở V5, V6, DI, aVL",
        "Dày nhĩ trái phối hợp (P mitrale): P hai đỉnh ở DII và pha âm sâu > 1mm² ở V1",
      ],
      clinicalNote: "Dấu hiệu quá tải tâm thu thất trái (LV Strain) trên ECG phản ánh tình trạng tái cấu trúc phì đại cơ tim tiến triển, làm tăng gấp 3 lần nguy cơ biến cố mạch vành và suy tim.",
      treatment: [
        "Hạ huyết áp mục tiêu dần về < 130/80 mmHg bằng thuốc ức chế men chuyển/chẹn thụ thể (ACEi/ARB) phối hợp thuốc chẹn kênh calci nhóm DHP (Amlodipine).",
        "Siêu âm tim để đo độ dày vách liên thất (IVSd), bề dày thành sau thất trái (LVPWd) và tính chỉ số khối cơ thất trái (LVMI).",
        "Thay đổi lối sống: Giảm muối (< 5g/ngày), bỏ thuốc lá, giảm cân và tập thể dục vừa sức.",
      ],
      confidence: { primary: 99.1, secondaryName: "Bệnh tim tăng huyết áp", secondaryConfidence: 0.9 },
    },
    learningNotes: {
      chapterRef: "Atul Luthra - Chương 7 & 8: Abnormalities of QRS & T Wave - LVH with Strain (Trang 74-77, 90, 92, 109 - Hình 7.8, Hình 8.7A)",
      coreTakeaway: "Phân biệt tăng gánh tâm thu (systolic strain - ST chênh xuống dốc xuống, T âm bất đối xứng) với tăng gánh tâm trương (diastolic overload - sóng q sâu hẹp ở V5-V6 đi kèm sóng T cao nhọn).",
      pitfallToAvoid: "Không nên chỉ dựa vào tiêu chuẩn điện thế đơn thuần ở người trẻ hoặc vận động viên điền kinh (thành ngực mỏng, sinh lý). Phải tìm thêm trục lệch trái, dày nhĩ trái và dấu hiệu strain.",
    },
  },
  {
    id: "case-brugada-type1",
    category: "Channelopathy",
    title: "Hội Chứng Brugada Type 1 (Brugada Syndrome - Dạng Vòm Coved)",
    subtitle: "ST chênh lên dạng vòm coved ≥ 2mm ở V1-V2 tiếp nối T âm đối xứng, nguy cơ đột tử đêm (SUDS)",
    severity: "Khẩn cấp",
    patient: {
      name: "Phạm Văn Hậu",
      age: 34,
      gender: "Nam",
      chiefComplaint: "Tỉnh dậy sau cơn ngất xỉu và vã mồ hôi lúc nửa đêm, gia đình hoảng hốt đưa đi cấp cứu",
      clinicalHistory: "Bệnh nhân nam 34 tuổi, thể trạng khỏe mạnh, không bệnh nền. Đêm nay sau khi uống bia và có sốt nhẹ (37.8°C), bệnh nhân thở rên rỉ rồi ngất đi khoảng 2 phút. Khai thác gia đình ghi nhận có người anh ruột đột tử trong lúc ngủ năm 29 tuổi.",
      vitals: { bp: "115/70", hr: 68, spo2: 98, temp: 37.8 },
      labs: { k: 4.2, ca: 2.3, mg: 0.85, troponinI: "Âm tính", ckmb: "12 U/L" },
    },
    metrics: {
      heartRate: 68,
      rhythmType: "Nhịp xoang kèm hình ảnh Brugada Type 1 (Coved-type ST elevation)",
      regularity: "Đều",
      axis: "Trục trung gian",
      alphaAngle: 60,
      prInterval: 190,
      qrsDuration: 112,
      qt: 400,
      qtc: 426,
    },
    leadsData: (() => {
      const leads = cloneNormalLeads();
      // V1: Classic Brugada Type 1 coved ST elevation >= 2mm followed by negative T wave
      leads["V1"].rWave = { amp: 0.4, dur: 0.03 };
      leads["V1"].sWave = { amp: -0.3, dur: 0.02 };
      leads["V1"].rPrimeWave = { amp: 0.6, dur: 0.03 }; // pseudo-RBBB rSr'
      leads["V1"].stSegment = { elevation: 0.32, slope: "coved" }; // +3.2mm coved elevation
      leads["V1"].tWave = { amp: -0.35, dur: 0.14, shape: "inverted" };
      leads["V1"].qrsDuration = 112;

      // V2: Coved elevation
      leads["V2"].rWave = { amp: 0.6, dur: 0.03 };
      leads["V2"].sWave = { amp: -0.3, dur: 0.02 };
      leads["V2"].rPrimeWave = { amp: 0.7, dur: 0.03 };
      leads["V2"].stSegment = { elevation: 0.26, slope: "coved" }; // +2.6mm
      leads["V2"].tWave = { amp: -0.3, dur: 0.14, shape: "inverted" };
      leads["V2"].qrsDuration = 112;

      return leads;
    })(),
    leadsSummary: {
      limbLeadsSummary: "Các chuyển đạo ngoại biên DI, DII, DIII, aVR, aVL, aVF hoàn toàn trong giới hạn bình thường. Không có hình ảnh soi gương thiếu máu cơ tim.",
      chestLeadsSummary: "V1 và V2: Đoạn ST chênh lên dạng vòm lồi cong (coved-type ST elevation) rất cao (3.2mm ở V1 và 2.6mm ở V2), bắt đầu từ đỉnh sóng r' và hạ dần xuống nối liền vào sóng T âm đối xứng sâu. Không có sóng S tù ở V5-V6.",
    },
    diagnosis: {
      primary: "Hội Chứng Brugada Type 1 - Dạng Vòm Điển Hình (Brugada Syndrome Type 1 Coved Pattern)",
      culpritVesselOrCause: "Bệnh lý kênh ion Natri tim (Channelopathy) do đột biến gen SCN5A di truyền trội trên nhiễm sắc thể thường, gây rối loạn điện sinh lý tái cực thất phải",
      differentials: [
        "Bloc nhánh phải hoàn toàn (RBBB) (có sóng S rộng tù ở DI, V6; ST chênh xuống thay vì chênh lên vòm cao)",
        "Nhồi máu cơ tim cấp trước vách (ST chênh lên có hình ảnh soi gương ở DII, DIII, aVF, men tim tăng)",
        "Viêm màng ngoài tim cấp (ST chênh lên lõm lan tỏa nhiều chuyển đạo, PR chênh xuống)",
      ],
      keyFindings: [
        "Đoạn ST chênh lên dạng vòm (coved ST elevation) ≥ 2 mm (0.2 mV) ở ≥ 1 chuyển đạo trước tim phải (V1, V2)",
        "Đoạn ST chênh lên tiếp nối trực tiếp vào sóng T âm đối xứng",
        "Dạng giả bloc nhánh phải (pseudo-RBBB / rSr') nhưng không có sóng S rộng ở DI và V6",
        "Tiền sử ngất ban đêm và tiền sử gia đình có người thân đột tử khi ngủ (SUDS)",
        "Dấu hiệu điện tim có thể bộc lộ rõ hơn khi bệnh nhân bị sốt cao hoặc dùng thuốc chẹn kênh natri",
      ],
      clinicalNote: "Hội chứng Brugada Type 1 là dạng duy nhất có giá trị chẩn đoán xác định độc lập. Bệnh nhân có nguy cơ cao xảy ra các cơn nhanh thất đa hình và rung thất gây tử vong trong lúc ngủ.",
      treatment: [
        "Chỉ định cấy máy phá rung tự động (ICD - Implantable Cardioverter Defibrillator) để dự phòng đột tử tiên phát.",
        "Hạ sốt tích cực và nhanh chóng bằng Paracetamol khi có sốt (sốt là yếu tố kích hoạt loạn nhịp ác tính).",
        "Tránh tuyệt đối các thuốc chống chỉ định trong danh sách BrugadaDrugs.org (thuốc chống loạn nhịp nhóm IC như Flecainide, thuốc chống trầm cảm 3 vòng, rượu bia).",
        "Tầm soát điện tâm đồ và xét nghiệm di truyền cho tất cả người thân thế hệ thứ nhất trong gia đình.",
      ],
      brugadaAnalysis: "Dạng vòm Coved Type 1 kinh điển ở V1-V2 (ST chênh lên 3.2mm + T âm). Bệnh nhân có triệu chứng ngất và tiền sử gia đình đột tử -> Phân tầng nguy cơ RẤT CAO, chỉ định cấy ICD khẩn.",
      confidence: { primary: 98.9, secondaryName: "Brugada Type 2 chuyển dạng", secondaryConfidence: 0.8 },
    },
    learningNotes: {
      chapterRef: "Atul Luthra - Chương 7: Abnormalities of QRS Complex - The Brugada Syndrome (Trang 82, 97 - Hình 7.11)",
      coreTakeaway: "Hội chứng Brugada là bệnh lý kênh ion di truyền. Dạng Type 1: ST chênh lên dạng vòm (coved) ≥ 2mm theo sau bởi T âm ở V1-V2; khác với RBBB vì không có sóng S rộng ở DI, V6.",
      pitfallToAvoid: "Đừng nhầm Brugada Type 1 với NMCT cấp trước vách. Brugada không có hình ảnh soi gương ở thành dưới, men tim âm tính và ST chênh lên chủ yếu khu trú ở V1-V2.",
    },
  },
  {
    id: "case-torsades-de-pointes",
    category: "Arrhythmia",
    title: "Xoắn Đỉnh (Torsades de Pointes) Trên Nền Hội Chứng QT Kéo Dài",
    subtitle: "QTc kéo dài 560ms, ngoại tâm thu R-on-T khởi phát cơn nhanh thất đa hình xoắn trục quanh đường đẳng điện",
    severity: "Nguy kịch",
    patient: {
      name: "Nguyễn Thị Mai",
      age: 52,
      gender: "Nữ",
      chiefComplaint: "Đột ngột ngất xỉu, co giật ngắn 30 giây rồi tỉnh lại, thở hổn hển, người vã mồ hôi",
      clinicalHistory: "Bệnh nhân nữ 52 tuổi đang điều trị nhiễm trùng hô hấp bằng Erythromycin phối hợp với Ketoconazole (thuốc kháng nấm) và Simvastatin. Trước khi ngất có cảm giác tim đập hụt hẫng dữ dội. Khi gắn monitor tại phòng cấp cứu, ghi nhận các cơn nhịp nhanh thất tự hết xen kẽ nhịp tim chậm.",
      vitals: { bp: "85/50", hr: 210, spo2: 92, temp: 37.1 },
      labs: { k: 3.2, ca: 2.1, mg: 0.65, troponinI: "0.03 ng/mL" },
    },
    metrics: {
      heartRate: 210,
      rhythmType: "Nhịp nhanh thất đa hình xoắn đỉnh (Torsades de Pointes) trên nền QT kéo dài",
      regularity: "Không đều",
      axis: "Trục biến thiên liên tục",
      alphaAngle: 0,
      prInterval: 0,
      qrsDuration: 160,
      qt: 560,
      qtc: 580,
    },
    leadsData: (() => {
      const leads = cloneNormalLeads();
      // Twisting polymorphic ventricular tachycardia waveforms
      const leadKeys: LeadName[] = ["I", "II", "III", "aVR", "aVL", "aVF", "V1", "V2", "V3", "V4", "V5", "V6"];
      for (const l of leadKeys) {
        leads[l].pWave = { amp: 0, dur: 0.01, shape: "flat" };
        leads[l].prSegment = { dur: 0.01 };
        leads[l].qWave = { amp: 0, dur: 0.01 };
        leads[l].rWave = { amp: 1.6, dur: 0.08 };
        leads[l].sWave = { amp: -1.2, dur: 0.08 };
        leads[l].stSegment = { elevation: 0.1, slope: "upsloping" };
        leads[l].tWave = { amp: 0.6, dur: 0.22, shape: "peaked" }; // T rộng kéo dài QT
        leads[l].qrsDuration = 160;
      }
      return leads;
    })(),
    leadsSummary: {
      limbLeadsSummary: "Cơn nhịp nhanh thất đa hình với biên độ và trục phức bộ QRS thay đổi liên tục, xoay tròn quanh đường đẳng điện (twisting of points). Nhịp cơ bản trước cơn có khoảng QTc kéo dài > 560ms.",
      chestLeadsSummary: "V1-V6: Các phức bộ QRS dãn rộng dị dạng 160ms, liên tục đảo chiều từ dương sang âm rồi ngược lại theo chu kỳ 5-15 nhịp, tần số thất rất nhanh 200-240 chu kỳ/phút.",
    },
    diagnosis: {
      primary: "Xoắn Đỉnh (Torsades de Pointes) Thứ Phát Do Thuốc Kéo Dài Khoảng QT và Hạ Magne/Kali Máu",
      culpritVesselOrCause: "Tương tác ức chế chuyển hóa enzym gan CYP3A4 giữa kháng sinh Macrolide (Erythromycin) và kháng nấm Azole làm tăng nồng độ thuốc, gây ức chế kênh kali IKr làm chậm tái cực thất",
      differentials: [
        "Nhịp nhanh thất đơn hình thái (Monomorphic VT) (các phức bộ QRS có cùng hình dạng và trục không đổi)",
        "Rung thất (Ventricular Fibrillation) (hoàn toàn hỗn loạn, vô tổ chức, không thành chu kỳ xoắn trục)",
        "Rung nhĩ dẫn truyền qua đường phụ WPW (nhịp hoàn toàn không đều, tần số biến thiên rất lớn)",
      ],
      keyFindings: [
        "Cơn nhịp nhanh thất đa hình thái với các đỉnh QRS xoắn vặn quanh đường đẳng điện",
        "Khoảng QT/QTc cơ bản kéo dài rõ rệt (> 500ms, ca này 580ms)",
        "Hiện tượng R-on-T: Ngoại tâm thu thất khởi phát rơi trúng sóng T của nhát bóp trước đó",
        "Tần số thất trong cơn 180 - 250 chu kỳ/phút",
        "Bệnh nhân có sử dụng các thuốc kéo dài QT kết hợp hạ Kali và Magne máu",
      ],
      clinicalNote: "Torsades de Pointes là cấp cứu tối khẩn. Cơn có thể tự cắt cơn ngắn nhưng rất dễ thoái triển thành rung thất (VF) gây tử vong tức thì nếu không được bù Magne và cắt nguồn kích hoạt.",
      treatment: [
        "Ngừng ngay lập tức tất cả các thuốc nghi ngờ gây kéo dài khoảng QT (Erythromycin, Ketoconazole).",
        "Tiêm tĩnh mạch chậm Magnesium Sulfate 2g (hòa trong 100ml Dextrose 5% truyền trong 10-15 phút) - Đây là thuốc lựa chọn hàng đầu bất kể nồng độ Magne máu bình thường hay giảm!",
        "Bù Kali máu tích cực để duy trì nồng độ Kali máu ở mức cao an toàn: 4.5 - 5.0 mEq/L.",
        "Nếu nhịp tim chậm cơ bản kích hoạt xoắn đỉnh: dùng Isoproterenol hoặc đặt máy tạo nhịp tạm thời vượt tần số (Overdrive pacing 90-110 l/p) để rút ngắn khoảng QT.",
        "Nếu bệnh nhân tụt huyết áp, mất ý thức: Sốc điện khử rung không đồng bộ (Defibrillation) 200J ngay lập tức.",
      ],
      confidence: { primary: 98.7, secondaryName: "Nhịp nhanh thất đa hình không kèm QT dài", secondaryConfidence: 1.1 },
    },
    learningNotes: {
      chapterRef: "Atul Luthra - Chương 13 & 19: Abnormalities of Q-T Interval & Fast Wide QRS Rhythm (Trang 128, 143, 186-187, 201-202 - Hình 19.2)",
      coreTakeaway: "Torsades de Pointes là một thuật ngữ múa ballet tiếng Pháp có nghĩa là 'xoắn quanh một điểm'. Chìa khóa điều trị: Magnesium Sulfate tĩnh mạch là thần dược cắt cơn!",
      pitfallToAvoid: "Chống chỉ định tuyệt đối các thuốc chống loạn nhịp nhóm IA (Quinidine, Procainamide) và nhóm III (Amiodarone, Sotalol) vì chúng làm kéo dài thêm khoảng QT và gây ngừng tim.",
    },
  },
  {
    id: "case-aivr",
    category: "Arrhythmia",
    title: "Nhịp Tự Thất Gia Tăng (Accelerated Idioventricular Rhythm - AIVR)",
    subtitle: "Nhịp thất rộng đều 74 l/p, phân ly nhĩ thất, rối loạn nhịp tái tưới máu lành tính sau can thiệp mạch vành",
    severity: "Ổn định",
    patient: {
      name: "Vũ Đình Toàn",
      age: 58,
      gender: "Nam",
      chiefComplaint: "Đang nằm theo dõi tại phòng Hồi sức Tim mạch (CCU) sau can thiệp nong stent động mạch vành",
      clinicalHistory: "Bệnh nhân nam 58 tuổi, nhập viện vì nhồi máu cơ tim cấp thành trước giờ thứ 2. Đã được chụp và can thiệp đặt stent thành công tái thông hoàn toàn dòng chảy TIMI 3 nhánh LAD. 30 phút sau khi về CCU, monitor theo dõi phát hiện nhịp chuyển sang phức bộ QRS rộng đều đặn nhưng huyết áp và tri giác hoàn toàn ổn định.",
      vitals: { bp: "125/80", hr: 74, spo2: 99, temp: 36.6 },
      labs: { k: 4.4, ca: 2.32, mg: 0.9, troponinI: "Đạt đỉnh 45 ng/mL (dấu hiệu rửa trôi men tim)" },
    },
    metrics: {
      heartRate: 74,
      rhythmType: "Nhịp tự thất gia tăng (AIVR) - Dấu hiệu tái tưới máu mạch vành",
      regularity: "Đều",
      axis: "Trục lệch trái",
      alphaAngle: -45,
      prInterval: 0, // Phân ly nhĩ thất
      qrsDuration: 140,
      qt: 410,
      qtc: 455,
    },
    leadsData: (() => {
      const leads = cloneNormalLeads();
      // Wide regular QRS at rate 74 bpm with AV dissociation
      const leadKeys: LeadName[] = ["I", "II", "III", "aVR", "aVL", "aVF", "V1", "V2", "V3", "V4", "V5", "V6"];
      for (const l of leadKeys) {
        leads[l].pWave = { amp: 0.08, dur: 0.08, shape: "flat" }; // independent P waves
        leads[l].prSegment = { dur: 0.02 };
        leads[l].qWave = { amp: 0, dur: 0.01 };
        leads[l].rWave = { amp: l.startsWith("V") ? 1.4 : 1.1, dur: 0.08 };
        leads[l].sWave = { amp: -0.7, dur: 0.06 };
        leads[l].stSegment = { elevation: 0.05, slope: "horizontal" };
        leads[l].tWave = { amp: -0.3, dur: 0.16, shape: "inverted" };
        leads[l].qrsDuration = 140;
      }
      return leads;
    })(),
    leadsSummary: {
      limbLeadsSummary: "Phức bộ QRS dãn rộng 140ms, nhịp đều 74 chu kỳ/phút (nhanh hơn tần số tự thất thông thường 20-40 l/p nhưng chậm hơn nhịp nhanh thất VT > 100 l/p). Phân ly nhĩ thất (AV dissociation).",
      chestLeadsSummary: "V1-V6: QRS dãn rộng đồng nhất, sóng T đảo chiều thứ phát nhẹ. Thỉnh thoảng xuất hiện các nhát bóp hỗn hợp (fusion beats) khi nút xoang bắt lại nhịp tim.",
    },
    diagnosis: {
      primary: "Nhịp Tự Thất Gia Tăng (Accelerated Idioventricular Rhythm - AIVR) / Rối Loạn Nhịp Tái Tưới Máu (Reperfusion Arrhythmia)",
      culpritVesselOrCause: "Dòng máu tái tưới máu đột ngột vào vùng cơ tim bị thiếu máu nuôi sau can thiệp stent mạch vành, làm tăng tính tự động của ổ chủ nhịp thất",
      differentials: [
        "Nhịp nhanh thất (Ventricular Tachycardia) (tần số > 100-120 l/p, thường gây tụt huyết áp và nguy kịch)",
        "Nhịp xoang kèm Bloc nhánh trái hoàn toàn (có sóng P đi trước QRS với khoảng PR cố định)",
        "Nhịp thoát bộ nối gia tăng (QRS thường thanh mảnh < 120ms)",
      ],
      keyFindings: [
        "Tần số thất đều đặn trong khoảng 60 đến 100 chu kỳ/phút ('Nhịp nhanh thất chậm')",
        "Phức bộ QRS dãn rộng và dị dạng (thời gian > 120ms, thực tế 140ms)",
        "Phân ly nhĩ thất (AV dissociation): sóng P xoang phát nhịp độc lập với tần số chậm hơn tần số thất",
        "Có sự xuất hiện của các nhát bắt được thất (capture beats) hoặc nhát hỗn hợp (fusion beats)",
        "Bối cảnh lâm sàng xuất hiện ngay sau khi tái thông mạch vành thành công bằng can thiệp hoặc tiêu sợi huyết",
      ],
      clinicalNote: "AIVR được các nhà tim mạch học gọi là 'rối loạn nhịp bạn bè' (benign friend): Đây là chỉ dấu lâm sàng đáng tin cậy khẳng định mạch vành đã tái thông thành công, tiên lượng rất tốt và thường tự kết thúc.",
      treatment: [
        "Giữ thái độ theo dõi sát (Watchful Waiting), KHÔNG dùng thuốc chống loạn nhịp (Amiodarone hay Lidocaine).",
        "Tránh sốc điện chuyển nhịp vì đây không phải nhịp nhanh thất ác tính.",
        "Nếu tần số tim chậm làm huyết áp giảm nhẹ do mất co bóp đồng bộ nhĩ: có thể dùng Atropine 0.5mg tiêm tĩnh mạch để tăng tần số xoang vượt qua tần số ổ ngoại vị.",
        "Tiếp tục duy trì phác đồ điều trị sau nhồi máu cơ tim (kháng kết tập tiểu cầu kép DAPT, Statin liều cao, chẹn beta khi huyết động ổn định).",
      ],
      confidence: { primary: 99.4 },
    },
    learningNotes: {
      chapterRef: "Atul Luthra - Chương 20: Normal Regular Rhythm with Wide QRS (Trang 195-198, 210-213 - Hình 20.1)",
      coreTakeaway: "AIVR (60-100 l/p) là dấu hiệu kinh điển của tái tưới máu mạch vành. Rối loạn nhịp này mang tính lành tính, thoáng qua và tự biến mất khi nhịp xoang tăng lên.",
      pitfallToAvoid: "Sai lầm nguy hiểm là nhầm AIVR với nhịp nhanh thất ác tính (VT) rồi vội vã tiêm Lidocaine hoặc Amiodarone; thuốc sẽ ức chế ổ tự thất duy nhất đang cứu sống bệnh nhân và dẫn đến vô tâm thu (asystole)!",
    },
  },
  {
    id: "case-atrial-flutter",
    category: "Arrhythmia",
    title: "Cuồng Nhĩ Điển Hình Dẫn Truyền 2:1 (Atrial Flutter with 2:1 AV Conduction)",
    subtitle: "Sóng F hình răng cưa liên tục tần số 300 l/p ở DII, DIII, aVF; nhịp thất đều 150 l/p",
    severity: "Cảnh giác cao",
    patient: {
      name: "Trần Đình Trọng",
      age: 68,
      gender: "Nam",
      chiefComplaint: "Cảm giác hồi hộp, tim đập nhanh liên hồi như đánh trống ngực, mệt mỏi và hụt hơi",
      clinicalHistory: "Bệnh nhân nam 68 tuổi, tiền sử bệnh phổi tắc nghẽn mạn tính (COPD) 10 năm và suy tim sung huyết. Cơn hồi hộp xuất hiện đột ngột cách nhập viện 4 giờ, không giảm khi nghỉ ngơi.",
      vitals: { bp: "128/82", hr: 150, spo2: 95, temp: 36.8 },
      labs: { k: 4.0, ca: 2.25, mg: 0.82, troponinI: "0.02 ng/mL" },
    },
    metrics: {
      heartRate: 150,
      rhythmType: "Cuồng nhĩ điển hình (Atrial Flutter) dẫn truyền nhĩ-thất 2:1",
      regularity: "Đều",
      axis: "Trục trung gian",
      alphaAngle: 70,
      prInterval: 0,
      qrsDuration: 88,
      qt: 280,
      qtc: 442,
    },
    leadsData: (() => {
      const leads = cloneNormalLeads();
      // Continuous saw-toothed flutter F waves in inferior leads
      const infLeads: LeadName[] = ["II", "III", "aVF"];
      for (const l of infLeads) {
        leads[l].pWave = { amp: -0.25, dur: 0.10, shape: "inverted" }; // Negative saw-tooth
        leads[l].prSegment = { dur: 0.04, deviation: -0.05 };
        leads[l].rWave = { amp: 1.2, dur: 0.04 };
        leads[l].stSegment = { elevation: 0, slope: "horizontal" };
        leads[l].tWave = { amp: 0.2, dur: 0.12, shape: "normal" };
      }
      return leads;
    })(),
    leadsSummary: {
      limbLeadsSummary: "DII, DIII, aVF: Xuất hiện liên tục các sóng F cuồng nhĩ hình răng cưa sắc nét (saw-tooth waves), tần số nhĩ đều đặn 300 chu kỳ/phút, không có đường đẳng điện phẳng giữa các sóng. Nhịp thất đều đặn 150 l/p do bloc nhĩ thất 2:1.",
      chestLeadsSummary: "V1: Sóng F thường dương nhô cao. V2-V6: Phức bộ QRS thanh mảnh bình thường (88ms). Dẫn truyền nhĩ-thất tỷ lệ cố định 2:1.",
    },
    diagnosis: {
      primary: "Cuồng Nhĩ Điển Hình Dẫn Truyền 2:1 (Typical Atrial Flutter with 2:1 AV Conduction)",
      culpritVesselOrCause: "Vòng vào lại lớn (Macro-reentry circuit) quay ngược chiều kim đồng hồ quanh vòng van ba lá và eo tĩnh mạch chủ dưới (Cavo-tricuspid isthmus - CTI)",
      differentials: [
        "Nhịp nhanh xoang (Sinus Tachycardia) (có sóng P xoang bình thường và có đoạn đẳng điện rõ ràng)",
        "Nhịp nhanh kịch phát trên thất (AVNRT / AVRT) (tần số thường > 160-200 l/p, không có sóng răng cưa F)",
        "Rung nhĩ đáp ứng thất nhanh (nhịp hoàn toàn không đều, không có sóng răng cưa đồng dạng)",
      ],
      keyFindings: [
        "Sóng cuồng nhĩ (sóng F) hình răng cưa liên tục, đồng dạng ở các chuyển đạo thành dưới (DII, DIII, aVF)",
        "Hoàn toàn không có khoảng đẳng điện phẳng giữa các sóng F",
        "Tần số nhĩ (sóng F) cực nhanh và hằng định: 250 đến 350 chu kỳ/phút (điển hình 300 bpm)",
        "Tần số thất bằng phân số chẵn của tần số nhĩ: dẫn truyền 2:1 tạo nhịp thất 150 bpm (hoặc 4:1 tạo nhịp 75 bpm)",
        "Nghiệm pháp xoa xoang cảnh làm chậm dẫn truyền nút AV thoáng qua, bộc lộ rõ sóng răng cưa 4:1",
      ],
      clinicalNote: "Bất kỳ bệnh nhân nào có nhịp nhanh đều đặn chính xác 150 chu kỳ/phút trên lâm sàng, điều đầu tiên bác sĩ cần nghĩ đến là Cuồng nhĩ dẫn truyền 2:1 cho đến khi có bằng chứng ngược lại!",
      treatment: [
        "Kiểm soát tần số thất: Dùng thuốc ức chế nút AV như chẹn beta (Metoprolol) hoặc chẹn kênh calci Non-DHP (Diltiazem).",
        "Chuyển nhịp về nhịp xoang: Sốc điện đồng bộ (Synchronized Cardioversion) với mức năng lượng thấp rất hiệu quả (chỉ cần 20 - 50 Joules).",
        "Phòng ngừa đột quỵ tắc mạch: Đánh giá thang điểm CHA2DS2-VASc và chỉ định thuốc chống đông đường uống (NOAC / VKA) tương tự rung nhĩ.",
        "Điều trị triệt để lâu dài: Triệt đốt điện sinh lý bằng sóng radio (RF Ablation) vòng eo van ba lá (CTI) với tỷ lệ thành công > 95%.",
      ],
      confidence: { primary: 98.8, secondaryName: "Nhịp nhanh kịch phát trên thất", secondaryConfidence: 1.0 },
    },
    learningNotes: {
      chapterRef: "Atul Luthra - Chương 16: Fast Regular Rhythm with Narrow QRS - Atrial Flutter (Trang 158-159, 173-174 - Hình 16.3)",
      coreTakeaway: "Định luật lâm sàng vàng: Nhịp nhanh đều QRS hẹp 150 l/p -> Hãy nghi ngờ ngay cuồng nhĩ 2:1! Sóng F hình răng cưa không có đường đẳng điện phẳng ở DII, DIII, aVF.",
      pitfallToAvoid: "Một sóng F thường bị vùi lấp bên trong phức bộ QRS hoặc sóng T làm ta dễ nhìn lầm thành nhịp xoang 150 l/p. Xoa xoang cảnh sẽ làm bộc lộ trọn vẹn cả 2 sóng F!",
    },
  },
  {
    id: "case-severe-hypokalemia",
    category: "Electrolyte",
    title: "Hạ Kali Máu Nặng Kèm Sóng U Nổi Rõ - Hiệu Ứng Lưng Lạc Đà (Camel-Hump Effect)",
    subtitle: "Kali máu 2.1 mEq/L, ST chênh xuống, sóng T dẹt và sóng U nhô cao tạo hình ảnh 2 bướu lạc đà",
    severity: "Khẩn cấp",
    patient: {
      name: "Nguyễn Thị Lan",
      age: 45,
      gender: "Nữ",
      chiefComplaint: "Yếu liệt mềm tứ chi tăng dần không đi lại được, chuột rút bắp chân dữ dội, chướng bụng",
      clinicalHistory: "Bệnh nhân nữ 45 tuổi, tiền sử tự mua thuốc lợi tiểu Furosemide uống giảm cân liên tục 2 tuần nay, kèm tiêu chảy phân lỏng 3 ngày. Khám thấy cơ lực hai chi dưới giảm 2/5, mất phản xạ gân xương, bụng chướng hơi do liệt ruột cơ năng.",
      vitals: { bp: "100/60", hr: 62, spo2: 98, temp: 36.7 },
      labs: { k: 2.1, ca: 2.25, mg: 0.68, troponinI: "Âm tính" },
    },
    metrics: {
      heartRate: 62,
      rhythmType: "Nhịp xoang kèm biến đổi hạ Kali máu nặng (Sóng U khổng lồ, giả kéo dài QT)",
      regularity: "Đều",
      axis: "Trục trung gian",
      alphaAngle: 45,
      prInterval: 195,
      qrsDuration: 90,
      qt: 360,
      qtc: 366, // QT thực sự
    },
    leadsData: (() => {
      const leads = cloneNormalLeads();
      // Severe hypokalemia: ST depression, flat T wave, and giant prominent U wave creating camel-hump
      const midPrecordial: LeadName[] = ["V2", "V3", "V4", "V5", "II"];
      for (const l of midPrecordial) {
        leads[l].stSegment = { elevation: -0.09, slope: "downsloping" };
        leads[l].tWave = { amp: 0.08, dur: 0.12, shape: "flat" }; // T rất dẹt
        leads[l].uWave = { amp: 0.32, dur: 0.14 }; // Sóng U nhô cao gấp 3-4 lần sóng T!
      }
      return leads;
    })(),
    leadsSummary: {
      limbLeadsSummary: "DII, aVF: Đoạn ST chênh xuống nhẹ (0.8mm). Sóng T phẳng dẹt và sóng U xuất hiện rõ nét phía sau sóng T.",
      chestLeadsSummary: "V2, V3, V4: Sóng T hạ thấp gần như hòa lẫn vào đường đẳng điện, trong khi sóng U nhô cao vượt trội (0.32mV) theo ngay sau sóng T, tạo thành hình ảnh '2 bướu lưng lạc đà' (camel-hump pattern). Khoảng Q-U kéo dài tạo cảm giác giả kéo dài QT.",
    },
    diagnosis: {
      primary: "Hạ Kali Máu Mức Độ Nặng (Severe Hypokalemia - K+ 2.1 mEq/L) Kèm Sóng U Khổng Lồ",
      culpritVesselOrCause: "Mất kali ồ ạt qua đường tiêu hóa do tiêu chảy cấp kết hợp lạm dụng thuốc lợi tiểu quai làm tăng thải kali qua thận",
      differentials: [
        "Hội chứng QT kéo dài bẩm sinh hoặc do thuốc (sóng T thực sự kéo dài và rộng, không có sóng U phân tách)",
        "Thiếu máu cơ tim dưới nội tâm mạc (ST chênh xuống nhưng T thường âm nhọn đối xứng, không có sóng U nổi trội)",
        "Ngộ độc Digoxin (ST hình đáy chén Salvador Dali, QT ngắn lại)",
      ],
      keyFindings: [
        "Sóng T dẹt hoặc giảm biên độ thấp (< 1mm)",
        "Sóng U nhô cao nổi bật (biên độ > 1mm và lớn hơn biên độ sóng T đi trước), rõ nhất ở V2-V4",
        "Hiệu ứng 'lưng lạc đà' (camel-hump effect) do sóng T dẹt đứng cạnh sóng U nhô cao",
        "ST chênh xuống nhẹ (0.5 - 1.0mm)",
        "Giả kéo dài khoảng QT (thực chất là khoảng Q-U đo được lên đến 560-600ms)",
      ],
      clinicalNote: "Hạ kali máu nặng kéo dài thời gian tái cực màng tế bào cơ tim, tạo điều kiện thuận lợi cho cơ chế vòng vào lại và khởi phát các loạn nhịp thất chết người như xoắn đỉnh và rung thất.",
      treatment: [
        "Bù Kali tĩnh mạch khẩn trương qua đường truyền tĩnh mạch trung tâm hoặc ngoại vi có kiểm soát: KCl truyền tốc độ 10-20 mEq/giờ dưới theo dõi monitor liên tục.",
        "Đồng thời bù Magne Sulfate tĩnh mạch vì hạ Magne máu luôn đi kèm và cản trở hồi phục nồng độ Kali trong tế bào.",
        "Ngừng ngay lập tức các thuốc lợi tiểu làm mất kali.",
        "Theo dõi nồng độ Kali máu mỗi 2-4 giờ cho đến khi đạt mức an toàn > 3.5 mEq/L.",
      ],
      confidence: { primary: 99.0, secondaryName: "Hội chứng QT dài mắc phải", secondaryConfidence: 0.8 },
    },
    learningNotes: {
      chapterRef: "Atul Luthra - Chương 8 & 9: Abnormalities of T Wave & U Wave - Hypokalemia (Trang 90, 100-101, 105, 115-117, 122-123 - Hình 8.2, Hình 9.1)",
      coreTakeaway: "Bộ ba biến đổi ECG của Hạ Kali máu: 1. ST chênh xuống; 2. Sóng T dẹt; 3. Sóng U khổng lồ tạo hiệu ứng 'lưng lạc đà' (camel-hump) và giả kéo dài QT.",
      pitfallToAvoid: "Đừng đo nhầm khoảng Q-U thành khoảng Q-T kéo dài. Đo chính xác điểm kết thúc của sóng T trước khi sóng U bắt đầu sẽ thấy khoảng QT thực sự hoàn toàn bình thường!",
    },
  },
  {
    id: "case-ventricular-fibrillation",
    category: "Arrhythmia",
    title: "Rung Thất Sóng Lớn (Coarse Ventricular Fibrillation - VF) - Ngưng Tuần Hoàn",
    subtitle: "Sóng lăn tăn hỗn loạn vô tổ chức > 350 l/p, mất toàn bộ cấu trúc P-QRS-T, ngưng tuần hoàn đột tử",
    severity: "Nguy kịch",
    patient: {
      name: "Hoàng Văn Quý",
      age: 59,
      gender: "Nam",
      chiefComplaint: "Đột ngột gồng cứng, trợn mắt, mất ý thức, ngưng thở và ngừng tim tại phòng cấp cứu",
      clinicalHistory: "Bệnh nhân nam 59 tuổi, tiền sử hút thuốc lá nặng, vừa được đưa vào viện vì cơn đau thắt ngực dữ dội như xé sau xương ức giờ thứ 1. Trong lúc bác sĩ đang chuẩn bị điện tim thì bệnh nhân đột ngột co giật ngắn, mất mạch cảnh và mạch bẹn, đồng tử bắt đầu giãn.",
      vitals: { bp: "0/0", hr: 0, spo2: 0, temp: 36.5 },
      labs: { k: 4.1, ca: 2.3, mg: 0.85, troponinI: "Đang chờ kết quả khẩn" },
    },
    metrics: {
      heartRate: 400,
      rhythmType: "Rung thất sóng lớn (Coarse VF) - Ngưng tuần hoàn hô hấp",
      regularity: "Loạn nhịp hoàn toàn",
      axis: "Vô định",
      alphaAngle: 0,
      prInterval: 0,
      qrsDuration: 0,
      qt: 0,
      qtc: 0,
    },
    leadsData: (() => {
      const leads = cloneNormalLeads();
      // Chaotic fibrillatory waves with no identifiable P, QRS, or T
      const leadKeys: LeadName[] = ["I", "II", "III", "aVR", "aVL", "aVF", "V1", "V2", "V3", "V4", "V5", "V6"];
      for (const l of leadKeys) {
        leads[l].pWave = { amp: 0, dur: 0.01, shape: "flat" };
        leads[l].prSegment = { dur: 0.01 };
        leads[l].qWave = { amp: 0, dur: 0.01 };
        leads[l].rWave = { amp: 0.9, dur: 0.07 };
        leads[l].sWave = { amp: -0.8, dur: 0.07 };
        leads[l].stSegment = { elevation: 0.0, slope: "horizontal" };
        leads[l].tWave = { amp: 0.1, dur: 0.05, shape: "flat" };
      }
      return leads;
    })(),
    leadsSummary: {
      limbLeadsSummary: "Mất hoàn toàn mọi dạng sóng định hình P, QRS hay T. Thay thế bằng các dao động điện học hình sin gợn sóng hoàn toàn hỗn loạn, biên độ từ 0.5 đến 1.2 mV (rung thất sóng lớn), tần số > 350-450 chu kỳ/phút.",
      chestLeadsSummary: "V1-V6: Đường cơ bản liên tục chao đảo dữ dội, không thể nhận diện được bất kỳ phức bộ khử cực hay tái cực nào. Tâm thất không thể bơm máu.",
    },
    diagnosis: {
      primary: "Rung Thất Sóng Lớn (Coarse Ventricular Fibrillation - VF) / Ngừng Tuần Hoàn Đột Tử",
      culpritVesselOrCause: "Tắc nghẽn cấp tính nhánh thân chung (LMCA) hoặc đoạn gần động mạch vành LAD gây thiếu máu cơ tim tối cấp và phân rã điện học cơ tim thành vô số tiểu đảo kích thích độc lập",
      differentials: [
        "Cuồng thất (Ventricular Flutter) (sóng hình sin đều đặn và đồng dạng hơn)",
        "Nhiễu điện cơ do bệnh nhân run rẩy (Artifact) (vẫn sờ thấy mạch cảnh nẩy theo nhịp)",
        "Vô tâm thu (Asystole) (đường đẳng điện phẳng lì, biên độ < 0.1mV)",
      ],
      keyFindings: [
        "Mất hoàn toàn các sóng P, phức bộ QRS và sóng T có thể nhận dạng",
        "Đường đẳng điện chao đảo với các sóng biến thiên liên tục về biên độ, thời gian và hình dạng",
        "Tần số dao động rất nhanh (> 350 đến 500 chu kỳ/phút)",
        "Rung thất sóng lớn (biên độ > 0.5 mV) có khả năng sốc điện thành công cao hơn rung thất sóng nhỏ",
        "Lâm sàng ngừng tuần hoàn: Hôn mê, mất mạch cảnh/mạch bẹn, ngừng thở",
      ],
      clinicalNote: "Thời gian là mạng sống! Cứ mỗi 1 phút trì hoãn sốc điện khử rung, tỷ lệ cứu sống bệnh nhân rung thất giảm đi 7-10%. Sau 4 phút thiếu oxy não, tổn thương thần kinh không thể phục hồi.",
      treatment: [
        "GỌI HỖ TRỢ BÁO ĐỘNG ĐỎ CẤP CỨU NGỪNG TIM NGAY LẬP TỨC (Code Blue).",
        "Ép tim ngoài lồng ngực chất lượng cao ngay lập tức: Tần số 100-120 lần/phút, độ sâu 5-6 cm, tỷ lệ 30:2.",
        "SỐC ĐIỆN KHỬ RUNG KHÔNG ĐỒNG BỘ (Defibrillation) CÀNG SỚM CÀNG TỐT: Mức năng lượng 200 Joules (máy hai pha Biphasic) hoặc 360 Joules (máy đơn pha Monophasic).",
        "Tiếp tục CPR ngay trong 2 phút sau sốc điện mà không dừng lại kiểm tra mạch.",
        "Thuốc vận mạch: Adrenaline 1mg tiêm tĩnh mạch/trong xương mỗi 3-5 phút.",
        "Thuốc chống loạn nhịp: Amiodarone 300mg tiêm tĩnh mạch sau cú sốc thứ 3; nếu tái phát thêm 150mg.",
      ],
      confidence: { primary: 99.9 },
    },
    learningNotes: {
      chapterRef: "Atul Luthra - Chương 21: Fast Irregular Rhythm with Bizarre QRS - Ventricular Fibrillation (Trang 199-205, 215-220 - Hình 21.2)",
      coreTakeaway: "Rung thất là cấp cứu tối khẩn số 1 trong y khoa. Sốc điện khử rung không đồng bộ kết hợp CPR liên tục trong vòng 1-3 phút đầu là chìa khóa duy nhất cứu sống bệnh nhân!",
      pitfallToAvoid: "Đừng nhầm rung thất với nhiễu run cơ (Artifact). Luôn kiểm tra ngay mạch cảnh hoặc mạch bẹn: Nếu mất mạch -> Lập tức sốc điện và ép tim!",
    },
  },
  {
    id: "case-av-block-mobitz1",
    category: "Conduction",
    title: "Bloc Nhĩ Thất Độ II Mobitz I - Chu Kỳ Wenckebach (Mobitz Type I AV Block)",
    subtitle: "Khoảng PR dài dần theo từng nhát bóp cho đến khi rớt 1 phức bộ QRS, nhịp chậm không đều có chu kỳ",
    severity: "Cảnh giác cao",
    patient: {
      name: "Lê Văn Tuấn",
      age: 64,
      gender: "Nam",
      chiefComplaint: "Cảm giác thỉnh thoảng hụt hẫng nhịp trong lồng ngực, chóng mặt thoáng qua khi đứng dậy",
      clinicalHistory: "Bệnh nhân nam 64 tuổi, đang nằm điều trị ngày thứ 2 sau nhồi máu cơ tim cấp thành dưới đã can thiệp đặt stent RCA. Bệnh nhân tỉnh táo, tiếp xúc tốt, huyết áp ổn định 115/70 mmHg, cảm thấy thỉnh thoảng tim ngưng lại một nhịp.",
      vitals: { bp: "115/70", hr: 58, spo2: 98, temp: 36.6 },
      labs: { k: 4.2, ca: 2.3, mg: 0.85, troponinI: "3.2 ng/mL (giảm dần)" },
    },
    metrics: {
      heartRate: 58,
      rhythmType: "Bloc nhĩ thất độ II Mobitz I (Chu kỳ Wenckebach 4:3)",
      regularity: "Không đều có chu kỳ",
      axis: "Trục trung gian",
      alphaAngle: 60,
      prInterval: 260, // trung bình
      qrsDuration: 90,
      qt: 410,
      qtc: 402,
    },
    leadsData: (() => {
      const leads = cloneNormalLeads();
      // Mobitz I with progressive PR prolongation
      const leadKeys: LeadName[] = ["I", "II", "III", "aVR", "aVL", "aVF", "V1", "V2", "V3", "V4", "V5", "V6"];
      for (const l of leadKeys) {
        leads[l].pWave = { amp: 0.14, dur: 0.09, shape: "normal" };
        leads[l].prSegment = { dur: 0.14 }; // Progressive PR
        leads[l].rWave = { amp: l === "II" ? 1.4 : 1.0, dur: 0.04 };
        leads[l].stSegment = { elevation: 0.0, slope: "horizontal" };
        leads[l].tWave = { amp: 0.3, dur: 0.16, shape: "normal" };
        leads[l].qrsDuration = 90;
      }
      return leads;
    })(),
    leadsSummary: {
      limbLeadsSummary: "DII: Khoảng PR dài dần ra rõ rệt qua các nhát bóp kế tiếp (200ms -> 260ms -> 320ms) cho đến khi có một sóng P đi đơn độc hoàn toàn không có phức bộ QRS theo sau (nhát bóp bị rớt). Nhát bóp ngay sau khoảng nghỉ có khoảng PR ngắn nhất (200ms).",
      chestLeadsSummary: "V1-V6: Phức bộ QRS thanh mảnh bình thường (90ms) do vị trí tắc nghẽn nằm cao tại ngay cấu trúc nút nhĩ thất (AV node).",
    },
    diagnosis: {
      primary: "Bloc Nhĩ Thất Độ II Mobitz I - Chu Kỳ Wenckebach (Second-Degree AV Block Mobitz Type I)",
      culpritVesselOrCause: "Thiếu máu thoáng qua hoặc tăng trương lực phế vị tại nút nhĩ thất (AV node) sau nhồi máu cơ tim thành dưới (nhánh nuôi nút AV của ĐM vành phải RCA)",
      differentials: [
        "Bloc nhĩ thất độ II Mobitz II (Khoảng PR cố định trước khi rớt QRS, QRS thường dãn rộng, nguy cơ cao tiến triển bloc hoàn toàn)",
        "Ngoại tâm thu nhĩ bị nghẽn (Blocked APC) (sóng P đến sớm, dị dạng biến dạng sóng T đi trước)",
        "Bloc xoang nhĩ độ II (mất cả sóng P lẫn phức bộ QRS)",
      ],
      keyFindings: [
        "Khoảng PR dài dần ra qua từng chu kỳ tim liên tiếp",
        "Có một sóng P không dẫn truyền được sang tâm thất (rớt một phức bộ QRS)",
        "Sau nhát rớt, khoảng PR của nhát kế tiếp rút ngắn lại về mức bình thường hoặc gần bình thường",
        "Khoảng R-R có xu hướng ngắn dần trước khi nhát rớt xảy ra",
        "Phức bộ QRS thanh mảnh hẹp (< 100ms) vì vị trí tắc nghẽn xảy ra tại tầng nút nhĩ thất",
      ],
      clinicalNote: "Mobitz I (Wenckebach) hầu như luôn là tổn thương tại nút AV, có tiên lượng tốt, mang tính tự hồi phục sau vài ngày điều trị NMCT thành dưới, đáp ứng rất nhạy với Atropine và hiếm khi cần đặt máy tạo nhịp vĩnh viễn.",
      treatment: [
        "Nếu bệnh nhân không có triệu chứng và huyết áp ổn định: Tiếp tục theo dõi sát trên monitor phòng hồi sức tim mạch, không cần can thiệp cấp cứu.",
        "Nếu xuất hiện nhịp chậm có triệu chứng tụt huyết áp hoặc chóng mặt: Tiêm tĩnh mạch Atropine 0.5 - 1.0 mg (có thể lặp lại đến tổng liều 3mg).",
        "Rà soát và tạm ngừng các thuốc làm chậm dẫn truyền qua nút AV (thuốc chẹn beta, chẹn calci diltiazem/verapamil, digoxin).",
        "Rất hiếm khi cần đặt máy tạo nhịp tạm thời trừ khi có triệu chứng nặng không đáp ứng Atropine.",
      ],
      confidence: { primary: 98.9, secondaryName: "Bloc nhĩ thất độ II Mobitz II", secondaryConfidence: 1.0 },
    },
    learningNotes: {
      chapterRef: "Atul Luthra - Chương 15: Pauses During Regular Rhythm - Second-Degree AV Block Mobitz I (Trang 146-147, 161 - Hình 15.4)",
      coreTakeaway: "Quy luật Wenckebach: PR dài dần -> Rớt 1 QRS -> PR nhát sau ngắn lại. Tổn thương tại nút AV nên QRS hẹp, tiên lượng lành tính hơn nhiều so với Mobitz II!",
      pitfallToAvoid: "Đừng nhầm Mobitz I với Mobitz II. Mobitz II có PR cố định, vị trí block dưới nút His-Purkinje nên QRS thường rộng và có nguy cơ đột ngột chuyển thành bloc nhĩ thất hoàn toàn.",
    },
  },
];

export const CLINICAL_ECG_CASES = ECG_CASES;
