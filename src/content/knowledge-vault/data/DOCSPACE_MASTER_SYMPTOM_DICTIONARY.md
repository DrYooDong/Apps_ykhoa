# 📘 CLINIPORTAL — DANH MỤC TỪ VỰNG LÂM SÀNG CHUẨN (MASTER SYMPTOM DICTIONARY)

> **Phiên bản**: v5.0 | **Ngày cập nhật**: 2026-09-26 | **Tổng số triệu chứng chuẩn**: 28
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

### 1. Toàn thân & Sinh hiệu chung (`toan-than.json` — 4 mục)

| STT | Mã ID chuẩn | Tên triệu chứng lâm sàng | Loại | Từ khóa & Biến thể / Aliases | Ngưỡng tự suy |
|:---:|:---|:---|:---:|:---|:---:|
| 1 | `tc_sot_cao_dot_ngot_duoi_7_ngay` | Sốt cao đột ngột liên tục ≤ 7 ngày | CN, TT | sốt cao, sốt đột ngột, sốt liên tục, sốt dengue, sot duoi 7 ngay, sốt cao liên tục, sốt cấp tính, sốt khó hạ | `vNhiet ≥ 38.5` |
| 2 | `dau_co` | Đau mỏi cơ, nhức khớp và mình mẩy | CN | đau cơ, đau khớp, nhức mỏi, myalgia, arthralgia, đau mình mẩy, nhức mỏi toàn thân, đau nhức xương khớp | — |
| 3 | `nhuc_hai_ho_mat` | Nhức hai hốc mắt (Retro-orbital pain) | CN | nhức hốc mắt, đau sau hốc mắt, nhức mắt, retro-orbital, đau hố mắt, nhức hai bên hốc mắt, đau hốc mắt | — |
| 4 | `met_moi` | Mệt mỏi toàn thân, mệt lả, chán ăn, suy kiệt | CN | mệt mỏi, chán ăn, kiệt sức, mệt lả, fatigue, uể oải toàn thân, suy nhược, ăn uống kém | — |

### 2. Hệ Tim mạch & Huyết động (`tim-mach.json` — 4 mục)

| STT | Mã ID chuẩn | Tên triệu chứng lâm sàng | Loại | Từ khóa & Biến thể / Aliases | Ngưỡng tự suy |
|:---:|:---|:---|:---:|:---|:---:|
| 1 | `mach_nhanh` | Mạch nhanh (> 100 lần/phút) | TT | mạch nhanh, nhịp tim nhanh, tachycardia, mạch > 100, nhịp tim nhanh, mạch quay nhanh, tim đập nhanh | `vMach > 100` |
| 2 | `ha_huyet_ap` | Huyết áp tụt (< 90 mmHg) | TT | huyết áp tụt, hạ huyết áp, hypotension, ha thap, tụt huyết áp, hatt < 90, huyết áp thấp | `vHATT < 90` |
| 3 | `chi_lanh_crt_keo_dai` | Đầu chi lạnh, ẩm, thời gian đổ đầy mao mạch (CRT) kéo dài > 2 giây | TT | chi lạnh, crt kéo dài, đầu chi lạnh ẩm, capillary refill, tay chân lạnh, chi mát ẩm, crt > 2s, tưới máu ngoại biên kém | — |
| 4 | `tc_soc_mach_nhanh_ha_kep_hoac_tut` | Sốc SXH Dengue: Mạch nhanh nhỏ, HA kẹp (≤ 20 mmHg) hoặc Tụt huyết áp | TT | sốc, sốc sxh, huyết áp kẹp, mạch nhanh nhỏ, dengue shock syndrome, sốc giảm thể tích, hiệu áp kẹp, dss | `vHATT ≤ 90` |

### 3. Hệ Hô hấp & Lồng ngực (`ho-hap.json` — 3 mục)

| STT | Mã ID chuẩn | Tên triệu chứng lâm sàng | Loại | Từ khóa & Biến thể / Aliases | Ngưỡng tự suy |
|:---:|:---|:---|:---:|:---|:---:|
| 1 | `kho_tho` | Khó thở, suy hô hấp do tràn dịch đa màng hoặc phù phổi | CN, TT | khó thở, dyspnea, thở gắng sức, suy hô hấp, thở mệt, khó thở do tràn dịch, thở nông nhanh | — |
| 2 | `tho_nhanh` | Thở nhanh (> 20 lần/phút) | TT | thở nhanh, tachypnea, tần số thở tăng, thở > 20 l/p, nhịp thở nhanh, tăng nhịp thở | `vTho > 20` |
| 3 | `spo2_giam` | SpO₂ giảm (< 94%) | TT | spo2 giảm, giảm oxy máu, hypoxemia, spo2 < 94%, tụt spo2, giảm độ bão hòa oxy | `vSpo2 < 94` |

