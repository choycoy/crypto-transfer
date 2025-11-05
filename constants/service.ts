export enum AssetType {
  NATIVE = 'native',
  TOKEN = 'token',
}

export enum NetworkName {
  POLYGON = 'polygon',
Ethereum = 'ethereum',
}

export interface Network {
  chainId: number;
  name: string;
  symbol: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  blockExplorer: string;
  rpcUrl: string;
}

export const SUPPORTED_NETWORKS: Record<string, Network> = {
  // ============ Polygon ============
  polygon: {
    chainId: 137,
    name: 'Polygon',
    symbol: 'POL',
    nativeCurrency: {
      name: 'POL',
      symbol: 'POL',
      decimals: 18,
    },
    rpcUrl: 'https://polygon-rpc.com/',
    blockExplorer: 'https://polygonscan.com/',
  },
  // ============ Ethereum Sepolia ============
  ethereumSepolia: {
    chainId: 11155111,
    name: 'Ethereum Sepolia',
    symbol: 'ETH',
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrl: 'https://api.sepolia.infura.io/v3/YOUR_INFURA_API_KEY',
    blockExplorer: 'https://sepolia.etherscan.io/',
  },
};

// Token Interface
export interface Token {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  logoURI?: string;
  network: string;
  isNative?: boolean;
}

// Token List
export const TOKEN_LIST: Token[] = [
  // ============ POLYGON ============
  {
    address: process.env.NEXT_PUBLIC_POLYGON_TTK_CONTRACT_ADDRESS!,
    symbol: 'TTK',
    name: 'Test Token',
    decimals: 18,
    network: 'polygon',
    isNative: true,
  },
  // ============ Ethereum Sepolia ============
  {
    address: process.env.NEXT_PUBLIC_ETHEREUM_SEPOLIA_TTK_CONTRACT_ADDRESS!,
    symbol: 'TE',
    name: 'Test Eth',
    decimals: 18,
    network: 'ethereumSepolia',
  },
];

// Wallet 리스트
export const WALLET_LIST = [
  {
    name: 'MetaMask',
    icon: '🦊',
    color: 'from-orange-500 to-yellow-500',
    description: 'Most widely used Ethereum wallet',
  },
  {
    name: 'Trust Wallet',
    icon: '🛡️',
    color: 'from-blue-600 to-indigo-600',
    description: 'Secure mobile & desktop wallet',
  },
  {
    name: 'Coinbase Wallet',
    icon: '💼',
    color: 'from-blue-500 to-cyan-500',
    description: 'User-friendly self-custody wallet',
  },
  {
    name: 'WalletConnect',
    icon: '🔗',
    color: 'from-purple-500 to-pink-500',
    description: 'Connect 350+ wallets',
  },
];
