const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const detailCard = document.getElementById('card-details-container');


const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">

            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img class="pokemon-image" src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}


function convertPokemonToCard(pokemon) {
    const cardID = `pokemonCard-${pokemon.number}`
    return `
        <li id="${cardID}" class="pokemon ${pokemon.type}">

            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img class="pokemon-image" src="${pokemon.photo}"
                    alt="${pokemon.name}">
            </div>
        </li>
    
    `
}

function loadPokemonCard(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newCard = pokemons.map(convertPokemonToCard).join('')
        pokemonList.innerHTML +=newCard

        const pokemonImages = document.querySelectorAll('.pokemon-image');
        pokemonImages.forEach((image) => {
            image.addEventListener('click', () =>{
                const newCard = pokemons.map(convertPokemonToCard).join('');
                detailCard.innerHTML += newCard;
                detailCard.style.display = 'block';
            })
        })
    })
};

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml

        
    })
};

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
});


