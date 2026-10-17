# 📘 CLINIPORTAL — DANH MỤC TỪ VỰNG LÂM SÀNG CHUẨN (MASTER SYMPTOM DICTIONARY)

> **Phiên bản**: v5.0 | **Ngày cập nhật**: 2026-10-17 | **Tổng số triệu chứng chuẩn**: 116
> **Vị trí lưu trữ**: `src/content/docspace/data/DOCSPACE_MASTER_SYMPTOM_DICTIONARY.md`
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

### 1. Toàn thân & Sinh hiệu chung (`toan-than.json` — 12 mục)

| STT | Mã ID chuẩn | Tên triệu chứng lâm sàng | Loại | Từ khóa & Biến thể / Aliases | Ngưỡng tự suy |
|:---:|:---|:---|:---:|:---|:---:|
| 1 | `tc_sot_cao_dot_ngot_duoi_7_ngay` | Sốt cao đột ngột liên tục ≤ 7 ngày | CN, TT | sốt cao, sốt đột ngột, sốt liên tục, sốt dengue, sot duoi 7 ngay, sốt cao liên tục, sốt cấp tính, sốt khó hạ | `vNhiet >= 38.5` |
| 2 | `dau_co` | Nhức mỏi cơ, đau nhức khớp và mình mẩy | CN | đau cơ, đau khớp, nhức mỏi, myalgia, arthralgia, đau mình mẩy, nhức mỏi toàn thân, đau nhức xương khớp | — |
| 3 | `nhuc_hai_ho_mat` | Đau nhức hai hốc mắt (Retro-orbital pain) | CN | đau hốc mắt, nhức hốc mắt, retro-orbital pain, đau sau hốc mắt, nhức mắt khi liếc | — |
| 4 | `chan_an_met_moi` | Chán ăn, mệt mỏi, ủ rũ, chán uống | CN | chán ăn, mệt mỏi, ủ rũ, anorexia, fatigue, ăn uống kém, mệt lả, ăn không ngon | — |
| 5 | `sot_giam_kem_met_la` | Hết sốt hoặc giảm sốt nhưng mệt mỏi bứt rứt hơn (Dấu hiệu cảnh báo) | CN, TT | hết sốt mệt lả, giảm sốt nặng lên, hết sốt bứt rứt, hạ sốt nhưng mệt hơn, hết sốt bứt rứt, mệt lả khi hạ sốt | — |
| 6 | `met_moi` | Mệt mỏi kéo dài, uể oải, suy nhược | CN | mệt mỏi kéo dài, uể oải suy nhược, fatigue chronic, mệt rũ, người không có sức, suy nhược cơ thể kéo dài | — |
| 7 | `phu_hai_chan` | Phù mềm hai chi dưới, ấn lõm không đau | TT | phù chân, phù hai chân, phù mắt cá, phù mềm ấn lõm, lower extremity edema, phù mu chân, phù cẳng chân, sưng phù 2 chân | — |
| 8 | `vu_to_nam_gioi_gynecomastia` | Nữ hóa tuyến vú ở nam giới (Gynecomastia) | TT | vú to nam giới, gynecomastia, tuyến vú phát triển ở nam, nữ hóa tuyến vú, vú to ở đàn ông | — |
| 9 | `sot` | Sốt (Thân nhiệt ≥ 38.0°C) | CN, TT | sốt, nhiệt độ tăng, nóng sốt, thân nhiệt cao, fever, pyrexia, sốt nhẹ đến vừa, nóng mình | `vNhiet >= 38` |
| 10 | `sot_cao` | Sốt cao (Thân nhiệt ≥ 39.0°C) | CN, TT | sốt cao, sốt dữ dội, thân nhiệt >= 39, high fever, sốt cao liên tục, sốt 39-40 độ, sốt khó hạ | `vNhiet >= 39` |
| 11 | `sot_cao_ret_run` | Sốt cao rét run | CN, TT | sốt rét run, rét run, ớn lạnh, chills, rigors, sốt run cầm cập, lên cơn rét run | — |
| 12 | `sot_nhe_giai_doan_khoi_phat` | Sốt nhẹ khởi phát (Thân nhiệt 37.5 - 38.0°C) | CN, TT | sốt nhẹ, hâm hấp sốt, low grade fever, sốt âm ỉ, người âm ấm | `vNhiet >= 37.5` |

### 2. Hệ Tim mạch & Huyết động (`tim-mach.json` — 9 mục)

