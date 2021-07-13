
import { encrypt as _encrypt, decrypt as _decrypt } from 'eccrypto'; 



class ECIES{
  encrypt = async (message, pk) => {
    return _encrypt(pk, Buffer.from(message));
  }

  decrypt = async (message, sk) => {
    return _decrypt(sk, message);
  }
}

export default ECIES;