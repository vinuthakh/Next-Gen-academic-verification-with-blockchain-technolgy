require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.19", // For Certificate.sol and Lock.sol
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.8.19", // For other contracts (if needed)
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545",
      chainId: 1337,
      accounts: [
        "0x6ed6ea118bbd369e3140c219df0cd7314157429733cad641c33f0e5fa5b74658"
      ],
    },
  },
};

