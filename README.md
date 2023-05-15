# Introduction

Simple Nft Minter Dapp works on fujinet(Avalanche testnet). It consist of 2 pages. 

```
- Login Page                # user connect his metamask
- NFT Page                  # user can mint nft
```

It's an ERC-721 mint application. User can give necessary info to application then mint nft. There is royalty fee %10 of the nft price. %6 of royalty fee goes to treasury wallet and %4 of %10 royalty fee goes to liqudity wallet.


# Getting Started

 Installation process

   - Download and Install NodeJs LTS version from [NodeJs Official Page](https://nodejs.org/en/download/).
   - Configure .env file. 
      - REACT_APP_PVKEY(private key of your metamask)      # for testing and smart contract deployment
      - REACT_APP_PINATAKEY                                # used for pinata interaction
      - REACT_APP_PINATASECRET                             # used for pinata interaction 
   - ./run.sh file can be used to install and run application.
   -  Metamask installation also need for interaction with dapp.
   - Smart contracts can be deployed locally or fujinet. 
      ```
     deploy to local : npm run  nft_deploydev

     deploy to fujinet : npm run nft_deployfuji

      ```
    

# File Structure

You'll find the following directories:
 
```
.
├── artifacts               # smart contract created files 
├── cache                   # cache for solidity files
├── contracts               # NFT(ERC-721) smart contract
├── public                  # react application public files
├── scripts                 # smart contract deployment script for hardhat environment
├── src                     # react application source files
├── test                    # smart contract test files on hardhat environment
└── README.md

```

# Test

- For smart contract test use following command

   npm run test_contract 

- For backend test use following command

   npm run test


# Staking

Liquidity wallet can be used as staking rewards. To ensure that not to lose money by offering reward, need to set up an algorithm  in a way that ensures the rewards distributed are less than the fees earned from transactions in the pool. This can be achieved by adjusting the percentage of fees charged on transactions to cover the cost of rewards.

- Set a target APR for the liquidity pool
- Set a royalty fee percentage for minting that will cover the cost of rewards and ensure a profit margin above the target APR.
- Monitor the value of the pool and adjust the fee percentage and reward distribution rate as necessary to maintain the target APR and profitability.
- lock-up period can be implemented. So we encourage users to hold their assets  in the pool for a longer period, which will increase the stability of the token price and reduce the risk of price fluctuations


By setting up this algorithm , we can offer daily APR to users without risking our funds.
