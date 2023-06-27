fs = require('fs') ;
const { ethers } = require('ethers') ;
require('dotenv').config() ;
const {swapEthToToken} = require('./modules/swapEthToToken') ;
const {swapTokenToEth} = require('./modules/swapTokenToEth') ;
const {swapTokenToToken} = require('./modules/swapeTokenToToken') ;
const {getBalance} = require('./modules/getBalance') ;
const {getPossibleExchange} = require('./modules/possible_outcome');


const provider = new ethers.JsonRpcProvider(process.env.provider); // Connect to the Ethereum network using a provider


const privateKey = process.env.privateKey; // Create a wallet instance from a private key
const wallet = new ethers.Wallet(privateKey, provider);
const signer = wallet.connect(provider);


const ERC20_ABI = require('./abi/ERC20_ABI.json');

const UNI_SWAP_ROUTER_Address = process.env.Uniswap_v2_Router ;
const UNI_SWAP_ROUTER_ABI = require('./abi/Uniswap_v2_Router_ABI.json') ;
const UNI_SWAP_ROUTER_CONTRACT = new ethers.Contract(UNI_SWAP_ROUTER_Address, UNI_SWAP_ROUTER_ABI, signer) ;

const SUSHI_SWAP_ROUTER_ADDRESS = process.env.SUSHI_SWAP_ROUTER_ADDRESS ;
const SUSHI_SWAP_ROUTER_ABI = require('./abi/SUSHI_SWAP_ROUTER_ABI.json') ;
const SUSHI_SWAP_ROUTER_CONTRACT = new ethers.Contract(SUSHI_SWAP_ROUTER_ADDRESS, SUSHI_SWAP_ROUTER_ABI, signer) ;

const DAI_TOKEN_ADDRESS = process.env.DAI_TOKEN_ADDRESS ;
const DAI_TOKEN_CONTRACT = new ethers.Contract(DAI_TOKEN_ADDRESS, ERC20_ABI, provider) ;

const UNI_TOKEN_ADDRESS = process.env.UNI_TOKEN_ADDRESS;
const UNI_TOKEN_CONTRACT = new ethers.Contract(DAI_TOKEN_ADDRESS, ERC20_ABI, signer);

const WETH_TOKEN_ADDRESS = process.env.WETH_ADDRESS; // WETH Ethereum Address

async function executeFunctions() {
  // await getBalance();
  // console.log("Hello World!");

  // Parameter: {Output Token Address, Amount, Exchange_Router}
  // await swapEthToToken(DAI_TOKEN_ADDRESS, "20", SUSHI_SWAP_ROUTER_CONTRACT);

  // Parameter: {Input Token Address, Amount, Exchange_Router}
  // await swapTokenToEth(UNI_TOKEN_ADDRESS, "5337", UNI_SWAP_ROUTER_CONTRACT);

  // Parameter: {Input Token Address, Output Token Address, Amount, Exchange_Router}
  // await swapTokenToToken(DAI_TOKEN_ADDRESS, UNI_TOKEN_ADDRESS, "27004", SUSHI_SWAP_ROUTER_CONTRACT) ;

  // Parameter: {TOKEN1_ADDRESS, TOKEN2_ADDRESS, AMOUNT, SWAP_ROUTER_Contract}
  // await getPossibleExchange(WETH_TOKEN_ADDRESS, DAI_TOKEN_ADDRESS, "", UNI_SWAP_ROUTER_CONTRACT);
}

// Call the function to execute above functions sequentially
executeFunctions();

// async function checkPossibleProfit() {
//   // The function you want to call every 30 seconds
//   const seed="1";
//   console.log("Case Number", t);
//   t++;
//   const conversion1 = await getPossibleExchange(WETH_TOKEN_ADDRESS, DAI_TOKEN_ADDRESS, seed, UNI_SWAP_ROUTER_CONTRACT);
//   const conversion2 = await getPossibleExchange(DAI_TOKEN_ADDRESS, WETH_TOKEN_ADDRESS, String(conversion1), SUSHI_SWAP_ROUTER_CONTRACT);
//   const conversion3 = await getPossibleExchange(WETH_TOKEN_ADDRESS, DAI_TOKEN_ADDRESS, seed, SUSHI_SWAP_ROUTER_CONTRACT);
//   const conversion4 = await getPossibleExchange(DAI_TOKEN_ADDRESS, WETH_TOKEN_ADDRESS, String(conversion3), UNI_SWAP_ROUTER_CONTRACT);

//   if(Number(conversion2) > Number(seed)){
//     const benifite = Number(conversion2) - Number(seed) ;
//     console.log("Possible Benifite : ", Number(conversion2) - Number(seed)) ;
//   }else if(Number(conversion4) > Number(seed)){
//     const benifite = Number(conversion4) - Number(seed) ;
//     console.log("Possible Benifite : ", Number(conversion2) - Number(seed)) ;
//   }else{
//     console.log("No possible Benefite");
//   }
// }

// function Bot() {
//   setInterval(checkPossibleProfit, 30000); // Call myFunction every 30 seconds (30,000 milliseconds)
// }

// Bot(); // Start calling the function every 30 seconds