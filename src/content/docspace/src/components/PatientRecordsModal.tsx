import React, { useEffect, useState } from 'react';
import {
  Check,
  Database,
  Eye,
  FilePlus,
  Loader2,
  RefreshCw,
  Search,
  Stethoscope,
  Trash2,
  X,
} from 'lucide-react';
import {
  apiCreatePatient,
  apiDeleteMedicalRecord,
  apiGetMedicalRecords,
  apiSaveMedicalRecord,
} from '../lib/api.ts';
import { MedicalRecord } from '../types.ts';

interface PatientRecordsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoadRecordToState: (record: MedicalRecord) => void;
  currentAnalysisData?: any;
}

export const PatientRecordsModal: React.FC<PatientRecordsModalProps> = ({
  isOpen,
  onClose,
  onLoadRecordToState,
  currentAnalysisData,
}) => {
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notification, setNotification] = useState<string | null>(null);

  // New Record Dialog state
  const [isCreating, setIsCreating] = useState(false);
  const [patientName, setPatientName] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [patientGender, setPatientGender] = useState<'nam' | 'nu' | 'khac'>('nam');
  const [patientPhone, setPatientPhone] = useState('');
  const [doctorNotes, setDoctorNotes] = useState('');
  const [isSavingNew, setIsSavingNew] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadRecords();
      if (currentAnalysisData) {
        setPatientAge(currentAnalysisData.form?.tuoi || '');
        setPatientGender(currentAnalysisData.form?.gioiTinh || 'nam');
      }
    }
  }, [isOpen]);

  const loadRecords = async () => {
    setLoading(true);
    try {
      const data = await apiGetMedicalRecords(searchQuery);
      setRecords(data);
    } catch (err: any) {
      console.error('Failed to load records:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    loadRecords();
  };

  const handleDelete = async (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('Bạn có chắc chắn muốn xóa hồ sơ bệnh án này?')) return;
    try {
      await apiDeleteMedicalRecord(id);
      setRecords((prev) => prev.filter((r) => r.id !== id));
      showNotify('Đã xóa hồ sơ bệnh án thành công.');
    } catch (err: any) {
      alert('Không thể xóa: ' + err.message);
    }
  };

  const handleSaveCurrentAsNew = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim()) {
      alert('Vui lòng nhập họ và tên bệnh nhân.');
      return;
    }
    setIsSavingNew(true);
    try {
      // 1. Create patient record
      const patient = await apiCreatePatient({
        fullName: patientName.trim(),
        age: patientAge ? parseInt(patientAge, 10) : undefined,
        gender: patientGender,
        phoneNumber: patientPhone.trim() || undefined,
      });

      // 2. Format medical record data matching MedicalRecord schema
      const lead = currentAnalysisData?.results?.[0];
      const diffs = currentAnalysisData?.results?.slice(1, 4) || [];

      await apiSaveMedicalRecord({
        patientId: patient.id,
        patientName: patient.fullName,
        age: patient.age,
        gender: patient.gender,
        admissionReason: currentAnalysisData?.form?.lyDoVaoVien || 'Khám lâm sàng tổng quát',
        history: currentAnalysisData?.form?.text?.cn || '',
        clinicalNotes: doctorNotes.trim() || currentAnalysisData?.summaryText || '',
        vitalSigns: currentAnalysisData?.vitals || undefined,
        labResults: currentAnalysisData?.labs || undefined,
        symptoms: currentAnalysisData?.selected ? Array.from(currentAnalysisData.selected) : [],
        negativeSymptoms: currentAnalysisData?.negated ? Array.from(currentAnalysisData.negated) : [],
        primaryDiagnosis: lead
          ? {
              id: lead.b.id,
              name: lead.b.ten,
              icd: lead.b.icd,
              percentage: lead.pct,
              score: lead.score,
              max: lead.max,
              alert: lead.b.baoDong,
            }
          : undefined,
        differentialDiagnoses: diffs.map((d: any) => ({
          id: d.b.id,
          name: d.b.ten,
          icd: d.b.icd,
          percentage: d.pct,
        })),
        treatmentProtocol: lead?.b?.phacDo || undefined,
        status: 'draft',
      });

      showNotify(`Đã lưu bệnh án cho bệnh nhân ${patient.fullName} vào PostgreSQL.`);
      setIsCreating(false);
      setPatientName('');
      loadRecords();
    } catch (err: any) {
      alert('Lỗi khi lưu bệnh án: ' + err.message);
    } finally {
      setIsSavingNew(false);
    }
  };

  const showNotify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-fadeIn">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] shadow-xl flex flex-col overflow-hidden border border-slate-200">
        {/* Modal Header */}
        <div className="bg-white border-b border-slate-200 px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-blue-600 flex items-center justify-center text-white shadow-xs">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-display font-bold text-base text-slate-800">
                Hồ sơ bệnh án điện tử (Supabase / EMR)
              </h2>
              <p className="text-[11px] text-slate-500">
                Quản lý hồ sơ bệnh nhân, kết quả suy luận & y lệnh điều trị chuẩn hóa
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCreating(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-md transition-colors cursor-pointer shadow-xs"
            >
              <FilePlus className="w-3.5 h-3.5" />
              <span>Lưu ca hiện tại vào DB</span>
            </button>

            <button
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-slate-700 rounded transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Notification Toast */}
        {notification && (
          <div className="bg-emerald-50 border-b border-emerald-200 text-emerald-800 px-5 py-2 text-xs font-medium flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            <span>{notification}</span>
          </div>
        )}

        {/* Main Body */}
        <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
          {/* Create New Record Form Drawer */}
          {isCreating ? (
            <form
              onSubmit={handleSaveCurrentAsNew}
              className="bg-slate-50 border border-slate-200 rounded-lg p-4 flex flex-col gap-3.5 animate-fadeIn"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-sm text-slate-800 flex items-center gap-2">
                  <Stethoscope className="w-4 h-4 text-blue-600" />
                  <span>Lưu bệnh án hiện tại vào cơ sở dữ liệu PostgreSQL</span>
                </h3>
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="text-xs text-slate-400 hover:text-slate-700"
                >
                  ✕ Hủy
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Họ và tên bệnh nhân <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="VD: Trần Văn Bình"
                    className="w-full border border-slate-200 rounded-md p-1.5 bg-white text-xs focus:outline-none focus:border-blue-500 text-slate-800"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Tuổi</label>
                  <input
                    type="number"
                    value={patientAge}
                    onChange={(e) => setPatientAge(e.target.value)}
                    placeholder="VD: 58"
                    className="w-full border border-slate-200 rounded-md p-1.5 bg-white text-xs focus:outline-none focus:border-blue-500 text-slate-800"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Giới tính</label>
                  <select
                    value={patientGender}
                    onChange={(e) => setPatientGender(e.target.value as any)}
                    className="w-full border border-slate-200 rounded-md p-1.5 bg-white text-xs focus:outline-none focus:border-blue-500 text-slate-800"
                  >
                    <option value="nam">Nam</option>
                    <option value="nu">Nữ</option>
                    <option value="khac">Khác</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Số điện thoại</label>
                  <input
                    type="tel"
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    placeholder="0912..."
                    className="w-full border border-slate-200 rounded-md p-1.5 bg-white text-xs focus:outline-none focus:border-blue-500 text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1 text-xs">
                  Ghi chú điều trị / Y lệnh bổ sung của Bác sĩ
                </label>
                <textarea
                  rows={2}
                  value={doctorNotes}
                  onChange={(e) => setDoctorNotes(e.target.value)}
                  placeholder="Ghi chú lâm sàng, dặn dò hoặc chỉ định chuyên khoa bổ sung..."
                  className="w-full border border-slate-200 rounded-md p-2 text-xs bg-white focus:outline-none focus:border-blue-500 text-slate-800"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  disabled={isSavingNew}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-md cursor-pointer transition-colors shadow-xs"
                >
                  {isSavingNew && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>Xác nhận lưu vào PostgreSQL</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="px-3 py-1.5 bg-white border border-slate-200 text-xs font-medium rounded-md text-slate-600 hover:bg-slate-50"
                >
                  Hủy bỏ
                </button>
              </div>
            </form>
          ) : null}

          {/* Search bar & Refresh */}
          <div className="flex items-center justify-between gap-3">
            <form onSubmit={handleSearch} className="flex-1 relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm theo tên bệnh nhân, chẩn đoán, mã ICD..."
                className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-200 rounded-md bg-slate-50 focus:outline-none focus:border-blue-500 text-slate-800"
              />
            </form>

            <button
              onClick={loadRecords}
              className="p-1.5 border border-slate-200 rounded-md hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer"
              title="Tải lại danh sách"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>

          {/* Records Table / List */}
          {loading ? (
            <div className="py-10 flex flex-col items-center justify-center gap-2 text-slate-500">
              <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
              <span className="text-xs">Đang tải hồ sơ từ PostgreSQL...</span>
            </div>
          ) : records.length === 0 ? (
            <div className="py-10 text-center text-slate-500 bg-slate-50 rounded-lg border border-dashed border-slate-300">
              <Stethoscope className="w-7 h-7 mx-auto mb-1.5 text-slate-400" />
              <p className="text-xs font-semibold text-slate-700">Chưa có hồ sơ bệnh án nào</p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Bấm "Lưu ca hiện tại vào DB" ở góc trên để lưu kết quả phân tích bệnh án vào Cloud SQL.
              </p>
            </div>
          ) : (
            <div className="border border-slate-200 rounded-lg overflow-hidden shadow-xs">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-600 border-b border-slate-200 font-semibold">
                    <th className="p-2.5">Mã hồ sơ</th>
                    <th className="p-2.5">Bệnh nhân</th>
                    <th className="p-2.5">Chẩn đoán sơ bộ</th>
                    <th className="p-2.5">Độ phù hợp</th>
                    <th className="p-2.5">Ngày khám</th>
                    <th className="p-2.5 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {records.map((rec) => (
                    <tr
                      key={rec.id}
                      onClick={() => onLoadRecordToState(rec)}
                      className="hover:bg-slate-50/80 cursor-pointer transition-colors"
                    >
                      <td className="p-2.5 font-mono-custom text-slate-500">
                        #{rec.recordCode || rec.id.toString().padStart(4, '0')}
                      </td>
                      <td className="p-2.5">
                        <div className="font-semibold text-slate-800">
                          {rec.patientName || 'Bệnh nhân'}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {rec.age ? `${rec.age} tuổi` : ''} ·{' '}
                          {rec.gender === 'nam'
                            ? 'Nam'
                            : rec.gender === 'nu'
                            ? 'Nữ'
                            : 'Chưa rõ'}
                        </div>
                      </td>
                      <td className="p-2.5">
                        <div className="font-medium text-slate-800">
                          {rec.primaryDiagnosis?.name || rec.admissionReason || 'Chưa có chẩn đoán'}
                        </div>
                        {rec.primaryDiagnosis?.icd && (
                          <span className="px-1.5 py-0.2 rounded text-[10px] font-mono-custom bg-slate-800 text-white">
                            {rec.primaryDiagnosis.icd}
                          </span>
                        )}
                      </td>
                      <td className="p-2.5">
                        <span className="font-mono-custom font-bold text-blue-600">
                          {rec.primaryDiagnosis?.percentage != null ? `${rec.primaryDiagnosis.percentage}%` : '—'}
                        </span>
                      </td>
                      <td className="p-2.5 text-slate-500 font-mono-custom text-[11px]">
                        {rec.createdAt ? new Date(rec.createdAt).toLocaleDateString('vi-VN') : '—'}
                      </td>
                      <td className="p-2.5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onLoadRecordToState(rec);
                              onClose();
                            }}
                            className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                            title="Nạp vào màn hình phân tích"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={(e) => handleDelete(rec.id, e)}
                            className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                            title="Xóa hồ sơ khỏi DB"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-5 py-2.5 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Kết nối PostgreSQL: Cloud SQL instance asia-southeast1</span>
          <button
            onClick={onClose}
            className="px-3.5 py-1 bg-white border border-slate-200 text-slate-700 font-semibold rounded-md hover:bg-slate-50 cursor-pointer text-xs"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
