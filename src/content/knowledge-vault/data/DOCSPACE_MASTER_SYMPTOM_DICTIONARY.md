# 📘 CLINIPORTAL — DANH MỤC TỪ VỰNG LÂM SÀNG CHUẨN (MASTER SYMPTOM DICTIONARY)

> **Phiên bản**: v5.0 | **Ngày cập nhật**: 2026-09-26 | **Tổng số triệu chứng chuẩn**: 94
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

### 1. Toàn thân & Sinh hiệu chung (`toan-than.json` — 9 mục)

| STT | Mã ID chuẩn | Tên triệu chứng lâm sàng | Loại | Từ khóa & Biến thể / Aliases | Ngưỡng tự suy |
|:---:|:---|:---|:---:|:---|:---:|
| 1 | `tc_sot_cao_dot_ngot_duoi_7_ngay` | Sốt cao đột ngột liên tục ≤ 7 ngày | CN, TT | sốt cao, sốt đột ngột, sốt liên tục, sốt dengue, sot duoi 7 ngay, sốt cao liên tục, sốt cấp tính, sốt khó hạ | `vNhiet ≥ 38.5` |
| 2 | `dau_co` | Đau mỏi cơ, nhức khớp và mình mẩy | CN | đau cơ, đau khớp, nhức mỏi, myalgia, arthralgia, đau mình mẩy, nhức mỏi toàn thân, đau nhức xương khớp | — |
| 3 | `nhuc_hai_ho_mat` | Nhức hai hốc mắt (Retro-orbital pain) | CN | nhức hốc mắt, đau sau hốc mắt, nhức mắt, retro-orbital, đau hố mắt, nhức hai bên hốc mắt, đau hốc mắt | — |
| 4 | `met_moi` | Mệt mỏi toàn thân, mệt lả, chán ăn, suy kiệt | CN | mệt mỏi, chán ăn, kiệt sức, mệt lả, fatigue, uể oải, suy nhược, sụt cân | — |
| 5 | `sot_nhe_giai_doan_khoi_phat` | Sốt nhẹ giai đoạn tiền vàng da (37.5°C - 38.5°C) | CN, TT | sốt nhẹ, sốt tiền vàng da, sốt viêm gan, sot nhe, fever, sốt hâm hấp, sốt nhẹ trước vàng da, sốt khởi phát viêm gan | `vNhiet >= 37.5` |
| 6 | `chan_an_sut_can` | Chán ăn, sợ mỡ, chán ngấy thức ăn và sụt cân | CN | chán ăn, sợ mỡ, sụt cân, chán ngấy thức ăn, anorexia, chán đồ dầu mỡ, sụt cân không rõ nguyên nhân, gầy sút | — |
| 7 | `dau_khop_ngoai_bien` | Đau mỏi các khớp ngoài biên (Hội chứng giống bệnh huyết thanh) | CN | đau khớp, nhức khớp, arthralgia, đau khớp ngoài biên, viêm đa khớp, đau nhức các khớp, mỏi khớp tiền triệu, đau khớp do HBV | — |
| 8 | `sut_can_teo_co_sarcopenia` | Sụt cân nhanh, teo cơ, suy dinh dưỡng đạm - năng lượng (Sarcopenia) | CN, TT | sụt cân, teo cơ, sarcopenia, suy dinh dưỡng, mất khối cơ, teo cơ mu tay, teo cơ thái dương, suy kiệt cơ thể | — |
| 9 | `sot_nhe_ve_chieu` | Sốt nhẹ về chiều, sốt không rõ nguyên nhân ở bệnh nhân xơ gan | CN, TT | sốt nhẹ, sốt về chiều, sốt xơ gan, low grade fever, ngấy sốt, sốt hâm hấp | `vNhiet >= 37.8` |

### 2. Hệ Tim mạch & Huyết động (`tim-mach.json` — 6 mục)

