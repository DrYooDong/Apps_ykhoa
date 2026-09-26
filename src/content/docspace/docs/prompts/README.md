# 🚀 BỘ 3 PROMPT THỰC CHIẾN TINH GỌN DOCSPACE (LEAN 3-PROMPT SUITE)

> **Hệ sinh thái**: CliniPortal DocSpace MedLens Pro  
> **Phiên bản**: 3.0 (Dynamic Clinical Branching Protocol Engine)  
> **Mục tiêu**: Tối giản hóa quy trình nạp tri thức từ NotebookLM/Y văn EBM cho **100+ Bệnh lý** mà không bị phân mảnh hay trùng lặp giao diện.

---

## 🌟 1. TỔNG QUAN HỆ THỐNG TINH GỌN (TỪ 11 PROMPTS ➔ 3 PROMPTS)

Trước đây hệ thống có 11 prompt rời rạc (Prompt 00-08 và các file nháp) khiến người biên soạn phải copy-paste nhiều lần cho 1 mặt bệnh.  
Từ phiên bản 3.0, toàn bộ quy trình biên soạn bệnh lý được chuẩn hóa thành **Bộ 3 Prompt Thực Chiến Cốt Lõi**:

```text
┌───────────────────────────────────────────────────────────────────────────────────────┐
│                      TÀI LIỆU NGUỒN Y KHOA TRONG NOTEBOOKLM                           │
│     (Hướng dẫn Bộ Y Tế, Phác đồ bệnh viện, Hướng dẫn WHO / CDC / IDSA / ACC / KDIGO)   │
└──────────────────────────────────────────┬────────────────────────────────────────────┘
                                           │
         ┌─────────────────────────────────┼─────────────────────────────────┐
         │                                 │                                 │
         ▼                                 ▼                                 ▼
┌─────────────────────────────┐ ┌─────────────────────────────┐ ┌─────────────────────────────┐
│    LEAN PROMPT 01           │ │    LEAN PROMPT 02           │ │    LEAN PROMPT 03           │
│  PHÁC ĐỒ PHÂN NHÁNH MASTER  │ │   CA MẪU & TRỌNG SỐ CDSS    │ │  HỒ SƠ CA THỰC CHIẾN SOAP   │
│                             │ │                             │ │                             │
│ • 6 Trục phân nhánh động    │ │ • Ca lâm sàng mẫu Bước 1    │ │ • S-O-A-P chuẩn quốc tế     │
│ • Tiêu chuẩn chẩn đoán      │ │ • Ma trận trọng số CDSS     │ │ • 4 Hạt ngọc lâm sàng       │
│ • Phác đồ chi tiết nhánh    │ │   (dt, gy, ht, loaitru)     │ │ • Bảng đặt vấn đề 3 tầng    │
│ • Dược lý & An toàn kê đơn  │ │ • Cập nhật từ điển TC       │ │ • Kế hoạch theo dõi cụ thể  │
│ ➔ Sinh: JSON Enriched       │ │ ➔ Sinh: JSON Ca & Trọng số  │ │ ➔ Sinh: Markdown Frontmatter│
└──────────────┬──────────────┘ └──────────────┬──────────────┘ └──────────────┬──────────────┘
               │                               │                               │
               ▼                               ▼                               ▼
       Nạp vào Bước 3 & 4             Nạp vào Bước 1 & 3             Nạp vào Bước 4 & Sổ tay
   (enriched/<slug>.json)         (sample-cases & rules)            (Nạp 1-chạm trên Web)
```

---

## 📋 2. BẢNG TRA CỨU BỘ 3 PROMPT CỐT LÕI

