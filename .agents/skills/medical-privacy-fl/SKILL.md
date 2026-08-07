---
name: medical-privacy-fl
description: Kỹ năng tư vấn, thiết kế và triển khai mô hình AI Y tế Bảo vệ Quyền Riêng tư (Privacy-Preserving Healthcare AI), Federated Learning, MAML Meta-Learning cá nhân hóa, Differential Privacy (DP-RDP) và lượng thể hóa gradient nén dữ liệu cho CliniPortal.
---

# Medical Privacy & Federated Learning Skill — CliniPortal

Tài liệu hướng dẫn AI thiết kế, biên soạn nội dung và phát triển ứng dụng bảo vệ quyền riêng tư bệnh nhân (Privacy-Preserving Medical AI) & Học máy Liên kết (Federated Learning) cho hệ sinh thái CliniPortal.

---

## 🔒 1. Các Trụ Cột Kỹ Thuật Của Privacy-Preserving Medical AI

Khi triển khai hoặc viết bài về AI Y tế Bảo mật (dựa trên chuẩn PFL-HCare / IEEE ICICI-2025):

| Component | Thuật toán / Kỹ thuật | Vai trò trong Y tế | Ứng dụng trong CliniPortal |
|---|---|---|---|
| **Cá nhân hóa Mô hình** | MAML (*Model-Agnostic Meta-Learning*) | Tinh chỉnh mô hình toàn cục $w^*$ thành mô hình cá nhân $w_i = w^* - \alpha \nabla F_i(w^*)$ | Cá nhân hóa chỉ số cảnh báo sớm (NEWS2, qSOFA) cho từng bệnh nhân |
| **Bảo mật Dữ liệu Toán học** | Differential Privacy ($\varepsilon, \delta$-DP với RDP) | Bơm nhiễu Gaussian $N(0, \sigma^2)$ & cắt norm $L_2$ chống tấn công rò rỉ | Tự động ẩn danh hóa và làm mờ dữ liệu bệnh án DocSpace khi xuất PDF/Share |
| **Tiết kiệm Băng thông** | $k$-Bit Gradient Quantization | Nén trọng số mô hình từ Float32 sang 8-bit / 4-bit | Giảm 75% dung lượng dữ liệu truyền tải trên thiết bị đeo IoT y tế |
| **Lựa chọn Thích ứng** | Adaptive Client Selection (Grad-Norm) | Ưu tiên chọn node có độ lệch gradient lớn $p_i = \frac{\|\nabla F_i(w)\|}{\sum_j \|\nabla F_j(w)\|}$ | Tối ưu hóa tốc độ cập nhật dữ liệu giữa các phân khu y tế / phòng khám |

---

## 📋 2. Quy Chuẩn Ẩn Danh Hóa & Bảo Mật Dữ Liệu Bệnh Nhân (HIPAA/GDPR Compliance)

Khi làm việc với các thành phần trong **DocSpace** hoặc **Công cụ Lâm sàng**:

1. **Local Privacy First**: Dữ liệu bệnh nhân nhập vào bệnh án điện tử phải được lưu trữ và xử lý hoàn toàn cục bộ (`localStorage` / `IndexedDB`) trên trình duyệt, KHÔNG tự động gửi dữ liệu thô về bất kỳ server bên thứ ba nào.
2. **Anonymization Pipeline**:
   - Tên bệnh nhân $\rightarrow$ Mã bệnh nhân (Anonymized Patient Hash / ID).
   - Ngày sinh cụ thể $\rightarrow$ Khoảng tuổi (ví dụ: 45–50 tuổi).
   - Địa chỉ $\rightarrow$ Mã vùng (Region Code).
3. **Differential Privacy Preview Widget**: Trong các công cụ CDSS hoặc xuất dữ liệu, cung cấp thanh điều chỉnh mức riêng tư $\varepsilon$ để người dùng trực quan hóa mức độ bảo mật.

---

## ✍️ 3. Định Dạng Bài Viết Y Học Chứng Cứ Về AI Y Tế

Khi AI biên soạn bài viết hoặc Infographic về chủ đề *AI & IoT Y tế*:

* **Cấu trúc bài viết chuẩn**:
  1. *Đặt vấn đề (Problem Statement)*: Rủi ro rò rỉ dữ liệu y tế trung tâm & khoảng cách cá nhân hóa (Non-IID data).
  2. *Giải pháp (Architecture)*: Nguyên lý "Train locally, share globally" với MAML & Differential Privacy.
  3. *So sánh (Benchmark Table)*: So sánh FedAvg vs FedProx vs Per-FedAvg vs PFL-HCare.
  4. *Kết luận lâm sàng (Clinical Pearl)*: Tác động thực tiễn đến bác sĩ & bệnh nhân.
* **Trích dẫn y văn**: Kết hợp skill `pubmed-research-linker` trích dẫn mã DOI/PMID từ IEEE Xplore, PubMed.
