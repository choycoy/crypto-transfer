import { cn } from '@/utils/cn';
interface AmountInputProps {
  amount: string;
  onAmountChange: (amount: string) => void;
  balance: number;
  symbol: string;
}

export default function AmountInput({ amount, onAmountChange, balance, symbol }: AmountInputProps) {
  const handleMaxClick = () => {
    const maxAmount = balance.toFixed(6);
    onAmountChange(maxAmount);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value === '' || value === '.') {
      onAmountChange(value);
      return;
    }

    if (!/^\d*\.?\d*$/.test(value)) {
      return;
    }

    const numValue = parseFloat(value);

    if (!isNaN(numValue) && numValue > balance) {
      onAmountChange(balance.toFixed(6));
      return;
    }

    if (numValue < 0) {
      onAmountChange('');
      return;
    }

    onAmountChange(value);
  };

  const isExceedingBalance = parseFloat(amount) > balance;

  return (
    <div className="mb-2.5">
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-white text-[11px] sm:text-xs font-medium">Transfer Amount</label>
        <button
          type="button"
          onClick={handleMaxClick}
          className="text-purple-400 hover:text-purple-300 text-[10px] sm:text-xs font-medium transition-colors px-2 py-0.5 rounded hover:bg-purple-500/10 active:scale-95"
        >
          Max
        </button>
      </div>
      <div className="relative">
        <input
          type="text"
          inputMode="decimal"
          min={0}
          value={amount}
          onChange={handleAmountChange}
          placeholder="0.00"
          className={cn(
            'w-full bg-white/5 border rounded-lg px-3 py-2.5 pr-20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/20 text-sm transition-all',
            isExceedingBalance && 'border-red-500/50 focus:border-red-500',
            !isExceedingBalance && 'border-white/20 focus:border-purple-500'
          )}
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
          <span className="text-white/60 text-xs font-medium">{symbol}</span>
        </div>
      </div>
    </div>
  );
}
