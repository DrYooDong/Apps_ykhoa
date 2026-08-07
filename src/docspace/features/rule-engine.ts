/**
 * Living Protocol — Static Rule Engine (v2)
 * Pure Data-Driven. Zero eval() or new Function().
 */

export interface RuleEvaluationResult {
  value: any;
  error?: string;
}

/**
 * Đánh giá điều kiện rẽ nhánh tĩnh (VD: "gte_50")
 */
export function evaluateBranch(condition: string, value: number): boolean {
  if (!condition) return false;
  
  const parts = condition.split('_');
  const op = parts[0];
  const threshold = parseFloat(parts[1] || 'NaN');

  if (isNaN(threshold)) return false;

  switch (op) {
    case 'gte': return value >= threshold;
    case 'gt':  return value > threshold;
    case 'lte': return value <= threshold;
    case 'lt':  return value < threshold;
    case 'eq':  return value === threshold;
    default:    return false;
  }
}

/**
 * Tra cứu giá trị trong bảng theo một biến số
 * VD: table = { "weight_40_59": "600-750 mg", "weight_60_79": "900-1000 mg" }
 * Trả về string hoặc undefined
 */
export function lookupValue(table: Record<string, string>, value: number): string | undefined {
  for (const [key, resultStr] of Object.entries(table)) {
    // Tách "weight_40_59" -> ["weight", "40", "59"]
    const parts = key.split('_');
    if (parts.length >= 3) {
      const min = parseFloat(parts[parts.length - 2] || 'NaN');
      const max = parseFloat(parts[parts.length - 1] || 'NaN');
      if (!isNaN(min) && !isNaN(max)) {
        if (value >= min && value <= max) {
          return resultStr;
        }
      }
    } else if (parts.length === 2 && parts[0] === 'gte') {
      const min = parseFloat(parts[1] || 'NaN');
      if (value >= min) return resultStr;
    } else if (parts.length === 2 && parts[0] === 'lt') {
      const max = parseFloat(parts[1] || 'NaN');
      if (value < max) return resultStr;
    }
  }
  return undefined;
}

/**
 * Đánh giá một công thức tĩnh (hardcoded formula types)
 * VD: "weight_x_25" -> weight * 25
 */
export function evaluateStaticFormula(formula: string, context: Record<string, number>): RuleEvaluationResult {
  if (!formula) return { value: null, error: 'Không có công thức' };
  
  const parts = formula.split('_');
  if (parts.length !== 3) return { value: null, error: 'Định dạng công thức tĩnh không hợp lệ' };

  const [varName, op, valStr] = parts;
  if (!varName || !valStr) return { value: null, error: 'Biến công thức không hợp lệ' };
  const ctxVal = context[varName];
  const operand = parseFloat(valStr);

  if (ctxVal === undefined || isNaN(ctxVal)) return { value: null, error: `Biến ${varName} không tồn tại hoặc không hợp lệ` };
  if (isNaN(operand)) return { value: null, error: `Toán hạng ${valStr} không hợp lệ` };

  let result = 0;
  switch (op) {
    case 'x': 
    case 'mul': result = ctxVal * operand; break;
    case 'div': result = ctxVal / operand; break;
    case 'add': result = ctxVal + operand; break;
    case 'sub': result = ctxVal - operand; break;
    default: return { value: null, error: `Phép toán ${op} không được hỗ trợ` };
  }

  return { value: result };
}
