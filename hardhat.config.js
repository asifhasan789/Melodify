require("@nomicfoundation/hardhat-toolbox");

const ALCHEMY_API_KEY = "Enter_Your_ALCHEMY_API_KEY";

const SEPOLIA_PRIVATE_KEY =
  "Enter_Your_Private_key";

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