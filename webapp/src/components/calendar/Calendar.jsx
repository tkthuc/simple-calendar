import React from 'react';
import Day from '../day/Day';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const weekdays =  ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

function showMonthAndYear(date) {   
    return `${months[date.getMonth()]} ${date.getFullYear()}`  ;
}

function getFullDateFormat(date) {
    return date.getDate() + '-' + months[date.getMonth()]+ '-' + date.getFullYear();
}

function Calendar({ displayedDays, currentDate, displayedMonth, displayedYear, onSelectDate }){    

    return (         
            <div className="wrapper">       
                <main>          
                    <div className="toolbar">
                    <div className="toggle">
                        <div className="toggle__option">week</div>
                        <div className="toggle__option toggle__option--selected">month</div>
                    </div>
                    <div className="current-month"> { `${months[displayedMonth]}  ${displayedYear}`  } </div>
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
                                                    let isToday = getFullDateFormat(currentDate) == getFullDateFormat(date);                                          
                                                    return <Day day={date} isToday={isToday} key={date.getDate()} onClick = {() => onSelectDate(date)}/>  
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

export default Calendar;