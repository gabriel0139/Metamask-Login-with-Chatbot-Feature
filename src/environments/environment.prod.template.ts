// Rename this file to environment.prod.ts

import { Eip1193Provider } from 'ethers';

export const environment = {
  production: true,
  openai_api_key: '<OPENAI_API_KEY>',
  open_ai_model: '<OPENAI_MODEL>',
};

declare global {
  interface Window {
    ethereum?: Eip1193Provider;
  }
}