| STT | Mã ID chuẩn | Tên triệu chứng lâm sàng | Loại | Từ khóa & Biến thể / Aliases | Ngưỡng tự suy |
|:---:|:---|:---|:---:|:---|:---:|
| 1 | `mach_nhanh` | Mạch nhanh (> 100 lần/phút) | TT | mạch nhanh, nhịp tim nhanh, tachycardia, mạch > 100, hyperdynamic, nhịp tim nhanh, mạch quay nhanh, tim đập nhanh | `vMach > 100` |
| 2 | `ha_huyet_ap` | Huyết áp tụt (< 90 mmHg) | TT | huyết áp tụt, hạ huyết áp, hypotension, ha thap, tụt huyết áp, hatt < 90, huyết áp thấp, tụt huyết áp xơ gan | `vHATT < 90` |
| 3 | `chi_lanh_crt_keo_dai` | Đầu chi lạnh, ẩm, thời gian đổ đầy mao mạch (CRT) kéo dài > 2 giây | TT | chi lạnh, crt kéo dài, đầu chi lạnh ẩm, capillary refill, tay chân lạnh, chi mát ẩm, crt > 2s, tưới máu ngoại biên kém | — |
| 4 | `tc_soc_mach_nhanh_ha_kep_hoac_tut` | Sốc SXH Dengue: Mạch nhanh nhỏ, HA kẹp (≤ 20 mmHg) hoặc Tụt huyết áp | TT | sốc, sốc sxh, huyết áp kẹp, mạch nhanh nhỏ, dengue shock syndrome, sốc giảm thể tích, hiệu áp kẹp, dss | `vHATT ≤ 90` |
| 5 | `viem_da_mach_do_hbv` | Viêm đa mạch nút do HBV (Polyarteritis nodosa - Đau chi, tăng huyết áp, tổn thương mạch) | TT, CN | viêm đa mạch, polyarteritis nodosa, viêm mạch do hbv, tăng huyết áp, đau chi, biểu hiện ngoài gan viêm mạch, bệnh lý đa mạch nút, viêm mạch máu hbv | — |
| 6 | `hoi_chung_gan_phoi_hps` | Khó thở khi ngồi dậy (Platypnea), giảm SpO2 khi đứng (Orthodeoxia) do Hội chứng gan phổi (HPS) | CN, TT | hps, hội chứng gan phổi, platypnea, orthodeoxia, giãn mạch phế nang, khó thở tư thế ngồi | — |

### 3. Hệ Hô hấp & Lồng ngực (`ho-hap.json` — 3 mục)

| STT | Mã ID chuẩn | Tên triệu chứng lâm sàng | Loại | Từ khóa & Biến thể / Aliases | Ngưỡng tự suy |
|:---:|:---|:---|:---:|:---|:---:|
| 1 | `kho_tho` | Khó thở, suy hô hấp do tràn dịch đa màng hoặc phù phổi | CN, TT | khó thở, dyspnea, thở gắng sức, suy hô hấp, tràn dịch màng phổi xơ gan, hepatic hydrothorax, thở mệt, khó thở do tràn dịch | — |
| 2 | `tho_nhanh` | Thở nhanh (> 20 lần/phút) | TT | thở nhanh, tachypnea, tần số thở tăng, thở > 20 l/p, nhịp thở tăng, nhịp thở nhanh, tăng nhịp thở, thở nông nhanh | `vTho > 20` |
| 3 | `spo2_giam` | SpO₂ giảm (< 94%) | TT | spo2 giảm, giảm oxy máu, hypoxemia, spo2 < 94%, tụt spo2, giảm độ bão hòa oxy, thiếu oxy máu | `vSpo2 < 94` |

### 4. Hệ Tiêu hóa, Gan mật & Ổ bụng (`tieu-hoa.json` — 13 mục)

