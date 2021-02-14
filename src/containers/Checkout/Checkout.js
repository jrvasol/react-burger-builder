import React from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

const Checkout = (props) => {
    let summary = <Redirect to="/"/>;
    if (props.ingredients) { 
        const purchaseRedirect = props.purchased ? <Redirect to="/"/> : null;
        summary = (
            <div> 
                {purchaseRedirect}
                <CheckoutSummary
                    activeIngredients={props.activeIngredients}
                    ingredients={props.ingredients}/> 
                <ContactData/>
            </div>
        );
    }

    return summary;
}

const mapStateToProps = ({burgerBuilder, order}) => ({ingredients: burgerBuilder.ingredients, activeIngredients : burgerBuilder.activeIngredients, purchased: order.purchased});

export default connect(mapStateToProps)(Checkout);