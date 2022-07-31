import { navBar } from "./navbar.js"
import { background3 } from "./background.js"
import { getRecipes, getCategories, getOccasions, deleteRequest, editRequest, deleteFavorite, addFavorite } from "./dataAccess.js"

//This executes search results based on type, occasion, name, favorite or type AND occasion and displays them in a card based on favorite status
export const searchResults = () => {
    const type = parseInt(document.getElementById("dropdown_byType").value);
    const occasion = parseInt(document.getElementById("dropdown_byOccasion").value);
    const name = parseInt(document.getElementById("dropdown_byName").value);
    const favorite = parseInt(document.getElementById("dropdown_byFavorite").value);

    const recipes = getRecipes()

    let searchResults = []
    recipes.forEach(recipe => {
        if ( (recipe.category === type) && (recipe.occasion === occasion) ) {
            searchResults.push(recipe)
        } else if ( (recipe.category === type) && ( isNaN(occasion) ) && ( isNaN(name) ) && ( isNaN(favorite) )) {
            searchResults.push(recipe)
        } else if ( (recipe.occasion === occasion) && ( isNaN(type) ) && ( isNaN(name) && ( isNaN(favorite) ) )) {
            searchResults.push(recipe)
        } else if ( (recipe.id === name) && ( isNaN(type) ) && ( isNaN(occasion) && ( isNaN(favorite) ) )) { 
            searchResults.push(recipe) 
        } else if ( (recipe.id === favorite && ( isNaN(type) ) && ( isNaN(occasion) ) && ( isNaN(name) ) )) {
            searchResults.push(recipe)
        }
    })

    searchResults.sort((a,b) => (a.name > b.name) ? 1 : -1) //Puts recipes in alphabetical order

    let html = `
    <div>
        <ul class="search_results_cards">
            ${searchResults.map(
                searchResult => {
                    if (searchResult.favorite === true) {
                        return `
                        <div class="search_results_card favorited">
                            <div class="search_results_card_overflow">
                            <h3 id="search_results_header">${searchResult.name}</h3>
                            <p id="search_results_date">Posted on ${searchResult.date}</p>
                            <p><strong>Ingredients:</strong> ${searchResult.ingredients}</p>
                            <p><strong>Directions:</strong> ${searchResult.directions}</p>
                            <p><strong>URL:</strong> <a href="${searchResult.url}">${searchResult.url}</a></p>
                            </div>

                            <div class="search_results_card_buttons">
                                <button value="${searchResult.id}" class="search_results_card_button" id="edit_button">Edit</button>
                                <button value="${searchResult.id}" class="search_results_card_button" id="delete_button">Delete</button>
                                <button value="${searchResult.id}" class="search_results_card_button" id="unfavorite_button">Unfavorite</button>
                            </div>
                        </div>`
                                        
                    } else if (searchResult.favorite === false) {
                        return `
                        <div class="search_results_card">
                            <div class="search_results_card_overflow">
                            <h3 id="search_results_header">${searchResult.name}</h3>
                            <p id="search_results_date">Posted on ${searchResult.date}</p>
                            <p><strong>Ingredients:</strong> ${searchResult.ingredients}</p>
                            <p><strong>Directions:</strong> ${searchResult.directions}</p>
                            <p><strong>URL:</strong> <a href="${searchResult.url}">${searchResult.url}</a></p>
                            </div>

                            <div class="search_results_card_buttons">
                                <button value="${searchResult.id}" class="search_results_card_button" id="edit_button">Edit</button>
                                <button value="${searchResult.id}" class="search_results_card_button" id="delete_button">Delete</button>
                                <button value="${searchResult.id}" class="search_results_card_button" id="favorite_button">Favorite</button>
                            </div>
                        </div>`
                    }
                }
                ).join("")
                }
        </ul>
    </div>
    `
    return html      
}
 

//This renders the 'Your search results' page with the results of the searchResults function above
export const displayRecipe = () => {

    let html = `
    ${navBar()}
    <h2 class="page_topper">Here are your search results</h2>
    ${searchResults()}
    `

    body.onload = background3()
    return html
}

