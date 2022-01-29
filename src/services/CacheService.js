const NodeCache = require( "node-cache" );

class CacheService { 
    client  = new NodeCache();
    
    async set(key, value){
        return Promise.resolve(this.client.set(`key:${key}`,value));
    }
    
    async get( key ){
        return this.client.get(`key:${key}`);
    }
}

module.exports = new CacheService();