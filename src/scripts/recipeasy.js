import { backgroundCarousel } from "./background.js"

const body = document.getElementById("body")

export const mainContent = () => {
    let html = `
    <h1><span class="title_start">Recip</span>EZ</h1>
    <h2>What do you want to do today?</h2>
    <div class="main_buttons">
        <button class="main_button" id="search_button">SEARCH</button>
        <button class="main_button" id="save_button">SAVE</button>
    </div>
    `
    body.onload = backgroundCarousel()

    return html
}