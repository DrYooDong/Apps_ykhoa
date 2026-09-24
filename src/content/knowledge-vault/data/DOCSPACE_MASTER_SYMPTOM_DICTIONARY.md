# 📘 CLINIPORTAL — DANH MỤC TỪ VỰNG LÂM SÀNG CHUẨN (MASTER SYMPTOM DICTIONARY)

> **Phiên bản**: v5.0 | **Ngày cập nhật**: 2026-09-24 | **Tổng số triệu chứng chuẩn**: 37
> **Vị trí lưu trữ**: `src/content/knowledge-vault/data/DOCSPACE_MASTER_SYMPTOM_DICTIONARY.md`
> **Mục đích**: Bản đồ từ vựng tham chiếu chuẩn mực (Anchor Vocabulary). Dùng để nạp trực tiếp vào **Google NotebookLM** cùng với tài liệu Guideline để AI đối chiếu, tái sử dụng mã ID sẵn có và tuyệt đối tránh tạo triệu chứng trùng lặp.

---

## 🧭 HƯỚNG DẪN DÀNH CHO AI (SYSTEM PROMPT RULES CHO NOTEBOOKLM)

Khi bạn (AI / NotebookLM) phân tích tài liệu lâm sàng/Guideline và trích xuất dữ liệu bệnh học (Prompt 05, Prompt 06):

1. **TRA CỨU TRƯỚC (Look up first)**:
   - Trước khi điền trường `symptomIds` trong tiêu chuẩn hoặc `selected` trong ca mẫu, **BẮT BUỘC** tra cứu bảng danh mục từ vựng dưới đây.
2. **TÁI SỬ DỤNG MÃ ID HIỆN HỮU (Reuse Existing IDs)**:
   - Nếu triệu chứng trong Guideline hoặc bệnh án tương đương hoặc là một biến thể ngữ nghĩa (nằm trong cột *Từ khóa & Biến thể / Aliases*) → **BẮT BUỘC dùng lại `Mã ID chuẩn`** đã có.
   - Ví dụ:
     - Thấy "sốt cao", "sốt > 38°C", "nóng sốt" → Dùng `sot`.
     - Thấy "sốt cao liên tục ngày 1-7", "sốt dengue đột ngột" → Dùng `tc_sot_cao_dot_ngot_duoi_7_ngay`.
     - Thấy "mạch nhanh xoang", "nhịp tim > 100" → Dùng `mach_nhanh`.
     - Thấy "hct tăng dốc đứng", "cô đặc máu" → Dùng `tc_co_dac_mau_hct_tang_tren_20_phan_tram`.
     - Thấy "tiểu cầu tụt < 100 G/L" → Dùng `tc_giam_tieu_cau_duoi_100_g_l`.
3. **KHI NÀO ĐƯỢC PHÉP ĐỀ XUẤT TRIỆU CHỨNG MỚI?**:
   - CHỈ KHI NÀO triệu chứng / dấu hiệu / nghiệm pháp / xét nghiệm đó **HOÀN TOÀN MỚI**, đặc thù cho bệnh lý đang nạp và chưa từng xuất hiện trong bất kỳ mục nào dưới đây.
   - Khi tạo ID mới, phải tuân thủ nghiêm ngặt:
     - Viết thường không dấu, dùng dấu gạch dưới `_` (ví dụ: `dau_nguc_kieu_mang_phoi`, `ran_no_khu_tru`).
     - **KHÔNG** dùng tiền tố tùy tiện như `tc_`, `c_`, `trieu_chung_` (các tiền tố cũ chỉ để tương thích ngược).
     - Bắt buộc khai báo đầy đủ trong mảng `trieuChungMoi` kèm: `id`, `ten`, `nhom`, `loai`, `tuKhoa`, `aliases`, `map`.

---

## 🗂️ BẢNG TỪ VỰNG CHI TIẾT THEO HỆ CƠ QUAN

### 1. Toàn thân & Sinh hiệu chung (`toan-than.json` — 6 mục)

