import { showList, showDetail } from './navigation.js';
import { listItemTemplate, typeTemplate } from './templates.js';
import { capitalize } from './capitalize.js';
import { friendlyFetch } from './data.js';

// endereço da API: usado para fazer as requisições
const api = 'https://pokeapi.co/api/v2/';

// pega todos os elementos HTML que serão necessários
const listEl = document.querySelector('#list');
const detailEl = document.querySelector('#detail-section');
const backEl = document.querySelector('.back-to-list');
const avatarImgEl = document.querySelector('#avatar-img');
const detailAvatarImgEl = detailEl.querySelector('.item-avatar-img');
const detailNumberEl = detailEl.querySelector('.number');
const detailNameEl = detailEl.querySelector('.name');
const detailTitleEl = detailEl.querySelector('#detail-title');
const detailWeightEl = detailEl.querySelector('#detail-weight');
const detailHeightEl = detailEl.querySelector('#detail-height');
const detailTypesEl = detailEl.querySelector('#detail-types');

// lista com todos os pokemons
let pokemons = [];


async function selectItem(el) {
    const id = el.dataset.id;

    // tira a seleção do pokemon que estava selecionado e seleciona o que foi clicado
    const currentItemEl = listEl.querySelector('.list-item.selected');
    if (currentItemEl !== null) {
        currentItemEl.classList.remove('selected');
    }
    el.classList.add('selected');


    const pokemon = pokemons.find(p => p.id == id);
    const { detail } = await pokemon.detailPromise;
    // configura a imagem grande
    avatarImgEl.src = pokemon.imageUrl;

    // configura os campos de detalhes
    detailAvatarImgEl.src = pokemon.imageUrl;
    detailNumberEl.innerHTML = String(pokemon.id).padStart(3, '0');
    detailNameEl.innerHTML = capitalize(pokemon.name);
    detailWeightEl.innerHTML = detail.weight;
    detailHeightEl.innerHTML = detail.height;
    detailTypesEl.innerHTML = detail.types.map(t => t.type.name ).map(typeTemplate).join('');
    showDetail();

    detailTitleEl.innerHTML = (await friendlyFetch(detail.species.url)).flavor_text_entries.find(fte => fte.language.name === 'en').flavor_text;
}

function addPokemonToList(pokemon, i) {
    const id = i + 1;
    pokemon.detailPromise = loadPokemonDetail(pokemon);
    pokemon.detailPromise.then(pokemon => listEl.querySelector(`[data-id="${id}"] .item-avatar-img`).src = pokemon.imageUrl);

    const data = {
        number: id,
        name: capitalize(pokemon.name),
        imageUrl: 'imgs/placeholder.png'
    }
    listEl.innerHTML += listItemTemplate(data);
}

function loadPokemonDetail(pokemon) {
    return friendlyFetch(pokemon.url).then(detail => {
        pokemon.id = detail.id;
        pokemon.detail = detail;
        pokemon.imageUrl = detail.sprites.front_default;
        return pokemon;
    });
}




async function init() {
    const response = await friendlyFetch(api + 'pokemon/?limit=150');
    pokemons = response.results;

    // limpa a lista de pokemons
    listEl.innerHTML = '';

    // para cada pokemon dos 150, adicioná-lo à lista
    pokemons.forEach(addPokemonToList);

    // pra cada item adicionado à lista, click mostra seus detalhes
    const allListItems = listEl.querySelectorAll('.list-item');
    allListItems.forEach(el => el.addEventListener('click', e => selectItem(el)));

    // botão (x) de voltar dos detalhes para a lista
    backEl.addEventListener('click', showList);
}

init();