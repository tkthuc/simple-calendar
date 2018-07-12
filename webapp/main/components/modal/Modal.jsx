import React from 'react';

import InfiniteScrolling from '../infinite-scrolling';
import './Modal.css';

export default function Modal(props) {
    let styles = {
        display: props.isDisplayed ? 'block' : 'none'
    }
    return (
        <div className='modal' style={ styles }>
            <div className='modal-content'>             
                <div style={{
                    display: "flex",
                    flexDirection: "row",

                }}>
                    <div style={{width: "90%"}}> Diary of { props.userInfo && props.userInfo.username} </div>
                    <div style={{width: "10%"}}><span className="close" onClick={props.onClose}>&times;</span></div>
                </div>
                
                <InfiniteScrolling list={props.content} getNextItems={props.getNextItems}/>
                {/* <ul style={{
                    display: "flex",
                    flexDirection: "column",

                }}>
                {                        
                     props.content.map((todo,index) => {
                        return (
                            <li key={index} style={{
                                padding: "5px"
                            }}> 
                                <input type="checkbox" value={todo.status} id={ `todo_${index}`} name= {`todo_checkbox_${index}`}/> 
                                &nbsp;
                                <label htmlFor={`todo_${index}`}> { todo.text } </label>
                            </li>
                        )
                     })
                } 
                </ul> */}
                                          
            </div>
            
        </div>        
    )
}