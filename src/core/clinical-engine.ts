/**
 * CliniPortal 2.0 — Clinical Calculator Core (TypeScript Wrapper)
 */

export interface FieldDefinition {
  id: string;
  name: string;
  min?: number;
  max?: number;
  required?: boolean;
  unit?: string;
}

export interface CalculatorConfig {
  toolId: string;
  toolName: string;
  category?: string;
  fields?: FieldDefinition[];
  calculateFn: (inputs: Record<string, any>) => Promise<{ outputs: Record<string, any>; interpretation?: string; recommendations?: string[] }> | { outputs: Record<string, any>; interpretation?: string; recommendations?: string[] };
}

export class ClinicalCoreEngine {
  private get engine() {
    if (typeof window !== 'undefined' && (window as any).ClinicalCalculatorEngine) {
      return (window as any).ClinicalCalculatorEngine;
    }
    return null;
  }

  async execute(config: CalculatorConfig, rawInputs: Record<string, any>, options: { patientRef?: string; note?: string; autoSave?: boolean } = {}) {
    const engine = this.engine;
    if (engine) {
      return await engine.execute(config, rawInputs, options);
    }
    return { success: false, errors: ['ClinicalCalculatorEngine not initialized'] };
  }
}

export const clinicalCoreEngine = new ClinicalCoreEngine();
