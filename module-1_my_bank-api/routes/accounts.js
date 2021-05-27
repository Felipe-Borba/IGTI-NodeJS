import { error } from 'console';
import express from 'express';
import { promises } from 'fs';

const { readFile, writeFile } = promises;

const router = express.Router();

router.post(`/`, async (req, res, next) => {
    try {
        let account = req.body;

        if (!account.name || !account.balance == null) {
            throw new Error(`name and balance are required`);
        }

        const data = JSON.parse(await readFile(global.fileName));

        account = {
            id: data.nextId++,
            name: account.name,
            balance: account.balance
        };
        data.accounts.push(account);
        await writeFile(global.fileName, JSON.stringify(data, null, 2));

        res.send(account);
        logger.info(`${req.method} ${req.originalUrl} - ${JSON.stringify(account)}`);
    } catch (error) {
        next(error);
    }
});

router.get(`/`, async (req, res, next) => {
    try {
        const data = JSON.parse(await readFile(global.fileName));
        delete data.nextId;

        res.send(data);
        logger.info(`${req.method} ${req.originalUrl}`);
    } catch (error) {
        next(error);
    }
});

router.get(`/:id`, async (req, res, next) => {
    try {
        const data = JSON.parse(await readFile(global.fileName));
        const account = data.accounts.find(account => account.id == req.params.id);

        res.send(account);
        logger.info(`${req.method} ${req.originalUrl}`);
    } catch (error) {
        next(error);
    }
});

router.delete(`/:id`, async (req, res, next) => {
    try {
        let data = JSON.parse(await readFile(global.fileName));
        data.accounts = data.accounts.filter(account => account.id != req.params.id);

        await writeFile(global.fileName, JSON.stringify(data, null, 2));

        res.end();
        logger.info(`${req.method} ${req.originalUrl}`);
    } catch (error) {
        next(error);
    }
});

router.put(`/`, async (req, res, next) => {
    try {
        const account = req.body;

        if (!account.id || !account.name || !account.balance == null) {
            throw new Error(`id, name and balance are required`);
        }

        let data = JSON.parse(await readFile(global.fileName));
        const index = data.accounts.findIndex(item => item.id == account.id);

        if (index === -1) {
            throw new error(`account not found`);
        }

        data.accounts[index] = {
            name: account.name,
            balance: account.balance
        };

        await writeFile(global.fileName, JSON.stringify(data, null, 2));

        res.send(account);
        logger.info(`${req.method} ${req.originalUrl} - ${JSON.stringify(account)}`);
    } catch (error) {
        next(error);
    }
});

router.patch(`/updateBalance`, async (req, res, next) => {
    try {
        const account = req.body;

        if (!account.id ||!account.balance == null) {
            throw new Error(`id and balance are required`);
        }

        let data = JSON.parse(await readFile(global.fileName));
        const index = data.accounts.findIndex(item => item.id == account.id);

        if (index === -1) {
            throw new error(`account not found`);
        }

        data.accounts[index].balance = account.balance;
        await writeFile(global.fileName, JSON.stringify(data, null, 2));

        res.send(data.accounts[index]);
        logger.info(`${req.method} ${req.originalUrl} - ${JSON.stringify(account)}`);
    } catch (error) {
        next(error);
    }
});

router.use((error, req, res, next) => {
    logger.error(`${req.method} ${req.originalUrl} - ${error}`);
    res.status(400).send(`error: ${error.message}`);
    //res.status(500).send('Sorry, something went wrong');
});

export default router;