| STT | Mã ID chuẩn | Tên triệu chứng lâm sàng | Loại | Từ khóa & Biến thể / Aliases | Ngưỡng tự suy |
|:---:|:---|:---|:---:|:---|:---:|
| 1 | `tc_soc_mach_nhanh_ha_kep_hoac_tut` | Sốc giảm thể tích (Mạch nhanh nhỏ, HA kẹp ≤ 20 mmHg hoặc Tụt huyết áp) | TT | sốc, huyết áp kẹp, tụt huyết áp, mạch nhanh nhỏ, ha kep, dss, sốc sốt xuất huyết, suy tuần hoàn cấp | `vHATT <= 90` |
| 2 | `chi_lanh_crt_keo_dai` | Đầu chi lạnh, ẩm, thời gian đổ đầy mao mạch CRT ≥ 2s | TT | chi lạnh, crt kéo dài, đầu chi lạnh ẩm, tưới máu kém, tay chân lạnh, chi mát ẩm, crt >= 2s | — |
| 3 | `viem_co_tim_suy_tim_dengue` | Viêm cơ tim, suy tim do Dengue (Tim nhanh, men tim Troponin I tăng) | TT, CLS | viêm cơ tim, suy tim, troponin tăng, myocarditis, tổn thương cơ tim do dengue, sốc tim do dengue | `lTrop >= 14` |
| 4 | `tuan_hoan_bang_he_cua_chu` | Tuần hoàn bàng hệ kiểu gánh - chủ (Cửa - chủ) quanh rốn | TT | tuần hoàn bàng hệ, bàng hệ cửa chủ, caput medusae, tĩnh mạch nổi quanh rốn, tuần hoàn gánh chủ, đầu sứa quanh rốn | — |
| 5 | `mach_nhanh` | Mạch nhanh (Nhịp tim > 90 lần/phút) | TT | mạch nhanh, nhịp tim nhanh, tachycardia, tim đập nhanh, mạch quay nhanh | `vMach > 90` |
| 6 | `mach_rat_nhanh` | Mạch rất nhanh (Nhịp tim > 120 lần/phút) | TT | mạch rất nhanh, nhịp tim rất nhanh, severe tachycardia, mạch nhanh nhỏ, nhịp tim dồn dập | `vMach > 120` |
| 7 | `tut_huyet_ap` | Tụt huyết áp (HATT < 90 mmHg) | TT | tụt huyết áp, huyết áp tụt, hypotension, ha tụt, huyết áp thấp cấp tính | `vHATT < 90` |
| 8 | `ha_huyet_ap` | Hạ huyết áp (HATT ≤ 100 mmHg) | TT | hạ huyết áp, huyết áp giảm, low blood pressure, huyết áp thấp, hatt <= 100 | `vHATT <= 100` |
| 9 | `huyet_ap_kep` | Huyết áp kẹp (Hiệu áp ≤ 20 mmHg) | TT | huyết áp kẹp, ha kẹp, narrow pulse pressure, hiệu áp kẹp, khoảng cách ha <= 20 | — |

### 3. Hệ Hô hấp & Lồng ngực (`ho-hap.json` — 12 mục)

| STT | Mã ID chuẩn | Tên triệu chứng lâm sàng | Loại | Từ khóa & Biến thể / Aliases | Ngưỡng tự suy |
|:---:|:---|:---|:---:|:---|:---:|
| 1 | `tran_dich_mang_phoi_kho_tho` | Tràn dịch màng phổi gây khó thở, SpO₂ giảm | CN, TT, CLS | tràn dịch màng phổi, khó thở, spo2 giảm, pleural effusion, mờ phế trường, hội chứng 3 giảm đáy phổi, dịch màng phổi | `vSpo2 <= 94` |
| 2 | `tho_nhanh_rut_lom_long_nguc` | Thở nhanh, rút lõm lồng ngực (Suy hô hấp) | TT | thở nhanh, rút lõm ngực, tần số thở tăng, tachypnea, thở co kéo, thở gấp, suy hô hấp cấp | `vTho >= 24` |
| 3 | `phu_phoi_cap_do_qua_tai_dich` | Phù phổi cấp do quá tải dịch truyền (Khó thở, trào bọt hồng, ran ẩm nổ) | TT, CLS | phù phổi cấp, quá tải dịch, bọt hồng, ran ẩm, suy hô hấp do quá tải, phù phổi do truyền dịch | — |
| 4 | `kho_tho` | Khó thở khi nằm hoặc khi gắng sức | CN | khó thở khi nằm, khó thở gắng sức, hụt hơi khó thở, dyspnea on exertion, thở mệt, khó thở về đêm, thở hụt hơi | — |
| 5 | `spo2_giam` | Độ bão hòa oxy máu giảm SpO₂ < 95% khi thở khí phòng | TT, CLS | spo2 tụt, giảm oxy máu, hypoxemia, oxy máu thấp, độ bão hòa oxy giảm, spo2 dưới 95% | `vSpo2 < 95` |
| 6 | `tho_nhanh` | Thở nhanh (Nhịp thở > 20 lần/phút) | TT | thở nhanh, nhịp thở tăng, tachypnea, thở gấp, nhịp thở nhanh | `vTho > 20` |
| 7 | `tho_nhanh_nang` | Thở rất nhanh (Nhịp thở ≥ 30 lần/phút) | TT | thở rất nhanh, thở co kéo, severe tachypnea, thở hổn hển, thở dốc | `vTho >= 30` |
| 8 | `tho_cham` | Thở chậm (Nhịp thở < 10 lần/phút) | TT | thở chậm, ức chế hô hấp, bradypnea, nhịp thở yếu, thở ngáp | `vTho < 10` |
| 9 | `kho_tho_khi_nam` | Khó thở khi nằm đầu bằng (Orthopnea) | CN, TT | khó thở khi nằm, orthopnea, phải ngồi thở, ngồi dậy mới thở được, khó thở kịch phát về đêm | — |
| 10 | `ran_o_phoi` | Ran ẩm hoặc ran nổ ở phổi | TT | ran phổi, ran ẩm, ran nổ, crackles, rales, nghe phổi có ran, ran ứ đọng | — |
| 11 | `giam_spo2` | Giảm SpO₂ máu (< 95%) | TT | giảm spo2, tụt oxy máu, hypoxemia, độ bão hòa oxy giảm, spo2 dưới 95 | `vSpo2 < 95` |
| 12 | `suy_ho_hap_spo2_thap` | Suy hô hấp cấp (SpO₂ < 90%) | TT | suy hô hấp, spo2 tụt sâu, severe hypoxemia, suy hô hấp cấp tính, tím tái do thiếu oxy | `vSpo2 < 90` |

