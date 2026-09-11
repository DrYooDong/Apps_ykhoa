# 🚀 QUY TRÌNH CHUẨN NẠP KIẾN THỨC SXH DENGUE VÀO CLINIPORTAL DOCSPACE

> **Dành cho:** Bác sĩ / Biên tập viên sử dụng Google NotebookLM + Kho tài liệu SXH Dengue  
> **Thời gian ước tính:** 3–4 giờ (chia thành 8 bước, có thể thực hiện nhiều buổi)  
> **Trạng thái hiện tại (2026-09-11):**
>
> | Kho Tri Thức | File Đích | Tình Trạng |
> | :--- | :--- | :---: |
> | Kho Chẩn đoán (CD) | `CD_Sốt xuất huyết Dengue.md` | ✅ Đã có |
> | Kho Phác đồ (PDDT) | `PDDT_Sốt xuất huyết Dengue_P1.md`, `_P2.md` | ✅ Đã có |
> | Kho Dịch tễ (DTH) | `DTH_Sốt xuất huyết Dengue_P1.md` | ❌ Chưa có |
> | Kho Yếu tố nguy cơ (YTNC) | `YTNC_Sốt xuất huyết Dengue_P1.md` | ❌ Chưa có |
> | Kho Biến chứng (BC) | `BC_Sốt xuất huyết Dengue_P1.md` | ❌ Chưa có |
> | Kho Tư vấn (TV) | `TV_Sốt xuất huyết Dengue_P1.md` | ❌ Chưa có |
> | CSDL CDSS DocSpace | Entry JSON trong `kho-chan-doan-db.ts` | ❌ Còn placeholder |

---

## ⚡ CHUẨN BỊ TRƯỚC KHI BẮT ĐẦU

### 📦 Kiểm tra Notebook NotebookLM

Bạn cần 1 **Google NotebookLM project** đã nạp đủ tài liệu SXH Dengue. Tài liệu đề xuất nạp:

- `Bộ Y Tế VN. Quyết định 2760/QĐ-BYT 2023 — Hướng dẫn CĐBT SXH Dengue`
- `WHO. Dengue Guidelines for Diagnosis, Treatment, Prevention and Control 2025`
- `WHO. Laboratory testing for dengue virus (2024)`
- `CDC. Clinical Features of Zika, Chikungunya & Dengue (2024)`
- Sách giáo khoa Bệnh nhiệt đới — Trường ĐH Y Hà Nội / ĐH Y Dược TP.HCM

### ⚙️ Mỗi phiên làm việc: Bắt đầu bằng Master Instruction

Mỗi khi mở NotebookLM phiên mới, dán nội dung file này vào đầu chat TRƯỚC KHI chạy bất kỳ prompt nào:

```
📁 Mở file: d:\Apps\Apps_ykhoa\src\content\docspace\docs\prompts\00-master-system-instruction.txt
→ Sao chép toàn bộ → Dán vào ô chat NotebookLM
```

---

## BƯỚC 1 ✅ — NÂNG CẤP KHO CHẨN ĐOÁN (CD) ĐÃ CÓ

> **Tình trạng**: File `CD_Sốt xuất huyết Dengue.md` đã tồn tại, cần review và bổ sung nếu thiếu.

**Việc cần làm:**

1. Mở file hiện tại:

   ```
   d:\Apps\Apps_ykhoa\knowledge-vault\2.3. Kho chẩn đoán\Truyền nhiễm & Vi sinh\CD_Sốt xuất huyết Dengue.md
   ```

2. Kiểm tra file có đủ 6 phần không:
   - [ ] Bệnh sử & Triệu chứng lâm sàng (Giai đoạn 1–2–3)
   - [ ] Chiến lược cận lâm sàng (NS1, RT-PCR, Kháng thể IgM/IgG, Hematocrit, Tiểu cầu, Fibrinogen)
   - [ ] Tiêu chuẩn vàng & Bộ tiêu chí phân độ (Dengue/Dengue cảnh báo/Dengue nặng theo WHO 2009)
   - [ ] Bảng chẩn đoán phân biệt (Sốt rét, Sốt mò, Cúm, COVID-19, Nhiễm khuẩn huyết)
   - [ ] Lưu đồ thuật toán tiếp cận (theo ngày bệnh + mức độ)
   - [ ] Điểm ngọc lâm sàng & Cạm bẫy chẩn đoán

