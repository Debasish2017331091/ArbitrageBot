// const { ethers } = require('ethers') ;
// require('dotenv').config() ;
// const provider = new ethers.JsonRpcProvider(process.env.INFURA_URL) ;

// const privateKey = process.env.privateKey; // Create a wallet instance from a private key
// const wallet = new ethers.Wallet(privateKey, provider);
// const signer = wallet.connect(provider);

// WETH_ADDRESS = process.env.WETH_ADDRESS ;
// USDT_ADDRESS = process.env.USDT_ADDRESS ;

// ERC20_ABI = require("./abi/ERC20_ABI.json") ;


// UNISWAP_EXC_ADD = process.env.Uniswap_v2_Router ;
// UNISWAP_EXC_ABI = require("./abi/Uniswap_v2_Router_ABI.json") ;
// const swapContract = new  ethers.Contract(UNISWAP_EXC_ADD, UNISWAP_EXC_ABI, provider);
// AMOUNT = ethers.parseEther("10");

// async function estimateGasLimitForTokenSwap() {
//     dexRouterContract = swapContract;
//     tokenInAddress = WETH_ADDRESS;
//     tokenOutAddress = USDT_ADDRESS;
//     tokenInAmount = AMOUNT;
//     tokenOutAmount = 0;
//     userAddress=signer.address;
//     let now = new Date;
//     // Uniswap requires a deadline for the swap. 30 minutes from now expressed as milliseconds since epoch 
//     const deadline = now.setTime(now.getTime() + (30 * 60 * 1000));

//     const gasLimit = await dexRouterContract.estimateGas.swapExactTokensForTokens(
//         tokenInAmount,
//         tokenOutAmount,
//         [
//             tokenInAddress,
//             tokenOutAddress
//         ],
//         userAddress,
//         deadline,
//         {
//             from: userAddress
//         }
//     )
//     return gasLimit.toString()
// }

// const response =  estimateGasLimitForTokenSwap();
// console.log(response);

// async function main(){
//     const gasLimit = await swapContract.estimateGas.swapExactTokensForTokens(WETH, USDT, AMOUNT);
//     // const gasPrice = await provider.getGasPrice();
//     // const transactionFee = ethers.utils.formatEther(gasPrice.mul(gasLimit));
//     // console.log(`Estimated transaction fee: ${transactionFee} ETH`);
// }

// main()

const { ethers } = require('ethers');
require('dotenv').config();
const provider = new ethers.JsonRpcProvider(process.env.INFURA_URL);

const privateKey = process.env.privateKey;
const wallet = new ethers.Wallet(privateKey, provider);
const signer = wallet.connect(provider);

const WETH_ADDRESS = process.env.WETH_ADDRESS;
const USDT_ADDRESS = process.env.USDT_ADDRESS;

const ERC20_ABI = require("./abi/ERC20_ABI.json");

const UNISWAP_EXC_ADD = process.env.Uniswap_v2_Router;
const UNISWAP_EXC_ABI = require("./abi/Uniswap_v2_Router_ABI.json");
const swapContract = new ethers.Contract(UNISWAP_EXC_ADD, UNISWAP_EXC_ABI, provider);
const AMOUNT = ethers.parseEther("10");

async function estimateGasLimitForTokenSwap() {
    const amountOutMin = 0;
    const path = ['0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', USDT_ADDRESS ];;
    to = signer.address;
    const deadline = Math.floor(Date.now() / 1000) + 60 * 1; // 1 minute from now
    const value = ethers.parseEther("10");
    const gasCost = await swapContract.estimateGas.swapExactETHForTokens(
        amountOutMin,
        path,
        to,
        deadline,
        {value}
    ); 
    // const dexRouterContract = swapContract;
    // const tokenInAddress = WETH_ADDRESS;
    // const tokenOutAddress = USDT_ADDRESS;
    // const tokenInAmount = AMOUNT;
    // const tokenOutAmount = 0;
    // const userAddress = signer.address;
    // const now = new Date();
    // const deadline = now.setTime(now.getTime() + (30 * 60 * 1000));

    // const gasLimit = await signer.estimateGas({
    //     to: UNISWAP_EXC_ADD,
    //     data: swapContract.interface.encodeFunctionData('swapExactTokensForTokens', [
    //         tokenInAmount,
    //         tokenOutAmount,
    //         [
    //             tokenInAddress,
    //             tokenOutAddress
    //         ],
    //         userAddress,
    //         deadline
    //     ]),
    // });

    return gasCost;
}

estimateGasLimitForTokenSwap()
    .then(response => console.log(response))
    .catch(error => console.error(error));