### 4. Hệ Tiêu hóa, Gan mật & Ổ bụng (`tieu-hoa.json` — 4 mục)

| STT | Mã ID chuẩn | Tên triệu chứng lâm sàng | Loại | Từ khóa & Biến thể / Aliases | Ngưỡng tự suy |
|:---:|:---|:---|:---:|:---|:---:|
| 1 | `buon_non_non` | Buồn nôn / Nôn ói | CN | buồn nôn, nôn ói, nausea, vomiting, nôn nhiều, mắc ói, nôn khan, nôn mửa | — |
| 2 | `tc_dau_hieu_canh_bao_dau_bung_gan_non_oi` | Đau bụng vùng gan, nôn ói liên tục (Dấu hiệu cảnh báo) | CN, TT | đau bụng gan, đau hạ sườn phải, nôn ói nhiều, dấu hiệu cảnh báo, nôn ói liên tục, đau HSP liên tục, nôn ói ≥ 3 lần/1h, nôn ói ≥ 4 lần/6h | — |
| 3 | `gan_to_dau` | Gan to > 2cm dưới bờ sườn kèm ấn đau tức | TT | gan to, bờ sườn, gan mấp mé, ấn đau vùng gan, hepatomegaly, gan to quá bờ sườn, gan lớn đau, gan to dưới bờ sườn | — |
| 4 | `non_ra_mau_phan_den` | Xuất huyết tiêu hóa: Nôn ra máu / Đi cầu phân đen | CN, TT | nôn ra máu, tiêu phân đen, hematemesis, melena, xuất huyết tiêu hóa, ó ra máu, đi tiêu phân đen hắc ín, ỉa phân đen | — |

### 5. Hệ Thần kinh & Ý thức (`than-kinh.json` — 3 mục)

| STT | Mã ID chuẩn | Tên triệu chứng lâm sàng | Loại | Từ khóa & Biến thể / Aliases | Ngưỡng tự suy |
|:---:|:---|:---|:---:|:---|:---:|
| 1 | `dau_dau` | Đau đầu dữ dội | CN | đau đầu, nhức đầu, headache, đau nhức đầu, nhức trán thái dương, nhức đầu nhiều | — |
| 2 | `lu_du_vat_va_li_bi` | Vật vã, lừ đừ, li bì (Dấu hiệu cảnh báo thần kinh) | CN, TT | lừ đừ, vật vã, li bì, thay đổi tri giác, bứt rứt, tri giác lừ đừ, vật vã bứt rứt, li bì khó thức tỉnh | — |
| 3 | `sxhd_the_nao_roi_loan_tri_giac` | Sốt xuất huyết Dengue thể não: Rối loạn tri giác, co giật, hôn mê | CN, TT | sxh thể não, rối loạn tri giác, co giật, hôn mê, dấu thần kinh khu trú, viêm não do dengue, bệnh não dengue, co giật bùng phát | — |

### 6. Da niêm & Dị ứng lâm sàng (`da-niem.json` — 2 mục)

| STT | Mã ID chuẩn | Tên triệu chứng lâm sàng | Loại | Từ khóa & Biến thể / Aliases | Ngưỡng tự suy |
|:---:|:---|:---|:---:|:---|:---:|
| 1 | `tc_xuat_huyet_da_niem_lacet_duong_tinh` | Xuất huyết dưới da, niêm mạc, Nghiệm pháp dây thắt (Lacet) (+) | TT | xuất huyết dưới da, chấm xuất huyết, lacet dương tính, chảy máu chân răng, chảy máu cam, chấm xuất huyết rải rác, mảng bầm tím, chảy máu niêm mạc | — |
| 2 | `phat_ban_xung_huyet` | Phát ban xung huyết da, ban dát sẩn hoặc ban hồi phục (Skin islands) | TT | phát ban, da xung huyết, ban hồi phục, skin islands, đảo trắng biển đỏ, ban dát sẩn, xung huyết da, ban hồi phục ngứa | — |

### 7. Cận lâm sàng (Huyết học, Sinh hóa, Vi sinh, CĐHA) (`can-lam-sang.json` — 6 mục)

