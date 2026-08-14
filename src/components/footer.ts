/**
 * Footer Dynamic Loader & Component (footer.ts)
 * Path: src/components/footer.ts
 * CliniPortal Framework
 */

export async function loadFooter(): Promise<void> {
  try {
    if (typeof window !== 'undefined' && (window.self !== window.top || window.location.search.includes('embedded=1'))) {
      document.documentElement.classList.add('in-iframe');
      document.documentElement.setAttribute('data-embedded', 'true');
      return;
    }
  } catch (e) {
    document.documentElement.classList.add('in-iframe');
    return;
  }

  const holder = document.getElementById('footer-placeholder');
  if (!holder) return;

  const footerPath = holder.dataset.footerPath;
  if (!footerPath) return;

  try {
    const res = await fetch(footerPath);
    if (!res.ok) throw new Error(`Cannot load footer: ${res.status}`);
    const html = await res.text();
    holder.innerHTML = html;
    fixFooterLinks(holder, footerPath);
    initFooter();
  } catch (err) {
    console.error('[footer.ts]', err);
  }
}

export function fixFooterLinks(holder: HTMLElement, footerPath: string): void {
  let projectRoot = '';
  if (footerPath) {
    const idx = footerPath.lastIndexOf('components/');
    if (idx !== -1) {
      projectRoot = footerPath.substring(0, idx);
    } else {
      const depth = (footerPath.match(/\.\.\//g) || []).length;
      projectRoot = '../'.repeat(depth);
    }
  }

  const links = holder.querySelectorAll<HTMLAnchorElement>('a');
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href && !href.startsWith('http') && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('javascript:')) {
      const cleanHref = href.replace(/^(\.\.\/|\.\/|\/)+/, '');
      link.setAttribute('href', projectRoot + cleanHref);
    }
  });
}

export function initFooter(): void {
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear().toString();
  }

  const footerLinks = document.querySelectorAll<HTMLAnchorElement>('.footer-nav-list a, .legal-link');
  footerLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        target?.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadFooter);
  } else {
    loadFooter();
  }
}
