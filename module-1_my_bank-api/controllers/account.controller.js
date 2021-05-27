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

export default {
    createAccount
}