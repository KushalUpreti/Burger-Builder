import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Auxiliary from '../../../HOC/Auxiliary';
import Backdrop from '../../UI/Backdrop/Backdrop';


const sidedrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.isOpen) {
        attachedClasses = [classes.SideDrawer, classes.Open]
    }
    return (
        <Auxiliary>
            <Backdrop show={props.isOpen} hiding={props.closed} />
            <div className={attachedClasses.join(" ")} onClick={props.closed}>
                <Logo height="11%" />
                <nav>
                    <NavigationItems isAuthenticated={props.isAuth} />
                </nav>
            </div>
        </Auxiliary>


    );
}

export default sidedrawer;