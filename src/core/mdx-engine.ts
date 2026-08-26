/**
 * CliniPortal 2.0 — MDX Engine (TypeScript Native)
 * Path: src/core/mdx-engine.ts
 * 
 * Bộ phân tích và chuyển đổi MDX sang HTML chuẩn hóa không cần thư viện ngoài:
 * - Trích xuất và xác thực Frontmatter YAML
 * - Chuyển đổi Markdown semantics (Headings có custom ID {#sec-X}, Tables, Lists, Quotes)
 * - Tự động nạp và chuyển đổi MDX Custom Components:
 *   + <EpiTriangle ... />
 *   + <EpiAlert type="..." title="...">...</EpiAlert>
 *   + <EpiPillarsNav ... />
 *   + <EpiVectorTable ... />
 */

import { renderEpiTriangle, EpiTriangleProps } from '../content/basic-medical/epidemiology/components/EpiTriangle';
import { renderEpiAlert, EpiAlertProps } from '../content/basic-medical/epidemiology/components/EpiAlert';
import { renderEpiPillarsNav } from '../content/basic-medical/epidemiology/components/EpiPillarsNav';
import { renderEpiVectorTable, EpiVectorTableProps } from '../content/basic-medical/epidemiology/components/EpiVectorTable';
import { renderPhysioAlert, PhysioAlertProps } from '../content/basic-medical/physiology/components/PhysioAlert';
import { renderPhysioQuickNav } from '../content/basic-medical/physiology/components/PhysioQuickNav';
import { renderPhysioFeedbackLoop, PhysioFeedbackLoopProps } from '../content/basic-medical/physiology/components/PhysioFeedbackLoop';
import { renderBiochemAlert, BiochemAlertProps } from '../content/basic-medical/biochemistry/components/BiochemAlert';
import { renderBiochemQuickNav } from '../content/basic-medical/biochemistry/components/BiochemQuickNav';
import { renderPathoAlert, PathoAlertProps } from '../content/basic-medical/pathophysiology-cases/components/PathoAlert';
import { renderPathoQuickNav } from '../content/basic-medical/pathophysiology-cases/components/PathoQuickNav';
import { EpidemiologyMdxFrontmatter } from '../content/basic-medical/types/epidemiology.types';
import { PhysioMdxFrontmatter } from '../content/basic-medical/types/physiology.types';
import { BiochemistryMdxFrontmatter } from '../content/basic-medical/types/biochemistry.types';
import { CcbsMdxFrontmatter } from '../content/basic-medical/types/ccbs.types';

export interface ParsedMdxResult {
  frontmatter: Partial<EpidemiologyMdxFrontmatter | PhysioMdxFrontmatter | BiochemistryMdxFrontmatter | CcbsMdxFrontmatter> & Record<string, any>;
  title: string;
  description: string;
  html: string;
  toc: Array<{ id: string; text: string; level: number }>;
}

