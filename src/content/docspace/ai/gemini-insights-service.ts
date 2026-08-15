/**
 * DocSpace — Dedicated Google Gemini Insights Service (Cluster 5)
 * Cung cấp kết nối trực tiếp client-side với Google Generative AI (Gemini 2.5 Flash, 2.0 Flash, 1.5 Flash).
 * Chuyên trách:
 * - Kiểm tra & tự động nhận diện Model Gemini
 * - Sinh Báo cáo Tóm tắt Tuần Lâm sàng (Weekly Clinical Summary)
 * - Đánh giá rủi ro áp lực & Bảo vệ sức khỏe nghề nghiệp (Doctor Wellness Guardian)
 * - Mở rộng truy vấn ngữ nghĩa cho EBM Bridge 2.0
 */

import { PracticeAnalyticsData } from '../types';

export const CANDIDATE_GEMINI_MODELS = [
  'gemini-2.5-flash-lite',
  'gemini-2.0-flash',
  'gemini-1.5-flash-latest',
  'gemini-1.5-flash',
  'gemini-3.7-flash',
  'gemini-3.5-flash',
];

let detectedGeminiModel: string | null = null;

export interface GeminiTestResult {
  success: boolean;
  model: string;
  latencyMs: number;
  message?: string;
}

/**
 * Tự động dò tìm model Gemini khả dụng với API Key được cung cấp
 */
export async function discoverWorkingGeminiModel(apiKey: string): Promise<string> {
  if (detectedGeminiModel) return detectedGeminiModel;

  for (const model of CANDIDATE_GEMINI_MODELS) {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`;
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey,
        },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: 'Ping' }] }],
          generationConfig: { maxOutputTokens: 5, temperature: 0.1 },
        }),
      });

      if (res.ok) {
        detectedGeminiModel = model;
        return model;
      }
    } catch {
      // Continue to next model candidate
    }
  }

  return 'gemini-2.0-flash';
}

/**
 * Kiểm tra kết nối API Key và đo độ trễ mạng
 */
export async function testGeminiConnection(apiKey: string): Promise<GeminiTestResult> {
  const cleanKey = (apiKey || '').trim();
  if (!cleanKey) {
    return {
      success: false,
      model: '',
      latencyMs: 0,
      message: 'API Key trống. Vui lòng dán Google Gemini API Key.',
    };
  }

  const startTime = Date.now();
  try {
    const model = await discoverWorkingGeminiModel(cleanKey);
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(cleanKey)}`;
    
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': cleanKey,
      },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: 'Hi, return standard OK string only.' }] }],
        generationConfig: { maxOutputTokens: 10, temperature: 0.1 },
      }),
    });

    const latencyMs = Date.now() - startTime;

    if (res.ok) {
      detectedGeminiModel = model;
      return {
        success: true,
        model,
        latencyMs,
        message: `Kết nối thành công với ${model} (${latencyMs}ms)`,
      };
    }

    const errText = await res.text();
    let errMsg = errText;
    try {
      const errObj = JSON.parse(errText);
      if (errObj.error?.message) errMsg = errObj.error.message;
    } catch {}

    if (res.status === 400 && (errMsg.includes('API_KEY_INVALID') || errMsg.includes('not valid'))) {
      return {
        success: false,
        model,
        latencyMs,
        message: 'API Key không hợp lệ. Vui lòng lấy key mới từ Google AI Studio (aistudio.google.com).',
      };
    }

    return {
      success: false,
      model,
      latencyMs,
      message: `Lỗi kết nối API (${res.status}): ${errMsg}`,
    };
  } catch (err: any) {
    return {
      success: false,
      model: '',
      latencyMs: Date.now() - startTime,
      message: `Lỗi mạng hoặc kết nối: ${err.message}`,
    };
  }
}

/**
 * Gọi Gemini Generate Content dạng Text
 */
export async function callGeminiText(prompt: string, apiKey: string, temperature = 0.3): Promise<string> {
  const cleanKey = (apiKey || '').trim();
  if (!cleanKey) {
    throw new Error('Chưa cấu hình Gemini API Key. Vui lòng vào Cài đặt AI hoặc nhập Key trong Dashboard.');
  }

  const model = await discoverWorkingGeminiModel(cleanKey);
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(cleanKey)}`;

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': cleanKey,
    },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        temperature,
        maxOutputTokens: 2500,
      },
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    let errMsg = errText;
    try {
      const errObj = JSON.parse(errText);
      if (errObj.error?.message) errMsg = errObj.error.message;
    } catch {}
    throw new Error(`Gemini API Error (${res.status}): ${errMsg}`);
  }

  const resJson = await res.json();
  const text = resJson.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new Error('Gemini không trả về nội dung hợp lệ.');
  }

  return text;
}

/**
 * Sinh Bản Tóm Tắt Tuần Lâm Sàng & Tư vấn Sức Khỏe Nghề Nghiệp (E2)
 */
export async function generateWeeklyClinicalSummaryWithGemini(
  analytics: PracticeAnalyticsData,
  doctorName: string,
  specialty: string,
  apiKey: string
): Promise<string> {
  const topDiagStr = analytics.topDiagnoses.slice(0, 5).map(d => `- **${d.name}**: ${d.count} ca (${d.percentage}%)`).join('\n');
  const contextStr = analytics.contextDistribution.map(c => `- ${c.label}: ${c.count} ca (${c.percentage}%)`).join('\n');
  const burnout = analytics.burnout;

  const prompt = `Bạn là Trợ lý Cố vấn Y khoa kiêm Chuyên gia Sức khỏe Nghề nghiệp Y tế (Doctor Wellness & Clinical Advisor) trên nền tảng CliniPortal DocSpace.

