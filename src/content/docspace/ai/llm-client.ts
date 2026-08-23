import { AISettings, SBARRecord, LivingProtocol, PersonalProtocol, ProtocolStep } from '../types';
import { RAGChunk } from './rag-engine';
import { redactMedicalContext, redactSoapRecord } from './phi-redactor';

async function sendRequestToEndpoint(
  endpoint: string,
  model: string,
  apiKey: string | undefined,
  provider: string | undefined,
  messages: any[],
  temperature = 0.3
): Promise<string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json'
  };

  if (apiKey) {
    headers['Authorization'] = `Bearer ${apiKey}`;
  }

  // Provider specific headers
  if (provider === 'openrouter' || endpoint.includes('openrouter.ai')) {
    headers['HTTP-Referer'] = window.location.origin || 'https://cliniportal.local';
    headers['X-Title'] = 'CliniPortal DocSpace';
  }

  const cleanEndpoint = endpoint.replace(/\/$/, '');
  const url = cleanEndpoint.endsWith('/chat/completions')
    ? cleanEndpoint
    : `${cleanEndpoint}/chat/completions`;

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      model: model || 'llama-3.3-70b-versatile',
      messages,
      temperature,
    })
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => '');
    throw new Error(`LLM API Error (${response.status}): ${response.statusText}${errorText ? ' - ' + errorText : ''}`);
  }

  const data = await response.json();
  if (!data.choices || !data.choices[0] || !data.choices[0].message) {
    throw new Error('LLM Error: Phản hồi không đúng định dạng OpenAI Format.');
  }

  return data.choices[0].message.content;
}

async function fetchOpenAI(messages: any[], settings: AISettings, temperature = 0.3): Promise<string> {
  const { endpoint, model, apiKey, provider, fallbackEnabled, secondaryEndpoint, secondaryModel, secondaryApiKey, secondaryProvider } = settings;

  try {
    return await sendRequestToEndpoint(endpoint, model, apiKey, provider, messages, temperature);
  } catch (primaryErr: any) {
    console.warn('⚠️ Primary LLM Provider Error:', primaryErr.message);

    // Fallback Engine execution if enabled & secondary endpoint configured
    if (fallbackEnabled && secondaryEndpoint) {
      console.info('🔄 Retrying with Secondary LLM Provider (Fallback Engine)...');
      try {
        return await sendRequestToEndpoint(
          secondaryEndpoint,
          secondaryModel || 'gemini-2.0-flash',
          secondaryApiKey,
          secondaryProvider,
          messages,
          temperature
        );
      } catch (secondaryErr: any) {
        throw new Error(`Cả Provider chính & phụ đều thất bại:\n1. Primary: ${primaryErr.message}\n2. Secondary: ${secondaryErr.message}`);
      }
    }

    throw primaryErr;
  }
}

export async function generateSBAR(rawNotes: string, settings: AISettings): Promise<Partial<SBARRecord>> {
  if (!settings.enabled || !settings.endpoint) {
    throw new Error("AI chưa được cấu hình hoặc chưa bật. Vui lòng vào Cài đặt AI.");
  }

  const prompt = `Bạn là một trợ lý y khoa chuyên nghiệp.
Nhiệm vụ của bạn là đọc đoạn ghi chú lộn xộn sau đây và định dạng lại nó thành chuẩn SBAR (Situation, Background, Assessment, Recommendation).
Trả về kết quả dưới định dạng JSON thuần túy có 4 trường: "situation", "background", "assessment", "recommendation". Không thêm bất kỳ văn bản nào ngoài JSON. Nếu thiếu thông tin ở trường nào, hãy để trống hoặc ghi "Chưa rõ".

Ghi chú của bác sĩ:
${rawNotes}`;

  const messages = [
    { role: 'system', content: 'You are a helpful medical assistant. You only output valid JSON.' },
    { role: 'user', content: prompt }
  ];

  try {
    const content = await fetchOpenAI(messages, settings, 0.1);
    const cleanJson = content.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanJson);
  } catch (err: any) {
    console.error('generateSBAR Error', err);
    throw new Error("AI lỗi: " + err.message);
  }
}

export interface SBARCritiqueResult {
  score: number; // 1-10
  verdict: string; // Tóm tắt nhận xét
  redFlags: string[]; // Các lỗ hổng hoặc cờ đỏ lâm sàng
  recommendations: string[]; // Gợi ý bổ sung
  likelyQuestions: string[]; // 3 câu hỏi BS hội chẩn/lãnh đạo có thể hỏi
}

