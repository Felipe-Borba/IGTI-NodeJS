import { promises } from 'fs';

const { readFile, writeFile } = promises;

async function getAccounts() {
    const data = JSON.parse(await readFile(global.fileName));
    return data.accounts
}

async function getAccount(id) {
    const data = getAccounts();
    return data.find(account => account.id === parseInt(id));
}

async function insertAccount(account) {
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

async function deleteAccount(id) {
    let data = JSON.parse(await readFile(global.fileName));
    data.accounts = data.accounts.filter(account => account.id != id);

    await writeFile(global.fileName, JSON.stringify(data, null, 2));
}

export default {
    getAccounts,
    insertAccount,
    getAccount,
    deleteAccount
}