/**
 * DocSpace Tools & Calculators — Type Definitions
 * Hệ thống thang điểm & công cụ tính toán lâm sàng tích hợp
 */

import { SoapPatientRecord } from '../types';

export type FieldType = 'number' | 'boolean' | 'select' | 'radio';

export interface CalculatorFieldOption {
  value: string | number | boolean;
  label: string;
  points?: number;
  description?: string;
}

export interface CalculatorField {
  id: string;
  label: string;
  type: FieldType;
  unit?: string;
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
  defaultValue?: any;
  options?: CalculatorFieldOption[];
  helpText?: string;
  /** Key mapping hoặc mô tả binding tự động từ SOAP / Parsed Vitals */
  soapBinding?: string;
}

export type ResultSeverity = 'low' | 'moderate' | 'high' | 'critical' | 'info';

export interface CalculatorResult {
  score?: number;
  maxScore?: number;
  label: string;             // VD: "NGUY CƠ CAO", "GCS = 13 điểm"
  severity: ResultSeverity;
  recommendation: string;    // Khuyến cáo xử trí lâm sàng
  details: string[];         // Các tiêu chuẩn đạt điểm
  textForInsert: string;     // Văn bản chuẩn chèn vào SOAP / Bệnh án
  meta?: Record<string, any>;
}

export interface BaseCalculator {
  id: string;
  name: string;
  shortName: string;
  specialty: 'emergency' | 'cardiology' | 'respiratory' | 'nephrology' | 'neurology' | 'gastroenterology' | 'hematology' | 'general';
  specialtyLabel: string;    // "Cấp cứu - Hồi sức", "Tim mạch", v.v.
  description: string;
  icon: string;              // FontAwesome icon class, e.g., 'fa-heart-pulse'
  evidenceReference?: string;// Nguồn EBM / Guideline
  fields: CalculatorField[];

  /** Tự động trích xuất giá trị khởi tạo từ thông tin bệnh nhân SOAP */
  autofillFromPatient?: (patient: SoapPatientRecord) => Partial<Record<string, any>>;

  /** Logic tính toán thuần túy */
  calculate: (inputs: Record<string, any>) => CalculatorResult;
}

export interface CalculatorSession {
  id: string;
  calculatorId: string;
  calculatorName: string;
  patientId?: string;
  inputs: Record<string, any>;
  result: {
    score?: number;
    maxScore?: number;
    label: string;
    severity: ResultSeverity;
    textForInsert: string;
  };
  calculatedAt: string;
}
