/**
 * Living Protocol — Rule Engine
 * Chạy Offline bằng Vanilla JS (Evaluator)
 */

export interface RuleEvaluationResult {
  value: any;
  error?: string;
}

/**
 * Đánh giá một công thức toán học tĩnh (VD: "weight * 15")
 * Dùng new Function để đảm bảo an toàn hơn eval() nguyên bản, 
 * và chỉ truyền các biến số có sẵn trong context.
 */
export function evaluateFormula(formula: string, context: Record<string, number>): RuleEvaluationResult {
  try {
    // Tạo danh sách biến từ context
    const keys = Object.keys(context);
    const values = Object.values(context);
    
    // Viết hàm động có tham số là các keys, và trả về formula
    const func = new Function(...keys, `return ${formula};`);
    
    // Gọi hàm với các values
    const result = func(...values);
    
    if (typeof result !== 'number' || isNaN(result)) {
       return { value: null, error: 'Kết quả tính toán không hợp lệ' };
    }
    
    return { value: result };
  } catch (err: any) {
    return { value: null, error: err.message };
  }
}

/**
 * Đánh giá một điều kiện rẽ nhánh (VD: "egfr < 30")
 * Trả về true hoặc false
 */
export function evaluateCondition(condition: string, context: Record<string, number>): RuleEvaluationResult {
  try {
    const keys = Object.keys(context);
    const values = Object.values(context);
    
    const func = new Function(...keys, `return Boolean(${condition});`);
    const result = func(...values);
    
    return { value: result };
  } catch (err: any) {
    return { value: null, error: err.message };
  }
}
