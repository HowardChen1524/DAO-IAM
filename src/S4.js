import { split, combine } from 'shamirs-secret-sharing'
//var sss = require('shamirs-secret-sharing')


class S4{

    shard = async (split_num, THRES, message) => {
        return split(message, { shares: split_num, threshold: THRES })
    }

    merge = async (shards) => {
        return combine(shards).toString(); 
    }
    
}

/*
    async function test(){
        const s4 = new S4();
        const Ken = Buffer.from('123456')
        const shards = await s4.shard(5,4,Ken)
        console.log(shards)
        for(let i = 0; i < shards.length; i++){
            console.log(shards[i].toString('hex'))
        }
        const recovered = await s4.merge(shards)
        console.log(recovered.toString()) // 'secret key'
    }

    test();
*/
export default S4;
