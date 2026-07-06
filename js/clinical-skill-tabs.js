document.addEventListener('DOMContentLoaded', () => {
  // Tab switcher logic
  document.querySelectorAll('.tab-btn').forEach((button) => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn, .tab').forEach((element) => {
        element.classList.remove('active');
      });

      button.classList.add('active');

      const target = document.getElementById(button.dataset.tab);
      if (target) {
        target.classList.add('active');
      }
    });
  });

  // Checklist interactive toggle logic (Shared across all skill pages)
  document.querySelectorAll('.check li').forEach((item) => {
    const checkbox = item.querySelector('input[type="checkbox"]');
    if (checkbox) {
      item.addEventListener('click', (e) => {
        // Prevent toggle if clicking on interactive elements like links or directly on input
        if (e.target !== checkbox && e.target.tagName !== 'A' && e.target.tagName !== 'BUTTON') {
          checkbox.checked = !checkbox.checked;
          checkbox.dispatchEvent(new Event('change'));
        }
      });

      checkbox.addEventListener('change', () => {
        item.classList.toggle('checked', checkbox.checked);
      });

      // Synchronize initial class on load if already checked
      if (checkbox.checked) {
        item.classList.add('checked');
      }
    }
  });
});
