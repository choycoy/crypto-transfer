/**
 * Check if the current browser is Safari
 * @returns {boolean} true if the browser is Safari
 */
export const isSafari = (): boolean => {
  if (typeof window === 'undefined') {
    return false;
  }

  const userAgent = window.navigator.userAgent.toLowerCase();
  const isSafariUA = /safari/.test(userAgent);
  const isChromeUA = /chrome/.test(userAgent);
  const isEdgeUA = /edge/.test(userAgent);

  return isSafariUA && !isChromeUA && !isEdgeUA;
};

/**
 * Check if the current environment is a desktop browser with dev tools emulation
 * @returns {boolean} true if it's likely a desktop browser with dev tools emulating mobile
 */
export const isDevToolsEmulation = (): boolean => {
  if (typeof window === 'undefined') {
    return false;
  }

  const userAgent = window.navigator.userAgent.toLowerCase();
  const isDesktopBrowserUA =
    (/chrome|firefox|safari|edge|edg/i.test(userAgent) &&
      !/android|iphone|ipad|ipod|mobile/i.test(userAgent)) ||
    /windows|macintosh|linux/i.test(userAgent);

  if (isDesktopBrowserUA) {
    return true;
  }

  const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
  const hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches;

  if (hasFinePointer && !hasCoarsePointer) {
    return true;
  }

  return false;
};

/**
 * Check if the current device is a mobile or tablet device
 * Detects actual mobile/tablet devices, not desktop browser dev tools emulation
 * @returns {boolean} true if the device is mobile or tablet
 */
export const isMobileOrTablet = (): boolean => {
  if (typeof window === 'undefined') {
    return false;
  }

  if (isDevToolsEmulation()) {
    return false;
  }

  const userAgent = window.navigator.userAgent.toLowerCase();
  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;
  const viewportWidth = window.innerWidth;

  if (screenWidth >= 1280 || screenHeight >= 1024) {
    return false;
  }

  const mobileTabletRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|tablet/i;
  const isMobileTabletUA = mobileTabletRegex.test(userAgent);
  const screenViewportRatio = screenWidth / viewportWidth;
  const hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
  const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
  const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  return (
    (isMobileTabletUA && screenWidth <= 1024 && screenViewportRatio <= 1.5) ||
    (screenWidth <= 1024 &&
      screenViewportRatio <= 1.5 &&
      hasCoarsePointer &&
      hasTouchScreen &&
      !hasFinePointer)
  );
};
