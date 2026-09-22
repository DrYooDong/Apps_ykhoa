import React, { useState } from 'react';
import { 
  X, 
  GraduationCap, 
  CheckCircle2, 
  AlertTriangle, 
  Flame, 
  Clock, 
  Pill, 
  Droplet, 
  Scale, 
  ShieldAlert,
  ArrowRight,
  BookOpen,
  Info
} from 'lucide-react';
import { CA_MAU_TABLE_2 } from '../utils/pharmacokinetics';

interface ClinicalGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ClinicalGuideModal: React.FC<ClinicalGuideModalProps> = ({
  isOpen,
  onClose
}) => {
  const [activeSection, setActiveSection] = useState<'flow' | 'dosing' | 'tdm' | 'infusion' | 'aki'>('flow');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-slate-200 flex items-center justify-between bg-linear-to-r from-teal-50 to-cyan-50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-xs">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
                Hướng dẫn Quản lý Liều Vancomycin cho Bác sĩ mới
              </h3>
              <p className="text-[11px] text-slate-500">
                Tổng hợp kiến thức cốt lõi dựa trên ASHP/IDSA 2020, BVĐK Cà Mau & Zhang 2024
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/80 rounded-lg transition-all"
            title="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 px-4 bg-white overflow-x-auto text-xs font-semibold no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveSection('flow')}
            className={`py-2.5 px-3 border-b-2 whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeSection === 'flow'
                ? 'border-teal-600 text-teal-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            Quy trình 5 Bước
          </button>
          <button
            type="button"
            onClick={() => setActiveSection('dosing')}
            className={`py-2.5 px-3 border-b-2 whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeSection === 'dosing'
                ? 'border-teal-600 text-teal-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Pill className="w-3.5 h-3.5" />
            Liều nạp & Duy trì
          </button>
          <button
            type="button"
            onClick={() => setActiveSection('tdm')}
            className={`py-2.5 px-3 border-b-2 whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeSection === 'tdm'
                ? 'border-teal-600 text-teal-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            Nguyên tắc Vàng TDM
          </button>
          <button
            type="button"
            onClick={() => setActiveSection('infusion')}
            className={`py-2.5 px-3 border-b-2 whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeSection === 'infusion'
                ? 'border-teal-600 text-teal-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Droplet className="w-3.5 h-3.5" />
            An toàn & Pha truyền
          </button>
          <button
            type="button"
            onClick={() => setActiveSection('aki')}
            className={`py-2.5 px-3 border-b-2 whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeSection === 'aki'
                ? 'border-teal-600 text-teal-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            Độc tính Thận & AKI
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto text-xs text-slate-700 space-y-4">
          {/* SECTION 1: 5-STEP PROTOCOL */}
          {activeSection === 'flow' && (
            <div className="space-y-3">
              <div className="p-3 bg-teal-50 border border-teal-200 rounded-xl">
                <h4 className="font-bold text-sm text-teal-900 mb-0.5">
                  Quy trình 5 bước thực hành lâm sàng cho Bác sĩ điều trị
                </h4>
                <p className="text-slate-600">
                  Thực hiện tuần tự để bảo đảm tối ưu hóa diệt khuẩn và giảm thiểu tối đa độc tính thận.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-2.5">
                {/* Step 1 */}
                <div className="p-3 rounded-xl border border-slate-200 bg-white space-y-1.5">
                  <span className="w-6 h-6 rounded-full bg-teal-600 text-white font-bold text-xs flex items-center justify-center">1</span>
                  <strong className="block text-slate-900 font-semibold text-xs">Đúng Chỉ Định</strong>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Nhiễm khuẩn nặng nghi ngờ/xác định do MRSA (viêm phổi, nhiễm khuẩn huyết, viêm nội tâm mạc, viêm xương tủy, viêm màng não). Không dùng thường quy cho MSSA hay dự phòng ngoại khoa thông thường.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="p-3 rounded-xl border border-slate-200 bg-white space-y-1.5">
                  <span className="w-6 h-6 rounded-full bg-teal-600 text-white font-bold text-xs flex items-center justify-center">2</span>
                  <strong className="block text-slate-900 font-semibold text-xs">Đánh Giá Thận & Cân Nặng</strong>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Tính CrCl bằng công thức Cockcroft-Gault. Xác định BMI: nếu béo phì (BMI ≥ 30), tính thêm cân nặng hiệu chỉnh (ABW) để tính CrCl chuẩn xác.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="p-3 rounded-xl border border-slate-200 bg-white space-y-1.5">
                  <span className="w-6 h-6 rounded-full bg-teal-600 text-white font-bold text-xs flex items-center justify-center">3</span>
                  <strong className="block text-slate-900 font-semibold text-xs">Cho Liều Nạp</strong>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Bệnh nhân nặng, ICU: Liều nạp <strong>20 - 35 mg/kg TBW</strong> (tối đa 3000 mg; ở béo phì 20-25 mg/kg) để đạt nồng độ mục tiêu ngay trong 24-48 giờ đầu.
                  </p>
                </div>

                {/* Step 4 */}
                <div className="p-3 rounded-xl border border-slate-200 bg-white space-y-1.5">
                  <span className="w-6 h-6 rounded-full bg-teal-600 text-white font-bold text-xs flex items-center justify-center">4</span>
                  <strong className="block text-slate-900 font-semibold text-xs">Liều Duy Trì</strong>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Bắt đầu liều duy trì tại cữ tiếp theo. Chức năng thận bình thường: 15-20 mg/kg q8-12h hoặc truyền liên tục 30-40 mg/kg/ngày. Suy thận: chỉnh theo Bảng 2 Cà Mau.
                  </p>
                </div>

                {/* Step 5 */}
                <div className="p-3 rounded-xl border border-slate-200 bg-white space-y-1.5">
                  <span className="w-6 h-6 rounded-full bg-teal-600 text-white font-bold text-xs flex items-center justify-center">5</span>
                  <strong className="block text-slate-900 font-semibold text-xs">Lập Lịch TDM</strong>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Lấy mẫu TDM trong 24 - 48h đầu (2 mẫu: Đỉnh sau truyền 1-2h và Đáy trước liều sau). Nhắm mục tiêu <strong>AUC24 = 400 - 600 mg·h/L</strong>.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 2: DOSING PRINCIPLES */}
          {activeSection === 'dosing' && (
            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Loading dose */}
                <div className="p-3.5 bg-white border border-teal-200 rounded-xl space-y-2">
                  <h4 className="font-bold text-teal-900 text-xs uppercase flex items-center gap-1.5">
                    <Pill className="w-4 h-4 text-teal-600" /> 1. Liều Nạp (Loading Dose)
                  </h4>
                  <ul className="space-y-1 text-slate-700 leading-relaxed list-disc list-inside">
                    <li><strong>Mục đích:</strong> Đạt nồng độ hiệu quả trong 24h đầu, tránh dưới ngưỡng điều trị trong giai đoạn nguy kịch.</li>
                    <li><strong>Liều người lớn thông thường / ICU:</strong> 20 – 35 mg/kg TBW (tính theo cân nặng thực tế).</li>
                    <li><strong>Bệnh nhân béo phì (BMI ≥ 30):</strong> 20 – 25 mg/kg TBW (ASHP 2020 Rec 12).</li>
                    <li><strong>Giới hạn trần an toàn:</strong> Cắt liều tối đa tại <strong>3000 mg</strong>.</li>
                    <li><strong>Trẻ em & sơ sinh:</strong> Chưa đủ dữ liệu khuyến cáo liều nạp thường quy ở trẻ không béo phì; trẻ béo phì có thể cân nhắc 20 mg/kg.</li>
                  </ul>
                </div>

                {/* Maintenance dose */}
                <div className="p-3.5 bg-white border border-cyan-200 rounded-xl space-y-2">
                  <h4 className="font-bold text-cyan-900 text-xs uppercase flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-cyan-600" /> 2. Liều Duy Trì (Maintenance Dose)
                  </h4>
                  <ul className="space-y-1 text-slate-700 leading-relaxed list-disc list-inside">
                    <li><strong>Thận bình thường:</strong> 15 – 20 mg/kg mỗi 8 – 12 giờ.</li>
                    <li><strong>Bệnh nhân tăng thanh thải thận (ARC, eGFR &gt; 130):</strong> Thường cần khoảng cách liều ngắn hơn (mỗi 8 giờ).</li>
                    <li><strong>Béo phì:</strong> Tổng liều duy trì hiếm khi vượt quá <strong>4500 mg/ngày</strong> (do độ thanh thải vancomycin hiếm khi quá 9 L/h).</li>
                    <li><strong>Truyền liên tục (CIV):</strong> 30 – 40 mg/kg/24h (tối đa 60 mg/kg/ngày). Tốc độ truyền (mg/h) = Liều 24h / 24. Mục tiêu Css = 20 – 25 mg/L.</li>
                  </ul>
                </div>
              </div>

              {/* Renal adjustments table preview */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <h4 className="font-bold text-slate-900 text-xs mb-1.5">
                  Tóm tắt hiệu chỉnh liều theo chức năng thận (Bảng 2 BVĐK Cà Mau):
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-[11px] font-mono">
                  <div className="p-2 bg-white rounded border border-slate-200">
                    <span className="text-slate-500 block font-sans">CrCl &gt; 80</span>
                    <strong className="text-teal-700">1235 - 1545 mg/24h</strong>
                    <span className="text-slate-400 block text-[10px] font-sans">Chia q12h</span>
                  </div>
                  <div className="p-2 bg-white rounded border border-slate-200">
                    <span className="text-slate-500 block font-sans">CrCl 50 - 70</span>
                    <strong className="text-teal-700">770 - 1080 mg/24h</strong>
                    <span className="text-slate-400 block text-[10px] font-sans">Chia q12h hoặc q24h</span>
                  </div>
                  <div className="p-2 bg-white rounded border border-slate-200">
                    <span className="text-slate-500 block font-sans">CrCl 30 - 40</span>
                    <strong className="text-teal-700">465 - 620 mg/24h</strong>
                    <span className="text-slate-400 block text-[10px] font-sans">Mỗi 24h</span>
                  </div>
                  <div className="p-2 bg-white rounded border border-slate-200">
                    <span className="text-slate-500 block font-sans">CrCl 10 - 20</span>
                    <strong className="text-teal-700">155 - 310 mg/24h</strong>
                    <span className="text-slate-400 block text-[10px] font-sans">Mỗi 36 - 48h</span>
                  </div>
                  <div className="p-2 bg-white rounded border border-slate-200">
                    <span className="text-slate-500 block font-sans">Lọc IHD</span>
                    <strong className="text-blue-700">10 mg/kg</strong>
                    <span className="text-slate-400 block text-[10px] font-sans">Sau mỗi buổi lọc</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 3: TDM GOLDEN RULES */}
          {activeSection === 'tdm' && (
            <div className="space-y-3">
              <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-950">
                <h4 className="font-bold text-rose-900 text-xs flex items-center gap-1.5 uppercase mb-1">
                  <AlertTriangle className="w-4 h-4 text-rose-600" /> Điểm thay đổi cốt lõi trong hướng dẫn ASHP 2020:
                </h4>
                <p className="leading-relaxed">
                  <strong>KHÔNG CÒN KHUYẾN CÁO</strong> nhắm mục tiêu nồng độ đáy (Trough) 15 - 20 mg/L nữa! Nồng độ đáy 15 - 20 mg/L thường dẫn tới AUC24 vượt 600 mg·h/L và làm tăng nguy cơ tổn thương thận cấp AKI gấp 3–4 lần mà không cải thiện tỷ lệ khỏi bệnh.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-2">
                  <h4 className="font-bold text-teal-800 text-xs">Mục tiêu PK/PD chuẩn:</h4>
                  <ul className="space-y-1.5 text-slate-700 list-disc list-inside">
                    <li><strong>Khoảng đích:</strong> <strong>AUC24 / MIC = 400 - 600 mg·h/L</strong> (giả định MIC = 1 mg/L).</li>
                    <li><strong>Nếu MIC = 2 mg/L:</strong> Không tăng gấp đôi liều vancomycin vì AUC24 &gt; 800 mg·h/L gây độc tính thận nặng. Nên cân nhắc đổi kháng sinh thay thế (Daptomycin, Linezolid).</li>
                    <li><strong>Nếu chỉ đo được Trough:</strong> Khoảng nồng độ đáy <strong>10 - 15 mg/L</strong> thường tương đương AUC24 &gt; 400 mg·h/L và an toàn hơn cho thận.</li>
                  </ul>
                </div>

                <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-2">
                  <h4 className="font-bold text-teal-800 text-xs">Cách lấy mẫu TDM 2 điểm:</h4>
                  <ul className="space-y-1.5 text-slate-700 list-disc list-inside">
                    <li><strong>Mẫu Đỉnh (C_peak):</strong> Lấy sau khi kết thúc truyền thuốc <strong>1 – 2 giờ</strong> (bắt buộc chờ qua pha phân bố mô).</li>
                    <li><strong>Mẫu Đáy (C_trough):</strong> Lấy trong vòng <strong>30 phút trước liều tiếp theo</strong>.</li>
                    <li><strong>Thời điểm làm TDM:</strong> Sớm trong vòng <strong>24 – 48 giờ</strong> sau khi bắt đầu điều trị, không nhất thiết phải chờ liều thứ 4 nếu dùng phần mềm hoặc công thức bậc 1.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 4: INFUSION SAFETY */}
          {activeSection === 'infusion' && (
            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Dilution */}
                <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-2">
                  <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                    <Droplet className="w-4 h-4 text-blue-600" /> 1. Quy cách Pha loãng
                  </h4>
                  <ul className="space-y-1 text-slate-700 list-disc list-inside">
                    <li>Nồng độ dung dịch truyền tối đa: <strong>≤ 5 mg/mL</strong>.</li>
                    <li>Liều 500 mg: Pha trong ít nhất 100 mL dung dịch.</li>
                    <li>Liều 1000 mg: Pha trong ít nhất <strong>200 mL</strong> dung dịch (NaCl 0.9% hoặc Glucose 5%).</li>
                    <li>Liều 1500 mg: Pha trong ít nhất 300 - 500 mL.</li>
                    <li>Ở bệnh nhân hạn chế dịch: Có thể pha nồng độ tối đa 10 mg/mL qua đường truyền tĩnh mạch trung tâm (CVC).</li>
                  </ul>
                </div>

                {/* Infusion Rate & Red Man */}
                <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-2">
                  <h4 className="font-bold text-rose-900 text-xs flex items-center gap-1.5">
                    <Flame className="w-4 h-4 text-rose-600" /> 2. Hội chứng Red Man Syndrome
                  </h4>
                  <ul className="space-y-1 text-slate-700 list-disc list-inside">
                    <li><strong>Bản chất:</strong> Phản ứng giải phóng histamin trực tiếp do truyền quá nhanh (không phải dị ứng qua IgE).</li>
                    <li><strong>Tốc độ truyền an toàn:</strong> <strong>≤ 10 mg/phút</strong> (≥ 60 phút cho mỗi 1000 mg thuốc).</li>
                    <li>Liều &gt; 1500 mg hoặc liều nạp cần truyền ít nhất <strong>2 – 3 giờ</strong>.</li>
                    <li><strong>Xử trí khi xảy ra Red Man:</strong> Tạm ngừng truyền, dùng kháng histamin H1 (Diphenhydramine), truyền dịch nếu có hạ HA. Khi triệu chứng hết, truyền lại với tốc độ giảm 50%.</li>
                  </ul>
                </div>
              </div>

              {/* Incompatibility Note */}
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-950">
                <strong className="block font-semibold mb-1">Cảnh báo Tương kỵ đường truyền (ASHP 2020 Rec 7):</strong>
                Vancomycin tương kỵ kết tủa trực tiếp trên cùng đường truyền (Y-site) với hầu hết các Beta-lactam phổ rộng: <em>Piperacillin/Tazobactam, Cefepime, Ceftazidime, Ceftriaxone, Imipenem</em> cũng như <em>Furosemide và Propofol</em>. Cần xả đường truyền kỹ hoặc dùng đường truyền độc lập.
              </div>
            </div>
          )}

          {/* SECTION 5: AKI & DRUG INTERACTIONS */}
          {activeSection === 'aki' && (
            <div className="space-y-3">
              <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-2">
                <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-rose-600" /> Định nghĩa Tổn thương thận cấp (AKI) theo KDIGO
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700">
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                    <strong>Tiêu chuẩn 1:</strong> Creatinin huyết thanh tăng <strong>≥ 0.3 mg/dL</strong> (≥ 26.5 µmol/L) trong vòng 48 giờ.
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                    <strong>Tiêu chuẩn 2:</strong> Creatinin huyết thanh tăng <strong>≥ 50%</strong> (gấp 1.5 lần) so với giá trị nền trong 7 ngày.
                  </div>
                </div>
              </div>

              <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-2">
                <h4 className="font-bold text-slate-900 text-xs">Các thuốc cần lưu ý đặc biệt khi dùng chung:</h4>
                <div className="space-y-1.5 text-slate-700">
                  <p>• <strong>Piperacillin/Tazobactam:</strong> Tăng tỷ lệ AKI rõ rệt trong nhiều phân tích gộp so với phối hợp Vancomycin + Cefepime/Meropenem. Cần theo dõi SCr hàng ngày.</p>
                  <p>• <strong>Flucloxacillin:</strong> Thử nghiệm CAMERA2 ghi nhận tăng độc tính thận nghiêm trọng khi phối hợp kéo dài &gt; 7 ngày.</p>
                  <p>• <strong>Aminoglycoside (Amikacin, Gentamicin):</strong> Tác động hiệp đồng gây hoại tử ống thận cấp. Cần giám sát TDM cả hai thuốc.</p>
                  <p>• <strong>Thuốc cản quang tiêm mạch & Thuốc vận mạch:</strong> Làm nặng thêm tình trạng thiếu máu cục bộ tủy thận.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <span className="text-[11px] text-slate-400 hidden sm:inline">
            Dành cho Bác sĩ & Dược sĩ lâm sàng tham khảo tại giường bệnh
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-all ml-auto"
          >
            Đã hiểu & Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
