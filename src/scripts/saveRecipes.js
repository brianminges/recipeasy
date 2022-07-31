import { navBar } from "./navbar.js"
import { background2 } from "./background.js"
import { getCategories, getOccasions, sendRecipes } from "./dataAccess.js"

//This renders the SaveRecipe input fields 
export const saveRecipe = () => {
    
    const categories = getCategories()
    const occasions = getOccasions()

    let html= `
    ${navBar()}

    <h2 class="page_topper">Save a recipe</h2>
    <form>
        <div class="recipe_inputs">

            <fieldset class="recipe_input">
                <label for="title">Name</label>
                <input type="text" name="title" class="input_field" id="recipe_title" placeholder="Recipes are displayed alphabetically" required />
            </fieldset>
            <fieldset class="recipe_input">
                <label for="ingredients">Ingredients</label>
                <textarea type="text" name="ingredients" class="input_field" id="recipe_ingredients" wrap="hard" placeholder="Separate with a comma" required></textarea>
            </fieldset>
            <fieldset class="recipe_input">
                <label for="directions">Directions</label>
                <textarea type="text" name="directions" class="input_field" id="recipe_directions" placeholder="1. Step one \n2. Step two \n3. Step three" required></textarea>
            </fieldset>
            <fieldset class="recipe_input">
                <label for="url">URL</label>
                <input type="url" name="url" class="input_field recipe_add" id="recipe_url" />
            </fieldset>

        </div>

        <h3>What are you making?</h3>
            <div class="categories">
            ${categories.map(
                category => {
                return `
                <div>
                    <label>${category.name}</label>
                    <input type="radio" name="category_button" value="${category.id}" required />
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
                return `
                <div>
                    <label>${occasion.name}</label>
                    <input type="radio" name="occasion_button" value="${occasion.id}" required />
                </div>
                `
            }
            ).join("")
            }
            </div>

        <div class="main_buttons">
            <button type="submit" value="submit" class="main_button" id="save_recipe_button">SAVE RECIPE</button>
        </div>
    </form>
    `
    body.onload = background2()
    return html
}

//This gets user input from saveRecipe() and sends to API
mainContainer.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "save_recipe_button") {
        const recipeName = document.getElementById("recipe_title").value;
        const recipeIngredients = document.getElementById("recipe_ingredients").value;
        const recipeDirections = document.getElementById("recipe_directions").value;
        const recipeURL = document.getElementById("recipe_url").value;
        const category = document.querySelector("input[name='category_button']:checked").value;
        const occasion = document.querySelector("input[name='occasion_button']:checked").value;

        const dataToSendToAPI = {
            name: recipeName,
            ingredients: recipeIngredients,
            directions: recipeDirections,
            url: recipeURL,
            category: parseInt(category),
            occasion: parseInt(occasion),
            date: (new Date()).toLocaleDateString(),
            favorite: false
        }
        sendRecipes(dataToSendToAPI)
    }
})