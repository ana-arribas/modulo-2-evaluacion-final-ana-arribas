'use strict';

const form = document.querySelector('#form');
const input = document.querySelector('#input');
const resultsList = document.querySelector('#results-list');
const button = document.querySelector('#button');
const urlBase = 'http://api.tvmaze.com/search/shows?q=';
const container = document.querySelector('#results-container');
const favouritesList = document.querySelector('#favourites-list');

const init = () => {
    const myLocalStorage = localStorage.getItem("settingFavourites");
    if (myLocalStorage !== null) {
        favouritesArray = JSON.parse(myLocalStorage);
    }
    paintList(favouritesArray);
};

const searchHandler = () => {
    const inputValue = input.value.toLowerCase();
    fetch(urlBase + inputValue)
        .then(response => response.json())
        .then(data => displayShows(data))
        .catch(function (error) {
            console.log("No se han podido cargar los datos", error);
        });
};

const displayShows = arrayFromFetch => {
    for (let show of arrayFromFetch) {
        const elementLi = document.createElement('li');
        const elementImg = document.createElement('img');
        const elementSpan = document.createElement('span');
        elementSpan.innerHTML = show.show.name;
        if (show.show.image === null) {
            elementImg.src = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
        }
        else {
            elementImg.src = show.show.image.medium;
        }
        elementLi.classList.add('classli');
        elementSpan.classList.add('classspan');
        elementImg.classList.add('classimg');
        elementLi.addEventListener('click', chooseFavourite);
        elementLi.addEventListener('click', setShows);
        elementLi.appendChild(elementSpan);
        elementLi.appendChild(elementImg);
        resultsList.appendChild(elementLi);
        container.appendChild(resultsList);
    }
};

const chooseFavourite = event => {
    event.currentTarget.classList.toggle('selected');
};

const introForSearch = event => {
    event.preventDefault();
    searchHandler();
};

let favouritesArray = [];
const setShows = event => {
    const showTitle = event.currentTarget.querySelector('.classspan');
    const showImage = event.currentTarget.querySelector('.classimg');
    let selectedShows = {
        name: showTitle.innerHTML,
        img: showImage.src
    };
    favouritesArray.push(selectedShows);
    localStorage.setItem('settingFavourites', JSON.stringify(favouritesArray));
    addNewVisited(selectedShows);
};

const paintList = array => {
    for (let item of array) {
        addNewVisited(item)
    }
};

const addNewVisited = clickedShow => {
    const favouriteSpan = document.createElement('span');
    const favouriteImg = document.createElement('img');
    favouriteSpan.innerHTML = clickedShow.name;
    favouriteImg.src = clickedShow.img;
    favouritesList.appendChild(favouriteSpan);
    favouritesList.appendChild(favouriteImg);
};

button.addEventListener('click', searchHandler);
form.addEventListener('submit', introForSearch);
window.addEventListener('load', init);
