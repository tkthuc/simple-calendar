import React from 'react';

import PropTypes from 'prop-types';

export default function Day(props) {
    return (
        <div key={props.day.getDate()} className="calendar__day day" onClick={props.onClick}> { props.day.getDate() } </div>    
    );
}


Day.propTypes = {
    day: PropTypes.instanceOf(Date)
}