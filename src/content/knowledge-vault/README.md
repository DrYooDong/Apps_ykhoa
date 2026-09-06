# 🏛️ HƯỚNG DẪN VẬN HÀNH & KIẾN TRÚC HỆ THỐNG KNOWLEDGE VAULT
> **CliniPortal Knowledge Vault — Master Architecture & Operations Manual**  
> *Kho Tri Thức Y Khoa Chuyên Sâu (2.400+ Bài viết EBM), Chuỗi Phản Ứng Lâm Sàng (CRCE v3.0), Phác Đồ Động Thích Ứng (Living Protocols) & Studio Ra Quyết Định Y Khoa tại giường.*  
> **Phiên bản**: v3.2 (Tích hợp 16 Kho EBM, CRCE v3.0, Editorial Flowchart Studio, SM-2 Spaced Repetition Flashcards & Obsidian DeepLink)  
> **Kiến trúc**: 100% Client-Side, Offline-First, TypeScript Native, SVG Editorial Visualization & Vanilla CSS Design Tokens  

---

## 📑 MỤC LỤC
1. [Tổng Quan Hệ Sinh Thái Knowledge Vault](#-1-tổng-quan-hệ-sinh-thái-knowledge-vault)
2. [Sơ Đồ Kiến Trúc & Luồng Xử Lý Dữ Liệu](#-2-sơ-đồ-kiến-trúc--luồng-xử-lý-dữ-liệu)
3. [Cấu Trúc Thư Mục & Mô-đun Mã Nguồn](#-3-cấu-trúc-thư-mục--mô-đun-mã-nguồn)
4. [Phân Hệ 16 Kho Tri Thức Y Khoa Chuyên Biệt](#-4-phân-hệ-16-kho-tri-thức-y-khoa-chuyên-biệt)
5. [Động Cơ Nạp & Tra Cứu Tức Thì (Vault Loader Engine)](#-5-động-cơ-nạp--tra-cứu-tức-thì-vault-loader-engine)
6. [Trình Đọc Y Khoa Chuyên Sâu (Medical Reader Pro Engine)](#-6-trình-đọc-y-khoa-chuyên-sâu-medical-reader-pro-engine)
7. [Chuỗi Phản Ứng Lâm Sàng 5 Bước (CRCE v3.0)](#-7-chuỗi-phản-ứng-lâm-sàng-5-bước-crce-v30)
8. [Phân Hệ Phác Đồ Động & Rà Quét Xung Đột (Living Protocols & Conflict Engine)](#-8-phân-hệ-phác-đồ-động--rà-quét-xung-đột-living-protocols--conflict-engine)
9. [Studio Lưu Đồ Lâm Sàng Tương Tác (Flowchart Studio & Decision Trees)](#-9-studio-lưu-đồ-lâm-sàng-tương-tác-flowchart-studio--decision-trees)
10. [Động Cơ Thẻ Ghi Nhớ Ôn Tập Ngắt Quãng SM-2 (Medical Flashcards)](#-10-động-cơ-thẻ-ghi-nhớ-ôn-tập-ngắt-quãng-sm-2-medical-flashcards)
11. [Giao Diện Bento Grid, Design Tokens & Dark Mode 100%](#-11-giao-diện-bento-grid-design-tokens--dark-mode-100)
12. [Tích Hợp Hai Chiều: Obsidian Vault & DocSpace Pro](#-12-tích-hợp-hai-chiều-obsidian-vault--docspace-pro)
13. [Hướng Dẫn Mở Rộng & Đóng Góp (Developer & Contributor Guide)](#-13-hướng-dẫn-mở-rộng--đóng-góp-developer--contributor-guide)

---

## 🌟 1. Tổng Quan Hệ Sinh Thái Knowledge Vault

**Knowledge Vault** là trung tâm lưu trữ, lập chỉ mục và điều hướng tri thức y học chứng cứ (EBM) của nền tảng **CliniPortal**. Được thiết kế chuyên biệt cho Bác sĩ điều trị, Bác sĩ nội trú và Sinh viên Y khoa, Knowledge Vault giải quyết bài toán phân mảnh thông tin trong thực hành lâm sàng bằng cách xâu chuỗi toàn diện từ **Khoa học Y học Cơ sở** (Giải phẫu, Hóa sinh, Sinh lý bệnh, Dịch tễ) đến **Thực hành Điều trị Chuyên sâu** (Lâm sàng, Cận lâm sàng, Tiêu chuẩn chẩn đoán, Phác đồ, Dược lý và Biến chứng).

```
                        ┌──────────────────────────────────────────────┐
                        │   CLINIPORTAL KNOWLEDGE VAULT ECOSYSTEM      │
                        │    (2.400+ EBM Articles | 16 Repositories)   │
                        └──────────────────────┬───────────────────────┘
                                               │
             ┌─────────────────────────────────┼─────────────────────────────────┐
             │                                 │                                 │
             ▼                                 ▼                                 ▼
   ┌───────────────────┐             ┌───────────────────┐             ┌───────────────────┐
   │  NHÓM KHO CƠ SỞ   │             │ NHÓM CHUYÊN SÂU   │             │  NHÓM HỖ TRỢ      │
   │ GPSL, HS, SLB,    │             │ YTNC, TC, CLS,    │             │ CC, EBM, RAW,     │
   │ DTH, KN (5 Kho)   │             │ CD, PDDT, DUOC... │             │ CORE (4 Kho)      │
   └─────────┬─────────┘             └─────────┬─────────┘             └─────────┬─────────┘
             │                                 │                                 │
             └─────────────────────────────────┼─────────────────────────────────┘
                                               ▼
                        ┌──────────────────────────────────────────────┐
                        │       INTELLIGENT ENGINES & STUDIOS          │
                        │  • CRCE v3.0 (5-Step Clinical Reaction Chain)│
                        │  • Living Protocols & Conflict Scanner       │
                        │  • Medical Reader Pro & Pathway Matrix Ribbon│
                        │  • Pure SVG Flowchart Decision Tree Studio   │
                        │  • Spaced Repetition (SuperMemo SM-2)        │
                        └──────────────────────┬───────────────────────┘
                                               │
             ┌─────────────────────────────────┴─────────────────────────────────┐
             ▼                                                                   ▼
┌───────────────────────────────┐                                   ┌───────────────────────────────┐
│     DOCSPACE PRO AT BEDSIDE   │ ◄════════════ 2-Way Sync ════════►│      OBSIDIAN NOTE VAULT      │
│   (SOAP, SBAR, RAG Grounding) │                                   │ (Markdown, Obsidian DeepLink) │
└───────────────────────────────┘                                   └───────────────────────────────┘
```

### ✨ Các Đặc Điểm Đột Phá:
- **Zero-Latency Offline-First**: Toàn bộ chỉ mục 2.400+ bài viết (`vault-catalog.json`), dữ liệu phác đồ và thuật toán chạy trực tiếp trên Client bằng Vanilla JavaScript/TypeScript, không phụ thuộc API bên ngoài, đảm bảo tốc độ phản hồi tức thì (< 10ms).
- **Ma Trận Bệnh Học 5 Chiều (Clinical Pathway Matrix Ribbon)**: Mở bất kỳ bài viết nào, hệ thống tự động tìm và kết nối chuỗi kiến thức liên đới: *Giải phẫu sinh lý $\rightarrow$ Sinh lý bệnh $\rightarrow$ Dịch tễ $\rightarrow$ Tiêu chuẩn chẩn đoán $\rightarrow$ Phác đồ điều trị $\rightarrow$ Biến chứng*.
- **Chuỗi Phản Ứng Lâm Sàng CRCE v3.0 (Clinical Reaction Chain Engine)**: Bộ công cụ tương tác 5 bước độc lập cho 30 bệnh lý trọng tâm với thanh tính toán % thỏa mãn tiêu chuẩn chẩn đoán tự động.
- **Phác Đồ Động (Living Protocols) & Quét Xung Đột Chống Chỉ Định Chéo**: Tự động phát hiện chống chỉ định giữa các bệnh phối hợp (Multimorbidity), cảnh báo đỏ và sinh bảng so sánh phương án điều trị cùng bệnh nhân (Shared Decision-Making).
- **Lưu Đồ Thuật Toán Vector Chuẩn Editorial**: 100% Pure Inline SVG, đường nối trực giao góc bo cong mềm mại ($Q$-curve), tự động thích ứng Dark Mode, tương thích hoàn toàn trên mọi thiết bị.
- **Thẻ Ghi Nhớ Lâm Sàng SuperMemo SM-2**: Ôn tập ngắt quãng các điểm ngọc lâm sàng cốt lõi (High-Yield Pearls), lưu trữ tiến trình theo hồ sơ bác sĩ.
- **Cầu Nối Hai Chiều Web App $\leftrightarrow$ Obsidian**: Mở ghi chú nội bộ qua DeepLink `obsidian://open?vault=...` và nạp ngữ cảnh ngược lại từ Obsidian vào Web App.

---

## 🏛️ 2. Sơ Đồ Kiến Trúc & Luồng Xử Lý Dữ Liệu

```mermaid
flowchart TB
    %% Styling tokens
    classDef storage fill:#fffbeb,stroke:#f59e0b,stroke-width:2px,color:#78350f,rx:6px;
    classDef loader fill:#f0f9ff,stroke:#0284c7,stroke-width:2px,color:#0c4a6e;
    classDef engine fill:#ecfdf5,stroke:#10b981,stroke-width:2px,color:#064e3b;
    classDef view fill:#fdf4ff,stroke:#d946ef,stroke-width:2px,color:#701a75;
    classDef external fill:#f8fafc,stroke:#64748b,stroke-width:1.5px,color:#0f172a,stroke-dasharray: 4 4;

    subgraph DATA_TIER["1. Dữ Liệu Tĩnh & Chỉ Mục Hạt Nhân"]
        CATALOG[("vault-catalog.json<br/>2.400+ Bài Viết, 16 Kho")清洁]:::storage
        PROTOCOLS_REG[("Protocols Registry<br/>Cardio, Pulmo, GI, Emergency, Infection")]:::storage
        FLOWCHART_REG[("Flowcharts Registry<br/>ACS, Stroke, Sepsis, Dyspnea")]:::storage
        FLASHCARD_REG[("Flashcard Bank<br/>High-Yield Clinical Pearls")]:::storage
    end

    subgraph LOADER_TIER["2. Động Cơ Nạp & Phân Tích (Loader Engines)"]
        V_LOADER["vault-loader.ts<br/>• Multi-field Fast Search<br/>• Pathway Matrix Linker<br/>• Kho Aggregator"]:::loader
        P_CONFLICT["protocol-conflict-engine.ts<br/>• Cross-Contraindication Scanner<br/>• ICD-10 Matcher<br/>• Drug Consolidator"]:::loader
        P_FLOW_GEN["protocol-flowchart-engine.ts<br/>• Step-to-SVG Grid Layout<br/>• Orthogonal Edge Router"]:::loader
    end

    subgraph ENGINE_TIER["3. Động Cơ Xử Lý Lâm Sàng Chuyên Biệt"]
        CRCE_ENG["vault-crce-view.ts (CRCE v3.0)<br/>5-Step Diagnostic & Treatment Chain"]:::engine
        READER_ENG["vault-reader-pro.ts<br/>• Dynamic TOC ScrollSpy<br/>• Annotation Manager (LocalStorage)<br/>• QuickFacts & Pathway Ribbon"]:::engine
        FC_STUDIO["vault-flowchart-engine.ts<br/>• Editorial SVG Interactive Studio<br/>• Node Drilldown Inspector"]:::engine
        SM2_ENG["vault-flashcard-engine.ts<br/>• SuperMemo SM-2 Interval Engine<br/>• 3D CSS Card Flip & Mastery Level"]:::engine
    end

    subgraph UI_TIER["4. Tầng Trình Diễn (Presentation Views)"]
        HUB_VIEW["vault-hub-view.ts<br/>Bento Dashboard, Dynamic Search & Filters"]:::view
        STANDALONE_HTML["index.html<br/>Standalone Knowledge Vault Web Portal"]:::view
        DRAWER_VIEW["Reader Drawer UI<br/>Full-Screen & Distraction-Free Reading"]:::view
    end

    subgraph INTEGRATION_TIER["5. Tích Hợp Hệ Sinh Thái"]
        DOCSPACE["DocSpace Clinical Workspace<br/>(SOAP, SBAR, Living Protocols)"]:::external
        OBSIDIAN["Obsidian Medical Vault<br/>(Markdown DeepLinks)"]:::external
        EBM_GUIDELINES["EBM Guidelines Hub<br/>(Evidence Summaries & RCTs)"]:::external
    end

    %% Flow connections
    CATALOG --> V_LOADER
    PROTOCOLS_REG --> P_CONFLICT
    PROTOCOLS_REG --> P_FLOW_GEN
    FLOWCHART_REG --> FC_STUDIO
    FLASHCARD_REG --> SM2_ENG

    V_LOADER --> HUB_VIEW
    V_LOADER --> READER_ENG
    P_CONFLICT --> CRCE_ENG
    P_FLOW_GEN --> CRCE_ENG

    CRCE_ENG --> HUB_VIEW
    READER_ENG --> DRAWER_VIEW
    FC_STUDIO --> HUB_VIEW
    SM2_ENG --> HUB_VIEW

    HUB_VIEW --> STANDALONE_HTML
    DRAWER_VIEW --> STANDALONE_HTML

    STANDALONE_HTML <== "URL Query Params / Deeplinks" ==> DOCSPACE
    STANDALONE_HTML <== "obsidian://open?vault=..." ==> OBSIDIAN
    STANDALONE_HTML <== "EBM Cross-Refs" ==> EBM_GUIDELINES
```

---

## 📂 3. Cấu Trúc Thư Mục & Mô-đun Mã Nguồn

```text
src/content/knowledge-vault/
├── css/                                # Hệ thống bảng kiểu CSS chuyên biệt
│   ├── vault-hub.css                   # Bento Grid, Filters, Cards, Ribbon & Themes
│   └── vault-crce.css                  # UI Chuỗi phản ứng lâm sàng 5 bước CRCE v3.0
│
├── data/                               # Cơ sở dữ liệu danh mục hạt nhân
│   └── vault-catalog.json              # File JSON 2.2MB chứa 2.400+ bài viết đã chỉ mục hóa
│
├── protocols/                          # Phân hệ Phác đồ điều trị động (Living Protocols)
│   ├── registry/                       # Kho dữ liệu phác đồ chuyên khoa có Type Safety
│   │   ├── cardio-protocols.ts         # Tim mạch (STEMI, NSTE-ACS, Suy tim cấp...)
│   │   ├── emergency-protocols.ts      # Cấp cứu (Phản vệ, Sốc nhiễm khuẩn, Ngộ độc...)
│   │   ├── gi-protocols.ts             # Tiêu hóa (Xuất huyết tiêu hóa, Viêm tụy cấp...)
│   │   ├── infectious-protocols.ts     # Truyền nhiễm (Sốt xuất huyết, Viêm màng não...)
│   │   ├── pulmo-protocols.ts          # Hô hấp (Cơn hen phế quản cấp, Đợt cấp COPD...)
│   │   └── index.ts                    # Master Registry Export & Bộ tra cứu ICD-10
│   ├── protocol-types.ts               # Định nghĩa Schema TypeScript cho Phác đồ
│   ├── protocol-conflict-engine.ts     # Bộ quét xung đột chống chỉ định chéo đa bệnh
│   ├── protocol-flowchart-engine.ts    # Bộ sinh lưu đồ phác đồ SVG trực giao tự động
│   ├── protocol-metadata.ts            # Quản lý phiên bản & bằng chứng nguồn
│   ├── protocol-view.ts                # Giao diện hiển thị chi tiết phác đồ lâm sàng
│   ├── index.ts                        # Entry point phân hệ Protocols
│   ├── README.md                       # Sổ tay kiến trúc nội dung Markdown-Driven
│   └── VAN_HANH_HETHONG.md             # Hướng dẫn vận hành chi tiết toàn hệ sinh thái
│
├── types.ts                            # Khai báo TypeScript Interfaces chung toàn Vault
├── vault-loader.ts                     # Động cơ nạp, lọc danh mục & liên kết Pathway Matrix
├── vault-hub-view.ts                   # Giao diện Hub Dashboard Bento & điều phối ứng dụng
├── vault-reader-pro.ts                 # Trình đọc bài viết Pro (TOC ScrollSpy, Note, Ribbon)
├── vault-crce-view.ts                  # Chuỗi phản ứng lâm sàng 5 bước CRCE v3.0
├── vault-flowchart-engine.ts           # Studio lưu đồ thuật toán lâm sàng tương tác Pure SVG
├── vault-flashcard-engine.ts           # Động cơ thẻ Flashcard ôn tập ngắt quãng SM-2
├── index.ts                            # Entry point module TypeScript nạp cho ứng dụng
├── index.html                          # Cổng truy cập Web Portal độc lập (Standalone Hub)
└── README.md                           # Tài liệu kỹ thuật & vận hành này
```

---

## 🗄️ 4. Phân Hệ 16 Kho Tri Thức Y Khoa Chuyên Biệt

Toàn bộ 2.400+ bài viết trong `vault-catalog.json` được chuẩn hóa và phân bố trên **16 Kho Kiến Thức EBM**, chia thành 3 khối lớn:

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                   DANH MỤC 16 PHÂN KHO TRI THỨC Y KHOA                                      │
├──────┬───────────────┬────────────┬─────────────────────────────┬───────────────────┬───────────────────────┤
│ STT  │ Mã Phân Kho   │ Biểu tượng │ Tên Phân Kho                │ Khối Phân Loại    │ Màu Sắc Định Danh     │
├──────┼───────────────┼────────────┼─────────────────────────────┼───────────────────┼───────────────────────┤
│  1   │ GPSL          │ 🫀         │ Giải Phẫu & Sinh Lý Học     │ Cơ Sở Y Khoa      │ #0284c7 (Sky Blue)    │
│  2   │ HS            │ 🧪         │ Hóa Sinh Y Học              │ Cơ Sở Y Khoa      │ #8b5cf6 (Purple)      │
│  3   │ SLB           │ ⚡         │ Sinh Lý Bệnh & Cơ Chế       │ Cơ Sở Y Khoa      │ #f59e0b (Amber)       │
│  4   │ DTH           │ 🦠         │ Dịch Tễ Học & Y Tế Công Cộng│ Cơ Sở Y Khoa      │ #10b981 (Emerald)     │
│  5   │ KN            │ 🩺         │ Kỹ Năng Lâm Sàng & Bedside  │ Cơ Sở Y Khoa      │ #6366f1 (Indigo)      │
│  6   │ YTNC          │ ⚠️         │ Yếu Tố Nguy Cơ Bệnh Học     │ Chuyên Sâu        │ #f97316 (Orange)      │
│  7   │ TC            │ 🔍         │ Lâm Sàng & Triệu Chứng      │ Chuyên Sâu        │ #0ea5e9 (Ocean)       │
│  8   │ CLS           │ 🧪         │ Cận Lâm Sàng & Đọc Xét Nghiệm│ Chuyên Sâu       │ #6366f1 (Indigo)      │
│  9   │ CD            │ 📋         │ Tiêu Chuẩn Chẩn Đoán        │ Chuyên Sâu        │ #ec4899 (Pink)        │
│ 10   │ PDDT          │ 💊         │ Phác Đồ Điều Trị            │ Chuyên Sâu        │ #3b82f6 (Blue)        │
│ 11   │ DUOC          │ 💊         │ Dược Lâm Sàng & Tra Thuốc   │ Chuyên Sâu        │ #06b6d4 (Cyan)        │
│ 12   │ TV            │ 🤝         │ Tư Vấn & Giáo Dục Bệnh Nhân │ Chuyên Sâu        │ #84cc16 (Lime)        │
│ 13   │ BC            │ 💔         │ Biến Chứng & Tiên Lượng     │ Chuyên Sâu        │ #ef4444 (Rose/Red)    │
│ 14   │ CC            │ 🧮         │ Công Cụ & Thang Điểm Y Khoa │ Hỗ Trợ Lâm Sàng   │ #f59e0b (Amber)       │
│ 15   │ EBM           │ 📊         │ NCKH & Y Học Chứng Cứ       │ Hỗ Trợ Lâm Sàng   │ #64748b (Slate)       │
│ 16   │ CORE / RAW    │ 🧬         │ Thực Thể Hạt Nhân & Kho Thô │ Hỗ Trợ Lâm Sàng   │ #a855f7 (Violet)      │
└──────┴───────────────┴────────────┴─────────────────────────────┴───────────────────┴───────────────────────┘
```

### Cấu Trúc Dữ Liệu Bài Viết (`VaultArticle` Schema):
```typescript
export interface VaultArticle {
  id: string;               // Định danh duy nhất (VD: "slb-suy-tim-phan-xuat-tong-mau-giam")
  title: string;            // Tên bài viết chuẩn tiếng Việt có dấu
  fullFileName: string;     // Tên tệp nguồn (.md)
  khoCode: string;          // Mã phân kho (GPSL, HS, SLB, DTH, CD, PDDT...)
  khoName: string;          // Tên đầy đủ của phân kho
  khoGroup?: string;        // Cơ sở, Chuyên sâu hoặc Hỗ trợ
  khoDir: string;           // Tên thư mục phân kho tương ứng
  khoIcon: string;          // FontAwesome icon class (VD: "fa-heart-pulse")
  khoColor?: string;        // Màu sắc chủ đạo dạng HEX code
  specialty: string;        // Chuyên khoa (Tim mạch, Hô hấp, Tiêu hóa, Cấp cứu...)
  part: string;             // Phân mục bài học hoặc khối kiến thức
  relPath: string;          // Đường dẫn tương đối phục vụ nạp nội dung
  snippet: string;          // Tóm tắt cô đọng 2-3 câu giá trị nhất của bài viết
  readTime: string;         // Thời gian đọc ước tính (VD: "8 phút")
  aliases?: string[];       // Danh sách từ khóa đồng nghĩa, tên viết tắt (HFrEF, CHF...)
  keywords?: string[];      // Từ khóa chuyên môn phục vụ tìm kiếm Full-Text
  icd10?: string[];         // Danh sách mã ICD-10 liên đới (VD: ["I50.2", "I50.9"])
  tags?: string[];          // Thẻ phân loại nội dung
  content?: string;         // Nội dung Markdown đã biên tập (khi được nạp đầy đủ)
}
```

---

## ⚡ 5. Động Cơ Nạp & Tra Cứu Tức Thì (Vault Loader Engine)

Tệp `vault-loader.ts` đảm nhiệm vai trò trung tâm phân phối dữ liệu cho toàn bộ giao diện:

### 5.1. Thuật Toán Tìm Kiếm Đa Trường (Multi-Field Fast Search)
Khác với tìm kiếm chuỗi đơn thuần, `filterVaultArticles(filter: VaultFilterState)` tiến hành quét đồng thời 7 thuộc tính của từng bài viết với độ trễ tối ưu:
1. Tiêu đề bài viết (`title`)
2. Tên chuyên khoa (`specialty`)
3. Nội dung tóm tắt (`snippet`)
4. Tên phân kho (`khoName`)
5. Danh sách tên viết tắt / từ đồng nghĩa (`aliases`)
6. Từ khóa y khoa trích xuất (`keywords`)
7. Mã phân loại bệnh tật quốc tế (`icd10`)

### 5.2. Ma Trận Xâu Chuỗi Bệnh Học 5 Chiều (`findPathwayArticles`)
Khi người dùng đang đọc một bài viết bất kỳ, thuật toán chuẩn hóa tên bệnh và tự động liên kết tới các bài viết song hành cùng chủ đề trên các phân kho khác:

```typescript
export interface ClinicalPathwayLinks {
  conditionName: string;
  gpsl?: VaultArticle;   // Giải phẫu & Sinh lý
  slb?: VaultArticle;    // Sinh lý bệnh
  dth?: VaultArticle;    // Dịch tễ học
  ytnc?: VaultArticle;   // Yếu tố nguy cơ
  cd?: VaultArticle;     // Tiêu chuẩn chẩn đoán
  pddt?: VaultArticle;   // Phác đồ điều trị
  bc?: VaultArticle;     // Biến chứng
  tv?: VaultArticle;     // Tư vấn
  cn?: VaultArticle;     // Cập nhật mới nhất
}
```

---

## 📖 6. Trình Đọc Y Khoa Chuyên Sâu (Medical Reader Pro Engine)

Tệp `vault-reader-pro.ts` cung cấp trải nghiệm đọc bài viết chuẩn tạp chí y khoa (Medical Editorial Reading) dạng Drawer trượt không làm gián đoạn bối cảnh làm việc:

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│  KNOWLEDGE VAULT MEDICAL READER PRO                                   [X ĐÓNG]   │
├──────────────────────────────────────────────────────────────────────────────────┤
│  🫀 TIM MẠCH • KHO TIÊU CHUẨN CHẨN ĐOÁN (CD) • ĐỌC 10 PHÚT                      │
│  Tiêu Chuẩn Chẩn Đoán & Phân Độ Suy Tim Toàn Diện (ESC 2023 / AHA 2022)          │
├──────────────────────────────────────────────────────────────────────────────────┤
│  [A- / A+ Cỡ Chữ]  [Phông: Sans / Serif]  [⛶ Toàn Màn Hình]  [📋 Copy Trích Dẫn]│
├──────────────────────────────────────────────────────────────────────────────────┤
│  CLINICAL PATHWAY MATRIX:                                                        │
│  [GP-Sinh Lý] ➔ [Sinh Lý Bệnh] ➔ [Dịch Tễ] ➔ [★ CHẨN ĐOÁN] ➔ [Phác Đồ] ➔ [Biến Chứng] │
├──────────────────────────┬───────────────────────────────────────────────────────┤
│  MỤC LỤC BÀI VIẾT (TOC)  │  NỘI DUNG CHUYÊN SÂU                                  │
│  • 1. Định nghĩa đồng thuận│  ### 1. Định Nghĩa Đồng Thuận Toàn Cầu                │
│  • 2. Tiêu chuẩn BNP/NT  │  Suy tim là hội chứng lâm sàng đặc trưng bởi các     │
│  • 3. Phân độ LVEF       │  triệu chứng cơ năng và/hoặc thực thể do bất thường  │
│  • 4. Lưu đồ quyết định  │  cấu trúc hoặc chức năng tim...                       │
│  • 5. Điểm ngọc lâm sàng │                                                       │
│                          │  > [!IMPORTANT]                                       │
│                          │  > Điểm cắt NT-proBNP loại trừ suy tim cấp: < 300 pg/mL│
│                          │                                                       │
│  📝 ĐÚC KẾT LÂM SÀNG     │  :::clinical-pearl                                    │
│  [+ Thêm Pearl Ghi Chú]  │  💎 Điểm ngọc: Không bao giờ được dùng chẹn Beta ở BN  │
│  "Cần kiểm tra Kali và   │  suy tim đang trong giai đoạn mất bù ướt cấp tính.   │
│  chức năng thận trước    │  :::                                                  │
│  khi tăng liều MRA..."   │                                                       │
└──────────────────────────┴───────────────────────────────────────────────────────┘
```

### Các Tính Năng Nổi Bật Của Reader Pro:
- **Sticky Table of Contents & ScrollSpy**: Tự động bóc tách các thẻ tiêu đề (`h2`, `h3`, `h4`) từ bài viết để tạo mục lục nổi bên trái. Khi cuộn trang, thanh đánh dấu tự động di chuyển đến đề mục đang đọc theo thời gian thực.
- **Reading Controls Bar**:
  - Tăng/giảm kích thước chữ ($0.85\text{rem} \rightarrow 1.4\text{rem}$) lưu vào cấu hình cá nhân.
  - Chuyển đổi font chữ: **Sans-Serif** (`Inter`) hiện đại hoặc **Serif** (`Merriweather`) chống mỏi mắt.
  - Chế độ đọc toàn màn hình (Distraction-free Fullscreen).
  - Tự động trích dẫn chuẩn Y khoa (Format Vancouver & Harvard với 1-Click Copy).
- **Hệ Thống Ghi Chú & Điểm Ngọc Lâm Sàng Cá Nhân (Personal Annotations)**:
  - Cho phép Bác sĩ lưu lại các mẹo kinh nghiệm, liều lượng cá thể hóa ngay dưới chân bài viết.
  - Dữ liệu được cô lập và mã hóa theo `profileId` trong LocalStorage, sẵn sàng đồng bộ sang DocSpace.
- **Bách Khoa Nhanh (Encyclopedia Quick Facts)**: Bảng tóm tắt các thông số cốt lõi: Mã ICD-10, Tiêu chuẩn vàng chẩn đoán (Gold Standard Dx), Lựa chọn điều trị hàng đầu (First-line Rx), Cảnh báo khẩn cấp (Critical Red Flags) và Tiên lượng.

---

## 🔬 7. Chuỗi Phản Ứng Lâm Sàng 5 Bước (CRCE v3.0)

Tệp `vault-crce-view.ts` hiện thực hóa phân hệ **Clinical Reaction Chain Engine (CRCE v3.0)** — Công cụ hỗ trợ ra quyết định lâm sàng độc lập kết nối 16 Kho Tri Thức EBM cho **30 bệnh lý nội khoa trọng tâm**.

```
   ┌─────────────────────────────────────────────────────────────────────────────┐
   │                     CHUỖI PHẢN ỨNG LÂM SÀNG 5 BƯỚC CRCE v3.0                 │
   └──────────────────────────────────────┬──────────────────────────────────────┘
                                          │
    ┌───────────────┬─────────────────────┼─────────────────────┬───────────────┐
    ▼               ▼                     ▼                     ▼               ▼
┌───────────────┐ ┌───────────────┐ ┌───────────────┐ ┌───────────────┐ ┌───────────────┐
│    BƯỚC 1     │ │    BƯỚC 2     │ │    BƯỚC 3     │ │    BƯỚC 4     │ │    BƯỚC 5     │
│  Tiêu Chuẩn   │ │   Phác Đồ     │ │  Động Học     │ │  Dược Lâm     │ │ Biến Chứng &  │
│  Chẩn Đoán    │ │  Điều Trị     │ │ Cận Lâm Sàng  │ │  Sàng GDMT    │ │  Dự Phòng     │
│ & Phân Tầng   │ │ Phân Mức Độ   │ │ & Theo Dõi    │ │ & Chỉnh Thận  │ │  Tiến Triển   │
└───────────────┘ └───────────────┘ └───────────────┘ └───────────────┘ └───────────────┘
```

### Chi Tiết 5 Bước Xử Trí Chuẩn Hóa:
1. **Bước 1: Tiêu Chuẩn Chẩn Đoán & Phân Tầng Nguy Cơ**:
   - Tích hợp bộ tiêu chuẩn từ `diagnostic-criteria-database.ts` (Duke trong VNTNT, Framingham/ESC trong Suy tim, Ranson/Atlanta trong Viêm tụy cấp, CURB-65 trong Viêm phổi...).
   - Bộ đếm tương tác Checklist: Tự động tính toán **tỷ lệ % thỏa mãn tiêu chuẩn** và thông báo xác nhận chẩn đoán (Đạt / Chưa đạt / Nghi ngờ cao).
2. **Bước 2: Phác Đồ Điều Trị Phân Tầng**:
   - Chia nhánh rõ ràng theo mức độ bệnh: Thể nhẹ (Ngoại trú) $\rightarrow$ Thể trung bình (Nội viện) $\rightarrow$ Thể nặng/Nguy kịch (Hồi sức tích cực ICU).
   - Mục tiêu điều trị cụ thể (Đích huyết áp, đích glucose, đích SpO2, đích hồi sức thể tích).
3. **Bước 3: Động Học Cận Lâm Sàng & Xét Nghiệm Theo Dõi**:
   - Tần suất làm lại xét nghiệm (hs-Troponin 0h/1h/3h, Khí máu động mạch, Lactate máu động học, Điện giải đồ...).
   - Chỉ dấu báo hiệu tình trạng xấu đi cần can thiệp cấp cứu.
4. **Bước 4: Dược Lâm Sàng & Chỉnh Liều Cơ Quan**:
   - Bảng liều thuốc chi tiết: Đường dùng, liều nạp (Loading dose), liều duy trì, cách chỉnh liều theo mức lọc cầu thận (eGFR CKD-EPI) và phân độ suy gan (Child-Pugh).
   - Đánh dấu thuốc Cảnh báo cao (High-Alert Medications: Vận mạch, Kháng đông, Insulin).
5. **Bước 5: Biến Chứng Thường Gặp & Chiến Lược Dự Phòng**:
   - Ma trận biến chứng cấp tính và mạn tính đi kèm hành động dự phòng tức thì.

---

## 📋 8. Phân Hệ Phác Đồ Động & Rà Quét Xung Đột (Living Protocols & Conflict Engine)

Phân hệ `src/content/knowledge-vault/protocols/` định nghĩa chuẩn quản lý phác đồ điều trị thích ứng:

### 8.1. Master Protocol Schema (`protocol-types.ts`)
Mỗi phác đồ điều trị được cấu trúc hóa chặt chẽ:
- **`ClinicalProtocol`**: ID, Tiêu đề, Mã ICD-10, Mức độ ưu tiên phân loại (`emergency` / `inpatient` / `outpatient`), Hướng dẫn nguồn (BYT, ESC, AHA, GINA, GOLD), Bằng chứng (Class I-III, Level A-C), Chuỗi bước xử trí (`steps[]`), Danh sách chống chỉ định chéo (`contraindications[]`), Ma trận ra quyết định cùng bệnh nhân (`sharedDecisionOptions[]`).
- **`ProtocolStep`**: Từng bước thuật toán có định danh, giai đoạn (`triage`, `first-line`, `second-line`, `refractory`, `recovery`), mốc thời gian tối ưu, điều kiện rẽ nhánh (NẾU... THÌ...) và danh mục thuốc sử dụng.

### 8.2. Bộ Rà Quét Xung Đột Chống Chỉ Định Chéo (`protocol-conflict-engine.ts`)
Khi bệnh nhân mắc cùng lúc nhiều bệnh lý (Multimorbidity, ví dụ: *Sốt xuất huyết Dengue ngày 4* kèm *Rung nhĩ đang dùng Kháng đông* hoặc *Hen phế quản* kèm *Bệnh cơ tim thiếu máu cục bộ*):
- Hàm `analyzeClinicalProblems(problems: ClinicalProblemInput[])` tự động khớp các phác đồ tương ứng từ Registry.
- Rà quét chéo mâu thuẫn: Phát hiện thuốc chỉ định ở bệnh A nhưng là chống chỉ định nguy hiểm ở bệnh B (VD: Kháng viêm NSAIDs / Aspirin trong Sốt xuất huyết).
- Phân tầng mức độ nguy hiểm: **Tuyệt đối (Absolute)**, **Tương đối (Relative)** hoặc **Cảnh giác (Caution)**, đồng thời đưa ra phương án thay thế an toàn.
- Gom cụm danh sách thuốc hợp nhất và các dấu hiệu cảnh báo đỏ (Red Flags).

---

## 🎨 9. Studio Lưu Đồ Lâm Sàng Tương Tác (Flowchart Studio & Decision Trees)

Tệp `vault-flowchart-engine.ts` và `protocols/protocol-flowchart-engine.ts` triển khai công nghệ dựng sơ đồ thuật toán y khoa bằng **Pure Vector SVG** (100% không dùng thư viện ngoài như Mermaid hay Chart.js để đảm bảo tính ổn định và tốc độ):

```
                  ┌────────────────────────────────────────┐
                  │    Tiếp nhận Đau ngực cấp tại Cấp cứu   │
                  │   Sinh hiệu, SpO2, Lắp Monitor, ECG 10'│
                  └───────────────────┬────────────────────┘
                                      │
                                      ▼
                             /────────────────\
                            /   ECG 12 CĐ có   \
                           <    ST chênh lên?   >
                            \   (STEMI Check)  /
                             \────────────────/
                               /            \
                       CÓ     /              \   KHÔNG
                             ▼                ▼
       ┌───────────────────────────────┐    ┌───────────────────────────────┐
       │   STEMI: Kích Hoạt PCI Khẩn   │    │  Định lượng hs-Troponin 0h/1h │
       │  Door-to-Balloon < 90 phút    │    │ Phân tầng Nguy cơ NSTE-ACS    │
       │  DAPT + Heparin UFH 70-100U/kg│    │ GRACE Score & Bắt đầu DAPT    │
       └───────────────────────────────┘    └───────────────────────────────┘
```

### Các Tiêu Chuẩn Kỹ Thuật Đồ Họa SVG Editorial:
1. **Responsive Viewport**: Khung vẽ chuẩn tỷ lệ vàng $960 \times 620$, tự động co giãn (`viewBox`) trên màn hình điện thoại và máy tính bảng.
2. **Đường Nối Trực Giao Bo Cong (Orthogonal Smooth Curves)**: Đường rẽ nhánh đi vuông góc $90^\circ$ và bo tròn bằng lệnh cong bậc hai $Q$ (`M x1 y1 L x2 y2 Q cx cy x3 y3...`), tuyệt đối không dùng đường xiên chéo gây rối mắt.
3. **Mặt Nạ Chống Đè Nhãn (Label Masking Rect)**: Các nhãn điều kiện ("CÓ", "KHÔNG", "Sau 1 giờ"...) được lót khung nền hình chữ nhật đồng màu nền để không bị đè nét vẽ.
4. **Hệ Màu Node Chuẩn Hóa**:
   - `start`: Khởi đầu (Xanh da trời)
   - `decision`: Điểm ra quyết định / Rẽ nhánh (Tím Indigo)
   - `action`: Hành động can thiệp (Xanh lá Emerald)
   - `alert`: Báo động đỏ / Cấp cứu khẩn (Đỏ Rose)
   - `stable`: Đích an toàn / Theo dõi định kỳ (Xám Slate)
5. **Tương Tác Drilldown**: Nhấp chuột vào bất kỳ node nào trên sơ đồ sẽ mở bảng chi tiết bên cạnh: Khuyến cáo cụ thể, mức độ chứng cứ và các hành động cần làm ngay.

---

## 🧠 10. Động Cơ Thẻ Ghi Nhớ Ôn Tập Ngắt Quãng SM-2 (Medical Flashcards)

Tệp `vault-flashcard-engine.ts` tích hợp hệ thống ôn tập lặp lại ngắt quãng (Spaced Repetition System) chuẩn **SuperMemo SM-2** giúp ghi nhớ lâu dài các kiến thức sống còn tại giường bệnh:

### 10.1. Thuật Toán Tính Khoảng Cách Ôn Tập SuperMemo SM-2
Với mỗi lần người dùng tự đánh giá mức độ nhớ ($q$ từ $0$ đến $5$):
- **Hệ số dễ nhớ (Easiness Factor - $EF$)**:
  $$EF' = EF + (0.1 - (5 - q) \times (0.08 + (5 - q) \times 0.02))$$
  *(Giá trị nhỏ nhất của $EF'$ được chặn dưới ở mức $1.3$)*
- **Khoảng cách ngày ôn tập tiếp theo ($I$)**:
  $$\begin{cases}
  I(1) = 1\text{ ngày} \\
  I(2) = 6\text{ ngày} \\
  I(n) = I(n-1) \times EF' & (\text{với } n > 2)
  \end{cases}$$
- Nếu trả lời sai ($q < 3$): Chu kỳ lặp lại đưa về $n = 1$ và $I(1) = 1$ ngày để ôn lại ngay trong ca trực.

### 10.2. Ngân Hàng Thẻ Lâm Sàng Cốt Lõi (High-Yield Pearls)
Được chọn lọc kỹ lưỡng từ các tình huống nguy cấp thường gặp:
- Chống chỉ định Nitroglycerin trong Nhồi máu cơ tim thất phải.
- Cơ chế hội chứng Red Man Syndrome do truyền Vancomycin quá nhanh.
- Quy tắc bù Kali trước khi tiêm Insulin trong Nhiễm toan Ceton đái tháo đường (DKA).
- Công thức tính Thang điểm CURB-65 và quyết định vị trí nhập viện (Ngoại trú, Khoa Nội hay ICU).
- Hiệu ứng 3D CSS Card Flip mượt mà, hỗ trợ chế độ làm bài kiểm tra nhanh **Daily Shift Challenge**.

---

## 🎨 11. Giao Diện Bento Grid, Design Tokens & Dark Mode 100%

Hệ thống giao diện của Knowledge Vault (`css/vault-hub.css` và `css/vault-crce.css`) được xây dựng 100% trên hệ thống **Design Tokens của CliniPortal**, đảm bảo tính thẩm mỹ, nhất quán và thân thiện với thị giác Bác sĩ:

```css
:root {
  --vault-primary: var(--color-primary, #0284c7);
  --vault-surface: var(--color-surface, #ffffff);
  --vault-bg: var(--color-bg, #f8fafc);
  --vault-border: var(--color-border, #e2e8f0);
  --vault-text: var(--color-text, #0f172a);
  --vault-muted: var(--color-text-muted, #64748b);
  --vault-radius: 12px;
}

[data-theme="dark"] {
  --vault-surface: var(--color-surface, #1e293b);
  --vault-bg: var(--color-bg, #0f172a);
  --vault-border: var(--color-border, #334155);
  --vault-text: var(--color-text, #f8fafc);
  --vault-muted: var(--color-text-muted, #94a3b8);
}
```

### Nguyên Tắc Thiết Kế UI/UX:
- **Tuyệt đối không hardcode màu sắc**: Mọi thành phần đều kế thừa biến CSS `var(--vault-...)` để đồng bộ khi chuyển đổi Dark Mode (`data-theme="dark"`).
- **Thẻ Bento Grid Tương Tác**: Bố cục dạng Bento hiện đại, hiển thị trực quan biểu tượng phân kho, mã kho, số lượng bài viết và thẻ chuyên khoa.
- **Tối ưu hóa thiết bị di động (Mobile First)**: Thanh điều hướng rút gọn, Drawer vuốt trượt cảm ứng mượt mà và vùng chạm cảm ứng luôn $\ge 44\text{px}$.

---

## 🔄 12. Tích Hợp Hai Chiều: Obsidian Vault & DocSpace Pro

Knowledge Vault đóng vai trò là "bộ não tri thức" kết nối liền mạch với các công cụ tác chiến khác:

### 12.1. Cầu Nối Obsidian Medical DeepLink
Hệ thống hỗ trợ giao thức liên kết sâu `obsidian://`:
- Nhấp vào nút **Obsidian DeepLink** trên thanh Header để mở trực tiếp thư mục ghi chú của dự án trên ứng dụng Obsidian máy tính:
  ```text
  obsidian://open?vault=Apps_ykhoa&file=src%2Fcontent%2F...
  ```
- Cho phép Bác sĩ vừa tra cứu nhanh trên trình duyệt web, vừa ghi chép nghiên cứu học thuật chuyên sâu trên Obsidian cá nhân.

### 12.2. Tương Tác Hai Chiều Với DocSpace Bedside Workspace
Từ giao diện làm việc DocSpace Pro tại giường bệnh:
- Nhấn tổ hợp phím **`Ctrl + Shift + V`** để mở Drawer tra cứu Knowledge Vault tức thì.
- **1-Click Insert Protocol**: Nhúng ngay các bước xử trí của phác đồ vào mục **Kế hoạch (Plan)** của bệnh án SOAP điện tử.
- **RAG Grounding**: Cung cấp ngữ cảnh bài viết từ `vault-catalog.json` cho trợ lý AI đa nhà cung cấp (Gemini, Claude, GPT) để trả lời ca bệnh có dẫn chứng y văn chính xác.

### 12.3. Điều Hướng Qua URL Parameters (Deep Linking)
Hỗ trợ mở trực tiếp các trạng thái giao diện thông qua URL:
```text
# Mở trực tiếp bài viết trong Drawer:
index.html?article=slb-suy-tim-phan-xuat-tong-mau-giam

# Mở chuỗi phản ứng CRCE của bệnh Đau thắt ngực ổn định:
index.html?disease=cad_stable

# Mở một phác đồ điều trị cụ thể:
index.html?protocol=pddt-dengue-byt-2023

# Lọc theo Phân kho và Từ khóa tìm kiếm:
index.html?kho=PDDT&search=suy+tim
```

---

## 🛠️ 13. Hướng Dẫn Mở Rộng & Đóng Góp (Developer & Contributor Guide)

### 13.1. Thêm Bài Viết Mới Vào Danh Mục Hạt Nhân
Khi có bài viết mới được biên soạn trong các phân hệ (`src/content/`), cần bổ sung đối tượng vào `data/vault-catalog.json`:
```json
{
  "id": "cd-viem-tuy-cap-atlanta",
  "title": "Tiêu Chuẩn Chẩn Đoán Viêm Tụy Cấp (Hiệu Chỉnh Atlanta)",
  "fullFileName": "viem-tuy-cap-atlanta.md",
  "khoCode": "CD",
  "khoName": "Tiêu chuẩn chẩn đoán",
  "khoGroup": "Chuyên sâu",
  "khoDir": "CD",
  "khoIcon": "fa-clipboard-check",
  "khoColor": "#ec4899",
  "specialty": "Tiêu hóa & Gan mật",
  "part": "Cấp cứu bụng",
  "relPath": "src/content/ebm/guidelines/viem-tuy-cap.md",
  "snippet": "Chẩn đoán xác định khi thỏa mãn ít nhất 2 trong 3 tiêu chuẩn: Đau bụng cấp kiểu tụy, Amylase/Lipase máu tăng trên 3 lần giới hạn trên, và hình ảnh học điển hình.",
  "readTime": "6 phút",
  "aliases": ["Acute Pancreatitis", "VTC", "Atlanta 2012"],
  "keywords": ["Lipase", "Amylase", "CT Balthazar", "Bù dịch"],
  "icd10": ["K85", "K85.9"]
}
```

### 13.2. Đăng Ký Phác Đồ Mới Vào Protocols Registry
Tạo tệp phác đồ mới hoặc cập nhật trong `protocols/registry/`:
```typescript
import { ClinicalProtocol } from '../protocol-types';

export const MY_NEW_PROTOCOL: ClinicalProtocol = {
  id: 'pddt-my-new-condition',
  title: 'Phác đồ Xử trí Tình trạng Y khoa Mới',
  icd10: ['A00'],
  specialty: 'emergency',
  triageLevel: 'emergency',
  guidelineSource: 'Quyết định 1234/QĐ-BYT',
  evidenceLevel: 'Class I, Level A',
  year: 2026,
  summary: 'Tóm tắt các nguyên tắc xử trí cốt lõi...',
  redFlags: ['Tụt huyết áp', 'Lơ mơ'],
  steps: [
    {
      stepId: 'step_1',
      order: 1,
      phase: 'triage',
      title: 'Đánh giá ban đầu',
      description: 'Kiểm tra sinh hiệu...',
      flowchartNodeType: 'start'
    }
  ],
  contraindications: [],
  sharedDecisionOptions: []
};
```
Sau đó export vào `protocols/registry/index.ts` để tự động tích hợp vào hệ thống quét xung đột và vẽ lưu đồ.

### 13.3. Quy Chuẩn Kiểm Tra Toàn Vẹn (QA Verification Checklist)
Trước khi bàn giao hoặc commit mã nguồn mới:
- [ ] Chạy kiểm tra cú pháp TypeScript không xuất hiện lỗi type checking.
- [ ] Đảm bảo toàn bộ màu sắc mới đều sử dụng CSS Variables `var(--vault-...)` hoặc `var(--color-...)`.
- [ ] Kiểm tra giao diện Dark Mode hiển thị rõ nét, độ tương phản đạt chuẩn WCAG AA ($\ge 4.5:1$).
- [ ] Kiểm tra tính toàn vẹn của tệp `index.html` bằng công cụ kiểm tra thẻ HTML nội bộ (`node tools/scratch/check_tags.js`).
- [ ] Đảm bảo đường dẫn tương đối đúng cấp thư mục khi nhúng tài nguyên hình ảnh hoặc CSS.

---

> 👨‍⚕️ **Ban Biên Tập Tri Thức & Công Nghệ Y Khoa CliniPortal**  
> *Hệ thống được phát triển với tinh thần cẩn trọng Karpathy: Chính xác về mặt Y học chứng cứ, Tối ưu về mặt Khoa học máy tính.*
