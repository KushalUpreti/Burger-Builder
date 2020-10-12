import React from 'react';
import classes from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem';

const nav = (props) => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" >Burger Builder</NavigationItem>
            {props.isAuthenticated ? <NavigationItem link="/orders">My Orders</NavigationItem> : null}
            {!props.isAuthenticated
                ? <NavigationItem link="/auth">SignIn</NavigationItem>
                : <NavigationItem link="/logout">LogOut</NavigationItem>}

        </ul>
    )
}
export default nav;