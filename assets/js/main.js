/**
 * Podcast DrDong - Clinical Assistant Hub
 * Main JavaScript Module
 * Version: 2.0.0
 * Description: Common utilities for all medical tools
 */

/**
 * Ensure a consistent light-only UI across all pages.
 */
function initLightTheme() {
    document.documentElement.removeAttribute('data-theme');
    updateMetaThemeColor();
}

/**
 * Update meta theme-color for mobile browsers.
 */
function updateMetaThemeColor() {
    const themeColor = '#1e40af';
    
    // Update existing meta tag or create new one
    let metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
        metaThemeColor.setAttribute('content', themeColor);
    } else {
        metaThemeColor = document.createElement('meta');
        metaThemeColor.setAttribute('name', 'theme-color');
        metaThemeColor.setAttribute('content', themeColor);
        document.head.appendChild(metaThemeColor);
    }
}

// ====== INPUT FOCUS MANAGEMENT ======

/**
 * Auto-focus on first input field when page loads
 * Improves user experience for medical data entry
 */
function autoFocusFirstInput() {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', autoFocusFirstInput);
        return;
    }
    
    // Find the first focusable input element
    const focusableSelectors = [
        'input[type="number"]',
        'input[type="text"]',
        'input[type="search"]',
        'input[type="email"]',
        'input[type="tel"]',
        'select',
        'textarea'
    ];
    
    let firstInput = null;
    
    // Try each selector in order of priority
    for (const selector of focusableSelectors) {
        const elements = document.querySelectorAll(selector);
        for (const element of elements) {
            // Skip hidden, disabled, or readonly elements
            if (element.offsetParent !== null && 
                !element.disabled && 
                !element.readOnly &&
                element.tabIndex >= 0) {
                firstInput = element;
                break;
            }
        }
        if (firstInput) break;
    }
    
    // Focus the first input found
    if (firstInput) {
        // Small delay to ensure smooth focus
        setTimeout(() => {
            firstInput.focus();
            
            // Add visual feedback for better UX
            firstInput.style.outline = '2px solid var(--medical-blue-500)';
            firstInput.style.outlineOffset = '2px';
            
            // Remove outline after user interaction
            const removeOutline = () => {
                firstInput.style.outline = '';
                firstInput.style.outlineOffset = '';
                firstInput.removeEventListener('blur', removeOutline);
                firstInput.removeEventListener('input', removeOutline);
            };
            
            firstInput.addEventListener('blur', removeOutline);
            firstInput.addEventListener('input', removeOutline);
        }, 100);
    }
}

/**
 * Enhanced focus management for medical forms
 * Adds smart navigation between fields
 */
function enhanceFormNavigation() {
    // Add Enter key navigation between inputs
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && e.target.tagName === 'INPUT') {
            const form = e.target.form;
            if (form) {
                const inputs = Array.from(form.querySelectorAll('input, select, textarea'));
                const currentIndex = inputs.indexOf(e.target);
                
                if (currentIndex < inputs.length - 1) {
                    e.preventDefault();
                    inputs[currentIndex + 1].focus();
                }
            }
        }
    });
}

// ====== UTILITY FUNCTIONS ======

/**
 * Debounce function for performance optimization
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} - Debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Check if device is mobile
 * @returns {boolean} - True if mobile device
 */
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
           window.innerWidth <= 768;
}

/**
 * Smooth scroll to element
 * @param {string} selector - CSS selector of target element
 * @param {number} offset - Offset from top in pixels
 */
function smoothScrollTo(selector, offset = 0) {
    const element = document.querySelector(selector);
    if (element) {
        const top = element.offsetTop - offset;
        window.scrollTo({
            top: top,
            behavior: 'smooth'
        });
    }
}

function initAppShell() {
    const body = document.body;
    if (!body || body.dataset.appShell !== 'subpage') {
        return;
    }

    body.classList.add('app-shell');

    if (document.querySelector('.shell-topbar')) {
        return;
    }

    const pageTitle = (document.title || 'Clinical Assistant Hub')
        .replace(/\s*\|.*$/, '')
        .trim();

    const topbar = document.createElement('div');
    topbar.className = 'shell-topbar';
    topbar.innerHTML = `
        <div class="shell-topbar-inner">
            <div class="shell-title-group">
                <div class="shell-kicker">
                    <span class="shell-kicker-dot"></span>
                    <span>Podcast DrDong</span>
                </div>
                <h1 class="shell-page-title">${pageTitle}</h1>
                <div class="shell-page-subtitle">Clinical Assistant Hub</div>
            </div>
            <div class="shell-actions">
                <a href="../index.html" class="shell-home-btn back-home-btn">
                    <span>🏠</span>
                    <span>Về trang chủ</span>
                </a>
            </div>
        </div>
    `;

    body.insertBefore(topbar, body.firstChild);

    document.querySelectorAll('.back-home-btn, .theme-toggle, [data-theme-toggle]').forEach((element) => {
        if (!topbar.contains(element)) {
            element.style.display = 'none';
        }
    });
}

// ====== INITIALIZATION ======

/**
 * Initialize all main.js features
 */
function initMainJS() {
    // Add shared shell for subpages
    initAppShell();

    // Force light theme
    initLightTheme();
    
    // Auto-focus first input
    autoFocusFirstInput();
    
    // Enhance form navigation
    enhanceFormNavigation();
    
    // Add mobile-specific optimizations
    if (isMobileDevice()) {
        document.body.classList.add('mobile-device');
    }
    
    // Log initialization (for debugging)
    console.log('Podcast DrDong - Main.js initialized successfully');
}

// ====== GLOBAL FUNCTIONS FOR HTML FILES ======

// Make functions globally available for HTML onclick handlers
window.autoFocusFirstInput = autoFocusFirstInput;
window.smoothScrollTo = smoothScrollTo;

// ====== AUTO-INITIALIZATION ======

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMainJS);
} else {
    // DOM already loaded
    initMainJS();
}

// Export for module usage (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initLightTheme,
        autoFocusFirstInput,
        isMobileDevice,
        smoothScrollTo
    };
}
