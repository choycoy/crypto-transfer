import { Network } from '@/constants/service';
import { cn } from '@/utils/cn';

interface NetworkSelectorProps {
  networks: Record<string, Network>;
  selectedNetwork: string;
  onNetworkChange: (networkKey: string) => void;
}

export default function NetworkSelector({
  networks,
  selectedNetwork,
  onNetworkChange,
}: NetworkSelectorProps) {
  return (
    <div className="mb-3">
      <label className="text-white text-[11px] sm:text-xs font-medium mb-1.5 block">
        Select Network
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
        {Object.entries(networks).map(([key, network]) => (
          <button
            key={key}
            onClick={() => onNetworkChange(key)}
            className={cn(
              'p-2 rounded-lg transition-all text-xs w-auto max-w-24',
              selectedNetwork === key
                ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/50'
                : 'bg-white/5 text-white/60 hover:bg-white/10'
            )}
          >
            <div className="font-bold">{network.symbol}</div>
            <div className="text-[10px]">{network.name}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
