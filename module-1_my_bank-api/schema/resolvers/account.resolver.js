import accountRepository from '../../repositories/account.repository.js'


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
    return await accountRepository.updateAccount(account);
}

async function updateBalance(account) {
    return await accountRepository.updateBalance(account);
}

export default {
    createAccount,
    getAccounts,
    getAccount,
    deleteAccount,
    updateAccount,
    updateBalance
}