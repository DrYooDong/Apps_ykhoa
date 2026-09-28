import React, { useState } from 'react';
import { 
  Scissors, 
  Pill, 
  Activity, 
  Utensils, 
  ShieldAlert, 
  CheckCircle2, 
  Info, 
  Clock, 
  AlertTriangle,
  FileCheck,
  AlertCircle
} from 'lucide-react';
import { PatientData, GlucoseUnit } from '../types/cdss';

interface SpecialScenariosTabProps {
  patient: PatientData;
  unit: GlucoseUnit;
  onChangePatient: (updated: Partial<PatientData>) => void;
}

export const SpecialScenariosTab: React.FC<SpecialScenariosTabProps> = ({
  patient,
  unit,
  onChangePatient,
}) => {
  const [activeScenario, setActiveScenario] = useState<'surgery' | 'steroids' | 'dialysis' | 'enteral'>('surgery');

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-8">
      {/* Scenario Selector Header */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
        {[
          { id: 'surgery', label: 'Chu Phẫu & Phẫu Thuật', desc: 'CPOC & JBDS 2023', icon: Scissors },
          { id: 'steroids', label: 'Tăng ĐH do Corticoid', desc: 'JBDS-IP 08', icon: Pill },
          { id: 'dialysis', label: 'Thận Nhân Tạo & PD', desc: 'JBDS-IP 11', icon: Activity },
          { id: 'enteral', label: 'Nuôi Ăn Qua Sonde', desc: 'JBDS-IP 05', icon: Utensils },
        ].map((item) => {
          const Icon = item.icon;
          const isActive = activeScenario === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveScenario(item.id as any)}
              className={`p-3.5 rounded-2xl border text-left transition flex flex-col justify-between ${
                isActive
                  ? 'bg-teal-600 text-white border-teal-600 shadow-md ring-2 ring-teal-500/20'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-2">
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-teal-600 dark:text-teal-400'}`} />
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  isActive ? 'bg-teal-700/80 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                }`}>
                  Phác đồ
                </span>
              </div>
              <div>
                <span className="text-xs sm:text-sm font-bold block">{item.label}</span>
                <span className={`text-[11px] block mt-0.5 ${isActive ? 'text-teal-100' : 'text-slate-500'}`}>
                  {item.desc}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* 1. Chu Phẫu & Phẫu Thuật */}
      {activeScenario === 'surgery' && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-700 gap-2">
            <div>
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 flex items-center space-x-2">
                <Scissors className="w-5 h-5 text-teal-600" />
                <span>Quản Lý Đường Huyết Chu Phẫu (CPOC & JBDS-IP 2022/2023)</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Áp dụng cho phẫu thuật chương trình (mổ phiên) và mổ cấp cứu ở bệnh nhân đái tháo đường
              </p>
            </div>
            <div className="text-xs font-bold px-3 py-1 bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded-full border border-emerald-200">
              Mục tiêu ĐH: 6.0 - 10.0 mmol/L (chấp nhận 12.0)
            </div>
          </div>

          {/* Key Checklist Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Box 1: Trước phẫu thuật */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2.5">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider block">
                1. Trước Ngày Mổ
              </span>
              <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-2">
                <li>• <strong>HbA1c tối ưu:</strong> Nên &lt; 69 mmol/mol (&lt; 8.5%) trong vòng 3 tháng trước phẫu thuật phiên.</li>
                <li>• <strong>SGLT2i (Dapagliflozin/Empagliflozin):</strong> BẮT BUỘC NGỪNG TRƯỚC MỔ 3 - 4 NGÀY (Ertugliflozin 4 ngày) để tránh Toan Ceton euglycemic.</li>
                <li>• <strong>Tối trước mổ:</strong> Giảm 20% - 25% liều insulin nền (Basal) tiêm buổi tối (cho 75-80% liều thông thường).</li>
              </ul>
            </div>

            {/* Box 2: Ngày phẫu thuật */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2.5">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider block">
                2. Ngày Phẫu Thuật
              </span>
              <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-2">
                <li>• <strong>Ưu tiên lịch mổ:</strong> Xếp mổ đầu tiên vào buổi sáng để giảm tối đa thời gian nhịn đói.</li>
                <li>• <strong>Metformin:</strong> Ngừng vào ngày mổ nếu có chụp cản quang hoặc eGFR &lt; 60.</li>
                <li>• <strong>Sulfonylurea:</strong> Ngừng cữ sáng ngày mổ (tránh tụt ĐH kéo dài).</li>
                <li>• <strong>Insulin bữa ăn (Bolus):</strong> Hoãn cữ sáng nếu không ăn sáng.</li>
                <li>• <strong>Insulin nền buổi sáng:</strong> Cho 80% liều bình thường và kiểm tra ĐH lúc nhập viện.</li>
              </ul>
            </div>

            {/* Box 3: Sau mổ & Hồi tỉnh */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2.5">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider block">
                3. Sau Mổ & Hồi Tỉnh (DrEaMing)
              </span>
              <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-2">
                <li>• Đo ĐH mao mạch mỗi 1 giờ nếu đang truyền insulin hoặc tiêm dưới da trong ngày mổ.</li>
                <li>• Khuyến khích sớm <strong>DrEaMing</strong>: Uống (Drinking), Ăn (Eating) và Vận động (Mobilising) sớm.</li>
                <li>• Chỉ dùng lại thuốc uống OAD khi bệnh nhân đã ăn uống bình thường và chức năng thận ổn định.</li>
              </ul>
            </div>
          </div>

          {/* VRIII Table for Fasting > 1 Meal */}
          <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 space-y-3">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <h4 className="text-xs sm:text-sm font-bold text-amber-900 dark:text-amber-200">
                Chỉ định truyền Insulin tĩnh mạch tốc độ biến thiên (VRIII) khi nhịn ăn &gt; 1 bữa:
              </h4>
            </div>
            <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
              Truyền Insulin nhanh qua bơm tiêm điện (50 ĐV Actrapid pha trong 50ml NaCl 0.9% = 1 ĐV/ml) 
              song song với <strong>Dịch truyền cơ chất (Glucose 5% + NaCl 0.45% + KCl 0.15% hoặc 0.3%)</strong> với tốc độ duy trì dịch cố định (không được ngắt dịch cơ chất!).
            </p>
          </div>
        </div>
      )}

      {/* 2. Tăng ĐH do Corticoid / Steroid */}
      {activeScenario === 'steroids' && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-700 gap-2">
            <div>
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 flex items-center space-x-2">
                <Pill className="w-5 h-5 text-teal-600" />
                <span>Quản Lý Tăng Đường Huyết Do Glucocorticoid (JBDS-IP 08 & ADA 2026)</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Hiệu ứng làm tăng đề kháng insulin mạnh mẽ, 56-86% bệnh nhân dùng steroid bị tăng ĐH
              </p>
            </div>
            <span className="text-xs font-bold px-3 py-1 bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 rounded-full border border-amber-200">
              Đỉnh tăng ĐH: Chiều & Tối
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center space-x-1.5">
                <Clock className="w-4 h-4 text-teal-600" />
                <span>Đặc điểm diễn biến đường huyết:</span>
              </h4>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-2 text-slate-700 dark:text-slate-300">
                <p>
                  • <strong>Prednisolone / Methylprednisolone</strong> uống buổi sáng đạt nồng độ đỉnh sau 4 - 6 giờ. Do đó, đường huyết đói buổi sáng thường bình thường hoặc tăng nhẹ, nhưng <strong>bắt đầu tăng vọt từ 11:00 trưa đến 20:00 tối</strong>.
                </p>
                <p>
                  • Về đêm, nồng độ steroid giảm dần, đường huyết sẽ hạ dần về mức nền vào sáng sớm hôm sau. 
                </p>
                <p className="text-amber-700 dark:text-amber-400 font-medium">
                  ⚠️ Nguy cơ: Nếu tăng liều insulin nền tiêm buổi tối (Glargine/Degludec) quá nhiều sẽ gây hạ đường huyết nặng lúc nửa đêm và rạng sáng!
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Chiến lược điều trị tối ưu:</span>
              </h4>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-2 text-slate-700 dark:text-slate-300">
                <p>
                  • <strong>Lựa chọn số 1: Insulin NPH (Humulin I / Insulatard)</strong> tiêm dưới da lúc 08:00 sáng (cùng lúc uống steroid). Đỉnh tác dụng của NPH sau 4-6 giờ khớp hoàn hảo với đỉnh tăng ĐH của prednisolone.
                </p>
                <p>
                  • Khởi đầu NPH: 10 ĐV buổi sáng, chỉnh tăng 10 - 20% mỗi ngày theo mức ĐH trước bữa tối.
                </p>
                <p>
                  • Nếu dùng Basal-Bolus: Tăng liều insulin nhanh trước bữa trưa và trước bữa tối thêm <strong>20% - 40%</strong>.
                </p>
                <p>
                  • Bệnh nhân nhẹ không dùng insulin: Có thể dùng Gliclazide 40mg - 240mg uống buổi sáng.
                </p>
              </div>
            </div>
          </div>

          {/* Tapering Warning */}
          <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-xs text-rose-900 dark:text-rose-200 space-y-1">
            <span className="font-bold flex items-center space-x-1.5 text-rose-700 dark:text-rose-300">
              <AlertTriangle className="w-4 h-4" />
              <span>CẢNH BÁO KHI GIẢM HOẶC CAI CORTICOID (STEROID TAPERING):</span>
            </span>
            <p className="leading-relaxed">
              Khi bác sĩ giảm liều steroid (ví dụ giảm Prednisolone từ 20mg xuống 10mg), tình trạng đề kháng insulin sẽ giảm nhanh chóng. 
              <strong>BẮT BUỘC phải giảm liều Insulin hoặc Sulfonylurea từ 20% - 25% song song với mỗi nấc giảm liều steroid</strong> để tránh bệnh nhân rơi vào cơn hạ đường huyết nghiêm trọng!
            </p>
          </div>
        </div>
      )}

      {/* 3. Bệnh Nhân Chạy Thận (HD) & Lọc Màng Bụng (PD) */}
      {activeScenario === 'dialysis' && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-700 gap-2">
            <div>
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 flex items-center space-x-2">
                <Activity className="w-5 h-5 text-teal-600" />
                <span>Bệnh Nhân Suy Thận Mạn Lọc Máu (Haemodialysis & Peritoneal Dialysis - JBDS 11)</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Hơn 40% người lọc máu có đái tháo đường - Độ thanh thải insulin giảm kéo dài thời gian tác dụng
              </p>
            </div>
            <span className="text-xs font-bold px-3 py-1 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 rounded-full border border-blue-200">
              Mục tiêu ĐH: 6.0 - 12.0 mmol/L
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Hemodialysis */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                <span>Chạy Thận Nhân Tạo Chu Kỳ (mHDx)</span>
              </h4>
              <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-2">
                <li>
                  • <strong>Quy tắc giảm 25% liều:</strong> Vào các ngày chạy thận, chủ động giảm 25% tổng liều insulin vì quá trình lọc máu làm giảm ĐH và cải thiện tạm thời độ nhạy insulin.
                </li>
                <li>
                  • <strong>Thời điểm dễ tụt ĐH:</strong> Cực tiểu (nadir) rơi vào giờ thứ 3 của ca lọc máu. 75% cơn hạ đường huyết xảy ra trong 24h của ngày lọc máu.
                </li>
                <li>
                  • <strong>Ăn nhẹ đầu ca lọc:</strong> Nếu ĐH trước khi lên máy &lt; 7.0 mmol/L (&lt; 126 mg/dL), cho ăn 20 - 30g carb chậm ngay đầu ca lọc. Tránh nước hoa quả vì thừa Kali!
                </li>
              </ul>
            </div>

            {/* Peritoneal Dialysis */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center space-x-1.5">
                <AlertTriangle className="w-4 h-4 text-purple-600" />
                <span>Lọc Màng Bụng (PD / CAPD / APD)</span>
              </h4>
              <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-2">
                <li className="p-2.5 rounded-lg bg-red-50 dark:bg-red-950/60 border border-red-300 dark:border-red-800 text-red-900 dark:text-red-200 font-medium">
                  🚨 <strong>CẤM QUE THỬ MEN GDH-PQQ KHI DÙNG ICODEXTRIN (EXTRANEAL):</strong> Icodextrin chuyển hóa thành maltose làm máy thử GDH-PQQ hiển thị đường huyết cực cao giả tạo, tiêm insulin theo đó sẽ gây tử vong.
                </li>
                <li>
                  • <strong>Hấp thu đường từ dịch lọc:</strong> Cơ thể hấp thu 100 - 300g glucose mỗi ngày từ dịch lọc qua màng bụng. Do đó, thường phải tăng liều insulin (chuyển tiêm nền buổi tối nếu lọc APD qua đêm).
                </li>
                <li>
                  • <strong>Không tiêm insulin vào ổ bụng:</strong> JBDS khuyến cáo chỉ tiêm dưới da, không pha insulin vào túi dịch lọc vì nguy cơ thoái hóa mỡ dưới bao gan và viêm phúc mạc.
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* 4. Nuôi Ăn Qua Sonde Dạ Dày */}
      {activeScenario === 'enteral' && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-700 gap-2">
            <div>
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 flex items-center space-x-2">
                <Utensils className="w-5 h-5 text-teal-600" />
                <span>Quản Lý Đường Huyết Nuôi Ăn Qua Sonde (Enteral Feeding - JBDS-IP 05)</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Thường gặp ở bệnh nhân đột quỵ não, chấn thương hàm mặt hoặc sau phẫu thuật tiêu hóa
              </p>
            </div>
            <span className="text-xs font-bold px-3 py-1 bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 rounded-full border border-teal-200">
              Mục tiêu ĐH: 6.0 - 12.0 mmol/L
            </span>
          </div>

          <div className="space-y-4 text-xs text-slate-700 dark:text-slate-300">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="font-bold text-slate-800 dark:text-slate-200 text-sm block">
                Phân biệt TDD và TFD (Total Feed Dose):
              </span>
              <p>
                • <strong>TDD (Total Daily Dose):</strong> Tổng nhu cầu insulin 24h của bệnh nhân gồm cả nhu cầu nền cơ bản.<br/>
                • <strong>TFD (Total Feed Dose):</strong> Liều insulin riêng biệt được tính để bù trừ lượng carbohydrate trong công thức sữa nuôi ăn qua sonde.
              </p>
              <p>
                • Bệnh nhân ĐTĐ típ 1 hoặc thiếu hụt insulin: <strong>BẮT BUỘC duy trì Insulin nền (Basal)</strong> độc lập với cữ nuôi ăn qua sonde, không được cắt nền ngay cả khi ngưng nuôi ăn!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                <span className="font-bold text-slate-800 dark:text-slate-200 block">
                  Nguyên tắc tiêm Insulin theo cữ nuôi ăn:
                </span>
                <p>
                  • Căn cứ vào giờ bắt đầu truyền nuôi ăn: Tiêm Insulin NPH hoặc Premix (30/70) ngay lúc bắt đầu cữ truyền. Nếu cữ truyền &ge; 16 tiếng, có thể chia liều thứ 2 vào giữa cữ truyền (tỷ lệ 50/50 hoặc 60/40).
                </p>
                <p className="font-medium text-amber-700 dark:text-amber-400">
                  ⚠️ KHÔNG tiêm bất kỳ liều insulin nhanh hiệu chỉnh nào trong vòng 4 giờ trước khi kết thúc cữ nuôi ăn để tránh tụt đường huyết vào khoảng thời gian nghỉ cữ!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 text-red-900 dark:text-red-200 space-y-2">
                <span className="font-bold flex items-center space-x-1.5 text-red-700 dark:text-red-300">
                  <AlertTriangle className="w-4 h-4" />
                  <span>XỬ TRÍ KHI NGHẸT HOẶC TUỘT SONDE BẤT NGỜ:</span>
                </span>
                <p className="leading-relaxed">
                  Nếu cữ nuôi ăn bị dừng đột ngột mà liều insulin tiêm trước đó vẫn đang có hiệu lực:
                  <strong> NGUY CƠ HẠ ĐƯỜNG HUYẾT NẶNG CỰC KỲ CAO!</strong>
                </p>
                <p>
                  👉 Bắt buộc đo ĐH mao mạch mỗi 1 giờ. Lập tức truyền tĩnh mạch Glucose 10% (100 - 125 ml/h) để bù lại lượng carbohydrate bị thiếu hụt cho đến khi đặt lại sonde hoặc hết thời gian tác dụng của insulin.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
