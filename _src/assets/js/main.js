'use strict';

const form = document.querySelector('#form');
const input = document.querySelector('#input');
const resultsList = document.querySelector('#results-list');
const button = document.querySelector('#button');
const urlBase = 'http://api.tvmaze.com/search/shows?q=';
const favouritesList = document.querySelector('#favourites-list');
let arrayFavourites = [];

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
    favouriteDelete.innerHTML = 'Borrar';
    favouriteDelete.classList.add('delete');
    favouriteLi.appendChild(favouriteSpan); favouriteLi.appendChild(favouriteDelete);
    favouriteLi.appendChild(favouriteImg);
    favouritesList.appendChild(favouriteLi);
    const allDeleteButtons = document.querySelectorAll('.delete');
    for (let eachDeleteButton of allDeleteButtons) {
        eachDeleteButton.addEventListener('click', deleteFavourite);
    }
};

const deleteFavourite = event => {
    const myLocalStorage = localStorage.getItem("settingFavourites");
    event.target.closest('li').remove();

    arrayFavourites = JSON.parse(myLocalStorage);
    // for (let object of arrayFavourites) {
    const elementSelected = event.target.parentElement.innerHTML;
    const indexOfElement = arrayFavourites.indexOf(elementSelected);

    console.log(indexOfElement);
    // }

    // const elementSelected = event.target.parentElement.innerHTML;
    // const indexOfElement = arrayFavourites.indexOf(singleObject);

    // console.log(indexOfElement);


};

button.addEventListener('click', hidePreviousResults);
button.addEventListener('click', searchHandler);
form.addEventListener('submit', introForSearch);
window.addEventListener('load', init);
