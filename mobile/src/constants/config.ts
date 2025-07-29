export interface MantraConfig {
  chainId: string;
  rpcUrl: string;
  privateKey: string;
  recipientAddress: string;
  amount: string;
  gasLimit: string;
  gasPrice: string;
}

export const getMantraConfig = (): MantraConfig => {
  return {
    chainId: 'mantra-dukong-1',
    rpcUrl: 'https://rpc.dukong.mantrachain.io',
    privateKey: '55ad5a37f9631b91c4fccab7f9217b1c10c341d66ae3a7898ae2322c73d73315',
    recipientAddress: 'mantra146xll4zwf7xmc8dukn0ht76zx7snvfqvndjfe7',
    amount: '1000000', // 1 OM (6 decimals)
    gasLimit: '2',
    gasPrice: '0.025uom'
  };
};

// Default Mantra testnet configuration
export const MANTRA_TESTNET_CONFIG = {
  chainId: 'mantra-dukong-1',
  rpcUrl: 'https://rpc.dukong.mantrachain.io',
  explorerUrl: 'https://explorer.mantrachain.io/MANTRA-Dukong',
  denom: 'uom', // Micro OM (6 decimals)
  coinDecimals: 6,
  coinMinimalDenom: 'uom',
  coinDenom: 'OM',
  addressPrefix: 'mantra'
};
