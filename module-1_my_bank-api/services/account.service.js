import { promises } from 'fs';

const { readFile, writeFile } = promises;

async function createAccount(account) {
    const data = JSON.parse(await readFile(global.fileName));

    account = {
        id: data.nextId++,
        name: account.name,
        balance: account.balance
    };
    data.accounts.push(account);
    await writeFile(global.fileName, JSON.stringify(data, null, 2));

    return account;
}

async function getAccounts() {
    const data = JSON.parse(await readFile(global.fileName));
    delete data.nextId;
    return data;
}

async function getAccount(id) {
    const data = JSON.parse(await readFile(global.fileName));
    return data.accounts.find(account => account.id == parseInt(id));
}

async function deleteAccount(id) {
    let data = JSON.parse(await readFile(global.fileName));
    data.accounts = data.accounts.filter(account => account.id != id);

    await writeFile(global.fileName, JSON.stringify(data, null, 2));
}

async function updateAccount(account) {
    let data = JSON.parse(await readFile(global.fileName));
    const index = data.accounts.findIndex(item => item.id == account.id);

    if (index === -1) {
        throw new error(`account not found`);
    }

    data.accounts[index] = {
        id: account.id,
        name: account.name,
        balance: account.balance
    };

    await writeFile(global.fileName, JSON.stringify(data, null, 2));

    return data.accounts[index];
}

async function updateBalance(account) {
    let data = JSON.parse(await readFile(global.fileName));
    const index = data.accounts.findIndex(item => item.id == account.id);

    if (index === -1) {
        throw new error(`account not found`);
    }

    data.accounts[index].balance = account.balance;
    await writeFile(global.fileName, JSON.stringify(data, null, 2));

    return data.accounts[index];
}

export default {
    createAccount,
    getAccounts,
    getAccount,
    deleteAccount,
    updateAccount,
    updateBalance
}