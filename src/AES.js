
import { AES as _AES, enc } from 'crypto-js';

class AES{

    encrypt = async (message, key) => {
        return _AES.encrypt(message, key).toString();
    }

    decrypt = async (message, key) => {
        return _AES.decrypt(message, key).toString(enc.Utf8);
    }
    
}

export default AES;