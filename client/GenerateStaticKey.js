const crypto = require("crypto");
const fs = require("fs");

const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 4096,
    publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
        cipher: 'aes-256-cbc',
        passphrase: '1234'
      }
});


console.log(privateKey)
fs.writeFileSync('resources/privateKeySeg.pem', privateKey)
console.log(publicKey)
fs.writeFileSync('resources/publicKeySeg.pem', publicKey)
