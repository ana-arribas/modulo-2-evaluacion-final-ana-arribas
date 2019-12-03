'use strict';

const form = document.querySelector('#form');
const input = document.querySelector('#input');
const resultsList = document.querySelector('#results-list');
const button = document.querySelector('#button');
const urlBase = 'http://api.tvmaze.com/search/shows?q=';
const favouritesList = document.querySelector('#favourites-list');

const init = () => {
    const myLocalStorage = localStorage.getItem("settingFavourites");
    if (myLocalStorage !== null) {
        arrayFavourites = JSON.parse(myLocalStorage);
    }
    paintList(arrayFavourites);
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
        elementSpan.classList.add('dynamic-class-span');
        elementImg.classList.add('dynamic-class-img');
        elementLi.addEventListener('click', chooseFavourite);
        elementLi.addEventListener('click', setShows);
        elementLi.appendChild(elementSpan);
        elementLi.appendChild(elementImg);
        resultsList.appendChild(elementLi);
    }
};

const chooseFavourite = event => {
    event.currentTarget.classList.toggle('selected');
};

const introForSearch = event => {
    event.preventDefault();
    searchHandler();
};

const hidePreviousResults = () => {
    if (resultsList.innerHTML !== null) {
        resultsList.innerHTML = '';
    }
};

let arrayFavourites = [];
const setShows = event => {
    const showTitle = event.currentTarget.querySelector('.dynamic-class-span');
    const showImage = event.currentTarget.querySelector('.dynamic-class-img');
    let objectSelectedShows = {
        name: showTitle.innerHTML,
        img: showImage.src
    };
    arrayFavourites.push(objectSelectedShows);
    localStorage.setItem('settingFavourites', JSON.stringify(arrayFavourites));
    PermanentList(objectSelectedShows);
};

const paintList = myArray => {
    for (let singleObject of myArray) {
        PermanentList(singleObject);
    }
};

const PermanentList = clickedShow => {
    const favouriteSpan = document.createElement('span');
    const favouriteImg = document.createElement('img');
    favouriteSpan.innerHTML = clickedShow.name;
    favouriteImg.src = clickedShow.img;
    favouritesList.appendChild(favouriteSpan);
    favouritesList.appendChild(favouriteImg);
};

button.addEventListener('click', hidePreviousResults);
button.addEventListener('click', searchHandler);
form.addEventListener('submit', introForSearch);
window.addEventListener('load', init);
