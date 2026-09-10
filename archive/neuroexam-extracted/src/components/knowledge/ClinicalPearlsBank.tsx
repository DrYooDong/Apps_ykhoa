import React, { useState, useEffect } from "react";
import { ClinicalPearl } from "../../types";
import { Sparkles, Plus, Search, Tag, Bookmark, Check, ShieldCheck, Filter, BookOpen } from "lucide-react";

const DEFAULT_PEARLS: ClinicalPearl[] = [
  {
    id: "pearl-1",
    category: "Đột quỵ & TIA",
    title: "Cửa sổ tiêu sợi huyết (tPA) & Lấy huyết khối cơ học (EVT)",
    author: "BS. Chuyên khoa Thần kinh",
    date: "2026-08-15",
    content: "Thời gian là não (1.9 triệu tế bào/phút). Cửa sổ tiêm alteplase IV là 4.5h từ thời điểm bình thường cuối cùng (LKN). Lấy huyết khối cơ học (EVT) áp dụng cho tắc mạch lớn tuần hoàn trước trong vòng 6h (ASPECTS ≥ 6) và mở rộng đến 24h theo tiêu chuẩn DAWN/DEFUSE 3 (sử dụng CTP hoặc MRI khuếch tán để đánh giá mismatch lõi - vùng tranh tối tranh sáng).",
    evidenceLevel: "Class I, Level A",
    tags: ["AIS", "tPA", "EVT", "ASPECTS", "DAWN"]
  },
  {
    id: "pearl-2",
    category: "Chóng mặt & Thần kinh cấp",
    title: "Bộ khám HINTS đánh giá Hội chứng tiền đình cấp (AVS)",
    author: "BS. Cấp cứu Thần kinh",
    date: "2026-08-20",
    content: "Trong hội chứng tiền đình cấp tính (AVS, chóng mặt liên tục kèm rung giật nhãn cầu): HINTS (Head Impulse, Nystagmus, Test of Skew) nhạy hơn cả MRI não trong 24h đầu (MRI có thể âm tính giả tới 19% ở nhồi máu tuần hoàn sau!). Dấu hiệu cảnh báo đột quỵ: Head Impulse bình thường (không có giật điều chỉnh), Nystagmus đổi hướng khi nhìn sang 2 bên, hoặc Skew deviation (lệch trục nhãn cầu đứng).",
    evidenceLevel: "Độ nhạy 100%, Đặc hiệu 96%",
    tags: ["HINTS", "AVS", "PICA", "Wallenberg", "Chóng mặt"]
  },
  {
    id: "pearl-3",
    category: "Xuất huyết dưới nhện (SAH)",
    title: "Đau đầu sét đánh (Thunderclap) & Quy tắc CT < 6 giờ",
    author: "BS. Phẫu thuật Thần kinh",
    date: "2026-08-25",
    content: "Đau đầu dữ dội đột ngột đạt đỉnh trong <1 phút là dấu hiệu cảnh báo số 1 của vỡ phình mạch não (SAH). CT sọ não không cản quang thực hiện trong vòng 6h đầu từ khởi phát có độ nhạy xấp xỉ 99-100%. Nếu sau 6h CT âm tính nhưng lâm sàng nghi ngờ cao, bắt buộc chọc dò tủy sống (LP) tìm hồng cầu không giảm giữa các ống và chất xanthochromia (dịch não tủy vàng sau ly tâm).",
    evidenceLevel: "Chuẩn Ottawa SAH",
    tags: ["SAH", "Thunderclap", "Aneurysm", "LP", "Xanthochromia"]
  },
  {
    id: "pearl-4",
    category: "Tăng áp lực nội sọ & Thoát vị",
    title: "Phản xạ Cushing và Liệu pháp thẩm thấu (Mannitol vs Saline ưu trương)",
    author: "BS. Hồi sức Thần kinh (Neuro-ICU)",
    date: "2026-09-01",
    content: "Tam chứng Cushing (Tăng huyết áp kèm áp lực mạch rộng, nhịp tim chậm, rối loạn nhịp thở) báo hiệu thoát vị não sắp xảy ra. Nâng đầu 30 độ, tránh nẹp cổ quá chặt chèn ép tĩnh mạch cảnh. Dùng Saline ưu trương 3% ưu thế hơn Mannitol khi bệnh nhân có hạ huyết áp hoặc giảm thể tích tuần hoàn (Mannitol gây lợi niệu thẩm thấu và có nguy cơ phù dội ngược do hệ số phản xạ 0.9 so với 1.0 của muối ưu trương).",
    evidenceLevel: "Khuyến cáo Neurocritical Care Society",
    tags: ["ICP", "Herniation", "Mannitol", "Hypertonic Saline", "Cushing"]
  },
  {
    id: "pearl-5",
    category: "Thần kinh cơ & Yếu liệt",
    title: "Phân biệt Cơn nhược cơ (Myasthenic Crisis) vs Cơn Cholinergic & Lưu ý thở máy",
    author: "BS. Chuyên khoa Thần kinh",
    date: "2026-09-03",
    content: "Bệnh nhân nhược cơ suy hô hấp do yếu cơ hoành và cơ liên sườn; PaCO2 giai đoạn đầu có thể vẫn bình thường do tăng thông khí bù trừ! Cần kiểm tra FVC (<15-20 mL/kg) hoặc NIF (<-20 to -30 cmH2O) hoặc đếm một hơi không quá 20. Nếu cần đặt nội khí quản, TUYỆT ĐỐI TRÁNH Succinylcholine (thuốc giãn cơ khử cực dễ gây kéo dài liệt và rối loạn kali), ưu tiên Rocuronium giảm 50% liều.",
    evidenceLevel: "Cấp cứu Thần kinh Cơ",
    tags: ["Myasthenia Gravis", "Crisis", "NIF", "FVC", "Rocuronium"]
  }
];