3. **Nếu cần bổ sung hoặc tạo lại**: Dùng **Prompt 01**:

   ```
   📁 d:\Apps\Apps_ykhoa\src\content\docspace\docs\prompts\01-prompt-cd-chan-doan.txt
   ```

   Điền vào `[YÊU CẦU ĐẦU VÀO]`:
   - Tên bệnh lý: `Sốt xuất huyết Dengue (SXHD)`
   - Chuyên khoa: `Truyền nhiễm & Vi sinh`
   - Guideline: `Quyết định 2760/QĐ-BYT 2023 / WHO Guidelines 2025`

4. Lưu output vào:

   ```
   d:\Apps\Apps_ykhoa\knowledge-vault\2.3. Kho chẩn đoán\Truyền nhiễm & Vi sinh\CD_Sốt xuất huyết Dengue.md
   ```

   *(Ghi đè file cũ nếu bổ sung, hoặc tạo `_P2.md` nếu nội dung quá dài)*

---

## BƯỚC 2 ✅ — NÂNG CẤP PHÁC ĐỒ ĐIỀU TRỊ (PDDT) ĐÃ CÓ

> **Tình trạng**: `PDDT_Sốt xuất huyết Dengue_P1.md` + `_P2.md` đã có. Cần review cập nhật.

**Việc cần làm:**

1. Kiểm tra P1 & P2 có đủ không:
   - [ ] Phân tầng 3 nhóm: Dengue thông thường → Dengue cảnh báo → Dengue nặng
   - [ ] Sơ đồ bù dịch từng giai đoạn (Ringer Lactate: tốc độ, thể tích, thay đổi theo Hct)
   - [ ] Bảng kê dịch truyền cụ thể (chọn lựa giữa Ringer Lactate, NaCl 0.9%, Dextran 40, Albumin)
   - [ ] Tiêu chuẩn truyền máu/tiểu cầu (Tiểu cầu < 50.000/µL với xuất huyết nặng)
   - [ ] Phác đồ xử trí Sốc Dengue (Dengue Shock Syndrome)
   - [ ] Tiêu chuẩn xuất viện & Theo dõi sau viện

2. Nếu cần bổ sung: Dùng **Prompt 02**:

   ```
   📁 d:\Apps\Apps_ykhoa\src\content\docspace\docs\prompts\02-prompt-pddt-phac-do.txt
   ```

   Điền:
   - Tên bệnh: `Sốt xuất huyết Dengue`
   - Chuyên khoa: `Truyền nhiễm & Vi sinh / Hồi sức Cấp cứu`
   - Guideline: `Quyết định 2760/QĐ-BYT 2023 / WHO Dengue 2025`

3. Lưu output vào:

   ```
   d:\Apps\Apps_ykhoa\knowledge-vault\2.4. Kho phác đồ điều trị\Truyền nhiễm & Vi sinh\PDDT_Sốt xuất huyết Dengue_P3.md
   ```

   *(Tạo P3 nếu có nội dung bổ sung, không ghi đè P1/P2)*

---

## BƯỚC 3 ❌ — TẠO MỚI KHO DỊCH TỄ HỌC (DTH)

> **Tình trạng**: Chưa có file DTH. Cần tạo mới.

**Việc cần làm:**

1. Dùng **Prompt 03**:

   ```
   📁 d:\Apps\Apps_ykhoa\src\content\docspace\docs\prompts\03-prompt-dth-dich-te.txt
   ```

   Điền:
   - Tên bệnh / Tác nhân: `Sốt xuất huyết Dengue / Vi rút Dengue (DEN-1 đến DEN-4)`
   - Chuyên khoa: `Truyền nhiễm & Vi sinh / Y tế Công cộng`
   - Nguồn số liệu: `WHO 2024 / GBD 2023 / Viện Pasteur TPHCM / Cục Y tế Dự phòng BYT`

2. Nội dung cần có:
   - Gánh nặng toàn cầu (số ca/năm, tử vong, DALYs)
   - Đặc điểm dịch tễ tại Việt Nam (thống kê TPHCM, ĐBSCL, miền Trung)
   - Tam giác dịch tễ: Tác nhân (4 serotype DEN) — Ký chủ — Môi trường
   - Véc-tơ Aedes aegypti (sinh học, thói quen đốt, bán kính hoạt động)
   - Thời gian ủ bệnh 4–10 ngày, Hệ số lây nhiễm R₀ ~ 1.3–6.3
   - Tính mùa vụ (cao điểm tháng 6–10 tại miền Nam VN)
   - Nhóm nguy cơ nặng (trẻ em < 15 tuổi, phụ nữ có thai, béo phì, Dengue lần 2)