### 4. Hệ Tiêu hóa, Gan mật & Ổ bụng (`tieu-hoa.json` — 12 mục)

| STT | Mã ID chuẩn | Tên triệu chứng lâm sàng | Loại | Từ khóa & Biến thể / Aliases | Ngưỡng tự suy |
|:---:|:---|:---|:---:|:---|:---:|
| 1 | `buon_non_non` | Buồn nôn và nôn ói | CN | buồn nôn, nôn ói, nausea, vomiting, mửa, chán ăn nôn ói, hay nôn | — |
| 2 | `tc_dau_hieu_canh_bao_dau_bung_gan_non_oi` | Đau tức vùng gan (Hạ sườn phải) hoặc nôn ói liên tục | CN, TT | đau bụng gan, đau hạ sườn phải, nôn ói nhiều, dấu hiệu cảnh báo đau bụng, dau_hieu_canh_bao_dau_bung_gan_non_oi, đau HSP liên tục, nôn ói >= 3 lần/1h, nôn ói >= 4 lần/6h | — |
| 3 | `gan_to_dau` | Gan to > 2cm dưới bờ sườn kèm ấn đau tức | TT | gan to, bờ sườn, gan mấp mé, ấn đau vùng gan, hepatomegaly, gan_to_duoi_bo_suon, gan to quá bờ sườn, gan lớn đau | — |
| 4 | `non_ra_mau_phan_den` | Xuất huyết tiêu hóa: Nôn ra máu / Đi cầu phân đen | CN, TT | nôn ra máu, tiêu phân đen, hematemesis, melena, xuất huyết tiêu hóa, đi tiêu phân đen hắc ín, ó ra máu đốm đen, xuất huyết tiêu hóa trên | — |
| 5 | `tran_dich_mang_bung` | Bụng chướng, tràn dịch màng bụng (Cổ trướng/Ascites) | TT, CLS | tràn dịch màng bụng, bụng chướng, cổ trướng, ascites, dịch ổ bụng, bụng báng, bụng to ra | — |
| 6 | `co_truong_bang_bung` | Cổ trướng / Báng bụng mức độ vừa đến nhiều | TT, CLS | báng bụng vừa nhiều, cổ trướng mức độ vừa, cổ trướng lượng nhiều, báng bụng căng, báng bụng tự do, cổ trướng tự do, dịch màng bụng tự do | — |
| 7 | `gan_nho_bo_sac_nhu_mo_tho` | Gan teo nhỏ, bờ sắc, bề mặt gồ ghề nhu mô thô trên siêu âm | TT, CLS | gan teo nhỏ, bờ sắc, nhu mô thô, gan gồ ghề, xơ teo gan, gan nhỏ bờ sắc, siêu âm gan thô gồ ghề | — |
| 8 | `dau_tuc_ha_suon_phai` | Đau tức / tức nặng hạ sườn phải âm ỉ | CN | tức hạ sườn phải, đau âm ỉ hạ sườn phải, right upper quadrant pain, nặng hạ sườn phải, tức hsp, đau tức hsp âm ỉ | — |
| 9 | `co_truong_dich_do_o_bung` | Cổ trướng hoặc tràn dịch tự do màng bụng | TT, CLS | cổ trướng, báng bụng, dịch ổ bụng, ascites, bụng to bè bè, dịch màng bụng tự do | — |
| 10 | `gan_to_duoi_bo_suon` | Gan to dưới bờ sườn | TT | gan to, hepatomegaly, bờ gan dưới bờ sườn, sờ thấy gan, gan phì đại | — |
| 11 | `phan_bac_mau` | Phân bạc màu (Phân màu đất sét / Cò cò) | CN | phân bạc màu, clay colored stool, acholic stool, phân trắng bệch, phân màu đất sét | — |
| 12 | `dau_hieu_canh_bao_dau_bung_gan_non_oi` | Đau bụng hạ sườn phải liên tục và nôn ói nhiều | CN | đau bụng gan, đau hạ sườn phải, nôn ói nhiều, đau tức vùng gan nôn ói, dấu hiệu cảnh báo đau bụng | — |

### 5. Hệ Thần kinh & Ý thức (`than-kinh.json` — 9 mục)