export const ClinicalPearlsBank: React.FC = () => {
  const [pearls, setPearls] = useState<ClinicalPearl[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  // New Pearl Form State
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState<string>("Dây Thần Kinh Sọ (CN I-XII)");
  const [newContent, setNewContent] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newTags, setNewTags] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Fetch pearls from backend or fallback to static pearls + localStorage
  const fetchPearls = async () => {
    try {
      const res = await fetch("/api/knowledge/pearls");
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setPearls(data.data);
          setLoading(false);
          return;
        }
      }
    } catch {
      // offline/static mode
    }

    try {
      const local = localStorage.getItem("neuro_clinical_pearls");
      if (local) {
        const parsed = JSON.parse(local);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setPearls(parsed);
          setLoading(false);
          return;
        }
      }
    } catch {}

    setPearls(DEFAULT_PEARLS);
    setLoading(false);
  };

  useEffect(() => {
    fetchPearls();
  }, []);

  const handleAddPearl = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    setSubmitting(true);
    const tagsArray = newTags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const newPearlItem: ClinicalPearl = {
      id: `pearl-${Date.now()}`,
      category: newCategory,
      title: newTitle.trim(),
      content: newContent.trim(),
      author: newAuthor.trim() || "Bác sĩ Chuyên khoa Thần kinh",
      date: new Date().toISOString().split("T")[0],
      evidenceLevel: "Kinh nghiệm chuyên khoa",
      tags: tagsArray.length > 0 ? tagsArray : ["Lâm sàng", "Kinh nghiệm"]
    };

    try {
      await fetch("/api/knowledge/pearls", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPearlItem)
      });
    } catch {}

    setPearls((prev) => {
      const updated = [newPearlItem, ...prev];
      try {
        localStorage.setItem("neuro_clinical_pearls", JSON.stringify(updated));
      } catch {}
      return updated;
    });

    setShowAddModal(false);
    setNewTitle("");
    setNewContent("");
    setNewAuthor("");
    setNewTags("");
    setSubmitting(false);
  };

  // Categories list
  const categories = [
    { id: "all", label: "Tất cả lĩnh vực" },
    { id: "Dây Thần Kinh Sọ", label: "Dây Thần Kinh Sọ (CN I-XII)" },
    { id: "Đột Quỵ & Mạch Máu Não", label: "Đột Quỵ & Mạch Máu Não" },
    { id: "Tủy Sống", label: "Tủy Sống & Bệnh Lý Rễ" },
    { id: "Hôn Mê & Tăng ALNS", label: "Hôn Mê & Tăng ALNS" },
    { id: "Thần kinh cơ", label: "Thần kinh cơ & Yếu liệt" },
    { id: "Nhiễm trùng", label: "Nhiễm trùng & Viêm màng não" },
    { id: "Chóng mặt & HINTS", label: "Chóng mặt & HINTS" }
  ];

  const filteredPearls = pearls.filter((p) => {
    if (selectedCategory !== "all" && !p.category.toLowerCase().includes(selectedCategory.toLowerCase())) {
      return false;
    }
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.content.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      (p.tags && p.tags.some((t) => t.toLowerCase().includes(q)))
    );
  });

  return (
    <div className="space-y-6">
      {/* Top Banner & Action */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 md:p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-teal-50 text-teal-700 border border-teal-200">
                <Sparkles className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                Kho Tàng Kinh Nghiệm Y Khoa & Viên Ngọc Lâm Sàng (Clinical Pearls)
              </h2>
            </div>
            <p className="text-xs md:text-sm text-slate-600 mt-1">
              Nơi lưu trữ, nạp mới và tra cứu những kinh nghiệm thăm khám tinh tế, bẫy lâm sàng thường gặp và nguyên lý chuẩn chỉnh của các bác sĩ chuyên khoa Thần kinh.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 rounded-xl font-bold text-xs md:text-sm bg-teal-700 hover:bg-teal-800 text-white flex items-center justify-center gap-2 shadow-xs transition-all shrink-0"
          >
            <Plus className="w-4 h-4 text-white stroke-[3]" />
            Nạp Kinh Nghiệm Mới
          </button>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm kiếm kinh nghiệm, bẫy chẩn đoán, thuốc, tag (vd: Đồng tử, HINTS, Cổ cứng, Cushing, Mannitol)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs md:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-teal-600 transition-colors"
            />
          </div>

          <div className="flex overflow-x-auto pb-1 sm:pb-0 gap-1.5 text-xs">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-3 py-2 rounded-xl whitespace-nowrap transition-all ${
                  selectedCategory === c.id
                    ? "bg-teal-700 text-white font-bold shadow-2xs"
                    : "bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {c.label.split(" (")[0]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Pearls List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {loading ? (
          <div className="col-span-2 py-12 text-center text-slate-500 text-sm">
            Đang tải dữ liệu kinh nghiệm y khoa...
          </div>
        ) : filteredPearls.length === 0 ? (
          <div className="col-span-2 py-12 text-center text-slate-500 text-sm bg-white rounded-2xl border border-slate-200">
            Không tìm thấy kinh nghiệm y khoa nào phù hợp với từ khóa "{searchQuery}".
          </div>
        ) : (
          filteredPearls.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-slate-200 hover:border-teal-300 rounded-2xl p-5 shadow-xs space-y-3.5 transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[10px] font-mono font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200">
                    {item.category}
                  </span>
                  <span className="text-[11px] text-slate-500 font-mono">
                    {item.evidenceLevel || "Kinh nghiệm chuyên khoa"}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 leading-snug">{item.title}</h3>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs md:text-sm text-slate-800 leading-relaxed">
                  <p className="text-teal-800 font-semibold mb-1 flex items-center gap-1">
                    <span>💡 Viên ngọc lâm sàng:</span>
                  </p>
                  <p className="leading-relaxed">{item.content}</p>
                </div>
              </div>

              {/* Footer metadata */}
              <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex flex-wrap gap-1">
                  {item.tags?.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] border border-slate-200"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
                <div className="text-[11px] text-slate-500 font-mono flex items-center gap-2">
                  <span>{item.author || "Bác sĩ Chuyên khoa"}</span>
                  {item.date && <span>• {item.date}</span>}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal: Nạp Kinh Nghiệm Y Khoa Mới */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-teal-700" />
                <h3 className="text-lg font-bold text-slate-900">Nạp Thêm Kinh Nghiệm Lâm Sàng Mới</h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-700 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddPearl} className="space-y-3.5 text-xs">
              <div>
                <label className="text-slate-700 font-semibold block mb-1">Lĩnh vực chuyên khoa:</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-slate-800 focus:outline-teal-600"
                >
                  <option value="Dây Thần Kinh Sọ (CN I-XII)">Dây Thần Kinh Sọ (CN I-XII)</option>
                  <option value="Đột Quỵ & Mạch Máu Não">Đột Quỵ & Mạch Máu Não</option>
                  <option value="Tủy Sống & Bệnh Lý Rễ">Tủy Sống & Bệnh Lý Rễ</option>
                  <option value="Rối Loạn Vận Động (Parkinson)">Rối Loạn Vận Động (Parkinson)</option>
                  <option value="Hôn Mê & Tăng ALNS">Hôn Mê & Tăng ALNS</option>
                  <option value="Thần kinh cơ & Yếu liệt">Thần kinh cơ & Yếu liệt</option>
                  <option value="Nhiễm trùng & Viêm màng não">Nhiễm trùng & Viêm màng não</option>
                  <option value="Chóng mặt & HINTS">Chóng mặt & HINTS</option>
                </select>
              </div>

              <div>
                <label className="text-slate-700 font-semibold block mb-1">Tiêu đề kinh nghiệm (Ngắn gọn, trọng tâm):</label>
                <input
                  type="text"
                  required
                  placeholder="vd: Dấu hiệu 'Giãn đồng tử đơn độc' trong phình động mạch thông sau"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-slate-800 focus:outline-teal-600"
                />
              </div>

              <div>
                <label className="text-slate-700 font-semibold block mb-1">Nội dung cốt lõi của Kinh Nghiệm (The Clinical Pearl):</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Chi tiết kinh nghiệm thăm khám, dấu hiệu định vị, bẫy chẩn đoán cần tránh hoặc lưu ý dùng thuốc tại giường..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-slate-800 leading-relaxed focus:outline-teal-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Bác sĩ / Nguồn kinh nghiệm:</label>
                  <input
                    type="text"
                    placeholder="vd: BS. CKII Thần kinh Cấp cứu"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-slate-800 focus:outline-teal-600"
                  />
                </div>

                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Từ khóa / Tags (cách nhau dấu phẩy):</label>
                  <input
                    type="text"
                    placeholder="vd: Dây III, PCom, Khẩn cấp"
                    value={newTags}
                    onChange={(e) => setNewTags(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-slate-800 focus:outline-teal-600"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 font-medium"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold flex items-center gap-1.5 shadow-xs"
                >
                  {submitting ? "Đang lưu..." : "Lưu Vào Kho Kinh Nghiệm"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
