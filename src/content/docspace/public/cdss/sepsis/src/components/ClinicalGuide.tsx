import React, { useState } from 'react';
import { 
  BookOpen, 
  HelpCircle, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Droplet, 
  Heart, 
  Baby, 
  FileText, 
  ChevronRight,
  Sparkles,
  Dna,
  ShieldCheck
} from 'lucide-react';

export const ClinicalGuide: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('intro');

  const sections = [
    { id: 'intro', title: '1. Khái Niệm Cơ Bản & Tiến Trình Định Nghĩa', icon: BookOpen },
    { id: 'screening', title: '2. So Sánh: NEWS2 vs qSOFA vs SIRS', icon: AlertTriangle },
    { id: 'pediatric', title: '3. Chuẩn Phoenix Pediatric Sepsis 2024', icon: Baby },
    { id: 'maternal', title: '4. Sepsis Sản Khoa (Thai Kỳ & Hậu Sản)', icon: Heart },
    { id: 'biomarkers', title: '5. Động Học Biomarkers: Lactate, PCT, NLR', icon: Droplet },
    { id: 'molecular', title: '6. Chẩn Đoán Phân Tử Nhanh (T2MR vs Cấy Máu)', icon: Dna },
    { id: 'golden-hour', title: '7. Phác Đồ "Giờ Vàng" & Bù Dịch (NICE & SSC)', icon: Clock },
  ];

  return (
    <div className="space-y-6 pb-20 md:pb-8">
      {/* Banner Giới Thiệu */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Cẩm Nang Lâm Sàng: Hướng Dẫn Sàng Lọc & Nhận Diện Sepsis
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Tài liệu hướng dẫn thực hành tóm tắt dành cho Bác sĩ nội trú, Bác sĩ cấp cứu, Điều dưỡng và Sinh viên y khoa
            </p>
          </div>
        </div>

        {/* Tab chuyển nhanh các mục */}
        <div className="flex flex-wrap gap-1.5 mt-5 pt-4 border-t border-slate-100">
          {sections.map((sec) => {
            const Icon = sec.icon;
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => setActiveSection(sec.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{sec.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Nội dung tương ứng mục đang chọn */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-sm">
        {/* MỤC 1: KHÁI NIỆM & TIẾN TRÌNH */}
        {activeSection === 'intro' && (
          <div className="space-y-5 text-sm text-slate-700 leading-relaxed">
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-teal-600"></span>
                1. Khái Niệm Nhiễm Trùng, Sepsis và Sốc Nhiễm Khuẩn
              </h3>
              <p>
                Trước năm 2016, Sepsis được định nghĩa dựa trên hội chứng đáp ứng viêm toàn thân (SIRS). Tuy nhiên, SIRS xuất hiện ở rất nhiều bệnh nhân viêm không do nhiễm trùng (bỏng, phẫu thuật, viêm tụy cấp) và không phản ánh chính xác tình trạng tổn thương tạng đe dọa tử vong.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Cấp độ 1</span>
                <h4 className="text-base font-bold text-slate-900 mt-1">Nhiễm Khuẩn Thông Thường</h4>
                <p className="text-xs text-slate-600 mt-2">
                  Phản ứng viêm khu trú thích nghi của cơ thể với vi sinh vật gây bệnh (như viêm phế quản, nhiễm trùng tiểu đơn thuần). Chưa có rối loạn chức năng cơ quan đe dọa tính mạng.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-amber-50 border border-amber-200">
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block">Cấp độ 2 (Sepsis-3)</span>
                <h4 className="text-base font-bold text-amber-950 mt-1">Nhiễm Khuẩn Huyết (Sepsis)</h4>
                <p className="text-xs text-amber-900 mt-2">
                  Rối loạn chức năng cơ quan đe dọa tính mạng do đáp ứng không điều hòa của cơ thể đối với nhiễm khuẩn. Lâm sàng xác định khi <strong>điểm SOFA tăng cấp tính ≥ 2 điểm</strong>. Tỷ lệ tử vong nội viện &gt; 10%.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-rose-50 border border-rose-200">
                <span className="text-xs font-bold text-rose-700 uppercase tracking-wider block">Cấp độ 3 (Nguy kịch)</span>
                <h4 className="text-base font-bold text-rose-950 mt-1">Sốc Nhiễm Khuẩn (Septic Shock)</h4>
                <p className="text-xs text-rose-900 mt-2">
                  Phân nhóm Sepsis kèm rối loạn tuần hoàn và tế bào sâu sắc. Tiêu chuẩn: Cần thuốc vận mạch để duy trì <strong>MAP ≥ 65 mmHg</strong> và <strong>Lactate &gt; 2 mmol/L</strong> dù đã hồi sức đủ thể tích dịch. Tỷ lệ tử vong &gt; 40%.
                </p>
              </div>
            </div>

            <div className="p-4 bg-teal-50 border border-teal-200 rounded-lg text-xs text-teal-900">
              <strong className="block font-semibold mb-1">Ghi chú quan trọng về thuật ngữ:</strong>
              Thuật ngữ <em>"Severe Sepsis" (Nhiễm khuẩn huyết nặng)</em> đã bị bãi bỏ hoàn toàn vì bản thân Sepsis đã là tình trạng tổn thương tạng nặng nề đe dọa tính mạng.
            </div>
          </div>
        )}

        {/* MỤC 2: SO SÁNH NEWS2 VS QSOFA */}
        {activeSection === 'screening' && (
          <div className="space-y-5 text-sm text-slate-700 leading-relaxed">
            <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-600"></span>
              2. Vì Sao Hướng Dẫn Quốc Tế Khuyên KHÔNG Dùng qSOFA Đơn Độc Để Sàng Lọc?
            </h3>

            <p>
              Cả Chiến dịch Sống còn Sepsis (<strong>Surviving Sepsis Campaign SSC 2021</strong>) và Viện Y tế Quốc gia Anh (<strong>NICE NG253 2024/2026</strong>) đều đưa ra khuyến cáo mạnh mẽ <strong>chống lại việc dùng qSOFA như một công cụ sàng lọc đơn độc</strong>.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-200 rounded-lg">
                <thead className="bg-slate-100 text-slate-800 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-3">Công cụ</th>
                    <th className="p-3">Các tiêu chí đánh giá</th>
                    <th className="p-3">Ưu điểm</th>
                    <th className="p-3">Nhược điểm chí mạng</th>
                    <th className="p-3">Khuyến cáo hiện hành</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 font-sans">
                  <tr>
                    <td className="p-3 font-bold text-slate-900">qSOFA</td>
                    <td className="p-3">
                      1. Nhịp thở ≥ 22<br/>
                      2. GCS &lt; 15<br/>
                      3. HATT ≤ 100 mmHg
                    </td>
                    <td className="p-3 text-emerald-700 font-medium">
                      Độ đặc hiệu cao, tiên lượng tử vong tốt ở nhóm dương tính.
                    </td>
                    <td className="p-3 text-rose-700 font-medium">
                      <strong>Độ nhạy rất kém (chỉ 24% - 50%)</strong>. Dễ bỏ sót bệnh nhân giai đoạn sớm, làm mất "Giờ vàng" điều trị.
                    </td>
                    <td className="p-3 font-semibold text-rose-800">
                      KHÔNG dùng đơn độc để sàng lọc (SSC 2021 & NICE NG253).
                    </td>
                  </tr>

                  <tr className="bg-slate-50/50">
                    <td className="p-3 font-bold text-teal-900">NEWS2</td>
                    <td className="p-3">
                      7 thông số: Nhịp thở, SpO2 (2 thang), Oxy hỗ trợ, Thân nhiệt, Huyết áp tâm thu, Nhịp tim, Tri giác (AVPU).
                    </td>
                    <td className="p-3 text-emerald-700 font-medium">
                      <strong>Độ nhạy vượt trội</strong> trong phát hiện sớm nguy cơ suy thoái lâm sàng và tử vong.
                    </td>
                    <td className="p-3 text-slate-600">
                      Cần tính toán đầy đủ 7 chỉ số sinh hiệu.
                    </td>
                    <td className="p-3 font-semibold text-teal-800">
                      Ưu tiên hàng đầu cho người lớn nghi ngờ Sepsis tại khoa cấp cứu, bệnh phòng và xe cứu thương (NICE 2024/2026).
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3 font-bold text-slate-700">SIRS</td>
                    <td className="p-3">
                      Nhiệt độ, Nhịp tim, Nhịp thở / PaCO2, Bạch cầu máu.
                    </td>
                    <td className="p-3 text-slate-700">Độ nhạy cao.</td>
                    <td className="p-3 text-amber-700">
                      Kém đặc hiệu, gặp trong nhiều bệnh lý không nhiễm trùng.
                    </td>
                    <td className="p-3 text-slate-600">
                      Không còn dùng làm tiêu chuẩn chẩn đoán đơn độc.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900">
              <strong className="block font-semibold mb-1">Quy tắc "Thông số 3 điểm" trong NEWS2 (NICE NG253):</strong>
              Nếu bệnh nhân có <strong>bất kỳ một thông số sinh hiệu nào đạt 3 điểm</strong> (ví dụ HATT ≤ 90 hoặc Nhịp thở ≥ 25), đây được xem là <em>Red Flag (Dấu hiệu báo động đỏ)</em> cảnh báo suy tạng. Cần yêu cầu Bác sĩ FY2+ đánh giá khẩn cấp tại giường kể cả khi tổng điểm NEWS2 chỉ ở mức 3 - 4 điểm.
            </div>
          </div>
        )}

        {/* MỤC 3: PHOENIX PEDIATRIC SEPSIS 2024 */}
        {activeSection === 'pediatric' && (
          <div className="space-y-5 text-sm text-slate-700 leading-relaxed">
            <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-600"></span>
              3. Tiêu Chuẩn Phoenix Pediatric Sepsis 2024 (JAMA 2024)
            </h3>
            <p>
              Công bố trên tạp chí <strong>JAMA tháng 1/2024</strong> bởi Hội Hồi sức Cấp cứu Hoa Kỳ (SCCM) dựa trên dữ liệu hơn 3 triệu lượt bệnh nhi. Tiêu chuẩn này chính thức <strong>bãi bỏ tiêu chuẩn SIRS/IPSCC 2005 cũ</strong> cho trẻ em dưới 18 tuổi.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
                <h4 className="font-bold text-purple-950 mb-2 text-sm">Chẩn Đoán Sepsis Trẻ Em:</h4>
                <p className="text-xs text-purple-900">
                  Nghi ngờ hoặc xác định nhiễm khuẩn + <strong>Tổng điểm Phoenix Sepsis Score ≥ 2 điểm</strong>.
                </p>
                <p className="text-xs text-slate-600 mt-2">
                  Đánh giá 4 hệ cơ quan: Hô hấp (0-3đ), Tim mạch (0-6đ), Đông máu (0-2đ), Thần kinh (0-2đ).
                </p>
              </div>

              <div className="p-4 rounded-lg bg-rose-50 border border-rose-200">
                <h4 className="font-bold text-rose-950 mb-2 text-sm">Chẩn Đoán Sốc Nhiễm Khuẩn Trẻ Em:</h4>
                <p className="text-xs text-rose-900">
                  Trẻ em thỏa Sepsis + <strong>Có ≥ 1 điểm tại hệ Tim Mạch Phoenix</strong>.
                </p>
                <p className="text-xs text-slate-600 mt-2">
                  Bao gồm: Hạ huyết áp nặng theo lứa tuổi, HOẶC Lactate máu ≥ 5.0 mmol/L, HOẶC đang cần thuốc vận mạch.
                </p>
              </div>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-1">
              <span className="font-semibold text-slate-900 block">Ngưỡng Huyết Áp Trung Bình (MAP) Tụt Theo Tuổi (Phoenix):</span>
              <ul className="list-disc pl-4 space-y-0.5 text-slate-600 font-mono">
                <li>&lt; 1 tháng: MAP ≤ 30 mmHg (1đ) | &lt; 17 mmHg (2đ)</li>
                <li>1 - 11 tháng: MAP ≤ 38 mmHg (1đ) | &lt; 25 mmHg (2đ)</li>
                <li>1 - &lt; 2 tuổi: MAP ≤ 43 mmHg (1đ) | &lt; 31 mmHg (2đ)</li>
                <li>2 - &lt; 5 tuổi: MAP ≤ 44 mmHg (1đ) | &lt; 32 mmHg (2đ)</li>
                <li>5 - &lt; 12 tuổi: MAP ≤ 48 mmHg (1đ) | &lt; 36 mmHg (2đ)</li>
                <li>12 - 17 tuổi: MAP ≤ 51 mmHg (1đ) | &lt; 38 mmHg (2đ)</li>
              </ul>
            </div>
          </div>
        )}

        {/* MỤC 4: MATERNAL SEPSIS */}
        {activeSection === 'maternal' && (
          <div className="space-y-5 text-sm text-slate-700 leading-relaxed">
            <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-600"></span>
              4. Sepsis Trong Thai Kỳ & Hậu Sản (Fetal I+D Barcelona Guidelines)
            </h3>
            <p>
              Sinh lý người mẹ khi mang thai có những thay đổi lớn (nhịp tim sinh lý tăng đến 100 bpm, bạch cầu bình thường từ 5.700 đến 16.900 và khi chuyển dạ lên tới 30.000/mm³, độ lọc cầu thận tăng khiến Creatinine huyết thanh bình thường giảm thấp). Nếu áp dụng tiêu chuẩn người bình thường sẽ gây chẩn đoán sai lệch.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-pink-50 border border-pink-200">
                <h4 className="font-bold text-pink-950 mb-1.5 text-sm">Obstetric q-SOFA (Sàng lọc tại giường):</h4>
                <ul className="text-xs text-pink-900 space-y-1 list-disc pl-4">
                  <li>Huyết áp tâm thu: <strong>&lt; 90 mmHg</strong> (1 điểm)</li>
                  <li>Tần số thở: <strong>≥ 25 lần/phút</strong> (1 điểm)</li>
                  <li>Biến đổi ý thức (Not Alert): <strong>Có</strong> (1 điểm)</li>
                </ul>
                <p className="text-xs text-pink-800 mt-2 font-medium">
                  → Khi có ≥ 2 tiêu chí: Nghi ngờ cao Sepsis sản khoa. Chuyển ngay sang thang điểm Obstetric SOFA.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-1.5 text-sm">Lưu Ý Về Hồi Sức Dịch Sản Khoa:</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  • <strong>Trong thai kỳ:</strong> Bắt đầu thận trọng hơn với liều <strong>20 mL/kg</strong> dịch tinh thể đẳng trương trong 3 giờ đầu do nguy cơ phù phổi cấp tăng cao.<br/>
                  • <strong>Hậu sản:</strong> Khuyến cáo liều tiêu chuẩn <strong>30 mL/kg</strong>.<br/>
                  • Norepinephrine là lựa chọn đầu tay nếu MAP &lt; 65 mmHg không đáp ứng bù dịch.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* MỤC 5: BIOMARKERS */}
        {activeSection === 'biomarkers' && (
          <div className="space-y-5 text-sm text-slate-700 leading-relaxed">
            <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-600"></span>
              5. Động Học Dấu Ấn Sinh Học: LP-NEWS, Lactate Kinetics, NLR & PCT
            </h3>

            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-cyan-50 border border-cyan-200">
                <h4 className="font-bold text-cyan-950 text-sm mb-1">
                  1. Thang điểm LP-NEWS (Das et al. 2024 - AIIMS):
                </h4>
                <p className="text-xs text-cyan-900">
                  Tích hợp đồng thời <strong>Lactate</strong> và <strong>Procalcitonin</strong> vào thang điểm <strong>NEWS</strong> giúp tăng vọt khả năng dự báo tử vong 14 ngày lên <strong>AUROC = 0.966</strong> (vượt trội hơn SOFA 0.882 và NEWS đơn độc 0.951).
                </p>
                <div className="mt-2 text-xs text-slate-700 font-mono bg-white p-2.5 rounded border border-cyan-200">
                  LP-NEWS = NEWS + Điểm Lactate (0, 1, 2) + Điểm PCT (0, 1, 2, 3).<br/>
                  Ngưỡng cắt tối ưu: <strong>≥ 11 điểm</strong> (Độ nhạy 96.9%, Độ đặc hiệu 88.5%). Nếu &gt; 16 điểm: Tỷ lệ tử vong đạt 100%.
                </div>
              </div>

              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                <h4 className="font-bold text-slate-900 text-sm mb-1">
                  2. Động học thanh thải Lactate sau 6 giờ (Gautam et al. 2026 Meta-analysis):
                </h4>
                <p className="text-xs text-slate-600">
                  Tổng hợp 28 nghiên cứu trên 12.500 bệnh nhân cho thấy thanh thải Lactate ≥ 10% trong 6 giờ đầu liên quan chặt chẽ đến giảm tử vong (OR = 0.52; 95% CI: 0.40–0.68), và nếu thanh thải ≥ 20% thì OR = 0.47.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-rose-50 border border-rose-200">
                <h4 className="font-bold text-rose-950 text-sm mb-1">
                  3. Tỷ số Bạch Cầu Hạt Trung Tính / Lympho (NLR) (Demni et al. 2026):
                </h4>
                <p className="text-xs text-rose-900">
                  NLR phản ánh sự cân bằng giữa miễn dịch bẩm sinh và suy giảm miễn dịch thu nhận. Ngưỡng cắt <strong>NLR ≥ 6.0</strong> có <strong>độ nhạy 92%</strong> và <strong>giá trị dự đoán âm (NPV) lên tới 97%</strong> trong phát hiện nguy cơ tử vong sớm 72h và tiến triển vào sốc nhiễm khuẩn.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200">
                <h4 className="font-bold text-emerald-950 text-sm mb-1">
                  4. Procalcitonin (PCT) vs CRP (Cureus 2024 & NICE 2026):
                </h4>
                <p className="text-xs text-emerald-900">
                  PCT có độ đặc hiệu vượt trội cho nhiễm khuẩn vi khuẩn (AUC 0.82 vs CRP 0.78). Cập nhật NICE 2026 chính thức khuyến nghị cân nhắc chỉ định PCT ở nhóm bệnh nhân nguy cơ trung bình và cao để hướng dẫn quyết định ngừng kháng sinh an toàn (Antimicrobial Stewardship).
                </p>
              </div>
            </div>
          </div>
        )}

        {/* MỤC 6: CHẨN ĐOÁN PHÂN TỬ NHANH T2MR */}
        {activeSection === 'molecular' && (
          <div className="space-y-5 text-sm text-slate-700 leading-relaxed">
            <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-600"></span>
              6. Đột Phá Chẩn Đoán Phân Tử Nhanh T2Bacteria / T2Resistance (Biomedicines 2026)
            </h3>

            <p>
              Nghiên cứu của Unic-Stojanovic et al. 2026 tại Khoa Hồi sức Tim mạch so sánh công nghệ cộng hưởng từ phân tử (T2MR) với cấy máu truyền thống:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                <h4 className="font-bold text-slate-900 text-sm mb-2">Cấy Máu Thông Thường (Gold Standard):</h4>
                <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4">
                  <li>Thời gian có kết quả trung vị: <strong>103 - 108 giờ</strong> (IQR 72 - 168h).</li>
                  <li>Độ nhạy bị giảm khi bệnh nhân đã dùng kháng sinh trước đó (thường chỉ dương tính 30-50%).</li>
                  <li>Vai trò không thể thay thế: Bắt buộc để phát hiện vi khuẩn nằm ngoài panel phân tử và làm kháng sinh đồ đầy đủ (AST).</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
                <h4 className="font-bold text-purple-950 text-sm mb-2">Hệ Thống T2Bacteria / T2Resistance:</h4>
                <ul className="text-xs text-purple-900 space-y-1.5 list-disc pl-4">
                  <li>Thời gian có kết quả trung vị: <strong>chỉ 4.06 giờ</strong> (Nhanh hơn cấy máu hơn 100 giờ!).</li>
                  <li>Phát hiện trực tiếp từ máu toàn phần mà không cần đợi mọc cấy.</li>
                  <li>Nhận diện các vi khuẩn nguy hiểm nhóm ESKAPE: <em>K. pneumoniae, P. aeruginosa, A. baumannii</em>.</li>
                  <li>Phát hiện gen kháng Carbapenem (blaKPC, blaOXA-48, blaCTX-M, blaNDM), giúp chuyển ngay sang kháng sinh nhắm trúng đích (Ceftazidime/Avibactam) sớm trong những giờ đầu.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* MỤC 7: GIỜ VÀNG & BÙ DỊCH */}
        {activeSection === 'golden-hour' && (
          <div className="space-y-5 text-sm text-slate-700 leading-relaxed">
            <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-600"></span>
              7. Phác Đồ "Giờ Vàng" (Hour-1 Bundle) & Chiến Lược Hồi Sức Dịch
            </h3>

            <div className="p-4 rounded-lg bg-teal-50 border border-teal-200">
              <h4 className="font-bold text-teal-950 text-sm mb-2">5 Bước Bắt Buộc Trong Khung "Giờ Vàng":</h4>
              <ol className="text-xs text-teal-900 space-y-2 list-decimal pl-4">
                <li><strong>Đo nồng độ Lactate máu:</strong> Đo lại nếu Lactate ban đầu &gt; 2 mmol/L để theo dõi tốc độ thanh thải.</li>
                <li><strong>Cấy máu trước kháng sinh:</strong> Lấy ít nhất 2 bộ cấy máu (hiếu khí & kỵ khí) từ 2 vị trí khác nhau. Không để cấy máu làm trễ kháng sinh &gt; 45 phút.</li>
                <li><strong>Dùng kháng sinh phổ rộng tĩnh mạch:</strong> Trong vòng 1 giờ cho nhóm sốc nhiễm khuẩn hoặc nguy cơ cao theo NICE NG253.</li>
                <li><strong>Bù dịch tinh thể cân bằng:</strong>
                  <div className="mt-1 pl-2 text-slate-700">
                    - <em>Khuyến cáo NICE 2025/2026:</em> Bolus 250 mL trong 10-15 phút, lặp lại từng nấc 250 mL tối đa 1.000 mL và đánh giá lại sau mỗi liều.<br/>
                    - <em>Khuyến cáo SSC 2021:</em> Truyền ít nhất 30 mL/kg trong 3 giờ đầu cho bệnh nhân tụt HA hoặc Lactate ≥ 4 mmol/L. Ưu tiên dung dịch tinh thể cân bằng (Balanced Crystalloids như Ringer Lactate/Hartmann) thay vì NaCl 0.9% để tránh toan máu tăng clo.
                  </div>
                </li>
                <li><strong>Dùng thuốc vận mạch:</strong> Norepinephrine là lựa chọn đầu tay. Mục tiêu duy trì MAP ≥ 65 mmHg. Cho phép dùng tạm thời qua đường ngoại vi an toàn (tĩnh mạch khuỷu trở lên) trong khi chờ đặt CVC.</li>
              </ol>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