export async function critiqueSBARWithAI(
  sbar: { title?: string; situation?: string; background?: string; assessment?: string; recommendation?: string },
  settings: AISettings
): Promise<SBARCritiqueResult> {
  if (!settings.enabled || !settings.endpoint) {
    throw new Error("AI chưa được cấu hình hoặc chưa bật. Vui lòng vào Cài đặt AI.");
  }

  const prompt = `Bạn là một Bác sĩ Trưởng khoa Cấp cứu & Chuyên gia Giảng dạy Lâm sàng SBAR.
Nhiệm vụ của bạn là PHẢN BIỆN & KIỂM TRA ĐỘ AN TOÀN (Clinical SBAR Critique & Red Flags) cho báo cáo SBAR sau đây:

[TIÊU ĐỀ]: ${sbar.title || 'Không có tiêu đề'}
[S — SITUATION]: ${sbar.situation || 'Trống'}
[B — BACKGROUND]: ${sbar.background || 'Trống'}
[A — ASSESSMENT]: ${sbar.assessment || 'Trống'}
[R — RECOMMENDATION]: ${sbar.recommendation || 'Trống'}

Hãy đánh giá và phản hồi DUY NHẤT một chuỗi JSON hợp lệ (không kèm markdown \`\`\`json ở ngoài) với cấu trúc sau:
{
  "score": 8, // Thang điểm 1-10 về độ hoàn thiện, tính định lượng và an toàn
  "verdict": "Nhận xét tổng quan súc tích trong 1-2 câu",
  "redFlags": [
    "Cảnh báo lỗ hổng 1 (Ví dụ: Chưa nêu rõ chỉ số SpO2 có thở O2 hay không / Thiếu tiền sử dị ứng thuốc)",
    "Cảnh báo 2 (nếu có)"
  ],
  "recommendations": [
    "Gợi ý bổ sung 1 cho phần Recommendation (Ví dụ: Cần nêu rõ liều cụ thể mg thay vì chỉ ghi 'cho hạ áp')",
    "Gợi ý 2"
  ],
  "likelyQuestions": [
    "Câu hỏi 1 mà Bác sĩ trưởng tua / Bác sĩ chuyên khoa có thể chất vấn bạn",
    "Câu hỏi 2",
    "Câu hỏi 3"
  ]
}`;

  const messages = [
    { role: 'system', content: 'You are a Chief Clinical Resident and SBAR expert evaluator. You only output raw valid JSON.' },
    { role: 'user', content: prompt }
  ];

  try {
    const content = await fetchOpenAI(messages, settings, 0.2);
    const cleanJson = content.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(cleanJson);
    return {
      score: typeof parsed.score === 'number' ? Math.min(10, Math.max(1, parsed.score)) : 7,
      verdict: parsed.verdict || 'Báo cáo SBAR đã nêu được các ý chính.',
      redFlags: Array.isArray(parsed.redFlags) ? parsed.redFlags : [],
      recommendations: Array.isArray(parsed.recommendations) ? parsed.recommendations : [],
      likelyQuestions: Array.isArray(parsed.likelyQuestions) ? parsed.likelyQuestions : []
    };
  } catch (err: any) {
    console.error('critiqueSBARWithAI Error', err);
    throw new Error("Lỗi phản biện AI: " + err.message);
  }
}

export async function analyzeCase(caseData: string, settings: AISettings, contextChunks: RAGChunk[]): Promise<string> {
  if (!settings.enabled || !settings.endpoint) {
    throw new Error("AI chưa được cấu hình hoặc chưa bật. Vui lòng vào Cài đặt AI.");
  }

  let contextStr = "Không tìm thấy bằng chứng liên quan trong Kho Kiến Thức.";
  if (contextChunks.length > 0) {
    contextStr = contextChunks.map((c, i) => `--- TÀI LIỆU ${i+1}: ${c.title} (${c.specialty}) ---\n[Phần: ${c.heading}]\n${c.content}`).join('\n\n');
  }

  const prompt = `Bạn là một bác sĩ tư vấn cấp cao (Senior Consultant).
Hãy phân tích ca bệnh sau đây dựa trên KIẾN THỨC BẰNG CHỨNG ĐƯỢC CUNG CẤP. 
Nếu kiến thức được cung cấp không đủ, hãy dựa vào kiến thức y khoa chuẩn của bạn nhưng phải nói rõ "Theo y văn chung...".

[KIẾN THỨC BẰNG CHỨNG TỪ KHO CỦA BÁC SĨ (RAG)]:
${contextStr}

[CA BỆNH CỦA BÁC SĨ MỚI NHẬP]:
${caseData}

Yêu cầu:
1. Nhận diện các vấn đề chính (Problem List).
2. Gợi ý chẩn đoán sơ bộ / phân biệt.
3. Khuyến cáo hướng xử trí tiếp theo (ưu tiên dựa chặt chẽ vào bằng chứng được cung cấp).
Trình bày rõ ràng, súc tích bằng Tiếng Việt. Format bằng Markdown.`;

  const messages = [
    { role: 'system', content: 'You are an expert medical AI assistant. Answer in Vietnamese Markdown.' },
    { role: 'user', content: prompt }
  ];

  return fetchOpenAI(messages, settings, 0.3);
}

