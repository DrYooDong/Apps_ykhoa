/**
 * Table of Contents (TOC) Dynamic Generation (toc.ts)
 * Path: src/core/toc.ts
 */

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/đ/g, 'd')
    .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a')
    .replace(/[èéẹẻẽêềếệểễ]/g, 'e')
    .replace(/[ìíịỉĩ]/g, 'i')
    .replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o')
    .replace(/[ùúụủũưừứựửữ]/g, 'u')
    .replace(/[ỳýỵỷỹ]/g, 'y')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

export function initTOC(): void {
  const container = document.querySelector(".visual-container, .bento-homepage, main");
  if (!container) return;

  const headings = Array.from(container.querySelectorAll<HTMLElement>("h2, h3")).filter(h => h.textContent?.trim());
  if (headings.length < 2) return;

  headings.forEach(h => {
    if (!h.id) {
      h.id = generateSlug(h.textContent || 'heading');
    }
  });
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener("DOMContentLoaded", initTOC);
  } else {
    initTOC();
  }
}
