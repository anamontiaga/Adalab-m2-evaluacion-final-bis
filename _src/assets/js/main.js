"use strict";

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
  cardsList.innerHTML = "";
  for (let i = 0; i < cardsArray.length; i++) {
    cardsList.innerHTML += `<li class="cards_container--list--item">
        <img src="${cardsArray[i].image}" alt="${cardsArray[i].image}" class="cards_container--list--image hidden">
        <img src="${cardAdalab}" alt="Adalab" class="cards_container--list--image--adalab"></li>`;
  }
  // 1º He intentado ejecutar esta parte debajo de la función flipCards() pero me "rompe" el juego.
  const cardsItems = document.querySelectorAll(".cards_container--list--item");
  for (const item of cardsItems) {
    item.addEventListener("click", flipCards);
  }
}

searchBtn.addEventListener("click", paintCards);

// 2º Tengo que dar dos veces al botón para que me pinte las cartas. Algo falla.
function flipCards(event) {
  const cardGame = event.currentTarget.querySelector(".cards_container--list--image");
  const cardDefault = event.currentTarget.querySelector(".cards_container--list--image--adalab");
  cardGame.classList.toggle("hidden");
  cardDefault.classList.toggle("hidden");
}

// 3º Esta función no funciona. Se guardan los datos en LS pero no los coge para volverlos a pintar
function catchData() {
  const catchInfo = JSON.parse(localStorage.getItem("number of cards"));
  if (catchInfo !== null) {
    cardsArray = catchInfo;
    paintCards();
  }
}

catchData();
