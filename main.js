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

// SEU CÓDIGO PODE VIR AQUI

// ao fazer requisições Ajax, em vez do fetch(...), opte pela função exportada por data.js
// chamada friendlyFetch(...) - ela faz a requisição igual a fetch, mas armazena a resposta
// em um cache local (para evitar sobrecarregar a API)