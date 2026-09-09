import React, { useState } from 'react';
import {
  ShieldAlert,
  Search,
  AlertTriangle,
  HeartPulse,
  Wind,
  Activity,
  Flame,
  CheckCircle2,
  Syringe,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { CLINICAL_PROTOCOLS, ClinicalProtocol } from '../data/protocols';

export const TreatmentProtocolsView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Tất cả');
  const [expandedProtocolId, setExpandedProtocolId] = useState<string | null>('type2-copd');

  const categories = [
    'Tất cả',
    'Hô hấp',
    'Toan chuyển hóa',
    'Kiềm chuyển hóa',
    'Cạm bẫy & Thủ thuật'
  ];

  const filteredProtocols = CLINICAL_PROTOCOLS.filter((p) => {
    const matchCat = selectedCategory === 'Tất cả' || p.category === selectedCategory;
    const matchSearch =
      searchQuery === '' ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const toggleExpand = (id: string) => {
    setExpandedProtocolId(expandedProtocolId === id ? null : id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-2xl p-6 text-white shadow-md">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2 bg-blue-500/20 rounded-lg border border-blue-400/30">
            <ShieldAlert className="w-6 h-6 text-blue-300" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">
              Phác Đồ Xử Trí Lâm Sàng Toàn Diện Dựa Trên Khí Máu (Clinical Action Protocols)
            </h1>
            <p className="text-xs text-blue-200">
              Tổng hợp hướng dẫn xử trí, lưu đồ leo thang liệu pháp oxy và các cảnh báo tử vong chuẩn y khoa
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm phác đồ (COPD, DKA, Sốc nhiễm khuẩn...)"
              className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="text-xs text-slate-500 font-medium">
            Có <strong className="text-slate-900">{filteredProtocols.length}</strong> phác đồ chuẩn
          </div>
        </div>

        {/* Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Protocols List */}
      <div className="space-y-4">
        {filteredProtocols.map((protocol: ClinicalProtocol) => {
          const isExpanded = expandedProtocolId === protocol.id;

          return (
            <div
              key={protocol.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:border-blue-300 transition-all"
            >
              {/* Header */}
              <div
                className="p-5 cursor-pointer select-none space-y-2 hover:bg-slate-50/50 transition-colors"
                onClick={() => toggleExpand(protocol.id)}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-md text-xs font-bold border ${protocol.badgeColor}`}
                    >
                      {protocol.category}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900">{protocol.title}</h3>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-400">
                    <span className="text-[11px] hidden sm:inline">{protocol.sourceReference}</span>
                    {isExpanded ? <ChevronUp className="w-5 h-5 text-slate-600" /> : <ChevronDown className="w-5 h-5 text-slate-600" />}
                  </div>
                </div>

                <div className="text-xs text-blue-700 font-medium italic">{protocol.subtitle}</div>
                <p className="text-xs text-slate-600 leading-relaxed">{protocol.summary}</p>
              </div>

              {/* Expansive Details */}
              {isExpanded && (
                <div className="border-t border-slate-200 p-5 space-y-5 bg-gradient-to-b from-slate-50 to-white text-xs">
                  {/* Pathophysiology & Mechanism */}
                  <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1.5">
                    <div className="font-bold text-slate-900 flex items-center space-x-1.5">
                      <HeartPulse className="w-4 h-4 text-blue-600" />
                      <span>Cơ chế sinh lý bệnh (Pathophysiology):</span>
                    </div>
                    <p className="text-slate-700 leading-relaxed">{protocol.pathophysiology}</p>
                  </div>

                  {/* Diagnostic criteria */}
                  <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2">
                    <div className="font-bold text-slate-900 flex items-center space-x-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Tiêu chuẩn chẩn đoán xác định:</span>
                    </div>
                    <ul className="list-disc pl-5 space-y-1 text-slate-700">
                      {protocol.diagnosticCriteria.map((crit, idx) => (
                        <li key={idx}>{crit}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Stepped Treatment Protocol */}
                  <div className="space-y-2.5">
                    <div className="font-bold text-slate-900 flex items-center space-x-1.5">
                      <ShieldAlert className="w-4 h-4 text-blue-600" />
                      <span>Các bước xử trí lâm sàng chuẩn y khoa:</span>
                    </div>
                    <div className="space-y-2">
                      {protocol.treatmentSteps.map((step, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1 shadow-xs"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-900 text-xs sm:text-sm">
                              {step.title}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                step.priority === 'Khẩn cấp'
                                  ? 'bg-rose-100 text-rose-800'
                                  : step.priority === 'Quan trọng'
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-blue-100 text-blue-800'
                              }`}
                            >
                              {step.priority}
                            </span>
                          </div>
                          <p className="text-slate-700 leading-relaxed">{step.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pitfalls & Clinical Pearls */}
                  {protocol.pitfallsAndWarnings.length > 0 && (
                    <div className="p-4 rounded-xl bg-rose-50/80 border border-rose-200 space-y-2">
                      <div className="font-bold text-rose-950 flex items-center space-x-1.5">
                        <AlertTriangle className="w-4 h-4 text-rose-600" />
                        <span>Cạm bẫy lâm sàng & Cảnh báo cốt tử:</span>
                      </div>
                      <ul className="list-disc pl-5 space-y-1 font-medium text-rose-900">
                        {protocol.pitfallsAndWarnings.map((warn, idx) => (
                          <li key={idx}>{warn}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Reference footer */}
                  <div className="text-[11px] text-slate-500 italic pt-2 border-t border-slate-100">
                    Trích dẫn y văn: {protocol.sourceReference}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
