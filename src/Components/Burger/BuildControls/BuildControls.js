import React from 'react';
import classes from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheze', type: 'cheese' },
    { label: 'Meats', type: 'meat' }
]

const buildControls = (props) => {
    return (
        <div className={classes.BuildControls}>
            <p>The price is: <strong>{props.price.toFixed(2)}</strong></p>
            {controls.map(ctrl => {
                return <BuildControl
                    key={ctrl.label}
                    label={ctrl.label}

                    addedAgain={() => {
                        props.added(ctrl.type);
                    }}

                    deductedAgain={() => {
                        props.deducted(ctrl.type);
                    }}

                    disabledN={props.disabled[ctrl.type]}
                ></BuildControl>
            })}
            <button className={classes.OrderButton}
                disabled={!props.canPurchase}
                onClick={props.purchase}>{props.isAuth ? "Order Now" : "SignUp To Order"}</button>
        </div>
    );

}

export default buildControls;