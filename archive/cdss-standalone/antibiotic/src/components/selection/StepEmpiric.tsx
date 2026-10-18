import React, { useState } from 'react';
import {
  InfectionSite,
  Population,
  RiskGroup,
  SepsisSource,
  SpecificPathogenRisk,
  EmpiricRegimen,
  AntibiogramDataset
} from '../../selection/types';
import { getEmpiricRegimens, getAntibiogramForSite } from '../../selection/engine';
import { SourceBadge } from './SourceBadge';

interface StepEmpiricProps {
  site: InfectionSite;
  population: Population;
  riskGroup: RiskGroup;
  sepsisSource?: SepsisSource;
  specificRisks: SpecificPathogenRisk[];
  onSelectDrugForDosing: (drugId: string) => void;
  onNextStep: () => void;
  onPrevStep: () => void;
}

export const StepEmpiric: React.FC<StepEmpiricProps> = ({
  site,
  population,
  riskGroup,
  sepsisSource,
  specificRisks,
  onSelectDrugForDosing,
  onNextStep,
  onPrevStep
}) => {
  const [activeTab, setActiveTab] = useState<'regimens' | 'antibiogram'>('regimens');

  // Lấy danh sách phác đồ khởi đầu theo phân tầng
  const regimens: EmpiricRegimen[] = getEmpiricRegimens(
    site,
    population,
    riskGroup,
    sepsisSource,
    specificRisks
  );

  // Lấy dữ liệu vi sinh tại chỗ
  const antibiogramData: AntibiogramDataset | undefined = getAntibiogramForSite(site, population);

  return (
    <div className="space-y-6">
      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">
              Bước 4
            </span>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              Phác đồ Kháng sinh Khởi đầu & Dữ liệu Vi sinh
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Lựa chọn phác đồ kinh nghiệm tối ưu theo phân tầng nguy cơ ({riskGroup === 'group_1' ? 'Nhóm 1 - Nguy cơ thấp' : 'Nhóm 2 - Nguy cơ cao VKĐK'}) và tham khảo độ nhạy cảm tại chỗ BV Bệnh Nhiệt Đới.
          </p>
        </div>

        {/* Tab switch */}
        <div className="inline-flex p-1 bg-slate-100 dark:bg-slate-800/80 rounded-lg border border-slate-200 dark:border-slate-700">
          <button
            type="button"
            onClick={() => setActiveTab('regimens')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              activeTab === 'regimens'
                ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            📋 Phác đồ Khuyến cáo ({regimens.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('antibiogram')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              activeTab === 'antibiogram'
                ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            🧫 Vi sinh & KSĐ tại chỗ
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {activeTab === 'regimens' && (
        <div className="space-y-6">
          {/* Cảnh báo phân tầng */}
          <div className={`p-4 rounded-xl border text-sm ${
            riskGroup === 'group_2'
              ? 'bg-amber-50/80 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800/50 text-amber-900 dark:text-amber-200'
              : 'bg-emerald-50/80 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/50 text-emerald-900 dark:text-emerald-200'
          }`}>
            <div className="flex items-start gap-2.5">
              <span className="text-lg">
                {riskGroup === 'group_2' ? '⚠️' : '✅'}
              </span>
              <div>
                <strong className="font-semibold">
                  {riskGroup === 'group_2'
                    ? 'Bệnh nhân thuộc Nhóm 2 (Nguy cơ cao vi khuẩn đa kháng hoặc bệnh cảnh nặng):'
                    : 'Bệnh nhân thuộc Nhóm 1 (Ít nguy cơ vi khuẩn đa kháng):'}
                </strong>
                <p className="text-xs mt-1 leading-relaxed opacity-90">
                  {riskGroup === 'group_2'
                    ? 'Bắt buộc sử dụng kháng sinh phổ rộng theo lưu đồ BVBND (BL-BLI liều cao hoặc Carbapenem), có thể cần phối hợp bao phủ MRSA nếu có chỉ định. Luôn lấy cấy máu và bệnh phẩm trước liều đầu tiên.'
                    : 'Ưu tiên kháng sinh phổ hẹp hoặc phổ trung bình phù hợp. Hạn chế lạm dụng nhóm Carbapenem, Colistin hay Vancomycin khi chưa có bằng chứng vi sinh.'}
                </p>
              </div>
            </div>
          </div>

          {/* Danh sách các phác đồ */}
          {regimens.length === 0 ? (
            <div className="p-8 text-center bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                Không tìm thấy phác đồ đặc hiệu cho tổ hợp tiêu chí hiện tại. Vui lòng kiểm tra lại bối cảnh lâm sàng hoặc hội chẩn chuyên khoa Truyền nhiễm / Dược lâm sàng.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5">
              {regimens.map((regimen) => (
                <div
                  key={regimen.id}
                  className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs hover:border-blue-300 dark:hover:border-blue-700 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-4 border-b border-slate-100 dark:border-slate-800">
                    <div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                        {regimen.titleVi}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                        {regimen.titleEn}
                      </p>
                    </div>
                    <SourceBadge source={regimen.source} />
                  </div>

                  {/* Danh sách thuốc */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                      Thuốc lựa chọn & Liều khuyến cáo:
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {regimen.drugs.map((drug, dIdx) => (
                        <div
                          key={dIdx}
                          className="p-3.5 rounded-lg border border-slate-100 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-800/40 flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-start justify-between gap-2">
                              <span className="font-bold text-sm text-blue-900 dark:text-blue-300">
                                {drug.drugName}
                              </span>
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                                {drug.route}
                              </span>
                            </div>
                            <div className="mt-1.5 text-xs text-slate-700 dark:text-slate-300">
                              <span className="font-semibold text-slate-900 dark:text-slate-100">
                                Liều chuẩn:
                              </span>{' '}
                              {drug.dosageVi}
                            </div>
                            {drug.infusionNoteVi && (
                              <div className="mt-1 text-[11px] text-amber-700 dark:text-amber-400 flex items-center gap-1 font-medium">
                                <span>⏱️</span>
                                <span>{drug.infusionNoteVi}</span>
                              </div>
                            )}
                          </div>

                          {/* Nút hành động tính liều */}
                          {drug.drugId && (
                            <div className="mt-3 pt-2.5 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
                              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                                Có sẵn công cụ tính liều
                              </span>
                              <button
                                type="button"
                                onClick={() => onSelectDrugForDosing(drug.drugId!)}
                                className="px-2.5 py-1 text-xs font-semibold rounded-md bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-all flex items-center gap-1"
                              >
                                Tính liều chi tiết
                                <span>→</span>
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quy tắc phối hợp */}
                  {regimen.combinationRulesVi && regimen.combinationRulesVi.length > 0 && (
                    <div className="mt-4 p-3 rounded-lg bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40">
                      <h4 className="text-xs font-bold text-blue-900 dark:text-blue-300 mb-1 flex items-center gap-1.5">
                        <span>💡</span> Quy tắc phối hợp lâm sàng:
                      </h4>
                      <ul className="list-disc list-inside text-xs text-slate-700 dark:text-slate-300 space-y-1">
                        {regimen.combinationRulesVi.map((rule, rIdx) => (
                          <li key={rIdx}>{rule}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Chú ý & Cảnh báo an toàn */}
                  {regimen.cautionVi && regimen.cautionVi.length > 0 && (
                    <div className="mt-3 p-3 rounded-lg bg-rose-50/50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/40">
                      <h4 className="text-xs font-bold text-rose-900 dark:text-rose-300 mb-1 flex items-center gap-1.5">
                        <span>⚠️</span> Chú ý an toàn & Chống chỉ định phối hợp:
                      </h4>
                      <ul className="list-disc list-inside text-xs text-rose-800 dark:text-rose-300 space-y-1">
                        {regimen.cautionVi.map((c, cIdx) => (
                          <li key={cIdx}>{c}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab Antibiogram */}
      {activeTab === 'antibiogram' && (
        <div className="space-y-5">
          {antibiogramData ? (
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                    Dữ liệu Vi sinh & Kháng sinh đồ tại chỗ (Nhiễm trùng {site === 'respiratory' ? 'Hô hấp' : site === 'peritoneal' ? 'Ổ bụng' : site === 'urinary' ? 'Tiết niệu' : 'Toàn thân'})
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Thời gian khảo sát: {antibiogramData.period} | Tổng số mẫu phân lập: {antibiogramData.sampleTotal} chủng
                  </p>
                </div>
                <SourceBadge source={antibiogramData.source} />
              </div>

              {/* Bảng vi khuẩn */}
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 font-semibold">
                      <th className="py-2.5 px-3">Tác nhân gây bệnh</th>
                      <th className="py-2.5 px-3 text-center">Tỷ lệ phân lập</th>
                      <th className="py-2.5 px-3">Độ nhạy cảm với kháng sinh thường dùng</th>
                      <th className="py-2.5 px-3">Đặc điểm kháng thuốc</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                    {antibiogramData.organisms.map((org, oIdx) => (
                      <tr key={oIdx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                        <td className="py-3 px-3 font-semibold text-slate-900 dark:text-slate-100">
                          {org.organismName}
                          <div className="text-[11px] text-slate-500 font-normal">
                            (n = {org.sampleCount})
                          </div>
                        </td>
                        <td className="py-3 px-3 text-center font-bold text-blue-600 dark:text-blue-400">
                          {org.pctOfIsolates}%
                        </td>
                        <td className="py-3 px-3">
                          <div className="flex flex-wrap gap-1.5">
                            {org.sensitivities.map((s, sIdx) => {
                              const isHigh = s.sensitivityPct >= 70;
                              const isLow = s.sensitivityPct < 40;
                              return (
                                <span
                                  key={sIdx}
                                  className={`px-2 py-0.5 rounded text-[11px] font-medium border ${
                                    isHigh
                                      ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                                      : isLow
                                      ? 'bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800'
                                      : 'bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800'
                                  }`}
                                  title={`${s.antibioticName}: ${s.sensitivityPct}% nhạy`}
                                >
                                  {s.antibioticName}: <strong className="font-bold">{s.sensitivityPct}%</strong>
                                </span>
                              );
                            })}
                          </div>
                        </td>
                        <td className="py-3 px-3 text-rose-600 dark:text-rose-400 font-medium">
                          {org.notableResistance || '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                Chưa có dữ liệu Antibiogram riêng cho vị trí nhiễm trùng này. Vui lòng tham khảo báo cáo vi sinh chung của Bệnh viện Bệnh Nhiệt Đới năm 2024.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={onPrevStep}
          className="px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition-all"
        >
          ← Quay lại Bước 3 (Yếu tố nguy cơ)
        </button>
        <button
          type="button"
          onClick={onNextStep}
          className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-all flex items-center gap-2"
        >
          Tiếp tục: Bước 5 (Đánh giá lại 48-72h) →
        </button>
      </div>
    </div>
  );
};
