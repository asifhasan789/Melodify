require("@nomicfoundation/hardhat-toolbox");

const ALCHEMY_API_KEY = "mv1dYMPRcmFTjVrfgX2c9oQ35KA5rcGs";

const SEPOLIA_PRIVATE_KEY =
  "cff2bb9b923aebcb592dadce865c58e288888acce02c02cb338567a65fb8557a";

module.exports = {
  solidity: "0.8.4",
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [SEPOLIA_PRIVATE_KEY],
    },
  },
  paths: {
    artifacts: "./src/backend/artifacts",
    sources: "./src/backend/contracts",
    cache: "./src/backend/cache",
    tests: "./src/backend/test",
  },
};

// require("@nomiclabs/hardhat-waffle");

// module.exports = {
//   solidity: "0.8.4",
//   paths: {
//     artifacts: "./src/backend/artifacts",
//     sources: "./src/backend/contracts",
//     cache: "./src/backend/cache",
//     tests: "./src/backend/test",
//   },
// };
