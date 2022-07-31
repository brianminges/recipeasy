import { fetchImages, fetchRecipes, fetchCategories, fetchOccasions, fetchFavorites } from "./dataAccess.js"
import { saveRecipe } from "./saveRecipes.js"
import { searchRecipes } from "./searchForRecipes.js"
import { displayRecipe } from "./displayRecipe.js"
import { mainContent } from "./recipeasy.js"

const mainContainer = document.getElementById("mainContainer")
 
const render = () => {
    fetchImages().then(
        () => {
            fetchRecipes().then(
                () => {
                    fetchCategories().then(
                        () => {
                            fetchOccasions().then(
                                () => {
                                    fetchFavorites().then(
                                        () => {
                                            mainContainer.innerHTML = mainContent()
                                        }
                                    )
                                }
                            )
                        }
                    )
                }
            )
        }
    )
}

render() 

// This loads the saveRecipe page
mainContainer.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "save_button") {
        mainContainer.innerHTML = saveRecipe()
    }
})

//This loads the searchForRecipe page
mainContainer.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "search_button") {
        mainContainer.innerHTML = searchRecipes()
    }
})

//This loads the results of a search
mainContainer.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "search_recipe_button") {
        mainContainer.innerHTML = displayRecipe()
    }
})

// This re-renders page for custom events
mainContainer.addEventListener("stateChanged", customEvent => {
    render();
})
 