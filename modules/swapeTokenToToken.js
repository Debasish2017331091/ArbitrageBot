const { ethers } = require('ethers');
require('dotenv').config() ;
const {getBalance} = require('./getBalance') ;

// Connect to the Ethereum network using a provider
const provider = new ethers.JsonRpcProvider(process.env.provider);

// Create a wallet instance from a private key
const privateKey = process.env.privateKey;
const wallet = new ethers.Wallet(privateKey, provider);
const signer = wallet.connect(provider);

const ERC20_ABI = require("../abi/ERC20_ABI.json");


async function swapTokenToToken(TOKEN1_ADDRESS, TOKEN2_ADDRESS, AMOUNT, router){

  const TOKEN1_CONTRACT = new ethers.Contract(TOKEN1_ADDRESS, ERC20_ABI, provider);
  const TOKEN2_CONTRACT = new ethers.Contract(TOKEN2_ADDRESS, ERC20_ABI, provider);

  const token1_name = await TOKEN1_CONTRACT.name();
  const token2_name = await TOKEN2_CONTRACT.name();
  const token1_decimals = await TOKEN1_CONTRACT.decimals();
  const token2_decimals = await TOKEN2_CONTRACT.decimals();

  const amountIn = ethers.parseUnits(AMOUNT, token1_decimals); 
  const path = [TOKEN1_ADDRESS, TOKEN2_ADDRESS];
  const amountOutMin = 0;
  const to = wallet.address;
  const deadline = Math.floor(Date.now() / 1000) + 60 * 1; // 1 minute from now

  // Approve Transection
  const approveTx = await TOKEN1_CONTRACT.connect(signer).approve(router.target, amountIn);
  approveTx.wait();
  
  console.log("Approval Successed")

  // Step 2: Swap Token1 to Token2
  const currentNonce = await provider.getTransactionCount(signer.address);
  try {
    const swapTx = await router.connect(signer).swapExactTokensForTokens(
      amountIn,
      amountOutMin,
      path,
      to,
      deadline,
      {
        gasLimit: 1000000,
        nonce: currentNonce ,
      }
    );
    console.log('Swap transaction hash:', swapTx.hash);
    await swapTx.wait();
    console.log(`Swaping From ${token1_name} to ${token2_name} completed!`);
    getBalance();
  } catch (error) {
    console.log("Error",error);
  }
}

module.exports = {swapTokenToToken} ;