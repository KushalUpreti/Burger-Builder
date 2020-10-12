import React from 'react';
import logoImg from '../../Assets/burger.png';
import classes from './Logo.module.css'

const logo = (props) => {
    return <div className={classes.Logo} style={{
        height: props.height
    }}><img src={logoImg} alt="Logo"></img></div>
}

export default logo;