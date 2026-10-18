import { jsPDF } from 'jspdf';
import { AntibioticItem, CalculatedRenalMetrics, DrugInteraction, Language, PatientState } from '../types';
import { DoseResult, ExtractedDrugData } from './drugDataExtractor';

export interface ConsultationReportData {
  patient: PatientState;
  renal: CalculatedRenalMetrics;
  drug: AntibioticItem;
  drugDetails: ExtractedDrugData;
  doseResult: DoseResult;
  interactions: DrugInteraction[];
  scenarioLabel: string;
  language: Language;
  consultDate?: string;
  consultantName?: string;
}

export function generatePdfConsultationReport(data: ConsultationReportData): void {
  const isEn = data.language === 'en';
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 14;
  let y = 16;

  // Header Banner
  doc.setFillColor(15, 111, 186); // #0f6fba
  doc.roundedRect(margin, y, pageWidth - 2 * margin, 24, 3, 3, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  const title = isEn
    ? 'CLINICAL PHARMACY CONSULTATION - ANTIMICROBIAL DOSING'
    : 'PHIEU HOI CHAN DUOC LAM SANG - QUAN LY LIEU KHANG SINH';
  doc.text(title, pageWidth / 2, y + 10, { align: 'center' });

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  const subTitle = isEn
    ? 'Clinical Decision Support System (CDSS) - Renal Adjustment & Drug Interaction Safety'
    : 'He thong Ho tro Ra quyet dinh Lam sang (CDSS) - Hieu chinh lieu theo chuc nang than & Tuong tac thuoc';
  doc.text(subTitle, pageWidth / 2, y + 17, { align: 'center' });

  y += 30;

  // Patient Info Box
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, y, pageWidth - 2 * margin, 34, 2, 2, 'FD');

  doc.setTextColor(15, 111, 186);
  doc.setFontSize(9.5);
  doc.setFont('helvetica', 'bold');
  doc.text(isEn ? '1. PATIENT DEMOGRAPHICS & RENAL STATUS' : '1. THONG TIN BENH NHAN & CHUC NANG THAN', margin + 4, y + 6);

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(30, 41, 59);

  const col1 = margin + 4;
  const col2 = margin + 65;
  const col3 = margin + 125;

  const patientName = data.patient.patientName || (isEn ? 'Inpatient Case' : 'Benh nhan noi tru');
  const patientId = data.patient.patientId || 'BN-' + Math.floor(100000 + Math.random() * 900000);
  const dept = data.patient.department || (isEn ? 'ICU / Internal Medicine' : 'ICU / Noi tong hop');
  const diag = data.patient.diagnosis || data.drug.indications[0] || (isEn ? 'Severe infection' : 'Nhiem khuan nang');

  doc.text(`${isEn ? 'Patient' : 'Ho ten'}: ${patientName}`, col1, y + 13);
  doc.text(`${isEn ? 'ID' : 'Ma BN'}: ${patientId}`, col2, y + 13);
  doc.text(`${isEn ? 'Department' : 'Khoa'}: ${dept}`, col3, y + 13);

  doc.text(`${isEn ? 'Age / Sex' : 'Tuoi / Gioi'}: ${data.patient.age} yo / ${data.patient.gender === 'm' ? (isEn ? 'Male' : 'Nam') : (isEn ? 'Female' : 'Nu')}`, col1, y + 20);
  doc.text(`${isEn ? 'Weight / Height' : 'Can nang / Chieu cao'}: ${data.patient.weight} kg ${data.patient.height ? `/ ${data.patient.height} cm` : ''}`, col2, y + 20);
  doc.text(`BMI: ${data.renal.bmi ? data.renal.bmi + ' kg/m2' : 'N/A'} (IBW: ${data.renal.ibw || 'N/A'} kg)`, col3, y + 20);

  doc.setFont('helvetica', 'bold');
  const scrText = `Scr: ${data.renal.scrUmol} umol/L (${data.renal.scrMgdl} mg/dL)`;
  doc.text(scrText, col1, y + 27);

  const crclColor = data.renal.crcl < 30 ? [192, 57, 43] : (data.renal.crcl < 60 ? [230, 126, 34] : [22, 160, 133]);
  doc.setTextColor(crclColor[0], crclColor[1], crclColor[2]);
  doc.text(`CrCl (Cockcroft-Gault): ${data.renal.crcl} mL/min`, col2, y + 27);

  doc.setTextColor(30, 41, 59);
  doc.setFont('helvetica', 'normal');
  doc.text(`${isEn ? 'Status' : 'Phan loai'}: ${isEn ? data.renal.categoryLabelEn : data.renal.categoryLabelVi}`, col3, y + 27);

  y += 39;

  // Antibiotic Dosing Recommendation Box
  doc.setFillColor(240, 248, 255);
  doc.setDrawColor(15, 111, 186);
  doc.roundedRect(margin, y, pageWidth - 2 * margin, 42, 2, 2, 'FD');

  doc.setTextColor(15, 111, 186);
  doc.setFontSize(9.5);
  doc.setFont('helvetica', 'bold');
  doc.text(isEn ? '2. ANTIMICROBIAL DOSING RECOMMENDATION' : '2. KHUYEN CAO LIEU KHANG SINH CDSS', margin + 4, y + 6);

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(15, 23, 42);

  doc.text(`${isEn ? 'Antibiotic' : 'Khang sinh'}: ${data.drug.name} (${data.drug.group})`, margin + 4, y + 13);
  doc.text(`${isEn ? 'Clinical Indication / Scenario' : 'Chi dinh / Kich ban'}: ${data.scenarioLabel}`, margin + 4, y + 19);

  if (data.doseResult.loadingDoseTextVi) {
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(180, 83, 9);
    doc.text(`${isEn ? 'Loading Dose' : 'Lieu nap'}: ${isEn ? data.doseResult.loadingDoseTextEn : data.doseResult.loadingDoseTextVi}`, margin + 4, y + 25);
  }

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 111, 186);
  const maintY = data.doseResult.loadingDoseTextVi ? y + 31 : y + 25;
  doc.text(`${isEn ? 'Maintenance Dose' : 'Lieu duy tri'}: ${isEn ? data.doseResult.maintenanceDoseTextEn : data.doseResult.maintenanceDoseTextVi}`, margin + 4, maintY);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  const infY = maintY + 6;
  doc.text(`${isEn ? 'Administration' : 'Cach dung & truyen'}: ${isEn ? data.doseResult.infusionInstructionsEn : data.doseResult.infusionInstructionsVi}`, margin + 4, infY);

  y += 48;

  // Renal Adjustment Rationale
  doc.setFillColor(254, 252, 232);
  doc.setDrawColor(254, 240, 138);
  doc.roundedRect(margin, y, pageWidth - 2 * margin, 24, 2, 2, 'FD');

  doc.setTextColor(161, 98, 7);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text(isEn ? '3. RENAL ADJUSTMENT RATIONALE & SAFETY NOTES' : '3. CO SO HIEU CHINH THEO CHUC NANG THAN & LUU Y', margin + 4, y + 6);

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(68, 64, 60);

  const advice = isEn ? data.doseResult.renalAdjustmentAdviceEn : data.doseResult.renalAdjustmentAdviceVi;
  const splitAdvice = doc.splitTextToSize(advice, pageWidth - 2 * margin - 8);
  doc.text(splitAdvice, margin + 4, y + 12);

  y += 28;

  // Drug Interactions Alert Box
  const hasInteractions = data.interactions && data.interactions.length > 0;
  const boxHeight = hasInteractions ? 34 : 20;

  if (hasInteractions) {
    doc.setFillColor(254, 242, 242);
    doc.setDrawColor(248, 113, 113);
  } else {
    doc.setFillColor(240, 253, 244);
    doc.setDrawColor(187, 247, 208);
  }
  doc.roundedRect(margin, y, pageWidth - 2 * margin, boxHeight, 2, 2, 'FD');

  if (hasInteractions) {
    doc.setTextColor(185, 28, 28);
  } else {
    doc.setTextColor(22, 101, 52);
  }
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text(isEn ? '4. AUTOMATIC DRUG-DRUG INTERACTION ALERT' : '4. HE THONG CANH BAO TUONG TAC THUOC TU DONG', margin + 4, y + 6);

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(30, 41, 59);

  if (hasInteractions) {
    const inter = data.interactions[0];
    const sevLabel = inter.severity === 'major' ? (isEn ? '[MAJOR / CONTRAINDICATED]' : '[NGUY HIEM / CHONG CHI DINH]') : (isEn ? '[MODERATE / MONITOR]' : '[TRUNG BINH / THEO DOI]');
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(192, 57, 43);
    doc.text(`${sevLabel} ${isEn ? inter.interactingDrugEn : inter.interactingDrugVi}`, margin + 4, y + 12);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    const effText = isEn ? inter.clinicalEffectEn : inter.clinicalEffectVi;
    const mgmtText = isEn ? inter.managementEn : inter.managementVi;
    const splitEff = doc.splitTextToSize(`${isEn ? 'Consequence' : 'Hau qua'}: ${effText}`, pageWidth - 2 * margin - 8);
    doc.text(splitEff.slice(0, 2), margin + 4, y + 18);
    const splitMgmt = doc.splitTextToSize(`${isEn ? 'Management' : 'Xu tri'}: ${mgmtText}`, pageWidth - 2 * margin - 8);
    doc.text(splitMgmt.slice(0, 2), margin + 4, y + 26);
  } else {
    doc.text(isEn ? 'No critical drug-drug interaction warnings detected for current primary regimen.' : 'Khong ghi nhan tuong tac thuoc nghiem trong cho phac do don doc nay.', margin + 4, y + 13);
  }

  y += boxHeight + 6;

  // References & Guidelines
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.setFont('helvetica', 'italic');
  doc.text(isEn 
    ? 'References: Stanford Health Care Antimicrobial Dosing Reference Guide, UCSF Adult IDMP Protocol, Sanford Guide 2024, Vietnam MOH Guidelines.'
    : 'Tai lieu tham khao: Stanford Health Care Antimicrobial Dosing Reference Guide, UCSF IDMP adult guidelines, Sanford Guide, Huong dan Bo Y Te.',
    margin, y
  );

  y += 12;

  // Signatures section
  doc.setDrawColor(203, 213, 225);
  doc.line(margin, y, pageWidth - margin, y);
  y += 6;

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 41, 59);

  const sigCol1 = margin + 15;
  const sigCol2 = pageWidth / 2 + 15;

  doc.text(isEn ? 'ATTENDING PHYSICIAN' : 'BAC SI DIEU TRI', sigCol1, y);
  doc.text(isEn ? 'CLINICAL PHARMACIST' : 'DUOC SI LAM SANG', sigCol2, y);

  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(148, 163, 184);
  doc.text(isEn ? '(Signature & Full Name)' : '(Ky va ghi ro ho ten)', sigCol1, y + 5);
  doc.text(isEn ? '(Signature & Full Name)' : '(Ky va ghi ro ho ten)', sigCol2, y + 5);

  const now = new Date();
  const dateStr = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  doc.text(`${isEn ? 'Generated on' : 'Thoi gian xuat'}: ${dateStr}`, margin, y + 24);

  // Save the PDF
  const filename = `CDSS_KhangSinh_${data.drug.id}_${patientId}_${now.toISOString().slice(0, 10)}.pdf`;
  doc.save(filename);
}

export function triggerPrintConsultation(): void {
  window.print();
}
