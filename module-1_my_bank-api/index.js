import express from 'express';
import accountRouter from './routes/accounts.js';
import { promises } from 'fs';

const { readFile, writeFile } = promises;

const app = express();
app.use(express.json());
app.use(`/account`, accountRouter);

app.listen(8080, async () => {
    try {
        await readFile(`accounts.json`);
        console.log(`Json file found`);
    } catch (error) {
        const initialJson = {
            nextId: 1,
            accounts: []
        };
        writeFile(`accounts.json`, JSON.stringify(initialJson)).then(() => {
            console.log(`Json file created`);
        }).catch((err) => {
            console.log(err);
        });
    }
    console.log(`Api Started`);
});
