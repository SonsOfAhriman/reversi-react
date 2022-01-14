import React from 'react';
import './Row.css';
import './Cell.css';
import Cell from './Cell';

function Row(props) {

    return (<div className="row">
        <Cell over={props.over} key="0" i={props.i} j={0} handleClick={props.handleClick} value={props.array[0]} />
        <Cell over={props.over} key="1" i={props.i} j={1} handleClick={props.handleClick} value={props.array[1]} />
        <Cell over={props.over} key="2" i={props.i} j={2} handleClick={props.handleClick} value={props.array[2]} />
        <Cell over={props.over} key="3" i={props.i} j={3} handleClick={props.handleClick} value={props.array[3]} />
        <Cell over={props.over} key="4" i={props.i} j={4} handleClick={props.handleClick} value={props.array[4]} />
        <Cell over={props.over} key="5" i={props.i} j={5} handleClick={props.handleClick} value={props.array[5]} />
        <Cell over={props.over} key="6" i={props.i} j={6} handleClick={props.handleClick} value={props.array[6]} />
        <Cell over={props.over} key="7" i={props.i} j={7} handleClick={props.handleClick} value={props.array[7]} />
    </div>);
}



export default Row;
