import React from 'react';

import NavigationItems from '../NavigationItems/NavigationItems';

import styles from './Toolbar.module.css';
import Logo from '../../Logo/Logo';

const Toolbar = (props) => (
    <header className={styles['toolbar']}>
        <div className={styles['toolbar-logo']}>
            <Logo/>
        </div>

        <div className={styles['toolbar-nav']}>
            <div className={styles['toolbar-menu-btn']} onClick={props.openMenu}>
                <div></div>
                <div></div>
                <div></div>
            </div>

            <nav> 
                <NavigationItems/>
            </nav>
        </div>
    </header>
)

export default Toolbar;