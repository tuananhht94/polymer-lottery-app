// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Nuxt3 - Wagmi/Web3Modal',
    },
  },
  css: ['bootstrap/dist/css/bootstrap.min.css'],
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      WALLET_CONNECT_PROJECT_ID: process.env.WALLET_CONNECT_PROJECT_ID,
      LOTTERY_CONTRACT_ADDRESS: process.env.LOTTERY_CONTRACT_ADDRESS,
    },
  },
  vite: {
    define: {
      'process.env.DEBUG': false,
    },
  },
})
