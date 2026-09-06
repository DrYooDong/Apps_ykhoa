---
title: "MOC - Kho Tư Vấn"
type: moc
specialty: "Tư vấn & Dặn dò Lâm sàng"
tags:
  - y-khoa/tu-van
  - ngoai-tru/dan-do
  - noi-tru/dau-giuong
  - loai/moc
updated: "2026-09-06"
---

# 🗣️ CliniPortal — Kho Tư Vấn & Kịch Bản Lâm Sàng Ngoại Trú / Nội Trú (Master MOC)

> Cổng điều phối kịch bản giao tiếp, dặn dò và giáo dục người bệnh đa môi trường: **Buồng khám Ngoại trú (Outpatient)** & **Đầu giường Nội trú (Inpatient Bedside)**. Tích hợp đa góc nhìn trên cùng 1 tệp Markdown:
>
> - **🩺 Góc Bác Sĩ**: Chuyên môn, Dược động học, Cạm bẫy dùng thuốc & Kỹ thuật Teach-Back
> - **👤 Góc Người Bệnh**: Bản chất bệnh, Dấu hiệu đỏ cấp cứu, Lối sống định lượng & Xử trí sự cố dùng thuốc
> - **🏥 Kế Hoạch Nội Trú**: Giải thích cận lâm sàng, Tiêu chuẩn xuất viện an toàn & Checklist 5 điều trước khi ra viện

