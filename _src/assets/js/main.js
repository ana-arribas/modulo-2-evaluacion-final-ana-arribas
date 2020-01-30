'use strict';

const form = document.querySelector('#form');
const input = document.querySelector('#input');
const resultsList = document.querySelector('#results-list');
const button = document.querySelector('#button');
const urlBase = 'http://api.tvmaze.com/search/shows?q=';
const favouritesList = document.querySelector('#favourites-list');
let arrayFavourites = [];
let series;

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
        .then(data => {
            series = data;
            displayShows(data);
        })
        .catch(function (error) {
            console.log("No se han podido cargar los datos", error);
        });
};

const displayShows = arrayFromFetch => {
    if (input.value.length !== 0) {
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
            elementLi.classList.add('list-item');
            elementLi.addEventListener('click', chooseFavourite);
            elementLi.addEventListener('click', setShows);
            elementLi.appendChild(elementSpan);
            elementLi.appendChild(elementImg);
            resultsList.appendChild(elementLi);
        }
    }
    else {
        alert('introduce una serie');
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
    const favouriteLi = document.createElement('li');
    const favouriteSpan = document.createElement('span');
    const favouriteImg = document.createElement('img');
    const favouriteDelete = document.createElement('button');
    favouriteSpan.innerHTML = clickedShow.name;
    favouriteImg.src = clickedShow.img;
    favouriteDelete.innerHTML = 'Quitar de favoritos';
    favouriteDelete.classList.add('delete');
    favouriteLi.classList.add('fav-list-item');
    favouriteSpan.classList.add('fav-list-title');
    favouriteLi.appendChild(favouriteSpan);
    favouriteLi.appendChild(favouriteImg);
    favouriteLi.appendChild(favouriteDelete);
    favouritesList.appendChild(favouriteLi);
    const allDeleteButtons = document.querySelectorAll('.delete');
    for (let i = 0; i < allDeleteButtons.length; i++) {
        allDeleteButtons[i].setAttribute('index', i)
        allDeleteButtons[i].addEventListener('click', deleteFavourite);
    }
};

const deleteFavourite = event => {
    const myLocalStorage = JSON.parse(localStorage.getItem("settingFavourites"));
    const elementSelectedIndex = event.target.index;
    console.log(elementSelectedIndex)
    const newFavoritesArray = myLocalStorage.splice(elementSelectedIndex, 1);
    localStorage.setItem('settingFavourites', JSON.stringify(newFavoritesArray));
    event.target.closest('li').remove();
};


button.addEventListener('click', hidePreviousResults);
button.addEventListener('click', searchHandler);
form.addEventListener('submit', introForSearch);
window.addEventListener('load', init);
