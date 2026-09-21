# 🚀 BỘ PROMPT CHUNG NẠP TRI THỨC BỆNH TRUYỀN NHIỄM VÀO "CHU TRÌNH LÂM SÀNG" DOCSPACE

> **Hệ thống**: CliniPortal DocSpace MedLens Pro  
> **Kiến trúc**: Dữ liệu cấu trúc tĩnh (Client-Side, Zero-Latency, Pure TypeScript/JSON + Markdown)  
> **Mô hình tri thức**: Hợp nhất tinh gọn — **4 Kho EBM Cốt Lõi** & **4 Bước Chu Trình Lâm Sàng Chuẩn Hóa**  
> **Phạm vi ứng dụng**: Toàn bộ chuyên khoa **Bệnh Truyền Nhiễm & Y Học Nhiệt Đới** (Infectious Diseases & Tropical Medicine) — từ các bệnh lưu hành nhiệt đới (Sốt xuất huyết, Sốt rét, Tay chân miệng), bệnh lây qua đường hô hấp (Cúm A/B, Sởi, Thủy đậu, Ho gà), bệnh lây qua đường tiêu hóa (Tiêu chảy cấp, Tả, Thương hàn), đến các cấp cứu nhiễm trùng đe dọa tính mạng (Nhiễm trùng huyết/Sốc nhiễm khuẩn, Uốn ván, Viêm màng não mủ, Viêm não Nhật Bản).

---

## 🌟 1. TỔNG QUAN KIẾN TRÚC HỢP NHẤT & CHU TRÌNH LÂM SÀNG 4 BƯỚC

Hệ sinh thái tri thức CliniPortal DocSpace được thiết kế theo luồng xử lý khép kín:  
**Tài liệu Guideline Y khoa nguồn trong NotebookLM** $\to$ **Dữ liệu CDSS / EBM có cấu trúc** $\to$ **4 Bước Chu Trình Lâm Sàng Tương Tác**:

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        TÀI LIỆU NGUỒN Y KHOA TRONG NOTEBOOKLM                          │
│    (Quyết định Bộ Y Tế Việt Nam, Hướng dẫn WHO, CDC, IDSA, Surviving Sepsis...)        │
└───────────────────────────────────────────┬────────────────────────────────────────────┘
                                            │
       ┌────────────────────────────────────┴────────────────────────────────────┐
       │                                                                         │
       ▼                                                                         ▼
┌─────────────────────────────────────────┐   ┌──────────────────────────────────────────┐
│ NHÓM 1: PROMPT SINH CODE NẠP VÀO        │   │ NHÓM 2: PROMPT SOẠN BÀI EBM VAULT        │
│ "CHU TRÌNH LÂM SÀNG" DOCSPACE           │   │ (4 KHO TRI THỨC HỢP NHẤT CỐT LÕI)        │
├─────────────────────────────────────────┤   ├──────────────────────────────────────────┤
│ • Prompt 00: Master All-in-One Prompt   │   │ • Prompt 01: Kho Tiêu Chuẩn CĐ (CD)      │
│ • Prompt 05: Enriched CDSS JSON         │   │   (Lâm sàng, Vi sinh, Phân giai đoạn)    │
│ • Prompt 06: Ca Mẫu & Trọng Số CDSS     │   │ • Prompt 02: Kho Phác Đồ (PDDT)          │
│ • Prompt 07: Ca Thực Chiến SOAP MD      │   │   (Phác đồ đặc hiệu + Dược + Tư vấn)     │
│ • Prompt 08: Batch DB Enricher          │   │ • Prompt 03: Kho Dịch Tễ Học (DTH)       │
│                                         │   │   (Tam giác DTH + Chu kỳ lây + Vắc-xin)  │
│ ➔ Sinh CODE nạp trực tiếp vào App       │   │ • Prompt 04: Kho Biến Chứng (BC)         │
│    để vận hành 4 Bước Lâm Sàng!         │   │   (Sốc, Suy tạng, Giờ vàng cấp cứu)      │
│                                         │   │                                          │
│                                         │   │ ➔ Sinh bài Markdown chuyên sâu           │
│                                         │   │    liên kết Pathway ở Bước 4             │
└─────────────────────────────────────────┘   └──────────────────────────────────────────┘
                                            │
                                            ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│              CHU TRÌNH LÂM SÀNG 4 BƯỚC THỰC CHIẾN CHO BỆNH TRUYỀN NHIỄM                │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ • BƯỚC 1: TIẾP NHẬN DỮ LIỆU & CA BỆNH MẪU DỊCH TỄ HỌC                                  │