3. Lưu output vào:

   ```
   d:\Apps\Apps_ykhoa\knowledge-vault\1.4. Kho dịch tễ học\Truyền nhiễm & Vi sinh\DTH_Sốt xuất huyết Dengue_P1.md
   ```

---

## BƯỚC 4 ❌ — TẠO MỚI KHO YẾU TỐ NGUY CƠ (YTNC)

> **Tình trạng**: Chưa có file YTNC. Cần tạo mới.

**Việc cần làm:**

1. Dùng **Prompt 04**:

   ```
   📁 d:\Apps\Apps_ykhoa\src\content\docspace\docs\prompts\04-prompt-ytnc-nguy-co.txt
   ```

   Điền:
   - Tên bệnh lý: `Sốt xuất huyết Dengue nặng`
   - Chuyên khoa: `Truyền nhiễm & Vi sinh`
   - Guideline: `WHO 2025 / Nghiên cứu Halstead, Gubler, Kyle & Harris`

2. Nội dung cần có:
   - Yếu tố nguy cơ tiến triển Dengue nặng: Nhiễm Dengue lần 2 (khác serotype - OR ~5-8), Trẻ < 15 tuổi, Béo phì/Thừa cân, Phụ nữ mang thai, Đái tháo đường
   - Yếu tố nguy cơ sốc: Nôn nhiều, Đau bụng dữ dội, Xuất huyết niêm mạc sớm, Gan to > 2cm
   - Dự phòng cá nhân (diệt muỗi, phòng muỗi đốt)
   - Vắc-xin Dengvaxia (CYD-TDV) / Qdenga (TAK-003): Chỉ định & Chống chỉ định

3. Lưu output vào:

   ```
   d:\Apps\Apps_ykhoa\knowledge-vault\1.5. Kho yếu tố nguy cơ\Truyền nhiễm & Vi sinh\YTNC_Sốt xuất huyết Dengue_P1.md
   ```

---

## BƯỚC 5 ❌ — TẠO MỚI KHO BIẾN CHỨNG (BC)

> **Tình trạng**: Chưa có file BC. Cần tạo mới.

**Việc cần làm:**

1. Dùng **Prompt 06**:

   ```
   📁 d:\Apps\Apps_ykhoa\src\content\docspace\docs\prompts\06-prompt-bc-bien-chung.txt
   ```

   Điền:
   - Tên bệnh lý: `Sốt xuất huyết Dengue`
   - Chuyên khoa: `Truyền nhiễm & Vi sinh / Hồi sức Cấp cứu`
   - Nguồn: `Quyết định 2760/QĐ-BYT 2023 / WHO Dengue 2025`

2. Nội dung cần có:

| Biến Chứng | Mốc Thời Gian | Dấu Hiệu Cảnh Báo Cần Bắt |
| :--- | :---: | :--- |
| Hội chứng Sốc Dengue (DSS) | Ngày 4–6 | Hct ↑ ≥ 20%, Mạch nhanh, HA tụt |
| Xuất huyết nặng (tiêu hóa, não) | Ngày 4–8 | Nôn ra máu, Tiêu phân đen, Rối loạn ý thức |
| Suy gan cấp / Viêm cơ tim | Ngày 5–8 | AST/ALT > 1000 U/L, Troponin tăng, ECG bất thường |
| Hội chứng tan máu tán huyết (HUS) | Ngày 6–10 | Creatinine tăng, Tiểu ít < 0.5 mL/kg/h |
| Quá tải dịch (volume overload) | Bất kỳ | Ran ẩm 2 đáy phổi, SpO2 tụt, Phù phổi cấp |

1. Lưu output vào:

   ```
   d:\Apps\Apps_ykhoa\knowledge-vault\2.5. Kho biến chứng\Truyền nhiễm & Vi sinh\BC_Sốt xuất huyết Dengue_P1.md
   ```

---

## BƯỚC 6 ❌ — TẠO MỚI KHO TƯ VẤN NGƯỜI BỆNH (TV)

> **Tình trạng**: Chưa có file TV. Cần tạo mới.

