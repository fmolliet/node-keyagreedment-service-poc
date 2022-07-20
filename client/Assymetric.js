const {
    generateKeyPairSync,
    createPublicKey,
    createPrivateKey
  } = require('crypto');
  const fs = require('fs');
const superagent     = require('superagent');
const jose = require('jose');

(async ()=>{

    
    const exportParams = {
        type: 'spki',
        format: 'pem'
    };
    // Generate pair key
    
    const { privateKey, publicKey } = generateKeyPairSync('rsa', {
        modulusLength: 4096,
    });
    
    // Loads public key
    const public = createPublicKey(fs.readFileSync('resources\\publicKey.pem').toString('utf8'));
    
    // generate JWE
    const jwe = await new  jose.CompactEncrypt(new TextEncoder().encode(publicKey.export(exportParams).toString('utf8')))
        .setProtectedHeader({ alg: 'RSA-OAEP-256', enc: 'A256GCM' })
        .encrypt(public)
        
    
    try {
        const res = await superagent
            .post('http://localhost:3000/assymetric/keys')
            .set('Content-Type', 'application/json')
            .send({ cipherData: jwe }) // sends a JSON post body
            .set('Accept', 'application/json')
        
        //console.log(res.body);
            
        const { plaintext, protectedHeader } = await jose.compactDecrypt(res.body.jwe, privateKey);
        console.log("================= CHHAVE OBTIDA =============");
        console.log(Buffer.from(plaintext).toString('utf8'))

        
    } catch (err) {
        console.error(err);
    }
    
})();