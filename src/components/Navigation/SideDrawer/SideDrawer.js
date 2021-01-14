import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import styles from './SideDrawer.module.css';

const SideDrawer = (props) => {
    return (
        <div className={styles['side-drawer']}>
            <div className={styles['side-drawer__logo']}>
                <Logo/>
            </div>
            <nav>
                <NavigationItems></NavigationItems>
            </nav>
        </div>
    )
}

export default SideDrawer;