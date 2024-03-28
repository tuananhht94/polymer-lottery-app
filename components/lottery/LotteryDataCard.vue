<script setup lang="ts">
import { useBalance, useContractEvent } from 'use-wagmi'
import { defaultChain } from '~/config/chain'
import { abi } from '~/config/api'

const config = useRuntimeConfig()
const { data: balance, isLoading: isLoadingBalance, refetch: refetchBalance } = useBalance({
  chainId: defaultChain.id,
  address: `0x${config.public.LOTTERY_CONTRACT_ADDRESS}`,
})
useContractEvent({
  chainId: defaultChain.id,
  address: `0x${config.public.LOTTERY_CONTRACT_ADDRESS}`,
  abi,
  eventName: 'Enter',
  listener: () => {
    refetchBalance()
  },
})
useContractEvent({
  chainId: defaultChain.id,
  address: `0x${config.public.LOTTERY_CONTRACT_ADDRESS}`,
  abi,
  eventName: 'Winner',
  listener: () => {
    refetchBalance()
  },
})
</script>

<template>
  <div class="card">
    <div class="card-body">
      <div>
        <b>Prize: <span v-if="isLoadingBalance">loading...</span>
          <span v-else>{{ balance?.formatted }} {{ balance?.symbol }}</span>
        </b>
      </div>
    </div>
  </div>
</template>