| STT | Mã ID chuẩn | Tên triệu chứng lâm sàng | Loại | Từ khóa & Biến thể / Aliases | Ngưỡng tự suy |
|:---:|:---|:---|:---:|:---|:---:|
| 1 | `sot` | Sốt (≥ 38.0°C) | CN, TT | sốt, fever, nhiệt độ cao, pyrexia, sốt cao, sốt nhẹ, sốt vừa, nóng sốt | `vNhiet >= 38` |
| 2 | `tc_sot_cao_dot_ngot_duoi_7_ngay` | Sốt cao đột ngột liên tục ≤ 7 ngày | CN, TT | sốt cao đột ngột, sốt liên tục, sốt dengue, sốt dưới 7 ngày, sot dot ngot, sốt cao liên tục, sốt cấp tính, sốt bùng phát | `vNhiet >= 38.5` |
| 3 | `met_moi` | Mệt mỏi toàn thân | CN | mệt mỏi, uể oải, kiệt sức, fatigue, mệt nhọc, suy nhược, uể oải toàn thân, mệt lả | — |
| 4 | `da_xanh` | Da xanh, niêm mạc nhợt nhạt | TT | da xanh, niêm nhợt, da tái, pallor, da niêm nhợt, niêm mạc mắt nhợt, xanh xao, thiếu máu lâm sàng | — |
| 5 | `dau_co` | Đau mỏi cơ, khớp | CN | đau cơ, đau khớp, nhức mỏi, myalgia, arthralgia, đau nhức cơ bắp, mỏi cơ, đau mình mẩy | — |
| 6 | `nhuc_hai_ho_mat` | Nhức hai hố mắt | CN | nhức hố mắt, đau sau hốc mắt, retro-orbital pain, nhuc hai ho mat, đau hốc mắt | — |

### 2. Hệ Tim mạch & Huyết động (`tim-mach.json` — 4 mục)

| STT | Mã ID chuẩn | Tên triệu chứng lâm sàng | Loại | Từ khóa & Biến thể / Aliases | Ngưỡng tự suy |
|:---:|:---|:---|:---:|:---|:---:|
| 1 | `mach_nhanh` | Mạch nhanh (> 100 lần/phút) | TT | mạch nhanh, nhịp tim nhanh, tachycardia, tim đập nhanh, nhịp nhanh xoang, mạch > 100, tim đập dồn dập | `vMach > 100` |
| 2 | `ha_huyet_ap` | Huyết áp tụt (< 90 mmHg) | TT | huyết áp tụt, hạ huyết áp, hypotension, ha thap, tụt huyết áp, hatt < 90, huyết áp thấp, tụt áp | `vHATT < 90` |
| 3 | `chi_lanh_crt_keo_dai` | Đầu chi lạnh, ẩm, thời gian đổ đầy mao mạch (CRT) kéo dài > 2 giây | TT | chi lạnh, crt kéo dài, đầu chi lạnh ẩm, capillary refill, tưới máu kém, tay chân lạnh, chi lạnh vã mồ hôi, crt > 2s | — |
| 4 | `tc_soc_mach_nhanh_ha_kep_hoac_tut` | Sốc: Mạch nhanh nhỏ, HA kẹp (≤ 20 mmHg) hoặc Tụt huyết áp | TT | sốc, sốc sxh, huyết áp kẹp, mạch nhanh nhỏ, dengue shock syndrome, sốc giảm thể tích, hiệu áp kẹp, dss | `vHATT <= 90` |

### 3. Hệ Hô hấp & Lồng ngực (`ho-hap.json` — 5 mục)

