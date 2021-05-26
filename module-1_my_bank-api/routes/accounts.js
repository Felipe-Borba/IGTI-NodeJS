import express from 'express';
import { promises } from 'fs';

const { readFile, writeFile } = promises;

const router = express.Router();

router.post(`/`, async (req, res) => {
    try {
        let account = req.body;
        const data = JSON.parse(await readFile(global.fileName));

        account = { id: data.nextId++, ...account };
        data.accounts.push(account);
        await writeFile(global.fileName, JSON.stringify(data, null, 2));

        res.send(account);
    } catch (error) {
        console.log(err);
        res.status(500).send('Sorry, something went wrong');
    }
});

router.get(`/`, async (req, res) => {
    try {
        const data = JSON.parse(await readFile(global.fileName));
        delete data.nextId;

        res.send(data);
    } catch (error) {
        console.log(err);
        res.status(500).send('Sorry, something went wrong');
    }
});


export default router;