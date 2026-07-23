# 🚀 Kế Hoạch Triển Khai Hoàn Thiện Phân Hệ Kỹ Năng Lâm Sàng (CliniPortal)

> **Mục tiêu:** Dựa trên kế hoạch tại `implementation_plan.md`, thực hiện nâng cấp toàn diện phân hệ **Kỹ Năng Lâm Sàng** (`pages/Kỹ năng/`) qua các tính năng tương tác, gamification, thính giác lâm sàng, máy tính ECG, bệnh nhân ảo, và bộ theo dõi tiến trình.

---

## 📊 Tổng Quan Hiện Trạng & Tiến Độ

| # | Ý Tưởng | Trang / Component | Trạng Thái |
|---|---------|-------------------|------------|
| 1 | **Virtual Patient Simulator** | `pages/Kỹ năng/Bệnh nhân ảo/` + `js/virtual-patient.js` | ✅ Đã hoàn thành |
| 2 | **Auscultation Trainer** | `pages/Kỹ năng/Lâm sàng/Nghe_Am_Thanh.html` + `js/auscultation-trainer.js` | ✅ Đã hoàn thành |
| 3 | **OSCE Countdown Arena** | `pages/Kỹ năng/OSCE_Randomizer.html` + `js/osce-randomizer.js` | ✅ Đã hoàn thành |
| 4 | **Skill Progress Tracker** | `js/skill-tracker.js` + dashboard `ky-nang.html` | ✅ Đã hoàn thành |
| 6 | **Clinical Reasoning Engine** | `pages/Kỹ năng/Quản lý điều trị/Clinical_Reasoning.html` | ✅ Đã hoàn thành |
| 7 | **ECG Interactive Trainer** | `pages/Kỹ năng/Cận lâm sàng/ECG_Interactive.html` + `js/ecg-trainer.js` | ✅ Đã hoàn thành |
| 8 | **Procedure Step-by-Step Animator** | `pages/Kỹ năng/Thủ thuật/` (Đặt NKQ, Chọc MP, Chọc tủy) | ✅ Đã hoàn thành |
| 9 | **Spaced Repetition Flashcards (SM-2)** | `js/skill-flashcards.js` + modal flashcards | ✅ Đã hoàn thành |
| 10 | **Cross-Module Knowledge Bridge** | `js/knowledge-bridge.js` + `js/knowledge-map-data.js` | ✅ Đã hoàn thành |

---

## 🔑 Quy Tắc Kiến Trúc & Thiết Kế Bắt Buộc

> [!IMPORTANT]
> 1. **Tuân thủ AGENTS.md**: Pure HTML + Vanilla CSS (Design Tokens) + Vanilla JS (ES6+). KHÔNG dùng framework hay thư viện ngoài (ngoại trừ FontAwesome & Google Fonts).
> 2. **Đường dẫn tương đối chính xác**: Kiểm tra số cấp thư mục trước khi chèn CSS/JS (VD: Cấp 3 → `../../../`, Cấp 4 → `../../../../`).
> 3. **Dark/Light Mode**: Sử dụng CSS Variables (`var(--color-primary)`, `var(--color-surface)`, `var(--color-text)...`).
> 4. **Trực quan & Hiện đại**: Sử dụng SVG animations, Web Audio API, hiệu ứng kính mờ (glassmorphism), và micro-interactions.

---

## 🎯 Các Bước Triển Khai Chi Tiết

---

### Phase 1: Nền Tảng Progress, Knowledge Bridge & Flashcard

#### 1.1 Skill Progress Tracker (`#4`)
- **[NEW]** `js/skill-tracker.js`
- **[NEW]** `css/components/skill-tracker.css`
- **[MODIFY]** `pages/Kỹ năng/ky-nang.html` (Thêm widget Progress Overview, Radial Spider Chart, Streak Counter)
- **Tính năng:**
  - Lưu trạng thái học tập của sinh viên vào `localStorage['cliniportal-skill-progress']`.
  - 5 cấp độ thành thục: Chưa học ⬜ → Đã đọc 🟨 → Đã thực hành 🟧 → Tự tin 🟩 → Thuần thục ⭐.
  - Tích hợp nút Floating Action Button (FAB) trên các trang kỹ năng để người dùng đánh giá mức độ tự tin.

