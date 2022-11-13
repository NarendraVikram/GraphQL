const graphql = require('graphql');

const load = require('lodash');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList
}
= graphql;

// dummy data
var books = [
    { name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1' },
    { name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2'},
    { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3' },
    { name: 'The Long Earth', genre: 'Sci-Fi', id: '4', authorId: '3' },
    { name: 'The Long Earth', genre: 'Sci-Fi', id: '5', authorId: '3' }
];

var authors = [
    { name: 'Patrick Rothfuss', age: 44, id: '1' },
    { name: 'Brandon Sanderson', age: 42, id: '2' },
    { name: 'Terry Pratchett', age: 66, id: '3' }
];

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id:{type:GraphQLID},
    name: {type:GraphQLString},
    genre: {type:GraphQLString},
    author: {
      type: AuthorType,
      resolve(parent, args){
        return load.find(authors, {id:parent.authorId})
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id:{type:GraphQLID},
    name: {type:GraphQLString},
    age: {type:GraphQLInt},
    books: {
    type: new GraphQLList(BookType),
    resolve(parent, args){
      return load.filter(books, {authorId:parent.id})
    }}
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RooTQueryType',
  fields: {
    book:{
      type: BookType,
      args: {id:{type:GraphQLID}},

      resolve(parent, args){
        // to get the data from db
        return load.find(books, {id: args.id});
      }

    },

    author: {
      type:AuthorType,
      args:{id:{type:GraphQLID}},

      resolve(parent, args){
        return load.find(authors, {id: args.id});
      }
    },

    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args){
        return books;
      }
    },

    authors: {
      type: new GraphQLList(AuthorType),
      resolve (parent, args){
        return authors;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