export async function analyzeDrugRegimen(drugs: string[], indication: string, settings: AISettings, contextChunks: RAGChunk[]): Promise<{ interactions: string[]; alternatives: string[] }> {
  if (!settings.enabled || !settings.endpoint) {
    throw new Error("AI chưa được cấu hình hoặc chưa bật. Vui lòng vào Cài đặt AI.");
  }

  let contextStr = "Không tìm thấy bằng chứng liên quan.";
  if (contextChunks.length > 0) {
    contextStr = contextChunks.map((c, i) => `[Tài liệu ${i+1}] ${c.title}: ${c.content}`).join('\n\n');
  }

  const prompt = `Bạn là một Dược sĩ lâm sàng. Hãy phân tích phác đồ thuốc sau đây:
Thuốc: ${drugs.join(', ')}
Chỉ định: ${indication}

[BẰNG CHỨNG HỖ TRỢ]:
${contextStr}

Nhiệm vụ:
1. Đánh giá tương tác thuốc (nếu có) và mức độ nghiêm trọng.
2. Đề xuất lựa chọn thay thế (nếu cần).
Trả về JSON với format chính xác: {"interactions": ["...", "..."], "alternatives": ["...", "..."]}`;

  const messages = [
    { role: 'system', content: 'You only output valid JSON.' },
    { role: 'user', content: prompt }
  ];

  try {
    const content = await fetchOpenAI(messages, settings, 0.2);
    const cleanJson = content.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanJson);
  } catch (err: any) {
    console.error('analyzeDrugRegimen Error', err);
    throw new Error("AI lỗi: " + err.message);
  }
}

export async function generateHandoverSummary(shiftData: string, settings: AISettings): Promise<string> {
  if (!settings.enabled || !settings.endpoint) {
    throw new Error("AI chưa được cấu hình hoặc chưa bật. Vui lòng vào Cài đặt AI.");
  }

  const prompt = `Bạn là một bác sĩ nội trú đang cần bàn giao ca trực. Hãy tổng hợp danh sách bệnh nhân sau thành báo cáo bàn giao.
Danh sách:
${shiftData}

Hãy viết tóm tắt ngắn gọn thành các gạch đầu dòng, tập trung vào những bệnh nhân nặng (Critical) và những việc cần làm tiếp theo. Dùng format Markdown.`;

  const messages = [
    { role: 'system', content: 'You are an expert medical assistant. Answer in Vietnamese Markdown.' },
    { role: 'user', content: prompt }
  ];

  return fetchOpenAI(messages, settings, 0.4);
}

async function sendStreamRequest(
  endpoint: string,
  model: string,
  apiKey: string | undefined,
  provider: string | undefined,
  messages: any[],
  onChunk: (chunk: string) => void,
  temperature = 0.3
): Promise<void> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json'
  };
  if (apiKey) headers['Authorization'] = `Bearer ${apiKey}`;
  if (provider === 'openrouter' || endpoint.includes('openrouter.ai')) {
    headers['HTTP-Referer'] = window.location.origin || 'https://cliniportal.local';
    headers['X-Title'] = 'CliniPortal DocSpace';
  }

  const cleanEndpoint = endpoint.replace(/\/$/, '');
  const url = cleanEndpoint.endsWith('/chat/completions')
    ? cleanEndpoint
    : `${cleanEndpoint}/chat/completions`;

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      model: model || 'llama-3.3-70b-versatile',
      messages,
      temperature,
      stream: true
    })
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => '');
    throw new Error(`LLM Stream Error (${response.status}): ${response.statusText}${errorText ? ' - ' + errorText : ''}`);
  }

  if (!response.body) {
    throw new Error('LLM Stream Error: Trình duyệt không hỗ trợ response.body ReadableStream.');
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder('utf-8');
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() || '';

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith(':')) continue;
      if (trimmed === 'data: [DONE]') continue;

      if (trimmed.startsWith('data: ')) {
        try {
          const jsonStr = trimmed.substring(6);
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content || '';
          if (content) {
            onChunk(content);
          }
        } catch {
          // Ignore partial or unparseable SSE line
        }
      }
    }
  }
}

export async function fetchOpenAIStream(
  messages: any[],
  settings: AISettings,
  onChunk: (chunk: string) => void,
  temperature = 0.3
): Promise<void> {
  const { endpoint, model, apiKey, provider, fallbackEnabled, secondaryEndpoint, secondaryModel, secondaryApiKey, secondaryProvider } = settings;

  try {
    await sendStreamRequest(endpoint, model, apiKey, provider, messages, onChunk, temperature);
  } catch (primaryErr: any) {
    console.warn('⚠️ Primary LLM Stream Error:', primaryErr.message);

    if (fallbackEnabled && secondaryEndpoint) {
      console.info('🔄 Retrying Stream with Secondary LLM Provider...');
      await sendStreamRequest(
        secondaryEndpoint,
        secondaryModel || 'gemini-2.0-flash',
        secondaryApiKey,
        secondaryProvider,
        messages,
        onChunk,
        temperature
      );
      return;
    }

    throw primaryErr;
  }
}

export interface SoapSuggestionContext {
  patientName: string;
  age: number | string;
  gender: string;
  admissionDiagnosis: string;
  currentDiagnosis?: string;
  pSubjective?: string;
  pObjective?: string;
  pAssessment?: string;
  pPlan?: string;
}