│   - Nạp triệu chứng (+) & (-) kèm Sinh hiệu, Xét nghiệm vi sinh/huyết học, Tiền căn.   │
│   - Ca mẫu truyền nhiễm: Khai thác rõ yếu tố phơi nhiễm, ổ dịch, mùa vụ, vùng lưu      │
│     hành dịch tễ, tiền sử tiêm chủng vắc-xin, thời gian ủ bệnh (incubation period).    │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ • BƯỚC 2: TÓM TẮT BỆNH ÁN & TAM GIÁC CHẨN ĐOÁN DỊCH TỄ HỌC                             │
│   - Tóm tắt bệnh án chuẩn hóa: Trình bày ngắt dòng trực quan, dễ scan theo hội chứng.   │
│   - Gộp chung Tam giác chẩn đoán (Ký chủ - Host, Tác nhân - Agent, Môi trường - Envi)  │
│     vào Đặt vấn đề: Tự động kích hoạt tính năng "Epidemiology Boost" tăng độ nhạy.     │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ • BƯỚC 3: ĐỘNG CƠ SUY LUẬN & TIÊU CHUẨN PHÂN ĐỘ LÂM SÀNG (SEVERITY STAGING)             │
│   - Bộ thang điểm cảnh báo sớm: NEWS2 (Người lớn), PEWS (Nhi khoa), ESI (Cấp cứu),     │
│     qSOFA / SOFA (Nhiễm trùng huyết).                                                  │
│   - Tiêu chuẩn phân độ bóc tách chuẩn EBM: [Lâm sàng], [Cận lâm sàng / Vi sinh],       │
│     [Tiêu chuẩn an toàn], [Dấu hiệu cảnh báo đỏ].                                      │
│   - 🛑 Nguyên tắc: Tuyệt đối không để lẫn phần xử trí hay mục tiêu sinh hiệu ở Bước 3!  │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ • BƯỚC 4: PHÁC ĐỒ ĐIỀU TRỊ TOÀN DIỆN (6 ĐẦU MỤC CHUẨN HÓA & BẢNG 3 CỘT ĐỊNH HƯỚNG VẤN ĐỀ)│
│   - Header tối giản & Dropdown chuyên khoa/bệnh; thanh tiến độ (%) & xuất EMR chuẩn HIS. │
│   - 6 Đầu mục chuẩn hóa loại bỏ 100% trùng lặp:                                        │
│     Mục 1 (Phân loại cá thể hóa: 1a Phân độ nặng, 1b Biến chứng, 1c Đối tượng đặc biệt)  │
│     ➔ Mục 2 (Phác đồ chi tiết - BẢNG 3 CỘT: 1. Vấn đề [LS & CLS]                       │
│              | 2. Phác đồ & y lệnh [Thuốc, BHYT, DDI, eGFR] | 3. Theo dõi;              │
│              Phân loại & Giai đoạn đưa lên trên; Biến chứng chung đặt ở bảng riêng)     │
│     ➔ Mục 3 (Lưu ý lâm sàng: [1] Cảnh báo quan trọng, [2] Chống chỉ định tuyệt đối,     │
│              [3] Tiêu chuẩn xuất viện/chuyển tuyến, [4] Lưu ý Điều trị Đặc hiệu)        │
│     ➔ Mục 4 (Vấn đề người bệnh quan tâm: Tư vấn Teach-Back 3 góc nhìn, 7 Cờ đỏ,         │
│              5 Sai lầm cộng đồng cần bài trừ, Dinh dưỡng & Hồi phục)                    │
│     ➔ Mục 5 (Kiến thức cho NVYT: 5a Cơ sở GPSL/SLB, 5b Lâm sàng DTH/CD/BC/Dược,         │
│              5c Guidelines EBM & Landmark Trials)                                       │
│     ➔ Mục 6 (Các ca bệnh liên quan: Hồ sơ thực chiến SOAP Markdown & Prompt AI).        │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## ⚡ 2. BẢNG TRA CỨU NHÓM 1: PROMPT SINH CODE CHU TRÌNH LÂM SÀNG

Nhóm prompt này dùng để trích xuất **MÃ NGUỒN & DỮ LIỆU CẤU TRÚC (JSON / MARKDOWN)** từ các Guideline bệnh truyền nhiễm để nạp trực tiếp vào codebase của CliniPortal:

| STT | File Prompt | Loại Code Sinh Ra | Nơi Nạp / Lưu File Trong Dự Án | Tác Dụng Trong Chu Trình Lâm Sàng Mới |
| :---: | :--- | :--- | :--- | :--- |
| **00** | [`00-master-prompt-nap-chu-trinh-lam-sang.txt`](00-master-prompt-nap-chu-trinh-lam-sang.txt) | **Tổng hợp 4 Khối Code**: CDSS JSON, Trọng số KB, Ca mẫu, SOAP MD | Theo hướng dẫn từng khối | **Chạy 1 lần duy nhất sinh toàn bộ gói dữ liệu lâm sàng 4 bước** cho bất kỳ bệnh truyền nhiễm nào |
| **05** | [`05-prompt-cdss-json-generator.txt`](05-prompt-cdss-json-generator.txt) | **Enriched CDSS JSON**<br>(Tiêu chuẩn chẩn đoán, Ngưỡng vi sinh/huyết học, `severityGrading`, `specialPopulations`, `timelinePhases` Bảng 3 cột định hướng vấn đề, `clinicalCautions`) | `src/content/docspace/data/enriched/<slug>.json`<br>*(Chạy `node tools/scripts/build-enriched-cdss.mjs`)* | **Bước 3 & Bước 4**<br>• `criteria` $\to$ Tiêu chuẩn phân độ Bước 3 & Mục 1a Bước 4<br>• `timelinePhases` $\to$ Bảng 3 Cột định hướng vấn đề chi tiết từng ngày ở Mục 2 Bước 4<br>• `specialPopulations` $\to$ Mục 1c Bước 4<br>• `clinicalCautions` $\to$ Mục 3 Bước 4 |
| **06** | [`06-prompt-sample-case-generator.txt`](06-prompt-sample-case-generator.txt) | **1. Ca bệnh mẫu JSON**<br>**2. Ma trận trọng số CDSS JSON** | 1. `src/content/knowledge-vault/data/sample-clinical-cases.json`<br>2. `src/content/knowledge-vault/data/clinical-rules-symptoms.json` & `data/diseases/<chuyen-khoa>.json`<br>*(Chạy `node tools/scripts/bundle-clinical-rules.mjs`)* | **Bước 1, 2 & 3**<br>• Bước 1: Nạp ca mẫu (kèm dịch tễ vùng lưu hành, véc-tơ, tiền sử tiêm chủng)<br>• Bước 2: Kích hoạt Tam giác chẩn đoán DTH gộp Đặt vấn đề<br>• Bước 3: Tính % xác suất chẩn đoán & thang điểm NEWS2/PEWS/ESI/qSOFA |
| **07** | [`07-prompt-soap-case-ingest.txt`](07-prompt-soap-case-ingest.txt) | **Hồ sơ ca bệnh SOAP Markdown** | Nạp qua nút **"Nạp ca từ NotebookLM"** trên thanh Header (hoặc lưu `knowledge-vault/ba/`) | **Bước 4 (Mục 6)** & Sổ tay kinh nghiệm SOAP<br>Hiển thị ca thực chiến đối sánh đa chiều và cung cấp Prompt AI hội chẩn tại giường |
| **08** | [`08-prompt-db-batch-enricher.txt`](08-prompt-db-batch-enricher.txt) | **Làm giàu hàng loạt entry CSDL** | `src/content/docspace/data/kho-chan-doan-db.ts` | **Nâng cấp CSDL**<br>Thay thế các entry placeholder mẫu thành dữ liệu lâm sàng định lượng có `severityGrading` chuẩn cho bệnh truyền nhiễm |

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

