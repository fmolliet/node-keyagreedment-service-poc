const crypto = require('crypto');

const namedCurve = 'prime256v1';
const { publicKey, privateKey } = crypto.generateKeyPairSync('ec', { namedCurve  });
const ecdh = crypto.createECDH(namedCurve);
ecdh.generateKeys();
//ecdh.setPrivateKey(Buffer.from(privateKey.export({format:"der", type:"pkcs8"}).toString("hex")),);

const publicKeyDer = publicKey.export({ type: 'spki', format: 'der' }).toString('hex');
//ecdh.computeSecret(Buffer.from(publicKeyDer, "hex"))
console.log(publicKeyDer)


//console.log("Chave pública gerada (RAW): 3059301306072a8648ce3d020106082a8648ce3d030107034200", publicKeySpki);