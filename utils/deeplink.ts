import { detectOSAndBrowser } from "@/utils/browser";
import { WALLET_APP } from "@/constants/service";

type WalletApp = (typeof WALLET_APP)[keyof typeof WALLET_APP];

interface BuildLinkOptions {
  wallet: WalletApp;
  targetUrl: string; // The actual URL of the dapp to open (e.g. https://yourdomain.com/path?...)
  params?: URLSearchParams; // Tracking parameters
}

export function redirectToWallet({
  wallet,
  targetUrl,
  params,
}: BuildLinkOptions) {
  const { isAndroid, isIOS, isChrome, isSafari } = detectOSAndBrowser();
  const os = isAndroid ? "android" : isIOS ? "ios" : "other";
  const browser = isChrome ? "chrome" : isSafari ? "safari" : "other";

  const p = new URLSearchParams(params);
  p.set("os", os);
  p.set("browser", browser);

  const urlWithParams = appendParams(targetUrl, p);

  let finalUrl: string;

  if (wallet === WALLET_APP.TRUST) {
    if (isAndroid) {
      // Trust Wallet Android - Intent
      const coinId = "60"; // ETH
      finalUrl = `intent://link.trustwallet.com/open_url?coin_id=${coinId}&url=${encodeURIComponent(
        urlWithParams,
      )}#Intent;scheme=https;package=com.wallet.crypto.trustapp;end`;
    } else if (isIOS) {
      // Trust Wallet iOS - universal link
      const u = new URL("https://link.trustwallet.com/open_url");
      u.searchParams.set("url", urlWithParams);
      finalUrl = u.toString();
    } else {
      finalUrl = urlWithParams;
    }
  } else if (wallet === WALLET_APP.METAMASK) {
    if (isAndroid) {
      // MetaMask Android - Intent
      finalUrl = `intent://${stripProtocol(
        urlWithParams,
      )}#Intent;package=io.metamask;scheme=https;end`;
    } else if (isIOS) {
      // MetaMask iOS - app link
      finalUrl = `https://metamask.app.link/dapp/${stripProtocol(
        urlWithParams,
      )}`;
    } else {
      // Desktop browser is just the Dapp URL
      finalUrl = urlWithParams;
    }
  } 
   else {
    finalUrl = urlWithParams;
  }

  window.location.href = finalUrl;
}

function appendParams(rawUrl: string, params: URLSearchParams): string {
  const u = new URL(rawUrl, window.location.origin);
  // Merge existing query parameters with the new ones
  params.forEach((v, k) => u.searchParams.set(k, v));
  return u.toString();
}

function stripProtocol(rawUrl: string): string {
  // https://example.com/path?a=1 -> example.com/path?a=1
  return rawUrl.replace(/^https?:\/\//, "");
}
