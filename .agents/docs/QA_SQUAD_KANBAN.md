# 📌 QA Squad Kanban Board

> Bảng theo dõi tiến độ công việc, trạng thái phân công và kiểm soát Merge Gate của **CliniPortal QA Agent Squad**.

---

## 🚦 Luồng Trạng Thái (Status Workflow)

```
[Backlog] ──> [Ready] ──> [Running] ──> [Review / Audit] ──> [Merged]
                                ▲                │
                                └──── (Fix) ─────┘
```

---

## 📋 Thẻ Công Việc & Ma Trận Trách Nhiệm (Active Work Items)

### 📌 Mẫu Thẻ Công Việc QA (Card Template)

```json
{
  "id": "QA-CARD-001",
  "title": "Tên nhiệm vụ kiểm định / khắc phục sự cố chất lượng",
  "owner": "AGENT-01 (SVG/KaTeX) | AGENT-02 (CSS) | AGENT-03 (Dark) | AGENT-04 (SPA) | AGENT-05 (JSON)",
  "state": "ready | running | review | merged | blocked",
  "scope": [
    "src/content/basic-medical/path/to/article.mdx",
    "src/styles/components/target.css"
  ],
  "qa_contract": {
    "target_error_class": "SVG_GARBAGE | CSS_STACKING | DARKMODE_TOKEN | SPA_INJECTION | JSON_SCHEMA",
    "detection_tool": "tools/qa/agentXX-script.mjs",
    "acceptance_criteria": [
      "0 ký tự box-drawing rác",
      "Quy tắc flex-direction: column không bị ghi đè",
      "100% tương thích dark mode không chìm màu",
      "JSON không chứa escaped characters"
    ]
  },
  "merge_gate_status": {
    "agent01_svg": "PASS",
    "agent02_css": "PASS",
    "agent03_dark": "PASS",
    "agent04_spa": "PASS",
    "agent05_json": "PASS"
  }
}
```

---

## 🗂️ Bảng Quản Lý Tác Vụ (Board Columns)

### 📥 Backlog (Nhu Cầu Kiểm Định & Mở Rộng)
| ID | Tác vụ | Phân vai đề xuất | Ngày tạo | Độ ưu tiên |
| :--- | :--- | :--- | :--- | :--- |
| *QA-B01* | *Tích hợp QA Runner vào Git Pre-commit Hook bằng Husky / lint-staged* | Squad Lead | 2026-09-17 | 🟡 P2 |
| *QA-B02* | *Tự động quét tỷ lệ tương phản màu WCAG AAA cho toàn bộ 6 theme alerts* | AGENT-03 | 2026-09-17 | 🟢 P3 |

---

### 📝 Ready (Đã Lên Kế Hoạch & Sẵn Sàng Chạy)
| ID | Tác vụ | Phụ trách chính | Tiêu chí nghiệm thu |
| :--- | :--- | :--- | :--- |
| *QA-R01* | *Rà soát định kỳ 150 file MDX sau mỗi đợt nạp bài mới* | AGENT-01 & AGENT-02 | 0 Errors trên `run-qa-squad.mjs` |

---

### ⚙️ Running (Đang Tiến Hành Rà Soát / Tự Động Sửa)
| ID | Tác vụ | Phụ trách | Tệp tin tác động |
| :--- | :--- | :--- | :--- |
| *(Trống - Hệ thống đang ở trạng thái ổn định)* | | | |

---

### 🔍 Review & Quality Gate (Đang Audit Trước Khi Merge)
| ID | Tác vụ | Kiểm định viên | Kết quả Merge Gate |
| :--- | :--- | :--- | :--- |
| *(Trống)* | | | |

---

### 🏁 Merged & Closed (Đã Hoàn Tất & Nghiệm Thu 100%)
| ID | Tác vụ hoàn thành | Tác tử chủ trì | Thời gian merge | Bằng chứng kiểm định |
| :--- | :--- | :--- | :--- | :--- |
| **QA-001** | Chuẩn hóa KaTeX & xóa 1900 ký tự box-drawing rác trên 150 tệp MDX | AGENT-01 | 2026-09-17 | `agent01-svg-katex-audit.mjs` (PASS) |
| **QA-002** | Bảo vệ xếp chồng dọc `.infobox` trên 3 stylesheet & 64 file MDX | AGENT-02 | 2026-09-17 | `agent02-css-layout-audit.mjs` (PASS) |
| **QA-003** | Audit Dark Mode & thống kê hardcoded hex colors | AGENT-03 | 2026-09-17 | `agent03-darkmode-token-audit.mjs` (PASS) |
| **QA-004** | Kiểm định nạp dynamic stylesheet & container override trong SPA Reader | AGENT-04 | 2026-09-17 | `agent04-spa-reader-audit.mjs` (PASS) |
| **QA-005** | Chuẩn hóa schema bệnh học & xóa ký tự escape `\_` trong JSON | AGENT-05 | 2026-09-17 | `agent05-json-schema-validator.mjs` (PASS) |
| **QA-006** | Nâng cấp toàn diện 12 tệp MDX Dịch tễ học, chuẩn hóa 7 Pillars bệnh mạn tính & nhúng Orthogonal SVG | QA + Flowchart Squad | 2026-09-17 | `audit_epi.js`, `run-qa-squad.mjs`, `tsc` (PASS) |
| **QA-MST** | Xây dựng Master Runner điều phối đồng bộ 5 Agent trong 0.51s | QA Conductor | 2026-09-17 | `run-qa-squad.mjs` (APPROVED) |

---

## 🚦 Nguyên Tắc Merge Gate Vận Hành
1. **Zero-Error Enforcement**: Tuyệt đối không hợp nhất (merge) bất kỳ thay đổi nào khi `run-qa-squad.mjs` trả về Exit Code khác `0`.
2. **Dual-Layer Verification**: Mọi thay đổi CSS Card bắt buộc phải được xác nhận ở cả tầng Stylesheet tĩnh và tầng SPA Reader dynamic injection.
3. **Continuous Memory Recording**: Mọi dạng lỗi mới phát sinh phải lập tức được chuyển hóa thành quy tắc kiểm định trong script tương ứng và ghi nhận vào `.agents/learnings/`.