| STT | File Prompt | Mục Tiêu & Dữ Liệu Sinh Ra | Định Dạng | Nơi Lưu / Cách Nạp Vào Hệ Thống |
| :---: | :--- | :--- | :---: | :--- |
| **01** | [`01-prompt-phac-do-phan-nhanh.txt`](01-prompt-phac-do-phan-nhanh.txt) | **Master Phác đồ Phân nhánh Lâm sàng & Tiêu chuẩn CĐ**<br>• Cấu hình 6 trục phân nhánh lâm sàng (`severity`, `phenotype`, `triage_score`, `treatment_step`, `stage`, `comorbidity`)<br>• Phác đồ điều trị chi tiết theo từng nhánh (Bảng 4 cột, 6 đầu mục)<br>• Cảnh báo ranh giới, Chống chỉ định, Tương tác thuốc | **JSON** | Lưu vào:<br>`src/content/docspace/data/enriched/<slug>.json`<br><br>*Tự động đồng bộ bằng lệnh:*<br>`node tools/scripts/sync-clinical-db.mjs` |
| **02** | [`02-prompt-ca-mau-va-trong-so.txt`](02-prompt-ca-mau-va-trong-so.txt) | **Ca Mẫu Bước 1 & Ma Trận Trọng Số CDSS Bước 3**<br>• Ca bệnh mẫu đầy đủ sinh hiệu, triệu chứng chọn trước<br>• Ma trận suy luận lâm sàng (`dt`: đặc hiệu, `gy`: gợi ý, `ht`: hỗ trợ, `loaitru`: loại trừ)<br>• Khai báo triệu chứng mới vào từ điển | **JSON** | 1. Ca mẫu: nối vào `sample-clinical-cases.json`<br>2. Trọng số: nối vào `data/diseases/<khoa>.json`<br><br>*Tự động bundle bằng lệnh:*<br>`node tools/scripts/bundle-clinical-rules.mjs` |
| **03** | [`03-prompt-ho-so-ca-benh-soap.txt`](03-prompt-ho-so-ca-benh-soap.txt) | **Hồ Sơ Ca Bệnh Thực Chiến SOAP & Hạt Ngọc Lâm Sàng**<br>• Ca bệnh chuẩn cấu trúc S-O-A-P<br>• 4 Hạt ngọc lâm sàng (Pearls & Pitfalls)<br>• Bảng Đặt vấn đề 3 tầng (theo trường phái PGS.TS Hoàng Văn Sĩ)<br>• Phục vụ Hội chẩn AI tại giường | **Markdown** | **Cách 1 (Nhanh nhất):**<br>Mở Web DocSpace ➔ Bấm nút **"Nạp ca từ NotebookLM"** trên Header ➔ Dán Markdown vào.<br><br>**Cách 2 (Lưu vĩnh viễn):**<br>Lưu file `knowledge-vault/ba/soap-<slug>-01.md`<br>Chạy `node tools/scripts/ingest-notebooklm-case.mjs` |
| **04 (Phụ)** | [`04-prompt-trich-xuat-trieu-chung-symptoms.txt`](04-prompt-trich-xuat-trieu-chung-symptoms.txt) | **Trích Xuất Từ Điển Triệu Chứng Cụ Thể Của Bệnh**<br>• Trích xuất 100% triệu chứng cơ năng, thực thể, cận lâm sàng, cảnh báo<br>• Phân loại chuẩn xác vào 12 tệp hệ cơ quan (`symptoms/*.json`)<br>• Cấu hình quy tắc tự suy định lượng `map` từ sinh hiệu/xét nghiệm | **JSON** | Lưu tạm ra file JSON ➔ Tự động nạp bằng:<br>`node tools/scripts/ingest-disease-symptoms.mjs <file.json>`<br><br>*Tự động phân loại, lọc trùng & đồng bộ Master Dictionary.* |

---

## 🧭 3. HƯỚNG DẪN BIÊN SOẠN BỆNH LÝ MỚI (CHO 100+ BỆNH LÝ)

Khi bạn muốn biên soạn bất kỳ bệnh lý nào (ví dụ: Sốt xuất huyết Dengue, Suy tim cấp, Đợt cấp COPD, Viêm ruột thừa, Nhồi máu cơ tim, Sốc phản vệ...):

### 🔹 Bước 1: Mở NotebookLM & Chọn Tài Liệu Nguồn
1. Tải lên NotebookLM các tài liệu chuẩn (Hướng dẫn Bộ Y Tế, Phác đồ Bệnh viện Bạch Mai / Chợ Rẫy, Guidelines quốc tế).
2. Tải thêm file `DOCSPACE_MASTER_SYMPTOM_DICTIONARY.md` (nếu cần đối soát ID triệu chứng có sẵn).

### 🔹 Bước 2 (Tùy chọn): Chạy Prompt Phụ 04 — Nạp Từ Điển Triệu Chứng Đặc Thù
*Nếu bệnh lý này có các dấu hiệu lâm sàng, nghiệm pháp hoặc chỉ số cận lâm sàng đặc thù chưa có trong hệ thống:*
- Dán [`04-prompt-trich-xuat-trieu-chung-symptoms.txt`](04-prompt-trich-xuat-trieu-chung-symptoms.txt) vào NotebookLM.
- Lưu kết quả JSON ra file tạm (ví dụ `tools/scratch/symptoms_moi.json`).
- Chạy lệnh 1-chạm: `node tools/scripts/ingest-disease-symptoms.mjs tools/scratch/symptoms_moi.json`.

