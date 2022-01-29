const { createECDH } = require('crypto');
const superagent     = require('superagent');

(async ()=>{
    const crypto = createECDH('secp521r1');
    const publicKey = crypto.generateKeys();
    console.log()
    
    try {
        const res = await superagent
            .post('http://localhost:3000/keys')
            .set('Content-Type', 'application/json')
            .send({ clientPublicKey:  publicKey.toString("hex") }) // sends a JSON post body
            .set('Accept', 'application/json')
        
        console.log(res.body);
            
        const secret = crypto.computeSecret(Buffer.from(res.body.serverPublicKey,'hex'));
        console.log(secret.toString('hex'));
        
    } catch (err) {
        console.error(err);
    }
    
})();