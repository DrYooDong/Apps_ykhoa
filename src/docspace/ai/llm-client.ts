import { AISettings, SBARRecord } from '../types';
import { RAGChunk } from './rag-engine';

async function fetchOpenAI(messages: any[], settings: AISettings, temperature = 0.3) {
  const { endpoint, model, apiKey } = settings;
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json'
  };
  
  if (apiKey) {
    headers['Authorization'] = `Bearer ${apiKey}`;
  }

  const response = await fetch(`${endpoint.replace(/\/$/, '')}/chat/completions`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      model: model || 'local-model',
      messages,
      temperature,
    })
  });

  if (!response.ok) {
    throw new Error(`LLM Error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
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
