import React from 'react';
import classes from "./Order.module.css"

const order = (props) => {
    const ingredients = [];

    for (const key in props.ingredients) {
        ingredients.push(
            <p style={{ display: "inline-block", padding: "0 5px", border: "1px solid #ccc", margin: "5px 8px 0px 0px" }}>
                {<span style={{ textTransform: "capitalize" }}>
                    {key}: </span>} {props.ingredients[key]}</p>
        )
    }

    return (
        <div className={classes.Order}>
            {ingredients}
            <p>Price: <strong>{Number(props.price).toFixed(2)}</strong></p>
        </div>
    );
}

export default order;