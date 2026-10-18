import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Stethoscope, GitFork, ArrowRight, Star, AlertTriangle, BookOpen, MessageSquareText } from 'lucide-react';
import { EXAMINATION_MODULES } from '../data/examinationData';
import { APPROACH_TOPICS } from '../data/approachData';
import { HISTORY_STEPS, AMBIGUOUS_TERMS, SPOT_DIAGNOSES } from '../data/historyTakingData';

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectExam: (examId: string) => void;
  onSelectApproach: (approachId: string) => void;
  onSelectHistory?: () => void;
}

export const QuickSearchModal: React.FC<QuickSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectExam,
  onSelectApproach,
  onSelectHistory
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const cleanQuery = query.toLowerCase().trim();

  // Search Results
  const matchedHistory = HISTORY_STEPS.filter(s =>
    !cleanQuery ||
    s.title.toLowerCase().includes(cleanQuery) ||
    s.englishTitle.toLowerCase().includes(cleanQuery) ||
    s.summary.toLowerCase().includes(cleanQuery) ||
    s.coreConcepts.some(c => c.toLowerCase().includes(cleanQuery))
  );

  const matchedTerms = AMBIGUOUS_TERMS.filter(t =>
    cleanQuery && (
      t.patientTerm.toLowerCase().includes(cleanQuery) ||
      t.commonUnderlyingProblems.some(p => p.toLowerCase().includes(cleanQuery)) ||
      t.macleodTip.toLowerCase().includes(cleanQuery)
    )
  );

  const matchedSpot = SPOT_DIAGNOSES.filter(s =>
    cleanQuery && (
      s.name.toLowerCase().includes(cleanQuery) ||
      s.faciesOrBody.toLowerCase().includes(cleanQuery) ||
      s.classicSigns.some(c => c.toLowerCase().includes(cleanQuery)) ||
      s.underlyingCondition.toLowerCase().includes(cleanQuery)
    )
  );

  const matchedExams = EXAMINATION_MODULES.filter(m => 
    !cleanQuery || 
    m.title.toLowerCase().includes(cleanQuery) ||
    m.subtitle.toLowerCase().includes(cleanQuery) ||
    m.overview.toLowerCase().includes(cleanQuery) ||
    m.specialSigns.some(s => s.name.toLowerCase().includes(cleanQuery) || s.description.toLowerCase().includes(cleanQuery)) ||
    m.steps.some(st => st.technique.toLowerCase().includes(cleanQuery) || st.abnormalFindings.some(ab => ab.toLowerCase().includes(cleanQuery)))
  );

  const matchedApproaches = APPROACH_TOPICS.filter(a =>
    !cleanQuery ||
    a.title.toLowerCase().includes(cleanQuery) ||
    a.englishTitle.toLowerCase().includes(cleanQuery) ||
    a.definition.toLowerCase().includes(cleanQuery) ||
    a.redFlags.some(f => f.toLowerCase().includes(cleanQuery)) ||
    a.differentialDiagnosis.some(d => d.diseases.some(dis => dis.name.toLowerCase().includes(cleanQuery) || dis.distinguishingFeatures.toLowerCase().includes(cleanQuery)))
  );

  // Eponymous signs search
  const matchedSigns: { sign: typeof EXAMINATION_MODULES[0]['specialSigns'][0]; examId: string; examTitle: string }[] = [];
  EXAMINATION_MODULES.forEach(m => {
    m.specialSigns.forEach(s => {
      if (cleanQuery && (s.name.toLowerCase().includes(cleanQuery) || s.description.toLowerCase().includes(cleanQuery) || s.indicates.toLowerCase().includes(cleanQuery))) {
        matchedSigns.push({ sign: s, examId: m.id, examTitle: m.title });
      }
    });
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-start justify-center pt-16 sm:pt-24 px-4">
      <div 
        className="relative bg-white dark:bg-slate-900 w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
          <Search className="w-5 h-5 text-slate-400 dark:text-slate-500 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Tra cứu nhanh triệu chứng, dấu hiệu khám, Murphy, Babinski, JVP, rale, chẩn đoán..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent border-0 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-hidden text-sm sm:text-base font-medium"
          />
          {query ? (
            <button 
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-700"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-1.5 py-0.5 rounded shadow-2xs">
              ESC
            </span>
          )}
        </div>

        {/* Results Container */}
        <div className="max-h-[65vh] overflow-y-auto p-4 space-y-6">
          {/* History Taking Match */}
          {matchedHistory.length > 0 && (
            <div>
              <div className="flex items-center space-x-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-2.5">
                <MessageSquareText className="w-3.5 h-3.5" />
                <span>Kỹ Năng Hỏi Bệnh (Macleod) ({matchedHistory.length})</span>
              </div>
              <div className="space-y-2">
                {matchedHistory.map((step) => (
                  <div
                    key={step.id}
                    onClick={() => {
                      onSelectHistory?.();
                      onClose();
                    }}
                    className="p-3 rounded-xl border border-emerald-200/80 dark:border-emerald-800/60 bg-emerald-50/50 dark:bg-emerald-950/30 hover:bg-emerald-100/70 dark:hover:bg-emerald-900/40 cursor-pointer transition-all flex items-center justify-between group"
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-sm text-slate-900 dark:text-white group-hover:text-emerald-800 dark:group-hover:text-emerald-300">
                          Bước {step.stepNumber}: {step.title}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 line-clamp-1">{step.summary}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity ml-2 shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Ambiguous Terms Match */}
          {matchedTerms.length > 0 && (
            <div>
              <div className="flex items-center space-x-1.5 text-xs font-bold text-teal-700 dark:text-teal-400 uppercase tracking-wider mb-2.5">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Giải Mã Thuật Ngữ Mơ Hồ ({matchedTerms.length})</span>
              </div>
              <div className="space-y-2">
                {matchedTerms.map((term, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      onSelectHistory?.();
                      onClose();
                    }}
                    className="p-3 rounded-xl border border-teal-200/80 dark:border-teal-800/60 bg-teal-50/40 dark:bg-teal-950/30 hover:bg-teal-100/60 dark:hover:bg-teal-900/40 cursor-pointer transition-all flex items-center justify-between group"
                  >
                    <div>
                      <h4 className="font-bold text-sm text-teal-950 dark:text-teal-200">{term.patientTerm}</h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">{term.macleodTip}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-teal-500 opacity-0 group-hover:opacity-100 transition-opacity ml-2 shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Spot Diagnoses Match */}
          {matchedSpot.length > 0 && (
            <div>
              <div className="flex items-center space-x-1.5 text-xs font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-wider mb-2.5">
                <Star className="w-3.5 h-3.5" />
                <span>Chẩn Đoán Diện Mạo Spot Diagnoses ({matchedSpot.length})</span>
              </div>
              <div className="space-y-2">
                {matchedSpot.map((spot, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      onSelectHistory?.();
                      onClose();
                    }}
                    className="p-3 rounded-xl border border-indigo-200/80 dark:border-indigo-800/60 bg-indigo-50/50 dark:bg-indigo-950/30 hover:bg-indigo-100/70 dark:hover:bg-indigo-900/40 cursor-pointer transition-all flex items-center justify-between group"
                  >
                    <div>
                      <h4 className="font-bold text-sm text-indigo-950 dark:text-indigo-200">{spot.name}</h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">{spot.underlyingCondition}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity ml-2 shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Signs Match if any */}
          {matchedSigns.length > 0 && (
            <div>
              <div className="flex items-center space-x-1.5 text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider mb-2.5">
                <Star className="w-3.5 h-3.5" />
                <span>Dấu Hiệu Lâm Sàng Đặc Biệt ({matchedSigns.length})</span>
              </div>
              <div className="space-y-2">
                {matchedSigns.map((item, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      onSelectExam(item.examId);
                      onClose();
                    }}
                    className="p-3 rounded-xl border border-amber-200/80 dark:border-amber-800/60 bg-amber-50/50 dark:bg-amber-950/30 hover:bg-amber-100/70 dark:hover:bg-amber-900/40 cursor-pointer transition-all flex items-start justify-between group"
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-sm text-slate-900 dark:text-white">{item.sign.name}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-200 dark:bg-amber-900/80 text-amber-900 dark:text-amber-200 font-medium">
                          {item.examTitle}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 line-clamp-1">{item.sign.description}</p>
                      <p className="text-xs text-teal-700 dark:text-teal-400 font-medium mt-0.5">Gợi ý: {item.sign.indicates}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity mt-1 ml-2 shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Part 1: Examination Modules */}
          {matchedExams.length > 0 && (
            <div>
              <div className="flex items-center space-x-1.5 text-xs font-bold text-teal-700 dark:text-teal-400 uppercase tracking-wider mb-2.5">
                <Stethoscope className="w-3.5 h-3.5" />
                <span>[1] Các Bước Khám Lâm Sàng ({matchedExams.length})</span>
              </div>
              <div className="space-y-2">
                {matchedExams.map((exam) => (
                  <div
                    key={exam.id}
                    onClick={() => {
                      onSelectExam(exam.id);
                      onClose();
                    }}
                    className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-teal-400 dark:hover:border-teal-500 bg-white dark:bg-slate-800/60 hover:bg-teal-50/40 dark:hover:bg-teal-950/30 cursor-pointer transition-all flex items-center justify-between group"
                  >
                    <div>
                      <h4 className="font-semibold text-sm text-slate-900 dark:text-white group-hover:text-teal-700 dark:group-hover:text-teal-300">
                        {exam.title}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">{exam.overview}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-teal-600 transition-colors ml-2 shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Part 2: Approach & Algorithms */}
          {matchedApproaches.length > 0 && (
            <div>
              <div className="flex items-center space-x-1.5 text-xs font-bold text-sky-700 dark:text-sky-400 uppercase tracking-wider mb-2.5">
                <GitFork className="w-3.5 h-3.5" />
                <span>[2] Tiếp Cận Triệu Chứng & Hội Chứng ({matchedApproaches.length})</span>
              </div>
              <div className="space-y-2">
                {matchedApproaches.map((topic) => (
                  <div
                    key={topic.id}
                    onClick={() => {
                      onSelectApproach(topic.id);
                      onClose();
                    }}
                    className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-sky-400 dark:hover:border-sky-500 bg-white dark:bg-slate-800/60 hover:bg-sky-50/40 dark:hover:bg-sky-950/30 cursor-pointer transition-all flex items-center justify-between group"
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-semibold text-sm text-slate-900 dark:text-white group-hover:text-sky-700 dark:group-hover:text-sky-300">
                          {topic.title}
                        </h4>
                        <span className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${
                          topic.urgencyLevel === 'Emergency' 
                            ? 'bg-red-100 dark:bg-red-950/70 text-red-700 dark:text-red-300' 
                            : 'bg-amber-100 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300'
                        }`}>
                          {topic.urgencyLevel}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">{topic.definition}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-sky-600 transition-colors ml-2 shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty state */}
          {matchedExams.length === 0 && matchedApproaches.length === 0 && (
            <div className="text-center py-8">
              <Search className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Không tìm thấy kết quả phù hợp với từ khóa "{query}"</p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Thử tìm kiếm với: "đau ngực", "Murphy", "JVP", "khó thở", "ho máu", "Babinski"...</p>
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between">
          <span>Tìm kiếm thông minh trên toàn bộ cẩm nang Bates & Macleod</span>
          <span className="hidden sm:inline">Nhấn Enter để chọn • ESC để đóng</span>
        </div>
      </div>
    </div>
  );
};
