/**
 * CliniPortal — Traditional Chinese Medicine Hub TypeScript Renderer & Controller
 */
import { HERBS_DATA, MERIDIANS_CLOCK_DATA } from './data';

export function initTcmCategoriesFilter(): void {
  const filterBtns = document.querySelectorAll('.tcm-filter-btn');
  const categoryGroups = document.querySelectorAll('.tcm-category-group');
  const searchInput = document.getElementById('lesson-search') as HTMLInputElement | null;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      categoryGroups.forEach(group => {
        if (filterValue === 'all' || group.getAttribute('data-category') === filterValue) {
          (group as HTMLElement).style.display = 'block';
        } else {
          (group as HTMLElement).style.display = 'none';
        }
      });
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = (e.target as HTMLInputElement).value.toLowerCase().trim();
      const itemCards = document.querySelectorAll('.tcm-item-card');

      itemCards.forEach(card => {
        const title = card.querySelector('.tcm-card-title')?.textContent?.toLowerCase() || '';
        const desc = card.querySelector('.tcm-card-desc')?.textContent?.toLowerCase() || '';

        if (title.includes(query) || desc.includes(query)) {
          (card as HTMLElement).style.display = 'flex';
        } else {
          (card as HTMLElement).style.display = 'none';
        }
      });
    });
  }
}

export function initHerbSpotlight(): void {
  const herbTabs = document.querySelectorAll('#herbTabs .herb-tab-btn');
  const herbContentPanel = document.getElementById('herbContentPanel');
  if (!herbContentPanel) return;

  function renderHerb(key: string) {
    const data = HERBS_DATA[key];
    if (!data || !herbContentPanel) return;

    herbContentPanel.innerHTML = `
      <div class="herb-avatar">${data.icon}</div>
      <div class="herb-details">
        <h4 style="margin:0;font-size:var(--text-base);font-weight:700;color:var(--color-text);">
          ${data.name} <span class="herb-name-latin">${data.latin} (${data.pinyin})</span>
        </h4>
        <div class="herb-meta-grid">
          <div class="herb-meta-item"><strong>Tính vị:</strong> ${data.taste}</div>
          <div class="herb-meta-item"><strong>Quy kinh:</strong> ${data.meridians}</div>
        </div>
        <div class="herb-meta-item" style="margin-bottom:0.25rem;">
          <strong>Công năng:</strong> ${data.actions}
        </div>
        <div class="herb-meta-item" style="margin-bottom:0.25rem;">
          <strong>Chủ trị:</strong> ${data.indications}
        </div>
        <div class="herb-meta-item" style="font-size:var(--text-xs);color:var(--color-warning);">
          <strong>Cấm kỵ / Lưu ý:</strong> ${data.contra}
        </div>
      </div>
    `;
  }

  renderHerb('nhansam');

  herbTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      herbTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const herbKey = tab.getAttribute('data-herb');
      if (herbKey) renderHerb(herbKey);
    });
  });
}

