import React, { useState } from 'react';
import { 
  X, 
  BookOpen, 
  AlertTriangle, 
  Baby, 
  Heart, 
  Droplet, 
  Dna, 
  Clock 
} from 'lucide-react';

interface ClinicalGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ClinicalGuideModal: React.FC<ClinicalGuideModalProps> = ({ isOpen, onClose }) => {
  const [activeSection, setActiveSection] = useState<string>('intro');

  if (!isOpen) return null;

  const sections = [
    { id: 'intro', title: '1. Khái Niệm & Phân Độ Sepsis', icon: BookOpen },
    { id: 'screening', title: '2. NEWS2 vs qSOFA vs SIRS', icon: AlertTriangle },
    { id: 'pediatric', title: '3. Phoenix Pediatric Sepsis 2024', icon: Baby },
    { id: 'maternal', title: '4. Sepsis Sản Khoa (Thai Kỳ/Hậu Sản)', icon: Heart },
    { id: 'biomarkers', title: '5. LP-NEWS, Lactate & NLR', icon: Droplet },
    { id: 'molecular', title: '6. Chẩn Đoán Phân Tử T2MR', icon: Dna },
    { id: 'golden-hour', title: '7. Phác Đồ Giờ Vàng (Hour-1)', icon: Clock },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Hướng Dẫn Y Khoa & Sàng Lọc Sepsis Cho Người Mới
              </h3>
              <p className="text-xs text-slate-500">
                Tóm tắt cơ sở bằng chứng NICE NG253, Sepsis-3, Phoenix 2024 & Biomarkers
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section Tabs */}
        <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center gap-1.5 overflow-x-auto shrink-0 scrollbar-none">
          {sections.map((sec) => {
            const Icon = sec.icon;
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => setActiveSection(sec.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-200/70 border border-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{sec.title}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed flex-1">
          {activeSection === 'intro' && (
            <div className="space-y-4">
              <h4 className="font-bold text-slate-900 text-base">Tiến Trình Định Nghĩa Sepsis: Từ SIRS Đến Sepsis-3</h4>
              <p>
                Năm 2016, Hội đồng chuyên gia quốc tế chính thức thay đổi định nghĩa Sepsis-3, bãi bỏ hoàn toàn tiêu chuẩn SIRS và khái niệm "Severe Sepsis".
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-[11px] font-bold text-slate-500 uppercase">Cấp độ 1</span>
                  <h5 className="font-bold text-slate-900 mt-0.5">Nhiễm Khuẩn Thường</h5>
                  <p className="text-xs text-slate-600 mt-1.5">
                    Phản ứng viêm khu trú, chưa có tổn thương chức năng cơ quan đe dọa tử vong.
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-amber-50 border border-amber-200">
                  <span className="text-[11px] font-bold text-amber-800 uppercase">Cấp độ 2 (Sepsis-3)</span>
                  <h5 className="font-bold text-amber-950 mt-0.5">Nhiễm Khuẩn Huyết</h5>
                  <p className="text-xs text-amber-900 mt-1.5">
                    Rối loạn chức năng cơ quan đe dọa tử vong do đáp ứng không điều hòa của cơ thể. Tiêu chuẩn: <strong>ΔSOFA ≥ 2 điểm</strong>. Tỷ lệ tử vong &gt; 10%.
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-rose-50 border border-rose-200">
                  <span className="text-[11px] font-bold text-rose-800 uppercase">Cấp độ 3 (Nguy kịch)</span>
                  <h5 className="font-bold text-rose-950 mt-0.5">Sốc Nhiễm Khuẩn</h5>
                  <p className="text-xs text-rose-900 mt-1.5">
                    Tụt huyết áp kéo dài cần thuốc vận mạch để duy trì <strong>MAP ≥ 65 mmHg</strong> và <strong>Lactate &gt; 2 mmol/L</strong> sau khi đã bù đủ thể tích dịch. Tử vong &gt; 40%.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'screening' && (
            <div className="space-y-4">
              <h4 className="font-bold text-slate-900 text-base">Vì Sao Khuyên KHÔNG Dùng qSOFA Đơn Độc Để Sàng Lọc?</h4>
              <p>
                Khuyến cáo từ <strong>Surviving Sepsis Campaign (SSC 2021)</strong> và <strong>NICE NG253 (2024/2026)</strong> nêu rõ: qSOFA có độ đặc hiệu cao nhưng <strong>độ nhạy rất thấp (chỉ 24% - 50%)</strong>, dễ bỏ sót bệnh nhân giai đoạn sớm.
              </p>
              <div className="p-3 bg-teal-50 border border-teal-200 rounded-lg">
                <span className="font-bold text-teal-900 block mb-1">NICE NG253 ưu tiên sử dụng NEWS2:</span>
                NEWS2 có độ nhạy vượt trội trong việc phát hiện sớm diễn biến xấu. Đặc biệt chú ý <strong>Quy tắc "Thông số 3 điểm"</strong>: bất kỳ sinh hiệu nào đạt 3 điểm (vd: HA tâm thu ≤ 90 hoặc Nhịp thở ≥ 25) đều là báo động đỏ cần bác sĩ FY2+ đánh giá khẩn cấp tại giường.
              </div>
            </div>
          )}

          {activeSection === 'pediatric' && (
            <div className="space-y-4">
              <h4 className="font-bold text-slate-900 text-base">Tiêu Chuẩn Phoenix Pediatric Sepsis 2024 (JAMA)</h4>
              <p>
                Áp dụng cho trẻ em &lt; 18 tuổi, chính thức thay thế hoàn toàn tiêu chuẩn SIRS/IPSCC cũ từ tháng 1/2024:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-700">
                <li><strong>Sepsis Nhi:</strong> Nghi ngờ nhiễm khuẩn + Tổng điểm Phoenix Sepsis Score ≥ 2 điểm (từ 4 hệ: Hô hấp, Tim mạch, Đông máu, Thần kinh).</li>
                <li><strong>Sốc Nhiễm Khuẩn Nhi:</strong> Thỏa Sepsis + có ≥ 1 điểm tại hệ Tim Mạch (Tụt MAP theo tuổi, hoặc Lactate ≥ 5 mmol/L, hoặc cần vận mạch).</li>
              </ul>
            </div>
          )}

          {activeSection === 'maternal' && (
            <div className="space-y-4">
              <h4 className="font-bold text-slate-900 text-base">Sepsis Sản Khoa (Fetal I+D Barcelona Guidelines)</h4>
              <p>
                Do thay đổi sinh lý thai kỳ (nhịp tim tăng, bạch cầu tăng tới 16.9k–30k khi chuyển dạ, Creatinine sinh lý giảm thấp), cần dùng:
              </p>
              <div className="p-3 bg-pink-50 border border-pink-200 rounded-lg">
                <span className="font-bold text-pink-900 block mb-1">Obstetric qSOFA (sàng lọc nhanh):</span>
                HATT &lt; 90 mmHg (1đ), Nhịp thở ≥ 25 lần/phút (1đ), Ý thức biến đổi (1đ). Khi đạt ≥ 2 điểm: Khẩn trương tính Obstetric SOFA và bắt đầu phác đồ.
              </div>
            </div>
          )}

          {activeSection === 'biomarkers' && (
            <div className="space-y-4">
              <h4 className="font-bold text-slate-900 text-base">Dấu Ấn Sinh Học Tiên Lượng Sớm: LP-NEWS, Lactate & NLR</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-3 rounded-lg bg-cyan-50 border border-cyan-200">
                  <span className="font-bold text-cyan-900 block text-xs">LP-NEWS (Das et al. 2024)</span>
                  <p className="text-[11px] text-cyan-950 mt-1">
                    Tích hợp Lactate và PCT vào NEWS đạt <strong>AUROC = 0.966</strong>. Ngưỡng cắt ≥ 11 điểm có độ nhạy 97%, đặc hiệu 88% dự báo tử vong 14 ngày.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-rose-50 border border-rose-200">
                  <span className="font-bold text-rose-900 block text-xs">NLR (Demni et al. 2026)</span>
                  <p className="text-[11px] text-rose-950 mt-1">
                    Tỷ số Neutrophil / Lymphocyte <strong>≥ 6.0</strong> có độ nhạy 92% dự báo tử vong 72h và tiến triển sốc nhiễm khuẩn.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200">
                  <span className="font-bold text-emerald-900 block text-xs">Thanh Thải Lactate 6h</span>
                  <p className="text-[11px] text-emerald-950 mt-1">
                    Meta-analysis 2026: Thanh thải ≥ 10% trong 6 giờ đầu liên quan giảm tỷ lệ tử vong đáng kể (OR = 0.52).
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'molecular' && (
            <div className="space-y-4">
              <h4 className="font-bold text-slate-900 text-base">Đột Phá Chẩn Đoán Phân Tử T2MR (Biomedicines 2026)</h4>
              <p>
                Hệ thống <strong>T2Bacteria / T2Resistance Panel</strong> phân tích trực tiếp máu toàn phần cho kết quả sau <strong>3–5 giờ</strong> (so với trung vị 103–108 giờ của cấy máu thông thường). Giúp phát hiện nhanh các chủng ESKAPE và gen kháng Carbapenem (blaOXA-48, blaCTX-M, blaKPC) để đổi sớm sang kháng sinh nhắm trúng đích.
              </p>
            </div>
          )}

          {activeSection === 'golden-hour' && (
            <div className="space-y-4">
              <h4 className="font-bold text-slate-900 text-base">Phác Đồ Giờ Vàng (Hour-1 Bundle)</h4>
              <ol className="list-decimal pl-5 space-y-1.5 text-xs text-slate-700">
                <li><strong>Đo Lactate máu:</strong> Đo lại nếu ban đầu &gt; 2 mmol/L.</li>
                <li><strong>Cấy máu trước kháng sinh:</strong> Lấy ít nhất 2 bộ cấy máu (hiếu khí & kỵ khí).</li>
                <li><strong>Kháng sinh phổ rộng:</strong> Tiêm tĩnh mạch trong vòng 1 giờ đối với ca nguy cơ cao hoặc sốc.</li>
                <li><strong>Bù dịch tinh thể cân bằng:</strong> NICE 2025/2026 khuyến cáo bolus từng nấc 250 mL; SSC 2021 khuyến cáo 30 mL/kg trong 3 giờ.</li>
                <li><strong>Dùng thuốc vận mạch:</strong> Norepinephrine là lựa chọn hàng đầu, đích MAP ≥ 65 mmHg.</li>
              </ol>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 border-t border-slate-200 bg-slate-50 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold"
          >
            Đã Hiểu & Đóng Lại
          </button>
        </div>
      </div>
    </div>
  );
};
