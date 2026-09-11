import React, { useMemo, useState } from 'react';
import {
  AlertCircle,
  AlertOctagon,
  AlertTriangle,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ClipboardCheck,
  ClipboardCopy,
  ExternalLink,
  Heart,
  HelpCircle,
  MessageSquare,
  PhoneCall,
  Pill,
  Printer,
  ShieldAlert,
  Stethoscope,
  User,
  Utensils,
  Zap,
} from 'lucide-react';
import { VAULT_CATALOG } from '../lib/vaultBridge.ts';

interface PatientCounselingProps {
  diseaseName: string;
  icd10: string;
  patientAge?: string;
  patientGender?: string;
  prescribedDrugs?: string[];
  onOpenVaultDrawer?: (diseaseName?: string, query?: string, khoCode?: string) => void;
}

type PerspectiveTab = 'doctor' | 'patient' | 'discharge';

export const PatientCounselingPanel: React.FC<PatientCounselingProps> = ({
  diseaseName,
  icd10,
  patientAge,
  patientGender,
  prescribedDrugs = [],
  onOpenVaultDrawer,
}) => {
  const [activeTab, setActiveTab] = useState<PerspectiveTab>('patient');
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [copySuccess, setCopySuccess] = useState<boolean>(false);
  const [showLeafletModal, setShowLeafletModal] = useState<boolean>(false);

  // Find matching TV article in Vault Catalog
  const matchedTvArticle = useMemo(() => {
    const cleanName = diseaseName.toLowerCase().trim();
    return VAULT_CATALOG.find(
      (a) =>
        a.khoCode === 'TV' &&
        (a.title.toLowerCase().includes(cleanName) ||
          cleanName.includes(a.title.toLowerCase()) ||
          (a.aliases && a.aliases.some((al) => al.toLowerCase().includes(cleanName))))
    );
  }, [diseaseName]);

  // Generate standardized Leaflet text
  const leafletText = useMemo(() => {
    const lines: string[] = [];
    lines.push(`================================================================`);
    lines.push(`        PHIẾU DẶN DÒ & HƯỚNG DẪN NGƯỜI BỆNH KHI XUẤT VIỆN`);
    lines.push(`              Hệ Thống Tư Vấn Lâm Sàng CliniPortal Pro`);
    lines.push(`================================================================`);
    lines.push(`Người bệnh: ${patientGender === 'nu' ? 'Nữ' : 'Nam'}, ${patientAge || '—'} tuổi`);
    lines.push(`Chẩn đoán xuất viện: ${diseaseName} (Mã ICD-10: ${icd10})`);
    lines.push(`Thời gian in phiếu: ${new Date().toLocaleDateString('vi-VN')} ${new Date().toLocaleTimeString('vi-VN')}`);
    lines.push(`----------------------------------------------------------------`);
    lines.push(`1. NGUYÊN TẮC DÙNG THUỐC AN TOÀN TẠI NHÀ:`);
    if (prescribedDrugs.length > 0) {
      prescribedDrugs.forEach((d, i) => lines.push(`   ${i + 1}. ${d}`));
    } else {
      lines.push(`   • Uống thuốc đều đặn đúng giờ, đúng liều theo đơn bác sĩ đã cấp.`);
      lines.push(`   • Tuyệt đối không tự ý ngưng thuốc hoặc đổi sang thuốc nam/thuốc bắc.`);
    }
    lines.push(`   • Xử trí khi quên liều: Uống ngay khi nhớ ra trong ngày. Nếu gần đến giờ liều tiếp theo thì bỏ qua liều đã quên, KHÔNG UỐNG GẤP ĐÔI.`);
    lines.push(`\n2. CÁC DẤU HIỆU NGUY HIỂM CẦN VÀO VIỆN CẤP CỨU NGAY (RED FLAGS):`);
    lines.push(`   🚨 Đau thắt ngực dữ dội kéo dài > 15 phút, vã mồ hôi, khó thở đột ngột.`);
    lines.push(`   🚨 Yếu liệt nửa người, méo miệng, nói ngọng hoặc lú lẫn.`);
    lines.push(`   🚨 Sốt cao co giật, nôn ói liên tục không uống được thuốc.`);
    lines.push(`   🚨 Đi cầu phân đen, nôn ra máu, hoặc chảy máu không cầm.`);
    lines.push(`\n3. CHẾ ĐỘ ĂN UỐNG & VẬN ĐỘNG:`);
    lines.push(`   • Ăn nhạt (< 5g muối/ngày), hạn chế mỡ động vật và đồ ngọt.`);
    lines.push(`   • Uống đủ 1.5 - 2.0 lít nước/ngày (trừ khi có dặn dò hạn chế dịch riêng).`);
    lines.push(`   • Vận động nhẹ nhàng 30 phút/ngày (đi bộ vừa sức).`);
    lines.push(`\n4. HẸN LỊCH TÁI KHÁM:`);
    lines.push(`   • Tái khám sau: 01 đến 02 tuần tại Phòng khám Chuyên khoa.`);
    lines.push(`   • Vui lòng mang theo đơn thuốc này và các kết quả xét nghiệm cũ.`);
    lines.push(`================================================================`);
    return lines.join('\n');
  }, [diseaseName, icd10, patientAge, patientGender, prescribedDrugs]);

  const handleCopyLeaflet = async () => {
    try {
      await navigator.clipboard.writeText(leafletText);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2500);
    } catch {
      // fallback
    }
  };

  return (
    <div className="bg-gradient-to-r from-emerald-50/70 via-teal-50/40 to-slate-50 border border-emerald-200 rounded-lg p-3.5 sm:p-4 shadow-xs flex flex-col gap-3">
      {/* Header bar */}
      <div className="flex items-center justify-between gap-2 flex-wrap pb-2 border-b border-emerald-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-emerald-600 text-white flex items-center justify-center shadow-xs shrink-0">
            <MessageSquare className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-display font-bold text-xs sm:text-sm text-emerald-950 flex items-center gap-2 flex-wrap">
              <span>Kịch Bản Tư Vấn, Giáo Dục Sức Khỏe & Dặn Dò Ra Viện (Kho TV)</span>
              {matchedTvArticle && (
                <span className="px-2 py-0.5 text-[10px] font-mono bg-emerald-100 text-emerald-800 rounded font-semibold border border-emerald-200">
                  {matchedTvArticle.title}
                </span>
              )}
            </h4>
            <p className="text-[11px] text-slate-500">
              Kỹ thuật Teach-Back Bác sĩ · Dấu hiệu cờ đỏ Bệnh nhân · Tờ rơi dặn dò xuất viện A4
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowLeafletModal(true)}
            className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded shadow-2xs transition-colors cursor-pointer"
            title="Xem và in Tờ rơi dặn dò người bệnh khổ A4"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Tạo Tờ Rơi A4</span>
          </button>

          <button
            type="button"
            onClick={() => onOpenVaultDrawer?.(diseaseName, undefined, 'TV')}
            className="flex items-center gap-1 px-2.5 py-1 bg-white hover:bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold rounded shadow-2xs transition-colors cursor-pointer"
            title="Mở toàn văn bài viết Kho Tư Vấn trong Vault Drawer"
          >
            <BookOpen className="w-3 h-3" />
            <span className="hidden sm:inline">Kho Tư vấn</span>
          </button>

          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 text-slate-400 hover:text-slate-600 rounded"
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="flex flex-col gap-3 pt-1">
          {/* Navigation Perspective Switcher Tabs */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs w-full sm:w-auto self-start">
            <button
              type="button"
              onClick={() => setActiveTab('doctor')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer ${
                activeTab === 'doctor'
                  ? 'bg-white text-blue-900 shadow-2xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Stethoscope className="w-3.5 h-3.5 text-blue-600" />
              <span>🩺 Góc Bác Sĩ (Teach-Back)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('patient')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer ${
                activeTab === 'patient'
                  ? 'bg-white text-emerald-900 shadow-2xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <User className="w-3.5 h-3.5 text-emerald-600" />
              <span>👤 Góc Bệnh Nhân (Cờ Đỏ & Quên Liều)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('discharge')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer ${
                activeTab === 'discharge'
                  ? 'bg-white text-purple-900 shadow-2xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Calendar className="w-3.5 h-3.5 text-purple-600" />
              <span>🏥 Kế Hoạch Ra Viện & Tái Khám</span>
            </button>
          </div>

          {/* TAB 1: GÓC BÁC SĨ (PHYSICIAN'S DESK) */}
          {activeTab === 'doctor' && (
            <div className="bg-white border border-slate-200 rounded-lg p-4 flex flex-col gap-3 text-xs">
              <div className="bg-blue-50/80 border border-blue-200 rounded-lg p-3 flex flex-col gap-1.5 text-blue-950">
                <span className="font-bold flex items-center gap-1.5 text-blue-900 text-xs sm:text-sm">
                  <HelpCircle className="w-4 h-4 text-blue-600" />
                  Kỹ thuật kiểm tra độ hiểu Teach-Back (3 câu hỏi trước khi cho về):
                </span>
                <p className="text-[11.5px] text-slate-600 leading-relaxed">
                  Bác sĩ đề nghị người bệnh nhắc lại bằng ngôn ngữ riêng để đảm bảo không có sự hiểu lầm về đơn thuốc và diễn tiến bệnh:
                </p>
                <div className="space-y-1 mt-1 font-medium text-slate-800">
                  <div className="bg-white p-2 rounded border border-blue-100 flex items-start gap-2">
                    <span className="text-blue-600 font-bold">1.</span>
                    <span>"Bác có thể nhắc lại giúp tôi mỗi ngày bác sẽ uống viên thuốc này vào lúc nào và uống mấy viên không?"</span>
                  </div>
                  <div className="bg-white p-2 rounded border border-blue-100 flex items-start gap-2">
                    <span className="text-blue-600 font-bold">2.</span>
                    <span>"Nếu một ngày bác lỡ quên uống thuốc vào buổi sáng thì đến chiều bác sẽ xử trí như thế nào?"</span>
                  </div>
                  <div className="bg-white p-2 rounded border border-blue-100 flex items-start gap-2">
                    <span className="text-blue-600 font-bold">3.</span>
                    <span>"Những dấu hiệu bất thường nào khiến bác phải lập tức vào viện cấp cứu ngay mà không được chờ đến ngày tái khám?"</span>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50/70 border border-amber-200 rounded-lg p-3 text-amber-950 flex flex-col gap-1">
                <span className="font-bold flex items-center gap-1.5 text-amber-900">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  Bẫy tâm lý tuân thủ thuốc thường gặp:
                </span>
                <ul className="list-disc list-inside space-y-1 text-[11.5px] text-slate-700 pl-1">
                  <li><b>Tự ý giảm liều:</b> Bệnh nhân thường bỏ thuốc khi thấy huyết áp / đường huyết trở về mức bình thường. Bác sĩ cần nhấn mạnh: Thuốc duy trì là nguyên nhân giữ số đo bình thường, bỏ thuốc sẽ gây biến cố dội ngược (Rebound).</li>
                  <li><b>Nỗi sợ hại gan/thận:</b> Lo ngại uống thuốc tây lâu ngày sẽ hư thận. Giải thích rõ: Chính bệnh lý không được kiểm soát mới phá hủy thận, còn thuốc đã được chứng minh bảo tồn chức năng thận dài hạn.</li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 2: GÓC BỆNH NHÂN (PATIENT'S CORNER) */}
          {activeTab === 'patient' && (
            <div className="bg-white border border-slate-200 rounded-lg p-4 flex flex-col gap-3 text-xs">
              {/* Red Flags Banner */}
              <div className="bg-rose-50 border border-rose-200 rounded-lg p-3 text-rose-950 flex flex-col gap-1.5">
                <span className="font-bold flex items-center gap-1.5 text-rose-900 text-xs sm:text-sm">
                  <AlertOctagon className="w-4 h-4 text-rose-600" />
                  DẤU HIỆU CỜ ĐỎ (RED FLAGS) — PHẢI ĐẾN VIỆN CẤP CỨU NGAY LẬP TỨC:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                  <div className="bg-white p-2.5 rounded border border-rose-200 font-medium text-slate-800 flex items-start gap-2">
                    <span className="text-red-600 font-bold">🚨</span>
                    <span>Đau thắt ngực đè bẹp kéo dài trên 15 phút, lan lên cổ, vai hoặc cánh tay.</span>
                  </div>
                  <div className="bg-white p-2.5 rounded border border-rose-200 font-medium text-slate-800 flex items-start gap-2">
                    <span className="text-red-600 font-bold">🚨</span>
                    <span>Khó thở dồn dập phải ngồi dậy thở, môi hoặc đầu ngón tay tím tái.</span>
                  </div>
                  <div className="bg-white p-2.5 rounded border border-rose-200 font-medium text-slate-800 flex items-start gap-2">
                    <span className="text-red-600 font-bold">🚨</span>
                    <span>Yếu liệt một bên cơ thể, méo miệng, nói đớ, nhìn mờ hoặc chóng mặt mất thăng bằng.</span>
                  </div>
                  <div className="bg-white p-2.5 rounded border border-rose-200 font-medium text-slate-800 flex items-start gap-2">
                    <span className="text-red-600 font-bold">🚨</span>
                    <span>Nôn ra máu, đi tiêu phân đen như hắc ín, hoặc chảy máu bất thường không cầm.</span>
                  </div>
                </div>
              </div>

              {/* What to do if missed dose */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 flex flex-col gap-1">
                  <span className="font-bold text-slate-800 flex items-center gap-1.5">
                    <Pill className="w-3.5 h-3.5 text-blue-600" />
                    Xử trí khi quên uống thuốc:
                  </span>
                  <p className="text-[11.5px] text-slate-600 leading-relaxed">
                    Uống ngay khi nhớ ra trong ngày. Nếu thời điểm nhớ ra đã gần đến giờ của liều tiếp theo, hãy bỏ qua liều đã quên và uống tiếp liều sau đúng lịch. <b>Tuyệt đối không bao giờ uống gấp đôi liều cùng một lúc.</b>
                  </p>
                </div>

                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 flex flex-col gap-1">
                  <span className="font-bold text-slate-800 flex items-center gap-1.5">
                    <Utensils className="w-3.5 h-3.5 text-emerald-600" />
                    Dinh dưỡng & Thể lực định lượng:
                  </span>
                  <p className="text-[11.5px] text-slate-600 leading-relaxed">
                    Ăn nhạt (dưới 1 muỗng cà phê muối gạt/ngày). Uống đủ 1.5 - 2 lít nước (trừ suy tim/thận nặng). Đi bộ vừa sức ít nhất 30 phút mỗi ngày, 5 ngày mỗi tuần.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: KẾ HOẠCH XUẤT VIỆN & TÁI KHÁM */}
          {activeTab === 'discharge' && (
            <div className="bg-white border border-slate-200 rounded-lg p-4 flex flex-col gap-3 text-xs">
              <div className="bg-purple-50/70 border border-purple-200 rounded-lg p-3 flex flex-col gap-2 text-purple-950">
                <span className="font-bold flex items-center gap-1.5 text-purple-900 text-xs sm:text-sm">
                  <ClipboardCheck className="w-4 h-4 text-purple-600" />
                  Bảng kiểm tiêu chuẩn xuất viện an toàn (Safe Discharge Criteria):
                </span>
                <div className="space-y-1.5 text-[11.5px] text-slate-700">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded text-purple-600" />
                    <span>Sinh hiệu ổn định liên tục &gt; 24 giờ không cần thở oxy hoặc dùng thuốc vận mạch.</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded text-purple-600" />
                    <span>Người bệnh ăn uống được bằng đường miệng, hết triệu chứng đau ngực / khó thở cấp.</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded text-purple-600" />
                    <span>Đã chuyển sang phác đồ thuốc uống ngoại trú ổn định và không phát hiện tương tác nguy hiểm.</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded text-purple-600" />
                    <span>Bệnh nhân hoặc thân nhân đã hiểu rõ cách dùng thuốc và có lịch hẹn tái khám cụ thể.</span>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-lg flex-wrap gap-2">
                <div>
                  <span className="font-bold text-slate-800">Lịch hẹn tái khám khuyến cáo:</span>
                  <p className="text-[11px] text-slate-500">Sau 7 - 14 ngày kể từ khi xuất viện</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-white border border-slate-200 rounded text-slate-700 font-mono-custom text-xs font-semibold">
                    Xét nghiệm lại: Creatinine, Điện giải đồ, ECG
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* PATIENT LEAFLET MODAL (SẴN SÀNG IN KHỔ A4) */}
      {showLeafletModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full border border-slate-200 flex flex-col max-h-[90vh] overflow-hidden">
            <div className="p-4 bg-emerald-600 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Printer className="w-5 h-5" />
                <h3 className="font-display font-bold text-base">
                  Phiếu Dặn Dò & Hướng Dẫn Người Bệnh Khi Xuất Viện (A4 Preview)
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowLeafletModal(false)}
                className="text-white/80 hover:text-white text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-4 sm:p-6 overflow-y-auto font-mono-custom text-xs bg-slate-50 text-slate-800 whitespace-pre-wrap leading-relaxed select-all">
              {leafletText}
            </div>

            <div className="p-3 bg-white border-t border-slate-200 flex items-center justify-between gap-2 flex-wrap">
              <span className="text-[11px] text-slate-500">
                Được chuẩn hóa theo kịch bản Kho Tư Vấn (2.6. Kho TV)
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyLeaflet}
                  className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded text-xs font-semibold transition-colors cursor-pointer"
                >
                  <ClipboardCopy className="w-3.5 h-3.5" />
                  <span>{copySuccess ? '✓ Đã sao chép EMR' : 'Sao chép văn bản'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>In Phiếu Dặn Dò A4</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
