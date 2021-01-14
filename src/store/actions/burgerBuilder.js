import { ADD_INGREDIENT, REMOVE_INGREDIENT, SET_INGREDIENTS, SET_INGREDIENTS_FAILED } from './actionTypes';
import axios from '../../axios-orders';

export const setIngredientsFailed = () => ({
    type: SET_INGREDIENTS_FAILED
});

export const setIngredients = (ingredients) => ({
    type: SET_INGREDIENTS,
    ingredients
});

export const getIngredients = () => {
    return (dispatch) => {
        return axios
                .get('/ingredients.json')
                .then((response) => {
                    dispatch(setIngredients(response.data))
                })
                .catch((error) => {
                    dispatch(setIngredientsFailed());
                })
    }
}

export const addIngredient = (ingredient) => ({
    type: ADD_INGREDIENT,
    ingredient
});

export const removeIngredient = (ingredient) => ({
    type: REMOVE_INGREDIENT,
    ingredient
})