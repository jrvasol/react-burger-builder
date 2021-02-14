import React from 'react';
import {connect} from 'react-redux';

import NavigationItem from './NavigationItem/NavigationItem';
import styles from './NavigationItems.module.css';

const NavigationItems = (props) => {
    return (
        <ul className={styles['nav-item-container']}>
            <NavigationItem closeSideDrawer={props.closeSideDrawer} link="/" exact={true}>Burger Builder</NavigationItem>
            {props.isAuthenticated ? <NavigationItem closeSideDrawer={props.closeSideDrawer} link="/my-orders">My Orders</NavigationItem> : null}
            {props.isAuthenticated ? <NavigationItem link="/logout">Sign out</NavigationItem> : <NavigationItem closeSideDrawer={props.closeSideDrawer} link="/signin">Sign in</NavigationItem>}
            {!props.isAuthenticated ? <NavigationItem closeSideDrawer={props.closeSideDrawer} link="/signup">Sign up</NavigationItem> : null}
        </ul>
    )
}

const mapStateToProps = ({auth}) => ({ 
    isAuthenticated: auth.token !== null
})

export default connect(mapStateToProps)(NavigationItems);