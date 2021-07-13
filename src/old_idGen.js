import bs58 from 'bs58'
import {createHash, randomBytes} from 'crypto'
import secp256k1 from 'secp256k1'

const msg = randomBytes(32);

// generate privKey
/*
let privKey;
do {
  privKey = randomBytes(32)
} while (!secp256k1.privateKeyVerify(privKey));)
*/
//const privKeyHex = Buffer.from(privKey).toString('hex');

const privKeyHex = "513ed9485d1b68b2fa2fb5b5debeb43a8b97df737e7cc96ffaade8cb40205968"
let privKey = Buffer.from(privKeyHex, 'hex');
console.log(privKeyHex)

// generate pukKey
const pubKey = secp256k1.publicKeyCreate(privKey);
const sigObj = secp256k1.ecdsaSign(msg, privKey);
console.log(secp256k1.ecdsaVerify(sigObj.signature, msg, pubKey));
const pubKeyHex = Buffer.from(pubKey).toString('hex');
//const pubKeyHex = "03b11df1c8e3b80b217ace84a97514c166280f015eecc51a8bc51848bd3b5a7069";
console.log(pubKeyHex.length)

// generate addr
let pkSHA256_1 = createHash('sha256').update(pubKeyHex).digest('hex');
let pkRipemd160 = createHash('rmd160').update(pkSHA256_1).digest('hex');
/**Version
  *公開金鑰雜湊值: 00
  *(Testnet) 公開金鑰雜湊值: 6F
  */
let pkVersion = "6f" + pkRipemd160;
let pkSHA256_2 = createHash('sha256').update(pkVersion).digest('hex');
let pkSHA256_3 = createHash('sha256').update(pkSHA256_2).digest('hex');
let pkCheckSum = pkVersion + pkSHA256_3.substring(0,8);
let pkCheckSumBytes = Buffer.from(pkCheckSum, 'hex');
const id = bs58.encode(pkCheckSumBytes);
console.log(id);

export default id;