import jsPDF from 'jspdf';
import { PatientData, InsulinCalculationResult, ClinicalAlert, GlucoseUnit } from '../types/cdss';
import { formatGlucose } from './calculations';

// Utility to remove Vietnamese diacritics for safe jsPDF standard ASCII rendering
const removeVietnameseTones = (str: string): string => {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
};

export const generateClinicalPdf = (
  patient: PatientData,
  insulinPlan: InsulinCalculationResult,
  alerts: ClinicalAlert[],
  unit: GlucoseUnit
) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 16;

  // Header Banner
  doc.setFillColor(15, 118, 110); // Teal 700
  doc.rect(14, 10, pageWidth - 28, 22, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text('HOSPITAL INPATIENT DIABETES CDSS CLINICAL REPORT', 18, 19);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('Quan ly dieu tri dai thao duong noi vien & Phac do Insulin (ADA 2026 / JBDS-IP)', 18, 26);

  y = 38;

  // Clinical Summary Box (De-identified privacy mode)
  doc.setDrawColor(203, 213, 225); // Slate 300
  doc.setFillColor(248, 250, 252); // Slate 50
  doc.roundedRect(14, y, pageWidth - 28, 28, 2, 2, 'FD');

  doc.setTextColor(15, 23, 42);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  const safeLabel = removeVietnameseTones(patient.patientName || 'Benh nhan noi vien');
  doc.text(`Chi dinh: ${safeLabel}`, 18, y + 7);
  doc.setFont('helvetica', 'normal');
  doc.text(`Tuoi: ${patient.age}  |  Gioi tinh: ${patient.gender === 'male' ? 'Nam' : 'Nu'}  |  Can nang: ${patient.weightKg} kg  |  Chieu cao: ${patient.heightCm} cm`, 18, y + 13);
  doc.text(`Phan loai DTD: ${patient.diabetesType}  |  Khu vuc: ${patient.wardType}  |  Dinh duong: ${patient.dietType}`, 18, y + 19);
  doc.text(`Duong huyet: ${formatGlucose(patient.currentGlucose, patient.unit, unit)}  |  HbA1c: ${patient.hba1c ? patient.hba1c + '%' : 'N/A'}  |  eGFR: ${patient.egfr || 'N/A'} mL/min`, 18, y + 25);

  y += 34;

  // Target Glycemic Goal
  doc.setFillColor(240, 253, 250); // Teal 50
  doc.setDrawColor(45, 212, 191);
  doc.roundedRect(14, y, pageWidth - 28, 14, 2, 2, 'FD');
  doc.setTextColor(13, 148, 136);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('MUC TIEU DUONG HUYET NOI VIEN (ADA 2026 / JBDS-IP):', 18, y + 6);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(51, 65, 85);
  doc.text(
    patient.wardType === 'ICU'
      ? 'ICU / Nguy kich: 140 - 180 mg/dL (7.8 - 10.0 mmol/L). Nguong khoi dau: >= 180 mg/dL.'
      : 'Khoa noi/ngoai (Non-ICU): 100 - 180 mg/dL (5.6 - 10.0 mmol/L). An toan toi thieu: "4.0 is the floor".',
    18,
    y + 11
  );

  y += 20;

  // Insulin Regimen Section
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text(`PHAC DO INSULIN TU DONG: ${insulinPlan.regimenType}`, 14, y);
  y += 6;

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text(`Tong lieu uoc tinh (TDD): ${insulinPlan.tddEstimated} Don vi/ngay (~${insulinPlan.dosePerKgFactor} Don vi/kg)`, 14, y);
  y += 5;
  doc.text(`Can cu tinh toan: ${removeVietnameseTones(insulinPlan.rationale)}`, 14, y, { maxWidth: pageWidth - 28 });
  y += 10;

  // Table of Dosing
  doc.setFillColor(241, 245, 249);
  doc.rect(14, y, pageWidth - 28, 7, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 41, 59);
  doc.text('Thanh phan', 18, y + 5);
  doc.text('Lieu (Don vi)', 60, y + 5);
  doc.text('Thoi diem & Loai Insulin de xuat', 100, y + 5);
  y += 8;

  doc.setFont('helvetica', 'normal');

  if (insulinPlan.regimenType === 'PREMIX') {
    const morningDose = insulinPlan.premixDosing?.morningDose || Math.round(insulinPlan.tddEstimated * (2 / 3));
    const eveningDose = insulinPlan.premixDosing?.eveningDose || (insulinPlan.tddEstimated - morningDose);

    doc.text('Mui Sang (2/3 TDD)', 18, y + 4);
    doc.setFont('helvetica', 'bold');
    doc.text(`${morningDose} UI`, 60, y + 4);
    doc.setFont('helvetica', 'normal');
    doc.text('Truoc an sang 0-15 ph (Analog) hoac 30 ph (NovoMix/Mixtard)', 100, y + 4);
    y += 7;

    doc.text('Mui Chieu / Toi (1/3 TDD)', 18, y + 4);
    doc.setFont('helvetica', 'bold');
    doc.text(`${eveningDose} UI`, 60, y + 4);
    doc.setFont('helvetica', 'normal');
    doc.text('Truoc an toi 0-15 ph (Analog) hoac 30 ph (NovoMix/Mixtard)', 100, y + 4);
    y += 8;

    // Premix Titration Box
    doc.setFillColor(254, 243, 199); // Amber 100
    doc.roundedRect(14, y, pageWidth - 28, 10, 1, 1, 'FD');
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(180, 83, 9);
    doc.text('QUY TAC CHINH LIEU CHEO PREMIX (TS.BS Tran Quang Nam):', 18, y + 4);
    doc.setFont('helvetica', 'normal');
    doc.text('Chinh lieu SANG theo DH chieu; Chinh lieu CHIEU theo DH sang hom sau (+-10% den +-30%).', 18, y + 8);
    y += 14;
  } else {
    // Basal row
    doc.text('Insulin Nen (Basal 50%)', 18, y + 4);
    doc.setFont('helvetica', 'bold');
    doc.text(`${insulinPlan.basalDose} UI`, 60, y + 4);
    doc.setFont('helvetica', 'normal');
    doc.text('21:00 (Glargine / Degludec / Detemir / NPH)', 100, y + 4);
    y += 7;

    if (insulinPlan.regimenType === 'BASAL_BOLUS') {
      doc.text('Insulin Bua Sang (1/3)', 18, y + 4);
      doc.setFont('helvetica', 'bold');
      doc.text(`${insulinPlan.prandialBreakfast} UI`, 60, y + 4);
      doc.setFont('helvetica', 'normal');
      doc.text('Truoc an sang 0-15 phut (Aspart / Lispro / Regular)', 100, y + 4);
      y += 7;

      doc.text('Insulin Bua Trua (1/3)', 18, y + 4);
      doc.setFont('helvetica', 'bold');
      doc.text(`${insulinPlan.prandialLunch} UI`, 60, y + 4);
      doc.setFont('helvetica', 'normal');
      doc.text('Truoc an trua 0-15 phut', 100, y + 4);
      y += 7;

      doc.text('Insulin Bua Toi (1/3)', 18, y + 4);
      doc.setFont('helvetica', 'bold');
      doc.text(`${insulinPlan.prandialDinner} UI`, 60, y + 4);
      doc.setFont('helvetica', 'normal');
      doc.text('Truoc an toi 0-15 phut', 100, y + 4);
      y += 8;
    } else if (insulinPlan.regimenType === 'BASAL_PLUS') {
      doc.text('Insulin Bua an co dinh', 18, y + 4);
      doc.setFont('helvetica', 'bold');
      doc.text('0 UI (NPO / An kem)', 60, y + 4);
      doc.setFont('helvetica', 'normal');
      doc.text('Chi su dung lieu hieu chinh (Correction Bolus) khi DH cao', 100, y + 4);
      y += 8;
    }

    // Basal Titration Note
    if (insulinPlan.basalTitrationGuidance) {
      doc.setFillColor(254, 243, 199); // Amber 100
      doc.roundedRect(14, y, pageWidth - 28, 10, 1, 1, 'FD');
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(180, 83, 9);
      doc.text('CHINH LIEU NEN HOM NAY (Rushakoff Table):', 18, y + 4);
      doc.setFont('helvetica', 'normal');
      doc.text(removeVietnameseTones(insulinPlan.basalTitrationGuidance.actionText), 18, y + 8, { maxWidth: pageWidth - 36 });
      y += 14;
    }
  }

  // Correction matrix summary
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text(`THANG LIEU HIEU CHINH TRUOC BUA AN (${removeVietnameseTones(insulinPlan.recommendedCorrectionColumn)}):`, 14, y);
  y += 5;
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(51, 65, 85);
  doc.text('• < 140 mg/dL: +0 UI  |  140-159 mg/dL: +1 UI  |  160-200 mg/dL: +1-2 UI  |  201-249 mg/dL: +3-4 UI', 14, y);
  y += 4;
  doc.text('• 250-299 mg/dL: +5-7 UI  |  300-349 mg/dL: +7-10 UI  |  >= 350 mg/dL: +8-12 UI & Bao bac si', 14, y);
  y += 8;

  // Clinical Alerts & Emergency Checklist
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(185, 28, 28);
  doc.text('CANH BAO AN TOAN & HUONG DAN LAM SANG QUAN TRONG:', 14, y);
  y += 5;

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(30, 41, 59);

  const topAlerts = alerts.slice(0, 4);
  topAlerts.forEach((alert) => {
    const titleText = `[${alert.level}] ${removeVietnameseTones(alert.title)}`;
    doc.setFont('helvetica', 'bold');
    doc.text(titleText, 14, y, { maxWidth: pageWidth - 28 });
    y += 4;
    doc.setFont('helvetica', 'normal');
    doc.text(removeVietnameseTones(alert.actionGuideline), 14, y, { maxWidth: pageWidth - 28 });
    y += 7;
  });

  // Footer Disclaimer
  doc.setDrawColor(226, 232, 240);
  doc.line(14, 275, pageWidth - 14, 275);
  doc.setFontSize(7);
  doc.setTextColor(148, 163, 184);
  doc.text(
    'CDSS Inpatient Tool: Khong luu tru thong tin dinh danh benh nhan. Du lieu chi xu ly tam thoi.',
    14,
    280
  );
  doc.text(`Ngay gio xuat: ${new Date().toLocaleString('vi-VN')}  |  Trang 1/1`, pageWidth - 65, 280);

  // Save the PDF
  const filename = `DiaCare_CDSS_Report_${new Date().toISOString().slice(0, 10)}.pdf`;
  doc.save(filename);
};
