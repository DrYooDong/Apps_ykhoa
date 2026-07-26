/**
 * CliniPortal 2.0 — Storage Core Module (TypeScript Wrapper)
 * Wraps and exposes CliniStorage IndexedDB Engine
 */

export interface CalculationRecord {
  id?: number;
  toolId: string;
  toolName: string;
  category?: string;
  inputs: Record<string, any>;
  outputs: Record<string, any>;
  interpretation?: string;
  recommendations?: string[];
  patientRef?: string;
  note?: string;
  timestamp?: string;
}

export interface BookmarkRecord {
  id: string;
  title: string;
  url?: string;
  category?: string;
  module?: string;
  timestamp?: string;
}

export class StorageCore {
  private get engine() {
    if (typeof window !== 'undefined' && (window as any).CliniStorage) {
      return (window as any).CliniStorage;
    }
    return null;
  }

  async saveCalculation(data: CalculationRecord): Promise<number> {
    const engine = this.engine;
    if (engine) {
      return await engine.saveCalculation(data);
    }
    return Date.now();
  }

  async getCalculationHistory(options: { toolId?: string; limit?: number } = {}): Promise<CalculationRecord[]> {
    const engine = this.engine;
    if (engine) {
      return await engine.getCalculationHistory(options);
    }
    return [];
  }

  async toggleBookmark(item: BookmarkRecord): Promise<boolean> {
    const engine = this.engine;
    if (engine) {
      return await engine.toggleBookmark(item);
    }
    return false;
  }

  async isBookmarked(id: string): Promise<boolean> {
    const engine = this.engine;
    if (engine) {
      return await engine.isBookmarked(id);
    }
    return false;
  }

  async saveNote(pageUrl: string, content: string, title: string = ''): Promise<number> {
    const engine = this.engine;
    if (engine) {
      return await engine.saveNote(pageUrl, content, title);
    }
    return Date.now();
  }

  async getNotes(pageUrl?: string): Promise<any[]> {
    const engine = this.engine;
    if (engine) {
      return await engine.getNotes(pageUrl);
    }
    return [];
  }
}

export const storageCore = new StorageCore();
