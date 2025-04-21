
/// <reference types="vite/client" />

interface KeplrWindow extends Window {
  keplr?: {
    enable: (chainId: string) => Promise<void>;
    experimentalSuggestChain?: (chainInfo: any) => Promise<void>;
  };
  getOfflineSigner?: (chainId: string) => {
    getAccounts: () => Promise<Array<{ address: string; pubkey: Uint8Array }>>;
  };
}

declare global {
  interface Window extends KeplrWindow {}
}