| STT | Mã ID chuẩn | Tên triệu chứng lâm sàng | Loại | Từ khóa & Biến thể / Aliases | Ngưỡng tự suy |
|:---:|:---|:---|:---:|:---|:---:|
| 1 | `kho_tho` | Khó thở | CN, TT | khó thở, dyspnea, thở hụt hơi, thở gắng sức, ngột ngạt khó thở, thở hổn hển, thở mệt, tức ngực khó thở | — |
| 2 | `tho_nhanh` | Thở nhanh (> 20 lần/phút) | TT | thở nhanh, tachypnea, tần số thở tăng, thở nông nhanh, thở > 20 l/p, thở > 22 l/p, tăng nhịp thở, tho_rut | `vTho > 20` |
| 3 | `spo2_giam` | SpO₂ giảm (< 94%) | TT | spo2 giảm, giảm oxy máu, hypoxemia, spo2 thấp, spo2_thap, độ bão hòa oxy giảm, spo2 < 94%, tụt spo2 | `vSpo2 < 94` |
| 4 | `tc_ho_co_dom_hoac_viem_am_i_keo_dai` | Ho có đờm đục / Viêm nhiễm khuẩn hô hấp âm ỉ kéo dài | CN | ho đờm đục, viêm hô hấp, ho có đờm, nhiễm khuẩn hô hấp, ho khạc đờm mủ, ho đàm vàng xanh, viêm phế quản phổi | — |
| 5 | `ho_ra_mau_xuat_huyet_phoi` | Ho ra máu, xuất huyết phổi | CN, TT | ho ra máu, hemoptysis, xuất huyết phổi, khạc máu, khạc đờm lẫn máu, ho máu sét đánh, chảy máu đường thở | — |

### 4. Hệ Tiêu hóa, Gan mật & Ổ bụng (`tieu-hoa.json` — 4 mục)

| STT | Mã ID chuẩn | Tên triệu chứng lâm sàng | Loại | Từ khóa & Biến thể / Aliases | Ngưỡng tự suy |
|:---:|:---|:---|:---:|:---|:---:|
| 1 | `buon_non_non` | Buồn nôn / Nôn | CN | buồn nôn, nôn, nôn ói, nausea, vomiting, nôn nhiều lần, nôn khan, mắc ói | — |
| 2 | `gan_to_dau` | Gan to dưới bờ sườn, ấn đau tức vùng hạ sườn phải | TT | gan to, ấn đau gan, gan lớn, đau hạ sườn phải, hepatomegaly, gan to đau, gan to > 2cm, ấn đau vùng gan | — |
| 3 | `tc_dau_hieu_canh_bao_dau_bung_gan_non_oi` | Đau bụng vùng gan, nôn ói nhiều (Dấu hiệu cảnh báo) | CN, TT | đau bụng gan, nôn ói nhiều, dấu hiệu cảnh báo, warning signs dengue, đau bụng nhiều liên tục, nôn liên tục, đau vùng gan liên tục | — |
| 4 | `non_ra_mau_phan_den` | Xuất huyết tiêu hóa: Nôn ra máu / Đi cầu phân đen | CN, TT | nôn ra máu, tiêu phân đen, hematemesis, melena, xuất huyết tiêu hóa, ói ra máu, đi tiêu phân đen như hắc ín, ỉa phân đen | — |

### 5. Hệ Thần kinh & Ý thức (`than-kinh.json` — 5 mục)

| STT | Mã ID chuẩn | Tên triệu chứng lâm sàng | Loại | Từ khóa & Biến thể / Aliases | Ngưỡng tự suy |
|:---:|:---|:---|:---:|:---|:---:|
| 1 | `dau_dau` | Đau đầu dữ dội | CN | đau đầu, nhức đầu, headache, đau nhức đầu, đau nhức nửa đầu, nhức óc, đau trán thái dương | — |
| 2 | `cung_gay_dieu_tri_mang_nao` | Dấu hiệu Cứng gáy / Hội chứng kích thích màng não | CN, TT | cứng gáy, nuchal rigidity, hội chứng màng não, kernig, brudzinski, cứng gáy, dấu màng nào, kernig dương tính | — |
| 3 | `co_giat_va_dau_than_kinh_khu_tru_dau_hieu_co_do` | Co giật mới khởi phát &amp; Dấu hiệu thần kinh khu trú (Cờ đỏ nguy hiểm) | CN, TT | co giật mới phát, dấu thần kinh khu trú, liệt dây thần kinh sọ, yếu liệt nửa người, rối loạn tri giác dốc, co giat, liet day so, dau tk khu tru | — |
| 4 | `hcm_sot_dau_dau_cung_gay_hoi_chung_mang_nao` | Hội chứng lâm sàng màng nào cấp tính (Sốt, Đau đầu, Cứng gáy, Rối loạn tri giác) | CN, TT | hội chứng màng não, sốt, đau đầu dữ dội, cứng gáy, kernig, brudzinski, sợ ánh sáng, hoi chung mang nao | — |
| 5 | `photophobia_so_anh_sang` | Sợ ánh sáng / Sợ tiếng động (Photophobia / Hyperacusis) | CN | sợ ánh sáng, photophobia, nhạy cảm ánh sáng, sợ tiếng động, hyperacusis, so anh sang, nhay cam anh sang, chói mắt | — |

