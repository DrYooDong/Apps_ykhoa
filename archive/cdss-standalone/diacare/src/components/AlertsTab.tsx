import React, { useState } from 'react';
import { 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  HeartCrack, 
  Flame, 
  Droplet, 
  Stethoscope, 
  Info,
  ChevronDown,
  ChevronUp,
  Zap,
  Activity
} from 'lucide-react';
import { PatientData, ClinicalAlert, GlucoseUnit } from '../types/cdss';
import { getHypoProtocol, normalizeToMmolL, normalizeToMgDl, calculateAnionGap, calculateEffectiveOsmolality } from '../utils/calculations';

interface AlertsTabProps {
  patient: PatientData;
  alerts: ClinicalAlert[];
  unit: GlucoseUnit;
}

export const AlertsTab: React.FC<AlertsTabProps> = ({
  patient,
  alerts,
  unit,
}) => {
  const currentGlucoseMmol = normalizeToMmolL(patient.currentGlucose, patient.unit);
  const currentGlucoseMgDl = normalizeToMgDl(patient.currentGlucose, patient.unit);

  const [selectedHypoAlgorithm, setSelectedHypoAlgorithm] = useState<'A' | 'B' | 'C' | 'D' | 'E'>(
    patient.dietType === 'ENTERAL_TUBE' ? 'E' :
    patient.dietType === 'NPO' ? 'D' :
    currentGlucoseMmol < 3.0 ? 'B' : 'A'
  );

  const activeHypoDetails = getHypoProtocol({ ...patient, dietType: selectedHypoAlgorithm === 'E' ? 'ENTERAL_TUBE' : selectedHypoAlgorithm === 'D' ? 'NPO' : patient.dietType }, currentGlucoseMmol);

  const [expandedAlertId, setExpandedAlertId] = useState<string | null>(null);

  const criticalAlerts = alerts.filter(a => a.level === 'CRITICAL');
  const warningAlerts = alerts.filter(a => a.level === 'WARNING');
  const infoAlerts = alerts.filter(a => a.level === 'INFO');

  // Chemistry for DKA/HHS
  const effectiveOsm = (patient.sodium && currentGlucoseMmol) ? calculateEffectiveOsmolality(patient.sodium, currentGlucoseMmol) : null;
  const anionGap = (patient.sodium && patient.potassium && patient.chloride && patient.bicarbonate)
    ? calculateAnionGap(patient.sodium, patient.potassium, patient.chloride, patient.bicarbonate)
    : null;

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-8">
      {/* Overview Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-sm border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <ShieldAlert className="w-5 h-5 text-teal-400" />
            <h3 className="font-bold text-base">Hệ Thống Cảnh Báo An Toàn & Phác Đồ Cấp Cứu</h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Tự động giám sát rủi ro hạ đường huyết, toan ceton (DKA), tăng ALTT (HHS) và chống chỉ định thuốc
          </p>
        </div>
        <div className="flex items-center space-x-2 text-xs font-bold">
          <span className="px-3 py-1 rounded-lg bg-red-950/80 text-red-300 border border-red-800">
            {criticalAlerts.length} Báo động đỏ
          </span>
          <span className="px-3 py-1 rounded-lg bg-amber-950/80 text-amber-300 border border-amber-800">
            {warningAlerts.length} Cảnh báo vàng
          </span>
        </div>
      </div>

      {/* Dynamic Alerts List */}
      <div className="space-y-3">
        {criticalAlerts.map((alert) => (
          <div
            key={alert.id}
            className="bg-red-50 dark:bg-red-950/40 border-2 border-red-500 rounded-2xl p-4 shadow-sm transition"
          >
            <div className="flex items-start space-x-3">
              <div className="p-2 rounded-xl bg-red-600 text-white shrink-0 mt-0.5 animate-pulse">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="flex-1 space-y-1.5">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-extrabold text-red-900 dark:text-red-200">
                    {alert.title}
                  </h4>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-red-200 dark:bg-red-900 text-red-800 dark:text-red-200">
                    BÁO ĐỘNG ĐỎ
                  </span>
                </div>
                <p className="text-xs text-red-800 dark:text-red-300 leading-relaxed font-medium">
                  {alert.message}
                </p>
                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-red-300 dark:border-red-900 text-xs text-slate-800 dark:text-slate-200 mt-2 space-y-1">
                  <span className="font-bold text-red-600 block">Hướng dẫn xử trí lâm sàng ngay:</span>
                  <p className="leading-relaxed">{alert.actionGuideline}</p>
                  <p className="text-[10px] text-slate-500 pt-1 border-t border-slate-100 dark:border-slate-800">
                    Căn cứ phác đồ: {alert.citation}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}

        {warningAlerts.map((alert) => (
          <div
            key={alert.id}
            className="bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 rounded-2xl p-4 shadow-sm"
          >
            <div className="flex items-start space-x-3">
              <div className="p-1.5 rounded-lg bg-amber-500 text-white shrink-0 mt-0.5">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs sm:text-sm font-bold text-amber-900 dark:text-amber-200">
                    {alert.title}
                  </h4>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-200 dark:bg-amber-900 text-amber-800 dark:text-amber-200">
                    CẢNH BÁO
                  </span>
                </div>
                <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
                  {alert.message}
                </p>
                <div className="text-xs text-slate-700 dark:text-slate-300 bg-white/80 dark:bg-slate-900/80 p-2.5 rounded-xl border border-amber-200 dark:border-amber-800/60 mt-1">
                  <span className="font-semibold text-amber-800 dark:text-amber-300">Hành động:</span> {alert.actionGuideline}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Emergency Deep-Dive Accordions: 1. Hypoglycaemia Protocols, 2. DKA / HHS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
        {/* Hypoglycemia Card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
          <div className="flex items-center space-x-2 pb-3 border-b border-slate-100 dark:border-slate-700">
            <div className="p-1.5 rounded-lg bg-red-100 dark:bg-red-950 text-red-600">
              <HeartCrack className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm sm:text-base">
                Phác Đồ Xử Trí Hạ Đường Huyết (JBDS-IP 01)
              </h3>
              <p className="text-[11px] text-slate-500">Nguyên tắc "Make 4 the floor" (ĐH &lt; 4.0 mmol/L là cấp cứu)</p>
            </div>
          </div>

          {/* Algorithm Selector Buttons (A, B, C, D, E) */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">
              Chọn tình trạng người bệnh để tra phác đồ:
            </label>
            <div className="grid grid-cols-5 gap-1.5">
              {[
                { id: 'A', label: 'Nhóm A', desc: 'Tỉnh, nuốt được' },
                { id: 'B', label: 'Nhóm B', desc: 'Lú lẫn / Kích động' },
                { id: 'C', label: 'Nhóm C', desc: 'Hôn mê / Co giật' },
                { id: 'D', label: 'Nhóm D', desc: 'Nhịn ăn (NPO)' },
                { id: 'E', label: 'Nhóm E', desc: 'Sonde dạ dày' },
              ].map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => setSelectedHypoAlgorithm(btn.id as any)}
                  className={`p-2 rounded-xl border text-center transition flex flex-col items-center justify-center ${
                    selectedHypoAlgorithm === btn.id
                      ? 'bg-teal-600 text-white border-teal-600 font-bold shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-xs">{btn.label}</span>
                  <span className="text-[9px] line-clamp-1 opacity-80">{btn.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Detailed Display of Selected Algorithm */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                {activeHypoDetails.title}
              </h4>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300">
                Phác đồ {activeHypoDetails.algorithmPathway}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="font-semibold text-slate-700 dark:text-slate-300">Xử trí tức thì:</div>
              <ul className="space-y-1 text-slate-600 dark:text-slate-400 pl-1">
                {activeHypoDetails.immediateAction.map((step, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {step}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
              <span className="font-semibold text-teal-600 block">Kiểm tra lại sau 10 - 15 phút:</span>
              <p className="text-slate-600 dark:text-slate-400">{activeHypoDetails.retestInstructions}</p>
            </div>

            <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs space-y-1 text-emerald-900 dark:text-emerald-200">
              <span className="font-semibold block">Khi đường huyết đã hồi phục (&ge; 4.0 mmol/L):</span>
              <p>{activeHypoDetails.recoveryStep}</p>
            </div>

            <div className="border-t border-slate-200 dark:border-slate-800 pt-2 text-[11px] text-rose-700 dark:text-rose-400 space-y-0.5 font-medium">
              <span className="font-bold">Lưu ý an toàn cốt lõi:</span>
              {activeHypoDetails.criticalNotes.map((note, idx) => (
                <div key={idx}>• {note}</div>
              ))}
            </div>
          </div>
        </div>

        {/* DKA & HHS Management Card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
          <div className="flex items-center space-x-2 pb-3 border-b border-slate-100 dark:border-slate-700">
            <div className="p-1.5 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-600">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm sm:text-base">
                Cấp Cứu Toan Ceton (DKA) & Tăng ALTT (HHS)
              </h3>
              <p className="text-[11px] text-slate-500">Phác đồ bù dịch, Insulin truyền TM & Bù Kali (JBDS-IP 02 / 06)</p>
            </div>
          </div>

          {/* Diagnostic Criteria Comparison Table */}
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
            <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700 text-left">
              <thead className="bg-slate-100 dark:bg-slate-900 font-bold text-slate-700 dark:text-slate-300">
                <tr>
                  <th className="py-2 px-2.5">Tiêu chí</th>
                  <th className="py-2 px-2.5">Toan Ceton (DKA)</th>
                  <th className="py-2 px-2.5">Tăng ALTT (HHS)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                <tr>
                  <td className="py-1.5 px-2.5 font-medium">Đường huyết</td>
                  <td className="py-1.5 px-2.5 font-bold text-rose-600">&gt; 11 mmol/L (hoặc bình thường nếu dùng SGLT2i)</td>
                  <td className="py-1.5 px-2.5 font-bold text-purple-600">&ge; 30 mmol/L (&ge; 600 mg/dL)</td>
                </tr>
                <tr>
                  <td className="py-1.5 px-2.5 font-medium">Ceton máu</td>
                  <td className="py-1.5 px-2.5 font-bold text-rose-600">&ge; 3.0 mmol/L (hoặc que tiểu &ge; 2+)</td>
                  <td className="py-1.5 px-2.5">&lt; 3.0 mmol/L (không đáng kể)</td>
                </tr>
                <tr>
                  <td className="py-1.5 px-2.5 font-medium">Toan máu</td>
                  <td className="py-1.5 px-2.5 font-bold text-rose-600">pH &lt; 7.3 và/hoặc HCO3 &lt; 15 mmol/L</td>
                  <td className="py-1.5 px-2.5">pH &ge; 7.3, HCO3 &ge; 15 mmol/L</td>
                </tr>
                <tr>
                  <td className="py-1.5 px-2.5 font-medium">Áp lực thẩm thấu</td>
                  <td className="py-1.5 px-2.5">Có thể bình thường hoặc tăng nhẹ</td>
                  <td className="py-1.5 px-2.5 font-bold text-purple-600">&ge; 320 mOsm/kg (mất nước 10-22L)</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Step-by-Step Emergency Execution Guide */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 text-xs">
            <h4 className="font-bold text-slate-800 dark:text-slate-200 flex items-center space-x-1.5">
              <Droplet className="w-4 h-4 text-teal-600" />
              <span>Phác đồ Bù dịch NaCl 0.9% & Thay đổi Insulin theo mốc:</span>
            </h4>

            <div className="space-y-1.5 text-slate-600 dark:text-slate-400 pl-1">
              <div><strong>• Giờ 1:</strong> Truyền nhanh 1000ml NaCl 0.9% (500ml nếu sốt/tụt HA). Cẩn trọng ở người già, suy tim.</div>
              <div><strong>• Giờ 2 - 3:</strong> 1000ml NaCl 0.9% trong 2 giờ (+ KCl nếu Kali &le; 5.5).</div>
              <div><strong>• Giờ 4 - 5:</strong> 1000ml NaCl 0.9% trong 2 giờ (+ KCl).</div>
              <div><strong>• Giờ 6 - 9:</strong> 1000ml NaCl 0.9% trong 4 giờ.</div>
            </div>

            {/* Potassium Rule Box */}
            <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/50 border border-amber-300 dark:border-amber-800 text-[11px] text-amber-900 dark:text-amber-200 space-y-1">
              <span className="font-bold block text-xs">Quy tắc Bù Kali (K+) sống còn:</span>
              <div>• K+ &gt; 5.5 mmol/L: <strong>KHÔNG pha thêm Kali</strong> vào chai dịch truyền. Thử lại mỗi 2 giờ.</div>
              <div>• K+ 3.5 - 5.5 mmol/L: Pha <strong>40 mmol KCl</strong> vào mỗi chai 1000ml dịch truyền.</div>
              <div>• K+ &lt; 3.5 mmol/L: <strong>TẠM HOÃN INSULIN</strong>, bù Kali khẩn trương vì insulin đẩy Kali vào tế bào gây ngừng tim!</div>
            </div>

            {/* Dextrose 10% Trigger Rule */}
            <div className="p-3 rounded-lg bg-teal-50 dark:bg-teal-950/50 border border-teal-300 dark:border-teal-800 text-[11px] text-teal-900 dark:text-teal-200 space-y-1">
              <span className="font-bold block text-xs">Quy tắc vàng khi ĐH &lt; 14 mmol/L (&lt; 250 mg/dL):</span>
              <p>
                BẮT BUỘC bắt đầu truyền Glucose 10% tốc độ 125 ml/h song song với NaCl 0.9%, đồng thời cân nhắc giảm tốc độ insulin tĩnh mạch FRIII từ 0.1 xuống <strong>0.05 ĐV/kg/h</strong> để tránh tụt đường huyết và hạ Kali máu.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
