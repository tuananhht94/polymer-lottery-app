import { defineChain } from 'viem'

export const adil = defineChain({
  id: 123456,
  network: 'ADIL Devnet',
  name: 'ADIL Devnet',
  nativeCurrency: {
    decimals: 18,
    name: 'ADIL',
    symbol: 'ADIL',
  },
  rpcUrls: {
    default: {
      http: ['https://devnet.adilchain-rpc.io'],
      webSocket: ['https://devnet.adilchain-rpc.io'],
    },
    public: {
      http: ['https://devnet.adilchain-rpc.io'],
      webSocket: ['https://devnet.adilchain-rpc.io'],
    },
  },
  blockExplorers: {
    default: { name: 'Explorer', url: 'https://devnet.adilchain-scan.io' },
  },
})
