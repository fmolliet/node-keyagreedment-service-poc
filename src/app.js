const express  = require('express');
const actuator = require('express-actuator')
const cors     = require('cors');
const morgan   = require('morgan');

require('dotenv').config();

const app = express();

const routes = require('./routes');

app.use(cors());
app.use(morgan(':remote-addr - ":method :url HTTP/:http-version" :status :res[content-length] - :response-time ms ":referrer" ":user-agent"'));
//app.use(morgan('tiny'));
app.use(express.json());
  
app.use(routes);  
app.use(actuator);

module.exports = app;