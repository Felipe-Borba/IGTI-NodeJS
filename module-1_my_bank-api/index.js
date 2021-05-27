import express from 'express';
import accountRouter from './routes/accounts.js';
import { promises } from 'fs';
import winston from 'winston';

const { readFile, writeFile } = promises;

global.fileName = `accounts.json`;

const { combine, printf, label, timestamp } = winston.format;
const { Console, File } = winston.transports;
global.logger = winston.createLogger({
    level: 'silly',
    transports: [
        new Console(),
        new File({ filename: `my-bank-api.log` })
    ],
    format: combine(
        label({ label: `my-bank-api` }),
        timestamp(),
        printf(({ level, message, label, timestamp }) => {
            return `${timestamp} [${label}] ${level}: ${message}`;
        })
    )
});


const app = express();
app.use(express.json());
app.use(`/account`, accountRouter);

app.listen(8080, async () => {
    try {
        await readFile(global.fileName);
        logger.info(`Json file found`);
    } catch (error) {
        const initialJson = {
            nextId: 1,
            accounts: []
        };
        writeFile(global.fileName, JSON.stringify(initialJson, null, 2)).then(() => {
            logger.info(`Json file created`);
        }).catch((err) => {
            logger.error(err);
        });
    }
    logger.info(`Api Started on port: 8080`);
});
