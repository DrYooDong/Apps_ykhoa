# 🚀 BỘ PROMPT CHUNG NẠP TRI THỨC BỆNH TRUYỀN NHIỄM VÀO "CHU TRÌNH LÂM SÀNG" DOCSPACE

> **Hệ thống**: CliniPortal DocSpace MedLens Pro  
> **Kiến trúc**: Dữ liệu cấu trúc tĩnh (Client-Side, Zero-Latency, Pure TypeScript/JSON + Markdown)  
> **Mô hình tri thức**: Hợp nhất tinh gọn — **4 Kho EBM Cốt Lõi** & **4 Bước Chu Trình Lâm Sàng Chuẩn Hóa**  
> **Cơ chế đồng bộ kép (MỚI)**: Mô hình 2 Tầng Phân Tách (Tiêu chuẩn Guideline EBM $\leftrightarrow$ Triệu chứng nguyên tử CDSS) kết nối qua **Bản đồ từ vựng tham chiếu** (`DOCSPACE_MASTER_SYMPTOM_DICTIONARY.md`) và **Bộ giải quyết bí danh thông minh** (`fuzzy-alias-resolver.mjs`).  
> **Phạm vi ứng dụng**: Toàn bộ chuyên khoa **Bệnh Truyền Nhiễm & Y Học Nhiệt Đới** (Infectious Diseases & Tropical Medicine) — từ các bệnh lưu hành nhiệt đới (Sốt xuất huyết, Sốt rét, Tay chân miệng), bệnh lây qua đường hô hấp (Cúm A/B, Sởi, Thủy đậu, Ho gà), bệnh lây qua đường tiêu hóa (Tiêu chảy cấp, Tả, Thương hàn), đến các cấp cứu nhiễm trùng đe dọa tính mạng (Nhiễm trùng huyết/Sốc nhiễm khuẩn, Uốn ván, Viêm màng não mủ, Viêm não Nhật Bản).

---

## 🌟 1. TỔNG QUAN KIẾN TRÚC HỢP NHẤT & CƠ CHẾ ĐỒNG BỘ KÉP NOTEBOOKLM

Hệ sinh thái tri thức CliniPortal DocSpace được thiết kế theo luồng xử lý khép kín, tự động hóa khử trùng lặp và đồng bộ hóa 2 chiều:

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        TÀI LIỆU NGUỒN Y KHOA TRONG NOTEBOOKLM                          │
│    • Tài liệu Guideline chuyên khoa (BYT, WHO, CDC, IDSA, Surviving Sepsis...)         │
│    • 📘 DOCSPACE_MASTER_SYMPTOM_DICTIONARY.md (Nạp từ Google Drive — Auto Sync)        │
└───────────────────────────────────────────┬────────────────────────────────────────────┘
                                            │
        ┌───────────────────────────────────┴───────────────────────────────────┐
        │                                                                       │
        ▼                                                                       ▼
┌────────────────────────────────────────┐   ┌──────────────────────────────────────────┐
│ NHÓM 1: PROMPT SINH CODE CHU TRÌNH     │   │ NHÓM 2: PROMPT SOẠN BÀI EBM VAULT        │
│ LÂM SÀNG (ĐỐI SOÁT TỪ ĐIỂN CHUẨN)      │   │ (4 KHO TRI THỨC HỢP NHẤT CỐT LÕI)        │
├────────────────────────────────────────┤   ├──────────────────────────────────────────┤
│ • Prompt 00: Master All-in-One Prompt  │   │ • Prompt 01: Kho Tiêu Chuẩn CĐ (CD)      │
│ • Prompt 05: Enriched CDSS JSON        │   │   (Lâm sàng, Vi sinh, Phân giai đoạn)    │
│   (criteria[].symptomIds đối chiếu)    │   │ • Prompt 02: Kho Phác Đồ (PDDT)          │
│ • Prompt 06: Ca Mẫu & Trọng Số CDSS    │   │   (Phác đồ đặc hiệu + Dược + Tư vấn)     │
│   (selected/dd lấy từ từ điển)         │   │ • Prompt 03: Kho Dịch Tễ Học (DTH)       │
│ • Prompt 07: Ca Thực Chiến SOAP MD     │   │   (Tam giác DTH + Chu kỳ lây + Vắc-xin)  │
│ • Prompt 08: Batch DB Enricher         │   │ • Prompt 04: Kho Biến Chứng (BC)         │
│                                        │   │   (Sốc, Suy tạng, Giờ vàng cấp cứu)      │
│ ➔ Tự động khử trùng qua                │   │                                          │
│    Fuzzy Alias Resolver                │   │ ➔ Sinh bài Markdown chuyên sâu           │
│ ➔ Sinh CODE nạp vào 4 Bước Lâm Sàng!   │   │    liên kết Pathway ở Bước 4             │
└────────────────────────────────────────┘   └──────────────────────────────────────────┘
                    │
                    ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│        BỘ NẠP 1 CHẠM: tools/scripts/docspace-oneclick-ingester.mjs                     │
│    ├─ Tự động phân giải Alias ngữ nghĩa (sot_cao -> sot, non_oi -> dau_bung_gan...)   │
│    ├─ Phân loại & đăng ký triệu chứng mới vào symptoms/<he>.json                      │
│    ├─ Tái tạo clinical-rules-symptoms.json & DOCSPACE_MASTER_SYMPTOM_DICTIONARY.md    │
│    └─ Kích hoạt 2 Quality Gates: Medical QA Gate (7 Pillars) & Vault Readiness        │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## ⚡ 2. BẢNG TRA CỨU NHÓM 1: PROMPT SINH CODE CHU TRÌNH LÂM SÀNG