| STT | Mã ID chuẩn | Tên triệu chứng lâm sàng | Loại | Từ khóa & Biến thể / Aliases | Ngưỡng tự suy |
|:---:|:---|:---|:---:|:---|:---:|
| 1 | `buon_non_non` | Buồn nôn / Nôn ói | CN | buồn nôn, nôn ói, nausea, vomiting, nôn nhiều, đầy bụng, khó tiêu, chướng hơi | — |
| 2 | `tc_dau_hieu_canh_bao_dau_bung_gan_non_oi` | Đau bụng vùng gan, nôn ói liên tục (Dấu hiệu cảnh báo) | CN, TT | đau bụng gan, đau hạ sườn phải, nôn ói nhiều, dấu hiệu cảnh báo, nôn ói liên tục, đau HSP liên tục, nôn ói ≥ 3 lần/1h, nôn ói ≥ 4 lần/6h | — |
| 3 | `gan_to_dau` | Gan to > 2cm dưới bờ sườn kèm ấn đau tức | TT | gan to, bờ sườn, gan mấp mé, ấn đau vùng gan, hepatomegaly, gan to quá bờ sườn, gan lớn đau, gan to dưới bờ sườn | — |
| 4 | `non_ra_mau_phan_den` | Xuất huyết tiêu hóa: Nôn ra máu / Đi cầu phân đen | CN, TT | nôn ra máu, tiêu phân đen, hematemesis, melena, xuất huyết tiêu hóa, vỡ giãn tĩnh mạch thực quản, vỡ tĩnh mạch thực quản, ó ra máu | — |
| 5 | `dau_tuc_ha_suon_phai` | Đau tức nhẹ hoặc căng tức vùng hạ sườn phải (vùng gan) | CN, TT | đau hạ sườn phải, đau vùng gan, tức hạ sườn, dau ha suon phai, đau hsp, đau tức vùng gan, căng tức hạ sườn phải, đau nhói vùng gan | — |
| 6 | `vang_da_vang_mat` | Vàng da, vàng mắt, củng mạc mắt vàng và nước tiểu sậm màu | CN, TT | vàng da, vàng mắt, nước tiểu sậm màu, jaundice, icterus, tieu vang đậm, nước tiểu sậm màu như chè đặc, vàng củng mạc mắt | — |
| 7 | `phan_bac_mau` | Phân nhạt màu hoặc phân bạc màu (Dấu hiệu tắc mật/ứ mật) | CN, TT | phân bạc màu, phân nhạt màu, acholic stool, ứ mật, phan bac mau, phân xám cò, phân mất màu mật, phân nhạt | — |
| 8 | `lach_to` | Lách to (Dấu hiệu tăng áp lực tĩnh mạch cửa trong xơ gan) | TT | lách to, splenomegaly, tăng áp tĩnh mạch cửa, lách lớn, tăng áp cửa, lách to quá bờ sườn, cường lách, lách độ I-IV | — |
| 9 | `co_truong_dich_do_o_bung` | Cổ trướng / Bụng trướng nước (Biến cố mất bù của xơ gan) | TT, CLS | cổ trướng, ascites, trướng bụng, dịch tự do ổ bụng, xơ gan mất bù, bụng báng, dịch ổ bụng, bụng trướng dịch | — |
| 10 | `co_truong_bang_bung` | Cổ trướng (Báng bụng), bụng chướng to, gõ đục vùng thấp | CN, TT | cổ trướng, báng bụng, ascites, bụng to, chướng bụng, dịch tự do ổ bụng, bụng chướng nước, gõ đục di động | — |
| 11 | `tuan_hoan_bang_he_cua_chu` | Tuần hoàn bàng hệ cửa - chủ (Tĩnh mạch nổi rõ vùng bụng / Caput Medusae) | TT | tuần hoàn bàng hệ, bàng hệ cửa chủ, caput medusae, tĩnh mạch bụng nổi, dấu bàng hệ cửa chủ, tĩnh mạch ngoằn ngoèo trên thành bụng | — |
| 12 | `gan_nho_bo_sac_nhu_mo_tho` | Gan teo nhỏ, bờ sắc, bề mặt gồ ghề nốt tái tạo, mật độ chắc cứng | TT | gan teo, gan nhỏ, gan chắc, bờ sắc, mật độ cứng, gan xơ chắc, gan lổn nhổn | — |
| 13 | `viem_phuc_mac_nhiem_khuan_nguyen_phat` | Đau bụng lan tỏa, đề kháng nhẹ, sốt do Viêm phúc mạc nhiễm khuẩn nguyên phát (SBP) | CN, TT | sbp, viêm phúc mạc nhiễm khuẩn nguyên phát, nhiễm trùng dịch báng, đau bụng sốt, nhiễm trùng dịch cổ trướng, sbp xơ gan | — |

### 5. Hệ Thần kinh & Ý thức (`than-kinh.json` — 7 mục)

| STT | Mã ID chuẩn | Tên triệu chứng lâm sàng | Loại | Từ khóa & Biến thể / Aliases | Ngưỡng tự suy |
|:---:|:---|:---|:---:|:---|:---:|
| 1 | `dau_dau` | Đau đầu dữ dội | CN | đau đầu, nhức đầu, headache, đau nhức đầu, nhức trán thái dương, nhức đầu nhiều | — |
| 2 | `lu_du_vat_va_li_bi` | Vật vã, lừ đừ, li bì (Dấu hiệu cảnh báo thần kinh) | CN, TT | lừ đừ, vật vã, li bì, thay đổi tri giác, bứt rứt, mất định hướng, bệnh não gan độ 2, bệnh não gan độ 3 | — |
| 3 | `sxhd_the_nao_roi_loan_tri_giac` | Sốt xuất huyết Dengue thể não: Rối loạn tri giác, co giật, hôn mê | CN, TT | sxh thể não, rối loạn tri giác, co giật, hôn mê, dấu thần kinh khu trú, viêm não do dengue, bệnh não dengue, co giật bùng phát | — |
| 4 | `benh_nao_gan_roi_loan_tri_giac` | Bệnh não gan (Rối loạn giấc ngủ, lú lẫn, bứt rứt, run vẫy Flapping tremor, hôn mê gan) | CN, TT | bệnh não gan, hôn mê gan, hepatic encephalopathy, flapping tremor, lú lẫn, rối loạn tri giác do suy gan, run vẫy rụt rê, bệnh não gan độ 1-4 | — |
| 5 | `dau_hieu_vo_canh_asterixis` | Dấu vỗ cánh (Asterixis / Flapping tremor) khi duỗi thẳng cổ tay | TT | asterixis, dấu vỗ cánh, flapping tremor, run vỗ cánh, run bàn tay vỗ cánh, dấu hiệu bệnh não gan | — |
| 6 | `roi_loan_giac_ngu_dao_nguoc_nhip_sinh_hoc` | Rối loạn giấc ngủ, ngủ ngày thức đêm, giảm tập trung (Bệnh não gan Grade I) | CN | rối loạn giấc ngủ, ngủ ngày thức đêm, mất ngủ, bệnh não gan độ 1, đảo ngược nhịp sinh học, giảm chú ý | — |
| 7 | `hon_me_gan_hepatic_coma` | Hôn mê gan, mất tri giác, mất phản xạ (Bệnh não gan Grade IV) | CN, TT | hôn mê gan, bệnh não gan độ 4, hepatic coma, mất tri giác, hôn mê do amoniac, hôn mê xơ gan | — |

