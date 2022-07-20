const { privateDecrypt, publicEncrypt, createPrivateKey, createPublicKey, generateKeyPairSync} = require("crypto");
const path = require("path");
const fs = require("fs");
const jose = require('jose');

class AssymetricService {
    
    exportPublicParams = {
        type: 'spki',
        format: 'pem'
    };
    
    exportPrivatePrams = {
        type: 'pkcs8',
        format: 'pem',
    }
    
    staticPrivateKey = '';
    
    constructor(){
        // Loads Static Private Key 
        this.staticPrivateKey = createPrivateKey({ 
            key: fs.readFileSync('resources\\privateKey.pem').toString('utf8'),
            type: 'pkcs8',
            format: 'pem',
            passphrase: '1234'
        });
    }
    
    
    async keyAgreedment( jweData ){
        // Open JWT
        const { plaintext, protectedHeader } = await this.openJWE( jweData )
        
        const clientPublicKey = Buffer.from( plaintext).toString('utf8');
        
        
        const { privateKey, publicKey } = this.generateKeyPair();
        
        // generate JWE
        const jwe = await new  jose.CompactEncrypt(new TextEncoder().encode(publicKey.export(this.exportPublicParams).toString('utf8')))
            .setProtectedHeader({ alg: 'RSA-OAEP-256', enc: 'A256GCM' })
            .encrypt(createPublicKey(clientPublicKey));
            
        console.log( publicKey.export(this.exportPublicParams).toString('utf8') )
        
        return {
            privateKey      : privateKey.export(this.exportPrivatePrams).toString('utf8'),
            publicKey       : publicKey.export(this.exportPublicParams).toString('utf8'),
            clientPublicKey : clientPublicKey,
            jwe             : jwe,
        };
    }
    
    generateKeyPair(){
        return generateKeyPairSync('rsa', {
            modulusLength: 4096,
        });
    }
    
    async openJWE( jweData ){
        return await jose.compactDecrypt(jweData, this.staticPrivateKey);
    }

    
    
    
    encryptStringWithRsaPublicKey (toEncrypt, publicKey) {
        // var absolutePath = path.resolve(relativeOrAbsolutePathToPublicKey);
        // var publicKey = fs.readFileSync(absolutePath, "utf8");
        var buffer = Buffer.from(toEncrypt);
        var encrypted = publicEncrypt(publicKey, buffer);
        return encrypted.toString("base64");
    };
    
    decryptStringWithRsaPrivateKey (toDecrypt, privateKey) {
        // var absolutePath = path.resolve(relativeOrAbsolutePathtoPrivateKey);
        // var privateKey = fs.readFileSync(absolutePath, "utf8");
        var buffer = Buffer.from(toDecrypt, "base64");
        var decrypted = privateDecrypt(privateKey, buffer);
        return decrypted.toString("utf8");
    };
}

module.exports = new AssymetricService();