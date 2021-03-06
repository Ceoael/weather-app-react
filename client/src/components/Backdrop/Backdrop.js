import React from 'react';

import classes from './Backdrop.module.css';

const Backdrop = ({show, clicked, children}) => {
    return (
        show ? <div 
            className={classes.Backdrop}
            onClick={clicked}>{ children }</div> 
            : null
    )
}

export default Backdrop;