> [!TIP] 🌐 **TRA CỨU SIÊU TỐC TRÊN CLINIAPORTAL KNOWLEDGE VAULT WEB HUB**
> Tra cứu tức thì (< 10ms) với bộ lọc chuyên khoa, giao diện **Bảng Thông Báo Trung Tâm**, bộ chuyển đổi góc nhìn (Dual/Triplet Perspective), chế độ in tờ rơi bệnh nhân (Patient Leaflet) và sao chép lời dặn tại:
> 🔗 **[Mở Kho Tư Vấn trên Web Hub](file:///d:/Apps_ykhoa/src/content/knowledge-vault/index.html?kho=TV)** *(hoặc `http://localhost:3000/src/content/knowledge-vault/index.html?kho=TV`)*

---

## 🏷️ Quy Chuẩn Đặt Tên Tệp Kho Tư Vấn (Standardized File Naming Convention)

Để phục vụ kho dữ liệu mở rộng hàng trăm kịch bản bệnh học đa góc độ, mọi tệp trong Kho 2.6 tuân thủ cú pháp chuẩn hóa:

$$\mathbf{TV\_\langle TênBệnh\rangle\_\langle Context\rangle\_\langle Topic\rangle.md}$$

### 1. Bảng Định Nghĩa Các Trường Thành Phần

| Trường | Ý Nghĩa | Giá Trị Hợp Lệ | Mô Tả & Ví Dụ |
| :--- | :--- | :--- | :--- |
| **`TV`** | Tiền tố Kho Tư Vấn | `TV` | Cố định cho toàn bộ Kho 2.6 |
| **`TênBệnh`** | Tên bệnh lý tiếng Việt | Tên bệnh chuẩn y khoa | `Tăng huyết áp`, `Đái tháo đường type 2`, `Sốt xuất huyết Dengue` |
| **`Context`** | Bối cảnh điều trị lâm sàng | `Ngoai`<br/>`Noi`<br/>`CapCuu`<br/>`HauPhau` | • `Ngoai`: Buồng khám ngoại trú, kê đơn, tái khám định kỳ.<br/>• `Noi`: Nội trú buồng bệnh, đi buồng, chuẩn bị xuất viện.<br/>• `CapCuu`: Bàn tiếp nhận cấp cứu, xử trí dấu hiệu đỏ khẩn.<br/>• `HauPhau`: Tư vấn sau mổ, chăm sóc vết mổ và hồi phục. |
| **`Topic`** | Chủ đề / Nhóm câu hỏi | `P1`<br/>`QuenLieu`<br/>`TacDungPhu`<br/>`DauHieuDo`<br/>`CheDoAn`<br/>`QnA` | • `P1`: Kịch bản tổng quan toàn diện.<br/>• `QuenLieu`: Sự cố quên liều, uống quá liều, đi du lịch quên thuốc.<br/>• `TacDungPhu`: Giải tỏa lo ngại tác dụng không mong muốn.<br/>• `DauHieuDo`: Dấu hiệu cảnh báo nguy kịch cần nhập viện.<br/>• `CheDoAn`: Thực đơn định lượng chuyên biệt theo bệnh.<br/>• `QnA`: Bộ câu hỏi thường gặp của người bệnh/thân nhân. |

> [!NOTE] 💡 **Quy Tắc Tương Thích Ngược (Backward Compatibility)**:
> Các tệp khởi tạo giai đoạn pilot có định dạng `TV_<TênBệnh>_P1.md` được hệ thống catalog tự động nhận diện ngầm định là `Context: Ngoai` (ngoại trú) và `Topic: P1` (tổng quan) mà không cần đổi tên tệp.

---

## 🧭 Kiến Trúc Kịch Bản 3 Góc Nhìn (Multi-Perspective Framework)

```mermaid
graph TD
    A[Bệnh nhân & Thân nhân tiếp cận Y tế] --> B{Bối cảnh lâm sàng}
    B -->|Ngoại trú buồng khám| C[🩺 Góc Bác Sĩ Ngoại Trú]
    B -->|Nội trú buồng bệnh| D[🏥 Kế Hoạch Nội Trú & Xuất Viện]
    B -->|Bệnh nhân & Thân nhân| E[👤 Góc Người Bệnh & Thân Nhân]
    
    C --> C1[Loại trừ bẫy chẩn đoán & tương tác thuốc]
    C --> C2[Kỹ thuật Teach-Back 3 câu hỏi]
    
    D --> D1[Giải thích kết quả XN khi đi buồng]
    D --> D2[Tiêu chuẩn xuất viện an toàn]
    D --> D3[Checklist 5 điều cốt tử trước khi ra viện]
    
    E --> E1[Bản chất bệnh bằng ngôn ngữ bình dân]
    E --> E2[🚨 Báo động đỏ - Cấp cứu / Bấm chuông ngay]
    E --> E3[Lối sống định lượng: Ăn - Uống - Tập]
    E --> E4[Xử trí tình huống quên liều thuốc]
```

---

## 🏛️ Danh Mục Kịch Bản Tư Vấn Lâm Sàng (Catalog)

### ❤️ 1. Tim Mạch

| Tên Kịch Bản | Context | Topic | ICD-10 | Tệp Ghi Chú | Trạng Thái |
| :--- | :---: | :---: | :---: | :--- | :---: |
| **Tăng huyết áp (Ngoại trú)** | `Ngoai` | `P1` | `I10-I15` | [[Tim mạch/TV_Tăng huyết áp_P1\|TV_Tăng huyết áp_P1]] | ✅ Sẵn sàng |
| **Tăng huyết áp (Nội trú)** | `Noi` | `P1` | `I10-I16` | [[Tim mạch/TV_Tăng huyết áp_Noi_P1\|TV_Tăng huyết áp_Noi_P1]] | ✅ Sẵn sàng |
| **Tăng huyết áp — Xử trí quên liều** | `Ngoai` | `QuenLieu` | `I10`, `T46.5` | [[Tim mạch/TV_Tăng huyết áp_Ngoai_QuenLieu\|TV_Tăng huyết áp_Ngoai_QuenLieu]] | ✅ Sẵn sàng |
| **Rối loạn lipid máu** | `Ngoai` | `P1` | `E78` | [[Tim mạch/TV_Rối loạn lipid máu_P1\|TV_Rối loạn lipid máu_P1]] | ⏳ Đang biên soạn |
| **Suy tim mạn nội & ngoại trú** | `Noi`/`Ngoai` | `P1` | `I50` | [[Tim mạch/TV_Suy tim_P1\|TV_Suy tim_P1]] | ⏳ Đang biên soạn |

### 🧬 2. Nội Tiết - Chuyển Hóa

| Tên Kịch Bản | Context | Topic | ICD-10 | Tệp Ghi Chú | Trạng Thái |
| :--- | :---: | :---: | :---: | :--- | :---: |
| **Đái tháo đường type 2 (Ngoại trú)** | `Ngoai` | `P1` | `E11` | [[Nội tiết - Chuyển hóa/TV_Đái tháo đường type 2_P1\|TV_Đái tháo đường type 2_P1]] | ✅ Sẵn sàng |
| **Gout (Ngoại trú)** | `Ngoai` | `P1` | `M10` | [[Nội tiết - Chuyển hóa/TV_Gout_P1\|TV_Gout_P1]] | ✅ Sẵn sàng |
| **Đái tháo đường — Xử trí hạ đường huyết** | `Ngoai` | `QnA` | `E11`, `E16.2` | [[Nội tiết - Chuyển hóa/TV_Đái tháo đường_Ngoai_HaDuongHuyet\|TV_Đái tháo đường_Ngoai_HaDuongHuyet]] | ⏳ Đang biên soạn |

### 🫄 3. Tiêu Hóa - Gan Mật

| Tên Kịch Bản | Context | Topic | ICD-10 | Tệp Ghi Chú | Trạng Thái |
| :--- | :---: | :---: | :---: | :--- | :---: |
| **Trào ngược dạ dày thực quản (GERD)** | `Ngoai` | `P1` | `K21` | [[Tiêu hóa - Gan mật/TV_Trào ngược dạ dày thực quản (GERD)_P1\|TV_Trào ngược dạ dày thực quản (GERD)_P1]] | ✅ Sẵn sàng |
| **Xơ gan: Chẩn đoán & Biến chứng** | `Ngoai` | `bien-chung` | `K74` | [[Tiêu hóa - Gan mật/Xơ gan/TV_XG_Chẩn đoán và biến chứng\|TV_XG_Chẩn đoán và biến chứng]] | ✅ Sẵn sàng |
| **Xơ gan: Dịch tễ học** | `Ngoai` | `dich-te-hoc` | `K74` | [[Tiêu hóa - Gan mật/Xơ gan/TV_XG_Dịch tễ học\|TV_XG_Dịch tễ học]] | ✅ Sẵn sàng |
| **Xơ gan: Phác đồ điều trị** | `Ngoai` | `phac-do` | `K74` | [[Tiêu hóa - Gan mật/Xơ gan/TV_XG_Phác đồ điều trị\|TV_XG_Phác đồ điều trị]] | ✅ Sẵn sàng |
| **Xơ gan: Tiên lượng** | `Ngoai` | `tien-luong` | `K74` | [[Tiêu hóa - Gan mật/Xơ gan/TV_XG_Tiên lượng\|TV_XG_Tiên lượng]] | ✅ Sẵn sàng |
| **Viêm gan B mạn tính** | `Ngoai` | `P1` | `B18.1` | [[Truyền nhiễm/Viêm gan siêu vi/B/TV_VGSV-B_Phác đồ điều trị\|TV_VGSV-B_Phác đồ điều trị]] | ✅ Sẵn sàng |

### 🦟 4. Truyền Nhiễm

#### 4.1. Sốt Xuất Huyết Dengue
| Tên Kịch Bản | Context | Topic | ICD-10 | Tệp Ghi Chú | Trạng Thái |
| :--- | :---: | :---: | :---: | :--- | :---: |
| **SXHD: Chẩn đoán & Phân độ người lớn** | `Ngoai` | `tong-quan` | `A90` | [[Truyền nhiễm/Sốt xuất huyết/TV_SXHD_Chẩn đoán & Phân độ\|TV_SXHD_Chẩn đoán & Phân độ]] | ✅ Sẵn sàng |
| **SXHD: Dịch tễ học** | `Ngoai` | `dich-te-hoc` | `A90` | [[Truyền nhiễm/Sốt xuất huyết/TV_SXHD_Dịch tễ học\|TV_SXHD_Dịch tễ học]] | ✅ Sẵn sàng |
| **SXHD: Biến chứng nguy hiểm** | `Ngoai` | `bien-chung` | `A91` | [[Truyền nhiễm/Sốt xuất huyết/TV_SXHD_Biến chứng\|TV_SXHD_Biến chứng]] | ✅ Sẵn sàng |
| **SXHD: Phác đồ không Dấu hiệu cảnh báo** | `Ngoai` | `tong-quan` | `A90` | [[Truyền nhiễm/Sốt xuất huyết/TV_SXHD_PDDT ko DHCB\|TV_SXHD_PDDT ko DHCB]] | ✅ Sẵn sàng |
| **SXHD: Phác đồ có Dấu hiệu cảnh báo** | `Noi` | `tong-quan` | `A91` | [[Truyền nhiễm/Sốt xuất huyết/TV_SXHD_PDDT có DHCB\|TV_SXHD_PDDT có DHCB]] | ✅ Sẵn sàng |
| **SXHD: Phác đồ nặng thể Sốc (DSS/ICU)** | `Noi` | `tong-quan` | `A91` | [[Truyền nhiễm/Sốt xuất huyết/TV_SXHD_PDDT nặng thể sốc\|TV_SXHD_PDDT nặng thể sốc]] | ✅ Sẵn sàng |
| **SXHD: Phác đồ nặng thể Xuất huyết** | `Noi` | `tong-quan` | `A91` | [[Truyền nhiễm/Sốt xuất huyết/TV_SXHD_PDDT nặng thể xuất huyết\|TV_SXHD_PDDT nặng thể xuất huyết]] | ✅ Sẵn sàng |
| **SXHD: Tiên lượng & Hồi phục** | `Ngoai` | `tien-luong` | `A90` | [[Truyền nhiễm/Sốt xuất huyết/TV_SXHD_Tiên lượng\|TV_SXHD_Tiên lượng]] | ✅ Sẵn sàng |

#### 4.2. Bệnh Thủy Đậu
| Tên Kịch Bản | Context | Topic | ICD-10 | Tệp Ghi Chú | Trạng Thái |
| :--- | :---: | :---: | :---: | :--- | :---: |
| **Thủy đậu: Chẩn đoán & Biến chứng** | `Ngoai` | `bien-chung` | `B01` | [[Truyền nhiễm/Thủy đậu/TV_Thủy đậu_Chẩn đoán & Biến chứng\|TV_Thủy đậu_Chẩn đoán & Biến chứng]] | ✅ Sẵn sàng |
| **Thủy đậu: Dịch tễ học & Đường lây** | `Ngoai` | `dich-te-hoc` | `B01` | [[Truyền nhiễm/Thủy đậu/TV_Thủy đậu_Dịch tễ học\|TV_Thủy đậu_Dịch tễ học]] | ✅ Sẵn sàng |
| **Thủy đậu: Phác đồ điều trị & Chăm sóc da** | `Ngoai` | `phac-do` | `B01` | [[Truyền nhiễm/Thủy đậu/TV_Thủy đậu_Phác đồ điều trị\|TV_Thủy đậu_Phác đồ điều trị]] | ✅ Sẵn sàng |
| **Thủy đậu: Tiên lượng & Zona thần kinh** | `Ngoai` | `tien-luong` | `B01` | [[Truyền nhiễm/Thủy đậu/TV_Thủy đậu_Tiên lượng\|TV_Thủy đậu_Tiên lượng]] | ✅ Sẵn sàng |

#### 4.3. Viêm Gan Siêu Vi (A, B, C, E)
| Tên Kịch Bản | Context | Topic | ICD-10 | Tệp Ghi Chú | Trạng Thái |
| :--- | :---: | :---: | :---: | :--- | :---: |
| **VGSV A: Chẩn đoán & Vàng da** | `Ngoai` | `bien-chung` | `B15` | [[Truyền nhiễm/Viêm gan siêu vi/A/TV_VSGV-A_Chẩn đoán & biến chứng\|TV_VSGV-A_Chẩn đoán & biến chứng]] | ✅ Sẵn sàng |
| **VGSV A: Dịch tễ học** | `Ngoai` | `dich-te-hoc` | `B15` | [[Truyền nhiễm/Viêm gan siêu vi/A/TV_VGSV-A_Dịch tễ học\|TV_VGSV-A_Dịch tễ học]] | ✅ Sẵn sàng |
| **VGSV A: Phác đồ điều trị** | `Ngoai` | `phac-do` | `B15` | [[Truyền nhiễm/Viêm gan siêu vi/A/TV_VGSV-A_Phác đồ điều trị\|TV_VGSV-A_Phác đồ điều trị]] | ✅ Sẵn sàng |
| **VGSV B: Chẩn đoán & Xét nghiệm HBsAg** | `Ngoai` | `bien-chung` | `B18.1` | [[Truyền nhiễm/Viêm gan siêu vi/B/TV_VSGV-B_Chẩn đoán & biến chứng\|TV_VSGV-B_Chẩn đoán & biến chứng]] | ✅ Sẵn sàng |
| **VGSV B: Dịch tễ học & Lây nhiễm** | `Ngoai` | `dich-te-hoc` | `B18.1` | [[Truyền nhiễm/Viêm gan siêu vi/B/TV_VGSV-B_Dịch tễ học\|TV_VGSV-B_Dịch tễ học]] | ✅ Sẵn sàng |
| **VGSV B: Phác đồ điều trị kháng virus** | `Ngoai` | `phac-do` | `B18.1` | [[Truyền nhiễm/Viêm gan siêu vi/B/TV_VGSV-B_Phác đồ điều trị\|TV_VGSV-B_Phác đồ điều trị]] | ✅ Sẵn sàng |
| **VGSV B: Tiên lượng & Tầm soát K gan** | `Ngoai` | `tien-luong` | `B18.1` | [[Truyền nhiễm/Viêm gan siêu vi/B/TV_VGSV-B_Tiên lượng\|TV_VGSV-B_Tiên lượng]] | ✅ Sẵn sàng |
| **VGSV C: Chẩn đoán & Xét nghiệm anti-HCV** | `Ngoai` | `bien-chung` | `B18.2` | [[Truyền nhiễm/Viêm gan siêu vi/C/TV_VSGV-C_Chẩn đoán & biến chứng\|TV_VSGV-C_Chẩn đoán & biến chứng]] | ✅ Sẵn sàng |
| **VGSV C: Dịch tễ học** | `Ngoai` | `dich-te-hoc` | `B18.2` | [[Truyền nhiễm/Viêm gan siêu vi/C/TV_VGSV-C_Dịch tễ học\|TV_VGSV-C_Dịch tễ học]] | ✅ Sẵn sàng |
| **VGSV C: Phác đồ điều trị thuốc DAA** | `Ngoai` | `phac-do` | `B18.2` | [[Truyền nhiễm/Viêm gan siêu vi/C/TV_VGSV-C_Phác đồ điều trị\|TV_VGSV-C_Phác đồ điều trị]] | ✅ Sẵn sàng |
| **VGSV C: Tiên lượng & Chữa khỏi 98%** | `Ngoai` | `tien-luong` | `B18.2` | [[Truyền nhiễm/Viêm gan siêu vi/C/TV_VGSV-C_Tiên lượng\|TV_VGSV-C_Tiên lượng]] | ✅ Sẵn sàng |
| **VGSV E: Dịch tễ học & Vệ sinh thực phẩm** | `Ngoai` | `dich-te-hoc` | `B17.2` | [[Truyền nhiễm/Viêm gan siêu vi/E/TV_VGSV-E_Dịch tễ học\|TV_VGSV-E_Dịch tễ học]] | ✅ Sẵn sàng |
| **VGSV E: Cảnh báo Phụ nữ mang thai** | `Ngoai` | `bien-chung` | `B17.2` | [[Truyền nhiễm/Viêm gan siêu vi/E/TV_VSGV-E_Chẩn đoán & biến chứng\|TV_VSGV-E_Chẩn đoán & biến chứng]] | ✅ Sẵn sàng |

#### 4.4. Viêm Màng Não
| Tên Kịch Bản | Context | Topic | ICD-10 | Tệp Ghi Chú | Trạng Thái |
| :--- | :---: | :---: | :---: | :--- | :---: |
| **Viêm màng não: Chọc dò tủy sống & Cấp cứu** | `CapCuu` | `bien-chung` | `G00` | [[Truyền nhiễm/Viêm màng não/TV_VMN_Chẩn đoán và biến chứng\|TV_VMN_Chẩn đoán và biến chứng]] | ✅ Sẵn sàng |
| **Viêm màng não: Dịch tễ học & Tiêm chủng** | `Ngoai` | `dich-te-hoc` | `G00` | [[Truyền nhiễm/Viêm màng não/TV_VMN_Dịch tễ học\|TV_VMN_Dịch tễ học]] | ✅ Sẵn sàng |
| **Viêm màng não: Phác đồ kháng sinh tĩnh mạch** | `Noi` | `phac-do` | `G00` | [[Truyền nhiễm/Viêm màng não/TV_VMN_Phác đồ điều trị\|TV_VMN_Phác đồ điều trị]] | ✅ Sẵn sàng |
| **Viêm màng não: Tiên lượng & Di chứng** | `Noi` | `tien-luong` | `G00` | [[Truyền nhiễm/Viêm màng não/TV_VMN_Tiên lượng\|TV_VMN_Tiên lượng]] | ✅ Sẵn sàng |

---

## ⚡ 5 Tiêu Chuẩn Vàng Giao Tiếp Buồng Bệnh & Buồng Khám

1. **Nguyên tắc "1 Bệnh - 3 Thông Điệp Cốt Lõi":** Bệnh nhân chỉ ghi nhớ tối đa 3 ý chính khi rời viện hoặc kết thúc khám.
2. **Nguyên tắc Định Lượng (Số hóa lời dặn):** Không nói "ăn nhạt", hãy nói "dưới 1 thìa cà phê muối/ngày (5g)". Không nói "uống nhiều nước", hãy nói "uống đủ 2 lít/ngày".
3. **Nguyên tắc An Toàn Thuốc Mốc 50%:** Nếu thời gian nhớ ra còn hơn một nửa khoảng cách đến liều kế tiếp $\rightarrow$ uống ngay; nếu còn dưới một nửa $\rightarrow$ bỏ qua liều đã quên, tuyệt đối không uống gấp đôi.
4. **Nguyên tắc Báo Động Đỏ Buồng Bệnh:** Cung cấp rõ danh sách dấu hiệu cần bấm chuông cấp cứu ngay (đau ngực, khó thở, méo miệng, huyết áp $\ge$ 180 mmHg).
5. **Nguyên tắc Kiểm Chứng Teach-Back:** Bác sĩ luôn kiểm tra lại mức độ tiếp thu trước khi cho xuất viện hoặc hoàn thành khám.
