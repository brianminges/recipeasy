const applicationState = {
    images: [],
    recipes: [],
    categories: [],
    occasions: [],
    favorites: []
}

// API
const API = "http://localhost:8088"
// const API = "http://localhost:3000"

//GET FUNCTIONS
export const fetchImages = () => {
    return fetch(`${API}/images`)
        .then(response => response.json())
        .then (
            (dataFromAPI) => {
                applicationState.images = dataFromAPI
            }
        )
}

export const fetchRecipes = () => {
    return fetch(`${API}/recipes`)
        .then(response => response.json())
        .then(
            (dataFromAPI) => {
                applicationState.recipes = dataFromAPI
            }
        )
}

export const fetchCategories = () => {
    return fetch(`${API}/categories`)
        .then(response => response.json())
        .then(
            (dataFromAPI) => {
                applicationState.categories = dataFromAPI
            }
        ) 
}

export const fetchOccasions = () => {
    return fetch(`${API}/occasions`)
        .then(response => response.json())
        .then(
            (dataFromAPI) => {
                applicationState.occasions = dataFromAPI
            }
        ) 
}

export const fetchFavorites = () => {
    return fetch(`${API}/recipes`)
        .then(response => response.json())
        .then (
            (dataFromAPI) => {
                dataFromAPI.forEach(recipe => {
                    if (recipe.favorite === true) {
                        applicationState.favorites.push(recipe)
                    }
                })
            }
        )
}

//POST FUNCTIONS
// This adds a recipe to the database
export const sendRecipes = (recipeInfo) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(recipeInfo)
    }

    return fetch(`${API}/recipes`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            applicationState.favorites = []
            const mainContainer = document.getElementById("mainContainer")
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

//DELETE FUNCTIONS
// This deletes a recipe from the database
export const deleteRequest = (recipeId) => {
    return fetch(`${API}/recipes/${recipeId}`, {method: "DELETE" })
        .then( 
            () => {
            applicationState.favorites = []
            const mainContainer = document.getElementById("mainContainer")
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

//PATCH FUNCTIONS
// This edits a recipe
export const editRequest = (recipeId, dataToSendToAPI) => {
    const fetchOptions = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dataToSendToAPI)
    }

    return fetch(`${API}/recipes/${recipeId}`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            applicationState.favorites = []
            const mainContainer = document.getElementById("mainContainer")
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

// This adds a recipe to the favorites list
export const addFavorite = (recipeId, dataToSendToAPI) => {
    const fetchOptions = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dataToSendToAPI)
    }

    return fetch(`${API}/recipes/${recipeId}`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            applicationState.favorites = []
            const mainContainer = document.getElementById("mainContainer")
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

// This deletes a recipe from the favorites list
export const deleteFavorite = (recipeId, dataToSendToAPI) => {
    const fetchOptions = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dataToSendToAPI)
    }

    return fetch(`${API}/recipes/${recipeId}`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            applicationState.favorites = []
            const mainContainer = document.getElementById("mainContainer")
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

//GETTER FUNCTIONS 
export const getImages = () => {
    return applicationState.images.map(image =>({...image}))
}

export const getRecipes = () => {
    return applicationState.recipes.map(recipe =>({...recipe}))
}
 
export const getCategories = () => {
    return applicationState.categories.map(category => ({...category}))
}

export const getOccasions = () => {
    return applicationState.occasions.map(occasion => ({...occasion}))
}

export const getFavorites = () => {
    return applicationState.favorites.map(favorite =>({...favorite}))
} 
 