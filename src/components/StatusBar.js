import React from 'react';
import './StatusBar.css';


function StatusBar(props) {

    return (
        <div className="status">
            <div className={`status-white ${props.black_turn ? '' : 'active'}`}>
                {props.white}
                <div className="circle white"></div>
                <div className="arrow"><i class="fas fa-star"></i></div>
            </div>
            <div className={`status-black ${props.black_turn ? 'active' : ''}`}>
                <div className="arrow"><i class="fas fa-star"></i></div>
                <div className="circle black"></div>
                {props.black}
            </div>
        </div>
    );
}



export default StatusBar;