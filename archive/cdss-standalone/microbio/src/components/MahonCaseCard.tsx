import React, { useState } from 'react';
import { ClinicalCaseQuiz, Language } from '../types';
import { 
  Stethoscope, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  RotateCcw,
  Sparkles,
  BookOpen
} from 'lucide-react';

interface MahonCaseCardProps {
  caseData: ClinicalCaseQuiz;
  language: Language;
  chapterNumber?: number;
}

export const MahonCaseCard: React.FC<MahonCaseCardProps> = ({
  caseData,
  language,
  chapterNumber
}) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleReset = () => {
    setSelectedOptionId(null);
    setSubmitted(false);
  };

  const isCorrect = selectedOptionId === caseData.correctOptionId;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden space-y-4 p-5 sm:p-6 transition-all hover:border-emerald-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <Stethoscope className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                {language === 'vi' ? 'Tình huống lâm sàng Mahon' : 'Mahon Case in Point'}
              </span>
              {(chapterNumber || caseData.chapterNumber) && (
                <span className="text-[11px] font-semibold text-slate-500">
                  {language === 'vi' ? `Chương ${chapterNumber || caseData.chapterNumber}` : `Chapter ${chapterNumber || caseData.chapterNumber}`}
                </span>
              )}
            </div>
            <h4 className="text-base font-bold text-slate-900 mt-0.5">
              {caseData.chapterTitle}
            </h4>
          </div>
        </div>

        {submitted && (
          <button
            onClick={handleReset}
            className="self-start sm:self-center p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors flex items-center justify-center shrink-0"
            title={language === 'vi' ? 'Làm lại câu hỏi tình huống' : 'Retry Clinical Case'}
            aria-label={language === 'vi' ? 'Làm lại' : 'Retry'}
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Patient Scenario */}
      {caseData.caseScenario && (
        <div className="space-y-1.5">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            {language === 'vi' ? 'Bệnh sử & Diễn tiến lâm sàng (Clinical Vignette):' : 'Clinical Vignette:'}
          </span>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200/80">
            {caseData.caseScenario[language] || caseData.caseScenario.en}
          </p>
        </div>
      )}

      {/* Quiz Question */}
      <div className="space-y-3 pt-1">
        <div className="flex items-start gap-2 text-xs sm:text-sm font-bold text-slate-900">
          <HelpCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <span>{caseData.question[language] || caseData.question.en}</span>
        </div>

        {/* Options */}
        <div className="space-y-2">
          {caseData.options.map((opt, idx) => {
            const isChosen = selectedOptionId === opt.id;
            const isRight = opt.id === caseData.correctOptionId;

            let optionStyle = 'border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/30 text-slate-800 bg-white';
            if (submitted) {
              if (isRight) {
                optionStyle = 'border-emerald-500 bg-emerald-50/90 text-emerald-950 font-semibold shadow-2xs';
              } else if (isChosen && !isRight) {
                optionStyle = 'border-rose-400 bg-rose-50/80 text-rose-950';
              } else {
                optionStyle = 'border-slate-200 text-slate-400 bg-slate-50/50 opacity-60';
              }
            } else if (isChosen) {
              optionStyle = 'border-emerald-600 bg-emerald-50 text-emerald-950 font-semibold shadow-2xs ring-1 ring-emerald-500';
            }

            return (
              <button
                key={opt.id}
                type="button"
                disabled={submitted}
                onClick={() => setSelectedOptionId(opt.id)}
                className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-3 text-xs sm:text-sm ${optionStyle}`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                  submitted && isRight
                    ? 'bg-emerald-600 text-white'
                    : submitted && isChosen && !isRight
                    ? 'bg-rose-600 text-white'
                    : isChosen
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 text-slate-600'
                }`}>
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="flex-1 leading-snug">
                  {opt.text[language] || opt.text.en}
                </span>

                {submitted && isRight && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                )}
                {submitted && isChosen && !isRight && (
                  <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                )}
              </button>
            );
          })}
        </div>

        {/* Submit Button */}
        {!submitted && (
          <div className="pt-2 flex justify-end">
            <button
              type="button"
              disabled={selectedOptionId === null}
              onClick={() => setSubmitted(true)}
              className={`px-5 py-2.5 rounded-xl text-xs font-semibold transition-all shadow-2xs ${
                selectedOptionId !== null
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700 cursor-pointer'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              {language === 'vi' ? 'Xác nhận chẩn đoán' : 'Submit Clinical Answer'}
            </button>
          </div>
        )}

        {/* Feedback & Explanation */}
        {submitted && (
          <div className={`p-4 rounded-xl border space-y-3 mt-3 ${
            isCorrect
              ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
              : 'bg-amber-50/70 border-amber-200 text-amber-950'
          }`}>
            <div className="flex items-center gap-2 font-bold text-sm">
              {isCorrect ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>{language === 'vi' ? 'Chính xác! Chẩn đoán hoàn toàn đúng theo Mahon.' : 'Correct Clinical Diagnosis!'}</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                  <span>{language === 'vi' ? 'Chưa chính xác. Mời bạn đọc phân tích cơ chế dưới đây:' : 'Incorrect. See Clinical Rationale Below:'}</span>
                </>
              )}
            </div>

            <div className="space-y-1.5 text-xs sm:text-sm leading-relaxed">
              <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                <span>{language === 'vi' ? 'Phân tích cơ chế bệnh sinh & Dấu ấn sinh hóa:' : 'Pathophysiological Rationale & Diagnostic Markers:'}</span>
              </div>
              <p className="text-slate-700 pl-5">
                {caseData.explanation[language] || caseData.explanation.en}
              </p>
            </div>

            {caseData.clinicalTakeaway && (
              <div className="pt-2 border-t border-slate-200/70 text-xs sm:text-sm text-slate-800 flex items-start gap-2 bg-white/70 p-3 rounded-lg">
                <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-emerald-900 block mb-0.5">
                    {language === 'vi' ? 'Bài học lâm sàng then chốt (Clinical Takeaway):' : 'Key Clinical Takeaway:'}
                  </strong>
                  <span>{caseData.clinicalTakeaway[language] || caseData.clinicalTakeaway.en}</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
