//Frontend Graphql Queries for Animes

//Import gql from Apollo
import { gql } from "@apollo/client";

//All Animes- gql query
export const ALL_ANIMES = gql`
query {
  animes {
	_id
	name
	genre
	quote
	author
	author_relate{
        name
								age
    }
  }
}
`;

//Single Anime- gql query
export const SINGLE_ANIME = gql`
query Animes($id: ID) {
  anime(id: $id) {
	_id
	name
	genre
	quote
	author
	author_relate{
        name
								age
    }
  }
}
`;

//Search Animes- gql query
export const SEARCH_ANIMES = gql`
query SearchAnimes($name: String) {
	searchAnimes(name: $name) {
	_id
	name
	genre
	quote
	author
	author_relate{
        name
								age
    }
  }
}
`;

//Add Anime- gql query
export const ADD_ANIME = gql`
mutation AddAnime($name: String, $genre: String, $quote: String, $author: ID) {
  addAnime(input: { name: $name, genre: $genre, quote: $quote, author: $author }) {
	_id
	name
	genre
	quote
	author
	author_relate {
	  name
			age
	}
  }
}
`;

//Delete Anime- gql query
export const DELETE_ANIME = gql`
mutation DeleteAnime($id: ID) {
  deleteAnime(id: $id) {
	_id
	name
	genre
	quote
	author
	author_relate {
	  name
			age
	}
  }
}
`;

//Edit Anime- gql query
export const EDIT_ANIME = gql`
mutation EditAnime($id: ID, $name: String, $genre: String, $quote: String, $author: ID){
	editAnime(input: {
		id: $id
	  name: $name
	  genre: $genre
			quote: $quote
	  author: $author
	}) {
		_id
		name
		genre
		quote
		author
		author_relate {
			name
			age
		}
	}
}
`;