### 6. Da niêm & Dị ứng lâm sàng (`da-niem.json` — 11 mục)

| STT | Mã ID chuẩn | Tên triệu chứng lâm sàng | Loại | Từ khóa & Biến thể / Aliases | Ngưỡng tự suy |
|:---:|:---|:---|:---:|:---|:---:|
| 1 | `tc_xuat_huyet_da_niem_lacet_duong_tinh` | Xuất huyết dưới da, niêm mạc, Nghiệm pháp dây thắt (Lacet) (+) | TT | xuất huyết dưới da, chấm xuất huyết, lacet dương tính, chảy máu chân răng, chảy máu cam, mảng bầm tím, petechiae, chấm xuất huyết rải rác | — |
| 2 | `phat_ban_xung_huyet` | Phát ban xung huyết da, ban dát sẩn hoặc ban hồi phục (Skin islands) | TT | phát ban, da xung huyết, ban hồi phục, skin islands, đảo trắng biển đỏ, ban dát sẩn, xung huyết da, ban hồi phục ngứa | — |
| 3 | `sa_mach_long_ban_tay_son` | Sao mạch (Spider nevi) và Ban đỏ lòng bàn tay (Palmar erythema) | TT | sao mạch, lòng bàn tay son, spider nevi, palmar erythema, nốt nốt nốt huyết, dấu nốt nhện trên da, lòng bàn tay đỏ son, sao mạch vùng ngực cổ | — |
| 4 | `ngua_da_do_u_mat` | Ngứa da dai dẳng do ứ mật / tăng Muối mật | CN | ngứa da, ngứa do ứ mật, pruritus, ngứa toàn thân, vết gãi, ngứa gãi cuồng nhiệt, ngứa da kèm vàng da, ngứa do ứ mật | — |
| 5 | `phu_hai_chan` | Phù mềm hai chân (Do giảm Albumin máu và giữ muối nước) | TT | phù chân, phù mềm, edema, phù hai mắt cá, giảm albumin, phù chi dưới, phù mềm ấn lõm, phù hai cẳng chân | — |
| 6 | `sao_mach_spider_nevi` | Sao mạch (Spider nevi / Spider angioma) ở vùng cổ, ngực, lưng | TT | sao mạch, spider nevi, spider angioma, nốt nếp nhện, u mạch nhện, dấu sao mạch | — |
| 7 | `ban_do_long_tay_palmar_erythema` | Ban đỏ lòng bàn tay (Palmar erythema / Lòng bàn tay xơ gan) | TT | ban đỏ lòng bàn tay, palmar erythema, lòng bàn tay đỏ, lòng bàn tay xơ gan, đỏ mô mô ngón tay | — |
| 8 | `ni_em_mac_vang_vang_da` | Vàng mắt, vàng da (Jaundice / Icterus) do tăng Bilirubin | TT | vàng da, vàng mắt, jaundice, icterus, niêm mạc vàng, da niêm mắt vàng, hoàng đản | — |
| 9 | `xuat_huyet_da_niem` | Chấm xuất huyết, mảng bầm tím dưới da, chảy máu chân răng, chảy máu cam | TT, CN | xuất huyết dưới da, mảng bầm tím, chảy máu chân răng, chảy máu cam, xuất huyết niêm mạc, chảy máu rỉ rả | — |
| 10 | `mong_tay_terry_terry_nails` | Móng tay Terry (Terry's nails - móng đục trắng, mất lunula) | TT | móng tay terry, terry nails, móng trắng, dấu móng tay terry, móng tay xơ gan | — |
| 11 | `ngua_da_mangan` | Ngứa da dai dẳng do ứ mật / tăng muối mật trong máu | CN | ngứa da, pruritus, ngứa do ứ mật, ngứa xơ gan, ngứa toàn thân, gãi trầy da | — |

### 7. Cận lâm sàng (Huyết học, Sinh hóa, Vi sinh, CĐHA) (`can-lam-sang.json` — 27 mục)

| STT | Mã ID chuẩn | Tên triệu chứng lâm sàng | Loại | Từ khóa & Biến thể / Aliases | Ngưỡng tự suy |
|:---:|:---|:---|:---:|:---|:---:|
| 1 | `tc_co_dac_mau_hct_tang_tren_20_phan_tram` | Cô đặc máu (Hematocrit tăng ≥ 20% so với giá trị nền hoặc Hct > 45%) | CLS | cô đặc máu, hct tăng, hematocrit tăng, hct tang cao, thoát huyết tương, hct tăng dốc đứng, hct > 45%, máu cô đặc | `lHct ≥ 42` |
| 2 | `tc_giam_tieu_cau_duoi_100_g_l` | Tiểu cầu giảm sâu dốc đứng < 100 G/L | CLS | tiểu cầu giảm, giảm tiểu cầu, plt tụt, plt < 100, thrombocytopenia, cường lách, tiểu cầu tụt dốc, tiểu cầu < 100 | `lTC ≤ 100` |
| 3 | `tc_xet_nghiem_ns1_hoac_pcr_duong_tinh` | Xét nghiệm Dengue NS1 Ag (+) hoặc RT-PCR (+) | CLS | ns1, pcr dengue, kháng nguyên ns1, ns1 duong tinh, ns1 ag (+), dengue rna (+), xét nghiệm ns1, test nhanh ns1 (+) | — |
| 4 | `tran_dich_mang_phoi_mang_bung` | Tràn dịch màng phổi, tràn dịch màng bụng, phù nề thành túi mật trên siêu âm/X-quang | CLS, TT | tràn dịch màng phổi, tràn dịch màng bụng, cổ trướng, thoát huyết tương, phù nề thành túi mật, dịch màng phổi, dịch tự do ổ bụng, dày thành túi mật | — |
| 5 | `men_gan_tang` | Men gan AST/ALT tăng cao (≥ 2 lần giới hạn bình thường) | CLS | men gan tăng, ast tăng, alt tăng, tổn thương gan, transaminase, men gan cao, ast/alt tăng, tăng transaminase | `lAST ≥ 80` |
| 6 | `men_gan_ast_alt_tang_tren_1000` | Tổn thương gan nặng / Suy gan cấp (AST hoặc ALT ≥ 1000 U/L) | CLS | ast ≥ 1000, alt ≥ 1000, suy gan cấp, tổn thương gan nặng, alt >= 1000, ast >= 1000, men gan vọt cao, hoại tử gan nặng | `lAST ≥ 1000` |
| 7 | `tc_hbsag_duong_tinh` | Kháng nguyên bề mặt HBV (HBsAg) dương tính | CLS | hbsag, hbsag dương tính, kháng nguyên bề mặt, hbsag (+), hbsag reactive, xét nghiệm hbsag dương tính, nhiễm vi rút viêm gan b | — |
| 8 | `tc_anti_hbc_igm_duong_tinh` | Kháng thể lõi Anti-HBc IgM dương tính (Dấu ấn chẩn đoán nhiễm HBV cấp) | CLS | anti hbc igm, anti-hbc igm dương tính, kháng thể igm lõi, igm anti-hbc, anti-hbc igm (+), anti-hbc igm reactive, xét nghiệm igm lõi hbv | — |
| 9 | `tc_hbv_dna_tren_nguong_phat_hien` | Tải lượng HBV DNA cao (> 2000 IU/mL hoặc trên ngưỡng phát hiện) | CLS | hbv dna, tải lượng hbv dna, định lượng hbv dna, hbv dna cao, hbv dna > 2000 iu/ml, hbv dna > 10^4 copies/ml, định lượng vi rút b | — |
| 10 | `tang_bilirubin_mau` | Bilirubin toàn phần tăng cao (> 3 mg/dL hay > 51 µmol/L) | CLS | bilirubin tăng, bilirubin toàn phần, bilirubin trực tiếp, hyperbilirubinemia, tăng bilirubin, vàng da, bilirubin > 3 mg/dl, bilirubin > 51 umol/l | — |
| 11 | `inr_keo_dai_tren_1_5` | Rối loạn đông máu (Tỷ số chuẩn hóa quốc tế INR > 1.5 hoặc Tỷ lệ PT < 60%) | CLS | inr kéo dài, inr > 1.5, rối loạn đông máu, pt giảm, prothrombin time, tỷ lệ prothrombin giảm, inr > 1.5 trong suy gan, kéo dài pt | — |
| 12 | `do_dan_hoi_gan_fibroscan_f2_f4` | Xơ hóa gan đáng kể đến xơ gan trên FibroScan (≥ F2 > 7.0 kPa, F4 > 12.5 kPa) | CLS | fibroscan, đo độ đàn hồi gan, xơ hóa gan, f2, f4, lsm > 7 kpa, độ cứng mô gan tăng, fibroscan > 7 kpa | — |
| 13 | `chi_so_apri_tang` | Chỉ số xơ hóa gan APRI tăng (APRI > 0.5 đánh giá xơ hóa, APRI > 1.0 nghi xơ gan) | CLS | apri, chỉ số apri, apri > 0.5, apri > 1.0, xơ hóa apri, apri index, tỷ số ast trên tiểu cầu, apri > 0.5 | — |
| 14 | `xet_nghiem_hbeag_duong_tinh` | Kháng nguyên HBeAg dương tính (Chỉ dấu vi rút nhân lên mạnh) | CLS | hbeag, hbeag dương tính, hbeag (+), kháng nguyên e hbv, hbeag reactive, xét nghiệm hbeag dương tính, hbv sao chép mạnh | — |
| 15 | `dinh_luong_afp_pivka_ii_tang` | Chỉ dấu ung thư gan AFP hoặc PIVKA-II / AFP-L3 tăng bất thường | CLS | afp tăng, pivka-ii, afp-l3, chỉ dấu ung thư gan, tầm soát hcc, alpha fetoprotein cao, afp > 20 ng/ml, pivka ii tăng | — |
| 16 | `tc_do_dan_hoi_gan_fibroscan` | Đo độ đàn hồi gan FibroScan LSM ≥ 12.5 kPa (Chẩn đoán xơ gan F4 / cACLD) | CLS | fibroscan, lsm, độ đàn hồi gan, xơ gan f4, cacld, fibroscan >= 12.5 kpa, độ cứng gan tăng, lsm >= 15 kpa | — |
| 17 | `chi_so_apri_tren_1` | Chỉ số xơ hóa gan APRI (AST / Platelet Ratio Index) > 1.0 | CLS | apri, chỉ số apri, apri > 1, ast/plt, apri f4, tỷ số ast trên tiểu cầu > 1.0 | — |
| 18 | `chi_so_fib4_tren_3_25` | Chỉ số xơ hóa gan FIB-4 > 3.25 | CLS | fib-4, fib4, fib-4 > 3.25, chỉ số fib4, fib4 điểm cao, fib4 f4 | — |
| 19 | `giam_albumin_mau` | Albumin huyết thanh giảm (< 35 g/L hoặc < 28 g/L) | CLS | albumin giảm, hạ albumin, hypoalbuminemia, albumin < 35, albumin máu tụt, giảm suy tổng hợp đạm | — |
| 20 | `ti_le_prothrombin_giam_inr_tang` | Tỷ lệ Prothrombin giảm (< 64%) hoặc Tỷ số chuẩn hóa quốc tế INR tăng (> 1.7 - 2.3) | CLS | inr tăng, prothrombin giảm, pt giảm, inr > 1.7, rối loạn đông máu, pt/inr kéo dài, giảm chức năng đông máu gan | — |
| 21 | `men_gan_ast_alt_tang` | Men gan AST/ALT tăng cao nhẹ hoặc vừa (Tỷ lệ AST/ALT > 2 gợi ý do rượu) | CLS | men gan tăng, ast tăng, alt tăng, ast/alt > 2, tăng transaminase, tổn thương tế bào gan | `lAST >= 80` |
| 22 | `tc_noi_soi_gian_ttmq` | Nội soi dạ dày - thực quản: Giãn tĩnh mạch thực quản (GEV độ I, II, III) hoặc dạ dày (GV) | CLS | nội soi gev, giãn tĩnh mạch thực quản, gev độ 2, gev độ 3, dấu son, varices thực quản, nội soi tĩnh mạch cửa giãn | — |
| 23 | `tc_hinh_anh_hoc_tang_ap_cua` | Siêu âm / CT / MRI bụng: Nhu mô gan thô, bờ không đều, TM cửa giãn > 13mm, lách to, dịch báng | CLS | siêu âm xơ gan, nhu mô gan thô, tĩnh mạch cửa giãn, lách to siêu âm, ct bụng xơ gan, hình ảnh xơ gan, tĩnh mạch cửa > 13mm | — |
| 24 | `saag_tren_1_1` | Tỷ số Độ chênh Albumin Huyết thanh - Dịch báng (SAAG) ≥ 1.1 g/dL | CLS | saag, saag >= 1.1, độ chênh albumin, cổ trướng tăng áp cửa, saag cao, saag tăng áp cửa | — |
| 25 | `neutrophil_dich_bang_tren_250` | Số lượng Bạch cầu đa nhân trung tính (Neutrophil) dịch cổ trướng ≥ 250/mm³ | CLS | neutrophil dịch báng, bạch cầu dịch báng, neutrophil >= 250, chẩn đoán sbp, bạch cầu đa nhân dịch cổ trướng tăng | — |
| 26 | `creatinine_mau_tang_aki` | Creatinine máu tăng ≥ 0.3 mg/dL hoặc ≥ 50% so với nền (Tổn thương thận cấp HRS-AKI) | CLS | creatinine tăng, suy thận cấp, aki xơ gan, hrs-aki, hội chứng gan thận, creatinine máu cao, suy chức năng thận | — |
| 27 | `ha_natri_mau` | Nồng độ Natri máu giảm (< 130 - 125 mEq/L) | CLS | hạ natri máu, natri giảm, hyponatremia, na < 130, natri máu tụt, hạ natri do pha loãng | — |

### 8. Hệ Tiết niệu & Chức năng thận (`tiet-nieu.json` — 3 mục)

| STT | Mã ID chuẩn | Tên triệu chứng lâm sàng | Loại | Từ khóa & Biến thể / Aliases | Ngưỡng tự suy |
|:---:|:---|:---|:---:|:---|:---:|
| 1 | `tieu_it` | Tiểu ít (Lượng nước tiểu < 0.5 mL/kg/giờ trong 6 giờ) | CN, TT | tiểu ít, vô niệu, thiểu niệu, bài niệu giảm, oliguria, hội chứng gan thận, giảm nước tiểu, không tiểu trên 6 giờ | — |
| 2 | `viem_cau_than_do_hbv` | Viêm cầu thận do phức hợp miễn dịch HBV (Tiểu đạm, tiểu máu, phù) | CN, TT, CLS | viêm cầu thận, tiểu đạm, tiểu máu, hội chứng thận hư, hbv glomerulonephritis, protein niệu do hbv, tổn thương thận do hbv, viêm cầu thận màng | — |
| 3 | `phu_hai_chan` | Phù mềm hai chân, phù ấn lõm vùng cẳng chân và mu bàn chân | TT | phù chân, phù mềm, phù hai chi dưới, pedal edema, phù ấn lõm, phù mắt cá chân | — |

### 9. Hệ Nội tiết & Chuyển hóa (`noi-tiet.json` — 2 mục)

| STT | Mã ID chuẩn | Tên triệu chứng lâm sàng | Loại | Từ khóa & Biến thể / Aliases | Ngưỡng tự suy |
|:---:|:---|:---|:---:|:---|:---:|
| 1 | `vu_to_nam_gioi_gynecomastia` | Tuyến vú to ở nam giới (Gynecomastia) do tăng Oestrogen tuần hoàn | TT | vú to nam giới, gynecomastia, tuyến vú lớn, vú to ở nam, dấu hiệu tăng oestrogen | — |
| 2 | `teo_tinh_hoan_giam_dieu_hoa_sinh_duc` | Teo tinh hoàn, rụng lông nách/mu, giảm ham muốn tình dục do rối loạn nội tiết | TT, CN | teo tinh hoàn, rụng lông, giảm sinh lý, testicular atrophy, giảm ham muốn, rối loạn nội tiết xơ gan | — |

### 10. Huyết học & Đông máu (`huyet-hoc.json` — 4 mục)

| STT | Mã ID chuẩn | Tên triệu chứng lâm sàng | Loại | Từ khóa & Biến thể / Aliases | Ngưỡng tự suy |
|:---:|:---|:---|:---:|:---|:---:|
| 1 | `giam_tieu_cau_do_trach_gan` | Giảm tiểu cầu máu ngoại vi (Do cường lách / giảm Thrombopoietin ở xơ gan) | CLS | tiểu cầu giảm, giảm tiểu cầu, plt tụt, thrombocytopenia, cường lách, tiểu cầu < 100 G/L, giảm tiểu cầu xơ gan, plt giảm trong xơ gan | `lTC <= 100` |
| 2 | `cryoglobulin_mau` | Cryoglobulinemia (Globulin lạnh bất thường trong máu gây viêm mạch) | CLS | cryoglobulin, cryoglobulinemia, globulin lạnh, kết tủa lạnh, cryoglobulin máu dương tính, bệnh globulin bất thường | — |
| 3 | `hoi_chung_thieu_mau` | Hội chứng thiếu máu: Da niêm nhợt, hoa mắt, chóng mặt do xuất huyết hoặc suy tủy | CN, TT | thiếu máu, da niêm nhợt, anemia, giảm hemoglobin, da xanh niêm nhợt, hb giảm | — |
| 4 | `roi_loan_dong_mau_giam_tieu_cau` | Hội chứng xuất huyết do suy giảm tổng hợp yếu tố đông máu và giảm tiểu cầu cường lách | CLS, TT | rối loạn đông máu, xuất huyết, giảm yếu tố đông máu, cường lách, kéo dài thời gian đông máu, dễ chảy máu | — |

### 11. Sản phụ khoa (`san-phu-khoa.json` — 1 mục)

| STT | Mã ID chuẩn | Tên triệu chứng lâm sàng | Loại | Từ khóa & Biến thể / Aliases | Ngưỡng tự suy |
|:---:|:---|:---|:---:|:---|:---:|
| 1 | `phu_nu_mang_thai_nhiem_hbv` | Phụ nữ mang thai nhiễm HBV có nguy cơ lây truyền mẹ con cao (HBV DNA ≥ 200.000 IU/mL) | TC, CLS | mang thai hbv, lây truyền mẹ con, thai phụ hbsag dương, mtct hbv, hbv dna > 200000, phụ nữ có thai nhiễm vi rút b, thai kỳ tải lượng vi rút cao, dự phòng tdf thai kỳ | — |

### 12. Tiền căn & Yếu tố nguy cơ nền (`tien-can.json` — 8 mục)

| STT | Mã ID chuẩn | Tên triệu chứng lâm sàng | Loại | Từ khóa & Biến thể / Aliases | Ngưỡng tự suy |
|:---:|:---|:---|:---:|:---|:---:|
| 1 | `tien_can_song_o_dich_luu_hanh` | Sống trong hoặc có lui tới vùng ổ dịch sốt xuất huyết lưu hành | TC, DTH | vùng dịch, ổ dịch, dịch tễ địa phương, muỗi vằn đốt, yếu tố dịch tễ, vùng dịch lưu hành, người xung quanh mắc sxh | — |
| 2 | `tien_su_phoi_nhiem_hbv` | Tiền sử nguy cơ tiếp xúc/phơi nhiễm HBV trong 4 - 24 tuần trước khởi phát | TC, DTH | phơi nhiễm hbv, tiền sử tiêm chích, truyền máu, xăm trổ, quan hệ không an toàn, yếu tố dịch tễ hbv, nguy cơ lây nhiễm hbv, thủ thuật y tế không tiệt trùng | — |
| 3 | `tien_su_gia_dinh_xue_gan_hcc` | Tiền sử gia đình có người thế hệ thứ nhất mắc xơ gan hoặc ung thư gan (HCC) | TC | tiền sử gia đình hcc, gia đình xơ gan, tiền sử ung thư gan, nguy cơ hcc, người thân bị ung thư gan, bố mẹ anh chị em bị hcc, tiền sử xơ gan gia đình | — |
| 4 | `tien_su_su_dung_thuoc_uc_che_mien_dich` | Tiền sử điều trị hóa trị ung thư, thuốc ức chế miễn dịch, Anti-CD20 hoặc Corticoid kéo dài | TC | ức chế miễn dịch, hóa trị liệu, anti-cd20, rituximab, corticoid kéo dài, tái hoạt hbv, đang dùng thuốc ucmd, chuẩn bị hóa trị ung thư | — |
| 5 | `tien_su_viem_gan_virus_b_c` | Tiền sử nhiễm vi rút viêm gan B mạn tính (HBsAg+) hoặc viêm gan C mạn tính (Anti-HCV+) | TC | viêm gan b, viêm gan c, hbv, hcv, hbsag dương tính, nhiễm hbv mạn, nhiễm hcv mạn, tiền sử viêm gan siêu vi | — |
| 6 | `tien_su_nghiem_ruou_bia` | Tiền sử lạm dụng rượu bia kéo dài (> 40-60g cồn/ngày trong > 5 năm) | TC | uống rượu, nghiện rượu, ald, tiêu thụ cồn, alcohol use, tiền sử uống rượu nhiều, xơ gan do rượu | — |
| 7 | `tien_su_gan_nhiem_mo_mash_masld` | Tiền sử Bệnh gan nhiễm mỡ chuyển hóa (MASLD / MASH), Đái tháo đường type 2, Béo phì | TC | mash, masld, gan nhiễm mỡ, đái tháo đường, béo phì, gan nhiễm mỡ thoái hóa xơ, hội chứng chuyển hóa | — |
| 8 | `tien_su_xuat_huyet_tieu_hoa_co_truong` | Tiền sử đã từng xuất huyết tiêu hóa do vỡ GEV hoặc từng xuất hiện Cổ trướng / SBP / Bệnh não gan | TC | tiền sử vỡ gev, tiền sử cổ trướng, tiền sử sbp, tiền sử bệnh não gan, đã từng xuất huyết tiêu hóa, đã từng mất bù | — |

---
*Tài liệu tự động tạo bởi: `tools/scripts/bundle-symptoms.mjs` — CliniPortal Knowledge Engineering Squad.*
