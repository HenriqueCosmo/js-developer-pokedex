const max_pokemons = 151;
const listWrapper = document.querySelector(".list-wrapper");
const searchInput = document.querySelector("#search-input");
const numberFilter = document.querySelector("#number");
const nameFilter = document.querySelector("#name");
const notFoundMessage = document.querySelector("#not-found-message");


let allPokemons = []

let url = fetch(`https://pokeapi.co/api/v2/pokemon?limit=${max_pokemons}`)


