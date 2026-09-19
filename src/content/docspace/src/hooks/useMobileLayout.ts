import { useState, useEffect } from 'react';

export interface MobileLayoutState {
  isMobile: boolean;      // < 768px
  isTablet: boolean;      // 768px - 1023px
  isDesktop: boolean;     // >= 1024px
  width: number;
  height: number;
  isTouchDevice: boolean;
}

export function useMobileLayout(): MobileLayoutState {
  const [layoutState, setLayoutState] = useState<MobileLayoutState>(() => {
    if (typeof window === 'undefined') {
      return {
        isMobile: false,
        isTablet: false,
        isDesktop: true,
        width: 1280,
        height: 800,
        isTouchDevice: false,
      };
    }
    const width = window.innerWidth;
    const height = window.innerHeight;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    return {
      isMobile: width < 768,
      isTablet: width >= 768 && width < 1024,
      isDesktop: width >= 1024,
      width,
      height,
      isTouchDevice,
    };
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let resizeTimer: number;

    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        setLayoutState((prev) => {
          const isMobile = width < 768;
          const isTablet = width >= 768 && width < 1024;
          const isDesktop = width >= 1024;
          if (
            prev.isMobile === isMobile &&
            prev.isTablet === isTablet &&
            prev.isDesktop === isDesktop &&
            Math.abs(prev.width - width) < 20 &&
            Math.abs(prev.height - height) < 50
          ) {
            return prev;
          }
          return {
            isMobile,
            isTablet,
            isDesktop,
            width,
            height,
            isTouchDevice: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
          };
        });
      }, 100);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('orientationchange', handleResize, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  return layoutState;
}
