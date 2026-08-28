/**
 * CliniPortal — Epidemiology Transmission Cycle Component (TypeScript)
 * Path: src/content/basic-medical/epidemiology/components/EpiTransmissionCycle.ts
 * 
 * Trực quan hóa Chu Kỳ Lây Truyền & Động Học Thời Kỳ Ủ Bệnh (EIP / IIP):
 * - Thiết kế Flow Ribbon & Process Cards tuần hoàn (Closed-Loop Transmission)
 * - Highlight từng giai đoạn: Nguồn lây -> Véc-tơ truyền bệnh (EIP) -> Vật chủ cảm nhiễm (IIP) -> Ca bệnh mới
 * - 100% Dark Mode compatible, Mobile Responsive
 */

export interface TransmissionStep {
  stage: string;
  title: string;
  badge?: string;
  badgeType?: 'primary' | 'danger' | 'warning' | 'teal' | 'indigo';
  icon?: string;
  duration?: string;
  description?: string;
  details?: string[];
}

export interface EpiTransmissionCycleProps {
  title?: string;
  subtitle?: string;
  vectorName?: string;
  eipDuration?: string;
  iipDuration?: string;
  steps?: TransmissionStep[];
}

export function renderEpiTransmissionCycle(props?: Partial<EpiTransmissionCycleProps>): string {
  const title = props?.title || 'Chu Kỳ Lây Truyền Động Học (Transmission Cycle)';
  const subtitle = props?.subtitle || 'Động thái kép giữa Thời kỳ ủ bệnh ngoại lai (EIP) trong véc-tơ & Ủ bệnh nội lai (IIP) trong cơ thể người';
  const eipDuration = props?.eipDuration || '8 – 12 ngày (ở 28°C–30°C)';
  const iipDuration = props?.iipDuration || '4 – 10 ngày (trung bình 4 – 7 ngày)';
  const vectorName = props?.vectorName || 'Muỗi Aedes aegypti';

  return `
    <div class="epi-transmission-cycle-wrapper" style="margin: 2rem 0; padding: 1.5rem 1.25rem; background: var(--color-surface, #ffffff); border: 1.5px solid var(--color-border, #cbd5e1); border-radius: 20px; box-shadow: 0 10px 30px -5px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.02);">
      
      <!-- Top Title Header -->
      <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 1.5rem; padding-bottom: 0.85rem; border-bottom: 1px dashed var(--color-border, #cbd5e1);">
        <div style="display: flex; align-items: center; gap: 0.6rem;">
          <span style="display: inline-flex; align-items: center; justify-content: center; width: 34px; height: 34px; border-radius: 10px; background: linear-gradient(135deg, rgba(2, 132, 199, 0.15), rgba(13, 148, 136, 0.15)); color: var(--color-primary, #0284c7); font-size: 1.05rem;">
            <i class="fa-solid fa-arrows-spin"></i>
          </span>
          <div>
            <h4 style="margin: 0; font-size: 1.08rem; font-weight: 800; color: var(--color-text, #0f172a); font-family: var(--font-display, 'Plus Jakarta Sans', sans-serif);">
              ${title}
            </h4>
            <p style="margin: 0; font-size: 0.78rem; color: var(--color-text-muted, #64748b);">
              ${subtitle}
            </p>
          </div>
        </div>
        
        <span class="badge" style="background: rgba(2, 132, 199, 0.1); color: var(--color-primary, #0284c7); border: 1px solid rgba(2, 132, 199, 0.25); font-weight: 700; font-size: 0.75rem; padding: 0.3rem 0.75rem; border-radius: 999px; text-transform: uppercase;">
          <i class="fa-solid fa-repeat"></i> Vòng lặp khép kín
        </span>
      </div>

      <!-- Transmission Loop Process Flow Ribbon (4 Connected Stages) -->
      <div class="epi-cycle-steps-container" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem; margin-bottom: 1.5rem; position: relative;">
        
        <!-- STAGE 1: NGUỒN LÂY / VIREMIA -->
        <div class="epi-cycle-step-card" style="background: var(--color-surface-2, #f8fafc); border: 1.5px solid rgba(239, 68, 68, 0.25); border-radius: 14px; padding: 1.15rem; position: relative; box-shadow: 0 4px 12px rgba(239, 68, 68, 0.04);">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.65rem;">
            <span style="font-size: 0.7rem; font-weight: 800; color: #ffffff; background: #ef4444; padding: 0.2rem 0.55rem; border-radius: 6px; text-transform: uppercase;">
              Giai đoạn 1
            </span>
            <i class="fa-solid fa-person-dots-from-line" style="color: #ef4444; font-size: 1.1rem;"></i>
          </div>
          <h5 style="margin: 0 0 0.35rem 0; font-size: 0.96rem; font-weight: 800; color: #ef4444; font-family: var(--font-display, 'Plus Jakarta Sans', sans-serif);">
            Người Bệnh (Viremia)
          </h5>
          <p style="margin: 0; font-size: 0.8rem; line-height: 1.45; color: var(--color-text, #1e293b);">
            Tải lượng virus huyết cao (từ 1–2 ngày trước sốt đến ngày thứ 5 của bệnh).
          </p>
          <div style="margin-top: 0.75rem; padding-top: 0.6rem; border-top: 1px dashed rgba(239, 68, 68, 0.2); font-size: 0.74rem; font-weight: 700; color: #dc2626; display: flex; align-items: center; gap: 0.35rem;">
            <i class="fa-solid fa-mosquito"></i> ${vectorName} đốt hút máu
          </div>
        </div>

        <!-- STAGE 2: VÉC-TƠ & EIP -->
        <div class="epi-cycle-step-card" style="background: var(--color-surface-2, #f8fafc); border: 1.5px solid rgba(13, 148, 136, 0.3); border-radius: 14px; padding: 1.15rem; position: relative; box-shadow: 0 4px 12px rgba(13, 148, 136, 0.04);">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.65rem;">
            <span style="font-size: 0.7rem; font-weight: 800; color: #ffffff; background: #0d9488; padding: 0.2rem 0.55rem; border-radius: 6px; text-transform: uppercase;">
              Giai đoạn 2 • EIP
            </span>
            <i class="fa-solid fa-mosquito" style="color: #0d9488; font-size: 1.1rem;"></i>
          </div>
          <h5 style="margin: 0 0 0.35rem 0; font-size: 0.96rem; font-weight: 800; color: #0d9488; font-family: var(--font-display, 'Plus Jakarta Sans', sans-serif);">
            Ủ Bệnh Ngoại Lai (EIP)
          </h5>
          <p style="margin: 0; font-size: 0.8rem; line-height: 1.45; color: var(--color-text, #1e293b);">
            Virus nhân lên ở ruột giữa, qua xoang cơ thể rồi định cư tại tuyến nước bọt của muỗi.
          </p>
          <div style="margin-top: 0.75rem; padding-top: 0.6rem; border-top: 1px dashed rgba(13, 148, 136, 0.2); font-size: 0.74rem; font-weight: 700; color: #0f766e; display: flex; align-items: center; gap: 0.35rem;">
            <i class="fa-regular fa-clock"></i> Thời gian: ${eipDuration}
          </div>
        </div>

        <!-- STAGE 3: MUỖI MANG TRUYỀN NHIỄM SUỐT ĐỜI -->
        <div class="epi-cycle-step-card" style="background: var(--color-surface-2, #f8fafc); border: 1.5px solid rgba(217, 119, 6, 0.3); border-radius: 14px; padding: 1.15rem; position: relative; box-shadow: 0 4px 12px rgba(217, 119, 6, 0.04);">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.65rem;">
            <span style="font-size: 0.7rem; font-weight: 800; color: #ffffff; background: #d97706; padding: 0.2rem 0.55rem; border-radius: 6px; text-transform: uppercase;">
              Giai đoạn 3
            </span>
            <i class="fa-solid fa-biohazard" style="color: #d97706; font-size: 1.1rem;"></i>
          </div>
          <h5 style="margin: 0 0 0.35rem 0; font-size: 0.96rem; font-weight: 800; color: #d97706; font-family: var(--font-display, 'Plus Jakarta Sans', sans-serif);">
            Muỗi Mang Mầm Bệnh Suốt Đời
          </h5>
          <p style="margin: 0; font-size: 0.8rem; line-height: 1.45; color: var(--color-text, #1e293b);">
            Sau khi hoàn tất EIP, muỗi có khả năng truyền bệnh cho mọi người lành bị đốt trong suốt đời sống (30–45 ngày).
          </p>
          <div style="margin-top: 0.75rem; padding-top: 0.6rem; border-top: 1px dashed rgba(217, 119, 6, 0.2); font-size: 0.74rem; font-weight: 700; color: #b45309; display: flex; align-items: center; gap: 0.35rem;">
            <i class="fa-solid fa-person-walking-arrow-right"></i> Đốt truyền sang người lành
          </div>
        </div>

        <!-- STAGE 4: Ủ BỆNH NỘI LAI (IIP) & CA BỆNH MỚI -->
        <div class="epi-cycle-step-card" style="background: var(--color-surface-2, #f8fafc); border: 1.5px solid rgba(59, 130, 246, 0.3); border-radius: 14px; padding: 1.15rem; position: relative; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.04);">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.65rem;">
            <span style="font-size: 0.7rem; font-weight: 800; color: #ffffff; background: #3b82f6; padding: 0.2rem 0.55rem; border-radius: 6px; text-transform: uppercase;">
              Giai đoạn 4 • IIP
            </span>
            <i class="fa-solid fa-user-injured" style="color: #3b82f6; font-size: 1.1rem;"></i>
          </div>
          <h5 style="margin: 0 0 0.35rem 0; font-size: 0.96rem; font-weight: 800; color: #3b82f6; font-family: var(--font-display, 'Plus Jakarta Sans', sans-serif);">
            Ủ Bệnh Nội Lai (IIP) & Khởi Phát
          </h5>
          <p style="margin: 0; font-size: 0.8rem; line-height: 1.45; color: var(--color-text, #1e293b);">
            Virus nhân lên trong bạch cầu đơn nhân cơ thể người trước khi bùng phát cơn sốt đột ngột.
          </p>
          <div style="margin-top: 0.75rem; padding-top: 0.6rem; border-top: 1px dashed rgba(59, 130, 246, 0.2); font-size: 0.74rem; font-weight: 700; color: #1d4ed8; display: flex; align-items: center; gap: 0.35rem;">
            <i class="fa-regular fa-clock"></i> Thời gian: ${iipDuration}
          </div>
        </div>

      </div>

      <!-- Comparative Key Differences Banner (EIP vs IIP) -->
      <div style="background: linear-gradient(135deg, rgba(13, 148, 136, 0.06) 0%, rgba(59, 130, 246, 0.06) 100%); border: 1px solid rgba(13, 148, 136, 0.2); border-radius: 12px; padding: 0.85rem 1.15rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.75rem;">
        <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.82rem; color: var(--color-text, #0f172a);">
          <i class="fa-solid fa-temperature-arrow-up" style="color: #ef4444; font-size: 1.1rem;"></i>
          <div>
            <strong>Động thái nhiệt độ môi trường:</strong> Nhiệt độ tăng (28°C → 32°C) làm rút ngắn EIP từ 12 ngày xuống còn 5–7 ngày, khiến số ca nhiễm mới bùng nổ theo cấp số nhân trong mùa nắng nóng xen kẽ mưa lớn.
          </div>
        </div>
      </div>

    </div>
  `;
}
