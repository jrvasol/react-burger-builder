import React from 'react';
import styles from './BuildControl.module.css';

const BuildControl = (props) => {
    return (
        <div className={styles['build-control']}>
            <div className={styles.label}>{props.label}</div>
            <button className={styles.less} disabled={props.disabledInfo} onClick={props.removeIngredient}>Less</button>
            <button className={styles.more} onClick={props.addIngredient}>More</button>
        </div>
    )
}

export default BuildControl;