export async function generateSOAPSuggestion(
  field: 'subjective' | 'objective' | 'assessment' | 'plan',
  ctx: SoapSuggestionContext,
  settings: AISettings,
  onChunk?: (chunk: string) => void
): Promise<string> {
  if (!settings.enabled || !settings.endpoint) {
    throw new Error("AI chưa được cấu hình hoặc chưa bật. Vui lòng vào Cài đặt AI.");
  }

  const fieldLabels: Record<string, string> = {
    subjective: 'S — Subjective (Hỏi bệnh & Triệu chứng cơ năng)',
    objective: 'O — Objective (Khám lâm sàng & Cận lâm sàng)',
    assessment: 'A — Assessment (Đánh giá, Chẩn đoán sơ bộ & Vấn đề chính)',
    plan: 'P — Plan (Kế hoạch xử trí, Y lệnh thuốc, Xét nghiệm & Theo dõi)'
  };

  const prompt = `Bạn là một bác sĩ tư vấn lâm sàng chuyên nghiệp.
Hãy viết gợi ý bổ sung súc tích cho phần **${fieldLabels[field]}** trong bệnh án SOAP hằng ngày.

Thông tin bệnh nhân:
- Tên: ${ctx.patientName}, Tuổi: ${ctx.age}, Giới tính: ${ctx.gender}
- Chẩn đoán: ${ctx.currentDiagnosis || ctx.admissionDiagnosis}
- S (Hỏi bệnh hiện tại): ${ctx.pSubjective || 'Chưa có'}
- O (Khám & CLS hiện tại): ${ctx.pObjective || 'Chưa có'}
- A (Đánh giá hiện tại): ${ctx.pAssessment || 'Chưa có'}
- P (Kế hoạch hiện tại): ${ctx.pPlan || 'Chưa có'}

Yêu cầu:
1. Trọng tâm viết trực tiếp vào phần **${fieldLabels[field]}**.
2. Ngôn ngữ y khoa Việt Nam chuẩn mực, súc tích, dạng gạch đầu dòng.
3. Không lặp lại các phần khác. Dùng format Markdown.`;

  const messages = [
    { role: 'system', content: 'You are an expert clinical medical AI assistant. Output concise Vietnamese Markdown.' },
    { role: 'user', content: prompt }
  ];

  if (onChunk) {
    let fullText = '';
    await fetchOpenAIStream(messages, settings, (chunk) => {
      fullText += chunk;
      onChunk(chunk);
    }, 0.2);
    return fullText;
  } else {
    return fetchOpenAI(messages, settings, 0.2);
  }
}

export async function generateDischargeSummary(
  patient: any,
  dailyLogs: any[],
  settings: AISettings,
  onChunk?: (chunk: string) => void
): Promise<string> {
  if (!settings.enabled || !settings.endpoint) {
    throw new Error("AI chưa được cấu hình hoặc chưa bật. Vui lòng vào Cài đặt AI.");
  }

  const logsStr = (dailyLogs || []).map(l => 
    `[Ngày ${l.date} - Bệnh ngày N${l.dayOfIllness}]\n- S: ${l.sNotes || '—'}\n- O: ${l.oNotes || '—'}\n- A: ${l.aAssessment || '—'}\n- P: ${l.pPlan || '—'}`
  ).join('\n\n');

  const rxStr = (patient.prescriptions || []).map((r: any) => 
    `- ${r.name} ${r.dosage || ''} (${r.route || ''}) SL: ${r.quantity || '1'} — ${r.frequency || ''} ${r.instructions || ''}`
  ).join('\n');

  const prompt = `Bạn là một bác sĩ chuyên khoa phụ trách tổng hợp Tóm tắt Bệnh án Ra viện.
Hãy lập văn bản Tóm tắt Ra viện (Discharge Clinical Summary) chuẩn định dạng y tế dựa trên dữ liệu bệnh nhân sau:

[THÔNG TIN HÀNH CHÍNH & CHẨN ĐOÁN]:
- Bệnh nhân: ${patient.fullName || patient.patientCode}, ${patient.age} tuổi, Giới tính: ${patient.gender === 'nam' ? 'Nam' : 'Nữ'}
- Mã HS: ${patient.medicalRecordNo || patient.patientCode}, Số giường: ${patient.bedNumber}
- Chẩn đoán vào viện: ${patient.admissionDiagnosis}
- Chẩn đoán ra viện: ${patient.currentDiagnosis || patient.admissionDiagnosis}

[DIỄN TIẾN BỆNH PHÒNG THEO NGÀY (SOAP LOGS)]:
${logsStr || 'Không có nhật ký diễn tiến.'}

[ĐƠN THUỐC RA VIỆN]:
${rxStr || 'Chưa có đơn thuốc.'}

Yêu cầu định dạng xuất ra:
1. **Lý do vào viện & Quá trình bệnh lý** (Tóm tắt ngắn 2-3 câu).
2. **Tóm tắt Diễn tiến Lâm sàng & Cận lâm sàng chính** trong suốt quá trình điều trị.
3. **Chẩn đoán Ra viện cuối cùng** (Kèm mã ICD nếu có).
4. **Hướng điều trị tiếp theo & Lời dặn ra viện** (Đơn thuốc, tái khám, chế độ ăn).
Format bằng Markdown rõ ràng, chuẩn phong cách y khoa Việt Nam.`;

  const messages = [
    { role: 'system', content: 'You are an expert hospital medical consultant. Output a formal Vietnamese Medical Discharge Summary in Markdown.' },
    { role: 'user', content: prompt }
  ];

  if (onChunk) {
    let fullText = '';
    await fetchOpenAIStream(messages, settings, (chunk) => {
      fullText += chunk;
      onChunk(chunk);
    }, 0.2);
    return fullText;
  } else {
    return fetchOpenAI(messages, settings, 0.2);
  }
}

