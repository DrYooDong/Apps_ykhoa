import React, { useState } from 'react';
import { Lock, Mail, ShieldCheck, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext.tsx';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { loginWithPassword, registerDoctor, loginWithGoogle, isLoading, user, logout } =
    useAuth();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('dr.minh@medlens.vn');
  const [password, setPassword] = useState('Doctor@123');
  const [name, setName] = useState('BS.CKI Nguyễn Văn Minh');
  const [specialty, setSpecialty] = useState('Nội khoa / Cấp cứu');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      if (mode === 'login') {
        await loginWithPassword(email, password);
      } else {
        await registerDoctor(email, password, name, specialty);
      }
      onClose();
    } catch (err: any) {
      setError(err.message || 'Xác thực không thành công');
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    try {
      await loginWithGoogle();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Lỗi đăng nhập với Google');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-fadeIn">
      <div className="bg-white rounded-lg max-w-md w-full shadow-xl overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="bg-white border-b border-slate-200 p-5 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-700 rounded transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="w-8 h-8 rounded-md bg-blue-600 flex items-center justify-center text-white mb-2.5 shadow-xs">
            <ShieldCheck className="w-4.5 h-4.5" />
          </div>

          <h2 className="font-display font-bold text-base text-slate-800">
            {user
              ? 'Thông tin phiên làm việc Bác sĩ'
              : mode === 'login'
              ? 'Xác thực Bác sĩ (JWT)'
              : 'Đăng ký tài khoản Bác sĩ'}
          </h2>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Bảo mật phiên làm việc với JSON Web Token lưu trữ trong cookie an toàn
          </p>
        </div>

        {/* Body */}
        <div className="p-5 flex flex-col gap-3.5">
          {user ? (
            <div className="flex flex-col gap-3.5 text-xs">
              <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-lg text-blue-900">
                <div className="font-bold text-sm text-slate-800 mb-0.5">{user.name}</div>
                <div className="text-slate-600">Email: {user.email}</div>
                <div className="text-slate-600">Chuyên khoa: {user.specialty || 'Nội tổng quát'}</div>
                <div className="mt-1.5 font-mono-custom text-[11px] text-blue-700 font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                  Phiên đăng nhập JWT đang hoạt động an toàn
                </div>
              </div>

              <button
                onClick={() => {
                  logout();
                  onClose();
                }}
                className="w-full py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md transition-colors cursor-pointer shadow-xs text-xs"
              >
                Đăng xuất khỏi hệ thống
              </button>
            </div>
          ) : (
            <>
              {error && (
                <div className="p-2.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-md">
                  {error}
                </div>
              )}

              {/* Mode Toggle */}
              <div className="flex border border-slate-200 rounded-md p-0.5 bg-slate-100">
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className={`flex-1 py-1 text-xs font-semibold rounded transition-all cursor-pointer ${
                    mode === 'login' ? 'bg-white text-slate-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Đăng nhập
                </button>
                <button
                  type="button"
                  onClick={() => setMode('register')}
                  className={`flex-1 py-1 text-xs font-semibold rounded transition-all cursor-pointer ${
                    mode === 'register' ? 'bg-white text-slate-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Đăng ký mới
                </button>
              </div>

              {/* Quick sample credentials note */}
              {mode === 'login' && (
                <div className="p-2 bg-blue-50 border border-blue-200 rounded text-[11px] text-blue-800 font-mono-custom">
                  <b>Tài khoản mẫu:</b> dr.minh@medlens.vn / Doctor@123
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-2.5 text-xs">
                {mode === 'register' && (
                  <>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Họ và tên Bác sĩ
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="BS. Trần Minh"
                        className="w-full border border-slate-200 rounded-md p-2 bg-slate-50 focus:outline-none focus:border-blue-500 text-slate-800"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Chuyên khoa</label>
                      <input
                        type="text"
                        value={specialty}
                        onChange={(e) => setSpecialty(e.target.value)}
                        placeholder="Nội khoa, Cấp cứu..."
                        className="w-full border border-slate-200 rounded-md p-2 bg-slate-50 focus:outline-none focus:border-blue-500 text-slate-800"
                      />
                    </div>
                  </>
                )}

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Email bệnh viện</label>
                  <div className="relative">
                    <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="doctor@hospital.vn"
                      className="w-full pl-8 border border-slate-200 rounded-md p-2 bg-slate-50 focus:outline-none focus:border-blue-500 text-slate-800 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Mật khẩu</label>
                  <div className="relative">
                    <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-8 border border-slate-200 rounded-md p-2 bg-slate-50 focus:outline-none focus:border-blue-500 text-slate-800 text-xs"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-colors cursor-pointer mt-1 shadow-xs text-xs"
                >
                  {isLoading ? 'Đang xác thực...' : mode === 'login' ? 'Đăng nhập JWT' : 'Đăng ký Bác sĩ'}
                </button>
              </form>

              <div className="flex items-center gap-2 my-0.5">
                <div className="flex-1 h-px bg-slate-200" />
                <span className="text-[10.5px] text-slate-400">hoặc</span>
                <div className="flex-1 h-px bg-slate-200" />
              </div>

              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="w-full py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-xs font-semibold rounded-md flex items-center justify-center gap-2 cursor-pointer transition-colors text-slate-700 shadow-xs"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Đăng nhập với Google</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
