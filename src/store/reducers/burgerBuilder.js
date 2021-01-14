import {ADD_INGREDIENT, REMOVE_INGREDIENT, SET_INGREDIENTS, SET_INGREDIENTS_FAILED} from '../actions/actionTypes';

const initialState = {
    ingredients: null,
    totalPrice: 400,
    error: false,
    building: false
};

const INGREDIENT_PRICE = {
    salad: 50,
    cheese: 40,
    meat: 130,
    bacon: 70
}

const burgerBuilder = (state = initialState, action) => {
    switch (action.type) {
        case ADD_INGREDIENT:
            {
                const updatedIngredients = {
                    ...state.ingredients,
                    [action.ingredient]: state.ingredients[action.ingredient] + 1
                };

                return {
                    ...state,
                    ingredients: updatedIngredients,
                    totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredient],
                    building: true
                }
            }
        case REMOVE_INGREDIENT:
            {
                const updatedIngredients = {
                    ...state.ingredients,
                    [action.ingredient]: state.ingredients[action.ingredient] - 1
                }

                return {
                    ...state,
                    ingredients: updatedIngredients,
                    totalPrice: state.totalPrice - INGREDIENT_PRICE[action.ingredient],
                    building: true
                }
            }

        case SET_INGREDIENTS:
            {
                return {
                    ...state,
                    ingredients: action.ingredients,
                    totalPrice: 400,
                    error: false,
                    building: false
                }
            }

        case SET_INGREDIENTS_FAILED:
            {
                return {
                    ...state,
                    error: true
                }
            }

        default:
            return state;
    }
};

export default burgerBuilder;