export async function analyzeDrugInteractionsWithAI(
  drugs: string[],
  settings: AISettings,
  onChunk?: (chunk: string) => void
): Promise<string> {
  if (!settings.enabled || !settings.endpoint) {
    throw new Error("AI chưa được cấu hình hoặc chưa bật. Vui lòng vào Cài đặt AI.");
  }

  const prompt = `Bạn là một Dược sĩ lâm sàng cấp cao.
Hãy phân tích tương tác thuốc toàn diện cho danh sách các thuốc sau:
${drugs.map((d, i) => `${i + 1}. ${d}`).join('\n')}

Nhiệm vụ:
1. Xác định TẤT CẢ các cặp tương tác thuốc có thể xảy ra (phân loại mức độ Nghiêm trọng: 🔴 Major, 🟡 Moderate, 🟢 Minor).
2. Giải thích chi tiết Cơ chế tương tác Dược lực học / Dược động học.
3. Biểu hiện lâm sàng cần theo dõi (Ví dụ: kéo dài khoảng QTc, nguy cơ nhiễm độc thận, hạ kali máu, tăng nguy cơ chảy máu...).
4. Hướng xử trí lâm sàng & Khuyến cáo điều chỉnh liều hoặc thuốc thay thế.

Trình bày bằng Markdown rõ ràng, súc tích bằng Tiếng Việt.`;

  const messages = [
    { role: 'system', content: 'You are a Senior Clinical Pharmacist. Output expert clinical drug interaction analysis in Vietnamese Markdown.' },
    { role: 'user', content: prompt }
  ];

  if (onChunk) {
    let fullText = '';
    await fetchOpenAIStream(messages, settings, (chunk) => {
      fullText += chunk;
      onChunk(chunk);
    }, 0.2);
    return fullText;
  } else {
    return fetchOpenAI(messages, settings, 0.2);
  }
}

export async function expandQueryWithAI(query: string, settings: AISettings): Promise<string[]> {
  if (!settings.enabled || !settings.endpoint) return [query];

  const prompt = `Bạn là một trợ lý AI Y khoa. Với từ khóa tìm kiếm y học: "${query}", hãy mở rộng thêm 4-6 thuật ngữ đồng nghĩa y khoa chuyên sâu, tên tiếng Anh, chữ viết tắt, hoặc tên triệu chứng/bệnh lý liên quan.
Trả về JSON array thuần túy chứa danh sách các chuỗi từ khóa. Không kèm văn bản giải thích.
Ví dụ: ["suy tim", "heart failure", "HFrEF", "khó thở khi nằm", "NYHA"]`;

  const messages = [
    { role: 'system', content: 'You only output valid JSON string array.' },
    { role: 'user', content: prompt }
  ];

  try {
    const raw = await fetchOpenAI(messages, settings, 0.1);
    const cleanJson = raw.replace(/```json/g, '').replace(/```/g, '').trim();
    const arr = JSON.parse(cleanJson);
    if (Array.isArray(arr)) {
      return Array.from(new Set([query, ...arr.map(s => String(s).trim()).filter(Boolean)]));
    }
  } catch (err) {
    console.warn('[RAG Expansion AI] Lỗi mở rộng query:', err);
  }
  return [query];
}

