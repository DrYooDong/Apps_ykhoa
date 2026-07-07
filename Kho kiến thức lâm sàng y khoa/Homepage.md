---
cssclasses: dashboard
---

```dataviewjs
// 1. ĐỒNG HỒ SỐ THỜI GIAN THỰC (DIGITAL CLOCK)
const clockDiv = dv.el("div", "", { attr: { style: "font-size: 3.5em; font-weight: bold; text-align: center; margin-top: 20px; margin-bottom: 2px; font-family: var(--font-interface);" } });
const dateDiv = dv.el("div", "", { attr: { style: "font-size: 1.1em; color: var(--text-muted); text-align: center; margin-bottom: 40px; text-transform: capitalize;" } });

function updateClock() {
    const now = new Date();
    clockDiv.innerText = now.toLocaleTimeString('vi-VN', { hour12: false });
    dateDiv.innerText = now.toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'numeric', year: 'numeric' }).replace(/\//g, ' tháng ');
}
setInterval(updateClock, 1000);
updateClock();