# 📘 CLINIPORTAL — DANH MỤC TỪ VỰNG LÂM SÀNG CHUẨN (MASTER SYMPTOM DICTIONARY)

> **Phiên bản**: v5.0 | **Ngày cập nhật**: 2026-10-11 | **Tổng số triệu chứng chuẩn**: 41
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

### 1. Toàn thân & Sinh hiệu chung (`toan-than.json` — 5 mục)

| STT | Mã ID chuẩn | Tên triệu chứng lâm sàng | Loại | Từ khóa & Biến thể / Aliases | Ngưỡng tự suy |
|:---:|:---|:---|:---:|:---|:---:|
| 1 | `tc_sot_cao_dot_ngot_duoi_7_ngay` | Sốt cao đột ngột liên tục ≤ 7 ngày | CN, TT | sốt cao, sốt đột ngột, sốt liên tục, sốt dengue, sot duoi 7 ngay, sốt cao liên tục, sốt cấp tính, sốt khó hạ | `vNhiet >= 38.5` |
| 2 | `dau_co` | Nhức mỏi cơ, đau nhức khớp và mình mẩy | CN | đau cơ, đau khớp, nhức mỏi, myalgia, arthralgia, đau mình mẩy, nhức mỏi toàn thân, đau nhức xương khớp | — |
| 3 | `nhuc_hai_ho_mat` | Đau nhức hai hốc mắt (Retro-orbital pain) | CN | đau hốc mắt, nhức hốc mắt, retro-orbital pain, đau sau hốc mắt, nhức mắt khi liếc | — |
| 4 | `chan_an_met_moi` | Chán ăn, mệt mỏi, ủ rũ, chán uống | CN | chán ăn, mệt mỏi, ủ rũ, anorexia, fatigue, ăn uống kém, mệt lả, ăn không ngon | — |
| 5 | `sot_giam_kem_met_la` | Hết sốt hoặc giảm sốt nhưng mệt mỏi bứt rứt hơn (Dấu hiệu cảnh báo) | CN, TT | hết sốt mệt lả, giảm sốt nặng lên, dấu hiệu cảnh báo, hạ sốt nhưng mệt hơn, hết sốt bứt rứt, mệt lả khi hạ sốt | — |

### 2. Hệ Tim mạch & Huyết động (`tim-mach.json` — 3 mục)

| STT | Mã ID chuẩn | Tên triệu chứng lâm sàng | Loại | Từ khóa & Biến thể / Aliases | Ngưỡng tự suy |
|:---:|:---|:---|:---:|:---|:---:|
| 1 | `tc_soc_mach_nhanh_ha_kep_hoac_tut` | Sốc giảm thể tích (Mạch nhanh nhỏ, HA kẹp ≤ 20 mmHg hoặc Tụt huyết áp) | TT | sốc, huyết áp kẹp, tụt huyết áp, mạch nhanh nhỏ, ha kep, dss, sốc sốt xuất huyết, suy tuần hoàn cấp | `vHATT <= 90` |
| 2 | `chi_lanh_crt_keo_dai` | Đầu chi lạnh, ẩm, thời gian đổ đầy mao mạch CRT ≥ 2s | TT | chi lạnh, crt kéo dài, đầu chi lạnh ẩm, tưới máu kém, tay chân lạnh, chi mát ẩm, crt >= 2s | — |
| 3 | `viem_co_tim_suy_tim_dengue` | Viêm cơ tim, suy tim do Dengue (Tim nhanh, men tim Troponin I tăng) | TT, CLS | viêm cơ tim, suy tim, troponin tăng, myocarditis, tổn thương cơ tim do dengue, sốc tim do dengue | `lTrop >= 14` |

### 3. Hệ Hô hấp & Lồng ngực (`ho-hap.json` — 3 mục)

| STT | Mã ID chuẩn | Tên triệu chứng lâm sàng | Loại | Từ khóa & Biến thể / Aliases | Ngưỡng tự suy |
|:---:|:---|:---|:---:|:---|:---:|
| 1 | `tran_dich_mang_phoi_kho_tho` | Tràn dịch màng phổi gây khó thở, SpO₂ giảm | CN, TT, CLS | tràn dịch màng phổi, khó thở, spo2 giảm, pleural effusion, mờ phế trường, hội chứng 3 giảm đáy phổi, dịch màng phổi | `vSpo2 <= 94` |
| 2 | `tho_nhanh_rut_lom_long_nguc` | Thở nhanh, rút lõm lồng ngực (Suy hô hấp) | TT | thở nhanh, rút lõm ngực, tần số thở tăng, tachypnea, thở co kéo, thở gấp, suy hô hấp cấp | `vTho >= 24` |
| 3 | `phu_phoi_cap_do_qua_tai_dich` | Phù phổi cấp do quá tải dịch truyền (Khó thở, trào bọt hồng, ran ẩm nổ) | TT, CLS | phù phổi cấp, quá tải dịch, bọt hồng, ran ẩm, suy hô hấp do quá tải, phù phổi do truyền dịch | — |

