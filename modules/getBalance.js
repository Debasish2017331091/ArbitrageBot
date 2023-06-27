const {ethers}=require("ethers")
fs = require('fs');

const provider = new ethers.JsonRpcProvider(process.env.provider); // Connect to the Ethereum network using a provider


const privateKey = process.env.privateKey; // Create a wallet instance from a private key
const wallet = new ethers.Wallet(privateKey, provider);
const signer = wallet.connect(provider);

const ERC20_ABI = require('../abi/ERC20_ABI.json');


async function getETH_Balance() { // Function to query the ETH balance of account
    try {
        const balance = await provider.getBalance(signer.address);
        console.log('ETH Balance:', ethers.formatEther(balance), 'ETH');
    } catch (error) {
        console.error('Error retrieving account ETH balance:', error);
    }
}


async function getUniTokenBalance() { // Function to get the UNI token balance of an account
    try {
        UNI_TOKEN_ADDRESS = process.env.UNI_TOKEN_ADDRESS;
        const UNI_TOKEN_CONTRACT = new ethers.Contract(UNI_TOKEN_ADDRESS, ERC20_ABI, provider); // Create an instance of the token contract
        const balance = await UNI_TOKEN_CONTRACT.balanceOf(signer.address);
        const decimals = 18; // Assuming UNO token has 18 decimals
        const formattedBalance = ethers.formatUnits(balance, decimals);
        console.log('UNI Token Balance:', formattedBalance, 'UNI');
    } catch (error) {
        console.error('Error retrieving UNI token balance:', error);
    }
}


async function getDaiTokenBalance() { // Function to get the DAI token balance of an account
    try {
      const DAI_TOKEN_ADDRESS = process.env.DAI_TOKEN_ADDRESS;
      const dai_token_contract = new ethers.Contract(DAI_TOKEN_ADDRESS, ERC20_ABI, provider);
  
      const balance = await dai_token_contract.balanceOf(signer.address);
      const decimals = 18; // Assuming DA token has 18 decimals
      const formattedBalance = ethers.formatUnits(balance, decimals);
      console.log('DAI Token Balance:', formattedBalance, 'DAI');
      return formattedBalance;
  
    } catch (error) {
      console.error('Error retrieving token balance:', error);
    }
}

async function getBalance(){
    console.log("     Balance Sheet")
    await getETH_Balance();
    await getDaiTokenBalance();
    await getUniTokenBalance();
    console.log("")
}

module.exports ={getBalance};