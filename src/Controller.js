const { randomBytes } = require('crypto')

const cipherService = require('./services/CipherService');
const assymetricService = require('./services/AssymetricService');
const cacheService  = require('./services/CacheService');

class Controller {
    
    async initialize( req, res ){
        
        console.log(req.body)
        
        if ( !req.body && !req.body.clientPublicKey ){
            res.status(400).json({message:"Invalid body"});
        }
        
        try {
            const { clientPublicKey } = req.body;
            
            const { cryptogram, serverPublicKey } = await cipherService.keyAgreedment(clientPublicKey);
            
            const contextId = randomBytes(32).toString('base64');
            
            await cacheService.set(contextId, cryptogram);
            
            console.log( cryptogram );
            
            return res.json({ serverPublicKey, contextId }).status(200);
        } catch(err){
            return res.status(500).send({message: err.message});
        }
    }
    
    async assymetricKeyExchange( req, res ){
        console.log("================ INPUT: =================\n" );
        console.log(req.body);
        
        if ( !req.body && !req.body.cipherData ){
            res.status(400).json({message:"Invalid body"});
        }
        
        try {
            const { cipherData } = req.body;
            
            const { privateKey, publicKey, clientPublicKey, jwe } = await assymetricService.keyAgreedment(cipherData);
            
            
            const output = {   privateKey, publicKey, clientPublicKey, jwe };
            
            console.log("================ OUTPUT: =================\n")
            console.log(output);
            return res.json(output).status(200);
        } catch(err){
            return res.status(500).send({message: err.message});
        }
    }
    
    async assymetricTest(req, res ){
        
    }
    
    async getKey( req, res ){
        if ( req.body || req.body.clientPublicKey ){
            res.status(400).json({message:"Invalid body"});
        }
    }
}

module.exports = new Controller();