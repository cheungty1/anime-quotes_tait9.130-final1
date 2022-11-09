<!--Custom Home Page-->
<script>
 import { Link } from "svelte-navigator";
</script>

<main>
 <div>
  <img src="../../images/ryo-yoshitake-pASnKx29HK4-unsplash.jpg" alt="background image" />
 </div>
 
 <div class = "cover">  
 <h1> Welcome to MyAnimes - Anime Quote Library </h1>
 <Link to={`/library`}>Enter Here!</Link>
 </div>  

</main>

<style>
img {
  height: 55vh;
  width: 100%
 }

 .cover {
  text-align: center;
  padding-top: 2em;
 }
</style>