### 4. Hệ Tiêu hóa, Gan mật & Ổ bụng (`tieu-hoa.json` — 5 mục)

| STT | Mã ID chuẩn | Tên triệu chứng lâm sàng | Loại | Từ khóa & Biến thể / Aliases | Ngưỡng tự suy |
|:---:|:---|:---|:---:|:---|:---:|
| 1 | `buon_non_non` | Buồn nôn và nôn ói | CN | buồn nôn, nôn ói, nausea, vomiting, mửa, chán ăn nôn ói, hay nôn | — |
| 2 | `dau_hieu_canh_bao_dau_bung_gan_non_oi` | Đau tức vùng gan (Hạ sườn phải) hoặc nôn ói liên tục | CN, TT | đau bụng gan, đau hạ sườn phải, nôn ói nhiều, dấu hiệu cảnh báo, đau HSP liên tục, nôn ói >= 3 lần/1h, nôn ói >= 4 lần/6h, nôn ói nhiều | — |
| 3 | `gan_to_duoi_bo_suon` | Gan to > 2cm dưới bờ sườn kèm ấn đau tức | TT | gan to, bờ sườn, gan mấp mé, ấn đau vùng gan, hepatomegaly, gan to quá bờ sườn, gan lớn đau, gan to > 2cm | — |
| 4 | `non_ra_mau_phan_den` | Xuất huyết tiêu hóa: Nôn ra máu / Đi cầu phân đen | CN, TT | nôn ra máu, tiêu phân đen, hematemesis, melena, xuất huyết tiêu hóa, đi tiêu phân đen hắc ín, ó ra máu đốm đen, xuất huyết tiêu hóa trên | — |
| 5 | `tran_dich_mang_bung` | Bụng chướng, tràn dịch màng bụng (Cổ trướng/Ascites) | TT, CLS | tràn dịch màng bụng, bụng chướng, cổ trướng, ascites, dịch ổ bụng, bụng báng, bụng to ra | — |

### 5. Hệ Thần kinh & Ý thức (`than-kinh.json` — 3 mục)

| STT | Mã ID chuẩn | Tên triệu chứng lâm sàng | Loại | Từ khóa & Biến thể / Aliases | Ngưỡng tự suy |
|:---:|:---|:---|:---:|:---|:---:|
| 1 | `dau_dau` | Đau đầu dữ dội vùng trán và thái dương | CN | đau đầu, nhức đầu, headache, đau nhức đầu, nhức đầu dữ dội, đau trán thái dương | — |
| 2 | `lu_du_vat_va_li_bi` | Vật vã, lừ đừ, li bì (Dấu hiệu cảnh báo thần kinh) | CN, TT | lừ đừ, vật vã, li bì, thay đổi tri giác, bứt rứt, tri giác lừ đừ, vật vã bứt rứt, li bì khó thức tỉnh | — |
| 3 | `sxhd_the_nao_roi_loan_tri_giac` | SXHD thể não: Rối loạn tri giác, co giật hoặc hôn mê | CN, TT | sxh thể não, rối loạn tri giác, co giật, hôn mê, viêm não do dengue, bệnh não dengue, hôn mê co giật | — |

### 6. Da niêm & Dị ứng lâm sàng (`da-niem.json` — 3 mục)

| STT | Mã ID chuẩn | Tên triệu chứng lâm sàng | Loại | Từ khóa & Biến thể / Aliases | Ngưỡng tự suy |
|:---:|:---|:---|:---:|:---|:---:|
| 1 | `tc_xuat_huyet_da_niem_lacet_duong_tinh` | Xuất huyết dưới da, niêm mạc hoặc Nghiệm pháp dây thắt (Lacet) (+) | TT | chấm xuất huyết, lacet dương tính, chảy máu chân răng, chảy máu cam, petechiae, chấm xuất huyết rải rác, mảng bầm tím, chảy máu niêm mạc mũi miệng | — |
| 2 | `phat_ban_xung_huyet` | Phát ban xung huyết da, ban hồi phục (Skin islands in sea of red) | TT | phát ban, da xung huyết, ban hồi phục, đảo trắng biển đỏ, ban dát sẩn hồi phục, xung huyết da, ban ngứa hồi phục | — |
| 3 | `xuat_huyet_niem_mac_rang_mui_am_dao` | Xuất huyết niêm mạc: Chảy máu chân răng, chảy máu mũi, xuất huyết âm đạo | CN, TT | chảy máu chân răng, chảy máu cam, epistaxis, xuất huyết âm đạo, chảy máu nướu răng, chảy máu mũi nặng, rong kinh do dengue | — |

