import { promises } from 'fs';


const { readFile, writeFile } = promises;


async function createAccount(req, res, next) {
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
}

async function getAccounts(req, res, next) {
    try {
        const data = JSON.parse(await readFile(global.fileName));
        delete data.nextId;

        res.send(data);
        logger.info(`${req.method} ${req.originalUrl}`);
    } catch (error) {
        next(error);
    }
}
async function getAccount(req, res, next) {
    try {
        const data = JSON.parse(await readFile(global.fileName));
        const account = data.accounts.find(account => account.id == req.params.id);

        res.send(account);
        logger.info(`${req.method} ${req.originalUrl}`);
    } catch (error) {
        next(error);
    }
}

async function deleteAccount(req, res, next) {
    try {
        let data = JSON.parse(await readFile(global.fileName));
        data.accounts = data.accounts.filter(account => account.id != req.params.id);

        await writeFile(global.fileName, JSON.stringify(data, null, 2));

        res.end();
        logger.info(`${req.method} ${req.originalUrl}`);
    } catch (error) {
        next(error);
    }
}

async function updateAccount(req, res, next) {
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
}

async function updateBalance(req,res, next) {
    try {
        const account = req.body;

        if (!account.id || !account.balance == null) {
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
}


export default {
    createAccount,
    getAccounts,
    getAccount,
    deleteAccount,
    updateAccount,
    updateBalance
}