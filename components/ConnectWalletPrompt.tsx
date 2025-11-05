import { Wallet } from 'lucide-react';
import { cn } from '@/utils/cn';

interface ConnectWalletPromptProps {
  onConnect: () => void;
  isConnecting?: boolean;
}

export default function ConnectWalletPrompt({
  onConnect,
  isConnecting = false,
}: ConnectWalletPromptProps) {
  return (
    <div className="text-center py-8 sm:py-10">
      <div className="bg-purple-500/10 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3">
        <Wallet className="w-7 h-7 sm:w-8 sm:h-8 text-purple-400" />
      </div>
      <h3 className="text-sm sm:text-base font-bold text-white mb-1">Please connect your wallet</h3>
      <p className="text-white/60 text-[11px] sm:text-xs mb-5 px-4">
        You must connect your wallet first to transfer crypto
      </p>
      <button
        onClick={onConnect}
        disabled={isConnecting}
        className={cn(
          'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg text-white text-xs font-bold flex items-center gap-1.5 mx-auto transition-all shadow-lg shadow-purple-500/50',
          isConnecting && 'opacity-50 cursor-not-allowed'
        )}
      >
        {isConnecting ? (
          <>
            <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Connecting...
          </>
        ) : (
          <>
            <Wallet className="w-3.5 h-3.5" />
            Connect Wallet
          </>
        )}
      </button>
    </div>
  );
}
