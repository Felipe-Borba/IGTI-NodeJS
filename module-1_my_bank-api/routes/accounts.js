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
        console.log(error);
        res.status(500).send('Sorry, something went wrong');
    }
});

router.get(`/`, async (req, res) => {
    try {
        const data = JSON.parse(await readFile(global.fileName));
        delete data.nextId;

        res.send(data);
    } catch (error) {
        console.log(error);
        res.status(500).send('Sorry, something went wrong');
    }
});

router.get(`/:id`, async (req, res) => {
    try {
        const data = JSON.parse(await readFile(global.fileName));
        const account = data.accounts.find(account => account.id == req.params.id);

        res.send(account);
    } catch (error) {
        console.log(error);
        res.status(500).send('Sorry, something went wrong');
    }
});

router.delete(`/:id`, async (req, res) => {
    try {
        let data = JSON.parse(await readFile(global.fileName));
        data.accounts = data.accounts.filter(account => account.id != req.params.id);
        
        await writeFile(global.fileName, JSON.stringify(data, null, 2));

        res.end();
    } catch (error) {
        console.log(error);
        res.status(500).send('Sorry, something went wrong');
    }
});

router.put(`/`, async (req, res) => {
    try {
        const account = req.body;
        let data = JSON.parse(await readFile(global.fileName));
        const index = data.accounts.findIndex(item => item.id == account.id);

        data.accounts[index] = account;

        await writeFile(global.fileName, JSON.stringify(data, null, 2));

        res.send(account);
    } catch (error) {
        console.log(error);
        res.status(500).send('Sorry, something went wrong');
    }
});

router.patch(`/updateBalance`, async (req, res) => {
    try {
        const account = req.body;
        let data = JSON.parse(await readFile(global.fileName));
        const index =  data.accounts.findIndex(item => item.id == account.id);
        data.accounts[index].balance = account.balance;
        await writeFile(global.fileName, JSON.stringify(data, null, 2));

        res.send(data.accounts[index]);
    } catch (error) {
        console.log(error);
        res.status(500).send('Sorry, something went wrong');
    }
});

export default router;