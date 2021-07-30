import React from 'react';
import {connect} from 'react-redux';

import Aux from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';
import BurgerIngredient from '../BurgerIngredient/BurgerIngredient';

import styles from './OrderSummary.module.css';

const OrderSummary = (props) => {
    const ingredientCount = (type) => {

        const arrLength = props
            .activeIngredients
            .filter(ing => ing.type === type)
            .length;
        return arrLength;
    }

    const ingredients = Object
        .keys(props.ingredients)
        .map((type, index) => {
            if (ingredientCount(type)) {
                return (
                    <li className={styles['ing-list-item']} key={type + index}>
                        <div className={styles['ing-container']}>
                            <div className={styles['ing-img']}>
                                <BurgerIngredient type={type} classes={styles['burger-ingredient']}/>
                            </div>
                            <div className={styles['ing-desc']}>
                                <p className={styles['ing-label']}>{props.ingredients[type].label}</p>
                                <p className={styles['ing-count']}>x {ingredientCount(type)}</p>
                            </div>
                        </div>
                        <div className={styles['price-container']}>
                            <p className={styles['price']}>₱{(ingredientCount(type) * props.ingredients[type].price).toFixed(2)}</p>
                        </div>
                    </li>
                )
            }

            return null;
        });

    return (
        <Aux>
            <div className={styles['header']}>
                <h1 className={styles['header-title']}>
                    <span className={styles['header-title-sub']}>Order</span>
                    <span className={styles['header-title-main']}>Summary</span>
                </h1>

                <svg
                    onClick={() => props.setCloseModal()}
                    className={styles['header-close']}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512.001 512.001"><path
                    d="M284.286 256.002L506.143 34.144c7.811-7.811 7.811-20.475 0-28.285-7.811-7.81-20.475-7.811-28.285 0L256 227.717 34.143 5.859c-7.811-7.811-20.475-7.811-28.285 0-7.81 7.811-7.811 20.475 0 28.285l221.857 221.857L5.858 477.859c-7.811 7.811-7.811 20.475 0 28.285 3.905 3.905 9.024 5.857 14.143 5.857 5.119 0 10.237-1.952 14.143-5.857L256 284.287l221.857 221.857c3.905 3.905 9.024 5.857 14.143 5.857s10.237-1.952 14.143-5.857c7.811-7.811 7.811-20.475 0-28.285L284.286 256.002z"/></svg>
            </div>

            <div className={styles['content']}>
                <ul className={styles['ing-list']}>{ingredients}</ul>
            </div>

            <div className={styles['footer']}>
                <div className={styles['total-container']}>
                    <div className={styles['total-desc']}>
                        <p className={styles['total-label']}>Total</p>
                        <p className={styles['total-sub']}>( with delivery and other charges )</p>
                    </div>
                    <p className={styles['total-price']}>₱{(props.totalPrice / 100).toFixed(2)}</p>
                </div>
                <Button clicked={props.continuePurchase} classes="block">Proceed to Checkout</Button>
            </div>
        </Aux>
    )
}

const mapStateToProps = ({burgerBuilder}) => {
    return {ingredients: burgerBuilder.ingredients, totalPrice: burgerBuilder.totalPrice, activeIngredients: burgerBuilder.activeIngredients}
}

export default connect(mapStateToProps)(OrderSummary);