import React from 'react';
import './Message.css';

function MessageBox(props){
    
        let winner, first, second, classes = "message-box";
        if (props.show) {
            if (props.black > props.white) {
                winner = 'Black';
                first = props.black;
                second = props.white;
            } else if (props.white > props.black) {
                winner = 'White';
                second = props.black;
                first = props.white;
            }
            classes += " visible";
        }
        if (winner === undefined) {
            return (
                <div className={classes}> The game is a draw! </div>
            )
        } else {
            return (
                <div>
                    <div className={classes}>{`${winner} wins: ${first} - ${second}`}</div>
                    <button className="new-game" onClick={this.props.resetFn}> New Game </button>
                </div>
            )
        }
    
}

export default MessageBox;
