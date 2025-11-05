import { isSafari } from './browser';
import { Network } from '@/constants/service';
import { ERC20_ABI } from '@/constants/abis';
import { BrowserProvider, formatEther, Contract, parseUnits } from 'ethers';

/**
 * Handle wallet provider errors and convert them to user-friendly messages
 * @param error - The error object from the wallet provider
 * @returns {Error} A new Error with a user-friendly message
 */
export const handleWalletError = (error: unknown): Error => {
  const errorObj = error as { code?: number | string; message?: string };
  const errorMessage = errorObj?.message?.toLowerCase() || '';
  const errorCode = errorObj?.code;

  // Handle "request already pending" error (code -32002)
  if (
    errorCode === -32002 ||
    errorMessage.includes('already pending') ||
    (errorMessage.includes('request') && errorMessage.includes('pending'))
  ) {
    return new Error(
      'A wallet connection request is already in progress. Please wait for your wallet to respond.'
    );
  }

  // Handle website blacklisted error
  if (
    errorCode === -32603 ||
    errorMessage.includes('blacklist') ||
    errorMessage.includes('blacklisted')
  ) {
    return new Error(
      'This website is blocked by the wallet. Please allow the website in the wallet settings.'
    );
  }

  // User rejected the request (connection or transaction)
  if (errorCode === 4001 || errorCode === 'ACTION_REJECTED') {
    return new Error('Transaction was cancelled by user.');
  }

  // Re-throw with original message if it's already an Error
  if (error instanceof Error) {
    return error;
  }

  // Generic error
  return new Error(errorObj?.message || 'An error occurred while connecting to the wallet.');
};

/**
 * Connect to Ethereum provider using EIP-1193 standard
 * @returns {Promise<string>} The first connected wallet address
 * @throws {Error} If browser environment is not available, Safari is detected, or provider is not found
 */
export const connectEthereumProvider = async (): Promise<string> => {
  // Check if the function is called in a browser environment
  if (typeof window === 'undefined') {
    throw new Error('This function can only be called in a browser environment.');
  }

  // Safari is not supported
  if (isSafari()) {
    throw new Error(
      'Safari is not supported. Please use Chrome, Firefox, or another supported browser to connect your wallet.'
    );
  }

  // Check if the Ethereum provider is found
  if (!window.ethereum) {
    throw new Error('Ethereum provider not found. Please install MetaMask or another Web3 wallet.');
  }

  try {
    const accounts = (await window.ethereum.request({ method: 'eth_requestAccounts' })) as string[];

    return accounts[0] as string;
  } catch (error: unknown) {
    throw handleWalletError(error);
  }
};

/**
 * Get the current chain ID from the connected wallet
 * @returns {Promise<number>} The current chain ID
 */
export const getCurrentChainId = async (): Promise<number> => {
  const chainId = (await window.ethereum!.request({ method: 'eth_chainId' })) as string;
  return parseInt(chainId, 16);
};

/**
 * Switch to a different EVM network
 * @param network - The network configuration to switch to
 * @returns {Promise<void>}
 */
export const switchNetwork = async (network: Network): Promise<void> => {
  const chainIdHex = `0x${network.chainId.toString(16)}`;

  try {
    await window.ethereum!.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: chainIdHex }],
    });
  } catch (switchError: unknown) {
    throw handleWalletError(switchError);
  }
};

/**
 * Get the POL balance of an address
 * @param address - The address to get the POL balance of
 * @returns {Promise<number>} The POL balance of the address
 */
export const getPOLBalance = async (address: string): Promise<number> => {
  const provider = new BrowserProvider(window.ethereum!);
  const balanceWei = await provider.getBalance(address);

  const balancePOL = formatEther(balanceWei);

  return Number(balancePOL);
};

/**
 * Get ERC-20 token balance
 * @param tokenAddress - The ERC-20 token contract address
 * @param userAddress - The user's wallet address
 * @param decimals - The token decimals
 * @returns {Promise<number>} The token balance
 */
export const getTokenBalance = async (
  tokenAddress: string,
  userAddress: string,
  decimals: number
): Promise<number> => {
  try {
    const provider = new BrowserProvider(window.ethereum!);
    const contract = new Contract(tokenAddress, ERC20_ABI, provider);
    const balance = await contract.balanceOf(userAddress);

    return Number(balance) / 10 ** decimals;
  } catch (error: unknown) {
    throw handleWalletError(error);
  }
};

/**
 * Send an ERC-20 token to a recipient
 * @param tokenAddress - The ERC-20 token contract address
 * @param to - The recipient address
 * @param amount - The amount of tokens to send
 * @param decimals - The token decimals
 * @returns {Promise<string>} The transaction hash
 */
export const sendToken = async (
  tokenAddress: string,
  to: string,
  amount: string,
  decimals: number = 18
): Promise<string> => {
  try {
    const provider = new BrowserProvider(window.ethereum!);
    const signer = await provider.getSigner();

    const tokenContract = new Contract(tokenAddress, ERC20_ABI, signer);

    const amountInUnits = parseUnits(amount, decimals);

    const tx = await tokenContract.transfer(to, amountInUnits);

    await tx.wait();

    return tx.hash as string;
  } catch (error: unknown) {
    throw handleWalletError(error);
  }
};
