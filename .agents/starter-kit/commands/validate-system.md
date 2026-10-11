---
description: Kiểm tra toàn diện sức khỏe hệ thống CliniPortal (Typecheck, Linter nội dung y khoa, Dead assets)
---

# Lệnh Kiểm Tra Hệ Thống CliniPortal: /validate-system

Chạy chuỗi 3 cổng kiểm định tự động (Quality Gates):

1. **TypeScript Typecheck**:
   `npm run typecheck`
   Kiểm tra tính tương thích của toàn bộ interface và data models trong các module CDSS và DocSpace.

2. **Medical Content Linter**:
   `npm run lint:content`
   Quét 300+ tài liệu y khoa MDX đảm bảo tuân thủ cấu trúc EBM, Design Tokens và không có lỗi định dạng.

3. **Tree-shake Asset Auditor**:
   `npm run audit:deadcode`
   Phát hiện các asset hình ảnh mồ côi hoặc không còn được tham chiếu trong mã nguồn.

*Hoặc chạy nhanh toàn bộ trong 1 câu lệnh:*
`npm run validate:all`