Dưới đây là bộ thông số đầu vào chuẩn hóa sẵn (Presets) được ánh xạ chính xác theo **Mã ICD-10** và **Văn bản Hướng dẫn của Bộ Y Tế Việt Nam / Tổ chức Y tế Thế giới (WHO)**. Bạn chỉ cần sao chép khối thông số này và dán vào phần đầu của prompt:

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
- [ĐẶC THÙ ĐIỀU TRỊ]: Nhận diện 3 giai đoạn (Sốt ngày 1-3 $\to$ Nguy hiểm ngày 4-7 $\to$ Hồi phục); Bù dịch tinh thể Ringer Lactate bậc thang (15 -> 10 -> 7.5 -> 5 -> 3 mL/kg/h) theo cân nặng lý tưởng (IBW); Chỉ định dung dịch keo cao phân tử (Dextran 40, HES 130/0.4) khi tái sốc hoặc sốc thất bại với dịch tinh thể; Chống chỉ định tuyệt đối NSAIDs/Aspirin; Cảnh báo quá tải dịch trong giai đoạn hồi phục
```

---

## 🚀 5. QUY TRÌNH 4 BƯỚC THỰC HIỆN ĐỒNG BỘ CHO MỌI BỆNH TRUYỀN NHIỄM

### Bước 1: Chuẩn Bị Tài Liệu & Cài Đặt Master System Instruction

1. Truy cập [Google NotebookLM](https://notebooklm.google.com/) và tạo Notebook mới đặt tên theo bệnh (ví dụ: `CDSS_Tay_Chan_Mieng` hoặc `CDSS_Sot_Ret`).
2. Tải lên tài liệu hướng dẫn chuyên môn chính thức: Quyết định của Bộ Y Tế, phác đồ điều trị của các Bệnh viện Bệnh Nhiệt đới (TP.HCM / Trung ương), hoặc Guidelines của WHO / CDC.
3. Mở file [`00-master-system-instruction.txt`](00-master-system-instruction.txt), sao chép toàn bộ nội dung và dán vào phần **Custom Instructions** (hoặc gửi làm prompt thiết lập ngữ cảnh ban đầu) để cố định vai trò Chuyên gia Y học Chứng cứ EBM và Kỹ sư CDSS.

### Bước 2: Chọn Thông Số & Kích Hoạt Sinh Mã Nguồn

Chọn một trong hai phương thức thực hiện tùy theo nhu cầu và độ dài ngữ cảnh:

#### 🌟 PHƯƠNG THỨC 1 (Khuyên Dùng — Nhanh Nhất & Không Lo Giới Hạn Ký Tự)

1. Trong NotebookLM, tại cột **Sources (Nguồn)** bên trái ➔ Bấm **"+ Add source"** ➔ Chọn **"Copied text"**.
2. Dán toàn bộ nội dung file [`00-master-prompt-nap-chu-trinh-lam-sang.txt`](00-master-prompt-nap-chu-trinh-lam-sang.txt) vào, đặt tên nguồn là `SCHEMA_DOCSPACE`.
3. Tại **ô Chat**, gửi lệnh kèm theo khối thông số từ Mục 4:
   > *"Dựa trên Hướng dẫn điều trị đã nạp và tuân thủ chặt chẽ cấu trúc tại nguồn SCHEMA_DOCSPACE, hãy sinh toàn bộ dữ liệu code 4 Khối cho bệnh lý: [Dán khối thông số mặt bệnh từ Mục 4 vào đây]."*

#### ⚡ PHƯƠNG THỨC 2 (Sinh Riêng Lẻ Từng Khối Bằng Các File Prompt Chuyên Biệt)

Nếu muốn sinh kiểm soát từng phần độc lập:

- **Khối 1 (CDSS JSON)**: Mở [`05-prompt-cdss-json-generator.txt`](05-prompt-cdss-json-generator.txt) ➔ Điền thông số mặt bệnh ➔ Nhận file JSON CDSS chuẩn cấu trúc đầy đủ nạp vào `src/content/docspace/data/enriched/<slug>.json`.
- **Khối 2 & 3 (Ca Mẫu & Trọng Số CDSS)**: Mở [`06-prompt-sample-case-generator.txt`](06-prompt-sample-case-generator.txt) ➔ Điền thông số ➔ Nhận 2 khối code cho `sample-clinical-cases.json` & `diseases/<chuyen-khoa>.json` (kèm `clinical-rules-symptoms.json`).
- **Khối 4 (Hồ Sơ Ca Bệnh SOAP)**: Mở [`07-prompt-soap-case-ingest.txt`](07-prompt-soap-case-ingest.txt) ➔ Nhận Hồ sơ ca bệnh thực chiến SOAP Markdown chuẩn Frontmatter nạp trực tiếp qua nút Header.

### Bước 3: Nạp Code & Dữ Liệu Vào Hệ Thống CliniPortal (Hướng Dẫn Chi Tiết Sau Khi Có Kết Quả Từ Prompt)

Sau khi NotebookLM sinh xong dữ liệu từ Prompt 00 (hoặc từng prompt riêng lẻ 05, 06, 07), bạn thực hiện nạp vào codebase theo đúng 3 vị trí và chạy các lệnh tự động hóa sau:

---

#### 📦 1. XỬ LÝ KẾT QUẢ TỪ PROMPT 05 (Enriched CDSS JSON)

- **Mục đích**: Vận hành Động cơ suy luận Bước 3 & Phác đồ Bảng 3 Cột Định hướng Vấn đề Mục 2 Bước 4.
- **Thao tác**:
  1. Tạo file JSON mới tại: `src/content/docspace/data/enriched/<slug>.json` (ví dụ: `tay_chan_mieng.json`, `sot_ret.json`, `xo_gan.json`).
  2. Dán toàn bộ nội dung JSON từ Prompt 05 vào file này.
  3. **Lưu ý cấu trúc đã tinh gọn chuẩn mực**:
     - Cấp root bắt buộc có: `icdCode`, `diseaseName`, `specialty`, `severity`, `summary`, `goldStandard`, `criteriaRule`, `criteria`, `severityGrading`, `specialPopulations`, `timelinePhases`, `cautionsAndDischarge`, `protocol` (root fallback), `complications`, `monitoringLabs`, `vaultPathways`.
     - Tuyệt đối không lồng `protocol` bên trong từng bậc của `severityGrading` (tránh phình to dung lượng).
     - Bảng 3 Cột định hướng vấn đề chi tiết từng ngày được quản lý tại mảng `timelinePhases` (với `problems`, `phaseComplications`, và `generalComplications`).
  4. Mở terminal và chạy lệnh build tự động để biên dịch và đăng ký bệnh lý vào hệ thống:
     ```powershell
     node tools/scripts/build-enriched-cdss.mjs
     ```
     > *Script sẽ tự động kiểm tra tính hợp lệ của JSON, xác thực 14 trường dữ liệu tiêu chuẩn và tự động tái tạo file chỉ mục `src/content/docspace/data/enriched/index.ts`.*

---

#### 🧪 2. XỬ LÝ KẾT QUẢ TỪ PROMPT 06 (Ca Mẫu JSON & Ma Trận Trọng Số CDSS)

Prompt 06 sinh ra **2 Khối Code riêng biệt**:

##### 🔹 Khối A: Ca Bệnh Mẫu JSON (Nạp vào Bước 1 & 2)
1. Mở file: `src/content/knowledge-vault/data/sample-clinical-cases.json`.
2. Bổ sung đối tượng ca mẫu mới vào mảng `[]`.
3. **Nguyên tắc an toàn y khoa bắt buộc (Zero-Orphan Rule)**:
   - Các mã triệu chứng trong `sel`, `selected`, và `negated` **BẮT BUỘC** phải là mã chuẩn đã tồn tại trong từ điển `src/content/knowledge-vault/data/clinical-rules-symptoms.json` (ví dụ: dùng `tc_sot_cao_dot_ngot_duoi_7_ngay`, `tc_giam_tieu_cau_duoi_100_g_l`, `lab_tieu_cau_giam`, `tc_co_dac_mau_hct_tang_tren_20_phan_tram`...). Tuyệt đối không tự đặt mã tự do gây lỗi triệu chứng mồ côi.
   - Đảm bảo đầy đủ các trường định lượng: `id`, `diseaseId`, `icd10`, `specialty`, `vitals` (sinh hiệu), `labs` (`lBC`, `lTC`, `lHct`, `lAST`, `lALT`, `lCre`...), `epiContext` (bối cảnh dịch tễ), và `form.text` chia ranh giới 4 tầng rõ rệt: `cn` (cơ năng), `ct` (thực thể), `tc` (tiền căn), `cls` (cận lâm sàng).

##### 🔹 Khối B: Ma Trận Trọng Số CDSS & Bổ Sung Triệu Chứng (Nạp vào Bước 3)
1. **Nếu có triệu chứng mới**: Mở `src/content/knowledge-vault/data/clinical-rules-symptoms.json` và thêm triệu chứng mới vào danh mục. Đảm bảo tên triệu chứng không chứa ký tự HTML entities thô (`&gt;`, `&lt;`) và không chứa tiền tố thừa.
2. **Nạp luật suy luận bệnh lý**: Mở tệp chuyên khoa tương ứng tại `src/content/knowledge-vault/data/diseases/<chuyen-khoa>.json` (ví dụ: `truyen-nhiem.json`, `tieu-hoa.json`, `tim-mach.json`...):
   - Thêm đối tượng bệnh mới hoặc cập nhật mảng `dd` (Ma trận trọng số).
   - Đảm bảo 100% luật suy luận gán đúng 1 trong 4 vai trò chuẩn: `dt` (Đặc trưng), `gy` (Gợi ý), `ht` (Hỗ trợ), `loaitru` (Loại trừ).
3. **Chạy lệnh đồng bộ hóa Master KB**:
   ```powershell
   node tools/scripts/bundle-clinical-rules.mjs
   ```
   > *Script sẽ gom các file chuyên khoa vào `clinical-rules-kb.json`. Nhờ kiến trúc mới đã cắt giảm mảng nhân bản `trieuChung`, dung lượng file Master KB giảm 55%, tải trang nhanh hơn gấp 2 lần.*

---

#### 📝 3. XỬ LÝ KẾT QUẢ TỪ PROMPT 07 (Hồ Sơ Ca Thực Chiến SOAP Markdown)

- **Mục đích**: Vận hành Mục 6 Bước 4 (Hồ sơ ca thực chiến) và Sổ tay Kinh nghiệm Lâm sàng SOAP.
- **Có 2 phương thức nạp linh hoạt**:

##### 🌟 Phương thức 1 — Nhanh nhất qua Giao diện Web (Khuyên dùng khi thực hành lâm sàng):
1. Mở DocSpace MedLens Pro trên trình duyệt (`http://localhost:5173/src/content/docspace/`).
2. Trên thanh Header điều hướng, bấm nút **"Nạp ca từ NotebookLM"**.
3. Dán toàn bộ nội dung Markdown (gồm cả YAML Frontmatter) từ Prompt 07 vào khung nhập liệu.
4. Bấm **"Phân tích & Nạp vào sổ tay"** ➔ Ca bệnh sẽ được bóc tách tức thì vào sổ tay và tự động liên kết vào Mục 6 của Bước 4 khi xem bệnh lý tương ứng.

