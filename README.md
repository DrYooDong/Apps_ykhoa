# 🩺 CliniPortal — Hệ Sinh Thái Web Y Khoa & Công Cụ Lâm Sàng

> **CliniPortal** là hệ sinh thái web y khoa đa nền tảng được xây dựng với tiêu chuẩn **Offline-First**, **Pure HTML/CSS/JS** (không dùng framework), phục vụ tra cứu công cụ lâm sàng, kỹ năng, phác đồ tiếp cận, dược lý và sinh lý bệnh dành cho bác sĩ, y sĩ và sinh viên y khoa.

---

## 🌟 Tính Năng Nổi Bật

- ⚡ **Offline-First 100%**: Hoạt động mượt mà không cần kết nối Internet hoặc qua giao thức `file:///`.
- 🧮 **Bộ Công Cụ Lâm Sàng (Clinical Calculators)**: Tính toán nhanh chỉ số ABG, GFR, GCS, CHADS2-VASc, phỏng đoán liều và phác đồ điều trị động.
- 🔀 **Lưu Đồ Tiếp Cận Tương Tác (Vector Flowcharts)**: Sơ đồ tiếp cận chẩn đoán và xử trí cấp cứu trực quan, tương tác node & vector.
- 💊 **Dược Lý & Phác Đồ Thuốc**: Tra cứu thuốc theo triệu chứng, chuyên khoa và liều lượng lâm sàng.
- 🩺 **Kỹ Năng Lâm Sàng (OSCE & Bedside Skills)**: Hướng dẫn quy trình khám, thao tác thủ thuật và đọc kết quả cận lâm sàng.
- 🧬 **Sinh Lý & Sinh Lý Bệnh**: Bài đọc sinh lý học trực quan, mục lục tự động (TOC) và hình minh họa chuyên sâu.
- 📚 **Y Học Chứng Cứ (EBM Guidelines) & YHCT**: Tóm tắt khuyến cáo lâm sàng mới nhất và y học cổ truyền.
- 🌗 **Giao Diện Hiện Đại & Dark Mode**: Tự động chuyển đổi Light/Dark Mode, tối ưu trải nghiệm đọc ban đêm.
- 📱 **Đa Nền Tảng (Cross-Platform)**: Chạy trên Web Browser, Laptop (Windows Desktop App) và Di động (Android APK / iOS).

---

## 🖥️ 1. Hướng Dẫn Chạy & Cài Đặt Trên Laptop / Máy Tính (Desktop & Web)

Ứng dụng hỗ trợ 2 cách chạy trên Laptop:

### Cách 1: Trải nghiệm Trực tiếp trên Trình duyệt Web (Không cần cài đặt)

1. Tải hoặc clone thư mục dự án về máy tính.
2. Nhấp đúp chuột trực tiếp vào file **`index.html`** ở thư mục gốc để mở ứng dụng trên trình duyệt (Google Chrome, Microsoft Edge, Mozilla Firefox, Brave,...).
3. *(Tùy chọn cho Dev)*: Sử dụng extension **Live Server** trong VS Code để khởi chạy local server ở địa chỉ `http://127.0.0.1:5500`.

---

### Cách 2: Chạy dưới dạng Ứng dụng Desktop Độc lập (Electron App)

Ứng dụng được đóng gói qua Electron giúp chạy như một phần mềm Windows độc lập.

