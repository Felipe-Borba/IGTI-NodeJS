import accountService from '../services/account.service.js';


async function createAccount(req, res, next) {
    try {
        let account = req.body;

        if (!account.name || !account.balance == null) {
            throw new Error(`name and balance are required`);
        }

        account = await accountService.createAccount(account);

        res.send(account);
        logger.info(`${req.method} ${req.originalUrl} - ${JSON.stringify(account)}`);
    } catch (error) {
        next(error);
    }
}

async function getAccounts(req, res, next) {
    try {
        res.send(await accountService.getAccounts());
        logger.info(`${req.method} ${req.originalUrl}`);
    } catch (error) {
        next(error);
    }
}

async function getAccount(req, res, next) {
    try {
        res.send(await accountService.getAccount(req.params.id));
        logger.info(`${req.method} ${req.originalUrl}`);
    } catch (error) {
        next(error);
    }
}

async function deleteAccount(req, res, next) {
    try {
        await accountService.deleteAccount(req.params.id);
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

        res.send(await accountService.updateAccount(account));

        logger.info(`${req.method} ${req.originalUrl} - ${JSON.stringify(account)}`);
    } catch (error) {
        next(error);
    }
}

async function updateBalance(req, res, next) {
    try {
        const account = req.body;

        if (!account.id || !account.balance == null) {
            throw new Error(`id and balance are required`);
        }

        res.send(await accountService.updateBalance(account));

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