<!-- Header component -->
<script>
 import { Link } from "svelte-navigator";
 import { appName } from "../stores.js";
</script>

<header>
 <h1 class="display-4">📚 {$appName}</h1>
 <nav>
   <!-- Link component allows us to link to pages -->
   <Link to="/">Home</Link>
   <Link to="/library">Library</Link>
   <Link to="/anime/add">Add Anime</Link>
   <Link to="/anime/search">Search Animes</Link>
   <Link to="/author/add">Add Author</Link>
 </nav>
</header>

<style>
 header {
   margin-bottom: 1rem;
 }

 nav {
   background-color: rgb(233, 233, 233);
   padding: 1rem;
 }
</style>