Hãy tạo một **Bản Tổng kết Tuần Lâm sàng & Giữ gìn Sức khỏe Nghề nghiệp (Weekly Clinical Pulse & Wellness Report)** dành riêng cho:
- Bác sĩ: **${doctorName}**
- Chuyên khoa: **${specialty || 'Nội khoa Lâm sàng'}**

---
[SỐ LIỆU THỰC HÀNH TUẦN VỪA QUA]:
- Tổng số lượt xử trí lâm sàng: ${analytics.totalEncounters}
- Số ca trực (OnCall shifts) trong tuần: ${burnout.metrics.shiftsThisWeek} (Streak: ${analytics.weeklyDutyStreak} tuần liên tục)
- Số bệnh án SOAP đã ghi: ${burnout.metrics.soapsThisWeek}
- Độ dài trung bình mỗi ghi chú SOAP: ~${burnout.metrics.avgSoapWordCount} từ/ghi chú
- Số ca bệnh nặng/nguy kịch (Critical Flags): ${burnout.metrics.criticalPatientsCount}
- Tỷ lệ bàn giao SBAR chuẩn hóa: ${analytics.sbarRatio}%
- Top 5 mặt bệnh thường gặp nhất:
${topDiagStr || '- Chưa có dữ liệu ghi nhận mặt bệnh nổi bật.'}
- Phân bố bối cảnh tiếp nhận:
${contextStr || '- Đang cập nhật.'}

[ĐÁNH GIÁ ÁP LỰC & CHỈ SỐ KIỆT SỨC TỰ ĐỘNG]:
- Mức độ áp lực: **${burnout.title}** (Điểm áp lực: ${burnout.score}/100)
- Tín hiệu cảnh báo: ${burnout.reasons.join('; ') || 'Khối lượng công việc ổn định.'}

---
YÊU CẦU ĐỊNH DẠNG XUẤT RA:
Trình bày bằng **Tiếng Việt Markdown chuẩn mực, sinh động, trang nhã, giàu tính thấu cảm và động viên nhưng rất sắc sảo về mặt y khoa**:

1. 🌟 **Bức tranh Toàn cảnh Tuần qua (1 đoạn ngắn súc tích)**: Tóm lược nhịp độ công việc, điểm sáng chuyên môn và khối lượng tiếp nhận.
2. 🩺 **Mặt bệnh Nổi bật & Bằng chứng Cần Lưu ý (Gạch đầu dòng)**: Nhận xét nhanh về 2-3 bệnh lý chiếm ưu thế trong tuần (ví dụ lưu ý phác đồ, theo dõi tương tác thuốc hoặc guideline cập nhật).
3. 🛡️ **Bảo vệ Sức khỏe Bác sĩ & Phòng ngừa Kiệt sức (Doctor Wellness Guardian)**:
   - Nếu áp lực cao/trung bình (nhiều ca trực hoặc ghi chép SOAP ngắn bất thường do mệt mỏi): Đưa ra 2-3 lời khuyên thiết thực (phân bổ giấc ngủ sau trực, dinh dưỡng bù nước, kỹ thuật bàn giao giảm tải tâm lý).
   - Nếu áp lực bình ổn: Động viên duy trì nhịp sinh học và streak thực hành.
4. 🎯 **Mục tiêu Tuần mới**: 1 thông điệp truyền cảm hứng ngắn gọn.`;

  return callGeminiText(prompt, apiKey, 0.3);
}

/**
 * Trích xuất từ khóa EBM thông minh từ đoạn văn bản SOAP (E3)
 */
export async function extractContextualGuidelineKeywordsWithGemini(
  soapSnippet: string,
  apiKey: string
): Promise<string[]> {
  const prompt = `Bạn là một hệ thống phân tích thực thể y khoa (Medical NER).
Hãy trích xuất danh sách 3-5 từ khóa y khoa chuẩn (tên bệnh lý, hội chứng, hoặc mã ICD-10) từ đoạn ghi chú lâm sàng sau để phục vụ tra cứu Guideline Y học chứng cứ (EBM).

Ghi chú lâm sàng:
"""
${soapSnippet}
"""

Chỉ trả về JSON thuần túy có dạng mảng chuỗi string: ["viêm phổi", "ARDS", "suy hô hấp"]. Không thêm bất kỳ giải thích nào khác.`;

  try {
    const raw = await callGeminiText(prompt, apiKey, 0.1);
    const clean = raw.replace(/```json/g, '').replace(/```/g, '').trim();
    const arr = JSON.parse(clean);
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}
