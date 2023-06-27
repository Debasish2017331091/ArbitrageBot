require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks:{
    hardhat:{
      forking: {
        enabled:true,
        url:'https://eth-mainnet.g.alchemy.com/v2/ub7jtcL4pwc4pKCRalrNUFSby8_9vArv'
      },
      chainId: 1,
    }
  }
};