### 7. Cận lâm sàng (Huyết học, Sinh hóa, Vi sinh, CĐHA) (`can-lam-sang.json` — 10 mục)

| STT | Mã ID chuẩn | Tên triệu chứng lâm sàng | Loại | Từ khóa & Biến thể / Aliases | Ngưỡng tự suy |
|:---:|:---|:---|:---:|:---|:---:|
| 1 | `tc_co_dac_mau_hct_tang_tren_20_phan_tram` | Cô đặc máu (Hematocrit tăng ≥ 20% so với trị số ban đầu hoặc Hct > 45%) | CLS | cô đặc máu, hct tăng, hematocrit tăng, thoát huyết tương, hct tăng dốc đứng, hct > 45%, máu cô đặc, hemoconcentration | `lHct >= 45` |
| 2 | `tc_giam_tieu_cau_duoi_100_g_l` | Tiểu cầu giảm sâu dốc đứng < 100 G/L (< 100.000/mm³) | CLS | tiểu cầu giảm, giảm tiểu cầu, plt tụt, plt < 100, thrombocytopenia, tiểu cầu tụt dốc, tiểu cầu < 100 G/L, thrombocytopenia dốc đứng | `lTC <= 100` |
| 3 | `bach_cau_giam` | Bạch cầu máu giảm (< 4.0 G/L) | CLS | bạch cầu giảm, wbc giảm, leukopenia, giảm bạch cầu, bạch cầu tụt | `lBC <= 4` |
| 4 | `tc_xet_nghiem_ns1_hoac_pcr_duong_tinh` | Kháng nguyên NS1 hoặc RT-PCR Dengue RNA dương tính | CLS | ns1, pcr dengue, kháng nguyên ns1, ns1 duong tinh, rt-pcr, ns1 ag (+), dengue rna (+), test nhanh ns1 (+) | — |
| 5 | `khang_the_dengue_igm_igg_duong_tinh` | Kháng thể Dengue IgM hoặc IgG dương tính (ELISA / Test nhanh từ N5) | CLS | dengue igm, dengue igg, test nhanh igm, elisa dengue, igm dương tính, igg dương tính, huyết thanh chẩn đoán dengue | — |
| 6 | `men_gan_ast_alt_tang_cao` | Men gan AST / ALT tăng (≥ 400 U/L) | CLS | ast >= 400, alt >= 400, men gan tăng, tổn thương gan, transaminase tăng, men gan > 400 U/L | `lAST >= 400` |
| 7 | `men_gan_ast_alt_tang_tren_1000` | Tổn thương gan nặng / Suy gan cấp (AST hoặc ALT ≥ 1000 U/L) | CLS | ast >= 1000, alt >= 1000, suy gan cấp, tổn thương gan nặng, men gan >= 1000, hoại tử tế bào gan nặng, transaminase tăng cực cao | `lAST >= 1000` |
| 8 | `tran_dich_mang_phoi_mang_bung` | Tràn dịch màng phổi, tràn dịch màng bụng trên siêu âm/X-quang | CLS, TT | tràn dịch màng phổi, tràn dịch màng bụng, phù nề thành túi mật, dịch màng phổi, dày thành túi mật, pleural effusion | — |
| 9 | `day_thanh_tui_mat_tren_sieu_am` | Thành túi mật dày > 3mm trên siêu âm ổ bụng | CLS | dày thành túi mật, siêu âm túi mật, gallbladder wall thickening, phù nề thành túi mật, vách túi mật dày | — |
| 10 | `bach_cau_tang_uu_the_neu_o_nhiem_trung_mu` | Bạch cầu máu tăng cao ưu thế đa nhân trung tính có ổ nhiễm khuẩn mủ (Triệu chứng loại trừ SXHD) | CLS | bạch cầu tăng, neu tăng cao, nhiễm trùng mủ, leukocytosis, wbc tăng cao, neu > 80% có mủ | `lBC >= 15` |

### 8. Hệ Tiết niệu & Chức năng thận (`tiet-nieu.json` — 3 mục)

