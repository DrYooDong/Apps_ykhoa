---
name: provenance-auditability
description: Kỹ năng chuẩn hóa Nguồn gốc và Dấu vết Kiểm toán Y khoa (Provenance & Auditability) lấy cảm hứng từ Abridge AI. Áp dụng cho CliniPortal: Hệ thống 5 nhóm Evidence Badges (Class I, IIa, IIb, III, Expert Consensus), Provenance Audit Bar (Tem kiểm định EBM) và Clinical Changelog Timeline (Lịch sử cập nhật phác đồ đối sánh cũ vs mới).
---

# Provenance & Clinical Auditability — CliniPortal

Tài liệu này định nghĩa tiêu chuẩn **Truy vết Nguồn gốc và Kiểm toán Dữ liệu Y tế (Provenance & Audit Trail)** trong CliniPortal, giúp đảm bảo mọi khuyến cáo, phác đồ điều trị và nội dung y khoa đều có nguồn gốc rõ ràng, cấp độ chứng cứ chính xác và minh bạch về lịch sử thay đổi.

---

## 🎖️ Ma Trận Phân Loại Chứng Cứ 5 Tầng (EBM Matrix)

| Nhóm | Class CSS | Ý nghĩa Lâm sàng | Màu chuẩn |
|---|---|---|---|
| **Class I** | `.eb-badge.class-1` | **Chỉ định mạnh (Bắt buộc/Nên dùng)**: Lợi ích $\gg$ Rủi ro | Xanh lá (`#047857`) |
| **Class IIa** | `.eb-badge.class-2a` | **Nên xem xét**: Lợi ích $>$ Rủi ro | Xanh y tế (`var(--color-primary)`) |
| **Class IIb** | `.eb-badge.class-2b` | **Có thể cân nhắc**: Lợi ích $\ge$ Rủi ro | Vàng cam (`#b45309`) |
| **Class III** | `.eb-badge.class-3` | **Chống chỉ định / Gây hại (Harm)**: Không chỉ định | Đỏ (`#b91c1c`) |
| **Expert Consensus** | `.eb-badge.expert-opinion` | **Đồng thuận chuyên gia / Kinh nghiệm lâm sàng** | Tím (`#6d28d9`) |

---

## 💻 Mẫu HTML Chuẩn

### 1. Thanh Provenance Audit Bar (Đặt ở đầu bài viết/guideline)
```html
<div class="provenance-audit-bar">
  <div class="audit-meta-group">
    <div class="audit-meta-item">
      <i class="fa-solid fa-building-columns"></i>
      <span>Nguồn ban hành: <strong>ACC / AHA / ESC</strong></span>
    </div>
    <div class="audit-meta-item">
      <i class="fa-regular fa-calendar-check"></i>
      <span>Cập nhật: <strong>Tháng 08/2025</strong></span>
    </div>
    <div class="audit-verified-badge">
      <i class="fa-solid fa-shield-check"></i> EBM Verified
    </div>
  </div>
  <button type="button" class="btn-view-changelog" data-action="view-changelog">
    <i class="fa-solid fa-clock-rotate-left"></i> Lịch sử Thay đổi Phác đồ
  </button>
</div>
```

### 2. Gắn Nhãn Chứng Cứ trong Đoạn Văn hoặc Bảng Phác Đồ
```html
<!-- Khuyến cáo mạnh Class I -->
<span class="eb-badge class-1" data-guideline-ref="ACC/AHA 2024 Heart Failure Guideline">
  <i class="fa-solid fa-check"></i> Class I [IA]
</span>

<!-- Khuyến cáo xem xét Class IIa -->
<span class="eb-badge class-2a" data-guideline-ref="ESC 2023 Guidelines">
  <i class="fa-solid fa-circle-check"></i> Class IIa [B]
</span>

<!-- Chống chỉ định Class III -->
<span class="eb-badge class-3" data-guideline-ref="FDA Safety Alert 2024">
  <i class="fa-solid fa-ban"></i> Class III (Harm)
</span>

<!-- Đồng thuận chuyên gia -->
<span class="eb-badge expert-opinion" data-guideline-ref="Hội Hồi sức Cấp cứu VN Đồng thuận 2025">
  <i class="fa-solid fa-user-doctor"></i> Expert Consensus
</span>
```

### 3. Cấu Trúc Khung Lịch Sử Thay Đổi (Changelog Template)
```html
<div id="clinicalChangelogTemplate" style="display: none;">
  <div class="clinical-changelog-timeline">
    <div class="changelog-item">
      <div class="changelog-header">
        <span class="changelog-version">Phiên bản Cập nhật 2024</span>
        <span class="changelog-date">Tháng 08/2025</span>
      </div>
      <div class="changelog-desc">Cập nhật bổ sung chỉ định dựa trên thử nghiệm lâm sàng mới.</div>
      <div class="changelog-diff">
        <div class="diff-row new">
          <span class="diff-badge">Mới</span>
          <span>Bổ sung Empagliflozin/Dapagliflozin vào phác đồ chuẩn (Class I, Level A).</span>
        </div>
        <div class="diff-row old">
          <span class="diff-badge">Cũ</span>
          <span>Trước đây chỉ áp dụng cho bệnh nhân có kèm Đái tháo đường type 2.</span>
        </div>
      </div>
    </div>
  </div>
</div>
```

---

## 🎨 Tích Hợp File CSS & JS

Trong các trang bài viết lâm sàng (`pages/...`):
```html
<!-- CSS Evidence Bridge & Provenance -->
<link rel="stylesheet" href="../../css/components/evidence-bridge.css">
<link rel="stylesheet" href="../../css/components/non-intrusive-ui.css">

<!-- JS Engine -->
<script src="../../js/non-intrusive-engine.js" defer></script>
<script src="../../js/provenance-engine.js" defer></script>
```
