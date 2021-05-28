import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import accountQuery from './queries/account.query.js';

const schema = new GraphQLSchema({
    types: null,
    query: new GraphQLObjectType({
        name: "RootQueryType",
        fields: {
            ...accountQuery
        }
    }),
    mutation: null
});

export default schema;