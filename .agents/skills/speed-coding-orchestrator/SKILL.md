---
name: speed-coding-orchestrator
description: "Vận hành quy trình AI Coding siêu tốc (5x-10x) cho dự án CliniPortal: triệt tiêu lãng phí context, lập Micro-Spec 3 nhịp, sửa đổi vi phẫu chính xác (Surgical Micro-Edits) và chạy kiểm thử tự động tức thì. Kích hoạt khi cần tăng tốc phát triển tính năng, sửa đổi code nhanh gọn và tối ưu hóa thời gian phản hồi."
metadata:
  model: inherit
---

# Speed Coding Orchestrator (Tăng tốc AI Coding 5x - 10x)

Hấp thu và tối ưu hóa từ triết lý **Conductor**, **Context-Driven Development** và **Antigravity Speed Engine**:
Tăng tốc độ coding bằng cách loại bỏ 90% các thao tác thừa (đọc tràn lan, ghi đè toàn file, mò mẫm thử-sai và lệch hướng ngữ cảnh).

## Use this skill when

- Cần thực hiện code tính năng mới hoặc chỉnh sửa mã nguồn với tốc độ nhanh nhất.
- Cần giải quyết công việc trong 1-2 turn đối thoại thay vì lặp đi lặp lại nhiều vòng.
- Cần tối ưu hóa dung lượng token và độ trễ phản hồi của AI.
- Đang xử lý các tệp TypeScript, Astro, CSS hoặc JavaScript trong dự án.

## Do not use this skill when

- Chưa rõ yêu cầu cốt lõi và cần phỏng vấn người dùng trước (dùng `brainstorming-communication-protocol`).
- Cần nghiên cứu y văn lâm sàng thuần túy không liên quan đến lập trình (dùng `research-synthesizer`).

## Instructions

Tuân thủ nghiêm ngặt **Quy trình 3 Nhịp Siêu Tốc (3-Beat Cadence)**:

### Nhịp 1: Khoanh vùng Ngữ cảnh Tối thiểu (Targeted Micro-Scoping)
1. **Zero Context Thrashing**: Tuyệt đối không đọc toàn bộ các file lớn (>300 dòng) khi chỉ cần sửa một vài hàm hoặc linh kiện.
2. **Kỹ thuật Thăm dò Cấp độ Ký hiệu (Symbol-Level Reconnaissance)**:
   - Dùng `run_command` với ripgrep/node hoặc `read_file` có `StartLine`/`EndLine` cụ thể.
   - Đọc interface, type definition hoặc hàm signature trước khi đọc implementation chi tiết.
   - Chỉ nạp vào context những đoạn mã chịu trách nhiệm trực tiếp cho tác vụ.

### Nhịp 2: Thiết lập Bản thiết kế Tinh gọn (Micro-Spec & Intent)
Trước khi chạm vào code, định hình rõ trong suy nghĩ (hoặc 3 gạch đầu dòng ngắn):
- **Input / State**: Dữ liệu đầu vào và trạng thái hiện tại là gì?
- **Exact Surgical Mutation**: Chính xác hàm/dòng nào sẽ thay đổi? Logic mới là gì?
- **Acceptance Criteria**: Kết quả đầu ra đo lường được là gì (giao diện hiển thị gì, type check pass, không lỗi console)?

### Nhịp 3: Chỉnh sửa Vi phẫu & Xác minh Tức thì (Surgical Edit & Instant Verification)
1. **Surgical Micro-Edits (Tuyệt đối không Overwrite File)**:
   - Sử dụng `edit_file` để thay thế đúng đoạn target cần sửa.
   - Giữ nguyên toàn bộ cấu trúc, imports, comments và các hàm phụ trợ xung quanh.
   - Giảm độ trễ sinh token từ hàng ngàn tokens xuống vài chục tokens (tốc độ nhanh gấp 10 lần).
2. **Auto-Healing & Instant Verification**:
   - Chạy lệnh kiểm tra cú pháp / typecheck ngay lập tức (ví dụ: `npx astro check`, `node tools/scratch/check_tags.js` hoặc linting).
   - Nếu có lỗi phát sinh: Khắc phục ngay tại chỗ (Auto-Healing) trước khi bàn giao cho người dùng.

## Bảng Đối Sánh: AI Chậm vs AI Siêu Tốc (5x-10x)

| Tiêu chí | Cách làm Chậm chạp (1x) | Chuẩn Speed Coding Orchestrator (10x) |
|---|---|---|
| **Đọc code** | Đọc cả file 1,500 dòng làm tràn context window | Đọc đúng signature hoặc range dòng cần sửa qua `read_file` |
| **Sửa code** | `write_file` ghi đè 1,000 dòng, dễ mất code cũ | `edit_file` vi phẫu chính xác đúng khối logic (10-30 dòng) |
| **Quy trình** | Code mò mẫm, chạy thử thấy sai rồi sửa đi sửa lại | Micro-Spec rõ ràng -> Sửa trúng đích -> Verify tự động 1 chạm |
| **Xử lý lỗi** | Chờ người dùng báo lỗi giao diện rồi mới đi tìm | Tự kiểm tra cú pháp và build trước khi kết thúc turn |

