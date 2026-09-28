import { jsPDF } from 'jspdf';
import { ExamModule, ApproachTopic, PersonalNote } from '../types/clinical';

export const pdfExport = {
  exportExamModuleToPDF(exam: ExamModule, notes: PersonalNote[] = []) {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 15;
    const maxLineWidth = pageWidth - margin * 2;
    let y = 18;

    const checkPageBreak = (neededHeight: number) => {
      if (y + neededHeight > 280) {
        doc.addPage();
        y = 15;
      }
    };

    // Header title
    doc.setFillColor(15, 76, 129); // Deep medical navy
    doc.rect(0, 0, pageWidth, 22, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.text('HỆ THỐNG CDSS - CẨM NANG KHÁM LÂM SÀNG BÁC SĨ NỘI TRÚ', margin, 10);
    doc.setFontSize(9);
    doc.text('Bates’ Guide to Physical Examination & Macleod’s Clinical Examination', margin, 16);

    y = 30;
    doc.setTextColor(30, 41, 59);

    // Module Title
    doc.setFontSize(18);
    doc.text(exam.title, margin, y);
    y += 7;

    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139);
    doc.text(exam.subtitle, margin, y);
    y += 10;

    // Overview
    doc.setFontSize(11);
    doc.setTextColor(51, 65, 85);
    const overviewLines = doc.splitTextToSize(`Tổng quan: ${exam.overview}`, maxLineWidth);
    doc.text(overviewLines, margin, y);
    y += overviewLines.length * 5 + 6;

    // High Yield Points Box
    if (exam.highYieldPoints.length > 0) {
      checkPageBreak(30);
      doc.setFillColor(241, 245, 249);
      doc.setDrawColor(148, 163, 184);
      doc.roundedRect(margin, y, maxLineWidth, 22 + exam.highYieldPoints.length * 5, 2, 2, 'FD');
      
      doc.setFontSize(11);
      doc.setTextColor(180, 83, 9); // Amber
      doc.text('MỤC TIÊU CỐT LÕI NỘI TRÚ (HIGH-YIELD RESIDENT PEARLS)', margin + 4, y + 6);
      y += 11;

      doc.setFontSize(9);
      doc.setTextColor(30, 41, 59);
      exam.highYieldPoints.forEach((point) => {
        const lines = doc.splitTextToSize(`• ${point}`, maxLineWidth - 8);
        doc.text(lines, margin + 4, y);
        y += lines.length * 4.5;
      });
      y += 8;
    }

    // Examination Steps
    doc.setFontSize(13);
    doc.setTextColor(15, 76, 129);
    doc.text('QUY TRÌNH THỰC HIỆN CÁC BƯỚC KHÁM (STEP-BY-STEP)', margin, y);
    y += 7;

    exam.steps.forEach((step, idx) => {
      checkPageBreak(35);
      doc.setFontSize(11);
      doc.setTextColor(14, 116, 144); // Teal
      doc.text(`${idx + 1}. [${step.phase}] - ${step.technique}`, margin, y);
      y += 5.5;

      doc.setFontSize(9);
      doc.setTextColor(51, 65, 85);
      step.techniqueDetails.forEach((detail) => {
        const dLines = doc.splitTextToSize(`- ${detail}`, maxLineWidth - 4);
        checkPageBreak(dLines.length * 4.5);
        doc.text(dLines, margin + 3, y);
        y += dLines.length * 4.5;
      });

      // Normal and Abnormal
      checkPageBreak(14);
      doc.setFontSize(8.5);
      doc.setTextColor(22, 101, 52);
      const normalLines = doc.splitTextToSize(`Bình thường: ${step.normalFindings}`, maxLineWidth - 4);
      doc.text(normalLines, margin + 3, y);
      y += normalLines.length * 4 + 1;

      if (step.abnormalFindings && step.abnormalFindings.length > 0) {
        doc.setTextColor(185, 28, 28);
        const abnLines = doc.splitTextToSize(`Bất thường: ${step.abnormalFindings.join('; ')}`, maxLineWidth - 4);
        checkPageBreak(abnLines.length * 4 + 2);
        doc.text(abnLines, margin + 3, y);
        y += abnLines.length * 4 + 3;
      }
      y += 3;
    });

    // Special Signs
    if (exam.specialSigns && exam.specialSigns.length > 0) {
      checkPageBreak(40);
      y += 4;
      doc.setFontSize(12);
      doc.setTextColor(15, 76, 129);
      doc.text('CÁC DẤU HIỆU LÂM SÀNG ĐẶC BIỆT (EPONYMOUS SIGNS)', margin, y);
      y += 6;

      exam.specialSigns.forEach((sign) => {
        checkPageBreak(25);
        doc.setFontSize(10);
        doc.setTextColor(30, 41, 59);
        doc.text(`★ ${sign.name}:`, margin + 2, y);
        y += 4.5;

        doc.setFontSize(9);
        doc.setTextColor(71, 85, 105);
        const descLines = doc.splitTextToSize(`- Cách khám & Biểu hiện: ${sign.description}`, maxLineWidth - 6);
        doc.text(descLines, margin + 4, y);
        y += descLines.length * 4 + 1;

        const indLines = doc.splitTextToSize(`- Ý nghĩa bệnh lý: ${sign.indicates}`, maxLineWidth - 6);
        doc.text(indLines, margin + 4, y);
        y += indLines.length * 4 + 1;

        doc.setTextColor(180, 83, 9);
        const pearlLines = doc.splitTextToSize(`- Kinh nghiệm lâm sàng: ${sign.clinicalPearl}`, maxLineWidth - 6);
        doc.text(pearlLines, margin + 4, y);
        y += pearlLines.length * 4 + 3;
      });
    }

    // Personalized Notes attached
    if (notes.length > 0) {
      checkPageBreak(40);
      y += 4;
      doc.setFontSize(12);
      doc.setTextColor(91, 33, 182); // Purple
      doc.text('GHI CHÚ CÁ NHÂN HÓA CỦA BÁC SĨ (PERSONAL CLINICAL NOTES)', margin, y);
      y += 6;

      notes.forEach((note) => {
        checkPageBreak(25);
        doc.setFontSize(10);
        doc.setTextColor(30, 41, 59);
        doc.text(`[${note.createdAt.slice(0, 10)}] ${note.title}`, margin + 2, y);
        y += 4.5;

        doc.setFontSize(9);
        doc.setTextColor(71, 85, 105);
        const contentLines = doc.splitTextToSize(note.content, maxLineWidth - 6);
        doc.text(contentLines, margin + 4, y);
        y += contentLines.length * 4 + 2;

        if (note.clinicalCaseExample) {
          doc.setTextColor(15, 118, 110);
          doc.text(`Case: ${note.clinicalCaseExample}`, margin + 4, y);
          y += 4.5;
        }
        y += 2;
      });
    }

    // Footer
    const totalPages = doc.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(148, 163, 184);
      doc.text(
        `CDSS Tiếp Cận Lâm Sàng & Khám Bệnh - Trang ${i}/${totalPages}`,
        pageWidth / 2,
        290,
        { align: 'center' }
      );
    }

    const safeFilename = `${exam.id}-kham-lam-sang.pdf`;
    doc.save(safeFilename);
  },

  exportApproachTopicToPDF(topic: ApproachTopic, notes: PersonalNote[] = []) {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 15;
    const maxLineWidth = pageWidth - margin * 2;
    let y = 18;

    const checkPageBreak = (neededHeight: number) => {
      if (y + neededHeight > 280) {
        doc.addPage();
        y = 15;
      }
    };

    // Header bar
    doc.setFillColor(185, 28, 28); // Crimson for Clinical Approach
    doc.rect(0, 0, pageWidth, 22, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.text('HỆ THỐNG CDSS - HƯỚNG DẪN TIẾP CẬN TRIỆU CHỨNG LÂM SÀNG', margin, 10);
    doc.setFontSize(9);
    doc.text('Clinical Decision Support System for Medical Residents', margin, 16);

    y = 30;
    doc.setTextColor(30, 41, 59);

    // Topic Title
    doc.setFontSize(18);
    doc.text(topic.title, margin, y);
    y += 6;

    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139);
    doc.text(`${topic.englishTitle} | Mức độ khẩn: ${topic.urgencyLevel}`, margin, y);
    y += 9;

    // Definition
    doc.setFontSize(10);
    doc.setTextColor(51, 65, 85);
    const defLines = doc.splitTextToSize(`Định nghĩa: ${topic.definition}`, maxLineWidth);
    doc.text(defLines, margin, y);
    y += defLines.length * 4.5 + 4;

    // Red flags section
    if (topic.redFlags.length > 0) {
      checkPageBreak(30);
      doc.setFillColor(254, 242, 242);
      doc.setDrawColor(239, 68, 68);
      doc.roundedRect(margin, y, maxLineWidth, 14 + topic.redFlags.length * 5, 2, 2, 'FD');

      doc.setFontSize(11);
      doc.setTextColor(220, 38, 38);
      doc.text('DẤU HIỆU CẢNH BÁO ĐỎ (RED FLAGS - ĐE DỌA TÍNH MẠNG)', margin + 4, y + 6);
      y += 10;

      doc.setFontSize(8.5);
      doc.setTextColor(153, 27, 27);
      topic.redFlags.forEach((flag) => {
        const fLines = doc.splitTextToSize(`! ${flag}`, maxLineWidth - 8);
        doc.text(fLines, margin + 4, y);
        y += fLines.length * 4;
      });
      y += 6;
    }

    // Key Questions
    checkPageBreak(35);
    doc.setFontSize(12);
    doc.setTextColor(15, 76, 129);
    doc.text('CÂU HỎI BỆNH SỬ TRỌNG TÂM (SOCRATES / OPQRST)', margin, y);
    y += 6;

    topic.keyHistoryQuestions.forEach((q) => {
      checkPageBreak(20);
      doc.setFontSize(9.5);
      doc.setTextColor(30, 41, 59);
      doc.text(`• ${q.dimension}: "${q.question}"`, margin + 2, y);
      y += 4.5;

      doc.setFontSize(8.5);
      doc.setTextColor(71, 85, 105);
      const mLines = doc.splitTextToSize(`-> Ý nghĩa: ${q.clinicalMeaning}`, maxLineWidth - 6);
      doc.text(mLines, margin + 6, y);
      y += mLines.length * 4 + 2;
    });

    // Differential Diagnosis
    checkPageBreak(35);
    y += 2;
    doc.setFontSize(12);
    doc.setTextColor(15, 76, 129);
    doc.text('CHẨN ĐOÁN PHÂN BIỆT & ƯU TIÊN LOẠI TRỪ', margin, y);
    y += 6;

    topic.differentialDiagnosis.forEach((cat) => {
      checkPageBreak(25);
      doc.setFontSize(10);
      doc.setTextColor(2, 132, 199);
      doc.text(`[${cat.category}]`, margin + 2, y);
      y += 5;

      cat.diseases.forEach((dis) => {
        checkPageBreak(20);
        doc.setFontSize(9);
        doc.setTextColor(15, 23, 42);
        doc.text(`- ${dis.name} (${dis.priority === 'cannot-miss' ? 'KHÔNG ĐƯỢC BỎ SÓT' : 'THƯỜNG GẶP'}):`, margin + 4, y);
        y += 4;

        doc.setFontSize(8.5);
        doc.setTextColor(71, 85, 105);
        const featLines = doc.splitTextToSize(`Đặc điểm nhận biết: ${dis.distinguishingFeatures}`, maxLineWidth - 8);
        doc.text(featLines, margin + 6, y);
        y += featLines.length * 3.8 + 1;

        doc.setTextColor(16, 149, 193);
        const testLines = doc.splitTextToSize(`Cận lâm sàng ban đầu: ${dis.initialInvestigation}`, maxLineWidth - 8);
        doc.text(testLines, margin + 6, y);
        y += testLines.length * 3.8 + 2.5;
      });
      y += 2;
    });

    // Resident Pearls
    if (topic.residentClinicalPearls.length > 0) {
      checkPageBreak(30);
      y += 2;
      doc.setFontSize(12);
      doc.setTextColor(180, 83, 9);
      doc.text('KINH NGHIỆM ĐI BUỒNG NỘI TRÚ (WARD ROUNDS PEARLS)', margin, y);
      y += 6;

      doc.setFontSize(8.5);
      doc.setTextColor(51, 65, 85);
      topic.residentClinicalPearls.forEach((pearl) => {
        const pLines = doc.splitTextToSize(`★ ${pearl}`, maxLineWidth - 4);
        checkPageBreak(pLines.length * 4 + 2);
        doc.text(pLines, margin + 2, y);
        y += pLines.length * 4 + 2;
      });
    }

    // Attached notes
    if (notes.length > 0) {
      checkPageBreak(35);
      y += 4;
      doc.setFontSize(12);
      doc.setTextColor(91, 33, 182);
      doc.text('GHI CHÚ LÂM SÀNG CỦA BÁC SĨ (PERSONAL NOTES)', margin, y);
      y += 6;

      notes.forEach((n) => {
        checkPageBreak(25);
        doc.setFontSize(9.5);
        doc.setTextColor(30, 41, 59);
        doc.text(`[${n.createdAt.slice(0, 10)}] ${n.title}`, margin + 2, y);
        y += 4.5;

        doc.setFontSize(8.5);
        doc.setTextColor(71, 85, 105);
        const cLines = doc.splitTextToSize(n.content, maxLineWidth - 6);
        doc.text(cLines, margin + 4, y);
        y += cLines.length * 4 + 3;
      });
    }

    // Footer
    const totalPages = doc.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(148, 163, 184);
      doc.text(
        `CDSS Tiếp Cận Lâm Sàng & Khám Bệnh - Trang ${i}/${totalPages}`,
        pageWidth / 2,
        290,
        { align: 'center' }
      );
    }

    const safeFilename = `${topic.id}-tiep-can-lam-sang.pdf`;
    doc.save(safeFilename);
  }
};
