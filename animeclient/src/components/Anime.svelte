<!--Single Animes Display Page-->
<script>
  //LIBARIES - Import Libraries
 import { query } from "svelte-apollo";
 import { useParams } from "svelte-navigator";
 import { Card, CardBody } from "sveltestrap";

  //Queries - Import Frontend GraphQL Queries
  import { SINGLE_ANIME } from "../queries/animes";

  // Use and Save parameter/url into params variable
  const params = useParams();
  // console.log($params.id);

  //Use and Save parameter/url id into animeId variable
  const animeId = $params.id;
  $: console.log(animeId);

  //State - Pass Id to search GraphQL Query by Id, and save APOLLO query to and declare State
  const anime = query(SINGLE_ANIME, {
    variables: { id: animeId },
  });

  $: console.log(anime);
  </script>

<!-- Sveltestrap Component - Acts to display and render Anime Query search results (state) onto page-->
<main>
 <h1>Single Anime</h1>

  <!--Apollo Query Properties: If loading show loading, if error show error message-->
 {#if $anime.loading}
   Loading...
 {:else if $anime.error}
   Error: {$anime.error.message}

  <!--Loop over $animes.data.animes array to display anime information on page-->
 {:else}
   <Card class="rounded mb-4 shadow-sm border-0">
     <CardBody>
       <h4>Anime Name: {$anime.data.anime.name}</h4>
       <p>Anime ID: {$anime.data.anime._id}</p>
       <p>Author ID: {$anime.data.anime.author}</p>
       <p>Author: {$anime.data.anime.author_relate.name}</p>
       <p>Age: {$anime.data.anime.author_relate.age}</p>
       <p>Genre: {$anime.data.anime.genre}</p>
       <p>Quote and Quotee: {$anime.data.anime.quote}</p>
     </CardBody>
   </Card>
 {/if}
</main>