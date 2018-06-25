import React from 'react';
import Day from '../day/Day';

import {getDisplayedDates} from '../../helpers/DateServices'

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const weekdays =  ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

function showMonthAndYear(date) {   
    return `${months[date.getMonth()]} ${date.getFullYear()}`  ;
}


export default function Calendar(props){    

    let displayedDays = getDisplayedDates(props.date);

    return (         
            <div className="wrapper">       
                <main>          
                    <div className="toolbar">
                    <div className="toggle">
                        <div className="toggle__option">week</div>
                        <div className="toggle__option toggle__option--selected">month</div>
                    </div>
                    <div className="current-month"> { showMonthAndYear(props.date) } </div>
                    <div className="search-input">
                        <input type="text" defaultValue="What are you looking for?"/>
                        <i className="fa fa-search"></i>
                    </div>
                    </div>
                    <div className="calendar">
                    
                        <div className="calendar__header">
                            { weekdays.map(weekday => <div key={weekday}>{weekday}</div> ) }
                        </div>           
                        
                        {
                            [0,1,2,3,4,5].map( week => {
                                return <div className="calendar__week" key={week}>
                                        { 
                                                [0,1,2,3,4,5,6].map(day =>  {   
                                                    let date = displayedDays[week*7 + day];                                              
                                                    return <Day day={date} key={date.getDate()} onClick = {() => props.onSelectDate(date)}/>  
                                                })
                                        } 
                                        </div>
                            })
                        }                        
                    
                    </div>    
                </main>             
                
        </div>
    );
    
}