import React from 'react';
import './Modal.css';

export default function Modal(props) {
    let styles = {
        display: props.isDisplayed ? 'block' : 'none'
    }
    return (
        <div className='modal' style={ styles }>
            <div className='modal-content'>             
                <div className='row pb-1'>
                    <div className='col-md-11'> Diary of { props.userInfo && props.userInfo.username} </div>
                    <div className='col-md-1'><span className="close" onClick={props.onClose}>&times;</span></div>
                </div>
                <div>
                {
                     props.content.map((todo,index) => {
                        return (
                            <div key={index}> 
                                <input type="checkbox" value={todo.status} id={ `todo_${index}`} name= {`todo_checkbox_${index}`}/> 
                                &nbsp;
                                <label htmlFor={`todo_${index}`}> { todo.text } </label>
                            </div>
                        )
                     })
                } 
                </div>                            
            </div>
            
        </div>        
    )
}