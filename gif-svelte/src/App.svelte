<script>
  let search = "";
  let loading = false;
  const API_URL = "";

  let gifs = [];

  async function formSubmitted(event) {
    event.preventDefault();
    loading = true;
    gifs = [];
    const url = `${API_URL}${search}`;
    const response = await fetch(url);
    const json = await response.json();
    gifs = json.data.map(gif => gif.images.fixed_height.url);
    console.log(gifs);
    loading = false;
  }
</script>

<style>
  .results {
    column-count: 3;
  }
  img {
    width: 100%;
    height: auto;
  }
</style>

<form on:submit={formSubmitted}>
  <label for="search">Search</label>
  <input bind:value={search} type="text" name="search" id="search" />
  <button type="submit">Go</button>
</form>

{#if loading}
  <img
    src="https://media2.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif"
    alt="loading" />
{/if}

<div class="results">
  {#each gifs as gif}
    <img src={gif} alt="" />
  {/each}
</div>

<h2>{search}</h2>
