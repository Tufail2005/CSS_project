const form = document.querySelector("#pokemonForm");
const cardsContainer = document.querySelector("#cards");
const loadingEl = document.getElementById("loading");
const errorEl = document.getElementById("error");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  errorEl.style.display = "none";
  cardsContainer.innerHTML = "";
  loadingEl.style.display = "block";

  const type = document.getElementById("type").value;
  const count = parseInt(document.getElementById("count").value);

  //fecting api

  try {
    const typeResponse = await fetch(`https://pokeapi.co/api/v2/type/${type}`);

    if (!typeResponse.ok) {
      throw new Error(`Failed to fetch Pokémon list`);
    }

    const typeData = await typeResponse.json();
    const allPokemons = typeData.pokemon.map((p) => p.pokemon);
    if (allPokemons.length === 0) {
      throw new Error(`No pokemon found for ${type}`);
    }

    const selected = allPokemons
      .sort(() => 0.5 - Math.random())
      .slice(0, count);

    const details = await Promise.all(
      selected.map((p) =>
        fetch(p.url).then((res) => {
          if (!res.ok) throw new Error(`Failed to fetch data for ${p.name}`);
          return res.json();
        })
      )
    );

    //   Clear loading and render cards

    loadingEl.style.display = "none";
    cardsContainer.innerHTML = "";

    details.forEach((pokemon) => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="${pokemon.sprites.front_default || ""}" alt="${
        pokemon.name
      }" />
        <h3>${pokemon.name}</h3>
         <p>Type: ${pokemon.types.map((t) => t.type.name).join(", ")}</p>
        `;
      cardsContainer.appendChild(card);
    });
  } catch (error) {
    loadingEl.style.display = "none";
    errorEl.style.display = "block";
    errorEl.textContent = error.message;
  }
});
