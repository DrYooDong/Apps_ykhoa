# Sơ đồ Vận hành Hệ sinh thái DocSpace

DocSpace là "Không gian riêng" của bác sĩ trên nền tảng CliniPortal. Đây là phân hệ chạy hoàn toàn trên trình duyệt (client-side), lưu trữ dữ liệu nội bộ bằng Local Storage / IndexedDB và có thể hoạt động offline 100%.

Dưới đây là sơ đồ vận hành tổng thể của hệ sinh thái DocSpace:

## 1. Flowchart Tổng thể (Mermaid)

```mermaid
graph TD
    %% Define Styles
    classDef core fill:#0284c7,stroke:#0369a1,stroke-width:2px,color:#fff,rx:5px;
    classDef feature fill:#e0f2fe,stroke:#38bdf8,stroke-width:1px,color:#0c4a6e;
    classDef data fill:#fdf4ff,stroke:#e879f9,stroke-width:1px,color:#701a75;
    classDef storage fill:#fffbeb,stroke:#fbbf24,stroke-width:1px,color:#78350f;
    classDef ai fill:#ecfdf5,stroke:#34d399,stroke-width:1px,color:#064e3b;

    subgraph "1. User & Access Layer (Truy cập)"
        U([👤 Bác sĩ / Người dùng])
        Login[Profile Selector<br/>Đăng nhập / Tạo hồ sơ]:::core
        Dash[Dashboard<br/>Màn hình Hub]:::core
    end

    subgraph "2. Core Features Layer (Tính năng Cốt lõi)"
        SOAP[SOAP Digital<br/>Sổ tay Bệnh phòng]:::feature
        SBAR[SBAR<br/>Báo cáo & Bàn giao]:::feature
        OnCall[Checklist<br/>Quản lý Trực]:::feature
        Cases[Case Logger<br/>Lưu trữ Ca bệnh]:::feature
        Notes[Notepad<br/>Ghi chú cá nhân]:::feature
        Drugs[Drug Journal<br/>Nhật ký Thuốc]:::feature
        Protocol[Personal Protocol<br/>Phác đồ Cá nhân]:::feature
        Links[Quick Links<br/>Danh bạ / Liên kết]:::feature
    end

    subgraph "3. Experimental & AI Layer (Lab Mode)"
        AIEngine[AI RAG Engine<br/>rag-engine.ts]:::ai
        LivingProtocol[Living Protocols<br/>Phác đồ Động]:::ai
        Sandbox[Sandbox<br/>Mô phỏng Ca bệnh]:::ai
        AISettings[AI Settings<br/>Cấu hình Local LLM]:::ai
    end

    subgraph "4. Data & Storage Layer (Lưu trữ Client-Side)"
        Storage[(Local Storage / IndexedDB<br/>storage.ts)]:::storage
        FHIRAdapter[FHIR R4 Adapter<br/>Chuyển đổi chuẩn hóa]:::data
        JSONExport[File Export/Import<br/>.json & FHIR JSON]:::data
    end

    %% Interactions - Access
    U --> Login
    Login -- "Xác thực / Chọn Profile" --> Dash
    
    %% Interactions - Features
    Dash --> SOAP
    Dash --> SBAR
    Dash --> OnCall
    Dash --> Cases
    Dash --> Notes
    Dash --> Drugs
    Dash --> Protocol
    Dash --> Links
    Dash --> AISettings

    %% Interactions - Storage
    Login <--> Storage
    Dash <--> Storage
    SOAP <--> Storage
    SBAR <--> Storage
    OnCall <--> Storage
    Cases <--> Storage
    Notes <--> Storage
    Drugs <--> Storage
    Protocol <--> Storage
    Links <--> Storage
    AISettings <--> Storage

    Storage <--> FHIRAdapter
    FHIRAdapter <--> JSONExport
    Storage <--> JSONExport

    %% Interactions - AI
    AISettings -. "Bật/Tắt tính năng Lab" .-> AIEngine
    LivingProtocol -. "Gọi local AI" .-> AIEngine
    Sandbox -. "Chạy giả lập" .-> AIEngine
    SBAR -. "RAG Hỗ trợ" .-> AIEngine
    Cases -. "Vector tìm kiếm" .-> AIEngine
    
    LivingProtocol <--> Storage
    Sandbox <--> Storage
```

## 2. Các Lớp Kiến trúc (Architecture Layers)

