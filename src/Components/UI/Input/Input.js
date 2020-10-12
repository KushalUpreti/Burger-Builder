import React from 'react';
import classes from './Input.module.css'

const input = (props) => {
    let inpTye = null;
    let classStyle = [classes.InputElement];
    if (!props.valid && props.touched) {
        classStyle.push(classes.Invalid)
    }
    switch (props.inputtype) {
        case "input":
            inpTye = <input className={classStyle.join(" ")} onChange={props.changed} {...props} />
            break;

        case "textarea":
            inpTye = <textarea className={classStyle.join(" ")} onChange={props.changed}  {...props} />
            break;

        case "password":
            inpTye = <input className={classStyle.join(" ")} onChange={props.changed} {...props} />
            break;

        case "select":
            inpTye = <select className={classes.InputElement} onChange={props.changed}  {...props}>
                <option value="Cheapest">Cheapest</option>
                <option value="Fastest">Fastest</option>
            </select>
            break;

        default:
            inpTye = <input className={classes.InputElement}  {...props} />
    }

    return (
        <div>
            <label>{props.label}</label>
            {inpTye}
        </div>
    );
}

export default input;