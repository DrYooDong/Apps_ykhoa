import React, { useState } from 'react';
import { 
  BookMarked, 
  Plus, 
  Search, 
  Tag, 
  Trash2, 
  Edit3, 
  FileText, 
  Calendar,
  ExternalLink,
  FileDown
} from 'lucide-react';
import { PersonalNote } from '../types/clinical';
import { jsPDF } from 'jspdf';

interface PersonalNotesViewProps {
  notes: PersonalNote[];
  onOpenCreateNote: () => void;
  onEditNote: (note: PersonalNote) => void;
  onDeleteNote: (id: string) => void;
  onSelectTopic: (topicId: string, type: 'exam' | 'approach') => void;
}

export const PersonalNotesView: React.FC<PersonalNotesViewProps> = ({
  notes,
  onOpenCreateNote,
  onEditNote,
  onDeleteNote,
  onSelectTopic
}) => {
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Extract all unique tags
  const allTags = Array.from(new Set(notes.flatMap(n => n.tags || [])));

  const filteredNotes = notes.filter(n => {
    const matchesTag = !selectedTag || n.tags?.includes(selectedTag);
    const matchesSearch = 
      !search ||
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.content.toLowerCase().includes(search.toLowerCase()) ||
      n.topicTitle.toLowerCase().includes(search.toLowerCase()) ||
      (n.clinicalCaseExample && n.clinicalCaseExample.toLowerCase().includes(search.toLowerCase()));

    return matchesTag && matchesSearch;
  });

  const handleExportAllNotesPDF = () => {
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

    doc.setFillColor(91, 33, 182);
    doc.rect(0, 0, pageWidth, 22, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.text('TẬP GHI CHÚ LÂM SÀNG CÁ NHÂN HÓA (CLINICAL NOTES LOG)', margin, 10);
    doc.setFontSize(9);
    doc.text('Hệ thống hỗ trợ ra quyết định lâm sàng (CDSS) - Bác sĩ nội trú', margin, 16);

    y = 30;
    doc.setTextColor(30, 41, 59);

    notes.forEach((note, idx) => {
      checkPageBreak(35);
      doc.setFontSize(12);
      doc.setTextColor(15, 76, 129);
      doc.text(`${idx + 1}. ${note.title}`, margin, y);
      y += 5;

      doc.setFontSize(8.5);
      doc.setTextColor(100, 116, 139);
      doc.text(`Chuyên đề: ${note.topicTitle} | Ngày tạo: ${note.createdAt.slice(0, 10)}`, margin + 2, y);
      y += 5;

      if (note.clinicalCaseExample) {
        doc.setFontSize(8.5);
        doc.setTextColor(15, 118, 110);
        doc.text(`Ca bệnh: ${note.clinicalCaseExample}`, margin + 2, y);
        y += 4.5;
      }

      doc.setFontSize(9);
      doc.setTextColor(51, 65, 85);
      const lines = doc.splitTextToSize(note.content, maxLineWidth - 4);
      checkPageBreak(lines.length * 4.5);
      doc.text(lines, margin + 2, y);
      y += lines.length * 4.5 + 6;
    });

    const totalPages = doc.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(148, 163, 184);
      doc.text(`Ghi chú lâm sàng - Trang ${i}/${totalPages}`, pageWidth / 2, 290, { align: 'center' });
    }

    doc.save('Ghi-chu-lam-sang-ca-nhan.pdf');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center space-x-2">
            <BookMarked className="w-6 h-6 text-purple-600" />
            <span>Sổ Tay Ghi Chú Cá Nhân Hóa</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Ghi chép kinh nghiệm lâm sàng, ca bệnh thực tế và lưu trữ an toàn ngay trên trình duyệt của bạn.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          {notes.length > 0 && (
            <button
              onClick={handleExportAllNotesPDF}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 transition-colors shadow-2xs"
            >
              <FileDown className="w-4 h-4 text-purple-600" />
              <span>Xuất toàn bộ ghi chú (PDF)</span>
            </button>
          )}

          <button
            onClick={onOpenCreateNote}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-teal-600 hover:bg-teal-700 text-white transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Tạo ghi chú mới</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Tag filter pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 scrollbar-thin">
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
              selectedTag === null ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Tất cả thẻ ({notes.length})
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                selectedTag === tag ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm kiếm nội dung ghi chú..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-purple-500 shadow-2xs"
          />
        </div>
      </div>

      {/* Notes Grid */}
      {filteredNotes.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-slate-300">
          <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-700">Chưa có ghi chú lâm sàng nào</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 mb-4">
            Bạn có thể tạo ghi chú khi học các chuyên đề Khám Lâm Sàng hoặc Tiếp Cận Triệu Chứng để ghi lại ca bệnh thực tế.
          </p>
          <button
            onClick={onOpenCreateNote}
            className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-teal-600 text-white hover:bg-teal-700 shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Tạo ghi chú đầu tiên</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredNotes.map((note) => (
            <div
              key={note.id}
              className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-purple-300 shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <span 
                      onClick={() => onSelectTopic(note.topicId, note.topicType)}
                      className="text-[11px] font-bold text-teal-700 hover:underline cursor-pointer flex items-center space-x-1"
                    >
                      <span>{note.topicTitle}</span>
                      <ExternalLink className="w-3 h-3" />
                    </span>
                    <h3 className="font-bold text-base text-slate-900 leading-snug">
                      {note.title}
                    </h3>
                  </div>

                  <div className="flex items-center space-x-1 shrink-0">
                    <button
                      onClick={() => onEditNote(note)}
                      className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                      title="Chỉnh sửa ghi chú"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDeleteNote(note.id)}
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Xóa ghi chú"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {note.clinicalCaseExample && (
                  <div className="mt-2 p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs text-slate-600">
                    <strong className="text-slate-800 font-semibold">Tình huống ca bệnh: </strong>
                    {note.clinicalCaseExample}
                  </div>
                )}

                <p className="mt-3 text-xs sm:text-sm text-slate-700 leading-relaxed font-normal whitespace-pre-line">
                  {note.content}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <div className="flex flex-wrap gap-1">
                  {note.tags?.map((t, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-purple-50 text-purple-700 text-[10px] font-medium border border-purple-100">
                      #{t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center space-x-1 text-[11px] shrink-0">
                  <Calendar className="w-3 h-3 text-slate-400" />
                  <span>{note.createdAt.slice(0, 10)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
