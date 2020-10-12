import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.module.css'

const checkoutSummary = (props) => {

    return (
        <div className={classes.CheckoutSummary}>
            <h1 >Hope you like it!</h1>
            <div style={{ width: "100%", margin: "auto" }}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button btnType="Danger" clicked={props.cancelOrder}>Cancel</Button>
            <Button btnType="Success" clicked={props.continueOrder}>Continue</Button>
        </div>
    );
}

export default checkoutSummary;