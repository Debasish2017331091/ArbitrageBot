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

  // Connect to the Ethereum network using a provider
  const provider2 = new ethers.JsonRpcProvider("https://mainnet.infura.io/v3/9093bd8eead64e47b800837c5432977e");;

  // Get the current gas price
  const balance = await provider2.getGasPrice();

  console.log("Balance: "+balance+" ETH");
  // console.log("Hello World!");

  // Parameter: {Output Token Address, Amount, Exchange_Router}
  // await swapEthToToken(DAI_TOKEN_ADDRESS, "100", SUSHI_SWAP_ROUTER_CONTRACT);

  // Parameter: {Input Token Address, Amount, Exchange_Router}
  // await swapTokenToEth(DAI_TOKEN_ADDRESS, "1000", UNI_SWAP_ROUTER_CONTRACT);

  // Parameter: {Input Token Address, Output Token Address, Amount, Exchange_Router}
  // await swapTokenToToken(DAI_TOKEN_ADDRESS, WETH_TOKEN_ADDRESS, "1000", SUSHI_SWAP_ROUTER_CONTRACT) ;

  // Parameter: {TOKEN1_ADDRESS, TOKEN2_ADDRESS, AMOUNT, SWAP_ROUTER_Contract}
  // await getPossibleExchange(WETH_TOKEN_ADDRESS, DAI_TOKEN_ADDRESS, "", UNI_SWAP_ROUTER_CONTRACT);
}

// Call the function to execute above functions sequentially
executeFunctions();

async function checkPossibleProfit() {
  // The function you want to call every 30 seconds
  const investment="100";
  console.log("Buy DAI From Uniswap and Sell in SushiSwap \n");
  const outcome_1 = await getPossibleExchange(WETH_TOKEN_ADDRESS, DAI_TOKEN_ADDRESS, investment, UNI_SWAP_ROUTER_CONTRACT); // buy from uniswap exchange
  const outcome_2 = await getPossibleExchange(DAI_TOKEN_ADDRESS, WETH_TOKEN_ADDRESS, String(outcome_1), SUSHI_SWAP_ROUTER_CONTRACT); // sell in sushiswap exchange
  const profit_1 = Number(outcome_2)-Number(investment);
  console.log("Buy DAI From SushiSwap and Sell in Uniswap \n");
  const outcome_3 = await getPossibleExchange(WETH_TOKEN_ADDRESS, DAI_TOKEN_ADDRESS, investment, SUSHI_SWAP_ROUTER_CONTRACT); // buy from sushiswap exchange
  const outcome_4 = await getPossibleExchange(DAI_TOKEN_ADDRESS, WETH_TOKEN_ADDRESS, String(outcome_3), UNI_SWAP_ROUTER_CONTRACT); // sell in uniswap exchange
  const profit_2 = Number(outcome_4)-Number(investment);
  
  if(profit_1>0){
    console.log("Buy DAI From Uniswap and Sell in SushiSwap is profitable \n");
    console.log("Possible Profite is "+ profit_1 + " ETH");
  }else if(profit_2>0){
    console.log("Buy DAI From SushiSwap and Sell in Uniswap is profitable \n");
    console.log("Possible Profite is "+ profit_2 + " ETH");
  }else{
    console.log("Soryy! No possibility of profit \n");
  }
  if(profit_1>profit_2){
    await swapEthToToken(DAI_TOKEN_ADDRESS, investment, UNI_SWAP_ROUTER_CONTRACT);
    await swapTokenToEth(DAI_TOKEN_ADDRESS, String(outcome_1), SUSHI_SWAP_ROUTER_CONTRACT);
  }else{
    await swapEthToToken(DAI_TOKEN_ADDRESS, investment, SUSHI_SWAP_ROUTER_CONTRACT);
    await swapTokenToEth(DAI_TOKEN_ADDRESS, String(outcome_3), UNI_SWAP_ROUTER_CONTRACT);
  }
}

// checkPossibleProfit();

// function Bot() {
//   setInterval(checkPossibleProfit, 30000); // Call myFunction every 30 seconds (30,000 milliseconds)
// }

// Bot(); // Start calling the function every 30 seconds