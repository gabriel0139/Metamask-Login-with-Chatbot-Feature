import { NetworkInfo, Web3Error } from "./types"

export const CONTRACT_ADDRESS = "0x97ee03fec477ef808F5a8bBBd624d48f15a2375f" // DeployContract(Web3Handler.instance, Y28_CONTRACT_ABI.abi, Y28_CONTRACT_ABI.bytecode, "{--YOUR-WALLET-ADDRESS--}")
export const ACCESS_CARD_META_URL = 'https://ipfs.io/ipfs/QmQXPFnbMrbZWAzXZHxPEv6nViD3dQA9voAupYkkBzMapk'
export const SUPPORTED_NETWORKS: NetworkInfo[]  = [
    {
        chainId: "0x5",
        chainName: "Goerli Testnet",
        nativeCurrency: {
            name: "ETH",
            symbol: "ETH",
            decimals: 18,
        },
        rpcUrls: ["https://eth-goerli.api.onfinality.io/public"],
        blockExplorerUrls: ["https://goerli.etherscan.io/"],
    }
]

export const WEB3_ERROR_MESSAGES: {[key in Web3Error]: string} = {
    // Connection Errors
    [Web3Error.WrongChainId]: 'Wrong chain id, please connect with the goerli network (chain id: 5)',
    [Web3Error.NotInstalled]: 'Metamask not installed',
    [Web3Error.ConnectionRefused]: 'Wrong chain id, please connect with the goerli network (chain id: 5)', 
    [Web3Error.DisconnectionRefused]: 'Cannot disconnect when not connected can we',

    // Token / NFT Errors
    [Web3Error.TokenAlreadyAdded]: 'Token already added',
    [Web3Error.MintFailed]: 'Failed to mint access key',
    
    // Networks
    [Web3Error.NetworkAddRefused]: 'Refused to add network',
    [Web3Error.NetworkChangeRefused]: 'Refused to switch network'
}
