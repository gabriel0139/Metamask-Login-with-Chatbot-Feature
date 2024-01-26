import {
  AddressLike,
  BigNumberish,
  BrowserProvider,
  JsonRpcSigner,
  Network,
} from 'ethers';

export interface Web3Connector {
  connectWallet: () => Promise<Web3Result<Web3Instance>>;
  disconnectWallet: () => Promise<Web3Result<null>>;
  connected: () => boolean;
  changeNetwork: (network: NetworkInfo) => Promise<Web3Result<null>>;
  instance?: Web3Instance;
}

export interface Web3Instance {
  provider?: BrowserProvider;
  signer?: JsonRpcSigner;
  network?: Network;
}

export enum Web3Error {
  // Connection
  WrongChainId = 101,
  NotInstalled = 102,
  ConnectionRefused = 103,
  DisconnectionRefused = 104,

  // Token / NFT
  TokenAlreadyAdded = 201,
  MintFailed = 202,

  // Network
  NetworkAddRefused = 301,
  NetworkChangeRefused = 302,
}

export interface Web3Result<T> {
  success: boolean;
  value?: T;
  error?: Web3Error;
}

export interface NetworkInfo {
  chainId: BigNumberish;
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls: string[]; // ["https://rpc-mumbai.maticvigil.com"],
  blockExplorerUrls: string[]; // ["https://mumbai.polygonscan.com/"],
}
