import React from 'react';
import classes from "./Toolbar.module.css";
import Logo from '../../../Components/Logo/Logo';
import NavigationItems from '../../../Components/NavigationItems/NavigationItems';
import hamburger from '../../../Assets/hamburger.png';

const toolbar = (props) => {
    return (
        <header className={classes.Toolbar}>
            <img src={hamburger} className={classes.Hamburger} onClick={props.openDrawer} alt="icon"></img>
            <Logo></Logo>
            <nav className={classes.DesktopOnly}>
                <NavigationItems isAuthenticated={props.isAuth} />
            </nav>
        </header>
    );
}
export default toolbar;