export function initMeridianClock(): void {
  const wheelEl = document.getElementById('meridianWheel');
  const centerMeridianName = document.getElementById('centerMeridianName');
  const centerMeridianTime = document.getElementById('centerMeridianTime');
  const meridianDetailsCard = document.getElementById('meridianDetailsCard');
  const clockCurrentTime = document.getElementById('clockCurrentTime');
  const centerStatus = document.getElementById('centerStatus');

  if (!wheelEl || !centerMeridianName || !centerMeridianTime || !meridianDetailsCard || !clockCurrentTime || !centerStatus) return;

  let activeIndex = -1;
  let userSelected = false;

  function renderWheelMarkers() {
    const radius = 86;
    const center = 120;

    MERIDIANS_CLOCK_DATA.forEach((data, index) => {
      const marker = document.createElement('div');
      marker.className = 'meridian-marker';
      marker.id = `marker-${index}`;
      marker.innerText = data.zodiac;
      marker.title = `${data.zodiac} (${data.timeStr}) - ${data.name}`;

      const angle = 90 + (index * 30);
      const rad = (angle * Math.PI) / 180;

      const x = center + radius * Math.cos(rad) - 16;
      const y = center + radius * Math.sin(rad) - 16;

      marker.style.left = `${x}px`;
      marker.style.top = `${y}px`;

      marker.addEventListener('click', () => {
        userSelected = true;
        centerStatus!.innerText = 'Tra cứu';
        centerStatus!.style.color = 'var(--color-tcm-gold)';
        highlightMeridian(index);
      });

      wheelEl!.appendChild(marker);
    });
  }

  function highlightMeridian(index: number) {
    document.querySelectorAll('.meridian-marker').forEach(m => m.classList.remove('active'));

    const activeMarker = document.getElementById(`marker-${index}`);
    if (activeMarker) activeMarker.classList.add('active');

    const data = MERIDIANS_CLOCK_DATA[index];
    if (!data) return;

    activeIndex = index;
    centerMeridianName!.innerText = data.name;
    centerMeridianTime!.innerText = data.timeStr;

    meridianDetailsCard!.innerHTML = `
      <div class="meridian-details-header">
        <h4>
          <span style="font-size:1.2rem;">☯️</span> 
          <span>${data.fullName} (${data.zodiac} Giờ)</span>
        </h4>
        <span class="element-badge ${data.elClass}">Ngũ hành: ${data.element}</span>
      </div>
      <div class="meridian-detail-row">
        <strong>Giờ hoạt động:</strong> <span>${data.timeStr}</span>
      </div>
      <div class="meridian-detail-row">
        <strong>Cơ chế sinh học:</strong>
        <p class="meridian-detail-desc">${data.desc}</p>
      </div>
      <div class="meridian-detail-row" style="margin-bottom:0; border-top: 1px dashed var(--color-divider); padding-top: 0.5rem; margin-top: 0.5rem;">
        <strong>Khuyên dùng Dưỡng sinh:</strong>
        <p class="meridian-detail-desc" style="color:var(--color-tcm-green);font-weight:500;">💡 ${data.advice}</p>
      </div>
    `;
  }

  function checkSystemTime() {
    const now = new Date();
    const hrs = now.getHours();
    const mins = now.getMinutes().toString().padStart(2, '0');
    const secs = now.getSeconds().toString().padStart(2, '0');

    clockCurrentTime!.innerText = `Giờ hệ thống: ${hrs.toString().padStart(2, '0')}:${mins}:${secs}`;

    if (userSelected) return;

    let activeIdx = 0;
    for (let i = 0; i < MERIDIANS_CLOCK_DATA.length; i++) {
      const item = MERIDIANS_CLOCK_DATA[i]!;
      if (item.startHour === 23) {
        if (hrs >= 23 || hrs < 1) {
          activeIdx = i;
          break;
        }
      } else {
        if (hrs >= item.startHour && hrs < item.endHour) {
          activeIdx = i;
          break;
        }
      }
    }

    if (activeIdx !== activeIndex) {
      centerStatus!.innerText = 'Đang chạy';
      centerStatus!.style.color = 'var(--color-text-faint)';
      highlightMeridian(activeIdx);
    }
  }

  renderWheelMarkers();
  checkSystemTime();
  setInterval(checkSystemTime, 1000);

  const centerBtn = document.getElementById('meridianCenter');
  if (centerBtn) {
    centerBtn.style.cursor = 'pointer';
    centerBtn.title = 'Click đúp để quay lại giờ tự động';
    centerBtn.addEventListener('dblclick', () => {
      userSelected = false;
      activeIndex = -1;
      centerStatus!.innerText = 'Đang chạy';
      centerStatus!.style.color = 'var(--color-text-faint)';
      checkSystemTime();
    });
  }
}

export function initTcmHub(): void {
  initTcmCategoriesFilter();
  initHerbSpotlight();
  initMeridianClock();
}