| STT | Mã ID chuẩn | Tên triệu chứng lâm sàng | Loại | Từ khóa & Biến thể / Aliases | Ngưỡng tự suy |
|:---:|:---|:---|:---:|:---|:---:|
| 1 | `dau_dau` | Đau đầu dữ dội vùng trán và thái dương | CN | đau đầu, nhức đầu, headache, đau nhức đầu, nhức đầu dữ dội, đau trán thái dương | — |
| 2 | `lu_du_vat_va_li_bi` | Vật vã, lừ đừ, li bì (Dấu hiệu cảnh báo thần kinh) | CN, TT | lừ đừ, vật vã, li bì, thay đổi tri giác, bứt rứt, tri giác lừ đừ, vật vã bứt rứt, li bì khó thức tỉnh | — |
| 3 | `sxhd_the_nao_roi_loan_tri_giac` | SXHD thể não: Rối loạn tri giác, co giật hoặc hôn mê | CN, TT | sxh thể não, rối loạn tri giác, co giật, hôn mê, viêm não do dengue, bệnh não dengue, hôn mê co giật | — |
| 4 | `benh_nao_gan_roi_loan_tri_giac` | Bệnh não gan / Hội chứng não gan (Lơ mơ, rối loạn tri giác, rung vẫy Asterixis) | TT, CN | bệnh não gan, hôn mê gan, hepatic encephalopathy, rung vẫy asterixis, flapping tremor, hội chứng não gan, lơ mơ do xơ gan, rối loạn ý thức do xơ gan | — |
| 5 | `cung_gay` | Cứng gáy hoặc cổ gượng (Nuchal rigidity) | TT | cứng gáy, cổ gượng, nuchal rigidity, kháng cự gấp cổ, dấu cứng gáy | — |
| 6 | `co_cung_gay_dau_mang_nao` | Dấu cứng gáy màng não (+) | TT | cứng gáy màng não, dấu màng não dương tính, cổ cứng đau, dấu kích thích màng não | — |
| 7 | `cung_gay_dieu_tri_mang_nao` | Dấu màng não (Cứng gáy, Kernig (+), Brudzinski (+)) | TT | dấu màng não, kernig, brudzinski, meningeal signs, hội chứng màng não, tam chứng màng não | — |
| 8 | `photophobia_so_anh_sang` | Sợ ánh sáng và sợ tiếng động (Photophobia) | CN | sợ ánh sáng, photophobia, chói mắt, không dám nhìn sáng, sợ tiếng động | — |
| 9 | `roi_loan_tri_giac` | Rối loạn tri giác (Lơ mơ, li bì, bứt rứt, GCS < 15) | TT | rối loạn tri giác, lơ mơ, li bì, gcs < 15, altered mental status, tri giác u ám, hôn mê, ý thức chậm chạp | — |

### 6. Da niêm & Dị ứng lâm sàng (`da-niem.json` — 10 mục)

| STT | Mã ID chuẩn | Tên triệu chứng lâm sàng | Loại | Từ khóa & Biến thể / Aliases | Ngưỡng tự suy |
|:---:|:---|:---|:---:|:---|:---:|
| 1 | `tc_xuat_huyet_da_niem_lacet_duong_tinh` | Xuất huyết dưới da, niêm mạc hoặc Nghiệm pháp dây thắt (Lacet) (+) | TT | chấm xuất huyết, lacet dương tính, petechiae, dây thắt dương tính, chấm xuất huyết rải rác, mảng bầm tím dưới da, xuất huyết dạng ban chấm, tourniquet test dương tính | — |
| 2 | `phat_ban_xung_huyet` | Phát ban xung huyết da, ban hồi phục (Skin islands in sea of red) | TT | phát ban, da xung huyết, ban hồi phục, đảo trắng biển đỏ, ban dát sẩn hồi phục, xung huyết da, ban ngứa hồi phục | — |
| 3 | `xuat_huyet_niem_mac_rang_mui_am_dao` | Xuất huyết niêm mạc: Chảy máu chân răng, chảy máu mũi, xuất huyết âm đạo | CN, TT | chảy máu chân răng, chảy máu cam, epistaxis, xuất huyết âm đạo, chảy máu nướu răng, chảy máu mũi nặng, rong kinh do dengue | — |
| 4 | `vang_da_vang_mat` | Vàng da, vàng kết mạc mắt (Jaundice / Scleral icterus) | TT | vàng da, vàng mắt, jaundice, icterus, vàng kết mạc mắt, da vàng ánh, mắt vàng, vàng da niêm | — |
| 5 | `sa_mach_long_ban_tay_son` | Lòng bàn tay son (Palmar erythema) | TT | lòng bàn tay son, palmar erythema, bàn tay son, đỏ mô cái mô út, ửng đỏ lòng bàn tay, gan bàn tay đỏ | — |
| 6 | `sao_mach_spider_nevi` | Dấu sao mạch (Spider angioma / Spider nevi) vùng ngực, cổ, vai | TT | sao mạch, spider nevi, spider angioma, sao mạch vùng ngực, u mạch mạng nhện, nốt sao mạch ngực cổ | — |
| 7 | `ngua_da_do_u_mat` | Ngứa da dai dẳng do ứ mật / tăng acid mật | CN | ngứa do ứ mật, ngứa da dai dẳng, pruritus cholestasis, ngứa tăng về đêm do gan, ngứa ứ mật, ngứa sẩn do bệnh gan | — |
| 8 | `xuat_huyet_da_niem` | Xuất huyết da niêm mạc | TT | xuất huyết da niêm, chảy máu dưới da, purpura, ecchymosis, chảy máu chân răng mũi, xuất huyết niêm mạc | — |
| 9 | `cham_xuat_huyet_duoi_da` | Chấm xuất huyết rải rác dưới da (Petechiae) | TT | chấm xuất huyết, petechiae, nốt xuất huyết, chấm đỏ không mất khi căng da, chấm xuất huyết cẳng tay cẳng chân | — |
| 10 | `ban_do_long_tay_palmar_erythema` | Lòng bàn tay son (Palmar erythema) | TT | lòng bàn tay son, palmar erythema, ban đỏ lòng bàn tay, gan bàn tay đỏ, bàn tay son xơ gan | — |

