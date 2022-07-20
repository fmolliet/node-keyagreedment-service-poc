const { privateDecrypt, publicEncrypt } = require("crypto");

function encryptStringWithRsaPublicKey (toEncrypt, publicKey) {
    // var absolutePath = path.resolve(relativeOrAbsolutePathToPublicKey);
    // var publicKey = fs.readFileSync(absolutePath, "utf8");
    var buffer = Buffer.from(toEncrypt);
    var encrypted = publicEncrypt(publicKey, buffer);
    return encrypted.toString("base64");
};

function decryptStringWithRsaPrivateKey (toDecrypt, privateKey) {
    // var absolutePath = path.resolve(relativeOrAbsolutePathtoPrivateKey);
    // var privateKey = fs.readFileSync(absolutePath, "utf8");
    var buffer = Buffer.from(toDecrypt, "base64");
    var decrypted = privateDecrypt(privateKey, buffer);
    return decrypted.toString("utf8");
};

module.exports = { encryptStringWithRsaPublicKey, decryptStringWithRsaPrivateKey }