Nhóm prompt này dùng để trích xuất **MÃ NGUỒN & DỮ LIỆU CẤU TRÚC (JSON / MARKDOWN)** từ các Guideline bệnh truyền nhiễm để nạp trực tiếp vào codebase của CliniPortal:

| STT | File Prompt | Loại Code Sinh Ra | Nơi Nạp / Lưu File Trong Dự Án | Quy Tắc Đối Soát Từ Điển Chuẩn Mới |
| :---: | :--- | :--- | :--- | :--- |
| **00** | [`00-master-prompt-nap-chu-trinh-lam-sang.txt`](00-master-prompt-nap-chu-trinh-lam-sang.txt) | **Tổng hợp 4 Khối Code**: CDSS JSON, Trọng số KB, Ca mẫu, SOAP MD | Theo hướng dẫn từng khối | **Chạy 1 lần duy nhất sinh toàn bộ gói dữ liệu lâm sàng 4 bước** cho bất kỳ bệnh truyền nhiễm nào |
| **05** | [`05-prompt-cdss-json-generator.txt`](05-prompt-cdss-json-generator.txt) | **Enriched CDSS JSON**<br>(Tiêu chuẩn chẩn đoán, Ngưỡng vi sinh/huyết học, `severityGrading`, `specialPopulations`, `timelinePhases` Bảng 3 cột định hướng vấn đề, `clinicalCautions`) | `src/content/docspace/data/enriched/<slug>.json`<br>*(Chạy `node tools/scripts/build-enriched-cdss.mjs`)* | **Bắt buộc có `symptomIds`, `cdssRole`, `weight`** trong từng tiêu chuẩn `criteria[]` đối soát từ `DOCSPACE_MASTER_SYMPTOM_DICTIONARY.md`. Nếu có triệu chứng mới thì khai báo trong `trieuChungMoi[]`. |
| **06** | [`06-prompt-sample-case-generator.txt`](06-prompt-sample-case-generator.txt) | **1. Ca bệnh mẫu JSON**<br>**2. Ma trận trọng số CDSS JSON** | 1. `src/content/knowledge-vault/data/sample-clinical-cases.json`<br>2. `data/symptoms/<he>.json` & `data/diseases/<chuyen-khoa>.json`<br>*(Chạy `node tools/scripts/bundle-clinical-rules.mjs`)* | **Mảng `selected`, `sel`, `negated` và `dd`** BẮT BUỘC chỉ dùng mã ID chuẩn từ từ điển hoặc lấy từ `symptomIds` của Prompt 05. Tuyệt đối không tự sáng tác mã mới cho triệu chứng đã có. |
| **07** | [`07-prompt-soap-case-ingest.txt`](07-prompt-soap-case-ingest.txt) | **Hồ sơ ca bệnh SOAP Markdown** | Nạp qua nút **"Nạp ca từ NotebookLM"** trên thanh Header (hoặc lưu `knowledge-vault/ba/`) | **Bước 4 (Mục 6)** & Sổ tay kinh nghiệm SOAP<br>Hiển thị ca thực chiến đối sánh đa chiều và cung cấp Prompt AI hội chẩn tại giường. Tự động khử sạch HTML entities. |
| **08** | [`08-prompt-db-batch-enricher.txt`](08-prompt-db-batch-enricher.txt) | **Làm giàu hàng loạt entry CSDL** | `src/content/docspace/data/kho-chan-doan-db.ts` | **Nâng cấp CSDL**<br>Thay thế các entry placeholder mẫu thành dữ liệu lâm sàng định lượng có `severityGrading` chuẩn cho bệnh truyền nhiễm. |

---

## 📚 3. BẢNG TRA CỨU NHÓM 2: PROMPT SOẠN BÀI KHO TRI THỨC (4 KHO HỢP NHẤT)

Nhóm prompt này dùng khi bạn muốn trích xuất các bài tổng quan y học chứng cứ chuyên sâu lưu vào **Knowledge Vault** để làm tài liệu đối sánh và liên kết trong Chuỗi Bệnh Học Đa Chiều (Clinical Pathway) ở Bước 4:

| Mã Kho | File Prompt | Chuyên Đề & Nội Dung Hợp Nhất Cho Bệnh Truyền Nhiễm | Kết Nối Chu Trình Lâm Sàng | File Đích Trong Knowledge Vault |
| :---: | :--- | :--- | :--- | :--- |
| **CD** | [`01-prompt-cd-chan-doan.txt`](01-prompt-cd-chan-doan.txt) | **Kho Tiêu Chuẩn Chẩn Đoán & Vi Sinh**<br>• Diễn tiến giai đoạn lâm sàng (Ủ bệnh, Khởi phát, Toàn phát, Hồi phục)<br>• Dấu hiệu lâm sàng kinh điển (Dát sẩn, phỏng nước, xuất huyết, màng giả, cứng gáy...)<br>• Xét nghiệm vi sinh/huyết thanh: Nuôi cấy, Kháng sinh đồ, PCR/RT-PCR, Test nhanh kháng nguyên, IgM/IgG MAC-ELISA<br>• Ngưỡng xét nghiệm phản ứng viêm: CBC, CRP, Procalcitonin, Ferritin, Lactate máu<br>• Bảng chẩn đoán phân biệt toàn diện theo hội chứng | **Bước 3**: Cung cấp tiêu chuẩn phân độ chẩn đoán định lượng (tuyệt đối không lẫn điều trị) | `knowledge-vault/2.3. Kho chẩn đoán/Truyền nhiễm/CD_{slug}_P1.md` |
| **PDDT** | [`02-prompt-pddt-phac-do.txt`](02-prompt-pddt-phac-do.txt) | **Kho Phác Đồ Điều Trị Toàn Diện** *(Cấu trúc chuẩn 6 Đầu mục & Bảng 3 Cột)*<br>• **Mục 1**: Phân loại cá thể hóa (1a Nặng nhẹ, 1b Biến chứng, 1c Đối tượng đặc biệt)<br>• **Mục 2 (Bảng 3 Cột định hướng vấn đề POMR)**: 1. Vấn đề (LS & CLS) \| 2. Phác đồ & y lệnh (Xử trí, Thuốc chuẩn, BHYT, DDI, chỉnh liều eGFR) \| 3. Theo dõi; Phân loại & Giai đoạn đưa lên trên; Biến chứng chung ở bảng riêng cuối Phần 2<br>• **Mục 3**: Lưu ý lâm sàng ([1] Cảnh báo, [2] CCĐ tuyệt đối, [3] Tiêu chuẩn xuất viện & chuyển tuyến, [4] Lưu ý Điều trị Đặc hiệu)<br>• **Mục 4**: Tư vấn Teach-Back 3 góc nhìn, 7 Cờ đỏ, bài trừ 5 sai lầm cộng đồng, dinh dưỡng<br>• **Mục 5**: Kiến thức NVYT (5a GPSL/SLB, 5b DTH/CD/BC/Dược, 5c Guidelines EBM & RCTs)<br>• **Mục 6**: Ca bệnh thực chiến SOAP Markdown & Prompt AI hội chẩn tại giường | **Bước 4**: Vận hành toàn diện 6 Đầu mục, Bảng 3 Cột y lệnh thuốc & Tư vấn Teach-Back | `knowledge-vault/2.4. Kho phác đồ điều trị/Truyền nhiễm/PDDT_{slug}_P1.md` |
| **DTH** | [`03-prompt-dth-dich-te.txt`](03-prompt-dth-dich-te.txt) | **Kho Dịch Tễ Học & Yếu Tố Nguy Cơ** *(Hợp nhất Dịch tễ + Nguy cơ)*<br>• **Tam giác dịch tễ**: Ký chủ (Host) - Tác nhân gây bệnh (Agent) - Môi trường & Véc-tơ (Environment & Vector)<br>• Đường lây truyền: Hô hấp (giọt bắn / không khí), Tiêu hóa (phân - miệng), Tiếp xúc máu / dịch thể, Côn trùng / véc-tơ truyền, Lây từ động vật (Zoonosis)<br>• Thông số dịch tễ: Hệ số lây nhiễm cơ bản $R_0$, tỷ lệ tấn công (Attack rate), tỷ lệ tử vong/mắc (Case Fatality Rate - CFR), chu kỳ mùa vụ, vùng lưu hành tại Việt Nam<br>• **Ma trận yếu tố nguy cơ EBM**: Trẻ sơ sinh, nhũ nhi, phụ nữ có thai, người cao tuổi, cơ địa suy giảm miễn dịch (HIV, tiểu đường, xơ gan, đang dùng corticoid/ức chế miễn dịch)<br>• Kiểm soát dịch thể: Giám sát ca bệnh, xử lý ổ dịch, tiêm chủng vắc-xin & điều trị dự phòng sau phơi nhiễm (PEP) | **Bước 1 & Bước 2**: Bổ sung bối cảnh dịch tễ học và vận hành Tam giác chẩn đoán gộp Đặt vấn đề | `knowledge-vault/1.4. Kho dịch tễ học/Truyền nhiễm/DTH_{slug}_P1.md` |
| **BC** | [`04-prompt-bc-bien-chung.txt`](04-prompt-bc-bien-chung.txt) | **Kho Biến Chứng & Cấp Cứu Truyền Nhiễm**<br>• Sốc nhiễm khuẩn (Septic Shock), suy đa tạng (MODS)<br>• Suy hô hấp cấp tiến triển (ARDS) do virus/vi khuẩn<br>• Viêm cơ tim cấp, rối loạn nhịp tim do độc tố<br>• Viêm não - màng não, phù não cấp, co giật kéo dài<br>• Xuất huyết ồ ạt, rối loạn đông máu nội mạch rải rác (DIC)<br>• Hội chứng bão Cytokine (Cytokine Storm Syndrome / HLH)<br>• Phác đồ xử trí cấp cứu "Giờ Vàng" & Y lệnh trực On-Call khẩn cấp | **Bước 3 & Bước 4**: Cảnh báo cờ đỏ & vận hành Mục 1b (Biến chứng) & Mục 3 (Cảnh báo) | `knowledge-vault/2.5. Kho biến chứng/Truyền nhiễm/BC_{slug}_P1.md` |

---

## 🎯 4. BẢNG THÔNG SỐ CẤU HÌNH SẴN CHO CÁC BỆNH TRUYỀN NHIỄM PHỔ BIẾN

Dưới đây là bộ thông số đầu vào chuẩn hóa sẵn (Presets) được ánh xạ chính xác theo **Mã ICD-10** và **Văn bản Hướng dẫn của Bộ Y Tế Việt Nam / Tổ chức Y tế Thế giới (WHO)**:

