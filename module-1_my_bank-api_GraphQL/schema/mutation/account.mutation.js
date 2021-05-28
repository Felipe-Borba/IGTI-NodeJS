import { GraphQLBoolean, GraphQLInt } from "graphql";
import accountService from "../../services/account.service.js";
import Account from "../type/Account.js";
import AccountInput from "../type/AccountInput.js";


const accountMutation = {
    createAccount: {
        type: Account,
        args: {
            account: {
                name: "account",
                type: AccountInput
            }
        },
        resolve(_, args) {
            return accountService.createAccount(args.account);
        }
    },   
    deleteAccount: {
        type: GraphQLBoolean,
        args: {
            id: {
                name: "id",
                type: GraphQLInt
            }
        },
        resolve(_, args) {
            return accountService.deleteAccount(args.id);
        }
    },
    updateAccount: {
        type: Account,
        args: {
            account: {
                name: "account",
                type: AccountInput
            }
        },
        resolve(_, args) {
            return accountService.updateAccount(args.account);
        }
    }
};

export default accountMutation;