/**
 * PubMed & Gemini AI Integration Service (pubmed-gemini-service.ts)
 * Path: src/content/ebm/js/pubmed-gemini-service.ts
 * Phân hệ Y học chứng cứ (EBM) | CliniPortal
 */

export interface PubMedArticle {
  pmid: string;
  title: string;
  journal: string;
  pubDate: string;
  doi?: string;
  specialty?: string;
  summaryVi?: string;
}

export class PubMedGeminiService {
  public static readonly STORAGE_KEY_API = 'CLINI_GEMINI_KEY';
  public static readonly STORAGE_KEY_CACHE = 'yhcc_pubmed_guidelines_cache_v2';

  public static getApiKey(): string {
    return localStorage.getItem(this.STORAGE_KEY_API) || '';
  }

  public static setApiKey(key: string): void {
    localStorage.setItem(this.STORAGE_KEY_API, key.trim());
  }

  public static clearApiKey(): void {
    localStorage.removeItem(this.STORAGE_KEY_API);
  }

  public static async fetchLatestGuidelinesFromPubMed(term = 'practice guideline[pt] AND ("2024"[dp] OR "2025"[dp] OR "2026"[dp])'): Promise<PubMedArticle[]> {
    try {
      const searchUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=${encodeURIComponent(term)}&retmode=json&retmax=8`;
      const searchResp = await fetch(searchUrl);
      if (!searchResp.ok) throw new Error(`PubMed E-Search error: ${searchResp.status}`);
      const searchData = await searchResp.json();
      const idList: string[] = searchData.esearchresult?.idlist || [];

      if (!idList.length) return [];

      const summaryUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=${idList.join(',')}&retmode=json`;
      const summaryResp = await fetch(summaryUrl);
      if (!summaryResp.ok) throw new Error(`PubMed E-Summary error: ${summaryResp.status}`);
      const summaryData = await summaryResp.json();
      const results: PubMedArticle[] = [];

      idList.forEach(id => {
        const item = summaryData.result?.[id];
        if (item) {
          results.push({
            pmid: id,
            title: item.title || 'Guideline',
            journal: item.source || 'Medical Journal',
            pubDate: item.pubdate || '',
            doi: item.articleids?.find((a: any) => a.idtype === 'doi')?.value
          });
        }
      });

      return results;
    } catch (e) {
      console.error('Error fetching from PubMed:', e);
      return [];
    }
  }

  public static async summarizeWithGemini(article: PubMedArticle): Promise<string> {
    const key = this.getApiKey();
    if (!key) return 'Chưa cấu hình API Key Gemini.';

    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`;
      const prompt = `Bạn là chuyên gia Y học chứng cứ. Hãy tóm tắt ngắn gọn (1-2 câu tiếng Việt) khuyến cáo cốt lõi của hướng dẫn lâm sàng sau: "${article.title}" từ tạp chí "${article.journal}".`;

      const resp = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      });

      if (!resp.ok) throw new Error(`Gemini API error: ${resp.status}`);
      const data = await resp.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || 'Không có phản hồi từ Gemini.';
    } catch (e: any) {
      return `Lỗi kết nối Gemini: ${e.message}`;
    }
  }
}

if (typeof window !== 'undefined') {
  (window as any).PubMedGeminiService = PubMedGeminiService;
}
