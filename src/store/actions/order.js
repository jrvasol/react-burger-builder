import {PURCHASE_BURGER_SUCCESS, PURCHASE_BURGER_FAIL, PURCHASE_BURGER_START, PURCHASE_INIT, FETCH_ORDERS_START, FETCH_ORDERS_FAIL, FETCH_ORDERS_SUCCESS} from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {type: PURCHASE_BURGER_SUCCESS, orderId: id, orderData}
}

export const purchaseBurgerFail = (error) => {
    return {type: PURCHASE_BURGER_FAIL, error}
}

export const purchaseBurgerStart = () => {
    return {type: PURCHASE_BURGER_START}
}

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());

        const params = `?auth=${token}`;
        return axios
            .post('/orders.json' + params, orderData)
            .then((response) => {
                dispatch(purchaseBurgerSuccess(response.data.name, orderData));
            })
            .catch((error) => {
                dispatch(purchaseBurgerFail(error));
            });
    }
}

export const purchaseInit = () => {
    return {type: PURCHASE_INIT}
}

export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrdersStart());

        const params = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
        return axios
            .get('/orders.json' + params)
            .then((response) => {
                const fetchedOrders = [];
                // Concat key to orders data
                for (let key in response.data) {
                    fetchedOrders.push({
                        ...response.data[key],
                        id: key
                    });
                }

                dispatch(fetchOrdersSuccess(fetchedOrders));
            })
            .catch(error => dispatch(fetchOrdersFail(error)));
    }
}

export const fetchOrdersStart = () => {
    return {
        type: FETCH_ORDERS_START
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: FETCH_ORDERS_SUCCESS,
        orders
    }
}

export const fetchOrdersFail = (error) => {
    return {
        type: FETCH_ORDERS_FAIL,
        error
    }
}