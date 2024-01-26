# EcoThreads

## Description

EcoThreads is a (web) application that integrates advanced chatbot capabilities with a secondary Web3 login feature using MetaMask. This application allows users to interact with a sophisticated chatbot, trained on specific data to provide detailed and accurate responses to inquiries about the website/app's design and features. The Web3 login feature utilizes MetaMask to authenticate users, ensuring a secure and seamless user experience. For users needing personalised assistance, the chatbot can redirect them to a live meeting through a provided URL.

## Features

- **Web3 Authentication**: Secure login using MetaMask, checking for installed MetaMask extension and wallet address.
- **Advanced Chatbot**: Leveraging a Large Language Model (LLM) for answering user queries about the app's design and features.
- **Live Support Option**: Option for users to request a live meeting if they need personal assistance.
- **User-Friendly Interface**: Easy-to-navigate UI, ensuring a smooth user experience.

## Enhanced Web3 Authentication

In addition to standard Web3 authentication features, our application includes a network verification step. This ensures that users are connected to the correct blockchain network before they interact with the application.

### Network Verification Feature

- **Network Detection**: On login, the application detects the network of the user's MetaMask wallet.
- **Correct Network Verification**: The application checks if the user is on the desired network (e.g., Ethereum Mainnet).
- **Prompt to Switch Network**: If the user is on a different network, they are prompted to switch to the correct one. The application can guide them to change the network manually or perform the switch automatically with user consent.
- **Seamless User Experience**: This feature enhances user experience by preventing errors due to being on the wrong network and streamlines the process of interacting with the blockchain through our application.

To use this feature, simply log in using your MetaMask wallet. If your wallet is not on the Goerli network, the application will guide you to switch to the correct network for a seamless experience.


## Getting Started

### Prerequisites

- A modern web browser.
- MetaMask extension installed for Web3 features.

### Installation

1. Run 'npm i' or manually install the necessary packages
2. Change the 'environment.prod.template.ts' file to 'environment.prod.ts'.
3. Change the placeholder variables to the necessary values to be able to use your own API key and chatbot model.
4. Install Metamask (https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn).
5. Run Ionic Serve

### How To Disconnect Metamask
6. Disconnect via Metamask to fully logout ('https://www.youtube.com/watch?v=RL7LV5Tlc5c', you can also click the 'Globe' icon to remove the connection to the current site - src\assets\readme\disconnectWallet.png)