### 7. Cận lâm sàng (Huyết học, Sinh hóa, Vi sinh, CĐHA) (`can-lam-sang.json` — 36 mục)

| STT | Mã ID chuẩn | Tên triệu chứng lâm sàng | Loại | Từ khóa & Biến thể / Aliases | Ngưỡng tự suy |
|:---:|:---|:---|:---:|:---|:---:|
| 1 | `tc_co_dac_mau_hct_tang_tren_20_phan_tram` | Cô đặc máu (Hematocrit tăng ≥ 20% so với trị số ban đầu hoặc Hct > 45%) | CLS | cô đặc máu, hct tăng, hematocrit tăng, thoát huyết tương, hct tăng dốc đứng, hct > 45%, máu cô đặc, hemoconcentration | `lHct >= 45` |
| 2 | `tc_giam_tieu_cau_duoi_100_g_l` | Tiểu cầu giảm sâu dốc đứng < 100 G/L (< 100.000/mm³) | CLS | tiểu cầu giảm, giảm tiểu cầu, plt tụt, plt < 100, thrombocytopenia, tiểu cầu tụt dốc, tiểu cầu < 100 G/L, thrombocytopenia dốc đứng | `lTC <= 100` |
| 3 | `bach_cau_giam` | Bạch cầu máu giảm (< 4.0 G/L) | CLS | bạch cầu giảm, wbc giảm, leukopenia, giảm bạch cầu, bạch cầu tụt | `lBC <= 4` |
| 4 | `tc_xet_nghiem_ns1_hoac_pcr_duong_tinh` | Kháng nguyên NS1 hoặc RT-PCR Dengue RNA dương tính | CLS | ns1, pcr dengue, kháng nguyên ns1, ns1 duong tinh, rt-pcr, ns1 ag (+), dengue rna (+), test nhanh ns1 (+) | — |
| 5 | `khang_the_dengue_igm_igg_duong_tinh` | Kháng thể Dengue IgM hoặc IgG dương tính (ELISA / Test nhanh từ N5) | CLS | dengue igm, dengue igg, test nhanh igm, elisa dengue, igm dương tính, igg dương tính, huyết thanh chẩn đoán dengue | — |
| 6 | `men_gan_ast_alt_tang_cao` | Men gan AST / ALT tăng (≥ 400 U/L) | CLS | ast >= 400, alt >= 400, men gan tăng, tổn thương gan, transaminase tăng, men gan > 400 U/L | `lAST >= 400` |
| 7 | `men_gan_ast_alt_tang_tren_1000` | Tổn thương gan nặng / Suy gan cấp (AST hoặc ALT ≥ 1000 U/L) | CLS | ast >= 1000, alt >= 1000, suy gan cấp, tổn thương gan nặng, men gan >= 1000, hoại tử tế bào gan nặng, transaminase tăng cực cao | `lAST >= 1000` |
| 8 | `tran_dich_mang_phoi_mang_bung` | Tràn dịch màng phổi, tràn dịch màng bụng trên siêu âm/X-quang | CLS, TT | thoát huyết tương trên hình ảnh, dịch đa màng, siêu âm có dịch màng bụng và màng phổi, dịch tự do ổ bụng và màng phổi, bằng chứng thoát dịch siêu âm x-quang, dịch màng bụng màng phổi phối hợp, plasma leakage trên cđha | — |
| 9 | `day_thanh_tui_mat_tren_sieu_am` | Thành túi mật dày > 3mm trên siêu âm ổ bụng | CLS | dày thành túi mật, siêu âm túi mật, gallbladder wall thickening, phù nề thành túi mật, vách túi mật dày | — |
| 10 | `bach_cau_tang_uu_the_neu_o_nhiem_trung_mu` | Bạch cầu máu tăng cao ưu thế đa nhân trung tính có ổ nhiễm khuẩn mủ (Triệu chứng loại trừ SXHD) | CLS | bạch cầu tăng, neu tăng cao, nhiễm trùng mủ, leukocytosis, wbc tăng cao, neu > 80% có mủ | `lBC >= 15` |
| 11 | `tc_do_dan_hoi_gan_fibroscan` | Độ đàn hồi nhu mô gan FibroScan (E ≥ 12.5 kPa hoặc TE tương đương F4) | CLS | fibroscan >= 12.5, độ đàn hồi gan f4, transient elastography f4, đo fibroscan xơ gan, fibroscan gợi ý f4, e >= 12.5 kpa | — |
| 12 | `do_dan_hoi_gan_fibroscan_f2_f4` | Đo độ đàn hồi gan FibroScan chỉ điểm xơ hóa gan F2 - F4 | CLS | fibroscan f2 f4, xơ hóa f2 đến f4, độ đàn hồi gan tiến triển, fibroscan trên 7 kpa, xơ hóa gan trung bình đến nặng, fibroscan f2 f3 f4 | — |
| 13 | `tc_noi_soi_gian_ttmq` | Nội soi thực quản - dạ dày: Giãn tĩnh mạch thực quản (Độ II - III hoặc có dấu son) | CLS | giãn ttmq, giãn tĩnh mạch thực quản, esophageal varices, dấu son trên búi giãn, nội soi giãn ttmq độ 2 3, varices thực quản | — |
| 14 | `tc_hinh_anh_hoc_tang_ap_cua` | Siêu âm / CT: Tĩnh mạch cửa giãn ≥ 13mm, giãn tĩnh mạch lách | CLS | tĩnh mạch cửa giãn, dãn tm cửa trên 13mm, hình ảnh tăng áp cửa, portal vein diameter >= 13, siêu âm dãn tm cửa, dấu hiệu tăng áp cửa trên cđha | — |
| 15 | `chi_so_apri_tren_1` | Chỉ số APRI > 1.0 (Nguy cơ cao xơ gan tiến triển) | CLS | apri > 1, chỉ số apri tăng, apri score > 1.0, apri xơ gan, apri trên 1.0, chỉ số apri gợi ý xơ gan | — |
| 16 | `chi_so_fib4_tren_3_25` | Chỉ số FIB-4 > 3.25 (Xơ gan giai đoạn F3 - F4) | CLS | fib4 > 3.25, chỉ số fib-4 tăng cao, fib-4 score > 3.25, fib4 xơ hóa tiến triển, fib4 trên 3.25, chỉ số fib4 giai đoạn f3 f4 | — |
| 17 | `giam_albumin_mau` | Albumin huyết thanh giảm (< 35 g/L, nặng < 28 g/L) | CLS | albumin giảm, hạ albumin máu, hypoalbuminemia, albumin < 35, giảm albumin huyết thanh, albumin máu thấp | — |
| 18 | `ti_le_prothrombin_giam_inr_tang` | Tỷ lệ Prothrombin giảm, INR kéo dài (INR > 1.3 - 1.5) | CLS | inr kéo dài, prothrombin giảm, tỷ lệ prothrombin hạ, rối loạn đông máu suy gan, pt inr kéo dài, inr > 1.3, tỷ lệ prothrombin thấp | — |
| 19 | `men_gan_tang` | Men gan AST, ALT tăng trên giới hạn bình thường | CLS | men gan tăng nhẹ, ast alt tăng vừa, transaminase tăng nhẹ, tổn thương tế bào gan chung, tăng transaminase nhẹ vừa, men gan bất thường | — |
| 20 | `viem_phuc_mac_nhiem_khuan_nguyen_phat` | Viêm phúc mạc nhiễm khuẩn nguyên phát (SBP - Bạch cầu đa nhân dịch báng ≥ 250/mm³) | CLS, TT | sbp, viêm phúc mạc nhiễm khuẩn, bạch cầu dịch báng >= 250, spontaneous bacterial peritonitis, nhiễm trùng dịch báng, viêm phúc mạc tự phát | — |
| 21 | `xet_nghiem_kst_sot_ret_duong_tinh` | Ký sinh trùng sốt rét Plasmodium dương tính (Giọt dày / Kỹ thuật PCR / Test nhanh) | CLS | kst sốt rét, plasmodium dương tính, test nhanh sốt rét, soi giọt dày sốt rét, ký sinh trùng sốt rét (+), nhuộm giọt dày plasmodium (+) | — |
| 22 | `tc_anti_hcv_duong_tinh` | Kháng thể Anti-HCV dương tính (Anti-HCV (+)) | CLS | anti-hcv, anti hcv dương tính, kháng thể viêm gan c, test nhanh anti-hcv, anti-hcv (+), hcv ab (+) | — |
| 23 | `tc_hcv_rna_duong_tinh` | Tải lượng HCV RNA dương tính trên ngưỡng phát hiện (RT-PCR định lượng) | CLS | hcv rna, đo tải lượng hcv, hcv rna dương tính, rt-pcr hcv, hcv rna (+), định lượng hcv rna | — |
| 24 | `tc_hbsag_duong_tinh` | Kháng nguyên bề mặt HBsAg dương tính kéo dài > 6 tháng | CLS | hbsag, hbsag dương tính, kháng nguyên bề mặt viêm gan b, hbsag mạn tính, hbsag (+), nhiễm hbv mạn hbsag (+) | — |
| 25 | `tc_hbv_dna_tren_nguong_phat_hien` | Định lượng HBV DNA trên ngưỡng phát hiện (≥ 2.000 - 20.000 IU/mL) | CLS | hbv dna, định lượng hbv dna, tải lượng virus viêm gan b, hbv dna cao, hbv dna (+), tải lượng hbv dna trên ngưỡng | — |
| 26 | `xet_nghiem_hbeag_duong_tinh` | Kháng nguyên HBeAg dương tính (HBeAg (+)) | CLS | hbeag, hbeag dương tính, hbeag (+), virus nhân đôi mạnh, kháng nguyên hbeag (+), hbeag huyết thanh (+) | — |
| 27 | `tc_anti_hbc_igm_duong_tinh` | Kháng thể Anti-HBc IgM dương tính (Viêm gan B cấp hoặc bộc phát) | CLS | anti-hbc igm, anti hbc igm dương tính, anti-hbc igm (+), đợt bộc phát viêm gan b, kháng thể kháng lõi igm (+), anti hbc igm cấp | — |
| 28 | `co_dac_mau_hct` | Cô đặc máu (Hematocrit tăng cao) | CLS | cô đặc máu, hct tăng, hemoconcentration, hematocrit tăng cao, hct dốc đứng | `lHct >= 42` |
| 29 | `giam_tieu_cau` | Giảm tiểu cầu (PLT < 150 G/L) | CLS | giảm tiểu cầu, plt giảm, thrombocytopenia, tiểu cầu thấp, hạ tiểu cầu | `lTC < 150` |
| 30 | `tieu_cau_giam_nang` | Giảm tiểu cầu nặng (PLT < 50 G/L) | CLS | tiểu cầu giảm nặng, plt < 50, severe thrombocytopenia, tiểu cầu tụt sâu, tiểu cầu dưới 50 | `lTC < 50` |
| 31 | `tieu_cau_giam_nguy_kich` | Tiểu cầu giảm nguy kịch (PLT < 20 G/L) | CLS | tiểu cầu nguy kịch, plt < 20, critical thrombocytopenia, nguy cơ xuất huyết tự nhiên, tiểu cầu dưới 20 | `lTC < 20` |
| 32 | `giam_tieu_cau_do_trach_gan` | Giảm tiểu cầu do cường lách hoặc bệnh gan | CLS | cường lách, giảm tiểu cầu xơ gan, hypersplenism, giảm tiểu cầu lách to, hạ tiểu cầu do gan | — |
| 33 | `bach_cau_tang` | Bạch cầu máu tăng (WBC > 10 G/L) | CLS | bạch cầu tăng, wbc tăng, leukocytosis, bạch cầu cao, bạch cầu máu tăng | `lBC > 10` |
| 34 | `bach_cau_tang_cao` | Bạch cầu máu tăng cao (WBC > 15 G/L) | CLS | bạch cầu rất cao, wbc > 15, severe leukocytosis, bạch cầu tăng vọt, phản ứng giả bạch cầu | `lBC > 15` |
| 35 | `inr_keo_dai_tren_1_5` | INR kéo dài > 1.5 | CLS | inr tăng, inr > 1.5, rối loạn đông máu, tỷ lệ prothrombin giảm, inr kéo dài | — |
| 36 | `tang_bilirubin_mau` | Bilirubin toàn phần máu tăng cao | CLS | tăng bilirubin, hyperbilirubinemia, bilirubin máu cao, sắc tố mật tăng, ứ mật huyết thanh | — |

