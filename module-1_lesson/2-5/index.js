import express from 'express';
import winston from 'winston';

const app = express();
app.use(express.json());

const { combine, printf, label, timestamp } = winston.format;
const { Console, File } = winston.transports;
const logger = winston.createLogger({
    level: 'silly',
    transports: [
        new Console(),
        new File({ filename: 'my-log.log' })
    ],
    format: combine(
        label({ label: 'my-app' }),
        timestamp(),
        printf(({ level, message, label, timestamp }) => {
            return `${timestamp} [${label}] ${level}: ${message}`;
        })
    )
});

logger.error('error log');
logger.warn('warn log');
logger.info('info log');
logger.verbose('verbose log');
logger.debug('debug log');
logger.silly('silly log');

logger.log('info', 'log with parameter');


app.listen(3000, () => {
    console.log('Server Started!');
});