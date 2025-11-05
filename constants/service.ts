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
    blockExplorer: 'https://sepolia.etherscan.io/',
  },
};

// Token Contract Addresses
export const TOKEN_CONTRACTS = {
  POLYGON_TTK: '0x3e34e0Cd45b3D72DfaB7f7F4652F852CC7E3dF78',
  ETHEREUM_SEPOLIA_TTK: '0xB6e0BA252F7d13Ee42E92F4c6d05FfAecF8f46C3',
} as const;

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
    address: TOKEN_CONTRACTS.POLYGON_TTK,
    symbol: 'TTK',
    name: 'Test Token',
    decimals: 18,
    network: 'polygon',
    isNative: true,
  },
  // ============ Ethereum Sepolia ============
  {
    address: TOKEN_CONTRACTS.ETHEREUM_SEPOLIA_TTK,
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
