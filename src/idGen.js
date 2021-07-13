import { createHash } from "crypto";
import { getPublic, sign, verify } from "eccrypto";
import { encode } from 'bs58';

// A new random 32-byte private key.
// var privateKey = eccrypto.generatePrivate();
const user_sk = 'c94d682f7fe770baa5af4de2f0d7e934126a0f48b9f52bfb4672189dd4757fe5'; // assume user private key
const privateKey = Buffer.from(user_sk, 'hex'); 
console.log(privateKey.toString('hex'));

// Corresponding uncompressed (65-byte) public key.
const publicKey = getPublic(privateKey); 
const pubKeyHex = publicKey.toString('hex');
console.log(publicKey.toString('hex'));

// generate addr
/**Version
  *公開金鑰雜湊值: 00
  *(Testnet) 公開金鑰雜湊值: 6F
  */
var pkSHA256_1 = createHash('sha256').update(pubKeyHex).digest('hex');
var pkRipemd160 = createHash('rmd160').update(pkSHA256_1).digest('hex');
var pkVersion = "6f" + pkRipemd160;
var pkSHA256_2 = createHash('sha256').update(pkVersion).digest('hex');
var pkSHA256_3 = createHash('sha256').update(pkSHA256_2).digest('hex');
var pkCheckSum = pkVersion + pkSHA256_3.substring(0,8);
var pkCheckSumBytes = Buffer.from(pkCheckSum, 'hex');
const id = encode(pkCheckSumBytes);
console.log(id.toString('hex'));

var msg = "test";
msg = createHash("sha256").update(msg).digest(); // hash message to sign

sign(privateKey, msg).then(function(sig) {
  verify(publicKey, msg, sig).then(function() {
    console.log("Signature is OK");
  }).catch(function() {
    console.log("Signature is BAD");
  });
});

export {id, privateKey, publicKey}

/** assume user keypair & id
  *mgmdUm12qq7jzS2vVfr2WssAx4PW8rrtFD
  *c94d682f7fe770baa5af4de2f0d7e934126a0f48b9f52bfb4672189dd4757fe5
  *04cc902e04bd64bc2383aeb15934aa0b2ccd6c9420b0361edc4142303fddf5ea307be14aa91c851d1204d7ba7369d2a70f4fb94fcdfcc9726f08b46cfb3f310327
  */
 
/** assume commitee keypair
  *46ccd6a835169cd220286fbf690c0418d45f2d696c26940fa6628f3c74e56dd1
  *04e665e0c1b15a2703c29f7b93566a2dd7b35664f828363d72a25796fe5ca7b520c342f5149f2aee7a7fc9b1b793b2a9f61d658370daf1be9ea67e461ebff9d6ce

  *ad96e0f45d45e04b46f5880eae8e916a1c73685251240e8e889470228af40b5d
  *0491b751ce40f7c2f94a2f79c7780f6975d61f1bd4683f79e0103a8b6ae11317bebab8973802fc667d4c46707ef314dfe79d16b2025dd0f0d6b6f2f67bce343975

  *1fda6192f609baf6b68f5e926bf3c3ba679a69f1cd682f22109483dc40fd67d4
  *0433e98029f048a8d0b7b55d786293fede03453d2affe73354ada4adae53ebd1ff6be6c376638eef8e030243c980cb2478b03dc6dfced974cf5a7ee8466f93a557

  *4127d22b91187311368918abf92a93483e5b500f90b08f7b67290d5e027d31d9
  *04126a2ad414792263f2bd710503929b21a81e53410be837c8bc15f73213144fcc1e4f123349a070570eb8ba66eed7a13801577296876ebcb7ad9920590d5ac4b7

  *512193e674553048ed23e2011af9559deb7aa830ea8ffd8e1a1b31afd37d2678
  *0427ff7a403d1b8838361ebdbce094362597763f3d598ca2deb7e3a964f40a858f299138225d602a99928f0cda0e099901fe170b18cce31648a5ae01e1de281577
  */

