# Quy tắc Tối ưu Tốc độ & Trí tuệ Nhân tạo (Antigravity Speed & Intelligence Engine)

> Áp dụng trực tiếp từ kiến trúc Google Antigravity SDK & Antigravity CLI cho hệ sinh thái CliniPortal (Apps_ykhoa).

---

## ⚡ 1. NGUYÊN TẮC TỐC ĐỘ (SPEED & THROUGHPUT)

1. **Progressive Disclosure (Không gây tràn ngữ cảnh)**:
   - Chỉ nạp các rules hoặc skills thực sự liên quan đến tác vụ đang xử lý.
   - Không lặp lại các đoạn giải thích dài dòng mang tính lý thuyết; trả lời tập trung, cô đọng, ưu tiên code runnable và kết quả thực thi.
2. **Sử dụng Công cụ CLI Chuyên Biệt**:
   - Sử dụng `python tools/ai_harness/cli_runner.py validate <file>` để kiểm tra JSON trong 50ms thay vì đọc và đối chiếu thủ công.
   - Sử dụng `tools/scripts/medical-linter.mjs` và `tools/scratch/check_tags.js` để tự động hóa khâu QA.
3. **Chỉnh sửa Tối thiểu & Cấp độ Ký hiệu (Symbol-Level & Surgical Edits — Serena Pattern)**:
   - Bắt buộc dùng `replace_file_content` hoặc `multi_replace_file_content` để thay thế đúng khối code/thân hàm cần sửa (`replace_symbol_body`). Tuyệt đối không ghi đè toàn bộ file lớn gây lãng phí tokens, tăng độ trễ và làm mất các logic phụ trợ.
4. **Định hướng Đồ thị Tri thức Trước khi Sửa (Graph-First Dependency Trace — Codebase-Memory Pattern)**:
   - Trước khi sửa hoặc đổi tên một export/interface/component, bắt buộc khảo sát nhanh chuỗi gọi hàm và downstream references (`find_referencing_symbols`) qua ripgrep có định hướng, đảm bảo không làm gãy các module phụ thuộc.
   - Khi tiếp cận file lớn (>300 dòng), trích xuất danh sách signatures/types trước (`get_symbols_overview`) thay vì đọc toàn bộ nội dung file.

---

## 🧠 2. NGUYÊN TẮC TRÍ TUỆ (INTELLIGENCE & EBM ACCURACY)

1. **Ràng buộc Hợp đồng Dữ liệu (Schema Contracts via Pydantic)**:
   - Mọi dữ liệu bệnh lý sinh ra cho DocSpace bắt buộc phải thỏa mãn các tiêu chuẩn trong `tools/ai_harness/schemas.py`:
     - **Prompt 05**: `icdCode`, `diseaseName`, `goldStandard` (không placeholder), `severityGrading`, `timelinePhases` (Bảng 4 Cột: D1-D3, D4-D5...), `protocol` (đủ 6-9 đầu mục), `warnings`.
     - **Prompt 06**: `weight_matrix` (`dt`, `gy`, `ht`, `loaitru`), zero-orphan symptoms.
     - **Prompt 07**: `subjective`, `objective`, `assessment`, `plan`, `clinical_pearls`.
2. **Quy trình Lập luận Y khoa 4 Tầng (4-Tier Clinical Reasoning)**:
   - **Tầng 1 (Evidence Survey)**: Rà soát cấp độ chứng cứ từ Hướng dẫn Bộ Y tế / AHA / ESC / NICE gốc.
   - **Tầng 2 (Pathophysiology)**: Biện luận cơ chế sinh lý bệnh (ví dụ: thoát huyết tương, bão cytokine, kháng kháng sinh).
   - **Tầng 3 (Differential & Grading)**: Phân tầng nguy cơ và tiêu chuẩn vàng loại trừ.
   - **Tầng 4 (Code/Data Synthesis)**: Tiến hành sinh code/markup không lỗi.
3. **Vòng lặp Tự Phục Hồi (Auto-Healing Loop)**:
   - Sau khi ghi hoặc sửa file, nếu hook hoặc compiler trả về lỗi (JSX syntax, tag unclosed, schema mismatch), AI phải chủ động phân tích nguyên nhân gốc và tự sửa chữa ngay lập tức trước khi thông báo hoàn tất.
