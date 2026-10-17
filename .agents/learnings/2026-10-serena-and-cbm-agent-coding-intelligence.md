# 🧠 Bài Học Kinh Nghiệm: Tiếp Thu Tinh Hoa từ Serena & Codebase-Memory MCP

> **Ngày ghi nhận**: 17/10/2026  
> **Nguồn tham chiếu**:
> - [oraios/serena](https://github.com/oraios/serena) — The IDE for your AI Agent (Symbol-level Semantic Retrieval & Editing via LSP).
> - [DeusData/codebase-memory-mcp](https://github.com/DeusData/codebase-memory-mcp) — High-Performance Code Intelligence Knowledge Graph (Pure C, 162 languages, sub-ms Cypher queries, 99% fewer tokens).
> **Phạm vi tác động**: Toàn bộ quy trình đọc, phân tích, định hướng và soạn thảo mã nguồn trong hệ sinh thái **CliniPortal (Apps_ykhoa)**.

---

## ⚡ 1. Bản chất Vấn đề & Bước Nhảy Vọt Tư Duy (Paradigm Shift)

Trước đây, phần lớn AI coding agents (kể cả trong các tác vụ phức tạp với TypeScript/React/Tailwind) thường mắc phải 2 hội chứng:
1. **Hội chứng "Text Phẳng & Grep Rải Thảm" (Flat-Text & Grep Flooding)**:
   - Dò tìm text bằng regex/grep thô sơ, sau đó mở và đọc toàn bộ file dài 1.000 – 2.000 dòng chỉ để tra cứu một hàm nhỏ.
   - Hậu quả: Tiêu tốn hàng trăm ngàn tokens vô ích, context window bị loãng, dễ sinh ảo giác (hallucination) và giảm mạnh tốc độ phản hồi.
2. **Hội chứng "Phẫu Thuật Chuỗi Mỏng Manh" (Fragile String Surgery)**:
   - Chỉnh sửa code dựa trên số dòng hoặc replace một chuỗi text dài.
   - Hậu quả: Dễ làm lệch indentation, mất thẻ đóng JSX `</div>`, phá vỡ type definition và làm gãy các component liên quan mà không hề hay biết.

---

## 🏛️ 2. Hai Trụ Cột Tri Thức Tiếp Thu

```
                  ┌────────────────────────────────────────────────────────┐
                  │          HAI TRỤ CỘT NÂNG CẤP CODING AGENT             │
                  └────────────────────────────────────────────────────────┘
                                      │
            ┌─────────────────────────┴─────────────────────────┐
            ▼                                                   ▼
┌───────────────────────────────────────┐   ┌───────────────────────────────────────┐
│     DEUSDATA / CODEBASE-MEMORY        │   │            ORAIOS / SERENA            │
│  (Tầng Vĩ Mô - Đồ Thị Tri Thức CBM)   │   │     (Tầng Vi Mô - IDE Phẫu Thuật)     │
├───────────────────────────────────────┤   ├───────────────────────────────────────┤
│ • Index Tree-sitter 162 ngôn ngữ.     │   │ • Dựa trên Language Server Protocol   │
│ • Quan hệ: CALLS, IMPORTS, DATA_FLOWS │   │ • find_symbol & get_symbols_overview  │
│ • Giảm tới 120x tokens (99% tiết kiệm)│   │ • replace_symbol_body (Chuẩn AST)     │
│ • Truy vấn Cypher sub-ms.             │   │ • rename_symbol nguyên tử toàn dự án  │
│ • CBM Lens: Galaxy Map & Hotspots.    │   │ • get_diagnostics kiểm tra lỗi linter │
└───────────────────────────────────────┘   └───────────────────────────────────────┘
            │                                                   │
            └─────────────────────────┬─────────────────────────┘
                                      ▼
                  ┌────────────────────────────────────────┐
                  │    ÁP DỤNG TRỰC TIẾP CHO CLINIPORTAL   │
                  │   (TypeScript, React 19, MDX, Vanilla) │
                  └────────────────────────────────────────┘
```

### Trụ cột 1: Điều hướng Đồ thị Tri thức (Codebase Knowledge Graph)
* **Tư duy**: Codebase là một mạng lưới thực thể có quan hệ ràng buộc (Entity Graph: File → Module → Component → Function → Types/Props).
* **Nguyên tắc**: Trước khi sửa một module (ví dụ `Step4Protocol.tsx`), phải xác định chuỗi phụ thuộc (dependency chain):
  - Ai import component này? (`App.tsx`, `Step3Protocol.tsx`...)
  - Component này gọi những hàm/hooks/types nào từ bên ngoài?
  - Props truyền vào có bị thay đổi kiểu dữ liệu hay không?

### Trụ cột 2: Phẫu thuật Ký hiệu (Symbol-Level Precision)
* **Tư duy**: Không sửa code như sửa văn bản Word; sửa code là biến đổi Cây Cú Pháp Trừu Tượng (AST Transformation).
* **Nguyên tắc**:
  - Khi cần sửa một hàm: Chỉ khoanh vùng và thay thế đúng block thân hàm (`replace_symbol_body`). Tuyệt đối không viết lại toàn bộ file.
  - Khi cần đổi tên: Rà soát toàn bộ vị trí tham chiếu (`find_referencing_symbols`) để cập nhật đồng bộ, tránh sót file.
  - Khi kiểm tra: Chạy ngay Typecheck hoặc Medical Linter (`get_diagnostics`) sau khi sửa.

---

## 🎯 3. Bộ Quy Tắc Thực Hành Áp Dụng Ngay Cho CliniPortal

Mọi AI Agent khi làm việc trong workspace `Apps_ykhoa` phải tuân thủ nghiêm ngặt 4 quy tắc hành động sau:

1. **Quy tắc "Outline First, Code Later" (Mô phỏng `get_symbols_overview`)**:
   - Khi tiếp cận một file lớn (> 300 dòng), dùng `grep_search` để lấy danh sách interface, types, và function signatures trước.
   - Chỉ đọc chi tiết những dòng thực sự chứa logic cần chỉnh sửa.
2. **Quy tắc "Impact Verification" (Mô phỏng `find_referencing_symbols`)**:
   - Khi chỉnh sửa signature của một hàm/hook/component, bắt buộc phải grep xem có bao nhiêu file khác đang sử dụng hàm đó.
   - Đảm bảo tính tương thích ngược (backward compatibility) hoặc cập nhật toàn bộ các điểm gọi.
3. **Quy tắc "Zero-Collateral Damage" (Mô phỏng `replace_symbol_body`)**:
   - Chỉ dùng `replace_file_content` với phạm vi hẹp nhất có thể (chỉ chứa symbol cần can thiệp).
   - Bảo toàn 100% các comments, JSDoc, và logic xung quanh không liên quan.
4. **Quy tắc "Immediate Diagnostics Loop" (Mô phỏng `get_diagnostics`)**:
   - Sau mỗi lần chỉnh sửa mã nguồn phức tạp, kích hoạt ngay công cụ kiểm tra tự động (`npm run validate:all` hoặc `check_tags.js` hoặc runner chuyên biệt) để bắt lỗi cú pháp tại chỗ trước khi trả lời người dùng.
