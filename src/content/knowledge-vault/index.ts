/**
 * CliniPortal — Knowledge Vault Module Entry Point
 */

import { renderVaultHubView, attachVaultEvents, openArticleDrawer } from './vault-hub-view';

export * from './types';
export * from './vault-loader';
export * from './vault-hub-view';
export * from './protocols';
export * from './vault-crce-view';


export function initKnowledgeVault(containerId: string = 'vault-app'): void {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Check URL parameters for direct two-way link from Obsidian, DocSpace or external links
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const targetGroup = urlParams.get('group');
    const targetDisease = urlParams.get('disease');
    const targetKho = urlParams.get('kho');
    const targetSearch = urlParams.get('search') || urlParams.get('q');
    const targetProtocol = urlParams.get('protocol') || urlParams.get('protocolId');

    if (targetGroup || targetDisease || targetKho || targetSearch || targetProtocol) {
      import('./vault-hub-view').then(({ setVaultInitialState }) => {
        setVaultInitialState({
          group: targetGroup || (targetDisease ? 'CRCE' : undefined),
          disease: targetDisease || undefined,
          kho: targetKho || undefined,
          search: targetSearch || undefined,
          protocolId: targetProtocol || undefined
        });
        container.innerHTML = renderVaultHubView();
        attachVaultEvents(container);
      });
    } else {
      container.innerHTML = renderVaultHubView();
      attachVaultEvents(container);
    }

    const targetArticle = urlParams.get('article') || urlParams.get('id') || window.location.hash.replace(/^#\/?/, '').trim();
    if (targetArticle) {
      setTimeout(() => {
        openArticleDrawer(targetArticle);
      }, 250);
    }
  } catch (e) {
    container.innerHTML = renderVaultHubView();
    attachVaultEvents(container);
  }
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initKnowledgeVault());
  } else {
    initKnowledgeVault();
  }
}
