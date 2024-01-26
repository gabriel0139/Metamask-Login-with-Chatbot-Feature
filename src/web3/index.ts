import { ethers, Contract } from 'ethers';
import {
  NetworkInfo,
  Web3Connector,
  Web3Error,
  Web3Instance,
  Web3Result,
} from './types';
import { Y28_CONTRACT_ABI } from './abi';
import {
  ACCESS_CARD_META_URL,
  CONTRACT_ADDRESS,
  SUPPORTED_NETWORKS as SUPPORTED_NETWORKS,
} from './const';
import firebase from 'firebase';

export const Web3Handler: Web3Connector = {
  connectWallet,
  disconnectWallet,
  connected,
  changeNetwork,
};

function connected() {
  return Web3Handler.instance != undefined;
}

function onDisconnected(accounts: any[]) {
  if (accounts.length == 0) {
    firebase
      .auth()
      .signOut()
      .then(() => {
        Web3Handler.disconnectWallet().then((disconnectResult) => {
          if (disconnectResult.success) {
            console.warn('disconnected wallet');
            // this.router.navigateByUrl('/login');
          }
        });
      });
  } else {
    console.log('Account changed');
  }
}

async function connectWallet(): Promise<Web3Result<Web3Instance>> {
  // Check if metamask is installed
  if (window.ethereum != undefined) {
    try {
      // If already logged in, return current wallet
      if (Web3Handler.instance) {
        return {
          success: true,
          value: Web3Handler.instance,
        };
      } else {
        // Connect to the MetaMask EIP-1193 object. This is a standard
        // protocol that allows Ethers access to make all read-only
        // requests through MetaMask.

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const network = await provider.getNetwork();

        // Listen to wallet disconnect
        (window.ethereum as any).on('accountsChanged', onDisconnected);

        // Ensure that we are on a supported network
        try {
          await changeNetwork(SUPPORTED_NETWORKS[0]);
        } catch {}

        // update the instance
        Web3Handler.instance = {
          provider,
          signer,
          network,
        };

        return {
          success: true,
          value: Web3Handler.instance,
        };
      }
    } catch {
      return {
        success: false,
        error: Web3Error.ConnectionRefused,
      };
    }
  }

  return {
    success: false,
    error: Web3Error.NotInstalled,
  };
}

async function disconnectWallet(): Promise<Web3Result<null>> {
  if (connected()) {
    Web3Handler.instance = undefined;
    return {
      success: true,
      value: null,
    };
  }

  return {
    success: false,
    error: Web3Error.DisconnectionRefused,
  };
}

async function addToWallet(id: bigint): Promise<Web3Result<null>> {
  try {
    // wasAdded is a boolean. Like any RPC method, an error may be thrown.
    const wasAdded = await window.ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC721',
        options: {
          address: CONTRACT_ADDRESS, // The address that the token is at.
          id,
        },
      },
    });

    if (wasAdded) {
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        error: Web3Error.TokenAlreadyAdded,
      };
    }
  } catch (error) {
    throw error;
  }
}

async function changeNetwork(network: NetworkInfo): Promise<Web3Result<null>> {
  if (window.ethereum) {
    try {
      // check if the chain to connect to is installed
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: network.chainId }], // chainId must be in hexadecimal numbers
      });

      return {
        success: true,
      };
    } catch (error) {
      try {
        // If no supported network is available, add the default project chain to the metamask wallet
        await addNetwork(network);

        // check if the chain to connect to is installed
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: network.chainId }], // chainId must be in hexadecimal numbers
        });

        return {
          success: true,
        };
      } catch (error) {
        // If the network could not be added, return error
        return {
          success: false,
          error: Web3Error.NetworkAddRefused,
        };
      }
    }
  }

  return {
    success: false,
    error: Web3Error.NotInstalled,
  };
}

async function addNetwork(
  network: NetworkInfo
): Promise<Web3Result<NetworkInfo>> {
  try {
    // Connect to the new network
    await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [{ ...network }],
    });

    return {
      success: true,
      value: network,
    };
  } catch (addError) {
    // console.error(addError)
    return {
      success: false,
      error: Web3Error.NetworkAddRefused,
    };
  }
}
