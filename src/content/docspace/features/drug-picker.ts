/**
 * Drug Picker - DocSpace
 * Kết nối nhanh với Drug Intelligence Panel và Kho Dược Thư Lâm Sàng
 */

import { drugIntelligencePanel } from './drug-intelligence-panel';
import { DRUG_FORMULARY_DATABASE, DrugFormularyItem } from '../data/drug-interactions';

export class DrugPicker {
  public async open(targetInputId?: string, onSelectCallback?: (drug: any) => void) {
    drugIntelligencePanel.open(targetInputId, null, (drug: DrugFormularyItem) => {
      if (onSelectCallback) {
        onSelectCallback({
          id: drug.id,
          name: drug.name,
          brandNames: drug.brandNames,
          dosage: { standardAdult: drug.standardDose, renal: drug.renalAdjustment },
          notes: drug.clinicalPearls
        });
      }
    });
  }

  public close() {
    drugIntelligencePanel.close();
  }
}

export const drugPicker = new DrugPicker();
