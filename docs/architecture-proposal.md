# CliniPortal — Đề Xuất Kiến Trúc 5 Trụ Cột (Architecture Upgrade Blueprint)

> Tài liệu này tổng hợp ý tưởng nâng cấp kiến trúc tổng thể CliniPortal nhằm hiện đại hóa hệ thống, tối ưu hóa quy trình biên biên tập tri thức y khoa và cải thiện hiệu năng vận hành đa nền tảng.

---

## 🏛️ Sơ Đồ Kiến Trúc Đề Xuất (5 Layers)

```
        +-------------------------------------------------------+
        |                 PRESENTATION LAYER                    |
        |    Web (PWA)   |   Desktop (Electron)   |   Android   |
        +-------------------------------------------------------+
                                   |
        +-------------------------------------------------------+
        |             CORE UI ENGINE (Vite + Vanilla/TS)        |
        |   - Layout Engine    - Router (SPA)    - Theme System |
        +-------------------------------------------------------+
                                   |
        +-------------------------------------------------------+
        |                  DATA & SERVICES LAYER                |
        |   - FlexSearch Indexer  - IndexedDB  - Math Engine    |
        +-------------------------------------------------------+
                                   |
        +-------------------------------------------------------+
        |                   CONTENT SOURCES                     |
        |   - Markdown Content (.md)   - Dynamic Calculators     |
        +-------------------------------------------------------+
```

---

## 🔠 Trụ cột 1: Chuẩn hóa Naming & File System (ASCII Kebab-case)

Chuyển toàn bộ tên thư mục/file sang dạng kebab-case ASCII:
- `pages/Công cụ/` $\rightarrow$ `content/calculators/`
- `pages/Dược lý/` $\rightarrow$ `content/pharmacology/`
- `pages/Sinh lý - Sinh lý bệnh/` $\rightarrow$ `content/pathophysiology/`
- `pages/Y học chứng cứ/` $\rightarrow$ `content/ebm/`

**Localization Mapping**: Dùng 1 file cấu hình JSON (`categories.json`) để map từ slug ASCII sang tên hiển thị Tiếng Việt trên giao diện UI.

---

## 📄 Trụ cột 2: Tách biệt Nội dung & Động cơ (Content-Engine Decoupling)

Thay vì viết thủ công HTML cho từng bài y khoa, chuyển sang mô hình Markdown-Driven Content:
- Nội dung tri thức, kỹ năng, y học chứng cứ chuyển sang dạng file `.md` lưu trong `content/` và `knowledge-vault/`.
- Tích hợp bộ parser nhẹ client-side (`CliniMarkdown`). Khi người dùng mở một bài, Engine sẽ load file Markdown tương ứng và render vào Layout chuẩn duy nhất.
- **Lợi ích**: Quản lý bài viết y khoa cực kỳ đơn giản, sạch sẽ, có thể viết trên Obsidian / VS Code rồi đồng bộ thẳng vào app.

---

## 🛡️ Trụ cột 3: Hiện Đại Hóa Build Tooling (Vite + TypeScript)

Giữ nguyên nguyên lý không dùng framework nặng (React/Vue) để app siêu nhẹ, nhưng nâng cấp công cụ phát triển:
- **Sử dụng Vite**: Thay thế việc mở trực tiếp file `index.html` hoặc Live Server bằng Vite Bundle. Vite giúp gom nhóm module (ESM), tự động minify code CSS/JS, tối ưu PWA và đóng gói cho Capacitor/Electron mượt mà hơn.
- **Áp dụng TypeScript cho Core & Calculators**: Viết logic các công cụ tính toán ($ABG$, $eGFR$, $GCS$,...) bằng TypeScript để đảm bảo chính xác tuyệt đối về mặt kiểu dữ liệu và công thức toán học.

---

## 🔍 Trụ cột 4: Động Cơ Tìm Kiếm & Lưu Trữ Offline Tốc Độ Cao

- **FlexSearch / Pagefind Integration**: Tạo chỉ mục tìm kiếm (Search Index) ngay trong quá trình Build. Người dùng gõ từ khóa (ví dụ: "Sốc nhiễm khuẩn", "Sepsis", "Liều Vancomycin") sẽ ra kết quả tức thì trong $< 5\text{ms}$ mà không cần Internet.
- **IndexedDB Wrapper**: Lưu trữ dữ liệu tùy biến của người dùng (Lịch sử tính toán, bài viết đã lưu/bookmark, ghi chú cá nhân).

---

## 🧩 Trụ cột 5: Cấu Trúc Đóng Gói Modular "Clinical Calculator" & "Flow Studio"

Tách `clinical-flow-studio.html` và các công cụ tính toán thành các module độc lập theo dạng Web Components hoặc Pure JS Modules.

```
Apps_ykhoa/
├── .agents/
├── android/                   # Capacitor Native Android Project
├── desktop/                   # Electron Desktop Wrapper
├── mobile/                    # Mobile Build Scripts
├── knowledge-vault/           # OBSIDIAN VAULT (CHỦ SỞ HỮU TRI THỨC)
├── src/                       # TOÀN BỘ SOURCE CODE CHÍNH
│   ├── assets/                # Images, Icons, Fonts
│   ├── components/            # UI Reusable (Header, Sidebar, Modal, FlowViewer)
│   ├── content/               # DỮ LIỆU NỘI DUNG (MARKDOWN & DATA)
│   │   ├── calculators/       # Configs & Logic máy tính y khoa
│   │   ├── ebm/               # Y học chứng cứ (.md)
│   │   ├── pathophysiology/   # Sinh lý bệnh (.md)
│   │   ├── pharmacology/      # Dược lý (.md)
│   │   └── skills/            # Kỹ năng lâm sàng (.md)
│   ├── core/                  # ĐỘNG CƠ CỦA APP
│   │   ├── router.ts          # SPA Router
│   │   ├── markdown-engine.ts # Render Markdown -> HTML
│   │   ├── search-engine.ts   # FlexSearch Offline Engine
│   │   └── storage.ts         # IndexedDB Manager
│   ├── styles/                # CSS Modular & Design Tokens
│   │   ├── main.css
│   │   └── components/
│   └── index.ts               # Entry Point
├── index.html                 # App Container chính
├── vite.config.js             # Cấu hình Build cho Web / Electron / Capacitor
├── package.json
└── README.md
```
