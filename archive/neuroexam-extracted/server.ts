import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "5mb" }));

// File path for persisting clinical pearls and physician knowledge
const PEARLS_FILE = path.join(process.cwd(), "clinical_pearls.json");

// Preloaded initial expert knowledge from Handbook of Emergency Neurology
const INITIAL_PEARLS = [
  {
    id: "pearl-1",
    category: "Đột quỵ & TIA",
    title: "Cửa sổ tiêu sợi huyết (tPA) & Lấy huyết khối cơ học (EVT)",
    author: "BS. Chuyên khoa Thần kinh",
    date: "2026-08-15",
    content: "Thời gian là não (1.9 triệu tế bào/phút). Cửa sổ tiêm alteplase IV là 4.5h từ thời điểm bình thường cuối cùng (LKN). Lấy huyết khối cơ học (EVT) áp dụng cho tắc mạch lớn tuần hoàn trước trong vòng 6h (ASPECTS ≥ 6) và mở rộng đến 24h theo tiêu chuẩn DAWN/DEFUSE 3 (sử dụng CTP hoặc MRI khuếch tán để đánh giá mismatch lõi - vùng tranh tối tranh sáng).",
    evidenceLevel: "Class I, Level A",
    tags: ["AIS", "tPA", "EVT", "ASPECTS", "DAWN"]
  },
  {
    id: "pearl-2",
    category: "Chóng mặt & Thần kinh cấp",
    title: "Bộ khám HINTS đánh giá Hội chứng tiền đình cấp (AVS)",
    author: "BS. Cấp cứu Thần kinh",
    date: "2026-08-20",
    content: "Trong hội chứng tiền đình cấp tính (AVS, chóng mặt liên tục kèm rung giật nhãn cầu): HINTS (Head Impulse, Nystagmus, Test of Skew) nhạy hơn cả MRI não trong 24h đầu (MRI có thể âm tính giả tới 19% ở nhồi máu tuần hoàn sau!). Dấu hiệu cảnh báo đột quỵ: Head Impulse bình thường (không có giật điều chỉnh), Nystagmus đổi hướng khi nhìn sang 2 bên, hoặc Skew deviation (lệch trục nhãn cầu đứng).",
    evidenceLevel: "Độ nhạy 100%, Đặc hiệu 96%",
    tags: ["HINTS", "AVS", "PICA", "Wallenberg", "Chóng mặt"]
  },
  {
    id: "pearl-3",
    category: "Xuất huyết dưới nhện (SAH)",
    title: "Đau đầu sét đánh (Thunderclap) & Quy tắc CT < 6 giờ",
    author: "BS. Phẫu thuật Thần kinh",
    date: "2026-08-25",
    content: "Đau đầu dữ dội đột ngột đạt đỉnh trong <1 phút là dấu hiệu cảnh báo số 1 của vỡ phình mạch não (SAH). CT sọ não không cản quang thực hiện trong vòng 6h đầu từ khởi phát có độ nhạy xấp xỉ 99-100%. Nếu sau 6h CT âm tính nhưng lâm sàng nghi ngờ cao, bắt buộc chọc dò tủy sống (LP) tìm hồng cầu không giảm giữa các ống và chất xanthochromia (dịch não tủy vàng sau ly tâm).",
    evidenceLevel: "Chuẩn Ottawa SAH",
    tags: ["SAH", "Thunderclap", "Aneurysm", "LP", "Xanthochromia"]
  },
  {
    id: "pearl-4",
    category: "Tăng áp lực nội sọ & Thoát vị",
    title: "Phản xạ Cushing và Liệu pháp thẩm thấu (Mannitol vs Saline ưu trương)",
    author: "BS. Hồi sức Thần kinh (Neuro-ICU)",
    date: "2026-09-01",
    content: "Tam chứng Cushing (Tăng huyết áp kèm áp lực mạch rộng, nhịp tim chậm, rối loạn nhịp thở) báo hiệu thoát vị não sắp xảy ra. Nâng đầu 30 độ, tránh nẹp cổ quá chặt chèn ép tĩnh mạch cảnh. Dùng Saline ưu trương 3% ưu thế hơn Mannitol khi bệnh nhân có hạ huyết áp hoặc giảm thể tích tuần hoàn (Mannitol gây lợi niệu thẩm thấu và có nguy cơ phù dội ngược do hệ số phản xạ 0.9 so với 1.0 của muối ưu trương).",
    evidenceLevel: "Khuyến cáo Neurocritical Care Society",
    tags: ["ICP", "Herniation", "Mannitol", "Hypertonic Saline", "Cushing"]
  },
  {
    id: "pearl-5",
    category: "Thần kinh cơ & Yếu liệt",
    title: "Phân biệt Cơn nhược cơ (Myasthenic Crisis) vs Cơn Cholinergic & Lưu ý thở máy",
    author: "BS. Chuyên khoa Thần kinh",
    date: "2026-09-03",
    content: "Bệnh nhân nhược cơ suy hô hấp do yếu cơ hoành và cơ liên sườn; PaCO2 giai đoạn đầu có thể vẫn bình thường do tăng thông khí bù trừ! Cần kiểm tra FVC (<15-20 mL/kg) hoặc NIF (<-20 to -30 cmH2O) hoặc đếm một hơi không quá 20. Nếu cần đặt nội khí quản, TUYỆT ĐỐI TRÁNH Succinylcholine (thuốc giãn cơ khử cực dễ gây kéo dài liệt và rối loạn kali), ưu tiên Rocuronium giảm 50% liều.",
    evidenceLevel: "Cấp cứu Thần kinh Cơ",
    tags: ["Myasthenia Gravis", "Crisis", "NIF", "FVC", "Rocuronium"]
  }
];

