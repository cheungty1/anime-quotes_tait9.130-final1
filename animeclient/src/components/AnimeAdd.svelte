<!--Add Animes Page-->
<script>
  //LIBARIES - Import Libraries
 import { mutation, query } from "svelte-apollo";
 import { navigate } from "svelte-navigator";
 import { Alert } from "sveltestrap";
 import Joi from "joi";

 //Queries - Import Frontend GraphQL Queries
 import { ADD_ANIME } from "../queries/animes";
 import { ALL_AUTHORS } from "../queries/authors";

 //STATE - Declare State
 let name = "";
 let genre = "";
 let quote = "";
 let author;
 let errors = null;

 //State - Save APOLLO GraphQL Mutation to and declare State
 const addAnime = mutation(ADD_ANIME);
 
 //State - Save APOLLO GraphQL Queries to and declare State
 const authors = query(ALL_AUTHORS);

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
  
  // Validates Form information
  if (validateForm(schema, { name: name, genre: genre, quote: quote, author: author })) {
    return;
  }

  //Adds Anime information - by submitting form information (name, genre, quote, author) to backend GraphQL database
  try {
    const result = await addAnime({
      variables: {
        name: name,
        genre: genre,
        quote: quote,
        author: author,
      },
    });
    // Navigate/Routes - to /library page when done
    navigate("/library", { replace: true });
  } catch (error) {
    console.log(error);
  }
}
 </script>

<!-- Sveltestrap Component - Input form data for form input to be submitted and sent to GraphQL backend database-->
<main>
 <h1>Add Anime</h1>
 <div>
   <label for="name">Name:</label>
     <!--Bind value to state-->
   <input id="name" placeholder="Enter your name" bind:value={name} />
   <!-- If error, show error -->
   {#if errors?.name}
     <Alert color={"danger"}>{errors.name}</Alert>
   {/if}
 </div>
 <div>
   <label for="genre">Genre:</label>
     <!--Bind value to state-->
   <input id="genre" placeholder="Enter your name" bind:value={genre} />
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
  <textarea id="quote" placeholder="Insert Quote and Quotee" rows="4" cols="50" bind:value={quote} />
  <!-- If error, show error -->
  {#if errors?.quote}
    <Alert color={"danger"}>{errors.quote}</Alert>
  {/if}
</div>

 <div>
   <label for="authors">Select a Author:</label>
  <!--Apollo Query Properties: If loading show loading, if error show error message-->
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
 <div>
    <!--Button to submit and add a new anime to database-->
   <button on:click={handleSubmit}>Add</button>
 </div>
</main>