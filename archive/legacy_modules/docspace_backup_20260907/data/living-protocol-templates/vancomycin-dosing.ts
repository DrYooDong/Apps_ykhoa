import { LivingProtocol } from '../../types';

export const VANCOMYCIN_PROTOCOL: LivingProtocol = {
  id: "vancomycin_dosing",
  title: "Chỉnh Liều Vancomycin theo eGFR",
  inputs: ["weight", "egfr"],
  steps: [
    {
      id: "step_1",
      type: "lookup",
      label: "Liều nạp (Loading dose)",
      formula_static: "weight_x_25",
      unit: "mg",
      note: "Liều nạp 25-30mg/kg cân nặng thực, tối đa 3000mg. (Ví dụ này dùng 25mg/kg)"
    },
    {
      id: "step_2",
      type: "branch",
      label: "Phân tầng chức năng thận",
      branch_var: "egfr",
      branches: [
        { condition: "gte_50", label: "eGFR ≥ 50", go_to: "step_dose_normal" },
        { condition: "gte_30", label: "eGFR 30–49", go_to: "step_dose_mild" },
        { condition: "gte_10", label: "eGFR 10–29", go_to: "step_dose_moderate" },
        { condition: "lt_10",  label: "eGFR < 10",  go_to: "step_dose_severe" }
      ]
    },
    {
      id: "step_dose_normal",
      type: "result",
      label: "Liều duy trì (eGFR ≥ 50): 15–20 mg/kg mỗi 8–12h",
      lookup_table: {
        "weight_40_59": "600–750 mg mỗi 8h",
        "weight_60_79": "900–1000 mg mỗi 8h",
        "weight_80_99": "1200–1500 mg mỗi 12h",
        "gte_100": "1500–2000 mg mỗi 12h"
      }
    },
    {
      id: "step_dose_mild",
      type: "result",
      label: "Liều duy trì (eGFR 30-49): 15–20 mg/kg mỗi 24h",
      lookup_table: {
        "weight_40_59": "500-750 mg mỗi 24h",
        "weight_60_79": "1000-1250 mg mỗi 24h",
        "weight_80_99": "1250-1500 mg mỗi 24h",
        "gte_100": "1500-2000 mg mỗi 24h"
      }
    },
    {
      id: "step_dose_moderate",
      type: "result",
      label: "Liều duy trì (eGFR 10-29): 15–20 mg/kg mỗi 24h - 48h",
      lookup_table: {
        "weight_40_59": "500-750 mg mỗi 48h",
        "weight_60_79": "1000-1250 mg mỗi 48h",
        "weight_80_99": "1250-1500 mg mỗi 48h",
        "gte_100": "1500-2000 mg mỗi 48h"
      }
    },
    {
      id: "step_dose_severe",
      type: "result",
      label: "Liều duy trì (eGFR < 10 hoặc lọc máu định kỳ)",
      lookup_table: {
        "gte_0": "Liều nạp tĩnh, đo nồng độ đáy trước khi dùng liều tiếp theo. Không tính liều duy trì cố định."
      }
    }
  ]
};
