interface RecipientInputProps {
  recipient: string;
  onRecipientChange: (recipient: string) => void;
}

export default function RecipientInput({ recipient, onRecipientChange }: RecipientInputProps) {
  return (
    <div className="mb-2.5">
      <label className="text-white text-[11px] sm:text-xs font-medium mb-1 block">
        Recipient Address
      </label>
      <input
        type="text"
        value={recipient}
        onChange={(e) => onRecipientChange(e.target.value)}
        placeholder="0x..."
        className="w-full bg-white/5 border border-white/20 rounded-lg px-2.5 py-2 text-white placeholder-white/40 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-xs font-mono"
      />
    </div>
  );
}
