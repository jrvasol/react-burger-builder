import React from 'react';
import styles from './Spinner.module.css';

const Spinner = () => (
    <div className={styles['spinner3']}>
        <div className={`${styles['circle']} ${styles['one']}`}></div>
        <div className={`${styles['circle']} ${styles['two']}`}></div>
        <div className={`${styles['circle']} ${styles['three']}`}></div>
    </div>
);

export default Spinner;