#### 1.2 Cross-Module Knowledge Bridge (`#10`)
- **[NEW]** `js/knowledge-map-data.js` (Adjacency list liên kết Kỹ năng với Sinh lý, Tiếp cận, Dược lý, Công cụ)
- **[NEW]** `js/knowledge-bridge.js` (Tự động quét `data-tags` trên trang kỹ năng và render panel "Liên quan & Tiếp theo")
- **Tính năng:**
  - Tạo luồng học liên hoàn:VD từ Khám Tim → gợi ý Đọc ECG → gợi ý Lưu đồ Đau ngực → gợi ý Máy tính Wells / TIMI Score.

#### 1.3 Spaced Repetition Flashcard System (`#9`)
- **[NEW]** `js/skill-flashcards.js` (Thuật toán SuperMemo SM-2)
- **[NEW]** `css/components/skill-flashcards.css` (Giao diện 3D flip card, 4 nút chọn độ khó: Quên / Khó / Nhớ / Dễ)
- **Tính năng:**
  - Ôn tập kiến thức trọng tâm bedside / checklist OSCE ngắt quãng.

---

### Phase 2: Công Cụ Tư Duy & Huấn Luyện Lâm Sàng Đột Phá

#### 2.1 Clinical Reasoning Engine (`#6`)
- **[NEW]** `pages/Kỹ năng/Quản lý điều trị/Clinical_Reasoning.html`
- **[NEW]** `js/clinical-reasoning.js`
- **[NEW]** `css/components/clinical-reasoning.css`
- **Tính năng:**
  - Hỗ trợ 3 framework: **SBAR** (giao ban/báo cáo), **SNAPPS** (trình bệnh án), **Semantic Qualifier Grid** (tư duy chẩn đoán phân biệt).
  - Mẫu nhập thông minh, highlight từ khóa lâm sàng, tự đánh giá và xuất text / in ấn bệnh án.

#### 2.2 Virtual Patient Simulator (`#1`)
- **[NEW]** `pages/Kỹ năng/Bệnh nhân ảo/Benh_Nhan_Ao_Hub.html`
- **[NEW]** `pages/Kỹ năng/Bệnh nhân ảo/Case_DauNguc_Cap.html`
- **[NEW]** `js/virtual-patient.js`
- **[NEW]** `css/components/virtual-patient.css`
- **Tính năng:**
  - Giả lập ca bệnh tương tác (narrative branching game), người dùng đưa ra lựa chọn Hỏi bệnh → Khám → CLS → Chẩn đoán → Điều trị.
  - Chấm điểm và feedback tức thì dựa trên tiêu chuẩn AHA/ACLS.

---

### Phase 3: Âm Thanh, Cận Lâm Sàng & Thủ Thuật Động

#### 3.1 Auscultation Trainer (`#2`)
- **[NEW]** `pages/Kỹ năng/Lâm sàng/Nghe_Am_Thanh.html`
- **[NEW]** `js/auscultation-trainer.js`
- **[NEW]** `css/components/auscultation-trainer.css`
- **Tính năng:**
  - Bản đồ hotspot SVG ngực & bụng (các ổ van tim, 9 vùng nghe phổi, 4 tứ phân khu bụng).
  - Tích hợp Web Audio API tổng hợp âm thanh thực tế (S1-S4, Tiếng thổi tâm thu/tâm trương, Ran nổ, Ran rít, Wheeze, Nhu động ruột).
  - Chế độ Quiz Mode luyện phản xạ thính giác.

#### 3.2 ECG Interactive Trainer (`#7`)
- **[NEW]** `pages/Kỹ năng/Cận lâm sàng/ECG_Interactive.html`
- **[NEW]** `js/ecg-trainer.js`
- **[NEW]** `css/components/ecg-trainer.css`
- **Tính năng:**
  - Sóng ECG SVG chuẩn xác trên lưới milimét (25mm/s).
  - Thước đo Calipers kéo thả ảo đo khoảng RR, PR, QRS, QT, tự động tính QTc (Bazett).
  - Ngân hàng 15+ dạng nhịp tim & biến đổi ST-T kèm quiz chẩn đoán.

