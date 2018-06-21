import React from 'react';
import Day from '../day/Day';
import Modal from '../modal/Modal';

import { getDisplayedDates } from '../../helpers';


const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const weekdays =  ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
export default class Calendar extends React.Component {
    
    constructor(props) {
        super(props);       
        this.state = {
            selectedDay: null,            
            displayedDays : getDisplayedDates(new Date())
        }
       
    }

    handleClick(day) {
        this.setState({
            isDisplayed: true,
            selectedDay: day
        });
    }

    closeModal() {
        this.setState({
            isDisplayed: false
        })
    }

    showMonthAndYear() {
        let date = new Date();
        return `${months[date.getMonth()]} ${date.getFullYear()}`  ;
    }

    render() {
        return (         
               <div className="wrapper">
                    <main>
                        <div className="toolbar">
                        <div className="toggle">
                            <div className="toggle__option">week</div>
                            <div className="toggle__option toggle__option--selected">month</div>
                        </div>
                        <div className="current-month"> { this.showMonthAndYear() } </div>
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
                                    return <div className="calendar__week">
                                            { 
                                                    [0,1,2,3,4,5,6].map(day =>  {   
                                                        let date = this.state.displayedDays[week*7 + day].getDate();                                              
                                                        return <Day day={date} key={date} onClick = {() => this.handleClick(date)}/>  
                                                    })
                                            } 
                                            </div>
                               })
                            }
                           
                      
                        </div>
                        <Modal content={this.state.selectedDay} isDisplayed={this.state.isDisplayed} onClose={() => this.closeModal()}></Modal>
                    </main>                             
                 
            </div>
        );
    }
}