export async function synthesizeRAGAnswer(
  query: string,
  chunks: RAGChunk[],
  settings: AISettings,
  onChunk?: (chunk: string) => void
): Promise<string> {
  if (!settings.enabled || !settings.endpoint) {
    throw new Error("AI chưa được cấu hình hoặc chưa bật. Vui lòng vào Cài đặt AI.");
  }

  let contextStr = "Không tìm thấy tài liệu nguồn phù hợp.";
  if (chunks.length > 0) {
    contextStr = chunks.map((c, i) => `--- NGUỒN ${i + 1}: ${c.title} (${c.specialty}) ---\n[Mục: ${c.heading}]\n${c.content}`).join('\n\n');
  }

  const prompt = `Bạn là một Bác sĩ Tư vấn Y học Bằng chứng (EBM Consultant).
Hãy tổng hợp câu trả lời cho thắc mắc lâm sàng: "${query}" dựa trên BẰNG CHỨNG Y HỌC ĐƯỢC CUNG CẤP dưới đây:

${contextStr}

Yêu cầu:
1. Trả lời trực tiếp, chính xác, cấu trúc rõ ràng.
2. Trích dẫn nguồn ngay cuối mỗi ý (Ví dụ: [Nguồn 1: Bệnh học Suy Tim]).
3. Nếu nguồn không chứa đủ thông tin, bổ sung kiến thức y văn chung nhưng ghi rõ "(Bổ sung từ y văn chung)".
Format bằng Tiếng Việt Markdown.`;

  const messages = [
    { role: 'system', content: 'You are an expert Evidence-Based Medical AI Consultant. Output Markdown in Vietnamese.' },
    { role: 'user', content: prompt }
  ];

  if (onChunk) {
    let fullText = '';
    await fetchOpenAIStream(messages, settings, (chunk) => {
      fullText += chunk;
      onChunk(chunk);
    }, 0.2);
    return fullText;
  } else {
    return fetchOpenAI(messages, settings, 0.2);
  }
}

export async function generateClinicalScenario(
  specialty: string,
  difficulty: 'easy' | 'medium' | 'hard',
  settings: AISettings,
  onChunk?: (chunk: string) => void
): Promise<string> {
  if (!settings.enabled || !settings.endpoint) {
    throw new Error("AI chưa được cấu hình hoặc chưa bật. Vui lòng vào Cài đặt AI.");
  }

  const difficultyText = difficulty === 'easy' ? 'Cơ bản (Sinh viên Y)' : difficulty === 'medium' ? 'Trung bình (Bác sĩ Nội trú)' : 'Nâng cao (Chuyên khoa/Cấp cứu)';

  const prompt = `Bạn là một Giám khảo Lâm sàng Y khoa (OSCE Clinical Examiner).
Hãy tạo một **Ca bệnh Lâm sàng Mô phỏng (OSCE Scenario)** chuyên khoa **${specialty}**, mức độ **${difficultyText}**.

Yêu cầu cấu trúc xuất ra (dạng Markdown):
1. **🏥 Bệnh cảnh Lâm sàng (Case Scenario)**:
   - Thông tin hành chính (Tuổi, giới, lý do vào viện).
   - Bệnh sử & Tiền sử.
   - Dấu hiệu sinh tồn & Khám thực thể.
   - Kết quả Cận lâm sàng (Xét nghiệm máu, X-quang/ECG/Siêu âm nếu có).
2. **❓ 3 Câu hỏi Lâm sàng Thử thách**:
   - Câu 1: Chẩn đoán sơ bộ & phân biệt chính.
   - Câu 2: Đề xuất cận lâm sàng hoặc xử trí cấp cứu ban đầu.
   - Câu 3: Chọn lựa thuốc & liều lượng / Hướng theo dõi tiếp theo.
3. **🔑 Đáp án & Thang điểm Chấm (Examiner Key)**.

Viết bằng Tiếng Việt chuẩn y khoa.`;

  const messages = [
    { role: 'system', content: 'You are an expert Medical OSCE Examiner. Output structured clinical scenario in Vietnamese Markdown.' },
    { role: 'user', content: prompt }
  ];

  if (onChunk) {
    let fullText = '';
    await fetchOpenAIStream(messages, settings, (chunk) => {
      fullText += chunk;
      onChunk(chunk);
    }, 0.3);
    return fullText;
  } else {
    return fetchOpenAI(messages, settings, 0.3);
  }
}

export async function generateProtocolFromDescription(
  description: string,
  settings: AISettings
): Promise<LivingProtocol> {
  if (!settings.enabled || !settings.endpoint) {
    throw new Error("AI chưa được cấu hình hoặc chưa bật. Vui lòng vào Cài đặt AI.");
  }

  const prompt = `Bạn là một Kiến trúc sư Hệ thống Y khoa.
Dựa vào mô tả phác đồ: "${description}"
Hãy sinh cấu trúc JSON của một LivingProtocol đúng chuẩn định dạng TypeScript interface sau:

interface BranchPath { condition: string; label: string; go_to: string; }
interface LivingProtocolNode {
  id: string;
  type: 'lookup' | 'branch' | 'result';
  label: string;
  lookup_var?: string;
  formula_static?: string;
  unit?: string;
  note?: string;
  branch_var?: string;
  branches?: BranchPath[];
  lookup_table?: Record<string, string>;
}
interface LivingProtocol {
  id: string;
  title: string;
  inputs: string[];
  steps: LivingProtocolNode[];
}

Yêu cầu: Trả về JSON thuần túy 100%, không kèm bất kỳ lời giải thích nào. id phải là chuỗi rút gọn không dấu (VD: "vancomycin-dosing", "crcl-calc").`;

  const messages = [
    { role: 'system', content: 'You only output valid JSON matching LivingProtocol interface.' },
    { role: 'user', content: prompt }
  ];

  const raw = await fetchOpenAI(messages, settings, 0.1);
  const cleanJson = raw.replace(/```json/g, '').replace(/```/g, '').trim();
  const protocol: LivingProtocol = JSON.parse(cleanJson);
  if (!protocol.id || !protocol.title || !Array.isArray(protocol.steps)) {
    throw new Error("Cấu trúc JSON phác đồ từ AI không hợp lệ.");
  }
  return protocol;
}

