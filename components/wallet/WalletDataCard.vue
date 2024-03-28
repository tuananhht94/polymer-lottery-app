<script setup lang="ts">
import { useAccount, useBalance, useContractRead } from 'use-wagmi'
import { adil } from '~/config/adil'
import { abi } from '~/config/api'

const { address } = useAccount()
const { data: balance, isLoading: isLoadingBalance } = useBalance({
  chainId: adil.id,
  address,
})
const config = useRuntimeConfig()
const { data: players } = useContractRead({
  chainId: adil.id,
  address: `0x${config.public.LOTTERY_CONTRACT_ADDRESS}`,
  abi,
  functionName: 'getPlayers',
})
</script>

<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">
        Wallet Data
      </h5>
      <div>
        <p>Number of Players: {{ (players as string[])?.length || 0 }}</p>
      </div>
      <div>
        <p>
          Balance: <span v-if="isLoadingBalance">loading...</span>
          <span v-else>{{ balance?.formatted }} {{ balance?.symbol }}</span>
        </p>
      </div>
    </div>
  </div>
</template>
