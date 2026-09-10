import React, { useState } from "react";

interface IllustrationProps {
  stepId: string;
  stepName: string;
}

export const ExamIllustration: React.FC<IllustrationProps> = ({ stepId, stepName }) => {
  const [toggleMode, setToggleMode] = useState<"normal" | "abnormal">("abnormal");

  switch (stepId) {
    // 1.1 GCS Scale
    case "mental-status-1":
      return (
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 shadow-2xs flex flex-col items-center">
          <div className="w-full flex items-center justify-between mb-3 border-b border-slate-200 pb-2">
            <span className="text-xs font-bold text-teal-800 font-mono">SƠ ĐỒ 3 TRỤC GLASGOW (GCS 3 - 15)</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200 font-bold">
              GCS ≤ 8 = Chỉ định đặt NKQ
            </span>
          </div>
          <svg viewBox="0 0 500 190" className="w-full max-h-56">
            {/* Eye (4 pts) */}
            <g transform="translate(20, 15)">
              <rect width="140" height="155" rx="10" fill="#ffffff" stroke="#0284c7" strokeWidth="1.5" />
              <circle cx="70" cy="38" r="18" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
              <path d="M55 38 Q70 23 85 38 Q70 53 55 38 Z" fill="#0284c7" />
              <circle cx="70" cy="38" r="5" fill="#0f172a" />
              <text x="70" y="75" textAnchor="middle" fill="#0369a1" fontSize="13" fontWeight="bold">MẮT (EYE - 4đ)</text>
              <text x="70" y="95" textAnchor="middle" fill="#475569" fontSize="10">4: Tự nhiên</text>
              <text x="70" y="112" textAnchor="middle" fill="#475569" fontSize="10">3: Khi gọi</text>
              <text x="70" y="129" textAnchor="middle" fill="#475569" fontSize="10">2: Khi đau</text>
              <text x="70" y="146" textAnchor="middle" fill="#dc2626" fontSize="10" fontWeight="bold">1: Không mở</text>
            </g>

            {/* Verbal (5 pts) */}
            <g transform="translate(180, 15)">
              <rect width="140" height="155" rx="10" fill="#ffffff" stroke="#6366f1" strokeWidth="1.5" />
              <circle cx="70" cy="38" r="18" fill="#e0e7ff" stroke="#6366f1" strokeWidth="2" />
              <path d="M60 40 C60 33 80 33 80 40 C80 45 70 46 70 50" stroke="#6366f1" strokeWidth="2" fill="none" />
              <circle cx="70" cy="53" r="1.5" fill="#6366f1" />
              <text x="70" y="75" textAnchor="middle" fill="#4338ca" fontSize="13" fontWeight="bold">LỜI NÓI (VERBAL - 5đ)</text>
              <text x="70" y="93" textAnchor="middle" fill="#475569" fontSize="9.5">5: Định hướng đúng</text>
              <text x="70" y="108" textAnchor="middle" fill="#475569" fontSize="9.5">4: Lú lẫn, nói nhảm</text>
              <text x="70" y="123" textAnchor="middle" fill="#475569" fontSize="9.5">3: Từ ngữ vô nghĩa</text>
              <text x="70" y="138" textAnchor="middle" fill="#475569" fontSize="9.5">2: Kêu rên ú ớ</text>
              <text x="70" y="153" textAnchor="middle" fill="#dc2626" fontSize="9.5" fontWeight="bold">1: Không đáp ứng</text>
            </g>

            {/* Motor (6 pts) */}
            <g transform="translate(340, 15)">
              <rect width="140" height="155" rx="10" fill="#ffffff" stroke="#10b981" strokeWidth="1.5" />
              <circle cx="70" cy="38" r="18" fill="#d1fae5" stroke="#10b981" strokeWidth="2" />
              <path d="M62 46 L62 36 L68 33 L74 36 L74 46 Z" fill="#10b981" />
              <text x="70" y="75" textAnchor="middle" fill="#047857" fontSize="13" fontWeight="bold">VẬN ĐỘNG (MOTOR - 6đ)</text>
              <text x="70" y="93" textAnchor="middle" fill="#475569" fontSize="9.5">6: Làm theo lệnh</text>
              <text x="70" y="108" textAnchor="middle" fill="#475569" fontSize="9.5">5: Gạt đúng chỗ đau</text>
              <text x="70" y="123" textAnchor="middle" fill="#475569" fontSize="9.5">4: Co tránh đau</text>
              <text x="70" y="138" textAnchor="middle" fill="#d97706" fontSize="9.5">3: Co cứng mất vỏ</text>
              <text x="70" y="153" textAnchor="middle" fill="#dc2626" fontSize="9.5" fontWeight="bold">2: Duỗi cứng mất não (1: Mất)</text>
            </g>
          </svg>
        </div>
      );

    // 1.2 FOUR Score
    case "mental-status-2":
      return (
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 shadow-2xs flex flex-col items-center">
          <div className="w-full flex items-center justify-between mb-2 border-b border-slate-200 pb-2">
            <span className="text-xs font-bold text-teal-800 font-mono">THANG ĐIỂM FOUR (0 - 16 ĐIỂM) - ĐÁNH GIÁ BỆNH NHÂN CÓ ỐNG NKQ</span>
            <span className="text-[10px] text-amber-700 font-bold">Khám 4 trụ cột Thân não & Hô hấp</span>
          </div>
          <svg viewBox="0 0 460 170" className="w-full max-h-52">
            {[
              { title: "Eye (Mắt)", desc: "Mở mắt & dõi theo lệnh", score: "4 - 0", col: "#0284c7", icon: "👁️" },
              { title: "Motor (Vận động)", desc: "Giơ ngón cái / Nắm tay", score: "4 - 0", col: "#6366f1", icon: "✊" },
              { title: "Brainstem (Thân não)", desc: "Phản xạ đồng tử & giác mạc", score: "4 - 0", col: "#059669", icon: "🧠" },
              { title: "Respiration (Thở)", desc: "Thở tự nhiên vs Thở máy", score: "4 - 0", col: "#d97706", icon: "🫁" }
            ].map((item, idx) => (
              <g key={idx} transform={`translate(${15 + idx * 110}, 15)`}>
                <rect width="100" height="135" rx="8" fill="#ffffff" stroke={item.col} strokeWidth="1.5" />
                <rect x="0" y="0" width="100" height="30" rx="8" fill={item.col} fillOpacity="0.12" />
                <text x="50" y="20" textAnchor="middle" fill="#0f172a" fontSize="10.5" fontWeight="bold">{item.title}</text>
                <text x="50" y="55" textAnchor="middle" fontSize="24">{item.icon}</text>
                <text x="50" y="85" textAnchor="middle" fill="#1e293b" fontSize="10" fontWeight="bold">{item.score} điểm</text>
                <foreignObject x="6" y="95" width="88" height="40">
                  <div className="text-[8.5px] text-slate-600 text-center leading-tight">
                    {item.desc}
                  </div>
                </foreignObject>
              </g>
            ))}
          </svg>
        </div>
      );

    // 1.3 OMIHAT
    case "mental-status-3":
      return (
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 shadow-2xs flex flex-col items-center">
          <div className="w-full flex items-center justify-between mb-2 border-b border-slate-200 pb-2">
            <span className="text-xs font-bold text-amber-800 font-mono">QUY TẮC 6 TRỤC O-M-I-H-A-T KHÁM NHẬN THỨC TẠI GIƯỜNG</span>
            <span className="text-[10px] text-slate-600">Phân biệt Mê sảng (Delirium) vs Sa sút trí tuệ</span>
          </div>
          <svg viewBox="0 0 450 170" className="w-full max-h-52">
            {[
              { letter: "O", name: "Orientation", vi: "Định hướng T/G, K/G", x: 20, col: "#0284c7" },
              { letter: "M", name: "Memory", vi: "Nhớ 3 từ sau 3 phút", x: 90, col: "#4f46e5" },
              { letter: "I", name: "Intellect", vi: "Trừ 100 cho 7 liên tiếp", x: 160, col: "#7c3aed" },
              { letter: "H", name: "Hallucination", vi: "Ảo thị, ảo thanh (DTs)", x: 230, col: "#db2777" },
              { letter: "A", name: "Affect", vi: "Khí sắc, cảm xúc", x: 300, col: "#ea580c" },
              { letter: "T", name: "Thought", vi: "Tư duy, hoang tưởng", x: 370, col: "#059669" }
            ].map((item, idx) => (
              <g key={idx} transform={`translate(${item.x}, 15)`}>
                <rect width="60" height="135" rx="8" fill="#ffffff" stroke={item.col} strokeWidth="1.5" />
                <circle cx="30" cy="28" r="16" fill={item.col} fillOpacity="0.15" />
                <text x="30" y="34" textAnchor="middle" fill={item.col} fontSize="16" fontWeight="bold">{item.letter}</text>
                <text x="30" y="60" textAnchor="middle" fill="#0f172a" fontSize="9" fontWeight="bold">{item.name}</text>
                <foreignObject x="4" y="70" width="52" height="60">
                  <div className="text-[8.5px] text-slate-600 text-center leading-tight">
                    {item.vi}
                  </div>
                </foreignObject>
              </g>
            ))}
          </svg>
        </div>
      );

    // 2.1 CN II - RAPD (Marcus Gunn Pupil)
    case "cranial-nerves-1":
      return (
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 shadow-2xs flex flex-col items-center">
          <div className="w-full flex items-center justify-between mb-3 border-b border-slate-200 pb-2">
            <span className="text-xs font-bold text-teal-800 font-mono">TEST ĐÈN PIN ĐẢO CHIỀU TÌM RAPD (MARCUS-GUNN)</span>
            <div className="flex gap-1.5">
              <button
                onClick={() => setToggleMode("normal")}
                className={`text-[10px] px-2.5 py-1 rounded font-semibold transition-all ${
                  toggleMode === "normal" ? "bg-emerald-600 text-white shadow-2xs" : "bg-white text-slate-700 border border-slate-200"
                }`}
              >
                Bình thường
              </button>
              <button
                onClick={() => setToggleMode("abnormal")}
                className={`text-[10px] px-2.5 py-1 rounded font-semibold transition-all ${
                  toggleMode === "abnormal" ? "bg-rose-600 text-white shadow-2xs" : "bg-white text-slate-700 border border-slate-200"
                }`}
              >
                RAPD dương tính (+)
              </button>
            </div>
          </div>

          <svg viewBox="0 0 460 165" className="w-full max-h-52">
            <g transform="translate(40, 15)">
              <text x="80" y="15" textAnchor="middle" fill="#475569" fontSize="11" fontWeight="bold">Mắt Trái (Bình thường)</text>
              <ellipse cx="80" cy="70" rx="55" ry="35" fill="#f8fafc" stroke="#94a3b8" strokeWidth="2" />
              <circle cx="80" cy="70" r="22" fill="#0284c7" />
              <circle cx="80" cy="70" r="9" fill="#0f172a" />
              <path d="M40 125 L75 80" stroke="#eab308" strokeWidth="3" strokeDasharray="4,2" />
              <text x="80" y="135" textAnchor="middle" fill="#0284c7" fontSize="10">Chiếu đèn: Co đồng tử tốt (2mm)</text>
            </g>

            <g transform="translate(250, 15)">
              <text x="80" y="15" textAnchor="middle" fill={toggleMode === "abnormal" ? "#e11d48" : "#059669"} fontSize="11" fontWeight="bold">
                Mắt Phải {toggleMode === "abnormal" ? "(Viêm dây II - Bệnh)" : "(Bình thường)"}
              </text>
              <ellipse cx="80" cy="70" rx="55" ry="35" fill="#f8fafc" stroke={toggleMode === "abnormal" ? "#e11d48" : "#94a3b8"} strokeWidth="2" />
              <circle cx="80" cy="70" r="22" fill="#0284c7" />
              <circle cx="80" cy="70" r={toggleMode === "abnormal" ? 18 : 9} fill="#0f172a" />
              <path d="M120 125 L85 80" stroke="#eab308" strokeWidth="3" strokeDasharray="4,2" />
              <text x="80" y="135" textAnchor="middle" fill={toggleMode === "abnormal" ? "#be123c" : "#059669"} fontSize="10" fontWeight="bold">
                {toggleMode === "abnormal" ? "Đồng tử DÃN NGHỊCH THƯỜNG (5mm)!" : "Co đồng tử đồng ứng (2mm)"}
              </text>
            </g>
          </svg>
          <p className="text-[11px] text-slate-600 mt-1 text-center">
            {toggleMode === "abnormal"
              ? "Khi đảo đèn sang mắt tổn thương dây II, tín hiệu hướng tâm suy giảm khiến đồng tử dãn to ra thay vì co lại."
              : "Ở người bình thường, ánh sáng vào bất kỳ mắt nào cũng gây co nhỏ đồng tử cả 2 mắt."}
          </p>
        </div>
      );

    // 2.2 CN III, IV, VI
    case "cranial-nerves-2":
      return (
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 shadow-2xs flex flex-col items-center">
          <div className="w-full flex items-center justify-between mb-2 border-b border-slate-200 pb-2">
            <span className="text-xs font-bold text-teal-800 font-mono">QUỸ ĐẠO CHỮ H & QUY TẮC CƠ VẬN NHÃN: LR6 - SO4 - REST 3</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200 font-semibold">
              Liệt III = Mắt Down & Out + Sụp mi
            </span>
          </div>

          <svg viewBox="0 0 480 170" className="w-full max-h-52">
            <g transform="translate(60, 15)">
              <line x1="40" y1="20" x2="40" y2="130" stroke="#0284c7" strokeWidth="3" strokeLinecap="round" />
              <line x1="160" y1="20" x2="160" y2="130" stroke="#0284c7" strokeWidth="3" strokeLinecap="round" />
              <line x1="40" y1="75" x2="160" y2="75" stroke="#0284c7" strokeWidth="3" strokeLinecap="round" />

              <circle cx="40" cy="20" r="6" fill="#0284c7" />
              <text x="35" y="14" textAnchor="end" fill="#0369a1" fontSize="9" fontWeight="bold">Trực trên (III)</text>

              <circle cx="160" cy="20" r="6" fill="#0284c7" />
              <text x="165" y="14" textAnchor="start" fill="#0369a1" fontSize="9" fontWeight="bold">Chéo dưới (III)</text>

              <circle cx="40" cy="75" r="6" fill="#e11d48" />
              <text x="30" y="79" textAnchor="end" fill="#be123c" fontSize="9" fontWeight="bold">Trực ngoài (VI)</text>

              <circle cx="160" cy="75" r="6" fill="#0284c7" />
              <text x="170" y="79" textAnchor="start" fill="#0369a1" fontSize="9" fontWeight="bold">Trực trong (III)</text>

              <circle cx="40" cy="130" r="6" fill="#0284c7" />
              <text x="35" y="145" textAnchor="end" fill="#0369a1" fontSize="9" fontWeight="bold">Trực dưới (III)</text>

              <circle cx="160" cy="130" r="6" fill="#d97706" />
              <text x="165" y="145" textAnchor="start" fill="#b45309" fontSize="9" fontWeight="bold">Chéo trên (IV)</text>
            </g>

            <g transform="translate(300, 15)">
              <rect width="150" height="135" rx="10" fill="#ffffff" stroke="#e11d48" strokeWidth="1.5" />
              <text x="75" y="22" textAnchor="middle" fill="#be123c" fontSize="10.5" fontWeight="bold">HÌNH ẢNH LIỆT DÂY III</text>
              <ellipse cx="75" cy="65" rx="45" ry="25" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.5" />
              <circle cx="95" cy="75" r="16" fill="#0284c7" />
              <circle cx="95" cy="75" r="9" fill="#0f172a" />
              <path d="M30 55 Q75 75 120 55" stroke="#e11d48" strokeWidth="3" fill="#ffffff" fillOpacity="0.7" />
              <text x="75" y="105" textAnchor="middle" fill="#be123c" fontSize="9" fontWeight="bold">Nhìn xuống & Ra ngoài</text>
              <text x="75" y="120" textAnchor="middle" fill="#e11d48" fontSize="8.5">(Down-and-Out + Sụp mi)</text>
            </g>
          </svg>
        </div>
      );

    // 2.3 CN VII - Facial Palsy
    case "cranial-nerves-3":
      return (
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 shadow-2xs flex flex-col items-center">
          <div className="w-full flex items-center justify-between mb-2 border-b border-slate-200 pb-2">
            <span className="text-xs font-bold text-teal-800 font-mono">PHÂN BIỆT LIỆT MẶT TRUNG ƯƠNG (ĐỘT QUỴ) VS NGOẠI BIÊN (BELL)</span>
            <span className="text-[10px] text-amber-700 font-bold">Quy tắc nếp nhăn trán</span>
          </div>

          <svg viewBox="0 0 480 170" className="w-full max-h-52">
            <g transform="translate(30, 10)">
              <rect width="190" height="145" rx="10" fill="#ffffff" stroke="#0284c7" strokeWidth="1.5" />
              <text x="95" y="20" textAnchor="middle" fill="#0369a1" fontSize="11" fontWeight="bold">LIỆT TRUNG ƯƠNG (Đột quỵ)</text>
              <circle cx="95" cy="75" r="42" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.5" />
              <line x1="75" y1="50" x2="115" y2="50" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" />
              <line x1="78" y1="56" x2="112" y2="56" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" />
              <circle cx="82" cy="68" r="4" fill="#64748b" />
              <circle cx="108" cy="68" r="4" fill="#64748b" />
              <path d="M80 96 Q95 90 110 88" stroke="#e11d48" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <text x="95" y="128" textAnchor="middle" fill="#0891b2" fontSize="9.5" fontWeight="bold">CÒN NẾP NHĂN TRÁN</text>
              <text x="95" y="140" textAnchor="middle" fill="#64748b" fontSize="8.5">Liệt 1/4 dưới mặt đối bên tổn thương</text>
            </g>

            <g transform="translate(260, 10)">
              <rect width="190" height="145" rx="10" fill="#ffffff" stroke="#e11d48" strokeWidth="1.5" />
              <text x="95" y="20" textAnchor="middle" fill="#be123c" fontSize="11" fontWeight="bold">LIỆT NGOẠI BIÊN (Bell's Palsy)</text>
              <circle cx="95" cy="75" r="42" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.5" />
              <line x1="75" y1="50" x2="93" y2="50" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
              <circle cx="82" cy="68" r="4" fill="#64748b" />
              <ellipse cx="108" cy="68" rx="6" ry="2" fill="none" stroke="#e11d48" strokeWidth="2" />
              <path d="M80 96 Q95 93 110 84" stroke="#e11d48" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <text x="95" y="128" textAnchor="middle" fill="#be123c" fontSize="9.5" fontWeight="bold">MẤT HOÀN TOÀN NẾP TRÁN</text>
              <text x="95" y="140" textAnchor="middle" fill="#e11d48" fontSize="8.5">Mắt nhắm không kín (Charles Bell +)</text>
            </g>
          </svg>
        </div>
      );

    // 2.4 CN IX, X, XII (Uvula & Tongue Deviation)
    case "cranial-nerves-4":
      return (
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 shadow-2xs flex flex-col items-center">
          <div className="w-full flex items-center justify-between mb-2 border-b border-slate-200 pb-2">
            <span className="text-xs font-bold text-teal-800 font-mono">DÂY IX, X & XII: HƯỚNG LỆCH CỦA LƯỠI GÀ VÀ ĐẦU LƯỠI</span>
            <span className="text-[10px] text-amber-700 font-bold">Quy tắc định vị thân não</span>
          </div>
          <svg viewBox="0 0 460 165" className="w-full max-h-52">
            {/* Uvula (CN IX-X) */}
            <g transform="translate(30, 10)">
              <rect width="190" height="145" rx="8" fill="#ffffff" stroke="#0284c7" strokeWidth="1.5" />
              <text x="95" y="20" textAnchor="middle" fill="#0369a1" fontSize="11" fontWeight="bold">DÂY X: LƯỠI GÀ KHI PHÁT ÂM "A"</text>
              <ellipse cx="95" cy="70" rx="55" ry="30" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.5" />
              {/* Uvula deviating to the HEALTHY side (left) */}
              <path d="M95 45 Q80 65 75 75" stroke="#e11d48" strokeWidth="6" strokeLinecap="round" fill="none" />
              <text x="95" y="120" textAnchor="middle" fill="#be123c" fontSize="9.5" fontWeight="bold">Lệch về bên LÀNH</text>
              <text x="95" y="135" textAnchor="middle" fill="#64748b" fontSize="8.5">(Bên bệnh màng hầu liệt không co kéo)</text>
            </g>

            {/* Tongue (CN XII) */}
            <g transform="translate(240, 10)">
              <rect width="190" height="145" rx="8" fill="#ffffff" stroke="#d97706" strokeWidth="1.5" />
              <text x="95" y="20" textAnchor="middle" fill="#b45309" fontSize="11" fontWeight="bold">DÂY XII: THÈ LƯỠI RA TRƯỚC</text>
              <ellipse cx="95" cy="70" rx="55" ry="30" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.5" />
              {/* Tongue deviating to the PARALYZED side (right) */}
              <path d="M95 70 C95 85 120 95 125 102" stroke="#d97706" strokeWidth="8" strokeLinecap="round" fill="none" />
              <text x="95" y="120" textAnchor="middle" fill="#b45309" fontSize="9.5" fontWeight="bold">Lệch về bên BỆNH (Bên liệt)</text>
              <text x="95" y="135" textAnchor="middle" fill="#d97706" fontSize="8.5">(Cơ cằm lưỡi bên lành đẩy sang bên yếu)</text>
            </g>
          </svg>
        </div>
      );

    // 3.1 Pronator Drift
    case "motor-system-1":
      return (
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 shadow-2xs flex flex-col items-center">
          <div className="w-full flex items-center justify-between mb-2 border-b border-slate-200 pb-2">
            <span className="text-xs font-bold text-teal-800 font-mono">DẤU HIỆU PRONATOR DRIFT (TỔN THƯƠNG BÓ THÁP KÍN ĐÁO)</span>
            <span className="text-[10px] text-slate-600">Giơ 2 tay ngửa, nhắm mắt 10 giây</span>
          </div>

          <svg viewBox="0 0 460 165" className="w-full max-h-52">
            <g transform="translate(50, 15)">
              <rect width="150" height="135" rx="8" fill="#ffffff" stroke="#059669" strokeWidth="1.5" />
              <text x="75" y="22" textAnchor="middle" fill="#059669" fontSize="10.5" fontWeight="bold">TAY BÌNH THƯỜNG</text>
              <path d="M75 105 L75 50" stroke="#059669" strokeWidth="8" strokeLinecap="round" />
              <ellipse cx="75" cy="45" rx="14" ry="7" fill="#059669" />
              <text x="75" y="125" textAnchor="middle" fill="#047857" fontSize="9">Giữ vững tư thế ngửa</text>
            </g>

            <g transform="translate(260, 15)">
              <rect width="150" height="135" rx="8" fill="#ffffff" stroke="#e11d48" strokeWidth="1.5" />
              <text x="75" y="22" textAnchor="middle" fill="#be123c" fontSize="10.5" fontWeight="bold">TAY LIỆT THÁP (ĐỐI BÊN)</text>
              <path d="M60 110 L95 60" stroke="#e11d48" strokeWidth="8" strokeLinecap="round" />
              <ellipse cx="98" cy="57" rx="7" ry="14" fill="#e11d48" transform="rotate(35 98 57)" />
              <path d="M110 43 A 15 15 0 0 1 125 60" stroke="#d97706" strokeWidth="2.5" fill="none" />
              <text x="75" y="115" textAnchor="middle" fill="#be123c" fontSize="9" fontWeight="bold">Úp sấp & Hạ rơi xuống giường</text>
              <text x="75" y="128" textAnchor="middle" fill="#e11d48" fontSize="8">(Chỉ điểm nơron vận động trên)</text>
            </g>
          </svg>
        </div>
      );

    // 3.2 MRC Scale Ladder
    case "motor-system-2":
      return (
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 shadow-2xs flex flex-col items-center">
          <div className="w-full flex items-center justify-between mb-2 border-b border-slate-200 pb-2">
            <span className="text-xs font-bold text-teal-800 font-mono">THANG ĐO SỨC CƠ MRC 6 MỨC (0 ĐẾN 5 ĐIỂM)</span>
            <span className="text-[10px] text-emerald-700 font-bold">Khám đối xứng từ đầu đến chân</span>
          </div>
          <svg viewBox="0 0 460 160" className="w-full max-h-52">
            {[
              { score: "0/5", desc: "Liệt hoàn toàn, không co cơ", col: "#ef4444" },
              { score: "1/5", desc: "Co cơ nhẹ nhưng không cử động khớp", col: "#f97316" },
              { score: "2/5", desc: "Cử động trượt trên mặt phẳng (không thắng trọng lực)", col: "#f59e0b" },
              { score: "3/5", desc: "Thắng được trọng lực (nhấc khỏi giường)", col: "#eab308" },
              { score: "4/5", desc: "Thắng một phần lực cản của người khám", col: "#84cc16" },
              { score: "5/5", desc: "Sức cơ bình thường, kháng cự hoàn toàn", col: "#10b981" }
            ].map((item, idx) => (
              <g key={idx} transform={`translate(${15 + idx * 72}, 15)`}>
                <rect width="65" height="130" rx="6" fill="#ffffff" stroke={item.col} strokeWidth="1.5" />
                <rect x="0" y="0" width="65" height="28" rx="6" fill={item.col} />
                <text x="32.5" y="19" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">{item.score}</text>
                <foreignObject x="4" y="35" width="57" height="90">
                  <div className="text-[8.5px] text-slate-700 text-center leading-tight flex items-center h-full">
                    {item.desc}
                  </div>
                </foreignObject>
              </g>
            ))}
          </svg>
        </div>
      );

    // 3.3 UMN vs LMN
    case "motor-system-3":
      return (
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 shadow-2xs flex flex-col items-center">
          <div className="w-full flex items-center justify-between mb-2 border-b border-slate-200 pb-2">
            <span className="text-xs font-bold text-teal-800 font-mono">ĐỐI CHIẾU NƠRON VẬN ĐỘNG TRÊN (UMN) VS DƯỚI (LMN)</span>
            <span className="text-[10px] text-indigo-700 font-bold">Trụ cột định vị tổn thương</span>
          </div>
          <div className="w-full grid grid-cols-2 gap-3 text-xs">
            <div className="bg-white border border-indigo-200 rounded-xl p-3 space-y-1.5 shadow-2xs">
              <div className="text-indigo-800 font-bold flex items-center gap-1.5 border-b border-indigo-100 pb-1">
                <span>🧠 UMN (Tổn thương Trung ương - Bán cầu/Tủy)</span>
              </div>
              <ul className="space-y-1 text-slate-700 text-[11px]">
                <li>• <b>Trương lực cơ:</b> TĂNG kiểu gấp dao (Spasticity)</li>
                <li>• <b>Phản xạ gân xương:</b> TĂNG mạnh (3+, 4+) kèm Clonus</li>
                <li>• <b>Phản xạ tháp:</b> Babinski DƯƠNG TÍNH (+)</li>
                <li>• <b>Teo cơ:</b> Không hoặc teo muộn do bất động</li>
                <li>• <b>Rung giật bó cơ:</b> KHÔNG có</li>
              </ul>
            </div>

            <div className="bg-white border border-rose-200 rounded-xl p-3 space-y-1.5 shadow-2xs">
              <div className="text-rose-800 font-bold flex items-center gap-1.5 border-b border-rose-100 pb-1">
                <span>⚡ LMN (Tổn thương Ngoại biên - Rễ/Dây/Sừng trước)</span>
              </div>
              <ul className="space-y-1 text-slate-700 text-[11px]">
                <li>• <b>Trương lực cơ:</b> GIẢM (Liệt mềm)</li>
                <li>• <b>Phản xạ gân xương:</b> GIẢM hoặc MẤT hoàn toàn (0, 1+)</li>
                <li>• <b>Phản xạ tháp:</b> Babinski ÂM TÍNH (-)</li>
                <li>• <b>Teo cơ:</b> Teo cơ RÕ RỆT và XUẤT HIỆN SỚM</li>
                <li>• <b>Rung giật bó cơ:</b> CÓ (Fasciculations nhấp nháy)</li>
              </ul>
            </div>
          </div>
        </div>
      );

    // 4.1 Sensory Level & Landmarks
    case "sensory-dermatomes-1":
      return (
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 shadow-2xs flex flex-col items-center">
          <div className="w-full flex items-center justify-between mb-2 border-b border-slate-200 pb-2">
            <span className="text-xs font-bold text-indigo-800 font-mono">BẢN ĐỒ CÁC KHOANH DA CỘT MỐC ĐỊNH VỊ TỦY SỐNG</span>
            <span className="text-[10px] text-slate-600">Định vị mức cảm giác cắt ngang</span>
          </div>

          <svg viewBox="0 0 460 175" className="w-full max-h-56">
            <g transform="translate(180, 10)">
              <circle cx="50" cy="18" r="14" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.5" />
              <rect x="20" y="35" width="60" height="110" rx="8" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.5" />
              <line x1="20" y1="58" x2="80" y2="58" stroke="#0284c7" strokeWidth="2.5" />
              <circle cx="35" cy="58" r="2" fill="#0284c7" />
              <circle cx="65" cy="58" r="2" fill="#0284c7" />
              <line x1="20" y1="92" x2="80" y2="92" stroke="#d97706" strokeWidth="2.5" />
              <circle cx="50" cy="92" r="2.5" fill="#d97706" />
              <line x1="20" y1="125" x2="80" y2="125" stroke="#059669" strokeWidth="2.5" />
            </g>

            <g transform="translate(20, 15)">
              <rect width="130" height="38" rx="6" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1" />
              <text x="65" y="16" textAnchor="middle" fill="#0369a1" fontSize="10.5" fontWeight="bold">MỨC T4: NÚM VÚ</text>
              <text x="65" y="30" textAnchor="middle" fill="#0284c7" fontSize="9">Ngang đường liên núm vú</text>
            </g>

            <g transform="translate(20, 65)">
              <rect width="130" height="38" rx="6" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
              <text x="65" y="16" textAnchor="middle" fill="#b45309" fontSize="10.5" fontWeight="bold">MỨC T10: RỐN</text>
              <text x="65" y="30" textAnchor="middle" fill="#d97706" fontSize="9">Ngang qua lỗ rốn</text>
            </g>

            <g transform="translate(20, 115)">
              <rect width="130" height="38" rx="6" fill="#d1fae5" stroke="#059669" strokeWidth="1" />
              <text x="65" y="16" textAnchor="middle" fill="#047857" fontSize="10.5" fontWeight="bold">MỨC L1: BẸN</text>
              <text x="65" y="30" textAnchor="middle" fill="#059669" fontSize="9">Nếp lằn bẹn</text>
            </g>

            <g transform="translate(310, 15)">
              <rect width="130" height="38" rx="6" fill="#e0e7ff" stroke="#6366f1" strokeWidth="1" />
              <text x="65" y="16" textAnchor="middle" fill="#4338ca" fontSize="10.5" fontWeight="bold">C6: NGÓN CÁI</text>
              <text x="65" y="30" textAnchor="middle" fill="#4f46e5" fontSize="9">C7: Giữa | C8: Ngón út</text>
            </g>

            <g transform="translate(310, 65)">
              <rect width="130" height="38" rx="6" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1" />
              <text x="65" y="16" textAnchor="middle" fill="#6d28d9" fontSize="10.5" fontWeight="bold">L4: ĐẦU GỐI</text>
              <text x="65" y="30" textAnchor="middle" fill="#7c3aed" fontSize="9">L5: Mu chân & ngón 1</text>
            </g>

            <g transform="translate(310, 115)">
              <rect width="130" height="38" rx="6" fill="#ffe4e6" stroke="#e11d48" strokeWidth="1" />
              <text x="65" y="16" textAnchor="middle" fill="#be123c" fontSize="10.5" fontWeight="bold">S1: BỜ NGOÀI GÓT</text>
              <text x="65" y="30" textAnchor="middle" fill="#e11d48" fontSize="9">S2-S5: Vùng yên ngựa</text>
            </g>
          </svg>
        </div>
      );

    // 4.2 Brown-Sequard
    case "sensory-dermatomes-2":
      return (
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 shadow-2xs flex flex-col items-center">
          <div className="w-full flex items-center justify-between mb-2 border-b border-slate-200 pb-2">
            <span className="text-xs font-bold text-indigo-800 font-mono">HỘI CHỨNG BROWN-SÉQUARD (TỔN THƯƠNG NỬA CẮT TỦY)</span>
            <span className="text-[10px] text-rose-700 font-bold">Phân ly cảm giác & vận động</span>
          </div>
          <svg viewBox="0 0 460 160" className="w-full max-h-52">
            <g transform="translate(40, 15)">
              <rect width="180" height="130" rx="8" fill="#ffffff" stroke="#0284c7" strokeWidth="1.5" />
              <text x="90" y="22" textAnchor="middle" fill="#0369a1" fontSize="11" fontWeight="bold">CÙNG BÊN VỚI TỔN THƯƠNG</text>
              <text x="90" y="55" textAnchor="middle" fill="#be123c" fontSize="11" fontWeight="bold">• LIỆT VẬN ĐỘNG (Bó tháp)</text>
              <text x="90" y="80" textAnchor="middle" fill="#be123c" fontSize="11" fontWeight="bold">• MẤT CẢM GIÁC SÂU (Cột sau)</text>
              <text x="90" y="98" textAnchor="middle" fill="#64748b" fontSize="9">(Mất vị thế khớp & rung âm thoa)</text>
              <text x="90" y="115" textAnchor="middle" fill="#059669" fontSize="9">(Cảm giác đau/nhiệt VẪN BÌNH THƯỜNG)</text>
            </g>

            <g transform="translate(240, 15)">
              <rect width="180" height="130" rx="8" fill="#ffffff" stroke="#e11d48" strokeWidth="1.5" />
              <text x="90" y="22" textAnchor="middle" fill="#be123c" fontSize="11" fontWeight="bold">ĐỐI BÊN VỚI TỔN THƯƠNG</text>
              <text x="90" y="55" textAnchor="middle" fill="#059669" fontSize="11" fontWeight="bold">• VẬN ĐỘNG BÌNH THƯỜNG</text>
              <text x="90" y="80" textAnchor="middle" fill="#be123c" fontSize="11" fontWeight="bold">• MẤT CẢM GIÁC ĐAU & NHIỆT</text>
              <text x="90" y="98" textAnchor="middle" fill="#64748b" fontSize="9">(Do bó gai thị bắt chéo cách 1-2 đốt)</text>
              <text x="90" y="115" textAnchor="middle" fill="#059669" fontSize="9">(Cảm giác sâu VẪN BẢO TỒN)</text>
            </g>
          </svg>
        </div>
      );

    // 4.3 Saddle Anesthesia S2-S5
    case "sensory-dermatomes-3":
      return (
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 shadow-2xs flex flex-col items-center">
          <div className="w-full flex items-center justify-between mb-2 border-b border-slate-200 pb-2">
            <span className="text-xs font-bold text-rose-800 font-mono">TÊ VÙNG YÊN NGỰA (SADDLE ANESTHESIA S2 - S5)</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200 font-bold">
              CẤP CỨU HỘI CHỨNG CHÙM ĐUÔI NGỰA (GIẢI ÉP TRƯỚC 48H)
            </span>
          </div>
          <svg viewBox="0 0 460 160" className="w-full max-h-52">
            <g transform="translate(40, 15)">
              <rect width="180" height="130" rx="8" fill="#ffffff" stroke="#e11d48" strokeWidth="1.5" />
              <text x="90" y="20" textAnchor="middle" fill="#be123c" fontSize="10.5" fontWeight="bold">KHU VỰC CHI PHỐI S2-S5</text>
              <circle cx="90" cy="70" r="35" fill="#ffe4e6" stroke="#e11d48" strokeWidth="2" strokeDasharray="3,2" />
              <text x="90" y="65" textAnchor="middle" fill="#be123c" fontSize="11" fontWeight="bold">Đáy chậu & Hậu môn</text>
              <text x="90" y="80" textAnchor="middle" fill="#e11d48" fontSize="9">Mặt trong 2 mông</text>
              <text x="90" y="118" textAnchor="middle" fill="#9f1239" fontSize="9.5">Mất cảm giác ngồi trên yên ngựa</text>
            </g>

            <g transform="translate(240, 15)">
              <rect width="180" height="130" rx="8" fill="#ffffff" stroke="#d97706" strokeWidth="1.5" />
              <text x="90" y="20" textAnchor="middle" fill="#b45309" fontSize="10.5" fontWeight="bold">BỘ BA DẤU HIỆU BÁO ĐỘNG</text>
              <text x="90" y="48" textAnchor="middle" fill="#92400e" fontSize="10">• Mất cảm giác quanh hậu môn</text>
              <text x="90" y="70" textAnchor="middle" fill="#92400e" fontSize="10">• Giảm trương lực cơ thắt (DRE)</text>
              <text x="90" y="92" textAnchor="middle" fill="#92400e" fontSize="10">• Bí tiểu cấp / Tiểu không tự chủ</text>
              <text x="90" y="118" textAnchor="middle" fill="#dc2626" fontSize="9" fontWeight="bold">Chỉ định chụp MRI khẩn cấp</text>
            </g>
          </svg>
        </div>
      );

    // 5.1 Deep Tendon Reflexes
    case "reflexes-1":
      return (
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 shadow-2xs flex flex-col items-center">
          <div className="w-full flex items-center justify-between mb-2 border-b border-slate-200 pb-2">
            <span className="text-xs font-bold text-teal-800 font-mono">BẢN ĐỒ CUNG PHẢN XẠ GÂN XƯƠNG SÂU & RỄ THẦN KINH</span>
            <span className="text-[10px] text-slate-600">Đánh giá thang điểm 0 đến 4+</span>
          </div>
          <svg viewBox="0 0 460 160" className="w-full max-h-52">
            {[
              { name: "Gân Nhị đầu", root: "C5 - C6", loc: "Gập khuỷu", col: "#0284c7" },
              { name: "Cánh tay quay", root: "C6", loc: "Cẳng tay", col: "#6366f1" },
              { name: "Gân Tam đầu", root: "C7", loc: "Duỗi khuỷu", col: "#8b5cf6" },
              { name: "Gân Bánh chè", root: "L4", loc: "Duỗi đầu gối", col: "#059669" },
              { name: "Gân Gót (Achilles)", root: "S1", loc: "Gập lòng bàn chân", col: "#d97706" }
            ].map((item, idx) => (
              <g key={idx} transform={`translate(${15 + idx * 88}, 15)`}>
                <rect width="80" height="130" rx="8" fill="#ffffff" stroke={item.col} strokeWidth="1.5" />
                <rect x="0" y="0" width="80" height="26" rx="8" fill={item.col} />
                <text x="40" y="18" textAnchor="middle" fill="#ffffff" fontSize="9.5" fontWeight="bold">{item.root}</text>
                <text x="40" y="55" textAnchor="middle" fill="#0f172a" fontSize="10" fontWeight="bold">{item.name}</text>
                <text x="40" y="80" textAnchor="middle" fill="#64748b" fontSize="9">{item.loc}</text>
                <text x="40" y="115" textAnchor="middle" fill={item.col} fontSize="8.5" fontWeight="bold">Búa gõ phản xạ</text>
              </g>
            ))}
          </svg>
        </div>
      );

    // 5.2 Babinski Sign
    case "reflexes-2":
      return (
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 shadow-2xs flex flex-col items-center">
          <div className="w-full flex items-center justify-between mb-2 border-b border-slate-200 pb-2">
            <span className="text-xs font-bold text-rose-800 font-mono">DẤU HIỆU BABINSKI (PHẢN XẠ THÁP BỆNH LÝ)</span>
            <span className="text-[10px] text-slate-600">Vạch bờ ngoài lòng bàn chân</span>
          </div>

          <svg viewBox="0 0 460 170" className="w-full max-h-52">
            <g transform="translate(50, 15)">
              <rect width="160" height="140" rx="8" fill="#ffffff" stroke="#0284c7" strokeWidth="1.5" />
              <text x="80" y="20" textAnchor="middle" fill="#0369a1" fontSize="10.5" fontWeight="bold">ĐƯỜNG KÍCH THÍCH</text>
              <path d="M60 115 C50 95 55 55 70 42 C85 42 95 55 90 85 C85 105 90 115 75 120 Z" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.5" />
              <path d="M65 110 L62 60 C62 50 75 48 82 48" stroke="#d97706" strokeWidth="3" strokeDasharray="3,2" fill="none" />
              <polygon points="85,48 79,44 79,52" fill="#d97706" />
              <text x="80" y="132" textAnchor="middle" fill="#64748b" fontSize="8.5">Vạch từ gót dọc bờ ngoài</text>
            </g>

            <g transform="translate(250, 15)">
              <rect width="170" height="140" rx="8" fill="#ffffff" stroke="#e11d48" strokeWidth="1.5" />
              <text x="85" y="20" textAnchor="middle" fill="#be123c" fontSize="10.5" fontWeight="bold">BABINSKI DƯƠNG TÍNH (+)</text>
              <path d="M60 105 L60 60 L55 38" stroke="#e11d48" strokeWidth="7" strokeLinecap="round" />
              <polygon points="55,28 49,40 61,40" fill="#e11d48" />
              <line x1="70" y1="60" x2="75" y2="45" stroke="#e11d48" strokeWidth="4" strokeLinecap="round" />
              <line x1="80" y1="63" x2="90" y2="49" stroke="#e11d48" strokeWidth="4" strokeLinecap="round" />
              <line x1="90" y1="67" x2="105" y2="55" stroke="#e11d48" strokeWidth="4" strokeLinecap="round" />
              <line x1="100" y1="73" x2="118" y2="62" stroke="#e11d48" strokeWidth="4" strokeLinecap="round" />
              <text x="85" y="120" textAnchor="middle" fill="#be123c" fontSize="9.5" fontWeight="bold">Ngón cái DUỖI LÊN TRỜI</text>
              <text x="85" y="133" textAnchor="middle" fill="#e11d48" fontSize="8.5">Các ngón xòe nan quạt (Bó tháp)</text>
            </g>
          </svg>
        </div>
      );

    // 5.3 Meningeal Signs
    case "reflexes-3":
      return (
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 shadow-2xs flex flex-col items-center">
          <div className="w-full flex items-center justify-between mb-2 border-b border-slate-200 pb-2">
            <span className="text-xs font-bold text-rose-800 font-mono">DẤU HIỆU KÍCH THÍCH MÀNG NÃO: BRUDZINSKI & KERNIG</span>
            <span className="text-[10px] text-amber-700 font-bold">Viêm màng não & Xuất huyết SAH</span>
          </div>

          <svg viewBox="0 0 460 165" className="w-full max-h-52">
            <g transform="translate(30, 10)">
              <rect width="190" height="140" rx="8" fill="#ffffff" stroke="#0284c7" strokeWidth="1.5" />
              <text x="95" y="20" textAnchor="middle" fill="#0369a1" fontSize="11" fontWeight="bold">DẤU BRUDZINSKI (+)</text>
              <line x1="20" y1="95" x2="170" y2="95" stroke="#cbd5e1" strokeWidth="2" />
              <circle cx="45" cy="72" r="10" fill="#0284c7" />
              <path d="M45 78 L65 88" stroke="#0284c7" strokeWidth="3" />
              <path d="M65 88 L105 88 L125 72 L145 92" stroke="#e11d48" strokeWidth="4" fill="none" strokeLinecap="round" />
              <text x="95" y="118" textAnchor="middle" fill="#be123c" fontSize="9" fontWeight="bold">Gập cổ thụ động</text>
              <text x="95" y="130" textAnchor="middle" fill="#e11d48" fontSize="8.5">→ Tự động co gập gối & háng hai bên</text>
            </g>

            <g transform="translate(240, 10)">
              <rect width="190" height="140" rx="8" fill="#ffffff" stroke="#d97706" strokeWidth="1.5" />
              <text x="95" y="20" textAnchor="middle" fill="#b45309" fontSize="11" fontWeight="bold">DẤU KERNIG (+)</text>
              <line x1="20" y1="95" x2="170" y2="95" stroke="#cbd5e1" strokeWidth="2" />
              <circle cx="45" cy="85" r="10" fill="#64748b" />
              <path d="M55 88 L105 88" stroke="#64748b" strokeWidth="3" />
              <path d="M105 88 L105 55 L135 65" stroke="#d97706" strokeWidth="4" fill="none" strokeLinecap="round" />
              <text x="95" y="118" textAnchor="middle" fill="#b45309" fontSize="9" fontWeight="bold">Gập đùi 90 độ, duỗi cẳng chân</text>
              <text x="95" y="130" textAnchor="middle" fill="#d97706" fontSize="8.5">→ Đau co cứng kháng cự góc &lt; 135°</text>
            </g>
          </svg>
        </div>
      );

    // 6.1 Cerebellar Coordination
    case "coordination-gait-1":
      return (
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 shadow-2xs flex flex-col items-center">
          <div className="w-full flex items-center justify-between mb-2 border-b border-slate-200 pb-2">
            <span className="text-xs font-bold text-teal-800 font-mono">NGHIỆM PHÁP NGÓN TAY CHỈ MŨI (FINGER-TO-NOSE)</span>
            <span className="text-[10px] text-amber-700 font-bold">Phát hiện Run chủ ý & Quá tầm tiểu não</span>
          </div>
          <svg viewBox="0 0 460 160" className="w-full max-h-52">
            <g transform="translate(30, 10)">
              <rect width="190" height="135" rx="8" fill="#ffffff" stroke="#059669" strokeWidth="1.5" />
              <text x="95" y="20" textAnchor="middle" fill="#047857" fontSize="10.5" fontWeight="bold">ĐÁP ỨNG BÌNH THƯỜNG</text>
              <line x1="30" y1="65" x2="160" y2="65" stroke="#059669" strokeWidth="2.5" />
              <circle cx="30" cy="65" r="5" fill="#059669" />
              <circle cx="160" cy="65" r="5" fill="#059669" />
              <text x="95" y="95" textAnchor="middle" fill="#047857" fontSize="9.5" fontWeight="bold">Đường đi thẳng tắp, mượt mà</text>
              <text x="95" y="112" textAnchor="middle" fill="#64748b" fontSize="8.5">Chạm trúng đích ngón tay người khám</text>
            </g>

            <g transform="translate(240, 10)">
              <rect width="190" height="135" rx="8" fill="#ffffff" stroke="#e11d48" strokeWidth="1.5" />
              <text x="95" y="20" textAnchor="middle" fill="#be123c" fontSize="10.5" fontWeight="bold">BẤT THƯỜNG TIỂU NÃO (ATAXIA)</text>
              {/* Tremor line oscillating towards end */}
              <path d="M30 65 Q60 65 90 62 Q110 55 125 75 Q140 50 160 65" stroke="#e11d48" strokeWidth="2.5" fill="none" />
              <circle cx="30" cy="65" r="5" fill="#64748b" />
              <circle cx="160" cy="65" r="5" fill="#e11d48" />
              <text x="95" y="95" textAnchor="middle" fill="#be123c" fontSize="9.5" fontWeight="bold">Run chủ ý (Intention Tremor)</text>
              <text x="95" y="112" textAnchor="middle" fill="#e11d48" fontSize="8.5">Càng đến gần đích run càng dữ dội</text>
            </g>
          </svg>
        </div>
      );

    // 6.2 Romberg & Tandem Gait
    case "coordination-gait-2":
      return (
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 shadow-2xs flex flex-col items-center">
          <div className="w-full flex items-center justify-between mb-2 border-b border-slate-200 pb-2">
            <span className="text-xs font-bold text-teal-800 font-mono">NGHIỆM PHÁP ROMBERG: THẤT ĐIỀU CẢM GIÁC VS TIỂU NÃO</span>
            <span className="text-[10px] text-slate-600">Đứng chụm 2 chân, mở mắt rồi nhắm mắt</span>
          </div>
          <svg viewBox="0 0 460 160" className="w-full max-h-52">
            <g transform="translate(30, 10)">
              <rect width="190" height="135" rx="8" fill="#ffffff" stroke="#0284c7" strokeWidth="1.5" />
              <text x="95" y="20" textAnchor="middle" fill="#0369a1" fontSize="10.5" fontWeight="bold">ROMBERG (+): CẢM GIÁC SÂU</text>
              <text x="95" y="50" textAnchor="middle" fill="#059669" fontSize="10">👁️ Mở mắt: ĐỨNG VỮNG VÀNG</text>
              <text x="95" y="75" textAnchor="middle" fill="#dc2626" fontSize="10" fontWeight="bold">🙈 Nhắm mắt: NGÃ NGAY LẬP TỨC!</text>
              <text x="95" y="105" textAnchor="middle" fill="#64748b" fontSize="9">Tổn thương Cột sau tủy sống</text>
              <text x="95" y="118" textAnchor="middle" fill="#64748b" fontSize="8.5">hoặc Bệnh lý thần kinh ngoại biên</text>
            </g>

            <g transform="translate(240, 10)">
              <rect width="190" height="135" rx="8" fill="#ffffff" stroke="#d97706" strokeWidth="1.5" />
              <text x="95" y="20" textAnchor="middle" fill="#b45309" fontSize="10.5" fontWeight="bold">THẤT ĐIỀU TIỂU NÃO (CEREBELLAR)</text>
              <text x="95" y="50" textAnchor="middle" fill="#dc2626" fontSize="10" fontWeight="bold">👁️ Mở mắt: ĐÃ ĐỨNG KHÔNG VỮNG</text>
              <text x="95" y="75" textAnchor="middle" fill="#dc2626" fontSize="10" fontWeight="bold">🙈 Nhắm mắt: Vẫn loạng choạng tương đương</text>
              <text x="95" y="105" textAnchor="middle" fill="#b45309" fontSize="9">Tổn thương Thùy nhộng tiểu não</text>
              <text x="95" y="118" textAnchor="middle" fill="#d97706" fontSize="8.5">(Chân đế rộng như say rượu)</text>
            </g>
          </svg>
        </div>
      );

    // 6.3 Gaits
    case "coordination-gait-3":
      return (
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 shadow-2xs flex flex-col items-center">
          <div className="w-full flex items-center justify-between mb-2 border-b border-slate-200 pb-2">
            <span className="text-xs font-bold text-teal-800 font-mono">NHẬN DIỆN CÁC DẠNG DÁNG ĐI THẦN KINH KINH ĐIỂN</span>
            <span className="text-[10px] text-amber-700 font-bold">Chẩn đoán trong 30 giây quan sát</span>
          </div>
          <div className="w-full grid grid-cols-3 gap-2 text-xs">
            <div className="bg-white border border-slate-200 p-2.5 rounded-lg shadow-2xs">
              <span className="text-teal-800 font-bold block mb-1">1. Phạt cỏ (Hemiparetic)</span>
              <p className="text-[10.5px] text-slate-600">Tay co gập sát ngực, chân liệt vung vòng cung sang bên (Đột quỵ bán cầu).</p>
            </div>
            <div className="bg-white border border-slate-200 p-2.5 rounded-lg shadow-2xs">
              <span className="text-amber-800 font-bold block mb-1">2. Parkinson (Festinating)</span>
              <p className="text-[10.5px] text-slate-600">Người gập tới trước, bước ngắn lê chân, mất vung tay, khó bắt đầu bước.</p>
            </div>
            <div className="bg-white border border-slate-200 p-2.5 rounded-lg shadow-2xs">
              <span className="text-rose-800 font-bold block mb-1">3. Chân rũ (Steppage)</span>
              <p className="text-[10.5px] text-slate-600">Nhấc đầu gối thật cao để tránh quẹt mũi chân xuống đất (Liệt dây thần kinh Mác / L5).</p>
            </div>
          </div>
        </div>
      );

    // 7.1-7.3 HINTS Protocol INFARCT
    case "hints-protocol-1":
    case "hints-protocol-2":
    case "hints-protocol-3":
      return (
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 shadow-2xs flex flex-col items-center">
          <div className="w-full flex items-center justify-between mb-2 border-b border-slate-200 pb-2">
            <span className="text-xs font-bold text-rose-800 font-mono">BỘ BA HINTS: INFARCT = ĐỘT QUỴ THÂN NÃO / TIỂU NÃO</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200 font-bold">
              Độ nhạy 100% (hơn cả MRI 24h)
            </span>
          </div>

          <svg viewBox="0 0 480 155" className="w-full max-h-52">
            <g transform="translate(15, 10)">
              <rect width="140" height="135" rx="8" fill="#ffffff" stroke="#0284c7" strokeWidth="1.5" />
              <text x="70" y="20" textAnchor="middle" fill="#0369a1" fontSize="10.5" fontWeight="bold">1. HEAD IMPULSE</text>
              <circle cx="70" cy="55" r="22" fill="#f8fafc" stroke="#0284c7" strokeWidth="1.5" />
              <circle cx="70" cy="55" r="7" fill="#0284c7" />
              <text x="70" y="90" textAnchor="middle" fill="#dc2626" fontSize="9.5" fontWeight="bold">BÌNH THƯỜNG (!)</text>
              <text x="70" y="105" textAnchor="middle" fill="#64748b" fontSize="8.5">Mắt bám dính mục tiêu</text>
              <text x="70" y="118" textAnchor="middle" fill="#dc2626" fontSize="8.5">Không có saccade bù trừ</text>
            </g>

            <g transform="translate(170, 10)">
              <rect width="140" height="135" rx="8" fill="#ffffff" stroke="#d97706" strokeWidth="1.5" />
              <text x="70" y="20" textAnchor="middle" fill="#b45309" fontSize="10.5" fontWeight="bold">2. NYSTAGMUS</text>
              <ellipse cx="70" cy="55" rx="30" ry="18" fill="#f8fafc" stroke="#d97706" strokeWidth="1.5" />
              <circle cx="60" cy="55" r="6" fill="#d97706" />
              <line x1="50" y1="55" x2="35" y2="55" stroke="#d97706" strokeWidth="2" />
              <circle cx="80" cy="55" r="6" fill="#d97706" />
              <line x1="90" y1="55" x2="105" y2="55" stroke="#d97706" strokeWidth="2" />
              <text x="70" y="90" textAnchor="middle" fill="#dc2626" fontSize="9.5" fontWeight="bold">ĐỔI HƯỚNG NHÌN</text>
              <text x="70" y="105" textAnchor="middle" fill="#64748b" fontSize="8.5">Liếc đâu giật đó</text>
              <text x="70" y="118" textAnchor="middle" fill="#dc2626" fontSize="8.5">Dấu ấn đột quỵ TW</text>
            </g>

            <g transform="translate(325, 10)">
              <rect width="140" height="135" rx="8" fill="#ffffff" stroke="#e11d48" strokeWidth="1.5" />
              <text x="70" y="20" textAnchor="middle" fill="#be123c" fontSize="10.5" fontWeight="bold">3. TEST OF SKEW</text>
              <circle cx="48" cy="48" r="10" fill="#e11d48" />
              <circle cx="92" cy="62" r="10" fill="#e11d48" />
              <line x1="48" y1="48" x2="48" y2="58" stroke="#0284c7" strokeWidth="2" />
              <line x1="92" y1="62" x2="92" y2="52" stroke="#0284c7" strokeWidth="2" />
              <text x="70" y="90" textAnchor="middle" fill="#dc2626" fontSize="9.5" fontWeight="bold">SKEW DEVIATION (+)</text>
              <text x="70" y="105" textAnchor="middle" fill="#64748b" fontSize="8.5">Lệch trục đứng</text>
              <text x="70" y="118" textAnchor="middle" fill="#dc2626" fontSize="8.5">Chỉnh dọc khi mở che</text>
            </g>
          </svg>
        </div>
      );

    default:
      return (
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 shadow-2xs flex items-center justify-center min-h-[120px]">
          <div className="text-center space-y-1">
            <span className="text-xs font-bold text-teal-800 font-mono block">SƠ ĐỒ LÂM SÀNG: {stepName}</span>
            <p className="text-[11px] text-slate-600">Thao tác thăm khám chuẩn tại giường theo y văn chuyên khoa.</p>
          </div>
        </div>
      );
  }
};