### 1. Tay Chân Miệng (Hand, Foot, and Mouth Disease - HFMD)
```text
- [TÊN BỆNH LÝ]: Tay chân miệng (HFMD)
- [TÊN TIẾNG ANH / VIẾT TẮT]: Hand, Foot, and Mouth Disease (HFMD - Enterovirus EV71 / Coxsackievirus A16)
- [MÃ ICD-10]: A08.4 (hoặc B08.4)
- [CHUYÊN KHOA]: Truyền nhiễm Nhi
- [MỨC ĐỘ NẶNG]: emergency
- [HƯỚNG DẪN THAM CHIẾU]: Quyết định 2958/QĐ-BYT ngày 05/07/2023 của Bộ Y Tế Việt Nam về Hướng dẫn chẩn đoán và điều trị bệnh Tay Chân Miệng
- [SLUG FILE]: tay_chan_mieng
- [ĐẶC THÙ PHÂN ĐỘ]: 4 Phân độ (Độ 1: Loét miệng, bóng nước da -> Độ 2a: Giật mình < 2 lần/30p, sốt > 2 ngày -> Độ 2b nhóm 1 & 2: Giật mình lúc khám, mạch nhanh, sốt cao khó hạ -> Độ 3: Thần kinh tự chủ, mạch > 170, vã mồ hôi, THA -> Độ 4: Sốc, phù phổi cấp, tím tái)
```

### 2. Cúm Mùa & Cúm A Ác Tính / Cúm Gia Cầm (Influenza)
```text
- [TÊN BỆNH LÝ]: Cúm mùa và Cúm ác tính (Cúm A/H1N1, A/H5N1, Cúm B)
- [TÊN TIẾNG ANH / VIẾT TẮT]: Seasonal & Avian Influenza (Flu A/H1N1, A/H5N1, Flu B)
- [MÃ ICD-10]: J09 (Cúm gia cầm / Cúm chủng mới), J10 (Cúm mùa xác định), J11 (Cúm nghi ngờ)
- [CHUYÊN KHOA]: Truyền nhiễm
- [MỨC ĐỘ NẶNG]: severe
- [HƯỚNG DẪN THAM CHIẾU]: Quyết định 2078/QĐ-BYT của Bộ Y Tế về Hướng dẫn chẩn đoán, điều trị cúm mùa và Hướng dẫn xử trí cúm gia cầm lây sang người / WHO Guidelines for Pharmacological Management of Pandemic Influenza
- [SLUG FILE]: cum_mua_cum_a
- [ĐẶC THÙ ĐIỀU TRỊ]: Cửa sổ vàng Oseltamivir trong 48 giờ đầu; phòng ngừa lây qua giọt bắn & khí dung; cảnh báo biến chứng ARDS và bội nhiễm phế cầu/tụ cầu
```

### 3. Sởi & Biến Chứng Sởi (Measles)
```text
- [TÊN BỆNH LÝ]: Sởi và các biến chứng sởi
- [TÊN TIẾNG ANH / VIẾT TẮT]: Measles (Rubeola)
- [MÃ ICD-10]: B05 (B05.0 Viêm não do sởi, B05.1 Viêm màng não, B05.2 Viêm phổi, B05.8 Biến chứng khác)
- [CHUYÊN KHOA]: Truyền nhiễm
- [MỨC ĐỘ NẶNG]: severe
- [HƯỚNG DẪN THAM CHIẾU]: Quyết định 1327/QĐ-BYT của Bộ Y Tế về Hướng dẫn chẩn đoán và điều trị bệnh Sởi & WHO Measles Outbreak Management Guidelines
- [SLUG FILE]: soi_va_bien_chung
- [ĐẶC THÙ ĐIỀU TRỊ]: Phác đồ Vitamin A liều cao theo nhóm tuổi (ngay khi chẩn đoán); cách ly nghiêm ngặt qua đường không khí (Airborne Precautions); phát hiện sớm viêm phổi kẽ và viêm tai giữa bội nhiễm
```

### 4. Sốt Rét Thông Thường & Sốt Rét Ác Tính (Malaria)
```text
- [TÊN BỆNH LÝ]: Sốt rét và Sốt rét ác tính
- [TÊN TIẾNG ANH / VIẾT TẮT]: Malaria (Plasmodium falciparum, P. vivax, Severe Malaria)
- [MÃ ICD-10]: B50 (Sốt rét do P. falciparum), B51 (P. vivax), B52 (P. malariae), B54 (Sốt rét không đặc hiệu)
- [CHUYÊN KHOA]: Truyền nhiễm
- [MỨC ĐỘ NẶNG]: emergency
- [HƯỚNG DẪN THAM CHIẾU]: Quyết định 2699/QĐ-BYT của Bộ Y Tế về Hướng dẫn chẩn đoán và điều trị bệnh Sốt rét & WHO Guidelines for Malaria 2023–2024
- [SLUG FILE]: sot_ret
- [ĐẶC THÙ ĐIỀU TRỊ]: Artesunate tiêm tĩnh mạch cho sốt rét ác tính; ACT đường uống (Dihydroartemisinin-Piperaquine) cho sốt rét thông thường; Primaquine diệt thể giao bào và thể ngủ gan (kiểm tra thiếu men G6PD); theo dõi hạ đường huyết và đái huyết sắc tố
```

### 5. Uốn Ván (Tetanus)
```text
- [TÊN BỆNH LÝ]: Uốn ván (Uốn ván người lớn và Uốn ván rốn sơ sinh)
- [TÊN TIẾNG ANH / VIẾT TẮT]: Tetanus (Clostridium tetani / Tetanus neonatorum)
- [MÃ ICD-10]: A35 (Uốn ván khác), A33 (Uốn ván sơ sinh)
- [CHUYÊN KHOA]: Truyền nhiễm
- [MỨC ĐỘ NẶNG]: emergency
- [HƯỚNG DẪN THAM CHIẾU]: Hướng dẫn chẩn đoán và điều trị bệnh Uốn ván của Bộ Y Tế / CDC Tetanus Clinical Management Protocols
- [SLUG FILE]: uon_van
- [ĐẶC THÙ ĐIỀU TRỊ]: Phân độ lâm sàng Ablett (Độ I nhẹ -> Độ IV tối cấp); Huyết thanh kháng độc tố uốn ván (SAT từ ngựa hoặc TIG từ người); Kháng sinh diệt vi khuẩn kỵ khí (Metronidazole); Kiểm soát co cứng và giật cứng (Diazepam, Magnesium sulfate, giãn cơ); Buồng bệnh cách ly ánh sáng và tiếng ồn; Chủ động mở khí quản sớm
```

