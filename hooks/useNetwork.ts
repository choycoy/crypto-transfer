import { useState, useEffect, useCallback } from 'react';
import { getCurrentChainId, switchNetwork } from '@/utils/wallet';
import { SUPPORTED_NETWORKS, TOKEN_LIST, Token, NetworkName } from '@/constants/service';

export function useNetwork() {
  const [selectedNetwork, setSelectedNetwork] = useState<string>(NetworkName.POLYGON);
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);

  const availableTokens = TOKEN_LIST.filter((token) => token.network === selectedNetwork);

  // Initialise token selection when network changes
  useEffect(() => {
    if (
      availableTokens.length > 0 &&
      (!selectedToken || !availableTokens.includes(selectedToken))
    ) {
      setSelectedToken(availableTokens[0]);
    }
  }, [selectedNetwork, availableTokens, selectedToken]);

  const changeNetwork = useCallback(
    async (networkKey: string, isConnected: boolean) => {
      if (!isConnected || networkKey === selectedNetwork) return;

      const network = SUPPORTED_NETWORKS[networkKey];
      if (!network) {
        throw new Error(`Unsupported network: ${networkKey}`);
      }

      // Switch network in wallet
      const currentChainId = await getCurrentChainId();
      if (currentChainId !== network.chainId) {
        await switchNetwork(network);
      }

      setSelectedNetwork(networkKey);
    },
    [selectedNetwork]
  );

  const reset = useCallback(() => {
    setSelectedToken(null);
  }, []);

  return {
    selectedNetwork,
    selectedToken,
    availableTokens,
    setSelectedToken,
    changeNetwork,
    reset,
  };
}
