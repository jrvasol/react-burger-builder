import React, {useEffect} from 'react';
import { connect } from 'react-redux';

import {fetchOrders} from '../../store/actions/order';

import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';

const MyOrders = ({orders, onFetchOrder, loading, token, userId}) => {

    useEffect(() => {
        onFetchOrder(token, userId);
    }, [onFetchOrder]); // eslint-disable-line react-hooks/exhaustive-deps 

    let order = <Spinner/>;
    if (!loading) {
        order = orders.map((order) => <Order key={order.id} ingredients={order.ingredients} price={order.price}/>);
    }
 
    return (
        <div>
            {order}
        </div>
    )
};

const mapStateToProps = ({ order, auth }) => ({
    orders: order.orders,
    loading: order.loading,
    token: auth.token,
    userId: auth.userId
});

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrder: (token, userId) => dispatch(fetchOrders(token, userId))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(MyOrders, axios));