import React from 'react';
import classes from './Modal.module.css';
import Auxiliary from "../../../HOC/Auxiliary";
import Backdrop from '../Backdrop/Backdrop'

const modal = (props) => {
    return (
        <Auxiliary>
            <Backdrop show={props.show} hiding={props.hide} />
            <div className={classes.Modal}
                style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? "1" : "0"
                }}>
                {props.children}
            </div>
        </Auxiliary>
    )
}

export default modal;