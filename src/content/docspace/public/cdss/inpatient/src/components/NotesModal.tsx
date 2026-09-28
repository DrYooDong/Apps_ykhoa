import React, { useState, useEffect } from 'react';
import { X, Save, Trash2, Tag, FileText, Check, Plus, BookOpen, Download } from 'lucide-react';
import { PersonalNote } from '../types/clinical';
import { storageService } from '../services/storageService';

interface NotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  topicId: string;
  topicTitle: string;
  topicType: 'exam' | 'approach';
  existingNote?: PersonalNote | null;
  onNoteSaved: () => void;
}

export const NotesModal: React.FC<NotesModalProps> = ({
  isOpen,
  onClose,
  topicId,
  topicTitle,
  topicType,
  existingNote,
  onNoteSaved
}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [clinicalCaseExample, setClinicalCaseExample] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (existingNote) {
      setTitle(existingNote.title);
      setContent(existingNote.content);
      setClinicalCaseExample(existingNote.clinicalCaseExample || '');
      setTags(existingNote.tags || []);
    } else {
      setTitle(`Ghi chú lâm sàng: ${topicTitle}`);
      setContent('');
      setClinicalCaseExample('');
      setTags([topicType === 'exam' ? 'Khám lâm sàng' : 'Tiếp cận chẩn đoán', 'Nội trú']);
    }
  }, [existingNote, topicTitle, topicType, isOpen]);

  if (!isOpen) return null;

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  const handleSave = () => {
    if (!title.trim() || !content.trim()) return;

    storageService.saveNote(
      {
        topicId,
        topicTitle,
        topicType,
        title: title.trim(),
        content: content.trim(),
        tags,
        clinicalCaseExample: clinicalCaseExample.trim() || undefined
      },
      existingNote ? existingNote.id : undefined
    );

    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onNoteSaved();
      onClose();
    }, 600);
  };

  const handleDelete = () => {
    if (existingNote && confirm('Bạn có chắc chắn muốn xóa ghi chú này không?')) {
      storageService.deleteNote(existingNote.id);
      onNoteSaved();
      onClose();
    }
  };

  const suggestedTags = ['Đi buồng', 'Giao ban', 'Cấp cứu', 'Cạm bẫy lâm sàng', 'Thi lâm sàng', 'Học viên SĐH'];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="relative bg-white dark:bg-slate-900 w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-teal-100 dark:bg-teal-950/70 text-teal-700 dark:text-teal-300">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                {existingNote ? 'Chỉnh Sửa Ghi Chú Lâm Sàng' : 'Tạo Ghi Chú Cá Nhân Hóa'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">{topicTitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body content */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {/* Note Title */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
              Tiêu đề ghi chú
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="VD: Kinh nghiệm bắt mạch nảy sụp trong hở van ĐMC..."
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-hidden focus:ring-2 focus:ring-teal-500 text-sm font-semibold"
            />
          </div>

          {/* Clinical Case / Context */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
              Tình huống ca bệnh minh họa (Tùy chọn)
            </label>
            <input
              type="text"
              value={clinicalCaseExample}
              onChange={(e) => setClinicalCaseExample(e.target.value)}
              placeholder="VD: Bệnh nhân nam 54T, Khoa Nội Tim Mạch BV Bạch Mai..."
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-hidden focus:ring-2 focus:ring-teal-500 text-sm"
            />
          </div>

          {/* Note Content */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
              Nội dung kinh nghiệm lâm sàng & Điểm cốt lõi
            </label>
            <textarea
              rows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Ghi lại các bẫy lâm sàng, phản xạ khi đi buồng, câu hỏi thầy cô thường hỏi khi thi hoặc các điểm cần lưu ý..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-hidden focus:ring-2 focus:ring-teal-500 text-sm leading-relaxed font-sans"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
              Gắn thẻ (Tags)
            </label>
            <div className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                placeholder="Nhập thẻ rồi nhấn Enter..."
                className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-xs focus:outline-hidden focus:ring-2 focus:ring-teal-500"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-medium flex items-center space-x-1 border border-slate-200 dark:border-slate-700"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Thêm</span>
              </button>
            </div>

            {/* Active Tags */}
            <div className="flex flex-wrap gap-1.5 mb-2">
              {tags.map((t, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md text-xs font-medium bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800"
                >
                  <span>{t}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(t)}
                    className="hover:text-teal-900 dark:hover:text-teal-100"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>

            {/* Quick Suggestions */}
            <div className="flex flex-wrap items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400">
              <span className="font-semibold text-slate-400 dark:text-slate-500">Gợi ý nhanh:</span>
              {suggestedTags.map((st, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => !tags.includes(st) && setTags([...tags, st])}
                  className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors"
                >
                  +{st}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="px-6 py-3.5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 flex items-center justify-between">
          <div>
            {existingNote && (
              <button
                type="button"
                onClick={handleDelete}
                className="flex items-center space-x-1.5 text-xs text-red-600 hover:text-red-700 font-medium px-2.5 py-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                <span>Xóa ghi chú</span>
              </button>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800 rounded-xl transition-colors"
            >
              Hủy
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={!title.trim() || !content.trim()}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 shadow-md shadow-teal-600/20 disabled:opacity-50 transition-all"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>Đã lưu!</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Lưu ghi chú</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