### 6. Nhiễm Trùng Huyết & Sốc Nhiễm Khuẩn (Sepsis & Septic Shock)
```text
- [TÊN BỆNH LÝ]: Nhiễm khuẩn huyết và Sốc nhiễm khuẩn
- [TÊN TIẾNG ANH / VIẾT TẮT]: Sepsis and Septic Shock (Sepsis-3)
- [MÃ ICD-10]: A41.9 (Nhiễm khuẩn huyết không xác định), R65.2 (Hội chứng đáp ứng viêm hệ thống nặng / Sốc nhiễm khuẩn)
- [CHUYÊN KHOA]: Hồi sức - Cấp cứu
- [MỨC ĐỘ NẶNG]: emergency
- [HƯỚNG DẪN THAM CHIẾU]: Quyết định 5642/QĐ-BYT của Bộ Y Tế về Hướng dẫn chẩn đoán và điều trị nhiễm khuẩn huyết & Surviving Sepsis Campaign (SSC Guidelines 2021)
- [SLUG FILE]: nhiem_khuan_huyet_soc_nhiem_khuan
- [ĐẶC THÙ ĐIỀU TRỊ]: Gói 1 giờ (Hour-1 Bundle): Đo Lactate máu, Cấy máu trước khi dùng kháng sinh, Kháng sinh phổ rộng trong vòng 60 phút đầu, Bù dịch tinh thể 30 mL/kg khi tụt HA hoặc Lactate >= 4 mmol/L, Vận mạch Noradrenaline duy trì MAP >= 65 mmHg
```

### 7. Thủy Đậu & Biến Chứng (Varicella)
```text
- [TÊN BỆNH LÝ]: Thủy đậu và biến chứng thủy đậu
- [TÊN TIẾNG ANH / VIẾT TẮT]: Varicella (Chickenpox - Varicella-Zoster Virus / VZV)
- [MÃ ICD-10]: B01 (B01.0 Viêm màng não, B01.1 Viêm não, B01.2 Viêm phổi do thủy đậu, B01.8 Biến chứng khác)
- [CHUYÊN KHOA]: Truyền nhiễm
- [MỨC ĐỘ NẶNG]: standard
- [HƯỚNG DẪN THAM CHIẾU]: Hướng dẫn chẩn đoán và điều trị bệnh Thủy đậu của Bộ Y Tế & CDC Chickenpox Clinical Guidance
- [SLUG FILE]: thuy_dau
- [ĐẶC THÙ ĐIỀU TRỊ]: Acyclovir đường uống trong 24 giờ đầu phát ban ở đối tượng nguy cơ cao (thanh thiếu niên, người lớn, bệnh mạn tính); Acyclovir truyền tĩnh mạch khi có biến chứng nội tạng (viêm phổi, viêm não); Vệ sinh nốt đậu chống bội nhiễm tụ cầu/liên cầu (S. aureus, GAS); Theo dõi hội chứng Reye (chống chỉ định Aspirin)
```

### 8. Viêm Não Nhật Bản & Viêm Màng Não Mủ (JE & Bacterial Meningitis)
```text
- [TÊN BỆNH LÝ]: Viêm não Nhật Bản và Viêm màng não mủ cấp tính
- [TÊN TIẾNG ANH / VIẾT TẮT]: Japanese Encephalitis (JE) & Acute Bacterial Meningitis (ABM)
- [MÃ ICD-10]: A83.0 (Viêm não Nhật Bản), G00 (Viêm màng não do vi khuẩn: G00.1 Phế cầu, G00.2 Não mô cầu, G00.0 Hib)
- [CHUYÊN KHOA]: Truyền nhiễm
- [MỨC ĐỘ NẶNG]: emergency
- [HƯỚNG DẪN THAM CHIẾU]: Hướng dẫn chẩn đoán và điều trị Viêm não Nhật Bản & Viêm màng não của Bộ Y Tế / IDSA Clinical Practice Guidelines for Healthcare-Associated and Bacterial Meningitis
- [SLUG FILE]: viem_nao_mang_nao
- [ĐẶC THÙ ĐIỀU TRỊ]: Chọc dò dịch não tủy (CSF) khẩn cấp; Kháng sinh liều màng não đường tĩnh mạch (Ceftriaxone/Cefotaxime + Vancomycin); Dexamethasone trước hoặc cùng liều kháng sinh đầu tiên; Chống phù não bằng Manitol 20% hoặc Natri Clorid 3%; Kiểm soát co giật; Điều trị hỗ trợ hô hấp và hạ thân nhiệt chỉ huy nếu sốt cao liên tục
```