##### ⚡ Phương thức 2 — Lưu trữ Cố định vào Knowledge Vault:
1. Tạo file Markdown mới tại: `src/content/knowledge-vault/ba/<slug-ca-benh>.md` (ví dụ: `ca-sxh-dengue-soc-ngay-5.md` hoặc `ca-uon-van-nguoi-lon.md`).
2. Dán nội dung Markdown vào file và lưu lại.
3. Mở terminal và chạy lệnh đồng bộ tự động vào CSDL catalog:
   ```powershell
   node tools/scripts/ingest-notebooklm-case.mjs src/content/knowledge-vault/ba/<slug-ca-benh>.md
   ```
   > *Script sẽ tự động phân tích Frontmatter, trích xuất tóm tắt và cập nhật đồng thời cả 2 tệp `vault-catalog.json` và `vault-catalog-thuc-hanh.json`.*

---

#### 🛡️ 4. BỘ BA LỆNH KIỂM ĐỊNH CHẤT LƯỢNG BẮT BUỘC (Quality Gate Checklist)

Sau khi hoàn tất nạp dữ liệu từ các prompt, **BẮT BUỘC** chạy 3 công cụ kiểm định tự động sau đây để đảm bảo hệ sinh thái không có bất kỳ lỗi cú pháp, gãy vỡ liên kết hay triệu chứng mồ côi nào:

