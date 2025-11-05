import { AlertCircle, X } from 'lucide-react';

interface ErrorMessageProps {
  show: boolean;
  message: string;
  onClose: () => void;
}

export default function ErrorMessage({ show, message, onClose }: ErrorMessageProps) {
  if (!show) return null;

  return (
    <div className="mb-2.5 bg-red-500/20 border border-red-500/50 rounded-xl p-2.5 flex items-start gap-2 animate-in slide-in-from-top-2">
      <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
      <div className="flex-1">
        <p className="text-red-400 font-semibold text-xs">Connection Failed</p>
        <p className="text-red-300 text-[10px] mt-0.5">{message}</p>
      </div>
      <button
        onClick={onClose}
        className="text-red-400/60 hover:text-red-400 transition-colors shrink-0"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
