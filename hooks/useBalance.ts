import { useState, useCallback } from 'react';
import { getNativeBalance, getTokenBalance } from '@/utils/wallet';
import { Token } from '@/constants/service';

const MIN_LOADING_TIME = 200; // 0.2 seconds

export function useBalance(walletAddress: string) {
  const [nativeBalance, setNativeBalance] = useState(0);
  const [tokenBalance, setTokenBalance] = useState(0);
  const [isRefreshingNative, setIsRefreshingNative] = useState(false);
  const [isRefreshingToken, setIsRefreshingToken] = useState(false);

  const fetchNativeBalance = useCallback(async () => {
    if (!walletAddress) return;

    setIsRefreshingNative(true);
    const startTime = Date.now();

    try {
      const balance = await getNativeBalance(walletAddress);

      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, MIN_LOADING_TIME - elapsedTime);
      await new Promise((resolve) => setTimeout(resolve, remainingTime));

      setNativeBalance(balance);
    } catch {
      setNativeBalance(0);
      throw new Error('Failed to fetch native token balance. Please try again.');
    } finally {
      setIsRefreshingNative(false);
    }
  }, [walletAddress]);

  const fetchTokenBalance = useCallback(
    async (token: Token | null) => {
      if (!walletAddress || !token) return;

      setIsRefreshingToken(true);
      const startTime = Date.now();

      try {
        const balance = await getTokenBalance(token.address, walletAddress, token.decimals);

        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, MIN_LOADING_TIME - elapsedTime);
        await new Promise((resolve) => setTimeout(resolve, remainingTime));

        setTokenBalance(balance);
      } catch {
        setTokenBalance(0);
        throw new Error('Failed to fetch token balance. Please try again.');
      } finally {
        setIsRefreshingToken(false);
      }
    },
    [walletAddress]
  );

  const reset = useCallback(() => {
    setNativeBalance(0);
    setTokenBalance(0);
  }, []);

  return {
    nativeBalance,
    tokenBalance,
    isRefreshingNative,
    isRefreshingToken,
    fetchNativeBalance,
    fetchTokenBalance,
    reset,
  };
}