```powershell
# [LỆNH 1] Kiểm định dữ liệu lâm sàng, khử lỗi HTML entities, tiền tố thừa & viết tắt y khoa:
node tools/qa/docspace-clinical-data-linter.mjs

# [LỆNH 2] Kiểm định 6 Trụ Cột Y Khoa Toàn Diện (Medical QA Gate):
# (Bảo đảm: Zero-Orphan Symptoms, Multi-file Sync, CDSS Role Matrix, Enriched Schema, SOAP Format, Anti-AI-ism)
node tools/qa/docspace-medical-qa-gate.mjs

# [LỆNH 3] Kiểm định 15 Tiêu chí sẵn sàng toàn diện của Kho Tri Thức:
node tools/scripts/vault-readiness-check.mjs
```

> **Tiêu chuẩn nghiệm thu**:
> - `docspace-clinical-data-linter.mjs`: `0 HTML lỗi | 0 tiền tố thừa | 0 lỗi viết tắt`.
> - `docspace-medical-qa-gate.mjs`: **`6/6 PILLARS PASS | 0 FAIL`** (Đặc biệt `PILLAR 1: Zero-Orphan Symptoms` phải đạt 100%).
> - `vault-readiness-check.mjs`: **`15/15 Tiêu chí Đạt (100%)`**.

---

### Bước 4: Soạn 4 Bài Viết Chuyên Sâu Cho Knowledge Vault (Tùy Chọn)

Khi cần xây dựng thư viện Y học chứng cứ đối chiếu và liên kết Pathway ở Bước 4, hãy dùng Nhóm 2 (Prompt 01, 02, 03, 04):

1. **Bài Chẩn đoán (CD)**: Lưu vào `src/content/knowledge-vault/2.3. Kho chẩn đoán/Truyền nhiễm/CD_<slug>_P1.md`.
2. **Bài Phác đồ điều trị (PDDT)**: Lưu vào `src/content/knowledge-vault/2.4. Kho phác đồ điều trị/Truyền nhiễm/PDDT_<slug>_P1.md`.
3. **Bài Dịch tễ học (DTH)**: Lưu vào `src/content/knowledge-vault/1.4. Kho dịch tễ học/Truyền nhiễm/DTH_<slug>_P1.md`.
4. **Bài Biến chứng & Cấp cứu (BC)**: Lưu vào `src/content/knowledge-vault/2.5. Kho biến chứng/Truyền nhiễm/BC_<slug>_P1.md`.

---

## 🛡️ 6. NGUYÊN TẮC AN TOÀN LÂM SÀNG & EBM ĐẶC THÙ CHO BỆNH TRUYỀN NHIỄM

Khi biên soạn dữ liệu CDSS cho bệnh truyền nhiễm, AI và Bác sĩ biên tập bắt buộc phải tuân thủ 5 nguyên tắc an toàn lâm sàng bất di bất dịch:

> [!IMPORTANT]
>
> ### 1. Khai Thác Yếu Tố Dịch Tễ Là Điều Kiện Tiên Quyết
>
> Khác với bệnh nội khoa mạn tính, chẩn đoán bệnh truyền nhiễm phụ thuộc sống còn vào **Bối cảnh dịch tễ học**:
>
> - Vùng cư trú hoặc lịch sử di chuyển đến vùng dịch lưu hành trong vòng 14–28 ngày qua.
> - Tiền sử tiếp xúc người có triệu chứng tương tự (ổ dịch gia đình, trường học, nhà trẻ, bệnh viện).
> - Tiền sử côn trùng cắn (muỗi *Aedes*, muỗi *Anopheles*, bọ mò, ve rận) hoặc phơi nhiễm súc vật/gia cầm.
> - Tiền sử tiêm chủng vắc-xin bảo vệ (Sởi, Thủy đậu, Viêm não Nhật Bản, Ho gà, Uốn ván).

> [!WARNING]
>
> ### 2. Cửa Sổ Vàng Điều Trị Đặc Hiệu (Golden Treatment Window)
>
> Thuốc kháng virus và huyết thanh kháng độc tố chỉ đạt hiệu quả tối ưu khi được sử dụng sớm:
>
> - **Oseltamivir**: Tối ưu trong vòng 48 giờ đầu kể từ khi khởi phát triệu chứng cúm.
> - **Acyclovir**: Tối ưu trong vòng 24–72 giờ đầu kể từ khi nốt đậu/phỏng nước xuất hiện.
> - **SAT / TIG (Uốn ván)**: Phải tiêm bắp trung hòa độc tố tự do ngay trước khi xử lý phẫu thuật vết thương.
> - **Kháng sinh trong Sốc nhiễm trùng**: Bắt buộc tiêm tĩnh mạch liều đầu tiên trong vòng **60 phút** kể từ khi nhận diện (Hour-1 Bundle).

