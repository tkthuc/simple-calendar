import React from 'react';

export default function Day(props) {
    return (
        <div key={props.day} className="calendar__day day" onClick={props.onClick}> { props.day } </div>    
    );
}