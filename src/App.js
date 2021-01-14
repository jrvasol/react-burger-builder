import React, {useEffect, lazy, Suspense} from 'react';
import {Switch, Route, withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import {authCheckState} from './store/actions/auth';

import Layout from './components/Layout/Layout';
import Logout from './containers/Auth/Logout/Logout';

const BurgerBuilder = lazy(() => import('./containers/BurgerBuilder/BurgerBuilder'));
const Checkout = lazy(() => import('./containers/Checkout/Checkout'));
const MyOrders = lazy(() => import('./containers/MyOrders/MyOrders'));
const Auth = lazy(() => import('./containers/Auth/Auth'));

const App = ({onAuthCheckState, isAuthenticated}) => {
    useEffect(() => { 
        onAuthCheckState()
    }, [onAuthCheckState]);

    let routes = (
        <Switch>
            <Route path="/" exact component={BurgerBuilder}/>
            <Route path="/login" component={Auth}/>
            <Redirect to="/"/>
        </Switch>
    )

    if(isAuthenticated) {
        routes = (
        <Switch>
            <Route path="/" exact component={BurgerBuilder}/>
            <Route path="/checkout" component={Checkout}/>
            <Route path="/my-orders" component={MyOrders}/>
            <Route path="/login" component={Auth}/> 
            <Route path="/logout" component={Logout}/>
            <Redirect to="/"/>
        </Switch>)
    }

    return (
        <div>
            <Layout>
                <Suspense fallback={<div>Loading...</div>}>
                    {routes}
                </Suspense>
            </Layout>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuthCheckState: () => dispatch(authCheckState())
    }
};

const mapStateToProps = ({auth}) => ({
    isAuthenticated: auth.token !== null
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
