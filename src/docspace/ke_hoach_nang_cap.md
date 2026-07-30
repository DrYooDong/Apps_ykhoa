# 🏥 Kế Hoạch Nâng Cấp Docspace CDSS Hub — v2.0

> **Cập nhật**: 2026-07-30 | Phiên bản kế hoạch: v2.0 (Nâng cấp từ v1.0)
> **Tác giả phân tích**: Dựa trên kiểm tra toàn bộ codebase thực tế tại `src/docspace/`

---

## 📌 Tóm Tắt Trạng Thái Hiện Tại (As-Is Analysis)

Sau khi kiểm tra trực tiếp codebase, hệ thống Docspace hiện đang ở tình trạng:

| Module | File | Trạng thái | Mức độ hoàn thiện |
|--------|------|------------|-------------------|
| SBAR | `features/sbar-view.ts` | ✅ Hoạt động | ~80% |
| On-Call List | `features/oncall-view.ts` | ✅ Hoạt động | ~85% |
| Case Logger | `features/case-logger-view.ts` | ✅ Hoạt động | ~75% |
| Quick Links | `features/quick-links-view.ts` | ✅ Hoạt động | ~90% |
| Personal Notepad | `features/notepad-view.ts` | ✅ Hoạt động | ~70% |
| Drug Journal | `features/drug-journal-view.ts` | ✅ Hoạt động | ~65% |
| Protocol Builder | `features/protocol-view.ts` | ✅ Hoạt động | ~70% |
| **Living Protocol Engine** | `features/living-protocol-view.ts` | ⚠️ **Stub** | ~10% (chỉ có Rule Engine demo) |
| **Simulation Sandbox** | `features/simulation-view.ts` | ❌ **Empty stub** | ~2% (chỉ có placeholder) |
| RAG Engine | `ai/rag-engine.ts` | ✅ Hoạt động | ~60% (keyword-only) |
| LLM Client | `ai/llm-client.ts` | ✅ Hoạt động | ~70% |
| **Clinical Bridge** | *(chưa tồn tại)* | ❌ **Chưa xây dựng** | 0% |
| **Hub↔Spoke Sync** | *(chưa tồn tại)* | ❌ **Chưa xây dựng** | 0% |

**Nhận xét tổng quan**: Kế hoạch v1.0 tập trung vào kiến trúc Hub↔Spoke nhưng **bỏ qua hoàn toàn** các module đang tồn tại chưa được hoàn thiện trong hệ thống. Đây là nguy cơ lớn nhất.

---

## ⚠️ Phân Tích Rủi Ro & Biện Pháp Giảm Thiểu

### 🔴 Rủi ro Cao

| # | Rủi ro | Nguyên nhân | Biện pháp Giảm thiểu |
|---|--------|-------------|----------------------|
| R1 | **Mất dữ liệu bác sĩ** | localStorage bị clear, quota vượt (~5MB) | Implement auto-export theo lịch + cảnh báo quota |
| R2 | **CORS / fetch thất bại** | RAG engine fetch `data/search-index.json` có thể fail khi offline | Thêm fallback graceful + cache ServiceWorker |
| R3 | **eval() / new Function() bị CSP block** | Rule engine dùng `new Function()` — bị chặn nếu có Content-Security-Policy | Chuyển sang safe-formula-parser (không dùng eval) |
| R4 | **Tab isolation** | BroadcastChannel không hỗ trợ `file://` protocol | Dùng `localStorage` + `storage` event thay thế BroadcastChannel |
| R5 | **Stub features gây confusion** | Simulation & Living Protocol hiển thị "đang phát triển" mà không có roadmap rõ | Cần ẩn hoặc hoàn thiện trước khi release |

### 🟡 Rủi ro Trung Bình

| # | Rủi ro | Biện pháp |
|---|--------|-----------|
| R6 | LLM API Key lưu localStorage (plain text) | Thêm obfuscation + cảnh báo bảo mật rõ ràng trong UI |
| R7 | Import JSON profile không validate schema | Thêm version check & schema validation trước khi import |
| R8 | ICD-10 hardcode string | Tách thành `data/icd10-codes.json` để dễ cập nhật |
| R9 | Không có undo khi xóa SBAR/Case | Thêm "soft delete" với trash bin 7 ngày |

---

## 🗺️ Lộ Trình Nâng Cấp Chi Tiết (6 Giai Đoạn)

> **Thay đổi so với v1.0**: Tách thêm Giai đoạn 0 (Consolidation) và Giai đoạn 6 (AI Enhancement) để đảm bảo không build trên nền tảng không ổn định.

---

### 🔷 Giai Đoạn 0: Ổn Định Nền Tảng (Foundation Hardening) — **ƯU TIÊN TRƯỚC TIÊN**

**Mục tiêu**: Vá các lỗ hổng hiện tại trước khi thêm tính năng mới.

