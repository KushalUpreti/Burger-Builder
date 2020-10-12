import React from "react";
import classes from "./Burger.module.css";
import BurgerIngredients from './Ingredients/BurgerIngredients';

const burger = (props) => {
    //The complex function below returns an array of array that contains BurgerIngredients elements. 
    // The keys of the ingredients object
    // passed through the props is mapped and using the keys of the array, a new array with the number of ingredients
    // in each of the key is returned with every iteration of the map. All these empty arrays are also run through a 
    // map method which returns a Jsx BurgerIngredients element with the key as the key of the original array + the index
    // and the type as the original key. 
    // Ultimately, the transformedIngredients contains an array of (array of Jsx BurgerIngredients element) that are in the order in 
    // which the type of the ingredients were in the object in the Burger component. zzzz

    // The reduce method then is used to return a single array by iterating through all the inner arrays and concatenating 
    // them in the accummelator and finally returning the accumulator that contains all the Jsx elements in a single array.

    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, index) => {
                return <BurgerIngredients key={igKey + index} type={igKey}></BurgerIngredients>
            });
        }).reduce((accum, current) => {
            return accum.concat(current);
        }, []);

    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please add some ingredients to the list</p>
    }

    return (

        <div className={classes.Burger}>
            <BurgerIngredients type="bread-top"></BurgerIngredients>
            {transformedIngredients}
            <BurgerIngredients type="bread-bottom"></BurgerIngredients>
        </div>
    );
}

export default burger;