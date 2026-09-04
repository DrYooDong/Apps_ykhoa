/**
 * ════════════════════════════════════════════════════════════════════════════
 *  CLINICAL FLOW DSL PARSER & COMPILER (MedicalFlowDSL)
 *  Bộ phân tích cú pháp Text/Code sang Lưu đồ Y khoa tương tác & SVG thuần.
 *  Hỗ trợ cú pháp Mermaid chuẩn + Siêu dữ liệu Y khoa mở rộng (CliniPortal)
 * ════════════════════════════════════════════════════════════════════════════
 */

export type MedicalNodeType = 
  | 'start' 
  | 'question' 
  | 'decision' 
  | 'action' 
  | 'danger' 
  | 'focal' 
  | 'dose' 
  | 'comparison' 
  | 'success' 
  | 'tool' 
  | string;

export type MedicalNodeShape = 
  | 'rect' 
  | 'diamond' 
  | 'pill' 
  | 'circle' 
  | 'subroutine' 
  | 'hexagon';

export interface MedicalFlowNode {
  id: string;
  title: string;
  type?: MedicalNodeType;
  shape?: MedicalNodeShape;
  badge?: string;
  subtitle?: string;
  details?: string;
  evidence?: string;
  dose?: string;
  redFlags?: string[];
  toolUrl?: string;
  icon?: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

export interface MedicalFlowWaypoint {
  x: number;
  y: number;
}

export interface MedicalFlowEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
  type?: 'normal' | 'danger' | 'success' | 'warning' | string;
  style?: 'orthogonal' | 'curved' | 'straight';
  exitX?: number;
  exitY?: number;
  entryX?: number;
  entryY?: number;
  waypoints?: MedicalFlowWaypoint[];
}

export interface MedicalFlowDiagram {
  title?: string;
  direction: 'TD' | 'TB' | 'LR';
  nodes: MedicalFlowNode[];
  edges: MedicalFlowEdge[];
  width: number;
  height: number;
  rootId?: string;
}

export interface ParseError {
  line: number;
  raw: string;
  message: string;
}

export interface ParseResult {
  success: boolean;
  diagram: MedicalFlowDiagram;
  errors: ParseError[];
}

export class MedicalFlowDSL {
  /**
   * Phân tích văn bản code DSL thành đối tượng cấu trúc MedicalFlowDiagram
   */
  public static parse(dslText: string): ParseResult {
    const lines = dslText.split(/\r?\n/);
    const errors: ParseError[] = [];
    const nodeMap = new Map<string, MedicalFlowNode>();
    const edges: MedicalFlowEdge[] = [];
    let direction: 'TD' | 'TB' | 'LR' = 'TD';
    let diagramTitle = '';
    let edgeCounter = 1;

    // Pattern Regex matching
    // Direction: flowchart TD / graph LR
    const dirRegex = /^\s*(?:flowchart|graph)\s+(TD|TB|LR)/i;
    // Title directive: title: Phác đồ...
    const titleRegex = /^\s*(?:title|%%title):\s*(.+)$/i;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]!.trim();
      if (!line || line.startsWith('%%') || line.startsWith('//') || line.startsWith('subgraph') || line === 'end') {
        continue;
      }

      // 1. Kiểm tra tiêu đề hoặc hướng
      const titleMatch = line.match(titleRegex);
      if (titleMatch) {
        diagramTitle = titleMatch[1]!.trim();
        continue;
      }

      const dirMatch = line.match(dirRegex);
      if (dirMatch) {
        const d = dirMatch[1]!.toUpperCase();
        direction = d === 'LR' ? 'LR' : 'TD';
        continue;
      }

