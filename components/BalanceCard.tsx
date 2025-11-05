import { RefreshCw, Coins, Zap } from 'lucide-react';
import { AssetType } from '@/constants/service';
import { cn } from '@/utils/cn';

interface BalanceCardProps {
  type: AssetType;
  balance: number;
  symbol: string;
  isRefreshing: boolean;
  onRefresh: () => void;
  networkSymbol?: string;
}

export default function BalanceCard({
  type,
  balance,
  symbol,
  isRefreshing,
  onRefresh,
  networkSymbol,
}: BalanceCardProps) {
  const isNative = type === AssetType.NATIVE;
  const colorClasses = isNative
    ? {
        gradient: 'from-blue-500/10 to-cyan-500/10',
        border: 'border-blue-500/20',
        iconBg: 'bg-blue-500/20',
        icon: 'text-blue-400',
        label: 'text-blue-300/80',
        value: 'text-blue-300/70',
        skeleton: 'bg-blue-500/20',
        buttonHover: 'hover:bg-blue-500/20',
        buttonText: 'text-blue-400 hover:text-blue-300',
        spinnerBorder: 'border-blue-400/30 border-t-blue-400',
      }
    : {
        gradient: 'from-purple-500/10 to-pink-500/10',
        border: 'border-purple-500/20',
        iconBg: 'bg-purple-500/20',
        icon: 'text-purple-400',
        label: 'text-purple-300/80',
        value: 'text-purple-300/70',
        skeleton: 'bg-purple-500/20',
        buttonHover: 'hover:bg-purple-500/20',
        buttonText: 'text-purple-400 hover:text-purple-300',
        spinnerBorder: 'border-purple-400/30 border-t-purple-400',
      };

  const label = isNative ? 'Native Balance (for Gas)' : 'Token Balance';
  const Icon = isNative ? Zap : Coins;
  const displaySymbol = isNative ? networkSymbol || symbol : symbol;

  return (
    <div
      className={cn(
        'bg-gradient-to-br border rounded-xl p-3 backdrop-blur-sm',
        colorClasses.gradient,
        colorClasses.border
      )}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className={cn('p-1.5 rounded-lg', colorClasses.iconBg)}>
            <Icon className={cn('w-4 h-4', colorClasses.icon)} />
          </div>
          <span className={cn('text-xs font-medium', colorClasses.label)}>{label}</span>
        </div>
        <button
          onClick={onRefresh}
          disabled={isRefreshing}
          className={cn(
            'p-1.5 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed',
            colorClasses.buttonHover,
            colorClasses.buttonText
          )}
          title="Refresh balance"
        >
          {isRefreshing ? (
            <div
              className={cn(
                'w-4 h-4 border-2 rounded-full animate-spin',
                colorClasses.spinnerBorder
              )}
            />
          ) : (
            <RefreshCw className="w-4 h-4" />
          )}
        </button>
      </div>
      <div className="flex items-baseline gap-2">
        {isRefreshing ? (
          <div className="flex items-center gap-2">
            <div className={cn('w-20 h-5 rounded animate-pulse', colorClasses.skeleton)} />
            <span className={cn('text-sm font-medium', colorClasses.value)}>{displaySymbol}</span>
          </div>
        ) : (
          <div className="flex items-baseline gap-2 animate-fade-in">
            <span className="text-white font-bold text-lg">{balance.toFixed(6)}</span>
            <span className={cn('text-sm font-medium', colorClasses.value)}>{displaySymbol}</span>
          </div>
        )}
      </div>
    </div>
  );
}
