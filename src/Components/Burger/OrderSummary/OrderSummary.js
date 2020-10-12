import React from 'react';
import Auxiliary from '../../../HOC/Auxiliary';
import Button from '../../UI/Button/Button';


const ordersummary = (props) => {
    const ingredientsSummary = Object.keys(props.ingredients)
        .map((keyItem, index) => {
            return <li key={keyItem + index}><span style={{ textTransform: "capitalize" }}>{keyItem}</span> : {props.ingredients[keyItem]}</li>
        });

    return (
        <Auxiliary>
            <h3>Your Order</h3>
            <p>Your Burger has following ingredients:</p>
            {ingredientsSummary}
            <p>Your Total: <strong>{props.total.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button clicked={props.hide} btnType={"Danger"}>CANCEL</Button>
            <Button clicked={props.continue} btnType={"Success"}>CONTINUE</Button>
        </Auxiliary>);
}

export default ordersummary;