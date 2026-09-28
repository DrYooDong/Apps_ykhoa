# 🧠 Kho Hội Chứng Lâm Sàng DocSpace (Syndrome Knowledge Vault)

> Thư mục lưu trữ tri thức chuẩn hóa về các **Hội chứng Lâm sàng (Clinical Syndromes)** dùng chung trong hệ sinh thái CDSS CliniPortal DocSpace.

---

## 🏛️ Nguyên tắc Cốt lõi

1. **Định nghĩa Hội chứng**: Tập hợp từ **ít nhất 02 triệu chứng** (cơ năng, thực thể hoặc cận lâm sàng) cùng xuất hiện theo một cơ chế bệnh sinh chung.
2. **Liên kết Hai chiều (Bi-directional Linking)**:
   - Một **Hội chứng** có danh sách các bệnh lý liên quan (`benhLienQuan[]`) kèm vai trò (`dac_trung`, `thuong_gap`, `co_the_gap`, `bien_chung`).
   - Một **Bệnh lý** (`enriched/<slug>.json`) có danh sách tham chiếu các hội chứng (`syndromes: string[]`).
3. **Tái sử dụng Toàn diện**: Không duplicate hội chứng trong từng bệnh. Tất cả hội chứng đều được định nghĩa 1 lần tại đây và tham chiếu theo `id`.

---

## 📂 Cấu trúc Thư mục

```text
syndromes/
├── index.ts                      # Registry trung tâm + Helper functions tra cứu
├── README.md                     # Tài liệu quy chuẩn này
├── tieu_hoa_gan_mat/             # Chuyên khoa Tiêu hóa - Gan mật
│   ├── hc_suy_te_bao_gan.json    # Hội chứng Suy tế bào gan (Kinh điển trong Xơ gan)
│   ├── hc_tang_ap_cua.json       # Hội chứng Tăng áp lực tĩnh mạch cửa (Kinh điển trong Xơ gan)
│   ├── hc_vang_da.json           # Hội chứng Vàng da (Tắc mật / Gan / Tán huyết)
│   └── hc_xuat_huyet_tieu_hoa.json # Hội chứng Xuất huyết tiêu hóa trên/dưới
└── truyen_nhiem/                 # Chuyên khoa Truyền nhiễm
    ├── hc_canh_bao_dengue.json   # Dấu hiệu cảnh báo SXHD theo WHO & Bộ Y tế
    ├── hc_nhiem_trung.json       # Hội chứng Nhiễm trùng toàn thân (SIRS / Sepsis)
    └── hc_soc_nhiem_trung.json   # Hội chứng Sốc nhiễm trùng / Sốc sốt xuất huyết
```

---

## 📑 Chuẩn JSON Schema của Hội chứng

Mỗi file hội chứng tuân thủ interface `SyndromeDefinition` trong `src/content/docspace/src/types.ts`:

- `id`: Mã định danh duy nhất (VD: `hc_suy_te_bao_gan`).
- `ten`: Tên hiển thị đầy đủ (VD: `Hội chứng Suy tế bào gan`).
- `tenVietTat`: Tên viết tắt lâm sàng (VD: `STBG`).
- `chuyenKhoa`: Chuyên khoa phụ trách chính.
- `nhomHoiChung`: Nhóm cơ chế (Suy chức năng tạng, Tăng áp mạch, Nhiễm khuẩn...).
- `moTa`: Mô tả khái quát hội chứng.
- `coChe`: Cơ chế sinh lý bệnh (Pathophysiology).
- `nguong`: Tiêu chuẩn để xác nhận hội chứng (`at_least_n`, `all`, `percentage`).
- `trieuChung`: Danh sách ID triệu chứng thành phần.
- `benhLienQuan`: Danh sách bệnh lý liên quan trong DocSpace.
- `chanDoanPhanBiet`: Các hội chứng / tình trạng cần phân biệt lâm sàng.
- `diemClinicalPearl`: Các hạt ngọc lâm sàng, bẫy chẩn đoán cần lưu ý.
- `thangDiemLienQuan`: Các thang điểm lâm sàng lượng giá liên quan.
- `nguonThamKhao`: Hướng dẫn của Bộ Y tế, EASL, AASLD, WHO...