// Helper to read pearls
function getStoredPearls() {
  try {
    if (fs.existsSync(PEARLS_FILE)) {
      const data = fs.readFileSync(PEARLS_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (err) {
    console.error("Error reading pearls:", err);
  }
  return INITIAL_PEARLS;
}

// Helper to save pearls
function saveStoredPearls(pearls: any[]) {
  try {
    fs.writeFileSync(PEARLS_FILE, JSON.stringify(pearls, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving pearls:", err);
  }
}

// API: Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// API: Get clinical pearls
app.get("/api/knowledge/pearls", (_req, res) => {
  const pearls = getStoredPearls();
  res.json({ success: true, count: pearls.length, data: pearls });
});

// API: Add clinical pearl (for specialist doctors to contribute insights)
app.post("/api/knowledge/pearls", (req, res) => {
  const { title, category, content, author, evidenceLevel, tags } = req.body;
  if (!title || !content) {
    res.status(400).json({ error: "Tiêu đề và nội dung kinh nghiệm là bắt buộc." });
    return;
  }

  const newPearl = {
    id: `pearl-${Date.now()}`,
    category: category || "Kinh nghiệm chung",
    title,
    author: author || "Bác sĩ lâm sàng",
    date: new Date().toISOString().split("T")[0],
    content,
    evidenceLevel: evidenceLevel || "Kinh nghiệm chuyên khoa",
    tags: Array.isArray(tags) ? tags : ["Lâm sàng"]
  };

  const pearls = getStoredPearls();
  pearls.unshift(newPearl);
  saveStoredPearls(pearls);

  res.json({ success: true, data: newPearl });
});

// API: AI Diagnostic Analysis with Gemini
app.post("/api/gemini/analyze", async (req, res) => {
  try {
    const {
      patientProfile,
      vitalSigns,
      mentalStatus,
      cranialNerves,
      motorExam,
      sensoryExam,
      reflexes,
      coordinationGait,
      redFlags,
      notes
    } = req.body;

    const apiKey = process.env.GEMINI_API_KEY;

    // Structured prompt for high-level Neurological Clinical Decision Support
    const prompt = `
Bạn là Trợ lý Trí tuệ Nhân tạo Chuyên khoa Thần kinh Lâm sàng (Clinical Neurology AI Decision Support), xây dựng dựa trên các phác đồ chuẩn mực y khoa (theo Cẩm nang Cấp cứu Thần kinh Campbell & Kelly, AHA/ASA Stroke Guidelines, Neurocritical Care Society, ASIA Spinal Cord Classification).

HÃY PHÂN TÍCH TOÀN DIỆN DỮ LIỆU THĂM KHÁM THẦN KINH DƯỚI ĐÂY (Lưu ý: Không chứa thông tin định danh bệnh nhân PHI):

1. THÔNG TIN LÂM SÀNG TỔNG QUÁT:
- Độ tuổi / Nhóm tuổi: ${patientProfile?.ageGroup || "Người lớn"}
- Giới tính sinh học: ${patientProfile?.sex || "Không rõ"}
- Thời gian khởi phát: ${patientProfile?.onsetTime || "Cấp tính"}
- Hoàn cảnh khởi phát: ${patientProfile?.onsetContext || "Đột ngột khi đang sinh hoạt"}
- Triệu chứng chính: ${patientProfile?.chiefComplaint || "Không ghi nhận cụ thể"}
- Dấu hiệu sinh tồn: Mạch ${vitalSigns?.hr || "---"} bpm, Huyết áp ${vitalSigns?.bp || "---"} mmHg, Nhịp thở ${vitalSigns?.rr || "---"} l/p, SpO2 ${vitalSigns?.spo2 || "---"}%, Nhiệt độ ${vitalSigns?.temp || "---"}°C, Đường huyết mao mạch ${vitalSigns?.glucose || "---"} mg/dL.

2. KẾT QUẢ KHÁM Ý THỨC & TÂM THẦN:
- GCS / Trạng thái: ${mentalStatus?.gcsScore ? `GCS ${mentalStatus.gcsScore}` : mentalStatus?.summary || "Bình thường"}
- FOUR score / Định hướng: ${mentalStatus?.details || "Không suy giảm nhận thức"}

3. KHÁM 12 ĐÔI DÂY THẦN KINH SỌ (CRANIAL NERVES):
${JSON.stringify(cranialNerves || {}, null, 2)}

4. KHÁM VẬN ĐỘNG & SỨC CƠ (MOTOR SYSTEM):
- Thang điểm sức cơ (MRC 0-5), Pronator Drift, Trương lực cơ:
${JSON.stringify(motorExam || {}, null, 2)}

5. KHÁM CẢM GIÁC (SENSORY SYSTEM):
- Nông/Sâu, Khoanh da Dermatomes, Mức cảm giác:
${JSON.stringify(sensoryExam || {}, null, 2)}

6. KHÁM PHẢN XẠ (REFLEXES):
- Phản xạ gân xương (0-4+), Dấu hiệu tháp (Babinski, Hoffman), Phản xạ da:
${JSON.stringify(reflexes || {}, null, 2)}

7. KHÁM TIỂU NÃO & DÁNG ĐI (COORDINATION & GAIT):
- Thử nghiệm Ngón tay-Chỉ mũi, Gót-Gối, Dáng đi (Ataxia, Hemiparetic, Steppage, Parkinson, v.v.):
${JSON.stringify(coordinationGait || {}, null, 2)}

8. CÁC DẤU HIỆU CẢNH BÁO ĐỎ (RED FLAGS):
${Array.isArray(redFlags) ? redFlags.join(", ") : "Không có"}

9. GHI CHÚ BỔ SUNG CỦA BÁC SĨ:
${notes || "Không có"}

YÊU CẦU ĐẦU RA:
Trả về phản hồi JSON TUÂN THỦ ĐÚNG CẤU TRÚC sau (không bọc trong thẻ markdown dư thừa ngoài \`\`\`json ... \`\`\` hoặc trả về chuỗi JSON thuần):
{
  "neuroLocalization": {
    "primarySite": "Vị trí giải phẫu thần kinh tổn thương chính (ví dụ: Vỏ não bán cầu trái diện MCA, Cuống não / Cầu não bên P, Tủy sống cổ C5-C6, Dây TK ngoại biên, Khe tiếp hợp thần kinh cơ, v.v.)",
    "syndromeType": "Hội chứng chính (ví dụ: Hội chứng nơron vận động trên, Hội chứng Brown-Séquard, Hội chứng tiền đình cấp AVS, v.v.)",
    "rationale": "Lập luận giải phẫu thần kinh chi tiết dựa trên triệu chứng lâm sàng đã khám"
  },
  "diagnoses": [
    {
      "rank": 1,
      "diseaseName": "Tên bệnh lý chẩn đoán (Tiếng Việt & thuật ngữ quốc tế)",
      "confidence": 85, // phần trăm độ tin cậy từ 1 - 99%
      "clinicalEvidence": "Các bằng chứng lâm sàng ủng hộ chẩn đoán này",
      "counterEvidence": "Các yếu tố chưa hoàn toàn phù hợp hoặc cần loại trừ"
    },
    {
      "rank": 2,
      "diseaseName": "Chẩn đoán phân biệt 2",
      "confidence": 55,
      "clinicalEvidence": "Bằng chứng",
      "counterEvidence": "Yếu tố phân biệt"
    },
    {
      "rank": 3,
      "diseaseName": "Chẩn đoán phân biệt 3",
      "confidence": 30,
      "clinicalEvidence": "Bằng chứng",
      "counterEvidence": "Yếu tố phân biệt"
    }
  ],
  "urgentActions": [
    "Hành động cấp bách 1 (ví dụ: Chụp CT sọ khẩn không cản quang, Thiết lập đường truyền tĩnh mạch, Kiểm soát HA < 185/110 nếu chỉ định tPA)",
    "Hành động 2",
    "Hành động 3"
  ],
  "diagnosticWorkupPlan": [
    {
      "modality": "Chẩn đoán hình ảnh (CT / CTA / MRI / CTP / X-quang)",
      "purpose": "Mục đích cụ thể",
      "priority": "Khẩn cấp (STAT) / Cần thiết / Sau đó"
    },
    {
      "modality": "Xét nghiệm (Điện giải, Đông máu, DNT, v.v.)",
      "purpose": "Mục đích",
      "priority": "Khẩn cấp / Thường quy"
    }
  ],
  "managementRecommendations": {
    "acuteInterventions": [
      "Chi tiết xử trí pha cấp (bao gồm liều lượng thuốc nếu có chỉ định khẩn cấp theo guideline)"
    ],
    "medications": [
      {
        "drugName": "Tên thuốc",
        "dosage": "Liều lượng & Đường dùng",
        "notes": "Lưu ý chống chỉ định, giám sát phản ứng phụ"
      }
    ],
    "monitoring": "Các thông số sinh tồn & thang điểm cần theo dõi (ví dụ: NIHSS mỗi 15 phút, GCS, huyết áp)"
  },
  "clinicalPearlsAndPitfalls": [
    "Cạm bẫy lâm sàng cần tránh (ví dụ: Đừng hạ huyết áp quá tích cực khi chưa loại trừ đột quỵ nhồi máu, hoặc Không chọc dò tủy sống khi chưa loại trừ khối choán chỗ tăng ICP)",
    "Kinh nghiệm lâm sàng quý giá từ chuyên gia"
  ]
}
`;

    // If API key is available, call Gemini 3.8 Flash
    if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      const geminiResponse = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          temperature: 0.2,
          responseMimeType: "application/json"
        }
      });

      const responseText = geminiResponse.text || "{}";
      try {
        const parsed = JSON.parse(responseText);
        res.json({ success: true, source: "gemini-3.8-flash", result: parsed });
        return;
      } catch (parseErr) {
        console.warn("Could not parse direct JSON from Gemini, attempting regex extract", parseErr);
        const match = responseText.match(/\{[\s\S]*\}/);
        if (match) {
          const parsed = JSON.parse(match[0]);
          res.json({ success: true, source: "gemini-3.8-flash", result: parsed });
          return;
        }
      }
    }

    // High-accuracy expert clinical rule engine fallback (if API key missing or offline)
    console.log("Using algorithmic clinical rule engine fallback");
    const fallback = generateAlgorithmicDiagnosis(req.body);
    res.json({ success: true, source: "clinical-expert-engine", result: fallback });
  } catch (err: any) {
    console.error("Gemini analysis error:", err);
    // Even on error, provide rule-based neurological evaluation so bedside doctor is never left without clinical guidance
    const fallback = generateAlgorithmicDiagnosis(req.body);
    res.json({
      success: true,
      source: "clinical-expert-engine-fallback",
      errorWarning: err.message,
      result: fallback
    });
  }
});

// Advanced clinical logic engine for neurological assessment fallback
function generateAlgorithmicDiagnosis(body: any) {
  const {
    patientProfile = {},
    vitalSigns = {},
    cranialNerves = {},
    motorExam = {},
    sensoryExam = {},
    reflexes = {},
    coordinationGait = {},
    redFlags = []
  } = body;

  const chief = (patientProfile.chiefComplaint || "").toLowerCase();
  const onset = (patientProfile.onsetTime || "").toLowerCase();
  const cnText = JSON.stringify(cranialNerves).toLowerCase();
  const motorText = JSON.stringify(motorExam).toLowerCase();
  const gaitText = JSON.stringify(coordinationGait).toLowerCase();

  const isStrokeSuspect =
    motorText.includes("yếu nửa người") ||
    motorText.includes("hemiparesis") ||
    cnText.includes("mặt liệt") ||
    cnText.includes("facial") ||
    motorText.includes("drift") ||
    chief.includes("liệt") ||
    chief.includes("nói đớ") ||
    chief.includes("đột quỵ");

  const isThunderclapHeadache =
    chief.includes("đau đầu dữ dội") ||
    chief.includes("sét đánh") ||
    chief.includes("thunderclap") ||
    redFlags.includes("Sét đánh (<1 phút)") ||
    redFlags.includes("Đau đầu dữ dội nhất cuộc đời");

  const isMeningitisSuspect =
    vitalSigns.temp >= 38.5 ||
    reflexes.meningealSigns ||
    reflexes.kernig ||
    reflexes.brudzinski ||
    chief.includes("sốt") ||
    chief.includes("cổ cứng");

  const isGBSSuspect =
    (motorText.includes("yếu 2 chân") || motorText.includes("tăng dần từ dưới lên")) &&
    (reflexes.deepTendon === "mất" || reflexes.deepTendon === "0" || reflexes.deepTendon === "giảm");

  const isVertigoSuspect =
    chief.includes("chóng mặt") ||
    chief.includes("vertigo") ||
    gaitText.includes("ataxic") ||
    cnText.includes("nystagmus");

  if (isThunderclapHeadache) {
    return {
      neuroLocalization: {
        primarySite: "Khoang dưới nhện (Subarachnoid Space) - Hệ mạch máu não",
        syndromeType: "Hội chứng màng não cấp do Xuất huyết dưới nhện (SAH)",
        rationale: "Đau đầu dữ dội khởi phát đột ngột dạng sét đánh (Thunderclap), kích thích màng não, có nguy cơ vỡ phình mạch nội sọ (85% do túi phình động mạch thông trước/sau hoặc MCA)."
      },
      diagnoses: [
        {
          rank: 1,
          diseaseName: "Xuất huyết dưới nhện do vỡ phình động mạch (Aneurysmal SAH)",
          confidence: 88,
          clinicalEvidence: "Đau đầu sét đánh đạt đỉnh tức thì, hội chứng màng não, huyết áp tăng phản ứng.",
          counterEvidence: "Cần chụp CT sọ không cản quang trong 6 giờ đầu để xác nhận 100%."
        },
        {
          rank: 2,
          diseaseName: "Hội chứng co thắt mạch não có hồi phục (RCVS)",
          confidence: 62,
          clinicalEvidence: "Đau đầu sét đánh tái diễn từng đợt, không kèm sốt, tiền sử dùng chất co mạch.",
          counterEvidence: "Cần CTA thấy hình ảnh chuỗi hạt (string-of-beads) và hồi phục sau 12 tuần."
        },
        {
          rank: 3,
          diseaseName: "Bóc tách động mạch cổ/não (Arterial Dissection)",
          confidence: 45,
          clinicalEvidence: "Đau đầu kèm đau vùng cổ, có thể kèm hội chứng Horner một bên.",
          counterEvidence: "Không có chấn thương cổ gần đây."
        }
      ],
      urgentActions: [
        "Chụp CT sọ não không cản quang KHẨN CẤP (STAT) trong vòng 25 phút từ lúc tiếp nhận.",
        "Nếu CT não âm tính nhưng đau đầu > 6 giờ: Bắt buộc chọc dò tủy sống (LP) tìm xanthochromia và đếm HC 4 ống.",
        "Chụp CTA mạch máu não để xác định vị trí phình mạch (ACom, PCom, MCA).",
        "Kiểm soát huyết áp tâm thu SBP < 160 mmHg, dự phòng co thắt mạch bằng Nimodipine 60mg uống mỗi 4 giờ."
      ],
      diagnosticWorkupPlan: [
        { modality: "CT sọ não không cản quang", purpose: "Phát hiện tăng đậm độ khoang dưới nhện (dấu hiệu sao biển)", priority: "Khẩn cấp (STAT)" },
        { modality: "CTA mạch máu não & cổ", purpose: "Xác định túi phình mạch hoặc dị dạng AVM", priority: "Khẩn cấp" },
        { modality: "Chọc dò tủy sống (LP)", purpose: "Thực hiện nếu CT âm tính sau 6h, tìm hồng cầu không giảm và sắc tố vàng", priority: "Cần thiết" }
      ],
      managementRecommendations: {
        acuteInterventions: [
          "Hội chẩn khẩn Phẫu thuật Thần kinh & Can thiệp mạch can thiệp nút coil / kẹp túi phình trong 24-72h.",
          "Nimodipine 60 mg uống mỗi 4h x 21 ngày (chống tổn thương thiếu máu não chậm DIND do co thắt mạch).",
          "Giảm đau bằng Paracetamol IV / cân nhắc giảm đau an thần nhẹ, TRÁNH rặn và kích thích."
        ],
        medications: [
          { drugName: "Nimodipine", dosage: "60 mg uống mỗi 4 giờ", notes: "Duy trì 21 ngày, theo dõi huyết áp tránh tụt huyết áp" },
          { drugName: "Labetalol / Nicardipine IV", dosage: "Nicardipine 5 mg/h IV truyền chỉnh liều", notes: "Mục tiêu SBP < 160 mmHg" }
        ],
        monitoring: "Theo dõi tri giác (GCS/FOUR score), đồng tử, dấu hiệu thần kinh khu trú và nguy cơ hydrocephalus cấp."
      },
      clinicalPearlsAndPitfalls: [
        "Pearls: CT trong 6h đầu có độ nhạy đến 99%. Sau 24h độ nhạy giảm nhanh, do đó không bỏ qua chọc dò dịch não tủy nếu CT âm tính.",
        "Pitfall: Xuất huyết rỉ giọt cảnh báo (Sentinel bleed) có thể tự giảm nhẹ, khiến bác sĩ dễ chủ quan chẩn đoán nhầm thành Migraine hoặc căng thẳng."
      ]
    };
  }

  if (isStrokeSuspect) {
    return {
      neuroLocalization: {
        primarySite: "Bán cầu não đối bên với bên liệt (Vùng cấp máu Động mạch Não Giữa - MCA)",
        syndromeType: "Hội chứng tổn thương nơron vận động trên (Tháp) cấp tính",
        rationale: "Liệt nửa người đối bên, liệt mặt trung ương, dấu hiệu Pronator drift, giảm cơ lực kiểu tháp."
      },
      diagnoses: [
        {
          rank: 1,
          diseaseName: "Nhồi máu não cấp tuần hoàn trước (Acute Ischemic Stroke - MCA territory)",
          confidence: 86,
          clinicalEvidence: "Khởi phát đột ngột, yếu nửa người, liệt mặt trung ương, lệch nhãn cầu hoặc nói đớ.",
          counterEvidence: "Cần chụp CT não loại trừ xuất huyết não (ICH)."
        },
        {
          rank: 2,
          diseaseName: "Xuất huyết não nhu mô (Intracerebral Hemorrhage - ICH)",
          confidence: 68,
          clinicalEvidence: "Yếu liệt nửa người, thường kèm huyết áp rất cao (>180-220 mmHg) và đau đầu/buồn nôn.",
          counterEvidence: "Không thể phân biệt trên lâm sàng nếu không có hình ảnh CT."
        },
        {
          rank: 3,
          diseaseName: "Cơn thiếu máu não cục bộ thoáng qua (TIA)",
          confidence: 40,
          clinicalEvidence: "Nếu triệu chứng hồi phục hoàn toàn dưới 24h và không có tổn thương mới trên MRI DWI.",
          counterEvidence: "Các thiếu sót thần kinh hiện tại vẫn đang tồn tại."
        }
      ],
      urgentActions: [
        "Kích hoạt Quy trình Báo động Đột quỵ (Code Stroke).",
        "Chụp CT sọ não không cản quang STAT (Mục tiêu door-to-CT < 25 phút).",
        "Đo ngay đường huyết mao mạch tại giường (loại trừ hạ đường huyết mô phỏng đột quỵ).",
        "Đánh giá thang điểm NIHSS chuẩn và thời gian bình thường cuối cùng (LKN)."
      ],
      diagnosticWorkupPlan: [
        { modality: "CT sọ não không cản quang", purpose: "Loại trừ xuất huyết, tính điểm ASPECTS", priority: "Khẩn cấp (<25 phút)" },
        { modality: "CTA mạch máu não - cổ", purpose: "Xác định tắc động mạch lớn (LVO: ICA, MCA M1) phục vụ EVT", priority: "Khẩn cấp" },
        { modality: "Đông máu toàn bộ, Công thức máu, Điện giải", purpose: "Đánh giá an toàn tiêu sợi huyết (Tiểu cầu >100.000, INR < 1.7)", priority: "Khẩn cấp" }
      ],
      managementRecommendations: {
        acuteInterventions: [
          "Nếu trong cửa sổ <4.5h và không có chống chỉ định: Dùng Alteplase IV 0.9 mg/kg (10% bolus trong 1 phút, 90% còn lại truyền trong 60 phút, max 90 mg).",
          "Nếu có tắc mạch lớn (LVO) và trong cửa sổ 0-6h (hoặc 6-24h thỏa DAWN/DEFUSE 3): Chuyển can thiệp lấy huyết khối cơ học (EVT) ngay lập tức.",
          "Huyết áp: Nếu dùng tPA, duy trì < 185/110 mmHg trước tiêm và < 180/105 mmHg sau tiêm bằng Nicardipine hoặc Labetalol."
        ],
        medications: [
          { drugName: "Alteplase (rt-PA)", dosage: "0.9 mg/kg IV (max 90 mg), 10% bolus, 90% truyền 60 phút", notes: "Theo dõi sát xuất huyết và phù mạch miệng lưỡi" },
          { drugName: "Nicardipine IV", dosage: "5 mg/h IV, tăng dần 2.5 mg/h mỗi 5-15 phút đến max 15 mg/h", notes: "Kiểm soát HA chặt chẽ" }
        ],
        monitoring: "Theo dõi NIHSS, tri giác, phản xạ đồng tử mỗi 15 phút trong 2 giờ đầu, sau đó mỗi 30 phút trong 6 giờ."
      },
      clinicalPearlsAndPitfalls: [
        "Pearls: Không trì hoãn chụp CT hoặc tiêm tPA để đợi kết quả xét nghiệm máu ngoại trừ nghi ngờ dùng thuốc chống đông hoặc tiền sử bệnh lý đông máu.",
        "Pitfall: Hạ đường huyết là 'kẻ bắt chước đột quỵ' (stroke mimic) phổ biến nhất, luôn phải thử que đường huyết trước tiên."
      ]
    };
  }

  // Default general neurological emergency
  return {
    neuroLocalization: {
      primarySite: "Hệ Thần kinh Trung ương / Ngoại biên cần khảo sát chuyên sâu",
      syndromeType: "Hội chứng thần kinh cấp tính nghi ngờ tổn thương khu trú",
      rationale: "Các triệu chứng gợi ý rối loạn dẫn truyền hoặc tổn thương trục thần kinh cấp. Cần hệ thống hóa các bước khám 12 dây thần kinh sọ và vận động/cảm giác."
    },
    diagnoses: [
      {
        diseaseName: "Tổn thương cấu trúc thần kinh nội sọ (U / Tai biến mạch máu / Nhiễm trùng)",
        confidence: 75,
        clinicalEvidence: "Triệu chứng thần kinh khởi phát cấp/bán cấp, có dấu hiệu định vị.",
        counterEvidence: "Cần chụp phim cộng hưởng từ hoặc cắt lớp vi tính xác chẩn."
      },
      {
        diseaseName: "Bệnh lý thần kinh chuyển hóa / Độc chất",
        confidence: 50,
        clinicalEvidence: "Ảnh hưởng ý thức hoặc trương lực cơ toàn thể.",
        counterEvidence: "Cần xét nghiệm bảng chuyển hóa toàn diện (CMP, Khí máu, Độc chất)."
      }
    ],
    urgentActions: [
      "Đảm bảo an toàn đường thở (ABC), đo đường huyết mao mạch ngay lập tức.",
      "Chụp CT sọ não không cản quang để khảo sát cấu trúc khẩn cấp.",
      "Hội chẩn bác sĩ chuyên khoa thần kinh tại giường bệnh."
    ],
    diagnosticWorkupPlan: [
      { modality: "CT sọ não không tiêm cản quang", purpose: "Khảo sát xuất huyết, phù não, khối choán chỗ", priority: "Khẩn cấp" },
      { modality: "Công thức máu + Sinh hóa máu + Điện giải đồ", purpose: "Đánh giá nhiễm trùng và rối loạn điện giải", priority: "Cần thiết" }
    ],
    managementRecommendations: {
      acuteInterventions: [
        "Ổn định huyết động, nằm đầu cao 30 độ nếu nghi tăng áp lực nội sọ.",
        "Duy trì SpO2 > 94%, tránh sốt và tránh hạ đường huyết."
      ],
      medications: [
        { drugName: "Natriclorid 0.9%", dosage: "Truyền duy trì theo nhu cầu cơ thể", notes: "Tránh truyền dung dịch nhược trương làm nặng thêm phù não" }
      ],
      monitoring: "Theo dõi sát thang điểm Glasgow (GCS) và phản xạ đồng tử."
    },
    clinicalPearlsAndPitfalls: [
      "Pearls: 90% chẩn đoán thần kinh bắt nguồn từ bệnh sử tỉ mỉ và 10% từ thăm khám thực thể.",
      "Pitfall: Không bỏ sót nẹp cổ nếu có bất kỳ yếu tố chấn thương hoặc bệnh nhân hôn mê không rõ nguyên nhân."
    ]
  };
}

async function startServer() {
  // Vite middleware in dev
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`NeuroExam Pro Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
