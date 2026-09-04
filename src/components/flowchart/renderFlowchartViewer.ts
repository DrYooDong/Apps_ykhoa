/**
 * CliniPortal — Flowchart Viewer Native Renderer (TypeScript)
 * Path: src/components/flowchart/renderFlowchartViewer.ts
 * 
 * Render Lưu đồ Lâm sàng Tương tác từ cú pháp DSL sang HTML + SVG Editorial thuần:
 * - 100% Zero-dependency, Pure SVG
 * - Hỗ trợ các công cụ: Phóng to (+), Thu nhỏ (-), Tỷ lệ 100% (Reset), Toàn màn hình (Fullscreen), Sao chép DSL, Tải SVG
 * - Tương thích hoàn hảo Design Tokens & Dark Mode
 */

import { MedicalFlowDSL, type MedicalFlowDiagram } from './flow-dsl-parser';

export interface FlowchartViewerProps {
  id?: string;
  title?: string;
  code?: string;
  data?: MedicalFlowDiagram;
  height?: number;
  showInspector?: boolean;
}

export function renderFlowchartViewer(props: FlowchartViewerProps): string {
  const {
    id = `flowchart-${Math.random().toString(36).substring(2, 9)}`,
    title = '',
    code = '',
    data: inputData,
    height = 580
  } = props;

  let diagram: MedicalFlowDiagram | null = null;
  let parseErrors: any[] = [];

  if (code) {
    const result = MedicalFlowDSL.parse(code);
    diagram = result.diagram;
    parseErrors = result.errors;
  } else if (inputData) {
    diagram = inputData;
  }

  if (parseErrors.length > 0 && !diagram) {
    return `
      <div class="flow-parse-alert danger" style="padding: 1rem 1.25rem; margin: 1.5rem 0; border-radius: 10px; background: var(--color-danger-hl, #fef2f2); border: 1.5px solid var(--color-danger, #ef4444); color: var(--color-danger, #ef4444);">
        <strong style="display: flex; align-items: center; gap: 8px; font-size: 0.95rem;">
          <i class="fa-solid fa-triangle-exclamation"></i> Lỗi cú pháp Lưu đồ Lâm sàng (DSL):
        </strong>
        <ul style="margin: 0.5rem 0 0 1.25rem; font-size: 0.88rem; line-height: 1.6;">
          ${parseErrors.map(err => `<li>Dòng ${err.line}: ${err.message}</li>`).join('')}
        </ul>
      </div>
    `;
  }

  let svgHtml = '';
  if (diagram) {
    svgHtml = MedicalFlowDSL.exportToSVG(diagram);
  }

  const escapeAttr = (s: string) => (s || '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  return `
    <div class="clini-flowchart-wrapper" id="${id}" data-height="${height}" style="margin: 1.75rem 0; width: 100%;">
      ${title ? `
        <div class="flowchart-title-bar" style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 0.85rem; padding-bottom: 0.5rem; border-bottom: 1px solid var(--color-border, #e2e8f0);">
          <div style="display: flex; align-items: center; gap: 0.65rem;">
            <span class="badge" style="background: rgba(2, 132, 199, 0.12); color: var(--color-primary, #0284c7); border: 1px solid rgba(2, 132, 199, 0.25); font-weight: 800; font-size: 0.78rem; padding: 0.25rem 0.65rem; border-radius: 6px; display: inline-flex; align-items: center; gap: 5px;">
              <i class="fa-solid fa-diagram-project"></i> Lưu Đồ Lâm Sàng
            </span>
            <h3 class="flowchart-title" style="margin: 0; font-size: 1.05rem; font-weight: 700; color: var(--color-text, #0f172a); line-height: 1.4;">${title}</h3>
          </div>
          
          <div class="flow-actions-toolbar" style="display: inline-flex; align-items: center; gap: 4px; background: var(--color-surface-2, #f8fafc); padding: 3px 6px; border-radius: 8px; border: 1px solid var(--color-border, #e2e8f0);">
            <button type="button" class="flow-btn-tool" data-flow-action="zoom-in" title="Phóng to (+)" style="border: none; background: transparent; padding: 4px 8px; border-radius: 4px; cursor: pointer; color: var(--color-text, #334155); font-size: 0.85rem; transition: background 0.15s;">
              <i class="fa-solid fa-magnifying-glass-plus"></i>
            </button>
            <button type="button" class="flow-btn-tool" data-flow-action="zoom-out" title="Thu nhỏ (-)" style="border: none; background: transparent; padding: 4px 8px; border-radius: 4px; cursor: pointer; color: var(--color-text, #334155); font-size: 0.85rem; transition: background 0.15s;">
              <i class="fa-solid fa-magnifying-glass-minus"></i>
            </button>
            <button type="button" class="flow-btn-tool" data-flow-action="reset" title="Đặt lại kích thước (100%)" style="border: none; background: transparent; padding: 4px 8px; border-radius: 4px; cursor: pointer; color: var(--color-text, #334155); font-size: 0.85rem; transition: background 0.15s;">
              <i class="fa-solid fa-rotate-left"></i>
            </button>
            <button type="button" class="flow-btn-tool" data-flow-action="fullscreen" title="Xem toàn màn hình (F11 / Zen)" style="border: none; background: transparent; padding: 4px 8px; border-radius: 4px; cursor: pointer; color: var(--color-text, #334155); font-size: 0.85rem; transition: background 0.15s;">
              <i class="fa-solid fa-expand"></i>
            </button>
            <button type="button" class="flow-btn-tool" data-flow-action="copy-dsl" title="Sao chép mã nguồn DSL" style="border: none; background: transparent; padding: 4px 8px; border-radius: 4px; cursor: pointer; color: var(--color-text, #334155); font-size: 0.85rem; transition: background 0.15s;">
              <i class="fa-solid fa-code"></i>
            </button>
            <button type="button" class="flow-btn-tool" data-flow-action="download-svg" title="Tải xuống tệp ảnh SVG" style="border: none; background: transparent; padding: 4px 8px; border-radius: 4px; cursor: pointer; color: var(--color-text, #334155); font-size: 0.85rem; transition: background 0.15s;">
              <i class="fa-solid fa-download"></i>
            </button>
          </div>
        </div>
      ` : ''}

      <div class="flow-viewport-container" style="position: relative; width: 100%; height: ${height}px; min-height: 480px; max-height: 80vh; background: var(--color-surface, #ffffff); border: 1.5px solid var(--color-border, #e2e8f0); border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.03); user-select: none;">
        <div class="flow-canvas-wrapper" style="width: 100%; height: 100%; cursor: grab; overflow: hidden; display: flex; align-items: center; justify-content: center; position: relative;">
          ${svgHtml}
        </div>

        <div class="flow-floating-hud" style="position: absolute; bottom: 12px; right: 12px; display: flex; align-items: center; gap: 4px; background: rgba(255, 255, 255, 0.92); backdrop-filter: blur(8px); border: 1px solid var(--color-border, #cbd5e1); border-radius: 8px; padding: 3px 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); z-index: 15;">
          <span class="flow-zoom-display" style="font-size: 0.75rem; font-weight: 700; color: var(--color-text-muted, #64748b); font-family: monospace;">100%</span>
        </div>

        <textarea class="flow-raw-dsl" style="display: none;" readonly>${escapeAttr(code)}</textarea>
      </div>
    </div>
  `;
}

/**
 * Kích hoạt các sự kiện tương tác Pan & Zoom, Fullscreen, Copy, Download cho tất cả các Lưu đồ Flowchart
 */
export function hydrateFlowchartViewers(rootEl: HTMLElement = document.body): void {
  const wrappers = rootEl.querySelectorAll<HTMLElement>('.clini-flowchart-wrapper');
  if (wrappers.length === 0) return;

  wrappers.forEach(wrapper => {
    // Tránh gán lặp lại
    if (wrapper.dataset.hydrated === 'true') return;
    wrapper.dataset.hydrated = 'true';

    const canvasWrapper = wrapper.querySelector<HTMLElement>('.flow-canvas-wrapper');
    const svgEl = wrapper.querySelector<SVGSVGElement>('svg.clinical-flow-svg');
    const transformLayer = svgEl?.querySelector<SVGGElement>('.flow-transform-layer') || svgEl?.querySelector<SVGGElement>('g');
    const zoomDisplay = wrapper.querySelector<HTMLElement>('.flow-zoom-display');
    const rawDslEl = wrapper.querySelector<HTMLTextAreaElement>('.flow-raw-dsl');
    const rawDsl = rawDslEl ? rawDslEl.value : '';

    if (!canvasWrapper || !svgEl || !transformLayer) return;

    let scale = 1.0;
    let translateX = 0;
    let translateY = 0;
    let isPanning = false;
    let startMouseX = 0;
    let startMouseY = 0;

    const applyTransform = () => {
      transformLayer.setAttribute('transform', `translate(${translateX}, ${translateY}) scale(${scale})`);
      if (zoomDisplay) {
        zoomDisplay.textContent = `${Math.round(scale * 100)}%`;
      }
    };

    // 1. Mouse Pan
    canvasWrapper.addEventListener('mousedown', (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('.flow-btn-tool, .flow-floating-hud')) return;
      isPanning = true;
      startMouseX = e.clientX - translateX;
      startMouseY = e.clientY - translateY;
      canvasWrapper.style.cursor = 'grabbing';
    });

    window.addEventListener('mousemove', (e: MouseEvent) => {
      if (!isPanning) return;
      translateX = e.clientX - startMouseX;
      translateY = e.clientY - startMouseY;
      applyTransform();
    });

    window.addEventListener('mouseup', () => {
      if (isPanning) {
        isPanning = false;
        canvasWrapper.style.cursor = 'grab';
      }
    });

    // 2. Mouse Wheel Zoom
    canvasWrapper.addEventListener('wheel', (e: WheelEvent) => {
      e.preventDefault();
      const rect = canvasWrapper.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const zoomFactor = e.deltaY < 0 ? 1.15 : 0.85;
      const newScale = Math.min(3.5, Math.max(0.25, scale * zoomFactor));

      translateX = mouseX - (mouseX - translateX) * (newScale / scale);
      translateY = mouseY - (mouseY - translateY) * (newScale / scale);
      scale = newScale;
      applyTransform();
    }, { passive: false });

    // 3. Touch Pan & Pinch Zoom
    let startTouchDist = 0;
    let initialPinchScale = 1.0;
    let touchCenterX = 0;
    let touchCenterY = 0;

    canvasWrapper.addEventListener('touchstart', (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isPanning = true;
        startMouseX = e.touches[0]!.clientX - translateX;
        startMouseY = e.touches[0]!.clientY - translateY;
      } else if (e.touches.length === 2) {
        isPanning = false;
        const t0 = e.touches[0]!;
        const t1 = e.touches[1]!;
        startTouchDist = Math.hypot(t0.clientX - t1.clientX, t0.clientY - t1.clientY);
        initialPinchScale = scale;
        const rect = canvasWrapper.getBoundingClientRect();
        touchCenterX = (t0.clientX + t1.clientX) / 2 - rect.left;
        touchCenterY = (t0.clientY + t1.clientY) / 2 - rect.top;
      }
    }, { passive: true });

    canvasWrapper.addEventListener('touchmove', (e: TouchEvent) => {
      if (e.touches.length === 1 && isPanning) {
        e.preventDefault();
        translateX = e.touches[0]!.clientX - startMouseX;
        translateY = e.touches[0]!.clientY - startMouseY;
        applyTransform();
      } else if (e.touches.length === 2 && startTouchDist > 0) {
        e.preventDefault();
        const t0 = e.touches[0]!;
        const t1 = e.touches[1]!;
        const dist = Math.hypot(t0.clientX - t1.clientX, t0.clientY - t1.clientY);
        if (dist > 10) {
          const factor = dist / startTouchDist;
          const newScale = Math.min(3.5, Math.max(0.25, initialPinchScale * factor));
          translateX = touchCenterX - (touchCenterX - translateX) * (newScale / scale);
          translateY = touchCenterY - (touchCenterY - translateY) * (newScale / scale);
          scale = newScale;
          applyTransform();
        }
      }
    }, { passive: false });

    canvasWrapper.addEventListener('touchend', () => {
      isPanning = false;
      startTouchDist = 0;
    });

    // 4. Toolbar Buttons
    wrapper.querySelectorAll<HTMLButtonElement>('[data-flow-action]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const action = btn.dataset.flowAction;

        switch (action) {
          case 'zoom-in':
            scale = Math.min(3.5, scale * 1.25);
            applyTransform();
            break;
          case 'zoom-out':
            scale = Math.max(0.25, scale * 0.8);
            applyTransform();
            break;
          case 'reset':
            scale = 1.0;
            translateX = 0;
            translateY = 0;
            applyTransform();
            break;
          case 'fullscreen': {
            const viewportContainer = wrapper.querySelector<HTMLElement>('.flow-viewport-container');
            if (viewportContainer) {
              if (!document.fullscreenElement) {
                viewportContainer.requestFullscreen?.();
              } else {
                document.exitFullscreen?.();
              }
            }
            break;
          }
          case 'copy-dsl':
            if (rawDsl && navigator.clipboard) {
              navigator.clipboard.writeText(rawDsl).then(() => {
                const icon = btn.querySelector('i');
                if (icon) {
                  const origClass = icon.className;
                  icon.className = 'fa-solid fa-check';
                  icon.style.color = 'var(--color-success, #10b981)';
                  setTimeout(() => {
                    icon.className = origClass;
                    icon.style.color = '';
                  }, 2000);
                }
              });
            }
            break;
          case 'download-svg':
            if (svgEl) {
              const svgData = new XMLSerializer().serializeToString(svgEl);
              const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              const titleEl = wrapper.querySelector('.flowchart-title');
              const fileTitle = (titleEl?.textContent || 'clinical-flowchart')
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-|-$/g, '');
              a.download = `${fileTitle}.svg`;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              URL.revokeObjectURL(url);
            }
            break;
        }
      });
    });
  });
}
