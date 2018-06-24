import React from 'react';
import ReactDOM from 'react-dom';


import Calendar from './components/calendar/Calendar';

import './styles.css'

ReactDOM.render(
    <Calendar date={new Date()}/>,
    document.getElementById('container')
)