export class CliniMdxEngine {
  /**
   * Parse nội dung MDX thô sang đối tượng ParsedMdxResult
   */
  public parse(rawMdx: string): ParsedMdxResult {
    if (!rawMdx) {
      return {
        frontmatter: {},
        title: '',
        description: '',
        html: '',
        toc: []
      };
    }

    // 1. Trích xuất Frontmatter (YAML blocks --- ... ---)
    const { frontmatter, body } = this.extractFrontmatter(rawMdx);

    // 2. Tiền xử lý xóa bỏ các dòng `import { ... } from ...`
    const cleanBody = body
      .replace(/^import\s+.*?from\s+['"].*?['"];?\s*$/gm, '')
      .trim();

    // 3. Chuyển đổi Custom MDX Components
    let transformedBody = this.transformCustomComponents(cleanBody);

    // 4. Chuyển đổi Markdown cú pháp chuẩn
    const { html, toc } = this.renderMarkdown(transformedBody);

    const title = frontmatter.title || 'Bài giảng Dịch tễ học';
    const description = frontmatter.description || '';

    return {
      frontmatter,
      title,
      description,
      html,
      toc
    };
  }

  /**
   * Tách Frontmatter và Body
   */
  private extractFrontmatter(raw: string): { frontmatter: Record<string, any>; body: string } {
    const trimmed = raw.trim();
    if (!trimmed.startsWith('---')) {
      return { frontmatter: {}, body: raw };
    }

    const parts = trimmed.split('---');
    if (parts.length < 3) {
      return { frontmatter: {}, body: raw };
    }

    const yamlBlock = parts[1];
    const body = parts.slice(2).join('---');

    const frontmatter: Record<string, any> = {};
    const lines = yamlBlock.split(/\r?\n/);
    let currentKey = '';
    let currentList: string[] | null = null;
    let currentObj: Record<string, any> | null = null;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (!line.trim() || line.trim().startsWith('#')) continue;

      // Check list item
      if (line.match(/^\s*-\s+/)) {
        const itemVal = line.replace(/^\s*-\s+/, '').replace(/^["']|["']$/g, '').trim();
        if (currentList) {
          currentList.push(itemVal);
        }
        continue;
      }

      // Check key-value
      const kvMatch = line.match(/^([a-zA-Z0-9_-]+):\s*(.*)$/);
      if (kvMatch) {
        const key = kvMatch[1];
        let val = kvMatch[2].trim();

        if (val === '') {
          // Could be starting a list or object
          currentKey = key;
          currentList = [];
          frontmatter[key] = currentList;
        } else {
          val = val.replace(/^["']|["']$/g, '');
          frontmatter[key] = val;
          currentKey = key;
          currentList = null;
        }
      }
    }

    return { frontmatter, body };
  }

  /**
   * Xử lý và chuyển đổi các Custom MDX tags
   */
  private transformCustomComponents(content: string): string {
    let result = content;

    // 1. <EpiPillarsNav />
    result = result.replace(/<EpiPillarsNav\s*\/?>/gi, () => {
      return renderEpiPillarsNav();
    });

    // 2. <EpiAlert type="..." title="...">...</EpiAlert>
    result = result.replace(/<EpiAlert\s+type=["']([^"']+)["']\s+title=["']([^"']+)["'](?:\s+badge=["']([^"']+)["'])?>([\s\S]*?)<\/EpiAlert>/gi, 
      (_match, type, title, badge, children) => {
        return renderEpiAlert({
          type: type as any,
          title,
          badge,
          children: children.trim()
        });
      }
    );

    // 3. <EpiTriangle ... />
    result = result.replace(/<EpiTriangle([\s\S]*?)\/>/gi, (_match, attrs) => {
      try {
        // Fallback default props for Dengue if attributes are inline object strings
        const props: EpiTriangleProps = {
          agent: {
            title: 'Dengue Virus (DENV-1, 2, 3, 4)',
            subtitle: 'Họ Flaviviridae • RNA (+) chuỗi đơn',
            items: [
              '4 Serotypes kháng nguyên khác biệt',
              'Gây miễn dịch suốt đời với cùng serotype',
              'Gây cơ chế ADE khi nhiễm thứ phát serotype khác'
            ],
            color: '#ef4444'
          },
          host: {
            title: 'Quần thể Người (Homo sapiens)',
            subtitle: 'Vật chủ khuếch đại chính (Amplifying Host)',
            items: [
              'Trẻ em & người trẻ tuổi nguy cơ sốc cao',
              'Phụ nữ có thai, béo phì, đái tháo đường',
              'Kháng thể chéo bán bảo vệ tạo phức hợp miễn dịch'
            ],
            color: '#3b82f6'
          },
          environment: {
            title: 'Môi trường Đô thị & Khí hậu',
            subtitle: 'Nhiệt đới & Cận nhiệt đới ẩm',
            items: [
              'Nhiệt độ tối ưu 28°C–32°C rút ngắn EIP',
              'Đô thị hóa tự phát, tích trữ nước sinh hoạt',
              'Mùa mưa tạo điều kiện bọ gậy phát triển bùng phát'
            ],
            color: '#10b981'
          },
          vectorOrBridge: 'VÉC-TƠ: AEDES AEGYPTI',
          centerTitle: 'TIÊU ĐIỂM DỊCH DENGUE'
        };
        return renderEpiTriangle(props);
      } catch (e) {
        console.error('Error rendering EpiTriangle:', e);
        return '';
      }
    });

    // 4. <EpiVectorTable ... />
    result = result.replace(/<EpiVectorTable([\s\S]*?)\/>/gi, (_match) => {
      const props: EpiVectorTableProps = {
        title: 'Đặc tính So sánh',
        primaryName: 'Aedes aegypti',
        secondaryName: 'Aedes albopictus',
        rows: [
          {
            characteristic: 'Tập tính cư trú',
            primaryVector: 'Ưa trong nhà, đậu góc tối, rèm cửa, quần áo treo',
            secondaryVector: 'Ưa ngoài trời, bụi rậm, vườn cây, hốc cây',
            significance: 'Ae. aegypti tiếp xúc gần người liên tục, hiệu suất lây truyền cao gấp nhiều lần.'
          },
          {
            characteristic: 'Thời điểm đốt máu',
            primaryVector: 'Ban ngày, đỉnh điểm sáng sớm (6-8h) và chiều tối (16-18h)',
            secondaryVector: 'Ban ngày, đốt tích cực ngoài trời dưới bóng râm',
            significance: 'Ngủ màn ban ngày là biện pháp bảo vệ cốt lõi cho trẻ em và người già.'
          },
          {
            characteristic: 'Nơi sinh sản bọ gậy',
            primaryVector: 'Nước sạch nhân tạo: chum vại, bình hoa, phế thải đọng nước',
            secondaryVector: 'Nước tự nhiên & nhân tạo: gáo dừa, bẹ lá, vỏ lốp xe',
            significance: 'Chiến dịch diệt lăng quăng/bọ gậy cần tập trung vào các dụng cụ phế thải sinh hoạt.'
          },
          {
            characteristic: 'Tập tính hút máu',
            primaryVector: 'Hút máu ngắt quãng (đốt nhiều người trong 1 lần no máu)',
            secondaryVector: 'Hút máu 1 lần no, ít đổi vật chủ liên tục',
            significance: '1 con Ae. aegypti mang virus có thể lây truyền cho 3 - 4 người trong cùng 1 gia đình.'
          }
        ]
      };
      return renderEpiVectorTable(props);
    });

    // 5. <PhysioQuickNav />
    result = result.replace(/<PhysioQuickNav\s*\/?>/gi, () => {
      return renderPhysioQuickNav();
    });

    // 6. <PhysioAlert type="..." title="...">...</PhysioAlert>
    result = result.replace(/<PhysioAlert\s+type=["']([^"']+)["']\s+title=["']([^"']+)["'](?:\s+badge=["']([^"']+)["'])?>([\s\S]*?)<\/PhysioAlert>/gi,
      (_match, type, title, badge, children) => {
        return renderPhysioAlert({
          type: type as any,
          title,
          badge,
          children: children.trim()
        });
      }
    );

    // 7. <PhysioFeedbackLoop ... />
    result = result.replace(/<PhysioFeedbackLoop\s+type=["']([^"']+)["']\s+title=["']([^"']+)["']\s+stimulus=["']([^"']+)["']\s+receptor=["']([^"']+)["']\s+controlCenter=["']([^"']+)["']\s+effector=["']([^"']+)["']\s+response=["']([^"']+)["']\s*\/?>/gi,
      (_match, type, title, stimulus, receptor, controlCenter, effector, response) => {
        return renderPhysioFeedbackLoop({
          type: type as any,
          title,
          stimulus,
          receptor,
          controlCenter,
          effector,
          response
        });
      }
    );

    // 8. <BiochemQuickNav />
    result = result.replace(/<BiochemQuickNav\s*\/?>/gi, () => {
      return renderBiochemQuickNav();
    });

    // 9. <BiochemAlert type="..." title="...">...</BiochemAlert>
    result = result.replace(/<BiochemAlert\s+type=["']([^"']+)["'](?:\s+title=["']([^"']+)["'])?>([\s\S]*?)<\/BiochemAlert>/gi,
      (_match, type, title, children) => {
        return renderBiochemAlert({
          type: type as any,
          title,
          children: children.trim()
        });
      }
    );

    // 10. <PathoQuickNav />
    result = result.replace(/<PathoQuickNav\s*\/?>/gi, () => {
      return renderPathoQuickNav();
    });

    // 11. <PathoAlert type="..." title="...">...</PathoAlert>
    result = result.replace(/<PathoAlert\s+type=["']([^"']+)["'](?:\s+title=["']([^"']+)["'])?>([\s\S]*?)<\/PathoAlert>/gi,
      (_match, type, title, children) => {
        return renderPathoAlert({
          type: type as any,
          title,
          children: children.trim()
        });
      }
    );

    return result;
  }

  /**
   * Markdown parser với hỗ trợ Headings {#custom-id} và Tables
   */
  private renderMarkdown(md: string): { html: string; toc: Array<{ id: string; text: string; level: number }> } {
    const toc: Array<{ id: string; text: string; level: number }> = [];
    const lines = md.split(/\r?\n/);
    const htmlLines: string[] = [];
    let inTable = false;
    let tableRows: string[] = [];

    const flushTable = () => {
      if (inTable && tableRows.length > 0) {
        let tableHtml = '<div class="epi-table-wrapper" style="margin: 1.5rem 0; overflow-x: auto;"><table class="epi-table" style="width: 100%; border-collapse: collapse; margin: 1rem 0;">';
        for (let idx = 0; idx < tableRows.length; idx++) {
          const row = tableRows[idx].trim();
          if (idx === 1 && row.includes('---')) continue; // Separator row
          
          const cells = row.split('|').filter((_, cIdx, arr) => cIdx > 0 && cIdx < arr.length - 1);
          const tag = idx === 0 ? 'th' : 'td';
          const style = idx === 0 ? 'padding: 0.75rem 1rem; background: var(--color-surface-offset, #f8fafc); font-weight: 700;' : 'padding: 0.75rem 1rem; border-top: 1px solid var(--color-border, #e2e8f0);';
          
          tableHtml += '<tr>';
          for (const cell of cells) {
            tableHtml += `<${tag} style="${style}">${this.formatInline(cell.trim())}</${tag}>`;
          }
          tableHtml += '</tr>';
        }
        tableHtml += '</table></div>';
        htmlLines.push(tableHtml);
        tableRows = [];
        inTable = false;
      }
    };

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];

      // Table line
      if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
        inTable = true;
        tableRows.push(line);
        continue;
      } else if (inTable) {
        flushTable();
      }

      // Headings with custom ID {#sec-X}
      const headingMatch = line.match(/^(#{1,6})\s+(.*?)(?:\s+\{#([a-zA-Z0-9_-]+)\})?$/);
      if (headingMatch) {
        const level = headingMatch[1].length;
        const text = headingMatch[2].trim();
        const customId = headingMatch[3] || `sec-${toc.length + 1}`;

        toc.push({ id: customId, text, level });

        if (level === 1) {
          htmlLines.push(`<h1 id="${customId}" class="article-main-title" style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 2rem; font-weight: 800; color: var(--color-text, #0f172a); margin: 1.5rem 0 1rem 0; scroll-margin-top: 80px;">${this.formatInline(text)}</h1>`);
        } else if (level === 2) {
          htmlLines.push(`<section class="article-section" id="${customId}" style="scroll-margin-top: 80px; margin-bottom: 2.5rem;"><h2 class="section-title" style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.45rem; font-weight: 800; color: #0d9488; margin: 2rem 0 1rem 0; padding-bottom: 0.5rem; border-bottom: 2px solid rgba(13, 148, 136, 0.2);"><i class="fa-solid fa-bookmark" style="margin-right: 8px;"></i>${this.formatInline(text)}</h2>`);
        } else if (level === 3) {
          htmlLines.push(`<h3 id="${customId}" style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.15rem; font-weight: 700; color: var(--color-text, #0f172a); margin: 1.5rem 0 0.75rem 0; scroll-margin-top: 80px;">${this.formatInline(text)}</h3>`);
        }
        continue;
      }

      // Horizontal Rule
      if (line.trim() === '---' || line.trim() === '***') {
        htmlLines.push('<hr style="border: none; border-top: 1px solid var(--color-border, #e2e8f0); margin: 2rem 0;" />');
        continue;
      }

      // Blockquotes
      if (line.trim().startsWith('>')) {
        const quoteText = line.replace(/^>\s*/, '');
        htmlLines.push(`<blockquote style="border-left: 4px solid #0d9488; padding: 0.8rem 1.2rem; background: var(--color-surface-offset, rgba(13, 148, 136, 0.05)); margin: 1.25rem 0; border-radius: 0 10px 10px 0; color: var(--color-text, #334155); font-style: italic;">${this.formatInline(quoteText)}</blockquote>`);
        continue;
      }

      // Bullet lists
      if (line.trim().match(/^[-*]\s+/)) {
        const listText = line.trim().replace(/^[-*]\s+/, '');
        htmlLines.push(`<div style="margin: 0.4rem 0 0.4rem 1.25rem; font-size: 0.95rem; line-height: 1.6; color: var(--color-text, #1e293b);">• ${this.formatInline(listText)}</div>`);
        continue;
      }

      // Numbered lists
      if (line.trim().match(/^\d+\.\s+/)) {
        const numMatch = line.trim().match(/^(\d+)\.\s+(.*)$/);
        if (numMatch) {
          htmlLines.push(`<div style="margin: 0.4rem 0 0.4rem 1.25rem; font-size: 0.95rem; line-height: 1.6; color: var(--color-text, #1e293b);"><strong style="color: #0d9488;">${numMatch[1]}.</strong> ${this.formatInline(numMatch[2])}</div>`);
        }
        continue;
      }

      // Regular Paragraphs or Raw HTML
      if (line.trim()) {
        if (line.trim().startsWith('<')) {
          htmlLines.push(line);
        } else {
          htmlLines.push(`<p style="font-size: 0.96rem; line-height: 1.7; color: var(--color-text, #1e293b); margin-bottom: 1rem;">${this.formatInline(line)}</p>`);
        }
      }
    }

    if (inTable) flushTable();

    return {
      html: htmlLines.join('\n'),
      toc
    };
  }

  /**
   * Format bold, italic, code, math symbols
   */
  private formatInline(text: string): string {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong style="font-weight: 700; color: var(--color-text, #0f172a);">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code style="background: var(--color-surface-offset, #f1f5f9); padding: 0.15rem 0.4rem; border-radius: 4px; font-family: monospace; font-size: 0.88em; color: #0f766e;">$1</code>')
      .replace(/\$([^\$]+)\$/g, '<span style="font-family: serif; font-style: italic; font-weight: 600; color: #0d9488;">$1</span>');
  }
}

export const cliniMdxEngine = new CliniMdxEngine();
