'use strict';

const form = document.querySelector('#form');
const input = document.querySelector('#input');
const resultslist = document.querySelector('#resultslist');
const button = document.querySelector('#button');
const urlBase = 'http://api.tvmaze.com/search/shows?q=';
const container = document.querySelector('#container');
const favouritesList = document.querySelector('#favouriteslist');

function init() {
    const myLocalStorage = localStorage.getItem("settingFavourites");
    if (myLocalStorage !== null) {
        favouritesArray = JSON.parse(myLocalStorage);
    }
    paintList(favouritesArray);
}

function searchHandler() {
    const inputValue = input.value.toLowerCase();
    fetch(urlBase + inputValue)
        .then(response => response.json())
        .then(data => displayShows(data))
        .catch(function (error) {
            console.log("Error al traer los datos del servidor", error);
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
        resultslist.appendChild(elementLi);
        container.appendChild(resultslist);
    }
}

function chooseFavourite(event) {
    event.currentTarget.classList.toggle('selected');
    // setSelectedElements(event);
}

function introForSearch(event) {
    event.preventDefault();
    searchHandler();
}

function hidePreviousResults() {
    if (container !== null) {
        const dinamicClass = document.querySelectorAll('.classli');
        for (let littleClass of dinamicClass)
            littleClass.classList.add('hidden');
    }
}
button.addEventListener('click', hidePreviousResults);

let favouritesArray = [];

function setShows(event) {
    const showTitle = event.currentTarget.querySelector('.classspan');
    const showImage = event.currentTarget.querySelector('.classimg');
    let selectedShows = {
        name: showTitle.innerHTML,
        img: showImage.src
    }
    favouritesArray.push(selectedShows);
    localStorage.setItem('settingFavourites', JSON.stringify(favouritesArray));

    addNewVisited(selectedShows);
}

const paintList = (array) => {
    for (let item of array) {
        addNewVisited(item)
    }
}

const addNewVisited = (obj) => {
    favouritesList.innerHTML += `<span>${obj.name}</span><img src=${obj.img}>`
}




form.addEventListener('submit', introForSearch);
button.addEventListener('click', searchHandler);
window.addEventListener('load', init);
