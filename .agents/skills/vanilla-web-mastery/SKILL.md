---
name: vanilla-web-mastery
description: Kỹ năng chuyên sâu về tối ưu Vanilla HTML5/CSS3/JavaScript (ES6+), quản lý DOM thuần không framework, tối ưu hiệu năng và đường dẫn tương đối chuẩn xác cho CliniPortal.
---

# Vanilla Web Mastery — CliniPortal

Tài liệu này hướng dẫn các nguyên tắc và kỹ thuật viết code Pure HTML/CSS/JS cho hệ sinh thái CliniPortal mà không sử dụng bất kỳ JS Framework (React, Vue, jQuery) hay CSS Framework (Tailwind, Bootstrap) nào.

---

## 🛑 Nguyên tắc Cốt lõi

1. **Pure ES6+ JavaScript**:
   - Sử dụng `document.querySelector`, `querySelectorAll`, `addEventListener`, `fetch`, Async/Await, ES Modules hoặc IIFE.
   - Không import các thư viện JS bên ngoài trừ Google Fonts & FontAwesome.

2. **Quản lý DOM Thuần & Hiệu năng**:
   - Sử dụng `DocumentFragment` hoặc `innerHTML` tập trung khi render danh sách lớn để tránh reflow nhiều lần.
   - Dùng Event Delegation trên các container lớn thay vì gán `addEventListener` cho hàng trăm item riêng lẻ.
   - Tránh Memory Leak: Luôn `removeEventListener` hoặc `abortController` khi khởi tạo lại dynamic UI.

3. **Tính chính xác của Đường dẫn Tương đối**:
   - Luôn đếm cấp thư mục trước khi viết link asset hoặc script:
     - Root `index.html`: `./`
     - Cấp 1 (`pages/Module/`): `../`
     - Cấp 2 (`pages/Module/Sub/`): `../../`
     - Cấp 3 (`pages/Module/Sub/Sub2/`): `../../../`
     - Cấp 4 (`pages/Sinh lý.../Sinhly/PhanX/`): `../../../../`

---

## 💡 Ví dụ Pattern Chuẩn

### 1. Render Danh sách Tương tác Tối ưu DOM
```javascript
// Render nhiều cards bằng DocumentFragment
function renderClinicalCards(containerEl, items) {
  const fragment = document.createDocumentFragment();
  
  items.forEach(item => {
    const card = document.createElement('div');
    card.className = 'clinical-card';
    card.dataset.id = item.id;
    card.innerHTML = `
      <h3 class="card-title">${escapeHtml(item.title)}</h3>
      <p class="card-desc">${escapeHtml(item.description)}</p>
    `;
    fragment.appendChild(card);
  });

  containerEl.replaceChildren(fragment);
}
```

### 2. Event Delegation Chuẩn
```javascript
// Lắng nghe sự kiện click trên container thay vì từng nút
document.querySelector('.tools-grid')?.addEventListener('click', (e) => {
  const cardBtn = e.target.closest('[data-action]');
  if (!cardBtn) return;

  const action = cardBtn.dataset.action;
  if (action === 'calculate') {
    handleCalculation(cardBtn.dataset.id);
  }
});
```
