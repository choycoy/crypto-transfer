# Crypto Transfer

A modern, user-friendly web application for transferring cryptocurrency tokens on EVM-compatible networks. Built with Next.js, React, and ethers.js.

## Features

- 🔗 **Wallet Connection**: Connect with popular EVM wallets via browser extensions (MetaMask, Trust Wallet, Coinbase Wallet, WalletConnect)
- 🌐 **Network Switching**: Seamlessly switch between supported EVM networks
- 💰 **Token Transfers**: Send ERC-20 tokens with an intuitive interface
- 📊 **Balance Display**: View native currency and token balances in real-time

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Web3**: ethers.js v6
- **Wallet Integration**: EIP-1193 (MetaMask standard)

## Getting Started

### Prerequisites

- Node.js 18+ and yarn (or npm)
- A Web3 wallet browser extension (MetaMask recommended)

### Installation

1. Install dependencies:
```bash
yarn install
```

2. Run the development server:
```bash
yarn dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Supported Networks

### Polygon

- **Chain ID**: 137
- **Native Currency**: POL
- **Block Explorer**: https://polygonscan.com/

### Ethereum Sepolia (Testnet)

- **Chain ID**: 11155111
- **Native Currency**: ETH
- **Block Explorer**: https://sepolia.etherscan.io/

## Usage

1. **Install Wallet Extension**: Install a Web3 wallet browser extension (e.g., MetaMask)
2. **Connect Wallet**: Click the "Connect Wallet" button and approve the connection request in your wallet
3. **Select Network**: Choose your desired network from the dropdown (if the network isn't added to your wallet, it will be added automatically)
4. **Select Token**: Choose the token you want to transfer
5. **Enter Recipient**: Paste the recipient's wallet address
6. **Enter Amount**: Type the amount of tokens to send
7. **Transfer**: Click "Send" and confirm the transaction in your wallet

## Project Structure

```
crypto-transfer/
├── app/                  
│   ├── layout.tsx         
│   └── page.tsx           
├── components/           
│   ├── CryptoTransferContainer.tsx
│   ├── TransferForm.tsx
│   ├── WalletModal.tsx
│   ├── NetworkSelector.tsx
│   ├── TokenSelector.tsx
│   └── ...
├── constants/          
│   ├── abis.ts           # ERC-20 ABI
│   └── service.ts        # Network and token configurations
├── hooks/              
│   ├── useWallet.ts      # Wallet connection logic
│   ├── useBalance.ts     # Balance fetching
│   └── useNetwork.ts     # Network management
├── utils/             
│   ├── wallet.ts         # Wallet connection and transaction logic
│   ├── browser.ts        # Browser detection
│   └── cn.ts             # Tailwind class utilities
└── types/          
```

## Error Handling

The application includes comprehensive error handling for:

- Wallet connection issues
- Transaction failures

## Browser Compatibility

- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Edge
- ❌ Safari (not supported)

## Security Notes

- Always verify transaction details before confirming in your wallet
- Never share your private keys or seed phrases
- The application only reads wallet addresses and never accesses private keys
- All wallet interactions are handled through the EIP-1193 standard