### 6. Da niêm & Dị ứng lâm sàng (`da-niem.json` — 2 mục)

| STT | Mã ID chuẩn | Tên triệu chứng lâm sàng | Loại | Từ khóa & Biến thể / Aliases | Ngưỡng tự suy |
|:---:|:---|:---|:---:|:---|:---:|
| 1 | `trieu_chung_goi_y_can_nguyen_vi_rut_dac_hieu` | Dấu hiệu lâm sàng gợi ý căn nguyên vi rút đặc hiệu (Mụn nước Zona/Herpes, Ban tay chân miệng, Quai bị) | CN, TT | mụn nước zona, herpes sinh dục, ban tay chân miệng, sưng tuyến mang tai, vi rút gợi ý, mun nuoc zona, herpes vesical rash, tay chan mieng ev71 | — |
| 2 | `tc_xuat_huyet_da_niem_lacet_duong_tinh` | Xuất huyết dưới da, niêm mạc, Dây thắt (Lacet) (+) | TT | xuất huyết dưới da, chấm xuất huyết, lacet dương tính, chảy máu cam, chảy máu chân răng, chấm xuất huyết rải rác, mảng bầm tím, chảy máu niêm mạc | — |

### 7. Cận lâm sàng (Huyết học, Sinh hóa, Vi sinh, CĐHA) (`can-lam-sang.json` — 11 mục)

