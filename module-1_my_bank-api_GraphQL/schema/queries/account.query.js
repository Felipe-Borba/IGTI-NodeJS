import { GraphQLInt, GraphQLList } from "graphql";
import accountResolver from "../resolvers/account.resolver.js";
import Account from '../type/Account.js'


const accountQuery = {
    getAccounts: {
        type: new GraphQLList(Account),
        resolve: () => accountResolver.getAccounts()
    },
    getAccount: {
        type: Account,
        args: {
            id: {
                name: 'id',
                type: GraphQLInt
            }
        },
        resolve: (_, args) => accountResolver.getAccount(args.id)
    }
};

export default accountQuery;