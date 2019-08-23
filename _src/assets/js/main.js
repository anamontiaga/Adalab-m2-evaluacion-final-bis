"use strict";
// Definimos las constantes con los elementos del DOM que vamos a necesitar
const cardsBtns = document.querySelectorAll(".header_form--option");
const cardsList = document.querySelector(".cards_container--list");
const searchBtn = document.querySelector(".header_form--btn");
const api = "https://raw.githubusercontent.com/Adalab/cards-data/master/";
const cardAdalab = "https://via.placeholder.com/160x195/30d9c4/ffffff/?text=ADALAB";
let btnValue;

let cardsArray = [];

function setLocalStorage() {
  localStorage.setItem("number of cards", JSON.stringify(btnValue));
}

// Buscamos las cartas llamando a la API
function getCardInfo() {
  for (const cardBtn of cardsBtns) {
    if (cardBtn.checked === true) {
      btnValue = cardBtn.value;
    }
    fetch(`${api}${btnValue}.json`)
      .then(response => response.json())
      .then(data => {
        cardsArray = data;
        setLocalStorage();
      });
  }
}

function paintCards(ev) {
  ev.preventDefault();
  getCardInfo();
  cardsList.innerHTML = ""; // te lo pinta en blanco y no me repite las búsquedas y refresca
  for (let i = 0; i < cardsArray.length; i++) {
    cardsList.innerHTML += `<li class="cards_container--list--item">
        <img src="${cardsArray[i].image}" alt="${cardsArray[i].image}" class="cards_container--list--image hidden">
        <img src="${cardAdalab}" alt="Adalab" class="cards_container--list--image--adalab"></li>`;
  }

  const cardsItems = document.querySelectorAll(".cards_container--list--item");
  for (const item of cardsItems) {
    item.addEventListener("click", flipCards);
  }
  // 1º por qué esto no me funciona fueraaaa
}

searchBtn.addEventListener("click", paintCards);

// 2º tengo que dar dos veces al botón para que me pinte las cartas

function flipCards(event) {
  const cardGame = event.currentTarget.querySelector(".cards_container--list--image");
  const cardDefault = event.currentTarget.querySelector(".cards_container--list--image--adalab");
  cardGame.classList.toggle("hidden");
  cardDefault.classList.toggle("hidden");
}
