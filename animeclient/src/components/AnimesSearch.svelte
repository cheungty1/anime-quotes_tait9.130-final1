<script>
  //LIBARIES - Import Libraries
  import { Row, Col, Card, CardBody } from "sveltestrap";
  import { Link } from "svelte-navigator";
  import { query, mutation } from "svelte-apollo";

  //Queries - Import Frontend GraphQL Queries
  import { SEARCH_ANIMES, DELETE_ANIME, ALL_ANIMES } from "../queries/animes";

  //STATE - Declare State
  let search = "";
  let errors = null;

  //State - Save APOLLO GraphQL Queries and Mutation to and declare State
  const deleteAnime = mutation(DELETE_ANIME);
  const animes = query(SEARCH_ANIMES, {
    variables: {
      name: search,
    },
    fetchPolicy: "network-only", //// Doesn't check cache before making a network request
  });

  //EVENTS- Submit Function acts to submit search information
  async function handleSearch() {
    if (search != null || search != "") {
      animes.refetch({ name: search });
      console.log($animes)
      console.log(search)
    }
  }

  //EVENTS- Delete function acts to delete the seleted anime by Id, from page when delete button is pressed
  async function handleDelete(id) {
    console.log(id);
    try {
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
  <h1>Search Animes</h1>
  <div class="mx-1">
    <!--Bind value to state-->
    <label>Search <input type="text" bind:value={search} /></label>
      <!--Button to search anime from database-->
    <button on:click={handleSearch}>Search</button>
  </div>
  
  <Row>
    <!--Apollo Query Properties: If loading show loading, if error show error message-->
    {#if $animes.loading}
    <p>Loading...</p>
    {:else if $animes.error}
    <p>Error: {$animes.error.message}</p>
    {:else if $animes.data.searchAnimes.length == 0}
    <p>Please Enter Search: No Matches Found</p>

    <!--Loop over $animes.data.searchanimes array to display anime information on page-->
    {:else}
      {#each $animes.data.searchAnimes as anime}
        <Col sm="6" lg="4">
          <Card class="rounded mb-4 shadow-sm border-1">
            <CardBody>
              <h4>{anime.name}</h4>
              <p>Genre: {anime.genre}</p>
              <p>Author: {anime.author_relate.name}</p>
              <p>Quote: {anime.quote}</p>

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

<!--CSS styling of SearchBox-->
<style>
  .mx-1 {
    margin: 1rem 0;
  }
</style>
