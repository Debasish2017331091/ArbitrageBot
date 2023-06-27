const { ethers } = require('ethers');
require('dotenv').config() ;

const {getBalance} = require('./getBalance') ;

const provider = new ethers.JsonRpcProvider(process.env.provider); // Connect to the Ethereum network using a provider

const privateKey = process.env.privateKey; // Create a wallet instance from a private key
const wallet = new ethers.Wallet(privateKey, provider);
const signer = wallet.connect(provider);

const ERC20_ABI = require('../abi/ERC20_ABI.json');

async function swapEthToToken(OUTPUT_TOKEN_ADDRESS, AMOUNT, router){

    console.log("swapeEthToToken is calling")
    
    const amountOutMin = 0;
    const path = ['0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', OUTPUT_TOKEN_ADDRESS ]; // token 1 to WETH token path
    const to = wallet.address;
    const deadline = Math.floor(Date.now() / 1000) + 60 * 1; // 1 minute from now

    const OUTPUT_TOKEN_CONTRACT = new ethers.Contract(OUTPUT_TOKEN_ADDRESS, ERC20_ABI, provider);
    const Output_Token_Name = await OUTPUT_TOKEN_CONTRACT.name();

    try {
        const value = ethers.parseEther(AMOUNT);
        const tx = await router.swapExactETHForTokens(
          amountOutMin,
          path,
          to,
          deadline,
          { value, gasLimit: 30000000 }
        );
        console.log('Transaction hash:', tx.hash);
        await tx.wait();
        console.log(`Swaping from WETH to ${Output_Token_Name} completed!`);
        getBalance();
      } catch (error) {
        console.log(error);
      }
}

module.exports ={swapEthToToken};