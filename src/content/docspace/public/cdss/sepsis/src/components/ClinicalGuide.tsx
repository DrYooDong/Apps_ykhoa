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
          <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-1 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-600"></span>
                5. Dấu Ấn Sinh Học Nhiễm Trùng: Động Học, Chỉ Số NLR & Các Yếu Tố Gây Nhiễu
              </h3>
              <p className="text-xs text-slate-500">
                Tổng hợp y học chứng cứ từ Intensive Care Medicine (Póvoa et al. 2023), Frontiers in Immunology (Zheng et al. 2026), Diagnostics (Agnello et al. 2021) & Open Forum Infectious Diseases (Chanu Rhee).
              </p>
            </div>

            {/* 5.1. BẢNG ĐỐI SÁNH ĐỘNG HỌC ĐA DẤU ẤN */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-1.5 h-4 bg-teal-600 rounded-xs"></span>
                  5.1. Động Học Của Procalcitonin, CRP & Các Dấu Ấn Viêm Nhiễm Cốt Lõi
                </h4>
                <span className="text-[11px] font-mono text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                  ICM 2023 &amp; F.Immunol 2026
                </span>
              </div>
              <p className="text-xs text-slate-600">
                Động học biến thiên theo thời gian (Kinetics) cung cấp giá trị chẩn đoán và tiên lượng cao hơn nhiều so với một giá trị đo đơn lẻ. Nắm vững thời gian khởi phát, đỉnh nồng độ và thời gian bán hủy giúp bác sĩ định thời điểm làm xét nghiệm và đánh giá đáp ứng kháng sinh chính xác.
              </p>

              <div className="overflow-x-auto rounded-lg border border-slate-200 shadow-2xs">
                <table className="w-full text-xs text-left text-slate-700">
                  <thead className="bg-slate-50 text-[11px] text-slate-800 uppercase font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-3">Thông Số Động Học</th>
                      <th className="p-3 text-teal-900">Procalcitonin (PCT)</th>
                      <th className="p-3 text-indigo-900">C-Reactive Protein (CRP)</th>
                      <th className="p-3 text-amber-900">Interleukin-6 (IL-6)</th>
                      <th className="p-3 text-rose-900">Lactate Máu</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3 font-semibold text-slate-900 bg-slate-50/30">Bản chất &amp; Nguồn gốc</td>
                      <td className="p-3">Hormokine; Tiết từ hầu như mọi tế bào nhu mô &amp; đại thực bào khi kích thích bởi vi khuẩn/LPS</td>
                      <td className="p-3">Pentraxin; Tổng hợp <strong>DUY NHẤT tại tế bào gan</strong> dưới tác động kích thích của IL-6</td>
                      <td className="p-3">Cytokine hướng viêm; Tiết từ đại thực bào, tế bào nội mạc mạch máu, lympho T</td>
                      <td className="p-3">Sản phẩm chuyển hóa kỵ khí mô do thiếu oxy &amp; kích thích thụ thể β2-adrenergic</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3 font-semibold text-slate-900 bg-slate-50/30">Nồng độ sinh lý</td>
                      <td className="p-3 font-mono">&lt; 0.05 – 0.1 ng/mL<br/><span className="text-[10px] text-slate-500">(ngưỡng cắt chuẩn &lt; 0.5)</span></td>
                      <td className="p-3 font-mono">&lt; 3.0 – 5.0 mg/L<br/><span className="text-[10px] text-slate-500">(median 0.8 mg/L)</span></td>
                      <td className="p-3 font-mono">&lt; 5.0 – 7.0 pg/mL</td>
                      <td className="p-3 font-mono">&lt; 1.6 – 2.0 mmol/L</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3 font-semibold text-slate-900 bg-slate-50/30">Bắt đầu tăng (Onset)</td>
                      <td className="p-3 font-semibold text-teal-700">2 – 4 giờ sau kích thích</td>
                      <td className="p-3 font-semibold text-indigo-700">4 – 6 giờ (rõ sau 12h)</td>
                      <td className="p-3 font-semibold text-amber-700">1 – 2 giờ (cực sớm)</td>
                      <td className="p-3 font-semibold text-rose-700">Tức thời khi có giảm tưới máu</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3 font-semibold text-slate-900 bg-slate-50/30">Thời gian đạt đỉnh (Peak)</td>
                      <td className="p-3"><strong>~24 giờ</strong> (24 – 36h)<br/><span className="text-[10px] text-slate-500">Tăng gấp 10.000 lần (&gt;100 ng/mL)</span></td>
                      <td className="p-3"><strong>36 – 50 giờ</strong> (sau 2 ngày)<br/><span className="text-[10px] text-slate-500">Tăng gấp 1.000 lần (&gt;500 mg/L)</span></td>
                      <td className="p-3"><strong>2 – 4 giờ</strong><br/><span className="text-[10px] text-slate-500">Sau đó thoái lui nhanh</span></td>
                      <td className="p-3">Biến thiên liên tục theo diễn tiến hồi sức &amp; sốc</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3 font-semibold text-slate-900 bg-slate-50/30">Thời gian bán hủy (t½)</td>
                      <td className="p-3 font-mono font-bold text-teal-900">22 – 35 giờ (~24h)</td>
                      <td className="p-3 font-mono font-bold text-indigo-900">19 giờ (cố định)</td>
                      <td className="p-3 font-mono font-bold text-amber-900">&lt; 1 giờ</td>
                      <td className="p-3 font-mono font-bold text-rose-900">20 – 60 phút (gan thận bình thường)</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3 font-semibold text-slate-900 bg-slate-50/30">Động học theo dõi điều trị (Stewardship)</td>
                      <td className="p-3 text-slate-600">
                        • <strong>Giảm ≥ 80–90%</strong> so với đỉnh hoặc &lt; 0.5 ng/mL là tiêu chuẩn an toàn ngưng kháng sinh.<br/>
                        • Không giảm &gt; 10%/ngày ở Ngày 3-4 cảnh báo thất bại kiểm soát ổ nhiễm trùng.
                      </td>
                      <td className="p-3 text-slate-600">
                        • <strong>Tỷ số CRP-ratio (D4/D0) &lt; 0.4</strong>: Đáp ứng nhanh.<br/>
                        • D4/D0 &gt; 0.6: Tiên lượng xấu/thất bại điều trị.<br/>
                        • Tăng &gt; 41 mg/L/ngày dự báo nhiễm trùng mới tại ICU.
                      </td>
                      <td className="p-3 text-slate-600">
                        Đánh giá cơn bão Cytokine cấp tính trong 24 giờ đầu; tăng kéo dài tiên lượng suy đa tạng tử vong.
                      </td>
                      <td className="p-3 text-slate-600">
                        <strong>Thanh thải Lactate ≥ 10–20%</strong> trong mỗi 2–6 giờ đầu là mục tiêu tối thượng của hồi sức sốc.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 5.2. CHUYÊN ĐỀ CHỈ SỐ NLR */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-1.5 h-4 bg-teal-600 rounded-xs"></span>
                  5.2. Chỉ Số NLR (Neutrophil-to-Lymphocyte Ratio): Cơ Chế &amp; 4 Ngưỡng Cắt Lâm Sàng
                </h4>
                <span className="text-[11px] font-mono text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                  Demni 2026 &amp; Zahorec 2021
                </span>
              </div>

              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
                <p className="text-xs text-slate-700">
                  <strong>Cơ chế sinh học hai cánh (Two-Arm Dynamic):</strong> Trong nhiễm khuẩn huyết, NLR phản ánh sự bất cân xứng sâu sắc giữa hai nhánh miễn dịch:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
                  <div className="p-3 bg-white rounded border border-slate-200">
                    <span className="font-bold text-teal-800 block mb-1">1. Cánh Viêm Bẩm Sinh (Neutrophils ↑↑):</span>
                    Tủy xương tăng sinh và giải phóng ồ ạt bạch cầu hạt trung tính vào tuần hoàn. Đồng thời, quá trình chết theo chương trình bị trì hoãn (<em>delayed apoptosis</em>) nhằm duy trì hoạt động thực bào và bẫy ngoại bào (NETs), gây tổn thương nội mạc lan tỏa.
                  </div>
                  <div className="p-3 bg-white rounded border border-slate-200">
                    <span className="font-bold text-rose-800 block mb-1">2. Cánh Miễn Dịch Thu Nhận (Lymphocytes ↓↓):</span>
                    Sự sụt giảm và cạn kiệt lympho bào cấp tính do hiện tượng chết tế bào theo chương trình gia tăng nhanh (<em>accelerated apoptosis</em>) bởi bão cytokine và tăng cortisol nội sinh, gây tình trạng tê liệt miễn dịch (<em>immunoparalysis</em>).
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-1">
                <span className="text-xs font-bold text-slate-800 block">
                  Phân tầng 4 ngưỡng cắt lâm sàng chuẩn hóa của NLR:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs">
                  <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-emerald-950">&lt; 3.0</span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 bg-emerald-100 text-emerald-800 rounded">Mức 1</span>
                    </div>
                    <h5 className="font-bold text-emerald-900 mt-1 text-xs">Sinh Lý / Bình Thường</h5>
                    <p className="text-[11px] text-emerald-800 mt-1">
                      Cân bằng miễn dịch ổn định, không có ưu thế phản ứng viêm hệ thống cấp tính.
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-amber-950">3.0 – 5.9</span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 bg-amber-100 text-amber-800 rounded">Mức 2</span>
                    </div>
                    <h5 className="font-bold text-amber-900 mt-1 text-xs">Cảnh Báo / Tăng Nhẹ - Vừa</h5>
                    <p className="text-[11px] text-amber-800 mt-1">
                      Phản ứng stress sinh lý hoặc nhiễm trùng khu trú giai đoạn đầu. Đánh giá kết hợp sinh hiệu NEWS2.
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-rose-50 border border-rose-200">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-rose-950">6.0 – 9.9</span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 bg-rose-100 text-rose-800 rounded">Mức 3</span>
                    </div>
                    <h5 className="font-bold text-rose-900 mt-1 text-xs">Nguy Cơ Cao / Sepsis Rõ</h5>
                    <p className="text-[11px] text-rose-800 mt-1">
                      Demni et al. 2026: <strong>Độ nhạy 92%, NPV 97%</strong> dự báo tử vong 72h và tiến triển suy tạng (ΔSOFA ≥ 2). Khẩn cấp tầm soát Sepsis!
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-rose-100 border border-rose-300 ring-1 ring-rose-400">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-rose-950">≥ 10.0</span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 bg-rose-600 text-white rounded">Mức 4</span>
                    </div>
                    <h5 className="font-bold text-rose-950 mt-1 text-xs">Báo Động Nguy Kịch</h5>
                    <p className="text-[11px] text-rose-900 mt-1">
                      Bão cytokine dữ dội song hành cạn kiệt lympho bào. <strong>Nếu ≥ 13–15</strong>: Chỉ điểm vi khuẩn xâm nhập vào máu (Septicemia) &amp; Sốc!
                    </p>
                  </div>
                </div>

                {/* BỔ SUNG EBM NAESS 2017 & GÜROL 2015 */}
                <div className="p-3.5 rounded-lg bg-teal-50/70 border border-teal-200 space-y-2 mt-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-teal-950 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-600"></span>
                      EBM Chuyên Sâu: Giá Trị Vượt Trội Của NLR Trong Nhiễm Trùng Huyết (Naess et al. 2017 &amp; Gürol et al. 2015)
                    </span>
                    <span className="text-[10px] font-mono text-teal-800 bg-teal-100/80 px-2 py-0.5 rounded border border-teal-300">
                      Infection 2017 &amp; JMB 2015
                    </span>
                  </div>

                  <p className="text-xs text-teal-900 leading-relaxed">
                    Nghiên cứu trên 299 bệnh nhân sốt nhập viện (Naess et al., <em>Infection</em> 2017) đã phát hiện phát hiện mang tính bước ngoặt: <strong>NLR là công cụ duy nhất phân biệt được Nhiễm trùng huyết (Septicemia) với các nhiễm trùng vi khuẩn khu trú khác</strong> ở bệnh nhân sốt dưới 1 tuần, trong khi các chỉ số kinh điển hoàn toàn thất bại:
                  </p>

                  <div className="overflow-x-auto rounded border border-teal-200/80 bg-white shadow-2xs">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-teal-100/60 text-[11px] font-bold text-teal-950">
                        <tr>
                          <th className="p-2">Chỉ số xét nghiệm</th>
                          <th className="p-2 text-rose-800">Nhiễm trùng huyết (Septicemia)</th>
                          <th className="p-2 text-slate-700">Nhiễm khuẩn khu trú (Viêm phổi, UTI...)</th>
                          <th className="p-2 text-teal-900">Ý nghĩa thống kê (p-value)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-[11.5px]">
                        <tr className="bg-rose-50/30">
                          <td className="p-2 font-bold text-teal-950">Tỷ số NLR (Trung vị)</td>
                          <td className="p-2 font-bold text-rose-700">15.69 (Mean 23.17)</td>
                          <td className="p-2 text-slate-700">7.88 – 8.18 (Mean 10.8 – 14.0)</td>
                          <td className="p-2 font-bold text-emerald-700">p = 0.006 (Phân biệt vượt trội!)</td>
                        </tr>
                        <tr>
                          <td className="p-2 font-medium text-slate-700">Bạch cầu WBC (G/L)</td>
                          <td className="p-2 text-slate-700">11.4 (Mean 13.4)</td>
                          <td className="p-2 text-slate-700">12.9 – 13.5 (Mean 14.6 – 15.1)</td>
                          <td className="p-2 text-slate-400">p = 0.559 (Không khác biệt)</td>
                        </tr>
                        <tr>
                          <td className="p-2 font-medium text-slate-700">Bạch cầu đa nhân Neu (G/L)</td>
                          <td className="p-2 text-slate-700">10.3 (Mean 12.5)</td>
                          <td className="p-2 text-slate-700">10.3 – 10.8 (Mean 11.6 – 12.4)</td>
                          <td className="p-2 text-slate-400">p = 0.677 (Không khác biệt)</td>
                        </tr>
                        <tr>
                          <td className="p-2 font-medium text-slate-700">Protein C phản ứng CRP (mg/L)</td>
                          <td className="p-2 text-slate-700">125.5 (Mean 134.9)</td>
                          <td className="p-2 text-slate-700">77.0 – 249.0 (Mean 108.3 – 261.4)</td>
                          <td className="p-2 text-slate-400">p = 0.615 (Không khác biệt)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-1 text-xs">
                    <div className="p-2.5 bg-white rounded border border-teal-200">
                      <span className="font-bold text-slate-900 block mb-0.5">⏱️ Yếu Tố "Thời Gian Sốt" (Fever Duration):</span>
                      <p className="text-[11px] text-slate-700 leading-relaxed">
                        NLR đạt đỉnh chẩn đoán nhạy bén nhất khi <strong>sốt &lt; 7 ngày</strong> (Median 8.43 ở vi khuẩn; 15.69 ở Septicemia). Nếu sốt kéo dài <strong>7 – 21 ngày</strong>, NLR suy thoái sinh lý xuống còn median <strong>4.33</strong> (p = 0.005) do tủy xương thích nghi và lympho hồi phục từng phần. Bác sĩ cần cảnh giác âm tính giả muộn.
                      </p>
                    </div>

                    <div className="p-2.5 bg-white rounded border border-teal-200">
                      <span className="font-bold text-slate-900 block mb-0.5">🧬 Thang Phân Tầng Gürol et al. 2015 (1.468 ca):</span>
                      <p className="text-[11px] text-slate-700 leading-relaxed">
                        • <strong>[5 – 10)</strong>: Nhiễm trùng khu trú (Local infection).<br/>
                        • <strong>[10 – 13)</strong>: Nhiễm trùng toàn thân (Systemic infection).<br/>
                        • <strong>[13 – 15)</strong>: Nhiễm trùng huyết xâm lấn (Septicemia).<br/>
                        • <strong>≥ 15.0</strong>: Sốc nhiễm khuẩn (Septic shock) — cấy máu khẩn trước KS!
                      </p>
                    </div>
                  </div>

                  <div className="p-2 bg-white/80 rounded border border-teal-100 text-[11px] text-slate-700">
                    <span className="font-bold text-teal-900">💡 Tỷ số bổ trợ MLR (Monocyte-to-Lymphocyte Ratio):</span> Nghiên cứu chứng minh MLR cũng phân biệt mạnh mẽ giữa nhiễm khuẩn (Median = 0.70; Septicemia = 1.21) và sốt do virus (Median = 0.14, p = 0.005). Khi NLR và MLR đều rất thấp, xác suất nhiễm virus chiếm ưu thế (hoặc sốt không do nhiễm trùng).
                  </div>
                </div>
              </div>
            </div>

            {/* 5.3. BẢNG CÁC YẾU TỐ GÂY NHIỄU KẾT QUẢ */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-1.5 h-4 bg-teal-600 rounded-xs"></span>
                  5.3. Bảng Yếu Tố Gây Nhiễu Kết Quả (Diagnostic Pitfalls &amp; Confounder Matrix)
                </h4>
                <span className="text-[11px] font-mono text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  Cảnh Báo Lâm Sàng
                </span>
              </div>
              <p className="text-xs text-slate-600">
                Không có biomarker nào hoàn hảo 100%. Bác sĩ lâm sàng bắt buộc phải nhận diện các nguyên nhân gây Dương tính giả và Âm tính giả để tránh quyết định điều trị sai lầm:
              </p>

              <div className="overflow-x-auto rounded-lg border border-slate-200 shadow-2xs">
                <table className="w-full text-xs text-left text-slate-700">
                  <thead className="bg-slate-50 text-[11px] text-slate-800 uppercase font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-3 w-1/5">Dấu Ấn</th>
                      <th className="p-3 text-rose-800 w-2/5">Dương Tính Giả (Tăng không do vi khuẩn)</th>
                      <th className="p-3 text-amber-800 w-2/5">Âm Tính Giả (Không tăng dù nhiễm trùng nặng)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3 font-bold text-teal-950 bg-teal-50/30">
                        Procalcitonin<br/>(PCT)
                      </td>
                      <td className="p-3">
                        • <strong>Đại phẫu thuật &amp; Chấn thương mô diện rộng</strong> (đặc biệt mổ tim hở chạy máy tim phổi nhân tạo CPB).<br/>
                        • <strong>Bỏng nặng giai đoạn đầu, sốc nhiệt</strong>.<br/>
                        • <strong>Sốc tim, ngừng tim hô hấp cấp (sau ép tim CPR)</strong>.<br/>
                        • <strong>Ung thư tuyến giáp thể tủy (MTC)</strong>, ung thư phổi tế bào nhỏ, u Carcinoid thần kinh nội tiết (tiết trực tiếp PCT).<br/>
                        • <strong>Suy thận mạn giai đoạn cuối (ESRD)</strong>: giảm bài tiết thận, mức nền dao động 0.5 – 1.5 ng/mL dù không nhiễm trùng.<br/>
                        • Trẻ sơ sinh trong 48 giờ đầu sau sinh (tăng sinh lý lên tới 2–10 ng/mL).<br/>
                        • Thuốc kích hoạt tế bào T (OKT3, kháng thể kháng tế bào lympho T - ATG).
                      </td>
                      <td className="p-3">
                        • <strong>Ổ nhiễm trùng khu trú chưa lan tỏa toàn thân</strong> (áp xe bọc kín, viêm mô tế bào khu trú, viêm xương tủy xương, viêm amidan, viêm bàng quang chưa lên thận).<br/>
                        • <strong>Giai đoạn cực sớm (&lt; 2 – 4 giờ đầu)</strong> sau khi vi khuẩn xâm nhập.<br/>
                        • <strong>Đang dùng Corticosteroid liều cao</strong> hoặc thuốc ức chế miễn dịch (ức chế giải phóng cytokine khởi phát).<br/>
                        • <strong>Hiện tượng nhiễm trùng lần 2 ("Second Hit")</strong>: PCT chỉ tăng ~10% so với đợt đầu do cơ chế dung nạp nội độc tố.<br/>
                        • Đã dùng kháng sinh hiệu quả trước khi lấy mẫu máu.
                      </td>
                    </tr>

                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3 font-bold text-indigo-950 bg-indigo-50/30">
                        C-Reactive Protein<br/>(CRP)
                      </td>
                      <td className="p-3">
                        • <strong>Bệnh tự miễn mạn tính</strong> (Lupus ban đỏ hệ thống - SLE, Viêm khớp dạng thấp, Viêm đa cơ, Viêm mạch máu).<br/>
                        • <strong>Viêm tụy cấp vô khuẩn</strong>.<br/>
                        • <strong>Nhồi máu cơ tim cấp</strong>, huyết khối tĩnh mạch sâu, thuyên tắc phổi.<br/>
                        • Sau phẫu thuật hoặc chấn thương mô (đỉnh tăng ở ngày 2–3).<br/>
                        • Béo phì mạn tính, hút thuốc lá mạn tính, bệnh ác tính tiến triển.
                      </td>
                      <td className="p-3">
                        • <strong>Suy gan cấp hoặc Xơ gan mất bù nặng</strong>: Tế bào gan suy kiệt không thể tổng hợp CRP dù nhiễm khuẩn tối cấp (gan là cơ quan DUY NHẤT sản xuất CRP).<br/>
                        • <strong>Giai đoạn cực sớm (&lt; 6 – 12 giờ đầu)</strong>: CRP chưa kịp bắt đầu tăng.<br/>
                        • <span className="text-teal-800 font-semibold">• Lưu ý ưu điểm:</span> CRP KHÔNG bị ảnh hưởng bởi suy thận hay lọc máu; ít bị ảnh hưởng bởi Corticoid hơn PCT.
                      </td>
                    </tr>

                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3 font-bold text-rose-950 bg-rose-50/30">
                        Tỷ số NLR<br/>(Neutrophil / Lympho)
                      </td>
                      <td className="p-3">
                        • <strong>Đang sử dụng Corticosteroids</strong> (kích thích tủy giải phóng Neutrophil và tiêu hủy Lympho bào, làm NLR vọt lên rất cao giả tạo).<br/>
                        • <strong>Stress sinh lý cấp tính</strong>: Đa chấn thương, đại phẫu thuật, sốc mất máu, đột quỵ não cấp, co giật kéo dài, nhồi máu cơ tim cấp.<br/>
                        • <strong>Bệnh lý huyết học ác tính</strong>: Bạch cầu mạn dòng tủy (CML), hội chứng tăng sinh tủy.<br/>
                        • Bệnh nhân đang dùng thuốc kích bạch cầu hạt (G-CSF, GM-CSF).
                      </td>
                      <td className="p-3">
                        • <strong>Thời gian sốt kéo dài &gt; 7 ngày</strong> (NLR thoái triển sinh lý từ median 8.43 xuống còn 4.33 do tủy thích nghi và tế bào lympho hồi phục từng phần - Naess 2017).<br/>
                        • <strong>Suy tủy xương hoặc giảm bạch cầu hạt nặng</strong> sau hóa trị liệu ung thư.<br/>
                        • <strong>Nhiễm HIV/AIDS giai đoạn tiến triển</strong>.<br/>
                        • Nhiễm trùng do virus gây hạ đồng thời bạch cầu trung tính và lympho.<br/>
                        • Bệnh nhân điều trị thuốc ức chế tủy xương.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 5.4. TÍCH HỢP LP-NEWS & THANH THẢI LACTATE */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-lg bg-cyan-50 border border-cyan-200">
                <span className="font-bold text-cyan-950 block text-xs mb-1">
                  Thang Điểm Phối Hợp LP-NEWS (Das et al. 2024 - AIIMS):
                </span>
                <p className="text-xs text-cyan-900 leading-relaxed">
                  Tích hợp đồng thời <strong>Lactate</strong> và <strong>Procalcitonin</strong> vào thang điểm <strong>NEWS</strong> tăng vọt khả năng dự báo tử vong 14 ngày lên <strong>AUROC = 0.966</strong> (vượt trội SOFA 0.882 và NEWS đơn độc 0.951). Ngưỡng cắt tối ưu: <strong>≥ 11 điểm</strong> (Độ nhạy 97%, Đặc hiệu 88%). Nếu &gt; 16 điểm: Tỷ lệ tử vong đạt 100%.
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200">
                <span className="font-bold text-emerald-950 block text-xs mb-1">
                  Động Học Thanh Thải Lactate Sau 6 Giờ (Meta-analysis 2026):
                </span>
                <p className="text-xs text-emerald-900 leading-relaxed">
                  Tổng hợp 28 nghiên cứu trên 12.500 bệnh nhân chứng minh: thanh thải Lactate ≥ 10% trong 6 giờ đầu liên quan chặt chẽ đến giảm tử vong nội viện (OR = 0.52; 95% CI: 0.40–0.68), và nếu thanh thải ≥ 20% thì OR = 0.47. Không đạt mức thanh thải này đòi hỏi đánh giá lại toàn diện huyết động và ổ nhiễm trùng.
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
