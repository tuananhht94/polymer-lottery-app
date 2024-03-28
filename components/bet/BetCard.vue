<script setup lang="ts">
import { useAccount, useChainId, useContractWrite, useSwitchNetwork } from 'use-wagmi'
import { parseEther } from 'viem'
import { defaultChain } from '~/config/chain'
import { abi } from '~/config/api'

const { isConnected } = useAccount()
const chainId = useChainId()
const { switchNetworkAsync } = useSwitchNetwork({
  chainId: defaultChain.id,
})
const config = useRuntimeConfig()
const { data, write, isLoading, isSuccess, isError } = useContractWrite({
  chainId: defaultChain.id,
  address: `0x${config.public.LOTTERY_CONTRACT_ADDRESS}`,
  abi,
  functionName: 'enter',
  value: parseEther('0.1'),
})

async function bet() {
  if (chainId.value !== defaultChain.id)
    await switchNetworkAsync()

  write()
}
</script>

<template>
  <div class="card">
    <div class="card-body">
      <div class="row g-0">
        <div class="col">
          <div class="bet">
            <div v-if="isConnected">
              <p>Bet Amount: 0.1 ETH</p>
              <button class="btn btn-dark" :disabled="isLoading" @click="bet">
                Bet!
              </button>
            </div>
            <div v-else>
              <div class="alert alert-warning">
                <span>You need to connect your wallet</span>
              </div>
              <p>Bet Amount: 0.1 ETH</p>
            </div>
            <div class="lottery">
              <div v-if="isLoading">
                <p>Your transaction is being confirmed, please wait!</p>
              </div>
              <div v-if="isSuccess" class="transaction">
                <p>Your bet has been placed successfully!</p>
                <a :href="`${defaultChain.blockExplorers.default.url}/tx/${data?.hash}`" target="_blank">
                  Click here and check your transaction
                </a>
                <p>Hash: {{ data?.hash }}</p>
              </div>
            </div>
            <div v-if="isError" class="transaction">
              <p>Transaction failed!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