### 🔹 Bước 3: Chạy Tuần Tự Bộ 3 Prompt Cốt Lõi
1. **Chạy Prompt 01**:
   - Mở [`01-prompt-phac-do-phan-nhanh.txt`](01-prompt-phac-do-phan-nhanh.txt).
   - Điền 4 dòng thông số ở đầu (Tên bệnh, Chuyên khoa, ICD-10, Trục phân nhánh).
   - Dán vào NotebookLM ➔ Nhận về khối JSON ➔ Lưu thành `src/content/docspace/data/enriched/<slug>.json`.
2. **Chạy Prompt 02**:
   - Mở [`02-prompt-ca-mau-va-trong-so.txt`](02-prompt-ca-mau-va-trong-so.txt).
   - Dán vào NotebookLM ➔ Nhận về 2 khối JSON (Ca mẫu & Trọng số) ➔ Cập nhật vào hệ thống.
3. **Chạy Prompt 03**:
   - Mở [`03-prompt-ho-so-ca-benh-soap.txt`](03-prompt-ho-so-ca-benh-soap.txt).
   - Dán vào NotebookLM ➔ Nhận về bài viết Markdown SOAP ➔ Mở DocSpace nhấn nút **"Nạp ca từ NotebookLM"** để nạp 1-chạm!

### 🔹 Bước 4: Đồng Bộ & Kiểm Tra CSDL
Chạy lệnh kiểm định tự động từ terminal để xác nhận tính toàn vẹn 100%:
```powershell
node tools/scripts/sync-clinical-db.mjs
```

---

## 🔀 4. MA TRẬN 6 TRỤC PHÂN NHÁNH LÂM SÀNG (DYNAMIC BRANCHING)

Thay vì tạo nhiều tag rời rạc gây loãng dữ liệu, mỗi bệnh lý chỉ cần **1 file JSON duy nhất** và cấu hình các nhánh bên trong:

| Trục Phân Nhánh | Mã Trục | Định Nghĩa Y Khoa | Ví Dụ Ứng Dụng |
| :--- | :---: | :--- | :--- |
| **Phân độ nặng** | `severity` | Mức độ nghiêm trọng của bệnh | • **SXH Dengue**: Cổ điển ➔ Có dấu hiệu cảnh báo ➔ Sốc SXH Dengue<br>• **Viêm tụy cấp**: Nhẹ ➔ Vừa ➔ Nặng (Atlanta 2012) |
| **Thể lâm sàng** | `phenotype` | Các kiểu hình / Thể biểu hiện khác nhau | • **Viêm phổi**: Điển hình vs Không điển hình<br>• **Hội chứng mạch vành cấp**: STEMI vs NSTEMI vs Đau thắt ngực không ổn định |
| **Điểm phân loại nguy cơ** | `triage_score` | Phân nhánh dựa theo thang điểm lâm sàng | • **Viêm phổi**: CURB-65 (0-1: Ngoại trú, 2: Nội trú, $\ge$3: ICU)<br>• **Thuyên tắc phổi**: Thang điểm Wells / Geneva / PESI |
| **Bậc điều trị** | `treatment_step` | Bậc thang xử trí bậc cao dần | • **Hen phế quản**: GINA Step 1 ➔ Step 5<br>• **Đái tháo đường típ 2**: Đơn trị ➔ Phối hợp 2 thuốc ➔ Phối hợp 3 thuốc ➔ Insulin |
| **Giai đoạn tiến triển** | `stage` | Các giai đoạn theo thời gian của bệnh | • **Sốt xuất huyết Dengue**: Ngày 1-3 (Sốt) ➔ Ngày 4-6 (Nguy hiểm) ➔ Ngày 7-10 (Hồi phục)<br>• **Bệnh thận mạn**: Giai đoạn 1 ➔ Giai đoạn 5 |
| **Bệnh đồng mắc & Đối tượng đặc biệt** | `comorbidity` | Phác đồ cá thể hóa cho ca bệnh đặc thù | • Bệnh nhân có thai, Suy thận mạn (eGFR < 30), Suy gan nặng, Người cao tuổi đa bệnh lý |

---

## 🛠️ 5. CÁC CÔNG CỤ CLI HỖ TRỢ ĐỒNG BỘ DỮ LIỆU

