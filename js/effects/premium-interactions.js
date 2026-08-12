/**
 * Premium Interactions for CliniPortal $2000 Upgrade
 * Includes: 3D Perspective Tilt on Bento Cards & Magnetic Hover on Buttons/Dock
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. 3D Perspective Tilt for Hero and Pearls
    const tiltElements = document.querySelectorAll('.bento-hero, .bento-pearl');
    
    tiltElements.forEach(el => {
        el.addEventListener('mousemove', handleTilt);
        el.addEventListener('mouseleave', resetTilt);
    });

    function handleTilt(e) {
        const el = e.currentTarget;
        const rect = el.getBoundingClientRect();
        
        // Calculate mouse position relative to center of element (-1 to 1)
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        
        const multiplier = 10; // Max rotation in degrees
        
        const rotateX = (0.5 - y) * multiplier;
        const rotateY = (x - 0.5) * multiplier;
        
        el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    }

    function resetTilt(e) {
        const el = e.currentTarget;
        el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    }

    // 2. Magnetic Hover Effect for Buttons and Dock Items
    const magneticElements = document.querySelectorAll('.dock-item, .bento-module, .btn-flashcard-flip, .btn-pearl-done, .social-link, .header-module-btn, .header-settings-btn, .btn-back');

    magneticElements.forEach(el => {
        el.addEventListener('mousemove', handleMagnetic);
        el.addEventListener('mouseleave', resetMagnetic);
    });

    function handleMagnetic(e) {
        const el = e.currentTarget;
        const rect = el.getBoundingClientRect();
        
        // Calculate mouse pull
        const x = (e.clientX - rect.left) - rect.width / 2;
        const y = (e.clientY - rect.top) - rect.height / 2;
        
        const strength = 0.3; // How much it pulls towards mouse
        
        // Exclude scaling for dock-items because they have their own hover scale
        if (!el.classList.contains('dock-item')) {
            el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
        }
    }

    function resetMagnetic(e) {
        const el = e.currentTarget;
        if (!el.classList.contains('dock-item')) {
            el.style.transform = 'translate(0px, 0px)';
        }
    }
});
