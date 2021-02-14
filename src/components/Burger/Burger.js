import React from 'react';

import styles from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = (props) => {
    const ingLength = props.activeIngredients.length + 1;
    let ingredients = props.activeIngredients.map((type, index) => <BurgerIngredient key={type + index} type={type} zIndex={ingLength - index} classes={`${styles[props.burgerMode]} ${styles[type]}`}/>);
    
    if(ingredients.length === 0) {
        ingredients = <h3 className={styles['placeholder']}>Please start adding ingredients!</h3>;
    }

    return (
        <div className={styles['burger-container']}>
            <BurgerIngredient type="bread-top" zIndex={ingLength + 1} classes={`${styles[props.burgerMode]} ${styles['bread-top']}`}/> 
            {ingredients}
            <BurgerIngredient type="bread-bottom" zIndex="1" classes={`${styles[props.burgerMode]} ${styles['bread-bottom']}`}/>
        </div>
    )
}

export default Burger;