**Tác vụ 0.1: Bảo Vệ Dữ Liệu (Data Safety)**
```typescript
// Trong storage.ts — thêm quota guard
function checkStorageQuota(): { usedMB: number; isSafe: boolean } {
  const used = new Blob(Object.values(localStorage)).size / (1024 * 1024);
  return { usedMB: used, isSafe: used < 4 }; // Warn at 4MB
}
// Auto-backup khi đạt ngưỡng 80% quota
```
- Thêm **quota warning banner** khi sử dụng > 4MB
- Thêm **soft delete** với `deletedAt` timestamp (trash bin 7 ngày)
- Validate schema JSON khi import snapshot (kiểm tra `version` field)

**Tác vụ 0.2: Sửa Rule Engine An Toàn**
- Thay `new Function()` bằng safe evaluator chỉ chấp nhận `+, -, *, /, (, )` và tên biến whitelist
- Tránh dependency ngoài để giữ project Vanilla JS

**Tác vụ 0.3: Graceful Error Handling**
```typescript
// Trong rag-engine.ts — thêm fallback
export async function loadRAGIndex(): Promise<void> {
  try {
    const response = await fetch('data/search-index.json');
    // ...existing code...
  } catch {
    console.warn('[RAG] Offline mode — search disabled');
    // Hiển thị toast "Offline — Tìm kiếm AI không khả dụng"
  }
}
```

**Tác vụ 0.4: Ẩn Stub Features**
- Ẩn **Simulation Sandbox** và **Living Protocol** khỏi sidebar navigation cho đến khi hoàn thiện
- Dùng `phase` filter trên `DSP_NAV_ITEMS` (type đã có sẵn trong `types.ts`)

---

### 🔷 Giai Đoạn 1: Hoàn Thiện Living Protocol Engine — **Tính Năng Chưa Khai Thác #1**

**Mục tiêu**: Biến Living Protocol từ stub thành công cụ thực thi phác đồ tương tác.

**Hiện trạng**: `living-protocol-view.ts` chỉ có demo rule engine với 2 inputs cứng. `LivingProtocol` type đã được định nghĩa đầy đủ trong `types.ts` nhưng **chưa có storage functions** và **chưa có UI** tạo/chỉnh sửa.

**Tác vụ 1.1: Thêm Storage Functions**
```typescript
// Thêm vào storage.ts
export function getLivingProtocols(profileId: string): LivingProtocol[] { ... }
export function saveLivingProtocol(profileId: string, p: LivingProtocol): void { ... }
export function deleteLivingProtocol(profileId: string, id: string): void { ... }
```

**Tác vụ 1.2: UI Builder Node-based**
- **List view**: Danh sách phác đồ động đã tạo
- **Create/Edit form**: Khai báo biến đầu vào, tạo các Node (`action | branch | calculation | guideline_sync`), preview luồng
- **Execute mode**: Nhập biến → Chạy từng node → Hiển thị kết quả theo bước

**Tác vụ 1.3: Template Library**
Cung cấp sẵn 3-5 template Living Protocol:
- `sepsis-1h-bundle.json` — Sepsis 1-hour bundle
- `aki-staging.json` — Phân tầng AKI + chỉnh liều
- `vancomycin-dosing.json` — Chỉnh liều Vancomycin theo eGFR

---

### 🔷 Giai Đoạn 2: Hoàn Thiện Simulation Sandbox — **Tính Năng Chưa Khai Thác #2**

**Mục tiêu**: Xây dựng đầy đủ module mô phỏng điều trị từ type đã định nghĩa.

**Hiện trạng**: `simulation-view.ts` chỉ có 32 dòng placeholder. `SimulationSession` và `SimulationResult` types đã định nghĩa đầy đủ nhưng **không có storage, không có UI, không có logic**.

**Tác vụ 2.1: Simulation Storage**
```typescript
// Thêm vào storage.ts
export function getSimulations(profileId: string): SimulationSession[] { ... }
export function saveSimulation(profileId: string, s: SimulationSession): void { ... }
```

**Tác vụ 2.2: UI Wizard 3 bước**

- **Bước 1 — Patient Context**: Age | Weight | eGFR | Comorbidities | Current Meds
- **Bước 2 — Proposed Regimen**: Drug Name | Dose | Route | Add more (+)
- **Bước 3 — Simulation Result**:
  - Drug Interactions Panel (severity: high/mod/low)
  - Clinical Warnings List
  - Safety Score Meter (gauge 0–100)
  - "Save to Case" button

**Tác vụ 2.3: Offline Logic Engine (Không cần AI)**
- Tích hợp bộ rule tương tác thuốc cơ bản (15-20 cặp phổ biến ICU) dưới dạng JSON data
- Ví dụ: `vancomycin + aminoglycoside → nephrotoxicity warning`
- **Lý do không dùng AI**: Đảm bảo hoạt động 100% offline, không phụ thuộc API

