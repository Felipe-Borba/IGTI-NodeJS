import express from 'express';
import accountRouter from './routes/accounts.js';
import { promises } from 'fs';

const { readFile, writeFile } = promises;

global.fileName = `accounts.json`;

const app = express();
app.use(express.json());
app.use(`/account`, accountRouter);

app.listen(8080, async () => {
    try {
        await readFile(global.fileName);
        console.log(`Json file found`);
    } catch (error) {
        const initialJson = {
            nextId: 1,
            accounts: []
        };
        writeFile(global.fileName, JSON.stringify(initialJson)).then(() => {
            console.log(`Json file created`);
        }).catch((err) => {
            console.log(err);
        });
    }
    console.log(`Api Started`);
});