| STT | Mã ID chuẩn | Tên triệu chứng lâm sàng | Loại | Từ khóa & Biến thể / Aliases | Ngưỡng tự suy |
|:---:|:---|:---|:---:|:---|:---:|
| 1 | `tc_co_dac_mau_hct_tang_tren_20_phan_tram` | Cô đặc máu (Hematocrit tăng > 20% so với giá trị nền) | CLS | cô đặc máu, hct tăng, hematocrit cao, hemoconcentration, hct tăng dốc đứng, hct > 45%, hct tăng trên 20%, thoát dịch cô đặc máu | `lHct >= 42` |
| 2 | `tc_xet_nghiem_ns1_hoac_pcr_duong_tinh` | Xét nghiệm Dengue NS1 Ag (+) hoặc RT-PCR (+) | CLS | ns1 dương tính, pcr dengue dương tính, ns1 ag (+), dengue test, ns1 (+), test nhanh dengue ns1 (+), rt-pcr denv (+), dengue igm (+) | — |
| 3 | `tc_giam_tieu_cau_duoi_100_g_l` | Tiểu cầu giảm sâu (< 100 G/L) | CLS | tiểu cầu giảm, giảm tiểu cầu, thrombocytopenia, plt < 100, tiểu cầu tụt, plt giảm, tiểu cầu < 100.000, tiểu cầu dốc đứng | `lTC <= 100` |
| 4 | `tran_dich_mang_phoi_mang_bung` | Thoát huyết tương: Tràn dịch màng phổi, tràn dịch màng bụng trên siêu âm/X-quang | CLS, TT | tràn dịch màng phổi, tràn dịch màng bụng, cổ trướng, thoát huyết tương, phù nề thành túi mật, dịch màng phổi, dịch tự do ổ bụng, dày phù nề thành túi mật | — |
| 5 | `men_gan_tang` | Men gan AST/ALT tăng cao (> 2 lần bình thường) | CLS | men gan tăng, ast tăng, alt tăng, transaminase, tăng men gan, tổn thương tế bào gan, ast/alt cao, men gan > 40 | `lAST > 80` |
| 6 | `vi_sinh_dnt_nhuom_gram_pcr_nuoi_cay_duong_tinh` | Xét nghiệm vi sinh DNT/Máu dương tính (Soi Gram, PCR, Nuôi cấy vi khuẩn) | CLS | nhuộm gram dnt, cấy dnt, pcr dnt vi khuẩn, phế cầu dnt, não mô cầu dnt, listeria dnt, gram stain csf, csf culture positive | — |
| 7 | `chi_dinh_ct_scan_truoc_khi_choc_do_tuy_song` | Các dấu hiệu chỉ định chụp CT scan đầu trước khi chọc dò tủy sống (Dọa tăng áp nội sọ) | TT, CLS | chụp ct scan trước chọc dò, phù gai thị, ức chế miễn dịch, tiền căn TKTƯ, hôn mê, hoãn chọc dò, ct head before lp, phu gai thi | — |
| 8 | `dnt_bien_doi_vmn_vi_rut_lympho` | Biến đổi DNT trong, tăng bạch cầu Lympho, Glucose DNT bình thường (Viêm màng nào vi rút) | CLS | dnt trong, bạch cầu lympho dnt, glucose dnt bình thường, lactate dnt bình thường, dnt vi rút, dnt trong, aseptic meningitis csf, lympho dnt | — |
| 9 | `pcr_dnt_xac_dinh_gen_vi_rut` | Xét nghiệm Sinh học phân tử PCR DNT phát hiện ADN/RNA vi rút (+) | CLS | pcr vi rút dnt, enterovirus pcr, hsv pcr dnt, vzv pcr dnt, biofire me panel, pcr dnt vi rut, csf viral pcr positive, enterovirus rna positive | — |
| 10 | `dnt_bien_doi_vmn_vi_khuan_dinh_luong` | Biến đổi DNT đục/mủ, tăng bạch cầu đa nhân và giảm sâu glucose (Viêm màng nào vi khuẩn) | CLS | dnt đục, dnt mủ, bạch cầu dnt tăng, bạch cầu đa nhân dnt, glucose dnt giảm, protein dnt tăng cao, dnt duc, pleocytosis neutrophil | — |
| 11 | `dnt_duc_duc_duc_tang_te_bao_da_nhan` | Dịch não tủy đục / Mủ, tăng bạch cầu đa nhân và giảm glucose | CLS | dNT đục, bạch cầu DNT tăng, glucose DNT giảm, protein DNT tăng, dnt mủ, pleocytosis, dnt vi khuẩn, ty le glucose dnt mau giam | — |

### 8. Hệ Tiết niệu & Chức năng thận (`tiet-nieu.json` — 0 mục)

*Hiện chưa có triệu chứng nào trong phân nhóm này. Sẽ được bổ sung khi nạp các bệnh lý liên quan.*

### 9. Hệ Nội tiết & Chuyển hóa (`noi-tiet.json` — 0 mục)

*Hiện chưa có triệu chứng nào trong phân nhóm này. Sẽ được bổ sung khi nạp các bệnh lý liên quan.*

### 10. Huyết học & Đông máu (`huyet-hoc.json` — 0 mục)

*Hiện chưa có triệu chứng nào trong phân nhóm này. Sẽ được bổ sung khi nạp các bệnh lý liên quan.*

### 11. Sản phụ khoa (`san-phu-khoa.json` — 0 mục)

*Hiện chưa có triệu chứng nào trong phân nhóm này. Sẽ được bổ sung khi nạp các bệnh lý liên quan.*

### 12. Tiền căn & Yếu tố nguy cơ nền (`tien-can.json` — 0 mục)

*Hiện chưa có triệu chứng nào trong phân nhóm này. Sẽ được bổ sung khi nạp các bệnh lý liên quan.*

---
*Tài liệu tự động tạo bởi: `tools/scripts/bundle-symptoms.mjs` — CliniPortal Knowledge Engineering Squad.*