| STT | Mã ID chuẩn | Tên triệu chứng lâm sàng | Loại | Từ khóa & Biến thể / Aliases | Ngưỡng tự suy |
|:---:|:---|:---|:---:|:---|:---:|
| 1 | `tieu_it` | Tiểu ít (< 0.5 mL/kg/h trong > 6 giờ liên tục) | CN, TT | tiểu ít, thiểu niệu, oliguria, giảm nước tiểu, không tiểu trên 6 giờ, lượng nước tiểu giảm, thiểu niệu do thiếu dịch | — |
| 2 | `tieu_mau` | Tiểu ra máu (Đại thể hoặc vi thể) | CN, CLS | tiểu máu, tiểu ra máu, hematuria, nước tiểu đỏ, hồng cầu trong nước tiểu | — |
| 3 | `ton_thuong_than_cap` | Tổn thương thận cấp (Creatinine máu tăng ≥ 1.5 - 2 lần trị số bình thường) | CLS | creatinine tăng, suy thận cấp, tổn thương thận cấp, aki, creatinine máu tăng, suy chức năng thận | `lCre >= 130` |

### 9. Hệ Nội tiết & Chuyển hóa (`noi-tiet.json` — 0 mục)

*Hiện chưa có triệu chứng nào trong phân nhóm này. Sẽ được bổ sung khi nạp các bệnh lý liên quan.*

### 10. Huyết học & Đông máu (`huyet-hoc.json` — 2 mục)

| STT | Mã ID chuẩn | Tên triệu chứng lâm sàng | Loại | Từ khóa & Biến thể / Aliases | Ngưỡng tự suy |
|:---:|:---|:---|:---:|:---|:---:|
| 1 | `roi_loan_dong_mau_apt_p_t_inr` | Rối loạn đông máu (aPTT kéo dài, Fibrinogen giảm, INR > 1.5) | CLS | rối loạn đông máu, aptt kéo dài, inr tăng, fibrinogen giảm, đông máu bất thường, inr > 1.5, thiếu hụt yếu tố đông máu | — |
| 2 | `thieu_mau_cap_do_xuat_huyet_nang` | Thiếu máu cấp do xuất huyết nặng (Hb / Hct tụt dốc nhanh) | CLS, TT | thiếu máu cấp, hct tụt, hb giảm, mất máu cấp, da niêm nhợt, hct tụt đột ngột, thiếu máu mất máu | — |

### 11. Sản phụ khoa (`san-phu-khoa.json` — 1 mục)

| STT | Mã ID chuẩn | Tên triệu chứng lâm sàng | Loại | Từ khóa & Biến thể / Aliases | Ngưỡng tự suy |
|:---:|:---|:---|:---:|:---|:---:|
| 1 | `xuat_huyet_am_dao_phu_nu_mang_thai` | Xuất huyết âm đạo / Nguy cơ dọa sảy thai, sinh non ở phụ nữ mang thai mắc Dengue | CN, TT | xuất huyết âm đạo, thai kỳ, sảy thai, sinh non, dengue thai kỳ, ra máu âm đạo khi mang thai, sốt xuất huyết ở phụ nữ mang thai | — |

### 12. Tiền căn & Yếu tố nguy cơ nền (`tien-can.json` — 3 mục)

| STT | Mã ID chuẩn | Tên triệu chứng lâm sàng | Loại | Từ khóa & Biến thể / Aliases | Ngưỡng tự suy |
|:---:|:---|:---|:---:|:---|:---:|
| 1 | `tien_can_song_o_dich_luu_hanh` | Sống trong hoặc có lui tới vùng ổ dịch sốt xuất huyết lưu hành trong vòng 14 ngày | TC, DTH | vùng dịch, ổ dịch, dịch tễ địa phương, nguồn lây, muỗi vằn đốt, yếu tố dịch tễ sxh, vùng dịch lưu hành, người xung quanh mắc sxh | — |
| 2 | `tien_can_nhiem_dengue_thu_phat` | Tiền căn đã nhiễm vi rút Dengue trước đó (Nhiễm thứ phát tăng nguy cơ SXHD nặng) | TC | nhiễm thứ phát, dengue thứ phát, secondary dengue, đã từng bị sxh, nhiễm dengue lần 2 | — |
| 3 | `co_dia_nguy_co_cao_sxhd` | Cơ địa nguy cơ tiến triển nặng: Trẻ nhũ nhi, béo phì, phụ nữ mang thai, người cao tuổi, bệnh gan/thận mạn | TC | cơ địa béo phì, phụ nữ có thai, người cao tuổi, bệnh gan nền, nhũ nhi, béo phì, bệnh nền mạn tính, thai phụ mắc sxh | — |

---
*Tài liệu tự động tạo bởi: `tools/scripts/bundle-symptoms.mjs` — CliniPortal Knowledge Engineering Squad.*
