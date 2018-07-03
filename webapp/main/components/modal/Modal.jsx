import React from 'react';
import './Modal.css';

export default function Modal(props) {
    let styles = {
        display: props.isDisplayed ? 'block' : 'none'
    }
    return (
        <div className='modal' style={ styles }>
            <div className='modal-content'>
                <span className="close" onClick={props.onClose}>&times;</span>
                <div> Diary of { props.userInfo && props.userInfo.username}</div>
                <div> {props.content} </div>
            </div>
        </div>        
    )
}