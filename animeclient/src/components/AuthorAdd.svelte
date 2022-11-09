 <script>
  //LIBARIES - Import Libraries
 import { mutation, query } from "svelte-apollo";
 import { navigate } from "svelte-navigator";
 import { Alert } from "sveltestrap";
 import Joi from "joi";
 import { ADD_AUTHOR } from "../queries/authors";
 
 //STATE - Declare State
 let name = "";
 let age= null;
 let errors = null;

 //State - Save APOLLO GraphQL Mutation to and declare State
 const addAuthor = mutation(ADD_AUTHOR);

 //VALIDATION - JOI Validation
const schema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  age: Joi.number().min(1).max(130).required(),
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
    if (validateForm(schema, { name: name, age: age})) {
    return;
  }
     console.log(name, age)

    //Adds Author information - by submitting form information (name, age) to backend GraphQL database
     try {
      const result = await addAuthor({
      variables: {
        name: name,
        age: age,
      },
    });
    console.log(result)
    // Navigate/Routes - to /library page when done
    navigate("/", { replace: true });
  } catch (error) {
    console.log(error);
  }
}
 </script>

<!-- Sveltestrap Component - Input form data for form input to be submitted and sent to GraphQL backend database-->
<main>
 <h1>Add Author</h1>
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
 <label for="age">Age:</label>
  <!--Bind value to state-->
 <input type="number" id="age" placeholder="Enter your age" bind:value={age} />
 <!-- If error, show error -->
 {#if errors?.age}
 <Alert color={"danger"}>{errors.age}</Alert>
{/if}
</div>

<div>
  <!--Button to submit and add a new author to database-->
 <button on:click={handleSubmit}>Add</button>
</div>
 </main>