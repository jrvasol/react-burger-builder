import React from 'react';
import styles from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl';

const BuildControls = (props) => {
    const ingredients = props.ingredients;
    const ingredientsControl = Object.keys(props.ingredients);

    const checkDisabledInfo = (type) => {
        return !props.activeIngredients.find(val => val === type);
    };

    const controls = ingredientsControl.map(type => (
        <BuildControl
                key={type}
                label={ingredients[type].label}
                disabledInfo={checkDisabledInfo(type)}
                addIngredient={() => props.addIngredient(type)}
                removeIngredient={() => props.removeIngredient(type)}/>
    )); 

    return (
        <div className={styles['build-controls']}>
            <h3>Current Price: ${(props.totalPrice / 100).toFixed(2)}</h3>
            {controls}
            <button
                className={styles.OrderButton}
                disabled={!props.purchasable} 
                onClick={props.setOpenModal}>{ props.isAuth ? 'Order Now' : 'Signup to order'}</button>
        </div>
    )
}

export default BuildControls;