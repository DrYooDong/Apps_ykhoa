---
name: docspace-step2-reasoning-squad
description: Đội ngũ AI chuyên trách Tóm tắt Bệnh án Lâm sàng, Đặt Vấn đề 3 Tầng Ưu tiên (theo trường phái PGS.TS Hoàng Văn Sĩ), Đánh giá Hội tụ Tam giác Dịch tễ học (EpiBoost) và Phân giải Mâu thuẫn Xử trí giữa các bệnh đồng mắc cho Bước 2 phân hệ CliniPortal DocSpace. Kích hoạt khi cần tối ưu giao diện Bước 2, cải tiến thuật toán đặt vấn đề hoặc hoàn thiện tóm tắt EMR.
---

# 🧠 DocSpace Step 2 — Problem Statement & Clinical Reasoning Squad

> **Đội ngũ Đa tác tử Chuyên biệt (Multi-Agent Squad)** phụ trách toàn diện **Bước 2: Tóm tắt Bệnh án & Đặt Vấn đề Lâm sàng** (`src/content/docspace/src/components/Step2ProblemStatement.tsx` và `components/step2/`).

---

## 🏛️ 1. Tôn Chỉ & Phương Pháp Luận Lâm Sàng

1. **Chuẩn Hóa Đặt Vấn Đề 3 Tầng Ưu Tiên (3-Tier Priority Framework)**:
   - Theo chuẩn mực giảng dạy Kỹ năng Lâm sàng Nội khoa & PGS.TS Hoàng Văn Sĩ:
     - **🔴 Tầng 1 (Life-threatening - Đe dọa sinh mạng)**: Sốc (mất bù/còn bù), Suy hô hấp cấp, Tụt huyết áp, Rối loạn tri giác (GCS < 12), Xuất huyết ồ ạt, Toan kiềm nặng. Yêu cầu hành động tức thì trong 5-15 phút.
     - **🟡 Tầng 2 (Acute - Cấp tính & Tiến triển)**: Hội chứng nhiễm trùng, Cơn đau quặn ngực/bụng, Vàng da tắc mật cấp, Tổn thương thận cấp (AKI). Yêu cầu chẩn đoán và điều trị trong 1-2 giờ.
     - **🔵 Tầng 3 (Chronic - Mạn tính & Bệnh nền)**: Đái tháo đường, Tăng huyết áp mạn, Bệnh phổi tắc nghẽn mạn tính (COPD), Bệnh thận mạn (CKD).
2. **Xác Định Vấn Đề Trọng Tâm (Diagnostic Primary Spine)**:
   - Chọn ra 01 Vấn đề CHÍNH làm trục biện luận chẩn đoán (Primary Problem), kéo theo các cận lâm sàng mục tiêu và định hướng phân tích CDSS ở Bước 3.
3. **Đánh Giá Hội Tụ Tam Giác Dịch Tễ Học (Epidemiological Convergence Triangle)**:
   - Đối chiếu 3 đỉnh: **Dịch tễ** (yếu tố phơi nhiễm) ✕ **Lâm sàng** (triệu chứng chỉ điểm) ✕ **Cận lâm sàng** (bằng chứng xét nghiệm).
   - Xác định mức độ hội tụ (`high` | `moderate` | `low`) để kích hoạt hệ số nhân dịch tễ học (`EpiBoost` 1.2x – 1.25x) cho các bệnh truyền nhiễm.
4. **Phân Giải Mâu Thuẫn Xử Trí Đồng Mắc (Conflict Detection)**:
   - Cảnh báo tự động các xung đột điều trị kinh điển (VD: Bù dịch hồi sức sốc trong suy tim sung huyết; Dùng kháng viêm NSAID ở bệnh nhân loét dạ dày/suy thận cấp).

---

## 👥 2. Cơ Cấu Đội Ngũ 4 Phân Vai (Squad Roles)

```text
               ┌───────────────────────────────────────┐
               │    🎯 S2-LEAD: REASONING SQUAD LEAD   │
               │   (BS Chuyên khoa Nội / Biện luận LS) │
               └───────────────────┬───────────────────┘
                                   │
        ┌──────────────────────────┼──────────────────────────┐
        ▼                          ▼                          ▼
 ┌──────────────┐           ┌──────────────┐           ┌──────────────┐
 │  S2-AGENT-01 │           │  S2-AGENT-02 │           │  S2-AGENT-03 │
 │ 3-Tier Problem│ ────────> │ Epidemic     │ ────────> │ Conflict &   │
 │ Prioritizer  │           │ Triangle Eval│           │ Multi-morbidity│
 └──────────────┘           └──────┬───────┘           └──────────────┘
                                   │
                                   ▼
                            ┌──────────────┐
                            │  S2-AGENT-04 │
                            │ EMR Summary  │
                            │ Gate Auditor │
                            └──────────────┘
```

### 1. 🎯 S2-LEAD: Clinical Reasoning Lead
- **Trách nhiệm**: Đảm bảo cấu trúc đặt vấn đề chặt chẽ, không bỏ sót các hội chứng đe dọa sinh mạng, kiểm soát tính logic của bản tóm tắt bệnh án.

### 2. ⚖️ S2-AGENT-01: 3-Tier Problem Prioritization Specialist
- **Trách nhiệm**: Phân loại tự động các than phiền và dấu hiệu lâm sàng thành các thẻ Vấn đề có bằng chứng (`evidence`), gán đúng tầng ưu tiên (Đỏ/Vàng/Xanh) và đề xuất chiến lược chẩn đoán ban đầu.

### 3. 📐 S2-AGENT-02: Epidemic Convergence Triangle Evaluator
- **Trách nhiệm**: Đánh giá sự khớp nối giữa triệu chứng lâm sàng và bối cảnh dịch tễ, tính toán điểm số hội tụ 3 chiều và sinh chỉ định xét nghiệm xác chẩn căn nguyên.

### 4. ⚡ S2-AGENT-03: Conflict & Multi-morbidity Arbiter
- **Trách nhiệm**: Quét ma trận bệnh nền và cảnh báo các chống chỉ định chéo giữa các hướng can thiệp, đưa ra khuyến cáo dung hòa an toàn cho bác sĩ lâm sàng.

### 5. 📋 S2-AGENT-04: EMR Summary Quality Gate Auditor
- **Trách nhiệm**: Kiểm tra bản tóm tắt bệnh án, đảm bảo văn phong cô đọng, súc tích, chuẩn quy chế hồ sơ bệnh án của Bộ Y tế.

---

## 🔗 3. Data Contract Đầu Ra Của Bước 2 (Gửi sang Bước 3)

```typescript
export interface ReasoningToCdssContract {
  summaryText: string;
  primaryProblem: {
    id: string;
    label: string;
    priorityLevel: 'life-threatening' | 'acute' | 'chronic';
    evidence: string[];
    diagnosticPlan?: string;
    therapeuticPlan?: string;
  };
  problemList: Array<{
    id: string;
    label: string;
    priorityLevel: 'life-threatening' | 'acute' | 'chronic';
    evidence: string[];
  }>;
  convergenceLevel: 'high' | 'moderate' | 'low';
  epidemiologicalBoosts: Array<{
    diseaseId: string;
    diseaseName: string;
    factor: number;
    reason: string;
  }>;
  conflictNotes: string[];
}
```
