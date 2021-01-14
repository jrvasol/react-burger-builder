import React from 'react';
import styles from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {
        label: 'Bacon',
        type: 'bacon'
    }, {
        label: 'Salad',
        type: 'salad'
    }, {
        label: 'Cheese',
        type: 'cheese'
    }, {
        label: 'Meat',
        type: 'meat'
    }
]

const BuildControls = (props) => {
    const disabledInfo = {
        ...props.ingredients
    };

    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0;
    };

    return (
        <div className={styles['build-controls']}>
            <h3>Current Price: ${(props.totalPrice / 100).toFixed(2)}</h3>
            {controls.map((val) => (<BuildControl
                key={val.type}
                label={val.label}
                disabledInfo={disabledInfo[val.type]}
                addIngredient={() => props.addIngredient(val.type)}
                removeIngredient={() => props.removeIngredient(val.type)}/>))}
            <button
                className={styles.OrderButton}
                disabled={!props.purchasable} 
                onClick={props.setOpenModal}>{ props.isAuth ? 'Order Now' : 'Signup to order'}</button>
        </div>
    )
}

export default BuildControls;