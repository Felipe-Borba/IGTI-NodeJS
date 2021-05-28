import { GraphQLBoolean, GraphQLInt } from "graphql";
import accountResolver from "../resolvers/account.resolver.js";
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
            return accountResolver.createAccount(args.account);
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
            return accountResolver.deleteAccount(args.id);
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
            return accountResolver.updateAccount(args.account);
        }
    }
};

export default accountMutation;