> [!CAUTION]
>
> ### 3. Nguyên Tắc Quản Lý Kháng Sinh (Antimicrobial Stewardship)
>
> - Luôn chỉ định lấy bệnh phẩm vi sinh (cấy máu, cấy đờm, cấy dịch não tủy, phết họng) **TRƯỚC KHI** bắt đầu liều kháng sinh đầu tiên (trừ khi việc lấy bệnh phẩm làm chậm trễ quá mức xử trí cấp cứu đe dọa tính mạng).
> - Phân định rõ ràng giữa **Liệu pháp kháng sinh theo kinh nghiệm (Empirical Therapy)** dựa trên dịch tễ/mức độ nặng và **Liệu pháp xuống thang theo kháng sinh đồ (De-escalation)** sau 48–72 giờ.

> [!NOTE]
>
> ### 4. Phân Định Rõ Ràng Giữa Bước 3 (Chẩn Đoán/Phân Độ) & Bước 4 (Xử Trí/Điều Trị)
>
> - Tại **Bước 3**: Chỉ tập trung vào bộ tiêu chuẩn nhận diện mức độ nặng (`criteria`: [Lâm sàng], [Cận lâm sàng], [Tiêu chuẩn an toàn], [Dấu hiệu cảnh báo]). Tuyệt đối không đưa y lệnh thuốc, dịch truyền hay mục tiêu huyết áp vào Bước 3.
> - Tại **Bước 4**: Chuyển giao toàn bộ quyết định can thiệp sang **Bảng 3 Cột định hướng vấn đề** (`timelinePhases`) và **6 Đầu mục điều trị chuẩn hóa** (Phân loại cá thể hóa, Bảng 3 Cột POMR, Lưu ý lâm sàng [1][2][3] + ĐT đặc hiệu, Tư vấn người bệnh Kho TV, Kiến thức NVYT, Ca bệnh SOAP).

> [!TIP]
>
> ### 5. Kiểm Soát Nhiễm Khuẩn & Cảnh Báo Khai Báo Dịch Bệnh
>
> Trong mục tư vấn và dặn dò (Mục 4 Bước 4), luôn bao gồm:
>
> - Phân loại biện pháp phòng ngừa lây nhiễm: **Phòng ngừa chuẩn (Standard)**, **Đường tiếp xúc (Contact)**, **Giọt bắn (Droplet)**, hoặc **Đường không khí (Airborne)**.
> - Nhắc nhở khai báo bệnh truyền nhiễm thuộc nhóm A, B, C theo quy định tại **Thông tư 54/2015/TT-BYT** của Bộ Y Tế.

> [!IMPORTANT]
>
> ### 6. Quy Tắc Phân Tầng Lâm Sàng Động (Dynamic Clinical Staging: 2, 3, hoặc >3 Phân Độ)
>
> - Tuyệt đối không gò ép mọi bệnh lý vào mô hình 3 phân độ. Trường `severityGrading` là một mảng động (Dynamic Array) tuân thủ 100% theo Quyết định của Bộ Y Tế hoặc Guidelines chuyên khoa quốc tế:
>   - **2 Phân độ / Thể bệnh:** Ví dụ Xơ gan (Còn bù / Mất bù); Viêm phổi cộng đồng (Ngoại trú CRB-65=0 / Nhập viện CRB-65≥1).
>   - **3 Phân độ:** Ví dụ Sốt xuất huyết Dengue, Sốt rét, Thủy đậu (Nhẹ / Cảnh báo / Nặng).
>   - **> 3 Phân độ / Thể lâm sàng:** Ví dụ Nhiễm trùng tiểu (4 thể: Viêm bàng quang / Viêm đài bể thận / NTT có biến chứng / Urosepsis); ACLF (4 độ: Grade 1a / 1b / 2 / 3); Tay chân miệng (4-5 phân độ: Độ 1, 2a, 2b, 3, 4); Uốn ván (4 độ Ablett I, II, III, IV).
> - **Phân định rõ 3 Nhánh tại Mục 1 Bước 4:**
>   - **1a. Phân độ nặng nhẹ / Thể lâm sàng cốt lõi:** Dành cho các bậc bệnh/thể bệnh chính.
>   - **1b. Phân độ biến chứng:** Đưa các biến chứng cơ quan / ngoại khoa (Áp xe, hoại tử nhú, sốc...) vào tab 1b để tích chọn đa biến chứng song hành.
>   - **1c. Đối tượng đặc biệt:** Quy hoạch phụ nữ mang thai, người cao tuổi, suy thận giảm eGFR, suy gan để cá thể hoá y lệnh và chỉnh liều.

---

## 🤖 7. HỆ THỐNG SKILLS & AI AGENT CHUYÊN TRÁCH DOCSPACE

Nhằm tự động hóa hoàn toàn quy trình xử lý, kiểm định chất lượng và tích hợp tri thức y khoa từ các prompt trên vào CliniPortal DocSpace mà không gây xung đột kiến trúc hay vỡ mã nguồn, hệ thống thiết lập **4 Đội ngũ Agent (Squads) tương ứng 4 Bước** cùng các Squad chuyên biệt trong `.agents/skills/`:

### 1. Phân định vai trò 4 Master Squads tương ứng 4 Bước Lâm Sàng

