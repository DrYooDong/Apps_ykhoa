/**
 * CliniPortal — Knowledge Vault Module Entry Point
 */

import { renderVaultHubView, attachVaultEvents } from './vault-hub-view';

export * from './types';
export * from './vault-loader';
export * from './vault-hub-view';

export function initKnowledgeVault(containerId: string = 'vault-app'): void {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = renderVaultHubView();
  attachVaultEvents(container);
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initKnowledgeVault());
  } else {
    initKnowledgeVault();
  }
}