### 9. Tiêu Chảy Cấp Mất Nước (Rotavirus / Phẩy Khuẩn Tả / Trực Trùng)
```text
- [TÊN BỆNH LÝ]: Tiêu chảy cấp mất nước và Nhiễm trùng tiêu hóa
- [TÊN TIẾNG ANH / VIẾT TẮT]: Acute Watery Diarrhea & Dehydration (Rotavirus, Vibrio cholerae, Shigella)
- [MÃ ICD-10]: A08.0 (Viêm ruột do Rotavirus), A00 (Bệnh Tả), A03 (Lỵ trực trùng), A09 (Tiêu chảy nhiễm trùng không xác định)
- [CHUYÊN KHOA]: Truyền nhiễm Tiêu hóa & Nhi khoa
- [MỨC ĐỘ NẶNG]: severe
- [HƯỚNG DẪN THAM CHIẾU]: Quyết định 3574/QĐ-BYT về Hướng dẫn xử trí tiêu chảy cấp ở trẻ em & Hướng dẫn điều trị bệnh Tả của Bộ Y Tế / WHO The Treatment of Diarrhoea
- [SLUG FILE]: tieu_chay_cap_mat_nuoc
- [ĐẶC THÙ ĐIỀU TRỊ]: Phân loại 3 mức độ mất nước theo WHO (Không mất nước - Phác đồ A; Có mất nước - Phác đồ B; Mất nước nặng - Phác đồ C); Bù dịch bằng Oresol áp lực thẩm thấu thấp (ORS 245 mOsm/L); Bù dịch tĩnh mạch cấp cứu bằng Ringer Lactate 100 mL/kg; Bổ sung Kẽm (Zinc 10-20 mg/ngày trong 10-14 ngày); Kháng sinh chỉ định hạn chế (chỉ dùng khi nghi Tả, lỵ phân máu hoặc nhiễm Giardia/Amoeba)
```

### 10. Sốt Xuất Huyết Dengue (Dengue Hemorrhagic Fever)
```text
- [TÊN BỆNH LÝ]: Sốt xuất huyết Dengue
- [TÊN TIẾNG ANH / VIẾT TẮT]: Dengue Hemorrhagic Fever / Dengue Shock Syndrome (DHF / DSS)
- [MÃ ICD-10]: A97 (A97.0 SXHD không cảnh báo, A97.1 SXHD có cảnh báo, A97.2 SXHD nặng)
- [CHUYÊN KHOA]: Truyền nhiễm
- [MỨC ĐỘ NẶNG]: emergency
- [HƯỚNG DẪN THAM CHIẾU]: Quyết định 2760/QĐ-BYT ngày 04/07/2023 của Bộ Y Tế Việt Nam & WHO Dengue Guidelines 2024–2025
- [SLUG FILE]: sot_xuat_huyet_dengue
- [ĐẶC THÙ ĐIỀU TRỊ]: Nhận diện 3 giai đoạn (Sốt ngày 1-3 -> Nguy hiểm ngày 4-7 -> Hồi phục); Bù dịch tinh thể Ringer Lactate bậc thang theo cân nặng lý tưởng (IBW); Chỉ định dung dịch keo cao phân tử (Dextran 40, HES 130/0.4) khi tái sốc hoặc sốc thất bại với dịch tinh thể; Chống chỉ định tuyệt đối NSAIDs/Aspirin; Cảnh báo quá tải dịch trong giai đoạn hồi phục
```

---

## 🚀 5. QUY TRÌNH 5 BƯỚC NẠP BỆNH MỚI TỪ NOTEBOOKLM (SOP CHUẨN)

### Bước 1: Chuẩn Bị Tài Liệu & Đồng Bộ Từ Điển Trên Google Drive

