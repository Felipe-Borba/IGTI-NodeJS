import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import accountMutation from './mutation/account.mutation.js';
import accountQuery from './queries/account.query.js';

const schema = new GraphQLSchema({
    types: null,
    query: new GraphQLObjectType({
        name: "RootQueryType",
        fields: {
            ...accountQuery
        }
    }),
    mutation: new GraphQLObjectType({
        name: "RootMutation",
        fields: {
            ...accountMutation
        }
    })
});

export default schema;