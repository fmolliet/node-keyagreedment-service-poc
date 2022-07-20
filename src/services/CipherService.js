const { createECDH } = require('crypto');

class CipherService {
    
    async keyAgreedment( clientPublicKey ){
       
        const crypto = createECDH('secp521r1');
        const serverPublicKey = crypto.generateKeys();
        
        const cryptogram = crypto.computeSecret(Buffer.from(clientPublicKey, 'hex'));
        
        return {
            cryptogram      : cryptogram.toString('hex'),
            serverPublicKey : serverPublicKey.toString('hex')
        };
    }
}

module.exports = new CipherService();