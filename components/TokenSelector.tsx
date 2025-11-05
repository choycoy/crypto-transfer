import { Token } from '@/constants/service';
import { cn } from '@/utils/cn';

interface TokenSelectorProps {
  tokens: Token[];
  selectedToken: Token | null;
  selectedNetwork: string;
  onTokenChange: (token: Token) => void;
}

export default function TokenSelector({
  tokens,
  selectedToken,
  selectedNetwork,
  onTokenChange,
}: TokenSelectorProps) {
  return (
    <div className="mb-3">
      <label className="text-white text-[11px] sm:text-xs font-medium mb-1.5 block">
        Select Token
      </label>
      <div className="flex flex-wrap gap-1.5">
        {tokens.map((token) => (
          <button
            key={`${token.address}-${selectedNetwork}`}
            onClick={() => onTokenChange(token)}
            className={cn(
              'p-2 rounded-lg transition-all text-xs w-auto min-w-24',
              selectedToken?.address === token.address && selectedToken?.symbol === token.symbol
                ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/50'
                : 'bg-white/5 text-white/60 hover:bg-white/10'
            )}
          >
            <div className="font-bold">{token.symbol}</div>
            <div className="text-[10px] truncate">{token.name}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
