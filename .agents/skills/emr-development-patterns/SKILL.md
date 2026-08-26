---
name: emr-development-patterns
description: Quy chuẩn phát triển Hồ sơ Bệnh án Điện tử (EMR/EHR): Cấu trúc SOAP, ghi nhận khám bệnh phân tầng, hiển thị khoảng tham chiếu xét nghiệm cảnh báo đỏ (Panic values), truy vết kiểm toán (Audit trail).
---

# Healthcare EMR Development Patterns

Patterns for building Electronic Medical Record (EMR) and Electronic Health Record (EHR) systems. Prioritizes patient safety, clinical accuracy, and practitioner efficiency.

## When to Use

- Building patient encounter workflows (complaint, exam, diagnosis, prescription)
- Implementing clinical note-taking (structured + free text + voice-to-text)
- Designing prescription/medication modules with drug interaction checking
- Integrating Clinical Decision Support Systems (CDSS)
- Building lab result displays with reference range highlighting
- Implementing audit trails for clinical data
- Designing healthcare-accessible UIs for clinical data entry

## How It Works

### Patient Safety First

Every design decision must be evaluated against: "Could this harm a patient?"

- Drug interactions MUST alert, not silently pass
- Abnormal lab values MUST be visually flagged
- Critical vitals MUST trigger escalation workflows
- No clinical data modification without audit trail

### Single-Page Encounter Flow

Clinical encounters should flow vertically on a single page â€” no tab switching:

```
Patient Header (sticky â€” always visible)
â”œâ”€â”€ Demographics, allergies, active medications
â”‚
Encounter Flow (vertical scroll)
â”œâ”€â”€ 1. Chief Complaint (structured templates + free text)
â”œâ”€â”€ 2. History of Present Illness
â”œâ”€â”€ 3. Physical Examination (system-wise)
â”œâ”€â”€ 4. Vitals (auto-trigger clinical scoring)
â”œâ”€â”€ 5. Diagnosis (ICD-10/SNOMED search)
â”œâ”€â”€ 6. Medications (drug DB + interaction check)
â”œâ”€â”€ 7. Investigations (lab/radiology orders)
â”œâ”€â”€ 8. Plan & Follow-up
â””â”€â”€ 9. Sign / Lock / Print
```

### Smart Template System

```typescript
interface ClinicalTemplate {
  id: string;
  name: string;             // e.g., "Chest Pain"
  chips: string[];          // clickable symptom chips
  requiredFields: string[]; // mandatory data points
  redFlags: string[];       // triggers non-dismissable alert
  icdSuggestions: string[]; // pre-mapped diagnosis codes
}
```

Red flags in any template must trigger a visible, non-dismissable alert â€” NOT a toast notification.

### Medication Safety Pattern

```
User selects drug
  â†’ Check current medications for interactions
  â†’ Check encounter medications for interactions
  â†’ Check patient allergies
  â†’ Validate dose against weight/age/renal function
  â†’ If CRITICAL interaction: BLOCK prescribing entirely
  â†’ Clinician must document override reason to proceed past a block
  â†’ If MAJOR interaction: display warning, require acknowledgment
  â†’ Log all alerts and override reasons in audit trail
```

Critical interactions **block prescribing by default**. The clinician must explicitly override with a documented reason stored in the audit trail. The system never silently allows a critical interaction.

### Locked Encounter Pattern

Once a clinical encounter is signed:
- No edits allowed â€” only an addendum (a separate linked record)
- Both original and addendum appear in the patient timeline
- Audit trail captures who signed, when, and any addendum records

### UI Patterns for Clinical Data

**Vitals Display:** Current values with normal range highlighting (green/yellow/red), trend arrows vs previous, clinical scoring auto-calculated (NEWS2, qSOFA), escalation guidance inline.

**Lab Results Display:** Normal range highlighting, previous value comparison, critical values with non-dismissable alert, collection/analysis timestamps, pending orders with expected turnaround.

**Prescription PDF:** One-click generation with patient demographics, allergies, diagnosis, drug details (generic + brand, dose, route, frequency, duration), clinician signature block.

### Accessibility for Healthcare

Healthcare UIs have stricter requirements than typical web apps:
- 4.5:1 minimum contrast (WCAG AA) â€” clinicians work in varied lighting
- Large touch targets (44x44px minimum) â€” for gloved/rushed interaction
- Keyboard navigation â€” for power users entering data rapidly
- No color-only indicators â€” always pair color with text/icon (colorblind clinicians)
- Screen reader labels on all form fields
- No auto-dismissing toasts for clinical alerts â€” clinician must actively acknowledge

### Anti-Patterns

- Storing clinical data in browser localStorage
- Silent failures in drug interaction checking
- Dismissable toasts for critical clinical alerts
- Tab-based encounter UIs that fragment the clinical workflow
- Allowing edits to signed/locked encounters
- Displaying clinical data without audit trail
- Using `any` type for clinical data structures

## Examples

### Example 1: Patient Encounter Flow

```
Doctor opens encounter for Patient #4521
  â†’ Sticky header shows: "Rajesh M, 58M, Allergies: Penicillin, Active Meds: Metformin 500mg"
  â†’ Chief Complaint: selects "Chest Pain" template
    â†’ Clicks chips: "substernal", "radiating to left arm", "crushing"
    â†’ Red flag "crushing substernal chest pain" triggers non-dismissable alert
  â†’ Examination: CVS system â€” "S1 S2 normal, no murmur"
  â†’ Vitals: HR 110, BP 90/60, SpO2 94%
    â†’ NEWS2 auto-calculates: score 8, risk HIGH, escalation alert shown
  â†’ Diagnosis: searches "ACS" â†’ selects ICD-10 I21.9
  â†’ Medications: selects Aspirin 300mg
    â†’ CDSS checks against Metformin: no interaction
  â†’ Signs encounter â†’ locked, addendum-only from this point
```

### Example 2: Medication Safety Workflow

```
Doctor prescribes Warfarin for Patient #4521
  â†’ CDSS detects: Warfarin + Aspirin = CRITICAL interaction
  â†’ UI: red non-dismissable modal blocks prescribing
  â†’ Doctor clicks "Override with reason"
  â†’ Types: "Benefits outweigh risks â€” monitored INR protocol"
  â†’ Override reason + alert stored in audit trail
  â†’ Prescription proceeds with documented override
```

### Example 3: Locked Encounter + Addendum

```
Encounter #E-2024-0891 signed by Dr. Shah at 14:30
  â†’ All fields locked â€” no edit buttons visible
  â†’ "Add Addendum" button available
  â†’ Dr. Shah clicks addendum, adds: "Lab results received â€” Troponin elevated"
  â†’ New record E-2024-0891-A1 linked to original
  â†’ Timeline shows both: original encounter + addendum with timestamps
```

