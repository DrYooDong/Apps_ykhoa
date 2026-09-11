import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import { PATHOGENS } from '../data/pathogens';
import { Language, PatientReportData } from '../types';
import { FileText, Download, CheckCircle2, User, Stethoscope, Microscope, Sparkles, Building2 } from 'lucide-react';
import { toAsciiSafe } from '../utils/pdfExport';

interface ReportGeneratorProps {
  language: Language;
  initialPathogenId?: string | null;
}

export const ReportGenerator: React.FC<ReportGeneratorProps> = ({ language, initialPathogenId }) => {
  const [formData, setFormData] = useState<PatientReportData>({
    patientName: 'Nguyen Van An',
    patientAge: 48,
    patientGender: 'male',
    hospitalId: 'BV-2026-8942',
    department: 'Intensive Care Unit (ICU)',
    physician: 'Dr. Le Hoang Minh, MD, PhD',
    specimenType: 'Blood Culture (Aerobic & Anaerobic)',
    collectionDate: new Date().toISOString().split('T')[0],
    clinicalDiagnosis: 'Severe Sepsis / Catheter-Related Bloodstream Infection (CRBSI)',
    directSmearFindings: 'White Blood Cells: Many PMNs (>25/LPF); Direct Smear: Gram-positive spherical cocci arranged in tight grape-like clusters. No squamous epithelial cells seen.',
    presumptiveOrganism: 'Staphylococcus aureus (MRSA presumptive)',
    colonyDescription: '5% Sheep Blood Agar: 2-3 mm, smooth, opaque, round, buttery colonies with a distinct zone of complete Beta-hemolysis and golden carotenoid pigment.',
    biochemicalConfirmation: 'Catalase: Positive (immediate effervescence with 3% H2O2); Coagulase (Tube & Slide): Positive (fibrin clot formed within 4 hours); DNase: Positive; Mannitol Salt Agar: Yellow fermentation with halo.',
    antibiogramResults: [
      { antibiotic: 'Cefoxitin (Surrogate for Oxacillin/mecA)', micOrZone: '14 mm', interpretation: 'R', clsiCategory: 'Group A' },
      { antibiotic: 'Penicillin G', micOrZone: '≥ 16 µg/mL', interpretation: 'R', clsiCategory: 'Group A' },
      { antibiotic: 'Erythromycin', micOrZone: '12 mm', interpretation: 'R', clsiCategory: 'Group A' },
      { antibiotic: 'Clindamycin (D-zone: Flattened)', micOrZone: '13 mm', interpretation: 'R', clsiCategory: 'Group A' },
      { antibiotic: 'Vancomycin', micOrZone: '1.0 µg/mL', interpretation: 'S', clsiCategory: 'Group B' },
      { antibiotic: 'Daptomycin', micOrZone: '0.5 µg/mL', interpretation: 'S', clsiCategory: 'Group B' },
      { antibiotic: 'Linezolid', micOrZone: '2.0 µg/mL', interpretation: 'S', clsiCategory: 'Group B' },
      { antibiotic: 'Trimethoprim-Sulfamethoxazole', micOrZone: '22 mm', interpretation: 'S', clsiCategory: 'Group B' }
    ],
    pathologistNotes: 'CRITICAL ALERT: MRSA phenotype confirmed via Cefoxitin disk screen. Inducible clindamycin resistance (iMLSB) detected on D-zone test. All beta-lactams are clinically inactive. Immediate infectious disease consult and contact precautions advised.',
    verifiedBy: 'Assoc. Prof. Dr. Tran Thi Mai - Chief of Clinical Microbiology',
    reportDate: new Date().toISOString().split('T')[0]
  });

  const [selectedPresetId, setSelectedPresetId] = useState<string>('s_aureus');
  const [isGenerating, setIsGenerating] = useState(false);

  // Auto-populate from pathogen preset
  const handleLoadPathogenPreset = (id: string) => {
    setSelectedPresetId(id);
    const p = PATHOGENS.find(item => item.id === id);
    if (!p) return;

    if (id === 's_aureus') {
      setFormData(prev => ({
        ...prev,
        specimenType: 'Blood Culture (Peripheral + Central Line)',
        clinicalDiagnosis: 'Catheter-related bloodstream infection / Sepsis',
        directSmearFindings: 'Gram-positive cocci in grape-like clusters. Abundant PMNs.',
        presumptiveOrganism: 'Staphylococcus aureus (MRSA)',
        colonyDescription: p.colony.bloodAgar,
        biochemicalConfirmation: `Catalase: ${p.biochemicals.catalase}, Coagulase: ${p.biochemicals.coagulase}, Mannitol: +`,
        antibiogramResults: [
          { antibiotic: 'Cefoxitin (mecA)', micOrZone: '12 mm', interpretation: 'R', clsiCategory: 'Group A' },
          { antibiotic: 'Vancomycin', micOrZone: '1.0 µg/mL', interpretation: 'S', clsiCategory: 'Group B' },
          { antibiotic: 'Daptomycin', micOrZone: '0.5 µg/mL', interpretation: 'S', clsiCategory: 'Group B' },
          { antibiotic: 'Linezolid', micOrZone: '1.5 µg/mL', interpretation: 'S', clsiCategory: 'Group B' }
        ]
      }));
    } else if (id === 'e_coli') {
      setFormData(prev => ({
        ...prev,
        specimenType: 'Midstream Clean Catch Urine (MSU)',
        clinicalDiagnosis: 'Acute Pyelonephritis / Complicated UTI',
        directSmearFindings: 'Gram-negative plump bacilli. WBC > 100/HPF with bacteria.',
        presumptiveOrganism: 'Escherichia coli (ESBL producer)',
        colonyDescription: p.colony.macConkeyAgar,
        biochemicalConfirmation: `Indole: ${p.biochemicals.indole}, Oxidase: ${p.biochemicals.oxidase}, Lactose (MAC): ${p.biochemicals.lactoseFermentation}`,
        antibiogramResults: [
          { antibiotic: 'Ampicillin', micOrZone: '≥ 32 µg/mL', interpretation: 'R', clsiCategory: 'Group A' },
          { antibiotic: 'Cefazolin', micOrZone: '≥ 64 µg/mL', interpretation: 'R', clsiCategory: 'Group A' },
          { antibiotic: 'Ceftriaxone', micOrZone: '≥ 32 µg/mL', interpretation: 'R', clsiCategory: 'Group B' },
          { antibiotic: 'Meropenem', micOrZone: '0.25 µg/mL', interpretation: 'S', clsiCategory: 'Group B' },
          { antibiotic: 'Amikacin', micOrZone: '4 µg/mL', interpretation: 'S', clsiCategory: 'Group B' },
          { antibiotic: 'Nitrofurantoin', micOrZone: '16 µg/mL', interpretation: 'S', clsiCategory: 'Group U' }
        ]
      }));
    } else if (id === 's_pneumoniae') {
      setFormData(prev => ({
        ...prev,
        specimenType: 'Cerebrospinal Fluid (CSF) + Sputum',
        clinicalDiagnosis: 'Acute Bacterial Meningitis / Pneumococcal Pneumonia',
        directSmearFindings: 'Lancet-shaped Gram-positive diplococci with clear capsule halo. Abundant neutrophils.',
        presumptiveOrganism: 'Streptococcus pneumoniae',
        colonyDescription: p.colony.bloodAgar,
        biochemicalConfirmation: `Catalase: ${p.biochemicals.catalase}, Bile Solubility: Positive (lysed), Optochin: Sensitive (zone ≥ 14mm)`,
        antibiogramResults: [
          { antibiotic: 'Penicillin (Meningitis breakpoint)', micOrZone: '2.0 µg/mL', interpretation: 'R', clsiCategory: 'Group A' },
          { antibiotic: 'Ceftriaxone (Meningitis)', micOrZone: '1.0 µg/mL', interpretation: 'I', clsiCategory: 'Group B' },
          { antibiotic: 'Vancomycin', micOrZone: '0.5 µg/mL', interpretation: 'S', clsiCategory: 'Group B' },
          { antibiotic: 'Levofloxacin', micOrZone: '1.0 µg/mL', interpretation: 'S', clsiCategory: 'Group B' }
        ]
      }));
    } else {
      const isVi = language === 'vi';
      const antibiogramList = [
        ...p.recommendedAntibiotics.firstLine.map((abx, i) => ({
          antibiotic: abx,
          micOrZone: i === 0 ? '0.5 µg/mL' : '1.0 µg/mL',
          interpretation: 'S' as const,
          clsiCategory: 'Group A'
        })),
        ...p.recommendedAntibiotics.alternative.map((abx, i) => ({
          antibiotic: abx,
          micOrZone: i === 0 ? '2.0 µg/mL' : '4.0 µg/mL',
          interpretation: 'S' as const,
          clsiCategory: 'Group B'
        })),
        ...(p.recommendedAntibiotics.intrinsicResistance || []).map(abx => ({
          antibiotic: abx,
          micOrZone: 'Resistant',
          interpretation: 'R' as const,
          clsiCategory: 'Intrinsic'
        }))
      ].slice(0, 8);

      const bioEntries = Object.entries(p.biochemicals)
        .filter(([_, v]) => v !== undefined && v !== '')
        .map(([k, v]) => `${k.toUpperCase()}: ${v}`);

      setFormData(prev => ({
        ...prev,
        specimenType: p.shape === 'mold' ? 'Bronchoalveolar Lavage (BAL) / Tissue Biopsy' : p.shape === 'egg_larva' || p.shape === 'trophozoite_cyst' ? 'Stool Specimen (O&P)' : 'Blood Culture / Sterile Body Fluid',
        clinicalDiagnosis: isVi ? p.clinicalSignificance.vi.slice(0, 140) + '...' : p.clinicalSignificance.en.slice(0, 140) + '...',
        directSmearFindings: isVi ? p.directSmearFeatures.vi : p.directSmearFeatures.en,
        presumptiveOrganism: `${p.scientificName} (${p.commonName[language]})`,
        colonyDescription: p.colony.bloodAgar || p.colony.otherMedia || 'Direct microscopic/molecular examination',
        biochemicalConfirmation: bioEntries.join(', ') || 'Identified via microscopic morphology & confirmatory biochemicals',
        antibiogramResults: antibiogramList.length > 0 ? antibiogramList : [
          { antibiotic: 'First-line antimicrobial', micOrZone: 'Sensitive', interpretation: 'S', clsiCategory: 'Group A' }
        ],
        pathologistNotes: isVi ? p.diagnosticPitfalls?.vi || 'Standard precautions and CLSI interpretative criteria apply.' : p.diagnosticPitfalls?.en || 'Standard precautions and CLSI interpretative criteria apply.'
      }));
    }
  };

  useEffect(() => {
    if (initialPathogenId) {
      handleLoadPathogenPreset(initialPathogenId);
    }
  }, [initialPathogenId]);

  // Generate real PDF using jsPDF
  const handleExportPDF = () => {
    setIsGenerating(true);
    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // Colors
      const primaryColor: [number, number, number] = [30, 58, 138]; // Deep blue
      const secondaryColor: [number, number, number] = [15, 23, 42]; // Slate
      const accentColor: [number, number, number] = [225, 29, 72]; // Rose

      // Hospital Header Banner
      doc.setFillColor(30, 58, 138);
      doc.rect(0, 0, 210, 24, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.text('CENTRAL CLINICAL MICROBIOLOGY LABORATORY', 14, 11);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.text('DEPARTMENT OF CLINICAL PATHOLOGY & INFECTION CONTROL', 14, 18);
      doc.text('ISO 15189 / CLSI M100 ACCREDITED', 150, 18);

      // Title
      doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(13);
      doc.text('COMPREHENSIVE MICROBIOLOGY DIAGNOSTIC REPORT', 14, 33);

      doc.setDrawColor(200, 200, 200);
      doc.line(14, 36, 196, 36);

      // Patient Info Section
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.text('PATIENT IDENTIFICATION & CLINICAL INFORMATION', 14, 42);

      doc.setFont('helvetica', 'normal');
      doc.rect(14, 44, 182, 28);

      // Left Column
      doc.text(`Patient Name: ${toAsciiSafe(formData.patientName)}`, 18, 50);
      doc.text(`Age / Gender: ${formData.patientAge} Years / ${formData.patientGender.toUpperCase()}`, 18, 56);
      doc.text(`Hospital ID / MRN: ${toAsciiSafe(formData.hospitalId)}`, 18, 62);
      doc.text(`Clinical Ward: ${toAsciiSafe(formData.department)}`, 18, 68);

      // Right Column
      doc.text(`Treating Physician: ${toAsciiSafe(formData.physician)}`, 110, 50);
      doc.text(`Specimen: ${toAsciiSafe(formData.specimenType)}`, 110, 56);
      doc.text(`Collection Date: ${formData.collectionDate}`, 110, 62);
      doc.text(`Report Date: ${formData.reportDate}`, 110, 68);

      // Direct Microscopic Examination
      doc.setFont('helvetica', 'bold');
      doc.text('DIRECT MICROSCOPIC EXAMINATION (GRAM STAIN)', 14, 78);
      doc.setFont('helvetica', 'normal');
      doc.rect(14, 80, 182, 14);
      const splitDirect = doc.splitTextToSize(toAsciiSafe(formData.directSmearFindings), 174);
      doc.text(splitDirect, 18, 86);

      // Pathogen Identification & Identification Tests
      doc.setFont('helvetica', 'bold');
      doc.text('ISOLATED PATHOGEN & CONFIRMATORY BIOCHEMICAL PROFILE', 14, 100);
      doc.rect(14, 102, 182, 28);

      doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
      doc.text(`FINAL IDENTIFICATION: ${toAsciiSafe(formData.presumptiveOrganism).toUpperCase()}`, 18, 108);

      doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
      doc.setFont('helvetica', 'normal');
      const splitColony = doc.splitTextToSize(`Colony Morphology: ${toAsciiSafe(formData.colonyDescription)}`, 174);
      doc.text(splitColony, 18, 115);

      const splitBiochem = doc.splitTextToSize(`Confirmatory Reactions: ${toAsciiSafe(formData.biochemicalConfirmation)}`, 174);
      doc.text(splitBiochem, 18, 123);

      // Antibiogram Table
      doc.setFont('helvetica', 'bold');
      doc.text('ANTIMICROBIAL SUSCEPTIBILITY TEST (AST) - CLSI M100 PROTOCOL', 14, 137);

      // Table Header
      let currentY = 141;
      doc.setFillColor(241, 245, 249);
      doc.rect(14, currentY, 182, 7, 'F');
      doc.setFontSize(8);
      doc.setFont('helvetica', 'bold');
      doc.text('ANTIMICROBIAL AGENT', 18, currentY + 5);
      doc.text('CLSI CATEGORY', 95, currentY + 5);
      doc.text('MIC / DISK ZONE', 135, currentY + 5);
      doc.text('INTERPRETATION', 165, currentY + 5);
      currentY += 7;

      // Table Rows
      formData.antibiogramResults.forEach((row, idx) => {
        if (idx % 2 === 1) {
          doc.setFillColor(248, 250, 252);
          doc.rect(14, currentY, 182, 6, 'F');
        }

        doc.setFont('helvetica', 'normal');
        doc.text(toAsciiSafe(row.antibiotic), 18, currentY + 4.5);
        doc.text(toAsciiSafe(row.clsiCategory), 95, currentY + 4.5);
        doc.text(toAsciiSafe(row.micOrZone), 135, currentY + 4.5);

        // Color coding for Interpretation
        doc.setFont('helvetica', 'bold');
        if (row.interpretation === 'S') {
          doc.setTextColor(16, 185, 129); // green
          doc.text('SUSCEPTIBLE (S)', 165, currentY + 4.5);
        } else if (row.interpretation === 'R') {
          doc.setTextColor(225, 29, 72); // red
          doc.text('RESISTANT (R)', 165, currentY + 4.5);
        } else {
          doc.setTextColor(245, 158, 11); // amber
          doc.text('INTERMEDIATE (I)', 165, currentY + 4.5);
        }
        doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
        currentY += 6;
      });

      // Clinical Microbiology Notes & Quality Control
      currentY += 3;
      doc.setFont('helvetica', 'bold');
      doc.text('PATHOLOGIST INTERPRETATION & ANTIMICROBIAL STEWARDSHIP NOTES', 14, currentY);
      currentY += 3;

      doc.setFont('helvetica', 'normal');
      doc.rect(14, currentY, 182, 16);
      const splitNotes = doc.splitTextToSize(toAsciiSafe(formData.pathologistNotes), 174);
      doc.text(splitNotes, 18, currentY + 5);
      currentY += 21;

      // Signature Block
      doc.rect(14, currentY, 182, 16);
      doc.setFont('helvetica', 'bold');
      doc.text('Quality Control & Verification:', 18, currentY + 6);
      doc.setFont('helvetica', 'normal');
      doc.text(`Certified by: ${toAsciiSafe(formData.verifiedBy)}`, 18, currentY + 12);
      doc.text(`Official Stamp & Signature Date: ${formData.reportDate}`, 120, currentY + 12);

      // Footer
      doc.setFontSize(7);
      doc.setTextColor(140, 140, 140);
      doc.text('Generated via Clinical Diagnostic Microbiology System (Mahon 6th Ed. reference standard).', 14, 290);
      doc.text('Page 1 of 1', 185, 290);

      // Save PDF
      const cleanOrg = formData.presumptiveOrganism.replace(/[^a-zA-Z0-9]/g, '_');
      doc.save(`Microbiology_Report_${formData.hospitalId}_${cleanOrg}.pdf`);
    } catch (err) {
      console.error('Error generating PDF:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 font-semibold text-sm uppercase tracking-wider">
              <FileText className="w-4 h-4" />
              {language === 'vi' ? 'Mô đun xuất báo cáo chẩn đoán y khoa' : 'Diagnostic Report Generation Suite'}
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mt-1">
              {language === 'vi' ? 'Xuất Báo Cáo Chẩn Đoán Vi Sinh Ra Tệp PDF' : 'Export Clinical Diagnostic Report (PDF)'}
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              {language === 'vi'
                ? 'Thiết lập và in phiếu kết quả xét nghiệm vi sinh lâm sàng đầy đủ định dạng ISO 15189 / CLSI M100 với đầy đủ lam soi trực tiếp, định danh vi khuẩn và kháng sinh đồ.'
                : 'Create and generate standardized clinical microbiology reports according to ISO 15189 / CLSI M100 with full direct smear, ID, and AST.'}
            </p>
          </div>

          {/* Action button */}
          <button
            onClick={handleExportPDF}
            disabled={isGenerating}
            className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2 shrink-0 disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>
              {isGenerating
                ? (language === 'vi' ? 'Đang tạo PDF...' : 'Generating PDF...')
                : (language === 'vi' ? 'Tải tệp PDF báo cáo' : 'Download Official PDF Report')}
            </span>
          </button>
        </div>

        {/* Presets */}
        <div className="pt-4 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500">
              {language === 'vi' ? 'Chọn tác nhân nạp mẫu báo cáo:' : 'Select pathogen for report:'}
            </span>
            <select
              value={selectedPresetId}
              onChange={e => handleLoadPathogenPreset(e.target.value)}
              className="text-xs p-1.5 rounded-lg border border-slate-300 bg-slate-50 font-medium text-slate-800 focus:bg-white focus:border-indigo-500"
            >
              {PATHOGENS.map(p => (
                <option key={p.id} value={p.id}>
                  {p.scientificName} - {p.commonName[language]}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400">
              {language === 'vi' ? 'Phím tắt:' : 'Quick:'}
            </span>
            <button
              onClick={() => handleLoadPathogenPreset('s_aureus')}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                selectedPresetId === 's_aureus'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              MRSA
            </button>
            <button
              onClick={() => handleLoadPathogenPreset('e_coli')}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                selectedPresetId === 'e_coli'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              E. coli ESBL
            </button>
            <button
              onClick={() => handleLoadPathogenPreset('s_pneumoniae')}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                selectedPresetId === 's_pneumoniae'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              S. pneumoniae
            </button>
            <button
              onClick={() => handleLoadPathogenPreset('enterococcus_faecium')}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                selectedPresetId === 'enterococcus_faecium'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              VRE Faecium
            </button>
            <button
              onClick={() => handleLoadPathogenPreset('fusarium_solani')}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                selectedPresetId === 'fusarium_solani'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Fusarium
            </button>
          </div>
        </div>
      </div>

      {/* Editor & Interactive Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-5">
          <h3 className="text-base font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-3">
            <User className="w-4 h-4 text-indigo-600" />
            {language === 'vi' ? '1. Thông tin bệnh nhân & Bệnh phẩm' : '1. Patient & Specimen Data'}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-500 font-semibold mb-1">
                {language === 'vi' ? 'Họ và tên bệnh nhân:' : 'Patient Name:'}
              </label>
              <input
                type="text"
                value={formData.patientName}
                onChange={e => setFormData({ ...formData, patientName: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-slate-900 font-medium"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-slate-500 font-semibold mb-1">
                  {language === 'vi' ? 'Tuổi:' : 'Age:'}
                </label>
                <input
                  type="number"
                  value={formData.patientAge}
                  onChange={e => setFormData({ ...formData, patientAge: Number(e.target.value) })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-slate-900 font-medium"
                />
              </div>
              <div>
                <label className="block text-slate-500 font-semibold mb-1">
                  {language === 'vi' ? 'Giới tính:' : 'Gender:'}
                </label>
                <select
                  value={formData.patientGender}
                  onChange={e => setFormData({ ...formData, patientGender: e.target.value as any })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-slate-900 font-medium"
                >
                  <option value="male">{language === 'vi' ? 'Nam' : 'Male'}</option>
                  <option value="female">{language === 'vi' ? 'Nữ' : 'Female'}</option>
                  <option value="other">{language === 'vi' ? 'Khác' : 'Other'}</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-slate-500 font-semibold mb-1">
                {language === 'vi' ? 'Mã số bệnh án (MRN/ID):' : 'Hospital ID / MRN:'}
              </label>
              <input
                type="text"
                value={formData.hospitalId}
                onChange={e => setFormData({ ...formData, hospitalId: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-slate-900 font-medium"
              />
            </div>

            <div>
              <label className="block text-slate-500 font-semibold mb-1">
                {language === 'vi' ? 'Khoa điều trị:' : 'Clinical Ward:'}
              </label>
              <input
                type="text"
                value={formData.department}
                onChange={e => setFormData({ ...formData, department: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-slate-900 font-medium"
              />
            </div>

            <div>
              <label className="block text-slate-500 font-semibold mb-1">
                {language === 'vi' ? 'Loại bệnh phẩm:' : 'Specimen Type:'}
              </label>
              <input
                type="text"
                value={formData.specimenType}
                onChange={e => setFormData({ ...formData, specimenType: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-slate-900 font-medium"
              />
            </div>

            <div>
              <label className="block text-slate-500 font-semibold mb-1">
                {language === 'vi' ? 'Bác sĩ điều trị chỉ định:' : 'Treating Physician:'}
              </label>
              <input
                type="text"
                value={formData.physician}
                onChange={e => setFormData({ ...formData, physician: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-slate-900 font-medium"
              />
            </div>
          </div>

          <h3 className="text-base font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-3 pt-3">
            <Microscope className="w-4 h-4 text-indigo-600" />
            {language === 'vi' ? '2. Kết quả vi sinh & Lam soi' : '2. Microbiology Findings'}
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-500 font-semibold mb-1">
                {language === 'vi' ? 'Kết quả soi tươi / Nhuộm Gram trực tiếp:' : 'Direct Smear (Gram Stain) Findings:'}
              </label>
              <textarea
                rows={2}
                value={formData.directSmearFindings}
                onChange={e => setFormData({ ...formData, directSmearFindings: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-slate-900"
              />
            </div>

            <div>
              <label className="block text-slate-500 font-semibold mb-1">
                {language === 'vi' ? 'Tác nhân định danh kết luận:' : 'Identified Microorganism:'}
              </label>
              <input
                type="text"
                value={formData.presumptiveOrganism}
                onChange={e => setFormData({ ...formData, presumptiveOrganism: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-slate-900 font-bold"
              />
            </div>

            <div>
              <label className="block text-slate-500 font-semibold mb-1">
                {language === 'vi' ? 'Đặc điểm khuẩn lạc trên đĩa nuôi cấy:' : 'Colony Appearance on Media:'}
              </label>
              <textarea
                rows={2}
                value={formData.colonyDescription}
                onChange={e => setFormData({ ...formData, colonyDescription: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-slate-900"
              />
            </div>

            <div>
              <label className="block text-slate-500 font-semibold mb-1">
                {language === 'vi' ? 'Các thử nghiệm sinh hóa khẳng định:' : 'Confirmatory Biochemical Reactions:'}
              </label>
              <textarea
                rows={2}
                value={formData.biochemicalConfirmation}
                onChange={e => setFormData({ ...formData, biochemicalConfirmation: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-slate-900"
              />
            </div>

            <div>
              <label className="block text-slate-500 font-semibold mb-1">
                {language === 'vi' ? 'Khuyến nghị & Cảnh báo quản lý kháng sinh (AMS):' : 'Pathologist & Stewardship Notes:'}
              </label>
              <textarea
                rows={2}
                value={formData.pathologistNotes}
                onChange={e => setFormData({ ...formData, pathologistNotes: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-slate-900 font-medium"
              />
            </div>
          </div>
        </div>

        {/* Right Preview Sheet (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl p-6 shadow-md border-2 border-indigo-100 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <Building2 className="w-4 h-4 text-indigo-600" />
                {language === 'vi' ? 'Xem trước phiếu kết quả' : 'Live Report Preview'}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                CLSI M100 Standard
              </span>
            </div>

            {/* Document Header Preview */}
            <div className="bg-indigo-950 text-white p-3 rounded-xl space-y-1">
              <div className="font-bold text-xs uppercase tracking-wider">
                BỆNH VIỆN / TRUNG TÂM XÉT NGHIỆM VI SINH LÂM SÀNG
              </div>
              <div className="text-[10px] text-indigo-200">
                KHOA VI SINH Y HỌC - TIÊU CHUẨN ISO 15189
              </div>
            </div>

            {/* Patient Header */}
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-[11px] space-y-1 text-slate-700">
              <div className="flex justify-between">
                <span>Bệnh nhân: <strong>{formData.patientName}</strong></span>
                <span>Tuổi/Phái: {formData.patientAge} / {formData.patientGender}</span>
              </div>
              <div className="flex justify-between">
                <span>Mã BA: {formData.hospitalId}</span>
                <span>Khoa: {formData.department}</span>
              </div>
              <div>Bệnh phẩm: <strong>{formData.specimenType}</strong></div>
            </div>

            {/* Direct Smear & Identification */}
            <div className="space-y-2 text-xs">
              <div className="p-2.5 bg-purple-50 rounded-xl border border-purple-100">
                <span className="font-bold text-purple-900 block text-[11px]">Soi trực tiếp:</span>
                <span className="text-purple-800 text-[11px]">{formData.directSmearFindings}</span>
              </div>

              <div className="p-2.5 bg-indigo-50 rounded-xl border border-indigo-100">
                <span className="font-bold text-indigo-950 block text-[11px]">Định danh vi sinh vật:</span>
                <span className="text-indigo-700 font-bold italic text-sm">{formData.presumptiveOrganism}</span>
              </div>
            </div>

            {/* AST Table Preview */}
            <div className="space-y-2">
              <div className="font-bold text-xs text-slate-800">
                Kháng sinh đồ (Antibiogram Results):
              </div>
              <div className="overflow-x-auto max-h-56 overflow-y-auto border border-slate-200 rounded-xl">
                <table className="w-full text-left text-[11px]">
                  <thead className="bg-slate-100 text-slate-700 sticky top-0">
                    <tr>
                      <th className="p-2">Kháng sinh</th>
                      <th className="p-2">MIC/Đường kính</th>
                      <th className="p-2">Kết quả</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {formData.antibiogramResults.map((ast, i) => (
                      <tr key={i} className="hover:bg-slate-50">
                        <td className="p-2 font-medium">{ast.antibiotic}</td>
                        <td className="p-2 font-mono text-slate-500">{ast.micOrZone}</td>
                        <td className="p-2">
                          <span
                            className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                              ast.interpretation === 'S'
                                ? 'bg-emerald-100 text-emerald-800'
                                : ast.interpretation === 'R'
                                ? 'bg-rose-100 text-rose-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {ast.interpretation === 'S' ? 'Nhạy (S)' : ast.interpretation === 'R' ? 'Kháng (R)' : 'Trung gian (I)'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Export Trigger */}
            <button
              onClick={handleExportPDF}
              disabled={isGenerating}
              className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold text-xs hover:bg-indigo-700 transition-colors shadow-md flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>{language === 'vi' ? 'Xuất ra tệp PDF ngay' : 'Export to PDF File Now'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
