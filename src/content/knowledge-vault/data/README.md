# 📘 Hướng Dẫn Nạp & Chỉnh Sửa Tiêu Chuẩn Chẩn Đoán & Trọng Số CDSS

> **Tài liệu tham chiếu nội bộ:** Cẩm nang quản lý, thêm mới, biên tập dữ liệu bệnh lý, triệu chứng và ma trận trọng số suy luận lâm sàng (Evidence Base & CDSS) trong hệ sinh thái **CliniPortal**.

---

## 📑 Mục Lục
1. [Tổng Quan Kiến Trúc Dữ Liệu](#1-tổng-quan-kiến-trúc-dữ-liệu)
2. [Cách 1: Thao Tác Nhanh Trên Web UI (Export / Import JSON)](#2-cách-1-thao-tác-nhanh-trên-web-ui-export--import-json)
3. [Cách 2: Chỉnh Sửa Trực Tiếp Mã Nguồn CSDL (Khuyến Nghị Cho Dev)](#3-cách-2-chỉnh-sửa-trực-tiếp-mã-nguồn-csdl-khuyến-nghị-cho-dev)
   - [2.1. Cấu trúc tệp Bệnh lý (`diseases/*.json`)](#21-cấu-trúc-tệp-bệnh-lý-diseasesjson)
   - [2.2. Ma trận Trọng số & Vai trò chẩn đoán (`dd`)](#22-ma-trận-trọng-số--vai-trò-chẩn-đoán-dd)
   - [2.3. Khai báo Triệu chứng mới (`symptoms/*.json` & `clinical-rules-symptoms.json`)](#23-khai-báo-triệu-chứng-mới)
   - [2.4. Lệnh gom và đồng bộ Master KB](#24-lệnh-gom-và-đồng-bộ-master-kb)
4. [Cách 3: Nạp Thần Tốc Từ NotebookLM (Prompt 05 / 06 / 07 Script)](#4-cách-3-nạp-thần-tốc-từ-notebooklm-prompt-05--06--07-script)
5. [Bảng Kiểm An Toàn Dữ Liệu Trước Khi Commit (Checklist)](#5-bảng-kiểm-an-toàn-dữ-liệu-trước-khi-commit-checklist)

---

## 🏛️ 1. Tổng Quan Kiến Trúc Dữ Liệu

Màn hình **Kho tri thức y khoa & Suy luận diễn dịch (Evidence Base)** tại CliniPortal DocSpace hiển thị 2 nguồn tiêu chuẩn chẩn đoán:
- **Bộ luật CDSS cốt lõi (Core CDSS Rules):** Chứa các bệnh lý trọng tâm có tính toán xác suất thời gian thực, thang điểm và phác đồ phân bậc 4 tuyến.
- **Kho Chẩn Đoán CDSS (2.3):** 165+ bệnh lý mở rộng liên kết đối ứng với Kho Phác Đồ (2.4).

### Sơ đồ luồng dữ liệu hạt nhân:

```text
┌────────────────────────────────────────────────────────────────────────┐
│ 1. NGUỒN TRIỆU CHỨNG NGUYÊN TỬ (Atomic Symptoms Source)               │
│    symptoms/*.json (12 hệ cơ quan kèm mảng aliases & tuKhoa)           │
│    └─► Chạy: node tools/scripts/bundle-symptoms.mjs                    │
│        ├─► clinical-rules-symptoms.json (Runtime Web Engine)           │
│        └─► DOCSPACE_MASTER_SYMPTOM_DICTIONARY.md (Nạp vào NotebookLM)   │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│ 2. TIÊU CHUẨN GUIDELINE & MA TRẬN TRỌNG SỐ (Criteria & Weights)        │
│    enriched/<slug>.json (criteria[].symptomIds bám sát Guideline EBM)  │
│    diseases/*.json (9 chuyên khoa, dd ánh xạ từ symptomIds)            │
│    └─► Chạy: node tools/scripts/bundle-clinical-rules.mjs              │
│        └─► clinical-rules-kb.json (Master KB Bundle)                   │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│ 3. TRÌNH DIỄN & SUY LUẬN (Runtime Presentation & Inference Engine)    │
│    src/content/docspace/src/components/Step4KnowledgeBase.tsx          │
│    src/content/docspace/src/lib/clinicalEngine.ts                      │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 🚀 2. Cách 1: Thao Tác Nhanh Trên Web UI (Export / Import JSON)

Dành cho bác sĩ và chuyên gia lâm sàng muốn thử nghiệm nhanh mà không cần chỉnh sửa mã nguồn:

1. **Xuất cơ sở tri thức (Export):**
   - Truy cập tab **Kho tri thức** trên giao diện CliniPortal DocSpace.
   - Nhấp vào biểu tượng **Tải xuống (Download 📥)** ở góc trên bên phải thanh tiêu đề.
   - Tệp `medlens-kb-export-YYYY-MM-DD.json` sẽ được lưu về máy.
2. **Chỉnh sửa:**
   - Mở tệp `.json` bằng bất kỳ trình soạn thảo nào (VS Code, Notepad, Cursor).
   - Sửa các thông số: tên bệnh, mô tả, mảng `dd` (trọng số, vai trò), hoặc danh mục thuốc.
3. **Nạp lại (Import):**
   - Nhấp vào biểu tượng **Tải lên (Upload 📤)** cạnh nút Download.
   - Chọn tệp `.json` vừa chỉnh sửa.
   - Hệ thống sẽ nạp trực tiếp vào bộ nhớ ứng dụng và thông báo nạp thành công số lượng bệnh & triệu chứng.

---

## 🛠️ 3. Cách 2: Chỉnh Sửa Trực Tiếp Mã Nguồn CSDL (Khuyến Nghị Cho Dev)

### 2.1. Cấu trúc tệp Bệnh lý (`diseases/*.json`)

Dữ liệu bệnh lý cốt lõi được mô-đun hóa theo 9 chuyên khoa trong thư mục:  
📁 [`src/content/knowledge-vault/data/diseases/`](file:///i:/Drive%20c%E1%BB%A7a%20t%C3%B4i/apps/Apps_ykhoa/src/content/knowledge-vault/data/diseases/)

| Tệp chuyên khoa | Nội dung chính |
| :--- | :--- |
| [`ho-hap.json`](file:///i:/Drive%20c%E1%BB%A7a%20t%C3%B4i/apps/Apps_ykhoa/src/content/knowledge-vault/data/diseases/ho-hap.json) | Viêm phổi cộng đồng (CAP), COPD, Hen phế quản, Giãn phế quản... |
| [`tim-mach.json`](file:///i:/Drive%20c%E1%BB%A7a%20t%C3%B4i/apps/Apps_ykhoa/src/content/knowledge-vault/data/diseases/tim-mach.json) | Tăng huyết áp, Đau thắt ngực, Nhồi máu cơ tim, Suy tim... |
| [`tieu-hoa.json`](file:///i:/Drive%20c%E1%BB%A7a%20t%C3%B4i/apps/Apps_ykhoa/src/content/knowledge-vault/data/diseases/tieu-hoa.json) | Viêm gan, Xơ gan, Viêm tụy cấp, Xuất huyết tiêu hóa, GERD... |
| [`tiet-nieu.json`](file:///i:/Drive%20c%E1%BB%A7a%20t%C3%B4i/apps/Apps_ykhoa/src/content/knowledge-vault/data/diseases/tiet-nieu.json) | Tổn thương thận cấp (AKI), Suy thận mạn (CKD), Nhiễm trùng tiểu... |
| [`noi-tiet.json`](file:///i:/Drive%20c%E1%BB%A7a%20t%C3%B4i/apps/Apps_ykhoa/src/content/knowledge-vault/data/diseases/noi-tiet.json) | Đái tháo đường típ 2, Cơn DKA, Bão giáp, Suy giáp... |
| [`than-kinh.json`](file:///i:/Drive%20c%E1%BB%A7a%20t%C3%B4i/apps/Apps_ykhoa/src/content/knowledge-vault/data/diseases/than-kinh.json) | Đột quỵ thiếu máu não cục bộ cấp, Xuất huyết não... |
| [`toan-than.json`](file:///i:/Drive%20c%E1%BB%A7a%20t%C3%B4i/apps/Apps_ykhoa/src/content/knowledge-vault/data/diseases/toan-than.json) | Nhiễm khuẩn huyết / Sốc nhiễm khuẩn (Sepsis-3), Phản vệ... |
| [`san-phu-khoa.json`](file:///i:/Drive%20c%E1%BB%A7a%20t%C3%B4i/apps/Apps_ykhoa/src/content/knowledge-vault/data/diseases/san-phu-khoa.json) | Tiền sản giật / Sản giật... |
| [`truyen-nhiem.json`](file:///i:/Drive%20c%E1%BB%A7a%20t%C3%B4i/apps/Apps_ykhoa/src/content/knowledge-vault/data/diseases/truyen-nhiem.json) | Sốt xuất huyết Dengue, Sốt rét, Cúm mùa, Viêm màng não mủ... |

#### Mẫu một đối tượng bệnh lý chuẩn:
```json
{
  "id": "viem_phoi",
  "ten": "Viêm phổi mắc phải cộng đồng (CAP)",
  "icd": "J18.9",
  "nhom": "Hô hấp",
  "baoDong": true,
  "ghiChuBaoDong": "Khó thở SpO2 < 92%, suy hô hấp cấp, CURB-65 ≥ 3 điểm cần hồi sức ICU.",
  "tomTat": "Nhiễm trùng cấp tính nhu mô phổi xuất hiện ngoài bệnh viện. Khám ran nổ/ẩm khu trú, X-quang có đám mờ phế nang thâm nhiễm mới.",
  "danSo": {
    "gioiTinh": "any",
    "tuoiMin": 0,
    "tuoiMax": 120
  },
  "dd": [
    ["sot", 2.5, "dt"],
    ["ho_dam", 3.5, "dt"],
    ["kho_tho", 2.5, "gy"],
    ["dau_nguc_mang_phoi", 2.0, "gy"],
    ["ran_no", 3.5, "dt"],
    ["bc_tang", 2.0, "ht"],
    ["xq_phoi_tham_nhiem", 4.5, "dt"],
    ["crp_tang", 2.0, "ht"]
  ],
  "phacDo": {
    "tuyen": [
      "Ngoại trú (CURB-65 0-1): Amoxicillin/Clavulanate 1g x 2 lần/ngày ± Macrolide",
      "Nội trú (CURB-65 = 2): Ceftriaxone 1-2g IV/ngày + Azithromycin 500mg/ngày",
      "Hồi sức ICU (CURB-65 ≥ 3): Piperacillin/Tazobactam 4.5g q8h IV + Levofloxacin 750mg/ngày"
    ],
    "thuoc": [
      ["Amoxicillin/Clavulanate", "1g (875/125) x 2 lần/ngày (uống)", "Ngoại trú"],
      ["Ceftriaxone", "1g - 2g tiêm TM x 1 lần/ngày", "Nội trú khoa phòng"],
      ["Levofloxacin", "750mg IV x 1 lần/ngày", "Hồi sức tích cực"]
    ],
    "theoDoi": [
      "SpO2, nhịp thở, tri giác mỗi 4-6 giờ",
      "Nhiệt độ sau 48-72 giờ (đáp ứng kháng sinh)"
    ],
    "luuY": [
      "Cấy máu và đờm trước khi dùng liều kháng sinh đầu tiên",
      "Bắt đầu kháng sinh trong vòng 4 giờ đầu từ khi nhập viện"
    ],
    "nguon": ["Bộ Y Tế", "ATS/IDSA"]
  }
}
```

---

### 2.2. Ma trận Trọng số & Vai trò chẩn đoán (`dd`)

Mỗi phần tử trong mảng `"dd"` là một bộ 3 thông số: `[ "mã_triệu_chứng", trọng_số, "vai_trò" ]`

| Vai trò (`role`) | Badge UI | Màu sắc | Điểm số chuẩn | Ý nghĩa lâm sàng & EBM |
| :---: | :---: | :---: | :---: | :--- |
| **`dt`** | `đặc trưng` | Xanh dương | **`+3.5` ~ `+5.0`** | **Tiêu chuẩn vàng hoặc dấu ấn đặc hiệu cao**. Bắt buộc có hoặc có giá trị xác chẩn ($LR^+ > 10$). |
| **`gy`** | `gợi ý` | Vàng cam | **`+2.0` ~ `+3.0`** | **Dấu hiệu lâm sàng kinh điển / Triệu chứng cơ năng**. Định hướng nhóm bệnh cảnh. |
| **`ht`** | `hỗ trợ` | Xám nhạt | **`+1.0` ~ `+2.0`** | **Cận lâm sàng sàng lọc chung**. Phản ánh tình trạng viêm, rối loạn điện giải. |
| **`loaitru`** | `loại trừ` | Đỏ thẫm | **`-5.0`** | **Tiêu chuẩn loại trừ tuyệt đối**. Khi xuất hiện thì gần như không thể là bệnh này. |

> [!IMPORTANT]
> **Quy tắc Zero-Orphan Symptoms:** Mọi `"mã_triệu_chứng"` dùng trong `"dd"` bắt buộc phải tồn tại trong từ điển `clinical-rules-symptoms.json`. Không được dùng mã tự chế chưa khai báo.

---

### 2.3. Khai báo Triệu chứng mới

Nếu tiêu chuẩn chẩn đoán cần một triệu chứng, dấu hiệu hoặc xét nghiệm mới:

1. **Mở file theo hệ cơ quan tương ứng:**  
   📁 `src/content/knowledge-vault/data/symptoms/<he-co-quan>.json`  
   *(Ví dụ: `ho-hap.json`, `tim-mach.json`, `can-lam-sang.json`...)*
2. **Khai báo cấu trúc triệu chứng:**
```json
{
  "id": "procalcitonin_tang",
  "ten": "Procalcitonin > 0.5 ng/mL (Nhiễm trùng vi khuẩn nặng)",
  "nhom": "Cận lâm sàng",
  "loai": ["cls"],
  "tuKhoa": ["procalcitonin", "pct", "nhiễm khuẩn", "vi khuẩn"],
  "map": {
    "fld": "lPCT",
    "op": ">=",
    "val": 0.5
  }
}
```
* **Cơ chế tự suy (`"map"`):** Nếu cấu hình trường `map`, khi bác sĩ nhập số liệu sinh hiệu/xét nghiệm tại Bước 1, hệ thống sẽ tự động bật triệu chứng này:
  * `"fld"`: Trường giá trị (`vNhiet`, `vMach`, `vHATT`, `vHATTr`, `vTho`, `vSpo2`, `lBC`, `lTC`, `lHct`, `lGlu`, `lTrop`...).
  * `"op"`: Toán tử so sánh (`">="`, `">"`, `"<="`, `"<"`).
  * `"val"`: Ngưỡng số (hoặc `"valNam"`, `"valNu"` nếu phân biệt giới tính).

---

### 2.4. Lệnh gom và đồng bộ Master KB

Sau khi sửa đổi các tệp con trong `diseases/` hoặc `symptoms/`, bạn chạy 2 lệnh sau từ thư mục gốc dự án:

```powershell
# 1. Gom các tệp triệu chứng con vào clinical-rules-symptoms.json
node tools/scripts/bundle-symptoms.mjs

# 2. Gom các tệp bệnh lý con vào clinical-rules-kb.json
node tools/scripts/bundle-clinical-rules.mjs
```

Kiểm tra kết quả đầu ra:
- Terminal báo: `✅ Đã xuất thành công: X bệnh lý vào clinical-rules-kb.json`
- Terminal báo: `✅ Đã xuất thành công: Y triệu chứng vào clinical-rules-symptoms.json`

---

## 🤖 4. Cách 3: Nạp Thần Tốc Từ NotebookLM (Prompt 05 / 06 / 07 Script)

Dự án cung cấp công cụ tự động hóa bóc tách bài học từ Google NotebookLM:

1. **Chuẩn bị dữ liệu:** Dùng bộ Prompt Master trong [`src/content/docspace/docs/prompts/`](file:///i:/Drive%20c%E1%BB%A7a%20t%C3%B4i/apps/Apps_ykhoa/src/content/docspace/docs/prompts/):
   - **Prompt 05:** Enriched CDSS JSON Schema.
   - **Prompt 06:** Bảng ma trận trọng số lâm sàng & Ca mẫu.
   - **Prompt 07:** Bệnh án SOAP thực chiến Markdown.
2. **Chạy kịch bản 1-chạm (One-Click Ingester):**
   ```powershell
   node tools/scripts/docspace-oneclick-ingester.mjs "đường_dẫn_tệp_notebooklm_output.md"
   ```
   Script sẽ tự động:
   - Làm sạch HTML entities và chuẩn hóa chính tả y khoa.
   - Kiểm tra mã ICD-10 và rà quét chống trùng lặp.
   - Tự động bổ sung triệu chứng khuyết vào từ điển.
   - Ghi trực tiếp vào đúng tệp chuyên khoa trong `diseases/*.json`.

---

## ✅ 5. Bảng Kiểm An Toàn Dữ Liệu Trước Khi Commit (Checklist)

Trước khi commit dữ liệu mới lên Git, hãy đảm bảo:

- [ ] Tất cả mã triệu chứng trong mảng `dd` đều có trong [`clinical-rules-symptoms.json`](file:///i:/Drive%20c%E1%BB%A7a%20t%C3%B4i/apps/Apps_ykhoa/src/content/knowledge-vault/data/clinical-rules-symptoms.json).
- [ ] Không có mã bệnh trùng lặp (`"id"` duy nhất giữa các chuyên khoa).
- [ ] Mã ICD-10 chuẩn định dạng WHO (`J18.9`, `I10`, `E11`...).
- [ ] Vai trò chẩn đoán chỉ sử dụng 4 nhãn chuẩn: `"dt"`, `"gy"`, `"ht"`, `"loaitru"`.
- [ ] Trọng số âm chỉ áp dụng cho vai trò `"loaitru"` (thường là `-5.0`).
- [ ] Đã chạy `node tools/scripts/bundle-clinical-rules.mjs` thành công không có cảnh báo lỗi cú pháp JSON.
- [ ] Mở giao diện Web Tab **Kho tri thức**, thẻ bệnh lý hiển thị đúng màu chuyên khoa và danh sách tiêu chuẩn có huy hiệu tương ứng.
