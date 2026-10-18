import React, { useState } from 'react';
import { 
  BookOpen, 
  Clock, 
  Droplets, 
  AlertCircle, 
  Check, 
  ChevronRight,
  Shield,
  FileText
} from 'lucide-react';

export const ClinicalQuickReferenceCard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'infusion' | 'tdm' | 'incompat'>('infusion');

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-3.5 sm:p-4 transition-all">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0">
            <BookOpen className="w-3.5 h-3.5" />
          </div>
          <div>
            <h2 className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight">
              Tra cứu Quy chuẩn Thực hành
            </h2>
          </div>
        </div>
        <span className="text-[10px] font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200/60">
          ASHP / Dược thư
        </span>
      </div>

      {/* Mini Tabs */}
      <div className="grid grid-cols-3 gap-1 bg-slate-100 p-0.5 rounded-lg mb-2.5 text-[11px] font-medium">
        <button
          type="button"
          onClick={() => setActiveTab('infusion')}
          className={`py-1 rounded-md transition-all text-center ${
            activeTab === 'infusion' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Pha & Tốc độ
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('tdm')}
          className={`py-1 rounded-md transition-all text-center ${
            activeTab === 'tdm' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Lấy mẫu TDM
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('incompat')}
          className={`py-1 rounded-md transition-all text-center ${
            activeTab === 'incompat' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Tương kỵ Y-site
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'infusion' && (
        <div className="space-y-2 text-[11px] text-slate-600">
          <div className="p-2 bg-slate-50/80 rounded-lg border border-slate-200/70">
            <div className="flex items-center gap-1.5 font-semibold text-slate-800 mb-0.5">
              <Droplets className="w-3.5 h-3.5 text-teal-600 shrink-0" />
              <span>Nồng độ pha tối đa:</span>
            </div>
            <p className="leading-relaxed">
              • Ngoại vi: <strong>≤ 5 mg/mL</strong> (pha 1g trong tối thiểu 200mL NaCl 0.9% hoặc D5W).<br />
              • Tĩnh mạch trung tâm: có thể đến <strong>10 mg/mL</strong> khi hạn chế dịch.
            </p>
          </div>

          <div className="p-2 bg-slate-50/80 rounded-lg border border-slate-200/70">
            <div className="flex items-center gap-1.5 font-semibold text-slate-800 mb-0.5">
              <Clock className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
              <span>Thời gian truyền tối thiểu:</span>
            </div>
            <p className="leading-relaxed">
              • <strong>Tốc độ ≤ 10 mg/phút</strong> (truyền ít nhất 60 phút cho mỗi 1.000 mg; liều 1.5g truyền ≥ 90–120 phút).<br />
              • Tránh truyền nhanh gây phản ứng phản vệ giả (<strong>Hội chứng Red Man</strong>).
            </p>
          </div>
        </div>
      )}

      {activeTab === 'tdm' && (
        <div className="space-y-2 text-[11px] text-slate-600">
          <div className="p-2 bg-slate-50/80 rounded-lg border border-slate-200/70">
            <div className="flex items-center gap-1.5 font-semibold text-slate-800 mb-0.5">
              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Thời điểm lấy mẫu Đáy (C_trough):</span>
            </div>
            <p className="leading-relaxed">
              • Trong vòng <strong>30 phút trước liều thứ 4 hoặc 5</strong> (khi đã đạt trạng thái cân bằng Css).<br />
              • Bệnh nhân suy thận nặng: lấy mẫu trước liều thứ 2 hoặc thứ 3.
            </p>
          </div>

          <div className="p-2 bg-slate-50/80 rounded-lg border border-slate-200/70">
            <div className="flex items-center gap-1.5 font-semibold text-slate-800 mb-0.5">
              <Check className="w-3.5 h-3.5 text-teal-600 shrink-0" />
              <span>Lấy mẫu Đỉnh (C_peak) nếu tính 2 điểm:</span>
            </div>
            <p className="leading-relaxed">
              • Lấy sau khi kết thúc truyền <strong>1 đến 2 giờ</strong> (chờ pha phân bố kết thúc hoàn toàn).
            </p>
          </div>
        </div>
      )}

      {activeTab === 'incompat' && (
        <div className="space-y-2 text-[11px] text-slate-600">
          <div className="p-2 bg-rose-50/60 rounded-lg border border-rose-200/70">
            <div className="flex items-center gap-1.5 font-semibold text-rose-900 mb-0.5">
              <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
              <span>Không truyền chung đường (Y-site):</span>
            </div>
            <p className="leading-relaxed text-rose-800">
              Nguy cơ kết tủa ngay lập tức khi gặp: <strong>Piperacillin/Tazobactam</strong>, <strong>Heparin</strong>, <strong>Cefepime</strong>, <strong>Furosemide</strong>, <strong>Phenobarbital</strong>, <strong>Propofol</strong>.
            </p>
          </div>

          <div className="p-2 bg-slate-50/80 rounded-lg border border-slate-200/70">
            <p className="leading-relaxed">
              Luôn tráng đường truyền bằng <strong>NaCl 0.9%</strong> trước và sau khi tiêm truyền ngắt quãng.
            </p>
          </div>
        </div>
      )}

      {/* Bottom Checklist strip */}
      <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
        <span className="flex items-center gap-1 text-slate-600 font-medium">
          <Shield className="w-3 h-3 text-teal-600" />
          Dung môi tương thích: NaCl 0.9%, D5W
        </span>
        <span className="text-slate-400">BVĐK Cà Mau / ASHP</span>
      </div>
    </div>
  );
};
