require('dotenv').config();
const HDWalletProvider = require('truffle-hdwallet-provider');
const { INFURA_API_KEY_1, INFURA_API_KEY_2, MNEMONIC } = process.env;


module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "5777" // Match any network id
    },
    goerli: {
      provider: () => new HDWalletProvider(MNEMONIC, INFURA_API_KEY_1),
      network_id: '5',
      gas: 2500000,
      gasPrice: 15000000000
      }
  },
  compilers: {
    solc: {
      version: "0.4.24",
    },
  }
};