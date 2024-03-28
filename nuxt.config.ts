// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Polymer AC lottery',
    },
  },
  css: ['bootstrap/dist/css/bootstrap.min.css'],
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      WALLET_CONNECT_PROJECT_ID: process.env.WALLET_CONNECT_PROJECT_ID,
      LOTTERY_CONTRACT_ADDRESS: process.env.LOTTERY_CONTRACT_ADDRESS,
      LOTTERY_CHANNEL_ID: process.env.LOTTERY_CHANNEL_ID,
      LOTTERY_TIMEOUT: process.env.LOTTERY_TIMEOUT,
    },
  },
  vite: {
    define: {
      'process.env.DEBUG': false,
    },
  },
})
