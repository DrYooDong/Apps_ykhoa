/**
 * DocSpace SPA Route Initializer for CliniPortal Master Router
 */
import { router } from '../../core/router';
import { sendClinicalIntent } from '../../core/clinical-intent';

export function initDocSpaceRoutes(): void {
  if (!router) return;

  const forwardToDocSpace = (extraQuery: string = '') => {
    const hash = window.location.hash || '';
    const hashQuery = hash.includes('?') ? hash.slice(hash.indexOf('?')) : '';
    let finalQuery = '';
    if (hashQuery && extraQuery) {
      finalQuery = `${hashQuery}&${extraQuery.replace(/^\?/, '')}`;
    } else {
      finalQuery = hashQuery || extraQuery;
    }
    window.location.href = `./src/content/docspace/index.html${finalQuery}`;
  };

  // Route: /docspace -> Navigate to DocSpace web application
  router.register('/docspace', 'DocSpace Clinical Case Analysis', () => {
    forwardToDocSpace();
  });

  router.register('/docspace/soap', 'DocSpace SOAP Clinical Experience', () => {
    forwardToDocSpace();
  });

  router.register('/docspace/studios', 'DocSpace Clinical Studios Hub', () => {
    sendClinicalIntent({
      action: 'open-cdss-studio',
      payload: { studio: 'hub' },
      source: 'portal',
    });
    forwardToDocSpace('?studio=hub');
  });

  router.register('/docspace/studios/:studio', 'DocSpace Clinical Studios', (params) => {
    const studio = params.studio || 'hub';
    sendClinicalIntent({
      action: 'open-cdss-studio',
      payload: { studio },
      source: 'portal',
    });
    forwardToDocSpace(`?studio=${encodeURIComponent(studio)}`);
  });
}