#### Yêu cầu Môi trường:
- **Node.js** (`v18.0.0` trở lên): Tải tại [nodejs.org](https://nodejs.org/).

#### Thao tác Cài đặt & Khởi chạy:

##### 🚀 Phương án A – Khởi chạy 1-Click (Khuyên dùng trên Windows):
- Nhấp đúp chuột vào file script: **`desktop/launch-desktop.cmd`**.
- Script sẽ tự động gọi Electron và mở cửa sổ ứng dụng **CliniPortal Desktop**.

##### 💻 Phương án B – Chạy qua Command Line (Terminal / PowerShell):
```bash
# Mở Terminal tại thư mục gốc dự án
cd "path/to/Apps_ykhoa"

# Khởi chạy ứng dụng Electron
npm start
```
*Hoặc:*
```bash
npx --yes electron desktop/main-electron.js
```

---

## 📱 2. Hướng Dẫn Cài Đặt & Biên Dịch Trên Di Động (Android & iOS)

CliniPortal tích hợp **Capacitor** để biến toàn bộ hệ thống web thành ứng dụng di động bản địa (Native Mobile App).

### 🤖 Cài Đặt Ứng Dụng Android (.APK)

#### Yêu cầu Môi trường:
1. **Node.js** (`v18+`).
2. **Android Studio** (Dành cho biên dịch APK từ source): Tải tại [developer.android.com/studio](https://developer.android.com/studio).

---

#### 🚀 Cách 1: Biên dịch & Tạo file APK bằng Script 1-Click
1. Nhấp đúp vào file: **`mobile/setup-capacitor.cmd`**.
2. Script sẽ tự động đồng bộ tài nguyên Web và tạo thư mục Android project tại `./android`.
3. Mở **Android Studio** -> chọn **Open** -> Trỏ tới thư mục `android` trong project.
4. Chọn menu **Build** ➔ **Build Bundle(s) / APK(s)** ➔ **Build APK(s)**.
5. Sau khi build hoàn tất, nhấp **locate** để lấy file `app-debug.apk` tại:
   `android/app/build/outputs/apk/debug/app-debug.apk`

---

#### 💻 Cách 2: Biên dịch qua Lệnh Command Line

```bash
# Bước 1: Đồng bộ dữ liệu Web vào Capacitor
npx --yes @capacitor/cli sync android

# Bước 2: Tạo dự án Android bản địa (nếu chưa tạo)
npx --yes @capacitor/cli add android

# Bước 3: Biên dịch file APK trực tiếp qua Terminal (không cần mở giao diện Android Studio)
cd android
./gradlew assembleDebug
```
📌 File APK sau khi build nằm tại: `android/app/build/outputs/apk/debug/app-debug.apk`.

---

#### 📲 Cách 3: Cài đặt file APK lên Điện thoại Android
1. Sao chép file `app-debug.apk` sang điện thoại Android (qua cáp USB, Zalo, Google Drive,...).
2. Mở file `.apk` trên điện thoại ➔ Cho phép cài đặt từ nguồn không xác định (Unknown Sources) ➔ Chọn **Cài đặt**.
3. Khởi chạy biểu tượng **CliniPortal** trên màn hình chính ứng dụng.

---

### 🌐 Cách 4: Chạy dạng PWA (Progressive Web App) Không cần Cài đặt APK
1. Upload/Mở Web CliniPortal trên trình duyệt Safari (iOS) hoặc Chrome (Android).
2. Nhấp vào nút **Chia sẻ** (Safari) hoặc **Menu 3 chấm** (Chrome).
3. Chọn **Thêm vào màn hình chính** (*Add to Home Screen*).
4. Biểu tượng CliniPortal sẽ xuất hiện trên màn hình điện thoại như ứng dụng di động thông thường.

---

## 🗂️ Cấu Trúc Thư Mục Dự Án

```
Apps_ykhoa/
├── index.html               # Trang chủ hệ thống CliniPortal
├── manifest.json            # Cấu hình Web App Manifest (PWA)
├── sw.js                    # Service Worker hỗ trợ Caching Offline
├── capacitor.config.json    # Cấu hình Capacitor Mobile App
├── package.json             # Cấu hình Npm / Electron / Capacitor
├── assets/                  # Tài nguyên tĩnh (Fonts, Images, Icons, Lottie)
├── components/              # Shared Layout (Header, Footer, Navigation)
├── css/                     # Reset CSS, Design System Tokens (main.css) & Module CSS
├── js/                      # Logic điều hướng, Engine đồng bộ & Calculators
├── templates/               # Boilerplate HTML mẫu cho lập trình viên
├── pages/                   # Phân hệ nội dung Y khoa chính:
│   ├── Công cụ/             # Máy tính & Chỉ số lâm sàng
│   ├── Dược lý/             # Tra cứu thuốc & Phác đồ điều trị
│   ├── Kỹ năng/             # Kỹ năng lâm sàng & Đọc cận lâm sàng
│   ├── Sinh lý - Sinh lý bệnh/ # Bài đọc Sinh lý học trực quan
│   ├── Tiếp cận/            # Lưu đồ & Thuật toán chẩn đoán
│   ├── Y học chứng cứ/      # Guidelines & Evidence-Based Medicine
│   └── Y học cổ truyền/     # Kiến thức Y học cổ truyền
├── desktop/                 # Script & Electron Main Process (Laptop App)
│   ├── launch-desktop.cmd
│   └── main-electron.js
├── mobile/                  # Script & Hướng dẫn Đóng gói Mobile (Android/iOS)
│   ├── setup-capacitor.cmd
│   └── build-android-instructions.md
└── docs/                    # Tài liệu hệ thống & Kiến trúc phần mềm
```

---

## 🛠️ Công Nghệ Sử Dụng

- **Core Web**: Pure HTML5, Vanilla CSS3 (Design Tokens / CSS Variables), ES6+ JavaScript.
- **Icon Library**: FontAwesome 6 Free, SVG Custom Icons.
- **Desktop Wrapper**: [Electron](https://www.electronjs.org/).
- **Mobile Wrapper**: [Capacitor JS](https://capacitorjs.com/).
- **Design Standard**: Responsive Design, Mobile-First, Dark/Light Mode Switcher.

---

## 📄 Giấy Phép & Đóng Góp

Dự án được xây dựng và phát triển bởi **CliniPortal Team** dành riêng cho cộng đồng y khoa.

---
*Mọi thắc mắc hoặc góp ý phát triển ứng dụng, vui lòng tham khảo các tài liệu chi tiết tại thư mục [`docs/`](file:///i:/Drive%20c%E1%BB%A7a%20t%C3%B4i/apps/Apps_ykhoa/docs).*