### 8. Hệ Tiết niệu & Chức năng thận (`tiet-nieu.json` — 3 mục)

| STT | Mã ID chuẩn | Tên triệu chứng lâm sàng | Loại | Từ khóa & Biến thể / Aliases | Ngưỡng tự suy |
|:---:|:---|:---|:---:|:---|:---:|
| 1 | `tieu_it` | Tiểu ít (< 0.5 mL/kg/h trong > 6 giờ liên tục) | CN, TT | tiểu ít, thiểu niệu, oliguria, giảm nước tiểu, không tiểu trên 6 giờ, lượng nước tiểu giảm, thiểu niệu do thiếu dịch | — |
| 2 | `tieu_mau` | Tiểu ra máu (Đại thể hoặc vi thể) | CN, CLS | tiểu máu, tiểu ra máu, hematuria, nước tiểu đỏ, hồng cầu trong nước tiểu | — |
| 3 | `ton_thuong_than_cap` | Tổn thương thận cấp (Creatinine máu tăng ≥ 1.5 - 2 lần trị số bình thường) | CLS | creatinine tăng, suy thận cấp, tổn thương thận cấp, aki, creatinine máu tăng, suy chức năng thận | `lCre >= 130` |

### 9. Hệ Nội tiết & Chuyển hóa (`noi-tiet.json` — 0 mục)

