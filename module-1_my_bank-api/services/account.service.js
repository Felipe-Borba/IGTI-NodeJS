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

export default {
    createAccount
}