<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <div class="title">
        <h1>Lottery dApp</h1>
        <span>TESTNET</span>
      </div>
      <CommonConnectButton />
    </div>
  </nav>
</template>

<style>
.title {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title span {
  background-color: red;
  color: white;
  font-weight: bold;
  border-radius: 10px;
  padding: 5px;
}
</style>
