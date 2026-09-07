/**
 * DocSpace — Studios Shared Utilities & Action Bindings
 * Hỗ trợ các nút thao tác chung: Chèn vào SOAP, Sao chép EMR, In ấn
 */

export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function bindActionBtns(container: HTMLElement): void {
  // 1. Chèn vào Sổ Tay Bệnh Án (SOAP)
  container.querySelectorAll('.js-apply-studio-soap').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const text = (e.currentTarget as HTMLElement).getAttribute('data-text') || '';
      sessionStorage.setItem('dsp_pending_soap_plan', text);
      alert('✅ Đã nạp kết quả Studio vào bộ nhớ đệm SOAP! Đang chuyển đến Sổ Tay Bệnh Án...');
      window.location.hash = '#/docspace/soap';
    });
  });

  // 2. Sao chép kết quả vào Clipboard
  container.querySelectorAll('.js-copy-studio-text').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const text = (e.currentTarget as HTMLElement).getAttribute('data-text') || '';
      navigator.clipboard.writeText(text).then(() => {
        const el = e.currentTarget as HTMLElement;
        el.innerHTML = '<i class="fa-solid fa-check"></i> Đã sao chép';
        setTimeout(() => { el.innerHTML = '<i class="fa-regular fa-copy"></i> Sao chép'; }, 1500);
      });
    });
  });
}
