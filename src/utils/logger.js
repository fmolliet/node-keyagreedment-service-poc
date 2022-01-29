  
const winston = require('winston');
const { SPLAT } = require( 'triple-beam');

const { printf, combine, label } = winston.format;

const processLabel = 'core';
const delimiter = ' | ';

const myFormat = printf((info) => {
    const splat = info[SPLAT] || [];

    const rest = splat
        .map((element, index) => {
            if (typeof element === 'object') 
                element = JSON.stringify(element);
            
            return index === 0 ? delimiter + element : String(element);
        })
        .join(delimiter);

    return `[${info.label}] [${info.level}] [${new Date().toLocaleString(
        'pt-BR',
        {
            hour12: false,
        }
    )}]: ${info.message}${rest}`;
});

const logger = winston.createLogger({
    level: process.env.LOG_LEVEL,
    format: combine(label({ label: processLabel }), myFormat),
    transports: [
        new winston.transports.Console({ level: process.env.LOG_LEVEL }),
    ],
});

module.exports = logger;