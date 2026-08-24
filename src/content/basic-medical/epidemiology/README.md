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
| **Xơ gan & Bệnh gan mạn tính (CLDs)** | [`dth-xo-gan.html`](./dth-xo-gan.html) | Tiêu hóa - Gan mật & Chuyển hóa | K70, K70.3, K74 | Gánh nặng GBD 2019, chuyển dịch HBV/HCV sang MASLD/Rượu, động học Còn bù ➔ Mất bù ➔ ACLF, NCPH |
| **Viêm màng não (Meningitis)** | [`dth-viem-mang-nao.html`](./dth-viem-mang-nao.html) | Thần kinh & Truyền nhiễm | G00, G03, A17, B37.5 | Gánh nặng 2.51M ca GBD, ESCMID theo tuổi, S. suis Việt Nam 52.3%, Lao màng não TBM, nấm Cryptococcus & WHO 2030 |
| **Viêm gan siêu vi B (HBV)** | [`dth-vgsv-b.html`](./dth-vgsv-b.html) | Tiêu hóa - Gan mật & Truyền nhiễm | B18.0, B18.1, B16 | Gánh nặng 254M ca, Việt Nam lưu hành &ge; 9.4% (QĐ 1740/BYT 2026), Cascade of Care Lancet, đồng nhiễm HDV & PMTCT |
| **Viêm gan siêu vi C (HCV)** | [`dth-vgsv-c.html`](./dth-vgsv-c.html) | Tiêu hóa - Gan mật & Truyền nhiễm | B18.2, B17.1 | Gánh nặng 50M ca mạn, Việt Nam > 900.000 ca (QĐ 2855/BYT 2024), Care Cascade Lancet 2026, 6 genotypes, động học tái nhiễm MSM/HIV |
| **Bệnh thận mạn (CKD)** | [`dth-ckd.html`](./dth-ckd.html) | Thận - Tiết niệu & Chuyển hóa | N18, N18.3, N18.5 | Gánh nặng 850M ca toàn cầu (10%), Ma trận KDIGO 2D CGA, Progression Cascade G1-G5, Hội chứng CKM (AHA 2023), ĐTĐ T2 Việt Nam 23.8%–41.7% |
| **Đái tháo đường típ 2 (T2DM)** | [`dth-diabetes.html`](./dth-diabetes.html) | Nội tiết & Chuyển hóa | E11, E10, E14 | Gánh nặng 589M ca toàn cầu (11,1%), 42,8% chưa chẩn đoán, kiểu hình MONW Châu Á, ĐTĐ người lớn VN 7,3%–8,3%, biến chứng thần kinh 38% & sơ đồ IDF 2025 |
| **Xuất huyết tiêu hóa trên (UGIB)** | [`dth-xhth-tren.html`](./dth-xhth-tren.html) | Tiêu hóa - Gan mật | K92.0, K92.1, K92.2 | Mắc 48–160/100k dân/năm, tử vong giảm còn ~2%, NVUGIB vs Vỡ giãn TMTQ xơ gan (tử vong 15–20%), Nam 3:1 & phân tầng GBS &le; 1 (99% an toàn) |
| **Xuất huyết tiêu hóa dưới (LGIB)** | [`dth-xhth-duoi.html`](./dth-xhth-duoi.html) | Tiêu hóa - Gan mật | K92.0, K92.1, K92.2 | Mắc 33–87/100k dân/năm (1,26/1.000 người-năm vượt XHTHT), già hóa dân số & Aspirin, tuổi TB 74, thang điểm Oakland (ESGE) & SALGIB VN |
| **Bạch hầu (Diphtheria)** | [`dth-bach-hau.html`](./dth-bach-hau.html) | Truyền nhiễm & Hô hấp | A36 | R0: 1,7–4,3, ổ chứa bạch hầu da thầm lặng, POR tiếp xúc 11,94, đứt gãy DPT3 VN 2023 còn 64,9% & bùng phát Tây Phi 2023 |

---

## 🛠️ 3. Tài Liệu Hướng Dẫn Kỹ Thuật

- **Skill Agent**: [`.agents/skills/epidemiology-module/SKILL.md`](../../../../.agents/skills/epidemiology-module/SKILL.md)
- **Quy trình tạo bài mới**: [`WORKFLOW_TAO_TRANG_DICH_TE_HOC.md`](./WORKFLOW_TAO_TRANG_DICH_TE_HOC.md)
- **Hướng dẫn thiết kế**: [`HUONG_DAN_THIET_KE_DICH_TE.md`](./HUONG_DAN_THIET_KE_DICH_TE.md)
