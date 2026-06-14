document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const appSidebar = document.getElementById('appSidebar');

    // 1. XỬ LÝ DARK MODE
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.removeAttribute('data-theme');
    }

    // Sự kiện Click chuyển đổi giao diện Sáng/Tối
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            
            if (isDark) {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    // 2. XỬ LÝ MENU SIDEBAR TRÊN MOBILE
    if (mobileMenuBtn && appSidebar) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            appSidebar.classList.toggle('active');
        });

        // Click ra ngoài vùng sidebar sẽ tự động đóng menu
        document.addEventListener('click', (e) => {
            if (!appSidebar.contains(e.target) && e.target !== mobileMenuBtn) {
                appSidebar.classList.remove('active');
            }
        });
    }
});