---

### 🔷 Giai Đoạn 3: Chuẩn Hóa Tầng Dữ Liệu & Clinical Bridge (v1.0 Phase 1 — Revised)

**Mục tiêu**: Xây dựng cơ chế truyền dữ liệu từ Docspace sang các Web con.

> ⚠️ **Thay đổi quan trọng so với v1.0**: BroadcastChannel **KHÔNG hoạt động** với `file://` protocol. Giải pháp thay thế: `localStorage` + `window.storage` event.

**Tác vụ 3.1: Định Nghĩa `ClinicalSession` Schema**

```typescript
// Thêm vào types.ts
export interface ClinicalSession {
  version: '1.0';
  sourceModule: 'docspace' | 'oncall' | 'case';
  patient: {
    age?: number; weight?: number; sex?: 'M' | 'F';
    sbp?: number; dbp?: number; hr?: number; temp?: number; spo2?: number;
    scr?: number; bun?: number; na?: number; k?: number; hb?: number;
    wbc?: number; crp?: number; procalcitonin?: number;
    egfr?: number; crcl?: number;
  };
  diagnoses: { icd10: string; label: string }[];
  medications: { name: string; dose?: string; route?: string }[];
  calculationResults: Record<string, number>;
  timestamp: string;
}
```

**Tác vụ 3.2: `clinical-bridge.ts`**

```typescript
// src/docspace/core/clinical-bridge.ts
const SESSION_KEY = 'cp_clinical_session';

export function publishSession(session: ClinicalSession): void {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function readSession(): ClinicalSession | null { ... }

export function onSessionUpdate(cb: (s: ClinicalSession) => void): () => void {
  const handler = (e: StorageEvent) => {
    if (e.key === SESSION_KEY && e.newValue) cb(JSON.parse(e.newValue));
  };
  window.addEventListener('storage', handler);
  return () => window.removeEventListener('storage', handler);
}

export function buildDeepLink(toolPath: string, session: ClinicalSession): string {
  const params = new URLSearchParams({ age, weight, egfr, scr, na });
  return `${toolPath}?${params.toString()}`;
}
```

**Tác vụ 3.3: "Launch Tool" Button trong OnCall & Case Logger**
- Dropdown "Mở công cụ" khi xem bệnh nhân → tự động serialize ClinicalSession → mở Web con

---

### 🔷 Giai Đoạn 4: Nâng Cấp RAG Engine & CDSS Gợi Ý (v1.0 Phase 2 — Enhanced)

**Mục tiêu**: Tăng độ chính xác RAG, thêm gợi ý CDSS proactive.

**Tác vụ 4.1: ICD-10 Boost Scoring**
```typescript
// Trong rag-engine.ts
export function searchContext(query: string, icd10Codes?: string[], topK = 5): RAGChunk[] {
  // ...existing keyword scoring...
  if (icd10Codes) {
    for (const code of icd10Codes) {
      if (chunk.tags.some(t => t.startsWith(code))) score += 10; // Hard boost
    }
  }
}
```

**Tác vụ 4.2: EBM Side Panel trong Case Logger**
- Khi bác sĩ nhập `chiefComplaint` hoặc `icd10Code`, tự động hiển thị panel gợi ý guideline từ RAG
- Click card → Mở trang guideline đầy đủ trong CliniPortal

**Tác vụ 4.3: Smart Action Chips trong Dashboard**
- Dựa vào lịch sử On-Call gần nhất, hiển thị chip gợi ý:
  - `🧮 Tính CrCl` (nếu có bệnh nhân dùng aminoglycoside)
  - `📋 Tạo SBAR` (nếu đang có ca trực active)
  - `⚠️ Tương tác thuốc` (nếu có drug journal mới)

---

### 🔷 Giai Đoạn 5: Hub↔Spoke Auto-fill & Push-back (v1.0 Phase 4 — Simplified)

> ⚠️ **Phạm vi thu hẹp**: Chỉ thực hiện với **3 Web con đã có sẵn** trước (ABG Studio, eGFR, Antibiotic Dosing).

**Tác vụ 5.1: Auto-fill tại Web con**
```javascript
function readDocspaceSession() {
  const raw = localStorage.getItem('cp_clinical_session');
  if (!raw) return;
  const session = JSON.parse(raw);
  if (session.patient?.weight) document.getElementById('inputWeight').value = session.patient.weight;
  // ...tương tự cho age, scr, egfr...
}
document.addEventListener('DOMContentLoaded', readDocspaceSession);
```

