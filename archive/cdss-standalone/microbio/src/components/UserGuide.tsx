import React, { useState } from 'react';
import { Language } from '../types';
import { MAHON_CHAPTERS } from '../data/mahonChapters';
import { BookOpen, Compass, Search, ArrowLeftRight, Skull, FileText, CheckCircle2, ChevronRight, HelpCircle, GraduationCap, Lightbulb, AlertTriangle } from 'lucide-react';

interface UserGuideProps {
  language: Language;
  onSelectPathogen?: (pathogenId: string) => void;
}

export const UserGuide: React.FC<UserGuideProps> = ({ language, onSelectPathogen }) => {
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [selectedMahonChapterNum, setSelectedMahonChapterNum] = useState<number>(14);

  const selectedMahonChapter = MAHON_CHAPTERS.find(ch => ch.chapterNumber === selectedMahonChapterNum) || MAHON_CHAPTERS[0];

  const sections = [
    {
      id: 'overview',
      icon: Compass,
      title: {
        vi: '1. Tổng quan & Cơ sở học thuật',
        en: '1. Overview & Academic Foundation'
      }
    },
    {
      id: 'flowcharts',
      icon: BookOpen,
      title: {
        vi: '2. Lưu đồ tiếp cận chẩn đoán',
        en: '2. Diagnostic Flowcharts'
      }
    },
    {
      id: 'lookup',
      icon: Search,
      title: {
        vi: '3. Tra cứu nhanh & Bộ lọc phân loại',
        en: '3. Rapid Lookup & Filters'
      }
    },
    {
      id: 'morphology',
      icon: ArrowLeftRight,
      title: {
        vi: '4. So sánh hình thái 2D vi thể & đĩa thạch',
        en: '4. 2D Morphology & Media Studio'
      }
    },
    {
      id: 'ast',
      icon: Skull,
      title: {
        vi: '5. Độc tính & Kháng sinh đồ CLSI M100',
        en: '5. Toxicity & CLSI Antibiogram'
      }
    },
    {
      id: 'report',
      icon: FileText,
      title: {
        vi: '6. Xuất báo cáo PDF chuẩn y khoa',
        en: '6. PDF Medical Report Export'
      }
    },
    {
      id: 'glossary',
      icon: GraduationCap,
      title: {
        vi: '7. Bảng thuật ngữ vi sinh y khoa',
        en: '7. Medical Terminology & Acronyms'
      }
    },
    {
      id: 'mahon_guide',
      icon: BookOpen,
      title: {
        vi: '8. Cẩm nang 13 Chương Mahon (Ch. 14 - 26)',
        en: '8. Mahon 13 Chapters Reference (Ch. 14 - 26)'
      }
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <div className="flex items-center gap-2 text-indigo-600 font-semibold text-sm uppercase tracking-wider">
          <HelpCircle className="w-4 h-4" />
          {language === 'vi' ? 'Tài liệu hướng dẫn sử dụng' : 'User Manual & Clinical Guidelines'}
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mt-1">
          {language === 'vi'
            ? 'Hướng Dẫn Vận Hành & Khai Thác Hệ Thống Vi Sinh Chẩn Đoán'
            : 'Clinical Diagnostic Microbiology User Guide'}
        </h2>
        <p className="text-slate-600 text-sm mt-1">
          {language === 'vi'
            ? 'Cẩm nang toàn diện hỗ trợ bác sĩ vi sinh, kỹ thuật viên phòng xét nghiệm và sinh viên y khoa khai thác tối đa dữ liệu từ giáo trình Mahon: Textbook of Diagnostic Microbiology (6th Edition).'
            : 'Comprehensive manual designed for clinical microbiologists, laboratory medical technologists, and medical students referencing Mahon & Lehman 6th Edition.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Navigation Sidebar (4 cols) */}
        <div className="lg:col-span-4 space-y-2">
          <div className="bg-white rounded-2xl p-3 shadow-sm border border-slate-200 space-y-1">
            {sections.map(s => {
              const Icon = s.icon;
              const isActive = activeSection === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveSection(s.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-left text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{s.title[language]}</span>
                  </div>
                  <ChevronRight className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Panel (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-6 shadow-sm border border-slate-200 text-slate-700 text-sm space-y-5 leading-relaxed">
          {activeSection === 'overview' && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-2">
                {language === 'vi' ? '1. Tổng quan & Cơ sở học thuật' : '1. Overview & Academic Foundation'}
              </h3>
              <p>
                {language === 'vi'
                  ? 'Hệ thống Phân Tích Chẩn Đoán Vi Sinh Lâm Sàng được thiết kế dựa trên tiêu chuẩn vàng của tài liệu y khoa quốc tế: Connie R. Mahon & Donald C. Lehman, "Textbook of Diagnostic Microbiology" (6th Edition, Saunders/Elsevier).'
                  : 'The Clinical Diagnostic Microbiology System is designed strictly following the international gold-standard reference: Connie R. Mahon & Donald C. Lehman, "Textbook of Diagnostic Microbiology" (6th Edition, Saunders/Elsevier).'}
              </p>
              <div className="p-4 bg-indigo-50/50 rounded-xl border border-indigo-100 space-y-2 text-xs">
                <div className="font-bold text-indigo-900 text-sm">
                  {language === 'vi' ? 'Các nguyên lý cốt lõi được số hóa:' : 'Core Principles Digitized in This App:'}
                </div>
                <ul className="list-disc pl-5 space-y-1 text-slate-700">
                  <li><strong>Quy trình tiếp cận logic:</strong> Bắt đầu từ nhuộm Gram trực tiếp bệnh phẩm → Quan sát hình thái khuẩn lạc trên môi trường sơ bộ (SBA, CHOC, MAC) → Thử nghiệm sinh hóa quyết định → Khẳng định loài.</li>
                  <li><strong>Tiêu chuẩn an toàn sinh học (Biosafety Levels 1-3):</strong> Cảnh báo nguy cơ lây nhiễm qua đường hô hấp hoặc bào tử đối với các tác nhân BSL-3 (B. anthracis, M. tuberculosis).</li>
                  <li><strong>Quản lý sử dụng kháng sinh (Antimicrobial Stewardship):</strong> Ứng dụng quy chuẩn CLSI M100 về phân tầng báo cáo chọn lọc (Group A, B, C, U).</li>
                </ul>
              </div>
            </div>
          )}

          {activeSection === 'flowcharts' && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-2">
                {language === 'vi' ? '2. Hướng dẫn sử dụng Lưu đồ chẩn đoán' : '2. How to Use Diagnostic Flowcharts'}
              </h3>
              <p>
                {language === 'vi'
                  ? 'Mô đun Lưu đồ cung cấp cây quyết định phân nhánh từng bước cho 4 nhóm vi khuẩn lâm sàng lớn nhất:'
                  : 'The Flowchart module provides interactive step-by-step decision trees for four major pathogen groups:'}
              </p>
              <ol className="list-decimal pl-5 space-y-2 text-xs">
                <li>
                  <strong>Cầu khuẩn Gram dương (GPC):</strong> Bắt đầu bằng phản ứng <strong>Catalase</strong> (phân biệt Staphylococci/Micrococci với Streptococci/Enterococci). Nếu Catalase (+), tiếp tục với thử nghiệm <strong>Coagulase</strong> (nhận diện S. aureus). Nếu Catalase (-), đánh giá kiểu tan máu (Alpha, Beta, Gamma) và thử nghiệm Optochin, Bacitracin, PYR.
                </li>
                <li>
                  <strong>Trực khuẩn Gram âm (GNB):</strong> Bắt đầu bằng phản ứng <strong>Oxidase</strong> và khả năng lên men Lactose trên thạch MacConkey. Phân biệt Enterobacteriaceae (Oxidase -) với Non-fermenters như <i>Pseudomonas aeruginosa</i> (Oxidase +).
                </li>
                <li>
                  <strong>Trực khuẩn Gram dương sinh bào tử:</strong> Phân biệt <i>Bacillus</i> (hiếu khí, Catalase +) với <i>Clostridium</i> (kỵ khí bắt buộc, Catalase -).
                </li>
                <li>
                  <strong>Tác nhân vi nấm & Khó mọc:</strong> Hướng dẫn định danh <i>Neisseria</i> (song cầu Gram âm hạt cà phê), <i>Haemophilus</i> (yêu cầu yếu tố X và V trên thạch sô cô la), và <i>Cryptococcus neoformans</i> (nhuộm mực tàu).
                </li>
              </ol>
            </div>
          )}

          {activeSection === 'lookup' && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-2">
                {language === 'vi' ? '3. Tra cứu nhanh & Bộ lọc phân loại học' : '3. Rapid Lookup & Advanced Taxonomic Filters'}
              </h3>
              <p>
                {language === 'vi'
                  ? 'Thanh tìm kiếm hỗ trợ nhập tên khoa học Latin, tên tiếng Việt, họ vi khuẩn, tên kháng sinh hoặc tên độc tố. Ví dụ gõ: "MRSA", "LPS", "Shiga", "Enterobacteriaceae".'
                  : 'The search engine supports searching by scientific Latin name, common name, bacterial family, antibiotic, or toxin. Try typing: "MRSA", "LPS", "Shiga", "Enterobacteriaceae".'}
              </p>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
                <span className="font-bold text-slate-800">Bộ lọc phân loại chuyên sâu cho phép lọc đồng thời:</span>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Phân loại Gram:</strong> Gram dương, Gram âm, Kháng toan (Acid-fast), Khác / Nấm men.</li>
                  <li><strong>Hình thái học vi thể:</strong> Cầu khuẩn, Song cầu, Trực khuẩn, Trực cầu khuẩn, Sợi phân nhánh, Nấm men.</li>
                  <li><strong>Khí trường / Oxy:</strong> Hiếu khí bắt buộc, Kỵ khí tùy nghi, Kỵ khí bắt buộc, Ưa CO2 (Capnophile).</li>
                  <li><strong>Tính chất sinh hóa cơ bản:</strong> Catalase (+/-), Oxidase (+/-), Lên men Lactose (+/-).</li>
                </ul>
              </div>
            </div>
          )}

          {activeSection === 'morphology' && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-2">
                {language === 'vi' ? '4. So sánh hình thái học 2D vi thể & Đĩa thạch' : '4. 2D Microscopic & Colony Studio'}
              </h3>
              <p>
                {language === 'vi'
                  ? 'Mô đun này hiển thị hình ảnh minh họa vector 2D mô phỏng độ phóng đại ×1000 vật kính dầu, tái hiện chân thực các đặc trưng được mô tả trong giáo trình Mahon:'
                  : 'This module renders 2D vector microscopic illustrations simulating ×1000 oil immersion microscopy as detailed in Mahon:'}
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs">
                <li><strong>S. aureus:</strong> Cầu khuẩn Gram dương đậm màu tím sắp xếp dạng chùm nho đặc trưng.</li>
                <li><strong>S. pneumoniae:</strong> Song cầu Gram dương hình ngọn nến (lancet-shaped) có quầng sáng nang bao quanh.</li>
                <li><strong>N. gonorrhoeae:</strong> Song cầu Gram âm màu hồng đỏ hình hạt cà phê nằm bên trong bạch cầu đa nhân trung tính (PMN).</li>
                <li><strong>M. tuberculosis:</strong> Trực khuẩn mảnh bắt màu đỏ carbolfuchsin xếp thành dạng dây thừng uốn lượn (cords) trên nền xanh methylene.</li>
                <li><strong>C. neoformans:</strong> Nhuộm mực tàu (India ink) với quầng nang polysaccharide trong suốt khổng lồ đẩy lùi các hạt mực đen.</li>
              </ul>
            </div>
          )}

          {activeSection === 'ast' && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-2">
                {language === 'vi' ? '5. Độc tính & Hướng dẫn Kháng sinh đồ CLSI' : '5. Toxicity & CLSI Antibiogram Protocol'}
              </h3>
              <p>
                {language === 'vi'
                  ? 'Hiểu rõ sự khác biệt giữa Ngoại độc tố (Exotoxin) và Nội độc tố (Endotoxin) là điều cốt yếu trong sinh lý bệnh vi sinh:'
                  : 'Distinguishing between Exotoxins and Endotoxins is essential for understanding microbial pathogenesis:'}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-rose-50 rounded-xl border border-rose-200">
                  <span className="font-bold text-rose-800 block mb-1">Ngoại độc tố (Exotoxin):</span>
                  <span>Tiết ra ngoài tế bào bởi cả vi khuẩn Gram (+) và (-); bản chất là protein polypeptide; không bền với nhiệt (mất hoạt tính ở 60-80°C); độc tính cực cao (gây uốn ván, ngộ độc thịt, bạch hầu); chuyển thành giải độc tố (toxoid) để sản xuất vắc xin.</span>
                </div>
                <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-200">
                  <span className="font-bold text-indigo-800 block mb-1">Nội độc tố (Endotoxin):</span>
                  <span>Nằm trên màng ngoài của vi khuẩn Gram âm (thành phần Lipid A của lipopolysaccharide - LPS); chỉ giải phóng khi tế bào vi khuẩn bị ly giải; bền vững với nhiệt độ (chịu được 100°C trong 1 giờ); gây sốt, giãn mạch, sốc nhiễm trùng và đông máu nội mạch rải rác (DIC).</span>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'report' && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-2">
                {language === 'vi' ? '6. Xuất báo cáo chẩn đoán PDF' : '6. Medical PDF Report Generation'}
              </h3>
              <p>
                {language === 'vi'
                  ? 'Mô đun xuất báo cáo sử dụng thư viện jsPDF để tạo ngay lập tức một phiếu kết quả vi sinh lâm sàng định dạng A4 chính quy, sẵn sàng để in hoặc lưu trữ bệnh án điện tử (EMR):'
                  : 'The report module uses jsPDF to immediately compile an official A4 clinical microbiology report ready for printing or electronic medical record (EMR) archiving:'}
              </p>
              <ul className="list-disc pl-5 space-y-1 text-xs">
                <li>Tự động nạp thông tin ca bệnh mẫu (Nhiễm trùng huyết do MRSA, Viêm đài bể thận do E. coli ESBL, Viêm màng não do S. pneumoniae).</li>
                <li>Bảng kết quả kháng sinh đồ có mã màu rõ ràng: <strong>Nhạy cảm (S - Xanh lá)</strong>, <strong>Kháng thuốc (R - Đỏ)</strong>, <strong>Trung gian (I - Vàng)</strong>.</li>
                <li>Mục ghi chú cảnh báo của chuyên gia vi sinh và chữ ký xác nhận kiểm soát chất lượng (QC).</li>
              </ul>
            </div>
          )}

          {activeSection === 'glossary' && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-2">
                {language === 'vi' ? '7. Bảng viết tắt & Thuật ngữ thường gặp' : '7. Medical Terminology & Acronyms'}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                  <strong>SBA:</strong> Sheep Blood Agar (Thạch máu cừu 5%)
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                  <strong>MAC:</strong> MacConkey Agar (Thạch chọn lọc phân biệt GNB)
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                  <strong>CHOC:</strong> Chocolate Agar (Thạch máu đun nóng cung cấp X & V)
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                  <strong>BSL:</strong> Biosafety Level (Cấp độ an toàn sinh học phòng xét nghiệm)
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                  <strong>AST:</strong> Antimicrobial Susceptibility Testing (Thử nghiệm tính nhạy cảm kháng sinh)
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                  <strong>MIC:</strong> Minimum Inhibitory Concentration (Nồng độ ức chế tối thiểu)
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                  <strong>MRSA:</strong> Methicillin-Resistant Staphylococcus aureus
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                  <strong>ESBL:</strong> Extended-Spectrum Beta-Lactamase
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                  <strong>VRE:</strong> Vancomycin-Resistant Enterococcus
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                  <strong>CRE:</strong> Carbapenem-Resistant Enterobacteriaceae
                </div>
              </div>
            </div>
          )}

          {activeSection === 'mahon_guide' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-emerald-600" />
                  <span>{language === 'vi' ? '8. Cẩm nang 13 Chương Vi sinh Lâm sàng Mahon (6th Ed.)' : '8. Mahon 13 Clinical Microbiology Chapters (6th Ed.)'}</span>
                </h3>
                <p className="text-xs text-slate-600 mt-2">
                  {language === 'vi'
                    ? 'Hệ thống đã tích hợp sâu toàn bộ 13 chương trọng tâm từ giáo trình chuẩn quốc tế Textbook of Diagnostic Microbiology (Mahon & Lehman, 6th Edition). Chọn từng chương để xem đề cương, thuật ngữ chuyên ngành và các tác nhân tương ứng:'
                    : 'The platform deeply integrates all 13 core clinical chapters from the international gold-standard Textbook of Diagnostic Microbiology (Mahon & Lehman, 6th Ed.). Select any chapter below to explore outlines, key terminology, and associated pathogens:'}
                </p>
              </div>

              {/* Chapter Selector Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2">
                {MAHON_CHAPTERS.map(ch => (
                  <button
                    key={ch.chapterNumber}
                    onClick={() => setSelectedMahonChapterNum(ch.chapterNumber)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      selectedMahonChapterNum === ch.chapterNumber
                        ? 'border-emerald-600 bg-emerald-50 shadow-xs'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="text-[10px] font-extrabold text-emerald-700">Ch. {ch.chapterNumber}</div>
                    <div className="text-xs font-semibold text-slate-800 line-clamp-1 mt-0.5">
                      {ch.title[language]}
                    </div>
                  </button>
                ))}
              </div>

              {/* Selected Chapter Details */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/70 pb-3">
                  <div>
                    <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                      {language === 'vi' ? `Chương ${selectedMahonChapter.chapterNumber}` : `Chapter ${selectedMahonChapter.chapterNumber}`}
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 mt-0.5">
                      {selectedMahonChapter.title[language]}
                    </h4>
                    {selectedMahonChapter.authors && (
                      <p className="text-xs text-slate-500">
                        {language === 'vi' ? 'Tác giả:' : 'Authors:'} {selectedMahonChapter.authors}
                      </p>
                    )}
                  </div>
                </div>

                {/* Chapter Outline */}
                {selectedMahonChapter.outline && selectedMahonChapter.outline[language]?.length > 0 && (
                  <div className="space-y-1.5">
                    <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      {language === 'vi' ? 'Đề cương nội dung (Chapter Outline):' : 'Chapter Outline:'}
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
                      {selectedMahonChapter.outline[language].map((item, idx) => (
                        <div key={idx} className="text-xs text-slate-700 bg-white p-2 rounded-lg border border-slate-200/80 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Key Terms Glossary */}
                {selectedMahonChapter.keyTerms && selectedMahonChapter.keyTerms.length > 0 && (
                  <div className="space-y-1.5 pt-2">
                    <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      {language === 'vi' ? 'Thuật ngữ & Dấu ấn then chốt (Key Terms):' : 'Key Terminology:'}
                    </h5>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedMahonChapter.keyTerms.map((term, kIdx) => (
                        <span key={kIdx} className="bg-white px-2.5 py-1 rounded-lg border border-slate-200 text-xs font-medium text-emerald-800 shadow-2xs">
                          {typeof term === 'string' ? term : term.term}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Points to remember */}
                {selectedMahonChapter.pointsToRemember && selectedMahonChapter.pointsToRemember[language].length > 0 && (
                  <div className="space-y-1.5 pt-2">
                    <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Lightbulb className="w-4 h-4 text-amber-600" />
                      <span>{language === 'vi' ? 'Điểm cốt lõi cần nhớ (Points to Remember):' : 'Points to Remember:'}</span>
                    </h5>
                    <div className="space-y-1.5">
                      {selectedMahonChapter.pointsToRemember[language].map((pt, pIdx) => (
                        <div key={pIdx} className="bg-amber-50/70 p-2.5 rounded-xl border border-amber-200/70 text-xs text-amber-950 flex items-start gap-2">
                          <span className="w-4 h-4 rounded-full bg-amber-200 text-amber-800 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                            {pIdx + 1}
                          </span>
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Related Pathogens in this Chapter */}
                {selectedMahonChapter.relatedPathogens && selectedMahonChapter.relatedPathogens.length > 0 && (
                  <div className="space-y-1.5 pt-2">
                    <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      {language === 'vi' ? 'Các tác nhân tương ứng trong hệ thống (Tra cứu ngay):' : 'Associated Pathogens in Database:'}
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {selectedMahonChapter.relatedPathogens.map(pId => {
                        return (
                          <button
                            key={pId}
                            onClick={() => onSelectPathogen && onSelectPathogen(pId)}
                            className="text-xs font-medium px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border border-emerald-300 transition-colors flex items-center gap-1.5"
                          >
                            <span>{pId.replace(/_/g, ' ')}</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
