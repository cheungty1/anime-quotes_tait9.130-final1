<!--App.svelte-->

<script>
	  //LIBARIES - Import Libraries
			// Import all Frontend Client Pages
	import {ApolloClient, InMemoryCache} from "@apollo/client"
	import {setClient} from "svelte-apollo"
 import { Router, Route, Link } from "svelte-navigator";

	import Header from "./components/Header.svelte";
	import Animes from "./components/Animes.svelte";
	import Anime from "./components/Anime.svelte";
 import AnimeEdit from "./components/AnimeEdit.svelte";
	import AnimeAdd from "./components/AnimeAdd.svelte";
 import AnimesSearch from "./components/AnimesSearch.svelte";
	import Footer from "./components/Footer.svelte"
	import ErrorPage from "./components/ErrorPage.svelte"
	import AuthorAdd from "./components/AuthorAdd.svelte"
	import Home from "./components/Home.svelte"

// Create new Apollo Client, set uri and initialise Apollo CLient Cache by creating an InMemoryCache object and provide it to the ApolloClient constructor
const client = new ApolloClient({
	uri: "http://localhost:4000/graphql",
	cache: new InMemoryCache(),
});
setClient(client);
</script>

<!--Route all Frontend Client pages using Svelte Navigator-->
<Router>
	<main>
		<Header/>
		<Route path="/"><Home/></Route>
		<Route path="/library"><Animes/></Route>
		<Route path="/anime/:id"><Anime/></Route>
		<Route path="/anime/edit/:id"><AnimeEdit/></Route>
		<Route path="/anime/add"><AnimeAdd /></Route>
		<Route path="/anime/search"><AnimesSearch /></Route>
		<Route path="/author/add"><AuthorAdd /></Route>
		<Route path=""><ErrorPage /></Route>
	</main>
	<Footer/>
</Router>	