**Tác vụ 5.2: "Gửi Kết Quả về Docspace" Button**
```javascript
function pushResultToDocspace(toolId, result) {
  const raw = localStorage.getItem('cp_clinical_session');
  const session = raw ? JSON.parse(raw) : { calculationResults: {} };
  session.calculationResults[toolId] = result;
  session.timestamp = new Date().toISOString();
  localStorage.setItem('cp_clinical_session', JSON.stringify(session));
  showToast('✅ Đã gửi kết quả về Docspace');
}
```

**Tác vụ 5.3: Results Aggregation Panel**
- Tab "Kết quả Công cụ" trong Case Logger hiển thị tất cả `calculationResults`
- Nút "Attach to Case" để gắn vào CaseRecord

---

### 🔷 Giai Đoạn 6: AI Enhancement (Mới — không có trong v1.0)

**Mục tiêu**: Khai thác tối đa AI engine đã xây dựng, thêm các use-case chưa được khai phá.

**Tác vụ 6.1: AI-Assisted Drug Journal**
```typescript
export async function analyzeDrugRegimen(
  drugs: string[], indication: string, settings: AISettings, context: RAGChunk[]
): Promise<{ interactions: string[], recommendations: string[] }> { ... }
```
- Nút "🤖 Phân tích AI" trong Drug Journal → kết quả hiển thị inline

**Tác vụ 6.2: AI Summary cho On-Call Shift**
- Cuối ca trực: Nút "📝 Tạo tóm tắt bàn giao AI"
- AI đọc danh sách bệnh nhân + notes → Tạo tóm tắt handover theo format SBAR
- Auto-tạo SBAR record sau khi bác sĩ review

**Tác vụ 6.3: Semantic Search (Tùy chọn, nếu có embedding API)**
- Option trong AI Settings: `useEmbeddings: boolean`
- Fallback về keyword search khi endpoint không khả dụng

**Tác vụ 6.4: SBAR Generation Improvements**
- Template chuyên khoa (ICU vs. Nội khoa vs. Ngoại khoa)
- Nút "Regenerate" với temperature slider
- Version history trong SBAR

---

## 📊 Bảng Deliverables Cập Nhật

| Giai đoạn | Module chính | Output | Ưu tiên |
|-----------|-------------|--------|---------|
| **GD 0** | `storage.ts`, `rule-engine.ts` | Data safety, secure eval, ẩn stubs | 🔴 Critical |
| **GD 1** | `living-protocol-view.ts`, `storage.ts` | Living Protocol hoạt động đầy đủ | 🟠 High |
| **GD 2** | `simulation-view.ts`, `storage.ts` | Simulation Sandbox + offline drug rules | 🟠 High |
| **GD 3** | `core/clinical-bridge.ts`, `types.ts` | ClinicalSession + localStorage bridge | 🟡 Medium |
| **GD 4** | `ai/rag-engine.ts`, Case Logger | RAG chính xác hơn + EBM panel | 🟡 Medium |
| **GD 5** | 3 Web con, OnCall view | Auto-fill + Push-back hoạt động | 🟡 Medium |
| **GD 6** | `ai/llm-client.ts`, Drug Journal | AI Drug Analysis + Handover Summary | 🟢 Enhancement |

---

## 🏗️ Kiến Trúc File Mới Cần Tạo

```
src/docspace/
├── core/
│   └── clinical-bridge.ts              [MỚI] — Hub↔Spoke data bridge
├── data/
│   ├── drug-interactions.json           [MỚI] — Offline drug interaction rules
│   ├── icd10-lookup.json               [MỚI — Trích xuất từ hardcode]
│   └── living-protocol-templates/
│       ├── sepsis-1h-bundle.json        [MỚI]
│       ├── aki-staging.json             [MỚI]
│       └── vancomycin-dosing.json       [MỚI]
└── features/
    ├── living-protocol-view.ts          [NÂNG CẤP mạnh — từ stub → full]
    └── simulation-view.ts               [XÂY DỰNG từ đầu — từ 32 dòng placeholder]
```

---

## 🔄 So Sánh v1.0 → v2.0

| Khía cạnh | Kế hoạch v1.0 | Kế hoạch v2.0 |
|-----------|--------------|--------------|
| Điểm bắt đầu | Build từ đầu Hub↔Spoke | **Fix existing stubs trước** |
| Living Protocol | Nhắc tới nhưng không detail | **Giai đoạn riêng, đầy đủ** |
| Simulation Sandbox | Nhắc tới nhưng không detail | **Giai đoạn riêng, offline-first** |
| BroadcastChannel | Đề xuất dùng | **Không dùng** — `file://` không hỗ trợ |
| AI Features | Không đề cập | **Giai đoạn 6 mở rộng** |
| Phân tích rủi ro | Không có | **Bảng rủi ro R1-R9 đầy đủ** |
| Thứ tự ưu tiên | Kiến trúc mới trước | **Ổn định → Hoàn thiện → Mở rộng** |
| Số giai đoạn | 5 | **6 (thêm GD 0 & GD 6)** |
