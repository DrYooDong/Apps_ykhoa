/**
 * CliniPortal — ICD-10 Code Lookup & BHYT Audit Studio (TypeScript Module)
 * Virtual List Rendering Engine for high-performance search over 15,800+ ICD-10 codes
 */

import { VirtualList } from '../../../../js/utils/virtual-list.js';

export function initVirtualICDList(
  containerEl: HTMLElement,
  items: any[],
  renderFn: (item: any, index: number) => HTMLElement | string
): VirtualList {
  return new VirtualList({
    containerEl: containerEl,
    items: items,
    itemHeight: 64,
    renderItemFn: renderFn
  });
}

// Global binding
if (typeof window !== 'undefined') {
  (window as any).initVirtualICDList = initVirtualICDList;
}
