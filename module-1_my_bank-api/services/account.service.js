import accountRepository from '../repositories/account.repository.js'
import { promises } from 'fs';

const { readFile, writeFile } = promises;

async function createAccount(account) {
    return await accountRepository.insertAccount(account);
}

async function getAccounts() {
    return await accountRepository.getAccounts();
}

async function getAccount(id) {
    return await accountRepository.getAccount(id);
}

async function deleteAccount(id) {
    return await accountRepository.deleteAccount(id);
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