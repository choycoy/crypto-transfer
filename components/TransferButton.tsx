import { ArrowRight } from 'lucide-react';
import { cn } from '@/utils/cn';

interface TransferButtonProps {
  tokenSymbol: string;
  isProcessing: boolean;
  disabled: boolean;
  onTransfer: () => void;
}

export default function TransferButton({
  tokenSymbol,
  isProcessing,
  disabled,
  onTransfer,
}: TransferButtonProps) {
  return (
    <>
      <button
        onClick={onTransfer}
        disabled={disabled}
        className={cn(
          'w-full py-2.5 rounded-lg font-bold text-white transition-all flex items-center justify-center gap-1.5 text-xs',
          disabled
            ? 'bg-gray-500/50 cursor-not-allowed'
            : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg shadow-purple-500/50'
        )}
      >
        {isProcessing ? (
          <>
            <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Processing...
          </>
        ) : (
          <>
            Transfer {tokenSymbol}
            <ArrowRight className="w-3.5 h-3.5" />
          </>
        )}
      </button>

      {/* Warning */}
      <p className="text-center text-white/40 text-[10px] mt-2.5">
        Please double-check the address and network. Transfers to incorrect addresses cannot be
        recovered.
      </p>
    </>
  );
}
