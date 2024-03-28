<script setup lang="ts">
import {
  useBalance,
  useChainId,
  useContractEvent,
  useContractRead,
  useContractWrite,
  useSwitchNetwork,
} from 'use-wagmi'
import { defaultChain } from '~/config/chain'
import { abi } from '~/config/api'

const config = useRuntimeConfig()
const { data: balance, isLoading: isLoadingBalance, refetch: refetchBalance } = useBalance({
  chainId: defaultChain.id,
  address: `0x${config.public.LOTTERY_CONTRACT_ADDRESS}`,
})
const { data: players, isLoading: isLoadingPlayers, refetch: refetchPlayers } = useContractRead({
  chainId: defaultChain.id,
  address: `0x${config.public.LOTTERY_CONTRACT_ADDRESS}`,
  abi,
  functionName: 'getPlayers',
})
useContractEvent({
  chainId: defaultChain.id,
  address: `0x${config.public.LOTTERY_CONTRACT_ADDRESS}`,
  abi,
  eventName: 'Enter',
  listener: () => {
    refetchBalance()
    refetchPlayers()
  },
})
useContractEvent({
  chainId: defaultChain.id,
  address: `0x${config.public.LOTTERY_CONTRACT_ADDRESS}`,
  abi,
  eventName: 'Winner',
  listener: () => {
    refetchBalance()
    refetchPlayers()
  },
})

const chainId = useChainId()
const { switchNetworkAsync } = useSwitchNetwork({
  chainId: defaultChain.id,
})
const { data, write, isLoading, isSuccess, isError } = useContractWrite({
  chainId: defaultChain.id,
  address: `0x${config.public.LOTTERY_CONTRACT_ADDRESS}`,
  abi,
  functionName: 'pickWinner',
  args: [config.public.LOTTERY_CHANNEL_ID, config.public.LOTTERY_TIMEOUT],
})

async function pickWinner() {
  if (chainId.value !== defaultChain.id)
    await switchNetworkAsync()

  write()
}
</script>

<template>
  <div class="card">
    <div class="card-body">
      <div>
        <p>
          Prize: <span v-if="isLoadingBalance">loading...</span>
          <span v-else>{{ balance?.formatted }} {{ balance?.symbol }}</span>
        </p>
        <p>
          Number of players: <span v-if="isLoadingPlayers">loading...</span>
          <span v-else>{{ (players as string[])?.length || 0 }}</span>
        </p>
        <button class="btn btn-dark" :disabled="(players as string[])?.length === 0 || isLoading" @click="pickWinner">
          Pick winner!
        </button>
        <div>
          <div v-if="isLoading">
            <p>Your transaction is being confirmed, please wait!</p>
          </div>
          <div v-if="isSuccess" class="transaction">
            <a :href="`${defaultChain.blockExplorers.default.url}/tx/${data?.hash}`" target="_blank">
              Click here and check your transaction
            </a>
            <p>Hash: {{ data?.hash }}</p>
          </div>
          <div v-if="isError" class="transaction">
            <p>Transaction failed!</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
