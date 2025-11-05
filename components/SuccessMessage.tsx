import { CheckCircle2 } from 'lucide-react';

interface SuccessMessageProps {
  show: boolean;
}

export default function SuccessMessage({ show }: SuccessMessageProps) {
  if (!show) return null;

  return (
    <div className="mb-2.5 bg-green-500/20 border border-green-500/50 rounded-xl p-2.5 flex items-center gap-2">
      <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
      <div>
        <p className="text-green-400 font-semibold text-xs">Transfer Complete!</p>
        <p className="text-green-300 text-[10px]">Transaction processed successfully</p>
      </div>
    </div>
  );
}