//This adds a recipe as a favorite
mainContainer.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "favorite_button") {
        let recipeId = parseInt(clickEvent.target.value)

        const dataToSendToAPI = {
            favorite: true,
        }
        
        addFavorite(recipeId, dataToSendToAPI)
    }
})

//This deletes a recipe as a favorite 
mainContainer.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "unfavorite_button") {
        let recipeId = parseInt(clickEvent.target.value)

        const dataToSendToAPI = {
            favorite: false,
        }
        
        deleteFavorite(recipeId, dataToSendToAPI)
    }
})

// This deletes a recipe from the database using the 'delete' button 
mainContainer.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "delete_button") {
        deleteRequest(clickEvent.target.value)
    }
})

// This allows a user to edit the recipe in the database using the 'edit' button 
let recipeId
mainContainer.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "edit_button") {

        recipeId = parseInt(clickEvent.target.value)
        const recipes = getRecipes();
        const categories = getCategories();
        const occasions = getOccasions();

        recipes.forEach(recipe => {
            if (recipeId === recipe.id)        

            mainContainer.innerHTML = `
            ${navBar()}
            <h2 class="page_topper">You're editing ${recipe.name}</h2>
            <p class="center">You must fill in all fields.</p> 
            <form>
                <div class="recipe_inputs"
                    <fieldset class="recipe_input">
                        <label for="title">Name</label>
                        <input type="text" value="${recipe.name}" name="title" class="input_field" id="new_recipe_title" required />
                    </fieldset>
                    <fieldset class="recipe_input">
                        <label for="ingredients">Ingredients</label>
                        <textarea type="text" name="ingredients" class="input_field" id="new_recipe_ingredients" required>${recipe.ingredients}</textarea>
                    </fieldset>
                    <fieldset class="recipe_input">
                        <label for="directions">Directions</label>
                        <textarea type="text" name="directions" class="input_field" id="new_recipe_directions" required>${recipe.directions}</textarea>
                    </fieldset>
                    <fieldset class="recipe_input">
                        <label for="url">URL</label>
                        <input type="url" value="${recipe.url}" name="url" class="input_field" id="new_recipe_url" />
                    </fieldset>
                </div>

                <h3>What are you making?</h3>
                <div class="categories">
                ${categories.map(
                    category => {
                        if (recipe.category === category.id) {
                            return  `
                            <div>
                                <label>${category.name}</label>
                                <input type="radio" name="category_button" value="${category.id}" checked>
                            </div>
                            `
                        } else 
                            return `
                                <div>
                                    <label>${category.name}</label>
                                    <input type="radio" name="category_button" value="${category.id}">
                                </div>
                                `
                                }
                                ).join("")
                                } 
                </div>
        
                <h3>What's the occasion?</h3>
                <div class="categories">
                ${occasions.map(
                    occasion => {
                        if (recipe.occasion === occasion.id) {
                            return  `
                            <div>
                                <label>${occasion.name}</label>
                                <input type="radio" name="occasion_button" value="${occasion.id}" checked>
                            </div>
                            `
                        } else 
                            return `
                                <div>
                                    <label>${occasion.name}</label>
                                    <input type="radio" name="occasion_button" value="${occasion.id}">
                                </div>
                                `
                                }
                                ).join("")
                                }
                </div>

                <div class="main_buttons">
                    <button class="main_button" id="edit_recipe_button">SAVE EDIT</button>
                </div>
            </form>
            `
        })
    }
})
 
mainContainer.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "edit_recipe_button") {
        const newTitle = document.getElementById("new_recipe_title").value;
        const newIngredients = document.getElementById("new_recipe_ingredients").value;
        const newDirections = document.getElementById("new_recipe_directions").value;
        const newURL = document.getElementById("new_recipe_url").value;
        const newCategory = document.querySelector("input[name='category_button']:checked").value;
        const newOccasion = document.querySelector("input[name='occasion_button']:checked").value;

        const dataToSendToAPI = {
            name: newTitle,
            ingredients: newIngredients,
            directions: newDirections,
            url: newURL,
            category: parseInt(newCategory),
            occasion: parseInt(newOccasion),
            date: (new Date()).toLocaleDateString()
        }
        editRequest(recipeId, dataToSendToAPI)
    }
})