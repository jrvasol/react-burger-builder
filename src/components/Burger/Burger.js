import React from 'react';

import styles from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = (props) => {
    let ingredients = Object
        .keys(props.ingredients)
        .map((type) => {
            return [...Array(props.ingredients[type])].map((val, index) => {
                return <BurgerIngredient key={type + index} type={type}/>
            })
        })
        .reduce((arr, el) => {
            return arr.concat(el)
        }, []);

    if(ingredients.length === 0) {
        ingredients = <h3>Please start adding ingredients!</h3>;
    }  

    return (
        <div className={styles['burger-container']}>
            <BurgerIngredient type="bread-top"/> {ingredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    )
}

export default Burger;