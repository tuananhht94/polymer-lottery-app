# Polymer lottery app: Cross-chain Proof of NFT
This repository is created to enter the [Quest of Polyverse phase 1 challenge #13](https://github.com/polymerdevs/Quest-Into-The-Polyverse-Phase-1/issues/13).

## Team Members
- @tuananhht94 - Lead Developer
- @juusokaj - Developer

## Description
This application enables a users to bet an amount of native token (ETH) from OP (can be extended with more chains). After a predetermined period or upon reaching a certain funding threshold, the administrator selects a random winner. The reward is distributed to the winner is all fund balance on OP and ERC20 token on Base.

## Resources used
The repo uses the ibc-app-solidity-template as starting point and adds custom contracts Lottery and ACToken that implement the custom logic.

The repo building the dApp UI/UX by:
- Nuxt 3
- Bootstrap 5
- Web3Modal v2
- Wagmi / use-wagmi
- Viem

Additional resources used:
- Hardhat 
- Blockscout 
- Tenderly

## Steps to reproduce

### Setup
Make sure to install the dependencies:
```bash
# yarn
yarn install
```
### Development Server
Start the development server on http://localhost:3000:
```bash
# yarn
yarn dev
```
### Production
Build the application for production:
```bash
# yarn
yarn build
```
### Locally preview production build:
```bash
# yarn
yarn preview
```
Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

### Live version
URL: https://lottery.tuananh.xyz

## Future improvements
Basic functionality was implemented, but the following things can be improved:

- More tests
- Add features:
  * Any user can create a pool with a specific amount of money and request a minimum deposit. The minimum deposit corresponds to one ticket (one ID). Other players can deposit more to obtain more tickets.
  * When the pool is full, it will automatically randomize the issued tickets and select the prize winner (buying more tickets increases the chances).
  * 5-10% of the pool will be transferred to the dApp's wallet, and the dApp will additionally reward a corresponding amount of tokens to the pool.

## License
[MIT License](https://github.com/tuananhht94/polymer-lottery-app/blob/main/LICENSE)
