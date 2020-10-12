import React from 'react';
import classes from './BuildControl.module.css'

const buildControl = (props) => {
    return (
        <div className={classes.BuildControl}>
            <div className={classes.label}>{props.label}</div>
            <button className={classes.Less} onClick={props.deductedAgain} disabled={props.disabledN}>Less</button>
            <button className={classes.More} onClick={props.addedAgain}>More</button>
        </div>
    );
}

export default buildControl;