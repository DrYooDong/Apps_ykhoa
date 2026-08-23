/**
 * Gemini CRCE Client - DocSpace
 * Module chuyên dụng giao tiếp với Google Gemini API (v1beta) cho Chuỗi Phản Ứng Lâm Sàng
 * Hỗ trợ:
 * - Structured Output (JSON Schema)
 * - Streaming Content
 * - In-memory Session Caching (5 phút)
 * - Auto-Retry with Exponential Backoff
 */

import { getActiveProfile, getProfile } from '../storage';

export const DEFAULT_GEMINI_API_KEY = '';
export const DEFAULT_GEMINI_MODEL = 'gemini-2.0-flash';

// Bộ nhớ đệm phiên làm việc để tránh tốn token khi chuyển qua lại giữa các bước
interface CacheEntry<T> {
  data: T;
  timestamp: number;
}
const sessionCache = new Map<string, CacheEntry<any>>();
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 phút

export function getGeminiConfig(): { apiKey: string; model: string } {
  const profile = getActiveProfile();
  const userKey = profile?.aiSettings?.geminiApiKey || profile?.aiSettings?.apiKey || localStorage.getItem('dsp_gemini_key') || localStorage.getItem('gemini_api_key');
  const userModel = profile?.aiSettings?.geminiModel || profile?.aiSettings?.model || DEFAULT_GEMINI_MODEL;

  return {
    apiKey: (userKey && userKey.trim()) ? userKey.trim() : '',
    model: userModel.includes('gemini') ? userModel : DEFAULT_GEMINI_MODEL
  };
}

/**
 * Gọi Gemini REST API với cấu trúc JSON đầu ra chuẩn hóa
 */
export async function callGeminiJSON<T>(
  prompt: string, 
  systemInstruction?: string,
  cacheKey?: string
): Promise<T> {
  // 1. Kiểm tra cache
  if (cacheKey && sessionCache.has(cacheKey)) {
    const entry = sessionCache.get(cacheKey)!;
    if (Date.now() - entry.timestamp < CACHE_TTL_MS) {
      console.log(`[Gemini CRCE] Trả về dữ liệu từ Cache cho: ${cacheKey}`);
      return entry.data as T;
    } else {
      sessionCache.delete(cacheKey);
    }
  }

  const { apiKey, model } = getGeminiConfig();
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const body: any = {
    contents: [
      {
        role: 'user',
        parts: [{ text: prompt }]
      }
    ],
    generationConfig: {
      temperature: 0.1,
      topP: 0.8,
      topK: 40,
      responseMimeType: 'application/json'
    }
  };

  if (systemInstruction) {
    body.systemInstruction = {
      parts: [{ text: systemInstruction }]
    };
  }

  let lastError: any = null;
  // Retry tối đa 2 lần nếu gặp lỗi quá tải
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => null);
        const errMsg = errJson?.error?.message || response.statusText;
        throw new Error(`Gemini API HTTP ${response.status}: ${errMsg}`);
      }

      const result = await response.json();
      const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) {
        throw new Error('Gemini API không trả về nội dung hợp lệ.');
      }

      // Parse JSON
      const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsedData = JSON.parse(cleanJson) as T;

      if (cacheKey) {
        sessionCache.set(cacheKey, { data: parsedData, timestamp: Date.now() });
      }

      return parsedData;
    } catch (err: any) {
      lastError = err;
      if (attempt === 1) {
        console.warn(`[Gemini CRCE] Thử lại lần 2 do lỗi: ${err.message}`);
        await new Promise(res => setTimeout(res, 1200));
      }
    }
  }

  throw lastError;
}

/**
 * Gọi Gemini Streaming API để xuất văn bản thời gian thực (Markdown)
 */
export async function callGeminiStream(
  prompt: string,
  systemInstruction: string | undefined,
  onChunk: (chunk: string) => void
): Promise<string> {
  const { apiKey, model } = getGeminiConfig();
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:streamGenerateContent?alt=sse&key=${apiKey}`;

  const body: any = {
    contents: [
      {
        role: 'user',
        parts: [{ text: prompt }]
      }
    ],
    generationConfig: {
      temperature: 0.2,
      topP: 0.8
    }
  };

  if (systemInstruction) {
    body.systemInstruction = {
      parts: [{ text: systemInstruction }]
    };
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const errJson = await response.json().catch(() => null);
    const errMsg = errJson?.error?.message || response.statusText;
    throw new Error(`Gemini Stream HTTP ${response.status}: ${errMsg}`);
  }

  if (!response.body) {
    throw new Error('Trình duyệt không hỗ trợ stream reader.');
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder('utf-8');
  let buffer = '';
  let fullAccumulatedText = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() || '';

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith(':')) continue;

      if (trimmed.startsWith('data: ')) {
        try {
          const jsonStr = trimmed.substring(6);
          const parsed = JSON.parse(jsonStr);
          const chunkText = parsed?.candidates?.[0]?.content?.parts?.[0]?.text || '';
          if (chunkText) {
            fullAccumulatedText += chunkText;
            onChunk(chunkText);
          }
        } catch {
          // Bỏ qua dòng json chưa hoàn chỉnh
        }
      }
    }
  }

  return fullAccumulatedText;
}

/**
 * Xóa cache phiên làm việc khi thay đổi bệnh nhân
 */
export function clearCrceSessionCache() {
  sessionCache.clear();
}
