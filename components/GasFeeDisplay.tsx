import { Zap } from 'lucide-react';

interface GasFeeDisplayProps {
  gasEstimate: string | null;
}

export default function GasFeeDisplay({ gasEstimate }: GasFeeDisplayProps) {
  if (!gasEstimate) return null;

  return (
    <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-xl p-3 mb-3 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-1.5">
        <div className="p-1.5 bg-amber-500/20 rounded-lg">
          <Zap className="w-4 h-4 text-amber-400" />
        </div>
        <span className="text-amber-300/80 text-xs font-medium">Estimated Gas Fee</span>
      </div>
      <div className="flex items-baseline gap-2 ml-8">
        <span className="text-white font-semibold text-sm">{gasEstimate}</span>
      </div>
    </div>
  );
}
