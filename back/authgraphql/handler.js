import { graphqlLambda } from 'graphql-server-lambda';
import { makeExecutableSchema } from 'graphql-tools';
import { resolvers } from './resolver.js';
import { schema } from './schema.js'




const myGraphQLSchema = makeExecutableSchema({
    typeDefs: [schema],
    resolvers: resolvers
});


export const authGraphqlHandler = function (event, context, callback) {
    const callbackFilter = function (error, output) {
        output.headers['Access-Control-Allow-Origin'] = '*';
        callback(error, output);
    };
    const id = event.requestContext.authorizer.principalId;
    context.user = { id: id };
    const handler = graphqlLambda((event, context) => {
        const headers = event.headers,
            functionName = context.functionName;

        return {
            schema: myGraphQLSchema,
            context: {
                headers,
                functionName,
                event,
                context
            }

        };
    });

    return handler(event, context, callbackFilter);
};