import { promises } from 'fs';

const { readFile, writeFile } = promises;

async function getAccounts() {
    const data = JSON.parse(await readFile(global.fileName));
    return data.accounts
}

async function getAccount(id) {
    const data = await getAccounts();
    const account = data.find(account => account.id === parseInt(id));
    if(account){
        return account;
    } 
    throw new error(`account not found`);
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

async function updateAccount(account) {
    let data = JSON.parse(await readFile(global.fileName));
    const index = data.accounts.findIndex(item => item.id == account.id);
    
    if (index === -1) {
        throw new Error(`account not found`);
    }

    data.accounts[index].name = account.name;
    data.accounts[index].balance = account.balance;

    await writeFile(global.fileName, JSON.stringify(data, null, 2));

    return data.accounts[index];
}

async function updateBalance(account) {
    const updatedAccount = await getAccount(account.id);
    updatedAccount.balance = account.balance;
    return await updateAccount(updatedAccount);
}


export default {
    getAccounts,
    insertAccount,
    getAccount,
    deleteAccount,
    updateAccount,
    updateBalance
}