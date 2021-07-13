// Overwrite metamask v0.2 for our version 1.0. 
//1.0 let's use async and await instead of promises 
import Web3 from 'web3';

if (window.web3) {
  var web3 = new Web3(window.ethereum);
} else {
  console.warn("Metamask not found. Install or enable Metamask.");
}
if (window.ethereum) {
  web3 = new Web3(window.ethereum);
  try { 
     window.ethereum.enable().then(function() {
         // User has allowed account access to DApp...
     });
  } catch(e) {
     // User has denied account access to DApp...
  }
}
// Legacy DApp Browsers
else if (window.web3) {
   web3 = new Web3(window.web3.currentProvider);
}
// Non-DApp Browsers
else {
   alert('You have to install MetaMask !');
}
/*
 if (typeof web3 !== 'undefined') {
    web3 = new Web3(window.web3.currentProvider);
    console.log(111)
  } else {
    const INFURA_API_KEY = '470106ff26124cd89ae792b357d4b170';
    web3 = new Web3('https://ropsten.infura.io/v3/' + INFURA_API_KEY);
    console.log(222);
  }
*/
 export default web3;