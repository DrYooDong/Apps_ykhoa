/**
 * DocSpace SPA Route Initializer for CliniPortal Master Router
 */
import { router } from '../../core/router';

export function initDocSpaceRoutes(): void {
  if (!router) return;

  // Route: /docspace -> Navigate to DocSpace web application
  router.register('/docspace', () => {
    window.location.href = './src/content/docspace/index.html';
  });

  router.register('/docspace/soap', () => {
    const hash = window.location.hash;
    const query = hash.includes('?') ? hash.slice(hash.indexOf('?')) : '';
    window.location.href = `./src/content/docspace/index.html${query}`;
  });
}
