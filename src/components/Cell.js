import React from 'react';
import './Cell.css';

function Cell(props) {
    let over = props.over ? 'over' : '';
    if (props.value === 1) {
        return (
            <div className="cell white over" onClick={() => props.handleClick(props.i, props.j)}>
                <div></div>
            </div>
        );
    } else if (props.value === 0) {
        return (
            <div className="cell black over" onClick={() => props.handleClick(props.i, props.j)}>
                <div></div>
            </div>
        );
    }
    return (<div className={"cell " + over} onClick={() => props.handleClick(props.i, props.j)}></div>);

}

export default Cell;
