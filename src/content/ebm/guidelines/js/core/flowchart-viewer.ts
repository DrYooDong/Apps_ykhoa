/**
 * Flowchart Viewer Hydration Helper (Standalone)
 * Path: js/core/flowchart-viewer.ts
 */
export function hydrateFlowchartViewers(mountEl?: HTMLElement | null): void {
  const container = mountEl || document;
  const viewers = container.querySelectorAll('.flowchart-viewer, [data-flowchart]');
  viewers.forEach(el => {
    // If inline SVG or diagram exists, ensure styling is active
    el.classList.add('hydrated');
  });
}
