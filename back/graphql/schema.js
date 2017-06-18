import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLList,
  GraphQLString,
  GraphQLNonNull
} from 'graphql';

import {
  GraphQLLimitedString
} from 'graphql-custom-type`';

//import { getPosts, getAuthor, getAuthors, getComments, createPost } from './dynamo';

const Author = new GraphQLObjectType({
  name: "Author",
  description: "Author of the blog post",
  fields: () => ({
      id: {type: GraphQLString},
      name: {type: GraphQLString}
    })
});


const Query = new GraphQLObjectType({
  name: 'BlogSchema',
  description: "Root of the Blog Schema",
  fields: () => ({
    author: {
      type: Author,
      description: "Get Author by id",
      args: {
        id: {type: new GraphQLNonNull(GraphQLString)}
      },
      resolve: function(source, {id}) {
        return getAuthor(author);
      }
    }
  })
});



const Schema = new GraphQLSchema({
  query: Query
});

export default Schema;
