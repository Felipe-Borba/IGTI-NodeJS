import { GraphQLFloat, GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";

const Account = new GraphQLObjectType({
    name: "Account",
    fields: () => ({
        id: {
            type: GraphQLInt
        },
        name: {
            type: GraphQLString
        },
        balance: {
            type: GraphQLFloat
        }
    })
});

export default Account;