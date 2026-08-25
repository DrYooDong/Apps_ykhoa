# Hướng dẫn Đóng gói & Biên dịch CliniPortal Mobile App (Android APK & iOS)

Tài liệu này hướng dẫn cách chuyển đổi và đóng gói hệ sinh thái **CliniPortal** thành ứng dụng di động cài đặt trực tiếp trên Android (file `.apk`) và iOS (file `.ipa`) bằng **Capacitor**.

---

## 📋 Yêu cầu Môi trường

1. **Node.js** (`v18+` trở lên, đã sẵn có trên máy).
2. **Android Studio** (Dành cho Android) hoặc **Xcode** (Dành cho macOS / iOS).

---

## 🚀 Các bước Biên dịch ứng dụng Android (.apk)

### Cách 1: Sử dụng Script 1-Click (Khuyên dùng)
1. Nhấp đúp vào file `platforms/mobile/setup-capacitor.cmd` trong thư mục project.
2. Script sẽ tự động đồng bộ tài nguyên web và tạo dự án Android Studio tại thư mục `./android`.

---

### Cách 2: Thực hiện qua Lệnh Terminal

#### Bước 1: Khởi tạo và Đồng bộ Dữ liệu Web
Chạy lệnh sau tại thư mục gốc dự án:
```bash
npx --yes @capacitor/cli sync android
```

#### Bước 2: Tạo dự án Android Studio Bản địa
```bash
npx --yes @capacitor/cli add android
```

#### Bước 3: Biên dịch file APK

**Phương án A – Dùng Android Studio (Dễ nhất):**
1. Mở **Android Studio**.
2. Chọn **Open an existing project** -> Trỏ tới thư mục `Apps_ykhoa/android`.
3. Chờ Android Studio sync Gradle (khoảng 1-2 phút).
4. Vào menu: **Build** -> **Build Bundle(s) / APK(s)** -> **Build APK(s)**.
5. File `.apk` sẽ được tạo tại: `android/app/build/outputs/apk/debug/app-debug.apk`.

**Phương án B – Dùng Lệnh Command Line (Không cần mở Android Studio):**
```bash
cd android
./gradlew assembleDebug
```
File APK thu được nằm ở: `android/app/build/outputs/apk/debug/app-debug.apk`.

---

## 📱 Cài đặt lên Điện thoại Android
1. Copy file `app-debug.apk` sang điện thoại Android (qua USB, Zalo, Google Drive...).
2. Nhấp vào file `.apk` trên điện thoại để cài đặt và sử dụng ứng dụng **CliniPortal** độc lập hoàn toàn!
