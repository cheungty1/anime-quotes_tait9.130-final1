// Import Graphql Tag
const gql = require('graphql-tag')

// Use graphql-tag: gql template literal tag used to concisely write a GraphQL query that is parsed into a standard GraphQL AST (Abstract Syntax Tree)
//Define typedef using graphql-tag by template literal as strings are inconvenient

// Define Typedefs (string that represents the GraphQL schema). GraphQL server uses a schema to describe the shape of your available data
const authorType = gql`
    type AuthorType{
        _id:ID
        name:String
        age:Int
        animes:[AnimeType]
    }

    type Query {
        author(id:ID):AuthorType
        authors:[AuthorType]
        searchAuthors(name: String): [AuthorType]
    }

    input AuthorInput {
        id:ID
        name:String
        age:Int
    }

    type Mutation{
        addAuthor(input:AuthorInput):AuthorType
        editAuthor(input:AuthorInput):AuthorType
        deleteAuthor(id:ID): AuthorType
    }
`;
//Export AuthorType
module.exports = authorType