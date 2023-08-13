const { createECDH } = require('crypto');

class CipherService {
    
    async keyAgreedment( clientPublicKey ){
       
        const crypto = createECDH('secp256k1');
        const serverPublicKey = crypto.generateKeys();
        
        const cryptogram = crypto.computeSecret(Buffer.from(clientPublicKey, 'hex'));
        
        return {
            cryptogram      : cryptogram.toString('hex'),
            serverPublicKey : serverPublicKey.toString('hex')
        };
    }
}

module.exports = new CipherService();