import { X, Loader2 } from 'lucide-react';
import { cn } from '@/utils/cn';

interface Wallet {
  name: string;
  icon: string;
  color: string;
  description: string;
}

interface WalletModalProps {
  show: boolean;
  onClose: () => void;
  wallets: Wallet[];
  onConnect: (walletName: string) => void;
  isConnecting: boolean;
  connectingWallet?: string;
}

export default function WalletModal({
  show,
  onClose,
  wallets,
  onConnect,
  isConnecting,
  connectingWallet,
}: WalletModalProps) {
  if (!show) return null;

  const handleWalletClick = (walletName: string) => {
    if (!isConnecting) {
      onConnect(walletName);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 z-50">
      <div className="bg-slate-900/95 rounded-2xl p-4 sm:p-6 w-full max-w-sm border border-white/20 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base sm:text-lg font-bold text-white">Connect Wallet</h2>
          <button
            onClick={onClose}
            disabled={isConnecting}
            className="text-white/60 hover:text-white transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-2">
          {wallets.map((wallet) => {
            const isConnectingThisWallet = isConnecting && connectingWallet === wallet.name;
            const isDisabled = isConnecting && !isConnectingThisWallet;

            return (
              <button
                key={wallet.name}
                onClick={() => handleWalletClick(wallet.name)}
                disabled={isDisabled}
                className="w-full bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg p-2.5 flex items-center gap-2.5 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <div
                  className={cn(
                    'bg-gradient-to-r w-9 h-9 rounded-lg flex items-center justify-center text-lg shadow-lg shrink-0',
                    wallet.color
                  )}
                >
                  {wallet.icon}
                </div>
                <div className="flex-1 text-left">
                  <div className="text-white font-semibold text-xs">{wallet.name}</div>
                  <div className="text-white/60 text-[10px]">{wallet.description}</div>
                </div>
                {isConnectingThisWallet && (
                  <Loader2 className="w-4 h-4 text-purple-400 animate-spin shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        <p className="text-white/40 text-[10px] text-center mt-4">
          Wallet connection is securely encrypted, and your private key is never stored.
        </p>
      </div>
    </div>
  );
}
