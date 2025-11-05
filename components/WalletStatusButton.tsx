import { Wallet } from 'lucide-react';

interface WalletStatusButtonProps {
  isConnected: boolean;
  walletAddress: string;
}

export default function WalletStatusButton({
  isConnected,
  walletAddress,
}: WalletStatusButtonProps) {
  if (isConnected) {
    return (
      <div className="relative group">
        <button className="bg-green-500/20 border border-green-500/50 px-2 py-1 rounded-lg flex items-center gap-1">
          <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
          <span className="text-green-400 text-[10px] font-medium">{walletAddress}</span>
          <Wallet className="w-3 h-3 text-green-400 sm:hidden" />
        </button>
      </div>
    );
  }
}
