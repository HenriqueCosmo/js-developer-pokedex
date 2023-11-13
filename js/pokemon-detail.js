let currentPokemonId = null;

document.addEventListener("DOMContentLoaded", () => {
    const MAX_POKEMONS = 151;
    const pokemonID = new URLSearchParams(window.location,search).get("id");
    const id = parseInt(pokemonID, 10);

    if (id < 1 || id > MAX_POKEMONS) {
        return (window.location.href = "./index.html");
    };

    currentPokemonId = id;
    loadPokemon(id);
});


async function loadPokemon() {

    try{
        const [pokemon, pokemonSpecies] = await Promise.all([
            fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) =>
              res.json()
            ),
            fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`).then((res) =>
              res.json()
            ),
          ]);

          const abilitiesWrapper = document.querySelector(".pokemon-detail-wrap .pokemon-detail.move");
          abilitiesWrapper.innerHTML = "";
          if (currentPokemonId === id) {
            displayPokemonsDetails(pokemon) 
            const flavorText = getEnglishFlavorText(pokemonSpecies);
            Document.querySelector(".body3-fonts.pokemon-description").textContent = flavorText
            const [leftArrow, rightArrow] = ["#leftArrow, #rightArrow"].map((sel) =>document.querySelector(sel));
            leftArrow.removeEventListener("click", navigatePokemon);
            rightArrow.removeEventListener("click", navigatePokemon);

            if (id !== 1) {
                leftArrow.addEventListener("click", () => {
                    navigatePokemon(id -1)
                });
            }
            if (id !== 151) {
                rightArrow.addEventListener("click", () => {
                    navigatePokemon(id +1)
                });
            }

            window.history.pushState({}, "" `./detail.html?id=${id}`)
          }

        return true;
    } catch (error) {
        console.error("An error occured while fetching Pokemon Data: ",error);
        return false;
    }
}