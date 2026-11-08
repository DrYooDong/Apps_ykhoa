# Quy tắc Tối ưu Tốc độ & Trí tuệ Nhân tạo (Antigravity Speed & Intelligence Engine)

> Áp dụng trực tiếp từ kiến trúc Google Antigravity SDK, Conductor Workflow & Kho Antigravity Skills (rmyndharis/antigravity-skills) cho hệ sinh thái CliniPortal (Apps_ykhoa).

---

## ⚡ 1. NGUYÊN TẮC TỐC ĐỘ X5 - X10 (SPEED & HIGH THROUGHPUT)

1. **Chu trình 3 Nhịp Conductor (3-Beat Cadence)**:
   - **Nhịp 1 (Micro-Scoping)**: Xác định đúng 1-2 file và signature cần can thiệp. Không đọc lan man các file không liên quan.
   - **Nhịp 2 (Micro-Spec)**: Định hình trước trong đầu 3 yếu tố: Input/State -> Exact Mutation -> Acceptance Criteria trước khi gõ code.
   - **Nhịp 3 (Surgical Edit & Check)**: Dùng `edit_file` vi phẫu chính xác đúng khối code cần sửa. Chạy ngay kiểm tra tự động (`astro check`, linter).
2. **Progressive Disclosure & Zero Context Thrashing**:
   - Khi tiếp cận file lớn (>300 dòng), trích xuất danh sách signatures/types trước hoặc đọc đúng khoảng dòng (`StartLine`, `EndLine`).
   - Tuyệt đối không đọc toàn bộ file nếu chỉ cần kiểm tra một hàm hay interface.
3. **Chỉnh sửa Vi phẫu Tối thiểu (Symbol-Level & Surgical Edits)**:
   - Bắt buộc dùng `edit_file` để thay thế đúng đoạn target (10-30 dòng). Tuyệt đối không dùng `write_file` để ghi đè toàn bộ file lớn, tránh lãng phí hàng ngàn tokens, giảm 90% độ trễ và triệt tiêu nguy cơ xóa mất code cũ.
4. **Tận dụng Công cụ Kiểm tra Tự động Siêu tốc (Instant CLI Checks)**:
   - Sử dụng `tools/scripts/medical-linter.mjs`, `tools/scratch/check_tags.js` hoặc `npx astro check` để thẩm định kết quả trong 1-2 giây.

---

## 🎯 2. NGUYÊN TẮC CHÍNH XÁC TUYỆT ĐỐI (PRECISION & ZERO-HALLUCINATION RCA)

1. **Chu trình 4 Bước Phân Tích Nguyên Nhân Gốc Rễ (4-Step RCA Cycle)**:
   - **Bước 1 (Reproduce & Inspect)**: Đối chiếu trạng thái thực tế với Hợp đồng thiết kế (Type Contract, DOM, Schema). Tuyệt đối không "đoán mò" (zero guessing).
   - **Bước 2 (Isolate Root Cause)**: Phân định rõ lỗi do Data Flow, Type Mismatch, Lifecycle hay CSS Stacking. Sửa ở nơi sinh ra lỗi (Source of Truth), không chắp vá ở nơi hiển thị cuối.
   - **Bước 3 (Surgical Root Fix)**: Thay đổi tối thiểu nhưng triệt để nguồn cơn. Bảo toàn tính toàn vẹn của mã nguồn.
   - **Bước 4 (Regression & Downstream Audit)**: Rà soát downstream callers (các component/hàm gọi nó) để đảm bảo không làm gãy tính năng khác.
2. **Ràng buộc Hợp đồng Kiểu Dữ liệu & Schema (Strict Type Contracts)**:
   - Không lạm dụng `any`; định nghĩa rõ interface và kiểu trả về trong TypeScript.
   - Mọi dữ liệu bệnh lý, CDSS và ca bệnh DocSpace bắt buộc phải thỏa mãn schema chuẩn (Pydantic / Zod / JSON Schema).
3. **Vòng lặp Tự Phục Hồi Tức thì (Auto-Healing Loop)**:
   - Sau khi sửa code, nếu xuất hiện lỗi compiler, syntax hoặc style, AI phải chủ động phân tích nguyên nhân gốc và tự sửa chữa ngay lập tức trước khi kết thúc phiên.

---

## 🏛️ 3. TƯ DUY KIẾN TRÚC ĐA TẦNG & CHIỀU SÂU Ý TƯỞNG (DEEP ARCHITECTURE REASONING)

1. **Lăng Kính Kiến Trúc 4 Tầng C4 (C4 Architectural Zoom Lens)**:
   - **Level 1 (System Context)**: Hiểu đối tượng người dùng (bác sĩ cấp cứu, sinh viên Y) và ràng buộc môi trường (offline-first `file:///`, tra cứu $\le$ 5s, Dark Mode chống chói mắt).
   - **Level 2 (Container)**: Nắm rõ luồng dữ liệu giữa Astro Static Pages, Content Collections, Markdown Frontmatter, IndexedDB/localStorage và Client SPAs.
   - **Level 3 (Component)**: Phân định ranh giới trách nhiệm rõ ràng (Separation of Concerns) giữa các Views (Hub, Reader, Disease), Services, và Renderers.
   - **Level 4 (Code & Logic)**: Bảo đảm tính bất biến (Immutability), Pure Functions cho các công thức điểm số lâm sàng (NEWS2, Wells, eGFR).
2. **Giao thức Đề xuất Ý tưởng ADR (Architecture Decision Protocol)**:
   - Khi tham mưu giải pháp, không trả lời hời hợt; luôn phân tích theo cấu trúc ADR:
     - *Bối cảnh & Vấn đề (Context & Drivers)*.
     - *Các phương án khả thi (Options)* kèm phân tích *Đánh đổi (Tradeoffs)* về tốc độ, bộ nhớ và khả năng mở rộng.
     - *Khuyến nghị tối ưu (Recommendation)* và *Lộ trình triển khai phân tầng (Phased Roadmap)*.
3. **Gắn kết Sâu sắc với Domain Y khoa (Clinical Domain Synergy)**:
   - Mọi giải pháp kỹ thuật phải phụng sự trải nghiệm lâm sàng: Tối ưu công thái học (giảm số clicks), minh bạch chứng cứ EBM (Class I-III, trích dẫn rõ ràng), và ưu tiên an toàn người bệnh (Red flags hiển thị nổi bật).