export async function summarizeAndTagNoteWithAI(
  title: string,
  content: string,
  settings: AISettings
): Promise<{ summary: string; tags: string[] }> {
  if (!settings.enabled || !settings.endpoint) {
    throw new Error("AI chưa được cấu hình hoặc chưa bật. Vui lòng vào Cài đặt AI.");
  }

  const prompt = `Bạn là một trợ lý AI Y khoa.
Hãy đọc ghi chú cá nhân sau đây của bác sĩ:
Tiêu đề: ${title}
Nội dung: ${content}

Nhiệm vụ:
1. Rút gọn nội dung thành tóm tắt 2-3 câu súc tích.
2. Gợi ý 3-5 tags từ khóa ngắn gọn, không dấu hoặc viết liền (Ví dụ: ["icu", "van_mach", "cap_cuu", "dieu_tri"]).

Trả về JSON với format chính xác: {"summary": "...", "tags": ["...", "..."]}`;

  const messages = [
    { role: 'system', content: 'You only output valid JSON with summary and tags.' },
    { role: 'user', content: prompt }
  ];

  const raw = await fetchOpenAI(messages, settings, 0.1);
  const cleanJson = raw.replace(/```json/g, '').replace(/```/g, '').trim();
  return JSON.parse(cleanJson);
}

export async function generateHandoverPriority(
  pendingTasks: { emr: any[]; soap: any[]; cls: any[] },
  settings: AISettings,
  onChunk?: (chunk: string) => void
): Promise<string> {
  if (!settings.enabled || !settings.endpoint) {
    throw new Error("AI chưa được cấu hình hoặc chưa bật. Vui lòng vào Cài đặt AI.");
  }

  const emrStr = pendingTasks.emr.map(p => `- BN ${p.fullName} (${p.patientCode}), Giường ${p.bedNumber}: Chưa nhập EMR`).join('\n');
  const soapStr = pendingTasks.soap.map(p => `- BN ${p.fullName} (${p.patientCode}), Giường ${p.bedNumber}: Chưa làm SOAP hôm nay`).join('\n');
  const clsStr = pendingTasks.cls.map(i => `- BN ${i.p.fullName} (${i.p.patientCode}), Giường ${i.p.bedNumber}: Chỉ định [${i.o.name}] đang chờ kết quả`).join('\n');

  const prompt = `Bạn là Bác sĩ Trưởng tua trực (Chief Resident).
Hãy phân tích danh sách các công việc còn tồn đọng trong ca trực dưới đây và lập Báo cáo Phân loại Ưu tiên (Priority Shift Report):

[CHỈ ĐỊNH CẬN LÂM SÀNG ĐANG CHỜ]:
${clsStr || 'Không có.'}

[HỒ SƠ BỆNH NHÂN CHƯA LÀM SOAP HÔM NAY]:
${soapStr || 'Không có.'}

[HỒ SƠ CHƯA NHẬP EMR]:
${emrStr || 'Không có.'}

Yêu cầu phân loại (dạng Markdown):
1. 🔴 **NHÓM 1: CỰC KỲ ƯU TIÊN / NGUY CƠ CAO** (Chỉ định CLS quan trọng hoặc bệnh nhân nặng chưa làm SOAP).
2. 🟡 **NHÓM 2: CẦN HOÀN THÀNH TRONG CA TRỰC** (SOAP thường, CLS chờ kết quả routine).
3. 🟢 **NHÓM 3: HOÀN THIỆN THỦ TỤC HÀNH CHÍNH** (Nhập EMR).
4. 📌 **Gợi ý 3 hành động khẩn cấp đầu tiên cho bác sĩ ca trực.**`;

  const messages = [
    { role: 'system', content: 'You are a Chief Resident Doctor. Output priority shift report in Vietnamese Markdown.' },
    { role: 'user', content: prompt }
  ];

  if (onChunk) {
    let fullText = '';
    await fetchOpenAIStream(messages, settings, (chunk) => {
      fullText += chunk;
      onChunk(chunk);
    }, 0.2);
    return fullText;
  } else {
    return fetchOpenAI(messages, settings, 0.2);
  }
}

export async function testConnection(endpoint: string, model: string, apiKey?: string, provider?: string): Promise<string> {
  const testMessages = [
    { role: 'user', content: 'Ping test. Output single word: OK' }
  ];
  return sendRequestToEndpoint(endpoint, model, apiKey, provider, testMessages, 0.1);
}

export interface ExtractedProtocolData {
  title: string;
  specialty?: string;
  steps: ProtocolStep[];
  warnings?: string[];
  references?: string[];
}