| STT | Mã ID chuẩn | Tên triệu chứng lâm sàng | Loại | Từ khóa & Biến thể / Aliases | Ngưỡng tự suy |
|:---:|:---|:---|:---:|:---|:---:|
| 1 | `tc_co_dac_mau_hct_tang_tren_20_phan_tram` | Cô đặc máu (Hematocrit tăng ≥ 20% so với giá trị nền hoặc Hct > 45%) | CLS | cô đặc máu, hct tăng, hematocrit tăng, hct tang cao, thoát huyết tương, hct tăng dốc đứng, hct > 45%, máu cô đặc | `lHct ≥ 42` |
| 2 | `tc_giam_tieu_cau_duoi_100_g_l` | Tiểu cầu giảm sâu dốc đứng < 100 G/L | CLS | tiểu cầu giảm, giảm tiểu cầu, plt tụt, plt < 100, thrombocytopenia, tiểu cầu tụt dốc, tiểu cầu < 100, tiểu cầu giảm dốc đứng | `lTC ≤ 100` |
| 3 | `tc_xet_nghiem_ns1_hoac_pcr_duong_tinh` | Xét nghiệm Dengue NS1 Ag (+) hoặc RT-PCR (+) | CLS | ns1, pcr dengue, kháng nguyên ns1, ns1 duong tinh, ns1 ag (+), dengue rna (+), xét nghiệm ns1, test nhanh ns1 (+) | — |
| 4 | `tran_dich_mang_phoi_mang_bung` | Tràn dịch màng phổi, tràn dịch màng bụng, phù nề thành túi mật trên siêu âm/X-quang | CLS, TT | tràn dịch màng phổi, tràn dịch màng bụng, cổ trướng, thoát huyết tương, phù nề thành túi mật, dịch màng phổi, dịch tự do ổ bụng, dày thành túi mật | — |
| 5 | `men_gan_tang` | Men gan AST/ALT tăng cao (≥ 2 lần giới hạn bình thường) | CLS | men gan tăng, ast tăng, alt tăng, tổn thương gan, transaminase, men gan cao, ast/alt tăng, tăng transaminase | `lAST ≥ 80` |
| 6 | `men_gan_ast_alt_tang_tren_1000` | Tổn thương gan nặng / Suy gan cấp (AST hoặc ALT ≥ 1000 U/L) | CLS | ast ≥ 1000, alt ≥ 1000, suy gan cấp, tổn thương gan nặng, men gan ≥ 1000, suy gan cấp do dengue, hoại tử tế bào gan nặng | `lAST ≥ 1000` |

### 8. Hệ Tiết niệu & Chức năng thận (`tiet-nieu.json` — 1 mục)

| STT | Mã ID chuẩn | Tên triệu chứng lâm sàng | Loại | Từ khóa & Biến thể / Aliases | Ngưỡng tự suy |
|:---:|:---|:---|:---:|:---|:---:|
| 1 | `tieu_it` | Tiểu ít (Lượng nước tiểu < 0.5 mL/kg/giờ trong 6 giờ) | CN, TT | tiểu ít, vô niệu, thiểu niệu, bài niệu giảm, oliguria, không tiểu trên 6 giờ, lượng nước tiểu giảm, giảm bài niệu | — |

### 9. Hệ Nội tiết & Chuyển hóa (`noi-tiet.json` — 0 mục)

*Hiện chưa có triệu chứng nào trong phân nhóm này. Sẽ được bổ sung khi nạp các bệnh lý liên quan.*

### 10. Huyết học & Đông máu (`huyet-hoc.json` — 0 mục)

*Hiện chưa có triệu chứng nào trong phân nhóm này. Sẽ được bổ sung khi nạp các bệnh lý liên quan.*

### 11. Sản phụ khoa (`san-phu-khoa.json` — 0 mục)

*Hiện chưa có triệu chứng nào trong phân nhóm này. Sẽ được bổ sung khi nạp các bệnh lý liên quan.*

### 12. Tiền căn & Yếu tố nguy cơ nền (`tien-can.json` — 1 mục)

| STT | Mã ID chuẩn | Tên triệu chứng lâm sàng | Loại | Từ khóa & Biến thể / Aliases | Ngưỡng tự suy |
|:---:|:---|:---|:---:|:---|:---:|
| 1 | `tien_can_song_o_dich_luu_hanh` | Sống trong hoặc có lui tới vùng ổ dịch sốt xuất huyết lưu hành | TC, DTH | vùng dịch, ổ dịch, dịch tễ địa phương, muỗi vằn đốt, yếu tố dịch tễ, vùng dịch lưu hành, người xung quanh mắc sxh | — |

---
*Tài liệu tự động tạo bởi: `tools/scripts/bundle-symptoms.mjs` — CliniPortal Knowledge Engineering Squad.*
