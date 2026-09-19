# 🩺 DOCSPACE CLINICAL DATA VERIFICATION KANBAN
> **Hệ thống Quản lý Tiến độ Chuẩn hóa Dữ liệu Lâm sàng DocSpace MedLens**
> **Phụ trách chính**: DocSpace Clinical Data Verification Squad (`docspace-clinical-data-qa-squad`)
> **Cập nhật lần cuối**: 2026-09-19

---

## 📊 TỔNG QUAN TIẾN ĐỘ (METRICS)

| Hạng mục rà soát | Tổng số mục | Đã chuẩn hóa | Đang xử lý | Cần rà soát (Backlog) | Tỷ lệ hoàn tất |
|:---|:---:|:---:|:---:|:---:|:---:|
| **1. Khử lỗi HTML Entities (`&gt;`, `&lt;`)** | 35 mục | 35 | 0 | 0 | 🟢 100% (Zero HTML Entities) |
| **2. Chuẩn hóa Viết tắt Y khoa** | 288 triệu chứng | 288 | 0 | 0 | 🟢 100% (Đạt chuẩn Y khoa) |
| **3. Lọc trùng & Hợp nhất Biến thể Triệu chứng** | 17 cụm trùng | 17 | 0 | 0 | 🟢 100% (Không còn trùng lặp) |
| **4. Phân định Ranh giới LS — TC — DTH** | 12 ca mẫu | 12 | 0 | 0 | 🟢 100% |
| **5. Zero-Orphan Symptoms Verification** | 39 bệnh + 12 ca | 100% | 0 | 0 | 🟢 100% (0 triệu chứng mồ côi) |

---

## 📋 BẢNG ĐIỀU PHỐI KANBAN CHI TIẾT

### 📥 1. BACKLOG (Cần Rà Soát & Lên Kế Hoạch)
- [ ] **[CD-TASK-010] Giám sát Định kỳ khi nạp Bệnh học / Ca bệnh mới**:
  - Tự động chạy `tools/qa/docspace-clinical-data-linter.mjs` và `tools/qa/docspace-medical-qa-gate.mjs` trước mỗi đợt commit dữ liệu mới.

---

### ⏳ 2. IN PROGRESS (Đang Xử Lý)
*(Hiện tại không có task tồn đọng - Toàn bộ tiêu chuẩn đã được nghiệm thu 100%)*

---

### 🔍 3. REVIEW & QA GATE (Đang Kiểm Tra Nghiệm Thu)
*(Đã hoàn tất nghiệm thu 6/6 Pillars của Medical QA Gate và 15/15 Tiêu chí Vault Readiness)*

---

### ✅ 4. DONE (Đã Hoàn Thành)
- [x] **[CD-TASK-000] Thành lập Đội ngũ DocSpace Clinical Data Verification Squad**:
  - Ban hành Skill hướng dẫn `docspace-clinical-data-qa-squad/SKILL.md`.
  - Thiết lập bảng điều phối Kanban `DOCSPACE_CLINICAL_DATA_QA_KANBAN.md`.
- [x] **[CD-TASK-001] Rà soát cụm Triệu chứng Toàn thân (Sốt & Mệt mỏi)**:
  - Hợp nhất `sot_cao_27`, `sot_cao_lien_tuc_dot_ngot` về Concept chuẩn `tc_sot_cao_dot_ngot_duoi_7_ngay`.
  - Hợp nhất `mo_hoi_trom` về `va_mo_hoi` ("Vã mồ hôi / Mồ hôi trộm về ban đêm").
- [x] **[CD-TASK-002] Rà soát cụm Thần kinh (Tri giác & Bệnh não gan)**:
  - Hợp nhất `vm_roi_loan_tri_giac` về `roi_loan_tri_giac` ("Lơ mơ / Rối loạn tri giác (Glasgow < 15)").
  - Chuẩn hóa `run_vo_canh_flapping_tremor` và `benh_nao_gan`.
- [x] **[CD-TASK-003] Rà soát cụm Cận lâm sàng (Tiểu cầu, Cô đặc máu, Albumin, NS1 Dengue)**:
  - Hợp nhất toàn bộ biến thể Dengue NS1 (`ns1_dengue`, `ns1_dengue_pos`, `sot_dengue_ns1_ag_duong_tinh`, `sot_kem_sot_xuat_huyet_dengue_ns1_duong`) về Concept duy nhất: `tc_xet_nghiem_ns1_hoac_pcr_duong_tinh`.
  - Hợp nhất `giam_tieu_cau_sot_ret` về `lab_tieu_cau_giam` (PLT < 150 G/L).
  - Hợp nhất `cls_plt_giam_sau`, `sxh_tieu_cau_giam_sau`, `giam_tieu_cau` về `tc_giam_tieu_cau_duoi_100_g_l` (PLT < 100 G/L).
  - Hợp nhất `hct_tang`, `sxh_hct_tang_co_dac` về `tc_co_dac_mau_hct_tang_tren_20_phan_tram`.
  - Hợp nhất `albumin_giam` về `giam_albumin_mau`.
- [x] **[CD-TASK-004] Rà soát cụm Gan mật & Tăng áp lực tĩnh mạch cửa**:
  - Hợp nhất `sao_mach_ban_do_long_ban_tay`, `sao_mach_long_ban_tay_son` về `sao_mach_ban_tay_son`.
  - Đăng ký chuẩn hóa `xo_gan_evidence`, `decompensation_event`, `imaging_portal_htn`, `tuan_hoan_bang_he_ron`, `lab_child_pugh_score`, `thung_tang_rong`.
  - Khử bỏ mục không dấu `co_truong` chuyển sang `co_truong_do_3`.
- [x] **[CD-TASK-005] Khử sạch 100% HTML entities rò rỉ trong `clinical-rules-symptoms.json`**:
  - Loại bỏ hoàn toàn `&gt;`, `&lt;`, `&quot;`, `&amp;` trong các triệu chứng cận lâm sàng và phác đồ.
- [x] **[CD-TASK-006] Loại bỏ tiền tố thừa trong nhãn nút bấm**:
  - Làm sạch các tiền tố cản trở hiển thị, bảo đảm nút bấm sắc nét, đúng chuẩn typographic.
- [x] **[CD-TASK-007] Vận hành script tự động `docspace-clinical-data-linter.mjs`**:
  - Tích hợp vào CI/CD lint gate, kiểm tra tự động 4 trụ cột chất lượng dữ liệu lâm sàng.
- [x] **[CD-TASK-008] Kiểm tra tính tương thích ngược với Ma trận Trọng số CDSS**:
  - Đồng bộ cập nhật đồng thời 39 bệnh lý tại `data/diseases/*.json` và 12 ca mẫu tại `sample-clinical-cases.json`.
  - Đạt 0 triệu chứng mồ côi (Zero-Orphan Symptoms) tại PILLAR 1 của Medical QA Gate.
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
