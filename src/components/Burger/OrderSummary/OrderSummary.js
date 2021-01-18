import React from 'react';
import {connect} from 'react-redux';

import Aux from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {
    const ingredients = Object
        .keys(props.ingredients)
        .map((key, index) => {
            return (
                <li key={key + index}>
                    <span>{key}</span>: {props.ingredients[key]}
                </li>
            )
        });

    return (
        <Aux>
            <h3>Your order:</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>{ingredients}</ul>
            <p>
                <strong>Yennifuuuhhhh!!! Yo total is ${(props.totalPrice / 100).toFixed(2)}</strong>
            </p>

            <p>Check me out? *wink*</p>
            <Button clicked={props.setCloseModal} btnType={'Danger'}>Cancel</Button>
            <Button clicked={props.continuePurchase} btnType={'Success'}>Continue</Button>
        </Aux>
    )
}

const mapStateToProps = ({burgerBuilder}) => {
    return {
        ingredients: burgerBuilder.ingredients,
        totalPrice: burgerBuilder.totalPrice
    }
}

export default connect(mapStateToProps)(OrderSummary);