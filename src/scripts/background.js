import { getImages } from "./dataAccess.js"
 
const body = document.getElementById("body")

//This rotates the background images on homepage
export const backgroundCarousel = () => {
    const images = getImages()
    const randomNumber = Math.floor( Math.random() * (images.length));
    body.style.backgroundImage = images[randomNumber].photo;
}

//This is for the static background on search for recipe page 
export const background = () => {
    body.style.backgroundImage = "url('./../images/bg-bread.png')";
}

//This is for the static background on save recipe page 
export const background2 = () => {
    body.style.backgroundImage = "url('./../images/bg-bread.png')";
}

//This is for the static background on search results page 
export const background3 = () => {
    body.style.backgroundImage = "url('./../images/bg-herb.png')";
}
 
