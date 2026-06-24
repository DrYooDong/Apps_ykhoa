document.addEventListener('DOMContentLoaded', () => {
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
});
