import React from 'react';

import { connect } from 'react-redux';

import Calendar from '../components/calendar/Calendar';
import Modal from '../components/modal';
import {getDisplayedDates} from '../helpers';

import { updateSelectedDate } from '../../store/actions';
import './App.css';

import '../styles.css'
import 'font-awesome/css/font-awesome.min.css'

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function getDate(date) {
        return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
}
class App extends React.Component {
    constructor(props) {
        super(props);    

        let today = new Date();

        let displayedDays =  getDisplayedDates(new Date());
        let displayedMonth = today.getMonth();
        let displayedYear = today.getFullYear();

        this.state = {
            isDisplayed: false,
            selectedDay: null,
            currentDate: today,
            displayedDays,
            displayedMonth,
            displayedYear
        }

       
    }

    async handleClick(day) {
          

        let raw = await fetch(`${window.location.origin}/todos/${this.props.userInfo.username}?startDate="${getDate(day)}"&endDate="${getDate(day)}"`)
        let response = await raw.json();

        this.setState({
            isDisplayed: true,
            selectedDay: response
        });


    }

    closeModal() {
        this.setState({
            isDisplayed: false
        })
    }

    showPrevious() {
        
        let month = ( this.state.displayedMonth + 11 ) % 12;

        let year = (month == 11) ? this.state.displayedYear - 1 : this.state.displayedYear;

        let nextStartDate = new Date(year, month, 1);
       
        
        this.setState({
            displayedDays: getDisplayedDates(nextStartDate),
            displayedMonth: month,
            displayedYear: year
        });
    }

    showNext() {

        let month = ( this.state.displayedMonth + 1 ) % 12;

        let year = (month == 0) ? this.state.displayedYear + 1 : this.state.displayedYear;

        let nextStartDate = new Date(year, month, 1);
        
        this.setState({
            displayedDays: getDisplayedDates(nextStartDate),
            displayedMonth: month,
            displayedYear: year
        });
    }

    render() {
        return (
            <div className='calendar_container'>
                <div className='left-panel'>
                    <i className="fa fa-angle-left big-icon" onClick={ this.showPrevious.bind(this) }></i>
                </div>
                <div className='middle-panel'>
                    <Calendar displayedDays= {this.state.displayedDays} currentDate={this.state.currentDate} 
                        displayedMonth = { this.state.displayedMonth }
                        displayedYear = { this.state.displayedYear }
                        onSelectDate={ this.handleClick.bind(this) }/>
                </div>
                <div className='right-panel'>
                    <i className="fa fa-angle-right big-icon" onClick={ this.showNext.bind(this) } ></i>
                </div>
                <Modal content={ this.state.selectedDay && this.state.selectedDay.length > 0 && this.state.selectedDay[0].text } isDisplayed={this.state.isDisplayed} onClose={() => this.closeModal()}></Modal>                                          
            </div>
        )
    }
}

const mapStateToProps = state => ({
    userInfo :  state.userInfo
});

const mapDispatchToProps = dispatch => ({
    updateSelectedDate :  ({ todos, date }) => dispatch(updateSelectedDate({todos,date}))
});


export default connect(
    mapStateToProps,    
    null 
)(App);