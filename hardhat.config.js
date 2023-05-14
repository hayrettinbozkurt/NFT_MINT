require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
const fs = require('fs');

const dotenv=require('dotenv');
dotenv.config();


task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
 
    const accounts = await hre.ethers.getSigners();

    for (const account of accounts) {
        console.log(account.address);
    }
});

module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            chainId: 1337
        },

        fuji: {

            url: "https://api.avax-test.network/ext/bc/C/rpc",
            chainId: 43113,
            accounts: ["0x"+process.env.REACT_APP_PVKEY]


        }

    },
    solidity: {
        version: "0.8.9",
        settings: {
            optimizer: {
                enabled: true,
                runs: 200
            }
        }
    }
};