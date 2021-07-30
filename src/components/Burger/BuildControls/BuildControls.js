import React from 'react';
import styles from './BuildControls.module.css';

import BuildControl from './BuildControl/BuildControl';
import {getIngredientCount} from '../../../shared/utility';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const BuildControls = (props) => {
    const ingredients = props.ingredients;
    const ingredientsControl = Object.keys(props.ingredients);

    const checkDisabledInfo = (type) => {
        return !props.activeIngredients.find((val) => val.type === type);
    };

    const ingredientTotalPrice = (type) => {
        return (getIngredientCount(props.activeIngredients, type) * ingredients[type].price).toFixed(2); 
    };
 
    const sliderSettings = {
        dots: false,
        arrows: false,
        centerMode: true,
        infinite: true,
        slidesToShow: 1,
        focusOnSelect: true,
        variableWidth: true
    };

    const controls = ingredientsControl.map(type => (
        <BuildControl
            key={type}
            type={type}
            ingredientTotalPrice={ingredientTotalPrice(type)}
            ingredientCount={getIngredientCount(props.activeIngredients, type)}
            label={ingredients[type].label}
            disabledInfo={checkDisabledInfo(type)}
            addIngredient={() => props.addIngredient(type)}
            removeIngredient={() => props.removeIngredient(type)}/>
    ));

    return (
        <div className={styles['build-controls']}>
            <Slider {...sliderSettings} style={{width: '100%'}}>
                {controls}
            </Slider>

            <h3>Total: ₱{(props.totalPrice / 100).toFixed(2)}</h3>
            <button
                className={styles.OrderButton}
                disabled={!props.purchasable} 
                onClick={props.setOpenModal}>{ props.isAuth ? 'Order Now' : 'Sign in to order'}</button>
        </div>
    )
}

export default BuildControls;