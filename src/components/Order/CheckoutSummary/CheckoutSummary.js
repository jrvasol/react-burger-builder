import React from 'react';

import Burger from '../../Burger/Burger';

import styles from './CheckoutSummary.module.css';

const CheckoutSummary = (props) => {
    return (
        <div>
            <div className={styles['header']}>
                <h1 className={styles['header-title']}>Checkout</h1>
                <p className={styles['header-sub']}>I hope it tastes good!</p>
            </div>
            <Burger ingredients={props.ingredients} activeIngredients={props.activeIngredients}/>
        </div>
    )
}

export default CheckoutSummary;