import React from 'react';

import styles from './Logo.module.css';
import BurgerLogo from '../../assets/images/logo.png'

const Logo = (props) => (
    <div className={styles['logo-container']} >
        <img className={styles['logo']} src={BurgerLogo} alt="Laguna"/>
    </div>
);

export default Logo;