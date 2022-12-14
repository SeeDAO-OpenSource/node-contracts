require("@nomicfoundation/hardhat-toolbox");
require('@openzeppelin/hardhat-upgrades');
require("dotenv").config();
require("./tasks/root");
require("./tasks/whitelist");
require("./tasks/printWhitelist");
 const { setGlobalDispatcher, ProxyAgent } = require('undici')
 const proxyAgent = new ProxyAgent('http://127.0.0.1:7890')
 setGlobalDispatcher(proxyAgent)

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  settings: {
    optimizer: {
      enabled: true,
      runs: 1000,
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_KEY,
  },
  networks: {
    goerli: {
      url: process.env.GOERLI_URL_ALCHEMY,
      accounts: [process.env.GOERLI_PRIVATE_KEY]
    },
    mainnet: {
      url: process.env.MAINNET_URL,
      accounts: [process.env.MAINNET_PRIVATE_KEY]
    },
  },
};
