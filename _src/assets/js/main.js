'use strict';

console.log(':))))');

// Definimos las constantes con los elementos del DOM que vamos a necesitar
const cardsBtns = document.querySelectorAll('.header_form--option');
const cardsList = document.querySelector('.cards__container--list');
const searchBtn = document.querySelector('.header_form--btn');
const cardAdalab = 'https://via.placeholder.com/160x195/30d9c4/ffffff/?text=ADALAB';

let cardsArray = [];

// Buscamos las cartas llamando a la API

function getCard() {
  for (cardBtn of cardsBtns) {
    if (cardBtn.checked) {
      inputValueCard = cardBtn.value;
      localStorage.setItem('number0fCards', inputValueCard);
    }
  }
  return `https://raw.githubusercontent.com/Adalab/cards-data/master/${inputValueCard}.json`;
}

// Buscamos la información que queremos de las cartas llamando a la API y diciéndole la info que queremos. El fetch es el return de la función getCard ()

const getCardInfo = function(ev) {
  ev.preventDefault();
  fetch(getCard())
    .then(response => response.json())
    .then(data => {
      cardsList.innerHTML = ''; // te lo pinta en blanco y no me repite las búsquedas y refresca
      for (let i = 0; i < data.length; i++) {
        cardsList.innerHTML += `<li class="cards__container--list--item">
        <img src="${data[i].image}" alt="${data[i].image}" class="cards__container--list--image">
        <img src="${cardAdalab}" alt="Adalab" class="image--adalab"></li>`;
      }

      cardsArray = data;
      //   activateFavs();
    });
};

searchBtn.addEventListener('click', getCardInfo);
