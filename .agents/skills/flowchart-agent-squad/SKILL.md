---
name: flowchart-agent-squad
description: Đội ngũ AI chuyên trách tư duy logic lâm sàng, quy hoạch bố cục trực giao (Orthogonal Routing) và vẽ lưu đồ y khoa đồ họa xuất bản (Pure Editorial SVG) cho CliniPortal.
---

# 📐 Medical Flowchart Agent Squad — CliniPortal

> Hệ thống điều phối đội ngũ thiết kế & vẽ lưu đồ y khoa đa tác tử (Multi-Agent Medical Flowchart Squad) chuyên biệt hóa từ ý tưởng logic lâm sàng đến đồ họa SVG xuất bản trực giao 100%.

---

## 🏛️ Cơ Cấu Đội Ngũ (Squad Architecture)

Medical Flowchart Agent Squad hoạt động theo mô hình 5 phân vai dưới sự điều phối của **Flowchart Squad Lead**:

```
                       ┌─────────────────────────┐
                       │ 🎯 FLOWCHART SQUAD LEAD │
                       │ (Architect & Dispatcher)│
                       └────────────┬────────────┘
                                    │
    ┌──────────────┬────────────────┼────────────────┬──────────────┐
    ▼              ▼                ▼                ▼              ▼
┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐
│ AGENT-FC01 │ │ AGENT-FC02 │ │ AGENT-FC03 │ │ AGENT-FC04 │ │ AGENT-FC05 │
│  Clinical  │ │  Topology  │ │ Editorial  │ │  Quality   │ │ Complex &  │
│   Logic    │ │ & Routing  │ │ SVG Stylist│ │    Gate    │ │ Interactive│
└────────────┘ └────────────┘ └────────────┘ └────────────┘ └────────────┘
```

---

## 📋 Chi Tiết 5 Phân Vai Chuyên Biệt

### 1. 🔵 AGENT-FC01: Clinical Logic Strategist (Chiến Lược Gia Logic Lâm Sàng)
* **Kích hoạt khi**: Tiếp nhận hướng dẫn điều trị, phác đồ dạng văn bản, ca bệnh lâm sàng hoặc sơ đồ ASCII phác thảo.
* **Nhiệm vụ cốt lõi**:
  - Trích xuất luồng quyết định: Điểm khởi đầu (Start), Câu hỏi rẽ nhánh (Decision), Hành động can thiệp (Action), Cảnh báo khẩn cấp (Red Flag / Cờ đỏ), Điểm kết thúc / Tiên lượng (Outcome).
  - Áp dụng nguyên tắc **Editorial 4/10 Density**: Giới hạn 7–9 node trên một màn hình; nếu phác đồ dài thì chia thành 2 cấp (Tổng quan & Chi tiết).
  - Xuất ra tệp cấu trúc chuẩn JSON/DSL cho Agent-FC02.

---

### 2. 🟢 AGENT-FC02: Topology & Routing Engineer (Kỹ Sư Định Tuyến Trực Giao)
* **Kích hoạt khi**: Đã có cây quyết định logic từ AGENT-FC01.
* **Nhiệm vụ cốt lõi**:
  - Tính toán tọa độ lưới ($X, Y$), phân bổ cột và hàng đối xứng, cân bằng thị giác.
  - Vẽ đường nối trực giao 100% (Orthogonal Edge Routing): Bẻ góc 90° bo tròn góc mượt mà ($r = 6\text{px}$). Cấm tuyệt đối vẽ đường xiên chéo.
  - Tách điểm neo fanning $\ge 12\text{px}$ khi nhiều đường cùng xuất phát từ một cạnh.
  - Tạo mặt nạ nhãn chữ (`<rect>` masking) để đường kẻ không cắt xuyên qua chữ "CÓ / KHÔNG", "DƯƠNG TÍNH / ÂM TÍNH".

---

