/**
 * CliniPortal 2.0 — MDX Engine (TypeScript Native)
 * Path: src/core/mdx-engine.ts
 * 
 * Bộ phân tích và chuyển đổi MDX sang HTML chuẩn hóa không cần thư viện ngoài:
 * - Trích xuất và xác thực Frontmatter YAML (bao gồm danh sách lồng nhau sections, pillars, clinicalPearls, metrics)
 * - Chuyển đổi Markdown semantics (Headings có custom ID {#sec-X}, Tables, Lists, Quotes, KaTeX Math)
 * - Tự động nạp và chuyển đổi MDX Custom Components với dữ liệu động:
 *   + <EpiTriangle ... />
 *   + <EpiAlert type="..." title="...">...</EpiAlert>
 *   + <EpiPillarsNav ... />
 *   + <EpiVectorTable ... />
 *   + <PhysioAlert ... />
 *   + <PhysioQuickNav ... />
 *   + <PhysioFeedbackLoop ... />
 *   + <BiochemAlert ... />
 *   + <BiochemQuickNav ... />
 *   + <PathoAlert ... />
 *   + <PathoQuickNav ... />
 */

import { renderEpiTriangle } from '../content/basic-medical/epidemiology/components/EpiTriangle';
import type { EpiTriangleProps, EpiTriangleNode } from '../content/basic-medical/epidemiology/components/EpiTriangle';
import { renderEpiTransmissionCycle } from '../content/basic-medical/epidemiology/components/EpiTransmissionCycle';
import type { EpiTransmissionCycleProps } from '../content/basic-medical/epidemiology/components/EpiTransmissionCycle';
import { renderEpiAlert } from '../content/basic-medical/epidemiology/components/EpiAlert';
import { renderEpiPillarsNav } from '../content/basic-medical/epidemiology/components/EpiPillarsNav';
import { renderEpiVectorTable } from '../content/basic-medical/epidemiology/components/EpiVectorTable';
import type { EpiVectorTableProps } from '../content/basic-medical/epidemiology/components/EpiVectorTable';
import { renderPhysioAlert } from '../content/basic-medical/physiology/components/PhysioAlert';
import { renderPhysioQuickNav } from '../content/basic-medical/physiology/components/PhysioQuickNav';
import { renderPhysioFeedbackLoop } from '../content/basic-medical/physiology/components/PhysioFeedbackLoop';
import { renderBiochemAlert } from '../content/basic-medical/biochemistry/components/BiochemAlert';
import { renderBiochemQuickNav } from '../content/basic-medical/biochemistry/components/BiochemQuickNav';
import { renderPathoAlert } from '../content/basic-medical/pathophysiology-cases/components/PathoAlert';
import { renderPathoQuickNav } from '../content/basic-medical/pathophysiology-cases/components/PathoQuickNav';
import type { EpidemiologyMdxFrontmatter } from '../content/basic-medical/types/epidemiology.types';
import type { PhysioMdxFrontmatter } from '../content/basic-medical/types/physiology.types';
import type { BiochemistryMdxFrontmatter } from '../content/basic-medical/types/biochemistry.types';
import type { CcbsMdxFrontmatter } from '../content/basic-medical/types/ccbs.types';

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

    // 2. Tiền xử lý xóa bỏ các dòng `import { ... } from ...` và các khối chú thích {/* ... */}, <!-- ... -->
    const cleanBody = body
      .replace(/^import\s+.*?from\s+['"].*?['"];?\s*$/gm, '')
      .replace(/\{\/\*[\s\S]*?\*\/\}/g, '')
      .replace(/<!--[\s\S]*?-->/g, '')
      .trim();

    // Map lưu trữ các khối HTML đã render để tránh bị parser Markdown chia dòng làm hỏng
    const stash = new Map<string, string>();
    let blockCounter = 0;

    const stashBlock = (htmlContent: string): string => {
      const placeholder = `__CLINI_MDX_BLOCK_${blockCounter++}__`;
      stash.set(placeholder, htmlContent.trim());
      return `\n\n${placeholder}\n\n`;
    };

    // 3. Chuyển đổi Custom MDX Components với Frontmatter Context và lưu vào stash
    let transformedBody = this.transformCustomComponents(cleanBody, frontmatter, stashBlock);

    // 4. Chuyển đổi Markdown cú pháp chuẩn
    const { html, toc } = this.renderMarkdown(transformedBody);

    // 5. Hoàn nguyên các block HTML từ stash
    let finalHtml = html;
    stash.forEach((renderedHtml, placeholder) => {
      // Thay thế placeholder kể cả khi bị bao bọc trong <p>
      const pWrappedRegex = new RegExp(`<p[^>]*>\\s*${placeholder}\\s*<\\/p>`, 'g');
      finalHtml = finalHtml.replace(pWrappedRegex, renderedHtml);
      finalHtml = finalHtml.replaceAll(placeholder, renderedHtml);
    });

    const title = frontmatter.title || 'Bài giảng Y khoa';
    const description = frontmatter.description || '';

    return {
      frontmatter,
      title,
      description,
      html: finalHtml,
      toc
    };
  }

  /**
   * Tách Frontmatter và Body với hỗ trợ mảng lồng nhau & key-values
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
    let currentMode: 'simple' | 'list_strings' | 'list_objects' | 'nested_object' = 'simple';
    let currentList: any[] = [];
    let currentObj: Record<string, any> | null = null;
    let currentNestedKey = '';

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (!line.trim() || line.trim().startsWith('#')) continue;

      const indent = line.search(/\S/);

      // Check item in list with "- "
      const dashMatch = line.match(/^(\s*)-\s+(.*)$/);
      if (dashMatch) {
        const itemContent = dashMatch[2].trim();

        // Check if this is an object start "- key: val"
        const objKvMatch = itemContent.match(/^([a-zA-Z0-9_-]+):\s*(.*)$/);
        if (objKvMatch) {
          currentMode = 'list_objects';
          currentObj = {};
          let val = objKvMatch[2].trim().replace(/^["']|["']$/g, '');
          if (val === 'true') (currentObj as any)[objKvMatch[1]] = true;
          else if (val === 'false') (currentObj as any)[objKvMatch[1]] = false;
          else if (!isNaN(Number(val)) && val !== '') (currentObj as any)[objKvMatch[1]] = Number(val);
          else (currentObj as any)[objKvMatch[1]] = val;

          if (!Array.isArray(frontmatter[currentKey])) {
            frontmatter[currentKey] = [];
          }
          frontmatter[currentKey].push(currentObj);
        } else {
          // Simple string item
          currentMode = 'list_strings';
          const cleanVal = itemContent.replace(/^["']|["']$/g, '');
          if (!Array.isArray(frontmatter[currentKey])) {
            frontmatter[currentKey] = [];
          }
          frontmatter[currentKey].push(cleanVal);
        }
        continue;
      }

      // Check sub-property of object in list (e.g. "  title: ...")
      if (indent > 2 && currentMode === 'list_objects' && currentObj) {
        const subKvMatch = line.trim().match(/^([a-zA-Z0-9_-]+):\s*(.*)$/);
        if (subKvMatch) {
          const subKey = subKvMatch[1];
          let subVal = subKvMatch[2].trim().replace(/^["']|["']$/g, '');
          if (subVal === 'true') (currentObj as any)[subKey] = true;
          else if (subVal === 'false') (currentObj as any)[subKey] = false;
          else if (!isNaN(Number(subVal)) && subVal !== '') (currentObj as any)[subKey] = Number(subVal);
          else (currentObj as any)[subKey] = subVal;
          continue;
        }
      }

      // Check sub-property of a nested object map (e.g. metrics: \n  r0: "1.33")
      if (indent > 0 && currentMode === 'nested_object' && frontmatter[currentKey] && typeof frontmatter[currentKey] === 'object' && !Array.isArray(frontmatter[currentKey])) {
        const nestedKvMatch = line.trim().match(/^([a-zA-Z0-9_-]+):\s*(.*)$/);
        if (nestedKvMatch) {
          const nKey = nestedKvMatch[1];
          let nVal = nestedKvMatch[2].trim().replace(/^["']|["']$/g, '');
          frontmatter[currentKey][nKey] = nVal;
          continue;
        }
      }

      // Top-level key-value
      const kvMatch = line.match(/^([a-zA-Z0-9_-]+):\s*(.*)$/);
      if (kvMatch) {
        const key = kvMatch[1];
        let val = kvMatch[2].trim();

        if (val === '') {
          // Starting list or nested object
          currentKey = key;
          currentMode = (key === 'metrics' || key === 'author' || key === 'metadata') ? 'nested_object' : 'list_strings';
          frontmatter[key] = currentMode === 'nested_object' ? {} : [];
          currentObj = null;
        } else {
          val = val.replace(/^["']|["']$/g, '');
          currentKey = key;
          currentMode = 'simple';
          currentObj = null;
          if (val === 'true') frontmatter[key] = true;
          else if (val === 'false') frontmatter[key] = false;
          else if (!isNaN(Number(val)) && val !== '') frontmatter[key] = Number(val);
          else frontmatter[key] = val;
        }
      }
    }

    return { frontmatter, body };
  }

  /**
   * Xử lý và chuyển đổi các Custom MDX tags với Frontmatter Context
   */
  private transformCustomComponents(
    content: string,
    frontmatter: Record<string, any> = {},
    stashBlock: (html: string) => string
  ): string {
    let result = content;

    const sections = frontmatter.sections || frontmatter.pillars || [];

    // 1. <EpiPillarsNav />
    result = result.replace(/<EpiPillarsNav\s*\/?>/gi, () => {
      const items = Array.isArray(sections) && sections.length > 0 ? sections : undefined;
      return stashBlock(renderEpiPillarsNav(items ? { pillars: items } : undefined));
    });

    // 2. <EpiAlert type="..." title="...">...</EpiAlert>
    result = result.replace(/<EpiAlert\s+type=["']([^"']+)["']\s+title=["']([^"']+)["'](?:\s+badge=["']([^"']+)["'])?>([\s\S]*?)<\/EpiAlert>/gi, 
      (_match, type, title, badge, children) => {
        return stashBlock(renderEpiAlert({
          type: type as any,
          title,
          badge,
          children: this.formatInline(children.trim())
        }));
      }
    );

    // 3. <EpiTriangle ... />
    result = result.replace(/<EpiTriangle([\s\S]*?)\/>/gi, (_match, attrs) => {
      try {
        const parseNode = (name: string): EpiTriangleNode => {
          const match = attrs.match(new RegExp(`${name}\\s*=\\s*\\{([\\s\\S]*?)\\}\\s*(?=[a-zA-Z0-9_-]+\\s*=\\s*\\{|[a-zA-Z0-9_-]+\\s*=\\s*["']|\\/?>|$)`, 'i'));
          if (match) {
            const rawObj = match[1].trim();
            try {
              return new Function('return (' + rawObj + ')')();
            } catch {
              const titleMatch = rawObj.match(/title\s*:\s*["'`]([^"'`]+)["'`]/i);
              const subtitleMatch = rawObj.match(/subtitle\s*:\s*["'`]([^"'`]+)["'`]/i);
              const colorMatch = rawObj.match(/color\s*:\s*["'`]([^"'`]+)["'`]/i);
              const itemsMatch = rawObj.match(/items\s*:\s*\[([\s\S]*?)\]/i);
              let items: string[] = [];
              if (itemsMatch) {
                const itemStrings = itemsMatch[1].match(/["'`]([^"'`]+)["'`]/g);
                if (itemStrings) {
                  items = itemStrings.map((s: string) => s.replace(/^["'`]|["'`]$/g, ''));
                }
              }
              return {
                title: titleMatch ? titleMatch[1] : name,
                subtitle: subtitleMatch ? subtitleMatch[1] : '',
                items,
                color: colorMatch ? colorMatch[1] : undefined
              };
            }
          }
          return { title: name, items: [] };
        };

        const vectorOrBridgeMatch = attrs.match(/vectorOrBridge\s*=\s*["'`]([^"'`]+)["'`]/i);
        const centerTitleMatch = attrs.match(/centerTitle\s*=\s*["'`]([^"'`]+)["'`]/i);

        const agent = parseNode('agent');
        const host = parseNode('host');
        const environment = parseNode('environment');

        const props: EpiTriangleProps = {
          agent: agent.title ? agent : {
            title: 'Tác nhân gây bệnh',
            items: ['Đặc tính sinh học', 'Độc lực và biến chủng'],
            color: '#ef4444'
          },
          host: host.title ? host : {
            title: 'Vật chủ & Quần thể cảm nhiễm',
            items: ['Đặc điểm miễn dịch', 'Nhóm nguy cơ cao'],
            color: '#3b82f6'
          },
          environment: environment.title ? environment : {
            title: 'Môi trường & Sinh cảnh',
            items: ['Yếu tố tự nhiên', 'Yếu tố kinh tế - xã hội'],
            color: '#10b981'
          },
          vectorOrBridge: vectorOrBridgeMatch ? vectorOrBridgeMatch[1] : 'VÉC-TƠ TRUNG GIAN',
          centerTitle: centerTitleMatch ? centerTitleMatch[1] : 'TIÊU ĐIỂM DỊCH'
        };

        return stashBlock(renderEpiTriangle(props));
      } catch (e) {
        console.error('Error rendering EpiTriangle:', e);
        return '';
      }
    });

    // 3.5. <EpiTransmissionCycle ... />
    result = result.replace(/<EpiTransmissionCycle([\s\S]*?)\/>/gi, (_match, attrs) => {
      try {
        const titleMatch = attrs.match(/title\s*=\s*["'`]([^"'`]+)["'`]/i);
        const subtitleMatch = attrs.match(/subtitle\s*=\s*["'`]([^"'`]+)["'`]/i);
        const vectorNameMatch = attrs.match(/vectorName\s*=\s*["'`]([^"'`]+)["'`]/i);
        const eipDurationMatch = attrs.match(/eipDuration\s*=\s*["'`]([^"'`]+)["'`]/i);
        const iipDurationMatch = attrs.match(/iipDuration\s*=\s*["'`]([^"'`]+)["'`]/i);

        const props: EpiTransmissionCycleProps = {
          title: titleMatch ? titleMatch[1] : undefined,
          subtitle: subtitleMatch ? subtitleMatch[1] : undefined,
          vectorName: vectorNameMatch ? vectorNameMatch[1] : undefined,
          eipDuration: eipDurationMatch ? eipDurationMatch[1] : undefined,
          iipDuration: iipDurationMatch ? iipDurationMatch[1] : undefined,
        };

        return stashBlock(renderEpiTransmissionCycle(props));
      } catch (e) {
        console.error('Error rendering EpiTransmissionCycle:', e);
        return '';
      }
    });

    // 4. <EpiVectorTable ... />
    result = result.replace(/<EpiVectorTable([\s\S]*?)\/>/gi, (_match, attrs) => {
      try {
        const titleMatch = attrs.match(/title\s*=\s*["'`]([^"'`]+)["'`]/i);
        const primaryNameMatch = attrs.match(/primaryName\s*=\s*["'`]([^"'`]+)["'`]/i);
        const secondaryNameMatch = attrs.match(/secondaryName\s*=\s*["'`]([^"'`]+)["'`]/i);

        let rows: any[] = [];
        const rowsMatch = attrs.match(/rows\s*=\s*\{(\[[\s\S]*?\])\}/i);
        if (rowsMatch) {
          try {
            rows = new Function('return (' + rowsMatch[1] + ')')();
          } catch {
            const rowObjs = rowsMatch[1].match(/\{[\s\S]*?\}/g);
            if (rowObjs) {
              rows = rowObjs.map((r: string) => {
                const charM = r.match(/characteristic\s*:\s*["'`]([^"'`]+)["'`]/i);
                const primM = r.match(/primaryVector\s*:\s*["'`]([^"'`]+)["'`]/i);
                const secM = r.match(/secondaryVector\s*:\s*["'`]([^"'`]+)["'`]/i);
                const sigM = r.match(/significance\s*:\s*["'`]([^"'`]+)["'`]/i);
                return {
                  characteristic: charM ? charM[1] : '',
                  primaryVector: primM ? primM[1] : '',
                  secondaryVector: secM ? secM[1] : undefined,
                  significance: sigM ? sigM[1] : undefined
                };
              });
            }
          }
        }

        const props: EpiVectorTableProps = {
          title: titleMatch ? titleMatch[1] : 'Đặc tính So sánh',
          primaryName: primaryNameMatch ? primaryNameMatch[1] : 'Véc-tơ chính',
          secondaryName: secondaryNameMatch ? secondaryNameMatch[1] : undefined,
          rows: rows.length > 0 ? rows : [
            {
              characteristic: 'Tập tính cư trú',
              primaryVector: 'Ưa trong nhà, đậu góc tối, rèm cửa, quần áo treo',
              secondaryVector: 'Ưa ngoài trời, bụi rậm, vườn cây, hốc cây',
              significance: 'Tiếp xúc gần người liên tục, hiệu suất lây truyền cao.'
            }
          ]
        };
        return stashBlock(renderEpiVectorTable(props));
      } catch (e) {
        console.error('Error rendering EpiVectorTable:', e);
        return '';
      }
    });

    // 5. <PhysioQuickNav />
    result = result.replace(/<PhysioQuickNav\s*\/?>/gi, () => {
      const items = Array.isArray(sections) && sections.length > 0 ? sections : undefined;
      return stashBlock(renderPhysioQuickNav(items ? { items } : undefined));
    });

    // 6. <PhysioAlert type="..." title="...">...</PhysioAlert>
    result = result.replace(/<PhysioAlert\s+type=["']([^"']+)["']\s+title=["']([^"']+)["'](?:\s+badge=["']([^"']+)["'])?>([\s\S]*?)<\/PhysioAlert>/gi,
      (_match, type, title, badge, children) => {
        return stashBlock(renderPhysioAlert({
          type: type as any,
          title,
          badge,
          children: this.formatInline(children.trim())
        }));
      }
    );

    // 7. <PhysioFeedbackLoop ... />
    result = result.replace(/<PhysioFeedbackLoop\s+type=["']([^"']+)["']\s+title=["']([^"']+)["']\s+stimulus=["']([^"']+)["']\s+receptor=["']([^"']+)["']\s+controlCenter=["']([^"']+)["']\s+effector=["']([^"']+)["']\s+response=["']([^"']+)["']\s*\/?>/gi,
      (_match, type, title, stimulus, receptor, controlCenter, effector, response) => {
        return stashBlock(renderPhysioFeedbackLoop({
          type: type as any,
          title,
          stimulus,
          receptor,
          controlCenter,
          effector,
          response
        }));
      }
    );

    // 8. <BiochemQuickNav />
    result = result.replace(/<BiochemQuickNav\s*\/?>/gi, () => {
      const items = Array.isArray(sections) && sections.length > 0 ? sections : undefined;
      return stashBlock(renderBiochemQuickNav(items ? { items } : undefined));
    });

    // 9. <BiochemAlert type="..." title="...">...</BiochemAlert>
    result = result.replace(/<BiochemAlert\s+type=["']([^"']+)["'](?:\s+title=["']([^"']+)["'])?>([\s\S]*?)<\/BiochemAlert>/gi,
      (_match, type, title, children) => {
        return stashBlock(renderBiochemAlert({
          type: type as any,
          title,
          children: this.formatInline(children.trim())
        }));
      }
    );

    // 10. <PathoQuickNav />
    result = result.replace(/<PathoQuickNav\s*\/?>/gi, () => {
      const items = Array.isArray(sections) && sections.length > 0 ? sections : undefined;
      return stashBlock(renderPathoQuickNav(items ? { items } : undefined));
    });

    // 11. <PathoAlert type="..." title="...">...</PathoAlert>
    result = result.replace(/<PathoAlert\s+type=["']([^"']+)["'](?:\s+title=["']([^"']+)["'])?>([\s\S]*?)<\/PathoAlert>/gi,
      (_match, type, title, children) => {
        return stashBlock(renderPathoAlert({
          type: type as any,
          title,
          children: this.formatInline(children.trim())
        }));
      }
    );

    return result;
  }

  /**
   * Markdown parser với hỗ trợ Headings {#custom-id}, Tables, Fenced Code Blocks & Clinical Diagrams
   */
  private renderMarkdown(md: string): { html: string; toc: Array<{ id: string; text: string; level: number }> } {
    const toc: Array<{ id: string; text: string; level: number }> = [];
    const lines = md.split(/\r?\n/);
    const htmlLines: string[] = [];
    let inTable = false;
    let tableRows: string[] = [];
    let inCodeBlock = false;
    let codeBlockLang = '';
    let codeBlockLines: string[] = [];
    let inMathBlock = false;
    let mathBlockLines: string[] = [];
    let inSection = false;
    let htmlBlockStack: string[] = [];

    const flushTable = () => {
      if (inTable && tableRows.length > 0) {
        let tableHtml = '<div class="table-responsive" style="margin: 1.5rem 0; overflow-x: auto;"><table class="table-modern" style="width: 100%; border-collapse: collapse; margin: 1rem 0;">';
        for (let idx = 0; idx < tableRows.length; idx++) {
          const row = tableRows[idx].trim();
          if (idx === 1 && row.includes('---')) continue; // Separator row
          
          const cells = row.split('|').filter((_, cIdx, arr) => cIdx > 0 && cIdx < arr.length - 1);
          const tag = idx === 0 ? 'th' : 'td';
          const style = idx === 0 ? 'padding: 0.75rem 1rem; background: var(--color-surface-2, #f8fafc); font-weight: 700; color: var(--color-text, #0f172a); border-bottom: 2px solid var(--color-border, #cbd5e1);' : 'padding: 0.75rem 1rem; border-top: 1px solid var(--color-border, #e2e8f0); color: var(--color-text, #334155);';
          
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

    const flushCodeBlock = () => {
      if (inCodeBlock) {
        const rawContent = codeBlockLines.join('\n');
        const rendered = this.renderDiagramOrCodeBlock(rawContent, codeBlockLang);
        htmlLines.push(rendered);
        codeBlockLines = [];
        codeBlockLang = '';
        inCodeBlock = false;
      }
    };

    const flushMathBlock = () => {
      if (inMathBlock) {
        const rawMath = mathBlockLines.join('\n').trim();
        htmlLines.push(`<div class="mdx-math-block" style="overflow-x: auto; text-align: center; padding: 1rem 1.25rem; margin: 1.25rem 0; background: var(--color-surface-2, #f8fafc); border: 1px solid var(--color-border, #cbd5e1); border-radius: 12px; font-size: 1.15rem; color: var(--color-text, #0f172a);">${this.formatMathContent(rawMath)}</div>`);
        mathBlockLines = [];
        inMathBlock = false;
      }
    };

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
      const trimmed = line.trim();

      // Block placeholder token __CLINI_MDX_BLOCK_X__
      if (trimmed.startsWith('__CLINI_MDX_BLOCK_') && trimmed.endsWith('__')) {
        if (inTable) flushTable();
        if (inCodeBlock) flushCodeBlock();
        if (inMathBlock) flushMathBlock();
        htmlLines.push(trimmed);
        continue;
      }

      // Handle Multiline Math Block $$ ... $$
      if (trimmed.startsWith('$$')) {
        if (inMathBlock) {
          flushMathBlock();
        } else {
          if (inTable) flushTable();
          if (inCodeBlock) flushCodeBlock();
          
          const restOfLine = trimmed.slice(2).trim();
          if (restOfLine.endsWith('$$') && restOfLine.length > 2) {
            // Single-line $$ formula $$
            const formula = restOfLine.slice(0, -2).trim();
            htmlLines.push(`<div class="mdx-math-block" style="overflow-x: auto; text-align: center; padding: 1rem 1.25rem; margin: 1.25rem 0; background: var(--color-surface-2, #f8fafc); border: 1px solid var(--color-border, #cbd5e1); border-radius: 12px; font-size: 1.15rem; color: var(--color-text, #0f172a);">${this.formatMathContent(formula)}</div>`);
          } else {
            inMathBlock = true;
            if (restOfLine) mathBlockLines.push(restOfLine);
          }
        }
        continue;
      }

      if (inMathBlock) {
        if (trimmed.endsWith('$$')) {
          const content = trimmed.slice(0, -2).trim();
          if (content) mathBlockLines.push(content);
          flushMathBlock();
        } else {
          mathBlockLines.push(line);
        }
        continue;
      }

      // Handle Fenced Code Block / Diagrams ```
      if (trimmed.startsWith('```')) {
        if (inCodeBlock) {
          flushCodeBlock();
        } else {
          if (inTable) flushTable();
          inCodeBlock = true;
          codeBlockLang = trimmed.slice(3).trim();
        }
        continue;
      }

      if (inCodeBlock) {
        codeBlockLines.push(line);
        continue;
      }

      // Track HTML block containers (div, section, nav, table, svg, style, script, details, etc.)
      const openingTags = trimmed.match(/<([a-zA-Z0-9_-]+)(?:\s+[^>]*)?(?<!\/)>/g);
      const closingTags = trimmed.match(/<\/([a-zA-Z0-9_-]+)>/g);

      // Check if this line is in an HTML block or starts one
      const wasInHtmlBlock = htmlBlockStack.length > 0;
      const isHtmlLine = trimmed.startsWith('<') || wasInHtmlBlock;

      // Update stack
      if (openingTags) {
        for (const tag of openingTags) {
          const tagNameMatch = tag.match(/<([a-zA-Z0-9_-]+)/);
          if (tagNameMatch) {
            const tName = tagNameMatch[1].toLowerCase();
            if (!['br', 'hr', 'img', 'input', 'meta', 'link'].includes(tName) && !tag.endsWith('/>')) {
              htmlBlockStack.push(tName);
            }
          }
        }
      }
      if (closingTags) {
        for (const tag of closingTags) {
          const tagNameMatch = tag.match(/<\/([a-zA-Z0-9_-]+)>/);
          if (tagNameMatch) {
            const tName = tagNameMatch[1].toLowerCase();
            const lastIdx = htmlBlockStack.lastIndexOf(tName);
            if (lastIdx !== -1) {
              htmlBlockStack.splice(lastIdx, 1);
            }
          }
        }
      }

      if (isHtmlLine) {
        if (inTable) flushTable();
        // Format inline markdown (bold, italic, code, math) inside and outside raw HTML lines
        if (trimmed) {
          htmlLines.push(this.formatInline(line));
        }
        continue;
      }

      // Table line
      if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
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
          if (inSection) {
            htmlLines.push('</section>');
            inSection = false;
          }
          htmlLines.push(`<h1 id="${customId}" class="article-main-title" style="scroll-margin-top: 80px;">${this.formatInline(text)}</h1>`);
        } else if (level === 2) {
          if (inSection) {
            htmlLines.push('</section>');
          }
          inSection = true;
          htmlLines.push(`<section class="article-section" id="${customId}" style="scroll-margin-top: 80px; margin-bottom: 2.5rem;"><h2 class="section-title" style="display: flex; align-items: center; gap: 0.6rem; color: var(--color-primary, #0284c7); font-size: 1.38rem; font-weight: 800; border-bottom: 1.5px solid var(--color-border, #cbd5e1); padding-bottom: 0.65rem; margin-bottom: 1.25rem;"><i class="fa-solid fa-bookmark" style="font-size: 1.1rem; opacity: 0.85;"></i><span>${this.formatInline(text)}</span></h2>`);
        } else if (level === 3) {
          htmlLines.push(`<h3 id="${customId}" class="subsection-title" style="scroll-margin-top: 80px; font-size: 1.15rem; font-weight: 700; color: var(--color-text, #0f172a); margin: 1.5rem 0 0.75rem 0;">${this.formatInline(text)}</h3>`);
        } else if (level === 4) {
          htmlLines.push(`<h4 id="${customId}" class="minor-heading" style="scroll-margin-top: 80px; font-size: 1rem; font-weight: 700; color: var(--color-text-muted, #475569); margin: 1.25rem 0 0.5rem 0;">${this.formatInline(text)}</h4>`);
        }
        continue;
      }

      // Horizontal Rule
      if (trimmed === '---' || trimmed === '***') {
        htmlLines.push('<hr style="border: none; border-top: 1px solid var(--color-border, #e2e8f0); margin: 2rem 0;" />');
        continue;
      }

      // Blockquotes
      if (trimmed.startsWith('>')) {
        const quoteText = line.replace(/^>\s*/, '');
        htmlLines.push(`<blockquote style="border-left: 4px solid var(--color-primary, #0284c7); padding: 0.8rem 1.2rem; background: var(--color-surface-2, rgba(2, 132, 199, 0.05)); margin: 1.25rem 0; border-radius: 0 10px 10px 0; color: var(--color-text, #334155); font-style: italic;">${this.formatInline(quoteText)}</blockquote>`);
        continue;
      }

      // Bullet lists
      if (trimmed.match(/^[-*]\s+/)) {
        const listText = trimmed.replace(/^[-*]\s+/, '');
        htmlLines.push(`<div style="margin: 0.4rem 0 0.4rem 1.25rem; font-size: 0.95rem; line-height: 1.65; color: var(--color-text, #1e293b);">• ${this.formatInline(listText)}</div>`);
        continue;
      }

      // Numbered lists
      if (trimmed.match(/^\d+\.\s+/)) {
        const numMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
        if (numMatch) {
          htmlLines.push(`<div style="margin: 0.4rem 0 0.4rem 1.25rem; font-size: 0.95rem; line-height: 1.65; color: var(--color-text, #1e293b);"><strong style="color: var(--color-primary, #0284c7);">${numMatch[1]}.</strong> ${this.formatInline(numMatch[2])}</div>`);
        }
        continue;
      }

      // Regular Paragraphs
      if (trimmed) {
        htmlLines.push(`<p style="font-size: 0.96rem; line-height: 1.75; color: var(--color-text, #1e293b); margin-bottom: 1rem;">${this.formatInline(line)}</p>`);
      }
    }

    if (inTable) flushTable();
    if (inCodeBlock) flushCodeBlock();
    if (inMathBlock) flushMathBlock();
    if (inSection) {
      htmlLines.push('</section>');
      inSection = false;
    }

    return {
      html: htmlLines.join('\n'),
      toc
    };
  }

  /**
   * Render Block Sơ đồ / Biểu đồ hoặc Khối Code
   */
  private renderDiagramOrCodeBlock(raw: string, lang: string): string {
    const isDiagram = lang === 'diagram' || lang === 'scheme' || lang === 'flowchart' ||
      raw.includes('├──') || raw.includes('└──') || raw.includes('──►') || raw.includes('│') ||
      raw.includes('▼') || raw.includes('▲') || (raw.includes('[') && raw.includes(']') && (raw.includes('|') || raw.includes('->') || raw.includes('►')));

    if (isDiagram) {
      let diagramTitle = 'Sơ đồ cơ chế & Lưu đồ tiếp cận';
      const rootMatch = raw.match(/\[(.*?)\]/);
      if (rootMatch && rootMatch[1] && rootMatch[1].length < 60) {
        diagramTitle = rootMatch[1].trim();
      }

      const highlightedCanvas = this.highlightDiagramSyntax(raw);
      const diagramId = 'diag-' + Math.floor(Math.random() * 100000);

      return `
        <div class="mdx-diagram-card" id="${diagramId}">
          <div class="mdx-diagram-header">
            <div class="mdx-diagram-title-wrap">
              <span class="mdx-diagram-badge"><i class="fa-solid fa-diagram-project"></i> SƠ ĐỒ LÂM SÀNG</span>
              <span>${diagramTitle}</span>
            </div>
            <div class="mdx-diagram-actions">
              <button type="button" class="mdx-diagram-btn" onclick="navigator.clipboard.writeText(decodeURIComponent('${encodeURIComponent(raw)}')); this.innerText='Đã chép!'; setTimeout(()=>this.innerHTML='<i class=\\'fa-regular fa-copy\\'></i> Sao chép', 2000);" title="Sao chép sơ đồ">
                <i class="fa-regular fa-copy"></i> Sao chép
              </button>
            </div>
          </div>
          <pre class="mdx-diagram-canvas"><code>${highlightedCanvas}</code></pre>
        </div>
      `;
    }

    // Standard Code Block
    const safeContent = this.escapeHtml(raw);
    return `
      <div class="mdx-code-block">
        <pre><code class="language-${lang || 'text'}">${safeContent}</code></pre>
      </div>
    `;
  }

  /**
   * Highlight syntax cho sơ đồ cây ASCII & Flowcharts sử dụng CSS classes chuyên biệt
   */
  private highlightDiagramSyntax(raw: string): string {
    let safe = this.escapeHtml(raw);

    // 1. Highlight Clinical Keywords first
    safe = safe
      .replace(/\b(Phản hồi âm tính|Negative Feedback|BÌNH THƯỜNG|Bù trừ tốt|Hồi phục|Hiệu quả|Tế bào T|Lympho B|Tế bào NK)\b/gi, '<span class="diag-success">$1</span>')
      .replace(/\b(Phản hồi dương|Vòng Luẩn Quẩn|TỬ VONG|Hoại tử|Nguy kịch|Thiếu máu cấp|Sốc|Đột quỵ|Cấp cứu)\b/gi, '<span class="diag-danger">$1</span>')
      .replace(/\b(Cảnh báo|Ngưỡng|Phân cắt|Kích hoạt|Tăng nhịp tim|Co mạch|Enzym|Convertase|Opsonin hóa)\b/gi, '<span class="diag-warning">$1</span>');

    // 2. Bracketed Node: [Title] or [Node] (avoid newlines)
    safe = safe.replace(/\[([^\]\n]+)\]/g, '<span class="diag-bracket">[$1]</span>');

    // 3. Parentheses parameters/ions: (Na+), (K+), (250 ms), (Ca2+)
    safe = safe.replace(/\(([^)\n]+)\)/g, '<span class="diag-action">($1)</span>');

    // 4. Progress / Level Bars
    safe = safe.replace(/(█+)/g, '<span class="diag-bar">$1</span>');

    // 5. Tree Branch Lines, Orthogonal Connectors & Arrows
    safe = safe.replace(/(├──►|└──►|├──|└──|──►|─►|◄───|◄──|◄───────┘|──┐|──┘|┌──|└──|─┼\/|─┼|──┬|──┴|──|│|▼|▲|&gt;|►|◄)/g, '<span class="diag-branch">$1</span>');

    return safe;
  }

  /**
   * Format nội dung công thức toán học KaTeX
   */
  private formatMathContent(math: string): string {
    let formatted = math;

    // Handle \mathbf{...}
    formatted = formatted.replace(/\\mathbf\{([^{}]+)\}/g, '<strong style="font-weight: 800; color: var(--color-primary, #0284c7);">$1</strong>');

    // Handle \frac{A}{B}
    formatted = formatted.replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, '<span class="mdx-math-fraction" style="display: inline-flex; flex-direction: column; vertical-align: middle; text-align: center; padding: 0 4px;"><span class="mdx-math-num" style="border-bottom: 1.5px solid currentColor; padding-bottom: 2px;">$1</span><span class="mdx-math-den" style="padding-top: 2px;">$2</span></span>');

    // Handle \text{...}
    formatted = formatted.replace(/\\text\{([^{}]+)\}/g, '<span style="font-family: var(--font-body, sans-serif); font-style: normal; font-size: 0.92em; margin: 0 2px;">$1</span>');

    // Handle Greek & Math symbols
    formatted = formatted
      .replace(/\\approx/g, '≈')
      .replace(/\\mu/g, 'µ')
      .replace(/\\times/g, '×')
      .replace(/\\cdot/g, '·')
      .replace(/\\pm/g, '±')
      .replace(/\\le(q)?/g, '≤')
      .replace(/\\ge(q)?/g, '≥')
      .replace(/\\alpha/g, 'α')
      .replace(/\\beta/g, 'β')
      .replace(/\\pi/g, 'π')
      .replace(/\\Delta/g, 'Δ')
      .replace(/\\infty/g, '∞');

    return formatted;
  }

  /**
   * Format bold, italic, code, math symbols
   */
  private formatInline(text: string): string {
    return text
      .replace(/\*\*\s*([^*]+?)\s*\*\*/g, '<strong style="font-weight: 700; color: var(--color-text, #0f172a);">$1</strong>')
      .replace(/(?<!\*)\*([^*]+?)\*(?!\*)/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code style="background: var(--color-surface-2, #f1f5f9); padding: 0.15rem 0.4rem; border-radius: 4px; font-family: monospace; font-size: 0.88em; color: #0284c7; border: 1px solid var(--color-border, #cbd5e1);">$1</code>')
      .replace(/(?<!\$)\$(?!\$)([^\n$]+)(?<!\$)\$(?!\$)/g, (_m, math) => {
        return `<span class="mdx-math-inline" style="font-family: 'Cambria Math', 'Times New Roman', serif; font-size: 1.05em; color: var(--color-primary, #0284c7); padding: 0 2px;">${this.formatMathContent(math)}</span>`;
      });
  }

  private escapeHtml(str: string): string {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}

export const cliniMdxEngine = new CliniMdxEngine();
