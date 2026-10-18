import { jsPDF } from 'jspdf';
import { Pathogen, Language, ChapterSummary, ClinicalCaseQuiz, DiagnosticFlowchart, FlowchartStep } from '../types';

/**
 * Transliterates Vietnamese diacritics into ASCII-safe characters
 * to ensure pristine rendering in jsPDF standard fonts without glyph defects.
 */
export function toAsciiSafe(text: string | null | undefined): string {
  if (!text) return '';
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .replace(/–|—/g, '-')
    .replace(/“|”/g, '"')
    .replace(/‘|’/g, "'");
}

/**
 * Generates and downloads a formal Diagnostic Microbiology Dossier (PDF)
 * for a specific pathogen based on Mahon & Lehman: Textbook of Diagnostic Microbiology (6th Ed.)
 */
export function exportPathogenDossierPDF(pathogen: Pathogen, language: Language = 'vi'): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = 210;
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;
  let currentY = 14;

  const primaryColor = [30, 41, 59]; // slate-800
  const accentColor = [67, 56, 202]; // indigo-700
  const headerBg = [241, 245, 249]; // slate-100

  // 1. Header Banner
  doc.setFillColor(accentColor[0], accentColor[1], accentColor[2]);
  doc.rect(margin, currentY, contentWidth, 18, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(255, 255, 255);
  doc.text(
    language === 'vi' 
      ? 'HO SO VI SINH LAM SANG & CHAN DOAN CAN LAM SANG' 
      : 'CLINICAL MICROBIOLOGY DIAGNOSTIC DOSSIER',
    margin + 4,
    currentY + 7
  );

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text(
    language === 'vi'
      ? 'Chuan hoa theo Giao trinh Mahon & Lehman: Textbook of Diagnostic Microbiology (6th Ed.)'
      : 'Standardized reference: Mahon & Lehman Diagnostic Microbiology (6th Edition)',
    margin + 4,
    currentY + 13
  );

  const docId = `REF-${pathogen.id.toUpperCase()}-${new Date().getFullYear()}`;
  doc.text(`Doc ID: ${docId}`, pageWidth - margin - 35, currentY + 13);
  currentY += 23;

  // 2. Pathogen Title Box
  doc.setFillColor(headerBg[0], headerBg[1], headerBg[2]);
  doc.roundedRect(margin, currentY, contentWidth, 22, 2, 2, 'F');
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(margin, currentY, contentWidth, 22, 2, 2, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
  doc.text(pathogen.scientificName, margin + 4, currentY + 7);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105);
  const commonNameText = toAsciiSafe(pathogen.commonName[language]);
  doc.text(commonNameText, margin + 4, currentY + 13);

  // Badges
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(30, 41, 59);
  const badgesText = `BSL: ${pathogen.biosafetyLevel}  |  Gram: ${pathogen.gramReaction}  |  Oxygen: ${pathogen.oxygen}  |  Shape: ${pathogen.shape}`;
  doc.text(badgesText, margin + 4, currentY + 19);
  currentY += 26;

  // Helper to draw section title
  const drawSectionTitle = (titleVi: string, titleEn: string) => {
    doc.setFillColor(accentColor[0], accentColor[1], accentColor[2]);
    doc.rect(margin, currentY, 2.5, 5.5, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    const title = language === 'vi' ? toAsciiSafe(titleVi) : toAsciiSafe(titleEn);
    doc.text(title, margin + 5, currentY + 4.5);
    currentY += 7.5;
  };

  // 3. Scientific Taxonomy
  drawSectionTitle('1. Phan loai hoc vi sinh (Taxonomy)', '1. Scientific Taxonomy');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  const taxText = `Phylum: ${pathogen.taxonomy.phylum} | Class: ${pathogen.taxonomy.class} | Order: ${pathogen.taxonomy.order} | Family: ${pathogen.taxonomy.family} | Genus: ${pathogen.taxonomy.genus}`;
  doc.text(taxText, margin, currentY);
  currentY += 5.5;

  // 4. Microscopic & Direct Smear
  drawSectionTitle('2. Hinh thai vi the & Nhuom soi (Direct Smear)', '2. Microscopic & Smear Findings');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  const smearText = toAsciiSafe(pathogen.directSmearFeatures[language]);
  const splitSmear = doc.splitTextToSize(smearText, contentWidth);
  doc.text(splitSmear, margin, currentY);
  currentY += splitSmear.length * 4.2 + 3;

  // 5. Culture Morphology
  drawSectionTitle('3. Dac diem nuoi cay & Hinh thai khuan lac (Colony)', '3. Culture Characteristics');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);

  const colonyDetails = [
    `Blood Agar (SBA): ${toAsciiSafe(pathogen.colony.bloodAgar)}`,
    `Hemolysis: ${pathogen.colony.hemolysis.toUpperCase()} | Texture: ${pathogen.colony.texture || 'N/A'} | Pigment: ${toAsciiSafe(pathogen.colony.pigment || 'None')}`,
    `Chocolate Agar: ${toAsciiSafe(pathogen.colony.chocolateAgar || 'N/A')}`,
    `MacConkey Agar: ${toAsciiSafe(pathogen.colony.macConkeyAgar || 'No growth')}`
  ];

  colonyDetails.forEach(detail => {
    const split = doc.splitTextToSize(`* ${detail}`, contentWidth);
    doc.text(split, margin, currentY);
    currentY += split.length * 3.8;
  });
  currentY += 3;

  // 6. Key Biochemical Tests Matrix
  drawSectionTitle('4. Profile thu nghiem sinh hoa dinh danh (Biochemical Profile)', '4. Biochemical Profile');
  const bio = pathogen.biochemicals;
  const bioItems = [
    `Catalase: ${bio.catalase || 'N/A'}`,
    `Oxidase: ${bio.oxidase || 'N/A'}`,
    `Coagulase: ${bio.coagulase || 'N/A'}`,
    `Indole: ${bio.indole || 'N/A'}`,
    `Urease: ${bio.urease || 'N/A'}`,
    `Bile Esculin: ${bio.bileEsculin || 'N/A'}`,
    `PYR: ${bio.pyr || 'N/A'}`,
    `Motility: ${bio.motility || 'N/A'}`
  ];

  doc.setFillColor(248, 250, 252);
  doc.rect(margin, currentY, contentWidth, 8, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.rect(margin, currentY, contentWidth, 8, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);
  const bioStr = bioItems.join('   |   ');
  doc.text(bioStr, margin + 3, currentY + 5);
  currentY += 12;

  // Check if we need to add Page 2
  if (currentY > 210) {
    doc.addPage();
    currentY = 16;
  }

  // 7. Virulence Factors & Toxins
  drawSectionTitle('5. Yeu to doc luc & Doc to chinh (Virulence Factors & Toxins)', '5. Virulence Factors & Toxins');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);
  const virulenceList = pathogen.virulenceFactors[language] || [];
  virulenceList.forEach((vf: string) => {
    const splitVf = doc.splitTextToSize(`- ${toAsciiSafe(vf)}`, contentWidth);
    doc.text(splitVf, margin, currentY);
    currentY += splitVf.length * 3.8;
  });
  if (pathogen.primaryToxins && pathogen.primaryToxins.length > 0) {
    const toxinLine = `Doc to dac hieu (Key Toxins): ${pathogen.primaryToxins.join(', ')}`;
    doc.setFont('helvetica', 'bold');
    doc.text(toAsciiSafe(toxinLine), margin, currentY);
    currentY += 4.5;
  }
  currentY += 3;

  // 8. Clinical Significance
  drawSectionTitle('6. Y nghia lam sang & Benh canh (Clinical Significance)', '6. Clinical Significance');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);
  const clinSignif = toAsciiSafe(pathogen.clinicalSignificance[language]);
  const splitClin = doc.splitTextToSize(clinSignif, contentWidth);
  doc.text(splitClin, margin, currentY);
  currentY += splitClin.length * 3.8 + 3;

  // Check page overflow
  if (currentY > 230) {
    doc.addPage();
    currentY = 16;
  }

  // 9. Antimicrobial Susceptibility (CLSI Guidelines)
  drawSectionTitle('7. Khang sinh do & De khang tu nhien theo CLSI (Antimicrobials & Intrinsic Resistance)', '7. Antimicrobial Therapy & CLSI Profile');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);

  const abxFirst = `Khang sinh uu tien (1st Line): ${pathogen.recommendedAntibiotics.firstLine.join(', ')}`;
  const splitFirst = doc.splitTextToSize(toAsciiSafe(abxFirst), contentWidth);
  doc.text(splitFirst, margin, currentY);
  currentY += splitFirst.length * 3.8;

  if (pathogen.recommendedAntibiotics.intrinsicResistance?.length) {
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(190, 18, 60); // red
    const abxIntr = `DE KHANG TU NHIEN (Intrinsic Resistance): ${pathogen.recommendedAntibiotics.intrinsicResistance.join('; ')}`;
    const splitIntr = doc.splitTextToSize(toAsciiSafe(abxIntr), contentWidth);
    doc.text(splitIntr, margin, currentY);
    currentY += splitIntr.length * 3.8;
  }
  currentY += 3;

  // 10. Diagnostic Pitfalls / Rule-out
  if (pathogen.diagnosticPitfalls) {
    drawSectionTitle('8. Canh bao bay chan doan & Luu y (Diagnostic Pitfalls)', '8. Diagnostic Pitfalls & Alerts');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(180, 83, 9); // amber
    const pitfall = toAsciiSafe(pathogen.diagnosticPitfalls[language]);
    const splitPit = doc.splitTextToSize(pitfall, contentWidth);
    doc.text(splitPit, margin, currentY);
    currentY += splitPit.length * 3.8 + 4;
  }

  // Footer & Signature
  doc.setDrawColor(203, 213, 225);
  doc.line(margin, 280, pageWidth - margin, 280);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  doc.text(
    language === 'vi'
      ? 'He thong chan doan vi sinh lam sang Mahon 6th Edition. Ban in tai lieu danh cho chuyen gia can lam sang.'
      : 'Clinical Diagnostic Microbiology System (Mahon 6th Ed.). Intended for professional laboratory reference.',
    margin,
    285
  );
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, pageWidth - margin - 35, 285);

  // Save PDF file
  const cleanFileName = pathogen.id.replace(/[^a-zA-Z0-9_]/g, '');
  doc.save(`Mahon_Diagnostic_Dossier_${cleanFileName}.pdf`);
}

