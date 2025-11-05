import { useState, useCallback } from 'react';
import {
  connectEthereumProvider,
  getCurrentChainId,
  switchNetwork,
  handleWalletError,
} from '@/utils/wallet';
import { SUPPORTED_NETWORKS, NetworkName } from '@/constants/service';

export function useWallet() {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');

  const connect = useCallback(async (selectedNetwork: string = NetworkName.POLYGON) => {
    try {
      setIsConnecting(true);

      // 30 seconds timeout
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => {
          reject(
            new Error('Connection timeout. Please ensure your wallet is unlocked and try again.')
          );
        }, 30000);
      });

      const address = await Promise.race([connectEthereumProvider(), timeoutPromise]);

      // Check current chain and switch if needed
      const targetNetwork = SUPPORTED_NETWORKS[selectedNetwork];
      if (!targetNetwork) {
        throw new Error(`Unsupported network: ${selectedNetwork}`);
      }

      const currentChainId = await getCurrentChainId();
      if (currentChainId !== targetNetwork.chainId) {
        await switchNetwork(targetNetwork);
      }

      setWalletAddress(address);
      setIsConnected(true);
      setIsConnecting(false);

      return address;
    } catch (error: unknown) {
      setIsConnecting(false);
      throw handleWalletError(error);
    }
  }, []);

  const disconnect = useCallback(() => {
    setIsConnected(false);
    setWalletAddress('');
  }, []);

  return {
    isConnected,
    isConnecting,
    walletAddress,
    connect,
    disconnect,
  };
}
