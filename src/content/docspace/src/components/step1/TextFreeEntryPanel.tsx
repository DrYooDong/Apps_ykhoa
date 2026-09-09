import React, { useState } from 'react';
import { Sparkles, Mic, Check, X } from 'lucide-react';
import { KnowledgeBase, ClinicalFormState, Gender } from '../../types.ts';
import { extractFromText, ExtractedPasteData } from '../../lib/clinicalEngine.ts';

interface TextFreeEntryPanelProps {
  kb: KnowledgeBase;
  setForm: React.Dispatch<React.SetStateAction<ClinicalFormState>>;
  setSelected: React.Dispatch<React.SetStateAction<Set<string>>>;
  setNegated: React.Dispatch<React.SetStateAction<Set<string>>>;
  className?: string;
}

export const TextFreeEntryPanel: React.FC<TextFreeEntryPanelProps> = ({
  kb,
  setForm,
  setSelected,
  setNegated,
  className = '',
}) => {
  const [pasteText, setPasteText] = useState('');
  const [pasteResult, setPasteResult] = useState<ExtractedPasteData | null>(null);
  const [selectedExtractedPos, setSelectedExtractedPos] = useState<Set<string>>(new Set());
  const [selectedExtractedNeg, setSelectedExtractedNeg] = useState<Set<string>>(new Set());
  const [isRecording, setIsRecording] = useState(false);

  const handleRunPaste = () => {
    if (!pasteText.trim()) return;
    const extracted = extractFromText(pasteText, kb);
    setPasteResult(extracted);
    setSelectedExtractedPos(new Set(extracted.pos));
    setSelectedExtractedNeg(new Set(extracted.neg));
  };

  const handleApplyPaste = () => {
    if (!pasteResult) return;

    setForm((prev) => ({
      ...prev,
      gioiTinh: (pasteResult.hc.gioi as Gender) || prev.gioiTinh,
      tuoi: pasteResult.hc.tuoi || prev.tuoi,
      ngheNghiep: pasteResult.hc.nghe || prev.ngheNghiep,
      lyDo: pasteResult.hc.lydo || prev.lyDo,
    }));

    setSelected((prev) => {
      const next = new Set(prev);
      selectedExtractedPos.forEach((id) => next.add(id));
      return next;
    });

    setNegated((prev) => {
      const next = new Set(prev);
      selectedExtractedNeg.forEach((id) => next.add(id));
      return next;
    });

    setPasteResult(null);
  };

  const handleStartVoice = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        'Trình duyệt chưa hỗ trợ Web Speech API trực tiếp. Bạn có thể sử dụng Chrome/Edge hoặc dán văn bản.'
      );
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'vi-VN';
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsRecording(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setPasteText((prev) => (prev ? prev + ' ' + transcript : transcript));
    };

    recognition.onerror = () => {
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.start();
  };

  return (
    <div
      id="text-free-entry-panel"
      className={`bg-white border border-slate-200 rounded-lg p-3.5 sm:p-4 shadow-xs ${className}`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md flex items-center justify-center bg-blue-600 text-white text-xs font-bold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div>
            <h2 className="font-display text-sm sm:text-base font-bold text-slate-800">
              Nạp nhanh từ tóm tắt bệnh án / văn bản chuyển viện (NLP)
            </h2>
            <p className="text-[11px] text-slate-500">
              Tự động trích xuất thông tin hành chính, dấu chứng dương tính và các dữ kiện phủ định loại trừ
            </p>
          </div>
        </div>
      </div>

      <div className="relative mt-1">
        <textarea
          id="paste-textarea"
          rows={3}
          value={pasteText}
          onChange={(e) => setPasteText(e.target.value)}
          placeholder="Dán tóm tắt ca bệnh hoặc bệnh sử vào đây. VD: Bệnh nhân nam 58 tuổi, làm tài xế, vào viện vì đau ngực dữ dội sau xương ức lan lên vai trái, vã mồ hôi, khó thở, không sốt, tiền căn tăng huyết áp..."
          className="w-full border border-slate-200 rounded-md p-2.5 text-xs sm:text-sm bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-500 transition-all text-slate-800 placeholder:text-slate-400 font-sans"
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 mt-2">
        <div className="flex items-center gap-2">
          <button
            type="button"
            id="btn-run-paste"
            onClick={handleRunPaste}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-md shadow-xs transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Bóc tách dữ kiện</span>
          </button>

          <button
            type="button"
            id="btn-mic-paste"
            onClick={handleStartVoice}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border transition-all cursor-pointer ${
              isRecording
                ? 'bg-red-500 text-white border-red-600 animate-pulse'
                : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
            }`}
          >
            <Mic className="w-3.5 h-3.5" />
            <span>{isRecording ? 'Đang nghe...' : 'Đọc chính tả (Voice)'}</span>
          </button>
        </div>

        {pasteText && (
          <button
            type="button"
            onClick={() => setPasteText('')}
            className="text-[11px] text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
          >
            Xóa văn bản
          </button>
        )}
      </div>

      {/* Extraction Preview & Fine-grained Confirmation */}
      {pasteResult && (
        <div className="mt-3 p-3 bg-slate-50 border border-blue-200 rounded-md text-xs flex flex-col gap-2.5 animate-fadeIn">
          <div className="flex items-center justify-between pb-1.5 border-b border-slate-200">
            <span className="font-semibold text-blue-900 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              Kết quả bóc tách tự động (Chọn dữ kiện muốn áp dụng):
            </span>
            <span className="text-[11px] text-slate-500">
              Bấm vào từng mục để bỏ chọn nếu không cần thiết
            </span>
          </div>

          {/* Hành chính trích xuất */}
          {(pasteResult.hc.gioi || pasteResult.hc.tuoi || pasteResult.hc.lydo) && (
            <div className="flex flex-wrap items-center gap-2 text-slate-700 text-xs">
              <span className="font-semibold text-slate-900">Hành chính:</span>
              {pasteResult.hc.gioi && (
                <span className="px-2 py-0.5 bg-white border border-slate-200 rounded text-[11px] font-medium">
                  Giới: <b>{pasteResult.hc.gioi === 'nam' ? 'Nam' : 'Nữ'}</b>
                </span>
              )}
              {pasteResult.hc.tuoi && (
                <span className="px-2 py-0.5 bg-white border border-slate-200 rounded text-[11px] font-medium">
                  Tuổi: <b>{pasteResult.hc.tuoi}</b>
                </span>
              )}
              {pasteResult.hc.lydo && (
                <span className="px-2 py-0.5 bg-white border border-slate-200 rounded text-[11px] font-medium">
                  Lý do: <i>"{pasteResult.hc.lydo}"</i>
                </span>
              )}
              {pasteResult.hc.nghe && (
                <span className="px-2 py-0.5 bg-white border border-slate-200 rounded text-[11px] font-medium">
                  Nghề: {pasteResult.hc.nghe}
                </span>
              )}
            </div>
          )}

          {/* Dữ kiện dương */}
          {pasteResult.pos.length > 0 && (
            <div className="flex flex-col gap-1">
              <span className="font-semibold text-emerald-800 text-[11px]">
                ✓ Dữ kiện dương tính tìm thấy ({pasteResult.pos.length}):
              </span>
              <div className="flex flex-wrap gap-1.5">
                {pasteResult.pos.map((id) => {
                  const item = kb.trieuChung.find((t) => t.id === id);
                  const isChecked = selectedExtractedPos.has(id);
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => {
                        setSelectedExtractedPos((prev) => {
                          const n = new Set(prev);
                          if (n.has(id)) n.delete(id);
                          else n.add(id);
                          return n;
                        });
                      }}
                      className={`px-2 py-1 rounded text-[11px] font-medium border flex items-center gap-1 cursor-pointer transition-colors ${
                        isChecked
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300 font-semibold'
                          : 'bg-white text-slate-400 border-slate-200 line-through'
                      }`}
                    >
                      <Check
                        className={`w-3 h-3 ${isChecked ? 'text-emerald-600' : 'text-slate-300'}`}
                      />
                      <span>{item?.ten || id}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Dữ kiện phủ định */}
          {pasteResult.neg.length > 0 && (
            <div className="flex flex-col gap-1">
              <span className="font-semibold text-red-800 text-[11px]">
                ✗ Dữ kiện phủ định / loại trừ ({pasteResult.neg.length}):
              </span>
              <div className="flex flex-wrap gap-1.5">
                {pasteResult.neg.map((id) => {
                  const item = kb.trieuChung.find((t) => t.id === id);
                  const isChecked = selectedExtractedNeg.has(id);
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => {
                        setSelectedExtractedNeg((prev) => {
                          const n = new Set(prev);
                          if (n.has(id)) n.delete(id);
                          else n.add(id);
                          return n;
                        });
                      }}
                      className={`px-2 py-1 rounded text-[11px] font-medium border flex items-center gap-1 cursor-pointer transition-colors ${
                        isChecked
                          ? 'bg-red-50 text-red-700 border-red-200 font-semibold'
                          : 'bg-white text-slate-400 border-slate-200 line-through'
                      }`}
                    >
                      <X className={`w-3 h-3 ${isChecked ? 'text-red-500' : 'text-slate-300'}`} />
                      <span>Không {item?.ten || id}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between pt-2 border-t border-slate-200">
            <div className="flex items-center gap-2">
              <button
                type="button"
                id="btn-apply-paste"
                onClick={handleApplyPaste}
                className="px-3 py-1.5 bg-blue-600 text-white font-semibold rounded text-xs hover:bg-blue-700 cursor-pointer shadow-xs"
              >
                Áp dụng vào bệnh án ({selectedExtractedPos.size + selectedExtractedNeg.size} mục)
              </button>
              <button
                type="button"
                onClick={() => setPasteResult(null)}
                className="px-3 py-1.5 bg-white border border-slate-200 text-slate-600 text-xs rounded hover:bg-slate-100 cursor-pointer"
              >
                Hủy bỏ
              </button>
            </div>
            <span className="text-[11px] text-slate-400">
              Không ghi đè những dữ kiện bạn đã chọn trước đó
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
