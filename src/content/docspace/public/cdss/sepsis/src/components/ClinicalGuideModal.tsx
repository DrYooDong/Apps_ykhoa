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
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-900 text-base">
                  Dấu Ấn Sinh Học Nhiễm Trùng: Động Học, Phân Tầng NLR &amp; Yếu Tố Nhiễu
                </h4>
                <span className="text-[10px] font-mono text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                  EBM 2023 - 2026
                </span>
              </div>

              {/* 1. Bảng Tóm Tắt Động Học Cốt Lõi */}
              <div className="rounded-lg border border-slate-200 overflow-hidden text-xs">
                <div className="bg-slate-100 p-2 font-bold text-slate-800 flex items-center justify-between text-[11px]">
                  <span>Động Học Biến Thiên (Póvoa 2023 ICM &amp; Zheng 2026):</span>
                  <span className="font-normal text-slate-500 text-[10px]">Động học quan trọng hơn giá trị đơn lẻ</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 bg-white">
                  <div className="p-2.5 space-y-1">
                    <span className="font-bold text-teal-900 block text-[11px]">Procalcitonin (PCT)</span>
                    <div className="text-[10px] text-slate-600 leading-tight">
                      • Onset: <strong>2 – 4 giờ</strong><br/>
                      • Peak: <strong>~24 giờ</strong> (&gt;10.000×)<br/>
                      • t½: <strong>22 – 35 giờ</strong><br/>
                      • Ngưng KS: <strong>giảm ≥ 80–90%</strong> hoặc &lt; 0.5 ng/mL.
                    </div>
                  </div>
                  <div className="p-2.5 space-y-1">
                    <span className="font-bold text-indigo-900 block text-[11px]">C-Reactive Protein (CRP)</span>
                    <div className="text-[10px] text-slate-600 leading-tight">
                      • Onset: <strong>4 – 6 giờ</strong><br/>
                      • Peak: <strong>36 – 50 giờ</strong> (sau 2 ngày)<br/>
                      • t½: <strong>19 giờ</strong> (cố định)<br/>
                      • Tỷ số D4/D0 &lt; 0.4: Đáp ứng nhanh.
                    </div>
                  </div>
                  <div className="p-2.5 space-y-1">
                    <span className="font-bold text-amber-900 block text-[11px]">Interleukin-6 (IL-6)</span>
                    <div className="text-[10px] text-slate-600 leading-tight">
                      • Onset: <strong>1 – 2 giờ</strong> (cực sớm)<br/>
                      • Peak: <strong>2 – 4 giờ</strong><br/>
                      • t½: <strong>&lt; 1 giờ</strong> (ngắn)<br/>
                      • Cảnh báo bão cytokine tối cấp.
                    </div>
                  </div>
                  <div className="p-2.5 space-y-1">
                    <span className="font-bold text-rose-900 block text-[11px]">Lactate Máu</span>
                    <div className="text-[10px] text-slate-600 leading-tight">
                      • Tức thời khi có giảm tưới máu.<br/>
                      • t½: <strong>20 – 60 phút</strong><br/>
                      • Mục tiêu: <strong>Thanh thải ≥ 10–20%</strong> trong mỗi 2–6h đầu hồi sức.
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Chuẩn Hóa 4 Ngưỡng Cắt NLR */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800 text-xs">
                    Tỷ số Neutrophil / Lymphocyte (NLR) — Phân Tầng 4 Mức:
                  </span>
                  <span className="text-[10px] text-teal-800 font-mono bg-teal-50 px-1.5 py-0.2 rounded border border-teal-200">
                    Demni 2026, Naess 2017 &amp; Gürol 2015
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-200">
                    <div className="font-bold text-emerald-950">&lt; 3.0: Mức 1</div>
                    <div className="text-[11px] font-semibold text-emerald-800">Bình Thường</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Sinh lý an toàn, không ưu thế viêm cấp.</div>
                  </div>
                  <div className="p-2 rounded-lg bg-amber-50 border border-amber-200">
                    <div className="font-bold text-amber-950">3.0 – 5.9: Mức 2</div>
                    <div className="text-[11px] font-semibold text-amber-800">Cảnh Báo</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Stress nhẹ hoặc viêm khu trú tiềm ẩn.</div>
                  </div>
                  <div className="p-2 rounded-lg bg-rose-50 border border-rose-200">
                    <div className="font-bold text-rose-950">6.0 – 9.9: Mức 3</div>
                    <div className="text-[11px] font-semibold text-rose-800">Nguy Cơ Cao</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Độ nhạy 92%, NPV 97% tử vong 72h / SOFA.</div>
                  </div>
                  <div className="p-2 rounded-lg bg-rose-100 border border-rose-300">
                    <div className="font-bold text-rose-950">≥ 10.0: Mức 4</div>
                    <div className="text-[11px] font-semibold text-rose-900">Báo Động Nguy Kịch</div>
                    <div className="text-[10px] text-rose-800 mt-0.5">Bão cytokine. <strong>Nếu ≥ 13–15</strong>: Septicemia &amp; Sốc!</div>
                  </div>
                </div>

                {/* Ghi chú EBM Naess 2017 */}
                <div className="p-2 bg-teal-50/80 rounded border border-teal-200 text-[11px] text-teal-900 leading-normal">
                  <strong>🔬 EBM Naess et al. 2017 (Infection):</strong> Ở BN sốt &lt; 7 ngày, NLR phân biệt <strong>Nhiễm trùng huyết (Median 15.69)</strong> với nhiễm khuẩn khu trú (Median ~8.0, p=0.006) hiệu quả vượt trội so với WBC (p=0.559) và CRP (p=0.615). Thang Gürol 2015: 5-10 khu trú, 10-13 toàn thân, 13-15 nhiễm trùng huyết, ≥ 15 sốc nhiễm khuẩn.
                </div>
              </div>

              {/* 3. Bảng Cảnh Báo Yếu Tố Nhiễu */}
              <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-lg text-xs space-y-1.5">
                <span className="font-bold text-amber-950 block text-[11px] uppercase tracking-wide">
                  ⚠️ Bảng Cảnh Báo Yếu Tố Gây Nhiễu Kết Quả (Confounders):
                </span>
                <ul className="text-[11px] text-amber-900 space-y-1 list-disc pl-4 leading-relaxed">
                  <li>
                    <strong>Procalcitonin (PCT) tăng giả tạo:</strong> Đại phẫu thuật (nhất là chạy tim phổi CPB), bỏng nặng, chấn thương dập nát, suy thận ESRD, ung thư giáp thể tủy (MTC), sốc tim sau ép tim CPR. <em>Âm tính giả:</em> Nhiễm trùng khu trú sớm (áp xe bọc, viêm xương), dùng Corticoid, nhiễm trùng đợt 2 (Second Hit).
                  </li>
                  <li>
                    <strong>CRP sai lệch:</strong> <em>Dương tính giả:</em> Bệnh tự miễn (Lupus, Viêm khớp dạng thấp), viêm tụy vô khuẩn, nhồi máu cơ tim, sau mổ ngày 2-3. <em>Âm tính giả:</em> Suy gan cấp / xơ gan mất bù nặng (gan là nơi DUY NHẤT tạo CRP). Không bị ảnh hưởng bởi suy thận.
                  </li>
                  <li>
                    <strong>NLR sai lệch:</strong> <em>Tăng giả:</em> Đang dùng Corticosteroid (kích thích Neu, hủy diệt Lym), stress phẫu thuật/chấn thương, đột quỵ, nhồi máu cơ tim cấp. <em>Âm tính giả:</em> <strong>Sốt kéo dài &gt; 7 ngày</strong> (NLR giảm tự nhiên về 4–7 do thích nghi tủy - Naess 2017), suy tủy, hạ bạch cầu sau hóa trị, nhiễm HIV tiến triển.
                  </li>
                </ul>
              </div>

              {/* 4. LP-NEWS */}
              <div className="p-2.5 bg-cyan-50 border border-cyan-200 rounded-lg text-xs">
                <span className="font-bold text-cyan-950 block text-[11px]">
                  Thang Điểm Phối Hợp LP-NEWS (Das et al. 2024 - AIIMS):
                </span>
                <p className="text-[11px] text-cyan-900 mt-0.5 leading-relaxed">
                  Tích hợp đồng thời Lactate và PCT vào NEWS đạt <strong>AUROC = 0.966</strong> dự báo tử vong 14 ngày. Ngưỡng cắt ≥ 11 điểm có độ nhạy 97%, đặc hiệu 88%.
                </p>
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