/**
 * Trích xuất bản thảo Phác đồ Điều trị Cá nhân (Personal Protocol) từ Ca bệnh SOAP bằng AI
 */
export async function extractProtocolFromSOAP(
  soapData: {
    diagnosis: string;
    sNotes?: string;
    oNotes?: string;
    aAssessment?: string;
    pPlan?: string;
    prescriptions?: any[];
  },
  settings: AISettings
): Promise<ExtractedProtocolData> {
  if (!settings.enabled || !settings.endpoint) {
    throw new Error("AI chưa được cấu hình hoặc chưa bật. Vui lòng vào Cài đặt AI.");
  }

  // Bảo vệ PHI trước khi gửi AI
  const cleanData = redactMedicalContext(soapData);

  const rxList = (cleanData.prescriptions || []).map((rx: any) => 
    `- ${rx.name} ${rx.dosage || ''} (${rx.route || 'Uống'}) ${rx.frequency || ''}`
  ).join('\n');

  const prompt = `Bạn là một Chuyên gia Cố vấn Y khoa cấp cao (Senior Clinical Consultant & EBM Expert).
Nhiệm vụ của bạn là phân tích ca bệnh lâm sàng SOAP thực tế dưới đây và TRÍCH XUẤT/CHUẨN HÓA thành một PHÁC ĐỒ ĐIỀU TRỊ CÁ NHÂN (Personal Clinical Protocol) có cấu trúc mạch lạc, chuẩn y khoa:

[THÔNG TIN CA BỆNH SOAP ĐÃ ẨN DANH]:
- Chẩn đoán chính: ${cleanData.diagnosis || 'Chưa rõ'}
- S (Hỏi bệnh & Triệu chứng): ${cleanData.sNotes || '—'}
- O (Khám & Cận lâm sàng): ${cleanData.oNotes || '—'}
- A (Đánh giá & Vấn đề chính): ${cleanData.aAssessment || '—'}
- P (Kế hoạch xử trí & Y lệnh): ${cleanData.pPlan || '—'}
${rxList ? `\n[ĐƠN THUỐC ĐÃ KÊ]:\n${rxList}` : ''}

YÊU CẦU TRẢ VỀ:
Chỉ trả về DUY NHẤT một chuỗi JSON hợp lệ (không kèm markdown \`\`\`json ở ngoài) với cấu trúc sau:
{
  "title": "Tên phác đồ súc tích và chuẩn y khoa (VD: Phác đồ Xử trí Cơn hen phế quản cấp trung bình - nặng)",
  "specialty": "Tên chuyên khoa tương ứng (VD: Hô hấp, Cấp cứu, Tim mạch, Hồi sức, Nhi khoa...)",
  "steps": [
    { "order": 1, "text": "Bước 1: Đánh giá dấu hiệu nguy kịch, đảm bảo thông khí & thở oxy...", "isAlert": true },
    { "order": 2, "text": "Bước 2: Phun khí dung thuốc giãn phế quản liều...", "isAlert": false },
    { "order": 3, "text": "Bước 3: Sử dụng Corticosteroid toàn thân sớm...", "isAlert": false }
  ],
  "warnings": [
    "Lưu ý chống chỉ định hoặc dấu hiệu cờ đỏ cần can thiệp đặt NKQ",
    "Theo dõi sát nhịp tim và khí máu động mạch sau 30-60 phút"
  ],
  "references": [
    "GINA 2024 / Hướng dẫn Bộ Y tế về Xử trí Hen",
    "Surviving Sepsis Campaign / Hội Hồi sức Cấp cứu"
  ]
}`;

  const messages = [
    { role: 'system', content: 'You are an expert clinical medical consultant. You ONLY output raw, valid JSON object matching the requested schema.' },
    { role: 'user', content: prompt }
  ];

  try {
    const raw = await fetchOpenAI(messages, settings, 0.1);
    const cleanJson = raw.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(cleanJson);

    // Validate structure
    return {
      title: parsed.title || `Phác đồ xử trí ${cleanData.diagnosis || 'Lâm sàng'}`,
      specialty: parsed.specialty || 'Nội khoa',
      steps: Array.isArray(parsed.steps) && parsed.steps.length > 0 
        ? parsed.steps.map((s: any, idx: number) => ({
            order: s.order || idx + 1,
            text: String(s.text || ''),
            isAlert: Boolean(s.isAlert)
          }))
        : [
            { order: 1, text: 'Đánh giá sinh hiệu và tình trạng toàn thân (ABC)', isAlert: true },
            { order: 2, text: `Xử trí theo kế hoạch: ${cleanData.pPlan || 'Theo dõi lâm sàng'}`, isAlert: false }
          ],
      warnings: Array.isArray(parsed.warnings) ? parsed.warnings.map(String) : [],
      references: Array.isArray(parsed.references) ? parsed.references.map(String) : []
    };
  } catch (err: any) {
    console.error('extractProtocolFromSOAP Error:', err);
    throw new Error('Không thể trích xuất phác đồ từ ca SOAP: ' + err.message);
  }
}

