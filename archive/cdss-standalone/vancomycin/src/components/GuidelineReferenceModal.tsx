import React, { useState } from 'react';
import { 
  X, 
  BookOpen, 
  FileText, 
  Table, 
  Layers, 
  ExternalLink,
  CheckCircle2
} from 'lucide-react';
import { CA_MAU_TABLE_2 } from '../utils/pharmacokinetics';

interface GuidelineReferenceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GuidelineReferenceModal: React.FC<GuidelineReferenceModalProps> = ({
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'camau' | 'ashp' | 'zhang' | 'formulas'>('camau');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-teal-700" />
            <h3 className="font-bold text-slate-900 text-sm sm:text-base">
              Tài liệu & Hướng dẫn Lâm sàng Tham chiếu
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex border-b border-slate-200 px-4 bg-white overflow-x-auto text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('camau')}
            className={`py-2.5 px-3 border-b-2 whitespace-nowrap transition-all ${
              activeTab === 'camau'
                ? 'border-teal-600 text-teal-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Bảng 2 BVĐK Cà Mau
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('ashp')}
            className={`py-2.5 px-3 border-b-2 whitespace-nowrap transition-all ${
              activeTab === 'ashp'
                ? 'border-teal-600 text-teal-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Đồng thuận ASHP/IDSA 2020
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('zhang')}
            className={`py-2.5 px-3 border-b-2 whitespace-nowrap transition-all ${
              activeTab === 'zhang'
                ? 'border-teal-600 text-teal-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Béo phì (Zhang 2024)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('formulas')}
            className={`py-2.5 px-3 border-b-2 whitespace-nowrap transition-all ${
              activeTab === 'formulas'
                ? 'border-teal-600 text-teal-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Công thức Dược động học
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-5 overflow-y-auto text-xs text-slate-700 space-y-4">
          {/* TAB 1: CA MAU TABLE 2 */}
          {activeTab === 'camau' && (
            <div className="space-y-3">
              <div className="p-3 bg-teal-50/60 border border-teal-200 rounded-xl text-teal-950">
                <h4 className="font-bold text-sm text-teal-900 mb-1">
                  Bảng 2: Hiệu chỉnh liều Vancomycin theo CrCl (BVĐK Cà Mau & Dược thư QG 2015)
                </h4>
                <p className="text-slate-600">
                  Áp dụng hiệu chỉnh tổng liều vancomycin trong 24 giờ dựa trên độ thanh thải creatinin (CrCl) tính theo Cockcroft-Gault.
                </p>
              </div>

              <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-2xs">
                <table className="w-full text-center border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-slate-800 font-semibold border-b border-slate-200">
                      <th className="py-2 px-3 text-left">Độ thanh thải Creatinin (CrCl, mL/phút)</th>
                      <th className="py-2 px-3">Liều Vancomycin khuyến cáo (mg/24h)</th>
                      <th className="py-2 px-3 text-right">Cách phân liều thực hành</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono">
                    {CA_MAU_TABLE_2.map((item) => (
                      <tr key={item.crcl} className="hover:bg-slate-50">
                        <td className="py-2 px-3 text-left font-bold text-slate-900">{item.crcl}</td>
                        <td className="py-2 px-3 text-teal-700 font-bold">{item.dailyDoseMg} mg</td>
                        <td className="py-2 px-3 text-right text-slate-600 font-sans">
                          {item.crcl >= 70 ? 'Chia mỗi 12h' : item.crcl >= 40 ? 'Dùng 1 lần/24h' : 'Mỗi 36 - 48h hoặc theo TDM'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: ASHP 2020 */}
          {activeTab === 'ashp' && (
            <div className="space-y-3 leading-relaxed">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <h4 className="font-bold text-slate-900 text-sm mb-1">
                  Khuyến cáo chính ASHP/IDSA/PIDS/SIDP 2020
                </h4>
                <p className="text-slate-600">
                  Hướng dẫn đồng thuận điều trị và giám sát nồng độ Vancomycin cho nhiễm khuẩn nặng do MRSA.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3 bg-white border border-slate-200 rounded-xl">
                  <h5 className="font-bold text-teal-800 mb-1">1. Mục tiêu PK/PD</h5>
                  <p>Mục tiêu: <strong>AUC24/MIC = 400 - 600 mg·h/L</strong> (giả định MIC = 1 mg/L). <strong>KHÔNG</strong> còn khuyến cáo duy trì nồng độ đáy 15 - 20 mg/L vì không phản ánh đúng AUC và làm tăng tỷ lệ tổn thương thận cấp AKI.</p>
                </div>

                <div className="p-3 bg-white border border-slate-200 rounded-xl">
                  <h5 className="font-bold text-teal-800 mb-1">2. Liều nạp (Loading Dose)</h5>
                  <p>Người bệnh nặng, ICU: Liều nạp <strong>20 - 35 mg/kg</strong> (tối đa 3000 mg). Ở bệnh nhân béo phì: <strong>20 - 25 mg/kg</strong> (tối đa 3000 mg). Thời gian truyền tối thiểu 2 - 3 giờ.</p>
                </div>

                <div className="p-3 bg-white border border-slate-200 rounded-xl">
                  <h5 className="font-bold text-teal-800 mb-1">3. Thẩm phân máu (IHD)</h5>
                  <p>Màng lọc thông lượng cao: Liều nạp <strong>25 mg/kg</strong>, liều duy trì <strong>10 mg/kg</strong> sau mỗi buổi lọc (hoặc 10-15 mg/kg trong lúc lọc). Nồng độ trước lọc (predialysis) mục tiêu: <strong>15 - 20 mg/L</strong>.</p>
                </div>

                <div className="p-3 bg-white border border-slate-200 rounded-xl">
                  <h5 className="font-bold text-teal-800 mb-1">4. Lọc máu liên tục (CRRT)</h5>
                  <p>Liều nạp <strong>20 - 25 mg/kg</strong>. Liều duy trì <strong>7.5 - 10 mg/kg mỗi 12 giờ</strong> (với liều dịch 20-25 mL/kg/h) hoặc truyền liên tục để đạt Css 20 - 25 mg/L.</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ZHANG 2024 */}
          {activeTab === 'zhang' && (
            <div className="space-y-3">
              <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-amber-950">
                <h4 className="font-bold text-amber-900 text-sm mb-1">
                  Mô hình Zhang et al. (Clin Pharmacokinet 2024) cho Bệnh nhân Thừa cân & Béo phì
                </h4>
                <p className="text-slate-600">
                  Dữ liệu từ 230 bệnh nhân thừa cân/béo phì (BMI ≥ 25) tại khoa thường và ICU, hướng tới đích AUC 400 - 600 mg·h/L.
                </p>
              </div>

              <div className="space-y-2 text-slate-700">
                <p>• <strong>Chiến lược 2 liều nạp:</strong> Nghiên cứu khuyến nghị cần 2 liều nạp trong 48h đầu (cho cả truyền ngắt quãng lẫn liên tục) để đạt đích AUC sớm từ ngày 1.</p>
                <p>• <strong>Truyền liên tục:</strong> Ngày 1 liều nạp 1500 mg/2h; Ngày 2 bổ sung 750 mg/2h trước khi tiếp tục truyền duy trì.</p>
                <p>• <strong>Hiệu chỉnh ICU:</strong> Độ thanh thải Vancomycin ở bệnh nhân ICU giảm trung bình 15.5% so với khoa thường (do biến động huyết động và suy giảm vi tuần hoàn thận).</p>
              </div>
            </div>
          )}

          {/* TAB 4: FORMULAS */}
          {activeTab === 'formulas' && (
            <div className="space-y-3 font-mono">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl font-sans">
                <h4 className="font-bold text-slate-900 text-sm mb-1">
                  Các công thức tính toán lâm sàng chuẩn
                </h4>
              </div>

              <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-2 text-slate-800">
                <p><strong>1. Cockcroft-Gault CrCl (mL/phút):</strong></p>
                <p className="bg-slate-100 p-2 rounded text-[11px]">
                  CrCl = [(140 - Tuổi) × Cân nặng (kg)] / [72 × SCr (mg/dL)] × (0.85 nếu Nữ)
                  <br />
                  Hoặc: [(140 - Tuổi) × Cân nặng (kg)] / [0.815 × SCr (µmol/L)] × (0.85 nếu Nữ)
                </p>

                <p className="pt-2"><strong>2. Dược động học 2 điểm (Pai & Rodvold 2014):</strong></p>
                <p className="bg-slate-100 p-2 rounded text-[11px]">
                  k_el = [ln(C_peak) - ln(C_trough)] / Δt
                  <br />
                  t½ = 0.693 / k_el
                  <br />
                  AUC24 = [AUC_infusion + AUC_elimination] × (24 / τ)
                </p>

                <p className="pt-2"><strong>3. Tốc độ truyền an toàn:</strong></p>
                <p className="bg-slate-100 p-2 rounded text-[11px]">
                  Tốc độ tối đa ≤ 10 - 15 mg/phút (≥ 60 phút cho mỗi 1000 mg) để phòng hội chứng Red Man.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-all"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