      // 2. Phân tích kết nối (Edges) và khai báo Node lồng nhau
      // Mẫu chuẩn: NodeA -->|Nhãn| NodeB hoặc NodeA[Tiêu đề] ==> NodeB{Câu hỏi}
      try {
        const edgeParsed = this.parseEdgeLine(line, nodeMap, edgeCounter);
        if (edgeParsed) {
          edges.push(...edgeParsed.newEdges);
          edgeCounter += edgeParsed.newEdges.length;
          continue;
        }

        // 3. Khai báo Node đơn lẻ độc lập: NodeId[Tiêu đề | metadata]
        const singleNode = this.parseSingleNodeDefinition(line);
        if (singleNode) {
          if (nodeMap.has(singleNode.id)) {
            // Hợp nhất thuộc tính nếu đã tồn tại
            const existing = nodeMap.get(singleNode.id)!;
            Object.assign(existing, singleNode);
          } else {
            nodeMap.set(singleNode.id, singleNode);
          }
          continue;
        }

        // 4. Định nghĩa style / class: class NodeA danger hoặc classDef
        if (line.startsWith('class ') || line.startsWith('style ') || line.startsWith('classDef ')) {
          this.parseClassDirective(line, nodeMap);
          continue;
        }

        // Nếu dòng không khớp mẫu nào
        errors.push({
          line: i + 1,
          raw: line,
          message: 'Không nhận diện được cú pháp node hoặc mũi tên liên kết.'
        });
      } catch (err: any) {
        errors.push({
          line: i + 1,
          raw: line,
          message: err.message || 'Lỗi cú pháp không xác định.'
        });
      }
    }

    const nodes = Array.from(nodeMap.values());
    if (nodes.length === 0) {
      errors.push({
        line: 1,
        raw: dslText.slice(0, 40),
        message: 'Không tìm thấy node nào trong văn bản code.'
      });
    }

    // Tự động gán loại mặc định nếu chưa có
    nodes.forEach((n, idx) => {
      if (!n.type) {
        if (idx === 0) n.type = 'start';
        else if (n.shape === 'diamond') n.type = 'question';
        else if (n.title.toLowerCase().includes('cấp cứu') || n.title.toLowerCase().includes('nguy kịch')) n.type = 'danger';
        else if (n.title.toLowerCase().includes('ổn định') || n.title.toLowerCase().includes('cho về')) n.type = 'success';
        else if (n.title.toLowerCase().includes('liều') || n.title.toLowerCase().includes('adrenalin') || n.title.toLowerCase().includes('mg')) n.type = 'dose';
        else n.type = 'action';
      }
    });

    // Tính toán bố cục tự động (Hierarchical Layout & Orthogonal Routing)
    const diagram: MedicalFlowDiagram = {
      title: diagramTitle,
      direction,
      nodes,
      edges,
      width: 960,
      height: 640,
      rootId: nodes[0]?.id
    };

    this.calculateHierarchicalLayout(diagram);

    return {
      success: errors.length === 0,
      diagram,
      errors
    };
  }

  /**
   * Phân tích một dòng chứa mũi tên kết nối
   * Ví dụ:
   * A --> B
   * A[Nghi ngờ Sốc] -->|Nặng| B{Đánh giá}
   * A ==>|Cấp cứu| C[Ngừng tuần hoàn]
   * A -.->|Dự phòng| D[Kháng sinh]
   */
  private static parseEdgeLine(
    line: string, 
    nodeMap: Map<string, MedicalFlowNode>, 
    edgeCounter: number
  ): { newEdges: MedicalFlowEdge[] } | null {
    // Edge connector regex: khớp mọi chuẩn mũi tên Mermaid:
    // 1. -->|label|, ==>|label|, -.->|label|
    // 2. -- "label" -->, -- 'label' -->, -- label -->
    // 3. == "label" ==>, == 'label' ==>, == label ==>
    // 4. -. "label" .->, -. 'label' .->, -. label .->
    // 5. -->, ==>, -.->
    const connectorRegex = /(-->\|[^|]+\||==>\|[^|]+\||-\.->\|[^|]+\||--\s*(?:"[^"]*"|'[^']*'|\|[^|]*\||[^-=>\r\n]+?)\s*-->|==\s*(?:"[^"]*"|'[^']*'|\|[^|]*\||[^-=>\r\n]+?)\s*==>|-\.\s*(?:"[^"]*"|'[^']*'|\|[^|]*\||[^-=>\r\n]+?)\s*\.->|-->|==>|-\.->)/g;

    const matches: Array<{ raw: string; index: number; length: number; label: string; type: string }> = [];
    let m: RegExpExecArray | null;

    while ((m = connectorRegex.exec(line)) !== null) {
      const raw = m[0];
      const index = m.index;
      const length = raw.length;

      let label = '';
      const pipeMatch = raw.match(/\|([^|]+)\|/);
      if (pipeMatch) {
        label = pipeMatch[1]!.trim();
      } else {
        const quoteMatch = raw.match(/["']([^"']+)["']/);
        if (quoteMatch) {
          label = quoteMatch[1]!.trim();
        } else {
          const textMatch = raw.match(/--\s*([^->]+?)\s*-->|==\s*([^=>]+?)\s*==>|-\.\s*([^.>]+?)\s*\.->/);
          if (textMatch) {
            label = (textMatch[1] || textMatch[2] || textMatch[3] || '').trim();
          }
        }
      }

      let type = 'normal';
      if (raw.includes('==')) type = 'danger';
      else if (raw.includes('-.')) type = 'warning';

      matches.push({ raw, index, length, label, type });
    }

    if (matches.length === 0) return null;

    const segments: string[] = [];
    let lastIndex = 0;
    for (let i = 0; i < matches.length; i++) {
      const match = matches[i]!;
      segments.push(line.substring(lastIndex, match.index).trim());
      lastIndex = match.index + match.length;
    }
    segments.push(line.substring(lastIndex).trim());

    const newEdges: MedicalFlowEdge[] = [];
    let localEdgeCount = edgeCounter;

    for (let i = 0; i < matches.length; i++) {
      const srcStr = segments[i];
      const tgtStr = segments[i + 1];
      const conn = matches[i]!;

      if (!srcStr || !tgtStr) continue;

      const srcTokens = srcStr.split('&').map(s => s.trim()).filter(Boolean);
      const tgtTokens = tgtStr.split('&').map(s => s.trim()).filter(Boolean);

      for (const s of srcTokens) {
        for (const t of tgtTokens) {
          const sourceNode = this.parseOrGetNode(s, nodeMap);
          const targetNode = this.parseOrGetNode(t, nodeMap);

          let edgeType = conn.type;
          if (edgeType === 'normal') {
            const lLow = conn.label.toLowerCase();
            if (lLow.includes('không') || lLow.includes('âm') || lLow.includes('nguy') || lLow.includes('chưa') || lLow.includes('thất bại')) edgeType = 'danger';
            else if (lLow.includes('có') || lLow.includes('dương') || lLow.includes('ổn') || lLow.includes('đạt') || lLow.includes('thành công')) edgeType = 'success';
          }

          newEdges.push({
            id: `e${localEdgeCount++}`,
            source: sourceNode.id,
            target: targetNode.id,
            label: conn.label || undefined,
            type: edgeType,
            style: 'orthogonal'
          });
        }
      }
    }

    return newEdges.length > 0 ? { newEdges } : null;
  }

  /**
   * Phân tích hoặc lấy node từ chuỗi (chuỗi có thể chứa khai báo ID hoặc ID[Title|Meta])
   */
  private static parseOrGetNode(token: string, nodeMap: Map<string, MedicalFlowNode>): MedicalFlowNode {
    token = token.trim();
    let customClass = '';
    const classMatch = token.match(/^(.*?):::([a-zA-Z0-9_-]+)$/);
    if (classMatch) {
      token = classMatch[1]!.trim();
      customClass = classMatch[2]!.trim().toLowerCase();
    }

    const nodeDef = this.parseSingleNodeDefinition(token);
    if (nodeDef) {
      if (customClass && !nodeDef.type) {
        nodeDef.type = customClass;
      }
      if (nodeMap.has(nodeDef.id)) {
        const existing = nodeMap.get(nodeDef.id)!;
        Object.assign(existing, nodeDef);
        return existing;
      }
      nodeMap.set(nodeDef.id, nodeDef);
      return nodeDef;
    }

    // Nếu chỉ là ID thuần (VD: node1)
    if (nodeMap.has(token)) {
      const existing = nodeMap.get(token)!;
      if (customClass && !existing.type) {
        existing.type = customClass;
      }
      return existing;
    }

    const newNode: MedicalFlowNode = {
      id: token,
      title: token,
      shape: 'rect',
      type: customClass || undefined
    };
    nodeMap.set(token, newNode);
    return newNode;
  }

  /**
   * Phân tích chuỗi khai báo 1 node: id[Title | metadata] hoặc id{Question} hoặc id([Pill])
   */
  private static parseSingleNodeDefinition(str: string): MedicalFlowNode | null {
    str = str.trim();
    let customClass = '';
    const classMatch = str.match(/^(.*?):::([a-zA-Z0-9_-]+)$/);
    if (classMatch) {
      str = classMatch[1]!.trim();
      customClass = classMatch[2]!.trim().toLowerCase();
    }

    // Các cặp ngoặc định dạng hình khối Mermaid:
    // [ ] = chữ nhật
    // { } = hình thoi / quyết định
    // ([ ]) = viên thuốc / pill
    // (( )) = tròn
    // [[ ]] = quy trình / subroutine
    // {{ }} = lục giác
    const patterns: Array<{ shape: MedicalNodeShape; regex: RegExp }> = [
      { shape: 'pill', regex: /^([a-zA-Z0-9_-]+)\(\[\s*([\s\S]+?)\s*\]\)$/ },
      { shape: 'circle', regex: /^([a-zA-Z0-9_-]+)\(\(\s*([\s\S]+?)\s*\)\)$/ },
      { shape: 'subroutine', regex: /^([a-zA-Z0-9_-]+)\[\[\s*([\s\S]+?)\s*\]\]$/ },
      { shape: 'hexagon', regex: /^([a-zA-Z0-9_-]+)\{\{\s*([\s\S]+?)\s*\}\}$/ },
      { shape: 'diamond', regex: /^([a-zA-Z0-9_-]+)\{\s*([\s\S]+?)\s*\}$/ },
      { shape: 'rect', regex: /^([a-zA-Z0-9_-]+)\[\s*([\s\S]+?)\s*\]$/ }
    ];

    for (const { shape, regex } of patterns) {
      const m = str.match(regex);
      if (m) {
        const id = m[1]!.trim();
        const content = m[2]!.trim();
        const node = this.parseNodeContent(id, content, shape);
        if (customClass && !node.type) {
          node.type = customClass;
        }
        return node;
      }
    }

    return null;
  }

  /**
   * Phân tích nội dung bên trong cặp ngoặc của Node bao gồm title và siêu dữ liệu (| key: value)
   */
  private static parseNodeContent(id: string, content: string, shape: MedicalNodeShape): MedicalFlowNode {
    // Loại bỏ dấu ngoặc kép hoặc ngoặc đơn bao bọc bên ngoài nếu có
    if ((content.startsWith('"') && content.endsWith('"')) || (content.startsWith("'") && content.endsWith("'"))) {
      content = content.slice(1, -1).trim();
    }

    const cleanText = (s: string) => s.replace(/<[^>]+>/g, '').trim();

    const parts = content.split('|').map(s => s.trim());
    let rawTitle = parts[0] || id;
    let title = rawTitle;
    let subtitle = '';

    // Tự động phân tách dòng tiêu đề và phụ đề qua thẻ <br/>
    const brMatch = rawTitle.match(/([\s\S]+?)(?:<br\s*\/?>\s*)([\s\S]+)/i);
    if (brMatch) {
      title = cleanText(brMatch[1]!);
      subtitle = cleanText(brMatch[2]!);
    } else {
      title = cleanText(rawTitle);
    }

    const node: MedicalFlowNode = {
      id,
      title,
      subtitle: subtitle || undefined,
      shape
    };

    if (shape === 'diamond') {
      node.type = 'question';
    }

    // Phân tích các metadata segments từ vị trí 1 trở đi
    for (let i = 1; i < parts.length; i++) {
      const seg = parts[i]!;
      const colonIdx = seg.indexOf(':');
      if (colonIdx === -1) {
        // Nếu không có dấu hai chấm, kiểm tra nếu là từ khoá loại node (VD: danger, start, success)
        const lower = seg.toLowerCase();
        if (['start', 'question', 'decision', 'action', 'danger', 'focal', 'dose', 'comparison', 'success', 'tool'].includes(lower)) {
          node.type = lower;
        }
        continue;
      }

      const key = seg.substring(0, colonIdx).trim().toLowerCase();
      const val = seg.substring(colonIdx + 1).trim();

      switch (key) {
        case 'type':
          node.type = val.toLowerCase();
          break;
        case 'badge':
        case 'tag':
          node.badge = val;
          break;
        case 'sub':
        case 'subtitle':
          node.subtitle = val;
          break;
        case 'detail':
        case 'details':
        case 'desc':
          node.details = val;
          break;
        case 'dose':
        case 'lieu':
          node.dose = val;
          if (!node.type) node.type = 'dose';
          break;
        case 'flags':
        case 'redflags':
        case 'alert':
          node.redFlags = val.split(/[,;]/).map(s => s.trim()).filter(Boolean);
          break;
        case 'tool':
        case 'toolurl':
          node.toolUrl = val;
          if (!node.type) node.type = 'tool';
          break;
        case 'evidence':
        case 'ebm':
          node.evidence = val;
          break;
        case 'icon':
          node.icon = val.startsWith('fa-') ? val : `fa-${val}`;
          break;
      }
    }

    return node;
  }

  /**
   * Phân tích các chỉ thị class trong code Mermaid (VD: class A,B danger)
   */
  private static parseClassDirective(line: string, nodeMap: Map<string, MedicalFlowNode>): void {
    const classMatch = line.match(/^class\s+([a-zA-Z0-9_,-]+)\s+([a-zA-Z0-9_-]+)/i);
    if (!classMatch) return;

    const ids = classMatch[1]!.split(',').map(s => s.trim());
    const className = classMatch[2]!.trim().toLowerCase();

    ids.forEach(id => {
      if (nodeMap.has(id)) {
        nodeMap.get(id)!.type = className;
      }
    });
  }

  /**
   * Tự động chia dòng văn bản thông minh theo từ ngữ (Word-boundary wrapping)
   * Trả về mảng các dòng với độ dài tối đa maxCharsPerLine, tối đa maxLines dòng
   */
  public static wrapText(text: string, maxCharsPerLine: number = 24, maxLines: number = 2): string[] {
    if (!text) return [''];
    const words = text.trim().split(/\s+/);
    const lines: string[] = [];
    let currentLine = '';

    for (let i = 0; i < words.length; i++) {
      const word = words[i]!;
      const testLine = currentLine ? `${currentLine} ${word}` : word;

      if (testLine.length <= maxCharsPerLine) {
        currentLine = testLine;
      } else {
        if (currentLine) {
          lines.push(currentLine);
          currentLine = word;
        } else {
          // Từ đơn lẻ quá dài so với maxCharsPerLine
          lines.push(word.substring(0, maxCharsPerLine - 1) + '…');
          currentLine = '';
        }

        if (lines.length >= maxLines) {
          break;
        }
      }
    }

    if (currentLine && lines.length < maxLines) {
      lines.push(currentLine);
    } else if (currentLine && lines.length >= maxLines) {
      // Đã đạt giới hạn dòng, thêm dấu ... vào dòng cuối
      lines[maxLines - 1] = lines[maxLines - 1]!.length > maxCharsPerLine - 3
        ? lines[maxLines - 1]!.substring(0, maxCharsPerLine - 4) + '...'
        : lines[maxLines - 1] + '...';
    }

    return lines;
  }

  /**
   * Thuật toán phân cấp thứ bậc (Hierarchical DAG Layout & Orthogonal Routing)
   * Tự động tính toán toạ độ x, y, width, height và các điểm neo đường nối vuông góc
   */
  public static calculateHierarchicalLayout(diagram: MedicalFlowDiagram): void {
    const { nodes, edges, direction } = diagram;
    if (nodes.length === 0) return;

    const rootId = diagram.rootId || nodes[0]!.id;

    // 1. Tính bậc sâu (depth/rank) của từng node bằng BFS
    const depths = new Map<string, number>();
    depths.set(rootId, 0);

    // Tính in-degree để tìm các root bổ sung nếu có
    const inDegree = new Map<string, number>();
    nodes.forEach(n => inDegree.set(n.id, 0));
    edges.forEach(e => {
      inDegree.set(e.target, (inDegree.get(e.target) || 0) + 1);
    });

    const rootQueue: string[] = [];
    nodes.forEach(n => {
      if ((inDegree.get(n.id) || 0) === 0) {
        rootQueue.push(n.id);
        depths.set(n.id, 0);
      }
    });

    if (rootQueue.length === 0) rootQueue.push(rootId);

    const queue = [...rootQueue];
    const maxAllowedDepth = nodes.length;
    let iterations = 0;
    const maxIterations = nodes.length * nodes.length + 100;

    while (queue.length > 0 && iterations < maxIterations) {
      iterations++;
      const currId = queue.shift()!;
      const currDepth = depths.get(currId)!;
      if (currDepth >= maxAllowedDepth) continue; // Phá vỡ chu trình lặp ngược (Cycle breaking)

      const outEdges = edges.filter(e => e.source === currId);

      outEdges.forEach(e => {
        const targetDepth = depths.get(e.target);
        if (targetDepth === undefined || (targetDepth < currDepth + 1 && currDepth + 1 < maxAllowedDepth)) {
          depths.set(e.target, currDepth + 1);
          queue.push(e.target);
        }
      });
    }

    // Đảm bảo mọi node đều có level
    nodes.forEach(n => {
      if (!depths.has(n.id)) depths.set(n.id, 0);
    });

    // 2. Nhóm các node theo Level
    const levelGroups = new Map<number, MedicalFlowNode[]>();
    nodes.forEach(n => {
      const d = depths.get(n.id)!;
      if (!levelGroups.has(d)) levelGroups.set(d, []);
      levelGroups.get(d)!.push(n);
    });

    const maxLevel = Math.max(...levelGroups.keys(), 0);

    // 3. Phân bổ kích thước & toạ độ
    const nodeDefaultWidth = 240;
    const levelSpacing = direction === 'TD' ? 160 : 280;
    const siblingSpacing = direction === 'TD' ? 60 : 50;

    let maxBreadth = 0;
    levelGroups.forEach(nodesInLevel => {
      maxBreadth = Math.max(maxBreadth, nodesInLevel.length);
    });

    const canvasPadding = 60;
    const calculatedWidth = direction === 'TD'
      ? Math.max(960, maxBreadth * (nodeDefaultWidth + siblingSpacing) + canvasPadding * 2)
      : Math.max(960, (maxLevel + 1) * levelSpacing + canvasPadding * 2);

    const calculatedHeight = direction === 'TD'
      ? Math.max(640, (maxLevel + 1) * levelSpacing + canvasPadding * 2)
      : Math.max(640, maxBreadth * (95 + siblingSpacing) + canvasPadding * 2);

    diagram.width = calculatedWidth;
    diagram.height = calculatedHeight;

    levelGroups.forEach((nodesInLevel, level) => {
      const count = nodesInLevel.length;

      if (direction === 'TD') {
        const y = canvasPadding + level * levelSpacing;
        const totalLevelWidth = count * nodeDefaultWidth + (count - 1) * siblingSpacing;
        const startX = (calculatedWidth - totalLevelWidth) / 2;

        nodesInLevel.forEach((n, idx) => {
          // Tính toán chiều cao động theo số dòng tiêu đề, badge, subtitle và dose
          const titleLines = MedicalFlowDSL.wrapText(n.title, 24, 2);
          let dynamicH = 65;
          if (n.badge) dynamicH += 18;
          dynamicH += titleLines.length * 16;
          if (n.subtitle) dynamicH += 22;
          if (n.dose) dynamicH += 22;

          n.width = n.width || (n.shape === 'diamond' ? 260 : nodeDefaultWidth);
          n.height = n.height || Math.max(80, dynamicH);
          n.x = Math.round(startX + idx * (nodeDefaultWidth + siblingSpacing));
          n.y = Math.round(y);
        });
      } else {
        // Direction LR
        const x = canvasPadding + level * levelSpacing;
        const nodeDefaultHeight = 85;
        const totalLevelHeight = count * nodeDefaultHeight + (count - 1) * siblingSpacing;
        const startY = (calculatedHeight - totalLevelHeight) / 2;

        nodesInLevel.forEach((n, idx) => {
          const titleLines = MedicalFlowDSL.wrapText(n.title, 24, 2);
          let dynamicH = 65;
          if (n.badge) dynamicH += 18;
          dynamicH += titleLines.length * 16;
          if (n.subtitle) dynamicH += 22;
          if (n.dose) dynamicH += 22;

          n.width = n.width || nodeDefaultWidth;
          n.height = n.height || Math.max(80, dynamicH);
          n.x = Math.round(x);
          n.y = Math.round(startY + idx * (nodeDefaultHeight + siblingSpacing));
        });
      }
    });

    // 4. Thiết lập điểm neo trực giao (Orthogonal Anchors & Waypoints)
    edges.forEach(edge => {
      const srcNode = nodes.find(n => n.id === edge.source);
      const tgtNode = nodes.find(n => n.id === edge.target);
      if (!srcNode || !tgtNode) return;

      if (direction === 'TD') {
        const isTargetBelow = (tgtNode.y || 0) > (srcNode.y || 0);
        const isTargetRight = (tgtNode.x || 0) > (srcNode.x || 0);
        const isDirectColumn = Math.abs((srcNode.x || 0) - (tgtNode.x || 0)) < 20;

        if (isTargetBelow) {
          edge.exitY = 1.0;
          edge.entryY = 0.0;
          edge.exitX = isDirectColumn ? 0.5 : isTargetRight ? 0.7 : 0.3;
          edge.entryX = 0.5;
        } else if (Math.abs((srcNode.y || 0) - (tgtNode.y || 0)) < 30) {
          // Cùng hàng ngang (Horizontal same-level connection)
          edge.exitX = isTargetRight ? 1.0 : 0.0;
          edge.exitY = 0.5;
          edge.entryX = isTargetRight ? 0.0 : 1.0;
          edge.entryY = 0.5;
        } else {
          // Nhánh lặp lại ngược lên trên (Loopback)
          edge.exitX = 1.0;
          edge.exitY = 0.5;
          edge.entryX = 1.0;
          edge.entryY = 0.5;
        }
      } else {
        // Direction LR
        edge.exitX = 1.0;
        edge.exitY = 0.5;
        edge.entryX = 0.0;
        edge.entryY = 0.5;
      }
    });
  }

  /**
   * Chuyển đổi ngược từ cấu trúc đối tượng sang văn bản code DSL Mermaid
   */
  public static exportToDSL(diagram: MedicalFlowDiagram): string {
    const lines: string[] = [];
    lines.push(`flowchart ${diagram.direction || 'TD'}`);
    if (diagram.title) {
      lines.push(`%% title: ${diagram.title}`);
    }
    lines.push('');

    // Khai báo các node chi tiết
    diagram.nodes.forEach(node => {
      const metaParts: string[] = [];
      if (node.badge) metaParts.push(`badge: ${node.badge}`);
      if (node.type && node.type !== 'action') metaParts.push(`type: ${node.type}`);
      if (node.subtitle) metaParts.push(`sub: ${node.subtitle}`);
      if (node.dose) metaParts.push(`dose: ${node.dose}`);
      if (node.redFlags && node.redFlags.length > 0) metaParts.push(`flags: ${node.redFlags.join(', ')}`);
      if (node.toolUrl) metaParts.push(`tool: ${node.toolUrl}`);
      if (node.evidence) metaParts.push(`evidence: ${node.evidence}`);

      const metaStr = metaParts.length > 0 ? ` | ${metaParts.join(' | ')}` : '';
      const shape = node.shape || (node.type === 'question' ? 'diamond' : 'rect');

      let nodeDef = '';
      switch (shape) {
        case 'diamond':
          nodeDef = `${node.id}{${node.title}${metaStr}}`;
          break;
        case 'pill':
          nodeDef = `${node.id}([${node.title}${metaStr}])`;
          break;
        case 'circle':
          nodeDef = `${node.id}((${node.title}${metaStr}))`;
          break;
        case 'subroutine':
          nodeDef = `${node.id}[[${node.title}${metaStr}]]`;
          break;
        case 'hexagon':
          nodeDef = `${node.id}{{${node.title}${metaStr}}}`;
          break;
        default:
          nodeDef = `${node.id}[${node.title}${metaStr}]`;
          break;
      }

      lines.push(`  ${nodeDef}`);
    });

    lines.push('');

    // Khai báo các đường nối (Edges)
    diagram.edges.forEach(edge => {
      const arrow = edge.type === 'danger' ? '==>' 
        : edge.type === 'warning' ? '-.->' 
        : '-->';
      const labelStr = edge.label ? `|${edge.label}|` : '';
      lines.push(`  ${edge.source} ${arrow}${labelStr} ${edge.target}`);
    });

    return lines.join('\n');
  }

  /**
   * Xuất ra chuỗi mã Pure Inline SVG đạt chuẩn 100% flowchart-module skill:
   * - 100% Dark Mode Tokens `var(--color-...)`
   * - Rounded Right-Angle Orthogonal Routing (Rule 3)
   * - Label Masking Rect (Rule 4 & Rule 5)
   * - No drop-shadows (Rule 5)
   * - TUYỆT ĐỐI CẤM thẻ HTML trong SVG `<text>` (Rule 7)
   */
  public static exportToSVG(diagram: MedicalFlowDiagram): string {
    const { width, height, nodes, edges } = diagram;

    const escape = (s: string) => (s || '')
      .replace(/<[^>]*>/g, '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');

    // 1. Vẽ các đường nối trực giao (Orthogonal Edges)
    const edgesSvg = edges.map(edge => {
      const src = nodes.find(n => n.id === edge.source);
      const tgt = nodes.find(n => n.id === edge.target);
      if (!src || !tgt) return '';

      const exitX = edge.exitX !== undefined ? edge.exitX : 0.5;
      const exitY = edge.exitY !== undefined ? edge.exitY : 1.0;
      const entryX = edge.entryX !== undefined ? edge.entryX : 0.5;
      const entryY = edge.entryY !== undefined ? edge.entryY : 0.0;

      const startX = (src.x || 0) + (src.width || 240) * exitX;
      const startY = (src.y || 0) + (src.height || 85) * exitY;
      const endX = (tgt.x || 0) + (tgt.width || 240) * entryX;
      const endY = (tgt.y || 0) + (tgt.height || 85) * entryY;

      let pathD = '';
      let labelX = (startX + endX) / 2;
      let labelY = (startY + endY) / 2;

      if (Math.abs(startX - endX) < 4) {
        pathD = `M ${startX} ${startY} L ${endX} ${endY}`;
        labelY = (startY + endY) / 2;
      } else if (Math.abs(startY - endY) < 4) {
        pathD = `M ${startX} ${startY} L ${endX} ${endY}`;
        labelX = (startX + endX) / 2;
        labelY = startY;
      } else {
        const midY = startY + (endY - startY) * 0.5;
        const radius = 6;
        const dirY = endY > startY ? 1 : -1;
        const dirX = endX > startX ? 1 : -1;

        pathD = `M ${startX} ${startY} ` +
                `L ${startX} ${midY - radius * dirY} ` +
                `Q ${startX} ${midY} ${startX + radius * dirX} ${midY} ` +
                `L ${endX - radius * dirX} ${midY} ` +
                `Q ${endX} ${midY} ${endX} ${midY + radius * dirY} ` +
                `L ${endX} ${endY}`;

        labelX = (startX + endX) / 2;
        labelY = midY;
      }

      const strokeColor = edge.type === 'danger' ? 'var(--color-danger, #ef4444)'
        : edge.type === 'success' ? 'var(--color-success, #10b981)'
        : 'var(--color-border, #94a3b8)';

      const markerId = edge.type === 'danger' ? 'arrow-danger'
        : edge.type === 'success' ? 'arrow-success'
        : 'arrow-normal';

      let labelSvg = '';
      if (edge.label) {
        const approxW = Math.max(54, edge.label.length * 8 + 16);
        const approxH = 20;
        labelSvg = `
          <g class="flow-edge-label" transform="translate(${labelX}, ${labelY})">
            <!-- Mặt nạ che đường nối (Rule 5) -->
            <rect x="${-approxW / 2}" y="${-approxH / 2}" width="${approxW}" height="${approxH}" rx="4" fill="var(--color-surface, #ffffff)" stroke="${strokeColor}" stroke-width="0.8" />
            <text text-anchor="middle" dy="4" font-size="10.5" font-weight="600" fill="var(--color-text, #0f172a)" font-family="Inter, sans-serif">${escape(edge.label)}</text>
          </g>
        `;
      }

      return `
        <g class="flow-edge" data-edge-id="${edge.id}">
          <path d="${pathD}" fill="none" stroke="${strokeColor}" stroke-width="${edge.type === 'danger' ? '2' : '1.5'}" marker-end="url(#${markerId})" />
          ${labelSvg}
        </g>
      `;
    }).join('\n');

    // 2. Vẽ các Node Y khoa chuẩn Editorial
    const nodesSvg = nodes.map(node => {
      const x = node.x || 0;
      const y = node.y || 0;
      const w = node.width || 240;
      const h = node.height || 85;
      const type = node.type || 'action';

      // Màu sắc theo Design Tokens CliniPortal
      let fill = 'var(--color-surface, #ffffff)';
      let stroke = 'var(--color-border, #cbd5e1)';
      let strokeWidth = '1';

      if (type === 'start') {
        fill = 'var(--color-primary-hl, #f0f9ff)';
        stroke = 'var(--color-primary, #0284c7)';
        strokeWidth = '1.5';
      } else if (type === 'danger' || type === 'focal' || type === 'alert') {
        fill = 'var(--color-danger-hl, #fef2f2)';
        stroke = 'var(--color-danger, #ef4444)';
        strokeWidth = '2';
      } else if (type === 'question' || type === 'decision') {
        fill = 'var(--color-warning-hl, #fffbeb)';
        stroke = 'var(--color-warning, #f59e0b)';
        strokeWidth = '1.5';
      } else if (type === 'success') {
        fill = 'var(--color-success-hl, #f0fdf4)';
        stroke = 'var(--color-success, #10b981)';
        strokeWidth = '1.5';
      } else if (type === 'dose') {
        fill = 'var(--color-surface, #ffffff)';
        stroke = 'var(--color-purple, #8b5cf6)';
        strokeWidth = '1.5';
      }

      let shapeSvg = '';
      const isDiamond = node.shape === 'diamond';
      if (isDiamond) {
        const midX = w / 2;
        const midY = h / 2;
        shapeSvg = `<polygon points="${midX},0 ${w},${midY} ${midX},${h} 0,${midY}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" />`;
      } else if (node.shape === 'pill') {
        shapeSvg = `<rect x="0" y="0" width="${w}" height="${h}" rx="${h / 2}" ry="${h / 2}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" />`;
      } else {
        // Mặc định chữ nhật bo góc nhẹ (Rule 5: rx 6-8px, không shadow)
        shapeSvg = `<rect x="0" y="0" width="${w}" height="${h}" rx="8" ry="8" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" />`;
      }

      // Tiêu đề & Nội dung Node
      const titleLines = MedicalFlowDSL.wrapText(node.title, 24, 2);
      let contentSvg = '';

      if (isDiamond) {
        // Trong hình thoi: Căn giữa tuyệt đối chữ để không cọ vào 2 góc nhọn
        const midX = w / 2;
        const midY = h / 2;
        const lineCount = titleLines.length + (node.subtitle ? 1 : 0);
        const startY = midY - ((lineCount - 1) * 16) / 2 + 4;

        contentSvg = `
          <text text-anchor="middle" x="${midX}" y="${startY}" font-size="11.5" font-weight="700" fill="var(--color-text, #0f172a)" font-family="Inter, sans-serif">
            ${titleLines.map((line, idx) => `<tspan x="${midX}" dy="${idx === 0 ? 0 : 15}">${escape(line)}</tspan>`).join('')}
          </text>
          ${node.subtitle ? `
            <text text-anchor="middle" x="${midX}" y="${startY + titleLines.length * 15}" font-size="9.5" fill="var(--color-text-muted, #64748b)" font-family="Inter, sans-serif">
              ${escape(node.subtitle.length > 36 ? node.subtitle.substring(0, 34) + '...' : node.subtitle)}
            </text>
          ` : ''}
        `;
      } else {
        // Huy hiệu (Badge Top)
        let badgeSvg = '';
        let textStartY = 28;
        if (node.badge) {
          const badgeText = escape(node.badge);
          const approxBw = Math.min(w - 24, badgeText.length * 7 + 14);
          badgeSvg = `
            <rect x="12" y="8" width="${approxBw}" height="18" rx="4" fill="${stroke}" opacity="0.15" />
            <text x="18" y="21" font-size="9.5" font-weight="700" fill="${stroke}" font-family="Inter, sans-serif">${badgeText}</text>
          `;
          textStartY = 42;
        }

        // Tiêu đề Node (Rule 7: Không dùng thẻ HTML bên trong <text>, dùng <tspan>)
        const titleSvg = `
          <text x="12" y="${textStartY}" font-size="12" font-weight="700" fill="var(--color-text, #0f172a)" font-family="Inter, sans-serif">
            ${titleLines.map((line, idx) => `<tspan x="12" dy="${idx === 0 ? 0 : 15}">${escape(line)}</tspan>`).join('')}
          </text>
        `;

        // Phụ đề (Subtitle) — tính toán startY cách dòng cuối tiêu đề tối thiểu 18px để chống đè chữ
        let subSvg = '';
        if (node.subtitle) {
          const subStartY = textStartY + (titleLines.length - 1) * 16 + 18;
          subSvg = `
            <text x="12" y="${subStartY}" font-size="10" fill="var(--color-text-muted, #64748b)" font-family="Inter, sans-serif">
              ${escape(node.subtitle.length > 38 ? node.subtitle.substring(0, 36) + '...' : node.subtitle)}
            </text>
          `;
        }

        // Dược lý / Liều thuốc (Dose Strip)
        let doseSvg = '';
        if (node.dose) {
          doseSvg = `
            <g transform="translate(12, ${h - 22})">
              <rect x="0" y="0" width="${w - 24}" height="16" rx="3" fill="var(--color-surface-2, #f1f5f9)" stroke="var(--color-border, #e2e8f0)" stroke-width="0.5" />
              <text x="6" y="11" font-size="9.5" font-weight="600" fill="var(--color-purple, #8b5cf6)" font-family="Inter, sans-serif">
                💊 ${escape(node.dose.length > 30 ? node.dose.substring(0, 28) + '...' : node.dose)}
              </text>
            </g>
          `;
        }

        contentSvg = `${badgeSvg}${titleSvg}${subSvg}${doseSvg}`;
      }

      return `
        <g class="flow-node" data-node-id="${escape(node.id)}" transform="translate(${x}, ${y})">
          ${shapeSvg}
          ${contentSvg}
        </g>
      `;
    }).join('\n');

    return `
      <svg class="clinical-flow-svg" viewBox="0 0 ${width} ${height}" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="arrow-normal" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--color-border, #94a3b8)" />
          </marker>
          <marker id="arrow-danger" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--color-danger, #ef4444)" />
          </marker>
          <marker id="arrow-success" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--color-success, #10b981)" />
          </marker>
        </defs>
        <g class="flow-transform-layer" style="transform-origin: 0 0; transition: transform 0.05s ease-out;">
          <g class="flow-layer-edges">
            ${edgesSvg}
          </g>
          <g class="flow-layer-nodes">
            ${nodesSvg}
          </g>
        </g>
      </svg>
    `.trim();
  }
}
