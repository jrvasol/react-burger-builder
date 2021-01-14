import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

const CheckoutSummary = (props) => {
    return (
        <div>
            <h1>I hope it tastes good!</h1>
            <Burger ingredients={props.ingredients} />

            <Button btnType="Danger" clicked={props.handleCancel}>Cancel</Button>
            <Button btnType="Success" clicked={props.handleContinue}>Continue</Button>
        </div>
    )
}

export default CheckoutSummary;