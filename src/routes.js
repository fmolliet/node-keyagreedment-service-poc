const { Router } = require('express');

const Controller = require('./Controller')

const routes = Router();

routes.post('/keys', Controller.initialize)


module.exports = routes; 