**Việc cần làm:**

1. Dùng **Prompt 07**:

   ```
   📁 d:\Apps\Apps_ykhoa\src\content\docspace\docs\prompts\07-prompt-tv-tu-van.txt
   ```

   Điền:
   - Tên bệnh lý: `Sốt xuất huyết Dengue`
   - Chuyên khoa: `Truyền nhiễm & Vi sinh`

2. Nội dung cần có (3 góc nhìn theo cấu trúc Teach-Back):
   - **Góc nhìn 1 - Bác sĩ giải thích**: "Sốt xuất huyết Dengue là bệnh do vi rút, muỗi Aedes aegypti truyền, không có thuốc đặc trị vi rút, điều trị chủ yếu là hỗ trợ triệu chứng"
   - **Góc nhìn 2 - Người bệnh cần nhớ**: Dấu hiệu cần đến BV ngay (Cảnh báo đỏ): Đau bụng dữ dội, Nôn ói liên tục, Chảy máu bất thường, Vật vã hốt hoảng hoặc Lơ mơ, Tay chân lạnh ẩm
   - **Góc nhìn 3 - Kế hoạch ra viện**: Tiêu chuẩn xuất viện, Lịch tái khám, Không dùng Aspirin/Ibuprofen, Uống đủ nước (ORS / Nước trái cây), Nghỉ ngơi, Phòng muỗi đốt trong giai đoạn phục hồi

3. Lưu output vào:

   ```
   d:\Apps\Apps_ykhoa\knowledge-vault\2.6. Kho tư vấn\Truyền nhiễm & Vi sinh\TV_Sốt xuất huyết Dengue_P1.md
   ```

---

## BƯỚC 7 ✅ — TẠO ENTRY CDSS JSON CHO DOCSPACE MEDLENS (ĐÃ HOÀN THÀNH)

> **Cải tiến quy trình mới**: Không cần mở file 23.000 dòng `kho-chan-doan-db.ts` nữa! Mỗi bệnh lý hiện nay được lưu thành **01 file JSON riêng biệt** trong thư mục `src/content/docspace/data/enriched/`.

**Quy trình chuẩn cho bệnh lý bất kỳ:**

1. Dùng **Prompt 08** (`08-prompt-db-entry-generator.txt`) dán vào NotebookLM/AI để sinh ra khối JSON chuẩn.
2. Lưu kết quả thành file JSON trong thư mục:

   ```text
   📁 d:\Apps\Apps_ykhoa\src\content\docspace\data\enriched\<ten_benh>.json
   ```

   *Ví dụ đã hoàn thành: `src/content/docspace/data/enriched/sot_xuat_huyet_dengue.json`*

3. Chạy lệnh đồng bộ tự động tại terminal:

   ```powershell
   node tools/scripts/build-enriched-cdss.mjs
   ```

   Hệ thống sẽ tự động quét, kiểm tra tính hợp lệ và kết nối bệnh lý mới vào `DIAGNOSTIC_CHAIN_DATABASE`.

---

## BƯỚC 8 — ĐỒNG BỘ HỆ THỐNG & KIỂM ĐỊNH CHẤT LƯỢNG

Sau khi hoàn thành tất cả các bước trên, chạy các lệnh sau trong Terminal tại thư mục gốc:

```bash
# Bước 8.1: Đồng bộ Vault Catalog toàn hệ thống
node tools/scripts/build-vault-catalog.js

# Bước 8.2: Kiểm tra tiến độ hoàn thiện CSDL CDSS
node tools/scripts/validate-kho-db.mjs

# Bước 8.3: Kiểm tra tính toàn vẹn HTML của giao diện DocSpace
npm run lint --prefix src/content/docspace
```

### Bảng Kiểm Hoàn Thành (Pre-Delivery Checklist)

Trước khi đánh dấu "Xong", kiểm tra từng hạng mục:

- [ ] `DTH_Sốt xuất huyết Dengue_P1.md` đã có trong `1.4. Kho dịch tễ học\Truyền nhiễm & Vi sinh\`
- [ ] `YTNC_Sốt xuất huyết Dengue_P1.md` đã có trong `1.5. Kho yếu tố nguy cơ\Truyền nhiễm & Vi sinh\`
- [ ] `BC_Sốt xuất huyết Dengue_P1.md` đã có trong `2.5. Kho biến chứng\Truyền nhiễm & Vi sinh\`
- [ ] `TV_Sốt xuất huyết Dengue_P1.md` đã có trong `2.6. Kho tư vấn\Truyền nhiễm & Vi sinh\`
- [x] Entry `sot_xuat_huyet_dengue.json` trong `src/content/docspace/data/enriched/` đã tạo và nạp thành công qua `build-enriched-cdss.mjs`
- [ ] Mỗi file `.md` đều có YAML frontmatter đầy đủ (title, icd10, specialty, kho, type, updated, sources)
- [ ] Không có câu mở đầu kiểu chatbot ("Chào bạn...", "Trong tài liệu này...")
- [ ] Mỗi file kết thúc bằng mục `## 📚 TRÍCH DẪN TÀI LIỆU THAM KHẢO CHUẨN EBM`
- [ ] `build-vault-catalog.js` chạy thành công (exit code 0)
- [x] `validate-kho-db.mjs` hiển thị số lượng placeholder giảm xuống (entry Dengue đã hoàn thiện trong enriched/)

---

## 📊 SƠ ĐỒ TÓM TẮT QUY TRÌNH

```
📂 KHO TÀI LIỆU SXH DENGUE (PDF)
           │
           ▼ (Tải lên NotebookLM)
🤖 GOOGLE NOTEBOOKLM
   │
   ├──[Bước 1] Prompt 01 → CD_Sốt xuất huyết Dengue.md ✅ (Review/cập nhật)
   │           → 2.3. Kho chẩn đoán\Truyền nhiễm & Vi sinh\
   │
   ├──[Bước 2] Prompt 02 → PDDT_Sốt xuất huyết Dengue_P3.md ✅ (Bổ sung nếu cần)
   │           → 2.4. Kho phác đồ\Truyền nhiễm & Vi sinh\
   │
   ├──[Bước 3] Prompt 03 → DTH_Sốt xuất huyết Dengue_P1.md ❌ (Tạo mới)
   │           → 1.4. Kho dịch tễ học\Truyền nhiễm & Vi sinh\
   │
   ├──[Bước 4] Prompt 04 → YTNC_Sốt xuất huyết Dengue_P1.md ❌ (Tạo mới)
   │           → 1.5. Kho yếu tố nguy cơ\Truyền nhiễm & Vi sinh\
   │
   ├──[Bước 5] Prompt 06 → BC_Sốt xuất huyết Dengue_P1.md ❌ (Tạo mới)
   │           → 2.5. Kho biến chứng\Truyền nhiễm & Vi sinh\
   │
   ├──[Bước 6] Prompt 07 → TV_Sốt xuất huyết Dengue_P1.md ❌ (Tạo mới)
   │           → 2.6. Kho tư vấn\Truyền nhiễm & Vi sinh\
   │
   └──[Bước 7] Prompt 08/09 → JSON entry TypeScript ✅ (Đã hoàn thành)
               → src/content/docspace/data/enriched/sot_xuat_huyet_dengue.json

           │
           ▼ [Bước 8] Đồng bộ hệ thống
   node tools/scripts/build-vault-catalog.js
   node tools/scripts/validate-kho-db.mjs
           │
           ▼
🌐 CLINIPORTAL DOCSPACE MEDLENS (Cập nhật đầy đủ)
```

---

## 💡 MẸO TIẾT KIỆM THỜI GIAN

1. **Chạy 2–3 prompt song song**: Mở nhiều tab NotebookLM, dán các prompt vào cùng lúc (Bước 3 + 4 + 5 chạy cùng lúc).
2. **Chia phiên**: Mỗi phiên làm việc nên hoàn thành 2–3 bước và lưu file ngay trước khi tắt.
3. **Dùng Prompt 08 sau cùng**: Prompt 08 tổng hợp từ tất cả kết quả trên, nên thực hiện sau khi có đủ nội dung từ Bước 1–6.
4. **Nếu NotebookLM trả về nội dung quá dài**: Chia nhỏ yêu cầu: "Tôi chỉ cần Mục 1 và 2 trước" → lưu → tiếp tục "Bây giờ tiếp tục từ Mục 3".
5. **Kiểm tra nhanh chất lượng**: Sau mỗi bước, ctrl+F tìm chữ "trong Notebook" hay "Tôi sẽ giúp bạn" trong file output — nếu thấy là vi phạm, cần yêu cầu AI viết lại.