### 3. 🟡 AGENT-FC03: Editorial SVG Stylist (Nghệ Nhân Đồ Họa Xuất Bản)
* **Kích hoạt khi**: Bản vẽ đã có cấu trúc hình học hoàn chỉnh từ AGENT-FC02.
* **Nhiệm vụ cốt lõi**:
  - Áp dụng 100% Design Tokens CliniPortal: `var(--color-primary)`, `var(--color-danger)`, `var(--color-warning)`, v.v.
  - **Quy tắc Bất di Bất dịch**: TUYỆT ĐỐI KHÔNG DÙNG THẺ HTML (`<strong>`, `<span>`, `<br>`) BÊN TRONG `<text>` HOẶC `<svg>`. Phải dùng `<tspan font-weight="700">` hoặc các thẻ `<text>` phân tầng.
  - Đảm bảo 100% tương thích Dark Mode (`[data-theme="dark"]`).
  - Sử dụng Responsive Viewport (`viewBox="0 0 960 600"`, `width="100%"`).

---

### 4. 🔴 AGENT-FC04: Flowchart Quality Gate Auditor (Kiểm Định Viên Chất Lượng)
* **Kích hoạt khi**: SVG hoàn thiện, chuẩn bị nhúng vào bài viết hoặc giao diện.
* **Nhiệm vụ cốt lõi**:
  - Quét kiểm tra cú pháp XML/SVG, bảo đảm không có thẻ rác, không bị lỗi font hay co kéo méo hình.
  - Kiểm tra độ tương phản WCAG AA/AAA (màu chữ trên nền node $\ge 4.5:1$).
  - Kiểm tra tính hiển thị sắc nét trên thiết bị di động (màn hình hẹp $\le 375\text{px}$).

---

### 5. 🟣 AGENT-FC05: Complex Schematics Specialist (Chuyên Gia Sơ Đồ Phức Tạp)
* **Kích hoạt khi**: Cần vẽ các dạng sơ đồ y khoa chuyên sâu:
  - **Swimlane cấp cứu đa tầng**: Phân tách trách nhiệm giữa Điều dưỡng - Bác sĩ cấp cứu - Bác sĩ can thiệp.
  - **Vòng lặp hồi sức cấp cứu (Clinical CPR Loops)**: Chu kỳ ép tim 2 phút, đánh giá nhịp shockable/non-shockable.
  - **Ma trận 2x2 & Quadrant**: Phân tầng nguy cơ TIMI, GRACE, Wells score.

---

## 🎨 Bảng Màu Editorial Node Y Khoa Chuẩn (7 Trạng Thái)

| Loại Node | Fill Token | Stroke Token | Mục đích lâm sàng |
|---|---|---|---|
| **Focal / Red Flag** | `var(--color-danger-hl)` | `var(--color-danger)` (2px) | Dấu hiệu đe dọa tính mạng, cấp cứu khẩn cấp |
| **Start / Tiếp nhận** | `var(--color-primary-hl)` | `var(--color-primary)` (1.5px) | Lý do vào viện, hội chứng khởi phát |
| **Decision / Phân nhánh** | `var(--color-warning-hl)` | `var(--color-warning)` (1.5px) | Đánh giá lâm sàng, tiêu chuẩn phân tầng |
| **Action / Can thiệp** | `var(--color-teal-hl)` | `var(--color-teal)` (1.5px) | Y lệnh điều trị, chỉ định thủ thuật/xét nghiệm |
| **Dose / Cảnh báo thuốc** | `var(--color-purple-hl)` | `var(--color-purple)` (1.5px) | Liều lượng Adrenalin, chống chỉ định |
| **Stable / Tiên lượng tốt** | `var(--color-success-hl)` | `var(--color-success)` (1.5px) | Bệnh nhân ổn định, đáp ứng điều trị |
| **Standard / Thường quy** | `var(--color-surface-2)` | `var(--color-border)` (1px) | Các bước theo dõi định kỳ |

---

## 🛠️ Công Cụ Vận Hành Cốt Lõi

```bash
# Sinh lưu đồ từ cấu trúc JSON:
node tools/flowcharts/generate-flowchart.mjs --input <path_to_json> --output <path_to_svg>

# Kiểm định chất lượng lưu đồ SVG:
node tools/flowcharts/audit-flowchart.mjs <path_to_svg>
```
