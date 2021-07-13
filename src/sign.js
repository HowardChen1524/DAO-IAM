
import { Wallet } from '../node_modules/ethers/wallet.js';
// var { Wallet } = require('ethers');

export async function signtx(raw_tx, pk) {
    if (pk.startsWith('0x')) {
        pk = pk.slice(2, pk.length)
    }

    const wallet = new Wallet(pk);
    let signedTx = '0x'

    try {
        signedTx = wallet.sign(raw_tx)
    } catch (error) {
        console.log(error)
    }
    return signedTx
}