1. Mở [Google NotebookLM](https://notebooklm.google.com/) và tạo Notebook mới (ví dụ: `CDSS_Tay_Chan_Mieng`).
2. Tải lên tài liệu Guideline chính thức (Quyết định Bộ Y Tế, WHO, CDC...).
3. **⭐ BƯỚC SỐNG CÒN — NẠP TỪ ĐIỂN TRIỆU CHỨNG THAM CHIẾU**:
   - Thêm nguồn từ **Google Drive** chọn file:  
     `src/content/knowledge-vault/data/DOCSPACE_MASTER_SYMPTOM_DICTIONARY.md`
   - File này chứa toàn bộ từ vựng chuẩn tắc, mã ID và các biến thể/aliases. AI sẽ dùng file này để đối chiếu, **tái sử dụng mã ID có sẵn** và không tự ý sáng tác ID gây trùng lặp.
4. Mở file [`00-master-system-instruction.txt`](00-master-system-instruction.txt), dán vào phần **Custom Instructions** để cố định vai trò Chuyên gia EBM và Kỹ sư CDSS.

### Bước 2: Chạy Prompt 05 Sinh Enriched CDSS JSON

1. Mở [`05-prompt-cdss-json-generator.txt`](05-prompt-cdss-json-generator.txt), điền khối thông số mặt bệnh (từ Mục 4) và dán vào NotebookLM.
2. AI sẽ đối chiếu tài liệu Guideline VÀ file từ điển `DOCSPACE_MASTER_SYMPTOM_DICTIONARY.md`:
   - Gán `symptomIds: ["ma_chuan_1", "ma_chuan_2"]` cho từng tiêu chuẩn trong `criteria[]`.
   - Gán `cdssRole: "dt" | "gy" | "ht" | "loaitru"` và `weight: number` (1.0 - 5.0).
   - Nếu có triệu chứng đặc thù mới chưa từng có trong từ điển $\to$ đề xuất trong mảng `trieuChungMoi[]`.
3. Nhận về khối JSON chuẩn của Prompt 05.

### Bước 3: Chạy Prompt 06 & 07 Sinh Ca Mẫu, Trọng Số CDSS & SOAP

1. Mở [`06-prompt-sample-case-generator.txt`](06-prompt-sample-case-generator.txt) (kèm [`07-prompt-soap-case-ingest.txt`](07-prompt-soap-case-ingest.txt)), điền thông số và dán vào NotebookLM.
2. AI sinh ra:
   - **Khối 1: Ca bệnh mẫu JSON** (với `selected`, `sel`, `negated` dùng mã ID chuẩn từ từ điển).
   - **Khối 2: Ma trận trọng số CDSS JSON** (`dd` dùng mã ID chuẩn bám sát `symptomIds` của Prompt 05).
   - **Khối 3: Hồ sơ ca thực chiến S-O-A-P Markdown** đầy đủ 4 góc nhìn chuẩn EBM.

### Bước 4: Nạp 1-Chạm Bằng Engine Thông Minh (One-Click Ingester)

Lưu toàn bộ nội dung xuất ra từ NotebookLM vào 1 file Markdown (ví dụ: `ND_Prompt 06,07.md`) hoặc file JSON, sau đó chạy lệnh 1-chạm:

```powershell
node tools/scripts/docspace-oneclick-ingester.mjs "src/content/docspace/docs/ND_Prompt 06,07.md"
```

**Cơ chế tự động hóa của One-Click Ingester:**
1. **Khử lỗi HTML entities**: Tự động chuyển `&gt;` $\to$ `>`, `&lt;` $\to$ `<`, `&amp;` $\to$ `&`...
2. **Fuzzy Alias Resolver**:
   - Đối chiếu từng triệu chứng trong `criteria[].symptomIds`, `selected`, `negated`, `dd`.
   - Nếu khớp với bí danh hoặc từ khóa đã có $\to$ tự động ánh xạ về mã ID chuẩn gốc.
   - Nếu thực sự mới $\to$ tự động xác định chuyên khoa và đăng ký vào `symptoms/<he>.json`.
3. **Đồng bộ hóa kép**:
   - Tự động chạy `bundle-symptoms.mjs` $\to$ Cập nhật cả `clinical-rules-symptoms.json` và `DOCSPACE_MASTER_SYMPTOM_DICTIONARY.md`. File Markdown trên Google Drive tự động cập nhật để các lần chạy NotebookLM tiếp theo ngày càng giàu từ vựng hơn!
   - Tự động chạy `bundle-clinical-rules.mjs` $\to$ Đồng bộ Master KB.
   - Tự động chạy `build-enriched-cdss.mjs` $\to$ Tái tạo `enriched/index.ts`.

### Bước 5: Kiểm Định Chất Lượng Bắt Buộc (7 Pillars Medical QA Gate)

Script ingester sẽ tự động kích hoạt bộ cổng kiểm định chất lượng:

```powershell
# Chạy thủ công nếu muốn kiểm tra độc lập:
node tools/qa/docspace-medical-qa-gate.mjs
```

**7 Trụ Cột Kiểm Định Y Khoa Bắt Buộc:**
```text
✅ [PILLAR 1] Zero-Orphan Symptoms Verification (100% triệu chứng trong dd & ca mẫu đều có trong từ điển)
✅ [PILLAR 2] Symptom Dictionary Deduplication & Multi-file Sync (Không trùng lặp ID, đủ tuKhoa)
✅ [PILLAR 3] CDSS Role Matrix Integrity (Chỉ chấp nhận: dt, gy, ht, loaitru)
✅ [PILLAR 4] Enriched Disease Schema & ICD-10 Cataloging (Đủ 14 trường tiêu chuẩn)
✅ [PILLAR 5] Clinical SOAP 4-Quadrant Architecture (Đủ S - O - A - P)
✅ [PILLAR 6] Clinical Humanizer & Anti-AI-ism Pass (Khử sạch văn phong AI sáo rỗng)
✅ [PILLAR 7] Alias Collision & Fuzzy Duplicate Detection Gate (Không xung đột bí danh giữa các triệu chứng)
```

---

## 🛡️ 6. NGUYÊN TẮC AN TOÀN LÂM SÀNG & EBM ĐẶC THÙ CHO BỆNH TRUYỀN NHIỄM

Khi biên soạn dữ liệu CDSS cho bệnh truyền nhiễm, AI và Bác sĩ biên tập bắt buộc phải tuân thủ 6 nguyên tắc an toàn lâm sàng bất di bất dịch:

> [!IMPORTANT]
> ### 1. Khai Thác Yếu Tố Dịch Tễ Là Điều Kiện Tiên Quyết
> Khác với bệnh nội khoa mạn tính, chẩn đoán bệnh truyền nhiễm phụ thuộc sống còn vào **Bối cảnh dịch tễ học**:
> - Vùng cư trú hoặc lịch sử di chuyển đến vùng dịch lưu hành trong vòng 14–28 ngày qua.
> - Tiền sử tiếp xúc người có triệu chứng tương tự (ổ dịch gia đình, trường học, nhà trẻ, bệnh viện).
> - Tiền sử côn trùng cắn (muỗi *Aedes*, muỗi *Anopheles*, bọ mò, ve rận) hoặc phơi nhiễm súc vật/gia cầm.
> - Tiền sử tiêm chủng vắc-xin bảo vệ (Sởi, Thủy đậu, Viêm não Nhật Bản, Ho gà, Uốn ván).

> [!WARNING]
> ### 2. Cửa Sổ Vàng Điều Trị Đặc Hiệu (Golden Treatment Window)
> Thuốc kháng virus và huyết thanh kháng độc tố chỉ đạt hiệu quả tối ưu khi được sử dụng sớm:
> - **Oseltamivir**: Tối ưu trong vòng 48 giờ đầu kể từ khi khởi phát triệu chứng cúm.
> - **Acyclovir**: Tối ưu trong vòng 24–72 giờ đầu kể từ khi nốt đậu/phỏng nước xuất hiện.
> - **SAT / TIG (Uốn ván)**: Phải tiêm bắp trung hòa độc tố tự do ngay trước khi xử lý phẫu thuật vết thương.
> - **Kháng sinh trong Sốc nhiễm trùng**: Bắt buộc tiêm tĩnh mạch liều đầu tiên trong vòng **60 phút** kể từ khi nhận diện (Hour-1 Bundle).

> [!CAUTION]
> ### 3. Nguyên Tắc Quản Lý Kháng Sinh (Antimicrobial Stewardship)
> - Luôn chỉ định lấy bệnh phẩm vi sinh (cấy máu, cấy đờm, cấy dịch não tủy, phết họng) **TRƯỚC KHI** bắt đầu liều kháng sinh đầu tiên.
> - Phân định rõ ràng giữa **Liệu pháp kháng sinh theo kinh nghiệm (Empirical Therapy)** dựa trên dịch tễ/mức độ nặng và **Liệu pháp xuống thang theo kháng sinh đồ (De-escalation)** sau 48–72 giờ.

> [!NOTE]
> ### 4. Phân Định Rõ Ràng Giữa Bước 3 (Chẩn Đoán/Phân Độ) & Bước 4 (Xử Trí/Điều Trị)
> - Tại **Bước 3**: Chỉ tập trung vào bộ tiêu chuẩn nhận diện mức độ nặng (`criteria`: [Lâm sàng], [Cận lâm sàng], [Tiêu chuẩn an toàn], [Dấu hiệu cảnh báo]). Tuyệt đối không đưa y lệnh thuốc, dịch truyền hay mục tiêu huyết áp vào Bước 3.
> - Tại **Bước 4**: Chuyển giao toàn bộ quyết định can thiệp sang **Bảng 3 Cột định hướng vấn đề** (`timelinePhases`) và **6 Đầu mục điều trị chuẩn hóa**.

> [!TIP]
> ### 5. Kiểm Soát Nhiễm Khuẩn & Cảnh Báo Khai Báo Dịch Bệnh
> Trong mục tư vấn và dặn dò (Mục 4 Bước 4), luôn bao gồm:
> - Phân loại biện pháp phòng ngừa lây nhiễm: **Phòng ngừa chuẩn (Standard)**, **Đường tiếp xúc (Contact)**, **Giọt bắn (Droplet)**, hoặc **Đường không khí (Airborne)**.
> - Nhắc nhở khai báo bệnh truyền nhiễm thuộc nhóm A, B, C theo quy định tại **Thông tư 54/2015/TT-BYT** của Bộ Y Tế.

> [!IMPORTANT]
> ### 6. Quy Tắc Phân Tầng Lâm Sàng Động (Dynamic Clinical Staging)
> Tuyệt đối không gò ép mọi bệnh lý vào mô hình cố định. Mảng `severityGrading` là mảng động (2, 3, hoặc 4-5 bậc) tùy theo hướng dẫn chính thức của Bộ Y Tế và WHO.

---

## 🤖 7. HỆ THỐNG SKILLS & AI AGENT CHUYÊN TRÁCH DOCSPACE

Nhằm tự động hóa hoàn toàn quy trình xử lý, kiểm định chất lượng và tích hợp tri thức y khoa từ các prompt trên vào CliniPortal DocSpace, hệ thống thiết lập các Squad chuyên biệt trong `.agents/skills/`:

| Phân hệ / Nhiệm vụ | Đội ngũ AI Agent Squad | Kích hoạt Skill | Nhiệm vụ chuyên môn cốt lõi |
| :---: | :--- | :--- | :--- |
| **Nạp thần tốc 1-chạm** | **One-Click Ingest Squad** | `.agents/skills/docspace-oneclick-ingest-agent/` | Điều phối nạp Prompt 05, 06, 07, tự động khử HTML entities, kích hoạt Fuzzy Resolver và chạy 2 Quality Gates. |
| **Bước 1 Tiếp nhận** | **Step 1 Ingestion Squad** | `.agents/skills/docspace-step1-ingestion-squad/` | Tiếp nhận ca bệnh, đo lường sinh hiệu, trích xuất triệu chứng (CN, TT, TC, CLS) và bối cảnh dịch tễ học vùng lưu hành. |
| **Bước 2 Suy luận** | **Step 2 Reasoning Squad** | `.agents/skills/docspace-step2-reasoning-squad/` | Tóm tắt bệnh án EMR ngắt dòng, đặt vấn đề 3 tầng ưu tiên (Hoàng Văn Sĩ), kích hoạt EpiBoost tam giác dịch tễ. |
| **Bước 3 Động cơ CDSS** | **Step 3 CDSS Squad** | `.agents/skills/docspace-step3-cdss-squad/` | Động cơ suy luận CDSS & Ma trận trọng số (`dt`, `gy`, `ht`, `loaitru`), thang điểm cảnh báo sớm (NEWS2, PEWS, ESI), tiêu chuẩn vàng. |
| **Bước 4 Phác đồ điều trị** | **Step 4 Protocol Squad** | `.agents/skills/docspace-step4-protocol-squad/` | Vận hành 6 Đầu mục phác đồ điều trị chi tiết, Bảng 3 Cột định hướng vấn đề lộ trình từng ngày (`timelinePhases`) & xuất EMR chuẩn HIS. |
| **Kiểm định dữ liệu & Lọc trùng** | **Clinical Data QA Squad** | `.agents/skills/docspace-clinical-data-qa-squad/` | Rà soát từ điển triệu chứng, bảo toàn Zero-Orphan Symptoms, giám sát xung đột bí danh (Alias Collision). |
| **Kiểm định Y học chứng cứ** | **Medical QA Squad** | `.agents/skills/docspace-medical-qa-squad/` | Vận hành Medical QA Gate 7 Trụ cột (EBM 2026), kiểm tra ma trận vai trò CDSS và cấu trúc Enriched Schema. |

---

*Tài liệu hướng dẫn vận hành chuẩn hóa — CliniPortal DocSpace Engineering Squad.*