### 2.1. User & Access Layer
- **Profile Selector (`storage.ts`, `docspace-view.ts`)**: Mọi dữ liệu được phân lập (isolate) theo từng Hồ sơ Bác sĩ (Profile ID). Nếu chưa chọn hồ sơ, người dùng bắt buộc phải tạo/đăng nhập.
- **Dashboard (`docspace-view.ts`)**: Trung tâm điều khiển (Hub) chứa thống kê tổng quan (số ca bệnh đã lưu, số SBAR đang hoạt động) và điều hướng (routing).

### 2.2. Core Features Layer (Các tính năng lâm sàng)
Tất cả các tính năng đều nằm trong thư mục `src/docspace/features/`:
1. **SOAP Digital**: Quản lý bệnh án hằng ngày theo cấu trúc Subjective - Objective - Assessment - Plan.
2. **SBAR**: Ghi chú hội chẩn, báo cáo ca bệnh (Situation - Background - Assessment - Recommendation).
3. **OnCall**: Checklist các công việc trong tua trực (nhắc nhở sinh hiệu, thuốc, xét nghiệm).
4. **Case Logger**: Sổ tay lưu trữ các ca bệnh hay, có thể đánh tag và tìm kiếm lại.
5. **Personal Notepad**: Ghi chú tự do bằng Markdown.
6. **Drug Journal**: Sổ tay ghi chép kinh nghiệm tương tác thuốc, liều lượng cá nhân.
7. **Personal Protocol**: Nơi bác sĩ tự xây dựng phác đồ cá nhân.
8. **Quick Links**: Danh sách các liên kết, danh bạ nội bộ hay dùng.

### 2.3. Experimental & AI Layer (Phân hệ AI)
Thư mục `src/docspace/ai/` xử lý kết nối với Local LLM / API:
- **AI Settings**: Giao diện cấu hình WebLLM, API Key hoặc Local endpoint (Ollama/LM Studio).
- **RAG Engine**: Hệ thống nhúng (Embeddings) và lưu trữ vector nội bộ để hỗ trợ tìm kiếm ngữ nghĩa trong Case Logger và SBAR.
- **Living Protocols**: Tạo phác đồ xử trí có khả năng điều chỉnh linh hoạt dựa trên dữ kiện bệnh nhân đầu vào qua AI.
- **Sandbox Mô phỏng**: Môi trường giả lập tình huống lâm sàng (như thi OSCE) để bác sĩ luyện tập.

### 2.4. Data & Storage Layer
Tất cả xử lý lưu trữ tập trung tại `src/docspace/storage.ts`:
- **Local Storage / IndexedDB**: Không dùng backend server. Dữ liệu lưu hoàn toàn trên trình duyệt người dùng.
- **Auto-Save Hook (`quick-save.ts`)**: Cơ chế tự động lưu khi bác sĩ gõ phím.
- **FHIR R4 Interoperability (`fhir-adapter.ts`)**: Bộ chuyển đổi (Adapter) cho phép ánh xạ dữ liệu SOAP/SBAR/Case sang định dạng chuẩn HL7 FHIR R4 (như *Practitioner, ClinicalImpression, Composition, Bundle*).
- **Export / Import**: Quản lý việc sao lưu thành file `.json` thông thường, hoặc trích xuất/nạp dữ liệu y khoa chuẩn hóa qua định dạng `.json` của FHIR để đồng bộ với các hệ thống HIS/EMR của bệnh viện. 

## 3. Quy trình Vận hành Tiêu chuẩn (Standard Operating Procedure)

1. **Khởi động**: Người dùng vào `#/docspace`. Trình duyệt kiểm tra LocalStorage xem có `dsp_active_profile` chưa.
2. **Xác thực**: Nếu chưa, render màn hình **Profile Selector**. Người dùng tạo hoặc chọn Profile.
3. **Điều hướng**: Sau khi có Profile, hệ thống render **Dashboard** và **Sidebar**. Sidebar được sử dụng để chuyển đổi nhanh giữa các công cụ.
4. **Làm việc (VD: Tạo SOAP mới)**: 
   - Controller (`soap-view.ts`) lấy `profileId`.
   - Render form. Bác sĩ điền nội dung.
   - Khi có thay đổi (input event), hook `quick-save` sẽ tự động trigger `saveDocSpaceData()`.
5. **Sao lưu**: Bác sĩ định kỳ click "Export" ở Sidebar để tải file `.json` về máy.
