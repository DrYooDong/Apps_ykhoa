# Quy chuẩn Thiết kế & Biên soạn Công cụ Lâm sàng (CliniPortal)

Thư mục `pages/Công cụ/` chứa các ứng dụng tính toán lâm sàng và hướng dẫn phác đồ điều trị động. Để duy trì tính nhất quán về thẩm mỹ và chức năng, các công cụ tiếp theo phải được xây dựng theo một trong hai phong cách giao diện (UI Style) chuẩn dưới đây.

---

## 📁 1. Quy tắc Đường dẫn Tương đối (Relative Paths)
Các tệp công cụ nằm ở cấp thư mục thứ 4 (`pages/Công cụ/[Phân_nhóm]/[Tên_tệp].html`), do đó các liên kết tài nguyên hệ thống phải lùi đúng **3 cấp** (`../../../`):
- **Tài nguyên dùng chung:** `../../../` (Ví dụ: `../../../css/reset.css`, `../../../css/main.css`, `../../../components/header.js`, `../../../js/sidebar.js`).

---

## ⚡ STYLE 1: Công cụ Bù dịch / Hướng dẫn Xử trí Lâm sàng (Treatment Fluid Advisors)

### Đặc điểm
Dành cho các bài toán tính toán liều lượng thuốc, dịch truyền, phân chia các giai đoạn bù dịch phức tạp theo thời gian thực (được tham chiếu từ mẫu [QL_Budich.html](file:///i:/Drive%20c%E1%BB%A7a%20t%C3%B4i/apps/Apps_ykhoa/pages/C%C3%B4ng%20c%E1%BB%A5/C%E1%BA%A5p%20c%E1%BB%A9u%20&%20h%E1%BB%93i%20s%E1%BB%A9c/QL_Budich.html)).

### Các thành phần UI cốt lõi
1. **Hero Gradient Card (`.hero-bd`)**: Khung giới thiệu nổi bật với gradient chuyển màu y tế xanh dương-xanh ngọc.
2. **Scenario Grid Button (`.sc-btn`)**: Các nút chọn nhanh bệnh cảnh lâm sàng. Nút được tô màu phân biệt theo chuyên khoa hoặc độ nặng (`.sc-danger`, `.sc-amber`, `.sc-teal`, `.sc-purple`). Khi chọn, nút nhận class `.active`.
3. **Ý lệnh Phác đồ dạng Thẻ (`.fluid-card`)**: Hiển thị kết quả tính toán chi tiết theo từng loại dịch. Các cấp độ màu thẻ bao gồm: `.fc-blue` (tinh thể), `.fc-green` (duy trì), `.fc-red` (cấp cứu), `.fc-amber` (thận trọng).
4. **Hiển thị Tốc độ Truyền lớn (`.rate-display`)**: Khối hiển thị kết quả chính với con số cực lớn (`.rate-val`) và đơn vị (`.rate-unit`).
5. **Hộp cảnh báo an toàn (`.ab`)**: Banner cảnh báo nguy cơ với các lớp `.ab-danger`, `.ab-warn`, `.ab-info`, `.ab-ok`.

### Boilerplate HTML - Style 1

```html
<!DOCTYPE html>
<html lang="vi" data-theme="light">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>[Tên công cụ] – CliniPortal</title>
  
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300..700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="../../../css/reset.css">
  <link rel="stylesheet" href="../../../css/main.css">
  <link rel="stylesheet" href="../../../css/components/header.css">
  <link rel="stylesheet" href="../../../css/components/sidebar.css">
  <link rel="stylesheet" href="../../../css/components/footer.css">
  <script src="../../../components/header.js"></script>

  <style>
    /* Design Tokens cho phong cách Bù dịch */
    :root {
      --bd-blue: #0284c7; --bd-blue-h: #f0f9ff; --bd-blue-b: #bae6fd;
      --bd-red: #dc2626; --bd-red-h: #fef2f2; --bd-red-b: #fecaca;
      --bd-amber: #d97706; --bd-amber-h: #fffbeb; --bd-amber-b: #fde68a;
      --bd-green: #16a34a; --bd-green-h: #f0fdf4; --bd-green-b: #bbf7d0;
    }
    [data-theme="dark"] {
      --bd-blue: #38bdf8; --bd-blue-h: #0a2236; --bd-blue-b: #0c4a6e;
      --bd-red: #f87171; --bd-red-h: #1f0808; --bd-red-b: #7f1d1d;
      --bd-amber: #fbbf24; --bd-amber-h: #1f1500; --bd-amber-b: #78350f;
      --bd-green: #4ade80; --bd-green-h: #052e16; --bd-green-b: #14532d;
    }

    .hero-bd {
      background: linear-gradient(135deg, #0c4a6e, #0284c7 55%, #0891b2);
      border-radius: 18px; padding: 24px 28px; margin-bottom: 20px; color: #fff;
    }
    .hero-bd h1 { font-size: 22px; font-weight: 700; margin: 0 0 5px; }
    .hero-bd p { font-size: 13px; opacity: .82; margin: 0; }

    .scenario-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 10px; margin-bottom: 20px; }
    .sc-btn {
      border: 2px solid var(--color-divider); border-radius: 14px; padding: 14px;
      cursor: pointer; background: var(--color-surface); color: var(--color-text); transition: all .2s;
    }
    .sc-btn:hover { border-color: var(--bd-blue); background: var(--bd-blue-h); transform: translateY(-2px); }
    .sc-btn.active { border-color: var(--bd-blue); background: var(--bd-blue); color: #fff; }

    .input-panel { background: var(--color-surface-2); border: 1.5px solid var(--color-divider); border-radius: 16px; padding: 20px; margin-bottom: 16px; }
    .input-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 12px; }
    .inp-group { display: flex; flex-direction: column; gap: 4px; }
    .inp-group label { font-size: 12px; font-weight: 600; color: var(--color-text-muted); }
    .inp-group input, .inp-group select { padding: 8px 10px; border: 1.5px solid var(--color-divider); border-radius: 9px; font-size: 13px; background: var(--color-surface); color: var(--color-text); }

    .result-panel { background: var(--color-surface); border: 1.5px solid var(--color-divider); border-radius: 16px; padding: 20px; margin-bottom: 16px; box-shadow: var(--shadow-md); }
    .fluid-card { border-radius: 12px; padding: 14px 16px; margin-bottom: 10px; border: 1.5px solid; }
    .fc-blue { background: var(--bd-blue-h); border-color: var(--bd-blue-b); }
    .fc-red { background: var(--bd-red-h); border-color: var(--bd-red-b); }
    
    .rate-display { display: flex; align-items: center; justify-content: space-between; background: var(--bd-blue-h); border: 1.5px solid var(--bd-blue-b); border-radius: 12px; padding: 14px 16px; }
    .rate-val { font-size: 2.2rem; font-weight: 800; color: var(--bd-blue); }
    .rate-unit { font-size: 13px; font-weight: 600; }

    .ab { padding: 10px 14px; border-radius: 9px; margin: 8px 0; font-size: 13px; border-left: 4px solid; line-height: 1.6; }
    .ab-danger { background: var(--bd-red-h); border-color: var(--bd-red); }
  </style>
</head>
<body>
  <!-- HEADER & SIDEBAR STRUCTURE (Xem mẫu chuẩn) -->
  <div id="header-placeholder" data-header-path="../../../components/header.html"></div>
  <div class="sidebar-overlay" id="sidebarOverlay"></div>
  
  <div class="app-container">
    <aside class="app-sidebar" id="appSidebar">
      <!-- Sidebar Navigation Link -->
    </aside>

    <div class="main-wrapper" id="mainContent">
      <section class="hero-bd">
        <h1>[Công cụ Phác đồ lâm sàng]</h1>
        <p>Tính toán liều lượng và lập phác đồ tự động theo hướng dẫn hiện hành</p>
      </section>

      <!-- BƯỚC 1: CHỌN BỆNH CẢNH -->
      <div class="scenario-grid">
        <button class="sc-btn active" onclick="selectMode('A', this)">Bệnh cảnh A</button>
        <button class="sc-btn" onclick="selectMode('B', this)">Bệnh cảnh B</button>
      </div>

      <!-- BƯỚC 2: NHẬP LIỆU -->
      <div class="input-panel">
        <div class="input-grid">
          <div class="inp-group">
            <label for="weight">Cân nặng (kg)</label>
            <input type="number" id="weight" value="60" oninput="calculate()">
          </div>
        </div>
      </div>

      <!-- BƯỚC 3: KẾT QUẢ -->
      <div class="result-panel">
        <div class="rate-display">
          <div>
            <div style="font-size:12px; font-weight:700;">TỐC ĐỘ TRUYỀN Y LỆNH</div>
          </div>
          <div>
            <span class="rate-val" id="res-rate">0</span><span class="rate-unit">mL/giờ</span>
          </div>
        </div>
        
        <div class="fluid-card fc-blue" style="margin-top:1rem">
          <p id="res-detail">Nhập cân nặng để xem y lệnh chi tiết.</p>
        </div>
      </div>
    </div>
  </div>

  <script src="../../../js/sidebar.js"></script>
  <script>
    let activeMode = 'A';
    function selectMode(mode, btn) {
      activeMode = mode;
      document.querySelectorAll('.sc-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      calculate();
    }
    function calculate() {
      const w = parseFloat(document.getElementById('weight').value) || 0;
      let rate = 0;
      let desc = '';
      if (activeMode === 'A') {
        rate = w * 4;
        desc = `Lượng dịch cần bù trong 24 giờ đầu: <strong>${rate * 24} mL</strong>. Truyền tĩnh mạch liên tục.`;
      } else {
        rate = w * 2;
        desc = `Duy trì dịch truyền tĩnh mạch ở mức cơ bản: <strong>${rate * 24} mL/ngày</strong>.`;
      }
      document.getElementById('res-rate').innerText = rate;
      document.getElementById('res-detail').innerHTML = desc;
    }
    document.addEventListener('DOMContentLoaded', calculate);
  </script>
</body>
</html>
```

---

## 🔍 STYLE 2: Thang điểm Sàng lọc Đa chỉ số / Sepsis & Suy tạng (Diagnostic Screening Panels)

### Đặc điểm
Dành cho các công cụ tích hợp nhiều thang điểm đánh giá song song (như NEWS2, qSOFA, SOFA, SIRS) cùng lúc để sàng lọc mức độ nặng, chẩn đoán nguy cơ và ước tính tỷ lệ tử vong (được tham chiếu từ mẫu [SL_Nhiem-khuan.html](file:///i:/Drive%20c%E1%BB%A7a%20t%C3%B4i/apps/Apps_ykhoa/pages/C%C3%B4ng%20c%E1%BB%A5/Truy%E1%BB%81n%20Nhi%E1%BB%85m/SL_Nhiem-khuan.html)).

### Các thành phần UI cốt loi
1. **Lưới Chia Cột Đánh Giá (`.assessment-grid`)**: Sử dụng lưới 2 cột trên Desktop (`2fr 1fr`). Cột trái chứa thông số đầu vào (`.input-column`), Cột phải là bảng điểm tổng hợp bám dính (`.results-sidebar` + `.sticky-card`).
2. **Form nhập liệu thu gọn (`.form-grid-2`, `.form-grid-3`)**: Thiết kế tối ưu hóa diện tích hiển thị để bác sĩ thao tác nhanh.
3. **Danh sách Checkbox bệnh nền (`.checkbox-group`)**: Sử dụng bộ chọn `accent-color` của CliniPortal để đánh giá tiền sử bệnh.
4. **Dòng Điểm số có Huy hiệu màu (`.score-row` + `.score-badge`)**: Hiển thị điểm số với nhãn màu phản ánh mức độ nguy cơ sinh lý (`.badge-normal` - xanh lá, `.badge-mild` - vàng, `.badge-severe` - cam, `.badge-critical` - hồng đỏ).
5. **Hộp Định Vị Lâm Sàng Động (`.diagnostic-box`)**: Tự động đổi màu nền và màu viền sang trạng thái nguy hiểm (`.alert-active`) khi các chỉ số vượt ngưỡng an toàn.

### Boilerplate HTML - Style 2

```html
<!DOCTYPE html>
<html lang="vi" data-theme="light">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>[Tên bộ sàng lọc] – CliniPortal</title>
  
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300..700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="../../../css/reset.css">
  <link rel="stylesheet" href="../../../css/main.css">
  <link rel="stylesheet" href="../../../css/components/header.css">
  <link rel="stylesheet" href="../../../css/components/sidebar.css">
  <link rel="stylesheet" href="../../../css/components/footer.css">
  <script src="../../../components/header.js"></script>

  <style>
    .assessment-grid { display: grid; grid-template-columns: 1fr; gap: 1.5rem; margin-top: 1rem; }
    .input-column, .results-sidebar { display: flex; flex-direction: column; gap: 1.25rem; }
    
    .panel { background-color: var(--color-surface); border: 1px solid var(--color-divider); border-radius: var(--radius-md); padding: 1.5rem; box-shadow: var(--shadow-sm); }
    .panel-title { font-size: var(--text-md); font-weight: 700; color: var(--color-primary); margin-bottom: 1.25rem; padding-bottom: 0.5rem; border-bottom: 2px solid var(--color-divider); display: flex; align-items: center; gap: 0.5rem; }
    
    .form-grid-2 { display: grid; grid-template-columns: 1fr; gap: 1rem; }
    .input-group { display: flex; flex-direction: column; gap: 0.4rem; }
    .input-group label { font-size: var(--text-sm); font-weight: 600; }
    
    input[type="number"], select { width: 100%; padding: 0.6rem 0.75rem; border: 1px solid var(--color-border); border-radius: var(--radius-sm); background-color: var(--color-surface-offset); color: var(--color-text); }
    input[type="number"]:focus, select:focus { outline: none; border-color: var(--color-primary); box-shadow: 0 0 0 3px var(--color-primary-hl); }

    .checkbox-group { display: flex; flex-direction: column; gap: 0.6rem; margin-top: 0.5rem; }
    .checkbox-item { display: flex; align-items: flex-start; gap: 0.5rem; cursor: pointer; font-size: var(--text-sm); }
    .checkbox-item input[type="checkbox"] { margin-top: 0.2rem; width: 16px; height: 16px; accent-color: var(--color-primary); }

    .score-row { display: flex; justify-content: space-between; align-items: center; padding: 0.75rem 0; border-bottom: 1px dashed var(--color-divider); }
    .score-lbl { font-weight: 600; font-size: var(--text-sm); }
    .score-badge { font-weight: 700; font-size: var(--text-xs); padding: 0.3rem 0.8rem; border-radius: var(--radius-full); min-width: 60px; text-align: center; }
    
    .badge-normal { background-color: var(--color-success-hl); color: var(--color-success); }
    .badge-severe { background-color: var(--color-rose-hl); color: var(--color-rose); }

    .diagnostic-box { background-color: var(--color-surface-2); border-left: 4px solid var(--color-divider); padding: 1rem; border-radius: var(--radius-sm); font-size: var(--text-sm); margin-top: 0.75rem; }
    .diagnostic-box.alert-active { border-left-color: var(--color-rose); background-color: var(--color-rose-hl); }
    .diagnostic-box h4 { margin-bottom: 0.35rem; font-weight: 700; }

    .reset-btn { width: 100%; padding: 0.75rem; background-color: var(--color-surface-offset); border: 1px solid var(--color-border); border-radius: var(--radius-sm); font-weight: 700; cursor: pointer; margin-top: 0.75rem; }
    .reset-btn:hover { background-color: var(--color-divider); border-color: var(--color-primary); }

    @media (min-width: 768px) {
      .assessment-grid { grid-template-columns: 2fr 1fr; }
      .form-grid-2 { grid-template-columns: repeat(2, 1fr); }
      .sticky-card { position: sticky; top: calc(var(--header-height) + 1.25rem); }
    }
  </style>
</head>
<body>
  <div id="header-placeholder" data-header-path="../../../components/header.html"></div>
  <div class="sidebar-overlay" id="sidebarOverlay"></div>

  <div class="app-container">
    <aside class="app-sidebar" id="appSidebar">
      <!-- Sidebar Navigation Link -->
    </aside>

    <div class="main-wrapper">
      <!-- BREADCRUMB -->
      <nav aria-label="Breadcrumb" class="breadcrumb-container">
        <!-- Breadcrumb code -->
      </nav>

      <div class="assessment-grid">
        <!-- CỘT TRÁI: NHẬP THÔNG SỐ -->
        <div class="input-column">
          <div class="panel">
            <div class="panel-title"><span>📝 Thông số lâm sàng</span></div>
            <div class="form-grid-2">
              <div class="input-group">
                <label for="sbp">Huyết áp tâm thu (mmHg)</label>
                <input type="number" id="sbp" value="120" oninput="runScreening()">
              </div>
              <div class="input-group">
                <label for="gcs">Mức độ tri giác</label>
                <select id="gcs" onchange="runScreening()">
                  <option value="15">Tỉnh táo (GCS 15)</option>
                  <option value="13">Lơ mơ / Lú lẫn (GCS &lt; 15)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <!-- CỘT PHẢI: BẢNG ĐIỂM DOCKING BÁM DÍNH -->
        <div class="results-sidebar">
          <div class="panel sticky-card">
            <div class="panel-title">📊 Kết quả đánh giá</div>
            <div class="score-row">
              <span class="score-lbl">Tổng điểm</span>
              <span id="total-score" class="score-badge badge-normal">0</span>
            </div>
            
            <div id="diag-alert" class="diagnostic-box">
              <h4>Định vị lâm sàng:</h4>
              <p id="diag-text">Các chỉ số sinh lý trong giới hạn bình thường.</p>
            </div>
            <button type="button" class="reset-btn" onclick="resetForm()">🔄 Reset Form</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <script src="../../../js/sidebar.js"></script>
  <script>
    function runScreening() {
      const sbp = parseFloat(document.getElementById('sbp').value) || 0;
      const gcs = parseInt(document.getElementById('gcs').value) || 15;
      
      let score = 0;
      if (sbp < 100) score += 1;
      if (gcs < 15) score += 1;

      const badge = document.getElementById('total-score');
      badge.innerText = score;

      const alertBox = document.getElementById('diag-alert');
      const text = document.getElementById('diag-text');

      if (score >= 1) {
        badge.className = "score-badge badge-severe";
        alertBox.classList.add('alert-active');
        text.innerText = "Cảnh báo: Bệnh nhân có nguy cơ diễn tiến nặng. Đề nghị theo dõi sát sinh hiệu.";
      } else {
        badge.className = "score-badge badge-normal";
        alertBox.classList.remove('alert-active');
        text.innerText = "Các chỉ số sinh lý trong giới hạn bình thường.";
      }
    }
    function resetForm() {
      document.getElementById('sbp').value = 120;
      document.getElementById('gcs').value = 15;
      runScreening();
    }
    document.addEventListener('DOMContentLoaded', runScreening);
  </script>
</body>
</html>
```