/**
 * Generates and downloads a diagnostic protocol & clinical case study report (PDF)
 * for an entire diagnostic flowchart and Mahon Chapter vignette.
 */
export function exportFlowchartCasePDF(
  flowchart: DiagnosticFlowchart,
  chapter?: ChapterSummary | null,
  caseData?: ClinicalCaseQuiz | null,
  language: Language = 'vi'
): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = 210;
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;
  let currentY = 14;

  const primaryColor = [30, 41, 59];
  const accentColor = [15, 118, 110]; // teal-700
  const headerBg = [240, 253, 250];

  // 1. Header Banner
  doc.setFillColor(accentColor[0], accentColor[1], accentColor[2]);
  doc.rect(margin, currentY, contentWidth, 18, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(255, 255, 255);
  doc.text(
    language === 'vi' 
      ? 'QUY TRINH THUAT TOAN CHAN DOAN VI SINH & CA BENH LAM SANG' 
      : 'DIAGNOSTIC MICROBIOLOGY ALGORITHM & CLINICAL CASE REPORT',
    margin + 4,
    currentY + 7
  );

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text(
    'Mahon & Lehman: Textbook of Diagnostic Microbiology (6th Edition)',
    margin + 4,
    currentY + 13
  );

  const protocolId = `ALG-${flowchart.id.toUpperCase()}-${new Date().getFullYear()}`;
  doc.text(`Protocol: ${protocolId}`, pageWidth - margin - 35, currentY + 13);
  currentY += 23;

  // 2. Algorithm Title Box
  doc.setFillColor(headerBg[0], headerBg[1], headerBg[2]);
  doc.roundedRect(margin, currentY, contentWidth, 20, 2, 2, 'F');
  doc.setDrawColor(153, 246, 228);
  doc.roundedRect(margin, currentY, contentWidth, 20, 2, 2, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
  doc.text(toAsciiSafe(flowchart.title[language]), margin + 4, currentY + 7);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105);
  doc.text(toAsciiSafe(flowchart.description[language]), margin + 4, currentY + 14);
  currentY += 25;

  const drawSectionTitle = (titleVi: string, titleEn: string) => {
    doc.setFillColor(accentColor[0], accentColor[1], accentColor[2]);
    doc.rect(margin, currentY, 2.5, 5.5, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    const title = language === 'vi' ? toAsciiSafe(titleVi) : toAsciiSafe(titleEn);
    doc.text(title, margin + 5, currentY + 4.5);
    currentY += 7.5;
  };

  // 3. Algorithm Step-by-Step Decision Rules
  drawSectionTitle('1. Cac buoc quy trinh thuat toan re nhanh (Decision Nodes)', '1. Decision Tree Nodes & Steps');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);

  (Object.values(flowchart.steps) as FlowchartStep[]).forEach((step, idx) => {
    doc.setFont('helvetica', 'bold');
    doc.text(`Step ${idx + 1}: ${toAsciiSafe(step.title[language])}`, margin, currentY);
    currentY += 4;

    doc.setFont('helvetica', 'normal');
    const desc = toAsciiSafe(step.description[language]);
    const splitDesc = doc.splitTextToSize(desc, contentWidth - 4);
    doc.text(splitDesc, margin + 4, currentY);
    currentY += splitDesc.length * 3.6;

    step.options.forEach((opt, oIdx) => {
      let optLine = `   [${String.fromCharCode(65 + oIdx)}] ${toAsciiSafe(opt.label[language])}`;
      if (opt.conclusion) {
        optLine += ` -> KET LUAN: ${toAsciiSafe(opt.conclusion[language])}`;
      }
      const splitOpt = doc.splitTextToSize(optLine, contentWidth - 6);
      doc.text(splitOpt, margin + 4, currentY);
      currentY += splitOpt.length * 3.6;
    });
    currentY += 2.5;

    if (currentY > 240) {
      doc.addPage();
      currentY = 16;
    }
  });
  currentY += 3;

  // 4. Mahon Clinical Case in Point
  if (caseData) {
    if (currentY > 200) {
      doc.addPage();
      currentY = 16;
    }

    drawSectionTitle('2. Tinh huong benh nhan lam sang thuc te (Mahon Case in Point)', '2. Authentic Mahon Clinical Case Vignette');
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
    doc.text(toAsciiSafe(caseData.chapterTitle), margin, currentY);
    currentY += 4.5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(51, 65, 85);

    if (caseData.caseScenario) {
      const hist = `Ca benh lam sang (Case Scenario): ${toAsciiSafe(caseData.caseScenario[language])}`;
      const splitHist = doc.splitTextToSize(hist, contentWidth);
      doc.text(splitHist, margin, currentY);
      currentY += splitHist.length * 3.6 + 2;
    }

    const q = `Cau hoi danh gia (Question): ${toAsciiSafe(caseData.question[language])}`;
    const splitQ = doc.splitTextToSize(q, contentWidth);
    doc.text(splitQ, margin, currentY);
    currentY += splitQ.length * 3.6 + 2;

    const concl = `Giai thich & Chan doan (Explanation & Diagnosis): ${toAsciiSafe(caseData.explanation[language])}`;
    const splitConcl = doc.splitTextToSize(concl, contentWidth);
    doc.text(splitConcl, margin, currentY);
    currentY += splitConcl.length * 3.6 + 2;

    if (caseData.clinicalTakeaway) {
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(180, 83, 9);
      const pearl = `HAT NGOC LAM SANG (Clinical Takeaway): ${toAsciiSafe(caseData.clinicalTakeaway[language])}`;
      const splitPearl = doc.splitTextToSize(pearl, contentWidth);
      doc.text(splitPearl, margin, currentY);
      currentY += splitPearl.length * 3.6 + 3;
    }
  }

  // 5. Mahon Chapter Clinical Pearls & Points to Remember
  if (chapter) {
    if (currentY > 210) {
      doc.addPage();
      currentY = 16;
    }

    drawSectionTitle('3. Diem cot loi can nho theo Mahon (Points to Remember)', '3. Chapter Key Points to Remember');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(51, 65, 85);

    chapter.pointsToRemember?.[language]?.slice(0, 4).forEach((pt: string) => {
      const splitPt = doc.splitTextToSize(`* ${toAsciiSafe(pt)}`, contentWidth);
      doc.text(splitPt, margin, currentY);
      currentY += splitPt.length * 3.6;
    });
  }

  // Footer
  doc.setDrawColor(203, 213, 225);
  doc.line(margin, 280, pageWidth - margin, 280);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  doc.text('Mahon Diagnostic Microbiology Clinical Algorithm & Case Study Protocol.', margin, 285);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, pageWidth - margin - 35, 285);

  const cleanId = flowchart.id.replace(/[^a-zA-Z0-9_]/g, '');
  doc.save(`Mahon_Diagnostic_Algorithm_${cleanId}.pdf`);
}
