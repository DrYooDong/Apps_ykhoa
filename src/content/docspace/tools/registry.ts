/**
 * DocSpace Tools Registry
 * Quản lý và cung cấp danh mục công cụ, thang điểm lâm sàng native TypeScript
 */

import { BaseCalculator } from './types';
import { qsofaCalculator } from './scores/qsofa';
import { curb65Calculator } from './scores/curb65';
import { sirsCalculator } from './scores/sirs';
import { gcsCalculator } from './scores/gcs';
import { cha2ds2VascCalculator } from './scores/cha2ds2-vasc';
import { hasBledCalculator } from './scores/has-bled';
import { ckdEpiCalculator } from './scores/ckd-epi';
import { abgCalculator } from './scores/abg';
import { wellsPeCalculator } from './scores/wells-pe';
import { childPughCalculator } from './scores/child-pugh';
import { nihssCalculator } from './scores/nihss';
import { electrolytesCalculator } from './scores/electrolytes';
import { antibioticDosingCalculator } from './scores/antibiotic-dosing';
import { doseEquivalenceCalculator } from './scores/dose-equivalence';
import { insulinSlidingScaleCalculator } from './scores/insulin-sliding-scale';
import { creatinineClearanceCalculator } from './scores/creatinine-clearance';
import { glasgowBlatchfordCalculator } from './scores/glasgow-blatchford';
import { wellsDvtCalculator } from './scores/wells-dvt';
import { meldNaCalculator } from './scores/meld-na';
import { centorMcisaacCalculator } from './scores/centor-mcisaac';

class ToolRegistry {
  private calculators = new Map<string, BaseCalculator>();

  constructor() {
    this.registerAll([
      qsofaCalculator,
      curb65Calculator,
      sirsCalculator,
      gcsCalculator,
      cha2ds2VascCalculator,
      hasBledCalculator,
      ckdEpiCalculator,
      creatinineClearanceCalculator,
      abgCalculator,
      electrolytesCalculator,
      wellsPeCalculator,
      wellsDvtCalculator,
      childPughCalculator,
      meldNaCalculator,
      glasgowBlatchfordCalculator,
      centorMcisaacCalculator,
      nihssCalculator,
      antibioticDosingCalculator,
      doseEquivalenceCalculator,
      insulinSlidingScaleCalculator
    ]);
  }

  public register(calc: BaseCalculator): void {
    this.calculators.set(calc.id, calc);
  }

  public registerAll(calcs: BaseCalculator[]): void {
    calcs.forEach(c => this.register(c));
  }

  public get(id: string): BaseCalculator | undefined {
    return this.calculators.get(id);
  }

  public getAll(): BaseCalculator[] {
    return Array.from(this.calculators.values());
  }

  public getBySpecialty(specialty: string): BaseCalculator[] {
    return this.getAll().filter(c => c.specialty === specialty);
  }

  public search(query: string): BaseCalculator[] {
    if (!query || !query.trim()) return this.getAll();
    const q = query.toLowerCase().trim();
    return this.getAll().filter(c => 
      c.id.toLowerCase().includes(q) ||
      c.name.toLowerCase().includes(q) ||
      c.shortName.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.specialtyLabel.toLowerCase().includes(q)
    );
  }

  public getSpecialties(): { id: string; label: string; count: number; icon: string }[] {
    const map = new Map<string, { label: string; count: number; icon: string }>();
    
    const iconMap: Record<string, string> = {
      emergency: 'fa-truck-medical',
      cardiology: 'fa-heart-pulse',
      respiratory: 'fa-lungs',
      neurology: 'fa-brain',
      nephrology: 'fa-kidneys',
      gastroenterology: 'fa-stomach',
      hematology: 'fa-droplet',
      general: 'fa-notes-medical'
    };

    for (const c of this.getAll()) {
      if (!map.has(c.specialty)) {
        map.set(c.specialty, {
          label: c.specialtyLabel,
          count: 0,
          icon: iconMap[c.specialty] || 'fa-calculator'
        });
      }
      map.get(c.specialty)!.count++;
    }

    return Array.from(map.entries()).map(([id, info]) => ({
      id,
      label: info.label,
      count: info.count,
      icon: info.icon
    }));
  }
}

export const toolRegistry = new ToolRegistry();