| Bước | Đội ngũ AI Agent Squad | Kích hoạt Skill | Nhiệm vụ chuyên môn cốt lõi | Prompt phụ trách |
| :---: | :--- | :--- | :--- | :--- |
| **Bước 1** | **Step 1 Ingestion Squad** | `.agents/skills/docspace-step1-ingestion-squad/` | • Tiếp nhận ca bệnh, đo lường sinh hiệu, trích xuất triệu chứng (CN, TT, TC, CLS)<br>• Khai thác bối cảnh dịch tễ học vùng lưu hành, véc-tơ, tiền sử tiêm chủng | **Prompt 06** (Ca mẫu) |
| **Bước 2** | **Step 2 Reasoning Squad** | `.agents/skills/docspace-step2-reasoning-squad/` | • Tóm tắt bệnh án EMR ngắt dòng trực quan<br>• Đặt vấn đề 3 tầng ưu tiên (PGS.TS Hoàng Văn Sĩ)<br>• Kích hoạt EpiBoost tam giác dịch tễ & phân giải mâu thuẫn bệnh đồng mắc | **Prompt 03**, **06** |
| **Bước 3** | **Step 3 CDSS Squad** | `.agents/skills/docspace-step3-cdss-squad/` | • Động cơ suy luận CDSS & Ma trận trọng số (`dt`, `gy`, `ht`, `loaitru`)<br>• Bộ thang điểm cảnh báo sớm (NEWS2, PEWS, ESI, qSOFA)<br>• Tiêu chuẩn vàng và bộ 4 tiền tố phân độ nặng (`criteria`) | **Prompt 01**, **05**, **06** |
| **Bước 4** | **Step 4 Protocol Squad** | `.agents/skills/docspace-step4-protocol-squad/` | • Vận hành 6 Đầu mục phác đồ điều trị chi tiết<br>• Bảng 3 Cột định hướng vấn đề lộ trình từng ngày (`timelinePhases`) & xuất EMR chuẩn HIS<br>• An toàn kê đơn (DDI, eGFR), 3 nhóm cảnh báo [1][2][3] + ĐT đặc hiệu, Kho TV & 18 Kho tri thức | **Prompt 02**, **05**, **07** |

### 2. Các Đội ngũ Bổ trợ Chuyên biệt (Specialized Support Squads)
- **UI/UX & Công thái học**: `docspace-treatment-protocol-ui-squad` & `docspace-ui-feature-squad` (Tối ưu giao diện Bảng 3 Cột POMR, responsive mobile, micro-animations).
- **Kỹ thuật Dữ liệu & Pipeline**: `docspace-treatment-data-engineering-squad` & `docspace-cdss-builder` (Chuẩn hóa JSON schema, mapping CSDL, bundling scripts).
- **Kiểm định Lâm sàng & Khử lỗi**: `docspace-clinical-data-qa-squad` & `docspace-medical-qa-squad` (Khử viết tắt, lọc trùng triệu chứng, bảo toàn Zero-Orphan Symptoms).
- **Khai thác Ca bệnh & Huấn luyện**: `docspace-case-ingestion-squad` & `docspace-clinical-simulation-squad` & `docspace-soap-ingester` (Nạp ca từ NotebookLM, OSCE, EMR Export).

### 2. Công cụ tự động Audit bệnh lý (Automated Disease Audit CLI)

Bất kỳ khi nào nạp một bệnh lý mới hoặc chỉnh sửa dữ liệu, hãy chạy công cụ kiểm định tự động 10 tiêu chí:

```bash
# Kiểm định một bệnh lý cụ thể (ví dụ: viem_mang_nao)
node tools/scripts/docspace-disease-audit.mjs viem_mang_nao

# Kiểm định bệnh sốt xuất huyết Dengue
node tools/scripts/docspace-disease-audit.mjs sot_xuat_huyet_dengue

# Quét kiểm định toàn bộ bệnh lý đã làm giàu trong CSDL DocSpace
node tools/scripts/docspace-disease-audit.mjs all
```

**10 Tiêu chí kiểm định bắt buộc:**

1. File Enriched JSON tồn tại tại `src/content/docspace/data/enriched/<slug>.json`
2. Đã được đăng ký trong index `src/content/docspace/data/enriched/index.ts`
3. `DIAGNOSTIC_CHAIN_DATABASE` có `severityGrading` với đủ 4 tiền tố chuẩn
4. Khóa bệnh trong CSDL có ID aliasing hoàn chỉnh chống phân mảnh định danh
5. Chuyên khoa thuộc danh mục đơn nhất chuẩn mực (Canonical Specialty: `"Truyền nhiễm"`, `"Tim mạch"...`)
6. `clinical-rules-kb.json` đã khai báo entity bệnh với tên và chuyên khoa chuẩn
7. Toàn bộ mã triệu chứng trong `dd` đều được định nghĩa trong từ vựng triệu chứng (Zero Orphan Symptoms)
8. Có ít nhất 1 ca bệnh mẫu được định nghĩa trong `sample-clinical-cases.json`
9. Phác đồ Bước 4 Mục 6 đã tích hợp hồ sơ SOAP thực chiến
10. Dịch tễ học đã được nạp vào `epidemiology-context-database.ts` và kết nối với `clinicalEngine.ts`
