"use strict";
// Definimos las constantes con los elementos del DOM que vamos a necesitar
const cardsBtns = document.querySelectorAll(".header_form--option");
const cardsList = document.querySelector(".cards_container--list");
const searchBtn = document.querySelector(".header_form--btn");
const api = "https://raw.githubusercontent.com/Adalab/cards-data/master/";
const cardAdalab = "https://via.placeholder.com/160x195/30d9c4/ffffff/?text=ADALAB";
let btnValue;

let cardsArray = [];

// Buscamos las cartas llamando a la API
function getCardInfo(ev) {
  ev.preventDefault();
  for (const cardBtn of cardsBtns) {
    if (cardBtn.checked === true) {
      btnValue = cardBtn.value;
    }
    fetch(`${api}${btnValue}.json`)
      .then(response => response.json())
      .then(data => {
        cardsList.innerHTML = ""; // te lo pinta en blanco y no me repite las búsquedas y refresca
        for (let i = 0; i < data.length; i++) {
          cardsList.innerHTML += `<li class="cards_container--list--item">
        <img src="${data[i].image}" alt="${data[i].image}" class="cards_container--list--image">
        <img src="${cardAdalab}" alt="Adalab" class="cards_container--list--image--adalab"></li>`;
        }
        cardsArray = data;
        localStorage.setItem("number of cards", btnValue); // guardo en Local Storage
      });
  }
}

searchBtn.addEventListener("click", getCardInfo);
