<!--Multiple Animes Display Page-->
<script>
  //LIBARIES - Import Libraries
import { onMount } from "svelte";
 import {query, mutation} from "svelte-apollo";
 import { Row, Col, Card, CardBody } from "sveltestrap";
 import {Link} from "svelte-navigator";

 //Queries - Import Frontend GraphQL Queries
 import { ALL_ANIMES, DELETE_ANIME } from "../queries/animes";

 //State - Save APOLLO GraphQL Queries to and declare State
 const animes = query(ALL_ANIMES);
 //State - Save APOLLO GraphQL Mutation to and declare State
 const deleteAnime = mutation(DELETE_ANIME);

  //LIFECYCLE METHOD- onMount function runs when the component is rendered to the DOM, in order to refetch and run the animes query as soon as page loaded
  onMount(async () => {
    animes.refetch(); //Run the animes query
  });

  //EVENTS- Delete function acts to delete the seleted anime by Id, from page when delete button is pressed
  async function handleDelete(id) {
    try {
      console.log(id);
      const result = await deleteAnime({
        variables: {
          id: id,
        },
      });
      console.log(result);
      animes.refetch();
    } catch (error) {
      console.log(error);
    }
  }
</script>

<!-- Sveltestrap Component - Acts to display and render Anime Query search results (state) onto page-->
<main>
  <h1>All Animes</h1>
  <Row>
     <!--Apollo Query Properties: If loading show loading, if error show error message-->
   {#if $animes.loading}
       Loading...
     {:else if $animes.error}
       Error: {$animes.error.message}

      <!--Loop over $animes.data.animes array to display anime information on page-->
     {:else}
     {#each $animes.data.animes as anime, i}
       <Col sm="6" lg="4">
        <Card class="rounded mb-4 shadow-sm border-1" id={i}>
        <CardBody>
          <h5>{anime.name}</h5>
          <p>Genre: {anime.genre}</p>
          <!--<p>Author ID: {anime.author}</p>-->
          <!--<p>Author: {anime.author_relate.name}</p>-->
          <p>Quote and Quotee: {anime.quote}</p>

          <!--Route View and Edit to their respective pages-->
          <Link to={`/anime/${anime._id}`}>View</Link>
          <Link to={`/anime/edit/${anime._id}`}>Edit</Link>

          <!--Button to delete anime from database-->
          <button on:click={handleDelete(anime._id)}>Delete</button>
        </CardBody>
      </Card>
    </Col>
     {/each}
    {/if}
  </Row>
 </main>