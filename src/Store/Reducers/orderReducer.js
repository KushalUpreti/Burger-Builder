import * as actionTypes from '../Actions/actionTypes';
import { utilityMethod } from '../Utilities/Utility';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
}

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT:
            return utilityMethod(state, { purchased: false });

        case actionTypes.PURCHASE_BURGER_START:
            return utilityMethod(state, { loading: true });

        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderId
            }
            return {
                ...state,
                purchased: true,
                loading: false,
                orders: state.orders.concat(newOrder)
            }

        case actionTypes.PURCHASE_BURGER_FAILED:
            return utilityMethod(state, { loading: false });

        case actionTypes.FETCH_ORDER_START:
            return utilityMethod(state, { loading: true });

        case actionTypes.FETCH_ORDER_SUCCESS:
            return {
                ...state,
                orders: action.orders,
                loading: false
            }

        case actionTypes.FETCH_ORDER_FAIL:
            return utilityMethod(state, { loading: false });

        default:
            return state;
    }
}

export default orderReducer;