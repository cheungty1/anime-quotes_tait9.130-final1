//3rd PARTY MODULES
const express = require('express');
const glob = require("glob");
const cors = require("cors");
const { graphqlHTTP } = require('express-graphql');

// Graphql tools: makeExecutableSchema combines schema and resolvers to make executable schema
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge')
//MODULES
const connect = require('./helpers/connection') //Stores the connection to the database
//SETUP EXPRESS
const app = express();
//MIDDLEWARE
app.use(cors())

//FIND ALL RESOLVERS
//iterate through resolvers file in the folder "graphql/folder/folder/whatever*-resolver.js"
let resolvers = glob.sync('graphql/*/*/*-resolver.js')
let registerResolvers = [];
for (const resolver of resolvers) {
  // add resolvers to array
  registerResolvers = [...registerResolvers, require('./' + resolver),]
}

//FIND ALL TYPES
//iterate through resolvers file in the folder "graphql/folder/folder/whatever*-type.js"
let types = glob.sync('graphql/*/*/*-type.js')
let registerTypes = [];
for (const type of types) {
  // add types to array
  console.log(type);
  registerTypes = [...registerTypes, require('./' + type),]
}

//CREATE SCHEMA - MERGE TYPES AND RESOLVERS
//make schema from typeDefs and Resolvers with "graphql-tool package (makeExecutableSchema)"
const schema = makeExecutableSchema({
  typeDefs: mergeTypeDefs(registerTypes),//merge array types
  resolvers: mergeResolvers(registerResolvers,)//merge resolver type
})

connect.connect('mongodb://localhost:37017/anime-quote-manager')

//ROUTE FOR GRAPHQL
//Make it work with express "express and express-graphql packages"
app.use('/graphql', graphqlHTTP({
 schema: schema,
 graphiql: true,//test your query or mutation on browser (Development Only)
}));

//SERVER LISTENING
app.listen(4000, () => { console.log('Running a GraphQL API server at http://localhost:4000/graphql'); });