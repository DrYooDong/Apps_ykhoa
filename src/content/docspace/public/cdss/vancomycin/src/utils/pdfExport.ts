import jsPDF from 'jspdf';
import { PatientProfile, RenalCalculations, InitialDosingResult, TdmEvaluationResult, TdmInput } from '../types';

export function exportClinicalReportPDF(
  patient: PatientProfile,
  renal: RenalCalculations,
  dosing: InitialDosingResult,
  tdmInput?: TdmInput,
  tdmResult?: TdmEvaluationResult
) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 14;

  // Header Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(15, 23, 42); // slate-900
  doc.text('CDSS QUAN LY VANCOMYCIN - PHIEU HO TRO QUYET DINH LAM SANG', pageWidth / 2, y, { align: 'center' });
  
  y += 5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(100, 116, 139); // slate-500
  doc.text('Can cu: Huong dan ASHP/IDSA/SIDP 2020 & Bang hieu chinh lieu khang sinh BVDK Ca Mau', pageWidth / 2, y, { align: 'center' });
  
  y += 3;
  doc.setDrawColor(203, 213, 225); // slate-300
  doc.setLineWidth(0.4);
  doc.line(14, y, pageWidth - 14, y);
  y += 5;

  // SECTION 1: Patient Information & Renal Function
  doc.setFillColor(241, 245, 249); // slate-100
  doc.roundedRect(14, y, pageWidth - 28, 38, 2, 2, 'F');
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text('1. THONG TIN BENH NHAN & CHUC NANG THAN', 18, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);

  const col1 = 18;
  const col2 = 80;
  const col3 = 140;

  // Row 1
  doc.text(`Doi tuong: ${patient.gender === 'male' ? 'Nam' : 'Nu'}, ${patient.age} ${patient.ageUnit === 'years' ? 'tuoi' : 'thang'}`, col1, y + 13);
  doc.text(`Phan loai: ${patient.patientType === 'adult' ? 'Nguoi lon' : 'Tre em'}`, col2, y + 13);
  doc.text(`Khoa: ${patient.clinicalSetting.toUpperCase()}`, col3, y + 13);

  // Row 2
  doc.text(`Can nang: ${patient.weight} kg | Chieu cao: ${patient.height} cm`, col1, y + 20);
  doc.text(`BMI: ${renal.bmi} kg/m2 (${renal.bmiClassification})`, col2, y + 20);
  doc.text(`IBW: ${renal.ibw} kg | ABW: ${renal.abw} kg`, col3, y + 20);

  // Row 3
  doc.text(`SCr: ${patient.scrValue} ${patient.scrUnit === 'umol_L' ? 'umol/L' : 'mg/dL'} (~${renal.scrMgDl} mg/dL)`, col1, y + 27);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(14, 116, 144); // cyan-700
  doc.text(`CrCl (Cockcroft-Gault): ${renal.crcl} mL/phut [dung ${renal.crclUsedWeight}]`, col2, y + 27);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(51, 65, 85);
  doc.text(`eGFR (CKD-EPI): ${renal.egfrCkdEpi} mL/phut/1.73m2`, col3, y + 27);

  // Row 4
  const renalStatusLabel = patient.renalStatus === 'normal_or_ckd' ? 'Binh thuong / Suy than cap-man' :
    patient.renalStatus === 'intermittent_hd' ? 'Chay than nhan tao chu ky (IHD)' :
    patient.renalStatus === 'crrt' ? 'Loc mau lien tuc (CRRT)' : 'Loc mau SLED';
  doc.text(`Tinh trang than: ${renalStatusLabel}`, col1, y + 34);
  const indicationLabel = patient.indication === 'severe_mrsa' ? 'Nhiem khuan nang do MRSA' : 'Nhiem khuan khac';
  doc.text(`Chi dinh: ${indicationLabel} | Gia dinh MIC: ${patient.mic} mg/L`, col2, y + 34);

  y += 42;

  // SECTION 2: Initial Dosing Recommendation
  doc.setFillColor(240, 253, 250); // teal-50
  doc.setDrawColor(204, 251, 241);
  doc.roundedRect(14, y, pageWidth - 28, 48, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 118, 110); // teal-700
  doc.text('2. KHUYEN CAO LIEU VANCOMYCIN KHOI DAU (CDSS)', 18, y + 6);

  // Loading Dose block
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(18, y + 10, 84, 32, 1.5, 1.5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(30, 41, 59);
  doc.text('LIEU NAP (LOADING DOSE)', 22, y + 16);
  
  doc.setFontSize(13);
  doc.setTextColor(13, 148, 136); // teal-600
  if (dosing.loadingDoseMg > 0) {
    doc.text(`${dosing.loadingDoseMg} mg`, 22, y + 23);
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text(`(~${dosing.loadingDoseMgPerKg} mg/kg TBW)`, 22, y + 28);
    doc.setFont('helvetica', 'normal');
    doc.text(`Thoi gian truyen: toi thieu ${dosing.loadingInfusionMinutes} phut`, 22, y + 33);
    doc.text(`(Toc do truyen <= 10 - 15 mg/phut de tranh Red Man)`, 22, y + 38);
  } else {
    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139);
    doc.text('Khong chi dinh lieu nap thuong quy', 22, y + 24);
    doc.setFontSize(8);
    doc.text(dosing.loadingNote || 'Theo huong dan so sinh/nhi', 22, y + 31);
  }

  // Maintenance Dose block
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(106, y + 10, 88, 32, 1.5, 1.5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(30, 41, 59);
  doc.text('LIEU DUY TRI (MAINTENANCE)', 110, y + 16);

  doc.setFontSize(13);
  doc.setTextColor(14, 116, 144); // cyan-700
  if (dosing.maintenanceMethod === 'continuous') {
    doc.text(`${dosing.dailyMaintenanceMg} mg / 24 gio`, 110, y + 23);
    doc.setFontSize(8.5);
    doc.setTextColor(13, 148, 136);
    doc.text(`Truyen tinh mach lien tuc: ${dosing.continuousRateMgPerHour} mg/gio`, 110, y + 28);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 116, 139);
    doc.text(`Muc tieu nong do on dinh Css: 20 - 25 mg/L`, 110, y + 34);
    doc.text(`(Tuong duong AUC24 = Css x 24 = 480 - 600 mg.h/L)`, 110, y + 38);
  } else {
    doc.text(`${dosing.maintenanceDoseMg} mg moi ${dosing.maintenanceIntervalHours} gio`, 110, y + 23);
    doc.setFontSize(8.5);
    doc.setTextColor(100, 116, 139);
    doc.text(`Tong lieu 24h: ${dosing.dailyMaintenanceMg} mg/ngay`, 110, y + 28);
    doc.setFont('helvetica', 'normal');
    doc.text(`Thoi gian truyen: ${dosing.maintenanceInfusionMinutes} phut moi lan`, 110, y + 33);
    doc.text(`Muc tieu PK/PD: AUC24/MIC = 400 - 600 mg.h/L`, 110, y + 38);
  }

  y += 52;

  // SECTION 3: TDM Plan & Evaluation (if performed)
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(14, y, pageWidth - 28, 42, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text('3. KE HOACH GIAM SAT NONG DO THUOC (TDM) & KET QUA', 18, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);

  if (tdmResult && tdmResult.auc24 > 0) {
    const methodStr = tdmResult.estimationMethod === 'bayesian_single' 
      ? 'Phan mem Bayesian MAP (1 mau - ASHP 2020)' 
      : tdmResult.estimationMethod === 'continuous_css'
      ? 'Truyen lien tuc (Css x 24)'
      : 'Duoc dong hoc 2 diem (Pai & Rodvold)';
    doc.text(`Phuong phap: ${methodStr}`, 18, y + 12);
    doc.text(`Ket qua AUC24:`, 18, y + 17);
    doc.setFont('helvetica', 'bold');
    const attColor = tdmResult.targetAttainment === 'target' ? [22, 163, 74] : tdmResult.targetAttainment === 'subtherapeutic' ? [217, 119, 6] : [220, 38, 38];
    doc.setTextColor(attColor[0], attColor[1], attColor[2]);
    doc.text(`${tdmResult.auc24} mg.h/L (Dich 400 - 600) -> ${tdmResult.targetAttainment === 'target' ? 'DAT MUC TIEU' : tdmResult.targetAttainment === 'subtherapeutic' ? 'DUOI MUC TIEU' : 'VUOT NGUONG - NGUY CO AKI'}`, 50, y + 17);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(51, 65, 85);
    if (tdmResult.clEstimated) {
      doc.text(`Thong so PK: CL = ${tdmResult.clEstimated} L/h | Vd = ${tdmResult.vdEstimated || '-'} L | kel = ${tdmResult.kel} h-1 | t1/2 = ${tdmResult.halfLifeHours} h | Cmax = ${tdmResult.cMaxEstimated} mg/L | Cmin = ${tdmResult.cMinEstimated} mg/L`, 18, y + 23);
    }
    doc.setFont('helvetica', 'bold');
    doc.text(`Khuyen cao hieu chinh:`, 18, y + 29);
    doc.setFont('helvetica', 'normal');
    const splitRec = doc.splitTextToSize(tdmResult.adjustedDoseRecommendation, pageWidth - 40);
    doc.text(splitRec, 18, y + 34);
  } else {
    doc.text('Nguyen tac lay mau TDM (ASHP 2020 Consensus):', 18, y + 13);
    doc.text('- Thoi diem bat dau TDM: Trong vong 24 - 48 gio dau sau khi khoi tri vancomycin.', 22, y + 19);
    doc.text('- Phuong phap Bayesian (ASHP 2020 khuyen cao uu tien): Lay 1 mau bat ky (hoac day) trong 24-48h dau.', 22, y + 24);
    doc.text('- Phuong phap 2 diem (Peak - Trough): Mau Dinh (sau truyen 1-2h) va Mau Day (truoc lieu ke <= 30p).', 22, y + 29);
    doc.text('- Truyen lien tuc: Lay 1 mau bat ky khi da dat trang thai on dinh (sau 24 - 48h). AUC24 = Css x 24.', 22, y + 34);
  }

  y += 46;

  // SECTION 4: Safety Warnings & Precautions
  doc.setFillColor(254, 242, 242); // red-50
  doc.setDrawColor(254, 202, 202);
  doc.roundedRect(14, y, pageWidth - 28, 30, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(185, 28, 28); // red-700
  doc.text('4. CANH BAO AN TOAN & DOC TINH THAN (AKI)', 18, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(127, 29, 29);
  doc.text('- Tieu chuan chan doan AKI (KDIGO): SCr tang >= 0.3 mg/dL trong 48h hoac tang >= 50% so voi gia tri nen.', 18, y + 12);
  doc.text('- Nguy co AKI tang manh khi AUC24 > 600 - 800 mg.h/L hoac nong do day Trough > 15 - 20 mg/L.', 18, y + 17);
  doc.text('- Pha loang dung dich khong qua 5 mg/mL (1000 mg pha it nhat 200 mL NaCl 0.9% hoac Glucose 5%).', 18, y + 22);
  if (patient.concomitantNephrotoxins && patient.concomitantNephrotoxins.length > 0) {
    doc.setFont('helvetica', 'bold');
    doc.text(`- Chu y tuong tac thuoc: ${patient.concomitantNephrotoxins.join(', ')} -> can kiem tra SCr moi 24-48 gio.`, 18, y + 27);
  } else {
    doc.text('- Theo doi Creatinin huyet thanh dinh ky moi 48 - 72 gio o benh nhan on dinh, hang ngay o benh nhan ICU.', 18, y + 27);
  }

  y += 35;

  // Signatures
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8.5);
  doc.setTextColor(100, 116, 139);
  const todayStr = new Date().toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  doc.text(`Ngay xuat bao cao: ${todayStr}`, 14, y + 5);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 41, 59);
  doc.text('DUOC SI LAM SANG', 35, y + 12, { align: 'center' });
  doc.text('BAC SI DIEU TRI', pageWidth - 35, y + 12, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text('(Ky va ghi ro ho ten)', 35, y + 17, { align: 'center' });
  doc.text('(Ky va ghi ro ho ten)', pageWidth - 35, y + 17, { align: 'center' });

  // Save PDF
  const filename = `Vancomycin_CDSS_${patient.name ? patient.name.replace(/\s+/g, '_') : 'Patient'}_${new Date().toISOString().slice(0, 10)}.pdf`;
  doc.save(filename);
}
