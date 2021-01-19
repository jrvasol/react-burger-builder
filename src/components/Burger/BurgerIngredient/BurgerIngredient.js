import React from 'react';
import PropTypes from 'prop-types';

import styles from './BurgerIngredient.module.css';

// ingredients
import BreadTop from '../../../assets/images/ingredients/bun-top.svg';
import BreadBottom from '../../../assets/images/ingredients/bun-bottom.svg';
import Meat from '../../../assets/images/ingredients/meat.svg';
import Cheese from '../../../assets/images/ingredients/cheese.svg';
import Salad from '../../../assets/images/ingredients/salad.svg';
import Pickles from '../../../assets/images/ingredients/pickles.svg';
import Egg from '../../../assets/images/ingredients/egg.svg';

const BurgerIngredient = (props) => {
    let ingredient = null;

    switch (props.type) { 
        case('bread-bottom'):
            ingredient = <img src={BreadBottom} />;
            break;
        case('bread-top'):
            ingredient = <img src={BreadTop} />;
            break;
        case('meat'):
            ingredient = <img className={styles['ingredients']} src={Meat} />;
            break;
        case('cheese'):
            ingredient = <img className={styles['ingredients']} src={Cheese} />;
            break;
        case('salad'):
            ingredient = <img className={styles['ingredients']} src={Salad} />;
            break;
        case('pickles'):
            ingredient = <img className={styles['ingredients']} src={Pickles} />;
            break;
        case('egg'):
            ingredient = <img className={styles['ingredients']} src={Egg} />;
            break;
        default:
            ingredient = null;
    }

    return ingredient;
}

BurgerIngredient.propTypes = {
    type: PropTypes.string.isRequired
}

export default BurgerIngredient