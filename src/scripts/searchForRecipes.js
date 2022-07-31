import { navBar } from "./navbar.js"
import { background } from "./background.js"
import { getRecipes, getCategories, getOccasions, getFavorites } from "./dataAccess.js"

// This renders the searchForRecipe dropdown menus -- type, occasion, name, favorites
export const searchRecipes = () => {
    const recipes = getRecipes()
    const categories = getCategories()
    const occasions = getOccasions()
    const favorites = getFavorites()
    
    recipes.sort((a,b) => (a.name > b.name) ? 1 : -1) //Puts recipes in alphabetical order

    let html= `
    ${navBar()}

    <h2 class="page_topper search_topper">Search for a recipe</h2>
    <p class="center">Select from one of the menus or by both type AND occasion</p> 
    <div class="search_dropdowns">
        <div class="search_dropdown_cluster">
            <label class="search_label">By Type</label>
            <select class="search_dropdown" id="dropdown_byType">
                <option>Please select ... </option>
                ${categories.map(
                    category => {
                    return `<option value="${category.id}">${category.name}</option>`
                }
                ).join("")
                }
            </select>
        </div>

        <div class="search_dropdown_cluster">
            <label class="search_label">By Occasion</label>
            <select class="search_dropdown" id="dropdown_byOccasion">
                <option>Please select ...</option>
                ${occasions.map(
                    occasion => {
                    return `<option value="${occasion.id}">${occasion.name}</option>`
                }
                ).join("")
                }
            </select>
        </div>

        <div class="search_dropdown_cluster">
            <label class="search_label">By Name</label>
            <select class="search_dropdown" id="dropdown_byName">
                <option>Please select ...</option>
                ${recipes.map(
                    recipe => {
                    return `<option value="${recipe.id}">${recipe.name}</option>`
                }
                ).join("")
                }
            </select>
        </div>

        <div class="search_dropdown_cluster">
            <label class="search_label">By Favorite</label>
            <select class="search_dropdown" id="dropdown_byFavorite">
                <option>Please select ...</option>
                ${favorites.map(
                    favorite => {
                    return `<option value="${favorite.id}">${favorite.name}</option>`
                }
                ).join("")
                }
            </select>
        </div>
    </div>

    <div class="main_buttons">
        <button class="main_button" id="search_recipe_button">FIND RECIPE</button>
    </div>
    `
    body.onload = background()
    return html
}
