# 🩺 DOCSPACE CLINICAL DATA VERIFICATION KANBAN
> **Hệ thống Quản lý Tiến độ Chuẩn hóa Dữ liệu Lâm sàng DocSpace MedLens**
> **Phụ trách chính**: DocSpace Clinical Data Verification Squad (`docspace-clinical-data-qa-squad`)
> **Cập nhật lần cuối**: 2026-09-19

---

## 📊 TỔNG QUAN TIẾN ĐỘ (METRICS)

| Hạng mục rà soát | Tổng số mục | Đã chuẩn hóa | Đang xử lý | Cần rà soát (Backlog) | Tỷ lệ hoàn tất |
|:---|:---:|:---:|:---:|:---:|:---:|
| **1. Khử lỗi HTML Entities (`&gt;`, `&lt;`)** | ~35 mục | 0 | 35 | 0 | 🟡 Đang chạy fix |
| **2. Chuẩn hóa Viết tắt Y khoa** | 296 triệu chứng | 180 | 60 | 56 | 🟡 60.8% |
| **3. Lọc trùng & Hợp nhất Biến thể Triệu chứng** | 12 nhóm | 3 nhóm | 4 nhóm | 5 nhóm | 🟡 25.0% |
| **4. Phân định Ranh giới LS — TC — DTH** | 12 ca mẫu | 12 | 0 | 0 | 🟢 100% |

---

## 📋 BẢNG ĐIỀU PHỐI KANBAN CHI TIẾT

### 📥 1. BACKLOG (Cần Rà Soát & Lên Kế Hoạch)
- [ ] **[CD-TASK-001] Rà soát cụm Triệu chứng Toàn thân (Sốt & Mệt mỏi)**:
  - Gom các nút: `Sốt >= 38°C`, `Sốt cao liên tục 2–7 ngày`, `Sốt cao đột ngột (>= 38.5°C)`, `Sốt cao đột ngột liên tục <= 7 ngày` về mô hình Concept `Sốt` chuẩn hóa.
- [ ] **[CD-TASK-002] Rà soát cụm Hô hấp (Ho & Khó thở)**:
  - Hợp nhất các biến thể: `Ho`, `Ho kéo dài > 2 tuần`, `Ho khạc đờm đục / mủ`, `Ho ra máu`, `Ho khạc đờm mạn tính...`.
- [ ] **[CD-TASK-003] Rà soát cụm Thần kinh (Tri giác & Co giật)**:
  - Hợp nhất các nút bị lặp: `Lơ mơ / rối loạn tri giác`, `Rối loạn tri giác / Glasgow < 15`, `Hôn mê, rối loạn tri giác`, `Co giật toàn thể hoặc cục bộ, hôn mê`.
- [ ] **[CD-TASK-004] Rà soát cụm Da niêm (Xuất huyết & Ban)**:
  - Đồng nhất: `Ban / chấm xuất huyết`, `Chấm, nốt xuất huyết dưới da tự nhiên`, `Xuất huyết da niêm / Dây thắt (Lacet...)`.

---

### ⏳ 2. IN PROGRESS (Đang Xử Lý)
- [ ] **[CD-TASK-005] Khử sạch 100% HTML entities rò rỉ trong `clinical-rules-symptoms.json`**:
  - Loại bỏ các chuỗi `&gt;`, `&lt;`, `&quot;`, `&amp;` trong các triệu chứng cận lâm sàng (`Men gan ALT tăng đột ngột &gt; 5 lần`, `Tỷ số chuẩn hóa quốc tế INR &gt; 1.5`, v.v.).
- [ ] **[CD-TASK-006] Loại bỏ tiền tố thừa trong nhãn nút bấm**:
  - Loại bỏ các cụm `"Cận lâm sàng: ..."`, `"Dấu hiệu cảnh báo: ..."`, `"Sốt rét ác tính: ..."` đang làm nút bấm bị dài và xấu.
- [ ] **[CD-TASK-007] Vận hành script tự động `docspace-clinical-data-linter.mjs`**:
  - Chạy quét toàn diện và tạo cơ chế CI/CD gate để chặn các lỗi này trong tương lai.

---

### 🔍 3. REVIEW & QA GATE (Đang Kiểm Tra Nghiệm Thu)
- [ ] **[CD-TASK-008] Kiểm tra tính tương thích ngược với Ma trận Trọng số CDSS**:
  - Đảm bảo việc hợp nhất triệu chứng không làm mất liên kết của 39 bệnh lý và các file `data/enriched/*.json`.

---

### ✅ 4. DONE (Đã Hoàn Thành)
- [x] **[CD-TASK-000] Thành lập Đội ngũ DocSpace Clinical Data Verification Squad**:
  - Ban hành Skill hướng dẫn `docspace-clinical-data-qa-squad/SKILL.md`.
  - Thiết lập bảng điều phối Kanban `DOCSPACE_CLINICAL_DATA_QA_KANBAN.md`.
- [x] **[CD-TASK-009] Khử trùng lặp giữa Yếu tố Dịch tễ và Tiền căn (TC)**:
  - Tích hợp thuật toán `isEpidemiologyDuplicate` trong `Step2ProblemStatement.tsx`.
  - Chuẩn hóa toàn bộ trường `tc` trong 12 ca mẫu của `sample-clinical-cases.json`.
  - Nâng cấp giao diện hiển thị Section 5 trong `CaseSummaryPanel.tsx`.

---

## 🎯 QUY TRÌNH TIẾP NHẬN & XỬ LÝ (SOP)

1. **Phát hiện lỗi**: Khi phát hiện triệu chứng trùng lặp, viết tắt dị biệt hoặc lỗi ký tự `&gt;`, tạo task trên bảng Kanban với mã `CD-TASK-XXX`.
2. **Phân vai xử lý**: Giao nhiệm vụ cho 1 trong 4 Agent chuyên trách (CD-AGENT-01 đến 04).
3. **Chạy Linter**: Chạy `node tools/qa/docspace-clinical-data-linter.mjs` để kiểm tra trước và sau khi chỉnh sửa.
4. **Cập nhật CSDL**: Đồng bộ đồng thời cả 2 tệp `clinical-rules-symptoms.json` và `clinical-rules-kb.json`.
5. **Nghiệm thu**: Chuyển trạng thái sang `DONE` sau khi kiểm tra không gãy vỡ liên kết bệnh lý.
