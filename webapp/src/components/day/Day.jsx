import React from 'react';

import PropTypes from 'prop-types';

export default function Day(props) {
    let style = {
        "backgroundColor": props.isToday ? 'blue' : 'initial'
    };

    return (
        <div key={props.day.getDate()} className="calendar__day day" onClick={props.onClick} style={style}> { props.day.getDate() } </div>    
    );
}


Day.propTypes = {
    day: PropTypes.instanceOf(Date)
}