/**
 * Header Dynamic Loader & Component (header.ts)
 * Path: src/components/header.ts
 * CliniPortal Framework
 */

export function goBack(): void {
  if (window.history.length > 1 && document.referrer && !document.referrer.includes(window.location.pathname)) {
    window.history.back();
  } else {
    const holder = document.getElementById('header-placeholder');
    const headerPath = holder ? holder.dataset.headerPath : '';
    if (headerPath) {
      const depth = (headerPath.match(/\.\.\//g) || []).length;
      window.location.href = '../'.repeat(depth) + 'index.html';
    } else {
      window.location.href = 'index.html';
    }
  }
}

export function getProjectRootPrefix(headerPath?: string): string {
  if (!headerPath) return '';
  const idx = headerPath.lastIndexOf('components/');
  if (idx !== -1) {
    return headerPath.substring(0, idx);
  }
  const depth = (headerPath.match(/\.\.\//g) || []).length;
  return '../'.repeat(depth);
}

export function fixHeaderLinks(holder: HTMLElement, projectRoot: string): void {
  if (!holder) return;
  const links = holder.querySelectorAll<HTMLAnchorElement>('a');
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('http') || href.startsWith('javascript:')) return;

    if (href.startsWith('#')) {
      const root = projectRoot || './';
      link.setAttribute('href', root + 'index.html' + href);
    } else {
      const cleanHref = href.replace(/^(\.\.\/|\.\/|\/)+/, '');
      link.setAttribute('href', projectRoot + cleanHref);
    }
  });
}

export async function loadHeader(): Promise<void> {
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

  const holder = document.getElementById('header-placeholder');
  if (!holder) return;

  const headerPath = holder.dataset.headerPath;
  if (!headerPath) return;

  try {
    const res = await fetch(headerPath);
    if (!res.ok) throw new Error(`Cannot load header: ${res.status}`);
    const html = await res.text();
    holder.innerHTML = html;
    const projectRoot = getProjectRootPrefix(headerPath);
    fixHeaderLinks(holder, projectRoot);
  } catch (err) {
    console.error('[header.ts]', err);
  }
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadHeader);
  } else {
    loadHeader();
  }
}

if (typeof window !== 'undefined') {
  (window as any).goBack = goBack;
}
