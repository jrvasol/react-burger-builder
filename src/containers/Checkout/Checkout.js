import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

const Checkout = (props) => {
    const handleContinue = () => {
        props
            .history
            .replace('/checkout/contact-details');
    };

    const handleCancel = () => {
        props
            .history
            .goBack();
    };

    let summary = <Redirect to="/"/>;
    if (props.ingredients) { 
        const purchaseRedirect = props.purchased ? <Redirect to="/"/> : null;
        summary = (
            <div> 
                {purchaseRedirect}
                <CheckoutSummary
                    ingredients={props.ingredients}
                    handleContinue={handleContinue}
                    handleCancel={handleCancel}/> 
                
                < Route path = {`${props.match.url}/contact-details`} component = { ContactData} /> 
            </div>
        );
    }

    return summary;
}

const mapStateToProps = ({burgerBuilder, order}) => ({ingredients: burgerBuilder.ingredients, purchased: order.purchased});

export default connect(mapStateToProps)(Checkout);