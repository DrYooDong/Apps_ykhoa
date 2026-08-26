/**
 * CliniPortal — Epidemiology Triangle Component (TypeScript)
 * Path: src/content/basic-medical/epidemiology/components/EpiTriangle.ts
 * 
 * Vẽ sơ đồ Tam Giác Dịch Tễ Học (Agent - Host - Environment) chuẩn Editorial SVG Studio:
 * - 100% Native SVG, Responsive, Dark Mode compatible
 * - Không dùng thẻ HTML trong <text> SVG
 * - Hỗ trợ các node tương tác có tooltip & pulse hub trung tâm
 */

export interface EpiTriangleNode {
  title: string;
  subtitle?: string;
  items: string[];
  color?: string;
}

export interface EpiTriangleProps {
  agent: EpiTriangleNode;
  host: EpiTriangleNode;
  environment: EpiTriangleNode;
  vectorOrBridge?: string;
  centerTitle?: string;
}

export function renderEpiTriangle(props: EpiTriangleProps): string {
  const { agent, host, environment, vectorOrBridge = 'VÉC-TƠ TRUNG GIAN', centerTitle = 'TIÊU ĐIỂM DỊCH' } = props;

  const agentColor = agent.color || '#ef4444';
  const hostColor = host.color || '#3b82f6';
  const envColor = environment.color || '#10b981';

  return `
    <div class="epi-triangle-container" style="width: 100%; max-width: 900px; margin: 1.5rem auto; padding: 1rem; background: var(--color-surface, #ffffff); border-radius: 16px; border: 1px solid var(--color-border, #e2e8f0); box-shadow: 0 4px 20px rgba(0,0,0,0.04);">
      <div style="text-align: center; margin-bottom: 1rem;">
        <span class="badge" style="background: rgba(13, 148, 136, 0.12); color: #0d9488; font-weight: 700; font-size: 0.78rem; padding: 0.3rem 0.8rem; border-radius: 999px;">
          <i class="fa-solid fa-draw-polygon"></i> MÔ HÌNH TAM GIÁC DỊCH TỄ HỌC TƯƠNG TÁC
        </span>
      </div>

      <svg viewBox="0 0 860 480" width="100%" height="100%" style="overflow: visible; font-family: 'Plus Jakarta Sans', Inter, sans-serif;">
        <defs>
          <filter id="epi-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          
          <linearGradient id="grad-agent-host" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="${agentColor}" stop-opacity="0.8" />
            <stop offset="100%" stop-color="${hostColor}" stop-opacity="0.8" />
          </linearGradient>

          <linearGradient id="grad-agent-env" x1="0%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stop-color="${agentColor}" stop-opacity="0.8" />
            <stop offset="100%" stop-color="${envColor}" stop-opacity="0.8" />
          </linearGradient>

          <linearGradient id="grad-host-env" x1="100%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stop-color="${hostColor}" stop-opacity="0.8" />
            <stop offset="100%" stop-color="${envColor}" stop-opacity="0.8" />
          </linearGradient>

          <!-- Marker Arrows -->
          <marker id="arrow-agent" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="${agentColor}" />
          </marker>
          <marker id="arrow-host" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="${hostColor}" />
          </marker>
          <marker id="arrow-env" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="${envColor}" />
          </marker>
        </defs>

        <!-- Dynamic Triangle Connectors -->
        <path d="M 230 110 L 630 110" stroke="url(#grad-agent-host)" stroke-width="3" stroke-dasharray="6,4" />
        <path d="M 170 170 L 370 370" stroke="url(#grad-agent-env)" stroke-width="3" stroke-dasharray="6,4" />
        <path d="M 690 170 L 490 370" stroke="url(#grad-host-env)" stroke-width="3" stroke-dasharray="6,4" />

        <!-- Central Pulse Epicenter -->
        <circle cx="430" cy="240" r="54" fill="rgba(244, 63, 94, 0.08)" stroke="#f43f5e" stroke-width="2" stroke-dasharray="4,3" />
        <circle cx="430" cy="240" r="38" fill="rgba(244, 63, 94, 0.15)" />
        <text x="430" y="235" text-anchor="middle" font-size="11" font-weight="800" fill="#e11d48" letter-spacing="0.05em">
          ${centerTitle}
        </text>
        <text x="430" y="252" text-anchor="middle" font-size="9" font-weight="600" fill="var(--color-text-muted, #64748b)">
          ${vectorOrBridge}
        </text>

        <!-- 1. AGENT NODE (Top-Left: x=30, y=40) -->
        <g transform="translate(30, 40)">
          <rect width="250" height="130" rx="14" fill="var(--color-surface-offset, #f8fafc)" stroke="${agentColor}" stroke-width="1.8" />
          <rect x="14" y="-12" width="120" height="24" rx="12" fill="${agentColor}" />
          <text x="74" y="4" text-anchor="middle" font-size="10.5" font-weight="800" fill="#ffffff">
            1. TÁC NHÂN (AGENT)
          </text>
          <text x="16" y="32" font-size="12" font-weight="800" fill="${agentColor}">
            ${agent.title}
          </text>
          ${agent.subtitle ? `<text x="16" y="48" font-size="10" font-weight="600" fill="var(--color-text-muted, #64748b)">${agent.subtitle}</text>` : ''}
          ${agent.items.slice(0, 3).map((item, idx) => `
            <text x="16" y="${agent.subtitle ? 68 + idx * 18 : 54 + idx * 18}" font-size="10" font-weight="500" fill="var(--color-text, #0f172a)">
              • ${item}
            </text>
          `).join('')}
        </g>

        <!-- 2. HOST NODE (Top-Right: x=580, y=40) -->
        <g transform="translate(580, 40)">
          <rect width="250" height="130" rx="14" fill="var(--color-surface-offset, #f8fafc)" stroke="${hostColor}" stroke-width="1.8" />
          <rect x="14" y="-12" width="120" height="24" rx="12" fill="${hostColor}" />
          <text x="74" y="4" text-anchor="middle" font-size="10.5" font-weight="800" fill="#ffffff">
            2. VẬT CHỦ (HOST)
          </text>
          <text x="16" y="32" font-size="12" font-weight="800" fill="${hostColor}">
            ${host.title}
          </text>
          ${host.subtitle ? `<text x="16" y="48" font-size="10" font-weight="600" fill="var(--color-text-muted, #64748b)">${host.subtitle}</text>` : ''}
          ${host.items.slice(0, 3).map((item, idx) => `
            <text x="16" y="${host.subtitle ? 68 + idx * 18 : 54 + idx * 18}" font-size="10" font-weight="500" fill="var(--color-text, #0f172a)">
              • ${item}
            </text>
          `).join('')}
        </g>

        <!-- 3. ENVIRONMENT NODE (Bottom-Center: x=305, y=320) -->
        <g transform="translate(305, 320)">
          <rect width="250" height="130" rx="14" fill="var(--color-surface-offset, #f8fafc)" stroke="${envColor}" stroke-width="1.8" />
          <rect x="14" y="-12" width="130" height="24" rx="12" fill="${envColor}" />
          <text x="79" y="4" text-anchor="middle" font-size="10.5" font-weight="800" fill="#ffffff">
            3. MÔI TRƯỜNG (ENV)
          </text>
          <text x="16" y="32" font-size="12" font-weight="800" fill="${envColor}">
            ${environment.title}
          </text>
          ${environment.subtitle ? `<text x="16" y="48" font-size="10" font-weight="600" fill="var(--color-text-muted, #64748b)">${environment.subtitle}</text>` : ''}
          ${environment.items.slice(0, 3).map((item, idx) => `
            <text x="16" y="${environment.subtitle ? 68 + idx * 18 : 54 + idx * 18}" font-size="10" font-weight="500" fill="var(--color-text, #0f172a)">
              • ${item}
            </text>
          `).join('')}
        </g>
      </svg>
    </div>
  `;
}
