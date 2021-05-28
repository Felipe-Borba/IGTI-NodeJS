import { GraphQLList } from "graphql";
import accountService from "../../services/account.service.js";
import Account from '../type/Account.js'


const accountQuery = {
    getAccounts: {
        type: new GraphQLList(Account),
        resolve: () => accountService.getAccounts()
    }
};

export default accountQuery;