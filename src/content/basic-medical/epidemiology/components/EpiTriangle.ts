/**
 * CliniPortal — Epidemiology Triangle Component (TypeScript)
 * Path: src/content/basic-medical/epidemiology/components/EpiTriangle.ts
 * 
 * Sơ đồ Tam Giác Dịch Tễ Học (Agent - Host - Environment) tương tác chuẩn Editorial:
 * - Thiết kế Bento Triad hiện đại, responsive 100% trên Mobile & Desktop
 * - Hệ màu tương phản cao theo từng trục: Đỏ (Agent) - Lam (Host) - Lục (Environment) - Tím (Vector)
 * - Tương thích hoàn hảo Dark Mode (data-theme="dark")
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
  const {
    agent,
    host,
    environment,
    vectorOrBridge = 'VÉC-TƠ TRUNG GIAN',
    centerTitle = 'TIÊU ĐIỂM DỊCH'
  } = props;

  const agentColor = agent.color || '#ef4444';
  const hostColor = host.color || '#3b82f6';
  const envColor = environment.color || '#10b981';

  return `
    <div class="epi-triangle-wrapper" style="margin: 2rem 0; padding: 1.5rem 1.25rem; background: var(--color-surface, #ffffff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 20px; box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.05), 0 4px 12px rgba(0,0,0,0.02); transition: all 0.25s ease;">
      
      <!-- Top Title & Badge -->
      <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 1.5rem; padding-bottom: 0.85rem; border-bottom: 1px dashed var(--color-border, #cbd5e1);">
        <div style="display: flex; align-items: center; gap: 0.55rem;">
          <span style="display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: 8px; background: rgba(13, 148, 136, 0.12); color: #0d9488; font-size: 1rem;">
            <i class="fa-solid fa-draw-polygon"></i>
          </span>
          <div>
            <h4 style="margin: 0; font-size: 1.05rem; font-weight: 800; color: var(--color-text, #0f172a); font-family: var(--font-display, 'Plus Jakarta Sans', sans-serif);">
              Mô Hình Tam Giác Dịch Tễ Học Tương Tác
            </h4>
            <p style="margin: 0; font-size: 0.76rem; color: var(--color-text-muted, #64748b);">
              Mối tương tác ba chiều quyết định nguy cơ bùng phát và duy trì ổ dịch trong quần thể
            </p>
          </div>
        </div>
        
        <span class="badge" style="background: rgba(13, 148, 136, 0.1); color: #0d9488; border: 1px solid rgba(13, 148, 136, 0.25); font-weight: 700; font-size: 0.75rem; padding: 0.3rem 0.75rem; border-radius: 999px; text-transform: uppercase; letter-spacing: 0.03em;">
          Epidemiologic Triad
        </span>
      </div>

      <!-- Central Transmission Vector Floating Pill -->
      <div style="text-align: center; margin-bottom: 1.25rem;">
        <div style="display: inline-flex; align-items: center; gap: 0.6rem; padding: 0.45rem 1.15rem; background: linear-gradient(135deg, rgba(225, 29, 72, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%); border: 1.5px solid rgba(225, 29, 72, 0.25); border-radius: 999px; box-shadow: 0 4px 14px rgba(225, 29, 72, 0.08);">
          <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: #e11d48; box-shadow: 0 0 8px #e11d48;"></span>
          <span style="font-size: 0.8rem; font-weight: 800; color: #be123c; text-transform: uppercase; letter-spacing: 0.04em; font-family: var(--font-display, 'Plus Jakarta Sans', sans-serif);">
            ${vectorOrBridge}
          </span>
          <span style="font-size: 0.74rem; color: var(--color-text-muted, #64748b); font-weight: 600;">• ${centerTitle}</span>
        </div>
      </div>

      <!-- 3-Node Triad Grid -->
      <div class="epi-triad-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem; margin-bottom: 1.25rem;">
        
        <!-- NODE 1: AGENT (TÁC NHÂN) -->
        <div class="epi-triad-card agent-card" style="background: linear-gradient(180deg, rgba(239, 68, 68, 0.04) 0%, var(--color-surface-2, #f8fafc) 100%); border: 1.5px solid rgba(239, 68, 68, 0.25); border-radius: 16px; padding: 1.25rem; position: relative; overflow: hidden; box-shadow: 0 4px 12px rgba(239, 68, 68, 0.04); transition: transform 0.2s ease;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem;">
            <span style="font-size: 0.72rem; font-weight: 800; color: #ffffff; background: ${agentColor}; padding: 0.25rem 0.65rem; border-radius: 6px; text-transform: uppercase; letter-spacing: 0.03em;">
              1. Tác Nhân (Agent)
            </span>
            <i class="fa-solid fa-virus" style="color: ${agentColor}; font-size: 1.1rem;"></i>
          </div>
          
          <h4 style="font-size: 1.05rem; font-weight: 800; color: ${agentColor}; margin: 0 0 0.35rem 0; line-height: 1.35; font-family: var(--font-display, 'Plus Jakarta Sans', sans-serif);">
            ${agent.title}
          </h4>
          
          ${agent.subtitle ? `
            <div style="font-size: 0.78rem; font-weight: 600; color: var(--color-text-muted, #64748b); margin-bottom: 0.75rem; line-height: 1.4;">
              ${agent.subtitle}
            </div>
          ` : ''}
          
          <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.45rem;">
            ${agent.items.map(item => `
              <li style="font-size: 0.84rem; color: var(--color-text, #1e293b); line-height: 1.45; display: flex; align-items: flex-start; gap: 0.45rem;">
                <i class="fa-solid fa-circle-dot" style="color: ${agentColor}; font-size: 0.65rem; margin-top: 0.3rem; flex-shrink: 0;"></i>
                <span>${item}</span>
              </li>
            `).join('')}
          </ul>
        </div>

        <!-- NODE 2: HOST (VẬT CHỦ) -->
        <div class="epi-triad-card host-card" style="background: linear-gradient(180deg, rgba(59, 130, 246, 0.04) 0%, var(--color-surface-2, #f8fafc) 100%); border: 1.5px solid rgba(59, 130, 246, 0.25); border-radius: 16px; padding: 1.25rem; position: relative; overflow: hidden; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.04); transition: transform 0.2s ease;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem;">
            <span style="font-size: 0.72rem; font-weight: 800; color: #ffffff; background: ${hostColor}; padding: 0.25rem 0.65rem; border-radius: 6px; text-transform: uppercase; letter-spacing: 0.03em;">
              2. Vật Chủ (Host)
            </span>
            <i class="fa-solid fa-users" style="color: ${hostColor}; font-size: 1.1rem;"></i>
          </div>
          
          <h4 style="font-size: 1.05rem; font-weight: 800; color: ${hostColor}; margin: 0 0 0.35rem 0; line-height: 1.35; font-family: var(--font-display, 'Plus Jakarta Sans', sans-serif);">
            ${host.title}
          </h4>
          
          ${host.subtitle ? `
            <div style="font-size: 0.78rem; font-weight: 600; color: var(--color-text-muted, #64748b); margin-bottom: 0.75rem; line-height: 1.4;">
              ${host.subtitle}
            </div>
          ` : ''}
          
          <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.45rem;">
            ${host.items.map(item => `
              <li style="font-size: 0.84rem; color: var(--color-text, #1e293b); line-height: 1.45; display: flex; align-items: flex-start; gap: 0.45rem;">
                <i class="fa-solid fa-circle-dot" style="color: ${hostColor}; font-size: 0.65rem; margin-top: 0.3rem; flex-shrink: 0;"></i>
                <span>${item}</span>
              </li>
            `).join('')}
          </ul>
        </div>

        <!-- NODE 3: ENVIRONMENT (MÔI TRƯỜNG) -->
        <div class="epi-triad-card env-card" style="background: linear-gradient(180deg, rgba(16, 185, 129, 0.04) 0%, var(--color-surface-2, #f8fafc) 100%); border: 1.5px solid rgba(16, 185, 129, 0.25); border-radius: 16px; padding: 1.25rem; position: relative; overflow: hidden; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.04); transition: transform 0.2s ease;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem;">
            <span style="font-size: 0.72rem; font-weight: 800; color: #ffffff; background: ${envColor}; padding: 0.25rem 0.65rem; border-radius: 6px; text-transform: uppercase; letter-spacing: 0.03em;">
              3. Môi Trường (Environment)
            </span>
            <i class="fa-solid fa-earth-americas" style="color: ${envColor}; font-size: 1.1rem;"></i>
          </div>
          
          <h4 style="font-size: 1.05rem; font-weight: 800; color: ${envColor}; margin: 0 0 0.35rem 0; line-height: 1.35; font-family: var(--font-display, 'Plus Jakarta Sans', sans-serif);">
            ${environment.title}
          </h4>
          
          ${environment.subtitle ? `
            <div style="font-size: 0.78rem; font-weight: 600; color: var(--color-text-muted, #64748b); margin-bottom: 0.75rem; line-height: 1.4;">
              ${environment.subtitle}
            </div>
          ` : ''}
          
          <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.45rem;">
            ${environment.items.map(item => `
              <li style="font-size: 0.84rem; color: var(--color-text, #1e293b); line-height: 1.45; display: flex; align-items: flex-start; gap: 0.45rem;">
                <i class="fa-solid fa-circle-dot" style="color: ${envColor}; font-size: 0.65rem; margin-top: 0.3rem; flex-shrink: 0;"></i>
                <span>${item}</span>
              </li>
            `).join('')}
          </ul>
        </div>

      </div>

      <!-- Bottom Intervention Key Point -->
      <div style="background: rgba(var(--color-primary-rgb, 2, 132, 199), 0.05); border: 1px solid rgba(var(--color-primary-rgb, 2, 132, 199), 0.15); border-radius: 12px; padding: 0.75rem 1rem; display: flex; align-items: center; gap: 0.65rem; font-size: 0.82rem; color: var(--color-text, #0f172a);">
        <i class="fa-solid fa-lightbulb" style="color: #f59e0b; font-size: 1rem; flex-shrink: 0;"></i>
        <div style="line-height: 1.5;">
          <strong>Nguyên lý can thiệp dịch tễ học:</strong> Phá vỡ chuỗi lây truyền bằng cách tác động vào bất kỳ đỉnh nào của tam giác (Tiêu diệt/kháng tác nhân, Tiêm chủng/tăng đề kháng vật chủ, hoặc Cải tạo vệ sinh môi trường & triệt phá véc-tơ trung gian).
        </div>
      </div>

    </div>
  `;
}