*Hiện chưa có triệu chứng nào trong phân nhóm này. Sẽ được bổ sung khi nạp các bệnh lý liên quan.*

### 10. Huyết học & Đông máu (`huyet-hoc.json` — 3 mục)

| STT | Mã ID chuẩn | Tên triệu chứng lâm sàng | Loại | Từ khóa & Biến thể / Aliases | Ngưỡng tự suy |
|:---:|:---|:---|:---:|:---|:---:|
| 1 | `roi_loan_dong_mau_apt_p_t_inr` | Rối loạn đông máu (aPTT kéo dài, Fibrinogen giảm, INR > 1.5) | CLS | rối loạn đông máu, aptt kéo dài, inr tăng, fibrinogen giảm, đông máu bất thường, inr > 1.5, thiếu hụt yếu tố đông máu | — |
| 2 | `thieu_mau_cap_do_xuat_huyet_nang` | Thiếu máu cấp do xuất huyết nặng (Hb / Hct tụt dốc nhanh) | CLS, TT | thiếu máu cấp, hct tụt, hb giảm, mất máu cấp, da niêm nhợt, hct tụt đột ngột, thiếu máu mất máu | — |
| 3 | `lach_to` | Lách to qua bờ sườn (Splenomegaly) | TT, CLS | lách to, splenomegaly, lách lớn, sờ thấy lách, lách to dưới bờ sườn, phì đại lách | — |

