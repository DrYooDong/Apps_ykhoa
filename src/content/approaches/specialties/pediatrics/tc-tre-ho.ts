/**
 * CliniPortal — Tiếp Cận Ho Ở Trẻ Em & CDSS Pediatric Cough (TypeScript Module)
 */

export function scrollToSection(id: string): void {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
    document.querySelectorAll('.quick-nav-btn').forEach(btn => btn.classList.remove('active'));
    const activeBtn = Array.from(document.querySelectorAll('.quick-nav-btn')).find(b => (b as HTMLElement).getAttribute('onclick')?.includes(id) || (b as HTMLElement).dataset.section === id);
    if (activeBtn) activeBtn.classList.add('active');
  }
}

export function runCoughCdss(): void {
  const durationEl = document.getElementById('simCoughDuration') as HTMLSelectElement | null;
  const soundEl = document.getElementById('simCoughSound') as HTMLSelectElement | null;
  const sudden = (document.getElementById('chkSuddenOnset') as HTMLInputElement)?.checked || false;
  const fever = (document.getElementById('chkFever') as HTMLInputElement)?.checked || false;
  const lungAbnormal = (document.getElementById('chkLungAbnormal') as HTMLInputElement)?.checked || false;
  const nightCough = (document.getElementById('chkNightCough') as HTMLInputElement)?.checked || false;

  const statusEl = document.getElementById('simCoughStatus');
  const detailsEl = document.getElementById('simCoughDetails');

  if (!durationEl || !soundEl || !statusEl || !detailsEl) return;

  const duration = durationEl.value;
  const sound = soundEl.value;

  // 1. Sudden Onset Foreign Body
  if (sudden) {
    statusEl.className = 'sim-result-status red';
    statusEl.innerHTML = '🔴 NGUY CƠ DỊ VẬT ĐƯỜNG THỞ / HÍT SẶC CẤP TÍNH';
    detailsEl.innerHTML = `
      Khởi phát ho đột ngột sau khi ăn/chơi.<br>
      👉 <strong>Xử trí:</strong> Cho trẻ nhập viện ngay. Không can thiệp làm trẻ khóc hoảng. Hội chẩn Tai Mũi Họng / Hô hấp để <strong>Nội soi phế quản gắp dị vật</strong>.
    `;
    return;
  }

  // 2. Barking Cough (Croup)
  if (sound === 'barking') {
    statusEl.className = 'sim-result-status yellow';
    statusEl.innerHTML = '🟡 HƯỚNG CHẨN ĐOÁN: VIÊM THANH KHÍ QUẢN CẤP (CROUP)';
    detailsEl.innerHTML = `
      Tiếng ho "ông ổng" sủa chó đặc trưng do phù nề hạ thanh môn.<br>
      👉 <strong>Xử trí:</strong> Đánh giá độ nặng bằng thang điểm Westley. Sử dụng Dexamethasone uống/tiêm và Adrenaline khí dung nếu có thở rít khi nằm yên.
    `;
    return;
  }

  // 3. Whooping Cough (Pertussis)
  if (sound === 'whooping') {
    statusEl.className = 'sim-result-status yellow';
    statusEl.innerHTML = '🟡 NGHI NGỜ BỆNH HO GÀ (PERTUSSIS)';
    detailsEl.innerHTML = `
      Cơn ho kịch phát dài đỏ mặt kết thúc bằng tiếng thở rít ngút vào.<br>
      👉 <strong>Xử trí:</strong> Làm công thức máu (tìm bạch cầu Lympho tăng cao), xét nghiệm PCR/Huyết thanh ho gà. Cách ly và điều trị kháng sinh Macrolide (Azithromycin).
    `;
    return;
  }

  // 4. Honking Cough (Psychogenic)
  if (sound === 'honking') {
    statusEl.className = 'sim-result-status green';
    statusEl.innerHTML = '🟢 HƯỚNG CHẨN ĐOÁN: HO TÂM LÝ (HABIT / PSYCHOGENIC COUGH)';
    detailsEl.innerHTML = `
      Ho tiếng ngỗng kêu đặc trưng, ho nhiều khi chú ý nhưng biến mất hoàn toàn khi trẻ tập trung chơi hoặc ngủ.<br>
      👉 <strong>Xử trí:</strong> Trấn an gia đình, giải thích cơ chế tâm lý, tư vấn tâm lý hành vi.
    `;
    return;
  }

  // 5. Chronic Cough Branch
  if (duration === 'chronic') {
    if (nightCough) {
      statusEl.className = 'sim-result-status yellow';
      statusEl.innerHTML = '🟡 HO MẠN TÍNH - NGHI NGỜ HEN PHẾ QUẢN / GERD';
      detailsEl.innerHTML = `
        Ho mạn tính &gt; 4 tuần, ho tăng về đêm gần sáng hoặc sau vận động.<br>
        👉 <strong>Xử trí:</strong> Làm Chức năng hô hấp (CNHH) cho trẻ &ge; 6 tuổi, chụp X-quang ngực thẳng, làm test dị ứng hoặc thăm dò GERD (đo pH 24h).
      `;
    } else {
      statusEl.className = 'sim-result-status yellow';
      statusEl.innerHTML = '🟡 HO MẠN TÍNH - TẦM SOÁT BỆNH LÝ HÔ HẤP MẠN TÍNH';
      detailsEl.innerHTML = `
        Ho kéo dài &gt; 4 tuần.<br>
        👉 <strong>Xử trí:</strong> Chụp X-quang ngực thẳng. Loại trừ Nhiễm Lao (IDR/Mantoux), Hội chứng chảy mũi sau (khám TMH), Xơ nang hoặc Bất thường cấu trúc bẩm sinh.
      `;
    }
    return;
  }

  // 6. Acute Cough Branch
  if (fever) {
    if (lungAbnormal) {
      statusEl.className = 'sim-result-status red';
      statusEl.innerHTML = '🔴 HO CẤP TÍNH CÓ SỐT - HƯỚNG CHẨN ĐOÁN: VIÊM PHỔI';
      detailsEl.innerHTML = `
        Ho cấp tính kèm sốt và khám phổi bất thường (rale ẩm/nổ hoặc phế âm giảm).<br>
        👉 <strong>Xử trí:</strong> Chỉ định X-quang ngực thẳng. Đánh giá nhịp thở theo tuổi để phân loại Viêm phổi nhẹ (điều trị kháng sinh ngoại trú) hay Viêm phổi nặng (nhập viện).
      `;
    } else {
      statusEl.className = 'sim-result-status green';
      statusEl.innerHTML = '🟢 VIÊM ĐƯỜNG HÔ HẤP TRÊN CẤP TÍNH (VIÊM MŨI HỌNG)';
      detailsEl.innerHTML = `
        Ho cấp tính có sốt, khám phổi bình thường.<br>
        👉 <strong>Xử trí:</strong> Điều trị triệu chứng (hạ sốt, giảm ho an toàn), giữ ấm họng, bù nước. Tái khám sau 48h hoặc khi thở nhanh.
      `;
    }
  } else {
    if (nightCough) {
      statusEl.className = 'sim-result-status green';
      statusEl.innerHTML = '🟢 HO CẤP TÍNH - HƯỚNG CHẨN ĐOÁN: CƠN HEN PHẾ QUẢN';
      detailsEl.innerHTML = `
        Ho cấp tính không sốt, tăng về đêm / sau gắng sức.<br>
        👉 <strong>Xử trí:</strong> Làm Test dãn phế quản (Salbutamol khí dung). Nếu đáp ứng tốt → Khởi đầu điều trị cơn hen phế quản cấp.
      `;
    } else {
      statusEl.className = 'sim-result-status green';
      statusEl.innerHTML = '🟢 HO CẤP TÍNH DO KÍCH THÍCH / KÍCH ỨNG DỊ NGUYÊN';
      detailsEl.innerHTML = `
        Ho nhẹ không sốt, khám phổi bình thường.<br>
        👉 <strong>Xử trí:</strong> Khuyên gia đình tránh khói thuốc lá, ẩm mốc, giữ môi trường sạch sẽ.
      `;
    }
  }
}

if (typeof window !== 'undefined') {
  (window as any).scrollToSection = scrollToSection;
  (window as any).runCoughCdss = runCoughCdss;
}

export function initPediatricCough(): void {
  const inputs = ['simCoughDuration', 'simCoughSound', 'chkSuddenOnset', 'chkFever', 'chkLungAbnormal', 'chkNightCough'];
  inputs.forEach(id => {
    document.getElementById(id)?.addEventListener('change', runCoughCdss);
  });
  runCoughCdss();
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPediatricCough);
  } else {
    initPediatricCough();
  }
}
