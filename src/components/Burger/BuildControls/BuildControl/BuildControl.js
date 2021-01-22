import React from 'react';
import styles from './BuildControl.module.css';
import '../../../../assets/css/BuildControl.css';

import BurgerIngredient from '../../BurgerIngredient/BurgerIngredient';

const BuildControl = (props) => {
    return (
        <div className={styles['build-control']}>
            <BurgerIngredient type={props.type} classes={styles['burger-ingredient']}/>
            <div className={`build-control-info`}>
                <div className={styles['label-container']}> 
                    <p className={styles.label}>{props.label}</p>
                </div>
                <div className={styles['controls-container']}>
                    <div className={styles['controls']}>
                        <button className={styles.less} disabled={props.disabledInfo} onClick={props.removeIngredient}>-</button>
                        <p className={styles['amount']}>{props.ingredientCount}</p>
                        <button className={styles.more} onClick={props.addIngredient}>+</button>
                    </div>

                    <p className={styles['price-total']}>${props.ingredientTotalPrice}</p>
                </div>
            </div>
        </div>
    )
}

export default BuildControl;