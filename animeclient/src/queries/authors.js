//Frontend Graphql Queries for Authors

//Import gql from Apollo
import { gql } from "@apollo/client";

//All Authors- gql query
export const ALL_AUTHORS = gql`
query {
	authors {
		_id
		name
		age
	}
}
`;

//Add Author- gql query
export const ADD_AUTHOR = gql`
mutation AddAuthor($name: String, $age: Int) {
	addAuthor(input: {
			name: $name,
			age: $age
	}) {
			_id
			name
			age
	}
}
`;

//Edit Author- gql query
export const EDIT_AUTHOR = gql`
mutation EditAuthor($id: ID, $name:String, $age:Int){
	editAuthor(input: {
		id: $id
			name: $name
			age: $age
	}) {
			_id
			name
			age
	}
}
`;

//Delete Author- gql query
export const DELETE_AUTHOR = gql`
mutation DeleteAuthor ($id: ID){
	deleteAuthor(id: $id){
    name
    age
  }
}
`;

