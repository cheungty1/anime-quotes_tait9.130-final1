<!--Edit Animes Page-->
<script>
  //LIBARIES - Import Libraries
  import { mutation } from "svelte-apollo";
  import { navigate, useParams } from "svelte-navigator";
  import { query } from "svelte-apollo";
  import { Alert } from "sveltestrap";
  import Joi from "joi";

  //Queries - Import Frontend GraphQL Queries
  import { SINGLE_ANIME } from "../queries/animes";
  import { EDIT_ANIME } from "../queries/animes";
  import { ALL_AUTHORS } from "../queries/authors";
 
  //STATE - Declare State
  // Use and Save parameter/url into params variable
  const params = useParams();
  const animeId = $params.id;
 
  //APOLLO
  //State - Save APOLLO GraphQL Queries and Mutation to and declare State
  //State - Pass Id to search GraphQL Query by Id, and save APOLLO query to and declare State
  const editAnime = mutation(EDIT_ANIME);
  const authors = query(ALL_AUTHORS);
  const anime = query(SINGLE_ANIME, {
    variables: { id: animeId },
  });
 
  //STATE - Declare State
  let name = "";
  let genre = "";
  let quote = "";
  let author;
  let errors = null;
  
  //VALIDATION - JOI Validation
  const schema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  genre: Joi.string().min(2).max(30).required(),
  quote: Joi.string().min(3).max(1000).required(),
  author: Joi.string().alphanum().min(24).max(24).required(),
 });
 
 // VALIDATION Function - Passes schema and data and validates the input data from component that is stored in state. Also save error to state if error 
 function validateForm(schema, data) {
     errors = null;
     const result = schema.validate(data, { abortEarly: false });
     console.log(result);
     const { error } = result;
     if (!error) {
       return null;
     } else {
      // Save error object to variable
       const errorData = {};
       // Loop over error details array to get error message for genre, name and quote
       for (let item of error.details) {
         const name = item.path[0];
         const message = item.message;
         errorData[name] = message;
       }
      // Save all 3 error messages into "errors" variable/state, then return variable
       errors = errorData;
       console.log(errors);
       return errorData;
     }
   }
 
  //EVENTS- Submit Function acts to submit the form information
  async function handleSubmit() {
   console.log(animeId);
    console.log(name);

    // Validates Form information
   if (validateForm(schema, { name: name, genre: genre, quote: quote, author: author })) {
     return;
   }
   //Edits Anime information - by submitting form information (animeid, name, genre, quote, author) to backend GraphQL database
    try {
      const result = await editAnime({
        variables: {
          id: animeId,
          name: name,
          genre: genre,
          quote: quote,
          author: author,
        },
      });
      console.log(result);
      // Navigate/Routes - to /library page when done
      navigate("/library", { replace: true });
    } catch (error) {
      console.log(error);
    }
  }
 
  //If the data for the anime has loaded store it in state
  $: if ($anime.loading) {
    console.log("loading");
  } else if (name == "") {
    name = $anime.data.anime.name;
    genre = $anime.data.anime.genre;
    quote = $anime.data.anime.quote;
    author = $anime.data.anime.author;
  }
 </script>
 
 <!-- Sveltestrap Component - Input form data for form input to be submitted and sent to GraphQL backend database-->
 <main>
  <h1>Edit Anime</h1>
  <!--Apollo Query Properties: If loading show loading, if error show error message-->
  {#if $anime.loading}
    Loading...
  {:else if $anime.error}
    Error: {$anime.error.message}
  {:else}
  <div>
    <label for="name">Name:</label>
      <!--Bind value to state-->
    <input id="name" bind:value={name} placeholder={$anime.data.anime.name} />
    <!-- If error, show error -->
    {#if errors?.name}
    <Alert color={"danger"}>{errors.name}</Alert>
  {/if}
</div>
<div>
    <label for="genre">Genre:</label>
      <!--Bind value to state-->
    <input id="genre" bind:value={genre} placeholder={$anime.data.anime.genre} />
    <!-- If error, show error -->
    {#if errors?.genre}
 <Alert color={"danger"}>{errors.genre}</Alert>
  {/if}
</div>
<div>
  <label for="quote">Quote and Quotee:</label>
</div>
  <div>
    <!--Larger form area for quotes-->
    <!--Bind value to state-->
    <textarea id="quote" rows="4" cols="50" bind:value={quote} placeholder={$anime.data.anime.quote} />
    <!-- If error, show error -->
    {#if errors?.genre}
 <Alert color={"danger"}>{errors.genre}</Alert>
  {/if}
</div>
<div>
    <label for="author">Author ID:</label>
  </div>
    <div>
      <label for="authors">Select a Author:</label>
      {#if $authors.loading}
        Loading authors
      {:else if $authors.error}
        Error: {$authors.error.message}
      <!--Show author select menu, display author name nased on author id-->
      <!--Bind value to state-->
      {:else}
        <select bind:value={author} name="authors" id="authors">
          {#each $authors.data.authors as authorDetails, i}
            <option value={authorDetails._id}>{authorDetails.name}</option>
          {/each}
        </select>
        <p>Selected author ID {author ? author : "[waiting...]"}</p>
        {#if errors?.author}
        <Alert color={"danger"}>{errors.author}</Alert>
      {/if}
      {/if}
    </div>
    <!--Button to submit and edit an existing anime to database-->
    <button on:click={handleSubmit}>Submit Update</button>
  {/if}
 </main>