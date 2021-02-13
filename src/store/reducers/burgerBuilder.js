import {ADD_INGREDIENT, REMOVE_INGREDIENT, SET_INGREDIENTS, SET_INGREDIENTS_FAILED} from '../actions/actionTypes';

const initialState = {
    ingredients: null,
    activeIngredients: [],
    totalPrice: 400,
    error: false,
    building: false
};

const burgerBuilder = (state = initialState, action) => {
    switch (action.type) {
        case ADD_INGREDIENT:
            {
                const activeIngs = [action.ingredient, ...state.activeIngredients];

                return {
                    ...state,
                    activeIngredients: activeIngs,
                    totalPrice: state.totalPrice + (state.ingredients[action.ingredient].price * 100),
                    building: true
                }
            }
        case REMOVE_INGREDIENT:
            {
                const updatedIngredients = [...state.activeIngredients];
                const idx = state.activeIngredients.findIndex((type) => type === action.ingredient);
                updatedIngredients.splice(idx, 1);

                return {
                    ...state,
                    activeIngredients: updatedIngredients,
                    totalPrice: state.totalPrice - (state.ingredients[action.ingredient].price * 100),
                    building: true
                }
            }

        case SET_INGREDIENTS:
            {
                return {
                    ...state,
                    ingredients: action.ingredients,
                    activeIngredients: ['meat', 'cheese', 'pickles', 'tomato', 'salad', 'onion'],
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