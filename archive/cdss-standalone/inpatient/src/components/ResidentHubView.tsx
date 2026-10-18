import React, { useState } from 'react';
import { 
  GraduationCap, 
  Bookmark, 
  CheckCircle2, 
  Award, 
  Sparkles, 
  BookOpen, 
  Search, 
  ArrowRight, 
  Trash2, 
  FileText,
  HelpCircle,
  Lightbulb,
  FileDown
} from 'lucide-react';
import { ResidentBookmark, PersonalNote } from '../types/clinical';
import { EXAMINATION_MODULES } from '../data/examinationData';
import { APPROACH_TOPICS } from '../data/approachData';
import { storageService } from '../services/storageService';
import { jsPDF } from 'jspdf';

interface ResidentHubViewProps {
  bookmarks: ResidentBookmark[];
  notes: PersonalNote[];
  onSelectExam: (id: string) => void;
  onSelectApproach: (id: string) => void;
  onToggleMastery: (id: string) => void;
  onRemoveBookmark: (id: string) => void;
  onOpenNotes: (topicId: string, topicTitle: string) => void;
}

export const ResidentHubView: React.FC<ResidentHubViewProps> = ({
  bookmarks,
  notes,
  onSelectExam,
  onSelectApproach,
  onToggleMastery,
  onRemoveBookmark,
  onOpenNotes
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'bookmarks' | 'signs' | 'pearls'>('bookmarks');
  const [signSearch, setSignSearch] = useState('');
  const [filterMastery, setFilterMastery] = useState<'all' | 'mastered' | 'unmastered'>('all');

  // Collect all eponymous signs from all modules
  const allSigns = EXAMINATION_MODULES.flatMap(m => 
    m.specialSigns.map(s => ({
      ...s,
      systemTitle: m.title,
      examId: m.id
    }))
  );

  const filteredSigns = allSigns.filter(s => 
    !signSearch ||
    s.name.toLowerCase().includes(signSearch.toLowerCase()) ||
    s.description.toLowerCase().includes(signSearch.toLowerCase()) ||
    s.indicates.toLowerCase().includes(signSearch.toLowerCase()) ||
    s.clinicalPearl.toLowerCase().includes(signSearch.toLowerCase())
  );

  // Collect all resident pearls from all topics and exams
  const allPearls: { topic: string; pearl: string; type: 'exam' | 'approach'; id: string }[] = [];
  EXAMINATION_MODULES.forEach(m => {
    m.highYieldPoints.forEach(p => allPearls.push({ topic: m.title, pearl: p, type: 'exam', id: m.id }));
  });
  APPROACH_TOPICS.forEach(a => {
    a.residentClinicalPearls.forEach(p => allPearls.push({ topic: a.title, pearl: p, type: 'approach', id: a.id }));
  });

  const filteredBookmarks = bookmarks.filter(b => {
    if (filterMastery === 'mastered') return b.isMastered;
    if (filterMastery === 'unmastered') return !b.isMastered;
    return true;
  });

  const masteredCount = bookmarks.filter(b => b.isMastered).length;
  const progressPercent = bookmarks.length > 0 ? Math.round((masteredCount / bookmarks.length) * 100) : 0;

  // Export Resident Bookmarks and Notes Summary to PDF
  const handleExportResidentSummaryPDF = () => {
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 15;
    const maxLineWidth = pageWidth - margin * 2;
    let y = 18;

    const checkPageBreak = (needed: number) => {
      if (y + needed > 280) {
        doc.addPage();
        y = 15;
      }
    };

    doc.setFillColor(15, 76, 129);
    doc.rect(0, 0, pageWidth, 22, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.text('SỔ TAY ÔN TẬP BÁC SĨ NỘI TRÚ (RESIDENT CLINICAL LOG)', margin, 10);
    doc.setFontSize(9);
    doc.text('Tổng hợp các mục tiêu trọng tâm đã đánh dấu & Ghi chú cá nhân', margin, 16);

    y = 30;
    doc.setTextColor(30, 41, 59);

    doc.setFontSize(14);
    doc.text('1. DANH MỤC MỤC TIÊU TRỌNG TÂM ĐÃ ĐÁNH DẤU', margin, y);
    y += 7;

    doc.setFontSize(9);
    doc.setTextColor(71, 85, 105);
    doc.text(`Tiến độ làm chủ: ${masteredCount}/${bookmarks.length} (${progressPercent}%)`, margin, y);
    y += 6;

    bookmarks.forEach((b, idx) => {
      checkPageBreak(15);
      doc.setFontSize(9.5);
      doc.setTextColor(30, 41, 59);
      const status = b.isMastered ? '[ĐÃ LÀM CHỦ]' : '[CẦN ÔN LẠI]';
      doc.text(`${idx + 1}. ${status} - ${b.title} (${b.system})`, margin + 2, y);
      y += 5;
    });

    y += 5;
    checkPageBreak(30);
    doc.setFontSize(14);
    doc.setTextColor(15, 76, 129);
    doc.text('2. TỔNG HỢP GHI CHÚ LÂM SÀNG CÁ NHÂN HÓA', margin, y);
    y += 7;

    notes.forEach((n, idx) => {
      checkPageBreak(25);
      doc.setFontSize(10);
      doc.setTextColor(30, 41, 59);
      doc.text(`${idx + 1}. [${n.topicTitle}] ${n.title}`, margin + 2, y);
      y += 4.5;

      doc.setFontSize(8.5);
      doc.setTextColor(71, 85, 105);
      const lines = doc.splitTextToSize(n.content, maxLineWidth - 6);
      doc.text(lines, margin + 4, y);
      y += lines.length * 4 + 2;

      if (n.clinicalCaseExample) {
        doc.setTextColor(15, 118, 110);
        doc.text(`Tình huống: ${n.clinicalCaseExample}`, margin + 4, y);
        y += 4.5;
      }
      y += 2;
    });

    const totalPages = doc.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(148, 163, 184);
      doc.text(`Sổ tay Bác sĩ nội trú - Trang ${i}/${totalPages}`, pageWidth / 2, 290, { align: 'center' });
    }

    doc.save('So-tay-on-tap-bac-si-noi-tru.pdf');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Hero Welcome for Residents */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-teal-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-500/20 text-teal-300 border border-teal-500/30">
                Hub Ôn Luyện & Thực Hành Lâm Sàng
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Trung Tâm Học Tập Bác Sĩ Nội Trú
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Hệ thống hóa toàn diện các kỹ năng khám lâm sàng, bẫy chẩn đoán, dấu hiệu đặc biệt và bài học đi buồng từ tài liệu Bates và Macleod.
            </p>
          </div>

          {/* Quick Stats & PDF export */}
          <div className="flex items-center gap-4 bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80 shrink-0">
            <div>
              <div className="text-xs text-slate-400 font-medium">Mục tiêu ghi nhớ</div>
              <div className="text-2xl font-black text-amber-400">
                {masteredCount} <span className="text-sm font-normal text-slate-400">/ {bookmarks.length}</span>
              </div>
              <div className="text-[11px] text-teal-400 font-semibold">{progressPercent}% làm chủ</div>
            </div>

            <div className="h-10 w-px bg-slate-700" />

            <button
              onClick={handleExportResidentSummaryPDF}
              className="flex items-center space-x-1.5 px-3.5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold text-xs transition-colors shadow-sm"
              title="Xuất sổ tay ôn tập cá nhân sang PDF"
            >
              <FileDown className="w-4 h-4" />
              <span>Xuất Sổ Tay PDF</span>
            </button>
          </div>
        </div>

        {/* Sub-tabs inside Resident Hub */}
        <div className="flex items-center space-x-2 mt-6 pt-4 border-t border-slate-800">
          <button
            onClick={() => setActiveSubTab('bookmarks')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'bookmarks'
                ? 'bg-white text-slate-950 shadow-sm'
                : 'bg-slate-800/60 text-slate-400 hover:text-white'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5 text-amber-400" />
            <span>Mục Tiêu Đã Đánh Dấu ({bookmarks.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('signs')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'signs'
                ? 'bg-white text-slate-950 shadow-sm'
                : 'bg-slate-800/60 text-slate-400 hover:text-white'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-indigo-400" />
            <span>Từ Điển Dấu Hiệu Đặc Biệt ({allSigns.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('pearls')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'pearls'
                ? 'bg-white text-slate-950 shadow-sm'
                : 'bg-slate-800/60 text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
            <span>Ngọc Lâm Sàng Đi Buồng ({allPearls.length})</span>
          </button>
        </div>
      </div>

      {/* Subtab 1: Bookmarked Items & Mastery Tracker */}
      {activeSubTab === 'bookmarks' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Các Mục Tiêu Cần Ghi Nhớ Đã Đánh Dấu
              </h2>
              <p className="text-xs text-slate-500">
                Đánh dấu các chủ đề trọng tâm để ôn thi tốt nghiệp, giao ban và thực hành tại giường bệnh.
              </p>
            </div>

            {/* Filter */}
            <div className="flex items-center space-x-2 text-xs">
              <span className="font-semibold text-slate-400">Trạng thái:</span>
              <button
                onClick={() => setFilterMastery('all')}
                className={`px-2.5 py-1 rounded-lg font-medium ${
                  filterMastery === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                Tất cả ({bookmarks.length})
              </button>
              <button
                onClick={() => setFilterMastery('unmastered')}
                className={`px-2.5 py-1 rounded-lg font-medium ${
                  filterMastery === 'unmastered' ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                Cần ôn lại ({bookmarks.length - masteredCount})
              </button>
              <button
                onClick={() => setFilterMastery('mastered')}
                className={`px-2.5 py-1 rounded-lg font-medium ${
                  filterMastery === 'mastered' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                Đã làm chủ ({masteredCount})
              </button>
            </div>
          </div>

          {filteredBookmarks.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center border border-dashed border-slate-300">
              <Bookmark className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-700">Chưa có mục tiêu nào được đánh dấu ở mục này</p>
              <p className="text-xs text-slate-500 mt-1">
                Khi học tại phần "Các Bước Khám" hoặc "Tiếp Cận Triệu Chứng", hãy nhấn vào biểu tượng Bookmark để đưa vào danh sách trọng tâm cần nhớ.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredBookmarks.map((b) => (
                <div
                  key={b.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    b.isMastered 
                      ? 'bg-emerald-50/50 border-emerald-200' 
                      : 'bg-white border-slate-200 shadow-2xs'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onToggleMastery(b.id)}
                        className={`p-1 rounded-md transition-colors ${
                          b.isMastered ? 'text-emerald-600 bg-emerald-100' : 'text-slate-300 hover:text-slate-400'
                        }`}
                        title={b.isMastered ? 'Đã làm chủ - Bấm để chuyển thành Cần ôn tập' : 'Chưa làm chủ - Bấm khi đã nắm vững'}
                      >
                        <CheckCircle2 className={`w-5 h-5 ${b.isMastered ? 'fill-emerald-600 text-white' : ''}`} />
                      </button>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                          {b.type === 'exam' ? 'Quy trình khám' : 'Lưu đồ tiếp cận'} • {b.system}
                        </span>
                        <h4 className={`font-bold text-sm ${b.isMastered ? 'text-emerald-950 line-through' : 'text-slate-900'}`}>
                          {b.title}
                        </h4>
                      </div>
                    </div>

                    <button
                      onClick={() => onRemoveBookmark(b.id)}
                      className="p-1 rounded-md text-slate-300 hover:text-red-500 hover:bg-red-50 transition-colors"
                      title="Bỏ khỏi danh sách đánh dấu"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <button
                      onClick={() => onOpenNotes(b.id, b.title)}
                      className="text-purple-700 hover:text-purple-800 font-semibold flex items-center space-x-1"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Ghi chú của tôi ({storageService.getNotesByTopic(b.id).length})</span>
                    </button>

                    <button
                      onClick={() => {
                        if (b.type === 'exam') onSelectExam(b.id);
                        else onSelectApproach(b.id);
                      }}
                      className="text-teal-700 hover:text-teal-800 font-bold flex items-center space-x-1"
                    >
                      <span>Mở chuyên đề</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Subtab 2: Eponymous Signs Glossary */}
      {activeSubTab === 'signs' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Từ Điển Các Dấu Hiệu Lâm Sàng Kinh Điển (Eponymous Signs)
              </h2>
              <p className="text-xs text-slate-500">
                Tổng hợp cách khám, giải phẫu bệnh và giá trị chẩn đoán của các dấu hiệu mang tên tác giả trong Bates và Macleod.
              </p>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Tìm dấu hiệu (Murphy, Babinski...)..."
                value={signSearch}
                onChange={(e) => setSignSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-teal-500 shadow-2xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredSigns.map((sign, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-2.5">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-base text-slate-900">{sign.name}</h4>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-bold border border-indigo-200">
                    {sign.systemTitle}
                  </span>
                </div>

                <div className="text-xs text-slate-700 leading-relaxed">
                  <strong className="text-slate-900">Cách khám:</strong> {sign.description}
                </div>

                <div className="text-xs text-teal-800">
                  <strong className="text-slate-900">Ý nghĩa bệnh lý:</strong> {sign.indicates}
                </div>

                <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900">
                  <strong className="font-bold">Kinh nghiệm nội trú:</strong> {sign.clinicalPearl}
                </div>

                <div className="pt-2 text-right">
                  <button
                    onClick={() => onSelectExam(sign.examId)}
                    className="text-xs text-teal-700 hover:text-teal-800 font-bold inline-flex items-center space-x-1"
                  >
                    <span>Xem trong bài khám</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Subtab 3: Ward Rounds Pearls */}
      {activeSubTab === 'pearls' && (
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Tổng Hợp "Ngọc Lâm Sàng" Đi Buồng (Ward Rounds Pearls)
            </h2>
            <p className="text-xs text-slate-500">
              Những bài học kinh nghiệm, cạm bẫy chẩn đoán thực tế và câu hỏi kinh điển khi đi giao ban lâm sàng.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {allPearls.map((item, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-xl p-4 border border-slate-200 hover:border-amber-300 transition-all flex items-start space-x-3 shadow-2xs"
              >
                <div className="p-2 rounded-lg bg-amber-100 text-amber-800 shrink-0 mt-0.5">
                  <Lightbulb className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-800">{item.topic}</span>
                    <button
                      onClick={() => {
                        if (item.type === 'exam') onSelectExam(item.id);
                        else onSelectApproach(item.id);
                      }}
                      className="text-[11px] font-semibold text-teal-700 hover:underline flex items-center space-x-0.5"
                    >
                      <span>Xem bài</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                    {item.pearl}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
