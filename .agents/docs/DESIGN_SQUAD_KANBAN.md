# 📌 Design Squad Kanban Board

> Bảng theo dõi tiến độ công việc, trạng thái phân công và kiểm soát Merge Gate của **Design Agent Squad**.

---

## 🚦 Luồng Trạng Thái (Status Workflow)

```
[Backlog] ──> [Ready] ──> [Running] ──> [Review / Audit] ──> [Merged]
                               ▲                │
                               └──── (Fix) ─────┘
```

---

## 📋 Thẻ Công Việc Hiện Tại (Active Work Items)

### 📌 Mẫu Thẻ Công Việc (Card Template)

```json
{
  "id": "DS-CARD-001",
  "title": "Tên nhiệm vụ thiết kế / nâng cấp giao diện",
  "owner": "Agent-02 (Implementation) / Agent-01 (Strategist)",
  "state": "ready | running | review | merged | blocked",
  "scope": [
    "pages/Module/path/to/page.html",
    "src/styles/components/target.css"
  ],
  "design_contract": {
    "job_to_be_done": "Mục tiêu cụ thể của màn hình",
    "hierarchy": "Header > Hero KPI > Bento Section > Detail Table",
    "components": ["BentoCard", "ClinicalAlert", "Badge"]
  },
  "acceptance_criteria": [
    "Không hardcode màu hex, dùng 100% token CSS",
    "Hỗ trợ Dark mode không chìm màu",
    "Responsive trơn tru trên màn hình 375px",
    "Animation dưới 250ms với ease-out"
  ],
  "merge_gate_status": {
    "wcag_contrast": "PENDING",
    "dark_mode_test": "PENDING",
    "mobile_375px": "PENDING",
    "html_integrity": "PENDING"
  }
}
```

---

## 🗂️ Bảng Quản Lý Tác Vụ (Board Columns)

### 📥 Backlog (Ý tưởng & Yêu cầu mới)
| ID | Tác vụ | Người đề xuất | Ngày tạo |
| :--- | :--- | :--- | :--- |
| *DS-000* | *Chuẩn hóa hệ thống Bento Grid cho các trang Kho Dược lý* | Squad Lead | 2026-08-26 |

---

### 📝 Ready (Đã có Design Contract & Sẵn sàng code)
| ID | Tác vụ | Phụ trách chính | Design Contract |
| :--- | :--- | :--- | :--- |
| *(Trống)* | | | |

---

### ⚙️ Running (Đang tiến hành code & dựng motion)
| ID | Tác vụ | Phụ trách | Tệp tin tác động |
| :--- | :--- | :--- | :--- |
| *(Trống)* | | | |

---

### 🔍 Review & Quality Gate (Đang audit WCAG / Tokens / Mobile)
| ID | Tác vụ | Kiểm định viên | Kết quả Merge Gate |
| :--- | :--- | :--- | :--- |
| *(Trống)* | | | |

---

### ✅ Merged (Đã hoàn thành & Tích hợp vào codebase)
| ID | Tác vụ | Hoàn thành bởi | Ngày merge |
| :--- | :--- | :--- | :--- |
| **DS-INIT** | Thành lập Design Agent Squad & Ban hành Design Squad Rules | Antigravity | 2026-08-26 |
