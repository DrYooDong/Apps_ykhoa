import React, { useMemo } from 'react';
import {
  Activity,
  HeartPulse,
  Thermometer,
  Wind,
  Stethoscope,
  Brain,
  AlertTriangle,
  FileCheck,
  Flame,
  Layers,
  Sparkles,
} from 'lucide-react';
import { SoapObjective } from '../../types.ts';
import { FormattedClinicalText } from './FormattedClinicalText.tsx';

interface SoapObjectiveColumnProps {
  o: SoapObjective;
  isFocused?: boolean;
}

export const SoapObjectiveColumn: React.FC<SoapObjectiveColumnProps> = ({
  o,
  isFocused = false,
}) => {
  // Tính toán các chỉ số cảnh báo sinh hiệu thông minh
  const vitalsAnalysis = useMemo(() => {
    const v = o.vitals || {};
    const alerts: { text: string; severity: 'danger' | 'warning' }[] = [];

    // Parse huyết áp
    let systolic = 0;
    let diastolic = 0;
    let pulseNum = 0;

    if (v.bp) {
      const parts = v.bp.replace(/[^\d/]/g, '').split('/');
      if (parts.length === 2) {
        systolic = parseInt(parts[0], 10) || 0;
        diastolic = parseInt(parts[1], 10) || 0;
      }
    }

    if (v.pulse) {
      pulseNum = parseInt(v.pulse.replace(/\D/g, ''), 10) || 0;
    }

    // Hiệu áp kẹp hoặc tụt HA
    if (systolic > 0 && diastolic > 0) {
      const pulsePressure = systolic - diastolic;
      if (pulsePressure <= 20) {
        alerts.push({ text: `Huyết áp kẹp (Δ = ${pulsePressure} mmHg)`, severity: 'danger' });
      } else if (systolic < 90) {
        alerts.push({ text: `Hạ huyết áp (HATT = ${systolic} mmHg)`, severity: 'danger' });
      }
    }

    // Shock Index = Mạch / HATT
    let shockIndex: number | null = null;
    if (pulseNum > 0 && systolic > 0) {
      shockIndex = parseFloat((pulseNum / systolic).toFixed(2));
      if (shockIndex >= 1.0) {
        alerts.push({ text: `Shock Index cao: ${shockIndex} (Nguy cơ sốc mất bù)`, severity: 'danger' });
      } else if (shockIndex >= 0.8) {
        alerts.push({ text: `Shock Index cảnh báo: ${shockIndex}`, severity: 'warning' });
      }
    }

    // Mạch nhanh / chậm
    if (pulseNum >= 100) {
      alerts.push({ text: `Nhịp tim nhanh (${pulseNum} l/p)`, severity: 'warning' });
    } else if (pulseNum > 0 && pulseNum < 60) {
      alerts.push({ text: `Nhịp tim chậm (${pulseNum} l/p)`, severity: 'warning' });
    }

    // SpO2
    if (v.spo2) {
      const spo2Num = parseInt(v.spo2.replace(/\D/g, ''), 10) || 0;
      if (spo2Num > 0 && spo2Num < 95) {
        alerts.push({ text: `Giảm oxy máu (SpO₂ = ${spo2Num}%)`, severity: 'danger' });
      }
    }

    // Thân nhiệt
    if (v.temp) {
      const tempNum = parseFloat(v.temp.replace(/[^\d.]/g, '')) || 0;
      if (tempNum >= 38.5) {
        alerts.push({ text: `Sốt cao (${tempNum}°C)`, severity: 'warning' });
      } else if (tempNum > 0 && tempNum < 36.0) {
        alerts.push({ text: `Hạ thân nhiệt (${tempNum}°C - Dấu hiệu nặng)`, severity: 'danger' });
      }
    }

    return { systolic, diastolic, pulseNum, shockIndex, alerts };
  }, [o.vitals]);

  // Phân tích bóc tách các hệ cơ quan trong khám thực thể
  const organSystems = useMemo(() => {
    if (!o.physicalExam) return [];
    const text = o.physicalExam;
    const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);
    const systems: { title: string; icon: string; content: string }[] = [];

    // Duyệt tìm các đoạn khám cơ quan
    lines.forEach((line) => {
      const match = line.match(/^[-*•]?\s*(\*\*|""|\[)?(Tổng trạng|Da niêm|Hô hấp|Tim mạch|Tiêu hóa|Bụng|Thần kinh|Khám chuyên khoa|Cơ quan[^:*]*)[^:]*[:"]*\s*(.*)$/i);
      if (match) {
        const title = match[2].trim();
        let icon = 'stethoscope';
        if (/tổng trạng|tri giác|tinh thần/i.test(title)) icon = 'brain';
        else if (/da niêm|chi mạch|tưới máu/i.test(title)) icon = 'heart';
        else if (/hô hấp|phổi/i.test(title)) icon = 'wind';
        else if (/tim/i.test(title)) icon = 'pulse';
        else if (/tiêu hóa|bụng|gan/i.test(title)) icon = 'activity';

        systems.push({
          title: title,
          icon,
          content: match[3]?.replace(/["*]/g, '').trim() || '',
        });
      }
    });

    return systems;
  }, [o.physicalExam]);

  return (
    <div className="bg-white border border-slate-300 rounded-2xl shadow-xs flex flex-col overflow-hidden hover:border-slate-400 transition-colors h-full">
      {/* Column Header */}
      <div className="bg-gradient-to-r from-slate-800 via-slate-850 to-slate-900 text-white p-3.5 px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md bg-white/20 flex items-center justify-center font-display font-black text-sm text-white shadow-inner">
            O
          </div>
          <div>
            <h3 className="font-display font-bold text-xs uppercase tracking-wider">
              OBJECTIVE
            </h3>
            <p className="text-[10.5px] text-slate-300">
              Khách quan · Khám lâm sàng &amp; Cận lâm sàng
            </p>
          </div>
        </div>
        <span className="px-2.5 py-0.5 rounded-full bg-slate-950 text-slate-200 text-[10px] font-mono-custom font-semibold border border-slate-700 flex items-center gap-1">
          <span>📐</span>
          <span>Đo lường</span>
        </span>
      </div>

      <div className={`p-4 flex-1 flex flex-col gap-4 text-xs text-slate-800 bg-white ${isFocused ? 'max-w-5xl mx-auto w-full' : ''}`}>
        {/* 1. DẤU HIỆU SINH TỒN (SMART VITALS MONITOR) */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-slate-700" />
              <span>1. Dấu hiệu sinh tồn (Vitals):</span>
            </span>
            {vitalsAnalysis.shockIndex !== null && (
              <span className={`text-[10px] font-mono-custom font-bold px-2 py-0.5 rounded border ${
                vitalsAnalysis.shockIndex >= 1.0
                  ? 'bg-rose-100 text-rose-800 border-rose-300 animate-pulse'
                  : 'bg-slate-100 text-slate-700 border-slate-200'
              }`}>
                Shock Index: {vitalsAnalysis.shockIndex}
              </span>
            )}
          </div>

          {/* Grid 6 Vitals Box */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 font-mono-custom text-center">
            {/* Nhiệt độ */}
            <div className="bg-slate-50 border border-slate-200/90 rounded-xl p-2.5 flex flex-col items-center justify-center shadow-2xs">
              <span className="text-[9.5px] text-slate-500 font-sans flex items-center gap-0.5">
                <Thermometer className="w-3 h-3 text-amber-600" />
                Nhiệt độ
              </span>
              <b className="text-[13px] text-slate-900 mt-0.5">
                {o.vitals?.temp || '—'}°C
              </b>
            </div>

            {/* Mạch */}
            <div className="bg-slate-50 border border-slate-200/90 rounded-xl p-2.5 flex flex-col items-center justify-center shadow-2xs">
              <span className="text-[9.5px] text-slate-500 font-sans flex items-center gap-0.5">
                <HeartPulse className="w-3 h-3 text-rose-600" />
                Mạch
              </span>
              <b className={`text-[13px] mt-0.5 ${
                vitalsAnalysis.pulseNum >= 100 || (vitalsAnalysis.pulseNum > 0 && vitalsAnalysis.pulseNum < 60)
                  ? 'text-rose-700 font-black'
                  : 'text-slate-900'
              }`}>
                {o.vitals?.pulse || '—'} <span className="text-[9px] font-normal text-slate-500">l/p</span>
              </b>
            </div>

            {/* Huyết áp */}
            <div className={`border rounded-xl p-2.5 flex flex-col items-center justify-center shadow-2xs ${
              vitalsAnalysis.systolic > 0 && (vitalsAnalysis.systolic - vitalsAnalysis.diastolic <= 20 || vitalsAnalysis.systolic < 90)
                ? 'bg-rose-50/80 border-rose-300'
                : 'bg-slate-50 border-slate-200/90'
            }`}>
              <span className="text-[9.5px] text-slate-500 font-sans flex items-center gap-0.5">
                <Activity className="w-3 h-3 text-sky-600" />
                Huyết áp
              </span>
              <b className={`text-[13px] mt-0.5 ${
                vitalsAnalysis.systolic > 0 && (vitalsAnalysis.systolic - vitalsAnalysis.diastolic <= 20 || vitalsAnalysis.systolic < 90)
                  ? 'text-rose-700 font-black'
                  : 'text-slate-900'
              }`}>
                {o.vitals?.bp || '—'}
              </b>
            </div>

            {/* Nhịp thở */}
            <div className="bg-slate-50 border border-slate-200/90 rounded-xl p-2.5 flex flex-col items-center justify-center shadow-2xs">
              <span className="text-[9.5px] text-slate-500 font-sans flex items-center gap-0.5">
                <Wind className="w-3 h-3 text-cyan-600" />
                Nhịp thở
              </span>
              <b className="text-[13px] text-slate-900 mt-0.5">
                {o.vitals?.resp || '—'} <span className="text-[9px] font-normal text-slate-500">l/p</span>
              </b>
            </div>

            {/* SpO2 */}
            <div className="bg-slate-50 border border-slate-200/90 rounded-xl p-2.5 flex flex-col items-center justify-center shadow-2xs">
              <span className="text-[9.5px] text-slate-500 font-sans flex items-center gap-0.5">
                <span className="text-emerald-600 text-xs">O₂</span>
                SpO₂
              </span>
              <b className="text-[13px] text-emerald-700 mt-0.5">
                {o.vitals?.spo2 || '—'}%
              </b>
            </div>

            {/* BMI */}
            <div className="bg-slate-50 border border-slate-200/90 rounded-xl p-2.5 flex flex-col items-center justify-center shadow-2xs">
              <span className="text-[9.5px] text-slate-500 font-sans">BMI</span>
              <b className="text-[13px] text-slate-900 mt-0.5">
                {o.vitals?.bmi || '—'}
              </b>
            </div>
          </div>

          {/* Dải cảnh báo sinh hiệu nếu có bất thường */}
          {vitalsAnalysis.alerts.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {vitalsAnalysis.alerts.map((alert, idx) => (
                <span
                  key={idx}
                  className={`px-2 py-0.5 rounded-md text-[10.5px] font-semibold flex items-center gap-1 border ${
                    alert.severity === 'danger'
                      ? 'bg-rose-50 text-rose-800 border-rose-300'
                      : 'bg-amber-50 text-amber-800 border-amber-300'
                  }`}
                >
                  <AlertTriangle className="w-3 h-3 shrink-0" />
                  <span>{alert.text}</span>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* 2. KHÁM THỰC THỂ THEO HỆ CƠ QUAN */}
        <div>
          <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] block mb-1.5 flex items-center gap-1.5">
            <Stethoscope className="w-3.5 h-3.5 text-slate-700" />
            <span>2. Khám thực thể định hướng:</span>
          </span>

          {organSystems.length > 1 ? (
            <div className="grid gap-2 grid-cols-1 sm:grid-cols-2">
              {organSystems.map((sys, idx) => (
                <div
                  key={idx}
                  className="p-2.5 bg-slate-50/80 rounded-xl border border-slate-200/90 shadow-2xs flex flex-col gap-1"
                >
                  <div className="flex items-center gap-1.5 font-bold text-slate-900 text-[11px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                    <span>{sys.title}</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed text-[11.5px]">
                    {sys.content}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <FormattedClinicalText
              text={o.physicalExam}
              className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80"
            />
          )}
        </div>

        {/* 3. CẬN LÂM SÀNG & XÉT NGHIỆM ĐỊNH LƯỢNG */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <FileCheck className="w-3.5 h-3.5 text-slate-700" />
              <span>3. Cận lâm sàng &amp; Xét nghiệm định lượng:</span>
            </span>
            <span className="text-[10px] text-slate-500 font-semibold">
              Giá trị đo lường
            </span>
          </div>

          {o.labGroups && o.labGroups.length > 0 ? (
            <div className={`grid gap-2 ${isFocused ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
              {o.labGroups.map((g, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50/90 border border-slate-200/90 rounded-xl p-3 text-[11px] shadow-2xs flex flex-col gap-1.5"
                >
                  <div className="font-bold text-slate-900 text-[11.5px] flex items-center gap-1.5 pb-1 border-b border-slate-200/60">
                    <span className="w-2 h-2 rounded-full bg-slate-700" />
                    <span>{g.groupName}</span>
                  </div>
                  <FormattedClinicalText
                    text={g.content}
                    className="font-mono-custom text-[11px] text-slate-800 leading-relaxed"
                  />
                </div>
              ))}
            </div>
          ) : (
            <FormattedClinicalText
              text={o.labsAndImaging}
              className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 font-mono-custom text-[11px]"
            />
          )}

          {/* Chẩn đoán hình ảnh bổ sung */}
          {o.imagingFindings && !o.labGroups?.some((g) => g.groupName.includes('hình ảnh')) && (
            <div className="mt-2.5 bg-sky-50/40 border border-sky-200/80 rounded-xl p-3 text-[11px] shadow-2xs flex flex-col gap-1">
              <div className="font-bold text-sky-950 text-[11.5px] flex items-center gap-1.5">
                <FileCheck className="w-3.5 h-3.5 text-sky-600" />
                <span>Chẩn đoán hình ảnh &amp; Thăm dò chức năng:</span>
              </div>
              <FormattedClinicalText
                text={o.imagingFindings}
                className="font-mono-custom text-[11px] text-slate-700 leading-relaxed"
              />
            </div>
          )}
        </div>

        {/* 4. BẪY CẬN LÂM SÀNG (OBJECTIVE PITFALL) */}
        {o.objectivePitfalls && (
          <div className="mt-auto pt-2">
            <div className="p-3.5 bg-gradient-to-r from-red-50/90 to-rose-50/60 border-l-4 border-l-red-500 border border-red-200 rounded-r-xl text-red-950 shadow-2xs">
              <div className="flex items-center gap-1.5 font-display font-bold text-[11px] text-red-900 mb-1.5">
                <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                <span>BẪY CẬN LÂM SÀNG &amp; KHÁM (OBJECTIVE PITFALL)</span>
              </div>
              <p className="text-xs text-rose-950/90 leading-relaxed italic">
                {o.objectivePitfalls}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
