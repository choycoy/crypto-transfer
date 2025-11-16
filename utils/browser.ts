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

/**
 * Detect the operating system and browser of the current device
 * @returns {Object} An object containing the operating system and browser information
 */
export function detectOSAndBrowser() {
  const ua = navigator.userAgent;

  // Determine the operating system
  let os = "other";
  if (/Android/i.test(ua)) os = "android";
  else if (/iPhone|iPad|iPod/i.test(ua)) os = "ios";
  else if (/Macintosh|MacIntel|MacPPC|Mac68K/i.test(ua)) os = "mac";
  else if (/Win32|Win64|Windows/i.test(ua)) os = "windows";
  else if (/Linux/i.test(ua)) os = "linux";

  // Determine the browser
  let browser = "other";
  if (/Chrome/i.test(ua) && !/Edg/i.test(ua))
    browser = "chrome"; // Exclude Edge
  else if (/Edg/i.test(ua)) browser = "edge";
  else if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) browser = "safari";
  else if (/Firefox/i.test(ua)) browser = "firefox";

  const isAndroid = /Android/i.test(ua);
  const isIOS = /iPhone|iPad|iPod/i.test(ua);
  const isChrome = /Chrome/i.test(ua);
  const isSafari = /^((?!chrome|android).)*safari/i.test(ua);

  return { os, browser, isAndroid, isIOS, isChrome, isSafari };
}