### 11. Sản phụ khoa (`san-phu-khoa.json` — 1 mục)

| STT | Mã ID chuẩn | Tên triệu chứng lâm sàng | Loại | Từ khóa & Biến thể / Aliases | Ngưỡng tự suy |
|:---:|:---|:---|:---:|:---|:---:|
| 1 | `xuat_huyet_am_dao_phu_nu_mang_thai` | Xuất huyết âm đạo / Nguy cơ dọa sảy thai, sinh non ở phụ nữ mang thai mắc Dengue | CN, TT | xuất huyết âm đạo thai kỳ, chảy máu âm đạo thai kỳ, sảy thai do dengue, sinh non do dengue, dengue thai kỳ, ra máu âm đạo khi mang thai, sốt xuất huyết ở phụ nữ mang thai | — |

### 12. Tiền căn & Yếu tố nguy cơ nền (`tien-can.json` — 9 mục)

| STT | Mã ID chuẩn | Tên triệu chứng lâm sàng | Loại | Từ khóa & Biến thể / Aliases | Ngưỡng tự suy |
|:---:|:---|:---|:---:|:---|:---:|
| 1 | `tien_can_song_o_dich_luu_hanh` | Sống trong hoặc có lui tới vùng ổ dịch sốt xuất huyết lưu hành trong vòng 14 ngày | TC, DTH | vùng dịch, ổ dịch, dịch tễ địa phương, nguồn lây, muỗi vằn đốt, yếu tố dịch tễ sxh, vùng dịch lưu hành, người xung quanh mắc sxh | — |
| 2 | `tien_can_nhiem_dengue_thu_phat` | Tiền căn đã nhiễm vi rút Dengue trước đó (Nhiễm thứ phát tăng nguy cơ SXHD nặng) | TC | nhiễm thứ phát, dengue thứ phát, secondary dengue, đã từng bị sxh, nhiễm dengue lần 2 | — |
| 3 | `co_dia_nguy_co_cao_sxhd` | Cơ địa nguy cơ tiến triển nặng: Trẻ nhũ nhi, béo phì, phụ nữ mang thai, người cao tuổi, bệnh gan/thận mạn | TC | cơ địa béo phì, phụ nữ có thai, người cao tuổi, bệnh gan nền, nhũ nhi, béo phì, bệnh nền mạn tính, thai phụ mắc sxh | — |
| 4 | `tien_su_viem_gan_virus_b_c` | Tiền sử viêm gan virus B mạn hoặc viêm gan C mạn | TC | tiền sử viêm gan b, tiền sử viêm gan c, nhiễm hbv mạn, nhiễm hcv mạn, tiền sử mắc hbv hcv, tiền căn viêm gan siêu vi | — |
| 5 | `tien_su_nghiem_ruou_bia` | Tiền sử lạm dụng rượu bia mạn tính (> 20-30g cồn/ngày kéo dài) | TC | nghiện rượu bia, uống rượu nhiều năm, tiền sử uống rượu kéo dài, alcohol abuse chronic, lạm dụng cồn mạn, tiền căn nghiện rượu | — |
| 6 | `tien_su_gan_nhiem_mo_mash_masld` | Tiền sử gan nhiễm mỡ liên quan chuyển hóa (MASLD / MASH / NAFLD) | TC | gan nhiễm mỡ mash, tiền sử masld, nafld chuyển hóa, viêm gan thoái hóa mỡ, tiền căn gan thoái hóa mỡ, mash masld | — |
| 7 | `tien_su_tiem_chich_ma_tuy` | Tiền sử tiêm chích ma túy hoặc dùng chung bơm kim tiêm | TC | tiêm chích ma túy, dùng chung kim tiêm, idu history, nguy cơ lây qua kim tiêm, tiền sử tiêm chích, chích ma túy | — |
| 8 | `tien_su_phoi_nhiem_hcv_duong_mau` | Tiền sử truyền máu trước 1992 hoặc phơi nhiễm đường máu | TC | truyền máu trước 1992, phơi nhiễm đường máu, tai nạn kim tiêm y tế, xăm mình không an toàn, tiền sử nhận máu cũ, phơi nhiễm máu hcv | — |
| 9 | `tien_su_gia_dinh_xue_gan_hcc` | Tiền sử gia đình có người thân mắc xơ gan hoặc ung thư gan nguyên phát (HCC) | TC | gia đình xơ gan, tiền sử gia đình ung thư gan, người thân mắc hcc, family history liver cirrhosis, tiền căn gia đình ung thư gan, gia đình có người xơ gan | — |

---
*Tài liệu tự động tạo bởi: `tools/scripts/bundle-symptoms.mjs` — CliniPortal Knowledge Engineering Squad.*
