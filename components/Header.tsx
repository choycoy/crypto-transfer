import { Send } from 'lucide-react';
import WalletStatusButton from './WalletStatusButton';

interface HeaderProps {
  isConnected: boolean;
  walletAddress: string;
  onDisconnect: () => void;
}

export default function Header({ isConnected, walletAddress, onDisconnect }: HeaderProps) {
  return (
    <div className="flex flex-col justify-between gap-2 mb-4">
      <div className="flex items-center gap-2">
        <div className="bg-purple-500/20 p-1.5 rounded-lg">
          <Send className="w-4 h-4 text-purple-400" />
        </div>
        <div className="flex justify-between items-center w-full">
          <h1 className="text-base font-bold text-white">Crypto Transfer</h1>
          {isConnected && (
            <button
              onClick={onDisconnect}
              className="mt-1 bg-red-500/20 border border-red-500/50 px-2 py-1 rounded-lg text-red-400 text-[10px] font-medium whitespace-nowrap"
            >
              Disconnect
            </button>
          )}
        </div>
      </div>
      <WalletStatusButton isConnected={isConnected} walletAddress={walletAddress} />
    </div>
  );
}
