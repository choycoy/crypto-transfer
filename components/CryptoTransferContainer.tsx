'use client';

import { useState, useEffect } from 'react';
import WalletModal from '@/components/WalletModal';
import ErrorMessage from '@/components/ErrorMessage';
import Header from '@/components/Header';
import ConnectWalletPrompt from '@/components/ConnectWalletPrompt';
import TransferForm from '@/components/TransferForm';
import { WALLET_LIST, SUPPORTED_NETWORKS } from '@/constants/service';
import { useWallet } from '@/hooks/useWallet';
import { useBalance } from '@/hooks/useBalance';
import { useNetwork } from '@/hooks/useNetwork';
import { isMobileOrTablet } from '@/utils/browser';
import { sendToken } from '@/utils/wallet';
import SuccessMessage from '@/components/SuccessMessage';

export default function CryptoTransferContainer() {
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [connectingWallet, setConnectingWallet] = useState<string | undefined>();
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [gasEstimate, setGasEstimate] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Wallet connection
  const { isConnected, isConnecting, walletAddress, connect, disconnect } = useWallet();

  // Network and token selection
  const { selectedNetwork, selectedToken, availableTokens, setSelectedToken, changeNetwork } =
    useNetwork();

  // Balance fetching
  const {
    nativeBalance,
    tokenBalance,
    isRefreshingNative,
    isRefreshingToken,
    fetchNativeBalance,
    fetchTokenBalance,
    reset: resetBalance,
  } = useBalance(walletAddress);

  // Reset form when network changes
  useEffect(() => {
    setAmount('');
    setRecipient('');
    setGasEstimate(null);
  }, [selectedNetwork]);

  // Fetch balances when connected or token changes
  useEffect(() => {
    if (isConnected) {
      fetchNativeBalance().catch((error) => {
        setErrorMessage(error.message);
        setTimeout(() => setErrorMessage(null), 5000);
      });
      if (selectedToken) {
        fetchTokenBalance(selectedToken).catch((error) => {
          setErrorMessage(error.message);
          setTimeout(() => setErrorMessage(null), 5000);
        });
      }
    }
  }, [isConnected, selectedToken, fetchNativeBalance, fetchTokenBalance]);

  // Perform wallet connection
  const performWalletConnection = async (walletName?: string) => {
    try {
      setConnectingWallet(walletName);
      await connect(selectedNetwork);
      setShowWalletModal(false);
      setConnectingWallet(undefined);
    } catch (error: unknown) {
      setConnectingWallet(undefined);
      const message =
        error instanceof Error ? error.message : 'Failed to connect wallet. Please try again.';
      setErrorMessage(message);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  // Handle wallet connection click
  const onWalletConnectClick = () => {
    if (isConnecting) return;
    if (isMobileOrTablet()) setShowWalletModal(true);
    else performWalletConnection();
  };

  const disconnectWallet = () => {
    disconnect();
    resetBalance();
    setAmount('');
    setRecipient('');
    setGasEstimate(null);
    setTxHash(null);
  };

  // Handle network change
  const handleNetworkChange = async (networkKey: string) => {
    try {
      await changeNetwork(networkKey, isConnected);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to switch network.';
      setErrorMessage(message);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  // Handle token transfer
  const handleTransfer = async () => {
    if (!selectedToken || !amount || !recipient) return;

    try {
      setIsProcessing(true);
      setErrorMessage(null);
      setTxHash(null);

      const hash = await sendToken(
        selectedToken.address,
        recipient,
        amount,
        selectedToken.decimals
      );

      setTxHash(hash);
      setAmount('');
      setRecipient('');

      // Refresh balances after successful transfer
      await fetchNativeBalance();
      if (selectedToken) {
        await fetchTokenBalance(selectedToken);
      }
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Failed to send token. Please try again.';
      setErrorMessage(message);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-2.5 sm:p-6">
      <div className="w-full max-w-md">
        <WalletModal
          show={showWalletModal}
          onClose={() => {
            if (!isConnecting) {
              setShowWalletModal(false);
            }
          }}
          wallets={WALLET_LIST}
          onConnect={performWalletConnection}
          isConnecting={isConnecting}
          connectingWallet={connectingWallet}
        />
        <SuccessMessage show={!!txHash} />
        <ErrorMessage
          show={!!errorMessage}
          message={errorMessage!}
          onClose={() => setErrorMessage(null)}
        />
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-3.5 sm:p-6 shadow-2xl border border-white/20">
          <Header
            isConnected={isConnected}
            walletAddress={walletAddress}
            onDisconnect={disconnectWallet}
          />

          {!isConnected ? (
            <ConnectWalletPrompt onConnect={onWalletConnectClick} isConnecting={isConnecting} />
          ) : (
            <TransferForm
              selectedNetwork={selectedNetwork}
              selectedToken={selectedToken}
              availableTokens={availableTokens}
              balance={tokenBalance}
              nativeBalance={nativeBalance}
              amount={amount}
              recipient={recipient}
              isProcessing={isProcessing}
              gasEstimate={gasEstimate}
              onNetworkChange={handleNetworkChange}
              onTokenChange={setSelectedToken}
              onAmountChange={setAmount}
              onRecipientChange={setRecipient}
              onRefreshBalance={() =>
                selectedToken &&
                fetchTokenBalance(selectedToken).catch((error) => {
                  setErrorMessage(error.message);
                  setTimeout(() => setErrorMessage(null), 5000);
                })
              }
              onRefreshNativeBalance={() =>
                fetchNativeBalance().catch((error) => {
                  setErrorMessage(error.message);
                  setTimeout(() => setErrorMessage(null), 5000);
                })
              }
              isRefreshingBalance={isRefreshingToken}
              isRefreshingNativeBalance={isRefreshingNative}
              onTransfer={handleTransfer}
              networks={SUPPORTED_NETWORKS}
            />
          )}
        </div>

        {txHash && (
          <div className="mt-4 text-center">
            <a
              href={`${SUPPORTED_NETWORKS[selectedNetwork].blockExplorer}/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 text-xs underline"
            >
              View Transaction on Explorer
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
