import * as actionTypes from '../Actions/actionTypes'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

const initialState = {
    ingredients: null,
    totalPrice: 0,
    error: false,
    loading: false,
    building: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.payload]: state.ingredients[action.payload] + 1
                }
                ,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.payload]
            }

        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.payload]: state.ingredients[action.payload] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.payload],
                building: true
            }
        case actionTypes.INIT_INGREDIENTS:
            return {
                ...state,
                ingredients: action.ingredients,
                totalPrice: 0,
                error: false,
                building: false
            }

        case actionTypes.FETCH_FAILED:
            return {
                ...state,
                error: true
            }
        default:
            return state;
    }
}

export default reducer;