# 🦠 Phân Hệ Dịch Tễ Học Y Khoa & Y Tế Công Cộng (Epidemiology Subsystem)

> Thư mục lưu trữ các bài viết chuyên sâu về **Dịch tễ học bệnh lý, Tác nhân vi sinh & Sức khỏe cộng đồng** trong CliniPortal.

---

## 📁 1. Cấu Trúc Thư Mục

```text
src/content/basic-medical/epidemiology/
├── README.md                              # Tài liệu mục lục phân hệ
├── HUONG_DAN_THIET_KE_DICH_TE.md          # Hướng dẫn thiết kế & Design tokens
├── WORKFLOW_TAO_TRANG_DICH_TE_HOC.md      # Quy trình biên dịch từ Knowledge Vault sang HTML
└── dth-[ma-benh-slug].html                # File bài viết dịch tễ học chuyên sâu (Cấp 4)
```

---

## 📚 2. Danh Mục Bài Viết Dịch Tễ Học Hiện Có

| Tên Bệnh / Tác Nhân | File HTML | Chuyên Khoa | ICD-10 | Điểm Nhấn Dịch Tễ |
|---------------------|-----------|-------------|--------|-------------------|
| **Sốt xuất huyết Dengue (DENV)** | [`dth-dengue.html`](./dth-dengue.html) | Truyền nhiễm & Vi sinh | A90, A91 | Tam giác dịch tễ, véc-tơ muỗi *Aedes*, chu kỳ lây truyền, cơ chế ADE, số liệu dịch 2024–2026 |
| **Sốt rét (Malaria / Plasmodium)** | [`dth-sot-ret.html`](./dth-sot-ret.html) | Truyền nhiễm & Ký sinh trùng | B50, B51, B52, B54 | 5 loài *Plasmodium*, véc-tơ *Anopheles*, thể ngủ gan, 4 mối đe dọa sinh học, WHO 2025 & QĐ 4922/BYT |
| **Thủy đậu (Varicella / VZV)** | [`dth-thuy-dau.html`](./dth-thuy-dau.html) | Truyền nhiễm & Vi sinh | B01, B02 | Ôn đới vs Nhiệt đới, tử vong chữ U, kỷ nguyên vắc-xin 1-liều/2-liều, rủi ro dịch chuyển tuổi WHO &ge;80% |

---

## 🛠️ 3. Tài Liệu Hướng Dẫn Kỹ Thuật

- **Skill Agent**: [`.agents/skills/epidemiology-module/SKILL.md`](../../../../.agents/skills/epidemiology-module/SKILL.md)
- **Quy trình tạo bài mới**: [`WORKFLOW_TAO_TRANG_DICH_TE_HOC.md`](./WORKFLOW_TAO_TRANG_DICH_TE_HOC.md)
- **Hướng dẫn thiết kế**: [`HUONG_DAN_THIET_KE_DICH_TE.md`](./HUONG_DAN_THIET_KE_DICH_TE.md)
