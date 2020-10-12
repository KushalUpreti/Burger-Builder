import * as actionTypes from './actionTypes';
import axios from '../../axios_inst';

export const addIngredient = (ingredient) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        payload: ingredient
    }
}

export const removeIngredient = (ingredient) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        payload: ingredient
    }
}

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.INIT_INGREDIENTS,
        ingredients: ingredients
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get("ingredients.json")
            .then((response) => {
                dispatch(setIngredients(response.data));
                // let price = 0;
                // for (const key in response.data) {
                //     price = price + (INGREDIENT_PRICES[key] * response.data[key]);
                // }
            }).catch(error => {
                dispatch(fetchFailed());
            })
    }
}


export const fetchFailed = () => {
    return {
        type: actionTypes.FETCH_FAILED
    }
}
