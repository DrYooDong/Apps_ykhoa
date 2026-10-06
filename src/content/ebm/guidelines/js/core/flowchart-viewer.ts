/**
 * Flowchart & Diagram Viewer Hydration Engine (Standalone)
 * Path: js/core/flowchart-viewer.ts
 */
export function hydrateFlowchartViewers(mountEl?: HTMLElement | null): void {
  const container = mountEl || document;
  const viewers = container.querySelectorAll<HTMLElement>(
    '.flowchart-viewer, [data-flowchart], .flowchart-editorial-card, .flowchart-card, .flowchart-svg-scroll, .flowchart-svg-wrapper, .flowchart-editorial-canvas'
  );

  viewers.forEach(el => {
    el.classList.add('hydrated');

    // Ensure all inner SVGs have proper attributes
    const svgs = el.querySelectorAll<SVGSVGElement>('svg');
    svgs.forEach(svg => {
      if (!svg.getAttribute('xmlns')) {
        svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
      }
      if (!svg.getAttribute('role')) {
        svg.setAttribute('role', 'img');
      }
      if (!svg.getAttribute('preserveAspectRatio')) {
        svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
      }
    });

    // Check if element is a scroll wrapper and enable gentle drag-to-scroll on desktop
    const scrollContainer = el.classList.contains('flowchart-svg-scroll') || 
                            el.classList.contains('flowchart-svg-wrapper') || 
                            el.classList.contains('flowchart-editorial-canvas') ? el : el.querySelector<HTMLElement>('.flowchart-svg-scroll, .flowchart-svg-wrapper, .flowchart-editorial-canvas');

    if (scrollContainer && !scrollContainer.dataset.dragInitialized) {
      scrollContainer.dataset.dragInitialized = 'true';
      let isDown = false;
      let startX = 0;
      let scrollLeft = 0;

      scrollContainer.addEventListener('mousedown', (e: MouseEvent) => {
        // Only drag if left click and content overflows
        if (e.button !== 0 || scrollContainer.scrollWidth <= scrollContainer.clientWidth) return;
        isDown = true;
        scrollContainer.style.cursor = 'grabbing';
        scrollContainer.style.userSelect = 'none';
        startX = e.pageX - scrollContainer.offsetLeft;
        scrollLeft = scrollContainer.scrollLeft;
      });

      const stopDrag = () => {
        if (!isDown) return;
        isDown = false;
        scrollContainer.style.cursor = 'grab';
        scrollContainer.style.removeProperty('user-select');
      };

      scrollContainer.addEventListener('mouseleave', stopDrag);
      scrollContainer.addEventListener('mouseup', stopDrag);

      scrollContainer.addEventListener('mousemove', (e: MouseEvent) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - scrollContainer.offsetLeft;
        const walk = (x - startX) * 1.5;
        scrollContainer.scrollLeft = scrollLeft - walk;
      });

      // Default cursor hint if scrollable
      if (scrollContainer.scrollWidth > scrollContainer.clientWidth) {
        scrollContainer.style.cursor = 'grab';
      }
    }
  });
}
