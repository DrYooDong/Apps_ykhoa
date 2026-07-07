---
title: Việc con theo dự án
type: dashboard
llm_managed: true
tags:
  - dashboard
  - project
---
> [!info] Tổng hợp tự động (Pie Tasks × Dataview)
> Mọi **task con** gắn field **Dự án** trong Pie Tasks được gom theo từng dự án ở đây — tick được trực tiếp, cập nhật live. Xem **tiến độ tổng** (số việc / %) theo dự án ở bảng `Dashboard Projects.base`. Đổi phạm vi ở Settings → Pie Tasks.

<!-- pie:dashboard:start · vùng tự sinh theo Setting "Phạm vi bảng việc con" — đừng sửa trong vùng này -->
## Tất cả việc con theo dự án
```dataview
TASK
WHERE project
GROUP BY project AS "Dự án"
```

## Chỉ việc chưa xong
```dataview
TASK
WHERE project AND !completed
GROUP BY project AS "Dự án"
```
<!-- pie:dashboard:end -->