#### 3.3 Procedure Step-by-Step Animator (`#8`)
- **[NEW]** `pages/Kỹ năng/Thủ thuật/Dat_NKQ.html`
- **[NEW]** `pages/Kỹ năng/Thủ thuật/Choc_Dich_Mang_Phoi.html`
- **[NEW]** `pages/Kỹ năng/Thủ thuật/Choc_Dich_Tuy_Song.html`
- **[NEW]** `js/procedure-animator.js`
- **[NEW]** `css/components/procedure-animator.css`
- **Tính năng:**
  - Hoàn thiện Phân hệ 6 (Thủ thuật) — Stepper quy trình từng bước kết hợp SVG minh họa động và checkpoint quiz safety.

---

## 🧪 Phân Chia Chi Tiết Các File Sẽ Sửa / Tạo Mới

### 📁 `css/components/`
- **[NEW]** `skill-tracker.css`
- **[NEW]** `skill-flashcards.css`
- **[NEW]** `clinical-reasoning.css`
- **[NEW]** `virtual-patient.css`
- **[NEW]** `auscultation-trainer.css`
- **[NEW]** `ecg-trainer.css`
- **[NEW]** `procedure-animator.css`

### 📁 `js/`
- **[NEW]** `skill-tracker.js`
- **[NEW]** `knowledge-map-data.js`
- **[NEW]** `knowledge-bridge.js`
- **[NEW]** `skill-flashcards.js`
- **[NEW]** `clinical-reasoning.js`
- **[NEW]** `virtual-patient.js`
- **[NEW]** `anatomy-explorer.js`
- **[NEW]** `auscultation-trainer.js`
- **[NEW]** `ecg-trainer.js`
- **[NEW]** `procedure-animator.js`

### 📁 `pages/Kỹ năng/`
- **[MODIFY]** `ky-nang.html`
- **[NEW]** `Lâm sàng/Nghe_Am_Thanh.html`
- **[NEW]** `Quản lý điều trị/Clinical_Reasoning.html`
- **[NEW]** `Cận lâm sàng/ECG_Interactive.html`
- **[NEW]** `Bệnh nhân ảo/Benh_Nhan_Ao_Hub.html`
- **[NEW]** `Bệnh nhân ảo/Case_DauNguc_Cap.html`
- **[NEW]** `Thủ thuật/Dat_NKQ.html`
- **[NEW]** `Thủ thuật/Choc_Dich_Mang_Phoi.html`
- **[NEW]** `Thủ thuật/Choc_Dich_Tuy_Song.html`

### 📁 `docs/`
- **[MODIFY]** `FILE_MAP.md` (Cập nhật danh sách các file mới vừa tạo)

---

## 🔍 Kế Hoạch Kiểm Thử (Verification Plan)

### Kiểm thử Tự động & Giao diện (Browser Verification)
1. **Kiểm tra liên kết & Đường dẫn tương đối**: Đảm bảo tất cả các file HTML mới đều load đúng CSS/JS và Header/Footer.
2. **Kiểm tra Tương tác & Logic**:
   - `Skill Tracker`: Đánh giá 1 bài học → kiểm tra `localStorage` và biểu đồ spider chart thay đổi.
   - `Auscultation Trainer`: Bật âm thanh Web Audio API → kiểm tra âm tim/phổi phát bình thường.
   - `ECG Trainer`: Kéo thước đo Calipers → kiểm tra tính toán chỉ số RR/QT.
   - `Clinical Reasoning Engine`: Nhập form SBAR/SNAPPS → kiểm tra render và xuất PDF/Text.
   - `Virtual Patient`: Chọn phương án → kiểm tra chuyển nhánh ca bệnh và tổng kết điểm.
3. **Kiểm tra Chế độ Dark/Light**: Switch theme ở header → đảm bảo toàn bộ giao diện tương thích.
4. **Kiểm tra Responsive**: Thử nghiệm trên màn hình mobile (≤ 768px).
