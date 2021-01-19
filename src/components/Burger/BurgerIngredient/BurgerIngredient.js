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
    const setImg = (src, alt = "", index) => {
        return <img className={styles['ingredients']} src={src} alt={alt} style={{zIndex: index}}/>;
    };

    let ingredient = null;

    switch (props.type) { 
        case('bread-bottom'):
            ingredient = setImg(BreadBottom, props.type, props.zIndex);
            break;
        case('bread-top'):
            ingredient = setImg(BreadTop, props.type, props.zIndex);
            break;
        case('meat'):
            ingredient = setImg(Meat, props.type, props.zIndex);
            break;
        case('cheese'):
            ingredient = setImg(Cheese, props.type, props.zIndex);
            break;
        case('salad'):
            ingredient = setImg(Salad, props.type, props.zIndex);
            break;
        case('pickles'):
            ingredient = setImg(Pickles, props.type, props.zIndex);
            break;
        case('egg'):
            ingredient = setImg(Egg, props.type, props.zIndex);
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