| Lệnh CLI | Chức Năng |
| :--- | :--- |
| `node tools/scripts/sync-clinical-db.mjs` | **Audit & Đồng bộ tổng lực CSDL**: Kiểm tra toàn bộ file enriched, liên kết CDSS, cập nhật metadata và báo cáo lỗi nếu có. |
| `node tools/scripts/bundle-clinical-rules.mjs` | Đóng gói từ điển triệu chứng và quy tắc suy luận CDSS thành bundle tĩnh chạy offline. |
| `node tools/scripts/build-enriched-cdss.mjs` | Kiểm tra tính tương thích của các trường phác đồ, tương tác thuốc DDI và bảng 4 cột. |
| `node tools/scripts/ingest-notebooklm-case.mjs <file>` | Phân tích cú pháp file Markdown SOAP và nạp vào Knowledge Vault. |

---

## 💡 6. BÍ KÍP THỰC CHIẾN XỬ LÝ PHÁC ĐỒ ĐỒ SỘ (VÍ DỤ: SỐT XUẤT HUYẾT DENGUE)

### ⚠️ Giới hạn kỹ thuật của NotebookLM / LLM:
- **Đọc hiểu (Input)**: Rất lớn (hàng triệu tokens, đọc hết tài liệu hàng trăm trang của Bộ Y Tế).
- **Xuất bản (Output giới hạn)**: Thường dừng ở mức **4.000 – 8.000 tokens** (khoảng 400 – 600 dòng JSON).
- Với những bệnh lý có phác đồ đồ sộ như **Sốt xuất huyết Dengue**, **Viêm tụy cấp nặng**, **Nhiễm trùng huyết**: Toàn bộ file JSON hoàn chỉnh dài tới **hơn 1.400 dòng** (~80 KB). Nếu ép AI sinh trong 1 lượt trả lời, AI sẽ tự động **tóm tắt lướt qua** làm mất chi tiết y lệnh hoặc bị **ngắt cụt giữa chừng**!

### 🎯 2 Chiến Thuật Giải Quyết Triệt Để:

#### 👉 Chiến Thuật 1: Sinh Từng Nhánh (Branch-by-Branch Ingestion) — KHUYÊN DÙNG NHẤT
Nhờ kiến trúc Dynamic Branching đã module hóa các nhánh thành từng object độc lập trong mảng `branches: [ ... ]`, bạn hãy chia làm 2 lượt:
1. **Lượt 1 (Khung chung + Nhánh nhẹ)**:
   - Dán Prompt 01 và thêm ghi chú:
     > *"Hãy sinh phần Header chung, Tiêu chuẩn chẩn đoán criteria[] và chi tiết của Nhánh 1 (SXH Dengue cổ điển) & Nhánh 2 (SXH Dengue có cảnh báo)."*
2. **Lượt 2 (Nhánh nặng / Cấp cứu / ICU)**:
   - Chat tiếp ngay trong Notebook:
     > *"Bây giờ hãy viết tiếp object JSON chi tiết cho Nhánh 3 (Sốc SXH Dengue & Sốc SXH Dengue nặng) bao gồm toàn bộ phác đồ dịch truyền nấc thang, bảng 4 cột và y lệnh cấp cứu."*
3. **Ghép lại**:
   - Copy object Nhánh 3 dán vào mảng `branches` của file JSON. Cực kỳ nhanh, giữ nguyên 100% y lệnh chi tiết từng mililit dịch!

#### 👉 Chiến Thuật 2: Kỹ Thuật Lệnh "Tiếp Tục" (Khi bị dừng ngang)
- Nếu đang chạy mà thấy AI dừng lại giữa chừng (chưa đóng ngoặc `}`):
- Đừng yêu cầu nó viết lại từ đầu! Hãy gõ ngay vào khung chat:
  > *"tiếp tục viết tiếp đoạn mã JSON từ chỗ vừa dừng, không lặp lại đoạn trước"*
- AI sẽ viết tiếp phần còn lại $\rightarrow$ Bạn ghép 2 đoạn lại là hoàn chỉnh.

---

## 🔤 8. QUY CHUẨN VIẾT TẮT Y KHOA, KÝ TỰ SI & KHỬ TIỀN TỐ THỪA (COMPACT MEDICAL STANDARDS)

Để bảo đảm giao diện DocSpace luôn sắc nét, tinh gọn, không bị vỡ layout trên thiết bị di động và tối ưu hóa số lượng token của LLM, toàn bộ các Prompt và CSDL bắt buộc tuân thủ:

