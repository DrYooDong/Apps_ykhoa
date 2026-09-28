import React, { useState } from 'react';
import { DiagnosticAlgorithm, DecisionNode } from '../types/clinical';
import { 
  GitBranch, 
  RotateCcw, 
  AlertCircle, 
  CheckCircle2, 
  HelpCircle, 
  ArrowRight, 
  ChevronRight,
  ShieldAlert,
  Activity
} from 'lucide-react';

interface AlgorithmViewerProps {
  algorithm: DiagnosticAlgorithm;
  onOpenNotes?: () => void;
}

export const AlgorithmViewer: React.FC<AlgorithmViewerProps> = ({ algorithm }) => {
  const [currentNodeId, setCurrentNodeId] = useState<string>(algorithm.startingPoint);
  const [history, setHistory] = useState<string[]>([]);
  const [selectedPath, setSelectedPath] = useState<{ question: string; chosen: string }[]>([]);

  const currentNode = algorithm.nodes.find(n => n.id === currentNodeId);

  const handleSelectOption = (option: DecisionNode['options'][0]) => {
    if (currentNode) {
      setSelectedPath(prev => [
        ...prev, 
        { question: currentNode.question, chosen: option.label }
      ]);
      setHistory(prev => [...prev, currentNodeId]);
    }

    if (option.targetId) {
      setCurrentNodeId(option.targetId);
    }
  };

  const handleReset = () => {
    setCurrentNodeId(algorithm.startingPoint);
    setHistory([]);
    setSelectedPath([]);
  };

  const handleBack = () => {
    if (history.length > 0) {
      const prevId = history[history.length - 1];
      setHistory(prev => prev.slice(0, -1));
      setSelectedPath(prev => prev.slice(0, -1));
      setCurrentNodeId(prevId);
    }
  };

  return (
    <div className="bg-slate-900 text-slate-100 rounded-2xl p-5 sm:p-6 shadow-xl border border-slate-800">
      {/* Algorithm Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/30">
            <GitBranch className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base sm:text-lg text-white">{algorithm.title}</h3>
            <p className="text-xs text-slate-400">{algorithm.summary}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {history.length > 0 && (
            <button
              onClick={handleBack}
              className="px-3 py-1.5 text-xs rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition-colors"
            >
              Quay lại bước trước
            </button>
          )}
          <button
            onClick={handleReset}
            className="flex items-center space-x-1.5 px-3 py-1.5 text-xs rounded-lg bg-teal-600/30 hover:bg-teal-600/40 text-teal-300 border border-teal-500/30 font-medium transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Khởi động lại</span>
          </button>
        </div>
      </div>

      {/* Path trail if stepped */}
      {selectedPath.length > 0 && (
        <div className="my-4 p-3 rounded-xl bg-slate-800/60 border border-slate-800 text-xs">
          <div className="text-[11px] font-semibold text-teal-400 uppercase tracking-wider mb-1.5 flex items-center space-x-1">
            <Activity className="w-3 h-3" />
            <span>Tiến trình phân nhánh chẩn đoán:</span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5 text-slate-300">
            {selectedPath.map((step, idx) => (
              <React.Fragment key={idx}>
                <span className="px-2 py-0.5 rounded-md bg-slate-700/80 text-teal-300 font-medium border border-slate-600">
                  {step.chosen}
                </span>
                {idx < selectedPath.length - 1 && (
                  <ChevronRight className="w-3 h-3 text-slate-500" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {/* Active Decision Node */}
      {currentNode && (
        <div className="mt-5 space-y-4">
          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
            <div className="flex items-start space-x-2.5">
              <HelpCircle className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs uppercase tracking-wider text-teal-400 font-bold block mb-1">
                  Bước Quyết Định Lâm Sàng
                </span>
                <h4 className="text-base sm:text-lg font-semibold text-white leading-snug">
                  {currentNode.question}
                </h4>
                {currentNode.subtext && (
                  <p className="text-xs text-slate-400 mt-1">{currentNode.subtext}</p>
                )}
              </div>
            </div>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 gap-3">
            {currentNode.options.map((opt, i) => {
              const isUrgent = opt.severity === 'urgent';
              const isWarning = opt.severity === 'warning';

              return (
                <div
                  key={i}
                  onClick={() => handleSelectOption(opt)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                    opt.diagnosis
                      ? isUrgent
                        ? 'bg-red-950/40 border-red-800/80 hover:bg-red-900/50'
                        : isWarning
                        ? 'bg-amber-950/40 border-amber-800/80 hover:bg-amber-900/50'
                        : 'bg-emerald-950/40 border-emerald-800/80 hover:bg-emerald-900/50'
                      : 'bg-slate-800/50 border-slate-700 hover:border-teal-500 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${
                        isUrgent ? 'bg-red-500 ring-2 ring-red-400/30' : isWarning ? 'bg-amber-400' : 'bg-teal-400'
                      }`} />
                      <span className="font-semibold text-sm sm:text-base text-white">
                        {opt.label}
                      </span>
                    </div>
                    {opt.targetId ? (
                      <span className="text-xs font-semibold text-teal-400 flex items-center space-x-1 shrink-0 ml-2">
                        <span>Tiếp</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    ) : (
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full shrink-0 ml-2 ${
                        isUrgent ? 'bg-red-500/20 text-red-300 border border-red-500/40' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      }`}>
                        Kết luận CDSS
                      </span>
                    )}
                  </div>

                  {/* Diagnosis Result if terminal option */}
                  {opt.diagnosis && (
                    <div className="mt-3 pt-3 border-t border-slate-800/80">
                      <div className="flex items-start space-x-2">
                        {isUrgent ? (
                          <ShieldAlert className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                        ) : (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        )}
                        <div>
                          <span className="text-xs font-bold uppercase tracking-wider block mb-0.5 text-slate-400">
                            Định hướng xử trí & Chẩn đoán:
                          </span>
                          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                            {opt.diagnosis}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Static Tree View Accordion/Summary */}
      <div className="mt-6 pt-4 border-t border-slate-800">
        <details className="group cursor-pointer">
          <summary className="text-xs font-semibold text-slate-400 hover:text-teal-400 flex items-center justify-between">
            <span>Xem toàn bộ cấu trúc các nhánh quyết định ({algorithm.nodes.length} nút)</span>
            <ChevronRight className="w-4 h-4 transition-transform group-open:rotate-90" />
          </summary>
          <div className="mt-3 space-y-2 text-xs">
            {algorithm.nodes.map((node) => (
              <div key={node.id} className="p-2.5 rounded-lg bg-slate-800/40 border border-slate-800">
                <p className="font-semibold text-slate-200">{node.question}</p>
                <div className="pl-3 mt-1 space-y-1 text-slate-400 border-l border-slate-700">
                  {node.options.map((o, idx) => (
                    <div key={idx} className="flex items-center space-x-1.5">
                      <span className="text-teal-400">•</span>
                      <span className="text-slate-300 font-medium">{o.label}</span>
                      {o.diagnosis && (
                        <span className="text-slate-400 italic text-[11px]">- {o.diagnosis}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </details>
      </div>
    </div>
  );
};
