const { ethers } = require('ethers');
fs = require('fs') ;
require('dotenv').config() ;

const provider = new ethers.JsonRpcProvider(process.env.provider); // Connect to the Ethereum network using a provider

const ERC20_ABI = require("../abi/ERC20_ABI.json");

async function getPossibleExchange(TOKEN1_ADDRESS, TOKEN2_ADDRESS, AMOUNT, router) {

    const TOKEN1_CONTRACT = new ethers.Contract(TOKEN1_ADDRESS, ERC20_ABI, provider);
    const TOKEN2_CONTRACT = new ethers.Contract(TOKEN2_ADDRESS, ERC20_ABI, provider);  
  
    const [token1_Decimals, token1_Symbol, token2_Symbol] = await Promise.all([ // Get the decimals and symbols of the tokens
      TOKEN1_CONTRACT.decimals(),
      TOKEN1_CONTRACT.symbol(),
      TOKEN2_CONTRACT.symbol()
    ]);
  
    const token1_Amount = ethers.parseUnits(AMOUNT, token1_Decimals); // Set the amount of TOKEN1 used for the conversion
  
    const tokenPath = [TOKEN1_ADDRESS, TOKEN2_ADDRESS]; // Specify the token path for the conversion (TOKEN1 to TOKEN2)

    const amounts = await router.getAmountsOut(token1_Amount, tokenPath); // Get the amounts out from Uniswap
  
    const from = await TOKEN1_CONTRACT.name();
    const to = await TOKEN2_CONTRACT.name();
    const temp1 = ethers.formatUnits(amounts[0]);
    const temp2 = ethers.formatUnits(amounts[1]);

    console.log(`BEST POSSIBE EXCHANGES from ${from} to ${to} is : ${temp1} ${token1_Symbol} = ${temp2} ${token2_Symbol}`);
    
    return temp2;
  }

  module.exports={getPossibleExchange};