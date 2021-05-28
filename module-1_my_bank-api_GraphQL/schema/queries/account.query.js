import { GraphQLInt, GraphQLList } from "graphql";
import accountService from "../../services/account.service.js";
import Account from '../type/Account.js'


const accountQuery = {
    getAccounts: {
        type: new GraphQLList(Account),
        resolve: () => accountService.getAccounts()
    },
    getAccount: {
        type: Account,
        args: {
            id: {
                name: 'id',
                type: GraphQLInt
            }
        },
        resolve: (_, args) => accountService.getAccount(args.id)
    }
};

export default accountQuery;