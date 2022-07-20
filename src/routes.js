const { Router } = require('express');

const Controller = require('./Controller')

const routes = Router();

routes.post('/symetric/keys', Controller.initialize)
    .post('/assymetric/keys', Controller.assymetricKeyExchange)
    .post('/assymetric/test', Controller.assymetricTest)


module.exports = routes; 