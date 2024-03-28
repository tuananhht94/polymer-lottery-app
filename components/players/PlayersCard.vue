<script setup lang="ts">
import { useContractEvent, useContractRead } from 'use-wagmi'
import { defaultChain } from '~/config/chain'
import { abi } from '~/config/api'

const config = useRuntimeConfig()
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
    refetchPlayers()
  },
})
useContractEvent({
  chainId: defaultChain.id,
  address: `0x${config.public.LOTTERY_CONTRACT_ADDRESS}`,
  abi,
  eventName: 'Winner',
  listener: () => {
    refetchPlayers()
  },
})
</script>

<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">
        Players ({{ (players as string[])?.length || 0 }})
      </h5>
      <div v-if="isLoadingPlayers">
        <p>Loading players...</p>
      </div>
      <div v-else>
        <ul>
          <li v-for="player in players as string[]" :key="player">
            {{ player }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
