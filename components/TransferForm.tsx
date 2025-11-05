import { AssetType, Network, Token } from '@/constants/service';
import BalanceCard from '@/components/BalanceCard';
import NetworkSelector from '@/components/NetworkSelector';
import TokenSelector from '@/components/TokenSelector';
import AmountInput from '@/components/AmountInput';
import RecipientInput from '@/components/RecipientInput';
import GasFeeDisplay from '@/components/GasFeeDisplay';
import TransferButton from '@/components/TransferButton';

interface TransferFormProps {
  selectedNetwork: string;
  selectedToken: Token | null;
  availableTokens: Token[];
  balance: number;
  nativeBalance: number;
  amount: string;
  recipient: string;
  isProcessing: boolean;
  gasEstimate: string | null;
  onNetworkChange: (networkKey: string) => void;
  onTokenChange: (token: Token) => void;
  onAmountChange: (amount: string) => void;
  onRecipientChange: (recipient: string) => void;
  onRefreshBalance: () => void;
  onRefreshNativeBalance: () => void;
  isRefreshingBalance: boolean;
  isRefreshingNativeBalance: boolean;
  onTransfer: () => void;
  networks: Record<string, Network>;
}

export default function TransferForm({
  selectedNetwork,
  selectedToken,
  availableTokens,
  balance,
  nativeBalance,
  amount,
  recipient,
  isProcessing,
  gasEstimate,
  onNetworkChange,
  onTokenChange,
  onAmountChange,
  onRecipientChange,
  onRefreshBalance,
  onRefreshNativeBalance,
  isRefreshingBalance,
  isRefreshingNativeBalance,
  onTransfer,
  networks,
}: TransferFormProps) {
  const currentNetwork = networks[selectedNetwork];

  return (
    <>
      <NetworkSelector
        networks={networks}
        selectedNetwork={selectedNetwork}
        onNetworkChange={onNetworkChange}
      />

      <TokenSelector
        tokens={availableTokens}
        selectedToken={selectedToken}
        selectedNetwork={selectedNetwork}
        onTokenChange={onTokenChange}
      />

      {/* Balances Display */}
      <div className="space-y-2 mb-3">
        <BalanceCard
          type={AssetType.NATIVE}
          balance={nativeBalance}
          symbol={currentNetwork?.symbol || ''}
          isRefreshing={isRefreshingNativeBalance}
          onRefresh={onRefreshNativeBalance}
          networkSymbol={currentNetwork?.symbol}
        />
        <BalanceCard
          type={AssetType.TOKEN}
          balance={balance}
          symbol={selectedToken?.symbol || currentNetwork?.symbol || ''}
          isRefreshing={isRefreshingBalance}
          onRefresh={onRefreshBalance}
        />
      </div>

      <AmountInput
        amount={amount}
        onAmountChange={onAmountChange}
        balance={balance}
        symbol={selectedToken?.symbol || currentNetwork?.symbol || ''}
      />

      <RecipientInput recipient={recipient} onRecipientChange={onRecipientChange} />

      <GasFeeDisplay gasEstimate={gasEstimate} />

      <TransferButton
        tokenSymbol={selectedToken?.symbol || currentNetwork?.symbol || ''}
        isProcessing={isProcessing}
        disabled={!amount || !recipient || isProcessing || !selectedToken}
        onTransfer={onTransfer}
      />
    </>
  );
}
