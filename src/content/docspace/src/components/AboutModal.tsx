import React from 'react';
import { Stethoscope, X } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-fadeIn">
      <div className="bg-white rounded-lg max-w-2xl w-full shadow-xl overflow-hidden border border-slate-200 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-slate-200 p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-md bg-blue-600 flex items-center justify-center text-white shadow-xs">
              <Stethoscope className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-display font-bold text-base text-slate-800">
                Về công cụ MedLens Pro
              </h2>
              <p className="text-[11px] text-slate-500">
                Hệ thống phân tích bệnh án & đối chiếu kho tri thức lâm sàng
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 rounded transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto flex flex-col gap-3.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <div>
            <h3 className="font-display font-bold text-sm text-slate-800 mb-1">
              Nguyên lý hoạt động
            </h3>
            <p>
              MedLens là công cụ hỗ trợ ra quyết định lâm sàng (CDSS) minh bạch, hoạt động theo mô
              hình suy luận diễn dịch dựa trên bằng chứng (evidence-based graph matching) kết hợp
              cơ sở dữ liệu quan hệ PostgreSQL và chuẩn bảo mật xác thực JWT.
            </p>
          </div>

          <div className="bg-blue-50/70 border border-blue-200 p-3.5 rounded-lg text-xs text-blue-950 space-y-1.5">
            <div className="font-bold text-slate-800">Quy trình phân tích 4 bước:</div>
            <div>
              <b>1. Nạp dữ kiện:</b> Bóc tách thông minh từ văn bản, nhận dạng giọng nói, tự động
              suy luận dữ kiện từ sinh hiệu và xét nghiệm vượt ngưỡng.
            </div>
            <div>
              <b>2. Phân tích đối chiếu:</b> Tính toán độ phù hợp theo trọng số và phân loại vai trò
              triệu chứng (đặc trưng, gợi ý, hỗ trợ), có điều chỉnh theo dịch tễ và trừ điểm nếu có
              dữ kiện phủ định.
            </div>
            <div>
              <b>3. Phác đồ điều trị:</b> Gợi ý xử trí cấp cứu ban đầu, xét nghiệm xác chẩn, phác đồ
              đặc hiệu và toa thuốc theo hướng dẫn Bộ Y tế.
            </div>
            <div>
              <b>4. Kho tri thức mở:</b> Dễ dàng tra cứu, xuất/nhập tệp JSON và cập nhật quy luật suy
              luận y khoa.
            </div>
          </div>

          <div>
            <h3 className="font-display font-bold text-sm text-slate-800 mb-1">
              Bảo mật & Lưu trữ
            </h3>
            <p>
              Hệ thống được phát triển với ngăn xếp công nghệ:
              <br />• <b>Frontend:</b> React 18, TypeScript, Tailwind CSS
              <br />• <b>Backend:</b> Node.js & Express API
              <br />• <b>Cơ sở dữ liệu:</b> Google Cloud SQL (PostgreSQL) với Drizzle ORM
              <br />• <b>Bảo mật xác thực:</b> JSON Web Token (JWT) & Google OAuth
            </p>
          </div>

          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900">
            <b>Tuyên bố trách nhiệm y khoa:</b> Công cụ MedLens được thiết kế nhằm mục đích hỗ trợ
            học tập, đào tạo và tham vấn lâm sàng cho nhân viên y tế. Quyết định chẩn đoán và điều trị
            cuối cùng luôn thuộc về Bác sĩ chịu trách nhiệm chuyên môn.
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-5 py-2.5 border-t border-slate-200 text-right">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-md cursor-pointer transition-colors shadow-xs"
          >
            Đã hiểu
          </button>
        </div>
      </div>
    </div>
  );
};
