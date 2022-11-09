// Import Graphql Tag
const gql = require('graphql-tag')

// Use graphql-tag: gql template literal tag used to concisely write a GraphQL query that is parsed into a standard GraphQL AST (Abstract Syntax Tree)
//Define typedef using graphql-tag by template literal as strings are inconvenient

// Define Typedefs (string that represents the GraphQL schema). GraphQL server uses a schema to describe the shape of your available data
const animeType = gql`
  type AnimeType{
    _id:ID
    name:String
    genre:String
    quote:String
    author:ID
    author_relate:AuthorType
  }
  type Query {
    anime(id:ID):AnimeType
    animes:[AnimeType]
    searchAnimes(name: String): [AnimeType]
  }

  input AnimeInput {
    id: ID
    name:String
    genre:String
    quote:String
    author:ID
  }

  type Mutation{
    addAnime(input:AnimeInput):AnimeType
    editAnime(input: AnimeInput): AnimeType
    deleteAnime(id:ID): AnimeType
  }
`;
//Export AnimeType
module.exports = animeType


