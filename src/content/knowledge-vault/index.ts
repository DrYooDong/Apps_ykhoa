/**
 * CliniPortal — Knowledge Vault Module Entry Point
 */

import { renderVaultHubView, attachVaultEvents, openArticleDrawer } from './vault-hub-view';

export * from './types';
export * from './vault-loader';
export * from './vault-hub-view';

export function initKnowledgeVault(containerId: string = 'vault-app'): void {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = renderVaultHubView();
  attachVaultEvents(container);

  // Check URL parameters for direct two-way link from Obsidian or external links
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const targetArticle = urlParams.get('article') || urlParams.get('id') || window.location.hash.replace(/^#\/?/, '').trim();
    if (targetArticle) {
      setTimeout(() => {
        openArticleDrawer(targetArticle);
      }, 250);
    }
  } catch (e) {}
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initKnowledgeVault());
  } else {
    initKnowledgeVault();
  }
}