### 1. Viết tắt Y khoa Chuẩn mực (Strict Medical Abbreviations):
| Phân Nhóm | Từ Viết Tắt Chuẩn | Ý Nghĩa Lâm Sàng & Quy Cách |
| :--- | :--- | :--- |
| **Sinh hiệu & Khám** | `HA`, `HATT`, `HATTr`, `M`, `NT`, `SpO₂`, `CRT`, `GCS`, `BMI` | Chữ `SpO₂` bắt buộc viết hoa `O` và chỉ số dưới `₂`; `CRT` (đổ đầy mao mạch), `GCS` (Glasgow). |
| **Huyết học & Đông máu** | `Hct`, `PLT`, `WBC`, `RBC`, `Hb`, `INR`, `aPTT`, `PT`, `Fibrinogen` | `Hct` (chữ H hoa, ct thường); `PLT` (Tiểu cầu); `WBC` (Bạch cầu). |
| **Hóa sinh & Tạng** | `AST`, `ALT`, `GGT`, `eGFR`, `Cr` / `Creatinine`, `CRP`, `PCT`, `KMĐM` | `eGFR` (chữ e thường, GFR hoa); `KMĐM` (Khí máu động mạch). |
| **CĐHA & Thăm dò** | `XQ`, `SA`, `CT`, `MRI`, `ECG` | `XQ` (X-quang ngực thẳng); `SA` (Siêu âm); `ECG` (Điện tâm đồ). |
| **Vi sinh & Miễn dịch** | `NS1 Ag`, `RT-PCR`, `IgM`, `IgG` | Test nhanh ghi `NS1 Ag (+)`, `Dengue RNA (+)`. |
| **Bệnh học & Phân hệ** | `SXH` / `SXHD`, `DTH`, `TCCN`, `TCTT`, `CLS`, `DHST`, `TC`, `LDVV`, `ICU` | Tuyệt đối không viết tắt lóng kiểu chat (`ns1 pos`, `ha tut`). |
| **Đường dùng & Tần suất** | `IV`, `PO`, `SC`, `IM`, `TTM`, `Bolus`, `q1h`, `q2h`, `q4h`, `q6h`, `q8h`, `q12h`, `STAT` | `STAT` (Y lệnh khẩn cấp); `TTM` (Truyền tĩnh mạch); `q4h` (mỗi 4 giờ). |

### 2. Ký tự Toán học & Đơn vị SI Chuẩn (Typography & SI Units):
- **Toán tử so sánh**: Dùng `≥` (thay vì `>=`), `≤` (thay vì `<=`), `±` (thay vì `+/-`), `×` (dấu nhân thay vì `*` hoặc `x`).
- **Khử 100% rò rỉ HTML entities**: Viết trực tiếp `>`, `<`, `"`, `&` trong file JSON/Markdown, tuyệt đối không để lọt `&gt;`, `&lt;`, `&quot;`, `&amp;`.
- **Đơn vị SI y khoa**: Dùng `°C`, `µmol/L`, `µg`, `mL/kg/h`, `G/L` (thay vì `/mm³` hay `ngàn/mm3`), `mmol/L`, `mEq/L`, `UI`.

### 3. Tinh gọn Nhãn & Văn phong Y lệnh Thực chiến:
- **Lược bỏ tiền tố thừa**: Không đưa các cụm như `[Lâm sàng]: ...`, `[Cận lâm sàng]: ...`, `"Dấu hiệu cảnh báo: ..."`, `"Xét nghiệm: ..."` vào nhãn nút bấm hoặc tên tiêu chuẩn (`criteria.label`). Nhãn phải ngắn gọn, trực diện, nhấn mạnh ngưỡng định lượng (Ví dụ: `Cô đặc máu (Hct tăng ≥ 20% hoặc Hct > 45%)`, `Tiểu cầu giảm dốc đứng (< 100 G/L)`).
- **Văn phong y lệnh thực chiến**: Ngắn gọn, dứt khoát, súc tích (kiểu y lệnh quân đội/bệnh viện), tránh văn xuôi dài dòng rườm rà.

---

## 📦 9. LƯU TRỮ VẾT (ARCHIVE)

Các prompt phiên bản cũ (Prompt 00 đến 09 cũ) đã được di chuyển an toàn vào thư mục lưu trữ:
- 📁 **Đường dẫn**: `src/content/docspace/docs/prompts/archive/`
- Bạn luôn có thể tra cứu lại các prompt cũ tại thư mục này khi cần tham khảo lịch sử phát triển.


